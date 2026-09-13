# Module 14: Wafer Sort and Test

A finished 300 mm wafer leaving the BEOL has somewhere between 60 and 60,000 candidate dies on it, and the fab has no idea which of them work. Module 13 gave you the statistical picture: a defect density D0 of a few hundredths of a defect per cm², a yield model, an expected fraction of good dies. But a yield model is a forecast, not a sort. Somewhere in the chain, every single die has to be electrically exercised, judged, and either passed forward or thrown away, and it has to happen before the die is bonded, stacked, molded, and soldered into a $40,000 GPU module where it can no longer be separated from its neighbors.

That is what wafer sort does, and it is hard because the thing being measured is a naked piece of silicon with thousands of pads 40 to 60 µm across that must be contacted through a mechanical assembly with micron-level planarity, driven at multi-gigabit data rates, fed hundreds of amps at sub-volt levels, held anywhere from -40 °C to +150 °C, and judged in seconds to minutes on tests that must catch a defect the designers never saw. The equipment costs millions per tool, the consumable probe cards cost as much as a house, and every second of test time is a direct charge against the margin of the chip.

## Why Test Exists: The Rule of Ten

The economic argument for test is the **rule of ten**: the cost of finding and removing a defective part rises by roughly an order of magnitude at each stage it slips through. A bad die caught at wafer sort costs the sort test time, a few cents to a few dollars, and the die itself. The same die caught at final test has also consumed a package, a substrate, an assembly slot, and (in a multi-die package) the good dies packaged alongside it. Caught at board test, it has consumed a printed circuit board and its rework; caught at system test, a server integration slot; caught in the field, a warranty return, a truck roll, and in automotive or data-center contexts, a potential recall or an outage on a cluster billing thousands of dollars an hour. The multipliers are folklore, not physics, but the shape is right, and for advanced packaging the first step is far steeper than 10×, as we will see under known-good-die.

The other reason test exists is that manufacturing defects are random and cannot be designed away. Design verification establishes that the design is correct; it says nothing about whether this particular copy was built correctly. Only measurement does that, and the measurement must be structured so that a defect anywhere among 200 billion transistors produces an observable difference at a pin.

## The Test Flow, in Order

Every advanced chip passes through a sequence of test insertions. This module focuses on the wafer-level ones; Module 18 covers the package-level ones in depth.

1. **Wafer Acceptance Test (WAT)**, also called **PCM (process control monitor)** test. Before any die is probed, the fab probes dedicated test structures in the scribe lines (the ~60 to 80 µm wide kerf between dies that will be destroyed by dicing). These are not the product; they are individual transistors, resistors, via chains, capacitors, and ring oscillators laid out by the foundry to characterize the process itself.
2. **Wafer sort**, also called **circuit probe (CP)** or wafer probe. Every product die is contacted and run through a test program. Result: a wafer map of pass/fail and bin codes per die.
3. Dicing and packaging (Modules 16 and 17).
4. **Final test (FT)**: the packaged part is tested in a handler at one or more temperatures, with full-bandwidth access to its I/O through a socket.
5. **Burn-in**: extended operation at elevated temperature and voltage to precipitate infant-mortality failures.
6. **System-level test (SLT)**: the part runs real firmware and workloads in something resembling its end-use environment, catching the interactions that structural tests miss.

For a CoWoS product like an NVIDIA GPU there are extra insertions in the middle: a test after the chip-on-wafer step, before the interposer is attached to the substrate, and a test of each HBM stack before placement. Every insertion is a fallout point and a cost line, and the purpose of a good wafer sort is to make every downstream insertion see as few bad parts as possible.

### WAT: Testing the Process, Not the Product

WAT is run on a **parametric tester** (Keysight 4080-series and the per-pin P9001A, Keithley S500/S530-series, docked to a TEL or Accretech prober) with a probe card that contacts a block of a few dozen scribe-line pads at a time. Per site, the tester measures on the order of several hundred to a couple of thousand parameters: threshold voltage V_t, saturation current I_dsat, off-state leakage I_off, and subthreshold slope for n- and p-channel devices of several widths and lengths; gate leakage; contact and via resistance from chains of thousands of series contacts; metal sheet resistance and line-to-line leakage on serpentine-comb structures; capacitance; and the frequency of ring oscillators, which integrates all of it into a single number that tracks the "speed" of the wafer. A typical recipe measures 5 to 13 sites per wafer (center, mid-radius, edge in several directions) on every wafer, or every wafer in a sample of lots depending on maturity.

WAT is the foundry's ship/no-ship gate (foundry contracts are written against WAT limits), the feedback loop to the fab (a shift in via-chain resistance points at a specific etch or barrier tool), and the calibration baseline for sort: if a wafer's ring oscillators run 4 percent slow, its sort speed bins will shift accordingly.

## Wafer Sort: The Prober

The **wafer prober** is the mechanical half of a sort cell. It holds the wafer, brings it to temperature, aligns it to the probe card, and steps it from die to die, pressing each die's pads up into the probe tips. The ATE is docked on top; the probe card sits in the prober's head plate; the wafer sits on the chuck below. Two companies make essentially the entire world's supply of 300 mm production probers: **Tokyo Electron** (the Precio family: Precio XL for logic and Precio nano, succeeded since 2021 by the Prexa series, with Prexa MS for full-wafer memory contact) and **Tokyo Seimitsu**, trading as **Accretech** (the UF3000-series, UF3000EX and later). Between them they hold on the order of 80 to 90 percent of the market; the remainder is smaller players and Chinese entrants (Shenzhen-based and Wuhan-based firms) that have been growing under the domestic-substitution push. A production 300 mm prober costs on the order of $0.7 to 1.5 million depending on temperature range and options.

### The Chuck and Positioning

The **chuck** is a vacuum-clamped platen that pulls the wafer's 775 µm thickness flat against a lapped surface and moves it in X, Y, Z, and theta with positioning repeatability of roughly ±1 µm. It must be that good: a tip landing 10 µm off center on a 45 µm pad risks cracking the passivation edge, and on a 40 µm pitch microbump array 10 µm is a quarter of the pitch. The stage uses linear motors on air bearings or precision ball screws with linear encoders on a granite base, and it must hold position while several hundred newtons of probe force push down on it (see the worked example below).

Temperature control is integrated into the chuck: -40 °C to +150 °C on production probers (to +200 °C for wide-bandgap devices), using resistive heaters and chiller or refrigeration loops. The die surface runs hotter than the chuck when the device dissipates power, and for a GPU dissipating hundreds of watts under test the chuck must actively sink that heat, which is why GPU sort chucks are special-order. Cold testing below dew point requires a dry-air or nitrogen purge of the probing chamber to prevent frost, which would short pads and change contact resistance.

Thermal expansion is a first-order problem, not a detail. Silicon's coefficient of thermal expansion is ~2.6 ppm/K. Across a 300 mm wafer, heating from 25 °C to 125 °C expands the wafer by 300 mm × 2.6 × 10⁻⁶ × 100 = 78 µm edge to edge. The probe card, built on a ceramic space transformer and an FR-4 or polyimide PCB with their own expansion coefficients, moves too. The prober therefore soaks the wafer at temperature (minutes), soaks the probe card by parking the chuck under it, and then re-aligns at temperature before the first touchdown; hot alignment and periodic re-alignment during the wafer are standard.

### Alignment and Touchdown

Alignment happens in two halves. A downward-looking camera on the prober bridge finds the wafer's pad pattern by pattern recognition and computes its position and rotation; an upward-looking camera on the chuck images the probe tips from below. From the two, the prober derives a transformation that places each die's pads under the tips to within about ±1 to 2 µm, verified by **probe mark inspection** after the first touchdowns: the prober images the pad and measures where the scrub mark landed relative to pad center.

The **touchdown** is the moment the chuck rises to bring the pads into the tips. The chuck rises until first contact (detected by a contact sense circuit, a capacitive sensor, or simply the known Z height from the tip camera) and then continues upward by a programmed **overtravel**, typically 50 to 100 µm for cantilever cards and 50 to 75 µm for vertical cards. Overtravel is what generates contact force: each probe is a spring, and driving it past first touch compresses it. The force per probe is set by the probe's spring constant and the overtravel, and typically lands at 2 to 8 gram-force (20 to 80 mN) per probe. Cantilever needles also translate along the pad as they deflect, producing a **scrub** of 10 to 25 µm that scrapes through the native aluminum oxide (a few nanometers of Al₂O₃ that forms instantly on exposed Al) to reach clean metal. Vertical probes scrub less, which is why they are preferred on delicate low-k stacks and on solder bumps, where a wiping motion would smear solder onto the tip.

> **Worked example: total probe force on a big-die probe card.** A vertical MEMS probe card for a large GPU die carries ~12,000 probes (several thousand signal pins plus a dense grid of power and ground probes, which are needed to deliver hundreds of amps without excessive voltage drop). At 3 gf per probe, total force is 12,000 × 3 gf = 36,000 gf = 36 kgf, or about 353 N, pushing down on the chuck at every touchdown. A full-wafer DRAM card with 100,000 probes at 2 gf carries 200 kgf, about 2 kN, which is why memory probers are built with reinforced Z stages and why probe cards need a stiffener plate to keep the card from bowing under its own contact force by more than the ~10 µm of planarity budget. This force also sets the mechanical fatigue life of the card and the prober.

The prober then steps: chuck down, move to the next die or group of dies, chuck up. Index-plus-touchdown time is roughly 0.3 to 0.6 s per step, small against a logic test of tens of seconds but a meaningful fraction of a 2 s memory test. Wafer exchange, notch pre-alignment, and full alignment add 1 to 2 minutes per wafer, so probers carry two FOUP ports and a pre-aligner to have the next wafer ready.

## Probe Cards

The **probe card** is the consumable that translates the ATE's pin electronics, arranged on a ~15-inch circular PCB with contact pads on a millimeter-scale pitch, down to probe tips on a 40 to 150 µm pitch that touch the die. It is a mechanical, electrical, and thermal design problem simultaneously, and for advanced logic it is a custom part built for one die design, usually with lead times of 8 to 16 weeks and a cost from $100,000 for a modest device to well over $1 million for a large multi-site logic card or a full-wafer-contact DRAM card.

### Three Architectures

**Cantilever cards** are the oldest: tungsten or tungsten-rhenium needles, ~0.1 to 0.25 mm in diameter, epoxy-mounted around a ring so they fan inward and downward to the die, with 10 to 30 µm tips. They are cheap ($5,000 to $50,000) and repairable, but they scale poorly: the needles reach in from the periphery, so they cannot contact an area array, the long needles have tens of nanohenries of inductance and cannot carry signals much above a few hundred MHz, and pin counts top out in the low thousands. They remain common for analog, power, discrete, and legacy logic.

**Vertical probe cards** were pioneered by IBM in the 1970s as the **cobra** or buckling-beam probe: a straight wire, ~50 to 100 µm in diameter, held between two guide plates (ceramic, laser-drilled with tens of thousands of holes) with a slight offset between them so that under compression the wire buckles predictably in a known direction. Because the probes are vertical, they can contact a full area array, and the guide-plate approach scales to tens of thousands of probes. Modern vertical probes are often called "cobra" generically even when made by Technoprobe, MJC, or JEM.

**MEMS probe cards** replaced hand-assembled wire with lithographically defined springs. FormFactor's MicroSpring (wire-bonded gold springs) started the category in the 1990s; today's advanced cards use photolithography and electroplating to build springs of NiCo or NiMn alloys with rhodium, palladium-cobalt, or other hard tip platings, thousands at a time on a carrier, then transfer them to the space transformer. MEMS tips can be made with a defined geometry (a small flat, a point, a crown for bumps), pitch down to ~40 µm on area arrays and ~20 to 30 µm on some memory cards, spring constants tuned to a few gf, and consistent electrical characteristics probe to probe. The leaders in advanced MEMS cards are **FormFactor** (US), **Technoprobe** (Italy), **Micronics Japan (MJC)**, and **Japan Electronic Materials (JEM)**, with **MPI** (Taiwan) and several Korean suppliers behind them. FormFactor leads the overall probe card market with roughly a quarter to 30 percent share; Technoprobe is a close second and has been gaining at TSMC on 3 nm and 2 nm qualifications; MJC and JEM dominate DRAM full-wafer cards. As of ~2025, the five largest suppliers hold about three quarters of a market of roughly $3 billion per year.

### Anatomy of an Advanced Card

From the ATE downward: a **PCB** of 30 to 60 layers that carries signals inward from the tester's **pogo tower** contact ring, with power-rail decoupling capacitors placed as close to the die as possible because the loop inductance of the power path limits how fast the device can draw current; an **interposer** of spring pins or elastomer to absorb tolerance; the **space transformer**, a multilayer ceramic (LTCC or HTCC from Kyocera, NTK, and others) or organic build-up substrate that translates from ~1 mm pitch to the die's pad pitch in ten or more routing layers; the **probe head** with its guide plates and probes; and a **stiffener** that holds the assembly flat to within ~10 to 25 µm across the array. Planarity is everything: if one corner sits 30 µm high, probes on the low corner see 30 µm less overtravel and may not break through the oxide, while those on the high corner may punch through the pad.

Electrically, even a MEMS card has ~0.5 to 2 nH of inductance and a few hundred milliohms of resistance per probe, with crosstalk between neighbors; this is why full-rate SerDes testing at 100+ Gb/s is generally not done at sort, and why sort tests high-speed I/O via internal loopback or at reduced rate.

### Contact Resistance, Cleaning, Lifetime, and Pad Damage

Each probe-to-pad contact has a **contact resistance (Cres)** that starts below about 1 Ω for a fresh probe on clean aluminum and rises as aluminum debris, oxide, and (on bumped wafers) solder accumulate on the tip. The program monitors Cres through the continuity test on every die, and once it exceeds a threshold of a few ohms, or the continuity fail rate ticks up, the prober performs an **online clean**: the chuck moves under an abrasive medium (a polymer sheet loaded with alumina or silicon carbide grit, or a tungsten-carbide plate) mounted at its edge and touches the probes down a programmed number of times. Cleaning intervals run from every few hundred to every few thousand touchdowns, and each clean removes a little tip material; tip wear and spring fatigue together set a MEMS card's life at roughly 0.5 to 1 million-plus touchdowns, after which it goes back to the vendor for probe-head refurbishment.

Probe marks matter because the same pads must later be wire bonded or bumped. Assembly houses specify a maximum probe-mark area (~25 to 50 percent of the pad) and depth (a fraction of the ~1 µm aluminum thickness; punching through to the barrier causes bond failures). On Cu-pillar and microbump wafers the problem inverts: the tip is harder than the solder, so the risk is deforming the bump height beyond what the later thermocompression bond tolerates, and picking up solder that raises Cres on the next die. Low-force (1 to 2 gf) vertical MEMS probes with small flat tips are used, and some HBM and chiplet designs add sacrificial test pads to avoid touching the fine-pitch array at all.

### The Microbump Problem

For HBM base dies and chiplets on interposers, the I/O is on microbumps at ~40 to 55 µm pitch (about 50 µm through HBM3E, ~40 µm for HBM4's doubled interface) and pushing below, with thousands of bumps in a compact array. Probing a 1,024-bit HBM3 or 2,048-bit HBM4 interface directly is at the edge of probe technology: the pitch is at the limit of guide-plate drilling and MEMS spring fabrication, and the tips must land on ~20 µm solder caps without deforming them. The industry's answer combines very fine-pitch MEMS cards (FormFactor and Technoprobe both ship below 40 µm pitch as of ~2025), the IEEE 1500 wrapper on the HBM base die that exposes the whole stack through a few hundred direct-access pins, and testing the high-speed interface only after assembly. Hybrid-bonded HBM (deferred beyond HBM4, which stays on microbumps) with sub-10 µm pad pitch cannot be probed on its bond pads at all and will rely entirely on test-access pads and built-in self-test.

## The ATE

The **automatic test equipment (ATE)** is the electronic half of the cell: a rack-sized mainframe with a **test head** that docks to the prober (or, at final test, to a handler) via a manipulator. The test head holds the instrument cards; the **device interface board (DIB)**, called a **load board** at final test or a **probe interface board (PIB)** at sort, sits on top of it and connects to the probe card through the pogo tower. Three product families dominate SoC testing worldwide: **Advantest V93000** (the EXA Scale generation since 2020, with SmarTest 8 software), **Advantest T2000** (a modular platform strong in Japanese and mixed-signal markets), and **Teradyne UltraFLEX** and **UltraFLEXplus** (with IG-XL software). Memory testing uses different platforms with massive parallelism: Advantest's T5800-series and Teradyne's Magnum. A high-end configured SoC tester lists at $2 to 10 million and more; the instrument mix is what drives the number, and a GPU sort configuration with thousands of digital channels, high-current power supplies, and serial-link instruments sits at the upper end.

### What Is Inside

**Digital pin electronics** are the core. Each channel has a driver with programmable levels, slew, and termination; a comparator that samples the pin at a programmed time against programmable thresholds; and a **per-pin parametric measurement unit (PPMU)** that forces voltage and measures current (or the reverse) from microamps to hundreds of milliamps. Behind each channel sits deep vector memory (scan patterns are enormous), a timing generator with **edge placement accuracy** of a few tens of picoseconds (V93000 Pin Scale 5000 channels run to 5 Gb/s with ~±25 to 50 ps accuracy at the DUT), and a fail memory that records which vector and pin mismatched so diagnosis can trace a failure back to a scan cell. A test head carries 1,000 to 5,000 such channels for SoC test and tens of thousands for multi-site memory.

**Device power supplies (DPS)** deliver the DUT's rails. A GPU sort needs hundreds of amps at roughly 0.7 to 1.0 V with millivolt regulation and microsecond transient response, because current draw changes by hundreds of amps when a scan pattern starts toggling. Advantest's DC Scale XPS-series and Teradyne's equivalents gang many channels in parallel with remote sensing at the probe card; a configured GPU supply can exceed 1,000 A. The drop across the probe card's power path is the reason for the thousands of power and ground probes noted earlier: at 500 A, even 1 mΩ is 0.5 V, which would collapse a 0.75 V rail. The program compensates with sense lines and by limiting activity during high-current tests.

**Mixed-signal and RF instruments** (arbitrary waveform generators, digitizers, Advantest's Wave Scale series) test analog blocks, PLLs, and PHYs. **Serial-link instruments** generate and check PRBS patterns at tens of gigabits per second with jitter injection to characterize SerDes eye margins. **High-voltage instruments** program e-fuses and run stress tests.

The tester runs a **test program** (SmarTest or IG-XL code: a flow of test suites with limits and bin assignments) that executes each test, assigns a bin, and logs everything to a datalog. A sort cell runs unattended once loaded: the prober reports each die's position over GPIB or Ethernet and the tester returns the bin.

## What a Test Program Contains

A production sort program is a sequence of tests ordered so that the cheapest tests that catch the most failures run first, and a die that fails early is abandoned (**stop-on-fail**) rather than wasting tester seconds. The order below is typical.

**Continuity (opens/shorts).** With supplies off, the PPMU forces a small current (say -100 µA) into each pin and measures the voltage; a working pin shows the forward drop of its ESD diode to ground (~0.5 to 0.7 V), an open reads the compliance limit, a short reads ~0 V. It takes milliseconds, verifies probe contact, and catches gross defects; a continuity fail rate that spikes mid-wafer is the classic signature of a dirty probe card.

**Leakage and IDDQ.** Each rail is powered and its quiescent current measured with the logic in a known state. **IDDQ testing** was once a powerful screen: a CMOS gate at rest draws essentially nothing, so a bridging defect from VDD to ground shows up as excess current. On modern nodes the intrinsic IDDQ of billions of leaky transistors is amperes and varies across the wafer by more than a defect adds, so fixed limits are useless. What survives is **delta-IDDQ** (compare current between vector states; a defect adds a constant, leakage does not change) and per-die outlier analysis, discussed under PAT.

**DC parametrics.** Input thresholds, output drive, pull-up and pull-down resistances, and pin leakages are measured on a sample of pins with the PPMU; on-die regulators and references are measured; internal supply monitors are read.

**Scan / ATPG structural test.** This is the workhorse of digital test and consumes most of the tester's vector memory. During design, every flip-flop was given a multiplexer that, in test mode, connects it into long shift registers called **scan chains**. The tester shifts a pattern into all chains at once (thousands of shift cycles at 50 to 200 MHz), pulses the functional clock for one or two cycles to capture the combinational logic's response, and shifts the result out for comparison while the next pattern shifts in. **ATPG (automatic test pattern generation)** tools (Synopsys TestMAX, Siemens Tessent) compute patterns from a fault model, not from the design's function: the **stuck-at model** asks whether each net could be observed if stuck at 0 or 1; the **transition-delay model** asks whether a slow-to-rise or slow-to-fall net would be caught by a launch-and-capture clock pair at rated speed (**at-speed scan**); bridging, small-delay, and cell-aware models cover defects inside standard cells. A production program targets ~99 percent-plus stuck-at and ~90 percent-plus transition coverage; the last few percent hide behind untestable or clock-domain-crossing logic. **Test compression** (Tessent TestKompress, Synopsys DFTMAX) inserts a decompressor at the chain inputs and a compactor at the outputs so a few dozen tester channels feed thousands of internal chains at 50 to 200× compression; without it, a large GPU's scan data would be many gigabits per die and scan alone would take minutes.

**Memory BIST.** A GPU has hundreds of megabytes of SRAM in thousands of instances (register files, L1, L2). Testing them from the pins would be impossible, so each instance or group has a **memory built-in self-test (MBIST)** controller that runs a **March algorithm**: read and write passes over all addresses in ascending and descending order, with data backgrounds (all 0s, all 1s, checkerboard) chosen to expose stuck cells, coupling faults between neighbors, address-decoder faults, and read-disturb. March C- takes 10n operations for n words; variants for advanced-node SRAM add hammering and retention tests. The controller reports the failing addresses, which feed **built-in self-repair (BISR)**: the memory has spare rows and columns, the repair logic computes a substitution map, the map is programmed into **e-fuses**, and the memory is re-tested. Without repair, a single failed bit among a few billion SRAM bits would scrap the die.

**Functional and at-speed vectors.** Sequences that exercise the design as designed. Functional vectors have low fault coverage per tester second compared to scan, so they are kept short at sort and used for things scan cannot see: PLL lock, reset behavior, and analog-digital interaction.

**Analog and SerDes loopback.** For high-speed I/O, the transmitter is looped back to the receiver either on-die (internal loopback) or through a short trace on the probe card (external loopback), and the receiver's eye monitor and error counter report the margin. This lets a sort program verify PHY functionality without a tester instrument that can run at full line rate through the probe card's parasitics. Full-rate characterization is a final-test and SLT job.

**High-voltage stress and e-fuse programming.** Where the design has a burn-in-like stress mode (elevated VDD for a few seconds to weaken marginal gate oxide), it is often run here. E-fuses are then programmed: repair solutions, analog trim values, the **electronic chip ID (ECID)** encoding lot, wafer, and X-Y position, feature disables for partial-good configurations, and security keys. Polysilicon or metal e-fuses are blown by driving ~10 mA-class current through a narrow link until it electromigrates open; antifuses (oxide breakdown) are the alternative. Programmed values are read back and verified in the same insertion.

## Design for Test

None of the above is possible unless the chip was built to be tested. **Design for test (DFT)** is the collection of on-chip structures inserted during implementation, and on a large SoC it consumes several percent of die area and a measurable fraction of the design schedule.

- **Scan chains** and **compression**, as above. On a big die, DFT inserts hundreds of chains, each thousands of flops long, with on-chip clock controllers for at-speed launch.
- **IEEE 1149.1 (JTAG)**: the five-pin (TCK, TMS, TDI, TDO, TRST) test access port and boundary-scan register that lets a tester drive and observe every I/O pad through a serial interface, originally for board-level interconnect test, now also the front door to all other on-chip test infrastructure.
- **IEEE 1500**: a standardized **core wrapper**, a boundary register around an IP block that isolates it so it can be tested independently of the surrounding logic. Every hard IP in a modern SoC (a PCIe PHY, an HBM PHY, a licensed CPU core) comes with its 1500 wrapper. The HBM standard adopted 1500 as the test interface to the stack.
- **IEEE 1687 (IJTAG)**: a hierarchical network of instruments behind the JTAG port, described in a standard language so tools can automatically generate the access sequences for hundreds of embedded instruments: BIST engines, sensors, PLL test modes.
- **IEEE 1838**: the newer standard for test access through 3D-stacked dies via TSVs, relevant to HBM and SoIC-type stacks.
- **MBIST** and **BISR** for memories, **logic BIST (LBIST)** where a pseudo-random pattern generator and signature analyzer exercise the logic without external vectors (used for in-field self-test in automotive), and **analog BIST** for PLLs, ADCs, and PHYs.
- **On-die monitors**: ring oscillators, temperature sensors, voltage droop monitors, and aging sensors (proteanTecs and Synopsys SLM sell these as IP), logged at every insertion as part of the die's lifetime record.

The DFT architecture sets the test cost for the product's whole life: poor compression or long chains cost tester seconds on every die, while strong BIST coverage allows fewer channels and more sites in parallel.

## Multi-Site Testing and the Economics of Tester Time

A tester costs a fixed amount per hour whether it tests one die or sixteen, so the industry's main lever on test cost is **multi-site testing**: contacting and testing several dies on one touchdown. Site count is limited by tester resources (channels, supplies, and instruments must be replicated per site), probe card complexity, and die size. Memory, with a few dozen pins per small die, goes to the extreme: full-wafer-contact cards touch every die on a 300 mm DRAM or NAND wafer at once, hundreds to more than a thousand sites, and the wafer is tested in one or a handful of touchdowns. Small logic and mixed-signal dies run 8 to 64 sites. A reticle-sized GPU with thousands of pads and a multi-hundred-amp power budget is tested one or two sites at a time; the tester has no room for more GPU-class supplies and serial-link instruments, and the wafer only carries ~60 to 70 candidate dies anyway.

The cost of a tester-second is commonly quoted at ~$0.01 to 0.05, with the high end for a fully loaded high-end SoC cell. It is derived as follows.

> **Worked example: cost per die at sort.** Take a GPU sort cell: a $6.0 million ATE configuration, a $1.0 million prober, and $0.5 million per year for probe cards (two $400k cards in rotation, plus refurbishment). Depreciate the capital over 5 years: ($7.0M / 5) = $1.4M per year. Add probe cards ($0.5M), maintenance and service contracts (~8 percent of capital, $0.56M), floor space, power, and labor (~$0.4M): total ~$2.9M per year. A well-run cell is in productive test about 85 percent of the 8,760 hours in a year (the rest is wafer exchange, cleaning, calibration, and program changes), so 7,450 productive hours. Cost per hour is $2.9M / 7,450 = ~$390 per hour, or ~$0.108 per second; a leaner cell with a $3M tester lands nearer $0.05 per second. Now apply it to a GPU. A single-site sort program with continuity, scan with compression, MBIST with repair, loopback, and e-fuse programming, executed at hot and at room temperature in two insertions, might run 240 s per die total. Cost: 240 s × $0.108 = ~$26 per die, before final test, burn-in, and SLT. Against a die whose manufacturing cost is on the order of $300 to 400 (a ~$18,000 4N-class wafer yielding roughly 50 good dies of ~800 mm²), sort is ~7 percent of die cost, and the whole test chain for a GPU module can approach $100 or more per unit. Now compare a 100 mm² mobile SoC tested 16 sites at once for 25 s per touchdown on a $0.05 per second cell: 25 s × $0.05 / 16 = $0.078 per die (a little more in practice, since multi-site efficiency is ~90 to 95 percent rather than 100 percent because of serialized instrument use). That die costs ~$15 to make, so sort is ~0.5 percent. Multi-site is why small-die test is cheap and single-site is why GPU test is not.

The wafer-level throughput implication is worth stating: at 65 candidate dies and 240 s each, a GPU wafer occupies a sort cell for over 4 hours. A product line consuming 100,000 wafers a year needs on the order of 400,000 to 450,000 cell-hours, or 55 to 60 sort cells running continuously, before final test and SLT capacity is counted. This is why NVIDIA's ramp of Blackwell was gated in part by test capacity at KYEC and TSMC and why KYEC's 2025 capital expenditure hit a record ~NT$37 billion, most of it Advantest testers.

Test-time reduction is therefore a discipline of its own: ordering tests to fail early, removing tests that yield learning shows never fail alone, maximizing scan shift frequency, and pushing coverage into BIST engines that run inside the die while the tester waits.

## Coverage, Escapes, and DPPM

Every test program is a compromise between test time and **test escapes**: defective dies that pass. The metric is **DPPM** (defective parts per million shipped), and the customer's specification (~500 to a few thousand DPPM for consumer, below 10 DPPM targeted for automotive) sets the coverage the program must achieve. The classic relationship is the **Williams-Brown model**, which relates defect level DL (fraction of shipped parts that are defective) to yield Y and fault coverage T:

DL = 1 − Y^(1 − T)

The intuition: if a die has a defect (probability 1 − Y), the test misses it with probability roughly (1 − T) in the fault-count sense, and the expression above is the exact form under the model's assumptions of independent, equally likely faults.

> **Worked example: DPPM versus coverage.** A large die yields Y = 0.70 at sort. With stuck-at coverage T = 0.99: DL = 1 − 0.70^0.01 = 1 − exp(0.01 × ln 0.70) = 1 − exp(−0.003567) = 0.00356, or ~3,560 DPPM. Raise coverage to T = 0.999: DL = 1 − 0.70^0.001 = 0.000357, or ~357 DPPM. At T = 0.9999, ~36 DPPM. Each additional "nine" of coverage cuts escapes tenfold, and note that a die that yields worse (Y = 0.5) at the same coverage escapes more (1 − 0.5^0.01 = 6,900 DPPM), which is why low-yield early production ships with more escapes and why final test and SLT exist to mop them up. The model overstates the effect of the last nines (real defects are not equally likely and several fault models overlap), but the direction is right and the arithmetic is what drives the demand for at-speed and cell-aware patterns on top of stuck-at.

Escapes are not uniformly distributed, and that fact is the basis for the statistical methods described under adaptive test.

## Binning at Sort

The output of sort is not just pass/fail. Each die is assigned a **hard bin** (a small number of categories: pass, fail continuity, fail scan, fail MBIST, and so on) and a **soft bin** (a fine-grained failure or grade code, hundreds of them, used for yield analysis). Passing dies are further graded.

**Speed binning.** The test program runs a **V_min search** (lower the supply voltage in steps while running at-speed scan or a functional loop until the die fails; the last passing voltage is V_min) and an **F_max search** (raise frequency at fixed voltage), sometimes visualized as a **shmoo plot** of pass/fail over the voltage-frequency plane. Ring-oscillator frequencies from the on-die monitors are read as a fast proxy. Dies are graded into bins that correspond to product SKUs or to the voltage-frequency curves that firmware will later program; a die with a lower V_min at the target frequency will run cooler at the same performance, and in a data-center GPU, where power is the constraint, the better bins go to the flagship SKU.

**Partial-good harvesting.** A reticle-sized die with ~140 or more streaming multiprocessors will almost never have every unit functional at 5 nm-class defect densities, so the design includes unit-level redundancy: the GH100 die has 144 SMs physically and the H100 SXM product ships with 132 enabled. Sort determines exactly which SMs, cache slices, and memory channels are defective, and e-fuses record the disable map, so a die with a bad SM becomes a good product rather than scrap. This is the largest lever on effective yield for large dies, and it is why the yield that matters for a GPU is not "fraction of perfect dies" but "fraction of dies meeting the harvest floor."

**Wafer maps and traceability.** Decades ago, failed dies were physically inked so the die-attach operator could skip them. Today the result is an **electronic wafer map** (SEMI E142 XML, or the older SINF and vendor formats) that travels with the wafer to the assembly house, whose pick-and-place equipment picks only the bins it is told to, with speed bin and harvest configuration encoded so dies for different SKUs can be separated. The ECID burned into e-fuses at sort ties every die to its lot, wafer, and X-Y position for life; every later insertion reads it and appends results, so a field return traces back to the sort datalog, the WAT data for its wafer, and the fab tool history for its lot.

## Known-Good-Die

A **known-good-die (KGD)** is a bare die tested to the same confidence level as a packaged, final-tested part. The concept dates to the 1990s multichip-module era, but chiplets and HBM have made it the central economic problem of advanced packaging. A Blackwell-class package carries two ~800 mm² GPU dies and eight HBM3E stacks of 8 to 12 DRAM dies plus a base die each, on a CoWoS-L interposer: roughly a hundred dies and thousands of dollars of HBM, interposer, and substrate are committed at assembly, and if any one die is bad beyond what redundancy can repair, the package is scrapped, because there is no rework for a thermocompression- or hybrid-bonded stack.

> **Worked example: escapes in a multi-die stack.** Suppose each DRAM die in an HBM stack is shipped at 500 DPPM after the memory maker's wafer test and repair, and each GPU die at 300 DPPM after sort. A package with 8 stacks × 12 DRAM dies + 8 base dies + 2 GPUs = 106 dies. The probability the package contains no escaped die is (1 − 0.0005)^104 × (1 − 0.0003)^2 ≈ 0.949 × 0.9994 ≈ 0.948. So ~5 percent of packages, each carrying more than $10,000 of good parts, would fail at package test from escapes alone, before any assembly-induced defects. Push the DRAM escape rate to 50 DPPM and the loss falls to ~0.5 percent. That difference is worth tens of millions of dollars a year on a high-volume product, and it is why HBM vendors run extended tests on every die, why NVIDIA specifies test coverage to its memory suppliers, and why the HBM stack is tested again as a **known-good-stacked-die (KGSD)** after stacking and before it is shipped to TSMC.

Achieving KGD at wafer level runs into the limits described earlier: probe cards cannot exercise high-speed I/O at full rate, cannot deliver full-load power without large voltage drops, and cannot always apply final-test thermal conditions. So KGD is approached by moving coverage into the die (BIST, loopback, wrappers), testing at multiple temperatures at sort, running voltage stress at sort where possible, and statistically screening the residual (see adaptive test). For HBM, the IEEE 1500 direct-access port and the base die's own test engines let the full stack's arrays be tested through a few hundred pins, with repair applied after stacking.

## Test at Temperature: The Hot and Cold Split

Defects and marginalities are temperature dependent in opposite directions. Leakage grows exponentially with temperature, transistors slow, and metal resistance rises, so a hot test (85 to 125 °C at the chuck) catches timing-marginal paths, IDDQ outliers, and thermally activated bridging. Cold (−40 °C, or 0 °C for many commercial products) speeds up transistors and exposes hold-time violations and certain analog and I/O failures. Automotive parts are tested at three temperatures at final test and often two at sort; consumer SoCs typically get one hot sort; data-center GPUs are sorted hot, with cold characterization on samples. Each temperature is a separate insertion or soak, so the hot/cold split is a direct cost driver, and a standard cost reduction on a mature product is to prove statistically that the cold test never uniquely catches a failure and then remove it.

## Adaptive Test and Data Analytics

Fixed test limits, applied identically to every die, are inefficient: a limit tight enough to catch subtle defects rejects good dies at the process corners, and a limit loose enough to pass the corners lets defective dies through. The remedy is to compare each die not against a fixed number but against its neighbors.

**Part average testing (PAT)**, formalized in the Automotive Electronics Council's AEC-Q001, computes each parametric test's distribution across a population (a lot in static PAT; the wafer or a moving window in **dynamic PAT (DPAT)**) and sets limits at the mean ± 6σ or a robust median-based equivalent. A die whose IDDQ, V_min, or ring-oscillator frequency is within datasheet limits but far outside its wafer's own distribution is rejected as an outlier, on the principle that a die unlike its neighbors probably contains a defect the functional tests did not directly detect. **Nearest-neighbor residual (NNR)** methods model each parameter as a smooth function of wafer position and flag dies with a large residual, removing the radial variation that would otherwise widen DPAT limits. **Good-die-in-bad-cluster (GDBC)** rules reject a passing die surrounded by failures, since defects cluster spatially (Module 13's negative-binomial model).

These methods embody the automotive **zero-defect** mindset: accept some yield loss (typically 0.5 to 2 percent of good dies) for a large reduction in DPPM. The same techniques have moved into data-center silicon, where a field failure in a GPU cluster justifies the yield hit. **Adaptive test** generalizes this to the flow itself: based on results so far, a wafer well within distribution skips a redundant test, a die marginal on V_min gets an extended list, and a lot flagged by the fab for an excursion gets 100 percent cold test where the baseline flow samples it.

## Test Data: STDF and the Loop Back to the Fab

Every test on every die produces a record, and the industry-standard container is the **Standard Test Data Format (STDF)**, a binary format originated by Teradyne in the 1980s and now at version 4. An STDF file carries lot and wafer identification, the test program name and limits, and per-die per-test results, at a volume of megabytes to gigabytes per wafer for a rich parametric program. Downstream software (PDF Solutions Exensio, Synopsys Silicon.da and the broader Silicon Lifecycle Management suite, yieldWerx, Optimal+ now within NI/Emerson, Advantest's ACS platform, and in-house systems at every large fabless company) ingests STDF from all test insertions, joins it by ECID, and produces the analyses that drive yield learning:

- Wafer maps of every parameter, revealing spatial signatures: a radial gradient (deposition uniformity), a scratch-shaped line (handling), a repeating reticle-shot pattern (mask or lithography), an edge ring (edge bead or CMP).
- Correlation of sort bins against WAT parameters and fab tool history, so a step in the speed-bin distribution can be traced to the exposure tool or etch chamber that ran the lot.
- Failure-mode Pareto charts by soft bin, feeding the fab (systematic defects) and the design team (coverage holes, marginal circuits).
- Scan diagnosis: the tester's fail log is fed back into the ATPG tool, which computes the most likely failing net; aggregated over thousands of dies, this **volume diagnosis** pinpoints systematic defects (a specific via layer, a specific standard cell) that inline inspection could not see, confirmed by FIB cross-section.

This loop is what turns a 30 percent yield ramp into 85 percent mature yield over the first year of a node, and test data is its richest single source.

## GPU-Specific Test Challenges

A data-center GPU compounds every difficulty in this module.

**Power.** A 700 to 1,200 W device cannot run at full load at sort; the probe card's power path and the chuck's thermal capacity do not allow it. Sort is designed around a fraction of TDP by testing subsets of SMs at a time, using on-die power gating, and keeping at-speed windows short. The transient when a scan pattern begins toggling can be hundreds of amps in nanoseconds; on-card and on-die decoupling (MIM and deep-trench capacitors) must supply it because the DPS cannot respond fast enough, and a droop below V_min causes a false fail that on-die droop monitors help diagnose.

**Thermal.** The die heats locally where the pattern is active; a hot spot 30 °C above the chuck changes local timing and leakage, so programs distribute activity, include cool-down pauses, and read on-die temperature sensors to confirm the intended test temperature was actually achieved.

**HBM interface.** The GPU's HBM PHYs face the interposer through thousands of microbumps per stack. At sort they are tested through loopback and the IEEE 1500 wrapper, with the microbump array probed at reduced pin count or not at all; the interface is fully tested only after chip-on-wafer assembly, which is why the CoW-stage test is a required insertion and why a failing HBM interface there scraps a package's worth of parts.

**Scale and sensors.** Hundreds of scan chains, thousands of memory instances, dozens of PLLs and PHYs, and a redundancy map with hundreds of entries produce a test program with tens of thousands of tests and a development effort measured in engineer-years. On-die ring oscillators, droop monitors, and temperature sensors are read at every insertion and serve as the primary inputs to PAT and lifetime analytics; a die whose sensors drift between sort and final test is a candidate escape.

## Who Does the Testing

Three kinds of organizations run wafer sort.

**Foundries.** TSMC's back-end organization, branded as its Advanced Packaging and Testing business (**AP&T**) and operating a series of Advanced Backend Fabs in Taiwan, performs WAT on every wafer and does sort and CoW-stage test for its integrated CoWoS and SoIC customers, since those flows require test between assembly steps that happen inside TSMC. Samsung and Intel Foundry have equivalent organizations.

**OSATs and pure-play test houses.** **ASE** (with SPIL), **Amkor**, **JCET**, and **Powertech (PTI)** all offer sort, but the largest volume of NVIDIA and other high-end sort in Taiwan goes to **King Yuan Electronics (KYEC)**, the world's largest pure-play test house and the second-largest test provider overall after ASE, with 2025 revenue of ~US$1.1 billion dominated by AI and HPC devices and a ~NT$37 billion 2025 capex program almost entirely for Advantest testers and TEL/Accretech probers. KYEC announced in 2026 a US facility of up to US$1.4 billion to support American CoWoS capacity. Other Taiwanese specialists include **Ardentec** (wafer probing, UMC-affiliated), **Sigurd**, **ChipMOS**, and **Chipbond**. Test is even more Taiwan-concentrated than assembly because it sits between TSMC's fabs and TSMC's CoWoS lines.

**Fabless companies' own test engineering.** NVIDIA, AMD, Apple, Qualcomm, and Broadcom do not own testers in volume, but they write and own the test programs, specify the probe cards, correlate results across sites, and negotiate test-time budgets with the OSAT. A GPU test program encodes the redundancy architecture and the SKU strategy and is treated as design IP. **IDMs** (SK hynix, Samsung, Micron, Intel) test in-house at wafer level, since memory repair and HBM stacking must be tightly coupled to manufacturing.

## The Equipment Market

The ATE market is a duopoly. **Advantest** (Japan) held ~56 percent of the SoC tester market in 2024 and, by its own reporting, ~66 percent in 2025 on V93000 EXA Scale wins in AI accelerators and HBM; **Teradyne** (US) holds most of the remainder, ~30 to 40 percent, strongest in mobile SoCs and in memory with Magnum. Together they hold ~80 to 90 percent of total ATE revenue, which has run at roughly $6 to 9 billion per year through the AI upcycle. The rest is **Cohu** (US), **Chroma** (Taiwan), and Chinese entrants **Hangzhou Changchuan** and **Beijing Huafeng**, growing in domestic mature-node markets under export-control pressure. Probers are the TEL and Accretech duopoly. Probe cards are led by FormFactor (~$0.8 billion revenue, roughly a quarter or more of a ~$3 billion market), Technoprobe (a strong second, fastest-growing at TSMC's leading nodes), MJC, JEM, and MPI, with the top five holding about three quarters of the market as of ~2025.

## Key Numbers

| Quantity | Value |
|---|---|
| Rule of ten | Cost of a defect escaping rises ~10× per stage (die, package, board, system, field) |
| Prober chuck positioning repeatability | ~±1 µm |
| Prober temperature range | −40 °C to +150 °C (to +200 °C on some) |
| Silicon thermal expansion across 300 mm, 25 → 125 °C | ~78 µm (2.6 ppm/K) |
| Probe overtravel | 50–100 µm cantilever; 50–75 µm vertical |
| Probe contact force | ~2–8 gf per probe; 1–2 gf on solder bumps |
| Scrub mark length (cantilever) | ~10–25 µm |
| Probe count, large logic card | ~10,000–30,000 probes |
| Probe count, full-wafer DRAM card | 100,000+ probes, hundreds to 1,000+ sites |
| Minimum production probe pitch (MEMS, area array) | ~40 µm and below (HBM microbumps) |
| Probe card cost | $5k–50k cantilever; $100k–$1M+ advanced MEMS |
| Probe card lifetime | ~0.5–1M+ touchdowns before refurbishment |
| Fresh contact resistance | < ~1 Ω per probe; cleaning triggered at a few Ω |
| ATE system cost | $2–10M+ per configured SoC tester |
| ATE timing accuracy | ~±25–50 ps edge placement at the DUT |
| Digital channel data rate | ~5 Gb/s; serial-link instruments to tens of Gb/s |
| GPU sort supply current | Hundreds of A to > 1,000 A at ~0.7–1.0 V |
| Scan coverage targets | ~99%+ stuck-at, ~90%+ transition delay |
| Scan compression ratio | ~50–200× |
| Tester cost per second | ~$0.01–0.05 (up to ~$0.10 for a fully loaded GPU cell) |
| Williams-Brown escapes at Y = 0.7 | T = 0.99 → ~3,560 DPPM; T = 0.999 → ~357 DPPM |
| H100 SM harvest | 144 SMs on die, 132 enabled on H100 SXM |
| Advantest / Teradyne SoC tester share | ~56% / ~35–40% (2024); Advantest ~66% (2025) |
| Probe card market | ~$3B/yr; FormFactor leader, Technoprobe #2; top 5 ~75% |
| KYEC 2025 revenue / capex | ~US$1.1B / ~NT$37B (record, mostly testers) |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Advantest | Japan | V93000 EXA Scale and T2000 SoC testers, T5800 memory testers, ACS analytics | Leader in SoC and memory ATE (~55–65% SoC) |
| Teradyne | US | UltraFLEX / UltraFLEXplus SoC testers, Magnum memory testers, STDF originator | #2 in ATE (~30–40%) |
| Tokyo Electron | Japan | Precio- and Prexa-series 300 mm wafer probers | Co-leader in probers |
| Tokyo Seimitsu (Accretech) | Japan | UF3000-series wafer probers | Co-leader in probers |
| FormFactor | US | MEMS probe cards (logic, DRAM, NAND), engineering probe systems | Probe card leader (~25–30%) |
| Technoprobe | Italy | Vertical MEMS probe cards for advanced logic | #2, gaining at TSMC N3/N2 |
| Micronics Japan (MJC) | Japan | Full-wafer DRAM probe cards, logic cards | #3; DRAM leader |
| Japan Electronic Materials (JEM) | Japan | Vertical and MEMS probe cards | Top 5 |
| MPI Corporation | Taiwan | Probe cards, engineering probers | Top 5, niche |
| King Yuan Electronics (KYEC) | Taiwan | Pure-play wafer sort and final test; NVIDIA's main test house | Largest pure-play test house |
| TSMC (AP&T / Advanced Backend Fabs) | Taiwan | WAT, sort and CoW-stage test for CoWoS/SoIC flows | Integrated foundry test |
| ASE / SPIL | Taiwan | OSAT assembly and test | Largest OSAT overall |
| Amkor | US | OSAT assembly and test | #2 OSAT |
| Ardentec | Taiwan | Wafer probing services | Niche specialist |
| Synopsys (TestMAX, SLM) | US | ATPG, DFT insertion, on-die monitors, test analytics | Co-leader in DFT EDA |
| Siemens EDA (Tessent) | US / Germany | ATPG, TestKompress compression, MBIST, IJTAG | Co-leader in DFT EDA |
| PDF Solutions (Exensio) | US | Test and yield data analytics | Leader in analytics |
| Cohu | US | Handlers, contactors, lower-end ATE | Niche / #3 in ATE |
| Keysight / Keithley (Tektronix) | US | Parametric testers for WAT | Leaders in parametric test |

## Common Misconceptions

- **"Test just checks whether the chip works."** → Reality: test is a structured search for manufacturing defects using fault models (stuck-at, transition, cell-aware) that have nothing to do with the chip's function; functional vectors are a small and inefficient part of a modern program. A passing chip has been shown to be free of a specific list of modeled defects to a quantified coverage, nothing more.
- **"Wafer sort finds all the bad dies, so final test is a formality."** → Reality: probe-card parasitics, power delivery limits, and single-temperature testing leave real coverage gaps at sort; the Williams-Brown arithmetic guarantees escapes, and final test, burn-in, and SLT exist to catch them. Sort's job is to keep the escape rate low enough that downstream insertions are economical.
- **"Test cost is negligible."** → Reality: for a small die tested 16 sites in parallel it is under a percent of die cost, but for a single-site reticle-sized GPU tested at multiple temperatures it is several percent at sort alone and approaching $100 per unit across all insertions; test capacity was a genuine gating item in the Blackwell ramp.
- **"A tester is a fast computer that runs the chip."** → Reality: an ATE is a rack of precision instruments (drivers, comparators, PMUs, multi-hundred-amp supplies, serial-link generators) with picosecond timing that runs pre-computed vectors; it does not execute the chip's software, and at sort it cannot even run the chip at full power.
- **"Yield means the fraction of perfect dies."** → Reality: for large dies, most shipped products have disabled units. Partial-good harvesting via e-fuse configuration (144 SMs built, 132 enabled) is the primary yield lever, and sort is where the harvest decision is made.
- **"The probe card is a simple fixture."** → Reality: an advanced MEMS probe card is a $1 million, 12-week-lead-time custom precision instrument with tens of thousands of lithographically fabricated springs, a multilayer ceramic space transformer, and planarity specs of ~10 µm, with its own lifetime, cleaning schedule, and failure modes.

## Where This Fits in the Supply Chain

Wafer sort consumes finished wafers from the BEOL (Module 12) together with the WAT data and inline inspection records from Module 13, and it is the point where Module 13's yield model becomes a measured number: sort yield per wafer, the failure Pareto, and the wafer maps that go back to the fab as the primary yield-learning feedback. Its outputs are an electronic wafer map with hard bins, speed bins, and harvest configurations for every die, an ECID and repair map burned into each die's e-fuses, and a datalog in STDF that follows the die for life. The wafer then ships (from TSMC's fab to TSMC's Advanced Backend Fab, or to KYEC and then to an OSAT) into Module 15's memory world in the case of HBM and into Modules 16 and 17 for dicing and packaging, where the pick-and-place equipment reads the map and picks only the dies sort declared good. Module 18 picks the story up at final test, burn-in, and system-level test, where the escapes that this module's arithmetic says must exist are hunted down in the package.

## Further Reading

- M. L. Bushnell and V. D. Agrawal, *Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits*, Springer, 2000. The standard textbook on fault models, ATPG, scan, and BIST.
- L.-T. Wang, C.-W. Wu, and X. Wen (eds.), *VLSI Test Principles and Architectures: Design for Testability*, Morgan Kaufmann, 2006.
- T. W. Williams and N. C. Brown, "Defect Level as a Function of Fault Coverage," *IEEE Transactions on Computers*, vol. C-30, no. 12, 1981. The origin of the DL = 1 − Y^(1−T) relationship.
- Automotive Electronics Council, *AEC-Q001: Guidelines for Part Average Testing*. The formal definition of PAT and DPAT.
- IEEE Std 1149.1 (JTAG), IEEE Std 1500 (core wrappers), IEEE Std 1687 (IJTAG), and IEEE Std 1838 (3D test access), available from the IEEE Standards Association.
- Advantest, *V93000 EXA Scale* platform technical overview and the Advantest Investors Guide (2025), for tester architecture and market share data.
- FormFactor and Technoprobe annual reports and investor presentations, for probe card technology roadmaps and market data.
- SEMI E142, *Specification for Substrate Mapping*, and the Teradyne *STDF V4 Specification*, for the wafer map and test data formats.
- Asianometry, "The Chip Testing Business" and related videos on ATE and KYEC, for an accessible industry overview.
- International Test Conference (ITC) proceedings, especially the annual papers on adaptive test, volume diagnosis, and HBM/chiplet KGD test from Advantest, Teradyne, NVIDIA, and TSMC.
