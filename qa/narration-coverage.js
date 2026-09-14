// Independent static-bundle coverage audit. Reads assets; never renders or changes caches.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {launch}=require('./browser'),config=require('../tools/narration/config');
const digest=value=>crypto.createHash('sha256').update(value).digest('hex');
const project=path.resolve(__dirname,'..');
const output=process.env.NARRATION_EXPORT||path.join(config.home,'static-export');
const inventoryPath=process.env.NARRATION_INVENTORY||path.join(config.home,'narration-inventory.json');
const work=path.join(config.home,'prerender');
function mp3Duration(b){
 let start=0;
 if(b.toString('ascii',0,3)==='ID3'){assert.equal(b[5]&0x10,0);start=10+((b[6]&127)*2097152+(b[7]&127)*16384+(b[8]&127)*128+(b[9]&127));}
 // This export deliberately fixes MPEG-2 Layer III, 24 kHz mono at 64 kbps.
 assert.equal(b[start],255);assert.equal(b[start+1],243);assert.equal(b[start+2]&0xfc,0x84);assert.equal(b[start+3]>>6,3);
 const info=start+13;assert(['Info','Xing'].includes(b.toString('ascii',info,info+4)));assert.equal(b.readUInt32BE(info+4),15);
 const frames=b.readUInt32BE(info+8),bytes=b.readUInt32BE(info+12),packed=b.readUIntBE(info+141,3),delay=packed>>12,padding=packed&4095;
 assert.equal(bytes,b.length-start);assert.equal((frames+1)*192,bytes);
 for(let i=start;i<b.length;i+=192){assert.equal(b[i],255);assert.equal(b[i+1],243);assert.equal(b[i+2]&0xfc,0x84);assert.equal(b[i+3]>>6,3);}
 const duration=(frames*576-delay-padding)/24000;assert(duration>0);return duration;
}
function timing(data,text){
 assert(Number.isFinite(data.duration)&&data.duration>0);assert(Array.isArray(data.words)&&data.words.length>0);let previous=-1;
 for(const w of data.words){assert(Number.isFinite(w.start)&&Number.isFinite(w.end));assert(w.start>=0&&w.start>=previous&&w.end>w.start&&w.end<=data.duration);assert(Number.isInteger(w.textOffset)&&Number.isInteger(w.length)&&w.textOffset>=0&&w.length>0&&w.textOffset+w.length<=text.length);previous=w.start;}
}
async function main(){
 const inventory=JSON.parse(fs.readFileSync(inventoryPath,'utf8'));assert.equal(inventory.lessons.length,32);
 const expectedRoutes=[...Array.from({length:10},(_,i)=>'#/s/'+String(i+1).padStart(2,'0')),...Array.from({length:22},(_,i)=>'#/m/'+String(i).padStart(2,'0'))];
 assert.deepEqual(inventory.lessons.map(l=>l.key).sort(),expectedRoutes.sort());assert.equal(digest(fs.readFileSync(path.join(project,'site/content.js'))),inventory.sourceHash);
 const clips=new Map();let passages=0;
 for(const lesson of inventory.lessons)for(const p of lesson.passages){assert.equal(p.key,digest(JSON.stringify([inventory.engineVersion,inventory.revision,inventory.voice,p.text])));assert(p.text.trim());clips.set(p.key,p);passages++;}
 assert.equal(clips.size,inventory.totals.uniqueClips);assert.equal(passages,inventory.totals.passages);
 const report={timestamp:new Date().toISOString(),status:'pending',inventory:{lessons:32,passages,uniqueClips:clips.size,sourceHash:inventory.sourceHash,extractorHash:inventory.extractorHash},clipsChecked:0,bytes:0,audioSeconds:0,errors:[],limitations:['Technical integrity and exact text coverage do not grade audible pronunciation or naturalness.','MP3 duration uses the fixed export codec, frame count and encoder delay/padding; representative browser decode is recorded separately.'],primarySources:['https://www.ffmpeg.org/doxygen/trunk/mp3enc_8c_source.html','https://www.ffmpeg.org/doxygen/trunk/mp3dec_8c_source.html']};
 const partial=process.argv.includes('--partial');const selected=[...clips.values()].filter(p=>fs.existsSync(path.join(work,'compressed',p.key+'.json')));
 for(const p of selected){try{
  const file=path.join(output,'narration/audio',p.key+'.mp3'),audio=fs.readFileSync(file),record=JSON.parse(fs.readFileSync(path.join(work,'compressed',p.key+'.json'),'utf8'));
  assert.equal(digest(audio),record.mp3Hash);assert.equal(audio.length,record.bytes);assert.equal(record.key,p.key);const duration=mp3Duration(audio);assert(Math.abs(duration-record.duration)<.001);
  const metadata=JSON.parse(fs.readFileSync(path.join(config.cacheDir,p.key+'.json'),'utf8'));assert.equal(metadata.voice,inventory.voice);assert.equal(metadata.audioUrl,'/api/narration/audio/'+p.key+'.wav');timing(metadata,p.text);assert(Math.abs(duration-metadata.duration)<.001);
  report.clipsChecked++;report.bytes+=audio.length;report.audioSeconds+=duration;
 }catch(e){report.errors.push({key:p.key,error:e.message});}}
 if(!partial){
  assert.equal(report.clipsChecked,clips.size,'Every clip must be complete and valid');assert.equal(report.errors.length,0);
  const index=JSON.parse(fs.readFileSync(path.join(output,'narration/index.json'),'utf8'));assert.equal(index.complete,true);assert.equal(index.audioFormat,'mp3');assert.equal(index.sourceHash,inventory.sourceHash);assert.equal(index.extractorHash,inventory.extractorHash);assert.equal(index.voice,inventory.voice);assert.deepEqual(Object.keys(index.lessons).sort(),expectedRoutes.sort());
  assert.equal(digest(fs.readFileSync(path.join(output,'content.js'))),inventory.sourceHash);assert.match(fs.readFileSync(path.join(output,'index.html'),'utf8'),/<meta name="narration-mode" content="static">/);
  for(const lesson of inventory.lessons){const spec=index.lessons[lesson.key];const chapter=JSON.parse(fs.readFileSync(path.join(output,'narration',spec.manifest),'utf8'));assert.equal(chapter.complete,true);assert.equal(chapter.voice,inventory.voice);assert.equal(chapter.lessonId,lesson.key);assert.deepEqual(chapter.passages.map(p=>p.text),lesson.passages.map(p=>p.text));const textHash=digest(JSON.stringify(lesson.passages.map(p=>p.text)));assert.equal(spec.textSha256,textHash);assert.equal(chapter.textSha256,textHash);
   for(let i=0;i<chapter.passages.length;i++){const p=chapter.passages[i];assert.equal(p.key,lesson.passages[i].key);assert.equal(p.textSha256,digest(p.text));assert.equal(p.audioUrl,'audio/'+p.key+'.mp3');timing(p,p.text);const cached=JSON.parse(fs.readFileSync(path.join(config.cacheDir,p.key+'.json'),'utf8'));assert.equal(p.duration,cached.duration);assert.deepEqual(p.words,cached.words);}
  }
  const browser=await launch();try{const page=await browser.newPage();await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:8790',{waitUntil:'domcontentloaded'});assert.equal(digest(await page.evaluate(()=>CourseNarration.extract.toString())),inventory.extractorHash);for(const width of [1280,375]){await page.setViewport({width,height:900});for(const lesson of inventory.lessons){await page.evaluate(key=>location.hash=key,lesson.key);await page.waitForFunction(title=>document.querySelector('#main .title')?.textContent===title,{},lesson.title);assert.deepEqual(await page.evaluate(()=>CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text)),lesson.passages.map(p=>p.text),lesson.key+' at '+width+'px');}}report.liveDomLessonsChecked=32;report.liveDomWidths=[1280,375];report.liveDomComparisons=64;}finally{await browser.close();}
  report.status='passed';
 }else{report.status=report.errors.length?'failed':'partial';report.remainingClips=clips.size-report.clipsChecked;report.indexPublished=fs.existsSync(path.join(output,'narration/index.json'));}
 const name=partial?'narration-coverage-progress.json':'narration-coverage.json';fs.writeFileSync(path.join(__dirname,'reports',name),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.errors.length)process.exitCode=1;
}
module.exports={mp3Duration,timing};if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
