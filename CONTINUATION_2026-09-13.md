# Sand to GPU continuation, 2026-09-13

This record follows `HANDOFF.md`, which preserves the original Claude session's state. Work continued in the same directory using Codex agents and local build/browser tools. The Claude Workflow API and artifact publishing tool are not available in this session; this pass does not claim to have resumed those workflow run IDs.

## Repository

Private repository: [DicksonWu654/sand-to-gpu](https://github.com/DicksonWu654/sand-to-gpu)

The initial source snapshot is signed commit `2985f7136d076621248fcb2ef0d95d63b288452c`. GitHub verified its GPG signature. Source, quizzes, review evidence, and QA code are tracked. Dependencies, local credentials, and generated screenshots are excluded.

## Scope and evidence

The source contains 22 deep modules totaling approximately 512,000 words after corrections. Follow-up reviews focus on load-bearing mechanisms, numerical examples, key tables, and claims with material uncertainty. They must not be read as exhaustive verification of every sentence. Per-module `course/review/*-r2.md` reports specify the claims examined and supporting sources.

The survey guide previously claimed the deep modules had already been fact-checked twice. That assumption was removed. Survey chapters must draw on the corrected deep modules, with numerical provenance recorded separately.

The [round-two summary](course/review/ROUND2_SUMMARY_2026-09-13.md) records 669 assessed claims and 193 explicitly unresolved rows. These figures are calculated from the report tables; they do not imply that the remaining rows are unconditional empirical confirmations. The ten survey chapters total roughly 26,400 words (whitespace-counted source Markdown; generated reading counts omit some markup).

## Completed content and site work

- Added all ten survey chapters, each approximately 2,600–2,730 words, with an existing interactive diagram and links into the deep modules. Numerical provenance is recorded in the review artifacts.
- Normalized all 22 quizzes to eight questions. Corrections distinguish assumptions in numerical models from measured product specifications.
- Expanded all 22 second-round module ledgers to at least 30 assessed claims. They distinguish retrieved primary evidence, calculations, corrections, and unresolved empirical inputs. An assessment is not automatically a confirmation.
- Added one independent refutation ledger covering six claims per module (132 assessments), plus separate front- and back-half peer ledgers covering 66 each. These are overlapping, scoped review passes, not 264 additional distinct facts and not two reviews of every course claim.
- Corrected material-recovery, etch-geometry, water-accounting, memory-capacity, SRAM-density, test/reliability, and economic examples. Readers can follow the exact findings and sources in the module reports.
- Recovered and addressed concrete earlier reader-review findings in the back-half modules. Mechanical checks confirm required sections and numerous worked examples; a full section-by-section qualitative depth score remains unestablished.
- Connected all 46 widgets, added the missing HTML document/mobile metadata, corrected responsive diagrams and controls, and reconciled several widget captions and cost models with the course.
- Fixed repeated-SVG wrapper accumulation and added focused regression coverage. Dense diagrams retain readable labels through keyboard-accessible scroll regions on narrow screens.
- Made browser discovery portable, added documented build/QA commands, hardened the preview server's local defaults and path handling, and made the build regenerate the full-course Markdown document.

Review ledgers: [independent](course/review/independent-refutation-2026-09-13.md), [front-half peer](course/review/peer-refutation-front-2026-09-13.md), [back-half peer](course/review/peer-refutation-back-2026-09-13.md).

## Publication

Changes to this repository do not update the original private Claude artifact. That hosted copy requires the original publishing capability. When republishing, include the new `site/widget-layout.js` asset, all 46 widget scripts, and the rebuilt `site/content.js`, in addition to the HTML, app script, and stylesheet. The current site can be built and served locally using the README instructions.

## Validation and remaining work

The final build and checks passed on frozen course content. The 54 course-source hashes and both generated outputs stayed unchanged during the final browser sweep.

| Check | Result |
|---|---|
| Build and static integration | 22 deep modules, 10 surveys, 176 quiz questions, 46 registered widgets; zero errors or warnings |
| Placement and links | 47 deep placements, 57 embedded occurrences, 34 checked internal links; zero placement fallbacks |
| Shell behavior | Eight checks passed, including navigation, theme persistence, quizzes, mobile menu/search and keyboard diagram scrolling |
| Widget coverage | 184 completed width/theme cases; 2,856 control values and 982 button clicks, using full-run plus isolated-retry provenance |
| Repeated-diagram regression | Eight actual-theme cases, 594 sampled mutations; no wrapper/hint accumulation or recorded failures |
| Corrected final page sweep | 33 routes × two widths × two themes = 132 cases; 66 actual dark and 66 actual light; 232 widget mounts; zero recorded runtime/load/overflow or missing-heading failures |

See the [QA report](qa/reports/QA-2026-09-13.md), [final validation data](qa/reports/final-validation.json), [build integrity record](qa/reports/final-build.json), and [widget coverage provenance](qa/reports/coverage-summary.json). Earlier protocol timeouts and invalid page-theme coverage are retained as historical evidence, not silently counted as clean passes. The corrected final sweep asserts the actual theme and uses the frozen content.

Screenshots were inspected separately from automated checks; the QA report lists the actual samples and limits. These checks do not establish every model's physical accuracy, every possible control combination, every animation frame, full accessibility conformance, or uniform expert-level teaching throughout the course. The 193 explicitly unresolved claim rows and remaining full-text definition/depth audit limits are recorded in the [review summary](course/review/ROUND2_SUMMARY_2026-09-13.md).

The [local preview](http://localhost:8790) is running. The original hosted Claude artifact has not been republished.
