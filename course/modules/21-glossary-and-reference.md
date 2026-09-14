# Module 21: Glossary and Reference

This module is the course's lookup volume. It does not teach a new stage of the chain; it collects, in one place, the vocabulary, units, numbers, and orderings that the other twenty modules use, so that a reader who forgets what "MOL" means in the middle of Module 17, or wants to know whether a 23 nm metal pitch is bigger or smaller than an EUV wavelength, can find the answer in under a minute. It is organized as six reference sections followed by the standard Summary, Key Numbers and Key Players tables. The Key Players table here is the master list for the whole course: roughly sixty companies, each placed at its stage in the chain.

A note on conventions used throughout the course, since several of them are non-obvious:

- **Node names** (N7, N5, N3, N2, A16, 18A) are marketing labels, not dimensions. When a physical size matters the course quotes **CPP** (contacted poly pitch), **MP** (minimum metal pitch), or **MTr/mm²** (transistor density); see the Node Table.
- **Prices** are foundry list-price estimates as of ~2025 and are quoted in US dollars per 300 mm wafer unless stated otherwise. Real contract prices are confidential and vary by customer and volume.
- **"~"** before a number means the value is approximate, disputed, or reverse-engineered from teardowns. A range means public sources disagree.
- **Module references** in parentheses point to where a term is explained in mechanism-level depth.

How to use the sections. Look up a word in the Glossary, which is alphabetical and carries a short worked example under each of its formula entries. Check whether a size is big or small in the Units and Sense of Scale section, whose scale table is a ladder from a rack to an atom. Place a node in the Node Table, which lists the physical pitches and densities behind each marketing name. Find where a step sits in the Master Process Flow, 122 numbered steps from quartz to a running data center, with the HBM branch running in parallel. Find who supplies whom in Who Buys From Whom, an adjacency list of the chain's companies. Then use What to Learn Next as the reading path out of the course, and the Summary, Key Numbers, Key Players and Common Misconceptions sections as the one-page version of the whole thing. Where two acronyms collide (CDU, LSI, substrate, passivation, track) the glossary says which meaning is in play.

## Before you start

This is a reference volume, so a reader who has skipped everything should still be able to use its tables. These facts are enough:

- A **die** is one rectangular chip region on a wafer, later separated and packaged. A wafer holds many dies; the package connects one or more dies to a circuit board.
- A chip is built on a 300 mm silicon wafer in ~1,000–1,500 steps, most of them repeats of one loop: coat with light-sensitive resist, expose a pattern, etch it into the layer beneath, strip the resist, clean (Modules 05, 07, 09).
- A transistor is a switch: current flows from the source to the drain through a channel only when the gate voltage lets it, and the gate is insulated from the channel by a dielectric a few atoms thick (Module 11).
- NMOS transistors switch with electrons, PMOS with holes (missing electrons that behave as positive mobile charge); CMOS logic pairs one of each so that ideal static logic draws little current between switching events, although real devices leak (Module 11).
- The wires are built above the transistors in 15–18 copper levels; the lowest levels are the tightest, and their spacing is the metal pitch quoted in node tables (Module 12).
- "Pitch" is the center-to-center repeat of a line array; "half-pitch" is half of it and is what resolution formulas quote (Modules 07, 11).
- σ (sigma) is the standard deviation of a measurement; ±3σ holds 99.7% of a normal distribution, so "3σ = 1 nm" means nearly everything is within 1 nm of the mean (Module 13).
- Yield is the fraction of good output; in the simple Poisson model, die yield falls exponentially with die area times effective killer-defect density (Module 13).
- The business roles: a foundry makes wafers for others, a fabless company designs chips and owns no fab, an IDM does both, an OSAT packages and tests for hire, an ODM builds servers for a brand or a hyperscaler (Modules 16, 19, 20).


**How to read the numerical examples.** Public product specifications and dated company statements are attributed where checked. Unattributed geometry, recipe, yield, throughput and price ranges are representative teaching assumptions or reported estimates, not disclosed production data. They illustrate a mechanism or a calculation; applying them to a named chip requires its process, configuration, date and measurement definition. The accompanying review identifies remaining evidence gaps.

## Glossary

Terms are alphabetized by their usual name or acronym. Start with the first sentence for the plain-language meaning, then use the mechanism and example to go deeper. Cross-references name related entries; the module number points to the fuller explanation. Keep four questions separate when comparing a device: how much it holds, how much data it transfers per second, how long one response takes, and whether it keeps working.

- **1T1C** — The DRAM cell (see DRAM): one access transistor (1T) that acts as a switch and one storage capacitor (1C) that holds the bit as charge. The capacitor holds ~10–20 fF (femtofarads, 10⁻¹⁵ F); at ~15 fF and 1 V that is a charge Q = C × V ≈ 1.5 × 10⁻¹⁴ coulombs, only about 100,000 electrons, which leak away through the access transistor in tens of milliseconds. That is why cells must be refreshed within a device-specific window (a conventional DDR example is ~64 ms), and why the capacitor is built as a tall pillar with an aspect ratio above 50:1 (see Aspect ratio): the cell footprint is tiny but the capacitor still needs enough surface area to hold those electrons. (Module 15)
- **2.5D packaging** — Placing multiple dies side by side on an interposer (see Interposer), a silicon or organic layer that carries fine wiring between them; CoWoS is the canonical example. Contrast with 3D packaging, in which dies are stacked vertically. (Module 17)
- **3D NAND** — Flash memory (see NAND flash) built as vertical strings of charge-trap cells running through a stack of 200–300+ alternating thin layers; the channel-hole etch through the whole stack is the defining high-aspect-ratio process (see HAR etch). (Modules 09, 15)
- **ABF (Ajinomoto Build-up Film)** — The epoxy-based dielectric (insulating) film laminated layer by layer to form the build-up layers of a flip-chip package substrate (see Build-up substrate). Ajinomoto, a Japanese food and amino-acid company, reports approximately 95% of high-performance substrate insulation, which creates substantial supplier concentration (the figure is not a claim about every substrate material). (Module 16)
- **Aerial image** — The pattern of light intensity that the projection lens forms in the plane of the resist, before any resist chemistry happens. It is the best the optics can do: a blurred version of the mask pattern whose edge slope sets how sharply the resist can respond. Phase-shift masks, OPC and illumination shaping all exist to improve the aerial image (see Phase-shift mask, OPC). (Module 07)
- **Airgap** — A deliberate void left between adjacent metal lines in the BEOL so that the dielectric constant (see Dielectric constant) of the space between them approaches 1, the value for vacuum, cutting the capacitance between the lines and hence the RC delay (see RC delay). (Module 12)
- **ALD (Atomic Layer Deposition)** — Film growth by alternating, self-limiting half-reactions: a precursor pulse (see Precursor), a purge, a reactant pulse, a purge. "Self-limiting" means the surface can hold only one layer of adsorbed precursor molecules, so growth stops by itself until the next reactant is pulsed, once the surface is saturated within the process window. Bulky precursor ligands occupy space and block neighboring sites, so a saturated precursor layer need not leave one complete atomic layer of film. A representative cycle deposits ~0.1 nm, so a 2 nm film takes ~20 cycles, and the film is equally thick on every surface the gas can reach, including the bottom of a deep trench (see Conformality). Used for high-k gate dielectrics, liners, and spacers. (Module 06)
- **ALE (Atomic Layer Etching)** — The etch analogue of ALD: a surface-modification step, such as letting chlorine gas (Cl₂) adsorb onto the top layer of silicon, followed by a removal step in which low-energy argon (Ar) ions knock off only the modified layer. Each cycle removes one layer, so the depth is set by counting cycles rather than by timing, and the low ion energy leaves the surface beneath undamaged. (Module 09)
- **AMC (Airborne Molecular Contamination)** — Gaseous contaminants (acids, bases, organics, dopants) in cleanroom air at ppb levels (parts per billion; see the Units table) that adsorb onto wafers and reticles; a base such as ammonia at a few ppb is enough to neutralize the acid in a chemically amplified resist. Controlled with chemical filters and FOUP purging (see FOUP). (Module 05)
- **AMHS (Automated Material Handling System)** — The overhead-hoist-transport (see OHT) rail network and stockers (automated storage racks) that move FOUPs between tools in a 300 mm fab; a GigaFab has tens of kilometers of rail and thousands of vehicles. (Module 05)
- **Anisotropy** — The degree to which an etch removes material vertically rather than laterally. Ion-driven etches are anisotropic because the ions arrive from one direction (see Plasma); purely chemical etches are isotropic, attacking every exposed surface equally and undercutting the mask. (Module 09)
- **AOI (Automated Optical Inspection)** — A camera-and-software system that compares each die, package or board against a reference image to flag chips, cracks, missing balls or misplaced parts; the standard inspection at die pick-and-place, after ball attach, and after surface-mount assembly (see SMT). (Module 16)
- **APC (Advanced Process Control)** — Run-to-run and feed-forward/feed-back control loops that adjust recipes (for example etch time or exposure dose) from metrology data on previous lots, so that a slow drift in one tool is compensated before it moves a parameter out of spec. (Module 13)
- **ARDE (Aspect-Ratio-Dependent Etching)** — The tendency for narrow, deep features to etch more slowly than wide ones, because the reactive neutrals and ions reach the bottom of a narrow hole less easily than the bottom of a wide one; also called RIE lag. Its consequence is that the deepest holes on a wafer finish last and the shallow ones over-etch while waiting. (Module 09)
- **Anneal** — Controlled heating to change a material, for example activating implanted dopants, repairing crystal damage or growing metal grains. The temperature and duration depend on the purpose. (Modules 10, 12)
- **Arrhenius acceleration** — Reliability model in which the rate of a failure mechanism scales as exp(−Ea/kT), where Ea is the activation energy of the mechanism in electron-volts (eV), k is Boltzmann's constant (8.617 × 10⁻⁵ eV/K), and T is absolute temperature in kelvin. Raising the temperature during burn-in speeds every such mechanism by the acceleration factor AF = exp[(Ea/k)(1/T_use − 1/T_stress)], where T_use is the operating temperature and T_stress is the burn-in temperature, both in kelvin. The larger Ea is, the more a temperature rise helps. (Module 18)

> **Worked example:** Take Ea = 0.7 eV, a typical value for the defects behind infant-mortality failures, T_use = 55 °C = 328 K and T_stress = 125 °C = 398 K. Then Ea/k = 0.7 / (8.617 × 10⁻⁵) ≈ 8,120 K, and 1/328 − 1/398 = 0.003049 − 0.002512 = 0.000537 K⁻¹, so the exponent is 8,120 × 0.000537 ≈ 4.36 and AF = e^4.36 ≈ 78. Under that single-mechanism model, ten hours at 125 °C corresponds to approximately 780 hours, about a month, at 55 °C. This motivates accelerated screening; it does not guarantee that every field failure mechanism or every weak part follows the same clock.

- **ASIC (Application-Specific Integrated Circuit)** — A chip designed for a particular application rather than general-purpose computing. (Module 19)
- **Aspect ratio** — Depth divided by width of a feature. DRAM capacitors exceed 50:1 (a hole 50 times deeper than it is wide, like a drinking straw 50 cm long and 1 cm across); 3D NAND channel holes exceed 60:1. High aspect ratio is what makes both etches and fills hard: etchant must get in and by-products must get out through the same narrow opening. (Modules 09, 15)
- **ATE (Automatic Test Equipment)** — The tester (Advantest V93000, Teradyne UltraFLEX) that drives and measures a device under test through a probe card (see Probe card) at wafer sort or a socket at final test. (Module 14)
- **Backgrinding** — Thinning a finished wafer from its as-delivered 775 µm to typically 50–200 µm (30 µm for HBM dies) with a diamond grinding wheel before dicing; the full thickness was only ever needed to keep the wafer rigid during the fab process. (Modules 15, 16)
- **Backside power delivery (BSPDN)** — Routing the power grid through the back of the wafer (via nano-TSVs, tiny through-silicon vias, or direct contacts to the source/drain regions) so that the front-side metal levels are used only for signals. This removes the thick power rails from the crowded lowest metal levels, letting cells shrink in height. Intel PowerVia, TSMC A16 Super Power Rail. (Modules 11, 12)
- **Bandwidth, capacity and latency** — Three different memory properties. **Capacity** is how much information fits; **bandwidth** is how much can move per second; **latency** is how long a particular request takes to produce its response. Picture a warehouse: capacity is its storage space, bandwidth is the loading rate, and latency is the wait for your requested box. More loading bays can raise total throughput without making that particular box arrive sooner. The analogy leaves out the electrical details, but explains why HBM's high bandwidth does not make every access instantaneous. (Modules 15, 19)
- **Barrier layer** — A thin (1–2 nm) film of tantalum nitride (TaN) or a similar refractory compound lining a copper trench to stop copper atoms diffusing into the dielectric, where they would short the circuit and poison transistors. Because the barrier conducts poorly, it takes up a growing share of a shrinking wire's cross-section, which is one reason narrow copper lines have such high effective resistivity (see RC delay). (Module 12)
- **Bathtub curve** — Failure rate versus time: high early ("infant mortality", from latent defects), low and flat in mid-life (random failures), rising at wear-out. Burn-in exists to move past the first region before shipment (see Burn-in, Arrhenius acceleration). (Module 18)
- **BEOL (Back End of Line)** — All process steps after the first contact level: the 15–18 copper/low-k interconnect levels (see Damascene, Low-k dielectric), the pads, and the passivation. Contrast FEOL (the transistors) and MOL (the contacts between the two). (Module 12)
- **BGA (Ball Grid Array)** — Package type whose bottom carries an array of solder balls (0.4–1.0 mm pitch, see Pitch / half-pitch) for attachment to a printed circuit board. LGA (Land Grid Array) omits the balls and relies on spring contacts in a socket. (Module 16)
- **Binning** — Sorting tested dies into speed, power, and functionality grades that are sold as different products; a die with one defective compute block becomes a lower SKU rather than scrap (see E-fuse). (Module 14)
- **BIST (Built-In Self-Test)** — On-chip circuitry (memory BIST, logic BIST) that generates test patterns and checks responses itself, so that the external tester does not have to supply every vector (one vector = one set of input values applied per clock cycle). (Module 14)
- **Black's equation** — Electromigration lifetime model: MTTF = A · J^(−n) · exp(Ea/kT), where MTTF is the median time to failure in hours, A is a constant fitted to the metal and process, J is the current density in amperes per cm², n is an exponent of ~1–2, Ea is the activation energy (~0.8–1.0 eV for copper), k is Boltzmann's constant (8.617 × 10⁻⁵ eV/K) and T is temperature in kelvin. Because n is 1–2, doubling the current through a wire cuts its lifetime by 2–4×, and because of the exponential term a modest temperature rise shortens it sharply. Designers use it to set the maximum current every wire is allowed to carry (see Electromigration). (Module 12)
- **BOE (Buffered Oxide Etch)** — Hydrofluoric acid (HF) buffered with ammonium fluoride (NH₄F), which holds the acid concentration steady as the etch consumes it and so gives a stable, controllable etch rate on silicon dioxide (SiO₂), ~100 nm/min for 6:1 BOE (six parts NH₄F to one part HF), while barely touching silicon. Unbuffered HF etches faster but its rate drifts as it is used up. (Module 09)
- **Bosch process** — Deep silicon etch that alternates short pulses of sulfur hexafluoride (SF₆), the etchant, with pulses of octafluorocyclobutane (C₄F₈), which deposits a thin Teflon-like polymer on every surface. The next etch pulse's ions clear the polymer from the trench bottom but not from the sidewalls, so the etch goes down and not sideways. Here "passivation" means this temporary sidewall polymer, not the chip's final protective layer (see Passivation). The alternation leaves characteristic scallops on the walls. Used for TSVs and MEMS. (Modules 09, 17)
- **Bright-field inspection** — Optical defect inspection using reflected light with a broadband or DUV source, comparing each die image with its neighbours to find differences; the workhorse patterned-wafer inspector (KLA 29xx/39xx series). (Module 13)
- **Build-up substrate** — Flip-chip package substrate made of a glass-epoxy core with several ABF build-up layers on each side (see ABF), each patterned by a semi-additive process (see mSAP); the board that fans the die's ~100 µm-pitch bumps out to the package's ~1 mm-pitch balls. (Module 16)
- **Burn-in** — Operating packaged parts at elevated temperature and voltage (for example 125 °C and 1.1–1.3× Vdd, where Vdd is the chip's supply voltage, ~0.7–1.0 V at leading nodes) for hours to precipitate infant-mortality failures before shipment. The temperature accelerates chemical failure mechanisms (see Arrhenius acceleration) and the over-voltage stresses thin dielectrics. (Module 18)
- **C4 bump (Controlled Collapse Chip Connection)** — Solder bumps (~100 µm pitch; historically lead-tin, now tin-silver) that connect a flip-chip die to a substrate. "Controlled collapse" refers to the way surface tension pulls each molten bump into a uniform shape and self-aligns the die during reflow. (Module 16)
- **CAR (Chemically Amplified Resist)** — Photoresist in which a photon does not change the polymer directly but creates one molecule of acid (from a photoacid generator, see PAG). During the post-exposure bake (see PEB) that acid removes a chemical "protecting group" from a polymer site, making the site soluble in developer, and is regenerated in the process, so a single acid molecule can deprotect hundreds of sites. That catalytic chain is the amplification: it lets the resist respond to a small number of photons, which is why CARs are the standard for KrF, ArF, and most EUV layers, and also why acid diffusion during the bake blurs the image. (Modules 07, 08)
- **Carrier / mobility** — A carrier is whatever carries current in a semiconductor: an electron (negative) or a hole (a missing electron in the bonding structure, which behaves like a positive charge). Mobility (µ, in cm²/(V·s)) is how fast a carrier drifts per unit of electric field; electrons in silicon are roughly 2–3× more mobile than holes, which is why a PMOS transistor must be wider than an NMOS transistor to carry the same current (see CMOS / NMOS / PMOS, Strain engineering). (Module 11)
- **CCP (Capacitively Coupled Plasma)** — Plasma etch reactor (see Plasma, RF) in which the wafer sits on one of two parallel plate electrodes and the RF power is applied across them like a capacitor. The same electrodes that make the plasma also accelerate the ions, so ion energy is high and tied to plasma density; that suits dielectric etches, where strong ion bombardment is needed to break silicon-oxygen bonds. (Module 09)
- **CD (Critical Dimension)** — The width of the smallest patterned feature on a layer (a gate, a line, a hole), measured by CD-SEM or scatterometry; the number that litho and etch are judged on. (Modules 07, 13)
- **CD-SEM** — A scanning electron microscope (SEM) optimized for low-voltage, non-destructive line-width measurement to ~0.1 nm precision, about half a silicon atom; the low voltage keeps the electron beam from charging or damaging the resist. (Module 13)
- **CDU (Critical Dimension Uniformity)** — The 3σ spread of CD across a field, wafer, or lot (see Sigma), i.e. the width of the band that contains 99.7% of the measured widths. Leading nodes require < 1 nm on gate layers, because a 1 nm gate-length change moves the threshold voltage by tens of millivolts. Not to be confused with the coolant distribution unit, the other CDU (see next entry). (Module 07)
- **CDU (coolant distribution unit)** — In the data center, the pump-and-heat-exchanger cabinet that circulates liquid coolant between the facility's chilled-water loop and the cold plates on the GPUs and switches in a rack. In the fab, CDU means critical dimension uniformity (see previous entry); the course says which is meant wherever the two could collide. (Module 19)
- **CFET (Complementary FET)** — Future device in which the NMOS nanosheet stack is placed directly above the PMOS stack (see CMOS / NMOS / PMOS, Nanosheet), so one footprint holds both transistor types and cell area roughly halves; targeted for ~2030 nodes. (Module 11)
- **Channeling** — Implanted ions travelling unusually far along open crystal directions, the "corridors" between rows of atoms in the lattice (see Lattice / superlattice), giving a deeper, less predictable dopant profile; suppressed by tilting the wafer ~7° or implanting through a thin screen oxide that randomizes the ion directions. (Module 10)
- **Chiplet** — A die designed to be one of several in a package, connected by a die-to-die interface (see UCIe; NVIDIA's NV-HBI, AMD's Infinity Fabric). Splitting a design into chiplets lets each piece stay below the reticle limit and be yielded separately (see Yield). (Modules 17, 19)
- **Cleanroom class** — Particle-count standard from ISO 14644-1; ISO Class 1 allows ≤10 particles of ≥0.1 µm diameter per cubic metre of air, where ordinary room air holds millions. Modern fabs run ISO 3–5 in the ballroom (the open cleanroom floor where the tools stand) and effectively ISO 1 inside FOUPs and tool mini-environments, because it is cheaper to keep a small box clean than a whole building. (Module 05)
- **CMOS / NMOS / PMOS** — The two transistor types and the way logic uses them. An **NMOS** transistor (see MOSFET) has an n-type source and drain in a p-type well; it conducts with electrons and turns on when the gate is pulled positive. A **PMOS** transistor has p-type source and drain in an n-type well; it conducts with holes and turns on when the gate is pulled negative relative to its source. **CMOS** (complementary metal-oxide-semiconductor) logic pairs one of each so that in either stable state one of the two is off and no current flows from supply to ground; current flows only during the switching instant, which is why chips with billions of transistors do not melt. Every node table and process flow in this course is a CMOS flow. (Module 11)
- **CMP (Chemical Mechanical Planarization/Polishing)** — Flattening a wafer by pressing it against a rotating polyurethane pad flooded with abrasive slurry (see Slurry); the chemistry softens the surface and the abrasive carries it away, and high spots polish faster than low ones so the surface levels. Used after STI fill, ILD deposition, and every copper level, because lithography can only focus on a flat surface and the next layer must be built on one. (Modules 03, 12)
- **COAG (Contact Over Active Gate)** — DTCO technique (see DTCO) placing the gate contact directly above the active channel instead of on a gate extension outside the cell, saving cell height; it needs a self-aligned contact scheme (see SAC) so that the contact does not short to the source/drain. (Module 11)
- **Conformality (step coverage)** — How evenly a deposited film covers a stepped surface: a perfectly conformal film is as thick on the sidewalls and bottom of a trench as on the top. ALD is conformal because it grows one saturated layer at a time (see ALD); PVD is not, because atoms arrive in straight lines from the target and the trench walls shadow each other (see PVD). Poor conformality leaves thin spots in barriers and pinch-off voids in fills. (Module 06)
- **COP (Crystal-Originated Particle)** — Octahedral voids ~100 nm across that form when vacancies (missing atoms, see Vacancy, interstitial, dislocation) cluster together during CZ growth. Where a void meets the polished surface it scatters light like a particle in inspection, and a gate oxide grown over one is thin and leaky. Controlled through the pull conditions (see Voronkov v/G criterion). (Module 02)
- **CoW (Chip on Wafer)** — First half of CoWoS: dies are bonded to the interposer while the interposer is still a full 300 mm wafer, so that placement and bonding can use wafer-scale tools and alignment. (Module 17)
- **CoWoS (Chip on Wafer on Substrate)** — TSMC's 2.5D packaging family (see 2.5D packaging). **-S**: silicon interposer with TSVs. **-R**: organic RDL interposer (see RDL). **-L**: organic interposer with embedded local silicon interconnect (see LSI) bridges; used by Blackwell. (Module 17)
- **CPP (Contacted Poly Pitch)** — Center-to-center distance between adjacent gates (see Pitch / half-pitch), ~45–48 nm at N3/N2; also called contacted gate pitch. "Poly" is historical: gates were polysilicon until the 45 nm generation and have been metal since (see HKMG), but the name stayed. It is the width of one transistor slot and therefore sets standard-cell width, and it has stopped shrinking because it must contain a gate length, two spacers, and a contact (see the Node Table). (Module 11)
- **Cpk** — Process capability index: (nearer specification limit − process mean) / 3σ, where σ is the standard deviation of the measured parameter (see Sigma). It says how many 3σ "widths" fit between where the process sits and where it fails. Cpk ≥ 1.33 is a common minimum; 1.67 is demanded for critical parameters. (Module 13)

> **Worked example:** Cpk = 1.33 means the nearer spec limit is 1.33 × 3σ = 4σ from the mean. For a normal distribution the fraction beyond 4σ on one side is about 3.2 × 10⁻⁵, so ~32 parts per million fall outside the spec. Cpk = 1.67 puts the limit 5σ away, and the tail beyond 5σ is about 3 × 10⁻⁷, ~0.3 ppm. A chip has thousands of parameters that must all be in spec at once, so a few tens of ppm each would add up to visible yield loss; that is why critical parameters are held to 1.67.

- **Crystal orientation and Miller indices** — Silicon atoms sit on a regular cubic lattice (see Lattice / superlattice), and the notation <100>, <110>, (100) names directions and planes in that cube. Angle brackets, <100>, mean a direction (here along a cube edge; <110> is along a face diagonal); round brackets, (100), mean a plane (here a cube face). 300 mm wafers are cut so that the polished surface is a (100) plane, because the silicon-to-oxide interface is cleanest on that plane, and the notch is placed on the <110> direction so that every tool aligns the lattice the same way (see Notch). Atom spacing, etch rates and mobility all differ by direction, which is why orientation is specified at all. (Modules 02, 03)
- **CTE (Coefficient of Thermal Expansion)** — How much a material expands per degree of temperature rise, in parts per million per °C (ppm/°C). Silicon is ~2.6 ppm/°C; an organic package substrate is ~15–17 ppm/°C. Over a 60 °C swing a 50 mm package edge therefore moves ~(16 − 2.6) × 10⁻⁶ × 60 × 50 mm ≈ 40 µm relative to the silicon die on top of it, a full microbump pitch. Bumps, underfill, lids and the interposer all exist partly to absorb that mismatch (see Underfill, Warpage). (Modules 16, 17)
- **Cu pillar** — Copper post with a solder cap replacing a solder bump for fine-pitch flip-chip (down to ~40 µm pitch); a pillar keeps its shape during reflow, whereas a solder bump would spread and bridge to its neighbour at that pitch. (Module 16)
- **Cut mask** — Litho layer that severs the long parallel lines produced by SADP/SAQP (see SADP / SAQP) into the desired segments; spacer patterning can only make continuous lines, so every gap has to be cut afterwards. (Module 07)
- **CVD (Chemical Vapor Deposition)** — Film growth from gas-phase precursors (see Precursor) that react on a heated surface and leave a solid behind, for example silane (SiH₄) decomposing to silicon. Variants: LPCVD (low pressure, in a furnace), PECVD (plasma-enhanced, ~400 °C, see PECVD), SACVD (sub-atmospheric, for gap fill), MOCVD (metal-organic precursors, for compound semiconductors). (Module 06)
- **Cycle time** — Elapsed time from wafer start to wafer out; ~3–4 months for a leading-edge logic wafer with 1,000–1,500 steps, most of it spent waiting in queues rather than being processed (see Re-entrant flow, Little's law). (Module 05)
- **CZ (Czochralski) growth** — Pulling a single crystal from a silicon melt held in a quartz (silicon dioxide, SiO₂) crucible, using a seed crystal that the melt copies atom by atom as it freezes onto it; produces essentially all 300 mm wafers. The 1,420 °C melt slowly dissolves its own crucible, which is why CZ silicon contains ~10¹⁸ oxygen atoms per cm³ (see Oxygen precipitates). **MCZ** adds a magnetic field to suppress convection in the melt and so evens out oxygen and dopant. (Module 02)
- **D0** — Defect density in killer defects per cm² (a killer defect is one large enough to break the circuit it lands on, see the scale table), the parameter of every yield model; ~0.05–0.1 /cm² for a mature leading node, meaning one killer defect per 10–20 cm² of wafer, and ~0.5+ /cm² early in a ramp. (Module 13)
- **Damascene** — Forming metal lines by etching trenches into the dielectric, filling them with metal, and polishing back the excess, rather than depositing a metal sheet and etching lines out of it. It exists because copper forms no volatile compounds at etch temperatures, so it cannot be plasma-etched the way aluminum was; the copper has to be inlaid. The name comes from the Damascus craft of inlaying one metal into a base of another. **Dual damascene** etches the via hole and the trench above it and fills both in one plating step. (Module 12)
- **Dash neck** — The ~3 mm diameter neck pulled rapidly at the start of CZ growth. Dislocations (see Vacancy, interstitial, dislocation) inherited from the thermal shock of dipping the seed run to the surface and disappear in such a thin, fast-grown neck, so the crystal below it can grow dislocation-free; the neck then has to carry the full ~300 kg ingot. (Module 02)
- **Deal-Grove model** — Thermal oxidation kinetics: x² + A·x = B·(t + τ), where x is oxide thickness (nm or µm), t is oxidation time, B is the parabolic rate constant (µm²/h), B/A is the linear rate constant (µm/h), and τ is a time offset accounting for any oxide present at the start. Thin oxide grows linearly with time because the reaction at the silicon surface is the bottleneck; thick oxide grows as √t because oxygen must first diffuse through the oxide already there, so doubling the thickness takes four times as long. (Module 06)
- **Defect classification** — Assigning inspection-found defects to categories (particle, scratch, bridge, void, residue) by SEM review, often with machine learning, so that each category can be traced to the tool that causes it. (Module 13)
- **DFT (Design for Test)** — Design structures added solely to make a chip testable: scan chains (see Scan chain), BIST (see BIST), boundary scan (a ring of test cells around the chip's pins), and test compression (encoding test patterns so the tester needs fewer pins and less time). (Module 14)
- **DIBL (Drain-Induced Barrier Lowering)** — Short-channel effect in which the drain voltage reaches through the short channel and pulls down the energy hill that electrons must climb to leave the source, so the transistor turns on at a lower gate voltage than intended. Quoted in mV/V: a DIBL of ~30–50 mV/V, the acceptable range, means the threshold voltage falls ~30–50 mV for every extra volt on the drain. Wrapping the gate around the channel (see FinFET, GAA) shields the channel from the drain and is the main cure. (Module 11)
- **Dicing** — Separating dies from a wafer. **Blade**: diamond-resin saw. **Laser stealth**: a laser focused below the surface creates a line of sub-surface damage, and stretching the tape underneath snaps the wafer along it. **Plasma**: Bosch etch through the streets (the blank lanes between dies). (Module 16)
- **Die attach** — Bonding a die to a substrate, leadframe, or another die with adhesive, solder, or direct bonding; the joint must conduct heat and survive the CTE mismatch (see CTE) between die and base. (Module 16)
- **Die** — One individual chip region on a wafer; singulation separates it from neighboring dies before packaging. (Modules 03, 16)
- **Dielectric constant (k)** — The factor by which an insulator raises the capacitance of a parallel-plate capacitor compared with vacuum: C ∝ k × area / thickness. Vacuum is 1, air ~1, silicon dioxide 3.9, hafnium oxide ~20–25. Chips want both extremes. In the gate you want as much capacitance per unit thickness as possible so that the gate controls the channel strongly, so a high-k film lets you use a physically thicker, less leaky layer for the same control (see HKMG, EOT). Between wires you want as little capacitance as possible so that signals charge faster and burn less power, so the BEOL uses low-k dielectrics and airgaps (see Low-k dielectric, Airgap). (Modules 11, 12)
- **Diffusion (dopant)** — Thermally driven movement of dopant atoms through the silicon lattice; the hotter and longer a step, the further they spread. It is the reason every anneal has a thermal budget (see Thermal budget): the dopant profiles that define a transistor would smear out if the wafer spent too long hot. (Module 10)
- **Dopant / n-type / p-type** — A dopant is a deliberately added impurity atom that gives silicon mobile charge carriers. Phosphorus or arsenic (one more valence electron than silicon) each contribute a spare electron, making the silicon **n-type**; boron (one fewer) leaves a missing bond, a hole, making it **p-type**. About one dopant atom per 10⁴–10⁷ silicon atoms is enough to set the conductivity, which is why unwanted impurities have to be held at the parts-per-billion level (see the Units table). (Module 10)
- **DPPM (Defective Parts Per Million)** — Field-failure rate of shipped parts; automotive targets < 1 DPPM (fewer than one bad part in a million shipped), data-center GPUs are in the tens. (Module 18)
- **DRAM (Dynamic Random-Access Memory)** — Volatile memory built from 1T1C cells (see 1T1C), "dynamic" because the stored charge leaks and must be refreshed. Nodes are labelled 1α, 1β, 1γ, corresponding roughly to 14, 12–13, and 11 nm half-pitch class (see Pitch / half-pitch), i.e. half of the tightest line-and-space repeat in the cell array. (Module 15)
- **DRC/LVS (Design Rule Check / Layout Versus Schematic)** — Physical verification signoff steps. DRC checks the drawn geometry against the foundry's rules (minimum widths, spacings, enclosures); LVS extracts the netlist (see Netlist / RTL), the list of transistors and their connections, from the drawn layout and checks that it matches the intended circuit. (Module 19)
- **DSP (Double-Side Polish)** — Simultaneous polishing of both wafer faces between two pads, the step that establishes global flatness, because polishing one side at a time would follow whatever shape the other side had. (Module 03)
- **DTCO (Design-Technology Co-Optimization)** — Co-designing standard-cell layouts and process rules (see SDB, COAG, Track) to gain density that pure pitch scaling no longer delivers; the reason node-to-node density gains continue even though CPP is flat. (Module 11)
- **DUV (Deep Ultraviolet)** — Lithography with KrF (248 nm) or ArF (193 nm) excimer lasers (see Excimer laser). ArF immersion (ArFi, see Immersion lithography) at NA 1.35 still patterns ~75–85% of a leading-node mask set; EUV takes only the tightest layers. Single-exposure ArFi resolves ~36 nm half-pitch in theory (~76–80 nm pitch in practice), which is why tighter DUV layers need multi-patterning. (Module 07)

- **ECD (Electrochemical Deposition)** — Copper electroplating from a bath of copper sulfate (CuSO₄) in sulfuric acid (H₂SO₄) with organic additives (see Superfill), the wafer being the negative electrode so that copper ions plate onto its seed layer; the fill step of damascene. Also called ECP. (Module 12)
- **EDA (Electronic Design Automation)** — Software for chip design: synthesis (turning RTL into gates), place and route, timing analysis, verification, DRC/LVS. Synopsys and Cadence hold ~70% of the market; Siemens EDA is #3. (Module 19)
- **E-fuse** — One-time-programmable on-chip fuse blown at test to store the die ID, trim values (small corrections to analog circuits), or to disable defective blocks such as a failed GPU compute unit (see SM), so that the die can still be sold as a lower bin (see Binning). (Module 14)
- **Electromigration (EM)** — Momentum transfer from the flowing electrons to the metal atoms at current densities above ~10⁶ A/cm², which slowly pushes atoms downstream, leaving voids (open circuits) upstream and hillocks (short circuits) downstream. 10⁶ A/cm² sounds enormous but is only ~3 µA in a 12 × 24 nm wire; it is nonetheless ~1,000× the current density in a household power cable, which is why copper atoms in a chip get moved and the ones in your wall do not. Lifetime is modelled by Black's equation. (Module 12)
- **Ellipsometry** — Measuring film thickness and refractive index from the change in polarization of light reflected from the film; resolves sub-angstrom thickness changes, well below one atomic layer, which is how a 0.5 nm interfacial oxide can be controlled at all. (Module 13)
- **EMC (Epoxy Mold Compound)** — Silica-filled epoxy that encapsulates dies in a package; molded at ~175 °C. The silica filler is there to pull the compound's CTE (see CTE) down toward that of the silicon and substrate. (Module 16)
- **EMIB (Embedded Multi-die Interconnect Bridge)** — Intel's approach embedding a small silicon bridge in the substrate to connect adjacent dies at fine pitch, so that only the strip between two dies pays for silicon wiring rather than a full interposer. (Module 17)
- **Endpoint detection** — Determining when an etch has cleared a layer, by optical emission spectroscopy (the plasma glows at different wavelengths once the underlying material is exposed), interferometry, or a change in the plasma's RF impedance; timing alone is not accurate enough because incoming films vary in thickness. (Module 09)
- **ENEPIG (Electroless Nickel / Electroless Palladium / Immersion Gold)** — A three-layer pad finish plated without electric current onto substrate copper pads: nickel as a diffusion barrier, palladium to stop the nickel corroding, and a thin gold flash that keeps the surface solderable and oxidation-free; the standard finish for flip-chip and wire-bond substrates. (Module 16)
- **EOT (Equivalent Oxide Thickness)** — The thickness of silicon dioxide that would give the same gate capacitance as the actual high-k stack: EOT = t × (3.9 / k), where t is the physical thickness of the high-k film and k its dielectric constant (see Dielectric constant); ~0.8–1.0 nm at leading nodes with a physical hafnium oxide (HfO₂) thickness of ~1.5–2 nm. The point is that a 1.8 nm film that behaves like 0.8 nm of oxide leaks far less than a real 0.8 nm oxide would, because tunnelling current falls exponentially with physical thickness. (Module 11)

> **Worked example:** Take 1.8 nm of HfO₂ with k ≈ 22. Its oxide-equivalent thickness is 1.8 × 3.9/22 ≈ 0.32 nm. The gate stack also contains a ~0.5 nm interfacial layer of real silicon dioxide between the silicon and the HfO₂, which counts at full thickness. Total EOT ≈ 0.32 + 0.5 ≈ 0.8 nm, the quoted figure. Notice that the interfacial oxide, not the high-k film, is now most of the EOT, which is why so much process effort goes into scavenging it thinner.

- **Epitaxy (epi)** — Growth of a crystalline film that continues the lattice of the crystal beneath it (see Lattice / superlattice), atom row by atom row, so that the film is single-crystal rather than polycrystalline; done by CVD, with temperature and gas mix controlling composition. Used for epi wafers (a clean, lightly doped layer over the bulk), silicon-germanium source/drain regions, and the silicon/silicon-germanium superlattice from which nanosheets are made. Here "substrate" means the crystal being grown on (see Substrate). (Modules 03, 06)
- **EUV (Extreme Ultraviolet)** — Lithography at 13.5 nm wavelength using a laser-produced tin plasma source (see LPP) and all-reflective optics in vacuum. Mirrors rather than lenses because every material absorbs 13.5 nm light, including air, which is also why the whole optical path is in vacuum. Each mirror is a stack of alternating molybdenum and silicon layers (a Mo/Si multilayer) tuned to reflect 13.5 nm, but it reflects only ~70% of it, so the ten or so mirrors between source and wafer pass roughly 0.7¹⁰ ≈ 3% of the source light; that is why the source must be so powerful while the photon energy, not mirror loss, sets the number of photons per unit dose delivered to the wafer (see Stochastics). NA 0.33 (NXE:3600D, 3800E) and NA 0.55 High-NA (EXE:5000, 5200). (Module 08)
- **Excimer laser** — A pulsed gas laser whose light comes from a short-lived molecule (krypton fluoride, KrF, or argon fluoride, ArF) that exists only in its electrically excited state and falls apart as soon as it emits its photon; that is what makes the emission wavelength (248 nm or 193 nm) so well defined. All DUV scanners use one (Cymer/ASML, Gigaphoton). (Module 07)
- **Excursion** — An out-of-control event in a process detected by SPC (see SPC); triggers a hold on the affected lots until the cause is found. (Module 13)
- **Fab** — A wafer fabrication plant. A leading-edge 300 mm fab costs $20–30 billion and runs ~100,000 wafer starts per month at full build-out (see wspm). (Module 05)
- **Fabless** — A company that designs and sells chips but owns no fab, buying wafers from a foundry and packaging from an OSAT (NVIDIA, AMD, Apple, Qualcomm, Broadcom). Contrast IDM and Foundry. (Module 20)
- **Fan-out (packaging)** — A package in which the die's connections are spread ("fanned out") over an area larger than the die by building thin-film wiring (see RDL) over the die and the mold compound around it, rather than through a laminate substrate; TSMC's InFO is the best-known example (see InFO). (Module 17)
- **FBR (Fluidized Bed Reactor)** — Alternative to the Siemens process (see Siemens process): silane gas decomposes onto small silicon seed granules kept suspended in an upward gas stream, producing granular polysilicon at lower energy per kilogram. (Module 01)
- **FDC (Fault Detection and Classification)** — Real-time monitoring of tool sensor traces (RF power, pressure, gas flow) against learned signatures to catch tool faults before they produce bad wafers; the tool-side complement to SPC on the wafer side. (Module 13)
- **FEOL (Front End of Line)** — The process steps that build the transistors (see MOSFET): shallow trench isolation (see STI), wells (see Well), fins or nanosheets, the gate stack, spacers (see Spacer), source/drain epitaxy (see Source / drain / gate / channel), and the replacement metal gate (see RMG). It carries the hottest steps and the tightest dimensions in the flow. (Module 11)
- **FinFET** — Transistor whose channel is a vertical silicon fin (~6 nm wide, ~50 nm tall) wrapped on three sides by the gate, so the gate controls the channel far better than a planar gate sitting on top of it (see DIBL). Intel 22 nm (2012) to TSMC N3. (Module 11)
- **FinFlex / NanoFlex** — TSMC's names for letting designers mix, within one chip, standard cells built with different numbers of fins (FinFlex, N3) or different nanosheet widths (NanoFlex, N2): more fins or wider sheets for speed, fewer or narrower for density and power. (Module 11)
- **Fin pitch** — Center-to-center spacing of fins (see Pitch / half-pitch), 26–34 nm at 7 nm to 3 nm class nodes, patterned by SAQP or EUV; nanosheet nodes have no fins, and the node table shows "sheet" instead. (Module 11)
- **Flip-chip** — Die mounted face-down on the substrate with bumps (see C4 bump, Cu pillar) covering its whole area, rather than face-up with wire bonds around its edge, giving thousands of connections instead of hundreds. (Module 16)
- **Foundry** — A business that manufactures wafers to other companies' designs; a pure-play foundry focuses on this service, while an IDM may operate a foundry division (TSMC, Samsung Foundry, Intel Foundry, SMIC, GlobalFoundries, UMC, Rapidus). Contrast Fabless and IDM. (Module 20)
- **FOUP (Front-Opening Unified Pod)** — Sealed 25-wafer carrier for 300 mm wafers, docked to tools through a load port; the wafers' clean mini-environment, purged with nitrogen to keep molecular contamination off them (see AMC). (Module 05)
- **Foveros** — Intel's family of vertical die-stacking technologies: an upper die communicates through short connections to a base die beneath it. Conventional Foveros uses microbumps; Foveros Direct uses direct dielectric/copper hybrid bonds. Unlike EMIB's side-by-side bridge, this places active silicon above active silicon, making heat removal and access to buried dies central constraints. (Module 17)
- **FZ (Float Zone) growth** — Crucible-free crystal growth by passing an RF-heated molten zone along a polysilicon rod (see RF); because the melt touches nothing, the crystal has ultra-low oxygen and very high resistivity, but the molten zone cannot be held stable at diameters much above ~200 mm. (Module 02)
- **GAA (Gate-All-Around)** — Transistor whose gate fully surrounds the channel on all four sides, the end point of the progression from planar (one side) to FinFET (three sides); the nanosheet (ribbon) implementation is used at TSMC N2, Samsung SF3/SF2, Intel 18A (see Nanosheet, MBCFET / RibbonFET). (Module 11)
- **Gate length (Lg)** — Physical length of the gate along the channel, i.e. the distance a carrier travels under gate control from source to drain, ~12–16 nm at 2 nm class nodes; not the node name. (Module 11)
- **GDSII / OASIS** — File formats for chip layout delivered at tape-out (see Tape-out). OASIS is the compressed successor to GDSII. (Module 19)
- **Gettering** — Trapping metallic contaminants away from the device region, using oxygen precipitates in the bulk (intrinsic gettering, see Oxygen precipitates) or deliberate backside damage (extrinsic); metals such as iron and copper diffuse fast in silicon and would otherwise collect at the transistors and cause leakage. (Modules 02, 03)
- **GigaFab** — TSMC's term for a 300 mm fab site with ≥100,000 wafer starts per month across several phases. (Module 05)
- **Hard mask** — A durable film (silicon nitride, titanium nitride, amorphous carbon, spin-on carbon) that receives the resist pattern and then masks a long etch the resist could not survive; needed because modern resists are only tens of nanometres thick and etch away faster than the layers under them. (Module 09)
- **HAR (High-Aspect-Ratio) etch** — Etching features with aspect ratio > ~20:1 (see Aspect ratio); the channel-hole etch in 3D NAND and the capacitor etch in DRAM, where getting ions and etchant to the bottom of a hole 60 times deeper than it is wide is the whole difficulty. (Module 09)
- **HBM (High Bandwidth Memory)** — DRAM dies (8, 12, 16 high) stacked with through-silicon vias (see TSV) on a base logic die, the die at the bottom of the stack that manages the DRAM above it and talks to the GPU; delivers ~1–2 TB/s per stack. The dies are stacked because a bus 1,024 or more bits wide can only be wired over ~40 µm microbumps sitting a few millimetres from the GPU; it could never be routed through package pins and a circuit board. HBM3E and HBM4 are current. (Module 15)
- **HDI (High-Density Interconnect) PCB** — A printed circuit board built with laser-drilled microvias and finer lines than a conventional board, in 20+ layers for an SXM module; the board class that GPU modules and baseboards use. (Module 19)
- **HGX** — NVIDIA's baseboard carrying 8 SXM GPUs and the NVLink Switch chips, sold to system builders (see ODM / OEM) who put it in a server. (Module 19)
- **High-NA EUV** — 0.55 NA EUV (ASML EXE:5000/5200), ~8 nm resolution. The optics are anamorphic: they demagnify 4× in one direction and 8× in the other, so that the 6-inch mask can be kept while the larger mirrors capture the wider cone of light; the larger reduction in the scan direction limits the angular spread at the reflective mask, where multilayer reflectivity and absorber shadowing constrain illumination; the price is a half-size exposure field (26 × 16.5 mm), so large dies need two stitched exposures. (Module 08)
- **HKMG (High-k Metal Gate)** — Gate stack using hafnium oxide (HfO₂, k ≈ 20–25) instead of silicon dioxide (k = 3.9) as the insulator, and a metal instead of polysilicon as the electrode; introduced at Intel 45 nm (2007). High-k because a physically thicker film can give the same gate capacitance as a leakier thin oxide (see Dielectric constant, EOT); metal because polysilicon in contact with HfO₂ formed a depleted layer that wasted part of the capacitance, and because the metal's work function (see Work function) sets the threshold voltage. (Module 11)
- **HPQ (High-Purity Quartz)** — Quartz with < ~50 ppm total impurities (fewer than 50 foreign atoms per million) used for CZ crucibles; Spruce Pine, North Carolina is the dominant source. (Module 01)
- **HVM (High-Volume Manufacturing)** — The point at which a node runs at production yields and volumes rather than in risk production (the early, low-volume runs a foundry makes before yields are proven, with customers sharing the risk). (Module 20)
- **Hybrid bonding** — Direct copper-to-copper plus oxide-to-oxide bonding of two dies or wafers, pressed together at room temperature and then annealed so that the copper pads grow into each other, with no solder; sub-10 µm pitch. Used in SoIC, Foveros Direct, and (from HBM4E-class parts) HBM. (Module 17)
- **Hyperscaler** — A company that operates data centers on a scale of hundreds of thousands of servers and buys GPUs by the rack (Microsoft, Google, Amazon, Meta, Oracle); the end customers of the chain in this course. (Modules 19, 20)
- **ICP (Inductively Coupled Plasma)** — Plasma reactor (see Plasma, RF) in which a coil antenna outside the chamber drives the plasma through a dielectric window, generating a dense plasma, while a separate bias RF on the wafer chuck sets the ion energy independently; used for silicon and metal etch, where a dense plasma but gentle ions give a fast, selective etch. (Module 09)
- **IDM (Integrated Device Manufacturer)** — A company that designs and fabricates its own chips (Intel, Samsung, Micron, SK hynix). Contrast Fabless and Foundry. (Module 20)
- **ILD (Interlayer Dielectric)** — Insulator between metal levels; low-k carbon-doped silicon oxide (SiOCH) with k ≈ 2.5–3.0 in the lower levels (see Low-k dielectric). **PMD** (pre-metal dielectric) is the layer under M1, usually a denser undoped oxide because it must survive the contact etch. (Module 12)
- **Immersion lithography** — ArF exposure with a ~1 mm film of ultrapure water between the final lens element and the wafer. Water's refractive index of 1.44 (versus 1.0 for air) lets the lens accept steeper rays without their being reflected at the last surface, raising NA from 0.93 to 1.35 (see NA) and resolution by the same factor. (Module 07)
- **Implant (ion implantation)** — Introducing dopants by ionizing them, accelerating the ions to keV–MeV energies, and firing them into the wafer, where they stop at a depth set by the energy; dose in atoms/cm² sets how many, energy in keV sets how deep (see the Units table). A subsequent anneal repairs the crystal damage and moves the dopants onto lattice sites (see RTA). (Module 10)
- **InFO (Integrated Fan-Out)** — TSMC's fan-out package family (see Fan-out). Dies are embedded in mold compound and copper redistribution layers spread their connections over the surrounding area. Reconstructed die placement and mold shrink must be measured so that each RDL via lands on its pad. Unlike a full silicon interposer, the routing extends over a molded composite; variants serve different package arrangements. (Module 17)
- **Ingot** — The as-grown single crystal, ~300 mm diameter, ~2 m long, ~300 kg. (Module 02)
- **IP (Intellectual Property, circuit IP)** — A reusable licensed circuit design, such as a processor core or memory interface; it must be integrated and verified in the target process. (Module 19)
- **Interposer** — A passive silicon or organic layer with fine wiring that sits between chiplets and the package substrate, carrying the wiring that is too fine for the substrate; silicon interposers use a relaxed BEOL process, organic ones use RDL. (Module 17)
- **k1** — Dimensionless process factor in the Rayleigh resolution equation (see Rayleigh criterion); the physical limit for a single exposure is 0.25 (below that the lens cannot pass the diffracted light that carries the pattern), practical production ~0.28–0.35. Every trick in a litho engineer's kit (phase-shift masks, off-axis illumination, OPC) is a way of pushing k1 down toward 0.25. (Module 07)
- **KGD (Known Good Die)** — A bare die that has been tested sufficiently to be sold or stacked with confidence; essential for HBM and chiplets, where one bad die scraps the whole stack (see the compound-yield worked example in the Master Process Flow). (Modules 14, 18)
- **KrF** — Krypton fluoride excimer laser (see Excimer laser), 248 nm, used for less critical layers. (Module 07)
- **Lapping** — Abrasive slurry planarization of sawn wafers between two rotating plates to remove saw damage and set thickness before polishing. (Module 03)
- **Lattice / superlattice** — A lattice is the regular three-dimensional arrangement of atoms in a crystal; silicon's is diamond cubic with a repeat distance (lattice constant) of 0.543 nm. A superlattice is a stack of alternating thin crystalline layers, here silicon and silicon-germanium, grown epitaxially so that the whole stack is one continuous crystal; nanosheet transistors start from such a stack (see Nanosheet). (Modules 02, 11)
- **Leadframe** — Stamped copper frame used in wire-bonded packages instead of a substrate: QFN (quad flat no-lead), QFP (quad flat package, with gull-wing leads) and SOIC (small-outline integrated circuit) are the common outlines. Cheap and thermally good but limited to a few hundred connections around the die's edge. (Module 16)
- **Learning curve** — Yield versus cumulative volume; a new node typically goes from ~50% to ~80–90% die yield over 12–24 months as each recurring defect source is found and fixed. (Module 13)
- **LELE (Litho-Etch-Litho-Etch)** — Double patterning by two separate exposures, each transferred into a hard mask, with the second offset by half a pitch from the first; also LELELE for triple. Overlay error between the two exposures becomes a pitch error, which is its weakness. (Module 07)
- **LER / LWR (Line Edge Roughness / Line Width Roughness)** — Random nanometer-scale wobble of a resist line's edge (LER) or width (LWR), ~1–2 nm 3σ at EUV (see Sigma), meaning nearly every point on the edge sits within ±1–2 nm of the ideal line; on a ~12–16 nm gate that is a ~10% width variation and a dominant variability term. (Module 08)
- **Liner** — Thin film deposited on trench walls before the main fill, for example a cobalt (Co) or ruthenium (Ru) liner over the tantalum nitride barrier before the copper seed; it makes the copper wet the wall and plate without voids. (Module 12)
- **Little's law** — WIP = throughput × cycle time, where WIP is the number of wafers in process, throughput is wafer starts per unit time, and cycle time is the elapsed time per wafer. A fab running 100,000 wafer starts per month with a 90-day (3-month) cycle time carries ~300,000 wafers in process at any moment. (Module 05)
- **Lot** — A group of (usually) 25 wafers processed together in one FOUP and tracked as one unit by the MES (see MES). (Module 05)
- **Low-k dielectric** — Insulator with dielectric constant k below silicon dioxide's 3.9 (see Dielectric constant); carbon-doped oxide (SiOCH, silicon-oxygen-carbon-hydrogen) at k ≈ 2.5–3.0, porous variants lower. Lower k means less capacitance between wires and hence less RC delay (see RC delay), but the films are softer, weaker, and easily damaged by plasma and CMP. (Module 12)
- **LPP (Laser-Produced Plasma)** — The EUV source: 30 µm tin droplets at ~50 kHz are hit by a pre-pulse that flattens them and by a ~20–30 kW carbon-dioxide (CO₂) laser main pulse that turns each into a plasma hot enough to radiate at 13.5 nm. (Module 08)
- **LSI (Local Silicon Interconnect)** — Small silicon bridge die embedded in a CoWoS-L organic interposer to carry fine-pitch die-to-die and die-to-HBM wiring only where it is needed (see CoWoS). Not to be confused with large-scale integration, the older meaning of the acronym, or with Samsung LSI, Samsung's chip-design division. (Module 17)
- **Mandrel** — In spacer patterning (see SADP / SAQP), the sacrificial line that is printed first, coated with a conformal spacer film on both sides, and then removed, leaving the two spacers as the pattern; the mandrel pitch is twice the final pitch. (Module 07)
- **Mask / photomask / reticle** — 6-inch fused-silica (glass) plate carrying one layer's pattern at 4× the final size, which the scanner demagnifies onto the wafer; chrome or molybdenum silicide (MoSi) absorber on glass for DUV, a tantalum-based absorber on a molybdenum/silicon multilayer mirror for EUV (see EUV). A leading-node mask set is 70–100+ masks and costs ~$20–30M, which is why a design respin is so expensive. (Module 04)
- **MBCFET / RibbonFET** — Samsung's and Intel's respective names for the nanosheet gate-all-around transistor (see Nanosheet, GAA); MBCFET stands for multi-bridge-channel FET. Same device family as TSMC's N2 nanosheet, differing in sheet count, width and integration details. (Module 11)
- **MEMS (Microelectromechanical Systems)** — Microscopic mechanical structures fabricated with semiconductor processes; examples include sensors and spring probes. (Modules 09, 14)
- **Metrology** — Measurement of film thickness, dimensions, alignment and other physical properties, rather than the search for unspecified defects. (Module 13)
- **Metal pitch (MP)** — Center-to-center spacing of the tightest metal lines (M0/M1; see Pitch / half-pitch): ~23–25 nm at N3/N2, 32 nm at Intel 18A. With CPP flat, MP is the pitch that still scales and the one that decides whether a layer needs EUV double patterning. (Module 12)
- **MES (Manufacturing Execution System)** — Software that tracks every lot, dispatches it to tools, enforces recipes, and records history, so that any die can be traced back to every tool and chamber that touched it. (Module 05)
- **MG-Si (Metallurgical-Grade Silicon)** — ~98–99% pure silicon from carbothermic reduction of quartz in a submerged-arc furnace, in which carbon strips the oxygen from silicon dioxide at ~2,000 °C: SiO₂ + 2C → Si + 2CO. Two nines of purity is nine short of what a wafer needs, which is what the Siemens process is for. (Module 01)
- **Microbump** — Solder-capped copper pillar at 25–55 µm pitch connecting a die to an interposer or another die; about a hair's width apart, versus ~100 µm for C4 bumps to a substrate. (Module 17)
- **MOL (Middle of Line)** — The contact levels between the transistors and M1: trench silicide (a metal-silicon compound formed on the source/drain, see Silicide), source/drain contacts filled with tungsten (W), cobalt (Co), or ruthenium (Ru), gate contacts, and M0, the first local wiring. Contact resistance here is now a large fraction of a transistor's total resistance. (Modules 11, 12)
- **Moore's law** — Observation (1965, revised 1975) that transistor count per chip doubles about every two years; density scaling continues at ~1.15–1.3× per node, but cost per transistor has flattened (see the Node Table worked example). (Module 20)
- **MOR (Metal-Oxide Resist)** — A resist based on metal-containing chemistry; exposure changes its chemical response so a pattern can be developed. (Module 08)
- **MOSFET (transistor)** — Metal-oxide-semiconductor field-effect transistor, the switch every chip in this course is built from. Current flows from the source to the drain through a thin channel of silicon only when the voltage on the gate attracts enough carriers into the channel to make it conduct; the gate is separated from the channel by the gate dielectric, an insulator a few atoms thick, so it controls the channel by electric field alone and draws almost no current itself (see Source / drain / gate / channel, CMOS / NMOS / PMOS, Threshold voltage). Planar, FinFET, and GAA are three shapes of the same device, differing in how many sides the gate wraps around the channel. (Module 11)
- **MR-MUF (Mass Reflow Molded Underfill)** — SK hynix's HBM stacking process: all dies are placed and then reflowed at once, and the stack is molded with a liquid underfill that fills the gaps and encapsulates it; better thermal performance than TC-NCF because the molded underfill conducts heat better than the film. (Module 15)
- **mSAP (Modified Semi-Additive Process)** — Substrate patterning using a thin seed copper foil and pattern plating (plating copper only where the resist is open) for ~10 µm lines; SAP (semi-additive) uses an electroless seed, copper deposited from a chemical bath without electric current, which is thinner and so allows finer lines. Contrast subtractive etching of thick foil, which cannot hold fine lines. (Module 16)
- **MTr/mm²** — Millions of transistors per square millimeter; the standard density metric, usually quoted for the high-density (HD) library, the foundry's densest set of standard cells (its HP, high-performance, library is faster and less dense). Intel's 2017 formula weights the two commonest cells: 0.6 × NAND2 density + 0.4 × flip-flop density, where a NAND2 is a two-input NAND gate and a flip-flop is a one-bit storage cell. It assumes 100% of the area is cells; real chips reach 50–70% of the figure (see the Node Table). (Module 11)
- **Multi-patterning** — Using multiple exposures or spacer steps to print pitches below the single-exposure limit: LELE, SADP, SAQP (see each). (Module 07)
- **Murphy yield model** — Y = [(1 − e^(−A·D0)) / (A·D0)]², where Y is die yield, A is die area in cm² and D0 is killer defect density per cm²; a less pessimistic alternative to Poisson for large dies. Gives ~47% for an 800 mm² die at D0 = 0.1 (see the Negative binomial worked example). (Module 13)

- **NA (Numerical Aperture)** — n·sin θ of the projection lens, where n is the refractive index of the medium between lens and wafer (1.0 for air, 1.44 for water) and θ is the half-angle of the cone of light the lens can accept; a bigger cone captures more of the diffracted light and resolves finer features. 1.35 for ArF immersion, 0.33 and 0.55 for EUV. (Modules 07, 08)
- **NAND flash** — Non-volatile memory that stores each bit as electrons trapped in an insulating layer (charge-trap, a silicon-nitride layer that holds electrons) or on an isolated floating gate, which shifts the threshold voltage of the cell transistor; it holds data with no power. Named for the NAND-like series string of cells. 3D NAND stacks the strings vertically (see 3D NAND). (Module 15)
- **Nanosheet** — Horizontal silicon ribbon (~5–8 nm thick, 10–50 nm wide), three or four stacked per transistor, each fully surrounded by the gate (see GAA). Made from a silicon/silicon-germanium superlattice (see Lattice / superlattice) by etching away the germanium-containing layers, so the gaps the gate fills are where the SiGe used to be. Stacking sheets gives more channel width per footprint than one fin. (Module 11)
- **Negative binomial yield model** — Y = (1 + A·D0/α)^(−α), where Y is die yield, A is die area in cm², D0 is killer defect density per cm², and α is a clustering parameter (~2–5) that accounts for defects arriving in clusters rather than at random; clustered defects waste fewer dies, so yield is higher than Poisson predicts. The industry default. (Module 13)

> **Worked example:** An 800 mm² GPU die is A = 8 cm². At a mature D0 = 0.1 /cm², A·D0 = 0.8. Poisson: Y = e^(−0.8) ≈ 45%. Murphy: [(1 − 0.449)/0.8]² ≈ 0.688² ≈ 47%. Negative binomial with α = 3: (1 + 0.8/3)^(−3) = 1.267^(−3) ≈ 49%; with α = 2 it is 1.4^(−2) ≈ 51%. All three agree that roughly half of reticle-sized dies are lost, which is why such dies are designed with redundant blocks that can be fused off (see E-fuse, Binning) and why the industry has moved to chiplets. The spread between models (45–51%) is smaller than the uncertainty in D0 itself.

- **Netlist / RTL** — RTL (register-transfer level) is the design as engineers write it in Verilog or SystemVerilog: a description of registers and the logic between them. A netlist is what synthesis turns it into: the list of gates (or, after layout extraction, transistors) and the wires connecting them. LVS checks that the netlist extracted from the drawn layout matches the one synthesized from RTL (see DRC/LVS). (Module 19)
- **Node** — A named process generation (N7, N5, N3, N2, A16, Intel 18A, SF2). The number no longer corresponds to any physical dimension; treat it as a model year (see the Node Table). (Modules 11, 20)
- **Notch** — The small V-shaped cutout on a 300 mm wafer's edge marking crystal orientation; it points along the <110> direction (see Crystal orientation and Miller indices), so that every tool that grips the wafer aligns the lattice the same way and every chip is laid out at the same angle to it. Replaces the flat of smaller wafers. (Module 03)
- **Novolac / DNQ** — Classic positive resist for i-line (365 nm) and g-line (436 nm) mercury-lamp lithography: a novolac phenolic resin plus diazonaphthoquinone (DNQ), a dissolution inhibitor that light converts into an acid, making the exposed resin soluble. Not chemically amplified: one photon, one reaction. (Module 07)
- **NVLink / NVSwitch / NV-HBI** — Three different boundaries: NVLink carries communication between GPUs, NVSwitch routes NVLink traffic among multiple GPUs, and NV-HBI joins the two compute dies inside one Blackwell GPU at a specified 10 TB/s aggregate link bandwidth. An NVLink domain is the group of GPUs connected for communication through that fabric; it is not a claim that all memory has identical latency. (Module 19)
- **OCD (Optical Critical Dimension) / scatterometry** — Inferring the 3D profile of periodic structures from the spectrum of light scattered off them, fitted to a model of the structure; fast and non-destructive, but it works only on repeating patterns and only as well as the model. (Module 13)
- **ODM / OEM** — An ODM (original design manufacturer) designs and builds servers, trays, and racks that a brand or hyperscaler sells or uses under its own name (Foxconn, Quanta, Wistron, Inventec). An OEM (original equipment manufacturer) sells systems under its own brand (Dell, HPE, Supermicro), often built by an ODM. (Module 19)
- **OHT (Overhead Hoist Transport)** — The ceiling-rail vehicles of the AMHS (see AMHS) that carry FOUPs from tool to tool. (Module 05)
- **OPC (Optical Proximity Correction)** — Computationally pre-distorting mask shapes (adding serifs to corners, assist features beside isolated lines, biasing edges) so that the printed image, after the blurring of diffraction, matches design intent. Inverse lithography (ILT) is the full-optimization variant that computes the mask from the desired wafer image. (Modules 04, 07)
- **OSAT (Outsourced Semiconductor Assembly and Test)** — Contract packaging and test houses that assemble and test chips for hire: ASE, Amkor, JCET, PTI, KYEC. (Module 16)
- **Overlay** — Positional error between a layer and the layer beneath it; budget ~2 nm at leading nodes, measured on dedicated alignment targets, because a via that misses its line by more than a few nanometres is an open or a short. (Modules 07, 13)
- **Oxygen precipitates** — Clusters of silicon dioxide (SiO₂) that form from the ~10¹⁸ cm⁻³ interstitial oxygen in CZ silicon (see CZ growth) during thermal processing. 10¹⁸ of silicon's 5 × 10²² atoms per cm³ is one oxygen atom in 50,000 silicon atoms (~20 ppm atomic), enough to precipitate. Useful for gettering metals in the bulk (see Gettering), fatal if they form in the device layer, which is one reason for epi wafers. (Module 02)
- **PAG (Photoacid Generator)** — Additive in a chemically amplified resist (see CAR) that releases a molecule of acid when it absorbs a photon; the first link in the amplification chain. (Module 07)
- **Panel-level packaging** — Fan-out or substrate processes on large rectangular panels (for example 510 × 515 mm) instead of round wafers, for area efficiency: a rectangle wastes no edge, and one panel holds several wafers' worth of packages. (Module 17)
- **Parametric test** — Electrical measurement of dedicated test structures in the scribe lines (the lanes between dies): transistor threshold voltage Vt (see Threshold voltage), on-current Ion (the current per micrometre of transistor width with the gate fully on), contact resistance, and sheet resistance (see Sheet resistance); see WAT. (Module 13)
- **Passivation** — Final dielectric stack (silicon nitride/oxide, then polyimide) over the top metal protecting the die from moisture and mechanical damage, opened only at the pads. In the Bosch process the same word means the temporary sidewall polymer (see Bosch process); the course says which is meant. (Module 12)
- **PDK (Process Design Kit)** — The foundry's package of device models, design rules, layout libraries, and extraction decks that lets a customer design for a node without knowing the process details behind it. (Module 19)
- **PEB (Post-Exposure Bake)** — Bake at ~90–130 °C that drives the acid-catalyzed deprotection in a chemically amplified resist (see CAR); its temperature uniformity directly sets CDU, because a hotter spot on the plate deprotects more and prints wider. (Module 07)
- **PECVD (Plasma-Enhanced CVD)** — CVD in which a plasma (see Plasma) breaks the precursor molecules apart instead of heat, allowing deposition at ~200–400 °C; standard for BEOL dielectrics and hard masks, where the copper below cannot take furnace temperatures. (Module 06)
- **Pellicle** — Thin membrane held a few mm above the mask so that any particle landing on it sits out of focus and does not print. EUV pellicles are ~50 nm polysilicon-, metal-silicide- or carbon-nanotube-based films with ~85–92% transmission depending on generation; the lost light costs throughput. (Modules 04, 08)
- **Phase-shift mask (PSM)** — Mask that modulates the phase as well as the amplitude of the light passing through it, so that light from adjacent features arrives out of step and cancels at the boundary, sharpening the aerial image (see Aerial image); attenuated PSM (6% transmission molybdenum silicide) is standard for ArF. (Module 07)
- **Photoresist** — Light-sensitive polymer film that becomes soluble (positive tone) or insoluble (negative tone) in developer where exposed; the temporary stencil that transfers the mask pattern onto the wafer. (Module 07)
- **Pitch / half-pitch** — Pitch is the center-to-center repeat distance of a line array: one line plus one space. Half-pitch is half of that and equals the line width when lines and spaces are equal. Resolution formulas quote half-pitch; node tables quote pitch, so "0.33 NA EUV resolves ~13 nm half-pitch in production" and "~26 nm pitch" are the same statement. Check which is meant before comparing numbers. (Modules 07, 11)
- **Place and route (P&R)** — EDA step placing standard cells and routing wires between them under timing and DRC constraints. (Module 19)
- **PLAD (Plasma Doping)** — Doping by immersing the wafer in a plasma containing the dopant and pulsing a negative bias to pull ions in from every direction (see Plasma); conformal, so it dopes the sides of 3D structures that a beam implanter would shadow. Used for 3D structures and DRAM. (Module 10)

> **Intuition:** A plasma contains two kinds of etching species and they move very differently. The positive ions feel the negative voltage on the wafer and fall straight down onto it like rain in still air; the neutral radicals feel no field and wander in every direction like fog. Anything that only ions do is therefore vertical, and anything that neutrals do happens on every exposed surface. That single picture explains why ion-driven etches are anisotropic and chemical ones are not (see Anisotropy), why a deep narrow hole starves of both and etches slowly (see ARDE), why the Bosch polymer survives on sidewalls but not on trench bottoms, and why ALE separates a chemical step done by neutrals from a removal step done by gentle ions (see ALE).

- **Plasma** — A low-pressure gas in which an RF electric field (see RF) has knocked electrons off some of the molecules, leaving a mixture of positive ions, free electrons, and highly reactive neutral fragments (radicals) that would not exist at room temperature. The radicals do the chemistry; the ions, pulled straight down by a negative voltage that develops on the wafer, provide direction and energy. Nearly every etch and many depositions in a fab run in one (see RIE, CCP, ICP, PECVD, PLAD). (Module 09)
- **Poisson yield model** — Y = e^(−A·D0), where Y is die yield, A is die area in cm² and D0 is killer defect density per cm²; the simplest and most pessimistic die-yield model, because it assumes defects land independently at random. Gives ~45% for an 800 mm² die at D0 = 0.1 (see the Negative binomial worked example). (Module 13)
- **Polysilicon (poly)** — Multi-crystalline silicon, many small crystals with random orientations: as a raw material (9N–11N purity chunks that are melted for CZ growth) and as a thin film (gate electrodes at older nodes, dummy gates today). (Modules 01, 11)
- **PowerVia** — Intel's backside power delivery (see Backside power delivery), first in production on Intel 18A; PowerDirect is its planned second generation, with direct contacts to the transistors. (Modules 11, 12)
- **Precursor** — The molecule delivered as a gas or vapour that carries the atom you want to deposit, for example silane (SiH₄) for silicon, tungsten hexafluoride (WF₆) for tungsten, or a metal-organic compound for hafnium; on the hot or plasma-activated surface it breaks apart, leaves the wanted atom, and the rest is pumped away. (Module 06)
- **Probe card** — The needle or MEMS-spring array that contacts thousands of pads on a die at once during wafer sort, connecting it to the tester; FormFactor, Technoprobe, MJC. (Module 14)
- **Pull rate** — Speed at which the CZ crystal is drawn from the melt, ~0.5–1.5 mm/min for 300 mm body growth, so a 2 m ingot takes a day or more; set by how fast the latent heat of freezing can be carried away (see Voronkov v/G criterion). (Module 02)
- **PVD (Physical Vapor Deposition) / sputtering** — Depositing metal by bombarding a solid target with argon ions in a plasma and letting the ejected atoms fly across the chamber and condense on the wafer; used for barriers, copper seed layers, and pad metals. Line-of-sight, so poorly conformal in deep features (see Conformality). (Module 06)
- **Quencher** — Base added to a chemically amplified resist to neutralize stray acid that has diffused out of the exposed region, sharpening the chemical edge at the cost of some sensitivity (see CAR). (Module 07)
- **Rayleigh criterion** — Resolution (minimum half-pitch) = k1 · λ / NA, and depth of focus = k2 · λ / NA², where λ is the exposure wavelength in nm, NA is the numerical aperture (see NA), k1 is a process factor ≥ 0.25 (see k1), and k2 is a similar factor of ~0.5. Depth of focus is the vertical range over which the image stays sharp enough to print; it shrinks with the square of NA, which is why high-NA tools demand flatter wafers. For 0.33 NA EUV: 0.25 × 13.5/0.33 ≈ 10.2 nm half-pitch in theory, ~13 nm (26 nm pitch) in production. (Module 07)
- **RC delay** — The time associated with charging or discharging wiring through its resistance, proportional to resistance × capacitance. Resistance limits how quickly charge moves; capacitance sets how much charge must move to change the voltage. A receiver must wait for that voltage to settle enough to recognize the next bit. This interconnect delay now dominates over transistor delay in most paths. Shrinking hurts both factors: a narrower wire has higher resistance (and copper's resistivity itself rises when the wire is thinner than the distance electrons travel between collisions), while closer wires have higher capacitance to their neighbours. Hence low-k dielectrics, airgaps, and thinner barriers (see Low-k dielectric, Airgap, Barrier layer). (Module 12)
- **RCA clean** — Standard wet clean: **SC-1** (ammonium hydroxide, hydrogen peroxide and water, NH₄OH:H₂O₂:H₂O, removes particles and organics) and **SC-2** (hydrochloric acid, hydrogen peroxide and water, HCl:H₂O₂:H₂O, removes metals), often with a dip in dilute hydrofluoric acid (HF) between them to strip the thin oxide that SC-1 grows. (Module 03)
- **RDL (Redistribution Layer)** — Thin-film copper wiring over a die or molded panel that re-routes its pads to a new, wider footprint; the wiring of fan-out and CoWoS-R. (Module 17)
- **Re-entrant flow** — A fab's routing in which a lot returns to the same litho, etch, and deposition tools dozens of times, once per layer, rather than passing along a line; the root of fab scheduling complexity and of the long queues that make up most of cycle time. (Module 05)
- **Reflow** — Heating an assembly above the solder's melting point so that the joints form; ~220–250 °C for SAC305, the standard lead-free solder of tin with 3% silver and 0.5% copper, whose melting range is approximately 217–221 °C (solidus to liquidus). The whole package expands and contracts through that swing, which is where warpage comes from (see Warpage, CTE). (Module 16)
- **Reticle limit** — Maximum single-exposure field, 26 mm × 33 mm = 858 mm² at 0.33 NA EUV and ArF; 26 × 16.5 mm = 429 mm² for High-NA. No single die can be bigger than this without stitching two exposures, which is why an ~800 mm² GPU die is called reticle-sized and why Blackwell is two dies. (Modules 08, 19)
- **RF (radio frequency)** — The alternating voltage, at 13.56 MHz or 2, 27 or 60 MHz, applied to a chamber's electrodes or coil to sustain a plasma (see Plasma); the frequency is high enough that the light electrons follow it and the heavy ions do not. A separate, lower-frequency bias applied to the wafer chuck sets how hard the ions hit the wafer. Also the name for the high-frequency circuits in radios (see SOI). (Module 09)
- **RIE (Reactive Ion Etching)** — Plasma etch combining chemical reaction by neutrals with ion bombardment that drives it vertically (see Plasma); the generic term for anisotropic dry etch. (Module 09)
- **RMS (Root Mean Square)** — Square root of the mean squared deviations; a roughness statistic, not the tallest peak on a surface. (Module 03)
- **RMG (Replacement Metal Gate)** — Gate-last integration: build a polysilicon dummy gate, complete the source/drain and the first dielectric, remove the dummy, and fill the cavity with the real high-k metal gate (see HKMG). Done this way because the work-function metals could not survive the ~1,000 °C source/drain anneal, so a placeholder holds their place through the hot steps. (Module 11)
- **RTA (Rapid Thermal Anneal)** — Lamp or laser heating to 1,000–1,300 °C for seconds (spike anneal) or milliseconds (flash or laser anneal), hot enough to move implanted dopants onto lattice sites and repair damage, but brief enough that they barely diffuse (see Diffusion). (Module 10)
- **Rule of ten** — Test economics heuristic: the cost of a defect escaping rises ~10× at each stage it passes (wafer, package, board, system, field), so a $1 wafer-sort escape becomes a $10,000 field failure. (Module 14)
- **SADP / SAQP (Self-Aligned Double / Quadruple Patterning)** — Pitch division by depositing a conformal spacer film on both sides of a printed mandrel line (see Mandrel), removing the mandrel, and using the two remaining spacers as the etch mask, so that one printed line becomes two at half the pitch; SAQP repeats it for a quarter. Self-aligned because the spacer pitch is set by film thickness, not by a second overlay. (Module 07)
- **SAC (Self-Aligned Contact)** — Silicon nitride cap on top of the metal gate that lets the contact etch overlap the gate without shorting to it, because the etch stops on the nitride; without it the contact would have to sit further from the gate than overlay allows. (Module 11)
- **Scan chain** — DFT structure linking all flip-flops into long shift registers so that the tester can load any internal state and read any result out through a few pins (see DFT). (Module 14)
- **Scanner** — Step-and-scan exposure tool that scans a slit of light across the reticle and wafer simultaneously (the reticle moving 4× faster to match the demagnification), then steps to the next field; all modern DUV and EUV tools. (Module 07)
- **SDB (Single Diffusion Break)** — Isolation between neighbouring standard cells using one gate pitch instead of two. A diffusion break is the gap in the active silicon that stops one cell's transistors from touching the next cell's; shrinking it from two gate pitches to one makes every cell narrower. (Module 11)
- **Segregation coefficient (k₀)** — Ratio of an impurity's concentration in the freezing solid to that in the liquid at the growth interface; boron 0.8, phosphorus 0.35, oxygen ~1.25. A k₀ below 1 means the crystal takes up less dopant than the melt holds, so the melt gets richer as it is consumed and the tail of the ingot ends up more heavily doped than the seed end; that is the axial resistivity variation in CZ ingots. (Module 02)
- **Selectivity** — Ratio of the etch rate of the material being etched to that of the mask or the layer underneath; > 10:1 typical, > 50:1 for critical stops, so that an over-etch to clear thick spots removes almost nothing from the layer below. (Module 09)
- **SFQR** — Site flatness (front-referenced, least-squares plane, range): the peak-to-valley deviation from a best-fit plane over a 26 × 8 mm site, roughly the scanner's exposure slit; spec ≤ ~20 nm for leading-edge prime wafers, because the scanner's depth of focus is not much larger. (Module 03)
- **Sheet resistance** — The resistance between opposite edges of any square of a thin film, in ohms per square (Ω/sq); it is the same for a 1 mm square and a 1 µm square, which is why it is quoted without a size. R_sheet = ρ / t, where ρ is the bulk resistivity (Ω·cm) and t is the film thickness (cm). A 20 nm copper film at 3 µΩ·cm has R_sheet = 3 × 10⁻⁶ Ω·cm / 2 × 10⁻⁶ cm = 1.5 Ω/sq. (Modules 12, 13)
- **Short-channel effects (SCE)** — Loss of gate control when the gate length becomes comparable to the depth of the source/drain: threshold-voltage roll-off, DIBL (see DIBL), degraded subthreshold swing (see Subthreshold swing). FinFETs and nanosheets exist to suppress them. (Module 11)
- **Siemens process** — Polysilicon production by decomposing trichlorosilane (TCS, see TCS) with hydrogen on silicon rods heated to ~1,100 °C in a bell-jar reactor; the silicon deposits on the rods, the chlorine leaves as hydrogen chloride gas, and the impurities never arrive because they were distilled out of the TCS beforehand. (Module 01)
- **Sigma (σ) and 3σ** — σ is the standard deviation of a measured quantity, the typical distance of a single measurement from the mean. For a normal (bell-curve) distribution ±1σ contains 68% of values, ±2σ 95%, ±3σ 99.7%, so a spec written as "3σ = 1 nm" means almost every measurement lies within ±1 nm of the mean. CDU, LER, overlay, and SPC limits are all quoted this way (see Cpk). (Module 13)
- **Silicide** — A metal-silicon compound, such as titanium silicide (TiSi₂) or nickel silicide, formed by depositing a thin metal film on silicon and heating so that the two react; it gives a low-resistance, ohmic contact between the metal plug and the source/drain that bare silicon would not. (Modules 11, 12)
- **SLT (System-Level Test)** — Testing a packaged part in a system-like environment running real workloads, after ATE test; catches escapes that ATE patterns cannot model, such as a marginal path that fails only under a real thermal profile. (Module 18)
- **Slurry** — Colloidal abrasive (silica, ceria, alumina particles tens of nanometres across) suspended in a chemically active liquid, used for CMP (see CMP). (Modules 03, 12)
- **SKU (Stock-Keeping Unit)** — A distinct sellable product configuration, such as a GPU with a specified number of enabled compute units. (Module 14)
- **SM (Streaming Multiprocessor)** — The GPU's repeated compute block, containing its arithmetic cores, registers and local memory; a die carries well over a hundred of them, and a die with a few defective SMs is fused down and sold as a lower SKU (see E-fuse, Binning). (Modules 14, 19)
- **Smart Cut** — Soitec's SOI process: implant hydrogen into a donor wafer at a set depth, bond it to a handle wafer, and heat so that the hydrogen forms a plane of bubbles that splits the donor along the implant depth, leaving a thin single-crystal layer on the handle (see SOI). (Module 03)
- **SMT (Surface-Mount Technology)** — Assembly of components (capacitors, voltage regulators, the GPU package itself) onto pads on the surface of a printed circuit board by printing solder paste, placing the parts by machine, and reflowing; contrast through-hole assembly. (Module 19)
- **SoC (System on Chip)** — A chip integrating several system functions, such as processor cores, controllers and interfaces. (Module 19)
- **SoIC (System on Integrated Chips)** — TSMC's 3D integration family; its bumpless hybrid-bonded implementations directly join very flat dielectric surfaces and aligned copper pads. This gives fine vertical links without solder microbumps. AMD 3D V-Cache and MI300 illustrate different uses of vertical integration; SoIC and Foveros are vendor technology families, not interchangeable product recipes. (Module 17)
- **SOI (Silicon on Insulator)** — Wafer with a thin device silicon layer over a buried oxide, so that each transistor sits on an insulator instead of on the bulk. FD-SOI (fully depleted, at 22/28 nm from GlobalFoundries and STMicro) makes the layer so thin that the gate controls all of it; RF-SOI carries radio-frequency switches whose signals would otherwise leak into the bulk. "Substrate" in the SOI literature means the bulk wafer, not the package board (see Substrate). (Module 03)
- **Sort (wafer sort / probe)** — Electrical test of each die while still on the wafer, through a probe card (see Probe card); its output is the wafer map and the known-good-die list. (Module 14)
- **Source / drain / gate / channel (S/D)** — The four parts of a MOSFET (see MOSFET). The **source** is the heavily doped region carriers enter from; the **drain** is the heavily doped region they leave into; the **channel** is the thin, lightly doped silicon between them, under the gate, which conducts only when the gate turns it on; the **gate** is the electrode above (or around) the channel, insulated from it by the gate dielectric. "S/D" in this course means the source and drain together, which are usually built in the same steps. (Module 11)
- **Spacer** — Dielectric sidewall (silicon nitride, SiN, or silicon oxycarbonitride, SiOCN, ~5 nm) formed on each side of a gate by depositing a conformal film and etching it back so that it remains only on vertical surfaces. It sets the distance from gate edge to source/drain: too thin and the gate shorts to or overlaps the drain, too thick and the extra resistance slows the transistor. In SADP the same trick makes the spacer itself the pattern (see SADP / SAQP). (Modules 07, 11)
- **SPC (Statistical Process Control)** — Monitoring metrology results on control charts with limits set from the process's own variation (typically ±3σ, see Sigma), so that a drift triggers action while the process is still inside its spec limits rather than after it has left them. (Module 13)
- **Sputter target** — High-purity metal disc or plate (copper, tantalum, titanium, aluminum, cobalt, tungsten) that PVD consumes (see PVD); suppliers include JX Metals, Honeywell, Tosoh. (Module 04)
- **Standard cell** — Pre-designed logic gate (NAND2, inverter, flip-flop) of fixed height, measured in metal tracks (see Track), and variable width; chips are assembled from millions of them by place and route. (Module 11)
- **SRAM (Static Random-Access Memory)** — Memory that stores a bit in a powered transistor latch rather than a leaky capacitor; commonly used for on-chip cache. Conventional cells use six transistors. (Module 11)
- **STI (Shallow Trench Isolation)** — Oxide-filled trenches ~100–300 nm deep that electrically separate adjacent transistors, so that leakage cannot flow from one through the bulk silicon to the next; the first patterned FEOL step. (Module 11)
- **Stochastics** — Random pattern failures at EUV (missing contacts, bridged lines) arising from photon shot noise and resist chemistry at production doses of ~20–40 mJ/cm², and worse at lower doses. The root is photon count: an EUV photon carries ~14× the energy of an ArF photon, so at typical doses (20 mJ/cm² EUV, 30 mJ/cm² ArF) EUV puts down ~14 photons per nm² against ArF's ~290, roughly 20× fewer (see the dose-to-photons worked example in the Units section). A 10 × 10 nm contact receives only ~1,400 photons, and the rare hole that gets far fewer than average does not open. (Module 08)
- **Strain engineering** — Deliberately stretching (for NMOS) or compressing (for PMOS) the channel silicon so that its carriers move faster (see Carrier / mobility): embedded silicon-germanium source/drain, whose larger atoms squeeze the PMOS channel, and stress liners. (Module 11)
- **String stacking** — Building a 3D NAND array as two or more decks etched separately and joined, to keep the channel-hole aspect ratio manageable beyond ~128 layers. (Module 15)
- **Subfab** — The floor below the cleanroom housing pumps, gas cabinets, abatement (exhaust treatment), and chillers, so that the noisy, dirty half of each tool sits outside the clean space. (Module 05)
- **Substrate (package)** — The multilayer organic (or ceramic) board that fans the die's connections out to the BGA balls (see Build-up substrate). In this course "substrate" means the package board; the silicon disc is called the wafer or the bulk silicon, except inside the fixed terms SOI and epitaxy, where "substrate" means the crystal being grown on or bonded to. (Module 16)
- **Subthreshold swing (SS)** — The gate voltage change required for a 10× change in the transistor's off-current, in mV per decade. The thermal limit is ~60 mV/decade at 300 K; good FinFET and GAA devices reach ~65–70. It sets a floor on supply voltage: with a fixed swing, lowering the threshold voltage to run at a lower Vdd raises the leakage at zero gate voltage tenfold for every 60–70 mV, which is why supply voltage cannot fall much below ~0.5 V without leakage exploding. (Module 11)

> **Worked example:** The floor comes from the Boltzmann distribution of carrier energies. The current over the source barrier scales as exp(q·V/kT), where q is the electron charge, V the change in barrier height in volts, k Boltzmann's constant and T temperature in kelvin, so a tenfold change needs ΔV = (kT/q) × ln 10. At 300 K, kT/q = 8.617 × 10⁻⁵ eV/K × 300 K = 25.9 mV, and ln 10 = 2.303, so ΔV = 25.9 × 2.303 ≈ 59.5 mV per decade. No gate, however perfectly wrapped, can beat it, because it is a property of the electrons, not of the gate; only a different switching mechanism (tunnel FETs, negative-capacitance gates) could, and none is in production.

- **Superfill** — Bottom-up copper electroplating in trenches driven by three additives, an accelerator that concentrates at the trench bottom, a suppressor that slows plating on the top surface, and a leveler that smooths the result, so that the trench fills from the bottom before the top can pinch off and trap a void (see ECD). (Module 12)
- **Susceptor** — In a CZ puller, the graphite cup that holds the quartz crucible and is what the heater actually heats; quartz alone would soften and slump at 1,420 °C. In an epitaxy reactor, the coated graphite plate that carries the wafer and couples the heat into it. (Modules 02, 06)
- **SXM** — NVIDIA's mezzanine module form factor for data-center GPUs (GPU package, HBM, voltage regulators on one board, ~700–1,000+ W), which plugs into an HGX baseboard rather than a PCIe slot. (Module 19)
- **Tape-out** — Delivery of the final layout (GDSII/OASIS) to the mask shop; the point of no return in design, because the ~$20–30M mask set is made from it. (Module 19)
- **TCB (Thermocompression Bonding)** — Die-to-die or die-to-substrate bonding by pressing a heated die onto its target so that solder microbumps or copper pads join at fine pitch while the die is held flat; slower than mass reflow but keeps a thin die from warping. The standard HBM stacking method. (Modules 15, 17)
- **TC-NCF (Thermocompression with Non-Conductive Film)** — HBM stacking in which a non-conductive adhesive film pre-applied to each die acts as the underfill during TCB; used by Samsung and (historically) Micron. (Module 15)
- **TCS (Trichlorosilane, SiHCl₃)** — The intermediate distilled to parts-per-trillion metal purity (one foreign atom per 10¹² molecules; see the Units table) in the Siemens process; it is distilled because a liquid can be purified by boiling point in a way solid silicon cannot. (Module 01)
- **TEM (Transmission Electron Microscopy)** — Imaging of thin cross-sections at atomic resolution by passing electrons through a slice thinner than 100 nm; the destructive reference method for film thickness and device profiles, against which ellipsometry and OCD are calibrated. (Module 13)
- **Thermal budget** — Cumulative time-temperature exposure a structure can tolerate before dopants diffuse or films degrade; drops from ~1,000 °C in FEOL to ~400 °C in BEOL, because copper and low-k films cannot take more, which is why every BEOL deposition is PECVD or ALD rather than furnace CVD. (Module 06)
- **Threshold voltage (Vt)** — A defined gate-to-source voltage used to mark the onset of strong channel conduction; it is not a perfect boundary between zero current and current. Representative values here are ~0.2–0.4 V, set by the work-function metal choice (see Work function, Work-function metal). PDKs offer 4–6 flavors so that designers can trade leakage for speed cell by cell: a lower threshold makes switching easier but allows more unwanted off-state current. (Module 11)
- **TIM (Thermal Interface Material)** — Material between die and lid or lid and heatsink that fills the microscopic air gaps between two nominally flat surfaces; indium or liquid metal for high-power GPUs, because ordinary thermal grease cannot pass a kilowatt. (Modules 16, 19)
- **Track (litho)** — The coat/bake/develop tool bolted to the scanner (TEL Lithius, SCREEN SOKUDO) that applies resist before exposure and develops it after. **Track (cell)** — one minimum metal pitch of standard-cell height, so a 6T cell is six metal tracks tall; fewer tracks means a denser library. The course says which is meant. (Modules 07, 11)
- **TSV (Through-Silicon Via)** — Vertical copper-filled via through a thinned die or interposer, ~5–10 µm diameter for HBM and ~10 µm for CoWoS-S interposers; the only way to connect the top of a die to its bottom. (Modules 15, 17)
- **TTV (Total Thickness Variation)** — Maximum minus minimum thickness over a wafer; < 1 µm for thinned HBM dies, where a thick spot would leave a TSV buried, < ~2 µm for prime wafers. (Modules 03, 15)
- **TXRF (Total-reflection X-ray Fluorescence)** — Surface-metal measurement in which X-rays graze the polished wafer at so shallow an angle that they reflect off the surface and excite only the atoms sitting on it; counts metal contamination down to ~10⁹ atoms per cm², about one metal atom per million surface silicon atoms. (Modules 03, 13)
- **UBM (Under-Bump Metallization)** — Metal stack (for example titanium, copper, nickel) on the pad that adheres to the passivation, wets solder, and blocks the solder's tin from diffusing into the pad metal. (Module 16)
- **UCIe (Universal Chiplet Interconnect Express)** — Open die-to-die interface standard for chiplets, delivering ~2–5+ Tb/s per mm of shoreline, shoreline being the length of die edge given over to the interface; bandwidth per mm matters because die edge is the scarce resource. (Module 17)
- **Underfill** — Capillary epoxy dispensed at a die edge and drawn under the flip-chip die by surface tension, then cured, so that the thermal-expansion mismatch between die and substrate (see CTE) is carried by the whole epoxy layer rather than by each solder bump alone. (Module 16)
- **UPW (Ultrapure Water)** — Water of 18.2 MΩ·cm resistivity, the theoretical maximum for water at 25 °C, reached only when nothing but water's own H⁺ and OH⁻ ions is left to carry current; with < 1 ppb TOC (total organic carbon) and essentially zero particles. A fab uses ~10 million liters per day, mostly for rinsing. (Module 04)
- **Utilization** — Fraction of a tool's or fab's capacity in use; ~85–95% at TSMC in an upcycle. (Module 20)
- **Vacancy, interstitial, dislocation** — The three basic crystal defects. A vacancy is a missing atom in the lattice; an interstitial is an extra atom squeezed between lattice sites; a dislocation is a line along which a plane of atoms ends, so that the lattice is mismatched across it. All three matter because they move at process temperatures and trap dopants and metals: vacancies cluster into COPs (see COP), interstitials into dislocation loops, and a single dislocation running through a transistor is a leakage path. (Modules 02, 10)
- **Via** — Vertical metal connection between two adjacent interconnect levels, a hole through the dielectric filled with copper (or tungsten at the contact level); the narrowest and most failure-prone element of the wiring. (Module 12)
- **Voronkov v/G criterion** — Ratio of pull rate v (mm/min) to the axial temperature gradient G (K/mm) in the crystal at the CZ growth interface; above a critical value of ~0.13–0.20 mm²/(K·min) the crystal is vacancy-rich (COPs form), below it interstitial-rich (dislocation loops form). Growers steer v/G through hot-zone design and pull rate to stay in the narrow band where neither defect dominates. (Module 02)
- **VRM (Voltage Regulator Module)** — Power stages on the SXM board or HGX converting 48–54 V to sub-1 V at hundreds of amps for the GPU; they sit as close to the package as possible because at those currents even a centimetre of copper drops a significant voltage. (Module 19)
- **Wafer** — The single-crystal silicon disc; 300 mm diameter, 775 µm thick, ~127 g. (Module 03)
- **Wafer map** — Spatial plot of per-die test results or defects across a wafer; its pattern (edge ring, center cluster, scratch) diagnoses the root cause, because each tool leaves a characteristic signature. (Module 13)
- **Warpage** — Bowing of a wafer, die, or package from CTE mismatch (see CTE) and film stress as temperature changes; a first-order problem for large CoWoS packages, where a warped interposer lifts corner bumps off their pads during reflow. (Module 17)
- **WAT (Wafer Acceptance Test)** — Parametric test (see Parametric test) of scribe-line structures at the end of the line to verify that the wafer meets the process spec before sort; a wafer that fails WAT is scrapped without probing its dies. (Module 13)
- **Well** — A region of the wafer doped opposite to the bulk so that the other transistor type can be built in it: an n-well in p-type silicon holds the PMOS transistors, and a p-well holds the NMOS (see CMOS / NMOS / PMOS, Dopant / n-type / p-type). Formed by high-energy implants early in the FEOL. (Modules 10, 11)
- **Wet bench** — Tool with tanks of chemicals for batch immersion cleaning and etching of whole lots; single-wafer spin tools now dominate critical cleans because each wafer sees fresh chemistry and no cross-contamination. (Module 03)
- **WFE (Wafer Fab Equipment)** — The equipment market for front-end tools, ~$100–120 billion per year as of ~2025. (Module 20)
- **WIP (Work in Process)** — Wafers started but not yet finished; see Little's law. (Module 05)
- **Wire bonding** — Connecting die pads to a leadframe or substrate with 15–25 µm gold or copper wire, one wire at a time, welded at each end by ultrasonic energy and heat; the oldest interconnect and still the highest-volume one, at thousands of wires per second across the industry, but limited to pads around the die edge (see Flip-chip). (Module 16)
- **Work function** — The energy needed to remove an electron from a metal's surface, in eV, which differs from metal to metal; a gate metal's work function sets where the transistor's threshold voltage lands, so choosing the metal is how Vt is tuned (see Threshold voltage, Work-function metal). (Module 11)
- **Work-function metal (WFM)** — Titanium nitride (TiN), titanium aluminum (TiAl), and tantalum nitride (TaN) layers inside the metal gate whose thickness and order set the effective work function (see Work function) and hence Vt separately for NMOS and PMOS; deposited by ALD into the cavity left by the dummy gate (see RMG). (Module 11)
- **WoS (Wafer on Substrate)** — Second half of CoWoS: the diced die-on-interposer unit is attached to the package substrate. (Module 17)
- **wph (wafers per hour)** — Throughput unit for a tool; ~220 wph for an NXE:3800E, ~295 wph for an NXT:2100i. (Modules 07, 08)
- **wspm (wafer starts per month)** — Capacity unit for a fab; a GigaFab exceeds 100,000. (Module 05)
- **Yield** — The fraction of units entering a specified stage that leave it as acceptable output. Always ask “a fraction of what?” **Line yield** counts wafers surviving the flow without being scrapped. **Die yield** counts passing dies relative to the dies being evaluated; it falls with die area times defect density in the models discussed here (see Poisson yield model, Murphy yield model, Negative binomial yield model). **Assembly/test yield** counts passing packages relative to packages entering that stage. **Compound yield** multiplies the successive stage yields, worked through in the Master Process Flow. Yield concerns how much passes production; **reliability** concerns how well a product continues to work over time under stated conditions. Passing a test today does not guarantee an unlimited service life. (Modules 13, 18)

## Units, Conventions, and a Sense of Scale

### Unit conventions used in this course

The same quantity is often quoted in different units by different parts of the industry (film thickness in ångströms by a deposition engineer, in nanometres by a device engineer). The table lists the conventions the course follows and, where a unit is not self-explanatory, says what it physically means.

| Quantity | Unit as written | Notes |
|---|---|---|
| Length (device) | nm, Å | 1 Å = 0.1 nm. Film thickness often quoted in Å by tool engineers. |
| Length (package, wafer) | µm, mm | 775 µm wafer, 40 µm microbump pitch, 26 × 33 mm reticle. |
| Area (die) | mm² | H100 814 mm²; reticle limit 858 mm². |
| Density | MTr/mm² | Millions of transistors per mm², high-density library unless noted. |
| Dose (litho) | mJ/cm² | EUV resists 20–40 mJ/cm²; ArF 20–30. A dose is the light energy landing per unit area; see the worked example below for what it means in photons. |
| Dose (implant) | atoms/cm² (or ions/cm²) | 10¹¹ (Vt adjust) to 10¹⁶ (S/D). |
| Energy (implant) | keV, MeV | 0.2 keV (ultra-shallow) to 3 MeV (deep wells). |
| Energy (photon, activation) | eV | One electron-volt is the energy an electron gains crossing one volt. A 13.5 nm EUV photon carries 92 eV, a 193 nm ArF photon 6.4 eV; the activation energies in reliability models are ~0.7–1.0 eV. |
| Concentration | atoms/cm³ | Si has 5 × 10²² atoms/cm³; dopants 10¹⁵–10²¹. |
| Fraction | ppm, ppb, ppt | Parts per million, billion, trillion, by count of atoms or molecules unless stated. For scale: 1 ppm is one second in 11.6 days, 1 ppb one second in 32 years, 1 ppt one second in 32,000 years. |
| Purity | N ("nines") | 9N = 99.9999999%; 11N electronic-grade polysilicon. |
| Resistivity | Ω·cm (bulk), Ω/sq (sheet), µΩ·cm (metal) | Cu bulk 1.7 µΩ·cm; 12 nm Cu line ~5–6 µΩ·cm. Ω/sq (ohms per square) is the resistance between opposite edges of any square of a thin film, whatever its size, equal to resistivity divided by thickness (see Sheet resistance in the Glossary). |
| Pressure | Torr, mTorr, Pa | 1 Torr = 133 Pa. Etch chambers 5–100 mTorr; EUV vessel ~1–5 Pa H₂. |
| Temperature | °C (process), K (physics) | Si melts at 1,414 °C. |
| Gas flow | sccm | Standard cm³/min, where "standard" means the volume the gas would occupy at 0 °C and 1 atm, so the number counts molecules rather than a volume that would change with chamber pressure. |
| Statistics | σ, 3σ | Standard deviation; ±3σ holds 99.7% of a normal distribution (see Sigma in the Glossary). CDU, overlay and LER are quoted as 3σ values. |
| Rack height | U | 1U = 44.45 mm (1.75 inches); a DGX B200 is 10U. |
| Throughput | wph, wspm | Tool and fab capacity. |
| Defect density | /cm² | D0. |
| Time (cycle) | days | Fab cycle time ~90 days; "1.0–1.5 days per mask layer" is the rule of thumb. |
| Bandwidth | GB/s, TB/s | HBM3E ~1.2 TB/s per stack; NVLink 1.8 TB/s per GPU. Lowercase b means bits: 1 TB/s = 8 Tb/s. |
| Money | USD | Wafer price per 300 mm wafer; tool price per unit; fab cost per phase. |

> **Worked example:** Dose to photons. A photon's energy is E = h·c/λ, where h is Planck's constant (6.626 × 10⁻³⁴ J·s), c is the speed of light (3 × 10⁸ m/s) and λ is the wavelength. For EUV, λ = 13.5 nm gives E ≈ 1.47 × 10⁻¹⁷ J (92 eV); for ArF, λ = 193 nm gives E ≈ 1.03 × 10⁻¹⁸ J (6.4 eV). A dose of 20 mJ/cm² is 200 J/m², so EUV at 20 mJ/cm² delivers 200 / 1.47 × 10⁻¹⁷ ≈ 1.4 × 10¹⁹ photons per m², which is ~14 photons per nm². ArF at 30 mJ/cm² (300 J/m²) delivers 300 / 1.03 × 10⁻¹⁸ ≈ 2.9 × 10²⁰ per m², ~290 per nm², roughly 20× more. A 10 × 10 nm contact hole (100 nm²) therefore receives ~1,400 EUV photons on average. Photon arrival is random, so the count fluctuates by about √N ≈ 37, or ~3% at one standard deviation; the one hole in millions that lands several σ below average gets too little acid to open. That is the photon-count contribution to the Stochastics entry; absorption, secondary electrons and resist chemistry add their own variation, and it is why EUV doses cannot be pushed down for throughput the way ArF doses could.

> **Worked example:** Concentration to fraction. Silicon has 5 × 10²² atoms per cm³. The ~10¹⁸ cm⁻³ of oxygen in CZ silicon is therefore 10¹⁸ / 5 × 10²² = 2 × 10⁻⁵, one oxygen atom for every 50,000 silicon atoms, or ~20 ppm atomic. A light dopant concentration of 10¹⁵ cm⁻³ is 10¹⁵ / 5 × 10²² = 2 × 10⁻⁸, one dopant atom in 50 million silicon atoms, or 20 ppb, and that is enough to set the wafer's resistivity. The lesson is that "10¹⁸" and "10¹⁵" look like enormous numbers and are in fact trace impurities, which is why purity has to be measured in ppb and ppt rather than in percent.

### Sense of scale: from a rack to an atom

The chain spans about ten orders of magnitude, from a 2 m rack to a 0.2 nm atom. Each row is roughly a factor of 3–10 smaller than the last.

> **Intuition:** Read the table as a ladder. Each rung is 3–10× smaller than the one above, and the whole ladder is ten orders of magnitude, roughly the ratio of Earth's diameter to a millimetre grain of sand. Everything below the human-hair rung is invisible to the eye, and printed half-pitch depends on wavelength, numerical aperture and process factor together. Some sub-10 nm dimensions, including sheet thickness and EOT, are instead set by deposition and etch; they are not all printed directly by a scanner. The Notes column says why each size is what it is.

| Object | Characteristic size | Notes | Module |
|---|---|---|---|
| Data-center rack (GB200 NVL72) | ~2 m tall, 0.6 m wide, ~1.4 t | 72 GPUs, 18 compute trays, 9 NVSwitch trays, liquid cooled; the size is set by the standard 19-inch rack and the number of trays a single NVLink domain spans | 19 |
| Server / compute tray | ~0.45 m deep, 1U–10U (44–445 mm) high | DGX B200 is 10U; 1U = 44.45 mm (see the Units table) | 19 |
| HGX baseboard | ~0.5 × 0.4 m | 8 SXM modules plus NVSwitches; sized by eight GPU packages and their cooling side by side | 19 |
| SXM module | ~140 × 80 mm | GPU package plus VRMs, which must sit within centimetres of the package to deliver hundreds of amps | 19 |
| GPU package (Blackwell, CoWoS-L) | ~90 × 90 mm substrate; interposer ~3.3× reticle | Two ~800 mm² dies, 8 HBM stacks; the interposer must be large enough to hold all ten side by side | 17, 19 |
| Silicon wafer | 300 mm diameter | The notch points along the <110> crystal direction (see Crystal orientation in the Glossary) so that every tool aligns the lattice the same way | 03 |
| GPU die | ~26 × 31 mm (~800 mm²) | Reticle limit 858 mm²; the die is as large as one exposure allows | 19 |
| HBM stack | ~11 × 10 mm footprint, ~720 µm tall | 12-high HBM3E; the height is capped by the JEDEC package standard | 15 |
| Human hair | ~70 µm | For comparison | |
| Wafer thickness (as delivered) | 775 µm | Thinned to 50–200 µm in packaging; the full thickness exists only so the wafer survives fab handling | 03, 16 |
| C4 bump pitch | ~100–150 µm | Die to substrate; set by how fine a line the organic substrate can carry | 16 |
| Microbump pitch | ~40 µm | Die to interposer, HBM die to die; set by how small a solder cap can be placed without bridging | 17 |
| HBM DRAM die thickness | ~30 µm (HBM3E), ~20–25 µm (HBM4 16-high) | TSV depth is the same; twelve or sixteen dies must fit under the 720 µm cap | 15 |
| TSV diameter | ~5–10 µm | Aspect ratio ~5–10:1, the depth-to-width a Bosch etch can cut and a plating bath can fill without voids | 15, 17 |
| Hybrid bond pitch | ~6–9 µm (SoIC), roadmap to ~1 µm | Cu-Cu, no solder; set by the alignment accuracy of the bonder, roughly ±0.2 µm | 17 |
| Substrate line/space | ~8–10 µm | mSAP on ABF; the finest line a plated copper foil on a laminate can hold | 16 |
| RDL line/space | ~2 µm (InFO), ~0.4 µm (CoWoS-R) | Fan-out; thin-film wiring built with wafer-fab tools rather than board tools | 17 |
| Top BEOL metal pitch | ~1–2 µm | Power distribution; wide because these lines carry amps, not signals | 12 |
| Killer particle | ~20–30 nm | Anything larger than ~half the metal pitch | 13 |
| Tightest metal pitch | ~23–25 nm (N3/N2), 32 nm (Intel 18A) | M0/M1; set by EUV resolution (single or double exposure) and by copper resistance | 12 |
| Contacted poly pitch | ~45–48 nm | Gate to gate; must hold a gate, two spacers and a contact, which is why it has stopped shrinking | 11 |
| Physical gate length | ~12–16 nm | At 2 nm class; shorter and the drain would control the channel more than the gate does | 11 |
| EUV wavelength | 13.5 nm | Tin plasma emission; The industrial tin-source and Mo/Si-mirror combination is optimized near this wavelength; other multilayer systems exist at other wavelengths | 08 |
| Fin width | ~6 nm | FinFET nodes; thin enough for the gate to control the whole fin from its three sides | 11 |
| Nanosheet thickness | ~5–8 nm | Three or four stacked; thin enough for the gate to control the sheet from both faces | 11 |
| Barrier / liner | ~1–2 nm | TaN, Co, Ru; the thinnest continuous film that still stops copper diffusing | 12 |
| Gate dielectric (EOT) | ~0.8–1.0 nm | HfO₂ physically ~1.5–2 nm; the physical film is thicker than its oxide equivalent so that it does not leak | 11 |
| Si lattice constant | 0.543 nm | Diamond cubic unit cell | 02 |
| Si–Si bond length | 0.235 nm | | 02 |
| Si atom (covalent diameter) | ~0.22 nm | Two atoms per lattice constant along the <100> direction | 02 |

A useful way to hold this in mind: a Blackwell package is about 4 × 10⁶ metal pitches wide (90 mm / 23 nm). A 2 m rack divided by a 14 nm gate length is about 1.4 × 10⁸; the rack-to-atom ratio is larger, about 10¹⁰.

## Node Table

Numbers are compiled from foundry disclosures at IEDM/VLSI, WikiChip, TechInsights and SemiAnalysis teardowns, and the course's own Module 11 and Module 20. Values marked ~ are estimates; foundries stopped publishing pitches around the 7 nm generation. Density is for the high-density library at 100% utilization; real chips reach 50–70% of it. Wafer prices are list-price estimates as of ~2025.

**How to read this table.** *Marketing node* is the name the foundry sells the process under; it is a label, not a length. *Foundry* is who runs it. *HVM year/status* separates a reported production date from a future target or estimate. A target is not evidence of achieved high-volume manufacturing (see HVM in the Glossary); this distinction applies to every foundry in the table. “—” means the cited sources do not establish a value here, not zero or an absence of capability. *Transistor* is the device type: planar, FinFET, or nanosheet gate-all-around, with vendor names where the vendor uses them. *CPP* is the contacted poly pitch, the gate-to-gate spacing in nanometres (see CPP). *Min MP* is the tightest metal pitch, usually M0 or M1 (see Metal pitch). *Fin/sheet pitch* is the fin-to-fin spacing for FinFET nodes; "sheet" means the node uses nanosheets, which have no fin pitch. *Density* is millions of transistors per mm² for the high-density (HD) standard-cell library at 100% utilization (see MTr/mm²); "measured" means a TechInsights teardown of a real chip, "claimed" means the foundry's own marketing figure, "est." means an analyst reconstruction. *Litho* says which layers use EUV, and how many; "EUV LELE" means EUV double patterning by two litho-etch passes (see LELE). *Approx. wafer price* is the list-price estimate; "internal" means Intel did not sell those wafers to outside customers, so no price exists.

> **Intuition:** A node name is a model year, not a measurement. Nothing on an N2 wafer is 2 nm across: the gate is ~12–16 nm long, the gates sit ~45 nm apart, the tightest wires ~23 nm apart. The three physical numbers that matter are CPP, MP, and MTr/mm², and even MTr/mm² is a library figure that real chips reach only 50–70% of, because real chips leave routing channels, memory, and analog blocks between the standard cells. When two nodes from different foundries are compared, compare those three numbers, not the names; Intel 7 and TSMC N7 have similar pitches, and Intel 18A's 32 nm metal pitch is looser than N3E's 23 nm.

| Marketing node | Foundry | HVM year/status | Transistor | CPP (nm) | Min MP (nm) | Fin/sheet pitch (nm) | Density (MTr/mm², HD) | Litho (EUV layers) | Approx. wafer price |
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
| Intel 18A | Intel | late 2025 (Panther Lake) | RibbonFET GAA + PowerVia | ~50 | 32 | sheet | ~200–240 est. | 0.33 NA EUV; selected 18A High-NA layers reported in HVM, Sep 2026 | ~$20–25k est. |
| Intel 14A | Intel | ~2027 | RibbonFET 2nd gen + PowerDirect | ~45 est. | ~24–26 est. | sheet | ~1.15–1.2× 18A (claimed) | High-NA EUV planned | n/a |
| 7LPP | Samsung | 2018 | FinFET | 54 | 36 | 27 | ~95 | first EUV in HVM (~few layers) | ~$8–9k |
| 5LPE | Samsung | 2020 | FinFET | 54 | 36 | 27 | ~127 | EUV | ~$12–14k |
| 3GAE / SF3E | Samsung | 2022 | MBCFET nanosheet | ~45–48 | ~28 | sheet | ~150 (claimed 1.19× 5LPE) | EUV | ~$15–18k |
| SF3 (3GAP) | Samsung | 2024 | MBCFET | ~45 | ~28 | sheet | ~170 | EUV | ~$18–20k |
| SF2 | Samsung | 2025–26 | MBCFET 2nd gen | ~45 | ~28 | sheet | ~200–230 est. | EUV | ~$25k est. |
| N+2 ("7 nm class") | SMIC | 2023 | FinFET | ~57 | ~40 | ~30 | ~90 | DUV SAQP only (no EUV; export controls) | ~$10–12k est. |
| N+3 | SMIC | — (2025 chip teardown) | FinFET | — | — | — | — | DUV multi-patterning | — |
| 2 nm | Rapidus | pilot 2025, HVM target 2027 | Nanosheet GAA (IBM-derived) | ~45 est. | ~24 est. | sheet | ~200+ target | EUV NXE:3800E | n/a |

Legend for the vendor names in the Transistor column: **FinFlex** and **NanoFlex** are TSMC's options to mix fin counts (N3) or nanosheet widths (N2) cell by cell; **MBCFET** (Samsung) and **RibbonFET** (Intel) are those companies' names for the nanosheet gate-all-around transistor; **PowerVia** is Intel's backside power delivery, **PowerDirect** its planned second generation with direct contacts to the transistors, and **Super Power Rail** is TSMC's backside power scheme on A16. All are defined in the Glossary.

> **Worked example:** Library density versus a real chip. NVIDIA's H100 has 80 billion transistors on an 814 mm² die built on TSMC's N4 (an N5-family process): 80 × 10⁹ / 814 mm² ≈ 98 MTr/mm². The table gives ~138 MTr/mm² measured for the N5/N4 HD library, so the H100 reaches 98/138 ≈ 70% of the library figure. That is the top of the 50–70% range, as expected for a GPU: its die is dominated by repeated, tightly packed compute blocks and SRAM. A CPU with more irregular logic and wide I/O sits nearer the bottom of the range. Whenever a density claim and a teardown disagree by a factor of ~1.5, this ratio, not an error, is usually the reason.

> **Worked example:** Cost per transistor from the table's own numbers (list-price estimates, so every figure is approximate). N5 to N3E: price rises from ~$16.5k to ~$19k, a factor of ~1.15; density rises from ~138 to ~207 MTr/mm², a factor of ~1.5; cost per transistor therefore changes by 1.15/1.5 ≈ 0.77, a fall of ~25%. N3E to N2: price rises from ~$19k to ~$30k, a factor of ~1.58; density rises from ~207 to ~240, a factor of ~1.16; cost per transistor changes by 1.58/1.16 ≈ 1.36, a rise of roughly a third (~30–35%). Using the top of N2's density range (~250) or the bottom of its price range would soften but not reverse the sign. Under these estimated prices and assumed densities, the newer node has higher modeled cost per transistor. That result is conditional, not a universal historical first or a measured product cost.

Three things follow from those two calculations. First, CPP has been essentially flat at 45–50 nm since N5 because it must fit a gate, two spacers, and a contact; remaining density comes from metal pitch, cell height (track reduction, backside power), and DTCO. Second, density gain per node has fallen from ~2× (N16 to N10 to N7) to ~1.15–1.3× (N3E to N2), while wafer price has risen ~1.5× per node, which is why cost per transistor has stopped falling at the leading edge, as the second worked example shows. Third, the EUV layer count roughly doubles every two nodes, and each EUV layer costs 2–3× a DUV layer in tool time, so litho's share of wafer cost has grown from ~25% at N16 to ~35–40% at N2.

> **What can go wrong:** Reading a density claim. Three traps catch most readers. The first is comparing a foundry's library figure (100% utilization, HD cells, often a NAND2-and-flip-flop weighted average) with a teardown of a real chip, which is a different quantity by the 50–70% factor above; the H100 example shows the gap. The second is comparing an SRAM-heavy die with a logic-heavy one: SRAM bit cells have barely shrunk since N5, so a die that is half cache scales worse than the library number suggests, while a pure-logic block can exceed it. The third is treating "claimed" and "measured" as the same: N5's 171 claimed against 138 measured is the standard example, and the N2 figures in the table are marked "est." because they rest on analyst reconstruction rather than a published teardown. For any density number, ask which library, what utilization, and who measured it.

TechInsights identifies N+3 as further scaling of SMIC's 7 nm-class technology and reports that it remains less scaled than TSMC and Samsung 5 nm processes. The unspecified cells above avoid presenting unverified pitches, density or production yield as measured facts. A physical-chip teardown and a high-volume-production announcement establish different things. [TechInsights N+3 process analysis](https://www.techinsights.com/blog/smic-n3-kirin-9030-pro-process-flow-analysis).

## Master Process Flow

This is the full sand-to-rack sequence at the granularity fab and packaging engineers use. Steps that repeat many times appear once with a note. Module 00 gave the same flow in ~60 steps; this version doubles the resolution, especially in the FEOL, MOL, BEOL, HBM, and CoWoS stages. The physical wafer's path runs from step 1 through step 122; the HBM branch (Stage K, steps 78–87) runs in parallel at a memory maker and merges at step 90, where the HBM stacks are placed on the interposer wafer alongside the GPU dies. Each stage opens with what comes in, what goes out, and the one constraint that makes it hard; each step that creates a new structure says what the structure is for. Numbers in parentheses are the modules that explain the step.

### Stage A: Design and masks (Modules 19, 04)

What comes in is a product specification; what goes out is a set of 70–100+ photomasks, one per patterned layer, plus the test program. The constraint is that nothing downstream can be changed cheaply: a mask set costs ~$20–30M and a design bug found after tape-out means a new one, so almost all of the effort here is verification.

1. Define the required functions and performance, then divide the architecture into blocks and model how data moves between them. (19)
2. RTL design in Verilog/SystemVerilog (RTL, register-transfer level, is the text description of the chip's registers and logic); functional verification and emulation. (19)
3. Logic synthesis to standard cells from the foundry PDK library, turning the RTL into a netlist of gates. (19)
4. Place major blocks and individual cells, build a clock-distribution tree to control arrival-time differences, then route signal and power wires. (19)
5. Check whether signals arrive before their receiving clock edge, whether the power grid loses too much voltage (IR drop), and whether currents threaten metal lifetime (electromigration). Iterate layout until these checks meet the design requirements. (19)
6. Check geometry against manufacturing rules (DRC), compare the extracted circuit with its intended connections (LVS), check whether plasma charge collected on long wires could damage gates (antenna checks), and verify pattern density for deposition and polishing. Signoff records acceptance against these checks; it is not proof of zero defects. (19)
7. Tape-out: export GDSII/OASIS; foundry runs OPC/ILT and mask data preparation. (19, 04)
8. Mask blank fabrication: fused silica polished to sub-nm flatness; EUV blanks get 40 Mo/Si bilayers (Hoya, AGC). (04)
9. Mask writing by multi-beam e-beam (IMS, NuFlare), resist develop, absorber etch, clean. (04)
10. Mask inspection (actinic for EUV, meaning inspected with 13.5 nm light so that defects are seen as the scanner would see them), repair, pellicle mounting; ship 70–100+ masks to the fab. (04)

### Stage B: Raw materials (Module 01)

What comes in is quartz rock; what goes out is 9N–11N polysilicon, silicon with fewer than one foreign atom per billion. The constraint is that silicon cannot be purified directly, so it is converted into a liquid (trichlorosilane) that can be distilled, and then converted back.

11. Quartz mining and beneficiation (crushing, washing and separating the ore to raise its purity); high-purity quartz for crucibles from Spruce Pine. (01)
12. Carbothermic reduction of quartz with carbon in a submerged-arc furnace at ~2,000 °C to MG-Si (~98–99%), the carbon stripping oxygen from the SiO₂ as carbon monoxide. (01)
13. Fluidized-bed hydrochlorination of MG-Si to trichlorosilane (TCS), the liquid intermediate. (01)
14. Multi-stage fractional distillation of TCS to parts-per-trillion metal impurity levels; boiling-point differences separate the metal chlorides from the TCS. (01)
15. Siemens CVD: TCS + H₂ decompose on heated silicon rods at ~1,100 °C over ~3–5 days, growing 9N–11N polysilicon. (Alternative: FBR granular.) (01)
16. Rod harvesting, crushing in clean conditions, etching, packaging as chunks. (01)

### Stage C: Crystal growth (Module 02)

What comes in is polysilicon chunks and a pinch of dopant; what goes out is a single crystal 300 mm across and ~2 m long. The constraint is that the whole ingot must be one perfect lattice with no dislocations, grown from a melt that is dissolving its own crucible, so pull rate and temperature gradient are balanced to within a narrow window (see Voronkov v/G criterion).

17. Charge loading: ~300–450 kg of polysilicon and dopant into a quartz crucible in a graphite susceptor (the graphite cup that holds the crucible and is what the heater actually heats). (02)
18. Melt-down under argon at ~1,420 °C; stabilization. (02)
19. Seed dip, Dash necking (~3 mm neck, fast pull to eliminate dislocations inherited from the seed's thermal shock). (02)
20. Shoulder growth to 300+ mm diameter. (02)
21. Body growth at ~0.5–1.5 mm/min with counter-rotation, magnetic field (MCZ), and automatic diameter control; ~2 m body over ~30–40 h. (02)
22. Tail-off, cool-down, crucible discard. (02)
23. Ingot characterization: resistivity, oxygen, carbon, dislocation check (X-ray, etch pit). (02)

### Stage D: Wafering (Module 03)

What comes in is a rough cylinder; what goes out is a polished disc 775 µm thick, flat to ~20 nm over each exposure site, with a surface clean to one metal atom per million. The constraint is that every downstream lithography step assumes that flatness, and every mechanical step here leaves damage that the next must remove.

24. Cropping crown and tail; cutting into ~400 mm sections. (03)
25. Cylindrical grinding to exact diameter; notch grinding along the <110> crystal direction so that the lattice orientation is visible to every later tool. (03)
26. Diamond wire sawing into ~900 µm slices (~150 µm kerf loss, the width of crystal turned to dust by each cut). (03)
27. Edge rounding/profiling, so that the edge does not chip and seed cracks in later handling. (03)
28. Lapping or double-side grinding to remove saw damage. (03)
29. Alkaline or acid etch to remove residual damage. (03)
30. Double-side polish (DSP) to global flatness. (03)
31. Final single-side CMP of the front surface to < 0.1 nm RMS. (03)
32. RCA clean (SC-1, HF, SC-2), spin-rinse-dry. (03)
33. Optional epitaxial layer deposition (~2–5 µm p/p+ or p/p− epi (a p-type epitaxial layer on more heavily or more lightly doped p-type bulk; the slash denotes a stack)), giving a defect-free device layer over a bulk that can getter metals. (03)
34. Inspection: flatness (SFQR), particles (laser scattering), metals (TXRF, total-reflection X-ray fluorescence, which counts metal atoms on the surface down to ~10⁹ per cm²), thickness/TTV; laser-mark ID; pack in a FOSB (front-opening shipping box, the sealed carrier for transport between factories) and ship. (03)

### Stage E: Fab entry and FEOL (Modules 05, 06, 07, 08, 09, 10, 11)

What comes in is a blank polished wafer; what goes out is a wafer carrying billions of finished transistors, each with its metal gate, source and drain, but no wiring yet. The constraint is dimensional: the gate is ~12–16 nm long and its dielectric under 2 nm thick, so every step must hold sub-nanometre control while the wafer also sees the hottest temperatures in the flow (~1,000 °C anneals), which is why the real gate is built last, after the heat, in place of a dummy.

Repeated sub-steps: every patterned layer goes through one litho-etch loop, written once here and repeated ~70–100 times per wafer. Each item has a reason:

- **L1.** **Clean**, because a single particle under the next film prints as a defect in every layer above it.
- **L2.** **Anti-reflective coating**, because light reflecting off the layer below would interfere with the incoming light and print standing-wave ripples into the resist sidewalls.
- **L3.** **Hard mask** (silicon nitride, titanium nitride, or carbon), because the resist is too thin and too soft to survive a deep etch; the pattern is first transferred into a tougher film that does the masking.
- **L4.** **Resist coat** on the track, spun to a uniform film tens of nanometres thick.
- **L5.** **Expose** (DUV or EUV) on the scanner, which projects the mask pattern as an aerial image into the resist.
- **L6.** **Post-exposure bake (PEB)**, because in a chemically amplified resist exposure only creates acid; the bake drives the acid's deprotection chemistry that turns exposure into solubility.
- **L7.** **Develop**, dissolving the exposed (positive) or unexposed (negative) resist to leave the stencil.
- **L8.** **CD/overlay metrology** before etch, because a bad resist pattern can be stripped and reworked for the cost of a coat and an exposure, whereas a bad etch scraps the wafer.
- **L9.** **Etch**, transferring the stencil into the hard mask and then the layer beneath.
- **L10.** **Strip** the resist and hard mask residue, then **clean**, because polymer left on the sidewalls would be buried by the next deposition.
- **L11.** **Inspection** after etch, because particles and bridges are easiest to find while the layer is still the top surface and hardest to find once it is covered.

With that loop understood, the FEOL sequence itself is:

35. Incoming wafer inspection; lot formation (25 wafers per FOUP); scribe laser mark. (05)
36. Pad oxide growth (~5–10 nm thermal) and pad nitride deposition (~80 nm LPCVD); the oxide cushions the stress of the nitride, and the nitride is the CMP stop for the STI polish. Nanosheet nodes: before this, an epitaxial Si/SiGe superlattice (3–4 pairs, ~5–8 nm each) is grown on the wafer. The silicon-germanium layers are sacrificial: they hold the silicon layers apart during patterning and are etched away at step 50 to leave the gaps the gate will later fill, so the "fin" that is patterned next is really this stack. (06, 11)
37. Fin (or active) patterning: SAQP or EUV to define fins at ~26–30 nm pitch; fin cut. The fins are the transistor channels, so this pitch sets how many channels fit per cell. (07, 08)
38. Fin etch: anisotropic Si etch ~100–150 nm deep. (09)
39. STI fill with flowable CVD oxide; densification anneal; CMP to nitride. The oxide-filled trenches isolate neighbouring transistors so that leakage cannot flow between them through the bulk silicon. (06, 09)
40. STI recess etch to reveal fin height (~50 nm): the oxide is etched back so that the upper part of each fin stands proud and can be wrapped by the gate. (06, 11)
41. Well implants (n-well, p-well, deep well) with photoresist masks; Vt-adjust implants. The wells create regions of opposite doping so that PMOS transistors can be built in n-type silicon and NMOS in p-type on the same wafer. (10)
42. Well anneal (RTA), to repair implant damage and activate the dopants. (10)
43. Dummy gate stack: thin oxide, amorphous-Si dummy gate deposition, hard mask (SiN). The dummy is a placeholder: the real metal gate cannot survive the ~1,000 °C source/drain anneal, so a sacrificial silicon gate holds the space through the hot steps. (06)
44. Gate patterning at ~45–50 nm CPP (EUV or SADP); gate cut, which severs the long gate lines between cells. (07, 08)
45. Dummy gate etch (high selectivity to STI and fins), so that the etch stops on the fin without thinning it. (09)
46. Spacer deposition (ALD SiOCN/SiN, ~5 nm) and anisotropic spacer etch, which leaves the film only on the gate sidewalls. The spacer sets the distance from gate to source/drain: too thin and the gate shorts or overlaps the drain, too thick and the added resistance slows the transistor. Nanosheet nodes add inner-spacer formation: SiGe lateral recess then ALD fill and etch-back, placing a small dielectric plug between each sheet end and the future gate. (06, 09, 11)
47. S/D recess etch, removing the fin or sheet ends so that doped crystal can be regrown in their place. (09)
48. S/D epitaxy: SiGe:B (silicon-germanium doped with boron) for PMOS, Si:P (silicon doped with phosphorus) for NMOS, in-situ doped (the dopant is added during growth rather than implanted afterwards), selectively grown with masking of the other polarity. The regrown regions are the source and drain; the germanium in the PMOS version also compresses the channel to speed up holes. (06, 10)
49. Contact-etch-stop liner (SiN) and ILD0 (flowable oxide) deposition; CMP to expose dummy gate tops. The liner is the layer the later contact etch stops on; the ILD0 is the insulator that will surround the contacts. (06)
50. Dummy gate removal (wet or dry, selective to spacers). Nanosheet nodes: channel release, removing the SiGe between the Si sheets with a highly selective etch, so that each sheet is now free on all four sides. (09, 11)
51. Interfacial oxide (~0.5 nm chemical oxide); high-k HfO₂ by ALD (~1.5–2 nm); post-deposition anneal. This is the gate dielectric: the thin oxide gives a clean silicon interface, and the hafnium oxide gives the capacitance of a much thinner oxide without its leakage (see the EOT worked example). (06, 11)
52. Work-function metal stack by ALD (TiN, TiAl, TaN, patterned separately for NMOS/PMOS); W or Co gate fill. The work-function metals set each transistor type's threshold voltage; the tungsten or cobalt fill carries the gate signal. (06, 11)
53. Gate CMP; gate recess; SAC nitride cap. The cap lets the later contact etch overlap the gate without shorting to it. (11)
54. Final activation / reliability anneals as required (laser or millisecond anneal). (10)

> **What can go wrong:** FEOL failures are mostly about dimension. A gate-length shift of ~1 nm, from a dose drift on the scanner or a bake-plate hot spot, moves the threshold voltage by tens of millivolts across the affected wafers; it is caught first by CD-SEM in the litho loop (and the resist is reworked) and, if it escapes, by the WAT parametric test at step 67, where every wafer's Vt is measured on scribe-line transistors. A missed or misplaced fin cut or gate cut leaves two neighbouring cells joined and shorts them; it shows up as a cluster of failing dies at wafer sort with a distinctive layout signature, and the root cause is traced back through the MES to the tool and the lot. A gate dielectric grown over a crystal void (a COP) is thin at that point and fails burn-in rather than sort, which is why wafer suppliers screen for COPs before the wafer ever enters the fab.

### Stage F: MOL (Modules 11, 12)

What comes in is finished transistors buried under oxide; what goes out is transistors with metal plugs on every source, drain and gate, and a first local wiring level. The constraint is resistance: these contacts are the narrowest conductors on the chip, and contact resistance is now a large share of a transistor's total.

55. Trench contact patterning and etch to S/D epi (EUV); Ti/TiN liner; silicide (TiSi) formation, a titanium-silicon compound that gives a low-resistance contact where bare silicon would not; contact fill (W, Co, or Ru); CMP. (12)
56. Gate contact patterning and etch through the SAC cap; fill; CMP. (12)
57. M0 (local interconnect): dielectric, EUV pattern (LELE at N2), etch, barrier/liner, fill, CMP. M0 is the first wiring level and the tightest-pitch metal on the chip, which is why N2 needs two EUV exposures for it. (12)
58. Via-0 patterning and fill, the vertical connection from M0 up to M1. (12)

### Stage G: BEOL (Module 12)

What comes in is contacted transistors; what goes out is a wafer with 15–18 levels of copper wiring, pads, and a protective top layer, electrically complete. The constraint is thermal and electrical at once: nothing here may exceed ~400 °C, because copper and low-k dielectrics degrade above it, and the tightest wires are now the slowest part of most signal paths, so every level fights RC delay.

Each metal level Mx (x = 1 to ~15–18) is a dual-damascene loop: [low-k dielectric deposition (PECVD SiOCH) → etch stop → hard mask (TiN) → via litho/etch → trench litho/etch → strip/clean → TaN barrier (PVD/ALD) → Co or Ru liner → Cu seed (PVD) → Cu electroplating with superfill → anneal → Cu CMP → cap (SiCN)]. The via and trench are etched first and filled together because copper cannot be etched (see Damascene); the barrier stops copper diffusing into the dielectric; the liner makes the copper wet the wall; the cap seals the copper top. The loop is written once; steps 59–63 list the level groups to which it is applied.

59. M1 dual damascene at ~23–30 nm pitch (EUV, often LELE); the densest signal wiring, running directly over the cells. (12)
60. M2–M4 dual damascene at 28–40 nm pitch (EUV single exposure); local routing between neighbouring cells. (12)
61. M5–M8 intermediate levels at ~48–80 nm pitch (DUV immersion, some SADP); routing across blocks. (12)
62. M9–M14 semi-global levels at 80–300 nm pitch (DUV); long signal runs and clock distribution, wider so that resistance stays low over millimetres. (12)
63. M15–M17 global/power levels at ~1–2 µm pitch, thick Cu (DUV, KrF); the power grid and the longest signals, thick because they carry amps. (12)
64. Backside power (A16, Intel 18A only). This happens after the front-side BEOL is complete: the finished front side is bonded face-down to a carrier wafer so that the wafer can be flipped and thinned from the back without damaging the wiring; the silicon is thinned to expose nano-TSVs or the backs of the source/drain regions; then backside contacts and 2–4 backside metal levels are built. The purpose is to move the power grid off the crowded front-side levels, freeing them for signals and letting cells shrink. (11, 12)
65. Top aluminum or thick Cu pad layer; pad etch; the pads are where the package's bumps will land. (12)
66. Passivation: SiN/oxide stack, polyimide; pad opening etch. The stack seals the chip against moisture and scratches, opened only where a bump must touch a pad. (12)
67. WAT / parametric test on scribe-line structures. (13)
68. Wafer-level reliability screen (optional) and outgoing inspection. (13)

> **What can go wrong:** The classic BEOL failure is a void in a copper via. If the seed layer is too thin at the via bottom or the superfill additives are out of balance, the plating pinches off at the top before the bottom is full and leaves a cavity. A large void is an open circuit at wafer sort. A small one passes sort and fails later: the current crowds around the cavity, the local current density rises, and electromigration (see Black's equation) grows the void until the via opens months into service. Fabs catch the first kind with e-beam inspection of the via layer, which images voids optical inspection cannot see, and the second with the electromigration stress tests of Module 12, in which test structures are run hot at high current density so that a weak process shows up in weeks rather than years.

> **Worked example:** Cycle time and wafers in process. A leading-edge logic wafer has ~80 lithography layers (the ~70–100 loops written once above). Each layer, with its deposition, etch, clean, metrology and queue time, takes ~1.0–1.5 days of elapsed time, so the wafer needs 80 × 1.0–1.5 ≈ 80–120 days from start to finish; the course's ~90-day figure is the middle of that range, and the ~3–4 months quoted for cycle time is the same number with the non-litho steps folded in. Now apply Little's law, WIP = throughput × cycle time: a fab starting 100,000 wafers a month with a 3-month cycle time holds 100,000 × 3 ≈ 300,000 wafers on its floor at any moment, 12,000 fully loaded 25-wafer FOUP equivalents (actual carrier count is higher with partial lots), which is why the AMHS has tens of kilometres of rail.

### Stage H: Wafer sort (Module 14)

What comes in is a finished wafer; what goes out is a wafer map saying which dies work, at what speed, and which spare blocks to disable. The constraint is that this is the last cheap place to find a bad die: a die that escapes here costs ~10× more to find at each later stage (see Rule of ten).

69. Probe-card setup; sort at hot and cold temperatures with ATE (Advantest V93000), because some faults appear only at one temperature extreme. (14)
70. E-fuse programming: die ID, trims, repair (disable defective SMs, the GPU's repeated streaming-multiprocessor compute blocks, or cache blocks), so that a die with a few bad blocks becomes a lower SKU rather than scrap. (14)
71. Inking / wafer map generation (marking failed dies, once with an ink dot, now as a flag in the electronic wafer map); binning; known-good-die list. (14)

### Stage I: Wafer-level bumping (Modules 16, 17)

What comes in is a sorted wafer with aluminum or copper pads; what goes out is a wafer with a copper pillar and solder cap on every pad. The constraint is pitch: the pillars must stand ~40 µm apart without a single one bridging to its neighbour, over an area of ~800 mm² per die.

72. Repassivation and UBM: sputter Ti/Cu, pattern, electroplate Cu pillar (~25–40 µm) with SnAg cap for microbumps (GPU dies going onto interposer). The UBM (under-bump metallization) adheres to the pad and blocks tin from diffusing into it; the pillar keeps its shape during reflow where a solder ball would spread; the cap is the solder that forms the joint. (16, 17)
73. Resist strip, seed etch, reflow, bump inspection (height, coplanarity, because every pillar must touch the interposer at once). (16)
74. Bumped-wafer probe (optional re-test). (14)

### Stage J: Thinning and dicing of the logic die (Module 16)

What comes in is a bumped wafer 775 µm thick; what goes out is individual dies, thinned and in trays. The constraint is that the wafer's low-k dielectric layers are brittle and its thinned body is fragile, so cutting must not crack either.

75. Backgrind tape lamination (protecting the bumps face-down); backgrind to target thickness (~100–200 µm for CoWoS top dies); stress-relief polish or dry etch, removing the grinding damage that would otherwise seed cracks. (16)

> **Why it matters downstream:** The thickness chosen at backgrind is not a free parameter. For a die with TSVs (the HBM dies at step 81, the interposer at step 93) the grind must stop exactly where the TSVs end, because too thin cuts through them and too thick leaves them buried, which is why TTV must be under 1 µm. The die thickness then adds up the stack: twelve DRAM dies plus a base die, plus the bumps between them, must fit inside the ~720 µm that the JEDEC HBM package standard allows, which is why HBM3E dies are ~30 µm and HBM4 16-high dies must be ~20–25 µm. A thickness decision made at a grinder therefore sets how many dies a stack can hold, and hence how much memory sits beside the GPU.

76. Mount on dicing tape/frame; laser groove the low-k layers, because low-k is brittle and would chip and peel under a blade; then blade or plasma dice through the silicon. (16)
77. Die pick-and-place to trays; AOI (automated optical inspection) of die edges for chips and cracks. (16)

### Stage K: HBM manufacturing (parallel branch, Module 15)

What comes in is DRAM wafers and a base logic die; what goes out is a tested 8-, 12- or 16-high memory stack, ~720 µm tall, with ~1–2 TB/s of bandwidth through its bottom. The constraint is compound yield: every one of the 13 or 17 dies in a stack must be good, so the stack is only as good as the known-good-die test on each die. For HBM4 the base die is a logic die made by a foundry: SK hynix and Micron have theirs made at TSMC, while Samsung uses its own foundry.

78. DRAM wafer: full FEOL/BEOL on a 1β/1γ DRAM process (1T1C arrays, high-aspect capacitors; EUV on ~1–5 layers depending on maker, with Micron adopting EUV only at 1γ) at SK hynix, Samsung, or Micron. (15)
79. TSV formation: via-middle Bosch etch (~5–6 µm diameter, ~50 µm deep), oxide liner, TaN barrier, Cu fill, CMP. "Via-middle" means the TSVs are made after the transistors but before the wiring; they are the vertical wires that will carry signals through each die to the one below. (15)
80. Front-side microbump formation on the DRAM wafer, the joints to the die above. (15)
81. Temporary bond to glass carrier; backgrind to ~30 µm; TSV reveal by grind + Si etch, exposing the copper ends of the TSVs on the back; backside passivation and bump. The carrier is needed because a 30 µm wafer cannot support itself. (15)
82. DRAM wafer probe: KGD determination. (14, 15)
83. Base (logic) die: fabricated at the memory maker (HBM3E) or at TSMC on N12/N5 (HBM4); bumped, thinned, probed. It sits at the bottom of the stack and is the interface to the GPU. (15)
84. Dicing of DRAM and base dies. (15)
85. Stacking: TCB of 8/12/16 DRAM dies on the base die, either TC-NCF (film per layer) or MR-MUF (mass reflow then molded underfill); hybrid bonding for the tallest stacks. Each die's bottom bumps land on the TSV ends of the die below, so the stack is one vertical bus. (15)
86. Stack mold/underfill, grind to height (~720 µm for 12-high), stack test and burn-in, KGS (known good stack, the stack-level equivalent of KGD). (15, 18)
87. Ship HBM stacks (or DRAM KGD wafers) to the packaging site. (15)

> **What can go wrong:** One bad die scraps a 12-high stack, and it scraps it after the stack has consumed twelve good dies' worth of TSV, thinning and bonding work. For thirteen independently selected, KGD-passed dies (twelve DRAM plus base), the probability all are actually good is the product of their post-test good fractions. If each is 98% likely to be good after passing test—an illustrative 2% escape fraction, not raw wafer yield—only ~77% of stacks start with all-good dies before bonding loss (see the compound-yield worked example below). That arithmetic is why every DRAM die is probed for KGD at step 82 before it is ever stacked, why the probe includes a burn-in-like stress, and why bonding-induced failures (a misaligned microbump, a crack from the TCB force) are screened again at step 86 before the stack ships.

### Stage L: CoWoS, chip-on-wafer (Module 17)

What comes in is bumped GPU dies, tested HBM stacks, and an interposer wafer; what goes out is diced units each carrying two GPU dies and eight HBM stacks on one interposer. The constraint is size: the interposer is ~3.3 reticles across, larger than any single exposure, so its wiring is stitched and its warpage during heating is the dominant failure mode.

88. Interposer fabrication. CoWoS-S: 300 mm Si wafer, TSV etch and fill, 4–5 Cu RDL levels at 0.4–2 µm pitch on a 65 nm-class BEOL line; the interposer carries the thousands of wires between GPU and HBM that no organic substrate could hold. CoWoS-L: LSI (local silicon interconnect) bridge dies fabricated separately, then embedded in a molded organic RDL interposer with TIVs (through-interposer vias, the vertical connections through the molded body). (17)
89. Interposer front-side microbump formation. (17)
90. Chip-on-wafer: flux, place GPU dies and HBM stacks on the interposer wafer, TCB or mass reflow at ~40 µm pitch. This is where the HBM branch merges. (17)
91. Capillary underfill and cure between dies and interposer, so that the thermal-expansion mismatch is carried by the epoxy rather than by the microbumps alone. (17)
92. Overmold or gap-fill; grind to expose die backs (for lidless or direct-cool designs), so that the cold plate can touch silicon directly. (17)
93. Temporary bond to carrier; interposer backgrind to ~100 µm; TSV reveal; backside C4 bump formation, the larger bumps that will connect the interposer to the substrate. (17)
94. CoW-level electrical test. (18)
95. Debond, dice interposer into individual CoW units. (17)

> **What can go wrong:** Warpage. The interposer, the dies on it, and the mold around them all expand at different rates (see CTE), and at reflow temperature a 3.3-reticle interposer can bow enough that its corner microbumps lift away from the pads before the solder wets. The result is a "non-wet": an open joint that may pass a room-temperature test and fail when the package heats up. Engineers detect it by X-ray of the joints (a non-wet shows as a rounded, unflattened bump) and by the CoW-level electrical test at step 94, which is run before the expensive substrate is attached; they prevent it by tuning the reflow profile, choosing mold compounds that match the interposer, and by moving to TCB, which holds each die flat while its joints form.

### Stage M: Substrate (Module 16)

What comes in is copper-clad glass-epoxy laminate and ABF film; what goes out is a ~90 × 90 mm build-up substrate with 8–12 wiring layers per side. The constraint is that a laminate board must carry ~10 µm lines while staying flat enough to accept a CoW unit and warping in step with it.

96. Core: glass-epoxy laminate with Cu foil; mechanical/laser drill through-holes; plate. The core is the stiff backbone the build-up layers are stacked on. (16)
97. Build-up: laminate ABF, laser-drill microvias, desmear (removing the laser-drill residue from the via bottom so that plating can bond to the copper beneath), electroless Cu seed, dry-film pattern, electroplate (mSAP), strip, flash etch (a brief etch that removes the thin seed copper between the plated lines so that they do not short); repeat for 8–12 layers per side. Each layer fans the connections out to a wider pitch. (16)
98. Solder mask, surface finish (ENEPIG: electroless nickel / electroless palladium / immersion gold, a solderable, oxidation-proof pad finish), routing, electrical test, warpage measurement; ship (Ibiden, Unimicron, AT&S). (16)

> **What can go wrong: substrate build-up.** A laser-drilled via can miss its copper landing pad if the laminated panel shrinks or shifts. Residue at a correctly aligned via bottom can also prevent reliable copper adhesion. Optical registration and electrical continuity tests detect different parts of this problem; cross-sections reveal the physical cause. A substrate that passes room-temperature continuity can still fail after reflow if its joints are strained by warpage, so flatness must be checked over the assembly temperature profile.

### Stage N: CoWoS, wafer-on-substrate and package finish (Modules 16, 17, 18)

What comes in is a CoW unit and a substrate; what goes out is a finished, tested, binned GPU package. The constraint is that every step here handles a part already worth thousands of dollars, so the test and burn-in steps are the most expensive per unit in the whole flow and the ones with the least tolerance for escapes.

99. Flux, place CoW unit on substrate, C4 reflow or TCB. (17)
100. Underfill dispense and cure, absorbing the CTE mismatch between the silicon interposer and the organic substrate. (16, 17)
101. Stiffener ring / lid attach with TIM (indium or liquid metal); or lidless with bare-die cold plate. The ring holds the substrate flat; the lid spreads heat; the TIM fills the microscopic gaps between them. (16, 19)
102. BGA ball attach and reflow. (16)
103. Laser mark; AOI (automated optical inspection) and X-ray inspection of joints. (16)
104. Package-level final test on ATE at multiple temperatures. (18)
105. Burn-in (temperature/voltage stress, hours), which accelerates infant-mortality mechanisms by the Arrhenius factor (≈78× at 125 °C versus 55 °C for Ea = 0.7 eV) so that parts that would fail in the first month of service fail in the oven instead. (18)
106. System-level test (SLT) running real workloads, catching the escapes that ATE patterns cannot model. (18)
107. Final binning (B200 vs B200A vs down-binned SKUs); tape-and-reel or tray; ship. (18)

> **Worked example:** Compound yield. Multiply the yields of the stages a die passes through. Line yield (wafers that survive the flow) ~0.95. Die yield ~0.6, roughly what the yield models give for an 800 mm² die at a D0 between the mature ~0.05 and ~0.1/cm² (see the Negative binomial worked example in the Glossary). Assembly yield through CoWoS ~0.98. Final test and burn-in yield ~0.97. The product is 0.95 × 0.6 × 0.98 × 0.97 ≈ 0.54: roughly half of the GPU dies started become sellable packages, and the die-yield term dominates, which explains the strong incentive to reduce effective killer-defect density in this model. For the HBM branch the arithmetic is harsher because it multiplies per die: a 12-high stack plus base die is 13 dies, and if 98% of the KGD-passed dies are actually good (a hypothetical 2% test-escape fraction, not raw wafer yield) the stack yield before any bonding loss is 0.98¹³ ≈ 0.77. Raise KGD accuracy to 99% and the same stack yields 0.99¹³ ≈ 0.88. The leverage of better screening depends on the actual escape fraction and bonding losses; this exaggerated example isolates why KGD quality matters.

### Stage O: Module, board, server, rack (Module 19)

What comes in is finished GPU packages; what goes out is a running, monitored data center. The constraint shifts from nanometres to kilowatts: a rack draws ~120–130 kW and must be cooled by liquid, and a failed GPU can interrupt a training job using that 72-GPU communication domain; isolation and recovery depend on the job and system software.

108. SXM module PCB fabrication (HDI, high-density interconnect, 20+ layers with laser microvias) and SMT (surface-mount) assembly of VRMs, capacitors. (19)
109. GPU package attach to SXM PCB (BGA reflow), thermal solution attach, module test. (19)
110. HGX baseboard fabrication and assembly: 8 SXM sockets and the NVLink Switch chips (4 on HGX H100, 2 on HGX B200), or the GB200 compute tray equivalent with 2 Grace CPUs (NVIDIA's Arm-based server CPU) and 4 Blackwell GPUs. (19)
111. Baseboard-level test: NVLink fabric, power delivery, thermal. (19)
112. Server/tray integration: CPU, DRAM DIMMs, NICs (network interface cards: ConnectX is NVIDIA's NIC, BlueField its DPU, a data-processing unit that offloads networking and storage from the CPU), NVMe, PSUs or 48 V bus-bar interface, cold plates and manifolds. (19)
113. Server burn-in and system test. (19)
114. Rack integration (GB200 NVL72): 18 compute trays, 9 NVSwitch trays, NVLink spine cabling (~5,000 copper cables, the all-to-all fabric that makes 72 GPUs one memory domain), liquid-cooling manifolds, power shelves. (19)
115. Rack-level test: full 72-GPU NVLink domain, leak test, thermal soak. (19)
116. Crate, ship to data center (rack ~1.4 t). (19)
117. Data-center installation: row placement, facility water (CDU, coolant distribution unit, the cabinet that couples the rack's coolant loop to the building's chilled water) connection, 100+ kW power feed. (19)
118. Network fabric: InfiniBand or Ethernet scale-out (Quantum is NVIDIA's InfiniBand switch, Spectrum its Ethernet switch; plus optical transceivers). (19)
119. Bring-up, firmware, cluster validation, burn-in at scale. (19)
120. Production: model training or inference. (19)
121. Field monitoring: DPPM tracking, RMA (return merchandise authorization, the returned-failure process) analysis feeding back to fab and packaging yield engineering. (18, 13)
122. End of life: decommission, silicon and precious-metal recovery. (20)

## Who Buys From Whom

An adjacency list for representative companies. The list follows the chain from raw materials to the data center. Grouped entries show supplier and customer categories, not a claim that every listed supplier sells to every listed buyer. A specific purchasing relationship, factory location or product qualification needs its own evidence.

How to read it. Arrows (→) show the direction in which a material, service or product moves to the next customer class. Grouped examples describe a stage of the chain; only explicitly documented company-to-company purchases should be read as a specific contract. Seven role words recur. A **foundry** makes wafers for others; some foundry divisions belong to IDMs that also sell their own chips. A **fabless** company designs chips and owns no fab. An **IDM** (integrated device manufacturer) designs and fabricates its own chips. An **OSAT** (outsourced semiconductor assembly and test house) packages and tests chips for hire. An **ODM** (original design manufacturer) designs and builds servers and racks that a brand or hyperscaler sells or uses. An **OEM** (original equipment manufacturer) sells systems under its own name. A **hyperscaler** runs data centers at the scale of hundreds of thousands of servers and is the end customer. Market shares are approximate and dated "as of 2025"; they move. Each sub-list ends with a note on its choke point, the relationship in it that has no ready substitute.

### Raw materials and wafers

- **Sibelco, The Quartz Corp** (high-purity quartz) → crucible makers (Shin-Etsu Quartz, Momentive/Heraeus, Ferrotec) → CZ pullers at wafer makers.
- **Ferroglobe, Elkem, Hoshine and other silicon-metal producers** → polysilicon makers (Wacker, Hemlock, Tokuyama, OCI, GCL, Tongwei).
- **Wacker, Hemlock, Tokuyama and Xinhua Semiconductor (GCL)** (electronic-grade polysilicon) → qualified semiconductor-wafer manufacturers. The companies named here are examples of the producer category, not a list of disclosed bilateral contracts.
- **Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron** (300 mm prime and epi wafers) → TSMC, Samsung, Intel, SK hynix, Micron, SMIC, all fabs. Supplier shares depend on whether the measure is revenue, wafer area, diameter or product grade; those measures should not be combined.
- **NSIG / Shanghai Zing** (300 mm silicon wafers), with other NSIG businesses in SOI and customized wafers → semiconductor manufacturers. [NSIG product overview](https://www.nsig.com/en), checked 14 September 2026.
- **Soitec** (SOI wafers) → GlobalFoundries, STMicro, Samsung; RF-SOI to Qualcomm/Skyworks via foundries.
- **Wolfspeed, Coherent (II-VI), SICC** (SiC substrates) → STMicro, Infineon, onsemi (power devices, not in the GPU chain).
- Choke point: crucible-grade high-purity quartz comes overwhelmingly from one district, Spruce Pine, North Carolina, with no qualified substitute at volume.

### Fab consumables

- **JSR, Tokyo Ohka Kogyo, Shin-Etsu Chemical, Fujifilm, DuPont, Inpria (JSR)** (photoresists, EUV metal-oxide resists) → TSMC, Samsung, Intel, SK hynix, Micron.
- **Linde, Air Liquide, Air Products, Taiyo Nippon Sanso, SK Specialty, Merck (Versum), Entegris** (bulk and specialty gases, NF₃ (nitrogen trifluoride, the chamber-cleaning gas), WF₆ (tungsten hexafluoride, the tungsten source), precursors) → all fabs.
- **Entegris** (FOUPs, filters, CMP consumables, precursors) → all fabs; **Shin-Etsu Polymer, Miraial** (FOUPs) → all fabs.
- **Fujimi, Resonac (Showa Denko), Entegris (CMC), DuPont** (CMP slurries, pads) → all fabs; Entegris absorbed CMC Materials (Cabot Microelectronics) in 2022, and DuPont's CMP pad and slurry business (the IC1000 pad line inherited from Rohm and Haas/Dow) now sits in Qnity Electronics, DuPont's electronics spin-off (November 2025).
- **JX Metals, Honeywell, Tosoh, Materion** (sputter targets) → all fabs.
- **Hoya, AGC** (mask blanks) → **Toppan Photomask, DNP, Photronics** and captive mask shops at TSMC, Samsung, Intel → fabs.
- **Mitsui Chemicals** (EUV pellicles, under ASML license), **ASML** (EUV pellicles) → TSMC, Samsung, Intel.
- **Corning** (ULE glass, ultra-low-expansion glass, for EUV mask blanks and optics) → Hoya, AGC, Zeiss.
- Choke point: EUV mask blanks come from two Japanese companies, the ULE glass beneath them from one American one, and EUV-grade resists from a handful of Japanese suppliers.

### Equipment

- **Zeiss SMT** (EUV/DUV optics), **Trumpf** (CO₂ drive lasers), **Cymer (ASML)** (EUV source, ArF lasers), **VDL, Berliner Glas (ASML)** (frames, wafer tables), **Gigaphoton** (ArF lasers, to ASML and Nikon) → **ASML**.
- **ASML** (EUV, DUV immersion, metrology) → TSMC (~40–50% of EUV shipments, as of 2025), Samsung, Intel, SK hynix, Micron; DUV to SMIC and others under export rules. **Nikon, Canon** (DUV, i-line) → memory makers, mature fabs.
- **Applied Materials** (PVD, CVD, epi, implant, CMP, etch, e-beam inspection) → all fabs; TSMC and Samsung are its largest customers.
- **Lam Research** (etch, ALD/CVD, plating, strip) → memory makers (SK hynix, Samsung, Micron, Kioxia) ~50%+ (as of 2025); TSMC, Intel.
- **Tokyo Electron** (tracks, etch, furnaces, ALD, probers, cleaning) → all fabs; ~90% of coater/developers (as of 2025).
- **KLA** (inspection, metrology) → all fabs; TSMC is the largest customer.
- **ASM International** (ALD, epi) → TSMC, Intel, Samsung. **Kokusai** (batch furnaces, ALD) → memory makers. **SCREEN** (single-wafer clean, tracks) → all fabs. **Ebara** (CMP, pumps) → all fabs.
- **Axcelis** (ion implanters, esp. high-current and SiC) → fabs; **Applied** (Varian) leads in implant.
- **Advantest** (SoC/memory ATE, ~60%, as of 2025) → TSMC-ecosystem test houses (KYEC, ASE), NVIDIA, Samsung, SK hynix; **Teradyne** (~30%, as of 2025) → Apple ecosystem, Micron, Qualcomm.
- **FormFactor, Technoprobe, Micronics Japan (MJC)** (probe cards) → fabs and test houses; **DISCO** (dicing saws, grinders, ~70–80%, as of 2025) → OSATs, memory makers; **Besi, ASMPT, Hanmi** (die bonders, TCB, hybrid bonders) → TSMC, SK hynix, OSATs; **EV Group, SUSS** (wafer bonders) → memory makers, TSMC.
- **NAURA, AMEC, Hwatsing, ACM Research and Piotech** (etch, deposition, CMP, cleaning and plating, depending on vendor) → foundry, memory and packaging customers. A tool that performs one qualified step is not a complete node-qualified fab flow.
- **Daifuku, Murata Machinery** (AMHS) → all fabs. **Exyte, M+W, Jacobs** (fab construction) → TSMC, Samsung, Intel, Micron.
- Choke point: ASML is the only EUV tool maker, and its optics come only from Zeiss SMT and its drive lasers only from Trumpf; TCB and hybrid-bonder qualifications depend on the specific customer and process; Hanmi and Besi are important suppliers, not the only suppliers of those equipment classes.

### Design and IP

These purchases have to fit together. A licensed IP block supplies a circuit function, while the foundry PDK supplies the transistors, wiring rules and models available to implement it. The design team integrates the block and checks timing, power and physical rules with qualified EDA tools. A correct block from a different process cannot simply be pasted into the layout: hard IP must match the node, and even reusable RTL needs fresh implementation and verification.

- **Synopsys, Cadence, Siemens EDA** (tools) → NVIDIA, AMD, Apple, Broadcom, Qualcomm, all designers; also to TSMC/Samsung for PDK and OPC flows.
- **Arm** (CPU IP) → NVIDIA (Grace, Vera), Apple, Qualcomm, AWS, Ampere Computing (the CPU company). **Synopsys, Cadence, Alphawave, Rambus** (PHY/interface IP: HBM, PCIe, UCIe, SerDes; a SerDes is the serializer/deserializer circuit that drives a high-speed link, and a PHY is its physical-layer block) → NVIDIA and other fabless.
- **Empyrean** (simulation, verification and foundry-enablement tools) → circuit-design and foundry customers; tool selection follows the specific design and PDK.
- **TSMC** (PDK, design rules, reference flows) → its customers.
- Choke point: two EDA vendors hold ~70% of the market (as of 2025) and every leading-node PDK is qualified against their tools, so a design team cannot change vendor mid-node.

### Foundry and memory

- **TSMC** (wafers on N4/N3/N2; CoWoS/SoIC/InFO packaging) → NVIDIA (~$20B+ per year by 2025), Apple (largest customer at ~20–25% of revenue, as of 2025), AMD, Broadcom, Qualcomm, MediaTek, Marvell, Intel (some products), Google/AWS/Microsoft custom ASICs via design and ASIC service partners such as Broadcom, Marvell, Alchip and GUC.
- **Samsung Foundry** (SF3/SF2 wafers) → Samsung LSI (Samsung's own chip-design division), Qualcomm (some), Google Tensor (historically, the Pixel phone processor), Tesla, crypto ASICs. **Intel Foundry** (18A) → Intel products, Microsoft, external test chips; **Intel packaging (EMIB/Foveros)** → Intel, AWS, external.
- **SMIC** (mature, specialty and advanced logic processes) → fabless customers, including Huawei HiSilicon in teardown-documented products. **Hua Hong** (specialty processes) → embedded-memory, power, analog and other chip customers. **Rapidus** (2 nm, from 2027) → target Japanese and US customers. **GlobalFoundries, UMC** (mature nodes) → automotive, RF, analog customers.
- **SK hynix** (HBM3E/HBM4, ~50–60%, as of 2025) → NVIDIA (primary), AMD, Broadcom; **Micron** (HBM3E/HBM4) → NVIDIA, AMD; **Samsung** (HBM3E/HBM4) → AMD, Google, NVIDIA (qualification-dependent). Note that TSMC often takes delivery of HBM for CoWoS assembly on NVIDIA's account.
- **Kioxia, SanDisk, Samsung, SK hynix (Solidigm), Micron and YMTC** (NAND) → storage-device makers → system builders. **CXMT** (DDR/LPDDR DRAM) → memory-module and device customers. Conventional DRAM, NAND and HBM are separate product and qualification markets.
- Choke point: TSMC makes >90% of leading-edge logic wafers and all CoWoS, and SK hynix supplies most of the HBM that goes into them (as of 2025).

### Packaging, substrates, test

- **Ajinomoto** (ABF) → Ibiden, Unimicron, Shinko, AT&S, Kinsus, Nan Ya PCB, Samsung Electro-Mechanics. **Mitsubishi Gas Chemical, Hitachi Chemical (Resonac)** (core laminates: BT, bismaleimide-triazine resin, and HDI grades) → substrate makers.
- **Ibiden, Unimicron, Shinko, AT&S, Kinsus, Nan Ya PCB, Samsung Electro-Mechanics** (build-up substrates) → TSMC (for CoWoS WoS), Intel, AMD, NVIDIA via TSMC/OSATs.
- **TSMC (CoWoS)** → NVIDIA; overflow CoW and WoS steps → **ASE/SPIL, Amkor** under TSMC qualification. **ASE, Amkor, JCET, PTI, Tongfu** (OSAT) → AMD, Qualcomm, MediaTek, NVIDIA (test and non-CoWoS parts).
- **KYEC, ASE, Amkor** (final test, burn-in, SLT services) → NVIDIA, MediaTek, AMD. **Sumitomo Bakelite, Resonac, Kyocera** (mold compounds), **Namics, Henkel** (underfills), **Indium Corp., Honeywell** (TIMs, indium) → OSATs and TSMC.
- **Resonac, Lintec, Nitto** (backgrind and dicing tapes) → OSATs, memory makers.
- Choke point: essentially every build-up substrate uses Ajinomoto's ABF, made by one company; and final test and burn-in capacity for NVIDIA-class parts is concentrated in KYEC and ASE, so a test-capacity shortage delays shipments as surely as a wafer shortage.

### System

- **NVIDIA** (GPU packages, SXM modules, HGX boards, NVSwitch, ConnectX/BlueField NICs, Spectrum/Quantum switches, reference designs) → ODMs and OEMs (Foxconn/Ingrasys, Quanta/QCT, Wistron/Wiwynn, Inventec, Supermicro, Dell, HPE, Lenovo) → hyperscalers (Microsoft, Google, Amazon, Meta, Oracle, xAI, CoreWeave) and enterprises.
- **Unimicron, Ibiden, TTM, Gold Circuit (GCE), WUS** (HDI PCBs); **Monolithic Power Systems, Infineon, Renesas, Vicor, Delta** (VRMs, power stages, power shelves); **Vertiv, CoolIT, Asetek, Boyd, Auras, AVC** (cold plates, CDUs); **Amphenol, TE Connectivity, Molex** (NVLink spine connectors and cables); **Samsung, SK hynix, Micron** (LPDDR5X for Grace, DDR5 DIMMs); **Broadcom, Marvell, Coherent, InnoLight, Eoptolink** (optical transceivers and DSPs) → **Foxconn, Quanta, Wistron, Inventec** (SXM/HGX assembly, compute trays, NVL72 racks).
- **Vertiv, Schneider Electric, Eaton** (data-center power and cooling) → hyperscalers, colocation providers.
- Choke point: NVIDIA itself, which held ~80%+ of AI accelerators (as of 2025) and whose reference designs set what the ODMs build.

## What to Learn Next

For the reader this course was written for, a rough order helps: start with the free video and web sources, then the accessible fab text, then the two lithography books, and go to the device-physics texts last, with Module 11 open. Items marked (free) cost nothing.

### Books

Reading order for this group: van Zant first for the fab as a whole, then Quirk and Serda for each unit process, then Mack for lithography, then Sze and Ng or Taur and Ning for device physics; Chip War before Nenni for the business history.

- **Chris Mack, *Fundamental Principles of Optical Lithography* (Wiley, 2007).** The single best treatment of imaging, resist chemistry, and process windows; everything in Modules 07 and 08 sits on top of it. Mack's free lecture series on YouTube covers the same ground (free).
- **S. M. Sze and Kwok K. Ng, *Physics of Semiconductor Devices* (3rd ed., Wiley, 2006).** The reference for MOSFET operation, short-channel effects, and every device equation used in Module 11. Dense; read with Module 11 open.
- **Michael Quirk and Julian Serda, *Semiconductor Manufacturing Technology* (Prentice Hall, 2001).** Dated in specifics (200 mm era) but still the clearest walk through every unit process and the structure of a fab; good for Modules 05–10.
- **James Plummer, Michael Deal, Peter Griffin, *Silicon VLSI Technology: Fundamentals, Practice and Modeling* (Prentice Hall, 2000).** Deal-Grove, diffusion, implant, and process simulation with real derivations.
- **Chris Miller, *Chip War* (Scribner, 2022).** The history and geopolitics behind Module 20: how TSMC, ASML, and the export-control regime came to be.
- **Daniel Nenni and Paul McLellan, *Fabless: The Transformation of the Semiconductor Industry* (SemiWiki, 2014).** How the foundry/fabless split happened, from the people who watched it.
- **John Y. Chen, *CMOS Devices and Technology for VLSI*; and Yuan Taur and Tak Ning, *Fundamentals of Modern VLSI Devices* (Cambridge, 2nd ed. 2009).** Taur and Ning is the device-physics text used in most graduate courses.
- **Rao Tummala, *Fundamentals of Microsystems Packaging* (McGraw-Hill, 2001) and John Lau, *Semiconductor Advanced Packaging* (Springer, 2021).** Lau's books are the most current on CoWoS, hybrid bonding, and fan-out.
- **Peter van Zant, *Microchip Fabrication* (6th ed., McGraw-Hill, 2014).** Accessible entry-level fab text; the right first book.
- **Vivek Bakshi (ed.), *EUV Lithography* (2nd ed., SPIE Press, 2018).** Source, optics, masks, resists from the people who built them.
- **Harry Levinson, *Principles of Lithography* (4th ed., SPIE Press, 2019).** Companion to Mack; strong on overlay, metrology, and practical process control.

### Sites, newsletters, and channels

Reading order for this group: Asianometry for the mechanisms, then WikiChip and TechInsights for the numbers, then SemiAnalysis and Fabricated Knowledge for the economics; all but the paid tiers are free.

- **SemiAnalysis** (Dylan Patel et al.): the deepest public coverage of CoWoS capacity, HBM, GPU cost breakdowns, and fab economics; free articles, paid tiers for the detailed models.
- **Asianometry** (YouTube, Jon Y): mechanism-level video explainers on nearly every stage covered in this course, with excellent history (free).
- **SemiWiki**: Daniel Nenni's community site; conference reports (IEDM, VLSI, SPIE), node analyses by Scotten Jones (IC Knowledge), and forum discussion (free).
- **TechInsights**: teardown-based node analyses and the measured pitch/density numbers cited in this course; the *Logic* reverse-engineering subscriptions and the *Chip Observer* market-data product (mostly paid; some free summaries).
- **Semiconductor Engineering** (semiengineering.com): daily technical journalism across manufacturing, packaging, test, and EDA; its Knowledge Center is a good glossary complement (free).
- **WikiChip** and *WikiChip Fuse*: process node tables (CPP, MP, cell heights) and microarchitecture pages (free).
- **Angstronomics**: occasional but very detailed process-node deep dives (e.g. the N5 density analysis referenced in Module 11) (free).
- **Fabricated Knowledge** (Doug O'Laughlin), **Semiconductor Digest**, **EE Times**, **Tom's Hardware / AnandTech archives** (Anton Shilov's node coverage) (free, some paid tiers).
- **Chris Mack's lithoguru.com**: lectures, tutorials, and the "Lithography Expert" columns (free).
- **Company technical pages**: ASML product pages and annual reports; TSMC Technology Symposium summaries; Intel Foundry process briefs; Lam Research and Applied Materials blogs on etch and deposition; KLA's process-control tutorials; SK hynix Newsroom on HBM (free).

### Conferences and proceedings

Reading order for this group: IEDM and VLSI first, because that is where the node tables in this module come from; then SPIE Advanced Lithography for Modules 07–08 and ECTC for Modules 15–17. Proceedings are paid through IEEE Xplore and SPIE, but the headline papers are usually summarized free on SemiWiki and WikiChip.

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

Reading order for this group: the free nanoHUB and MIT OpenCourseWare material first, then the Coursera device courses, then the Stanford fabrication course notes alongside Plummer's book.

- **MIT 6.012 / 6.720 (Microelectronic Devices and Circuits; Integrated Microelectronic Devices)** on MIT OpenCourseWare (free).
- **Stanford EE212 (Integrated Circuit Fabrication Processes)** and **EE216 (Principles and Models of Semiconductor Devices)**; Plummer's course notes accompany the Silicon VLSI Technology text.
- **Purdue nanoHUB-U**: *Fundamentals of Nanotransistors* (Mark Lundstrom) and *Nanoscale Transistors*; free, with device simulators (free).
- **Georgia Tech / Packaging Research Center** short courses on advanced packaging.
- **SEMI University** and **SEMI Standards** training for manufacturing and equipment.
- **Coursera / edX**: *Introduction to Semiconductor Devices 1 and 2* (KAIST), *Nanotechnology and Nanosensors* (Technion), *Digital VLSI Design* offerings; useful for the design side of Module 19 (free to audit).
- **Chris Mack's lithography lectures** (free, YouTube, ~30 lectures covering his book) (free).
- **IEEE EDS Distinguished Lecturer recordings** (free) and **SPIE short courses** attached to the conferences above.

## Summary

- Node names are model years, not sizes; the physical numbers are CPP (~45–50 nm, flat since N5), minimum metal pitch (~23–32 nm) and MTr/mm² (a library figure real chips reach 50–70% of).
- The chain spans ten orders of magnitude, from a 2 m rack to a 0.2 nm atom; printed dimensions depend on wavelength, k1 and NA together; the smallest film thicknesses are set by deposition and etch.
- Every patterned layer is one litho-etch loop (coat, expose, bake, develop, measure, etch, strip, clean, inspect), repeated ~70–100 times; at 1.0–1.5 days per layer that is the ~90-day cycle time, and Little's law puts ~300,000 wafers inside a 100,000 wspm fab.
- FEOL builds the transistor (isolation, wells, fins or sheets, dummy gate, spacers, S/D epi, replacement metal gate); MOL connects it; BEOL wires it in 15–18 copper damascene levels; backside power (A16, 18A) moves the power grid under the transistor.
- Copper is inlaid (damascene) because it cannot be plasma-etched; the tightest wires now dominate delay through RC, so low-k, airgaps and thinner barriers matter as much as transistors.
- Yield falls exponentially with die area times defect density: an 800 mm² die at D0 = 0.1/cm² yields ~45% (Poisson) to ~50% (negative binomial), which is why reticle-sized GPUs bin, repair and go to chiplets.
- At equal energy dose, EUV delivers about 14× fewer photons than ArF; the selected 20 mJ/cm² versus 30 mJ/cm² examples give roughly 20× fewer (~14 versus ~290 photons/nm²). Photon statistics, chemistry and optics all limit usable feature size and dose.
- HBM stacks 8–16 thinned DRAM dies on a base die with TSVs so that a bus 1,024 or more bits wide can run over 40 µm microbumps; one bad die scraps the stack (0.98¹³ ≈ 0.77), so known-good-die test is the gating step.
- CoWoS places GPU dies and HBM on a silicon or organic interposer (chip-on-wafer), then on a build-up substrate (wafer-on-substrate); warpage and bump non-wets on a 3.3-reticle interposer are the failure modes.
- Cost per transistor fell ~25% from N5 to N3E but rose ~30–35% from N3E to N2 on list-price estimates; litho's share of wafer cost has grown to ~35–40%.
- The chain has single points of failure at every level: Spruce Pine quartz, Ajinomoto ABF, Zeiss optics, ASML EUV, TSMC CoWoS, SK hynix HBM.

## Key Numbers

| Quantity | Value | Why it matters |
|---|---|---|
| Wafer diameter / thickness / mass | 300 mm / 775 µm / ~127 g | Every tool, FOUP and recipe in the fab is built around this one disc; starting thickness provides handling rigidity; packaging removes part of it according to the product |
| Si lattice constant / melting point | 0.543 nm / 1,414 °C | The lattice constant is the bottom rung of the scale ladder; the melting point sets the crucible chemistry and the oxygen content of CZ silicon |
| Reticle field | 26 × 33 mm = 858 mm² (0.33 NA); 26 × 16.5 mm (High-NA) | Conventional single-field dies must fit; specialized stitched wafer-scale chips exceed this. High-NA halves the field. |
| ArF / EUV wavelength | 193 nm / 13.5 nm | NA 1.35 / 0.33 and 0.55; resolution depends on wavelength together with k1 and NA; deposition and etch set other device dimensions |
| Rayleigh resolution, k1 limit | half-pitch = k1·λ/NA; k1 ≥ 0.25 | ~36 nm half-pitch (~76–80 nm pitch in practice) ArFi; ~10 nm half-pitch (~26 nm pitch in practice) 0.33 NA EUV; ~6 nm half-pitch (~16 nm pitch) High-NA. Decides which layers need EUV and which need double patterning |
| Photons per nm² at production dose | ~14 (EUV, 20 mJ/cm²) vs ~290 (ArF, 30 mJ/cm²) | ~20× fewer photons at these different doses (~14× at equal dose); photon statistics and resist chemistry constrain dose reduction |
| CPP / MP at N2 | ~45 nm / ~23–25 nm | CPP flat since N5, so all remaining density comes from metal pitch, cell height and DTCO |
| Gate length / nanosheet thickness / EOT | ~12–16 nm / ~5–8 nm / ~0.8–1.0 nm | 2 nm class; these are the dimensions that must hold sub-nanometre control across a 300 mm wafer |
| Density N7 / N5 / N3E / N2 (HD, MTr/mm²) | ~91 / ~138–171 / ~200–215 / ~230–250 (estimates up to ~313) | Real chips at 50–70%; density gain per node has fallen to ~1.15–1.3× |
| Wafer price N7 / N5 / N3 / N2 | ~$10k / ~$16–17k / ~$18–20k / ~$30k | Reported price estimates, ~2025; compare product-specific density and yield to determine cost per transistor |
| Cost per good N2 die (~800 mm²) | ~$30k wafer ÷ (~65 candidate dies × ~45% yield) ≈ ~$1,000 per good die | Silicon is a minority of a finished GPU's cost once HBM, CoWoS, test and margin are added; yield, not wafer price, is the lever |
| Mask set cost, leading node | ~$20–30M | 70–100+ masks; a design respin costs a mask set, which is why verification dominates design effort |
| Fab cost / capacity | $20–30B / ~100,000 wspm | Per GigaFab phase-set; the fixed cost that makes utilization the foundry's profit lever |
| Process steps / cycle time | 1,000–1,500 / ~90 days | Leading-edge logic; a demand change today shows up in supply a quarter later |
| Little's law WIP | ~300,000 wafers | 100k wspm × 3 months; the inventory that a cycle-time cut releases |
| D0, mature vs ramp | ~0.05–0.1 vs ~0.5 /cm² | Killer defects; D0 is a key input to the selected defect-yield model; clustering, repair and parametric yield also matter |
| Poisson yield, 800 mm² die at D0 = 0.1 | e^(−8 × 0.1) ≈ 45% | Why big dies bin and repair, and why chiplets exist |
| EUV tool price / throughput | Price estimates ~$200M (NXE:3800E), ~$380M (EXE:5200); NXE:3800E November 2024 specification: 220 wph at 30 mJ/cm² | Layer cost depends on dose, utilization and multipatterning displaced; these prices are reported estimates |
| EUV layers per node | N7+ ~4; N5 ~14; N3 ~20+; N2 ~25+ | Approximate; roughly doubles every two nodes, taking litho's share of wafer cost to ~35–40% |
| HBM die thickness / TSV diameter / microbump pitch | ~30 µm / ~5–10 µm / ~40 µm | HBM3E 12-high; the die thickness is set by the 720 µm stack-height cap, and the pitch by what a solder cap can hold |
| Hybrid bond pitch | ~6–9 µm today; ~1 µm roadmap | SoIC; the pitch that lets dies be stacked without solder and with ten times the connection density of microbumps |
| Blackwell package | 2 × ~800 mm² dies, 208 B transistors, 8 × HBM3E, CoWoS-L | A large multi-die accelerator package where the preceding process constraints meet |
| GB200 NVL72 rack | 72 GPUs, ~120–130 kW, ~1.4 t | Liquid cooled; the power density that forces CDUs and cold plates on the data center |
| Burn-in acceleration (Arrhenius) | AF ≈ 78× at 125 °C vs 55 °C for Ea = 0.7 eV | Equivalent aging applies only to the modeled failure mechanism; other activation energies give different factors |
| Arrhenius AF, worked value | ≈ 78 at 125 °C vs 55 °C, Ea = 0.7 eV | 10 h of burn-in ≈ 780 h (about a month) of field use; the number behind the row above |
| Rule of ten | Escape cost ×10 per stage | A $1 escape at wafer sort becomes a $10,000 failure in the field; test is cheap relative to the stage after it |

## Key Players

A reference directory of representative companies across the chain. It includes suppliers from multiple regions and is neither exhaustive nor a common revenue ranking. Country labels describe the company's main base; manufacturing sites, ownership and customers can span other countries. A product offered by one supplier is not automatically qualified for every fab or chip. Existing market-share estimates retain their stated dates; the added capability references were checked on 14 September 2026.

Legend for the Stage column: **Raw materials** and **Materials** supply what fabs consume; **Wafers** make the silicon discs; **Equipment** makes the tools (sub-tier means a supplier to a tool maker); **Test** and **Packaging equipment** make the back-end tools; **Design** sells EDA software and IP; **Foundry** makes wafers for others; **IDM** designs and fabricates its own chips; **Memory** is the DRAM/NAND/HBM makers; **Packaging** makes substrates; **OSAT** assembles and tests for hire; **Test services** is final test and burn-in for hire; **Fabless** designs chips and owns no fab; **System** builds modules, servers and racks; **End customer** buys and runs them. "Position" is an approximate 2025 market position, not a revenue ranking in every row; fast-moving rows carry a (2025) tag.

| Company | Country | Stage | What they supply | Position |
|---|---|---|---|---|
| Sibelco / The Quartz Corp | Belgium / Norway-France | Raw materials | High-purity quartz (Spruce Pine) | Dominant in crucible-grade HPQ |
| Ferroglobe | Spain-UK | Raw materials | Metallurgical-grade silicon | Silicon-metal supplier; further purification is needed for chip feedstock |
| Elkem | Norway | Raw materials | MG-Si, silicon-based materials | Silicon and silicon-based materials producer |
| Hoshine Silicon | China | Raw materials | Industrial silicon and silicon-based materials | Industrial-silicon producer |
| Xinhua Semiconductor (GCL) | China | Raw materials | Electronic-grade polysilicon | Part of GCL's semiconductor-materials business |
| NSIG / Shanghai Zing | China | Wafers | Semiconductor silicon wafers, including 300 mm | Wafer supplier; NSIG also includes SOI and customized-wafer businesses |
| Wacker Chemie | Germany | Raw materials | Electronic-grade polysilicon | Established electronic-grade polysilicon supplier |
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
| Ajinomoto | Japan | Materials | ABF build-up film | ~95% of high-performance substrate insulation (company-reported) |
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
| NAURA / AMEC | China | Equipment | Deposition and etch / dielectric and conductor etch | Process-equipment suppliers |
| Hwatsing | China | Equipment | CMP and wafer-processing equipment | Supplies planarization tools |
| Skyverse | China | Equipment | Wafer inspection and optical metrology | Product families include defect, film and overlay measurement |
| AccoTEST (Beijing Huafeng) | China | Test | Analog, mixed-signal, power and SoC test systems | Commercial ATE supplier |
| Synopsys | USA | Design | EDA, IP | #1 EDA |
| Cadence | USA | Design | EDA, IP | #2 EDA |
| Siemens EDA | Germany-USA | Design | EDA (Calibre DRC/LVS) | #3 EDA; leader in signoff |
| Empyrean | China | Design | Circuit simulation, physical verification and foundry-enablement tools | Design and foundry-software provider |
| Arm | UK | Design | CPU IP (Grace, Vera) | Dominant CPU IP |
| TSMC | Taiwan | Foundry, packaging | N4/N3/N2/A16 wafers; CoWoS, SoIC, InFO | >90% of leading-edge logic; ~65–70% foundry revenue (2025) |
| Samsung Electronics | Korea | Foundry, memory | SF3/SF2 wafers; DRAM, NAND, HBM | #2 foundry (2025); #1–2 DRAM revenue (traded the lead with SK hynix through 2025); #1 NAND |
| Intel / Intel Foundry | USA | IDM, foundry | 18A/14A wafers; EMIB, Foveros | #3 leading edge; first High-NA user; 18A in production, 14A in development (2025) |
| SMIC | China | Foundry | Mature and specialty processes; FinFET and N+2/N+3 logic | Commercial foundry; advanced logic identified in physical chip analysis |
| Hua Hong | China | Foundry | Embedded memory, power, analog and other specialty processes | Specialty-foundry supplier |
| Rapidus | Japan | Foundry | 2 nm GAA (HVM target 2027) | New entrant |
| GlobalFoundries / UMC | USA / Taiwan | Foundry | Mature and specialty nodes | #3–4 foundries by revenue |
| SK hynix | Korea | Memory | DRAM, NAND, HBM3E/HBM4 | #1 HBM (~50–60%, 2025); #1–2 DRAM revenue (2025) |
| Micron | USA | Memory | DRAM, NAND, HBM3E/HBM4 | #3 DRAM; ~20%+ HBM (2025) |
| Kioxia | Japan | Memory | NAND | #2–3 NAND |
| CXMT | China | Memory | DRAM, including DDR5 and LPDDR5X | Conventional DRAM product supplier |
| YMTC | China | Memory | 3D NAND using Xtacking bonded array and peripheral wafers | NAND architecture and product supplier |
| Ibiden | Japan | Packaging | Build-up substrates | #1 high-end substrates |
| Unimicron | Taiwan | Packaging | Build-up substrates, HDI PCBs | #2 high-end substrates |
| Shinko / AT&S | Japan / Austria | Packaging | Build-up substrates | Top 5 substrates |
| ASE (incl. SPIL) | Taiwan | OSAT | Assembly, test, CoWoS overflow | #1 OSAT |
| Amkor | USA | OSAT | Assembly, test, 2.5D | #2 OSAT |
| JCET | China | OSAT | Assembly, test, XDFOI heterogeneous integration | International manufacturing network; reported XDFOI production |
| KYEC | Taiwan | Test services | Final test, burn-in for NVIDIA-class parts | Leading Taiwan test house |
| NVIDIA | USA | Fabless, system | GPUs, NVLink/NVSwitch, NICs, HGX, NVL72 designs | ~80%+ of AI accelerators (2025) |
| Huawei / HiSilicon | China | Fabless, system | Kirin chips, Ascend accelerators and Atlas systems | Accelerator and computing-systems developer |
| AMD | USA | Fabless | MI300/MI350 GPUs, EPYC CPUs | #2 merchant AI accelerators (2025) |
| Broadcom / Marvell | USA | Fabless | Custom AI ASICs, networking, SerDes | Leaders in custom ASIC |
| Apple / Qualcomm / MediaTek | USA / USA / Taiwan | Fabless | SoCs; largest TSMC customers by wafer volume | Top TSMC customers |
| Foxconn (Hon Hai / Ingrasys) | Taiwan | System | SXM/HGX assembly, servers, NVL72 racks | #1 NVIDIA system builder |
| Quanta (QCT) / Wistron (Wiwynn) / Inventec | Taiwan | System | HGX boards, servers, racks | Top NVIDIA ODMs |
| Supermicro / Dell / HPE | USA | System | AI servers and racks | Leading OEMs |
| Monolithic Power Systems / Infineon / Vicor | USA / Germany / USA | System | VRMs, power stages, 48 V conversion | Leaders in GPU power delivery |
| Vertiv / CoolIT / Asetek | USA / Canada / Denmark | System | Liquid cooling, CDUs, cold plates | Leaders in rack cooling |
| Amphenol / TE Connectivity | USA / Switzerland | System | NVLink spine cables, connectors | Leaders in high-speed interconnect |
| Microsoft / Google / Amazon / Meta / Oracle / CoreWeave | USA | End customer | Hyperscale data centers | Largest GPU buyers |

## Common Misconceptions

- "A 3 nm chip has 3 nm features" → The node name does not specify a universal physical dimension. The gate is ~12–16 nm long, CPP is ~48 nm, the tightest metal pitch ~23 nm; the name is a model year.
- "Contacted poly pitch means the gate is polysilicon" → The gate has been metal since the 45 nm generation (HKMG, 2007); "poly" survives in the name only.
- "MTr/mm² is what a real chip achieves" → It is a library figure at 100% utilization; real chips reach 50–70% of it (the H100 reaches ~70%).
- "Wafer price divided by dies per wafer is the chip's cost" → That gives the cost of silicon per gross die; yield roughly halves the good dies, and packaging, HBM, test and burn-in typically double the cost again before a GPU is sellable.
- "CDU, LSI, substrate, passivation and track each mean one thing" → Each has two meanings in this course (critical dimension uniformity or coolant distribution unit; local silicon interconnect or Samsung's design arm; package board or bulk crystal; final dielectric or Bosch sidewall polymer; litho tool or cell height); the Glossary says which is in play.
- "EUV replaced DUV" → ~75–85% of a leading-node mask set is still DUV; EUV takes only the ~14–25+ tightest layers.
- "A smaller node always means a cheaper transistor" → Cost per transistor fell ~25% from N5 to N3E and then rose ~30–35% from N3E to N2 on list-price estimates; it has flattened or risen since N3E.
- "The rack-to-atom chain is a few orders of magnitude" → It is ten, from a 2 m rack to a 0.2 nm atom, roughly Earth's diameter to a millimetre grain of sand.

## Where This Fits in the Supply Chain

This module has no inputs or outputs of its own; it is the index to everything that does. Module 20 closed the course by putting prices, market shares, and geopolitical exposure on the chain that Modules 01 through 19 built step by step, and this reference collects the vocabulary those modules introduced (the Glossary, with its worked examples at the formula entries), the units and sizes they quoted (the Units and Sense of Scale section), the numbers behind each process generation (the Node Table), the ordering they followed (the Master Process Flow, which begins with the quartz of Module 01 and ends with the rack of Module 19, with its failure modes and yield arithmetic), and the commercial relationships that tie the ~60 companies together (Who Buys From Whom and the master Key Players table). The Before you start list is the minimum a newcomer needs to use the tables; the Summary, Key Numbers and Common Misconceptions sections are the one-page version of the course; Further Reading names the data sources behind the tables. When a term or figure in any earlier module is unclear, this is the place to look it up; when the course is finished, the What to Learn Next section is the path forward into the primary literature, the conferences where nodes are disclosed, and the analysts who track the chain in real time.

## Further Reading

The tables in this module are compiled from the following sources, which are also where to check a number that has moved since ~2025:

- **WikiChip** process node pages: CPP, metal pitch, fin pitch and cell heights for every node in the Node Table up to N5/Intel 4.
- **TechInsights** logic teardown reports: the measured pitches and densities (the "measured" figures in the Node Table) and the DRAM node classes.
- **ASML** product pages and annual report: NXE:3800E and EXE:5200 specifications, NA, field size, throughput in wph, and EUV shipment shares.
- **SEMI** WFE forecasts: the wafer fab equipment market size in the Glossary and Key Players.
- **TSMC** annual report and Technology Symposium summaries: N2, A16 and A14 timing, customer concentration, and the density claims quoted as "claimed".
- **NVIDIA** Blackwell, GB200 and HGX technical briefs: die counts, transistor counts, NVLink bandwidth, rack power and weight.
- **JEDEC** HBM standards (HBM3, HBM3E, HBM4): stack heights, die counts, bus widths and the 720 µm package limit.
- **ISO 14644-1**: the cleanroom class definitions in the Glossary.
- **SemiAnalysis** and **IBS** cost models: the wafer-price and litho-share estimates, all of which are marked "~" for that reason.

- [NIST silicon lattice-parameter reference at 22.5 °C](https://www.nist.gov/publications/certification-srm-640f-line-position-and-line-shape-standard-powder-diffraction).
- [Royal Society of Chemistry silicon properties](https://periodic-table.rsc.org/element/14/silicon).
- [Siltronic 2016 annual report, printed page 2: standard 300 mm wafer thickness](https://www.siltronic.com/fileadmin/investorrelations/Hauptversammlungen/Archiv/HV_2017/annual_report_2016_en.pdf).
- [ASML November 2024 investor presentation: dose-qualified throughput](https://www.sec.gov/Archives/edgar/data/937966/000093796624000026/exhibit994.htm).

- Supplier-directory capability references (checked 14 September 2026): [Hoshine](https://www.hoshinesilicon.com/en/gsjs/index_69.aspx.html), [Ferroglobe](https://www.ferroglobe.com/solutions/silicon-metal), [Elkem](https://www.elkem.com/products/silicon/silicon-metalloid/), [GCL issuer report naming Xinhua Semiconductor](https://www.hkexnews.hk/listedco/listconews/sehk/2023/0428/2023042801198.pdf). These establish product roles, not a like-for-like market-share ranking.
- [CXMT products](https://www.cxmt.com/en/product.html), [YMTC Xtacking](https://www.ymtc.com/en/technicalintroduction.html), [Hua Hong 2025 report](https://www.hkexnews.hk/listedco/listconews/sehk/2026/0409/2026040901618_c.pdf), [TechInsights N+3 process analysis](https://www.techinsights.com/blog/smic-n3-kirin-9030-pro-process-flow-analysis).
- [NAURA equipment portfolio](https://www.naura.com/index.html?l=english), [AMEC product brochure](https://static.amec-inc.com/uploads/f64b9adcd24b400caf459c98af4e473e.pdf), [Hwatsing CMP](https://www.hwatsing.com/en/product_detail/757.html), [Skyverse product families](https://www.skyverse.cn/?trk=public_post-text), [AccoTEST systems](https://www.accotest.com/), [Empyrean foundry tools](https://www.empyrean-tech.com/solutions/index-18.html), [JCET production update](https://www.prnewswire.com/news-releases/focusing-on-high-performance-advanced-packaging-and-global-layout-jcet-achieved-quarter-on-quarter-growth-in-q2-2023-301910156.html), [Huawei Atlas and Ascend roadmap, September 2025](https://www.huawei.com/en/news/2025/9/hc-xu-keynote-speech). Company descriptions establish offered capabilities; performance, yield and customer qualifications require more specific evidence.
