const os = require('os');
const path = require('path');
const home = path.resolve(process.env.NARRATION_HOME || path.join(os.homedir(), '.cache', 'sand-to-gpu'));
module.exports = {
  home,
  python: process.env.NARRATION_PYTHON || path.join(home, 'narration-venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python'),
  modelDir: path.join(home, 'narration-model'),
  cacheDir: path.join(home, 'narration-audio'),
  revision: 'f3ff3571791e39611d31c381e3a41a3af07b4987',
  engineVersion: 'kokoro-0.9.4-course-1',
  voices: [{id:'af_heart',name:'Heart · warm American voice'}, {id:'af_bella',name:'Bella · clear American voice'}]
};
