# Module 05: Inside a Leading-Edge Fab

A leading-edge logic fab has to do something no other factory does: run every one of ~100,000 wafers per month through 1,000–1,500 sequential process steps, on tools that cost more than airliners, in an environment where a single 15 nm particle in the wrong place kills a die worth hundreds of dollars, 24 hours a day, 365 days a year, because the $20–30 billion asset loses value at roughly $10 million per day whether or not it is running. This module is about the *factory* rather than any single process: the building, the air, the boxes the wafers ride in, the robots that move them, the software that decides what runs where, the people, the utilities, and the economics that make all of it non-negotiable. The previous modules delivered a polished 300 mm wafer and the consumables; here that wafer becomes a manufacturing object, one of 25 in a lot routed through a re-entrant flow for ~3 months.

## The Building: Why a Fab Is a Vertical Sandwich

A modern 300 mm fab is not a big shed with a cleanroom in it. It is a purpose-built, vertically layered structure in which each level exists to serve the cleanroom level above or below it. From top to bottom, a typical leading-edge fab (TSMC's GigaFab phases, Intel's Ocotillo fabs, Samsung's Pyeongtaek lines all follow the same logic) has:

1. **Fan deck / air-handling level.** The top floor houses the **make-up air units (MAUs)** that take in outside air, filter it, dehumidify or humidify it, cool it, and chemically scrub it, plus the supply plenum that feeds the cleanroom ceiling. Recirculation fans (or, in most modern fabs, the ceiling-mounted fan-filter units themselves) push air down into the cleanroom.
2. **Interstitial / ceiling plenum.** Between the fan deck and the cleanroom ceiling is a service space where ducting, sprinkler mains, cable trays, and the **OHT (overhead hoist transport)** rail supports run. The cleanroom ceiling itself is a grid of **fan-filter units (FFUs)** and blank panels hung from this structure.
3. **Cleanroom level.** The production floor: the **ballroom** (one large open cleanroom, as opposed to the older "bay-and-chase" layout of narrow tool bays separated by service corridors) where the process tools stand on a **raised perforated floor**. A single GigaFab phase has on the order of 40,000–50,000 m² of cleanroom; a full multi-phase GigaFab is well over 100,000 m².
4. **Waffle slab.** The cleanroom floor is not a normal concrete slab; it is a **waffle slab**: a 1–1.5 m thick grid of concrete ribs with square openings, typically supported on a dense column grid, isolated structurally from the outer building shell. The openings let return air fall through into the sub-fab and give a place to pass pipes, cables, and exhaust ducts to each tool. Its thickness and stiffness are what give the floor its vibration performance.
5. **Sub-fab.** Directly beneath the cleanroom, at ISO 7–8, sits the "dirty half" of every tool: vacuum pumps, RF generators and match networks, chillers, gas cabinets and **valve manifold boxes (VMBs)**, chemical delivery cabinets, point-of-use abatement, and power distribution. Every process chamber upstairs has a rack of equipment downstairs connected through the waffle slab.
6. **Utility level(s) / basement.** Bulk gas distribution, the **ultrapure water (UPW)** plant, waste treatment, exhaust scrubbers, switchgear and transformers, chiller plants, and the **air separation unit (ASU)** for on-site nitrogen (usually built and operated by Linde, Air Liquide, or Air Products on the fab site).

### Vibration: why the slab matters

An ArF immersion scanner positions a wafer stage to within ~1 nm and an EUV scanner must hold overlay in the ~1–2 nm range. Floor vibration is expressed as velocity in one-third octave bands; the industry uses the **VC (vibration criterion) curves**: VC-A = 50 µm/s, VC-C = 12.5 µm/s, VC-D = 6.25 µm/s, VC-E = 3.1 µm/s. Lithography and e-beam metrology areas are designed to VC-D or VC-E, which corresponds to displacements of a fraction of a micrometer at low frequencies. The waffle slab achieves this in three ways: mass (a thick slab has low response to a given force), stiffness (the closely spaced columns push the slab's natural frequencies above the ~10–30 Hz band where tools are most sensitive), and isolation (the slab is separated from the building shell and from the sub-fab floor so that footfalls, OHT vehicles, and pumps transmit little energy into it). Scanners additionally sit on their own active pneumatic isolation frames. Fabs are sited away from railways and highways for the same reason, and heavy rotating equipment in the sub-fab sits on its own isolated pads.

## Cleanroom Classes and Airflow

### ISO 14644 classes

Cleanroom cleanliness is specified by **ISO 14644-1**, which defines the maximum permitted number of airborne particles per cubic meter at a given size. The class number N is the exponent: an ISO class N room may contain at most 10^N particles ≥ 0.1 µm per m³, with the limit at other sizes following C = 10^N × (0.1 / D)^2.08 where D is the particle diameter in micrometers.

| ISO class | ≥ 0.1 µm per m³ | ≥ 0.5 µm per m³ | Old FED-STD-209E name | Where in the fab |
|---|---|---|---|---|
| ISO 1 | 10 | (not specified) | (none) | Inside EUV scanner, wafer-handling mini-environments |
| ISO 2 | 100 | 4 | (none) | EFEM / mini-environments |
| ISO 3 | 1,000 | 35 | Class 1 | Mini-environments, litho tracks |
| ISO 4 | 10,000 | 352 | Class 10 | Litho bay ballroom (some fabs) |
| ISO 5 | 100,000 | 3,520 | Class 100 | Ballroom in a FOUP-based fab |
| ISO 6 | 1,000,000 | 35,200 | Class 1,000 | Ballroom / less critical areas |
| ISO 7 | (not specified) | 352,000 | Class 10,000 | Sub-fab, gowning rooms |
| ISO 8 | (not specified) | 3,520,000 | Class 100,000 | Sub-fab, utility areas |
| ISO 9 | (not specified) | 35,200,000 | (room air) | Ordinary office / outdoor urban air |

Note the scale: ordinary city air is about ISO 9, so an ISO 5 ballroom is 10,000 times cleaner than outdoors, and an ISO 1 mini-environment is another 10,000 times cleaner than that. A 1990s Class 1 fab was clean everywhere; the modern strategy is to make the small volumes that actually touch bare wafers (the mini-environments, ISO 1–3) extremely clean and let the big ballroom relax to ISO 5–6 because the wafers are never exposed to it. That relaxation is only possible because of the FOUP, covered in the next section.

### Fan-filter units and laminar downflow

The ballroom ceiling is a grid of **FFUs**, each typically a 1.2 m × 0.6 m (4 ft × 2 ft) or 1.2 m × 1.2 m module containing a low-noise EC fan and a **ULPA (ultra-low penetration air) filter**. A HEPA filter is rated 99.97% efficient at 0.3 µm; a ULPA filter is rated ≥ 99.9995% at its **most penetrating particle size (MPPS)** of ~0.1–0.2 µm, so essentially nothing that enters the fan passes into the room. In the cleanest areas, filter ceiling coverage is close to 100%; in lower-class areas 30–50% coverage with blank panels in between is sufficient. A GigaFab has tens of thousands of FFUs, each drawing on the order of 100–300 W; cleanroom air handling is a noticeable slice of the fab's electricity bill.

Air leaves the filters as a **unidirectional (laminar) downflow** at ~0.3–0.5 m/s (the classical design number is 0.45 m/s). The physics is simple: particles generated at any point in the room (a tool, a person, a robot) are swept straight down past the wafer level and out through the **perforated raised floor** (steel or aluminum tiles with ~15–25% open area, sometimes with dampers) before they can diffuse sideways to a neighboring tool. Below the raised floor the air drops through the waffle slab openings into the sub-fab, which acts as the return plenum, and is pulled back up return shafts to the fan deck. With a ~3.5–4.5 m ceiling and 0.45 m/s downflow, the entire room volume is replaced every ~8–10 s, i.e., roughly 350–450 **air changes per hour**, versus ~10 in an office. Only 10–20% of the circulating air is fresh make-up air; the rest recirculates, because conditioning outside air to cleanroom specifications is expensive.

### Temperature, humidity, pressure

Litho areas are held to ±0.1 °C (some tool enclosures to ±0.01 °C) around a set point near 22–23 °C, because a 1 °C change in a 300 mm silicon wafer expands it by ~0.8 µm edge to edge (silicon's coefficient of thermal expansion is 2.6 × 10⁻⁶/K), and overlay budgets at N3/N2 are ~2 nm. The rest of the fab typically runs ±0.5–1 °C. Relative humidity is held at ~40–45% ± a few percent: too dry and electrostatic discharge and particle attraction rise; too wet and chemically amplified resists change sensitivity, water adsorbs on wafer surfaces, and corrosion accelerates. The cleanroom runs at a slight positive pressure (~10–15 Pa over the adjacent gowning and service areas, with a cascade of decreasing pressure outward) so that any leak is outward. Vibration, temperature, and humidity are all measured continuously and trended in the facility monitoring system.

### Airborne molecular contamination (AMC)

Particles are only half of the contamination problem. **AMC (airborne molecular contamination)** is gas-phase chemical contamination at ppb and ppt levels. **SEMI F21** classifies it: **MA** (acids: HF, HCl, SO₂, NOx), **MB** (bases: ammonia, amines), **MC** (condensables: organics with boiling points above ~150 °C such as siloxanes and phthalate plasticizers), and **MD** (dopants: boron, phosphorus). Each does specific damage:

- Ammonia and amines at ~1 ppb neutralize the photoacid at the surface of chemically amplified DUV/EUV resists, producing "T-topping" and CD shifts; litho bays use chemical filters (impregnated activated carbon, ion-exchange media) and keep ammonia-based cleaning chemistry away.
- Boron is a p-type dopant; borosilicate glass fibers in older HEPA media outgas boron that dopes silicon surfaces during high-temperature steps, so modern filters use low-boron or PTFE media.
- Siloxanes (silicone sealants, cosmetics, lubricants) crack on hot surfaces and under DUV/EUV light into SiO₂ haze on optics and reticles; fabs ban silicone-containing materials, and EUV scanners run a hydrogen background to clean carbon and tin off the mirrors.
- Sulfates and ammonium salts grow **haze** crystals on reticle surfaces that print as defects, which is what drove nitrogen-purged reticle pods and tighter AMC control after the 2000s haze crisis.

AMC is monitored with ion-chromatography samplers, cavity ring-down spectrometers, and witness wafers, and controlled by chemical filtration in the make-up air, in critical-bay FFUs, and inside tools and FOUPs.

## The FOUP and the Mini-Environment

A 300 mm wafer never sees ballroom air. From the moment it enters the fab to the moment it leaves, it lives in a **FOUP (front-opening unified pod)**: a sealed polycarbonate (body) and PEEK/PEI (wafer contact) box holding **25 wafers** in slots pitched at 10 mm, with a front door that can only be opened by a tool. Major FOUP suppliers are Entegris (the leader, on the order of half or more of the market), Shin-Etsu Polymer, Miraial, and 3S Korea; a FOUP costs a few thousand dollars, and a GigaFab has tens of thousands of them in circulation. The standard is defined by SEMI E47.1 (the FOUP), E15.1 (the load port), and E1.9 (the wafer cassette), which is why any FOUP fits any tool from any supplier.

The mechanism at the tool is the interesting part:

1. An OHT vehicle lowers the FOUP onto a **load port** on the front of the tool. Three **kinematic coupling pins** on the load port mate with grooves on the FOUP bottom, fixing its position to within a fraction of a millimeter. An RFID tag on the FOUP is read to identify the carrier; the tool's host interface (SECS/GEM, see below) matches it to the lot the MES expects.
2. The load port clamps the FOUP, advances it against a sealed opening in the tool's front wall, and the **FOUP opener** unlatches the FOUP door from inside, pulling door and latch mechanism into the tool. Only now are the wafers exposed, but only to the interior of the **EFEM (equipment front-end module)**.
3. The EFEM is a small cabinet with its own FFU on top blowing ULPA-filtered air downward across the wafers and out the bottom: the **mini-environment**, kept at ISO 1–3 and at slight positive pressure relative to the ballroom, so ballroom air cannot enter even through the door seam. Inside are a wafer-handling robot (with vacuum or edge-grip end effectors), a **pre-aligner** that spins the wafer to find the notch and center it, and often a camera that reads the laser-scribed wafer ID (the SEMI M12/M13 alphanumeric mark on the front near the edge, or the T7 matrix code on the back).
4. The robot moves wafers one at a time from the FOUP into the process module (a load lock for a vacuum tool; a chuck for a track or wet tool). When processing is done the wafers return to the same slots, the door is replaced, and the FOUP is released to the next OHT vehicle.

Two refinements matter at the leading edge. **Nitrogen purge**: load ports and stockers have nozzles that mate with check valves in the FOUP base and flow dry N₂ through it, driving internal humidity to a few percent and displacing oxygen, which slows native oxide regrowth on cleaned silicon, slows copper and cobalt oxidation between BEOL steps, and stops the FOUP's polymer walls from feeding adsorbed HF or ammonia back onto the wafers. **FOUP hygiene**: the polymer absorbs process chemicals, so FOUPs are washed in dedicated washers, tracked as assets with maintenance schedules, and often dedicated to a process segment (a "BEOL FOUP" never carries FEOL wafers, to keep copper away from gate stacks).

The consequence for the building is profound: because wafers live in ISO 1–3 mini-environments, the ballroom can be ISO 5–6 and the humans and robots in it are far less dangerous. This is the 300 mm answer to the 200 mm-era **SMIF (standard mechanical interface)** pod, and it is what makes full automation and the ballroom layout possible.

## AMHS: How 100,000 Wafers a Month Actually Move

In a leading-edge fab no human carries wafers. The **AMHS (automated material handling system)** moves every FOUP for every step. The dominant suppliers are Daifuku (Japan, the leader with the majority of leading-edge fabs) and Murata Machinery (Muratec, Japan); both build the vehicles, rails, and stockers as a system.

### Components

- **OHT vehicles** run on aluminum rails hung from the ceiling structure, take contactless inductive power from the rail, and talk over wireless links to the **MCS (material control system)**. Each carries one FOUP under its body and lowers it onto a load port with a belt hoist. Vehicles travel at up to ~5 m/s on straights and slow for turns and merges; a GigaFab has on the order of 1,000–3,000+ of them on tens of kilometers of track laid out as a mesh of **intrabay** loops (one per row of tools) joined by **interbay** trunks, with shortcuts and bypasses to route around blockages.
- **Stockers** are automated towers whose crane stores and retrieves a few thousand FOUPs on shelves. Because a FOUP in a stocker is WIP waiting for a tool, modern fabs push storage out to the tools: **STB (side-track buffers)** and **UTS (under-track storage)** shelves hang from the rail beside a tool so the next lot is in reach when the current one finishes, and **OHB (overhead buffers)** hold FOUPs on the ceiling. Stockers and buffers provide nitrogen purge for lots under humidity-sensitive queue-time limits.
- **Lifters and conveyors** connect floors and phases; TSMC's phases are linked by bridges so a lot moves between phases without leaving the AMHS.

### Scale

The number of moves is what forces automation rather than the cleanliness. Consider a 100,000 wafer-start-per-month (**wspm**) fab at ~1,200 steps: 4,000 lots per month, each visiting 1,200 tools, is ~4.8 million tool visits per month, or ~6,600 lot deliveries per hour, every hour. Each delivery is a pickup, a transport averaging a few hundred meters, a drop, and later a pickup back. Average delivery time is typically kept to a few minutes, and the MCS's job is to have a vehicle there before the tool finishes so that the tool never waits for material (a delivery delay on a $200 M EUV scanner costs more than the vehicle fleet). Vehicle dispatching, traffic control, and deadlock avoidance on this scale are a serious real-time-systems problem, and the AMHS software is typically as important as the hardware in a fab's selection.

The result is a **"lights-out"** fab in the sense that the production floor needs no operators for normal wafer movement; people in the ballroom are engineers and technicians doing maintenance, qualification, or troubleshooting. Photographs of TSMC's Fab 18 show long aisles of tools with OHT vehicles flowing overhead and few if any people.

## The Process Flow: 1,000–1,500 Steps, Revisited Dozens of Times

### FEOL, MOL, BEOL

The flow divides into three eras, each with its own contamination rules and tool sets:

- **FEOL (front end of line)**: everything that builds the transistors: shallow trench isolation, well implants, fin or nanosheet formation, gate stack (high-k dielectric, work-function metals), source/drain epitaxy, activation anneals. Temperatures reach 1,000 °C+ in anneals and ~600–700 °C in epi. No copper or other fast-diffusing metals are permitted anywhere near FEOL tools.
- **MOL (middle of line)**: the contacts and local interconnect that connect transistors to the wiring: contact etch, silicide or contact metal (Ti/TiN, cobalt, now increasingly ruthenium or molybdenum), gate contacts, the first tight-pitch metal levels (M0/M1). MOL is now a major yield and resistance limiter because contact dimensions are ~15–20 nm.
- **BEOL (back end of line)**: 15–18 levels of copper (and, at the bottom, cobalt or ruthenium) wiring built by dual damascene, with low-k dielectrics, barrier/seed deposition, electroplating, and CMP, thermally limited to ≤ ~400 °C. Ends with passivation and the aluminum or copper pad layer, and for advanced packaging, the bump or bond-pad layers.

### Step counts and mask layers

A "step" is one visit of a lot to one tool (including metrology and cleans). Approximate public estimates: N28 ~ 600–700 steps; N7 ~ 1,000; N5 ~ 1,100–1,300; N3 and N2 ~ 1,300–1,500+ depending on how metrology and cleaning are counted. Mask layer counts have grown similarly: ~40 for a 90 nm process, ~60 for 28 nm, ~80 for N7 (where multi-patterning inflates the count), and roughly 70–100+ for N3/N2, of which ~20–30 are EUV (each EUV layer replacing 2–4 DUV multi-patterning masks; N7+ introduced ~4–5 EUV layers, N5 ~14, N3 ~20–25, N2 ~25–30, with A16 similar to N2 plus backside-power layers). The step count grows faster than the layer count because each layer adds more non-litho work: more ALD liners, more selective depositions, more inline inspection.

Each lithography layer is a mini-sequence of ~10–15 steps: pre-clean, hard mask or film deposition, anti-reflective coating, resist coat and bake (track), exposure (scanner), post-exposure bake and develop (track), **ADI (after-develop inspection)** CD and overlay metrology, a rework loop if out of spec (strip and recoat; litho is the only reworkable step in the flow), etch, strip, post-etch clean, **AEI (after-etch inspection)**, and sampled defect inspection. Multiply by ~90 layers and you are at ~1,000 steps before counting implants, anneals, CMP, and the rest.

### Re-entrant flow

The fab is a **job shop**, not an assembly line: there are only ~15–25 distinct tool families (scanners, tracks, etchers of several types, CVD/ALD/PVD platforms, implanters, furnaces and RTP, wet and single-wafer cleaners, CMP, plating, and the metrology/inspection tools), and every lot returns to the same families dozens of times. A single lot visits lithography ~90 times, etch 200+ times, cleaning 200+ times. This **re-entrant flow** is the defining property of semiconductor factory physics: a lot at BEOL metal 12 competes for the same immersion scanner as a lot at FEOL fin cut, and a hiccup at any tool family ripples through every lot in the fab at every stage.

### Cycle time and Little's law

The industry rule of thumb is ~1.0–1.5 days of **cycle time** per mask layer; a ~90-layer N3 flow therefore takes ~3–4 months from wafer start to wafer out, and TSMC has publicly described N5/N3 cycle times in that range. The **raw process time (RPT)**, the sum of actual processing durations, is only ~20–30% of that; the rest is waiting: in stockers for a tool, in batches for a furnace to fill, for metrology results, for a scanner's reticle change. The ratio cycle time / RPT is the **X-factor**, typically 2–4 in a well-run fab.

Queueing theory explains why. For a tool with utilization u, the **Kingman approximation** for waiting time is W ≈ (u / (1 − u)) × ((cₐ² + cₑ²) / 2) × tₑ, where tₑ is the mean process time and cₐ, cₑ are the coefficients of variation of arrivals and processing. Waiting time explodes as u → 1: at 80% utilization the queue term is 4, at 90% it is 9, at 95% it is 19. This is the **operating curve** every fab manager lives on: push utilization of the $200 M scanners toward 95% to amortize them, and cycle time balloons; run them at 80% to keep lots flowing, and the depreciation per wafer rises. Reducing variability (tool downtime, batch sizes, hot-lot disruptions) is the only way to move the curve itself.

**Little's law** connects the three quantities every fab reports: WIP = throughput × cycle time, where **WIP (work in process)** is the number of wafers in the fab at any moment.

> **Worked example: WIP in a GigaFab.** A fab starts 100,000 wafers per month with a 90-day cycle time. Throughput = 100,000 / 30.4 ≈ 3,290 wafers per day. WIP = 3,290 wafers/day × 90 days ≈ 296,000 wafers, i.e., ~11,800 lots of 25 sitting in tools, FOUPs, buffers, and stockers at any instant. Those wafers each carry ~$5,000–15,000 of accumulated processing cost depending on their stage, so the fab has on the order of $2–3 billion of unfinished inventory in the building. Cutting cycle time from 90 to 75 days at the same output would release ~50,000 wafers of WIP and roughly $400–500 million of working capital, which is why fabs pay for cycle-time reduction even when they have no shortage of tools.

### Hot lots and dispatching

Not all lots are equal. Engineering lots for a new product's first silicon, yield-learning split lots, and customer expedites are flagged as **hot lots** (and, above them, **super hot lots** that preempt everything). A hot lot jumps every queue and may have a dedicated OHT vehicle and reserved tool slots; it can run the flow in ~40–60% of normal cycle time. The price is paid by everyone else: each hot lot adds variability and typically the number is capped at a few percent of WIP. Below hot lots, the **real-time dispatcher (RTD)** ranks every waiting lot at every tool by rules combining due date, remaining steps, queue-time limits, batch-forming opportunities for furnaces, reticle availability on scanners, and line balance targets, recomputed continuously.

### Queue-time constraints

Many step pairs carry a maximum allowed elapsed time, a **Q-time**, because a surface changes chemically while it waits. Representative examples (exact limits are fab-specific):

- After an HF-last clean and before gate oxidation or epitaxy: ~1–4 hours, because native oxide regrows on bare silicon in air (a monolayer in minutes, ~1 nm in a day) and adsorbs organics.
- After PVD of the TaN/Ta barrier and copper seed and before electroplating: a few hours, because the 2–5 nm Cu seed oxidizes and the plated film then voids and delaminates; seed and plating tools sit adjacent for this reason.
- After copper CMP and before the SiCN dielectric cap: hours, to limit corrosion of the exposed lines.
- After resist develop and before etch: hours to a day, against resist outgassing and CD drift; after etch and before strip, against polymer residue hardening.

The dispatcher must not start the first step of a Q-time pair unless capacity for the second is guaranteed; a lot that violates a Q-time is scrapped or reworked, so Q-time management is core MES logic.

## Tools: Counts, Cost, Utilization, Clustering

### What a fab costs and where the money goes

A 100,000 wspm leading-edge fab costs roughly $20–30 billion at N3, and N2/A16 fabs are trending higher (TSMC's Arizona site was budgeted at $65 billion for three fabs in 2024 and expanded in March 2025 to $165 billion for six fabs, two advanced-packaging plants, and an R&D center). Of that, ~70–80% is process equipment; the building, cleanroom, and facilities are ~20–30%. Rough tool-by-tool composition of a 100k wspm N3-class fab (public estimates; actual configurations are proprietary):

| Tool family | Approx. count | Approx. unit price | Key suppliers |
|---|---|---|---|
| EUV scanners (NXE:3600D / 3800E) | ~30–40 | ~$180–220 M | ASML (100%) |
| DUV immersion scanners (NXT:2000i–2100i) | ~40–60 | ~$80–120 M | ASML (dominant), Nikon |
| DUV dry ArF / KrF / i-line | ~50–80 | $10–40 M | ASML, Nikon, Canon |
| Coater/developer tracks | ~100+ | $10–20 M | TEL (~90% share), SCREEN |
| Plasma etch chambers | many hundreds | $2–6 M per chamber | Lam, TEL, Applied |
| CVD / ALD / PVD chambers | many hundreds | $1–6 M per chamber | Applied, Lam, TEL, ASM |
| Ion implanters | ~30–50 | $5–10 M | Applied (Varian), Axcelis |
| Furnaces / RTP / laser anneal | ~50–100 | $3–8 M | TEL, Kokusai, Applied, Veeco |
| Wet / single-wafer clean | ~100+ | $3–8 M | SCREEN, TEL, Lam |
| CMP | ~50–80 | $3–6 M | Applied, Ebara |
| Electroplating | ~20–40 | $3–6 M | Lam, Applied |
| Metrology / inspection | ~150–300 | $1–30 M | KLA (~50%+), Applied, Hitachi, ASML (HMI e-beam), Nova, Onto |

Lithography (scanners plus tracks) is ~25–30% of tool capex, and the EUV fleet alone is $6–8 billion. Metrology and inspection are ~10–15%. Etch and deposition together are ~35–40%.

> **Worked example: how many EUV scanners does the fab need?** Suppose 100,000 wspm at N3 with 25 EUV layers: 2.5 million EUV wafer-exposures per month. An NXE:3800E is rated at ~220 wafers per hour (wph) at a 30 mJ/cm² reference dose, but real layers run 30–60 mJ/cm² and throughput falls roughly as dose rises, so a fab-weighted average of ~150–180 wph is realistic; take 160. Availability (the fraction of time the scanner is up and not in reticle change, calibration, or maintenance) of ~85% gives 160 × 24 × 30.4 × 0.85 ≈ 99,000 exposures per scanner per month. 2,500,000 / 99,000 ≈ 25 scanners, and a prudent fab adds ~20% for dedication constraints (some layers are qualified only on certain scanners), engineering time, and ramp headroom: ~30. At ~$200 M each that is ~$6 billion of scanners consuming ~30 × 1–1.4 MW ≈ 35–40 MW of electricity continuously.

### Utilization and the SEMI E10 states

Every tool's time is accounted for in the six **SEMI E10** states: productive, standby (up but idle, often waiting for WIP), engineering (running tests or qualifications), scheduled downtime (preventive maintenance, **PM**), unscheduled downtime (failures), and non-scheduled. **Availability** is up-time over total time; **OEE (overall equipment effectiveness)** multiplies availability by performance (actual vs. theoretical throughput) and quality (good vs. total wafers). Leading-edge fabs run bottleneck tools (scanners) at 85–95% availability and utilization; non-bottleneck tools deliberately lower, ~70–85%, because the operating curve punishes high utilization with cycle time and the tools are cheaper. A fab's capacity is set by the bottleneck, so a fab is specified as "N wspm" precisely when its scanner fleet, running at its target utilization, can expose that many wafers across all layers.

Preventive maintenance is the largest planned loss: an etch chamber is wet-cleaned every few hundred to few thousand RF-hours as polymer builds up on its walls, a PVD target and shield set is replaced after a set kWh of sputtering, an EUV collector mirror is swapped after months as tin and hydrogen damage cut its reflectivity. After a PM the chamber is **seasoned** (dummy wafers condition the walls) and **qualified** (particle and film monitors in spec) before product returns. Shrinking PM frequency and duration is a permanent campaign, because every hour of scanner downtime is ~$4,500 of unrecovered depreciation (see the economics section).

### Clustering: the multi-chamber platform

Almost no leading-edge process tool is a single chamber. The standard architecture is the **cluster tool**: a central vacuum transfer chamber with a robot, two load locks connected to the EFEM, and 4–8 process chambers arranged around it. Applied Materials' **Endura** (PVD, also degas, preclean, and ALD chambers), **Centura** (CVD, epi, etch, RTP), and **Producer** (PECVD with twin chambers) platforms; Lam's **Kiyo**, **Flex**, **Versys**, and **Vector** platforms; and TEL's **Telius**, **Tactras**, and **Trias** platforms all follow this design. Clustering delivers three things:

1. **Vacuum integrity between steps.** The copper barrier/seed sequence (degas at ~300 °C, Ar or reactive pre-clean of the native oxide on the underlying via, TaN barrier, Ta liner, Cu seed PVD) runs across four chambers of one Endura without seeing air; the same holds for a high-k/metal gate stack. Air exposure between these steps would form oxides and ruin adhesion and resistance.
2. **Throughput and footprint.** Four chambers on one mainframe process four wafers in parallel while sharing one EFEM, one set of load ports, and one footprint in a cleanroom that costs on the order of $10,000+ per m² to build.
3. **Redundancy.** If one chamber goes down for PM the platform keeps running at reduced capacity.

The trade-off is that identical chambers are never quite identical. **Tool matching** is the discipline of making every qualified chamber produce the same thickness, etch depth, CD, and defect count so that a lot can be dispatched to any of them, done by matching hardware (showerhead condition, electrode gap, RF match), matching sensor traces via FDC (below), and running periodic matching wafers on a shared metrology tool. Where matching fails, a chamber is **dedicated** to particular layers, and a fab's dispatching flexibility is limited largely by how many chambers are qualified for each recipe.

## The Lot, the Recipe, and the Software Stack

### The lot

The unit of manufacturing is the **lot**: 25 wafers in one FOUP, sharing one lot ID, one product, one **route** (the ordered list of operations for that technology and product), and one history. Historically a paper **run card** (or traveler) rode with the lot and each operator stamped it; today the run card is entirely electronic and the physical lot is identified by the FOUP's RFID and the wafers' laser-scribed IDs. Wafers within a lot may be split (a **split lot** for engineering experiments, with different wafers receiving different conditions), merged, or scrapped individually; the MES tracks each wafer's slot and history.

### MES, SECS/GEM, and GEM300

The **MES (manufacturing execution system)** is the fab's central nervous system: it holds every lot's current operation, next operation, history, holds, and metrology data; it enforces the route (a tool will refuse a lot whose MES state does not match); it manages Q-times, sampling plans, and rework; and it feeds the dispatcher and the reporting systems. TSMC runs its own in-house MES and manufacturing data platform; commercial systems include Applied Materials SmartFactory (built on the Brooks Software business Applied bought in 2006), Siemens Opcenter (the former Camstar), and IBM SiView (widely used in Japanese and some Korean fabs), with connectivity layers from companies like PEER Group and Cimetrix.

Tools talk to the MES over **SECS/GEM** (SEMI E5 message format and E30 generic equipment model over TCP), a 1980s-era standard that still works, extended for 300 mm automation by the **GEM300** suite: E87 (carrier management, i.e., the FOUP), E40 (process jobs), E90 (per-wafer substrate tracking), E94 (control jobs). A lot's arrival at a load port triggers: carrier ID read → MES verifies the lot and returns the recipe → tool builds a process job with the wafer list → processes → reports per-wafer completion and alarms → MES advances the lot's state. The higher-bandwidth **EDA / Interface A** standards (E120–E164) stream tool sensor data at up to ~10 Hz for FDC.

### Recipes

A **recipe** is a tool-level program: a sequence of steps, each with setpoints (gas flows in sccm, pressure in mTorr, RF power in W, chuck temperature, time, endpoint criteria) and tolerances. Leading-edge recipes are locked in a recipe management system; the MES selects which recipe (and which parameter tweaks, below) to download for each lot, and any change is under formal change control because a mis-set flow of a few sccm changes CD by nanometers. The full set of recipes for a technology across all ~1,300 steps, plus the route and the design rules, is what a fab means by the **process of record (POR)**.

### APC: run-to-run and feed-forward control

No process is stable enough to run open loop. **APC (advanced process control)** wraps every critical step in a feedback loop:

- **Run-to-run (R2R) control** measures the output of lot n (post-etch CD, post-CMP thickness) and adjusts the recipe for lot n+1 (etch time, polish time, dose), usually with an **EWMA (exponentially weighted moving average)** estimate of the process offset plus outlier rejection and step-size limits.
- **Feed-forward control** uses incoming measurements: a resist CD 0.5 nm wide at ADI makes the etch controller trim the etch; a thick incoming dielectric makes the CMP controller polish longer.
- **Scanner corrections** are the most elaborate: overlay is corrected per scanner, reticle, wafer chuck, and field with tens of terms fitted from overlay metrology on previous lots (increasingly per wafer, from on-scanner alignment data), plus dose and focus maps for CD uniformity.

The combinations of tool, chamber, product, layer, and reticle multiply into thousands of control threads per fab, maintained by APC software (Applied SmartFactory, or in-house systems at TSMC, Samsung, and Intel).

### FDC and sampling

**FDC (fault detection and classification)** watches the tool rather than the wafer. Every chamber streams hundreds of sensor traces per wafer (RF forward/reflected power, DC bias, chamber pressure, each MFC flow, ESC temperature and helium backside leak, OES endpoint spectra, throttle valve position). FDC compares each trace to a **golden trace** window or a multivariate model (PCA, PLS); a deviation triggers a warning, a wafer hold, or an automatic tool interdict before the next wafer starts. FDC catches the failures metrology would see only hours later: a clogged showerhead hole, a drifting MFC, an ESC losing clamping, a leaking O-ring.

Because metrology is expensive and slow, only a fraction of wafers are measured: a typical **sampling plan** measures 2–3 wafers per lot at 5–13 sites for CD or thickness, and inspects 1–2 wafers per lot for defects at critical layers, with sampling increased for new tools, post-PM qualification, or when SPC charts show drift. **SPC (statistical process control)** charts every measured parameter against control limits derived from the process capability; an out-of-control point places the tool or lot on hold until an engineer dispositions it.

### Non-product wafers

A large share of tool time goes to wafers that will never become chips. **Monitor wafers** (**test wafers**) check tools: **particle monitors** (a bare prime wafer run through a chamber and scanned on a KLA Surfscan SP7 for added particles ≥ ~20–30 nm, against a spec of a few adders per pass), **film monitors** (blanket deposition then ellipsometry or four-point probe), and **etch-rate monitors**. **Dummy wafers** fill empty slots in batch furnaces, which need a full uniform load for gas-flow and thermal reasons, and season chambers after PM. **Pilot** (send-ahead) wafers run ahead of a lot at risky steps. Non-product wafers are on the order of 10–20% of wafer moves in a mature fab and more during ramps; they are reclaimed (stripped and re-polished by specialists such as RS Technologies and Pure Wafer) several times before retirement, and their cost is a line item every fab tries to shrink.

## People

A GigaFab employs on the order of 3,000–6,000 people, and TSMC's total headcount is ~80,000+ (2024). The split is roughly:

- **Process engineers** own a module (litho, etch, thin films, diffusion/implant, CMP, wet) or a layer: its recipes, SPC charts, APC controllers, and yield. **Integration engineers** own the flow across modules for a node; **device and yield engineers** analyze electrical test data and defect Paretos and drive yield learning.
- **Equipment engineers** own the tools: PM schedules, repairs, spares, uptime, matching, working alongside hundreds of resident field-service engineers from ASML, Applied, Lam, TEL, and KLA.
- **Technicians** (the largest group) run the floor 24/7: alarms, PMs, reticle and consumable loading, hold dispositions, qualification wafers.
- **Industrial engineers** manage capacity, dispatching rules, WIP, and cycle time; **facilities engineers** run the building; plus quality, IT, planning, and supply-chain staff.

Because the fab runs 24/7, floor staff work rotating 12-hour shifts and engineers are on call. TSMC's culture is famously intense: engineers respond to tool or yield issues at any hour, and in 2014 the company formed a formal three-shift R&D program (the "Night Hawk" team, paid a premium to develop 10 nm and 7 nm around the clock) so that process development itself never stopped. That culture is part of why TSMC's ramps are fast, and it became a flashpoint in Arizona. TSMC broke ground on **Fab 21** in 2021 planning to hire thousands locally, found the US pipeline of fab technicians and engineers thin, sent ~600 American hires to Tainan for 12–18 months of training, brought over 1,000+ Taiwanese engineers on assignment, and was reported (Rest of World, the New York Times) to have struggled with culture clashes over hours, hierarchy, and safety practices. Phase 1's start was pushed from 2024 into 2025, then pulled back in to reach N4 volume production in 4Q 2024 with yields TSMC described as comparable to Taiwan's, and by 2026 the site had become the template for the company's overseas expansion.

## Utilities: A Fab Is a Chemical Plant

### Electricity

A leading-edge GigaFab draws several hundred megawatts continuously and the largest sites approach a gigawatt. Roughly: process tools ~40–50% (EUV scanners at 1–1.4 MW each are the largest single loads; a 30-scanner fleet is ~40 MW), cleanroom HVAC ~20–30%, sub-fab pumps, abatement, and gas/chemical systems ~15–20%, and the UPW plant, ASU, and everything else the rest. TSMC consumed ~24.8 TWh in 2023 and ~25.6 TWh in 2024, roughly 9% of Taiwan's total electricity (estimates range ~7–9% by year and accounting), projected to reach anywhere from ~12% to ~24% by 2030 depending on the forecast as N2 and A16 fabs come online, which makes Taiwan's energy policy, 2025 nuclear phase-out, and LNG terminals fab supply-chain issues. Fabs have generators and UPS for safe shutdown, but a grid sag of a fraction of a second trips sensitive tools and can scrap thousands of wafers mid-process, so TSMC's fabs are fed from dedicated substations with redundant feeds.

### Water

A GigaFab consumes on the order of tens of thousands of tonnes (cubic meters) of water per day; TSMC company-wide draws roughly 150,000–200,000+ tonnes per day across all fabs. The water goes mainly to the **UPW** plant, which turns municipal water into 18.2 MΩ·cm resistivity water (the theoretical limit for pure H₂O) with total organic carbon < 1 ppb, dissolved oxygen < 1 ppb, particles < 1 per mL at 20 nm, and boron and silica at ppt levels, through a chain of multimedia filtration, activated carbon, softening, reverse osmosis (two passes), degasification, UV (185 nm to oxidize organics, 254 nm to sterilize), electrodeionization and mixed-bed ion exchange, and final ultrafiltration at the point of use, in a continuously recirculating loop so that water never stands still. Rinsing after every wet clean and CMP step consumes on the order of several thousand liters of UPW per wafer over the full flow, and cooling towers evaporate a large share of the remainder. Fabs recycle 85–90% of process water internally.

Water is the utility most exposed to weather. In spring 2021 Taiwan suffered its worst drought in over half a century (no typhoon had made landfall in 2020); reservoirs feeding Hsinchu and Taichung fell to ~10% capacity, the government cut irrigation to tens of thousands of hectares of farmland to preserve industrial supply, and TSMC contracted fleets of water tankers to truck water to its fabs and drilled on-site wells as a contingency. The episode led directly to TSMC building industrial water-reclamation plants (the first in Tainan, treating municipal wastewater to fab-grade) and to its 2030 targets for reclaimed-water share.

### Gases and chemicals

Bulk nitrogen (tens of thousands of Nm³ per hour, purified to ppb O₂ and H₂O) purges every tool, FOUP, and pipeline; on-site ASUs also supply oxygen and argon. Hydrogen, helium, and dozens of **specialty gases** (NF₃, WF₆, SiH₄, GeH₄, HBr, Cl₂, C₄F₈, PH₃, B₂H₆) arrive in cylinders or ISO containers at sub-fab gas cabinets and reach each tool through double-walled electropolished stainless lines and VMBs, with leak detection, excess-flow valves, and automatic shutoff for toxic and pyrophoric species. Liquid chemicals (H₂SO₄, H₂O₂, HF, NH₄OH, IPA, TMAH developer, CMP slurries) are piped from a central chemical distribution room in double-contained lines. Process exhaust is segregated by chemistry (acid, alkaline, solvent, toxic/pyrophoric, general) and treated by point-of-use abatement at the tool (burn-wet, plasma, or catalytic units for PFCs and toxics) and central wet scrubbers before the stack. Module 04 covered where these consumables come from; the point here is that the sub-fab is a chemical plant with thousands of controlled connections and an **EHS (environment, health, and safety)** system as elaborate as the cleanroom's.

## Contamination Sources and Gowning

The old cleanroom adage is that people are the dirtiest thing in the room, and even in a FOUP fab it is true. A seated, motionless person sheds ~100,000 particles ≥ 0.3 µm per minute; walking at normal pace, ~5–10 million per minute; skin flakes (a human sheds ~10⁹ skin cells per day), hair, cosmetic particles, textile fibers, and, from sweat and breath, sodium, potassium, and chloride ions (mobile ions that shift transistor threshold voltages if they reach a gate oxide). The gowning protocol exists to contain all of this:

1. No cosmetics, perfume, ordinary paper, or wood pencils past the gowning room.
2. Gown in strict top-down order so nothing dirty passes over something clean: hair net and beard cover, face mask, hood, the **bunny suit** coverall (tight-weave polyester with woven carbon-fiber ESD threads), boots over the coverall legs, safety glasses, and nitrile gloves. Gowns are laundered by specialist services on a schedule.
3. A **sticky mat** cleans soles; an **air shower** (~20–30 s of ~20 m/s filtered jets from all sides, with interlocked doors) strips loose particles from the gown before the cleanroom door opens.
4. Inside: no fast movement, no leaning over open tools, no touching the face; tool interiors are opened only with the FFU running and by procedure.

The larger contamination sources today are the tools and the process itself: flaking films from chamber walls and shields, worn robot end effectors and chuck pins, slurry agglomerates in CMP, resist bubbles, and backside particles transferred from chuck to chuck. That is why particle monitors and PMs matter more than gowning statistics. Backside particles are a special case in lithography: a 50 nm particle under a wafer on a scanner chuck deflects the surface by tens of nanometers over a millimeter-scale area, larger than the EUV depth of focus (~100 nm), producing a **hot spot** of defocused features, so backside and chuck cleaning are routine. The **killer defect size** scales with the node: any particle larger than roughly half the minimum feature (~10–15 nm at N3/N2) can bridge or open a line, which is why KLA's inspection tools have chased ever-smaller detection thresholds (Module 13).

## TSMC's Fab Organization

TSMC names fabs by number and builds them in **phases**: each phase is a separately constructed cleanroom block (typically ~25,000–30,000 wspm of capacity) that shares the site's utilities and is linked to neighboring phases by AMHS bridges, so that "Fab 18" is really a campus of six to eight phases built over years. A **GigaFab** is TSMC's term for a 300 mm site with ≥ 100,000 wspm. As of 2026 the map looks like this (capacities and node assignments are from public reporting and TSMC statements; TSMC does not disclose exact per-fab numbers):

| Fab | Location | Nodes | Notes |
|---|---|---|---|
| Fab 12 | Hsinchu Science Park | R&D, N7/N5 and earlier; Phase 8 is the R&D center | Where each new node is developed before transfer |
| Fab 14 | Tainan (STSP) | 40 nm to N16, specialty | Older GigaFab |
| Fab 15 | Taichung (CTSP) | 28 nm in early phases, N7 family in later phases | GigaFab |
| Fab 18 | Tainan (STSP) | N5 (Phases 1–3), N3 (Phases 4–8) | The largest leading-edge site in the world; the N3 fabs that make Apple, NVIDIA, and AMD's current products |
| Fab 20 | Hsinchu (Baoshan) | N2 | N2 pilot line; volume ramp through 2026 toward ~60,000+ wspm |
| Fab 22 | Kaohsiung (Nanzih) | N2, then A16 | Where N2 volume production started in 4Q 2025; ramping toward ~60,000+ wspm in 2026 |
| Fab 25 | Taichung (CTSP) | A14 | Groundbreaking 5 November 2025; risk production 2027, volume production 2H 2028 |
| Fab 21 | Phoenix, Arizona | N4 (P1, HVM since late 2024); N3 (P2, tool move-in 2H 2026, production 2027); N2/A16 (P3, under construction since April 2025); P4–P6 planned | Also two advanced packaging plants and an R&D center on the site |
| Fab 23 (JASM) | Kumamoto, Japan | 12/16/22/28 nm, ~55,000 wspm (Fab 1, HVM since late 2024); Fab 2 under construction, upgraded from the original 6–12 nm plan to 3 nm (approved March 2026), ~15,000 wspm, tool move-in and production 2028 | Joint venture with Sony, Denso, Toyota |
| ESMC | Dresden, Germany | 28/22 nm planar and 16/12 nm FinFET, ~40,000 wspm | JV with Bosch, Infineon, NXP; groundbreaking August 2024, tool move-in 2H 2026–2027, volume production end of 2027 |
| Fab 16 | Nanjing, China | 16 nm and 28 nm | Capped by export-control rules |
| Fab 10 / Fab 11 | Shanghai / Camas, Washington (WaferTech) | 200 mm legacy | |

The pattern is that each new node is developed in Fab 12's R&D phase, moved into risk production at a new dedicated fab (Fab 18 for N5/N3, Fab 20/22 for N2), and then copied to additional phases and, with a lag of a few years, to overseas sites. TSMC's practice of transferring a process fab-to-fab depends on making the new fab's tools, recipes, and facilities match the source fab as exactly as possible, which is why Arizona's yields matching Tainan's was a milestone rather than a formality.

### Intel and Samsung, briefly

**Intel** runs its process development at **D1X** in Hillsboro, Oregon (Ronler Acres, the most advanced R&D site outside Taiwan, and the first with a High-NA EXE:5000/5200), and volume production of Intel 18A in **Fab 52** (and the neighboring Fab 62) at Ocotillo in Chandler, Arizona; Intel 4/3 run at **Fab 34** in Leixlip, Ireland; Kiryat Gat, Israel (Fab 28/38) runs older nodes; New Mexico (Fab 9/11x) does Foveros advanced packaging. Intel's Ohio site (Licking County) was delayed to the 2030s and its planned Magdeburg, Germany site was cancelled in 2025 during the company's restructuring. **Samsung**'s leading-edge logic runs at **Hwaseong** (S3) and **Pyeongtaek** (the P1–P6 complex, the largest fab campus in the world by area, mixing DRAM, NAND, and foundry lines), with older foundry at Giheung and Austin, Texas (S2), and the new **Taylor, Texas** fab bringing up SF2 (2 nm) for customers including Tesla, with production starting around 2026. Both companies use the same building anatomy, AMHS suppliers, and FOUP logistics described above; the differences are in the process, the culture, and the customer base.

## Bringing Up a Node

A leading-edge fab exists to run a process that did not exist when the building was designed. **Process bring-up** follows a multi-year cadence:

1. **Pathfinding (5–7 years before HVM).** Device architecture choices (FinFET → nanosheet → backside power → CFET) are explored with imec, universities, and equipment suppliers on short loops; materials and tool capabilities are screened.
2. **Process definition and PDK (3–4 years out).** The integration team fixes the flow, and the **PDK (process design kit)** is released in versions (0.1, 0.5, 0.9, 1.0) to design partners and EDA vendors: design rules, SPICE models, parasitic decks, standard-cell libraries (Arm, Synopsys, Cadence, TSMC), and IP. Design-technology co-optimization (**DTCO**) iterates cell height, track count, and sheet count against what litho and etch can resolve.
3. **Test chips and the yield vehicle.** A large SRAM test chip (256 Mb is TSMC's traditional vehicle: densest features, easy to test) plus logic test chips run through the developing flow while defect density **D0** (fatal defects per cm²) is tracked from ~1/cm² downward. Scribe-line structures give per-wafer **WAT (wafer acceptance test)** electrical parameters (threshold voltage, contact resistance, via chains) for every lot.
4. **Risk production (~1 year before HVM).** Customers can tape out; the foundry commits to ship, but yields and cycle times are immature. Early customers (Apple for N5, N3, and N2) accept the risk for first access.
5. **Volume production and ramp.** The fab goes from ~5,000–10,000 wspm to full capacity over ~1.5–2 years, phase by phase, each phase copying the first. TSMC's N2 is representative: risk production 2024, volume production from 4Q 2025 at Fab 22 with Fab 20 following, ~50,000+ wspm combined at end of 2025, and ~120,000–130,000 wspm targeted for end of 2026.
6. **Yield learning.** D0 falls roughly exponentially with cumulative volume along a **learning curve** as each defect mechanism is found (inline inspection → classification → failure analysis → root cause → recipe or hardware fix) and removed. A mature TSMC node reaches D0 ~0.1 defects/cm² or below; at that D0 a ~600 mm² GPU die yields ~55% by the Poisson model and a ~100 mm² mobile die ~90% (Module 13 does the math). Cycle time falls too, as the fab learns which sampling and rework it can drop.

## Fab Economics

### Depreciation and the 24/7 imperative

TSMC depreciates fab equipment over **5 years** straight-line (buildings over ~20 years); its annual depreciation charge is on the order of $20 billion. Equipment depreciation is a fixed cost: it accrues whether the fab makes 100,000 wafers or none. Everything about fab operation follows from that fact.

> **Worked example: depreciation per wafer.** A fab costs $20 billion: $15 billion of tools (75%) and $5 billion of building and facilities. Annual depreciation = $15 B / 5 + $5 B / 20 = $3.0 B + $0.25 B = $3.25 billion per year. At 100,000 wspm the fab produces 1.2 million wafers per year, so depreciation alone is $3.25 B / 1.2 M ≈ $2,700 per wafer at full output. If the fab runs at 80% loading, output is 0.96 million wafers and depreciation per wafer rises to ~$3,400; at 50% loading it is ~$5,400. A more realistic $30 billion N2 GigaFab at 100,000 wspm gives ~$4,000–4,500 per wafer, which against a manufacturing cost of roughly $8,000–10,000 per N2 wafer is ~50%. Per tool: a $200 M EUV scanner costs $40 M per year, ~$110,000 per day, ~$4,500 per hour in depreciation alone, which is why a scanner waiting 30 minutes for a FOUP is a reportable event.

That is why fabs run 24/7 at the highest utilization the operating curve permits, why TSMC's gross margin swings with loading (the 2023 downturn compressed margins as utilization fell into the 70s%), why a fully depreciated node (N7 and N5 after 2025–2026) becomes enormously profitable with ~half its former cost gone, and why a fab that is a year late has lost ~20% of its equipment's economic life before shipping a wafer.

### Cost per wafer breakdown

For a leading-edge wafer in the early years of a node, the approximate manufacturing cost structure is:

| Cost component | Share of wafer cost | Comment |
|---|---|---|
| Depreciation (tools + building) | ~50–60% | Falls toward zero after year 5 |
| Materials and consumables | ~15–20% | Starting wafer (~$100–200 for prime, more for epi), resists (EUV resist is ~$5,000+/L), specialty gases, wet chemicals, CMP slurry and pads, sputter targets, reticles amortized over volume |
| Maintenance, spares, service contracts | ~10% | Chamber kits, EUV collectors, pump rebuilds, supplier service |
| Labor | ~5–10% | Higher in the US and Europe than in Taiwan |
| Utilities | ~5% | Electricity dominant, water and gases |
| Other (non-product wafers, scrap, overhead) | ~5% | |

N3 wafer prices in 2024–2025 were roughly $18,000–20,000 and N2 is reported at ~$30,000, against TSMC's corporate gross margin in the high 50s%, consistent with manufacturing costs in the ~$8,000–14,000 range depending on node and maturity. A 300 mm wafer at N3 yields ~100 large GPU dies or ~600 mobile SoC dies, so the fab's share of a $30,000 GPU is small, but the fab's share of the decision of *whether the GPU can exist at all* is total.

## Key Numbers

| Quantity | Value |
|---|---|
| Wafers per FOUP / lot | 25 |
| ISO class in mini-environment vs. ballroom | ISO 1–3 vs. ISO 5–6 |
| ISO 5 particle limit | 3,520 particles ≥ 0.5 µm per m³ (100,000 ≥ 0.1 µm) |
| ULPA filter efficiency | ≥ 99.9995% at ~0.1–0.2 µm MPPS |
| Laminar downflow velocity | ~0.3–0.5 m/s (~350–450 air changes/h) |
| Litho-area temperature control | ±0.1 °C; RH ~40–45% |
| Waffle slab thickness / vibration spec | ~1–1.5 m; VC-D/VC-E (6.25 / 3.1 µm/s) |
| OHT vehicle speed / fleet | up to ~5 m/s; ~1,000–3,000+ per GigaFab |
| Process steps at N3/N2 | ~1,300–1,500+ |
| Mask layers / EUV layers at N3/N2 | ~70–100+ / ~20–30 |
| Cycle time | ~3–4 months (~1–1.5 days per mask layer) |
| WIP for 100k wspm at 90 days | ~296,000 wafers (~11,800 lots) |
| Cost of a 100k wspm leading-edge fab | ~$20–30 B; ~70–80% in tools |
| EUV scanner count / price / power | ~30–40; ~$180–220 M; ~1–1.4 MW each |
| Equipment depreciation period | 5 years (TSMC); ~$4,500/h per EUV scanner |
| Depreciation share of wafer cost | ~50–60% in early years |
| N3 / N2 wafer price (as of ~2025) | ~$18–20k / ~$30k |
| GigaFab staffing | ~3,000–6,000 |
| Fab electricity / TSMC share of Taiwan grid | hundreds of MW per site; ~25.6 TWh, ~9% of Taiwan in 2024 (forecasts of ~12–24% by 2030) |
| Fab water use | tens of thousands of tonnes/day per site; UPW at 18.2 MΩ·cm |
| Person particle emission | ~10⁵ (still) to ~10⁷ (walking) particles/min |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| TSMC | Taiwan | Leading-edge foundry; GigaFabs 12/15/18/20/22, Fab 21 Arizona, JASM, ESMC | Leader (~90% of leading-edge logic) |
| Samsung Foundry | South Korea | Pyeongtaek/Hwaseong/Taylor leading-edge logic fabs | #2 foundry |
| Intel Foundry | USA | D1X Oregon R&D, Fab 52/62 Arizona (18A), Ireland Fab 34 | #3 at the leading edge |
| Daifuku | Japan | AMHS: OHT vehicles, rails, stockers, MCS software | Leader |
| Murata Machinery (Muratec) | Japan | AMHS: OHT, stockers | #2 |
| Entegris | USA | FOUPs, reticle pods, filters, purifiers | Leader in FOUPs and contamination control |
| Shin-Etsu Polymer, Miraial, 3S Korea | Japan / Japan / Korea | FOUPs | #2 to niche |
| Applied Materials | USA | Endura/Centura/Producer cluster platforms; SmartFactory MES/APC software | Leader in deposition/etch platforms |
| Lam Research | USA | Etch, deposition, plating, clean platforms | Leader in etch |
| Tokyo Electron (TEL) | Japan | Tracks (~90% share), etch, furnaces, clean, platforms | Leader in tracks |
| ASML | Netherlands | EUV and DUV scanners | Monopoly in EUV |
| KLA | USA | Inspection and metrology (Surfscan SP7, 29xx/39xx series) | Leader (~50%+) |
| SCREEN | Japan | Single-wafer and batch wet cleaning tools | Leader in clean |
| Siemens (Opcenter), IBM (SiView), PEER Group, Cimetrix | Germany / USA / Canada / USA | MES and tool-connectivity software | Commercial alternatives to in-house MES |
| Exyte (M+W), Jacobs, CTCI, United Integrated Services | Germany / USA / Taiwan / Taiwan | Fab design and construction, cleanroom and hook-up contractors | Leaders in fab construction |
| Camfil, AAF, Nippon Muki | Sweden / USA / Japan | ULPA/HEPA filters, FFUs, chemical filters | Leaders in cleanroom filtration |
| Linde, Air Liquide, Air Products, Taiyo Nippon Sanso | Ireland-UK / France / USA / Japan | On-site ASUs, bulk and specialty gases | Leaders in industrial gases |
| Edwards (Atlas Copco), Ebara, Pfeiffer | UK / Japan / Germany | Vacuum pumps and abatement in the sub-fab | Leaders |
| RS Technologies, Pure Wafer | Japan / UK | Test-wafer reclaim | Leaders in reclaim |

## Common Misconceptions

- **"The whole fab is a Class 1 cleanroom."** → Reality: only the mini-environments inside tools and FOUPs are ISO 1–3. The ballroom around them is ISO 5–6, which is why people can work there at all; the FOUP, not the room, protects the wafer.
- **"Wafers move through the fab in a straight line, like a car on an assembly line."** → Reality: the flow is re-entrant. A lot visits the same ~20 tool families dozens of times over ~1,300 steps, and most of its 3–4 month cycle time is spent waiting in queues, not being processed (raw process time is ~20–30% of cycle time).
- **"Fab cost is dominated by the building."** → Reality: ~70–80% of the $20–30 billion is process tools, and tool depreciation over 5 years is ~50–60% of the cost of every wafer. The building is expensive but is depreciated over ~20 years.
- **"Higher tool utilization is always better."** → Reality: queueing (Kingman's formula) makes waiting time explode as utilization approaches 100%. Bottleneck scanners are run at ~85–95%; other tools are deliberately left with slack to keep cycle time and WIP under control.
- **"Fabs run 24/7 because demand is high."** → Reality: they run 24/7 because depreciation is a fixed cost. Each idle hour of a fully staffed, fully equipped fab burns hundreds of thousands of dollars of asset life with no wafers to show for it, regardless of demand; in downturns fabs cut wafer starts and margins collapse.
- **"A new node is 'done' when it enters production."** → Reality: risk production starts with D0 several times higher than maturity. Yield, cycle time, and cost keep improving for 2–3 years through the learning curve, which is why early customers pay more and why old nodes become the profitable ones.

## Where This Fits in the Supply Chain

Module 04 delivered the fab's inputs: polished and epitaxial 300 mm wafers from Shin-Etsu, SUMCO, and GlobalWafers arrive in shipping cassettes and are transferred into the fab's own FOUPs; photoresists, specialty gases, wet chemicals, slurries, targets, and photomasks flow into the sub-fab chemical rooms, gas cabinets, and reticle stockers. This module described the container those inputs enter: the building, the air, the automation, the software, and the economics that govern every one of the ~1,300 steps. Modules 06 through 12 now walk through those steps by mechanism, in the order the wafer meets them, starting with thermal oxidation and thin-film deposition (Module 06), the first things done to a bare wafer after its incoming clean. The fab's outputs, ~3–4 months after wafer start, are completed wafers with ~18 metal levels and pads, which go to wafer sort and test (Modules 13–14) and then to the packaging houses and TSMC's own CoWoS lines (Modules 16–17).

## Further Reading

- Hopp, W. J. and Spearman, M. L., *Factory Physics* (3rd ed., Waveland Press). The standard text on Little's law, Kingman's formula, the operating curve, and re-entrant flow, with semiconductor examples.
- Quirk, M. and Serda, J., *Semiconductor Manufacturing Technology* (Prentice Hall). Chapter-level coverage of cleanrooms, contamination control, wafer fab organization, and yield.
- Van Zant, P., *Microchip Fabrication* (6th ed., McGraw-Hill). Accessible treatment of cleanroom classes, gowning, and fab layout.
- ISO 14644-1:2015, *Cleanrooms and associated controlled environments, Part 1: Classification of air cleanliness by particle concentration*, and SEMI F21 (AMC classification), SEMI E10 (equipment reliability, availability, and maintainability), SEMI E47.1 / E15.1 (FOUP and load port).
- TSMC Annual Reports and the TSMC ESG / Sustainability Report (esg.tsmc.com) for fab locations, capacity, water and electricity data, and depreciation policy.
- Daifuku Co., Ltd., Cleanroom Automation product literature (OHT, stockers, MCS), and Murata Machinery's cleanroom transport pages, for AMHS architecture.
- Applied Materials, Endura and Centura platform technical pages, for cluster-tool architecture.
- Miller, C., *Chip War* (Scribner, 2022). Context on TSMC's rise, Fab 21, and the geopolitics of fab location.
- Rest of World, "TSMC's debacle in the American desert" (2024), and subsequent New York Times and Reuters reporting on Fab 21's hiring, training, and ramp; Reuters coverage of the 2021 Taiwan drought and TSMC's water trucking.
- Asianometry (YouTube) episodes on TSMC's fab construction, AMHS, and the Arizona fab, for well-sourced narrative overviews.
