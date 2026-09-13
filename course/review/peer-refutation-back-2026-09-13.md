# Independent peer refutation: modules 11–21

Reviewed 2026-09-13 by the front-half content reviewer, separately from the back-half author. This is a targeted six-claim sample per module (66 total), selected for consequential physics, model corrections, supplier roles and cross-module consistency. It is not an exhaustive reread, an audit of every combined Key Numbers row, or independent experimental replication.

Primary pages were reopened for this stage; arithmetic was recomputed from the stated inputs. An unchanged model output does not validate proprietary inputs. Manufacturer demonstrations remain attributed claims. Initial Intel newsroom retrieval failed; its investor-relations mirror and indexed primary text were used. No copied v1 verdict counts as new evidence.

**Outcomes:** 37 calculated, 28 primary supported, 1 scope refinement.

## Module 11

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 300 K conventional thermal subthreshold limit | CALCULATED | ln(10)×8.617333262e-5×300 = 0.05953 V/dec. Production values and non-thermionic devices are outside this derivation. | Independent recalculation; stated inputs retain uncertainty. |
| 1.8 nm HfO2 plus0.6 nm SiO2 gives0.951 nm EOT | CALCULATED | 0.6+1.8×3.9/20=0.951 nm, whereas physical thickness is2.4 nm. Requires the stated dielectric constant. | Independent recalculation; stated inputs retain uncertainty. |
| 7×50×16 nm fin has about5.6 dopants at1e18/cm³ | CALCULATED | Volume5.6e-18 cm³; mean5.6 or0.056 at1e16/cm³. Fractional mean describes an ensemble, not a fraction of an atom in one device. | Independent recalculation; stated inputs retain uncertainty. |
| N2 demonstrated0.021µm² bitcell and38.1Mb/mm² macro | PRIMARY SUPPORTED | TSMC2025 abstract explicitly distinguishes cell area from macro density. Reciprocal bitcell area is47.62Mb/mm², so macro includes area overhead; do not equate the two. | [Primary source](https://research.tsmc.com/page/memory/4.html) |
| N2 benefit is>1.15× chip density | PRIMARY SUPPORTED | TSMC2024 abstract says chip density, alongside15% speed or30% power benefit. A pure-logic density claim is not supported by that wording. | [Primary source](https://research.tsmc.com/page/transistor-structure/59.html) |
| PowerVia Blue Sky Creek>90% utilization,>30% droop improvement,6% frequency benefit | PRIMARY SUPPORTED | Intel newsroom direct retrieval failed; its investor-relations copy/search excerpt supports these test-vehicle figures. They are not universal production improvements. | [Primary source](https://www.intc.com/news-events/press-releases/detail/1623/powervia-test-shows-industry-leading-performance) |

## Module 12

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 20×40 nm contact at1e-9 Ωcm² gives125Ω | CALCULATED | Area8e-12 cm²; resistivity/area=125Ω. Uniform interface assumed; spreading resistance excluded. | Independent recalculation; stated inputs retain uncertainty. |
| 2 nm TaN across20×20 nm via gives10Ω | CALCULATED | 200µΩcm×2e-7 cm/(4e-12 cm²)=10Ω. Material resistivity remains a model input. | Independent recalculation; stated inputs retain uncertainty. |
| 110→300°C Arrhenius acceleration for0.9eV isabout8400 | CALCULATED | exp[(.9/8.617333262e-5)(1/383.15−1/573.15)]≈8402. Requires the same failure mechanism and measured line temperature. | [Primary source](https://www.itl.nist.gov/div898/handbook/apr/section1/apr151.htm) |
| Superconformal Cu filling depends on surface catalyst coverage | PRIMARY SUPPORTED | NIST abstract ties local growth velocity to adsorbed catalytic species and changing feature area, supported by experiments/simulations. Gravity alone is not its model. | [Primary source](https://www.nist.gov/publications/superconformal-electrodeposition-submicron-features) |
| Subtractive Ru can outperform Cu in selected narrow structures | PRIMARY SUPPORTED | Imec2018 describes12nm etched Ru and barrierless integration motivations. It demonstrates a research alternative, not universal lower resistance or production adoption. | [Primary source](https://www.imec-int.com/en/articles/imec-reports-breakthrough-in-extending-interconnects-beyond-the-3nm-technology-node) |
| PowerVia relocates power routing to the backside | PRIMARY SUPPORTED | Intel's test description separates backside power from front-side signal routing; its measured benefits are specific to the demonstrated vehicle. | [Primary source](https://www.intc.com/news-events/press-releases/detail/1623/powervia-test-shows-industry-leading-performance) |

## Module 13

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| eScan1100 has25 beams and up to15× throughput | PRIMARY SUPPORTED | ASML states this vendor maximum versus single-beam tools.25 beams does not imply25× speed, and recipe dependence remains. | [Primary source](https://www.asml.com/en/products/metrology-and-inspection-systems/hmi-escan-1100) |
| 5 nm pixels across300 mm requireabout82 days at400MHz | CALCULATED | π×150²/(5e-6)²=2.827e15 pixels; divided by4e8 and86400 gives81.81 days, before overhead. Supports throughput limitation, not physical impossibility. | Independent recalculation; stated inputs retain uncertainty. |
| Centered normal Cpk≈1.33 corresponds toabout4σ limits | PRIMARY SUPPORTED | NIST defines nearest-limit/(3σ) and lists64ppm for a centered8σ-wide process. No guarantee for nonnormal or drifting processes. | [Primary source](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc16.htm) |
| 800mm² die atD=.1/cm² yields44.93% Poisson or51.02% negative-binomialα2 | CALCULATED | exp(-.8)=.44933; (1+.8/2)^-2=.51020. These different answers reflect distinct defect-clustering assumptions. | Independent recalculation; stated inputs retain uncertainty. |
| GH100 has144 physical SMs,132 enabled in SXM and114 in PCIe | PRIMARY SUPPORTED | NVIDIA architecture documentation supports counts. Disabled resources do not disclose defect distribution or actual manufacturing yield. | [Primary source](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) |
| A10^-12/feature maturity target is not verified by a10^-11 risk example | SCOPE REFINEMENT | 1−exp(−1e10×1e-11)=9.516% failure risk. This verifies the example, not an industry target. Requested that report separate the unresolved empirical target from confirmed arithmetic. | Independent recalculation; stated inputs retain uncertainty. |

## Module 14

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 300mm silicon expands78µm across100K atconstant2.6ppm/K | CALCULATED | 300mm×2.6e-6/K×100K=.078mm. Differential card motion and temperature-dependent CTE are additional. | Independent recalculation; stated inputs retain uncertainty. |
| FormFactor MEMS probes can exceed1million contact cycles | PRIMARY SUPPORTED | Manufacturer page gives this capability. It does not establish a universal maintenance or refurbishment interval. | [Primary source](https://www.formfactor.com/products/probe-cards/?FC=1) |
| HFTAP K32 supports6.4Gbps wafer-level testing | PRIMARY SUPPORTED | Product page lists3.2GHz/6.4Gbps, so a generic5Gbps ceiling would be false. Specialized product capability differs from every ATE channel. | [Primary source](https://www.formfactor.com/product/probe-cards/dram/hftap-series/) |
| 200A in10ns through50pH implies1V inductive transient | CALCULATED | Ldi/dt=50e-12×200/10e-9=1V. Local decoupling and waveform shape determine actual observed droop. | Independent recalculation; stated inputs retain uncertainty. |
| Williams-Brown Y=.7 gives3560DPPM atT=.99 and356.6 at.999 | CALCULATED | 1−.7^(1−T), multiplied by1e6. Approximate tenfold change is model-specific, not a universal relation between reported fault coverage and real escapes. | Independent recalculation; stated inputs retain uncertainty. |
| H100 harvesting counts do not prove universal doubling of yield | PRIMARY SUPPORTED | NVIDIA supports144/132 resources but gives no defect model or yield result on the source page. The corrected example must remain hypothetical. | [Primary source](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) |

## Module 15

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| Charge sharing atVDD1.1V,Cs12fF,Cbl36fF gives137.5mV | CALCULATED | .55×12/(12+36)=.1375V. No universal minimum sensing capacitance follows without noise/offset/loading specifications. | Independent recalculation; stated inputs retain uncertainty. |
| 16Gibit of6F² cells atF12.5nm occupies16.11mm² before overhead | CALCULATED | 6×12.5²×16×2^30/1e12=16.106mm². Array-block area and finished die area require extra circuitry and layout factors. | Independent recalculation; stated inputs retain uncertainty. |
| 300ON pairs at40–45nm pitch occupy12–13.5µm before overhead | CALCULATED | 300×40–45nm. Extra support/interdeck layers can explain a larger stack; process is repeated film cycles, not one film deposition. | Independent recalculation; stated inputs retain uncertainty. |
| HBM4 doubles interface width to2048bits | PRIMARY SUPPORTED | Micron current page explicitly gives2048 I/O and compares to HBM3E. Interface width and stack capacity are separate properties. | [Primary source](https://www.micron.com/products/memory/hbm/hbm4) |
| Micron HBM4>11Gbps yields>2.8TB/s raw stack bandwidth | PRIMARY SUPPORTED | 2048×11/8=2816GB/s; vendor page supports>2.8TB/s. This does not redefine a JEDEC minimum or guarantee application bandwidth. | [Primary source](https://www.micron.com/products/memory/hbm/hbm4) |
| Redirecting100k wafers at2.5×HBM area penalty produces40k conventional-wafer-equivalent bits | CALCULATED | 100k/2.5=40k, so60k equivalent bits are lost versus the original output. Multiplying by2.5 reverses the physical penalty. | Independent recalculation; stated inputs retain uncertainty. |

## Module 16

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 500µm grind at4µm/s takes125s;30µm at.5µm/s takes60s | CALCULATED | Depth/rate checks. Handling, wheel dressing and process constraints can change actual cycle time. | Independent recalculation; stated inputs retain uncertainty. |
| Stealth dicing creates an internal modified layer then expands tape | PRIMARY SUPPORTED | DISCO confirms the mechanism. Its overview does not establish1064nm as the unique wavelength for all tools/materials. | [Primary source](https://www.disco.co.jp/eg/solution/library/laser/stealth.html) |
| Cu plating at1A/dm² givesabout.2205µm/min at100% efficiency | CALCULATED | 100A/m²×.063546kg/mol/(2×96485.33212×8960kg/m³)×60×1e6=.2205. At3A/dm²,40µm takes60.5min ideally. | Independent recalculation; stated inputs retain uncertainty. |
| 3mm long25µm-diameter Cu wire hasabout.103Ω resistance | CALCULATED | 1.68e-8×.003/(π×(12.5e-6)²)=.1027Ω. Inductance requires return-path geometry and is not established by this calculation. | Independent recalculation; stated inputs retain uncertainty. |
| 700W across100µm TIM at5W/mK over8.1cm² gives17.28K | CALCULATED | Q×t/(kA)=700×1e-4/(5×8.1e-4)=17.28K. Ideal one-dimensional conduction excludes interface/contact resistance. | Independent recalculation; stated inputs retain uncertainty. |
| Ajinomoto describesabout95% share in high-performance FC-BGA insulation | PRIMARY SUPPORTED | Company interview supports its self-reported category share. It does not establish95% of every substrate/package, and has no independent market audit here. | [Primary source](https://www.ajinomoto.com/stories/the-ajinomoto-groups-unexpected-role-in-semiconductor-manufacturing-the-insulating-film-abf-born-from-aminoscience) |

## Module 17

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 858mm² field is not an absolute chip-area prohibition | PRIMARY SUPPORTED | CerebrasWSE3 is a46,225mm² wafer-scale processor, a direct counterexample. Conventional single-field858mm² remains a meaningful scanner/design constraint. | [Primary source](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine) |
| Poisson model gives44.9% for800mm² and67.0% for400mm² atsameD | CALCULATED | exp(-8×.1) andexp(-4×.1). Combining good small dies still needs assembly/interconnect yield and cost accounting. | Independent recalculation; stated inputs retain uncertainty. |
| 6µm ideal square bond pitch gives27,778/mm² | CALCULATED | 1e6/6²=27777.8; relative to45µm pitch,(45/6)²=56.25. Edge, power and routing exclusions reduce usable signal density. | Independent recalculation; stated inputs retain uncertainty. |
| 8TB/s at1pJ/bit consumes64W | CALCULATED | 8×8×10^12bit/s×1e-12J/bit=64W. Energy boundary must specify transmitter,receiver and any other included circuitry. | Independent recalculation; stated inputs retain uncertainty. |
| CoWoS-S,R,L use distinct interposer structures | PRIMARY SUPPORTED | TSMC describes full silicon S; polymer/Cu RDL R; and RDL plus local silicon/eDTC options in L. This supports the corrected architectural distinctions. | [Primary source](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm) |
| CoWoS-R entered volume production2023 and first3.5×CoWoS-L2024 | PRIMARY SUPPORTED | TSMC dates these variants. These statements do not identify every customer's exact package size or future roadmap completion. | [Primary source](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm) |

## Module 18

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 125°C vs55°C atEa.7eV yields77.65× acceleration | CALCULATED | exp[(.7/kB)(1/328.15−1/398.15)]=77.65.48h corresponds to3727h for that same mechanism, not a guaranteed full product lifetime. | [Primary source](https://www.itl.nist.gov/div898/handbook/apr/section1/apr151.htm) |
| Zero-failure231×1000h withAF78 gives50.85FIT at60% confidence | CALCULATED | −ln(.4)/(231×1000×78)×1e9=50.85. Assumes exponential rate and correct acceleration, not proof of zero failures. | Independent recalculation; stated inputs retain uncertainty. |
| 10mV reduction around.8V changes dynamic powerabout2.5% | CALCULATED | First-order2ΔV/V=.025; exact reduction1−(.79/.8)²=.02484. Applies only to the dynamic component with other factors fixed. | Independent recalculation; stated inputs retain uncertainty. |
| 2000equal30mΩ contacts yield15µΩ,15mV and15W at1000A | CALCULATED | Parallel resistance=.03/2000; V=IR andP=I²R. Return contacts, unequal sharing and heating dependence can add losses. | Independent recalculation; stated inputs retain uncertainty. |
| Five assumed back-end yields compound to91.01% | CALCULATED | .98×.96×.992×.985×.99=.91008. Stages must use compatible conditional populations, not multiply unrelated measured percentages. | Independent recalculation; stated inputs retain uncertainty. |
| 100slots at30min and90% utilization produce180UPH | CALCULATED | 100×2×.9=180/h;8760h gives1.5768M/year. Excludes additional turnaround or downtime unless included in90%. | Independent recalculation; stated inputs retain uncertainty. |

## Module 19

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| GH100/H100 resource specification must distinguish physical die and enabledSKU | PRIMARY SUPPORTED | Fresh NVIDIA source confirms814mm²,80B,144physical/132SXM SMs and80GB HBM3. This peer row does not reverify every combined r2 bandwidth/power detail. | [Primary source](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) |
| Original Blackwell combines208B transistors across two4NPdies with10TB/s link | PRIMARY SUPPORTED | NVIDIA launch release supports these architecture facts. It does not imply every Blackwell-branded product has this configuration. | [Primary source](https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing) |
| 5%of.8V allows40mV and44.44µΩ at900A | CALCULATED | .05×.8=.04V; .04/900=44.44e-6Ω. A budget is not a measured delivery-network resistance. | Independent recalculation; stated inputs retain uncertainty. |
| .9→.8V reduces dynamic power20.99% atfixedactivity,C,f | CALCULATED | 1−(.8/.9)²=.2098765. Total power savings may differ due to leakage, regulators and other loads. | Independent recalculation; stated inputs retain uncertainty. |
| EstimatedBOM and observed reseller price do not establish gross margin | PRIMARY SUPPORTED | NVIDIA filing separates R&D operating expense and lists multiple cost-of-revenue components beyond parts. Realized revenue and the correct accounting boundary are required. | [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf) |
| 130kW rack with85%liquid heat and10K coolant rise needs158.6L/min waterlikecoolant | CALCULATED | 130×.85/(4.18×10)×60=158.61kg/min. Density1kg/L assumed; different coolant properties or heat fractions change flow. | Independent recalculation; stated inputs retain uncertainty. |

## Module 20

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| WSTS Spring2026 forecast is$1.51T and90% growth | PRIMARY SUPPORTED | Fresh WSTS release states forecast, not realized annual sales. This check does not independently establish every2024/2025 number in the combined r2 row. | [Primary source](https://www.wsts.org/76/Recent-News-Release) |
| 2025 materials revenue$73.2B consists of45.8B fab and27.4B packaging | PRIMARY SUPPORTED | SEMI May2026 release directly reports the historical totals; sum73.2B. Supplier category totals differ from all chip revenue. | [Primary source](https://www.semi.org/en/semi-press-release/global-semiconductor-materials-market-revenue-reaches-record-73.2-billion-dollars-in-2025-semi-reports) |
| TSMC2025 revenue$122.42B andgross margin59.9% | PRIMARY SUPPORTED | Fresh annual-report page supports both; gross margin is distinct from50.8% operating margin. These are company-wide figures. | [Primary source](https://investor.tsmc.com/static/annualReports/2025/english/index.html) |
| 1.5×wafer price at1.15×effective density increases cost/transistor30.4% | CALCULATED | 1.5/1.15=1.30435 assuming unchanged usable area/yield. Chip-density claim cannot silently be relabeled pure-logic density. | Independent recalculation; stated inputs retain uncertainty. |
| January2026 capex52–56B is historical;July guidance60–64B | PRIMARY SUPPORTED | TSMC January release verifies old guide; July16 transcript page4 verifies raised guide.00/20 can coexist only with their dates clearly stated. | [Primary source](https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2026-08/3e494f0c14dd0890f897aa044415e21d93486cc4/TSMC%202Q26%20Transcript.pdf) |
| Annual3.4B depreciation at40k/month gives7870/wafer at90% or14167 at50%utilization | CALCULATED | 3.4e9/(40000×12×.9)=7870.37; denominator.5 gives14166.67. Fixed-cost allocation model, not a price quote. | Independent recalculation; stated inputs retain uncertainty. |

## Module 21

| Claim challenged | Outcome | Refutation attempt and boundary | Evidence |
|---|---|---|---|
| 300mm×775µm Si disc weighsabout127.6g | CALCULATED | π×15²cm²×.0775cm×2.329g/cm³=127.59g. Notch and tolerances excluded. | Independent recalculation; stated inputs retain uncertainty. |
| UnequalEUV/ArF doses give21.45×photon-count ratio, equaldose14.30× | CALCULATED | Photons scale withenergy dose×wavelength:30×193/(20×13.5)=21.444;193/13.5=14.296. Corrected distinction holds. | Independent recalculation; stated inputs retain uncertainty. |
| 30k wafer divided by65candidates×44.93%yield gives1027/gooddie | CALCULATED | 30000/(65×exp(-.8))=1027.17. Wafer price times yield would have wrong economic meaning. | Independent recalculation; stated inputs retain uncertainty. |
| Reticle858mm² conventional field admits wafer-scale exceptions | PRIMARY SUPPORTED | Cerebras counterexample independently reopened. Half-height26×16.5=429mm² High-NA field is a distinct exposure-field limitation. | [Primary source](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine) |
| Arrhenius77.65× implies10h≈776.5h equivalent exposure | CALCULATED | Same.7eV and328.15/398.15K inputs as18; the summary must not turn that fixed-input answer into an arbitrary20–100range. | [Primary source](https://www.itl.nist.gov/div898/handbook/apr/section1/apr151.htm) |
| ABF95%self-reported share is not all semiconductor substrates | PRIMARY SUPPORTED | Ajinomoto scope is high-performance FC-BGA insulation. This matches16after correction; it is not an independently audited universal monopoly claim. | [Primary source](https://www.ajinomoto.com/stories/the-ajinomoto-groups-unexpected-role-in-semiconductor-manufacturing-the-insulating-film-abf-born-from-aminoscience) |

## Cross-module findings and remaining limits

- Module13’s stated stochastic maturity target was not established by the arithmetic used to label it confirmed. Sent to the author for a claim/verdict scope correction.
- TSMC N2’s0.021µm² bitcell and38.1Mb/mm² macro describe different area boundaries; the source’s>1.15× figure is chip density. Freshly verified latest author corrections preserve that distinction.
- Modules00 and20 use different dated2026 capex guidance. January52–56B and July60–64B are compatible; [January primary release](https://pr.tsmc.com/english/news/3281) establishes the earlier figure.
- Reticle fields, HBM bandwidth/interface width, gross-margin accounting, post-test KGD populations and model-versus-measured yield must keep consistent boundaries. The selected corrected claims reviewed here do.
- This pass does not establish production recipe ranges, supplier market shares beyond explicitly attributed manufacturer statements, undisclosed GPU yields, every technology-roadmap date, or every source in the course.

## Recomputed numerical checkpoints

| Check | Fresh computed result |
|---|---|
| SmV | 59.5264293 |
| EOT | 0.951 |
| EM_AF | 8401.83499 |
| pixel_days | 81.8123087 |
| poisson | 0.449328964 |
| negative_binomial | 0.510204082 |
| risk | 0.095162582 |
| escape99 | 3560.39614 |
| escape999 | 356.611343 |
| DRAMmm2 | 16.1061274 |
| plating_um_min | 0.220516031 |
| wireR | 0.102674037 |
| burn_AF | 77.6453821 |
| FIT | 50.8541865 |
| backend | 0.910081751 |
| coolantLmin | 158.61244 |
| discgrams | 127.586164 |
| diecost | 1027.17274 |
