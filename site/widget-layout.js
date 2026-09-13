/* Keep dense schematic labels readable when a phone cannot fit the whole drawing. */
(() => {
  window.prepareWidgetDiagrams = function (body) {
    // Own regions, not SVG nodes: some widgets replace their SVG on every step.
    const regions = new Map();
    let frame = 0, disposed = false;
    function update() {
      frame = 0;
      if (disposed || !body.isConnected) return;
      for (const [region, info] of regions) {
        if (!body.contains(region)) {
          info.hint.remove(); regions.delete(region);
        } else if (!region.querySelector('svg.w-svg[viewBox]')) {
          region.replaceWith(...region.childNodes); info.hint.remove(); regions.delete(region);
        }
      }
      for (const svg of body.querySelectorAll('svg.w-svg[viewBox]')) {
        const vb = svg.viewBox.baseVal;
        if (!vb.width || !vb.height) continue;
        let info = regions.get(svg.parentElement);
        // Work in SVG coordinates, including nested transforms. Only dense diagrams get a viewport.
        const matrix = svg.getScreenCTM();
        const scale = matrix ? Math.hypot(matrix.a, matrix.b) : 1;
        const sizes = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim() && t.getBoundingClientRect().width).map(t => {
          const tm = t.getScreenCTM();
          return parseFloat(getComputedStyle(t).fontSize) * (tm ? Math.hypot(tm.a, tm.b) / scale : 1);
        }).filter(n => n > 0);
        if (!sizes.length) continue;
        const minWidth = Math.ceil(vb.width * 11.1 / Math.min(...sizes));
        const available = info ? info.region.clientWidth : svg.getBoundingClientRect().width;
        if (!info && minWidth <= available + 1) continue;
        if (!info) {
          const region = document.createElement('div'); region.className = 'diagram-scroll';
          region.setAttribute('role', 'region');
          const hint = document.createElement('p'); hint.className = 'diagram-scroll-hint';
          hint.textContent = '↔ Scroll or use arrow keys to explore the full diagram.';
          svg.before(region); region.append(svg); region.after(hint);
          info = { region, hint }; regions.set(region, info);
        }
        info.region.setAttribute('aria-label', (svg.getAttribute('aria-label') || 'Interactive diagram') + '. Scroll horizontally to see the whole diagram.');
        const width = Math.max(info.region.clientWidth, minWidth);
        if (svg.style.width !== width + 'px') svg.style.width = width + 'px';
        svg.style.maxWidth = 'none';
        const scrolls = minWidth > info.region.clientWidth + 1;
        info.hint.hidden = !scrolls;
        info.region.tabIndex = scrolls ? 0 : -1;
      }
    }
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
    const mutation = new MutationObserver(schedule);
    mutation.observe(body, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule); resize.observe(body);
    schedule();
    return () => { disposed = true; cancelAnimationFrame(frame); mutation.disconnect(); resize.disconnect(); regions.clear(); };
  };
})();
