# Module 02: Crystal Growth: Czochralski and Float Zone

Module 01 ended with polysilicon: chunks and granules of 9N to 11N silicon, chemically about as pure as any bulk material humans make, and structurally useless. Polysilicon is a jumble of millimetre-sized grains, each a perfect little crystal pointing in a random direction. A transistor cannot be built across a grain boundary. The job of this stage is to convert a few hundred kilograms of that rubble into one single crystal, 300 mm across and about two metres long, in which every atom sits on the same diamond-cubic lattice with the same orientation from one end to the other, with no dislocations at all, and with the concentrations of dopant, oxygen and carbon held to within a few tens of percent along the whole length.

That is the hard part. Not "a crystal", but a crystal of 300 kg with zero line defects, grown from a melt at 1,414 °C that is slowly eating its own container, hanging from a neck the width of a pencil lead. Nearly everything in this module is a consequence of those constraints.

## Why Single Crystal, and Why <100>

### Grain boundaries kill transistors

A **grain boundary** is a two-dimensional sheet of atoms where two crystallites with different orientations meet. Across it, the lattice is disordered over a width of a few atomic spacings. Three things happen there that a device engineer cannot tolerate:

1. **Dangling and strained bonds** create electronic states inside the band gap. These act as generation-recombination centres, which means leakage current in a reverse-biased junction and a short minority-carrier lifetime.
2. **Fast diffusion paths.** Dopants and metallic contaminants (Fe, Cu, Ni) diffuse orders of magnitude faster along a boundary than through the lattice. A junction that crosses a boundary is a junction whose depth you do not control.
3. **Etch and oxidation anisotropy.** The oxidation rate, etch rate, and implant channelling behaviour of silicon all depend on crystal orientation. A gate oxide grown across two grains has two thicknesses.

Polycrystalline silicon is perfectly good for solar cells of modest efficiency and for the gate electrodes and interconnect inside a chip (deposited "poly"), but the active channel of a transistor has to be single crystal. Even a single **dislocation** (a one-dimensional line defect where a half-plane of atoms terminates) is a problem: it decorates with metals, it pins and shorts junctions, and under the thermal cycling of a fab it multiplies. The industry standard since the early 1960s has been zero dislocations in the ingot, full stop.

### Orientation: <100> versus <111>

Silicon has the diamond-cubic structure: two interpenetrating face-centred-cubic lattices, lattice constant 0.5431 nm, 5.0 × 10²² atoms per cm³. A wafer is a slice perpendicular to a chosen crystal direction. Two directions matter industrially:

- **<111>**: the direction perpendicular to the close-packed {111} planes. {111} is the slowest-growing, slowest-etching, most densely packed plane. Historically bipolar transistors were built on (111) wafers, and today it is the standard for GaN-on-Si epitaxy (the hexagonal GaN lattice matches the three-fold symmetry of (111)).
- **<100>**: perpendicular to the cube faces. The atomic density of the (100) surface is lower (6.8 × 10¹⁴ atoms/cm² versus 7.8 × 10¹⁴ for (111)), which means fewer bonds must be terminated at the Si/SiO₂ interface. The measured **interface trap density** D_it at a good thermally grown oxide on (100) is around 10¹⁰ eV⁻¹cm⁻², several times lower than on (111). Electron mobility in an inversion layer is also highest on (100).

That is the whole reason planar CMOS moved to (100) in the 1970s and never left: lowest interface state density, best n-channel mobility, plus the practical bonus that (100) wafers cleave cleanly along the {110} planes at right angles, which made scribe-and-break dicing easy. FinFETs on a (100) wafer with fins along <110> present (110) sidewalls, which happen to favour hole mobility, so the choice still works in the 3D era. Some hybrid-orientation experiments (pMOS on (110)) came and went; the industry stayed with (100) ingots and rotated the layout instead.

The **notch** ground into a 300 mm wafer (the flat, on older wafers) marks a <110> direction so lithography and dicing can be aligned to the lattice. The ingot is grown along <100>; the notch is put in later, in Module 03.

## A Brief History in Three Names

**Jan Czochralski**, a Polish metallurgist in Berlin, discovered the method in 1916 by dipping his pen into a crucible of molten tin instead of the inkwell and pulling out a thread of single-crystal metal. **Gordon Teal** and J. B. Little at Bell Labs applied it to germanium in 1950, and Teal with Ernest Buehler grew the first silicon single crystals and grown p-n junctions in 1952, which turned the transistor into a manufacturable device. **William Dash** at General Electric (1958–59) worked out how to grow the crystal with zero dislocations, the trick on which every subsequent silicon crystal depends. Float Zone came from Bell Labs (Theuerer, 1952) and Keck and Golay (1953). The 1950s pullers grew 25 mm ingots; today's grow 300 mm ingots weighing 300 kg.

## Anatomy of a 300 mm CZ Puller

A modern 300 mm Czochralski puller is a tower roughly 8 to 12 m tall including its pit, split into a **furnace chamber** below and a **pull chamber** above, separated by an isolation valve so the crystal can be withdrawn without venting the hot zone. Walk around it from the outside in.

**Chamber.** Double-walled stainless steel, water-cooled between the walls. The water jacket keeps the steel below ~100 °C and sets the cold boundary that every heat-flow calculation in the hot zone terminates on. Quartz viewports (often purged to keep SiO fog off them) give the CCD camera and the operator a line of sight to the melt surface.

**Atmosphere.** The chamber runs under flowing argon at reduced pressure, typically ~10 to 50 mbar, at flows on the order of 50 to 150 standard litres per minute delivered down a purge tube around the crystal and pumped out at the bottom. The argon sweeps away the silicon monoxide (SiO) evaporating continuously from the melt and the carbon monoxide from the graphite parts. Lower pressure and higher flow both increase SiO evaporation, which is one of the knobs for oxygen content. SiO condenses as a brown, pyrophoric powder on every cold surface, and puller cleaning is a fire hazard treated with respect. The chamber is helium-leak-checked before every run; silicon must never see oxygen or nitrogen at these temperatures.

**Crucible.** The melt sits in a **fused-silica crucible** (vitreous SiO₂), for 300 mm growth typically 32 inch (~810 mm) or 36 inch (~915 mm) in diameter with walls ~10 to 15 mm thick, holding roughly 300 to 450 kg. It is a two-layer arc-fused part: an outer body of natural quartz sand (bubble-rich, opaque) and an inner ~2 to 3 mm layer fused from **synthetic quartz** (from silicon tetrachloride hydrolysis, ppb-level metals) that is bubble-free and is the only layer the melt touches. Bubbles in the inner layer would open as the wall dissolves and eject silica particles into the melt, each a dislocation nucleus at the growth interface. Many crucibles carry a barium-doped inner coating that promotes a uniform, adherent layer of crystalline **cristobalite** during the run; uncontrolled devitrification, by contrast, flakes off. Fused silica begins to deform viscously well below its ~1,650 °C softening point (its strain and annealing points are near 1,000 to 1,100 °C), so at 1,420 °C the crucible cannot carry a 400 kg melt on its own and sits in a machined **graphite susceptor** that carries the load. The crucible is single-use: after 50 hours at 1,420 °C it has dissolved a good fraction of a millimetre into the melt and cracks on cool-down. It costs from the low thousands to over ten thousand dollars depending on size and grade. Suppliers include Shin-Etsu Quartz, Momentive, Heraeus Conamic, Japan Super Quartz (SUMCO) and Coorstek plus Chinese makers; the ultra-pure sand comes overwhelmingly from Spruce Pine, North Carolina (Sibelco and The Quartz Corp), a single point of failure we return to in Module 20.

**Heater and hot zone.** Around the susceptor stands a cylindrical **graphite resistance heater**, slotted into a meander so a low-voltage, high-current supply (on the order of 100 to 200 kW for a 300 mm puller) heats it to roughly 1,500 to 1,600 °C. Outside the heater are layers of carbon-felt insulation and graphite or carbon-fibre-composite (CFC) shields; above the melt sits a conical **heat shield** or reflector that hangs around the growing crystal. The collection of heater, susceptor, insulation, shields, purge tube and support is called the **hot zone**, and its geometry is the single most closely guarded piece of intellectual property in a wafer company. The hot zone sets the temperature gradient in the crystal near the interface (the "G" in v/G, below), the radial uniformity of that gradient, the melt surface temperature distribution, and the argon flow pattern that carries SiO away. Hot zones are rebuilt and re-machined after a certain number of runs; the graphite slowly converts to silicon carbide where SiO reaches it.

**Mechanisms.** The **crucible shaft** enters from below through a rotary vacuum feedthrough; it rotates the crucible (typically 5 to 15 rpm) and lifts it during the run to keep the melt surface at a constant height relative to the heater as silicon is removed. From above, the **seed lift** is either a rigid shaft or, on nearly all large pullers, a **cable** (a stranded tungsten or steel wire) on a drum, because a rigid shaft long enough for a 2 m crystal plus its travel would be impractically tall and eccentric. The cable carries the seed holder and rotates the crystal (10 to 20 rpm, opposite sense to the crucible). A load cell or diameter camera feeds the control loop.

**Magnets.** Almost all 300 mm pullers are **magnetic CZ (MCZ)** machines: a superconducting magnet (Toshiba, which has built over 500 of them since 1988, Sumitomo Heavy Industries, Mitsubishi Electric and JASTEC supply these) or resistive coils surround the furnace chamber and apply a field of a few tenths of a tesla to the melt. Why this matters is explained in its own section below.

**Automation.** The control system runs the entire recipe: heater power, pull speed, seed and crucible rotation, crucible lift, argon flow and pressure, magnet current, and the **automatic diameter control (ADC)** loop. A modern puller runs with minimal operator intervention from seed dip to cool-down; operators charge crucibles, load seeds, and intervene on structure loss.

Semiconductor pullers come from a handful of builders: **PVA TePla** (Germany; its Crystal Growing Systems unit makes the EKZ series and is also the leading Float Zone furnace supplier), **Ferrotec** (Japan/China, grown large in solar), **Linton Crystal Technologies** (Rochester, New York), **S-TECH** (Korea), and a Chinese solar-driven industry led by **Zhejiang Jingsheng (JSG)**. The Rochester lineage matters: Hamco (1952) became **Kayex**, which introduced the first 300 mm puller (KX300) in 1987 and built much of the pre-2000 fleet; Linton has owned the Kayex IP exclusively since 2013. The big wafer makers also design or heavily customise their own pullers and hot zones and treat them as proprietary; a vendor puller is a starting point, not the finished tool.

## The CZ Recipe, Step by Step

A 300 mm run takes on the order of two and a half to three and a half days from charging to a cool ingot on the floor. Here is the sequence.

### 1. Charge loading

The crucible is placed in the susceptor and filled with polysilicon: Siemens chunk (crushed rods, acid-etched to remove crushing contamination) and/or FBR granules, usually mixed so granules fill the voids between chunks. Charge sizes for 300 mm are ~300 to 450 kg, with some machines built for 500 kg or more. Charging is skilled work: large chunks must not point-load the softening quartz wall, and the stack must not form a **bridge**, a wedged upper layer that collapses into the melt when the charge beneath it melts, splashing silicon onto the heater or cracking the crucible. Boron dopant may go in with the charge; volatile arsenic and antimony are added later through a doping tube. The chamber is closed, pumped, leak-checked and back-filled with argon.

### 2. Meltdown

Heater power ramps over several hours to bring the charge through 1,414 °C, the melting point of silicon. The bulk melt is superheated to roughly 1,420 to 1,450 °C, hotter at the crucible wall and coolest at the centre of the free surface where the crystal will grow. Meltdown of 400 kg takes ~6 to 10 hours; the latent heat alone (~1,790 J/g, ~720 MJ for 400 kg) is a large part of it. Liquid silicon is denser than solid (2.57 versus 2.33 g/cm³), so the charge slumps as it melts from the wall inward. Once molten, the melt is held 30 to 60 minutes for thermal stabilisation with the surface centre brought to just above the melting point.

### 3. Dopant addition and the segregation coefficient

The dopant sets the resistivity of the wafer, which sets everything from well profiles to latch-up immunity. Four elements cover the market: **boron** (p-type, the overwhelming majority of logic and memory substrates), **phosphorus** (n-type, moderate to high resistivity), **arsenic** (n-type, heavily doped substrates for n/n+ epi), and **antimony** (n-type, heavily doped, lower autodoping than As during epi). Gallium is used in solar (it avoids the boron-oxygen light-induced degradation) but barely at all in semiconductor wafers.

Each dopant partitions between solid and liquid according to its **equilibrium segregation coefficient** k₀ = C_solid / C_liquid at the interface:

| Element | k₀ | Notes |
|---|---|---|
| Boron | 0.8 | near-uniform along ingot |
| Phosphorus | 0.35 | significant axial gradient |
| Arsenic | 0.3 | volatile, added after meltdown |
| Antimony | 0.023 | very volatile, hard to reach low resistivity |
| Gallium | 0.008 | solar only; strong gradient |
| Aluminium | 0.002 | contaminant |
| Oxygen | ~1.25 | enriched in solid, but supply falls over run |
| Carbon | 0.07 | contaminant, accumulates in melt |
| Nitrogen | 7 × 10⁻⁴ | deliberately added at ~10¹⁴ cm⁻³ in some products |

Because k < 1 for every dopant, the solid takes less than the liquid holds and the melt gets richer as the crystal grows. With good mixing the concentration in the solid follows the **Scheil equation** (normal freezing):

C_s(g) = k C₀ (1 − g)^(k−1)

where g is the fraction of the original melt that has solidified and C₀ is the starting melt concentration. For boron (k = 0.8) the exponent is −0.2, so the concentration rises by only ~1.6× between the seed end and 90% solidified. For phosphorus (k = 0.35) it rises ~4.5× over the same length, which is why n-type CZ ingots yield fewer wafers inside a tight resistivity spec than p-type, and why customers who need tight, high-resistivity n-type (power devices, detectors) buy Float Zone material instead. The actual effective coefficient k_eff is a bit closer to 1 than k₀ because the liquid at the interface is enriched in a thin boundary layer (Burton-Prim-Slichter theory); faster growth and slower rotation push k_eff toward 1.

There is a hard ceiling on how much dopant can be added. Rejected solute builds up in a diffusion boundary layer ahead of the interface, which lowers the local liquidus temperature. If the actual temperature gradient in the liquid is smaller than the gradient of the liquidus, the melt just ahead of the interface is below its freezing point: **constitutional supercooling**. The planar interface breaks down into cells, dopant is trapped between them, and the crystal is scrap. The criterion is G_L / v > m C₀ (1 − k) / (k D), with m the liquidus slope and D the solute diffusivity. It caps arsenic and antimony substrates at roughly 10¹⁹ to low-10²⁰ cm⁻³ (a few milliohm-centimetres) and forces the pull rate down for heavily doped runs.

> **Worked example: how much boron goes into a 400 kg charge for 10 Ω·cm p-type?**
> From the Irvin/ASTM resistivity curves, 10 Ω·cm p-type corresponds to N_B ≈ 1.35 × 10¹⁵ cm⁻³ in the solid. With k = 0.8 the melt must start at C₀ = 1.35 × 10¹⁵ / 0.8 ≈ 1.7 × 10¹⁵ cm⁻³. The charge is 400 kg; using the solid density 2.33 g/cm³ for a volume that refers to the crystal it will become, that is 1.72 × 10⁵ cm³ of silicon. Boron atoms needed: 1.7 × 10¹⁵ × 1.72 × 10⁵ ≈ 2.9 × 10²⁰ atoms, which is 4.8 × 10⁻⁴ mol, or **about 5 milligrams of boron** in 400 kg of silicon: 13 parts per billion by weight. Nobody weighs 5 mg of elemental boron; it is added as a few grams of silicon-boron alloy pellets of known concentration, or the melt is set with a heavily doped "remelt" piece from a previous ingot. Now apply Scheil: at g = 0.5 the solid concentration is 1.35 × 10¹⁵ × 0.5^(−0.2) = 1.55 × 10¹⁵ cm⁻³ (about 8.7 Ω·cm); at g = 0.9 it is 1.35 × 10¹⁵ × 0.1^(−0.2) = 2.1 × 10¹⁵ cm⁻³ (about 6.4 Ω·cm). So a boron ingot targeted at 10 Ω·cm at the seed end drifts to ~6.5 Ω·cm near the tail; a customer spec of 8 to 12 Ω·cm (8 Ω·cm ≈ 1.7 × 10¹⁵ cm⁻³, reached when (1 − g)^(−0.2) = 1.26, i.e. g ≈ 0.68) would take only the first ~65 to 70% of the body, while a spec of 5 to 15 Ω·cm takes it all. Repeat with phosphorus (k = 0.35): at g = 0.9 the factor is 0.1^(−0.65) = 4.5, so a 10 Ω·cm n-type seed end ends at ~2.2 Ω·cm.

### 4. Seed dip and thermal equilibration

The **seed** is a small dislocation-free <100> single crystal, on the order of 10 to 20 mm across and 100 to 200 mm long, cut from a previous ingot and etched clean; it is clamped in a graphite or molybdenum seed holder on the cable. It is lowered to just above the melt and held there for tens of minutes to warm up, then dipped a few millimetres into the melt. The melt temperature is fine-tuned by watching the meniscus: too hot and the seed melts back and thins; too cold and it grows a bulge with facets. The operator (or the automation) waits until a stable meniscus forms and the seed is neither growing nor shrinking. Even so, the thermal shock of dipping a ~1,000 °C piece of silicon into a 1,420 °C melt always generates dislocations in the seed. They are removed in the next step.

### 5. The Dash neck

Dash's insight was geometrical. Dislocations in silicon lie on and glide along {111} planes, which are inclined at ~54.7° to a <100> growth axis. If the crystal is grown thin enough and fast enough, every dislocation inclined to the axis will reach the free surface and glide out before the crystal has grown far enough to carry it along. So immediately after the dip, the pull rate is raised to several millimetres per minute (on the order of 3 to 6 mm/min, i.e. a few hundred millimetres per hour) while the melt temperature is raised, and the crystal is pulled down to a **neck** of roughly 3 to 4 mm diameter over a length of 100 to 200 mm. The high pull rate also matters for a second reason: at high growth speed the crystal is supersaturated in vacancies, and vacancies help dislocations climb to the surface. After a few tens of millimetres of neck, the crystal is dislocation-free, and remains so as long as nothing (a thermal shock, a particle, a mechanical jolt) nucleates a new one. The Dash neck is the reason the entire modern silicon industry works, and it is also the origin of the heavy-crystal problem discussed later.

The confirmation that the crystal is dislocation-free is visible to the naked eye. A dislocation-free <100> ingot grows with four **habit lines** (growth ridges) running along its length at 90° intervals, where {111} facets at the growth front intersect the surface. If a dislocation enters, the facets vanish within a few millimetres and the lines disappear: **structure loss** (also called "loss of zero-D" or "dislocation slip"). When that happens the only fix is to melt the crystal back below the point where the dislocation entered, re-neck, and regrow. Structure loss part-way down a 300 kg body is a bad day: hours of growth remelted, and the melt's dopant and oxygen history disturbed.

### 6. Shoulder (crown)

Once the neck is long enough the pull rate is dropped and the melt cooled slightly so the crystal flares out. The **crown** or **shoulder** grows to the target body diameter over a height of some tens of millimetres. A flatter crown wastes less silicon (the crown is scrap, it cannot be sliced into full-diameter wafers) but a too-abrupt transition risks dislocations from the sudden change in thermal conditions and from the (111) facets that develop on a flat crown. The transition from crown to body, where the diameter is held and the growth angle changes, is another classic point of structure loss.

### 7. Body growth: the long, quiet part

The body is grown at a constant diameter, slightly larger than the finished wafer (on the order of 305 to 310 mm for 300 mm wafers, since the ingot will be ground to size), for a length of ~1.8 to 2.5 m, at a pull rate of roughly **0.5 to 1.5 mm/min** with the lower end of that range typical for 300 mm and heavily-doped runs. Here is what the machine is doing during those 30 to 50 hours:

**Heat balance.** At the interface, heat arrives from the melt (superheat carried by convection) plus the latent heat released by solidification, and leaves by conduction up the crystal and radiation from its surface. Growth rate v is set by v ρ L = k_s G_s − k_l G_l. Heater power sets the melt-side term; the hot zone (shields, reflectors, radiation to the cold chamber) sets the crystal-side gradient G_s, on the order of 20 to 40 K/cm for 300 mm and unavoidably larger at the edge (which radiates) than at the centre. This radial variation of G is the central problem of defect control.

**Rotation.** The crystal rotates at ~10 to 20 rpm; the crucible counter-rotates at ~5 to 15 rpm. Crystal rotation averages out azimuthal asymmetry of the thermal field (which would otherwise grow an oval or bent crystal), drives a centrifugal pumping flow under the interface that sets the solute boundary layer and hence k_eff, and flattens the interface. Crucible rotation homogenises the dopant and carries hot, oxygen-rich melt from the wall toward the centre, so more crucible rotation means more oxygen in the crystal: one of the main oxygen knobs.

**Crucible lift.** As silicon is withdrawn the melt level would fall and the interface would descend into a different thermal environment, so the crucible is raised at a rate matched to the volume removed: lift = v × (r_crystal / r_melt)² × (ρ_s / ρ_l). Holding the melt surface fixed relative to the heater and heat shield is what keeps G constant along the body.

**Diameter control.** A CCD camera looks down through a viewport at the **meniscus**: the bright ring where the liquid climbs to meet the crystal at silicon's 11° wetting angle and reflects the hot crucible wall. Its width and position give the diameter continuously to well under a millimetre. The **ADC** loop adjusts two actuators with very different time constants: pull rate for fast corrections (pull faster and the crystal narrows within minutes) and heater power for slow drift (tens of minutes, given the thermal mass of 400 kg of melt and a tonne of graphite). Older pullers and FZ furnaces instead weigh the crystal with a load cell and differentiate.

**Growth striations.** The melt below the interface is not still: buoyancy convection in a 400 kg melt (Grashof number above 10¹⁰) is turbulent, and the crystal rotating through a slightly asymmetric thermal field sees a temperature oscillation once per revolution. Both make the microscopic growth rate fluctuate, even momentarily remelting. Because k_eff depends on growth rate, dopant and oxygen end up modulated in thin bands, **striations**, visible in an etched cross-section like tree rings: resistivity variations of a few percent, and the main reason magnetic fields are applied.

### 8. Tail (end cone)

When the melt is nearly consumed (some 5 to 10% is normally left in the crucible; pulling to dryness changes the thermal field too much and the last melt is enriched in every k < 1 impurity), the crystal must be separated from the melt without a shock. If a 300 mm interface is simply lifted off, the abrupt loss of latent heat input generates a thermal stress wave that nucleates dislocations at the bottom face, and those dislocations glide back up into the body a distance on the order of one diameter (**slip-back**), scrapping the last 300 mm. So the pull rate is raised and the temperature increased to taper the crystal to a point over a **tail** or **end cone** of roughly 150 to 300 mm, at which point the contact area is small enough to detach harmlessly. Like the crown, the tail is scrap, and the operators' incentive is to make it as short as dislocation-free growth allows.

### 9. Cool-down and extraction

The crystal is raised into the pull chamber, the heater is ramped down, and the ingot cools for several hours in argon before the isolation valve is closed, the pull chamber vented, and the crystal lifted out with a hoist. The crucible, now cracked and coated in solidified residual melt, is pulled and scrapped; the hot zone is inspected and cleaned of SiO; a new crucible is charged. Turnaround between runs adds hours to the cycle. Grown ingots are then measured (resistivity by four-point probe at the ends, oxygen and carbon by FTIR, dislocation-free check by X-ray or etch, diameter and length) and either shipped to the wafer line or, for structure-loss or out-of-spec sections, cut up and returned as remelt charge.

## Point Defects, v/G, and the Voronkov Theory

The most consequential physics in the module is not about dislocations at all. A dislocation-free CZ crystal is still full of **intrinsic point defects**: **vacancies** (missing atoms) and **self-interstitials** (extra atoms squeezed between lattice sites). Both are present at the melting point at equilibrium concentrations around 10¹⁴ to 10¹⁵ cm⁻³ and both are frozen in as the crystal cools. What they do next determines whether the wafer is usable for a 2 nm gate oxide.

**Vladimir Voronkov** (1982) showed that which species survives is governed by a single ratio: the growth rate v divided by the axial temperature gradient at the interface G. At the interface, both species are incorporated at their equilibrium concentrations. Just behind the interface they annihilate each other in pairs (a vacancy plus an interstitial is a perfect lattice), and they diffuse. The interstitial diffuses faster than the vacancy, but the vacancy's equilibrium concentration at the melting point is somewhat higher. Both species are also carried away from the interface by the growth itself, at velocity v, and both diffuse back toward the interface down the concentration gradient that G creates.

- At **high v/G**, the advective flux dominates. Excess vacancies are swept into the cooling crystal faster than interstitials can diffuse in and annihilate them. The crystal becomes **vacancy-rich** (labelled V-type).
- At **low v/G**, diffusion has time to act; the faster-diffusing interstitials win, the vacancies are consumed, and the crystal becomes **interstitial-rich** (I-type).
- The crossover is at a critical value **(v/G)_crit ≈ 1.3 to 2 × 10⁻³ cm²/(min·K)**, i.e. ~0.13 to 0.2 mm²/(min·K). With G ≈ 3 K/mm, the critical pull rate is ~0.4 to 0.6 mm/min.

Because G is higher at the crystal edge than at the centre, the same pull rate can give V-type at the centre and I-type at the rim. The boundary between them is decorated by a ring of **oxidation-induced stacking faults (OSF ring)** that shows up after oxidation. As pull rate rises the ring moves outward and disappears off the edge (fully V-type); as it falls the ring shrinks to the centre (fully I-type).

Each regime has its own signature defect, formed as the crystal cools through ~1,100 to 1,000 °C where the supersaturated point defects agglomerate:

- **V-type: COPs.** Excess vacancies condense into octahedral **voids**, roughly 100 to 200 nm across, bounded by {111} faces, with a ~2 nm oxide lining on the inner walls, at densities of ~10⁵ to 10⁶ cm⁻³. When a wafer is polished and then cleaned in SC-1 (the ammonia-peroxide step of the RCA clean, which etches silicon slowly), the voids intersecting the surface open up into pits, and laser surface scanners count them as particles. Hence the name **crystal-originated particles (COPs)**, coined in the early 1990s when engineers realised the "particles" that would not wash off were coming from the crystal. A COP under a gate oxide is a gate oxide integrity (GOI) failure: the oxide thins over the pit and breaks down early. In the 1990s, when gate oxides were 5 to 10 nm, COPs became the dominant substrate quality problem.
- **I-type: A-defects / L-pits.** Excess interstitials condense into dislocation loops and networks (historically A-swirl and B-swirl, seen as swirl patterns in etched slices, now called L-pits or LDPs in the "large" size class). These are worse than voids: a dislocation loop in the active region is a leakage path, and they cannot be annealed out.

Three strategies deal with COPs, and the industry uses all three:

1. **Epitaxy.** Deposit a few micrometres of defect-free silicon on top (Module 03); the voids are buried and the device sees a perfect surface. Standard for logic epi wafers.
2. **High-temperature annealing.** An argon or hydrogen anneal at ~1,200 °C dissolves the oxide lining and closes the voids in the top few micrometres (**annealed wafers**, used heavily in DRAM).
3. **Grow without them: "perfect silicon."** Hold v/G near critical across the whole radius so neither species is supersaturated enough to agglomerate. This needs a hot zone (heat shields, cooling jackets around the crystal) engineered to flatten the radial profile of G, and a pull rate that is slow and controlled to within a few percent. The window is narrow: on the V side a "P_v" band where vacancies exist but are too few to form voids (they seed oxygen precipitates instead, usefully), and on the I side a "P_i" band with interstitials but no loops. Growing a 2 m body entirely inside that window is what MEMC (now GlobalWafers) commercialised as "Perfect Silicon"; Shin-Etsu, SUMCO and Siltronic have their own versions. **Nitrogen doping** at ~10¹⁴ to 10¹⁵ cm⁻³ helps: nitrogen binds vacancies, raises the void nucleation temperature, and yields many small voids instead of few large ones, which an anneal or epi removes. Faster cooling through the ~1,100 °C nucleation range does the same.

The economic point: defect-free growth means a pull rate of perhaps 0.4 to 0.6 mm/min instead of ~1 mm/min, so a puller makes fewer wafers per day, and the choice between polished-perfect, epi and annealed wafers is a cost and application decision made customer by customer.

## Oxygen and Carbon

### Where the oxygen comes from

The melt dissolves its crucible. SiO₂ + Si → 2 SiO: the reaction at the wall puts oxygen into the melt at concentrations near 10¹⁸ cm⁻³. Melt convection carries it to the free surface, where roughly 99% of it evaporates as SiO gas and is swept out by the argon. The ~1% that instead reaches the crystal interface is incorporated, with k ≈ 1.25, giving **interstitial oxygen** concentrations in CZ silicon of about **10 to 18 ppma** (parts per million atomic; 1 ppma = 5 × 10¹⁶ cm⁻³, so 5 × 10¹⁷ to 9 × 10¹⁷ cm⁻³), with a typical logic spec around 10 to 14 ppma and a tolerance of a few ppma along the whole length. Oxygen content is set by a balance of wall dissolution (crucible rotation, melt temperature, wetted area, which shrinks as the melt is consumed) against surface evaporation (argon pressure and flow, free surface area) and transport (convection, which magnets damp). Because the wetted area falls over the run, oxygen tends to fall from seed to tail even though k > 1, and recipes compensate by adjusting crucible rotation and argon pressure along the body.

### Why oxygen is wanted, and where it is not

Oxygen at ~10¹⁸ cm⁻³ is far above its solubility at device-processing temperatures, so during fab thermal cycles it precipitates as SiO₂ (more precisely SiO_x platelets and octahedra). That was a disaster in the 1970s (random precipitates in the device region) until it was turned into a feature:

- **Mechanical strength.** Dissolved oxygen pins dislocations and raises the yield stress. A CZ wafer survives rapid thermal processing and the sag of a hot 300 mm wafer on three furnace pins without slipping; an oxygen-free Float Zone wafer frequently does not, which is a large part of why FZ stays at smaller diameters.
- **Intrinsic gettering (IG).** A sequence of a ~1,100 °C out-diffusion step (clearing oxygen from the top ~10 to 30 µm), nucleation at 650 to 800 °C and growth near 1,000 °C produces a precipitate-free **denuded zone** at the surface over a bulk dense with SiO₂ precipitates and the dislocation loops they punch out, which trap fast-diffusing Fe, Cu and Ni before they reach the junctions. MEMC's "magic denuded zone" (MDZ) uses a rapid thermal anneal to inject a vacancy profile that programs where precipitation happens. In low-thermal-budget logic flows classic IG is less effective, and wafer makers instead engineer the vacancy profile during growth (the P_v band) or use epi.
- **Thermal donors.** Oxygen clusters formed near 450 °C act as double donors; a 650 °C "donor kill" anneal dissolves them, and resistivity is specified after it.
- **Where it is unwanted.** Image sensors (precipitates are white pixels), power, RF and high-resistivity substrates all specify low oxygen, delivered by MCZ.

### Carbon

Graphite hot-zone parts react with SiO to make CO, which dissolves in the melt and gives **substitutional carbon** in the crystal. With k = 0.07 it accumulates in the melt and rises toward the tail. Specs are typically below 0.1 to 0.5 ppma (5 × 10¹⁵ to 2.5 × 10¹⁶ cm⁻³), detected by FTIR at the 605 cm⁻¹ absorption line. Carbon matters mostly because it nucleates oxygen precipitation, making precipitate density uncontrollable. Hot zones with SiC-coated graphite, CFC, and good argon purge design are how it is kept down.

## Magnetic Czochralski

Liquid silicon is a metal with electrical conductivity around 10⁶ S/m. A conductor moving through a magnetic field feels a Lorentz force opposing its motion, so a static field acts as a viscosity multiplier on the melt: it damps turbulent buoyancy convection, quiets the temperature fluctuations behind striations, thickens the diffusion boundary layer at the crucible wall (less oxygen dissolved and transported), and stabilises the interface. Two geometries dominate:

- **Transverse (horizontal) MCZ**, typically 0.2 to 0.4 T across the melt, is the workhorse: strongest convection suppression and lowest oxygen, at the cost of a non-axisymmetric field the rotating crystal must be managed through.
- **Cusp MCZ** uses two coaxial coils with opposing currents, giving a field radial at the melt surface, axial at the crucible bottom and zero at the melt centre, at lower strength (~0.05 to 0.15 T at the wall). It damps the wall boundary layer while leaving the interface region nearly field-free, preserving axisymmetry with intermediate oxygen control.
- **Vertical (axial)** fields are used less, since they worsen radial dopant uniformity by suppressing mixing under the interface.

At 300 mm, with 400 kg melts far into the turbulent regime, MCZ is not optional: it is how large melts are kept quiet enough to grow defect-controlled crystals at all. Superconducting magnets have displaced resistive coils because they draw little power once charged. Solar pullers, with looser oxygen specs, mostly skip magnets.

## The Ingot: Size, Mass, and Time

A finished 300 mm ingot has a body about 2 m long (the range runs from ~1.5 to over 2.5 m depending on charge and puller), weighs ~250 to 350 kg in the body alone, and carries a crown and tail of perhaps 20 to 40 kg between them. It has been in the puller for 30 to 50 hours of growth, plus meltdown, cool-down and turnaround, for a cycle of roughly two and a half to three and a half days.

> **Worked example: ingot mass and wafer count from geometry.**
> Body diameter as grown: 306 mm (radius 15.3 cm). Body length: 2.0 m. Volume = π × 15.3² × 200 = π × 234.1 × 200 ≈ 1.47 × 10⁵ cm³. Mass = 1.47 × 10⁵ cm³ × 2.33 g/cm³ ≈ **343 kg**. Add a crown and tail of perhaps 30 kg and ~30 to 40 kg of melt left in the crucible, and the charge had to be at least ~400 to 420 kg, which is exactly the 32 to 36 inch crucible class. How many wafers is that? A 300 mm wafer is 775 µm thick, the diamond wire kerf is ~150 to 200 µm, and grinding, slicing damage and edge losses add a bit more, so budget ~1.05 to 1.1 mm of ingot per wafer. 2,000 mm / 1.08 mm ≈ **1,850 wafers** gross from the body. Each finished wafer has mass π × 15² × 0.0775 × 2.33 ≈ 128 g, so 1,850 wafers carry 237 kg of silicon; the other ~105 kg of the body went to kerf, grinding swarf, and edge grinding. Silicon utilisation from charge to finished wafer is on the order of 55 to 60% before any losses to structure loss, out-of-spec ends or wafer-line breakage. Cost intuition: at roughly $20 to $30 per kg for electronic-grade polysilicon the 400 kg charge cost ~$10,000, about $5 to $6 per gross wafer. The crucible, argon, electricity (a ~150 kW hot zone for ~50 hours is ~7 MWh, on the order of $500 to $1,000), depreciation on a multi-million-dollar puller and the wafering line that follows together cost far more than the silicon. A prime 300 mm polished wafer sells for roughly $100 to $150 and an epi wafer for more, so the crystal is a minority of the wafer's cost but a majority of its quality.

Volume context: world 300 mm demand as of ~2025 is on the order of 7 to 9 million wafers per month (SEMI reported 12,973 million square inches of silicon shipped in 2025, roughly three quarters of it 300 mm), which at ~1,500 to 1,800 good wafers per ingot is roughly 4,000 to 6,000 ingots per month from a global fleet of pullers numbering in the low thousands, each producing about 8 to 12 ingots per month.

## The Heavy-Crystal Problem

The whole ingot hangs from the Dash neck. A 3 mm neck has a cross-section of 7 mm². Three hundred kilograms on it is a tensile stress of about 400 MPa. Dislocation-free silicon is intrinsically very strong (theoretical strength is several GPa, and small defect-free whiskers approach that), but a real neck has surface roughness, a slightly non-round section, thermal stress, and possibly dynamic loads from the cable and rotation, and necks have broken. When a neck breaks, a 300 kg red-hot crystal drops into a crucible of molten silicon. Puller designs accept that this will eventually happen and build for containment, but the run and probably the hot zone are lost.

> **Worked example: neck stress versus diameter.**
> Stress σ = m g / (π r²). For m = 300 kg, g = 9.81 m/s²: load = 2,943 N. At 3 mm diameter (r = 1.5 mm): σ = 2,943 / (7.07 × 10⁻⁶ m²) ≈ 416 MPa. At 4 mm: 234 MPa. At 5 mm: 150 MPa. At 6 mm: 104 MPa. Practical design limits, with safety margin against surface flaws, are usually quoted at a couple of hundred MPa, which explains why the industry's comfort zone for a plain 3 to 4 mm neck tops out at roughly 200 to 300 kg, right where 300 mm ingots live, and why a 450 mm ingot (see below), with a body approaching a tonne, could never hang from a Dash neck at all.

Three solutions are in production use:

1. **Thicker necks, grown faster.** Dash necking still works at 5 to 6 mm if the pull rate is high enough, at the cost of time and a higher chance of failing to clear the dislocations; some recipes grow a thin section first and then expand to a thicker support section before the crown.
2. **Heavily boron-doped seeds.** Boron above ~10¹⁹ cm⁻³ hardens the lattice enough that the thermal shock of dipping does not generate dislocations, allowing dislocation-free growth from a large seed with no thin neck. Shin-Etsu pioneered this "neck-less" approach in the 1990s; it suits p+ substrates best, but a doped seed can serve a lightly doped melt if the boron it carries in is tolerable.
3. **Mechanical crystal support.** After the crown is grown, jaws or a collar in the pull chamber close around the crown or a purpose-grown ledge and carry the weight for the rest of the run. SUMCO, Shin-Etsu, MEMC and others patented variants through the 1990s and 2000s, and they are standard on 300 mm pullers.

## Yield: What Gets Thrown Away

From a 400 kg charge, the accounting looks like this in a typical, successful run:

- Residual melt left in the crucible (**pot scrap**, ~5 to 10%), returned to the poly supplier or a lower-grade user.
- Crown, neck and tail: ~5 to 10% of crystal mass, cut off and remelted.
- Resistivity out-of-spec ends (the last 10 to 20% of an n-type body, less for boron): remelt or sold as a different spec.
- Dislocated sections from any structure-loss event: remelt.
- Oxygen out-of-spec sections: remelt or downgrade.

The body sold into the wafer line is therefore commonly 70 to 80% of the charge on a good run and much less on a bad one. Structure loss is the big variable: a run that loses structure twice and recovers still yields, but its cycle time has grown by many hours, and one that loses structure late in a long body may be scrapped entirely. Growers track "dislocation-free yield" as a top-line metric; the exact figures are proprietary.

## Float Zone

**Float Zone (FZ)** growth solves the crucible problem by not having one. A polycrystalline feed rod (a Siemens rod from Module 01, ground round, typically 100 to 200 mm in diameter and crack-free, a demanding spec of its own) is held vertically. A single-turn, water-cooled copper **RF induction coil** at ~2 to 3 MHz melts a short section; the molten zone is held by surface tension (silicon's is an unusually high 0.72 N/m) plus the electromagnetic pressure of the RF field, and is traversed from the seed end at the bottom to the top, leaving single crystal behind. The dominant industrial form is the **needle-eye technique**: the coil's hole is smaller than both feed rod and crystal, molten silicon flows down through the "eye" onto the growing crystal, and diameter is set by the balance of feed rate, growth rate and zone temperature rather than by a container. The seed is dipped into a melt drop and Dash-necked exactly as in CZ; both crystal and feed rod rotate; growth rates are ~2 to 4 mm/min. The chamber runs in argon at a few bar to suppress arcing from the multi-kilovolt coil. Doping is by phosphine or diborane added to the argon, or, for the most uniform n-type material, by **neutron transmutation doping (NTD)**: the finished ingot is irradiated in a research reactor, where ³⁰Si (3.1% natural abundance) captures a neutron to become ³¹Si, which beta-decays (2.6-hour half-life) into ³¹P. Because the flux penetrates uniformly, NTD gives radial resistivity variation under ~5%, far better than any melt; reactors at Petten (Netherlands), OPAL (Australia) and elsewhere sell it as a service.

What FZ delivers that CZ cannot: **oxygen below ~10¹⁶ cm⁻³** (two orders of magnitude below CZ), carbon similarly low, and resistivity up to 10⁴ Ω·cm and beyond, since there is no crucible to leach impurities and the zone itself sweeps k < 1 impurities to the top of the rod. Its limit follows from the physics: the zone is held by surface tension against gravity, and the supportable zone height does not grow with diameter, so stability falls as diameter rises. **Production FZ tops out at 200 mm** (Siltronic, which has offered 200 mm FZ since 2002, and Topsil, now part of GlobalWafers, are the volume producers, with Shin-Etsu also present); 300 mm FZ has been demonstrated in research but is not a commercial product as of ~2025. Topsil's FZ300 programme (2025 to 2028) aims to build a 300 mm FZ growth machine, and Siltronic serves 300 mm customers who need FZ-like low oxygen with an ultra-low-oxygen MCZ product instead. The feed rod is expensive, each ingot is small, and the oxygen-free crystal is mechanically fragile in the fab, so FZ wafers cost a multiple of CZ. The market is **power devices** (IGBTs and diodes from 600 V to 6.5 kV, HVDC thyristors: high resistivity holds off voltage and low oxygen means no thermal donors or precipitates in a 100 µm drift region), **radiation detectors** and photodiodes (long lifetime, low leakage), **RF and high-resistivity substrates**, and some MEMS. FZ furnaces come almost entirely from PVA TePla (FZ-35 and FZ-40 series).

## 450 mm: The Diameter That Did Not Happen

The industry stepped 100 → 125 → 150 → 200 → 300 mm on a rough 10-year cadence, each step cutting cost per die by ~30% via area scaling. 300 mm entered volume production around 2001–2002, and 450 mm was scheduled for the 2010s. For crystal growth it was demanding but tractable: SUMCO, Shin-Etsu, Siltronic and MEMC all grew 450 mm ingots in 40-inch-class crucibles with charges approaching a tonne, and shipped test wafers to the **Global 450mm Consortium (G450C)**, formed in 2011 by Intel, TSMC, Samsung, IBM and GlobalFoundries at SUNY Albany. A 450 mm ingot carries 2.25× the mass per unit length of a 300 mm one, so crystal support, melt convection and v/G control all scaled painfully, but defect-controlled 450 mm material was demonstrated.

What killed it was not the crystal. The tool makers, above all ASML, faced a full redevelopment of every process tool for a diameter only the three or four largest fabs could use, and in late 2013 ASML paused its 450 mm programme. Intel, the main sponsor, had an under-utilised fab shell (Fab 42) and pulled resources in 2014; TSMC reprioritised node development over 450 mm; by 2017 G450C had wound down. The underlying economics: EUV, multi-patterning and packaging had become the cost and capacity constraints, not wafer area, and no tool vendor would fund a new platform for a handful of customers. The wafer makers wrote off their 450 mm pullers or repurposed them for extra-long 300 mm ingots. As of 2026 there is no 450 mm roadmap at any foundry.

## Epi Versus Bulk: What the Crystal Grower Is Growing For

The crystal is grown to a substrate specification, and there are three families:

- **Polished bulk wafers**: the ingot slice, ground, polished, cleaned and used as-is. DRAM and NAND use these (annealed variants for DRAM), as does much trailing-edge logic and analog. The crystal's own defect engineering (perfect-silicon growth, nitrogen doping, oxygen control) must deliver the surface quality directly.
- **Epitaxial wafers** (Module 03): a substrate with a few micrometres of CVD-grown single-crystal silicon on top, whose doping is set by the CVD, not by segregation. Advanced logic mostly uses **p/p−** (lightly doped epi on a lightly doped substrate); the older **p/p+** (epi on a ~0.005 to 0.02 Ω·cm boron substrate) gives near-immunity to CMOS latch-up, strong gettering, and a substrate whose COPs are buried. Vertical power MOSFETs use **n/n+** on arsenic- or antimony-doped substrates because the substrate is the drain. Heavily doped n+ substrates are where segregation bites: arsenic evaporates, antimony has k = 0.023, and both hit constitutional supercooling, so n+ ingots are pulled slowly and priced accordingly.
- **SOI** (silicon-on-insulator): a wafer bonded to a handle with an oxide between, via Smart Cut (Soitec, Module 03); the crystal requirements are those of a polished wafer.

As of ~2025 the leading edge uses polished "perfect silicon" and p/p− epi for logic and annealed or polished wafers for memory, with 3D NAND's enormous film stress pushing oxygen specs upward for warpage resistance.

## Solar CZ: Same Physics, Different Economics

By tonnage, most CZ silicon now goes to photovoltaics, and solar pullers have become a different species. Mono ingots for wafers up to ~210 mm square (a "G12" ingot is ~295 mm in diameter) are grown in 32- to 40-inch crucibles, and to maximise silicon per crucible the process **recharges** the hot crucible with polysilicon several times (RCZ), pulling 4 to 8 ingots per crucible, or feeds granular polysilicon continuously into an outer annulus at the rate crystal is withdrawn (**continuous CZ, CCZ**). CCZ holds the melt composition constant, so dopant along the ingot is flat regardless of k, which is essential for gallium-doped p-type (k = 0.008) and valuable for phosphorus-doped n-type (TOPCon). A solar crucible sees over a tonne of silicon in its life, ingots run 3 to 5 m, and a solar puller from JSG or Ferrotec costs a small fraction of a semiconductor puller and runs without magnets; thousands operate in Inner Mongolia, Ningxia, Yunnan and Xinjiang. Solar scale in turn underpins the crucible, graphite and puller supply chains that semiconductor wafer makers depend on.

## Key Numbers

| Quantity | Value |
|---|---|
| Silicon melting point | 1,414 °C |
| Density: solid / liquid at m.p. | 2.33 (2.30 at m.p.) / 2.57 g/cm³ |
| Latent heat of fusion | ~1,790 J/g (~50 kJ/mol) |
| Lattice constant / atomic density | 0.5431 nm / 5.0 × 10²² cm⁻³ |
| 300 mm CZ charge | ~300 to 450 kg (up to 500+ kg) |
| Crucible diameter for 300 mm | 32 to 36 inch (~810 to 915 mm) |
| Argon pressure in chamber | ~10 to 50 mbar |
| Heater power (300 mm puller) | on the order of 100 to 200 kW |
| Dash neck diameter / length / pull rate | 3 to 4 mm / 100 to 200 mm / ~3 to 6 mm/min |
| Body pull rate | ~0.5 to 1.5 mm/min (300 mm: mostly 0.5 to 1.0) |
| Crystal / crucible rotation | 10 to 20 rpm / 5 to 15 rpm, counter-rotating |
| (v/G)_crit (Voronkov) | ~1.3 to 2 × 10⁻³ cm²/(min·K) |
| COP void size / density | ~100 to 200 nm / ~10⁵ to 10⁶ cm⁻³ |
| Interstitial oxygen (CZ) | 10 to 18 ppma (1 ppma = 5 × 10¹⁶ cm⁻³) |
| Oxygen (FZ) | < 10¹⁶ cm⁻³ |
| Carbon spec | < 0.1 to 0.5 ppma |
| Segregation coefficients B / P / As / Sb | 0.8 / 0.35 / 0.3 / 0.023 |
| MCZ field: transverse / cusp | ~0.2 to 0.4 T / ~0.05 to 0.15 T |
| 300 mm ingot body | ~2 m long, ~250 to 340 kg |
| Growth time / total cycle | 30 to 50+ h / ~2.5 to 3.5 days |
| Wafers per 2 m body | ~1,800 gross (~1.05 to 1.1 mm of ingot per wafer) |
| Neck stress at 300 kg, 3 mm neck | ~400 MPa |
| FZ maximum production diameter | 200 mm |
| 450 mm status | G450C 2011 to ~2017, abandoned |
| Top-5 wafer maker share | ~85 to 90% of revenue (Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron) |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Shin-Etsu Handotai (SEH) | Japan | Largest silicon wafer maker; CZ and FZ; in-house pullers and hot zones | Leader (~30% of wafer revenue) |
| SUMCO | Japan | CZ wafers, epi; in-house pullers; owns Japan Super Quartz crucibles | #2 (~25%) |
| GlobalWafers | Taiwan | CZ, epi, FZ (via Topsil); ex-MEMC/SunEdison "Perfect Silicon"; new Sherman, Texas 300 mm fab | #3 (~15 to 17%) |
| Siltronic | Germany | CZ 300 mm (Freiberg, Singapore), FZ leader (Burghausen) | #4 (~12 to 13%) |
| SK Siltron | South Korea | CZ 300 mm; SiC wafers (SK Siltron CSS, US) | #5 (~10 to 12%) |
| NSIG (Zing Semiconductor) / TCL Zhonghuan | China | Domestic 300 mm CZ wafer entrants | Growing niche |
| Okmetic | Finland | Specialty CZ (MEMS, RF, high-resistivity) up to 200 mm | Niche |
| PVA TePla (CGS) | Germany | Semiconductor CZ pullers; dominant FZ furnace maker (FZ-35/40) | Leader in FZ equipment |
| Ferrotec | Japan / China | CZ pullers (solar and semiconductor), crucibles, graphite, wafers | Major |
| Linton Crystal Technologies | USA | CZ pullers (Kayex lineage since 1952; KX300 first 300 mm puller, 1987) | Niche, US supplier |
| Zhejiang Jingsheng (JSG) | China | Volume solar CZ pullers; entering semiconductor pullers | Leader in solar pullers |
| S-TECH | South Korea | CZ pullers | Niche |
| Shin-Etsu Quartz, Momentive, Heraeus Conamic, Japan Super Quartz, Coorstek | Japan / USA / Germany | Synthetic-lined fused-silica crucibles | Oligopoly |
| Sibelco, The Quartz Corp (Spruce Pine, NC) | Belgium / Norway (US mines) | High-purity quartz sand for crucibles | Near-monopoly on top grades |
| Toshiba, Sumitomo Heavy Industries, Mitsubishi Electric, JASTEC | Japan | Superconducting magnets for MCZ | Leaders |
| Toyo Tanso, SGL Carbon, Tokai Carbon | Japan / Germany | Isostatic graphite and CFC hot-zone parts | Leaders |

## Common Misconceptions

- **"The crucible is just a container."** → It is a consumable reactant. It dissolves at ~10¹⁸ cm⁻³ oxygen into the melt for the entire run, is the source of nearly all oxygen in a CZ wafer, defines the bulk mechanical strength and gettering behaviour of every wafer built on it, and is scrapped after a single use.
- **"A dislocation-free crystal is a defect-free crystal."** → Dash necking removes line defects; the crystal still contains ~10¹⁴ to 10¹⁵ cm⁻³ point defects that agglomerate into voids (COPs) or loops depending on v/G. Controlling those is the modern crystal grower's main job.
- **"Faster pulling is just about throughput."** → The pull rate, through v/G, decides whether the crystal is vacancy-rich or interstitial-rich. Perfect-silicon growth deliberately pulls slower than the puller could.
- **"Oxygen in the wafer is a contaminant to be minimised."** → For most logic and memory wafers it is deliberately kept at 10 to 14 ppma for mechanical strength and intrinsic gettering. Only image sensors, power and RF products want it low, and they pay for MCZ or FZ.
- **"450 mm was abandoned because the ingots could not be grown."** → 450 mm ingots and wafers were grown and shipped to G450C. It stalled because the process-tool vendors (ASML above all) would not fund a full tool generation for a handful of customers, and because EUV and packaging, not wafer area, had become the cost levers.
- **"Float Zone is the higher-quality process, so it should replace CZ."** → FZ is purer but limited to 200 mm, more expensive, and its oxygen-free wafers are mechanically weak in a fab. CZ is the only route to 300 mm, and CZ oxygen is a feature for CMOS.

## Where This Fits in the Supply Chain

This stage consumes the electronic-grade polysilicon of Module 01 (Wacker, Hemlock, OCI, Tokuyama, GCL and Daqo chunk and granules, at roughly $20 to $30/kg), synthetic-lined quartz crucibles built from Spruce Pine sand, isostatic graphite and CFC hot-zone parts, argon, dopant alloys and enormous amounts of electricity, and it turns them into dislocation-free single-crystal ingots of specified orientation, resistivity, oxygen and defect type. Its customers are almost always in the same building: Shin-Etsu, SUMCO, GlobalWafers, Siltronic and SK Siltron are vertically integrated from crystal to polished wafer, and the ingot moves straight to the cropping, grinding, slicing, lapping, etching, polishing and epitaxy line described in Module 03, which converts a 2 m, 300 kg ingot into ~1,500 to 1,800 polished 300 mm wafers that ship to TSMC, Samsung, Intel, Micron and SK hynix in FOUPs of 25.

## Further Reading

- W. Zulehner, "Czochralski growth of silicon," *Journal of Crystal Growth* 65 (1983) 189–213. The classic review of the CZ process by Wacker's crystal-growth head.
- W. C. Dash, "Growth of silicon crystals free from dislocations," *Journal of Applied Physics* 30 (1959) 459–474. The original necking paper.
- V. V. Voronkov, "The mechanism of swirl defects formation in silicon," *Journal of Crystal Growth* 59 (1982) 625–643. The v/G theory.
- R. Falster and V. V. Voronkov, "The engineering of intrinsic point defects in silicon wafers and crystals," *Materials Science and Engineering B* 73 (2000) 87–94. Point-defect engineering as practised at MEMC.
- F. Shimura, *Semiconductor Silicon Crystal Technology* (Academic Press, 1989). Still the most complete textbook on silicon crystal growth, oxygen and defects.
- P. Rudolph (ed.), *Handbook of Crystal Growth, 2nd ed., Vol. II: Bulk Crystal Growth* (Elsevier, 2015). Chapters on CZ silicon, MCZ, and FZ.
- W. von Ammon, "FZ and CZ crystal growth: cost driving factors and new perspectives," *physica status solidi (a)* 211 (2014) 2461–2470. Siltronic's view of the economics, including 450 mm.
- SUMCO, "Silicon wafer manufacturing process" and technical pages at sumcosi.com; Siltronic, "Float Zone" product and technology pages at siltronic.com.
- The Register, "How TSMC killed 450mm wafers for fear of Intel, Samsung" (August 2022), and SemiWiki/TechInsights, "The Lost Opportunity for 450mm" (2022), on why the diameter transition stalled.
- Linton Crystal Technologies, company history and timeline (lintoncrystal.com), for the Hamco/Kayex/Linton puller lineage.
