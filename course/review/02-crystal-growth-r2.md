# Round 2 targeted review: Module 02: Crystal Growth: Czochralski and Float Zone

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 8 primary-source checked, 17 calculated, 5 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | CZ pulls a seed-oriented single crystal from molten polysilicon | CONFIRMED | SUMCO describes quartz crucible, melt near 1,420 °C, rotation and seed inheritance. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 2 | Float-zone growth avoids contact with a quartz crucible | CONFIRMED | This reduces oxygen incorporation; it does not imply no impurities of any kind. | [Primary source](https://www.siltronic.com/en/products/special-products.html) |
| 3 | 200 mm float-zone crystals are commercially available | CONFIRMED | Siltronic dates its 200 mm offering to 2002; this is not proof of a universal physical diameter ceiling. | [Primary source](https://www.siltronic.com/en/products/special-products.html) |
| 4 | 2 m cylindrical body at 306 mm diameter weighs about 343 kg | CONFIRMED | π × 0.153² × 2 × 2,330 ≈ 343 kg; at exactly 300 mm it is about 329 kg. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 300 kg on a 3 mm neck produces approximately 400 MPa stress | CONFIRMED | mg/(πd²/4) ≈ 416 MPa; simple axial stress excludes stress concentration. | Independent arithmetic using the explicitly stated model inputs |
| 6 | Boron k=0.8 increases concentration toward the tail in Scheil model | CONFIRMED | At solid fraction 0.9, concentration relative to the seed end is 0.1^-0.2 ≈ 1.58; resistivity falls to about 0.63 of start if mobility fixed. Model assumptions, not a measured production profile. | Independent arithmetic using the explicitly stated model inputs |
| 7 | A seed determines the orientation of the new crystal | PRIMARY CHECK | SUMCO explicitly states newly grown atoms follow seed orientation. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 8 | CZ feed is melted in a quartz crucible | PRIMARY CHECK | Manufacturer process confirms the vessel material and melting stage. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 9 | Small boron or phosphorus additions adjust resistivity | PRIMARY CHECK | Manufacturer describes intentional doping during crystal preparation. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 10 | Silicon lattice parameter 0.5431 nm implies atomic density about 5×10^22/cm³ | CALCULATED | Diamond cubic has eight atoms per conventional cell: 8/(5.431×10^-8 cm)^3 = 4.99×10^22/cm³. | Independent arithmetic from stated inputs |
| 11 | FZ material can provide high resistivity andlong carrier lifetime | PRIMARY CHECK | Siltronic describes these application properties; no universal numeric guarantee implied. | [Primary source consulted](https://www.siltronic.com/en/products/special-products.html) |
| 12 | Epi properties can differ from the underlying substrate | PRIMARY CHECK | Siltronic describes independent choice of layer and substrate properties. | [Primary source consulted](https://www.siltronic.com/en/products/epitaxial-wafers.html) |
| 13 | 400 kg latent melting energy at 1,790 J/g is about 720 MJ | CALCULATED | 400,000×1790=716 MJ=198.9 kWh; sensible heating and losses additional. | Independent arithmetic from stated inputs |
| 14 | 1 mm/min growth with density 2.33 g/cm³ implies 69 kW/m² latent flux | CALCULATED | 2330×(0.001/60)×1.79 e6=69,512 W/m². | Independent arithmetic from stated inputs |
| 15 | Thermal gradient 30 K/cm equals 3,000 K/m | CALCULATED | Conductivity 22 W/m K then gives 66 kW/m²; validates stated interface heat-balance example only. | Independent arithmetic from stated inputs |
| 16 | 300 mm solid disc area gives about 329 kg per 2 m cylinder | CALCULATED | π×.15²×2×2330=329.4 kg;306 mm as-grown cylinder gives 343 kg. | Independent arithmetic from stated inputs |
| 17 | Two-meter body at.8 mm/min takes 41.7 hours | CALCULATED | 2000/.8/60=41.67; excludes neck, crown, tail, cooldown. | Independent arithmetic from stated inputs |
| 18 | 2.5–3.5 day cycles yield 8.6–12 ideal pulls per 30 days | CALCULATED | 30/3.5 to 30/2.5; maintenance and failures reduce realized output. | Independent arithmetic from stated inputs |
| 19 | 1 ppma oxygen corresponds to 5 e16 atoms/cm³ | CALCULATED | 1 e-6×5 e22=5 e16; requires atomic-fraction convention. | Independent arithmetic from stated inputs |
| 20 | 12 ppma oxygen in 343 kg Si corresponds to about 2.35 g | CALCULATED | 343 kg×12 e-6×16/28.0855=.00235 kg; distinguish atomic from mass fraction. | Independent arithmetic from stated inputs |
| 21 | Atg=.9, phosphorus k=.35 gives 4.47×seed concentration | CALCULATED | (.1)^(-.65)=4.47 within Scheil assumptions. | Independent arithmetic from stated inputs |
| 22 | Critical v/G 1.5 e-3 with G 25 K/cm gives.375 mm/min | CALCULATED | 1.5 e-3×25=.0375 cm/min; gradient 35 gives.525 mm/min. | Independent arithmetic from stated inputs |
| 23 | A 3 mm neck at 416 MPa differs greatly from a 6 mm neck at the same load | CALCULATED | Doubling diameter quadruples area and reduces nominal axial stress to 104 MPa. This does not quantify hot-crystal strength. | Independent arithmetic from stated inputs |
| 24 | Melting 400 kg Si reduces volume from about 172 L to 156 L | CALCULATED | 400/2330=.1717 m³;400/2570=.1556 m³ using stated densities. | Independent arithmetic from stated inputs |
| 25 | 1,850 wafers×775µm retains 1.434 m of 2 m body | CALCULATED | Remaining 28.3%ofbody length is kerf/finishing in this simplified budget. | Independent arithmetic from stated inputs |
| 26 | 10–18 ppma CZ oxygen is universal production range | UNRESOLVED | Depends on growth method, calibration and customer. Manufacturer confirms oxygen distinction but not universal specification. | [Primary source consulted](https://www.siltronic.com/en/products/special-products.html) |
| 27 | MCZ field 0.2–0.4 T and roughly halving oxygen | UNRESOLVED | Exact field/oxygen response not given by manufacturer overview; keep as illustrative. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 28 | 200 mm is an immutable FZ physical diameter ceiling | UNRESOLVED | Commercial 200 mm verified; theoretical ceiling wording is too strong without design-specific stability analysis. Qualified. | [Primary source consulted](https://www.siltronic.com/en/products/special-products.html) |
| 29 | Top five wafer maker 85–90%share | UNRESOLVED | Manufacturer product pages do not establish market shares across revenue, area or capacity. Retain dated estimate. | [Primary source consulted](https://www.siltronic.com/en/products/special-products.html) |
| 30 | Puller heater 100–200 kW andonly 3%latent heat | UNRESOLVED | Latent fraction varies with growth rate/diameter/power; plausible order of magnitude, no measured vendor balance checked. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |

## Edits and quiz coverage

- No substantive factual change was warranted by the six sampled checks.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 11 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

Crystal geometry, heat balance, segregation and commercial-versus-physical limits received targeted checks. Remaining depth work: the constitutional-supercooling derivation and defect-regime transition narrative require a complete specialist reread; their mere presence is not a depth score. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
