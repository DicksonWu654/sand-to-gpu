# Round 2 targeted review: Module 08: Photolithography II: EUV in Full Detail

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 7 primary-source checked, 21 calculated, 2 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | EUV wavelength 13.5 nm and tin droplet two-pulse source | CONFIRMED | ASML describes the droplet deformation followed by plasma formation. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 2 | EUV optics use multilayer mirrors; NXE 0.33 and EXE 0.55 NA | CONFIRMED | ASML optics and product explanations. | [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 3 | 13.5 nm photon is approximately 92 eV | CONFIRMED | hc/λ = 1,239.84 eV·nm /13.5 nm ≈91.84 eV. | Independent arithmetic using the explicitly stated model inputs |
| 4 | 30 mJ/cm² implies about 20 photons/nm² | CONFIRMED | 0.03 J/cm² divided by 1.471×10^-17 J/photon and 10^14 nm²/cm² ≈20.4. Incident photons are not all absorbed. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 72 ng droplets at 50k/s imply 3.6 mg/s | CONFIRMED | 3.6 mg/s × 86,400 ≈0.311 kg/day of continuous generation. Not an independently measured refill requirement. | Independent arithmetic using the explicitly stated model inputs |
| 6 | Intel 18A uses High NA on selected layers by September 2026 | CONFIRMED | Intel September 7, 2026 announcement explicitly discusses selected 18A layers; not a claim that all layers use High NA. | [Primary source](https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry/intel-foundry-asml-accelerate-industry-readiness-for-high-na-euv.html) |
| 7 | A 25 µm droplet moves one diameter in about 0.36 µs at 70 m/s | CALCULATED | 25×10^-6/70 = 3.57×10^-7 s. Illustrates laser-position timing sensitivity; not a production jitter specification. | Independent arithmetic from stated inputs |
| 8 | ASML source description gives droplets around 25µm moving 70 m/s | PRIMARY CHECK | Supplier representative figures; not every source generation has identical settings. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 9 | EUV light path requires vacuum and specialized mirrors | PRIMARY CHECK | ASML explains strong absorption by ordinary optics and air. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 10 | High-NA reduction is 1/8 scan and 1/4 cross-scan | PRIMARY CHECK | ZEISS presentation states anamorphic design; wafer resolving power remains isotropic. | [Primary source consulted](https://asset-downloads.zeiss.com/catalogs/download/smt/2f5250f6-00a1-4d8e-a468-6bf812335b10/high-na-euv-optics_preparing-lithography-for-the-next-big-step.pdf) |
| 11 | NXE 3800 E throughput upgrade reaches 220 wph | PRIMARY CHECK | ASML 2024 strategic report states 220 versus 160 wph; different configurations/doses require care. | [Primary source consulted](https://ourbrand.asml.com/m/5f0bf644f7e26c9a/original/2024-Strategic-report-section.pdf) |
| 12 | Eleven reflections at.67 reflectance transmit 1.22% | CALCULATED | .67^11=.01222; intermediate-focus boundary excludes upstream source conversion. | Independent arithmetic from stated inputs |
| 13 | 500 W times 1.22% leaves about 6.1 W | CALCULATED | A rounded 5 W budget is reasonable when other losses are included; not measured resist power. | Independent arithmetic from stated inputs |
| 14 | 300 mm wafer area at 30 mJ/cm² needs about 21.2 J | CALCULATED | 706.86 cm²×.03 J/cm²=21.206 J; edge exclusion reduces exposed area. | Independent arithmetic from stated inputs |
| 15 | A 27µm spherical droplet occupies 1.03 e-14 m³ | CALCULATED | πd³/6; approximate geometry before laser deformation. | Independent arithmetic from stated inputs |
| 16 | Tin density 7,000 kg/m³ makes that droplet 72.1 ng | CALCULATED | Density×volume gives 7.21 e-11 kg=72.1 ng. | Independent arithmetic from stated inputs |
| 17 | 220 wph means 16.36 seconds per wafer | CALCULATED | 3,600/220; includes exposure and overhead under stated conditions. | Independent arithmetic from stated inputs |
| 18 | 50 k droplets/s over 16.36 seconds gives 818 k droplets | CALCULATED | Continuous-operation example; actual pulse schedules/recycling differ. | Independent arithmetic from stated inputs |
| 19 | One billion pulses at 50 k Hz spans 5.56 hours | CALCULATED | 1 e9/50,000/3,600; does not establish collector lifetime. | Independent arithmetic from stated inputs |
| 20 | 10.6µm laser wavelength is 785 times 13.5 nm | CALCULATED | 10,600/13.5=785.2; drive laser and emitted EUV are different photons. | Independent arithmetic from stated inputs |
| 21 | 6 degree shadow from 60 nm absorber is 6.3 nm at mask | CALCULATED | 60 tan 6°=6.31; at 4×reduction about 1.58 nm wafer-plane geometry. | Independent arithmetic from stated inputs |
| 22 | Mask-side NA at.33 wafer NA and 4×reduction is.0825 | CALCULATED | Corresponding half-angle asin(.0825)=4.73 degrees under vacuum optics approximation. | Independent arithmetic from stated inputs |
| 23 | .33 to.55 NA yields.60×linear resolution and 2.78×ideal areal density | CALCULATED | (.55/.33)^2=2.78; real design density does not equal this simple optical ratio. | Independent arithmetic from stated inputs |
| 24 | Depth-of-focus ratio at.55 versus.33 is.36 | CALCULATED | (.33/.55)^2=.36;124 nm maps 44.6 nm at fixed k 2 and wavelength. | Independent arithmetic from stated inputs |
| 25 | 30 nm resist at 5/µm absorption absorbs 13.9% | CALCULATED | 1−exp(−5×.03)=.1393;20.4 incident photons/nm² gives 2.84 absorbed. | Independent arithmetic from stated inputs |
| 26 | 20 nm resist at 15–20/µm absorbs 25.9–33.0% | CALCULATED | Beer-Lambert model yields 5.3–6.7 absorbed photons/nm² at stated dose. | Independent arithmetic from stated inputs |
| 27 | Pellicle 83–88%single-pass means 68.9–77.4%double-pass | CALCULATED | Square the transmission; heating/scattering and tool overhead not modeled. | Independent arithmetic from stated inputs |
| 28 | 26×16.5 mm High-NA field is 429 mm² | CALCULATED | Exactly half 26×33 mm area; large patterns need field strategy. | Independent arithmetic from stated inputs |
| 29 | Source 1 kWdemo automatically represents production wafer throughput | UNRESOLVED | A source demonstration is not a guaranteed scanner throughput; retain distinct qualification. | [Primary source consulted](https://www.asml.com/en/investors/annual-report/2025) |
| 30 | Collector replacement interval, reflectance decay andper-pass prices | UNRESOLVED | No supplier contract/reliability dataset checked; optical arithmetic does not verify economic estimates. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |

## Edits and quiz coverage

- No substantive factual change was warranted by the six sampled checks.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 14 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The EUV photon, mirror, source and anamorphic models received targeted checks. Remaining depth work: inspect the full stochastic-resist and mask-3D explanations for consistent absorption, dose and wafer/mask-plane boundaries. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
