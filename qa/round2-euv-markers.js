// Each independently hidden EUV view must resolve markers inside its own SVG.
const {launch}=require('./browser');
const fs=require('fs');
(async()=>{
  const browser=await launch();const page=await browser.newPage();const cases=[];
  try{
    await page.goto('http://127.0.0.1:8790/widget-test.html?w=euv-source');
    for(const theme of ['light','dark']){
      await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.querySelector('#pick').dispatchEvent(new Event('change'));},theme);
      const result=await page.evaluate(()=>{
        let references=0;
        for(let i=0;i<24;i++){
          document.querySelector('[data-view="'+(i%3)+'"]').click();
          const box=document.querySelector('#box'), ids=[...box.querySelectorAll('[id]')].map(e=>e.id);
          if(new Set(ids).size!==ids.length)throw Error('Duplicate IDs');
          for(const e of box.querySelectorAll('[marker-start],[marker-end]'))for(const attr of ['marker-start','marker-end']){
            const ref=e.getAttribute(attr);if(!ref)continue;
            const id=ref.match(/^url\(#(.+)\)$/)?.[1],target=id&&document.getElementById(id);
            if(!target||!e.ownerSVGElement.contains(target))throw Error('Marker escaped its SVG: '+ref);
            const fill=getComputedStyle(target.querySelector('path')).fill;
            if(!fill||fill==='none')throw Error('Invisible marker fill');
            references++;
          }
        }
        return {theme:document.documentElement.dataset.theme,switches:24,references};
      });
      if(result.theme!==theme)throw Error('Theme mismatch');cases.push(result);
    }
    fs.writeFileSync('qa/reports/round2-euv-markers.json',JSON.stringify({timestamp:new Date().toISOString(),cases,passed:true},null,2)+'\n');console.log(JSON.stringify(cases));
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
