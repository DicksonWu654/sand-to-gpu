// Resumable offline export. Generated audio, progress and manifests stay outside Git.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');
const {spawn} = require('child_process');
const config = require('./config');
const project = path.resolve(__dirname, '../..');
const args = process.argv.slice(2);
function option(name, fallback) {const i=args.indexOf(name);return i<0?fallback:args[i+1];}
const inventoryPath = path.resolve(option('--inventory', path.join(config.home,'narration-inventory.json')));
const output = path.resolve(option('--output', path.join(config.home,'static-export')));
const work = path.resolve(option('--progress-dir', path.join(config.home,'prerender')));
const workerCount = Number(option('--workers', process.env.NARRATION_BATCH_WORKERS || '1'));
const limit = Number(option('--limit', '0'));
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const cacheKey = text => hash(JSON.stringify([config.engineVersion,config.revision,'af_heart',text]));
function atomicJSON(file,value) {fs.mkdirSync(path.dirname(file),{recursive:true});const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(value));fs.renameSync(temp,file);}
function validWav(file,duration) {
  let fd;
  try {
    fd=fs.openSync(file,'r');const stat=fs.fstatSync(fd),b=Buffer.alloc(44);const n=fs.readSync(fd,b,0,44,0);
    return n===44&&stat.size>44&&b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,16)==='WAVEfmt '&&b.toString('ascii',36,40)==='data'&&b.readUInt32LE(4)===stat.size-8&&b.readUInt32LE(40)===stat.size-44&&b.readUInt16LE(20)===1&&b.readUInt16LE(22)===1&&b.readUInt32LE(24)===24000&&b.readUInt16LE(34)===16&&Math.abs(duration-(stat.size-44)/48000)<.001;
  }catch{return false;}finally{if(fd!==undefined)fs.closeSync(fd);}
}
function validateResult(result,clip) {
  if(!result||result.audioUrl!=='/api/narration/audio/'+clip.key+'.wav'||result.voice!=='af_heart'||!Number.isFinite(result.duration)||result.duration<=0||!Array.isArray(result.words)||!result.words.length)throw Error('Invalid generated metadata');
  let previous=-1;
  for(const w of result.words){
    if(!w||!Number.isFinite(w.start)||!Number.isFinite(w.end)||w.start<0||w.start<previous||w.end<=w.start||w.end>result.duration||!Number.isInteger(w.textOffset)||!Number.isInteger(w.length)||w.textOffset<0||w.length<=0||w.textOffset+w.length>clip.text.length)throw Error('Invalid generated word alignment');
    previous=w.start;
  }
}
class Worker {
  constructor(number) {
    this.number=number;this.current=null;this.serial=0;this.closed=false;
    this.ready=new Promise((resolve,reject)=>{this.resolveReady=resolve;this.rejectReady=reject;});
    this.child=spawn(config.python,['-u',path.join(__dirname,'worker.py')],{env:{...process.env,NARRATION_HOME:config.home,NARRATION_THREADS:process.env.NARRATION_THREADS||'2'},stdio:['pipe','pipe','pipe']});
    this.timer=setTimeout(()=>{this.fail(Error('Worker startup timed out'));this.child.kill();},180000);
    this.child.stderr.on('data',chunk=>process.stderr.write(`[worker ${number}] `+chunk));
    this.child.stdin.on('error',error=>this.fail(error));
    this.child.on('error',error=>this.fail(error));
    this.child.on('exit',(code,signal)=>{if(!this.closed)this.fail(Error(`Worker exited (${code ?? signal})`));});
    readline.createInterface({input:this.child.stdout}).on('line',line=>{
      let message;try{message=JSON.parse(line);}catch{return;}
      if(message.event==='ready'){clearTimeout(this.timer);this.resolveReady();return;}
      if(!this.current||message.id!==this.current.id)return;
      const job=this.current;this.current=null;clearTimeout(job.timer);
      if(message.error)job.reject(Error(message.error));else job.resolve(message.result);
    });
  }
  fail(error){clearTimeout(this.timer);this.error=error;this.rejectReady(error);if(this.current){clearTimeout(this.current.timer);this.current.reject(error);this.current=null;}}
  async render(clip){await this.ready;if(this.error)throw this.error;return new Promise((resolve,reject)=>{const id=++this.serial;const timer=setTimeout(()=>{this.fail(Error('Passage generation timed out'));this.child.kill();},180000);this.current={id,resolve,reject,timer};this.child.stdin.write(JSON.stringify({id,text:clip.text,voice:'af_heart'})+'\n');});}
  close(){this.closed=true;clearTimeout(this.timer);this.child.stdin.end();}
  kill(){this.closed=true;this.child.kill();}
}

async function main() {
  if(!Number.isInteger(workerCount)||workerCount<1||workerCount>3)throw Error('--workers must be 1, 2 or 3');
  if(!Number.isInteger(limit)||limit<0)throw Error('--limit must be a nonnegative integer');
  if(output===project||project.startsWith(output+path.sep)||output.startsWith(project+path.sep))throw Error('Export must use a generated directory outside the source repository');
  const inventory=JSON.parse(fs.readFileSync(inventoryPath,'utf8'));
  if(inventory.version!==1||!Array.isArray(inventory.lessons)||inventory.lessons.length!==32)throw Error('Expected complete 32-lesson inventory');
  if(inventory.voice!=='af_heart'||inventory.engineVersion!==config.engineVersion||inventory.revision!==config.revision)throw Error('Inventory voice/model identity differs from the current engine');
  const site=path.join(project,'site');
  if(hash(fs.readFileSync(path.join(site,'content.js')))!==inventory.sourceHash)throw Error('Course source changed; regenerate the inventory before rendering');
  const clips=new Map(),lessonIds=new Set();
  for(const lesson of inventory.lessons){
    if(!/^#\/[sm]\/\d\d$/.test(lesson.key)||lessonIds.has(lesson.key)||!Array.isArray(lesson.passages)||!lesson.passages.length)throw Error('Invalid lesson inventory');
    lessonIds.add(lesson.key);
    for(const p of lesson.passages){
      if(typeof p.text!=='string'||!p.text.trim()||p.text.length>4000||p.key!==cacheKey(p.text))throw Error('Invalid passage inventory in '+lesson.key);
      if(!clips.has(p.key))clips.set(p.key,{key:p.key,text:p.text,lessons:[]});
      clips.get(p.key).lessons.push(lesson.key);
    }
  }
  const allClips=[...clips.values()],scheduled=limit?allClips.slice(0,limit):allClips;
  const audioDirectory=path.join(output,'narration/audio');
  fs.mkdirSync(audioDirectory,{recursive:true});fs.mkdirSync(work,{recursive:true});
  const lock=path.join(work,'prerender.lock');
  try {const old=JSON.parse(fs.readFileSync(lock,'utf8'));try{process.kill(old.pid,0);throw Error('Another batch process is running: '+old.pid);}catch(e){if(e.code!=='ESRCH')throw e;}}catch(e){if(e.code!=='ENOENT'&&!(e instanceof SyntaxError))throw e;}
  fs.writeFileSync(lock,JSON.stringify({pid:process.pid,inventoryPath,output}),{flag:'w'});
  // Retire only generated staging clips absent from the new inventory.
  // Their original cache recordings remain available for older editions.
  for(const name of fs.readdirSync(audioDirectory)){
    const match=/^([a-f0-9]{64})\.(?:wav|mp3)$/.exec(name);
    if(match&&!clips.has(match[1]))fs.rmSync(path.join(audioDirectory,name));
  }
  const indexFile=path.join(output,'narration/index.json');
  // Preserve a previous complete edition until the replacement index is ready.
  const began=Date.now(),completed=new Map(),errors=[],pool=[];
  let cursor=0,cached=0,generated=0,characters=0,audioSeconds=0,renderChars=0,renderWall=0,stopping=false,status='starting';
  const totalCharacters=allClips.reduce((n,c)=>n+c.text.length,0);
  const progressFile=path.join(work,'progress.json'),journal=path.join(work,'events.jsonl');
  function progress(last){
    const elapsed=(Date.now()-began)/1000;
    const rate=renderWall>0?renderChars/renderWall:0;
    const eta=rate>0?Math.max(0,totalCharacters-characters)/(rate*workerCount):null;
    const data={version:1,pid:process.pid,status,startedAt:new Date(began).toISOString(),updatedAt:new Date().toISOString(),inventoryPath,output,sourceHash:inventory.sourceHash,extractorHash:inventory.extractorHash,voice:'af_heart',engineVersion:config.engineVersion,revision:config.revision,device:process.env.NARRATION_DEVICE||'cpu',workers:workerCount,totalLessons:32,totalPassages:inventory.lessons.reduce((n,l)=>n+l.passages.length,0),uniqueClips:allClips.length,completedClips:completed.size,cachedClips:cached,generatedClips:generated,failedClips:errors.length,completedCharacters:characters,totalCharacters,audioSeconds,elapsedSeconds:Math.round(elapsed),estimatedRemainingSeconds:eta===null?null:Math.round(eta),errors,last};
    atomicJSON(progressFile,data);return data;
  }
  function event(value){fs.appendFileSync(journal,JSON.stringify({at:new Date().toISOString(),...value})+'\n');}
  function stop(){stopping=true;status='stopping';progress();}
  process.on('SIGINT',stop);process.on('SIGTERM',stop);
  try {
    progress();event({event:'started',pid:process.pid,workers:workerCount,total:allClips.length});
    for(let i=0;i<workerCount;i++)pool.push(new Worker(i+1));
    await Promise.all(pool.map(w=>w.ready));status='rendering';progress();
    await Promise.all(pool.map(async worker=>{
      while(!stopping){
        const clip=scheduled[cursor++];if(!clip)break;
        const start=Date.now();
        try {
          const result=await worker.render(clip);validateResult(result,clip);
          const source=path.join(config.cacheDir,clip.key+'.wav');
          if(!validWav(source,result.duration))throw Error('Cached audio is incomplete or invalid');
          const destination=path.join(audioDirectory,clip.key+'.wav');
          if(!validWav(destination,result.duration)){const temp=destination+'.tmp';await fs.promises.copyFile(source,temp);await fs.promises.rename(temp,destination);}
          completed.set(clip.key,{text:clip.text,textSha256:hash(clip.text),key:clip.key,audioUrl:'audio/'+clip.key+'.wav',words:result.words,duration:result.duration});
          characters+=clip.text.length;audioSeconds+=result.duration;
          if(result.cached)cached++;else{generated++;renderChars+=clip.text.length;renderWall+=(Date.now()-start)/1000;}
          event({event:'clip',key:clip.key,cached:result.cached,seconds:(Date.now()-start)/1000,duration:result.duration});
          const p=progress(clip.key);
          if(completed.size%25===0)console.log(`${completed.size}/${allClips.length} clips; ${errors.length} errors; ETA ${p.estimatedRemainingSeconds===null?'pending':Math.round(p.estimatedRemainingSeconds/60)+' min'}`);
        }catch(error){
          errors.push({key:clip.key,lessons:[...new Set(clip.lessons)],message:error.message});event({event:'error',...errors.at(-1)});progress(clip.key);
          if(worker.error){stopping=true;throw error;}
        }
      }
    }));
    if(hash(fs.readFileSync(path.join(site,'content.js')))!==inventory.sourceHash)throw Error('Course content changed during rendering; export index withheld');
    const index={version:1,complete:true,voice:'af_heart',engineVersion:config.engineVersion,revision:config.revision,sourceHash:inventory.sourceHash,extractorHash:inventory.extractorHash,createdAt:new Date().toISOString(),lessons:{}};
    for(const lesson of inventory.lessons){
      if(!lesson.passages.every(p=>completed.has(p.key)))continue;
      const stem=lesson.key.replace('#/','').replace('/','');
      const passages=lesson.passages.map(p=>completed.get(p.key));
      const textSha256=hash(JSON.stringify(lesson.passages.map(p=>p.text)));
      const relative='lessons/'+stem+'.json';
      atomicJSON(path.join(output,'narration',relative),{version:1,complete:true,voice:'af_heart',lessonId:lesson.key,title:lesson.title,textSha256,passages});
      index.lessons[lesson.key]={manifest:relative,textSha256};
    }
    if(!stopping&&!errors.length&&completed.size===allClips.length&&Object.keys(index.lessons).length===32){
      status='packaging';progress();
      for(const entry of fs.readdirSync(site,{withFileTypes:true})){
        if(entry.name==='narration')continue;
        await fs.promises.cp(path.join(site,entry.name),path.join(output,entry.name),{recursive:true,force:true});
      }
      const htmlFile=path.join(output,'index.html');
      let html=fs.readFileSync(htmlFile,'utf8');
      if(!/<meta\s+name=["']narration-mode["']/i.test(html))html=html.replace(/<head\b[^>]*>/i,tag=>tag+'\n<meta name="narration-mode" content="static">');
      fs.writeFileSync(htmlFile,html);
      atomicJSON(indexFile,index);status='complete';progress();event({event:'complete',output});
      console.log('Complete static course with narration: '+output);
    }else{status=errors.length?'needs-repair':stopping?'paused':'limited';progress();event({event:status,completed:completed.size,errors:errors.length});process.exitCode=errors.length?2:0;}
  }catch(error){status='failed';errors.push({message:error.message});progress();event({event:'failed',message:error.message});throw error;}
  finally{for(const worker of pool){if(stopping||status==='failed')worker.kill();else worker.close();}fs.rmSync(lock,{force:true});}
}
main().catch(error=>{console.error(error.stack||error);process.exitCode=1;});
