// Final native-media smoke against the completed static export, with no narration service.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {launch}=require('./browser');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8792';
async function main(){
 const indexResponse=await fetch(base+'/narration/index.json');assert.equal(indexResponse.status,200);
 const index=await indexResponse.json();assert.equal(index.complete,true);assert.equal(index.audioFormat,'mp3');
 const chapter=await fetch(base+'/narration/'+index.lessons['#/s/01'].manifest).then(r=>r.json());
 const audioUrl=base+'/narration/'+chapter.passages[0].audioUrl;
 const head=await fetch(audioUrl,{method:'HEAD'});assert.equal(head.status,200);assert.equal(head.headers.get('content-type'),'audio/mpeg');assert.equal(head.headers.get('accept-ranges'),'bytes');assert.equal((await head.arrayBuffer()).byteLength,0);
 const size=Number(head.headers.get('content-length'));assert(size>1000);
 const range=await fetch(audioUrl,{headers:{Range:'bytes=0-63'}});assert.equal(range.status,206);assert.equal(range.headers.get('content-range'),'bytes 0-63/'+size);assert.equal((await range.arrayBuffer()).byteLength,64);
 const browser=await launch(),requests=[],errors=[];let playback;
 try{
  const page=await browser.newPage();await page.setViewport({width:1280,height:900});
  page.on('request',req=>requests.push(new URL(req.url()).pathname));page.on('pageerror',e=>errors.push(e.message));
  await page.evaluateOnNewDocument(()=>{const NativeAudio=window.Audio;window.Audio=new Proxy(NativeAudio,{construct(target,args){const audio=Reflect.construct(target,args);window.__qaNativeAudio=audio;return audio;}});});
  await page.goto(base+'/#/s/01',{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('meta[name="narration-mode"]',e=>e.content),'static');
  await page.click('.narration-launch');await page.waitForFunction(()=>document.querySelector('.narration-player')?.dataset.state==='playing'&&window.__qaNativeAudio.currentTime>.25,{timeout:15000});
  const position=await page.$eval('.narration-position',e=>Number(e.textContent.split('/')[0].trim())-1),entry=chapter.passages[position];assert(entry);
  await page.click('[data-action="play"]');await page.waitForFunction(()=>window.__qaNativeAudio.paused);
  const word=entry.words.find(w=>w.start>2&&w.end-w.start>.15);assert(word);const seekTime=(word.start+word.end)/2,expected=entry.text.slice(word.textOffset,word.textOffset+word.length);
  await page.$eval('.narration-seek',(el,t)=>{el.value=String(t);el.dispatchEvent(new Event('input'));},seekTime);
  await page.waitForFunction(expected=>[...(CSS.highlights.get('narration-word')||[])].some(r=>r.toString()===expected),{timeout:5000},expected);
  const afterSeek=await page.evaluate(()=>({time:__qaNativeAudio.currentTime,paused:__qaNativeAudio.paused,duration:__qaNativeAudio.duration,src:__qaNativeAudio.currentSrc,highlight:[...(CSS.highlights.get('narration-word')||[])].map(r=>r.toString()).join('')}));
  assert(Math.abs(afterSeek.time-seekTime)<.05);assert(afterSeek.paused);assert(afterSeek.src.endsWith(entry.audioUrl));assert(Math.abs(afterSeek.duration-entry.duration)<.1);
  await page.click('[data-action="play"]');await page.waitForFunction(t=>!__qaNativeAudio.paused&&__qaNativeAudio.currentTime>t+.25,{timeout:5000},afterSeek.time);
  // Jump through the actual recorded chapter with a paragraph click, preserving native media.
  const paragraphTarget=await page.evaluate(()=>{const ps=CourseNarration.extract(document.querySelector('.prose'));const i=ps.findIndex((p,i)=>i>4&&p.element.tagName==='P'&&p.offset===0&&p.text.length>100&&!p.element.querySelector('a,button,code,input,select,textarea'));if(i<0)throw Error('No target paragraph');window.__qaParagraphTarget=ps[i].element;return i;});
  await page.click('[data-action="play"]');await page.waitForFunction(()=>__qaNativeAudio.paused);
  const targetHandle=await page.evaluateHandle(()=>__qaParagraphTarget);await targetHandle.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await targetHandle.asElement().click();
  await page.waitForFunction(i=>Number(document.querySelector('.narration-position').textContent.split('/')[0])-1===i&&document.querySelector('.narration-player').dataset.state==='playing'&&!__qaNativeAudio.paused&&__qaNativeAudio.currentTime>.1,{timeout:15000},paragraphTarget);
  const paragraphSeek=await page.evaluate(()=>({audioUrl:__qaNativeAudio.currentSrc,time:__qaNativeAudio.currentTime,highlightedElement:document.querySelector('.narration-current-passage')===__qaParagraphTarget}));
  assert(paragraphSeek.audioUrl.endsWith(chapter.passages[paragraphTarget].audioUrl));assert(paragraphSeek.time<3);assert(paragraphSeek.highlightedElement);
  await page.click('[data-action="close"]');assert(await page.evaluate(()=>__qaNativeAudio.paused));assert.equal(await page.evaluate(()=>CSS.highlights.has('narration-word')),false);
  assert.equal(requests.filter(p=>p.startsWith('/api/narration')).length,0);assert(requests.some(p=>p.endsWith('.mp3')));assert.equal(errors.length,0);
  playback={route:'#/s/01',passageIndex:position,audioStartedAndClockAdvanced:true,pausedSeekSeconds:afterSeek.time,highlight:afterSeek.highlight,modelWordTime:{start:word.start,end:word.end},nativeDuration:afterSeek.duration,metadataDuration:entry.duration,resumeClockAdvanced:true,paragraphClickSeek:{targetIndex:paragraphTarget,actualPointerClick:true,resumedFromPaused:true,startsNearBeginning:paragraphSeek.time,correctSavedClip:true,correctParagraphHighlighted:true},closeStoppedAudio:true,narrationApiRequests:0,mp3Requests:requests.filter(p=>p.endsWith('.mp3')).length};
 }finally{await browser.close();}
 const report={status:'passed',timestamp:new Date().toISOString(),base,http:{mime:'audio/mpeg',headStatus:200,headBodyBytes:0,audioBytes:size,rangeStatus:206,rangeBytes:64},playback,pageErrors:errors,limitations:['Uses native HTMLAudioElement, actual MP3 and real playback time; no clock or audio mocks.','Confirms playback/mapping transport, not subjective voice quality or independent spoken-word alignment.']};
 fs.writeFileSync(path.join(__dirname,'reports/narration-export.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
