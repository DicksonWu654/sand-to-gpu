// Focused visual, control and cleanup regressions for the four second-round teaching labs.
// Run: node qa/round2-labs.js [widget-id ...]
const { launch } = require('./browser');
const fs = require('fs'), path = require('path');
const analyze = require('./analyze');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['purity','cz-puller','wafer-slicing','ald-cycle'];
const out = process.env.QA_SHOT_DIR || '/tmp/labs-round2-final'; fs.mkdirSync(out,{recursive:true});
const report = {timestamp:new Date().toISOString(),cases:[],errors:[]};
(async()=>{
 const browser=await launch(); const page=await browser.newPage(); await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 page.on('pageerror',e=>report.errors.push(e.message));
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const snapshot=async(id,width,theme,tag)=>{
  await sleep(100); const result=await page.evaluate(analyze);
  const runtime=await page.evaluate(()=>({theme:document.documentElement.dataset.theme,bodyFont:getComputedStyle(document.querySelector('#box .widget-body')).fontFamily,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,wrapperCount:document.querySelectorAll('#box .diagram-scroll').length,svgCount:document.querySelectorAll('#box svg.w-svg').length,hintCount:document.querySelectorAll('#box .diagram-scroll-hint').length,errors:document.querySelector('#err').textContent}));
  return {tag,...result,...runtime};
 };
 for(const id of ids)for(const width of [760,360])for(const theme of ['light','dark']){
  const entry={id,width,theme,checks:[],states:[]}; report.cases.push(entry);
  try{
   await page.setViewport({width:width+40,height:900});
   await page.goto('http://127.0.0.1:8790/widget-test.html?w='+id,{waitUntil:'domcontentloaded'});
   await page.evaluate(({id,theme})=>{document.documentElement.dataset.theme=theme;const box=document.querySelector('.article');box.style.maxWidth='none';box.style.width='100%';const pick=document.querySelector('#pick');pick.value=id;pick.dispatchEvent(new Event('change'));},{id,theme});
   await sleep(180); entry.states.push(await snapshot(id,width,theme,'initial')); await (await page.$('#box')).screenshot({path:path.join(out,id+'-'+width+'-'+theme+'-initial.png')});
   await page.evaluate(()=>{document.querySelectorAll('#box details').forEach(d=>d.open=true);}); await sleep(200);entry.states.push(await snapshot(id,width,theme,'references'));await page.evaluate(()=>{document.querySelectorAll('#box details').forEach(d=>d.open=false);});
   const before=await page.$eval('#box',e=>e.innerHTML);
   const result=await page.evaluate(async id=>{
    const box=document.querySelector('#box'),checks=[];
    const expect=(test,msg)=>{if(!test)throw new Error(msg);checks.push(msg)};
    const set=(sel,value)=>{const e=box.querySelector(sel);if(!e)throw new Error('Missing control '+sel);if(e.type==='checkbox')e.checked=value;else e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return e;};
    const byLabel=(label,value)=>{const l=[...box.querySelectorAll('label')].find(l=>l.querySelector('span')?.textContent.trim()===label);if(!l)throw new Error('Missing label '+label);const e=l.querySelector('input,select');if(!e)throw new Error('Missing input '+label);if(e.type==='checkbox')e.checked=value;else e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return e;};
    const click=sel=>{const e=box.querySelector(sel);if(!e)throw new Error('Missing button '+sel);e.click()};
    const clickText=text=>{const e=[...box.querySelectorAll('button')].find(b=>b.textContent.trim()===text);if(!e)throw new Error('Missing button text '+text);e.click()};
    const text=()=>box.textContent.replace(/[\u2009,]/g,'');
    const detail=box.querySelector('details'); if(detail)detail.open=true;
    if(id==='purity'){
      for(let n=2;n<=11;n++){set('input[aria-label="Purity in nines"]',n);expect(box.querySelector('output').textContent===n+'N','Purity '+n+'N selected');}
      for(const button of box.querySelectorAll('[data-purity]')){button.click();expect(button.getAttribute('aria-pressed')==='true','Preset '+button.dataset.purity+' selected');}
      set('input[aria-label="Purity in nines"]',9);expect(text().includes('50 trillion'),'9N retains 50 trillion impurities per cm³');
      set('input[aria-label="Purity in nines"]',2);
    }else if(id==='cz-puller'){
      for(let n=0;n<20;n++){const i=n%5;click('[data-phase="'+i+'"]');expect(box.querySelector('.count').textContent==='Phase '+(i+1)+' / 5','Crystal phase '+i+' selected');}
      for(const v of [.5,1.5])byLabel('Pull rate (body)',v);
      byLabel('Crucible rotation',15);byLabel('Animation speed',4);
      for(let n=0;n<16;n++)click('[data-cz-view="'+(n%2?'apparatus':'neck')+'"]');
      click('[data-cz-view="neck"]');expect(box.querySelector('svg').getAttribute('aria-label').includes('Magnified seed'),'Seed neck is a real detail view');
      click('[data-cz-view="apparatus"]');click('[data-phase="3"]');
      const play=[...box.querySelectorAll('button')].find(x=>x.textContent==='Play');play.click();await new Promise(r=>setTimeout(r,180));play.click();expect(play.textContent==='Play','Crystal playback pauses');
    }else if(id==='wafer-slicing'){
      byLabel('Sliceable length (after sectioning)',1965);byLabel('As-cut slice thickness',890);byLabel('Diamond-wire kerf',160);
      expect(text().includes('1814 (1871)'),'Default wafer count matches length / pitch and shipping yield');
      for(const side of ['min','max'])for(const input of box.querySelectorAll('input[type=range]')){input.value=input[side];input.dispatchEvent(new Event('input',{bubbles:true}));}
      expect(!/NaN|Infinity/.test(text()),'Saw slider extremes remain finite');
      byLabel('As-cut slice thickness',890);byLabel('Diamond-wire kerf',120);
    }else if(id==='ald-cycle'){
      for(let n=0;n<16;n++){click('.w-lab-progress button:nth-child('+(n%4+1)+')');expect(box.querySelectorAll('.w-lab-progress [aria-pressed="true"]').length===1,'One ALD phase selected');}
      set('select','HfO2');set('input[type=number]',2);expect(text().includes('25'),'Hafnia target requires 25 calibrated cycles');
      set('select','Al2O3');set('input[type=number]',50);expect(text().includes('500'),'50nm alumina target requires 500 cycles');
      set('input[aria-label="Precursor dose"]',0);click('.w-lab-progress button:nth-child(4)');click('button[title="Next step"]');expect(text().includes('0.00 nm'),'Zero dose adds zero thickness');
      set('input[aria-label="Precursor dose"]',2);for(let i=1;i<=4;i++)set('input[aria-label="Timing step '+i+'"]',i%2?1:5);
      set('input[type=number]',.2);click('.w-lab-progress button:nth-child(3)');
    }
    expect(!/NaN|Infinity/.test(text()),'All displayed calculations remain finite');
    if(detail)detail.open=false;
    return checks;
   },id);
   entry.checks.push(...result);await sleep(150);entry.states.push(await snapshot(id,width,theme,'exercised')); await (await page.$('#box')).screenshot({path:path.join(out,id+'-'+width+'-'+theme+'-exercised.png')});
   if(id==='cz-puller'){await page.click('[data-cz-view=neck]');await sleep(150);entry.states.push(await snapshot(id,width,theme,'neck-detail'));await (await page.$('#box')).screenshot({path:path.join(out,id+'-'+width+'-'+theme+'-neck-detail.png')});await page.click('[data-cz-view=apparatus]');}
   const after=await page.$eval('#box',e=>e.innerHTML);entry.returnedToInitialState=before===after;
   for(const state of entry.states){if(state.theme!==theme)throw new Error('Theme mismatch');if(!/sans-serif/i.test(state.bodyFont))throw new Error('Lab body lost sans-serif typography: '+state.bodyFont);if(state.errors)throw new Error(state.errors);if(state.overlaps.length||state.overflow.length||state.tinyText.length)throw new Error('Visual defect: '+JSON.stringify({overlap:state.overlaps,overflow:state.overflow,tiny:state.tinyText}));if(state.scrollWidth>state.viewport+2)throw new Error('Document overflow');if(state.wrapperCount>state.svgCount||state.hintCount>state.wrapperCount)throw new Error('Diagram wrapper accumulation');}
   // Remount exercises the returned cleanup function, including active animations and observers.
   await page.evaluate(id=>{for(let n=0;n<3;n++){const p=document.querySelector('#pick');p.value=id;p.dispatchEvent(new Event('change'));}},id);await sleep(150);entry.states.push(await snapshot(id,width,theme,'remounted'));
   await page.$eval('#box',e=>e.scrollIntoView({block:'start'}));
   await (await page.$('#box')).screenshot({path:path.join(out,id+'-'+width+'-'+theme+'-refactor.png'),captureBeyondViewport:true});
   entry.passed=true;
  }catch(e){entry.passed=false;entry.failure=e.message;}
  console.log(id,width,theme,entry.passed?'PASS':'FAIL '+entry.failure);
 }
 await browser.close(); fs.mkdirSync('qa/reports',{recursive:true});fs.writeFileSync('qa/reports/round2-labs.json',JSON.stringify(report,null,2)+'\n');
 console.log('Completed',report.cases.length,'cases;',report.cases.filter(x=>!x.passed).length,'failed');process.exitCode=report.errors.length||report.cases.some(x=>!x.passed)?1:0;
})().catch(e=>{console.error(e);process.exitCode=1});
