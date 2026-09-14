// Static narration integration uses a tiny silent PCM fixture, never model generation.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {launch}=require('./browser');
const {installMediaClock}=require('./narration');
const root=path.resolve(__dirname,'..');
const texts=['A 2 nm gate uses SiO2 and copper.','The crystal forms an ordered structure.','Connections carry signals between devices.'];
const html=`<!doctype html><html><head><meta charset="utf-8"><meta name="narration-mode" content="static"><link rel="stylesheet" href="narration.css"></head><body><main style="max-width:600px;margin:100px auto"><div id="toolbar"></div><div class="prose"><p>A 2 nm gate uses SiO<sub>2</sub> and copper.</p><p>${texts[1]}</p><p>${texts[2]}</p></div></main><script src="narration.js"></script><script>window.cleanup=CourseNarration.mount({prose:document.querySelector('.prose'),toolbar:document.querySelector('#toolbar'),title:'Static narration fixture',lessonKey:'#/s/01'});</script></body></html>`;
const duration=10,wav=Buffer.alloc(44+duration*48000);
wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(24000,24);wav.writeUInt32LE(48000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
function chapter(){return {version:1,complete:true,voice:'af_heart',passages:texts.map((text,i)=>({text,audioUrl:`audio/${i}.wav`,duration,words:[...text.matchAll(/\S+/g)].map((m,k)=>({start:k*.5,end:k*.5+.45,textOffset:m.index,length:m[0].length}))}))};}
async function main(){
 const browser=await launch(),results=[],requests=[],errors=[];let mode='valid',prefix='/',heldResponse;
 const server=http.createServer((req,res)=>{
  requests.push(req.url);
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!pathname.startsWith(prefix)){res.writeHead(404);return res.end('not found');}
  const rel=pathname.slice(prefix.length);
  if(rel===''||rel==='index.html'){res.setHeader('Content-Type','text/html');return res.end(html);}
  if(['narration.js','narration.css'].includes(rel)){res.setHeader('Content-Type',rel.endsWith('.js')?'text/javascript':'text/css');return res.end(fs.readFileSync(path.join(root,'site',rel)));}
  if(rel==='narration/index.json'){
   if(mode==='missing-index'){res.writeHead(404);return res.end('not found');}
   res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({version:1,complete:mode!=='incomplete',voice:'af_heart',lessons:mode==='missing-chapter'?{}:{'#/s/01':{manifest:'chapters/s01.json'}}}));
  }
  if(rel==='narration/chapters/s01.json'){
   if(mode==='delayed-chapter'){heldResponse=res;return;}
   if(mode==='bad-json'){res.setHeader('Content-Type','application/json');return res.end('{');}
   const data=chapter();if(mode==='stale')data.passages[0].text+=' Changed.';if(mode==='bad-timing')data.passages[0].words[0].end=999;
   res.setHeader('Content-Type','application/json');return res.end(JSON.stringify(data));
  }
  if(/^narration\/audio\/\d\.wav$/.test(rel)&&mode!=='missing-audio'){
   res.setHeader('Content-Type','audio/wav');res.setHeader('Content-Length',wav.length);return res.end(wav);
  }
  res.writeHead(404);res.end('not found');
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 const filter=process.env.NARRATION_QA_FILTER&&new RegExp(process.env.NARRATION_QA_FILTER);
 const previous=filter?JSON.parse(fs.readFileSync(path.join(__dirname,'reports/narration-static.json'),'utf8')).results:[];
 const test=async(name,fn)=>{if(filter&&!filter.test(name)){const old=previous.find(r=>r.name===name);if(old)results.push(old);return;}try{results.push({name,status:'passed',detail:await fn()});}catch(e){results.push({name,status:'failed',error:e.message});}};
 async function pageFor(options={}){
  mode=options.mode||'valid';prefix=options.prefix||'/';requests.length=0;
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  if(options.mock!==false)await page.evaluateOnNewDocument(installMediaClock);
  await page.goto(base+prefix,{waitUntil:'networkidle0'});await page.click('.narration-launch');return page;
 }
 async function state(page,value){await page.waitForFunction(v=>document.querySelector('.narration-player').dataset.state===v,{timeout:6000},value);}
 try{
  for(const mount of ['/','/course/'])await test(`Recorded edition loads under ${mount} with zero local API calls`,async()=>{
   const page=await pageFor({prefix:mount});await state(page,'playing');
   await page.evaluate(()=>__qaMedia.tick(2.6));await page.waitForFunction(()=>[...(CSS.highlights.get('narration-word')||[])].some(r=>r.toString()==='SiO2'));
   assert.deepEqual(await page.$$eval('.narration-voice option',a=>a.map(x=>x.value)),['af_heart']);
   assert((await page.evaluate(()=>__qaMedia.snapshot().at(-1).src)).startsWith(base+mount+'narration/audio/'));
   assert(requests.some(p=>p===mount+'narration/audio/1.wav'));assert(!requests.some(p=>p.includes('/api/')));
   await page.click('[data-action="play"]');await state(page,'paused');
   await page.$eval('.narration-seek',e=>{e.value=1.1;e.dispatchEvent(new Event('input'));});
   await page.click('[data-action="play"]');await state(page,'playing');
   await page.click('[data-action="next"]');await state(page,'playing');
   assert.match(await page.$eval('.narration-position',e=>e.textContent),/^2/);
   await page.evaluate(()=>cleanup());assert.equal(await page.$('.narration-player'),null);
   await page.close();return {crossInlineHighlight:'SiO2',requests:requests.length,apiRequests:0};
  });
  await test('Static WAV decodes and plays using native browser media',async()=>{
   const page=await pageFor({mock:false});await state(page,'playing');
   const decoded=await page.evaluate(async()=>{const bytes=await fetch('narration/audio/0.wav').then(r=>r.arrayBuffer());const c=new AudioContext();const a=await c.decodeAudioData(bytes);await c.close();return {duration:a.duration,channels:a.numberOfChannels};});
   assert(Math.abs(decoded.duration-duration)<.001);assert.equal(decoded.channels,1);assert(!requests.some(p=>p.includes('/api/')));await page.close();return decoded;
  });
  for(const [fixture,pattern] of [['bad-json',/recordings.*invalid|unavailable|retry/i],['stale',/do not match|updated audio/i],['missing-chapter',/missing.*recorded/i],['incomplete',/not complete/i],['missing-audio',/saved audio.*played/i],['bad-timing',/incomplete|timing|invalid/i]])await test(`Actionable ${fixture} recording state`,async()=>{
   const page=await pageFor({mode:fixture,mock:fixture!=='missing-audio'});await state(page,'error');const message=await page.$eval('.narration-status',e=>e.textContent);assert.match(message,pattern);assert(!requests.some(p=>p.includes('/api/')));await page.close();return {message};
  });
  await test('Late static chapter response cannot restart a closed player',async()=>{
   const page=await pageFor({mode:'delayed-chapter'});
   while(!heldResponse)await new Promise(r=>setTimeout(r,20));
   await page.click('[data-action="close"]');heldResponse.end(JSON.stringify(chapter()));heldResponse=null;
   await new Promise(r=>setTimeout(r,100));
   assert(await page.$eval('.narration-player',e=>e.hidden));assert((await page.evaluate(()=>__qaMedia.snapshot())).every(s=>s.paused));assert(!requests.some(p=>p.includes('/api/')));await page.close();return {lateAudioStarted:false};
  });
  await test('Absent bundle on local static server explains missing audio',async()=>{
   const page=await pageFor({mode:'missing-index'});await state(page,'error');const message=await page.$eval('.narration-status',e=>e.textContent);assert.match(message,/recorded|audio|narrator/i);assert(!/JSON|Unexpected token|not valid/i.test(message));assert(!requests.some(p=>p.includes('/api/')));await page.close();return {message};
  });
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
 const report={timestamp:new Date().toISOString(),status:results.every(r=>r.status==='passed')&&!errors.length?'passed':'failed',results,pageErrors:errors,limitations:['Fixture is silent PCM; these checks validate transport, mapping and UI, not voice quality.','Full-course manifest and audio coverage require a separate completed-bundle audit.']};
 fs.writeFileSync(path.join(__dirname,'reports/narration-static.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.status!=='passed')process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});
