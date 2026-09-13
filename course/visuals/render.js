const fs = require('fs');
const path = require('path');
const inventory = require('./section-inventory.json');
const families = new Set(['flow','cycle','layers','branch','network','compare','scale','apparatus']);
const esc = s => String(s || '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Small material drawings are combined into different spatial relationships by each family.
function glyph(name, variant) {
 const aliases={
 'logic':'planar','power':'planar','defect':'void','contact':'via','floating-gate':'nand','vertical-channel':'3d-nand','select':'access',
 'gate':'gate','dielectric':'thin','isolation':'thin','charge-trap':'nand','capacitive':'capacitor','breakdown':'void','cross-section':'thin','high-k':'thin','tier-interface':'hybrid-bond','interface':'thin','narrow-interface':'narrow','wide-interface':'wide','superlattice':'superlattice','strained':'strain','source-drain':'source-drain',
 'line':'wide','bit-line':'wide','word-line':'narrow','word-lines':'comb','electrode':'narrow','interposer':'cowos-s','substrate':'substrate','bump':'microbump','bga':'microbump','bridge':'cowos-l','die-to-die':'cowos-s','fanout':'fan-out','connector':'socket','hybrid-pads':'hybrid-bond','leadframe':'leadframe','netlist':'network','parallel':'comb','scan-chain':'via-chain','switch':'network','sram':'sram','board':'substrate','socket':'socket',
 'backgrind':'thin','tsv':'via','via-trench':'damascene','replacement-gate':'gaa','selective-release':'released','subtractive':'anisotropic','dicing':'grid','finfet':'finfet','gaa':'gaa',
 'aligned':'aligned','offset':'offset','layout':'grid','pattern':'grid','reference':'aligned','reticle':'grid','euv':'reflective',
 'core':'substrate','mold':'mold','hbm':'hbm','panel':'substrate','sxm':'substrate','carrier':'substrate','cluster':'cluster','random':'random','edge':'edge','test':'grid','multi-site':'grid','round':'round','wafer-level':'round','warped':'warped',
 'instrument':'instrument','single-site':'probe','bright-field':'bright-field','dark-field':'dark-field','fiber':'wide','incident':'incident','scatter':'dark-field','gpu':'gpu','cpu':'cpu','harvest':'grid','large':'large','small':'small','logic-hbm':'cowos-s','3d-nand-stacked':'3d-nand','repair':'repair','thermal':'thermal','rack':'rack','server':'server','tray':'tray',
 };
 if(name==='clean'&&variant==='planar')variant='thin';
 variant=aliases[variant]||variant;
 if(variant==='polycrystal') {
  const domain=(xs,ys)=>`<path d="M${xs[0]} ${ys[0]}H${xs[2]}M${xs[0]} ${ys[1]}H${xs[2]}M${xs[0]} ${ys[2]}H${xs[2]}M${xs[0]} ${ys[0]}V${ys[2]}M${xs[1]} ${ys[0]}V${ys[2]}M${xs[2]} ${ys[0]}V${ys[2]}" class="sf-fine"/>`+xs.flatMap(x=>ys.map(y=>`<circle cx="${x}" cy="${y}" r="3"/>`)).join('');
  return domain([-38,-25,-12],[-25,0,25])+`<g transform="rotate(24 25 0)">${domain([12,25,38],[-25,0,25])}</g><path d="M0-39-4-20 3-4-3 16 2 39" class="sf-hot"/>`;
 }
 if(['lattice','dopant','impurity'].includes(variant)) {
  let out='<path d="M-28-28H28M-28 0H28M-28 28H28M-28-28V28M0-28V28M28-28V28" class="sf-fine"/>';
  for(const x of [-28,0,28])for(const y of [-28,0,28])out+=`<circle cx="${x}" cy="${y}" r="${x===0&&y===0&&variant==='dopant'?9:5}" class="${x===0&&y===0&&variant==='dopant'?'sf-accent':''}"/>`;
  if(variant==='impurity')out+='<circle cx="14" cy="14" r="8" class="sf-accent"/><path d="M10 10 18 18M18 10 10 18" class="sf-hot"/>';
  return out;
 }
 const variants={
 'tensile':'<path d="M-23-20H23V20H-23Z"/><path d="M-23 0H23M0-20V20" class="sf-fine"/><path d="M-26 0H-44M-37-7-44 0-37 7M26 0H44M37-7 44 0 37 7" class="sf-hot"/>',
 'compressive':'<path d="M-23-20H23V20H-23Z"/><path d="M-23 0H23M0-20V20" class="sf-fine"/><path d="M-44 0H-26M-33-7-26 0-33 7M44 0H26M33-7 26 0 33 7" class="sf-hot"/>',
 'mass-analyzer':'<path d="M-12-32H18V-14H-12ZM-12 14H18V32H-12Z"/><path d="M-42 0H-6Q19 0 26 24L34 42M28 31 34 42 38 31" class="sf-hot"/><path d="M6 0H43" class="sf-fine"/>',
 'cz-puller':'<path d="M-40-40H40V40H-40Z"/><path d="M-28 5V23Q0 38 28 23V5Z"/><path d="M-27 10Q0 22 27 10" class="sf-hot"/><path d="M-9-23H9V10H-9ZM0-40V-23M-34 0V28M34 0V28"/><path d="M22-13V-34M16-27 22-34 28-27" class="sf-hot"/>',
 'float-zone':'<path d="M-10-40H10V-7H-10ZM-10 7H10V40H-10Z"/><path d="M-10-7Q-17 0-10 7H10Q17 0 10-7Z" class="sf-hot"/><ellipse cx="0" cy="0" rx="29" ry="9"/><path d="M38 25V-25M32-18 38-25 44-18" class="sf-hot"/>',
 'tube-furnace':'<path d="M-42-24H42V24H-42Z"/><path d="M-47-12H47V12H-47Z"/><path d="M-25-10V10M-15-10V10M-5-10V10M5-10V10M15-10V10M25-10V10"/><path d="M-35-30H35M-35 30H35" class="sf-hot"/>',
 'plasma-chamber':'<path d="M-40-35H40V35H-40Z"/><path d="M-30-23H30V-13H-30ZM-30 18H30V27H-30Z"/><path d="M-24-3-18 7-12-3-6 7 0-3 6 7 12-3 18 7 24-3M0-45V-35M0 35V45" class="sf-hot"/>',
 'fbr':'<path d="M-26-39H26V29L10 39H-10L-26 29ZM-26 21H26"/><circle cx="-12" cy="9" r="4"/><circle cx="8" cy="5" r="4"/><circle cx="-3" cy="-7" r="4"/><circle cx="13" cy="-20" r="4"/><circle cx="-13" cy="-26" r="4"/><path d="M0 44V24M-7 31 0 24 7 31M0-34V-45" class="sf-hot"/>',
 'packed-bed':'<path d="M-35-30-12-34-8-14-30-10ZM4-34 30-29 35-10 12-8ZM-37 4-14-4-4 15-23 29ZM13 4 34 10 28 33 7 29Z"/><path d="M-5 39 2 18-5 2 1-15-2-39M-8-31-2-39 4-32" class="sf-hot"/>',
 'carbon':'<path d="M-36 22-29-12-4-29 27-18 37 16 10 29Z"/><path d="M-25 0 2-21M-22 14 19-18M-11 26 31-7M8 25 30 9" class="sf-fine"/>',

 'superlattice':'<path d="M-37-31H37V-19H-37ZM-37-5H37V7H-37ZM-37 21H37V33H-37Z"/><path d="M-37-18H37V-6H-37ZM-37 8H37V20H-37Z" class="sf-accent"/>',
 'source-drain':'<path d="M-40 7H40V32H-40Z"/><path d="M-33 0H-13V18H-33ZM13 0H33V18H13Z" class="sf-accent"/><path d="M-23-24V0M23-24V0"/>',
 'source':'<path d="M-38 2H38V30H-38Z"/><path d="M-28 2H-2V18H-28Z" class="sf-accent"/><path d="M-15-28V2M-3 11H30M21 4 30 11 21 18" class="sf-hot"/>',
 'drain':'<path d="M-38 2H38V30H-38Z"/><path d="M2 2H28V18H2Z" class="sf-accent"/><path d="M15 2V-28M-30 11H2M-7 4 2 11-7 18" class="sf-hot"/>',
 'channel':'<path d="M-38 2H38V30H-38Z"/><path d="M-28 4H28V11H-28Z" class="sf-accent"/><path d="M-33-10H33M24-17 33-10 24-3" class="sf-hot"/>',
 'gate':'<path d="M-33 15H33V32H-33Z"/><path d="M-19-23H19V5H-19Z" class="sf-accent"/><path d="M-24 9H24M-12 5V15M0 5V15M12 5V15" class="sf-hot"/>',
 'access':'<path d="M-38 5H-9M9 5H38M-9-12V20M9-12V20M0-12V-32M-9 5 9-5"/>',
 'capacitor':'<path d="M-38 0H-7M7 0H38M-7-25V25M7-25V25"/><path d="M-22-15H-12M-17-20V-10M13 15H23" class="sf-hot"/>',
 'sense-amplifier':'<path d="M-24-27 25 0-24 27ZM-40-12H-24M-40 12H-24M25 0H40"/><path d="M-18-12H-8M-13-17V-7M-18 12H-8" class="sf-hot"/>',
 'cmos':'<path d="M-15-30H15V-11H-15ZM-15 11H15V30H-15Z" class="sf-accent"/><path d="M0-40V-30M0-11V11M0 30V40M-36 0H-23V-20H-15M-23 0V20H-15M0 0H36"/>',
 'thin':'<path d="M-42-2H42V8H-42ZM-42 13H42V33H-42Z"/><path d="M-36 3H36" class="sf-hot"/>',
 'strain':'<path d="M-27-25H27V25H-27Z"/><path d="M-27-12H27M-27 0H27M-27 12H27M-14-25V25M0-25V25M14-25V25" class="sf-fine"/><path d="M-45 0H-30M-37-7-30 0-37 7M45 0H30M37-7 30 0 37 7" class="sf-hot"/>',
 'pvd':'<path d="M-40-32H40M-40 2H-13V32H13V2H40"/><path d="M-30-26V-3M-20-26-13-3M0-26V24M20-26 13-3M30-26V-3" class="sf-hot"/><path d="M-40-3H-13M13-3H40" class="sf-accent"/>',
 'cvd':'<path d="M-40 2H-13V32H13V2H40"/><path d="M-40-4H-18V26H18V-4H40" class="sf-hot"/><circle cx="-25" cy="-21" r="3"/><circle cx="0" cy="-12" r="3"/><circle cx="25" cy="-21" r="3"/>',
 'ald':'<path d="M-40 2H-13V32H13V2H40"/><path d="M-40-3H-18V27H18V-3H40" class="sf-hot"/><path d="M-40-8H-23V22H23V-8H40" class="sf-fine"/><circle cx="-30" cy="-23" r="3"/><circle cx="30" cy="-23" r="3"/>',
 'anisotropic':'<path d="M-40 3H-12V31H12V3H40V39H-40Z"/><path d="M-40-3H-16M16-3H40" class="sf-accent"/><path d="M0-32V21M-6 15 0 21 6 15" class="sf-hot"/>',
 'isotropic':'<path d="M-40 3H-12C-38 10-32 32 0 33C32 32 38 10 12 3H40V39H-40Z"/><path d="M-40-3H-16M16-3H40" class="sf-accent"/><path d="M0-32V9M0 9-22 18M0 9 22 18" class="sf-hot"/>',
 'deep-hole':'<path d="M-38-36H-7V33H7V-36H38V40H-38Z"/><path d="M0-36V23" class="sf-hot"/>',
 'released':'<path d="M-30-23H30V-13H-30ZM-30-3H30V7H-30ZM-30 17H30V27H-30Z"/><path d="M-42-8H-33M-42 12H-33M33-8H42M33 12H42" class="sf-hot"/>',
 'damascene':'<path d="M-40-28H40V34H-40Z"/><path d="M-26-28H26V-5H7V27H-7V-5H-26Z" class="sf-accent"/>',
 'airgap':'<path d="M-40-20H-19V27H-40ZM19-20H40V27H19Z"/><path d="M-19-20Q0-38 19-20M-19 27H19"/><path d="M-9-4H9M-9 10H9" class="sf-fine"/>',
 'stochastic':'<path d="M-36-25-10-25-15-15-7-3-14 8-9 26H-36ZM9-25H36V26H10L15 12 8 1 14-12Z"/>',
 'via-chain':'<path d="M-40-20H-22V20H-4V-20H14V20H32V-20H42" class="sf-hot"/><path d="M-38-26H-18M-8 26H18M28-26H42"/>',
 'fan-out':'<path d="M-20-28H20V-6H-20Z" class="sf-accent"/><path d="M-15-6V5L-37 23V34M-5-6V13L-14 23V34M5-6V13L14 23V34M15-6V5L37 23V34"/>',
 'microbump':'<path d="M-40-25H40V-11H-40ZM-40 11H40V25H-40Z"/><circle cx="-25" cy="0" r="7" class="sf-accent"/><circle cx="0" cy="0" r="7" class="sf-accent"/><circle cx="25" cy="0" r="7" class="sf-accent"/>',
 'substrate':'<path d="M-40-20H40V25H-40Z"/><path d="M-40-8H-14V12H16V-8H40M-30-20V-8M30-8V25" class="sf-hot"/>',
 'leadframe':'<path d="M-18-15H18V15H-18Z" class="sf-accent"/><path d="M-40-12H-18M-40 0H-18M-40 12H-18M18-12H40M18 0H40M18 12H40"/>',
 'socket':'<path d="M-36-28H36V28H-36Z"/><path d="M-23-16H23V16H-23Z" class="sf-accent"/><path d="M-30-36V-28M-15-36V-28M0-36V-28M15-36V-28M30-36V-28"/>',
 'network':'<circle cx="0" cy="0" r="11"/><circle cx="-31" cy="-26" r="8"/><circle cx="31" cy="-26" r="8"/><circle cx="-31" cy="26" r="8"/><circle cx="31" cy="26" r="8"/><path d="M-25-20-8-7M25-20 8-7M-25 20-8 7M25 20 8 7"/>',
 'grid':'<path d="M-35-30H35V30H-35Z"/><path d="M-18-30V30M0-30V30M18-30V30M-35-10H35M-35 10H35"/>',
 'aligned':'<path d="M-35-25H5V15H-35Z"/><path d="M-25-15H-5V5H-25Z" class="sf-accent"/><path d="M-15-38V28M-45-5H20" class="sf-fine"/>',
 'offset':'<path d="M-35-25H5V15H-35Z"/><path d="M-10-2H10V18H-10Z" class="sf-accent"/><path d="M-15-38V28M-45-5H20" class="sf-fine"/>',
 'reflective':'<path d="M-40 12H40V25H-40Z"/><path d="M-32-31 0 12 32-31" class="sf-hot"/>',
 'mold':'<path d="M-40-22H40V30H-40Z"/><path d="M-25 4H25V21H-25Z" class="sf-accent"/>',
 'mr-muf':'<path d="M-36-24H36V-5H-36ZM-36 8H36V27H-36Z"/><path d="M-42-30H42V33H-42Z" class="sf-fine"/><path d="M-30 1H30" class="sf-hot"/>',
 'tc-ncf':'<path d="M-36-24H36V-5H-36ZM-36 8H36V27H-36Z"/><path d="M-36-1H36V5H-36Z" class="sf-accent"/><path d="M-20-42V-29M0-42V-29M20-42V-29" class="sf-hot"/>',
 'round':'<circle cx="0" cy="0" r="35"/><path d="M-29 19H29" class="sf-fine"/>',
 'random':'<circle cx="0" cy="0" r="35"/><circle cx="-12" cy="-19" r="4" class="sf-accent"/><circle cx="21" cy="3" r="4" class="sf-accent"/><circle cx="-8" cy="15" r="4" class="sf-accent"/>',
 'cluster':'<circle cx="0" cy="0" r="35"/><circle cx="-12" cy="-12" r="4"/><circle cx="-1" cy="-18" r="4"/><circle cx="-18" cy="-1" r="4"/><circle cx="-7" cy="0" r="4"/>',
 'edge':'<circle cx="0" cy="0" r="35"/><circle cx="0" cy="0" r="27" class="sf-hot"/>',
 'warped':'<path d="M-43 5Q0-26 43 5V17Q0-14-43 17Z"/>',
 'cantilever':'<path d="M-36-28H36V-12H-36Z"/><path d="M-27-12-10 10 0 23M-10-12 7 10 17 23M7-12 24 10 34 23M-40 29H40" class="sf-hot"/>',
 'vertical':'<path d="M-36-28H36V-12H-36Z"/><path d="M-25-12V23M-8-12V23M8-12V23M25-12V23M-40 29H40" class="sf-hot"/>',
 'mems':'<path d="M-36-28H36V-12H-36Z"/><path d="M-25-12-20-3-30 7-20 17-25 23M0-12 5-3-5 7 5 17 0 23M25-12 30-3 20 7 30 17 25 23M-40 29H40" class="sf-hot"/>',
 'instrument':'<path d="M-38-29H38V30H-38Z"/><path d="M-28-18H15V8H-28Z" class="sf-accent"/><path d="M-23 0-14-7-6 2 9-10M-28 18H8"/><circle cx="25" cy="-5" r="4"/><circle cx="25" cy="16" r="4"/>',
 'bright-field':'<path d="M-35-30 0 20 35-30M-40 25H40" class="sf-hot"/><path d="M20-36H40V-22H20Z"/>',
 'dark-field':'<path d="M-35-30 0 20 35-30M0 20 40 0M-40 25H40" class="sf-hot"/><path d="M25-8H43V8H25Z"/>',
 'incident':'<path d="M-30-33 0 15M-40 25H40M-10 8 0 15-3 3" class="sf-hot"/>',
 'gpu':'<path d="M-35-30H35V30H-35Z"/><path d="M-27-22H-13V-8H-27ZM-7-22H7V-8H-7ZM13-22H27V-8H13ZM-27 1H-13V15H-27ZM-7 1H7V15H-7ZM13 1H27V15H13Z" class="sf-accent"/>',
 'cpu':'<path d="M-35-30H35V30H-35Z"/><path d="M-25-20H-3V2H-25ZM3-20H25V2H3ZM-25 10H25V22H-25Z" class="sf-accent"/>',
 'large':'<path d="M-38-31H38V31H-38Z" class="sf-accent"/>',
 'small':'<path d="M-19-15H19V15H-19Z" class="sf-accent"/>',
 '3d-dram':'<path d="M-38-28H38M-38 0H38M-38 28H38M-15-28V-18M-21-18H-9M-21-12H-9M-15 0V10M-21 10H-9M-21 16H-9M15-28V-18M9-18H21M9-12H21M15 0V10M9 10H21M9 16H21"/>',
 'repair':'<path d="M-35-30H35V30H-35ZM-15-30V30M5-30V30M-35-10H35M-35 10H35"/><path d="M17-26H30V26H17Z" class="sf-accent"/>',
 'sram':'<path d="M-25-25 0 0-25 25ZM25-25 0 0 25 25ZM-38 0H-25M25 0H38M-12-15H12M-12 15H12"/>',
 'thermal':'<path d="M-35 20H35V30H-35Z"/><path d="M-20 14Q-35-1-20-16M0 14Q-15-1 0-16M20 14Q5-1 20-16" class="sf-hot"/>',
 'server':'<path d="M-42-18H42V18H-42Z"/><path d="M-32-8H12V8H-32Z"/><circle cx="28" cy="0" r="5"/>',
 'tray':'<path d="M-40-15H40V15H-40ZM-28-8H-8V8H-28ZM8-8H28V8H8Z"/>',
 'rack':'<path d="M-27-38H27V38H-27ZM-20-28H20V-13H-20ZM-20-7H20V8H-20ZM-20 14H20V29H-20Z"/>',

 'planar':'<path d="M-40 14H40V34H-40Z"/><path d="M-12-18H12V8H-12Z" class="sf-accent"/><path d="M-35 9H-16V21H-35ZM16 9H35V21H16Z"/><path d="M-12 10H12" class="sf-hot"/>',
 'finfet':'<path d="M-40 27H40V36H-40Z"/><path d="M-5-25H8V27H-5Z"/><path d="M-27 17V-15H-10V10H13V-15H30V17Z" class="sf-accent"/>',
 'gaa':'<rect x="-33" y="-32" width="66" height="64" rx="12" class="sf-accent"/><rect x="-24" y="-24" width="48" height="12" rx="5"/><rect x="-24" y="-5" width="48" height="12" rx="5"/><rect x="-24" y="14" width="48" height="12" rx="5"/>',
 'forksheet':'<rect x="-39" y="-30" width="33" height="60" rx="7" class="sf-accent"/><rect x="6" y="-30" width="33" height="60" rx="7" class="sf-accent"/><path d="M-2-38H2V38H-2Z"/><path d="M-33-17H-12V-9H-33ZM12-17H33V-9H12ZM-33 9H-12V17H-33ZM12 9H33V17H12Z"/>',
 'cfet':'<rect x="-32" y="-38" width="64" height="31" rx="7" class="sf-accent"/><rect x="-32" y="7" width="64" height="31" rx="7"/><path d="M-22-27H22V-18H-22ZM-22 18H22V27H-22Z"/><path d="M0-7V7" class="sf-hot"/>',
 'backside-power':'<path d="M-40-30H40M-30-20H15V-30M-40 17H40V25H-40Z"/><path d="M-12-10H12V11H-12Z" class="sf-accent"/><path d="M-35 38H35M-24 38V9M24 38V9" class="sf-hot"/>',
 'dram':'<path d="M-38-20H38M-20-20V-3M-29-3H-11M-20 3V19H10M10 7V31M18 7V31M18 19H37"/><path d="M-33 1H-28V13H-33" class="sf-accent"/>',
 'nand':'<path d="M-40 21H40V34H-40Z"/><path d="M-23-30H23V-15H-23Z" class="sf-accent"/><path d="M-23-6H23V7H-23Z"/><circle cx="-12" cy="0" r="2"/><circle cx="0" cy="0" r="2"/><circle cx="12" cy="0" r="2"/><path d="M-34 16H-24V25H-34ZM24 16H34V25H24Z"/>',
 '3d-nand':'<path d="M-36-29H36V-18H-36ZM-36-8H36V3H-36ZM-36 13H36V24H-36Z"/><rect x="-9" y="-40" width="18" height="78" rx="8" class="sf-accent"/><path d="M0-40V38" class="sf-hot"/>',
 'hbm':'<path d="M-32 18H32V33H-32ZM-32-2H32V13H-32ZM-32-22H32V-7H-32Z"/><path d="M-20-29V33M0-29V33M20-29V33" class="sf-hot"/>',
 'wire-bond':'<path d="M-42 23H42V33H-42ZM-20 7H20V23H-20Z"/><path d="M-12 7Q-30-32-35 23M12 7Q30-32 35 23" class="sf-hot"/>',
 'flip-chip':'<path d="M-40 22H40V32H-40ZM-29-20H29V2H-29Z"/><path d="M-20 2V22M-7 2V22M7 2V22M20 2V22" class="sf-hot"/>',
 'cowos-s':'<path d="M-43 23H43V34H-43ZM-40 6H40V16H-40Z"/><path d="M-36-15H-4V6H-36ZM10-28H35V6H10Z" class="sf-accent"/><path d="M-30 11H30M-22 16V23M22 16V23" class="sf-hot"/>',
 'cowos-r':'<path d="M-43 23H43V34H-43ZM-40 6H40V16H-40Z"/><path d="M-36-15H-4V6H-36ZM10-28H35V6H10Z" class="sf-accent"/><path d="M-30 8H-10V14H10V8H30M-25 14V23M25 14V23" class="sf-hot"/>',
 'cowos-l':'<path d="M-43 23H43V34H-43ZM-40 6H40V16H-40Z"/><path d="M-36-15H-4V6H-36ZM10-28H35V6H10Z" class="sf-accent"/><path d="M-14 5H20V13H-14Z"/><path d="M-10 9H15M-27 16V23M27 16V23" class="sf-hot"/>',
 'hybrid-bond':'<path d="M-36-28H36V-2H-36ZM-36 2H36V28H-36Z"/><path d="M-24-7H-14V7H-24ZM-5-7H5V7H-5ZM14-7H24V7H14Z" class="sf-accent"/>',
 'wide':'<path d="M-40-17H40V17H-40Z"/><path d="M-33 0H33" class="sf-hot"/>',
 'narrow':'<path d="M-40-5H40V5H-40Z"/><path d="M-33 0H33" class="sf-hot"/>',
 'via':'<path d="M-40-25H15V-15H-40ZM-15 15H40V25H-15ZM-5-15H5V15H-5Z" class="sf-accent"/>',
 'liner':'<path d="M-35-25H35V30H-35Z"/><path d="M-25-25H25V20H-25Z" class="sf-accent"/><path d="M-20-25H20V15H-20Z"/>',
 'void':'<path d="M-40-15H40V15H-40Z"/><path d="M-7-15 0-4-5 8-3 15H6L12 4 6-8 9-15" class="sf-accent"/>',
 'hillock':'<path d="M-40-10H-12L-7-28 4-35 13-10H40V17H-40Z"/>',
 'comb':'<path d="M-38-26H38M-30-26V12M-10-26V12M10-26V12M30-26V12M-38 26H38M-20 26V-12M0 26V-12M20 26V-12"/>',
 'frontside':'<path d="M-40-25H40M-40-12H40M-40 20H40V32H-40Z"/><path d="M-20-25V14M20-25V14" class="sf-hot"/>',
 'backside':'<path d="M-40-25H40M-40 8H40V20H-40Z"/><path d="M-40 35H40M-20 35V8M20 35V8" class="sf-hot"/>',
 'optical':'<path d="M-35-30 0 18 35-30M-40 25H40"/><ellipse cx="0" cy="-12" rx="24" ry="6" class="sf-accent"/>',
 'electron':'<path d="M-17-36H17V-12H-17ZM-40 25H40"/><path d="M0-12V18M-8 10 0 18 8 10" class="sf-hot"/>',
 'probe':'<path d="M-38 20H38V31H-38ZM-26-30H26V-13H-26Z"/><path d="M-17-13V20M0-13V20M17-13V20" class="sf-hot"/>'
 };
 if(variant && variants[variant]) return variants[variant];
 if(variant) throw Error('Unknown diagram variant '+name+':'+variant);
 const wafer='<ellipse cx="0" cy="4" rx="38" ry="19"/><path d="M-32-5 21 21M-20-12 33 13M-6-15 37 3M-33 12 13-14M-19 20 29-8" class="sf-fine"/>';
 const shapes={
 wafer, material:'<path d="M-36 21-29-12-4-29 27-18 37 16 10 29Z"/><path d="m-29-12 28 18 28-24M-1 6 10 29" class="sf-fine"/>',
 crystal:'<path d="M-17-34 17-34 23-20 23 22 12 34-12 34-23 22-23-20Z"/><path d="M-17-34-12-20-12 26M17-34 12-20 12 26M-23-20H23" class="sf-fine"/>',
 furnace:'<path d="M-39-20H39V31H-39Z"/><path d="M-24-35V2M0-35V2M24-35V2"/><path d="M-31 13Q-15-2 0 13T31 13V23H-31Z" class="sf-hot"/>',
 gas:'<path d="M-32 30V-17Q-32-27-20-27H20Q32-27 32-17V30Z"/><path d="M-12-27V-36H12V-27M-25 0H25"/><circle cx="-12" cy="12" r="3"/><circle cx="6" cy="20" r="3"/><circle cx="19" cy="8" r="3"/>',
 mask:'<rect x="-39" y="-25" width="78" height="50"/><path d="M-28-15H-10V4H6V-15H27V15H10V4H-8V15H-28Z" class="sf-solid"/>',
 light:'<path d="M-40-25 0 22 40-25M-40 0H40M-34 29H34"/><path d="m-12-11 12 33 12-33" class="sf-hot"/>',
 film:'<path d="M-40 6 0-10 40 6 0 22Z"/><path d="M-40-7 0-23 40-7 0 9Z" class="sf-accent"/><path d="M-40 6V15L0 31 40 15V6"/>',
 etch:'<path d="M-40 9H-13V27H13V9H40V34H-40Z"/><path d="M-35 2H-18M18 2H35" class="sf-accent"/><path d="M-7-30V17M7-30V17M-13 9-7 17-1 9M1 9 7 17 13 9" class="sf-hot"/>',
 transistor:'<path d="M-40 14H40V34H-40Z"/><path d="M-10-20H10V9H-10Z" class="sf-accent"/><path d="M-35 9H-15V20H-35ZM15 9H35V20H15Z"/><path d="M-26-19V9M26-19V9M-10 9H10"/>',
 wires:'<path d="M-40-19H-10V6H20V-19H40M-40 24H0V-4H40"/><circle cx="-10" cy="6" r="5"/><circle cx="0" cy="24" r="5"/><circle cx="20" cy="-19" r="5"/>',
 memory:'<path d="M-32 18H32V33H-32ZM-32-2H32V13H-32ZM-32-22H32V-7H-32Z"/><path d="M-20-29V33M0-29V33M20-29V33" class="sf-hot"/>',
 package:'<path d="M-43 8 0-10 43 8 0 26Z"/><path d="M-24-18 0-29 24-18V2L0 13-24 2Z" class="sf-accent"/><path d="M-32 24V33M-16 29V38M0 33V42M16 29V38M32 24V33"/>',
 test:'<path d="M-38 20H38V31H-38ZM-26-30H26V-13H-26Z"/><path d="M-17-13V10M0-13V10M17-13V10"/><path d="m-20 20 12 0m0 0 0-5m16 5h12" class="sf-hot"/>',
 rack:'<rect x="-27" y="-37" width="54" height="74"/><path d="M-20-25H20V-10H-20ZM-20-3H20V12H-20ZM-20 19H20V30H-20Z"/><path d="M-12-17H2M-12 5H2M-12 25H2" class="sf-hot"/>',
 chip:'<rect x="-25" y="-25" width="50" height="50"/><rect x="-14" y="-14" width="28" height="28" class="sf-accent"/><path d="M-38-15H-25M-38 0H-25M-38 15H-25M25-15H38M25 0H38M25 15H38M-15-38V-25M0-38V-25M15-38V-25M-15 25V38M0 25V38M15 25V38"/>',
 clean:'<path d="M-38-26H38V-14H-38ZM-38 28H38"/><path d="M-24-5V16M0-5V16M24-5V16M-30 10-24 16-18 10M-6 10 0 16 6 10M18 10 24 16 30 10" class="sf-hot"/>',
 design:'<rect x="-34" y="-29" width="68" height="58"/><path d="M-25-16H-5V2H15V17H26M-25 18H-10V-16H24M7-29V-16"/>',
 queue:'<path d="M-40-20H-22V20H-40ZM-14-20H4V20H-14ZM12-20H30V20H12Z"/><path d="M-40 30H38M32 24 38 30 32 36" class="sf-hot"/>',
 heat:'<path d="M-37 27H37V36H-37Z"/><path d="M-22 16C-5 0-36-3-20-24M0 16C17 0-14-3 2-24M22 16C39 0 8-3 24-24" class="sf-hot"/>'
 };
 return shapes[name] || shapes.chip;
}
function load(track,n) {
 const file=path.join(__dirname,'lessons',`${track}${String(n).padStart(2,'0')}.json`);
 return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):[];
}
function validate(figs, lesson) {
 const ids = new Set();
 for(const f of figs) {
  if(ids.has(f.section)) throw Error('Duplicate figure '+f.section);
  ids.add(f.section);
  if(!lesson.sections.some(s=>s.id===f.section)) throw Error('Unknown section '+f.section);
  if(!families.has(f.family)||!f.title||!f.caption||!Array.isArray(f.nodes)||f.nodes.length<2||f.nodes.length>6) throw Error('Invalid figure '+f.section);
  for(const n of f.nodes) { if(!n.label||!n.detail) throw Error('Unexplained figure node '+f.section); glyph(n.glyph,n.variant); }
  for(const e of f.edges||[]) if(!f.nodes[e.from]||!f.nodes[e.to]) throw Error('Invalid figure edge '+f.section);
  if(f.family==='network'&&!f.edges?.length) throw Error('Network requires authored edges '+f.section);
 }
}
function render(f,key) {
 const count=f.nodes.length, id=`fig-${key}-${f.section}`, marker=`${id}-arrow`;
 const arrow=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" class="sf-link" marker-end="url(#${marker})"/>`;
 const draw=(n,i,x,y,scale=1.35)=>`<g transform="translate(${x},${y}) scale(${scale})" class="sf-object sf-object-${i%4}">${glyph(n.glyph,n.variant)}</g><text x="${x}" y="${y+68}" class="sf-number">${i+1}</text>`;
 let art='',height=220;
 if(f.family==='layers') {
  height=count*83+48;
  const wiring=f.nodes.filter(n=>n.glyph==='wires').length>=3;
  f.nodes.forEach((n,i)=>{const y=24+i*83;art+=`<g class="sf-object sf-object-${i%4}"><path d="M80 ${y+12}L340 ${y} 620 ${y+12} 360 ${y+32}Z"/><path d="M80 ${y+12}V${y+47}L360 ${y+67} 620 ${y+47}V${y+12}L360 ${y+32}Z"/><path d="M130 ${y+32}L360 ${y+49} 570 ${y+32}" class="sf-fine"/></g><g transform="translate(348,${y+28}) scale(.47)" class="sf-object">${wiring?'':glyph(n.glyph,n.variant)}</g>${wiring?`<path d="M135 ${y+18}L330 ${y+31} 450 ${y+13}M215 ${y+11}L460 ${y+28} 550 ${y+17}" class="sf-hot"/>${i<count-1?`<path d="M330 ${y+31}V${y+114}M460 ${y+28}V${y+111}" class="sf-via"/>`:''}`:''}<text x="665" y="${y+45}" class="sf-number">${i+1}</text>`;});
 } else if(f.family==='scale') {
  height=360;
  f.nodes.forEach((n,i)=>{let x=36+i*58,y=28+i*39,w=628-i*112,h=292-i*48;art+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="sf-boundary sf-object-${i%4}"/><text x="${x+20}" y="${y+32}" class="sf-number">${count-i}</text>`;});
  art+=`<g transform="translate(355,220) scale(.7)" class="sf-object">${glyph(f.nodes[0].glyph,f.nodes[0].variant)}</g>`;
 } else if(f.family==='branch') {
  height=Math.max(260,(count-1)*100);let cy=height/2;
  f.nodes.slice(0,-1).forEach((n,i)=>{let y=55+i*(height-110)/Math.max(1,count-2);art+=arrow(210,y,495,cy)+draw(n,i,135,y,.65);});
  art+=draw(f.nodes[count-1],count-1,565,cy,1.1);
 } else if(f.family==='network') {
  height=370;let pts=f.nodes.map((n,i)=>({x:350+235*Math.cos(-Math.PI/2+i*2*Math.PI/count),y:165+115*Math.sin(-Math.PI/2+i*2*Math.PI/count)}));
  (f.edges||[]).forEach(e=>{let a=pts[e.from],b=pts[e.to],d=Math.hypot(b.x-a.x,b.y-a.y),dx=(b.x-a.x)/d,dy=(b.y-a.y)/d;art+=arrow(a.x+dx*48,a.y+dy*48,b.x-dx*52,b.y-dy*52);});
  pts.forEach((p,i)=>art+=draw(f.nodes[i],i,p.x,p.y,.7));
 } else {
  const gap=600/count, pts=f.nodes.map((n,i)=>({x:50+gap*(i+.5),y:90}));
  if(f.family==='apparatus') {height=260;art+='<path d="M24 182H676M48 184V205M652 184V205" class="sf-platform"/>';}
  if(f.family!=='compare') pts.slice(0,-1).forEach((p,i)=>art+=arrow(p.x+(count>4?44:59),p.y,pts[i+1].x-(count>4?44:59),p.y));
  if(f.family==='compare') pts.slice(1).forEach(p=>art+=`<path d="M${p.x-gap/2} 20V185" class="sf-divider"/>`);
  if(f.family==='cycle') {height=270;art+=`<path d="M${pts[count-1].x} 173V225H${pts[0].x}V173" class="sf-link" marker-end="url(#${marker})"/>`;}
  pts.forEach((p,i)=>art+=draw(f.nodes[i],i,p.x,p.y, count>4?1:1.35));
 }
 const terminalVariants=f.nodes.map(n=>n.variant);
 if(['source','gate','channel','drain'].every(v=>terminalVariants.includes(v))) {
  height=350;
  const number=v=>terminalVariants.indexOf(v)+1;
  art=`<g class="sf-object"><path d="M70 176H630V296H70Z"/><path d="M105 159H241V225H105ZM459 159H595V225H459Z" class="sf-accent"/><path d="M273 68H427V139H273Z" class="sf-accent"/><path d="M257 148H443V159H257Z"/><path d="M241 179H459V193H241Z" class="sf-accent"/><path d="M172 103V159M527 103V159M350 30V68"/><path d="M173 206H526M509 194 526 206 509 218M295 160V175M350 160V175M405 160V175" class="sf-hot"/></g><text x="172" y="142" class="sf-number">${number('source')}</text><text x="350" y="114" class="sf-number">${number('gate')}</text><text x="350" y="249" class="sf-number">${number('channel')}</text><text x="527" y="142" class="sf-number">${number('drain')}</text>`;
 }
 const individual=['compare','apparatus'].includes(f.family);
 const drawing=individual?`<div class="sf-comparison ${f.family==='apparatus'?'sf-sequence':''}">${f.nodes.map((n,i)=>`<div class="sf-unit"><svg viewBox="-58 -52 116 108" role="img" aria-label="${esc(n.label+': '+n.detail)}"><g class="sf-object sf-object-${i%4}">${glyph(n.glyph,n.variant)}</g></svg><span class="sf-direct-label">${i+1}. ${esc(n.label)}</span></div>`).join('')}</div>`:`<svg viewBox="0 0 700 ${height}" role="img" aria-labelledby="${id}-svg-title ${id}-desc"><title id="${id}-svg-title">${esc(f.title)}</title><desc id="${id}-desc">${esc(f.caption)} ${f.nodes.map((n,i)=>`${i+1}. ${esc(n.label)}: ${esc(n.detail)}`).join(' ')}</desc><defs><marker id="${marker}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6" class="sf-arrowhead"/></marker></defs>${art}</svg>`;
 const relation=(f.edges||[]).filter(e=>e.label).map(e=>`<li><span>${esc(f.nodes[e.from].label)} → ${esc(f.nodes[e.to].label)}</span> ${esc(e.label)}</li>`).join('');
 return `<figure class="section-figure sf-${f.family}" data-section-figure="${esc(f.section)}" aria-labelledby="${id}-title"><div class="sf-eyebrow">VISUAL EXPLANATION · ${esc(f.family==='layers'?'CROSS-SECTION':f.family.toUpperCase())}</div><h3 id="${id}-title" class="sf-title">${esc(f.title)}</h3><div class="sf-drawing">${drawing}</div><ol class="sf-legend">${f.nodes.map(n=>`<li><strong>${esc(n.label)}</strong><span>${esc(n.detail)}</span></li>`).join('')}</ol>${relation?`<ul class="sf-relations">${relation}</ul>`:''}<figcaption>${esc(f.caption)}${f.note?` <span class="sf-note">${esc(f.note)}</span>`:''}</figcaption></figure>`;
}
function insertAfterOpening(html, headingEnd, sectionEnd, content) {
 const body=html.slice(headingEnd,sectionEnd);
 // Only an opening paragraph belongs before the visual. Avoid reaching through subheadings into unrelated explanations.
 const p=body.match(/^\s*(?:<p\b[^>]*>[\s\S]*?<\/p>)/);
 const at=headingEnd+(p?p[0].length:0);
 return html.slice(0,at)+'\n'+content+'\n'+html.slice(at);
}
function apply(html,track,n) {
 const lesson=inventory.find(l=>l.track===track&&l.lesson===n);
 const figs=load(track,n);validate(figs,lesson);
 for(const f of figs) {
  const re=new RegExp(`<h2 id="${f.section}">[\\s\\S]*?<\\/h2>`),m=html.match(re);
  if(!m) throw Error('Figure heading missing '+f.section);
  const end=m.index+m[0].length, next=html.slice(end).search(/<h2\b/);
  html=insertAfterOpening(html,end,next<0?html.length:end+next,render(f,`${track}${n}`));
 }
 return {html,count:figs.length};
}
function coverage(strict=false) {
 const lessons=inventory.map(l=>{const f=load(l.track,l.lesson);validate(f,l);return {track:l.track,lesson:l.lesson,expected:l.sections.length,actual:f.length,missing:l.sections.filter(s=>!f.some(v=>v.section===s.id)).map(s=>s.id)};});
 const report={expected:lessons.reduce((a,l)=>a+l.expected,0),actual:lessons.reduce((a,l)=>a+l.actual,0),lessons};
 if(strict&&report.actual!==report.expected) throw Error(`Figure coverage ${report.actual}/${report.expected}; missing sections in course/visuals/coverage.json`);
 return report;
}
module.exports={apply,coverage,insertAfterOpening,render};
if(require.main===module){const report=coverage();fs.writeFileSync(path.join(__dirname,'coverage.json'),JSON.stringify(report,null,2)+'\n');console.log(`Authored section figures: ${report.actual}/${report.expected}`);if(process.argv.includes('--strict'))coverage(true);}
