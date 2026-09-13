// Automated runtime/layout coverage. Screenshot inspection remains a separate review step.
const { launch } = require('./browser');
const analyze = require('./analyze');
const fs = require('fs'), path = require('path');
const mode = process.argv[2] || 'widgets';
const selected = process.argv.slice(3);
if (!['widgets', 'pages'].includes(mode)) throw new Error('Usage: node qa/sweep.js widgets [ids...] | pages');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'qa', 'shots', 'sweep');
const reportDir = path.join(root, 'qa', 'reports');
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(reportDir, { recursive: true });
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function widget(page, id) {
  const results = [], errors = [];
  const onError = e => errors.push(e.message);
  page.on('pageerror', onError);
  for (const width of [760, 360]) for (const theme of ['dark', 'light']) {
    await page.setViewport({ width: width + 40, height: 900 });
    await page.goto(`${base}/widget-test.html?w=${id}`, { waitUntil: 'load' });
    await page.mouse.move(0, 0);
    await page.evaluate(({ theme, id }) => {
      localStorage.clear();
      document.documentElement.dataset.theme = theme;
      const pick = document.getElementById('pick'); pick.value = id; pick.dispatchEvent(new Event('change'));
    }, { theme, id });
    await sleep(80);
    await page.evaluate(() => document.fonts.ready);
    const shots = [];
    const shot = async suffix => { const file = path.join(out, `${id}-${width}-${theme}-${suffix}.png`); await (await page.$('#box')).screenshot({ path: file }); shots.push(path.relative(root, file)); };
    await shot('initial');
    const initial = await page.evaluate(analyze);
    const controls = await page.evaluate(() => [...document.querySelectorAll('#box input, #box select')].map((el, i) => {
      el.dataset.qaControl = i;
      return { selector: `[data-qa-control="${i}"]`, type: el.type, initial: ['checkbox','radio'].includes(el.type) ? el.checked : el.value, values: el.tagName === 'SELECT' ? [...el.options].map(o => o.value) : el.type === 'radio' ? [true] : el.type === 'checkbox' ? [true, false] : ['range', 'number'].includes(el.type) ? [el.min || '0', el.max || '100'] : [] };
    }));
    const states = [];
    for (const ctl of controls) {
      for (const value of ctl.values) {
        if (process.env.QA_DEBUG) console.log(id, width, theme, ctl.selector, value);
        await page.evaluate(({ selector, value }) => { const el = document.querySelector(selector); if (!el) return; if (['checkbox','radio'].includes(el.type)) el.checked = value; else el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, { selector: ctl.selector, value });
        await sleep(15);
        const state = await page.evaluate(() => ({ error: document.getElementById('err').textContent, invalidNumber: /\bNaN\b|\bInfinity\b|undefined/.test(document.getElementById('box').innerText), documentOverflow: document.documentElement.scrollWidth > innerWidth + 1 }));
        if (state.error || state.invalidNumber || state.documentOverflow) states.push({ selector: ctl.selector, value, ...state });
      }
      await page.evaluate(ctl => { const el = document.querySelector(ctl.selector); if (!el) return; if (['checkbox','radio'].includes(el.type)) el.checked = ctl.initial; else el.value = ctl.initial; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }, ctl);
    }
    const buttons = await page.evaluate(() => [...document.querySelectorAll('#box button')].map((el, i) => { el.dataset.qaButton = i; return { selector: `[data-qa-button="${i}"]`, text: el.textContent.trim() }; }).filter(b => !/prev|previous|reset|restart/i.test(b.text)));
    let buttonsClicked = 0;
    for (const button of buttons) {
      const el = await page.$(button.selector); if (el && await el.boundingBox() && !await el.evaluate(e => e.disabled)) { await el.click(); buttonsClicked++; }
      await sleep(/play/i.test(button.text) ? 250 : 10);
    }
    await shot('interaction');
    const final = await page.evaluate(analyze);
    const status = await page.evaluate(() => ({ error: document.getElementById('err').textContent, invalidNumber: /\bNaN\b|\bInfinity\b|undefined/.test(document.getElementById('box').innerText), documentOverflow: document.documentElement.scrollWidth > innerWidth + 1 }));
    results.push({ width, theme, initialCapture: 'Fresh mount after clearing isolated test storage; pointer outside widget; 80ms after mount', shots, controls: controls.length, controlValuesExercised: controls.reduce((n,c) => n+c.values.length,0), buttonsClicked, states, status, initial, final });
  }
  page.off('pageerror', onError);
  return { id, errors: [...new Set(errors)], results };
}
async function pages(page) {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(base, { waitUntil: 'load' });
  const routes = await page.evaluate(() => ['#/home', ...COURSE.modules.map(m => '#/m/'+String(m.n).padStart(2,'0')), ...COURSE.survey.map(m => '#/s/'+String(m.n).padStart(2,'0'))]);
  const results = [];
  for (const width of [1280, 375]) for (const theme of ['dark','light']) for (const route of routes) {
    await page.setViewport({width,height:900});
    await page.evaluate(t => localStorage.setItem('s2g:theme', JSON.stringify(t)),theme);
    await page.goto(base+'/'+route,{waitUntil:'load'});
    // Hash-only navigation does not rerun application startup/theme initialization.
    await page.reload({waitUntil:'load'}); await sleep(80);
    const result = await page.evaluate(() => ({ route:location.hash, actualTheme:document.documentElement.dataset.theme, themeBackground:getComputedStyle(document.body).backgroundColor, actualColorScheme:getComputedStyle(document.documentElement).colorScheme, documentOverflow:document.documentElement.scrollWidth>innerWidth+1, scrollWidth:document.documentElement.scrollWidth, widgetErrors:[...document.querySelectorAll('.widget-body.error')].map(e=>e.textContent), widgets:document.querySelectorAll('.widget').length, title:document.title, hasH1:!!document.querySelector('main h1') }));
    const file = path.join(out,`page-${route.replace(/\W+/g,'_')}-${width}-${theme}.png`);
    await page.screenshot({path:file});results.push({width,theme,...result,shot:path.relative(root,file)});
  }
  return {mode, timestamp:new Date().toISOString(), errors:[...new Set(errors)], results};
}
(async () => {
  const browser = await launch();
  try {
    let report;
    if (mode === 'pages') report = await pages(await browser.newPage());
    else {
      const queue = fs.readdirSync(path.join(root,'site/widgets')).filter(f=>f.endsWith('.js')).map(f=>f.slice(0,-3)).filter(id=>!selected.length||selected.includes(id));
      const results = [];
      await Promise.all(Array.from({length:Math.max(1, Math.min(4, Number(process.env.QA_WORKERS) || 1))},async()=>{
        const page=await browser.newPage();
        while(queue.length){const id=queue.shift(); try {const result=await widget(page,id);results.push(result);fs.writeFileSync(path.join(reportDir,id+'.json'),JSON.stringify(result,null,2)+'\n');console.log(id, 'complete');}catch(e){results.push({id,error:e.message});console.log(id,'FAILED',e.message);}}
        await page.close();
      }));
      report={mode,timestamp:new Date().toISOString(),results};
    }
    const failures = [];
    if (report.errors?.length) failures.push(...report.errors);
    for (const result of report.results) {
      if (result.error || result.errors?.length) failures.push(result.id+': '+(result.error || result.errors.join('; ')));
      if (mode === 'pages') {
        if (result.actualTheme !== result.theme || result.actualColorScheme !== result.theme || result.documentOverflow || result.widgetErrors.length || !result.hasH1) failures.push(result.route+': page assertion failed');
      } else for (const r of result.results || []) {
        if (r.states.length || r.status.error || r.status.invalidNumber || r.status.documentOverflow) failures.push(result.id+': state assertion failed');
        for (const stage of ['initial','final']) for (const metric of ['overlaps','overflow','tinyText']) if (r[stage][metric].length) failures.push(result.id+': '+stage+' '+metric+' flagged');
      }
    }
    report.failures = failures;
    fs.writeFileSync(path.join(reportDir,mode+(selected.length?'-targeted':'-sweep')+'.json'),JSON.stringify(report,null,2)+'\n');
    if (failures.length) { console.error(failures.length+' failed assertions; inspect the report.'); process.exitCode=1; }
    console.log('Wrote',mode+(selected.length?'-targeted':'-sweep')+'.json',report.results.length,'results');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
