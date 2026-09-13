# Module 12: Interconnect: The Back End of Line

A leading-edge logic die contains on the order of 10^10 transistors, and every one of them is useless until it is wired to the others. The wiring is the **back end of line (BEOL)**: roughly 15 to 18 stacked levels of metal lines and vertical **vias**, embedded in insulating dielectric, built on top of the transistors after the **front end of line (FEOL)** is finished. Added up, a large die carries tens of kilometers of wire. The tightest lines are ~ 12 nm wide, narrower than the distance an electron travels in copper between collisions. The thickest are microns wide and carry amps of supply current.

The hard problem is this: transistors got faster with every node, but wires got slower. A wire's delay scales as its resistance times its capacitance, and when you shrink a wire's width and pitch together, resistance per unit length rises roughly as the inverse square of the width while capacitance per unit length barely changes. Since the late 1990s the industry has fought this with a new conductor (copper), new insulators (low-k), a completely different way of patterning metal (damascene), and now a third generation of conductors (cobalt, ruthenium, molybdenum) and a relocation of the entire power grid to the back of the wafer. The BEOL is now about half of all process steps in a logic flow, roughly a third of wafer cost, and the dominant term in the delay of most signal paths. This module walks through how it is built, layer by layer, and why.

## Why Interconnect Became the Bottleneck

### RC delay

Model a wire as a distributed resistance R and capacitance C. The time for a signal to propagate a length L is, for an unbuffered distributed line, approximately 0.38 × R_total × C_total (the 50 percent delay of a uniform distributed RC line; the Elmore estimate is 0.5 RC and a lumped model gives 0.69 RC). Both R and C are proportional to L, so wire delay grows as L². Resistance per unit length is:

r = ρ / (w × h)

where ρ is the resistivity, w the width and h the height (thickness) of the line. Capacitance per unit length for a line surrounded by neighbors at spacing s on the same level and dielectric above and below is dominated by the lateral (line-to-line) term plus vertical terms; a workable estimate is c ≈ 2 ε₀ k (h/s) + 2 ε₀ k (w/t), where t is the dielectric thickness to the levels above and below. Because h/s and w/t are geometric ratios that stay roughly constant as everything shrinks together (aspect ratio h/w ≈ 2, s ≈ w), capacitance per unit length has sat at about 0.2 fF/µm (200 pF/m) for two decades, almost independent of node. Resistance per unit length, by contrast, doubles every time width and height are each shrunk by 0.7×, and that is before the resistivity itself starts rising.

### The resistivity size effect

Bulk copper has ρ = 1.68 µΩ·cm at 20 °C. Its conduction electrons have a **mean free path** (average distance between scattering events) of about 39 nm at room temperature. When any dimension of the conductor approaches or drops below this, electrons scatter off the surfaces and the grain boundaries in addition to the phonons that limit bulk conductivity, and the effective resistivity climbs. Two classical models describe this:

- **Fuchs-Sondheimer** surface scattering: a fraction (1 - p) of electrons hitting the surface scatter diffusely (randomizing their momentum) rather than specularly. For copper against a TaN barrier, p is close to 0, meaning nearly every surface collision is a resistive one.
- **Mayadas-Shatzkes** grain boundary scattering: each grain boundary reflects a fraction R of incident electrons, with R ≈ 0.3 to 0.5 for copper. Because damascene lines are narrow trenches, grains cannot grow larger than the line width, so the grain boundary density scales inversely with width.

The result is that a 20 nm wide, 40 nm tall copper line has an effective resistivity of roughly 5 to 8 µΩ·cm, three to five times the bulk value. At 12 nm width it approaches 10 µΩ·cm. The barrier layer makes this worse in a second way: the 1.5 to 2 nm of TaN and 1 to 2 nm of cobalt liner needed on each sidewall and on the trench bottom carry almost no current (TaN is ~ 200 µΩ·cm) yet take up a fixed slice of the cross section. At a 20 nm trench width, ~ 6 to 7 nm of the 20 nm is barrier and liner: a third of the width and something like 40 percent of the cross-sectional area. The copper in that line is effectively a 13 × 36 nm conductor.

### The crossover

The famous chart from the 1997 National Technology Roadmap for Semiconductors showed gate delay falling monotonically with scaling while the delay of an aluminum/SiO₂ wire rose, with the two curves crossing around the 0.25 to 0.18 µm generations. That chart motivated the copper and low-k transitions; the curves have been re-crossing ever since. Today the delay of a single inverter (FO4 delay) at N3 is under 10 ps (single-digit picoseconds), while an unbuffered 1 mm intermediate-level wire has a delay in the nanoseconds. Designers cope by inserting repeaters (buffers) every 100 to 300 µm, by routing long signals on upper, wider layers, and by keeping most connections short; nevertheless a substantial fraction of the standard cells on a modern SoC (estimates range from ~ 10 to 30+ percent) are repeaters and clock buffers whose only job is to fight wire delay, and interconnect is responsible for roughly half of dynamic power.

> **Worked example: RC delay of a 1 mm wire on M2 versus M8.**
> Take an M2 line at a 40 nm pitch: 20 nm drawn width, 40 nm height, spacing 20 nm. After 2 nm TaN and 1.5 nm Co on each sidewall and the bottom, the copper cross section is about 13 nm × 36.5 nm = 475 nm² = 4.75 × 10⁻¹⁶ m². Use ρ_eff = 7 µΩ·cm = 7 × 10⁻⁸ Ω·m. Then R = ρL/A = (7 × 10⁻⁸ × 10⁻³) / 4.75 × 10⁻¹⁶ ≈ 147 kΩ for 1 mm, i.e. ~ 147 Ω/µm. Capacitance at 0.2 fF/µm gives C = 200 fF. Distributed delay = 0.38 × 147 × 10³ × 200 × 10⁻¹⁵ ≈ 11 ns. That is a thousand FO4 delays; nobody routes a millimeter on M2.
> Now take an M8 line at a 4× pitch of 160 nm: 80 nm wide, 160 nm tall, copper cross section ~ 73 × 156 nm ≈ 1.14 × 10⁻¹⁴ m², ρ_eff ≈ 2.5 µΩ·cm. R ≈ 2.2 kΩ per mm, C ≈ 200 fF, delay ≈ 0.38 × 2.2 × 10³ × 2 × 10⁻¹³ ≈ 0.17 ns unbuffered. Split it into five 200 µm segments with a repeater between each: each segment's delay drops by 25× (L²) to ~ 7 ps, plus ~ 15 to 20 ps per repeater, giving ~ 0.1 to 0.13 ns total, and now the signal edge stays sharp. This is why the metal stack is hierarchical.

## Anatomy of the Metal Stack

Modern logic uses a **hierarchical** stack: many thin, tight-pitch layers at the bottom for local wiring inside standard cells and between neighbors, progressively wider and thicker layers above for longer signals, and very thick layers at the top for power distribution and clock trees. Pitch multiples are quoted relative to the minimum pitch: 1×, 1.5×, 2×, 4×, and so on. A representative stack for a TSMC N3-class process (the exact numbers are proprietary and vary between N3B, N3E, N3P and their design rule variants; treat these as typical rather than exact) looks like this:

| Level | Count | Pitch | Line thickness | Litho | Conductor | Function |
|---|---|---|---|---|---|---|
| Contact / M0 (MOL) | 1 to 2 | ~ 23 to 26 nm | ~ 30 to 40 nm | EUV, double-patterned | Cu (Co-lined) or Ru; Co/W plugs | Connects S/D and gate; local cell routing |
| M1 to M2 (1×) | 2 | ~ 26 to 30 nm | ~ 40 to 50 nm | EUV single or double | Cu with Co (or, per TSMC's N3 disclosure, an "innovative", reportedly Ru, liner) and Co cap | Cell-internal and cell-to-cell routing |
| M3 to M6 (1.5× to 2×) | 4 | ~ 40 to 60 nm | ~ 60 to 100 nm | EUV or 193i SADP | Cu | Block-level signal routing |
| M7 to M10 (2× to 4×) | 4 | ~ 80 to 130 nm | ~ 130 to 250 nm | 193i | Cu | Long signals, local power straps |
| M11 to M14 (semi-global) | 3 to 4 | ~ 200 to 400 nm | ~ 300 to 600 nm | 193i / KrF | Cu | Clock trunks, power mesh |
| M15 to M17 (global) | 2 to 3 | ~ 0.8 to 2 µm | ~ 1 to 3 µm | KrF / i-line | Thick Cu | Power and ground grid, I/O |
| AP / RDL | 1 | ~ 10 to 30 µm | ~ 1.5 to 3 µm | i-line | Al-Cu or thick Cu | Pads, bump redistribution |

A few landmarks anchor the table. TSMC N5 has a minimum metal pitch of 28 nm on M0; N3 tightened this to ~ 23 to 25 nm, and N2 is reported to be in the same range, with EUV double patterning (LELE) used on M0 and via layers. Intel 4 runs M0 at 30 nm, relaxed to 36 nm in the PowerVia variant because power rails are no longer competing for space on the front side, and Intel 18A also sits around 32 nm. In total, TSMC N5 uses about 14 to 15 copper levels plus the aluminum pad layer; TSMC's N3 IEDM paper describes a 15-level stack, and the tallest N3/N2-class product stacks are reported at up to ~ 17 to 18 levels. Intel's PowerVia test vehicle on Intel 4 used 14 front-side layers plus 4 backside layers and an RDL, and Intel 18A is reported in the same range. Above ~ 80 nm pitch the layers are still patterned with 193 nm immersion because the cost per layer is a fraction of EUV, and the litho tool mix in a fab reflects this: a handful of EUV layers at the bottom, a dozen DUV layers above them.

Also living in the upper stack are the **metal-insulator-metal (MIM) decoupling capacitors**: thin high-k dielectric (ZrO₂ or HfO₂ based, a few nm) sandwiched between TiN plates over large areas between the global layers, giving reported densities on the order of tens of fF/µm² (TSMC's "super high density MIM", SHDMIM, is stated to be 4× its earlier HDMIM, and the N2-era SHPMIM another 2× above that; absolute values are proprietary) to absorb supply noise close to the switching transistors.

### Middle of line (MOL)

The **middle of line (MOL)** is the set of steps that connect the transistor's source, drain and gate up to the first routing level. It is built after the replacement metal gate (Module 11) and before the first damascene copper. It is distinct from the BEOL in that it uses different metals and tolerates different thermal budgets. The pieces:

- **Trench silicide contact**: after opening the contact to the epitaxial source/drain, a thin Ti layer (~ 3 to 5 nm) is deposited (PVD or ALD), capped with TiN, and annealed to form TiSi_x at the interface. The contact resistivity target is below ~ 1 × 10⁻⁹ Ω·cm², which requires very high active dopant concentration at the epi surface; this interface is one of the biggest parasitic resistances in the whole transistor.
- **S/D contact plug (CA / MD)**: the hole is filled with a metal. For decades this was CVD tungsten from WF₆ + H₂ with a Ti/TiN adhesion and fluorine barrier. Starting around 7 nm class nodes, cobalt plugs (CVD Co from a cobalt carbonyl precursor, with a thin TiN liner and a reflow anneal) replaced tungsten in many flows because Co fills narrow holes without a seam and needs a thinner liner. The current direction is fluorine-free tungsten, ruthenium and molybdenum, discussed below.
- **Gate contact (CB / MP)**: contacts to the gate metal, historically placed over isolation to avoid shorting to the S/D contact; Intel's 10 nm process introduced **contact over active gate (COAG)** to reclaim that area, at the cost of a self-aligned contact scheme with dielectric caps of different materials (SiN over the gate, SiOC over the contact) that etch selectively against each other.
- **M0 local interconnect**: the first level of horizontal wire, at the tightest pitch on the die (~ 23 to 30 nm), running perpendicular to the gates and used to strap S/D contacts and gates inside the standard cell. At several foundries M0 is still copper with a cobalt liner; Intel 10 nm made M0 and M1 pure cobalt, and ruthenium is the leading candidate to replace both at N2/A16-class pitches.

Everything below M1 is patterned with EUV, often double-patterned, and the vias between M0 and M1 (V0) are among the most defect-sensitive features in the process because they are sub-20 nm holes that must land on sub-20 nm lines with a few nanometers of overlay margin.

## From Aluminum to Copper

### The aluminum era

From the 1960s to the late 1990s interconnect was aluminum (usually Al with 0.5 to 1 percent Cu added to suppress electromigration, and sometimes 1 percent Si to prevent spiking into junctions). It was patterned **subtractively**: blanket-sputter a Ti/TiN/Al-Cu/TiN stack, lithographically define the lines, plasma-etch the metal with Cl₂/BCl₃ (aluminum chlorides are volatile), strip resist, deposit SiO₂ over and between the lines by PECVD or high-density-plasma CVD (HDP-CVD, to fill the gaps), planarize by oxide CMP, etch via holes, and fill them with CVD tungsten plugs (blanket W deposition followed by etch-back or W CMP). W plugs were needed because sputtered Al cannot fill a narrow hole; W from WF₆ deposits conformally. The flow is intuitive: you etch the metal you want to keep, as you would in FEOL.

Aluminum's problems were its resistivity (2.65 µΩ·cm bulk, 60 percent higher than Cu) and its electromigration resistance (its activation energy for diffusion is low, ~ 0.5 to 0.7 eV, so it fails at current densities of a few × 10⁵ A/cm²). By the 0.25 µm generation both had become limiting.

### Why copper, and why it cannot be etched

Copper has ρ = 1.68 µΩ·cm, and its electromigration activation energy in a damascene line is around 0.8 to 1 eV (interface-limited; lattice diffusion in bulk copper is ~ 2 eV), versus ~ 0.5 to 0.7 eV for aluminum, giving orders of magnitude longer life at a given current density. IBM announced the first production copper process (CMOS 7S, 0.22 µm) in September 1997, with Motorola close behind; TSMC and others followed within two to three years.

But copper cannot be dry-etched at practical temperatures. The plasma etch products that make aluminum etchable (AlCl₃ boils at ~ 180 °C) have no copper equivalent: CuCl and CuCl₂ have negligible vapor pressure below roughly 200 to 250 °C, and photoresist cannot survive those wafer temperatures, nor could the sidewalls be controlled. Copper also diffuses rapidly through silicon dioxide and silicon, where it creates deep-level traps that destroy transistors, so it must be sealed on every side by a diffusion barrier. Both constraints pushed the industry to invert the process: instead of depositing metal and etching it away, etch the pattern into the dielectric first, fill with metal, and polish off the excess. This is the **damascene** process, named after the Damascus craft of inlaying metal into a carved surface. The **dual damascene** version patterns a via level and the line level above it into one dielectric stack, fills both in one metallization, and polishes once per level, halving the number of fill and CMP steps compared to a single-damascene via then single-damascene line.

## The Dual Damascene Flow, Step by Step

What follows is one metal level, roughly M2 through M6 on a current node. Repeat it ~ 15 times with different dimensions and you have a BEOL. Each level involves on the order of 30 to 40 individual process operations, which is why the BEOL accounts for roughly half of the ~ 1,000+ steps and ~ a third of the cycle time of a leading-edge logic wafer.

### 1. Etch-stop / capping layer

The previous level's copper, freshly polished, is covered with a dielectric **cap**, typically 10 to 25 nm of PECVD SiCN (silicon carbonitride, deposited from trimethylsilane and NH₃ at ~ 350 to 400 °C) or an AlN/AlO_x bilayer at the most advanced nodes. This layer does three things: it seals the copper against oxidation and out-diffusion, it acts as an **etch stop** so the via etch of the next level stops on it, and its interface with the copper is the dominant path for electromigration (below). Its k value (~ 4.5 to 5.5 for SiCN) is much higher than the low-k bulk, so it is kept as thin as possible; at N5-class nodes the cap is around 10 nm.

### 2. Low-k dielectric

The inter-level dielectric (ILD) is deposited next: **low-k** material, meaning a dielectric constant below the 3.9 to 4.2 of PECVD SiO₂. The workhorse is **SiOC:H** (carbon-doped oxide, organosilicate glass, OSG), deposited by PECVD from organosilicon precursors such as diethoxymethylsilane (DEMS) or octamethylcyclotetrasiloxane (OMCTS) with oxygen or CO₂ at ~ 250 to 400 °C. Replacing Si-O bonds with less polarizable Si-CH₃ groups drops k to ~ 2.9 to 3.0 for "dense" SiOC:H. To go lower, the film is made porous: a sacrificial organic **porogen** (e.g. alpha-terpinene or a cyclic hydrocarbon) is co-deposited, then driven out by a UV cure (broadband UV at ~ 350 to 400 °C for a few minutes), leaving pores of 1 to 3 nm and 20 to 30 percent porosity. Since air has k = 1, porous SiOC:H reaches k ≈ 2.4 to 2.7. Applied Materials' Black Diamond series on the Producer platform has dominated this segment since the early 2000s; Lam (Vector) and ASM offer alternatives, and spin-on organosilicates from JSR, Dow and others have been used at some fabs. The full ILD stack for one level is roughly 80 to 150 nm at 1× levels and several hundred nm at upper levels.

Porosity is bought with pain. Porous low-k has low modulus (~ 5 to 10 GPa versus 70 GPa for SiO₂), low fracture toughness, low thermal conductivity, and it soaks up moisture and plasma damage. The industry spent a decade at k ≈ 2.5 to 2.7 and has largely stopped pushing lower; the practical lever now is thinner caps and airgaps rather than a lower bulk k. The **effective k** of a real stack, including caps, hard mask residue and damaged sidewalls, is typically 0.3 to 0.5 higher than the bulk film value.

### 3. Hard masks

Low-k cannot be etched with resist alone; the etch is long and the resist is thin. A multilayer **hard mask** goes on top: typically a thin TEOS oxide (~ 10 to 30 nm), then a **TiN metal hard mask** (~ 15 to 35 nm, by PVD), then sometimes a second oxide. The TiN gives high etch selectivity against the low-k in the fluorocarbon trench etch, defines the trench with better line-edge roughness than resist, and allows the trench pattern to be "stored" in the hard mask while the via is patterned separately. Its drawback is stress and the risk of TiN residue and metal contamination; several fabs have moved to amorphous carbon or SiN masks at specific layers.

### 4. Lithography and etch: via-first or trench-first

Two lithography steps define each level: one for the vias and one for the trenches. In the common **trench-first metal hard mask (TFMHM)** integration, the trench pattern is first etched into the TiN hard mask only; then the via pattern is exposed (EUV at the tight layers, 193i above) and etched down through the low-k, stopping on the SiCN etch stop; then the trench is etched into the top portion of the low-k using the TiN opening, self-aligned to the trench in one direction, while the via hole deepens simultaneously; finally the etch-stop at the via bottom is opened to expose the copper below. The **via-first** sequence reverses the order and was common through the 45 nm era. Either way the etch is fluorocarbon plasma (C₄F₈ or C₄F₆ with Ar, N₂, O₂) in a capacitively coupled reactor such as Lam Flex or TEL Vigus, with the recipe balancing polymer deposition on sidewalls (for anisotropy and selectivity to the TiN) against etch rate, using low ion energy to limit low-k damage.

At the tightest levels the via must land inside the width of the line beneath it, and misalignment steals cross section from the via and can create a short to the neighboring line. This drove **self-aligned via (SAV)** schemes: the TiN trench hard mask confines the via in the direction perpendicular to the line, so a via can only exist where a trench also exists. For EUV-patterned levels, via lithography stochastics (missing or merged holes, Module 08) are one of the most important yield limiters on the die.

### 5. Clean and low-k damage

After etch the wafer carries fluorocarbon polymer residue, TiN etch by-products, and a damaged layer on the exposed low-k sidewalls: the plasma has stripped the methyl groups from the surface SiOC:H, leaving a hydrophilic SiO_x skin that adsorbs water and raises k. The wet clean (dilute HF is too aggressive for porous material; dilute organic acid or amine-based strippers from DuPont/EMD/Entegris are used, in single-wafer spin tools from SCREEN or TEL) must remove residue and any copper oxide at the via bottom without etching the damaged low-k. Some flows add a silylation repair step (exposure to a silane vapor such as HMDS or DMDMS that re-caps dangling Si-OH with methyl groups) or a pore-sealing ALD skin. Resist strip is done with H₂/N₂ or CO₂ plasma rather than oxygen plasma, because O₂ ashing is devastating to low-k.

### 6. Barrier and liner

The wafer now goes into a vacuum cluster tool, almost universally an Applied Materials **Endura**, which holds well over half of the PVD market and a dominant position in copper barrier/seed. Inside, without breaking vacuum:

- A degas and a pre-clean (argon sputter or reactive H₂ plasma) remove moisture and the copper oxide at the via bottom. Etching too hard here re-sputters copper onto the low-k sidewall; too soft leaves an oxide that raises via resistance.
- **Barrier**: 1.5 to 2 nm of TaN, deposited by PVD (ionized, with a resputter step to thin the bottom and thicken the sidewalls) or at the tightest levels by ALD (from a Ta amide precursor and NH₃/H₂ plasma) for conformality. TaN is amorphous, stable, and copper does not diffuse through it. The historical Ta/TaN bilayer (Ta for adhesion of the Cu seed) has thinned to TaN plus a separate liner.
- **Liner**: 1 to 2 nm of cobalt (CVD from dicobalt octacarbonyl derivatives, on an Applied Volta chamber) or ruthenium (CVD or ALD). The liner's job is wetting: copper seed on bare TaN agglomerates into islands, but on Co or Ru it spreads into a continuous film and, at elevated temperature, reflows into the via.

The total barrier + liner budget per sidewall is ~ 3 to 4 nm and does not scale with pitch, which is the root of the "barrier share" problem from earlier. Every 0.5 nm shaved off the barrier is worth as much as a whole node's worth of resistivity improvement at 20 nm width.

### 7. Copper seed

Electroplating needs a conductive surface, so a thin **seed layer** of copper is sputtered in a PVD chamber on the same Endura: a few nanometers to ~ 20 nm depending on level, using a high-ionization (self-ionized plasma) source with wafer bias so that copper ions arrive at near-normal incidence and coat the sidewalls and bottom. The seed is never truly conformal: it is thick at the trench top (overhang) and thin on the lower sidewalls. At 1× levels a **copper reflow** step (heating the wafer to 200 to 400 °C in the tool for tens of seconds) lets the seed diffuse along the cobalt liner into the bottom of the via, partially filling it before plating even begins; on Co and Ru liners copper can also be plated directly onto the liner with a very thin or no seed.

### 8. Electrochemical deposition (ECD)

The wafer moves to a plating tool: Lam Research's **SABRE** family (SABRE Extreme/Max/Excel for damascene; the SABRE 3D variant serves packaging plating). Lam holds a large majority of the copper damascene plating market; Applied's Raider is the main alternative. Each plating cell is a cup in which the wafer is held face-down on a rotating head, its edge contacted by a sealed ring of electrical contacts, and immersed in acidic copper sulfate electrolyte (CuSO₄ ~ 40 g/L Cu²⁺, H₂SO₄ ~ 10 to 100 g/L, Cl⁻ ~ 50 ppm) with a copper anode below. Current flows from anode to wafer (the cathode); at the wafer surface Cu²⁺ + 2e⁻ → Cu.

Plating alone would coat every surface at the same rate, pinch off the top of a narrow trench (where the seed is thickest) and leave a void inside. What makes damascene possible is **superfill** (bottom-up fill), engineered with three organic additives at ppm concentrations:

- **Suppressor**: a polyether such as polyethylene glycol (PEG) or a PEG/PPG copolymer, molecular weight in the thousands, which together with chloride ions adsorbs on the copper surface and forms a blocking film that raises the overpotential needed to deposit. Because it is large and diffusion-limited, it reaches flat surfaces and trench mouths readily but cannot penetrate the bottom of a narrow feature quickly.
- **Accelerator** (brightener): a small sulfur-containing molecule, typically bis(3-sulfopropyl) disulfide (SPS) or its monomer MPS, which displaces the suppressor and catalyzes copper deposition where it sits. It adsorbs everywhere, but here is the trick: as the bottom of a trench fills, its surface area shrinks and the accelerator molecules already there are concentrated (they do not desorb), so the deposition rate at the bottom accelerates while the suppressed field remains slow. This is the **curvature-enhanced accelerator coverage** mechanism (Moffat and coworkers at NIST, ~ 2000). The fill proceeds from the bottom up and, in a via, sweeps upward like a piston.
- **Leveler**: a nitrogen-containing polymer or dye (e.g. Janus Green B, or proprietary quaternary ammonium polymers), strongly adsorbing and present at very low concentration, which is consumed under diffusion control preferentially at protruding areas and high-current regions. It quenches the accelerated bump that would otherwise form over each filled feature, giving a flatter overburden for CMP.

Chemistry vendors are Atotech (now MKS), DuPont (the former Rohm and Haas / Dow Electronic Materials line), MacDermid Alpha (Element Solutions; the former Enthone ViaForm line) and Moses Lake Industries; the exact additive structures are trade secrets, and the bath is continuously analyzed (cyclic voltammetric stripping) and dosed. The current density is stepped: an initial low-current stage (~ 2 to 5 mA/cm²) to protect the thin seed and fill the features, then higher current (~ 20 to 40 mA/cm²) to build the **overburden**, the 200 to 800 nm blanket of copper above the trenches that CMP will remove. Wafer rotation and shaped anodes/shields manage the terminal effect (voltage drop across the thin seed from edge contact to center that would otherwise plate the edge faster). Plating is at room temperature and takes one to three minutes per wafer.

> **Worked example: charge, current and time to plate one wafer.**
> Suppose a 300 mm wafer at a 2× level needs 600 nm of copper (feature fill plus overburden). Plated area ≈ π (15 cm)² ≈ 707 cm² (edge exclusion ignored). Volume = 707 cm² × 6 × 10⁻⁵ cm = 0.0424 cm³. Mass = 0.0424 × 8.96 g/cm³ = 0.380 g. Moles Cu = 0.380 / 63.55 = 5.98 × 10⁻³ mol. Faraday's law with n = 2 electrons per atom: Q = 2 × 96,485 C/mol × 5.98 × 10⁻³ = 1,154 C. At a bulk current density of 20 mA/cm², I = 0.02 × 707 = 14.1 A, so t = 1,154 / 14.1 ≈ 82 s for the bulk stage. Add a 20 to 30 s low-current fill stage at 3 mA/cm² (2.1 A, depositing ~ 20 nm) and the entire plate takes under two minutes, which is why a multi-cell SABRE with one robot can sustain on the order of 100 or more wafers per hour (vendor throughput figures are configuration-dependent). Plating efficiency is close to 100 percent for acid copper, so the Faraday estimate is nearly exact. Note the numbers: half a gram of copper per wafer per level, ~ 7 g of copper on a finished wafer, almost all of it polished off again.

### 9. Anneal

As plated, damascene copper has fine grains (tens of nm) and is metastable: it **self-anneals** at room temperature over hours, recrystallizing into larger grains with a resistance drop of ~ 20 percent. Fabs force this deterministically with a furnace or hotplate anneal at 150 to 400 °C for minutes to an hour in N₂/H₂, producing grains as large as the line geometry permits (bamboo structure in narrow lines, where grain boundaries span the full width and are perpendicular to current flow, which is good for electromigration). The anneal also relaxes stress and must happen before CMP, since polishing a film that is still recrystallizing gives an unstable removal rate.

### 10. Copper CMP

**Chemical mechanical planarization (CMP)** removes the overburden and the barrier from the field, leaving copper only inside the trenches and vias, with a surface flat enough that the next level's lithography is in focus (depth of focus at EUV is on the order of 100 nm). The tool is a rotary polisher: Applied Materials **Reflexion LK Prime** (Applied holds around 70 percent of the CMP tool market), with Ebara (F-REX) as the main alternative, strong in Japan and Korea. The wafer is held face-down in a carrier head with a flexible membrane and several concentric pressure zones, pressed against a rotating polyurethane **pad** (DuPont IC1000 and successors, grooved, ~ 1 to 2 mm thick) on a platen ~ 750 mm in diameter, with **slurry** dripped onto the pad at 150 to 300 mL/min. The head and platen spin at ~ 50 to 120 rpm, and a diamond-grit **conditioner** disk (3M, Kinik, Entegris) sweeps the pad to keep its surface rough and open.

The mechanism for copper is chemical first, mechanical second. Copper is too ductile to abrade cleanly, so the slurry contains an oxidizer (hydrogen peroxide, ~ 1 to 3 percent) that converts the surface to CuO/Cu₂O, a complexing agent (glycine, citric acid or an amino acid) that dissolves the oxide as a copper complex, and a **corrosion inhibitor**, benzotriazole (BTA), that forms a passivating Cu-BTA film on the copper. On the high points of the wafer the pad and abrasive particles (colloidal silica or alumina, ~ 50 to 100 nm, at ~ 0.5 to 3 percent by weight) mechanically strip the BTA/oxide film and expose fresh copper, which is immediately oxidized and dissolved; in recessed areas the inhibitor film stays intact and removal nearly stops. This is what makes the process **planarizing** rather than merely thinning. Removal rate follows the Preston relation, RR = K_p × P × v (proportional to pressure and relative velocity), and for bulk copper is around 300 to 800 nm/min at 1 to 2 psi. Porous low-k with its low modulus forced pressures down from ~ 5 psi in the oxide era to ~ 1 psi or less, which is part of why removal rates and throughput are limited.

Copper CMP is a multi-platen sequence, one platen per step:

1. **Bulk copper removal** at high rate on platen 1, stopped a few tens of nanometers above the barrier using an **eddy-current endpoint** sensor embedded in the platen (it measures the sheet resistance of the remaining copper film in situ) combined with optical reflectance.
2. **Soft landing / copper clearing** on platen 2 at lower rate and pressure, with a slurry selective to copper over TaN, until the barrier is exposed everywhere; the endpoint here is the change in optical reflectance or motor torque as TaN appears.
3. **Barrier removal and buff** on platen 3 with a different slurry (often with a different pH and abrasive) that removes TaN and the Co liner from the field, removes a controlled ~ 5 to 20 nm of the hard mask or low-k to clear residual metal, and smooths the surface.

Two defects define the process window. **Dishing** is the recess of the copper surface below the surrounding dielectric within a wide line (the pad flexes into the soft copper); **erosion** is the thinning of the dielectric in a dense array of narrow lines, where the local pattern density is high and the dielectric between lines wears faster. Both increase line resistance (less copper cross section) and add topography that accumulates layer over layer. Specs at tight levels are on the order of 10 to 30 nm. Both scale with pattern density, which is why design rules require metal density fill (below). Other defects: scratches from agglomerated abrasive, residual copper or barrier puddles (shorts), copper corrosion at the wafer edge, and organic residue.

**Post-CMP clean** happens immediately in a clean module attached to the polisher: double-sided PVA brush scrubbing with dilute chemistry (BTA-containing or citric acid/TMAH based, tuned to remove slurry particles and copper ions without corroding the exposed copper), megasonic rinse, Marangoni or spin dry. Copper left exposed for too long corrodes and grows CuO, so the wafer moves to the next cap deposition within a queue time limit of hours.

### 11. Cap, and repeat

The wafer goes back to the PECVD tool, receives a pre-clean (NH₃ or H₂ plasma to reduce copper oxide) and the SiCN cap for this level, and the cycle begins again for the next level. At the levels that matter for electromigration, a selective **metal cap** is added first (below). On a 15-level process the loop from step 1 to step 11 runs 15 times, with dimensions changing by an order of magnitude between the bottom and the top; the top thick-copper levels use thicker seeds, longer plating (5 to 10 minutes), thicker overburden, and a much less critical CMP.

## Vias, Resistance and the Small-Dimension Tax

A **via** is a vertical connection between two adjacent metal levels. On a modern node a 1× via is a roughly 20 nm diameter hole, ~ 40 to 60 nm deep, filled by the same TaN/Co/Cu as the line above it, sitting on the SiCN-capped copper of the line below (the etch stop is opened at the bottom). Its resistance has three parts: the copper column, the barrier at the bottom (TaN across the whole via footprint, in series with the current, unlike the sidewall barrier which is in parallel), and the interface to the underlying copper, which is sensitive to the pre-clean. Typical single-via resistances are ~ 10 to 50 Ω at 1× levels, versus a fraction of an ohm at the global levels. Chips have billions of vias, and the statistical tail (a via that lands partially off the line, or with residual oxide at the interface) dominates both yield and reliability; designers place redundant double vias wherever there is space.

## Electromigration

**Electromigration (EM)** is the drift of metal atoms under the momentum transfer ("electron wind") from the conduction electrons at high current density. Atoms move toward the anode (in the direction of electron flow), depleting the cathode end of a line and piling up at the anode end. In copper, the fast diffusion path is not the bulk (activation energy ~ 2 eV) but the interface between the copper and the dielectric cap, with an activation energy of ~ 0.8 to 0.9 eV for a SiCN cap; grain boundaries are intermediate. Voids nucleate where the flux diverges, typically just under a via at the cathode end (the barrier at the via bottom blocks atomic flux, so atoms leave and are not replenished), and an open circuit results.

Lifetime is characterized empirically by **Black's equation**:

MTTF = A × J^(-n) × exp(E_a / kT)

where J is current density, n is the current exponent (≈ 1 for void growth limited failure, ≈ 2 for nucleation limited, and fabs fit values in between), E_a the activation energy of the dominant diffusion path, k Boltzmann's constant and T absolute temperature. Because the dependence on temperature is exponential, tests are run at 300 to 350 °C and 1 to 3 MA/cm² for hours and extrapolated to operating conditions (105 to 125 °C, ~ 10 years). Design rules then set the maximum allowed current per wire width and per via, and the tools check every net.

Two mechanisms extend the limit. First, the **Blech length**: as atoms pile up at the anode, they build a compressive stress; at the cathode, tensile stress. The resulting stress gradient drives a back-flux of atoms opposite to the electron wind. For a line short enough that the stress gradient balances the wind before a void can nucleate, EM stops. This happens when the product of current density and length is below a critical value, (J × L)_crit ≈ 2,000 to 4,000 A/cm for copper in a rigid dielectric (lower in soft low-k). At J = 1 MA/cm² that is a critical length of ~ 20 to 40 µm: short lines that are bounded by barriers at both ends are effectively immortal, and design rules exploit this.

Second, the **metal cap**. Since the copper/SiCN interface is the weak path, replacing it with a copper/metal interface raises E_a. IBM and others introduced electroless **CoWP** (cobalt tungsten phosphide) caps around 2005, deposited selectively on exposed copper after CMP; the industry converged instead on a selective CVD cobalt cap a few nanometers thick, applied before the SiCN. Together with the Co liner on the sidewalls, the copper is fully clad in cobalt, E_a rises to ~ 1.0 to 1.2 eV, and the EM lifetime improves by an order of magnitude or more. This is what Intel calls "enhanced copper" (eCu) at Intel 4/3 and what TSMC is reported to have used since ~ N7 (TSMC does not disclose its cap chemistry). It is also why purity matters: the plating bath is continuously purified and the seed target is 6N (99.9999 percent) copper, because sulfur, chlorine or carbon incorporated from additives segregate to grain boundaries and interfaces and become both EM and stress-migration weak points. Copper sputter targets come from Honeywell, JX Nippon Mining & Metals and Tosoh.

## Other Reliability Mechanisms

**Stress-induced voiding (SIV / stress migration)** is the migration of vacancies, driven by the tensile stress the copper is left in after cooling from anneal (its thermal expansion is 17 ppm/K versus ~ 3 ppm/K for the surrounding dielectric), toward the stress concentration under a via. It is worst when a small via sits on a wide line (a large reservoir of vacancies) and peaks around 150 to 200 °C, where vacancy mobility is high but stress has not yet relaxed. The design rule fix is to require multiple vias on wide lines, and the process fix is to control the anneal and cap adhesion.

**Time-dependent dielectric breakdown (TDDB)** in the low-k is the slow degradation of the dielectric between two adjacent lines at different potentials. With a 20 nm spacing and 1 V, the field is 0.5 MV/cm, in a material that is porous, plasma-damaged at its sidewalls, and in contact with copper, which under the field can drift as Cu⁺ ions into the dielectric and build a conductive path. Lifetime is measured at accelerated fields and extrapolated with an E, √E or power-law field model, with a 10-year target at operating voltage and 95 to 99.9 percent survival. TDDB is a major reason the barrier must be continuous, the CMP must not leave copper on the surface, and the post-CMP clean must not leave copper ions in the porous film.

**Thermomechanical failure**: porous low-k delaminates or cracks under packaging stress (the chip-package interaction, CPI, problem), particularly under the C4 bumps; this is why the upper levels return to denser dielectrics and why the pad structures have crack-stop rings and specific mechanical design rules.

## The New Metals

Copper damascene runs into a wall at line widths below about 15 nm: the barrier/liner take a large share of the width, the copper resistivity is several times bulk, and the total line resistance grows faster than the geometry alone would predict. The alternatives are metals with a shorter electron mean free path (so they lose less to surface scattering) and no need for a thick barrier, even if their bulk resistivity is worse. The figure of merit is ρ × λ (resistivity times mean free path), lower being better at small dimensions:

| Metal | Bulk ρ (µΩ·cm) | Mean free path λ (nm) | ρ × λ (10⁻¹⁶ Ω·m²) | Melting point (°C) | Notes |
|---|---|---|---|---|---|
| Cu | 1.68 | ~ 39 | 6.7 | 1,085 | Needs TaN barrier + Co liner + cap |
| Al | 2.65 | ~ 19 | 5.0 | 660 | Subtractive etch; poor EM |
| Co | 6.2 | ~ 12 | 7.3 | 1,495 | Thin TiN liner; good EM; fill by CVD/ECD |
| Ru | 7.1 (7.8 in Gall's dataset) | ~ 6.6 | ~ 4.7 to 5.1 | 2,334 | Near-barrierless; subtractive etch possible |
| Mo | 5.3 | ~ 11 | 6.0 | 2,623 | Barrierless on oxide; CVD from MoO₂Cl₂ |
| W | 5.3 | ~ 15.5 | 8.2 | 3,422 | CVD from WF₆ (needs F barrier) or fluorine-free |

(Values after Gall, J. Appl. Phys. 2016; mean free paths are first-principles estimates and other sources quote somewhat different numbers, e.g. ~ 10 to 11 nm for Ru.)

**Cobalt**: Intel's 10 nm process (2017 to 2019) made M0 and M1 (36 nm pitch) entirely of cobalt with a thin TiN liner, and used cobalt contact plugs. Cobalt wins on EM (activation energy well above copper) and its liner is thinner, but its bulk resistivity is 3.7× copper's, so at 36 nm pitch the line resistance was in fact somewhat higher than copper's and Intel had reliability and yield trouble with the fill. Intel 4 retreated to cobalt-clad copper (eCu) for M0 to M4. Cobalt survives broadly as the liner and cap around copper and, at several foundries, as the S/D contact plug.

**Ruthenium**: Ru has the lowest ρ × λ of the practical candidates, is thermally and chemically robust, and copper-style barriers are unnecessary because it does not diffuse into oxide; a sub-nanometer TiN or TaN adhesion layer or none at all suffices. Its bulk resistivity of 7.1 µΩ·cm means it only beats copper when the line is narrower than roughly 12 to 15 nm including barrier, which is exactly where M0/M1 sit at N2/A16 class pitches. Ru can be deposited by CVD/ALD or plated, and, uniquely, it can be dry-etched: Ru + O₂ plasma forms volatile RuO₄, so a **subtractive** ruthenium process (deposit blanket Ru, pattern with EUV, etch the lines, then fill the gaps with dielectric or leave an airgap) is feasible. Imec has demonstrated subtractive Ru at 18 nm pitch and below, and TSMC and Samsung have discussed Ru for the bottom levels of N2-class and beyond nodes. As of 2025, Ru is confirmed in production only as a liner (Intel 10 nm; TSMC's N3 paper cites an "innovative", reportedly Ru, liner); no foundry has publicly confirmed Ru lines or vias in volume production, and the first such use is expected at A16/A14-class nodes, with details proprietary.

**Molybdenum**: Mo has a resistivity close to tungsten's with a shorter mean free path and, critically, does not need the fluorine barrier that WF₆-based tungsten requires, because the newer precursors (MoO₂Cl₂, MoCl₅) are fluorine-free; the TiN barrier can go from ~ 3 to 4 nm to under 1 nm or zero. Mo entered production first in 3D NAND wordlines (Micron first, per Lam, replacing tungsten across 200+ layers, where the barrier occupied a large share of the wordline thickness), with early adoption in advanced logic contacts and vias and development under way for DRAM. Lam (ALTUS Halo, announced February 2025) and Applied both sell Mo CVD/ALD tools.

**Tungsten** remains the contact fill at many nodes, now in a fluorine-free (FFW, from WCl₅) form that allows a thinner or no liner, and in some flows as the via 0 fill.

### What "subtractive metal" means and why it may return

Damascene was adopted because copper cannot be etched, and it has three structural costs: a barrier that cannot scale, a fill that becomes voidy in high-aspect narrow trenches, and CMP dishing/erosion that couples the metal thickness to pattern density. If a conductor can be dry-etched (Ru, Mo, W, Al all can), the flow inverts back to the Al-era style: deposit a blanket metal of exactly the intended thickness (so no CMP dishing), pattern it with EUV, etch it (so the aspect ratio is set by the etch, not by the fill), then deposit dielectric between the lines. Advantages: no barrier on the sidewalls, larger grains (the film is annealed as a blanket before patterning, so grains are not confined by the trench), lower line resistance at the same pitch, freedom to make lines tall, and the option of leaving an **airgap** between lines simply by depositing a non-conformal dielectric that pinches off. Disadvantages: metal etch at 20 nm pitch with acceptable line-edge roughness, the via must then be filled separately (usually still a damascene via), and the tooling ecosystem (Lam, TEL and Applied are all developing Ru/Mo etch chambers) is younger. Imec's roadmap and several foundries' N2/A16-era disclosures point to subtractive Ru or Mo for M0/M1, with damascene copper retained above.

### Airgaps

The lowest k is vacuum. Intel's 14 nm process (2014) introduced **airgaps** at two intermediate layers (80 nm and 160 nm pitch), reducing the capacitance of those layers by about 17 percent. The method: after the copper level is finished, a lithography step opens the areas where airgaps are allowed, the low-k between selected lines is etched away, and a non-conformal PECVD oxide is deposited that seals over the top of the gap before it can fill it. The gap must be kept away from vias (a via landing in an airgap would be an open or a short), which is why an extra mask is needed, and mechanical strength suffers, which is why it is used only where the RC benefit justifies the cost. Airgaps are a natural companion of subtractive metal, and several roadmap proposals for M1 through M3 in the ångström nodes include them.

### Hybrid metallization

**Hybrid metallization** refers to using different conductors for the via and the line in the same dual damascene level, or a barrierless metal via (Ru or Co) prefilled into the via hole before the copper line is plated over it. Prefilling the via with a barrierless metal removes the highest-resistance element (the barrier at the via bottom) from the current path, and the copper line above then only needs a barrier on its own sidewalls. Bottom-up selective deposition of Ru or Co (CVD that nucleates on the exposed copper below but not on the dielectric sidewalls) is the enabling process, and the same selective chemistry underlies the cobalt cap.

## The Top of the Stack

Above the thick global copper levels the process changes character; the features are microns, the litho is i-line, and the goal is to get the signals and power off the die.

**Pad metal (AP)**: the last copper level is capped and covered with a passivation dielectric (typically ~ 0.5 to 1 µm of PECVD SiO₂ and SiN). Openings are etched, and the **aluminum pad** layer is deposited: ~ 1 to 3 µm of PVD Al-0.5%Cu with Ti/TiN under and over, patterned by the old subtractive Cl₂/BCl₃ etch. Aluminum is retained here because it is a stable, non-oxidizing-through surface for probe needles (Module 14) and wire bonds, and because it is cheap. A final passivation (SiN, then usually a polyimide or PBO polymer, 5 to 10 µm, for stress buffering) is patterned to open the pad.

**Redistribution layer (RDL)**: for flip-chip parts the pads are re-routed into an area array with one or two RDL levels: thick copper (2 to 5 µm) patterned by a **semi-additive process** (sputter Ti/Cu seed, thick resist, electroplate copper only in the openings, strip resist, etch the seed), which is the reverse of both damascene and subtractive etch and works well at these coarse dimensions.

**Under-bump metallization (UBM)** and bumps: on each pad opening a UBM stack (e.g. sputtered Ti or TiW as barrier/adhesion, Cu as the wettable layer, sometimes Ni as a solder diffusion barrier) is deposited, and the bump is electroplated through a thick resist: a **C4** solder bump (SnAg, ~ 80 to 100 µm diameter on a 130 to 150 µm pitch) for conventional flip-chip, or a **copper pillar** (~ 20 to 50 µm diameter, with a thin SnAg cap) for fine pitch, or ~ 10 to 25 µm microbumps for chip-on-wafer stacking (Module 17). Reflow forms the solder ball. This is the point where the wafer, still whole, leaves the fab's BEOL and, after sort test, heads to packaging (Modules 16 and 17).

## Backside Power Delivery

In a conventional stack, the power and ground grid shares the same levels as the signals, descending from the thick top layers through every via level to the M0 power rails that run alongside each standard cell row. At N3-class pitches those M0 power rails are a large fraction of the cell height, the ~ 15 via levels between the C4 bump and the transistor cost IR drop (tens of mV at Watts of current), and the power mesh steals routing tracks on every level.

**Backside power delivery (BSPDN)** moves the entire power network to the back of the wafer. The front side keeps only signal wiring; after the front-side BEOL is complete the wafer is flipped, bonded to a carrier, and thinned from 775 µm down to a few hundred nanometers of silicon above the transistors (grind, CMP, then a selective etch stopping on an etch-stop layer such as a SiGe layer buried in the starting wafer), and a new, thick, coarse metal stack (~ 3 to 5 levels, 1× to 4× pitches in the hundreds of nm and micron range) is built on the back. Three connection schemes exist:

- **Buried power rail (BPR)**: a rail of Ru or W is placed in the isolation trench below the fins/nanosheets before the transistors are built, and nano-TSVs from the backside contact it (imec's original scheme; Intel evaluated it).
- **PowerVia** (Intel, in production on Intel 18A after a test-chip demonstration on Intel 4 in 2023): nano-TSVs through the thinned silicon connect the backside metal to the front-side contacts directly, without a buried rail. Intel reported that PowerVia allowed M0 pitch to relax from 30 to 36 nm (fewer tracks needed for power), improved cell utilization by 5 to 10 percent, and cut IR drop substantially.
- **Direct backside contact / Super Power Rail (TSMC A16, ramping 2026 to 2027)**: the backside metal contacts the source/drain epitaxy directly from below, with no TSV through the cell, giving the smallest area penalty.

The BEOL implications are significant: the front-side stack loses its thick power layers and may drop from 15 to 18 levels to 12 to 14, all signal, with the C4 bumps and RDL moving to the backside; the MIM capacitors move to the backside; thermal paths change (the transistors are now sandwiched between two metal stacks, with the heat sink on the backside metal); and the wafer thinning to sub-micron silicon is a new precision process with no margin for error. The tight-pitch signal layers, however, are built exactly as described above.

## Interconnect Metrology and Test Structures

BEOL cannot be inspected transistor by transistor, so it is monitored through in-line film metrology and electrical test structures in the scribe lines:

- **Film thickness and CMP**: copper thickness by in-situ eddy current on the polisher and by four-point probe or X-ray fluorescence on monitor wafers; dielectric and cap thickness by spectroscopic ellipsometry; dishing and erosion by atomic force microscopy (AFM) and high-resolution profilometry on test pads; barrier/liner thickness by X-ray reflectometry (XRR) or XRF on blankets and by TEM cross-sections on product.
- **Trench and via CD/profile**: CD-SEM and optical scatterometry (OCD) after etch; TEM lamellae cut by FIB for depth, sidewall angle, barrier continuity, and void checks. Void detection in filled vias uses e-beam voltage-contrast inspection (a floating via charges differently from a connected one).
- **Electrical**: every wafer carries scribe-line structures measured at parametric test: Kelvin line resistance (R per unit length by 4-terminal measurement on a serpentine of known length), **via chains** (10³ to 10⁶ vias in series; the resistance per via and the count of opens quantify via yield), comb-serpentine structures for line-to-line shorts and leakage (which also feed TDDB), and EM and SIV test lines that are stressed at wafer level or in package. Line resistance distributions across the wafer are the most direct readout of CMP uniformity and barrier thickness.

## Design Rules the BEOL Imposes

- **Minimum pitch and width** per layer, with the tight layers restricted to unidirectional lines at a fixed pitch (a "gridded" style dictated by SADP or EUV double patterning) and vias allowed only at grid intersections.
- **Via enclosure**: the metal must extend beyond the via by a specified distance so misalignment does not reduce the contact area; at self-aligned levels this is relaxed in one direction.
- **Minimum area and end-of-line extension** rules driven by lithography and by the copper reservoir effect for EM.
- **Metal density**: each layer must have a minimum (typically ~ 20 to 30 percent) and maximum (~ 70 to 80 percent) metal density in every window of, say, 50 × 50 µm, so that CMP dishing and erosion, which depend on local density, stay within spec. Where the design is sparse, the EDA tools insert **dummy fill** (floating metal shapes) automatically; where it is dense, slots are cut into wide lines. Dummy fill adds capacitance and is a standing negotiation between process and design.
- **Antenna rules**: a long metal line connected to a gate but not yet to a diffusion collects plasma charge during etch and can blow the gate oxide; the rule limits the ratio of metal area to gate area at each level, and the fix is a diode or a jumper to a higher level.
- **Current density limits** per width and per via for EM, and **redundant via** requirements on wide lines for SIV.

## Tools, Materials and Who Supplies What

The BEOL is where the equipment oligopoly is most visible, because each step has one or two dominant suppliers:

- **Low-k and cap deposition**: Applied Materials Producer (Black Diamond) leads; Lam Vector and ASM are alternatives. Precursors from Air Liquide, Merck (EMD Electronics) and Entegris.
- **Barrier, liner, seed**: Applied Endura with its Volta (CVD Co) and ALD TaN chambers holds a dominant share; Ulvac and Canon Anelva in some segments.
- **Etch**: Lam (Flex), TEL (Vigus, Tactras) and Applied (Centura Sym3) split dielectric etch; Lam, TEL and Applied are all developing the emerging Ru/Mo metal etch (shares not yet established).
- **Wet clean**: SCREEN and TEL single-wafer spin tools; Lam and SEMES in bevel and post-etch cleans.
- **ECD**: Lam SABRE leads with a majority share; Applied Raider and Ebara are alternatives; chemistry from Atotech/MKS, DuPont, MacDermid Alpha and Moses Lake Industries.
- **CMP**: Applied Reflexion LK Prime (~ 70 percent share), Ebara F-REX; pads from DuPont; slurries from Fujifilm, DuPont, Entegris (CMC) and Fujimi; conditioners from 3M and Kinik.
- **Targets and precursors**: Cu/Ta targets from Honeywell, JX Nippon Mining & Metals and Tosoh; Co, Ru, Mo and W precursors from Merck/EMD, Air Liquide, Adeka and Tanaka.
- **Metrology**: KLA (eddy current, e-beam voltage contrast, inspection), Nova and Onto (OCD, XRF), Hitachi CD-SEM, Thermo Fisher TEM/FIB.

## Key Numbers

| Quantity | Value |
|---|---|
| Copper bulk resistivity / electron mean free path | 1.68 µΩ·cm / ~ 39 nm at room temperature |
| Effective resistivity of a 20 nm wide Cu line | ~ 5 to 8 µΩ·cm (3 to 5× bulk) |
| Wire capacitance per unit length (nearly node-independent) | ~ 0.2 fF/µm |
| Number of metal levels, leading-edge logic | ~ 14 to 15 (N5, N3 paper), up to ~ 17 to 18 in the tallest N3/N2 products; Intel 4 PowerVia: 14 front-side plus 4 backside (18A similar) |
| Minimum metal pitch | 28 nm (N5), ~ 23 to 25 nm (N3, N2), 30 to 36 nm (Intel 4 / 18A) |
| Barrier + liner per sidewall | TaN ~ 1.5 to 2 nm + Co ~ 1 to 2 nm; ~ 30 to 40 percent of cross section lost at 20 nm width |
| Low-k dielectric constant | ~ 2.9 to 3.0 dense SiOC:H; ~ 2.4 to 2.7 porous; SiO₂ 3.9 to 4.2; SiCN cap ~ 5 |
| Cap layer thickness | ~ 10 to 25 nm SiCN (thinner at advanced nodes) |
| Cu ECD electrolyte and current density | ~ 40 g/L Cu²⁺, ~ 50 ppm Cl⁻; 2 to 5 mA/cm² fill, 20 to 40 mA/cm² bulk |
| Copper plated per 300 mm wafer per level | ~ 0.4 to 0.6 g; plating time ~ 1 to 3 min |
| Cu CMP removal rate and pressure | ~ 300 to 800 nm/min bulk at ~ 1 to 2 psi; three platens |
| Dishing / erosion spec | ~ 10 to 30 nm at tight levels |
| EM activation energy | ~ 0.8 to 0.9 eV (Cu/SiCN interface); ~ 1.0 to 1.2 eV with Co cap |
| Blech (J × L)_crit | ~ 2,000 to 4,000 A/cm for Cu |
| Single 1× via resistance | ~ 10 to 50 Ω |
| Airgap capacitance reduction (Intel 14 nm) | ~ 17 percent on two layers |
| Intel PowerVia effect on M0 pitch | 30 nm relaxed to 36 nm |
| Steps per dual damascene level | ~ 30 to 40 operations |
| Applied Materials share of CMP / Lam share of Cu ECD | ~ 70 percent / majority (> 60 percent, estimated) |
| Al pad thickness / C4 bump pitch | ~ 1 to 3 µm / ~ 130 to 150 µm |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Applied Materials | USA | Endura PVD/CVD barrier, liner, seed; Producer low-k; Reflexion CMP; Centura etch | Leader in PVD, low-k, CMP |
| Lam Research | USA | SABRE Cu ECD; Flex dielectric etch; Vector PECVD; ALTUS W/Mo | Leader in ECD; #1/#2 in etch |
| Tokyo Electron (TEL) | Japan | Dielectric and metal etch; tracks; single-wafer clean; low-k | #2 in etch; leader in tracks |
| Ebara | Japan | F-REX CMP; ECD | #2 in CMP |
| ASM International | Netherlands | ALD barriers and liners, PECVD/low-k | Leader in ALD; niche in low-k |
| ASML | Netherlands | EUV and 193i scanners for all metal/via levels | Monopoly in EUV |
| KLA | USA | In-line inspection, e-beam voltage contrast, film metrology | Leader in process control |
| DuPont | USA | CMP pads (IC1000), slurries, ECD additives, low-k and clean chemistries | Leader in pads |
| Fujifilm / Fujimi / Entegris (CMC) | Japan / Japan / USA | CMP slurries, post-CMP cleans, conditioners | Leaders in slurry |
| Atotech (MKS) / MacDermid Alpha / Moses Lake Industries | Germany / USA / USA | Copper plating chemistry and additives | Leaders in ECD chemistry |
| Honeywell / JX Nippon Mining / Tosoh | USA / Japan / Japan | High-purity Cu, Ta, Ti, Co sputter targets | Leaders in targets |
| Merck (EMD Electronics) / Air Liquide / Adeka | Germany / France / Japan | Low-k, Co, Ru, Mo, W precursors | Leaders in precursors |
| Imec | Belgium | R&D consortium defining Ru, subtractive metal, airgap and BSPDN roadmaps | Leading research hub |
| TSMC / Intel / Samsung | Taiwan / USA / Korea | Integrators of the BEOL flows; TSMC N2/A16, Intel 18A PowerVia, Samsung SF2 | TSMC leads leading-edge volume |

## Common Misconceptions

- **"Copper interconnect is etched like everything else in the fab."** → Copper has no volatile etch products at resist-compatible temperatures; it is inlaid by damascene (etch the dielectric, plate the metal, polish it back) and has been since 1997. The only front-side metal that is still subtractively etched on a leading-edge logic wafer is the aluminum pad layer; ruthenium and molybdenum may bring subtractive metal back at the bottom of the stack.
- **"Smaller wires mean faster chips."** → Transistors speed up when scaled; wires slow down. Resistance per unit length rises as 1/(w × h) and then faster still once the width is below copper's 39 nm mean free path, while capacitance per unit length stays at ~ 0.2 fF/µm. Interconnect, not the transistor, sets the delay of most paths on a modern die, and a substantial fraction of the transistors exist only to repeat signals along wires.
- **"Low-k is the main lever for reducing RC."** → Bulk k has been stuck at ~ 2.5 to 3.0 for over a decade because more porous films are mechanically and chemically unworkable. Recent RC gains have come from thinner caps, selective metal caps, better liners, airgaps and, most of all, from fighting resistance with new conductors and backside power.
- **"Electromigration is a bulk copper property."** → In damascene copper the atoms move along the copper/cap interface, with an activation energy of ~ 0.85 eV rather than the ~ 2 eV of bulk diffusion. Cladding the copper in cobalt raises the barrier; short lines below the Blech length do not fail at all.
- **"Cobalt replaced copper at 10 nm."** → Only at Intel, only for M0/M1, and Intel went back to cobalt-clad copper at Intel 4 because cobalt's 3.7× higher bulk resistivity outweighed its thinner barrier at 36 nm pitch. Cobalt is now the liner, cap and contact plug; ruthenium and molybdenum are the metals actually replacing copper at the tightest levels.
- **"CMP is just sanding the wafer flat."** → Copper CMP is a chemical process gated by mechanical action: the slurry oxidizes and complexes copper everywhere, an inhibitor (BTA) passivates recessed areas, and the pad and abrasive only strip the passivation on the high points. That selectivity is what planarizes rather than simply thins.

## Where This Fits in the Supply Chain

This module takes the finished transistor from Module 11 (replacement metal gate complete, source/drain epitaxy exposed, wafer still 775 µm thick) and wires it: MOL contacts, M0, then ~ 15 levels of dual damascene copper with cobalt, ruthenium and molybdenum at the bottom, thick copper for power at the top, aluminum pads, and the UBM and bumps that packaging will attach to. Its inputs are the wafer itself plus a long list of consumables (low-k precursors, TaN/Cu/Co targets and precursors, plating chemistry, CMP pads, slurries and conditioners, hard mask materials, EUV and DUV photomasks for each of the ~ 30 metal and via levels) supplied by the vendors in the Key Players table, and it consumes roughly half of the fab's process steps and Applied, Lam and Ebara's largest installed base. Its output is a completed, bumped wafer that goes first to the inline metrology and inspection tools of Module 13 (where via chains, line resistance and defect inspection determine whether the BEOL yields), then to wafer sort in Module 14 where probe needles land on the aluminum pads, and finally to the dicing, flip-chip and advanced packaging flows of Modules 16 and 17, where the C4 bumps and RDL built here meet the substrate or interposer.

## Further Reading

- P. C. Andricacos, C. Uzoh, J. O. Dukovic, J. Horkans and H. Deligianni, "Damascene copper electroplating for chip interconnections," IBM Journal of Research and Development, vol. 42, no. 5, 1998. The original IBM paper on superfill.
- T. P. Moffat, D. Wheeler, W. H. Huber and D. Josell, "Superconformal electrodeposition of copper," Electrochemical and Solid-State Letters, vol. 4, no. 4, 2001, and the follow-on CEAC papers from NIST.
- J. R. Black, "Electromigration: A brief survey and some recent results," IEEE Transactions on Electron Devices, vol. 16, no. 4, 1969.
- I. A. Blech, "Electromigration in thin aluminum films on titanium nitride," Journal of Applied Physics, vol. 47, 1976.
- D. Gall, "Electron mean free path in elemental metals," Journal of Applied Physics, vol. 119, 085101, 2016. The ρ × λ table that drives the Ru/Mo/Co decisions.
- J. M. Steigerwald, S. P. Murarka and R. J. Gutmann, Chemical Mechanical Planarization of Microelectronic Materials, Wiley, 1997.
- K. Maex et al., "Low dielectric constant materials for microelectronics," Journal of Applied Physics, vol. 93, no. 11, 2003.
- Zs. Tőkei et al. (imec), "Inflection points in interconnect research and trends for 2 nm and beyond," IEDM 2020, and the subsequent imec IEDM/IITC papers on subtractive Ru, airgaps and backside power.
- W. Hafez et al. (Intel), "Intel PowerVia technology: backside power delivery for high density and high-performance computing," VLSI Symposium 2023.
- WikiChip Fuse and SemiAnalysis coverage of TSMC N3/N2 and Intel 4/18A metal stacks, for the publicly reported pitches and layer counts.
