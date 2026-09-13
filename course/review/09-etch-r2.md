# Round 2 targeted review: Module 09: Etch: Transferring the Pattern

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 4 correction/qualification, 17 calculated, 7 primary-source checked, 2 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Anisotropic means removal rate depends on direction | MINOR | Corrected opening definition; strictly vertical removal is an ideal case. | [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE) |
| 2 | An isotropic etched protected gate widens from 20 to 60 nm | WRONG | An opening widens; a protected line narrows and can disappear. Rewrote worked geometry and table. | Independent arithmetic using the explicitly stated model inputs |
| 3 | 100 nm target etch at selectivity20:1 consumes5 nm mask | CONFIRMED | Nominal ratio; additional margin needed for overetch and nonuniformity. | Independent arithmetic using the explicitly stated model inputs |
| 4 | TEL demonstrates10 µm channel etch in33 minutes with84% lower GWP | CONFIRMED | TEL June9,2023 research announcement; comparison is to its previous technology, not whole-fab emissions. | [Primary source](https://www.tel.com/news/product/2023/20230609_001.html) |
| 5 | Lam Cryo3.0 advertises2.5× etch rate and<0.1% profile deviation | CONFIRMED | Lam July 31, 2024 release. Its footnote defines profile deviation as (maximum CD − minimum CD) / channel depth; this is not relative diameter variation. Supplier benchmark under stated conditions. | [Primary source](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 6 | Atomic layer etch can be directional or isotropic | CONFIRMED | Lam ALE technical brief distinguishes both. | [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE) |
| 7 | ALE separates surface modification from removal of the modified material | PRIMARY CHECK | Lam describes sequential modification and removal steps; self-limiting surface chemistry distinguishes ALE from merely shortening a continuous etch. | [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE) |
| 8 | Lam Cryo 3.0 announced July 31,2024 | PRIMARY CHECK | Primary release establishes launch date; not identical to first cryogenic deployment. | [Primary source consulted](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 9 | Lam reported five million wafers processed with cryo technology by launch | PRIMARY CHECK | Cumulative earlier-generation claim; not five million Cryo 3.0 wafers. | [Primary source consulted](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 10 | Lam<.1%profile deviation means.1%diameter uniformity | CORRECTED / QUALIFIED | Footnote denominator is channel depth. Body/table now make depth-normalized definition explicit. | [Primary source consulted](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 11 | .1%of 10µm channel depth is 10 nm CD difference | CALCULATED | 10,000 nm×.001=10 nm; difference is maximum minus minimum CD. | Independent arithmetic from stated inputs |
| 12 | Lam 40%energy and up-to 90%emissions reductions are vendor comparisons | PRIMARY CHECK | Primary footnote says estimated emissions reduction was not independently verified; not whole-fab savings. | [Primary source consulted](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 13 | An 84% reduction leaves 16% of the comparison global-warming-potential burden | CALCULATED | 1−0.84=0.16 for TEL’s stated process comparison. It does not mean that 84% of every fab emission disappears. | Independent arithmetic from stated inputs |
| 14 | 10µm in 33 minutes averages 303 nm/min | CALCULATED | 10,000/33=303; no assumption that depth rate is constant along hole. | Independent arithmetic from stated inputs |
| 15 | Conventional 100–150 nm/min over 10µm takes 67–100 min | CALCULATED | 10,000/150=66.7,10,000/100=100; rounded 60–100 range is rough. | Independent arithmetic from stated inputs |
| 16 | 2.5×rate reduces nominal process time 60% | CALCULATED | New time=.4 old time; full platform throughput also includes overhead. | Independent arithmetic from stated inputs |
| 17 | 10µm depth/100 nm diameter is aspect ratio 100 | CALCULATED | Units matched;8µm/100 nm gives 80. | Independent arithmetic from stated inputs |
| 18 | 50 nm poly-equivalent overetch at 100:1 selectivity consumes.5 nm oxide | CALCULATED | 50/100=.5; exposed area/time model matters. | Independent arithmetic from stated inputs |
| 19 | 100 nm target at 30:1 selectivity consumes 3.33 nm etch stop | CALCULATED | Greater than 2 nm stop thickness; illustrates failure of the stated budget. | Independent arithmetic from stated inputs |
| 20 | Anisotropy.95 means lateral rate 5%of vertical rate | CALCULATED | For 100 nm vertical travel,5 nm reach per side in the uniform rate model. | Independent arithmetic from stated inputs |
| 21 | 20 nm opening with 20 nm isotropic reach widens near the top to 60 nm | CALCULATED | Opening geometry only; protected line oppositely narrows. | Independent arithmetic from stated inputs |
| 22 | 10µm etch at 5:1 target/carbon selectivity uses 2µm mask | CALCULATED | Safety factor must cover faceting/overetch; constant selectivity model only. | Independent arithmetic from stated inputs |
| 23 | A.5–1ÅALE increment is.05–.1 nm per cycle | CALCULATED | At 1.36Å crystallographic spacing, not necessarily a full atomic plane each cycle. | Independent arithmetic from stated inputs |
| 24 | 2–5 eV electron energy corresponds to about 23,200–58,000 K | CALCULATED | 1 eV/kB≈11,605 K; lower 30,000 K table endpoint is rough rounding. | Independent arithmetic from stated inputs |
| 25 | KOH(111)sidewall on(100)wafer has 54.74 degree angle | CALCULATED | acos(1/sqrt 3)=54.7356°; ideal crystal geometry. | Independent arithmetic from stated inputs |
| 26 | Isotropic SiO2+6 HF→H 2 Si F 6+2 H2O is balanced | CALCULATED | Si 1, O 2, H 6, F 6 conserved; solution chemistry differs from gas-phase Si F 4 netpath. | Independent arithmetic from stated inputs |
| 27 | SiO2+4 HF→Si F 4+2 H2O is balanced | CALCULATED | Si 1, O 2, H 4, F 4 conserved; balanced reaction does not guarantee recipe conditions. | Independent arithmetic from stated inputs |
| 28 | Copper is never etched in production | CORRECTED / QUALIFIED | Qualified to conventional fine-pitch subtractive plasma BEOL patterning; wet seed removal and specialized processes exist. | [Primary source consulted](https://www.tel.com/product/) |
| 29 | Exact cryo recipes and−40 to−70°C range apply to all vendor products | UNRESOLVED | Public launch pages do not disclose universal recipe; keep representative, not an operating instruction. | [Primary source consulted](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 30 | Etch market $20–25 B and vendor percentage table | UNRESOLVED | No audited category/year denominator verified; use as dated industry estimates. | [Primary source consulted](https://www.tel.com/news/product/2023/20230609_001.html) |

## Edits and quiz coverage

- Corrected opening definition; strictly vertical removal is an ideal case.
- An opening widens; a protected line narrows and can disappear. Rewrote worked geometry and table.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 9 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The isotropic geometry and depth-normalized cryogenic benchmark now teach the relevant physical distinction explicitly. Remaining depth work: compare every plasma/ALE/etch-stop section for equal definition depth and clearly distinguish measured recipes from examples. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.

## Survey numerical traceability

Chapter `S05-adding-and-removing-layers.md`: 2598 whitespace-delimited words. This chapter synthesizes the current corrected source modules; it does not claim all source-module content received exhaustive verification. All substantive quantities in the body and table are mapped below. Module identifiers, chapter labels and explanatory counting words are navigation, not empirical claims.

| Survey quantities | Deep module | Location / check |
|---|---|---|
| 44nm Si per100nm SiO2 | 06 | Thermal oxidation / Key Numbers |
| .1nm/cycle;20cycles;2nm film | 06 | ALD model; calibrated steady-state caveat |
| 20:1selectivity;100nmtarget;5nmmask | 09 | Mask budget; newly added quiz |
| 20nmline over20nm film | 09 | Corrected isotropic undercut example |
| 5×10^22 atoms/cm³ | 10 | Key Numbers |

Checks: one named widget, valid deep-route syntax, required opening/gist/body/numbers/companies/difficulty/deeper sections, and six main explanatory sections. Scientific explanations follow the named modules; industry-share forecasts and proprietary recipe numbers are deliberately absent from the survey.
