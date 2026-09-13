# Round 2 targeted review: Module 07: Photolithography I: Photoresist and DUV

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 7 primary-source checked, 18 calculated, 1 correction/qualification, 4 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Production DUV numerical aperture reaches 1.35 | CONFIRMED | ASML explains immersion raises NA above one. | [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 2 | ArF light has wavelength approximately 193 nm | CONFIRMED | ASML wavelength description. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 3 | At k1=0.28, 193.4 nm/NA1.35 implies about 40 nm half-pitch | CONFIRMED | 0.28 × 193.4/1.35 ≈ 40.1 nm. Full pitch for equal lines/spaces is about 80.2 nm. | Independent arithmetic using the explicitly stated model inputs |
| 4 | DOF at k2=0.6 and NA1.35 approximately 64 nm | CONFIRMED | 0.6 × 193.4/1.35² ≈ 63.7 nm in the chosen convention; quiz now uses matching ±32 nm half-range. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 1.5–3 nm overlay is 20–25% of minimum pitch | WRONG | That percentage does not follow from the quoted pitch values. Replaced with an edge-placement-budget statement. | Independent arithmetic using the explicitly stated model inputs |
| 6 | 400 independent events have approximately 5% relative shot noise | CONFIRMED | sqrt(N)/N = 1/sqrt(N) = 5%; corrected quiz expression. It is a model, not the complete physical LER budget. | Independent arithmetic using the explicitly stated model inputs |
| 7 | Water immersion raises attainable NA above one | PRIMARY CHECK | ASML describes water between the final element and wafer. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 8 | DU V uses lenses whereas E UV requires reflective optics | PRIMARY CHECK | Absorption requires different optical technology; not a claim of absolutely zero transmission through any thin film. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 9 | ZEISS has provided AS ML lithography optics since late 1980 s | PRIMARY CHECK | ASML optical technology page explicitly identifies the partnership. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 10 | TEL LITHIUS includes coating and development | PRIMARY CHECK | Supplier product page confirms process scope and EUV/DU V applications. | [Primary source consulted](https://www.tel.com/product/lithius.html) |
| 11 | Resolution relationship includes k 1, wavelength and NA | PRIMARY CHECK | ASML gives CD=k 1λ/NA; actual patterns/resists determine k 1. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/rayleigh-criterion) |
| 12 | 193.4 nm divided by 1.437 gives 134.6 nm effective wavelength in water | CALCULATED | Optical phase wavelength, not a new laser source wavelength. | Independent arithmetic from stated inputs |
| 13 | k 1=.25 at 193.4 nm/NA 1.35 gives 35.81 nm half-pitch | CALCULATED | Equal line/space pitch 71.63 nm; theoretical configuration limit not universal production rule. | Independent arithmetic from stated inputs |
| 14 | 248 nm to 193 nm reduces wavelength 22% | CALCULATED | 1−193/248=.2218; feature gain also depends on NA and process factor. | Independent arithmetic from stated inputs |
| 15 | 4×reduction maps a 104×132 mm re tic le field to 26×33 mm | CALCULATED | Field geometry, not outer re tic le plate dimensions. | Independent arithmetic from stated inputs |
| 16 | 26×33 mm field area is 858 mm² | CALCULATED | Single exposure field area; wafer-scale stitching exceptions apply. | Independent arithmetic from stated inputs |
| 17 | 8 mmslit at 800 mm/s exposes a point for.01 s | CALCULATED | With 6 k Hz repetition, about 60 pulses; wafer plane units must match. | Independent arithmetic from stated inputs |
| 18 | Independent 5%pulse variation over 60 pulses averages about.65% | CALCULATED | 5%/sqrt 60=.645%; systematic pulse errors do not average away. | Independent arithmetic from stated inputs |
| 19 | 30 mJ/cm²Ar Fdose gives 2.92 e16 photons/cm² | CALCULATED | Photon energy hc/193.4 nm≈1.027 e-18 J; dose/energy. | Independent arithmetic from stated inputs |
| 20 | 20×20×100 nm³at 1 e19 acids/cm³contains 400 acids | CALCULATED | Volume 4 e-17 cm³; upper 1 e20 density would give 4,000, not 400. | Independent arithmetic from stated inputs |
| 21 | Dose quadrupling halves ideal relatives hot noise | CALCULATED | Counts proportional to dose;1/sqrt 4=.5; does not eliminate all LER mechanisms. | Independent arithmetic from stated inputs |
| 22 | Capillary pressure 2γ/r withγ=.072 N/m andr 40 nm gives 3.6 MPa | CALCULATED | Geometry/contact angle conventions matter; illustrative men is cus model. | Independent arithmetic from stated inputs |
| 23 | Spin film thickness proportional to rpm^-1/2 means 1%speed shift≈.5%thickness shift | CALCULATED | Local derivative; at 100 nm, about.5 nm. | Independent arithmetic from stated inputs |
| 24 | 80 nm pitch SADP/SAQP examples yield 40/20 nm | CALCULATED | Ideal pitch division; cut masks/pitch walk introduce additional constraints. | Independent arithmetic from stated inputs |
| 25 | Quadrature of 2.5,1.5,2 nm errors is 3.54 nm | CALCULATED | Square sum 12.5 nm²; worst-case aligned sum 6 nm. | Independent arithmetic from stated inputs |
| 26 | Quadrature of 15,20,10,10 nm focus errors is 28.72 nm | CALCULATED | Comparison with±32 nm half DOF leaves about 3.3 nm; covariance changes budget. | Independent arithmetic from stated inputs |
| 27 | All reported layer counts and mask totals apply through 2026 | UNRESOLVED | Tool pages do not publish the full T SMC process flow; dated reconstructions remain estimates. | [Primary source consulted](https://www.tel.com/product/lithius.html) |
| 28 | Resist price $1,000–3,000/Land consumption.5–1.5 m L | UNRESOLVED | Contract and recipe-specific; resulting cost range is $.5–4.5 if all endpoints combined, not universal $1–3. | [Primary source consulted](https://www.tel.com/product/lithius.html) |
| 29 | ASML 90%market share and country revenues | UNRESOLVED | Product roles verified, precise year/category denominators not independently audited here. | [Primary source consulted](https://www.asml.com/en/investors/annual-report/2025) |
| 30 | NXT 2100 i overlay spec and typical on-product error | UNRESOLVED | Vendor qualification conditions andon-product metrics differ; exact numbers not verified from readable products pecs. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |

## Edits and quiz coverage

- That percentage does not follow from the quoted pitch values. Replaced with an edge-placement-budget statement.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 14 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

Resolution, focus, overlay and resist-cost models received targeted numerical review. Remaining depth work: an optics reader should assess the complete pupil/order and multi-patterning derivations, not only the sampled endpoints. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.

## Survey numerical traceability

Chapter `S04-drawing-with-light.md`: 2580 whitespace-delimited words. This chapter synthesizes the current corrected source modules; it does not claim all source-module content received exhaustive verification. All substantive quantities in the body and table are mapped below. Module identifiers, chapter labels and explanatory counting words are navigation, not empirical claims.

| Survey quantities | Deep module | Location / check |
|---|---|---|
| KrF248nm;ArF193nm;NA1.35 | 07 | Key Numbers; ASML source checks |
| k1=.28;40nm half-pitch;80nm pitch | 07 | Rayleigh example |
| EUV13.5nm;NXE.33/EXE.55NA | 08 | Key Numbers; ASML source checks |
| 30mJ/cm²;20incident photons/nm² | 08 | Photon Physics and Stochastics |

Checks: one named widget, valid deep-route syntax, required opening/gist/body/numbers/companies/difficulty/deeper sections, and six main explanatory sections. Scientific explanations follow the named modules; industry-share forecasts and proprietary recipe numbers are deliberately absent from the survey.
