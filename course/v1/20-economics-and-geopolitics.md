# Module 20: Economics, Geography and Geopolitics of the Chain

Every module before this one described a process that only a handful of companies on earth can perform. This module answers the question that follows from that: what happens to an industry when each of its critical steps is a natural monopoly or oligopoly, when the factories cost $20–30 billion and depreciate in five years, and when 90% of the most advanced output comes from an island 130 km from a country that claims it? The problem is not abstract. The price of a 2 nm wafer, the size of a hyperscaler's capex budget, the wording of a Bureau of Industry and Security (BIS) rule, and the yield of SMIC's 7 nm process are all coupled through the same set of balance sheets, and you cannot understand any one of them without the others.

Two warnings before the numbers. First, this is the module most exposed to time: the industry's revenue, policy and capacity figures moved faster in 2024–2026 than in any period since the 1990s, so every recent figure carries an "as of" date. Second, the industry publishes fewer hard numbers than it appears to. Market shares, wafer prices, and yields are almost all estimates by analysts (TrendForce, SemiAnalysis, IBS, TechInsights) triangulated from company filings; where a number below is an estimate it is marked "~" and you should treat a range as the honest answer.

## The Money: Size and Shape of the Industry

The semiconductor industry sells chips, and everything else in the chain exists to serve that revenue line. The **World Semiconductor Trade Statistics** (WSTS) consortium, which aggregates company-reported sales through the Semiconductor Industry Association (SIA), put 2024 global chip sales at ~$631 billion, up ~19% on 2023. The 2025 figure came in at ~$792 billion (+25.6%; the autumn 2025 forecast had been $772 billion), and WSTS's Spring 2026 forecast (May 2026) projected an unprecedented ~$1.51 trillion for 2026 (+90%), driven overwhelmingly by memory prices, with the memory segment alone forecast above $800 billion (up ~250%). Treat the 2026 number as a price-driven high-water mark rather than a structural level: unit shipments rose far less than dollars, and memory has a long habit of giving back price gains, as the boom/bust section below explains. (All 2026 figures as of mid-2026.)

Stacked beneath that revenue line are the industries that sell to chipmakers:

| Layer | 2024 | 2025 (est.) | Concentration |
|---|---|---|---|
| Chips (WSTS) | ~$631B | ~$792B | Top 10 vendors ~60% of revenue |
| Foundry services (subset of the above, sold to fabless firms) | ~$135–140B | ~$170–175B | TSMC ~65–70% |
| Semiconductor equipment (SEMI, all types incl. test and assembly) | ~$117B | ~$135B | Top 5 ~75% of wafer fab equipment |
| Wafer fab equipment (WFE, the front-end subset) | ~$104B | ~$115B | Same five firms |
| Materials (SEMI; wafers, resists, gases, chemicals, substrates) | ~$67B | ~$70–72B | Japan ~50% of value |
| EDA and semiconductor IP | ~$18–20B combined (EDA ~$15B) | ~$20B+ | Synopsys + Cadence ~70% of EDA; Arm dominant in CPU IP |

The ratios are the first economic lesson. The industry spends roughly 15–20% of chip revenue on equipment and ~10% on materials, which is why WFE is the most cyclical line in the chain: when chipmakers cut capex by 20%, ASML's and Lam's order books fall by more than that, because equipment is bought ahead of demand. EDA, at ~2–3% of chip revenue, is small in dollars and enormous in leverage: no chip at any node is designed without it.

By product, 2024 chip revenue was roughly logic ~$210B, memory ~$165B, micro ~$80B, analog ~$80B, and discretes/opto/sensors ~$95B. By 2025–26 logic and memory had swollen with AI accelerators and HBM while analog, MCU and discrete lines (automotive, industrial) were flat to down: a leading-edge AI economy growing 30–50% a year sitting on top of a mature-node economy growing at GDP-plus.

## The Layers and Who Owns Them

The industry organizes itself into layers that map onto the modules of this course, and each layer has a different market structure.

### EDA and IP

**Electronic design automation** (EDA) is the software that turns register-transfer-level code into a mask set (Module 19). Synopsys (~$6–7B revenue in FY2025 before the Ansys acquisition closed in July 2025, which added ~$2.5B of simulation software), Cadence (~$5B), and Siemens EDA (formerly Mentor, ~$2B, expanded with the 2025 Altair acquisition) hold ~85% of the market between them. Their pricing power comes from the fact that a foundry's **process design kit** (PDK) is qualified against specific EDA versions; switching tools mid-node means re-qualifying everything. Arm (Cambridge, UK; majority owned by SoftBank) licenses the CPU architecture inside essentially every smartphone and inside NVIDIA's Grace and Vera CPUs, earning ~$4 billion a year in licenses and royalties. Other IP vendors (Rambus, Alphawave, Synopsys's own interface IP group) sell the SerDes, DDR PHYs, and UCIe blocks that designers no longer build themselves.

### Fabless

**Fabless** companies design chips and buy wafers. NVIDIA (~$130B revenue in FY2025, ~$216B in FY2026, on a January fiscal year), Broadcom (~$64B total revenue in FY2025, ~$38B of it semiconductors, dominated by custom AI ASICs for Google and Meta plus networking), Qualcomm (~$38B chip revenue), AMD (~$34B in 2025), MediaTek (~$16–19B), and Apple (which designs but does not sell chips; its ~$25–30B of annual TSMC wafer purchases make it TSMC's largest customer at ~20–25% of revenue, with NVIDIA close behind or ahead by 2025–26). The fabless model, invented in the late 1980s and made viable by TSMC's founding in 1987, converts a fixed cost (a fab) into a variable cost (wafers), and it now accounts for ~35–40% of chip revenue and nearly all of the AI accelerator market.

### IDMs

**Integrated device manufacturers** (IDMs) design and fabricate their own chips: Intel (~$53B), Samsung's Device Solutions division (~$70–100B depending on the memory cycle), SK hynix (~$65B in 2025 on the HBM boom), Micron (~$37B FY2025), Texas Instruments (~$16B, analog and embedded, mostly on 300 mm mature nodes in Texas), Infineon (~€15B, power and automotive), STMicroelectronics (~$12B), NXP, Renesas, and onsemi. The memory makers are pure IDMs by necessity, because memory process and product are inseparable. The analog IDMs run fabs that are decades old and fully depreciated, which is why their gross margins (~60% at TI) rival TSMC's despite no leading-edge exposure. Intel is the hybrid case: a fading IDM trying to become a foundry, discussed below.

### Foundries

The **foundry** layer makes wafers for others. By revenue in 2025 (TrendForce estimates, as of early 2026): TSMC ~67–70% of the pure-play plus merchant foundry market, Samsung Foundry ~7–8%, SMIC ~5–6%, UMC ~4–5%, GlobalFoundries ~4%, then Hua Hong, PSMC, Vanguard, Tower, and DB HiTek. Measured at the leading edge the concentration is far higher: at 5 nm-class and below, TSMC holds on the order of 90%+ of wafers, with Samsung's SF3/SF2 and Intel's 18A the only alternatives and neither at scale. TSMC's ~$122 billion 2025 revenue (up ~36% in USD terms) exceeds the combined revenue of every other foundry by roughly 3×.

### OSATs

**Outsourced semiconductor assembly and test** (OSAT) firms package and test chips (Modules 16–18): ASE Technology (Taiwan, including SPIL; ~$20B revenue in 2025 including its EMS arm, ~$12B of it packaging and test; ~30% OSAT share), Amkor (USA; ~$6–7B), JCET (China), Powertech, KYEC (test), and Tongfu. It is the least concentrated and lowest-margin layer (gross margins ~15–20%), except where TSMC's CoWoS has pulled advanced packaging inside the foundry.

### Equipment

Five companies sell roughly three-quarters of all wafer fab equipment: ASML (Netherlands; ~€32 billion 2025 revenue; the only EUV supplier and ~85–90% of immersion DUV), Applied Materials (USA; ~$28B; deposition, etch, CMP, implant, inspection), Lam Research (USA; ~$18B; etch and deposition, especially for memory), Tokyo Electron (Japan; ~¥2.4 trillion or ~$16B; ~90% of coater/developer tracks plus etch, furnaces, and clean), and KLA (USA; ~$12B; ~55% of process control). The second tier is Japanese and Dutch: ASM International (ALD, ~€3B), Screen (wet clean, ~¥500B), Advantest (test, ~¥800B), Disco (dicing and grinding, ~¥400B), Besi (hybrid bonding), Lasertec (EUV mask inspection), Kokusai (batch furnaces), plus Axcelis (implant) and Onto (metrology) in the US. The equipment layer has the highest gross margins in the physical chain (ASML ~52%, KLA ~60%) because each tool is a monopoly or duopoly product that a fab cannot substitute without re-qualifying its process.

### Materials

Japan dominates: Shin-Etsu (wafers, EUV resists, photomask blanks), SUMCO (wafers), JSR (resists; taken private by the government-backed Japan Investment Corporation in 2024), Tokyo Ohka Kogyo (TOK, resists), Fujifilm (resists and CMP slurries), Hoya and AGC (EUV mask blanks), Ajinomoto (ABF build-up film for substrates), Resonac (formerly Showa Denko; gases, CMP), Sumitomo Chemical, and Ibiden and Shinko (substrates). Non-Japanese materials leaders are Entegris (USA; filters, FOUPs, CMP), Merck/EMD (Germany; specialty chemicals), Air Liquide and Linde (gases), DuPont (CMP pads and slurries), and Taiwan's GlobalWafers and Unimicron. The materials layer is fragmented across hundreds of products but concentrated within each: two firms make ~90% of EUV mask blanks, one firm makes essentially all ABF, and Japan supplies ~90% of photoresist.

## The Geographic Map

Where each layer physically sits is the substance of every geopolitical argument about the industry. The numbers below are approximate capacity or revenue shares as of 2024–2025.

| Region | What it dominates | Approximate share | Key firms and sites |
|---|---|---|---|
| Taiwan | Foundry wafers; the most advanced logic; advanced packaging | ~60–70% of foundry revenue; ~90% of ≤5 nm-class logic wafers; ~90%+ of CoWoS-class packaging | TSMC (Hsinchu, Taichung, Tainan, Kaohsiung), UMC, PSMC, VIS, ASE, MediaTek |
| South Korea | Memory | ~70% of DRAM revenue, ~50% of NAND, ~75–80% of HBM (SK hynix ~55–60%, Samsung ~20%) | Samsung (Pyeongtaek, Hwaseong, Giheung), SK hynix (Icheon, Cheongju, Yongin cluster under construction) |
| Japan | Materials and specialty equipment | ~50% of materials value; ~90% of resists; ~55% of 300 mm wafers; ~25–30% of equipment | Shin-Etsu, SUMCO, JSR, TOK, Hoya, TEL, Screen, Advantest, Disco, Lasertec, Ajinomoto |
| Netherlands | Lithography | 100% of EUV, ~85–90% of immersion DUV; ALD (ASM); hybrid bonding (Besi) | ASML (Veldhoven), ASM International, Besi |
| United States | Design, EDA, most non-litho equipment, some leading-edge fabs | ~50% of chip revenue by headquarters; ~70% of EDA; ~40% of equipment; ~10–12% of global fab capacity | NVIDIA, AMD, Broadcom, Qualcomm, Apple, Intel (Arizona, Oregon, Ohio), Micron (Idaho, New York), TI, AMAT, Lam, KLA, Synopsys, Cadence |
| Germany | EUV optics, chemicals, power semiconductors | Sole EUV optics source; ~2–3% of fab capacity | Zeiss SMT (Oberkochen), Trumpf (Ditzingen), Infineon (Dresden), GlobalFoundries Dresden, ESMC (2027), Merck, Siltronic |
| China | Demand; mature-node capacity; back-end | ~30% of chip demand (higher including chips re-exported in electronics); ~25% of 300 mm capacity in 2026 (SEMI; mostly ≥28 nm); ~35–40% of equipment purchases in 2024–25; ~30% of OSAT | SMIC, Hua Hong, CXMT, YMTC, Huawei/HiSilicon, Naura, AMEC, JCET |
| Malaysia, Vietnam, Philippines, Singapore | Assembly and test; some mature fabs | Malaysia ~13% of global back-end; Singapore ~10% of global fab output (mostly mature) | Intel Penang, Infineon Kulim, Micron Singapore, GlobalFoundries Singapore, Amkor Vietnam |
| India | Emerging fabs and OSATs | Negligible today; first 28 nm-class fab ~2026–27 | Tata/PSMC Dholera, Micron Sanand ATMP, Tata Assam OSAT |

The map has a structure worth stating plainly: design is American, lithography is Dutch and German, materials are Japanese, memory is Korean, leading-edge logic is Taiwanese, and the largest single market is Chinese. No region can make a leading-edge chip alone; the United States, for all its design strength, has no EUV tools of its own making, no mask blanks, no resist to speak of, and ~10% of world fab capacity. This mutual dependence is the basis of both the export-control regime (the US can weaponize the choke points its allies control) and the pushback against it (each ally's firms lose Chinese revenue when it does).

## Fab Economics

### Capex per unit of capacity

The unit of fab capacity is **wafer starts per month** (wspm, sometimes wpm). The capital cost per 1,000 wspm rises steeply with node because each generation adds mask layers, EUV tools (~$200 million for a Low-NA NXE:3800E, ~$380 million for a High-NA EXE:5200), and metrology steps. Approximate all-in capex (building plus tools) per 1,000 wspm of 300 mm capacity, as of ~2025:

| Node class | Capex per 1,000 wspm | Fab of 50,000 wspm | Notes |
|---|---|---|---|
| 28 nm (planar HKMG) | ~$100–130M | ~$5–6B | No EUV; ~40 mask layers |
| 16/12 nm FinFET | ~$150–200M | ~$8–10B | |
| 7 nm (N7, DUV-only or light EUV) | ~$200–250M | ~$10–12B | |
| 5 nm (N5, ~14 EUV layers) | ~$300–350M | ~$15–17B | |
| 3 nm (N3, ~20+ EUV layers) | ~$350–400M | ~$18–20B | |
| 2 nm (N2, GAA) | ~$450–550M | ~$22–28B | Intel/TSMC 2 nm-class fabs quoted at $20–30B |
| Leading-edge DRAM (1β/1γ with EUV) | ~$150–250M | ~$8–12B | HBM adds TSV and stacking lines |
| 3D NAND (200+ layers) | ~$100–150M | ~$5–8B | Etch-heavy rather than litho-heavy |

Tools are ~70–80% of the total. A leading-edge logic fab is in the range of ~$15–20 billion of equipment per 50,000 wspm, of which lithography is ~25–30%, deposition and etch ~40%, and process control ~10–12%.

### Wafer prices by node

Foundries do not publish prices, but the estimates below (compiled from analyst work by SemiAnalysis, IBS, TrendForce, and customer disclosures; as of 2025) are consistent enough to plan on. These are for high-volume customers on a mature-yield process; small customers pay more, and prices were rising 3–10% a year on advanced nodes in 2025–26 as TSMC exercised pricing power.

| Node | Approx. price per 300 mm wafer | Transistor density (MTr/mm², logic) | Approx. price per 100M transistors |
|---|---|---|---|
| 28 nm | ~$2,500–3,000 | ~15 | ~$0.28 |
| 16/12 nm | ~$4,000–4,500 | ~30 | ~$0.20 |
| 7 nm (N7) | ~$9,000–10,000 | ~90–100 | ~$0.15 |
| 5 nm (N5) | ~$15,000–17,000 | ~135–140 | ~$0.17 |
| 3 nm (N3E) | ~$18,000–20,000 | ~200–215 | ~$0.13 |
| 2 nm (N2) | ~$30,000 | ~250–280 | ~$0.16 |

(Price per 100M transistors assumes a 70,000 mm² usable wafer at 100% yield and is illustrative; the point is the shape of the last column.)

### Cost per transistor has flattened

For four decades the cost of a transistor fell ~30% a year, because each node roughly doubled density while wafer price rose only ~10–20%. That stopped around the 28 nm to 20 nm transition in 2012–2014, when double patterning raised wafer cost faster than density improved. It has been roughly flat since, with modest gains at 7 nm and 3 nm and a step backward at 5 nm and again at 2 nm in the table above. Three things drive the flattening:

1. **Wafer price is rising ~1.5–1.8× per node** while logic density improves only ~1.5–1.7× (TSMC N5 to N3E logic density improvement ~1.6×; N3E to N2 ~1.15× on TSMC's own statements). The two now cancel.
2. **SRAM stopped scaling.** TSMC's N3E SRAM bit cell is 0.021 µm², essentially identical to N5's, and N2 improved it only ~10–15%. Since SRAM is 30–50% of the area of a modern CPU or GPU die, half the chip does not get cheaper at all.
3. **Analog and I/O do not scale**, which is one reason AMD, Intel, and NVIDIA moved I/O and cache to chiplets on older nodes.

Design cost compounds the problem. IBS estimates of the total cost to design a large SoC (including IP, verification, and masks): ~$50 million at 28 nm, ~$100 million at 16 nm, ~$300 million at 7 nm, ~$540 million at 5 nm, ~$590 million at 3 nm, and ~$700–800 million at 2 nm. A ~$25–30 million mask set (Module 19) is a small part of this; verification and physical design labor is most of it. The consequence is that only products with revenue in the billions justify the leading edge, which is why the N2 customer list is Apple, NVIDIA, AMD, Qualcomm, MediaTek, Broadcom, and the hyperscalers' ASIC programs, and almost nobody else.

### Moore's law and Rock's law

**Moore's law** as originally stated (transistor count per chip doubling every ~2 years at minimum cost per transistor) is dead in its cost clause and alive in its count clause. Transistor count per *package* continues to double roughly every 2–3 years, but by adding silicon (reticle-limited dies, chiplets, 3D stacking) rather than by making transistors cheaper: H100 had 80 billion transistors on one die in 2022, Blackwell 208 billion on two dies in 2024, and Rubin more still across a larger CoWoS-L package. **Rock's law** (Arthur Rock, 1960s) states that the cost of a fab doubles every four years, and it has held uncomfortably well: ~$1 billion in the mid-1990s, ~$3 billion around 2003, ~$5–7 billion around 2010, ~$15 billion for a 7/5 nm fab around 2018, and ~$20–30 billion for a 3/2 nm fab in 2023–2026. Rock's law is why the number of companies at the leading edge fell from ~25 at 130 nm (2001) to ~8 at 28 nm (2011), 4 at 10/7 nm (2017), and 3 at 3/2 nm (2025), with Samsung and Intel both struggling to justify the next step.

> **Worked example: break-even wafer price for a 2 nm fab.**
> Take a 40,000 wspm N2-class fab with all-in capex of $20 billion (~$500 million per 1,000 wspm). TSMC depreciates equipment straight-line over 5 years, so annual depreciation is roughly $20B × 0.8 (tool share) / 5 + $20B × 0.2 (building) / 20 = $3.2B + $0.2B = ~$3.4 billion a year.
> At 90% utilization the fab produces 40,000 × 12 × 0.9 = 432,000 wafers a year, so depreciation alone is $3.4B / 432,000 = ~$7,900 per wafer. Variable and semi-fixed cash costs at the leading edge (resists and EUV consumables, gases, wet chemicals, wafers at ~$150, electricity at ~1–1.5 MWh per wafer, maintenance contracts, ~3,000 staff) run on the order of $5,000–6,000 per wafer, giving a full manufacturing cost of ~$13,000–14,000.
> To earn TSMC's ~58% corporate gross margin, price = $13,500 / (1 − 0.58) = ~$32,000, which is where N2 wafer quotes sit. Now drop utilization to 70% during a downturn: output falls to 336,000 wafers, depreciation per wafer rises to ~$10,100, full cost to ~$15,600, and gross margin at the same $32,000 price falls to ~51%. At 50% utilization (240,000 wafers), depreciation per wafer is ~$14,200, cost ~$19,700, and margin ~38%. This operating leverage is the entire explanation for why foundries fight for loading, why they discount old nodes rather than idle them, and why TSMC's margins are so sensitive to a few points of utilization.

### Utilization cycles and the memory boom/bust

Semiconductor demand is cyclical because capacity is added in lumps two to three years after the decision to build, on the basis of forecasts that are usually wrong in both directions. Foundry utilization swings between ~70% in troughs (2009, 2019, 2023 for mature nodes) and ~100%+ in peaks (2021, and the leading edge in 2024–26). Since equipment is bought ahead of capacity, WFE spending has fallen 20–40% in each of the last four industry downturns.

Memory is the extreme case. DRAM and NAND are commodities: a Samsung DDR5 module and a Micron one are interchangeable, so price is set by the marginal bit. When capacity runs ahead of demand, contract prices can fall 50–70% in 18 months (2018–2019, 2022–2023); when it runs behind, they rise as fast. Samsung's memory division lost on the order of ₩15 trillion in 2023 and then earned tens of trillions in 2025; SK hynix went from a ₩8 trillion loss in 2023 to record profits in 2025 as HBM, which cannot be quickly re-tooled from commodity DRAM lines, sold out through 2026. The 2025–26 upswing was unusual in that the three DRAM makers diverted 1β/1γ capacity to HBM (which consumes ~2–3× the wafer area per bit of standard DRAM because of the TSVs, larger cell margins, and stacking yield loss) and under-invested in commodity DRAM, so that commodity DDR5 and LPDDR5X prices more than doubled during late 2025 and early 2026. The mechanism is the same as in every memory cycle; only the trigger was new.

### The AI capex supercycle

The demand shock of 2023–2026 has one source: hyperscaler capital expenditure. The four largest US cloud companies (Amazon, Microsoft, Alphabet, Meta) spent ~$230 billion of capex in 2024, ~$400–410 billion in 2025, and guided to ~$720–745 billion for 2026 (as of the August 2026 earnings round: Amazon ~$220B, Microsoft ~$175B on a calendar-year basis, Alphabet ~$195–205B, Meta ~$130–145B; the January 2026 guidance had totalled ~$630–690B and was raised twice). Adding Oracle, xAI, OpenAI's Stargate partners, CoreWeave and other neoclouds, and the Gulf sovereign builders takes the total AI infrastructure spend toward $1 trillion in 2026. Roughly 40–50% of a data center's capex is the accelerator itself, ~10–15% is memory and storage, and the rest is networking, servers, power, cooling, and building. This is why NVIDIA's data center revenue went from ~$15 billion (FY2023) to ~$115 billion (FY2025) and ~$197 billion (FY2026, on total revenue of ~$216 billion), why SK hynix's HBM revenue overtook its commodity DRAM revenue, and why TSMC's high-performance computing segment became ~60% of its revenue.

The supercycle's fragility is that the capex is financed by four companies' operating cash flow (~$500–600 billion a year combined) plus, increasingly, debt and circular deals in which chip vendors invest in customers who buy chips. The point for the supply chain is that TSMC, SK hynix, and ASML are building 2027–2028 capacity against 2026 orders, exactly the timing mismatch that produced every earlier bust.

### TSMC: margins, capex, and pricing power

TSMC's 2025 financials, in round numbers: revenue ~$122 billion, gross margin ~59–60%, operating margin ~50%, net income ~$55 billion, capex ~$41 billion, with 2026 capex guided to $52–56 billion (January 2026 guidance). Advanced nodes (7 nm and below) were ~75% of wafer revenue, with 3 nm alone ~25%. Its market position lets it do three things no other foundry can: raise prices on its newest node each year (N2 launched at ~$30,000, ~50% above N3, when the density gain was ~15%), charge for advanced packaging as a separate ~$10 billion-a-year business, and require customers to prepay for capacity (NVIDIA, Apple, and AMD have all made multi-billion-dollar prepayments). Its stated policy is to price overseas fabs higher to preserve a corporate gross margin of 53%+ "and higher", and its 2025 disclosures showed Arizona already profitable on N4 wafers priced above Taiwan.

The competitive logic is a flywheel: TSMC's ~90% leading-edge share gives it the volume to amortize each node's ~$20–30 billion development cost across 2–3× as many wafers as Samsung or Intel, which funds the next node earlier, which attracts the next customer. Samsung Foundry's problem in 2022–2025 was a yield gap at SF3 that pushed its anchor customers (Qualcomm, NVIDIA) to TSMC; Intel's problem is that it has been its own only customer.

## Taiwan Concentration Risk

Taiwan makes ~90% of the world's most advanced logic chips and ~90% of CoWoS-class packaging inside a 400 km long island on the Pacific Ring of Fire, across a strait from a government that has never renounced the use of force. The risk scenarios divide by mechanism.

**Earthquakes** are the frequent, manageable case. Taiwan's fabs are built on base isolation and dampers, and tools have automatic shutdown on seismic triggers (the wafer inside a lithography tool during a quake is scrapped, but the tool is protected). On April 3, 2024 a magnitude 7.4 earthquake struck off Hualien; TSMC reported that overall tool recovery exceeded 70% within 10 hours and 80% within a day, with fabs at full production within ~3 days, and a total impact of ~NT$3 billion (~$90 million) in scrapped wafers and lost output, about 0.1% of a quarter's revenue. A magnitude 6.4 quake near Chiayi on January 21, 2025 was costlier (~NT$5.3 billion, ~$160 million net of insurance, recognized in the first quarter of 2025) but still well under 1% of a quarter's revenue. Earthquakes are a tail risk only for the largest events (a magnitude 8+ near Tainan would break base isolation limits and could take fabs down for months), and TSMC's spread across Hsinchu, Taichung, Tainan, and Kaohsiung is partial mitigation.

**A blockade** is the serious case. A PRC quarantine of shipping would not physically damage fabs but would stop the inflow of chemicals, gases, wafers, and spare parts (a fab holds days to weeks of most consumables) and the outflow of wafers to packaging (much of it in Taiwan anyway) and to customers. Within weeks, global leading-edge production would fall by ~90%; within months, the fabs would be idle. Estimates of the global GDP impact of a year-long stoppage cluster around $1–2 trillion of lost output in the first year (Bloomberg Economics estimated ~10% of global GDP in the first year for a full war scenario), because every server, phone, car, and industrial product waits on a chip. The **Silicon Shield** argument holds that this mutual dependence deters conflict: China needs Taiwan's chips as much as the West does, and a damaged TSMC is worthless to any conqueror. The counterargument is that shields deter rational actors, and that China's own self-sufficiency push (below) is precisely an attempt to lower the cost of the shield to itself.

**An invasion** would combine the blockade with physical destruction, the departure of TSMC's ~80,000 employees, and, under the US concept of "denial", possible deliberate disabling of tools (ASML has confirmed that EUV tools can be remotely disabled, and a 2024 Bloomberg report described discussions of this). The only mitigation is geographic diversification, which is why so much of the rest of this module is about fabs outside Taiwan.

## Diversification: Arizona, Kumamoto, Dresden, and the Intel Question

### TSMC outside Taiwan

TSMC's Arizona site (Fab 21) is the largest foreign direct investment in US history. Its status as of mid-2026:

- **Phase 1** (N4, ~20,000 wspm at full ramp) entered volume production in the fourth quarter of 2024 and shipped Apple, AMD (EPYC 9005 confirmed in 2025), and NVIDIA (Blackwell wafers, confirmed October 2025) products in 2025, with yields reported comparable to Taiwan and the site posting a profit in 2025.
- **Phase 2** (N3) was accelerated by a year: the shell was completed in 2025, equipment installation was scheduled to begin in the third quarter of 2026, and volume production is targeted for the second half of 2027 (as of mid-2026).
- **Phase 3** (N2 and A16) is under construction with production targeted around 2028–2029; three further fabs, two advanced packaging plants, and an R&D center are planned within the $165 billion total commitment announced in March 2025 (up from $65 billion), supported by $6.6 billion of CHIPS grants and the 35% investment tax credit.

Even at full build-out in the early 2030s, Arizona would be perhaps ~20% of TSMC's leading-edge capacity and would still lag Taiwan by one node, because TSMC develops each node in Hsinchu and ramps it in Taiwan first. Until Amkor's Arizona packaging plant (~2027–28) and TSMC's own Arizona CoWoS lines exist, Arizona wafers are flown back to Taiwan for packaging.

In Japan, **JASM** (Japan Advanced Semiconductor Manufacturing, TSMC ~86% with Sony, Denso, and Toyota) in Kumamoto started 12/16 nm and 22/28 nm production in December 2024 at ~55,000 wspm, with ¥476 billion of subsidy; JASM 2 (originally 6/7 nm, ¥732 billion subsidy) began construction only in October 2025 after delays tied to softer automotive demand and local traffic and infrastructure strain, and in February 2026 TSMC announced it would instead be a 3 nm fab (~$17 billion, ~15,000 wspm, approved by Taiwan's investment review in March 2026, with equipment installation and production targeted around 2028, as of mid-2026). In Germany, **ESMC** (TSMC 70%, Bosch, Infineon, NXP 10% each) in Dresden, ~€10 billion with ~€5 billion of German subsidy, targets 28/22 nm and 16/12 nm FinFET at ~40,000 wspm from ~2027 for automotive and industrial customers.

> **Worked example: the cost of moving 1% of TSMC's capacity to the United States.**
> TSMC shipped roughly 15 million 300 mm-equivalent wafers in 2025, so 1% is ~150,000 wafers a year, or ~12,500 wspm. Assume the wafers are N3-class.
> Capex in Taiwan for 12,500 wspm at ~$375 million per 1,000 wspm is ~$4.7 billion. TSMC and its founder have said US construction and installation cost runs ~1.5× Taiwan (Morris Chang put it at 50% higher; some estimates run to 2× for construction labor and permitting), and tools cost the same, so the US figure is roughly $4.7B × (0.8 × 1.0 + 0.2 × 1.75) = ~$5.4 billion for tools plus building before incentives. The 35% investment tax credit on qualifying property (roughly the $3.75 billion of tools and much of the building) returns ~$1.6–1.8 billion, and pro-rata CHIPS grants (~10% of the original $65 billion commitment) another ~$0.5 billion, leaving a net capex of ~$3.1–3.3 billion, below Taiwan's unsubsidized figure.
> Operating cost is the persistent penalty. TSMC has indicated Arizona wafers cost on the order of 5–20% more than Taiwan (labor, construction depreciation, chemicals and gases shipped in, smaller scale); at 10% on a ~$12,000 N3 manufacturing cost that is ~$1,200 per wafer, or ~$180 million a year on 150,000 wafers, ~0.15% of TSMC's revenue. TSMC recovers it by pricing US-made wafers higher to customers who want US origin, and the numbers show that the subsidized US fab is not an economic loss; it is a management, talent, and cycle-time problem (Arizona's ~1,500 Taiwanese expatriates, its multi-year training pipeline, and the 30-hour flight time for reticles and engineers). What 1% does not buy is resilience: a Taiwan outage would still remove ~99% of leading-edge output. Moving 20% would cost, by the same arithmetic, ~$110 billion of capex before incentives, the same order as the $165 billion TSMC has actually committed to Arizona (which also covers packaging plants and an R&D center).

### Intel's foundry pivot

Intel's plan under Pat Gelsinger (2021–2024) was to catch TSMC in process technology ("five nodes in four years": Intel 7, 4, 3, 20A, 18A) and open its fabs to external customers as **Intel Foundry**. As of mid-2026: **Intel 18A** (RibbonFET gate-all-around plus PowerVia backside power, Module 11) is in high-volume production at Fab 52 in Chandler, Arizona, shipping the Panther Lake client CPUs launched at CES 2026 and the Clearwater Forest Xeon; 20A was cancelled in 2024 to concentrate resources; and **Intel 14A**, the first node designed for High-NA EUV, has an early PDK (version 0.5) with customers, a 0.9 PDK targeted for October 2026, and Intel stating that prospective external customers would make commitments in the second half of 2026 into the first half of 2027. In July 2025 Intel said it would not build 14A capacity without an external anchor customer; by June 2026 it had committed to completing 14A development and starting capacity expansion regardless, and the 18A-P performance variant entered risk production in June 2026 (as of mid-2026). Reported 18A engagements include Microsoft and Amazon for custom chips, and in 2026 several reports described an Apple engagement for entry-level products (as of mid-2026, not fully confirmed by either company; treat as unverified). Foundry revenue from external customers remained small (well under $1 billion a year) against a foundry segment losing ~$10–13 billion a year on ~$17–18 billion of mostly internal revenue.

In August 2025 the US government converted Intel's undisbursed CHIPS grants ($5.7 billion) and Secure Enclave funds ($3.2 billion) into an $8.9 billion equity purchase of 433.3 million shares at $20.47, a ~10% (9.9%) stake, with a warrant for a further 5% exercisable if Intel's ownership of its foundry business falls below 51% (the stake was diluted somewhat by Intel's ~$20 billion equity offering in August 2026). SoftBank ($2 billion) and NVIDIA ($5 billion, with a joint product agreement) invested the same season. The policy logic is that Intel is the only US-headquartered company with a leading-edge process, and that the government now has a direct financial interest in Intel Foundry surviving. Intel's Ohio fab, originally due in 2025, has been delayed to the 2030s, and its Magdeburg (Germany) and Poland projects were cancelled in July 2025.

### Samsung Taylor

Samsung's Taylor, Texas fab (announced 2021 at $17 billion, since grown past $37 billion with $4.745 billion of CHIPS support) sat idle through 2024 for lack of customers, then in July 2025 secured a reported $16.5 billion contract to make Tesla's AI6 chip there on SF2, with production ramping from 2026. Samsung also signed Apple for image sensors in Austin. Taylor is the only leading-edge fab in the US that is not Intel's or TSMC's, and its fill rate is the best proxy for whether a second-source foundry can exist.

## Export Controls in Detail

The US export-control campaign against China's advanced computing capability is the most consequential industrial-policy intervention in the chain's history, and it is legally detailed, so the mechanism matters. BIS controls items through the **Export Administration Regulations** (EAR), classifying them by **Export Control Classification Number** (ECCN) and requiring licenses for listed destinations and end users; the **Entity List** names specific firms that need a license for almost everything; and the **Foreign Direct Product Rule** (FDPR) extends US jurisdiction to foreign-made items produced with US technology, tools, or software.

| Date | Rule | What it did |
|---|---|---|
| Aug 2019–2020 | Huawei Entity List; FDPR expansion (May 2020) | Cut Huawei off from TSMC (which stopped shipping in Sept 2020) and from US EDA; killed HiSilicon's Kirin roadmap for three years |
| Oct 7, 2022 | Advanced computing and semiconductor manufacturing rule | New ECCNs 3A090 and 4A090 for chips above a total processing performance (TPP ≥ 4800) and interconnect bandwidth (≥ 600 GB/s) threshold, capturing A100 and H100; equipment license requirements for logic at ≤16/14 nm with non-planar transistors, DRAM at ≤18 nm half-pitch, and NAND at ≥128 layers; the **US persons rule** (§744.6) barring US citizens and residents from supporting advanced fabs in China without a license, which pulled US engineers out of YMTC, CXMT, and SMIC overnight; expanded Entity List and supercomputer end-use controls. NVIDIA responded with the A800 and H800, identical dies with interconnect capped at 400 GB/s. |
| Oct 17, 2023 | Update | Replaced the interconnect test with a **performance density** metric (TPP ≥ 4800, or TPP ≥ 1600 with density ≥ 5.92 TPP/mm²), closing the A800/H800 loophole; added a "gray zone" (TPP 2400–4800) requiring notification; extended controls to ~40 countries and to Chinese-headquartered firms anywhere; expanded tool controls to more lithography and deposition items. NVIDIA designed the H20 (TPP ~2,400, a cut-down Hopper with full HBM3 but ~15% of H100's compute), L20, and L2 to fit under it. |
| Dec 2, 2024 | HBM and tools rule | Controlled HBM (memory bandwidth density above 2 GB/s/mm², i.e. all HBM2E and later) for China; added 24 tool types and 3 software categories; added 140 entities including Naura subsidiaries, Piotech, SiCarrier, and Wingtech; extended FDPR to tools; exempted Japan and the Netherlands from some FDPR provisions in exchange for their own controls. |
| Jan 13–15, 2025 | AI Diffusion Rule; foundry due-diligence rule | The Diffusion Rule created three country tiers with compute caps for tier 2 (most of the world) and controlled model weights; the foundry rule required TSMC and others to verify end users for ≤16/14 nm logic with ≥30 billion transistors after a TSMC-made die was found in a Huawei Ascend 910B (TechInsights, Oct 2024), which led to TSMC cutting off Sophgo and other intermediaries and a proposed ~$1 billion penalty. |
| Apr 2025 | H20 and MI308 license requirement | NVIDIA took a $4.5 billion inventory charge; ~$8 billion of quarterly China revenue stopped. |
| May 13, 2025 | Diffusion Rule rescinded | BIS withdrew the tiers days before they took effect, replacing them with guidance that using Huawei Ascend chips "anywhere in the world" risks violating US controls, and stronger diversion warnings; a replacement framework of bilateral deals (UAE, Saudi Arabia) followed. |
| Aug 2025 | H20 licenses with 15% revenue share | NVIDIA and AMD agreed to remit 15% of China sales of H20/MI308 to the US government in exchange for licenses (legally novel; export taxes are constitutionally contested). Beijing then discouraged Chinese firms from buying H20, and Chinese purchases largely stopped. |
| Sept–Nov 2025 | Affiliates rule; trade truce | BIS's "50% rule" extended Entity List restrictions to majority-owned affiliates (Sept 29); it was suspended for a year in November 2025 as part of a US–China truce, alongside China's suspension of its October rare-earth controls. |
| Dec 2025–Feb 2026 | H200 with 25% share | The administration announced (Dec 2025) and formalized (BIS rule of January 2026, moving H200 and MI325X-class chips to case-by-case review with third-party testing, a volume cap relative to US sales, and a 25% levy collected via a Section 232 tariff mechanism) licenses for H200 exports to approved Chinese customers. As of mid-2026, only token volumes had shipped: NVIDIA disclosed that licenses granted from February 2026 covered small quantities, that Chinese customs and procurement guidance blocked most sales, that shipments made were under 1% of data center revenue, and that it halted China-configured H200 production in March 2026. |

The tool controls are the part that binds. Advanced chips can be smuggled (BIS and the Justice Department have prosecuted several cases of H100s routed through Singapore and Malaysia, and the Financial Times reported that on the order of $1 billion of NVIDIA product reached China in the three months after the April 2025 H20 ban), but a fab cannot smuggle an EUV scanner. This is why the Dutch and Japanese alignment matters:

- **Netherlands**: EUV has never been licensed to China (ASML never shipped one; the Dutch government withheld the license in 2019 under US pressure). Since September 2023, Dutch licenses are required for the TWINSCAN NXT:2000i and above (the most capable immersion DUV tools); in September 2024 the Dutch took over from the US the licensing of NXT:1970i and 1980i, and in January 2025 extended controls to metrology and some further immersion tools. ASML may still ship older immersion tools (NXT:1980i-class) to non-Entity-List Chinese fabs, and China was ~41% of ASML's system sales in 2024 (peaking near 49% in individual quarters), ~33% in 2025, and guided to ~20% for 2026 (as of early 2026). US-person servicing restrictions mean ASML's US-citizen engineers cannot support tools at SMIC's or Huawei-linked advanced fabs; Dutch nationals can, subject to Dutch licenses that have been progressively tightened.
- **Japan**: since July 23, 2023, licenses are required for 23 categories of equipment, including EUV-related items, advanced etch and deposition, and cleaning, which affects TEL, Screen, Kokusai, and Nikon. Japan has been slower than the US to restrict servicing.

The effect on ASML, AMAT, Lam, and KLA has been real but bounded: each lost ~5–15% of revenue to the controls, offset by the AI capex boom. The revenue they still earn in China (~25–35% for each in 2024–25) comes from mature-node fabs (28 nm and above) that the rules deliberately leave open, and that Chinese fabs have been building at an unprecedented rate.

## China's Response

China's answer to the controls is a state-financed effort to replace every layer of the chain, and its results are uneven by layer.

**Logic**: SMIC's N+2 process (7 nm-class, DUV-only with quadruple patterning at critical layers) appeared in the Huawei Kirin 9000S in the Mate 60 Pro in August 2023, a year after the October 2022 rules, and TechInsights confirmed its dimensions. The follow-on Kirin 9020 (late 2024) was found to be a refined N+2 rather than a true 5 nm node, and SMIC's N+3 "5 nm-class" process, reported in 2025 in some Huawei Ascend and Kirin parts, relies on further DUV multi-patterning at yields analysts put well below 50% (some reports cite ~20–30%), with costs per good die several times TSMC's. Without EUV, each further shrink adds mask layers (Module 07) at rising cost and falling yield, so SMIC can reach 5 nm-class dimensions but not 5 nm economics, and 3 nm-class is not credible on DUV. SMIC's 7 nm-class capacity was estimated at ~30,000–45,000 wspm in 2025, much of it for Huawei.

**AI accelerators**: Huawei's Ascend 910B (SMIC N+2, ~280–350 TFLOPS BF16, HBM2E-class) and 910C (two 910B dies in one package, roughly H100-class peak but constrained by HBM supply and interconnect) shipped on the order of a few hundred thousand units in 2024–25, with Huawei's September 2025 roadmap announcing the Ascend 950/960/970 series with in-house HBM through 2028. The binding constraints are HBM (China has no volume HBM producer, and the December 2024 rule cut off Samsung's HBM2E exports; CXMT's HBM3 was in sampling as of 2025), SMIC capacity, and CoWoS-class packaging, which Huawei has sourced from domestic OSATs at lower density.

**Memory**: CXMT (ChangXin Memory) reached DDR5 and LPDDR5X on a ~17–18 nm-class node, with capacity estimated at ~200,000+ wspm and ~10–15% of global DRAM wafer capacity by 2025 (though a smaller bit share), and was preparing an IPO; YMTC shipped 232-layer NAND in 2022 and a ~270-layer generation in 2024 using string stacking and domestic tools where possible, despite Entity Listing since December 2022. Both operate at lower yields and higher cost than the incumbents but are commercially real and have pushed down prices at the low end of the market.

**Equipment**: Naura (~¥30 billion revenue in 2024; etch, deposition, clean, furnaces), AMEC (etch, including capacitor etch for DRAM, sold to TSMC before the controls), Piotech (deposition), ACM Research (clean), Hwatsing (CMP), and SiCarrier (a Shenzhen state-backed firm linked to Huawei that unveiled a broad tool line in 2025) cover deposition, etch, clean and CMP at 28 nm and increasingly at 14/7 nm. Domestic tools were ~15–25% of Chinese fab purchases in 2025, up from ~5% in 2019. Lithography is the gap: SMEE's SSA800 ArF immersion scanner (nominal 28 nm, ~90 nm-class overlay claims) is not in volume production, and reports of a Huawei-led EUV effort using a laser-induced discharge plasma source (prototype claims in 2025) remain unverified. Metrology, resist (China relies on JSR, TOK, Shin-Etsu for ArF and EUV resist), and EDA (Empyrean and Primarius are far behind Synopsys/Cadence) are the other soft spots.

**Money**: the National Integrated Circuit Industry Investment Fund ("Big Fund") raised ~¥139 billion (2014), ~¥204 billion (2019), and ¥344 billion (~$47.5 billion, May 2024) for its third phase, on top of provincial funds, subsidized loans, and tax holidays; total state support for the sector is estimated at over $150 billion since 2014. China bought ~$50 billion of semiconductor equipment in 2024 (SEMI, all types), ~42% of the world total and the largest single market for ASML, AMAT, Lam, and TEL; in 2025 it spent a flat ~$49 billion, which fell to ~36% of a larger world total as Taiwan and Korea spending surged. Chinese 300 mm capacity is on track to be ~25% of the world's in 2026 (SEMI) and roughly a third of mature-node capacity by 2027, almost all at 28 nm and above, which is beginning to depress mature-node pricing worldwide.

**Counter-controls**: China restricted gallium and germanium exports (July 2023; ~98% and ~60% of world supply respectively), graphite (Dec 2023), antimony (Aug 2024), banned gallium/germanium/antimony to the US outright (Dec 2024), controlled seven medium and heavy rare earths (April 2025), and on October 9, 2025 announced sweeping rare-earth controls with an extraterritorial clause covering foreign products containing Chinese rare-earth content, then suspended those October measures for one year in November 2025 under the trade truce, issuing general licenses for US end users (as of late 2025). China also opened antitrust probes into NVIDIA and Qualcomm and an anti-dumping probe into US analog chips (Sept 2025). Gallium matters for GaN and GaAs (Module 04), germanium for SiGe and infrared optics; neither stops a silicon fab, but both raise costs for the compound-semiconductor and defense sub-tiers.

## Industrial Policy Elsewhere

**United States, CHIPS and Science Act (Aug 2022)**: $39 billion of manufacturing grants, $11 billion for R&D (the National Semiconductor Technology Center, Natcast, and packaging programs), and the Section 48D **advanced manufacturing investment credit**, 25% of qualifying fab and equipment investment, raised to 35% by the July 2025 tax law for property placed in service after December 31, 2025, and available for projects that begin construction before the end of 2026. Final grant awards (Dec 2024 and after) included Intel $7.86 billion (plus $3 billion Secure Enclave; the undisbursed portion became equity in 2025), TSMC $6.6 billion, Micron $6.1 billion (Idaho and New York) plus $275 million (Virginia), Samsung $4.745 billion, Texas Instruments $1.6 billion, GlobalFoundries $1.5 billion, SK hynix $458 million (Indiana HBM packaging), and Amkor $407 million (Arizona). SIA estimates the act catalyzed ~$450 billion of announced private investment and would triple US fab capacity by 2032. The 2025 administration criticized the grants, renegotiated some, and shifted toward the tax credit, tariffs (a threatened ~100% chip tariff with exemptions for companies building in the US, as of 2025), and equity stakes as instruments.

**European Union, Chips Act (Sept 2023)**: a €43 billion headline of mostly national money aimed at doubling the EU's share of world production from ~10% to 20% by 2030, a target nobody in the industry expects to be met. Its main fruits are ESMC Dresden and Infineon's €5 billion Smart Power Fab in Dresden (2026); Intel's Magdeburg fab and the STMicro/GlobalFoundries Crolles expansion were cancelled, and a "Chips Act 2.0" was under discussion in 2025–26.

**Japan**: the most effective program per yen. METI committed ~¥4 trillion (~$26 billion) in 2021–2025, funding JASM 1 and 2 (¥1.2 trillion combined), Micron's Hiroshima 1γ EUV fab (¥536 billion), Kioxia/Western Digital's Kitakami NAND fab, and **Rapidus**, the 2022 startup backed by Toyota, Sony, NTT, SoftBank, Kioxia, Denso, and NEC that licensed IBM's 2 nm nanosheet process and built the IIM-1 fab in Chitose, Hokkaido. Rapidus opened its pilot line in April 2025 with EUV tools installed, reported working 2 nm GAA test devices in mid-2025, and targets mass production in the second half of fiscal 2027 at an initial ~6,000 wspm rising to ~20,000–25,000; cumulative public development support reached ~¥2.35 trillion with the FY2026 allocation (¥630 billion approved June 2026), including ¥100 billion of government equity via the IPA in a ¥267.6 billion round closed in February 2026 (as of mid-2026). Its unproven elements are yield on a first-generation GAA process, a customer base, and a single-wafer-processing cycle-time model no volume fab has used at the leading edge.

**South Korea**: the K-Chips Act raised the investment tax credit for large firms to 15% (2023) and to 20% in the 2025 amendment (30% for SMEs), alongside a ₩26 trillion support package and the Yongin mega-cluster, a ₩600+ trillion plan for SK hynix (four fabs from 2027) and Samsung (six fabs) that is the largest fab complex ever planned and is gated by power and water supply.

**India**: the India Semiconductor Mission offers 50% capital subsidies; Tata Electronics and Taiwan's PSMC are building a ~$11 billion, 50,000 wspm fab at Dholera, Gujarat (28–110 nm, first output targeted ~2026–27), Micron opened an assembly and test plant in Sanand, and Tata, CG Power/Renesas, and Kaynes are building OSATs. India's realistic 2030 role is back-end and mature-node.

**Taiwan** itself responded with a 25% R&D tax credit (2023), an "N-1" rule requiring overseas fabs to run at least one generation behind Taiwan (which TSMC's plan to bring N2 to Arizona by ~2028–29 tests), and export controls on Huawei and SMIC (June 2025).

## What If: Single Points of Failure

The chain has a dozen places where one site, one company, or one mine is the only source. A useful exercise is to ask, for each, how long the world could run without it.

| Single point | What it is | Alternatives | Time to recover if lost |
|---|---|---|---|
| ASML Veldhoven | Sole final assembly of every EUV scanner (~40–50 a year) and most DUV | None; Nikon and Canon make no EUV and little immersion DUV | Years; ~10-year lead to replicate |
| Zeiss SMT, Oberkochen | Sole source of EUV projection optics and illuminators, polished to ~50 pm | None | Years; the optics know-how is irreplaceable on any planning horizon |
| Cymer (San Diego) and Trumpf (Ditzingen) | EUV source and the 30 kW CO2 drive laser | None | Years |
| Spruce Pine, North Carolina | Most of the world's high-purity quartz for CZ crucible inner layers | Chinese synthetic quartz and lower-grade deposits, with yield penalties | Weeks (Hurricane Helene, Sept 2024, closed the mines ~2 weeks; inventories covered it) to months |
| Ajinomoto ABF | ~95%+ of build-up film for every high-end substrate | Sekisui, Taiyo at small scale | Months to years of qualification |
| Hoya, AGC | EUV mask blanks | Each other | Months |
| Lasertec | Sole actinic (EUV-wavelength) blank and mask inspection | KLA's EUV inspection is e-beam and complementary, not a substitute | Years |
| Shin-Etsu, SUMCO | ~55% of 300 mm wafers | GlobalWafers, Siltronic, SK Siltron | Months of shortage |
| TSMC Fab 18, Tainan | The N5/N4/N3 site (~200,000+ wspm) | Fab 20 (Hsinchu), Fab 21 (Arizona), Fab 22 (Kaohsiung) for N2; nothing for the N3 volume | A multi-week outage removes most Apple, NVIDIA, and AMD wafer supply for the period; an extended one takes ~1–2 years to replace |
| Taiwan Strait | Shipping of wafers, chemicals, and gases | None for Taiwan-based capacity | Global leading-edge output down ~90% for the duration plus 1–2 years |
| Neon, helium, tungsten hexafluoride | Ukraine supplied ~50% of semiconductor neon before 2022; NF3 and WF6 are made by a few firms | Chinese and Korean neon (now dominant); Kanto Denka, SK Specialty | Months (2022 neon prices rose ~10× and then normalized) |
| KYEC / ASE test capacity | Test for NVIDIA-class parts | Amkor, in-house | Months |

The pattern across the table is that the most concentrated points are in optics and materials, in Germany, the Netherlands, and Japan rather than in Taiwan, and that they are concentrated not by policy but by economics: the market for EUV optics is ~50 sets a year, which supports exactly one supplier.

## Workforce and Talent

Fabs are staffed by people who take years to train, and the diversification programs above are constrained more by them than by money. TSMC employs ~83,000 people (2024), ~10% non-Taiwanese, and its Taiwan engineers accept working conditions (on-call shifts, ~12-hour days during ramps) that Arizona's did not; the resulting culture clash delayed Phase 1 by about a year, and TSMC ended up sending ~1,500 Taiwanese engineers to Arizona and training ~600 American hires in Taiwan for 12–18 months each. SIA and Oxford Economics projected in 2023 that the US would face ~67,000 unfilled semiconductor jobs by 2030 (of ~115,000 new positions), roughly 40% technicians and 30% engineers; Intel Ohio's delays, Samsung Taylor's idle years, and Micron's slowed New York ramp are partly staffing stories. JASM's starting salaries pulled staff from local Kumamoto firms, and Rapidus sent ~200 engineers to IBM's Albany NanoTech center for two years to learn 2 nm. In Taiwan the constraint is demographic: the island produces ~10,000 electrical engineering graduates a year against TSMC alone hiring ~6,000–8,000. The scarcest single population is the few thousand people worldwide who can bring up a new process node, split among TSMC, Samsung, Intel, SK hynix, Micron, and the imec/IBM research ecosystems.

## The AI Demand Picture

The numbers that matter for the chain's 2026–2028 planning:

- **GPU units**: NVIDIA shipped on the order of 3.7 million data-center GPUs in 2023 (TechInsights), ~5 million Hopper-class in 2024, and ~6–8 million Blackwell-class in 2025, with 2026 dominated by Blackwell Ultra (GB300) and the Rubin ramp in the second half. AMD's MI300/MI350 series and the custom ASICs (Google TPU v6/v7 and Amazon Trainium 2/3 via Broadcom and Marvell, Meta MTIA, Microsoft Maia) add on the order of 3–5 million accelerator-class packages a year. Each package is 800–1,700 mm² of leading-edge silicon plus 8–16 HBM stacks.
- **CoWoS**: TSMC's CoWoS capacity rose from ~35,000 wafers a month at the end of 2024 to ~70,000–75,000 at the end of 2025 and was headed toward ~100,000–130,000 by the end of 2026 (as of early 2026), with NVIDIA taking roughly 60% of it. CoWoS was the binding constraint on accelerator supply in 2023–2025 (Module 17); by 2026 it had been joined by HBM.
- **HBM**: total HBM bit shipments roughly doubled in each of 2024 and 2025; SK hynix's HBM revenue passed its commodity DRAM revenue in 2025, and all three suppliers reported 2026 HBM4 capacity sold out in 2025. HBM's ~2–3× wafer consumption per bit is what pulled commodity DRAM into shortage.
- **Power**: an NVL72 rack draws ~120–140 kW and a Rubin-generation rack ~200 kW+; a 1 GW campus houses on the order of 500,000–700,000 GPUs. US data centers consumed ~4.4% of US electricity in 2023 and are projected to reach ~6.7–12% by 2028 (LBNL/DOE, December 2024), with interconnection queues of 3–7 years in major markets. Power, transformers, and gas turbines, not chips, became the binding constraint on new capacity in 2025–26, which is why hyperscalers began signing nuclear and gas-generation deals.

## How to Read Industry Data

Because so much of this module is estimates, knowing the sources and their biases is a skill in itself.

- **WSTS** (via SIA, monthly with a three-month moving average, and semi-annual forecasts): the canonical chip revenue series, built from member company reports; it undercounts Chinese vendors and captive production (Apple, Google), and its forecasts lag turns.
- **SEMI**: equipment billings (monthly, from member reports), the World Fab Forecast (fab-by-fab capacity database, subscription), materials market reports, and the annual silicon wafer shipment series. The best source for capacity by region and node.
- **TrendForce** (Taiwan): quarterly foundry and DRAM/NAND market share rankings, contract price indices, and CoWoS/HBM capacity estimates; its numbers are the ones cited in most news reports, and its price data are the industry standard.
- **SemiAnalysis**: bottom-up cost models, accelerator shipment estimates, and fab and packaging capacity tracking; paid, opinionated, and usually the most detailed public source on the AI supply chain.
- **TechInsights**: teardowns and die analysis; the source of the SMIC 7 nm confirmation, the Huawei die findings, and transistor density measurements.
- **IBS** (International Business Strategies) and **IC Insights** (now part of TechInsights): design cost and wafer cost per node.
- **Company filings**: TSMC's quarterly management report gives revenue by node, platform and region, capex and capacity guidance, and margin bridges; ASML's report gives EUV unit shipments and China share; NVIDIA's 10-K gives customer concentration (two direct customers above 10% of revenue) and inventory purchase commitments (~$50 billion+ in 2025, a leading indicator of CoWoS bookings); Micron's and SK hynix's give HBM revenue trends; Applied's and Lam's give China revenue share. The 10-K risk-factor sections are where export-control exposure is quantified.
- **Government sources**: BIS Federal Register notices (the actual rule text, which is what companies comply with, not press summaries), the Commerce CHIPS Program Office award announcements, METI and the European Commission for their programs, and Taiwan's Ministry of Economic Affairs for local statistics.

Three habits: always check whether a share is by revenue, by wafers, or by bits (TSMC's foundry share is ~67% by revenue and much lower by wafers because its wafers are expensive); check whether a capacity number is installed, planned, or "announced"; and distinguish TSMC's fiscal year (calendar) from NVIDIA's (ending late January) and Micron's (ending late August) when comparing growth rates.

## Key Numbers

| Quantity | Value | Notes |
|---|---|---|
| Global chip sales 2024 / 2025 / 2026F | ~$631B / ~$792B / ~$1.51T (WSTS Spring 2026 forecast) | 2026 driven by memory pricing; as of mid-2026 |
| Wafer fab equipment 2025 | ~$115B (SEMI); total equipment ~$135B | Top 5 ~75% |
| Materials market 2025 | ~$70–72B | Japan ~50% |
| EDA market | ~$15B (EDA) / ~$20B incl. IP | Synopsys + Cadence ~70% |
| TSMC foundry share | ~67–70% by revenue; ~90%+ at ≤5 nm-class | TrendForce, 2025 |
| TSMC 2025 revenue / gross margin / capex | ~$122B / ~59% / ~$41B; 2026 capex guide $52–56B | Jan 2026 guidance |
| Wafer price by node | 28 nm ~$3k; 7 nm ~$10k; 5 nm ~$16k; 3 nm ~$18–20k; 2 nm ~$30k | Estimates, 2025 |
| Capex per 1,000 wspm | ~$100M at 28 nm to ~$500M at 2 nm | All-in, ~2025 |
| Design cost of a large SoC | ~$50M at 28 nm; ~$540M at 5 nm; ~$590M at 3 nm; ~$700–800M at 2 nm | IBS estimates |
| Hyperscaler capex (top 4) | ~$230B (2024); ~$400–410B (2025); ~$720–745B guided for 2026 | As of August 2026 |
| Taiwan share of ≤5 nm-class logic | ~90% | Plus ~90% of CoWoS-class packaging |
| Korea share of DRAM / HBM | ~70% / ~75–80% | SK hynix ~55–60% of HBM |
| China share of equipment purchases | ~42% (2024, ~$50B); ~36% (2025, ~$49B) | SEMI, all equipment; largest market for ASML, AMAT, Lam, TEL |
| China share of world 300 mm capacity | ~25% (2026, SEMI); ~1/3 of mature-node capacity by 2027 | Mostly ≥28 nm |
| CHIPS Act | $39B grants; ITC 25% → 35% (property in service after 2025) | Intel $7.86B (partly converted to equity), TSMC $6.6B, Micron $6.1B, Samsung $4.7B |
| US government stake in Intel | ~10% for $8.9B (433.3M shares at $20.47) | Aug 2025 |
| TSMC Arizona commitment | $165B; P1 N4 in HVM (Q4 2024); P2 N3 targeted 2H 2027; P3 N2/A16 ~2028–29 | As of mid-2026 |
| Big Fund III | ¥344B (~$47.5B), May 2024 | Plus provincial funds |
| Oct 2022 tool thresholds | Logic ≤16/14 nm non-planar; DRAM ≤18 nm; NAND ≥128 layers | Chip threshold TPP ≥ 4800 (Oct 2023 added density ≥ 5.92) |
| H20 / H200 China arrangements | 15% revenue share (Aug 2025); 25% for H200 (Dec 2025–Feb 2026), only token shipments | As of mid-2026 |
| Hualien earthquake (Apr 3, 2024) | M7.4; >70% tool recovery in 10 h; ~NT$3B loss | ~0.1% of a quarter's revenue |
| CoWoS capacity | ~35k wpm (end 2024) → ~70–75k (end 2025) → ~100–130k (end 2026 target) | NVIDIA ~60% |
| Rapidus | 2 nm pilot line April 2025; HVM target 2H FY2027 at ~6k wspm | ~¥2.35T public support (as of mid-2026) |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| TSMC | Taiwan | Leading-edge foundry, CoWoS/SoIC packaging | ~67–70% of foundry; ~90%+ at the leading edge |
| Samsung Foundry | Korea | SF3/SF2 GAA foundry; Taylor TX (Tesla AI6) | #2 foundry (~7–8%) |
| Intel Foundry | USA | 18A in HVM (Fab 52, Arizona); 14A with High-NA; ~10% US-government owned | #3 leading-edge; few external customers as of 2026 |
| SMIC | China | 7 nm-class (N+2) and 5 nm-class DUV multi-patterning; Huawei's foundry | #3 foundry by revenue (~5–6%); Entity Listed |
| GlobalFoundries / UMC | USA / Taiwan | Mature and specialty nodes (12 nm and above) | ~4–5% each |
| NVIDIA | USA | Fabless; ~80%+ of merchant AI accelerators; ~60% of CoWoS | Leader |
| AMD, Broadcom, Qualcomm, Apple, MediaTek | USA / Taiwan | Fabless and captive designers; TSMC's main N3/N2 customers | Top fabless |
| Synopsys, Cadence, Siemens EDA | USA / Germany | EDA and IP | ~85% of EDA combined |
| Arm | UK | CPU architecture IP | Dominant in mobile and AI-server CPUs |
| SK hynix, Samsung, Micron | Korea / Korea / USA | DRAM, NAND, HBM | HBM ~55–60% / ~20–25% / ~20% (2025) |
| CXMT, YMTC | China | DRAM (DDR5, LPDDR5X, HBM3 sampling), NAND (~270 layers) | ~10–15% of DRAM wafer capacity; Entity Listed (YMTC) |
| Huawei / HiSilicon | China | Kirin SoCs, Ascend 910B/C/950 accelerators | Leading Chinese AI chip designer; Entity Listed |
| ASML | Netherlands | EUV (sole), immersion DUV (~85–90%) | Monopoly / leader |
| Applied Materials, Lam Research, KLA | USA | Deposition/etch/CMP/implant; etch/deposition; process control | #1 / #3–4 / #5 by revenue; ~55% of process control (KLA) |
| Tokyo Electron, Screen, Advantest, Disco, Lasertec | Japan | Tracks, etch, furnaces; clean; test; dicing; EUV mask inspection | #4 overall (TEL); leaders in each niche |
| Naura, AMEC, SiCarrier, SMEE | China | Domestic etch, deposition, clean, lithography (28 nm claims) | ~15–25% of Chinese tool purchases; no EUV |
| Zeiss SMT, Trumpf, Cymer | Germany / Germany / USA | EUV optics, drive laser, source | Sole suppliers |
| Shin-Etsu, SUMCO, JSR, TOK, Hoya, AGC, Ajinomoto | Japan | Wafers, resists, mask blanks, ABF | Leaders; ~90% of resist, ~100% of ABF |
| Rapidus | Japan | 2 nm foundry startup (IBM process), Hokkaido | Pre-production; HVM target FY2027 |
| ESMC (TSMC-Bosch-Infineon-NXP) | Germany | 28–12 nm fab in Dresden | Production ~2027 |
| BIS (US Commerce) | USA | Export-control rule-maker | Sets the chip and tool thresholds |

## Common Misconceptions

- **"Export controls have failed because Huawei made a 7 nm phone chip."** → The 2022–24 controls targeted AI compute at scale, not the existence of a 7 nm die. SMIC can make 7 nm-class and even 5 nm-class parts on DUV, but at yields and costs that limit volume to tens of thousands of wafers a month, and China still has no EUV, no volume HBM, and no CoWoS-class packaging at scale. The controls slowed China by an estimated several years at the leading edge while accelerating its mature-node and tool self-sufficiency, which is a mixed result, not a null one.
- **"TSMC has 90% market share."** → It has ~67–70% of foundry revenue and ~90%+ of wafers at 5 nm-class and below. The two numbers answer different questions, and confusing them exaggerates TSMC's position in mature nodes (where China and UMC are large) and understates it at the leading edge.
- **"Moving production to the US is uneconomic because US wafers cost 50% more."** → Construction cost is ~1.5× or more, but tools (~80% of capex) cost the same everywhere, and after the 35% tax credit and grants a US fab's net capex is below Taiwan's unsubsidized figure. The persistent operating penalty is ~5–20% per wafer, which customers seeking US origin have been willing to pay. The real barriers are talent, cycle time, and TSMC's preference to develop each node at home.
- **"Cost per transistor is still falling ~30% a year."** → It has been roughly flat since ~28 nm. Density still rises ~1.5–1.7× per node, but wafer price rises nearly as fast, SRAM has stopped scaling, and design costs have reached $500 million or more per chip at 3 nm. Moore's law survives as transistors per package, financed by chiplets and larger packages, not as cheaper transistors.
- **"The AI constraint is GPU die supply from TSMC's fabs."** → Front-end wafer capacity has exceeded accelerator demand throughout; the bottlenecks have been CoWoS packaging (2023–25), HBM (2025–26), and increasingly data-center power and grid interconnection.
- **"A fab is worth building anywhere with enough subsidy."** → Subsidies reduce capex, but the fab's economics are set by utilization: at 50% loading a leading-edge fab's gross margin roughly halves. Fabs without customers (Samsung Taylor 2022–24, Intel's external foundry, JASM 2's delays) are the recurring failure mode of industrial policy, not construction cost.

## Where This Fits in the Supply Chain

Module 19 ended with an NVIDIA rack leaving a Foxconn or Quanta line, the physical terminus of the chain that began with quartz in Module 01. This module steps back from the material flow to the money and power that organize it: the ~$790 billion of 2025 chip revenue that funds ~$115 billion of wafer-fab-equipment purchases from ASML, Applied, Lam, TEL, and KLA and ~$70 billion of Japanese-dominated materials; the fab capex arithmetic that dictates which three companies can afford the 2 nm node; the geographic concentration in Taiwan, Korea, Japan, and the Netherlands that makes the chain both efficient and fragile; and the export-control and subsidy regimes that governments have built since 2019 to redirect where the next $500 billion of fabs will go. Every upstream module's supplier list (Shin-Etsu's wafers, Zeiss's optics, Ajinomoto's ABF, SK hynix's HBM) reappears here as a single point of failure with a policy attached. Module 21 closes the course with the glossary, the node table, and the full ordered process flow that this module's economics sit on top of.

## Further Reading

- Chris Miller, *Chip War: The Fight for the World's Most Critical Technology* (Scribner, 2022). The history behind every policy in this module.
- Bureau of Industry and Security, "Implementation of Additional Export Controls: Certain Advanced Computing and Semiconductor Manufacturing Items" (Federal Register, Oct 13, 2022) and the Oct 2023 and Dec 2024 updates; read the rule text, not the summaries.
- Gregory C. Allen, "Choking Off China's Access to the Future of AI" (CSIS, Oct 2022) and subsequent CSIS analyses of the 2023–2025 rules.
- TSMC, quarterly management reports and annual reports (investor.tsmc.com), for revenue by node, capex, and overseas fab status.
- ASML, annual reports and quarterly results (asml.com/investors), for EUV shipments and China exposure.
- SEMI, *World Fab Forecast* and the annual "Global Semiconductor Equipment" and "Materials Market" reports (semi.org).
- WSTS, semi-annual "Semiconductor Market Forecast" releases (wsts.org).
- SemiAnalysis (semianalysis.com), especially the wafer-cost, CoWoS, and export-control articles (2022–2026).
- Semiconductor Industry Association and Oxford Economics, "Chipping Away: Assessing and Addressing the Labor Market Gap Facing the U.S. Semiconductor Industry" (July 2023).
- Bloomberg Economics, "Xi, Biden and the $10 Trillion Cost of War Over Taiwan" (January 2024).
- Asianometry (YouTube), episodes on TSMC Arizona, SMIC, Rapidus, and Japanese materials companies.
