const {launch}=require('./browser');
const fs=require('fs'),path=require('path');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8790';
const assert=(v,m)=>{if(!v)throw new Error(m)};
(async()=>{
 const browser=await launch(),page=await browser.newPage(),errors=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));
 try {
  await page.setViewport({width:1280,height:900});await page.goto(base,{waitUntil:'load'});
  const initial=await page.evaluate(()=>({widgets:Object.keys(__WIDGETS).length,modules:COURSE.modules.length,surveys:COURSE.survey.length}));
  assert(initial.widgets===46,'All 46 widgets must register');checks.push('46 widget registrations');
  await page.click('#theme');const theme=await page.evaluate(()=>document.documentElement.dataset.theme);await page.reload({waitUntil:'load'});assert(await page.evaluate(t=>document.documentElement.dataset.theme===t,theme),'Theme must persist');checks.push('Theme toggles and persists');
  await page.goto(base+'/#/m/08',{waitUntil:'load'});const anchor=await page.evaluate(()=>COURSE.modules.find(m=>m.n===8).toc[0].id);
  await page.evaluate(a=>location.hash='#/m/08/'+a,anchor);await new Promise(r=>setTimeout(r,500));assert(await page.evaluate(a=>!!document.getElementById(a),anchor),'Anchor target missing');checks.push('Deep module and heading route');
  const routeSurvey=await page.evaluate(()=>COURSE.survey[0]?.n);
  if(routeSurvey){await page.evaluate(n=>location.hash='#/s/'+String(n).padStart(2,'0'),routeSurvey);await page.waitForFunction(()=>document.querySelector('.track-btn.active')?.textContent.includes('Survey'));checks.push('Survey route switches sidebar track');}
  await page.goto(base+'/#/m/00',{waitUntil:'load'});
  await page.evaluate(()=>{const qs=COURSE.modules[0].quiz.questions;qs.forEach((q,i)=>document.querySelector(`input[name="q0_${i}"][value="${q.answer}"]`).click());});
  assert(await page.$eval('.quiz .verdict',e=>e.textContent.startsWith('Passed:')),'Correct quiz answers should pass');await page.click('.quiz-foot button');assert(await page.$$eval('.q.answered',a=>a.length===0),'Retry should reset answer controls');checks.push('Quiz answers, saved pass and retry');
  await page.setViewport({width:375,height:900});await page.goto(base+'/#/home',{waitUntil:'load'});await page.waitForSelector('.home-hero');await page.click('#menu');await page.waitForFunction(()=>document.querySelector('#sidebar').getBoundingClientRect().left>=0);assert(await page.$eval('#sidebar',e=>e.classList.contains('open')),'Mobile menu should open');await page.click('#sidebar a[href="#/m/00"]');await page.waitForFunction(()=>location.hash==='#/m/00'&&!document.querySelector('#sidebar').classList.contains('open'),{timeout:3000});assert(await page.$eval('#sidebar',e=>!e.classList.contains('open')),'Menu should close after navigation');checks.push('Mobile curriculum navigation');
  await page.click('#search');await page.type('#search','Czochralski');await page.waitForSelector('#search-results:not([hidden]) a');
  const searchWidth=await page.$eval('#search-results',e=>e.getBoundingClientRect().width);assert(searchWidth>300,'Mobile search results must remain readable');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await new Promise(r=>setTimeout(r,150));assert(await page.$eval('#search-results',e=>e.hidden),'Search should close after keyboard navigation');checks.push('Mobile search readable and keyboard navigable');
  const diagram=await page.$('.diagram-scroll[tabindex="0"]');
  if(diagram){await diagram.focus();const before=await diagram.evaluate(e=>e.scrollLeft);await page.keyboard.press('ArrowRight');await new Promise(r=>setTimeout(r,180));assert(await diagram.evaluate((e,b)=>e.scrollLeft>b,before),'Dense diagram must scroll by keyboard');checks.push('Dense diagram keyboard scrolling');}
  assert(!errors.length,'Browser errors: '+errors.join('; '));
  const report={timestamp:new Date().toISOString(),...initial,checks,errors};fs.mkdirSync(path.join(__dirname,'reports'),{recursive:true});fs.writeFileSync(path.join(__dirname,'reports/shell-check.json'),JSON.stringify(report,null,2)+'\n');console.log(report);
 } catch(e) { fs.mkdirSync(path.join(__dirname,'shots'),{recursive:true}); await page.screenshot({path:path.join(__dirname,'shots','shell-failure.png')}); console.error({checks,hash:await page.evaluate(()=>location.hash),errors}); throw e; } finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
