// Integrated route checks for the atlas redesign. Viewport-only images keep the full sweep small.
const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
const reports = path.join(__dirname, 'reports');
const shots = path.join(__dirname, 'shots', 'atlas-refactor');
const inventory = require('../course/visuals/section-inventory.json');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const browser = await launch();
  const results = [];
  fs.mkdirSync(reports, { recursive: true });
  fs.mkdirSync(shots, { recursive: true });
  try {
    for (const width of [1280, 375]) {
      for (const theme of ['light', 'dark']) {
        const page = await browser.newPage();
        const errors = [];
        const localLoadErrors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('response', response => {
          if (response.url().startsWith(base) && response.status() >= 400) {
            localLoadErrors.push(`${response.status()} ${response.url()}`);
          }
        });
        await page.setViewport({ width, height: 900 });
        await page.evaluateOnNewDocument(value => localStorage.setItem('s2g:theme', JSON.stringify(value)), theme);
        await page.goto(base + '/#/home', { waitUntil: 'networkidle0' });
        const routes = await page.evaluate(() => [
          { hash: '#/home', title: null, figures: 0, widgets: 0 },
          ...COURSE.modules.map(m => ({ hash: '#/m/' + String(m.n).padStart(2, '0'), title: m.title, track: 'm', n: m.n, figures: m.figureCount, widgets: (m.html.match(/data-widget=/g) || []).length })),
          ...COURSE.survey.map(m => ({ hash: '#/s/' + String(m.n).padStart(2, '0'), title: m.title, track: 's', n: m.n, figures: m.figureCount, widgets: (m.html.match(/data-widget=/g) || []).length })),
        ]);
        for (const route of routes) {
          const errorStart = errors.length;
          await page.evaluate(hash => { location.hash = hash; }, route.hash);
          await page.waitForFunction(({ hash, title }) => location.hash === hash && (title ? document.querySelector('h1.title')?.textContent === title : !!document.querySelector('.home-hero')), {}, route);
          await sleep(60);
          const actual = await page.evaluate(() => {
            const docs = new Map([...COURSE.modules.map(m => ['m/' + m.n, m]), ...COURSE.survey.map(m => ['s/' + m.n, m])]);
            const badLinks = [];
            for (const a of document.querySelectorAll('main a[href^="#/m/"], main a[href^="#/s/"], #rail a')) {
              const href = a.getAttribute('href');
              if (href === '#/home') continue;
              const match = href.match(/^#\/(m|s)\/(\d+)(?:\/(.+))?$/);
              if (!match) { badLinks.push(href); continue; }
              const doc = docs.get(match[1] + '/' + Number(match[2]));
              if (!doc) { badLinks.push(href); continue; }
              if (match[3] && !/^visual-\d+$/.test(match[3])) {
                const id = decodeURIComponent(match[3]);
                if (!doc.html.includes('id="' + id + '"')) badLinks.push(href);
              }
            }
            const view = document.documentElement;
            return {
              theme: view.dataset.theme,
              labFonts: [...new Set([...document.querySelectorAll('.widget-body')].map(el => getComputedStyle(el).fontFamily))],
              controlFonts: [...new Set([...document.querySelectorAll('.widget-body button, .widget-body select')].map(el => getComputedStyle(el).fontFamily))],
              controlsChecked: document.querySelectorAll('.widget-body button, .widget-body select').length,
              tokens: Object.fromEntries(['ground', 'panel', 'ink', 'accent', 'si', 'sans'].map(name => [name, getComputedStyle(view).getPropertyValue('--' + name).trim()])),
              documentWidth: view.scrollWidth,
              viewport: innerWidth,
              figures: document.querySelectorAll('.section-figure').length,
              widgets: document.querySelectorAll('.widget[data-widget] .widget-body:not(.error)').length,
              widgetErrors: [...document.querySelectorAll('.widget-body.error')].map(e => e.textContent),
              missingHeadings: [...document.querySelectorAll('#rail a[data-id]')].map(a => a.dataset.id).filter(id => !document.getElementById(id)),
              missingFigureLabels: [...document.querySelectorAll('.section-figure')].filter(f => !f.querySelector('figcaption') || !f.querySelector('.sf-legend') || [...f.querySelectorAll('svg')].some(svg => {
                if (svg.getAttribute('aria-label')?.trim()) return false;
                const labels = svg.getAttribute('aria-labelledby')?.split(/\s+/) || [];
                return !labels.length || labels.some(id => !document.getElementById(id)?.textContent.trim());
              })).length,
              badLinks: [...new Set(badLinks)],
            };
          });
          const expectedFigures = route.title ? inventory.find(m => m.track === route.track && m.lesson === route.n).sections.length : 0;
          const failures = [];
          if (actual.theme !== theme) failures.push('actual theme mismatch');
          if (actual.labFonts.some(font => !font.includes('sans-serif')) || actual.controlFonts.some(font => !font.includes('sans-serif'))) failures.push('lab font fallback');
          if (Object.values(actual.tokens).some(value => !value)) failures.push('missing design token');
          if (actual.documentWidth > width) failures.push('document overflow');
          if (actual.figures !== expectedFigures) failures.push(`figure coverage ${actual.figures}/${expectedFigures}`);
          if (route.title && route.figures !== expectedFigures) failures.push(`build figureCount ${route.figures}/${expectedFigures}`);
          if (actual.widgets !== route.widgets || actual.widgetErrors.length) failures.push('widget mount mismatch');
          if (actual.missingHeadings.length) failures.push('missing heading targets');
          if (actual.badLinks.length) failures.push('broken internal links');
          if (actual.missingFigureLabels) failures.push('missing figure accessible labels');
          if (errors.length > errorStart) failures.push('runtime error');
          results.push({ route: route.hash, width, theme, expectedFigures, expectedWidgets: route.widgets, ...actual, errors: errors.slice(errorStart), failures });
          if (['#/home', '#/m/00', '#/m/02', '#/s/04'].includes(route.hash)) {
            await page.screenshot({ path: path.join(shots, `${route.hash.replace(/[^a-z0-9]/gi, '-')}-${width}-${theme}.png`) });
            if (route.title) {
              await page.$eval('.section-figure', el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
              await sleep(70);
              await page.screenshot({ path: path.join(shots, `${route.hash.replace(/[^a-z0-9]/gi, '-')}-${width}-${theme}-figure.png`) });
            }
          }
        }
        if (localLoadErrors.length) results.push({ width, theme, failures: ['local resource load errors'], localLoadErrors });
        await page.close();
        console.log(`Checked ${width}px ${theme}: ${routes.length} routes`);
      }
    }
  } finally {
    await browser.close();
  }
  const report = { timestamp: new Date().toISOString(), cases: results.filter(r => r.route).length, failures: results.filter(r => r.failures.length).length, results };
  fs.writeFileSync(path.join(reports, 'atlas-refactor-pages.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ cases: report.cases, failures: report.failures }));
  if (report.failures) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
