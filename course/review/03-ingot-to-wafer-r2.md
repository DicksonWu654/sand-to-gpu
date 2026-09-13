# Round 2 targeted review: Module 03: From Ingot to Polished Wafer

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 11 primary-source checked, 14 calculated, 1 correction/qualification, 4 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Wafer forming includes slicing, lapping, damage etching, polishing and cleaning | CONFIRMED | SUMCO documents the sequence; specific suppliers can use alternative detailed flows. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 2 | Colloidal-silica mechanochemical polishing produces a mirror surface | CONFIRMED | Documented manufacturer process, not a claim that every polishing run is defect-free. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 3 | 2025 wafer shipments 12,973 MSI and revenue $11.4B | CONFIRMED | SEMI release dated February 10, 2026. MSI is area, not wafer count. | [Primary source](https://www.semi.org/en/semi-press-release/semi-reports-2025-annual-worldwide-silicon-wafer-shipments-and-revenue-results) |
| 4 | 900 µm slice + 160 µm kerf consumes 1.06 mm per slice | CONFIRMED | 160/1,060 ≈ 15.1% kerf; further finishing removes more material. | Independent arithmetic using the explicitly stated model inputs |
| 5 | A 300 mm diameter, 775 µm thick silicon disc weighs about 127 g | CONFIRMED | π × 15² × 0.0775 × 2.33 ≈ 127.6 g. Nominal dimensions, excluding edge and notch. | Independent arithmetic using the explicitly stated model inputs |
| 6 | 1,800 wafers from a 2 m body at 1.06 mm pitch | MINOR | Exact gross division gives about 1,887 before end losses; approximately 1,800 is plausible only with losses or conservative rounding. Clarified table. | Independent arithmetic using the explicitly stated model inputs |
| 7 | Grinding prepares uniform ingot diameter before slicing | PRIMARY CHECK | SUMCO describes circumference grinding before cutting. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 8 | Slicing can use wire saw orinner-diameter blade | PRIMARY CHECK | Both routes listed by manufacturer; not all wafer production has identical equipment. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 9 | Lapping improves parallelism and thickness | PRIMARY CHECK | SUMCO explains this geometrical purpose. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 10 | Etching removes damage from mechanical preparation | PRIMARY CHECK | Manufacturer distinguishes removal of damaged surface material from polishing. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 11 | Final cleaning and inspection precede shipment | PRIMARY CHECK | Confirmed manufacturer process boundary. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 12 | Epitaxial wafers canbe 300 mm | PRIMARY CHECK | Siltronic explicitly offers that diameter. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 13 | SO I wafers contain an insulating layer between silicon regions | PRIMARY CHECK | SUMCO describes bonded silicon with oxide; not every SO I method follows the same detailed sequence. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 14 | Annealed wafers use treatment to improve near-surface crystal condition | PRIMARY CHECK | SUMCO describes hydrogen/argon annealing and near-surface oxygen removal. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 15 | 775µm nominal thickness is.775 mm | CALCULATED | A 300 mm disc has diameter/thickness ratio about 387; handling behavior differs from bulk blocks. | Independent arithmetic from stated inputs |
| 16 | 900µm initial slice minus 775µm delivered thickness leaves 125µm finishing allowance | CALCULATED | Removal budget must match chosen as-cut thickness; other examples use 890µm and 115µm. | Independent arithmetic from stated inputs |
| 17 | 70µm grinding+25µm etch+18µm DSP+2µm final polish=115µm | CALCULATED | Valid representative allocation from 890 to 775µm; not unique industrial recipe. | Independent arithmetic from stated inputs |
| 18 | 300 mm versus 200 mm area is 2.25× | CALCULATED | Diameter-squared scaling;(300/200)^2=2.25, not necessarily 2.25×good dies. | Independent arithmetic from stated inputs |
| 19 | 10 particles per 707 cm²is about one per 71 cm² | CALCULATED | Spatial average only; clustering and detection threshold matter. | Independent arithmetic from stated inputs |
| 20 | 20 nm flatness versus 90µm sag differs by 4,500× | CALCULATED | These can coexist because chucking, reference plane and spatial scale differ; not contradictory units. | Independent arithmetic from stated inputs |
| 21 | 1 e10 surface atoms/cm² versus~7 e14 sites/cm² is one per 70,000 sites | CALCULATED | Checks indicative contamination coverage, not whether atoms form clusters. | Independent arithmetic from stated inputs |
| 22 | 2 m divided by 1.1 mmpitch gives about 1,818 gross slices | CALCULATED | End losses andout-of-spec sections further reduce shipped count. | Independent arithmetic from stated inputs |
| 23 | 127 g final disc/.23 kgfeed=55%mass retained | CALCULATED | Per-wafer feed model includes upstream scrap; not just wire ker f. | Independent arithmetic from stated inputs |
| 24 | 1.06 mmpitch and.775 mm final thickness retains 73.1%of cylindrical body | CALCULATED | .775/1.06=.731; distinct from charge-to-shipped yield. | Independent arithmetic from stated inputs |
| 25 | 12,973 MSI is about 8.37 billion cm² | CALCULATED | 1 in²=6.4516 cm²; area covers many diameters so cannot directly infer 300 mm unit shipments. | Independent arithmetic from stated inputs |
| 26 | $11.4 B/12,973 MSI≈$.879 perin² | CALCULATED | Market-average area revenue, not a price quotation for leading-edge 300 mm prime wafers. | Independent arithmetic from stated inputs |
| 27 | 300 mm nominal 775±25µm is current SEMI requirement for all deliveries | UNRESOLVED | Specific standard revision/product options not independently opened; treat as common representative specification. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 28 | Diamond wire 100–140µm andkerf 150–170µm | UNRESOLVED | Equipment-dependent ranges not established by broad manufacturer flow; retained representative values. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 29 | Roughness below.1 nm RMS and SFQR 20 nm | UNRESOLVED | Measurement bandwidth, site size, edge exclusion and customer grade matter; no universal acceptance specification verified. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 30 | Prime wafer price $100–150 andepi $200+ | UNRESOLVED | No public contract source consulted establishes exact current pricing; remain estimated/historical. | [Primary source consulted](https://www.semi.org/en/semi-press-release/semi-reports-2025-annual-worldwide-silicon-wafer-shipments-and-revenue-results) |

## Edits and quiz coverage

- Exact gross division gives about 1,887 before end losses; approximately 1,800 is plausible only with losses or conservative rounding. Clarified table.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 18 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The slicing/finishing budget now explicitly separates theoretical cuts from usable-wafer yield. Remaining depth work: audit each SOI/epi/anneal subsection for process-specific assumptions and avoid treating illustrative recipes as universal. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.

## Survey numerical traceability

Chapter `S02-from-sand-to-a-mirror.md`: 2580 whitespace-delimited words. This chapter synthesizes the current corrected source modules; it does not claim all source-module content received exhaustive verification. All substantive quantities in the body and table are mapped below. Module identifiers, chapter labels and explanatory counting words are navigation, not empirical claims.

| Survey quantities | Deep module | Location / check |
|---|---|---|
| 98.5–99.5% MG-Si; 9N=99.9999999% | 01 | Key Numbers / Why Purity Is the Whole Game |
| 1,414 °C melting point | 02 | Key Numbers |
| 300 mm,775 µm,127 g nominal disc | 03 | Why 775 µm / Key Numbers; disc mass arithmetic |

Checks: one named widget, valid deep-route syntax, required opening/gist/body/numbers/companies/difficulty/deeper sections, and six main explanatory sections. Scientific explanations follow the named modules; industry-share forecasts and proprietary recipe numbers are deliberately absent from the survey.
