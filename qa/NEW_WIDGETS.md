# New widgets (wave 2)

Each entry: id · module · title · what it must teach · required elements. All follow site/WIDGET_SPEC.md
and qa/WIDGET_QA_STANDARD.md. Read the named module section for the physics and numbers.

## fab-anatomy · 05 · "Anatomy of a Fab Building"
A labelled cross-section of a 300 mm fab: fan deck with FFU/ULPA filters, cleanroom ballroom with tools and OHT rail overhead, perforated raised floor, sub-fab with vacuum pumps, gas cabinets, scrubbers, chillers and the waffle slab; utilities (UPW, bulk gases, power) feeding in. Animated laminar airflow (down through the ballroom, back up the return plenum). Hover every part for its role. An ISO-class explorer: a slider from ISO 1 to ISO 8 shows allowed particles ≥0.1/0.5 µm per m³ (ISO 14644-1 formula), with an office and outdoor air for comparison. First frame shows the full annotated building.

## amhs-sim · 05 · "Wafers in Motion: the AMHS"
A top-down schematic of a fab bay layout (litho, etch, deposition, CMP, implant, metrology bays) with an OHT rail loop; FOUPs animate along the rail and queue at tools. Sliders: wafer starts per month, tool utilization (60–98%), a "hot lot" toggle. Readouts: WIP (Little's law: WIP = starts × cycle time), average queue per tool, cycle time multiplier from a Kingman-style approximation (show the formula, label it as an approximation). Make the point visually: as utilization approaches 100% queues explode.

## mosfet-iv · 11 · "How a Transistor Switches"
Left: cross-section of a MOSFET (source, drain, gate, oxide, channel, body) whose depletion region and inversion layer respond to a gate-voltage slider; electrons animate from source to drain when on. Right: two live plots: I_D vs V_G on a log scale (shows threshold voltage and subthreshold swing) and I_D vs V_D (linear/saturation). Sliders: V_T (0.2–0.6 V), subthreshold swing (60–100 mV/dec), DIBL (0–150 mV/V), V_D. Readouts: I_on/I_off ratio, the 60 mV/dec limit explained (kT/q·ln10 at 300 K). A select for planar / FinFET / GAA that sets typical SS and DIBL values to show why more gates around the channel helps.

## moores-law · 11 · "Transistor Counts, 1971 to Now"
A log-scale scatter of transistor count vs year for ~30 real chips (Intel 4004 2,300; 8080; 8086 29k; 286; 386 275k; 486 1.2M; Pentium 3.1M; Pentium 4 42M; Core 2 Duo 291M; Nehalem 731M; Sandy Bridge 1.16B; Apple A7 1B; A12 6.9B; A15 15B; M1 16B; M1 Ultra 114B; AMD Epyc Rome 39.5B; NVIDIA GV100 21.1B; A100 54.2B; H100 80B; B200 208B; Cerebras WSE-2 2.6T (mark as wafer-scale); plus a doubling-every-two-years reference line. Hover for the chip, its process node and die area. Toggle a second axis series: cost per transistor (relative) flattening after ~28 nm, and clock frequency plateau after 2005 (Dennard's end) — label as approximate.

## resist-chemistry · 07 · "Inside a Chemically Amplified Resist"
Animated molecular cartoon of a resist film: polymer chains with protecting groups, PAG molecules. Steps: exposure (photons hit PAGs in the exposed region, producing acid), post-exposure bake (acid diffuses and catalytically removes protecting groups, each acid doing many deprotections; a PEB time/temperature slider shows the diffusion blur growing), develop (deprotected region dissolves in TMAH for positive tone; NTD toggle inverts). Readouts: catalytic chain length, acid diffusion length ≈ √(2Dt), resulting line-edge blur; explain the RLS trade-off in one line.

## litho-track · 07 · "The Litho Track, Step by Step"
Step-through of the coat–expose–develop cell: HMDS prime, spin coat (with a spin-speed → thickness calculator, t ∝ 1/√rpm, viscosity select), edge-bead removal, soft bake, exposure (hand-off to the scanner), post-exposure bake, puddle develop, rinse/dry, inspection. A wafer cross-section shows the resist stack (BARC/underlayer, resist, topcoat) building and the pattern appearing. Name the tool (TEL Lithius Pro, SCREEN) and typical times per step; throughput readout.

## bragg-mirror · 08 · "Why Mo/Si Mirrors Reflect EUV"
Compute and plot reflectance vs wavelength (12–15 nm) for a Mo/Si multilayer using the transfer-matrix method with constant optical constants near 13.5 nm (Mo: n ≈ 0.9238, k ≈ 0.00643; Si: n ≈ 0.9999, k ≈ 0.0018; vacuum above, Si substrate). Sliders: number of bilayers (10–80), period d (6.5–7.5 nm), Mo fraction Γ (0.3–0.5), angle of incidence (0–20°). Readouts: peak reflectance (~0.7 max), peak wavelength (Bragg: λ ≈ 2d·cosθ corrected for n), FWHM. A side schematic of the stack with the standing wave. State that real interdiffusion lowers R.

## plasma-reactor · 09 · "Inside a Plasma Etch Chamber"
Cross-section of a capacitively coupled chamber: showerhead top electrode, wafer on a chuck with RF bias, plasma glow, the dark sheaths at both electrodes. Animated ions accelerating across the wafer sheath (vertical), radicals wandering (isotropic). Sliders: bias power (sets sheath voltage → ion energy), pressure (sets mean free path → ion angular spread; show formula λ ≈ kT/(√2·π·d²·p) with numbers), source (ICP) power (sets ion flux). Readouts: ion energy (eV), flux, mean free path vs sheath thickness (when λ < sheath, ions scatter and anisotropy is lost). Toggle CCP/ICP.

## implanter-beamline · 10 · "Ion Implanter Beamline"
Labelled top-down schematic: ion source (gas in), extraction electrode, analyzer magnet, mass-resolving slit, acceleration column, scanner, end station with wafer on a platen (tilt shown). Animate ions along the path. Select species (¹¹B⁺, ⁴⁹BF₂⁺, ³¹P⁺, ⁷⁵As⁺, ⁷⁴Ge⁺) and extraction voltage; compute the magnet field needed to bend that ion around the analyzer radius (r = (1/B)√(2mV/q)); show that neighbouring masses are rejected at the slit. Readouts: final energy after acceleration, dose time for a wafer at a given beam current (Q = I·t / (q·A)).

## cmp-planarize · 12 · "Chemical Mechanical Planarization"
Animation of a rotating platen with pad and slurry, a carrier pressing the wafer face-down, conditioner arm. Below, a cross-section of a bumpy copper overburden being planarized over time; when it reaches the barrier the copper in wide lines dishes and dense arrays erode. Sliders: down-force, platen speed (Preston: RR = K·p·v, show numbers), pattern density and line width (control dishing/erosion depth). Readouts: removal rate (nm/min), time to clear, dishing (nm). Explain endpoint detection in a caption.

## dram-cell · 15 · "A DRAM Bit: Store, Read, Refresh"
Schematic of a 1T1C cell on a bitline with a sense amplifier. Buttons: Write 1, Write 0, Read, Refresh, and a Play that runs a timeline. Animate charge on the capacitor, the wordline turning the access transistor on, charge-sharing with the (much larger) bitline capacitance, and the sense amp resolving ΔV. Sliders: cell capacitance (10–30 fF), bitline capacitance (50–150 fF), leakage (sets how fast a stored 1 decays; retention timer to the 64 ms refresh requirement). Readouts: ΔV = V_DD/2 · C_cell/(C_cell + C_BL), retention time, why the capacitor must be tall (aspect ratio for the capacitance at a 30–40 nm footprint).

## nand-3d-build · 15 · "Building 3D NAND"
Step-through cross-section: alternating oxide/nitride stack deposition (N pairs), channel-hole etch (aspect ratio readout), ONO + polysilicon channel deposition inside the hole, staircase etch for word-line contacts, slit etch, nitride removal, tungsten word-line fill, then string-stacking a second deck. Slider: layers per deck (32–256) → total layers, stack height (µm at ~40–45 nm pitch), hole aspect ratio, etch time at a given rate. Name Samsung/SK hynix/Micron/Kioxia/YMTC layer counts from the module.

## wafer-sort-sim · 14 · "Wafer Sort: Probing Every Die"
Animated wafer map: a probe card (1, 4, 8 or 16 sites) steps across the wafer; each touchdown tests its dies and colors them by bin (pass / speed bin / fail) from a yield model. Sliders: D0, die area, test time per touchdown, sites. Readouts: touchdowns, total test time, tester cost for the wafer (from $/s), yield, bin histogram. Show the "rule of ten" caption.

## hybrid-bond · 17 · "Hybrid Bonding, Step by Step"
Step-through cross-section of two dies with Cu pads in SiO₂: CMP (pads slightly recessed), plasma activation, alignment (readout of alignment error), room-temperature oxide-to-oxide bond, anneal at 200–300 °C where copper expands to close the recess and bond Cu–Cu. Slider: pad pitch (10 → 1 µm) with connections/mm² readout vs microbumps at 40 µm. A "particle" toggle drops a 1 µm particle at the interface and shows the void it creates (hundreds of µm wide), to explain the cleanliness requirement.

## nvlink-topology · 19 · "The NVL72 as a Network"
Graph view: 72 GPUs (18 trays × 4) and 18 NVSwitch chips (9 trays × 2), every GPU connected to every switch tray; hover a GPU highlights its 18 NVLink 5 ports (1.8 TB/s total) and the path to any other GPU (one switch hop). Toggle to compare an 8-GPU HGX (4 NVSwitch) and a two-rack NVL144 (label as roadmap). Readouts: aggregate bandwidth (130 TB/s), copper cable count (~5,000), bisection bandwidth. Simple, clean, no physics.

## heat-path · 19 · "Where 1,000 Watts Go"
Thermal-resistance ladder from a GPU die to the facility: junction → TIM1 → lid → TIM2 → cold plate → coolant loop → CDU heat exchanger → facility water. Slider: GPU power (400–1,400 W), coolant inlet temperature, flow rate; each layer has a typical thermal resistance (K/W) and the widget shows temperature at every node, flagging when junction exceeds ~85–90 °C. Toggle air cooling (heatsink + fan, higher resistance) vs liquid to show why NVL72 must be liquid-cooled. Show ΔT = P·R and the sum along the path.

## export-timeline · 20 · "Export Controls, 2018 to 2026"
An interactive horizontal timeline with clickable events (Huawei entity listing 2019; Oct 7 2022 rules; Oct 2023 update; Dutch/Japanese tool restrictions; Dec 2024 HBM/tool rules; Jan 2025 AI diffusion rule and its May 2025 rescission; H20 ban and licence deal 2025; later 2025–2026 items from the module, flagged "as of"). Clicking an event shows what was restricted (chips, tools, nodes), who it targeted, and the workaround products (A800/H800/H20). Color code: US / allies / China responses. Text from module 20 only.

## glossary-flashcards · 21 · "Glossary Flashcards"
Reads the glossary from window.COURSE (module 21 html: list items whose first <strong> is the term) at mount time and builds a flashcard trainer: shows a term, reveal the definition, mark "knew it / didn't"; filter by letter or by module number; progress stored in localStorage under key "s2g:flash". Also a "quiz me" mode: definition shown, pick the term from 4 options. Handle the case where the glossary is missing gracefully.
