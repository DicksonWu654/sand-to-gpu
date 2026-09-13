// Render the qualified educational copy in its actual widget state.
const {launch}=require('./browser');
const analyze=require('./analyze');
const fs=require('fs'),path=require('path');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8790';
(async()=>{
 const browser=await launch(),page=await browser.newPage(),results=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 fs.mkdirSync(path.join(__dirname,'shots/copy-smoke'),{recursive:true});
 try{
  for(const theme of ['dark','light'])for(const id of ['moores-law','node-table','ald-cycle']){
   await page.setViewport({width:400,height:900});await page.goto(base+'/widget-test.html?w='+id,{waitUntil:'load'});
   await page.evaluate(theme=>{localStorage.clear();document.documentElement.dataset.theme=theme;document.getElementById('pick').dispatchEvent(new Event('change'));},theme);
   const states=id==='moores-law'?['a100','gv100']:[id];
   for(const state of states){
    await page.evaluate(({id,state})=>{if(id==='moores-law')document.querySelector(`[data-chip="${state}"]`).dispatchEvent(new Event('click'));if(id==='ald-cycle')document.querySelectorAll('.w-step-dot')[3].click();if(id==='node-table')document.querySelector('#box input[type=checkbox]').click();},{id,state});
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const metrics=await page.evaluate(analyze),text=await page.$eval('#box',e=>e.innerText);
    const expected=state==='a100'?/40 GB A100 uses HBM2; the later 80 GB version uses HBM2e/:state==='gv100'?/specialized wafer-scale circuits can span multiple fields/:id==='ald-cycle'?/both half-reactions saturate/:/deposited dielectric films can be 2 nm or thinner/;
    if(!expected.test(text))throw new Error(id+': qualified copy not visible');
    if(metrics.overlaps.length||metrics.overflow.length||metrics.tinyText.length)throw new Error(id+': '+JSON.stringify(metrics));
    const shot=path.join(__dirname,'shots/copy-smoke',state+'-'+theme+'.png');await(await page.$('#box')).screenshot({path:shot});results.push({id,state,theme,shot:path.relative(path.resolve(__dirname,'..'),shot),metrics});
   }
  }
  if(errors.length)throw new Error(errors.join('; '));const report={timestamp:new Date().toISOString(),results,errors};fs.mkdirSync(path.join(__dirname,'reports'),{recursive:true});fs.writeFileSync(path.join(__dirname,'reports/copy-smoke.json'),JSON.stringify(report,null,2)+'\n');console.log(results.length+' qualified-copy states rendered without layout flags');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
