// Explicit local regression: damages only its own tiny synthetic test fixture.
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const config=require('./config');
const base=process.env.NARRATION_TEST_URL||'http://127.0.0.1:8790';
(async()=>{
  for(let i=0;i<120;i++){
    const status=await fetch(base+'/api/narration/status').then(r=>r.json());
    if(status.ready)break;
    if(i===119)throw Error('Local voice did not become ready');
    await new Promise(r=>setTimeout(r,500));
  }
  const text='Cache integrity check: a clear voice.';
  async function render(){const r=await fetch(base+'/api/narration/render',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,voice:'af_heart'})});assert.equal(r.status,200);const d=await r.json();assert(d.duration>0&&d.words.length>0);return d;}
  const initial=await render(),key=/\/([a-f0-9]{64})\.wav$/.exec(initial.audioUrl)[1];
  const metadata=path.join(config.cacheDir,key+'.json'),audio=path.join(config.cacheDir,key+'.wav');
  const results=[];
  let d=await render();assert.equal(d.cached,true);results.push('Valid cache reused');
  fs.writeFileSync(metadata,'{broken');
  d=await render();assert.equal(d.cached,false);results.push('Corrupt JSON regenerated');
  fs.truncateSync(audio,48);
  d=await render();assert.equal(d.cached,false);results.push('Truncated WAV regenerated');
  const bad=JSON.parse(fs.readFileSync(metadata,'utf8'));bad.words[0].textOffset=text.length+1;fs.writeFileSync(metadata,JSON.stringify(bad));
  d=await render();assert.equal(d.cached,false);results.push('Invalid word offsets regenerated');
  d=await render();assert.equal(d.cached,true);results.push('Recovered cache reused');
  console.log(JSON.stringify({passed:true,results,fixture:initial.audioUrl},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
