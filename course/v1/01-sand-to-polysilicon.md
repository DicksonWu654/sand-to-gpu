# Module 01: Sand to Polysilicon

The problem this stage solves is brutally simple to state and brutally hard to do: take silicon dioxide, the most abundant compound in the Earth's crust, and turn it into elemental silicon in which fewer than one atom in a billion is anything other than silicon. A leading-edge transistor does not care that silicon is common. It cares that the crystal it sits in has a controlled, deliberately introduced dopant concentration of perhaps 10^15 atoms per cm³, and that residual, uncontrolled boron and phosphorus are at least a thousand times lower than that. Every atom of iron, copper, or nickel that survives into the wafer is a potential recombination center, a leakage path, or a gate-oxide killer.

Nature does not hand out silicon in that condition. The Si-O bond is one of the strongest in geochemistry (~450 kJ/mol per bond, and every silicon in quartz has four of them; the diatomic Si≡O molecule is bound by ~800 kJ/mol), which is why quartz survives billions of years of weathering, and it is why breaking it costs a submerged-arc furnace running at ~2,000 °C and roughly 12 MWh of electricity per tonne. The silicon that comes out of that furnace is ~98–99% pure, which is fine for aluminum alloys and silicones and hopeless for a wafer. Going from 99% to 99.9999999% (nine nines, or **9N**) is a chemistry problem, not a metallurgy problem: convert the silicon into a volatile liquid, distill the liquid until the contaminants are at parts-per-trillion levels, and then decompose the liquid back into solid silicon inside a sealed reactor at ~1,100 °C. That is the **Siemens process**, invented at Siemens in the late 1950s and still, seven decades later, the way essentially all electronic-grade silicon is made.

This module walks the full chain: the rock, the furnace, the chlorosilane chemistry, the deposition reactor, the competing fluidized-bed route, how purity is actually measured, how chunks get to a crystal grower, who makes what, and what it costs. It closes with the two other ultra-pure feedstocks that enter the supply chain at this same stage and that the crystal grower in Module 02 cannot work without: the fused-quartz crucible and the graphite hot zone.

## 1. Why Purity Is the Whole Game

Crystalline silicon contains **5.0 × 10^22 atoms per cm³** (density 2.33 g/cm³, atomic mass 28.09 g/mol; 2.33 / 28.09 × 6.022 × 10^23 = 4.99 × 10^22). That number is the yardstick for everything in this module, so it is worth internalizing.

Purity for semiconductor silicon is usually quoted in "nines": 6N is 99.9999% (1 part per million impurity), 9N is 99.9999999% (1 part per billion), 11N is 99.999999999% (10 parts per trillion). Because the interesting impurities are counted as atoms, the industry uses **ppba** (parts per billion atomic) and **ppta** (parts per trillion atomic) for dopants, and **ppbw** (parts per billion by weight) for metals, which are often measured by mass spectrometry after dissolution. The conversion matters: 1 ppbw of iron (atomic mass 56) is 0.5 ppba, because an iron atom weighs twice a silicon atom.

> **Worked example: what 9N means in atoms.**
> Silicon has 5 × 10^22 atoms/cm³. A total impurity content of 1 ppb (9N) means 5 × 10^22 × 10^-9 = **5 × 10^13 impurity atoms per cm³**. That sounds like a lot of atoms (fifty trillion in a sugar-cube volume), but compare it to the dopants a wafer maker adds on purpose. A standard p-type 300 mm CZ substrate at ~10 Ω·cm has about 1.3 × 10^15 boron atoms/cm³ (about 27 ppba). So a 9N feedstock carries roughly 25× fewer total foreign atoms than the deliberate doping level, and the fraction that is electrically active (B, P, Al, As, Sb) is far lower still. The electronic-grade specification for boron is typically ≤ ~0.02–0.05 ppba, i.e. ≤ 1–2.5 × 10^12 atoms/cm³, a thousand times below the intentional dopant level. At the other end, a 6N solar feedstock with 1 ppma of boron would contain 5 × 10^16 B atoms/cm³, giving a resistivity of ~0.3–0.5 Ω·cm before the grower adds anything at all; that is why 6N is a solar number and not an electronics number. And a high-resistivity float-zone wafer for RF or power devices at 5,000 Ω·cm needs net electrically active impurities below ~3 × 10^12 cm³, which is only reachable because the feedstock's boron and phosphorus are each at the 10^11–10^12 cm³ level.

One more piece of physics governs which impurities matter where. When silicon freezes from a melt (Module 02), each impurity partitions between solid and liquid according to its **segregation coefficient** k (the ratio of concentration in the solid to that in the liquid). Iron has k ≈ 8 × 10^-6, aluminum ~2 × 10^-3, copper ~4 × 10^-4: crystal growth rejects them into the melt almost completely, so a polysilicon feedstock can tolerate a little metal that the grower will clean up. Boron has k ≈ 0.8 and phosphorus k ≈ 0.35. Boron in particular goes straight into the crystal. It cannot be removed by crystal growth, by zone refining, or by any metallurgical trick with reasonable yield. It has to be removed at the chemical stage, in the distillation columns, and that single fact shapes the design of the entire Siemens process.

## 2. The Rock: Quartz and Quartzite

### 2.1 Why not beach sand

The "sand to chip" phrase is a nice story and it is essentially wrong. Beach and desert sand is a poor feedstock for three reasons, all of them mechanistic.

First, grain size. A submerged-arc furnace is a packed bed several meters deep through which carbon monoxide and silicon monoxide gases must flow upward. Fine sand (0.1–1 mm) packs into an impermeable mass, the gas cannot escape, the charge "blows" and channels, and the furnace becomes unstable and dangerous. Furnaces need lumpy material, typically **10–150 mm** pieces, with fines screened out.

Second, chemistry. Beach sand contains shell fragments (CaCO₃), heavy minerals (ilmenite FeTiO₃, zircon, monazite, magnetite), feldspar (Al, Na, K), and clay. Iron, aluminum, titanium, calcium, and especially boron and phosphorus (from apatite, tourmaline, and organic residues) all end up in the silicon. Boron and phosphorus are the ones the downstream chemistry hates most.

Third, thermal behavior. Some quartz decrepitates (shatters into fines) on rapid heating through the α-β quartz transition at 573 °C and during the ~1,700 °C softening, which recreates the permeability problem inside the furnace. Producers test candidate ore for **thermal strength** and pick deposits that stay lumpy.

So the furnace feed is **lump quartz** or **quartzite** (a metamorphosed quartz sandstone) mined from hard-rock quarries, crushed and screened to size, and specified at roughly ≥ 98–99.5% SiO₂, with Fe₂O₃ and Al₂O₃ each in the 0.05–0.5% range, and B and P in the low-ppm range. Major sources are Norway, Spain, France, Brazil, Canada, Australia, South Africa, Turkey, and many quarries in China. A silicon smelter uses ~2.5–2.7 tonnes of quartz per tonne of silicon (theoretical is 2.14; the rest is lost as silica fume and slag).

### 2.2 High-purity quartz: a different material for a different job

There is a second quartz stream in the supply chain, and it is much rarer, much more expensive, and much more geographically concentrated. **High-purity quartz (HPQ)** is quartz with total impurities below roughly 50 ppm, in the best grades below ~10 ppm, with particular attention to aluminum, titanium, and the alkalis (Na, K, Li), which sit inside the quartz lattice as substitutional and interstitial ions and cannot be washed off. HPQ is not fed to furnaces. It is the raw material for the **fused-quartz crucibles** in which single crystals are grown (Section 10 and Module 02), for quartz furnace tubes and wafer boats, for lamp envelopes, and for the silica used in some optical and telecom applications.

The world's benchmark deposit is the **Spruce Pine** pegmatite district in Mitchell County, North Carolina. The rock is an alaskite (a feldspar-quartz-mica granite) in which the quartz crystallized unusually clean of trace elements, and which, crucially, can be liberated from the feldspar and mica by crushing, froth flotation, magnetic separation, and acid leaching. Two companies mine it: **Sibelco** (Belgian, whose Spruce Pine operation descends from Unimin and sells the IOTA family of grades; IOTA-STD is on the order of 20 ppm total impurities, and the premium IOTA-CG and higher grades reach single-digit ppm) and **The Quartz Corp** (a joint venture of Norway's Norsk Mineral and France's Imerys), which mines at Spruce Pine and does its final purification at Drag in northern Norway. Between them they supply the large majority of the world's crucible-grade quartz, and in the tightest grades effectively all of it. Other HPQ sources exist but are second-tier or politically awkward: Kyshtym in Russia's Urals (sanctions-affected), deposits in India, Brazil, Australia, Mauritania, and China's Donghai county in Jiangsu, home of Jiangsu Pacific Quartz, the Chinese leader in both natural HPQ processing and synthetic quartz.

The purification flowsheet defines the price: crushing to sand, flotation to reject feldspar and mica, high-intensity magnetic separation for iron-bearing minerals, hot HCl/HF acid leaching for surface and grain-boundary impurities, and for the top grades a **hot chlorination** step at ~1,000–1,200 °C in chlorine or HCl gas that volatilizes lattice-adjacent alkalis and some Al and Fe. What remains is dominated by aluminum substituting for silicon in the lattice, which no process removes; that is why the geology matters more than the plant.

### 2.3 The Hurricane Helene scare

On 26–27 September 2024 Hurricane Helene dumped historic rainfall on western North Carolina. Spruce Pine's roads, rail spur, power, and water were destroyed, and both Sibelco and The Quartz Corp had already halted operations ahead of the storm. For about two weeks the trade press and a good deal of the financial press ran the headline that the world's semiconductor supply chain depended on one small mountain town that had just been flattened. Sibelco announced production and shipments restarting on 10 October 2024 and ramping to full capacity; The Quartz Corp took longer, its restart depending on rebuilt local infrastructure.

Three things kept the scare from becoming a shortage. First, crucible and wafer makers hold months of HPQ inventory precisely because the source is concentrated, and quartz does not degrade in a warehouse. Second, the mines were physically intact; the damage was to the town and the transport links. Third, a crucible needs ultra-clean quartz only in its inner few millimeters, and synthetic quartz (Section 10) is a qualified if pricier substitute for that layer. The episode did accelerate second-source qualification of Chinese synthetic quartz and alternative natural deposits, and it is now the standard example of a single point of failure that is neither a chip nor a tool.

## 3. Carbothermic Reduction: The Submerged-Arc Furnace

### 3.1 The chemistry

The overall reaction is

SiO₂ + 2C → Si + 2CO

with ΔH ≈ +690 kJ per mole of silicon (from the formation enthalpies: 2 × (−110.5) − (−911) kJ/mol). It is strongly endothermic and only becomes thermodynamically favorable above roughly 1,800–1,900 °C, which is why the hot zone of the furnace runs at ~1,900–2,000 °C and why the process is electric rather than fuel-fired: no flame can hold that temperature inside a reducing packed bed.

The real chemistry is staged, and understanding the stages explains most of the furnace's design and most of its losses. In the hot crater around each electrode tip:

SiO₂ + C → SiO(g) + CO(g)
SiO₂ + Si → 2SiO(g)
SiO(g) + SiC → 2Si + CO(g)

Higher up in the bed, where the charge is cooler (~1,500–1,800 °C), the rising silicon monoxide gas is captured by the carbon:

SiO(g) + 2C → SiC + CO(g)

and the silicon carbide then descends into the crater to be consumed by the third reaction above. In other words, silicon carbide is the working intermediate, and gaseous SiO is the carrier that has to be trapped on its way up. Any SiO that reaches the top of the charge oxidizes in air to a cloud of amorphous SiO₂ nanoparticles called **silica fume** or microsilica, which is bag-filtered and sold to the concrete industry. The silicon yield of a well-run furnace is ~85–90%; the remaining 10–15% leaves as fume. A furnace that is run too hot, too fast, or with too little reactive carbon in the upper bed loses more.

### 3.2 The furnace

A modern silicon furnace is a refractory-lined steel shell, typically 8–12 m in diameter and several meters deep, open at the top (or fitted with a semi-closed hood for gas capture), rated at **10–45 MW**. Three **Söderberg electrodes**, self-baking carbon columns 1.2–2 m in diameter, hang from above and descend into the charge. Söderberg electrodes are made continuously: a steel casing is filled with carbon paste (anthracite plus coal-tar pitch) at the top, and as the column is slipped downward the paste bakes into solid electrode in the heat of the furnace. The three electrodes carry three-phase AC at low voltage and enormous current (on the order of 100 kA per electrode), and the tips sit in gas-filled craters below the charge surface, hence "submerged arc." The heat is a mixture of arc and resistive heating through the charge and the molten silicon. Electrode consumption is on the order of 100 kg per tonne of silicon and is itself a carbon input to the reaction.

The charge is dosed by weight from bins: quartz lumps plus a carefully balanced reductant mix. The reductants are chosen for **reactivity toward SiO** (how well they capture the gas on the way up), for **porosity** (a permeable charge that lets gas out and heat in), and for **ash chemistry** (ash is where the Fe, Al, Ca, Ti, B, and P come from). The typical mix is:

- **Coal**, usually low-ash bituminous coal from Colombia or similar, the main carbon source;
- **Charcoal**, more reactive and lower in ash than coal, especially valued in Brazil and Norway, and the reason some smelters advertise a partly renewable carbon footprint;
- **Petroleum coke**, dense and low-ash but low-reactivity, used sparingly;
- **Wood chips**, which contribute little carbon but keep the charge open and porous, prevent crusting, and improve SiO capture in the upper bed. A silicon smelter can consume its own weight in wood chips over a campaign, and shortage of clean wood chips is a real operating constraint.

The furnace is stoked continuously: a stoking machine (or, in older plants, workers with long steel poles) breaks the crust that forms at the surface, pushes fresh charge toward the electrodes, and keeps the craters from collapsing. Molten silicon (melting point 1,414 °C) pools at the hearth and is tapped every 1–2 hours through a tap hole opened with an oxygen lance or a drilling machine and closed again with a clay plug.

### 3.3 Refining, casting, crushing

The liquid silicon runs into a ladle, where it is **oxidatively refined**: a mixture of oxygen and air is blown through the melt beneath a lime-silica slag. Aluminum and calcium oxidize preferentially (their oxides are more stable than SiO₂) and report to the slag; a typical refining step takes Al from ~0.5% to ~0.1% and Ca from ~0.3% to below ~0.05%. Iron is not removed by this step, because Fe is more noble than Si, which is why iron control has to be done at the raw-material end. Boron and phosphorus are essentially untouched by ladle refining.

The refined silicon is cast into shallow iron or graphite moulds, or onto a casting bed, as slabs ~10 cm thick. Slow cooling segregates the remaining Fe, Al, Ca, and Ti into intermetallic phases (FeSi₂, Al-Ca-Si compounds) at grain boundaries, which matters later because the chlorosilane synthesis chemistry can be sensitive to these phases. The slabs are crushed to the customer's size, typically 10–100 mm lumps for chemical customers.

The product is **metallurgical-grade silicon (MG-Si)**, also called silicon metal, at **98.5–99.5% Si**. A representative analysis: Fe 0.2–0.6%, Al 0.1–0.4%, Ca 0.02–0.2%, Ti 0.01–0.05%, B 5–40 ppmw, P 10–50 ppmw, plus carbon at saturation (a few hundred ppm as dissolved C and SiC). Polysilicon makers specify a "chemical grade" with tighter limits, especially on Ti, B, and P, and pay a premium for it.

> **Worked example: energy and efficiency of the arc furnace.**
> The reaction enthalpy is +690 kJ per mole of Si, and one mole is 28.09 g, so the thermodynamic minimum is 690 / 28.09 = 24.6 MJ/kg = 6.8 kWh/kg, or **6.8 MWh per tonne** of silicon, before counting the energy to heat the reactants to 2,000 °C, the latent heat of melting, and the heat carried out by ~2 tonnes of CO gas per tonne of Si. Real furnaces consume **11–13 MWh/tonne** (the best large furnaces are near 11; small or old ones exceed 13), so the reaction-to-electricity efficiency is on the order of 55–60%, which for a 2,000 °C electrochemical-scale process is respectable. At an industrial electricity price of $0.05/kWh, the power bill alone is ~$600/tonne, roughly a quarter to a third of the ~$1,500–2,500/tonne price of chemical-grade MG-Si (Chinese domestic prices at the low end, Western contract prices at the high end); that arithmetic is why silicon smelters cluster where hydro (Norway, Quebec, Yunnan, Sichuan) or cheap coal (Xinjiang, Inner Mongolia) power sits. The CO₂ footprint from the carbon reductant alone is ~4–5 tonnes CO₂ per tonne Si (stoichiometry gives 3.1 t for two moles of CO per mole of Si fully oxidized, but real fixed-carbon consumption is ~1.2 t per tonne of Si because of SiO losses and electrode paste).

### 3.4 Who makes MG-Si

Global silicon-metal production is on the order of 4.5–5 million tonnes a year, and China produces roughly 80–85% of it; USGS put 2024 world output at ~4.6 Mt with Chinese output at ~3.9 Mt (Chinese industry data, which count secondary silicon, run higher). The largest single producer is **Hoshine Silicon** in Xinjiang, with well over a million tonnes of capacity. Outside China, **Ferroglobe** (Spain, France, Canada, the US, South Africa; ~350 kt/yr silicon metal, the largest non-Chinese producer) and **Elkem** (Norway, Iceland, Canada, Paraguay, China; Norwegian-listed and majority owned by China National Bluestar) dominate, with **Dow** (Brazil), **RIMA** and **Liasa** (Brazil), **Simcoa** (Australia), and **Mississippi Silicon** (US) as smaller players. Wacker has never smelted its own; it buys chemical-grade MG-Si under long-term contracts from Elkem, Ferroglobe, and Brazilian producers, which is partly why "UFLPA-clean" supply (Section 9) matters to it.

Demand splits roughly into thirds: aluminum alloys, silicones (the Müller-Rochow direct synthesis of methylchlorosilanes from MG-Si and methyl chloride at Dow, Wacker, Momentive, Shin-Etsu, Elkem, and Chinese producers), and polysilicon, which has been the growth engine: solar polysilicon alone consumed on the order of 2 Mt of MG-Si in 2024.

## 4. The Siemens Process

The Siemens process is three unit operations wrapped in a recycle loop: make **trichlorosilane (TCS, SiHCl₃)** from MG-Si and HCl, distill it to extreme purity, then decompose it on hot silicon rods. Everything else, the vent-gas recovery, the silicon tetrachloride converter, the HCl absorber, exists to close the mass balance so that chlorine and hydrogen circulate and only silicon leaves.

### 4.1 Hydrochlorination: MG-Si to trichlorosilane

MG-Si is ground to a powder of roughly 50–300 µm and fed to a **fluidized-bed reactor (FBR)**, a vertical steel vessel in which upward-flowing gas suspends the powder like a boiling liquid, giving intimate gas-solid contact and superb heat transfer. Two variants are in use, and modern plants run both:

**Direct chlorination** (the original Siemens route):

Si + 3HCl → SiHCl₃ + H₂ (ΔH ≈ −220 kJ/mol, strongly exothermic)

at ~**300–350 °C** and 1–5 bar, often with a small copper addition as catalyst. Because it is exothermic, the reactor is cooled, not heated; runaway temperature drives the side reaction to **silicon tetrachloride (STC, SiCl₄)**, Si + 4HCl → SiCl₄ + 2H₂, which also becomes dominant above ~400 °C. Selectivity to TCS is typically 85–90%, the rest STC and a few percent dichlorosilane (SiH₂Cl₂, **DCS**).

**Hydrochlorination** (also called STC hydrogenation or the "cold converter" route), developed by Union Carbide and now the backbone of low-cost Chinese plants:

3SiCl₄ + Si + 2H₂ → 4SiHCl₃

at ~**500–600 °C** and **20–35 bar**, with copper catalyst. This reaction consumes the STC that the deposition reactor produces (Section 4.3), converting it back to TCS in the presence of fresh MG-Si. Per-pass conversion is only ~20–30%, so the STC recirculates many times, but it means the plant needs far less HCl make-up and disposes of no STC. It is the reason modern integrated plants describe themselves as "closed loop."

In both variants, the impurities in the MG-Si react too. Iron, aluminum, calcium, and titanium form FeCl₃, AlCl₃, CaCl₂, TiCl₄; boron forms **BCl₃**; phosphorus forms **PCl₃** (and some PH₃ and phosphorus hydrochlorides); carbon comes through as methylchlorosilanes and hydrocarbons. Unreacted silicon, metal chlorides that are solid at reactor temperature, and fines are removed in cyclones and filters. The crude product is a hot gas of TCS, STC, DCS, HCl, H₂, and every volatile impurity chloride, which is condensed to a liquid at ~ −30 to +10 °C, with H₂ and most HCl going off as gas to recovery.

### 4.2 Distillation: the purity step

The condensed crude chlorosilane is roughly 99.9% pure, which is nowhere near enough. It is now sent to a train of **fractional distillation columns**, typically **three to six columns** in series, each 30–60 m tall and packed with structured packing or fitted with 60–100 trays. Distillation exploits the difference in boiling points among the components:

| Compound | Formula | Boiling point at 1 atm |
|---|---|---|
| Silane | SiH₄ | −112 °C |
| Dichlorosilane (DCS) | SiH₂Cl₂ | 8.3 °C |
| Boron trichloride | BCl₃ | 12.5 °C |
| Trichlorosilane (TCS) | SiHCl₃ | 31.8 °C |
| Silicon tetrachloride (STC) | SiCl₄ | 57.6 °C |
| Phosphorus trichloride | PCl₃ | 76 °C |
| Titanium tetrachloride | TiCl₄ | 136 °C |
| Aluminum chloride | AlCl₃ | sublimes ~180 °C (solid at column conditions) |
| Iron(III) chloride | FeCl₃ | ~315 °C (solid) |

The "lights" column takes overhead the DCS, dissolved HCl, and low boilers; the "heavies" column leaves STC, PCl₃, TiCl₄, and all the metal chlorides in the bottoms. The metal chlorides are easy: AlCl₃ and FeCl₃ are essentially non-volatile at 30–60 °C and never make it up a column. Phosphorus is moderately easy: PCl₃ boils 44 °C above TCS and follows the STC into the bottoms, and the STC stream is itself re-distilled before recycling.

**Boron is the hard one.** BCl₃ boils only 19 °C below TCS, so the relative volatility between them is small and separating them to the ppt level requires many theoretical stages at high reflux ratio, which means tall columns and a lot of reboiler energy per kilogram of product. Worse, boron chemistry is not just BCl₃: boron forms hydride-chloride and Si-B species, and BCl₃ interacts with trace moisture and with the column's own materials, so a small fraction of the boron travels as species whose volatility is close to that of TCS. Since boron has a segregation coefficient of 0.8 in silicon (Section 1), whatever survives distillation ends up almost entirely in the wafer, with nothing downstream able to fix it. The industry's responses, layered on top of the columns, include:

- **Complexing**: passing the chlorosilane over or through a Lewis base (amines, aminated resins, or in older plants simply partially hydrolyzed silica surfaces) that binds BCl₃ into a non-volatile adduct, which then leaves in the bottoms;
- **Adsorption** on activated carbon, silica gel, or ion-exchange resins in guard beds;
- **Partial hydrolysis**: a controlled trace of water converts BCl₃ to boric acid species that are non-volatile, at the cost of also converting some TCS to siloxanes that must be removed;
- Running the first TCS column with a deliberately large "lights" cut so that every trace of BCl₃ goes overhead with the DCS and is destroyed or vented rather than allowed near the product draw.

The exact sequence and the adsorbent chemistry are among the most closely held pieces of know-how at Wacker, Hemlock, and Tokuyama. What is public is the result: electronic-grade TCS leaving the last column carries boron and phosphorus at the low-ppt level (below about 10 ppta, i.e. below ~5 × 10^11 atoms/cm³ in the eventual silicon), and total metals below 1 ppbw. The chlorosilane at this point is arguably the purest bulk chemical made by industry.

Carbon deserves a note. TCS is a hydrocarbon-free molecule, but the MG-Si is carbon-saturated and the reductant ash brings hydrocarbons; the carbon comes through as CH₃SiCl₃ (methyltrichlorosilane, boiling point 66 °C, so it goes to the heavies), CH₃SiHCl₂ (41 °C, awkwardly close to TCS), and light hydrocarbons. Carbon in the final silicon at ~0.1 ppma and above interferes with oxygen precipitation control in CZ crystals, so electronic-grade specs limit it to ≤ ~0.1–0.3 ppma, tighter than most solar specs.

### 4.3 The deposition reactor

The purified TCS goes to the **Siemens reactor**, a **bell-jar** chemical vapor deposition (CVD) chamber. The base plate, a thick stainless-steel disc with water-cooling channels and gas inlets/outlets, carries pairs of electrical feedthroughs. Into each pair of sockets is set a **slim rod**: a 7–10 mm diameter, 2–3 m long rod of ultra-pure silicon (itself cut from previous polysilicon by float-zone growth or sawn from rods), with a short horizontal bridge across the top joining two vertical legs into an inverted **U**. A modern reactor holds **24, 36, 48, or 72 rod pairs** (i.e. 48–144 legs); older designs had 8–18 pairs. Over the base plate is lowered the bell jar itself: a double-walled stainless-steel dome, water- or oil-cooled, whose inner surface is polished and often silver- or gold-plated to reflect thermal radiation back at the rods. The wall is kept below ~300 °C so that no silicon deposits on it.

**Startup.** Silicon at room temperature is a poor conductor (intrinsic resistivity ~2 × 10^5 Ω·cm), so the slim rods cannot be heated by ordinary current. Either a high-voltage (several kV) supply breaks through, or the rods are preheated by radiation from an auxiliary heater until they reach ~400 °C, where their resistivity has fallen by orders of magnitude and the main low-voltage, high-current supply takes over. From then on the rods are Joule-heated, with optical pyrometers reading the rod surface through sight glasses to control the current.

**Deposition.** A mixture of hydrogen and TCS (molar ratio H₂:TCS in the range ~3:1 to 10:1, most plants toward the lower end today) is fed at a total pressure of ~5–6 bar (old reactors ran near atmospheric; pressure raises deposition rate). The rod surface is held at **~1,050–1,150 °C**, well below the 1,414 °C melting point. The principal reactions at the hot surface are

SiHCl₃ + H₂ → Si + 3HCl (hydrogen reduction)
2SiHCl₃ → Si + SiCl₄ + 2HCl (disproportionation)
SiHCl₃ → SiCl₂ + HCl, then SiCl₂ + H₂ → Si + 2HCl (via the dichlorosilylene intermediate)

The net effect is that for each mole of silicon deposited, on the order of 3–4 moles of TCS are consumed, with 1–2 moles ending up as STC. Only ~10–20% of the TCS entering the reactor converts to solid silicon per pass; the rest leaves as unreacted TCS, STC, HCl, DCS, and hydrogen. The gas velocity and injection nozzle pattern are engineered to sweep the rods uniformly; poor distribution gives fat rods near the inlet and thin ones elsewhere.

The rods grow radially at roughly **0.5–1 mm of radius per hour**. Over a run of **60–120 hours** each leg grows from ~8 mm to **120–200 mm** in diameter, and the U-pairs end up as heavy, dull-grey, faintly nodular columns. Process engineers walk a line: raising surface temperature and TCS partial pressure speeds growth but promotes gas-phase nucleation of powder and, at the rod surface, growth of a dendritic, cauliflower-like texture called **popcorn**. Popcorn surface contains closed voids that trap process gas and adsorb contaminants, and popcorn chunks release gas violently when they melt in a CZ crucible, splashing silicon onto the crucible wall and heater. Electronic-grade rods are grown slower and smoother than solar rods for exactly this reason.

**Power.** Nothing about the chemistry demands much energy; the TCS reduction is only mildly endothermic. The cost is radiation. A grey body at 1,373 K (1,100 °C) with emissivity ~0.7 radiates about σεT⁴ = 5.67 × 10^-8 × 0.7 × (1373)⁴ ≈ **140 kW per square meter** of rod surface. A single fully grown 150 mm × 2.5 m leg has ~1.2 m² of surface. Rods facing each other re-absorb much of one another's radiation and the reflective wall returns some, but the reactor still dumps megawatts into its cooling water for the whole run. That is why Siemens reactors historically consumed **100–150 kWh per kg** of silicon (1980s–2000s designs; some plants still run them), why the best modern reactors with large rod counts, high pressure, optimized H₂:TCS, and reflective walls are in the **40–60 kWh/kg** range for the CVD step alone, and why the all-in figure for a modern plant (distillation reboilers, converters, compressors, cooling) is ~50–65 kWh/kg, compared with ~100+ kWh/kg for older complete lines. A 36-pair reactor draws ~3–5 MW toward the end of a run. That electricity is 30–40% of the cash cost of solar polysilicon, and it is the reason the industry migrated to coal-powered Xinjiang and Inner Mongolia at $0.03–0.04/kWh.

**Batch size.** A 12–24 pair reactor of 1990s design yields **1–2 tonnes** per batch; the 36–72 pair reactors built in China since ~2018 yield several tonnes, with the largest reported designs approaching 10 tonnes. A 100,000 t/yr solar plant thus runs on the order of 100–150 reactors in staggered cycles, each with its own power supply, gas manifold, and off-gas header.

### 4.4 Off-gas recovery and the STC loop

The reactor exhaust, 80–90% of the mass fed, is the part of the plant that decides whether the operation is economic and legal. The **vent-gas recovery (VGR)** system compresses and chills the stream; chlorosilanes (TCS, STC, DCS) condense at around −40 to −60 °C and go back to distillation; HCl is absorbed into cold chlorosilane or water and re-used; hydrogen is purified over activated carbon adsorbers and recycled to the reactors. Even 100 ppm of contamination in recycled hydrogen would ruin the product, so the H₂ loop has its own purification and monitoring.

The **STC** stream is the largest byproduct; an open-loop Siemens plant makes something like 10–20 kg of STC per kg of polysilicon. Three fates are available:

1. **Hydrochlorination** back to TCS with MG-Si and H₂ (Section 4.1), the dominant modern route;
2. **Thermal hydrogenation**, SiCl₄ + H₂ → SiHCl₃ + HCl, at ~1,000–1,250 °C in a graphite-heater "hot converter," an older, energy-hungry approach (~1–2 kWh per kg of STC converted) that some Western plants still run;
3. **Sale** to the fumed-silica industry (Cabot, Evonik, Wacker's own silica business) and to optical-fiber preform makers (Corning, Prysmian, Sumitomo Electric), for whom STC is the raw material. Wacker Burghausen is famous for being a chemical complex in which the polysilicon plant's STC feeds the silica plant, which in turn feeds silicones, so that "waste" is a product.

### 4.5 Harvest, breaking, etching, packaging

When the target diameter is reached the power is ramped down, the reactor is purged with nitrogen, the bell jar is lifted by crane, and the rods are removed. For electronic grade, everything from this moment on happens in a **cleanroom** (typically ISO Class 6–7, i.e. Class 1,000–10,000) with the same logic as a fab: the polysilicon is now pure enough that a fingerprint, a steel tool, or ambient dust would be the dominant contamination.

The U-rods, each weighing 100–250 kg, are broken into chunks: historically by operators with tungsten-carbide or silicon-headed hammers, now for electronic grade by automated crushers with tungsten-carbide or silicon-lined jaws followed by optical sorting; solar grade uses ordinary jaw crushers. The output is screened into size classes (typically chips < 10 mm, then 10–45, 45–90, 90–160 mm, and lumps > 160 mm), because a crystal grower needs a particular size distribution to pack the crucible densely (Module 02).

Breaking contaminates the surface with tool metal and particles. For electronic grade, the chunks are therefore **etched** in HF/HNO₃ (nitric acid oxidizes the silicon surface, hydrofluoric acid dissolves the oxide), removing a few microns of surface and the embedded metal with it, then rinsed in 18.2 MΩ·cm ultrapure water and dried in filtered nitrogen. Etched electronic-grade chunk carries surface metals below ~1 ppbw total; "as-broken" chunk can be 10–100 × higher. Solar grade is mostly sold unetched, "as-is," one reason it is cheaper.

Chunks are weighed into **double polyethylene bags** of 5–10 kg, heat-sealed, packed in cartons on pallets, and shipped by truck or container. A 300 mm fab's silicon supply chain thus literally begins with a cardboard box of grey rocks arriving at a Shin-Etsu or SUMCO crystal-growing plant.

## 5. FBR Granular Polysilicon: the Silane Route

The Siemens process's two structural weaknesses are that it is a batch process and that it spends its energy heating a surface that faces a cold wall. The **fluidized-bed reactor (FBR) granular** process attacks both.

### 5.1 Silane

Most FBR plants use **monosilane, SiH₄**, rather than TCS. Silane is made from TCS by catalytic **redistribution** (the Union Carbide process, developed under a 1970s US DOE program and commercialized by Union Carbide at Moses Lake, later REC Silicon, and by MEMC/SunEdison at Pasadena, Texas, whose technology now belongs to GCL):

2SiHCl₃ ⇌ SiH₂Cl₂ + SiCl₄
2SiH₂Cl₂ ⇌ SiH₃Cl + SiHCl₃
2SiH₃Cl ⇌ SiH₄ + SiH₂Cl₂

over amine-functionalized ion-exchange resin catalysts in a cascade of reactors and columns. The equilibria are unfavorable at each step, so the system runs as a reactive-distillation loop that keeps stripping off the volatile silane (boiling point −112 °C) and recycling the chlorides; net, about 4 moles of TCS become 1 mole of silane and 3 moles of STC, which is hydrochlorinated back to TCS. Silane is pyrophoric (ignites spontaneously in air), which makes its handling the main safety feature of these plants.

Silane has a chemical advantage beyond process economics: it contains no chlorine and its purification by distillation is different in character. Boron and phosphorus hydrides (B₂H₆, PH₃) boil at −93 °C and −88 °C respectively, far from silane's −112 °C, and metal hydrides are essentially non-existent as volatiles, so silane can be distilled and adsorber-purified to a level that makes it also the standard silicon precursor for epitaxy and CVD inside the fab.

### 5.2 The reactor

Silane decomposes cleanly and completely:

SiH₄ → Si + 2H₂

at **600–750 °C**, much lower than TCS, with no HCl byproduct and near-100% single-pass conversion. In the FBR, a bed of silicon **seed granules** (~0.3–1 mm, made by grinding product granules in a clean mill) is fluidized by a mixture of silane and hydrogen entering through a distributor plate at the bottom. The bed is heated to reaction temperature (by wall heaters, microwave, or induction; heating the bed without depositing silicon on the heater is the central engineering problem, since anything hot inside the reactor grows a silicon crust). Silane decomposes on the granule surfaces; each granule grows layer by layer until it is **1–3 mm** across and heavy enough to be withdrawn from a bottom port while fresh seed is added at the top. The process is continuous, running for weeks to months between shutdowns.

Two mechanisms limit it. First, **homogeneous nucleation**: silane will happily decompose in the gas phase into amorphous silicon nanoparticles, or "fines," instead of on the granules; fines elutriate with the hydrogen and are lost or, worse, deposit on downstream surfaces. Keeping the silane partial pressure low and the gas residence time short suppresses this but limits throughput. Second, **contamination from the reactor**: every granule is in constant collision with every other granule and with the wall. Steel walls put iron, chromium, and nickel on the granule surfaces; quartz or silicon-carbide liners improve this but cannot be heated as aggressively. Granular product also traps **hydrogen** (from incompletely dehydrogenated growth layers, typically tens of ppm), which comes out as bubbles when the granules melt and can splash silicon in a CZ crucible unless the material is degassed or melted carefully. Dust on the granule surface increases the oxygen and carbon load in the melt.

The payoff is energy: FBR consumes roughly **5–15 kWh/kg**, against 40–60 for a modern Siemens CVD step, and needs no rod harvesting, breaking, or etching. GCL claims a total energy consumption for its granular product below 20 kWh/kg including silane production, versus ~50 for its former Siemens lines.

### 5.3 Who runs FBR and how it is used

**GCL Technology** is the world's largest FBR producer by a wide margin: it bought SunEdison's silane-FBR technology in 2017, spent five years fixing it, and by 2025 had converted its entire ~480 kt/yr nameplate capacity to granular silicon, about a quarter of Chinese output in the first half of 2025. **REC Silicon** ran silane-FBR at Moses Lake, Washington, for two decades, mothballed it in 2019, restarted it in 2023–24 with Hanwha as anchor customer, and announced its shutdown in December 2024 (production ceased in early 2025) after the granular material failed Hanwha's qualification test on impurity levels and ingot yield; REC still makes silane gas at Butte, Montana, for the electronics industry. **Wacker** has run a small (~650 t/yr) TCS-based FBR at Burghausen since 2009 as a supplement to its Siemens lines.

The way the market uses granular polysilicon reveals its status. Solar crystal growers blend granules at ~20–50% with Siemens chunk: the granules fill the gaps between chunks, raising crucible packing density from ~55–60% to ~70%, and they enable **continuous Czochralski (CCz)**, in which granules are metered through a feed tube into the crucible during the pull (Module 02); chunk cannot be fed that way. For electronic grade, granular polysilicon has never won a significant share, because the surface-metal and hydrogen issues remain hard to close at 300 mm.

## 6. Grades: Electronic Grade vs Solar Grade

The **SEMI PV17** specification defines four grades of solar polysilicon feedstock, and wafer makers write their own, tighter specs for electronic grade. Rough boundaries, as of ~2025:

| Property | Electronic grade (EG) | Solar grade, SEMI PV17 Grade I–II (n-type / high-eff) | Solar grade, PV17 Grade III–IV |
|---|---|---|---|
| Nominal purity | 9N–11N | ~7N–8N | 6N–7N |
| Boron | ≤ 0.02–0.05 ppba | ≤ 0.1–0.3 ppba | ≤ 1–3 ppba |
| Phosphorus | ≤ 0.05–0.1 ppba | ≤ 0.3–1 ppba | ≤ 3–10 ppba |
| Total bulk metals (Fe, Cr, Ni, Cu, Zn, …) | ≤ ~0.1–1 ppbw | ≤ ~10–100 ppbw | ≤ 100–1,000 ppbw |
| Carbon | ≤ 0.1–0.3 ppma | ≤ 0.5–1 ppma | ≤ a few ppma |
| Surface metals (etched chunk) | ≤ ~1 ppbw | as-is | as-is |
| Minority-carrier lifetime of FZ test ingot | ≥ 1,000 µs | ≥ ~100 µs | not specified |

The Chinese solar industry's switch from p-type PERC to n-type TOPCon cells in 2023–2025 tightened the solar spec sharply, because n-type wafers are phosphorus-doped and are sensitive to boron and to the metals that limit lifetime; the good "N-type grade" solar polysilicon of 2025 (B ≤ ~0.1 ppba, P ≤ ~0.3 ppba, ~8N) is close to what was considered electronic grade in the 1990s.

So why is the electronic-grade supply dominated by a handful of incumbents, **Wacker** (Burghausen and Nünchritz, Germany; Charleston, Tennessee), **Hemlock Semiconductor** (Hemlock, Michigan; owned by Corning with a Shin-Etsu Handotai minority stake since Dow's exit in 2020), **Tokuyama** (Tokuyama, Yamaguchi, Japan), **OCI** (Gunsan, Korea, converted to electronic grade only in 2020, plus Samalaju, Malaysia), **Mitsubishi Materials** (Yokkaichi, Japan), and **REC Silicon** (silane gas and historically FBR/Siemens at Moses Lake and Butte), when Chinese producers make twenty times the tonnage?

1. **It is a small market.** Electronic-grade demand is on the order of 40–50 kt/yr, perhaps 3% of global polysilicon (~1.5–2 Mt/yr), and it grows with wafer starts at a few percent a year, not with solar's 30%. A single 100 kt solar line would double the world's EG supply; no one builds for that.
2. **Qualification is slow and sticky.** A wafer maker qualifying a new feedstock source for 300 mm grows test crystals, runs full wafer characterization (resistivity, lifetime, oxygen precipitation behavior, defect density), then ships wafers to fab customers who run their own qualification lots; the cycle is one to two years and the fab customer sees no benefit, only risk. Once a source is qualified it stays qualified for a decade under long-term contract.
3. **The last decade of purity is expensive in ways solar economics cannot justify**: extra distillation columns, resin guard beds, slower and smoother rod growth, cleanroom breaking, etching, and a much heavier analytical laboratory. Chinese producers have repeatedly announced "electronic grade" output (Xinte, Daqo, and Tongwei have all sold material into the 200 mm and discrete/power market and have programs for 300 mm), and as of ~2025 they do supply part of China's domestic wafer industry, but the top-tier 300 mm wafer makers (Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron) still buy overwhelmingly from the incumbents.
4. **Traceability and geopolitics** (Section 9) now cut in the incumbents' favor: US and Japanese customers want a supply chain that is not exposed to Xinjiang or to export-control retaliation.

## 7. How Purity Is Measured

You cannot buy a 9N assay off the shelf. Verifying polysilicon purity is a multi-technique exercise, and a producer's analytical lab is a significant part of its capital and know-how.

**Metals.** For bulk metals, a sample of chunk is dissolved in HF/HNO₃, the silicon is driven off as volatile SiF₄ by evaporation, and the residue is taken up in dilute acid and analyzed by **ICP-MS** (inductively coupled plasma mass spectrometry), which reaches sub-ppbw (often ppt) detection limits for Fe, Cr, Ni, Cu, Zn, Al, Na, K, Ca, and the rest. Surface metals are measured separately by extracting only the outer skin of the chunk in an HF/HNO₃ or HF/H₂O₂ bath and analyzing the extract; the difference between as-broken and etched chunk (Section 4.5) shows up here. **GDMS** (glow-discharge mass spectrometry) sputters a solid sample directly and gives a full-periodic-table survey at ~ppb levels without dissolution. Neutron activation analysis was the historical gold standard at ppt levels and is still used for referee measurements.

**Boron and phosphorus** are too dilute for chemistry at 10^11–10^12 cm³; instead the industry measures them electrically and optically in a test crystal. The standard method (SEMI MF1723, descended from ASTM F1723) is to grow a **float-zone (FZ) test ingot** from the polysilicon: a rod is melted zone-by-zone by an RF coil without any crucible (Module 02), so that nothing but the feedstock's own impurities enters the crystal. The FZ ingot's **resistivity** is then measured with a four-point probe (SEMI MF84) and converted to net donor or acceptor concentration with the standard resistivity-vs-dopant curves (SEMI MF723, the Irvin/Thurber curves). Because boron and phosphorus compensate each other, a single resistivity number is ambiguous, so two further steps are used: a "type test" (whether the FZ ingot comes out p- or n-type) and, for the definitive number, **low-temperature FTIR / photothermal ionization spectroscopy** on the FZ sample at ~10 K, where the shallow dopants B, P, Al, As, and Sb each show characteristic absorption lines and can be quantified individually down to ~10^11 cm³ (a few ppta). Some labs instead process the FZ ingot through a multi-pass zone refine to concentrate the impurities before measurement.

**Carbon and oxygen** are measured by room-temperature **FTIR** (Fourier-transform infrared) absorption at 605 cm⁻¹ (substitutional carbon, SEMI MF1391) and 1,107 cm⁻¹ (interstitial oxygen, SEMI MF1188), with detection limits ~10^15 cm³ (a few tens of ppba) at room temperature and better at cryogenic temperature. Oxygen in polysilicon is low anyway; it is the CZ crucible that adds oxygen (Module 02). Carbon in the FZ test ingot is also a check on the chlorosilane purification.

**Lifetime.** Because what a device engineer ultimately cares about is whether the metals kill minority-carrier lifetime, the FZ test ingot is also measured by **µ-PCD** (microwave photoconductance decay) or QSSPC after surface passivation; electronic-grade feedstock should give ≥ 1,000 µs lifetime, sensitive to interstitial iron at the 10^10 cm³ level, a sensitivity no chemical method matches.

**Hydrogen** in granular product is measured by hot extraction under vacuum, and **surface particles** on chunk by liquid-particle counting of a rinse. Every batch ships with a certificate of analysis; the wafer maker repeats a subset on incoming inspection and grows its own test crystals from new lots.

## 8. From Chunk to Crystal Grower: the Mass Balance

Where does the polysilicon go? For electronics, to the five wafer makers that account for ~90% of the 300 mm market (Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron) plus a long tail (Wafer Works, Ferrotec, NSIG/Zing in China, and the FZ specialists Topsil and Siltronic). For solar, to the ingot-and-wafer giants LONGi, TCL Zhonghuan, JinkoSolar, Trina, JA Solar, Gokin, and Shuangliang, essentially all in China. The crystal grower loads a fused-quartz crucible (Section 10) with a chosen mix of chunk sizes and, for solar, granules, and pulls a single crystal (Module 02).

> **Worked example: how much polysilicon is in one 300 mm ingot, and how many wafers is that?**
> A modern 300 mm Czochralski ingot has a usable cylindrical body about **2 m** long and is grown at ~305–310 mm diameter so that it can be ground to a precise 300 mm. Take 2.0 m × 306 mm: volume = π × (15.3 cm)² × 200 cm = 735 cm² × 200 cm = 147,000 cm³; at 2.33 g/cm³ that is **~343 kg** of single-crystal body. Add the cone-shaped shoulder (~10 kg), the tail (~10 kg), the Dash neck (negligible), and the residual melt left in the crucible at the end of the pull (a few percent of the charge, ~15–25 kg, deliberately left so that the impurity-enriched last liquid does not enter the crystal), and the initial **charge is ~400 kg** of polysilicon; a 32-inch (810 mm) crucible holds about that. Slicing: a finished 300 mm wafer is 775 µm thick, but the diamond-wire saw takes a **kerf** of ~120–170 µm per cut and lapping, etching, and polishing remove another ~80–120 µm, so the pitch per wafer along the ingot is roughly 1.0–1.1 mm. A 2 m body therefore yields **~1,800–2,000 wafers** (before rejecting the ends and out-of-spec slices, say ~1,700 shipped). Per shipped wafer, the polysilicon consumed is ~400 kg / 1,700 ≈ **0.23 kg**, of which only 127 g (π × 15² × 0.0775 × 2.33) is actually in the wafer; the rest is kerf, grinding swarf, crown, tail, and pot scrap, some of which is recycled as remelt. Scaling up: the world starts on the order of 8 million 300 mm wafers a month, so 300 mm alone consumes roughly 8 × 10^6 × 12 × 0.23 kg ≈ **22 kt of electronic-grade polysilicon a year**, and with 200 mm, 150 mm, and FZ material, total EG demand lands in the 40–50 kt/yr range quoted in Section 6, consistent with the incumbents' known capacities.

## 9. Economics, the China Boom, and Xinjiang

### 9.1 Price

Solar polysilicon is a commodity with a brutally cyclical price. It peaked near **$400/kg** on the spot market in 2008, when demand outran a Siemens capacity base built for electronics; collapsed to ~$15–20/kg by 2012 as Chinese capacity arrived; touched ~$7/kg in 2020; spiked to ~**$38–40/kg** (RMB ~300/kg) in late 2022; and then crashed as the 2022–2024 capacity wave landed. As of 2025–2026 the Chinese domestic price has been **~$5–8/kg** (RMB 35–60/kg), at or below the cash cost of even tier-1 producers (roughly $4–6/kg: ~1.1 kg of MG-Si at ~$1.5–2/kg, ~50 kWh at $0.03–0.04/kWh, plus consumables, labor, and maintenance; depreciation adds $1–2/kg). Chinese nameplate capacity exceeded 3 Mt/yr against global demand of ~1.5–2 Mt/yr; the 2025 "anti-involution" campaign and an industry proposal to buy out and retire older capacity were the response. Outside China, polysilicon documented free of Xinjiang content traded at **~$19–22/kg** through 2025 and 2026 (the OPIS Global Polysilicon Marker sat near $19–20/kg), a premium created entirely by policy.

Electronic-grade prices are not published; they are set in multi-year contracts between six producers and five wafer makers. Reasonable estimates put EG at **~$20–40/kg**, two to four times the solar price. At 0.23 kg per 300 mm wafer, the polysilicon in a $150–200 wafer is worth ~$5–10, and in a $20,000 leading-edge processed wafer it is a rounding error, which is precisely why electronics buyers pay for purity and traceability rather than shopping on price.

### 9.2 The China boom

In 2005 China made under 5% of the world's polysilicon; in 2024 it made ~93–95%, and nine of the ten largest producers were Chinese. **Tongwei** (originally an animal-feed company; ~910 kt/yr in Sichuan, Inner Mongolia, and Yunnan), **GCL Technology** (~480 kt/yr, all granular), **Daqo New Energy** (~300–350 kt/yr, Xinjiang and Inner Mongolia; NYSE-listed), **Xinte Energy** (a TBEA subsidiary, ~300 kt/yr), **East Hope**, and **Asia Silicon** lead; the four largest held about 65% of global output in 2024. Their advantages were not primarily technological (they adapt Western reactor designs, and GCL's FBR is SunEdison's) but scale, 18-month construction cycles, sub-$0.04/kWh coal or hydro power, cheap local MG-Si, and a domestic wafer industry that absorbs everything. Wacker's ~80 kt/yr and OCI Malaysia's ~35 kt/yr are the only non-Chinese solar-relevant capacity of note.

### 9.3 Xinjiang and the UFLPA

Xinjiang's coal is the cheapest in China, and by 2020 about 40–45% of Chinese polysilicon and a larger share of MG-Si (Hoshine) came from the region. In June 2021 the US Commerce Department added Hoshine Silicon, Xinjiang Daqo, Xinjiang East Hope, Xinjiang GCL, and the Xinjiang Production and Construction Corps to the Entity List, and CBP issued a Withhold Release Order on Hoshine's products, on forced-labor grounds. The **Uyghur Forced Labor Prevention Act (UFLPA)**, signed December 2021 and enforced from June 2022, presumes that anything made wholly or in part in Xinjiang is made with forced labor and bars it from the US unless the importer proves otherwise; polysilicon was named a priority sector, and CBP detained thousands of module shipments in 2022–2023.

The mechanical consequence is that every exporter to the US must trace its silicon back through polysilicon, MG-Si, and quartz to the quarry with mass-balance accounting at each step. Chinese producers built "non-Xinjiang" lines in Inner Mongolia, Sichuan, Yunnan, and Qinghai, sourcing MG-Si from hydro-powered smelters in Yunnan and Sichuan or from Elkem and Ferroglobe; Wacker, OCI Malaysia, and Hemlock found their products newly valuable as anchors of UFLPA-compliant supply chains, and the EU's Forced Labour Regulation (applying from late 2027) extends the same logic. For electronic-grade silicon the issue is exposure rather than labor: a fab in Arizona or Kumamoto does not want its wafer supply to depend on a region that could be sanctioned or embargoed in either direction.

## 10. The Other Ultra-Pure Feedstocks: Crucibles and Graphite

Polysilicon is not the only material that must be ultra-pure at this stage. The crystal grower in Module 02 will melt 400 kg (electronics) to over 1,000 kg (solar, with recharge) of it in a vessel at 1,500 °C for days, in contact with a heater, and every atom that leaves the vessel or heater ends up in the crystal.

### 10.1 The fused-quartz crucible

The crucible is **fused silica** (amorphous SiO₂), chosen because it is the only material that is both refractory enough (softens ~1,650 °C, adequate for a melt at ~1,420–1,450 °C, though the crucible does slowly sag and must be supported by a graphite susceptor) and chemically compatible: it dissolves into the melt, but what it adds is oxygen and silicon, and the oxygen (at ~10^18 cm³ in the crystal) is actually engineered for, since oxygen precipitates in the wafer bulk act as gettering sites for metals (Module 02). Nothing else, no nitride, no graphite, no metal, comes close.

**Manufacture** is by **arc fusion** (spin casting). A graphite mould, 32–36 inches (810–910 mm) in diameter for 300 mm ingots, spins on a vertical axis while quartz sand is poured in and centrifugally pressed against the wall into a sand shell 15–30 mm thick. Graphite electrodes are then lowered into the cavity and an arc at several thousand degrees fuses the sand from the inside outward, while vacuum applied through the porous mould wall pulls gas out of the fusing layer. The result is a two-layer structure: an **inner transparent layer** 1–3 mm thick, essentially bubble-free (bubbles at the inner surface would burst during the pull, releasing silica particles into the melt that nucleate dislocations, killing the single crystal), and an **outer opaque layer** full of small bubbles, which scatters heat and gives the crucible mechanical strength. For the inner layer, the highest-purity feed is used: IOTA-grade Spruce Pine natural quartz, or **synthetic quartz** made by flame hydrolysis of purified SiCl₄ (the same STC from the polysilicon plant, distilled to ultra-purity) or by a sol-gel route, at Al < 1 ppm and alkalis < 0.1 ppm versus ~10–20 ppm Al in the best natural material. Synthetic quartz is several times the price of natural HPQ, which is why crucible makers use it only where it counts (the inner layer, or the whole crucible for the most demanding FZ-quality and heavily doped applications). The outer layer can use lower natural grades. Some crucibles receive a barium-doped or "crystallization-promoting" inner coating that deliberately devitrifies the inner surface to a fine, adherent layer of cristobalite (crystalline SiO₂) on heating, which resists erosion and stops the random, flaking devitrification that would otherwise seed defects during long runs.

During a pull the melt dissolves the inner surface at roughly 10 µm per hour, so a 100-hour electronic pull consumes ~1 mm of the crucible wall; that is the origin of the crystal's oxygen and one reason a semiconductor crucible is **single-use**: it is cooled, cracks (fused silica and the cristobalite skin have mismatched thermal expansion), and is discarded, at a cost on the order of several thousand dollars per 300 mm crucible (more for synthetic-lined 36-inch parts). Solar crucibles, which are larger and run 300–400 hours with repeated recharging, are the crucible industry's volume business.

**Suppliers.** For semiconductor crucibles, **Shin-Etsu Quartz Products** (Japan), **Momentive Technologies** (Strongsville, Ohio; the former GE Quartz), **Heraeus Conamic** (Germany), and **Ferrotec** and **Coorstek** are the qualified names; Chinese crucible makers such as **OJing Technology** (Inner Mongolia, the first listed crucible maker) and a cluster of producers in Jinzhou (Liaoning) and Jiangsu dominate solar volume. Quartz ware for furnaces and wafer boats comes from the same firms plus Tosoh Quartz, Sibelco's own fused-quartz business, and QSIL. Above them sit the two HPQ miners, Sibelco and The Quartz Corp, and the synthetic producers (Heraeus, Shin-Etsu, and Jiangsu Pacific Quartz). The Helene episode is the reason every one of these companies now runs a formal second-source program.

### 10.2 Graphite hot-zone parts

Surrounding the crucible is the **hot zone**: a graphite **susceptor** (the cup that supports the softening quartz crucible), a graphite **heater** (a cylindrical resistance element slotted into a meander pattern, carrying kilo-amperes), graphite **heat shields and reflectors**, and insulation of carbon-fiber felt or rigid carbon-bonded carbon fiber. All of it sits in argon at ~1,500 °C within centimeters of the melt. Graphite is the only material that is machinable, thermally stable, electrically suitable for a heater, and does not melt or react catastrophically with silicon vapor and SiO gas.

The contamination pathway is carbon itself: SiO gas evaporating from the melt reacts with graphite, SiO + 2C → SiC + CO, and the CO diffuses back into the melt and dissolves as carbon, which at ~10^16 cm³ begins to disturb oxygen precipitation and at higher levels forms SiC inclusions. Hot-zone design therefore manages gas flow so that argon sweeps SiO away from the graphite, and the parts closest to the melt (the susceptor, the heat-shield lip) are increasingly made of **carbon-fiber-reinforced carbon (C/C)**, which is stronger and lasts longer, or are coated with **CVD silicon carbide** to seal the surface. Ash content in the graphite (Fe, Al, Ca, V, Ti, B) is reduced from the ~100–500 ppm of ordinary electrode graphite to **< 5 ppm** (often < 2 ppm for semiconductor grade) by **halogen purification**: the machined parts are heated to > 2,000 °C in chlorine or fluorine-bearing gas, which volatilizes the metals as chlorides. Boron in graphite is a particular concern, for the usual segregation reason.

The producers are the **isostatic graphite** specialists that serve the rest of the fab (Module 04): **Toyo Tanso**, **Tokai Carbon**, **Ibiden** (Japan), **SGL Carbon** (Germany), **Mersen** (France), **Entegris/Poco**, and China's **Sinosteel** and Fangda, with C/C from SGL, Toyo Tanso, and Chinese entrants. A 300 mm hot zone costs tens of thousands of dollars, and heaters and susceptors are consumables replaced after hundreds to a few thousand hours.

## Key Numbers

| Quantity | Value |
|---|---|
| Silicon atom density | 5.0 × 10^22 atoms/cm³ |
| 9N (1 ppb) impurity in silicon | 5 × 10^13 atoms/cm³ |
| Segregation coefficient, B / P / Fe in Si | 0.8 / 0.35 / ~8 × 10^-6 |
| Carbothermic reduction enthalpy | +690 kJ/mol Si (6.8 MWh/t theoretical minimum) |
| Submerged-arc furnace energy | 11–13 MWh per tonne MG-Si |
| Furnace hot-zone temperature / rating | ~1,900–2,000 °C / 10–45 MW |
| Quartz per tonne MG-Si | ~2.5–2.7 t; silicon yield ~85–90% |
| MG-Si purity | 98.5–99.5% Si; B 5–40 ppmw, P 10–50 ppmw |
| Global silicon-metal output; China share | ~4.6 Mt in 2024 (USGS); ~85% (China ~3.9 Mt) |
| Direct chlorination Si + 3HCl → SiHCl₃ + H₂ | ~300–350 °C, 1–5 bar, exothermic |
| Hydrochlorination 3SiCl₄ + Si + 2H₂ → 4SiHCl₃ | ~500–600 °C, 20–35 bar |
| Boiling points: BCl₃ / SiHCl₃ / SiCl₄ / PCl₃ | 12.5 / 31.8 / 57.6 / 76 °C |
| Siemens rod temperature; batch time; final diameter | ~1,050–1,150 °C; 60–120 h; 120–200 mm |
| Siemens CVD energy | 40–60 kWh/kg (modern); 100–150 kWh/kg (older) |
| Siemens batch mass | 1–2 t (older 12–24 pair); several t (36–72 pair) |
| Silane pyrolysis in FBR | 600–750 °C; ~5–15 kWh/kg; granules 1–3 mm |
| EG vs solar boron spec | ≤ 0.02–0.05 ppba vs ≤ 0.1–3 ppba |
| Polysilicon per 300 mm wafer / per 2 m ingot body | ~0.23 kg / ~343 kg body, ~400 kg charge |
| Global polysilicon demand; EG share | ~1.5–2 Mt/yr; ~40–50 kt/yr (~3%) |
| China share of polysilicon output (2024) | ~93–95%; top 4 producers ~65% |
| Solar polysilicon price, China, 2025–26 / non-China UFLPA-clean | ~$5–8/kg / ~$19–22/kg |
| Electronic-grade polysilicon price (estimate) | ~$20–40/kg, contract |
| Crucible inner-layer quartz purity (natural IOTA vs synthetic) | ~10–20 ppm total vs Al < 1 ppm |
| Semiconductor graphite ash content after halogen purification | < 5 ppm (< 2 ppm best) |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Sibelco (IOTA) | Belgium / US (Spruce Pine, NC) | High-purity quartz for crucibles, quartzware | Leader |
| The Quartz Corp | Norway / France (mines Spruce Pine, refines at Drag) | High-purity quartz | #2 |
| Jiangsu Pacific Quartz | China | Natural HPQ processing, synthetic quartz, crucible feed | Rising #3 / China leader |
| Hoshine Silicon | China (Xinjiang) | Largest MG-Si producer; Entity-listed, UFLPA-exposed | Leader (MG-Si) |
| Ferroglobe | Spain / US / Canada / France / South Africa | MG-Si, ~350 kt/yr, largest outside China | Leader ex-China |
| Elkem | Norway (Bluestar-owned) | MG-Si, silicones, silica fume; supplier to Wacker | #2 ex-China |
| Wacker Chemie | Germany / US (Charleston, TN) | EG and solar polysilicon, ~80 kt/yr; STC-integrated chemical site | EG leader |
| Hemlock Semiconductor | US (Michigan; Corning + Shin-Etsu Handotai) | EG polysilicon, some solar | EG #2 |
| Tokuyama | Japan | EG polysilicon | EG top tier |
| OCI | Korea (Gunsan, EG) / Malaysia (Samalaju, solar) | EG and UFLPA-clean solar polysilicon | EG / clean-solar niche |
| Mitsubishi Materials | Japan (Yokkaichi) | EG polysilicon | EG niche |
| REC Silicon | US (Butte, MT; Moses Lake, WA idle) | Silane gas; former FBR granular | Silane leader, FBR exited (as of ~2025) |
| Tongwei | China | Solar polysilicon, ~910 kt/yr, Siemens | World #1 by volume |
| GCL Technology | China | Solar polysilicon, ~480 kt/yr, all FBR granular | #2, FBR leader |
| Daqo New Energy | China (Xinjiang, Inner Mongolia) | Solar polysilicon, ~300–350 kt/yr | Top 4 |
| Xinte Energy (TBEA) | China | Solar polysilicon, ~300 kt/yr; EG program | Top 4 |
| Shin-Etsu Quartz, Momentive Technologies, Heraeus Conamic | Japan / US / Germany | Semiconductor fused-quartz crucibles and quartzware | Leaders |
| Toyo Tanso, SGL Carbon, Tokai Carbon, Mersen, Ibiden | Japan / Germany / France | Isostatic graphite and C/C hot-zone parts | Leaders |
| Shin-Etsu, SUMCO, GlobalWafers, Siltronic, SK Siltron | Japan / Taiwan / Germany / Korea | The customers: 300 mm crystal growers and wafer makers | ~90% of 300 mm wafers |

## Common Misconceptions

- **"Chips are made from beach sand."** → Furnace feed is lumpy hard-rock quartz or quartzite chosen for size, thermal strength, and low B/P; beach sand is too fine and too dirty. The truly special "sand" in the chain is Spruce Pine high-purity quartz, and it goes into crucibles, not into the silicon.
- **"The arc furnace makes the pure silicon."** → The furnace makes 98–99% MG-Si, a commodity for aluminum and silicones. The ten additional nines come from converting silicon to trichlorosilane, distilling it, and redepositing it; the purification is chemistry, not metallurgy.
- **"Crystal growth cleans up the polysilicon, so feedstock purity is not critical."** → True for metals (Fe segregation coefficient ~10^-5), false for boron (0.8) and largely false for phosphorus (0.35) and carbon (0.07). Boron must be removed in the distillation columns or it is in the wafer forever.
- **"Solar polysilicon and electronic polysilicon are the same stuff at different prices."** → Modern n-type solar grade (~8N) is good material, but EG requires ~10–100 × lower B/P, far lower metals, etched surfaces, cleanroom handling, FZ test-ingot verification, and one-to-two-year customer qualification. That is why six companies supply almost all of it while China makes 95% of the tonnage.
- **"The Siemens process is energy-intensive because the chemistry is."** → The TCS reduction is only mildly endothermic. The energy goes into thermal radiation from 1,100 °C rods to cold, water-cooled walls, which is why rod count, pressure, reflective walls, and FBR alternatives are the levers.
- **"Hurricane Helene nearly stopped chip production."** → It stopped mining at Spruce Pine for about two weeks in October 2024. Months of inventory, intact mines, and qualified synthetic-quartz substitutes for the crucible inner layer meant no fab lost a wafer. The real lesson was concentration risk, not an actual shortage.

## Where This Fits in the Supply Chain

Module 00 mapped the chain from quartz to a GPU rack; this module is its first industrial step, the conversion of mined quartz (lump quartzite from quarries in Norway, Spain, Brazil, and China; high-purity quartz from Spruce Pine) into two ultra-pure products: 9N–11N electronic-grade polysilicon chunk in sealed polyethylene bags, and fused-quartz crucibles with graphite hot-zone parts. The inputs consumed are quartz, coal, charcoal, wood chips, electricity (~12 MWh/t for MG-Si, ~50–100 kWh/kg for polysilicon), HCl, hydrogen, and a great deal of analytical effort; the byproducts are silica fume, silicon tetrachloride (feeding fumed silica and optical fiber), and CO₂. The polysilicon ships from Wacker, Hemlock, Tokuyama, OCI, and Mitsubishi Materials (and Tongwei, GCL, Daqo for solar) to the crystal growers, Shin-Etsu, SUMCO, GlobalWafers, Siltronic, and SK Siltron, who in Module 02 will load ~400 kg of it into a crucible from Shin-Etsu Quartz or Momentive, sitting in a Toyo Tanso or SGL graphite hot zone, and pull it into a 300 mm dislocation-free single crystal.

## Further Reading

- W. C. O'Mara, R. B. Herring, L. P. Hunt (eds.), *Handbook of Semiconductor Silicon Technology*, Noyes Publications, 1990. Chapters 1–2 remain the most complete public description of MG-Si, chlorosilane chemistry, and Siemens deposition.
- A. Schei, J. K. Tuset, H. Tveit, *Production of High Silicon Alloys*, Tapir, 1998. The standard reference on submerged-arc furnace metallurgy, from Norway's silicon industry.
- Bernreuter Research, *Polysilicon Market Outlook* and the public pages on the Siemens process, FBR, and polysilicon price history (bernreuter.com). The most-cited independent source on producer capacities and rankings.
- USGS, *Mineral Commodity Summaries: Silicon* (annual). Global silicon-metal production, trade, and the reasoning behind the country shares.
- SEMI PV17, *Specification for Virgin Silicon Feedstock Material for Photovoltaic Applications*; SEMI MF1723, *Practice for Evaluation of Polycrystalline Silicon Rods by Float-Zone Crystal Growth and Spectroscopy*; SEMI MF723, resistivity-to-dopant conversion.
- Vince Beiser, *The World in a Grain*, Riverhead, 2018, and Ed Conway, *Material World*, Knopf, 2023. Both open their silicon chapters at Spruce Pine and give the best popular accounts of the high-purity quartz business.
- A. F. B. Braga, S. P. Moreira, P. R. Zampieri, J. M. G. Bacchin, P. R. Mei, "New processes for the production of solar-grade polycrystalline silicon: A review," *Solar Energy Materials & Solar Cells* 92 (2008) 418–424.
- S. Wolf and R. N. Tauber, *Silicon Processing for the VLSI Era, Vol. 1: Process Technology*, Lattice Press. Chapter 1 covers polysilicon and crystal growth from the fab engineer's side.
- Sibelco, "Sibelco Restarts Production and Customer Shipments at Spruce Pine Following Hurricane Helene," press release, 10 October 2024; and the ITRPV (International Technology Roadmap for Photovoltaic) annual reports for solar polysilicon consumption, wafer thickness, and kerf trends.
- Asianometry (YouTube) episodes on the polysilicon industry, the Siemens process, and Spruce Pine quartz, for a well-researched narrative overview.
