# Module 16: Packaging Fundamentals: From Wafer to Chip

A finished 300 mm wafer leaving the fab is useless to anyone. The transistors on it switch in picoseconds, but their terminals are aluminum or copper pads roughly 50 µm across, spaced 100–150 µm apart, on a slab of silicon 775 µm thick that will shatter if you drop it, corrode if you breathe on it, and cook itself if you run it without a heat path. A printed circuit board (PCB), by contrast, can reliably solder to features no finer than ~0.4–1.0 mm and can only pull heat away through a few square centimeters of copper and a heatsink. **Packaging** is the discipline that bridges that gap: it takes a bare die with thousands of micrometer-scale terminals and turns it into a component with millimeter-scale terminals that survives 20 years in a car engine bay or 5 years at 700 W in a data center.

The problem is hard for one fundamental reason that will recur throughout this module: silicon expands with temperature at about **2.6 ppm/K**, while the organic laminate substrates and PCBs it must be joined to expand at **~15–17 ppm/K**. Every heat-up and cool-down shears the joints between them. Nearly every process, material, and design choice in a package is, at bottom, a strategy for managing that mismatch while still getting signals, power, and heat in and out.

## What a Package Must Do

A package has five jobs, and they pull against one another.

**1. Electrical fan-out.** The die's bond pads or bumps sit at ~40–150 µm pitch. The board wants 0.4–1.0 mm pitch solder balls or leads. The package must redistribute several thousand connections across this ~10× change in scale without adding more resistance, inductance, or crosstalk than the signal budget allows. A modern data-center GPU package routes on the order of 5,000–10,000 signal and power connections; an 8-pin power-management IC routes eight.

**2. Power delivery.** A 700–1,000 W GPU at ~0.8 V draws roughly 1,000 A. The package must carry that current through its bumps, planes, and balls with a total resistance of well under a milliohm, and must supply it with low enough inductance that di/dt transients of hundreds of amps per nanosecond do not collapse the core voltage. This is why a large fraction (often more than half) of all bumps on a high-performance die are power and ground rather than signal, and why substrates have dedicated copper planes and embedded decoupling capacitors.

**3. Heat removal.** Nearly all electrical power becomes heat in the transistor layer, within ~10 µm of the die's front surface. In a flip-chip package the heat conducts through the ~300–775 µm of silicon backside (thermal conductivity ~150 W/m·K), then through a **thermal interface material (TIM)** into a lid or cold plate. Every interface adds thermal resistance; the TIM layer, only 50–200 µm thick, is frequently the single largest resistance in the stack.

**4. Mechanical and environmental protection.** Silicon and its dielectrics are brittle; the low-k interlayer dielectrics in the back-end-of-line (BEOL) are especially weak (fracture toughness well under 1 MPa·m^0.5). The package must isolate the die from board flexure, handling, and vibration, and must seal it against moisture and ionic contaminants (chloride, sodium) that cause corrosion and electrochemical migration.

**5. Coefficient of thermal expansion (CTE) mismatch management.** **CTE** is the fractional change in length per kelvin. Silicon: ~2.6 ppm/K. Copper: ~17 ppm/K. Solder (SAC305): ~22 ppm/K. Organic build-up substrate (in-plane): ~12–17 ppm/K. Epoxy mold compound: ~7–12 ppm/K below its glass transition temperature. A package is a laminate of all of these, assembled at 150–260 °C and used at −40 to +125 °C. Managing the resulting strain, warpage, and fatigue is the central engineering problem of packaging, and it is why the first worked example below is a strain calculation.

> **Worked example: CTE shear strain at a corner bump.**
> Consider a 30 mm × 30 mm flip-chip die (about the size of a large GPU compute die) on an organic build-up substrate, joined by solder bumps with a stand-off height of ~70 µm. The bumps that suffer most are at the corners, farthest from the die center, which is the **neutral point** where die and substrate expand together. The **distance to neutral point (DNP)** of a corner bump is half the diagonal: 30 mm × √2 / 2 ≈ **21.2 mm**.
> The CTE difference is Δα = 15 − 2.6 ≈ **12.4 ppm/K**. The solder solidifies at ~217 °C (the SAC305 melting point) and the assembly then cools to 25 °C, so ΔT ≈ 192 K for the initial cool-down.
> Relative displacement between the die corner and the substrate directly beneath it, if nothing constrained them, would be:
> δ = DNP × Δα × ΔT = 21.2 mm × 12.4 × 10⁻⁶ /K × 192 K ≈ **50 µm**.
> Spread across a 70 µm tall solder joint, that is an engineering shear strain γ = δ/h ≈ 50/70 ≈ **0.7, or 70%**. Solder yields at strains of a fraction of a percent. Even for a milder operating cycle (−40 to +125 °C, ΔT = 165 K), δ ≈ 43 µm and γ ≈ 60%. The Coffin-Manson relation for solder fatigue, N_f ∝ (Δγ)^(−n) with n ≈ 1.5–2, says a joint seeing this strain would fail in a handful of cycles.
> This is why bare flip-chip on organic substrates is impossible without **underfill**: an epoxy that fills the gap between die and substrate mechanically couples the two so that the assembly bends together (warps) rather than shearing the joints. With underfill, the bump strain drops by more than an order of magnitude and the joint survives 1,000+ thermal cycles. It is also why very large dies were historically mounted on ceramic substrates (CTE ~7 ppm/K) or, today, on silicon interposers (CTE 2.6, perfectly matched) as in CoWoS, covered in Module 17.

## The Back-End Flow in Order

The sequence below is for a flip-chip ball grid array (FCBGA), the package used for essentially every CPU, GPU, and high-end SoC. Wire-bond and leadframe variants branch off at the marked points. The industry calls the whole thing **assembly and test (A&T)** or simply **the back end**.

Wafer in → (1) wafer-level bumping → (2) backgrinding → (3) dicing → (4) die attach or flip-chip bonding → (5) underfill → (6) wire bonding (if applicable) → (7) molding or lid attach → (8) marking → (9) ball attach → (10) singulation → (11) package test.

### Step 1: Wafer-Level Bumping

**Bumping** deposits the solder or copper terminals on every pad of every die while the wafer is still whole. It is performed in a fab-like cleanroom using lithography and plating tools, and it is the one back-end step that TSMC has always kept largely in-house (at its AP2 facility in Tainan, among others) because it directly interfaces with the BEOL; outsourced assembly and test vendors (OSATs) such as ASE, Amkor, and PTI also run large bumping lines.

The starting point is the wafer's final passivation (silicon nitride or polyimide) with openings over the top-metal aluminum or copper pads. The steps:

1. **Under-bump metallurgy (UBM) sputtering.** The wafer is sputter-cleaned (Ar plasma removes native Al₂O₃) and a stack of ~0.1–0.2 µm **titanium** (or TiW) followed by ~0.2–0.5 µm **copper** is sputtered over the entire wafer. Ti adheres to the passivation and pad and acts as a diffusion barrier; Cu is the electroplating seed. The UBM has three jobs: adhere to the pad, provide a wettable, solderable surface, and act as a barrier so the solder does not consume the pad metal.
2. **Photoresist patterning.** A thick photoresist (liquid or dry-film, 50–120 µm thick) is coated and exposed with a stepper or laser direct imager to open a well over each pad. The well diameter sets the bump diameter.
3. **Electroplating.** For a **copper pillar** bump, Cu is electroplated up the well to ~30–50 µm tall, followed by an optional ~2–3 µm nickel barrier and a ~15–25 µm cap of **SnAg** solder (typically Sn–1.8 to 2.5 wt% Ag, melting ~221–226 °C). Plating baths are acidic copper sulfate with organic additives; current density ~1–5 A/dm²; a 40 µm pillar takes tens of minutes. For classic **C4 bumps** ("Controlled Collapse Chip Connection", IBM's 1960s invention), the entire bump is solder, plated as a mushroom over a small UBM.
4. **Resist strip and seed etch.** The resist is stripped and the exposed Ti/Cu seed between bumps is wet-etched, electrically isolating each bump.
5. **Reflow.** The wafer passes through a nitrogen convection furnace above the solder melting point; the plated solder melts and surface tension pulls it into a smooth spherical cap. Flux or formic acid vapor removes tin oxide.
6. **Inspection.** Automated optical inspection (Camtek, Onto, KLA) checks bump height (target ±3–5 µm coplanarity across a die), missing bumps, and bridging.

Why copper pillars replaced solder-only C4: a solder ball's height scales with its diameter, so at fine pitch the bumps get short and the gap for underfill closes. A tall, narrow Cu pillar keeps a ~50–70 µm stand-off at 40–100 µm pitch, carries 5–10× more current density before **electromigration** (Cu's atomic mobility under current is far lower than Sn's), and conducts heat better. Today, C4-style solder bumps at ~130–150 µm pitch survive on cost-sensitive or coarse-pitch parts; Cu pillar at 100–130 µm pitch is standard for high-performance FCBGA; Cu-pillar **microbumps** at 36–55 µm pitch connect dies to interposers (Module 17); and HBM stacks use ~25–55 µm pitch microbumps, with hybrid bonding (no solder at all) expected from the HBM4E/HBM5 generation (Module 15).

Historically, C4 used high-lead solder (Pb–5Sn, melting ~310 °C), which stays solid through a later ball-attach reflow; the EU's RoHS directive (2006) pushed the industry to lead-free SnAg and SAC alloys.

### Step 2: Backgrinding

A 300 mm wafer is 775 µm thick because the front-end needs that stiffness to survive ~1,000 process steps and hundreds of thermal cycles without warping or breaking. The package does not want it: thinner dies conduct heat with less resistance, fit in thinner phones, and stack more layers per millimeter. **Backgrinding** (also "thinning") removes most of the wafer's thickness from the back.

The sequence, dominated worldwide by **Disco Corporation** of Japan (~70–80% share in grinders and dicing saws, with Tokyo Seimitsu/Accretech a distant second):

1. **Backgrinding tape lamination.** A UV-release adhesive tape (Nitto Denko, Lintec, Furukawa Electric) is laminated over the bumped front side to protect the bumps and pads from grinding slurry. For bumped wafers, the tape's adhesive layer is 100–200 µm thick so that it conforms around 50–70 µm bumps without leaving voids.
2. **Coarse grinding (Z1).** The wafer is vacuum-chucked face-down on a rotating porous ceramic chuck. A cup-shaped diamond wheel with coarse grit (#320–#600, roughly 20–40 µm diamonds in a vitrified or resin bond) spins at ~2,000–4,000 rpm and is fed into the back at ~3–5 µm/s, removing ~500+ µm in a couple of minutes. Deionized water floods the interface to carry away silicon swarf and heat. The wheel and chuck axes are deliberately offset by a tiny angle so the wheel cuts only across the wafer's center line, producing the characteristic radial grind marks.
3. **Fine grinding (Z2).** A fine wheel (#2000–#8000 grit, ~2–5 µm diamonds) at feed ~0.3–1 µm/s removes the last 20–40 µm. Coarse grinding leaves a **subsurface damage layer** of microcracks and dislocations ~10–20 µm deep; fine grinding shrinks it to ~1–3 µm.
4. **Stress relief.** Even the fine-grind damage layer halves the die's fracture strength and is a crack-initiation site. It is removed by one of: **dry polishing** (Disco's proprietary abrasive-free polishing pad), chemical mechanical polishing (CMP), wet spin etching (HF/HNO₃ mixtures removing ~5–10 µm), or a downstream plasma etch (SF₆). A properly stress-relieved die has a three-point-bend strength of ~1–2 GPa versus ~400–800 MPa for a ground-only die, and a mirror backside that also happens to be ideal for laser marking or for a backside metallization if the die will be soldered.
5. **Tape removal, and transfer to dicing tape.** The wafer, now floppy, is mounted back-side down onto dicing tape on a metal frame (a "film frame"), the backgrinding tape is UV-exposed to kill its adhesion and peeled, and the wafer goes to dicing.

Target thicknesses: ~300–700 µm for large FCBGA dies (a thick die helps warpage control and thermal spreading), ~100–200 µm for wire-bond and WLCSP parts, 50–100 µm for smartphone memory and power MOSFETs, and ~30–50 µm for the DRAM dies in an HBM stack (Module 15). The physical limit is not grinding but handling: below ~100 µm a 300 mm wafer sags like paper and cannot be picked up by conventional robots.

Disco's answer is the **TAIKO** process: the grinding wheel thins only the interior of the wafer, leaving an unground ~2–3 mm ring at the edge at the full 775 µm. The ring acts as a stiffening frame; the wafer can be transported, etched, and even implanted (this is standard for IGBT and power-MOSFET wafers, which need ~50–100 µm silicon for low on-resistance) with far less warpage and breakage. The ring is cut off at dicing.

For very thin wafers (HBM, 3D stacks), the industry instead **temporarily bonds** the wafer face-down to a glass or silicon carrier with a thermoplastic or UV-release adhesive before grinding, and de-bonds it after all backside processing; the tools come from EV Group, SUSS MicroTec, and TEL.

### Step 3: Dicing

**Dicing** (singulation of the wafer) cuts along the **scribe streets** (also "scribe lanes" or "kerf"), the ~50–100 µm wide lanes between dies that the fab reserved for test structures and alignment marks. Three technologies compete.

**Blade dicing** is the incumbent. A hub-mounted blade, a ~20–50 µm thick ring of nickel electroformed with embedded diamond grit (~2–6 µm grains) for silicon, or a thicker resin-bond blade for harder materials, spins at 30,000–60,000 rpm on an air-bearing spindle and is fed through the wafer at 50–150 mm/s while DI water (with CO₂ bubbled in to control resistivity and suppress static) cools and flushes. The blade cuts either fully through into the dicing tape or leaves a few micrometers that the tape expansion breaks. The kerf, the material lost to the cut, is 20–50 µm, so streets can be as narrow as ~60 µm. Typical throughput is a 300 mm wafer in 5–15 minutes, depending on die count. The defects are **chipping**: front-side chipping, where the blade's exit tears out fragments of the passivation and top metal (specification typically < 10–25 µm, and it must never reach the die's crack-stop **seal ring**), and backside chipping, where the exit face flakes. Chipping worsens with thinner wafers and with blade wear, so blades are dressed on a sacrificial board and replaced after some thousands of meters of cut.

The BEOL made blade dicing harder. Low-k dielectrics (Module 12) are porous, weak, and poorly adhered; a blade rips through them and starts delaminations that propagate under the seal ring in later thermal cycling. The industry's fix is **laser grooving**: a UV (355 nm) nanosecond or picosecond laser ablates a ~10–20 µm deep groove through the metal and dielectric stack in the street before the blade cuts only through the bare silicon. Disco and others sell dual-station tools that groove and cut in one pass. A related technique is **step cutting** with two spindles: a wider blade removes the top layers and a thinner blade finishes the cut.

**Stealth dicing** was invented by Hamamatsu Photonics (developed ~2002–2005, patented and licensed to alliance partners, chiefly Disco). A pulsed near-infrared laser (typically 1,064 nm, at which silicon is transparent) is focused by a high-numerical-aperture objective to a spot *inside* the wafer, tens of micrometers below the surface. At the focus, the intensity is high enough for nonlinear (multi-photon) absorption; the silicon there is locally melted, recrystallized, and cracked into a ~10–20 µm tall "SD layer" of modified material, while the surface above and below stays untouched. The laser scans the street at hundreds of mm/s, writing a plane of these defects; for thick wafers, several passes at different depths are stacked. Then the dicing tape is stretched radially on an **expander** by ~10–20%, and the wafer cleaves cleanly along the defect planes. There is no kerf, no water, no debris, no chipping, and no blade wear; the die edges are near-atomically clean. Stealth dicing dominates for thin wafers (memory, image sensors, whose front-side micro-lenses cannot tolerate water) and dies with narrow streets (~15–30 µm). Its limitation is that anything opaque in the street (metal test pads) blocks the beam, so fabs must keep streets clear or groove them first.

**Plasma dicing** treats the streets as an etch pattern. A photoresist or water-soluble mask is applied and opened over the streets (or, on some flows, the passivation itself is used as the mask), and a **Bosch process** deep reactive ion etch (alternating SF₆ etch and C₄F₈ passivation cycles, exactly as in Module 9) etches all streets on the wafer simultaneously, clear through 50–100 µm of silicon in tens of minutes. Since every street etches at once, throughput is independent of die count, which makes plasma dicing compelling for wafers with tens of thousands of tiny dies (RFID, LEDs, MEMS, small power devices). Streets can be ~10 µm wide, die edges are smooth and rounded (die strength nearly doubles compared to blade dicing), and shapes need not be rectangular. Tools come from Panasonic Connect (the APX300 series), SPTS (KLA), and Plasma-Therm. Adoption has been slow because the mask step adds cost and any metal in the streets stops the etch.

After dicing, the film frame goes to a die bonder or flip-chip bonder, which picks dies from the tape one by one; a needle-less **ejector** pushes each die up from below the tape while a vacuum collet lifts it from above.

### Step 4: Die Attach and Pick-and-Place

For a wire-bonded or leadframe package, **die attach** glues the die's backside to the substrate or leadframe paddle. The options:

- **Epoxy paste.** A silver-flake-filled (conductive, 2–10 W/m·K) or silica-filled (insulating) epoxy dispensed in a pattern on the paddle; the die is pressed in and the epoxy cured at 150–175 °C for ~1 h. Cheap and universal.
- **Die attach film (DAF).** A ~10–25 µm thermosetting film (Resonac, formerly Hitachi Chemical; Nitto Denko; Lintec; Furukawa) laminated onto the wafer backside *before* dicing, as a combined dicing-tape/DAF stack. Each die comes off the tape with its own perfectly uniform adhesive layer, with no fillet or bleed, essential for stacked memory (up to 16 dies at 20–30 µm each in a microSD card or eMMC).
- **Eutectic AuSi.** A gold preform or Au-plated backside heated above 363 °C forms a Au–Si eutectic; hermetic and highly conductive but expensive; now mostly for RF and hermetic military parts.
- **Soft solder.** Pb-based or Pb-free (SnSb, SnAgCu) solder for power devices needing a low-resistance electrical and thermal path from the backside drain or collector.
- **Sintered silver.** A paste of micro- or nano-silver particles is pressed (10–30 MPa) at 200–250 °C; the particles sinter into a porous silver layer (~200 W/m·K, melting point 961 °C) without ever melting. Used for SiC and GaN power modules in electric vehicles because it survives the 175–200 °C junction temperatures that would age solder to death.

The bonder (Besi, ASMPT, K&S, Palomar for high-accuracy) picks the die, images it and the target with cameras, and places it. For standard die attach, accuracy of **±10–25 µm at 3σ** is sufficient and machines run 10,000–20,000 units per hour. For flip-chip mass reflow, ±5–10 µm suffices because solder self-alignment corrects the rest. For **thermocompression bonding (TCB)** of microbumps at 36–40 µm pitch, the bonder must hit **±1–2 µm** with the die held at temperature, and throughput drops to ~1,000–2,000 units per hour. For hybrid bonding (Module 17), it is ±100–200 nm.

### Step 5: Wire Bonding

**Wire bonding** draws a thin metal wire from a die pad to a substrate or leadframe finger, one loop at a time. It was the first interconnect technology (1950s), and it is still, by unit count, the majority: as of ~2025 an estimated ~70–80% of all packaged semiconductor devices (roughly a trillion units a year including discretes, LEDs, and sensors) are wire-bonded. The tools come overwhelmingly from **Kulicke & Soffa (K&S)** and **ASMPT**, with Shinkawa (Yamaha Robotics) third.

The dominant process is **thermosonic ball-and-stitch bonding**:

1. The wire, 15–25 µm in diameter (0.6–1.0 mil), runs through a ceramic **capillary** with a chamfered tip.
2. An **electronic flame-off (EFO)** spark melts the wire tip into a **free air ball (FAB)** about twice the wire diameter.
3. The capillary descends onto the die pad, which is heated to ~150–250 °C. It presses the ball with ~20–100 gf of force while a piezoelectric transducer vibrates it at 60–140 kHz for a few milliseconds. The ultrasonic scrubbing breaks up oxides and the combined heat, pressure, and vibration form a metallurgical weld (for Au on Al, a thin Au–Al intermetallic). This is the **ball bond**.
4. The capillary rises and traces a programmed loop shape, then descends on the substrate finger and presses the wire sideways under the capillary face, crushing and welding it into a **stitch bond** (or wedge), then tears the wire, leaving a tail for the next ball.
5. Repeat at ~15–25 wires per second.

Loops are 80–150 µm tall and up to ~5 mm long; a 1,000-pin wire-bond BGA is feasible but ungainly, which is why high pin counts moved to flip chip.

The **gold-to-copper transition** is the biggest change in wire bonding's history. Au wire (99.99%) was the standard for 50 years because it does not oxidize and bonds easily. When gold crossed ~$1,000/oz around 2008–2010, the industry moved to **copper wire**: ~5× cheaper, ~25% lower resistivity, and a slower-growing intermetallic with aluminum. But Cu oxidizes, so the FAB must be formed under forming gas (95% N₂ / 5% H₂), and Cu is harder than Au, so bonding needs more force and risks **cratering** (fracturing the pad and the dielectric beneath it). Fabs responded with thicker Al pads and stiffer under-pad structures; wire makers with **palladium-coated copper (PCC)** wire. Today most wire bonds are Cu or PCC; Au survives for RF, high-reliability, and very fine-pitch (< 40 µm) work; silver alloy wire has a niche in LEDs and memory.

For power devices, **wedge bonding** with thick aluminum wire (100–500 µm) or aluminum/copper ribbon carries tens of amps; it is ultrasonic only (no heat, no ball) and forms both bonds as wedges.

### Step 6: Flip Chip: Mass Reflow and Thermocompression

In **flip chip** the bumped die is turned face-down and its bumps are joined directly to pads on the substrate. There is no wire, so the interconnect is shorter (~70 µm vs. millimeters), lower in inductance (~0.05 nH vs. ~1–2 nH per wire), and, critically, the entire die area is available for connections, not just the perimeter: **area-array** I/O. Flip chip is the only way to get 5,000+ connections off a die.

**Mass reflow (MR)** is the high-volume process:

1. The die is dipped into a thin film of tacky **flux** (an organic acid such as adipic acid in a solvent carrier) so that each bump tip carries flux.
2. A pick-and-place head sets the die on the substrate, bumps against pads (substrate pads are typically Cu with a solder-on-pad (SOP) pre-coat or an organic solderability preservative (OSP) finish). The flux's tackiness holds it.
3. Substrates travel through a convection reflow oven, typically 7–10 zones in N₂ (< 1,000 ppm O₂), with a profile that soaks at 150–190 °C to activate the flux, peaks at 240–250 °C for SAC/SnAg, and stays above 217 °C for 40–90 s.
4. As the solder melts, **self-alignment** occurs: the molten solder minimizes its surface energy by wetting the full pad on both sides, and the surface tension (~0.5 N/m for Sn) pulls a misplaced die back into alignment by up to roughly half a pad width. This is why mass reflow tolerates ±10 µm placement.
5. Flux residues are cleaned with DI water or saponifier, since residual acid under the die would cause corrosion and would stop underfill from adhering.

**Thermocompression bonding (TCB)** replaces the oven. A heated bond head picks the die, aligns it to ±1–2 µm, presses it onto the substrate (already at 100–150 °C) with a controlled force of a few to a few tens of newtons, and pulses the head to 250–300 °C for 1–3 seconds so the solder melts under pressure and then cools while still clamped. The advantages: the head holds a thin, warped die flat during joining; the bump gap is set by the tool rather than by solder collapse, so fine-pitch bumps (< 50 µm) do not bridge; and it can bond dies that are too large or too thin for mass reflow. The disadvantages are cycle time (~10–30 s per die versus a continuous oven) and tool cost (~$1–3 million per Besi or ASMPT TCB bonder; Hanmi Semiconductor and Hanwha Semitech build the TC bonders that stack HBM at SK hynix, while Semes serves Samsung).

**Underfill.** After joining, the die stands 50–70 µm above the substrate on an array of bumps, with the CTE problem from the worked example waiting to happen. **Capillary underfill (CUF)** is a low-viscosity epoxy filled with ~50–70 wt% spherical silica (particles < 1–5 µm, well under the gap) to bring its CTE from ~60 down to ~25–35 ppm/K, close to solder's. It is dispensed with a needle along one or two edges of the die while the assembly sits at 70–110 °C to lower viscosity; capillary action pulls it under the die in 10–60 s. It is then cured at 150–165 °C for ~1–2 h. A good underfill has no voids (voids concentrate stress and trap moisture, and become steam bombs at reflow), a uniform fillet at the die edges, and a glass transition temperature above the maximum operating temperature. The fill time scales with die size squared, so for 30+ mm dies the dispensing pattern and material are tuned carefully, and mold-underfill (MUF) or **non-conductive paste (NCP)** and **non-conductive film (NCF)**, applied *before* bonding and cured in the TCB head, are used instead. Samsung's and Micron's HBM stacks use TC-NCF, while SK hynix uses MR-MUF, mass reflow with molded underfill (see Module 15).

## The Substrate in Depth

Underneath every FCBGA is a **build-up laminate substrate**, a miniature multilayer PCB manufactured to tolerances a PCB shop could not hit. For a large GPU it costs on the order of $100–300 apiece and is often the most expensive single component in the package after the silicon itself.

### Anatomy

Reading from the center outward:

**Core.** A rigid sheet of glass-fiber cloth impregnated with epoxy resin, typically **BT (bismaleimide triazine)** resin from Mitsubishi Gas Chemical or a high-Tg epoxy, 0.4–1.2 mm thick for large packages (thinner, ~0.1–0.2 mm, for mobile). The glass cloth pins the in-plane CTE to ~10–15 ppm/K and gives stiffness. Copper foil is laminated on both faces. **Plated through-holes (PTHs)** are mechanically drilled (carbide bits, ~100–250 µm diameter, thousands of holes per minute on multi-spindle machines) or laser-drilled for finer sizes, the hole walls are made conductive by electroless copper, then electroplated, then the holes are plugged with resin and capped with copper so that build-up vias can be stacked over them.

**Build-up layers.** On each side of the core, N layers of dielectric and copper are added one at a time; an "8-2-8" substrate has 8 build-up layers on top, a 2-layer core, and 8 below, 18 metal layers in all. Each build-up cycle:

1. **Laminate ABF.** **Ajinomoto Build-up Film (ABF)** is a ~25–40 µm thick, uncured sheet of epoxy resin loaded with ~60–75 wt% sub-micron spherical silica filler, supplied on a PET carrier. It is vacuum-laminated at ~100–120 °C so it flows into the copper pattern below without voids, then thermally cured at ~170–190 °C.
2. **Laser-drill microvias.** A CO₂ laser (Via Mechanics, Mitsubishi Electric) or UV laser drills blind vias ~50–70 µm in diameter (down to ~30 µm with UV) through the ABF to the copper pad below, at rates of thousands of holes per second.
3. **Desmear and roughen.** Permanganate (KMnO₄) etches the laser residue from the via bottom and dissolves the resin skin of the ABF surface, leaving the silica filler particles protruding as a micro-rough texture. This roughness is what makes electroless copper adhere; it is the reason ABF is filled the way it is.
4. **Electroless copper seed** (~0.5–1 µm) over the entire surface, catalyzed by a palladium activator.
5. **Semi-additive process (SAP) patterning.** A dry-film photoresist (~15–25 µm) is laminated and exposed with **laser direct imaging (LDI)** (Orbotech/KLA, SCREEN, Via Mechanics), which writes the pattern directly from CAD and can compensate for the panel's shrinkage, essential because a panel of substrates moves by tens of micrometers between layers. The resist is developed, opening the traces and vias.
6. **Pattern electroplating.** Copper is electroplated ~10–15 µm thick only where the resist is open, filling the microvias and forming the traces.
7. **Strip and flash etch.** The resist is stripped and the thin seed between traces is quickly etched away, leaving isolated conductors. Because the seed is thin, the etch undercut is small, which is why SAP achieves far finer lines than the subtractive etching used on ordinary PCBs.

Repeat N times. The result is copper lines and spaces (**L/S**) of ~8–10 µm / 8–10 µm in high-volume ABF substrates as of ~2025, with leading lines at ~5/5 µm. Roadmaps target 2/2 µm, which requires a sputtered Ti/Cu seed (thinner and more uniform than electroless), thinner and smoother dielectric films, higher-resolution LDI, and cleanroom-class handling; some vendors market this as modified or advanced SAP (**mSAP**, a term that on the PCB side refers to a related process starting from a thin laminated Cu foil, used for the ~30/30 µm substrate-like PCBs in smartphones). A related design trick is **via-in-pad** and **stacked vias**: vias placed directly on the pads above and on top of one another, so signals can go vertically without wasting routing area, at the cost of more demanding via fill plating.

**Solder resist.** A photo-imageable epoxy (Taiyo Ink dominates) ~15–25 µm thick covers the outer copper, opened only at the bump pads on top and the ball pads on the bottom. The opening is either **solder-mask-defined (SMD)**, where the mask overlaps the pad and defines the wettable area, or **non-solder-mask-defined (NSMD)**, where the pad is smaller than the opening and the solder wets its sides; NSMD gives a stronger joint, SMD better tolerances.

**Surface finish.** Bare copper oxidizes, so pads are finished with **ENIG** (electroless nickel ~3–6 µm, a barrier against copper dissolution into solder, plus immersion gold ~0.05–0.1 µm to keep it solderable), **ENEPIG** (adds ~0.05–0.3 µm of electroless palladium between the Ni and Au, which prevents the "black pad" corrosion failure of ENIG and makes the pad both solderable and gold-wire-bondable), or **OSP**, a thin organic azole film that protects copper until reflow. For Cu-pillar flip chip, substrate pads are often pre-coated with a small solder bump (SOP) to give the pillar's thin SnAg cap enough solder volume.

### Why ABF, and Why a Food Company

Ajinomoto is a Tokyo food and amino-acid company (monosodium glutamate, seasonings). In the 1990s its fine-chemicals unit, drawing on epoxy-resin and hardener chemistry it had researched since the 1970s as an offshoot of amino-acid work, developed a film-form build-up dielectric with Intel as the launch customer; the film was first adopted in 1999, in Intel's Pentium III-era flip-chip packages. Before ABF, build-up layers were liquid resins that had to be coated, and photo-imageable dielectrics with poor thermal properties. ABF's combination of film form (uniform thickness, dry handling), laser drillability, low dielectric loss, tight CTE control from its silica filler, and above all the reproducible permanganate roughening that gives copper adhesion, made it the standard. Thirty years of tuning (the GX series, GY series, GZ for low-loss) and joint qualification with every substrate maker created a moat: switching dielectric means re-qualifying every substrate design for every chip that uses it. Ajinomoto is estimated to hold well over 90% of the build-up film market, and it sells to substrate makers, not chipmakers. Competitors (Sekisui, Taiyo, Resonac) and photo-imageable dielectrics for RDL-based packages have taken slivers.

### The Substrate Industry and the 2021 Shortage

Substrate makers, all outside the chip firms and OSATs:

- **Ibiden** (Japan): the technology leader, supplier to Intel for decades and to NVIDIA for its largest GPUs. Plants in Ogaki (Gifu) and a new one in Ono.
- **Shinko Electric** (Japan): Intel's other main supplier; taken private in 2024–2025 by a Japan Investment Corp-led consortium.
- **Unimicron** (Taiwan): largest by ABF revenue, key supplier to NVIDIA and AMD; a fire at its Guanyin plant in October 2020 helped trigger the shortage.
- **Kinsus** (Taiwan, Pegatron group) and **Nan Ya PCB** (Taiwan).
- **AT&S** (Austria): plants in Leoben and Chongqing, plus a new Kulim, Malaysia plant built largely for AMD.
- **Samsung Electro-Mechanics** and **LG Innotek** (Korea).
- China: Shennan Circuits, Zhuhai Access, and others, mostly on lower-layer-count parts as of ~2025.

Between 2020 and 2022 the industry learned that substrates are the easiest link in the chain to under-invest in. ABF substrate capacity grows in one-to-two-year plant projects with low margins in ordinary times, so makers had added little through the late 2010s. When pandemic-era PC, server, and 5G demand arrived, and chip firms began using larger, higher-layer-count substrates (each large substrate consuming panel area that used to hold several small ones), lead times stretched beyond 30–50 weeks. Intel and AMD both cited substrate supply as their binding constraint in 2021 earnings calls, and Ajinomoto ran ABF film lines flat-out. Ibiden, Unimicron, and AT&S each announced capacity expansions worth ¥100+ billion, and by 2023 a glut had arrived for mainstream parts, while the very largest AI-accelerator substrates remained tight.

Those AI substrates are extreme: ~80–100+ mm on a side (an H100-class package is roughly 70–75 mm; Blackwell-class assemblies use CoWoS-L's current 80 × 80 mm substrate limit, and TSMC's 9.5× reticle CoWoS for 2027 calls for a 120 × 150 mm substrate), 20+ metal layers (e.g., 10-2-10 or more), thick cores of ~1 mm or more for stiffness, and hundreds of embedded decoupling capacitors. Yield of such a part is a compounding product of per-layer yields, and the count of good units per 510 mm × 515 mm panel is only a few dozen.

**Glass core substrates** are the next step. Intel announced in September 2023 that it would replace the glass-fiber/epoxy core with a sheet of glass, with deployment targeted for the second half of the decade; at NEPCON Japan in January 2026 it showed a 10-2-10 package on a 0.8 mm-thick glass core, 78 mm × 77 mm, integrating two EMIB bridges, with warpage held below ~20 µm. Glass offers ultra-flatness (fine-line lithography on it is easier than on a rough organic panel), a CTE tunable from ~3 to ~9 ppm/K to better match silicon, much lower warpage on very large packages, and **through-glass vias (TGVs)** at tighter pitch than PTHs. The problems are fragility during handling, TGV metallization, and the lack of a supply chain; Absolics (SKC) in Georgia, Samsung Electro-Mechanics, and the Taiwanese substrate makers all had pilot lines running as of ~2025.

> **Worked example: how many substrate layers to fan out 10,000 I/Os?**
> Take a 30 mm × 30 mm die with Cu-pillar bumps on a 150 µm pitch: 200 × 200 = 40,000 bump sites. Suppose 10,000 of them are signals (the rest power and ground, which need no routing, just vias into planes). The signals must escape from under the die to the outer rings of the package.
> Substrate via pads under the bumps are ~65 µm in diameter, so the gap between adjacent pads is 150 − 65 = 85 µm. With 10/10 µm line/space, each trace consumes 20 µm and the channel must keep 10 µm from each pad: traces per channel = (85 − 10) / 20 ≈ 3. The outermost ring of bumps (~800) escapes directly. The next rings must route through the ~800 channels of the ring outside them, at 3 traces each, ~2,400 more. So one signal layer escapes on the order of **~3,000 signals** from the outer ~4 rings. Each escaped ring frees its vias, and deeper rings route on the next layer down. To escape 10,000 signals therefore needs **~3–4 signal layers**, and for controlled impedance each signal layer wants a ground or power reference plane adjacent, giving ~6–8 top-side layers, plus a core, plus a comparable bottom-side stack to spread to the 1 mm ball pitch: a 6-2-6 to 8-2-8 substrate, 14–18 layers. Real GPU substrates with 20+ layers are in this range once power integrity requirements are added.
> Now redo it at 2/2 µm L/S: traces per channel = (85 − 2) / 4 ≈ 20, so one layer escapes ~800 + 16,000 signals, and the entire die could theoretically escape on **one** signal layer. This is why finer L/S on substrates is worth so much: every layer removed saves a lamination cycle (~1–2 days of process time), improves yield (each layer costs a few percent), and reduces thickness and warpage.

## Leadframes and the Mass Market

The trillion-unit world of microcontrollers, power management, discretes, analog, and sensors does not use build-up substrates. It uses **leadframes**: a stamped or etched sheet of copper alloy (C194 Cu-Fe-P, C7025 Cu-Ni-Si, or KFC), 125–250 µm thick, patterned into a central **die paddle** surrounded by lead fingers, in strips of dozens to hundreds of units. Makers include Mitsui High-tec, Shinko, Chang Wah, Haesung DS, and SDI. The fingers are selectively plated with silver (for wire bonding) or, increasingly, the whole frame is pre-plated with **NiPdAu (PPF)** so no post-mold plating is needed.

Two families dominate:

- **QFP (Quad Flat Package)** with gull-wing leads on four sides at 0.4–0.8 mm pitch, up to ~300 pins, for microcontrollers and legacy logic.
- **QFN (Quad Flat No-lead)**, a leadframe package with no protruding leads: the fingers are exposed as pads on the bottom edge and the paddle is exposed as a large thermal pad in the center, soldered directly to the PCB. It is the smallest, cheapest, and thermally best leadframe format and is the workhorse of RF, power management, and Wi-Fi/Bluetooth chips. Assembled cost is on the order of a few cents per unit.

Smaller leadframe types (SOIC, TSSOP, SOT-23, DFN) and power packages (TO-220, TO-247, D2PAK) are variations on the same theme.

## Molding, Marking, Ball Attach, Lids, Singulation

### Molding

**Transfer molding** encapsulates wire-bonded and many flip-chip parts in **epoxy mold compound (EMC)**: a formulated solid consisting of ~70–90 wt% fused spherical silica filler (which sets the CTE to ~7–12 ppm/K below the glass transition, ~30–50 above it, and the thermal conductivity to ~1 W/m·K), an epoxy resin (o-cresol novolac, biphenyl, or multi-aromatic types), a phenolic hardener, catalyst, carbon black for opacity, release agents, ion-trapping additives, and non-halogen flame retardants. The suppliers are **Sumitomo Bakelite** (the leader, roughly a third of the market), Resonac (ex-Hitachi Chemical), **Nagase ChemteX**, Kyocera, Panasonic, and Chang Chun.

The process: EMC tablets are preheated (~90 °C, often by RF), dropped into the pot of a mold heated to ~175 °C, and a plunger drives the now-liquid compound at ~7–10 MPa through runners and gates into the cavities holding the leadframe or substrate strips. It gels in ~60–120 s; the strip is ejected and then **post-mold cured (PMC)** at 175 °C for ~4–6 hours to complete cross-linking. The failure modes are **wire sweep** (the viscous flow front pushing bond wires into each other), voids, incomplete fill, and **flash** (compound leaking onto lead surfaces). Tools come from Towa, ASMPT, Besi, and Yamada. Multiple dies on a strip are molded as one block (**molded array process, MAP**) and later sawn apart.

**Compression molding** is used where transfer molding's runners would be wasteful or impossible: whole 300 mm reconstituted wafers for fan-out packaging, panels, and **molded underfill (MUF)**, where the mold compound simultaneously underfills the flip chip and encapsulates it. Granular or liquid EMC is dosed into the lower mold half, the wafer/panel is lowered into it, and the mold closes under vacuum. **Towa** of Japan dominates compression molding equipment.

### Marking

A fiber or YAG laser engraves the part number, lot code, date code, and country of origin into the mold cap or lid at a few hundred units per minute. Ink marking survives only in a few legacy lines.

### Ball Attach and LGA

For a **ball grid array (BGA)**, the substrate strip's bottom pads receive a stencil-printed flux, a **ball placement head** drops pre-formed solder spheres (SAC305, or SAC105 / low-silver alloys for better drop-shock resistance in phones) from a pattern-matched stencil onto every pad, and the strip is reflowed. Balls range from ~0.25 mm diameter at 0.4 mm pitch (mobile) to 0.6 mm at 1.0 mm pitch (large FCBGA); a large GPU package carries 4,000–7,000 balls. **Land grid array (LGA)** omits the balls; the pads are bare ENIG/ENEPIG lands that either sit in a socket with spring contacts (all desktop and server Intel and AMD CPUs, e.g., LGA1851, SP5) or are soldered by paste printed on the board. Pin grid arrays (PGA) with actual pins are now rare.

### Lids, IHS, and TIM1

A high-power FCBGA is finished with an **integrated heat spreader (IHS)** or lid: a nickel-plated copper cap, ~1–2 mm thick, glued to the substrate perimeter with a silicone sealant and coupled to the die backside by **TIM1**. The TIM1 options are:

- **Polymer TIM (PTIM):** a silicone or hydrocarbon gel filled with alumina, zinc oxide, or aluminum particles, 2–8 W/m·K, applied as a 50–150 µm bond line. Cheap, compliant, re-workable, but its thermal resistance limits it to ~100–200 W parts, and it can pump out of the gap during thermal cycling.
- **Solder TIM (STIM):** a foil of **indium** (melting point 156.6 °C, thermal conductivity ~80 W/m·K), soldered between a Ti/Ni/Au metallized die backside (sputtered after backgrinding) and the gold-plated lid. It gives 5–10× lower resistance than polymer, and Intel adopted it for its high-end desktop CPUs from ~2018 on; the risks are voids and cracking after many cycles, because indium fatigues.

Data-center GPUs are increasingly shipped without a lid: a stiffener ring around the die keeps the package flat, and the cold plate presses directly on the die (or on the exposed HBM and GPU top surfaces, ground to the same height) through TIM. Removing one interface saves several °C at 1,000 W. Consumer and server CPUs keep the IHS for robustness against clumsy heatsink installation; between the IHS and the heatsink is **TIM2**, the paste the end user applies.

### Singulation

Substrate strips and MAP-molded leadframes are cut into individual packages on a saw (Disco again) with a wider, thicker resin-bond diamond blade than for wafers, since it must cut copper, glass fiber, and EMC. QFP and other leaded parts go through **trim and form**: a die punch cuts the dam bars and lead tips, and forms the leads into gull wings.

### Handoff to Package Test

Finished, singulated units are placed in trays or tape-and-reel and move to package-level test, burn-in, and system-level test, the subject of Module 18. Assembly yield at an OSAT for a mature FCBGA is typically 99%+; each 1% of loss at this stage destroys dies worth more than the entire assembly cost, which is why known-good-die testing (Module 14) matters.

## Wafer-Level and Fan-Out Packaging

**Wafer-level chip-scale packaging (WLCSP)** skips the substrate entirely. On the finished wafer, a polymer dielectric (polyimide or PBO) is spun and patterned, a sputtered-and-plated copper **redistribution layer (RDL)** re-routes the peripheral pads into an area array, a second polymer layer defines UBM openings, and solder balls of ~0.2–0.3 mm at 0.35–0.5 mm pitch are dropped and reflowed directly on the die. After backgrinding, a backside laminate protects the silicon, and the wafer is diced. The package is exactly the die size; there is no fan-out, so a die can only carry as many balls as fit on its own area. WLCSP dominates for PMICs, RF front-end parts, and small sensors in phones (hundreds per phone). Its Achilles' heel is the CTE problem: a 5 mm bare silicon die soldered straight to an FR-4 board (CTE ~17) survives temperature cycling only because it is small (short DNP); WLCSPs above ~6–7 mm are rare for exactly this reason.

**Fan-out wafer-level packaging (FOWLP)** removes the die-size limit. Infineon's **eWLB** (embedded wafer-level BGA, 2006, later licensed to STATS ChipPAC/JCET, Nanium/Amkor, and ASE) established the flow:

1. Dice the wafer; place good dies face-down on a carrier coated with a thermal-release tape, spaced further apart than they were on the original wafer.
2. Compression-mold EMC over the dies to form a **reconstituted wafer** (300 mm, or a rectangular panel in panel-level variants).
3. Debond the carrier, exposing the die faces flush with the mold surface.
4. Build RDL layers (polymer plus Cu, 2–10 µm L/S) across both die and mold, fanning connections out beyond the die edge.
5. Drop balls, dice the reconstituted wafer.

The difficulties are **die shift** (dies move a few micrometers as the EMC shrinks during molding, so the RDL lithography must measure and compensate every die position) and **warpage** of a wafer that is half silicon and half epoxy.

TSMC's **InFO (Integrated Fan-Out)** made fan-out famous. Introduced in 2016 for the iPhone 7's A10 processor, InFO-PoP replaced the substrate-based flip-chip package-on-package used through the A9 generation (which TSMC and Samsung had dual-sourced). Its innovations: dies are placed face-*up* with tall electroplated copper pillars ("through-InFO vias", TIVs, ~150–200 µm tall) alongside them; after molding, the mold is ground back to expose both the die's Cu pads and the TIV tops; RDLs (down to ~2/2 µm L/S, finer than any substrate) are built on top; and the LPDDR memory package is stacked on the TIVs in a **package-on-package (PoP)** arrangement. The result is thinner than a substrate-based PoP by ~30%, has lower resistance and inductance to the memory, and better thermal performance. Every iPhone AP since has used an InFO variant, and InFO-on-Substrate (InFO-oS) serves networking and lower-cost multi-die parts. Samsung, ASE, PTI, and Innolux pursue panel-level fan-out (FOPLP) on 500–600 mm panels to cut cost per area, with mixed results as of ~2025.

## The Package Taxonomy

| Package | Era | Interconnect | Pin/ball count | Pitch | Typical use today |
|---|---|---|---|---|---|
| DIP (dual in-line) | 1970s | Wire bond, leadframe | 8–64 | 2.54 mm | Hobbyist, legacy logic |
| SOIC / TSSOP / SOT | 1980s+ | Wire bond, leadframe | 3–56 | 0.5–1.27 mm | Analog, discretes |
| QFP | 1980s+ | Wire bond, leadframe | 32–300 | 0.4–0.8 mm | MCUs, legacy ASICs |
| QFN / DFN | 2000s+ | Wire bond or flip chip, leadframe | 4–100 | 0.4–0.65 mm | PMIC, RF, MCUs, the volume king |
| PBGA (plastic BGA) | 1990s+ | Wire bond, laminate | 100–1,000 | 0.8–1.27 mm | FPGAs, networking, mid-range SoCs |
| FCBGA / FCLGA | Late 1990s+ | Flip chip, build-up substrate | 500–8,000+ | 0.65–1.0 mm | CPUs, GPUs, high-end SoCs |
| WLCSP | 2000s+ | Direct balls on die (fan-in) | 4–200 | 0.35–0.5 mm | Mobile PMIC, RF, sensors |
| FOWLP (eWLB, InFO) | 2010s+ | RDL over die and mold | 100–1,500 | 0.35–0.5 mm | Smartphone APs, RF, automotive radar |
| 2.5D (CoWoS, EMIB) | 2011+ | Microbumps to interposer/bridge on FCBGA | 5,000–10,000+ | 0.65–1.0 mm | AI accelerators, HPC (Module 17) |
| 3D (HBM, SoIC, Foveros) | 2015+ | TSVs, microbumps or hybrid bonding | Die-to-die 10⁴–10⁶ | 1–40 µm | HBM stacks, stacked SoCs (Modules 15, 17) |

The pattern: as pin counts pass ~300, perimeter leads cannot fit, so the industry moved to area arrays (BGA). As signal speeds and counts passed what a bond wire could serve, it moved to flip chip. As dies passed the reticle limit and as memory bandwidth demanded thousands of wires a few millimeters long, it moved to 2.5D and 3D.

## Package Reliability and Qualification

Packages are qualified against JEDEC and AEC (automotive) standards. The core tests:

- **Temperature cycling (TC), JESD22-A104.** −40 to +125 °C (condition G) or −55 to +125 °C (condition B), typically 500–1,000 cycles at 1–3 cycles/hour, with electrical test at intervals. Fails: solder fatigue, underfill delamination, die or substrate cracks.
- **HAST (Highly Accelerated Stress Test), JESD22-A110.** 130 °C, 85% RH, ~2 atm, 96–264 h with bias. Accelerates moisture-driven corrosion, ionic migration, and delamination. Unbiased HAST (uHAST, A118) omits bias; the older THB test (85 °C/85% RH, 1,000 h) tests the same failure mechanisms more slowly.
- **High-temperature storage (HTS), JESD22-A103.** 150 °C for 1,000 h, driving intermetallic growth at wire bonds and bumps (the Au–Al **purple plague** of Au wire on Al pads, or Kirkendall voiding at Cu/Sn interfaces).
- **Drop test, JESD22-B111.** A board with the packages is dropped to produce a 1,500 g, 0.5 ms half-sine shock, 30 times; it is the pass/fail test for handset packages and the reason low-silver SAC alloys exist.

Before any of these, samples undergo **preconditioning** per J-STD-020: moisture soak to a **Moisture Sensitivity Level (MSL)** followed by three passes through a 260 °C lead-free reflow profile. The MSL system rates how long a package can sit in factory air (30 °C, 60% RH) between opening its dry-pack and being soldered: **MSL 1** = unlimited, **MSL 2** = 1 year, **MSL 2a** = 4 weeks, **MSL 3** = 168 hours (the most common rating for BGAs), MSL 4 = 72 h, MSL 5 = 48 h, MSL 5a = 24 h, MSL 6 = must be baked before use. The failure it guards against is **popcorning**: epoxy mold compound and substrates absorb ~0.1–0.3 wt% water; at 260 °C, water trapped at an interface (die-to-paddle, mold-to-die, underfill) vaporizes at a pressure of several MPa (the saturated vapor pressure of water at 260 °C is ~4.7 MPa), delaminating the interface and cracking the package with an audible pop. The remedy is baking (125 °C for 24 h) and shipping in dry-packs with desiccant and a humidity indicator card.

## The Industry: OSATs, Foundry Back Ends, and Equipment

### OSATs

**Outsourced semiconductor assembly and test (OSAT)** companies package and test chips for fabless firms, foundries, and IDMs. The top-10 OSATs had combined 2024 revenue of ~$41.6 billion (TrendForce). By share of the top-10:

- **ASE Technology Holding** (Taiwan; includes SPIL, acquired 2018, and the USI EMS business): ~$18.5 billion, ~45% of the top-10 and roughly 30% of the entire OSAT market including smaller players. Kaohsiung is the center of gravity.
- **Amkor** (USA, with major plants in Korea, the Philippines, Japan, Taiwan, Vietnam, and Portugal): ~$6.3 billion, ~15%.
- **JCET** (China; owns the former STATS ChipPAC of Singapore): ~$5.0 billion, ~12%, growing at double digits.
- **Tongfu Microelectronics** (China; AMD's partner, with the former AMD Suzhou and Penang plants): ~8%.
- **Powertech Technology (PTI)** (Taiwan; memory packaging leader): ~5.5%.
- **Huatian (HT-Tech)** (China): ~5%; then WiseRoad, Hana Micron (Korea), KYEC (Taiwan; test only), ChipMOS (Taiwan).

### TSMC's Own Back End

TSMC is unusual among foundries in operating a large in-house back end, because it decided in the 2010s that advanced packaging (InFO, CoWoS, SoIC) was a competitive weapon rather than a commodity. Its **Advanced Packaging (AP)** fabs in Taiwan, as of ~2025–2026:

- **AP1**, Hsinchu: the original site, being repurposed for R&D.
- **AP2**, Tainan: bumping and microbumps, some CoWoS.
- **AP3**, Longtan: InFO, the iPhone AP line.
- **AP5**, Taichung: CoWoS.
- **AP6**, Zhunan: opened June 2023; the main CoWoS and SoIC site.
- **AP7**, Chiayi: under construction to produce from 2026, for CoWoS, SoIC, and successors.
- **AP8**, Tainan (Southern Taiwan Science Park): a ~96,000 m² CoWoS complex, ~9× the area of AP6.

TSMC's back-end revenue was ~8–10% of its total in 2024–2025. For its Arizona wafers, TSMC relies on **Amkor's Peoria, Arizona** plant, a multi-billion-dollar project with TSMC as anchor tenant for Apple and NVIDIA parts, plus plans for its own packaging on the Arizona campus in a later phase. Intel likewise packages most of its own CPUs in Malaysia (Penang, Kulim), Chengdu, and New Mexico (Rio Rancho, for Foveros); Samsung packages its memory and logic in Cheonan and Onyang.

### Equipment Vendors

Back-end equipment is a ~$10 billion-a-year market, a fraction of the front-end's ~$100 billion, but concentrated:

| Segment | Leader | Others |
|---|---|---|
| Backgrinding, dicing (blade and stealth) | Disco (Japan), ~70–80% | Accretech/Tokyo Seimitsu, Hamamatsu (stealth laser source) |
| Die attach, flip-chip, TCB, hybrid bonding | Besi (Netherlands), ASMPT (Hong Kong/Singapore) | K&S, Palomar, Shibaura, Fasford |
| HBM TC bonders | Hanmi Semiconductor (Korea, for SK hynix and Micron) | Hanwha Semitech, Semes (Samsung captive), ASMPT |
| Wire bonders | K&S (USA/Singapore), ASMPT | Shinkawa (Yamaha Robotics) |
| Molding | Towa (Japan) in compression; ASMPT, Besi, Yamada in transfer | |
| Temporary bonding/debonding, wafer bonding | EV Group (Austria), SUSS MicroTec (Germany) | TEL |
| Substrate laser drilling | Via Mechanics (Japan), Mitsubishi Electric | |
| Substrate LDI | Orbotech (KLA), SCREEN | Via Mechanics |
| Bump and package inspection | Camtek (Israel), Onto Innovation (USA), KLA | Saki, Koh Young |
| Reflow ovens | Heller, BTU (Amtech), Rehm | |

### Cost

For a mainstream chip, assembly and packaging is on the order of 10–20% of the total manufactured chip cost, with test adding a few percent more. A QFN costs cents; a WLCSP a few cents per die; bumping a 300 mm wafer on the order of a few hundred dollars; a mid-range FCBGA several dollars to tens of dollars, most of it the substrate. For an AI accelerator the picture inverts: a CoWoS assembly costs thousands of dollars in packaging and interposer before counting the HBM, so packaging and memory together can exceed 30% of module cost, and the packaging step, not the wafer, sets the volume ceiling. That is the subject of the next module.

## Key Numbers

| Quantity | Value |
|---|---|
| CTE of silicon / organic substrate / Cu / SAC305 solder / EMC (below Tg) | 2.6 / ~15 / ~17 / ~22 / ~7–12 ppm/K |
| Starting 300 mm wafer thickness → after backgrinding | 775 µm → 300–700 µm (FCBGA), 100–200 µm (WLCSP, wire bond), 30–50 µm (HBM DRAM) |
| Coarse / fine grinding wheel grit | #320–#600 / #2000–#8000; damage layer ~10–20 µm → ~1–3 µm |
| TAIKO edge ring width | ~2–3 mm at full thickness |
| Blade dicing kerf / spindle speed / feed | 20–50 µm / 30,000–60,000 rpm / 50–150 mm/s |
| Stealth dicing laser wavelength | ~1,064 nm (Si transparent), focused inside wafer; tape expansion ~10–20% |
| Cu pillar bump: height / solder cap / pitch | 30–50 µm / 15–25 µm SnAg / 100–130 µm (C4 solder ~130–150 µm; microbumps 36–55 µm) |
| UBM stack | Ti (or TiW) ~0.1–0.2 µm + Cu seed ~0.2–0.5 µm |
| Solder melting points | SAC305 ~217 °C; SnAg ~221 °C; indium 156.6 °C; Pb-5Sn ~310 °C |
| Reflow peak temperature (lead-free) | 240–260 °C, time above 217 °C 40–90 s |
| Wire bond wire diameter / speed | 15–25 µm / ~15–25 wires per second; ~70–80% of units by count |
| Placement accuracy: die attach / flip-chip TCB / hybrid bonding | ±10–25 µm / ±1–2 µm / ±0.1–0.2 µm |
| Corner-bump CTE displacement, 30 mm die, ΔT 192 K | ~50 µm (γ ≈ 70% without underfill) |
| ABF film thickness / laser microvia diameter / SAP line-space | 25–40 µm / 30–70 µm / ~8–10 µm HVM, 5 µm leading, 2 µm roadmap |
| ABF market share held by Ajinomoto | > 90% |
| Large AI GPU substrate | ~80–100+ mm side, 20+ layers, ~1 mm core; 4,000–7,000 BGA balls at 1.0 mm pitch |
| EMC composition / transfer mold conditions | 70–90 wt% silica; 175 °C, 7–10 MPa, 60–120 s, PMC 175 °C 4–6 h |
| MSL 3 floor life / bake / popcorn vapor pressure at 260 °C | 168 h at 30 °C/60% RH / 125 °C 24 h / ~4.7 MPa |
| Temperature cycling / HAST conditions | −40 to +125 °C, 500–1,000 cycles / 130 °C, 85% RH, 96–264 h |
| Top-10 OSAT revenue 2024 / ASE share of top-10 | ~$41.6 B / ~45% (~30% of the whole OSAT market) |
| Packaging + test share of chip cost | ~10–20% typical; > 30% for CoWoS/HBM-class parts |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| ASE Technology (incl. SPIL) | Taiwan | Largest OSAT: bumping, FCBGA, wire bond, fan-out, test | Leader (~30% of OSAT market) |
| Amkor | USA | #2 OSAT; Arizona plant for TSMC Arizona wafers | #2 |
| JCET | China | #3 OSAT (ex-STATS ChipPAC), eWLB fan-out | #3 |
| Tongfu, PTI, Huatian | China / Taiwan / China | #4–6 OSATs; PTI leads memory packaging | Top tier |
| TSMC (AP1–AP8) | Taiwan | In-house bumping, InFO, CoWoS, SoIC | Leader in advanced packaging |
| Ajinomoto Fine-Techno | Japan | ABF build-up dielectric film | Near-monopoly (> 90%) |
| Ibiden | Japan | FCBGA build-up substrates (Intel, NVIDIA) | Leader (technology) |
| Unimicron | Taiwan | FCBGA build-up substrates (NVIDIA, AMD) | Leader (volume) |
| Shinko Electric | Japan | Build-up substrates, leadframes (Intel) | Top 3 |
| Kinsus, Nan Ya PCB, AT&S, Samsung Electro-Mechanics | Taiwan / Taiwan / Austria / Korea | Build-up substrates | Top tier |
| Mitsubishi Gas Chemical | Japan | BT resin for substrate cores | Leader |
| Disco | Japan | Grinders, dicing saws, stealth dicing, TAIKO | Dominant (~70–80%) |
| Besi | Netherlands | Die attach, flip-chip, TCB, hybrid bonders | Leader in advanced die attach |
| ASMPT | Hong Kong / Singapore | Die bonders, wire bonders, TCB, molding | #1–2 across back-end tools |
| Kulicke & Soffa | USA / Singapore | Wire bonders | Leader in wire bond |
| Hanmi Semiconductor | Korea | HBM TC bonders (SK hynix, Micron) | Leader in HBM bonders |
| Towa | Japan | Compression and transfer molding tools | Leader in compression molding |
| Sumitomo Bakelite, Resonac, Nagase | Japan | Epoxy mold compound | Sumitomo Bakelite leader |
| Nitto Denko, Lintec, Furukawa | Japan | Backgrinding and dicing tapes, DAF | Leaders |
| Taiyo Ink | Japan | Solder resist | Leader |
| Mitsui High-tec, Shinko, Chang Wah | Japan / Japan / Taiwan | Leadframes | Leaders |
| Hamamatsu Photonics | Japan | Stealth dicing IP and laser engines | Sole source (licensed to Disco) |

## Common Misconceptions

- **"Packaging is a low-tech afterthought."** → A leading FCBGA substrate is a 20-layer laminate with 8 µm copper lines, laser vias, and micrometer-level registration across a half-meter panel; bumping uses fab lithography and plating; TCB places dies to ±1 µm. Packaging now sets the volume and cost ceiling for AI accelerators.
- **"Wire bonding is obsolete."** → It is obsolete for high-pin-count, high-speed parts, but by unit count roughly three-quarters of all packaged devices are still wire-bonded, on copper wire, at 15–25 wires per second.
- **"Underfill is just glue to hold the chip on."** → Underfill is the structural element that converts an unsurvivable ~50 µm shear displacement at the die corners into a shared bending of die and substrate. Without it, flip chip on organic substrates would fail in a few thermal cycles.
- **"Thinner dies are always better."** → Thin dies conduct heat better and stack more, but they warp, are hard to handle below ~100 µm without carriers or TAIKO rings, and lose fracture strength unless the grinding damage layer is polished off. Large FCBGA dies are deliberately kept at 300–700 µm.
- **"A shortage of ABF means Ajinomoto is out of stock."** → The 2020–2022 "ABF shortage" was mainly a shortage of ABF *substrate* fabrication capacity at Ibiden, Unimicron, and peers (two-year plant build cycles), with the film itself a secondary constraint. Ajinomoto sells to substrate makers, not chip companies.
- **"Stealth dicing is just a laser saw."** → A laser saw ablates material from the surface; stealth dicing writes a plane of defects *inside* the silicon with a beam the surface never absorbs, and the wafer is then cleaved by stretching the tape. There is no kerf and no debris.

## Where This Fits in the Supply Chain

Module 15 ended with finished, probed memory wafers, and Module 14 with logic wafers whose dies carry a wafer-sort map of known-good positions. This module consumes those wafers plus a second stream of inputs that never touch a fab: ABF film from Ajinomoto, BT cores from Mitsubishi Gas Chemical, build-up substrates from Ibiden and Unimicron, leadframes from Mitsui High-tec, mold compound from Sumitomo Bakelite, tapes from Nitto Denko, solder spheres, wire, and TIMs, all processed on tools from Disco, Besi, ASMPT, K&S, and Towa. Its outputs are singulated, marked, ball-attached packages: QFNs and QFPs by the billions from ASE and JCET, FCBGAs from Amkor and ASE, and InFO packages from TSMC's Longtan fab, shipped in trays to final test (Module 18). Module 17 takes the same bumping, substrate, TCB, and molding building blocks and adds silicon interposers, TSVs, and hybrid bonding to build CoWoS and SoIC, the packages that carry NVIDIA's GPUs and their HBM stacks; those, after test, become the SXM modules and NVL72 racks of Module 19.

## Further Reading

1. Rao R. Tummala, *Fundamentals of Microsystems Packaging*, McGraw-Hill, 2001. The standard textbook; dated on nodes, timeless on mechanisms.
2. John H. Lau, *Semiconductor Advanced Packaging*, Springer, 2021, and *Flip Chip Technologies* (McGraw-Hill, 1996). Lau's books are the most complete engineering references on bumping, flip chip, fan-out, and reliability modeling.
3. Charles A. Harper (ed.), *Electronic Packaging and Interconnection Handbook*, 4th ed., McGraw-Hill, 2004.
4. JEDEC J-STD-020 (Moisture/Reflow Sensitivity Classification), JESD22-A104 (Temperature Cycling), JESD22-A110 (HAST), JESD22-B111 (Drop Test). Free from jedec.org.
5. Disco Corporation technical pages on stealth dicing, TAIKO, and dry polishing (disco.co.jp).
6. Hamamatsu Photonics, "Stealth Dicing Technology and Applications" (technical note).
7. Ajinomoto Fine-Techno, "Insulation film: Ajinomoto Build-up Film (ABF)" product page (aft-website.com), and the Ajinomoto Group innovation story "Ajinomoto Build-up Film (ABF)" and stories article "The Ajinomoto Group's Unexpected Role in Semiconductor Manufacturing" (ajinomoto.com).
8. Intel Newsroom, "Intel Unveils Industry-Leading Glass Substrates to Meet Demand for More Powerful Compute," September 2023; and coverage of Intel's thick-core glass substrate with EMIB at NEPCON Japan (TrendForce, January 2026).
9. TrendForce, "Top 10 OSAT Companies of 2024 Revealed," press release, 13 May 2025.
10. Tom's Hardware, "The state of ABF substrates in data center silicon in 2026" (2026), on the substrate supply chain for AI accelerators; SemiAnalysis, "DISCO Corporation, The World Leader in Semiconductor Capital Equipment for Cutting, Grinding, Polishing," on the dicing and grinding tool market.
