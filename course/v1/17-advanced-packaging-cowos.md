# Module 17: Advanced Packaging: CoWoS, SoIC and Chiplets

An NVIDIA Blackwell GPU package holds two ~800 mm² logic dies and eight stacks of HBM3E, and the memory must talk to the logic across roughly 8,000 data wires at once (~13,000 signal wires once clocks, command, address and control are counted). No organic substrate can route 13,000 wires into a 12 mm strip of silicon edge: its lines are 10–15 µm wide on a good day and its vias are 50 µm holes. No lithography scanner can print a single 1,600 mm² die either: every ASML scanner exposes a field of at most 26 × 33 mm = 858 mm², a number that has not moved since the 1990s. And even if it could, a 1,600 mm² monolithic die at a defect density of 0.1 per cm² would yield about 20%. Those three walls, wiring density, reticle size, and yield, are why the most valuable object in the semiconductor industry is no longer a chip. It is an assembly: several chips, a slab of silicon with wires but no transistors, twenty-some layers of Ajinomoto build-up film, and a copper lid, joined together at TSMC in a process called **CoWoS** (Chip-on-Wafer-on-Substrate). From 2023 to 2026 the number of these assemblies TSMC could build per month, not the number of transistors it could print, set the ceiling on how many AI accelerators existed. This module explains what CoWoS is physically, how each step works, why it is hard to do fast, and what comes after it.

## Why the Package Became the Chip

### The reticle wall

A scanner exposes a rectangular **field** by sweeping a slit of light across the reticle while the wafer stage moves in synchrony (Module 07). The reticle is 6 inches square, the optics demagnify 4×, and the largest field they can image without aberration is 26 × 33 mm on the wafer. That 858 mm² is the **reticle limit**, the largest die that can be printed in one exposure. NVIDIA's GH100 (H100) is 814 mm², each Blackwell die is ~800 mm², and every large data-center part since Volta has sat within a few percent of this ceiling. High-NA EUV makes it worse: the EXE:5000's anamorphic optics halve the field to 26 × 16.5 mm = 429 mm², so dies larger than that on High-NA layers require **reticle stitching**, two half-field exposures whose edges overlap by a few micrometres with matched critical dimensions. The reticle wall is a physical fact and the first reason logic must be split into pieces.

### The yield math of big dies

The second reason is statistical. If defects land randomly at a density D0, the Poisson yield of a die of area A is Y = exp(−A·D0). At a mature-node D0 of ~0.1/cm², an 800 mm² die yields exp(−0.8) ≈ 45%, a 400 mm² die exp(−0.4) ≈ 67%, and a 1,600 mm² die ~20%. Splitting a design in two raises the good silicon fraction per wafer from ~45% to ~67% because each half is judged independently (Module 13 covers the models). The corollary is that a chiplet strategy only pays if the connections between the pieces cost almost nothing in power, latency, and area relative to on-die wires.

### HBM's thousands of wires

**High Bandwidth Memory (HBM)** (Module 15) is a stack of 8–16 DRAM dies over a base die, and its defining feature is the width of its interface: 1,024 data bits for HBM2 through HBM3E, 2,048 for HBM4. Each bit toggles at 6.4–9.6 Gb/s in HBM3E, and the interface is meant to consume a few picojoules per bit. That is only possible if the wires are short (a few millimetres), small (tens of femtofarads per line rather than picofarads), and numerous. One HBM3E stack has on the order of 1,500–1,800 signal I/Os once clocks, command/address, strobes, and parity lines are counted, and ~5,000–6,000 microbumps including power and ground. Eight stacks need ~13,000 signal lines terminated within ~10 mm of the GPU's edge.

An organic build-up substrate (Module 16) routes copper at ~8–15 µm line/space with ~50–60 µm microvias: ~50 lines per millimetre per layer at best. A silicon **interposer** patterned on a 65 nm-class damascene process routes at ~0.4–2 µm line/space, several hundred lines per millimetre per layer. That 20–50× density gap is the mechanism behind "HBM requires 2.5D."

### Bandwidth per millimetre of shoreline, picojoules per bit

Two figures of merit organize the field. **Bandwidth density** is quoted as GB/s per millimetre of die edge ("shoreline") for side-by-side links, or per mm² of face for 3D stacking. **Energy per bit** is in pJ/bit. Approximate values as of ~2025:

| Link type | Physical medium | Bump/pad pitch | Bandwidth density (edge) | Energy per bit |
|---|---|---|---|---|
| On-die wire | BEOL Cu | n/a | Effectively unlimited | ~0.01–0.1 pJ/bit |
| Hybrid-bonded 3D (SoIC, Foveros Direct) | Cu-Cu direct | 6–9 µm | Areal: >1 TB/s per mm² | ~0.05–0.2 pJ/bit |
| 2.5D on Si interposer or bridge (CoWoS, EMIB; UCIe advanced) | Cu pillar µbump on Si RDL | 25–55 µm | ~0.5–1.3 TB/s/mm | ~0.25–0.6 pJ/bit |
| HBM3E interface (2.5D) | µbumps on interposer | ~50–55 µm | ~100 GB/s per mm of stack edge | ~2.5–4 pJ/bit incl. DRAM I/O |
| Organic substrate die-to-die (UCIe standard, AMD Ryzen IF) | C4 bumps on ABF | 100–130 µm | ~30–200 GB/s/mm | ~0.5–2 pJ/bit |
| Board-level SerDes (NVLink, PCIe 5/6) | PCB traces, connectors | n/a | ~10–50 GB/s/mm | ~5–10 pJ/bit |
| Pluggable optics (800G transceiver) | Fibre | n/a | Front-panel limited | ~15–30 pJ/bit |
| Co-packaged optics on CoWoS (COUPE) | Fibre to package edge | n/a | ~1.6 Tb/s per engine | ~5 pJ/bit or lower (target) |

Every step a signal takes off the package costs roughly 10× in energy per bit. Packaging technology exists to keep the fattest data flows on the top rows.

> **Worked example: the HBM power budget, and why GDDR could not do it.** A B200 has eight HBM3E stacks delivering ~8 TB/s, i.e. 6.4 × 10¹³ bits per second. At a realistic ~3 pJ/bit for the HBM3E interface (DRAM I/O plus PHY over a few mm of interposer wire), running flat out costs 6.4 × 10¹³ × 3 × 10⁻¹² ≈ 190 W, a large but survivable slice of a 1,000 W package, and real workloads rarely sustain peak bandwidth. Delivering the same 8 TB/s from GDDR-class memory over an organic package and PCB at ~7 pJ/bit would be ~450 W for memory traffic alone, before the impossibility of fitting the hundreds of 20+ Gb/s pins along the die edge. HBM4 pushes the other way: it doubles the width to 2,048 bits and holds per-pin speed near 8 Gb/s, giving ~2 TB/s per stack at lower energy per bit, at the cost of ~2× the signal I/Os and a base die on a logic process. More wires, shorter and slower, is the consistent direction.

## CoWoS: A Short History

TSMC's first 2.5D product was not a GPU. In 2011 Xilinx shipped the Virtex-7 2000T, four 28 nm FPGA dies side by side on a passive 65 nm silicon interposer with more than 10,000 die-to-die connections. Xilinx called it Stacked Silicon Interconnect; TSMC generalized the process and in 2012 named it CoWoS. The interposer started at 775 µm and was thinned to ~100 µm to reveal its through-silicon vias; the flow, chip-on-wafer first and then wafer-on-substrate, is the one used for a Blackwell today.

The GPU era began with HBM. AMD's Fiji (Radeon Fury X, 2015) was the first GPU with HBM, but its interposer came from UMC and assembly from ASE. NVIDIA's Tesla P100 (2016) put a 610 mm² GP100 and four HBM2 stacks on CoWoS, and every NVIDIA data-center GPU since (V100, A100, H100, B200, Rubin) has used it, as have Google's TPUs, AMD's MI250/MI300, Broadcom's and Marvell's custom AI ASICs, and Amazon's Trainium. That is how one company's back-end capacity became the industry's bottleneck.

## The Three CoWoS Variants

### CoWoS-S: the silicon interposer

**CoWoS-S** (S for silicon) uses a full-size passive silicon interposer: a 300 mm wafer processed on depreciated 65 nm-class tools, with four or five layers of copper **redistribution layer (RDL)** wiring at 0.4–2 µm line/space, microbump pads on top, and **through-silicon vias (TSVs)** of ~10 µm diameter and ~100 µm depth connecting the front wiring to backside C4 pads. It contains no transistors, but it can contain **deep-trench capacitors** (TSMC's iCAP option, hundreds of nF per mm²) for power-supply decoupling directly under the die, an underappreciated advantage of silicon over organic.

The interposer is much bigger than a reticle. H100's is ~2.5× reticle (~2,100–2,200 mm²); the 2024–2026 generation is 3.3× (~2,800 mm²); TSMC has qualified 5.5× (~4,700 mm², 12 HBM stacks) and roadmapped 9.5× (~8,000 mm² on a 120 × 150 mm substrate) for 2027. Since the stepper exposes 858 mm² at a time, every RDL layer is patterned with multiple stitched exposures: the layout is split into fields, each exposed separately, with wires crossing a boundary drawn with overlap so that a small field-to-field overlay error does not open them. Stitching 0.4 µm lines demands overlay well under 100 nm.

The drawbacks scale with size. A 2,800 mm² interposer means ~16 per wafer, and one killer defect in the RDL or a TSV scraps the whole piece. Silicon (CTE 2.6 ppm/°C) is also a poor thermal-expansion match to the organic substrate below (~10–17 ppm/°C), manageable at H100 scale and increasingly not beyond.

### CoWoS-R: the organic RDL interposer

**CoWoS-R** (R for RDL) replaces the silicon with an organic RDL interposer built with TSMC's InFO fan-out process: polyimide dielectric and copper at ~2 µm line/space, no TSVs, the RDL vias dropping straight to the C4 pads. It is cheaper, better CTE-matched to the substrate, and lower in line capacitance, but has ~5× lower routing density and is harder to keep flat over a large area. It serves products with moderate HBM counts and was the stepping stone to the third variant.

### CoWoS-L: silicon bridges in an organic interposer

**CoWoS-L** (L for local silicon interconnect) is the hybrid: an organic RDL interposer the size of the whole package, with small silicon **LSI (Local Silicon Interconnect)** bridge chiplets embedded exactly where fine-pitch routing is needed, under the edges where a GPU meets an HBM stack or where two GPU dies meet. Each LSI is a few millimetres by ten or so, fabricated on 65 nm-class tools with the same sub-micron RDL as a CoWoS-S interposer, optionally with deep-trench capacitors. Vertical connections for power, ground, and slow signals go through **through-InFO vias (TIVs)**: copper pillars ~100 µm or taller, plated before the mold compound is applied and revealed by grinding.

The interposer is built bottom-up on a carrier: first RDL, TIVs plated in thick photoresist, LSI bridges placed and attached, mold compound applied and ground back to expose TIV and LSI tops, then top RDL layers patterned over everything to reach the microbump pads. Only then are the GPU and HBM dies attached. Silicon has been reduced to the few percent of area where it earns its keep.

NVIDIA's Blackwell B200 is the flagship CoWoS-L product. It needed two ~800 mm² dies with a 10 TB/s **NV-HBI** die-to-die link across their shared edge, plus eight HBM3E stacks. A 3.3× reticle CoWoS-S interposer would have been the most expensive piece of silicon in the package after the GPU dies; bridges cut that cost and removed most of the Si/organic mismatch. It also nearly derailed the product. In mid-2024 TSMC and NVIDIA found that B200 assemblies warped during reflow and thermal cycling: as reported by SemiAnalysis and The Information, the CTE mismatch among GPU dies, LSI bridges, molded RDL interposer, and substrate produced stresses that broke connections at the bridge edges. The fix required a new mask set for the GPU die's top global-routing metal layers and bump-out, plus a redesign of the bridge dies, costing roughly a quarter of ramp (NVIDIA confirmed a "GPU mask" change in August 2024). Blackwell Ultra (B300) and Rubin are on CoWoS-L, and the 5.5× generation for 12-HBM parts was in volume production in 2026 with yields TSMC put above 98% at its 2026 Technology Symposium.

| Variant | Interposer | Min line/space | Max size (2026) | Example products | Relative cost |
|---|---|---|---|---|---|
| CoWoS-S | Full silicon, TSVs | ~0.4 µm | 3.3× reticle in HVM | NVIDIA A100, H100/H200; AMD MI300X and MI350 (with SoIC); Google TPU v4/v5 | High, rising steeply with area |
| CoWoS-R | Organic RDL (InFO) | ~2 µm | ~3× reticle | Lower-I/O AI and networking ASICs | Low |
| CoWoS-L | Organic RDL + embedded LSI + TIVs | ~0.4 µm at bridges, ~2 µm elsewhere | 3.3× and 5.5× in HVM (2026), 9.5× in 2027 | NVIDIA B200/B300/GB200/GB300, Rubin; AMD MI400 (reported) | Medium-high |

## The CoWoS Process Flow, Step by Step

Here is the CoWoS-S flow from bare interposer wafer to tested package, with CoWoS-L differences noted. TSMC's recipes are proprietary; this is the publicly documented sequence and the unit processes underneath it.

### Step 1: Interposer fabrication

The interposer starts as a standard 300 mm, 775 µm prime wafer with no epitaxial layer, since nothing electrical is built in the silicon.

**TSV formation.** A hard-masked pattern of 10 µm holes is etched ~100 µm deep with the **Bosch process** (Module 09): alternating SF6 plasma etch and C4F8 polymer passivation cycles of a few seconds each, repeated hundreds of times, each cycle removing ~0.5–1 µm at the hole bottom while the sidewall stays protected, leaving ~100–200 nm scallops. Lam Syndion and TEL Tactras are the standard tools. A ~200–500 nm SiO2 liner (sub-atmospheric TEOS/ozone CVD, which conforms well down a deep hole) insulates the copper from silicon; a ~20–50 nm TaN barrier and ~100–200 nm copper seed are sputtered in an ionized PVD chamber (Applied Endura) with wafer bias to reach the via bottom, often supplemented with electroless or ALD liners because continuous seed on a scalloped wall 100 µm down is genuinely hard. **Copper electroplating** (Lam SABRE 3D) fills bottom-up using an acid-copper bath with an **accelerator** (SPS) that concentrates at the via bottom, a **suppressor** (PEG-type polyether) that slows deposition on the field, and a **leveler**; a 100 µm via takes on the order of an hour to fill void-free. CMP removes the overburden, and a ~350–400 °C anneal grows the copper grains and forces the **copper pumping** (Cu expands ~6× more than Si, so it extrudes from the via top) to happen now rather than after wiring is built on top.

**RDL formation.** Four or five wiring layers are built by damascene (Module 12): dielectric, trench/via lithography and etch, TaN/Cu seed, plating, CMP. Minimum line/space is ~0.4 µm on the fine layers, coarser on the upper power layers, with ~1–2 µm copper thickness because these lines carry amperes over millimetres. Stitched interposers are exposed field by field. A passivation is opened over the top pads and a Ti/Cu **under-bump metallization (UBM)** formed; in CoWoS the microbumps themselves are on the dies, so the interposer gets flat pads. The wafer is probed for opens and shorts across its thousands of nets, because everything placed on it later is scrapped if it is bad.

For **CoWoS-L**, step 1 becomes: fabricate the small LSI bridges on a separate 65 nm-class wafer, then build the reconstituted interposer on a carrier (RDL, TIV plating, bridge placement, molding, grind-back, top RDL). The result is a 300 mm molded wafer whose front looks like a CoWoS-S interposer to the next step.

### Step 2: Chip-on-Wafer (CoW)

The interposer wafer, with 16 to 30 sites, now receives its dies.

**Bumps on the dies.** GPU dies arrive from wafer sort (Module 14) with **copper pillar microbumps** already formed: a ~20–30 µm copper pillar plated through a resist mask on the die's UBM, capped with ~10–15 µm of SnAg solder (~96.5% Sn / 3.5% Ag), at 40–55 µm pitch. An ~800 mm² GPU carries tens of thousands to over 100,000 of them, mostly power and ground. HBM stacks arrive from SK hynix, Samsung, or Micron as tested known-good stacks with ~55 µm pitch bumps on the base die, at a total height matched by design so that GPU and HBM tops end up nearly coplanar for the lid.

**Placement and joining.** A die bonder places each die face-down with bumps aligned to pads to within a few micrometres using fiducials. **Mass reflow** places all dies with tacky flux and runs the wafer through an oven where SnAg melts at 221 °C (peak ~240–250 °C) and wets the pads by surface tension, self-aligning the die; it is fast and cheap. **Thermocompression bonding (TCB)** instead holds each die under a heated head at ~250–300 °C with controlled force (tens to hundreds of newtons for a large die) for a few seconds, actively flattening the die while the bumps join. TCB tolerates die warpage and fine pitch far better, at a throughput of a few hundred dies per hour per head rather than thousands, and is what large-die CoWoS-L assembly requires. Besi and ASMPT dominate logic TCB; Hanmi's dual-head TC bonders are the standard for HBM stacking at SK hynix.

**Underfill.** A capillary underfill (low-viscosity epoxy loaded with silica) is dispensed along the die edges at ~80–100 °C, wicks into the ~25–35 µm gap, and is cured. It spreads CTE shear stress across the whole die area instead of concentrating it in the outermost joints, which would otherwise fatigue in a few hundred thermal cycles. For the finest pitches a pre-applied **non-conductive film (NCF)** laminated on the die and cured by the TCB head replaces capillary underfill.

**Gap fill and molding.** The wafer is over-molded with epoxy mold compound and ground back so the die backsides are exposed and coplanar. The mold also stiffens the wafer for the next step.

### Step 3: Backside reveal and C4 bumps

The interposer is still 775 µm thick and its TSVs stop 100 µm down. The molded front is bonded to a temporary glass **carrier wafer** with a thermoplastic or laser-release adhesive (Brewer Science, 3M; bonders from EV Group and SUSS). A Disco grinder removes the backside in two stages, coarse then fine, to within a few µm of the TSV tips, and a stress-relief etch or CMP removes the damage layer and the last silicon so the copper ends stand ~1–3 µm proud. A low-temperature (<200 °C, because the front is full of solder and epoxy) PECVD SiN/SiO2 passivation is deposited and polished back to expose the copper. One backside RDL layer fans the TSV pitch out to the **C4 bump** grid, UBM is formed, and C4 solder bumps of ~80–100 µm diameter at ~130–180 µm pitch are plated on: tens of thousands on a 2,800 mm² interposer. The stack is **debonded** (laser through the glass, or thermal slide), cleaned, and inspected. The interposer is now ~100 µm thick under ~1 mm of die and mold; the mold and dies, not the silicon, hold it flat.

### Step 4: Singulation

The wafer is diced into **CoW modules** with a blade or laser (Module 16). At 3.3× reticle one wafer yields ~16, which is why "wafers per month" maps to package counts differently for every product. Each module is tested again; it now contains the most expensive parts in the world, and catching a bad one here is far cheaper than after substrate attach.

### Step 5: Wafer-on-Substrate (oS)

The module is flipped onto the **package substrate** (Module 16): an organic build-up laminate, for a Blackwell-class part on the order of 80–100 mm on a side and ~2–3 mm thick, with a ~1 mm glass-fibre core and 10–12 build-up layers per side of Ajinomoto ABF and copper, from Ibiden, Unimicron, Shinko, Kinsus, or AT&S. The join is standard flip-chip mass reflow (peak ~245 °C), in which tens of thousands of C4 bumps melt and wet simultaneously, followed by capillary underfill under the whole interposer. This step carries the largest CTE mismatch (silicon at 2.6 ppm/°C against organic at 10–17, over 50+ mm), and it is the step TSMC most readily outsources: the "oS" half of CoWoS-S has run at ASE, SPIL, and Amkor since 2023–2024, with TSMC keeping the interposer and CoW in-house.

### Step 6: Stiffener, lid, balls, test

A metal **stiffener ring** is glued around the substrate perimeter against warpage, and a nickel-plated copper **lid** is attached over the dies with **TIM1** between die backs and lid: an indium solder sheet (~80 W/m·K, reflowed at ~160 °C), a filled polymer, or, reportedly for the >1,000 W parts, a liquid-metal gallium alloy. GPU and HBM tops differ in height by tens of µm, so the TIM bond line must be controlled to tens of µm at the hottest die. SAC305 **BGA balls** (~0.6 mm on ~1 mm pitch, several thousand per package) are attached by flux, ball drop, and reflow. The package then goes to final test and burn-in (Module 18). The elapsed time from bare interposer wafer to tested package is on the order of 6–12 weeks, on top of the ~3 months the GPU wafer spent in the front end.

## What Goes Wrong: The Hard Problems

### Warpage

A CoWoS package is a laminate of silicon (2.6 ppm/°C), copper (17), SnAg (~22), epoxy mold (~8–12 below its glass transition, more above), ABF (~15–20 in-plane), a glass-epoxy core (~10–15), and in CoWoS-L polyimide RDL (~20–50). Every reflow takes it from 25 to ~245 °C and back. A 100 mm organic substrate expands ~0.3 mm more than silicon would over that swing, and a 50 mm interposer glued to it must bend to accommodate. The result is warpage that changes sign with temperature: bowed one way at room temperature and the other at reflow, with amplitudes of hundreds of µm. If the surfaces are further apart than the bump height at the corners when the solder freezes, the corner joints open; if the module is domed during oS reflow, the centre C4s squash and bridge. Every step up in reticle multiple (2.5× → 3.3× → 5.5×) requires re-engineered mold compounds, substrate cores (glass cores are arriving for this reason), stiffeners, and reflow profiles. The B200 delay was a warpage failure at the LSI bridge edges, and later NVIDIA designs were reportedly laid out with packaging stress analysis in the loop from the start.

### Thermal

The lid must pass the whole package's heat: ~700 W for H100, 1,000–1,200 W for B200/GB200, ~1,400 W for B300, and reported ~1,800 W for Rubin, rising toward ~3,600 W for four-die Rubin Ultra-class packages. Over ~1,600 mm² of logic that is ~60–110 W/cm² average with hotspots several times higher. TIM1 is the dominant resistance in the stack, and the coplanarity problem means it cannot be made arbitrarily thin. DRAM refresh rates double above ~85 °C, and the HBM sits millimetres from a die dissipating a kilowatt, so the lid must hold the HBM below its limit while the GPU runs at 85–100 °C.

### Bump coplanarity and joint reliability

At 40–55 µm pitch a pillar is ~25 µm across with ~10 µm of solder. Tolerable bump-height variation across an 800 mm² die is a few micrometres; die warpage during bonding is tens of micrometres unless TCB clamps it. Too little solder and a joint opens; too much and neighbours bridge. Afterwards the Cu6Sn5 and Cu3Sn intermetallics between copper and tin grow with every thermal excursion and at 10 µm of solder can consume the joint, embrittling it. Electromigration in a 25 µm pillar carrying tens of milliamps is a real limit, which is why so many bumps are power and ground.

### Known-good die and the impossibility of rework

Every die must be known good before placement, because once microbumps are reflowed and underfilled there is no rework. A B200 assembly carries two ~$500–600 GPU dies (a 4N wafer at ~$16,000–20,000 yields ~30 good candidates), eight HBM3E stacks at ~$300–500 each (24 GB 8-high at the reported ~$13–20 per GB of 2025; 36 GB 12-high stacks are ~$500–700), plus interposer and substrate. One dead HBM stack, or one open microbump in 50,000, scraps an assembly worth ~$5,000–7,000 in parts that would have sold for over $30,000. A 95% CoW yield on a 16-per-wafer product loses nearly a package per wafer, which is why HBM ships as tested known-good stacks, why CoWoS re-tests them anyway, and why Module 18 exists.

### Interposer yield with stitched reticles

A big simple chip still obeys Poisson statistics: at 2,800 mm² and an interposer defect density of even 0.02/cm², naive yield is exp(−0.56) ≈ 57%. Actual yields are much higher because the RDL is coarse and a 65 nm passive process is very clean, but stitching adds a class of failure (CD mismatch and overlay across field boundaries) that a normal die never sees. CoWoS-L is partly a yield play: the fine-pitch silicon is small and high-yielding, and the big organic interposer has nothing finer than 2 µm on it.

## Capacity: The Bottleneck of the AI Era

### The numbers, 2023 to 2026

TSMC's CoWoS capacity was ~10,000–15,000 wafers per month (wpm) at the end of 2023, when H100 lead times reached a year. It doubled to ~30,000–35,000 wpm by end-2024, doubled again to ~75,000–80,000 by end-2025, and the stated plan for end-2026 was 120,000–140,000 wpm, with the supply-demand gap still estimated at 10–20%. Outsourced oS work at ASE, SPIL, and Amkor added on the order of 240,000–270,000 wafers per year by 2026 (Amkor ~180,000–190,000, SPIL ~60,000–80,000). NVIDIA takes an estimated 55–65% of all CoWoS; Broadcom, AMD, Google, Amazon (via Marvell and Alchip), and Microsoft take the rest.

Converting wafers to packages is product-specific: ~29 H100 packages per 2.5× reticle wafer, ~16 B200s per 3.3× CoWoS-L wafer, ~9 per 5.5× wafer. Wafer capacity doubling per year roughly kept pace with interposer area doubling per generation, which is why accelerator unit counts grew more slowly than the headline figures. At ~130,000 wpm and ~16–20 packages per wafer, 2026 capacity supports on the order of 25–30 million AI packages per year.

### Fabs and outsourcing

TSMC's advanced-packaging fabs are separate from its wafer fabs: AP1 (Hsinchu, becoming an R&D fab), AP2 (Tainan, bumping and some CoWoS), AP3 (Longtan, InFO), AP5 (Taichung, the original CoWoS home), AP6 (Zhunan, the 2023–2024 CoWoS expansion), AP7 (Chiayi, a greenfield multi-phase site broken ground in 2024, with its first phase producing from 2026, hosting SoIC and WMCM and slated for the CoPoS panel line), and AP8 (Tainan, a former Innolux LCD plant bought in 2024 and converted quickly because the building existed; at ~96,000 m² it is ~9× the floor area of AP6). Total AP floor space more than tripled from 2022 to 2026. In Arizona, TSMC announced two AP fabs as part of its 2025 US expansion, and Amkor is building a ~$2 billion plant in Peoria for CoWoS-class oS and InFO on TSMC's Arizona wafers, both targeted at ~2027–2028. TSMC's stated policy is to push oS and, increasingly, whole CoWoS-S flows to OSATs so its own AP fabs concentrate on CoW, CoWoS-L, and SoIC.

### What it costs

TSMC does not publish pricing. Analyst estimates (SemiAnalysis, TrendForce, sell-side notes) put a CoWoS-S wafer at ~$6,000–8,000 in 2023 and CoWoS-L at ~$10,000–12,000 or more by 2025, with advanced-packaging prices rising 10–20% per year through 2026. Dividing by 16–29 packages and adding the substrate ($200–500 for a large ABF part), lid, and test gives ~$500–1,500 of assembly cost per GPU package, a low-single-digit percent of selling price but comparable to the logic die's silicon cost. The strategic problem was never price; it was that a $10,000 wafer of packaging gated the sale of sixteen $30,000 GPUs.

## SoIC: Hybrid Bonding and True 3D

CoWoS puts dies side by side. **SoIC (System on Integrated Chips)** is TSMC's brand for stacking dies with **hybrid bonding**: no bumps, no solder, no underfill, just copper pads on one die fused directly to copper pads on the other with the surrounding dielectric fused too, at 9 µm pitch in 2022, 6 µm in production since ~2025, and a roadmap to 4.5 µm (which TSMC's 2026 symposium placed in ~2029) and then 3 and ~2 µm. At 6 µm there are ~28,000 connections per mm², about 55× a 45 µm microbump array (~500 per mm²) and ~250× a 130 µm C4 array, enough to make the interface between stacked dies indistinguishable from a wide on-die bus at ~0.1 pJ/bit.

### The mechanism

1. **Surface preparation.** Both surfaces finish with a damascene copper pad layer, then CMP to nanometre flatness with a controlled copper **dishing** of ~2–5 nm: the pads must sit very slightly below the dielectric (SiO2 or, increasingly, SiCN). Too much dishing and the copper will not meet after anneal; too little and the dielectric will not seal.
2. **Plasma activation.** A brief nitrogen, argon, or oxygen plasma breaks surface Si–O bonds and, after a deionized-water rinse, leaves reactive silanol (Si–OH) groups. SiCN activates to higher bond strength than SiO2 and is a better copper diffusion barrier.
3. **Room-temperature pre-bond.** The surfaces are aligned and touched at one point. Hydrogen bonds form between facing OH groups and a **bond wave** propagates across the interface at centimetres per second with no applied force. The recessed copper pads are not yet touching, so the bond can still be inspected and, for wafers, undone.
4. **Anneal** at ~200–300 °C (down to ~150 °C with SiCN) for about an hour. The Si–OH groups condense to covalent Si–O–Si bridges, releasing water that diffuses away, so the dielectric bond becomes as strong as bulk oxide. The copper, expanding far more than the constraining dielectric and silicon (Cu ~17 vs SiO2 ~0.5 and Si 2.6 ppm/°C), grows out of its recess, touches, and is pressed against its partner; copper atoms interdiffuse and grains grow across the interface, leaving a single piece of copper with a faint line under TEM. No solder, no intermetallics, no gap.

### Chip-on-wafer and wafer-on-wafer

**Wafer-on-wafer (WoW)** bonds two full 300 mm wafers, with the best alignment (~50–100 nm on an EV Group GEMINI or SUSS XBC300) and throughput, but requires identical die layouts and marries good dies to bad ones. It is used where dies are small and yields high: Sony's image sensors (pixel array on logic, since 2016) and 3D NAND periphery-on-array. **Chip-on-wafer (CoW)** places known-good dies one at a time on a target wafer with a die-to-wafer hybrid bonder (Besi's 8800 Chameo series, ASMPT, and the Applied/Besi Kinex cluster that integrates cleaning, activation, placement, and metrology at ~1,600 placements per hour), at ±100–200 nm accuracy. CoW is what logic uses: AMD's 3D V-Cache places a 64 MB SRAM die on a Zen core die, and MI300 places its N5 compute chiplets (XCDs) on N6 I/O dies (IODs) at 9 µm pitch, then puts the stacks and eight HBM3 on a CoWoS-S interposer, the first product to combine SoIC and CoWoS. TSMC also offers a bumped SoIC-P (~18–25 µm) beside the bumpless SoIC-X.

### Why particles and alignment are everything

A hybrid bond has no solder to absorb a defect. A 1 µm particle trapped at the interface forces the surfaces to bend around it, producing an unbonded void hundreds to thousands of times the particle's size, on the order of a millimetre across for thinned silicon, killing every pad inside it. Cleaning, activation, and bonding therefore happen in an ISO Class 1 mini-environment with minimal exposure time, and inline infrared or acoustic inspection (Onto, Camtek, EVG/SUSS inline metrology) finds voids before the anneal. Alignment budgets follow pitch at roughly ±(pitch/20): ±0.3 µm at 6 µm and ±0.1 µm at 2 µm, which is why the roadmap is gated by bonder alignment as much as by process. A 300 mm silicon wafer grows ~0.8 µm across its diameter per degree (2.6 ppm/°C × 300 mm), a full alignment budget at 4.5 µm pitch, so the temperatures of the two wafers or of die and wafer must match to a fraction of a degree.

### Products and the roadmap

AMD's 3D V-Cache (Ryzen 5800X3D, 2022; EPYC Milan-X, Genoa-X) was the first high-volume hybrid-bonded logic product, at 9 µm via SoIC. MI300X/A (2023) combined SoIC and CoWoS-S. Intel's Clearwater Forest Xeon (2025–2026) uses Foveros Direct at ~9 µm. NVIDIA's first SoIC-X use is in the COUPE photonics engines (2025–2026), with GPU logic stacking widely expected in the Rubin Ultra / Feynman timeframe. HBM4 (2026) stayed with microbumps and TC-NCF or MR-MUF joining; hybrid-bonded HBM slipped to HBM4E/HBM5 (~2027–2028) because at 12–16 dies the cumulative particle and alignment risk was not yet worth the height and thermal gains at production yields.

**Interconnect pitch roadmap (approximate first high-volume years):**

| Year | Technology | Pitch | Connections per mm² | Notes |
|---|---|---|---|---|
| 2011–2012 | CoWoS-S microbumps (Xilinx, then GPUs) | 45–55 µm | ~400 | Cu pillar + SnAg, mass reflow |
| 2016 | HBM2 on CoWoS | 55 µm | ~330 | Footprint retained through HBM3E |
| 2019 | Intel Foveros (Lakefield) | 50 µm | ~400 | First high-volume logic-on-logic 3D |
| 2022 | TSMC SoIC (AMD V-Cache) | 9 µm | ~12,000 | First hybrid-bonded logic product |
| 2023 | Intel Foveros (Meteor Lake) | 36 µm | ~770 | Base tile on Intel 22FFL |
| 2024 | Intel Foveros Omni/R | 25 µm | ~1,600 | Practical limit for solder µbumps |
| 2025–2026 | TSMC SoIC-X 6 µm; Foveros Direct 9 µm | 6–9 µm | ~12,000–28,000 | Clearwater Forest, COUPE, MI350-class |
| 2027–2028 | Hybrid-bonded HBM4E/HBM5 pilot; SoIC-X 6 µm mainstream | ~5–6 µm | ~28,000–40,000 | TSMC asked suppliers for ~5 µm HBM stacking |
| ~2029 | SoIC 4.5 µm (TSMC 2026 roadmap) | 4.5 µm | ~50,000 | Needs ±0.2 µm bonder alignment |
| 2030+ | SoIC 3 → 2 µm; UCIe-3D | 2–3 µm | ~100,000–250,000 | Approaches upper-BEOL via density |

## The Competitors: Intel, Samsung, and the OSATs

### Intel: EMIB and Foveros

**EMIB (Embedded Multi-die Interconnect Bridge)** embeds a small silicon bridge with 2–4 fine-pitch RDL layers into a cavity in the organic substrate itself, directly under the edge where two dies meet. The dies use ~55 µm (moving to ~45 µm) bumps over the bridge and ordinary C4 bumps elsewhere, straight onto the substrate: no interposer, no TSVs, and a package as large as the substrate allows. The cost is that the substrate maker must embed silicon in a laminate and build flat layers over it, which only Intel's captive lines and a few partners have mastered. EMIB shipped in Kaby Lake-G (2018), Stratix 10 and Agilex FPGAs with HBM, Sapphire Rapids (four ~400 mm² tiles, plus HBM in Xeon Max), Emerald and Granite Rapids, and Ponte Vecchio (47 tiles, EMIB plus Foveros). Gaudi 3, an Intel product, is reportedly assembled on TSMC 2.5D, a telling data point. **EMIB-T** adds TSVs through the bridge for power delivery and was readied for external customers in 2025–2026.

**Foveros** is Intel's die-on-die stacking: solder microbumps at 50 µm (Lakefield, 2019), 36 µm (Meteor Lake, 2023: Intel 4 compute tile and TSMC N5 graphics tile on a 22FFL base tile with TSVs), 25 µm (Foveros Omni), and **Foveros Direct** hybrid bonding at 9 µm with a roadmap to ~3 µm. Intel Foundry offers all of these to external customers as the alternative to CoWoS, from packaging fabs in Chandler (Arizona), Rio Rancho (New Mexico), and Penang and Kulim (Malaysia), the largest advanced-packaging capacity outside Taiwan. After NVIDIA's $5 billion investment in Intel in September 2025 and the announced co-developed products, Intel packaging for NVIDIA-designed parts became a live possibility, though as of 2026 NVIDIA's GPU volume remains on CoWoS.

### Samsung: I-Cube and X-Cube

Samsung's **I-Cube** is its 2.5D family: I-CubeS on a silicon interposer (I-Cube4 with four HBM in 2021, I-Cube8 since) and I-CubeE with an embedded bridge in molded RDL, its CoWoS-L analogue. **X-Cube** is TSV-based 3D stacking, with a Cu-Cu hybrid-bonded version roadmapped for ~2026–2027. Samsung is the only company making HBM, logic, and packaging in-house and pitches a turnkey AI package; in practice its 2.5D volume has been a small fraction of TSMC's.

### The OSATs: ASE, Amkor, SPIL, JCET

The outsourced assembly houses build 2.5D-class flows on fan-out RDL rather than silicon interposers, since they lack 300 mm front-end fabs. ASE's **FOCoS** (Fan-Out Chip on Substrate) puts dies on a ~2 µm line/space fan-out RDL interposer, and **FOCoS-Bridge** embeds a silicon bridge under die edges, a direct CoWoS-L analogue; ASE's **CoWoP** (chip-on-wafer-on-PCB) proposal drops the ABF substrate and mounts the CoW module on a large fine-line PCB. Amkor's **S-SWIFT** and **S-Connect** are the equivalents. ASE (which owns SPIL) and Amkor are also TSMC's designated overflow for CoWoS oS and, from 2025, some CoWoS-S CoW. JCET's XDFOI is the Chinese equivalent, relevant because 2.5D assembly of domestically fabbed dies is one of the few scaling paths open to Huawei and its foundry partners, and packaging is not export-controlled the way EUV is.

## Fan-Out and the Move to Panels

**Fan-out wafer-level packaging (FOWLP)** builds the package wiring directly on dies embedded in a molded, reconstituted wafer, so the wiring fans out past the die edges with no substrate. TSMC's **InFO (Integrated Fan-Out)** entered volume with Apple's A10 in the iPhone 7 (2016) as **InFO-PoP**: the A10 in mold with two RDL layers beneath and TIVs (the same pillars used in CoWoS-L) up through the mold so the LPDDR package could sit on top in under 1 mm total height. Every A-series and M-series chip since has used an InFO variant, TSMC's second-largest AP business. **InFO-oS** puts a fan-out package on a substrate for networking and HPC parts; **InFO-L / InFO-LSI** adds an embedded bridge (Apple's UltraFusion, joining two M1 Max dies at 2.5 TB/s, is InFO-LSI); **InFO-SoW** skips dicing and builds a full 300 mm wafer of dies with fan-out RDL, used by Tesla's Dojo D1 tile (25 dies, 2021) and productized as **TSMC-SoW** (2024) and **SoW-X** (CoWoS-based, ~40× the compute of one CoWoS package, announced for 2027).

The next structural change is the substrate shape. A round 300 mm wafer fits 16 of a 3.3× reticle rectangle and only 9 or 4 of the 5.5× and 9.5× sizes, with large edge waste; a rectangular **panel** wastes almost nothing. TSMC's **CoPoS (Chip-on-Panel-on-Substrate)** moves the CoWoS-L flow onto panels: a 310 × 310 mm pilot line was completed in mid-2026 (reportedly at its VisEra/Visionchip subsidiary in Longtan), with a 510 × 515 mm production format (~3.7× the area of a 300 mm wafer, matching the ABF substrate panel standard) planned for volume at AP7 Chiayi in ~2028–2029. The tool set changes: large-field projection or laser-direct-imaging lithography (KLA/Orbotech, Onto JetStep, Canon panel steppers), panel plating and CMP (SCHMID, MKS/Atotech, Ebara), and display-style handling. Intel, Samsung, and ASE announced panel lines on similar timelines, and glass-core substrates (Intel, Absolics/SKC, Corning), with CTE tunable to ~3–9 ppm/°C and flatness allowing finer lines than ABF, are expected to arrive with them. Panel-level packaging is where this module's 2.5D flow and Module 16's substrate flow converge.

## The Chiplet Paradigm

A **chiplet** is a die designed from the start as one component of a package, with a defined **die-to-die (D2D)** interface. B200 is two chiplets; MI300X is twelve (8 XCDs, 4 IODs) plus 8 HBM; Ponte Vecchio was 47; AMD's EPYC Genoa is 13 (12 CCDs plus an IOD) on a plain organic substrate, proof that chiplets need 2.5D only when the D2D bandwidth demands it.

### Die-to-die PHYs

- **UCIe (Universal Chiplet Interconnect Express)**, the open standard published in March 2022 by Intel, AMD, Arm, TSMC, Samsung, ASE, Google, Meta, Microsoft, Qualcomm, and later NVIDIA. UCIe 1.x defines a **standard package** PHY for organic substrates (100–130 µm bump pitch, 16 lanes per module, up to 32 GT/s per lane, ~28–224 GB/s per mm of edge, ~0.5 pJ/bit target) and an **advanced package** PHY for interposers and bridges (25–55 µm pitch, 64 lanes per module, ~165–1,300 GB/s/mm at 45 µm and 32 GT/s, ~0.25 pJ/bit target, ~2 ns latency). UCIe 2.0 (2024) added **UCIe-3D** for hybrid-bonded stacks at ≤ 10 µm pitch, measured in areal bandwidth; UCIe 3.0 (2025) raised lanes to 48–64 GT/s. The protocol layer carries PCIe, CXL, or raw streaming.
- **NVIDIA NV-HBI**, the proprietary link between the two Blackwell dies: 10 TB/s aggregate (both directions combined) across a ~30 mm shared edge, i.e. ~330 GB/s per mm of edge, over the CoWoS-L bridge, presenting the pair to software as one GPU with a coherent L2. Rubin uses a scaled successor.
- **AMD Infinity Fabric** on-package: over organic substrate for Ryzen/EPYC CCD-to-IOD links (~2 pJ/bit), and over SoIC and CoWoS in MI300, where the XCD-to-IOD interface is a wide, slow hybrid-bonded bus and IOD-to-IOD links run through the interposer at several TB/s aggregate.
- **Intel AIB (Advanced Interface Bus)**, the 55 µm-pitch, ~2 Gb/s-per-lane parallel interface open-sourced in 2018, a direct ancestor of UCIe's advanced PHY; plus **Apple UltraFusion** (2.5 TB/s over InFO-LSI) and the **OCP Bunch of Wires** open PHY for organic substrates.

> **Worked example: microbumps and I/O for one HBM stack.** An HBM3E stack has a 1,024-bit data interface as 16 channels of 64 bits (32 pseudo-channels of 32). Each pseudo-channel needs a differential strobe pair and per-byte parity or data-bus-inversion bits, each channel a command/address bus (~14 lines), a clock pair, and control lines. Roughly: 1,024 data + ~128 DBI/parity + ~64 strobes + ~220 address and control across 16 channels + ~100 miscellaneous (IEEE 1500 test port, temperature and status, redundancy, direct-access pins) gives on the order of 1,500–1,800 signals. Power and ground bumps in a wide I/O interface equal or exceed the signal count for return-path and supply-impedance reasons, so the JEDEC footprint carries ~5,000–6,000 microbumps per stack at ~55 µm pitch: 6,000 × (0.055 mm)² ≈ 18 mm² of bump array on the base die. HBM4, with 2,048 data bits, roughly doubles the signal count on a denser map. Eight stacks therefore contribute ~45,000 microbumps and ~13,000 signal traces to a Blackwell interposer, all routed at sub-µm pitch into the GPU edge within ~5–10 mm. A whole Zen 4 CCD, for comparison, talks to its IOD over about 200 signal pins.

### The economics

Chiplets pay off through yield, reuse, and node mixing. The full accounting must also include the package (a CoWoS-L assembly is not free), the D2D PHY area on each chiplet (a UCIe advanced module is ~0.4 mm² per 64 lanes; NV-HBI at 10 TB/s occupies a strip along the whole die edge, a few percent of the die), and the power of moving data off-die. Reuse sells chiplets in CPUs: AMD uses one CCD across desktop, workstation, and server parts and one IOD per generation, amortizing mask sets and validation over far more units. Node mixing sells them in accelerators: compute dies go on N3/N2 while the I/O die with its analog SerDes and PHYs stays on N6/N5, where those circuits are cheaper and better characterized. The consequence for this course is that the GPU is no longer a chip TSMC makes and someone else packages; the package is the product, and its cost is dominated by this module and Module 15.

> **Worked example: two 400 mm² chiplets versus one 800 mm² die.** Take a 300 mm N4-class wafer at $17,000 with D0 = 0.1/cm². Monolithic 800 mm² (26 × 31 mm): ~68 gross candidates; yield exp(−0.8) = 44.9%, so ~31 good dies, ~$550 each. Two 400 mm² chiplets (20 × 20 mm), each with a D2D PHY strip adding ~5% area (420 mm²): ~140 gross candidates; yield exp(−0.42) = 65.7%, so ~92 good dies at ~$185, or $370 per pair. Add the assembly penalty: one more placement and a bridge, and compound yield of 97.5% (99% per placement, 99.5% for the link) versus 99% for one die, i.e. ~$40 more expected scrap on a $2,500 assembly. Net ~$410 for the pair versus ~$550 monolithic, a ~25% silicon saving, before noting that a 1,600 mm² "Blackwell as one die" could not be printed at any yield. Real designs harvest (sell 800 mm² dies with a few SMs disabled), which narrows the gap, and chiplets pay ~0.3 pJ/bit on every D2D bit. The decision is closer than naive yield math suggests, which is why NVIDIA stayed monolithic through Hopper and split only when the reticle forced it.

> **Worked example: interposer area and stitched reticles for a B200-class package.** Two ~800 mm² GPU dies (about 26 × 31 mm, long edges facing so NV-HBI runs along ~30 mm of shared edge) plus eight HBM3E stacks of ~11 × 12 mm ≈ 130 mm²: 1,600 + 1,040 = 2,640 mm² of die. Add ~1 mm HBM-to-GPU gaps, ~1–2 mm between HBM stacks, and ~2 mm of margin for C4 fan-out and the dicing street; two rows of four HBM flanking the GPUs gives roughly 48 × 58 mm ≈ 2,800 mm², or 2,800 / 858 ≈ 3.3 reticles, the widely reported Blackwell figure. Since the field is 26 × 33 mm, each RDL layer of a 48 × 58 mm interposer needs a 2 × 2 array of stitched exposures (covering 52 × 66 mm with overlapping edges), so a five-layer RDL is twenty stitched fields per interposer, each stitch line held to the tolerance of the 0.4 µm lines crossing it. A 300 mm wafer (~70,700 mm²) fits ~16 such rectangles after edge exclusion, versus ~29 for H100's 2.5× interposer. The 5.5× generation (~4,700 mm², ~60 × 78 mm) needs a 3 × 3 array and fits ~9 per wafer; 9.5× (~8,100 mm², ~75 × 108 mm) fits ~4, which is the arithmetic pushing TSMC to panels.

## Thermal Management for 2.5D: The Handoff to the Rack

The package's job ends at the lid surface. A 1,000–1,800 W package with an ~80 × 80 mm lid must present a flat, low-resistance face to a cold plate. The stack from transistor to coolant is junction → die silicon (~0.7 mm, ~150 W/m·K) → TIM1 (indium or liquid metal, ~50–80 W/m·K effective across 50–100 µm) → copper lid (2–3 mm) → TIM2 (grease or pad, the weakest link unless the module is engineered as a unit) → cold plate → water at ~25–45 °C inlet. Each interface adds ~0.01–0.03 K/W, for a junction-to-coolant resistance on the order of 0.05–0.1 K/W: at 1,200 W that is 60–120 °C of rise, hence 45 °C water and ~85–100 °C junction targets with HBM held under ~85–95 °C. Vapor chambers in the lid spread hotspots; direct-to-chip liquid cooling (GB200 NVL72 has cold plates on every GPU and CPU, rejecting ~120 kW per rack) is mandatory from Blackwell on. Module 19 picks up at the cold plate.

## Co-Packaged Optics on CoWoS

Pluggable optical transceivers at the front of a switch burn ~15–30 pJ/bit and cost hundreds of dollars each; a 51.2 Tb/s switch with 64 × 800G ports spends more power in optics than in its ASIC. **Co-packaged optics (CPO)** moves the optical engine onto the switch package so the electrical link from ASIC to modulator is millimetres of interposer rather than centimetres of PCB and a connector. TSMC's **COUPE (Compact Universal Photonic Engine)** hybrid-bonds a 65 nm electrical IC (drivers, TIAs, control) onto a silicon photonic IC (microring modulators, waveguides, photodetectors) with SoIC-X, then places the engines around the switch die on a CoWoS interposer with fibre attach at the package edge. NVIDIA's **Quantum-X Photonics** InfiniBand switches (144 ports × 800 Gb/s, announced for late 2025 and shipping in 2026) and **Spectrum-X Photonics** Ethernet switches (up to 512 × 800 Gb/s, 2026) are the first products: 200 Gb/s per lane microrings, 1.6 Tb/s per engine, external lasers, and NVIDIA's claim of 3.5× better power efficiency and ~4× fewer lasers than pluggables. Broadcom's Tomahawk CPO parts take a similar path. Optical NVLink out of the GPU package is the stated direction for the late-2020s scale-up fabric, which will make this module's flow the home of lasers, waveguides, and fibre alignment as well as copper.

## Equipment: Who Makes the Tools

Advanced packaging borrows the front end's lithography, plating, CMP, etch, and PVD tools (Applied, Lam, TEL, plus older Canon, Nikon, and ASML steppers for interposer RDL) and adds a back-end tool set of its own:

| Step | Tools and leading suppliers |
|---|---|
| TSV etch, liner, barrier/seed, fill | Lam Syndion, TEL Tactras (Bosch DRIE); Applied Producer and Endura; Lam SABRE 3D (Cu ECD) |
| Temporary bond / debond | EV Group, SUSS MicroTec, TEL; adhesives from Brewer Science, 3M |
| Backgrind, TSV reveal, dicing | Disco (~70% share), Okamoto |
| Die attach: mass reflow and TCB | Besi (8800 Ultra, leader in logic TCB), ASMPT, Hanmi (HBM TC bonders, ~$1–2 M each), K&S |
| Hybrid bonding, die-to-wafer | Besi 8800 Chameo (~80% share, ~$1.5–3 M per tool), Applied/Besi Kinex cell (2025), ASMPT, SET, Hanmi and Hanwha for HBM |
| Hybrid bonding, wafer-to-wafer | EV Group GEMINI FB XT, SUSS XBC300 (a duopoly) |
| Molding, reflow, underfill | Towa, Besi, ASMPT (mold); BTU, Heller (ovens); Nordson ASYMTEK, Musashi (dispense) |
| Inspection and metrology | Onto Innovation Dragonfly (~40% of AP inspection), Camtek Eagle, KLA; Nordson/Sonoscan (acoustic); Zeiss and Hitachi (X-ray CT) |
| Panel-level lithography and plating | KLA/Orbotech, Onto JetStep, Canon; SCHMID, MKS/Atotech, Ebara |
| Test | Advantest, Teradyne ATE; FormFactor, Technoprobe probe cards; KYEC test house (Module 18) |

Doubling CoWoS from ~35k to ~80k wpm in 2025 required on the order of a thousand new back-end tools, and made Besi, Disco, Onto, Camtek, and Hanmi some of the best-performing equipment stocks of the AI cycle despite each being a fraction of ASML's size.

## Key Numbers

| Quantity | Value |
|---|---|
| Lithography reticle limit | 26 × 33 mm = 858 mm² (High-NA EUV: 26 × 16.5 mm = 429 mm²) |
| Poisson yield, 800 vs 400 mm² die at D0 = 0.1/cm² | ~45% vs ~67% |
| HBM3E interface per stack | 1,024 data bits; ~1,500–1,800 signals; ~5,000–6,000 µbumps at ~55 µm pitch |
| Organic substrate vs Si interposer line/space | ~8–15 µm vs 0.4–2 µm (20–50× density gap) |
| CoWoS-S interposer TSV | ~10 µm diameter × ~100 µm deep; interposer thinned to ~100 µm |
| Interposer RDL | 4–5 Cu damascene layers, 0.4–2 µm line/space, 65 nm-class tools |
| Microbump pitch (die to interposer) | 40–55 µm, Cu pillar + SnAg; tens of thousands to >100k per GPU die |
| C4 pitch / BGA pitch | ~130–180 µm / ~1 mm, several thousand balls per package |
| Interposer size by generation | H100 ~2.5× reticle (~29 per wafer); B200 ~3.3× (~2,800 mm², ~16); 5.5× (~4,700 mm², ~9, 12 HBM) in HVM 2026 at >98% yield; 9.5× (120 × 150 mm substrate) in 2027 |
| TSMC CoWoS capacity | ~15k wpm end-2023 → ~35k end-2024 → ~75–80k end-2025 → 120–140k target end-2026 |
| Outsourced CoWoS (oS) volume 2026 | ~240–270k wafers/year (Amkor ~180–190k, SPIL ~60–80k) |
| CoWoS wafer price (analyst estimates) | ~$6–8k CoWoS-S (2023); ~$10–12k+ CoWoS-L (2025); ~$500–1,500 assembly per GPU package |
| Hybrid bonding pitch | 9 µm (2022) → 6 µm (2025–26) → 4.5 µm (~2029 per TSMC) → 2–3 µm (2030+); ~28,000/mm² at 6 µm (~55× a 45 µm microbump array) |
| Hybrid bond process | Anneal ~200–300 °C (~150 °C with SiCN); alignment ±0.1–0.3 µm; 1 µm particle → ~mm void |
| Energy per bit | On-die ~0.01–0.1 pJ; hybrid bond ~0.1; 2.5D/UCIe-A ~0.25–0.6; HBM ~2.5–4; board SerDes ~5–10; pluggable optics ~15–30 |
| UCIe bump pitch | Standard 100–130 µm; advanced 25–55 µm; UCIe-3D ≤ 10 µm |
| NV-HBI (Blackwell) | 10 TB/s aggregate, ~330 GB/s per mm of shared edge each way |
| Package power | H100 ~700 W; B200/GB200 1,000–1,200 W; B300 ~1,400 W; Rubin ~1,800 W (reported) |
| CTE | Si 2.6 ppm/°C; Cu 17; SnAg ~22; ABF/organic ~10–20 |
| CoPoS panels | 310 × 310 mm pilot 2026; 510 × 515 mm HVM ~2028–29 at AP7 Chiayi |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| TSMC | Taiwan | CoWoS-S/R/L, SoIC, InFO, CoPoS, COUPE; AP fabs AP2/3/5/6/7/8 and Arizona | Dominant (>80% of high-end 2.5D/3D) |
| NVIDIA | USA | ~55–65% of CoWoS capacity; NV-HBI; Blackwell/Rubin on CoWoS-L | #1 customer |
| AMD | USA | MI300/MI350 on SoIC + CoWoS; 3D V-Cache; Infinity Fabric | #2 accelerator customer; hybrid-bonding pioneer |
| Broadcom / Marvell / Alchip / MediaTek | USA / USA / Taiwan / Taiwan | Custom AI ASICs on CoWoS for Google, Meta, Amazon, Microsoft | Major CoWoS consumers |
| Intel (Intel Foundry) | USA | EMIB, EMIB-T, Foveros, Foveros Direct; AP fabs in Arizona, New Mexico, Malaysia | Only full-stack alternative to TSMC |
| Samsung | South Korea | I-Cube (2.5D), X-Cube (3D); HBM + logic + packaging turnkey | #3 in advanced packaging |
| ASE (incl. SPIL) | Taiwan | CoWoS oS overflow, FOCoS, FOCoS-Bridge, CoWoP | #1 OSAT |
| Amkor | USA | CoWoS oS overflow, S-SWIFT/S-Connect, Arizona plant (~2027–28) | #2 OSAT |
| JCET | China | XDFOI fan-out and 2.5D for domestic AI chips | #3 OSAT; China's main option |
| SK hynix / Samsung / Micron | South Korea / South Korea / USA | HBM3E/HBM4 known-good stacks | ~50–60% / ~20–35% / ~15–21% of HBM (2025–26) |
| Ibiden / Unimicron / Shinko / Kinsus / AT&S | Japan / Taiwan / Japan / Taiwan / Austria | High-layer-count ABF substrates (film from Ajinomoto) | Leaders in large AI substrates |
| Besi | Netherlands | TCB and die-to-wafer hybrid bonders (Applied holds ~9%) | ~80% of hybrid bonding |
| ASMPT / Hanmi / Hanwha | Singapore-HK / South Korea | TCB and die bonders; HBM TC bonders | #2 in TCB / leaders in HBM TCB |
| EV Group / SUSS MicroTec | Austria / Germany | Wafer-to-wafer bonders, temporary bonding, activation | Duopoly in W2W |
| Applied Materials / Lam Research | USA | TSV etch, PVD, plating, CMP; Kinex hybrid bonding cell (with Besi) | Front-end leaders extending into AP |
| Disco | Japan | Grinders, dicing saws, laser dicing | ~70% share |
| Onto Innovation / Camtek / KLA | USA / Israel / USA | AP inspection and metrology | Onto leader (~40%), Camtek #2 |

## Common Misconceptions

- **"CoWoS is just a fancier way of putting a chip in a package."** → CoWoS builds a second, wire-only chip (the interposer) on a 300 mm wafer with front-end damascene and TSV processes, then assembles the product on that wafer. It is a fab process with a back-end finish, which is why OSATs could not simply copy it and why TSMC controls it.
- **"The silicon interposer is the expensive part, so CoWoS-L must be cheap."** → CoWoS-L replaces the big interposer with organic RDL plus small bridges but adds TIV plating, molding, grind-back, and the hardest warpage problem in the industry; its wafer price is higher than CoWoS-S's. It exists because a 3.3×+ silicon interposer would be worse, not because it is easy.
- **"Hybrid bonding is a finer-pitch microbump."** → There is no solder, bump, underfill, or gap. Copper pads fuse into single grains by thermal expansion during anneal and the dielectric bonds covalently around them. That is why it reaches 6 µm and below, has no intermetallic reliability limit, and dies from a single micrometre particle.
- **"TSMC's AI bottleneck was wafer capacity."** → Front-end N4/N3 capacity could have supported roughly ten times the accelerator volume shipped in 2023–2025. The constraints were CoWoS wafers per month (15k → 80k), HBM stacks, and to a lesser degree ABF substrates.
- **"Chiplets are always cheaper than a big die."** → Yield math favours them, but D2D PHY area, ~0.25–0.5 pJ/bit of link power, extra assembly steps, and compound assembly yield eat much of the gain. NVIDIA stayed monolithic until the reticle forced a split; AMD split Ryzen for reuse across products as much as for yield.
- **"HBM4 uses hybrid bonding."** → As of 2026 production HBM4 still stacks DRAM with microbumps and TC-NCF or MR-MUF; hybrid-bonded HBM is planned for HBM4E/HBM5 (~2027–28). The HBM-to-GPU interface has always been microbumps on an interposer.

## Where This Fits in the Supply Chain

This module consumes the outputs of Modules 14, 15, and 16: known-good GPU dies from wafer sort with copper-pillar microbumps already formed, known-good HBM stacks from SK hynix, Samsung, and Micron, and the large ABF build-up substrates from Ibiden, Unimicron, and their peers, plus an interposer that TSMC fabricates itself on 65 nm-class tools using the TSV, damascene, and CMP processes of Modules 09 and 12. It produces the single most valuable component in the chain, a lidded, ball-attached CoWoS package with two GPU dies and eight HBM stacks, worth ~$5,000–7,000 in parts and $30,000+ at sale, and it is the stage whose monthly throughput has set the ceiling on AI accelerator supply since 2023. The package goes to final test, burn-in, and system-level test in Module 18, where yield fallout at each assembly stage is counted, and then to the SXM module, HGX baseboard, and GB200/Rubin NVL rack of Module 19, where the cold plate on this module's copper lid becomes the first component of a 120 kW liquid-cooled rack.

## Further Reading

- John H. Lau, *Semiconductor Advanced Packaging* (Springer, 2021) and *Chiplet Design and Heterogeneous Integration Packaging* (Springer, 2023): the most complete engineering references on CoWoS, InFO, fan-out, and hybrid bonding. Rao R. Tummala, *Fundamentals of Microsystems Packaging* (McGraw-Hill, 2001) for the foundations.
- TSMC, "3DFabric" technology pages (CoWoS, InFO, SoIC) at tsmc.com, and the 2024–2025 Technology Symposium and OIP presentations laying out the 5.5×/9.5× reticle CoWoS-L, SoW-X, CoPoS, and COUPE roadmaps.
- Xilinx, "Xilinx Stacked Silicon Interconnect Technology Delivers Breakthrough FPGA Capacity, Bandwidth, and Power Efficiency" (white paper WP380), the original description of the first CoWoS product.
- SemiAnalysis (semianalysis.com), the CoWoS and advanced-packaging series (2023–2025), including the CoWoS-L / Blackwell warpage analysis and packaging cost breakdowns; TrendForce and Silicon Analysts CoWoS capacity trackers (2024–2026).
- Intel, "Embedded Multi-die Interconnect Bridge (EMIB)" and "Foveros" technology briefs at intel.com, and the Ponte Vecchio and Meteor Lake papers at ISSCC 2022 and Hot Chips 2022–2023.
- UCIe Consortium, *Universal Chiplet Interconnect Express Specification* 1.1, 2.0, and 3.0 (uciexpress.org), especially the PHY chapters with bump-pitch and bandwidth-density tables.
- IEEE Electronic Components and Technology Conference (ECTC) proceedings, 2020–2025, the primary venue for TSMC, Intel, Samsung, AMD, Besi, and EVG papers on CoWoS, SoIC, hybrid bonding, and warpage.
- Semiconductor Engineering (semiengineering.com), articles on hybrid bonding, panel-level packaging, and HBM4 bonding choices (2024–2026).
- NVIDIA, "NVIDIA Blackwell Architecture Technical Brief" (2024) and the GTC 2025 Spectrum-X / Quantum-X Photonics announcement, for NV-HBI and CPO specifics.
- SemiAnalysis, "AI Capacity Constraints - CoWoS and HBM Supply Chain" and "Nvidia's Blackwell Reworked - Shipment Delays & GB200A Reworked Platforms" (2024), on the CoWoS bottleneck and the B200 CoWoS-L redesign; Tom's Hardware, "The current state of Hybrid Bonding in 2026" and "TSMC SoIC 3D stacking roadmap outlines path from 6-micron pitches today to 4.5-micron in 2029" (2026).
