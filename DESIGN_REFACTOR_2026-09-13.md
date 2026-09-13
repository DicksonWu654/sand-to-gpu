# Visual and layout refactor

## Intended experience

An engineering atlas for a serious learner: compelling chapter openings, concrete illustrations near the explanation they support, comfortable long-form reading, and interactive mechanisms that reveal their subject before their controls. Preserve the complete course and its uncertainty notes.

## Design direction

- Warm ivory and ink in light mode; deliberate charcoal surfaces in dark mode. Copper provides emphasis, with restrained silicon-blue/teal and material colors inside diagrams.
- Strong editorial hierarchy and generous whitespace. Use prose at a comfortable measure inside a wider visual surface. Avoid applying the same boxed-card treatment to every element.
- Give the homepage an immediately visible, meaningful silicon-to-system illustration and clear paths into the survey and deep course.
- Use stage context and a substantial opening visual for chapters. Keep navigation focused on H2 sections; expose H3 detail in context.
- Each of the 352 substantive body H2 sections receives an explicitly authored teaching figure. Reference, bibliography, summary and prerequisite material gets appropriate typography/table/list treatment rather than meaningless diagrams.
- Figures need meaningful components and relationships, not generic keyword flowcharts. Captions explain what the diagram helps the reader understand. Geometry is schematic unless quantitative scale is explicitly supported.
- Interactive labs place the mechanism first, with a compact control/readout area and supplementary reference details. Model caveats remain visible beside the model.

## Implementation boundaries

Keep the existing routes, heading IDs, browser progress keys, search, quiz semantics and widget lifecycle contract. Refactor reusable rendering/components and the shared design system without a gratuitous framework migration. Section figures use their own manifest and renderer, separate from interactive widget registrations.

Coverage must be measured against actual section IDs. Insert figures and widgets within their owning section after its opening explanation. Validate responsive layouts and actual dark/light themes, repeated widget updates, keyboard access, and stable cleanup.

## Review discipline

This is a visual and software refactor, not a new scientific fact-verification claim. Use the corrected course as the source; preserve its uncertainties. Inspect representative full-resolution screenshots and interaction states in addition to automated checks. Commit completed changes with the configured GPG identity to the existing private repository.

## Delivered

The homepage, chapter openings, navigation, reading surfaces, tables, quizzes, and shared lab styles now use the atlas design. `site/course-shell.js` supplies reusable opening illustrations and stage context. Same-chapter anchor navigation preserves lab state; pending scroll callbacks are cancelled when leaving a chapter.

There are 352 authored teaching figures: 292 across the deep modules and 60 across the survey. `course/visuals/lessons/` stores source-linked components and relationships, `render.js` builds the native SVG/HTML, and `site/section-figures.css` handles responsive presentation. The strict inventory gate rejects missing sections and unknown drawing variants. Physical-order review corrected several conceptual hierarchies into comparisons, networks, or flows. Examples include bonded lattices and impurities, grain boundaries, a single MOSFET with its insulated gate, and wiring with vias.

Eight labs received focused redesigns: supply-chain map, scale ladder, HBM stack, EUV source/scanner, CoWoS, GPU rack, transistor evolution, and etch profile. Mechanisms appear before controls on mobile; desktop layouts can place controls beside the figure. Detailed calculations and reference tables remain available in disclosures. Fixes include HBM generation constraints and fractional rate display, and rack costs expressed consistently in billions.

The original 32 lesson texts and their heading IDs, all 176 quiz questions, and all 57 in-course widget placements are preserved. These source-grounded conceptual illustrations supplement the previous accuracy review; they do not constitute a new exhaustive review of scientific claims.

## Final validation

| Check | Result | Evidence |
|---|---|---|
| Build, static checks, strict figure coverage and source preservation | Pass; 352/352 sections, 628 labeled SVGs, zero errors | `course/visuals/coverage.json`, `qa/reports/section-figures.json` |
| Integrated routes, 33 pages × two widths × two actual themes | 132/132 pass; 1,408 figure instances, 228 widget mounts, 1,876 control-font checks | `qa/reports/atlas-refactor-pages.json` |
| Changed labs, eight labs × two widths × two actual themes | 32/32 pass; 344 interaction assertions, 96 inspected states | `qa/reports/flagship-refactor.json` |
| Shell behavior and additional route/state checks | Eight existing and six additional checks pass | `qa/reports/shell-check.json`, `qa/reports/atlas-shell-extra.json` |
| CSS declarations and restored computed styles | All 1,237 declarations accepted | `qa/reports/atlas-css-check.json` |
| Final crystal illustration follow-up | Four width/theme checks pass | `qa/reports/atlas-m02-diagram-followup.json` |

The browser runs report no document overflow, runtime/local-load errors, broken internal links, missing figure labels, or changed-lab SVG clipping, overlaps, tiny text, or lifecycle failures. Representative home, chapter, section-figure and lab screenshots were also inspected. Generated screenshots stay outside Git. Earlier failed harness output is retained separately where it explains a corrected test assumption.

Reproduce the final checks with a local preview running:

```sh
npm run build
npm run check
node qa/shell.js
node qa/refactor-pages.js
node qa/flagship-refactor.js
```
