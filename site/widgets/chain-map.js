/* chain-map — "The Supply Chain in One Map" (Module 00) */
(function () {
  'use strict';
  const pad = n => String(n).padStart(2, '0');
  const CAT = {
    mat: { label: 'Materials', v: 'var(--si)' },
    fab: { label: 'Wafer fab & sort', v: 'var(--accent)' },
    mem: { label: 'Memory (HBM, parallel branch)', v: 'var(--accent2)' },
    pkg: { label: 'Packaging & test', v: 'var(--cu)' },
    sys: { label: 'Boards, racks, data centers', v: 'var(--ok)' },
  };

  // The 16 stages of the main chain, in order, following Module 00's "Chain in One Table" (the fab
  // row is split into FEOL / MOL / BEOL as the module text does). name lines are split on '|'.
  const NODES = [
    { id: 'quartz', name: 'Quartz mining', cat: 'mat', mod: 1, glyph: 'rock', out1: '$50–150 / t',
      why: 'Silicon is 28 % of the Earth’s crust, so the ore is not scarce; quartz pure enough to smelt (>98 % SiO₂, low in iron, boron and phosphorus) is, and the ultra-pure quartz for crystal-growth crucibles comes from a handful of deposits such as Spruce Pine.',
      in: 'Quartzite / vein quartz ore', out: 'Lump quartz (>98 % SiO₂), 10–100 mm pieces',
      who: 'Sibelco, The Quartz Corp, Chinese and Brazilian miners',
      cost: '~$50–150 per tonne (metallurgical); ~$5 000–10 000/t for high-purity crucible quartz', time: 'Days',
      where: 'Norway, Brazil, China, Spruce Pine NC' },
    { id: 'mgsi', name: 'Carbothermic|reduction', cat: 'mat', mod: 1, glyph: 'furnace', out1: 'MG-Si $2–3/kg',
      why: 'Lump quartz and carbon (coal, charcoal, wood chips) are melted in a submerged arc furnace at ~2 000 °C: SiO₂ + 2C → Si + 2CO. The product is 98–99 % “metallurgical-grade” silicon (MG-Si); each tonne eats ~11–13 MWh, so smelters sit next to cheap hydro or coal power.',
      in: 'Quartz + coal / charcoal / wood chips', out: 'Metallurgical-grade silicon (MG-Si, 98–99 %)',
      who: 'Ferroglobe, Elkem, Chinese smelters (~80–85 % of world supply)',
      cost: '~$2–3/kg', time: 'Hours per tap; continuous', where: 'China, Norway, Brazil, USA' },
    { id: 'poly', name: 'Polysilicon', cat: 'mat', mod: 1, glyph: 'siemens', out1: '9N–11N $30/kg',
      why: 'MG-Si is converted to the liquid trichlorosilane (SiHCl₃), distilled until impurities are parts-per-trillion, then decomposed onto electrically heated silicon U-rods in a bell-jar (Siemens) reactor. That is a billion-fold purity gain to 9N–11N (99.9999999 %+), which is what “electronic grade” means.',
      in: 'MG-Si + HCl → trichlorosilane → CVD', out: 'Electronic-grade polysilicon (9N–11N)',
      who: 'Wacker, Hemlock, Tokuyama, OCI; solar-grade: GCL, Tongwei, Daqo',
      cost: '~$20–40/kg electronic grade (solar-grade fell to ~$5/kg in 2024–25)', time: '~1 week per batch incl. distillation',
      where: 'Germany, USA, Japan, Korea, Malaysia, China' },
    { id: 'ingot', name: 'Crystal|growth', cat: 'mat', mod: 2, glyph: 'cz', out1: 'ingot ~$150k',
      why: 'Polysilicon is melted at ~1 420 °C in a quartz crucible and a small seed crystal is slowly pulled out while rotating (the Czochralski, or CZ, process); the melt freezes onto it as one continuous single crystal, because a transistor needs a defect-free lattice with a known orientation.',
      in: 'Polysilicon chunks + dopant', out: 'Single-crystal ingot, 300 mm dia., ~2 m long, ~300–450 kg',
      who: 'Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron',
      cost: 'Ingot value ~$100–200k', time: '~2.5–3.5 days per crystal (melt, seed, pull, cool)', where: 'Japan, Taiwan, Germany, Korea, USA' },
    { id: 'wafer', name: 'Wafering', cat: 'mat', mod: 3, glyph: 'wafering', out1: '$100–150 each',
      why: 'The ingot is ground to exactly 300 mm, sliced by a diamond-wire saw into ~1 500–2 000 slices, then ground, etched and polished to sub-nanometre roughness: a 775 µm-thick mirror that is flat to a few tens of nanometres, because EUV lithography has a depth of focus that small.',
      in: 'Ingot', out: 'Polished prime wafer, 300 mm, 775 µm thick',
      who: 'Same five firms (~90 % of 300 mm)',
      cost: '~$100–150 polished; ~$200–300 with an epitaxial (extra grown) silicon layer', time: '~2–3 weeks', where: 'Japan, Taiwan, Germany, Korea, USA' },
    { id: 'feol', name: 'Fab: FEOL', cat: 'fab', mod: 11, glyph: 'feol', out1: 'transistors',
      why: 'FEOL = front end of line: the fab steps that build the transistors themselves (isolation, wells, the gate stack, source/drain epitaxy) through hundreds of deposition, lithography, etch and implant steps. This is where the ~2 nm alignment tolerances and the ~20–25 EUV mask layers live.',
      in: 'Bare wafers + ~70–100+ masks + gases, chemicals, resists', out: 'Transistors: gate stack, source/drain epitaxy',
      who: 'TSMC, Samsung, Intel Foundry (leading edge)',
      cost: 'Part of the wafer price: N4 ~$16–17k; N3 ~$18–20k; N2 ~$30k', time: '~6–7 of the fab’s ~12–14 weeks',
      where: 'Taiwan (~90 % of leading edge), Korea, USA, Japan' },
    { id: 'mol', name: 'Fab: MOL', cat: 'fab', mod: 11, glyph: 'mol', out1: 'contact plugs',
      why: 'MOL = middle of line: the tiny metal plugs (tungsten, cobalt or ruthenium) that connect each transistor up to the wiring above, at the tightest pitch on the whole chip (~25–30 nm).',
      in: 'FEOL wafer', out: 'Contacts to every transistor (W, Co or Ru)',
      who: 'Same fabs', cost: 'Part of the wafer price above', time: '~1 week', where: 'Same fab' },
    { id: 'beol', name: 'Fab: BEOL', cat: 'fab', mod: 12, glyph: 'beol', out1: '$17k N4 wafer',
      why: 'BEOL = back end of line: ~15–18 levels of copper wiring built by dual damascene (etch trenches and holes into the insulator, line them, fill with electroplated copper, polish flat), from ~24–28 nm pitch at the bottom to microns at the top. The whole fab pass takes ~3 months and turns a $150 wafer into a ~$17 000 one.',
      in: 'MOL wafer', out: 'Patterned wafer with ~15–18 copper metal layers',
      who: 'Same fabs', cost: 'Wafer now worth N4 ~$16–17k; N3 ~$18–20k; N2 ~$30k', time: '~5 weeks; whole fab pass ~3 months (12–14 weeks)', where: 'Same fab' },
    { id: 'sort', name: 'Wafer sort', cat: 'fab', mod: 14, glyph: 'sort', out1: '$1–5 per die',
      why: 'Every die on the finished wafer is tested electrically through a probe card (thousands of needles pressed onto its pads) by an automatic tester; the result is a wafer map of good, bad and speed-binned die. For a big GPU, harvesting partly-good die (e.g. 132 of 144 blocks enabled) is what makes yield workable.',
      in: 'Finished wafer', out: 'Wafer map of good/bad die, bins',
      who: 'Fab or test OSAT (KYEC), on Advantest / Teradyne testers',
      cost: '~$1–5 per die for large logic', time: 'Hours per wafer', where: 'Co-located with the fab' },
    { id: 'dice', name: 'Bump, thin|& dice', cat: 'pkg', mod: 16, glyph: 'dice', out1: '$50–200/wafer',
      why: 'Before packaging the wafer gets its solder micro-bumps or copper pillars, is ground from 775 µm down to a few hundred µm, and is cut (blade, laser or plasma dicing) into individual known-good die. This is the moment a wafer becomes chips.',
      in: 'Sorted wafer', out: 'Singulated, bumped known-good die',
      who: 'Fab (TSMC) or OSAT (ASE, Amkor); DISCO tools', cost: '~$50–200 per wafer', time: 'Days', where: 'Taiwan, Korea, China, Malaysia' },
    { id: 'cowos', name: 'Advanced|packaging', cat: 'pkg', mod: 17, glyph: 'cowos', out1: 'CoWoS $500–1k',
      why: 'CoWoS = chip-on-wafer-on-substrate, TSMC’s 2.5D packaging: the GPU die and its HBM stacks are bonded side by side onto a silicon interposer (a slab of silicon carrying thousands of fine wires between them), which is then mounted on an organic substrate. CoWoS capacity has been the tightest constraint on AI-accelerator supply since 2023.',
      in: 'GPU die + HBM + interposer/bridges + substrate', out: '2.5D package (CoWoS)',
      who: 'TSMC (~90 %+ of CoWoS-class), ASE/SPIL, Amkor; substrates from Ibiden, Unimicron',
      cost: '~$500–1 000 per package incl. substrate', time: '~2–4 weeks', where: 'Taiwan; Arizona (Amkor) from ~2028' },
    { id: 'test', name: 'Final test +|burn-in', cat: 'pkg', mod: 18, glyph: 'test', out1: '$20–100/part',
      why: 'The packaged part is tested on an automatic tester, often “burned in” at high temperature and voltage to weed out early failures, and increasingly run in a socket with real workloads (system-level test). Fallout is a few percent, but each unit is worth tens of thousands of dollars.',
      in: 'Packaged part', out: 'Binned, speed-graded GPU',
      who: 'Fab/OSAT/test house (KYEC, ASE), Advantest V93000', cost: '~$20–100+ per high-end part', time: 'Hours to days', where: 'Taiwan' },
    { id: 'sxm', name: 'SXM module', cat: 'sys', mod: 19, glyph: 'sxm', out1: 'up to 1 400 W',
      why: 'SXM is NVIDIA’s mezzanine-card format: the tested package is soldered to a PCB with its voltage regulators (VRMs), which turn rack power into the ~1 V, ~1 000 A the GPU needs. An H100 draws up to 700 W, a B200 up to 1 000 W, a GB300 up to 1 400 W.',
      in: 'GPU package + VRMs + PCB', out: 'SXM module (700–1 400 W)',
      who: 'Foxconn, Quanta, Wistron, Inventec',
      cost: 'BOM of a finished H100 module ~$3 300 (die ~$350, HBM ~40–50 %); sold at ~$25–30k', time: '~1–2 weeks', where: 'Taiwan, Mexico, USA, China' },
    { id: 'board', name: 'HGX / GB200|board', cat: 'sys', mod: 19, glyph: 'board', out1: '8 GPUs ~$250k',
      why: 'Eight SXM modules plus NVSwitch chips make an HGX baseboard; in the Grace-Blackwell era a “Bianca” compute board carries two Grace CPUs and four Blackwell GPUs. The multilayer PCB itself comes from Unimicron, TTM or WUS.',
      in: 'SXM modules + baseboard + NVSwitch', out: 'HGX 8-GPU baseboard or GB200 “Bianca” compute board',
      who: 'Foxconn, Quanta, Wistron, Inventec; PCBs from Unimicron, TTM, WUS',
      cost: 'HGX 8-GPU baseboard ~$200–300k at list', time: '~1–2 weeks', where: 'Taiwan, Mexico, USA, China' },
    { id: 'rack', name: 'Server / rack', cat: 'sys', mod: 19, glyph: 'rack', out1: 'NVL72 ~$3–4M',
      why: 'Boards go into a server or a compute tray with CPUs, DRAM, network cards and storage; 18 compute trays + 9 NVSwitch trays + a copper NVLink spine of ~5 000 cables make a GB200 NVL72 rack: 72 GPUs, ~120–140 kW, liquid-cooled through cold plates.',
      in: 'Boards + CPUs + DRAM + NICs + storage; 18 compute + 9 switch trays per rack', out: 'DGX/HGX server or GB200 NVL72 rack, ~120–140 kW',
      who: 'Same ODMs; Dell, HPE, Supermicro as OEMs',
      cost: 'DGX H100 ~$300–400k; GB200 tray >$500k; NVL72 rack ~$3–4M', time: 'Weeks incl. burn-in', where: 'Taiwan, Mexico, USA' },
    { id: 'dc', name: 'Data center', cat: 'sys', mod: 19, glyph: 'dc', out1: '$30–50M / MW',
      why: 'Racks are installed with power, cooling and an InfiniBand or Ethernet network to form an AI cluster. 100 000 GPUs is ~1 400 NVL72 racks, ~150–200 MW of IT load and on the order of $10 billion of hardware, 12–24 months after ground-breaking.',
      in: 'Racks + power + cooling + network', out: 'AI cluster (10k–1M+ GPUs)',
      who: 'Hyperscalers, neoclouds, xAI/OpenAI-class builders',
      cost: '~$30–50M per MW all-in; ~$10B+ per 100k-GPU cluster', time: '12–24 months to build', where: 'USA (Texas, Virginia, Arizona), Gulf, Nordics, everywhere' },
  ];
  const HBM = { id: 'hbm', name: 'HBM|manufacturing', cat: 'mem', mod: 15, glyph: 'hbm', out1: '$15–20 per GB',
    why: 'HBM = high-bandwidth memory: 8, 12 or 16 DRAM dies, each thinned to ~30 µm, stacked on a logic base die and wired vertically through ~1 000–2 000 TSVs (through-silicon vias: copper-filled holes through the die). It is made in a separate DRAM fab and meets the GPU die at packaging.',
    in: 'DRAM wafers with TSVs', out: '8-, 12- or 16-high stacks, 24–48 GB each',
    who: 'SK hynix (~50 %), Samsung (~33 %), Micron (~18 %)',
    cost: '~$200–700 per stack; ~$15–20/GB (estimates vary)', time: 'DRAM fab ~2–3 months + ~1 week stacking/test',
    where: 'Korea; Taiwan and Japan (Micron); Singapore/USA (Micron, ramping)' };
  const ALL = NODES.concat([HBM]);

  // Value of the material from ONE 300 mm wafer (Module 00 table + H100 worked example:
  // ~$16 500 wafer, ~45–50 sellable die, BOM ~$3 300/module, sold ~$25–30k/module).
  const VALUE = [
    { v: 7, txt: '~$5–10', cap: 'poly-Si per wafer', mult: null },
    { v: 150, txt: '$150', cap: 'bare polished wafer', mult: '×20' },
    { v: 17000, txt: '$17 000', cap: 'processed N4 wafer', mult: '×113' },
    { v: 150000, txt: '~$150 000', cap: '45–50 modules, BOM', mult: '×9' },
    { v: 1300000, txt: '~$1.3 M', cap: '45–50 modules, sold', mult: '×8.5' },
  ];

  // ---------- mini schematics, drawn in a 44 x 44 box ----------
  function glyph(svg, kind) {
    const R = (x, y, w, h, fill, o) => svg('rect', Object.assign({ x, y, width: w, height: h, fill }, o || {}));
    const P = (d, o) => svg('path', Object.assign({ d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, o || {}));
    const C = (cx, cy, r, o) => svg('circle', Object.assign({ cx, cy, r }, o || {}));
    const ink = 'var(--ink)', mu = 'var(--muted)', si = 'var(--si)', cu = 'var(--cu)', ac = 'var(--accent)', a2 = 'var(--accent2)',
      ok = 'var(--ok)', pn = 'var(--panel)', cc = 'currentColor', n4 = [0, 1, 2, 3], n5 = [0, 1, 2, 3, 4];
    switch (kind) {
      case 'rock': return [P('M6 30 L12 14 L20 6 L30 10 L38 22 L34 36 L16 40 Z', { fill: si, 'fill-opacity': .35, stroke: si, 'stroke-width': 1.5 }),
        P('M12 14 L22 24 L38 22 M22 24 L16 40 M22 24 L34 36', { stroke: si, 'stroke-width': 1 })];
      case 'furnace': return [P('M7 14 L11 41 L33 41 L37 14', { fill: pn, stroke: ink, 'stroke-width': 1.5 }),
        P('M9 18 L35 18 L34 32 L10 32 Z', { fill: mu, 'fill-opacity': .4 }), P('M10 32 L34 32 L33 40 L11 40 Z', { fill: ac }),
        R(12, 0, 4, 23, mu), R(20, 0, 4, 23, mu), R(28, 0, 4, 23, mu),
        P('M14 23 L15 27 M22 23 V27 M30 23 L29 27', { stroke: ac, 'stroke-width': 1.5 }), P('M33 38 L42 43', { stroke: ac, 'stroke-width': 2.5 })];
      case 'siemens': return [R(3, 40, 38, 3, mu), P('M8 40 V16 A14 14 0 0 1 36 16 V40', { fill: pn, stroke: ink, 'stroke-width': 1.5 }),
        P('M12 40 V20 a4 4 0 0 1 8 0 V40 M24 40 V20 a4 4 0 0 1 8 0 V40', { stroke: cc, 'stroke-width': 3.5 })];
      case 'cz': return [P('M8 30 L10 43 L34 43 L36 30', { fill: pn, stroke: ink, 'stroke-width': 1.5 }), P('M9.5 34 L34.5 34 L34 43 L10 43 Z', { fill: ac }),
        P('M22 0 V5', { stroke: ink, 'stroke-width': 1.2 }), P('M22 5 L16 11 V27 L22 34 L28 27 V11 Z', { fill: si, stroke: si, 'stroke-width': 1 })];
      case 'wafering': return [R(1, 6, 12, 32, si, { 'fill-opacity': .45, stroke: si, 'stroke-width': 1.2 }), R(16, 6, 3, 32, si),
        P('M14.5 2 V42', { stroke: ink, 'stroke-width': 1, 'stroke-dasharray': '2 2' }),
        P('M35.3 31.4 A9.5 9.5 0 1 0 30.7 31.4 L33 28.5 Z', { fill: si, 'fill-opacity': .3, stroke: si, 'stroke-width': 1.5 })];
      case 'feol': return [R(2, 30, 40, 12, si, { 'fill-opacity': .3, stroke: si, 'stroke-width': 1 }), R(7, 22, 8, 8, ok, { 'fill-opacity': .8 }),
        R(29, 22, 8, 8, ok, { 'fill-opacity': .8 }), R(15, 22, 14, 8, si), R(15, 19, 14, 3, 'var(--warn)'), R(15, 6, 14, 13, cc)];
      case 'mol': return [R(0, 2, 44, 32, mu, { 'fill-opacity': .15 }), R(2, 34, 40, 8, si, { 'fill-opacity': .3, stroke: si, 'stroke-width': 1 }),
        R(7, 26, 8, 8, ok, { 'fill-opacity': .8 }), R(29, 26, 8, 8, ok, { 'fill-opacity': .8 }), R(15, 26, 14, 8, si), R(15, 16, 14, 10, ac),
        R(9, 2, 4, 24, ink, { 'fill-opacity': .75 }), R(20, 2, 4, 14, ink, { 'fill-opacity': .75 }), R(31, 2, 4, 24, ink, { 'fill-opacity': .75 })];
      case 'beol': return [R(0, 0, 44, 44, mu, { 'fill-opacity': .12 }), R(2, 3, 40, 6, cu), R(19, 9, 6, 5, cu), R(8, 14, 28, 5, cu), R(19, 19, 6, 5, cu),
        R(12, 24, 20, 4, cu), R(19, 28, 6, 5, cu), R(15, 33, 14, 3.5, cu), R(19, 36.5, 6, 6, cu)];
      case 'sort': return [R(6, 2, 32, 7, mu), P('M11 9 L15 18 M17 9 L19 18 M22 9 V18 M27 9 L25 18 M33 9 L29 18', { stroke: ink, 'stroke-width': 1.2 }),
        C(22, 30, 12, { fill: si, 'fill-opacity': .3, stroke: si, 'stroke-width': 1.5 }),
        P('M14 21 V39 M22 18 V42 M30 21 V39 M11 26 H33 M10 30 H34 M11 34 H33', { stroke: si, 'stroke-width': .8 })];
      case 'dice': return [C(19, 26, 15, { fill: si, 'fill-opacity': .3, stroke: si, 'stroke-width': 1.5 }),
        P('M11 13.3 V38.7 M19 11 V41 M27 13.3 V38.7 M6.3 18 H31.7 M4 26 H34 M6.3 34 H31.7', { stroke: si, 'stroke-width': .9 }),
        R(31, 3, 10, 10, cc), C(33, 15, 1.3, { fill: cu }), C(36, 15, 1.3, { fill: cu }), C(39, 15, 1.3, { fill: cu })];
      case 'cowos': return [R(2, 33, 40, 8, ok, { 'fill-opacity': .55 }), R(5, 27, 34, 6, si), R(15, 11, 14, 16, ac),
        ...n4.map(i => R(6, 12 + i * 3.8, 7, 3, a2)), ...n4.map(i => R(31, 12 + i * 3.8, 7, 3, a2)), ...n5.map(i => C(8 + i * 7, 42.5, 1.5, { fill: mu }))];
      case 'test': return [R(4, 24, 36, 11, pn, { rx: 2, stroke: ink, 'stroke-width': 1.3 }),
        P('M8 35 V40 M14 35 V40 M20 35 V40 M26 35 V40 M32 35 V40 M38 35 V40', { stroke: mu, 'stroke-width': 1.2 }),
        R(13, 15, 18, 9, cc), P('M28 8 L33 13 L42 2', { stroke: ok, 'stroke-width': 3 })];
      case 'sxm': return [R(2, 6, 40, 30, pn, { rx: 2, stroke: cc, 'stroke-width': 1.5 }), R(8, 12, 16, 16, cc), R(29, 10, 9, 8, mu), R(29, 22, 9, 8, mu), R(6, 36, 32, 5, cu)];
      case 'board': return [R(2, 3, 40, 38, pn, { rx: 2, stroke: cc, 'stroke-width': 1.5 }),
        ...n4.map(i => R(6 + i * 9, 7, 7, 7, cc)), ...n4.map(i => R(6 + i * 9, 30, 7, 7, cc)), ...n4.map(i => R(7 + i * 9, 19, 5, 6, ink, { 'fill-opacity': .6 }))];
      case 'rack': return [R(11, 1, 22, 42, pn, { rx: 1.5, stroke: cc, 'stroke-width': 1.5 }),
        ...[0, 1, 2, 3, 4, 5].map(i => R(13.5, 4 + i * 6.4, 17, 4.6, cc, { 'fill-opacity': .2 + (i % 2) * .2, stroke: cc, 'stroke-width': .6 }))];
      case 'dc': return [P('M2 12 L22 3 L42 12 V41 H2 Z', { fill: pn, stroke: cc, 'stroke-width': 1.5 }),
        ...n5.map(i => R(6 + i * 7, 16, 4.5, 9, cc)), ...n5.map(i => R(6 + i * 7, 28, 4.5, 9, cc))];
      case 'hbm': return [R(5, 36, 34, 6, ink, { 'fill-opacity': .6 }), ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => R(9, 32.5 - i * 3.6, 26, 2.9, a2)),
        P('M14 7 V36 M20 7 V36 M26 7 V36 M32 7 V36', { stroke: pn, 'stroke-width': .9 }), ...n5.map(i => C(9 + i * 6.5, 43, 1.2, { fill: cu }))];
      default: return [];
    }
  }

  window.registerWidget('chain-map', {
    title: 'The Supply Chain in One Map',
    caption: 'Follow the numbers 1 → 16: rows read left to right and the hooked line returns to the next row; HBM (dashed) is made in parallel and joins at stage 11. Click a card (or hover to preview) and the panel explains what happens there, what goes in and out, who does it and what it costs.',
    mount(el, ctx) {
      const { h, svg } = ctx;
      const uid = 'cm' + Math.random().toString(36).slice(2, 7);
      let sel = NODES[0], shown = sel, narrowMode = false;
      const T = (x, y, s, o, txt) => svg('text', Object.assign({ x, y, 'font-size': s, 'font-family': 'var(--sans)', fill: 'var(--ink)' }, o || {}), txt);

      // ---------- layout: 4 x 4 grid of 172 x 92 cards, a branch band between rows 2 and 3 ----------
      const CW = 172, CH = 92, ML = 28, GX = 12, W = 760;
      const X = [0, 1, 2, 3].map(c => ML + c * (CW + GX));
      const Y = [12, 148, 420, 556];              // rows 1-4
      const BY = 284;                             // branch band (HBM card + callouts)
      const H = Y[3] + CH + 10;
      const pos = NODES.map((n, i) => ({ x: X[i % 4], y: Y[Math.floor(i / 4)] }));
      const hbmPos = { x: X[2], y: BY };

      const flow = svg('svg', { class: 'w-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Map of the semiconductor supply chain, 16 numbered stages plus the HBM branch' });
      const defs = svg('defs');
      [['m', 'var(--muted)'], ['m2', 'var(--accent2)']].forEach(([k, fill]) => defs.append(
        svg('marker', { id: `${uid}-${k}`, markerWidth: 8, markerHeight: 8, refX: 7.5, refY: 4, orient: 'auto', markerUnits: 'userSpaceOnUse' },
          svg('path', { d: 'M0 0 L8 4 L0 8 Z', fill }))));
      flow.append(defs);
      const arrow = (d, o) => svg('path', Object.assign({ d, fill: 'none', stroke: 'var(--muted)', 'stroke-width': 2, 'marker-end': `url(#${uid}-m)` }, o || {}));
      // within-row arrows
      NODES.forEach((n, i) => { if (i % 4 < 3) flow.append(arrow(`M${pos[i].x + CW} ${pos[i].y + CH / 2} H${pos[i + 1].x}`)); });
      // row-return elbows: down from the last card, left along the gap, down the left margin, into the first card of the next row
      const r = 8, xL = 10;
      [0, 1, 2].forEach(row => {
        const yBot = Y[row] + CH, yMid = Y[row + 1] + CH / 2, xFrom = X[3] + CW / 2;
        flow.append(arrow(`M${xFrom} ${yBot} V${yBot + 22 - r} a${r} ${r} 0 0 1 ${-r} ${r} H${xL + r} a${r} ${r} 0 0 0 ${-r} ${r} V${yMid - r} a${r} ${r} 0 0 0 ${r} ${r} H${ML}`));
      });
      // HBM branch arrow straight down into the packaging card
      const hx = hbmPos.x + CW / 2;
      flow.append(arrow(`M${hx} ${BY + CH} V${Y[2]}`, { stroke: 'var(--accent2)', 'stroke-dasharray': '5 4', 'marker-end': `url(#${uid}-m2)` }));
      flow.append(T(hx + 9, Y[2] - 16, 13, { fill: 'var(--accent2)', 'font-weight': 600 }, 'HBM stacks join the GPU die here'));
      // branch annotation (column 4 of the band)
      const ax = X[3] + 2;
      [['Parallel branch', { fill: 'var(--accent2)', 'font-weight': 700 }], ['DRAM fab ~2–3 months,', null], ['then ~1 week of TSV', null],
        ['stacking and test.', null], ['SK hynix, Samsung, Micron', null]].forEach(([s, o], i) =>
        flow.append(T(ax, BY + 18 + i * 17, 13, Object.assign({ fill: 'var(--muted)' }, o || {}), s)));
      // orientation callout (columns 1-2 of the band), Module 00's second orientation fact
      const cx0 = X[0], cw = X[1] + CW - X[0];
      flow.append(svg('rect', { x: cx0, y: BY, width: cw, height: CH, rx: 8, fill: 'var(--panel2)', stroke: 'var(--line2)', 'stroke-width': 1.2, 'stroke-dasharray': '5 4' }));
      [['Time: ~6–9 months from polysilicon to server', { 'font-weight': 700 }], ['~3 months of it inside the wafer fab (stages 6–8),', null],
        ['1–2 months in packaging and test (10–12).', null], ['Everything after the wafer is fast; everything', null], ['before it is cheap.', null]].forEach(([s, o], i) =>
        flow.append(T(cx0 + 12, BY + 22 + i * 16, 13, Object.assign({ fill: i ? 'var(--muted)' : 'var(--ink)' }, o || {}), s)));

      // ---------- cards ----------
      const cardsG = svg('g', { class: 'cards' }); flow.append(cardsG);
      const cards = new Map();
      function drawCard(n, p, num) {
        const col = CAT[n.cat].v;
        const g = svg('g', { tabindex: 0, role: 'button', 'data-id': n.id, 'aria-label': (num ? num + '. ' : '') + n.name.replace('|', ' ') + ' — module ' + pad(n.mod), style: { cursor: 'pointer', color: col } });
        const box = svg('rect', { x: p.x, y: p.y, width: CW, height: CH, rx: 8, fill: 'var(--panel2)', stroke: col, 'stroke-width': 2 });
        const tint = svg('rect', { x: p.x, y: p.y, width: CW, height: CH, rx: 8, fill: col, 'fill-opacity': 0 });
        g.append(box, tint, svg('rect', { x: p.x + 4, y: p.y + 8, width: 6, height: CH - 16, rx: 3, fill: col }));
        g.append(svg('circle', { cx: p.x + 26, cy: p.y + 18, r: 11, fill: col }),
          T(p.x + 26, p.y + 22.5, 13, { 'font-family': 'var(--mono)', 'font-weight': 700, 'text-anchor': 'middle', fill: 'var(--panel)' }, num || '‖'));
        const ig = svg('g', { transform: `translate(${p.x + 14},${p.y + 38})` });
        glyph(svg, n.glyph).forEach(s => ig.append(s)); g.append(ig);
        const lines = n.name.split('|'), tx = p.x + 64;
        lines.forEach((s, i) => g.append(T(tx, p.y + (lines.length === 1 ? 34 : 25 + i * 17), 14, { 'font-weight': 700 }, s)));
        g.append(T(tx, p.y + 62, 13, { 'font-family': 'var(--mono)', fill: 'var(--ink)' }, n.out1));
        g.append(T(p.x + CW - 6, p.y + 84, 13, { 'font-family': 'var(--mono)', 'text-anchor': 'end', fill: 'var(--muted)' }, 'Module ' + pad(n.mod)));
        const select = () => { sel = n; show(n); paint(); };
        g.addEventListener('click', select);
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
        g.addEventListener('mouseenter', () => { g.hover = true; show(n); paint(); });
        g.addEventListener('mouseleave', () => { g.hover = false; show(sel); paint(); });
        g.addEventListener('focus', () => { g.hover = true; show(n); paint(); });
        g.addEventListener('blur', () => { g.hover = false; show(sel); paint(); });
        cardsG.append(g); cards.set(n.id, { g, box, tint });
      }
      NODES.forEach((n, i) => drawCard(n, pos[i], String(i + 1)));
      drawCard(HBM, hbmPos, '');
      function paint() {
        cards.forEach(({ g, box, tint }, id) => {
          const isSel = id === sel.id;
          // selected: tint + 3.5 stroke; hover only: 3 stroke (a distinct, lighter affordance)
          box.setAttribute('stroke-width', isSel ? 3.5 : g.hover ? 3 : 2);
          tint.setAttribute('fill-opacity', isSel ? .16 : g.hover ? .06 : 0);
        });
        listBtns.forEach((b, id) => b.classList.toggle('primary', id === sel.id));
      }

      // ---------- narrow vertical list (< 560 px) ----------
      const list = h('div', { style: { display: 'none', flexDirection: 'column', gap: '6px' } });
      const listBtns = new Map();
      function listItem(n, num, indent) {
        const btn = h('button', {
          class: 'w-btn', 'data-id': n.id,
          style: { display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-start', borderLeft: `4px solid ${CAT[n.cat].v}`, textAlign: 'left', marginLeft: indent ? '22px' : '0' },
          on: { click: () => { sel = n; show(n); paint(); } }
        }, h('span', { style: { fontFamily: 'var(--mono)', fontSize: '12px', minWidth: '20px' } }, num), h('span', null, n.name.replace('|', ' ')),
          h('span', { style: { marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '11.5px', opacity: .85 } }, 'M' + pad(n.mod)));
        list.append(btn); listBtns.set(n.id, btn);
      }
      NODES.forEach((n, i) => { if (n.id === 'cowos') listItem(HBM, '↳', true); listItem(n, String(i + 1)); });

      // ---------- detail panel ----------
      const wrap = h('div', { style: { marginTop: '14px', padding: '12px 14px', background: 'var(--ground)', borderRadius: '8px' } });
      const head = h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px', marginBottom: '6px' } });
      const why = h('div', { style: { fontSize: '13.5px', lineHeight: '1.45', margin: '0 0 10px' } });
      const detail = h('div', { class: 'w-grid2' });
      wrap.append(head, why, detail);
      function field(label, val) {
        return h('div', null, h('div', { style: { fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)' } }, label), h('div', { style: { fontSize: '13.5px' } }, val));
      }
      function fill(n) {
        head.innerHTML = ''; detail.innerHTML = '';
        const num = NODES.indexOf(n);
        head.append(
          h('h5', { style: { margin: 0, fontSize: '15px', fontFamily: 'var(--sans)' } }, (num >= 0 ? (num + 1) + ' · ' : '') + n.name.replace('|', ' ')),
          h('span', { style: { fontSize: '11.5px', fontFamily: 'var(--mono)', color: CAT[n.cat].v, whiteSpace: 'nowrap' } }, CAT[n.cat].label),
          h('a', { href: '#/m/' + pad(n.mod), style: { marginLeft: narrowMode ? '0' : 'auto', flexBasis: narrowMode ? '100%' : 'auto', fontSize: '12.5px', fontFamily: 'var(--sans)', whiteSpace: 'nowrap' } }, 'Go to module ' + pad(n.mod) + ' →'));
        why.textContent = n.why;
        detail.append(field('What goes in', n.in), field('What comes out', n.out), field('Who does it', n.who), field('Rough cost / value', n.cost), field('Time', n.time), field('Where', n.where));
      }
      function show(n) { shown = n; fill(n); }
      // give the panel the height of its tallest stage so hovering never reflows the strip below
      function fitDetail() {
        wrap.style.minHeight = '0';
        let max = 0; ALL.forEach(n => { fill(n); max = Math.max(max, wrap.offsetHeight); });
        fill(shown); wrap.style.minHeight = narrowMode ? '0' : max + 'px';   // the narrow list has no hover preview, so nothing to guard
      }

      // ---------- legend ----------
      const legend = h('div', { class: 'w-legend', style: { marginTop: '8px' } },
        ...Object.values(CAT).map(c => h('span', { class: 'w-legend-item' }, h('i', { style: { background: c.v } }), c.label)),
        h('span', { class: 'w-legend-item' }, h('i', { style: { background: 'transparent', border: '2px dashed var(--accent2)' } }), 'dashed = joins from a parallel branch'));

      // ---------- value of ONE wafer's material (log strip; HTML list when narrow) ----------
      const VX0 = 36, VX1 = 690, VL0 = Math.log10(4), VL1 = 7, VY = 108;
      const vx = v => VX0 + (Math.log10(v) - VL0) / (VL1 - VL0) * (VX1 - VX0);
      const vstrip = svg('svg', { class: 'w-svg', viewBox: '0 0 720 140', role: 'img', 'aria-label': 'Value of the material from one 300 mm wafer, log scale' });
      vstrip.append(svg('line', { x1: VX0 - 10, y1: VY, x2: VX1 + 14, y2: VY, stroke: 'var(--line2)', 'stroke-width': 2, 'marker-end': `url(#${uid}-m)` }));
      [10, 100, 1e3, 1e4, 1e5, 1e6, 1e7].forEach(t => {
        const x = vx(t);
        vstrip.append(svg('line', { x1: x, y1: VY, x2: x, y2: VY + 6, stroke: 'var(--line2)', 'stroke-width': 1.5 }));
        vstrip.append(T(x, VY + 23, 12.5, { 'font-family': 'var(--mono)', 'text-anchor': 'middle', fill: 'var(--muted)' }, t >= 1e6 ? '$' + t / 1e6 + 'M' : t >= 1e3 ? '$' + t / 1e3 + 'k' : '$' + t));
      });
      VALUE.forEach((p, i) => {
        const x = vx(p.v), far = i % 2 === 1, top = far ? VY - 65 : VY - 25;
        if (p.mult) vstrip.append(T((x + vx(VALUE[i - 1].v)) / 2, VY - 9, 12.5, { 'font-family': 'var(--mono)', 'font-weight': 700, 'text-anchor': 'middle', fill: 'var(--accent)' }, p.mult));
        vstrip.append(svg('line', { x1: x, y1: VY - 6, x2: x, y2: top, stroke: 'var(--accent)', 'stroke-width': 1.5 }));
        vstrip.append(svg('circle', { cx: x, cy: VY, r: 5, fill: 'var(--accent)', stroke: 'var(--panel)', 'stroke-width': 1.5 }));
        const anchor = i === 0 ? 'start' : 'middle', tx = i === 0 ? x - 4 : x;
        vstrip.append(T(tx, top - 27, 13.5, { 'font-family': 'var(--mono)', 'font-weight': 700, 'text-anchor': anchor }, p.txt));
        vstrip.append(T(tx, top - 11, 12.5, { 'text-anchor': anchor, fill: 'var(--muted)' }, p.cap));
      });
      // narrow fallback: one row per point (value · caption · multiplier), never a scaled-down 720-wide SVG
      const vlist = h('div', { style: { display: 'none', flexDirection: 'column', gap: '4px', margin: '6px 0 2px' } },
        ...VALUE.map((p, i) => h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px', padding: '6px 10px', background: 'var(--ground)', borderRadius: '6px', borderLeft: '4px solid var(--accent)' } },
          h('b', { style: { fontFamily: 'var(--mono)', fontSize: '14px', minWidth: '84px' } }, p.txt),
          h('span', { style: { fontSize: '13px', flex: '1 1 auto' } }, p.cap),
          h('span', { style: { fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', fontWeight: 700, whiteSpace: 'nowrap' } }, p.mult ? p.mult + ' ↑' : 'start'))));

      // ---------- assemble ----------
      el.append(flow, list, legend, wrap,
        h('h5', { style: { margin: '20px 0 2px', fontSize: '12px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' } }, 'Value of the material from ONE 300 mm wafer (log scale)'),
        vstrip, vlist,
        h('div', { class: 'w-formula' }, 'per-wafer value = sellable die per wafer (~45–50) × module price (~$25–30k) ≈ $1.3 M; BOM ≈ 45–50 × $3 300 ≈ $150k'),
        h('div', { class: 'w-note' }, 'Every point is the same material, one 300 mm wafer, at a later stage: ~230 g of polysilicon ($20–40/kg), the polished wafer, the wafer after ~3 months in the fab, and the 45–50 finished GPU modules it yields, first at bill-of-materials cost and then at selling price. Source: Module 00 table and H100 worked example.'));
      show(sel); paint();

      // ---------- responsive switch ----------
      let rafId = 0;
      const ro = new ResizeObserver(entries => {
        const w = entries[0].contentRect.width;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          narrowMode = w < 560;
          flow.style.display = narrowMode ? 'none' : 'block'; list.style.display = narrowMode ? 'flex' : 'none';
          vstrip.style.display = narrowMode ? 'none' : 'block'; vlist.style.display = narrowMode ? 'flex' : 'none';
          fitDetail();
        });
      });
      ro.observe(el);
      return () => { ro.disconnect(); if (rafId) cancelAnimationFrame(rafId); };
    }
  });
})();
