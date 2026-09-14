// Capture the exact passages read by the live player; never reparse Markdown differently.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {launch} = require('../../qa/browser');
const config = require('./config');
const project = path.resolve(__dirname, '../..');
const digest = value => crypto.createHash('sha256').update(value).digest('hex');

async function main() {
  const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
  const output = process.env.NARRATION_INVENTORY || path.join(config.home, 'narration-inventory.json');
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.setViewport({width:1280,height:900});
    await page.goto(base, {waitUntil:'domcontentloaded'});
    const sourceHash=digest(fs.readFileSync(path.join(project,'site/content.js')));
    const servedHash=await page.evaluate(async()=>{
      const response=await fetch(new URL('content.js',document.baseURI),{cache:'no-store'});
      if(!response.ok)throw new Error('Served course content is unavailable.');
      return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await response.arrayBuffer())),b=>b.toString(16).padStart(2,'0')).join('');
    });
    if(servedHash!==sourceHash)throw new Error('The preview server is serving a different course build.');
    const routes = await page.evaluate(() => [
      ...COURSE.survey.map(m => ({key:'#/s/'+String(m.n).padStart(2,'0'),title:m.title})),
      ...COURSE.modules.map(m => ({key:'#/m/'+String(m.n).padStart(2,'0'),title:m.title}))
    ]);
    if(routes.length !== 32 || new Set(routes.map(r=>r.key)).size !== 32) throw new Error('Expected all 32 distinct lessons.');
    const extractorHash = digest(await page.evaluate(()=>CourseNarration.extract.toString()));
    const lessons = [];
    for(const route of routes) {
      await page.evaluate(key => {location.hash=key;}, route.key);
      await page.waitForFunction(title => document.querySelector('#main .title')?.textContent === title, {}, route.title);
      const texts = await page.evaluate(()=>CourseNarration.extract(document.querySelector('.prose')).map(p=>p.text));
      if(!texts.length || texts.some(text=>!text.trim() || text.length>4000)) throw new Error('Invalid extracted passages in '+route.key);
      const passages = texts.map(text=>({text,key:digest(JSON.stringify([config.engineVersion,config.revision,'af_heart',text]))}));
      lessons.push({...route,passages});
      console.log(route.key+': '+passages.length+' passages');
    }
    const inventory = {version:1,createdAt:new Date().toISOString(),voice:'af_heart',engineVersion:config.engineVersion,revision:config.revision,sourceHash,extractorHash,lessons};
    const all = lessons.flatMap(l=>l.passages);
    inventory.totals = {lessons:lessons.length,passages:all.length,uniqueClips:new Set(all.map(p=>p.key)).size,characters:all.reduce((n,p)=>n+p.text.length,0),words:all.reduce((n,p)=>n+p.text.split(/\s+/u).length,0)};
    fs.mkdirSync(path.dirname(output),{recursive:true});
    fs.writeFileSync(output+'.tmp',JSON.stringify(inventory));
    fs.renameSync(output+'.tmp',output);
    console.log(JSON.stringify({output,...inventory.totals}));
  } finally {await browser.close();}
}
if(require.main===module)main().catch(error=>{console.error(error);process.exitCode=1;});
