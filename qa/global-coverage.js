// Targeted supplier-reference layout review; does not generate or inspect narration assets.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto');
const {launch}=require('./browser');
const root=path.resolve(__dirname,'..'),base=process.env.QA_BASE_URL||'http://127.0.0.1:8793';
const out=path.join(__dirname,'shots/global-coverage');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await launch(),cases=[],errors=[];
 try{for(const module of [20,21])for(const width of [1280,375])for(const theme of ['light','dark']){
  const page=await browser.newPage(),pageErrors=[];page.on('pageerror',e=>pageErrors.push(e.message));
  await page.setViewport({width,height:width===375?812:900});
  try{await page.goto(base+'/#/m/'+module,{waitUntil:'networkidle0'});await page.waitForSelector('.prose table');await page.evaluate(theme=>document.documentElement.setAttribute('data-theme',theme),theme);
   const detail=await page.evaluate(module=>{
    const prose=document.querySelector('.prose'),names=module===21?['Hoshine','Xinhua','NSIG','Hwatsing','Skyverse','AccoTEST','Empyrean','Hua Hong','CXMT','YMTC','JCET','Huawei']:['SMIC','Hua Hong','CXMT','YMTC','NAURA','AMEC','Hwatsing','Skyverse','Empyrean','JCET'];
    const missing=names.filter(n=>!prose.textContent.includes(n));
    const table=[...prose.querySelectorAll('table')].find(t=>module===21?t.textContent.includes('Xinhua')&&t.textContent.includes('Hoshine'):t.textContent.includes('Representative companies')&&t.textContent.includes('What needs a separate comparison'));
    if(!table)throw Error('Target reference table missing');table.dataset.qaReference='true';
    const wrapper=table.closest('.table-scroll');if(!wrapper)throw Error('Table has no scrolling container');
    wrapper.scrollLeft=1e6;const reached=wrapper.scrollLeft;wrapper.scrollLeft=0;
    const cells=[...table.querySelectorAll('td')],fontSizes=cells.map(e=>parseFloat(getComputedStyle(e).fontSize));
    return {missing,documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,tableRows:table.rows.length,minBodyCellFontPx:Math.min(...fontSizes),wrapperWidth:wrapper.clientWidth,tableWidth:wrapper.scrollWidth,maxScrollReached:reached,overflowX:getComputedStyle(wrapper).overflowX,tabindex:wrapper.getAttribute('tabindex'),ariaLabel:wrapper.getAttribute('aria-label')};
   },module);
   assert.deepEqual(detail.missing,[]);assert(detail.documentWidth<=width+1,'Horizontal document overflow');assert(detail.minBodyCellFontPx>=12,'Table body font too small');
   assert(['auto','scroll'].includes(detail.overflowX));if(detail.tableWidth>detail.wrapperWidth+2){assert(detail.maxScrollReached>0);assert.equal(detail.tabindex,'0');
    await page.$eval('[data-qa-reference]',e=>e.closest('.table-scroll').focus());await page.keyboard.press('ArrowRight');await new Promise(r=>setTimeout(r,150));
    detail.keyboardScroll=await page.$eval('[data-qa-reference]',e=>e.closest('.table-scroll').scrollLeft);assert(detail.keyboardScroll>0,'Keyboard table scrolling failed');
   }
   await page.$eval('[data-qa-reference]',async table=>{const w=table.closest('.table-scroll');w.blur();w.scrollLeft=0;w.scrollTop=0;const row=[...table.rows].find(r=>r.textContent.includes('Hoshine'))||table.rows[0];row.dataset.qaVisibleRow='true';for(let i=0;i<5;i++){window.scrollTo({top:window.scrollY+row.getBoundingClientRect().top-130,behavior:'instant'});await new Promise(r=>setTimeout(r,200));}});
   const bounds=await page.$eval('[data-qa-visible-row]',e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}));assert(bounds.top>=0&&bounds.top<600,'Target table row is not visible in screenshot');
   const screenshot=path.join(out,`m${module}-${width}-${theme}.png`);await page.screenshot({path:screenshot});assert.deepEqual(pageErrors,[]);
   cases.push({module,width,theme,status:'passed',...detail,pageErrors,screenshot});
  }catch(e){cases.push({module,width,theme,status:'failed',error:e.message,pageErrors});errors.push(e.message);}finally{await page.close();}
 }}finally{await browser.close();}
 const negative=JSON.parse(fs.readFileSync(path.join(__dirname,'reports/language-build-contract-review.json'),'utf8'));
 const report={checkedAt:new Date().toISOString(),status:errors.length?'failed':'passed',baseUrl:base,contentSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'site/content.js'))).digest('hex'),scope:'Modules20 and21 selected changed supplier tables, desktop1280 and phone375, light/dark; named suppliers, font size, table scroll containment and keyboard scroll, page errors and document overflow. Not a full course visual or factual audit.',contractReview:{amendments:'Exact named before/after option arrays are applied to the historical baseline; answer indices/counts and all unlisted options remain historical. Built quizzes independently match authored JSON.',negativeCases:negative.negativeTests.map(t=>({case:t.case,detected:t.detected})),livePreviewUntouched:negative.livePreviewUntouched},cases,errors,visualReview:'Pending inspection of saved screenshots.'};
 if(negative.negativeTests.some(t=>!t.detected)||!negative.livePreviewUntouched)report.status='failed';
 fs.writeFileSync(path.join(__dirname,'reports/global-coverage.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,cases:cases.length,errors},null,2));if(report.status!=='passed')process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
