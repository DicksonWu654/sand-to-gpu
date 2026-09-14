# Module 09: Etch: Transferring the Pattern

Lithography (Modules 07 and 08) leaves the wafer covered in a temporary stencil: a few tens of nanometres of **photoresist**, the light-sensitive coating, with holes and lines in it. The stencil is not yet the device. **Etch** transfers its pattern into a material underneath by removing material through the openings. The challenge is to remove the right material, to the right depth, without eating into neighboring structures or damaging what is below. A wafer repeats versions of this task a few hundred times.

Different parts of the device need different materials: silicon for the conducting channel; silicon-germanium (SiGe) for a strained channel or a temporary, **sacrificial** layer removed later; silicon nitride for spacers, etch stops and masks; silicon dioxide for general insulation; hafnium oxide for gate insulation; titanium nitride for gate metal; tungsten for contact plugs; and copper for wires. The recipe must match the material and the shape it needs to leave. An etch is **isotropic** if it removes material at the same rate in every direction and **anisotropic** if its rate depends on direction. For transferring fine lines, the ideal directional case removes material straight down.

The reason etch is hard is a single tension. The mechanisms that remove material *selectively* (chemistry: a fluorine atom reacts with silicon and not with silicon dioxide, or vice versa) are inherently isotropic, because a reaction does not know which direction is "down." The mechanisms that remove material *directionally* (a beam of ions arriving perpendicular to the wafer) are inherently *unselective*. One **electron volt (eV)** is the energy an electron picks up falling through one volt; a chemical bond holds with 1–10 eV, so a 500 eV argon ion can break dozens of bonds and **sputters** whatever it lands on, knocking atoms off by brute impact like a sandblaster. Every etch process is a compromise between the two, and plasma etching is a 45-year effort to get the selectivity of chemistry with the directionality of ions.

As of ~2025 the stakes look like this. A leading-edge logic wafer (TSMC N3 and N2, its 3 nm- and 2 nm-class processes) goes through 200 to 300 plasma etch and strip chamber visits among its roughly 1,000+ process steps. A 3D NAND wafer (the stacked flash memory in every solid-state drive, Module 15) needs holes etched more than 60 times deeper than they are wide through nearly 300 film pairs; those single steps take the better part of an hour per wafer and consume hundreds of chambers in one fab. Etch equipment is a ~$20–25 billion per year market, roughly one-fifth of all **wafer fab equipment (WFE)**, the machines a fab buys to process wafers, dominated by three companies with two Chinese entrants climbing fast. By the end of this module you should be able to explain why a plasma etches straight down, why a fluorocarbon plasma etches oxide but stops on silicon, why a NAND channel hole takes an hour, and what atomic layer etching is.

## Before you start

- **Photoresist and the lithography stencil.** Resist is a light-sensitive polymer, 20–120 nm thick, patterned with the holes and lines etch must transfer (Modules 07–08).
- **The films etch cuts.** Thermal oxide (grown by heating silicon in oxygen), deposited oxide, silicon nitride and polysilicon; chemical vapour deposition (CVD) and atomic layer deposition (ALD) lay these down conformally, coating vertical walls as evenly as flat ones (Module 06).
- **Self-limiting surface reactions.** In ALD each gas pulse covers the surface once and stops, so thickness is counted in cycles (Module 06); atomic layer etching reuses the idea.
- **Multiple patterning, spacers and mandrels.** A temporary line (a mandrel) is coated with a thin film whose two sidewalls become two new lines (Module 07).
- **The transistor's parts.** A gate sits on a 1–2 nm gate dielectric over a channel (a fin or a stack of nanosheets); a source and drain on either side feed current through it; a spacer insulates the gate's sides and a contact wires each terminal up (Module 11).
- **Crystal planes.** Labels such as (100) and (111) name planes through the silicon crystal; (100) is the face of a standard wafer, (111) the tightly packed diagonal plane, and atoms on different planes have different numbers of bonds into the crystal (Modules 02–03).
- **School physics refreshers.** An electron volt is the energy of one electron moved through one volt; a plasma is a gas in which some electrons have been knocked free; the mean free path is the average distance between collisions; a boiling point is where a reaction product leaves as a gas.
- **Cleanroom logistics.** Wafers travel in sealed **front-opening unified pods (FOUPs)** of 25; a tool is a platform with a robot and several vacuum chambers (Module 05).
- **Wet chemistry from Module 04.** Hydrofluoric acid (HF), ammonium fluoride, phosphoric acid and sulfuric-peroxide mix (SPM) are the main wet etchants; HF dissolves glass, so it lives in fluoropolymer (PFA) vessels.

## What an Etch Has to Deliver

Picture the cross-section of a single etched line: a mask strip a few tens of nanometres wide on top, beneath it the film being cut (say 50 nm of polysilicon), beneath that an etch-stop layer that must survive (a 2 nm gate dielectric), and a trench on each side of the mask down to the etch stop. How far did the trench go, how much etch stop and mask were eaten, are the walls vertical, did the trench creep under the mask, and is the line the same width everywhere on the wafer? Every number below is a way of asking whether this picture came out right.

> **Intuition:** Cut a slot through a stencil laid over a block of layered materials. A sandblaster cuts straight down wherever the stencil is open, but cuts every layer at the same speed and chews up the stencil too. A solvent dissolves only the layer it was chosen for, but spreads sideways under the stencil as fast as it goes down.

**Etch rate** is removal per unit time, in nm/min (or Å/min for slow, precise etches; 1 Å = 0.1 nm); production dry etches run from ~1 nm/min (atomic layer etching) to ~1 µm/min (deep silicon etch). Rate sets throughput and therefore how many chambers a fab must buy.

**Selectivity** is the ratio of the etch rate of the material you want removed to that of a material you want preserved: the mask above, or the layer beneath (the **etch stop**). A gate etch cuts **polysilicon (poly-Si)**, silicon deposited as a mass of tiny crystals, and lands on the **gate dielectric**, the 1–2 nm insulator under the gate. Because the poly is never the same thickness everywhere, the recipe runs a deliberate **over-etch**, extra etching after the film is nominally gone, of 30–50% of the main etch time. During a 50 nm over-etch at 100:1 selectivity the exposed dielectric loses 50 nm / 100 = 0.5 nm of its 2 nm, which is why a gate etch needs poly-Si:SiO2 selectivity above 100:1; mask selectivity likewise sets mask thickness.

**Anisotropy** describes directionality. If the lateral etch rate (sideways, under the mask edge) is r_l and the vertical rate is r_v, anisotropy A = 1 − r_l / r_v: a purely chemical etch has A = 0 (isotropic), an ideal ion-driven etch A = 1. Most production etches sit at 0.9–0.99 and the residual lateral component appears as **undercut** beneath the mask edge. At A = 0.95 the sidewall etches at 5% of the vertical rate, so a 100 nm deep etch undercuts the mask by 5 nm per side, half of a 20 nm line.

**Uniformity** is the variation of etch depth or **critical dimension (CD)**, the width of the smallest feature being made, such as a gate line, across the wafer, quoted as 3σ (three standard deviations, the spread containing ~99.7% of measurements) or as range as a percent of the mean; leading-edge specs are ~1–2% across 300 mm. Non-uniformity comes from radial gradients in plasma density, gas depletion, chuck temperature, and the discontinuity at the wafer edge (the reason **edge rings** exist).

**Loading** is the dependence of etch rate on the total exposed area of the material: more open area consumes more reactant, so rate falls. **Microloading** is the local version: a dense array etches at a different rate than an isolated line nearby. Both are fought with higher gas flow, lower pressure, and **dummy fill**, non-functional pattern added at layout so every region presents a similar open area.

**Aspect-ratio-dependent etching (ARDE)** (also called RIE lag, after the reactive-ion-etch tools where it was first seen) is the observation that narrow, deep features etch more slowly than wide ones, for three stacked reasons. At etch pressures a gas molecule hits walls far more often than other molecules, so a radical bounces down a narrow hole like a ball in a pipe (**molecular flow**) and may react on a sidewall before reaching the floor. The **ion angular distribution**, the spread of arrival angles around vertical, is a few degrees wide, so some ions hit the sidewalls. And the feature charges: electrons arrive from all directions and are caught on the upper sidewalls, charging them negative, while only the vertical ions reach the bottom, charging it positive; the field between them slows the next ions and bends them into the walls. ARDE is the central enemy of contact and NAND etching.

**CD bias** is the difference between the printed resist CD and the etched CD, positive if the mask eroded, negative if polymer built up on the sidewall. It is exploited: **etch trim** deliberately shrinks the resist line before transfer to reach a CD below what lithography can print, at the cost of **line-edge roughness (LER)**, the nanometre-scale wobble of a line's edge.

**Profile defects** have their own vocabulary:

| Defect | What you see in cross-section | Cause | Fix |
|---|---|---|---|
| Bowing | Sidewall bulges below the mask | Ions scattered off the bevelled mask corner; too little protective polymer near the top | Harder mask; more sidewall polymer early |
| Notching | Gouge at the base where the line meets an insulating etch stop, worst on the last line of an array | Charge on the insulator deflects ions into the foot | Pulsed plasma; lower-bias over-etch |
| Footing | Fillet of unetched material at the base | Too much protective film at the foot, or too little over-etch | Leaner protective film; longer over-etch |
| Micro-trenching | Extra-deep groove along the base of each sidewall | Ions grazing the wall reflect (specularly, like light off a mirror) into the corner | Lower ion energy; more sidewall polymer |
| Faceting | Mask's top corners bevelled | Sputtering is fastest on corners | Harder mask; lower bias in the mask-open step |
| Twisting | Hole wanders off centre at depth | Asymmetric polymer and charging | Pulsing; polymer control; cryogenic chemistry |

**Damage**, everything the plasma does that you did not ask for, has its own section later. Every chemistry and hardware choice below exists because it moves one of these metrics.

## Wet Etch: Still the Workhorse for Selectivity

Wet etching was the only etching until plasma etchers entered fabs in the mid-1970s, and it remains everywhere in the fab where selectivity matters more than directionality. Its virtue is selectivity, which can reach 1,000:1 or more; its vice is isotropy.

### Hydrofluoric acid and silicon dioxide

Silicon dioxide is chemically robust (the Si–O bond is ~4.8 eV, among the strongest single bonds there are) but has one vulnerability: fluorine bonds silicon even more strongly, and the product SiF4 is a gas or, in water, a soluble complex. The textbook equation is

SiO2 + 6 HF → H2SiF6 + 2 H2O

where hexafluorosilicic acid, H2SiF6, is fully water-soluble.

**Buffered oxide etch (BOE)**, typically 6:1 or 7:1 by volume of 40% NH4F to 49% HF, exists because pure HF drifts in rate as it is consumed and lifts photoresist; the ammonium fluoride holds the pH steady and keeps the resist adhering. 6:1 BOE etches thermal oxide at ~100 nm/min at room temperature; 49% HF etches it at ~2 µm/min; dilute HF (**DHF**, 100:1 water:HF) at ~2–3 nm/min, the range for controlled recesses and pre-gate cleans. Deposited oxides etch faster because they are less dense and contain hydrogen: **plasma-enhanced chemical vapour deposition (PECVD)** is the low-temperature way to deposit oxide, **TEOS** (tetraethyl orthosilicate) its usual liquid precursor, and an un-annealed PECVD oxide can etch 3–10x faster than thermal oxide.

Selectivity is the point: HF etches SiO2 at ~100 nm/min while barely touching silicon, and etches silicon nitride at only ~1 nm/min in BOE, a ~100:1 selectivity no plasma achieves so easily. HF does strip the native oxide and leaves silicon **hydrogen-terminated**: every surface atom is capped with hydrogen, which keeps oxide from regrowing for minutes to hours, which is why an "HF-last" clean precedes **epitaxy** (growing new single-crystal silicon or SiGe on the wafer's own crystal, Module 06) and gate-stack formation.

> **Why it matters downstream:** The **wet etch rate ratio (WERR)**, a deposited oxide's DHF etch rate divided by thermal oxide's, is the standard quick check of film quality after every deposition-tool change or anneal: a rising WERR says the film is porous or hydrogen-rich. And because hydrogen termination fails as the wafer sits in air, every HF-last clean carries a **queue-time** rule: reach the epitaxy or gate-dielectric chamber within a fixed number of hours or be re-cleaned, one of the commonest reasons lots are held.

### Hot phosphoric acid and silicon nitride

Silicon nitride is the fab's favourite hardmask (a hard, etch-resistant mask layer, explained later) and etch stop because so little attacks it. The one thing that does, selectively, is concentrated (85%) phosphoric acid at 150–180 °C, typically ~160 °C, which hydrolyzes Si3N4 to silicic acid and ammonia at ~4–6 nm/min while etching SiO2 at only 0.1–0.5 nm/min: a selectivity of 10–50:1 that depends critically on how much dissolved silica the bath contains, so fabs manage the silica concentration deliberately. Hot phosphoric baths are corrosive, boil off the water that sets their rate (so it is replenished continuously), and are hard to make single-wafer, so nitride strip remains one of the last big batch wet processes. Its most famous modern use, the 3D NAND nitride pull, is described in the channel-hole section.

### Anisotropic silicon etch: KOH and TMAH

Wet etch is not always isotropic. Alkaline etchants (potassium hydroxide, KOH, and **tetramethylammonium hydroxide, TMAH**) etch silicon by hydroxide attack on surface Si–Si bonds, at a rate that depends on how many bonds hold each surface atom into the crystal. On the (111) plane, where atoms pack most tightly, each surface atom is held by three bonds with one free; on the (100) wafer face it has two in and two free, and two free bonds are easier to attack, so the etch is 30–400x faster on (100) than on (111). A square mask opening on a (100) wafer therefore etches into a pit bounded by (111) planes at 54.74°, self-terminating in a V-groove. 30% KOH at 80 °C etches (100) silicon at ~1 µm/min; 25% TMAH at 80–90 °C at ~0.5–1 µm/min with lower (111) selectivity. TMAH is the choice inside CMOS flows because potassium is a **mobile ion** that drifts through the gate oxide under voltage and shifts the switching voltage unpredictably, destroying **metal-oxide-semiconductor (MOS)** devices, the gate-on-insulator-on-silicon structure of every transistor in this course. These etches are the basis of bulk-micromachined **MEMS** (micro-electro-mechanical systems such as pressure sensors).

### The isotropic undercut problem

> **Worked example: distinguish an opening from a protected line.** In a simple constant-rate isotropic model, removing a film thickness t also undercuts the mask by about t on each side. A mask opening of width w therefore widens near the original surface to about w + 2t, with rounded walls; this is not the remaining width of a gate line. A protected line starts at w and narrows near that surface toward w − 2t. For a 20 nm protected line over a 20 nm film, the lateral etch fronts meet before the full film clears, so the intended line is lost rather than becoming a 60 nm gate. For a 5 nm recess beside a 30 nm feature, the corresponding lateral reach is about 5 nm per side. Actual profiles depend on access, over-etch and geometry, but the lesson is general: uncontrolled lateral removal is incompatible with fine line transfer, while it can be useful for deliberate recesses.

### Batch versus single-wafer wet tools

Wet hardware comes in two families. **Batch wet benches** immerse a **cassette** (a rack of 25 or 50 wafers) in a sequence of tanks (etch, rinse, dry) made of quartz or **PFA**, a Teflon-like fluoropolymer that HF does not attack; cheap and fast per wafer, they remain the choice for long, hot etches like phosphoric nitride strip. Their weaknesses are cross-contamination (anything one wafer releases lands on the other 24), bath aging, and poor sub-nanometre control. **Single-wafer spin tools** hold one wafer on a spinning chuck under a nozzle arm and dispense fresh chemistry across it, giving tightly controlled removal: a 100:1 DHF recess of 1.5 nm is a single-wafer job. SCREEN, Tokyo Electron, Lam and SEMES (Samsung's affiliate) dominate; SCREEN alone holds roughly 40–50% of the wet clean and etch market.

> **What can go wrong:** *Bath aging*: as HF is consumed or silica accumulates the rate drifts; caught by monitor wafers, fixed by timed bath changes. *Silica precipitation* in hot phosphoric drops particles onto every wafer in the tank. *Resist lift* in unbuffered HF: the resist peels at its edges and the etch undercuts; use BOE or a hardmask. *Pattern collapse on drying*: as rinse water evaporates from between two tall lines its surface tension pulls them together and they stick; the fix is isopropanol or supercritical-CO2 drying. *HF safety*: HF penetrates skin painlessly and pulls calcium out of tissue and bone, so wet benches are enclosed and operators carry calcium gluconate gel.

## Plasma Physics for Engineers

Dry etching solves the undercut problem by supplying directional ions from a plasma. An engineer needs a working model of what that plasma is, and the model is not complicated.

### Making a plasma

Fill a chamber with gas at 1–100 mTorr. One **Torr** is the pressure of a 1 mm column of mercury and 760 Torr is one atmosphere, so 1–100 mTorr is roughly a millionth to a ten-thousandth of atmospheric pressure. Apply **radio-frequency (RF)** power, an alternating voltage at millions of cycles per second, historically at **13.56 MHz**, an ISM (industrial, scientific, medical) band where unlimited radiation is legal rather than a physically special frequency. The few free electrons always present are accelerated by the field; being ~70,000 times lighter than an argon ion, they respond while ions barely move. An electron that reaches ~15 eV can ionize an argon atom (ionization energy 15.76 eV), freeing another, and the population avalanches until wall losses balance creation. The result is a weakly ionized gas with an **ionization fraction** of only 10⁻⁶ to 10⁻³: for every ion, a thousand to a million neutral molecules.

This gas has two temperatures. The electrons, which absorb the RF energy, have a spread of energies like the molecules of a hot gas, with an **electron temperature** of 2–5 eV (1 eV corresponds to 11,600 K, so ~30,000–60,000 K). The ions and neutrals, which collide too rarely to equilibrate with electrons, stay near room temperature (~300–500 K). This is why plasma etching is "cold": a 20 °C wafer under 40,000 K electrons that dissociate CF4 into CF3 and F **radicals**, molecule fragments with an unpaired electron and therefore extremely reactive. Electrons this hot break any bond (C–F is 5.6 eV) and excite the glow that endpoint detection reads.

**Ion density** is ~10⁹–10¹⁰ cm⁻³ in a capacitively coupled plasma and 10¹¹–10¹² cm⁻³ in an inductively coupled one; for scale, the neutral gas at 10 mTorr is ~3×10¹⁴ cm⁻³ and air at atmospheric pressure ~2.5×10¹⁹ molecules/cm³. Radicals (F, Cl, O, CFx) outnumber ions 10–1,000x: chemistry is dominated by neutrals, directionality by ions.

### The sheath and DC self-bias

> **Intuition: the plasma builds its own ion gun.** Electrons are so light and fast that every wall touching the plasma is instantly coated with negative charge. The body of the plasma is left at a higher voltage than any surface, so a thin "cliff" of voltage forms at every surface, and a positive ion that wanders to its edge falls straight down it, perpendicular to the surface, with an energy equal to the cliff's height.

That cliff is the **sheath**. Because electrons move so much faster than ions, any surface touching the plasma is bombarded by electrons first and charges negative until it repels enough of them to balance the ion arrival. The plasma bulk sits at a positive **plasma potential** V_p (typically 10–30 V above the walls), and a thin electron-depleted layer forms at every surface across which this potential drops: the sheath, 0.1 to several mm thick. Its thickness is a few **Debye lengths**, the distance over which a plasma can screen out an electric field, ~100 µm at 10¹⁰ cm⁻³ and 3 eV, and it thickens as the voltage across it grows.

The voltage drop explains the direction; the next quantities tell us how fast ions enter that accelerating region and how much energy they gain. Speed, energy and arrival rate are different: many gently arriving ions are not equivalent to a few hard impacts.

Ions drift to the sheath edge at the **Bohm velocity**, the minimum speed to enter the sheath, roughly √(kT_e/M) with kT_e the electron temperature in energy units and M the ion mass, about 2.7 km/s for argon at 3 eV, and are then accelerated straight across it, perpendicular to the wafer, gaining the sheath voltage. Because the sheath is thin compared with the ion **mean free path** (the average distance between collisions), ions cross it almost without collision and arrive within a few degrees of normal. This is the origin of anisotropy.

The **DC self-bias** turns a modest sheath into a powerful one. Apply RF to the wafer electrode through a **blocking capacitor**, which passes the alternating RF but no steady current. On the positive half-cycle the electrode collects a huge electron current, on the negative half-cycle only a small ion current, and since the capacitor cannot pass net DC current the electrode's average potential drifts negative until the two balance. The result is a negative DC offset V_dc that scales with RF voltage and with electrode asymmetry (a small powered electrode facing a large grounded chamber gets the largest bias). Ions then arrive at the wafer with energy ~e(V_p − V_dc), where e is the electron charge, tunable from ~20 eV to several kilovolts.

> **Worked example: ion energy and flux at the wafer.**
> A dielectric etch chamber runs 2 MHz bias power that develops a self-bias of −1,200 V on the chuck, with plasma potential +25 V, so ions arrive with up to ~1,225 eV. The ion plasma frequency, the natural rate at which displaced ions oscillate, is f_pi = (1/2π)·√(n e²/ε₀ M), with n the ion density, e the electron charge, ε₀ the permittivity of free space and M the ion mass; for argon at 10¹⁰ cm⁻³ it is about 3 MHz, meaning a field slower than that drags the ions along. Since 2 MHz is below that, the ions follow the oscillating sheath and arrive with a broad **bimodal** (two-peaked) distribution between roughly 0 and ~2,400 eV peak. Ion flux, by contrast, is set by density, not bias: the Bohm flux is Γ ≈ 0.61·n·u_B, with u_B the Bohm velocity and 0.61 the fraction to which density has fallen at the sheath edge, meaning every ion reaching the sheath edge is collected. With n = 10¹⁰ cm⁻³ and u_B = 2.7×10⁵ cm/s, Γ ≈ 1.6×10¹⁵ ions cm⁻² s⁻¹; times the charge per ion (1.6×10⁻¹⁹ C) that is ~0.26 mA/cm². A monolayer (one atomic layer) of SiO2 is ~10¹⁵ atoms/cm², so at one atom removed per ion (a high yield) this flux removes about one monolayer per second, ~0.3 nm/s, ~20 nm/min. That raw ion budget is why dielectric etches that need 200 nm/min run at 10x that density with a yield well above one atom per ion, delivered by chemistry.

### Frequency, ion energy versus ion flux, and dual-frequency CCP

The two knobs a process engineer wants are **ion flux** (ions per second, which drives etch rate) and **ion energy** (how hard they hit, which drives anisotropy and damage). In a single-frequency capacitive reactor (the 1980s RIE tool) they are tied together: more RF power raises both.

The escape comes from the different masses of electrons and ions. A charged particle displaced in a plasma springs back and oscillates at a natural rate set by its mass, its **plasma frequency**, and can follow an applied field only if the field wiggles more slowly than that. The **electron plasma frequency** at 10¹⁰ cm⁻³ is ~900 MHz, so electrons follow any RF field used in etching; the ion plasma frequency is a few MHz, so ions respond to fields below ~3–5 MHz but only to the time-averaged field above ~10 MHz. Therefore:

- A high frequency (27, 40, 60, 100 MHz) heats electrons efficiently and generates density (ion flux) but, because ions cannot follow it, adds little ion energy.
- A low frequency (2 MHz, 400 kHz, sometimes 13.56 MHz as the "low" one) generates a large sheath voltage that ions follow, giving high-energy, broad-distribution bombardment.

A **dual-frequency capacitively coupled plasma (CCP)** applies both (60 MHz for density, 2 MHz or 400 kHz for energy) to the wafer electrode or one to each electrode. Lam's Flex and TEL's Vigus dielectric etchers are built on this principle, and NAND channel-hole etchers push the low-frequency power to tens of kilowatts to drive ions to multi-keV (thousands of eV) energies down 10 µm holes.

### CCP versus ICP versus ECR

**Capacitively coupled plasma (CCP)**: two parallel plates, the upper one usually a silicon gas **showerhead**, the wafer on the lower. High ion energy and modest radical density make it the platform for **dielectric etch** (SiO2, Si3N4, and **low-k**, the porous carbon-containing insulator between wires, Module 12), where 4.8 eV Si–O bonds must be broken.

**Inductively coupled plasma (ICP)**: RF (13.56 MHz, or 2 MHz in some TEL and Lam designs) is driven through a coil outside a dielectric window on top of the chamber; its oscillating magnetic field induces an electric field circulating around the chamber axis (azimuthally) that heats the electrons, as a transformer's primary drives its secondary, with the plasma as the secondary. Crucially, the chuck has its own independent RF bias (13.56 or 2 MHz), so ion energy (bias) and ion flux (coil power) are fully separated, and the low pressure gives a tight ion angular distribution. ICP is the platform for **conductor etch** (silicon, poly, SiGe, metals, hardmasks), where the material is easy to etch chemically and the challenge is precision and low damage. TEL also fields a 2.45 GHz microwave source, **RLSA** (radial line slot antenna), with very low electron temperature and hence low damage.

**Electron cyclotron resonance (ECR)**: 2.45 GHz microwaves in an 875 gauss magnetic field (≈0.09 tesla, ~2,000x the Earth's). Electrons spiral around field lines at a rate set by the field, exactly 2.45 GHz at 875 gauss, so the microwaves pump them like well-timed pushes on a swing: this **cyclotron resonance** gives high density below 1 mTorr. ECR survives at Hitachi High-Tech for gate and fin etching; most of the industry moved to the simpler ICP.

| Source | Density (cm⁻³) | Pressure | Ion energy | Radical flux | Best for | Example chambers |
|---|---|---|---|---|---|---|
| CCP (dual-frequency) | 10⁹–10¹⁰ | 10–200 mTorr | Up to several keV | Modest | Dielectric etch: contacts, vias, NAND holes | Lam Flex, TEL Vigus, Applied Sym3, AMEC Primo |
| ICP | 10¹¹–10¹² | 1–20 mTorr | 20–200 eV, separate bias | High | Conductor etch: silicon, poly, SiGe, metals, hardmasks | Lam Kiyo, TEL ICP, Applied Centura, AMEC Primo nanova |
| ECR and microwave | High (ICP-like) | <1 mTorr (ECR) | Low, separate bias | High, low electron temperature | Low-damage gate and fin etch | Hitachi High-Tech ECR, TEL RLSA |

**Wafer temperature** is a first-class knob in all of them. The wafer sits on an **electrostatic chuck (ESC)** that clamps it electrostatically, with helium at a few Torr in the gap behind it to conduct heat to the temperature-controlled chuck (vacuum would otherwise insulate the wafer). Modern ESCs have dozens of heater zones to correct non-uniformity, and chillers span −70 °C (cryogenic dielectric etch) to +150 °C.

**Pulsed plasma**: switching source or bias power on and off at 1–10 kHz with a controllable **duty cycle**, the fraction of each period the power is on. In the off period electrons cool and charge accumulated in features neutralizes, and the time-averaged ion energy can be set independently of the peak; synchronous pulsing is standard on leading-edge conductor etchers to reduce notching and charging damage.

## Etch Mechanisms: Chemical, Physical, and the Synergy Between Them

### Pure chemical etching (radicals)

A fluorine atom hitting silicon reacts spontaneously at room temperature: 4 F + Si → SiF4, with SiF4 a gas at −86 °C boiling point that desorbs immediately. A remote plasma of CF4, SF6 or NF3 with the ions filtered out etches silicon isotropically at hundreds of nm/min while barely touching SiO2. **XeF2** vapour (xenon difluoride) does the same with no plasma at all and is used to release MEMS structures. Chemical etching is fast, selective, gentle and isotropic: useless for a vertical sidewall, ideal for removing a sacrificial layer.

### Pure physical etching (sputtering)

Fire 500 eV argon ions at a surface. Each ion transfers momentum in a **collision cascade**, a chain of billiard-ball collisions among the atoms just under the surface, and knocks out ~0.5–1.5 surface atoms (the **sputter yield**, which has a threshold of 20–50 eV and rises roughly with √energy). This is **ion milling**: perfectly directional, nearly zero selectivity (all materials sputter within a factor of ~3 of each other), slow, and dirty, because the sputtered atoms redeposit. It is used only for materials with no volatile compounds (magnetic films for magnetic memory) and for the argon "breakthrough" step that clears native oxide.

### Ion-enhanced etching: the Coburn and Winters experiment

The whole field rests on an experiment John Coburn and Harold Winters published from IBM San Jose in 1979. Silicon exposed to a beam of XeF2 gas alone etched at about 5 Å/min; exposed to a 450 eV Ar⁺ ion beam alone, it sputtered at about 2 Å/min; with both on together it etched at about 55 Å/min, roughly eight times the sum, and switching either off dropped the rate straight back. This is **ion-enhanced etching**, and the synergy is the reason plasma etching works at all.

> **Intuition:** Think of chemistry as loosening material and ion impacts as helping the loosened material leave. Chemistry alone gives 5 Å/min in this experiment; ions alone give 2 Å/min; together they give 55 Å/min. The gain is much larger than simply adding the two rates because each makes the other more effective. Ions arrive mainly at the floor of an opening, so that cooperation favors downward removal. The sidewalls still need protection, discussed next; directionality does not mean the chemistry has stopped acting elsewhere.

Ions help in several ways: they break surface bonds and **amorphize** the top ~1–3 nm, scrambling the crystal into a disordered glass full of dangling bonds that adsorb F more readily; they supply the energy to form and desorb the volatile product (SiF4 from a fluorinated SiFx layer), the rate-limiting step; and they sputter away anything (native oxide, polymer) that would block the chemistry. So where ions land (horizontal surfaces) the etch is fast, and where they do not (sidewalls) it proceeds at the slow chemical rate. The most important variable is therefore the ratio of radical flux to ion flux: neutral-rich is fast and less anisotropic, ion-rich slower, more anisotropic and more damaging. Every recipe knob (pressure, power, frequency, gas mix, temperature) ultimately tunes this ratio and the ion energy.

### Sidewall passivation

For most etches the spontaneous chemical rate on the sidewall is not zero, so a deliberately deposited **passivation layer** must protect it, and the choice of passivation chemistry is what distinguishes the major etch families.

**Fluorocarbon chemistry for oxide and nitride.** Feed gases such as C4F8, C4F6, CHF3, CH2F2 or CF4 (with Ar as diluent and O2 as polymer trimmer) dissociate into F atoms and CFx radicals that polymerize on every surface into a thin fluorocarbon film; where ions land it is continuously thinned, on the sidewalls it accumulates to a few nanometres and blocks F attack. The rule of thumb is the fluorine-to-carbon ratio of the gas: high F/C (CF4, F/C = 4) etches everything with little selectivity; low F/C (C4F6, F/C = 1.5) deposits heavily and is very selective. Adding H2 (which scavenges F as HF) lowers the effective F/C; O2 (which burns polymer) raises it.

> **Worked example: the polymer-thickness switch.** On every horizontal surface in a C4F6/Ar/O2 contact etch the CFx film is in a tug of war: the plasma deposits it, ions thin it, and any oxygen present burns it. On SiO2 the oxygen liberated by etching turns the film's carbon into CO, CO2 and COF2, so the film settles at ~1 nm, ions punch through it, and the oxide etches at full rate. On silicon or nitride there is no oxygen source; the film thickens until ions of the chosen energy can no longer reach the surface beneath, and the rate falls to zero: an etch stop. The same gas therefore etches oxide 10–30 times faster than nitride, purely because of where the film equilibrates. Lowering the F/C ratio (C4F6 instead of CF4) tilts the tug of war toward deposition and raises selectivity, but in a narrow hole the extra polymer closes the neck and stops the etch; raising the ion energy tilts it back at the cost of mask erosion and damage.

**HBr/O2 (and Cl2) chemistry for silicon.** Bromine etches silicon via SiBr4 (boiling point 153 °C, so it desorbs under ion bombardment but not spontaneously), and its spontaneous reaction with silicon is very slow, so the sidewall rate is intrinsically low; a few percent O2 forms a thin SiOxBry passivation film on the sidewalls, robust enough for near-perfectly vertical profiles. Chlorine (SiCl4, boiling point 58 °C) is more reactive and faster but attacks laterally, so poly gate main etches use Cl2/HBr mixes and finish in pure HBr/O2. Because HBr/O2 barely etches SiO2 (bromine does not attack the Si–O bond without high ion energy), selectivity to the gate oxide exceeds 100:1 in the "soft landing" step, which is the whole reason a gate can be etched onto a 1 nm dielectric.

**Cl2/BCl3 for aluminium and other metals.** Aluminium chloride, AlCl3, sublimes at ~180 °C, so chlorine etches aluminium readily, but aluminium is always covered by 2–5 nm of native Al2O3 that chlorine cannot penetrate; BCl3 is added because boron reduces the oxide and scavenges water and oxygen. The resist's own carbon passivates the sidewalls, and the wafer must be stripped and rinsed immediately, because residual chlorine turns into HCl in humid air and corrodes the lines. Titanium nitride etches in Cl2/BCl3 as TiCl4; tungsten etches in fluorine (WF6 is a gas at room temperature, which is why tungsten is the easiest metal to etch and the standard for word lines and contact plugs). Copper has no volatile halide at practical wafer temperatures (CuCl2 needs well above 200 °C to leave), which is why conventional fine-pitch BEOL copper is not normally patterned by subtractive plasma etching and the interconnect stack uses the **damascene** approach (Module 12): etch trenches into the insulator, fill with copper, polish away the excess.

| Material | Etch gas | Volatile product | Boiling or sublimation point | Passivant | Platform |
|---|---|---|---|---|---|
| Silicon, poly-Si, SiGe | Cl2 / HBr / O2 | SiCl4, SiBr4 | 58 °C, 153 °C | SiOxBry | ICP |
| SiO2, Si3N4, low-k | C4F6 / C4F8 / CHF3 + Ar / O2 | SiF4 (plus CO, COF2) | −86 °C | CFx polymer | CCP |
| Aluminium | Cl2 / BCl3 | AlCl3 | Sublimes ~180 °C | Carbon from the resist | ICP |
| Tungsten | SF6 / NF3 | WF6 | Gas at room temperature | Fluorocarbon, if any | ICP or CCP |
| Titanium nitride | Cl2 / BCl3 | TiCl4 | Readily volatile | Resist or polymer carbon | ICP |
| Copper | None practical | CuCl2 needs >200 °C | Not volatile | None | Damascene instead (Module 12) |

> **What can go wrong:** *Polymer necking and etch stop*: too little oxygen or too low F/C lets CFx close the top of a narrow hole; seen as shallow or missing holes in cross-section and open contacts at test. *Twisting*: uneven polymer and charged walls steer ions in a deep hole, which lands beside its target. *Aluminium corrosion*: chlorine left on sidewalls becomes HCl in air and eats the lines within hours; the fix is an in-situ O2 or water-vapour plasma, then immediate strip. *Fluorocarbon residue* on contact bottoms raises resistance and needs a post-etch O2 or H2 plasma and wet clean.

### The Bosch process: deep silicon etching for MEMS and TSVs

Time-multiplexing the etch and passivation steps rather than running them together is the idea patented by Franz Laermer and Andrea Schilp of Robert Bosch GmbH in the mid-1990s, hence the **Bosch process**. In an ICP chamber, alternate: (1) a few seconds of SF6 plasma at low bias, in which F radicals etch silicon isotropically and fast (an instantaneous ~tens of µm/min in open areas); (2) a few seconds of C4F8 plasma, which coats the whole feature with fluorocarbon polymer; then back to (1), where a bias of tens of volts clears the polymer from the floor but not the sidewalls, so the next bite proceeds downward. Each cycle bites ~0.1–1 µm and leaves a rounded lateral bite in the sidewall; the resulting ripples are **scallops**, with a period equal to the per-cycle bite (~0.1–1 µm) and a depth of tens of nanometres, reducible to ~10 nm with shorter cycles at the cost of throughput. Averaged over both steps the Bosch process delivers ~5–30 µm/min in production, toward the low end (~5–10 µm/min) for narrow, deep vias; aspect ratios of 30–50:1 in production and >100:1 in the lab; and selectivity to oxide masks above 100:1. It is the etch behind the **through-silicon via (TSV)**, a vertical copper-filled hole through a thinned die connecting its front to its back (Modules 16–17): a ~10 µm diameter, ~100 µm deep TSV in a high-bandwidth-memory (HBM) stack or a CoWoS interposer (the silicon carrier under a GPU, Module 17) takes several minutes. Tools: Lam Syndion, SPTS (now KLA) Omega Rapier and DSi, and Plasma-Therm.

**Cryogenic silicon etch** (Hitachi, Tachi, 1988: SF6/O2 at −100 to −120 °C, where a SiOxFy layer condenses on the sidewalls) gives scallop-free walls but never displaced Bosch for MEMS, because the temperature control was painful; the *idea* of cryogenic passivation returned three decades later for dielectrics and now dominates 3D NAND.

## Hardmasks, Mask Erosion, and Strip

An **extreme ultraviolet (EUV)** resist is 20–35 nm thick; a single-exposure argon-fluoride (ArF) immersion resist ~90–120 nm. Neither survives an etch of 100 nm of silicon or 200 nm of oxide at 3–5:1 selectivity, and neither stands up at 20 nm line widths (lines with aspect ratios above ~3 collapse during develop). So essentially every leading-edge etch is a **hardmask** transfer: the resist pattern is cut into a thin, hard intermediate layer that then masks the real etch.

> **Intuition:** A ladder of stencils. The resist is a paper stencil that can only guide a light spray, so you use it to cut a cardboard stencil, and the cardboard to cut a steel one, and only the steel faces the sandblaster. Each rung is tough against the etch that cuts the rung below, and a little rounding and roughness is added at each hand-off.

The standard hardmask materials are:

- **Spin-on carbon (SOC)** and **spin-on glass / Si-ARC**: the **trilayer** resist stack (resist on a silicon-containing anti-reflective coating, Si-ARC, 20–30 nm, on 100–300 nm of spin-on carbon). The Si-ARC is etched in fluorocarbon with the resist as mask, the carbon in O2/N2, H2/N2 or COS/O2 plasma with the Si-ARC as mask, at very high selectivity because the carbon etch does not touch oxide. Spin-on films are **planarizing** (they flatten over underlying bumps), so this is also the choice over topography.
- **Amorphous carbon** by PECVD (Applied's APF is the classic), denser and more etch-resistant than spin-on carbon and made microns thick for deep etches. **Boron-doped carbon** (higher density and **modulus**, meaning stiffness) raises the oxide:mask selectivity from ~5:1 toward ~10:1 and lets single-deck channel holes (a deck is one separately etched sub-stack) reach 5–6 µm.
- **Silicon nitride** and **silicon oxide**, the inorganic masks for silicon etches (HBr/Cl2 is highly selective to both), and **titanium nitride** for BEOL dual-damascene trench etch, a metal hardmask later removed by **chemical mechanical polishing (CMP)**, grinding the surface flat with a slurry (Module 12).

**Mask erosion** is the mask's own etch, and it is not uniform: the corners facet from sputtering and reflect ions into the feature (bowing), the mask CD opens up (CD bias), and the mask roughens and transfers LER into the feature. Each polymerizing etch step also rounds off some of the resist's roughness, which is why etch is part of the EUV stochastics (random photon-count variation) discussion (Module 08).

> **Worked example: the mask budget.** The mask must outlast the etch with margin: mask thickness ≥ (etch depth / selectivity) × safety factor. A 10 µm NAND etch at 5:1 oxide:carbon selectivity consumes 2 µm of mask, and even at 10:1 a 2 µm mask loses 1 µm, so the mask starts at 2–3 µm to cover faceting and the over-etch at the slowest holes. A 100 nm gate etch at 20:1 poly:nitride selectivity consumes only 5 nm, so a nitride cap of a few tens of nanometres is ample; the margin mostly protects the corners, which facet first.

**Strip (ash)** removes resist and carbon masks when their work is done. An **asher** is a remote-plasma tool: a microwave or ICP source upstream makes the plasma, so only long-lived oxygen radicals, not ions, reach the wafer at 200–300 °C; they oxidize organic material to CO, CO2 and H2O at several µm/min, with N2 or **forming gas** (a few percent hydrogen in nitrogen) added. H2/N2 replaces O2 on low-k dielectrics, because oxygen strips the carbon from **SiOCH** (silicon oxide with carbon and hydrogen built in to lower its dielectric constant). **Wet strip** in **SPM** (sulfuric-peroxide mix, "piranha," 4:1 H2SO4:H2O2 at 120–150 °C) or ozonated water removes the inorganic residues an ash cannot. Strippers come from Mattson (now Chinese-owned), PSK (Korea), Lam (GxT) and ULVAC; a leading-edge flow has roughly as many strip steps as lithography steps.

## The Critical Etches in a Modern Flow

The best way to understand the constraints is to walk through the etches of a leading-edge process in the order the wafer meets them.

### STI: shallow trench isolation

**Shallow trench isolation (STI)** is the first etch on a logic wafer. A pad oxide (~5–10 nm) and a thick nitride (~50–100 nm) are deposited and patterned, and the stack plus the silicon is etched into trenches that will be filled with oxide to isolate neighbouring transistors; in a planar process the trench is 300–400 nm deep. A **fin** is a thin vertical wall of silicon, ~6 nm wide, that serves as the channel with the gate wrapped over three of its sides; a **FinFET** is a transistor built on one (Module 11). In a FinFET process the STI etch is effectively the fin etch. The recipe is an ICP HBr/Cl2/O2 etch with three requirements: a slight taper (85–88°) so the oxide fill has no void; rounded corners (sharp corners concentrate field and leak), from a brief isotropic or high-pressure step; and smooth sidewalls, since the trench wall is the fin sidewall on which the channel conducts.

### Fin etch by SAQP hardmask transfer

At N7 through N3, fins are defined by **self-aligned quadruple patterning (SAQP)** (Module 07): one lithographic **pitch** (the centre-to-centre spacing of repeated lines) is divided by four via two rounds of spacer deposition and etch. A **mandrel** is a temporary line whose two sidewalls become two new lines; a **spacer** is the thin film left standing on a sidewall after an anisotropic etch removes it everywhere else. The etch flow is a sequence of transfers down a hardmask stack, from the top:

1. **Photoresist**, which masks the Si-ARC open.
2. **Si-containing anti-reflective coating**, which masks the spin-on carbon etch.
3. **Spin-on carbon**, which masks the first mandrel layer.
4. **SiN or SiON**, the first mandrel, whose sidewalls carry the first spacers (SiO2 or SiN, ALD at ~5–10 nm).
5. **Amorphous carbon** (APF or boron-doped carbon), the second mandrel, which carries the second spacer generation.
6. **Pad nitride and pad oxide**, the final inorganic mask.
7. **Silicon**, into which the fins are cut.

Each transfer has its own chemistry (a fluorocarbon spacer etch, a selective mandrel pull, an O2/N2 or COS/O2 carbon open). The fin etch itself must produce a fin 6–7 nm wide and 100–120 nm tall (only the top ~50–60 nm is exposed above the STI as the active fin), an aspect ratio of ~15–20:1, at a pitch of ~26–30 nm, with sidewall angle >88°. **Pitch walking** (the two spacer generations landing at slightly different spacing, so alternate fins differ) is a mask problem that etch cannot fix. The fin CD uniformity spec is at the ~1 nm level, and at N2 the Si/SiGe nanosheet stack (Module 11) is etched into "fins" with the same flow.

### Gate etch and the footing problem

The **dummy gate** (poly-Si or amorphous Si, ~60–100 nm) is a placeholder: in the **replacement-metal-gate** flow it is patterned first, the source/drain and spacers are built around it, and it is then removed and replaced by the final **high-k** dielectric (hafnium oxide, an insulator with a high dielectric constant that stores more charge per nanometre than SiO2) and metal gate. It is etched through a nitride/oxide hardmask in a multi-step ICP recipe:

1. **Breakthrough**: a short fluorocarbon or CF4 step punches through the native oxide on the poly, which HBr alone would not open.
2. **Main etch**: Cl2/HBr at high rate removes the bulk of the poly vertically.
3. **Soft landing**: near the dielectric the recipe switches to HBr/O2 at low bias, trading rate for >100:1 selectivity.
4. **Over-etch**: at even lower bias, the poly left on the fin sidewalls and in the corners is cleared while the dielectric is exposed.

> **Worked example: the gate over-etch budget.** The poly wraps over fins ~100 nm tall. When the etch front reaches the fin tops, the 2 nm dielectric there is exposed while ~100 nm of poly still stands on the fin sidewalls and in the corners against the STI. Clearing it at 100:1 selectivity consumes 100 / 100 = 1 nm of the 2 nm dielectric: survivable. At 30:1, a plain Cl2/HBr main-etch selectivity, it would consume 3.3 nm and punch through into the fin. This is why steps 3 and 4 must reach >100:1.

Gate CD control is at the ~1 nm level and LER below 2 nm; a rough fin makes a poly sidewall that etches unevenly.

> **What can go wrong:** *Footing*: a fillet of poly at the base of the gate, from excess SiOxBry passivation at the foot or too little over-etch; it lengthens the effective gate and can short neighbours, and shows up in cross-section and as a systematically long gate on a **CD-SEM** (the scanning electron microscope that measures CDs from above). *Notching*: a gouge at the base where the exposed dielectric charges up and deflects ions into the foot, shortening the gate. It is a charge-accumulation problem, which is why synchronous pulsing fixes it: in the off phase electrons flood in and neutralize the charge before it can bend the next ions.

### Spacer etch

A conformal dielectric (SiN, or SiOCN and SiBCN, nitride with oxygen, carbon or boron added to lower its dielectric constant; 5–10 nm, by low-temperature ALD) is laid over the gate, then etched anisotropically so that it is removed from every horizontal surface and remains only on the gate sidewalls, where it sets the offset between the gate edge and the **source/drain (S/D)**, the doped regions that feed current into and out of the channel, formed by implant or **epi** (epitaxially grown silicon or SiGe). The etch (typically CH3F/O2 or CH3F/CH4/O2, with hydrofluorocarbon polymer providing the selectivity) must clear the fin tops and the STI without recessing the fin silicon (the future S/D), without thinning the spacer laterally (which would change the gate-to-S/D distance), and without leaving residue on the fin sidewalls that would block the epi. The precision required (sub-nanometre spacer control, zero recess) is one of the two places where atomic layer etching first entered production.

### Contact hole etch

The **contact** (the tungsten or cobalt plug connecting the S/D and gate to **metal 1**, the first wiring level) is a hole ~20–25 nm in diameter through 100–200 nm of oxide, an aspect ratio of ~8–10:1, landing on **titanium silicide** (a low-resistance Ti–Si compound on the S/D) or on the S/D epi. It is a dual-frequency CCP fluorocarbon etch (C4F6/C4F8 with Ar and O2) that uses the CFx polymer selectivity to stop on the thin SiN **contact etch stop layer (CESL)**, a nitride blanket over the transistors, which a separate nitride etch then opens. In the **self-aligned contact (SAC)** scheme used since the 22 nm node, a SiN cap sits on the metal gate and the contact hole is printed overlapping it; oxide-to-nitride selectivity of >20:1 opens the hole between gates while the cap protects the gate from shorting. At N3 and beyond the rate is sub-100 nm/min.

> **What can go wrong:** *Twisting*: the hole wanders off centre at depth and misses its target; seen in cross-section and as a shifted hole on the CD-SEM. *Necking and etch stop*: polymer clogs the top of the hole and the etch stops short, leaving an open contact; invisible from the top, it appears as a single-bit failure at wafer sort (the electrical test of every die before packaging), usually in the **SRAM** (static random-access memory, the six-transistor on-chip cache), whose dense contacts show opens first. *ARDE*: the smallest or isolated holes finish shallower, so the over-etch is tuned to the slowest hole and the fastest ones eat into the stop. *Bowing*: the middle of the hole widens until neighbours merge; seen in cross-section and as leakage between contacts at sort.

### The 3D NAND channel hole: the hardest etch in the industry

A 3D NAND array (Module 15) is built by depositing a stack of alternating SiO2 and Si3N4 films (the **ONON stack**), ~28–35 nm per pair, etching a vertical **channel hole** through the whole stack, lining it with the **charge-trap** layers (an insulating sandwich that stores each bit as trapped electrons) and a polysilicon channel, and later replacing the nitride with tungsten **word lines**, the horizontal conductors that address each layer of cells. As of 2024–2025 the stack is 200–300 pairs: Samsung V9 at 286 layers, SK hynix at 321 (in mass production since November 2024), Micron G9 at 276, Kioxia/SanDisk BiCS8 at 218 (332-layer BiCS10 announced February 2025, sampling 2026), YMTC at ~270–300. The pairs are built in two or three **decks**, sub-stacks each etched and filled before the next is deposited. Each deck is 4–6 µm, a full stack 8–10 µm, and the hole is ~100 nm in diameter at the top and must be within a few nanometres of that at the bottom: an aspect ratio of 60–100:1. The etch runs in a dual- or triple-frequency CCP with tens of kilowatts of low-frequency (400 kHz to 2 MHz) bias power driving ions to several keV, through a 2–3 µm amorphous or boron-doped carbon hardmask eroded at a selectivity of only ~4–8:1 (hence the thick mask and the deck-depth ceiling).

The channel hole has two siblings. The **slit** is a trench through the whole stack between rows of holes; once it is open, hot phosphoric acid flows in and dissolves every sacrificial nitride layer laterally over hundreds of nanometres, leaving gaps that are filled with tungsten word lines: the "nitride pull," an isotropic etch used on purpose. The **staircase** is the terraced edge of the stack where each word line is exposed one step per layer so that contacts of wildly different depths can land on each.

ARDE makes the rate collapse as the hole deepens (the rate at 8 µm can be half that at 1 µm). Bowing from mask faceting makes the hole wider in the middle than at the top, so neighbours merge. Twisting moves the bottom off centre by tens of nanometres. Tilting across the wafer (worse at the edge, from sheath curvature near the edge ring) misaligns the hole with the **source plate**, the conducting layer at the bottom of the stack that every channel must land on. Charging in a 60:1 insulating hole is severe, and the ion angular distribution must be within a degree or two of normal or the ions never reach the bottom. And the throughput is dreadful: at a conventional 100–150 nm/min a 10 µm hole takes 60–100 minutes of chamber time, for one step, per wafer.

> **Intuition: frost on a cold window.** At room temperature an HF molecule that lands on the wafer bounces off again in a fraction of a second, so the only reactant at the bottom of the hole is whatever an ion activated there. On a −60 °C surface the HF condenses, like breath on a cold window, into a thick reactive film that coats the bottom of the hole as readily as the top, and the ions only have to trigger a reaction that is already waiting.

The 2023–2025 breakthrough was **cryogenic dielectric etch**. Cooling the wafer to −40 to −70 °C (Lam Cryo 3.0, introduced 2024; TEL's channel-hole process, introduced 2023) changes the surface chemistry. Instead of fluorocarbon polymer, the etch uses hydrogen fluoride chemistry (TEL's is HF with PF3 as a co-reactant; Lam's is also a fluorine-hydrogen chemistry) in which HF **physisorbs**, sticks weakly without a chemical bond, onto the cold surface as a thick condensed reactive layer that would re-evaporate at room temperature. Ion bombardment then drives a reaction much like the wet HF etch (SiO2 + 4 HF → SiF4 + 2 H2O, with nitride going to SiF4 and ammonium fluoride-like products), which needs far less ion energy per atom than breaking Si–O bonds through polymer and proceeds almost as fast at the bottom of the hole as at the top, because the reactant arrives by condensation rather than by ion activation. The vendors' claims: TEL reports a 10 µm deep, high-aspect-ratio etch in 33 minutes, about 2.5 times faster than its conventional process, with an 84% reduction in **global-warming potential (GWP)**, the warming a kilogram of gas causes relative to CO2 (C4F6 and C4F8 are thousands of times worse; HF replaces ~90% of the fluorocarbon gas); Lam claims 2.5x the conventional etch rate, a profile-deviation metric below 0.1%, defined as (maximum CD − minimum CD) divided by channel depth; at 10 µm depth the 0.1% bound corresponds to 10 nm of CD variation, not 0.1% of the hole diameter, 40% less energy per wafer and up to 90% lower emissions. Cryo 3.0 is Lam's third cryogenic generation; earlier ones had processed more than five million wafers before the 2024 announcement. As of 2024–2025 SK hynix has said it will use TEL's cryogenic process for 400+ layer NAND, with TEL targeting low-volume production in 2025 and high volume in 2026; cryogenic etch is the enabler for the 400–500 layer generation and the industry's stated goal of 1,000 layers.

> **Worked example: channel-hole etch time and why it dominates NAND tool count.**
> Take a 300-pair stack etched in two decks of 5 µm each at a conventional 120 nm/min averaged over the hole. Time per deck: 5,000 nm / 120 nm/min ≈ 42 min, plus ~5 min for mask open, breakthrough, pumpdown, wafer exchange and in-situ clean: ~47 min per wafer per deck, or 60/47 ≈ 1.3 wafers per hour. At 85% utilization over a 720-hour month one chamber etches ~780 deck-passes. A 100,000 wafer-start-per-month fab needs 200,000 deck-passes, so ~260 chambers for the channel-hole etch alone; add the equally deep slit etch and the staircase contacts and the count is well over 400 chambers, on the order of 100 platforms, at $3–6 million per chamber. Switch to a cryogenic process at 2.5x the rate: 5,000 / 300 ≈ 17 min plus 5 min overhead = 22 min, 2.7 wafers/hour, ~1,650 deck-passes per month, ~120 chambers. The gain is roughly 140 chambers, about half a billion dollars of capital, in one fab, which is why a 2.5x etch rate is a headline launch and NAND makers are the largest customers of dielectric etch. A single 10 µm hole at 300 nm/min is ~33 minutes, matching TEL's claim, against ~80 minutes at ~120 nm/min; actual production rates are proprietary.

> **Why it matters downstream:** The hole's CD at the bottom sets the size of the lowest cells and how much current they pass when read; a hole that narrows toward the bottom compresses the read window of the bottom word lines and shows up as read errors at test. And the mask budget sets how many layers one deck can hold, so the deck count, with its alignment steps and yield loss, is an etch decision.

## Atomic Layer Etching and Selective Removal

As dimensions drop to a few nanometres, the question is no longer "can we etch this fast" but "can we remove exactly 1.5 nm, everywhere, and stop." Continuous etches, whose rate depends on local flux, cannot answer that. **Atomic layer etching (ALE)** can, by the same logic as ALD (Module 06): make each step **self-limiting**, meaning the reaction stops itself once the surface is covered, so the amount removed per cycle is set by surface chemistry rather than by time or flux.

> **Intuition: weaken the surface, then lift it away.** Imagine treating only the outer skin of a solid so that it becomes easier to remove, then using a removal step gentle enough to take off that altered skin while leaving the untreated material beneath. Repeat, and each cycle exposes a fresh surface for the next treatment. The crucial point is that the removed layer was part of the original solid: ALE does not merely deposit and wipe away a coating. The analogy assumes both steps stop where intended; the chemical and energy limits that make that possible are the subject of the cycle below.

### The Cl2/Ar silicon ALE cycle

The archetypal ALE, demonstrated in the 1990s (Sakaue and Horiike around 1990, Athavale and Economou in 1995–96, with earlier concepts patented by Yoder in 1988) and brought to production by Lam in 2016, has four steps:

1. **Modification (adsorption)**: expose the silicon to Cl2. Chlorine **chemisorbs**, bonding chemically to the surface one layer deep, and chlorinates the top **monolayer** (a single layer of atoms) to SiClx, but at room temperature it does not spontaneously etch silicon, so the reaction saturates once the surface is covered: doubling the dose changes nothing.
2. **Purge**: pump out the Cl2.
3. **Removal (desorption)**: bombard with Ar⁺ ions at a chosen energy. The chlorinated SiClx layer is weakly bound and comes off at ~40–70 eV; bare silicon has a sputter threshold of ~50–100 eV. In the **ALE window** between those thresholds, ions remove exactly the chlorinated layer and then stop, because unchlorinated silicon does not sputter at that energy: more ions do nothing.
4. **Purge**, then repeat.

The removal per cycle, the **etch per cycle (EPC)**, is on the order of 0.5–1 Å for Si/Cl2/Ar in practice (a bit less than one Si(100) atomic layer of 1.36 Å, because chlorination and desorption are not perfectly complete), and the total removal is EPC × number of cycles, independent of local flux. That independence is the payoff: ALE is free of ARDE and microloading (every feature gets the same number of cycles), it smooths surfaces (protrusions chlorinate more and go first), it runs at ion energies too low to amorphize the substrate, and its selectivity is set by which materials chlorinate. Its cost is throughput: a cycle takes 1–10 seconds, so 3 nm of removal is a minute or more, ten to a hundred times slower than a continuous etch; ALE therefore finishes a bulk etch rather than replacing it.

> **Worked example: atomic layers removed in an ALE recipe.**
> A nanosheet inner-spacer recipe must trim 2.5 nm of silicon from the exposed sheet tips, and the chamber is characterized at an EPC of 0.6 Å ± 0.05 Å per cycle for Cl2/Ar ALE. Cycles needed: 25 Å / 0.6 Å ≈ 42. Atomic layers removed: 25 Å / 1.36 Å per Si(100) layer ≈ 18 monolayers, about 0.44 monolayers per cycle. Uncertainty from the EPC: 42 × 0.05 Å ≈ 2 Å, i.e. 2.5 ± 0.2 nm, and because that error is systematic it can be calibrated out with a monitor wafer; the random per-cycle variation averages down as √42 ≈ 6.5, meaning errors that do not repeat from cycle to cycle largely cancel, so the total's random spread is about 6.5 times one cycle's, not 42 times. At 4 seconds per cycle the step takes ~170 seconds per wafer, against ~5 seconds for a continuous etch of 2.5 nm at 30 nm/min whose ± 10% flux-dependent variation would be ± 0.25 nm plus a few Å of dense-to-isolated difference. ALE is 30x slower and ~3x more precise, with zero microloading: the inner spacer's trade.

### Thermal ALE and isotropic ALE

Plasma ALE is directional (ions supply the removal). **Thermal ALE**, developed largely by Steven George's group at Colorado, is its isotropic cousin: for Al2O3, alternating HF (which fluorinates the surface to AlF3, self-limiting) with trimethylaluminium or Sn(acac)2 (organometallic vapours, aluminium or tin carrying organic groups) at 250–300 °C removes roughly 0.2–0.8 Å per cycle (rising steeply with temperature) with no ions at all. The second gas works by **ligand exchange**, swapping its organic groups for the fluorine in the AlF3 layer to make molecules that evaporate. Isotropic ALE is what you want for lateral recesses inside 3D structures, where directional removal is useless, such as the SiGe recesses in a gate-all-around transistor.

### Nanosheet release and the SiGe:Si selective etch

The gate-all-around nanosheet transistor (TSMC N2, Samsung SF3, Intel 18A RibbonFET; Module 11) is built from an epitaxial **superlattice**, a stack of alternating single-crystal Si and Si(1−x)Ge(x) layers (x ≈ 0.25–0.35, each ~5–10 nm thick, three or four periods). Two etches are the heart of the process, and both must remove SiGe while leaving silicon untouched, with selectivity above 100:1 and near-zero damage to the 5 nm sheets that become the channel:

**Inner spacer recess.** After the dummy gate and spacer are formed and the S/D region opened, the SiGe layers are recessed laterally by a controlled ~5–8 nm under the spacer, so that a dielectric **inner spacer** can fill the cavity and insulate the future gate, which will occupy the space between sheets, from the S/D. This is an isotropic, selective, precisely metered lateral etch on a 5 nm film, the textbook ALE application, run as cyclic radical-based processes on chambers from Lam, TEL and Applied (Selectra).

**Channel release.** After the dummy gate is removed, the SiGe between the sheets is etched away entirely, leaving suspended silicon sheets that the high-k/metal gate then wraps around. Three chemistries are used or reported: vapour-phase HCl at ~500–700 °C in an epitaxy-type chamber (HCl etches SiGe much faster than Si, more so at higher Ge fraction); remote-plasma or thermal fluorine chemistry (CF4/O2/N2 or NF3-based, where Ge–F products desorb more readily than Si–F); and wet chemistries (H2O2 with HF or acetic acid, or ammonia-peroxide, which oxidize Ge faster than Si). The failure modes are sheet bending, **stiction** (neighbouring 5 nm sheets pulled together by the surface tension of drying liquid and stuck permanently, a reason to prefer dry release), sheet thinning, and residual SiGe.

> **Why it matters downstream:** The **threshold voltage** is the gate voltage at which a transistor turns on, and in a nanosheet it depends on sheet thickness: a release that thins a 5 nm sheet by a few Å shifts that device's threshold relative to its neighbours, seen at test as mismatch. Residual SiGe means the gate cannot wrap all the way round, so part of the channel never switches off and the device leaks. Stiction is a dead device, and all three are invisible until electrical test.

### Chemical dry etch and isotropic dry etch

**Chemical dry etch (CDE)** does wet-like isotropic, selective removal with a remote (downstream) plasma, so that only long-lived radicals reach the wafer and no ions. The best-known example is the SiCoNi pre-clean (Applied's chamber; TEL's Certas is the equivalent): a downstream NF3/NH3 plasma generates NH4F that reacts with SiO2 at ~30 °C to form solid ammonium hexafluorosilicate, (NH4)2SiF6, self-limiting because the product blocks further reaction; the wafer is then heated above ~100 °C to **sublime** it (solid straight to gas). Removal is a few nanometres per cycle, selective to Si and nitride, damage-free, and used before every silicide, epi and contact fill in place of a queue-time-limited HF-last wet clean. Applied's Selectra, Lam's Selis and TEL's equivalents extend it to selective SiN, Si, SiGe and TiN removal.

## Running an Etch in Production: Endpoint, Chamber Matching, Consumables

### Endpoint detection

An etch must stop when the film is gone, not before (residue, opens) and not long after (loss of the etch stop). Timed etches drift with chamber condition, so production etches use **endpoint detection** plus a defined over-etch (typically 20–50% of the main etch time) to clear the last of the film in the slowest features.

**Optical emission spectroscopy (OES)** watches the plasma glow through a window with a spectrometer; when the film clears, the emission lines of its etch products fade and those of the material beneath appear. Three representative lines: CO at 483.5 and 519.8 nm falls as an oxide etch reaches silicon (the oxide was the oxygen source); SiF at 440 nm shifts when silicon clears; Cl at 837.6 nm rises when a chlorine etch stops consuming chlorine. Others in routine use: F at 703.7 nm, CN at 387 nm for nitride, AlCl at 261 nm for aluminium. Because a contact-hole etch may expose only 1–3% of the wafer area, the signal can be tiny, so tools use **principal component analysis (PCA)**, a statistical method that finds the combination of hundreds of wavelengths that changes most at endpoint.

**Interferometry** monitors film thickness in real time: light reflected from the film's top and from the film/substrate interface interferes, and as the film thins the intensity oscillates with a period of λ/(2n) in thickness, where λ is the wavelength and n the refractive index. For a 670 nm laser on polysilicon (n ≈ 4) one fringe is ~84 nm; on oxide (n = 1.46) ~230 nm. Counting fringes gives the remaining thickness, so interferometry can end an etch at a target *remaining* thickness (a partial recess) where OES cannot.

> **Worked example: how much over-etch.** Suppose the film clears 5% earlier at the wafer centre than at the edge (non-uniformity) and the narrowest features etch 20% slower than the wide ones that dominate the endpoint signal (ARDE). When the detector sees the average clear, the slowest feature still has roughly 5% + 20% ≈ 25% of its film left, so the recipe adds ~30% over-etch. During that 30% of main-etch time the etch stop is exposed wherever the film cleared early and loses 0.3 × film thickness / selectivity: for a 200 nm oxide contact at 20:1 to the nitride stop, 0.3 × 200 / 20 = 3 nm, which the contact flow can afford. Double the ARDE or halve the selectivity and it cannot.

### Chamber matching, seasoning, and in-situ clean

A fab's 100 chambers of a given type must produce interchangeable results, and each drifts over its own life. The **first-wafer effect** (the first wafer after a clean etches differently, because a clean wall adsorbs radicals and shifts the radical/ion ratio) is handled by **seasoning**: after every in-situ clean the chamber runs the process on a few dummy wafers, or a dedicated deposition step, to coat the walls with a controlled thin polymer or oxide so the wall chemistry is the same for every production wafer. The coating thickens with each wafer, eventually flakes into particles, and is stripped by a **waferless auto clean (WAC)** (a short O2 or SF6/O2 plasma with no wafer, every wafer or every few wafers). **Chamber matching** tunes every chamber's knobs so that its rate, uniformity, profile and CD sit within a fleet distribution, verified by monitor wafers and sensor fingerprints (OES, RF harmonics, chuck temperatures).

### Chamber materials and consumables

The chamber's own surfaces participate in the plasma. Aluminium walls are anodized or coated with **yttria** (yttrium oxide, Y2O3, a ceramic that fluorine does not attack) or yttrium fluoride, which shed fewer particles than bare Al2O3. The showerhead and upper electrode of a dielectric CCP are high-purity silicon or silicon carbide, contamination-free consumables that scavenge fluorine.

The **edge ring** (**focus ring**), a consumable ring of silicon or SiC around the wafer on the chuck, exists because the wafer edge is an electrical discontinuity: without it the sheath would bend around the edge and ions would arrive tilted over the outer 10–20 mm, wrecking uniformity and tilting NAND holes. But the ring is etched too, ~50 µm per few hundred **RF-hours** (hours with the plasma on), and as it thins the edge sheath sags. Fabs replace rings every few hundred RF-hours (a vacuum break and hours of re-qualification); the 2018–2022 generation of Lam and TEL tools can raise the ring as it erodes and swap it without breaking vacuum. Edge rings, showerheads, ESC surfaces and liners are a consumables business worth billions of dollars a year, shared between the tool OEMs and suppliers such as Hana Materials, SK Enpulse, Mitsubishi Materials and CoorsTek.

> **What can go wrong:** *First-wafer effect*: the first lot after a clean runs with a different radical/ion ratio; seen as a CD or rate step on the first wafers, fixed by seasoning. *Wall-polymer flaking*: the seasoning layer peels onto wafers as particles; seen as a jump in a chamber's particle maps, fixed by a shorter WAC interval. *Ring wear*: the edge sheath bends and ions arrive tilted; in a NAND hole the tilt misses the buried source plate, in logic the edge dies' CDs drift; detected by edge-die yield maps and edge CD-SEM, fixed by lifting or replacing the ring.

## Plasma Damage and Its Mitigation

Everything the ions and photons do that the recipe did not intend is **plasma damage**, a yield and reliability line item with four main forms.

**Charging damage.** A non-uniform plasma delivers unequal electron and ion currents to different parts of the wafer. A gate connected to a large area of metal, an **antenna**, collects the net current, whose only path to ground is through the gate oxide; the current tunnels through and leaves **traps**, defects that hold a stray electron and shift the switching voltage, or breaks the oxide. Magnitude: **antenna rules** in the design software limit the ratio of antenna area to gate area to ~hundreds:1 before a protective diode must be added. Detection: **antenna test structures**, gates wired to antennas of various ratios, are measured on every lot by **capacitance-voltage (C-V) shift** (trapped charge slides the capacitance curve sideways) and **time-dependent dielectric breakdown (TDDB)** (hold the oxide at a stress voltage and time its failure). Fix: plasma uniformity, pulsing, low-bias over-etch steps, and the diodes.

**Ion bombardment damage.** Ions of a few hundred eV amorphize and implant the top 1–5 nm of silicon, leaving a defective, sometimes fluorine- or bromine-contaminated layer on the S/D silicon after a spacer etch and on the fin sidewall after a fin etch. Detection: cross-section electron microscopy, and defects in epi grown on it. Fix: a low-energy final step, ALE, or a sacrificial oxidation and strip that consumes the damaged layer.

**Photon damage.** Plasmas emit **vacuum-ultraviolet (VUV)** light, wavelengths too short to pass through air (argon lines at 104.8 and 106.7 nm, ~12 eV per photon, and hydrogen Lyman-α at 121.6 nm, ~10 eV), and 10–12 eV photons create traps in SiO2 and high-k gate dielectrics. Detection: C-V and threshold-voltage shift on exposed versus shielded transistors. Fix: low-electron-temperature sources (TEL's RLSA), pulsing, and a post-etch anneal.

**Low-k damage.** **Low-k** dielectrics are the porous, carbon-containing insulators between wires (SiOCH, Module 12), chosen because a low dielectric constant k means less capacitance between wires. O2, N2 or H-containing plasmas strip the carbon from the pores, leaving a **hydrophilic** (water-attracting), higher-k, HF-soluble skin. Detection: a short dilute-HF dip dissolves the damaged skin so its depth can be read in cross-section. Fix: non-oxidizing strip chemistries, low-energy trench etch, and **silylation** repair, a vapour treatment that re-attaches carbon groups.

**Residues** (fluorocarbon polymer, chlorine on aluminium, sputtered chamber metal) are handled by post-etch wet cleans (Module 04). Driven by all of the above, the direction of the last decade is toward lower ion energy, pulsed plasmas, ALE endpoints and radical-based removals: doing the last few nanometres gently, because that is where the transistor lives.

> **What can go wrong:** A gate tied to a metal line above the antenna limit carries an oxide weakened by charging during a metal etch; it passes wafer sort, survives burn-in (the pre-shipment stress test), ships, and fails months later in the field as a stuck bit or leaky transistor. That is why antenna rules are enforced in design and checked on every lot.

> **Why it matters downstream:** The amorphous, halogen-contaminated skin on a fin sidewall degrades the S/D epi grown on it (Module 10) and lowers carrier mobility in the channel (Module 11), so a fin etch that looks perfect in cross-section can cost drive current. Low-k damage raises the capacitance between wires and with it the RC delay of the interconnect (Module 12): a slower chip.

## Tools, Vendors, and the Market

### The platforms and product lines

A leading-edge etch platform is a vacuum hub with a wafer-handling robot in the middle and 4–6 process chambers around it; wafers enter through two or more **load locks** (small chambers that pump down from air to vacuum so the hub never sees air) from an atmospheric front end with FOUP load ports (Module 05). The platform costs on the order of $15–25 million and a chamber $3–6 million (cryogenic dielectric chambers at the top); throughput ranges from ~1–3 wafers per hour (NAND channel hole) to 30–60 for a shallow conductor etch.

**Lam Research** (Fremont, California) is the largest etch company. **Kiyo** is its ICP conductor etch chamber (gate, fin, spacer, hardmask, metal); **Flex** its dual-frequency CCP dielectric chamber (contact, via, trench, NAND holes); **Sense.i** (2020) a higher-density platform with sensor-driven control; **Syndion** its TSV etcher; and Cryo 3.0 its cryogenic dielectric technology. Lam leads in conductor etch and memory dielectric etch and introduced the first production ALE.

**Tokyo Electron** (Tokyo) sells etch on the **Tactras** platform, with **Vigus** dual-frequency CCP chambers for dielectric etch and RLSA and ICP chambers for conductor etch, plus the **Episode UL** platform (launched 2020, up to 12 chambers) that carries the cryogenic channel-hole etch. TEL is historically strongest in dielectric etch at Japanese and Korean memory makers, and its 2023 cryogenic process was the first announced.

**Applied Materials** (Santa Clara) sells the **Centris Sym3** dielectric etch chamber (a symmetric CCP introduced in 2016 to re-enter a market it had lost), conductor etch on the **Centura** platform, and the **Selectra** and SiCoNi radical-based selective and pre-clean chambers; it is strongest in DRAM (main-memory chips) and selective removal, third overall by most estimates.

**Hitachi High-Tech** (Japan) holds a niche in ECR/microwave conductor etch (gate, fin), a few percent of the market; long counted the fourth etch vendor, it has probably been overtaken by AMEC (~$1 billion of etch revenue) as of 2024–2025, though estimates differ.

**AMEC** (Advanced Micro-Fabrication Equipment, Shanghai) makes the **Primo** family of CCP dielectric and ICP conductor etchers, including TSV etch systems. **NAURA** (Beijing) also supplies semiconductor etch equipment within a broader process-tool portfolio. Those product categories correspond to the different plasma and material-removal problems explained in this module. Qualification is specific to a tool, recipe, layer and customer; it cannot be inferred for every fab from the supplier’s nationality or from one successful installation. Commercially available subsystems can support tool development, but integrating stable plasma control, uniformity, low defect counts and reliable operation remains substantial engineering work.

### Market shares and economics

The etch equipment market was roughly $20–25 billion in 2024 (about 20% of WFE), rising in 2025–2026 with the NAND layer race and the ramp of **gate-all-around (GAA)** transistors, whose gate wraps fully around each nanosheet channel. Market-share estimates depend on how the segment is defined and sources disagree: the most-cited rankings put Lam first at roughly 40–45%, TEL second at ~25%, and Applied third at ~18–20%, while at least one 2024–2025 report ranks Applied first at ~30% by including its selective-removal tools. Treat any single number as ± 5 points; the top three hold ~85–90% between them.

> **Worked example: etch chambers in a logic gigafab.**
> A 100,000 wafer-start-per-month N3-class logic fab: ~250 etch and strip chamber visits per wafer, 3 minutes average chamber time including exchange, 80% availability. Wafer-etch-steps per month: 100,000 × 250 = 25 million. Capacity per chamber: (60/3) × 720 h × 0.8 ≈ 11,500 per month. Chambers: 25,000,000 / 11,500 ≈ 2,200, on ~500 platforms, on the order of $6–8 billion of the fab's ~$25–30 billion equipment bill. This is why etch and deposition each rival lithography as the largest equipment categories in a logic fab (industry-wide each is roughly a fifth to a quarter of WFE, the ranking shifting with the memory/logic mix), even though a single EUV scanner is the most expensive machine on the floor.

### The trend: more steps, each removing less

The etch step count has grown faster than the total step count: SAQP turned one fin-patterning etch into ~6 at N7, and the 3D transistor (spacer, inner spacer, release, recess, cut) added more. At N2 and **A16** (TSMC's 1.6 nm-class node) with **backside power delivery** (power wires moved to the back of the thinned wafer, Module 11), the wafer is also thinned, flipped and etched from the back. The direction is more steps, each removing less: ALE and selective removal have grown from research curiosities in 2014 into a multi-billion-dollar sub-segment, the fastest-growing part of etch.

## Summary

- Etch transfers the resist stencil into real materials; the whole field is a compromise between selective-but-isotropic chemistry and directional-but-unselective ion bombardment.
- Wet etch gives 100:1 to 1,000:1 selectivity cheaply but undercuts by the film thickness, so it cannot pattern features smaller than ~2x the film; it survives for blanket strips and deliberate undercuts.
- A plasma is a gas with ~1 in 10⁴ to 10⁶ molecules ionized; electrons sit at 2–5 eV while ions and wafer stay near room temperature.
- Every surface grows a sheath; ions fall through it perpendicular to the wafer, which is where directionality comes from; DC self-bias sets their energy from ~20 eV to several keV.
- Coburn and Winters: radicals alone ~5 Å/min, ions alone ~2 Å/min, together ~55 Å/min; ions enable the chemistry where they land.
- Vertical walls need a passivant: CFx polymer for oxide, SiOxBry for silicon, condensed HF at −60 °C in cryogenic etch.
- Fluorocarbon selectivity is a polymer-thickness switch: oxygen from the oxide burns the film thin, while silicon and nitride let it thicken until the etch stops.
- High frequency makes ion flux, low frequency makes ion energy; dual-frequency CCP for dielectrics, ICP with a separate bias for conductors.
- Leading-edge etches are hardmask transfers down a ladder of stencils; mask erosion, faceting and roughness are part of the CD budget.
- The 3D NAND channel hole (aspect ratio 60–100:1, 10 µm deep, ~an hour per wafer) is the hardest etch; cryogenic HF chemistry cut its time ~2.5x and halves the chamber count.
- ALE removes a fixed fraction of a monolayer per self-limiting cycle, free of loading and ARDE, at 10–100x lower throughput; it does the last nanometres.
- Production etch is endpoint plus over-etch, seasoning, chamber matching and edge rings; damage (charging, ion, VUV, low-k) pushes everything toward lower energy and pulsing.
- Lam, TEL and Applied hold ~85–90% of a ~$20–25 B market; AMEC and Naura are the fastest-rising entrants.

## Key Numbers

| Quantity | Value | Why it matters |
|---|---|---|
| Plasma RF frequencies | 13.56 MHz (ISM band); density sources 27–100 MHz; bias 400 kHz to 2 MHz | High frequency sets flux, low sets energy |
| Electron temperature | 2–5 eV (~30,000–60,000 K); ions and neutrals near 300–500 K | Hot electrons, cold wafer |
| Ion density | 10⁹–10¹⁰ cm⁻³ (CCP); 10¹¹–10¹² cm⁻³ (ICP) | Sets ion flux and the raw etch-rate budget |
| Ion energy at wafer | ~40–70 eV (ALE removal step) to several keV (NAND channel hole) | Energy buys anisotropy at the cost of selectivity and damage |
| Coburn and Winters (1979) | XeF2 alone ~5 Å/min; Ar⁺ alone ~2 Å/min; together ~55 Å/min | The synergy behind plasma etching |
| 49% HF on thermal SiO2 | ~2 µm/min; 6:1 BOE ~100 nm/min; 100:1 DHF ~2–3 nm/min | DHF is the range for 1 nm-scale recesses and cleans |
| Hot H3PO4 nitride etch | 85% acid at ~160 °C; Si3N4 ~4–6 nm/min; SiO2 0.1–0.5 nm/min | A widely used selective wet nitride strip; enables the NAND nitride pull |
| KOH on Si(100) | ~1 µm/min at 80 °C; (100):(111) ratio 30–400:1; (111) sidewall at 54.74° | Crystal-plane selectivity gives wet etch a rare anisotropy |
| Isotropic undercut rule | Opening near the surface ≈ w + 2t; protected line near the surface ≈ w − 2t in the simple model | Why wet etch stopped patterning |
| Gate over-etch budget (HBr/O2 soft landing) | >100:1 poly:SiO2; ~100 nm of poly cleared at 100:1 consumes ~1 nm of a 2 nm dielectric, 30:1 would consume 3.3 nm | Lets a gate land on a 1–2 nm dielectric |
| Bosch process | ~5–30 µm/min average in production (lower for narrow TSVs); per-cycle bite and scallop period ~0.1–1 µm; aspect ratio 30–50:1 | The etch behind TSVs and MEMS |
| Si ALE (Cl2/Ar) | ~0.5–1 Å per cycle; Ar⁺ window ~40–70 eV; Si(100) monolayer 1.36 Å | Removal counted in cycles, independent of flux |
| 3D NAND channel hole | ~100 nm diameter, 8–10 µm deep, aspect ratio 60–100:1, 200–320 layers, 2–3 decks (as of 2024–2025) | The hardest etch |
| Cryogenic channel-hole etch | −40 to −70 °C; TEL: 10 µm in 33 min (~2.5x conventional, 84% lower GWP); Lam Cryo 3.0: 2.5x rate, <0.1% depth-normalized profile deviation: (CDmax−CDmin)/depth | Roughly halves the chamber count |
| Oxide:carbon hardmask selectivity in the channel-hole etch | ~4–10:1; mask 2–3 µm thick | Sets the maximum deck depth |
| Etch equipment market (2024) | ~$20–25 B, ~20% of WFE; Lam ~40–45%, TEL ~25%, Applied ~18–20% (sources differ) | One of the three largest categories |
| Chamber cost | ~$3–6 M per chamber; ~$15–25 M per 4–6 chamber platform | A 2.5x rate gain is worth hundreds of millions per fab |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Lam Research | USA | Kiyo (ICP conductor), Flex (CCP dielectric), Sense.i, Syndion (TSV), Coronus (bevel), Cryo 3.0, first production ALE; wet clean | Leader (~40–45% of etch) |
| Tokyo Electron (TEL) | Japan | Tactras platform with Vigus CCP and RLSA/ICP chambers; Episode UL cryogenic channel-hole etch; Certas CDE; wet benches | #2 (~25%); strong in dielectric and memory |
| Applied Materials | USA | Centris Sym3 (dielectric), Centura conductor etch, Selectra and SiCoNi selective/radical removal, APF carbon hardmask | #3 (~18–20%); leader in selective removal |
| AMEC | China | Primo CCP dielectric and ICP conductor etchers; TSV etch | Etch-equipment supplier with application-specific product lines |
| Hitachi High-Tech | Japan | ECR/microwave conductor etchers (gate, fin) | Niche (~few %); fourth or fifth by revenue |
| NAURA | China | Semiconductor etch and related process equipment | Product and layer qualification determine application |
| SCREEN | Japan | Single-wafer (SU-3300) and batch (FC-3100) wet etch/clean | Leader in wet (~40–50%) |
| SEMES | Korea | Wet etch/clean and strip, Samsung affiliate | #3–4 in wet |
| KLA (SPTS) | USA / UK | Deep silicon (Bosch) etch for MEMS, TSV, photonics | Leader in MEMS deep etch |
| Mattson, PSK, ULVAC | China (formerly USA) / Korea / Japan | Photoresist strip (ash) | PSK and Mattson lead strip |
| Hana Materials, SK Enpulse, Mitsubishi Materials, CoorsTek, Ferrotec | Korea / Japan / USA; Ferrotec has Japan/China operations | Si, SiC and ceramic consumables: edge rings, showerheads, liners | Consumables suppliers |
| Robert Bosch GmbH | Germany | Originator and licensor of the Bosch deep-etch process | IP holder |

## Common Misconceptions

- **"Plasma etching is hot."** → The electrons are at tens of thousands of kelvin, but the gas, ions and wafer are near room temperature (or −70 °C in cryogenic etch); the energy is delivered by directed ions and reactive radicals, not by heat.
- **"Ions do the etching."** → Ions alone sputter at ~2 Å/min and radicals alone etch at ~5 Å/min, but together they etch at ~55 Å/min; chemistry provides rate and selectivity, ions provide direction.
- **"Anisotropy comes from the ions being vertical."** → Necessary but not sufficient. Most chemistries attack sidewalls spontaneously; vertical profiles come from an engineered passivation layer (CFx polymer, SiOxBry, or a condensed cryogenic layer) that ions clear from the bottom but not the walls.
- **"Wet etch is obsolete."** → Wet etch is the only cheap route to 100:1 to 1,000:1 selectivity, and the NAND nitride pull, hardmask strips and every pre-clean depend on it. What is obsolete is wet *patterning*, defeated by undercut once features shrank below about twice the film thickness.
- **"Etch rate is a property of the recipe."** → It is a property of the recipe *and* the wafer *and* the chamber. Loading, microloading and ARDE make the same recipe etch a dense narrow hole at half the rate of an open area, and wall condition shifts the radical/ion ratio from wafer to wafer; hence endpoint, over-etch, seasoning, chamber matching, and flux-independent ALE.
- **"Copper interconnects are etched."** → Copper has no volatile etch product at practical temperatures, which is why the BEOL switched to damascene (etch the dielectric, fill with copper, polish) in 1997; aluminium and tungsten can be patterned subtractively. Copper wet seed-layer etching is used in packaging, and advanced ruthenium patterning can also be subtractive; the limitation here concerns conventional fine-pitch copper BEOL plasma etching.
- **"ALE removes exactly one atomic layer per cycle."** → For Si/Cl2/Ar it removes ~0.5–1 Å, about 0.4–0.7 of a Si(100) layer, because chlorination and desorption do not each cover exactly one layer. What ALE guarantees is the same amount every cycle and everywhere on the wafer, not one layer.
- **"More RF power always etches faster."** → More power raises ion energy and damage as well as flux, and in a fluorocarbon etch more source power can thicken the polymer until narrow holes etch-stop. Rate is set by the radical-to-ion balance and ion energy together.

## Where This Fits in the Supply Chain

Etch consumes the patterned resist and hardmask stacks from lithography (Modules 07 and 08), the films from oxidation, CVD, ALD and sputter deposition (Module 06), the specialty gases (NF3, SF6, C4F8, C4F6, HBr, Cl2, BCl3, HF) and wet chemicals (HF, NH4F, H3PO4, KOH, TMAH, H2SO4, H2O2) from Module 04, and silicon, SiC and ceramic consumables. Its outputs go to ion implantation and anneal (Module 10), where the silicon is doped through the openings etch created, and then round the deposition-litho-etch loop several hundred times until the transistor (Module 11) and interconnect stack (Module 12) are complete. Each etch step is followed by metrology (Module 13) to measure CD and profile and to catch the opens, shorts, residues and particles that etch is the single largest source of.

## Further Reading

1. M. A. Lieberman and A. J. Lichtenberg, *Principles of Plasma Discharges and Materials Processing*, 2nd ed., Wiley, 2005. The standard graduate text on sheaths, CCP, ICP and etch physics.
2. J. W. Coburn and H. F. Winters, "Ion- and electron-assisted gas-surface chemistry: An important effect in plasma etching," *Journal of Applied Physics* 50, 3189 (1979). The synergy experiment.
3. V. M. Donnelly and A. Kornblit, "Plasma etching: Yesterday, today, and tomorrow," *Journal of Vacuum Science and Technology A* 31, 050825 (2013). The best single review of etch chemistry and mechanisms.
4. K. J. Kanarik et al., "Overview of atomic layer etching in the semiconductor industry," *Journal of Vacuum Science and Technology A* 33, 020802 (2015). Lam's ALE review, including the Cl2/Ar Si window.
5. S. M. George, "Mechanisms of Thermal Atomic Layer Etching," *Accounts of Chemical Research* 53, 1151 (2020). Thermal and isotropic ALE.
6. F. Laermer and A. Schilp, "Method of anisotropically etching silicon," US Patent 5,501,893 (1996). The Bosch process patent.
7. Tokyo Electron, "Tokyo Electron Develops Memory Channel Hole Etch Technology That Enables Ultra-fast 10-µm-deep Etching for 3D NAND Flash with Over 400 Layers," press release, June 2023 (tel.com), and the IEEE VLSI 2023 paper "Beyond 10 μm Depth Ultra-High Speed Etch Process with 84% Lower Carbon Footprint for Memory Channel Hole of 3D NAND Flash over 400 Layers."
8. Lam Research, "Lam Research Introduces Lam Cryo 3.0 Cryogenic Etch Technology," press release, July 2024, and the Lam newsroom blog "The Road to 1,000 Layer 3D NAND."
9. Semiconductor Engineering, "Cryogenic Etch: A Key Enabler of 3D NAND" and its knowledge-center articles on atomic layer etching and high-aspect-ratio etch (semiengineering.com).
10. K. R. Williams, K. Gupta and M. Wasilik, "Etch rates for micromachining processing, Part II," *Journal of Microelectromechanical Systems* 12, 761 (2003). The reference table of wet and dry etch rates for dozens of materials and etchants.

- [AMEC 2024 ESG report: CCP, ICP and TSV product families](https://www.amec-inc.com/uploads/files/20250611/17496080859885.pdf). Official product scope, reviewed September 2026.

- [NAURA semiconductor process-equipment catalogue](https://www.naura.com/product/). Official product scope, reviewed September 2026.
