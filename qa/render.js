// Headless QA harness for widgets and pages.
//   node qa/render.js widget <id> [--out qa/shots] [--scenario qa/scenarios/<id>.json]
//   node qa/render.js page <hash> [--width 1400] [--theme dark|light] [--out qa/shots] [--slices 4]
// Widget mode renders the widget at 760px and 360px, in dark and light, runs the optional scenario
// (a list of {click:selector} / {set:selector,value} / {wait:ms} / {shot:name} steps), screenshots
// each state to PNG, and prints a JSON report: console errors, overlapping SVG text, elements that
// overflow the widget box, tiny text, and hard-coded colors found in the widget source.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const mode = args[0];
const target = args[1];
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const OUT = path.resolve(opt('out', 'qa/shots'));
const BASE = opt('base', 'http://localhost:8790');
fs.mkdirSync(OUT, { recursive: true });

const ANALYZE = () => {
  const box = document.querySelector('#box') || document.querySelector('main');
  const bb = box.getBoundingClientRect();
  const report = { overlaps: [], overflow: [], tinyText: [], emptyArea: null };
  // overlapping SVG text
  const texts = [...box.querySelectorAll('svg text')].filter(t => t.getComputedStyle ? true : true).map(t => {
    const r = t.getBoundingClientRect(); return { t, r, s: (t.textContent || '').trim() };
  }).filter(x => x.s && x.r.width > 0 && x.r.height > 0);
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i].r, b = texts[j].r;
    const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (ox > 2 && oy > 2 && texts[i].t.ownerSVGElement === texts[j].t.ownerSVGElement) report.overlaps.push([texts[i].s.slice(0, 30), texts[j].s.slice(0, 30)]);
  }
  // text outside its svg viewport (clipped)
  for (const x of texts) {
    const svg = x.t.ownerSVGElement; if (!svg) continue; const sr = svg.getBoundingClientRect();
    if (x.r.left < sr.left - 1 || x.r.right > sr.right + 1 || x.r.top < sr.top - 1 || x.r.bottom > sr.bottom + 1) report.overflow.push('svg text clipped: ' + x.s.slice(0, 40));
    const fs = parseFloat(getComputedStyle(x.t).fontSize) ;
    if (fs && fs < 10) report.tinyText.push(x.s.slice(0, 30) + ' @' + fs.toFixed(1) + 'px');
  }
  // any element wider than the widget body
  for (const el of box.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > bb.right + 2 || r.left < bb.left - 2)) { report.overflow.push((el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '')) + ' exceeds box by ' + Math.round(Math.max(r.right - bb.right, bb.left - r.left)) + 'px'); if (report.overflow.length > 12) break; }
  }
  // html text smaller than 11px
  for (const el of box.querySelectorAll('span,div,label,td,th,b,small,output,button')) {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs && fs < 10.5 && el.textContent.trim() && el.children.length === 0) { report.tinyText.push(el.textContent.trim().slice(0, 30) + ' @' + fs.toFixed(1) + 'px'); if (report.tinyText.length > 12) break; }
  }
  report.overlaps = report.overlaps.slice(0, 12);
  report.boxHeight = Math.round(bb.height);
  return report;
};

async function runScenario(page, scenario, shot) {
  for (const step of scenario) {
    if (step.click) { const el = await page.$(step.click); if (el) await el.click(); else console.error('scenario: not found', step.click); }
    if (step.set !== undefined) {
      await page.evaluate(({ sel, value }) => { const el = document.querySelector(sel); if (!el) return; if (el.type === 'checkbox') el.checked = !!value; else el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, { sel: step.set, value: step.value });
    }
    if (step.hover) { const el = await page.$(step.hover); if (el) await el.hover(); }
    if (step.wait) await new Promise(r => setTimeout(r, step.wait));
    if (step.shot) await shot(step.shot);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--force-device-scale-factor=1'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 200)); });
  const results = [];
  if (mode === 'widget') {
    const id = target;
    const scenarioPath = opt('scenario', path.join('qa', 'scenarios', id + '.json'));
    const scenario = fs.existsSync(scenarioPath) ? JSON.parse(fs.readFileSync(scenarioPath, 'utf8')) : [];
    const src = fs.readFileSync(path.join('site', 'widgets', id + '.js'), 'utf8');
    const hardColors = (src.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) || []).filter(c => !/^#(fff|ffffff|000|000000)$/i.test(c));
    for (const width of [760, 360]) {
      for (const theme of ['dark', 'light']) {
        await page.setViewport({ width: width + 40, height: 900 });
        await page.goto(`${BASE}/widget-test.html?w=${id}`, { waitUntil: 'networkidle0' });
        await page.evaluate(t => { document.documentElement.setAttribute('data-theme', t); }, theme);
        await page.evaluate(() => { const box = document.querySelector('.article'); box.style.maxWidth = 'none'; box.style.width = '100%'; });
        await page.evaluate(id => { const pick = document.getElementById('pick'); pick.value = id; pick.dispatchEvent(new Event('change')); }, id);
        await new Promise(r => setTimeout(r, 400));
        const shot = async name => {
          const el = await page.$('#box');
          const file = path.join(OUT, `${id}-${width}-${theme}${name ? '-' + name : ''}.png`);
          await el.screenshot({ path: file, captureBeyondViewport: true });
          results.push(file);
        };
        await shot('');
        if (width === 760) await runScenario(page, scenario, shot);
        const report = await page.evaluate(ANALYZE);
        report.width = width; report.theme = theme;
        results.push(report);
      }
    }
    const out = { id, errors: [...new Set(errors)], hardCodedColors: [...new Set(hardColors)].slice(0, 20), shots: results.filter(r => typeof r === 'string'), reports: results.filter(r => typeof r !== 'string') };
    console.log(JSON.stringify(out, null, 1));
  } else if (mode === 'page') {
    const width = parseInt(opt('width', '1400'), 10), theme = opt('theme', 'dark'), slices = parseInt(opt('slices', '3'), 10);
    await page.setViewport({ width, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
    await page.evaluate(t => { localStorage.setItem('s2g:theme', JSON.stringify(t)); }, theme);
    await page.goto(`${BASE}/?qa=1${target}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const tag = target.replace(/[^a-z0-9]+/gi, '_');
    for (let i = 0; i < slices; i++) {
      const y = Math.round(i * (h - 900) / Math.max(1, slices - 1));
      await page.evaluate(y => window.scrollTo(0, y), y); await new Promise(r => setTimeout(r, 300));
      const file = path.join(OUT, `page${tag}-${width}-${theme}-${i}.png`);
      await page.screenshot({ path: file }); results.push(file);
    }
    const report = await page.evaluate(() => ({ scrollWidth: document.body.scrollWidth, innerWidth, widgetErrors: [...document.querySelectorAll('.widget-body.error')].map(e => e.textContent), entities: (document.body.innerText.match(/&[a-z]+;/g) || []).slice(0, 10), rawMd: (document.body.innerText.match(/\*\*|^#{1,3} |\\\\~|\$[^$\n]{1,40}\$/gm) || []).slice(0, 10) }));
    console.log(JSON.stringify({ target, width, theme, errors: [...new Set(errors)], shots: results, report }, null, 1));
  }
  await browser.close();
})().catch(e => { console.error('HARNESS FAILED', e); process.exit(1); });
