// Focused interaction regressions for the eight redesigned teaching labs.
// Run: node qa/flagship-refactor.js [widget-id ...]
const { launch } = require('./browser');
const fs = require('fs'), path = require('path');
const analyze = require('./analyze');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['chain-map','scale-ladder','hbm-stack','euv-source','cowos-flow','rack-explorer','transistor-evolution','etch-profile'];
const out = process.env.QA_SHOT_DIR || '/tmp/widget-after'; fs.mkdirSync(out,{recursive:true});
const report = {timestamp:new Date().toISOString(),cases:[],errors:[]};
(async()=>{
 const browser=await launch(); const page=await browser.newPage();
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
   await sleep(180); entry.states.push(await snapshot(id,width,theme,'initial'));
   const before=await page.$eval('#box',e=>e.innerHTML);
   const result=await page.evaluate(async id=>{
    const box=document.querySelector('#box'),checks=[];
    const expect=(test,msg)=>{if(!test)throw new Error(msg);checks.push(msg)};
    const set=(sel,value)=>{const e=box.querySelector(sel);if(!e)throw new Error('Missing control '+sel);if(e.type==='checkbox')e.checked=value;else e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return e;};
    const byLabel=(label,value)=>{const l=[...box.querySelectorAll('label')].find(l=>l.querySelector('span')?.textContent.trim()===label);if(!l)throw new Error('Missing label '+label);const e=l.querySelector('input,select');if(!e)throw new Error('Missing input '+label);if(e.type==='checkbox')e.checked=value;else e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return e;};
    const click=sel=>{const e=box.querySelector(sel);if(!e)throw new Error('Missing button '+sel);e.click()};
    const clickText=text=>{const e=[...box.querySelectorAll('button')].find(b=>b.textContent.trim()===text);if(!e)throw new Error('Missing button text '+text);e.click()};
    const text=()=>box.textContent.replace(/[\u2009,]/g,'');
    if(id==='chain-map'){
     const select=box.querySelector('select[aria-label="Manufacturing stage"]');
     for(const option of select.options)set('select[aria-label="Manufacturing stage"]',option.value);
     for(const phase of box.querySelectorAll('[data-phase]'))phase.click();
     set('select[aria-label="Manufacturing stage"]','hbm');expect(/DRAM|memory/i.test(box.querySelector('.w-insight').textContent),'Memory branch has its own explanation');
     set('select[aria-label="Manufacturing stage"]','cowos');expect(/CoWoS/.test(text()),'CoWoS stage selectable');
    }else if(id==='scale-ladder'){
     for(const [a,b]of[['rack','bond'],['bond','rack'],['die','die'],['hbmthk','ubump']]){set('select[aria-label="Item A"]',a);set('select[aria-label="Item B"]',b);expect(!/NaN|Infinity/.test(text()),'Finite scale comparison '+a+'/'+b);}
     set('select[aria-label="Item A"]','die');set('select[aria-label="Item B"]','mp');
    }else if(id==='hbm-stack'){
     for(const g of ['HBM2E','HBM3','HBM3E','HBM4']){set('select[aria-label="HBM generation"]',g);expect([...box.querySelectorAll('select')].every(s=>s.selectedIndex>=0),'Valid options after '+g);}
     set('select[aria-label="Stack height"]',16);set('select[aria-label="Per-die capacity"]',32);set('input[aria-label="Pin data rate"]',10.5);set('input[aria-label="Stacks per GPU"]',12);
     expect(text().includes('10.5 Gbps'),'HBM4 half-step rate remains visible');expect(text().includes('64 GB'),'Sixteen 32Gb dies produce64GB per stack');expect(text().includes('2.69 TB/s'),'HBM4 width×rate bandwidth is2.688TB/s rounded');
     set('input[aria-label="Hybrid bonding"]',true);expect(box.querySelector('input[value=tcncf]').disabled,'Hybrid bonding disables solder-method controls');set('input[aria-label="Hybrid bonding"]',false);
     for(let n=0;n<30;n++)set('select[aria-label="HBM generation"]',n%2?'HBM3E':'HBM2E');
     set('select[aria-label="HBM generation"]','HBM3E');
    }else if(id==='euv-source'){
     for(let i=0;i<3;i++){click('[data-view="'+i+'"]');expect(box.querySelector('[data-view="'+i+'"]').getAttribute('aria-pressed')==='true','EUV view '+i+' selected');}
     set('input[aria-label="Power at intermediate focus"]',600);expect(/600 W at the intermediate focus/.test(text()),'Photon-budget input updates summary');
     const play=box.querySelector('[aria-label="Play or pause EUV cycle"]');play.click();await new Promise(r=>setTimeout(r,180));play.click();expect(play.textContent==='Play','EUV animation can pause');
     for(const label of ['1  Droplet falls','2  Pre-pulse flattens it','3  Main pulse: plasma','4  Collector focuses to IF','5  Scanner: 11 mirrors'])clickText(label);
     click('[data-view="0"]');set('input[aria-label="Power at intermediate focus"]',500);
    }else if(id==='cowos-flow'){
     for(let n=0;n<36;n++){const i=n%12;click('[data-step="'+i+'"]');expect(box.querySelector('.count').textContent.includes(String(i+1)),'Assembly step '+i+' reached');}
     for(const label of ['Interposer yield','GPU die sound after screen','HBM sound after screen','Assembly yield'])byLabel(label,100);byLabel('HBM stacks (N)',4);
     expect(text().includes('100%'),'Perfect independent inputs produce100% model yield');expect(text().includes('$3500'),'Four-stack component cost is3500dollars');
     click('[data-step="2"]');
    }else if(id==='rack-explorer'){
     for(let i=1;i<=6;i++){click('[aria-label="Level '+i+'"]');expect(box.querySelector('.count').textContent.includes('Step '+i),'System level '+i+' reached');}
     const ranges=[...box.querySelectorAll('.w-controls input[type=range]')];for(const [i,value]of [[0,1000],[1,100],[2,1]]){ranges[i].value=value;ranges[i].dispatchEvent(new Event('input',{bubbles:true}));}
     expect(text().includes('8695'),'Hall capacity includes rack overhead');expect(text().includes('$30.43 B'),'Hall hardware uses billions of dollars');click('[aria-label="Level 4"]');
    }else if(id==='transistor-evolution'){
     for(let j=0;j<16;j++){const i=j%4;click('[role="tab"]:nth-child('+(i+1)+')');expect(box.querySelectorAll('[role="tab"][aria-selected="true"]').length===1,'One architecture selected');}
     for(const v of ['three-d','section']){click('[data-view="'+v+'"]');expect(box.querySelector('[data-view="'+v+'"]').getAttribute('aria-pressed')==='true','Transistor view '+v+' selected');}
     byLabel('Sheet width',15);byLabel('Sheet width',50);byLabel('Backside power rail',true);expect(text().includes('50 nm'),'Sheet width updates visibly');click('[role="tab"]:nth-child(3)');
    }else if(id==='etch-profile'){
     const presets=[...box.querySelectorAll('.w-step-nav button')].map(b=>b.textContent);for(let n=0;n<18;n++)clickText(presets[n%presets.length]);
     const ranges=[...box.querySelectorAll('.w-controls input[type=range]')];for(const side of ['min','max'])for(const input of ranges){input.value=input[side];input.dispatchEvent(new Event('input',{bubbles:true}));}
     expect(!/NaN|Infinity/.test(text()),'Etch extremes remain finite');clickText('Wet HF (BOE, isotropic)');expect(/none \(wet\)/.test(text()),'Wet etch removes ion-energy claim');clickText('Oxide contact (C4F6/Ar/O2 CCP)');
    }
    return checks;
   },id);
   entry.checks.push(...result);await sleep(150);entry.states.push(await snapshot(id,width,theme,'exercised'));
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
 await browser.close(); fs.mkdirSync('qa/reports',{recursive:true});fs.writeFileSync('qa/reports/flagship-refactor.json',JSON.stringify(report,null,2)+'\n');
 console.log('Completed',report.cases.length,'cases;',report.cases.filter(x=>!x.passed).length,'failed');process.exitCode=report.errors.length||report.cases.some(x=>!x.passed)?1:0;
})().catch(e=>{console.error(e);process.exitCode=1});
