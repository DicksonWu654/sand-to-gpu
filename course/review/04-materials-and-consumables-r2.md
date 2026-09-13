# Round 2 targeted review: Module 04: Beyond Silicon: Compound Semiconductors and Fab Consumables

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 2 correction/qualification, 6 primary-source checked, 16 calculated, 6 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Ultrapure-water resistivity 18.2 MΩ·cm | MINOR | Added 25 °C; temperature changes the reference value. | [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 2 | Resistivity alone certifies overall purity | WRONG | Reworded: particles and organic contamination require separate measurements. | [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 3 | CNT pellicle specifications and construction timing | CONFIRMED | Mitsui May 2024 source states ≥92% transmittance, >1 kW design goal, December 2025 tentative construction end. A plan is not proof of completion. | [Primary source](https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm) |
| 4 | 90% single-pass transmission gives 81% double-pass transmission | CONFIRMED | 0.9² = 0.81. Quiz now distinguishes optical loss from whole-cycle throughput. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 4.2% lattice mismatch at 25% Ge gives about 1.05% mismatch | CONFIRMED | 0.042 × 0.25 = 0.0105 within the stated linear approximation. Does not verify a unique critical thickness. | Independent arithmetic using the explicitly stated model inputs |
| 6 | 100k wafers/month × 1,800 gallons/wafer is 6 million gallons/day | CONFIRMED | Uses a 30-day month; gross UPW use is not equal to fresh intake. | Independent arithmetic using the explicitly stated model inputs |
| 7 | Ultrapure water conductivity is about 0.055µS/cm at 25°C | PRIMARY CHECK | Merck gives conductivity and reciprocal resistivity together. | [Primary source consulted](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 8 | 18.2 MΩ·cm converts to 0.0549µS/cm | CALCULATED | Reciprocal-unit calculation; ionic measurement only. | Independent arithmetic from stated inputs |
| 9 | Mitsui CNT pellicle roadmap targeted at least 92% transmission | PRIMARY CHECK | Primary May 2024 statement is a design/commercialization target, not proof that all production films meet it. | [Primary source consulted](https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm) |
| 10 | Mitsui planned 5,000 pellicle sheets/year and December 2025 construction end | PRIMARY CHECK | The source labels completion tentative; planned capacity differs from realized output. | [Primary source consulted](https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm) |
| 11 | TEL supplies coat/develop equipment for DUV and EUV | PRIMARY CHECK | Current LITHIUS product page establishes role and applications. | [Primary source consulted](https://www.tel.com/product/lithius.html) |
| 12 | ALD and plasma-enhanced ALD are available fromASM | PRIMARY CHECK | ASM describes film deposition and plasma-based lower-temperature operation. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 13 | Si Ge lattice mismatch from 5.658Å and 5.431Å is 4.18% | CALCULATED | (5.658−5.431)/5.431=.0418; linear alloy interpolation is an approximation. | Independent arithmetic from stated inputs |
| 14 | 2 DEG sheet density 1 e13/cm² and mobility 1500–2000 gives 416–312Ω/square | CALCULATED | 1/(q n μ); sheet density must not be confused with volume density. | Independent arithmetic from stated inputs |
| 15 | A 1µm by 1 mm channel at 400Ω/square has.4Ω channel resistance | CALCULATED | Resistance equals sheet resistance times L/W=.001; contact/access resistance excluded. | Independent arithmetic from stated inputs |
| 16 | Nitrogen 40,000 Nm³/hour corresponds to about 438 kt/year | CALCULATED | Using 1.25 kg/Nm³ and 8,760 hours; normal-state convention and up time must be specified. | Independent arithmetic from stated inputs |
| 17 | CMP 25 steps at 300 m L each totals 7.5 L/wafer | CALCULATED | Not 300 m L/min unless each step is assumed one minute. | Independent arithmetic from stated inputs |
| 18 | 7.5 L/wafer at 100 k wafers/month requires 750,000 L/month | CALCULATED | Model flow calculation; recycling or dilution boundaries may differ. | Independent arithmetic from stated inputs |
| 19 | 90% pellicle transmission needs about 23.5% more incident energy forsame wafer dose | CALCULATED | 1/.81−1=.2346;19% optical loss and 23.5% dose compensation are different percentages. | Independent arithmetic from stated inputs |
| 20 | Forty bilayers at 7 nm period totals 280 nm multilayer thickness | CALCULATED | Does not include cap/absorber/substrate; physical layer count is 80. | Independent arithmetic from stated inputs |
| 21 | 262,144 beamlets equals 512² | CALCULATED | Checks array count associated with mask writer model; exact current model capability remains supplier-specific. | Independent arithmetic from stated inputs |
| 22 | Si C E critical ratio cubed about 580 implies field ratio about 8.3 | CALCULATED | 580^(1/3)=8.34; mobility/permittivity terms still needed for Baliga comparison. | Independent arithmetic from stated inputs |
| 23 | An approximate.5 mobility/permittivity factor turns 580 into 290 | CALCULATED | Explains rounded 300× ideal material limit, not real device on-resistance guarantee. | Independent arithmetic from stated inputs |
| 24 | 100–500µm/hour Si C growth means 2.4–12 mm/day | CALCULATED | Valid conversion; “a few millimetres/day” cannot represent every point equally. | Independent arithmetic from stated inputs |
| 25 | Si Ge 25% equilibrium critical thickness 35–40 nm | UNRESOLVED | No specific growth orientation/dislocation model source established in this pass; do not treat a unique thickness as a universal material constant. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 26 | Si C substrate 2025 price $400–800 and market shares | UNRESOLVED | Public product pages do not establish market wide contract/spot definitions; retain historical estimates. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 27 | Japan photo resist share 90% | UNRESOLVED | Precise year/revenue/application denominator not independently verified; qualitative concentration is separate. | [Primary source consulted](https://www.tel.com/product/lithius.html) |
| 28 | EUV blank Hoya/AGC two-thirds/one-third | UNRESOLVED | Supplier existence does not verify these percentages or exclude every niche competitor. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 29 | UPW particle/metals/TOC requirements as universal values | UNRESOLVED | Fab specification depends on device/process/measurement method; resistivity source does not certify the remaining table limits. | [Primary source consulted](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 30 | Mask costs $300–500 k and $20–30 M per set | UNRESOLVED | No supplier quote established; design complexity, inspection and repair scope matter. | [Primary source consulted](https://www.tel.com/product/lithius.html) |

## Edits and quiz coverage

- Added 25 °C; temperature changes the reference value.
- Reworded: particles and organic contamination require separate measurements.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 12 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The UPW and pellicle examples now distinguish measured proxy, actual contamination and optical versus whole-tool loss. Remaining depth work: review the long precursor/supplier catalogue for definition burden and dated commercial context. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
