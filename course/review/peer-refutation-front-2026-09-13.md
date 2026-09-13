# Independent peer refutation: modules00–10, 2026-09-13

Reviewer: the back-half content agent, distinct from the front-half author. This pass attempts to challenge the six initial consequential claims in each front-half r2 report:66 claims total. The r2 report selected the claims; its verdict was not evidence. Primary pages were freshly reopened or searched, calculations were independently recomputed, and adjacent source text was inspected for the stated boundaries. This is not a full reread, verification of every supplier claim, or an audit of all subsequently expanded ledger rows. Access limitations and unresolved empirical inputs remain explicit.

Verdicts apply to the **corrected claim**. CALCULATION verifies arithmetic under assumptions; SUPPORTED CORRECTION agrees that the earlier broad claim needed its repair. SUPPORTED does not imply independent replication of a vendor's measured performance. No new empirical factory measurements were made.

## Module00

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. TSMC capacity exceeded 17 million 12-inch-equivalent wafers in 2025 | SUPPORTED | Reopened company profile: >17M is annual 12-inch-equivalent capacity across multiple technologies and customers, not GPU-node availability. | [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile) |
| 2. Total foundry capacity proves the front end was never constrained | SUPPORTED CORRECTION | The same aggregate cannot determine an individual product constraint. A small share of all output can still exhaust its qualified allocation. | [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile) |
| 3. Everything above estimated BOM is NVIDIA gross margin | SUPPORTED CORRECTION | NVIDIA 10-Q p29 defines cost of revenue beyond silicon/components; p3 places R&D below gross profit. Channel resale price is not necessarily NVIDIA revenue. | [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf) |
| 4. EUV uses 13.5 nm light | SUPPORTED | ASML specifies13.5nm; this is the wavelength, not a direct minimum feature-size rule. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 5. 100k starts, 24 passes and 100k productive passes/tool require 24 scanners | CALCULATION | 100000 starts×24 passes/(100000 productive passes per scanner)=24 scanners. This is conditional on throughput, availability and matching assumptions. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. H100 BOM and quoted-market-price estimates determine actual product profit | UNRESOLVED | The filing provides accounting definitions, not H100 procurement contracts or a product-level cost/revenue bridge. Estimated BOM cannot independently establish product gross margin. | [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf) |

## Module01

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Siemens deposition places high-purity silicon on heated seed rods | SUPPORTED | WACKER describes TCS fed to reactors around1000°C and deposition onto seed rods over several days; exact recipes are outside this claim. | [Primary source](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 2. Silicon metal is made from silica in submerged-arc furnaces | SUPPORTED | USGS silicon statistics explicitly identifies submerged-arc electric furnaces for silicon metal, distinct from the higher-purity downstream material. | [USGS primary description](https://www.usgs.gov/centers/national-minerals-information-center/silicon-statistics-and-information) |
| 3. 2024 silicon-metal production approximately 4.6 Mt, China 3.9 Mt | SUPPORTED WITH ACCESS LIMIT | Direct full-PDF retrieval failed twice; a fresh indexed primary USGS table excerpt gives China3900 and world4600 thousand tonnes for2024 silicon metal. Ratio3900/4600=84.78%; not the combined ferrosilicon share. | [Primary source](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025_ver.1.0.pdf) |
| 4. 9N implies 5 × 10^13 impurity atoms/cm³ at 5 × 10^22 sites/cm³ | CALCULATION | Atomic-fraction9N leaves10^-9 impurity fraction; ×5×10^22=5×10^13/cm³. Mass-fraction purity cannot be substituted without conversion. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 690 kJ/mol implies approximately 6.8 MWh/t Si | SCOPE REFINEMENT | 690kJ/mol×(10^6g/t)/(28.0855g/mol)/(3.6×10^6kJ/MWh)=6.824MWh/t. Calling this a rigorous minimum electrical work overstates a standard-enthalpy heat balance; requested qualification. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. China/non-China solar polysilicon price difference is entirely policy | SUPPORTED CORRECTION | No same-grade, same-contract, same-date price comparison was independently available. Exclusive policy attribution is unjustified; the correction appropriately retains multiple possible causes. | Not established by this review; retained caveat |

## Module02

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. CZ pulls a seed-oriented single crystal from molten polysilicon | SUPPORTED | SUMCO describes the quartz crucible, ~1420°C melt, seed rotation and inheritance of seed orientation. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 2. Float-zone growth avoids contact with a quartz crucible | SUPPORTED | Siltronic explicitly connects lower oxygen with no liquid-silicon contact with a quartz crucible. This does not promise zero contamination. | [Primary source](https://www.siltronic.com/en/products/special-products.html) |
| 3. 200 mm float-zone crystals are commercially available | SUPPORTED | Siltronic says it has offered200mm FZ crystals since2002. Commercial availability does not establish an immutable larger-diameter prohibition. | [Primary source](https://www.siltronic.com/en/products/special-products.html) |
| 4. 2 m cylindrical body at 306 mm diameter weighs about 343 kg | CALCULATION | π×(.306/2)^2×2×2330=342.70kg; at.300m diameter the answer differs. Dimensions and density are assumed. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 300 kg on a 3 mm neck produces approximately 400 MPa stress | CALCULATION | 300kg×9.80665/(π×.003²/4)=416.2MPa nominal axial stress. Surface flaws, temperature and stress concentrations remain excluded. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. Boron k=0.8 increases concentration toward the tail in Scheil model | CALCULATION | For k=.8 and solid fraction.9, tail/start=.1^(-.2)=1.5849; inverse gives.631 resistance ratio only with fixed mobility and model assumptions. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module03

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Wafer forming includes slicing, lapping, damage etching, polishing and cleaning | SUPPORTED | SUMCO directly lists slicing, lapping, chemical damage removal, polishing, cleaning and inspection; detailed production flows can vary. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 2. Colloidal-silica mechanochemical polishing produces a mirror surface | SUPPORTED | SUMCO names colloidal silica and mechanochemical polishing. This supports process identity, not zero roughness or zero defects. | [Primary source](https://www.sumcosi.com/english/products/process/) |
| 3. 2025 wafer shipments 12,973 MSI and revenue $11.4B | SUPPORTED | SEMI Feb10,2026 reports12973MSI and$11.4B for2025. MSI measures area across wafer sizes; it is not wafer starts or processed foundry output. | [Primary source](https://www.semi.org/en/semi-press-release/semi-reports-2025-annual-worldwide-silicon-wafer-shipments-and-revenue-results) |
| 4. 900 µm slice + 160 µm kerf consumes 1.06 mm per slice | CALCULATION | 900+160=1060µm;160/1060=15.094% kerf before subsequent finishing loss. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. A 300 mm diameter, 775 µm thick silicon disc weighs about 127 g | CALCULATION | π×15²cm²×.0775cm×2.33g/cm³=127.64g. An ideal full disc excludes notch/edge geometry. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. 1,800 wafers from a 2 m body at 1.06 mm pitch | SUPPORTED CORRECTION | 2000mm/1.06mm=1886.79 theoretical cuts before losses. Approximately1800 needs explicit usable-length/end-loss allowance, which the correction supplies. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module04

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Ultrapure-water resistivity 18.2 MΩ·cm | SUPPORTED CORRECTION | Merck specifies18.2MΩcm at25°C in the absence of ionic contamination; temperature condition is essential. | [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 2. Resistivity alone certifies overall purity | SUPPORTED CORRECTION | Merck treats organic contamination through a separate TOC measurement. Resistivity alone cannot certify all contaminants. | [Primary source](https://www.merckmillipore.com/AZ/en/technical-documents/technical-article/water-purification/water-quality-monitoring) |
| 3. CNT pellicle specifications and construction timing | SUPPORTED AS PLAN | Mitsui May2024 describes≥92% transmission and>1kW light resistance goals, with tentative Dec2025 construction end. No completion inference follows. | [Primary source](https://jp.mitsuichemicals.com/en/release/2024/2024_0528_1/index.htm) |
| 4. 90% single-pass transmission gives 81% double-pass transmission | CALCULATION | Two independent90% transmissions give81% optical throughput. Whole-cycle scanner throughput can include overhead beyond dose-limited exposure. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 4.2% lattice mismatch at 25% Ge gives about 1.05% mismatch | CALCULATION | 4.2%×.25=1.05% in a linear lattice-composition model; no unique critical thickness follows. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. 100k wafers/month × 1,800 gallons/wafer is 6 million gallons/day | CALCULATION | 100000×1800/30=6,000,000 gallons/day. Gross ultrapure-water use and freshwater withdrawal are different system boundaries. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module05

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Tools receive utilities through the subfab and overhead automation transports wafers | SUPPORTED | Intel describes tools fed electricity, water, gas and chemicals through the raised floor from the subfab; overhead automation transports wafers. | [Primary source](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |
| 2. Cleanroom air flows through ceiling filtration toward the floor/subfab | SUPPORTED | Intel describes ceiling filtration/fans, flow through perforated floor tiles and recirculation via the subfab. | [Primary source](https://virtualmuseum.intel.com/fabtour/airflow.html) |
| 3. Every fab inventory and cost count is a multiple of 25 | SUPPORTED CORRECTION | Capacity of a25-slot carrier does not force every lot to fill every slot. Split/partial lots are consistent with the physical container. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 4. 100k wafers/month and 90 days cycle time imply about 300k WIP | CALCULATION | 100000/month×90days/(30days/month)=300000 WIP under a steady average. A complete factory average is not a snapshot guarantee. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. Queue factor u/(1−u) rises from 4 at 80% to 19 at 95% | CALCULATION | u/(1−u)=4 at.8 and19 at.95. This factor alone is not a fab-wide queue prediction without arrival/service variability and dispatch assumptions. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. 500 MW and 100k wafers/month imply about 3,600 kWh/wafer | CALCULATION | 500000kW×24×30/100000=3600kWh/wafer. The chosen site boundary and output denominator dominate interpretation. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module06

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. ALD uses sequential self-limiting reactions for conformal films | SUPPORTED | ASM identifies sequential saturated surface-controlled reactions. Saturation requires adequate exposure/purge and a workable temperature/chemistry window. | [Primary source](https://www.asm.com/our-technology-products/ald) |
| 2. TMA/H2O identifies the HfO2 chemistry | SUPPORTED CORRECTION | TMA contains Al, not Hf: absent another metal source it cannot deposit HfO2. Fresh indexed primary ALD paper identifies TMA/water alumina; full PMC page hit a CAPTCHA, recorded as access limitation. | [Indexed primary ALD study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6641164/); full-text CAPTCHA prevented full-page retrieval. |
| 3. 20 cycles at calibrated 0.1 nm/cycle gives approximately 2 nm | CALCULATION | 20×.1nm=2nm after any nucleation transient. This is a calibrated growth model, not exact thickness independent of substrate/recipe. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 4. 2 nm HfO2 at k=20 has oxide-equivalent thickness 0.39 nm | CALCULATION | 2nm×3.9/20=.39nm for the HfO2 contribution; interfacial oxide adds in series. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. Dry Deal-Grove constants compute any dry oxidation time | SUPPORTED CORRECTION | With A=.165µm,B=.0117µm²/h,τ=.37h: (1+.165)/.0117−.37=99.203h. Thin dry oxide and geometry limitations prevent universal use. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. 10^-9 Ω·cm² over 20 nm × 20 nm implies 250 Ω | CALCULATION | 1e-9Ωcm²/(20e-7cm)^2=250Ω. Interface area and assumed specific contact resistivity are inputs; spreading resistance adds separately. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module07

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Production DUV numerical aperture reaches 1.35 | SUPPORTED | ASML identifies1.35NA for highest-resolution immersion DUV; water permits NA>1. | [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 2. ArF light has wavelength approximately 193 nm | SUPPORTED | ASML names ArF193nm.193.4nm in the numerical example is a more precise conventional value, not a different technology. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 3. At k1=0.28, 193.4 nm/NA1.35 implies about 40 nm half-pitch | CALCULATION | .28×193.4/1.35=40.113nm half-pitch; equal line/space pitch80.225nm. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 4. DOF at k2=0.6 and NA1.35 approximately 64 nm | CALCULATION | .6×193.4/1.35²=63.671nm. Full-range versus±half-range convention must remain explicit. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 1.5–3 nm overlay is 20–25% of minimum pitch | SUPPORTED CORRECTION | 1.5–3nm is not20–25% of a40nm half-pitch or80nm pitch. A shared edge-placement budget is the defensible statement. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. 400 independent events have approximately 5% relative shot noise | CALCULATION | For400 independent Poisson events,σ/N=1/√400=.05. Optical and chemical variation are not included in this counting model. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Module08

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. EUV wavelength 13.5 nm and tin droplet two-pulse source | SUPPORTED | ASML describes13.5nm emission and two pulses acting on tin: shape the droplet, then generate plasma. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 2. EUV optics use multilayer mirrors; NXE 0.33 and EXE 0.55 NA | SUPPORTED | ASML distinguishes EUV mirror optics and NA values. Reflective masks/mirrors do not erase the role of wavelength in resolution. | [Primary source](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 3. 13.5 nm photon is approximately 92 eV | CALCULATION | hc/(13.5nm)=91.840eV using SI constants; about92eV is correct. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 4. 30 mJ/cm² implies about 20 photons/nm² | CALCULATION | .03J/cm² divided by photon energy and10^14nm²/cm²=20.388 incident photons/nm². Absorbed/resist-effective counts are lower. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 72 ng droplets at 50k/s imply 3.6 mg/s | CALCULATION | 72ng×50000/s=3.6mg/s;×86400=.31104kg/day if continuous. Collection, recycling and uptime determine consumption. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. Intel 18A uses High NA on selected layers by September 2026 | SUPPORTED DATED CLAIM | Intel Sep7,2026 states High-NA production on selected layers of a subset of Panther Lake/18A products. It does not say every18A product/layer or all1M cumulative wafer passes are volume production. | [Primary source](https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry/intel-foundry-asml-accelerate-industry-readiness-for-high-na-euv.html) |

## Module09

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Anisotropic means removal rate depends on direction | SUPPORTED CORRECTION | Direction-dependent removal is anisotropic; it need not be perfectly vertical. Lam distinguishes directional and isotropic ALE. | [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE) |
| 2. An isotropic etched protected gate widens from 20 to 60 nm | SUPPORTED CORRECTION | Isotropic recession enlarges an opening by2t but reduces a protected line to w−2t; at20nm line and20nm recession the line disappears before completion. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 3. 100 nm target etch at selectivity20:1 consumes5 nm mask | CALCULATION | 100nm/20=5nm nominal mask loss. Extra target overetch or selectivity change requires margin. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 4. TEL demonstrates10 µm channel etch in33 minutes with84% lower GWP | SUPPORTED AS DEMONSTRATION | TEL June2023 identifies10µm depth in33min and84% GWP reduction versus its previous technology; this is a research process comparison, not total fab emissions. | [Primary source](https://www.tel.com/news/product/2023/20230609_001.html) |
| 5. Lam Cryo3.0 advertises2.5× etch rate and<0.1% profile deviation | SUPPORTED WITH METRIC | Lam specifies2.5× etch rate. Its<.1% metric is(maxCD−minCD)/channel depth, so at10µm it permits<10nm CD spread. Requested this footnote in the r2 summary too. | [Primary source](https://newsroom.lamresearch.com/2024-07-31-Lam-Research-Introduces-Lam-Cryo-TM-3-0-Cryogenic-Etch-Technology-to-Accelerate-Scaling-of-3D-NAND-for-the-AI-Era) |
| 6. Atomic layer etch can be directional or isotropic | SUPPORTED | Lam states isotropic ALE requires both modification and removal to be isotropic; either directional half-step can make the full process directional. | [Primary source](https://newsroom.lamresearch.com/Tech-Brief-All-About-ALE) |

## Module10

| Claim | Independent verdict | Refutation attempt / result | Evidence |
|---|---|---|---|
| 1. Implantation injects species and annealing restores lattice/activation | SUPPORTED | Applied describes ion injection and annealing restoring the host lattice; its RTP product material names dopant activation applications. Activation and damage repair need not have identical optimum recipes. | [Primary source](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html); [Applied RTP](https://www.appliedmaterials.com/us/en/semiconductor/products/processes/rapid-thermal-processing-treatments.html) |
| 2. Every useful carrier originates in doping | SUPPORTED CORRECTION | Thermally generated carriers exist without intentional dopants; illumination/injection and gate electrostatics also change populations. Doping is not the only carrier mechanism. | [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html) |
| 3. Shallow dopants are unconditionally fully ionized at room temperature | SUPPORTED CORRECTION | Columbia derives temperature/concentration-dependent ionization. The common room-temperature complete-ionization approximation is not unconditional. | [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html) |
| 4. Dose10^15 cm^-2 with Gaussian sigma17 nm peaks near2.4×10^20 cm^-3 | CALCULATION | 10^15/(√(2π)×17×10^-7cm)=2.3467×10^20/cm³ chemical peak. Active carrier concentration can differ. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 5. 10^18 cm^-3 in a20 nm cube gives8 dopants on average | CALCULATION | 10^18/cm³×(20×10^-7cm)^3=8 atoms on average, with statistical variation; not exactly eight in each channel. | Independent recalculation shown here; assumptions are not empirically reverified. |
| 6. Double reference sheet resistance proves half activation | SUPPORTED CORRECTION | Rsheet inversely tracks active sheet density only if mobility and profile are fixed. A doubled value can also reflect mobility, geometry or metrology differences. | Independent recalculation shown here; assumptions are not empirically reverified. |

## Findings sent to author and cross-module consistency

1. Module01: refine “thermodynamic minimum/floor” into the stated constant-property heat-balance estimate. Correct arithmetic is not a rigorous minimum electrical-work or high-temperature equilibrium calculation.
2. Module09: retain the Lam metric denominator in the initial r2 summary, not only the corrected body. Depth-normalized deviation is not percent width uniformity.
3. Capacity boundaries: SEMI wafer-substrate shipment area, TSMC12-inch-equivalent annual capacity, actual foundry wafer shipments, specific-node starts and CoWoS package slots are different quantities. A small GPU share of total capacity cannot prove no front-end constraint. The same correction was applied to back-half20/19.
4. Memory boundary: HBM array dies, logic base dies and GPU compute dies use different manufacturing resources. “Memory makers are IDMs” is a dominant business arrangement, not a physical prohibition on foundry-made base dies. Back-half20 now says this explicitly.
5. Optics:13.5nm wavelength,0.33/0.55NA,193nm ArF and1.35NA are consistent. Back-half21's older18A table must reflect the dated Sep2026 selected-layer High-NA claim; the source does not validate every18A product.
6. Yield: illustrative perfect-die probability, harvested sellable yield, post-test KGD escape fraction and assembly yield cannot be substituted for each other. Back-half21 now distinguishes KGD post-selection good fraction from raw wafer yield. Negative-binomial/Poisson examples are model outputs, not disclosed foundry yields.

The current corrected six-claim samples generally withstand these challenges; proprietary profitability remains unresolved. This is evidence of the listed sample only. Subsequent source/body changes need to be attributed to the author and this report updated if they alter a sampled conclusion.
