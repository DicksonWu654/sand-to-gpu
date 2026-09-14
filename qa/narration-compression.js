// Verify encoder delay/padding handling in the actual browser decoder; not a listening test.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {launch}=require('./browser');const config=require('../tools/narration/config');
(async()=>{
 const wav=process.argv[2]||path.join(config.cacheDir,'fd37d2f7daab36524d9f56b0f64792e21be2c4060091372c0aaa5ea05408a001.wav');
 const mp3=process.argv[3]||path.join(config.home,'prerender/sample.mp3');
 const server=http.createServer((req,res)=>{if(req.url==='/a'||req.url==='/b'){res.setHeader('Content-Type',req.url==='/a'?'audio/wav':'audio/mpeg');fs.createReadStream(req.url==='/a'?wav:mp3).pipe(res);}else res.end('<!doctype html><title>Audio decoder QA</title>');});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await launch();let result;
 try{
  const page=await browser.newPage();await page.goto('http://127.0.0.1:'+server.address().port);
  result=await page.evaluate(async()=>{
   const c=new AudioContext({sampleRate:24000});
   const [a,b]=await Promise.all(['/a','/b'].map(async url=>c.decodeAudioData(await fetch(url).then(r=>r.arrayBuffer()))));
   const x=a.getChannelData(0),y=b.getChannelData(0);let best={lagSamples:null,correlation:-2};
   for(let lag=-240;lag<=240;lag++){
    let xy=0,xx=0,yy=0;
    for(let i=12000;i<Math.min(x.length-240,24000*8);i+=8){const v=x[i],w=y[i+lag];xy+=v*w;xx+=v*v;yy+=w*w;}
    const correlation=xy/Math.sqrt(xx*yy);if(correlation>best.correlation)best={lagSamples:lag,correlation};
   }
   const out={wavDuration:a.duration,mp3Duration:b.duration,wavFrames:a.length,mp3Frames:b.length,sampleRate:c.sampleRate,wavChannels:a.numberOfChannels,mp3Channels:b.numberOfChannels,...best};await c.close();return out;
  });
  assert(Math.abs(result.wavDuration-result.mp3Duration)<.001);assert.equal(result.wavChannels,1);assert.equal(result.mp3Channels,1);assert(Math.abs(result.lagSamples)<=1);assert(result.correlation>.95);
  result={status:'passed',timestamp:new Date().toISOString(),...result,wavBytes:fs.statSync(wav).size,mp3Bytes:fs.statSync(mp3).size,fixture:'Actual first S01 Heart passage',encoder:'libmp3lame64kbps24kmono write_xing1 via FFmpeg7.0.2',limitations:['Waveform correlation detects encoder shift, not subjective audible quality.','One representative clip; full bundle still requires file-level coverage and metadata validation.']};
  fs.writeFileSync(path.join(__dirname,'reports/narration-compression.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
