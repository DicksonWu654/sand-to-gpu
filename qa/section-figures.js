// Check built figure semantics and prove the original course text/heading contracts survive the refactor.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process');
const {launch}=require('./browser');
const {coverage}=require('../course/visuals/render');
const root=path.resolve(__dirname,'..');
function course(source){let sandbox={window:{}};vm.runInNewContext(source,sandbox);return sandbox.window.COURSE;}
(async()=>{
 const actual=course(fs.readFileSync(path.join(root,'site/content.js'),'utf8'));
 // The baseline is the signed course continuation before the visual refactor.
 const baseline=course(cp.execFileSync('git',['show','adc7c74c0543d95a083cbf224274b4ba89008b7d:site/content.js'],{cwd:root,encoding:'utf8',maxBuffer:15*1024*1024}));
 const intended=coverage(true),placements=JSON.parse(fs.readFileSync(path.join(root,'site/widget-placement.json')));
 const browser=await launch();let result;
 try{const page=await browser.newPage();result=await page.evaluate(({actual,baseline,intended,placements})=>{
  let errors=[],figures=0,svgs=0,widgets=0,originalTextLessons=0,headingLessons=0;
  function dom(html){const d=document.createElement('div');d.innerHTML=html;return d;}
  const all=[...actual.modules.map(m=>({m,track:'m',old:baseline.modules.find(x=>x.n===m.n)})),...actual.survey.map(m=>({m,track:'s',old:baseline.survey.find(x=>x.n===m.n)}))];
  for(const {m,track,old}of all){const key=track+'/'+m.n,d=dom(m.html),before=dom(old.html),expected=intended.lessons.find(l=>l.track===track&&l.lesson===m.n);const figs=[...d.querySelectorAll('.section-figure')];
   if(figs.length!==expected.expected||m.figureCount!==expected.expected)errors.push(key+' figure cardinality');
   const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);if(ids.length!==new Set(ids).size)errors.push(key+' duplicate IDs');
   let owner=null;for(const e of d.querySelectorAll('h2,figure.section-figure')){if(e.tagName==='H2')owner=e.id;else if(e.dataset.sectionFigure!==owner)errors.push(key+' figure ownership '+e.dataset.sectionFigure+' under '+owner);}
   for(const f of figs){figures++;if(!f.querySelector('figcaption')?.textContent.trim())errors.push(key+' missing caption');if(!f.querySelector('.sf-title')?.textContent.trim())errors.push(key+' missing title');if(!f.querySelector('.sf-legend,.sf-scene-key')?.textContent.trim())errors.push(key+' missing explanation');const sceneKey=f.querySelector('.sf-scene-key');if(sceneKey){const labels=[...sceneKey.querySelectorAll('li')];if(!labels.length||labels.some(li=>!li.querySelector('b')?.textContent.trim()||!li.querySelector('span')?.textContent.trim()))errors.push(key+' incomplete scene key');}}
   for(const svg of d.querySelectorAll('figure svg')){svgs++;if(svg.getAttribute('aria-hidden')==='true'){const connection=svg.closest('.sf-connection'),row=connection?.closest('li'),endpoints=[...(row?.querySelectorAll('.sf-endpoint strong')||[])];if(!connection?.querySelector('span')?.textContent.trim()||endpoints.length!==2||endpoints.some(e=>!e.textContent.trim()))errors.push(key+' decorative connector missing equivalent relationship text');}else if(!(svg.getAttribute('aria-label')||svg.getAttribute('aria-labelledby')))errors.push(key+' unlabeled SVG');}
   for(const e of d.querySelectorAll('[aria-labelledby],[aria-describedby]'))for(const attr of ['aria-labelledby','aria-describedby'])for(const id of (e.getAttribute(attr)||'').split(/\s+/).filter(Boolean))if(!ids.includes(id))errors.push(key+' unresolved accessible label '+id);
   for(const e of d.querySelectorAll('[marker-end]')){const id=e.getAttribute('marker-end').match(/#([^)]*)/);if(id&&!ids.includes(id[1]))errors.push(key+' unresolved SVG marker '+id[1]);}
   if(track==='m')for(const p of placements[m.n]||[]){if(!p.before)continue;const w=d.querySelector('[data-widget="'+p.widget+'"]');if(!w){errors.push(key+' missing widget '+p.widget);continue;}let heading=null;for(const e of d.querySelectorAll('h2,h3,.widget')){if(e===w)break;if((e.tagName==='H2'||e.tagName==='H3')&&!e.closest('figure'))heading=e;}if(!heading||!new RegExp(p.before,'i').test(heading.textContent))errors.push(key+' widget section ownership '+p.widget);}
   widgets+=d.querySelectorAll('.widget').length;
   d.querySelectorAll('figure.section-figure,.widget').forEach(e=>e.remove());before.querySelectorAll('.widget').forEach(e=>e.remove());
   const text=e=>e.textContent.replace(/\s+/g,' ').trim();if(text(d)!==text(before))errors.push(key+' original prose changed');else originalTextLessons++;
   const headings=e=>[...e.querySelectorAll('h2,h3')].map(h=>[h.id,h.textContent]);if(JSON.stringify(headings(d))!==JSON.stringify(headings(before)))errors.push(key+' original heading contract changed');else headingLessons++;
   if(JSON.stringify(m.quiz)!==JSON.stringify(old.quiz))errors.push(key+' quiz changed');
  }
  return {lessons:all.length,figures,svgs,widgets,originalTextLessons,headingLessons,errors};
 },{actual,baseline,intended,placements});}finally{await browser.close();}
 const report={checkedAt:new Date().toISOString(),baseline:'adc7c74c0543d95a083cbf224274b4ba89008b7d',...result};fs.writeFileSync(path.join(root,'qa/reports/section-figures.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(result.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
