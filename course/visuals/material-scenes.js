// Physical teaching scenes for feedstock, crystal growth, and wafer finishing.
// Callout text stays in the responsive HTML key; SVG contains only numbered markers.
const names = new Set(['charge-bed', 'hot-zone', 'float-zone-section', 'suspended-crystal', 'lapping-section', 'damage-removal']);
function scene(name, marker) {
  const arrow = d => `<path d="${d}" class="sf-link" marker-end="url(#${marker})"/>`;
  const leader = d => `<path d="${d}" class="sf-fine"/>`;
  const badge = (x,y,n) => `<g class="sf-callout"><circle cx="${x}" cy="${y}" r="20"/><text x="${x}" y="${y+8}">${n}</text></g>`;
  if (name === 'charge-bed') {
    // Same material identity at every position; curved arrows use the empty channels.
    const rocks = [[206,96],[347,96],[488,96],[206,187],[347,187],[488,187],[206,278],[347,278],[488,278]];
    return {height:365, key:['Selected quartz lumps', 'Carbon reductant mixed into the charge', 'Open passages let reaction gas rise between solids'], art:
      `<path d="M146 45V313Q350 338 554 313V45" class="sf-vessel"/>` +
      rocks.map(([x,y],i)=>i%2===0 ? `<path d="M${x-26} ${y+15}l-4-28 25-17 29 14-5 28-23 6Z" class="sf-object"/>` : `<path d="M${x-26} ${y+13}l-6-23 20-15 31 7 10 25-29 10Z" class="sf-carbon"/>`).join('') +
      arrow('M274 311Q256 267 277 229T275 143Q259 100 276 46') + arrow('M418 311Q438 270 419 229T421 144Q438 100 422 46') +
      badge(76,96,1)+leader('M98 96H174')+badge(619,187,2)+leader('M597 187H522')+badge(619,301,3)+leader('M597 301 567 329H425L418 313')};
  }
  if (name === 'hot-zone') return {height:395,key:[
    'Silicon melt inside the vessel',
    'Quartz crucible contacts the melt and can contribute oxygen',
    'Graphite support and heater remain outside the quartz vessel',
    'Gas-phase transport provides a route from hot-zone materials back to the melt'
  ],art:`<path d="M173 162V289Q350 365 527 289V162H502V273Q350 335 198 273V162Z" class="sf-carbon"/>
    <path d="M198 153V273Q350 335 502 273V153H483V262Q350 314 217 262V153Z" class="sf-object"/>
    <path d="M217 202Q350 173 483 202V261Q350 314 217 261Z" class="sf-melt"/>
    <ellipse cx="350" cy="202" rx="133" ry="26" class="sf-melt"/>
    <path d="M318 38H382V192Q350 207 318 192Z" class="sf-crystal"/>
    <path d="M144 177V296M556 177V296" class="sf-electrode"/>
    ${arrow('M209 245H283')}${arrow('M554 171Q552 92 462 113Q433 132 438 174')}
    ${badge(350,269,1)}${badge(76,204,2)}${leader('M98 204H207')}${badge(621,260,3)}${leader('M599 260H565')}${badge(533,66,4)}${leader('M523 86 505 110')}`};
  if (name === 'float-zone-section') return {height:410,key:[
    'Polycrystalline feed rod above the molten zone',
    'RF induction coil surrounds the rod without touching it; shown in section',
    'The short molten zone joins the solid sections without a crucible',
    'A single crystal solidifies below as the zone advances relative to the rod'
  ],art:`<path d="M296 34H404V169H296Z" class="sf-object"/>
    <path d="M298 70 349 93 403 58M349 93 334 137 298 150M334 137 403 118" class="sf-fine"/>
    <path d="M296 169Q315 191 296 213H404Q385 191 404 169Z" class="sf-melt"/>
    <path d="M296 213H404V352H296Z" class="sf-crystal"/>
    <path d="M316 229V333M338 229V333M360 229V333M382 229V333M309 250H391M309 273H391M309 296H391M309 319H391" class="sf-material-line"/>
    <circle cx="256" cy="191" r="15" class="sf-melt"/><circle cx="444" cy="191" r="15" class="sf-melt"/>
    ${arrow('M633 274V115')}
    ${badge(197,80,1)}${leader('M219 80H294')}${badge(149,191,2)}${leader('M171 191H239')}${badge(577,246,3)}${leader('M555 246H471L403 205')}${badge(452,341,4)}${leader('M430 341H406')}`};
  if (name === 'suspended-crystal') return {height:410,key:[
    'Pull shaft and seed carry the suspended crystal',
    'A narrow Dash neck is the small cross-section in the load path',
    'The shoulder widens into the much heavier crystal body',
    'Weight acts downward; this sketch shows the neck carrying the load, without an auxiliary support'
  ],art:`<path d="M350 27V79" class="sf-electrode"/>
    <path d="M337 79H363V111H357V155L426 218V352Q350 381 274 352V218L343 155V111H337Z" class="sf-crystal"/>
    ${arrow('M510 244V339')}
    ${badge(243,55,1)}${leader('M265 55H341')}${badge(457,135,2)}${leader('M435 135H359')}${badge(186,259,3)}${leader('M208 259H272')}${badge(570,304,4)}${leader('M548 304H513')}`};
  if (name === 'lapping-section') return {height:325,key:[
    'Upper lapping plate',
    'Wafer faces meet abrasive slurry at both plates',
    'A thinner carrier holds the wafer laterally and moves it through the plates',
    'Lower lapping plate; this is the lapping arrangement, not a double-disk grinder'
  ],art:`<path d="M146 64H554V130H146ZM146 180H554V246H146Z" class="sf-object"/>
    <path d="M246 139H454V171H246Z" class="sf-crystal"/>
    <path d="M162 147H240V163H162ZM460 147H538V163H460Z" class="sf-carbon"/>
    ${[264,302,340,378,416,444].map(x=>`<circle cx="${x}" cy="134.5" r="3.5" class="sf-melt"/><circle cx="${x}" cy="175.5" r="3.5" class="sf-melt"/>`).join('')}
    ${arrow('M226 41H441')}${arrow('M467 270H252')}
    ${badge(617,98,1)}${leader('M595 98H556')}${badge(75,136,2)}${leader('M97 136H244')}${badge(619,165,3)}${leader('M597 165H539')}${badge(74,215,4)}${leader('M96 215H144')}`};
  if (name === 'damage-removal') return {height:325,key:[
    'Before etch: cracks extend into the silicon from the ground surface',
    'Removal depth reaches below the deepest illustrated crack',
    'After etch: the exposed surface is in sound silicon; both panels show the same material'
  ],art:`<path d="M72 130H303V269H72ZM409 207H640V269H409Z" class="sf-crystal"/>
    <path d="M90 130 109 153 103 181M144 130 158 152 148 176M205 130 194 151 216 181M265 130 248 148 263 171" class="sf-hot"/>
    <path d="M72 207H303" class="sf-fine" stroke-dasharray="7 5"/>
    ${arrow('M327 231H382')}
    <path d="M419 130H640M640 130V196" class="sf-fine" stroke-dasharray="5 5"/>
    ${badge(178,66,1)}${leader('M178 87V126')}${badge(39,207,2)}${leader('M61 207H72')}${badge(525,172,3)}${leader('M525 193V205')}`};
  throw Error('Unknown material scene '+name);
}
module.exports={scene,names};
