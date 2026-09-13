# Module 03: From Ingot to Polished Wafer

A finished Czochralski ingot is a 300 mm diameter, roughly 2 m long, 300+ kg cylinder of single-crystal silicon with a domed crown on one end and a conical tail on the other. What a fab wants is about 1,500 to 2,000 discs cut from it, each 775 µm thick, with a front surface whose height varies by less than ~20 nm across any 26 mm × 8 mm lithography site, roughness below 0.1 nm RMS, fewer than a handful of particles larger than 26 nm across the whole surface, metal contamination below ~10^10 atoms/cm², and edges that will not chip during a thousand process steps. Scale the wafer up to a football field 100 m across and the allowed bump height within a site is ~7 µm, a tenth of a human hair.

The difficulty is that silicon is hard (Mohs ~7, close to quartz), brittle, and every mechanical operation that shapes it leaves a layer of microcracks and dislocations beneath the surface. The entire wafering sequence is therefore a controlled descent: each step removes the damage layer left by the previous, coarser step, while adding a thinner damage layer of its own, until chemistry and chemical-mechanical polishing take over and the last few nanometers are removed without any mechanical damage at all. Along the way, ~25% of the ingot's silicon becomes sawdust and sludge.

## The Process Flow at a Glance

The table below is the map for everything that follows. Numbers are typical for 300 mm prime wafers; every wafer maker has its own recipe.

| Step | Purpose | Typical removal (300 mm) | Damage left behind |
|---|---|---|---|
| Crop and section | Remove crown/tail, cut test slugs, cut ingot into ~300–400 mm blocks | (ends of ingot) | Saw damage on block ends only |
| Cylindrical grind | Bring diameter to 300.0 mm, remove growth ripples | ~1–3 mm on radius | ~10–20 µm subsurface on periphery |
| XRD orient and notch grind | Locate <110>, cut the 1 mm notch | (notch only) | Local |
| Multi-wire saw | Slice block into ~900 µm slices | ~150–170 µm kerf per slice (diamond wire; 200+ µm slurry) | 5–30 µm subsurface cracks, saw marks |
| Double-disk grind (or lap) | Remove saw marks, set TTV < 1 µm | ~60–80 µm total | ~2–5 µm (fine wheel) or 10–15 µm (lapping) |
| Edge profile | Round the edge per SEMI M1 | (edge only) | Local, later polished |
| Alkaline/acid etch | Dissolve all remaining mechanical damage | ~20–30 µm total | None (chemically etched surface) |
| Laser mark | Write SEMI M12/M13 ID and T7 matrix | (mark only) | None |
| Double-side polish (DSP) | Flatten both faces, create mirror surface | ~15–25 µm total | Sub-nanometer |
| Final front-side CMP | Haze-free mirror, < 0.1 nm RMS | ~0.5–2 µm | None measurable |
| RCA clean and dry | Particles, metals, organics, no watermarks | < 1 nm | Leaves ~0.6–1 nm chemical oxide |
| Metrology and inspection | Certify flatness, nanotopography, LPDs, resistivity | 0 | 0 |
| Pack in FOSB | Ship 25 wafers per box under N2 | 0 | 0 |

Total: a raw slice of ~890–950 µm becomes a 775 µm wafer, and roughly 1.05 mm of ingot length is consumed per wafer.

## Cropping, Sectioning, and Ingot QC

### Removing crown and tail

The ingot arrives from the puller (Module 02) with a shoulder/crown where the diameter was expanded from the Dash neck, and a conical tail where the diameter was reduced to detach from the melt without dislocation slip-back. Both are cropped off. Historically this was done with an **inner-diameter (ID) saw**: a thin stainless-steel annulus, tensioned like a drumhead, with diamond grit electroplated on its inner edge. ID saws are still used for small diameters and for single cuts, but for 300 mm ingots the standard crop tool is a **diamond band saw** or a large diamond wire saw, because a 300 mm ID blade would need an impractically large, thick blade and would waste a wide kerf (~0.5 mm or more).

The cropped crown and tail are etched clean and returned to the puller as remelt charge.

### Sectioning into blocks

A 2 m body is too long for a wire saw's work envelope, so it is cut into **blocks** (also called sections or ingot segments) of ~300–400 mm length. From each cut face a thin **test slug** (a few mm thick) is taken. These slugs are the primary quality-control samples for the whole block, because the crystal's properties vary along its length in a predictable way due to dopant segregation (the segregation coefficient of boron in silicon is ~0.8, phosphorus ~0.35, so dopant concentration rises toward the tail) and because oxygen incorporation from the quartz crucible falls as the melt is depleted.

### What is measured on the slugs

- **Resistivity**: four-point probe (SEMI MF84) or non-contact eddy-current gauges. A typical p-type logic substrate is 1–20 Ω·cm (boron ~10^15 cm^-3); a p+ epi substrate is 0.005–0.02 Ω·cm. Fabs specify a resistivity window per product, and a block outside the window is diverted to another product or to test-wafer grade.
- **Interstitial oxygen**: Fourier-transform infrared (FTIR) absorption at 1107 cm^-1 (SEMI MF1188 / ASTM F1188). Typical CZ oxygen is 10–18 ppma (old ASTM units) or ~5–9 × 10^17 atoms/cm^3. Oxygen matters because it precipitates during fab thermal cycles, providing beneficial **intrinsic gettering** sites for metals in the bulk, but too much causes warpage and slip; fabs specify a narrow window (e.g. 12 ± 1.5 ppma) and a target precipitate density.
- **Substitutional carbon**: FTIR at 605 cm^-1; must be below ~0.1–0.5 ppma, since carbon nucleates unwanted oxygen precipitation.
- **Crystal defects and lifetime**: an etched slug is checked for dislocation etch pits (Secco or Wright etch) and the position of the OSF ring (oxidation-induced stacking-fault ring), which shows how close the pull was to the vacancy/interstitial boundary of Module 02; microwave photoconductive decay (µ-PCD) lifetime flags metal contamination at parts-per-trillion levels.

A block that passes gets a lot number that follows every wafer cut from it, with end-slug resistivity and oxygen interpolated to each wafer's position.

## Cylindrical Grinding to Diameter

The as-grown ingot has a diameter of ~302–306 mm with millimeter-scale ripples from melt level and pull-rate fluctuations. It is mounted between centers (or on a chuck) and turned against a diamond grinding wheel, exactly like a lathe, until the diameter is 300.00 mm. SEMI M1, the master specification for polished silicon wafers, sets the 300 mm diameter tolerance at ± 0.2 mm, and most wafer makers work to tighter internal limits (± 0.1 mm) because every downstream tool's edge grip, pre-aligner, and edge-exclusion metrology assumes a precise diameter.

The grind uses a resin- or metal-bonded diamond wheel in two passes (coarse ~#200–#400 grit, then fine ~#800–#1500) under coolant flood, removing 1–3 mm on the radius. It leaves a damage layer ~10–20 µm deep on the cylinder surface, which becomes the wafer edge, so the edge is later profiled and polished.

## Orientation and the Notch

### Why the wafer needs a fiducial

Silicon's mechanical, electrical, and etching properties are anisotropic. Transistor channels are conventionally oriented along <110> on a (100) wafer (the channel direction affects hole and electron mobility; some processes deliberately rotate 45° to <100> for mobility reasons). Cleavage planes, KOH etch facets, and the dicing streets also align with crystal directions. So every wafer must carry a mark that tells every tool where the crystal axes are. On 150 mm and smaller wafers this is the **primary flat**: a chord ground on the ingot along a {110} plane (57.5 mm long in the flatted 200 mm option of SEMI M1), plus a smaller secondary flat that encoded doping type and orientation. SEMI M1 offers 200 mm wafers with either a flat or a notch, and most 200 mm lines adopted the notch. On 300 mm wafers only the **notch** exists: a small V-shaped groove, 1.00 mm deep (+0.25/−0 mm), with a 90° (+5°/−1°) included angle and rounded bottom, per SEMI M1, centered on the <110> direction.

### Why a notch and not a flat on 300 mm

Three reasons. Area: a 57.5 mm flat on a 200 mm wafer removes a circular segment of ~160 mm² (about 0.5% of the wafer) plus a wider effective loss where the edge-exclusion band follows the flat; scaled to 300 mm a flat would be 80+ mm long and cost several dies, while a notch removes < 1 mm². Mechanics: a flat is a stress concentrator that breaks the axisymmetric stiffness of a wafer already sagging tens of micrometers under its own weight. Process uniformity: spin coating, spin rinsing, and edge-bead removal assume a circular edge, and a flat produces a coating anomaly downstream of it. The notch was introduced as an option in the 200 mm generation (early 1990s) and made the only fiducial in the 300 mm standard (~1999–2001) to eliminate all three.

### How orientation is found

The <110> direction is located by **X-ray diffraction (XRD)**. The block is rotated on a goniometer while a collimated X-ray beam (typically Cu Kα, 1.54 Å) hits a cut face; the detector sees the Bragg reflection from {220} planes only at the azimuth where those planes are set at the Bragg angle. The peak locates <110> to better than ± 0.1°. SEMI M1 requires the notch to be within ± 1° of <110>. The same measurement checks the surface orientation: the (100) face must be within ± 0.5° (or tighter for some epi products; a deliberate off-cut is not used for standard 300 mm CMOS wafers, though it is used for some epi and SiC products). A block whose growth axis has wandered off (100) by more than the tolerance is sawn at a corrected angle, which is why the wire saw's block holder has tilt adjustment.

After XRD, the notch is ground along the full length of the block with a small formed diamond wheel, so every slice from the block carries an identically placed notch.

## Multi-Wire Slicing

### The machine

A **multi-wire saw** does the single most consequential operation in wafering: it turns a block into slices, and it wastes the most silicon while doing so. The principle is simple. A single steel wire, 100–140 µm in diameter and tens to hundreds of kilometers long, is wound in a helix around three or four grooved rollers (wire guides) so that between two rollers it forms a **wire web** of several hundred to over a thousand parallel, equally spaced strands. The block, glued with epoxy or wax onto a sacrificial glass or graphite beam, is fed downward through the web. The wire runs continuously from a supply spool through the web to a take-up spool at 10–25 m/s, and all strands cut simultaneously. One pass through a 300–400 mm block takes 2–6 hours and yields 300–400 wafers.

The pitch of the grooves on the wire guides sets the wafer pitch: pitch = as-cut wafer thickness + kerf. For 300 mm prime wafers with a ~900 µm as-cut slice and ~150–170 µm kerf, the pitch is ~1.05–1.10 mm. The wire runs in **pilgrim mode**: forward several hundred meters, then back slightly less, then forward again, so that fresh wire is continuously introduced while each length of wire makes many passes. Wire tension is ~20–40 N, controlled to within a fraction of a newton, since tension variation produces wire bow variation and thus wafer thickness and warp variation.

Komatsu NTC (Japan) dominates 300 mm semiconductor wire saws, with Takatori and the former Meyer Burger line as alternatives. Diamond wire comes from Japanese suppliers such as Asahi Diamond Industrial, Nakamura Choko, and A.L.M.T., and increasingly from Chinese producers that grew up serving the solar industry.

### Slurry sawing versus diamond wire

Until roughly 2010–2015, wafers were cut by **loose-abrasive slurry sawing**: a bare steel wire (~140–160 µm) dragged silicon-carbide grit (F400–F600, ~10–17 µm) suspended in polyethylene glycol (PEG) through the cut. This is **three-body abrasion**: free-rolling SiC grains pressed by the wire indent the silicon, and each indentation drives a median crack downward and lateral cracks that pop out a chip. The surface is a mosaic of craters and the subsurface is a crack network 15–30 µm deep.

**Diamond wire sawing (DWS)** replaced this for PV and semiconductor wafers between ~2014 and 2018. Diamond grit of 8–25 µm is fixed to a 100–140 µm steel core by electroplated nickel, so the wire is the abrasive tool itself (**two-body abrasion**) and runs in water-based coolant. Diamond wire cuts 2–3 times faster (feed ~0.3–1 mm/min), with thinner kerf (150–170 µm versus 200+ µm), a shallower damage layer (5–15 µm), no PEG/SiC waste, and better consistency because fixed grit wears slowly. Its signature is a set of parallel **saw marks** and a thin amorphous or phase-transformed layer: the pressure under a diamond point drives silicon through the metallic Si-II (β-tin) phase and back to amorphous Si-III/Si-XII on unloading, which is what makes ductile-mode chip removal possible. The marks must be ground away downstream.

### Kerf loss and yield

Kerf is the width of the slot the wire cuts, roughly the wire diameter plus twice the protruding grit height plus wire vibration: a 120 µm core with 15 µm diamond gives a kerf of ~155–165 µm. For every 1.05 mm of ingot consumed, ~0.16 mm turns into silicon sludge. The kerf material is not recoverable for semiconductor use (contaminated with nickel, iron, and coolant), though it is sometimes sold for metallurgical or battery-anode applications.

> **Worked example: wafers from a 2 m ingot.** Take a 300 mm CZ ingot with a 2.0 m body (after crown and tail removal). Volume of the body = π × (0.15 m)² × 2.0 m = 0.141 m³; at 2,330 kg/m³ that is ~329 kg of silicon. Sectioning into six ~330 mm blocks costs one ~1 mm band-saw kerf per cut plus one ~3 mm test slug per block face: ~5 cuts × (1 + 6) mm ≈ 35 mm, leaving ~1,965 mm of sliceable length. With a diamond-wire pitch of 1.06 mm (900 µm as-cut + 160 µm kerf), the ingot yields 1,965 / 1.06 ≈ 1,850 slices. Discounting ~3% for broken or out-of-spec slices, ~1,800 wafers. Each finished 775 µm wafer has volume π × 15² × 0.0775 cm³ = 54.8 cm³ and mass ~128 g, so the 1,800 wafers weigh ~230 kg. Of the 329 kg body, ~70% ships as product, ~15% is kerf sludge, ~12% is ground and etched off the faces, and the rest is test slugs and breakage. Counting the crown, tail, and neck (typically another 15–25% of the pull), the total ingot-to-wafer mass yield is on the order of 55–60%.

### What the saw leaves behind

Three things must be fixed downstream: (1) the **subsurface damage layer**, 5–30 µm of cracks, dislocations, and amorphous silicon that would nucleate slip in the fab; (2) **thickness variation and warp** from wire bow (the wire deflects several mm under cutting force) and thermal expansion of the block during a multi-hour cut, giving as-cut total thickness variation (TTV) of 10–20 µm and warp of 20–40 µm; (3) **saw marks** from wire vibration and pilgrim-mode reversals, tens of nanometers to a micrometer high. The next three steps address them in order.

## Lapping and Double-Disk Grinding

### Lapping

Classic wafering used **double-side lapping**: wafers in geared plastic carriers sit between two cast-iron plates rotating in opposite directions (planetary motion) while an alumina (Al2O3, ~9–12 µm, "#1200") slurry is pumped between them. Both faces are abraded by loose grit against two parallel reference plates, removing 40–60 µm per side, bringing TTV below ~1 µm, and erasing warp. It leaves a new damage layer 10–15 µm deep and is slow, messy, and hard to automate, but remains standard on 150 mm and many 200 mm lines.

### Double-disk grinding

For 300 mm the industry moved to **double-disk grinding (DDG)**, also called simultaneous double-side grinding. The wafer is held vertically by hydrostatic water pads (no mechanical chuck touches the faces) and rotated slowly while two opposed cup-shaped diamond wheels, one on each face, grind it. The wheel axes are offset from the wafer center, so the wheel's working face sweeps through the wafer center as it rotates. Because the wafer is not clamped to a chuck, chuck-flatness errors do not print through, and because both sides are ground at once with a fixed-abrasive wheel, TTV of < 0.5 µm and near-zero induced warp are achievable. Vitrified-bond wheels of #2000 grit (~5 µm diamond) leave a damage layer of only ~2–5 µm. Koyo Machinery (JTEKT, whose DXSG series pioneered 300 mm DDG) and Disco supply the tools; removal is ~60–80 µm total at ~20–30 wafers per hour. Some lines add a fine single-side grind (#8000, ~1 µm resin-bond wheel) that takes front-face damage below 1 µm so the later etch can be shallower.

## Edge Profiling

The edge of an as-cut wafer is square and razor-sharp, which is fatal. A sharp edge chips; a chip is a crack starter; and in any high-temperature step (a 1,000 °C oxidation, an epi deposition) thermal stress concentrates at the crack and either generates slip dislocations that propagate inward or fractures the wafer outright, filling a $10–30 million tool with shards. Edge chips also shed particles onto neighboring wafers in a FOUP, and a square edge makes photoresist bead up during spin coating and copper crown during damascene plating.

So the edge is ground with a formed diamond wheel whose profile is the negative of the desired shape. SEMI M1 defines the envelope (nominally a 22.5° bevel with rounded transitions fitting a template); modern makers use a round or elliptical profile of ~0.2–0.3 mm radius. The notch is profiled at the same time with a small pin-shaped wheel. Tool suppliers include Disco, Daitron, and Speedfam.

Two subtler edge parameters have become critical for leading-edge lithography. **Edge roll-off (ERO)** is the tendency of polishing to thin the last 1–3 mm of the wafer because the pad wraps around the edge. It is measured as ZDD (second derivative of the height profile) or as ESFQR (edge-site flatness), and ERO of more than a few tens of nanometers throws the scanner out of focus on the outermost dies. Because the fab's yield near the edge is worth hundreds of dollars per wafer, edge exclusion has been pushed from 3 mm (early 300 mm) to 2 mm and now to 1.5 mm, which means the polished flat zone must extend to 298.5 mm of the 300 mm diameter. Second, the edge itself is polished to a mirror (**mirror edge polish**) with a soft pad and colloidal silica, to eliminate the microcracks left by the profile grind and the resulting particle shedding.

## Etching to Remove Damage

After grinding, the wafer carries ~2–15 µm of mechanical damage on each face and edge. Grinding it away with an even finer wheel would just leave finer damage; only chemistry removes damage without creating it. The wafer is therefore etched to remove 20–30 µm total, well past the deepest crack.

Two chemistries are used, and the choice is a trade-off between flatness and surface quality.

**Acid etching** uses HF/HNO3 mixtures, often with acetic or phosphoric acid as a diluent and wetting agent (a classic ratio is HF : HNO3 : CH3COOH = 1 : 3 : 1 to 1 : 5 : 2). The mechanism is a two-step redox: nitric acid oxidizes the silicon surface to SiO2 (with NO2 as the byproduct, hence the brown fumes over an acid-etch bath), and HF dissolves the oxide to hexafluorosilicic acid, H2SiF6, which is water-soluble. Overall: 3 Si + 4 HNO3 + 18 HF → 3 H2SiF6 + 4 NO + 8 H2O. The etch is isotropic and the surface is smooth and glossy. But the reaction is fast and exothermic, and it is diffusion-limited, so the etch rate depends on local flow and on the layer of depleted acid at the surface; wafers come out with degraded flatness (TTV can grow by several µm) and edge thinning. Acid etch also produces large volumes of NOx and spent fluoride waste.

**Alkaline etching** uses concentrated KOH or NaOH (45–55 wt%) at 80–90 °C. Hydroxide attacks silicon directly: Si + 2 OH^- + 2 H2O → SiO2(OH)2^2- + 2 H2. The reaction is reaction-rate-limited rather than diffusion-limited, so removal is uniform and flatness from grinding is preserved to within a fraction of a micrometer. It is also strongly anisotropic, etching (100) planes tens to a few hundred times faster than (111), so it leaves a faceted, matte surface of tiny (111)-bounded pyramids and pits with roughness of a few hundred nm. The surface must then be polished off, which is fine since polishing follows anyway. Potassium is a mobile ion that poisons gate oxides, so alkaline-etched wafers are followed by an acid clean, and many wafer makers run a two-stage sequence: an alkaline etch for most of the removal followed by a light acid etch for smoothness.

For 300 mm prime wafers, the alkaline-first approach is the norm because flatness is the dearer commodity. Some flows, with DDG damage of only 2–3 µm, have shrunk the etch to under 10 µm. After etching, the wafer is at ~790–800 µm and is, for the first time, free of mechanical damage.

## Laser Marking

Every 300 mm wafer carries a laser-scribed identity so that fabs can track lots and individual wafers through hundreds of steps and, when a yield problem appears, trace it back to a crystal position, an ingot, a block, and a polishing tool. SEMI standards govern the mark. **SEMI M12** (12 characters) and its sibling **M13** (18 characters) specify an alphanumeric code in an OCR-readable font (the "SEMI font"), written as a field of laser-drilled dots, placed within a few millimeters of the edge, 180° or adjacent to the notch, on the front surface. **SEMI T7** specifies a 2D data-matrix code written on the **back** surface of double-side-polished 300 mm wafers, which is what most leading-edge fabs actually read; the T7 mark is in a defined location and encodes the same wafer ID.

The marks are written with a Q-switched Nd:YAG or fiber laser (1,064 or 532 nm) as fields of dots ~50–100 µm across; a **soft mark** is ~1–2 µm deep, a **hard mark** several µm deep and survives the entire fab flow including CMP. Marking is done before polishing so that polishing smooths the recast rim of each pit; a mark written afterward would shed laser-ejected silicon droplets as particles.

## Double-Side Polishing (DSP)

### The mechanism of chemical-mechanical polishing

Polishing silicon to an atomically smooth surface is not fine grinding. It is a chemical-mechanical process in which an alkaline liquid hydrates and softens the top monolayers of silicon into a hydrated silica-like film, and nanometer-sized silica particles carried by a compliant polyurethane pad shear that film away, exposing fresh silicon to be hydrated again. The abrasive, colloidal amorphous SiO2 with a Mohs hardness of ~6, is softer than silicon (~7), so it cannot scratch the crystal; it only removes the chemically weakened surface. This is the reason polished silicon has no damage layer at all.

The slurry is **colloidal silica**, 30–80 nm spherical particles at 1–10 wt% in water, stabilized at pH 10–11.5 with KOH, NH4OH, or an amine (amines are preferred for the final polish because they leave no alkali metal); Fujimi (Glanzox) and Nitta DuPont are the dominant suppliers. The pad is polyurethane, either a napped poromeric (Suba-type, softer, for finishing) or a cast microporous sheet (IC1000-type, harder, for stock removal and flatness), from DuPont (ex-Rodel), Fujibo, and Nitta DuPont.

Removal rate follows **Preston's equation**: RR = k_p × P × v, where P is the pressure (~100–300 g/cm², i.e. 10–30 kPa), v is the relative pad-wafer velocity (~0.5–1.5 m/s), and k_p is a constant capturing chemistry and pad state. For silicon stock polishing the rate is ~0.5–1 µm/min; for final polishing ~0.05–0.2 µm/min.

### The DSP tool

In **double-side polishing**, wafers are loaded into thin (slightly thinner than the wafer) glass-epoxy or stainless carriers with gear teeth, several wafers per carrier and several carriers per load. The carriers sit between two large polishing platens, each faced with pad, and are driven planetary-style by a sun gear and ring gear, exactly the geometry of lapping. Slurry is fed through holes in the upper platen. Because the wafer floats between two pads with no chuck, there is no chuck-induced print-through, and because both sides are polished at once, the wafer comes out parallel: DSP achieves TTV < 0.3 µm and the global flatness that no single-side process can match. DSP removes ~15–25 µm total (both faces), erasing the alkaline-etch facets, and leaves both surfaces as mirrors. Both faces end up specular, which is why a modern 300 mm wafer has a mirror back side (200 mm wafers usually had an etched, matte back). Lapmaster Wolters (Peter Wolters AC2000 series, Germany), Fujikoshi, and SpeedFam supply DSP tools; a wafer fab runs dozens of them.

## Final Front-Side Mirror Polish

The DSP surface is a mirror, but it has a residual **haze**: a random roughness of ~0.2–0.5 nm RMS and a low density of micro-scratches from the harder stock-removal pad. The final polish, sometimes called "haze-free" or "touch" polishing, uses a soft napped pad, dilute fine colloidal silica (20–40 nm) with an amine base, low pressure, and removes only ~0.5–2 µm from the front side. It is a single-side process: the wafer is held on a template or a soft backing film by surface tension or vacuum (some lines use a ceramic chuck with wax mounting). Multi-head tools polish four or five wafers on a single large platen. The result is a surface with roughness below 0.1 nm RMS on a 1 µm × 1 µm atomic-force-microscope scan, which is to say the surface is flat to within a single atomic step (a silicon (100) monatomic step is 0.136 nm).

Why does the surface need to be that smooth? Three reasons. First, gate dielectrics on modern transistors are ~1–2 nm of interfacial oxide plus high-k; roughness comparable to the oxide thickness modulates the electric field, causes tunneling leakage, and scatters carriers, degrading mobility. Second, inspection: a laser-scattering particle counter looking for 26 nm defects sees haze as background noise; a hazy wafer cannot be inspected to spec. Third, bonding: SOI and hybrid-bonding processes require surfaces with < 0.2–0.5 nm RMS roughness to bond at all.

## Why 775 µm: Wafer Thickness and Mechanics

SEMI M1 specifies 775 ± 25 µm for 300 mm, 725 ± 20 µm for 200 mm, 675 µm for 150 mm, and 625 µm for 125 mm. The proposed 450 mm standard was 925 µm. Why does the thickness grow with diameter, and why not exactly proportionally?

A wafer must survive being lifted on three pins or a ring by a robot without cracking, and it must not sag so much on a lithography chuck or in a furnace boat that it distorts or touches its neighbor. The gravitational sag of a plate supported at its edge scales as D^4 / t^2 (it scales with load, proportional to t, and inversely with flexural rigidity, proportional to t^3). Keeping sag constant across diameters would require t proportional to D^2, i.e. a 300 mm wafer would need ~1.6 mm. The industry chose a compromise: t roughly proportional to D, accepting more sag at 300 mm, because thicker wafers cost more silicon, take longer to saw, and are harder to thin at the back end (every wafer is ground down to 50–100 µm before packaging anyway; see Module 16).

> **Worked example: gravitational sag of a 300 mm wafer.** Model the wafer as a thin circular plate of radius a = 150 mm, thickness t = 775 µm, simply supported at its rim under its own weight. Uniform load q = ρ g t = 2,330 kg/m³ × 9.81 m/s² × 775 × 10^-6 m ≈ 17.7 Pa. Flexural rigidity D = E t³ / [12 (1 − ν²)]; with E ≈ 150 GPa (a representative in-plane average for (100) silicon) and ν ≈ 0.28, D ≈ 150 × 10^9 × (775 × 10^-6)³ / 11.06 ≈ 6.3 N·m. The center deflection of a simply supported plate is w = [(5 + ν)/(1 + ν)] × q a^4 / (64 D) = 4.13 × 17.7 × (0.15)^4 / (64 × 6.3) ≈ 9 × 10^-5 m, i.e. ~90 µm. Repeating for a 200 mm, 725 µm wafer gives ~20 µm. So a 300 mm wafer sags roughly 4–5 times more than a 200 mm wafer despite being thicker, which is why 300 mm tools support wafers on a full-face vacuum chuck or a wide-ring edge grip, and why furnace boats hold 300 mm wafers on multiple support points close to the edge. It is also why flatness must be specified in a "free" or "chucked" state: 90 µm of sag dwarfs a 20 nm SFQR spec by more than three orders of magnitude, and metrology tools measure the wafer held vertically or on a flat chuck to remove gravity.

The ± 25 µm SEMI tolerance covers robot end-effectors and FOUP slot pitch; fabs actually specify ± 10–15 µm within a lot so CMP and lithography focus do not drift wafer to wafer.

> **Worked example: the removal stack-up from raw slice to 775 µm.** Start with a diamond-wire as-cut slice of 890 ± 15 µm (TTV ~15 µm). Double-disk grinding removes ~35 µm per face, 70 µm total, to ~820 µm (TTV now < 1 µm, damage ~3 µm per face). Alkaline etch removes ~12 µm per face, 25 µm total, to ~795 µm (damage 0, but faceted, and TTV degrades slightly to ~0.5–1 µm). Edge profiling and laser marking remove nothing from the faces. DSP removes ~9 µm per face, 18 µm total, to ~777 µm (TTV < 0.3 µm, both faces mirror). Final front-side CMP removes ~1.5 µm to ~775.5 µm. RCA cleaning removes < 1 nm. Total face removal: ~115 µm, or 13% of the raw slice, and 11% of the 1.05 mm of ingot consumed per wafer; add the 160 µm kerf and the finished wafer represents ~74% of the crystal length it came from. The intermediate thickness targets are set backward from 775 µm, and the as-cut target (890 µm here) is the one number a wafer maker adjusts to compensate for changes in any downstream removal.

## Cleaning: The RCA Sequence and Drying

Every mechanical and chemical step above leaves residues: slurry silica, polishing-pad debris, organic surfactants, wax, and metals from the slurry, the KOH, the stainless-steel tooling, and the etch baths. The final clean has to remove all of them without roughening the polished surface, and it has to leave the surface in a state that survives weeks of shipping and storage. The industry's answer, still, is a descendant of the sequence Werner Kern developed at RCA in 1965 and published in 1970, the **RCA clean**.

### SC-1: particles and organics

**Standard Clean 1 (SC-1, also APM, ammonia-peroxide mixture)** is NH4OH : H2O2 : H2O, originally 1 : 1 : 5 at 75–80 °C, now usually much more dilute (1 : 1 : 50 to 1 : 2 : 100) at 40–65 °C. Its mechanism is what makes it effective against particles. Hydrogen peroxide oxidizes the silicon surface, growing a ~0.6–1 nm chemical oxide; simultaneously the ammonium hydroxide etches that oxide slowly (silicon consumption ~0.1–0.5 nm/min in dilute SC-1). The surface is therefore continuously regrown and re-etched, and any particle sitting on it is undercut and released. Once released, it does not redeposit: at pH ~10 both the silica-covered wafer surface and most particles (silica, most organics, silicon) carry a negative zeta potential, so they repel electrostatically. Peroxide also oxidizes organic residues to CO2 and water. Too aggressive an SC-1 (high NH4OH, high temperature) etches the silicon non-uniformly and raises roughness from 0.1 to 0.3+ nm, so the modern trend is dilute, cool SC-1 with megasonic assist.

### SC-2: metals

SC-1's weakness is that at high pH, metals such as Fe, Al, Zn, and Ca precipitate as hydroxides onto the surface, and the peroxide can carry trace metals from its own manufacture. **Standard Clean 2 (SC-2, HPM, hydrochloric-peroxide mixture)** is HCl : H2O2 : H2O, 1 : 1 : 6 at 70–80 °C (or dilute, 1 : 1 : 50). The acid dissolves the metal hydroxides and holds metals in solution as soluble chlorides and chloro-complexes; the peroxide keeps the metals in their higher oxidation states so they do not plate out onto silicon by galvanic displacement (copper is the notorious case: Cu2+ in HF solutions plates onto bare silicon within seconds). SC-2 does not attack silicon and does not remove particles; it is purely a metal-removal step.

### HF dip

A dilute HF dip (DHF, 0.5–1% HF for ~30–60 s) removes the chemical oxide and with it any metals incorporated in the oxide. It leaves a **hydrogen-terminated** silicon surface, hydrophobic, that is remarkably stable in air for minutes to hours but attracts particles strongly (a hydrophobic surface in water has no repulsive hydration layer) and re-oxidizes unevenly. For shipped wafers, the last step is therefore usually a final dilute SC-1 or ozonated water (DIO3, 5–50 ppm O3 in ultrapure water, increasingly used as a substitute for peroxide because it is cleaner and cheaper) to regrow a uniform hydrophilic chemical oxide. That 0.6–1 nm oxide is what the fab receives, and the fab's own pre-gate clean will strip it.

### Megasonics

Cleaning tools drive the liquid with **megasonic** transducers at 0.8–1 MHz (versus 20–100 kHz for ultrasonics). At ~1 MHz the cavitation bubbles are only a few µm in size, so their collapse and the acoustic streaming they drive in the boundary layer dislodge particles down to ~30–50 nm without the damage that violent kilohertz cavitation causes; bare polished wafers can be cleaned aggressively, patterned wafers in the fab cannot.

### Drying and Marangoni

Drying is where a clean wafer is most easily ruined. If a droplet evaporates on silicon, dissolved silicic acid and contaminants stay behind as a **watermark**, a ring of silica a few nm thick that is a real defect. Spin drying leaves droplets at the edge and in the notch. The solution is the **Marangoni** (IPA-vapor) dryer: the wafer is drawn slowly (a few mm/s) out of a DI-water bath while nitrogen carrying isopropanol vapor is directed at the meniscus. IPA dissolving into the meniscus lowers its surface tension (pure IPA ~21 mN/m versus water ~72 mN/m), and the resulting surface-tension gradient, low at the wafer contact line and high in the bulk, pulls the liquid off the wafer and back into the bath. The wafer emerges with no liquid film, so nothing evaporates and nothing is left behind. Single-wafer tools use the equivalent "Rotagoni" process (a term coined at imec around 2000 and licensed to spin-processor makers: an IPA/N2 nozzle following the receding water film on a spinning wafer). SCREEN Semiconductor Solutions leads wet cleaning tools, with TEL, SEMES, Lam, and ACM Research also in the market.

## Flatness Metrology

Flatness is the wafer property the fab cares about most, because every lithography exposure focuses a 26 mm × 33 mm field (a full scanner field, stepped as slits) onto a surface, and the depth of focus of a 0.33 NA EUV scanner is on the order of 100–150 nm total, of which the wafer maker is allowed only a small slice (the rest is consumed by chuck flatness, process film topography, and the scanner's own focus error). SEMI M1 and the related MF standards (MF533, MF534, MF657, MF1390, MF1451) define a vocabulary:

- **TTV (total thickness variation)**: max minus min thickness over the whole wafer, excluding the edge exclusion. Prime 300 mm: < 1 µm; leading-edge specs often < 0.5 µm.
- **Bow**: deviation of the center of the median surface from the reference plane defined by three edge points, measured on a free (unclamped) wafer. Sign indicates concave or convex.
- **Warp**: max minus min deviation of the median surface from the reference plane on a free wafer. Prime 300 mm: < 30 µm, with leading-edge specs of < 10–15 µm. Bow and warp are properties of the wafer's shape independent of thickness, while TTV is independent of shape. A wafer can be perfectly parallel (TTV 0) and still warped like a potato chip.
- **GBIR (global back-surface-referenced ideal-plane range)**: global front-surface flatness with the back chucked flat; essentially equals TTV.
- **SFQR (site front-surface-referenced least-squares range)**: for each lithography site (standardized as 26 mm × 8 mm, a scanner slit, though fabs also request 26 × 33 mm full fields), fit a least-squares plane to the front surface with the back chucked flat and report the peak-to-valley range around it; the spec is the maximum over all sites or the percent of usable sites. Early 300 mm: < 130 nm. Leading-edge EUV nodes: ~20 nm, with edge sites (ESFQR) specified separately. SFQR models what a scanner's leveling cannot correct: it tilts and refocuses per site, so only the residual within a site matters.
- **Nanotopography (NT)**: front-surface height variation over lateral scales of 0.2–20 mm on a free wafer with long-wavelength shape filtered out, reported as peak-to-valley in 2 mm and 10 mm windows; specs ~< 8–16 nm in a 2 mm window. NT was defined in the late 1990s when shallow-trench-isolation CMP was found to thin oxide over millimeter-scale bumps too small for SFQR to catch; wire-saw marks and DSP carrier print-through are the sources.
- **Edge exclusion (EE)**: the annulus where nothing above is specified: 3 mm at 300 mm's introduction, 2 mm through the 2010s, 1.5 mm now for leading-edge, with 1 mm under discussion.

KLA's WaferSight series (from the 2006 acquisition of ADE) holds the wafer vertically between two Fizeau interferometers that measure both surfaces at once in seconds, yielding thickness, flatness, shape, and nanotopography; Corning Tropel's FlatMaster is the alternative. Every prime wafer is measured, and one that fails SFQR on a few sites is downgraded rather than scrapped.

## Particle and Defect Inspection

### Laser scattering

After cleaning, every prime wafer goes through an unpatterned-wafer inspection system, and the market here belongs to KLA's **Surfscan** family (SP5, SP7, and the SP7XP introduced in late 2020, which KLA rates at 12.5 nm sensitivity), with Hitachi High-Tech as a distant second. The wafer spins while a focused laser (DUV, ~266 nm, in the current generation; earlier tools used 488 or 355 nm) scans a spiral across it. Collectors at several angles capture light scattered from any discontinuity: a particle, a pit, a scratch, a crystal defect, or the residual roughness. Scattering from a particle much smaller than the wavelength scales as d^6 (Rayleigh), so a 26 nm particle scatters ~1/60 as much as a 52 nm one; separating that from the haze background is the entire engineering challenge, and it is why surface roughness below 0.1 nm RMS is a precondition for meeting the particle spec.

The tool reports **LPDs (light-point defects, or localized light scatterers)** binned by size, calibrated with polystyrene latex spheres of known diameter (hence sizes are "PSL-equivalent"). A leading-edge prime wafer spec might be < 10–20 LPDs at ≥ 26 nm (and even at ≥ 19 nm for some products), over the whole wafer inside a 1.5 mm edge exclusion; total haze is specified in ppm of scattered intensity. Wafers that fail are recleaned once; repeated failures are downgraded.

The Surfscan also reveals **COPs (crystal-originated particles)**, which are not particles at all but the octahedral voids (~100 nm) formed by vacancy agglomeration during crystal growth (Module 02). They intersect the polished surface as pits and scatter like particles. COPs in the gate region cause gate-oxide breakdown, so the fab wants none; this is the origin of epitaxial, annealed, and "perfect silicon" wafers described in the next section.

### Contamination and electrical metrology

- **Surface metals**: total-reflection X-ray fluorescence (TXRF) maps Fe, Ni, Cu, Zn, Ca to ~10^9–10^10 atoms/cm²; vapor-phase decomposition plus ICP-MS (VPD-ICP-MS) collects the whole surface into one droplet for sub-10^9 sensitivity. Specs are typically < 1 × 10^10 atoms/cm² per element.
- **Bulk metals**: µ-PCD or surface photovoltage (SPV) mapping infers iron from diffusion length before and after dissociating Fe-B pairs, down to ~10^10 atoms/cm³.
- **Resistivity and epi**: four-point probe per lot; epi resistivity by mercury-probe CV; epi thickness by FTIR reflectance interference off the p/p+ free-carrier interface, accurate to ~1%.
- **Oxygen precipitation**: sample wafers get a precipitation anneal, then are etched and bulk micro-defects (BMDs) counted to verify the wafer will getter as promised.

## Beyond Polished: Epitaxial, Annealed, and SOI Wafers

A polished CZ wafer is the baseline product, but the majority of 300 mm wafers going into advanced logic are epitaxial, DRAM makers use polished and annealed wafers, and a substantial specialty segment uses SOI. These are where the wafer makers' margins are.

### Epitaxial wafers

An **epitaxial (epi) wafer** has a single-crystal silicon layer grown by chemical vapor deposition on top of the polished substrate, continuing the substrate's crystal lattice but with its own, independently chosen doping. The classic structure is **p/p+**: a lightly doped p- layer (5–20 Ω·cm) on a heavily boron-doped p+ substrate (0.005–0.02 Ω·cm). The heavily doped substrate provides a low-resistance path that suppresses **latch-up** (parasitic thyristor turn-on in CMOS), and boron-rich silicon getters metals. Modern logic more often uses **p/p-** (lightly doped epi on a lightly doped substrate) since latch-up is handled by design and wells, and heavy boron substrates cause autodoping problems; here the epi's job is purely to provide a defect-free, precisely doped top layer.

The reactor is a single-wafer, lamp-heated, cold-wall system; Applied Materials' Centura Epi leads, with ASM's Epsilon as the alternative. The wafer sits on a SiC-coated graphite susceptor heated by halogen lamps to 1,050–1,150 °C inside a quartz chamber with laminar gas flow. The sequence: (1) a hydrogen bake at 1,100–1,150 °C for ~1–2 min removes the native oxide (SiO2 + H2 → SiO↑ + H2O) and leaves a clean, reconstructed surface; (2) an optional brief HCl etch removes a few nm of silicon; (3) growth from **trichlorosilane (TCS, SiHCl3)** in hydrogen at 1,100–1,150 °C, or **dichlorosilane (DCS, SiH2Cl2)** at 1,000–1,100 °C, or silane at 900–1,000 °C for low-temperature work. The TCS reaction, SiHCl3 + H2 ⇌ Si + 3 HCl, is reversible, so the process is a near-equilibrium balance between deposition and HCl back-etch; growth is 2–4 µm/min, so a 3 µm layer takes about a minute. Dopant is added as diborane (B2H6), phosphine (PH3), or arsine (AsH3) at ppm levels in the hydrogen stream. Logic epi is 2–5 µm; power-device epi (IGBTs, superjunction MOSFETs) is 50–120 µm grown over hours. Thickness uniformity of ± 1–2% and resistivity uniformity of ± 3–5% are standard.

Why epi eliminates COPs: the epitaxial layer is grown atom by atom from the gas phase at a temperature and rate that do not create vacancy supersaturation, so it contains no voids. Substrate COPs intersecting the surface are overgrown: lateral step-flow growth fills the ~100 nm pit within the first few hundred nanometers of growth and the crystal above is perfect. (Very large or clustered voids can nucleate an epi stacking fault, so wafer makers still grow substrates with low COP density.) The hydrogen bake also partially fills pits by surface diffusion. The result is a top layer with essentially zero grown-in defects and a gate-oxide-integrity yield of ~100%, which is why leading-edge logic uses epi wafers almost universally and why SEMI reported that advanced epi for logic was the main growth driver in 2025.

Cost: an epi step adds one reactor pass (~5–10 min per wafer on a $5–8 million tool, plus TCS and hydrogen), so an epi wafer sells for ~$200 or more versus ~$100–150 for a polished 300 mm prime wafer, with thick power-epi wafers and specialty structures costing considerably more.

### Annealed and "perfect silicon" wafers

There are two cheaper routes to a COP-free surface. **Argon- or hydrogen-annealed wafers** are polished wafers annealed at ~1,200 °C for ~1 hour: the thin oxide lining each COP dissolves, silicon self-diffusion collapses the voids in the top ~5–10 µm, and oxygen out-diffuses from the surface to create a **denuded zone** free of precipitates over a bulk that still precipitates and getters. This is the traditional DRAM choice. **Perfect silicon** (SUMCO's term; the generic term is defect-free CZ) is a crystal pulled with the v/G ratio (Module 02) held at the vacancy/interstitial boundary along the whole ingot, so neither voids nor interstitial loops form anywhere; it needs a slow pull and an engineered hot zone, costing more than standard CZ but less than epi, and is used heavily in DRAM.

### SOI wafers and Smart Cut

A **silicon-on-insulator (SOI)** wafer has a thin single-crystal silicon device layer sitting on a buried oxide (BOX) on a handle substrate. Transistors built in the thin layer have no junction-to-substrate capacitance and, in fully depleted form, near-ideal electrostatic control. The dominant manufacturing process is **Smart Cut**, invented by Michel Bruel at CEA-Leti (patent filed 1991) and commercialized by Soitec (Bernin, France), which licenses it to Shin-Etsu Handotai and others and holds the majority of the SOI wafer market.

The Smart Cut sequence:

1. **Oxidize the donor wafer.** A thermal oxide of the target BOX thickness is grown on a polished CZ or epi donor: ~20–25 nm for FD-SOI, 145 nm for partially depleted SOI, 200 nm to 1 µm for RF and photonics SOI.
2. **Implant hydrogen.** H+ ions at a dose of ~5 × 10^16 cm^-2 (sometimes co-implanted with He) at an energy chosen so the projected range sits at the intended split depth below the oxide, e.g. tens of keV for a few hundred nm. The implant creates a buried layer of hydrogen-decorated vacancies and platelets (nanometer-scale, plate-shaped cavities on {100} planes).
3. **Clean and bond.** Both the donor and a polished handle wafer are RCA-cleaned, sometimes plasma-activated (N2 or O2 plasma to increase hydroxyl density), and brought into contact at room temperature. Hydrophilic surfaces bond spontaneously by hydrogen bonding between surface silanol groups; a wave of contact propagates from one point across the wafer pair in seconds. This requires < 0.5 nm RMS roughness and essentially zero particles (a 1 µm particle produces a ~1 cm unbonded void).
4. **Split.** The pair is annealed at 400–600 °C. The hydrogen platelets grow, coalesce, pressurize, and the donor fractures along the implant plane, exactly like the cleave in a mica sheet, transferring the oxide plus a thin silicon film onto the handle. The film thickness as-split is typically 200–400 nm with ± few nm uniformity (set by the implant, which is extremely uniform).
5. **Strengthen and finish.** A high-temperature anneal (~1,100 °C) converts the hydrogen bonds into covalent Si-O-Si bonds across the interface. The split surface has ~5 nm roughness and a damaged layer, removed by a combination of touch CMP, thermal smoothing in H2/Ar, and thermal oxidation-and-strip thinning to reach the final thickness: ~12 nm ± 0.5 nm device silicon on 20–25 nm BOX for FD-SOI, or 50–200 nm for PD-SOI/RF.
6. **Reuse the donor.** The donor wafer, minus ~0.5 µm, is repolished and reused, typically ~10 times, which is what makes Smart Cut economical.

Products: **FD-SOI** for GlobalFoundries' 22FDX and STMicroelectronics/Samsung 28FD-SOI (low-power IoT, automotive radar, mmWave), where back-biasing through the ultrathin BOX tunes threshold voltage; **RF-SOI** (high-resistivity handle plus a trap-rich polysilicon layer under the BOX) for the antenna switches in essentially every smartphone, Soitec's largest business by volume; and **Photonics-SOI** (220 nm Si on 2 µm BOX), the platform for the optical transceivers in AI clusters. 300 mm SOI wafers sell for several hundred dollars, over $1,000 for specialty stacks.

## Test, Monitor, and Reclaim Wafers

A fab consumes far more silicon than it ships as product. Every tool is qualified and monitored with wafers that never carry a circuit: **particle monitors** (does the tool add fewer than N particles?), **film-thickness monitors** for deposition and etch rates, **dummy wafers** filling empty slots in a 100–150 wafer furnace boat so every product wafer sees the same environment, and **send-ahead wafers** for recipe checks. A large fab uses 10–25% as many test wafers as product wafers, hundreds of thousands per month for a GIGAFAB-class site, bought as **test grade** (wafers that missed prime spec on a non-critical parameter, ~40–60% of prime price) or reclaimed.

**Reclaim** strips a used test wafer's films (HF/HNO3 or plasma), repolishes it (removing ~10–20 µm), cleans, inspects, and sells it back at a third to a half of a new test wafer's price. A wafer can be reclaimed several times until it falls below a minimum thickness of ~725–750 µm. RS Technologies (Japan) leads with ~30%+ share; Pure Wafer (US), Hamada Heavy Industries, Kinik and Phoenix Silicon International (Taiwan) share the rest of a ~$700 million per year market that tracks fab utilization.

## Packaging and Shipping

Finished wafers are loaded 25 to a **FOSB (front-opening shipping box)**, a polycarbonate container that resembles a FOUP but is built for shipping rather than tool docking, with cushions that clamp each wafer's edge against vibration; Entegris, Shin-Etsu Polymer, and Miraial make them. The FOSB is sealed in a Class 1 cleanroom, purged with nitrogen, double-bagged in moisture-barrier bags, and air-freighted with shock indicators. At the fab a wafer sorter (Brooks, Rorze) reads each T7 mark and transfers the wafers into the fab's own FOUPs; the FOSBs go back for reuse. Shelf life is 6–12 months, after which adsorbed organics require a reclean.

## A Representative 300 mm Prime Wafer Specification

The table below is a composite of the sort of spec a leading-edge logic customer might issue for a polished p/p- epi wafer; real specs are confidential and considerably longer.

| Parameter | Typical spec (leading-edge 300 mm) |
|---|---|
| Diameter | 300.0 ± 0.1 mm |
| Thickness (center) | 775 ± 15 µm (SEMI: ± 25) |
| Orientation | (100) ± 0.5°, notch on <110> ± 1° |
| Substrate type/dopant | p-type, boron |
| Substrate resistivity | 1–20 Ω·cm (p-) or 0.005–0.02 Ω·cm (p+) |
| Epi layer | 3.0 ± 0.1 µm, p-, 5–20 Ω·cm |
| Interstitial oxygen | 12 ± 2 ppma (old ASTM) |
| Carbon | < 0.2 ppma |
| TTV | < 0.5 µm |
| Warp | < 15 µm |
| SFQR (26 × 8 mm, EE 1.5 mm) | ≤ 20 nm, 100% of sites |
| Nanotopography (2 mm window) | < 10 nm |
| Edge exclusion | 1.5 mm |
| Front surface roughness | < 0.1 nm RMS (1 × 1 µm AFM) |
| LPDs | < 10 at ≥ 26 nm PSL-equivalent |
| Surface metals (Fe, Ni, Cu, Zn, Ca) | < 1 × 10^10 atoms/cm² |
| COPs (epi surface) | none |
| Edge profile | SEMI M1 rounded, mirror-polished |
| Back surface | Polished (DSP), T7 matrix mark |
| Packaging | 25 per FOSB, N2, double-bagged |

## Economics and Market Structure

### Prices and volumes

SEMI's Silicon Manufacturers Group reports the industry's volumes in millions of square inches (MSI). Shipments peaked at ~14,700 MSI in 2022, fell 14% in 2023 and another ~3% in 2024 as fabs and their customers burned inventory, and recovered 5.8% to 12,973 MSI in 2025; industry revenue was ~$11.4 billion in 2025, roughly flat to slightly down because the mix shifted toward 300 mm while 200 mm and smaller prices softened. A 300 mm wafer is 109.6 square inches, and 300 mm wafers account for roughly three-quarters of area shipped, so the world consumes on the order of 7–8 million 300 mm wafers per month, i.e. 20+ million per quarter and ~90 million per year (estimates that count only prime polished and epi wafers, excluding test and reclaim, run somewhat lower, ~15+ million per quarter). By area the growth is in advanced epi for AI logic and polished/annealed wafers for HBM DRAM; 200 mm and smaller volumes are flat to declining.

Prices are set mostly under multi-year **long-term agreements (LTAs)** negotiated in the 2021–2022 shortage, which locked in volumes and prices through 2025–2026 and are the reason wafer revenue held up while volumes fell. A standard 300 mm polished prime wafer sells for roughly $100–150; epi wafers ~$200 and up; leading-edge grades (the tightest SFQR, nanotopography, and LPD specs) carry a premium of ~20% over standard prime; SOI several hundred dollars; 200 mm polished ~$40–60. For a fab, silicon is ~1–2% of the cost of a leading-edge processed wafer (reported at roughly $18,000–30,000 at N3/N2), so wafer makers have little pricing leverage in good times and none in bad.

### The 2023–2025 inventory correction

The 2021–2022 shortage led fabs to build several months of wafer inventory, and when the consumer and mature-node slump arrived in 2023 they deferred LTA deliveries, so wafer shipments fell far more than chip output. SUMCO fell into the red in fiscal 2025 and announced (February 2025) that 200 mm wafer production at its Miyazaki plant would end by the close of 2026, Siltronic slowed the ramp of its new Singapore fab, and GlobalWafers opened its Sherman, Texas fab in May 2025 without committing to a phase-2 timeline. By early 2026, leading-edge logic and HBM demand had pushed SEMI-reported shipments up 13% year-on-year in Q1 2026 (3,275 MSI), while the mature-node 300 mm and 200 mm overhang was expected to persist into 2027.

### Market shares

The 300 mm market is an oligopoly of five firms, together ~85% of capacity, plus a growing Chinese tier. Approximate revenue shares (as of ~2024–2025):

- **Shin-Etsu Handotai (SEH)**, Japan, ~30%: the leader in leading-edge 300 mm prime and epi, and a Smart Cut SOI licensee.
- **SUMCO**, Japan, ~23–25%: number two, originator of "perfect silicon", with Formosa SUMCO in Taiwan.
- **GlobalWafers**, Taiwan, ~15–17%: a roll-up of SunEdison Semiconductor (ex-MEMC) and Topsil; opened a ~$3.5 billion first-phase Sherman, Texas fab in 2025 with CHIPS Act support.
- **Siltronic**, Germany, ~12%: ex-Wacker Siltronic; new Singapore 300 mm fab.
- **SK Siltron**, Korea, ~10–12%: ex-LG Siltron; Samsung's and SK hynix's domestic supplier.
- **Others** (~10%): Soitec (SOI); Okmetic (Finland, MEMS); Wafer Works (Taiwan, 200 mm); and Chinese entrants NSIG/Zing Semiconductor, Ferrotec, TCL Zhonghuan, ESWIN, and GRITEK, which by 2025 had over 1 million wafers per month of 300 mm nameplate capacity, mostly at mature-node quality for domestic fabs. They face fewer barriers than Chinese chipmakers because export controls do not restrict grinders, polishers, or epi reactors the way they restrict lithography and etch.

## Key Numbers

| Quantity | Value |
|---|---|
| 300 mm ingot body length / mass | ~2 m / ~330 kg (body only) |
| Diameter tolerance (SEMI M1) | 300.0 ± 0.2 mm (makers hold ± 0.1) |
| Notch | 1.0 mm deep, 90° V, on <110> ± 1° |
| Diamond wire core diameter | 100–140 µm, with 8–25 µm diamond grit |
| Wire speed / tension | 10–25 m/s / 20–40 N |
| Kerf loss per slice | ~150–170 µm (DWS), 200+ µm (slurry) |
| As-cut slice thickness | ~890–950 µm |
| Wafers per 2 m ingot | ~1,800 (at 1.06 mm pitch) |
| Saw damage depth | 5–15 µm (DWS), 15–30 µm (slurry) |
| DDG removal / damage | 60–80 µm total / 2–5 µm |
| Etch removal | 20–30 µm total (KOH 45–55%, 80–90 °C) |
| DSP removal / final CMP removal | 15–25 µm / 0.5–2 µm |
| Final thickness | 775 ± 25 µm (300 mm); 725 ± 20 (200 mm) |
| Gravitational sag, edge-supported 300 mm wafer | ~90 µm |
| Front-surface roughness | < 0.1 nm RMS |
| SFQR (26 × 8 mm) leading edge | ~20 nm; edge exclusion 1.5 mm |
| Nanotopography, 2 mm window | < 10 nm |
| LPD spec | < ~10 at ≥ 26 nm (Surfscan SP7) |
| Surface metals | < 1 × 10^10 atoms/cm² |
| SC-1 / SC-2 ratios | NH4OH:H2O2:H2O ~1:1:50; HCl:H2O2:H2O ~1:1:6 |
| Megasonic frequency | 0.8–1 MHz |
| Epi growth (TCS) | 1,050–1,150 °C, 2–4 µm/min, 2–5 µm for logic |
| Smart Cut H+ dose | ~5 × 10^16 cm^-2; split at 400–600 °C |
| FD-SOI top Si / BOX | ~12 nm / 20–25 nm |
| 300 mm polished / epi price | ~$100–150 / ~$200+ |
| Global wafer shipments 2025 | 12,973 MSI, ~$11.4 B revenue |
| 300 mm demand | ~7–8 M wafers/month (~20 M+/quarter) |
| Top-5 share of 300 mm capacity | ~85% |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| Shin-Etsu Handotai (SEH) | Japan | 300 mm prime, epi, annealed, SOI (Smart Cut licensee) | Leader (~30%) |
| SUMCO | Japan | 300 mm prime, epi, "perfect silicon"; Formosa SUMCO (Taiwan) | #2 (~24%) |
| GlobalWafers | Taiwan | 300/200 mm prime and epi; ex-MEMC/SunEdison; Texas fab | #3 (~16%) |
| Siltronic | Germany | 300 mm prime and epi; Singapore FabNext | #4 (~12%) |
| SK Siltron | South Korea | 300 mm prime/epi for Samsung, SK hynix; SiC | #5 (~11%) |
| Soitec | France | SOI wafers via Smart Cut (RF-SOI, FD-SOI, Photonics-SOI) | SOI leader (majority share) |
| NSIG / Zing, Ferrotec, TCL Zhonghuan, ESWIN | China | 300 mm polished/epi for Chinese fabs | Emerging, mostly mature nodes |
| Okmetic | Finland | 150/200 mm specialty and MEMS wafers | Niche |
| RS Technologies | Japan | Wafer reclaim | Reclaim leader (~30%+) |
| Pure Wafer, Hamada, Kinik, Phoenix Silicon | US/Japan/Taiwan | Wafer reclaim | Reclaim #2 tier |
| Komatsu NTC | Japan | Multi-wire saws for 300 mm | Wire saw leader |
| Asahi Diamond, Nakamura Choko, A.L.M.T. | Japan | Diamond-coated saw wire | Leading wire suppliers |
| Koyo Machinery (JTEKT), Disco | Japan | Double-disk grinders, edge grinders | DDG leaders |
| Lapmaster Wolters, Fujikoshi, SpeedFam | Germany/Japan | Double-side polishers | DSP leaders |
| Fujimi, Nitta DuPont | Japan | Colloidal silica slurry; pads (with DuPont) | Slurry leader / #2 |
| Applied Materials (Centura Epi) | USA | Single-wafer epi reactors | Epi tool leader |
| SCREEN, TEL, SEMES, Lam | Japan/Korea/USA | Wet cleaning and Marangoni/IPA drying | SCREEN leads |
| KLA (Surfscan SP7, WaferSight) | USA | Unpatterned defect inspection, flatness metrology | Dominant |
| Corning Tropel | USA | Flatness interferometers | #2 flatness |
| Entegris, Shin-Etsu Polymer, Miraial | USA/Japan | FOSBs and FOUPs | Leaders |

## Common Misconceptions

- **"Sawing cuts the wafer to its final thickness."** → The as-cut slice is ~890–950 µm; roughly 115 µm is ground, etched, and polished away to reach 775 µm, and the kerf takes another ~160 µm of the ingot per wafer.
- **"Polishing is just very fine grinding."** → CMP removes silicon chemically (alkaline hydration of the surface) and the silica abrasive is softer than silicon; that is why a polished wafer has no damage layer, which no mechanical process can achieve.
- **"A polished wafer is flat."** → It is flat only when chucked. A free 300 mm wafer sags ~90 µm under its own weight and may have 10–30 µm of warp; the 20 nm SFQR spec refers to the residual within a lithography site after the back is pulled flat and the scanner levels each site.
- **"The notch is a smaller version of the flat, chosen to save space."** → Saving area is one reason, but the notch was also adopted because a flat breaks the axisymmetry that spin coating, spin cleaning, and wafer mechanics depend on at 300 mm.
- **"SC-1 dissolves particles."** → It undercuts them by growing and etching a chemical oxide beneath them and keeps them from redepositing through electrostatic repulsion at high pH; SC-2 is needed separately because SC-1 actually deposits certain metals.
- **"Epi is only for suppressing latch-up."** → For leading-edge logic the main reason is defect-free silicon: the CVD-grown layer contains no COPs, so gate-oxide integrity approaches 100%. Annealed and "perfect silicon" wafers are the lower-cost alternatives used in DRAM.

## Where This Fits in the Supply Chain

Module 02 delivered a dislocation-free single-crystal ingot of known dopant type, resistivity, and oxygen content, grown by Shin-Etsu, SUMCO, GlobalWafers, Siltronic, or SK Siltron from Module 01's polysilicon. This module turned that ingot into the wafer maker's actual product: about 1,800 polished, cleaned, inspected, individually serialized 775 µm discs per ingot, or their epitaxial, annealed, or SOI derivatives, packed 25 to a FOSB and air-freighted to TSMC, Samsung, Intel, SK hynix, Micron, and the rest. Along the way it consumed diamond wire, colloidal silica, polyurethane pads, KOH, HF, HCl, NH4OH, H2O2, TCS, hydrogen, and ultrapure water, most of which are the subject of Module 04 on fab consumables and non-silicon substrates (SiC, GaN, and the compound wafers made with related but different techniques). Module 05 then follows the FOSB through the fab's loading dock into a FOUP and onto the process line, where the fab's own cleaning, oxidation, and deposition steps (Module 06) begin by stripping the very chemical oxide this module's final SC-1 left behind.

## Further Reading

- SEMI M1, "Specification for Polished Single Crystal Silicon Wafers," and SEMI M12/M13 and T7 marking standards (SEMI Standards, current revisions). The definitive source for dimensions, notch, edge profile, and flatness definitions.
- Werner Kern, "The Evolution of Silicon Wafer Cleaning Technology," Journal of the Electrochemical Society 137(6), 1990; and Kern and Puotinen, "Cleaning Solutions Based on Hydrogen Peroxide for Use in Silicon Semiconductor Technology," RCA Review 31, 1970. The original RCA clean papers.
- Karen A. Reinhardt and Werner Kern (eds.), Handbook of Silicon Wafer Cleaning Technology, 3rd ed., Elsevier, 2018.
- Z. J. Pei, Graham R. Fisher, and J. Liu, "Grinding of Silicon Wafers: A Review from Historical Perspectives," International Journal of Machine Tools and Manufacture 48, 2008. Covers double-disk grinding and the ductile-regime mechanics.
- Hans Joachim Möller, "Basic Mechanisms and Models of Multi-Wire Sawing," Advanced Engineering Materials 6(7), 2004; and Möller, "Wafering of Silicon Crystals," physica status solidi (a) 203(4), 2006.
- Michel Bruel, "Silicon on Insulator Material Technology," Electronics Letters 31(14), 1995, and Soitec's Smart Cut technology pages (soitec.com).
- SUMCO, "Manufacturing Process of Silicon Wafers" and technical pages on Perfect Silicon and epi wafers (sumcosi.com); Shin-Etsu Handotai product technology pages (sehsi.co.jp).
- SEMI Silicon Manufacturers Group quarterly and annual silicon wafer shipment press releases (semi.org), for volumes and revenue.
- KLA product pages for Surfscan SP7 and WaferSight flatness systems (kla.com).
- Asianometry, "The Amazing, Humble Silicon Wafer" (YouTube, 2022) and "The 300mm Silicon Wafer Transition" (YouTube), good visual overviews of the wafering sequence and the diameter transition.
- Stanley Wolf and Richard Tauber, Silicon Processing for the VLSI Era, Vol. 1: Process Technology, 2nd ed., Lattice Press, 2000, chapters on silicon substrates, epitaxy, and wafer cleaning.
