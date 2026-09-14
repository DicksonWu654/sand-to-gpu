// Compress completed clips while the GPU renders, then finalize a static-only bundle.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),{spawn}=require('child_process');
const config=require('./config');
const args=process.argv.slice(2);
const option=(name,fallback)=>{const at=args.indexOf(name);return at<0?fallback:args[at+1];};
const output=path.resolve(option('--output',path.join(config.home,'static-export')));
const work=path.resolve(option('--progress-dir',path.join(config.home,'prerender')));
const ffmpeg=option('--ffmpeg',process.env.NARRATION_FFMPEG);
const digest=value=>crypto.createHash('sha256').update(value).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function atomic(file,data){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file+'.tmp',JSON.stringify(data));fs.renameSync(file+'.tmp',file);}
async function run(command,args){return new Promise((resolve,reject)=>{const p=spawn(command,args,{stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',d=>error=(error+d).slice(-2000));p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(error||'Encoder failed')));});}
async function main(){
  const project=path.resolve(__dirname,'../..');
  if(output===project||output.startsWith(project+path.sep)||project.startsWith(output+path.sep))throw Error('Export must use a generated directory outside the source repository');
  if(!ffmpeg||!fs.existsSync(ffmpeg))throw Error('Provide a local FFmpeg binary with --ffmpeg or NARRATION_FFMPEG');
  const audioDir=path.join(output,'narration/audio'),stateDir=path.join(work,'compressed');
  fs.mkdirSync(stateDir,{recursive:true});
  // A successful finalizer can be rerun after its temporary WAV exports are removed.
  try {
    const previous=JSON.parse(fs.readFileSync(path.join(work,'export-progress.json'),'utf8'));
    const render=JSON.parse(fs.readFileSync(path.join(work,'progress.json'),'utf8'));
    const index=JSON.parse(fs.readFileSync(path.join(output,'narration/index.json'),'utf8'));
    if(render.status==='complete'&&index.complete&&index.audioFormat==='mp3'&&index.sourceHash===render.sourceHash&&digest(fs.readFileSync(path.join(output,'content.js')))===index.sourceHash&&Object.keys(index.lessons).length===32){
      let intact=true;
      for(const entry of Object.values(index.lessons)){
        const chapter=JSON.parse(fs.readFileSync(path.join(output,'narration',entry.manifest),'utf8'));
        if(!chapter.complete||!chapter.passages.every(p=>{
          if(!/^audio\/[a-f0-9]{64}\.mp3$/.test(p.audioUrl))return false;
          const key=path.basename(p.audioUrl,'.mp3'),audio=fs.readFileSync(path.join(output,'narration',p.audioUrl));
          const record=JSON.parse(fs.readFileSync(path.join(stateDir,key+'.json'),'utf8'));
          return audio.length>500&&digest(audio)===record.mp3Hash&&Math.abs(record.duration-p.duration)<.001;
        }))intact=false;
      }
      if(intact&&fs.readFileSync(path.join(output,'index.html'),'utf8').includes('name="narration-mode" content="static"')){
        for(const name of fs.readdirSync(audioDir))if(/^[a-f0-9]{64}\.wav$/.test(name))fs.rmSync(path.join(audioDir,name));
        atomic(path.join(work,'export-progress.json'),{...previous,status:'complete',updatedAt:new Date().toISOString(),pid:process.pid});
        console.log('Static MP3 course is already complete: '+output);return;
      }
    }
  }catch{}
  const lock=path.join(work,'compression.lock');
  try{const old=JSON.parse(fs.readFileSync(lock,'utf8'));try{process.kill(old.pid,0);throw Error('Another compression process is running: '+old.pid);}catch(e){if(e.code!=='ESRCH')throw e;}}catch(e){if(e.code!=='ENOENT'&&!(e instanceof SyntaxError))throw e;}
  fs.writeFileSync(lock,JSON.stringify({pid:process.pid}));
  const seen=new Set(),failures=[],began=Date.now();let stopping=false,bytes=0,wavBytes=0,status='compressing',active=0;
  process.on('SIGTERM',()=>{stopping=true;});process.on('SIGINT',()=>{stopping=true;});
  const progress=()=>atomic(path.join(work,'export-progress.json'),{version:1,pid:process.pid,status,updatedAt:new Date().toISOString(),output,format:'mp3',bitrate:64000,compressedClips:seen.size-failures.length,failedClips:failures.length,active,mp3Bytes:bytes,wavBytes,elapsedSeconds:Math.round((Date.now()-began)/1000),errors:failures});
  async function encode(key){
    const input=path.join(audioDir,key+'.wav'),target=path.join(audioDir,key+'.mp3'),record=path.join(stateDir,key+'.json');active++;
    try{
      const source=fs.readFileSync(input),sourceHash=digest(source),duration=(source.length-44)/48000;
      let previous;try{previous=JSON.parse(fs.readFileSync(record,'utf8'));}catch{}
      let encoded;
      if(previous?.sourceHash===sourceHash){try{encoded=fs.readFileSync(target);if(digest(encoded)!==previous.mp3Hash)encoded=null;}catch{}}
      if(!encoded){
        const temporary=target+'.tmp.mp3';
        await run(ffmpeg,['-hide_banner','-loglevel','error','-nostdin','-y','-threads','1','-i',input,'-codec:a','libmp3lame','-b:a','64k','-ac','1','-ar','24000','-write_xing','1',temporary]);
        encoded=fs.readFileSync(temporary);if(encoded.length<500)throw Error('Encoded clip is unexpectedly empty');
        fs.renameSync(temporary,target);
        atomic(record,{key,sourceHash,mp3Hash:digest(encoded),duration,bytes:encoded.length,encoder:'libmp3lame',bitrate:64000});
      }
      bytes+=encoded.length;wavBytes+=source.length;
    }catch(error){failures.push({key,message:error.message});}
    finally{active--;seen.add(key);progress();}
  }
  try{
    progress();
    while(!stopping){
      const keys=fs.existsSync(audioDir)?fs.readdirSync(audioDir).filter(n=>/^[a-f0-9]{64}\.wav$/.test(n)).map(n=>n.slice(0,-4)).filter(key=>!seen.has(key)):[];
      if(keys.length){let cursor=0;await Promise.all([0,1].map(async()=>{while(!stopping){const key=keys[cursor++];if(!key)break;await encode(key);}}));}
      let render;try{render=JSON.parse(fs.readFileSync(path.join(work,'progress.json'),'utf8'));}catch{}
      if(render?.status==='complete'&&!keys.length&&seen.size<render.uniqueClips)throw Error('Audio staging is incomplete. Rerun narration:prerender before narration:export to restore it from the cache.');
      if(render?.status==='complete'&&seen.size>=render.uniqueClips){
        if(failures.length){status='needs-repair';progress();process.exitCode=2;return;}
        status='validating';progress();
        const indexFile=path.join(output,'narration/index.json');
        const index=JSON.parse(fs.readFileSync(indexFile,'utf8'));
        if(!index.complete||Object.keys(index.lessons).length!==32)throw Error('Complete 32-lesson index is missing');
        if(digest(fs.readFileSync(path.join(output,'content.js')))!==index.sourceHash)throw Error('Exported course differs from the inventory');
        // Verify the live source extractor has not changed during the long render.
        const {launch}=require('../../qa/browser');const browser=await launch();
        try{const page=await browser.newPage();await page.goto(process.env.QA_BASE_URL||'http://127.0.0.1:8790',{waitUntil:'domcontentloaded'});const extractor=await page.evaluate(()=>CourseNarration.extract.toString());if(digest(extractor)!==index.extractorHash)throw Error('Passage extractor changed during rendering');}finally{await browser.close();}
        const chapters=[];
        for(const entry of Object.values(index.lessons)){
          const file=path.join(output,'narration',entry.manifest);const chapter=JSON.parse(fs.readFileSync(file,'utf8'));
          for(const passage of chapter.passages){
            const key=/^audio\/([a-f0-9]{64})\.(?:wav|mp3)$/.exec(passage.audioUrl)?.[1];
            if(!key||!seen.has(key)||!fs.existsSync(path.join(audioDir,key+'.mp3')))throw Error('A chapter is missing compressed audio');
            const record=JSON.parse(fs.readFileSync(path.join(stateDir,key+'.json'),'utf8'));
            if(Math.abs(record.duration-passage.duration)>.001)throw Error('Compressed audio timing source differs');
            passage.audioUrl='audio/'+key+'.mp3';
          }
          chapters.push({file,chapter});
        }
        status='finalizing';progress();
        for(const {file,chapter} of chapters)atomic(file,chapter);
        const htmlFile=path.join(output,'index.html');let html=fs.readFileSync(htmlFile,'utf8');
        if(!/<meta\s+name=["']narration-mode["']/i.test(html))html=html.replace(/<head\b[^>]*>/i,tag=>tag+'\n<meta name="narration-mode" content="static">');
        if(!html.includes('name="narration-mode" content="static"'))throw Error('Static-only marker could not be installed');
        fs.writeFileSync(htmlFile+'.tmp',html);fs.renameSync(htmlFile+'.tmp',htmlFile);
        index.audioFormat='mp3';index.audioBitrate=64000;index.finalizedAt=new Date().toISOString();atomic(indexFile,index);
        // Every manifest now uses MP3; keep originals only in the reusable local cache.
        for(const key of seen)fs.rmSync(path.join(audioDir,key+'.wav'),{force:true});
        status='complete';progress();console.log('Static MP3 course complete: '+output);return;
      }
      if(render&&['needs-repair','failed','paused','limited'].includes(render.status)){status='waiting-for-render-repair';progress();process.exitCode=2;return;}
      if(!keys.length)await sleep(1500);
    }
    status='paused';progress();
  }catch(error){status='failed';failures.push({message:error.message});progress();throw error;}
  finally{fs.rmSync(lock,{force:true});}
}
main().catch(error=>{console.error(error.stack||error);process.exitCode=1;});
