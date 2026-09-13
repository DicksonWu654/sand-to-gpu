# Sand to GPU: The Complete Semiconductor Supply Chain — Curriculum

PART I — RAW MATERIALS & WAFERS
00  Overview: the whole supply chain on one page (map, stages, money flow, why it is the most complex thing humans make)
01  Sand to Polysilicon: quartz mining, carbothermic reduction (MG-Si), Siemens process (TCS distillation, CVD rods), FBR granular, purity (9N–11N), companies
02  Crystal Growth: Czochralski in full detail (crucible, melt, seed, Dash neck, shoulder, body, tail, pull rate, rotation, MCZ, oxygen/carbon, dopants, defects/voids/COPs), Float Zone, 300mm vs 450mm, ingot economics
03  From Ingot to Polished Wafer: cropping, grinding, notch, diamond wire sawing, lapping, edge rounding, etch, double-side polish, CMP, RCA cleaning, flatness/SFQR specs, thickness (775 µm), inspection, epitaxial wafers, SOI (Smart Cut), wafer market (Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron)
04  Beyond Silicon & Fab Consumables: SiGe/strained Si, SiC, GaN, GaAs, InP; photoresists, specialty gases (NF3, WF6, neon, He), wet chemicals, ultrapure water, CMP slurries/pads, sputter targets, quartzware, photomask blanks & mask making (Hoya, AGC, mask writers, OPC, pellicles)

PART II — THE FRONT END (THE FAB)
05  Inside a Leading-Edge Fab: cleanroom classes, airflow, FOUPs, AMHS/OHT, tool layout, ~1000+ process steps, cycle time, lots, wafer starts, cost ($20–30B), staffing, TSMC fab organization (GIGAFAB), Fab 18/20/21 Arizona
06  Thermal Oxidation & Thin-Film Deposition: dry/wet oxidation (Deal-Grove), furnaces, RTP, CVD (LPCVD/PECVD/SACVD), ALD (self-limiting half reactions), PVD/sputtering, epitaxy (SiGe S/D), key films and tools (AMAT, Lam, TEL, ASM)
07  Photolithography I — Resist & DUV: photoresist chemistry (novolac/DNQ, chemically amplified resists, PAGs, quenchers), track (coat, bake, develop), Rayleigh criterion, KrF/ArF, immersion, NA 1.35, OPC, phase-shift masks, multi-patterning (LELE, SADP, SAQP), overlay, TEL/SCREEN tracks
08  Photolithography II — EUV in Full Detail: why 13.5 nm, LPP source (Trumpf CO2 drive laser, tin droplet generator, pre-pulse/main pulse, ~50 kHz), collector, Mo/Si multilayer mirrors, reflective reticle, vacuum/hydrogen, source power (250→600 W), stochastics, EUV resists (CAR vs metal-oxide), pellicles, NXE:3600D/3800E throughput, High-NA EXE:5000/5200 (anamorphic 0.55 NA, half-field), ASML supply chain (Zeiss, Trumpf, Cymer, VDL), cost (~$200M / ~$380M), export controls
09  Etch: wet vs dry, plasma basics, RIE/CCP/ICP, ion vs radical, anisotropy, selectivity, passivation (Bosch), high-aspect-ratio etch for 3D NAND, atomic layer etching, endpoint detection, Lam/TEL/AMAT tools
10  Doping: ion implantation (sources, extraction, mass analysis, acceleration, beam scanning, channeling, dose/energy, damage), annealing (furnace, RTA, spike, laser/flash), diffusion, activation, in-situ doped epi, Axcelis/AMAT
11  Building a Transistor — Planar to FinFET to GAA to CFET: MOSFET operation, short-channel effects, HKMG, gate-last/RMG, strain engineering, FinFET geometry, nanosheet GAA (TSMC N2, Samsung 3GAE, Intel 18A RibbonFET), backside power (PowerVia, TSMC A16 SPR), CFET roadmap, node naming reality (what "2 nm" actually means), full FEOL/MOL flow walk-through
12  Interconnect (BEOL): why copper, dual damascene step by step (dielectric dep, etch, barrier TaN, seed, electroplating, CMP), low-k, airgaps, Co/Ru/Mo, vias, ~15–18 metal layers, RC delay, EM, backside power delivery, contacts/MOL
13  Metrology, Inspection & Yield: ellipsometry, CD-SEM, scatterometry/OCD, overlay, bright-field/e-beam inspection, defect classification, KLA dominance, SPC, yield models (Poisson, Murphy, negative binomial), defect density D0, die-size vs yield, wafer maps, parametric test, learning curves
14  Wafer Sort & Test: probe cards (FormFactor), ATE (Advantest, Teradyne), test time economics, binning, e-fuses, known-good-die, DFT/scan/BIST

PART III — MEMORY
15  Memory — DRAM, NAND, and HBM Manufacturing: DRAM cell (1T1C, capacitor over bitline, high-aspect capacitors), 1α/1β/1γ nodes, EUV in DRAM; 3D NAND (channel hole etch, 200–300+ layers, string stacking, charge-trap); HBM in detail (TSV formation, wafer thinning to ~30 µm, microbumps, TC-NCF vs MR-MUF, hybrid bonding for HBM4, 12-/16-high stacks, base die on logic process); SK hynix/Samsung/Micron

PART IV — THE BACK END (PACKAGING, TEST, SYSTEM)
16  Packaging Fundamentals: backgrinding, dicing (blade, laser stealth, plasma), die attach, wire bonding, flip-chip (C4 solder bumps, UBM), underfill, substrates (build-up, ABF from Ajinomoto, core, Ibiden/Unimicron), leadframes, molding, BGA/LGA, reflow, OSATs (ASE, Amkor, JCET)
17  Advanced Packaging — CoWoS, SoIC, Chiplets: 2.5D interposers (CoWoS-S/-R/-L, LSI bridges), TSV fabrication in interposer, microbumps (~40 µm pitch), chip-on-wafer then wafer-on-substrate, hybrid bonding (SoIC, sub-10 µm pitch, Cu-Cu), Foveros/EMIB, InFO, panel-level, UCIe, CoWoS capacity as the AI bottleneck, warpage/thermal challenges
18  Final Test, Burn-in, and System-Level Test: package test, burn-in, SLT, HBM KGD, yield fallout at each stage, test cost
19  Building an NVIDIA GPU — from RTL to Rack: chip design flow (architecture, RTL, EDA — Synopsys/Cadence, synthesis, place & route, timing closure, DRC/LVS, PDK, standard cells, tape-out, GDS/OASIS, mask set ~$20–30M); H100 (TSMC 4N, 80B transistors, 814 mm², reticle limit ~858 mm², 5 HBM3 on CoWoS-S) and Blackwell B200 (two ~800 mm² dies, 10 TB/s NV-HBI, CoWoS-L, 8×HBM3E, 208B transistors), Blackwell Ultra / Rubin & HBM4 on CoWoS-L; SXM module, HGX baseboard, NVSwitch, DGX / GB200 NVL72 rack (72 GPUs, NVLink spine, liquid cooling), ODMs (Foxconn, Quanta, Wistron), who makes PCBs/VRMs/optics, lead times and cost breakdown

PART V — THE ECOSYSTEM
20  Economics, Geography & Geopolitics of the Chain: equipment oligopoly (ASML, AMAT, Lam, TEL, KLA), materials (Japan), foundries (TSMC ~90% leading edge, Samsung, Intel Foundry, SMIC), fabless/IDM, fab cost curves, wafer prices by node, cost per transistor, Moore's law status, Taiwan concentration risk, export controls (Oct 2022, 2023, 2024 rules; SMIC 7nm/5nm), CHIPS Act, Japan/Rapidus, EU Chips Act, China's push (SMEE, Naura, AMEC), what a single disruption would do
21  Glossary & Reference: 150+ terms, unit conventions, node table (node → year → pitch → transistor density), a full ordered process-flow list (from sand to rack), and "what to learn next"
