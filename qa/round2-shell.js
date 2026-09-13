// Verify the chapter plates and source CSS rules, including selectors silently dropped by the browser.
const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
const source = fs.readFileSync(path.join(__dirname, '../site/styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const selectors = [...source.matchAll(/([^{}]+)\{/g)].map(m => m[1].trim()).filter(s => !s.startsWith('@'));
const declarations = [...source.matchAll(/\{([^{}]*)\}/g)].flatMap(m => m[1].split(';').map(s => s.trim()).filter(Boolean)).map(s => { const i=s.indexOf(':'); return [s.slice(0,i).trim(),s.slice(i+1).trim()]; });
(async () => {
  const browser = await launch();
  const results = [];
  let css;
  try {
    const page = await browser.newPage();
    await page.goto(base + '/#/home');
    css = await page.evaluate(({ selectors, declarations }) => {
      const sheet = new CSSStyleSheet();
      const rejectedSelectors=selectors.filter(s=>{try{const i=sheet.insertRule(s+' {}',sheet.cssRules.length);return !sheet.cssRules[i].selectorText;}catch{return true;}});
      const el=document.createElement('div');
      const rejectedDeclarations=declarations.filter(([p,v])=>{el.style.cssText='';el.style.setProperty(p,v.replace(/\s*!important\s*$/, ''), /!important\s*$/.test(v)?'important':'');return !el.style.getPropertyValue(p);});
      return {selectors:selectors.length,declarations:declarations.length,rejectedSelectors,rejectedDeclarations};
    }, {selectors,declarations});
    const routes=['#/home','#/m/01','#/m/04','#/m/08','#/m/17','#/s/08'];
    for(const width of [1280,375]) for(const theme of ['light','dark']) {
      await page.setViewport({width,height:900});
      await page.evaluate(t=>{localStorage.setItem('s2g:theme',JSON.stringify(t));},theme);
      await page.reload({waitUntil:'networkidle0'});
      for(const route of routes) {
        await page.evaluate(hash=>{location.hash=hash;},route);
        await page.waitForFunction(hash=>{if(hash==='#/home')return !!document.querySelector('.home-hero'); const [,track,num]=hash.match(/^#\/(m|s)\/(\d+)/);const doc=(track==='m'?COURSE.modules:COURSE.survey).find(m=>m.n===Number(num));return document.querySelector('h1.title')?.textContent===doc.title;},{},route);
        const actual=await page.evaluate(()=>{
          const plate=document.querySelector('.chapter-plate');
          const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
          return {
            theme:document.documentElement.dataset.theme,
            overflow:document.documentElement.scrollWidth>innerWidth,
            plateCount:document.querySelectorAll('.chapter-plate').length,
            duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),
            plateMinimumLabel:plate?Math.min(...[...plate.querySelectorAll('.plate-label,.plate-label small')].map(el=>parseFloat(getComputedStyle(el).fontSize))):null,
            plateSvg:plate?.querySelector('svg')?.getAttribute('viewBox'),
            duplicateSectionNumbers:[...document.querySelectorAll('#rail a.d2')].filter(el=>/^\d/.test(el.querySelector('span:last-child')?.textContent||'')).map(el=>el.textContent),
          };
        });
        const failures=[];
        if(actual.theme!==theme) failures.push('actual theme');
        if(actual.overflow) failures.push('document overflow');
        if(actual.duplicateIds.length) failures.push('duplicate IDs');
        if(actual.plateCount!==(route==='#/home'?0:1)) failures.push('chapter plate count');
        if(actual.plateMinimumLabel!==null&&actual.plateMinimumLabel<10) failures.push('small plate labels');
        if(actual.duplicateSectionNumbers.length) failures.push('duplicate navigation numbering');
        results.push({route,width,theme,...actual,failures});
      }
    }
  } finally { await browser.close(); }
  const report={timestamp:new Date().toISOString(),css,cases:results.length,failures:results.filter(r=>r.failures.length).length+css.rejectedSelectors.length+css.rejectedDeclarations.length,results};
  fs.writeFileSync(path.join(__dirname,'reports/round2-shell.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({css,cases:report.cases,failures:report.failures},null,2));
  if(report.failures)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
