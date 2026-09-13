// Regression: rerendered SVGs must reuse their viewport without nested wrappers or orphan hints.
const {launch}=require('./browser');
const fs=require('fs'),path=require('path');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8790';
const settle=page=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
const assert=(value,message)=>{if(!value)throw new Error(message);};
(async()=>{
 const browser=await launch(),page=await browser.newPage(),results=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  for(const theme of ['dark','light'])for(const id of ['cowos-flow','rayleigh','scale-ladder','moores-law']){
   await page.setViewport({width:400,height:900});
   await page.goto(base+'/widget-test.html?w='+id,{waitUntil:'load'});
   await page.evaluate(theme=>{localStorage.clear();document.documentElement.dataset.theme=theme;document.getElementById('pick').dispatchEvent(new Event('change'));},theme);await settle(page);
   const themeState=await page.evaluate(()=>({actual:document.documentElement.dataset.theme,scheme:getComputedStyle(document.documentElement).colorScheme,background:getComputedStyle(document.body).backgroundColor}));
   assert(themeState.actual===theme&&themeState.scheme===theme,id+': wrong theme');
   const samples=[];
   async function sample(){
    await settle(page);
    const s=await page.evaluate(()=>{
     const b=document.getElementById('box'),regions=[...b.querySelectorAll('.diagram-scroll')],hints=[...b.querySelectorAll('.diagram-scroll-hint')];
     return{regions:regions.length,hints:hints.length,svgs:b.querySelectorAll('svg.w-svg[viewBox]').length,nested:!!b.querySelector('.diagram-scroll .diagram-scroll'),orphanHint:hints.some(h=>!h.previousElementSibling?.matches('.diagram-scroll')),invalidRegion:regions.some(r=>!r.querySelector(':scope > svg.w-svg[viewBox]')||!r.nextElementSibling?.matches('.diagram-scroll-hint')),overflow:document.documentElement.scrollWidth>innerWidth+1,error:document.getElementById('err').textContent};
    });
    assert(!s.nested&&!s.orphanHint&&!s.invalidRegion&&!s.overflow&&!s.error&&s.regions===s.hints&&s.regions<=s.svgs,id+': '+JSON.stringify(s));samples.push(s);
   }
   if(id==='cowos-flow'){
    // Traverse every step forward/backward three times; each next/prev replaces the cross-section SVG.
    for(let repeat=0;repeat<3;repeat++)for(const direction of ['Next','Prev'])for(let i=0;i<11;i++){
     await page.evaluate(direction=>[...document.querySelectorAll('#box button')].find(b=>b.textContent.includes(direction))?.click(),direction);await sample();
    }
   }else{
    const controls=await page.evaluate(()=>[...document.querySelectorAll('#box select,#box input[type=range]')].map((e,i)=>{e.dataset.regression=i;return{index:i,values:e.tagName==='SELECT'?[...e.options].map(o=>o.value):[e.min,e.max]};}));
    for(let repeat=0;repeat<3;repeat++)for(const c of controls)for(const value of c.values){
     await page.evaluate(({index,value})=>{const e=document.querySelector(`[data-regression="${index}"]`);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));},{index:c.index,value});await sample();
    }
   }
   results.push({id,theme,themeState,mutations:samples.length,maxRegions:Math.max(...samples.map(s=>s.regions)),maxHints:Math.max(...samples.map(s=>s.hints)),failures:[]});
  }
  assert(!errors.length,errors.join('; '));
  const report={timestamp:new Date().toISOString(),results,errors};fs.mkdirSync(path.join(__dirname,'reports'),{recursive:true});fs.writeFileSync(path.join(__dirname,'reports/diagram-regression.json'),JSON.stringify(report,null,2)+'\n');console.log(report);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
