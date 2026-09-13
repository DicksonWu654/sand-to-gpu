# Module 15: Memory: DRAM, NAND and HBM Manufacturing

A Blackwell B200 GPU can chew through roughly 8 TB/s of data. No DRAM chip on a circuit board can feed that. A DDR5 DIMM delivers ~ 50–70 GB/s; you would need well over a hundred of them, and the power spent just moving bits across the board would exceed the power of the GPU itself. The reason an AI accelerator works at all is that ~ 180–290 GB of DRAM sits within a few millimetres of the compute die, stacked eight, twelve or sixteen dies high and wired through with thousands of vertical copper vias. That product, **HBM (High Bandwidth Memory)**, is the single most supply-constrained component of the AI build-out after CoWoS packaging, and it is made by a manufacturing flow that starts as ordinary DRAM and then becomes something closer to advanced packaging than to chipmaking.

This module covers the three memory technologies that matter for the GPU story. **DRAM (Dynamic Random-Access Memory)** is the working memory: one transistor, one capacitor, refreshed every few tens of milliseconds. **NAND flash** is the persistent storage: a charge-trapping transistor, now built as a vertical string hundreds of layers tall. **HBM** is DRAM re-engineered for stacking. In memory the cell, not the transistor, is the unit of design; cost per bit, not performance per watt, is the metric; and three companies, Samsung, SK hynix and Micron, make ~ 95% of the world's DRAM.

## 1. Why memory is a different business from logic

A logic fab (Modules 05–13) builds ~ 15–18 metal layers on top of a few hundred million transistors per mm², every one of which can be different. A DRAM fab builds a single, ferociously optimized structure, the memory cell, repeated tens of billions of times, and then wraps it in a modest amount of peripheral CMOS. A 16 Gb DDR5 die has ~ 17.2 billion cells and only 3–4 metal layers. The cell array occupies 55–65% of the die; the rest is sense amplifiers, decoders, I/O and the die seal ring.

The consequences run through everything in this module:

- **Cost per bit is the only score.** DRAM and NAND are commodities with published spot prices. A 10% shrink in cell area that costs 12% more process steps is a loss. This is why memory makers adopted EUV years after TSMC, and why 3D NAND, which grows vertically with the same lithography, replaced planar NAND rather than shrinking it further.
- **The array is a periodic structure.** Periodic gratings are what lithography does best; the DRAM cell array is patterned at pitches (~ 30 nm word-line pitch) that logic fabs only reach with SAQP or EUV, but with far simpler shapes.
- **The critical tools are different.** A leading-edge DRAM fab is dominated by ALD (Atomic Layer Deposition) and high-aspect-ratio (HAR) dielectric etch, because the storage capacitor is a hole 40 times deeper than it is wide; a 3D NAND fab is dominated by PECVD (for the 300-layer oxide/nitride stack) and HAR etch (for the channel holes). Neither has much use for a 15-layer copper BEOL.
- **Volume dwarfs logic.** Industry DRAM wafer starts are on the order of 1.6–1.9 million 300 mm wafers per month (as of ~ 2025), NAND similar; TSMC's total across all nodes is ~ 1.3–1.4 million.

## 2. DRAM

### 2.1 The 1T1C cell and why the capacitor must be so large

A DRAM bit is stored as charge on a capacitor, gated by a single access transistor: the **1T1C cell**. The transistor's gate is the **word line (WL)**; its drain is the **bit line (BL)**; its source is the capacitor's bottom electrode (the **storage node**). The capacitor's top electrode is a common plate held at VDD/2.

To read a cell, the bit line is first **precharged** to VDD/2 and left floating. The word line is raised (to a boosted voltage VPP well above VDD ~ 1.1 V; the external VPP rail is 2.5 V for DDR4 and 1.8 V for DDR5, with the word-line high level set internally, so the access transistor passes a full VDD without a threshold drop). The storage capacitor Cs and the bit-line capacitance Cbl now share charge. The bit line moves by

ΔV = (VDD/2) × Cs / (Cs + Cbl)

toward VDD if the cell held a "1" or toward 0 if it held a "0". A **sense amplifier**, a cross-coupled pair of CMOS inverters connected between this bit line and a reference bit line, is then enabled and amplifies the small difference to full rail. Because charge sharing destroys the stored value, the sense amplifier's full-rail output is written back through the still-open word line before it is closed. This is the **destructive read** that makes DRAM "dynamic," together with the fact that the capacitor leaks and must be **refreshed** (read and rewritten) every **64 ms** (32 ms above 85 °C per JEDEC, and HBM stacks typically run in this 2× refresh regime, which is a real thermal tax).

> **Worked example: the sense-amp signal.** A modern cell has Cs ≈ 12 fF. A bit line is a ~ 20 nm-wide tungsten line running past ~ 500–1,000 cells, with Cbl ≈ 30–40 fF including the sense-amp input. With VDD = 1.1 V: ΔV = 0.55 V × 12 / (12 + 35) ≈ 140 mV. Sense amplifiers need a margin above their offset (~ 20–40 mV from transistor mismatch) plus noise from adjacent bit lines switching, so the industry's practical floor is ΔV ≳ 60–80 mV, or Cs ≳ 6–10 fF. If Cs fell to 3 fF, ΔV would be ~ 43 mV and the array would fail. This is why the capacitor cannot shrink with the cell footprint. Every DRAM node since ~ 2005 has therefore held Cs roughly constant at 10–20 fF while the footprint shrank from ~ 0.02 µm² to ~ 0.001 µm²; the only way to do that is to build upward.

### 2.2 6F² layout and the buried word line

Cell area is expressed in units of **F**, the minimum feature (half-pitch) of the process. Early DRAM used an **8F²** cell; since the late 2000s (Micron first, at ~ 78 nm in 2006; Qimonda's buried-word-line 6F² cell followed in 2008 and became the industry template) the industry uses **6F²**: the cell is 2F wide (one bit-line pitch) by 3F long. In a 1β-class process with F ≈ 12–13 nm, a cell is ~ 25 × 38 nm ≈ 0.0010 µm², and a 16 Gb die packs its 17.2 billion cells into ~ 35–40 mm² of array on a ~ 60–70 mm² die.

The 6F² cell only works because the access transistor is buried. The **buried word line (bWL)**, also called the **buried-channel array transistor (BCAT)** or **recessed-channel array transistor (RCAT)**, is made by etching a trench ~ 150–200 nm deep into the silicon along each word line, lining it with gate oxide (~ 5 nm, thermally grown or ALD) and a TiN work-function metal, filling it with tungsten (or, at newer nodes, a low-resistance metal such as Mo or Ru under evaluation), recessing the metal below the silicon surface, and capping it with SiN. The channel wraps around the bottom of the trench: a U shape. Two things are gained. The **effective channel length is ~ 2–3× the lithographic length**, which suppresses short-channel leakage, and the gate is below the surface, which reduces word-line-to-bit-line capacitance and frees the surface for the bit-line and storage-node contacts. The active areas are laid out as tilted islands (~ 20–30° off the word-line direction) so that each island crosses two word lines and one bit-line contact sits in the middle with a storage-node contact at each end.

Above the transistor: the bit line (tungsten with a TiN liner on a poly plug, ~ 20 nm wide, capped with SiN), then the **storage node contacts (SNC)** and **landing pads** that fan out from the tight SNC pitch to the capacitor bottom. All of this sits under the capacitor in the architecture every current DRAM uses, **capacitor-over-bitline (COB)**.

### 2.3 The storage capacitor

The capacitor is the tallest, narrowest structure in any commercial chip. In a 1α/1β cell it is a cylinder or pillar ~ 1.0–1.5 µm tall and ~ 30–40 nm in outer diameter, an aspect ratio of 40 or more, and there are ~ 17 billion of them on a die, each within a few nanometres of its neighbours.

The dielectric is **ZAZ**: ZrO2 / Al2O3 / ZrO2, deposited by ALD, with a total physical thickness of ~ 5–7 nm and an **equivalent oxide thickness (EOT)** of ~ 0.5–0.6 nm. Tetragonal ZrO2 has a dielectric constant of ~ 35–40; the thin Al2O3 (~ 0.5 nm, k ≈ 9) interlayer breaks the ZrO2 crystallinity to stop grain-boundary leakage paths, at a small cost in overall k. Both electrodes are **TiN** deposited by ALD (TiCl4 + NH3 at ~ 400–500 °C), ~ 3–5 nm thick, chosen because it is conformal, conductive, and has a high enough work function (~ 4.7 eV) to suppress electron injection into the ZrO2. The top electrode is thickened with doped SiGe or W to form the common plate. Research capacitors use higher-k dielectrics (SrTiO3, HfO2-ZrO2 ferroelectric/antiferroelectric stacks) and Ru or Nb electrodes; as of ~ 2025 ZAZ/TiN remains what ships.

> **Worked example: capacitance from geometry.** A cylinder capacitor ~ 1.2 µm tall with a 35 nm outer diameter and 3 nm-thick TiN bottom electrode has both inner and outer surfaces active (the mold is removed so the top electrode wraps outside too). Take the mean electrode diameter as ~ 30 nm: area A ≈ π × 30 nm × 1,200 nm × 2 (inside + outside) ≈ 2.26 × 10⁵ nm² = 0.226 µm². With EOT = 0.55 nm, C = ε0 × 3.9 × A / EOT = 8.85 × 10⁻¹² F/m × 3.9 × 2.26 × 10⁻¹³ m² / 0.55 × 10⁻⁹ m ≈ 14 fF. That matches the 10–20 fF the sense amplifier needs, and shows why height cannot be given up: at 0.6 µm the same cell would be ~ 7 fF.

Making it, step by step:

1. **Mold stack.** A ~ 1.2–1.6 µm stack of oxide (usually a fast-deposited borophosphosilicate glass or TEOS oxide) with two or three thin **supporter** layers of SiN (~ 30–50 nm each) inserted at mid-height and at the top. These are the future scaffolding.
2. **Hard mask and hole etch.** A thick amorphous-carbon or boron-doped carbon hard mask is patterned (with DUV immersion plus self-aligned pitch multiplication, or EUV at the newest nodes) with a hexagonal array of ~ 30–40 nm holes. The mold is etched in a capacitively coupled fluorocarbon plasma (Module 09; this is the DRAM analogue of the NAND channel-hole etch, at lower depth but tighter pitch). Bowing, twisting and hole-to-hole CD variation are the yield killers; the etch runs at cryogenic or low chuck temperatures with high bias power.
3. **Bottom electrode.** ALD TiN lines the holes; the top is removed by CMP or etch-back so each cylinder is electrically separate.
4. **Supporter open and mold removal.** The top SiN supporter is patterned with openings between cylinders, and the oxide mold is stripped in dilute HF (wet, or HF vapour to avoid capillary forces). The cylinders are now free-standing 40:1 pillars held only where they pass through the SiN supporter layers. Without supporters, surface tension during drying pulls neighbours together (**leaning** or **stiction**) and shorts them; the supporter concept, introduced around the 40–30 nm nodes, is what allowed capacitor aspect ratio to keep climbing.
5. **Dielectric and top electrode.** ALD ZAZ over every surface (~ 300–500 cycles across the three layers, ~ 250–300 °C, TEMAZ or TDMAZ + O3 for ZrO2, TMA + O3 for Al2O3), then ALD TiN, then the SiGe/W plate fill. Conformality inside a 40:1 hole is the reason ALD, not CVD, is the only option; a DRAM fab runs hundreds of ALD chambers (ASM, TEL, Jusung, Wonik, Eugene Technology are the main suppliers, with Samsung and SK hynix also buying from Korean tool makers they part-own).

### 2.4 Periphery, BEOL and the die

The periphery (sense amplifiers, row/column decoders, charge pumps for VPP, delay-locked loops, DDR5/LPDDR5X/HBM I/O) is built with conventional CMOS, several nodes behind logic. Samsung and SK hynix moved the periphery to **HKMG** (high-k/metal gate) transistors at the 1α/1a node for DDR5; Micron, which had first used HKMG in 1z graphics DRAM, extended it across its DRAM line at 1β. The gates are patterned before the capacitor module and must survive its thermal budget, which is one reason DRAM periphery lags logic by ~ 4–5 nodes. Interconnect is three to four levels: a tungsten bit-line level, one or two copper levels, and an aluminium top pad layer. A 16 Gb DDR5 die at 1β is ~ 60–70 mm²; a 24 Gb die ~ 70–80 mm²; 32 Gb DDR5 dies arrived first at Samsung's 1b (12 nm-class) node in 2023–24 and at 1γ/1c elsewhere in 2025–26.

### 2.5 Node naming and where EUV is used

DRAM nodes stopped being honest numbers around 2016. The industry names them by Greek letters or letters within the "1x nm" class:

| Node name | Approx. half-pitch (F) | Volume years (approx.) | Notes |
|---|---|---|---|
| 1x | ~ 19 nm | 2016–2018 | DDR4 |
| 1y | ~ 17–18 nm | 2018–2020 | |
| 1z | ~ 15–16 nm | 2019–2021 | Samsung's first EUV DRAM demo (1z DDR4, 2020) |
| 1α / 1a | ~ 14 nm | 2021–2023 | SK hynix 1a with EUV (2021); Samsung 1a with 5 EUV layers; HKMG periphery |
| 1β / 1b | ~ 12–13 nm | 2023–2025 | HBM3E core dies; Micron 1β without EUV |
| 1γ / 1c | ~ 11–12 nm | 2025–2027 | Micron's first EUV node (shipped 2025); HBM4 core dies |
| 1δ / 1d and "0a" | ~ 10 nm | ~ 2027+ | Likely last conventional 6F² nodes |

EUV in DRAM is used on a handful of layers where it replaces DUV self-aligned quadruple patterning (SAQP): typically the active-area island pattern, the bit-line or storage-node contact layer, and one or two periphery layers. SK hynix was the first to put EUV into mass DRAM production (1a, 2021, a single layer); Samsung uses the most EUV layers (five at 1a); Micron was the last holdout, running 1α and 1β with multi-patterned ArF immersion and only introducing EUV at 1γ in 2025, with EUV tools in Hiroshima (Japan) and Taichung. The economics are simple: one EUV pass (reported estimates of ~ $100–200 per wafer-layer, falling with tool throughput) replaces four DUV passes plus the associated deposition and etch steps, and only pays when EUV tool throughput is high; that is why Micron waited until 0.33 NA tools reached ~ 180–220 wafers per hour.

Cost per bit follows from die size and wafer cost. A 1β DRAM wafer costs on the order of $1,500–2,500 to process; with ~ 900–1,000 gross 16 Gb dies per 300 mm wafer at 85–90% yield, a wafer holds ~ 1.7 TB of good DRAM, or ~ $1–1.5 per GB at the fab level. Selling prices swing from below cost in gluts (2023) to 3× cost in shortages (2025–26), which is why memory makers' operating margins oscillate between −20% and +50%.

### 2.6 The roadmap: 4F² vertical channel and 3D DRAM

The 6F² cell runs out of room near F ≈ 10 nm, because the tilted active island and the bit-line contact cannot shrink further without the access transistor leaking. Two successors are in development:

- **4F² vertical channel transistor (VCT) DRAM.** The access transistor is turned vertical, a pillar with the word line wrapped around it and the capacitor stacked directly on top, so the cell footprint is 2F × 2F. Samsung has shown VCT test chips; SK hynix and Micron have parallel programs. It gives a one-time ~ 30% density gain and is expected around the 1δ–0a timeframe (~ 2027–2028), with the complication that a vertical transistor with a floating body needs careful leakage control (IGZO oxide-semiconductor channels are one candidate).
- **3D DRAM.** The cell is laid on its side and stacked, like 3D NAND: horizontal Si channels formed from an epitaxial Si/SiGe superlattice (the SiGe is selectively etched away), with a lateral capacitor per layer. Samsung, SK hynix, Micron and imec have all published on it; first products are expected no earlier than ~ 2028–2030. The key difficulty is that a lateral capacitor loses the height advantage, so each layer holds less charge, and the superlattice must be defect-free across hundreds of layers.

### 2.7 Players and capacity

| Supplier | Approx. DRAM revenue share (2025) | Notes |
|---|---|---|
| Samsung Electronics (Korea) | ~ 33–36% | Largest capacity (Pyeongtaek P1–P4, Hwaseong, Xi'an for NAND); lost #1 in DRAM revenue to SK hynix for Q1–Q3 2025 and regained it in Q4 2025 (TrendForce) |
| SK hynix (Korea) | ~ 32–36% | HBM leader; Icheon M16, Cheongju M15X, Wuxi (China); #1 DRAM vendor by revenue for three quarters of 2025 on HBM |
| Micron (USA) | ~ 22–26% | Fabs in Hiroshima (Japan), Taichung/Taoyuan (Taiwan), Singapore, Boise; new Idaho and New York fabs |
| CXMT (China) | ~ 5–8% and rising (7.6% in Q1 2026) | Hefei; DDR4/LPDDR4X at ~ 1z-class, DDR5 at 1α-class in 2025; restricted from EUV by export controls |
| Nanya, Winbond, others | ~ 1–2% | Specialty and legacy |

CXMT is the strategically important name: its share rose sharply between 2024 and 2025 by flooding the DDR4/LPDDR4 market as the big three shifted wafers to HBM and DDR5, and it is now shipping DDR5 and sampling LPDDR5X, all without EUV. Its wafer capacity reached ~ 200–300k wafers per month in 2025.

## 3. NAND flash

### 3.1 The cell: floating gate to charge trap

A NAND cell is a MOSFET whose threshold voltage Vt can be shifted by trapping charge in its gate stack. In the classic **floating-gate (FG)** cell, a polysilicon island sits between a ~ 7–8 nm **tunnel oxide** (over the channel) and a thicker inter-poly dielectric (under the control gate). To program, the control gate is pulsed to ~ 18–22 V; electrons tunnel from the channel through the tunnel oxide by **Fowler-Nordheim tunneling** (field ~ 10 MV/cm), charge the floating gate, and raise Vt by several volts. Erase applies the reverse field (channel/body at ~ 20 V, gate at 0) for a whole block at once. Reading applies a gate voltage between the programmed and erased Vt and senses whether the string conducts; retention relies on the tunnel oxide leaking negligibly at zero field (datasheets quote up to ~ 10 years for lightly cycled cells; JEDEC's end-of-life SSD requirement is 1 year at 30 °C for client drives and 3 months at 40 °C for enterprise).

Planar FG scaling ended at ~ 14–16 nm because adjacent floating gates couple capacitively (a neighbour's program shifts your Vt), and because a 15 nm cell stores only a few hundred electrons, so losing ten of them is a bit error. The industry's answer was to go vertical and, in the same move, to switch most designs to the **charge-trap (CT)** cell: the floating gate is replaced by a ~ 5–7 nm layer of **silicon nitride (SiN)**, which stores electrons in discrete, immobile traps. Because the charge cannot move laterally, a nitride layer can be shared, unpatterned, along an entire vertical string with no cell-to-cell coupling, which is what makes the 3D process (Section 3.3) possible. Samsung's V-NAND, SK hynix, Kioxia/SanDisk BiCS and YMTC all use charge trap; Micron switched from a floating-gate 3D cell to **replacement-gate charge trap** at its 176-layer generation (2020), and Intel/Solidigm's QLC (now under SK hynix) was the last floating-gate holdout.

**Multi-level cells.** Because Vt is analogue, a cell can hold more than one bit by programming it into one of several Vt windows: **SLC** (2 levels, 1 bit), **MLC** (4, 2 bits), **TLC** (8 levels, 3 bits, the mainstream), **QLC** (16 levels, 4 bits, a fast-growing share of data-centre SSD bits as of 2025–26), and **PLC** (32 levels, 5 bits, sampled but not yet in volume as of ~ 2025). Programming uses **incremental step pulse programming (ISPP)**: a train of gate pulses rising by ~ 0.2–0.5 V per step, with a verify read after each, until the cell lands in its target window; a QLC page program takes ~ 1–3 ms versus ~ 100–200 µs for SLC. Sixteen Vt windows within a ~ 6–8 V span leaves ~ 0.3–0.4 V per state, so read voltages are calibrated per block over time and every page carries ~ 10–15% **LDPC (low-density parity check)** error-correction overhead in the SSD controller. Endurance falls with levels: ~ 100k program/erase cycles for SLC, ~ 3k for TLC, ~ 1k or less for QLC, because each high-field program/erase cycle damages the tunnel oxide.

### 3.2 The 3D architecture

A 3D NAND **string** is a vertical polysilicon channel, ~ 100 nm in diameter, running down through a stack of horizontal word lines. Each crossing of channel and word line is one cell, a **gate-all-around** transistor with the channel inside and the word line wrapped around it. The stack, from top to bottom: a bit line (copper, running perpendicular over the tops of thousands of strings), a drain-select transistor, a few dummy word lines, the N active word lines, more dummies, a source-select transistor, and the common source line at the bottom. In the current products N is 200–300+.

The word-line stack is deposited, not patterned: alternating layers of SiO2 (~ 18–22 nm) and SiN (~ 20–25 nm), the **ON stack**, at a vertical pitch of ~ 40–45 nm (TechInsights measures ~ 45 nm at 176 layers and ~ 40 nm at SK hynix's 321-layer generation). A 300-layer stack, with dummies and select gates (~ 345 tiers in total), is ~ 13–16 µm tall. That is ~ 200 times the height of a logic transistor and comparable to the entire BEOL of an N3 chip.

### 3.3 The gate-replacement flow step by step

This is the flow used by Samsung, SK hynix, Kioxia/SanDisk, Micron (since 176L) and YMTC, with proprietary differences in every step.

1. **Periphery first (or separately).** In Micron's **CMOS-under-Array (CuA)**, SK hynix's **Periphery-under-Cell (PUC, "4D NAND")** and Samsung's **Cell-on-Periphery (COP)**, the page buffers and decoders are built as ordinary CMOS on the wafer first, covered with an oxide, and the array is built on top; this recovers ~ 20–30% of die area but restricts the array's thermal budget (no step above ~ 600–700 °C after the periphery). YMTC's **Xtacking** and Kioxia/SanDisk's **CBA (CMOS directly Bonded to Array)** instead build the periphery on a separate wafer, on a more advanced logic-like process, and join the two by wafer-to-wafer **hybrid bonding** (Cu-Cu with a SiCN/oxide dielectric at a ~ 1–3 µm pitch, millions of connections per wafer). This decouples the two thermal budgets and lets the periphery use faster transistors; it is the same bonding technology HBM will eventually use for stacking.
2. **ON stack deposition.** PECVD (Lam Vector, AMAT Producer, TEL) deposits the alternating oxide and nitride at ~ 400–550 °C. Film stress must be balanced layer by layer, or a ~ 15 µm stack warps the wafer by hundreds of microns; thickness uniformity of each layer must be ~ 1% so that the 300th word line is at the intended depth. For string-stacked devices this is done one **deck** at a time (Section 3.4).
3. **Channel-hole etch.** A carbon hard mask (~ 2–4 µm of boron-doped or ion-implanted amorphous carbon) is patterned with a hexagonal array of ~ 100–130 nm holes at ~ 150–180 nm pitch, and a capacitively coupled high-power plasma etches through the full deck in fluorocarbon/hydrofluorocarbon chemistry, as detailed in Module 09. Aspect ratios are 60–100:1; a 3-deck 321-layer device etches each deck through ~ 4–6 µm. Lam's cryogenic dielectric etch (announced 2024, chuck at ~ −40 to −60 °C) cut the etch time per deck by ~ 2× and reduced bowing; this is the single longest step in the flow (reportedly on the order of an hour per wafer per deck). A 1 Tb TLC die has ~ 1–1.5 billion channel holes (each etched once per deck); one that twists into its neighbour kills the string.
4. **Gate stack and channel inside the hole.** ALD deposits, from the outside in: a blocking oxide (some makers put an Al2O3 high-k blocking layer here or later, in the gate), the ~ 6 nm SiN charge-trap layer, the ~ 5–7 nm tunnel oxide (often an oxide-nitride-oxide bandgap-engineered stack for faster erase), then a thin (~ 5–10 nm) polysilicon channel. The channel is a tube; its hollow core is filled with oxide (the **macaroni** channel), because a thin poly tube with a thin body has better subthreshold control than a solid poly pillar. The bottom of the hole must be punched through the deposited films to reach the source, and the poly is crystallized by a ~ 600–800 °C anneal to enlarge grains, since grain boundaries in the channel are the main source of cell-to-cell current variation.
5. **Staircase.** Every word line needs a contact, so the edge of the stack is carved into a staircase, one step per layer. A thick resist is exposed and etched one tier, then **trimmed** laterally by an isotropic plasma (~ 100–200 nm per cycle), etched another tier, and so on; ~ 10–16 tiers per lithography pass, so a 300-layer device needs ~ 20–30 trim-etch cycles across several masks. The staircase consumes ~ 5–8% of die area.
6. **Slit (gate line cut).** Long trenches are etched through the entire stack between rows of channel holes, every ~ 8–12 holes, exposing the nitride edges of every layer.
7. **Nitride removal.** Hot phosphoric acid (H3PO4 at ~ 150–170 °C, selectivity to oxide > 100:1) is pumped through the slits and dissolves every SiN layer laterally, leaving the oxide layers as free-standing shelves supported by the channel pillars. The channel-hole pillars, at 100+ nm diameter and a few hundred per slit segment, are now the only thing holding the stack up. This is why hole placement is a mechanical as well as electrical design.
8. **Word-line fill.** ALD Al2O3 (high-k blocking) and TiN line the horizontal cavities, then tungsten is deposited by ALD/CVD (WF6 with a B2H6 or SiH4 nucleation step, then bulk fill at ~ 300–400 °C), filling every gap from the slit inward. The W is then etched back inside the slit so the layers are electrically separate, and the slit is filled with oxide (and, in most designs, a tungsten source-line contact down the middle). Fluorine-free tungsten and, at the newest generations, **molybdenum** word lines (lower resistivity in thin films, no fluorine attack on the oxide) are in production or qualification; word-line resistance is what limits read latency as the lines get thinner and longer.
9. **Contacts and BEOL.** HAR contacts drop from the surface onto each staircase step; the bit lines (copper, ~ 40 nm pitch, one per channel-hole column) and two or three more metal levels finish the die. For bonded designs (Xtacking, CBA), the array wafer's top metal is planarized to a bonding surface and joined to the periphery wafer here.

### 3.4 String stacking: why 300 layers is two or three decks

A single-deck etch is limited to ~ 128–176 layers by hole bowing and etch rate, so higher counts are built as **string-stacked decks**: deposit and etch one ON stack, fill the channel, planarize, deposit a second stack, and etch a second set of holes that must land on the first with an overlay of ~ 20–30 nm. The channel is electrically continuous through an inter-deck poly plug, and the boundary layers are dummies (the misaligned junction is a bad transistor). The state of the art as of ~ 2025–2026:

| Vendor | Generation | Layers (approx.) | Decks | Notes |
|---|---|---|---|---|
| SK hynix | 321-layer TLC/QLC | 321 (~ 345 tiers incl. dummies) | 3 | First to exceed 300; 2025 volume; ~ 40 nm tier pitch |
| Samsung | V9 | ~ 286 | 2 | 2024–25; V10 (~ 400 layers) ramping in 2026, with a roadmap talking about 1,000 layers |
| Micron | G9 | 276 | 2 | Fastest interface (3,600 MT/s) at launch; G10 ~ 300+ |
| Kioxia / SanDisk | BiCS8 | 218 | 2 | CBA bonded periphery; 332-layer BiCS10 (3 decks, CBA) sampling from mid-2026, volume 2027 |
| YMTC | Xtacking 4.0 (Gen 5) | ~ 294 total (active count reported at ~ 270 by TechInsights) | 2–3 | Wafer-to-wafer bonded periphery; sanctioned, without access to new US tools |

Vendors differ in whether they count dummy and select layers, so "321" and "286" are not directly comparable; density per mm² also depends on hole-pitch shrink (~ 10% per generation) and bits per cell. The best 2025 TLC dies are ~ 20–25 Gb/mm² (TechInsights puts SK hynix's 321-layer and YMTC's Gen 5 TLC just above 20 Gb/mm²), QLC ~ 23–30 Gb/mm²; a 1 Tb TLC die is ~ 40–50 mm².

**NAND nodes are counted in layers rather than nanometres** because lateral dimensions have barely moved since 2013: the channel hole is still ~ 100 nm, patterned with KrF and ArF dry lithography, no immersion multipatterning and no EUV. Density comes from height, bits per cell and periphery placement. A NAND fab is a deposition-and-etch fab, with capital cost ~ 30–40% lower per wafer than a leading DRAM fab.

### 3.5 Players

| Supplier | Approx. NAND revenue share (2025) | Notes |
|---|---|---|
| Samsung | ~ 28–34% (32.3% in 3Q25, 28% in 4Q25 per TrendForce) | V-NAND; Pyeongtaek, Xi'an (China) |
| SK hynix + Solidigm | ~ 19–22% | Solidigm is the former Intel NAND business (Dalian, China; QLC leader) |
| Kioxia (Japan) | ~ 14–16% | Yokkaichi and Kitakami JV fabs with SanDisk |
| SanDisk (USA) | ~ 12–13% | Spun out of Western Digital in Feb 2025; shares the Kioxia JV fabs |
| Micron | ~ 12–14% | Singapore, Manassas |
| YMTC (China) | ~ 6–10% | Wuhan; on the US Entity List since Dec 2022 |

## 4. HBM

### 4.1 The bandwidth wall

A GPU's useful throughput on large-language-model inference is set by how fast it can stream weights and KV-cache out of memory, not by its FLOPS. Bandwidth from a DRAM device is pins × per-pin data rate. The conventional way to add bandwidth is to run each pin faster: DDR5 at 6.4–8.8 Gbps, GDDR7 at 28–32 Gbps. But pushing a signal across a PCB trace at 30 Gbps costs ~ 6–8 pJ per bit and needs heavy equalization, and a GDDR7 device has only 32 data pins, ~ 128 GB/s each; feeding 8 TB/s would need ~ 64 of them on a board with no room.

HBM inverts the trade: **wide and slow**. Each HBM3/3E stack presents **1,024 data pins** (HBM4: **2,048**) at a modest 6.4–9.2 Gbps (HBM4: 8–11 Gbps), over traces only a few millimetres long on a silicon interposer (Module 17), which need no equalization and cost ~ 3–4 pJ/bit. One stack delivers 0.8–1.2 TB/s, and a B200 has eight of them.

> **Worked example: stack bandwidth.** HBM3: 1,024 pins × 6.4 Gbps = 6,554 Gb/s ÷ 8 = 819 GB/s. HBM3E (NVIDIA Blackwell grade): 1,024 × 9.2 Gbps = 1,178 GB/s ≈ 1.2 TB/s; 8 stacks → 9.4 TB/s peak (B200 is specified at ~ 8 TB/s with pins run at ~ 8 Gbps). HBM4 at the JEDEC base rate: 2,048 × 8 Gbps = 2.05 TB/s; NVIDIA's Rubin, as announced at CES 2026, specifies 8 stacks of HBM4 at 22 TB/s total (the GTC 2025 preview had said 13 TB/s), so ~ 2.75 TB/s per stack, i.e. ~ 10.7 Gbps on 2,048 pins; Micron's 12-high HBM4 at 11 Gbps reaches 2.8 TB/s per stack and Samsung's runs at 11.7 Gbps. The width doubling is why HBM4 reaches HBM3E-class bandwidth at a *lower* per-pin speed (the JEDEC base rate) and more than doubles it at HBM3E-class pin speeds, which is also why the base die and interposer routing, not the DRAM cell, are the HBM4 design problems.

### 4.2 Anatomy of a stack

An HBM stack, or cube, is 8, 12 or 16 **core DRAM dies** on top of one **base die** (also called the **logic die** or buffer die), all connected by **through-silicon vias (TSVs)** and microbumps, in a footprint of ~ 11 × 11 mm (HBM3/3E; HBM4 grows to ~ 11 × 13 mm to accommodate the wider interface). The base die carries the physical-layer (PHY) I/O to the GPU, the TSV signal routing, ECC and RAS logic, temperature sensors, and the **Direct Access (DA)** test port used to test the stack after assembly. The core dies are DRAM: a 24 Gb HBM3E core die on a 1β process is ~ 110–120 mm², larger than a same-density DDR5 die because of the TSV area, the wider internal data path (each die contributes to 2–4 of the stack's 16 channels), and the keep-out zones around the TSVs.

| Generation | Year (volume) | Stack height | Max capacity per stack | Pin rate (Gbps) | Interface | Bandwidth per stack |
|---|---|---|---|---|---|---|
| HBM1 | 2015 (AMD Fiji) | 4 | 1 GB | 1.0 | 1,024-bit | 128 GB/s |
| HBM2 | 2016–18 (P100, V100) | 4–8 | 8 GB | 2.0–2.4 | 1,024-bit | 256–307 GB/s |
| HBM2E | 2020 (A100) | 8 | 16 GB | 3.2–3.6 | 1,024-bit | 410–460 GB/s |
| HBM3 | 2022 (H100) | 8–12 | 24 GB | 6.4 | 1,024-bit | 819 GB/s |
| HBM3E | 2024 (H200, B200) | 8–12 | 24–36 GB | 8.0–9.2 | 1,024-bit | 1.0–1.2 TB/s |
| HBM4 | 2026 (Rubin, MI400) | 12–16 | 36–48 GB (64 GB with 32 Gb dies) | 8 (JEDEC base) to 11–13 (shipping parts) | 2,048-bit | 2.0–2.8 TB/s (Rubin: 22 TB/s over 8 stacks) |
| HBM4E | ~ 2027 (Rubin Ultra) | 12–16 | 48–64 GB | 13–16 (Samsung sampling at 14 Gbps from mid-2026, scalable to 16) | 2,048-bit | 3.3–4 TB/s |

JEDEC standards: JESD235 (HBM/HBM2/2E), JESD238 (HBM3, Jan 2022), JESD270-4 (HBM4, April 2025).

### 4.3 The core die: TSV formation

An HBM core die is a DRAM die with an extra module inserted into the flow: **TSV-middle**, done after the transistors and capacitors (FEOL) and before or during the first metal levels, so the vias connect to the die's metal from below. (TSV-first, before transistors, is not used because the copper cannot survive the DRAM thermal budget; TSV-last, from the back after BEOL, is used in interposers and image sensors but has worse pitch.)

1. **Via etch.** Photoresist over a hard mask defines ~ 5–6 µm diameter holes at ~ 40–50 µm pitch, in several dense columns down the middle of the die (some designs place TSV blocks under the I/O channels at both ends). A **Bosch process** (Module 09) etches them ~ 50–60 µm deep for a target final die thickness of ~ 45–50 µm (8-high), or ~ 35–40 µm deep for the ~ 30 µm dies used in 12- and 16-high stacks: alternating SF6 etch and C4F8 passivation pulses of ~ 1–3 s each, ~ 5–10 µm/min, producing a scalloped sidewall that must be smoothed (a short isotropic SF6 or oxidation-strip step) so the liner is continuous. Aspect ratio is ~ 10:1, which is easy compared to the capacitor etch; the difficulty is depth uniformity, because the via must be exposed uniformly during backside reveal.
2. **Liner, barrier, seed.** Sub-atmospheric CVD or ALD oxide (~ 200–500 nm) isolates the copper from the silicon; a PVD Ta/TaN (or ALD TiN) barrier (~ 20–50 nm) stops Cu diffusion; a PVD Cu seed (~ 100–300 nm) follows, thinned at the bottom of the via, which is why plating chemistry matters.
3. **Copper electroplating.** A bottom-up fill in an acid copper sulfate bath with suppressor/accelerator/leveler additives (Module 12, at ~ 100× the via size); ~ 30–60 minutes per wafer for 50 µm vias, tuned to avoid a void down the axis. An anneal at ~ 350–400 °C stabilizes the grain structure before BEOL, because copper expands ~ 4× more than silicon and an un-annealed plug "pumps" out of the surface by ~ 100 nm on later heating, cracking the metal above it.
4. **CMP** removes the overburden and the via is buried under the normal BEOL.

Each core die has **several thousand TSVs**: the 1,024 data bits plus command/address, power, ground and redundancy, with HBM4's 2,048-bit interface roughly doubling the signal count. Power and ground TSVs are the majority. Around each TSV a **keep-out zone** of ~ 5–10 µm is required because the thermal stress from the copper plug shifts transistor mobility; no cells or sense amplifiers are placed there, and the TSV columns plus keep-out plus wider internal buses are the main reason an HBM die is ~ 1.5–1.8× the area of a DDR5 die of the same density.

### 4.4 Thinning, backside reveal and microbumps

A finished DRAM wafer is 775 µm thick. An HBM core die must end up at ~ 45–55 µm for 8-high HBM3E stacks, ~ 30–35 µm for 12-high (SK hynix's and Samsung's 12-high HBM3E dies are ~ 40% thinner than their 8-high dies, to hold the same 720 µm) and ~ 25–30 µm for 16-high stacks, thin enough that the copper TSVs poke through the back.

1. **Temporary bonding.** The finished front side is bonded face-down to a glass or silicon carrier wafer with a temporary adhesive (Brewer Science, 3M, TOK) that releases with laser, heat or a slide-off mechanism. Total thickness variation of the adhesive layer (~ 1–2 µm) directly transfers into thinned-die thickness variation.
2. **Backgrinding.** A diamond grinding wheel (Disco DFG series) removes ~ 700 µm in a coarse pass, then a fine pass to within ~ 5 µm of the via bottoms; a stress-relief dry polish or CMP removes the ~ 1–2 µm grinding damage layer that would otherwise crack during bonding. A 300 mm wafer at 30 µm has no stiffness of its own; every subsequent step is done on the carrier.
3. **TSV reveal.** A selective silicon etch (SF6 dry or a wet TMAH/KOH etch) recesses the silicon a few microns so the copper plugs, still sheathed in their oxide liner, stand ~ 1–3 µm proud. A low-temperature (< 200 °C, to protect the temporary adhesive) PECVD SiN/SiO2 passivation is deposited over everything and then CMP'd to open the copper tips. Backside RDL and pads are patterned over the tips.
4. **Microbumps.** On both faces (front-side bumps were plated before carrier bonding), ~ 20–25 µm-diameter **copper pillars** ~ 10–15 µm tall are electroplated through a thick photoresist, capped with a Ni diffusion barrier and a **SnAg solder** tip (~ 5–10 µm), at a pitch of ~ 25–55 µm depending on generation; HBM3E stacks have on the order of 10,000+ microbumps per interface. The bottom face of the base die carries the JEDEC ball-out for attachment to the CoWoS interposer: several thousand microbumps at ~ 55 µm pitch (HBM2 through HBM3E), tighter for HBM4.
5. **Debond, dice, test.** The wafer is transferred to dicing tape, the carrier is released, and dies are singulated by laser stealth dicing or plasma dicing (blade dicing chips 30 µm silicon). Every die is probed at wafer level before this, and the TSV chain resistance and open/short status are tested, because a single failed TSV that is not covered by redundancy scraps the entire stack it is bonded into.

> **Worked example: the height budget.** JEDEC set the HBM3E package height at ~ 720 µm and, in the HBM4 standard, relaxed it to **775 µm** for both 12- and 16-high stacks (reportedly heading toward ~ 900 µm for later generations). An 8-high HBM3E with 50 µm core dies: 8 × 50 = 400 µm of silicon, plus 8 bump/underfill gaps at ~ 15 µm ≈ 120 µm, plus a ~ 50–80 µm base die (base dies are thinned too, but less), plus ~ 30 µm of solder on the bottom → ~ 600–630 µm. A 12-high in the same 720 µm needs ~ 30–35 µm dies: 12 × 33 = 400 µm of silicon, 12 gaps at ~ 12–15 µm ≈ 160 µm, base ~ 60 µm, solder ~ 30 µm → ~ 650–700 µm. The stack fits only because the top die is kept slightly thicker for handling and everything else is squeezed. A 16-high in 775 µm: 16 × 30 µm = 480 µm of silicon, 16 gaps × 12 µm = 190 µm, base ~ 50 µm → ~ 720 µm, feasible with microbumps *only* if the dies go to ~ 30 µm and the gap shrinks to ~ 10–12 µm, which is what "Advanced MR-MUF" and thinner NCF are for. Removing the gaps entirely (hybrid bonding, Section 4.6) would free ~ 190 µm and allow 20-high stacks or 40 µm dies; that is why the standard's height number decides which bonding technology wins.

### 4.5 Stacking: TC-NCF versus MR-MUF

The stack is built die-on-wafer: a base-die wafer (or a reconstituted carrier wafer holding many base dies) is the substrate, and core dies are placed on it one at a time, with each die's front-side bumps landing on the previous die's revealed backside pads with an alignment of ~ 1–2 µm. Two process families exist and the difference between them decided the HBM3 market.

**Thermo-compression bonding with non-conductive film (TC-NCF).** Samsung's process (and, in a variant, Micron's). A **non-conductive film (NCF)**, an epoxy sheet ~ 10–20 µm thick pre-laminated onto the wafer before dicing, covers each die's bump face. A **thermo-compression bonder** (Hanmi, Hanwha, ASMPT, BESI, Shinkawa) picks up a die, aligns it, presses it onto the stack at ~ 250–300 °C and a few tens of newtons for ~ 5–15 seconds; the solder melts and joins through the softened NCF while the film simultaneously cures into underfill. Advantages: the underfill is in place before the joint forms, so there is no capillary underfill step and no unfilled voids under the die. Disadvantages: it is serial (12 heated dwells per stack), the heat and force on a 30 µm die over a warped stack create bump non-wets and cracks, the NCF's thermal conductivity is low (~ 0.3–0.5 W/m·K, roughly that of a plastic), and its cure shrinkage adds warpage that compounds die after die. Samsung's difficulty passing NVIDIA's HBM3/HBM3E qualification through 2024 (thermal and power-related failures reported by Reuters) is widely attributed to the heat and warpage behaviour of a 12-high TC-NCF stack; Samsung reworked the process and finally passed the 12-high HBM3E qualification in September 2025, about 18 months after its first attempt.

**Mass reflow with molded underfill (MR-MUF).** SK hynix's process, introduced for HBM2E and refined for HBM3 (2022) and HBM3E. Dies are placed with a high-speed flip-chip bonder using flux (or fluxless plasma-activated placement) but *not* joined individually; once all 8 or 12 are stacked, the whole batch of stacks passes through a reflow oven (**mass reflow**, peak ~ 240–260 °C for SnAg) and all the joints form at once. Then a liquid **epoxy molding compound (EMC)**, formulated with fine silica filler, is injected under pressure and vacuum to flow into the ~ 10–15 µm gaps between dies and over the sides, and cured: the **molded underfill (MUF)** is at once the underfill, the sidewall protection and the mold body. Advantages: parallel joint formation (throughput ~ 2–3× TC-NCF), no per-bond force on thin dies, an EMC whose thermal conductivity SK hynix quotes at ~ 2× that of NCF, and a filler-matched expansion coefficient that holds the stack flatter. Disadvantage: forcing a viscous, filler-loaded liquid into a 10 µm gap without voids is hard and gets harder as gaps close; a void next to a bump is a thermal and reliability failure. For 12-high HBM3E SK hynix introduced **Advanced MR-MUF** (2023–24): thinner dies (~ 40% thinner than the 8-high), a new lower-viscosity EMC with finer filler, chip-warpage control during stacking, and a redesigned mold flow, yielding a 12-high stack in the same 720 µm as the old 8-high. NVIDIA's H100 (HBM3, 2022–23) was effectively sole-sourced from SK hynix, and the H200/B200 HBM3E majority remained with SK hynix, largely because MR-MUF stacks passed qualification on thermals and yield first.

**Micron** uses a TCB flow with NCF but entered HBM3E in 2024 (8-high for H200, then 12-high) with a core die on its 1β node whose lower power (~ 30% lower than competitors' HBM3E, per Micron) offset the process's thermal handicap. It went from ~ 5% HBM share in 2023 to ~ 21% in 2025.

**Base die on a foundry process.** Through HBM3E, the base die was made by the memory maker on its own DRAM periphery process, which is fine for a PHY running at 8 Gbps but not for the 2,048-bit HBM4 interface, ECC, RAS logic, and the customer-specific compute or cache that hyperscalers want in the base. For HBM4, SK hynix's base die is built by **TSMC on N12 (12FFC+)** in mass production, with N5/N3 planned for HBM4E and a custom-base-die program; Micron kept its HBM4 base die on its own in-house CMOS process and moves to TSMC-made base dies only with HBM4E (2027); Samsung, which owns a logic foundry, makes its HBM4 base die on its own **4 nm** process. This is a structural change: the memory company now buys a wafer from a foundry (or, for Samsung, from its own foundry arm), and the base die's bump map, TSV map and PHY must be co-designed with the GPU vendor and TSMC's CoWoS team. It also means an HBM4 stack's cost includes a ~ 100+ mm² logic die at foundry prices.

### 4.6 Hybrid bonding: the 16-high and HBM4E question

Microbumps set a floor on the gap between dies (~ 10 µm) and on pitch (~ 25 µm), and the solder joints are the stack's thermal bottleneck. **Hybrid bonding** eliminates them: each die's face is planarized to a dielectric (SiCN or SiO2) with recessed copper pads at ≤ 10 µm pitch, the faces are brought into contact at room temperature (the dielectric bonds by van der Waals forces, then covalently after a 200–300 °C anneal), and the copper pads expand during the anneal to form a direct Cu-Cu bond. No solder, no underfill, no gap: 16 × 35 µm dies stack in ~ 600 µm with a continuous copper thermal path through the TSVs. The demands are extreme: surface roughness < 0.5 nm, particle-free surfaces (a 100 nm particle makes a millimetre-scale void), sub-µm die-to-wafer placement, and a completely different frontside and backside finish for every core die. BESI (with Applied Materials) and ASMPT supply die-to-wafer hybrid bonders; all three memory makers have pilot lines. JEDEC's April 2025 decision to allow 16-high HBM4 at 775 µm with microbumps postponed that moment: the industry's expectation as of ~ 2026 is microbump TCB/MR-MUF for HBM4 12- and 16-high, with hybrid bonding arriving with HBM4E or HBM5 (~ 2027–2029), sooner if a customer demands 20-high stacks.

### 4.7 Testing and known-good stacks

A 12-high stack has 13 dies and ~ 100,000+ microbump joints; if each die and each bonding step yields 99%, stack yield is 0.99^13 × 0.99^12 ≈ 78%; at 98% it is ~ 60%. HBM assembly yield is reported in the 60–80% range for 12-high, versus > 90% for conventional DRAM packaging, so every layer of test is aimed at not stacking a bad die. Core dies are probed at wafer level for functionality and retention (Module 14), with TSVs tested by daisy-chain; only **known-good dies (KGD)** are stacked. After stacking, the DA port on the base die exercises every channel at speed and burn-in weeds out infant mortality (Module 18). The stack, a **known-good stack (KGS)**, ships to TSMC or the GPU vendor's OSAT, where it is placed on the CoWoS interposer; a failure discovered there scraps the interposer, the HBM stacks and potentially the ~ $10,000+ GPU die, so stack-level test is exhaustive and expensive, on the order of 5–10% of stack cost.

### 4.8 Thermal issues

On a B200 package, each HBM3E stack sits ~ 1 mm from a GPU die dissipating ~ 1,000 W (Rubin: ~ 1,800 W, Rubin Ultra reportedly more). The heat spreader/lid that cools the GPU also touches the tops of the stacks, so the stacks are cooled from above and heated from the side and from below through the interposer. DRAM's junction limit is ~ 95–105 °C; above 85 °C the refresh rate doubles (JEDEC 2× refresh), which steals bandwidth and adds power, and retention failures rise exponentially with temperature. The stack's internal thermal resistance is dominated by the 12 bonding layers (underfill and solder), which is why MR-MUF's higher-conductivity EMC and hybrid bonding's absence of any interface layer matter; the bottom dies, nearest the interposer, run hottest, with a ~ 10–15 °C gradient across a 12-high. Stack height is fixed by JEDEC precisely so that one flat lid can touch the GPU and all eight stacks: a stack 20 µm too tall lifts the lid off the GPU. HBM4's added power (~ 30–40 W per stack at speed) and 16-high stacks are among the reasons Rubin-class packages are liquid-cooled at the rack.

### 4.9 Economics: price, wafer consumption and the shortage

HBM sells for roughly **3–5× the price per bit of DDR5**: as of ~ 2025, HBM3E at roughly $13–20 per GB in contract (reported), so ~ $500–700 for a 36 GB 12-high stack and ~ $2,500–3,500 of HBM on a single 180–192 GB B200, versus ~ $3–5 per GB for DDR5 (before the 2025–26 DRAM price spike). HBM revenue was ~ $16–18 billion in 2024, ~ $35 billion in 2025 (~ 20–25% of a DRAM market that the 2H25 price surge pushed to ~ $150 billion, from ~ 8% of the bits), and is forecast around $55–60 billion in 2026. The 2025–26 conventional DRAM shortage, caused by the same wafers being diverted to HBM, pushed DDR5 prices up 2–3× and narrowed the premium; TrendForce noted in early 2026 that a wafer of DDR5 for 64 GB RDIMMs briefly out-earned a wafer of HBM.

The reason HBM strains the whole DRAM industry is **wafer consumption per bit**. TrendForce estimated that HBM was ~ 18% of the top three suppliers' DRAM wafer input at the end of 2025 for ~ 8% of DRAM bit supply, heading to ~ 30% of wafers for ~ 13% of bits by 2027: roughly **2–3 wafers of HBM per wafer-equivalent of DDR5 bits**. Three factors compound: the larger die (TSVs, keep-out, wider datapath), the lower stack yield, and the fact that every HBM core die is made on the newest node (1β, then 1γ) where wafer output per tool is lowest. A memory maker deciding to add 100k wafers per month of HBM is removing ~ 250k wafers per month of DDR5-equivalent bits from the market, which is what happened in 2024–25.

> **Worked example: wafers for a million GPUs.** Assume a GPU carrying 8 stacks of 12-high HBM3E (36 GB, 288 GB per GPU), 1 million GPUs per year. Core die: 24 Gb on 1β, ~ 120 mm² (10 × 12 mm). Gross dies per 300 mm wafer ≈ π(150)²/120 − π·300/√(2·120) ≈ 589 − 61 ≈ 528; at 80% wafer-sort yield, ~ 420 good dies per wafer, or 35 stacks' worth of core dies per wafer. Base dies (~ 120 mm² on TSMC N12, ~ 90% yield) give ~ 470 per wafer. Stack assembly yield ~ 90% means 8 million stacks require ~ 8.9 million stack attempts: 8.9 M × 12 / 420 ≈ 254,000 core-die wafers plus 8.9 M / 470 ≈ 19,000 base-die wafers, ~ 273,000 wafers per year, or ~ 23,000 wafers per month. For scale, a large DRAM fab makes ~ 100–150k wafers per month, and the industry's ~ 300k wafers per month of HBM in 2025 corresponds to ~ 13 million GPU-equivalents of demand, consistent with NVIDIA's plus AMD's, Google's, Amazon's and Broadcom's customers' accelerators plus inventory. Per bit: the HBM wafer yields 35 × 36 GB ≈ 1.26 TB of stacked capacity (before the 10% stack loss), while a DDR5 wafer of 24 Gb dies at ~ 75 mm² yields ~ 850 gross × 0.9 × 3 GB ≈ 2.3 TB, a ~ 1.8× wafer penalty before stacking losses and the base-die wafer, or ~ 2.2× all-in, which matches the TrendForce ratio. For HBM4 16-high, multiply core-die wafers by 16/12, and the core dies move to 1γ.

### 4.10 Who supplies whom

- **2022–2023 (H100, HBM3):** SK hynix essentially sole source. Samsung's HBM3 qualified late for a minority of H100 volume; Micron had no HBM3.
- **2024 (H200, B200, HBM3E):** SK hynix ~ 50–60% of HBM bits, majority of NVIDIA; Micron entered with 8-high (H200, then 12-high for Blackwell); Samsung's 8-high qualified for lower-tier NVIDIA parts and AMD MI300, but the 12-high failed repeated NVIDIA quals.
- **2025:** SK hynix ~ 57–62% of HBM bit shipments, Micron ~ 21% (overtaking Samsung in Q2), Samsung ~ 17–22%, recovering after its 12-high HBM3E qualification in September. HBM3E was in shortage all year; SK hynix reported its 2025 HBM sold out by early 2025, and 2026 allocations were contracted in 2025.
- **2026 (Rubin, HBM4):** NVIDIA qualified all three suppliers for Vera Rubin (Samsung and SK hynix received allocations in March 2026; Jensen Huang confirmed all three in production by mid-2026), with SK hynix reported at ~ 50–70% of NVIDIA's HBM4, Samsung a strong second with its own 4 nm base die, and Micron (in-house base die) supplying Rubin as well as AMD and custom ASICs. (The Rubin CPX inference part uses GDDR7, not HBM.) Reported 2026 HBM share: SK hynix ~ 50%, Samsung ~ 30–35%, Micron ~ 15–20% (Q2 2026 estimates). SK hynix overtook Samsung in DRAM revenue for the first three quarters of 2025 on the strength of HBM.

### 4.11 Handoff to CoWoS

The HBM stack leaves the memory maker as a tested, molded cube ~ 11 × 11 × 0.72 mm (HBM4: ~ 11 × 13 × 0.775 mm) with several thousand solder microbumps at ~ 55 µm pitch on the bottom of its base die. It goes to TSMC (or Samsung, Intel or an OSAT such as ASE/SPIL and Amkor for non-TSMC packages), where in **CoWoS-S/-L** (Module 17) it is placed, with the GPU dies, on a silicon interposer or LSI-bridge organic substrate whose fine-pitch RDL carries the 1,024 or 2,048 data lines the ~ 2–4 mm from the HBM PHY on the base die to the matching PHY on the GPU. The interposer's own TSVs, the microbump joint between HBM and interposer, the warpage of a ~ 3,000 mm² assembly and the lid that must touch nine dies at once are Module 17's problems; the memory maker's job ends at the known-good stack.

## Key Numbers

| Quantity | Value |
|---|---|
| DRAM cell capacitance | ~ 10–20 fF (must stay there for sense-amp margin) |
| DRAM sense-amp signal at 1.1 V | ~ 100–150 mV (ΔV = VDD/2 × Cs/(Cs+Cbl)) |
| DRAM refresh interval | 64 ms (32 ms above 85 °C) |
| DRAM cell area | 6F²; ~ 0.0010 µm² at F ≈ 12–13 nm (1β) |
| Storage capacitor geometry | ~ 1–1.5 µm tall, ~ 30–40 nm diameter, AR > 40; ZAZ EOT ~ 0.5–0.6 nm |
| DRAM node half-pitches | 1x ~ 19, 1y ~ 18, 1z ~ 16, 1α ~ 14, 1β ~ 12–13, 1γ ~ 11–12 nm |
| EUV layers in DRAM | 1–5 per node; Samsung most, Micron none until 1γ (2025) |
| DRAM market share 2025 | Samsung ~ 33–36%, SK hynix ~ 32–36%, Micron ~ 22–26%, CXMT ~ 5–8% |
| 3D NAND layer counts (2025) | SK hynix 321, Samsung V9 ~ 286, Micron 276, Kioxia/SanDisk BiCS8 218 (BiCS10 332 sampling 2026), YMTC ~ 294 total |
| ON stack layer pitch / height | ~ 40–45 nm per oxide+nitride pair; ~ 13–16 µm for 300 layers |
| NAND channel hole | ~ 100–130 nm diameter, AR 60–100:1 per deck; 2–3 decks |
| NAND program voltage / cell physics | ~ 18–22 V Fowler-Nordheim through ~ 7 nm tunnel oxide; QLC = 16 Vt states |
| HBM interface | 1,024 bits (HBM1–3E); 2,048 bits (HBM4) |
| HBM bandwidth per stack | HBM3 819 GB/s; HBM3E ~ 1.2 TB/s; HBM4 2.0–2.8 TB/s (Rubin: 22 TB/s from 8 stacks) |
| HBM stack height limit | ~ 720 µm (HBM3E); 775 µm (HBM4, 12- and 16-high) |
| HBM core die thickness | ~ 45–55 µm (8-high); ~ 30–35 µm (12-high); ~ 25–30 µm (16-high) |
| TSV dimensions | ~ 5–6 µm diameter, ~ 35–60 µm deep, several thousand per die |
| Microbump pitch | ~ 25–55 µm; Cu pillar + SnAg; ~ 55 µm stack-to-interposer ball-out; hybrid bonding target ≤ 10 µm |
| HBM price premium | ~ 3–5× DDR5 per bit; ~ $13–20/GB HBM3E (2025, reported) |
| HBM share of DRAM | ~ 18% of wafers, ~ 8% of bits, ~ 20–25% of revenue (2025); ~ $35 B revenue |
| HBM bit share 2025 | SK hynix ~ 57–62%, Micron ~ 21%, Samsung ~ 17–22% |
| Wafer penalty | ~ 2–3 HBM wafers per DDR5 wafer-equivalent of bits |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| SK hynix | Korea | DRAM, NAND (incl. Solidigm), HBM3/3E/4; MR-MUF stacking | HBM leader (~ 55–60%); DRAM #1–2 |
| Samsung Electronics | Korea | DRAM, NAND (V-NAND), HBM; TC-NCF; own 4 nm base die | DRAM #1–2; NAND #1; HBM #2–3 |
| Micron | USA | DRAM (1β/1γ), NAND, HBM3E/4 (TCB/NCF; in-house base die through HBM4) | DRAM #3; HBM #2–3 (~ 21% in 2025) |
| CXMT | China | DDR4/DDR5/LPDDR DRAM without EUV | DRAM #4 (~ 5–8%), rising |
| Kioxia / SanDisk | Japan / USA | 3D NAND (BiCS, CBA bonded periphery), JV fabs in Yokkaichi/Kitakami | NAND #3 and #4 combined ~ 30% |
| YMTC | China | 3D NAND (Xtacking wafer-bonded periphery) | NAND #6 (~ 6–10%), sanctioned |
| TSMC | Taiwan | HBM4 base dies (N12, N5/N3 next) for SK hynix, and for Micron from HBM4E; CoWoS integration | Sole logic-foundry base-die supplier outside Samsung |
| Lam Research | USA | HAR dielectric etch for capacitors and NAND channel holes; cryo etch; W/Mo ALD | Leader in memory etch |
| Applied Materials | USA | PECVD ON stacks, PVD barriers/seed, CMP, hybrid-bonding (with BESI) | Leader in deposition/CMP |
| Tokyo Electron | Japan | ALD/CVD, etch, wafer bonders, coaters | #2–3 across memory tools |
| ASM International | Netherlands | ALD for ZAZ/TiN capacitor films, NAND liners | ALD leader |
| Hanmi Semiconductor / Hanwha / ASMPT / BESI | Korea / Korea / Singapore-Germany / Netherlands | TC bonders and hybrid bonders for HBM stacking | Hanmi dominant in SK hynix TCB; BESI in hybrid bonding |
| Disco | Japan | Grinders, dicers for wafer thinning to ~ 30 µm | Leader |
| Namics / Nagase / Resonac | Japan | EMC for MR-MUF, NCF films, underfill | Key materials, few sources |
| Brewer Science / 3M / TOK | USA / USA / Japan | Temporary bonding adhesives for thin-wafer handling | Niche, critical |
| Advantest / Teradyne | Japan / USA | HBM and DRAM test | ATE leaders |
| ASML | Netherlands | EUV (NXE:3800E) for 1α–1γ DRAM layers | Sole EUV source |

## Common Misconceptions

- **"A 1β DRAM is a 12 nm chip like a 12 nm logic chip."** → 1β refers to a ~ 12–13 nm half-pitch of one cell feature; the periphery transistors are ~ 4–5 nodes behind logic, the die has 3–4 metal layers, and the density comes from a capacitor that is 1.2 µm tall, not from the transistor.
- **"HBM is fast memory."** → Per pin, HBM is the slowest DRAM interface in production (6–13 Gbps versus 28–32 Gbps for GDDR7); its bandwidth comes from 1,024–2,048 pins over millimetre-long traces on an interposer. Its latency is no better than DDR5.
- **"HBM costs 3–5× more because the DRAM inside is exotic."** → The core dies are standard 1β/1γ DRAM cells; the premium comes from the TSV module, a die ~ 1.5–1.8× larger per bit, 60–80% stack yield, a foundry-made base die, a serial stacking process and exhaustive test.
- **"Layer count is a direct measure of 3D NAND density."** → Vendors count dummy and select layers differently, string-stacked decks add junction layers, and density also depends on hole pitch, bits per cell and periphery placement; a 218-layer bonded-periphery die can match a 238-layer conventional one.
- **"EUV is what makes new DRAM denser."** → EUV replaces 4-pass DUV multipatterning on a few layers at lower cost and better overlay; the density gains at 1α–1γ come from cell layout and capacitor engineering. Micron shipped 1β with no EUV at competitive density.
- **"HBM4 uses hybrid bonding."** → As of 2026, HBM4 12- and 16-high stacks ship with microbumps (TC-NCF or MR-MUF); JEDEC's 775 µm height allowance made this possible, and hybrid bonding is expected at HBM4E/HBM5.
- **"The tungsten word lines of 3D NAND are deposited as tungsten."** → They are deposited as silicon nitride, and only after the channel, staircase and slit are formed is the nitride dissolved in hot phosphoric acid and replaced with tungsten (or molybdenum) through the slit.

## Where This Fits in the Supply Chain

Memory fabs consume the same inputs as the logic fabs of Modules 05–13: Shin-Etsu/SUMCO polished wafers (Module 03), specialty gases and ALD precursors such as TEMAZ, TMA, TiCl4 and WF6 (Module 04), and the deposition, lithography, etch, implant and metrology tools of Modules 06–13, in a different mix that is heavy on ALD and HAR etch and light on BEOL and EUV. They also consume Module 14's wafer sort more intensively than any logic product, because HBM stacking is only viable with known-good dies. Their outputs go three ways: DDR5/LPDDR5X and NAND ship as packaged components (Module 16 covers the conventional packaging) into servers, phones and SSDs; HBM stacks ship as known-good stacks to TSMC's CoWoS lines, where Module 17 places them beside the GPU dies on an interposer, and where Module 18's system-level test finds the stacks that the memory maker's test did not. Module 19 puts eight of them on a Blackwell or Rubin package, 72 of those in an NVL72 rack, and shows why the HBM supply plan is the first line item in every AI capacity forecast.

## Further Reading

- JEDEC, *JESD270-4: High Bandwidth Memory (HBM4) DRAM* (April 2025), and *JESD238A: HBM3* (2023); the standards themselves are the authoritative source for channel, interface and height specifications. https://www.jedec.org
- SemiAnalysis, "Scaling the Memory Wall: The Rise and Roadmap of HBM" (2025) and "The Memory Wall: Past, Present, and Future of DRAM" (2024), the best public treatments of HBM economics, TC-NCF vs MR-MUF and hybrid bonding timing.
- SK hynix Newsroom, technical articles on MR-MUF, Advanced MR-MUF and the HBM4 base-die partnership with TSMC (news.skhynix.com).
- TechInsights blog, "3D NAND Technology Roadmap" and "Comparison: Latest 3D NAND Products from YMTC, Samsung, SK hynix and Micron" (teardown-based layer counts and die densities).
- Micron, "1-gamma DRAM technology" product page and technology brief, and the February 2025 announcement of the first 1γ DDR5 samples (first Micron EUV DRAM).
- Rino Micheloni, Luca Crippa and Alessia Marelli, *Inside NAND Flash Memories* (Springer, 2010), and Rino Micheloni (ed.), *3D Flash Memories* (Springer, 2016): the standard references for NAND cell physics, ISPP and 3D architectures.
- Ashok K. Sharma, *Semiconductor Memories: Technology, Testing, and Reliability* (IEEE Press/Wiley), for DRAM sense-amplifier and refresh fundamentals.
- Jim Handy, The Memory Guy blog (thememoryguy.com), including "When Should DRAM Makers Adopt EUV?" for the cost logic of EUV in DRAM.
- Semiconductor Engineering, "HBM4 Sticks With Microbumps, Postponing Hybrid Bonding" (2025), on the JEDEC height decision and its consequences.
- Asianometry (YouTube), episodes on the DRAM capacitor, 3D NAND manufacturing and HBM, for well-sourced visual walk-throughs of the flows described here.
