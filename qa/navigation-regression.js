/* Focused user-path regressions. Run against the local preview, not a widget harness. */
const assert = require('node:assert/strict');
const { launch } = require('./browser');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  const errors = [], checks = [];
  page.on('pageerror', error => errors.push(error.message));
  const settle = () => new Promise(resolve => setTimeout(resolve, 160));
  async function check(name, fn) { await fn(); checks.push(name); }
  try {
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(base + '/#/m/01', { waitUntil: 'networkidle0' });
    const anchor = await page.$eval('.prose h2[id]', el => el.id);
    await check('Section/root/back/forward preserve the existing lab and its input state', async () => {
      await page.evaluate(() => {
        window.qaLab = document.querySelector('.widget');
        const range = qaLab.querySelector('input[type=range]');
        range.value = range.max; range.dispatchEvent(new Event('input', { bubbles: true }));
        window.qaRangeValue = range.value;
      });
      await page.evaluate(id => { location.hash = '#/m/01/' + id; }, anchor); await settle();
      await page.evaluate(() => { location.hash = '#/m/01'; }); await settle();
      assert.equal(await page.evaluate(() => document.querySelector('.widget') === qaLab && qaLab.querySelector('input[type=range]').value === qaRangeValue), true);
      await page.goBack(); await settle();
      assert.equal(await page.evaluate(() => document.querySelector('.widget') === qaLab), true);
      assert.equal(await page.evaluate(() => document.activeElement.id), anchor);
      await page.goForward(); await settle();
      assert.equal(await page.evaluate(() => document.querySelector('.widget') === qaLab), true);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    });
    await check('Repeated current-section links still jump and focus the heading', async () => {
      await page.evaluate(id => { location.hash = '#/m/01/' + id; }, anchor); await settle();
      await page.evaluate(() => window.scrollTo(0, 0)); await settle();
      await page.evaluate(id => document.querySelector('#rail a[data-id="' + id + '"]').click(), anchor); await settle();
      assert.equal(await page.evaluate(() => document.activeElement.id), anchor);
      assert.ok(await page.evaluate(() => scrollY) > 0);
    });
    await check('Malformed and encoded anchors leave routing operational', async () => {
      await page.evaluate(() => { location.hash = '#/m/01/%E0%A4%A'; }); await settle();
      await page.evaluate(id => { location.hash = '#/m/01/' + id.replace('b', '%62'); }, anchor); await settle();
      assert.equal(await page.evaluate(() => document.activeElement.id), anchor);
      assert.equal(errors.length, 0);
    });
    await check('Search keyboard selection exposes state, restores focus on Escape, and follows Enter', async () => {
      await page.click('#search'); await page.type('#search', 'quartz');
      assert.equal(await page.$eval('#search', el => el.getAttribute('aria-expanded')), 'true');
      await page.keyboard.press('ArrowDown');
      assert.equal(await page.$eval('#search', el => el.getAttribute('aria-activedescendant')), 'search-hit-0');
      assert.equal(await page.$eval('#search-hit-0', el => el.getAttribute('aria-selected')), 'true');
      await page.keyboard.press('Escape');
      assert.notEqual(await page.evaluate(() => document.activeElement.id), 'search');
      assert.equal(await page.$eval('#search', el => el.getAttribute('aria-expanded')), 'false');
      await page.focus('#search'); await page.keyboard.press('ArrowDown');
      const href = await page.$eval('#search-hit-0', el => el.getAttribute('href'));
      await page.keyboard.press('Enter'); await settle();
      assert.equal(await page.evaluate(() => location.hash), href);
      assert.equal(await page.$eval('#search-results', el => el.hidden), true);
      assert.notEqual(await page.evaluate(() => document.activeElement.id), 'search');
    });
    await check('Slash respects editable controls and contenteditable regions', async () => {
      await page.evaluate(() => { const el = document.createElement('div'); el.id = 'qa-editor'; el.contentEditable = 'true'; document.body.append(el); el.focus(); });
      await page.keyboard.press('/');
      assert.equal(await page.$eval('#qa-editor', el => el.textContent), '/');
      await page.evaluate(() => document.getElementById('qa-editor').remove());
      await page.focus('input[type=range]'); await page.keyboard.press('/');
      assert.notEqual(await page.evaluate(() => document.activeElement.id), 'search');
      await page.focus('#main'); await page.keyboard.press('/');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'search');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    });
    await check('Mobile curriculum contains focus, locks background, and returns focus on Escape', async () => {
      await page.setViewport({ width: 390, height: 844 }); await settle();
      await page.click('#menu');
      assert.equal(await page.evaluate(() => document.querySelector('#sidebar').contains(document.activeElement)), true);
      assert.equal(await page.$eval('#main', el => el.inert), true);
      assert.equal(await page.$eval('body', el => el.style.overflow), 'hidden');
      await page.evaluate(() => [...document.querySelectorAll('#sidebar a[href], #sidebar button')].at(-1).focus());
      await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => document.activeElement.id), 'menu');
      await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift'); assert.equal(await page.evaluate(() => document.querySelector('#sidebar').contains(document.activeElement)), true);
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'menu');
      assert.equal(await page.$eval('#sidebar', el => el.inert), true);
      assert.equal(await page.$eval('#main', el => el.inert), false);
      assert.equal(await page.$eval('body', el => el.style.overflow), '');
    });
    await check('Opening curriculum then selecting current chapter closes it without resetting the lab', async () => {
      await page.evaluate(() => { window.qaLab = document.querySelector('.widget'); });
      await page.click('#menu');
      await page.evaluate(() => document.querySelector('#sidebar a.active').click()); await settle();
      assert.equal(await page.$eval('#menu', el => el.getAttribute('aria-expanded')), 'false');
      assert.equal(await page.evaluate(() => document.querySelector('.widget') === qaLab), true);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
    });
    await check('Desktop resize restores the normal non-modal sidebar', async () => {
      await page.click('#menu');
      await page.setViewport({ width: 1440, height: 1000 }); await settle();
      assert.equal(await page.$eval('#sidebar', el => el.inert), false);
      assert.equal(await page.$eval('#main', el => el.inert), false);
      assert.equal(await page.$eval('#search', el => el.closest('.search').inert), false);
      assert.equal(await page.$eval('body', el => el.style.overflow), '');
    });
    await check('Completed quiz score and reading progress persist across a fresh page load', async () => {
      await page.evaluate(() => { location.hash = '#/m/01'; }); await settle();
      await page.evaluate(() => {
        const m = COURSE.modules.find(m => m.n === 1);
        m.quiz.questions.forEach((q, i) => document.querySelector('input[name="q1_' + i + '"][value="' + q.answer + '"]').click());
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
      }); await settle();
      assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('s2g:quiz'))[1]), { score: 8, total: 8 });
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('s2g:read'))[1]), true);
      await page.reload({ waitUntil: 'networkidle0' });
      assert.equal(await page.$eval('#sidebar a[data-n="1"]', el => el.classList.contains('passed') && el.classList.contains('read')), true);
      assert.match(await page.$eval('.quiz .verdict', el => el.textContent), /Previous attempt: 8 of 8/);
    });
    await check('Leaving the bottom of a chapter does not mark the next unread chapter read', async () => {
      await page.evaluate(() => { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); }); await settle();
      await page.evaluate(() => { location.hash = '#/m/02'; }); await settle();
      assert.equal(await page.evaluate(() => !!JSON.parse(localStorage.getItem('s2g:read'))[2]), false);
      assert.equal(await page.evaluate(() => scrollY), 0);
      await page.goBack(); await settle(); await page.goForward(); await settle();
      assert.equal(await page.evaluate(() => !!JSON.parse(localStorage.getItem('s2g:read'))[2]), false);
    });
    await check('Selecting the already active track from its first chapter closes the mobile menu', async () => {
      await page.evaluate(() => { location.hash = '#/m/00'; }); await settle();
      await page.setViewport({ width: 390, height: 844 }); await settle();
      await page.click('#menu');
      await page.evaluate(() => document.querySelector('.track-btn.active').click()); await settle();
      assert.equal(await page.$eval('#menu', el => el.getAttribute('aria-expanded')), 'false');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'main');
      assert.equal(await page.$eval('#sidebar a.active', el => el.getAttribute('aria-current')), 'page');
    });
    await check('Overflowing prose tables are labeled, keyboard reachable, and clean up on resize', async () => {
      await page.evaluate(() => { location.hash = '#/m/01'; }); await settle();
      await page.setViewport({ width: 320, height: 844 }); await settle();
      const overflow = await page.evaluate(() => [...document.querySelectorAll('.prose .table-scroll')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => ({ focusable: el.tabIndex === 0, role: el.getAttribute('role'), label: el.getAttribute('aria-label') })));
      assert.ok(overflow.length > 0);
      assert.ok(overflow.every(el => el.focusable && el.role === 'region' && el.label?.includes('scroll horizontally')));
      await page.setViewport({ width: 1440, height: 1000 }); await settle();
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('.prose .table-scroll')].filter(el => el.scrollWidth <= el.clientWidth + 1).every(el => !el.hasAttribute('tabindex') && !el.hasAttribute('role'))), true);
    });
    assert.deepEqual(errors, []);
    const report = { date: new Date().toISOString(), pass: true, checks, limitations: 'Focused Chromium user-path regression; no screen reader or touch-device testing.' };
    require('node:fs').writeFileSync(require('node:path').join(__dirname, 'reports/navigation-regression.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
