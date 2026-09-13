// Content and integration contracts that catch missing chapters, broken links and silent widget fallbacks.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root,f),'utf8');
const errors = [], warnings = [];
const check = (value, message) => { if (!value) errors.push(message); };
const sandbox = {window:{}}; vm.runInNewContext(read('site/content.js'),sandbox);
const course = sandbox.window.COURSE;
const modules = course.modules, surveys = course.survey || [];
check(modules.length===22,'Expected 22 deep modules'); check(surveys.length===10,'Expected 10 surveys');
check(modules.every((m,i)=>m.n===i),'Deep module IDs must be 00–21 in order');
check(surveys.every((m,i)=>m.n===i+1),'Survey IDs must be 01–10 in order');
const widgetFiles=fs.readdirSync(path.join(root,'site/widgets')).filter(f=>f.endsWith('.js'));
const registrations={};
for(const f of widgetFiles){
 const source=read('site/widgets/'+f); const ids=[...source.matchAll(/registerWidget\(['"]([^'"]+)['"]/g)].map(m=>m[1]);
 check(ids.length===1,'Expected one widget registration in '+f);
 for(const id of ids){check(!registrations[id],'Duplicate registration '+id);registrations[id]=f;check(id+'.js'===f,'Widget filename mismatch '+id);}
 new vm.Script(source,{filename:f});
}
check(Object.keys(registrations).length===46,'Expected 46 registered widgets');
for(const htmlFile of ['site/index.html','site/widget-test.html']){
 const html=read(htmlFile), scripts=[...html.matchAll(/<script\s+src="widgets\/([^"]+)"/g)].map(m=>m[1]);
 check(scripts.length===new Set(scripts).size,'Duplicate widget script in '+htmlFile);
 for(const f of widgetFiles)check(scripts.includes(f),'Missing widget script '+f+' in '+htmlFile);
}
const placements=JSON.parse(read('site/widget-placement.json'));
for(const [n,list] of Object.entries(placements))for(const p of list){
 check(!!registrations[p.widget],'Unknown placement widget '+p.widget);
 const mod=modules.find(m=>m.n===+n);check(!!mod,'Unknown placement module '+n);if(!mod)continue;
 check(mod.html.includes('data-widget="'+p.widget+'"'),'Widget absent in built module '+n+': '+p.widget);
 if(p.before)check(mod.toc.some(h=>new RegExp(p.before,'i').test(h.text)),'Heading fallback '+n+': '+p.widget+' / '+p.before);
}
let questions=0, links=0;
for(const m of modules){
 const qs=m.quiz?.questions;check(Array.isArray(qs)&&qs.length===8,'Module '+m.n+' needs 8 quiz questions');
 for(const [i,q] of (qs||[]).entries()){
  questions++; check(typeof q.q==='string'&&q.q.trim(),'Empty question '+m.n+'/'+i);
  check(Array.isArray(q.options)&&q.options.length>=2&&q.options.every(o=>typeof o==='string'&&o.trim()),'Invalid options '+m.n+'/'+i);
  check(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,'Answer index out of range '+m.n+'/'+i);
  check(typeof q.explanation==='string'&&q.explanation.trim(),'Missing explanation '+m.n+'/'+i);
 }
}
const docs=[...modules.map(m=>({m,track:'m'})),...surveys.map(m=>({m,track:'s'}))];
for(const {m,track} of docs){
 const ids=[...m.html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);check(ids.length===new Set(ids).size,'Duplicate heading IDs '+track+'/'+m.n);
 for(const match of m.html.matchAll(/data-widget="([^"]+)"/g))check(!!registrations[match[1]],'Unknown embedded widget '+match[1]);
 for(const match of m.html.matchAll(/href="(#[^"]*)"/g)){
  const href=match[1];links++;
  if(href==='#/home')continue;
  const route=href.match(/^#\/(m|s)\/(\d+)(?:\/([^?]+))?$/);
  if(route){const target=(route[1]==='m'?modules:surveys).find(d=>d.n===+route[2]);check(!!target,'Missing link target '+href+' from '+track+'/'+m.n);if(target&&route[3])check(target.html.includes('id="'+route[3]+'"'),'Missing link anchor '+href);}
  else if(!href.startsWith('#/'))check(ids.includes(href.slice(1)),'Missing local anchor '+href+' in '+track+'/'+m.n);
  else errors.push('Malformed course route '+href);
 }
 if(m.html.includes('<del>'))warnings.push('Review strikethrough in '+track+'/'+m.n);
}
const report={timestamp:new Date().toISOString(),modules:modules.length,surveys:surveys.length,widgets:widgetFiles.length,quizQuestions:questions,internalLinksChecked:links,errors,warnings};
fs.mkdirSync(path.join(root,'qa/reports'),{recursive:true});fs.writeFileSync(path.join(root,'qa/reports/static-check.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));process.exitCode=errors.length?1:0;
