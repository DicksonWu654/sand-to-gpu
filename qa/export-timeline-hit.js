// Real pointer selection must match the visible marker, even when SVG hit circles overlap.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { launch } = require('./browser');
(async () => {
  const browser = await launch();
  const results = [];
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [760, 360]) for (const theme of ['dark', 'light']) {
      await page.setViewport({ width: width + 40, height: 900 });
      await page.goto((process.env.QA_BASE_URL || 'http://127.0.0.1:8790') + '/widget-test.html?w=export-timeline', { waitUntil: 'networkidle0' });
      await page.evaluate(theme => {
        document.documentElement.dataset.theme = theme;
        Object.assign(document.querySelector('.article').style, { maxWidth: 'none', width: '100%' });
      }, theme);
      await new Promise(resolve => setTimeout(resolve, 300));
      const ids = await page.$$eval('#box g[data-ev]', elements => [...new Set(elements.map(el => el.dataset.ev))]);
      assert.equal(ids.length, 28);
      for (const id of ids) {
        await page.click(`#box g[data-ev="${id}"]`);
        assert.equal(await page.$eval('#box select[aria-label="Jump to event"]', el => el.value), id, `${width}/${theme}: pointer selected wrong event for ${id}`);
        assert.equal(await page.$eval(`#box g[data-ev="${id}"]`, el => el.getAttribute('aria-pressed')), 'true');
      }
      await page.select('#box select[aria-label="Jump to event"]', 'oct7');
      await page.hover('#box g[data-ev="h20-ban"]');
      assert.match(await page.$eval('#box svg.w-svg > g:last-child', el => el.textContent), /H20 ban/, 'hover tooltip must name the nearest visible marker');
      await page.$eval('#box g[data-ev="dec2"]', el => el.focus());
      await page.keyboard.press('Enter');
      assert.equal(await page.$eval('#box select[aria-label="Jump to event"]', el => el.value), 'dec2');
      results.push({ width, theme, pointerSelections: ids.length, hover: 'h20-ban', keyboardSelection: 'dec2', status: 'passed' });
    }
    assert.deepEqual(errors, []);
    const report = { status: 'passed', pointerSelections: 112, results, errors };
    fs.writeFileSync('qa/reports/export-timeline-hit-2026-09-14.json', JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
