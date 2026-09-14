// One-time explicit download. Listening itself only reads local assets.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const config=require('./config');
function run(command,args){const r=spawnSync(command,args,{stdio:'inherit',env:{...process.env,NARRATION_HOME:config.home,HF_HUB_DISABLE_TELEMETRY:'1'}});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);}
fs.mkdirSync(config.home,{recursive:true});
const uv=process.env.UV_BIN||'uv';
if(!fs.existsSync(config.python))run(uv,['venv','--python','3.13.11',path.join(config.home,'narration-venv')]);
run(uv,['pip','install','--python',config.python,'--extra-index-url','https://download.pytorch.org/whl/cpu','--index-strategy','unsafe-best-match','-r',path.join(__dirname,'requirements.lock')]);
run(config.python,[path.join(__dirname,'setup_model.py')]);
console.log('Local voices installed in '+config.home+'. Start the course with npm start.');
