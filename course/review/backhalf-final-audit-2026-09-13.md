# Back-half final targeted audit — 2026-09-13

Scope: modules 11–21, their 88 quiz questions, and new surveys S01/S06–S10. This record freezes the author’s content changes for integration. It does **not** claim exhaustive fact-checking of the expanded course, 339 independently verified facts, or uniform expert teaching depth. The r2 ledgers deliberately preserve unresolved estimates and partial evidence.

## Counts and evidence

Programmatically parsed 339 ledger rows: 120 CONFIRMED, 55 MINOR/scope corrections, 12 WRONG-and-corrected, and 152 UNVERIFIABLE. The latter includes combined claims for which a subset is supported. A confirmed calculation establishes the result under its inputs, not that a proprietary process uses those inputs.

| Mutually exclusive evidence category | Rows |
|---|---:|
| Primary source supports the stated subset or correction | 109 |
| No sufficient fresh evidence for full extracted claim | 142 |
| Independent arithmetic or conceptual reasoning, without a primary link | 69 |
| Internal scope/consistency correction, without a primary link | 9 |
| Source retrieved, full combined claim unresolved | 10 |

Across those categories, 119 rows link retrieved primary sources and 87 explicitly label calculation/model reasoning; these counts overlap and must not be added. The calculation-labelled category includes a few conceptual consistency checks rather than numerical calculations. Source links sometimes support only the carefully identified subset. Cached v1 reviews are not counted as new verification.

| Module | Assessed | Confirmed | Minor/scope | Wrong, corrected | Unresolved | Words | Worked examples |
|---|---:|---:|---:|---:|---:|---:|---:|
| 11 | 33 | 13 | 5 | 1 | 14 | 26120 | 12 |
| 12 | 30 | 10 | 2 | 1 | 17 | 22927 | 10 |
| 13 | 30 | 11 | 1 | 0 | 18 | 24521 | 21 |
| 14 | 30 | 6 | 7 | 0 | 17 | 21745 | 16 |
| 15 | 30 | 11 | 8 | 1 | 10 | 23907 | 16 |
| 16 | 35 | 11 | 6 | 0 | 18 | 24251 | 12 |
| 17 | 30 | 13 | 5 | 0 | 12 | 19361 | 9 |
| 18 | 31 | 13 | 5 | 3 | 10 | 20536 | 13 |
| 19 | 30 | 12 | 5 | 2 | 11 | 23877 | 14 |
| 20 | 30 | 10 | 5 | 1 | 14 | 20506 | 5 |
| 21 | 30 | 10 | 6 | 3 | 11 | 32560 | 11 |

## Corrections with material teaching consequences

- Device and interconnect comparisons now distinguish Intel announcements from shipments, experimental PowerVia vehicles from standard production nodes, and TSMC N2 chip density from logic-only density. The particular published N2 SRAM demonstration is 0.021 µm² per HD cell and 38.1 Mb/mm² macro density; these are different measurements, not interchangeable universal node constants.
- Yield explanations distinguish raw sort pass fraction from residual quality after known-good-die selection, theoretical model output from disclosed production yield, and full-device defect risk from a claimed universal per-feature industry target. Independent reviewers’ scope findings were applied.
- HBM wafer diversion arithmetic, capacitor aspect-ratio example, physical cell versus macro area, CoWoS-L construction, A100 memory variants, SAC305 solidus/liquidus and package-specific preconditioning were corrected or narrowed.
- Cohu thermal-control maxima and Aehr wafer count/power maxima are configuration-specific. Meta’s Llama 3 job interruptions no longer become unique failed-GPU probabilities or silicon FIT estimates. HTOL zero-failure results bound an assumed mechanism; they are not a universal field-rate forecast.
- BOM is distinct from company COGS and gross margin. The older $3,000 package worked model is identified separately from Blackwell estimated economics. Capacity comparisons do not infer product availability from all-node foundry totals.
- Public-source closure distinguishes SEMI 2025 WFE actual $116.9B from its former $115.7B forecast and total equipment $135.1B; KYEC’s NT$32.36B PP&E cash spend from a reported NT$37B budget; historical 2022 manufacturing-control thresholds from later chip licensing rules; and HBM wafer/bit estimates from unsupported annual revenue share. The latter revenue claim was removed.
- Reference corrections include equal-dose versus unequal-dose photon comparisons, reticle exceptions, fixed-input Arrhenius arithmetic, silicon properties, mirror throughput, deposited versus printed dimensions, and historical dose-qualified scanner throughput.

## Surveys and local checks

| Survey | Source words | Widget |
|---|---:|---|
| S01 | 2728 | chain-map |
| S06 | 2646 | transistor-evolution |
| S07 | 2657 | yield-calculator |
| S08 | 2666 | hbm-stack |
| S09 | 2686 | cowos-flow |
| S10 | 2683 | rack-explorer |

All eleven owned quizzes parse as JSON, have exactly eight questions, valid answer indices and explanatory answers. All six new surveys remain between 2,000 and 3,000 whitespace-separated words; the site’s structural checker independently validates widget embedding. Six survey traceability reports map every quantity-table row to deep modules and state its assumption boundary. Required deep-module sections and at least three labelled worked examples are present. Browser/widget behavior is covered separately by the site reviewer.

## Independent review and remaining work

Actual independent artifacts are [the separate refutation ledger](independent-refutation-2026-09-13.md), [the 66-claim back-half peer review](peer-refutation-back-2026-09-13.md), and [the author’s 66-claim front-half peer review](peer-refutation-front-2026-09-13.md). Each reviewer selected six claims per relevant module; overlap is possible. These are selected checks, not a second verification of all rows. Front-half peer findings about thermodynamic heat balance and the Lam depth-normalized etch metric were sent to the responsible author and resolved.

[Recovered reader feedback and resolutions](backhalf-reader-followup-2026-09-13.md) retain minimal relevant historical evidence. Concrete improvements include the scale analogy, atom count and dimensional explanations, CD-AFM tip calibration, measurement noise, known-good-die conditional probability, glossary definitions, foundry/IDM boundaries and packaging family explanations. No complete fresh first-use-definition audit or section-by-section 1–5 depth rubric across the long expanded modules was performed; the counts above do not substitute for that work.

The remaining evidence gaps are explicitly listed in each module ledger. They include vendor/process-specific dimensions and recipes, precision metrics absent from public product pages, contract prices, throughput and lifetime ranges, supplier/customer allocations, and combined forecasts or regional shares not fully verified. Some are ordinary public claims still lacking sufficient retrieved evidence, not inherently proprietary facts. Worked examples retain these inputs as representative assumptions; no measured production certification is implied. Public data retrieved only in search snippets or inaccessible papers was not promoted to full-text confirmation. Further work should target these named gaps, including original datasheets or traceable dated analyst reports, rather than treating a tilde as a citation.
