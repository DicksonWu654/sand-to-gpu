// Full-page copy QA. Real clipboard tests use a disposable headless Chromium context,
// separate from the user's desktop/browser clipboard. No prompt is sent to an AI service.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {launch}=require('./browser');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8793';
const shots=process.env.QA_SHOTS||'/tmp/sand-to-gpu-page-copy';
const exportRoot=process.env.NARRATION_EXPORT||path.join(require('../tools/narration/config').home,'static-export');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 fs.mkdirSync(shots,{recursive:true});const browser=await launch(),results=[],errors=[],requests=[];let context,page;
 async function fresh({route='#/s/01',width=1280,theme='light',audio=false}={}){
  context=await browser.createBrowserContext();await context.overridePermissions(new URL(base).origin,['clipboard-read','clipboard-write','clipboard-sanitized-write']);
  page=await context.newPage();await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
  await page.evaluateOnNewDocument(()=>{window.__copyQA={opens:[],execCalls:[]};window.open=(...args)=>{__copyQA.opens.push(args);return null;};window.__readClipboard=()=>navigator.clipboard.readText();window.__writeClipboard=navigator.clipboard.writeText.bind(navigator.clipboard);window.__execCommand=document.execCommand.bind(document);const AudioClass=window.Audio;window.__nativeAudio=[];window.Audio=class extends AudioClass{constructor(...args){super(...args);__nativeAudio.push(this);}};});
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  if(audio){await page.setRequestInterception(true);page.on('request',r=>{const u=new URL(r.url());if(u.origin===new URL(base).origin&&u.pathname.startsWith('/narration/')){const file=path.resolve(exportRoot,'.'+u.pathname);if(file.startsWith(exportRoot+path.sep)&&fs.existsSync(file))return r.respond({status:200,contentType:file.endsWith('.json')?'application/json':'audio/mpeg',body:fs.readFileSync(file)});}r.continue();});}
  await page.goto(base+'/'+route,{waitUntil:'networkidle0'});await page.waitForSelector('.page-copy-button');await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  const hash=crypto.createHash('sha256').update(await page.evaluate(()=>CourseNarration.extract.toString())).digest('hex');assert.equal(hash,'351feff3ad368046e031df3d1812efad6ba2963b05357b702ecc7ba7300b77f1');
  await page.evaluate(()=>{window.__beforeProse=document.querySelector('.prose').innerHTML;window.__beforeNarration=CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text);});return page;
 }
 async function expected(){return page.evaluate(()=>COURSE_MARKDOWN[location.hash.match(/^#\/[ms]\/\d+/)[0]]);}
 async function integrity(){assert(await page.evaluate(()=>JSON.stringify(__beforeNarration)===JSON.stringify(CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text))));assert.equal(await page.evaluate(()=>__copyQA.opens.length),0);}
 async function manualFailure(){await page.evaluate(()=>{Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:()=>Promise.reject(new DOMException('Denied for QA','NotAllowedError'))});document.execCommand=()=>false;});await page.click('.page-copy-button');await page.waitForSelector('.page-copy-dialog[open]');}
 async function test(name,fn,options){if(process.env.QA_FILTER&&!new RegExp(process.env.QA_FILTER).test(name))return;try{await fresh(options);const detail=await fn();await integrity();results.push({name,status:'passed',detail:detail||null});console.log('PASS '+name);}catch(error){results.push({name,status:'failed',error:error.stack});console.log('FAIL '+name+': '+error.message);}finally{await context?.close();context=null;page=null;}}
 try{
  for(const route of ['#/s/01',process.env.QA_LONG_ROUTE||'#/m/06'])await test('Real Clipboard API copies complete '+route+' without selection or modal',async()=>{
   const text=await expected();assert(text.length>1000);assert(text.startsWith('# '));await page.evaluate(()=>getSelection().removeAllRanges());await page.click('.page-copy-button');await page.waitForFunction(()=>document.querySelector('.page-copy-button').textContent.includes('Copied'));
   assert.equal(await page.evaluate(()=>__readClipboard()),text);assert.equal(await page.$$eval('.page-copy-dialog[open]',els=>els.length),0);assert(await page.evaluate(()=>document.querySelector('.prose').innerHTML===__beforeProse));
   return {characters:text.length,clipboardExactlyMatches:true,beginning:text.slice(0,100),ending:text.slice(-100)};
  },{route});
  await test('Actual execCommand fallback copies complete Markdown when modern writeText is unavailable or rejects',async()=>{
   const text=await expected();await page.evaluate(()=>{Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:undefined});const native=document.execCommand.bind(document);document.execCommand=(command,...args)=>{const result=native(command,...args);__copyQA.execCalls.push({command,result});return result;};});
   await page.click('.page-copy-button');await page.waitForFunction(()=>document.querySelector('.page-copy-button').textContent.includes('Copied'));assert.equal(await page.evaluate(()=>__readClipboard()),text);assert((await page.evaluate(()=>__copyQA.execCalls)).some(c=>c.command==='copy'&&c.result));await page.evaluate(async()=>{await __writeClipboard('fallback sentinel');Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:()=>Promise.reject(new DOMException('Denied','NotAllowedError'))});});await page.click('.page-copy-button');await page.waitForFunction(()=>__copyQA.execCalls.length===2);assert.equal(await page.evaluate(()=>__readClipboard()),text);assert((await page.evaluate(()=>__copyQA.execCalls)).every(c=>c.result));return {realExecCommandReturnedTrue:true,clipboardExactlyMatches:true,unavailableAndRejectedPaths:true};
  });
  await test('Clipboard denial opens exact selectable manual copy and never reports false success',async()=>{
   const text=await expected();await manualFailure();assert.equal(await page.$eval('.page-copy-text',e=>e.value),text);assert(!/Copied/.test(await page.$eval('.page-copy-button',e=>e.textContent)));const range=await page.$eval('.page-copy-text',e=>({start:e.selectionStart,end:e.selectionEnd,focused:e===document.activeElement}));assert(range.focused);assert.equal(range.start,0);assert.equal(range.end,text.length);await page.screenshot({path:path.join(shots,'manual-denial.png')});return {selectedCharacters:range.end};
  });
  await test('Download writes the complete identical Markdown without external navigation',async()=>{
   const text=await expected();
   const link=await page.$eval('.page-copy-download',e=>({href:e.href,download:e.download}));assert(link.href.startsWith('blob:'));assert(link.download.endsWith('.md'));assert.equal(await page.evaluate(url=>fetch(url).then(r=>r.text()),link.href),text);
   const downloadDir=path.join(shots,'downloads');fs.mkdirSync(downloadDir,{recursive:true});const client=await browser.target().createCDPSession();await client.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:downloadDir,browserContextId:context.id});await page.click('.page-copy-download');
   let file=path.join(downloadDir,link.download);for(let i=0;i<100&&!fs.existsSync(file);i++)await wait(50);assert.equal(fs.readFileSync(file,'utf8'),text);return {downloadedFile:path.basename(file),characters:text.length};
  });
  await test('Keyboard Escape restores control focus and navigation copies the new lesson only',async()=>{
   await manualFailure();await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.page-copy-dialog').open);assert(await page.evaluate(()=>document.activeElement.classList.contains('page-copy-button')));
   await page.evaluate(()=>{Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:__writeClipboard});document.execCommand=__execCommand;location.hash='#/s/02';});await page.waitForFunction(()=>document.title.startsWith('Survey 2:'));assert.equal(await page.$$eval('.page-copy-button',els=>els.length),1);assert.equal(await page.$$eval('.page-copy-dialog[open]',els=>els.length),0);const text=await expected();await page.click('.page-copy-button');await page.waitForFunction(()=>document.querySelector('.page-copy-button').textContent.includes('Copied'));assert.equal(await page.evaluate(()=>__readClipboard()),text);
   await page.evaluate(()=>{__beforeNarration=CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text);});
  });
  await test('Real saved narration keeps playing for direct copy and pauses only for the Markdown dialog',async()=>{
   await page.click('.narration-launch');await page.waitForFunction(()=>document.querySelector('.narration-player').dataset.state==='playing'&&__nativeAudio.at(-1).currentTime>.2);await page.click('[data-action="follow"]');await page.click('.page-copy-button');await page.waitForFunction(()=>document.querySelector('.page-copy-button').textContent.includes('Copied'));assert.equal(await page.evaluate(()=>__nativeAudio.at(-1).paused),false);
   await manualFailure();const paused=await page.evaluate(()=>({time:__nativeAudio.at(-1).currentTime,paused:__nativeAudio.at(-1).paused,state:document.querySelector('.narration-player').dataset.state}));assert(paused.paused&&paused.state==='paused');await page.keyboard.press('Escape');await wait(300);assert.equal(await page.evaluate(()=>__nativeAudio.at(-1).paused),true);return {pausedTime:paused.time,realAudio:true};
  },{audio:true});
  for(const width of [1280,375])for(const theme of ['light','dark'])await test('Visual toolbar and manual dialog '+width+' '+theme,async()=>{
   await page.$eval('.page-copy-button',e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.screenshot({path:path.join(shots,width+'-'+theme+'-toolbar.png')});await manualFailure();
   const rect=await page.$eval('.page-copy-dialog',e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,overflow:e.scrollWidth>e.clientWidth+1};});assert(rect.left>=0&&rect.right<=width+1&&rect.top>=0&&rect.bottom<=901&&!rect.overflow);assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);await page.screenshot({path:path.join(shots,width+'-'+theme+'-manual.png')});return rect;
  },{width,theme});
 }finally{await browser.close();}
 const report={status:results.every(r=>r.status==='passed')&&!errors.length?'passed':'failed',timestamp:new Date().toISOString(),baseURL:base,sourceHash:crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'../site/content.js'))).digest('hex'),results,pageErrors:errors,aiServiceRequests:requests.filter(u=>u.startsWith('https://chatgpt.com')),screenshotsDirectory:shots,limitations:['Actual clipboard tests use disposable headless Chromium, not the user embedded browser or desktop clipboard.','A forced dual failure checks the manual fallback; it does not assert every browser exposes identical permission UI.','Visual screenshots and browser emulation do not replace every mobile or assistive-technology configuration.']};assert.equal(report.aiServiceRequests.length,0);
 fs.writeFileSync(process.env.QA_REPORT||path.join(__dirname,'reports/page-copy.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.status!=='passed')process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1;});
