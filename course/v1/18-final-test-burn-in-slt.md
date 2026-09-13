# Module 18: Final Test, Burn-in and System-Level Test

A packaged Blackwell GPU leaving CoWoS assembly carries roughly $2,500–3,500 of silicon, HBM, interposer and substrate, and it has never been switched on as a system. Wafer sort (Module 14) proved that each GPU die had working transistors and scan chains while it was still on the wafer, driven through a probe card that could not deliver full power, could not see the HBM stacks that were not yet attached, and could not run the 200 Gb/s NVLink lanes at speed. Assembly then subjected the die to reflow at ~250 °C, underfill cure, lid attach and several warpage cycles, any of which can crack a bump, delaminate an interface or open a microbump on an HBM stack. The job of the back-end test chain is to find every one of those problems before the part is soldered to a $30,000 SXM module, then to a $200,000+ HGX baseboard, then into a $3–4 million NVL72 rack, where a single bad GPU can idle 71 good ones. The difficulty is economic as much as technical: each test insertion costs tester time on a machine worth several million dollars, burn-in ties up a 1 kW oven slot for a day or two, and the whole sequence must be tuned so that the escapes it lets through cost less than the screening that would catch them.

This module walks the flow from a package arriving at a test house to a rack passing its final burn-in, with the physics of why each screen works and the arithmetic of what it costs. Module 14 covered the tester itself (Advantest V93000, Teradyne UltraFLEX, scan, BIST, binning, e-fuses); this module concentrates on what changes once the die is in a package.

## The Post-Packaging Flow

For a high-end logic part in late 2026 the sequence is standard enough that the Taiwanese test houses describe it in the same words for every customer. For NVIDIA's Blackwell family the reported flow is a first final test, a burn-in, a second final test, and then a system-level test, which is one more insertion than Hopper received.

| Step | What happens | Typical time per unit | Typical fallout | Where |
|---|---|---|---|---|
| Incoming / package inspection | Visual and sampled X-ray, ball coplanarity, marking read (2D code / ECID) | Seconds | <0.1% | OSAT or test house |
| Final test 1 (FT1) | Full ATE test at hot and/or cold: continuity, leakage, IDDQ, scan, MBIST, HBM interface, SerDes loopback, Vmin/Fmax search, fuse programming | 5–20 min for a large GPU across 1–3 insertions | 2–5% | KYEC, ASE, Amkor, TSMC |
| Burn-in (BI) | 125 °C junction, elevated voltage, dynamic patterns, 4–48 h in a burn-in board and oven | 4–48 h | 0.2–1% (found at FT2) | KYEC, ASE, memory makers in-house |
| Final test 2 (FT2, post-BI) | Reduced ATE program, compare parametrics against FT1 (delta IDDQ, Vmin shift) | 2–5 min | 0.2–1% | Same |
| System-level test (SLT) | Boot real firmware on a board-like fixture, run workloads at temperature | 10–60+ min for a GPU; minutes for a phone SoC | 0.5–2% | KYEC, ASE, ODM, or in-house |
| Outgoing QA (OQA) | Sample re-test, visual, AQL sampling, tray/tape packing, lot traceability | Minutes per lot | ~0.05–0.1% lot reject | Test house |
| Shipment | To the module assembler (Foxconn, Wistron, Quanta) or the customer | Days | | Taiwan to Taiwan/Mexico/US |

Burn-in sits between two ATE insertions because only the ATE can tell whether burn-in changed anything; SLT comes last because it is the longest per unit and should only see parts that already passed everything cheaper. Consumer and automotive microcontrollers run a shorter flow (often a single FT at two temperatures, no BI or SLT); memory runs a longer one with multiple burn-in passes; GPUs and phone SoCs run the full sequence.

## Why Package Test Exists: What Sort Could Not See

A useful way to design a final-test program is to list what wafer sort could not physically do, because that list is exactly the set of failure modes final test must own.

**Interfaces that did not exist at sort.** On a CoWoS package the GPU talks to each HBM3E stack over 1,024 data bits plus command and address, routed through the silicon interposer at ~40–55 µm microbump pitch (Module 17). At sort those signals end at microbumps the probe card cannot usefully contact at speed, and the HBM was not there. Final test is the first time the GPU-to-HBM physical layer is trained: each channel runs link training, the memory controller sweeps read and write timing per lane, and HBM MBIST plus GPU memory patterns exercise all eight stacks at the ~8–9.2 Gb/s per pin of HBM3E. On Blackwell the two GPU dies also talk over the ~10 TB/s NV-HBI die-to-die link across a CoWoS-L bridge, which likewise exists only after assembly.

**Full-power operation.** A probe card feeding an 800 mm² die through several thousand needles is limited by needle current rating (~0.5–1 A each for MEMS probes), contact resistance and path inductance, so sort runs the die at reduced activity. In the package the C4 bumps, substrate power planes and load-board decoupling let the tester push 1,000 A-class currents at ~0.75–0.9 V, and only now can the die run at full thermal design power, where marginal power-delivery paths, IR-drop-sensitive timing and electromigration-prone vias show up.

**High-speed I/O at speed.** Blackwell's NVLink 5 runs at 200 Gb/s per lane (PAM4, 18 links, 1.8 TB/s per GPU); PCIe Gen 5 at 32 GT/s and Gen 6 at 64 GT/s. A probe card is an impedance discontinuity that cannot pass those rates, so sort tests SerDes in low-speed or internal-loopback modes. The final-test socket and load board are controlled-impedance channels, and the ATE either loops each lane back through the socket or uses dedicated high-speed instruments (Advantest's Pin Scale Serial Link and successors) to measure eye height, jitter tolerance and bit-error rate at rate.

**Thermal behaviour.** A die on a sort chuck is heat-sunk by the chuck; the package's real path (die, TIM, lid, thermal head) is different. Final test at controlled junction temperature exposes leakage-driven thermal runaway, temperature-dependent timing paths and thermal-sensor calibration errors.

**Package-induced defects.** Every assembly step can create defects that did not exist at sort: bump cracks from CTE mismatch between a 26 × 33 mm die and an organic substrate; low-k dielectric cracks at die corners where shear stress concentrates; underfill voids that later trap moisture; delamination of lid adhesive or of an HBM stack's NCF; microbump opens on HBM stacks stressed by interposer warpage. These appear as opens, shorts or intermittents that continuity and leakage catch in the first second of FT1, or as marginal timing on a few HBM lanes that only the interface test catches.

## The Test Cell: Handlers, Sockets and Thermal Control

At sort the wafer prober moves the wafer; in final test a **test handler** moves the packages. The tester (V93000 or UltraFLEXplus) is docked to the handler and the handler presents devices to a **load board** carrying **test sockets**.

### Handler architectures

Three families cover the industry. **Pick-and-place** handlers use a gantry with vacuum nozzles to lift devices from JEDEC trays, plunge them into sockets, then sort them into output trays by bin. They handle any flat-topped package (BGA, LGA, QFN) and are the only option for large, high-power parts; throughput is 1,000–10,000 units per hour depending on parallelism and test time. The Cohu MATRiX, Advantest M48xx series (M4841, M4872) and Hon Precision's platforms sit here, and a Blackwell GPU runs at low parallelism (x1 to x4) because each site needs a kilowatt-class thermal head. **Gravity-feed** handlers tilt tracks so that leaded or leadless packages (SOIC, TSSOP, QFN) slide from an input tube into the socket and out again; cheap, fast (10–20k UPH), small packages only. **Turret** handlers hold devices on a rotating table with 16–32 pick heads indexing past test, mark and inspection stations at 30–40k UPH, serving discretes and small QFNs (Cohu via Rasco and Ismeca, Hon Technology, Epson). Memory uses massively parallel pick-and-place with 256–1,024 sockets per insertion because DRAM pattern loops are long and only parallelism makes them economic.

Two handler numbers matter: the **index time** (dead time between devices, typically 0.3–1 s for pick-and-place) and the **contact yield** (fraction of first insertions that make good electrical contact). A failing continuity test triggers an automatic re-insert, and parts that pass on retest are logged as contact issues; test houses watch "bin 2 recovery" closely because a dirty socket can look like a 5% yield drop.

### Sockets

The socket is the consumable at the centre of the cell. For BGA and LGA packages at 0.3–1.0 mm pitch two contact technologies dominate. **Pogo-pin** (spring-probe) sockets use a barrel, plunger and spring per ball, with 15–40 g contact force and tens of milliohms contact resistance; they last ~500,000–1,000,000 insertions and can be built down to ~0.35–0.4 mm pitch. **Elastomer** sockets use a silicone sheet loaded with vertical columns of conductive particles; they have very short electrical length and low inductance (good for high-speed lanes) but shorter life (~50,000–200,000 insertions) and more sensitivity to contamination. Smiths Interconnect, Yamaichi, Johnstech, Leeno, ISC and Enplas supply most of the market. A GPU socket with several thousand contacts, half of them power and ground, and NVLink contacts specified to 20+ GHz is a custom item costing thousands of dollars and lasting weeks in production.

### Thermal control

Final test runs at temperature, and for high-power parts the temperature that matters is the junction, not the ambient. The classic method is **tri-temp**: the handler soaks devices at cold (−40 or −55 °C), room and hot (85–125 °C, up to 155 °C for automotive grade 0) before insertion, with dry air or nitrogen purge against condensation on the cold side. That works for a few watts. A GPU dissipating 500–1,000 W would heat itself by tens of degrees in a second, so modern cells use **active thermal control (ATC)** heads: a liquid- or refrigerant-cooled plate pressed onto the lid through a compliant interface, a heater embedded in the plate, and a controller that reads the on-chip thermal diodes and modulates heating and cooling to hold Tj at set point through the program. Cohu's T-Core is specified to ~800 W of device dissipation with better than ±1 °C accuracy and response faster than 125 °C/s; Advantest's ATC 2.0 on the M4841 runs up to 16 sites in parallel; Hon Precision's liquid-cooled ATC heads for GPU test are rated at 1,000 W (ATC3.3) and 2,000 W (ATC3.5) of device dissipation. The head also makes binning meaningful: Vmin and Fmax must be measured at a defined Tj because leakage and transistor speed both shift with it, and a speed grade assigned at an uncontrolled 60 °C will not hold at 85 °C in a server.

## Package Test Content and Time

A large-die final-test program is a sequence of a few hundred test blocks, in rough order: continuity and leakage (every pin's protection diode forward-biased to confirm contact and that no pin is open or shorted, about one second); power-up and IDDQ (on a 5 nm-class die quiescent current is tens of amps at hot and is used as an outlier screen, not an absolute limit); structural test (compressed scan and logic BIST for stuck-at, transition and small-delay faults, memory BIST on every SRAM with the sort-time repairs re-verified); HBM and die-to-die interface (link training, per-lane margining, HBM MBIST through the base die, full-array patterns at hot); SerDes (PLL lock, loopback BER at rate, eye margin); functional and performance binning (patterns at several voltage-frequency points, with a **Vmin search** setting the part's fused operating voltage and an **Fmax search** setting its speed grade, the point where most die-to-die variation in shipped product is decided); fuse programming and read-back (ECID, voltage, disabled-SM configuration); and analog and thermal blocks (thermal sensor calibration against the ATC head, regulator telemetry, clock generators).

Test time is the cost driver. A loaded V93000 with high-speed instruments costs on the order of $100–300 per hour to own and operate; a GPU that spends 10 minutes across two FT insertions at x2 parallelism consumes ~$15–50 of tester time. For a $30,000 product that is trivial; for a $3 microcontroller the same arithmetic forces test time under one second and parallelism above x64 (Module 14).

## Burn-in: Physics and Practice

### The bathtub curve and infant mortality

Semiconductor failure rate versus time follows the **bathtub curve**: a declining **infant mortality** region, a long flat region of low constant failure rate, and a rising **wear-out** region. The infant-mortality population is parts that passed test but carry a latent defect one stress cycle from failure: a gate-oxide thin spot not yet broken down, a via with a void across 80% of its section, a contact that conducts at room temperature but opens after a few thousand thermal cycles, a particle bridging two lines with a resistive short that has not yet electromigrated into a hard one, a TSV with a seam in its copper fill. Structural test cannot see these because the circuit still works. **Burn-in** deliberately ages the part through the infant-mortality region before shipment, so that parts which would have failed in the customer's first months fail in the oven instead; the price is a small fraction of everyone else's useful life, a tiny number of good parts damaged by the stress, and the oven, board and time.

### Acceleration

Burn-in works because the failure mechanisms that cause infant mortality are thermally and electrically activated. The temperature dependence follows the **Arrhenius relation**: the rate of a process scales as exp(−Ea / kT), where Ea is the **activation energy** in electron-volts, k is Boltzmann's constant (8.617 × 10⁻⁵ eV/K) and T is the absolute junction temperature. The **acceleration factor** between a stress temperature and a use temperature is

AF_T = exp[ (Ea / k) × (1/T_use − 1/T_stress) ].

JEDEC JEP122 tabulates Ea by mechanism: ~0.7 eV is the conventional value for generic defect-driven infant mortality and is what JESD47 and AEC-Q100 assume for HTOL; electromigration is ~0.9 eV; time-dependent dielectric breakdown ~0.6–0.9 eV depending on model; some contamination-driven mechanisms exceed 1.0 eV; hot-carrier injection is close to zero or even negative in Ea, which is why cold test exists. A single number is a compromise, and a burn-in engineer who knows the dominant defect type on a process will adjust.

> **Worked example: acceleration of 125 °C burn-in versus 55 °C use.** Take Ea = 0.7 eV, T_use = 55 °C = 328.15 K (a typical data-centre junction temperature at moderate load), T_stress = 125 °C = 398.15 K. Then 1/T_use − 1/T_stress = 0.0030474 − 0.0025116 = 5.358 × 10⁻⁴ K⁻¹. Multiply by Ea/k = 0.7 / 8.617 × 10⁻⁵ = 8,123 K: the exponent is 4.352, so AF_T = e^4.352 ≈ 78. Every hour in the oven equals ~78 hours of use; a 24 h burn-in is equivalent to ~1,870 h (~2.6 months) and a 48 h burn-in to ~3,740 h (~5 months) of field operation, which is comfortably past where the infant-mortality curve flattens on a mature process. If the use temperature were 85 °C instead (a hot-running GPU at full load), AF_T falls to ~10, and the same 48 h covers only ~3 weeks of field time. This is why data-centre parts are burned in longer than consumer parts, and why the burn-in specification must be written against the customer's actual operating temperature, not a generic one.

Voltage adds a second multiplier. Oxide and interconnect defects accelerate roughly exponentially with over-voltage, AF_V = exp(γ × ΔV), where γ is mechanism- and process-dependent and ΔV is the stress voltage minus the use voltage. Burn-in typically runs VDD 10–20% above nominal (a 0.8 V core at 0.9–0.95 V), which on published models contributes a further ~2–10× acceleration. Combined temperature and voltage acceleration of a few hundred is common, which is how the industry got from the 168 h burn-in of the 1980s to 4–48 h today. The limit is that too much stress starts to consume useful life or damages good parts through mechanisms (bias temperature instability, TDDB on thin oxides) whose Ea and γ differ from the defects being screened; a burn-in that is too hard shows up as a Vmin shift between FT1 and FT2 across the whole population, not just the fallout.

### Static, dynamic and monitored burn-in

**Static burn-in** applies bias and temperature with no switching; it stresses oxides under DC but leaves most nodes fixed and misses defects that need current flow (electromigration, resistive vias). **Dynamic burn-in** clocks the part and drives patterns so that nodes toggle and current flows through the interconnect; on large SoCs the patterns come from on-chip logic and memory BIST at a slow clock, or scan patterns loaded from the burn-in system, and the goal is toggle coverage, not fault detection. **Monitored burn-in** (test during burn-in, TDBI) reads BIST results periodically so that each failure is time-stamped; the fallout-versus-time curve is the data that later justifies shortening the burn-in. Burn-in is not at full power: a GPU cannot run at 1 kW in a 125 °C oven, so patterns run at a fraction of nominal frequency, self-heating is a few tens of watts, and per-slot thermal control (a heater plus liquid cold plate per socket) sets Tj rather than the workload, since even 10% activity would otherwise scatter Tj by tens of degrees across a board.

### Boards, ovens and systems

Devices go into sockets on a **burn-in board (BIB)**, a thick high-Tg multilayer PCB with 8–256 sockets and edge connectors for power and pattern signals. BIBs slide into an **oven** (forced-air chamber at 125 ± 3 °C, sometimes up to 150 °C) whose backplane connects them to a **burn-in system** supplying power, patterns and monitoring. Suppliers include Micro Control Company (high-power, per-DUT thermal control, used for CPUs and GPUs), Aehr Test Systems (packaged-part systems and, distinctively, full-wafer burn-in: the FOX-XP contacts an entire 300 mm wafer and burns in up to 18 wafers per system at up to 3,500 W per wafer, used for silicon carbide and silicon photonics, with a first system shipped for AI-processor wafers in early 2025), Incal, Dong-Il, Chroma and Advantest. KYEC's reported upgrade of its Blackwell slots from ~600 W to ~1 kW of thermal capacity is the visible symptom of GPU power growth reaching the burn-in floor.

A high-power burn-in slot-hour costs on the order of $0.20–1 (oven, board amortisation, power, floor space, handling), so 24–48 h costs ~$5–50 per GPU plus the FT2 insertion: small next to the part's value and the cost of a field failure in a rack, which is why GPUs get burn-in and $3 microcontrollers mostly do not.

### Why some products skip burn-in

On a mature process with good data, 100% burn-in becomes hard to justify: if fallout is 0.05%, the screen costs more than the escapes. The alternatives are statistical. **Part average testing (PAT)**, standardised for automotive in AEC-Q001, fails any device whose parametrics (IDDQ, Vmin, ring-oscillator frequency) are outliers relative to its lot or wafer even though inside datasheet limits, because outliers carry a disproportionate share of latent defects. **Voltage stress at final test** applies the burn-in over-voltage for seconds rather than hours. **Wafer-level burn-in** moves the screen to where a failing die costs $350 rather than $3,000. **Early-life failure rate (ELFR)** sampling per JESD74A monitors whether the population is drifting toward needing the full screen again. The typical trajectory is 100% burn-in during ramp, a data-driven reduction from 48 to 24 to 8 h as monitored-burn-in curves flatten, and eventually a sample or PAT-only regime once field returns and ELFR agree; high-value data-centre parts rarely reach the last step because the cost of an escape is so asymmetric.

### Burn-in versus HTOL

The two are often confused. Burn-in is a production screen on 100% of units, short, and non-destructive by design. **High-temperature operating life (HTOL)**, JESD22-A108, is a qualification test on a sample (three lots of 77 units in JESD47), run for 1,000 h at 125 °C Tj, destructive in intent (parts are stressed to demonstrate the constant failure rate, then scrapped) and performed once per new product or process. HTOL tells you the population's failure rate; burn-in removes the tail from each unit shipped.

## Post-Burn-in Test and System-Level Test

**FT2** re-runs a subset of the FT1 program, typically continuity, leakage, IDDQ, a short scan and MBIST block, the HBM interface and the Vmin point. The interesting output is not only pass/fail but the **delta**: a part whose IDDQ rose 30% or whose Vmin moved 20 mV during burn-in is degrading and is failed even if still within limits. Per-die deltas are possible because each package carries its ECID and the FT1 data is in the test-data database (STDF format, Module 14).

**System-level test** addresses a different gap. Structural test measures a fault model, not a product; a scan program with 99% stuck-at and 90% transition-fault coverage still leaves untested the asynchronous clock-domain crossings, the power-management state machines that switch voltage islands under firmware control, the PLLs during frequency hops, the boot ROM's interaction with external flash, and every path whose timing is only exercised by a real instruction stream. Phone SoCs hit this wall first: escapes of a few hundred DPPM that were invisible to ATE but crashed a phone on boot. Apple's response, from roughly the A-series era, was to run every SoC through an SLT insertion in which the chip boots real firmware on a fixture mimicking the phone's board and runs workloads (camera pipeline, GPU shaders, modem loopbacks, memory stress) at temperature for minutes. Apple's insistence pulled the equipment industry along: Advantest acquired Astronics Test Systems' semiconductor test business in 2019 largely for its SLT platform, Teradyne fields the Titan SLT handler, and Cohu, KYEC and ASE built their own high-density SLT racks.

The mechanics are unlike ATE. There is no million-dollar tester; each of hundreds of slots is a stripped-down application board with a socket, a host controller that loads firmware and workload, a thermal head and a pass/fail interface. Slot cost is ~$5,000–50,000, test time is long (10–60 minutes for a GPU running memory stress, NVLink loopback, matrix-multiply kernels and thermal cycling; minutes for a phone SoC), and throughput comes from parallelism across a rack rather than speed per slot. The content is written by the product's firmware and validation teams rather than the DFT group, and it is the only screen for the "boots, passes scan, hangs after 40 seconds of CUDA" class. On a mature GPU the SLT fallout is ~0.5–2%, nearly all of it parts that passed every ATE block; that number justifies the added insertion.

**Outgoing QA** closes the flow: a sample per lot is re-tested on ATE (acceptable quality level sampling per the customer's spec), visually inspected (ball coplanarity to ~0.1 mm, marking legibility), and sometimes X-rayed; lot documentation links every unit's ECID to its wafer, sort, FT1, BI, FT2 and SLT records. Parts ship in JEDEC trays with humidity indicator cards in moisture-barrier bags, because a large BGA at moisture sensitivity level 3 or 4 that absorbs atmospheric moisture will "popcorn" (delaminate from internal steam pressure) at the module assembler's reflow.

## Reliability Qualification: JESD47 and AEC-Q100

Qualification happens once per product and process, on samples, before volume shipment, and is the evidence that the flow above can be trusted. The two governing documents are JEDEC **JESD47** (stress-test-driven qualification of integrated circuits, for commercial and data-centre parts) and **AEC-Q100** (the Automotive Electronics Council's stress qualification, with temperature grades 0 through 3: grade 1 is −40 to +125 °C ambient, grade 0 is −40 to +150 °C). The stress tests, with their JEDEC method numbers, are:

| Test | Method | Conditions | What it screens |
|---|---|---|---|
| Preconditioning | J-STD-020 / JESD22-A113 | Moisture soak to MSL rating, then 3× reflow at 260 °C peak | Simulates board assembly before every other package stress |
| HTOL | JESD22-A108 | 1,000 h, 125 °C Tj, VDD max, dynamic; 3 lots × 77 units, 0 fails | Constant failure rate (FIT) |
| Temperature cycling | JESD22-A104 | −55/+125 °C or −40/+125 °C, 500–1,000 cycles | Bump, underfill, lid and substrate fatigue |
| HAST (biased) | JESD22-A110 | 130 °C, 85% RH, 96 h, biased | Moisture-driven corrosion, ionic contamination |
| Unbiased HAST | JESD22-A118 | 110 °C, 85% RH, 264 h | Delamination, moisture ingress |
| THB | JESD22-A101 | 85 °C, 85% RH, 1,000 h, biased | Same, slower |
| HTSL | JESD22-A103 | 150 °C, 1,000 h, unbiased | Intermetallic growth, die-attach |
| ESD HBM | ANSI/ESDA/JEDEC JS-001 | Class 2 = 2 kV, though 1 kV is common on large SoCs | Handling damage |
| ESD CDM | JS-002 | 250–500 V | Automated-handling damage |
| Latch-up | JESD78 | ±100 mA injection, 1.5× VDD overvoltage | Parasitic thyristor triggering |
| Early life failure rate | JESD74A | Short burn-in on a large sample (e.g. 800+ units), post-test | Infant-mortality rate; burn-in decision |

For a CoWoS package the package-level stresses (temperature cycling, HAST, HTSL) are where qualification fails most often: the 2.5D structure with an 800 mm²-class die, silicon interposer and 70+ mm organic substrate has a CTE stack that no earlier package had, and early CoWoS qualifications were dominated by interposer cracking and underfill delamination that were fixed by substrate core changes and underfill reformulation.

> **Worked example: converting an HTOL result into a FIT rate.** JESD47 asks for 3 lots × 77 units = 231 units for 1,000 h at 125 °C with zero failures. With the AF_T of ~78 from the previous example (0.7 eV, 55 °C use), that is 231 × 1,000 × 78 ≈ 18.0 million equivalent device-hours at use temperature. JESD85 computes the upper-bound failure rate at a 60% confidence level from the chi-squared distribution: with zero failures, χ²(0.60, 2 d.o.f.) / 2 = 0.916, so λ ≤ 0.916 / 18.0 × 10⁶ h ≈ 5.1 × 10⁻⁸ per hour, or ~51 **FIT** (failures in 10⁹ device-hours). At 90% confidence (χ²/2 = 2.30) it is ~128 FIT. For a 16,384-GPU cluster, 51 FIT per GPU predicts 16,384 × 51 × 10⁻⁹ × 8,760 ≈ 7 constant-rate GPU hardware failures per year from silicon alone; real clusters see far more, which tells you that field failures are dominated by HBM, packaging, module and infant-mortality mechanisms rather than the die's steady-state rate.

## HBM: Known-Good Die, Known-Good Stack and the 2.5D Problem

HBM is the part of the package where test is hardest and the cost of an escape is highest, and it is why "known-good" appears so often in this course.

**Known-good die (KGD) before stacking.** Each DRAM die in a 12- or 16-high stack must be nearly perfect before it is committed, because stack yield compounds: at 99% per die a 12-high stack is 0.99¹² ≈ 89% and a 16-high ≈ 85%, before the base die and TSVs are counted. DRAM sort therefore includes full-array patterns at hot and cold, retention testing (every cell must hold its charge for the refresh interval at 85–95 °C) and **row and column redundancy repair**, in which failing addresses are remapped to spare rows and columns by blowing anti-fuses; post-repair yield determines KGD. Because the TSVs are revealed and the wafer thinned to ~30 µm (Module 15) after the front end, the wafer is probed twice: on the front side before thinning, and on the microbump side after TSV reveal, on a temporary carrier, with probe cards that must contact ~25–40 µm microbumps without damaging them.

**Stack test through the base die.** Once stacked, the individual DRAM dies are no longer accessible to a probe. The JEDEC HBM standard (JESD235 for HBM2/2E, JESD238 for HBM3) solves this by putting test infrastructure into the **base die** (the logic die at the bottom of the stack, built on a DRAM-vendor logic process for HBM3 and increasingly on a foundry logic process, TSMC N12 or N5-class, for HBM4). Two mechanisms are standardised. An **IEEE 1500** wrapper (the standard embedded core test access architecture) gives serial access to test registers in every die in the stack, so that a tester can put each DRAM die into test mode, run its built-in self-test, read results and program repairs. A **direct access (DA) port** exposes a reduced-width test interface on the base die's microbumps so that the stack's full memory array can be tested with a conventional memory tester through a few hundred pads rather than the 1,024-bit-wide interface, which only exists once the stack is mounted on an interposer. The base die also contains MBIST engines, lane-repair logic for the wide interface and **TSV repair**: each group of signal TSVs carries spares, and a TSV found open or resistive at stack test is replaced by remapping to a spare through a multiplexer network. HBM4's move to a 2,048-bit interface and a foundry-built base die expands this test logic further and, on some implementations, lets the base die run memory-controller-like test traffic autonomously.

Stack test is done on the memory vendor's own ATE (Advantest T5503/T5800-class memory testers, high-parallelism handlers) at hot and cold, followed by a stack-level burn-in, and the result is a **known-good stack (KGS)** shipped to TSMC or the OSAT.

**The 2.5D known-good-stack problem.** An HBM3E stack sells for ~$150–300. Once placed on the CoWoS interposer beside a GPU die and underfilled it cannot be removed (rework of a microbumped, underfilled die is impractical, and a hybrid-bonded HBM4 stack more so), so a stack that fails after assembly scraps or downgrades the whole $2,500–3,500 package. The memory vendor must therefore ship at 99.9%-class quality on an interface, the 1,024-bit bus at 8+ Gb/s, that it cannot fully test at speed until the stack is on an interposer, using the DA port and IEEE 1500 as proxies. TSMC mitigates with an intermediate probe after the chip-on-wafer step, before a substrate and lid are consumed. Even so, HBM-attributed fallout at package test is a standing negotiation between GPU vendor, foundry and memory vendor over who pays for the scrapped package; it is why HBM qualification at NVIDIA takes months and why Samsung's HBM3E struggled to qualify through 2024 (stack-level thermal and yield issues; its 12-high HBM3E finally passed NVIDIA's qualification in September 2025, roughly 18 months after development was completed).

## Yield Fallout Along the Chain

Every stage after the fab removes some units, and because the unit's value rises at every step the late losses cost more than the early ones. Illustrative figures for a large AI accelerator on a mature process:

| Stage | Typical yield | Value at risk per unit | Notes |
|---|---|---|---|
| Wafer sort (after harvesting) | 60–80% | ~$350 (die share of a ~$17k wafer) | Poisson yield on 800 mm² is ~45%; harvesting (disabling bad SMs) recovers it |
| HBM incoming (KGS) | 99.5–99.9% | ~$200 per stack | Memory vendor's outgoing quality |
| CoWoS assembly | 97–99% | ~$2,500–3,500 | Chip-on-wafer, wafer-on-substrate, lid; interposer and bump losses |
| FT1 | 95–98% | ~$2,500–3,500 | Interface, bumps, full-power fails |
| Burn-in + FT2 | 99–99.8% | Same | Infant mortality |
| SLT | 98–99.5% | Same | Firmware/workload escapes |
| Module test (SXM) | 98–99.5% | ~$3,500–5,000 with PCB and VRMs | Handoff to Module 19 |
| Board and rack test | 99%+ per GPU | $200k–4M per assembly | Failures are repaired, not scrapped |

> **Worked example: compounded yield through five back-end stages.** Start with 1,000 die that passed sort. Assembly yield 98% leaves 980 packages. FT1 at 96% leaves 941. Burn-in plus FT2 at 99.2% leaves 933. SLT at 98.5% leaves 919. Module assembly and test at 99% leaves 910 SXM modules. The cumulative back-end yield is 0.98 × 0.96 × 0.992 × 0.985 × 0.99 = 0.910, so 9% of sorted die never become a shipped module. Now weight by value. The 20 assembly losses cost the die plus HBM plus interposer, ~$2,000 each if the substrate has not yet been consumed: $40k. The 39 FT1 losses at ~$3,000 each: $117k. The 8 BI/FT2 losses: $24k. The 14 SLT losses: $42k. The 9 module losses at ~$4,000: $36k. Total ~$260k on 910 shipped modules, or ~$285 per good module, which is roughly what the GPU die itself cost and several times the ~$50–150 per unit spent on final test, burn-in and SLT. A one-point improvement in FT1 yield (96 to 97%) is worth ~$30 per shipped unit; on a million units a year that is $30 million, which is why yield engineering continues long after the process is "mature". Contrast with sort, where the 250–300 die lost per 1,000 gross cost only ~$350 each: front-end yield loss is larger in count, back-end loss is larger in dollars per unit.

## DPPM, Field Returns and Failure Analysis

**DPPM** (defective parts per million) is the outgoing quality metric the customer sees. Consumer logic ships at a few hundred to ~1,000 DPPM; automotive customers demand single-digit DPPM and increasingly write "zero defects" into contracts, which in practice means <1–10 DPPM with a corrective-action process for every return; data-centre GPUs sit in between on paper, but the effective requirement is set by fleet economics rather than a contractual number. Meta's published account of Llama 3 training on 16,384 H100s recorded 419 unexpected interruptions in 54 days, of which about 30% were attributed to GPU failures and about 17% to HBM3 faults, roughly one hardware-attributable GPU or memory event every few hours across the fleet. Those rates, corresponding to a few percent of GPUs per year, are why hyperscalers now demand extended burn-in, SLT and telemetry-based screening at module and rack level, and why silent data corruption (a GPU producing wrong arithmetic without an error flag) has become its own test category.

**RMA and failure analysis.** A field-returned GPU follows a fixed path. Non-destructive first: visual inspection, then re-test on ATE in the original program (often 30–50% are "no trouble found", reflecting a system-level or intermittent issue). Then imaging: **2D and 3D X-ray** (Nordson, Zeiss Xradia, Nikon) resolves bump voids, cracks and bridging; **scanning acoustic microscopy (CSAM)**, a 15–230 MHz focused ultrasonic transducer in water, finds delamination because an air gap reflects the pulse with inverted phase, making it the standard tool for lid, underfill and HBM-stack delamination; **lock-in thermography** modulates the supply and locks a thermal camera to the modulation to localise a short to tens of microns with microkelvin sensitivity; **time-domain reflectometry** finds the distance to an open in a package trace. Then destructive: lid removal, **photon emission microscopy** and **OBIRCH** (laser-induced resistance change) to localise the defect on the die, **focused ion beam (FIB)** cross-sections (gallium for precision, xenon plasma for large volumes such as a full TSV stack; Thermo Fisher Helios, Zeiss Crossbeam), and **transmission electron microscopy (TEM)** on a FIB-lifted lamella when the defect is a gate stack, barrier layer or nanometre-scale void. MA-tek and iST are the large independent FA labs in Taiwan; Eurofins EAG serves the US. The output is a root cause, an 8D report and usually a new test block or tightened limit in the production program; this loop is how FT programs grow from a few hundred to a few thousand tests over a product's life.

## Where Back-End Test Happens and What It Costs

Final test is a service industry concentrated in Taiwan. **KYEC** (King Yuan Electronics) is generally described as the largest pure-play test house in the world, with quarterly revenue crossing NT$10 billion for the first time in Q1 2026 (NT$10.19 billion, a record) and a business now dominated by AI logic and HBM-related testing. **ASE** (with SPIL) and **Amkor** combine assembly and test, and Amkor's Peoria, Arizona campus (construction due mid-2027, production from early 2028) will be among the first US advanced-packaging and test sites for CoWoS-class parts; Powertech and ChipMOS specialise in memory and display. NVIDIA owns no test floors: its Blackwell flow is split between TSMC (package-level test after CoWoS on its own testers), KYEC and ASE/SPIL for FT, BI and SLT, with Amkor as overflow, and dies fabricated at TSMC Arizona still return to Taiwan for CoWoS and test. Module-level test moves to the ODMs (Foxconn, Quanta, Wistron, Inventec) in Taiwan and Mexico.

The cost stack per high-end GPU, approximate and as of ~2025–2026: FT1 plus FT2 tester time $15–50, burn-in $5–50, SLT $10–30, consumables and OQA $2–5, or ~$30–150 per unit, 1–5% of a ~$3,000 BOM. The capital behind it is substantial: a V93000 configured with high-speed SerDes and high-current instruments is $3–6 million, a 100-slot high-power SLT rack ~$1–3 million, and a 1 kW-per-slot burn-in system similar per thousand slots; KYEC and its peers spent on the order of $1 billion per year on test equipment through the Blackwell ramp.

## The GPU Flow End to End, and Rack-Level Triage

Pulling the chain together for an NVIDIA data-centre GPU, with the cost of a failure and the time spent at each stage:

| Stage | Location | Test performed | Unit value at risk | Elapsed time |
|---|---|---|---|---|
| Wafer sort | TSMC Taiwan (or KYEC) | Scan, MBIST, IDDQ, SM harvesting, e-fuse | ~$350 per die | Hours per wafer |
| HBM stack test | SK hynix, Samsung, Micron | DA-port array test, IEEE 1500, stack BI | ~$200 per stack | Days |
| CoWoS assembly | TSMC Longtan/Chunan/Chiayi, ASE/SPIL, Amkor | Chip-on-wafer probe, X-ray, CSAM sample | $2,500–3,500 | 2–4 weeks |
| Package test: FT1, BI, FT2, SLT | TSMC, KYEC, ASE | As described above | $2,500–3,500 | ~3–7 days |
| SXM module assembly and test | Foxconn, Wistron, Quanta | AOI, X-ray, power-on, functional, 4–24 h module burn-in in chamber | $3,500–5,000 | ~1 week |
| HGX baseboard (8 GPU + 4 NVSwitch) or GB200 compute tray | Same ODMs | NVLink fabric test, HBM ECC scrub, 24–48 h stress | $200k–500k | ~1 week |
| Server / tray integration | ODMs, Dell, HPE, Supermicro | OS-level stress (NCCL all-reduce, HPL, memory), 24–72 h burn-in | $300k–600k | ~1 week |
| Rack (NVL72) | Foxconn, Quanta, Wistron; Taiwan, Mexico, Texas | Full-rack power and liquid-cooling test, NVLink spine, multi-day stress | $3–4M | 1–2 weeks |

Each level down the table repairs rather than scraps: a GPU failing SLT is scrapped or downgraded, a module failing board test is unplugged and returned to module test, a tray failing rack test is swapped in minutes. The governing principle is the **rule of tens**: the cost of finding a defect rises roughly an order of magnitude at each level of integration (package, module, board, system, field), because each adds disassembly labour, retest time, the idled value of surrounding hardware and, in the field, customer downtime. A $50 package-level screen that removes a defect which would otherwise surface at rack test is cheap even at one catch per thousand parts.

**Rack-level triage** is a telemetry exercise. Every GPU reports through NVIDIA's DCGM (Data Center GPU Manager) and driver **XID** error codes: correctable and uncorrectable HBM ECC counts, NVLink CRC and replay counters, PCIe errors, thermal and power excursions, retired HBM pages. Rack burn-in runs synthetic workloads (all-reduce across 72 GPUs, matrix-multiply loops, memory bandwidth tests) for days while logging these counters, and the pass criterion is not merely "no crash" but thresholds on correctable-error rates and on arithmetic self-checks that catch silent data corruption. A GPU over threshold is identified by ECID and slot, its tray is swapped from spares and sent to a repair depot where the module is retested, the package removed if the fault is confirmed, and returned to NVIDIA for the FA path above; results feed back to the package test program and, if a pattern emerges by wafer lot, to the fab. The same loop runs more slowly on deployed clusters: hyperscaler fleet telemetry is the ultimate outgoing-quality test, and it shapes the next product's burn-in and SLT specifications.

## Key Numbers

| Quantity | Value |
|---|---|
| Blackwell package test flow | FT1, burn-in, FT2, SLT (one insertion more than Hopper) |
| Final-test time, large GPU | ~5–20 min across 1–3 insertions; ~$15–50 tester time |
| Burn-in conditions | 125 °C Tj, VDD +10–20%, dynamic patterns, 4–48 h (168 h historically) |
| Activation energy assumed for infant mortality | ~0.7 eV (JESD47 / AEC-Q100); EM ~0.9 eV |
| Arrhenius AF, 125 °C vs 55 °C, 0.7 eV | ~78 (48 h in oven ≈ 5 months of use) |
| Arrhenius AF, 125 °C vs 85 °C, 0.7 eV | ~10 |
| Burn-in slot thermal capacity for GPUs | Upgraded ~600 W to ~1 kW per slot (KYEC, Blackwell) |
| Active thermal control heads | Cohu T-Core up to 800 W, ±1 °C, >125 °C/s; Hon Precision 1,000–2,000 W |
| Aehr FOX-XP wafer-level burn-in | Up to 18 wafers per system, up to 3,500 W per wafer |
| Socket pitch and life | 0.3–1.0 mm pitch; pogo ~0.5–1M insertions, elastomer ~50–200k |
| HTOL qualification | 1,000 h at 125 °C, 3 lots × 77 units, 0 fails (JESD22-A108) |
| FIT from clean HTOL at 60% confidence, AF 78 | ~51 FIT |
| HAST / uHAST | 130 °C / 85% RH / 96 h biased; 110 °C / 85% RH / 264 h |
| Temperature cycling | −55/+125 °C or −40/+125 °C, 500–1,000 cycles |
| ESD | HBM 1–2 kV, CDM 250–500 V |
| HBM stack yield from KGD | 0.99¹² ≈ 89%; 0.995¹² ≈ 94% |
| HBM3E stack cost vs package at risk | ~$150–300 vs $2,500–3,500 |
| Illustrative back-end yields | Assembly 97–99%, FT1 95–98%, BI+FT2 99–99.8%, SLT 98–99.5% |
| Cumulative back-end yield (5 stages) | ~91% |
| DPPM targets | Consumer ~100s–1,000; automotive <1–10; data-centre set by fleet economics |
| Meta Llama 3 on 16,384 H100s | 419 interruptions in 54 days, ~30% GPU, ~17% HBM3 |
| Back-end test cost per high-end GPU | ~$30–150 (1–5% of BOM) |
| KYEC quarterly revenue, Q1 2026 | >NT$10 billion (~US$315M), record |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Advantest | Japan | V93000 ATE, M48xx handlers with ATC, SLT (ex-Astronics), memory testers | Leader in SoC and memory ATE |
| Teradyne | USA | UltraFLEXplus ATE, Titan SLT handler | #2 in ATE; strong in SLT |
| Cohu | USA | MATRiX pick-and-place, turret and gravity handlers, T-Core thermal control, sockets | Leader in handlers |
| Hon Precision (formerly Hon Technology) | Taiwan | High-power handlers and 1–2 kW liquid-cooled thermal heads for GPU test | Niche leader for AI logic |
| Aehr Test Systems | USA | FOX-XP wafer-level and packaged burn-in | Leader in wafer-level burn-in |
| Micro Control Company | USA | High-power burn-in systems with per-DUT thermal control | Leader in high-power BI |
| Incal, Dong-Il, Chroma | USA / Korea / Taiwan | Burn-in systems and ovens | #2 tier |
| Smiths Interconnect, Yamaichi, Johnstech, Leeno, ISC, Enplas | UK / Japan / USA / Korea / Korea / Japan | Test sockets, pogo and elastomer | Fragmented; Leeno and ISC strong in Asia |
| KYEC | Taiwan | Largest pure-play test house; NVIDIA FT, BI, SLT | Leader in outsourced test |
| ASE / SPIL | Taiwan | OSAT assembly and test, CoWoS overflow | Leader in OSAT |
| Amkor | USA | OSAT, Arizona packaging and test site from 2028 | #2 OSAT |
| TSMC | Taiwan | Package test after CoWoS, chip-on-wafer probe | Foundry, in-house test |
| SK hynix, Samsung, Micron | Korea / Korea / USA | HBM KGD sort, stack test, KGS shipment | SK hynix leader |
| MA-tek, iST, Eurofins EAG | Taiwan / Taiwan / USA | Failure analysis labs | Leaders in independent FA |
| Thermo Fisher, Zeiss, Nordson, Hamamatsu | USA / Germany / USA / Japan | FIB, TEM, X-ray, CSAM, emission microscopy | Leaders in FA tools |
| Foxconn, Quanta, Wistron, Inventec | Taiwan | Module, board, server and rack assembly and test | Leaders in AI server ODM |

## Common Misconceptions

- "Wafer sort already tested the chip, so final test is a formality." → Sort could not test the HBM interface, die-to-die links, full-power operation, at-speed SerDes or any package-induced defect; FT1 fallout of 2–5% on a good process is real and expensive.
- "Burn-in runs the chip at full power in a hot oven." → Burn-in runs low-frequency patterns at a few tens of watts with junction temperature set by the oven and per-slot thermal control; the acceleration comes from temperature and over-voltage, not workload.
- "Burn-in and HTOL are the same thing." → Burn-in is a 100% production screen of hours; HTOL is a sampled 1,000 h qualification that measures the population's failure rate and scraps the samples.
- "System-level test is redundant if scan coverage is 99%." → Scan coverage is against a fault model; SLT catches clock-domain, power-management, firmware and analog-interaction failures that no fault model represents, and its fallout on GPUs is ~0.5–2% of parts that passed ATE.
- "A bad HBM stack costs the price of the stack." → Once on a CoWoS interposer it cannot be reworked; the whole package is lost, which is why HBM must ship at 99.9%-class quality and why HBM qualification takes months.
- "Yield loss is a front-end problem." → Sort loss is larger in count, but back-end losses on a $3,000 package cost several times more per shipped unit than the die losses at sort.

## Where This Fits in the Supply Chain

This module consumes the packaged parts produced in Module 17 (CoWoS assembly at TSMC, ASE/SPIL or Amkor) together with the known-good HBM stacks tested by the memory vendors in Module 15 and the wafer-sort data and fuse maps generated in Module 14. Its outputs are binned, speed-graded, burned-in and system-tested GPU packages, shipped in trays from KYEC, ASE or TSMC to the module assemblers, along with the per-unit test records that follow each ECID for the life of the part. Module 19 picks up at the SXM module: the GPU package is soldered to a PCB with voltage regulators, the module is tested and burned in, then integrated onto HGX baseboards and GB200 compute trays, into servers and finally NVL72 racks, with the rack-level burn-in and triage described at the end of this module closing the loop back to the package test program.

## Further Reading

- JEDEC JESD47, "Stress-Test-Driven Qualification of Integrated Circuits," and JESD22-A108, "Temperature, Bias, and Operating Life" (jedec.org).
- JEDEC JEP122, "Failure Mechanisms and Models for Semiconductor Devices," the reference for activation energies and acceleration models.
- JEDEC JESD74A, "Early Life Failure Rate Calculation Procedure for Semiconductor Components," and JESD85, "Methods for Calculating Failure Rates in Units of FITs."
- AEC-Q100, "Failure Mechanism Based Stress Test Qualification for Integrated Circuits," and AEC-Q001, "Guidelines for Part Average Testing" (aecouncil.com).
- JEDEC JESD238, "High Bandwidth Memory (HBM3) DRAM," for the IEEE 1500 and direct-access test architecture of the base die.
- M. Bushnell and V. Agrawal, "Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits," Springer, 2000.
- Meta AI, "The Llama 3 Herd of Models," 2024, section on training infrastructure and failure statistics.
- Cohu, "T-Core Active Thermal Control System," and Advantest, "M4841 Handler with Active Thermal Control," product and press pages.
- SemiAnalysis, "Aehr Multi-Wafer Level Burn-in Test for Silicon Carbide and Silicon Photonics Applications," 2021.
- DIGITIMES and TrendForce coverage of KYEC and the Blackwell test flow (FT, burn-in, FT, SLT), 2024–2026.
