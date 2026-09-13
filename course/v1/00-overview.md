# Module 00: The Whole Supply Chain on One Page

A single NVIDIA Blackwell GPU package contains two dies of roughly 800 mm² each, about 208 billion transistors, eight stacks of high-bandwidth memory, and a silicon-and-organic substrate that took more than a dozen companies on three continents to build. The silicon in it was quartz in a mine in Norway, Brazil, or North Carolina roughly a year before the GPU booted. In between, the material passed through something like 1,500 discrete process steps, a mask set that cost tens of millions of dollars, machines that individually sell for $200–400 million, and a fab that cost more than an aircraft carrier. No single person understands every step at the level of the engineers who own it. That is the problem this module solves: you need a map of the whole territory before you walk any part of it, so that when Module 08 spends 7,000 words on tin droplets you know exactly why they matter and where they sit.

The chain is hard for one reason that recurs at every stage: the tolerances are absurd relative to the scale of production. A leading-edge fab must place features a few tens of atoms wide, across a 300 mm wafer, aligned to previous layers within about 2 nanometers, and repeat that on more than 100,000 wafers a month with defect densities below 0.1 per square centimeter. Every stage in this module is a place where the industry solved that problem once, expensively, and then a small number of firms became the only ones who could do it. Keep that thought; the last third of this module is about what those firms are and why they cannot be replaced quickly.

## The Chain in One Table

Read the table top to bottom once, then come back to it whenever a later module feels disconnected. The costs are for the AI-accelerator path (leading-edge logic plus **HBM**, High Bandwidth Memory, in a 2.5D package). Costs and times are approximate and as of ~2025–2026; a "~" means an order-of-magnitude figure, not a quote.

| # | Stage | Input | Output | Who does it | Rough cost / value | Time | Where |
|---|---|---|---|---|---|---|---|
| 1 | Quartz mining | Quartzite / vein quartz ore | Lump quartz (>98% SiO2) | Sibelco, The Quartz Corp, Chinese and Brazilian miners | ~$50–150 per tonne (metallurgical); ~$5,000–10,000/t for high-purity crucible quartz | Days | Norway, Brazil, China, Spruce Pine NC |
| 2 | Carbothermic reduction | Quartz + coal/charcoal/wood chips | **Metallurgical-grade silicon** (MG-Si, 98–99%) | Ferroglobe, Elkem, Chinese smelters (~80–85% of world supply) | ~$2–3/kg | Hours per tap; continuous | China, Norway, Brazil, USA |
| 3 | Polysilicon | MG-Si + HCl → trichlorosilane → CVD | Electronic-grade polysilicon (9N–11N) | Wacker, Hemlock, Tokuyama, OCI; solar-grade: GCL, Tongwei, Daqo | ~$20–40/kg electronic grade (solar-grade fell to ~$5/kg in 2024–25) | ~1 week per batch incl. distillation | Germany, USA, Japan, Korea, Malaysia, China |
| 4 | Crystal growth | Polysilicon chunks + dopant | Single-crystal **ingot**, 300 mm dia., ~2 m long, ~300–450 kg | Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron (in-house) | Ingot value ~$100–200k | ~2.5–3.5 days per crystal (melt, seed, pull, cool) | Japan, Taiwan, Germany, Korea, USA |
| 5 | Wafering | Ingot | Polished prime wafer, 300 mm, 775 µm thick | Same five firms (~90% of 300 mm) | ~$100–150 polished; ~$200–300 epi | ~2–3 weeks | Same |
| 6 | Wafer fab (front end) | Bare wafers + ~70–100+ masks + gases, chemicals, resists | Patterned wafer with ~15–18 metal layers | TSMC, Samsung, Intel Foundry (leading edge); GlobalFoundries, UMC, SMIC (mature) | N4 ~$16–17k; N3 ~$18–20k; N2 ~$30k per wafer | ~3 months (12–14 weeks) | Taiwan (~90% of leading edge), Korea, USA, Japan, Ireland, Israel |
| 7 | Wafer sort | Finished wafer | Wafer map of good/bad die, bins | Fab or test OSAT (KYEC), on Advantest / Teradyne testers | ~$1–5 per die for large logic | Hours per wafer | Co-located with fab |
| 8 | Bumping + thinning + dicing | Sorted wafer | Singulated, bumped known-good die | Fab (TSMC) or OSAT (ASE, Amkor); DISCO tools | ~$50–200 per wafer | Days | Taiwan, Korea, China, Malaysia |
| 9 | HBM manufacturing | DRAM wafers with TSVs | 8-, 12-, 16-high stacks, 24–48 GB each | SK hynix (~50–60% share), Samsung, Micron | ~$200–700 per stack depending on generation and height; ~$15–20/GB (estimates vary) | DRAM fab ~2–3 months + ~1 week stacking/test | Korea, Taiwan and Japan (Micron), Singapore/USA (Micron, ramping) |
| 10 | Advanced packaging | GPU die + HBM + interposer/bridges + substrate | 2.5D package (**CoWoS**, Chip-on-Wafer-on-Substrate) | TSMC (~90%+ of CoWoS-class), ASE/SPIL, Amkor (overflow); substrates from Ibiden, Unimicron | ~$500–1,000 per package incl. substrate | ~2–4 weeks | Taiwan (Longtan, Chunan, Taichung, Chiayi, Tainan, Kaohsiung), Arizona (Amkor, production from ~2028) |
| 11 | Final test + burn-in + SLT | Packaged part | Binned, speed-graded GPU | Fab/OSAT/test house (KYEC, ASE), Advantest V93000 | ~$20–100+ per high-end part | Hours to days | Taiwan |
| 12 | Module / board | GPU package + VRMs + PCB | SXM module; HGX baseboard or GB200 "Bianca" compute board | Foxconn, Quanta, Wistron, Inventec; PCBs from Unimicron, TTM, WUS | HGX 8-GPU baseboard ~$200–300k at list | ~1–2 weeks | Taiwan, Mexico, USA, China |
| 13 | Server / tray | Board + CPUs + DRAM + NICs + storage | DGX/HGX server or NVL72 compute tray | Same ODMs; Dell, HPE, Supermicro as OEMs | DGX H100 ~$300–400k; GB200 tray >$500k | ~1–2 weeks | Taiwan, Mexico, USA |
| 14 | Rack | 18 compute trays + 9 switch trays + spine + power | GB200/GB300 NVL72 rack, ~120–140 kW | Foxconn, Quanta, Wistron; NVIDIA reference design | ~$3–4M per NVL72 rack | Weeks incl. burn-in | Taiwan, Mexico, USA |
| 15 | Data center | Racks + power + cooling + network | AI cluster (10k–1M+ GPUs) | Hyperscalers, neoclouds, xAI/OpenAI-class builders | ~$30–50M per MW all-in; ~$10B+ per 100k-GPU cluster | 12–24 months to build | USA (Texas, Virginia, Arizona), Gulf, Nordics, everywhere |

Two orientation facts before we walk the stages. First, the value concentrates at the end: quartz worth a few cents ends up as a wafer worth ~$150, which becomes a processed wafer worth ~$17,000, which yields packaged GPUs sold for roughly $1–2 million per wafer's worth of die. Second, the elapsed time is dominated by the fab: of the roughly 6–9 months from polysilicon to a shipping server, about three are inside the wafer fab and another one to two inside packaging and test. Everything after the wafer is fast; everything before it is cheap.

## Stage by Stage

### Quartz to metallurgical-grade silicon

Silicon is 28% of the earth's crust, so the raw material is not scarce; the *pure* raw material is. Smelters charge lump quartz (typically 10–100 mm pieces, >98% SiO2, low in iron, aluminum, boron, and phosphorus) together with carbon (coal, petroleum coke, charcoal, wood chips) into a **submerged arc furnace** running at ~2,000 °C at the electrode tips. The net reaction SiO2 + 2C → Si + 2CO produces liquid silicon that is tapped from the furnace bottom, and each tonne of silicon consumes ~11–13 MWh of electricity, which is why smelters sit next to cheap hydro (Norway, Quebec, Brazil) or coal (Yunnan, Xinjiang). The product, MG-Si at 98–99% purity, costs $2–3 per kilogram, and around 80–85% of the world's ~4.6 million tonnes per year (USGS, 2024) comes from China. Roughly 40% of MG-Si goes to aluminum alloys and ~25% to silicones; about a third is refined further into polysilicon, almost all of it for solar (the solar boom lifted this share from ~10–15% a decade ago), and only a small fraction of that reaches electronic grade.

A separate, much smaller quartz stream matters just as much: the **high-purity quartz** (HPQ) used to make the crucibles in which silicon crystals are grown. The best deposits, at Spruce Pine, North Carolina (Sibelco and The Quartz Corp), supply most of the inner-layer crucible quartz on earth; Hurricane Helene shutting those mines for a few weeks in 2024 was a reminder that the chain has obscure single points of failure well before any chip is made.

### Polysilicon: 99% to 99.999999999%

Electronic-grade silicon must be roughly 9N–11N pure (99.9999999% to 99.999999999%), a billion-to-one improvement over MG-Si. The workhorse route is the **Siemens process**: MG-Si powder is reacted with HCl at ~300 °C in a fluidized bed to make **trichlorosilane** (TCS, SiHCl3), a liquid that boils at 32 °C. Because TCS is a liquid, it can be purified by fractional distillation, repeated through many columns until metal chlorides, boron, and phosphorus are at parts-per-trillion levels. The purified TCS is then decomposed with hydrogen onto electrically heated silicon "U-rods" at ~1,100 °C in a bell-jar reactor, growing polysilicon rods over 3–5 days to ~150–200 mm diameter. The alternative **fluidized bed reactor** (FBR) route decomposes silane (SiH4) onto silicon seed granules and produces free-flowing beads that are convenient for crucible charging. Wacker (Germany and USA), Hemlock (USA), Tokuyama (Japan), and OCI (Korea, with a Malaysian electronic-grade line from 2026) dominate electronic grade; Chinese producers (GCL, Tongwei, Daqo) dominate the far larger solar-grade market, where oversupply pushed prices below $5/kg in 2024–2025. Electronic grade sells for on the order of $20–40/kg, and a 300 mm ingot needs ~350–450 kg of it. Module 01 covers all of this at mechanism level.

### Crystal growth: the Czochralski puller

Polysilicon is polycrystalline; a transistor needs a single crystal with a known lattice orientation. The **Czochralski (CZ) process** melts ~400 kg of polysilicon plus a few milligrams of dopant (boron for p-type, phosphorus or arsenic for n-type) in a quartz crucible inside a graphite susceptor, under argon at ~1,420 °C (silicon melts at 1,414 °C). A small seed crystal is dipped in and slowly withdrawn while rotating; the melt freezes onto it in the seed's orientation. The operator first pulls a thin "Dash neck" a few millimeters in diameter to shed dislocations, then flares the crystal out to 300 mm plus a few mm of grinding allowance, then pulls the body at ~0.5–1 mm/min. A 2 m body therefore takes ~40–60 hours; with melt-down, seeding, tailing, and cooldown the cycle is ~2.5–3.5 days per crystal. Magnetic fields (**MCZ**) damp melt convection to control oxygen incorporation from the dissolving quartz crucible, which is why crucible quartz purity matters so much. The crucible is destroyed every run. Module 02 covers the thermodynamics, the defect physics (vacancies, interstitials, COPs), and why 450 mm never happened.

### Wafering: from ingot to a 775 µm mirror

The ingot is cropped, ground to exactly 300 mm, given a notch for orientation, and sliced by a **diamond-wire multi-wire saw** in which a single ~100 km wire loops through the ingot thousands of times, producing ~1,500–2,000 wafers per ingot with ~150 µm kerf loss per cut. Each wafer is then lapped or ground flat, edge-profiled, chemically etched to remove saw damage, double-side polished, and given a final chemical-mechanical polish (**CMP**) on the front side to sub-nanometer roughness. Cleaning follows the RCA sequence (SC-1 ammonia/peroxide for particles, SC-2 HCl/peroxide for metals). The spec that matters most to the fab is local flatness (SFQR, typically <20–30 nm over a 26 × 8 mm site) because EUV lithography has a depth of focus of tens of nanometers. Many logic wafers get an additional **epitaxial** layer (a few µm of ultra-pure silicon grown by CVD) to bury crystal defects and provide a controlled doping profile. Five companies (Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron) supply ~90% of 300 mm wafers, and a polished prime wafer costs ~$100–150. Module 03 walks the full sequence; Module 04 covers the SOI and compound-semiconductor variants plus every consumable the fab will now burn through.

### The wafer fab: three months and a thousand steps

This is where $150 becomes $17,000. A leading-edge fab is a ~$20–30 billion building (TSMC's Fab 18 in Tainan, Intel's Ohio site, Samsung Taylor) that runs 100,000+ **wafer starts per month** (wpm) through ~1,000–1,500 process steps organized around ~70–100+ photomask layers. The rule of thumb is ~1.3–1.5 days of cycle time per mask layer, which is where the ~3-month cycle time comes from: each layer means a lithography pass (coat, bake, expose, post-exposure bake, develop), an etch or implant, a strip and clean, a deposition, often a CMP, and metrology between many of them. Wafers travel in 25-wafer **FOUPs** (Front Opening Unified Pods) on an overhead transport system that makes millions of moves per day.

The flow divides into three regimes:

- **FEOL** (front end of line): everything that makes the transistors. Isolation, wells, the gate stack, source/drain epitaxy, the replacement metal gate. This is where the ~2 nm alignment tolerances and the ~20–25 EUV layers live.
- **MOL** (middle of line): the contacts that connect transistors to the wiring, at the tightest pitches in the chip (~25–30 nm), using tungsten, cobalt, or ruthenium.
- **BEOL** (back end of line): ~15–18 levels of copper wiring built by **dual damascene**, where you etch trenches and vias into low-k dielectric, line them with a TaN barrier, fill with electroplated copper, and polish flat. Pitches go from ~24–28 nm at M1 to microns at the top levels.

Modules 05 through 13 cover this in detail: the building itself (05), deposition (06), lithography (07, 08), etch (09), doping (10), the transistor (11), the wiring (12), and the metrology and yield discipline that holds it together (13). The equipment inside is where most of the money goes: ~70–80% of a fab's capex is tools, from ASML, Applied Materials, Lam Research, Tokyo Electron, and KLA.

### Wafer sort, thinning, dicing

A finished wafer is probed on a **wafer prober** with a probe card (FormFactor, Micronics Japan, Technoprobe) whose thousands of needles contact the die's pads while an automatic test equipment (**ATE**) system (Advantest V93000, Teradyne UltraFLEX) runs structural and functional tests. The result is a wafer map: each die is marked good, bad, or binned by speed and by which redundant blocks work. For a large GPU die, this **harvesting** is everything: an H100 SXM shipped with 132 of 144 streaming multiprocessors enabled precisely so that a wafer with several defects per die still yields sellable parts.

Before packaging, the wafer gets its solder microbumps or copper pillars deposited (a mini-fab process: sputter under-bump metallization, pattern, electroplate), is ground from 775 µm down to a few hundred µm (much thinner for stacked dies), and is cut into individual dies by blade sawing, laser stealth dicing, or plasma dicing. DISCO of Japan supplies ~70–80% of the world's dicing and grinding equipment. Module 14 covers test; Module 16 covers backgrind, dicing, and the classic packaging flows.

### HBM: a memory stack built like a skyscraper

An H100 carries 80 GB of HBM3 in five stacks; a B200 carries 180 GB of HBM3E in eight; Rubin carries 288 GB of HBM4. Each stack is 8, 12, or 16 DRAM dies, each thinned to ~30 µm, with ~1,024 (HBM3) or ~2,048 (HBM4) **through-silicon vias** (TSVs) per die, bonded on top of a logic base die that talks to the GPU over a ~1,024- or 2,048-bit-wide interface. SK hynix pioneered the mass-reflow molded underfill (**MR-MUF**) bonding process and holds roughly half or more of the market; Samsung and Micron use thermo-compression bonding with non-conductive film (TC-NCF), and HBM4 pushes toward hybrid (copper-to-copper) bonding for 16-high stacks. HBM is a full DRAM fab flow (itself ~1,000 steps and increasingly EUV-patterned) plus a wafer-level stacking flow, and a stack is worth several hundred dollars, roughly 3–5x the price per bit of ordinary DDR5. HBM was sold out for both 2025 and 2026 before those years began. Module 15 covers DRAM, NAND, and HBM manufacturing.

### Advanced packaging: CoWoS

The GPU die and its HBM stacks must sit within a few millimeters of each other on something that can carry thousands of wires between them. **CoWoS** does this in two bonding steps. In **chip-on-wafer** (CoW), the logic and HBM dies are flip-chip bonded, at ~40 µm microbump pitch, onto a full 300 mm interposer wafer: a silicon interposer with TSVs and a few copper layers (CoWoS-S), an organic redistribution layer (CoWoS-R), or, for Blackwell, a molded RDL interposer with small embedded silicon bridges (**CoWoS-L**). The interposer wafer is thinned to expose the TSVs, bumped, and diced. In **wafer-on-substrate** (WoS), each CoW module is bonded at ~130–150 µm C4 pitch to a 10–20-layer organic build-up substrate made with Ajinomoto Build-up Film (**ABF**) by Ibiden, Unimicron, Shinko, or AT&S, then underfilled, lidded, and balled. The finished B200 package is ~100 × 100 mm and sits on an interposer of more than three reticle-limits in area.

TSMC does effectively all of the CoW step for NVIDIA and AMD, and its capacity, ~35k wafers per month at end-2024, ~75–80k at end-2025, targeting ~120–130k by end-2026, has been the single tightest constraint on AI accelerator supply. The WoS step and some CoWoS-S volume are increasingly outsourced to ASE/SPIL and Amkor. Module 17 covers the interposer process, hybrid bonding (SoIC), Intel's Foveros and EMIB, and the warpage physics that make 100 mm packages hard.

### Final test, module, server, rack, data center

The packaged GPU goes through package-level ATE test, often a burn-in at elevated temperature and voltage to weed out infant mortality, and increasingly **system-level test** (SLT) in a socket that runs real workloads. Fallout here is a few percent, but each unit is worth tens of thousands of dollars, so test cost per part (tens to hundreds of dollars) is small relative to escapes. Module 18 covers this.

The tested package is soldered to an **SXM** module PCB with its voltage regulators (an H100 SXM draws up to 700 W; a B200 up to 1,000 W; a GB300 up to 1,400 W), then onto an HGX baseboard (8 GPUs plus NVSwitch chips) or, in the Grace-Blackwell era, a compute tray carrying two Grace CPUs and four Blackwell GPUs. Eighteen compute trays and nine NVSwitch trays connected by a copper NVLink spine of ~5,000 cables make a **GB200 NVL72** rack: 72 GPUs, 36 CPUs, ~120–140 kW, liquid-cooled through cold plates and a rack-level coolant distribution unit, selling for ~$3–4 million. ODMs (Foxconn/Hon Hai, Quanta, Wistron/Wiwynn, Inventec) build these in Taiwan, Mexico, and increasingly Texas. A 100,000-GPU cluster is ~1,400 such racks, ~150–200 MW of IT load, and on the order of $10 billion of hardware, plus a network of InfiniBand or Ethernet switches and hundreds of thousands of optical transceivers. Module 19 traces the H100, Blackwell, and Rubin product path from RTL to rack.

## Money Flow and Industry Structure

The semiconductor industry sold roughly $790 billion of chips in 2025 (WSTS/SIA: $791.7 billion, up 25.6%), and WSTS's 2026 forecasts have the market passing $1 trillion in 2026 (the May 2026 update projects ~$1.5 trillion as memory prices and AI logic surge), with AI accelerators and HBM the fastest-growing slices. Beneath that revenue line sit seven distinct kinds of company, and the whole industry is best understood as money and wafers flowing between them.

| Layer | What they do | Business model | Leading firms (share where meaningful) |
|---|---|---|---|
| **EDA and IP** | Design software; reusable blocks (CPU cores, SerDes, memory PHYs) | Software licenses, royalties | Synopsys, Cadence (together ~70% of EDA), Siemens EDA; Arm, Synopsys/Cadence IP, Rambus |
| **Fabless** | Design chips, own no fab | Gross margin on chips; pay foundry per wafer | NVIDIA (>$200B revenue run-rate in FY2026), AMD, Qualcomm, Broadcom, MediaTek, Apple (captive) |
| **Foundry** | Manufacture wafers for others | Price per wafer by node; ~55–60% gross margin at TSMC | TSMC (~65–70% of foundry revenue; >90% of ≤5 nm-class wafers), Samsung Foundry, Intel Foundry, SMIC, GlobalFoundries, UMC |
| **IDM** | Design and manufacture their own | Vertically integrated | Intel, Samsung, SK hynix, Micron (memory), TI, Infineon, STMicro, NXP |
| **OSAT** | Outsourced assembly and test | Price per unit | ASE (incl. SPIL; ~30% of OSAT), Amkor, JCET, PTI, KYEC (test) |
| **Equipment** | Make the tools | Capex sales (~$135B in 2025, SEMI) plus ~30–40% service revenue | ASML (~100% EUV, ~80–90% DUV immersion), Applied Materials, Lam Research, Tokyo Electron, KLA (~50–60% of process control); SCREEN, Advantest, Teradyne, DISCO, ASM International, Kokusai |
| **Materials** | Wafers, gases, chemicals, resists, masks, substrates | Consumables (~$70–75B/yr) | Shin-Etsu, SUMCO, JSR, TOK, Fujifilm, Entegris, Linde, Air Liquide, Hoya, AGC, Ajinomoto, Ibiden, Resonac |

The dollar flow for a GPU runs like this. NVIDIA pays Synopsys and Cadence for design tools and Arm for the Grace CPU cores; pays TSMC ~$17,000 per N4 wafer plus a separate per-package price for CoWoS; pays SK hynix, Micron, or Samsung on the order of $15–20 per gigabyte for HBM (estimates vary; sometimes purchased by TSMC on NVIDIA's behalf for packaging); pays Ibiden or Unimicron for substrates; pays KYEC or ASE for test; and pays Foxconn or Quanta to build boards and racks. TSMC in turn spends ~$40 billion a year of capex, most of it with ASML, Applied, Lam, TEL, and KLA, and buys wafers from Shin-Etsu and SUMCO, resist from JSR and TOK, gases from Linde and Air Liquide, and mask blanks from Hoya and AGC. Every one of those suppliers has its own sub-tier: ASML buys optics from Zeiss and lasers from Trumpf; Zeiss buys ultra-low-expansion glass from Corning. Module 20 puts numbers on all of this, including cost per transistor, wafer price by node, and what one week of disruption in Hsinchu would do.

The most important structural fact is the split between *design* and *manufacturing* that TSMC created in 1987. Before it, you needed a fab to be a chip company. After it, NVIDIA could become the most valuable company on earth while owning no factories, and TSMC could spread the ~$30 billion cost of a node across hundreds of customers. The consequence is that manufacturing has concentrated into a handful of firms at each layer, which brings us to the chokepoints.

## The Three Chokepoints

Ask "what would stop the world from making more Blackwells next quarter?" and the answer is always one of three things.

### 1. EUV lithography: one company, one tool, one supply chain

Every transistor below the ~7 nm class is patterned with **extreme ultraviolet** (EUV) light at 13.5 nm, and every EUV scanner on earth is made by ASML in Veldhoven, Netherlands. The current workhorse NXE:3800E costs ~$200–220 million, weighs ~180 tonnes, ships in ~40 freight containers (three 747 freighters or ~20 trucks), and exposes ~200–220 wafers per hour by hitting a stream of 50,000 tin droplets per second with a CO2 laser to make plasma. The High-NA EXE:5000/5200, with 0.55 numerical aperture anamorphic optics, costs ~$380–400 million and is in early production at Intel (for 14A) and evaluation at Samsung and SK hynix (both installed EXE:5200B tools in 2025), TSMC (R&D only; it has deferred High-NA for A16/A14), and imec. ASML shipped 44 EUV systems in 2024 and 48 in 2025; there are on the order of 300 in the world, more than half at TSMC. Inside ASML's tool sit a Zeiss projection optics box (mirrors polished to ~50 pm RMS surface figure, made by one Zeiss factory in Oberkochen), a Trumpf drive laser, a Cymer (ASML-owned) source, and frames and modules from VDL and others. Export controls have barred EUV shipments to China since 2019 and DUV immersion since 2023. Module 08 is entirely about this machine.

### 2. Leading-edge foundry: TSMC, and Taiwan

TSMC manufactures more than 90% of the world's most advanced logic wafers (5 nm-class and below), essentially all of it in Taiwan: Fab 18 (N5/N3) in Tainan, Fab 20 (N2) in Hsinchu, Fab 22 (N2) in Kaohsiung. Its capacity exceeded 17 million 12-inch-equivalent wafers in 2025, or ~1.4 million per month across all nodes; N3 alone runs on the order of 100–130k wpm and N2 is ramping through 2026. Samsung's SF3/SF2 and Intel's 18A are the only alternatives, and both have struggled to win external customers at volume; Intel 18A is in production for Panther Lake but external foundry volume remains small as of ~2025–26. TSMC's Arizona Fab 21 began N4 production in late 2024 and is bringing N3 and later N2 to the US, but Arizona output is a few percent of Taiwan's. Rapidus in Japan targets 2 nm in 2027. The concentration is not an accident: a leading-edge node costs ~$20–30 billion of fab plus several billion in R&D, and only the firm with the most customers can amortize it. Module 05 and Module 20 explain how a GIGAFAB is organized and what the concentration risk means.

### 3. Advanced packaging and HBM: the AI-era bottleneck

For AI accelerators specifically, the tightest constraint from 2023 through 2026 has been neither EUV nor wafers but the two steps *after* the wafer: CoWoS capacity and HBM supply. Both are hard for the same reason: they are new, high-value process flows with yield learning curves, and the demand for them roughly quadrupled in two years. TSMC's CoWoS ramp from ~35k to ~120–130k wafers per month (2024 to end-2026) required entire new fabs (AP7 in Chiayi, AP8 in Tainan), and even so analysts estimate a ~10–20% supply gap in 2026. On the memory side, HBM is ~5% of DRAM bits but ~30–40% of DRAM revenue, and SK hynix, Samsung, and Micron each diverted a large slice of DRAM wafer capacity to HBM (an HBM bit consumes roughly 3x the wafer area of a DDR5 bit, so ~5% of bits is on the order of 15% of wafers, and more at SK hynix), which is why ordinary DRAM prices rose sharply in 2025–2026. HBM4, with its 2,048-bit interface and logic base die made at TSMC or Samsung foundry rather than in the DRAM fab, ships in volume for Rubin in 2026. Modules 15 and 17 cover the mechanisms.

There is a fourth candidate chokepoint that is cheaper but no less absolute: Japanese materials. Japan supplies ~90% of photoresist, ~55–60% of silicon wafers, most mask blanks (Hoya, AGC), and 100% of ABF (Ajinomoto). Module 04 and Module 20 return to it.

## Master Process Flow: Sand to Rack in ~60 Steps

This is the spine of the course. Each step below is at the granularity of "STI formation" or "M1 dual damascene," which is the level at which fab engineers talk about the flow. Later modules expand each step into its constituent unit processes (litho, etch, deposition, clean, metrology). Where a step is repeated many times, it appears once with a note.

**Stage 0: Design and masks (Module 19, Module 04)**

1. Architecture and RTL design; verification (Synopsys, Cadence tools; ~2–4 years for a new GPU)
2. Synthesis, place and route, timing closure, DRC/LVS signoff against the foundry PDK
3. Tape-out: GDSII/OASIS layout; OPC and mask data prep (compute-intensive, weeks)
4. Mask making: e-beam write (multi-beam, ~10–20 h per critical layer), etch, inspect, repair, pellicle; a full N3/N2 mask set costs ~$20–30M+

**Stage 1: Raw material to wafer (Modules 01–03)**

5. Quartz mining and beneficiation
6. Carbothermic reduction to MG-Si (submerged arc furnace)
7. Hydrochlorination of MG-Si to trichlorosilane
8. Multi-column distillation of TCS to 9N–11N
9. Siemens CVD deposition of polysilicon rods (or FBR granules)
10. Rod harvest, crushing, etch-clean, packaging
11. Crucible charge and melt-down (Czochralski puller, Ar, ~1,420 °C)
12. Seed dip, Dash neck, shoulder, body growth (MCZ), tail, cooldown
13. Ingot crop, diameter grind, notch, resistivity/orientation test
14. Diamond-wire multi-wire sawing into wafers
15. Lapping/grinding, edge rounding, damage etch
16. Double-side polish and front-side finish CMP
17. RCA clean, laser mark, flatness/particle inspection; epitaxial layer growth if specified
18. Ship in cassettes/FOUPs to fab

**Stage 2: FEOL, transistor formation (Modules 05–11; each step includes its own litho/etch/clean/metrology loop)**

19. Incoming clean; zero-layer alignment mark etch
20. Channel material prep: for GAA nanosheets, epitaxial Si/SiGe superlattice (3–4 pairs); for FinFET, none
21. Fin/nanosheet-stack patterning: hard-mask deposition, EUV or SAQP mandrel/spacer patterning, high-aspect-ratio Si etch
22. **STI formation**: liner oxidation, flowable/HARP oxide fill, STI CMP, oxide recess (fin reveal)
23. Well and Vt implants (n-well, p-well, anti-punch-through), anneal
24. Dummy gate stack: dummy oxide, amorphous-Si deposition, hard mask, gate patterning (EUV), gate etch
25. Gate spacer: ALD low-k SiOCN, anisotropic spacer etch
26. Source/drain recess etch; inner-spacer formation for GAA (SiGe lateral recess, ALD fill, etch-back)
27. Embedded epitaxial S/D: SiGe:B for PMOS, Si:P for NMOS (selective epi, ~600–700 °C)
28. Contact etch-stop liner (SiN) and ILD0 (flowable oxide) deposition; CMP to expose dummy gate top
29. **Replacement metal gate** (gate-last): dummy poly removal; for GAA, channel release (selective SiGe etch); interfacial SiO2; ALD HfO2 high-k; work-function metals (TiN, TiAlC, TiN); W or Co fill; gate CMP
30. Gate cut; gate recess and self-aligned contact cap (SiN)

**Stage 3: MOL, contacts (Modules 11–12)**

31. Trench-silicide/contact patterning (EUV), etch to S/D epi
32. Contact metallization: Ti/TiN liner, TiSix formation, Co/W/Ru fill, CMP
33. Gate contact and V0 via: patterning, etch, fill, CMP

**Stage 4: BEOL, interconnect (Module 12; steps 34–35 repeat ~15–18 times with loosening pitch)**

34. **M0/M1 formation**: low-k dielectric deposition, EUV single-expose or SALELE patterning, trench etch, TaN barrier/Ru or Co liner or Cu seed, Cu electroplate (or direct Ru/Mo for M0), CMP, dielectric cap
35. **Mx dual damascene** (via + trench in one fill), ~24–28 nm pitch at M1–M2, DUV immersion multi-patterning at intermediate levels, single-expose DUV at global levels
36. Top thick metals and RDL (Al or thick Cu), MIM capacitors if used
37. Passivation (SiN/SiO2 stack), polyimide, bond-pad opening
38. (A16/PowerVia-class nodes) backside power delivery: bond to carrier wafer, flip, thin to ~<1 µm over devices, nano-TSV etch and fill, backside power rail metallization

**Stage 5: Wafer test and preparation (Modules 13–14, 16)**

39. Inline metrology and inspection at every critical layer (CD-SEM, OCD, overlay, bright-field/e-beam defect inspection); parametric test on scribe-line structures
40. **Wafer sort**: probe-card contact, ATE test, wafer map, redundancy repair/e-fuse, binning
41. Bumping: UBM sputter, resist pattern, Cu pillar/microbump plating (~40 µm pitch for CoW; C4 ~130–150 µm for direct-on-substrate)
42. Backgrind (with tape/protective film), stress-relief etch, backside metal if required
43. Dicing (laser groove + blade, stealth laser, or plasma), die pick and place into trays

**Stage 6: HBM (Module 15; runs in parallel in the memory maker's fab)**

44. DRAM wafer fab (~1T1C cell, 1β/1γ node, EUV on 1–5 layers) with via-middle TSV formation
45. Base (logic) die fab, on DRAM process for HBM3/3E or on foundry logic node (TSMC N12/N5, Samsung) for HBM4
46. TSV reveal: wafer thinning to ~30 µm on carrier, backside bump
47. Die-to-wafer stacking: 8/12/16-high by TC-NCF, MR-MUF, or hybrid bonding
48. Stack test and burn-in; **known-good stacked die** (KGSD) shipment

**Stage 7: Advanced packaging (Module 17)**

49. Substrate fabrication (parallel): core drilling and plating, sequential ABF build-up (~10–20 layers, laser vias, SAP plating), solder mask, surface finish
50. Interposer fabrication: Si interposer with TSVs and 3–4 Cu layers (CoWoS-S), or RDL interposer with embedded LSI bridges (CoWoS-L)
51. **Chip-on-wafer**: flip-chip TC bonding of GPU die(s) and HBM stacks onto interposer wafer; underfill; molding; overmold grind
52. Interposer wafer thinning and TSV reveal; C4 bumping; CoW dicing
53. **Wafer-on-substrate**: CoW module reflow onto ABF substrate; underfill
54. Lid or stiffener attach with thermal interface material; BGA ball attach; laser mark

**Stage 8: Final test and system (Modules 18–19)**

55. Package final test (ATE); burn-in; speed/power binning
56. System-level test in socket with real workloads
57. SXM module assembly: GPU package onto module PCB with VRMs; reflow; test
58. Board integration: HGX baseboard (8 GPU + NVSwitch) or GB200/GB300 compute tray (2 Grace + 4 Blackwell), cold plates
59. Rack integration: 18 compute trays + 9 NVSwitch trays, NVLink copper spine, busbar, CDU/manifolds; rack burn-in and cluster test
60. Data center deployment: power, liquid cooling, InfiniBand/Ethernet fabric and optics, bring-up, cluster validation

If you memorize one thing from this module, memorize this list. Every later module is a magnifying glass on a handful of these steps.

> **Worked example: what an H100 costs from wafer to sold GPU.** The H100 die is ~814 mm² (about 26 × 31 mm) on TSMC's 4N process (an N5-family node) with 80 billion transistors. A 300 mm wafer has ~70,700 mm² of area, but the useful area is less because a rectangular die cannot use the edge. A standard estimate is N ≈ π(d/2)²/A − π·d/√(2A) = 86.8 − 23.4 ≈ 63 gross die, and a real placement with a ~3 mm edge exclusion lands in the same place, at ~60–65 gross die. At a ~0.1 defects/cm² defect density, a naive Poisson yield would be e^(−8.14 × 0.1) ≈ 44%, which is why NVIDIA ships the part with 132 of 144 SMs enabled: with harvesting, the sellable fraction rises to roughly 70–80%, or ~45–50 sellable die per wafer. At ~$16,500 per 4N wafer that is ~$350 per die. Add 80 GB of HBM3 at ~$15–20/GB ≈ $1,200–1,600 (five stacks; the sixth site holds a dummy for mechanical balance); CoWoS-S interposer, assembly, and ABF substrate ≈ $500–800; wafer sort, final test, and burn-in ≈ $100–200; SXM module PCB, VRMs, and assembly ≈ $200–300. The total bill of materials and processing is on the order of $2,500–3,500 per SXM module, consistent with the widely-cited ~$3,300 analyst estimate. The module sold at ~$25,000–30,000 in 2023–2024, so hardware gross margin on the part was roughly 85–90%, which is how NVIDIA's overall data-center gross margin sits in the 70s after R&D-heavy products, software, and networking are mixed in. Note where the cost is: the die is only ~10–15% of the BOM; HBM is ~40–50%; packaging is ~20–25%. That ranking is why Modules 15 and 17 exist.

> **Worked example: how many wafers TSMC runs, and what that means for GPUs.** TSMC's total capacity exceeded 17 million 12-inch-equivalent wafers in 2025, i.e. ~1.4 million wafer starts per month across every node from 0.18 µm to N2. Of that, the N5/N4 family runs on the order of 150k wpm and N3 on the order of 100–130k wpm. Suppose NVIDIA takes ~40k N4-class wafers per month for Hopper- and Blackwell-family die (a plausible 2025 figure; NVIDIA is TSMC's largest customer by revenue). At ~45–50 sellable H100-class die per wafer that would be ~1.8–2.0 million die per month, far more than were actually shipped. The binding constraint was never the front end. TSMC's CoWoS capacity at end-2025 was ~75–80k wafers per month, of which NVIDIA is estimated to take ~60%, or ~45–50k. A CoWoS-S wafer yields ~29–30 H100-class packages; a CoWoS-L wafer with the ~3.3-reticle Blackwell interposer yields only ~16. So ~45k CoWoS wafers per month at, say, ~16–20 packages each gives ~700k–900k packages per month, i.e. roughly 8–10 million accelerator packages per year: about right for the 2025–2026 shipment estimates and an order of magnitude below what the front-end wafer supply could support. This is the arithmetic behind "CoWoS is the bottleneck."

> **Worked example: how many EUV tools a 100k wpm N3 fab needs.** An N3-class flow has on the order of 20–25 EUV layers. At 100,000 wafer starts per month that is ~2.0–2.5 million EUV wafer-passes per month. An NXE:3800E rated at ~220 wafers per hour at a 30 mJ/cm² dose, run at a realistic ~75–80% availability and with typical doses above 30 mJ/cm² on critical layers, delivers roughly 100–120k wafer-passes per month. That means ~20–25 EUV scanners for the fab, or ~$4–5 billion of lithography tools alone, roughly 15–20% of the fab's capex. Multiply by the ~1,000-tool count of a full fab (etch, deposition, CMP, implant, metrology, wet clean, track) and you get to $20–30 billion without much effort.

## How to Read This Course

The course is organized in the order the material flows. Each module is self-contained enough to read alone, but the flow list above is the index: find the step you care about, and its module is listed beside it.

**Part I: Raw materials and wafers**

- **Module 01, Sand to Polysilicon.** Steps 5–10. Quartz mining, the submerged arc furnace, trichlorosilane chemistry and distillation, the Siemens reactor in detail, FBR, purity measurement at 11N, and who makes what.
- **Module 02, Crystal Growth.** Steps 11–13. Czochralski from crucible to cooldown, why the Dash neck works, oxygen and carbon control, MCZ, dopant segregation, the point-defect physics (vacancies, interstitials, COPs, the V/G criterion), Float Zone, and why 450 mm died.
- **Module 03, From Ingot to Polished Wafer.** Steps 14–18. Wire sawing, lapping, edge rounding, double-side polish, CMP, RCA cleaning, flatness metrics (SFQR, GBIR), epitaxy, SOI by Smart Cut, and the five-company wafer oligopoly.
- **Module 04, Beyond Silicon and Fab Consumables.** SiGe, SiC, GaN, GaAs, InP; then everything the fab consumes: photoresists, specialty gases, wet chemicals, ultrapure water, CMP slurries, sputter targets, quartzware, and the photomask flow (blanks, writers, OPC, pellicles). Supports Step 4 and every step in Stages 2–4.

**Part II: The front end**

- **Module 05, Inside a Leading-Edge Fab.** The building, cleanroom, AMHS, tool layout, wafer starts, cycle time, cost structure, and how TSMC organizes a GIGAFAB. Frames Steps 19–39.
- **Module 06, Thermal Oxidation and Thin-Film Deposition.** Deal-Grove, furnaces, RTP, CVD variants, ALD half-reactions, PVD, epitaxy. Used in nearly every step from 20 to 37.
- **Module 07, Photolithography I: Resist and DUV.** Resist chemistry, the track, Rayleigh's equation, immersion at NA 1.35, OPC, phase-shift masks, LELE/SADP/SAQP multi-patterning, overlay. Used at every patterning step.
- **Module 08, Photolithography II: EUV in Full Detail.** The 13.5 nm source, tin droplets, Mo/Si mirrors, reflective reticles, stochastics, EUV resists, pellicles, throughput, High-NA, ASML's supply chain, and export controls. Steps 21, 24, 31, 34, 35.
- **Module 09, Etch.** Plasma physics, RIE, CCP vs ICP, anisotropy and selectivity, passivation, high-aspect-ratio etch, atomic layer etch, endpoint detection. Steps 21–22, 24–26, 29, 31–35.
- **Module 10, Doping.** Ion implantation from source to anneal, channeling, damage, RTA/laser anneal, diffusion, in-situ doped epi. Steps 23, 27.
- **Module 11, Building a Transistor.** MOSFET operation, short-channel effects, HKMG, gate-last, strain, FinFET, GAA nanosheets, backside power, CFET, and what "2 nm" actually means. Steps 20–33 and 38, walked as one flow.
- **Module 12, Interconnect (BEOL).** Copper dual damascene step by step, barriers and liners, low-k, Ru/Co/Mo, RC delay, electromigration, backside power delivery, and MOL contacts. Steps 31–38.
- **Module 13, Metrology, Inspection, and Yield.** Ellipsometry, CD-SEM, OCD, overlay, defect inspection, SPC, yield models, D0, die-size vs yield, learning curves. Step 39, and the reason every other step is measurable.
- **Module 14, Wafer Sort and Test.** Probe cards, ATE, test economics, binning, e-fuses, known-good die, DFT. Step 40.

**Part III: Memory**

- **Module 15, DRAM, NAND, and HBM Manufacturing.** The 1T1C cell and its capacitor, 1α/1β/1γ nodes, EUV in DRAM, 3D NAND channel-hole etch and string stacking, and HBM from TSV to 16-high hybrid-bonded stacks. Steps 44–48.

**Part IV: The back end**

- **Module 16, Packaging Fundamentals.** Backgrind, dicing, die attach, wire bond, flip-chip C4, underfill, ABF build-up substrates, leadframes, molding, BGA, and the OSATs. Steps 41–43, 49, 53–54.
- **Module 17, Advanced Packaging: CoWoS, SoIC, Chiplets.** Interposers (S/R/L), TSVs, microbumps, CoW then WoS, hybrid bonding, Foveros/EMIB, InFO, panel-level, UCIe, capacity as the AI bottleneck, warpage and thermals. Steps 50–54.
- **Module 18, Final Test, Burn-in, and System-Level Test.** Package test, burn-in, SLT, HBM KGD, fallout and cost at each stage. Steps 55–56.
- **Module 19, Building an NVIDIA GPU from RTL to Rack.** Design flow and tape-out, H100 and Blackwell anatomy, Blackwell Ultra and Rubin with HBM4, SXM, HGX, NVSwitch, DGX and GB200 NVL72, ODMs, lead times, cost breakdown. Steps 1–3 and 57–60.

**Part V: The ecosystem**

- **Module 20, Economics, Geography, and Geopolitics.** Equipment and materials oligopolies, foundry shares, fab cost curves, wafer prices by node, cost per transistor, Moore's law status, Taiwan risk, export controls, CHIPS Act, Rapidus, EU, China's domestic push, and disruption scenarios. The money-flow section of this module, at full depth.
- **Module 21, Glossary and Reference.** 150+ terms, unit conventions, a node table, the full ordered process-flow list expanded from the 60 steps above, and what to learn next.

A reading strategy that works: read Modules 00, 05, 11, 17, and 19 first for the skeleton (fab, transistor, package, product), then go back and fill in the unit processes (06–10, 12–13) and the material stages (01–04), and finish with memory (15), test (14, 18), and the ecosystem (20). If you only have a weekend, read 00, 08, 11, and 17.

## Key Numbers

| Quantity | Value | Notes |
|---|---|---|
| Electronic-grade polysilicon purity | 9N–11N (99.9999999%+) | vs MG-Si at 98–99% |
| Polysilicon price, electronic grade | ~$20–40/kg | Solar grade ~$5/kg in 2024–25 |
| 300 mm CZ ingot | ~2 m long, ~300–450 kg, ~2.5–3.5 days per pull | ~1,500–2,000 wafers per ingot |
| Polished 300 mm prime wafer | ~$100–150; 775 µm thick | Epi wafer ~$200–300 |
| Leading-edge fab cost | ~$20–30B for ~100k wpm | ~70–80% of capex is equipment |
| Process steps per leading-edge wafer | ~1,000–1,500 | ~70–100+ mask layers; ~20–25 EUV layers at N3/N2 |
| Fab cycle time | ~3 months (12–14 weeks) | ~1.3–1.5 days per mask layer |
| Wafer price by node | N7 ~$10k; N4 ~$16–17k; N3 ~$18–20k; N2 ~$30k | As of ~2025; foundry list-price estimates |
| EUV scanner cost | NXE:3800E ~$200–220M; EXE:5200 High-NA ~$380–400M | ASML is sole supplier; 44 EUV shipped in 2024, 48 in 2025 |
| EUV throughput | ~200–220 wafers/hour at 30 mJ/cm² | 50,000 tin droplets/s, 13.5 nm |
| Mask set cost, N3/N2 | ~$20–30M+ | Multi-beam e-beam writers |
| H100 die | 814 mm², 80B transistors, TSMC 4N; ~60–65 gross die/wafer | Reticle limit ~858 mm² (26 × 33 mm) |
| Blackwell B200 | 2 × ~800 mm² dies, 208B transistors, 8 × HBM3E, CoWoS-L | ~16 packages per CoWoS wafer |
| H100 SXM BOM vs price | ~$2,500–3,500 cost; ~$25–30k price | HBM ~40–50% of BOM |
| HBM price | ~$15–20/GB (estimates vary); ~3–5x DDR5 per bit | HBM ~5% of DRAM bits, ~30–40% of DRAM revenue |
| TSMC total capacity | >17M 12-inch-equivalent wafers in 2025 (~1.4M/month) | >90% of ≤5 nm-class logic wafers worldwide |
| TSMC CoWoS capacity | ~35k wpm (end-2024) → ~75–80k (end-2025) → ~120–130k (end-2026 target) | The AI-era bottleneck |
| GB200 NVL72 rack | 72 GPUs, 36 Grace CPUs, ~120–140 kW, ~$3–4M | 18 compute + 9 switch trays |
| 100k-GPU cluster | ~1,400 NVL72 racks, ~150–200 MW, ~$10B+ hardware | 12–24 months to build |
| Semiconductor market | ~$790B (2025, WSTS/SIA); equipment ~$135B; materials ~$70–75B | 2026 forecast >$1T (WSTS) |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| TSMC | Taiwan | Leading-edge foundry; CoWoS/SoIC packaging | Leader (>90% of ≤5 nm-class wafers; ~65–70% of foundry revenue) |
| Samsung | Korea | Foundry (SF2/SF3), DRAM, NAND, HBM | #2 foundry; #1–2 DRAM by revenue (traded places with SK hynix in 2025); #2–3 HBM |
| Intel | USA | IDM; Intel Foundry (18A, 14A); first High-NA user | #3 leading-edge foundry; leader in High-NA adoption |
| NVIDIA | USA | Fabless; GPUs, NVLink, networking, racks | Leader in AI accelerators (~80%+ share) |
| AMD | USA | Fabless; MI300/MI350 GPUs, EPYC CPUs | #2 in merchant AI accelerators |
| SK hynix | Korea | DRAM, NAND, HBM | Leader in HBM (~50–60%) |
| Micron | USA | DRAM, NAND, HBM | #3 DRAM; ~20%+ HBM share in 2025–26 |
| ASML | Netherlands | EUV and DUV lithography | Sole EUV supplier; ~80–90% of immersion DUV |
| Applied Materials | USA | Deposition, etch, CMP, implant, inspection | #1 equipment vendor by revenue |
| Lam Research | USA | Etch, deposition (esp. memory) | #1–2 in etch |
| Tokyo Electron | Japan | Coater/developer tracks, etch, deposition, clean | ~90% of coater/developer tracks |
| KLA | USA | Inspection and metrology | ~50–60% of process control |
| Advantest / Teradyne | Japan / USA | ATE for wafer sort and final test | Duopoly (~60% / ~30%) |
| DISCO | Japan | Dicing saws, grinders, laser dicers | ~70–80% share |
| Shin-Etsu / SUMCO | Japan | 300 mm silicon wafers | #1 / #2 (~55–60% combined) |
| GlobalWafers / Siltronic / SK Siltron | Taiwan / Germany / Korea | 300 mm silicon wafers | #3 / #4 / #5 |
| Wacker / Hemlock / Tokuyama | Germany / USA / Japan | Electronic-grade polysilicon | Top 3 electronic grade |
| JSR / TOK / Shin-Etsu / Fujifilm | Japan | Photoresists incl. EUV | ~90% of resist supply |
| Hoya / AGC | Japan | Photomask blanks incl. EUV blanks | Duopoly |
| Ajinomoto | Japan | ABF build-up film for substrates | ~100% |
| Ibiden / Unimicron / Shinko / AT&S | Japan / Taiwan / Japan / Austria | Package substrates | Leaders in high-end ABF substrates |
| ASE (incl. SPIL) / Amkor / JCET | Taiwan / USA / China | OSAT assembly and test | #1 / #2 / #3 |
| KYEC | Taiwan | Test services for NVIDIA-class parts | Leading test house |
| Synopsys / Cadence | USA | EDA and IP | Duopoly (~70% of EDA) |
| Arm | UK | CPU IP (Grace, Vera) | Dominant CPU IP licensor |
| Zeiss SMT / Trumpf / Cymer | Germany / Germany / USA | EUV optics / drive laser / source | Sole suppliers to ASML |
| Foxconn / Quanta / Wistron / Inventec | Taiwan | ODMs for boards, servers, NVL72 racks | Top NVIDIA system builders |
| Sibelco / The Quartz Corp | Belgium / Norway | High-purity quartz (Spruce Pine) | Dominant in crucible-grade HPQ |
| Ferroglobe / Elkem | Spain-UK / Norway | Metallurgical-grade silicon | Largest non-Chinese producers |

## Common Misconceptions

- **"The chip is the expensive part of an AI GPU."** → The 814 mm² H100 die costs on the order of $350 out of a ~$3,000 bill of materials; HBM and packaging together are roughly two-thirds of it. The die is the hardest part, not the priciest.
- **"TSMC's constraint is how many wafers it can make."** → For AI accelerators, front-end wafer capacity has exceeded demand by roughly an order of magnitude; the binding constraints from 2023 to 2026 were CoWoS packaging capacity and HBM supply.
- **"A 2 nm node has 2 nm features."** → No dimension in an N2 transistor is 2 nm. Gate pitch is ~45–50 nm, metal pitch ~23–25 nm, nanosheet thickness a few nm. Node names have been marketing labels since the ~22 nm era; Module 11 explains what they actually track.
- **"A fab is a building full of robots that runs itself."** → A GIGAFAB employs several thousand engineers and technicians, and the ~3-month cycle time is dominated by queueing at ~1,000 tools, not by the processing itself. Cycle time and yield are management problems as much as physics problems.
- **"Silicon is scarce or strategically controlled."** → Quartz and MG-Si are cheap, abundant commodities. The strategic scarcity is in *purity* (electronic-grade polysilicon, HPQ crucible quartz) and in *capital and know-how* (EUV, leading-edge fabs, advanced packaging).
- **"China cannot make advanced chips because it lacks silicon or engineers."** → China dominates MG-Si and solar polysilicon and has a large engineering base. What it lacks is EUV lithography (export-controlled since 2019) and, increasingly, immersion DUV and the metrology, resist, and substrate sub-tiers that sit in Japan, the Netherlands, and the US. SMIC's 7 nm-class output on DUV multi-patterning is real but yield- and volume-limited.

## Where This Fits in the Supply Chain

This module is the map; it consumes nothing and produces the mental model every other module assumes. Module 01 picks up at the very beginning of the physical chain, where lump quartz and carbon enter a submerged arc furnace and leave as metallurgical-grade silicon on its way to a Siemens reactor. From there the chain flows in the order of the 60-step list above: polysilicon (01) to ingot (02) to wafer (03), plus the consumables and masks (04) that the fab (05–13) will burn through to turn a $150 wafer into a $17,000 one, which is sorted (14), joined to HBM (15), packaged (16–17), tested (18), and built into NVIDIA's product stack (19), inside an industry structure whose economics and geography are analyzed in Module 20. The reference material in Module 21 closes the loop by expanding this module's process flow to full granularity.

## Further Reading

- Chris Miller, *Chip War: The Fight for the World's Most Critical Technology* (Scribner, 2022). The best single history of why the industry is structured the way it is.
- Chris Mack, *Fundamental Principles of Optical Lithography* (Wiley, 2007), and his lecture series on lithography at lithoguru.com.
- James D. Plummer, Michael D. Deal, and Peter B. Griffin, *Silicon VLSI Technology: Fundamentals, Practice and Modeling* (Prentice Hall, 2000). The standard front-end textbook.
- Rao R. Tummala, *Fundamentals of Microsystems Packaging* (McGraw-Hill, 2001), for the back end.
- SemiAnalysis (semianalysis.com), especially the CoWoS, HBM, and AI accelerator cost-breakdown articles (2023–2025).
- Asianometry (YouTube), video essays on TSMC, ASML, Japanese materials, and the Czochralski process.
- ASML, "EUV lithography systems" product and technology pages (asml.com), and the annual report for shipment counts.
- TSMC, "Annual Report 2025" and the "Fab Capacity" and "GIGAFAB" pages at tsmc.com, for wafer capacity figures.
- TrendForce and Silicon Analysts market notes on CoWoS capacity (2025–2026).
- IEEE International Roadmap for Devices and Systems (IRDS), "More Moore" and "Lithography" chapters, for node parameters.
- NVIDIA, "NVIDIA H100 Tensor Core GPU Architecture" whitepaper (2022) and "NVIDIA Blackwell Architecture Technical Brief" (2024).
