# Interactive Widget Spec — "Sand to GPU" learning site

Each widget is an interactive teaching visual embedded inside a module page. Widgets are plain
JavaScript (no frameworks, no external libraries, no fetch) that render into a container element.

## Contract

Each widget file lives at `site/widgets/<id>.js` and registers itself:

```js
// site/widgets/rayleigh.js
window.registerWidget('rayleigh', {
  title: 'Rayleigh Resolution Explorer',           // shown in the widget header
  caption: 'Drag λ, NA and k1 to see the printable half-pitch.', // one sentence under the title
  mount(el, ctx) {
    // el: an empty <div class="widget-body"> you own. Build your DOM/SVG/canvas inside it.
    // ctx.tokens(): returns live CSS colors: {ink, muted, ground, panel, line, accent, accent2, si, cu, euv, ok, warn, bad}
    // ctx.onTheme(fn): calls fn() whenever the theme changes (re-read tokens & repaint).
    // ctx.fmt(n, digits): number formatter with thin-space thousands separators.
    // ctx.h(tag, attrs, ...children): tiny DOM helper. attrs may include {class, style, on:{click:fn}, ...}
    // ctx.svg(tag, attrs, ...children): same, in the SVG namespace.
    // Return an optional cleanup function.
  }
});
```

## Rules
1. Use ONLY colors from `ctx.tokens()` (or `var(--...)` CSS custom properties: `--ink --muted --ground --panel --line --accent --accent2 --si --cu --euv --ok --warn --bad`). Never hard-code hex colors. The page has light and dark themes; the widget must look right in both. If you draw on canvas, re-read tokens on `ctx.onTheme`.
2. Responsive: the container is 100% width (roughly 560–760 px on desktop, ~340 px on phone). Use SVG with `viewBox` + `width:100%` or a canvas that resizes with `ResizeObserver`. Never overflow horizontally.
3. Controls: use native `<input type=range>`, `<select>`, `<button>`; wrap in `<div class="w-controls">` with `<label class="w-ctl"><span>Label</span><input ...><output>value</output></label>` so the shared stylesheet styles them. Show the live value next to each slider with units.
4. Show numbers with units and reasonable precision. A readout row: `<div class="w-readout"><div class="w-stat"><b>value</b><span>label</span></div>...</div>`.
5. Animations: `requestAnimationFrame`; respect `matchMedia('(prefers-reduced-motion: reduce)')` (offer a Play/Pause button, default paused when reduced motion). Keep CPU cost low when not visible: stop the rAF loop when `el` is not in the viewport (IntersectionObserver) or when a returned cleanup runs.
6. Step-through widgets (process flows): a `<div class="w-steps">` with Prev/Next buttons, a step counter "Step 3 / 9", the current step's name and 1–2 sentence explanation, and the SVG cross-section updating per step. Also allow clicking a step dot to jump.
7. Physics/economics must be CORRECT and use the real formulas and realistic default values from the course module. Cite the formula in a small `<div class="w-formula">` (plain text or simple HTML, e.g. `CD = k<sub>1</sub>·λ / NA`).
8. Text inside SVG: use `font-family: var(--mono)` for numbers and `var(--sans)` for labels via the `font-family` attribute; sizes ≥ 11 px at the rendered size. Text must not overlap shapes or other labels.
9. Each file must be self-contained, ~150–400 lines, and must not throw if mounted twice or if unmounted mid-animation.
10. No `alert`, no `console.log` noise, no global variables other than the registration call. Wrap everything in an IIFE.
11. Keyboard: all controls must be native elements so they are keyboard-accessible; step buttons should be `<button>`.

## Shared CSS classes available (already styled by the page)
`.w-controls .w-ctl .w-readout .w-stat .w-steps .w-step-nav .w-step-dot .w-step-dot.active .w-formula .w-legend .w-legend-item .w-btn .w-btn.primary .w-note .w-grid2 .w-svg`
(`.w-svg` = a block SVG with `width:100%; height:auto`.)

## Testing
Open `site/index.html` in a browser (file://) and navigate to the module; the widget is mounted in place. There is a helper page `site/widget-test.html?w=<id>` that mounts a single widget by id on a blank page in both themes side by side.
