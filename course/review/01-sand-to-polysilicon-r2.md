# Round 2 targeted review: Module 01: Sand to Polysilicon

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 7 primary-source checked, 17 calculated, 1 correction/qualification, 5 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Siemens deposition places high-purity silicon on heated seed rods | CONFIRMED | WACKER describes trichlorosilane feed and heated deposition; exact recipes vary. | [Primary source](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 2 | Silicon metal is made from silica in submerged-arc furnaces | CONFIRMED | USGS explicitly distinguishes silicon metal from ferrosilicon and subsequent high-purity processing. | [Primary source](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025_ver.1.0.pdf) |
| 3 | 2024 silicon-metal production approximately 4.6 Mt, China 3.9 Mt | CONFIRMED | USGS table; 3.9/4.6 ≈ 85%. Do not substitute the combined silicon-materials share. | [Primary source](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025_ver.1.0.pdf) |
| 4 | 9N implies 5 × 10^13 impurity atoms/cm³ at 5 × 10^22 sites/cm³ | CONFIRMED | Atomic-fraction interpretation: 10^-9 × 5 × 10^22. Purity reporting basis must match. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 690 kJ/mol implies approximately 6.8 MWh/t Si | CONFIRMED | 690/0.0280855 MJ/t divided by 3,600 MJ/MWh ≈ 6.82 MWh/t. | Independent arithmetic using the explicitly stated model inputs |
| 6 | China/non-China solar polysilicon price difference is entirely policy | MINOR | Removed exclusive attribution. Grade, qualification, geography and contracts also affect comparisons; current price quotes not reverified. | Not established by this review; retained caveat |
| 7 | MG silicon is converted to trichlorosilane using HCl | PRIMARY CHECK | WACKER describes this chemical conversion before purification. | [Primary source consulted](https://reports.wacker.com/2018/sustainability-report/servicepages/downloads/files/Polysilicon_7416_EN.pdf) |
| 8 | Trichlorosilane purification uses distillation | PRIMARY CHECK | Manufacturer flow confirms the phase-change separation step. | [Primary source consulted](https://reports.wacker.com/2018/sustainability-report/servicepages/downloads/files/Polysilicon_7416_EN.pdf) |
| 9 | Deposited rods are crushed and packaged without re contamination | PRIMARY CHECK | Manufacturer describes clean downstream mechanical processing. | [Primary source consulted](https://reports.wacker.com/2018/sustainability-report/servicepages/downloads/files/Polysilicon_7416_EN.pdf) |
| 10 | Semiconductor polysilicon receives additional cleaning | PRIMARY CHECK | WACKER differentiates the electronics finishing requirement. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 11 | Si+3 HCl→Si HCl 3+H 2 is atom-balanced | CALCULATED | Both sides contain Si 1, H 3, Cl 3; balancing alone does not establish reaction rate. | Independent arithmetic from stated inputs |
| 12 | 3 Si Cl 4+Si+2 H 2→4 Si HCl 3 is atom-balanced | CALCULATED | Si 4, Cl 12, H 4 are conserved; pressure and equilibrium still require process data. | Independent arithmetic from stated inputs |
| 13 | Si H 4→Si+2 H 2 is atom-balanced | CALCULATED | Silane pyrolysis conserves Si 1, H 4; not a validation of stated reactor operating conditions. | Independent arithmetic from stated inputs |
| 14 | 4 Si HCl 3→Si+3 Si Cl 4+2 H 2 conserves material | CALCULATED | Si 4, H 4, Cl 12 conserved; manufacturer lists this net deposition pathway. | [Primary source consulted](https://reports.wacker.com/2018/sustainability-report/servicepages/downloads/files/Polysilicon_7416_EN.pdf) |
| 15 | 9 N background is about 25×below 1.3×10^15/cm³ doping | CALCULATED | 1.3 e15/5 e13=26; magnitude consistent. | Independent arithmetic from stated inputs |
| 16 | BCl 3–TCS boiling-point separation is about 19°C | CALCULATED | 31.8−12.5=19.3°C using stated values; volatility is not determined by this gap alone. | Independent arithmetic from stated inputs |
| 17 | Six decades separation at relative volatility 2 needs 20 ideal stages | CALCULATED | ln(1 e6)/ln 2=19.93 at the stated idealized total-reflux limit. | Independent arithmetic from stated inputs |
| 18 | Radiation from 1373 K rods at emissivity.7 is about 140 kW/m² | CALCULATED | Stefan-Boltzmann calculation with 300 K surroundings gives about 141 kW/m². | Independent arithmetic from stated inputs |
| 19 | Forty-to-sixty kWh/kg is 40–60 MWh/t | CALCULATED | Unit conversion checks; boundary may exclude other plant loads. | Independent arithmetic from stated inputs |
| 20 | 11–13 MWh/t versus 6.8 MWh/t reaction minimum implies 52–62% | CALCULATED | 6.8/13=.523 and 6.8/11=.618;55–60% is approximate, not exact efficiency measurement. | Independent arithmetic from stated inputs |
| 21 | 2.5–2.7 t quartz per tonne Si corresponds to about 79–86%Si recovery | CALCULATED | Stoichiometric SiO2 requirement is 60.08/28.09=2.139 t;2.139/(2.5–2.7)=79–86%, not uniformly 85–90%. Corrected table. | Independent arithmetic from stated inputs |
| 22 | 2 m body at 306 mm diameter weighs 343 kg | CALCULATED | π×.153²×2×2330=342.7 kg; distinct from raw charge mass. | Independent arithmetic from stated inputs |
| 23 | 400 kg charge over 1,800 wafers is.22 kg/wafer | CALCULATED | 400/1800=.222; representative. Final disc mass is lower. | Independent arithmetic from stated inputs |
| 24 | Twenty ppt atomic impurities means 1 e12 atoms/cm³ | CALCULATED | 20 e-12×5 e22=1 e12; validates conversion, not analytical detection limits. | Independent arithmetic from stated inputs |
| 25 | FZ sample 1,000Ω·cm with hole mobility 450 gives 1.39 e13/cm³ | CALCULATED | 1/(qμρ) under single-carrier, constant-mobility assumption; about 278 ppta. | Independent arithmetic from stated inputs |
| 26 | EG feedstock 40–50 kt/year as of 2025 | UNRESOLVED | No independently verified market-total data in manufacturer pages consulted. Remains dated estimate. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 27 | Modern Siemens 40–60 kWh/kg and FBR 5–15 kWh/kg | UNRESOLVED | Manufacturer narrative confirms energy importance but not these comparable system boundaries. Treat as illustrative ranges. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 28 | Rod batches 60–120 hours and 1–2 t | UNRESOLVED | WACKER says several days; exact reactor design and batch mass not verified here. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 29 | Crucible dissolution 1 mm or 2 kg per 100 hours | UNRESOLVED | No measured geometry/flow source found in material pages consulted; retain explicit model estimate. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 30 | Electronic-grade polysilicon $20–40/kg | UNRESOLVED | Contract price not established by public manufacturing descriptions; must remain estimated and dated. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |

## Edits and quiz coverage

- Removed exclusive attribution. Grade, qualification, geography and contracts also affect comparisons; current price quotes not reverified.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 13 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The smelting examples now distinguish feed recovery, reaction heat and an approximate equilibrium crossing. Remaining depth work: read the full chlorosilane separation and crucible-contamination sections for unqualified absolutes and source-backed operating ranges. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
