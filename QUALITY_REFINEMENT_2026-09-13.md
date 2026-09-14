# Further quality refinement

This pass follows signed commit `84e2522` and responds to the request to find more bugs and improve the presentation. It keeps the established visual identity and existing course content.

## Interaction corrections

- Returning from a section anchor to the root of the same chapter preserves the mounted lab and its current inputs.
- Navigation from the bottom of a long chapter resets scroll immediately before initializing destination progress. The destination is no longer incorrectly marked read using the previous chapter's scroll position.
- Malformed percent-encoded anchors no longer throw an uncaught URI error.
- Mobile curriculum navigation manages keyboard focus while the overlay is open. Desktop navigation remains a normal sidebar.
- Search exposes its active keyboard selection to assistive technology and handles focus return when dismissed.
- Repeated section links still jump to their target; Back/Forward preserves same-chapter lab state. Reselecting the active course track retains the current chapter highlight and accessible current-page state.

## Presentation

Chapter openings have a stronger focal point and clearer stage navigation. Sidebar and section-rail text are more legible, phone toolbar controls have larger touch targets, and dark diagrams have clearer edges. The prose measure and teaching depth remain intact.

Wide prose tables now preserve readable column widths instead of squeezing explanatory text into tall slivers. A scroll hint makes offscreen columns discoverable; overflowing wrappers are labeled and keyboard focusable. The final column was manually reviewed and reached with real keyboard scrolling at a 320px viewport.

The fresh diagram review concentrates on Module 01 and selected mechanisms in Modules 02 and 03. It extends the prior audit rather than claiming every deep-course figure has received a new full-size scientific review. Concrete findings include indistinguishable quartz/carbon drawings, gas arrows crossing solid charge, and inappropriate crucible, solar-cell and feedstock symbols.

The review covers 21 figures: all ten in Module 01, six in Module 02 and five in Module 03. Sixteen were corrected through fourteen lesson-data changes and two shared scene corrections. The new drawings clarify float-zone continuity, the Dash-neck load path, lapping contact, and damage removal within the silicon. Phone convergence diagrams now stack readable inputs above a clearly connected result.

## Validation

| Check | Result | Evidence |
|---|---|---|
| Navigation and compatibility | 12 focused browser regressions pass, including lab state, premature read-marking, keyboard search/menu behavior, history and stored quiz compatibility. | `qa/reports/navigation-regression.json` |
| Visual shell | 91 targeted cases pass, including narrow layouts, chapter plates, control sizes and table scrolling. | `qa/reports/shell-polish.json`, `qa/reports/SHELL_POLISH_2026-09-13.md` |
| Existing shell/CSS regression | 24 cases pass; 477 selectors and 1,424 declarations accepted. | `qa/reports/round2-shell.json` |
| Material/crystal/wafer review | 21 figures reviewed; 16 corrected. The ledger records actual screenshot and source-review scope and limitations. | `qa/reports/deep-material-review.json` |
| Final build and figures | Coverage passes for all 352 figures; source prose and headings preserved across 32 lessons. All 1,408 width/theme geometry cases pass. | `qa/reports/section-figures.json`, `qa/reports/figure-geometry.json` |

The root reviewer inspected before/after Module 01 openings, desktop and phone dark/light examples, the problematic phone table, and selected corrected material/crystal/wafer drawings at full size. Generated screenshots remain outside Git. Browser accessibility checks cover semantics and keyboard behavior; physical touch devices and screen readers were not directly tested.

Reproduce the app checks with the preview running:

```sh
node qa/navigation-regression.js
node qa/shell-polish.js
node qa/round2-shell.js
npm run check
node qa/figure-geometry.js
```

## September 14: quieter reading controls and track-aware navigation

Following reader feedback, this pass removes the chapter’s “visuals to explore” link and the decorative hero’s “Conceptual schematic · not to scale” caption. It also removes the repeated “Follow your curiosity” rail message, the survey sidebar’s duplicate chapter-count line, the home footer slogan and the generic home-stage caption. Useful navigation, control instructions, source attribution and scientific qualifications in the actual lessons and figures remain.

The five-stage chapter navigation now uses the active course track. Survey links stay in the survey; explicitly labelled links into a deep-dive chapter still work. Stage indicators reflect the relevant topic rather than interpreting survey chapter numbers as deep-dive module numbers.

The stage entries are S02/S03/S06/S09/S10 for the survey and M01/M05/M11/M16/M19 for the deep dive. The “Wafer” stage means wafer patterning and fab processing, which begins in S03 or M05. Memory remains under Devices; Package begins with the M16 fundamentals rather than skipping ahead to M17. Overview, economics and reference chapters do not falsely highlight a manufacturing stage.

The header’s completion percentage also follows the active track. Previously, a reader with two of ten survey chapters completed could see the deep-dive percentage instead. Completing a survey chapter now refreshes the header as well as the sidebar.

This is a reader-shell change. Authored lessons, copied Markdown and narration extraction are preserved, so existing recordings require no regeneration. Targeted browser evidence is recorded with the current QA reports; the earlier broad visual and scientific review above remains a separate historical pass.

Validation covers all 32 chapter-stage states, 40 actual stage-link clicks across desktop and phone layouts, and separate survey/deep-dive completion values. A seeded survey moves from 20% to 30% immediately after another chapter is completed; the deep-dive value remains 5% for the same saved browser state. Old direct links to numbered visuals still resolve even though their toolbar shortcut was removed. Reproduce these checks with a source preview running using `QA_BASE_URL=http://127.0.0.1:8793 node qa/reader-cleanup.js`; results are in `qa/reports/reader-cleanup.json`.

All 11 targeted check groups passed. Twelve screenshots were inspected across both themes and desktop/phone layouts, including the shortened home footer and survey chapter controls. Course and figure checks also passed.

After promotion, the static preview also passed five real survey stage clicks and immediate survey/deep-dive progress checks; see `qa/reports/reader-cleanup-live.json`.
