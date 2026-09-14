# Authored section figures

Create `lessons/m00.json` … `m21.json`, `s01.json` … `s10.json` as arrays. Match each entry's `section` to the exact inventory ID. No generated fallback figures.

```json
[{"section":"what-a-chip-is-physically","family":"layers","title":"A chip is a connected stack","caption":"Devices switch current near the silicon surface; contacts and metal layers connect them. The package connects the die to the wider system. Schematic, not to scale.","nodes":[{"label":"Metal interconnect","detail":"Routes signals and power above the devices","glyph":"wires"},{"label":"Transistor layer","detail":"Gates control conduction near the surface","glyph":"transistor"},{"label":"Silicon substrate","detail":"Mechanical and crystalline foundation","glyph":"wafer"}],"edges":[]}]
```

Families: `flow` (ordered transformations), `cycle` (repeated processing with return arrow), `layers` (physical cross-section stack; nodes TOP TO BOTTOM), `branch` (several inputs converge on LAST node), `network` (explicit source/target edge topology), `compare` (distinct mechanisms side-by-side), `scale` (qualitative object levels, small to large; not automatic physical containment), `apparatus` (connected physical equipment; nodes in process order).

Each node: `label` short, `detail` one explanatory sentence, `glyph` one of wafer/crystal/furnace/gas/mask/light/film/etch/transistor/wires/memory/package/test/rack/chip/clean/design/queue/heat/material. Glyphs show a small physical mechanism rather than text boxes. 3–5 nodes preferred. `edges` optional array `{from:0,to:2,label:"material"}`; network requires explicit edges. Optional `note` for limitations. Rendered labels are direct HTML labels alongside the mechanism; topology and apparatus scenes also use SVG labels. Keep mechanism explanations next to the drawing instead of repeating numbered labels below it. All captions are source-grounded conceptual schematics. Keep authored figures scientifically meaningful; no unsupported quantitative claims.

## Mechanism variants

`node.variant` selects a specific physical drawing. Unknown variants fail validation; semantic aliases are explicit in `render.js`. Use a variant whenever a comparison depends on a structural difference. Available mechanism groups include:

- Transistors: `planar`, `finfet`, `gaa`, `forksheet`, `cfet`, `backside-power`; terminal components `source`, `gate`, `channel`, `drain`, `access`; `cmos`.
- Memory: `dram`, `capacitor`, `nand`, `3d-nand`, `3d-dram`, `hbm`, `sram`, `repair`, `sense-amplifier`.
- Packages: `wire-bond`, `flip-chip`, `microbump`, `hybrid-bond`, `cowos-s`, `cowos-r`, `cowos-l`, `fan-out`, `mr-muf`, `tc-ncf`.
- Equipment: `cz-puller`, `float-zone`, `tube-furnace`, `plasma-chamber`, `fbr`, `mass-analyzer`.
- Material and process structure: `lattice`, `dopant`, `impurity`, `packed-bed`, `carbon`, `pvd`, `cvd`, `ald`, `isotropic`, `anisotropic`, `deep-hole`, `released`, `superlattice`, `tensile`, `compressive`.
- Interconnect: `wide`, `narrow`, `via`, `via-chain`, `liner`, `void`, `hillock`, `comb`, `damascene`, `frontside`, `backside`, `airgap`.
- Test and optical mechanisms: `optical`, `electron`, `probe`, `cantilever`, `vertical`, `mems`, `instrument`, `bright-field`, `dark-field`, `aligned`, `offset`.

The MOSFET terminal network has a dedicated single-device cross-section. Wiring layer stacks show metal traces and connecting vias. `compare` and `apparatus` use responsive per-component drawings with direct labels; `network` preserves authored topology; scale figures compare qualitative object levels, not a quantitative size plot or an assertion that every object physically contains the preceding one.

Physical-stack discipline: `layers` must list genuine vertical levels in top-to-bottom order. Combine interleaved materials or repeated interfaces in a clearly described tier. Use `network`, `branch` or `compare` for functional relationships; do not imply that a supplier, process step or power circuit is a physical layer. Apparatus arrows indicate a connected process; use `compare` for independent test structures or ingredients.

## Build and validation

`node build.js` builds all available authored figures and reports coverage without inventing missing entries. `node course/visuals/render.js --strict` requires all 352 inventory sections and validates IDs, families, labels, variants and edges. `npm run check` includes this strict gate and `qa/section-figures.js`, which checks the built DOM for correct section ownership, unique SVG IDs, accessible labels, captions, unchanged course prose and unchanged heading/quiz contracts. Reports: `coverage.json` and `../../qa/reports/section-figures.json`.

## Authored apparatus scenes

An optional `scene` property selects a source-authored drawing from `scenes.js`. The figure keeps its original `family`, exact `section`, source provenance, nodes, caption and limitation note. Unknown scene names fail strict validation. The renderer gives the scene an accessible SVG title/description and uses a scene-authored numbered key for spatial annotations. The authored nodes remain in its accessible description; do not repeat the same information in a second visible legend.

Available scene contracts:

| Scene | Intended source section | Physical relationships shown |
| --- | --- | --- |
| `charge-bed` | m01, quartz and quartzite | Solid charge pieces leave open paths for evolved gas. |
| `arc-furnace` | m01, carbothermic reduction | Powered electrodes enter the charge; gas exits upward while collected silicon follows a separate tapping path. |
| `siemens` | m01, Siemens process | Chlorosilane formation precedes fractionation and deposition on heated rods; supporting gas streams return for recovery/reuse. |
| `fluidized-bed` | m01, FBR granular polysilicon | Precursor enters below a heated suspended particle bed; gas and granular product have separate outlets. |
| `cz-puller` | m02, anatomy of the CZ puller | The seed and shaft pull crystal from a melt held in quartz, with a surrounding heater and managed gas atmosphere. |

These are conceptual apparatus drawings, not construction specifications. Preserve distinct inputs, equipment parts and simultaneous outlets; they are not interchangeable stages in a linear sequence. Add scenes only when a source section benefits from a spatial mechanism, and review direct labels at both 1280 px and 375 px in light and dark themes. Do not add unverified operating values or imply dimensional accuracy.

For ordinary figures, `apparatus` now presents connected-equipment components without inventing a process order. `flow` retains numbered order; `cycle` has a return indication; branches converge; networks retain explicit edges. Three-part comparisons share a desktop row and become directly labeled rows on phones. Layer geometry and its explanation share matching vertical levels; vertical dimensions remain schematic rather than a scale representation.

Run `node qa/figure-layout.js` after renderer or figure-style changes. It checks all 352 authored figures in both themes at desktop and phone widths (1,408 figure cases), including local overflow, three-way comparison layout and physical-layer label alignment. This complements the source-preservation check and the full routed page sweep; layout checks do not replace scientific review.


## Diagram audit contracts (2026-09-14)

- `scene` may also select `die-section`, `interconnect-section`, `package-section`, `generic-package-section`, `hbm-section`, `leadframe-section`, or `capacitor-section`. These draw connected physical structures. `package-section` specifically includes logic plus HBM; use `generic-package-section` for a single die with substrate and board. `capacitor-section` is a planar interface slice, not a claim about the full cylinder geometry of a DRAM capacitor.
- A scene returns `{art, height, key}`. `key` is an ordered array of plain-language annotations, indexed by visible numbered callouts in `art`. Keep callouts inside the viewBox, outside unrelated geometry, and use a leader when position alone is ambiguous. Keys are HTML so they retain readable text on phones.
- A `network` edge accepts `bidirectional: true` for signal exchange, or `undirected: true` for physical association/attachment. Omit both for a directed flow. Do not combine them. Direction describes the specific authored relationship, not every possible transaction between the nodes. Separate edges with different labels (for example scan apply versus capture) remain distinct lanes.
- Networks use separate connection lanes, with endpoint labels outside the SVG and a relationship description spanning the phone row. Do not restore a universal ring with straight connections through labels.
- `cycle.returnLabel` states the actual return relationship or condition. Qualification acceptance and optional respins must not imply unconditional repetition. Use `flow` or explicitly authored conditional edges where there is no cycle.
- Bulk silicon remains a silicon region; organic substrates and interposers may carry routing. An enclosing mold cannot be represented faithfully as an unrelated flat slab above the die. Small glyph variants and full scenes must agree: FinFET gates cover fin top and sides, solder joints touch both faces, and hybrid-bond dielectrics meet at the same plane as embedded contacts.
- Run `node qa/figure-geometry.js` for actual SVG font-size, label-to-label intersection, viewBox clipping, and relationship-label collision checks. It records representative screenshots under ignored `qa/shots/geometry/`. These checks do not establish technical correctness or certify unreviewed geometry. Keep the manual review scope separately in `qa/reports/deep-diagram-audit.json`.
