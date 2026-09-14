# Language and explanation review

The reader is a curious adult with school-level physics and chemistry who wants to learn semiconductor manufacturing deeply. This pass makes the route into the technical material easier without turning the deep course into another survey.

## Editorial approach

- Explain the job a process or material performs before its terminology, recipe and commercial details.
- Separate crowded paragraphs into a causal sequence. Define unfamiliar terms by what they mean or do, rather than merely expanding their initials.
- Name equation quantities and explain the relationship before the arithmetic. Preserve detailed mechanisms, worked examples and numerical caveats.
- Use analogies for a specific relationship, state their useful limits, and remove analogies that imply the wrong mechanism.
- Clarify distinctions a beginner can easily merge: voltage versus current, memory capacity versus bandwidth versus latency, production yield versus reliability, and material purity versus the measurement used to assess it.

This is a course-wide, targeted editorial pass: openings, prerequisites, selected difficult mechanisms and explanatory transitions were reviewed in each assigned lesson. It is not an exhaustive sentence-by-sentence line edit or a new independent fact-check of the entire course.

## Representative changes

Module 04 introduces materials through their roles in the finished device and in manufacturing, acknowledging that some play both roles. Its GaN explanation describes charge gathering at an interface without portraying the crystal as an energy-supplying battery. Its ultrapure-water explanation distinguishes a near-pure-water resistivity reading from proof that every ion or contaminant is absent.

The etch chapters explain what happens to the original surface during atomic layer etching. The former paint-and-cloth analogy only removed added paint; its replacement explains modification and removal of the solid's outer surface. ALD growth is described by self-limiting reactions and cycles rather than the misleading promise of one complete atomic layer per gas pulse.

The transistor survey connects high-k gate insulation with strong electrical coupling, then explains why wire insulation needs the opposite behavior. The memory chapters explain charge sharing before its equation and distinguish a disturbed DRAM cell from one that is always emptied. TLC and QLC now explicitly connect bits stored to distinguishable states, using the existing deep-module values.

The glossary compares capacity, bandwidth and latency through storage space, loading rate and waiting time, while stating that the analogy omits the electrical details. Yield explanations identify the relevant denominator and distinguish a test result from long-term reliability.

Definitional corrections and removed unsupported inferences are recorded separately from stylistic changes in the review ledgers. Existing source qualifications and unresolved review limits remain applicable.

The narrow Module 04 follow-up also corrects specific on-resistance to resistance multiplied by active area, limits its worked comparison to the ideal drift-region model, and qualifies universal silicon-laser, InP and IGBT statements using primary sources. The UPW table now acknowledges equilibrium ions. Root's final reading clarified the permittivity parenthesis and removed an unsupported “one in ten million” molecule-fraction claim that confused concentration with a fraction of water molecules; no replacement numerical estimate was introduced.

## Preservation contract

The earlier visual-refactor check compared all prose against a frozen historical version. That would reject the user's requested language revisions. It now checks that generated prose matches the current authored Markdown after the standard rendering transforms, independently of diagram and widget insertion. Historical heading, quiz-answer and option contracts remain checked, along with source-to-build quiz equality, figure ownership, accessible labels, links and widget placement.

The single quiz wording correction clarifies that the Williams–Brown example assumes true good-die yield, rather than using the observed fraction passing a finite-coverage test. Its numerical values, answer options and correct answer remain unchanged.

## Review evidence

| Scope | Evidence |
|---|---|
| Modules 00–07 and surveys S01–S03; source-backed Module 04 clarifications | `qa/reports/language-review-foundations.json` |
| Modules 08–14 and surveys S04–S07; one quiz question label | `qa/reports/language-review-fab.json` |
| Modules 15–21 and surveys S08–S10; explicit numerical exceptions | `qa/reports/language-review-systems.json` |
| Independent reading of eight changed passage groups from other editors | `qa/reports/language-peer-review-systems.json` |
| Course-wide heading, link, number-token and quiz-contract comparison | `qa/reports/language-content-deltas.json` |
| Build import behavior, source contract and isolated negative checks | `qa/reports/language-build-contract-review.json` |

All 32 lessons received targeted edits. The ledgers distinguish changed passages from sections only inspected, and source-backed corrections from wording changes. The number-token comparison is a review aid: a repeated identifier such as D0 is not a new numerical specification, and passing token checks cannot establish factual correctness.

## Final validation

- The rebuilt course matches the authored prose in all 32 lessons and preserves historical heading contracts. All 22 quiz structures, answer options and correct-answer indices are unchanged; the corrected question text matches its authored source.
- Coverage and ownership remain intact for 352 figures and 57 widget placements. Source checks were rerun after the final Module 04 wording edits.
- Four isolated negative tests successfully detect prose corruption, stale quiz wording, changed answer options and a missing lesson. These use temporary candidate files; the live preview was never corrupted.
- Eight focused rendered passages were inspected at desktop and phone widths: Module 04 opening, GaN and UPW, plus the survey transistor/insulator explanation. No text clipping or overlap was found. The inherited phone callout style remains 15px with 25.8px line height and was accepted in manual review; its initial comparison with a 16px body-text threshold remains documented in `qa/reports/language-readability.json`. No CSS changed in this pass.

Reproduce the structural and editorial checks with:

```sh
npm run build
npm run check
node qa/language-content-audit.js
node qa/language-build-negative.js
node qa/language-readability.js
```
