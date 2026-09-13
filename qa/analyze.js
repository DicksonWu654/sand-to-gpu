const ANALYZE = () => {
  const box = document.querySelector('#box') || document.querySelector('main');
  const bb = box.getBoundingClientRect();
  const report = { overlaps: [], overflow: [], tinyText: [], emptyArea: null };
  // overlapping SVG text
  const texts = [...box.querySelectorAll('svg text')].filter(t => t.getComputedStyle ? true : true).map(t => {
    const r = t.getBoundingClientRect(); return { t, r, s: (t.textContent || '').trim() };
  }).filter(x => x.s && x.r.width > 0 && x.r.height > 0);
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i].r, b = texts[j].r;
    const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (ox > 2 && oy > 2 && texts[i].t.ownerSVGElement === texts[j].t.ownerSVGElement) report.overlaps.push([texts[i].s.slice(0, 30), texts[j].s.slice(0, 30)]);
  }
  // text outside its svg viewport (clipped)
  for (const x of texts) {
    const svg = x.t.ownerSVGElement; if (!svg) continue; const sr = svg.getBoundingClientRect();
    if (x.r.left < sr.left - 1 || x.r.right > sr.right + 1 || x.r.top < sr.top - 1 || x.r.bottom > sr.bottom + 1) report.overflow.push('svg text clipped: ' + x.s.slice(0, 40));
    const matrix = x.t.getScreenCTM();
    const fs = parseFloat(getComputedStyle(x.t).fontSize) * (matrix ? Math.hypot(matrix.a, matrix.b) : 1);
    if (fs && fs < 11) report.tinyText.push(x.s.slice(0, 30) + ' @' + fs.toFixed(1) + 'px');
  }
  // any element wider than the widget body
  for (const el of box.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    const scrollParent = el.parentElement?.closest('.table-scroll, .diagram-scroll');
    if (scrollParent && scrollParent !== el && scrollParent.getBoundingClientRect().right <= bb.right + 2) continue;
    if (r.width && (r.right > bb.right + 2 || r.left < bb.left - 2)) { report.overflow.push((el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '')) + ' exceeds box by ' + Math.round(Math.max(r.right - bb.right, bb.left - r.left)) + 'px'); if (report.overflow.length > 12) break; }
  }
  // html text smaller than 11px
  for (const el of box.querySelectorAll('span,div,label,td,th,b,small,output,button')) {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs && fs < 10.5 && el.textContent.trim() && el.children.length === 0) { report.tinyText.push(el.textContent.trim().slice(0, 30) + ' @' + fs.toFixed(1) + 'px'); if (report.tinyText.length > 12) break; }
  }
  report.overlaps = report.overlaps.slice(0, 12);
  report.boxHeight = Math.round(bb.height);
  report.boxWidth = Math.round(bb.width);
  return report;
};

module.exports = ANALYZE;
