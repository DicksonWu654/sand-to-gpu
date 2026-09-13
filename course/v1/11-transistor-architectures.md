# Module 11: Building a Transistor: Planar to FinFET to GAA to CFET

A modern logic transistor has to do two contradictory things at once. When its gate is "on" it must pass on the order of 1 mA per micron of channel width so that it can charge the wire attached to it in a few picoseconds. When its gate is "off" it must leak less than about 1 nA per micron, because a 100-billion-transistor GPU cannot afford a hundred amps of standby current. The ratio between those two states, I_on/I_off, has to be roughly a million, and it has to be achieved with a control voltage of well under one volt, in a device whose channel is now shorter than the diameter of a virus (~ 12–16 nm of physical gate length at the 2 nm class of nodes).

Everything in this module follows from that one problem. As the channel shrinks, the drain competes with the gate for control of the channel, the "off" state gets leaky, and the only cure is to surround the channel with more gate on more sides. That is the entire physical reason the industry went planar → FinFET → gate-all-around (GAA) nanosheet → and is now heading toward the complementary FET (CFET). The other half of the module is the process-integration reality: how you actually make a 6 nm wide fin, replace a sacrificial gate with a hafnium-oxide/metal stack, or suspend three silicon ribbons in mid-air and wrap them in a gate. Modules 06 through 10 gave you the unit processes; this module strings them together into a transistor.

## 1. MOSFET Operation Refresher

### 1.1 Inversion and threshold voltage

A **MOSFET** (metal-oxide-semiconductor field-effect transistor) is a capacitor with a semiconductor as one plate. For an n-channel device (**NMOS**) the body is p-type silicon and the source and drain are heavily n-doped (n+) regions. With zero gate bias the two n+ regions are separated by p-type material: two back-to-back diodes, no current. Apply positive gate voltage V_GS and the field pushes holes away from the surface (depletion) and, above a critical voltage, pulls in enough electrons to form a thin n-type layer at the surface: **inversion**. The inversion layer is a conducting sheet, ~ 1–2 nm thick, that connects source to drain. The gate voltage at which the surface electron density equals the bulk hole density is the **threshold voltage V_T**.

For a bulk device,

V_T = V_FB + 2φ_F + Q_dep / C_ox

where V_FB is the flat-band voltage (set by the gate work function and oxide charge), φ_F is the Fermi potential of the body (~ 0.3–0.45 V for typical doping), Q_dep is the depletion charge per unit area, and C_ox = ε_ox / t_ox is the gate-oxide capacitance per unit area. Two knobs control V_T in production: the gate work function (the metal you choose in the gate stack) and the channel doping (Q_dep). Modern devices use the work function almost exclusively, because heavy channel doping kills mobility and adds random dopant fluctuation.

Above threshold, the drain current in saturation is, in the simplest long-channel model,

I_D,sat = (1/2) μ C_ox (W/L) (V_GS − V_T)²

where μ is the carrier mobility, W the channel width, L the channel length. In a real short-channel device carriers reach **velocity saturation** (~ 10⁷ cm/s in silicon) and I_D ≈ W C_ox v_sat (V_GS − V_T), linear in overdrive and independent of L. This is why per-micron drive current (mA/µm of effective width) is the standard figure of merit; a good 2 nm class NMOS delivers ~ 1.0–1.3 mA/µm at V_DD ≈ 0.7 V, with PMOS nearly matched thanks to strain.

### 1.2 Subthreshold swing and the 60 mV/decade wall

Below threshold the transistor is not truly off. Electrons in the source have a Boltzmann energy distribution, and the fraction that can surmount the source-to-channel barrier falls exponentially with the barrier height. The gate lowers that barrier, but only through a capacitive divider: a change ΔV_GS at the gate moves the surface potential by only ΔV_GS × C_ox / (C_ox + C_dep). The result is the **subthreshold swing** (SS), the gate voltage needed to change I_D by a factor of ten:

SS = (kT/q) ln(10) × (1 + C_dep / C_ox) = 59.6 mV/dec × m at 300 K

where m = 1 + C_dep/C_ox is the **body factor**. Because m ≥ 1 and kT/q is set by thermodynamics, no conventional MOSFET at room temperature can switch faster than **~ 60 mV per decade**. Real production devices sit at 65–75 mV/dec. This number governs everything: if you need six decades between I_on and I_off, you need ~ 6 × 65 mV ≈ 0.4 V of gate swing just for the off-to-on transition, before you add the overdrive (V_GS − V_T) needed for drive current. That is why V_DD cannot fall much below ~ 0.6–0.7 V, and why V_T cannot be lowered without an exponential leakage penalty: every 65 mV of V_T reduction costs 10× the off-state current.

### 1.3 Short-channel effects, DIBL, and the scale length

In a long-channel device the surface potential in the middle of the channel is controlled entirely by the gate. In a short one, the depletion regions of the source and drain junctions reach into the channel and the drain's electric field lines terminate on channel charge that the gate "thinks" it owns. Consequences, collectively called **short-channel effects (SCE)**:

- **V_T roll-off**: V_T falls as L shrinks because the source/drain already deplete part of the channel; the gate has less charge to supply.
- **Drain-induced barrier lowering (DIBL)**: raising V_DS lowers the source barrier and thus V_T. Measured as ΔV_T/ΔV_DS in mV/V; good FinFETs are at ~ 30–50 mV/V, a poorly scaled planar device at 100+ mV/V. DIBL directly increases I_off at high drain bias and degrades output resistance (which matters for analog and SRAM).
- **SS degradation**: the effective C_dep rises because the drain now couples to the channel capacitively.
- **Punch-through**: at the extreme, the source and drain depletion regions merge and current flows deep in the body where the gate has no control at all.

The cleanest way to think about all of this is the **electrostatic scale length** λ. Solving Poisson's equation in the channel with the gate as a boundary condition gives a characteristic length over which the drain potential decays into the channel. For a single-gate planar device it is approximately

λ_planar ≈ sqrt( (ε_Si / ε_ox) × t_ox × t_dep )

where t_dep is the depletion depth under the channel (tens of nm in bulk silicon). For a double-gate or fin device with body (fin) thickness t_Si, the depletion depth is replaced by the geometric half-thickness of the body, and a widely used form (Frank, Taur, and Wong, 1998) is

λ_DG ≈ sqrt( (ε_Si / (2 ε_ox)) × t_Si × t_ox )

For a cylindrical gate-all-around nanowire of diameter d the scale length is smaller still, roughly λ_GAA ≈ sqrt( (ε_Si / (4 ε_ox)) × d × t_ox ) plus a logarithmic correction. To keep SCE under control the gate length must satisfy roughly

L_g ≥ 5–6 λ

The argument is now obvious. You can shrink λ by (a) thinning t_ox (which ran into the gate-leakage wall at ~ 1 nm, see Section 3), or (b) thinning the body t_Si and controlling it from more sides. A planar bulk device has t_dep ~ 30–50 nm and cannot get λ much below ~ 8–10 nm, so it cannot go below L_g ≈ 40–50 nm without leakage disaster; historically the planar era stalled at ~ 30 nm physical gate length around the 28/22 nm nodes. A fin 7 nm wide with gates on three sides behaves almost like a double-gate device with λ ~ 3–4 nm, allowing L_g ~ 16–20 nm. A nanosheet ~ 5–6 nm thick with the gate on all four sides pushes λ below 3 nm, allowing L_g ~ 12–14 nm.

> **Worked example: scale length for a FinFET vs a nanosheet.**
> Take ε_Si/ε_ox = 11.7/3.9 = 3.0 and an equivalent oxide thickness t_ox = 0.9 nm.
> FinFET, fin width t_Si = 7 nm, double-gate approximation: λ = sqrt(3.0/2 × 7 nm × 0.9 nm) = sqrt(9.45 nm²) ≈ 3.1 nm. Minimum gate length ≈ 5 × 3.1 ≈ 15–18 nm. That is right where 5 nm class FinFETs sit (L_g ≈ 16–18 nm).
> Nanosheet, thickness 5.5 nm, four-sided gate: λ ≈ sqrt(3.0/4 × 5.5 nm × 0.9 nm) ≈ sqrt(3.7 nm²) ≈ 1.9 nm. Minimum gate length ≈ 10–12 nm. Intel's IEDM 2024 research RibbonFETs reached L_g = 6 nm with 1.7 nm thick ribbons, exactly the regime this formula predicts (λ ≈ 1.1 nm). The catch is that below ~ 4–5 nm thickness, quantum confinement raises V_T and thickness variation of a single atomic layer (0.14 nm) becomes a ~ 3% V_T variation source, so production sheets stay at ~ 5–7 nm.

### 1.4 Dennard scaling and why it ended

In 1974 Robert Dennard's group at IBM showed that if you scale every dimension of a MOSFET (L, W, t_ox) by 1/k, scale the voltage by 1/k, and raise the doping by k, then the electric fields stay constant, delay falls by 1/k, transistor density rises by k², and the power density (W/mm²) stays exactly constant. That is **Dennard scaling**, and it worked for thirty years: k = √2 every generation gave 2× transistors, ~ 1.4× frequency, and the same heat per square millimeter.

It broke around 2004–2005 because voltage stopped scaling. V_DD can only come down if V_T comes down (you need V_DD − V_T overdrive for current), and V_T cannot come down because of the 60 mV/dec wall: I_off grows 10× per 65 mV. Once V_DD stalled at ~ 1 V while dimensions kept shrinking, power density rose every generation. The public symptom was Intel's 90 nm Prescott Pentium 4 (2004) at 100+ W and 3.8 GHz with gate leakage alone eating tens of watts; the 4 GHz part was cancelled and the industry pivoted to multi-core. Every node since has had to buy its improvement from new physics (strain, high-k, FinFET, GAA) rather than geometry alone.

### 1.5 The classic scaling levers

Three levers carried the industry from 90 nm to 22 nm without changing the planar shape of the transistor:

1. **Gate oxide EOT.** The **equivalent oxide thickness** (EOT) is the thickness of pure SiO₂ that would give the same capacitance as the actual dielectric: EOT = t_phys × (3.9/κ). Thinner EOT → higher C_ox → more inversion charge per volt and better electrostatics. SiO₂ was scaled from ~ 10 nm at 0.5 µm to 1.2 nm at 65 nm, at which point direct tunneling leakage (rising ~ 10× per 0.2–0.3 nm) reached ~ 100 A/cm² and stopped it.
2. **Strain engineering.** Mechanically stretching silicon along the channel increases electron mobility; compressing it increases hole mobility. Gains of 20–50% in drive current for "free" (Section 3.1).
3. **High-k/metal gate (HKMG).** Replace SiO₂ with a κ ≈ 20 material so you can be physically thick (low leakage) but electrically thin (Section 3.2).

## 2. CMOS Basics and What a "Node" Actually Measures

### 2.1 NMOS, PMOS, the inverter, and the standard cell

**CMOS** (complementary MOS) pairs an NMOS and a **PMOS** (p-channel, p+ source/drain in an n-type body, turned on by a negative V_GS) so that in either logic state one of the two is off and no static current flows from V_DD to ground. The inverter is a PMOS on top (source to V_DD) and an NMOS below (source to ground) sharing a gate (input) and a drain (output). Because holes are slower than electrons in unstrained silicon (~ 2–2.5× lower mobility), classic designs made the PMOS wider; in FinFET and nanosheet processes with SiGe strain the p/n current ratio is close to 1:1 and cells typically use equal fin/sheet counts.

Logic chips are not drawn transistor by transistor. They are assembled from a library of a few hundred **standard cells** (INV, NAND2, NOR2, AOI, flip-flops, etc.), all of the same height and varying width, placed in rows. Cell **height** is measured in **tracks**: the number of minimum-pitch horizontal metal lines (M0 or M1, whichever is the first routing layer parallel to the cell) that fit within it. A "6T" cell with a 40 nm metal pitch is 240 nm tall. Cell **width** is a multiple of the **contacted poly pitch (CPP)**, also called contacted gate pitch: the center-to-center distance between adjacent gates, which must accommodate a gate, two spacers, and a source/drain contact. A NAND2 is typically 3 CPP wide (two gates plus a half-CPP boundary on each side); a scan flip-flop is ~ 20–24 CPP.

### 2.2 CPP, MP, fin pitch, cell height: the true node metrics

Since about 2009 the "nm" in a node name has had no fixed relationship to any dimension on the chip. It is a marketing continuation of the old Moore's-law cadence (each name ≈ 0.7× the previous), chosen so that a "5 nm" node delivers roughly the density the trend line would have predicted. Nothing on a TSMC N3 chip is 3 nm: the physical gate length is ~ 16 nm, the fin width ~ 6 nm, the tightest metal pitch 23 nm, the gate oxide ~ 1 nm EOT. The honest metrics are:

- **CPP** (gate pitch): sets cell width. 90 nm (TSMC N16) → ~ 45–48 nm (N3/N2), and now nearly stuck: below ~ 45 nm you cannot fit gate (~ 14 nm) + two spacers (~ 5 nm each) + contact (~ 15 nm) + margins.
- **Metal pitch (MP)**: the tightest interconnect pitch (M0/M1); sets cell height via track count. 64 nm at N16 → 23 nm at N3; sub-25 nm needs EUV double patterning or High-NA.
- **Fin pitch (FP)**: determines how many fins fit in a cell height. 48 nm (N16) → 26–28 nm (N5/N3). For nanosheets it is replaced by sheet width plus n-to-p separation.
- **Cell height**: tracks × MP, or (fins per device × 2 + isolation) × FP, whichever binds. 9T (~ 576 nm at N16) → ~ 5–6T (~ 160–180 nm) today.
- **Transistor density** in **MTr/mm²** (millions of transistors per mm²). Intel's 2017 standard: 0.6 × (NAND2 density) + 0.4 × (scan flip-flop density), each cell's transistor count divided by its area. Marketing figures assume the densest library at 100% utilization; real chips achieve 50–70%.

The table collects publicly reported values from IEDM/VLSI disclosures, WikiChip, and TechInsights/SemiAnalysis teardowns; newest-node values are estimates (~) because foundries no longer disclose pitches and teardown numbers vary by ± 1–2 nm.

| Node (HVM year) | Device | Fin/sheet pitch (nm) | CPP (nm) | Min MP (nm) | HD cell height (nm) | Density (MTr/mm², HD library) |
|---|---|---|---|---|---|---|
| Intel 14 (2014) | FinFET | 42 | 70 | 52 | 399 | ~ 37.5 |
| Intel 10 / Intel 7 (2018 / 2021) | FinFET | 34 | 54 (60 relaxed) | 36 (M1), 40 (M0) | 272 | ~ 100 |
| Intel 4 (2023) | FinFET, EUV | 30 | 50 | 30 | 240 (HP only) | ~ 120–160 |
| Intel 3 (2024) | FinFET | 30 | 50 | 30 | 210 | ~ 1.1× Intel 4 |
| Intel 18A (2025) | RibbonFET + PowerVia | sheet | not disclosed (~ 50 est.; 45 in research) | 32 (M0) | 160 (5T HD), 180 (HP) | ~ 1.3× Intel 3 (Intel: "over 30%"), est. 200–240 |
| TSMC N16 (2015) | FinFET | 48 | 90 | 64 | 576 (9T) | ~ 29 |
| TSMC N7 (2018) | FinFET, DUV SAQP | 30 | 57 | 40 | 240 (6T) | ~ 91 |
| TSMC N5 (2020) | FinFET, EUV | 28 | 51 | 30 (M0 28) | 180 (6T) | ~ 138 measured / 171 claimed |
| TSMC N3E (2023) | FinFET, FinFlex | 26 | 48 | 23 | ~ 150–170 (2-1 fin) | ~ 200–215 |
| TSMC N2 (2025) | Nanosheet, NanoFlex | sheet | ~ 45 | ~ 23–25 | ~ 1.15× N3E | ~ 230–250 |
| TSMC A16 (2026) | Nanosheet + SPR | sheet | ~ 45 | ~ 23 | 1.07–1.10× N2 | ~ 250–270 |
| Samsung 7LPP (2018) | FinFET, EUV | 27 | 54 | 36 | 243 (6.75T) | ~ 95 |
| Samsung 5LPE (2020) | FinFET | 27 | 54 | 36 | 216 (6T) | ~ 127 |
| Samsung 3GAE / SF3E (2022) | MBCFET (3 sheets) | sheet | ~ 45–48 | ~ 28 | ~ 172 | ~ 150 (1.19× 5LPE) |
| Samsung 3GAP / SF3 (2024) | MBCFET | sheet | ~ 45 | ~ 28 | ~ 172 | ~ 190 claimed (Samsung claims 35% area reduction vs 5LPE, i.e. ~ 1.5×) |

Two lessons jump out. First, Intel 10 nm (2018) and TSMC N7 (2018) are the same density class; Intel 7 is a rename of 10 nm Enhanced SuperFin, made to align the marketing name with TSMC's. Second, the density gain per node has fallen from 2× (N16 → N10 → N7) to ~ 1.15× (N3E → N2). CPP has hit its floor and MP is limited by resistance and EUV double patterning, so the remaining density lever is cell height, which is why backside power (frees the power-rail tracks) and CFET (stacks n over p) are the next steps.

> **Worked example: transistor density from CPP, MP, and cell height.**
> Estimate the NAND2 density for TSMC N7: CPP = 57 nm, MP = 40 nm, 6-track cell.
> Cell height = 6 × 40 nm = 240 nm. A NAND2 is 3 CPP wide = 171 nm.
> NAND2 area = 171 nm × 240 nm = 41,040 nm² = 0.0410 µm². It contains 4 transistors, so NAND2 density = 4 / 0.0410 µm² = 97.5 MTr/mm².
> A scan D flip-flop with ~ 24 transistors in ~ 20 CPP: area = 1140 × 240 = 273,600 nm² = 0.274 µm², density 87.7 MTr/mm².
> Intel-formula density = 0.6 × 97.5 + 0.4 × 87.7 ≈ 93.6 MTr/mm², a good match to the 91.2 MTr/mm² figure quoted for N7 HD.
> Repeat for N5 (CPP 51, MP 30, 6T = 180 nm): NAND2 = 153 × 180 = 27,540 nm² → 145 MTr/mm². TechInsights' measured value on Apple silicon was ~ 138 MTr/mm²; TSMC's 171 MTr/mm² claim used a 1.8× scaling factor from N7 that assumed the tightest library.

> **Worked example: transistors on an 800 mm² die.**
> An AI accelerator die of 800 mm² on a 5 nm class process: at the 138 MTr/mm² library peak it could hold 800 × 138 M = 110 billion transistors. NVIDIA's H100 (TSMC 4N, 814 mm²) holds 80 billion, i.e. 98 MTr/mm², ~ 70% of peak. The gap is real and structural: ~ 30–40% of the die is SRAM (whose 6T bit cell is not on the logic scaling curve), 10–15% is I/O, HBM PHYs, and analog that use much larger devices, and logic placement rarely exceeds 70–80% utilization because of routing congestion and power grid. On N3E at ~ 210 MTr/mm² peak the same die could hold ~ 170 B at peak, or ~ 115–125 B at a realistic 70%.

## 3. The Planar Era: Strain and HKMG

### 3.1 90 nm: strained silicon (2003)

Intel's 90 nm process (Prescott, 2003–2004) was the first to ship **uniaxial strain**. Two techniques, still used today:

- **Embedded SiGe source/drain for PMOS.** After gate and spacer formation the PMOS source/drain regions are etched out (~ 60–80 nm recess) and refilled by selective epitaxy with Si_{1-x}Ge_x. Germanium's lattice constant is 4.2% larger than silicon's, so SiGe forced to match the silicon lattice wants to expand and squeezes the channel between the two S/D regions, putting it under **compressive** strain along the current direction; this lifts hole mobility by splitting the light- and heavy-hole valence bands. Intel used 17% Ge at 90 nm, 23% at 65 nm, 30% at 45 nm; today's SiGe:B source/drains are graded to 50–65% Ge with boron at ~ 1 × 10²¹ cm⁻³. Gains: ~ 25% drive current at 90 nm, > 50% cumulative later.
- **Tensile nitride stress liner for NMOS.** The PECVD Si₃N₄ deposited over the finished gate (the same film that serves as the contact etch-stop layer, **CESL**) can be tuned to ~ 1–2 GPa of intrinsic **tensile** stress via hydrogen content and plasma conditions; it pulls on the gate and transmits tension into the channel, raising electron mobility ~ 10–20%. A **dual stress liner** flow patterned tensile film over NMOS and compressive over PMOS; Si:P or SiC:P embedded S/D later provided NMOS tensile strain directly.

Strain scales badly with pitch: as CPP shrinks, so does the S/D volume available to push on the channel, one reason nanosheet nodes are re-engineering strain through the channel itself (SiGe channels for PMOS; "stress engineering" is a listed lever in TSMC's N2 disclosure).

### 3.2 45 nm: high-k metal gate (Intel, 2007)

By 65 nm the SiON gate dielectric was 1.2 nm thick (~ 4 atomic layers) and tunneling leakage was ~ 100 A/cm², a significant fraction of chip power. A second, less obvious problem was **polysilicon depletion**: the heavily doped poly gate is still a semiconductor, and under inversion bias a ~ 0.3–0.5 nm depletion layer forms in it at the oxide interface, adding electrically to the EOT; on a 1.2 nm oxide that is a ~ 33% loss of gate capacitance. Metal gates have no depletion layer.

Intel's 45 nm process (Penryn, November 2007) replaced SiON with hafnium-based high-k (HfO₂, κ ≈ 20–25, ALD from HfCl₄ + H₂O at ~ 300 °C) at ~ 1.0 nm EOT and ~ 2–3 nm physical thickness over a ~ 0.5 nm SiO₂ interfacial layer (unavoidable, and needed for mobility), and poly with metal. Gate leakage fell more than 10× while C_ox rose. Two problems had to be solved first, and they define how the gate is built today:

1. **Fermi-level pinning and V_T.** A poly gate's work function can be set n-type or p-type by doping it. A metal on HfO₂ has a work function that is partially pinned by interface dipoles and oxygen vacancies; you need two different metals to get band-edge V_T for NMOS (~ 4.1–4.3 eV) and PMOS (~ 4.9–5.1 eV).
2. **Thermal budget.** The work-function metals and the high-k are not stable through the ~ 1000 °C source/drain activation anneal: the metal work function drifts toward mid-gap and the interfacial layer regrows. This is the reason for gate-last.

### 3.3 Gate-first vs gate-last, and the replacement metal gate flow

**Gate-first** (used by IBM, Samsung, and GlobalFoundries at 32/28 nm) deposits high-k and metal early, in the same position as the old poly gate, then runs the full S/D implant and anneal over it. It is simpler and cheaper but the V_T window is compromised by the anneal, and it was abandoned by everyone at 20/14 nm.

**Gate-last**, or **replacement metal gate (RMG)**, is Intel's 45 nm approach and the industry standard since. A sacrificial ("dummy") polysilicon gate is used to define the transistor, all high-temperature steps are done, and only then is the poly pulled out and replaced. Step by step:

1. Grow a thin dummy oxide (~ 2 nm thermal SiO₂) and deposit ~ 80–100 nm of amorphous/poly silicon plus a SiN or SiO₂ hardmask.
2. Pattern the gate lines (litho + etch, Module 07/09). The poly line width defines L_g.
3. Form spacers (ALD low-k SiOCN or SiBCN, ~ 5–8 nm per side, anisotropically etched back).
4. Recess and epitaxially regrow source/drain (SiGe:B for PMOS, Si:P for NMOS), then anneal (spike/laser, Module 10). This is the last > 900 °C step the gate will ever see.
5. Deposit the CESL nitride and the **ILD0** (interlayer dielectric zero, a flowable or HDP oxide), then **CMP** the oxide down until the tops of the poly gates are exposed. Planarity here is critical: over-polish and you thin the gates unevenly; under-polish and some gates stay buried and cannot be replaced (a killer defect).
6. **Remove the dummy poly** by a selective wet etch (hot NH₄OH or TMAH) or a dry etch, stopping on the dummy oxide, then strip the dummy oxide in dilute HF. You are left with an empty trench between the spacers, ~ 20 nm wide and ~ 80 nm deep, with the bare fin (or planar channel) at the bottom.
7. Grow a controlled **interfacial layer** (chemical oxide, ~ 0.5–0.8 nm, by ozone or SC1 chemistry) and deposit **HfO₂ by ALD** (~ 1.5–2 nm). Some flows ("high-k first") deposit the high-k under the dummy gate and keep it; most leading-edge flows are "high-k last" as described here so the dielectric never sees the S/D anneal. A short post-deposition anneal (~ 700–900 °C for milliseconds to seconds, or in NH₃/N₂) densifies the film and passivates traps.
8. Deposit the **work-function metal (WFM) stack** by ALD. A typical sequence: a TiN cap (~ 1 nm) to protect the high-k, then for PMOS a thick TiN (or TiN/TaN) that gives a high work function (~ 4.8–5.0 eV); for NMOS a thin TiN, then a TiAl or TiAlC layer (~ 2–4 nm) whose aluminum lowers the effective work function to ~ 4.2–4.4 eV, then a TiN cap. The PMOS-only layers are deposited everywhere, patterned, and wet-etched off the NMOS trenches before the NMOS layers go down, so a modern flow has 4–8 metal depositions and 2–4 masking steps inside the gate trench.
9. **Multiple threshold voltages** come from this same stack. The WFM thickness sets V_T continuously over ~ 100–200 mV (a thicker TiN shifts PMOS V_T; the TiAl thickness and its Al diffusion shift NMOS V_T), and **dipole engineering** adds more: an ultrathin (~ 0.3–0.5 nm) La₂O₃ or LaO layer driven into the HfO₂/SiO₂ interface creates a dipole that lowers NMOS V_T; Al₂O₃ does the opposite for PMOS. Combining thickness and dipole options gives the 4–6 V_T flavors a foundry PDK offers (e.g. eLVT, LVT, SVT, HVT, uHVT), each with its own leakage/speed trade-off, and all made in the same trench with different mask combinations.
10. **Fill** the remaining trench with a low-resistance metal: originally W by CVD (WF₆ + B₂H₆ nucleation, then WF₆ + H₂ bulk, on a TiN barrier), later Co, and in nanosheet nodes W or Mo with fluorine-free precursors because WF₆ attacks thin WFMs. Fill must be void-free in a trench whose aspect ratio, after the WFM layers narrowed it, may exceed 5:1.
11. **CMP** the metal back to the ILD0 surface, then **recess** the metal gate ~ 20–30 nm below the surface with a dry etch and fill the recess with SiN: the **self-aligned contact (SAC) cap**. Its purpose: when the S/D contact trench is etched later it can overlap the gate without shorting to it, because the nitride cap and spacers are etch-resistant relative to the ILD oxide. Without SAC, contact-to-gate overlay would need to be better than ~ 5 nm at 50 nm CPP; with it, ~ 10 nm is tolerable.

RMG costs roughly 20–30 extra process steps over gate-first and brought CMP, ALD, and selective wet etching into the very center of the transistor. Its virtue is that the fragile gate stack is the last thing built in the front end.

## 4. FinFET

### 4.1 Why fins, and Intel's 22 nm tri-gate (2011)

The FinFET, first demonstrated by Chenming Hu's group at UC Berkeley in 1999 under a DARPA program, turns the channel on its side: the channel is a thin vertical **fin** of silicon and the gate wraps over its top and both sidewalls. Two sidewalls give double-gate electrostatics; the top adds a third (Intel's "tri-gate"). The fin thickness t_Si becomes the body thickness in the scale-length formula, and because the fin is fully depleted, channel doping can be nearly intrinsic (~ 10¹⁵–10¹⁶ cm⁻³), eliminating random-dopant V_T variability and raising mobility.

Intel shipped it first at 22 nm (Ivy Bridge, 2011–2012): fins 8 nm wide, 34 nm tall, 60 nm pitch, 90 nm gate pitch. Every Intel node since, and every foundry node from 16/14 nm (TSMC and Samsung/GlobalFoundries, 2015), is a FinFET until the 3/2 nm nanosheet transition. FinFET geometry evolved as follows:

| Node | Fin width (nm) | Fin height (nm) | Fin pitch (nm) | Patterning |
|---|---|---|---|---|
| Intel 22 (2011) | ~ 8 | 34 | 60 | 193i SADP |
| Intel 14 (2014) | ~ 8 | 42 | 42 | 193i SADP |
| Intel 10 (2018) | ~ 7 | ~ 46–53 | 34 | 193i SAQP |
| TSMC N7 (2018) | ~ 6–7 | ~ 52 | 30 | 193i SAQP |
| TSMC N5 (2020) | ~ 6–7 | ~ 50–55 | 28 | EUV single |
| TSMC N3E (2023) | ~ 6 | ~ 50 | 26 | EUV single |

Fins got taller (more effective width per footprint: W_eff = 2H + W ≈ 110 nm per fin), narrower (better electrostatics), and closer together. Width is limited by two things: below ~ 5 nm, quantum confinement and line-edge roughness make V_T uncontrollable, and the fin becomes too fragile to survive wet cleans (capillary forces bend or collapse it, the same pattern-collapse problem that afflicts resist). Height is limited by etch aspect ratio and by mechanical stability under the stress of the gate metal and epi.

### 4.2 Fin quantization, depopulation, and the fin cut

Because fins come only in integer numbers, device width is **quantized**: a transistor is 1, 2, or 3 fins wide, never 1.4. At 16/14 nm a typical cell used 3–4 fins per transistor (9T at 48 nm FP). **Fin depopulation** delivered most of the cell-height scaling since: taller fins carry more current each, so N7 moved to 2–3 fins per device (6T at 30 nm FP), N5 to 2, and N3E's FinFlex offers 2-1 (two fins for one device type and one for the other, in alternating rows, an average of 1.5 fins), 2-2, and 3-2 libraries. You cannot go below one fin per device, and a 1-fin transistor has poor drive and high variability; that floor ends the FinFET and motivates nanosheets, where width is continuously tunable again.

Fins are patterned as a continuous sea of lines across the die at one pitch (what SADP/SAQP produce; Module 07) and removed where unwanted by a **fin cut** mask: litho plus etch that segments the lines and deletes fins between n and p devices and between cells. Its edge-placement error becomes width variation of the end fins, making it one of the most overlay-critical steps in the flow (EUV single exposure at N5+).

### 4.3 Fin reveal and STI recess

After the fins are etched (~ 100–130 nm into the bulk; the active fin is only the top ~ 50 nm) the trenches are filled with oxide (**shallow trench isolation, STI**) by flowable CVD (a polysilazane-like liquid film cured by steam anneal and UV), because nothing else fills a 20 nm wide, 120 nm deep gap void-free. The oxide is CMP'd flat and then **recessed** by a tightly controlled etch (dry, vapor HF, or SiCoNi-type chemical oxide removal) to expose the fin top: the **fin reveal**. The revealed height is the active fin height, so this etch depth (± 1–2 nm) is a direct device parameter. The buried fin below the STI gets a **punch-through stopper (PTS)** implant so current cannot flow under the gate-controlled region.

## 5. A Complete FinFET FEOL/MOL Process Flow

The following is a representative ~ 40-step flow for a 7/5 nm class FinFET logic process. Each line is a "major step"; each contains multiple unit operations (clean, deposition, litho, etch, strip, metrology). "FEOL" is front end of line (transistor), "MOL" is middle of line (local contacts), and the BEOL (Module 12) follows.

```
FEOL: SUBSTRATE AND FINS
 1. Start: 300 mm p-type Cz wafer, <100>, ~ 10 ohm-cm, often with a ~ 2 µm p- epi layer
 2. Pad oxide (thermal, ~ 5 nm) + pad nitride (LPCVD SiN, ~ 30–40 nm) + fin hardmask stack
 3. Fin patterning: mandrel litho (193i or EUV) -> SADP/SAQP spacers -> fin pitch 26–34 nm
 4. Fin cut litho + etch (remove unwanted fins between cells / n-p boundary)
 5. Fin etch: Cl2/HBr/O2 plasma, ~ 120 nm deep, sidewall angle ~ 88–90 deg, width ~ 6–8 nm
 6. STI fill: flowable CVD oxide, steam/UV cure, densification anneal
 7. STI CMP to pad nitride; pad nitride strip (hot phosphoric acid)
 8. STI recess (fin reveal): controlled oxide etch, exposes ~ 50 nm of fin
 9. Well and punch-through-stopper implants (n-well for PMOS, p-well for NMOS), through masks
10. Well anneal / dopant activation (spike RTA ~ 1050 C)

FEOL: DUMMY GATE
11. Dummy gate oxide (thermal or ALD SiO2, ~ 2 nm) over fins
12. Dummy poly: amorphous Si ~ 90 nm (LPCVD, SiH4, ~ 550 C) + poly CMP for planarity over fins
13. Gate hardmask (SiN/SiO2), gate litho (SADP at 54–57 nm pitch, EUV single at N5+)
14. Gate etch: HBr/Cl2/O2, stops on dummy oxide, vertical profile over fin topography (~ 100 nm step)
15. Gate cut litho + etch (cuts the long gate line into per-device segments)

FEOL: SPACERS AND SOURCE/DRAIN
16. Spacer 1: ALD low-k SiOCN or SiBCN (~ 5–8 nm), anisotropic etch-back (fin sidewalls cleared)
17. NMOS S/D region: PMOS masked; fin recess etch (~ 40–50 nm), pre-clean
18. NMOS S/D epi: Si:P (P ~ 2–3e21, in-situ doped, ~ 650–700 C, SiH4/DCS + PH3 + HCl selective)
19. PMOS S/D region: NMOS masked; fin recess etch, pre-clean (dHF + SiCoNi)
20. PMOS S/D epi: SiGe:B graded 30 -> 55–65 % Ge, B ~ 1e21; diamond-shaped merged/unmerged epi
21. Spacer 2 / epi encapsulation (thin SiN), S/D activation (laser or flash anneal, ms, ~ 1100–1200 C)
22. CESL: ALD/PECVD SiN ~ 3–5 nm (also stress liner)
23. ILD0: flowable oxide, cure, TEOS cap; ILD0 CMP stopping on dummy gate tops (poly open)

FEOL: REPLACEMENT METAL GATE (RMG)
24. Dummy poly removal (NH4OH / TMAH wet or SF6 dry), dummy oxide strip (dHF)
25. Interfacial layer growth (~ 0.6 nm chemical oxide) + HfO2 ALD (~ 1.8 nm) + PDA anneal
26. WFM stack: TiN cap; PMOS TiN/TaN (thick); litho + wet strip off NMOS; NMOS TiAlC + TiN
    (repeat with dipole layers / thickness variants for each Vt flavor: 4–6 masks total)
27. Gate fill: W (WF6/B2H6 nucleation + bulk) or Co / fluorine-free W on TiN, void-free
28. Metal gate CMP to ILD0 surface
29. Gate recess etch (~ 25 nm) + SAC cap: SiN fill + CMP

MOL: CONTACTS AND LOCAL INTERCONNECT
30. Trench contact (MD / CA) litho (EUV) + etch through ILD0, self-aligned to SAC cap and spacers
31. Contact pre-clean, Ti PVD/ALD + anneal -> TiSix silicide on Si:P and SiGe:B (rho_c ~ 1e-9 ohm-cm2)
32. TiN barrier (ALD, ~ 1–2 nm) + Co (or W, Ru at newer nodes) fill, CMP
33. Gate contact (CB / VG) litho + etch, landing on the metal gate through the SAC cap
    (contact-over-active-gate, COAG, at Intel 10 nm+ lets it sit over the fin rather than at the cell edge)
34. Gate contact fill (W/Co), CMP
35. M0 / local interconnect (MP / M0A / MD-to-M0 vias): ILD deposition, EUV litho, etch, metal fill
    (Cu with TaN barrier, or Co / Ru for tight pitch), CMP
36. Cap / etch stop (SiCN ~ 10 nm) -> hand-off to BEOL (Module 12): M1, V1, M2 ... M15+
```

A few of the "what can go wrong" items that consume a fab's engineering time:

- **Fin etch profile.** A fin 2 nm wider at the base than the top has a bottom that is harder to turn off (thicker body, larger λ); the etch cycles passivation chemistry to hold the profile to ± 0.5 nm.
- **Epi defects.** Selective epi must nucleate only on exposed silicon (HCl in the gas mix etches nuclei off dielectrics); facets, stacking faults, and voids between merged fins become resistance variation and yield loss.
- **WFM thickness in the gate trench.** At 50 nm CPP the trench after spacers is ~ 15–20 nm wide; each of the 4–8 ALD metal layers must be conformal to better than 0.2 nm because V_T shifts ~ 10–20 mV per angstrom of TiAl or TiN.
- **Contact resistance.** At N5/N3 a single S/D contact is ~ 15 × 30 nm and its ~ 100–200 Ω is comparable to the channel resistance; pushing ρ_c from ~ 10⁻⁸ to ~ 10⁻⁹ Ω·cm² with heavy in-situ doping and Ti silicide is worth ~ 10% drive current by itself.

## 6. Gate-All-Around Nanosheets

### 6.1 Why nanosheets

A **nanosheet** (Samsung: MBCFET, multi-bridge-channel FET; Intel: RibbonFET; imec/IBM: nanosheet; TSMC: nanosheet) is a FinFET turned on its side again and sliced: instead of one tall vertical fin, the channel is a vertical stack of three or four thin horizontal silicon ribbons, each ~ 5–7 nm thick and ~ 15–50 nm wide, spaced ~ 10–13 nm apart, with the gate filling the gaps so that each sheet is gated on all four sides. Three advantages:

1. **Electrostatics.** Four-sided gating gives the smallest λ for a given body thickness. SS improves to ~ 65–68 mV/dec and DIBL to ~ 30 mV/V at L_g ≈ 12–14 nm, where a FinFET would be at 70+ mV/dec and 50+ mV/V.
2. **Continuously tunable width.** Sheet width is set by litho, not by an integer fin count. A designer can use narrow (~ 15–20 nm) sheets for low-power cells and wide (~ 40–50 nm) sheets for drive-critical paths within the same cell height, which is what TSMC calls **NanoFlex** at N2 and Samsung exploits in MBCFET.
3. **More current per footprint at lower capacitance.** At equal footprint a three-sheet stack delivers ~ 10–20% more drive than two fins, with less parasitic gate capacitance because the gate no longer wraps around fin-to-fin gaps.

The price is a substantially harder process, dominated by three new steps: the superlattice epi, the inner spacer, and the channel release.

### 6.2 The Si/SiGe superlattice

The starting material is no longer a bare wafer. On top of the bulk silicon (or over a bottom isolation layer) a **Si/SiGe superlattice** is grown by epitaxy (Module 06; reduced-pressure CVD in an ASM Intrepid or Applied Centura at ~ 600–700 °C from SiH₄/DCS and GeH₄): alternating Si_{0.7}Ge_{0.3} (25–35% Ge, ~ 8–12 nm, the future gate gaps) and pure Si (~ 5–7 nm, the future channels), three or four pairs plus a Si cap, ~ 50–70 nm total. Every interface must be abrupt to a monolayer, the Ge fraction uniform to ± 1% across the wafer (it sets etch selectivity later), the SiGe fully strained with no misfit dislocations (which caps Ge at ~ 35% at these thicknesses), and the Si layers atomically smooth, because their thickness is the channel thickness and each 0.14 nm atomic step is a V_T variation source. The superlattice is then patterned into fins exactly as before (SAQP or EUV, etch through the stack into the substrate, STI fill and recess): early in the flow a nanosheet fin is a FinFET fin with stripes in it.

### 6.3 Inner spacers, the hardest step

In a FinFET the gate spacer sits on top of the fin and separates gate from S/D. In a nanosheet the gate will later occupy the SiGe gaps between sheets, and those gaps run all the way from the source to the drain. Without something in the way, the replacement gate metal would touch the S/D epi. The **inner spacer** solves this:

1. After the dummy gate and outer spacer are formed and the S/D regions are recessed (etching through the entire superlattice to expose the stack edge), the SiGe layers are **laterally recessed** ~ 5–8 nm from the edge by a highly selective isotropic etch (vapor-phase HCl at ~ 500–650 °C, or a dry radical etch; selectivity SiGe:Si > 50:1 is required). The Si sheets stick out as tiny cantilevers.
2. A conformal dielectric (ALD SiN, SiOCN, or SiOC, low-k) is deposited to fill the lateral cavities, ~ 5–8 nm thick to pin off the cavity entrances.
3. An isotropic **etch-back** removes the dielectric from all exposed surfaces but leaves it inside the cavities (because there the film is "protected" by geometry). The remaining plugs are the inner spacers.

The tolerances are brutal. The inner spacer width sets each sheet's gate-to-S/D separation and hence its effective gate length, and it must be identical for the top, middle, and bottom sheets even though the etchant reaches them differently (loading); a 1 nm difference is a 1 nm L_g mismatch between sheets of the same transistor. The recess must not thin the Si sheets (a V_T shift) and the etch-back must leave the sheet edges residue-free, since they seed the S/D epi. Every foundry treats its inner-spacer recipe as one of its most protected secrets, and imec, Applied, and Lam all cite the step as the largest yield-learning item in the nanosheet transition.

### 6.4 Source/drain epi and channel release

The S/D epi now grows from the exposed sidewalls of the three or four Si sheets (and from the substrate at the recess bottom), and the separate growth fronts must merge into one void-free crystal contacting all sheets in parallel, a more delicate recipe than in a FinFET. A **bottom dielectric isolation** (BDI) or a heavily doped punch-through stopper is needed under the bottom sheet, otherwise a parasitic planar transistor forms in the substrate, gated by the same gate, adding leakage without useful current.

After ILD0 and poly-open CMP the dummy gate is removed as in a FinFET. Then comes the **channel release**: the SiGe between the sheets is etched away, leaving the Si sheets suspended in mid-air, anchored only at their ends by the inner spacers and S/D epi. The etch is isotropic, must reach the full gate footprint from both sides, and needs > 100:1 SiGe:Si selectivity: vapor HCl, remote-plasma or thermal fluorine chemistry (CF₄/O₂ or ClF₃-based, as in TEL's Certas), or wet HF/H₂O₂/acetic acid. Two failure modes dominate: **stiction** (sheets pulled together by capillary forces during wet steps, hence dry or supercritical drying) and **sheet thinning/rounding** (~ 1 nm of corner rounding is fine and even helps field uniformity; thickness loss is a V_T shift). A short trim and clean follow, and then the gate stack goes in.

### 6.5 The wrap-around gate and the 10 nm gap problem

The released structure has ~ 10–13 nm gaps between sheets. Into that gap must go, from each sheet surface: interfacial oxide (~ 0.6 nm), HfO₂ (~ 1.5–1.8 nm), TiN cap (~ 1 nm), and the work-function metal. Counting both sheet surfaces facing the gap, the dielectric stack alone consumes ~ 6–7 nm, leaving ~ 4–6 nm for the WFM and fill from both sides, i.e. ~ 2–3 nm per surface. That is thinner than the TiAl/TiN thickness FinFET flows used to tune V_T. Consequences:

- V_T tuning shifts almost entirely to **dipole engineering** (La-based dipoles for NMOS, Al-based or fluorine treatments for PMOS) and to WFM composition rather than thickness; TSMC's N2 papers highlight multi-V_T by dipole for exactly this reason.
- The inter-sheet gap is completely filled by WFM; the W/Mo fill sits only above and beside the stack.
- The wet strip of PMOS metal off the NMOS trenches must clear metal from inside the gaps without undercutting the n/p boundary, only ~ 40–50 nm away.

Sheet spacing is thus a trade-off: wider spacing eases the gate fill but makes the stack taller and every etch harder. Published cross-sections show ~ 10–12 nm.

### 6.6 Who shipped what

- **Samsung 3GAE (SF3E), June 2022**: first GAA in production, three sheets, initially for crypto-mining ASICs; the second generation SF3 (3GAP) in 2024 with a claimed 35% area reduction (~ 1.5× density) vs 5LPE and improved sheets; SF2 in 2025–2026.
- **TSMC N2, Q4 2025**: three sheets, NanoFlex libraries, 1.15× density over N3E, 24–35% lower power or 10–15% higher speed at the same power. N2P follows in 2026, A16 with Super Power Rail in H2 2026.
- **Intel 18A, 2025 (Panther Lake, HVM late 2025)**: RibbonFET (Intel's RibbonFET disclosures have shown four ribbons; Intel has not stated the production count) plus PowerVia; Intel skipped the planned 20A product node in 2024 and moved directly to 18A; 14A with High-NA EUV follows.

### 6.7 The GAA nanosheet flow

The nanosheet flow reuses the FinFET flow above with the following substitutions and insertions (numbering refers to the FinFET list):

```
GAA NANOSHEET FEOL FLOW (deltas from the FinFET flow)
 1a. Substrate + optional bottom isolation (or PTS implant + anneal)
 1b. Si/SiGe superlattice epi: 3–4 x [SiGe(25–35 % Ge, 8–12 nm) / Si(5–7 nm)] + Si cap, RPCVD ~ 650 C
 3–8. Fin patterning, cut, etch THROUGH the superlattice (multi-material etch), STI fill/CMP/recess
      (STI recessed to just below the bottom SiGe so the stack stands proud)
11–15. Dummy oxide, dummy poly, gate litho/etch, gate cut (as FinFET; gate straddles the striped fin)
16. Outer spacer ALD + etch-back
17'. S/D recess: anisotropic etch through the whole stack to (or below) the bottom sheet
17a. SiGe lateral recess: selective isotropic etch, 5–8 nm, equal for all sheets   <-- inner spacer 1
17b. Inner spacer dielectric ALD (SiOCN/SiN, 5–8 nm) fills the lateral cavities  <-- inner spacer 2
17c. Isotropic etch-back leaves dielectric only in the cavities                    <-- inner spacer 3
18–20. NMOS Si:P and PMOS SiGe:B epi, grown from sheet sidewalls, merging into one crystal
21–24. Activation anneal, CESL, ILD0, poly-open CMP, dummy poly + oxide removal (as FinFET)
24a. CHANNEL RELEASE: selective SiGe removal (vapor HCl / radical F chemistry / wet), > 100:1
24b. Sheet trim, corner rounding control, dry/supercritical clean; stiction check
25'. IL + HfO2 ALD wrapping all four sides of every sheet
26'. WFM: thin TiN / TiAlC stacks within ~ 2–3 nm per surface; Vt set by dipoles (La2O3 / Al2O3)
27'. Gate fill (W or Mo, fluorine-free) above the stack; inter-sheet gaps are WFM-filled
28–36. Gate CMP, recess, SAC cap, contacts, MOL (as FinFET), with sheet-stack-tall contact recesses
```

Two added mask layers (n/p WFM inside gaps, sheet-width variants) and roughly 10–15 extra process steps over a FinFET flow, plus the superlattice epi that increases starting-material cost. TSMC's reported N2 wafer price of ~ $30,000 (vs ~ $20,000 for N3) reflects this and the additional EUV layers.

## 7. Forksheet, CFET, and the Roadmap Beyond

### 7.1 Forksheet

In a nanosheet cell the NMOS and PMOS stacks must be separated by enough space for the WFM patterning and the gate to be etched between them, ~ 40–50 nm of n-to-p spacing that is pure overhead. imec's **forksheet** (2017 proposal, demonstrated 2021) inserts a thin dielectric wall (~ 10–15 nm of SiN) between the n and p stacks before the gate is formed; the sheets are grown/etched up against the wall like the tines of a fork. The wall lets the n-to-p spacing shrink to the wall thickness, buying ~ 20% cell-height reduction (a 5T → 4T cell), and it also serves as a hard stop for the WFM wet etch, simplifying the n/p patterning. The sheets are gated on three sides rather than four, a minor electrostatic loss. imec places the forksheet at its A10 node (~ 2028) as the last cell-height scaling step before CFET; TSMC and Intel have both published forksheet research but neither has announced it as a production node.

### 7.2 CFET

The **complementary FET (CFET)** stacks the NMOS on top of the PMOS (or vice versa) in the same footprint, so the cell height collapses from (n stack + p stack + spacing) to a single stack: a 4T or even 3T cell, the last ~ 1.5–2× density lever that geometry can offer. Two integration schemes:

- **Monolithic CFET.** One very tall superlattice (~ 150–250 nm) with the pFET sheets, a thick middle dielectric isolation, and the nFET sheets; fins are etched through all of it (15–20:1 aspect ratio), S/D epi is grown separately for the bottom (SiGe:B) and top (Si:P) tiers with the other masked, and contacts must reach past the top device to the bottom one. Intel showed CFET inverters at 60 nm gate pitch (IEDM 2023) and with backside contacts (IEDM 2024); TSMC showed a 48 nm gate pitch CFET inverter at IEDM 2023 and 2024.
- **Sequential CFET.** Build the bottom tier normally, bond a second silicon layer on top (Smart Cut style, Module 03), and build the top tier below ~ 500 °C so the bottom survives. Simpler per tier, but low-temperature activation and epi and ~ 10 nm bonding overlay are hard, and it doubles FEOL cost.

imec's roadmap places CFET at ~ A7 (2030–2032); foundries have committed only to research. The wiring is as hard as the device: with n over p the MOL must contact gate, source, and drain at two levels, and backside power (next section) becomes a prerequisite so that at least power comes from below.

### 7.3 Backside power delivery

In a conventional chip both signals and power come down through ~ 15 metal layers from the top. The power grid consumes ~ 20% of the routing resources on the lowest layers, and V_DD travels through a dozen vias and thin wires, losing ~ 5–10% of its value (IR drop) before reaching a transistor. **Backside power delivery (BSPDN)** moves the power network to the back of the wafer, directly under the transistors.

**Intel PowerVia (Intel 18A, 2025)**, first demonstrated on the "Blue Sky Creek" test chip (Intel 4 process, VLSI 2023):

1. Build the front side normally, but form **nano-TSVs** early (through-silicon vias of ~ 100 nm class, roughly 500× smaller than package TSVs) dropping from the M0 power rails through the STI to below the fin bottoms.
2. Bond the finished front side to a **carrier wafer** (oxide-to-oxide fusion bonding, Module 17).
3. Flip and **thin the device wafer from the back**: grind ~ 750 µm of the 775 µm away, then CMP and a selective etch stopping on a buried etch-stop (SiGe layer or the STI oxide) so only a few hundred nanometers of silicon, the fins and STI, remain, uniform to tens of nm across 300 mm.
4. Expose the nano-TSVs from the back and build a coarse **backside metal stack** (2–3 thick Cu layers) with bump pads on the back.

Reported results: 30% lower platform voltage droop (IR drop), > 90% standard-cell utilization (vs ~ 80%) because power rails no longer compete with signals, ~ 6% higher frequency at iso-design, and 5–10% smaller cells since the M0 rail tracks are freed. Intel 18A ships PowerVia in Panther Lake.

**TSMC A16 Super Power Rail (SPR), H2 2026**: rather than nano-TSVs from M0, SPR makes **backside contacts directly to the source/drain epi**, so the path is backside metal → backside contact → S/D and the front side is entirely signal. It is the most area-efficient variant (7–10% density, 8–10% speed or 15–20% power over N2P) and the hardest to build, because the contact must land on a ~ 20 nm epi region from the other side of a thinned wafer with ~ 10 nm overlay to the front-side pattern. Samsung has announced backside power for SF2Z (~ 2027).

The costs are real: carrier bonding, extreme thinning, backside litho aligned to front-side marks, and a double-sided wafer that no existing test or handling infrastructure was designed for. Thermally, the transistors are now sandwiched between two metal stacks with no bulk silicon to spread heat; some analyses put hot spots 10–20 °C worse, a serious concern for 1,000 W class AI accelerators.

### 7.4 Far-future options, briefly

- **2D semiconductors** (MoS₂, WS₂, WSe₂): a monolayer is 0.65 nm thick with no dangling bonds, so the scale length would allow L_g < 5 nm. Intel, TSMC, and imec have shown GAA 2D transistors (Intel at IEDM 2024), but contact resistance (~ 10× too high; semimetal Sb/Bi contacts help), 300 mm single-crystal monolayer growth, and p-type mobility are unsolved. Realistic timing is 2035+.
- **Negative-capacitance FET**: a ferroelectric HfZrO₂ layer in the gate stack amplifies the surface potential, in principle beating 60 mV/dec; hysteresis and speed have kept it out of production after a decade of papers.
- **Tunnel FETs** (sub-60 mV/dec via band-to-band tunneling) have too little I_on; **vertical transport FETs** (IBM/Samsung VTFET) trade CPP scaling for new problems; **cryogenic CMOS** (SS scales with T) is real for quantum-control chips, not GPUs.

## 8. Node Timeline, SRAM, and Design Co-Optimization

### 8.1 Who introduced what, when

| Year | TSMC | Intel | Samsung | Key device change |
|---|---|---|---|---|
| 2003–04 | 90 nm | 90 nm strained Si | 90 nm | eSiGe S/D, stress liners |
| 2007 | 45 nm (2008, poly/SiON) | 45 nm HKMG gate-last | 45 nm | HfO2 + metal gate (Intel) |
| 2011–12 | 28 nm HKMG gate-last | 22 nm tri-gate FinFET | 32/28 nm gate-first HKMG | First FinFET (Intel) |
| 2014–15 | N16 FinFET (2015) | 14 nm FinFET (2014) | 14 nm FinFET (2015) | Foundry FinFETs |
| 2018 | N7 (DUV SAQP) | 10 nm (2018–19, COAG) | 7LPP (first EUV in logic) | EUV enters |
| 2020 | N5 (EUV, ~ 14 layers) | 10 SuperFin | 5LPE | Fin depopulation to 2 |
| 2022 | N3 (N3B Dec 2022) | Intel 7 / Intel 4 (2023) | 3GAE, first GAA (June 2022) | First nanosheet |
| 2023–24 | N3E (H2 2023), N3P | Intel 3 (2024) | SF3 (3GAP) | FinFlex libraries |
| 2025 | N2 (Q4 2025 HVM, NanoFlex) | 18A RibbonFET + PowerVia (Panther Lake) | SF2 | GAA everywhere |
| 2026 | N2P, A16 (SPR, H2) | 18A-P, 14A (High-NA) risk | SF2P | Backside power |
| 2027–28 | A14 | 14A HVM | SF2Z (BSPDN), SF1.4 | High-NA, forksheet research |
| ~ 2030+ | A10 and beyond | | | CFET, 2D channels |

### 8.2 The SRAM scaling stall

The 6T SRAM bit cell (two cross-coupled inverters plus two pass transistors) is the densest structure on a logic chip and 30–40% of a GPU or CPU die. It scaled with logic until N5: TSMC's high-density cell went 0.027 µm² (N7) → 0.021 µm² (N5) → 0.0199 µm² (N3B) → **0.021 µm² again on N3E** (relaxed for yield and cost). N2 recovers to ~ 0.0175 µm² (38 Mb/mm²); Intel's 18A HD cell is 0.021 µm² (31.8 Mb/mm²). SRAM stopped scaling because its transistors are already single-fin/narrow-sheet (no depopulation left to harvest), it needs V_T matching across six devices (variability grows as area shrinks), and its 2-CPP layout has no spare tracks to remove. Cache is therefore expensive silicon, which pushes AMD (3D V-Cache) and others toward stacking SRAM made on an older node (Module 17), and it is a big part of why "2× density per node" no longer means 2× chip capability.

### 8.3 DTCO, STCO, and V_T flavors

Because the pure-geometry levers have run out, every node since ~ 10 nm has been defined by **design-technology co-optimization (DTCO)**: the process is designed around specific standard-cell layout tricks and the cells around what the process can pattern. Examples: single-diffusion-break isolation between cells (saves 1 CPP per boundary), contact over active gate, buried or backside power rails to cut track count, gate-cut placement, and FinFlex/NanoFlex mixed rows. **System-technology co-optimization (STCO)** extends this to the package: SRAM, I/O, and logic on separate chiplets on the nodes that suit each. A modern PDK exposes 4–6 threshold-voltage flavors per device type (ultra-low to ultra-high V_T, spanning ~ 250–300 mV), realized by the WFM/dipole options of Section 3.3; synthesis swaps cells between flavors to meet timing on critical paths while holding leakage elsewhere, and a high-performance design ends up ~ 10–20% low-V_T cells.

### 8.4 Device metrology: seeing what you built

None of these dimensions can be measured optically. In-line, **CD-SEM** gives gate/fin widths and line-edge roughness to ~ 0.5 nm, and **OCD scatterometry** (Module 13) gives fin height, STI recess, and sheet-stack profiles as model-fitted averages. The definitive tool is the **TEM/STEM cross section**: a ~ 50–100 nm lamella is cut from a specific transistor with a **focused ion beam** (Ga or Xe plasma), lifted out, thinned, and imaged at 200–300 kV at atomic resolution. This is how you see the 0.6 nm interfacial layer, count HfO₂ monolayers, check that the inner-spacer cavities filled, or find 1 nm of thinning on one side of a sheet; **EDS/EELS** maps add the Ge, Hf, Ti, Al, and La distributions, which is how a teardown house reads a competitor's WFM stack. A leading-edge fab runs thousands of TEM samples per week on Thermo Fisher/Hitachi FIB-TEM lines, and the 1–2 day turnaround of a "TEM answer" gates the yield-learning cycle. Scribe-line electrical structures (ring oscillators, V_T/I_off/DIBL/SS arrays, Kelvin contact resistance, SRAM macros) supply the numbers that ultimately define the node.

## Key Numbers

| Quantity | Value |
|---|---|
| Subthreshold swing limit at 300 K | 59.6 mV/dec (theory); 65–75 mV/dec in production |
| Required I_on/I_off for logic | ~ 10⁵–10⁶ |
| I_off per 65 mV of V_T reduction | ×10 |
| Minimum gate length rule | L_g ≥ 5–6 × scale length λ |
| Physical gate length, 5/3/2 nm class | ~ 16–18 nm / ~ 15–16 nm / ~ 12–14 nm |
| Gate EOT / physical HfO₂ | ~ 0.9–1.0 nm EOT; ~ 1.5–2 nm HfO₂ over ~ 0.6 nm SiO₂ IL |
| End of Dennard scaling | ~ 2004–2005 (V_DD stuck near 1 V) |
| Intel 45 nm HKMG | 2007; > 10× lower gate leakage |
| Intel 22 nm fin | 8 nm wide × 34 nm tall, 60 nm pitch (2011) |
| 5 nm class fin | ~ 6–7 nm wide × ~ 50 nm tall, 26–28 nm pitch |
| CPP: N16 → N7 → N5 → N3E → N2 | 90 → 57 → 51 → 48 → ~ 45 nm |
| Min metal pitch: N16 → N7 → N5 → N3E | 64 → 40 → 30 → 23 nm |
| HD cell height, N7 / N5 / N3E / Intel 18A | 240 / 180 / ~ 150–170 / ~ 160 nm |
| Density, N7 / N5 / N3E / N2 (HD, MTr/mm²) | ~ 91 / ~ 138–171 / ~ 200–215 / ~ 230–250 |
| Density gain per node, then vs now | 2× (N16→N10→N7) vs 1.15× (N3E→N2) |
| Nanosheet geometry | 3 sheets (Intel has shown 4), 5–7 nm thick, 15–50 nm wide, ~ 10–13 nm spacing |
| Superlattice | 3–4 × [SiGe 25–35% Ge, 8–12 nm / Si 5–7 nm] |
| Inner spacer lateral recess | ~ 5–8 nm, selectivity SiGe:Si > 50:1; release > 100:1 |
| SiGe:B S/D | 50–65% Ge, B ~ 1 × 10²¹ cm⁻³; Si:P at P ~ 2–3 × 10²¹ |
| Contact resistivity | ~ 1 × 10⁻⁹ Ω·cm² (Ti silicide) |
| PowerVia (Intel, Blue Sky Creek) | 30% lower platform voltage droop, ~ 6% frequency, > 90% cell utilization |
| TSMC A16 SPR vs N2P | 8–10% speed or 15–20% power, 7–10% density |
| HD SRAM bit cell | N5 0.021 → N3B 0.0199 → N3E 0.021 → N2 ~ 0.0175 µm²; Intel 18A 0.021 µm² |
| H100 effective density | 80 B tr / 814 mm² ≈ 98 MTr/mm² (~ 70% of N5-class peak) |
| N2 wafer price (reported) | ~ $30,000 vs ~ $20,000 for N3 |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| TSMC | Taiwan | N2 nanosheet in HVM (Q4 2025), A16 with Super Power Rail (H2 2026); ~ 90% of leading-edge foundry output | Leader |
| Intel Foundry | USA | 18A RibbonFET + PowerVia (Panther Lake, 2025); first BSPDN in HVM; 14A with High-NA EUV next | #2 in technology, small external foundry share |
| Samsung Foundry | South Korea | First GAA in production (3GAE, June 2022); SF3/SF2; backside power on SF2Z (~ 2027) | #2 by foundry revenue, trailing on yield |
| imec | Belgium | Pre-competitive R&D consortium: nanosheet, forksheet, CFET, BSPDN roadmaps used by the whole industry | Leader (research) |
| IBM Research | USA | Nanosheet pioneer (Albany, 2017 5 nm demo), VTFET; partners Samsung and Rapidus | Niche (research/IP) |
| Rapidus | Japan | 2 nm nanosheet foundry start-up with IBM technology, pilot line 2025, HVM target 2027 | Entrant |
| SMIC | China | DUV-only FinFET at ~ N7/N5-class density (N+2/N+3) under export controls | Niche (constrained) |
| Applied Materials | USA | Epi (Centura for Si/SiGe superlattice and S/D), PVD/ALD metals for gate stack, selective removal, CMP (Reflexion) | Leader in epi, PVD, CMP |
| Lam Research | USA | Conductor and dielectric etch (fin, gate, S/D recess, channel release), ALD spacers/inner spacers, W/Mo fill (Altus) | Leader in etch |
| Tokyo Electron (TEL) | Japan | Etch, ALD/CVD, tracks, wet clean, selective SiGe etch (Certas gas-phase) | #2–3 in etch/dep |
| ASM International | Netherlands | ALD leader (high-k HfO₂, WFM, spacers); epi (Intrepid) for superlattice | Leader in ALD |
| Hitachi High-Tech / Thermo Fisher | Japan / USA | CD-SEM (Hitachi), FIB-TEM (Thermo Fisher Helios/Spectra) for device metrology | Leaders |
| TechInsights | Canada | Teardown and reverse engineering; source of most public pitch/density measurements | Niche (analysis) |
| Synopsys / Cadence | USA | EDA and DTCO tooling (TCAD Sentaurus, standard-cell libraries, PDK enablement) | Duopoly |

## Common Misconceptions

- **"A 3 nm chip has 3 nm transistors."** → Nothing on an N3 die is 3 nm. Gate length ~ 16 nm, fin width ~ 6 nm, metal pitch 23 nm. Node names are a marketing cadence; CPP, MP, and MTr/mm² are the real metrics.
- **"FinFETs and nanosheets are faster because they are smaller."** → They are better because the gate controls the channel from more sides (smaller scale length λ), which reduces leakage and allows shorter gates at the same I_off. At iso-gate-length a planar device may even have higher drive per fin footprint; the win is electrostatic.
- **"The gate is deposited when the transistor is built."** → In every leading-edge process since 2007 the gate you see in the final chip is the second gate; the first (polysilicon) is a sacrificial placeholder removed after the source/drain anneal (replacement metal gate).
- **"Transistor density doubles every node, so a new GPU has twice the transistors."** → N3E → N2 is ~ 1.15× for logic and ~ 1.2× for SRAM at best; real dies achieve 50–70% of library peak; and SRAM stalled at ~ 0.021 µm² from N5 through N3E.
- **"Backside power is just moving wires to the back."** → It requires wafer-to-wafer bonding, thinning the device wafer to a few hundred nanometers, nano-TSVs or backside contacts landed with ~ 10 nm overlay to features on the other side, and a whole new backside litho/metal module; and it makes heat removal harder.
- **"GAA is a small tweak to FinFET."** → It adds a Si/SiGe superlattice starting material, inner spacers, and a channel-release etch, three of the hardest steps in the flow, and forces V_T tuning to switch from metal thickness to dipoles because the ~ 10 nm inter-sheet gap cannot hold the old stack.

## Where This Fits in the Supply Chain

This module consumes everything Part II has built so far: the epitaxial 300 mm wafers of Module 03 (now with a Si/SiGe superlattice grown on top), the ALD/CVD/epi films of Module 06, the SAQP and EUV patterning of Modules 07–08, the fin/gate/recess/release etches of Module 09, and the well, PTS, and S/D activation steps of Module 10. Its output is a wafer with ~ 100–250 million finished transistors per square millimeter and their first local interconnect (MOL), delivered to the copper/low-k BEOL of Module 12 which will add 15–18 metal layers, and, on 18A and A16 class wafers, a bonded and thinned backside power network that Module 12 and the packaging modules (16–17) will have to contact from below. The economics flow the other way: the foundry (TSMC, Intel, Samsung) owns the transistor recipe, buys the epi, ALD, etch, and CMP tools from Applied, Lam, TEL, and ASM, licenses the standard-cell libraries and PDK to fabless customers via Synopsys/Cadence flows (Module 19), and the transistor density and drive current defined here set the die size, yield (Module 13), and cost per function for every chip that follows.

## Further Reading

- Y. Taur and T. H. Ning, *Fundamentals of Modern VLSI Devices*, 3rd ed., Cambridge University Press, 2022 (scale length, SCE, HKMG physics).
- D. J. Frank, Y. Taur, and H.-S. P. Wong, "Generalized scale length for two-dimensional effects in MOSFETs," *IEEE Electron Device Letters* 19(10), 1998.
- R. H. Dennard et al., "Design of ion-implanted MOSFETs with very small physical dimensions," *IEEE Journal of Solid-State Circuits* SC-9(5), 1974.
- K. Mistry et al. (Intel), "A 45nm logic technology with high-k+metal gate transistors, strained silicon, 9 Cu interconnect layers, 193nm dry patterning, and 100% Pb-free packaging," *IEDM* 2007.
- C. Auth et al. (Intel), "A 22nm high performance and low-power CMOS technology featuring fully-depleted tri-gate transistors, self-aligned contacts and high density MIM capacitors," *VLSI Symposium* 2012.
- N. Loubet et al. (IBM/Samsung/GlobalFoundries), "Stacked nanosheet gate-all-around transistor to enable scaling beyond FinFET," *VLSI Symposium* 2017.
- TSMC, "N2 Nanosheet" technology page and G. Yeap et al., IEDM 2024 N2 paper; TSMC A16 disclosure, North America Technology Symposium 2024.
- Intel, "PowerVia" VLSI 2023 papers (W. Hafez et al.; M. Lin et al.) and the Intel 18A/RibbonFET IEDM 2024 papers.
- TechInsights blog, "TSMC Reveals 3nm Process Details" (2023), and WikiChip Fuse node analyses (TSMC N7/N5/N3, Intel 10/7/4).
- SemiAnalysis, "Clash of the Foundries: Gate All Around + Backside Power at 2nm" (October 2024), and imec's annual logic technology roadmap presentations (ITF World).
- Asianometry (YouTube), "The Gate-All-Around Transistor" and "Backside Power Delivery" episodes, for visual walk-throughs of the flows.
