// Prove content-contract failures using copies; never alter the user's live preview.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),os=require('os'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),live=path.join(root,'site/content.js');
const liveBytes=fs.readFileSync(live),liveMtime=fs.statSync(live).mtimeMs;
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const source=()=>{const s={window:{}};vm.runInNewContext(liveBytes.toString('utf8'),s);return s.window.COURSE;};
const directory=fs.mkdtempSync(path.join(os.tmpdir(),'sand-to-gpu-language-negative-'));
const cases=[
 {name:'prose-corruption',change:c=>{const m=c.modules.find(m=>m.n===4);m.html=m.html.replace('<p>','<p>Injected prose corruption. ');},expected:'m/4 built prose differs from current authored source'},
 {name:'quiz-wording-corruption',change:c=>{c.modules.find(m=>m.n===14).quiz.questions[0].q+=' Injected quiz corruption.';},expected:'m/14 built quiz differs from current authored quiz'},
 {name:'quiz-option-corruption',change:c=>{c.modules.find(m=>m.n===14).quiz.questions[0].options[0]+=' Injected option corruption.';},expected:'m/14 historical quiz structure changed'},
 ...[[1,5],[20,4],[20,5]].map(([module,question])=>({name:`reviewed-option-still-protected-${module}-${question}`,change:c=>{c.modules.find(m=>m.n===module).quiz.questions[question-1].options[0]+=' Unauthorized follow-up.';},expected:`m/${module} historical quiz structure changed`})),
 {name:'unlisted-option-in-amended-module',change:c=>{c.modules.find(m=>m.n===20).quiz.questions[0].options[0]+=' Unauthorized adjacent edit.';},expected:'m/20 historical quiz structure changed'},
 {name:'answer-index-in-amended-question',change:c=>{c.modules.find(m=>m.n===1).quiz.questions[4].answer=0;},expected:'m/1 historical quiz structure changed'},
 {name:'historical-heading-text',change:c=>{const m=c.modules.find(m=>m.n===20);m.html=m.html.replace(/(<h2\b[^>]*>)/,'$1Unauthorized heading text ');},expected:'m/20 original heading contract changed'},
 {name:'missing-lesson',change:c=>{c.modules=c.modules.filter(m=>m.n!==4);},expected:'historical lesson identity contract changed'},
];
const results=[];
for(const test of cases){
 const copy=source();test.change(copy);
 const input=path.join(directory,test.name+'.js'),reportFile=path.join(directory,test.name+'.json');
 fs.writeFileSync(input,'window.COURSE = '+JSON.stringify(copy)+';\n');
 const run=cp.spawnSync(process.execPath,[path.join(root,'qa/section-figures.js')],{cwd:root,env:{...process.env,QA_CONTENT_FILE:input,QA_REPORT_FILE:reportFile},encoding:'utf8',maxBuffer:1024*1024});
 const report=fs.existsSync(reportFile)?JSON.parse(fs.readFileSync(reportFile,'utf8')):null;
 const detected=run.status===1&&report?.errors.includes(test.expected);
 results.push({case:test.name,input,reportFile,exitCode:run.status,expected:test.expected,errors:report?.errors||[run.stderr],detected});
}
const unchanged=hash(fs.readFileSync(live))===hash(liveBytes)&&fs.statSync(live).mtimeMs===liveMtime;
const finalFile=path.join(root,'qa/reports/language-build-contract-review.json');
const existing=JSON.parse(fs.readFileSync(finalFile,'utf8'));
const report={...existing,checkedAt:new Date().toISOString(),liveContentFile:live,negativeTestBaseContentSha256:hash(liveBytes),livePreviewUntouched:unchanged,negativeTests:results};
fs.writeFileSync(finalFile,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({cases:results.length,detected:results.filter(r=>r.detected).length,livePreviewUntouched:unchanged,directory},null,2));
if(!unchanged||results.some(r=>!r.detected))process.exitCode=1;
