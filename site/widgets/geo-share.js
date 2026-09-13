/* geo-share — "Who Makes What, Where" (Module 20) */
(function () {
  'use strict';
  // Taiwan and Netherlands never share a bar below, so they can safely reuse the
  // two look-alike ambers (--accent / --warn) without becoming confusable in practice.
  const COUNTRIES = {
    TW: { name: 'Taiwan', v: 'var(--accent)' },
    KR: { name: 'Korea', v: 'var(--accent2)' },
    JP: { name: 'Japan', v: 'var(--cu)' },
    NL: { name: 'Netherlands', v: 'var(--warn)' },
    US: { name: 'United States', v: 'var(--ok)' },
    CN: { name: 'China', v: 'var(--si)' },
    DE: { name: 'Germany', v: 'var(--ink)' },
    OT: { name: 'Other', v: 'var(--muted)' },
  };
  // Shares are analyst estimates (TrendForce/SEMI/company filings), Module 20 — all approximate unless noted exact.
  const LAYERS = [
    { id: 'euv', label: 'EUV lithography', seg: [['NL', 100, true, 'ASML — sole supplier']] },
    { id: 'duv', label: 'DUV litho (immersion)', seg: [['NL', 85, false, 'ASML'], ['JP', 15, false, 'Nikon, Canon']] },
    { id: 'wfe', label: 'Wafer fab equipment', seg: [['US', 40, false, 'Applied Materials, Lam Research, KLA'], ['JP', 30, false, 'Tokyo Electron, Screen, Advantest, Disco'], ['NL', 20, false, 'ASML, ASM International, Besi'], ['OT', 10, false, 'various']] },
    { id: 'wafers', label: 'Silicon wafers', seg: [['JP', 55, false, 'Shin-Etsu, SUMCO'], ['TW', 15, false, 'GlobalWafers'], ['KR', 12, false, 'SK Siltron'], ['DE', 12, false, 'Siltronic'], ['OT', 6, false, 'various']] },
    { id: 'resist', label: 'Photoresist', seg: [['JP', 90, false, 'JSR, TOK, Shin-Etsu, Fujifilm'], ['OT', 10, false, 'DuPont, Merck/EMD']] },
    { id: 'logic5', label: 'Leading-edge logic ≤ 5 nm', seg: [['TW', 90, false, 'TSMC'], ['KR', 8, false, 'Samsung Foundry'], ['US', 2, false, 'Intel Foundry (18A)']] },
    { id: 'foundry', label: 'All foundry (every node)', seg: [['TW', 65, false, 'TSMC, UMC, PSMC, VIS'], ['CN', 12, false, 'SMIC, Hua Hong'], ['KR', 8, false, 'Samsung Foundry'], ['US', 4, false, 'GlobalFoundries'], ['OT', 11, false, 'various']] },
    { id: 'dram', label: 'DRAM', seg: [['KR', 70, false, 'Samsung, SK hynix'], ['US', 25, false, 'Micron'], ['CN', 5, false, 'CXMT']] },
    { id: 'nand', label: 'NAND', seg: [['KR', 50, false, 'Samsung, SK hynix'], ['JP', 20, false, 'Kioxia'], ['US', 25, false, 'Micron, Western Digital'], ['CN', 5, false, 'YMTC']] },
    { id: 'hbm', label: 'HBM', seg: [['KR', 90, false, 'SK hynix, Samsung'], ['US', 10, false, 'Micron']] },
    { id: 'osat', label: 'OSAT / advanced packaging', seg: [['TW', 52, false, 'ASE, SPIL, TSMC CoWoS/SoIC'], ['CN', 25, false, 'JCET, Tongfu'], ['US', 10, false, 'Amkor'], ['OT', 13, false, 'Korea, Japan, SE Asia']] },
    { id: 'eda', label: 'EDA', seg: [['US', 95, false, 'Synopsys, Cadence'], ['OT', 5, false, 'Siemens EDA (Germany)']] },
    { id: 'fabless', label: 'Fabless design', seg: [['US', 65, false, 'NVIDIA, AMD, Qualcomm, Broadcom, Apple'], ['TW', 12, false, 'MediaTek'], ['CN', 15, false, 'various fabless'], ['OT', 8, false, 'various']] },
    { id: 'demand', label: 'End demand', seg: [['CN', 30, false, 'phones, PCs, servers assembled there'], ['US', 25, false, 'hyperscalers, PCs, autos'], ['OT', 45, false, 'Europe, rest of Asia, everywhere else']] },
  ];

  window.registerWidget('geo-share', {
    title: 'Who Makes What, Where',
    caption: 'Each bar is one supply-chain layer. Hover a segment for the exact share and leading firms; click a country below to trace it through every layer.',
    mount(el, ctx) {
      const { h, svg, fmt } = ctx;
      let activeCountry = null;
      const segEls = [];
      const tip = h('div', { class: 'w-note', style: { minHeight: '18px' } }, 'Hover or focus a segment for detail.');

      const rows = h('div', { style: { display: 'grid', gap: '7px' } });
      LAYERS.forEach(layer => {
        const label = h('div', { style: { fontSize: '12.5px', fontFamily: 'var(--sans)' } }, layer.label);
        const barSvg = svg('svg', { viewBox: '0 0 400 22', style: { display: 'block', width: '100%', height: '22px' }, role: 'img', 'aria-label': layer.label + ' market share by country' });
        let x = 0;
        layer.seg.forEach(([cc, pct, exact, companies]) => {
          const w = pct * 4;
          const rect = svg('rect', { x, y: 0, width: Math.max(0, w - 0.6), height: 22, rx: 2, fill: COUNTRIES[cc].v, tabindex: 0, 'aria-label': `${COUNTRIES[cc].name} ${exact ? '' : '~'}${pct}% — ${companies}` });
          rect.addEventListener('mouseenter', () => showTip(layer, cc, pct, exact, companies));
          rect.addEventListener('focus', () => showTip(layer, cc, pct, exact, companies));
          rect.addEventListener('click', () => showTip(layer, cc, pct, exact, companies));
          barSvg.append(rect);
          segEls.push({ el: rect, cc });
          x += w;
        });
        rows.append(h('div', { style: { display: 'grid', gridTemplateColumns: '168px 1fr', gap: '10px', alignItems: 'center' } }, label, barSvg));
      });

      function showTip(layer, cc, pct, exact, companies) {
        tip.textContent = `${layer.label} — ${COUNTRIES[cc].name}: ${exact ? '' : '~'}${pct}% — ${companies}`;
      }

      const legend = h('div', { class: 'w-legend' });
      const legendBtns = new Map();
      Object.keys(COUNTRIES).forEach(cc => {
        const c = COUNTRIES[cc];
        const btn = h('button', { class: 'w-btn', style: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 9px' } },
          h('i', { style: { width: '12px', height: '12px', borderRadius: '3px', display: 'inline-block', background: c.v } }), c.name);
        btn.addEventListener('click', () => { activeCountry = activeCountry === cc ? null : cc; applyFilter(); });
        legend.append(btn); legendBtns.set(cc, btn);
      });

      function applyFilter() {
        segEls.forEach(({ el: rect, cc }) => {
          const dim = activeCountry && cc !== activeCountry;
          rect.setAttribute('opacity', dim ? 0.18 : 1);
        });
        legendBtns.forEach((btn, cc) => btn.classList.toggle('primary', cc === activeCountry));
        if (activeCountry) {
          const totals = LAYERS.map(l => { const s = l.seg.find(s => s[0] === activeCountry); return s ? `${l.label} ${s[2] ? '' : '~'}${s[1]}%` : null; }).filter(Boolean);
          tip.textContent = `${COUNTRIES[activeCountry].name}: ` + (totals.length ? totals.join(' · ') : 'negligible in every layer shown');
        } else {
          tip.textContent = 'Hover or focus a segment for detail.';
        }
      }

      el.append(rows, legend, tip,
        h('div', { class: 'w-note' }, 'Shares are analyst estimates (TrendForce, SEMI, company filings) as of ~2025; "~" marks an approximation. Source: Module 20.'));
      return () => {};
    }
  });
})();
