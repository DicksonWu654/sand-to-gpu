# Module 10: Doping: Ion Implantation and Annealing

A silicon wafer fresh from the crystal puller is, electrically, almost useless. Pure silicon at room temperature has about 10¹⁰ free carriers per cm³, a resistivity of ~ 2.3 × 10⁵ Ω·cm, and no way to distinguish "on" from "off." Everything a transistor does depends on placing controlled numbers of foreign atoms into specific volumes of the crystal: about 20 parts per billion for a lightly doped well, about one atom in 500 for a source/drain contact. The problem is that these atoms must go into a specific 3D box (a few nanometres deep, a few tens of nanometres wide, defined by a photoresist or hard-mask opening), they must land on lattice sites so that they donate or accept an electron, and they must do so without wrecking the crystal or wandering away during the hundreds of degrees of thermal processing that follow.

For the first thirty years of the industry this was done by baking wafers in gas containing the dopant and letting it diffuse in. Since the 1980s it has been done overwhelmingly by **ion implantation**: ionising the dopant, accelerating it to tens or thousands of kilovolts, mass-selecting it, and firing it into the wafer. Implantation is the only front-end unit process where the dose is set by an ammeter and a clock rather than by a chemical equilibrium, which is why it took over. The price is crystal damage, and the second half of this module is about the annealing step that repairs it. A leading-edge logic wafer still sees roughly 20–40 implant steps, even though the highest-concentration doping in the transistor (the source/drain) has largely moved to in-situ doped epitaxy.

## 1. The Physics of Doping

### Donors and acceptors

Silicon is column IV: each atom has four valence electrons and bonds tetrahedrally to four neighbours. Substitute a column-V atom (phosphorus, arsenic, antimony) for a silicon atom and four of its five valence electrons complete the bonds; the fifth is bound to the positive core only by a weak, hydrogen-like Coulomb attraction screened by silicon's dielectric constant (ε_r ≈ 11.7). The binding energy is ~ 45 meV for P, ~ 54 meV for As, ~ 39 meV for Sb, all well below the ~ 26 meV of thermal energy times the entropy factor at 300 K, so essentially every such atom has given up its electron to the conduction band. These are **donors**, and the material is **n-type**. Substitute a column-III atom (boron, gallium, indium, aluminium) and one bond is short an electron; the missing electron, a **hole**, is bound by ~ 45 meV (B), ~ 72 meV (Ga), ~ 160 meV (In). These are **acceptors**, and the material is **p-type**. In a band diagram the donor level sits ~ 45 meV below the conduction band edge E_C and the acceptor level ~ 45 meV above the valence band edge E_V; the Fermi level moves toward E_C in n-type and toward E_V in p-type material, and a p-n junction is simply the place where the Fermi level must be flat across a change in doping type, forcing the bands to bend and creating the built-in potential (~ 0.7–1.0 V in silicon).

The dopant only works if it sits **substitutionally** on a lattice site. An interstitial boron atom, or a boron atom paired with a silicon interstitial or clustered with other borons, contributes nothing. "Activation" in this module always means "fraction of the implanted atoms sitting on lattice sites and ionised."

Why these elements? Phosphorus and boron are the workhorses because they are small, light, have low ionisation energies, and high solid solubility. Arsenic is used where a heavy, slow-diffusing donor is needed (abrupt n⁺ junctions, and it is easy to amorphise silicon with it). Antimony diffuses even more slowly and is used for buried layers and some anti-punch-through implants. Indium and gallium were investigated for steep p-type channel profiles but their deeper acceptor levels leave a fraction un-ionised at room temperature; indium is essentially unused in modern logic, though gallium has a niche in some p⁺ contacts. Aluminium is irrelevant in silicon but is *the* p-type dopant for silicon carbide.

### Carrier concentration and resistivity

Silicon has 5 × 10²² atoms per cm³. The industry's working doping range, 10¹⁵ to a bit over 10²⁰ cm⁻³, corresponds to 20 ppb to 0.2 %. The bottom of the range is set by what a crystal grower can control (Module 2: Czochralski wafers ship at 10¹⁴–10¹⁵ cm⁻³) and by the need for the space-charge region of a junction to be wide enough for isolation; the top of the range is set by solid solubility and by the point where adding more dopant no longer lowers resistance because mobility collapses.

Resistivity is ρ = 1/(q·n·μ), with q the electronic charge and μ the carrier mobility. Mobility falls with doping because ionised dopants scatter carriers: electron mobility in silicon is ~ 1,400 cm²/V·s at 10¹⁵ cm⁻³ but only ~ 80–100 cm²/V·s at 10²⁰ cm⁻³; hole mobility ~ 470 falling to ~ 50 cm²/V·s over the same range. So 10¹⁵ cm⁻³ n-type silicon is ~ 4.5 Ω·cm and 10¹⁵ p-type ~ 13 Ω·cm, while 10²⁰ of either type is ~ 1 mΩ·cm. Six orders of magnitude of doping buy about four orders of magnitude of resistivity. This is why each region of a transistor has a characteristic doping:

| Region | Typical doping (cm⁻³) | Why |
|---|---|---|
| Substrate | 10¹⁴–10¹⁵ | as grown; low leakage, wide depletion for isolation |
| Wells | 10¹⁷–10¹⁸ | set junction depth and punch-through immunity |
| Channel / V_T adjust (planar era) | 10¹⁷–10¹⁸ | sets threshold voltage |
| S/D extensions (LDD) | 10¹⁹–10²⁰ | abrupt, shallow, low resistance but graded to limit hot carriers |
| Deep source/drain and contacts | 10²⁰–10²¹ | lowest possible series and contact resistance |
| Poly gate (legacy) | ~ 10²⁰ | avoid poly depletion |

The upper limit deserves emphasis. Boron's equilibrium **solid solubility** in silicon is ~ 1–2 × 10²⁰ cm⁻³ at 1,000 °C and rises to ~ 4 × 10²⁰ at 1,100 °C; arsenic's chemical solubility is over 10²¹ but only ~ 2–3 × 10²⁰ is electrically active because As atoms cluster around vacancies; phosphorus can reach ~ 5 × 10²⁰ active. Above these limits, extra dopant precipitates or forms inactive clusters, and the millisecond anneals discussed later exist mainly to freeze in **metastable** activation above the equilibrium limit.

## 2. Thermal Diffusion: The Original Method

Until roughly 1980, doping meant diffusion. Wafers were loaded in quartz boats into a tube furnace at 900–1,200 °C with a dopant source: POCl₃ vapour or BBr₃ for gaseous sources, or solid boron-nitride wafers interleaved with the silicon. The dopant formed a glass (phosphosilicate or borosilicate) on the surface, and the silicon underneath took up dopant at its solid solubility limit.

The mathematics is **Fick's laws**. The first law says flux is proportional to the concentration gradient, J = −D·∂C/∂x; the second, ∂C/∂t = D·∂²C/∂x², follows from conservation. The **diffusivity** D is Arrhenius: D = D₀·exp(−E_a/kT), with E_a ~ 3.5 eV for boron and phosphorus and ~ 4 eV for arsenic. Boron's D is ~ 2 × 10⁻¹⁴ cm²/s at 1,000 °C and ~ 2 × 10⁻¹³ at 1,100 °C, a factor of ten for a hundred degrees; arsenic is about ten times slower still. Diffusion length scales as √(Dt), which is the single most useful number in this module.

Two boundary conditions give the two classic profiles. **Predeposition**, with the surface held at solid solubility C_s, gives a complementary error function: C(x,t) = C_s·erfc(x / 2√(Dt)), with total dose Q = 2·C_s·√(Dt/π). **Drive-in**, where the source is removed (the glass is stripped) and a fixed dose Q is pushed deeper, gives a Gaussian: C(x,t) = (Q/√(πDt))·exp(−x²/4Dt). A two-step predep-then-drive-in sequence was how every junction in a 1970s process was made.

> **Worked example: diffusion lengths.** A 30-minute drive-in at 1,000 °C with D_B ≈ 2 × 10⁻¹⁴ cm²/s gives √(Dt) = √(2 × 10⁻¹⁴ × 1,800 s) = √(3.6 × 10⁻¹¹) ≈ 6 × 10⁻⁶ cm = 60 nm. A modern 1-second spike anneal at 1,050 °C (D_B ≈ 6 × 10⁻¹⁴) gives √(Dt) ≈ 2.4 nm. A millisecond laser anneal at 1,300 °C (D_B ≈ 4 × 10⁻¹²) for 1 ms gives √(Dt) ≈ 0.6 nm. The entire history of annealing can be read from this line: to keep a junction under 10 nm you need thermal budgets whose √(Dt) is a nanometre or two, which means either much lower temperatures or much shorter times, and shorter is the direction the industry chose because activation needs the temperature.

Diffusion lost for four reasons. First, dose control: the dose depends on surface concentration, temperature, time and gas flow, and reproducibility was a few percent at best, versus < 1 % for implantation. Second, the surface concentration is pinned at solid solubility; you cannot make a 10¹⁷ cm⁻³ layer directly. Third, diffusion is isotropic: dopant spreads sideways under the mask edge by ~ 0.8 × the junction depth, intolerable once gate lengths dropped below a micron. Fourth, the profile is always maximum at the surface; a **retrograde** profile (peak buried, low at the surface) is impossible by diffusion and is exactly what a well needs. Ion implantation solves all four. Diffusion survives today only as an unwanted side effect of annealing, and in a few specialised places (some power-device and analogue flows, and the oxidation-enhanced diffusion used deliberately in some BiCMOS processes).

## 3. Inside an Ion Implanter

An implanter is a mass spectrometer with a wafer at the detector. Ions are created, extracted, sorted by mass, accelerated to the final energy, swept over the wafer, and counted. A high-current tool is 6–10 m long, weighs ~ 15–25 tonnes, is wrapped in lead and interlocks, and costs roughly $4–8 M depending on class. Let us walk down the beamline.

### Ion source

The source is an arc-discharge plasma in a small tungsten (or tungsten-lined graphite) **arc chamber**, roughly 5 × 5 × 10 cm, with a slot for extraction. Feed gas enters at a few standard cm³/min: **BF₃** for boron, **PH₃** (phosphine) for phosphorus, **AsH₃** (arsine) for arsenic, **GeH₄** or GeF₄ for germanium, plus SiF₄, N₂, CO₂, Xe and others. Solid dopants (antimony, indium, gallium, aluminium) are evaporated from a **vaporiser** oven at a few hundred degrees and the vapour piped into the same arc chamber; Sb₂O₃ and Al are the common solids.

The two source architectures are the **Bernas** source and the **indirectly heated cathode (IHC)** source. In a Bernas source a tungsten filament sits inside the arc chamber; it is heated to ~ 2,500 K, emits electrons thermionically, and a ~ 50–120 V arc voltage between filament and chamber wall accelerates those electrons to ionise the gas. A **source magnet** of a few hundred gauss along the chamber axis makes the electrons spiral, lengthening their path and improving ionisation efficiency, and a **repeller** electrode at the far end bounces them back. In an IHC source (the industry standard for high-current tools since the late 1990s) the filament sits *behind* a thick tungsten cathode button and heats it by electron bombardment; the cathode, not the filament, faces the plasma. This keeps the fragile filament out of the corrosive fluorine plasma and roughly doubles source life, to ~ 100–300 hours between rebuilds, which matters because source maintenance is the dominant downtime item on an implanter. BF₃ plasma etches tungsten as WF₆ and redeposits it elsewhere; arsenic and phosphorus form conductive coatings that cause insulator flashovers. Source lifetime and cleanliness is a whole sub-discipline; Axcelis and Applied both sell "extended life" sources, and co-flowing a little hydrogen or a fluorine-scavenging gas is one trick used.

The plasma contains everything: B⁺, BF⁺, BF₂⁺, BF₃⁺, F⁺, B₂⁺, and both isotopes ¹⁰B (19.9 %) and ¹¹B (80.1 %). Typical arc currents are 1–5 A and arc power a few hundred watts.

### Extraction

The arc chamber sits at the **extraction voltage** relative to the first electrode, typically **30–80 kV** for a high-current or medium-current tool. Extraction is where beam current is fundamentally limited: the current density that can be pulled through the plasma sheath is bounded by the **Child-Langmuir** space-charge law, J ∝ V^(3/2) / (d²·√m). Higher extraction voltage helps (and is why tools extract at high voltage even when the final energy is low, then decelerate), a smaller gap d helps until it arcs, and heavier ions extract less current. A **suppression electrode** biased a few kV negative sits just outside the extraction slit to stop electrons from the downstream beam plasma being sucked back into the source, where they would load the supply and generate X-rays. Extraction slits are tall and narrow (e.g. 3 × 50 mm), so the extracted beam is a ribbon.

### Analyser magnet and mass resolution

The extracted beam enters a dipole **analyser magnet** (typically 60–90° bend, radius ~ 0.3–0.5 m, field up to ~ 1 T). An ion of mass m, charge q and energy qV follows a radius r = (1/B)·√(2mV/q). Only the species whose radius matches the geometry passes through the **resolving aperture** (a slit) at the magnet exit; everything else hits the walls. The magnet is set by a lookup table of B for the desired species and energy, and fine-tuned by peaking the beam current through the aperture. For a 49 amu BF₂⁺ ion at 30 keV in a 0.5 T field, r = (1/0.5)·√(2 × 49 × 1.66 × 10⁻²⁷ kg × 30,000 V / 1.6 × 10⁻¹⁹ C) ≈ 0.35 m, which is exactly the scale of a real magnet.

**Mass resolution** m/Δm is typically 60–100. Separating ¹¹B⁺ from ¹⁰B⁺ needs only m/Δm > 11 but you want clean rejection; separating ³¹P⁺ from ³⁰SiH⁺ (mass 31 also) is impossible by mass alone and is dealt with by not having silicon compounds in the source; separating ⁷⁵As⁺ from ⁷⁴Ge⁺ when a source has been used for both matters for **cross-contamination** and is why production tools are often dedicated to n-type or p-type species. The choice of ¹¹B⁺ versus ⁴⁹BF₂⁺ is about energy: BF₂⁺ at 30 keV delivers its boron atom with only 30 × (11/49) ≈ 6.7 keV, so before ultra-low-energy tools existed, BF₂ was how shallow p⁺ junctions were made, with the fluorine coming along (and, it turns out, helping to amorphise and slightly retard boron diffusion). Doubly charged ions are the opposite trick: P⁺⁺ gains twice the energy per volt, so a 200 kV terminal delivers 400 keV phosphorus at the cost of a much smaller beam current, since doubly charged fractions are only a few percent of the plasma.

### Acceleration, deceleration and the column

After mass analysis the beam is at the extraction energy. A **post-analysis acceleration column** (a stack of ring electrodes with graded voltages) adds or subtracts energy to reach the final value. A medium-current tool with a 200–300 kV terminal covers ~ 5 keV to 600+ keV with singly and doubly charged ions. Above about 1 MeV, DC voltages become impractical (corona, X-rays, insulator size), and **high-energy** implanters use a **radio-frequency linear accelerator (linac)**: a series of resonant cavities at ~ 13.56 MHz or so, each of which gives the ion a kick of a few tens of keV as it passes in phase, with Axcelis's Purion XE using a 12-stage linac to reach 4.5 MeV and the Purion XEmax extending to ~ 15 MeV with multiply charged ions. Older tools used tandem electrostatic accelerators (negative ions accelerated to a positive terminal, stripped to positive, and accelerated again) but these have largely gone.

**Deceleration** is the reverse, and it is how sub-keV implants are done: extract at, say, 5 keV where space charge permits a useful current, analyse, then slow the beam to 500 eV just before the wafer. The danger is **energy contamination**: any ion that undergoes charge exchange with residual gas (pressure is ~ 10⁻⁶ torr, but a few percent of ions still neutralise over a metre of path) before the decel stage does not decelerate and arrives at the full 5 keV, ten times deeper than intended. Since 1 % of the dose at 10 × the depth makes a tail that sets the junction depth, modern low-energy tools place a bend or electrostatic **energy filter** *after* deceleration so only ions at the correct final energy reach the wafer.

### Beam optics, the neutral trap and beam parallelism

Between magnet and wafer, quadrupole lenses shape the beam, and a **neutral trap** removes neutrals: the beam is bent by a few degrees electrostatically or magnetically, neutrals continue straight into a beam dump, and only charged particles follow the bend to the wafer. This matters because neutrals are not counted by the dose measurement system, so a beam with 3 % neutrals would give 3 % overdose. On modern single-wafer tools the final element is a **collimator** or parallelising magnet so that every ion strikes the wafer at the same angle to within ~ ±0.5°. Angular accuracy became important when the implanted structure became a fin standing on the wafer: a 1° error on a 7° tilt changes the shadowed length of a fin by ~ 15 %.

### Scanning

The beam is at most a few cm across; the wafer is 300 mm. The beam must be swept over the wafer (or the wafer past the beam) with better than 1 % dose uniformity. Three schemes coexist:

- **Electrostatic two-axis scanning** (medium-current tools): deflection plates raster the spot beam at kHz rates in x and y over a stationary wafer. Simple, but a scanned spot arrives at varying angles across the wafer unless a corrector magnet re-parallelises it, and space charge limits it to a few mA.
- **Hybrid scanning** (most modern high-current and medium-current single-wafer tools, e.g. Applied's VIISta series and Axcelis's Purion): the beam is scanned electromagnetically in one axis (or is a fixed ribbon beam wider than the wafer), and the wafer is mechanically translated slowly in the other axis on an end-station arm. The wafer velocity profile is servoed to the measured beam current so that dose stays uniform even as beam current drifts.
- **Mechanical spinning-disk batch** (classic high-current tools, e.g. the Varian E-series and Axcelis GSD/Optima HD): 13–17 wafers clamped on the rim of a ~ 1 m disk spinning at ~ 1,200 rpm while the disk is slowly translated radially through a fixed beam. Batch tools spread the beam's power (tens of mA × tens of kV = kW) over many wafers so no single wafer overheats. Almost all new tools are single-wafer, but batch disks remain in older fabs and in some high-dose applications.

### End station, tilt and twist, dose measurement

The end station holds the wafer on an **electrostatic chuck** (Coulombic or Johnsen-Rahbek) with backside gas cooling. Wafer temperature during a high-dose implant is a real concern: 20 mA at 40 kV is 800 W into a wafer with ~ 5 W/K coupling, so without cooling the wafer would rapidly exceed the ~ 100 °C above which photoresist reticulates and outgasses. The chuck sets **tilt** (angle between beam and wafer normal, commonly 0° or 7°, up to 45–60° for halo and some fin implants) and **twist** (rotation of the wafer about its normal, commonly ~ 22–23° off the notch so that the beam is not aligned with a planar channel). Multi-rotation implants (**quad** implants at 0°, 90°, 180°, 270° twist, each getting a quarter of the dose) are used whenever a tilted beam would otherwise shadow one side of a gate or fin.

**Dose** is measured by charge integration. A **Faraday cup** (a deep, biased cup that captures the beam and suppresses secondary electron escape) sits behind the wafer plane and samples the beam during the scan or between wafers; on ribbon-beam tools a travelling Faraday profiles the beam before each lot. The dose is

Q [ions/cm²] = ∫I·dt / (n·q·A),

where n is the charge state, q the elementary charge and A the scanned area. The end-station controller integrates the current and stops (or adjusts the mechanical scan speed) when the target dose is reached. Absolute accuracy is ~ 1–2 % and repeatability tool-to-tool is a few tenths of a percent, which is why implant is the reference process for dose. The sources of error are exactly the things listed above: neutrals (not counted), secondary electrons (counted as extra positive current unless suppressed), charge exchange, and beam scattered off apertures.

### Wafer charging and the flood gun

A positive-ion beam deposits positive charge on the wafer; photoresist and oxide are insulators, so the surface potential of an isolated gate can rise to tens of volts, enough to break down a 1–2 nm gate oxide or damage the high-k stack (Module 11). Beam currents of tens of mA make this severe. The fix is the **plasma flood gun** (PFG, also called an electron flood): a small xenon or argon plasma source near the wafer that delivers a bath of low-energy (< 5–10 eV) electrons, which are attracted to any positively charged region and neutralise it without having enough energy to charge it negatively. Dedicated charge monitors (CHARM test wafers with EEPROM sensors) are used to qualify tools for charging damage.

### Channeling

Silicon is a crystal, and along certain directions (the ⟨110⟩ axes are the most open, then ⟨100⟩ and the {111} and {110} planes) an ion can travel between rows of atoms, making only glancing collisions and losing energy far more slowly. A **channeled** ion goes several times deeper than the random-stopping prediction. Because a small change in angle or a little surface damage de-channels ions, channeling shows up as an irreproducible deep tail on the profile, and the entire practice of implantation is organised to suppress it:

1. **Tilt** the wafer by 7° (the classic number: enough that the beam is well away from ⟨100⟩, small enough that shadowing is modest) and **twist** by ~ 22° to miss the major planes.
2. Implant through a thin **screen oxide** (5–20 nm of SiO₂) that randomises the incoming directions. The cost is **oxygen knock-on**: recoiled oxygen atoms end up in the silicon, and the screen absorbs a fraction of a low-energy implant, so sub-keV implants are often done bare.
3. **Pre-amorphisation implant (PAI)**: implant germanium (~ 10–30 keV, 5 × 10¹⁴–10¹⁵ cm⁻²) or silicon first so the top 20–40 nm is amorphous and there are no channels at all. This gives the sharpest, most reproducible boron profiles, and is also required for millisecond and solid-phase-epitaxy anneals. Ge PAI is standard before contact implants and many extension implants.
4. Use molecular ions (BF₂⁺ or larger) whose heavy fragments amorphise the surface as they go, so the implant is self-de-channeling after the first ~ 10¹⁴ cm⁻².

## 4. Implanter Classes, Tools and Special Modes

The market is divided by beam current and energy, because the physics of space charge means no one machine can do everything.

**High-current** (dose 10¹⁴–10¹⁶ cm⁻², energy ~ 0.2–80 keV, beam current up to ~ 20–50 mA of As or P, less for B at low energy): source/drain, extensions, contacts, poly doping, PAI. Applied Materials' **VIISta HCP**, **VIISta Trident** and the older **Quantum X** dominate; Axcelis competes with **Purion H** and the newer **Purion Dragon** (the highest current tool as of ~2025) and its 300 mm ribbon-beam architecture. These are the workhorses and represent ~ half of all implanters sold.

**Medium-current** (dose 10¹¹–10¹⁴ cm⁻², energy ~ 5–600 keV with doubly charged ions, current ~ 1 µA–5 mA): wells, V_T adjust, anti-punch-through, halo, I/O devices. Applied **VIISta 900XP / 900 3D**, Axcelis **Purion M**, SMIT (Sumitomo Heavy Industries Ion Technology) **S-UHE** series and Nissin **EXCEED** series. Medium-current tools have the tightest requirements on angle control (fin implants at multiple tilts) and dose repeatability (a 1 % change in V_T-adjust dose moves V_T by several mV).

**High-energy** (0.5–15 MeV, current ~ 0.05–2 mA, dose 10¹²–10¹⁴): deep retrograde wells, triple wells in DRAM and NAND, deep photodiode wells in CMOS image sensors, isolation in power management ICs. Axcelis **Purion XE / VXE / XEmax** (4.5 / 8 / 15 MeV) and Applied **VIISta 3000XP**. Axcelis has been the historic leader here; high-energy tools are the most expensive class (~ $8 M and up) and the ones where a linac, not a DC column, is used.

**Ultra-low-energy (ULE)**: the same high-current machines run in deceleration mode to deliver B, BF₂, As or P at 0.2–2 keV for junctions of 5–15 nm. Projected range of 500 eV boron is ~ 3 nm; you cannot make a junction shallower than a few nm this way because of straggle, channeling tails and the energy-contamination issue discussed above, which is why in-situ doped epitaxy took over the shallowest layers.

**Molecular and cluster implants**: instead of a single boron atom, implant **octadecaborane B₁₈H₂₂** (SemEquip's "ClusterBoron" technology; SemEquip was acquired by Ceradyne in 2008, now part of 3M, which supplies the B₁₈H₂₂ source material to implanter vendors) or **carborane C₂B₁₀H₁₂**. A B₁₈Hₓ⁺ ion at 20 keV deposits 18 borons each at ~ 1 keV, so a 1 mA molecular beam is equivalent to 18 mA of atomic boron at a ULE energy where atomic beams are limited to a few mA by space charge. The cluster also self-amorphises the surface (no PAI needed), and the carbon in carborane co-implants a diffusion-suppressing species. Clusters are used in some DRAM and logic S/D and contact steps but never became universal, partly because the solid sources are awkward and partly because epi took the same applications.

**Cryogenic and hot implants**: wafer temperature during implant controls the balance between damage accumulation and **dynamic annealing** (defects recombining during the implant). At **−100 °C** (Applied VIISta Trident with cryo chuck), dynamic annealing is frozen out, so the amorphous/crystalline interface is sharper and, crucially, the crystalline region below it contains fewer residual defects, so after solid-phase regrowth there are fewer end-of-range defects and lower junction leakage. Cryo is used for contact and S/D PAI in some logic and DRAM flows. At **+150 to +500 °C** (hot implant) the opposite happens: the crystal heals as fast as it is damaged and never amorphises. This is essential for FinFETs and nanosheets because a fin that is amorphised through its full width has no crystalline seed left except its base and regrows as a mess of twins; hot implant keeps it crystalline. It is also mandatory for SiC, as discussed later.

**Plasma doping (PLAD)**: no beamline at all. The wafer sits on a chuck pulsed to −0.5 to −10 kV in a B₂H₆/H₂, PH₃/H₂ or AsH₃/H₂ plasma; ions from the plasma are accelerated across the sheath into the wafer from all directions, so the doping is **conformal**, reaching the sidewalls of fins and the walls of deep DRAM contact holes that a directional beam can only shadow. Doses of 10¹⁵–10¹⁶ cm⁻² take seconds, throughput is high, and there is no mass analysis, so hydrogen, fluorine and whatever else is in the plasma go in too, and dose is inferred from chuck current rather than a clean Faraday measurement. Applied's **VIISta PLAD** is the main production tool, adopted first in DRAM (polysilicon plug and buried-channel doping) and used for some FinFET extension and 3D NAND applications. Conformal doping by PLAD and by ALD-deposited dopant layers with a drive-in are the competing answers to "how do you dope the sides of a 5 nm-wide fin?"

## 5. Where the Ions Stop: Range Statistics

An ion entering silicon loses energy by two mechanisms. **Nuclear stopping**: elastic collisions with silicon nuclei, which dominates for heavy ions and at low energies, scatters the ion through large angles and displaces silicon atoms, producing damage. **Electronic stopping**: inelastic drag against the electron cloud, which dominates for light ions and at high energies (above ~ 10 keV/amu), is nearly straight-line and produces no displacement damage. **LSS theory** (Lindhard, Scharff and Schiøtt, 1963) put both on a common footing and gives the **projected range** R_p (mean depth of the stopped ions), the **projected straggle** ΔR_p (standard deviation in depth), the lateral straggle ΔR_⊥ and, for real profiles, the skewness and kurtosis that turn a Gaussian into the Pearson IV distribution used in process simulators.

To first order the as-implanted profile is a Gaussian:

N(x) = N_p · exp[−(x − R_p)² / 2ΔR_p²], with peak N_p = Q / (√(2π)·ΔR_p) ≈ 0.4·Q/ΔR_p.

Real profiles are skewed: boron, being light, backscatters and has a tail toward the surface; heavy ions have a tail into the bulk. Everybody uses **SRIM/TRIM** (Ziegler's Monte-Carlo binary-collision code, free and still the reference) or the calibrated tables inside Sentaurus Process and Victory Process for real numbers. Representative values in amorphous silicon (crystalline silicon with channeling suppressed is close):

| Ion | Energy | R_p (nm) | ΔR_p (nm) | Note |
|---|---|---|---|---|
| ¹¹B⁺ | 0.5 keV | ~ 3 | ~ 2 | ULE extension |
| ¹¹B⁺ | 10 keV | ~ 35–40 | ~ 17–20 | |
| ¹¹B⁺ | 30 keV | ~ 100 | ~ 35 | |
| ¹¹B⁺ | 100 keV | ~ 300 | ~ 65 | shallow p-well |
| ⁴⁹BF₂⁺ | 30 keV | ~ 25 | ~ 12 | boron at 6.7 keV |
| ³¹P⁺ | 30 keV | ~ 40 | ~ 18 | |
| ³¹P⁺ | 100 keV | ~ 125 | ~ 45 | |
| ³¹P⁺ | 2 MeV | ~ 2,000 | ~ 150 | image-sensor deep well |
| ⁷⁵As⁺ | 10 keV | ~ 10 | ~ 4 | shallow n⁺ |
| ⁷⁵As⁺ | 50 keV | ~ 32 | ~ 12 | |
| ⁷⁵As⁺ | 100 keV | ~ 58 | ~ 20 | |
| ⁷⁴Ge⁺ | 20 keV | ~ 17 | ~ 7 | PAI, amorphises ~ 30 nm at 10¹⁵ |

Rules of thumb: boron goes ~ 3 nm per keV at low energy, arsenic ~ 1 nm per keV over the same range, and straggle is roughly 40 % of range for light ions and 35 % for heavy ones. Lateral straggle is comparable to ΔR_p, which is why implanted junctions spread under a mask edge by ~ 0.7 ΔR_p even before any diffusion.

> **Worked example: from dose to peak concentration and junction depth.** A p⁺ extension is implanted with ¹¹B⁺ at 10 keV to a dose Q = 1 × 10¹⁵ cm⁻² into an n-well doped N_B = 1 × 10¹⁸ cm⁻³. From the table R_p ≈ 37 nm and ΔR_p ≈ 17 nm = 1.7 × 10⁻⁶ cm. The as-implanted peak is N_p ≈ 0.4 × 10¹⁵ / 1.7 × 10⁻⁶ ≈ 2.4 × 10²⁰ cm⁻³, right at boron's solubility limit, which is why 10¹⁵ cm⁻² is the canonical "high dose." The metallurgical junction is where N(x) = N_B: solve exp[−(x_j − R_p)²/2ΔR_p²] = N_B/N_p, giving x_j = R_p + ΔR_p·√(2·ln(N_p/N_B)) = 37 + 17 × √(2 × ln 240) = 37 + 17 × 3.31 ≈ 93 nm. The inverse problem is the same equation: if a device needs x_j = 15 nm at N_B = 10¹⁸ and the dose is 10¹⁵, you need ΔR_p ≈ 3 nm and R_p ≈ 5 nm, i.e. boron at well under 1 keV, or a molecular ion, or epi. Anneal then adds √(2Dt)-scale broadening on top of this and the TED effects of the next section can add tens of nanometres more.

## 6. Damage, Amorphisation and Transient Enhanced Diffusion

Each 10 keV boron ion displaces on the order of a hundred silicon atoms; each 50 keV arsenic ion displaces around a thousand. The damage per ion is characterised by **displacements per atom (dpa)** or by the deposited nuclear energy density: when it exceeds ~ 10²¹ keV/cm³ (roughly 10 % of the atoms displaced, the "critical damage density"), the silicon collapses into an **amorphous** layer. At room temperature the **amorphisation threshold dose** is ~ 1–3 × 10¹⁴ cm⁻² for Ge, As and Sb, ~ 5 × 10¹⁴–10¹⁵ for P and Si, and above 10¹⁶ for boron, which is so light that its cascades are sparse and heal by dynamic annealing before they overlap. A high-dose As or Ge implant leaves a continuous amorphous layer from the surface to roughly R_p + 2ΔR_p, with a damaged-but-crystalline region below it.

Below the amorphous/crystalline (a/c) interface lies the **end-of-range (EOR)** damage: an excess of silicon **interstitials** left because the amorphous layer above contains all the vacancies and the tail ions knocked interstitials deeper. On annealing these interstitials cluster first into small interstitial clusters, then into rod-like **{311} defects** (interstitials condensed on {311} planes, visible in TEM as lines ~ 10–100 nm long), and, if the dose was high enough, into **dislocation loops** that persist to 1,000 °C and above. EOR dislocation loops sitting inside a junction's depletion region are a leakage source and a classic yield killer.

The interstitials are also the mechanism of **transient enhanced diffusion (TED)**, the most consequential piece of physics in implant annealing. Boron and phosphorus diffuse in silicon mainly by pairing with a silicon self-interstitial (the "kick-out" and "interstitialcy" mechanisms). Equilibrium interstitial concentration at 900 °C is tiny, so equilibrium diffusion is slow. But an implant leaves roughly one excess interstitial per implanted ion (the "+1 model") sitting in {311} defects, and as these dissolve at 700–950 °C over seconds to minutes, they raise the interstitial supersaturation by 10³–10⁴ and boron diffusivity with it. A 10¹⁴ cm⁻² boron implant annealed at 800 °C for 10 min can move ~ 50 nm, while equilibrium diffusion would predict less than 2 nm. The effect is *transient* because once the {311}s have emptied, diffusivity relaxes to equilibrium; and it is *worse at lower temperature* because the interstitials are released slowly rather than annihilating rapidly at the surface. This counter-intuitive fact (a low-temperature anneal can broaden the junction more than a high-temperature one) is why the industry moved to ever hotter, ever shorter anneals: spike anneals get through the TED window in under a second at 1,050 °C, dissolving the {311}s and letting the interstitials reach the surface before boron moves far.

Boron has a second problem: at concentrations above ~ 10¹⁹ cm⁻³ in an interstitial-rich environment it forms immobile, inactive **boron-interstitial clusters (BICs)**, which are why an as-implanted 2 × 10²⁰ boron peak might show only 5 × 10¹⁹ active after a low-temperature anneal. Co-implanting **carbon** or **fluorine**, which trap interstitials, and PAI (which puts the boron inside amorphous silicon that regrows with no interstitial excess in the boron layer) are the standard mitigations.

## 7. The Annealing Zoo

The anneal has three jobs: repair the lattice, move the dopants onto substitutional sites, and do so while moving them as little as possible in space. Activation requires roughly 10 eV per atom of thermal help and wants high temperature; diffusion wants low temperature or short time. The history of annealing is the substitution of shorter times for lower temperatures.

**Furnace anneal** (800–1,000 °C, 10–60 min, N₂ or N₂/O₂ in a vertical batch furnace from TEL, Kokusai or ASM): the original method. Full repair, high activation, but √(Dt) of 20–100 nm. Still used for well drive-in, where you want the diffusion, and for gate-oxide-related and SPER anneals at lower temperature.

**Rapid thermal anneal (RTA)** (1,000–1,100 °C for 1–30 s): a single wafer on quartz pins in a chamber with banks of tungsten-halogen lamps above it, ramped at 50–150 °C/s, measured by pyrometer with emissivity compensation. Applied's **Vantage Radiance/RadiancePlus** and **Vantage Vulcan** (which heats the wafer from its unpatterned backside to avoid pattern-dependent lamp absorption) and Mattson's **Helios** (Mattson is now part of Beijing E-Town) are the tools; Screen's **LA-3100** is a flash-lamp annealer used for the millisecond regime described below. RTA dissolves {311} defects, activates dopants close to solid solubility and gives √(Dt) of a few nm, plus TED.

**Spike anneal** is RTA with the soak removed: ramp at 150–300 °C/s to a peak of 1,000–1,100 °C, no dwell (< 1 s within 50 °C of peak), and immediately cool at ~ 50–100 °C/s (limited by radiative cooling of a 300 mm wafer). This became the standard S/D anneal from the 130 nm to 45 nm nodes; it produces the maximum activation for a given diffusion because activation has a higher activation energy than TED dissolution.

**Millisecond anneal (MSA)**: two flavours, both heating only the top few microns to 1,150–1,350 °C for 0.1–10 ms while the wafer bulk stays at a 400–800 °C preheat. **Flash-lamp anneal** (Mattson **Millios**, Screen **LA-3100**): a xenon arc-lamp bank fires a ~ 1 ms pulse over the whole wafer. **Laser spike anneal (LSA)** / **dynamic surface anneal (DSA)**: a CO₂ (10.6 µm, Veeco's **LSA101**, from the Ultratech acquisition) or diode (Applied's **Vantage Astra DSA**) laser line ~ 0.1 mm × 10 mm is scanned across the wafer at ~ 100–500 mm/s, so each point sees a ~ 0.5 ms triangle at up to ~ 1,300 °C. Because √(Dt) is well under a nanometre, dopant does not move, and because the peak temperature is close to the melting point (1,414 °C), the solubility limit is briefly very high; the quench freezes in **metastable super-activation**, e.g. boron active above 2 × 10²⁰ and phosphorus above 5 × 10²⁰ cm⁻³. The drawback is that MSA does not fully dissolve EOR loops (the wafer bulk is too cold), so it is usually preceded by a spike anneal or used on PAI/SPER material; and the extreme temperature gradient (1,000 °C across microns) causes slip, pattern-dependent heating (dense metal and poly areas absorb differently), and wafer-to-wafer variation. Pattern effects are mitigated by absorber layers or by choosing a wavelength where silicon and dielectrics absorb similarly. Since about 2015 MSA has been used mainly for contact-level activation (the Si:P and SiGe:B contact layers) rather than S/D.

**Solid-phase epitaxial regrowth (SPER)** (500–650 °C, minutes): an amorphous layer on crystalline silicon recrystallises epitaxially from the a/c interface upward at a rate that is Arrhenius with E_a ≈ 2.7 eV: ~ 1 nm/min at 500 °C, ~ 10 nm/min at 550 °C and ~ 50 nm/min at 600 °C for (100) silicon, so a 30 nm PAI layer regrows in a few minutes at 550 °C or under a minute at 600 °C. Dopants in the amorphous layer are swept onto substitutional sites at the regrowth front at concentrations far above equilibrium solubility (boron > 10²⁰ at 600 °C), with essentially no diffusion because the temperature is so low. The catch is the EOR defects just below the original a/c interface, which SPER leaves untouched, and the fact that any part of the amorphous layer that lacks a crystalline template below it (a fully amorphised fin, or an amorphous region touching an STI sidewall) regrows polycrystalline. SPER is the physics behind cryo implant, and low-temperature SPER is central to 3D-sequential and monolithic-3D integration where the thermal budget is limited by underlying metal.

**Microwave and other low-temperature anneals** are research-stage; **laser melt anneal** (nanosecond UV pulses such as Screen's **LT-3100** from its LASSE affiliate, melting the top ~ 20 nm and re-solidifying at ~ 1 m/s) gives box-like, fully active profiles and is used in some image-sensor backside and SiC contact processes but not in mainstream logic.

> **Worked example: sheet resistance from dose and mobility.** A 5 × 10¹⁴ cm⁻² arsenic S/D implant is spike-annealed and fully activated. **Sheet resistance** is R_s = 1/(q·Q_active·μ), where Q_active is the active dose per cm² and μ the average mobility over the layer. At ~ 10²⁰ cm⁻³ electron mobility is ~ 90 cm²/V·s, so R_s = 1/(1.6 × 10⁻¹⁹ × 5 × 10¹⁴ × 90) = 1/(7.2 × 10⁻³) ≈ 140 Ω/sq. If four-point probe measures 280 Ω/sq the activation is ~ 50 %, and the process engineer knows to look at clustering or a cold anneal. For a 10¹⁵ boron extension with μ_p ≈ 50 cm²/V·s, full activation gives ~ 125 Ω/sq; real as-annealed ULE boron extensions in the 32 nm era ran 400–800 Ω/sq at 15 nm junction depth, a direct measure of how far short of full activation they fell. The general figure of merit is R_s versus x_j: every junction-engineering paper of 2000–2015 plotted its results on that chart, with the goal of pushing toward the lower-left corner of < 500 Ω/sq at < 10 nm.

### Keeping junctions under 10 nm

Putting the pieces together, a sub-10 nm junction in silicon needs: an implant whose R_p + 2ΔR_p is under ~ 8 nm (sub-keV B or a cluster, or As/P at 1–3 keV); Ge PAI so there is no channeling tail and the boron ends up in amorphous material; carbon or fluorine co-implant to suppress TED; and an anneal that is either SPER-only (600 °C) or MSA-only (1,300 °C, ms) with √(Dt) under 1 nm. Even then, control of the *shape* of the profile is poor compared to epitaxy, in which every layer's thickness and concentration is set by gas flow at 500–700 °C with no damage. This is why the abrupt, highest-concentration layers in a modern transistor are grown rather than implanted.

## 8. Implants in a Modern FinFET and GAA Flow

Let us trace where the ~ 20–40 implant steps in a 2026-era logic flow actually occur, and what has changed since the planar era. (Foundry recipes are proprietary; this follows the publicly described flows in IEDM/VLSI papers and Module 11.)

**Wells and isolation.** Still 100 % implant. After STI, n-wells (phosphorus at ~ 100–500 keV in two or three energies, ~ 10¹³ cm⁻² each) and p-wells (boron at ~ 50–300 keV) are implanted through a photoresist mask 1–2 µm thick, producing retrograde profiles with the peak ~ 0.3–0.6 µm below the surface. Deep n-wells for isolated p-wells (triple well) need phosphorus at 1–2 MeV. A high-energy or medium-current tool does these at 10¹²–10¹³ cm⁻² and 200–400 wph, so well implants are cheap per wafer but numerous: with several device flavours (core, I/O, SRAM, analog, ESD) a flow may have 10–15 well and well-related masks.

**Anti-punch-through / punch-through stopper.** In FinFETs, a heavily doped (~ 10¹⁸–10¹⁹) layer at the base of the fin stops source-to-drain leakage under the channel. It is placed by a medium-energy implant before fin patterning (so the fin above is undoped) or after, with the fin's own top protected. GAA flows are moving toward a **bottom dielectric isolation** layer that removes this implant.

**Channel and V_T adjust: mostly gone.** A planar transistor set its threshold with a channel implant of ~ 10¹⁷–10¹⁸. In a fin 5–6 nm wide, or a nanosheet 5 nm thick, that concentration means a handful of atoms per device: 10¹⁸ cm⁻³ in a 20 × 20 × 20 nm channel is 8 dopant atoms, and Poisson statistics give a ±35 % spread, so **random dopant fluctuation (RDF)** would make V_T uncontrollable. Modern channels are undoped (< 10¹⁶), and V_T is set by the **work function** of the metal gate stack (TiN, TiAl, TaN thicknesses, and lanthanum or aluminium dipole layers at the high-k interface; Module 11), giving 3–4 V_T flavours per polarity with no implant. A few residual "V_T trim" implants survive in some flows, at very low dose.

**Halo / pocket: essentially gone.** The planar-era tilted (20–45°) quad implant that put a pocket of counter-doping around the extension tip to fight short-channel effects has no place in a fully depleted fin or sheet, and RDF would kill it anyway.

**Extensions.** FinFETs still typically use a low-energy, tilted or PLAD extension implant (As/P at 1–5 keV, B at < 1 keV, ~ 10¹⁴–10¹⁵), often at hot-implant conditions to keep the fin crystalline, to define the junction under the spacer. In many GAA flows the extension is instead formed by out-diffusion from the in-situ doped S/D epi during a short anneal, and the implant disappears.

**Source/drain: mostly replaced by epi.** Since the 90 nm node for PMOS (SiGe stressors) and the 22 nm-class node for NMOS, the deep S/D has been a recessed, selectively grown epitaxial layer: **SiGe:B** with 30–55 % Ge and boron at 10²⁰ to over 10²¹ cm⁻³ chemical for PMOS, and **Si:P** (or Si:CP) with phosphorus at ~ 3–5 × 10²⁰ active and > 10²¹ chemical for NMOS, grown at ~ 550–700 °C in Applied Centura or ASM Intrepid reduced-pressure CVD reactors (Module 6). Epi gives higher active concentration than any implant-plus-anneal, no damage, and strain. Implant still does S/D in I/O transistors, ESD devices and resistors, and some flows retain a light "S/D cap" implant.

**Contact implants.** The interface between the S/D epi and the TiSi_x/Ti contact is the biggest resistance in the transistor; contact resistivity targets are ~ 1–2 × 10⁻⁹ Ω·cm². Standard practice is a Ge PAI plus a very high dose, very low energy dopant implant (P or As at 1–3 keV, B or Ga at < 1 keV, 10¹⁵–10¹⁶ cm⁻²) into the contact hole, followed by MSA or SPER, so that a metastably super-activated layer sits right at the metal interface to thin the Schottky barrier for tunnelling. This is now the single most demanding implant in the flow, and cryo implant was introduced for it.

**Poly and dummy gate.** In a gate-last (RMG) flow the polysilicon dummy gate is sometimes implanted to tune its etch and removal behaviour; in older gate-first and I/O-gate flows the poly gate is heavily doped (P or B, ~ 10¹⁵–10¹⁶) to avoid poly depletion.

**Everything else.** Pre-amorphisation before silicide, resistor implants (undoped-poly resistors trimmed with a light implant), ESD and analogue devices, and a growing list of "fix" implants such as nitrogen or fluorine into gate dielectrics.

The pattern: the high-current, high-dose implants that defined the 1990s (S/D, poly) have moved to epi; the ones that remain are the wells (medium/high energy, low dose, many masks), the contacts (highest dose, lowest energy), and a scatter of device-specific tuning implants. Implanter *count* per fab has stayed roughly flat while the implanters have become more specialised.

## 9. Implants Beyond Logic

**CMOS image sensors** rely on deep, high-energy implants more than anything else: the photodiode and its isolation are formed by boron and phosphorus implants from ~ 1 to 8 MeV (and up to 15 MeV for the largest pixels), through photoresist masks 5–10 µm thick, to create p-wells and n-wells several microns deep for full-depth charge collection and pixel-to-pixel isolation. This is the reason the Axcelis Purion XEmax exists.

**DRAM** uses implants for the peripheral CMOS (as in logic), for the array wells, and historically for the cell transistors themselves; buried-channel array transistors and the polysilicon contact plugs are doped by PLAD in several flows. DRAM is the second-largest implanter market after logic.

**3D NAND** needs relatively few implants (the memory strings are charge-trap and undoped), but its CMOS periphery, deep triple wells and a few high-energy well implants through thick stacks still consume several MeV-class steps per wafer.

**Power devices in SiC** are the fastest-growing implant application and the one with the strangest physics. Dopant diffusion in SiC is negligible below 1,800 °C, so *every* doped region in a SiC MOSFET (p-wells, n⁺ sources, p⁺ contacts, junction termination extension) must be implanted to its final shape. Aluminium (p-type) and nitrogen (n-type) are implanted at up to ~ 500 keV–1 MeV for the deep wells and at doses up to 10¹⁵–10¹⁶ cm⁻² for contacts, and the wafer is held at **~ 500 °C** during implant because amorphised SiC does not regrow epitaxially in the correct polytype and becomes a permanent 3C-SiC/defect region. Annealing is at **1,600–1,800 °C** in argon, where the SiC surface would sublime and step-bunch, so it is capped with **carbon** (a photoresist layer baked into graphite at ~ 800 °C, later removed in an oxygen plasma). Axcelis reportedly holds ~ 70 % or more of the SiC implant market with its Purion Power series (Purion M SiC, Purion H200 SiC, Purion EXE SiC, Purion XE SiC); SiC implant demand is the main reason Axcelis's revenue more than doubled from 2020 (~ $475 M) to 2023 (~ $1.13 B). GaN, by contrast, is barely implant-doped at all (Mg activation in implanted GaN needs > 1,300 °C under pressure and is still research), which is why GaN devices are grown with all their doping in place.

**SOI wafers (Smart Cut)** are made by an implant that has nothing to do with doping: a hydrogen (or H + He co-) implant of ~ 5 × 10¹⁶ cm⁻² at 30–200 keV into an oxidised donor wafer, which is then bonded to a handle wafer and heated to 400–600 °C, whereupon the hydrogen forms platelets and micro-cracks at the implant depth and the wafer splits, leaving a thin silicon layer on the buried oxide (Module 3). At 5 × 10¹⁶ this is one of the highest doses in the industry, and dedicated high-current hydrogen implanters (Soitec buys from both Applied and Axcelis) run continuously.

**Other**: MEMS and photonics (germanium implant for waveguide photodetectors), oxygen implant for SIMOX (obsolete), nitrogen implant into gate oxide, and the exotic case of xenon or argon implants used purely as damage tools.

## 10. Metrology

Because dose and depth are invisible optically, implant metrology is a mix of destructive profiling and fast indirect monitors.

**Secondary ion mass spectrometry (SIMS)** is the reference for depth profiles. A Cs⁺ or O₂⁺ primary beam at 0.25–5 keV sputters a crater a few hundred µm across while a mass spectrometer counts the sputtered dopant ions; depth is calibrated by measuring the crater with a profilometer. Detection limits are ~ 10¹⁴–10¹⁶ cm⁻³ depending on species and matrix, depth resolution ~ 1–2 nm at low primary energy, and a profile takes minutes to hours. Cameca (Ametek) IMS Wf/SC Ultra and Physical Electronics ADEPT-1010 are the fab tools; SIMS is done on monitor wafers, never product, and the first few nm are unreliable because of the sputtering transient. SIMS measures *chemical* concentration, not active concentration.

**Four-point probe (4PP)** measures **sheet resistance**: four in-line tungsten-carbide probes on a monitor wafer, current through the outer pair, voltage across the inner pair, R_s = (π/ln 2)·(V/I) = 4.532·V/I for a thin layer, mapped at 49–121 sites in a minute. It reads active dose times mobility, so it is the standard post-anneal monitor. Its limitation is that probes punch through ultra-shallow junctions; the non-contact **junction photovoltage (RsL)** technique and micro-4PP (CAPRES) were developed for junctions under 20 nm.

**Modulated optical reflectance ("Thermawave")**: KLA's **ThermaProbe** (from the Therma-Wave acquisition) shines a modulated pump laser and a probe laser on the as-implanted, un-annealed wafer; the damage-dependent thermal and plasma waves change reflectance by parts per million, which maps to dose with ~ 0.5 % repeatability for 10¹¹–10¹⁵ cm⁻² implants. It is non-destructive, takes a minute, and is the tool used to catch a bad implanter *before* the anneal, which is why every implant bay has one. It reads damage, not dopant, so it is calibrated per species and energy and cannot read hot implants well.

**Capacitance-voltage (C-V)** on MOS capacitors or by mercury probe gives the active doping versus depth in the 10¹⁴–10¹⁸ range (wells), where 4PP is insensitive. **Spreading resistance profiling (SRP)** on bevelled samples is a legacy active-profile method; **scanning spreading resistance microscopy (SSRM)** and **atom probe tomography** are the research-grade successors. Ultimately, the metrology that matters is electrical test of the transistors after the whole flow.

## 11. Safety

Implant bays are among the most hazardous places in a fab. **Arsine** (AsH₃) has an ACGIH threshold limit value of 0.005 ppm and an IDLH (immediately dangerous to life or health) level of 3 ppm; it is odourless at dangerous concentrations and causes haemolysis with delayed symptoms. **Phosphine** (PH₃, TLV 0.3 ppm) is comparably toxic and pyrophoric. **BF₃** is corrosive and hydrolyses to HF. The industry's answer, since the 1990s, is the **sub-atmospheric gas source**: Entegris's **SDS** (Safe Delivery Source; the gas is adsorbed on activated carbon inside the cylinder at below atmospheric pressure, so a leak lets air *in* rather than gas out) and the mechanically regulated **VAC** cylinders from Linde. Every source housing has toxic-gas monitors with alarm points near the TLV, and source maintenance is done in glove boxes with full respiratory protection because the arc chamber walls are coated in arsenic and phosphorus compounds.

**High voltage**: terminals at 100–300 kV DC, with stored energy in the capacitance of the terminal that is lethal; the whole terminal is inside an SF₆- or air-filled enclosure with interlocked grounding sticks. **X-rays**: electrons backstreaming up the acceleration column and striking the source at 100+ kV generate bremsstrahlung, and the machines carry lead shielding and are surveyed periodically; high-energy tools are more heavily shielded still. Add cryogenic pumps, magnets, mechanical scan arms moving at m/s, and it is clear why implanters have the longest safety training list in the fab.

## 12. Market, Cost and Throughput

The implant equipment market is ~ $3.5–4 B per year (as of ~2025), roughly 3–4 % of wafer fab equipment. **Applied Materials** (which acquired Varian Semiconductor Equipment in 2011 for $4.9 B, and with it the VIISta line and ~ 60–70 % share of the silicon implant market) is the leader across high-current and medium-current; **Axcelis** (Massachusetts, spun out of Eaton in 2000) holds ~ 25 % overall, is the leader in high-energy and dominates SiC power (reportedly ~ 70 % or more). **SMIT** (Sumitomo Heavy Industries Ion Technology, Japan) and **Nissin Ion Equipment** (Japan) supply medium-current tools mainly to Japanese and some Chinese fabs. Chinese domestic suppliers, notably **CETC** (the 48th Research Institute) and **Kingstone** (Wanye Enterprises), have shipped low- and medium-energy tools to domestic fabs under the localisation push since 2022, but have little share outside China. Applied and Axcelis together are effectively a duopoly at the leading edge.

Tool prices run ~ $4–5 M for medium-current, ~ $5–7 M for high-current, and ~ $8 M and up for high-energy. Throughput depends on dose: a well implant at 10¹³ cm⁻² is limited by wafer handling and mechanical scan to ~ 200–400 wph (vendors quote up to 500 wph), while a high-dose implant is beam-current limited.

> **Worked example: implant time at high dose.** A 300 mm wafer has an area of 707 cm². A 1 × 10¹⁵ cm⁻² As⁺ implant needs 7.07 × 10¹⁷ ions, i.e. a charge of 7.07 × 10¹⁷ × 1.6 × 10⁻¹⁹ C = 0.113 C. At 20 mA beam current that is 5.7 s of beam time; add overscan (the beam must scan past the wafer edge, ~ 30 % overhead) and ~ 8 s of handling, and the tool does ~ 200 wph. At 10¹⁶ cm⁻² (a contact or Smart Cut implant) the beam time alone is 57 s, so throughput falls to ~ 50 wph and the tool's cost per wafer rises fivefold; a single 5 × 10¹⁶ H⁺ Smart Cut implant at a typical 5 mA is over 20 minutes per wafer. This arithmetic is the entire reason the high-current, medium-current and high-energy classes exist: you spend a $7 M tool on 20 mA beams only for the steps that need it.

A leading-edge 100 k wafer-starts-per-month logic fab with ~ 30 implant steps per wafer runs on the order of 30–50 implanters; the implant bay is small relative to litho, etch or deposition, but a single down high-energy tool can idle every well-implant step in the fab, so most fabs keep at least two of each class.

## Key Numbers

| Quantity | Value |
|---|---|
| Silicon atom density | 5 × 10²² cm⁻³ |
| Intrinsic carrier density, 300 K | ~ 10¹⁰ cm⁻³ |
| Practical doping range | 10¹⁵–10²⁰⁺ cm⁻³ (20 ppb to 0.2 %) |
| Donor / acceptor ionisation energy (P, B) | ~ 45 meV |
| Resistivity at 10¹⁵ / 10²⁰ cm⁻³ | ~ 5–13 Ω·cm / ~ 1 mΩ·cm |
| Boron solid solubility | ~ 1–2 × 10²⁰ (1,000 °C), ~ 4 × 10²⁰ cm⁻³ (1,100 °C) |
| Boron diffusivity | ~ 2 × 10⁻¹⁴ cm²/s at 1,000 °C; ×10 per 100 °C |
| Extraction voltage | 30–80 kV |
| Mass resolution m/Δm | 60–100 |
| Implant dose range | 10¹¹–10¹⁶ cm⁻² (Smart Cut H⁺ ~ 5 × 10¹⁶) |
| Energy range | 0.2 keV (ULE) to 15 MeV (XEmax) |
| High-current beam | up to ~ 20–50 mA |
| Standard tilt / twist | 7° / ~ 22° |
| Boron range | ~ 3 nm/keV; As ~ 1 nm/keV at low energy |
| B 10 keV: R_p, ΔR_p | ~ 37 nm, ~ 17 nm |
| Amorphisation threshold (RT) | ~ 1–3 × 10¹⁴ cm⁻² (As, Ge); > 10¹⁶ (B) |
| Spike anneal | 1,000–1,100 °C peak, < 1 s, ramp 150–300 °C/s |
| Millisecond anneal | 1,150–1,350 °C surface, 0.1–10 ms |
| SPER rate | ~ 10 nm/min at 550 °C, ~ 50 nm/min at 600 °C (E_a ≈ 2.7 eV) |
| SiC: implant temperature / anneal | ~ 500 °C / 1,600–1,800 °C with carbon cap |
| Contact resistivity target | ~ 1–2 × 10⁻⁹ Ω·cm² |
| Implant steps per logic wafer | ~ 20–40 |
| Tool cost / throughput (low dose) | ~ $4–8 M / 200–400 wph |
| Arsine TLV / IDLH | 0.005 ppm / 3 ppm |
| Market share (silicon implant, ~2025) | Applied ~ 60–70 %, Axcelis ~ 25 % (analyst estimates); Axcelis reportedly ~ 70 %+ of SiC |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Applied Materials (Varian) | USA | VIISta high-current, medium-current, high-energy, PLAD, cryo/hot implant; Vantage RTP and DSA laser anneal | Leader, ~ 60–70 % of implant |
| Axcelis Technologies | USA | Purion H / Dragon (high current), Purion M (medium), Purion XE / VXE / XEmax (high energy to 15 MeV), Purion Power for SiC | #2 overall, leader in high-energy and SiC |
| SMIT (Sumitomo Heavy Industries Ion Technology) | Japan | Medium-current and high-energy implanters | Niche, #3 |
| Nissin Ion Equipment | Japan | Medium-current implanters (EXCEED), display implanters | Niche |
| CETC 48th Institute, Kingstone (Wanye) | China | Domestic low/medium-energy implanters | Niche, China only |
| Mattson Technology (Beijing E-Town) | USA / China | Helios RTP, Millios flash-lamp MSA | #2 in RTP |
| Veeco (ex-Ultratech) | USA | LSA101 laser spike anneal | Leader in laser anneal |
| Screen | Japan | LA-3100 flash-lamp anneal, LT-3100 nanosecond UV laser anneal (LASSE) | Niche |
| TEL, Kokusai Electric, ASM | Japan / Netherlands | Vertical furnaces for well drive-in and SPER | Leaders in furnace |
| Entegris (SDS), Linde (VAC) | USA / Ireland | Sub-atmospheric arsine, phosphine, BF₃ gas sources | Duopoly in safe dopant gas |
| Cameca (Ametek), Physical Electronics | France / USA | SIMS depth profilers | Leaders |
| KLA (Therma-Wave) | USA | ThermaProbe implant dose monitors, 4PP (RS series) | Leader in implant metrology |
| Soitec | France | Smart Cut SOI wafers (largest consumer of high-dose H⁺ implant) | Leader in SOI |

## Common Misconceptions

- "Implantation puts dopants where you want them and you are done." → The as-implanted dopant is mostly inactive and the crystal is damaged; the anneal determines the final profile, activation and leakage, and TED during the anneal can move dopant ten times further than the implant range.
- "A lower-temperature anneal always means less diffusion." → In the 700–900 °C window, transient enhanced diffusion from slowly dissolving {311} defects can move boron *more* than a 1,050 °C spike anneal that gets through the interstitial transient in under a second.
- "Modern transistors are heavily implanted." → The channel of a FinFET or nanosheet is undoped and V_T is set by gate metal work function; the source/drain is in-situ doped epitaxy. Implant now does wells, isolation, contacts and tuning, but still ~ 20–40 steps per wafer.
- "The ion beam energy sets the depth, so lower energy means arbitrarily shallow junctions." → Straggle, channeling tails and energy contamination from charge-exchanged neutrals in decel mode all set a floor of a few nm, which is why epi took over the shallowest layers.
- "Boron and arsenic behave the same in silicon." → Boron is light, does not amorphise silicon, diffuses via interstitials and suffers TED and clustering; arsenic is heavy, amorphises at ~ 10¹⁴ cm⁻², diffuses slowly and is limited by vacancy clustering. Their process windows are completely different.
- "Implant is a dead technology." → SiC power devices, MeV image-sensor wells, Smart Cut SOI and contact engineering have all grown the implant market; it is ~ $3.5–4 B/year and Axcelis's revenue more than doubled from 2020 to 2023 largely on SiC.

## Where This Fits in the Supply Chain

Implant and anneal sit in the front-end loop between lithography (Module 7 and 8, which define the resist masks the ions are shot through) and etch (Module 9, which removes the resist and later opens the contact holes that receive the highest-dose implants). The inputs are the patterned wafer, dopant gases from the specialty-gas suppliers of Module 4 (arsine, phosphine and BF₃ in sub-atmospheric cylinders from Entegris and Linde), solid sources, and screen oxides from Module 6; the process consumes implanter beam-hours from Applied and Axcelis tools and anneal time in Applied, Mattson, Veeco and TEL/Kokusai tools. The outputs are the electrically defined regions (wells, isolation, extensions, contact layers) that Module 11 assembles into a working FinFET or nanosheet transistor, and, in the special cases of Smart Cut and SiC, the SOI wafers of Module 3 and the power devices that live alongside the GPU in every server rack. Every well implant is checked by ThermaProbe and 4PP before the wafer moves on, feeding the metrology and yield systems of Module 13.

## Further Reading

- J. D. Plummer, M. D. Deal and P. B. Griffin, *Silicon VLSI Technology: Fundamentals, Practice and Modeling* (Prentice Hall, 2000), chapters 7 and 8 on diffusion and ion implantation, the standard graduate treatment including TED.
- S. M. Sze and M.-K. Lee, *Semiconductor Devices: Physics and Technology*, 3rd ed. (Wiley, 2012), chapter on ion implantation with LSS range tables.
- J. F. Ziegler, M. D. Ziegler and J. P. Biersack, "SRIM: The stopping and range of ions in matter," *Nucl. Instrum. Methods B* 268, 1818 (2010); and the free SRIM/TRIM code at srim.org.
- H. Ryssel and I. Ruge, *Ion Implantation* (Wiley, 1986), the classic monograph on implanter physics and range theory.
- P. A. Stolk et al., "Physical mechanisms of transient enhanced dopant diffusion in ion-implanted silicon," *J. Appl. Phys.* 81, 6031 (1997), the definitive experimental paper on {311} defects and TED.
- N. E. B. Cowern and C. Rafferty, "Enhanced diffusion in silicon processing," *MRS Bulletin* 25, 39 (2000).
- G. L. Olson and J. A. Roth, "Kinetics of solid phase crystallization in amorphous silicon," *Materials Science Reports* 3, 1 (1988), the source of the SPER rate data.
- Axcelis Technologies, "Ion Implantation and Applications for Power Devices" (technical white paper, axcelis.com) and "Purion XEmax, Axcelis ultra-high energy implanter with Boost technology," *MRS Advances* (2022).
- T. Kimoto and J. A. Cooper, *Fundamentals of Silicon Carbide Technology* (Wiley, 2014), chapter on ion implantation and high-temperature annealing of SiC.
- M. Bruel, "Silicon on insulator material technology," *Electronics Letters* 31, 1201 (1995), the original Smart Cut paper.
