// Real saved MP3 playback: opening the local study dialog pauses it without auto-resume.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {launch}=require('./browser');
(async()=>{
 const base=process.env.QA_BASE_URL||'http://127.0.0.1:8790',browser=await launch(),requests=[],errors=[];
 try{
  const page=await browser.newPage();await page.setViewport({width:1280,height:900});page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));
  await page.evaluateOnNewDocument(()=>{const NativeAudio=window.Audio;window.__studyNativeAudio=[];window.Audio=class extends NativeAudio{constructor(...args){super(...args);__studyNativeAudio.push(this);}};window.open=()=>{throw new Error('Unexpected external navigation in native pause QA');};});
  await page.goto(base+'/#/s/01',{waitUntil:'networkidle0'});await page.click('.narration-launch');
  await page.waitForFunction(()=>document.querySelector('.narration-player').dataset.state==='playing'&&__studyNativeAudio.at(-1).currentTime>.5);
  const initial=await page.evaluate(()=>{const a=__studyNativeAudio.at(-1);return {src:a.currentSrc,duration:a.duration,time:a.currentTime,paused:a.paused};});assert(initial.src.endsWith('.mp3')&&!initial.paused&&initial.duration>1);
  await page.evaluate(()=>{const p=CourseNarration.extract(document.querySelector('.prose')).find(p=>p.element.tagName==='P');p.element.scrollIntoView({block:'center',behavior:'instant'});const r=document.createRange();r.selectNodeContents(p.element);getSelection().removeAllRanges();getSelection().addRange(r);});
  await page.waitForSelector('.study-selection-action:not([hidden])');await page.click('.study-selection-action');await page.waitForSelector('.study-dialog[open]');
  const paused=await page.evaluate(()=>({time:__studyNativeAudio.at(-1).currentTime,paused:__studyNativeAudio.at(-1).paused,state:document.querySelector('.narration-player').dataset.state}));assert(paused.paused&&paused.state==='paused');
  await new Promise(r=>setTimeout(r,500));await page.click('.study-close');await new Promise(r=>setTimeout(r,500));
  const after=await page.evaluate(()=>({time:__studyNativeAudio.at(-1).currentTime,paused:__studyNativeAudio.at(-1).paused,state:document.querySelector('.narration-player').dataset.state}));assert(after.paused&&after.state==='paused');assert(Math.abs(after.time-paused.time)<.05);
  assert(!requests.some(u=>new URL(u).pathname.startsWith('/api/')));assert(!requests.some(u=>u.startsWith('https://chatgpt.com')));assert.deepEqual(errors,[]);
  const report={status:'passed',timestamp:new Date().toISOString(),baseURL:base,initialNativePlayback:initial,dialogOpen:paused,afterDialogClose:after,narrationApiRequests:0,chatGPTRequests:0,pageErrors:errors,limitations:['Real HTMLAudioElement and saved MP3; validates intentional pause and no automatic resume, not subjective pronunciation.']};
  fs.writeFileSync(path.join(__dirname,'reports/study-assist-native.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
