# Module 06: Thermal Oxidation and Thin-Film Deposition

A leading-edge logic chip is a stack of a few hundred distinct thin films. Some are 1 nm thick and must be the same 1 nm thick on the top, sides, and underside of a silicon ribbon 10 nm wide. Some are 1 µm thick and must fill a trench 20 nm wide and 300 nm deep without leaving a void. Some must be crystalline and strained, some amorphous and porous, some conductive to 10 µΩ·cm, some insulating to 10 MV/cm. Every one of them has to be deposited on a 300 mm wafer with thickness uniformity better than 1% and essentially zero added particles, and each of the roughly 1,000+ steps in the flow (Module 05) that puts a film down has to be done within a **thermal budget**: heat that would be fine in isolation smears dopant profiles, relaxes strain, or melts copper lines that were already built.

This module covers the five ways a fab puts a film on a wafer: growing it out of the substrate (thermal oxidation), growing it epitaxially (epi), condensing it from a chemical reaction in gas (CVD), building it one atomic layer at a time (ALD), and knocking it off a solid target with ions (PVD). The order roughly follows the historical order in which the industry came to rely on each one, and, not coincidentally, the order of decreasing process temperature.

## 1. Thermal Oxidation: Growing SiO2 from the Wafer Itself

### 1.1 The chemistry and the buried interface

Heat a silicon wafer to 800–1,200 °C in oxygen or steam and it converts itself to silicon dioxide:

- Dry oxidation: Si + O2 → SiO2
- Wet oxidation: Si + 2 H2O → SiO2 + 2 H2

The critical mechanistic fact is *where* the reaction happens. The oxidant does not react at the top of the oxide; it dissolves into the existing SiO2, diffuses through it as molecular O2 (or H2O), and reacts at the **Si/SiO2 interface** at the bottom. Marker experiments with oxygen isotopes settled this in the 1960s: new oxide appears at the interface and the old oxide rides upward on top of it. Every oxidation step therefore produces a freshly formed interface that has never been exposed to air, handling, or the cleanroom. This is the single most important reason thermal oxide is such a good gate dielectric.

Because the reaction consumes the substrate, the oxide is partly "in" the original silicon surface. The number density of Si atoms in the crystal is 5.0 × 10²² cm⁻³; the density of SiO2 "molecules" in amorphous thermal oxide (2.2 g/cm³, 60.08 g/mol) is 2.2 × 10²² cm⁻³. Every Si atom becomes one SiO2 unit, so a thickness x of oxide consumes 2.2/5.0 = **0.44 x** of silicon. Grow 100 nm of oxide and the silicon surface has retreated 44 nm; the top of the oxide sits 56 nm above where the surface used to be. Textbooks quote 44–46% depending on the exact oxide density assumed. This matters when you grow an oxide through a mask (the classic LOCOS "bird's beak" of the 1980s), when you use a sacrificial oxide to round fin corners or strip damaged silicon, and when you calculate how much of a nanosheet a 1 nm interfacial oxide has eaten.

### 1.2 The Deal-Grove model

Bruce Deal and Andrew Grove (later CEO of Intel) published the model in 1965 and it has held up remarkably well for oxides thicker than ~30 nm. It treats the process as three fluxes in series, in steady state:

1. **Gas-phase transport** to the oxide surface: F1 = h (C* − C0), where C* is the equilibrium concentration of oxidant in the oxide surface (set by Henry's law from the gas partial pressure), C0 is the actual surface concentration, and h is a gas-phase mass-transfer coefficient.
2. **Diffusion through the oxide**: F2 = D (C0 − Ci) / x, Fick's law across the existing thickness x, where Ci is the concentration at the interface and D is the diffusivity of oxidant in SiO2.
3. **Reaction at the interface**: F3 = k Ci, first order in oxidant concentration, with a rate constant k.

Setting F1 = F2 = F3 = F and noting that the growth rate is dx/dt = F / N1, where N1 is the number of oxidant molecules per unit volume of oxide (2.2 × 10²² cm⁻³ for O2, and twice that, 4.4 × 10²² cm⁻³, for H2O because it takes two water molecules per SiO2), gives a differential equation whose solution is the **linear-parabolic law**:

x² + A x = B (t + τ)

with A = 2D (1/k + 1/h), B = 2 D C* / N1, and τ a time offset that accounts for any oxide present at t = 0 (including the native oxide and the anomalously fast initial dry growth). Solving for x:

x(t) = (A/2) [ √(1 + 4B (t + τ)/A²) − 1 ]

Two limits fall out:

- **Linear regime** (thin oxide, x ≪ A): x ≈ (B/A)(t + τ). Growth is limited by the interface reaction; the oxidant reaches the interface as fast as it can be consumed. B/A is the **linear rate constant**, and it carries the activation energy of the Si–Si bond-breaking reaction, ~2.0 eV for both dry and wet.
- **Parabolic regime** (thick oxide, x ≫ A): x² ≈ B t. Growth is limited by diffusion through the ever-thicker oxide; the rate falls as 1/x. B is the **parabolic rate constant** and carries the activation energy of oxidant diffusion in SiO2: ~1.23 eV for O2, ~0.78 eV for H2O.

The crossover is at x ≈ A. The rate constants, in the compact Arrhenius form used in most textbooks (for (111) silicon; divide B/A by 1.68 for (100)):

| Ambient | B (µm²/h) | B/A (µm/h) |
|---|---|---|
| Dry O2 | 772 · exp(−1.23 eV / kT) | 6.23 × 10⁶ · exp(−2.0 eV / kT) |
| Wet (H2O, ~640 torr) | 386 · exp(−0.78 eV / kT) | 1.63 × 10⁸ · exp(−2.05 eV / kT) |

Evaluated, Deal and Grove's own experimental table gives roughly:

| T (°C) | Dry: A (µm) | Dry: B (µm²/h) | Dry: B/A (µm/h) | Dry: τ (h) | Wet: A (µm) | Wet: B (µm²/h) | Wet: B/A (µm/h) |
|---|---|---|---|---|---|---|---|
| 920 | 0.235 | 0.0049 | 0.021 | 1.4 | 0.50 | 0.203 | 0.41 |
| 1000 | 0.165 | 0.0117 | 0.071 | 0.37 | 0.226 | 0.287 | 1.27 |
| 1100 | 0.090 | 0.027 | 0.30 | 0.076 | 0.11 | 0.510 | 4.64 |
| 1200 | 0.040 | 0.045 | 1.12 | 0.027 | 0.05 | 0.720 | 14.4 |

Why is wet oxidation 20–25× faster in the parabolic regime? Not because H2O diffuses faster (it actually diffuses somewhat more slowly than O2 in silica) but because its solubility C* in SiO2 is enormously higher: ~3 × 10¹⁹ cm⁻³ for water versus ~5 × 10¹⁶ cm⁻³ for O2 at 1,000 °C, a factor of ~600. Water also reacts with the silica network itself (Si–O–Si + H2O → 2 Si–OH), opening it up and making the oxide slightly less dense, which is why wet oxides are marginally worse dielectrics and were historically reserved for thick field and isolation oxides while thin gate oxides were always grown dry.

> **Worked example: how long to grow an oxide?**
> Suppose a 1970s-style process (the era of ~100 nm gate oxides) needs a 100 nm dry gate oxide at 1,000 °C. Using the (111) table, A = 0.165 µm, B = 0.0117 µm²/h, τ = 0.37 h, and x = 0.100 µm:
> t = (x² + A·x)/B − τ = (0.0100 + 0.0165)/0.0117 − 0.37 = 2.26 − 0.37 ≈ **1.9 h**.
> Note that x = 100 nm is smaller than A = 165 nm, so this oxide is grown mostly in the mixed linear-parabolic region: the linear term (A·x = 0.0165) is bigger than the parabolic term (x² = 0.010). Now compare a 1 µm oxide for isolation:
> Dry at 1,000 °C: (1.0 + 0.165)/0.0117 − 0.37 ≈ **99 h**. Nobody does this.
> Wet at 1,000 °C: A = 0.226, B = 0.287: (1.0 + 0.226)/0.287 ≈ **4.3 h**. This is why thick oxides are always grown wet.
> Wet at 1,100 °C: (1.0 + 0.11)/0.51 ≈ **2.2 h**. Every 100 °C roughly halves the time.
> In all cases the silicon consumed is 0.44 × 1 µm = 440 nm. For the 100 nm gate oxide, the channel surface moved down 44 nm, which is why the pre-oxidation implant depths in old processes were specified relative to the *post-oxidation* surface.

The model breaks down for thin dry oxides (< 20–30 nm), where growth is faster than predicted; that is what the τ term empirically patches. Various explanations (a space-charge-enhanced field driving O2⁻ ions, micro-channels, strain at the interface) were debated for decades; the modern Massoud correction adds an exponentially decaying extra term to the rate. In practice, nobody today grows a sub-2 nm gate oxide with Deal-Grove; they use the rapid thermal and radical methods described below and calibrate them empirically.

### 1.3 Orientation, pressure, and chlorine

**Orientation dependence.** The linear rate constant scales with the areal density of silicon atoms available to react at the interface: (111) has 11.8 × 10¹⁴ Si atoms/cm² versus 6.8 × 10¹⁴ for (100), and the (111) linear rate is empirically 1.68× that of (100). The parabolic constant B, being a bulk-diffusion property of amorphous SiO2, is orientation-independent. This matters more than it used to: a FinFET fin has (100) top and (110) sidewalls, and a nanosheet has (100) top and bottom surfaces and (110) edges, so a "conformal" thermal oxide is intrinsically thicker on the sidewalls. Interface trap densities are also higher on (110) and (111), which is the original reason (100) became the standard CMOS orientation.

**Pressure.** B is proportional to C*, hence to oxidant partial pressure; dilute O2 (in N2 or Ar) is used today to slow growth enough to control 1–2 nm films.

**Chlorine.** Adding 1–5% HCl, or an organic chlorine source like trans-1,2-dichloroethylene (DCE) that decomposes to HCl, to a dry O2 ambient getters mobile alkali ions (Na⁺, K⁺) as volatile chlorides (the fix for the threshold-voltage drift that plagued early MOS), getters heavy metals from the silicon surface, and modestly increases the oxidation rate. Too much chlorine roughens the oxide and leaves Cl at the interface, so the fraction is tightly controlled; chlorine oxidation is still used for thick I/O gate oxides and sacrificial oxides.

### 1.4 Pyrogenic steam and the wet ambient

Early wet oxidation bubbled O2 through a flask of water at 95 °C; the vapor pressure at that temperature (~640 torr) is why the classic wet rate constants are quoted at 640 torr. Production furnaces replaced this with **pyrogenic steam**: high-purity H2 and O2 are metered by mass-flow controllers into a quartz torch at the furnace inlet, where they react (2 H2 + O2 → 2 H2O) at the ~800 °C tube temperature. Running with a slight excess of O2 keeps the mixture outside the explosive range on the H2-rich side and guarantees no unreacted hydrogen reaches the wafers. Because the water is made in situ from semiconductor-grade gases, it carries none of the metal ions a liquid-water bubbler would. Water content is set by the H2:O2 ratio; a typical recipe is ~1.8:1 (just under stoichiometric 2:1).

### 1.5 In-situ steam generation (ISSG) and radical oxidation

For films below ~5 nm a furnace is too slow to control and too hot for the thermal budget. **ISSG** does the pyrogenic reaction not in a torch but directly above the hot wafer inside a lamp-heated single-wafer chamber (Applied Materials' Vantage RadOx/RTO chambers are the canonical example). H2 (typically 1–33%) and O2 at low pressure (~5–20 torr) flow over a wafer held at 900–1,100 °C for a few seconds to a minute. The wafer itself is the ignition source, and the combustion intermediates include a high concentration of atomic oxygen radicals. Radical oxidation has three useful properties: the rate is far less orientation-dependent than molecular O2 (so fin sidewalls and tops oxidize equally), it oxidizes silicon nitride slowly, and the oxide it makes has excellent interface quality at very thin thickness. ISSG oxides are used for the ~1 nm gate interfacial layer, for the thin liner inside shallow-trench isolation (STI), for rounding fin and trench corners (the oxidation rate at a convex corner is suppressed by stress, which rounds it), and for the tunnel oxides in some NAND flows. Plasma oxidation (an O2 plasma at 300–600 °C, e.g. TEL's Trias SPA tools) is the low-temperature alternative for 1–3 nm oxides.

### 1.6 The Si/SiO2 interface, and why silicon won

Germanium had the higher carrier mobility and Bell Labs' first transistors were germanium. Silicon won in the 1960s for one reason: its oxide. GeO2 is water-soluble and sublimes as GeO above ~400 °C; GaAs has no stable, stoichiometric, low-defect native oxide at all; silicon grows a dense, amorphous, thermally stable, insulating (bandgap ~9 eV, breakdown ~10 MV/cm) oxide whose interface with the crystal is, after a hydrogen anneal, almost electrically perfect. The interface is abrupt to within about one or two atomic layers, with a sub-oxide transition region (Si¹⁺, Si²⁺, Si³⁺ states visible in XPS) of ~0.5 nm.

The defects that remain are well catalogued. **Interface traps** (Dit) are mostly **Pb centers**: silicon dangling bonds at the interface, ~10¹² cm⁻² eV⁻¹ as grown, reduced to ~10¹⁰ cm⁻² eV⁻¹ by a **forming-gas anneal** (4–10% H2 in N2, 400–450 °C, 20–30 min) that terminates the dangling bonds with hydrogen. **Fixed oxide charge** (Qf) is a positive charge within ~2 nm of the interface associated with incompletely oxidized silicon; it is minimized by finishing the oxidation in dry O2 and by a post-oxidation anneal in inert gas (the "Deal triangle" of Qf versus temperature and ambient). **Mobile ionic charge** is the alkali problem fixed by chlorine and by cleanroom hygiene. **Oxide trapped charge** comes from radiation or hot-carrier injection. The reason these matter: 10¹⁰ traps per cm² per eV is one defect per ~10⁴ nm², and a 2 nm-node transistor's gate area is only a few thousand nm². Silicon's oxide is the only one that gets this clean.

### 1.7 Where thermal oxide is used today

The gate oxide was the marquee application for 40 years. Its thickness followed scaling from ~100 nm in the early 1970s to ~1.2 nm of nitrided oxide (SiON) at the 90 and 65 nm nodes, where direct tunneling leakage (roughly 10× increase per 0.2 nm thinning) became untenable. Intel's 45 nm process in 2007 replaced most of it with a high-k HfO2 film deposited by ALD (Section 5). But a purely high-k-on-silicon interface has poor mobility and too many traps, so every HKMG stack still has an **interfacial layer** (IL) of SiO2 of ~0.5–1.0 nm under the HfO2. It is formed by a chemical oxide from ozonated or SC1 water in the pre-gate clean, or by ISSG/plasma oxidation, and is deliberately thinned by "scavenging" (a Ti- or Al-containing layer above the HfO2 that pulls oxygen out of the IL during the anneal) to reach an equivalent oxide thickness (EOT) of ~0.8–0.9 nm total. Thermal oxidation still appears throughout the flow: the pad oxide under the nitride CMP stop, the STI liner, sacrificial oxides that are grown and stripped to remove etch-damaged silicon, screen oxides for implants, and the 3–7 nm thick gate oxides of the 1.8 V and 3.3 V I/O transistors that live on every chip alongside the core logic.

## 2. Furnaces and Rapid Thermal Processing

### 2.1 The vertical batch furnace

Oxidation, LPCVD, and many anneals are done in **vertical furnaces**, which replaced horizontal tube furnaces in the 1990s because a vertical tube has no boat-to-tube contact to scrape particles, a smaller footprint, and better temperature uniformity under gravity-symmetric convection. The market is led by Tokyo Electron (TELINDY PLUS series) and Kokusai Electric (AdvancedAce-300, and its TSURUGI-C² batch ALD platform), with ASM International (A412 series) a distant third.

The anatomy: a quartz (or, for high-temperature and chlorine processes, silicon carbide) process tube about 1.5 m tall, surrounded by a resistive heater with 3–5 independently controlled zones. Wafers sit horizontally in slots of a quartz or SiC boat holding 100–150 (125 is typical) 300 mm wafers at ~6–10 mm pitch. The boat is loaded from FOUPs by a robot in a nitrogen-purged load area, lifted into the tube by an elevator, and sealed at the bottom. Gas enters from the top (or through injector tubes running the length of the boat) and exits at the bottom to a vacuum pump (LPCVD, 0.1–2 torr) or exhaust (atmospheric oxidation).

Temperature is everything. The tube is held at a standby of ~600–700 °C, wafers are loaded at that temperature, and the furnace ramps at 5–15 °C/min to the setpoint, then stabilizes for 10–20 min before gas is introduced, holds for the process time, and ramps down at a similar rate. Ramp rates are limited by **slip**: the thermal gradient between a wafer's edge and center generates stress, and above a critical stress the crystal plastically deforms along {111} planes, producing dislocation lines that ruin devices. A full cycle including load, ramp, process, ramp-down and unload is 3–6 hours for a 100-wafer batch, so the throughput can still be tens of wafers per hour. Temperature is controlled to ±0.5 °C along the boat by thermocouples in each zone plus a profile thermocouple inside the tube, using models that correct for the thermal mass of the load.

**Dummy wafers** (also called filler or baffle wafers) occupy the top and bottom ~5–10 slots. Gas is depleted as it flows down the boat, the ends of the boat see different thermal environments, and the first wafers scrub contaminants from the gas; the dummies absorb these edge effects so product wafers see uniform conditions. They are reclaimed and reused hundreds of times; a leading-edge fab consumes tens of thousands of dummy and monitor wafers a month, a real line item in the Shin-Etsu and SUMCO order books (Module 03).

### 2.2 Single-wafer RTP

The furnace's weakness is the thermal budget: a two-hour excursion at 1,000 °C diffuses dopants tens of nanometers, which is fine for a 1 µm transistor and fatal for a 20 nm one. **Rapid thermal processing** (RTP) heats one wafer at a time with radiation from banks of tungsten-halogen lamps, ramping at 50–250 °C/s, holding for a second to a minute, and cooling at up to ~100 °C/s. Applied Materials' Vantage platform (Radiance, Radiance Plus, and the Astra flash/DSA variants) dominates; Mattson (now Chinese-owned, "Beijing E-Town") and Screen are the alternatives.

Inside a Vantage chamber, several hundred small lamps in a honeycomb array sit above a wafer rotating at ~200–300 rpm on an edge ring; 5–8 pyrometers read backside emission at different radii and the lamp zones are controlled in closed loop to hold the radial profile flat to ±1–2 °C during a ramp, with in-situ emissivity measurement because backside films and patterning change it. RTP applications include implant activation (spike anneals to ~1,050 °C for well under a second; Module 10), RTO and ISSG, silicide formation at 250–500 °C, and high-k post-deposition anneals, at ~50–100 wafers per hour per chamber.

The important design principle: a furnace is for processes where the *film* is the product and time at temperature is free (thick oxides, LPCVD nitride, poly), while RTP is for processes where the *thermal history* is the product. At the leading edge, most steps have migrated to single-wafer tools; furnaces survive for LPCVD, batch ALD, and long anneals.

## 3. Chemical Vapor Deposition: Fundamentals

### 3.1 The sequence of events

In **chemical vapor deposition** (CVD), gaseous precursors are introduced over a heated wafer, react on (or near) the surface, and leave a solid film behind. The steps in series are:

1. Convective transport of reactants into the reactor.
2. Diffusion of reactants across the stagnant **boundary layer** that forms above the wafer surface.
3. Adsorption on the surface.
4. Surface diffusion, reaction, and incorporation into the growing film.
5. Desorption of gaseous byproducts (HCl, H2, CH4, HF, and so on).
6. Diffusion of byproducts back across the boundary layer and convective removal.

### 3.2 Surface-reaction versus mass-transport limited growth

The two rate-limiting cases define how a reactor must be built. Following Grove's treatment: let the flux through the boundary layer be F1 = hg (Cg − Cs), with hg = D/δ the gas-phase mass-transfer coefficient (D the gas diffusivity, δ the boundary-layer thickness), and the surface reaction flux be F2 = ks Cs. In steady state the growth rate is

R = (ks · hg / (ks + hg)) · (Cg / N)

- If ks ≪ hg (low temperature): R ≈ ks Cg / N. The process is **surface-reaction limited**. ks = k0 exp(−Ea/kT) with Ea typically 1–2 eV, so the rate rises steeply with temperature (a 10 °C change at 600 °C changes a silane-poly rate by ~15%). Gas flow uniformity hardly matters; temperature uniformity is everything. This is the regime for LPCVD in batch furnaces: at 0.1–1 torr the diffusivity is ~1,000× larger than at atmospheric pressure, hg is huge, and 100+ wafers stacked 5 mm apart can all be fed adequately as long as the tube temperature is uniform.
- If ks ≫ hg (high temperature): R ≈ hg Cg / N. The process is **mass-transport limited**. The rate depends on D/δ, only weakly on temperature (D ∝ T^1.5–2), but strongly on flow geometry. Every wafer must see the same boundary layer, which is why atmospheric CVD and epitaxy are done one wafer at a time (or a few) with carefully engineered laminar flow.

Plotting log(rate) versus 1/T shows the two regimes as a steep Arrhenius line at low T bending to a nearly flat line at high T. Production processes are placed deliberately: LPCVD deep in the reaction-limited regime for batch uniformity; epi and TEOS/ozone in the transport-limited regime for high rate.

The boundary layer for laminar flow over a plate thickens along the flow direction as δ ~ √(μ x / ρ v), which is why old horizontal reactors tilted the susceptor to compensate for depletion and why modern single-wafer chambers use a **showerhead**: a perforated plate (hundreds to thousands of 0.5–1 mm holes) a few cm above the wafer, fed from a plenum, so gas arrives perpendicular and uniform across the whole 300 mm. The wafer sits on a heated pedestal (300–700 °C) or is lamp-heated; in a plasma reactor the showerhead is usually the RF electrode.

### 3.3 Step coverage and conformality

**Step coverage** is the ratio of film thickness on the sidewall or bottom of a feature to that on the flat top. It is governed by the **sticking coefficient** (the probability that an arriving molecule reacts on first contact) and by the geometry. A precursor with a sticking coefficient near 1 deposits where it first lands; the top corners of a trench see the widest solid angle of gas, so they grow fastest, forming an overhang ("bread-loafing") that closes the trench and leaves a **void** or **keyhole** inside. A precursor with a low sticking coefficient (10⁻³ to 10⁻²) bounces many times before reacting, samples the entire feature, and deposits uniformly: this is why TEOS/ozone oxide is conformal and silane/oxygen oxide is not. In the limit of a strictly self-limiting surface reaction (sticking coefficient effectively zero until the previous ligand is removed) you get ALD, with 100% step coverage in features of aspect ratio > 100:1.

Surface diffusion of adsorbed species before incorporation also improves conformality and is why higher-temperature LPCVD films are more conformal than PECVD ones.

### 3.4 Gas-phase nucleation

If precursor molecules react with each other in the gas above the wafer instead of on it, they nucleate particles that fall on the wafer as "snow" and produce hazy, low-density films. The risk rises with pressure, temperature, and precursor partial pressure; silane is especially prone (SiH4 → SiH2 + H2, and SiH2 inserts into another SiH4 to start a chain ending in a silicon particle). LPCVD's low pressure, silane dilution, and the short ~10–20 mm showerhead gap of PECVD are all defenses. Particles (Module 05) are as often generated inside deposition chambers as brought in from outside, which is why NF3 remote-plasma chamber cleans and seasoning runs are central to how these tools are operated.

### 3.5 Delivering the precursors

Gaseous precursors (SiH4, DCS, NH3, WF6, N2O, NF3) come from cylinders through gas cabinets, purifiers, and thermal **mass-flow controllers** (MFCs) accurate to ~1% of setpoint. Liquid precursors (TEOS, TDMAT, TEMAH, TMA, trisilylamine) are delivered either by a **bubbler**, where a carrier gas (N2 or Ar) passes through the heated liquid and picks up vapor at a rate set by the liquid's vapor pressure at the bubbler temperature (TEOS, for example, has ~1.5 torr vapor pressure at 20 °C, so a bubbler runs at 40–65 °C), or by a **direct liquid injection** (DLI) vaporizer, where a liquid flow controller meters the liquid and a heated, atomized injector flashes it into a carrier gas. DLI is more repeatable because it does not depend on the liquid level or on bubbler thermal history. Solid precursors (HfCl4, ZrCl4, WCl5, MoO2Cl2) sublime from a heated ampoule at 100–200 °C under a carrier-gas sweep, with every downstream line and the showerhead heat-traced above the condensation temperature. Precursor purity (ppb metals), shelf stability, and cost (HfCl4 is cheap; some amido-metal precursors run to thousands of dollars per kilogram) are where the specialty-chemical companies of Module 04 (Merck/EMD, Entegris, Air Liquide, Adeka, Soulbrain, DNF) make their money.

## 4. The CVD Family

### 4.1 LPCVD

**Low-pressure CVD** at 0.1–2 torr and 550–900 °C in a vertical furnace makes the workhorse dielectric and semiconductor films of the front end. Batch size and uniformity are its strengths; temperature and hours-long cycle times are its limits.

**Polysilicon**: SiH4 → Si + 2 H2 at 580–650 °C, ~0.2–1 torr, ~5–20 nm/min. Below ~580 °C the deposit is amorphous (smoother, and often crystallized later); above it, polycrystalline. In-situ doping with PH3 is possible but phosphine adsorbs strongly and poisons the silane reaction, cutting the rate several-fold, so poly is often implant-doped instead. Poly forms the dummy gates of gate-last flows (Module 11), 3D NAND channels and sacrificial word-line stacks, and DRAM plugs.

**Silicon nitride**: 3 SiH2Cl2 + 4 NH3 → Si3N4 + 6 HCl + 6 H2 at 700–800 °C (~750 °C typical), 0.2–0.5 torr, with a large excess of ammonia (NH3:DCS ~5–10:1). The film is near-stoichiometric, contains a few atomic percent hydrogen, is highly tensile (~1 GPa, so thick films crack), and is chemically tough: it is the CMP stop for STI, the hard mask for fin patterning, and, before ALD took over, the gate spacer.

**TEOS oxide**: tetraethyl orthosilicate, Si(OC2H5)4, decomposes at 650–750 °C to conformal, dense SiO2, used for spacers, liners, and hard masks when a 700 °C step is affordable; **HTO** (SiH2Cl2 + N2O at ~900 °C) is the highest-quality deposited oxide, used in memory ONO stacks.

### 4.2 PECVD

Once the first copper or aluminum layer is on the wafer, nothing may exceed ~400 °C (copper diffuses, aluminum hillocks and the low-k films degrade). **Plasma-enhanced CVD** supplies the activation energy electrically instead of thermally: a capacitively coupled 13.56 MHz RF discharge (100–2,000 W, 1–10 torr) between the showerhead and the pedestal creates electrons at 2–5 eV that dissociate the precursors into radicals, which react on a wafer at only 300–400 °C. The films are amorphous, hydrogen-rich (10–30 at.% H, as Si–H and N–H), less dense than their LPCVD equivalents, and non-conformal (step coverage 50–70%), but they are fast (100s of nm/min) and cool.

Applied Materials' Producer platform (twin-chamber modules, three per tool, so six wafers in parallel) and Lam's Vector (four-station sequential-deposition chambers) dominate PECVD; TEL and, in China, Piotech are the challengers. The films:

- **SiO2** from SiH4 + N2O (or TEOS + O2) for interlayer dielectrics, hard masks, and passivation.
- **SiNx:H** from SiH4 + NH3 + N2 for etch stops, passivation, and hard masks. Adding a low-frequency (300–400 kHz) RF component drives ions into the film and switches the stress from tensile (~+500 MPa) to compressive (~−2 GPa), which was exploited in the "dual stress liner" era (90–32 nm) to strain NMOS and PMOS channels separately.
- **SiCN and SiCO** from trimethylsilane (3MS) or tetramethylsilane with NH3 or CO2: the copper capping/etch-stop layers between BEOL levels (k ~ 4.5–5.5, replacing SiN at k ~ 7), 20–30 nm thick, which must also block copper diffusion and survive CMP.
- **Low-k SiOC:H** ("carbon-doped oxide", Applied's Black Diamond, Lam's Coral-lineage films): methyl-substituted silanes (e.g. diethoxymethylsilane, DEMS) plus O2 give an oxide network with ~15–20% terminal Si–CH3 groups that lower density and polarizability, k ~ 2.7–3.0 versus 3.9–4.2 for SiO2. **Porous ultra-low-k** (k ~ 2.2–2.5) is made by co-depositing an organic **porogen** (e.g. alpha-terpinene or norbornadiene) that is later driven out by a UV cure at ~400 °C, leaving 20–30% porosity with ~2 nm pores. Porous low-k is mechanically weak (Young's modulus < 10 GPa), absorbs moisture, and is damaged by plasma etch and ash, which is why Module 12 spends time on sidewall repair and why airgaps compete with it.

### 4.3 HDP-CVD

**High-density plasma CVD** solves the gap-fill problem for moderate aspect ratios by etching while it deposits. An inductively coupled plasma (ICP) source at 1–5 mtorr produces ion densities of 10¹¹–10¹² cm⁻³, ten to a hundred times a CCP, so SiH4 + O2 dissociates completely and deposits SiO2 rapidly. A separate RF bias on the electrostatic chuck accelerates Ar⁺ (and O⁺) ions into the wafer at 100–300 eV; sputtering is fastest on surfaces inclined ~45°, so it preferentially removes the overhanging corners that would otherwise close the gap, while the trench bottom, hit at normal incidence, keeps filling. The process is tuned by the deposition-to-sputter ratio (typically 3–10); too much sputtering redeposits material on the opposite sidewall and can clip the tops of the underlying features. The wafer heats to 300–400 °C from ion bombardment alone (backside helium cooling limits it). HDP-CVD (Lam Speed, Applied Ultima/Centura HDP) filled STI trenches and inter-metal gaps from the 250 nm to ~65 nm nodes, and still fills wide gaps, PMD, and 3D NAND slits; for narrow FinFET-era trenches it cannot keep up.

### 4.4 SACVD, HARP, and flowable CVD for gap fill

The STI trench between fins at 28 nm and beyond is 20–40 nm wide and 200–300 nm deep (aspect ratio 5–15); the space between DRAM bit lines and the spaces in 3D NAND are worse. Three approaches:

**Sub-atmospheric CVD (SACVD)** uses TEOS + O3 at 200–600 torr and 400–550 °C. Ozone attacks TEOS on the surface via a low-sticking-coefficient mechanism that gives near-conformal and even bottom-up, "flow-like" fill in narrow gaps, at the cost of a lower-density film that must be densified by a steam or dry anneal at 600–1,000 °C and shrinks a few percent in the process. Applied's **HARP** (high aspect ratio process) on Producer was the STI fill of record at 65–28 nm. The weakness is a seam where the sidewall growth fronts meet; a subsequent wet etch opens the seam into a slot.

**Flowable CVD (FCVD)**, introduced by Applied (Producer Eterna) in 2010 and now also offered by Lam and others, takes a different route: a silicon-nitrogen precursor (trisilylamine, TSA, (SiH3)3N) reacts with NH3 radicals from a remote plasma at low temperature (near or below room temperature to ~100 °C) to form an oligomeric, liquid-like Si–N–H film that literally flows into and wets trenches by capillary action, filling them seamlessly from the bottom regardless of aspect ratio. The film is then converted to SiO2 by an ozone/steam cure at 200–500 °C followed by anneals at 600–1,000 °C. Conversion of the buried Si–N–H to Si–O in a narrow trench is diffusion-limited and the film shrinks 10–20%, so a thin ALD oxide liner is deposited first, the cure recipe is a carefully guarded piece of know-how, and the top of the fill is always wet-etched back and re-capped. FCVD is the STI fill for FinFET and nanosheet nodes and is used in DRAM and 3D NAND wherever a narrow, deep dielectric fill is needed.

**ALD oxide** fills the very narrowest gaps by pure conformality (it closes a gap from both sides with a seam at the middle), and is used for liners, for SAQP spacers, and as the fill itself when the gap is < 10 nm.

### 4.5 Metal CVD: tungsten and titanium nitride

**Tungsten** has been the contact and via plug metal since the late 1980s because it deposits conformally by CVD and tolerates the 400–450 °C process. The chemistry has two stages, done on a Lam Altus (Lam holds the majority of this market) or Applied Endura/Centura W chamber:

1. **Nucleation layer** (2–5 nm): WF6 + SiH4 (or B2H6) at 300–400 °C, pulsed in an ALD-like sequence. This is needed because WF6 will not reduce on a bare dielectric and, worse, reacts with silicon (2 WF6 + 3 Si → 2 W + 3 SiF4) to make "wormholes" and encroachment, and the HF byproduct attacks oxides. Contacts are therefore first lined with Ti (to reduce native oxide and form TiSi2 at the bottom) and TiN (as the fluorine barrier and adhesion layer) before any WF6 sees the wafer.
2. **Bulk fill**: WF6 + 3 H2 → W + 6 HF at 400–450 °C, 40–300 torr, at hundreds of nm/min with excellent conformality. The film is polycrystalline with bulk resistivity ~10 µΩ·cm at thickness but rises steeply below 20 nm because of grain-boundary and surface scattering, which is the issue that drove contact metallurgy to cobalt at 10/7 nm and now toward ruthenium and molybdenum (Module 12).

Fluorine is the enemy: it diffuses into gate dielectrics and the residual fluorine in a nucleation layer raises resistance. **Fluorine-free tungsten** (FFW) from WCl5 or WCl6 (solid precursors at ~130–170 °C) with H2 at 400–500 °C became necessary for 3D NAND word lines, where a 20–30 nm tungsten film must fill a lateral recess that is tens of nanometers tall and micrometers deep through hundreds of tiers, and for the gate fill in FinFET/GAA. Lam and Applied both offer it; the newest word-line and gate-fill metal is **molybdenum** from MoO2Cl2 or MoCl5, whose thin-film resistivity beats tungsten below ~15 nm and which needs no separate barrier, with Lam's Altus Halo as the first purpose-built tool (as of ~2025, Mo is in 3D NAND HVM at some makers and under evaluation for logic).

**Titanium nitride** is the universal glue, barrier, and metal-gate layer. Thermal CVD from TiCl4 + NH3 at 450–650 °C gives a dense, low-resistivity (~100–200 µΩ·cm) film with a few percent residual chlorine; MOCVD from tetrakis(dimethylamido)titanium (TDMAT) at 350–450 °C, followed by an N2/H2 plasma densification per ~5 nm deposited, gives a chlorine-free film with more carbon and is preferred where chlorine attacks the underlying metal. At the finest dimensions both are replaced by ALD TiN (Section 5.5).

## 5. Atomic Layer Deposition

### 5.1 The two half-reactions

**Atomic layer deposition** (ALD) is CVD broken into two self-limiting halves that never meet in the gas phase. The canonical example, trimethylaluminum and water depositing Al2O3, uses a surface that always ends in hydroxyl groups:

- **Half-reaction A**: pulse Al(CH3)3 (TMA). Each TMA reacts with a surface –OH: ‖–OH + Al(CH3)3 → ‖–O–Al(CH3)2 + CH4↑. When every accessible –OH has reacted, the surface is covered with methyl groups, and further TMA does not stick (it has nothing to react with and does not decompose at the process temperature). The reaction is **self-limiting**: doubling the dose or the pulse time changes nothing.
- **Purge**: inert gas (N2 or Ar) sweeps out unreacted TMA and methane. If any TMA remains when water arrives, they react in the gas as CVD, producing particles and thickness non-uniformity.
- **Half-reaction B**: pulse H2O. ‖–Al(CH3)2 + 2 H2O → ‖–Al(OH)2 + 2 CH4↑. The surface is once again hydroxylated and ready for the next TMA pulse.
- **Purge** again.

One cycle deposits a fixed amount of Al2O3, the **growth per cycle** (GPC): ~0.1 nm (1.0–1.2 Å) between 150 and 300 °C. A monolayer of Al2O3 is ~0.3 nm, so each cycle deposits roughly one-third of a monolayer, not a full one, because the methyl ligands are bulky and sterically block neighboring –OH sites; the material is completed over several cycles. Thickness is simply N cycles × GPC, digital and repeatable to a fraction of an angstrom, and independent of dose, flow uniformity, or feature geometry once saturation is reached. The **ALD window** is the temperature range in which both half-reactions saturate: below it the precursor condenses (or reacts incompletely), above it the precursor thermally decomposes (turning into CVD) or surface groups desorb.

Timing: a pulse of 0.05–1 s and a purge of 0.5–5 s, so a cycle takes 2–10 s in a single-wafer chamber and 20 cycles for 2 nm takes a couple of minutes. The slowness is intrinsic; equipment engineering is about shortening purges (small chamber volumes, high-conductance pumping) or amortizing them over many wafers (batch, or spatial ALD where the wafer moves between continuously flowing precursor zones). Good precursors are volatile (> ~0.1 torr below 150 °C), thermally stable at the process temperature, highly reactive with surface groups, and leave non-corrosive byproducts: chlorides (HfCl4, TiCl4, WCl5) are cheap and stable but release HCl; alkylamides (TEMAH, TDMAT, PDMAT) are more reactive at lower temperature but less stable; alkyls (TMA) are nearly ideal, which is why Al2O3 is the textbook case.

### 5.2 Thermal versus plasma-enhanced ALD

In **thermal ALD** the second reactant is a small molecule (H2O, O3, NH3, H2S) and the wafer temperature supplies the energy. In **plasma-enhanced ALD** (PEALD), the second reactant is a plasma (O2, N2, H2, NH3, or N2/H2) whose radicals react far more aggressively. PEALD extends deposition to lower temperatures (< 100–200 °C, needed on photoresist mandrels and on low-k), gives denser films with less hydrogen, deposits nitrides that thermal NH3 cannot at low temperature, and reduces nucleation delay on inert surfaces. Its costs: plasma damage to underlying thin dielectrics, and lower conformality in very deep features because the radicals recombine on the sidewalls before reaching the bottom (a 100:1 3D NAND channel hole is beyond PEALD; thermal ALD is used there).

### 5.3 High-k HfO2

The film that made ALD indispensable is the gate dielectric. Intel's 2007 HKMG process reportedly used **HfCl4 + H2O** at ~300 °C (HfCl4 sublimed from a heated solid source; Intel has never published its precursor); most of the industry moved to **TEMAH** (tetrakis(ethylmethylamido)hafnium, a liquid) or the dimethylamido analogue TDMAH with H2O or O3 at 250–300 °C, which nucleate better on the chemical interfacial oxide and leave no chlorine. GPC is ~0.05–0.1 nm depending on precursor and temperature; a 1.5–2.0 nm HfO2 film takes ~20–30 cycles. As deposited, the film is amorphous; a post-deposition anneal (700–1,000 °C, seconds) crystallizes it into the monoclinic phase (k ~ 16–20). Nitrogen incorporation (HfON, HfSiON) or zirconium alloying tunes the phase and reliability. The physics: HfO2 has k ~ 20 versus 3.9 for SiO2, so 2 nm of HfO2 has the capacitance of ~0.4 nm of SiO2 (the EOT) while presenting a 2 nm barrier to tunneling. Combined with the ~0.7 nm interfacial SiO2, total EOT is ~0.8–1.0 nm. The ASM Pulsar (thermal ALD on the XP8 platform) is the tool of record for high-k in many logic fabs; Applied's Olympia and TEL's NT333 (a semi-batch spatial-ALD system) compete. DRAM capacitor dielectrics (ZrO2/Al2O3/ZrO2 "ZAZ" stacks in cylinders of aspect ratio 50–100) are the other huge high-k ALD application, and are largely run on batch tools.

### 5.4 Worked example: a 2 nm HfO2 gate dielectric

> **Worked example: cycles, time, and atoms for a 2 nm HfO2 film.**
> Take a GPC of 0.1 nm/cycle (upper end for TEMAH/H2O near 300 °C). Cycles needed: 2.0 nm / 0.1 nm = **20 cycles**. With a 0.3 s TEMAH pulse, 3 s purge, 0.2 s H2O pulse, 4 s purge (~7.5 s/cycle), deposition takes 150 s plus ~1 min of pump-down, pre-heat, and transfer: a single chamber makes ~15–20 wafers/hour, a 4-chamber tool ~60–80. A batch furnace running 100 wafers at ~40 s/cycle (long purges for the large volume) takes 20 × 40 s ≈ 13 min of deposition plus ~1 h of load/ramp/unload, still >100 wafers/hour.
> Atoms per monolayer: HfO2 has density 9.68 g/cm³ and molar mass 210.5 g/mol, so its formula-unit density is n = (9.68/210.5) × 6.022 × 10²³ ≈ **2.8 × 10²² cm⁻³**. The mean spacing between Hf atoms is n^(−1/3) ≈ 0.33 nm, and one monolayer therefore contains n^(2/3) ≈ **9 × 10¹⁴ Hf atoms/cm²**. A 0.1 nm GPC is 0.1/0.33 ≈ 0.3 monolayer, i.e. ~2.8 × 10¹⁴ Hf atoms/cm² per cycle. The finished 2 nm film holds 2.8 × 10²² × 2 × 10⁻⁷ = **5.5 × 10¹⁵ Hf atoms/cm²**, about 6 monolayers. Over a 300 mm wafer (707 cm²) that is 3.9 × 10¹⁸ Hf atoms ≈ 6.5 µmol ≈ **1.2 mg of hafnium**; a precursor utilization of a few percent means a few tens of milligrams of TEMAH per wafer, which is why precursor cost is a real but not dominant line item.
> For comparison the Si(100) surface has 6.8 × 10¹⁴ atoms/cm², so the 20-cycle film is about 8 silicon-surface-equivalents of hafnium, and the ~0.7 nm interfacial SiO2 beneath it consumed ~0.3 nm (about two atomic layers) of the channel.

### 5.5 ALD metals and barriers

**TiN** by ALD (TiCl4 + NH3 at 350–450 °C, or PEALD with N2/H2 plasma) is the work-function and capping metal in every HKMG stack. In a replacement-metal-gate (RMG) flow (Module 11) the gate trench after dummy-poly removal is ~15–20 nm wide and the stack of IL / HfO2 / TiN cap / TaN etch stop / TiAl (NMOS) or thicker TiN (PMOS) work-function layers / TiN / W or Co fill must all fit, each layer 1–3 nm and conformal around a fin or, in GAA, around and *between* stacked nanosheets separated by ~10 nm. Only ALD can do it. **TaN** (from pentakis(dimethylamido)tantalum, PDMAT, + NH3 or plasma) is the copper diffusion barrier for the narrowest BEOL lines, where PVD TaN's overhang costs too much of the trench cross-section; the current approach at 3 nm and 2 nm is ALD TaN (~1–1.5 nm) under a PVD or ALD Co/Ru liner. ALD Ru (from various Ru precursors + O2) and ALD W (WF6/B2H6 or WCl5/H2) are seed and fill layers for the smallest vias.

### 5.6 ALD spacers and patterning films

The gate spacer must be conformal on a fin sidewall, have low k (it sits between gate and contact, adding parasitic capacitance), and survive multiple wet cleans and the S/D recess etch. LPCVD nitride at 750 °C is too hot after the high-k and too high-k. The answer is PEALD or thermal ALD **SiN**, **SiCN**, **SiOCN**, and **SiOC** (from DCS, hexachlorodisilane or trisilylamine plus N2/NH3 plasma, sometimes with a carbon source, at 400–600 °C), tuned to k ~ 4–5.5 and wet-etch rates far below PECVD nitride. Nanosheet transistors also need **inner spacers**: after the SiGe sacrificial layers are laterally recessed from the S/D side, a low-k dielectric is deposited by ALD to fill the ~5–10 nm cavities under each sheet end and then etched back, which is possible only with a perfectly conformal film.

Multi-patterning (Module 07) is the other ALD consumer: self-aligned double and quadruple patterning deposit a conformal spacer (ALD SiO2 or SiN, at < 100–300 °C on an amorphous-carbon or resist mandrel) whose thickness *becomes the critical dimension* of the final line, so 0.1 nm/cycle control is what makes a 20 nm pitch line 20 nm. Lam's Striker and ASM's Eagle/XP8 PEALD tools are built for this.

### 5.7 Batch versus single-wafer, and why ALD is now everywhere

The ALD tool market splits by geometry. **Single-wafer ALD** (ASM's Pulsar, EmerALD, and Eagle families; Applied Olympia; TEL Triase+; Lam Striker and Altus) offers fast cycles, easy plasma, and clustering with other steps; ASM holds more than 55% of this segment (ASM says ALD is over half of its equipment revenue). **Batch ALD** (Kokusai TSURUGI-C², TEL's TELINDY-based batch ALD, ASM A412) loads 25–150 wafers into a furnace-like tube and cycles precursors over all of them at once; cycles are slower but throughput per tool for thick films (DRAM capacitor dielectrics, 3D NAND liners, memory-cell nitrides) is far higher, and Kokusai holds ~70% of batch ALD.

The number of ALD steps in a leading logic flow rose from a handful at 45 nm (high-k, a barrier) to dozens at 16/14 nm (spacers, SADP, work-function metals) to on the order of a hundred at 3 nm/2 nm, and ALD (single-wafer plus batch) is now an equipment market at least as large as PVD. The reasons are structural: as features drop below ~20 nm, the only films thin enough, conformal enough, and precise enough are ALD films; nanosheets wrap every gate film around four surfaces of a ribbon; memory makers build capacitors and channels with aspect ratios in the hundreds; and low thermal budgets rule out most LPCVD. Applied and Lam have both invested heavily to challenge ASM, and TEL and Kokusai dominate memory-fab batch ALD.

### 5.8 Area-selective deposition

The frontier is **area-selective deposition** (ASD): making a film grow on one material and not its neighbor, so that a via lands on the metal below without an edge-placement error, or a dielectric grows only on dielectric to form a self-aligned via hardmask. The mechanisms exploit ALD's dependence on surface chemistry: a **small-molecule inhibitor** (SMI) or self-assembled monolayer (aminosilanes such as dimethylamino-trimethylsilane on oxide; thiols or alkyl phosphonic acids on metal) is dosed to passivate the "non-growth" surface, ALD proceeds on the growth surface, and periodic gentle etch-back removes the few nuclei that form on the passivated area before they coalesce. Selective metal-on-metal (Ru, Co, W on Cu with no growth on low-k) and selective dielectric-on-dielectric are in limited HVM use at leading foundries for via prefill and self-aligned patterning as of ~2025, with ASM, Applied, and Lam all shipping recipes; imec is the main public research center for it.

## 6. Physical Vapor Deposition

### 6.1 Sputtering mechanism

**PVD** in the fab means **magnetron sputtering**. A target (a disk of the metal to be deposited, 300–450 mm diameter, bonded to a cooled copper backing plate; see the sputter-target section of Module 04) is the cathode, held at −300 to −700 V DC. Argon at 0.5–5 mtorr is ionized; Ar⁺ ions accelerate across the cathode sheath and hit the target at several hundred eV, setting off a collision cascade in the top few nanometers that ejects target atoms with a few eV of energy. The **sputter yield** (atoms per incident ion) is 0.5–3 for common metals at these energies (Cu ~2.3, Al ~1.0, Ti ~0.5, Ta ~0.6, W ~0.6 at 500 eV). Sputtered atoms leave with a roughly cosine angular distribution and fly across the 50–400 mm gap to the wafer, where they condense.

The **magnetron** is a set of permanent magnets behind the target whose field lines arc over the target face; secondary electrons are trapped in E×B drift orbits near the surface, where they ionize argon far more efficiently than in a plain DC diode, so the plasma runs at mtorr pressures (long mean free path, sputtered atoms arrive unscattered) and at high rates (µm/min for aluminum). The price is uneven erosion: the plasma is densest along a **racetrack** under the magnet gap, and a static magnetron uses only ~30% of the target before the groove threatens to punch through; rotating magnet assemblies sweep the racetrack to reach 50–70% utilization, but target replacement every few thousand wafers is a routine consumable cost. Insulating targets need RF (13.56 MHz); nitrides are made by **reactive sputtering**, flowing N2 with the argon so a Ti or Ta target deposits TiN or TaN (with the "poisoned target" hysteresis when the target surface itself nitrides and the rate drops).

### 6.2 The step-coverage problem and its fixes

Sputtered atoms travel in straight lines and arrive from a wide range of angles, so a narrow via receives material mostly on its top corners (overhang) and upper sidewalls, little at the bottom, and almost none on the lower sidewalls. For a 20 nm wide, 60 nm deep via this is fatal if the film must be continuous. The fixes, in historical order:

- **Collimation** (1990s): a honeycomb plate between target and wafer absorbs atoms travelling more than ~10–20° off normal. Bottom coverage improves; deposition rate falls by 3–5× and the collimator clogs and flakes.
- **Long-throw**: a 300–400 mm target-to-wafer gap at very low pressure (< 1 mtorr) so that only near-normal atoms arrive. Wafer-edge asymmetry is the problem.
- **Ionized PVD** (I-PVD): an RF coil in the chamber (or very high target power) ionizes 50–90% of the sputtered metal atoms in flight; a negative RF bias on the wafer pulls the metal ions in at normal incidence, so they reach the via bottom and, at higher bias, resputter the bottom onto the lower sidewalls, thinning the via-bottom barrier (which adds resistance) while thickening the sidewall (which is where continuity matters). Applied's **self-ionized plasma** (SIP) Cu and Ta sources combine a very high-power rotating magnetron, long throw, and the fact that copper ionizes its own sputtered flux at high enough density, without a separate coil. Endura "Ventura", "Cirrus", and "Amber" chambers are the current implementations for barrier, liner, and seed.

### 6.3 What PVD deposits in a modern chip

In the BEOL (Module 12), the dual-damascene metallization runs on an **Applied Endura**: a cluster tool with a central wafer handler under high vacuum (10⁻⁸ torr base) and 6–8 process chambers, so that a wafer is degassed (150–400 °C to drive moisture from the low-k), pre-cleaned (a soft Ar⁺ sputter etch or a reactive H2/He ICP clean to remove copper oxide from the via bottom), coated with a **TaN barrier** (reactively sputtered, ~1–2 nm) and **Ta liner** (~1–2 nm) or ALD TaN then PVD Ta, given a thin **Co or Ru liner** (CVD/ALD or PVD, ~1–2 nm, to wet copper and enable "reflow"), and finally a **Cu seed** (PVD, 2–20 nm depending on the level, thick at the top levels and vanishingly thin at M1) that the electroplating bath needs as a conductive, continuous cathode, all without breaking vacuum. At the tightest pitches (~20–24 nm at 3 nm/2 nm) the total barrier plus liner plus seed budget is ~4–5 nm out of a ~10–12 nm trench width, which is what motivates barrierless Ru or Mo lines and the interconnect changes discussed in Module 12. Elsewhere PVD makes the Ti/TiN contact liner, the aluminum bond pads and top-metal redistribution layers, NiPt for silicides, and the phase-change and magnetic-tunnel-junction stacks of emerging memories. Applied had shipped more than 4,500 Endura systems by the platform's 20th anniversary in 2010 (the 3,000th shipped in 2003) and many more since, and is estimated to hold on the order of 80% or more of the semiconductor PVD market; Ulvac, Evatec, and, in China, Naura are the other names. PVD's share of deposition spending has declined relative to ALD and CVD, but it remains the cheapest way to put down a pure metal.

## 7. Epitaxy

### 7.1 Growing crystal on crystal

**Epitaxy** deposits a single-crystal film whose lattice continues the substrate's. Silicon epi is done by CVD from silane, disilane, trisilane, or dichlorosilane (DCS) in hydrogen at 550–1,150 °C in a cold-wall, lamp-heated single-wafer chamber (Applied Centura Epi/Prime Epi, ASM Intrepid ES); the wafer rotates on a SiC-coated graphite susceptor and the process pressure is 10–100 torr (reduced-pressure CVD, RPCVD) or atmospheric. The pre-epi clean is critical: any oxide or carbon on the surface nucleates defects, so a wet HF-last clean is followed by an in-situ H2 bake (800–1,000 °C for blanket epi; lower with a plasma or SiCoNi-type dry clean for the low-thermal-budget S/D epi). Module 03 covered blanket epi wafers; here the subject is the selective, doped, and strained epi grown inside the transistor flow.

### 7.2 Selective SiGe:B and Si:P source/drain

Intel introduced embedded SiGe source/drains in PMOS at 90 nm in 2003 and everyone followed. The mechanism: after the gate and spacers are formed, the silicon of the S/D regions is recessed by etch (a sigma-shaped cavity that reaches under the spacer), and **SiGe:B** (boron-doped silicon-germanium) is grown selectively in the cavity. Germanium's lattice constant is 4.2% larger than silicon's, so a Si(1−x)Ge(x) film forced to match the silicon lattice in-plane is under biaxial compression, and because it is pinned at the channel edges it squeezes the channel along the transport direction. Uniaxial compressive strain of ~1–2 GPa raises hole mobility by 50–100%. Germanium content rose from ~17% at 90 nm to ~30–40% at 22 nm and to ~50–65% in the tip layers at 5/3/2 nm, with boron up to ~1–3 × 10²¹ cm⁻³ (above equilibrium solubility, incorporated because low-temperature epi is kinetically limited). The high Ge and B content also lowers the contact resistivity to the Ti-based silicide/germanide on top, which at 2 nm is a bigger benefit than the strain in a nanosheet whose channel strain is partly lost when the sacrificial SiGe is removed. For NMOS, **Si:P** with phosphorus at 2–4 × 10²¹ cm⁻³ (sometimes Si:CP with ~1–2% carbon) is grown in the S/D recess; the small P atom introduces slight tensile strain and the very high active doping gives record-low n-type contact resistivity (~10⁻⁹ Ω·cm²).

The epi is a **raised source/drain**: on a FinFET or nanosheet, the fin or sheet ends are too small to contact, so the epi is grown outward until the diamond-shaped crystals from neighboring fins merge into a single low-resistance block on which the contact lands.

**Selectivity** is the key trick. Precursors: DCS or SiH4, GeH4, B2H6 or PH3, with **HCl** added, all in H2 at 550–700 °C (lower for high-Ge SiGe, which would relax or roughen at higher temperature; higher for Si:P) and 10–100 torr. Silicon nucleates immediately on exposed crystalline silicon but only after an incubation delay on SiO2 and SiN, as isolated amorphous nuclei; HCl etches those small nuclei (and the crystalline film) at a rate that depends on the surface, and at the right HCl:Si ratio the net rate on dielectric is zero while the net rate on silicon stays positive. Chlorine-containing precursors (DCS) provide selectivity with less HCl; silane-based **cyclic deposition-etch** (CDE) alternates a fast non-selective deposition with a short HCl (or Cl2) etch that strips the dielectric nuclei, giving higher-quality high-Ge films at lower temperature. Selective epi suffers from **loading effects** (the growth rate depends on how much exposed silicon there is locally, so isolated and dense transistors get different S/D volumes), faceting at spacer edges, and, in nanosheets, the need to grow from multiple stacked sheet ends and merge into a void-free block; the recipes are among the most closely guarded in any foundry's PDK.

### 7.3 The SiGe/Si superlattice that becomes nanosheets

Gate-all-around transistors (TSMC N2, Samsung SF3/SF2, Intel 18A, Module 11) start with a blanket **superlattice** grown by epi on the bulk wafer: typically three (sometimes four) pairs of Si(0.7–0.75)Ge(0.25–0.3) and Si, each layer ~6–12 nm thick, grown at ~550–650 °C by RPCVD with DCS/GeH4 or SiH4/GeH4, with abrupt, atomically flat interfaces and thickness controlled to a few angstroms because the Si layers *are* the future channels. The Ge content is limited to ~25–30% so that the SiGe stays below its critical thickness for misfit dislocations at the total stack thickness; the Si layers are unstrained (they match the substrate) and the SiGe is compressive. The stack is then etched into fins, and after the dummy gate is removed the SiGe is stripped by a highly selective (>100:1) etch, historically wet (HCl/H2O2 or NH4OH/H2O2 mixtures) and now often gas-phase HCl or a dry plasma-free etch, releasing the Si nanosheets. Intel's 18A also uses this approach; forksheet and CFET research (Module 11) uses taller superlattices with more pairs. Epi also grows the strain-relaxed buffers (SRB) for SiGe-channel PMOS and the Si:C or high-Ge channel layers explored for future nodes.

### 7.4 Epi tools

Applied's Centura Epi (and the newer Centura Prime Epi) and ASM's Intrepid ES together own essentially the whole leading-edge silicon epi market, each holding roughly half depending on the customer; ASM gained share with the Intrepid at the GAA transition. A selective S/D epi chamber processes only ~10–30 wafers per hour, so a 100k wafer-start-per-month fab has dozens of them.

## 8. Film Stress Engineering

Every deposited film is stressed, and the wafer bends in response. **Thermal stress** arises from the mismatch in thermal expansion between film and silicon over the temperature change from deposition to room temperature; **intrinsic stress** arises from the film's microstructure: atomic peening by ions (compressive), grain-boundary voids and hydrogen loss (tensile), lattice mismatch in epi. Film stress σf is measured through wafer curvature via the **Stoney equation**:

σf = Es · hs² · κ / (6 (1 − νs) · hf)

with Es/(1 − νs) = 180 GPa the biaxial modulus of Si(100), hs the wafer thickness (775 µm), hf the film thickness, and κ the change in curvature (measured by scanning a laser across the wafer before and after deposition; KLA and Frontier tools). A 1 GPa, 100 nm film gives κ ≈ 5.6 × 10⁻³ m⁻¹ (a 180 m radius of curvature), which bows a 300 mm wafer by ~60 µm center-to-edge (~30 µm on a 200 mm wafer).

Stress is a tool: PECVD nitride can be tuned from −2 GPa compressive (heavy ion bombardment) to +1.5 GPa tensile and was used as a channel stressor; LPCVD nitride's ~1 GPa tension is what limits its thickness. Stress is also a problem: a 3D NAND stack of 200–300 alternating oxide/nitride layers, several micrometers thick, bows a wafer by hundreds of micrometers and distorts overlay, so makers deposit compensating backside films; low-k cracking and the delamination of thick tungsten word lines are stress-driven; and a 20 nm SAQP spacer at +1 GPa can bend a 30 nm-tall mandrel enough to shift the pattern.

## 9. Film Characterization, Briefly

Module 13 covers metrology; a deposition engineer lives by three techniques. **Spectroscopic ellipsometry** reflects polarized light (190–1,700 nm) at ~65–75° incidence and measures the change in polarization state (Ψ, Δ); fitting an optical model returns thickness to < 0.1 nm and refractive index (a proxy for density, hydrogen content, and porosity) for transparent films, and every furnace and ALD tool has a thickness map from a KLA, Nova, or Onto ellipsometer within minutes of unloading. **X-ray reflectivity** (XRR) analyzes the Kiessig fringes of a grazing-incidence Cu Kα beam: fringe period gives thickness, critical angle gives density, fringe decay gives roughness, with no optical model, making it the reference for ALD metals and high-k. **X-ray photoelectron spectroscopy** (XPS) measures core-electron binding energies from the top ~5–10 nm to give composition and chemical state (Si⁰ versus Si⁴⁺, Hf–O versus Hf–Cl), confirming stoichiometry and interfacial layers. Supporting methods: four-point-probe sheet resistance and XRF for metals, FTIR for Si–H/N–H and Si–CH3 content, wafer-curvature stress, and cross-sectional TEM for the final answer.

## 10. The Deposition Equipment Market

Deposition is the largest segment of wafer fab equipment after lithography, on the order of $25–30 billion in 2024–2025 (roughly a quarter of WFE). **Applied Materials** is the overall leader, with a near-monopoly in PVD (Endura), the leading CVD franchise (Producer, Ultima, Eterna), roughly half of epi (Centura), the RTP franchise (Vantage), and growing ALD and W/Mo positions. **Lam Research** leads tungsten and metal fill (Altus, including the Altus Halo for Mo), is co-leader in dielectric PECVD/ALD and gap fill (Vector, Striker, Speed), and is heavily exposed to 3D NAND. **ASM International** leads single-wafer ALD (> 55%) and is #2 in epi, making it the purest beneficiary of the GAA transition. **Tokyo Electron** leads vertical furnaces and shares batch ALD with **Kokusai Electric**, which holds ~70% of batch ALD/CVD, largely in memory. Jusung and Wonik IPS (Korea), Piotech and Naura (China), and Veeco/Aixtron (compound-semiconductor MOCVD) fill the remaining niches.

## Key Numbers

| Quantity | Value |
|---|---|
| Thermal oxidation temperature range | 800–1,200 °C (furnace); ISSG 900–1,100 °C for seconds |
| Silicon consumed per unit oxide thickness | ~0.44–0.46 (44 nm of Si per 100 nm SiO2) |
| Deal-Grove dry O2 at 1,000 °C (111) | B = 0.0117 µm²/h, B/A = 0.071 µm/h, A = 0.165 µm |
| Deal-Grove wet H2O at 1,000 °C (111) | B = 0.287 µm²/h, B/A = 1.27 µm/h, A = 0.226 µm |
| (111):(100) linear rate ratio | 1.68 |
| Activation energies | B: 1.23 eV (dry), 0.78 eV (wet); B/A: ~2.0 eV |
| Time to grow 1 µm oxide at 1,000 °C | ~99 h dry vs ~4.3 h wet |
| HKMG interfacial SiO2 / HfO2 thickness | ~0.5–1.0 nm / ~1.5–2.0 nm; total EOT ~0.8–1.0 nm |
| Interface trap density after forming-gas anneal | ~10¹⁰ cm⁻² eV⁻¹ |
| Vertical furnace batch size and ramp rate | 100–150 wafers; 5–15 °C/min |
| RTP ramp rate | 50–250 °C/s; spike anneal ~1,050 °C for < 1 s |
| LPCVD poly-Si / Si3N4 / TEOS temperatures | ~600 °C / ~750 °C / ~700 °C at 0.1–2 torr |
| PECVD temperature and RF | 300–400 °C, 13.56 MHz (+ 300–400 kHz LF for stress) |
| Low-k SiOC:H / porous ULK dielectric constant | k ~2.7–3.0 / ~2.2–2.5 (vs 3.9–4.2 for SiO2) |
| W CVD bulk reaction | WF6 + 3 H2 → W + 6 HF at 400–450 °C |
| ALD growth per cycle (TMA/H2O, HfO2) | ~0.1 nm/cycle (~1/3 monolayer); cycle time 2–10 s single-wafer |
| Cycles for 2 nm HfO2 | ~20; ~5.5 × 10¹⁵ Hf atoms/cm² in the finished film |
| HfO2 formula-unit density / monolayer areal density | 2.8 × 10²² cm⁻³ / ~9 × 10¹⁴ cm⁻² |
| ALD step count in a 3 nm/2 nm logic flow | on the order of 100 |
| Sputter yield at ~500 eV Ar⁺ | Cu ~2.3, Al ~1.0, Ti/Ta/W ~0.5–0.6 |
| Magnetron target utilization | ~30% static, 50–70% with rotating magnets |
| Barrier + liner + seed budget at ~20 nm pitch | ~4–5 nm total in a ~10–12 nm trench |
| Si–Ge lattice mismatch; S/D SiGe Ge content | 4.2%; ~50–65% Ge at 5/3/2 nm, B ~1–3 × 10²¹ cm⁻³ |
| Nanosheet superlattice | 3–4 pairs Si / Si0.7–0.75Ge0.25–0.3, each ~6–12 nm, grown ~550–650 °C |
| Market shares (approx.) | AMAT ≥ 80% PVD; ASM > 55% single-wafer ALD; Kokusai ~70% batch ALD; Lam majority of W CVD |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Applied Materials | US | Endura PVD, Producer/Ultima CVD, Eterna FCVD, Centura Epi, Vantage RTP, Olympia ALD, Endura Volta CVD Co/W/Ru | Leader in deposition overall, PVD, CVD, RTP; co-leader epi |
| Lam Research | US | Altus W/Mo CVD-ALD, Vector PECVD, Striker ALD, Speed HDP-CVD | Leader in W metal fill; co-leader dielectric CVD/ALD |
| ASM International | Netherlands | Pulsar/EmerALD/Eagle ALD (XP8), Intrepid ES epi, A412 furnaces | Leader single-wafer ALD (> 55%); #2 epi |
| Tokyo Electron | Japan | TELINDY vertical furnaces, batch ALD, Triase+ CVD/ALD, Trias SPA plasma oxidation | Leader in furnaces; #2 batch ALD |
| Kokusai Electric | Japan | AdvancedAce-300 furnaces, TSURUGI-C² batch ALD | Leader batch ALD (~70%) |
| Jusung Engineering / Wonik IPS | South Korea | ALD/CVD for Samsung, SK hynix | Niche, memory-focused |
| Naura / Piotech | China | PVD, ALD / PECVD for domestic fabs | Regional challengers |
| Mattson (Beijing E-Town) / Screen | China / Japan | RTP, laser anneal | Niche |
| Aixtron / Veeco | Germany / US | MOCVD for GaN, GaAs, SiC epi | Leaders in compound-semi epi |
| Merck (EMD), Entegris, Air Liquide, Adeka, Soulbrain, DNF, UP Chemical | DE / US / FR / JP / KR | ALD and CVD precursors (TMA, TEMAH, HfCl4, DCS, WF6, TSA, Mo precursors) | Precursor supply base |
| Honeywell, JX Metals, Tosoh, Materion, Praxair/Linde | US / JP | Sputter targets (Cu, Ta, Ti, Al, Co, W) | Target supply base |
| KLA, Nova, Onto, Bruker | US / IL / US / US | Ellipsometry, XRR, XPS, stress metrology | Film metrology leaders |

## Common Misconceptions

- **"Thermal oxide is deposited on top of the silicon."** → It is grown *into* the silicon: the oxidant diffuses through the existing oxide and reacts at the buried interface, consuming ~44% of the oxide thickness in substrate silicon. This is why the interface is so clean and why the surface moves.
- **"Wet oxidation is faster because water molecules diffuse faster."** → H2O actually diffuses slightly more slowly than O2 in SiO2; wet oxidation is 20–25× faster because water's solubility in silica is ~600× higher, so the concentration gradient driving the flux is far larger.
- **"ALD deposits one monolayer per cycle."** → A typical GPC of ~0.1 nm is only ~1/3 of a monolayer, because bulky ligands sterically block adjacent surface sites. ALD is "atomic layer" in its precision, not in its count.
- **"Since high-k replaced SiO2, there is no thermal oxide in the transistor anymore."** → Every HKMG stack retains a ~0.5–1 nm SiO2 interfacial layer under the HfO2; a bare HfO2/Si interface has unacceptable mobility and trap density. Thermal and chemical oxides also persist as STI liners, sacrificial oxides, and I/O gate oxides.
- **"PVD is obsolete at the leading edge."** → Copper seed, Ta liners, TiN, Al pads, MRAM/PCRAM stacks and many gate metals are still sputtered; ALD has taken thin, conformal layers but PVD remains the cheapest route to pure, low-resistivity metal, and Endura remains one of the best-selling tools in the industry.
- **"CVD tungsten is just WF6 plus hydrogen."** → Without a Ti/TiN liner and a silane- or borane-based nucleation layer, WF6 would attack the silicon and oxide (wormholes, volcanoes, HF damage) and would not nucleate on dielectric at all; the two-step chemistry and the fluorine-free (WCl5) and molybdenum alternatives exist precisely because of fluorine.

## Where This Fits in the Supply Chain

Module 05 delivered a polished (and possibly epitaxial) 300 mm wafer in a FOUP into a fab, and this module is where the first films go onto it: the pad oxide and nitride for isolation, the STI fill, the SiGe/Si superlattice or fin material, the gate stack, spacers, S/D epi, contact liners and plugs, and, later, every dielectric, barrier, seed, and cap of the 15–18 metal layers. The inputs consumed are the specialty gases (SiH4, DCS, NH3, WF6, NF3, GeH4, O2, H2), liquid and solid precursors (TEOS, TMA, TEMAH, HfCl4, TSA, WCl5), sputter targets, and quartzware from Module 04, plus the dummy wafers from Module 03, and the tools are the Applied, Lam, ASM, TEL, and Kokusai systems that make up a quarter of a fab's equipment spend. Every deposition step is followed by patterning: the films are shaped by the lithography of Modules 07 and 08 and the etch of Module 09, doped by Module 10, and their thicknesses verified by the metrology of Module 13. Modules 11 and 12 then show how these individual films are sequenced into a nanosheet transistor and a copper interconnect stack.

## Further Reading

1. B. E. Deal and A. S. Grove, "General Relationship for the Thermal Oxidation of Silicon," *Journal of Applied Physics* 36, 3770 (1965). The original linear-parabolic model, with the rate-constant tables reproduced above.
2. J. D. Plummer, M. D. Deal, and P. B. Griffin, *Silicon VLSI Technology: Fundamentals, Practice and Modeling* (Prentice Hall, 2000). Chapters 6 (oxidation) and 9 (thin-film deposition) are the standard graduate treatment.
3. S. M. Sze and M.-K. Lee, *Semiconductor Devices: Physics and Technology*, 3rd ed. (Wiley, 2012), and S. A. Campbell, *Fabrication Engineering at the Micro- and Nanoscale* (Oxford, 2013), for the CVD regime analysis and PVD chapters.
4. S. M. George, "Atomic Layer Deposition: An Overview," *Chemical Reviews* 110, 111–131 (2010). The definitive ALD tutorial, including the TMA/H2O mechanism.
5. R. W. Johnson, A. Hultqvist, and S. F. Bent, "A brief review of atomic layer deposition: from fundamentals to applications," *Materials Today* 17, 236–246 (2014).
6. K. Mistry et al., "A 45nm Logic Technology with High-k+Metal Gate Transistors, Strained Silicon, 9 Cu Interconnect Layers, 193nm Dry Patterning, and 100% Pb-free Packaging," *IEDM Technical Digest* (2007). The paper that introduced HKMG into production.
7. S. Wolf and R. N. Tauber, *Silicon Processing for the VLSI Era, Vol. 1: Process Technology*, 2nd ed. (Lattice Press, 2000). Encyclopedic on furnaces, LPCVD, and classic sputtering.
8. Applied Materials product pages for Endura PVD, Producer Eterna FCVD, Centura Prime Epi, and Vantage RTP (appliedmaterials.com), and ASM International's technology pages for Pulsar ALD and Intrepid ES epitaxy (asm.com).
9. SemiAnalysis, "Going Vertical: Gate All Around, 3D DRAM, 3D NAND, Kokusai Electric IPO" (2023), on batch ALD and the furnace market.
10. A. J. M. Mackus, M. J. M. Merkx, and W. M. M. Kessels, "From the Bottom-Up: Toward Area-Selective Atomic Layer Deposition with High Selectivity," *Chemistry of Materials* 31, 2–12 (2019).
