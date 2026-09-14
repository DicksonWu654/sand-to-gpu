// Local browser integration: clipboard and popup calls are intercepted; ChatGPT is never contacted.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {launch}=require('./browser'),{installMediaClock}=require('./narration');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8793';
const exportRoot=process.env.NARRATION_EXPORT||path.join(require('../tools/narration/config').home,'static-export');
const shots=process.env.QA_SHOTS||'/tmp/sand-to-gpu-study-assist';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function intercept(){
 window.__studyQA={copies:[],opens:[],order:[],clipboard:'okay',popup:'blocked',pending:[],external:[]};
 Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText(text){const q=__studyQA;q.copies.push(text);q.order.push('copy');if(q.clipboard==='denied')return Promise.reject(new DOMException('Denied','NotAllowedError'));if(q.clipboard==='pending')return new Promise((resolve,reject)=>q.pending.push({resolve,reject}));return Promise.resolve();}}});
 window.open=(url,target,features)=>{__studyQA.opens.push({url,target,features});__studyQA.order.push('open');if(__studyQA.popup==='throws')throw new Error('Blocked');return null;};
}
(async()=>{
 fs.mkdirSync(shots,{recursive:true});const browser=await launch(),results=[],errors=[],external=[];let page,extractorHash;
 async function fresh({width=1280,theme='light',media=false}={}){
  page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
  await page.evaluateOnNewDocument(intercept);if(media)await page.evaluateOnNewDocument(installMediaClock);
  await page.setRequestInterception(true);
  page.on('request',request=>{const u=new URL(request.url());if(u.origin!==new URL(base).origin){external.push(request.url());return request.abort();}
   if(media&&u.pathname.startsWith('/narration/')){const file=path.resolve(exportRoot,'.'+u.pathname);if(file.startsWith(exportRoot+path.sep)&&fs.existsSync(file))return request.respond({status:200,contentType:file.endsWith('.json')?'application/json':'audio/mpeg',body:fs.readFileSync(file)});}
   request.continue();});
  await page.goto(base+'/?qa=study-private#/s/01',{waitUntil:'networkidle0'});await page.waitForSelector('.study-launch');
  await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme);},theme);
  extractorHash=crypto.createHash('sha256').update(await page.evaluate(()=>CourseNarration.extract.toString())).digest('hex');assert.equal(extractorHash,'351feff3ad368046e031df3d1812efad6ba2963b05357b702ecc7ba7300b77f1');
  await page.evaluate(()=>{window.__originalProse=document.querySelector('.prose').innerHTML;window.__originalExtract=CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text);});
  return page;
 }
 async function select(p,partial=false){return p.evaluate(partial=>{const entry=CourseNarration.extract(document.querySelector('.prose')).find(p=>p.element.tagName==='P'&&p.text.length>150);entry.element.scrollIntoView({block:'center',behavior:'instant'});const range=document.createRange();range.selectNodeContents(entry.element);if(partial){const walker=document.createTreeWalker(entry.element,NodeFilter.SHOW_TEXT),first=walker.nextNode();range.setEnd(first,Math.min(first.length,80));}const s=getSelection();s.removeAllRanges();s.addRange(range);return s.toString();},partial);}
 async function selectedOpen(p,toolbar=false,partial=false){const text=await select(p,partial);await p.waitForSelector('.study-selection-action:not([hidden])');await p.click(toolbar?'.study-launch':'.study-selection-action');await p.waitForSelector('.study-dialog[open]');return text;}
 const preview=p=>p.$eval('.study-preview',e=>e.value);
 async function immutable(p){assert(await p.evaluate(()=>JSON.stringify(CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text))===JSON.stringify(__originalExtract)));}
 async function test(name,fn,options){if(process.env.QA_FILTER&&!new RegExp(process.env.QA_FILTER).test(name))return;try{await fresh(options);const detail=await fn(page);results.push({name,status:'passed',detail:detail||null});console.log('PASS '+name);}catch(e){results.push({name,status:'failed',error:e.stack});console.log('FAIL '+name+': '+e.message);}finally{await page?.close();page=null;}}
 try{
  await test('Toolbar preserves exact selection; clipboard equals preview and popup has no prompt payload',async p=>{
   const text=await selectedOpen(p,true);assert.equal(await p.$eval('.study-quote',e=>e.textContent),text);
   await p.type('.study-question','Why does this matter? Explain <script>literally</script>.');const draft=await preview(p);assert(draft.includes(text));assert(draft.includes('Why does this matter?'));assert(draft.includes('Source reference:'));assert(!draft.includes('?qa='));
   await p.click('.study-copy-open');await p.waitForFunction(()=>document.querySelector('.study-status').textContent.startsWith('Copied'));
   const calls=await p.evaluate(()=>__studyQA);assert.deepEqual(calls.copies,[draft]);assert.deepEqual(calls.opens,[{url:'https://chatgpt.com/',target:'_blank',features:'noopener,noreferrer'}]);assert.deepEqual(calls.order,['copy','open']);assert.equal(await p.$eval('.study-question',e=>e.querySelectorAll('script').length),0);await immutable(p);
   return {copiedCharacters:draft.length,exactSelectionCharacters:text.length,plainURL:true};
  });
  await test('Nearby toggle retains passage/source; quick intents update exact copy',async p=>{
   const text=await selectedOpen(p,false,true);let before=await preview(p);assert(before.includes('Nearby prose from the same section:'));
   await p.click('.study-context-toggle');let after=await preview(p);assert(after.includes(text));assert(after.includes('Source reference:'));assert(!after.includes('Nearby prose from the same section:'));assert(after.length<before.length);
   for(const intent of ['deeper','analogy','check','explain']){await p.click('.study-quick[data-intent='+intent+']');const draft=await preview(p);assert.equal(await p.$eval('.study-quick[aria-pressed=true]',e=>e.dataset.intent),intent);if(intent==='check')assert.match(draft,/one question at a time.*wait for my answer/s);await p.click('.study-copy');assert.equal(await p.evaluate(()=>__studyQA.copies.at(-1)),draft);}
   assert.equal(await p.evaluate(()=>__studyQA.opens.length),0);await immutable(p);
  });
  await test('Denied clipboard exposes selected manual draft and plain safe fallback link',async p=>{
   await selectedOpen(p);await p.evaluate(()=>{__studyQA.clipboard='denied';__studyQA.popup='throws';});const draft=await preview(p);await p.click('.study-copy-open');await p.waitForFunction(()=>document.querySelector('.study-status').textContent.includes('manually'));
   const state=await p.$eval('.study-preview',e=>({focused:e===document.activeElement,start:e.selectionStart,end:e.selectionEnd,open:e.closest('details').open}));assert(state.focused&&state.open);assert.equal(state.start,0);assert.equal(state.end,draft.length);
   assert.deepEqual(await p.$eval('.study-open-link',e=>({href:e.href,target:e.target,rel:e.rel})),{href:'https://chatgpt.com/',target:'_blank',rel:'noopener noreferrer'});
   await p.screenshot({path:path.join(shots,'clipboard-denied.png')});
  });
  await test('Popup is attempted before pending clipboard settles; stale completion cannot overwrite new draft',async p=>{
   await selectedOpen(p);await p.evaluate(()=>__studyQA.clipboard='pending');await p.click('.study-copy-open');assert.equal(await p.evaluate(()=>__studyQA.opens.length),1);await p.type('.study-question','A changed question');await p.evaluate(()=>__studyQA.pending[0].resolve());await delay(30);assert.equal(await p.$eval('.study-status',e=>e.textContent),'');
   await p.click('.study-copy');await p.click('.study-close');await p.evaluate(()=>__studyQA.pending[1].reject(new Error('Late rejection')));await delay(30);assert.equal(await p.$eval('.study-dialog',e=>e.open),false);
  });
  await test('Native modal keyboard focus stays inside; Escape restores floating action and selection',async p=>{
   const text=await selectedOpen(p);assert.equal(await p.evaluate(()=>document.activeElement.className),'study-question');
   for(let i=0;i<22;i++){await p.keyboard.press('Tab');assert(await p.evaluate(()=>document.activeElement===document.body||document.querySelector('.study-dialog').contains(document.activeElement)));}
   await p.focus('.study-question');
   await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.querySelector('.study-dialog').open);
   assert.equal(await p.evaluate(()=>getSelection().toString()),text);assert.equal(await p.evaluate(()=>document.activeElement.className),'study-selection-action');assert.equal(await p.$eval('.study-selection-action',e=>e.hidden),false);await immutable(p);
  });
  await test('Current on-screen paragraph and excluded table selection behave explicitly',async p=>{
   const expected=await p.evaluate(()=>{getSelection().removeAllRanges();const paragraph=CourseNarration.extract(document.querySelector('.prose')).find(x=>x.element.tagName==='P');paragraph.element.scrollIntoView({block:'center',behavior:'instant'});return CourseStudyContext.capture({prose:document.querySelector('.prose'),title:document.title,lessonKey:'#/s/01'}).passage;});
   await p.click('.study-launch');await p.waitForSelector('.study-dialog[open]');assert.equal(await p.$eval('.study-quote',e=>e.textContent),expected);await p.click('.study-close');
   await p.evaluate(()=>{const cell=document.querySelector('.prose td');const range=document.createRange();range.selectNodeContents(cell);getSelection().removeAllRanges();getSelection().addRange(range);});await p.click('.study-launch');assert.equal(await p.$eval('.study-dialog',e=>e.open),false);assert.match(await p.$eval('.study-launch',e=>e.textContent),/Select/);
  });
  await test('Navigation cleans up open dialog and late clipboard callbacks without stale context',async p=>{
   await selectedOpen(p);await p.evaluate(()=>__studyQA.clipboard='pending');await p.click('.study-copy');await p.evaluate(()=>location.hash='#/s/02');await p.waitForFunction(()=>document.title.startsWith('Survey 2:'));await p.evaluate(()=>__studyQA.pending[0].resolve());await delay(100);
   assert.equal(await p.$$eval('.study-dialog',els=>els.length),1);assert.equal(await p.$eval('.study-dialog',e=>e.open),false);assert.equal(await p.$$eval('.study-selection-action',els=>els.length),1);
   await selectedOpen(p);assert.match(await preview(p),/Survey 2|From sand|mirror/i);assert.equal(await p.$eval('.study-status',e=>e.textContent),'');
  });
  for(const state of ['active','pending-resolve','pending-reject'])await test('Narration '+state+' pauses for study and never auto-resumes',async p=>{
   if(state!=='active')await p.evaluate(()=>{const original=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){original.call(this);return new Promise((resolve,reject)=>window.__pendingPlay={resolve,reject});};});
   await p.click('.narration-launch');await p.waitForFunction(mode=>mode==='active'?document.querySelector('.narration-player').dataset.state==='playing':!!window.__pendingPlay,{},state);
   const selected=await selectedOpen(p);assert.equal(await p.$eval('.narration-player',e=>e.dataset.state),'paused');assert((await p.evaluate(()=>__qaMedia.snapshot())).every(s=>s.paused));
   if(state!=='active')await p.evaluate(mode=>mode==='pending-resolve'?__pendingPlay.resolve():__pendingPlay.reject(new Error('Late audio failure')),state);
   await delay(100);assert.equal(await p.$eval('.narration-player',e=>e.dataset.state),'paused');await p.click('.study-close');assert.equal(await p.evaluate(()=>getSelection().toString()),selected);assert((await p.evaluate(()=>__qaMedia.snapshot())).every(s=>s.paused));await immutable(p);
  },{media:true});
  await test('Delayed recording metadata stays paused after the study dialog opens',async p=>{
   await p.evaluate(()=>{const native=window.fetch;window.fetch=(url,options)=>String(url).includes('/narration/lessons/')?new Promise(resolve=>{window.__releaseMetadata=()=>resolve(native(url,options));}):native(url,options);});
   await p.click('.narration-launch');await p.waitForFunction(()=>!!window.__releaseMetadata);await selectedOpen(p);assert.equal(await p.$eval('.narration-player',e=>e.dataset.state),'paused');await p.evaluate(()=>__releaseMetadata());await delay(300);assert.equal(await p.$eval('.narration-player',e=>e.dataset.state),'paused');assert((await p.evaluate(()=>__qaMedia.snapshot())).every(s=>s.paused));
  },{media:true});
  for(const mode of ['initial','resume'])await test('Narration '+mode+' playback rejection remains an actionable error',async p=>{
   if(mode==='initial')await p.evaluate(()=>__qaMedia.rejectNextPlay=true);
   await p.click('.narration-launch');
   if(mode==='resume'){await p.waitForFunction(()=>document.querySelector('.narration-player').dataset.state==='playing');await p.click('[data-action="play"]');await p.evaluate(()=>__qaMedia.rejectNextPlay=true);await p.click('[data-action="play"]');}
   await p.waitForFunction(()=>document.querySelector('.narration-player').dataset.state==='error');assert.match(await p.$eval('.narration-status',e=>e.textContent),/Play|Retry|start|ready/i);assert.equal(await p.$eval('[data-action="play"]',e=>e.textContent),'Retry');
  },{media:true});
  for(const width of [1280,375])for(const theme of ['light','dark'])await test('Visual '+width+' '+theme+' fits and keeps modal scrolling local',async p=>{
   await selectedOpen(p);await p.type('.study-question','How does this step connect to the next manufacturing stage?');
   assert.equal(await p.evaluate(()=>document.documentElement.dataset.theme),theme);const geometry=await p.$eval('.study-dialog',e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:innerWidth,height:innerHeight,overflow:e.scrollWidth>e.clientWidth+1};});assert(geometry.left>=0&&geometry.right<=width+1&&geometry.top>=0&&geometry.bottom<=901&&!geometry.overflow);
   await p.screenshot({path:path.join(shots,width+'-'+theme+'.png')});await p.$eval('.study-preview-details',e=>e.open=true);await p.$eval('.study-preview',e=>e.scrollIntoView({block:'center',behavior:'instant'}));await p.screenshot({path:path.join(shots,width+'-'+theme+'-preview.png')});await immutable(p);return geometry;
  },{width,theme});
 }finally{await browser.close();}
 const sourceHash=crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'../site/content.js'))).digest('hex');
 const report={status:results.every(r=>r.status==='passed')&&!errors.length&&!external.some(u=>u.startsWith('https://chatgpt.com'))?'passed':'failed',timestamp:new Date().toISOString(),baseURL:base,sourceHash,extractorHash,results,pageErrors:errors,externalRequestsBlocked:[...new Set(external)],screenshotsDirectory:shots,limitations:['Clipboard and popup calls are intercepted; no ChatGPT page is contacted or message submitted.','Narration coexistence uses the unchanged real manifests with a synthetic media clock to exercise pending-promise races.','Native modal Tab traversal may visit browser chrome (BODY activeElement); underlying course controls must remain unreachable.',
'Browser keyboard/touch emulation does not replace testing every assistive technology or mobile browser.']};
 fs.writeFileSync(path.join(__dirname,'reports/study-assist.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.status!=='passed')process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
