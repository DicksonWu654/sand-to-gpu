/* Widget: hbm-stack — "Build an HBM Stack" (Module 15) */
(function () {
  'use strict';
  // Per-generation constraints (Module 15 §4.2, table + worked examples).
  const GEN = {
    HBM2E: { year: '2020', width: 1024, heights: [4, 8], dies: [8, 16], rate: { min: 3.2, max: 3.6, step: 0.1, def: 3.6 }, ceiling: 720 },
    HBM3: { year: '2022', width: 1024, heights: [8, 12], dies: [16, 24], rate: { min: 5.6, max: 6.4, step: 0.1, def: 6.4 }, ceiling: 720 },
    HBM3E: { year: '2024', width: 1024, heights: [8, 12], dies: [16, 24, 32], rate: { min: 8.0, max: 9.2, step: 0.1, def: 9.2 }, ceiling: 720 },
    HBM4: { year: '2026', width: 2048, heights: [12, 16], dies: [24, 32], rate: { min: 8, max: 11, step: 0.5, def: 8 }, ceiling: 775 },
  };
  // Full JEDEC generation table (Module 15 §4.2) for the reference table, incl. rows the controls can't reach.
  const TABLE = [
    ['HBM1', '2015', '4', '1,024-bit', '1.0', '128 GB/s', '1 GB'],
    ['HBM2', '2016–18', '4–8', '1,024-bit', '2.0–2.4', '256–307 GB/s', '8 GB'],
    ['HBM2E', '2020', '8', '1,024-bit', '3.2–3.6', '410–460 GB/s', '16 GB'],
    ['HBM3', '2022', '8–12', '1,024-bit', '6.4', '819 GB/s', '24 GB'],
    ['HBM3E', '2024', '8–12', '1,024-bit', '8.0–9.2', '1.0–1.2 TB/s', '24–36 GB'],
    ['HBM4', '2026', '12–16', '2,048-bit', '8–11+', '2.0–2.8 TB/s', '36–48 GB (64 w/ 32Gb dies)'],
    ['HBM4E', '~2027–28', '16', '2,048-bit', '10–16', '2.5–4 TB/s', '48–64 GB'],
  ];
  const dieThk = h => (h <= 4 ? 60 : h === 8 ? 50 : h === 12 ? 45 : 30);
  const gapThk = (hybrid, bond, h) => (hybrid ? 2 : bond === 'tcncf' ? 15 : h >= 12 ? 10 : 13);
  const BASE_DIE = 40; // µm, thinned base/logic die

  window.registerWidget('hbm-stack', {
    title: 'Build an HBM Stack',
    caption: 'Pick a generation, stack height, die capacity and bonding method; watch the cross-section and the JEDEC height budget respond.',
    mount(el, ctx) {
      const { h, svg, fmt } = ctx;
      const st = { gen: 'HBM3E', height: 12, dieGb: 24, rate: GEN.HBM3E.rate.def, bond: 'mrmuf', hybrid: false, nStacks: 8 };

      // ---------- controls ----------
      const selGen = h('select', { 'aria-label': 'HBM generation' });
      Object.keys(GEN).forEach(g => selGen.append(h('option', { value: g }, g)));
      const selHeight = h('select', { 'aria-label': 'Stack height' });
      const selDie = h('select', { 'aria-label': 'Per-die capacity' });
      const inRate = h('input', { type: 'range' });
      const outRate = h('output');
      const inN = h('input', { type: 'range', min: 4, max: 12, step: 1, value: st.nStacks, 'aria-label': 'Stacks per GPU' });
      const outN = h('output');
      const controls = h('div', { class: 'w-controls' },
        h('label', { class: 'w-ctl' }, h('span', null, 'Generation'), selGen, h('output')),
        h('label', { class: 'w-ctl' }, h('span', null, 'Stack height'), selHeight, h('output')),
        h('label', { class: 'w-ctl' }, h('span', null, 'Per-die capacity'), selDie, h('output')),
        h('label', { class: 'w-ctl' }, h('span', null, 'Pin data rate'), inRate, outRate),
        h('label', { class: 'w-ctl' }, h('span', null, 'Stacks on GPU'), inN, outN));

      const bondTC = h('input', { type: 'radio', name: 'bond', value: 'tcncf' });
      const bondMR = h('input', { type: 'radio', name: 'bond', value: 'mrmuf', checked: true });
      const hybridBox = h('input', { type: 'checkbox' });
      const bondRow = h('div', { class: 'w-controls' },
        h('label', { class: 'w-ctl', style: { minWidth: '140px', flex: '0 0 auto' } }, h('span', null, 'TC-NCF'), bondTC, h('output')),
        h('label', { class: 'w-ctl', style: { minWidth: '140px', flex: '0 0 auto' } }, h('span', null, 'MR-MUF'), bondMR, h('output')),
        h('label', { class: 'w-ctl', style: { minWidth: '180px', flex: '0 0 auto' } }, h('span', null, 'Hybrid bond (no bumps)'), hybridBox, h('output')));
      const bondNote = h('div', { class: 'w-note' });

      // ---------- readouts ----------
      const rBw = h('b'), rCap = h('b'), rTotBw = h('b'), rTotCap = h('b'), rThk = h('b'), rHeight = h('b');
      const readout = h('div', { class: 'w-readout' },
        h('div', { class: 'w-stat' }, rBw, h('span', null, 'bandwidth / stack')),
        h('div', { class: 'w-stat' }, rCap, h('span', null, 'capacity / stack')),
        h('div', { class: 'w-stat' }, rTotBw, h('span', null, 'total GPU bandwidth')),
        h('div', { class: 'w-stat' }, rTotCap, h('span', null, 'total GPU HBM capacity')),
        h('div', { class: 'w-stat' }, rThk, h('span', null, 'die thickness needed')),
        h('div', { class: 'w-stat' }, rHeight, h('span', null, 'stack height vs. JEDEC ceiling')));
      const formula = h('div', { class: 'w-formula', html: 'BW/stack = width × rate ÷ 8 &nbsp;·&nbsp; capacity/stack = height × die_Gb ÷ 8 &nbsp;·&nbsp; height_stack = N·(t<sub>die</sub> + t<sub>gap</sub>) + t<sub>base</sub>' });

      // ---------- cross-section SVG ----------
      const VBW = 260, VBH = 360;
      const xsec = svg('svg', { class: 'w-svg', viewBox: `0 0 ${VBW} ${VBH}`, role: 'img', 'aria-label': 'HBM stack cross-section' });
      const legend = h('div', { class: 'w-legend' },
        ...[['var(--si)', 'core DRAM die'], ['var(--accent2)', 'base / logic die'], ['var(--cu)', 'TSV'], ['var(--warn)', 'microbump + underfill'], ['var(--ok)', 'hybrid Cu-Cu bond'], ['var(--line2)', 'Si interposer']]
          .map(([c, t]) => h('span', { class: 'w-legend-item' }, h('i', { style: { background: c } }), t)));

      function drawStack(g) {
        const dt = dieThk(st.height), gap = gapThk(st.hybrid, st.bond, st.height);
        const totalUm = st.height * (dt + gap) + BASE_DIE;
        const ceiling = GEN[st.gen].ceiling;
        const scaleRef = 900; // µm mapped to drawH px, generous headroom
        const drawH = 300, baseY = 340;
        const px = um => um * drawH / scaleRef;
        const stackW = 108, cx = 92;
        // fixed caption, away from the dynamic lines so it never collides
        g.append(svg('text', { x: 6, y: 16, 'font-size': 11, 'font-family': 'var(--mono)', 'font-weight': 600, fill: 'var(--bad)' }, `JEDEC ceiling: ${ceiling} µm`));
        // interposer (decorative, fixed size — not part of the height budget)
        const interW = stackW + 40, interH = 14;
        g.append(svg('rect', { x: cx - 20, y: baseY, width: interW, height: interH, fill: 'var(--line2)' }));
        g.append(svg('text', { x: cx - 20 + interW / 2, y: baseY + interH + 12, 'text-anchor': 'middle', 'font-size': 10, 'font-family': 'var(--sans)', fill: 'var(--muted)' }, 'Si interposer (CoWoS)'));
        let y = baseY;
        // base die
        const baseH = Math.max(4, px(BASE_DIE));
        y -= baseH;
        g.append(svg('rect', { x: cx, y, width: stackW, height: baseH, fill: 'var(--accent2)', stroke: 'var(--panel)', 'stroke-width': 0.6 }));
        if (baseH >= 9) g.append(svg('text', { x: cx + stackW / 2, y: y + baseH / 2 + 3.5, 'text-anchor': 'middle', 'font-size': 9, 'font-family': 'var(--sans)', fill: 'var(--panel)', 'font-weight': 600 }, 'base die'));
        // core dies, bottom to top
        const dieH = Math.max(3, px(dt)), gapH = st.hybrid ? Math.max(1, px(gap)) : Math.max(2.2, px(gap));
        let midDieY = null, midGapY = null;
        for (let i = 0; i < st.height; i++) {
          y -= gapH;
          if (st.hybrid) g.append(svg('rect', { x: cx, y, width: stackW, height: gapH, fill: 'var(--ok)' }));
          else g.append(svg('rect', { x: cx, y, width: stackW, height: gapH, fill: 'var(--warn)', opacity: 0.85 }));
          if (i === Math.floor(st.height / 2)) midGapY = y + gapH / 2;
          y -= dieH;
          g.append(svg('rect', { x: cx, y, width: stackW, height: dieH, fill: 'var(--si)', stroke: 'var(--panel)', 'stroke-width': 0.6 }));
          // TSV ticks
          for (let k = 1; k <= 4; k++) {
            const tx = cx + (stackW * k) / 5;
            g.append(svg('line', { x1: tx, y1: y + dieH * 0.12, x2: tx, y2: y + dieH * 0.88, stroke: 'var(--cu)', 'stroke-width': Math.max(0.8, dieH * 0.12) }));
          }
          if (i === Math.floor(st.height / 2)) midDieY = y + dieH / 2;
        }
        const topY = y;
        // ceiling dashed line (measured from top of interposer, i.e. baseY) — no inline label, see fixed caption above
        const ceilY = baseY - px(ceiling);
        g.append(svg('line', { x1: cx - 30, y1: ceilY, x2: cx + stackW + 30, y2: ceilY, stroke: 'var(--bad)', 'stroke-dasharray': '4 3', 'stroke-width': 1.4 }));
        // total-height marker line, labeled on the right, close to its own line
        const over = totalUm > ceiling;
        g.append(svg('line', { x1: cx - 10, y1: topY, x2: cx + stackW + 10, y2: topY, stroke: over ? 'var(--bad)' : 'var(--ok)', 'stroke-width': 2 }));
        const farFromCeil = Math.abs(topY - ceilY) > 14;
        g.append(svg('text', { x: cx + stackW + 14, y: topY + (farFromCeil ? -6 : 11), 'font-size': 11, 'font-family': 'var(--mono)', 'font-weight': 600, fill: over ? 'var(--bad)' : 'var(--ok)' }, `${fmt(totalUm, 0)} µm`));
        // leader labels on the left: die thickness + gap
        if (midDieY != null) {
          g.append(svg('line', { x1: cx, y1: midDieY, x2: cx - 20, y2: midDieY - 12, stroke: 'var(--muted)', 'stroke-width': 0.8, 'stroke-dasharray': '2 2' }));
          g.append(svg('text', { x: cx - 22, y: midDieY - 9, 'text-anchor': 'end', 'font-size': 10, 'font-family': 'var(--sans)', fill: 'var(--muted)' }, `die ≈ ${fmt(dt, 0)} µm`));
        }
        if (midGapY != null) {
          g.append(svg('line', { x1: cx, y1: midGapY, x2: cx - 20, y2: midGapY + 14, stroke: 'var(--muted)', 'stroke-width': 0.8, 'stroke-dasharray': '2 2' }));
          g.append(svg('text', { x: cx - 22, y: midGapY + 17, 'text-anchor': 'end', 'font-size': 10, 'font-family': 'var(--sans)', fill: 'var(--muted)' }, st.hybrid ? 'bond ≈ 2 µm' : `gap ≈ ${fmt(gap, 0)} µm`));
        }
        return { totalUm, ceiling, over };
      }

      // ---------- generation table ----------
      const tableWrap = h('div', { class: 'table-scroll', style: { margin: '0' } });
      function buildTable() {
        tableWrap.innerHTML = '';
        const t = h('table');
        t.append(h('tr', null, ...['Gen', 'Year', 'Height', 'Interface', 'Rate (Gbps)', 'BW/stack', 'Max capacity'].map(x => h('th', null, x))));
        TABLE.forEach(row => {
          const on = row[0] === st.gen;
          t.append(h('tr', { style: on ? { background: 'var(--accent-soft)', fontWeight: '600' } : null }, ...row.map(c => h('td', null, c))));
        });
        tableWrap.append(t);
      }

      const bondCaptions = {
        tcncf: 'TC-NCF (Samsung): a pre-laminated epoxy film covers each die\'s bumps; a thermo-compression bonder presses and cures one die at a time (5–15 s at 250–300 °C). Underfill is in place before the joint forms, but it is serial and heat/warpage on thin dies made 12-high qualification hard.',
        mrmuf: 'MR-MUF (SK hynix): all dies are placed with flux, then the whole stack passes through one mass-reflow oven and an epoxy molding compound is injection-filled around every gap afterward. Parallel joint formation (2–3× TC-NCF throughput) and ~2× the thermal conductivity of NCF, at the cost of void-free mold flow into a shrinking gap.',
      };
      function bondText() {
        if (st.hybrid) return 'Hybrid bonding: dies are planarized to a dielectric with recessed Cu pads and fused Cu-Cu at room temperature plus a 200–300 °C anneal — no solder, no underfill, no gap. Frees up ~190 µm of height budget versus microbumps, enough for 20-high stacks or much thicker dies, but demands sub-nm surface roughness and ±0.1–0.2 µm placement. Not yet used in production HBM (expected HBM4E/HBM5, ~2027–2029).';
        return bondCaptions[st.bond];
      }

      // ---------- wiring ----------
      function refreshOptions() {
        const g = GEN[st.gen];
        selHeight.innerHTML = ''; g.heights.forEach(hh => selHeight.append(h('option', { value: hh }, hh + '-high')));
        if (!g.heights.includes(st.height)) st.height = g.heights[g.heights.length - 1];
        selHeight.value = st.height;
        selDie.innerHTML = ''; g.dies.forEach(d => selDie.append(h('option', { value: d }, d + ' Gb')));
        if (!g.dies.includes(st.dieGb)) st.dieGb = g.dies[0];
        selDie.value = st.dieGb;
        inRate.min = g.rate.min; inRate.max = g.rate.max; inRate.step = g.rate.step;
        if (st.rate < g.rate.min || st.rate > g.rate.max) st.rate = g.rate.def;
        inRate.value = st.rate;
      }

      function update() {
        st.gen = selGen.value; st.height = +selHeight.value; st.dieGb = +selDie.value;
        st.rate = +inRate.value; st.nStacks = +inN.value;
        st.bond = bondTC.checked ? 'tcncf' : 'mrmuf'; st.hybrid = hybridBox.checked;
        bondTC.disabled = st.hybrid; bondMR.disabled = st.hybrid;

        const g = GEN[st.gen];
        const bwPerStack = g.width * st.rate / 8; // GB/s
        const capPerStack = st.height * st.dieGb / 8; // GB
        outRate.textContent = fmt(st.rate, st.rate < 10 ? 1 : 0) + ' Gbps';
        outN.textContent = st.nStacks;

        rBw.textContent = bwPerStack >= 1000 ? fmt(bwPerStack / 1000, 2) + ' TB/s' : fmt(bwPerStack, 0) + ' GB/s';
        rCap.textContent = fmt(capPerStack, 0) + ' GB';
        const totBw = bwPerStack * st.nStacks, totCap = capPerStack * st.nStacks;
        rTotBw.textContent = totBw >= 1000 ? fmt(totBw / 1000, 2) + ' TB/s' : fmt(totBw, 0) + ' GB/s';
        rTotCap.textContent = totCap >= 1000 ? fmt(totCap / 1000, 2) + ' TB' : fmt(totCap, 0) + ' GB';

        xsec.innerHTML = '';
        const info = drawStack(xsec);
        rThk.textContent = fmt(dieThk(st.height), 0) + ' µm/die';
        rHeight.innerHTML = `${fmt(info.totalUm, 0)} / ${info.ceiling} µm` + (info.over ? ' <span style="color:var(--bad)">over</span>' : '');
        bondNote.textContent = bondText();
        buildTable();
      }
      [selGen].forEach(i => i.addEventListener('change', () => { refreshOptions(); update(); }));
      [selHeight, selDie, inRate, inN, bondTC, bondMR, hybridBox].forEach(i => i.addEventListener('input', update));

      el.append(controls, bondRow, bondNote, readout, formula,
        h('div', { class: 'w-grid2' }, h('div', null, xsec, legend), h('div', null, tableWrap)),
        h('div', { class: 'w-note' }, 'Die thickness and bond-line gap are fixed by industry practice at each stack height (Module 15 §4.4–4.5), not user-chosen; the widget solves the height budget so you can see when a bonding choice pushes a stack over the JEDEC ceiling — the real reason Samsung\'s 12-high TC-NCF took until September 2025 to qualify.'));
      selGen.value = st.gen;
      refreshOptions();
      update();
    }
  });
})();
