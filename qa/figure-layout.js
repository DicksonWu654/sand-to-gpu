// Exercise every authored figure at reading-column widths; page sweep covers routing and the surrounding shell.
const fs=require('fs'),path=require('path');
const {launch}=require('./browser');
const {render}=require('../course/visuals/render');
const root=path.resolve(__dirname,'..');
const lessons=fs.readdirSync(path.join(root,'course/visuals/lessons')).filter(f=>f.endsWith('.json')).sort();
const styles=['styles.css','section-figures.css'].map(file=>fs.readFileSync(path.join(root,'site',file),'utf8').replace(/@import[^;]+;/g,'')).join('\n');
const html=lessons.map(file=>JSON.parse(fs.readFileSync(path.join(root,'course/visuals/lessons',file),'utf8')).map(f=>render(f,file.slice(0,-5))).join('')).join('');
(async()=>{const browser=await launch(),page=await browser.newPage(),cases=[],errors=[];
try{for(const width of [1280,375])for(const theme of ['light','dark']){
 await page.setViewport({width,height:900});
 await page.setContent(`<html data-theme="${theme}"><head><style>${styles}</style><style>body{display:block;padding:0 20px}main{width:100%;max-width:788px;margin:0 auto;padding:0}</style></head><body><main>${html}</main></body></html>`,{waitUntil:'domcontentloaded'});
 const result=await page.evaluate(()=>{
  let faults=[];const figures=[...document.querySelectorAll('.section-figure')];
  for(const f of figures){const key=f.dataset.sectionFigure;if(f.scrollWidth>f.clientWidth+1)faults.push(key+' figure overflow');for(const part of f.querySelectorAll('.sf-drawing,.sf-unit-copy,.sf-stack-labels li'))if(part.scrollWidth>part.clientWidth+1)faults.push(key+' component overflow');
   const stack=f.querySelector('.sf-stack');if(stack){const drawing=stack.querySelector('svg').getBoundingClientRect(),labels=[...stack.querySelectorAll('.sf-stack-labels li')];labels.forEach((li,i)=>{const r=li.getBoundingClientRect();const physical=drawing.y+drawing.height*(8+(i+.5)*90)/(labels.length*90+16);if(Math.abs(physical-(r.y+r.height/2))>12)faults.push(key+' layer label alignment');});}
  }
  const comparison=document.querySelector('.sf-count-3');if(comparison){const cells=[...comparison.children].map(e=>e.getBoundingClientRect());if(innerWidth>600&&Math.max(...cells.map(c=>c.y))-Math.min(...cells.map(c=>c.y))>1)faults.push('Three-way comparison does not share a row');if(innerWidth<=600&&Math.max(...cells.map(c=>c.x))-Math.min(...cells.map(c=>c.x))>1)faults.push('Phone comparison is not stacked');}
  return {figures:figures.length,theme:document.documentElement.dataset.theme,faults};
 });
 if(result.theme!==theme)result.faults.push('Rendered theme mismatch');
 for(const fault of result.faults)errors.push({width,theme,fault});cases.push({width,theme,figures:result.figures});
}}
finally{await browser.close();}
const report={checkedAt:new Date().toISOString(),figureCases:cases.reduce((n,c)=>n+c.figures,0),cases,errors};fs.writeFileSync(path.join(root,'qa/reports/figure-layout.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
