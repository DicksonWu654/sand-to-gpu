/* Presentational components for the course. Content, routes and progress live in app.js. */
(function () {
  'use strict';
  const stages = [
    { name: 'Make the material', short: 'Material', detail: 'Quartz → single crystal', href: '#/m/01', icon: 'crystal' },
    { name: 'Pattern the wafer', short: 'Wafer', detail: 'Light, chemistry & precision', href: '#/m/05', icon: 'wafer' },
    { name: 'Build the devices', short: 'Devices', detail: 'Transistors → circuits', href: '#/m/11', icon: 'chip' },
    { name: 'Connect the pieces', short: 'Package', detail: 'Logic, memory & interconnect', href: '#/m/17', icon: 'package' },
    { name: 'Bring it to life', short: 'System', detail: 'A chip becomes a computer', href: '#/m/19', icon: 'rack' },
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
  function icon(type) {
    let drawing = '';
    if (type === 'crystal') drawing = `<path d="M71 31l39-17 41 24 16 79-33 28-53-20-20-62z" fill="var(--panel)"/><path d="M110 14l-6 86 30 45 17-107-47 62-43-37m43 37l63 17M71 31l33 69-23 25" fill="none"/><path d="M31 122l25-25 29 48H41z" fill="var(--panel2)"/><path d="M169 134l19-32 24 45h-42z" fill="var(--panel2)"/><path d="M28 158h184" opacity=".2"/>`;
    if (type === 'wafer') drawing = `<defs><clipPath id="wafer-clip"><ellipse cx="120" cy="86" rx="88" ry="59"/></clipPath></defs><path d="M32 86v11c0 33 39 59 88 59s88-26 88-59V86" fill="var(--si)" opacity=".2"/><ellipse cx="120" cy="86" rx="88" ry="59" fill="var(--panel)"/><g clip-path="url(#wafer-clip)" opacity=".55">${[45,65,85,105,125,145,165,185].map(x=>`<path d="M${x} 15v140"/>`).join('')}${[42,61,80,99,118,137].map(y=>`<path d="M25 ${y}h190"/>`).join('')}</g><path d="M111 145l9-7 9 7" fill="var(--ground)"/><ellipse cx="120" cy="86" rx="88" ry="59" fill="none"/>`;
    if (type === 'chip') drawing = `<path d="M41 65l80-40 79 40v58l-79 39-80-39z" fill="var(--panel2)"/><path d="M41 65l80 40 79-40M121 105v57" fill="none"/><path d="M64 65l57-29 57 29-57 29z" fill="var(--accent-soft)"/><path d="M84 65l37-18 37 18-37 18z" fill="var(--accent)" opacity=".55"/>${[0,1,2,3,4].map(i=>`<path d="M${48+i*14} ${78+i*7}v21m${87-i*0} ${-44+i*0}v21" opacity=".6"/>`).join('')}<path d="M64 121l57 28 57-28" fill="none" opacity=".5"/>`;
    if (type === 'package') drawing = `<path d="M25 112l92-42 99 42-92 46z" fill="var(--si)" opacity=".2"/><path d="M25 112v9l99 46 92-46v-9M124 158v9" fill="none"/><path d="M55 85l62-29 70 30-64 30z" fill="var(--panel)"/><path d="M55 85v13l68 31 64-30V86M123 116v13" fill="var(--panel2)"/><path d="M85 70l31-15 34 15-32 16z" fill="var(--accent-soft)"/><path d="M85 70v10l33 16 32-16V70" fill="var(--accent)" opacity=".45"/>${[0,1,2].map(i=>`<path d="M47 ${78-i*9}l20-10 23 10-21 11zM145 ${79-i*9}l20-10 24 10-22 11z" fill="var(--si)" opacity="${.35+i*.16}"/>`).join('')}`;
    if (type === 'rack') drawing = `<path d="M74 22l69-8 34 21v119l-72 9-31-22z" fill="var(--panel2)"/><path d="M74 22l31 23 72-10M105 45v118" fill="none"/><path d="M115 53l51-6v92l-51 6z" fill="var(--panel)"/>${[0,1,2,3,4,5].map(i=>`<path d="M119 ${62+i*13}l43-5"/><path d="M123 ${58+i*13}l19-2" opacity=".35"/><circle cx="156" cy="${56+i*13}" r="1.7" fill="var(--accent)" stroke="none"/>`).join('')}<path d="M82 37v95l14 10V47z" fill="var(--si)" opacity=".2"/>`;
    return `<svg class="atlas-object" viewBox="0 0 240 180" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">${drawing}</svg>`;
  }
  function stageFor(n, survey) {
    if (survey) return n <= 2 ? 0 : n <= 5 ? 1 : n <= 7 ? 2 : n <= 9 ? 3 : 4;
    return n <= 4 ? 0 : n <= 10 ? 1 : n <= 14 ? 2 : n <= 18 ? 3 : 4;
  }
  function journey() {
    return `<div class="atlas-journey" aria-label="Five connected stages from raw silicon to a computing system">${stages.map((s,i)=>`<a class="journey-stage" href="${s.href}"><span class="journey-number">0${i+1}<span aria-hidden="true">↗</span></span>${icon(s.icon)}<strong>${s.name}</strong><span class="journey-detail">${s.detail}</span></a>`).join('')}</div>`;
  }
  function ribbon(n, survey) {
    const selected=stageFor(n,survey);
    return `<div class="stage-ribbon" aria-label="Position in the manufacturing journey">${stages.map((s,i)=>`<a href="${s.href}" class="${selected===i?'current':''}"${selected===i?' aria-current="step"':''}><span class="stage-node" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span>${s.short}</span></a>`).join('')}</div>`;
  }
  window.CourseShell = { stages, icon, journey, ribbon, stageFor, description(n, survey) { return (survey ? surveyDescriptions[n-1] : descriptions[n]) || ''; } };
})();
