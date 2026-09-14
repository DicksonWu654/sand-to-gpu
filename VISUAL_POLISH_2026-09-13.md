# Second visual refinement

> Historical validation record. The subsequent diagram audit found scientific drawing errors and internal SVG clipping that these passing outer-bound checks did not detect. See `DIAGRAM_AUDIT_2026-09-13.md` for the corrective pass and its review scope.

This pass builds on signed commit `0de5ea2` and the first atlas refactor. It preserves the approved visual identity while improving the drawings, chapter openings, reading details and interactive labs.

## Delivered

- Added 15 native apparatus illustrations and tailored opening plates across all 32 chapters. The homepage journey now has clearer connections, and chapter text uses a restrained opening drop cap. Navigation uses the source section number once, with quiet markers for unnumbered sections.
- Refined all 352 section figures: direct explanations beside components, compact desktop comparisons, readable phone layouts, aligned physical cross-sections, and explicit network/branch relationships. Scale comparisons no longer imply inappropriate physical containment.
- Added five source-grounded apparatus scenes in `course/visuals/scenes.js`: permeable furnace charge, submerged-arc furnace, Siemens purification, fluidized-bed growth, and Czochralski pulling. Their physical contracts and selection rules are documented in `course/visuals/SCHEMA.md`.
- Reworked the purity, CZ puller, wafer-slicing and ALD labs around mechanisms and current-state explanations. CZ has a separate seed-neck inspection view on phones. The supply-chain overview is more compact on phones.
- Corrected invalid CSS pseudo-selectors, small labels, slicing/CZ annotation collisions and duplicate EUV SVG marker IDs. The original scientific models and course prose remain intact.

## Validation

| Check | Result | Evidence |
|---|---|---|
| Final build, static checks and source preservation | Pass: 352 figures, 32 original lessons/headings, 176 quiz questions, 57 widget placements, 1,140 accessible SVGs | `qa/reports/section-figures.json` |
| All figure layouts, two widths and two themes | 1,408/1,408 pass | `qa/reports/figure-layout.json` |
| Integrated page configurations | 132/132 pass | `qa/reports/atlas-refactor-pages.json` |
| Focused shell, CSS, labels and navigation | 24/24 pass; 466 selectors and 1,391 declarations accepted | `qa/reports/round2-shell.json` |
| Existing shell behavior | 8/8 pass | `qa/reports/shell-check.json` |
| Four newly refined labs | 16/16 pass; 248 assertions and 68 analyzed states | `qa/reports/round2-labs.json` |
| Flagship lab regression | 32/32 pass; 344 assertions and 96 analyzed states | `qa/reports/flagship-refactor.json` |
| EUV marker scoping | 48 view switches and 384 reference/fill checks pass | `qa/reports/round2-euv-markers.json` |
| Actual-page dark figure samples | 16/16 pass, with manual mobile review of all eight figure families | `qa/reports/round2-figure-visual.json` |

The broad page sweep was followed by focused checks for the final marker and figure refinements. Final source and all-figure checks ran after the final content build. Checks report no document overflow, runtime/local-load errors, broken internal links, missing accessible labels, or tested lab geometry/lifecycle failures. Representative desktop, phone, light and dark screenshots were also inspected; screenshots remain outside Git.

With the preview running, reproduce the relevant checks with:

```sh
npm run build
npm run check
node qa/shell.js
node qa/refactor-pages.js
node qa/round2-shell.js
node qa/figure-layout.js
node qa/round2-labs.js
node qa/flagship-refactor.js
node qa/round2-euv-markers.js
```

These are source-grounded conceptual illustrations and browser checks, not a new exhaustive scientific fact review. The original course review notes and uncertainty statements still apply.
