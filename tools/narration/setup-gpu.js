// Optional Blackwell-capable runtime. The existing CPU environment is never changed.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const config=require('./config');
const runtime=path.join(config.home,'narration-gpu-py312');
const python=path.join(runtime,process.platform==='win32'?'Scripts/python.exe':'bin/python');
const uv=process.env.UV_BIN||'uv';
function run(command,args){const r=spawnSync(command,args,{stdio:'inherit',env:{...process.env,NARRATION_HOME:config.home,HF_HUB_DISABLE_TELEMETRY:'1'}});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);}
if(!fs.existsSync(python))run(uv,['venv','--python','3.12.3',runtime]);
run(uv,['pip','install','--python',python,'--extra-index-url','https://download.pytorch.org/whl/cu130','--index-strategy','unsafe-best-match','-r',path.join(__dirname,'requirements-gpu.lock')]);
run(uv,['pip','check','--python',python]);
run(python,['-c','import torch; assert torch.cuda.is_available(), "CUDA is unavailable; use the CPU runtime instead."; print(torch.__version__, torch.cuda.get_device_name(0)); print(torch.ones(8,device="cuda").sum().item())']);
run(python,[path.join(__dirname,'setup_model.py')]);
console.log('GPU runtime ready. Set NARRATION_PYTHON='+python+' and NARRATION_DEVICE=cuda for batch rendering.');
