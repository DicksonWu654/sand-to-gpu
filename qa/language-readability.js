// Focused rendered-reading checks after editorial changes; no interaction/diagram sweep.
const fs=require('fs'),path=require('path');
const {launch}=require('./browser');
const root=path.resolve(__dirname,'..'),base=process.env.QA_BASE_URL||'http://127.0.0.1:8790';
const shots=path.join(root,'qa/shots/language-review');fs.mkdirSync(shots,{recursive:true});
const targets=[
 {id:'m04-opening',route:'#/m/04',prefix:'Materials play two roles in a chip factory'},
 {id:'m04-gan',route:'#/m/04',prefix:'Intuition: charge gathers at a boundary.'},
 {id:'m04-upw',route:'#/m/04',prefix:'Intuition: resistivity is a live ion meter.'},
 {id:'s06-high-low-k',route:'#/s/06',prefix:'Insulation between neighboring wires has the opposite electrical job'},
];
(async()=>{
 const browser=await launch(),cases=[];
 try{
  for(const width of [1280,375]){
   // Disposable browser contexts prevent this audit from changing reader progress or preferences.
   const context=await browser.createBrowserContext(),page=await context.newPage();
   await page.setViewport({width,height:900,deviceScaleFactor:1});
   await page.evaluateOnNewDocument(()=>{localStorage.setItem('s2g:theme',JSON.stringify('light'));});
   for(const target of targets){
    await page.goto(base+'/'+target.route,{waitUntil:'networkidle0'});
    await page.waitForSelector('.prose');await page.evaluate(()=>document.fonts.ready);
    const found=await page.evaluate(prefix=>{
     document.querySelectorAll('[data-language-target]').forEach(p=>p.removeAttribute('data-language-target'));
     const paragraph=[...document.querySelectorAll('.prose p')].find(p=>p.textContent.startsWith(prefix));
     if(!paragraph)return false;
     paragraph.dataset.languageTarget='true';paragraph.scrollIntoView({block:'center',behavior:'instant'});return true;
    },target.prefix);
    if(!found)throw Error('Missing revised passage: '+target.id);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const el=await page.$('[data-language-target]'),screenshot=path.join(shots,`${target.id}-${width}-light.png`);
    await el.screenshot({path:screenshot});
    const result=await el.evaluate(p=>{
     const box=p.getBoundingClientRect(),style=getComputedStyle(p),rects=[];
     const walk=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);
     while(walk.nextNode()){const range=document.createRange();range.selectNodeContents(walk.currentNode);for(const r of range.getClientRects())if(r.width>0)rects.push({left:r.left,right:r.right,top:r.top,bottom:r.bottom});}
     return{callout:!!p.closest('aside.callout'),theme:document.documentElement.dataset.theme,paragraphWidth:box.width,paragraphHeight:box.height,fontSize:parseFloat(style.fontSize),lineHeight:parseFloat(style.lineHeight),documentOverflow:document.documentElement.scrollWidth>innerWidth+1,textOutsideParagraph:rects.filter(r=>r.left<box.left-2||r.right>box.right+2).length,textOutsideViewport:rects.filter(r=>r.left<0||r.right>innerWidth+1).length,text:p.textContent};
    });
    const failures=[];
    if(!result.text.startsWith(target.prefix))failures.push('captured wrong passage');
    if(result.theme!=='light')failures.push('wrong rendered theme');
    if(result.documentOverflow)failures.push('document horizontal overflow');
    if(result.textOutsideParagraph||result.textOutsideViewport)failures.push('paragraph horizontal clipping');
    const minimumFontSize=result.callout?15:16;
    if(result.fontSize<minimumFontSize||result.lineHeight/result.fontSize<1.4)failures.push('text below reviewed body/callout size or line-height criteria');
    cases.push({...target,width,screenshot,...result,failures});
   }
   await context.close();
  }
 }finally{await browser.close();}
 const report={checkedAt:new Date().toISOString(),scope:'Four revised passages at desktop/phone sizes in isolated light-theme browser contexts. Internal paragraph geometry and exact requested passage presence checked; screenshots require manual reading review.',criteria:'Body text at least 16 px; existing callout treatment at least 15 px; line height at least 1.4 times font size. These are focused review criteria, not a universal accessibility certification.',initialObservation:'An initial blanket 16 px threshold flagged the inherited 15 px phone callouts (25.8 px line height). Full-size manual review found them legible, and root chose to retain the existing CSS during this editorial pass. Callout and body criteria are now distinguished; the original observation is retained here.',cases:cases.length,failures:cases.filter(c=>c.failures.length).length,results:cases};
 fs.writeFileSync(path.join(root,'qa/reports/language-readability.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({cases:report.cases,failures:report.failures,shots},null,2));if(report.failures)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
