# Independent refutation pass — 2026-09-13

This is a separate reviewer’s adversarial pass over **132 selected claims: six in each of 22 modules**. The r2 ledgers were used to locate consequential numerical, physical, supplier-scope and economic claims; their verdicts were not used as proof. Some rows intentionally revisit original assertions already corrected by the first reviewer. A rejected original assertion is not automatically a remaining defect in the final course.

The work included fresh primary-source retrieval, unit conversions, independent arithmetic, model-boundary counterexamples, and checking whether source footnotes actually support the prose. Scope is the claims named below. This is **not** a line-by-line verification of roughly half a million words, a certification of all reference tables, a legal review of export restrictions, or a claim that every proprietary recipe and price has been disclosed. Failed retrievals and unresolved inputs are explicitly retained.

Outcome counts: conditional 47, correction 3, partial 19, rejected 14, supported 25, unresolved 24. “Conditional” means the calculation or mechanism survives only under stated assumptions. “Partial” means a source confirms only part of a compound claim. “Unresolved” means this pass cannot authenticate the empirical specification; the row still records the actual scope/model challenge performed.

## New findings sent to the content owners

- Module 09: Lam Cryo’s <0.1% CD metric divides the CD range by **channel depth**, not by nominal channel CD. The distinction changes interpretation substantially.
- Module 12: Intel’s PowerVia vehicle used Intel 4 transistors in a special experimental process; calling it ordinary production “Intel 4 PowerVia” overstates the source.
- Module 20: the older $70–72B 2025 materials estimate is superseded by SEMI’s $73.2B actual result.
- Fresh sources also resolve the numerical subsets of WSTS’s Spring 2026 $1.51T forecast and NVIDIA’s July 2026 Rubin architecture announcement; neither turns forecasts or peak specifications into realized results.
- Module 19: A100 40GB HBM2 versus later 80GB HBM2e needs variant-specific wording; sent to owner.

The site’s illustrative GPU cost allocation was also corrected: an assumed component-price spread is no longer labeled NVIDIA gross profit. Those UI/model changes have separate browser validation in the QA report.

## Module 00

Claim leads: [00-overview-r2.md](00-overview-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| TSMC capacity exceeded 17 million 12-inch-equivalent wafers in 2025 | SUPPORTED | Opened TSMC company profile: annual capacity exceeds 17 M twelve-inch equivalents. Countercheck annual report: actual shipments 15 M, so capacity is not shipments or GPU allocation. [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile). |
| Total foundry capacity proves the front end was never constrained | REJECTED | Aggregate capacity says nothing about a particular qualified node, mask set, customer allocation or packaging balance. The supplier lists 305 processes and 534 customers; substituting total output for available GPU capacity is invalid. [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile). |
| Everything above estimated BOM is NVIDIA gross margin | REJECTED | Read NVIDIA FY26Q3 cost-of-revenue definition and income statement. Components omit manufacturing support, fallout, warranty, inventory provisions and logistics. R&D is separately operating expense. Estimated component spread cannot establish gross margin. [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf). |
| EUV uses 13.5 nm light | SUPPORTED | ASML identifies 13.5 nm EUV; this specifies wavelength, not the minimum printed feature or a marketed process-node dimension. [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers). |
| 100 k starts, 24 passes and 100 k productive passes/tool require 24 scanners | CONDITIONAL | Recomputed 100000×24/100000=24 tools. This assumes all quantities cover the same period and that 100 k already includes productive utilization; multiplying availability again would double-count downtime. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| H100 BOM and quoted-market-price estimates determine actual product profit | UNRESOLVED | No product-level realized revenue or complete COGS was disclosed by the cited filing. A reseller quotation and assumed component list cannot identify NVIDIA product profit. Model remains useful only as an explicitly illustrative allocation. |

## Module 01

Claim leads: [01-sand-to-polysilicon-r2.md](01-sand-to-polysilicon-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Siemens deposition places high-purity silicon on heated seed rods | SUPPORTED | WACKER describes chlorosilane feed depositing silicon on heated seed rods. This supports the process mechanism, not one universal electronic-grade recipe, temperature or energy consumption. [Primary source](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html). |
| Silicon metal is made from silica in submerged-arc furnaces | PARTIAL | LANL describes commercial heating of silica and carbon in an electric furnace with carbon electrodes. This confirms the broad reduction route, but the opened reference does not specify the submerged-arc design. USGS PDF retrieval remained unavailable. [LANL chemistry reference](https://periodic.lanl.gov/14.shtml). |
| 2024 silicon-metal production approximately 4.6 Mt, China 3.9 Mt | PARTIAL | USGS primary-domain indexed table gives 2024 silicon metal 3900 kt China and 4600 kt world; division gives 84.78%. Direct PDF retrieval failed, so this is indexed-primary confirmation only. Ferrosilicon is a different column and denominator. [Primary source](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-silicon.pdf). |
| 9 N implies 5 × 10^13 impurity atoms/cm³ at 5 × 10^22 sites/cm³ | CONDITIONAL | Recomputed 5e22×1e-9=5e13 impurity atoms/cm³. This assumes 9 N is an atomic purity fraction applicable to all lattice sites; a mass-purity specification would require element-dependent conversion. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 690 kJ/mol implies approximately 6.8 MWh/t Si | CONDITIONAL | Using 690 kJ/mol and 28.0855 g/mol gives 6.824 MWh/t. Reaction enthalpy is a thermochemical quantity, not measured plant electricity: heat losses, reaction conditions and material handling prevent equating them. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| China/non-China solar polysilicon price difference is entirely policy | REJECTED | WACKER explicitly discusses regional energy costs. A statement that the entire price difference is policy excludes a real cost channel; contract terms, grade and date also need controlled comparison. No causal price decomposition was established. [Primary source](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html). |

## Module 02

Claim leads: [02-crystal-growth-r2.md](02-crystal-growth-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| CZ pulls a seed-oriented single crystal from molten polysilicon | SUPPORTED | SUMCO describes melting in quartz and pulling a seed-oriented single crystal. Countercheck: this describes CZ, not every crystal-growth method; it does not imply a perfectly uniform axial dopant profile. [Primary source](https://www.sumcosi.com/english/products/process/). |
| Float-zone growth avoids contact with a quartz crucible | SUPPORTED | SUMCO and Siltronic distinguish float-zone from quartz-crucible CZ. Avoiding that contact reduces a major oxygen source; it does not logically guarantee zero oxygen or every impurity below detection. [Primary source](https://www.siltronic.com/en/products/special-products.html). |
| 200 mm float-zone crystals are commercially available | SUPPORTED | Siltronic states commercial 200 mm FZ availability since 2002. That is a demonstrated supplier offering, not proof 200 mm is a fundamental physical diameter ceiling. [Primary source](https://www.siltronic.com/en/products/special-products.html). |
| 2 m cylindrical body at 306 mm diameter weighs about 343 kg | CONDITIONAL | At 2330 kg/m³, π×(.306/2)²×2=342.704 kg; a 300 mm body instead gives 329.396 kg. The 343 kg answer requires 306 mm diameter and an ideal cylindrical body without neck, shoulder or tail. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 300 kg on a 3 mm neck produces approximately 400 MPa stress | CONDITIONAL | 300 kg×9.80665/(π×.0015²)=416.21 MPa. Order 400 MPa survives; ideal axial stress alone is not a complete neck-strength calculation because geometry, flaws and dynamic loading matter. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Boron k=0.8 increases concentration toward the tail in Scheil model | CONDITIONAL | Scheil residual factor(1−f)^(k−1) rises to 1.5849 at f=.9, k=.8. This predicts tail enrichment only under its mixing/no-solid-diffusion assumptions; it is not a measured production resistivity profile. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 03

Claim leads: [03-ingot-to-wafer-r2.md](03-ingot-to-wafer-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Wafer forming includes slicing, lapping, damage etching, polishing and cleaning | SUPPORTED | SUMCO lists shaping/slicing, lapping, chemical etch, polishing, cleaning and inspection. Process order is a useful representative sequence; optional grinding or specialty-wafer steps need not match one universal flow. [Primary source](https://www.sumcosi.com/english/products/process/). |
| Colloidal-silica mechanochemical polishing produces a mirror surface | SUPPORTED | SUMCO identifies colloidal-silica polishing and chemical/mechanical action. A mirror appearance is not itself a flatness, particle or subsurface-damage certificate. [Primary source](https://www.sumcosi.com/english/products/process/). |
| 2025 wafer shipments 12,973 MSI and revenue $11.4 B | SUPPORTED | SEMI February 10, 2026 report states 12973 MSI and $11.4 B for 2025. MSI measures shipped area across diameters, not a wafer count; dividing by 300 mm area would yield only equivalent count. [Primary source](https://www.semi.org/en/semi-press-release/semi-reports-2025-annual-worldwide-silicon-wafer-shipments-and-revenue-results). |
| 900 µm slice + 160 µm kerf consumes 1.06 mm per slice | CONDITIONAL | 900+160=1060 µm=1.06 mm pitch; kerf fraction 160/1060=15.09%. That fraction excludes later thickness loss and boule-end losses, so it is not total silicon material loss. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| A 300 mm diameter, 775 µm thick silicon disc weighs about 127 g | CONDITIONAL | π×15²cm²×.0775 cm×2.33 g/cm³=127.64 g. Notch, thickness tolerance and density convention explain rounding; this is geometry, not a weight acceptance test. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 1,800 wafers from a 2 m body at 1.06 mm pitch | CONDITIONAL | Ideal 2000/1.06 permits 1886 complete pitches.1800 wafers uses 1908 mm, leaving 92 mm for end losses or exclusion. It is plausible only with that explicit allowance, not the direct floor of the quoted inputs. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 04

Claim leads: [04-materials-and-consumables-r2.md](04-materials-and-consumables-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Ultrapure-water resistivity 18.2 MΩ·cm | SUPPORTED | Merck states 18.2 MΩcm at 25°C. Temperature must accompany this figure; inverse conductivity and temperature compensation affect comparisons. [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring). |
| Resistivity alone certifies overall purity | REJECTED | Merck distinguishes ionic resistivity from organic-carbon monitoring. High resistivity cannot rule out neutral organics, particles or biological contamination; one sensor does not certify overall purity. [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring). |
| CNT pellicle specifications and construction timing | PARTIAL | Mitsui May 2024 announcement supports 92%+ CNT transmission and a>1 k W design, with construction timing then tentative. An announced target/date does not prove commissioning or actual scanner lifetime. [Primary source](https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm). |
| 90% single-pass transmission gives 81% double-pass transmission | CONDITIONAL | Two traversals give.9²=.81. This assumes equal transmission per traversal and excludes other optical losses. A reflective mask architecture explains why a single-pass 90% number cannot be the total throughput factor. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 4.2% lattice mismatch at 25% Ge gives about 1.05% mismatch | CONDITIONAL | Linear interpolation.042×.25=.0105 gives 1.05%. This is a Vegard-style approximation; it does not establish relaxed composition, strain retention or critical thickness in a grown film. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 100 k wafers/month × 1,800 gallons/wafer is 6 million gallons/day | CONDITIONAL | 100000×1800/30=6 M USgal/day. Explicit 30-day month is necessary; per-wafer accounting must distinguish water withdrawal, recirculation and net consumption. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 05

Claim leads: [05-inside-a-fab-r2.md](05-inside-a-fab-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Tools receive utilities through the subfab and overhead automation transports wafers | SUPPORTED | Intel fab-tour material places utility support below tools and wafer automation overhead. This supports the architectural separation, not a fixed tool count or dimensions for every fab. [Primary source](https://virtualmuseum.intel.com/fabtour/cleanroom.html). |
| Cleanroom air flows through ceiling filtration toward the floor/subfab | SUPPORTED | Intel describes downward air movement into floor/subfab return paths. Real layouts differ and local minienvironments matter; it is not evidence that every cubic metre of the building meets the same cleanliness class. [Primary source](https://virtualmuseum.intel.com/fabtour/airflow.html). |
| Every fab inventory and cost count is a multiple of 25 | REJECTED | A25-slot carrier is a capacity, not a requirement to process full carriers. Single wafers, engineering lots, partial lots and continuous monetary accounting provide direct counterexamples to a universal multiple-of 25 claim. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 100 k wafers/month and 90 days cycle time imply about 300 k WIP | CONDITIONAL | With 30-day months, Little’s-law WIP=100000/month×3 months=300000. The arithmetic needs a stable boundary and long-run throughput; it does not predict ramp-transient WIP. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Queue factor u/(1−u) rises from 4 at 80% to 19 at 95% | CONDITIONAL | u/(1−u) gives 4 and 19. This is a queue amplification factor under a specified queue model, not a universal fab cycle-time law: variability and bottleneck behavior remain separate inputs. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 500 MW and 100 k wafers/month imply about 3,600 kWh/wafer | CONDITIONAL | 500 MW×24 h×30/100000=3.6 MWh/wafer. This assumes average real facility power and matching production period; nameplate MW or mixed wafer equivalents cannot be silently substituted. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 06

Claim leads: [06-oxidation-and-deposition-r2.md](06-oxidation-and-deposition-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| ALD uses sequential self-limiting reactions for conformal films | SUPPORTED | ASM describes alternating precursor pulses, purge and saturated surface reactions. Conformality requires exposure sufficient to reach recessed surfaces; self-limiting chemistry does not remove transport limitations or ensure exactly one atomic layer each cycle. [Primary source](https://www.asm.com/our-technology-products/ald). |
| TMA/H 2 O identifies the HfO2 chemistry | REJECTED | Element balance refutes the claim without trusting an earlier verdict: trimethylaluminum and water supply Al, O, H, C but no Hf. They cannot produce pureHfO₂ unless a separate Hf source is introduced. The exact replacement recipe is outside this check. [Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC6027410/). |
| 20 cycles at calibrated 0.1 nm/cycle gives approximately 2 nm | CONDITIONAL | 20×.1 nm=2 nm after calibrated steady-state growth. Nucleation delays and substrate-dependent initial cycles mean this is not universally the thickness after the first 20 cycles. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 2 nm HfO2 at k=20 has oxide-equivalent thickness 0.39 nm | CONDITIONAL | EOT=2×3.9/20=.39 nm for the isolated high-k layer. A series interfacial oxide adds EOT; the result must not be labeled total gate-stack EOT. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Dry Deal-Grove constants compute any dry oxidation time | REJECTED | Rate constants cannot apply to any dry oxidation condition: temperature, orientation, initial oxide and ultrathin kinetics are missing. This pass checked model domain, not a new empirical coefficient dataset. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 10^-9 Ω·cm² over 20 nm × 20 nm implies 250 Ω | CONDITIONAL | 20×20 nm²=4e-12 cm²;1e-9/4e-12=250 Ω. Uniform current and an ideal specific contact resistivity are assumptions; spreading and access resistance add to measured resistance. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 07

Claim leads: [07-lithography-duv-r2.md](07-lithography-duv-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Production DUV numerical aperture reaches 1.35 | SUPPORTED | ASML identifies 1.35 NA immersion DUV. NA>1 is possible because refractive index enters NA=n sinθ; it does not violate the sinθ≤1 bound. [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors). |
| ArF light has wavelength approximately 193 nm | SUPPORTED | ASML identifies 193 nm ArF. Small rounding 193 versus 193.4 nm changes the worked resolution marginally; node naming is unrelated to literal laser wavelength. [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers). |
| At k1=0.28,193.4 nm/NA 1.35 implies about 40 nm half-pitch | CONDITIONAL | .28×193.4/1.35=40.1126 nm. The statement must say half-pitch/resolution convention; line width under another illumination/mask condition need not equal it. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| DOF at k2=0.6 and NA 1.35 approximately 64 nm | CONDITIONAL | .6×193.4/1.35²=63.6708 nm. Whether this is full focus range or one-sided tolerance depends on the adoptedk₂ convention; a±64 nm claim would double an intended full 64 nm budget. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 1.5–3 nm overlay is 20–25% of minimum pitch | REJECTED | Against 80 nm pitch from the preceding 40 nm half-pitch, 1.5–3 nm is 1.875–3.75%, not 20–25%. Even a 20 nm pitch gives 7.5–15%. The denominator must be specified before drawing a budget conclusion. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 400 independent events have approximately 5% relative shot noise | CONDITIONAL | Poisson relative standard deviation 1/sqrt(400)=5%. Independence and event counting are essential; this is not automatically the final line-edge roughness after resist chemistry and development. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 08

Claim leads: [08-euv-lithography-r2.md](08-euv-lithography-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| EUV wavelength 13.5 nm and tin droplet two-pulse source | SUPPORTED | ASML describes approximately 25 µm tin droplets, two laser pulses and 50000 events/s at 13.5 nm. These source parameters do not equal delivered wafer dose; collection and downstream optics lose energy. [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers). |
| EUV optics use multilayer mirrors; NXE 0.33 and EXE 0.55 NA | SUPPORTED | ASML identifies multilayer mirrors, 0.33 NA NXE and 0.55 NA EXE. Higher NA improves nominal resolution but reduces focus tolerance; changing NA alone does not specify process window. [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors). |
| 13.5 nm photon is approximately 92 eV | CONDITIONAL | Using exact h, c, e gives 91.840 e V at 13.5 nm. The approximately 92 e V value is photon energy, not the energy deposited in one bond or one resist reaction. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 30 mJ/cm² implies about 20 photons/nm² | CONDITIONAL | .03 J/cm² divided byhc/λ and 1e14 nm²/cm² gives 20.388 incident photons/nm². Absorbed photons require absorption and resist-thickness factors; incident fluence is not reaction count. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 72 ng droplets at 50 k/s imply 3.6 mg/s | CONDITIONAL | 72 ng×50000/s=3.6 mg/s=.31104 kg/day if continuous. This checks feed mass only, not collected debris or net consumable replacement rate; actual uptime and droplet mass need empirical data. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Intel 18A uses High NA on selected layers by September 2026 | SUPPORTED | Intel September 7, 2026 announcement specifies selected 18A layers on a subset of Panther Lake production. Its>1 M processed-wafer milestone includes qualification/R&D as well as production; do not re-label the whole count as shipped production wafers. [Primary source](https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry/intel-foundry-asml-accelerate-industry-readiness-for-high-na-euv.html). |

## Module 09

Claim leads: [09-etch-r2.md](09-etch-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Anisotropic means removal rate depends on direction | SUPPORTED | Direction-dependent removal is the defining distinction; Lam ALE explicitly allows isotropic or directional processes. Anisotropy is a rate ratio, not necessarily perfect verticality or zero lateral loss. [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE). |
| An isotropic etched protected gate widens from 20 to 60 nm | REJECTED | For a protected 20 nm line with 20 nm lateral undercut on each side, remaining width is 20−40, hence complete loss; a 60 nm opening could result instead. Feature type and sign reverse the conclusion. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 100 nm target etch at selectivity 20: 1 consumes 5 nm mask | CONDITIONAL | 100 nm/20=5 nm nominal mask consumption. Overetch and changing selectivity increase the requirement; this is a minimum ideal budget, not a safe production mask thickness. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| TEL demonstrates 10 µm channel etch in 33 minutes with 84% lower GWP | PARTIAL | TEL June 2023 release supports 10 µm in 33 minutes and 84% lower GWP for its stated demonstration comparison. Those figures cannot establish current production throughput, total fab emissions or the same comparison as Lam’s later product. [Primary source](https://www.tel.com/news/product/2023/20230609_001.html). |
| Lam Cryo 3.0 advertises 2.5× etch rate and<0.1% profile deviation | CORRECTION | Opened Lam’s footnote: CD deviation=(max CD−min CD)/channel depth, not nominal CD. At 10 µm depth,.1% corresponds to 10 nm variation. The 2.5× etch-rate statement is present; emissions are supplier estimates. Sent denominator correction to content owner. [Primary source](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era). |
| Atomic layer etch can be directional or isotropic | SUPPORTED | Lam’s ALE explanation explicitly distinguishes directional ion-assisted and isotropic approaches. Atomic-scale control alone does not imply perfect selectivity, zero transport effects or one universal chemistry. [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE). |

## Module 10

Claim leads: [10-doping-r2.md](10-doping-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Implantation injects species and annealing restores lattice/activation | SUPPORTED | Applied Materials describes implantation and annealing to modify/restore the lattice. Implant species may serve functions beyond supplying mobile carriers; chemical dose and electrically active concentration differ. [Primary source](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html). |
| Every useful carrier originates in doping | REJECTED | Thermally generated electron-hole pairs and gate-induced inversion provide counterexamples. Columbia carrier-statistics notes relate intrinsic carriers to temperature; useful semiconductor conduction is not exclusively substitutional doping. [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html). |
| Shallow dopants are unconditionally fully ionized at room temperature | REJECTED | Columbia treatment requires temperature and dopant/charge-state assumptions. Complete ionization is an approximation; freeze-out, compensation and very high concentrations defeat an unconditional room-temperature rule. [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html). |
| Dose 10^15 cm^-2 with Gaussian sigma 17 nm peaks near 2.4×10^20 cm^-3 | CONDITIONAL | Q/(sqrt(2π)σ)=2.3467e20 cm⁻³ for Q=1e15 cm⁻²,σ=17 nm. A Gaussian chemical profile omits channeling, surface truncation and activation; it does not directly give mobile-carrier peak. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| 10^18 cm^-3 in a 20 nm cube gives 8 dopants on average | CONDITIONAL | (20e-7 cm)³×1e18=8 expected atoms. Poisson standard deviation is √8, about 35% relative; the calculation gives an expectation, not eight atoms guaranteed in each device. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Double reference sheet resistance proves half activation | REJECTED | Sheet conductance depends on charge, carrier density, mobility and depth profile. A factor-two resistance change cannot uniquely isolate activation when mobility, damage or parallel conduction also change. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Module 11

Claim leads: [11-transistor-architectures-r2.md](11-transistor-architectures-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Subthreshold swing limit at 300 K: 59.6 mV/dec (theory); 65–75 mV/dec in production | CONDITIONAL | From ln(10)kT/q with exact SI constants: 59.526 mV/dec at 300 K. MIT derives the ordinary thermionic MOSFET result; it is not a universal limit for every switching mechanism. The quoted 65–75 production range is not established by the older lecture. [Primary source](https://ocw.mit.edu/courses/6-720j-integrated-microelectronic-devices-spring-2007/25a7af5d5af20dc54c3416d31a78bcf7_lecture29.pdf). |
| Required I_on/I_off for logic: ~10⁵–10⁶ | UNRESOLVED | The claimed 10⁵–10⁶ on/off ratio needs operating VDD, temperature, channel width and definitions. MIT supplies the dependence of off-current on S and VT, but no universal logic acceptance ratio. A single number cannot be a process-independent requirement. |
| I_off per 65 mV of V_T reduction: ×10 | CONDITIONAL | For fixed S=65 mV/dec, a 65 mV threshold reduction gives 10× current; 130 mV gives 100×. Mobility, threshold definition and S must remain otherwise fixed. This does not mean all leakage components rise by the same factor. [Primary source](https://ocw.mit.edu/courses/6-720j-integrated-microelectronic-devices-spring-2007/25a7af5d5af20dc54c3416d31a78bcf7_lecture29.pdf). |
| Minimum gate length rule: L_g ≥ 5–6 × scale length λ | UNRESOLVED | L≥5–6λ is an electrostatic design heuristic. Geometry-specific λ and allowed drain-induced barrier lowering matter; the opened long-channel lecture cannot validate a universal short-channel multiplier. |
| Physical gate length, 5/3/2 nm class: ~16–18 nm / ~15–16 nm / ~12–14 nm | UNRESOLVED | 5/3/2 nm class labels are not measured gate lengths. The offered 16–18/15–16/12–14 nm ranges require named process papers and device variants; this pass has no primary measurement set supporting every range. |
| Gate EOT / physical HfO₂: ~0.9–1.0 nm EOT; ~1.5–2 nm HfO₂ over ~0.6 nm SiO₂ IL | CONDITIONAL | For κ(HfO₂)=20 and 0.6 nm interfacial SiO₂, series EOT=.6+(1.5…2)×3.9/20=.8925….99 nm. Thus quoted EOT is consistent with the model, but omitting the interfacial layer would give a misleading 0.29–0.39 nm stack value. Independent arithmetic/model check; the empirical inputs are not certified. |

## Module 12

Claim leads: [12-interconnect-beol-r2.md](12-interconnect-beol-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Copper bulk resistivity / electron mean free path: 1.68 µΩ·cm / ~39 nm at room temperature | PARTIAL | Imec supports Cu size-effect resistivity and barrier/liner penalties. The exact 1.68 µΩcm and 39 nm bulk inputs were not freshly established here; bulk values cannot predict nanoscale wire resistance without grain and surface information. [Primary source](https://www.imec-int.com/en/articles/can-binary-or-ternary-compounds-beat-cu-future-interconnect-applications). |
| Effective resistivity of a 20 nm wide Cu line: ~5 to 8 µΩ·cm (3 to 5× bulk) | UNRESOLVED | A 20 nm width alone does not determine 5–8 µΩcm: thickness, grain structure, barrier volume and scattering alter the result. Imec’s comparisons corroborate the mechanism, not this universal numerical range. |
| Wire capacitance per unit length (nearly node-independent): ~0.2 fF/µm | CONDITIONAL | Homothetic electrostatic scaling can leave capacitance per length approximately unchanged because geometry ratios remain fixed. Actual dielectric constants, aspect ratios and neighbors change; therefore 0.2 fF/µm is an illustrative wiring value, not a node-invariant constant. Independent arithmetic/model check; the empirical inputs are not certified. |
| Contact resistivity / resistance of one contact: ~10⁻⁹ Ω·cm² / ~125 Ω per 20 × 40 nm contact | CONDITIONAL | 20×40 nm²=8e-12 cm²;1e-9/8e-12=125 Ω. Uniform interface current is assumed. Conductor and spreading resistance remain additional terms, so this is not the resistance of a whole interconnect path. Independent arithmetic/model check; the empirical inputs are not certified. |
| Number of metal levels, leading-edge logic (as of 2025): ~14 to 15 (N5, N3 paper), up to ~17 to 18 in the tallest N3/N2 products; experimental Intel 4-derived PowerVia vehicle: reported 14 front-side plus 4 backside; not a standard Intel 4 stack | CORRECTION | Intel calls Blue Sky Creek a special test node using Intel 4 transistors and planned 20A interconnect/power. “Intel 4 Power Via” must say demonstrator, not standard production Intel 4.14+4 counts and extension to 18A are not established by that news page. Sent scope correction. [Primary source](https://www.intel.com/content/www/us/en/newsroom/news/powervia-intel-achieves-chipmaking-breakthrough.html). |
| Minimum metal pitch: 28 nm (N5), ~23 to 25 nm (N3, N2), 30 to 36 nm (Intel 4 / 18A) | UNRESOLVED | Minimum pitches require named layer/process papers. A range combining Intel 4 and 18A or N3 and N2 can hide different nodes and layer definitions; a minimum pitch cannot be inferred from marketing node names or transistor gate length. |

## Module 13

Claim leads: [13-metrology-inspection-yield-r2.md](13-metrology-inspection-yield-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Spectroscopic ellipsometry wavelength range (production): ~190 to 1,000 nm (extendable to ~150 nm VUV or 2,500 nm IR) | PARTIAL | J.A.Woollam’s instrument/FAQ material confirms spectroscopic rather than single-wavelength measurement, with different optical configurations. It does not establish 190–1000 nm as the universal production range; exact instrument model and option are required. [Primary source](https://www.jawoollam.com/resources/ellipsometry-faq). |
| SE thickness repeatability on thin oxide: ~0.01 nm 3σ; model-limited accuracy a few 0.1 nm | UNRESOLVED | The supplier distinguishes thickness sensitivity from accuracy and model fitting. Sub-angstrom sensitivity is not proof of 0.01 nm 3σ absolute accuracy; model errors and parameter correlations need separate calibration. The exact repeatability/accuracy pair remains unverified. |
| Four-point probe sheet resistance: R<sub>s</sub> = 4.532 × V / I (ohms per square) | CONDITIONAL | π/ln 2=4.532360. The thin-sheet, effectively infinite lateral geometry underlies this form; finite thickness, sample edge and contact geometry require correction factors. Four probes do not eliminate all geometry bias. Independent arithmetic/model check; the empirical inputs are not certified. |
| CD-SEM landing energy: ~300 to 800 eV | UNRESOLVED | 300–800 e V is a purported landing-energy operating range, not a measured length resolution. Instrument/sample charging and damage tradeoffs matter; no current primary CD-SEM spec was retrieved to validate that precise universal range. |
| CD-SEM measurement precision: ~0.2 nm 3σ | UNRESOLVED | .2 nm 3σ precision is a repeatability statistic. Without instrument, edge algorithm, sample and measurement protocol, it cannot demonstrate absolute linewidth accuracy or compare techniques fairly. The earlier report supplies no fresh empirical dataset. |
| CD-SEM resist shrinkage on first measurement: ~1 to 3 nm on ArF/EUV resists | UNRESOLVED | Electron irradiation can perturb resist, but the 1–3 nm first-measurement number needs dose, chemistry and shrinkage convention. It cannot simply be subtracted as a universal correction; no named experimental data was freshly verified here. |

## Module 14

Claim leads: [14-wafer-sort-and-test-r2.md](14-wafer-sort-and-test-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Rule of ten: Cost of a defect escaping rises ~10× per stage (die, package, board, system, field) | REJECTED | A fixed 10× escalation at every test stage is not a physical law. Reworkability, component price and defect-detection coverage can make a ratio smaller or larger. Retain only as an explicitly illustrative cost model; widget wording now does this. Independent arithmetic/model check; the empirical inputs are not certified. |
| Prober chuck positioning repeatability: ~±1 µm | PARTIAL | FormFactor describes active thermal alignment compensation. This supports the need to maintain probe alignment, not a universal ±1 µm repeatability specification. Mechanical repeatability and full-system hot-wafer alignment must be distinguished. [FormFactor thermal alignment](https://www.formfactor.com/blog/2018/accurate-wafer-level-testing-across-extended-temperature-ranges/). |
| Prober temperature range: −40 °C to +150 °C (to +200 °C on some) | PARTIAL | FormFactor’s 2020 supplier release gives−40…+300°C and discusses−60…+300°C options. This is a direct counterexample to treating+150/+200°C as a universal maximum; the course range can stand only as a typical example. [Primary source](https://www.formfactor.com/blog/2020/new-thermal-system-with-reduced-air-consumption-delivers-best-cost-performance/). |
| Silicon thermal expansion across 300 mm, 25 → 125 °C: ~78 µm (2.6 ppm/K) | CONDITIONAL | 300000 µm×2.6e-6/K×100 K=78 µm. Constant CTE is an approximation; differential probe-card expansion and local wafer temperature, not wafer expansion alone, determine contact error. Independent arithmetic/model check; the empirical inputs are not certified. |
| Probe overtravel: 50–100 µm cantilever; 50–75 µm vertical | UNRESOLVED | Overtravel is displacement after touchdown, not actual pad indentation or oxide-removal depth. Cantilever and vertical ranges depend on probe compliance, planarity and pad damage limits; no supplier-specific 50–100/50–75 µm specification was freshly established. |
| Probe contact force: ~2–8 gf per probe; 1–2 gf on solder bumps | UNRESOLVED | Per-probe force cannot be substituted for total chuck load: thousands of contacts add forces and require planarity control. The 2–8 gf/1–2 gf ranges need a probe design and pad/bump specification; this pass cannot validate them universally. |

## Module 15

Claim leads: [15-memory-dram-nand-hbm-r2.md](15-memory-dram-nand-hbm-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| DRAM cell capacitance: ~10–20 fF | CONDITIONAL | A 10–20 fF cell-capacitance example is physically meaningful only relative to bitline capacitance, noise and leakage. There is no universal 6 fF success threshold derivable from capacitance alone; this conclusion follows from the charge-sharing model, not supplier recipe disclosure. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| DRAM sense-amp signal at 1.1 V: ~100–150 mV (ΔV = VDD/2 × Cs/(Cs+Cbl)) | CONDITIONAL | At VDD=1.1 V, Cs=12 fF, Cbl=36 fF, ΔV=.55×12/48=.1375 V. Assumes bitline precharge VDD/2 and a fully charged/discharged cell. Sense-amplifier offset and parasitics are omitted. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Conventional DDR refresh-window example: 64 ms (32 ms above 85 °C in the discussed class) | PARTIAL | Micron FAQ provides an 8192/64 ms refresh example. That supports device-class refresh scheduling, not all DRAM or HBM. The 32 ms-above 85°C condition was not freshly verified in a manufacturer part datasheet in this pass. [Primary source](https://www.micron.com/sales-support/sales/faqs). |
| DRAM cell area: 6 F²; ~0.0010 µm² at F ≈ 12–13 nm (1β) | CONDITIONAL | 6×12.5²nm²=.0009375 µm²/cell; times 16×2³⁰bits=16.106 mm² pure cell area. Any larger die/array estimate needs stated periphery, redundancy and isolation overhead; decimal Gb versus Gib also changes the arithmetic. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Storage capacitor geometry: ~1–1.5 µm tall, ~20–35 nm across on a ~33–50 nm honeycomb pitch (1β–1 x), AR > 40; ZAZ EOT ~0.5–0.6 nm | UNRESOLVED | The capacitor dimensions and ZAZ EOT are process-specific. Aspect ratio from 1–1.5 µm over 20–35 nm spans ~29–75, so “AR>40” is not guaranteed by every endpoint combination. Correlated dimensions and a named structure are required. |
| DRAM node half-pitches: 1 x ~19, 1 y ~18, 1 z ~16, 1α ~14, 1β ~12–13, 1γ ~11–12 nm | UNRESOLVED | Micron/SK hynix/Samsung generation labels are not directly interchangeable physical half-pitches. A universal 1x…1γ dimension table requires manufacturer-specific metrology. The mapping remains an estimate rather than a verified fabrication rule. |

## Module 16

Claim leads: [16-packaging-fundamentals-r2.md](16-packaging-fundamentals-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| CTE of silicon / organic substrate / Cu / SAC305 solder / EMC (below Tg): 2.6 / ~15 / ~17 / ~22 / ~7–12 ppm/K | UNRESOLVED | The list mixes anisotropic organic substrates, alloy solder and mold compound whose CTE changes at Tg. A single room-temperature number cannot predict package warpage through reflow; exact material, axis and temperature ranges remain unverified. |
| Starting 300 mm wafer thickness → after backgrinding: 775 µm → 300–700 µm (FCBGA), 100–200 µm (WLCSP, wire bond), 30–50 µm (HBM DRAM) | UNRESOLVED | DISCO supports thin-wafer processing but not the full 775→300–700/100–200/30–50 µm product taxonomy here. Final thickness is a design variable affected by handling and thermal needs, not determined solely by package acronym. |
| Coarse / fine grinding wheel grit: #320–#600 / #2000–#8000; damage layer ~10–20 µm → ~1–3 µm | UNRESOLVED | Grit labels, abrasive formulation and damage-depth measurements are not interchangeable. Finer grinding generally reduces roughness, but quoted 10–20→1–3 µm damage requires a specified wheel/process; no fresh primary dataset validated every range. |
| Grind time: ~2 min for 500 µm at 4 µm/s; ~1 min for 30 µm at 0.5 µm/s | CONDITIONAL | 500/4=125 s and 30/.5=60 s grinding-only. Load/unload, chucking, spark-out, cleaning and inspection add cycle time; deriving tool UPH directly from these removal times would overstate throughput. Independent arithmetic/model check; the empirical inputs are not certified. |
| TAIKO edge ring width: ~2–3 mm at full thickness | SUPPORTED | DISCO’s own TAIKO page describes leaving an approximately 3 mm outer ring while thinning the interior. The mechanism supports stiffness/handling; “2–3 mm” is representative, not proof every product uses a fixed ring width. [Primary source](https://disco.co.jp/eg/solution/library/grinder/taiko_process.html). |
| Blade dicing kerf / spindle speed / feed: 20–50 µm / 30,000–60,000 rpm / 50–150 mm/s | UNRESOLVED | Kerf 20–50 µm, rpm and feed are separate operating variables. They depend on blade geometry, thickness and material; spindle speed alone does not define cutting speed or edge quality. No universal recipe is established by these ranges. |

## Module 17

Claim leads: [17-advanced-packaging-cowos-r2.md](17-advanced-packaging-cowos-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Lithography reticle limit: 26 × 33 mm = 858 mm² (High-NA EUV: 26 × 16.5 mm = 429 mm²) | CONDITIONAL | 26×33=858 mm²; 26×16.5=429 mm². These are single-field areas. Cerebras wafer-scale integration is a direct counterexample to treating 858 mm² as a fundamental maximum connected silicon circuit. It does not remove ordinary single-field design constraints. [Primary source](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine). |
| Poisson yield, 800 vs 400 mm² die at D0 = 0.1/cm²: ~45% vs ~67% | CONDITIONAL | Poisson exp(−D0 A) gives 44.9329% at 8 cm² and 67.0320% at 4 cm². Equal D0 and random independent killer defects are assumptions; redundancy, systematic losses and chiplet assembly yield can change the comparison. Independent arithmetic/model check; the empirical inputs are not certified. |
| HBM3E interface per stack: 1,024 data bits; ~1,500–1,800 signals; ~5,000–6,000 µbumps at ~55 µm pitch | PARTIAL | Micron explicitly identifies 1024 data IOs for HBM3E. That does not validate total signal count or 5000–6000 microbumps: power/ground, spare pads and physical bonding arrangement are separate. The 55 µm pitch also needs a named package specification. [Primary source](https://www.micron.com/products/memory/hbm/hbm3e). |
| Organic substrate vs Si interposer line/space: ~8–15 µm vs 0.4–2 µm (20–50× density gap) | PARTIAL | TSMC documents CoWoS-R minimum 4 µm pitch (2 µm line/space), while S and L have different silicon/RDL structures. A 20–50× density claim cannot mix linear pitch ratios with areal routing density or imply every organic substrate uses one range. [Primary source](https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm). |
| CoWoS-S interposer TSV: ~10 µm diameter × ~100 µm deep; interposer thinned to ~100 µm | UNRESOLVED | The quoted CoWoS-S 10 µm×100 µm TSV is a particular geometry, not established for every CoWoS generation. TSMC’s public page confirms silicon interposer S, polymer RDL R and local-silicon L, but does not disclose that complete TSV recipe. |
| Interposer RDL: 4–5 Cu damascene layers, 0.4–2 µm line/space, 65 nm-class tools | UNRESOLVED | TSMC public platform descriptions do not establish a universal 4–5 damascene-layer, 65 nm-tool flow across CoWoS. Reusing older tooling capability does not mean the interposer’s process node equals a logic-transistor node. |

## Module 18

Claim leads: [18-final-test-burn-in-slt-r2.md](18-final-test-burn-in-slt-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Blackwell package test flow: FT1, burn-in, FT2, SLT (one insertion more than Hopper) | UNRESOLVED | A proprietary Blackwell-vs-Hopper FT/burn-in/SLT insertion sequence is not disclosed by the architecture releases checked. It must remain an illustrative/reported test flow; product architecture alone cannot authenticate factory routing. |
| Final-test time, large GPU: ~5–20 min across 1–3 insertions; ~$8–50 tester time depending on parallelism | UNRESOLVED | The 5–20 minute/$8–50 relationship is underdetermined without tester hourly cost, multisite parallelism, utilization and repeated insertions. A publicly quoted GPU price provides none of those quantities. |
| Cell throughput: UPH = 3,600 × sites ÷ (test + index); GPU x 2 at 300 s ≈ 24 UPH, ~200 k per cell-year | CONDITIONAL | 3600×2/300=24 UPH; adding 10 s index time gives 23.2258. At 8000 productive hours, 24 UPH gives 192000 units/year, near 200 k. Calendar 8760 h is not guaranteed productive time. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Socket droop and heating: 2,000 contacts × 30 mΩ → 15 µΩ; 15 mV and 15 W at 1,000 A | CONDITIONAL | 2000 identical 30 mΩ parallel contacts yield 15 µΩ, 15 mV and 15 W at 1000 A. This assumes equal sharing and one path; return contacts add loss, and supply/ground contacts cannot all be counted as one parallel supply bank. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Vmin guard band and power: ~30–50 mV; each 10 mV ≈ 2–3% of dynamic power (~25 W on 1 kW) | CONDITIONAL | At 0.8 V, raising 10 mV changes V² by 2.5156%, assuming fixed C, f, activity. Multiplying by 1 k W is valid only if 1 k W is dynamic power under this model, not total GPU power including leakage and memory. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Burn-in conditions: 125 °C Tj, VDD +10–20%, dynamic patterns, 4–48 h (168 h historically) | UNRESOLVED | 125°C,+10–20%voltage and 4–48 h are qualification/stress examples, not a verified universal production burn-in recipe. Temperature acceleration requires an identified failure mechanism and activation energy; overvoltage cannot be mapped to field life by temperature alone. |

## Module 19

Claim leads: [19-building-an-nvidia-gpu-r2.md](19-building-an-nvidia-gpu-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Reticle limit: 26 × 33 mm = 858 mm² | REJECTED | The arithmetic 858 mm² survives, but the absolute-monolithic-limit interpretation fails against Cerebras wafer-scale integration. The corrected statement must explicitly mean a conventional single-exposure field. [Primary source](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine). |
| H100 (GH100): 814 mm², 80 B transistors, TSMC 4N, 144 SMs on die / 132 enabled, 50 MB L2; 5 of 6 HBM3 stacks, 80 GB, 3.35 TB/s, 700 W SXM5 | PARTIAL | NVIDIA Hopper source confirms 814 mm², 80 B, 144 physical/132 enabled SXM SMs, 80 GB in five HBM3 stacks and 50 MB L2. Its launch text says >3 TB/s and data rates not finalized; final 3.35 TB/s needs the later SKU datasheet. Physical-minus-enabled SMs does not reveal wafer yield. [Primary source](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/). |
| A100 (GA100): 826 mm², 54.2 B, TSMC N7,108 of 128 SMs; 40/80 GB HBM2e, 400 W | PARTIAL | NVIDIA Ampere architecture source supports 826 mm², 54.2 B and N7; launch A100 40 GB uses HBM2, while later 80 GB uses HBM2e. “40/80 GB HBM2e” blurs generations and should be split. 400 W is SXM-specific, not every A100 form factor. [Primary source](https://developer.nvidia.com/blog/nvidia-ampere-architecture-in-depth/). |
| B200: 2 × ~800 mm² dies, 208 B, 4NP, NV-HBI 10 TB/s; 8 × HBM3E, 192 GB, 8 TB/s, ~1,000–1,200 W, CoWoS-L | PARTIAL | Blackwell announcement confirms 208 B, 4NP, two GPU dies and 10 TB/s intra-GPU link. GB200 combines two B200 GPUs with Grace: that means four GPU silicon dies, not two. Package memory and power require SKU-specific documentation. [Primary source](https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing). |
| B300 / Blackwell Ultra: 288 GB HBM3E 12-high, ~1,400 W, ~1.5× B200 dense FP 4 | PARTIAL | NVIDIA DGX B300 guide confirms 8×288 GB=2.3 TB systemmemory. It does not by itself establish per-GPU 1400 W or a 1.5×dense FP 4 comparison; precision, sparsity and product variant must be held fixed. [Primary source](https://docs.nvidia.com/dgx/dgxb300-user-guide/introduction-to-dgxb300.html). |
| Rubin (announced): TSMC 3 nm (reported N3P), 2 dies, ~336 B, 288 GB HBM4, ~22 TB/s, NVLink 6 3.6 TB/s; second half 2026; Vera CPU 88 cores; Vera Rubin NVL 72 | PARTIAL | NVIDIA July 21, 2026 Rubin architecture article explicitly supports 336 B transistors, up to 288 GBHBM 4 and 22 TB/s. This resolves those numerical subsets, not exact TSMC flavor or universal shipping availability. Peak/model-specific throughput remains conditional. [Primary source](https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/). |

## Module 20

Claim leads: [20-economics-and-geopolitics-r2.md](20-economics-and-geopolitics-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Global chip sales 2024 / 2025 / 2026 F: ~$631 B / ~$792 B / ~$1.51 T (WSTS Spring 2026 forecast) | SUPPORTED | SIA reports 2024: $630.5B and 2025: $791.7B. Current WSTS primary release gives Spring 2026 forecast $1.51 T,~90% growth. Forecast is not realized 2026 revenue; the older $975 B forecast cannot be silently mixed with the updated vintage. [Primary source](https://www.wsts.org/76/Recent-News-Release). [SIA historical results](https://www.semiconductors.org/global-annual-semiconductor-sales-increase-25-6-to-791-7-billion-in-2025/). |
| Wafer fab equipment 2025: ~$115 B (SEMI); total equipment ~$135 B | PARTIAL | SEAJ April 8, 2026 joint SEMI data confirms actual 2025 total equipment $135.1 B. The ~$115 B WFE subtotal has different scope; a previous forecast cannot be relabeled actual merely because total equipment is confirmed. [Primary source](https://www.seaj.or.jp/english/statistics/4777967556197.pdf). |
| Materials market 2025: $73.2 B (SEMI actual) | CORRECTION | Fresh SEMI May 12, 2026 release reports 2025 materials $73.2B, split $45.8B wafer fab + $27.4B packaging. This supersedes the course’s $70–72 B estimate. Sent exact new figures/source to the content owner. [Primary source](https://www.semi.org/en/semi-press-release/global-semiconductor-materials-market-revenue-reaches-record-73.2-billion-dollars-in-2025-semi-reports). |
| EDA market: ~$15 B (EDA) / ~$20 B incl. IP | PARTIAL | SEMI’s EDMD page explicitly covers EDA, semiconductor IP and services and lists 2025 quarterly totals ~5.1, 5.1, 5.6, 5.5 B (~21.3 B summed rounded). This cannot verify a $15 B tools-only number. Scope and reporting year must accompany the comparison. [Primary source](https://www.semi.org/en/products-services/market-data/electronic-design). |
| TSMC foundry share: ~67–70% by revenue; ~90%+ at ≤5 nm-class | UNRESOLVED | TSMC’s own profile supplies revenue and technology mix but not an independently defined global foundry-share denominator. Revenue share and ≤5 nm capacity/production share are different metrics; 67–70% and 90%+ require a dated market definition and source. |
| TSMC 2025 revenue / gross margin / capex: ~$122 B / ~59% / ~$41 B; January 2026 capex guide $52–56 B (historical) | PARTIAL | TSMC annual report independently confirms 2025 revenue $122.42 B and gross margin 59.9%, not simply 59%. The capex total/guidance is not re-verified from that excerpt; January 2026 guidance must remain dated and may be revised. [Primary source](https://investor.tsmc.com/static/annualReports/2025/english/index.html). |

## Module 21

Claim leads: [21-glossary-and-reference-r2.md](21-glossary-and-reference-r2.md).

| Claim | Independent outcome | Challenge, evidence and limitation |
|---|---|---|
| Wafer diameter / thickness / mass: 300 mm / 775 µm / ~127 g | CONDITIONAL | Using 2.329 g/cm³ gives π×15²×.0775×2.329=127.586 g. The stated 127 g is an approximation for an ideal 300 mm×775 µm disc, not a material constant independent of wafer geometry. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Si lattice constant / melting point: 0.543 nm / 1,414 °C | SUPPORTED | NIST’s primary measurement report gives bulk single-crystal lattice parameter 0.5431019 nm at 22.5 °C and atmospheric pressure; it distinguishes the slightly larger powder value. LANL’s chemistry reference lists 1414 °C melting point. These support rounded reference values; temperature, pressure and material condition matter at metrological precision. [NIST measurement](https://nvlpubs.nist.gov/nistpubs/jres/122/jres.122.024.pdf), [LANL reference](https://periodic.lanl.gov/14.shtml). |
| Reticle field: 26 × 33 mm = 858 mm² (0.33 NA); 26 × 16.5 mm (High-NA) | CONDITIONAL | Recomputed 858 mm² and 429 mm². The first is a field dimension, not a universal prohibition on connected wafer-scale circuits; Cerebras is a direct commercial counterexample. [Primary source](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine). |
| ArF / EUV wavelength: 193 nm / 13.5 nm | SUPPORTED | ASML explicitly identifies ArF 193 nm and EUV 13.5 nm. These wavelengths must not be confused with lithographic resolution or node names. [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers). |
| Rayleigh resolution, k1 limit: half-pitch = k1·λ/NA; k1 ≥ 0.25 | CONDITIONAL | At k1=.25, λ/NA gives 35.7407 nm DUV, 10.2273 nm NXE and 6.1364 nm EXE half-pitch. The formula/convention is checked; claiming k1≥.25 for every imaging scheme or these values as production pitches would exceed this validation. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |
| Photons per nm² at production dose: ~14 (EUV, 20 mJ/cm²) vs ~290 (ArF, 30 mJ/cm²) | CONDITIONAL | With exact h, c, 20 m J/cm² at 13.5 nm gives 13.5921 photons/nm²; 30 m J/cm² at 193 nm gives 291.475. Different doses are essential to this ratio; absorbed-photon and chemical-yield statistics need extra inputs. Independent dimensional/arithmetic or counterexample check; empirical inputs are not certified. |

## Reproducible arithmetic basis

Calculations use SI conversions, `π`, `exp`, `ln`, and exact SI values `h = 6.62607015e-34 J s`, `c = 299792458 m/s`, `e = 1.602176634e-19 C`, `k = 1.380649e-23 J/K`. For silicon, the chosen density and molar mass are explicit inputs rather than newly measured facts. Representative independently evaluated results:

| Expression | Result |
|---|---|
| `00.5_scanners` | `24.0` |
| `01.3_chinaShare` | `0.8478260869565217` |
| `01.4_9N_atomic` | `50000000000000.0` |
| `01.5_MWh_per_t` | `6.824399304504697` |
| `02.4_mass306mmkg` | `342.70358771393694` |
| `02.4_mass300mmkg` | `329.39598972888984` |
| `02.5_neckMPa` | `416.2071527125695` |
| `02.6_scheilTail` | `1.5848931924611136` |
| `03.4_pitchMicrons` | `1060` |
| `03.4_kerfFraction` | `0.1509433962264151` |
| `03.5_waferMassG` | `127.6409460199448` |
| `03.6_wholeSlices` | `1886` |
| `04.4_transmission` | `0.81` |
| `04.5_lattice` | `0.0105` |
| `04.6_gallonsDaily` | `6000000.0` |
| `05.4_WIP` | `300000.0` |
| `05.5_queue80` | `4.000000000000001` |
| `05.5_queue95` | `18.999999999999982` |
| `05.6_kWhPerWafer` | `3600.0` |
| `06.3_ALDnm` | `2.0` |
| `06.4_EOTnm` | `0.39` |
| `06.6_contactOhm` | `250.00000000000003` |
| `07.3_halfPitchNm` | `40.1125925925926` |
| `07.4_DOFnm` | `63.670781893004104` |
| `07.6_relativeShotNoise` | `0.05` |
| `08.3_photonEV` | `91.84014698755576` |
| `08.4_photonsPerNm2` | `20.38817209854797` |
| `08.5_mgPerSecond` | `3.6` |
| `08.5_kgPerDay` | `0.31104` |
| `09.3_maskNm` | `5.0` |
| `09.5_deviationNm` | `10.0` |
| `10.4_peakAtomsCm3` | `2.3467192964790157e+20` |
| `10.5_dopantCount` | `7.999999999999999` |
| `11_ss_mV` | `59.5264293323` |
| `11_130mV_current_factor` | `100` |
| `11_series_eot_1p5nm` | `0.8925` |
| `11_series_eot_2nm` | `0.99` |
| `12_contact_ohm` | `125` |
| `13_sheet_factor` | `4.53236014183` |
| `14_expansion_um` | `78` |
| `15_charge_share_mV` | `137.5` |
| `15_pure_16Gib_cells_mm2` | `16.10612736` |
| `16_grind_s` | `125` |
| `17_field_mm2` | `858` |
| `17_half_field_mm2` | `429` |
| `17_yield_large` | `0.449328964117` |
| `17_yield_small` | `0.670320046036` |
| `18_uph` | `24` |
| `18_uph_10s_index` | `23.2258064516` |
| `18_annual_8000h` | `192000` |
| `18_parallel_resistance_microohm` | `15` |
| `18_loss_W` | `15` |
| `18_dynamic_power_percent` | `2.515625` |
| `21_disc_g` | `127.586164498` |
| `21_DUV_halfpitch` | `35.7407407407` |
| `21_EUV_halfpitch` | `10.2272727273` |
| `21_HighNA_halfpitch` | `6.13636363636` |
| `21_EUV_photons_nm2` | `13.5921147324` |
| `21_DUV_photons_nm2` | `291.475349261` |

## Remaining evidence limits

No private fab traveler, process integration recipe, wafer-yield dataset, supplier contract, product-level NVIDIA COGS, or complete current legal analysis was available. Process-specific dimensions, test recipes and market-share denominators remain uncertain where named. Several primary pages are vendor descriptions: they establish what the vendor reports, not independent metrology or performance replication. USGS PDF access failed and the silicon-metal production row therefore states its narrower indexed-primary basis. The reader should follow exact part/process/date provenance before applying the course’s illustrative values to procurement or engineering decisions.
