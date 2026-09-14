/* Presentational components for the course. Content, routes and progress live in app.js. */
(function () {
  'use strict';
  const stages = [
    { name: 'Make the material', short: 'Material', detail: 'Quartz → single crystal', href: '#/m/01', surveyHref: '#/s/02', icon: 'crystal' },
    { name: 'Pattern the wafer', short: 'Wafer', detail: 'Light, chemistry & precision', href: '#/m/05', surveyHref: '#/s/03', icon: 'wafer' },
    { name: 'Build the devices', short: 'Devices', detail: 'Transistors → circuits', href: '#/m/11', surveyHref: '#/s/06', icon: 'chip' },
    { name: 'Connect the pieces', short: 'Package', detail: 'Logic, memory & interconnect', href: '#/m/16', surveyHref: '#/s/09', icon: 'package' },
    { name: 'Bring it to life', short: 'System', detail: 'A chip becomes a computer', href: '#/m/19', surveyHref: '#/s/10', icon: 'rack' },
  ];
  const descriptions = [
    'Follow the connections between the material, the machines and the finished computer.',
    'Turn an abundant raw material into silicon pure enough to build a chip.',
    'Follow a single crystal as it grows from a carefully controlled melt.',
    'Cut, flatten and polish a crystal into the starting surface for a circuit.',
    'Meet the materials that make silicon manufacturing possible—and the semiconductors beyond it.',
    'Step inside the factory where hundreds of precise operations become one coordinated process.',
    'Build useful layers a few atoms at a time, and understand what makes them work.',
    'Use chemistry and projected light to turn a design into a pattern on a wafer.',
    'Follow the light from a tin droplet to some of the smallest features a factory can print.',
    'Transfer a fragile surface pattern into the material underneath it.',
    'Change the electrical behavior of silicon by placing and activating selected atoms.',
    'See how a controllable switch evolves from a flat surface into a three-dimensional structure.',
    'Connect billions of devices through a carefully constructed network of metal layers.',
    'Measure what was built, find what went wrong and understand the cost of defects.',
    'Find the working circuits before committing them to the next manufacturing steps.',
    'Explore how information is stored, then stacked beside the processors that need it.',
    'Protect a bare circuit and give it an electrical, mechanical and thermal connection to the world.',
    'Bring separate dies together to build a system that no single die could deliver.',
    'Check the assembled device and understand which failures each test can reveal.',
    'Trace the path from a hardware design to an accelerator, a server and a rack.',
    'Connect the manufacturing chain to capital, capacity, geography and strategic dependencies.',
    'Keep the concepts, abbreviations and reference quantities close at hand.',
  ];
  const surveyDescriptions = [
    'An illustrated first pass through the entire journey, from raw material to computing system.',
    'Follow silicon through purification, crystal growth and wafer finishing.',
    'Understand the factory before exploring the individual processes inside it.',
    'See how light and chemistry draw a pattern too small to see.',
    'Explore the repeating cycle that creates a chip one patterned layer at a time.',
    'Connect the transistor—the basic switch—to the wiring that makes it useful.',
    'Understand how manufacturers discover defects and decide what is good enough to ship.',
    'Find out how memory is made and why its connection to the processor matters.',
    'Follow separate pieces of silicon into one connected, protected assembly.',
    'Complete the journey from a chip to a computing system and the industry behind it.',
  ];
  let iconSerial = 0;
  function icon(type) {
    const uid = 'atlas-' + (++iconSerial);
    let drawing = '';
    if (type === 'crystal') drawing = `<path d="M71 31l39-17 41 24 16 79-33 28-53-20-20-62z" fill="var(--panel)"/><path d="M110 14l-6 86 30 45 17-107-47 62-43-37m43 37l63 17M71 31l33 69-23 25" fill="none"/><path d="M31 122l25-25 29 48H41z" fill="var(--panel2)"/><path d="M169 134l19-32 24 45h-42z" fill="var(--panel2)"/><path d="M28 158h184" opacity=".2"/>`;
    if (type === 'wafer') drawing = `<defs><clipPath id="${uid}-wafer"><ellipse cx="120" cy="86" rx="88" ry="59"/></clipPath></defs><path d="M32 86v11c0 33 39 59 88 59s88-26 88-59V86" fill="var(--si)" opacity=".2"/><ellipse cx="120" cy="86" rx="88" ry="59" fill="var(--panel)"/><g clip-path="url(#${uid}-wafer)"><path d="M65 44h40v37H65zm80 38h40v37h-40z" fill="var(--si)" opacity=".25"/><path d="M105 81h40v38h-40z" fill="var(--cu)" opacity=".55"/><g opacity=".55">${[45,65,85,105,125,145,165,185].map(x=>`<path d="M${x} 15v140"/>`).join('')}${[42,61,80,99,118,137].map(y=>`<path d="M25 ${y}h190"/>`).join('')}</g></g><path d="M111 145l9-7 9 7" fill="var(--ground)"/><ellipse cx="120" cy="86" rx="88" ry="59" fill="none"/>`;
    if (type === 'chip') drawing = `<path d="M41 65l80-40 79 40v58l-79 39-80-39z" fill="var(--panel2)"/><path d="M41 65l80 40 79-40M121 105v57" fill="none"/><path d="M64 65l57-29 57 29-57 29z" fill="var(--accent-soft)"/><path d="M84 65l37-18 37 18-37 18z" fill="var(--accent)" opacity=".55"/>${[0,1,2,3,4].map(i=>`<path d="M${48+i*14} ${78+i*7}v21M${194-i*14} ${78+i*7}v21" opacity=".6"/>`).join('')}<path d="M64 121l57 28 57-28" fill="none" opacity=".5"/>`;
    if (type === 'package') drawing = `<path d="M25 112l92-42 99 42-92 46z" fill="var(--si)" opacity=".2"/><path d="M25 112v9l99 46 92-46v-9M124 158v9" fill="none"/><path d="M55 85l62-29 70 30-64 30z" fill="var(--panel)"/><path d="M55 85v13l68 31 64-30V86M123 116v13" fill="var(--panel2)"/><path d="M85 70l31-15 34 15-32 16z" fill="var(--accent-soft)"/><path d="M85 70v10l33 16 32-16V70" fill="var(--accent)" opacity=".45"/>${[0,1,2].map(i=>`<path d="M47 ${78-i*9}l20-10 23 10-21 11zM145 ${79-i*9}l20-10 24 10-22 11z" fill="var(--si)" opacity="${.35+i*.16}"/>`).join('')}`;
    if (type === 'rack') drawing = `<path d="M74 22l69-8 34 21v119l-72 9-31-22z" fill="var(--panel2)"/><path d="M74 22l31 23 72-10M105 45v118" fill="none"/><path d="M115 53l51-6v92l-51 6z" fill="var(--panel)"/>${[0,1,2,3,4,5].map(i=>`<path d="M119 ${62+i*13}l43-5"/><path d="M123 ${58+i*13}l19-2" opacity=".35"/><circle cx="156" cy="${56+i*13}" r="1.7" fill="var(--accent)" stroke="none"/>`).join('')}<path d="M82 37v95l14 10V47z" fill="var(--si)" opacity=".2"/>`;
    const apparatus = {
      materials: `<ellipse cx="93" cy="133" rx="55" ry="24" fill="var(--si)" opacity=".35"/><ellipse cx="93" cy="128" rx="55" ry="24" fill="var(--panel2)"/><path d="M84 33h25v20l12 18v47H71V71l13-18z" fill="var(--panel)"/><path d="M72 87h49v31H72z" fill="var(--accent-soft)"/><path d="M85 27h23v7H85z" fill="var(--cu)"/><path d="M154 37q15-14 30 0v99h-30z" fill="var(--si)" opacity=".4"/><path d="M164 27v-9h12v9m-17 28h20m-22 69h24"/><path d="M162 72h15v29h-15z" fill="var(--panel)"/>`,
      furnace: `<path d="M49 69h139v73H49z" fill="var(--panel2)"/><path d="M61 79h115v49H61z" fill="var(--accent-soft)"/><path d="M63 120q26-20 56 0t57 0" fill="var(--cu)" opacity=".65"/><path d="M88 24v75m30-81v81m30-75v75" stroke-width="10" stroke="var(--muted)"/><path d="M50 71L32 47h48m107 59h27v32h-26M59 143v14m116-14v14"/><path d="M68 102l6-9m29 15l-4-11m32 9l6-14m23 14l-4-9" stroke="var(--accent)"/>`,
      puller: `<path d="M66 48q54-23 108 0v92q-54 29-108 0z" fill="var(--panel)"/><ellipse cx="120" cy="140" rx="54" ry="18" fill="var(--panel2)"/><path d="M79 95v37q41 22 82 0V95" fill="var(--accent-soft)"/><ellipse cx="120" cy="97" rx="41" ry="14" fill="var(--cu)" opacity=".7"/><path d="M101 42l11-17h16l11 17v51q-19 9-38 0z" fill="var(--si)" opacity=".8"/><path d="M120 25V6m-69 93V53m-7 8l7-8 7 8"/><path d="M180 113v29m-7-8l7 8 7-8"/><path d="M101 43q19 8 38 0"/>`,
      ingot: `<path d="M57 67l101-35q32 5 35 34L92 107z" fill="var(--si)" opacity=".35"/><ellipse cx="75" cy="86" rx="24" ry="31" transform="rotate(-22 75 86)" fill="var(--panel2)"/>${[0,1,2,3].map(i=>`<ellipse cx="${119+i*20}" cy="${115+i*5}" rx="12" ry="30" transform="rotate(-22 ${119+i*20} ${115+i*5})" fill="var(--panel)"/>`).join('')}<path d="M105 34L82 120m32-91l-23 89" stroke="var(--accent)"/>`,
      fab: `<path d="M34 89l92-49 88 48-94 52z" fill="var(--panel)"/><path d="M34 89v38l86 49 94-51V88M120 140v36" fill="var(--panel2)"/>${[0,1,2].map(i=>`<path d="M${53+i*41} ${88-i*12}l20-10 22 12v25l-20 10-22-12z" fill="var(--si)" opacity=".45"/>`).join('')}<path d="M48 42l77-28 70 35M74 40v24m39-36v22m40-15v22" stroke="var(--accent)"/><path d="M43 138l72 40m15-3l67-36" opacity=".4"/>`,
      layers: `${[0,1,2,3].map(i=>`<path d="M39 ${105-i*23}l77-38 89 39-79 41z" fill="var(--${['si','panel2','accent-soft','cu'][i]})" opacity="${i===0?'.8':'1'}"/><path d="M39 ${105-i*23}v7l87 41 79-41v-7m-79 41v7"/>`).join('')}`,
      optics: `<path d="M51 29h139v17H51z" fill="var(--panel2)"/><path d="M67 29v17m30-17v17m30-17v17m30-17v17m17-17v17" stroke-width="9"/><path d="M73 50l39 95m58-95l-42 95" stroke="var(--accent)" opacity=".6"/><ellipse cx="121" cy="88" rx="52" ry="8" fill="var(--si)" opacity=".4"/><path d="M42 147h157v14H42z" fill="var(--panel2)"/><path d="M102 145h38" stroke="var(--accent)" stroke-width="5"/><path d="M121 7v15m-5-5l5 5 5-5"/>`,
      euv: `<circle cx="41" cy="89" r="7" fill="var(--accent)"/><path d="M62 60q-22 29 0 58" stroke="var(--si)" stroke-width="5"/><path d="M41 89l72-48 47 57 37-42-13 83" stroke="var(--accent2)" stroke-width="2"/><path d="M102 38l23 6m25 55l20-3m18-41l20 3" stroke="var(--si)" stroke-width="6"/><ellipse cx="183" cy="143" rx="31" ry="9" fill="var(--panel2)"/><path d="M22 47l17 33m-8-6l8 6-1-10" stroke="var(--accent)"/>`,
      etch: `<path d="M38 131h165v22H38z" fill="var(--si)" opacity=".5"/><path d="M38 98h48v33h30V98h38v33h28V98h21v33H38z" fill="var(--panel2)"/><path d="M38 87h48v11H38zm78 0h38v11h-38zm66 0h21v11h-21z" fill="var(--accent-soft)"/>${[57,101,137,167,193].map(x=>`<path d="M${x} 31v35m-5-7l5 7 5-7" stroke="var(--accent)"/><circle cx="${x}" cy="23" r="3" fill="var(--accent)"/>`).join('')}`,
      beam: `<path d="M25 63h31v51H25z" fill="var(--accent-soft)"/><path d="M62 87h72q32 0 32 35" stroke="var(--accent)" stroke-width="3"/><path d="M84 64v48m19-48v48m18-48v48" stroke="var(--si)" stroke-width="7"/><path d="M138 61q52 0 52 53m-52-40q38 0 38 40"/><ellipse cx="166" cy="136" rx="42" ry="14" fill="var(--panel2)"/><path d="M160 122l6 8 6-8" stroke="var(--accent)"/>`,
      transistor: `<path d="M35 105h172v47H35z" fill="var(--si)" opacity=".25"/><path d="M46 105h45v18H46zm112 0h39v18h-39z" fill="var(--si)"/><path d="M96 88h56v16H96z" fill="var(--accent-soft)"/><path d="M104 50h40v37h-40z" fill="var(--cu)"/><path d="M124 49V21M65 106V76h16m97 30V76h-15"/><path d="M91 114h67" stroke="var(--accent)" stroke-dasharray="3 3"/>`,
      wiring: `${[0,1,2].map(i=>`<path d="M36 ${108-i*30}l86-35 84 38-86 35z" fill="var(--panel2)" opacity=".7"/><path d="M55 ${109-i*30}l67-27m-47 38l67-27m-45 37l67-27" stroke="var(--cu)" stroke-width="5"/>`).join('')}<path d="M105 66v29m45-45v29m-26 28v29" stroke="var(--cu)" stroke-width="6"/>`,
      probe: `<ellipse cx="120" cy="127" rx="83" ry="29" fill="var(--si)" opacity=".3"/><path d="M49 127h139m-119-13h100m-99 26h99M95 103v48m25-54v59m25-52v47" opacity=".5"/><path d="M68 33h105v22H68z" fill="var(--panel2)"/><path d="M82 55v42l14 13m13-55v41l8 13m28-54v42l-12 13m28-55v42l-15 13" stroke="var(--cu)" stroke-width="2"/>`,
      memory: `${[0,1,2,3,4].map(i=>`<path d="M61 ${119-i*18}l58-27 62 28-58 28z" fill="var(--${i%2?'si':'panel2'})"/><path d="M61 ${119-i*18}v7l62 28 58-28v-7" fill="var(--panel)"/>`).join('')}<path d="M93 41v94m55-92v91" stroke="var(--cu)" stroke-width="3" stroke-dasharray="4 4"/>`,
      network: `<path d="M53 54l68 36 69-36M121 90v69M53 54v69l68 36 69-36V54M53 123l68-33 69 33" opacity=".5"/>${[[53,54],[121,90],[190,54],[53,123],[121,159],[190,123]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="14" fill="var(--${i===1?'accent-soft':'panel'})"/><rect x="${x-5}" y="${y-5}" width="10" height="10" fill="var(--${i===1?'accent':'si'})"/>`).join('')}`,
    };
    if (apparatus[type]) drawing = apparatus[type];
    // The exploded film stack extends above y=0; move its whole geometry into the plate.
    if (type === 'layers') drawing = `<g transform="translate(0 14) scale(1 .92)">${drawing}</g>`;
    return `<svg class="atlas-object" viewBox="0 0 240 180" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">${drawing}</svg>`;
  }
  function stageFor(n, survey) {
    // Overviews and industry/reference chapters cover several stages, so mark none.
    if (survey) return [null,0,1,1,1,2,2,2,3,4][n-1] ?? null;
    if (n < 1 || n > 19) return null;
    return n <= 4 ? 0 : n <= 10 ? 1 : n <= 15 ? 2 : n <= 18 ? 3 : 4;
  }
  const signatures = [
    ['package', 'A system of systems', 'Material · device · system', 'Follow the connections'],
    ['furnace', 'From rock to feedstock', 'Quartz → silicon → polysilicon', 'Reduction & purification'],
    ['puller', 'One continuous crystal', 'Melt → growth → ingot', 'Crystal growth'],
    ['ingot', 'The starting surface', 'Ingot → slice → polished wafer', 'Wafer finishing'],
    ['materials', 'The supporting materials', 'Substrates · chemicals · gases', 'Materials & consumables'],
    ['fab', 'A coordinated factory', 'Material flow · tools · control', 'Inside the fab'],
    ['layers', 'Build the surface', 'Oxidation · deposition · interfaces', 'Thin films'],
    ['optics', 'Light becomes a pattern', 'Mask → optics → resist', 'Pattern definition'],
    ['euv', 'A path made of mirrors', 'Source → optics → wafer', 'Extreme ultraviolet'],
    ['etch', 'Transfer the pattern', 'Mask · reaction · profile', 'Selective removal'],
    ['beam', 'Place the selected atoms', 'Beam · dose · activation', 'Doping silicon'],
    ['transistor', 'Control the channel', 'Gate · dielectric · semiconductor', 'The transistor'],
    ['wiring', 'Connect the devices', 'Metal layers · vias · dielectric', 'On-chip wiring'],
    ['probe', 'Make the process visible', 'Measurement · feedback · yield', 'Process control'],
    ['probe', 'Find the working dies', 'Probe · test · wafer map', 'Electrical screening'],
    ['memory', 'Store and move information', 'Cells · arrays · stacked dies', 'Memory technologies'],
    ['package', 'Connect silicon to the world', 'Die · substrate · board', 'Packaging'],
    ['package', 'Assemble a larger system', 'Logic · memory · interconnect', 'Advanced packaging'],
    ['probe', 'Build confidence in the device', 'Test · stress · qualification', 'Quality & reliability'],
    ['rack', 'From design to computation', 'Design · accelerator · system', 'The computing system'],
    ['network', 'A connected industry', 'Capital · capacity · geography', 'Economics & strategy'],
    ['wafer', 'Keep the whole picture', 'Concepts · scales · vocabulary', 'The reference desk'],
  ];
  const surveySignature = [0,1,5,7,6,11,13,15,17,19];
  function plate(n, survey) {
    const spec = signatures[survey ? surveySignature[n-1] : n] || signatures[0];
    return `<div class="chapter-plate"><div class="plate-copy"><span class="plate-index">FIELD NOTE / ${survey?'S'+String(n).padStart(2,'0'):String(n).padStart(2,'0')}</span><strong>${spec[1]}</strong><span class="plate-path">${spec[2]}</span></div><div class="plate-drawing">${icon(spec[0])}<span class="plate-cross cross-a" aria-hidden="true">+</span><span class="plate-cross cross-b" aria-hidden="true">+</span></div><span class="plate-label">${spec[3]}</span></div>`;
  }
  function journey() {
    return `<div class="atlas-journey" aria-label="Five connected stages from raw silicon to a computing system">${stages.map((s,i)=>`<a class="journey-stage" href="${s.href}"><span class="journey-number">0${i+1}<span aria-hidden="true">↗</span></span>${icon(s.icon)}<strong>${s.name}</strong><span class="journey-detail">${s.detail}</span></a>`).join('')}</div>`;
  }
  function ribbon(n, survey) {
    const selected=stageFor(n,survey);
    return `<div class="stage-ribbon" aria-label="Position in the manufacturing journey">${stages.map((s,i)=>`<a href="${survey?s.surveyHref:s.href}" title="${s.name}" aria-label="${s.short}: ${s.name} (${survey?'survey':'deep dive'})" class="${selected===i?'current':''}"${selected===i?' aria-current="step"':''}><span class="stage-node" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span>${s.short}</span></a>`).join('')}</div>`;
  }
  window.CourseShell = { stages, icon, plate, journey, ribbon, stageFor, description(n, survey) { return (survey ? surveyDescriptions[n-1] : descriptions[n]) || ''; } };
})();
