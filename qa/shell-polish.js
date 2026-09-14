// Targeted opening, navigation and keyboard-layout regression checks.
const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
(async () => {
  const browser = await launch();
  const results = [];
  try {
    const page = await browser.newPage();
    for (const width of [320, 375, 720, 1440]) for (const theme of ['light', 'dark']) {
      await page.setViewport({width, height: 1000});
      await page.goto(base + '/#/home');
      await page.evaluate(t => localStorage.setItem('s2g:theme', JSON.stringify(t)), theme);
      await page.reload({waitUntil: 'networkidle0'});
      const routes = width === 320 ? ['home', ...Array.from({length:22}, (_, n) => 'm/' + String(n).padStart(2, '0')), ...Array.from({length:10}, (_, n) => 's/' + String(n+1).padStart(2, '0'))] : ['home', 'm/01', 's/01'];
      for (const route of routes) {
        await page.evaluate(r => { location.hash = '#/' + r; }, route);
        await page.waitForFunction(r => r === 'home' ? !!document.querySelector('.home-hero') : document.querySelector('h1.title')?.textContent === (r[0] === 'm' ? COURSE.modules : COURSE.survey).find(d => d.n === +r.slice(2))?.title, {}, route);
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => {
          const rect = el => { const r=el.getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}; };
          const header = [...document.querySelectorAll('.topbar .menu-btn,.topbar .brand,.topbar .search,.topbar #theme')].filter(el=>getComputedStyle(el).display!=='none').map(el=>({name:el.className,...rect(el)}));
          const plate = document.querySelector('.chapter-plate');
          const cells = plate ? ['.plate-copy','.plate-drawing','.plate-label'].map(s=>({name:s,...rect(plate.querySelector(s))})) : [];
          return {theme:document.documentElement.dataset.theme, overflow:document.documentElement.scrollWidth>innerWidth, header, cells, ribbon:[...document.querySelectorAll('.stage-ribbon a')].map(rect), bodyMeasure:document.querySelector('.prose>p')?rect(document.querySelector('.prose>p')).width:null};
        });
        const failures=[];
        if(state.theme!==theme) failures.push('incorrect theme');
        if(state.overflow) failures.push('document overflow');
        for(let i=0;i<state.header.length;i++) {
          const a=state.header[i];
          if(a.x<0||a.right>width) failures.push('header outside viewport: '+a.name);
          for(const b of state.header.slice(i+1)) if(a.x<b.right&&a.right>b.x) failures.push('overlapping header controls');
          if(width<=375 && /icon-btn|search/.test(a.name) && (a.width<44||a.height<44)) failures.push('small phone control: '+a.name);
        }
        if(state.cells.length) {
          const [copy,drawing,label]=state.cells;
          if(copy.right>drawing.x+1) failures.push('plate copy/drawing overlap');
          if(Math.max(copy.bottom,drawing.bottom)>label.y) failures.push('plate footer overlap');
        }
        if(state.ribbon.some(r=>r.height<44||r.width<44)) failures.push('small ribbon target');
        if(state.bodyMeasure>680.5) failures.push('prose measure expanded');
        results.push({width,theme,route,...state,failures});
      }
    }
    for (const width of [320, 375, 720]) for (const theme of ['light', 'dark']) {
      await page.setViewport({width,height:1000});
      await page.goto(base+'/#/m/01');
      await page.evaluate(t => localStorage.setItem('s2g:theme',JSON.stringify(t)),theme);
      await page.reload({waitUntil:'networkidle0'});
      const table = await page.evaluate(() => {
        const wrap = document.querySelector('.prose > .table-scroll:has(th:nth-child(4))');
        const row = wrap.querySelector('tbody tr');
        wrap.scrollLeft=wrap.scrollWidth;
        const end = wrap.querySelector('th:last-child').getBoundingClientRect();
        const viewport=wrap.getBoundingClientRect();
        return {width:wrap.clientWidth,scrollWidth:wrap.scrollWidth,rowHeight:row.getBoundingClientRect().height,reachable:end.right<=viewport.right+1,hint:getComputedStyle(wrap,'::before').content,tabindex:wrap.getAttribute('tabindex')};
      });
      const failures=[];
      if(!table.reachable)failures.push('last table column unreachable');
      if(width<=375&&(table.rowHeight>110||!table.hint.includes('Scroll horizontally')))failures.push('cramped table or missing hint');
      if(table.scrollWidth>table.width&&table.tabindex!=='0')failures.push('table lacks keyboard scroll focus');
      results.push({width,theme,route:'m/01',check:'wide table',table,failures});
    }
    await page.goto(base+'/#/home');
    await page.keyboard.press('Tab');
    await page.evaluate(()=>document.querySelector('.journey-stage').focus());
    const focus = await page.$eval('.journey-stage',el=>({outline:getComputedStyle(el).outlineStyle,offset:getComputedStyle(el).outlineOffset}));
    results.push({route:'home',check:'journey keyboard focus is inside clipped tile',focus,failures:focus.outline==='none'||parseFloat(focus.offset)>=0?['clipped or missing focus indicator']:[]});
  } finally { await browser.close(); }
  const report={timestamp:new Date().toISOString(),scope:'All 32 chapter plates at 320px in both themes; homepage and two chapter openings at 375px, 720px and 1440px; 720px models the CSS viewport of 1440px at 200% desktop zoom. Geometry does not establish scientific correctness.',cases:results.length,failures:results.filter(r=>r.failures.length).length,results};
  fs.writeFileSync(path.join(__dirname,'reports/shell-polish.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({cases:report.cases,failures:report.failures,details:results.filter(r=>r.failures.length)},null,2));
  if(report.failures)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
