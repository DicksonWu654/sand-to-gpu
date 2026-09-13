# Module 21: Glossary and Reference

This module is the course's lookup volume. It does not teach a new stage of the chain; it collects, in one place, the vocabulary, units, numbers, and orderings that the other twenty modules use, so that a reader who forgets what "MOL" means in the middle of Module 17, or wants to know whether a 23 nm metal pitch is bigger or smaller than an EUV wavelength, can find the answer in under a minute. It is organized as six reference sections followed by the standard Key Numbers and Key Players tables. The Key Players table here is the master list for the whole course: roughly sixty companies, each placed at its stage in the chain.

A note on conventions used throughout the course, since several of them are non-obvious:

- **Node names** (N7, N5, N3, N2, A16, 18A) are marketing labels, not dimensions. When a physical size matters the course quotes **CPP** (contacted poly pitch), **MP** (minimum metal pitch), or **MTr/mm²** (transistor density). See Section 3.
- **Prices** are foundry list-price estimates as of ~2025 and are quoted in US dollars per 300 mm wafer unless stated otherwise. Real contract prices are confidential and vary by customer and volume.
- **"~"** before a number means the value is approximate, disputed, or reverse-engineered from teardowns. A range means public sources disagree.
- **Module references** in parentheses point to where a term is explained in mechanism-level depth.

The sections are:

1. Glossary (alphabetical, ~200 terms)
2. Unit conventions and a sense-of-scale table
3. Node table
4. Master process flow: sand to rack in ~120 steps
5. Who buys from whom: the supply-chain adjacency list
6. What to learn next
7. Key Numbers
8. Key Players (master list)
9. Where This Fits in the Supply Chain

## Glossary

Terms are alphabetized by the acronym or the first word of the term as it is normally written. Where an acronym is the common usage, the expansion follows in parentheses.

- **1T1C** — The DRAM cell: one access transistor and one storage capacitor. The capacitor holds ~10–20 fF and must be refreshed every ~64 ms because charge leaks. (Module 15)
- **2.5D packaging** — Placing multiple dies side by side on a silicon or organic interposer that carries fine wiring between them; CoWoS is the canonical example. Contrast with 3D (dies stacked vertically). (Module 17)
- **3D NAND** — Flash memory built as vertical strings of charge-trap cells through a stack of 200–300+ alternating layers; the channel hole etch through the stack is the defining high-aspect-ratio process. (Modules 09, 15)
- **ABF (Ajinomoto Build-up Film)** — The epoxy-based dielectric film laminated layer by layer to form the build-up layers of a flip-chip package substrate. Ajinomoto supplies essentially all of it. (Module 16)
- **Airgap** — A deliberate void left between adjacent metal lines in the BEOL so the dielectric constant approaches 1, reducing capacitance. (Module 12)
- **ALD (Atomic Layer Deposition)** — Film growth by alternating, self-limiting half-reactions (precursor pulse, purge, reactant pulse, purge), depositing ~0.1 nm per cycle with perfect conformality. Used for high-k gate dielectrics, liners, spacers. (Module 06)
- **ALE (Atomic Layer Etching)** — The etch analogue of ALD: a surface-modification step (e.g. Cl₂ adsorption) followed by a removal step (low-energy Ar ions) that takes off one modified layer per cycle. (Module 09)
- **AMC (Airborne Molecular Contamination)** — Gaseous contaminants (acids, bases, organics, dopants) in cleanroom air at ppb levels that adsorb onto wafers and reticles; controlled with chemical filters and FOUP purging. (Module 05)
- **AMHS (Automated Material Handling System)** — The overhead-hoist-transport (OHT) rail network and stockers that move FOUPs between tools in a 300 mm fab; a GigaFab has tens of kilometers of rail and thousands of vehicles. (Module 05)
- **Anisotropy** — The degree to which an etch removes material vertically rather than laterally. Ion-driven etches are anisotropic; purely chemical etches are isotropic. (Module 09)
- **APC (Advanced Process Control)** — Run-to-run and feed-forward/feed-back control loops that adjust recipes (e.g. etch time, exposure dose) from metrology data on previous lots. (Module 13)
- **ARDE (Aspect-Ratio-Dependent Etching)** — The tendency for narrow, deep features to etch more slowly than wide ones because neutrals and ions reach the bottom less easily; also called RIE lag. (Module 09)
- **Arrhenius acceleration** — Reliability model in which failure rate scales as exp(−Ea/kT); raising temperature during burn-in accelerates failure mechanisms by a factor AF = exp[(Ea/k)(1/T_use − 1/T_stress)]. (Module 18)
- **Aspect ratio** — Depth divided by width of a feature. DRAM capacitors exceed 50:1; 3D NAND channel holes exceed 60:1. (Modules 09, 15)
- **ATE (Automatic Test Equipment)** — The tester (Advantest V93000, Teradyne UltraFLEX) that drives and measures a device under test through a probe card or socket. (Module 14)
- **Backgrinding** — Thinning a finished wafer from 775 µm to typically 50–200 µm (30 µm for HBM dies) with a diamond grinding wheel before dicing. (Modules 15, 16)
- **Backside power delivery (BSPDN)** — Routing the power grid through the back of the wafer (via nano-TSVs or direct contacts to S/D) so that the front-side metal is used only for signals. Intel PowerVia, TSMC A16 Super Power Rail. (Modules 11, 12)
- **Barrier layer** — A thin (1–2 nm) TaN or similar film lining a copper trench to stop Cu diffusing into the dielectric. (Module 12)
- **Bathtub curve** — Failure rate versus time: high early ("infant mortality"), low and flat in mid-life, rising at wear-out. Burn-in exists to move past the first region before shipment. (Module 18)
- **BEOL (Back End of Line)** — All process steps after the first contact level: the 15–18 copper/low-k interconnect levels, pads, and passivation. (Module 12)
- **BGA (Ball Grid Array)** — Package type whose bottom carries an array of solder balls (0.4–1.0 mm pitch) for attachment to a PCB. LGA (Land Grid Array) omits the balls. (Module 16)
- **Binning** — Sorting tested dies into speed/power/functionality grades that are sold as different products. (Module 14)
- **BIST (Built-In Self-Test)** — On-chip circuitry (memory BIST, logic BIST) that generates test patterns and checks responses without an external tester supplying every vector. (Module 14)
- **Black's equation** — Electromigration lifetime model: MTTF = A·J^(−n)·exp(Ea/kT), with n ≈ 1–2 and Ea ≈ 0.8–1.0 eV for Cu. (Module 12)
- **BOE (Buffered Oxide Etch)** — HF buffered with NH₄F to give a stable, controllable SiO₂ etch rate (~100 nm/min for 6:1 BOE). (Module 09)
- **Bosch process** — Deep silicon etch alternating SF₆ etch pulses with C₄F₈ passivation pulses, producing near-vertical walls with characteristic scalloping; used for TSVs and MEMS. (Modules 09, 17)
- **Bright-field inspection** — Optical defect inspection using reflected light with a broadband or DUV source; the workhorse patterned-wafer inspector (KLA 29xx/39xx series). (Module 13)
- **Build-up substrate** — Flip-chip package substrate made of a glass-epoxy core with several ABF build-up layers on each side, patterned by SAP. (Module 16)
- **Burn-in** — Operating packaged parts at elevated temperature and voltage (e.g. 125 °C, 1.1–1.3× Vdd) for hours to precipitate infant-mortality failures. (Module 18)
- **C4 bump (Controlled Collapse Chip Connection)** — Solder bumps (~100 µm pitch, historically Pb-Sn, now SnAg) that connect a flip-chip die to a substrate. (Module 16)
- **CAR (Chemically Amplified Resist)** — Photoresist in which a photo-generated acid catalytically deprotects many polymer sites during post-exposure bake, giving high sensitivity; the standard for KrF, ArF, and most EUV layers. (Modules 07, 08)
- **CCP (Capacitively Coupled Plasma)** — Plasma etch reactor with the wafer on one of two parallel RF electrodes; gives high ion energy, used for dielectric etch. (Module 09)
- **CD (Critical Dimension)** — The width of the smallest patterned feature on a layer, measured by CD-SEM or scatterometry. (Modules 07, 13)
- **CD-SEM** — Scanning electron microscope optimized for low-voltage, non-destructive line-width measurement to ~0.1 nm precision. (Module 13)
- **CDU (Critical Dimension Uniformity)** — The 3σ spread of CD across a field, wafer, or lot; leading nodes require < 1 nm on gate layers. (Module 07)
- **CFET (Complementary FET)** — Future device in which the NMOS nanosheet stack is placed directly above the PMOS stack, halving cell footprint; targeted for ~2030 nodes. (Module 11)
- **Channeling** — Implanted ions travelling unusually far along open crystal directions; suppressed by tilting the wafer ~7° or implanting through a screen oxide. (Module 10)
- **Chiplet** — A die designed to be one of several in a package, connected by a die-to-die interface (UCIe, NV-HBI, Infinity Fabric). (Modules 17, 19)
- **Cleanroom class** — Particle-count standard; ISO Class 1 allows ≤10 particles ≥0.1 µm per m³. Modern fabs run ISO 3–5 in the ballroom and effectively ISO 1 inside FOUPs and tool mini-environments. (Module 05)
- **CMP (Chemical Mechanical Planarization/Polishing)** — Flattening a wafer by pressing it against a rotating polyurethane pad flooded with abrasive slurry; used after STI fill, ILD deposition, and every copper level. (Modules 03, 12)
- **COAG (Contact Over Active Gate)** — DTCO technique placing the gate contact directly above the active channel instead of on an extension, saving cell height. (Module 11)
- **COP (Crystal-Originated Particle)** — Octahedral voids ~100 nm across formed by vacancy agglomeration during CZ growth, which show up as "particles" in surface inspection. (Module 02)
- **CoW (Chip on Wafer)** — First half of CoWoS: dies are bonded to the interposer while the interposer is still a full wafer. (Module 17)
- **CoWoS (Chip on Wafer on Substrate)** — TSMC's 2.5D packaging family. **-S**: silicon interposer with TSVs. **-R**: organic RDL interposer. **-L**: organic interposer with embedded local silicon interconnect (LSI) bridges; used by Blackwell. (Module 17)
- **CPP (Contacted Poly Pitch)** — Center-to-center distance between adjacent gates; ~45–48 nm at N3/N2. Also called contacted gate pitch. Sets standard-cell width. (Module 11)
- **Cpk** — Process capability index: (nearer spec limit − mean)/3σ. Cpk ≥ 1.33 is a common minimum; 1.67 for critical parameters. (Module 13)
- **Cu pillar** — Copper post with a solder cap replacing a solder bump for fine-pitch flip-chip (down to ~40 µm pitch). (Module 16)
- **Cut mask** — Litho layer that severs lines produced by SADP/SAQP into the desired segments. (Module 07)
- **CVD (Chemical Vapor Deposition)** — Film growth from gas-phase precursors reacting on a heated surface. Variants: LPCVD (low pressure, furnace), PECVD (plasma-enhanced, ~400 °C), SACVD (sub-atmospheric, for gap fill), MOCVD (metal-organic, for compound semiconductors). (Module 06)
- **Cycle time** — Elapsed time from wafer start to wafer out; ~3–4 months for a leading-edge logic wafer with 1,000–1,500 steps. (Module 05)
- **CZ (Czochralski) growth** — Pulling a single crystal from a silicon melt in a quartz crucible using a seed crystal; produces essentially all 300 mm wafers. **MCZ** adds a magnetic field to suppress melt convection. (Module 02)
- **D0** — Defect density in killer defects per cm², the parameter of every yield model; ~0.05–0.1 /cm² for a mature leading node, ~0.5+ /cm² early in a ramp. (Module 13)
- **Damascene** — Forming metal lines by etching trenches into dielectric, filling with metal, and polishing back, rather than etching the metal. **Dual damascene** fills via and trench in one plating step. (Module 12)
- **Dash neck** — The ~3 mm diameter neck pulled rapidly at the start of CZ growth to eliminate dislocations inherited from the seed. (Module 02)
- **Deal-Grove model** — Thermal oxidation kinetics: x² + A·x = B(t + τ); linear (reaction-limited) growth for thin oxide, parabolic (diffusion-limited) for thick. (Module 06)
- **Defect classification** — Assigning inspection-found defects to categories (particle, scratch, bridge, void, residue) by SEM review, often with machine learning. (Module 13)
- **DFT (Design for Test)** — Design structures added solely to make a chip testable: scan chains, BIST, boundary scan, test compression. (Module 14)
- **DIBL (Drain-Induced Barrier Lowering)** — Short-channel effect in which drain voltage lowers the source barrier and hence the threshold voltage; quoted in mV/V, ~30–50 mV/V is acceptable. (Module 11)
- **Dicing** — Separating dies from a wafer. **Blade**: diamond-resin saw. **Laser stealth**: sub-surface laser damage followed by tape expansion. **Plasma**: Bosch etch through streets. (Module 16)
- **Die attach** — Bonding a die to a substrate, leadframe, or another die with adhesive, solder, or direct bonding. (Module 16)
- **Diffusion (dopant)** — Thermally driven movement of dopant atoms in silicon; the reason every anneal has a thermal budget. (Module 10)
- **DPPM (Defective Parts Per Million)** — Field-failure rate of shipped parts; automotive targets < 1 DPPM, data-center GPUs are in the tens. (Module 18)
- **DRAM (Dynamic Random-Access Memory)** — 1T1C volatile memory. Nodes are labelled 1α, 1β, 1γ (roughly 14, 12–13, 11 nm half-pitch class). (Module 15)
- **DRC/LVS (Design Rule Check / Layout Versus Schematic)** — Physical verification signoff steps: DRC checks geometry against foundry rules; LVS checks the extracted netlist matches the schematic. (Module 19)
- **DSP (Double-Side Polish)** — Simultaneous polishing of both wafer faces between two pads, the step that establishes global flatness. (Module 03)
- **DTCO (Design-Technology Co-Optimization)** — Co-designing standard-cell layouts and process rules (SDB, COAG, track reduction) to gain density that pure pitch scaling no longer delivers. (Module 11)
- **DUV (Deep Ultraviolet)** — Lithography with KrF (248 nm) or ArF (193 nm) excimer lasers; ArF immersion (ArFi) at NA 1.35 patterns ~75–85% of a leading-node mask set. (Module 07)
- **ECD (Electrochemical Deposition)** — Copper electroplating from a CuSO₄/H₂SO₄ bath with organic additives; the fill step of damascene. Also called ECP. (Module 12)
- **EDA (Electronic Design Automation)** — Software for chip design: synthesis, place and route, timing, verification, DRC/LVS. Synopsys and Cadence hold ~70% of the market; Siemens EDA is #3. (Module 19)
- **E-fuse** — One-time-programmable on-chip fuse blown at test to store die ID, trim values, or disable defective blocks. (Module 14)
- **Electromigration (EM)** — Momentum transfer from electrons to metal atoms at current densities > ~10⁶ A/cm², causing voids and hillocks over time. (Module 12)
- **Ellipsometry** — Measuring film thickness and refractive index from the change in polarization of reflected light; resolves sub-angstrom thickness changes. (Module 13)
- **EMC (Epoxy Mold Compound)** — Silica-filled epoxy that encapsulates dies in a package; molded at ~175 °C. (Module 16)
- **EMIB (Embedded Multi-die Interconnect Bridge)** — Intel's approach embedding a small silicon bridge in the substrate to connect adjacent dies at fine pitch without a full interposer. (Module 17)
- **Endpoint detection** — Determining when an etch has cleared a layer, by optical emission spectroscopy, interferometry, or RF impedance change. (Module 09)
- **EOT (Equivalent Oxide Thickness)** — The SiO₂ thickness that would give the same gate capacitance as the actual high-k stack; ~0.8–1.0 nm at leading nodes with a physical HfO₂ thickness of ~1.5–2 nm. (Module 11)
- **Epitaxy (epi)** — Growth of a crystalline film that continues the substrate lattice; used for epi wafers, SiGe source/drain, and the Si/SiGe superlattice for nanosheets. (Modules 03, 06)
- **EUV (Extreme Ultraviolet)** — Lithography at 13.5 nm using a laser-produced tin plasma source and all-reflective Mo/Si multilayer optics in vacuum. NA 0.33 (NXE:3600D, 3800E) and NA 0.55 High-NA (EXE:5000, 5200). (Module 08)
- **Excursion** — An out-of-control event in a process detected by SPC; triggers a hold on affected lots. (Module 13)
- **Fab** — A wafer fabrication plant. A leading-edge 300 mm fab costs $20–30 billion and runs ~100,000 wafer starts per month at full build-out. (Module 05)
- **FBR (Fluidized Bed Reactor)** — Alternative to the Siemens process: silane decomposes on seed granules suspended in a gas stream, producing granular polysilicon at lower energy. (Module 01)
- **FDC (Fault Detection and Classification)** — Real-time monitoring of tool sensor traces (RF power, pressure, gas flow) against learned signatures to catch tool faults before they produce bad wafers. (Module 13)
- **FEOL (Front End of Line)** — Process steps that build the transistors: STI, wells, fins/sheets, gate stack, spacers, S/D epi, RMG. (Module 11)
- **FinFET** — Transistor whose channel is a vertical silicon fin (~6 nm wide, ~50 nm tall) wrapped on three sides by the gate. Intel 22 nm (2012) to TSMC N3. (Module 11)
- **Fin pitch** — Center-to-center spacing of fins, 26–34 nm at 7 nm to 3 nm class nodes, patterned by SAQP or EUV. (Module 11)
- **Flip-chip** — Die mounted face-down on the substrate with bumps rather than face-up with wire bonds. (Module 16)
- **FOUP (Front-Opening Unified Pod)** — Sealed 25-wafer carrier for 300 mm wafers, docked to tools through a load port; the wafers' clean mini-environment. (Module 05)
- **Foveros** — Intel's die-on-die 3D stacking using microbumps (Foveros) or hybrid bonding (Foveros Direct). (Module 17)
- **FZ (Float Zone) growth** — Crucible-free crystal growth by passing an RF-heated molten zone along a polysilicon rod; gives ultra-low oxygen, high resistivity; limited to ~200 mm. (Module 02)
- **GAA (Gate-All-Around)** — Transistor whose gate fully surrounds the channel; the nanosheet (ribbon) implementation is used at TSMC N2, Samsung SF3/SF2, Intel 18A. (Module 11)
- **Gate length (Lg)** — Physical length of the gate along the channel, ~12–16 nm at 2 nm class nodes; not the node name. (Module 11)
- **GDSII / OASIS** — File formats for chip layout delivered at tape-out. OASIS is the compressed successor to GDSII. (Module 19)
- **Gettering** — Trapping metallic contaminants away from the device region, using oxygen precipitates in the bulk (intrinsic) or backside damage (extrinsic). (Modules 02, 03)
- **GigaFab** — TSMC's term for a 300 mm fab site with ≥100,000 wafer starts per month across several phases. (Module 05)
- **Hard mask** — A durable film (SiN, TiN, amorphous carbon, spin-on carbon) that receives the resist pattern and then masks a long etch the resist could not survive. (Module 09)
- **HAR (High-Aspect-Ratio) etch** — Etching features with aspect ratio > ~20:1; the channel-hole etch in 3D NAND and DRAM capacitor etch. (Module 09)
- **HBM (High Bandwidth Memory)** — DRAM dies (8, 12, 16 high) stacked with TSVs on a base logic die, delivering ~1–2 TB/s per stack. HBM3E and HBM4 are current. (Module 15)
- **HGX** — NVIDIA's baseboard carrying 8 SXM GPUs and NVSwitch chips, sold to system builders. (Module 19)
- **High-NA EUV** — 0.55 NA anamorphic EUV (ASML EXE:5000/5200), ~8 nm resolution, half-size exposure field. (Module 08)
- **HKMG (High-k Metal Gate)** — Gate stack using HfO₂ (k ≈ 20–25) instead of SiO₂ and a metal instead of polysilicon; introduced at Intel 45 nm (2007). (Module 11)
- **HPQ (High-Purity Quartz)** — Quartz with < ~50 ppm total impurities used for CZ crucibles; Spruce Pine, North Carolina is the dominant source. (Module 01)
- **HVM (High-Volume Manufacturing)** — The point at which a node runs at production yields and volumes rather than risk production. (Module 20)
- **Hybrid bonding** — Direct Cu-Cu plus oxide-oxide bonding of two dies or wafers at room temperature followed by anneal, with no solder; sub-10 µm pitch. Used in SoIC, Foveros Direct, and (from HBM4E-class parts) HBM. (Module 17)
- **ICP (Inductively Coupled Plasma)** — Plasma reactor with a coil antenna generating high-density plasma; ion energy set independently by a bias RF; used for silicon and metal etch. (Module 09)
- **IDM (Integrated Device Manufacturer)** — A company that designs and fabricates its own chips (Intel, Samsung, Micron, SK hynix). (Module 20)
- **ILD (Interlayer Dielectric)** — Insulator between metal levels; low-k SiOCH at ~2.5–3.0 in the lower levels. **PMD** (pre-metal dielectric) is the layer under M1. (Module 12)
- **Immersion lithography** — ArF exposure with a ~1 mm film of ultrapure water between the final lens element and the wafer, raising NA from 0.93 to 1.35. (Module 07)
- **Implant (ion implantation)** — Introducing dopants by accelerating ions to keV–MeV energies into the wafer; dose in atoms/cm², energy in keV. (Module 10)
- **InFO (Integrated Fan-Out)** — TSMC's fan-out wafer-level package with RDL built directly over molded dies; used in Apple processors. (Module 17)
- **Ingot** — The as-grown single crystal, ~300 mm diameter, ~2 m long, ~300 kg. (Module 02)
- **Interposer** — A passive silicon or organic layer with fine wiring that sits between chiplets and the package substrate. (Module 17)
- **k1** — Dimensionless process factor in the Rayleigh resolution equation; the physical limit for a single exposure is 0.25, practical production ~0.28–0.35. (Module 07)
- **KGD (Known Good Die)** — A bare die that has been tested sufficiently to be sold or stacked with confidence; essential for HBM and chiplets, where one bad die scraps the whole stack. (Modules 14, 18)
- **KrF** — Krypton fluoride excimer laser, 248 nm, used for less critical layers. (Module 07)
- **Lapping** — Abrasive slurry planarization of sawn wafers between two plates to remove saw damage and set thickness. (Module 03)
- **Leadframe** — Stamped copper frame used in wire-bonded packages (QFN, QFP, SOIC) instead of a substrate. (Module 16)
- **Learning curve** — Yield versus cumulative volume; a new node typically goes from ~50% to ~80–90% die yield over 12–24 months. (Module 13)
- **LELE (Litho-Etch-Litho-Etch)** — Double patterning by two separate exposures, each transferred into a hard mask; also LELELE for triple. (Module 07)
- **LER / LWR (Line Edge Roughness / Line Width Roughness)** — Random nanometer-scale deviation of a resist line's edge or width, ~1–2 nm 3σ at EUV; a dominant variability term. (Module 08)
- **Liner** — Thin film deposited on trench walls before the main fill (e.g. Co or Ru liner on TaN barrier before Cu seed). (Module 12)
- **Little's law** — WIP = throughput × cycle time. A fab running 100,000 wafer starts/month with a 90-day cycle time carries ~300,000 wafers in process. (Module 05)
- **Lot** — A group of (usually) 25 wafers processed together in one FOUP and tracked as one unit by the MES. (Module 05)
- **Low-k dielectric** — Insulator with k below SiO₂'s 3.9; carbon-doped oxide (SiOCH) at k ≈ 2.5–3.0, porous variants lower. (Module 12)
- **LPP (Laser-Produced Plasma)** — The EUV source: 30 µm tin droplets at ~50 kHz hit by a pre-pulse and a ~20–30 kW CO₂ main pulse, producing a plasma that radiates at 13.5 nm. (Module 08)
- **LSI (Local Silicon Interconnect)** — Small silicon bridge die embedded in a CoWoS-L organic interposer to carry fine-pitch die-to-die and die-to-HBM wiring. (Module 17)
- **Mask / photomask / reticle** — 6-inch fused-silica plate carrying one layer's pattern at 4× scale; chrome or MoSi absorber on glass for DUV, Ta-based absorber on a Mo/Si multilayer for EUV. A leading-node mask set is 70–100+ masks and costs ~$20–30M. (Module 04)
- **Metal pitch (MP)** — Center-to-center spacing of the tightest metal lines (M0/M1): ~23–25 nm at N3/N2, 32 nm at Intel 18A. (Module 12)
- **MES (Manufacturing Execution System)** — Software that tracks every lot, dispatches it to tools, enforces recipes, and records history. (Module 05)
- **MG-Si (Metallurgical-Grade Silicon)** — ~98–99% pure silicon from carbothermic reduction of quartz in a submerged-arc furnace. (Module 01)
- **Microbump** — Solder-capped Cu pillar at 25–55 µm pitch connecting a die to an interposer or another die. (Module 17)
- **MOL (Middle of Line)** — The contact levels between transistors and M1: trench silicide, S/D contacts (W, Co, or Ru), gate contacts, and M0. (Modules 11, 12)
- **Moore's law** — Observation (1965, revised 1975) that transistor count per chip doubles about every two years; density scaling continues at ~1.15–1.3× per node, cost per transistor has flattened. (Module 20)
- **MR-MUF (Mass Reflow Molded Underfill)** — SK hynix's HBM stacking process: all dies are reflowed at once and the stack is molded with a liquid underfill; better thermal performance than TC-NCF. (Module 15)
- **mSAP (Modified Semi-Additive Process)** — Substrate patterning using a thin seed copper and pattern plating for ~10 µm lines; SAP (semi-additive) uses electroless seed for finer lines. (Module 16)
- **MTr/mm²** — Millions of transistors per square millimeter; the standard density metric, usually quoted for the high-density library (Intel's 2017 formula: 0.6 × NAND2 density + 0.4 × flip-flop density). (Module 11)
- **Multi-patterning** — Using multiple exposures or spacer steps to print pitches below the single-exposure limit: LELE, SADP, SAQP. (Module 07)
- **Murphy yield model** — Y = [(1 − e^(−A·D0)) / (A·D0)]², a less pessimistic alternative to Poisson for large dies. (Module 13)
- **NA (Numerical Aperture)** — n·sin θ of the projection lens; 1.35 for ArF immersion, 0.33 and 0.55 for EUV. (Modules 07, 08)
- **Nanosheet** — Horizontal silicon ribbon (~5–8 nm thick, 10–50 nm wide), three or four stacked per transistor, each fully surrounded by the gate. (Module 11)
- **Negative binomial yield model** — Y = (1 + A·D0/α)^(−α), with clustering parameter α (~2–5) accounting for non-random defect distribution; the industry default. (Module 13)
- **Node** — A named process generation (N7, N5, N3, N2, A16, Intel 18A, SF2). The number no longer corresponds to any physical dimension. (Modules 11, 20)
- **Notch** — The small V-shaped cutout on a 300 mm wafer's edge marking crystal orientation (replaces the flat of smaller wafers). (Module 03)
- **Novolac / DNQ** — Classic i-line/g-line positive resist: novolac resin plus diazonaphthoquinone dissolution inhibitor. (Module 07)
- **NVLink / NVSwitch / NV-HBI** — NVIDIA's GPU-to-GPU interconnect, the switch chip that fabrics it, and the 10 TB/s die-to-die link joining Blackwell's two dies. (Module 19)
- **OCD (Optical Critical Dimension) / scatterometry** — Inferring 3D profile of periodic structures from the spectrum of scattered light, fitted to a model. (Module 13)
- **OHT (Overhead Hoist Transport)** — The ceiling-rail vehicles of the AMHS. (Module 05)
- **OPC (Optical Proximity Correction)** — Computationally pre-distorting mask shapes (serifs, assist features, edge biases) so the printed image matches design intent. Inverse lithography (ILT) is the full-optimization variant. (Modules 04, 07)
- **OSAT (Outsourced Semiconductor Assembly and Test)** — Contract packaging and test houses: ASE, Amkor, JCET, PTI, KYEC. (Module 16)
- **Overlay** — Positional error between a layer and the layer beneath; budget ~2 nm at leading nodes, measured on dedicated targets. (Modules 07, 13)
- **Oxygen precipitates** — SiO₂ clusters formed from the ~10¹⁸ cm⁻³ interstitial oxygen in CZ silicon during thermal processing; useful for gettering in the bulk, fatal in the device layer. (Module 02)
- **PAG (Photoacid Generator)** — Additive in a CAR that releases an acid on exposure. (Module 07)
- **Panel-level packaging** — Fan-out or substrate processes on large rectangular panels (e.g. 510 × 515 mm) instead of round wafers for area efficiency. (Module 17)
- **Parametric test** — Electrical measurement of test structures in scribe lines (transistor Vt, Ion, contact resistance, sheet resistance); see WAT. (Module 13)
- **Passivation** — Final dielectric stack (SiN/oxide, polyimide) over the top metal protecting the die from moisture and mechanical damage, opened only at pads. (Module 12)
- **PDK (Process Design Kit)** — The foundry's package of device models, design rules, layout libraries, and extraction decks that lets a customer design for a node. (Module 19)
- **PEB (Post-Exposure Bake)** — Bake at ~90–130 °C that drives the acid-catalyzed deprotection in a CAR; its temperature uniformity directly sets CDU. (Module 07)
- **PECVD (Plasma-Enhanced CVD)** — CVD with plasma activation allowing deposition at ~200–400 °C; standard for BEOL dielectrics and hard masks. (Module 06)
- **Pellicle** — Thin membrane held a few mm above the mask so particles land out of focus; EUV pellicles are ~50 nm polysilicon-, metal-silicide- or carbon-nanotube-based films with ~85–92% transmission depending on generation. (Modules 04, 08)
- **Phase-shift mask (PSM)** — Mask that modulates phase as well as amplitude to sharpen the aerial image; attenuated PSM (6% MoSi) is standard for ArF. (Module 07)
- **Photoresist** — Light-sensitive polymer film that becomes soluble (positive) or insoluble (negative) where exposed. (Module 07)
- **Place and route (P&R)** — EDA step placing standard cells and routing wires between them under timing and DRC constraints. (Module 19)
- **PLAD (Plasma Doping)** — Doping by immersing the wafer in a plasma and pulsing a bias to implant ions conformally; used for 3D structures and DRAM. (Module 10)
- **Poisson yield model** — Y = e^(−A·D0); the simplest and most pessimistic die-yield model. (Module 13)
- **Polysilicon (poly)** — Multi-crystalline silicon: as a raw material (9N–11N chunks) and as a thin film (gate electrodes, dummy gates). (Modules 01, 11)
- **PowerVia** — Intel's backside power delivery, first in production on Intel 18A. (Modules 11, 12)
- **Probe card** — The needle or MEMS-spring array that contacts thousands of pads on a die during wafer sort; FormFactor, Technoprobe, MJC. (Module 14)
- **Pull rate** — Speed at which the CZ crystal is drawn from the melt, ~0.5–1.5 mm/min for 300 mm body growth. (Module 02)
- **PVD (Physical Vapor Deposition) / sputtering** — Depositing metal by bombarding a target with Ar ions and letting ejected atoms condense on the wafer; barriers, seeds, and pad metals. (Module 06)
- **Quencher** — Base added to a CAR to neutralize stray acid and sharpen the chemical edge. (Module 07)
- **Rayleigh criterion** — Resolution = k1·λ/NA; depth of focus = k2·λ/NA². (Module 07)
- **RC delay** — Interconnect delay proportional to resistance × capacitance; now dominates over transistor delay in most paths. (Module 12)
- **RCA clean** — Standard wet clean: **SC-1** (NH₄OH:H₂O₂:H₂O, removes particles and organics) and **SC-2** (HCl:H₂O₂:H₂O, removes metals), often with an HF dip between. (Module 03)
- **RDL (Redistribution Layer)** — Thin-film Cu wiring over a die or molded panel that re-routes pads to a new footprint; the wiring of fan-out and CoWoS-R. (Module 17)
- **Re-entrant flow** — A fab's routing in which a lot returns to the same litho, etch, and deposition tools dozens of times; the root of fab scheduling complexity. (Module 05)
- **Reflow** — Heating an assembly above solder melting point (~220–250 °C for SAC305) so joints form. (Module 16)
- **Reticle limit** — Maximum single-exposure field, 26 mm × 33 mm = 858 mm² at 0.33 NA EUV and ArF; 26 × 16.5 mm = 429 mm² for High-NA. (Modules 08, 19)
- **RIE (Reactive Ion Etching)** — Plasma etch combining chemical reaction and ion bombardment; the generic term for anisotropic dry etch. (Module 09)
- **RMG (Replacement Metal Gate)** — Gate-last integration: build a polysilicon dummy gate, complete S/D and ILD0, remove the dummy, and fill with HKMG. (Module 11)
- **RTA (Rapid Thermal Anneal)** — Lamp or laser heating to 1,000–1,300 °C for seconds (spike), milliseconds (flash/laser), to activate dopants with minimal diffusion. (Module 10)
- **Rule of ten** — Test economics heuristic: the cost of a defect escaping rises ~10× at each stage (wafer, package, board, system, field). (Module 14)
- **SADP / SAQP (Self-Aligned Double / Quadruple Patterning)** — Pitch division by depositing conformal spacers on mandrel lines, removing the mandrels, and using the spacers as the mask; SAQP repeats it. (Module 07)
- **SAC (Self-Aligned Contact)** — Nitride cap on the metal gate that lets the contact etch overlap the gate without shorting. (Module 11)
- **Scan chain** — DFT structure linking all flip-flops into shift registers so internal state can be loaded and observed by the tester. (Module 14)
- **Scanner** — Step-and-scan exposure tool that scans a slit across the reticle and wafer simultaneously; all modern DUV and EUV tools. (Module 07)
- **SDB (Single Diffusion Break)** — Isolation between cells using one gate pitch instead of two. (Module 11)
- **Segregation coefficient (k₀)** — Ratio of dopant concentration in solid to liquid at the growth interface; boron 0.8, phosphorus 0.35, oxygen ~1.25. Explains axial resistivity variation in CZ ingots. (Module 02)
- **Selectivity** — Ratio of etch rates between the material being etched and the mask or underlying layer; > 10:1 typical, > 50:1 for critical stops. (Module 09)
- **SFQR** — Site flatness (front-referenced, least-squares plane, range) over a 26 × 8 mm site; spec ≤ ~20 nm for leading-edge prime wafers. (Module 03)
- **Short-channel effects (SCE)** — Loss of gate control at small Lg: Vt roll-off, DIBL, degraded subthreshold swing. (Module 11)
- **Siemens process** — Polysilicon production by decomposing trichlorosilane (TCS) with hydrogen on heated (~1,100 °C) silicon rods in a bell-jar reactor. (Module 01)
- **SLT (System-Level Test)** — Testing a packaged part in a system-like environment running real workloads, after ATE test; catches escapes ATE cannot model. (Module 18)
- **Slurry** — Colloidal abrasive (silica, ceria, alumina) in a chemically active liquid used for CMP. (Modules 03, 12)
- **Smart Cut** — Soitec's SOI process: implant hydrogen into a donor wafer, bond to a handle wafer, and split at the implant depth. (Module 03)
- **SoIC (System on Integrated Chips)** — TSMC's hybrid-bonded 3D die stacking, used in AMD 3D V-Cache and MI300. (Module 17)
- **SOI (Silicon on Insulator)** — Wafer with a thin device silicon layer over buried oxide; FD-SOI at 22/28 nm (GlobalFoundries, STMicro), RF-SOI for switches. (Module 03)
- **Sort (wafer sort / probe)** — Electrical test of each die while still on the wafer. (Module 14)
- **Spacer** — Dielectric sidewall (SiN, SiOCN, ~5 nm) on a gate that offsets the S/D from the channel and, in SADP, becomes the pattern. (Modules 07, 11)
- **SPC (Statistical Process Control)** — Monitoring metrology results on control charts with limits set from process variation (typically ±3σ), so that drifts trigger action before specs are violated. (Module 13)
- **Sputter target** — High-purity metal disc or plate (Cu, Ta, Ti, Al, Co, W) consumed by PVD; suppliers include JX Metals, Honeywell, Tosoh. (Module 04)
- **Standard cell** — Pre-designed logic gate (NAND2, inverter, flip-flop) of fixed height in metal tracks; chips are assembled from millions of them. (Module 11)
- **STI (Shallow Trench Isolation)** — Oxide-filled trenches ~100–300 nm deep that electrically separate adjacent transistors; the first patterned FEOL step. (Module 11)
- **Stochastics** — Random pattern failures at EUV (missing contacts, bridged lines) arising from photon shot noise and resist chemistry at production doses of ~20–40 mJ/cm², and worse at lower doses. (Module 08)
- **Strain engineering** — Deliberately stretching (NMOS) or compressing (PMOS) the channel to increase carrier mobility; embedded SiGe S/D, stress liners. (Module 11)
- **String stacking** — Building a 3D NAND array as two or more decks etched separately and joined, to keep aspect ratio manageable beyond ~128 layers. (Module 15)
- **Subfab** — The floor below the cleanroom housing pumps, gas cabinets, abatement, and chillers. (Module 05)
- **Substrate (package)** — The multilayer organic (or ceramic) board that fans out die connections to the BGA. (Module 16)
- **Subthreshold swing (SS)** — Gate voltage change required for a 10× change in off-current; thermal limit 60 mV/decade at 300 K, ~65–70 for good FinFET/GAA. (Module 11)
- **Superfill** — Bottom-up copper electroplating in trenches driven by accelerator/suppressor/leveler additives, enabling void-free fill of narrow features. (Module 12)
- **SXM** — NVIDIA's mezzanine module form factor for data-center GPUs (GPU package, HBM, VRMs on one board, ~700–1,000+ W). (Module 19)
- **Tape-out** — Delivery of final layout (GDSII/OASIS) to the mask shop; the point of no return in design. (Module 19)
- **TCB (Thermocompression Bonding)** — Die-to-die or die-to-substrate bonding by applying heat and force to form solder or Cu joints at fine pitch; the standard HBM stacking method. (Modules 15, 17)
- **TC-NCF (Thermocompression with Non-Conductive Film)** — HBM stacking in which a pre-applied non-conductive film acts as underfill during TCB; used by Samsung and (historically) Micron. (Module 15)
- **TCS (Trichlorosilane, SiHCl₃)** — The intermediate distilled to ppt purity in the Siemens process. (Module 01)
- **TEM (Transmission Electron Microscopy)** — Imaging of thin cross-sections at atomic resolution; the destructive reference method for film thickness and device profiles. (Module 13)
- **Thermal budget** — Cumulative time-temperature exposure a structure can tolerate before dopants diffuse or films degrade; drops from ~1,000 °C in FEOL to ~400 °C in BEOL. (Module 06)
- **Threshold voltage (Vt)** — Gate voltage at which the channel turns on; ~0.2–0.4 V, set by work-function metal choice; PDKs offer 4–6 flavors. (Module 11)
- **TIM (Thermal Interface Material)** — Material between die and lid or lid and heatsink; indium or liquid metal for high-power GPUs. (Modules 16, 19)
- **Track (litho)** — The coat/bake/develop tool bolted to the scanner (TEL Lithius, SCREEN SOKUDO). **Track (cell)** — one minimum metal pitch of standard-cell height, e.g. 6T = six metal tracks. (Modules 07, 11)
- **TSV (Through-Silicon Via)** — Vertical Cu-filled via through a thinned die or interposer, ~5–10 µm diameter for HBM and ~10 µm for CoWoS-S interposers. (Modules 15, 17)
- **TTV (Total Thickness Variation)** — Maximum minus minimum thickness over a wafer; < 1 µm for thinned HBM dies, < ~2 µm for prime wafers. (Modules 03, 15)
- **UBM (Under-Bump Metallization)** — Metal stack (e.g. Ti/Cu/Ni) on the pad that adheres to the passivation, wets solder, and blocks diffusion. (Module 16)
- **UCIe (Universal Chiplet Interconnect Express)** — Open die-to-die interface standard for chiplets, ~2–5+ Tb/s per mm of shoreline at advanced-package pitches. (Module 17)
- **Underfill** — Capillary epoxy dispensed under a flip-chip die to distribute stress from CTE mismatch across the bumps. (Module 16)
- **UPW (Ultrapure Water)** — 18.2 MΩ·cm resistivity water with < 1 ppb TOC and essentially zero particles; a fab uses ~10 million liters per day. (Module 04)
- **Utilization** — Fraction of a tool's or fab's capacity in use; ~85–95% at TSMC in an upcycle. (Module 20)
- **Via** — Vertical metal connection between two adjacent interconnect levels. (Module 12)
- **Voronkov v/G criterion** — Ratio of pull rate to axial temperature gradient at the CZ interface; above ~0.13–0.20 mm²/(K·min) the crystal is vacancy-rich (COPs form), below it interstitial-rich (dislocation loops). (Module 02)
- **VRM (Voltage Regulator Module)** — Power stages on the SXM board or HGX converting 48–54 V to sub-1 V at hundreds of amps. (Module 19)
- **Wafer** — The single-crystal silicon disc; 300 mm diameter, 775 µm thick, ~127 g. (Module 03)
- **Wafer map** — Spatial plot of per-die test results or defects across a wafer; its pattern (edge ring, center cluster, scratch) diagnoses the root cause. (Module 13)
- **Warpage** — Bowing of a wafer, die, or package from CTE mismatch and film stress; a first-order problem for large CoWoS packages. (Module 17)
- **WAT (Wafer Acceptance Test)** — Parametric test of scribe-line structures at the end of the line to verify the wafer meets the process spec before sort. (Module 13)
- **Wet bench** — Tool with tanks of chemicals for batch immersion cleaning and etching; single-wafer spin tools now dominate critical cleans. (Module 03)
- **WFE (Wafer Fab Equipment)** — The equipment market for front-end tools, ~$100–120 billion per year as of ~2025. (Module 20)
- **WIP (Work in Process)** — Wafers started but not yet finished; see Little's law. (Module 05)
- **Wire bonding** — Connecting die pads to a leadframe or substrate with 15–25 µm gold or copper wire, thousands per second across the industry. (Module 16)
- **Work-function metal (WFM)** — TiN, TiAl, TaN layers inside the metal gate whose thickness and order set Vt separately for NMOS and PMOS. (Module 11)
- **WoS (Wafer on Substrate)** — Second half of CoWoS: the diced die-on-interposer unit is attached to the package substrate. (Module 17)
- **wph (wafers per hour)** — Throughput unit for a tool; ~220 wph for an NXE:3800E, ~295 wph for an NXT:2100i. (Modules 07, 08)
- **wspm (wafer starts per month)** — Capacity unit for a fab; a GigaFab exceeds 100,000. (Module 05)
- **Yield** — Fraction of good output. **Line yield**: wafers surviving the flow. **Die yield**: good dies per wafer. **Assembly/test yield**: good packages. **Compound yield** is their product. (Module 13)

## Units, Conventions, and a Sense of Scale

### Unit conventions used in this course

| Quantity | Unit as written | Notes |
|---|---|---|
| Length (device) | nm, Å | 1 Å = 0.1 nm. Film thickness often quoted in Å by tool engineers. |
| Length (package, wafer) | µm, mm | 775 µm wafer, 40 µm microbump pitch, 26 × 33 mm reticle. |
| Area (die) | mm² | H100 814 mm²; reticle limit 858 mm². |
| Density | MTr/mm² | Millions of transistors per mm², high-density library unless noted. |
| Dose (litho) | mJ/cm² | EUV resists 20–40 mJ/cm²; ArF 20–30. |
| Dose (implant) | atoms/cm² (or ions/cm²) | 10¹¹ (Vt adjust) to 10¹⁶ (S/D). |
| Energy (implant) | keV, MeV | 0.2 keV (ultra-shallow) to 3 MeV (deep wells). |
| Concentration | atoms/cm³ | Si has 5 × 10²² atoms/cm³; dopants 10¹⁵–10²¹. |
| Purity | N ("nines") | 9N = 99.9999999%; 11N electronic-grade polysilicon. |
| Resistivity | Ω·cm (bulk), Ω/sq (sheet), µΩ·cm (metal) | Cu bulk 1.7 µΩ·cm; 12 nm Cu line ~5–6 µΩ·cm. |
| Pressure | Torr, mTorr, Pa | 1 Torr = 133 Pa. Etch chambers 5–100 mTorr; EUV vessel ~1–5 Pa H₂. |
| Temperature | °C (process), K (physics) | Si melts at 1,414 °C. |
| Gas flow | sccm | Standard cm³/min. |
| Throughput | wph, wspm | Tool and fab capacity. |
| Defect density | /cm² | D0. |
| Time (cycle) | days | Fab cycle time ~90 days; "1.0–1.5 days per mask layer" is the rule of thumb. |
| Bandwidth | GB/s, TB/s | HBM3E ~1.2 TB/s per stack; NVLink 1.8 TB/s per GPU. |
| Money | USD | Wafer price per 300 mm wafer; tool price per unit; fab cost per phase. |

### Sense of scale: from a rack to an atom

The chain spans about ten orders of magnitude, from a 2 m rack to a 0.2 nm atom. Each row is roughly a factor of 3–10 smaller than the last.

| Object | Characteristic size | Notes | Module |
|---|---|---|---|
| Data-center rack (GB200 NVL72) | ~2 m tall, 0.6 m wide, ~1.4 t | 72 GPUs, 18 compute trays, 9 NVSwitch trays, liquid cooled | 19 |
| Server / compute tray | ~0.45 m deep, 1U–10U (44–445 mm) high | DGX B200 is 10U | 19 |
| HGX baseboard | ~0.5 × 0.4 m | 8 SXM modules plus NVSwitches | 19 |
| SXM module | ~140 × 80 mm | GPU package plus VRMs | 19 |
| GPU package (Blackwell, CoWoS-L) | ~90 × 90 mm substrate; interposer ~3.3× reticle | Two ~800 mm² dies, 8 HBM stacks | 17, 19 |
| Silicon wafer | 300 mm diameter | Notch marks <110> | 03 |
| GPU die | ~26 × 31 mm (~800 mm²) | Reticle limit 858 mm² | 19 |
| HBM stack | ~11 × 10 mm footprint, ~720 µm tall | 12-high HBM3E | 15 |
| Human hair | ~70 µm | For comparison | |
| Wafer thickness (as delivered) | 775 µm | Thinned to 50–200 µm in packaging | 03, 16 |
| C4 bump pitch | ~100–150 µm | Die to substrate | 16 |
| Microbump pitch | ~40 µm | Die to interposer, HBM die to die | 17 |
| HBM DRAM die thickness | ~30 µm (HBM3E), ~20–25 µm (HBM4 16-high) | TSV depth is the same | 15 |
| TSV diameter | ~5–10 µm | Aspect ratio ~5–10:1 | 15, 17 |
| Hybrid bond pitch | ~6–9 µm (SoIC), roadmap to ~1 µm | Cu-Cu, no solder | 17 |
| Substrate line/space | ~8–10 µm | mSAP on ABF | 16 |
| RDL line/space | ~2 µm (InFO), ~0.4 µm (CoWoS-R) | Fan-out | 17 |
| Top BEOL metal pitch | ~1–2 µm | Power distribution | 12 |
| Killer particle | ~20–30 nm | Anything larger than ~half the metal pitch | 13 |
| Tightest metal pitch | ~23–25 nm (N3/N2), 32 nm (Intel 18A) | M0/M1 | 12 |
| Contacted poly pitch | ~45–48 nm | Gate to gate | 11 |
| Physical gate length | ~12–16 nm | At 2 nm class | 11 |
| EUV wavelength | 13.5 nm | Tin plasma emission | 08 |
| Fin width | ~6 nm | FinFET nodes | 11 |
| Nanosheet thickness | ~5–8 nm | Three or four stacked | 11 |
| Barrier / liner | ~1–2 nm | TaN, Co, Ru | 12 |
| Gate dielectric (EOT) | ~0.8–1.0 nm | HfO₂ physically ~1.5–2 nm | 11 |
| Si lattice constant | 0.543 nm | Diamond cubic unit cell | 02 |
| Si–Si bond length | 0.235 nm | | 02 |
| Si atom (covalent diameter) | ~0.22 nm | Two atoms per lattice constant along <100> | 02 |

A useful way to hold this in mind: a Blackwell package is about 4 × 10⁶ metal pitches wide (90 mm / 23 nm). The ratio of the rack to the gate length is roughly the ratio of the Earth's diameter to a golf ball.

## Node Table

Numbers are compiled from foundry disclosures at IEDM/VLSI, WikiChip, TechInsights and SemiAnalysis teardowns, and the course's own Module 11 and Module 20. Values marked ~ are estimates; foundries stopped publishing pitches around the 7 nm generation. Density is for the high-density library at 100% utilization; real chips reach 50–70% of it. Wafer prices are list-price estimates as of ~2025.

| Marketing node | Foundry | HVM year | Transistor | CPP (nm) | Min MP (nm) | Fin/sheet pitch (nm) | Density (MTr/mm², HD) | Litho (EUV layers) | Approx. wafer price |
|---|---|---|---|---|---|---|---|---|---|
| 28 nm (28HPM) | TSMC | 2011 | Planar HKMG | ~117 | ~90 | n/a | ~12–15 | DUV ArFi, 0 EUV | ~$2.5–3k |
| 16 nm (N16) | TSMC | 2015 | FinFET | 90 | 64 | 48 | ~29 | DUV ArFi, LELE, 0 EUV | ~$4–5k |
| 10 nm (N10) | TSMC | 2017 | FinFET | 66 | 44 | 36 | ~52 | DUV SAQP, 0 EUV | ~$6k |
| 7 nm (N7) | TSMC | 2018 | FinFET | 57 | 40 | 30 | ~91 | DUV SAQP, 0 EUV (N7+: ~4) | ~$9–10k |
| 5 nm (N5 / N4) | TSMC | 2020 / 2022 | FinFET | 51 | 30 (M0 28) | 28 | ~138 measured / 171 claimed | ~14 EUV layers | ~$16–17k |
| 3 nm (N3E) | TSMC | 2023 | FinFET, FinFlex | 48 | 23 | 26 | ~200–215 | ~20+ EUV layers | ~$18–20k |
| 2 nm (N2) | TSMC | H2 2025 | Nanosheet GAA, NanoFlex | ~45 | ~23–25 | sheet | ~230–250 est. (some estimates run to ~313 for logic-only HD) | ~25+ EUV incl. EUV LELE on M0/vias | ~$30k |
| A16 (1.6 nm) | TSMC | late 2026 ready, volume 2027 | Nanosheet + Super Power Rail (backside) | ~45 | ~23 | sheet | ~250–270 est. | 0.33 NA EUV; backside litho | ~$30–35k est. |
| A14 | TSMC | ~2028 | Nanosheet, 2nd gen | ~40–42 est. | ~20 est. | sheet | ~1.2× N2 (claimed) | High-NA optional | n/a |
| Intel 7 | Intel | 2021 | FinFET | 54 (60 relaxed) | 40 (M0) | 34 | ~100 | DUV only | internal |
| Intel 4 | Intel | 2023 | FinFET | 50 | 30 | 30 | ~120–160 | first Intel EUV, ~10+ layers | internal |
| Intel 3 | Intel | 2024 | FinFET | 50 | 30 | 30 | ~1.1× Intel 4 | EUV | ~$15–18k est. (foundry) |
| Intel 18A | Intel | late 2025 (Panther Lake) | RibbonFET GAA + PowerVia | ~50 | 32 | sheet | ~200–240 est. | 0.33 NA EUV; High-NA in development | ~$20–25k est. |
| Intel 14A | Intel | ~2027 | RibbonFET 2nd gen + PowerDirect | ~45 est. | ~24–26 est. | sheet | ~1.15–1.2× 18A (claimed) | High-NA EUV planned | n/a |
| 7LPP | Samsung | 2018 | FinFET | 54 | 36 | 27 | ~95 | first EUV in HVM (~few layers) | ~$8–9k |
| 5LPE | Samsung | 2020 | FinFET | 54 | 36 | 27 | ~127 | EUV | ~$12–14k |
| 3GAE / SF3E | Samsung | 2022 | MBCFET nanosheet | ~45–48 | ~28 | sheet | ~150 (claimed 1.19× 5LPE) | EUV | ~$15–18k |
| SF3 (3GAP) | Samsung | 2024 | MBCFET | ~45 | ~28 | sheet | ~170 | EUV | ~$18–20k |
| SF2 | Samsung | 2025–26 | MBCFET 2nd gen | ~45 | ~28 | sheet | ~200–230 est. | EUV | ~$25k est. |
| N+2 ("7 nm class") | SMIC | 2023 | FinFET | ~57 | ~40 | ~30 | ~90 | DUV SAQP only (no EUV; export controls) | ~$10–12k est. |
| N+3 ("5 nm class") | SMIC | 2024–25 | FinFET | ~51–54 | ~30–36 | ~28 | ~120–130 est. | DUV multi-patterning, low yield | n/a |
| 2 nm | Rapidus | pilot 2025, HVM target 2027 | Nanosheet GAA (IBM-derived) | ~45 est. | ~24 est. | sheet | ~200+ target | EUV NXE:3800E | n/a |

Three things to notice. First, CPP has been essentially flat at 45–50 nm since N5 because it must fit a gate, two spacers, and a contact; remaining density comes from metal pitch, cell height (track reduction, backside power), and DTCO. Second, density gain per node has fallen from ~2× (N16 to N10 to N7) to ~1.15–1.3× (N3E to N2), while wafer price has risen ~1.5× per node, which is why cost per transistor has stopped falling at the leading edge. Third, the EUV layer count roughly doubles every two nodes, and each EUV layer costs 2–3× a DUV layer in tool time, so litho's share of wafer cost has grown from ~25% at N16 to ~35–40% at N2.

## Master Process Flow

This is the full sand-to-rack sequence at the granularity fab and packaging engineers use. Steps that repeat many times appear once with a note. Module 00 gave the same flow in ~60 steps; this version doubles the resolution, especially in the FEOL, MOL, BEOL, HBM, and CoWoS stages. The physical wafer's path runs from step 1 through step 122; the HBM branch (Stage K, steps 78–87) runs in parallel at a memory maker and merges at step 90, where the HBM stacks are placed on the interposer wafer alongside the GPU dies.

### Stage A: Design and masks (Modules 19, 04)

1. Architecture definition, microarchitecture, performance modelling. (19)
2. RTL design in Verilog/SystemVerilog; functional verification and emulation. (19)
3. Logic synthesis to standard cells from the foundry PDK library. (19)
4. Floorplanning, placement, clock-tree synthesis, routing. (19)
5. Static timing analysis, IR-drop and EM analysis, timing closure iterations. (19)
6. DRC, LVS, antenna, density checks; signoff. (19)
7. Tape-out: export GDSII/OASIS; foundry runs OPC/ILT and mask data preparation. (19, 04)
8. Mask blank fabrication: fused silica polished to sub-nm flatness; EUV blanks get 40 Mo/Si bilayers (Hoya, AGC). (04)
9. Mask writing by multi-beam e-beam (IMS, NuFlare), resist develop, absorber etch, clean. (04)
10. Mask inspection (actinic for EUV), repair, pellicle mounting; ship 70–100+ masks to the fab. (04)

### Stage B: Raw materials (Module 01)

11. Quartz mining and beneficiation; high-purity quartz for crucibles from Spruce Pine. (01)
12. Carbothermic reduction of quartz with carbon in a submerged-arc furnace at ~2,000 °C to MG-Si (~98–99%). (01)
13. Fluidized-bed hydrochlorination of MG-Si to trichlorosilane (TCS). (01)
14. Multi-stage fractional distillation of TCS to parts-per-trillion metal impurity levels. (01)
15. Siemens CVD: TCS + H₂ decompose on heated silicon rods at ~1,100 °C over ~3–5 days, growing 9N–11N polysilicon. (Alternative: FBR granular.) (01)
16. Rod harvesting, crushing in clean conditions, etching, packaging as chunks. (01)

### Stage C: Crystal growth (Module 02)

17. Charge loading: ~300–450 kg of polysilicon and dopant into a quartz crucible in a graphite susceptor. (02)
18. Melt-down under argon at ~1,420 °C; stabilization. (02)
19. Seed dip, Dash necking (~3 mm neck, fast pull to eliminate dislocations). (02)
20. Shoulder growth to 300+ mm diameter. (02)
21. Body growth at ~0.5–1.5 mm/min with counter-rotation, magnetic field (MCZ), and automatic diameter control; ~2 m body over ~30–40 h. (02)
22. Tail-off, cool-down, crucible discard. (02)
23. Ingot characterization: resistivity, oxygen, carbon, dislocation check (X-ray, etch pit). (02)

### Stage D: Wafering (Module 03)

24. Cropping crown and tail; cutting into ~400 mm sections. (03)
25. Cylindrical grinding to exact diameter; notch grinding along <110>. (03)
26. Diamond wire sawing into ~900 µm slices (~150 µm kerf loss). (03)
27. Edge rounding/profiling. (03)
28. Lapping or double-side grinding to remove saw damage. (03)
29. Alkaline or acid etch to remove residual damage. (03)
30. Double-side polish (DSP) to global flatness. (03)
31. Final single-side CMP of the front surface to < 0.1 nm RMS. (03)
32. RCA clean (SC-1, HF, SC-2), spin-rinse-dry. (03)
33. Optional epitaxial layer deposition (~2–5 µm p/p+ or p/p− epi). (03)
34. Inspection: flatness (SFQR), particles (laser scattering), metals (TXRF), thickness/TTV; laser-mark ID; pack in FOSB and ship. (03)

### Stage E: Fab entry and FEOL (Modules 05, 06, 07, 08, 09, 10, 11)

Repeated sub-steps: every patterned layer is [clean → deposit hard mask/anti-reflective coating → resist coat → expose (DUV or EUV) → PEB → develop → CD/overlay metrology → etch → strip → clean → inspection]. This litho-etch loop occurs ~70–100 times per wafer and is written once here.

35. Incoming wafer inspection; lot formation (25 wafers per FOUP); scribe laser mark. (05)
36. Pad oxide growth (~5–10 nm thermal) and pad nitride deposition (~80 nm LPCVD). (06)
37. Fin (or active) patterning: SAQP or EUV to define fins at ~26–30 nm pitch; fin cut. (07, 08)
38. Fin etch: anisotropic Si etch ~100–150 nm deep. (09)
39. STI fill with flowable CVD oxide; densification anneal; CMP to nitride. (06, 09)
40. STI recess etch to reveal fin height (~50 nm). Nanosheet nodes: prior to fin etch, epitaxial Si/SiGe superlattice (3–4 pairs, ~5–8 nm each) is grown at step 36 and the "fin" is the superlattice stack. (06, 11)
41. Well implants (n-well, p-well, deep well) with photoresist masks; Vt-adjust implants. (10)
42. Well anneal (RTA). (10)
43. Dummy gate stack: thin oxide, amorphous-Si dummy gate deposition, hard mask (SiN). (06)
44. Gate patterning at ~45–50 nm CPP (EUV or SADP); gate cut. (07, 08)
45. Dummy gate etch (high selectivity to STI and fins). (09)
46. Spacer deposition (ALD SiOCN/SiN, ~5 nm) and anisotropic spacer etch. Nanosheet nodes add inner-spacer formation: SiGe lateral recess then ALD fill and etch-back. (06, 09, 11)
47. S/D recess etch. (09)
48. S/D epitaxy: SiGe:B for PMOS, Si:P for NMOS, in-situ doped, selectively grown with masking of the other polarity. (06, 10)
49. Contact-etch-stop liner (SiN) and ILD0 (flowable oxide) deposition; CMP to expose dummy gate tops. (06)
50. Dummy gate removal (wet or dry, selective to spacers). Nanosheet nodes: channel release, removing SiGe between Si sheets with a highly selective etch. (09, 11)
51. Interfacial oxide (~0.5 nm chemical oxide); high-k HfO₂ by ALD (~1.5–2 nm); post-deposition anneal. (06, 11)
52. Work-function metal stack by ALD (TiN, TiAl, TaN, patterned separately for NMOS/PMOS); W or Co gate fill. (06, 11)
53. Gate CMP; gate recess; SAC nitride cap. (11)
54. Final activation / reliability anneals as required (laser or millisecond anneal). (10)

### Stage F: MOL (Modules 11, 12)

55. Trench contact patterning and etch to S/D epi (EUV); Ti/TiN liner; silicide (TiSi) formation; contact fill (W, Co, or Ru); CMP. (12)
56. Gate contact patterning and etch through SAC cap; fill; CMP. (12)
57. M0 (local interconnect): dielectric, EUV pattern (LELE at N2), etch, barrier/liner, fill, CMP. (12)
58. Via-0 patterning and fill. (12)

### Stage G: BEOL (Module 12)

Each metal level Mx (x = 1 to ~15–18) is a dual-damascene loop: [low-k dielectric deposition (PECVD SiOCH) → etch stop → hard mask (TiN) → via litho/etch → trench litho/etch → strip/clean → TaN barrier (PVD/ALD) → Co or Ru liner → Cu seed (PVD) → Cu electroplating with superfill → anneal → Cu CMP → cap (SiCN)]. Written once for the tight pitch levels and once for the upper levels.

59. M1 dual damascene at ~23–30 nm pitch (EUV, often LELE). (12)
60. M2–M4 dual damascene at 28–40 nm pitch (EUV single exposure). (12)
61. M5–M8 intermediate levels at ~48–80 nm pitch (DUV immersion, some SADP). (12)
62. M9–M14 semi-global levels at 80–300 nm pitch (DUV). (12)
63. M15–M17 global/power levels at ~1–2 µm pitch, thick Cu (DUV, KrF). (12)
64. Backside power (A16, Intel 18A only): bond front side to carrier, thin wafer to expose nano-TSVs or S/D backs, build backside contacts and 2–4 backside metal levels. (11, 12)
65. Top aluminum or thick Cu pad layer; pad etch. (12)
66. Passivation: SiN/oxide stack, polyimide; pad opening etch. (12)
67. WAT / parametric test on scribe-line structures. (13)
68. Wafer-level reliability screen (optional) and outgoing inspection. (13)

### Stage H: Wafer sort (Module 14)

69. Probe-card setup; sort at hot and cold temperatures with ATE (Advantest V93000). (14)
70. E-fuse programming: die ID, trims, repair (disable defective SMs or cache blocks). (14)
71. Inking / wafer map generation; binning; known-good-die list. (14)

### Stage I: Wafer-level bumping (Modules 16, 17)

72. Repassivation and UBM: sputter Ti/Cu, pattern, electroplate Cu pillar (~25–40 µm) with SnAg cap for microbumps (GPU dies going onto interposer). (16, 17)
73. Resist strip, seed etch, reflow, bump inspection (height, coplanarity). (16)
74. Bumped-wafer probe (optional re-test). (14)

### Stage J: Thinning and dicing of the logic die (Module 16)

75. Backgrind tape lamination; backgrind to target thickness (~100–200 µm for CoWoS top dies); stress-relief polish or dry etch. (16)
76. Mount on dicing tape/frame; laser groove low-k layers; blade or plasma dice. (16)
77. Die pick-and-place to trays; AOI of die edges. (16)

### Stage K: HBM manufacturing (parallel branch, Module 15)

78. DRAM wafer: full FEOL/BEOL on a 1β/1γ DRAM process (1T1C arrays, high-aspect capacitors; EUV on ~1–5 layers depending on maker, with Micron adopting EUV only at 1γ) at SK hynix, Samsung, or Micron. (15)
79. TSV formation: via-middle Bosch etch (~5–6 µm diameter, ~50 µm deep), oxide liner, TaN barrier, Cu fill, CMP. (15)
80. Front-side microbump formation on the DRAM wafer. (15)
81. Temporary bond to glass carrier; backgrind to ~30 µm; TSV reveal by grind + Si etch; backside passivation and bump. (15)
82. DRAM wafer probe: KGD determination. (14, 15)
83. Base (logic) die: fabricated at the memory maker (HBM3E) or at TSMC on N12/N5 (HBM4); bumped, thinned, probed. (15)
84. Dicing of DRAM and base dies. (15)
85. Stacking: TCB of 8/12/16 DRAM dies on the base die, either TC-NCF (film per layer) or MR-MUF (mass reflow then molded underfill); hybrid bonding for tallest stacks. (15)
86. Stack mold/underfill, grind to height (~720 µm for 12-high), stack test and burn-in, KGS (known good stack). (15, 18)
87. Ship HBM stacks (or DRAM KGD wafers) to the packaging site. (15)

### Stage L: CoWoS, chip-on-wafer (Module 17)

88. Interposer fabrication. CoWoS-S: 300 mm Si wafer, TSV etch and fill, 4–5 Cu RDL levels at 0.4–2 µm pitch on a 65 nm-class BEOL line. CoWoS-L: LSI bridge dies fabricated separately, then embedded in a molded organic RDL interposer with TIVs (through-interposer vias). (17)
89. Interposer front-side microbump formation. (17)
90. Chip-on-wafer: flux, place GPU dies and HBM stacks on the interposer wafer, TCB or mass reflow at ~40 µm pitch. (17)
91. Capillary underfill and cure between dies and interposer. (17)
92. Overmold or gap-fill; grind to expose die backs (for lidless or direct-cool designs). (17)
93. Temporary bond to carrier; interposer backgrind to ~100 µm; TSV reveal; backside C4 bump formation. (17)
94. CoW-level electrical test. (18)
95. Debond, dice interposer into individual CoW units. (17)

### Stage M: Substrate (Module 16)

96. Core: glass-epoxy laminate with Cu foil; mechanical/laser drill through-holes; plate. (16)
97. Build-up: laminate ABF, laser-drill microvias, desmear, electroless Cu seed, dry-film pattern, electroplate (mSAP), strip, flash etch; repeat for 8–12 layers per side. (16)
98. Solder mask, surface finish (ENEPIG), routing, electrical test, warpage measurement; ship (Ibiden, Unimicron, AT&S). (16)

### Stage N: CoWoS, wafer-on-substrate and package finish (Modules 16, 17, 18)

99. Flux, place CoW unit on substrate, C4 reflow or TCB. (17)
100. Underfill dispense and cure. (16, 17)
101. Stiffener ring / lid attach with TIM (indium or liquid metal); or lidless with bare-die cold plate. (16, 19)
102. BGA ball attach and reflow. (16)
103. Laser mark; AOI and X-ray inspection of joints. (16)
104. Package-level final test on ATE at multiple temperatures. (18)
105. Burn-in (temperature/voltage stress, hours). (18)
106. System-level test (SLT) running real workloads. (18)
107. Final binning (B200 vs B200A vs down-binned SKUs); tape-and-reel or tray; ship. (18)

### Stage O: Module, board, server, rack (Module 19)

108. SXM module PCB fabrication (HDI, 20+ layers) and SMT assembly of VRMs, capacitors. (19)
109. GPU package attach to SXM PCB (BGA reflow), thermal solution attach, module test. (19)
110. HGX baseboard fabrication and assembly: 8 SXM sockets and the NVLink Switch chips (4 on HGX H100, 2 on HGX B200), or the GB200 compute tray equivalent with 2 Grace CPUs and 4 Blackwell GPUs. (19)
111. Baseboard-level test: NVLink fabric, power delivery, thermal. (19)
112. Server/tray integration: CPU, DRAM DIMMs, NICs (ConnectX/BlueField), NVMe, PSUs or 48 V bus-bar interface, cold plates and manifolds. (19)
113. Server burn-in and system test. (19)
114. Rack integration (GB200 NVL72): 18 compute trays, 9 NVSwitch trays, NVLink spine cabling (~5,000 copper cables), liquid-cooling manifolds, power shelves. (19)
115. Rack-level test: full 72-GPU NVLink domain, leak test, thermal soak. (19)
116. Crate, ship to data center (rack ~1.4 t). (19)
117. Data-center installation: row placement, facility water (CDU) connection, 100+ kW power feed. (19)
118. Network fabric: InfiniBand or Ethernet scale-out (Quantum/Spectrum switches, optical transceivers). (19)
119. Bring-up, firmware, cluster validation, burn-in at scale. (19)
120. Production: model training or inference. (19)
121. Field monitoring: DPPM tracking, RMA analysis feeding back to fab and packaging yield engineering. (18, 13)
122. End of life: decommission, silicon and precious-metal recovery. (20)

## Who Buys From Whom

An adjacency list for the key companies. Arrows read "sells to." The list follows the chain from raw materials to the data center; a company's main customers are named where public, otherwise the customer class is given.

### Raw materials and wafers

- **Sibelco, The Quartz Corp** (high-purity quartz) → crucible makers (Shin-Etsu Quartz, Momentive/Heraeus, Ferrotec) → CZ pullers at wafer makers.
- **Ferroglobe, Elkem, Chinese MG-Si producers** → polysilicon makers (Wacker, Hemlock, Tokuyama, OCI, GCL, Tongwei).
- **Wacker, Hemlock, Tokuyama, REC Silicon** (electronic-grade polysilicon) → Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron.
- **Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron** (300 mm prime and epi wafers) → TSMC, Samsung, Intel, SK hynix, Micron, SMIC, all fabs. Shin-Etsu and SUMCO together hold ~55–60%.
- **Soitec** (SOI wafers) → GlobalFoundries, STMicro, Samsung; RF-SOI to Qualcomm/Skyworks via foundries.
- **Wolfspeed, Coherent (II-VI), SICC** (SiC substrates) → STMicro, Infineon, onsemi (power devices, not in the GPU chain).

### Fab consumables

- **JSR, Tokyo Ohka Kogyo, Shin-Etsu Chemical, Fujifilm, DuPont, Inpria (JSR)** (photoresists, EUV metal-oxide resists) → TSMC, Samsung, Intel, SK hynix, Micron.
- **Linde, Air Liquide, Air Products, Taiyo Nippon Sanso, SK Specialty, Merck (Versum), Entegris** (bulk and specialty gases, NF₃, WF₆, precursors) → all fabs.
- **Entegris** (FOUPs, filters, CMP consumables, precursors) → all fabs; **Shin-Etsu Polymer, Miraial** (FOUPs) → all fabs.
- **Fujimi, Resonac (Showa Denko), Entegris (CMC), DuPont** (CMP slurries, pads) → all fabs; Entegris absorbed CMC Materials (Cabot Microelectronics) in 2022, and DuPont's CMP pad and slurry business (the IC1000 pad line inherited from Rohm and Haas/Dow) now sits in Qnity Electronics, DuPont's electronics spin-off (November 2025).
- **JX Metals, Honeywell, Tosoh, Materion** (sputter targets) → all fabs.
- **Hoya, AGC** (mask blanks) → **Toppan Photomask, DNP, Photronics** and captive mask shops at TSMC, Samsung, Intel → fabs.
- **Mitsui Chemicals** (EUV pellicles, under ASML license), **ASML** (EUV pellicles) → TSMC, Samsung, Intel.
- **Corning** (ULE glass for EUV mask blanks and optics) → Hoya, AGC, Zeiss.

### Equipment

- **Zeiss SMT** (EUV/DUV optics), **Trumpf** (CO₂ drive lasers), **Cymer (ASML)** (EUV source, ArF lasers), **VDL, Berliner Glas (ASML)** (frames, wafer tables), **Gigaphoton** (ArF lasers, to ASML and Nikon) → **ASML**.
- **ASML** (EUV, DUV immersion, metrology) → TSMC (~40–50% of EUV shipments), Samsung, Intel, SK hynix, Micron; DUV to SMIC and others under export rules. **Nikon, Canon** (DUV, i-line) → memory makers, mature fabs.
- **Applied Materials** (PVD, CVD, epi, implant, CMP, etch, e-beam inspection) → all fabs; TSMC and Samsung are its largest customers.
- **Lam Research** (etch, ALD/CVD, plating, strip) → memory makers (SK hynix, Samsung, Micron, Kioxia) ~50%+; TSMC, Intel.
- **Tokyo Electron** (tracks, etch, furnaces, ALD, probers, cleaning) → all fabs; ~90% of coater/developers.
- **KLA** (inspection, metrology) → all fabs; TSMC is the largest customer.
- **ASM International** (ALD, epi) → TSMC, Intel, Samsung. **Kokusai** (batch furnaces, ALD) → memory makers. **SCREEN** (single-wafer clean, tracks) → all fabs. **Ebara** (CMP, pumps) → all fabs.
- **Axcelis** (ion implanters, esp. high-current and SiC) → fabs; **Applied** (Varian) leads in implant.
- **Advantest** (SoC/memory ATE, ~60%) → TSMC-ecosystem test houses (KYEC, ASE), NVIDIA, Samsung, SK hynix; **Teradyne** (~30%) → Apple ecosystem, Micron, Qualcomm.
- **FormFactor, Technoprobe, Micronics Japan (MJC)** (probe cards) → fabs and test houses; **DISCO** (dicing saws, grinders, ~70–80%) → OSATs, memory makers; **Besi, ASMPT, Hanmi** (die bonders, TCB, hybrid bonders) → TSMC, SK hynix, OSATs; **EV Group, SUSS** (wafer bonders) → memory makers, TSMC.
- **Naura, AMEC, SMEE, Piotech** (Chinese domestic etch, deposition, lithography) → SMIC, Hua Hong, YMTC, CXMT.
- **Daifuku, Murata Machinery** (AMHS) → all fabs. **Exyte, M+W, Jacobs** (fab construction) → TSMC, Samsung, Intel, Micron.

### Design and IP

- **Synopsys, Cadence, Siemens EDA** (tools) → NVIDIA, AMD, Apple, Broadcom, Qualcomm, all designers; also to TSMC/Samsung for PDK and OPC flows.
- **Arm** (CPU IP) → NVIDIA (Grace, Vera), Apple, Qualcomm, AWS, Ampere. **Synopsys, Cadence, Alphawave, Rambus** (PHY/interface IP: HBM, PCIe, UCIe, SerDes) → NVIDIA and other fabless.
- **TSMC** (PDK, design rules, reference flows) → its customers.

### Foundry and memory

- **TSMC** (wafers on N4/N3/N2; CoWoS/SoIC/InFO packaging) → NVIDIA (~$20B+ per year by 2025), Apple (largest customer at ~20–25% of revenue), AMD, Broadcom, Qualcomm, MediaTek, Marvell, Intel (some products), Google/AWS/Microsoft custom ASICs via Broadcom/Marvell/Alchip/GUC.
- **Samsung Foundry** (SF3/SF2 wafers) → Samsung LSI, Qualcomm (some), Google Tensor (historically), Tesla, crypto ASICs. **Intel Foundry** (18A) → Intel products, Microsoft, external test chips; **Intel packaging (EMIB/Foveros)** → Intel, AWS, external.
- **SMIC** (N+2/N+3) → Huawei HiSilicon and domestic Chinese fabless. **Rapidus** (2 nm, from 2027) → target Japanese and US customers. **GlobalFoundries, UMC** (mature nodes) → automotive, RF, analog customers.
- **SK hynix** (HBM3E/HBM4, ~50–60%) → NVIDIA (primary), AMD, Broadcom; **Micron** (HBM3E/HBM4) → NVIDIA, AMD; **Samsung** (HBM3E/HBM4) → AMD, Google, NVIDIA (qualification-dependent). Note that TSMC often takes delivery of HBM for CoWoS assembly on NVIDIA's account.
- **Kioxia, Western Digital/SanDisk, Samsung, SK hynix (Solidigm), Micron** (NAND) → SSD makers → server builders.

### Packaging, substrates, test

- **Ajinomoto** (ABF) → Ibiden, Unimicron, Shinko, AT&S, Kinsus, Nan Ya PCB, Samsung Electro-Mechanics. **Mitsubishi Gas Chemical, Hitachi Chemical (Resonac)** (core laminates BT/HDI) → substrate makers.
- **Ibiden, Unimicron, Shinko, AT&S, Kinsus, Nan Ya PCB, Samsung Electro-Mechanics** (build-up substrates) → TSMC (for CoWoS WoS), Intel, AMD, NVIDIA via TSMC/OSATs.
- **TSMC (CoWoS)** → NVIDIA; overflow CoW and WoS steps → **ASE/SPIL, Amkor** under TSMC qualification. **ASE, Amkor, JCET, PTI, Tongfu** (OSAT) → AMD, Qualcomm, MediaTek, NVIDIA (test and non-CoWoS parts).
- **KYEC, ASE, Amkor** (final test, burn-in, SLT services) → NVIDIA, MediaTek, AMD. **Sumitomo Bakelite, Resonac, Kyocera** (mold compounds), **Namics, Henkel** (underfills), **Indium Corp., Honeywell** (TIMs, indium) → OSATs and TSMC.
- **Resonac, Lintec, Nitto** (backgrind and dicing tapes) → OSATs, memory makers.

### System

- **NVIDIA** (GPU packages, SXM modules, HGX boards, NVSwitch, ConnectX/BlueField NICs, Spectrum/Quantum switches, reference designs) → ODMs and OEMs (Foxconn/Ingrasys, Quanta/QCT, Wistron/Wiwynn, Inventec, Supermicro, Dell, HPE, Lenovo) → hyperscalers (Microsoft, Google, Amazon, Meta, Oracle, xAI, CoreWeave) and enterprises.
- **Foxconn, Quanta, Wistron, Inventec** (SXM/HGX assembly, compute trays, NVL72 racks) ← buy from: **Unimicron, Ibiden, TTM, Gold Circuit (GCE), WUS** (HDI PCBs); **Monolithic Power Systems, Infineon, Renesas, Vicor, Delta** (VRMs, power stages, power shelves); **Vertiv, CoolIT, Asetek, Boyd, Auras, AVC** (cold plates, CDUs); **Amphenol, TE Connectivity, Molex** (NVLink spine connectors and cables); **Samsung, SK hynix, Micron** (LPDDR5X for Grace, DDR5 DIMMs); **Broadcom, Marvell, Coherent, InnoLight, Eoptolink** (optical transceivers and DSPs).
- **Vertiv, Schneider Electric, Eaton** (data-center power and cooling) → hyperscalers, colocation providers.

## What to Learn Next

### Books

- **Chris Mack, *Fundamental Principles of Optical Lithography* (Wiley, 2007).** The single best treatment of imaging, resist chemistry, and process windows; everything in Modules 07 and 08 sits on top of it. Mack's free lecture series on YouTube covers the same ground.
- **S. M. Sze and Kwok K. Ng, *Physics of Semiconductor Devices* (3rd ed., Wiley, 2006).** The reference for MOSFET operation, short-channel effects, and every device equation used in Module 11. Dense; read with Module 11 open.
- **Michael Quirk and Julian Serda, *Semiconductor Manufacturing Technology* (Prentice Hall, 2001).** Dated in specifics (200 mm era) but still the clearest walk through every unit process and the structure of a fab; good for Modules 05–10.
- **James Plummer, Michael Deal, Peter Griffin, *Silicon VLSI Technology: Fundamentals, Practice and Modeling* (Prentice Hall, 2000).** Deal-Grove, diffusion, implant, and process simulation with real derivations.
- **Chris Miller, *Chip War* (Scribner, 2022).** The history and geopolitics behind Module 20: how TSMC, ASML, and the export-control regime came to be.
- **Daniel Nenni and Paul McLellan, *Fabless: The Transformation of the Semiconductor Industry* (SemiWiki, 2014).** How the foundry/fabless split happened, from the people who watched it.
- **John Y. Chen, *CMOS Devices and Technology for VLSI*; and Yuan Taur and Tak Ning, *Fundamentals of Modern VLSI Devices* (Cambridge, 2nd ed. 2009).** Taur and Ning is the device-physics text used in most graduate courses.
- **Rao Tummala, *Fundamentals of Microsystems Packaging* (McGraw-Hill, 2001) and John Lau, *Semiconductor Advanced Packaging* (Springer, 2021).** Lau's books are the most current on CoWoS, hybrid bonding, and fan-out.
- **Peter van Zant, *Microchip Fabrication* (6th ed., McGraw-Hill, 2014).** Accessible entry-level fab text.
- **Vivek Bakshi (ed.), *EUV Lithography* (2nd ed., SPIE Press, 2018).** Source, optics, masks, resists from the people who built them.
- **Harry Levinson, *Principles of Lithography* (4th ed., SPIE Press, 2019).** Companion to Mack; strong on overlay, metrology, and practical process control.

### Sites, newsletters, and channels

- **SemiAnalysis** (Dylan Patel et al.): the deepest public coverage of CoWoS capacity, HBM, GPU cost breakdowns, and fab economics; paid tiers for the detailed models.
- **Asianometry** (YouTube, Jon Y): mechanism-level video explainers on nearly every stage covered in this course, with excellent history.
- **SemiWiki**: Daniel Nenni's community site; conference reports (IEDM, VLSI, SPIE), node analyses by Scotten Jones (IC Knowledge), and forum discussion.
- **TechInsights**: teardown-based node analyses and the measured pitch/density numbers cited in this course; the *Logic* reverse-engineering subscriptions and the *Chip Observer* market-data product.
- **Semiconductor Engineering** (semiengineering.com): daily technical journalism across manufacturing, packaging, test, and EDA; its Knowledge Center is a good glossary complement.
- **WikiChip** and *WikiChip Fuse*: process node tables (CPP, MP, cell heights) and microarchitecture pages.
- **Angstronomics**: occasional but very detailed process-node deep dives (e.g. the N5 density analysis referenced in Module 11).
- **Fabricated Knowledge** (Doug O'Laughlin), **Semiconductor Digest**, **EE Times**, **Tom's Hardware / AnandTech archives** (Anton Shilov's node coverage).
- **Chris Mack's lithoguru.com**: lectures, tutorials, and the "Lithography Expert" columns.
- **Company technical pages**: ASML product pages and annual reports; TSMC Technology Symposium summaries; Intel Foundry process briefs; Lam Research and Applied Materials blogs on etch and deposition; KLA's process-control tutorials; SK hynix Newsroom on HBM.

### Conferences and proceedings

- **IEEE IEDM** (International Electron Devices Meeting, December): where new nodes and devices are disclosed (N2, 18A, CFET, backside power).
- **VLSI Symposium on Technology and Circuits** (June): the other major process-disclosure venue.
- **IEEE ISSCC** (February): chip-level disclosures (Blackwell, HBM4 base dies).
- **SPIE Advanced Lithography + Patterning** (February): everything EUV, High-NA, resists, and stochastics.
- **IEEE ECTC** (Electronic Components and Technology Conference, May–June): packaging, hybrid bonding, CoWoS, HBM stacking.
- **IEEE International Test Conference (ITC)**: ATE, DFT, SLT.
- **IEEE IRPS**: reliability, electromigration, burn-in models.
- **SEMICON West / Taiwan / Japan**: equipment and materials; the SEMI WFE forecasts.
- **Hot Chips** (August): GPU and accelerator architecture presentations.

### Courses

- **MIT 6.012 / 6.720 (Microelectronic Devices and Circuits; Integrated Microelectronic Devices)** on MIT OpenCourseWare.
- **Stanford EE212 (Integrated Circuit Fabrication Processes)** and **EE216 (Principles and Models of Semiconductor Devices)**; Plummer's course notes accompany the Silicon VLSI Technology text.
- **Purdue nanoHUB-U**: *Fundamentals of Nanotransistors* (Mark Lundstrom) and *Nanoscale Transistors*; free, with device simulators.
- **Georgia Tech / Packaging Research Center** short courses on advanced packaging.
- **SEMI University** and **SEMI Standards** training for manufacturing and equipment.
- **Coursera / edX**: *Introduction to Semiconductor Devices 1 and 2* (KAIST), *Nanotechnology and Nanosensors* (Technion), *Digital VLSI Design* offerings; useful for the design side of Module 19.
- **Chris Mack's lithography lectures** (free, YouTube, ~30 lectures covering his book).
- **IEEE EDS Distinguished Lecturer recordings** and **SPIE short courses** attached to the conferences above.

## Key Numbers

| Quantity | Value | Notes |
|---|---|---|
| Wafer diameter / thickness / mass | 300 mm / 775 µm / ~127 g | Prime wafer as delivered |
| Si lattice constant / melting point | 0.543 nm / 1,414 °C | |
| Reticle field | 26 × 33 mm = 858 mm² (0.33 NA); 26 × 16.5 mm (High-NA) | Single-exposure limit |
| ArF / EUV wavelength | 193 nm / 13.5 nm | NA 1.35 / 0.33 and 0.55 |
| Rayleigh resolution, k1 limit | half-pitch = k1·λ/NA; k1 ≥ 0.25 | ~36 nm half-pitch (~76–80 nm pitch in practice) ArFi; ~10 nm half-pitch (~26 nm pitch in practice) 0.33 NA EUV; ~6 nm half-pitch (~16 nm pitch) High-NA |
| CPP / MP at N2 | ~45 nm / ~23–25 nm | Flat CPP since N5 |
| Gate length / nanosheet thickness / EOT | ~12–16 nm / ~5–8 nm / ~0.8–1.0 nm | 2 nm class |
| Density N7 / N5 / N3E / N2 (HD, MTr/mm²) | ~91 / ~138–171 / ~200–215 / ~230–250 (estimates up to ~313) | Real chips at 50–70% |
| Wafer price N7 / N5 / N3 / N2 | ~$10k / ~$16–17k / ~$18–20k / ~$30k | List-price estimates, ~2025 |
| Mask set cost, leading node | ~$20–30M | 70–100+ masks |
| Fab cost / capacity | $20–30B / ~100,000 wspm | Per GigaFab phase-set |
| Process steps / cycle time | 1,000–1,500 / ~90 days | Leading-edge logic |
| Little's law WIP | ~300,000 wafers | 100k wspm × 3 months |
| D0, mature vs ramp | ~0.05–0.1 vs ~0.5 /cm² | Killer defects |
| Poisson yield, 800 mm² die at D0 = 0.1 | e^(−8 × 0.1) ≈ 45% | Why big dies bin and repair |
| EUV tool price / throughput | ~$200M (NXE:3800E, ~220 wph); ~$380M (EXE:5200) | |
| EUV layers per node | N7+ ~4; N5 ~14; N3 ~20+; N2 ~25+ | Approximate |
| HBM die thickness / TSV diameter / microbump pitch | ~30 µm / ~5–10 µm / ~40 µm | HBM3E 12-high |
| Hybrid bond pitch | ~6–9 µm today; ~1 µm roadmap | SoIC |
| Blackwell package | 2 × ~800 mm² dies, 208 B transistors, 8 × HBM3E, CoWoS-L | |
| GB200 NVL72 rack | 72 GPUs, ~120–130 kW, ~1.4 t | Liquid cooled |
| Burn-in acceleration (Arrhenius) | AF ≈ 20–100× at 125 °C vs 55 °C for Ea 0.7 eV | |
| Rule of ten | Escape cost ×10 per stage | Test economics |

## Key Players

Master list of ~60 companies across the whole chain. Position is as of ~2025.

| Company | Country | Stage | What they supply | Position |
|---|---|---|---|---|
| Sibelco / The Quartz Corp | Belgium / Norway-France | Raw materials | High-purity quartz (Spruce Pine) | Dominant in crucible-grade HPQ |
| Ferroglobe | Spain-UK | Raw materials | Metallurgical-grade silicon | Largest non-Chinese MG-Si |
| Elkem | Norway | Raw materials | MG-Si, silicones | Top 3 non-Chinese |
| Wacker Chemie | Germany | Raw materials | Electronic-grade polysilicon | #1 electronic grade outside China |
| Hemlock Semiconductor | USA | Raw materials | Electronic-grade polysilicon | Top 3 electronic grade |
| Tokuyama | Japan | Raw materials | Electronic-grade polysilicon | Top 3 electronic grade |
| Shin-Etsu Chemical | Japan | Wafers, materials | 300 mm wafers, photoresist, quartz, mask blanks | #1 wafers (~30%) |
| SUMCO | Japan | Wafers | 300 mm wafers | #2 wafers (~25%) |
| GlobalWafers | Taiwan | Wafers | 300 mm wafers, SOI | #3 wafers |
| Siltronic | Germany | Wafers | 300 mm wafers | #4 wafers |
| SK Siltron | Korea | Wafers | 300 mm wafers | #5 wafers |
| Soitec | France | Wafers | SOI wafers (Smart Cut) | Leader in SOI |
| JSR (incl. Inpria) | Japan | Materials | Photoresists incl. EUV CAR and metal-oxide | Top 3 resist; leader in MOR |
| Tokyo Ohka Kogyo (TOK) | Japan | Materials | Photoresists, EUV | Top 3 resist |
| Fujifilm Electronic Materials | Japan | Materials | Resists, CMP slurry, cleans | Top 5 resist |
| Hoya | Japan | Materials | Mask blanks incl. EUV | #1 EUV blanks |
| AGC | Japan | Materials | Mask blanks incl. EUV, glass | #2 EUV blanks |
| Toppan Photomask / DNP / Photronics | Japan / Japan / USA | Materials | Merchant photomasks | Top 3 merchant mask shops |
| Linde / Air Liquide / Air Products | Ireland-UK / France / USA | Materials | Bulk and specialty gases | Top 3 gases |
| Entegris | USA | Materials | FOUPs, filters, precursors, CMP consumables | Leader in contamination control |
| Fujimi / Resonac | Japan | Materials | CMP slurries, tapes, mold compounds | Leaders in slurry / packaging materials |
| JX Metals | Japan | Materials | Sputter targets | ~50–60% of targets |
| Ajinomoto | Japan | Materials | ABF build-up film | ~100% |
| Corning | USA | Materials | ULE glass for EUV optics and mask blanks | Sole source for ULE |
| ASML | Netherlands | Equipment | EUV, DUV immersion, metrology | Sole EUV; ~80–90% DUV immersion |
| Zeiss SMT | Germany | Equipment (sub-tier) | EUV/DUV projection optics | Sole supplier to ASML |
| Trumpf | Germany | Equipment (sub-tier) | CO₂ drive lasers for EUV | Sole supplier to ASML |
| Applied Materials | USA | Equipment | PVD, CVD, epi, implant, CMP, etch, inspection | #1 WFE vendor |
| Lam Research | USA | Equipment | Etch, deposition, plating | #1–2 in etch |
| Tokyo Electron | Japan | Equipment | Tracks, etch, furnaces, cleaning, probers | ~90% of tracks; #3–4 WFE |
| KLA | USA | Equipment | Inspection and metrology | ~50–60% of process control |
| ASM International | Netherlands | Equipment | ALD, epitaxy | #1 in single-wafer ALD |
| SCREEN | Japan | Equipment | Single-wafer clean, tracks | #1 in wet clean |
| Ebara | Japan | Equipment | CMP, vacuum pumps | #2 CMP; #1 dry pumps |
| Axcelis | USA | Equipment | Ion implanters | #2 implant (behind Applied) |
| Nikon / Canon | Japan | Equipment | DUV / i-line scanners, nanoimprint | #2 / #3 litho |
| Advantest | Japan | Test | ATE (V93000) | ~60% of ATE |
| Teradyne | USA | Test | ATE (UltraFLEX) | ~30% of ATE |
| FormFactor | USA | Test | Probe cards | #1 probe cards |
| DISCO | Japan | Packaging equipment | Dicing saws, grinders, laser dicers | ~70–80% |
| Besi | Netherlands | Packaging equipment | Die bonders, hybrid bonders | Leader in hybrid bonding tools |
| Hanmi Semiconductor | Korea | Packaging equipment | TCB bonders for HBM | Leader in HBM TCB |
| Naura / AMEC / SMEE | China | Equipment | Domestic etch, deposition, DUV litho | Rising under export controls |
| Synopsys | USA | Design | EDA, IP | #1 EDA |
| Cadence | USA | Design | EDA, IP | #2 EDA |
| Siemens EDA | Germany-USA | Design | EDA (Calibre DRC/LVS) | #3 EDA; leader in signoff |
| Arm | UK | Design | CPU IP (Grace, Vera) | Dominant CPU IP |
| TSMC | Taiwan | Foundry, packaging | N4/N3/N2/A16 wafers; CoWoS, SoIC, InFO | >90% of leading-edge logic; ~65–70% foundry revenue |
| Samsung Electronics | Korea | Foundry, memory | SF3/SF2 wafers; DRAM, NAND, HBM | #2 foundry; #1–2 DRAM revenue (traded the lead with SK hynix through 2025); #1 NAND |
| Intel / Intel Foundry | USA | IDM, foundry | 18A/14A wafers; EMIB, Foveros | #3 leading edge; first High-NA user |
| SMIC | China | Foundry | N+2/N+3 (7/5 nm class, DUV only) | Largest Chinese foundry |
| Rapidus | Japan | Foundry | 2 nm GAA (HVM target 2027) | New entrant |
| GlobalFoundries / UMC | USA / Taiwan | Foundry | Mature and specialty nodes | #3–4 foundries by revenue |
| SK hynix | Korea | Memory | DRAM, NAND, HBM3E/HBM4 | #1 HBM (~50–60%); #1–2 DRAM revenue |
| Micron | USA | Memory | DRAM, NAND, HBM3E/HBM4 | #3 DRAM; ~20%+ HBM |
| Kioxia | Japan | Memory | NAND | #2–3 NAND |
| Ibiden | Japan | Packaging | Build-up substrates | #1 high-end substrates |
| Unimicron | Taiwan | Packaging | Build-up substrates, HDI PCBs | #2 high-end substrates |
| Shinko / AT&S | Japan / Austria | Packaging | Build-up substrates | Top 5 substrates |
| ASE (incl. SPIL) | Taiwan | OSAT | Assembly, test, CoWoS overflow | #1 OSAT |
| Amkor | USA | OSAT | Assembly, test, 2.5D | #2 OSAT |
| JCET | China | OSAT | Assembly, test | #3 OSAT |
| KYEC | Taiwan | Test services | Final test, burn-in for NVIDIA-class parts | Leading Taiwan test house |
| NVIDIA | USA | Fabless, system | GPUs, NVLink/NVSwitch, NICs, HGX, NVL72 designs | ~80%+ of AI accelerators |
| AMD | USA | Fabless | MI300/MI350 GPUs, EPYC CPUs | #2 merchant AI accelerators |
| Broadcom / Marvell | USA | Fabless | Custom AI ASICs, networking, SerDes | Leaders in custom ASIC |
| Apple / Qualcomm / MediaTek | USA / USA / Taiwan | Fabless | SoCs; largest TSMC customers by wafer volume | Top TSMC customers |
| Foxconn (Hon Hai / Ingrasys) | Taiwan | System | SXM/HGX assembly, servers, NVL72 racks | #1 NVIDIA system builder |
| Quanta (QCT) / Wistron (Wiwynn) / Inventec | Taiwan | System | HGX boards, servers, racks | Top NVIDIA ODMs |
| Supermicro / Dell / HPE | USA | System | AI servers and racks | Leading OEMs |
| Monolithic Power Systems / Infineon / Vicor | USA / Germany / USA | System | VRMs, power stages, 48 V conversion | Leaders in GPU power delivery |
| Vertiv / CoolIT / Asetek | USA / Canada / Denmark | System | Liquid cooling, CDUs, cold plates | Leaders in rack cooling |
| Amphenol / TE Connectivity | USA / Switzerland | System | NVLink spine cables, connectors | Leaders in high-speed interconnect |
| Microsoft / Google / Amazon / Meta / Oracle / CoreWeave | USA | End customer | Hyperscale data centers | Largest GPU buyers |

## Where This Fits in the Supply Chain

This module has no inputs or outputs of its own; it is the index to everything that does. Module 20 closed the course by putting prices, market shares, and geopolitical exposure on the chain that Modules 01 through 19 built step by step, and this reference collects the vocabulary those modules introduced (the Glossary), the numbers they quoted (the Key Numbers table and the node table), the ordering they followed (the Master Process Flow, which begins with the quartz of Module 01 and ends with the rack of Module 19), and the commercial relationships that tie the ~60 companies together (Who Buys From Whom and the master Key Players table). When a term or figure in any earlier module is unclear, this is the place to look it up; when the course is finished, the What to Learn Next section is the path forward into the primary literature, the conferences where nodes are disclosed, and the analysts who track the chain in real time.
