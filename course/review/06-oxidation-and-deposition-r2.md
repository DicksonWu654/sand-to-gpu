# Round 2 targeted review: Module 06: Thermal Oxidation and Thin-Film Deposition

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 4 primary-source checked, 2 correction/qualification, 20 calculated, 4 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | ALD uses sequential self-limiting reactions for conformal films | CONFIRMED | ASM describes the mechanism; sufficient exposure and suitable chemistry remain necessary. | [Primary source](https://www.asm.com/our-technology-products/ald) |
| 2 | TMA/H2O identifies the HfO2 chemistry | MINOR | Ambiguous Key Numbers label corrected: TMA/H2O makes Al2O3; HfO2 needs a hafnium precursor. | [Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC6027410/) |
| 3 | 20 cycles at calibrated 0.1 nm/cycle gives approximately 2 nm | CONFIRMED | Valid steady-state model; quiz no longer claims exact thickness regardless of nucleation and conditions. | Independent arithmetic using the explicitly stated model inputs |
| 4 | 2 nm HfO2 at k=20 has oxide-equivalent thickness 0.39 nm | CONFIRMED | 2 × 3.9/20 = 0.39 nm for this layer; additional interfacial layers add EOT. | Independent arithmetic using the explicitly stated model inputs |
| 5 | Dry Deal-Grove constants compute any dry oxidation time | MINOR | Changed absolute wording to note thin-oxide and 3D limitations. Using supplied constants, 1 µm takes about 99 h. | Independent arithmetic using the explicitly stated model inputs |
| 6 | 10^-9 Ω·cm² over 20 nm × 20 nm implies 250 Ω | CONFIRMED | 20 nm = 2 × 10^-6 cm; divide 10^-9 by 4 × 10^-12. Excludes spreading resistance. | Independent arithmetic using the explicitly stated model inputs |
| 7 | 100 nm SiO2 consumes about 44 nm Si and extends 56 nm above original surface | CALCULATED | From stated formula-unit number densities 2.2 e22/5 e22=.44. | Independent arithmetic from stated inputs |
| 8 | Oxide formula-unit density 2.2 g/cm³ and 60.08 g/mol is 2.21 e22/cm³ | CALCULATED | Density/molar mass×Avogadro constant; thermal oxide composition/density assumptions. | Independent arithmetic from stated inputs |
| 9 | Dry Deal-Grove A=.165µm from B=.0117 and B/A=.071 | CALCULATED | .0117/.071=.1648µm; dimensional consistency. | Independent arithmetic from stated inputs |
| 10 | Wet A=.226µm from B=.287 and B/A=1.27 | CALCULATED | .287/1.27=.2260µm; model constant consistency. | Independent arithmetic from stated inputs |
| 11 | Wet/dry parabolic-rate ratio is 24.5 at 1,000°C | CALCULATED | .287/.0117=24.53; no assertion that all thicknesses grow 24.5×faster. | Independent arithmetic from stated inputs |
| 12 | 100 nm dry oxide example gives 1.895 hours withtau=.37 h | CALCULATED | (.1²+.165×.1)/.0117−.37=1.895 h. | Independent arithmetic from stated inputs |
| 13 | 1µm wet oxide gives 4.27 hours for zero offset | CALCULATED |  (1+.226)/.287=4.27 h; initial oxide offsets change result. | Independent arithmetic from stated inputs |
| 14 | 2 eV Arrhenius barrier from 1273 K to 1373 K gives 3.77×rate | CALCULATED | exp[(2/kB)(1/1273−1/1373)]; agrees roughly fourfold. | Independent arithmetic from stated inputs |
| 15 | 1.5 eV barrier at 873 K gives 2.28%per kelvin local sensitivity | CALCULATED | Ea/(kBT²)=.02284/K; finite 10 K changes are approximately 25%. | Independent arithmetic from stated inputs |
| 16 | A 1 nm SiO2 interface plus 2 nm HfO2(k 20) gives 1.39 nm EOT | CALCULATED | Series dielectric contribution 1+2×3.9/20; HfO2-only EOT is not who legate EOT. | Independent arithmetic from stated inputs |
| 17 | 2 nm film at 2.8 e22 formula units/cm³ has 5.6 e15 Hf atoms/cm² | CALCULATED | 2 e-7×2.8 e22; consistent rounded 5.5 e15. | Independent arithmetic from stated inputs |
| 18 | 1.8 volumes H 2 plus 1 O 2 leaves 1.8 H2O plus.1 O 2 | CALCULATED | Stoic hio metric model gives 94.74%steam if reaction complete and no dil u ent. | Independent arithmetic from stated inputs |
| 19 | 94.74%steam at 760 torr gives 720 torr | CALCULATED | .9474×760=720; gas ratios alone do not guarantee combustion completeness. | Independent arithmetic from stated inputs |
| 20 | 720 torr versus 640 torr gives 1.125×pressure factor | CALCULATED | Parabolic constant proportionality assumes other conditions fixed. | Independent arithmetic from stated inputs |
| 21 | A 1 GPa 100 nm film on 775µm Si gives about 60µm bow in Stoney example | CALCULATED | With biaxial modulus 180 GPa,κ=.00555/m;κr²/2=62.4µm at 150 mm radius. | Independent arithmetic from stated inputs |
| 22 | Argon mean free path scaling from.07µm at 1 atm gives 5.32 cm at 1 mtorr | CALCULATED | Pressure ratio 760,000 at fixed temperature; cross-section approximation. | Independent arithmetic from stated inputs |
| 23 | WF 6+3 H 2→W+6 HF conserves atoms | CALCULATED | W 1, F 6, H 6; balanced reaction does not establish nucleation behavior. | Independent arithmetic from stated inputs |
| 24 | ALD can coat varied topography with controlled thickness | PRIMARY CHECK | ASM describes con formality; deep features still require adequate saturation. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 25 | Plasma enhancement permits lower-temperature A LD applications | PRIMARY CHECK | ASM states plasma supply reaction energy; not all plasma exposures are damage-free. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 26 | Epitaxy produces a monocrystalline layer with distinct material properties | PRIMARY CHECK | Siltronic describes layer/substrate selection. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 27 | LPCVD/PEC VD temperature and pressure ranges are universal recipes | UNRESOLVED | Film, precursor, reactor and thermal budget dependent; manufacturer overview does not confirm exact ranges. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 28 | ASM 55%ALD, Kokusai 70%batch, Applied 80%PV D shares | UNRESOLVED | Category/year definitions not independently verified; retain as dated estimates. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 29 | HfO2 always grows.1 nm/cycle with 2–10 second cycles | UNRESOLVED | Illustrative calibration, not a universal rate; nucleation/exposure/purge matter. | [Primary source consulted](https://www.asm.com/our-technology-products/ald) |
| 30 | Contact resistivity 1 e-9Ωcm² is achieved at all advanced contacts | UNRESOLVED | The 250Ωcalculation is correct for assumed input; actual interface value remains device-specific. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |

## Edits and quiz coverage

- Ambiguous Key Numbers label corrected: TMA/H2O makes Al2O3; HfO2 needs a hafnium precursor.
- Changed absolute wording to note thin-oxide and 3D limitations. Using supplied constants, 1 µm takes about 99 h.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 12 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

Oxidation and ALD examples retain assumptions, precursor identity and calibrated growth behavior. Remaining depth work: evaluate every deposition-family subsection for comparable mechanism-to-failure depth; no uniform per-section score is asserted. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
