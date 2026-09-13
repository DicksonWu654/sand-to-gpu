# Widget Quality Standard (v2)

The audience is a smart non-expert (a programmer with school-level physics and chemistry) who is
using these visuals to understand a manufacturing process for the first time. A widget passes only
if a person who has never seen the real machine could look at it and understand what the machine
does and why the numbers matter. "Renders without errors" is the floor, not the bar.

## The harness
Serve the site (a server is already running at http://localhost:8790; if it is not, run
`node serve.js` in the base dir in the background). Then:

    node qa/render.js widget <id>                 # renders at 760 px and 360 px, dark and light
    node qa/render.js widget <id> --scenario qa/scenarios/<id>.json

It writes PNGs to qa/shots/ and prints a JSON report (console errors, overlapping SVG text, clipped
text, elements overflowing the box, tiny text, hard-coded colors). Look at EVERY PNG with the Read
tool; the report catches only mechanical faults, your eyes catch the rest. A scenario file is a JSON
list of steps: {"click": "css"}, {"set": "css", "value": 5}, {"hover": "css"}, {"wait": 1500},
{"shot": "name"}. Write one for your widget that exercises its main states (play the animation for a
few seconds, step to the middle and end of a step-through, move each slider to an extreme, switch
each preset) so the screenshots show the widget doing its job, not only its idle state.

## Pass criteria (all required)
1. **Teaches at a glance.** The main drawing is a recognisable schematic of the real thing with the
   important parts drawn and labelled in place (not only in a legend). A CZ puller shows the chamber,
   heater, susceptor, crucible, melt, seed, neck, crown, body; an EUV source shows droplets, laser,
   plasma, collector; a package cross-section shows every layer with its name. Prefer clear geometry
   over decoration.
2. **First frame is meaningful.** Before any interaction the widget already shows a representative,
   informative state (an animation starts mid-process or on a preset that looks like the real thing,
   a step-through starts on a step that shows structure, calculators start on realistic defaults).
   No large blank areas; the drawing fills its space.
3. **Numbers are right and readable.** Formulas are correct and shown; readouts have units and sane
   precision; extremes of every slider give sensible output (no NaN, Infinity, negative counts,
   overlapping bars, labels off-chart). Cross-check key defaults against the course module.
4. **Text never collides or clips.** No overlapping labels, nothing cut off at the SVG edge, no text
   under 11 px at the rendered size, legible in BOTH themes (check contrast of every color pair; no
   dark text on dark, no hard-coded hex colors; use the tokens).
5. **Works at 360 px wide.** Controls wrap, drawings scale, tables scroll inside their own container.
6. **Interaction is discoverable and responsive.** Controls have labels and live values; step-throughs
   have a visible step counter, Prev/Next, and clickable dots; hover targets have a visible hover
   state; Play/Pause reflects state. Reduced-motion is respected (animations start paused there).
7. **Explains itself.** A one-line caption states what to do and what to notice. Each step or state
   has a 1–2 sentence explanation aimed at a non-expert (define a term the first time it appears).
8. **No console errors or warnings**, no ResizeObserver loops, no leaks (cleanup function returned).

## Common failures to look for
Empty canvas at t=0 · drawing shapes smaller than their labels · legend-only labelling · ×1000 unit
slips · sliders whose extremes break the layout · a step-through whose drawing does not change
between steps · light theme with invisible strokes · a 360 px render with controls spilling out ·
chart axes with no units · text rendered at 8–9 px inside SVG · hover panels that overlay controls ·
identical-looking colors for different materials.

## Fix rules
Edit only your assigned file site/widgets/<id>.js (and its qa/scenarios/<id>.json). Keep the
contract in site/WIDGET_SPEC.md (registerWidget, ctx tokens, shared CSS classes). Improving the
drawing is in scope: redraw it if that is what it takes. Keep files self-contained; no libraries.
Re-render after every change and look at the PNGs again. You are done only when every PNG meets
the criteria above.
