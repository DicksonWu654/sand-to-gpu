# Module 07: Photolithography I: Photoresist and DUV

Every layer of a chip begins as a pattern that has to be transferred onto the wafer, and lithography is the only step that *creates* geometry rather than modifying a film that is already there. The problem it solves is brutal in its specifics: print features of 40 nm half-pitch (and, with tricks, effective pitches of 20 nm and below) across a 300 mm wafer, place them within ~1.5–2 nm of the layer underneath, do it at ~275–300 wafers per hour, and do it 60–80+ times per wafer. It is hard because the light used to do it, 193 nm, is four to ten times *longer* than the features it prints, so the image at the wafer is a blurred interference pattern rather than a shadow, and the photoresist has to turn that blurred pattern into a sharp chemical edge.

This module covers everything up to (but not including) EUV: the litho cell and its full sequence of operations, the chemistry of photoresists, the optics of the 193 nm immersion scanner, the resolution-enhancement techniques that pushed 193 nm about a decade past where physics said it should die, and the multi-patterning schemes that motivated the switch to EUV covered in Module 08. Note that a mask set for a leading node is still ~75–85% DUV/i-line/KrF layers; EUV took only the hardest 15–25.

## The Litho Cell: Track Plus Scanner

A **litho cell** (or litho cluster) is a photoresist **track** bolted directly to a **scanner** through a sealed interface so that a wafer travels coat → expose → develop without ever leaving a controlled environment. The track is a coater/developer: a tall linked cabinet full of spin cups, hot plates, chill plates, and wafer-handling robots. The scanner is the exposure tool. They are separate purchases from separate companies: the track market is led by Tokyo Electron (TEL, CLEAN TRACK LITHIUS Pro Z series, roughly 85–90% of the leading-edge coater/developer market) with SCREEN (SOKUDO DUO series) as the main alternative; the scanner is almost always ASML (TWINSCAN NXT series) at the leading edge, with Nikon (NSR-S635E and, since 2024, NSR-S636E) a distant second in ArF immersion and Canon strong in i-line/KrF.

The track has to match the scanner's throughput. A modern ArF immersion scanner runs ~275–300 wafers per hour (wph), so the track is built with multiple parallel coat cups, many stacked hot plates (a single wafer occupies a bake plate for 60–90 s, and with a 12 s takt time you need 6–8 plates per bake step), and develop cups. The track's robots are scheduled so that every wafer sees identical delays between steps: the time between spin coat and soft bake, or between exposure and post-exposure bake, changes the final critical dimension (CD) by measurable amounts for chemically amplified resists, so the schedule is deterministic to the second.

The full sequence for one layer, from bare film to inspected pattern, is roughly:

1. Surface prep / adhesion promotion (HMDS vapor prime), or deposition of an anti-reflective / hard-mask underlayer stack
2. Spin coat resist, edge bead removal
3. Soft bake (post-apply bake, PAB)
4. Chill
5. (Immersion) topcoat, if used; most modern resists are topcoat-free
6. Transfer to scanner: alignment, leveling, exposure
7. Return to track: post-exposure bake (PEB)
8. Chill
9. Develop (puddle), rinse, spin dry
10. Hard bake (optional; often replaced by UV cure or skipped for tri-layer stacks)
11. After-develop inspection (ADI): CD-SEM, overlay, defect inspection
12. Disposition: pass to etch, or strip and rework

Steps 1–5 and 7–10 happen on the track; step 6 on the scanner; step 11 on separate metrology tools (Module 13). Total time in the cell is ~30–60 minutes per wafer, most of it waiting in queues; the exposure itself takes ~12–15 s.

### HMDS Prime

Silicon oxide surfaces are terminated with hydroxyl (–OH) groups that make them hydrophilic and bond water, and resist polymers do not adhere well to a wet, polar surface; the result is pattern lift-off during development, particularly of narrow lines. The fix is **hexamethyldisilazane (HMDS)**, (CH3)3Si–NH–Si(CH3)3, delivered as a vapor onto a wafer held at ~120–150 °C. It reacts with surface silanols: 2 Si–OH + HMDS → 2 Si–O–Si(CH3)3 + NH3. The surface is now capped with trimethylsilyl groups, hydrophobic, with a water contact angle of ~60–70° instead of near zero. Vapor prime in a closed chamber (sometimes with a dehydration bake at 150–200 °C first) is used rather than liquid because it gives a monolayer and consumes microliters. When the resist goes onto an organic underlayer (BARC or spin-on carbon) rather than oxide, HMDS is skipped; the organic surface adheres fine.

### BARC, Standing Waves, and the Tri-Layer Stack

Resist is transparent at the exposure wavelength (it has to be, so that light reaches the bottom of the film), which means light passes through it, reflects off the substrate, and interferes with the incoming wave. The result is a **standing wave**: a sinusoidal modulation of absorbed dose through the thickness of the resist, with period λ/(2n), where n is the resist refractive index (~1.7 at 193 nm), so ~57 nm. The developed sidewall shows this as a corrugation, and worse, the *total* dose absorbed swings up and down as resist thickness changes (the **swing curve**), so a few nanometers of thickness variation across the wafer becomes several nanometers of CD variation. On top of reflective layers like polysilicon, aluminum, or tungsten, reflectivity can be 30–60%, and CD control is impossible without help.

A **bottom anti-reflective coating (BARC)** is a spin-on polymer, 30–90 nm thick, with a tuned refractive index and absorbance (n ~1.7–1.9, k ~0.3–0.5 at 193 nm) that cancels the reflected wave both by absorption and by destructive interference between the resist/BARC and BARC/substrate reflections. A well-designed single BARC brings substrate reflectivity below 1%; dual-layer BARCs handle topography. The BARC must later be opened by a short plasma etch before the underlying film is etched, which is why it is also called an "etch-transfer" layer. PEB also smooths standing waves: acid diffusion of ~10 nm during PEB averages out a 57 nm-period modulation almost completely, which is one reason CARs give smoother sidewalls than DNQ resists at the same wavelength.

At advanced nodes the resist is only ~80–120 nm thick (thin, because the depth of focus is tiny and because tall narrow lines collapse from capillary forces during rinse) and cannot survive a deep etch. The answer is the **tri-layer stack**: a thick **spin-on carbon (SOC)** layer (100–300 nm, an amorphous-carbon-like polymer that planarizes topography and is the actual hard mask), a thin **silicon-containing anti-reflective coating (SiARC)** (20–40 nm, a spin-on siloxane with ~30–45% Si), and the thin resist. Etch sequence: the resist pattern is transferred into the SiARC with a fluorocarbon plasma (resist and SiARC etch at similar rates, but SiARC is thin), then into the SOC with an O2/N2 or H2/N2 plasma (which etches carbon fast and SiARC very slowly, giving selectivity > 10:1), and then the tall SOC pattern serves as the mask for the real film. The SiARC also serves as the BARC. All three are spin-coated on the track in sequence, each with its own bake (SOC bake ~ 250–350 °C to cross-link). Suppliers include JSR, Brewer Science, Nissan Chemical, Merck (formerly AZ/EMD), and Shin-Etsu.

### Spin Coating

Resist is dispensed as a solution, typically 2–10% solids in a casting solvent such as PGMEA (propylene glycol monomethyl ether acetate) or ethyl lactate, onto a wafer held by a vacuum chuck. The wafer is accelerated to 1,500–4,000 rpm (typical acceleration ~10,000 rpm/s) and spun for 20–60 s. The physics has two overlapping phases: first, centrifugal force flings the bulk of the fluid off the wafer within about a second and the film thins by viscous radial flow; second, as the film thins to a few micrometers, solvent evaporation raises the viscosity sharply and freezes the film. The classic result (Meyerhofer, 1978) is that final thickness t scales as

t ∝ C · η^a / ω^b, with a ≈ 0.4–0.6 and b ≈ 0.5,

where C is the solids concentration, η the viscosity, and ω the spin speed. The thickness therefore goes as roughly 1/√(rpm): doubling spin speed reduces thickness by ~30%. A resist vendor supplies a "spin curve" for each product; the fab picks a speed near the middle of the curve where the slope is shallow, so that a 1% rpm error gives < 0.5% thickness error. Modern tracks hold thickness uniformity to ~ 1 nm 3σ across a 300 mm wafer for a 100 nm film.

Two practical details matter. First, **dynamic dispense** (dispensing while the wafer rotates slowly at ~500 rpm) and closed **solvent-saturated cups** with exhaust control prevent the film from skinning over before it is uniform, and the more expensive resists are dispensed at ~0.5–1.5 mL per wafer with reduced-volume nozzles because ArF immersion resist costs on the order of $1,000–3,000 per liter and EUV resist several times more. Second, surface tension makes the fluid pile up at the wafer edge into an **edge bead** up to several micrometers tall. If left, it flakes during handling and contaminates chucks, so an **edge bead removal (EBR)** nozzle directs solvent at the outer 1–2 mm while the wafer spins, dissolving the bead. On top of the wafer the edge exclusion is ~1.5–2 mm (defining the usable radius for dies); the backside gets a rinse too, because any resist on the back becomes a particle that lifts the wafer on the scanner chuck and destroys focus.

### Soft Bake

After coating the film still contains 10–30% residual solvent. The **soft bake** (post-apply bake, PAB), 90–110 °C for 60–90 s on a proximity hot plate (wafer floats ~0.1 mm above the plate on pins, to avoid particles and allow uniform heating), drives the residual solvent to ~ 2–5%, densifies the film, and removes stress. Residual solvent affects everything downstream: it plasticizes the film and increases acid diffusion during PEB, and it changes the dissolution rate. Bake plates are held to ± 0.1–0.2 °C across the plate, because for CARs, CD sensitivity to PEB temperature can be 1–3 nm/°C (early KrF resists were closer to 8 nm/°C). A chill plate at 23 °C follows every bake to stop the process reproducibly.

### Exposure

The wafer goes through the interface to the scanner, is aligned and leveled, and is exposed field by field (scanner anatomy is a section of its own, below). The dose delivered is measured in mJ/cm², typically 20–40 mJ/cm² for ArF CARs, 20–50 mJ/cm² for KrF CARs, and 100–300 mJ/cm² for i-line DNQ resists, which are ~5–10× slower (hence the invention of chemical amplification).

### Post-Exposure Bake

For DNQ resists PEB is optional (it smooths standing waves). For chemically amplified resists it *is* the chemistry: exposure only generates a small amount of acid, and the PEB (90–130 °C, 60–90 s) is where that acid diffuses and catalyzes the deprotection reactions that change the resist's solubility. PEB temperature, time, and especially the delay between exposure and PEB (the **post-exposure delay**, PED) are controlled to the second, because during the delay the photogenerated acid can be neutralized by airborne amines (ppb levels of ammonia from cleaning chemicals or humans cause a "T-top" on positive-tone lines) and can diffuse before the bake. Tracks and scanners run chemically filtered air for this reason.

### Development

Positive-tone development uses an aqueous base, almost universally **0.26 N tetramethylammonium hydroxide (TMAH)**, i.e. 2.38 wt% in water, sometimes with a surfactant. The 0.26 N standard dates to the 1980s and is an industry-wide convention so resists and tracks are interchangeable. Development is done as a **puddle**: the wafer is held stationary or spun very slowly, developer is dispensed through a slot nozzle to form a puddle over the entire wafer, allowed to sit for 30–60 s (sometimes a double puddle with fresh developer), then the wafer is rinsed with deionized water and spun dry. Puddle development is preferred over immersion because the developer is used once (no loading effects) and because a stationary puddle gives the most uniform, diffusion-limited dissolution. Dissolution rates of exposed resist are ~100–1,000 nm/s; unexposed resist dissolves at < 1 nm/s. The ratio (contrast) determines how faithfully the latent chemical image becomes a physical edge.

**Negative-tone development (NTD)** uses an organic solvent developer (n-butyl acetate is the standard, from Fujifilm's and JSR's early work ~2010) on a standard positive-tone CAR. In the solvent, the *unexposed* (still-protected, nonpolar) regions dissolve and the exposed (deprotected, polar) regions stay. This flips the tone of the same resist. Why bother? For dark features such as contact holes and trenches, the aerial image from a bright-field mask printed with strong off-axis illumination has better contrast when the *holes* are the bright regions, and NTD lets you use that image while still getting a hole in resist. NTD became the standard for ArF immersion contact and via layers, and for the "block" and "cut" masks in multi-patterning; it also reduces resist pattern collapse because the remaining resist is the solvent-swollen, cross-linked-like deprotected material. The rinse after NTD is typically another solvent (e.g. 4-methyl-2-pentanol), not water.

Rinse dynamics matter because of **pattern collapse**: as rinse water evaporates from between two 40 nm lines of aspect ratio 2–3, the capillary (Laplace) pressure ~ 2γ cos θ / spacing, with γ = 72 mN/m for water, reaches ~ 3–4 MPa across a 40 nm gap, enough to bend the lines together. Surfactant rinses lower γ; in production the usual answer is keeping the aspect ratio below ~ 2.5.

### Hard Bake, Inspection, and Rework

A **hard bake** at 110–130 °C after development (or a UV-cure) cross-links the resist to improve etch resistance and removes remaining developer. For tri-layer stacks it is often skipped. The wafer then goes to CD-SEM (a few dozen sites), overlay metrology (dozens to hundreds of targets), and optical inspection. Because nothing irreversible has happened yet, resist patterns that fail (out-of-spec CD, overlay, or defects) can be **reworked**: strip the resist and BARC in a plasma ash or wet solvent, and run the wafer through the litho cell again. Litho is the only front-end step where failure is cheap, which is why so much of the fab's metrology budget sits after develop rather than after etch.

## Photoresist Chemistry

A photoresist must do three unrelated things well: be transparent enough that light reaches the bottom of the film, but absorb enough to react; change its solubility by orders of magnitude on exposure; and survive a plasma etch afterward. Two chemical families have done this work for forty years.

### DNQ/Novolac: The g-line and i-line Workhorse

The resist used from the 1970s through the 350 nm node (and still used for the majority of non-critical layers, in power/analog fabs, and in packaging) is a two-component system: a **novolac** resin (a phenol-formaldehyde polymer, soluble in aqueous base because of its phenolic –OH groups) plus 10–25 wt% of a **diazonaphthoquinone (DNQ)** photoactive compound. The DNQ is a **dissolution inhibitor**: it hydrogen-bonds with the novolac and makes the mixture nearly insoluble in developer (dissolution rate ~ 1–2 nm/s versus 100+ nm/s for pure novolac). On absorbing a photon at 365 nm (i-line) or 436 nm (g-line) it undergoes a Wolff rearrangement, releasing N2 and forming a ketene, which reacts with trace water in the film to form an **indene carboxylic acid**. That carboxylic acid is not just non-inhibiting; it is a *dissolution promoter*, so exposed regions dissolve 100–1,000× faster than unexposed ones. The photon-to-solubility change is one-to-one: one photon converts one DNQ molecule. Quantum efficiency is ~0.2–0.3. This is why DNQ resists need 100–300 mJ/cm² and why, with the 10× drop in available lamp/laser intensity at 248 nm, they were too slow for DUV. (Novolac is also nearly opaque at 248 nm, another reason.)

DNQ/novolac has virtues that keep it in production: it is cheap, insensitive to airborne amines, tolerant of long delays, and in thick (1–5 µm) films it has excellent etch resistance because of its aromatic content. For a 6 µm-thick implant mask or a redistribution layer in packaging, nobody uses anything else.

### Chemically Amplified Resists (CARs)

The concept, invented at IBM by Ito, Willson, and Fréchet in the early 1980s, is that one photon should trigger many chemical events. The resist has three components: a polymer backbone whose base-solubility is blocked by an acid-labile **protecting group**; a **photoacid generator (PAG)**, a salt (typically a triphenylsulfonium or diaryliodonium cation paired with a fluorinated sulfonate anion such as nonaflate or perfluorobutanesulfonate; ionic PAGs are used at ~ 2–10 wt%) that releases a strong acid H+ when it absorbs a photon; and a **quencher**, a small amount (~ 0.1–1 wt%) of a base such as a hindered amine.

The mechanism, step by step:

1. **Exposure**: a photon is absorbed by the PAG (or by the polymer, which transfers energy), which decomposes and releases a proton plus its counter-anion. At 30 mJ/cm² and a typical absorbance, this creates on the order of 10^19–10^20 acid molecules per cm³, roughly one per (3–5 nm)³. At this point almost nothing has changed in solubility; this is the **latent image**.
2. **PEB**: at 100–120 °C the polymer is above or near its glass transition and the acid becomes mobile. Each proton catalyzes the **deprotection** of a protecting group: for the KrF-era resists the group is **tert-butoxycarbonyl (t-BOC)** on poly(hydroxystyrene), which cleaves to release CO2 and isobutylene, exposing a phenol; for ArF resists (where poly(hydroxystyrene) is opaque and one must use aliphatic methacrylate backbones) it is a tertiary-ester group such as methyladamantyl or ethylcyclopentyl methacrylate, which cleaves to a carboxylic acid plus an alkene. Critically, the proton is regenerated at the end of each reaction, so one acid molecule deprotects hundreds to a few thousand sites before it is lost. This is the **amplification**: the chemical gain is ~10^2–10^3.
3. **Quenching**: the quencher base neutralizes acid. Its purpose is to set a *threshold*: in weakly exposed regions (the tails of the aerial image) the small amount of acid is fully consumed by the base and no deprotection happens, while in strongly exposed regions the acid overwhelms the base. This sharpens the chemical image beyond the optical image and is the main knob for controlling the resist contrast and the acid diffusion blur. Modern resists tie the quencher to a photodecomposable base (PDB) so the quencher itself is destroyed in exposed regions and remains in dark regions, further sharpening the edge.
4. **Develop**: deprotected polymer (now with phenol or carboxylic acid groups) dissolves in 0.26 N TMAH at hundreds of nm/s; protected polymer does not.

The photospeed and the resolution now trade against each other through **acid diffusion**. During PEB the acid random-walks a distance L = √(2Dt), typically 5–20 nm in modern ArF resists (older KrF resists, 20–50 nm). Longer diffusion means more amplification (each acid visits more sites) and smoother lines (the blur averages out photon shot noise and the standing wave), but it blurs the edge. To print 40 nm half-pitch with a 20 nm blur is impossible, so ArF immersion resists are engineered with bulky counter-anions and polymer-bound PAGs to keep L below ~ 10 nm, and this costs sensitivity. Note that diffusion is not free even in principle: the acid counter-anion's size, PEB temperature, and residual solvent all shift it, which is why the track controls these so tightly.

### Line-Edge Roughness and the RLS Triangle

Because the chemistry is stochastic (discrete photons, discrete PAG molecules, discrete polymer chains of ~ 5–10 nm radius of gyration), the developed edge is not straight. **Line-edge roughness (LER)** is the 3σ deviation of one edge from a straight line; **line-width roughness (LWR)** is the 3σ variation of the width, and LWR ≈ √2 × LER if the two edges are uncorrelated. For ArF immersion lines LER is ~ 3–5 nm 3σ, a substantial fraction of a 40 nm line, and it is worse at low dose (fewer photons → more shot noise) and at short diffusion length (less averaging). The result is the **resolution / LER / sensitivity (RLS) triangle**: you can get any two of high resolution, low roughness, and high sensitivity (low dose), but not all three. The empirical scaling is roughly LER² × dose × resolution³ ≈ constant for a given chemistry, and this trade-off is what limits EUV throughput as much as source power does (Module 08). LER matters because at the transistor it becomes gate-length variation, hence threshold-voltage variation, and at metal lines it becomes resistance variation and an electromigration hot-spot generator.

**Contrast** is quantified from the **characteristic curve** (normalized remaining thickness versus log dose): the slope γ is ~ 2–4 for DNQ resists and > 10 for good CARs. **Dose-to-clear** (E0) is where a large open area fully develops; **dose-to-size** (Esize) is the dose at which a line prints at the intended CD, typically ~1.5–2× E0 for positive tone.

### Immersion-Specific Resist Issues

With water in contact with the resist for ~ 1 second per field, two things can go wrong: PAG and quencher can **leach** into the water (contaminating the lens and changing the resist), and water can leave **watermarks** and bubbles that print as defects. First-generation immersion used a fluorinated **topcoat** (an extra spin-coated layer); modern resists are **topcoat-free** with fluorinated surfactant additives that segregate to the surface during soft bake, giving a hydrophobic surface with a receding contact angle > 70° so the water meniscus under the lens does not leave droplets even at 500–800 mm/s scan speeds. Leaching is now specified below ~ 10^-12 mol/cm².

## The Optics: Resolution, Depth of Focus, and the Wavelength March

A projection scanner images a reticle onto the wafer with a lens whose light-collecting ability is described by the **numerical aperture** NA = n · sin θ, where θ is the half-angle of the cone of light reaching the wafer and n is the refractive index of the medium in front of the lens (1.0 for air, 1.44 for water at 193 nm). The **Rayleigh criterion** for the smallest resolvable half-pitch is

**CD = k1 · λ / NA**

and the corresponding **depth of focus** (the range over which the image stays acceptably sharp) is

**DOF = k2 · λ / NA²**

k1 and k2 are dimensionless process factors: k1 captures how cleverly you use the light (illumination, mask, resist contrast), k2 how much image degradation you can tolerate (typically ~ 0.5–1). The physics of k1 is simple: a grating of pitch p diffracts light into orders at angles sin θm = m λ/p. To form an image you need at least two orders to interfere. With on-axis illumination the 0th order goes straight through and the ±1st orders need λ/p < NA to enter the lens, so the smallest pitch is λ/NA and the smallest half-pitch is 0.5 λ/NA: **k1 = 0.5** for conventional illumination. Tilt the illumination so the 0th order enters the lens at one edge and only the +1st order needs to fit on the other side: now λ/p < 2 NA, so the pitch can be λ/(2NA) and half-pitch 0.25 λ/NA: **k1 = 0.25 is the hard physical floor** for single-exposure two-beam imaging. The industry went from k1 ~ 0.8 (1980s, when resolution was limited by the resist and the lens was overqualified) to ~ 0.5 by the late 1990s to ~ 0.28–0.30 in production 193 nm immersion today, which is about as close to 0.25 as line-edge roughness and process window allow.

The three levers are therefore λ, NA, and k1, and the history of lithography is the history of pushing all three:

| Era | Source | λ (nm) | NA (max, production) | Half-pitch reach (single exposure) |
|---|---|---|---|---|
| 1980s | Hg g-line | 436 | 0.3–0.45 | ~ 1 µm to 0.5 µm |
| late 1980s–1990s | Hg i-line | 365 | 0.5–0.65 | 0.5–0.35 µm |
| 1995–2005 | KrF excimer | 248 | 0.6–0.8 (later 0.93) | 250–130 nm |
| 2001– | ArF excimer (dry) | 193 | 0.75–0.93 | 90–65 nm |
| 2007– | ArF immersion | 193 (134 effective in water) | 1.35 | ~ 40 nm (80 nm pitch), 76 nm pitch stretch |
| (cancelled ~ 2003) | F2 excimer | 157 | (0.85 planned) | never shipped |
| 2019– | EUV (Module 08) | 13.5 | 0.33 (0.55 High-NA) | 13 nm (8 nm) |

> **Worked example: Rayleigh resolution for 193 nm immersion.**
> ASML NXT:2100i, λ = 193.4 nm, NA = 1.35 (water, n = 1.437). At an aggressive production k1 of 0.28:
> CD = 0.28 × 193.4 / 1.35 = **40.1 nm half-pitch**, i.e. an 80 nm pitch.
> At the theoretical floor k1 = 0.25: CD = 0.25 × 193.4 / 1.35 = 35.8 nm, a 71.6 nm pitch. In practice the tightest single-exposure 193i pitches in production are ~ 76–80 nm (at the 7 nm-class nodes the first metal levels printed in a single 193i pass sit at ~ 76–80 nm pitch precisely because of this limit, while the 36–40 nm-pitch M0/M1 levels below them needed SADP/SAQP; below ~ 76 nm, multi-patterning is mandatory).
> Depth of focus: DOF = k2 · λ / NA² = 0.6 × 193.4 / 1.35² = 0.6 × 106.1 nm = **~ 64 nm** total (± 32 nm). That is the entire focus budget for topography, wafer flatness, chuck contamination, leveling error, and lens field curvature combined. It is why resist films are ~ 100 nm, why underlayers planarize, and why the scanner measures the wafer surface height at every field to nanometer precision.
> For comparison, an i-line tool at NA 0.6 and k1 = 0.6 gives CD = 365 nm, with DOF ~ 0.6 × 365/0.36 = 600 nm. The DOF shrank tenfold; the tolerable wafer non-flatness with it.

### Why 157 nm Died and Immersion Won

The obvious next wavelength after 193 nm was the F2 excimer at 157 nm, and the industry spent ~ 1998–2003 on it. It failed on materials. Fused silica is opaque at 157 nm, so every lens element would have had to be calcium fluoride (CaF2), which turned out to have intrinsic birefringence that scrambled polarization at the high NAs needed, and which could not be grown in large, defect-free boules fast enough. No adequate pellicle material (the transparent membrane protecting the mask from particles) existed: polymers darkened, and thin fluoride "hard pellicles" introduced aberrations. Resist polymers had to be fluorinated to be transparent and had poor etch resistance. Meanwhile, in 2002–2004, Burn Lin at TSMC and others made the case that putting water between the lens and the wafer at 193 nm would deliver the same gain with existing lenses, masks, and resists. Water at 193 nm has n = 1.437 and an absorbance of only ~ 0.01–0.05 per cm (an absorption length of tens of centimetres), so a ~ 1 mm-thick film absorbs well under 1%. Since NA = n sin θ, and sin θ is bounded by ~ 0.93–0.94 in practical designs, the achievable NA jumps from 0.93 to ~ 1.35, an effective wavelength of 193/1.44 = 134 nm. The F2 programs were cancelled in 2003, and ASML shipped the first production immersion tool (TWINSCAN XT:1250i) in 2004, reaching NA 1.35 with the XT:1900i in 2007. Proposals to go further with high-index fluids (n ~ 1.65) and high-index lens glass (LuAG) toward NA 1.55–1.7 were abandoned by ~ 2008 in favor of double patterning and, eventually, EUV.

Immersion brought its own engineering: the lens and wafer are separated by a ~ 3 mm gap filled by a water meniscus confined by an **immersion hood** that injects degassed, millikelvin-controlled ultrapure water (dn/dT of water is −10^-4/K) and recovers it with a vacuum ring while the wafer scans at up to ~ 800 mm/s underneath. Bubbles, thermal gradients, and resist leaching were the early yield killers, largely solved by 2008–2010.

## Anatomy of a 193 nm Immersion Scanner

The current DUV flagships are the ASML TWINSCAN NXT:2050i, NXT:2100i (≥ 295 wph, matched-machine overlay spec ≤ 1.3 nm) and, as of ~ 2025, the NXT:2150i (≥ 310 wph, MMO ≤ 1.0 nm, with a new diamond wafer table), plus Nikon's NSR-S636E (2024; ≥ 280 wph, MMO ≤ 2.1 nm). Prices for the top ASML immersion tools are on the order of $60–80M; a KrF NXT:1470 or an i-line XT:400 is a small fraction of that. The machine occupies ~ 30 m² of cleanroom plus a sub-fab laser room, arrives as dozens of crates, and is assembled and qualified on site over several weeks. It is easiest to understand by following the light.

### The Light Source: ArF Excimer Laser

The **excimer laser** (Cymer, an ASML subsidiary since 2013, XLR series; Gigaphoton, a Komatsu subsidiary, GT series) sits in the sub-fab beneath the scanner. A gas mixture of argon, fluorine (~ 0.1%), and neon buffer at ~ 3–4 bar is excited by a pulsed high-voltage discharge; the transient ArF* excimer molecule exists only in its excited state, so its decay to the (dissociative) ground state at 193.4 nm has automatic population inversion. Each pulse is ~ 10–15 mJ and ~ 100 ns long; at 6 kHz repetition rate the output is ~ 60–90 W. The pulse-to-pulse energy varies ~ 5%, so a field exposure uses ~ 30–100 pulses and the scanner controls dose by counting and trimming pulses. The natural linewidth of the ArF transition is ~ 500 pm, which would be hopeless for a refractive lens (fused silica's dispersion would give a ~ 1 µm chromatic focus shift per pm), so the laser is built as a **master oscillator / power amplifier (MOPA)**: a low-power oscillator with a prism-and-grating line-narrowing module reduces the bandwidth to ~ 0.3 pm (E95, the width containing 95% of the energy; FWHM ~ 0.1–0.15 pm), and a second discharge chamber amplifies the narrowed seed. Bandwidth is now actively controlled per layer because it changes the contrast of small features. The center wavelength is actively tuned (stability ~ 0.05 pm) to compensate for lens heating and barometric pressure. The gas is periodically refilled because fluorine reacts with chamber materials; the neon buffer (~ 96% of the fill) is why the 2014 and 2022 Ukraine crises briefly threatened lithography supply (Module 04). The beam travels through a purged beam-delivery pipe up into the scanner body.

### The Illuminator and Off-Axis Illumination

The illuminator turns the laser's rectangular, partially coherent beam into a uniform, precisely shaped angular distribution at the reticle. Its key element in modern ASML tools is **FlexRay**, a programmable array of several thousand micromirrors that can steer the beam into any pupil shape (before ~ 2010, diffractive optical elements were swapped in for each shape). The "shape" refers to the angular spectrum of light hitting the mask, drawn as a pupil map with radius σ = 1 being light at the edge of the lens NA. Conventional illumination fills a disk of σ ~ 0.3–0.8. **Off-axis illumination (OAI)** puts the light only at the edges of the pupil:

- **Dipole**: two poles on the x (or y) axis. For a grating of lines perpendicular to the dipole axis, the 0th order from one pole and the 1st order from the other end up symmetrically placed in the lens, giving two-beam interference with the best possible contrast and maximum DOF, down to k1 = 0.25. It only works for one orientation of lines, which is why 1D "gridded" layouts became the rule at 20 nm and below.
- **Quadrupole / Quasar**: four poles at 45° (quasar) or on-axis (quadrupole), a compromise for layouts with both horizontal and vertical lines.
- **Freeform / source-mask optimization (SMO)**: since the source shape and the mask pattern jointly determine the image, both are co-optimized numerically for a given layer's critical patterns; the result is an irregular pupil shape that FlexRay simply reproduces. SMO is standard for every critical 193i layer.

The illuminator also sets the **polarization**: at NA 1.35 the interfering beams meet at angles near 90° in the resist, and for TM polarization (electric field in the plane of incidence) the vectors are nearly perpendicular and produce no interference fringes. The illuminator therefore polarizes each pole tangentially (TE), which is necessary, not optional, for high-NA immersion contrast.

### The Reticle and Reticle Stage

The **reticle** (photomask) is a 152 × 152 × 6.35 mm fused-silica plate with a patterned absorber (Module 04 covers making it). All modern scanners use **4× reduction**: features on the mask are four times larger than on the wafer, which relaxes mask-making tolerances by 4× (an error of 4 nm on the mask is 1 nm on the wafer, and in practice the **mask error enhancement factor (MEEF)** at low k1 is 2–4, so it is not quite that benign). The **pellicle**, a ~ 0.8 µm nitrocellulose or fluoropolymer membrane on a 5–6 mm frame, keeps particles far out of focus. A 26 × 33 mm field on the wafer corresponds to a 104 × 132 mm area on the reticle.

The exposure is a **scan**: the illuminator produces a slit, ~ 26 mm wide (the full field width) and ~ 6–8 mm tall, and the reticle and wafer are scanned through it in opposite directions (the lens inverts the image) with the reticle stage moving at 4× the wafer speed, so a 33 mm field with a 8 mm slit is exposed by a ~ 41 mm wafer-stage travel at ~ 800 mm/s and a reticle-stage travel of ~ 3.2 m/s with accelerations of several g. The reason for scanning rather than stepping the whole field is that a lens only needs to be diffraction-limited over the slit, not the full 26 × 33 mm field, and scanning averages lens aberrations and illumination non-uniformity along the scan direction. Synchronization between the two stages must be held to ~ 1 nm moving-average error while both are accelerating, which is why the stages are the most expensive mechatronics in the machine.

### The Projection Lens

The Zeiss (Carl Zeiss SMT, Oberkochen) projection lens for NA 1.35 is a **catadioptric** design (Starlith 1900i and successors) about 1 m tall and ~ 1 tonne, containing ~ 30–40 fused-silica elements (the largest ~ 300 mm in diameter) plus a few CaF2 elements for chromatic correction and two or more mirrors, the mirrors being what allows NA above ~ 1 without an impossibly large refractive lens; the path is folded so reticle and wafer remain parallel. Surfaces are polished to < 0.5 nm rms figure error and the assembled lens has wavefront aberrations of ~ 1–2 mλ rms (< 0.5 nm). Because the lens heats during exposure (fused silica absorbs slightly and its index changes with temperature), it contains dozens of actuated elements (lens manipulators that move, tilt, or deform elements) plus infrared heating of specific elements to counteract exposure-induced aberrations in real time; the NXT:2100i added a further distortion manipulator specifically to match DUV field distortion to the EUV scanners it must overlay with. Lens lifetime is limited by **compaction** and **rarefaction** of fused silica under 193 nm irradiation, ~ 10 years of use.

### Wafer Stages: Dual, Measure-While-Expose

ASML's defining architecture since 2001 is **TWINSCAN**: two identical wafer stages on a common granite base. While one wafer is exposed under the lens, the second wafer is on the other stage under a separate metrology column, where the machine measures its alignment marks (~ 30–100 marks per wafer at 12 colors of light in the NXT:2100i; alignment uses diffraction gratings in the scribe lanes, read by an interferometric "SMASH" or "ORION" sensor with ~ 0.5 nm repeatability) and maps its surface height with a level sensor (an optical triangulation sensor that measures the wafer surface at hundreds of thousands of points, producing a height map used to drive the stage's z and tilt during exposure). When both finish, the stages swap places (the "stage swap" takes ~ 1 s), and the metrology results are used for the exposure without any time penalty. This is how the scanner gets ~ 300 wph despite spending ~ 10 s per wafer on metrology.

Since the NXT generation (~ 2010), the stages are **magnetically levitated planar motors**: the stage is a floating coil-carrying plate over a permanent magnet array, driven in six degrees of freedom with no bearings, no cables dragging on it in the short-stroke, and nothing touching. Position is measured by an **encoder grid plate**: a large grating mounted under the lens, read by four encoder heads on the stage with sub-nanometer resolution, replacing the laser interferometers of earlier generations, which were sensitive to air turbulence and temperature along the beam path (a 1 mK change in air temperature along a 300 mm interferometer beam is ~ 0.3 nm of error). The whole system sits on an active vibration isolation system, and the exposure column is inside a temperature-controlled enclosure at ± 1–5 mK.

### Overlay, Focus, and CD Uniformity

**Overlay** is the positional error between the pattern being printed and a previous layer, measured on dedicated targets (box-in-box or diffraction-based gratings, Module 13). The scanner corrects overlay per wafer from its alignment measurements (translation, rotation, magnification, and higher-order terms per field, up to ~ 3rd-order intrafield with lens manipulators), and per lot from feedback of measured overlay ("APC", advanced process control). Specifications: NXT:2100i matched-machine overlay ~ 1.3 nm (the error between two different tools exposing successive layers), dedicated-chuck overlay ~ 1 nm. On-product overlay including process effects (wafer distortion from film stress, etch, CMP) at 7 nm-class nodes is ~ 2–3 nm 3σ; for EUV-generation nodes the requirement is ~ 1.5–2 nm and this is roughly the state of the art with DUV-EUV cross-matching. Overlay budget is typically ~ 20–25% of the minimum pitch, so a 40 nm-pitch multi-patterned layer needs < 8–10 nm total edge placement error, of which overlay is one contributor.

**Focus**: with a ~ 60 nm DOF, the scanner must hold each point of the wafer within ~ ± 20–30 nm of best focus. The level sensor maps the wafer, but the map is corrupted by the wafer's own topography (metal-dense regions, edge roll-off in the outer 3 mm) and by chuck flatness; particles under the wafer produce "focus spots" that are the classic source of a single-die defect on an otherwise good wafer. Focus is verified on product by scatterometry or diffraction-based focus targets and fed back.

**CD uniformity (CDU)** across the wafer, field, and slit is the sum of dose uniformity (< 0.3% within slit), focus, lens aberrations, mask CD error × MEEF, PEB temperature uniformity, and develop uniformity. Total CDU at ~ 40 nm half-pitch is ~ 1–1.5 nm 3σ, with the scanner's contribution ~ 0.5 nm. **Dose mapping** (adjusting dose per field and even within the slit from a CD-map feedback) and per-field focus corrections are used to compensate systematic track and etch signatures.

## Process Windows: Bossung Plots and the Focus-Exposure Matrix

Every litho layer is qualified with a **focus-exposure matrix (FEM)**: a wafer exposed with dose stepped along one axis and focus stepped along the other (e.g. 11 focus steps of 20 nm × 9 dose steps of 3%), then measured by CD-SEM. Plotting CD versus focus with one curve per dose gives a **Bossung plot**: at the right dose the curve is a flat parabola (CD insensitive to focus), while at too high or too low a dose the curves bend and the feature's sidewall degrades. The **process window** is the rectangle (or ellipse) in the focus-dose plane inside which CD stays within ± 10% of target *and* sidewall angle and resist loss stay within spec. Its width is the usable DOF and its height the **exposure latitude (EL)**, typically quoted as "8% EL at 80 nm DOF." Every source of dose error (laser, illuminator, resist thickness, PEB) and focus error (leveling, wafer flatness, topography) eats into this rectangle, and the layer is manufacturable only if what remains is non-negative. Multiple feature types (dense lines, isolated lines, line-ends, contacts) each have their own window, and the **overlapping process window** across them all is what OPC and SMO are optimized to maximize.

**Iso-dense bias** is the classic complication: a dense grating sends most of its energy into the ±1 orders while an isolated line spreads its energy over all angles, so at the same dose they print at different sizes with different best focus; OPC corrects the mask so both land on target, and the process window is the intersection.

## Resolution Enhancement Techniques

By ~ 2000 the industry accepted that it would print features smaller than the wavelength, and that the mask could no longer be a faithful copy of the design. Three families of tricks emerged, all still in use at every node including EUV.

### Optical Proximity Correction (OPC)

Because the image is a low-pass-filtered version of the mask, corners round, line-ends pull back (~ 20–40 nm at 193i), and a line's printed width depends on what is next to it. **OPC** pre-distorts the mask so that the *printed* pattern matches the design: line-ends are extended and given **hammerheads**; corners get **serifs**; line widths are biased segment by segment depending on the neighborhood; and **sub-resolution assist features (SRAFs)**, lines ~ 20–30 nm wide (at wafer scale) that are too small to print themselves, are placed next to isolated features so that they diffract like dense ones and share the dense-line process window. Early OPC was rule-based (a lookup table of biases versus spacing); since ~ 130 nm it is **model-based**: a calibrated optical model (Hopkins imaging with the actual source shape, lens, and polarization) plus a resist model (acid diffusion, develop) is used to simulate the image of every edge, and an iterative loop moves mask edge segments ("fragments" every ~ 20–50 nm) until the simulated edge lands on the design edge. A full-chip OPC run for a critical 193i layer takes thousands of CPU-hours (Synopsys Proteus, Siemens Calibre, and now GPU-accelerated flows from NVIDIA cuLitho with TSMC and Synopsys). The result is a mask that looks nothing like the layout, with a data volume of hundreds of gigabytes.

**Inverse lithography (ILT)** goes further: instead of nudging the design's edges, it solves for the mask pattern that produces the best image, with no prior assumption of Manhattan geometry; the results are **curvilinear masks**, with SRAFs that are arcs and dots. ILT gives ~ 10–20% more process window on contact and cut layers but was historically limited by mask-writing time (variable-shaped-beam mask writers fragment curves into tiny rectangles). Multi-beam mask writers (IMS Technology, since ~ 2016) write curvilinear shapes at constant time, and curvilinear ILT went into production for critical 193i and EUV layers around 2020–2023 (D2S, Synopsys, Siemens; multi-beam writers from IMS and NuFlare).

### Phase-Shift Masks (PSM)

A binary mask modulates only amplitude. If adjacent openings transmit light with a 180° phase difference, the fields cancel between them and the intensity minimum is forced to zero, sharpening the image and roughly doubling the resolution of dense lines. Two flavors:

- **Alternating PSM (alt-PSM)**: alternating clear openings have the quartz etched to a depth d = λ/(2(n−1)) = 193/(2 × 0.56) ≈ 172 nm, giving π phase shift. It can reach k1 ~ 0.25 for gates but creates unwanted dark lines wherever a phase boundary occurs without an absorber, so every design needs a second "trim" exposure and the design must be phase-assignable (no odd cycles). It was used for gate layers at 90–45 nm and is now rare.
- **Attenuated PSM (att-PSM, "embedded" PSM)**: the "opaque" absorber is replaced by a thin molybdenum silicide (MoSi) film that transmits ~ 6% of the light with a 180° phase shift. The weak transmitted light through the "dark" region is out of phase with the light through the openings, so it subtracts from the image tails and steepens the edges. **6% MoSi att-PSM is the standard mask type for essentially all critical 193 nm layers**; high-transmission (20–30%) variants are used for contact holes. The MoSi is ~ 70 nm thick, chosen for both transmission and phase.

### Off-Axis Illumination, Diffraction Orders, and the 1D Layout

Combining a 6% att-PSM, dipole illumination with polarization, SMO, and a high-contrast NTD or PTD resist is how 193i reaches k1 ~ 0.28. But notice what dipole illumination assumes: all the critical features are lines in one direction at (close to) one pitch. Two-dimensional patterns (a line that turns a corner, a random-logic layout with jogs) have diffraction orders spread over the pupil, and no single illumination shape captures them well. So the industry moved to **1D gridded layouts** for the tightest layers: lines and spaces on a fixed pitch printed with dipole in one exposure, and the desired 2D pattern created by *cutting* those lines with a second exposure (the **cut mask** or **block mask**) whose features are holes or short bars, which can be printed with their own optimized illumination. The design rules that result (**restricted design rules, RDR**) constrain every wire to the grid and every gate to a fixed pitch; standard-cell libraries at 20 nm and below are designed this way, and it is part of why "design flexibility" shrank even as transistor counts grew.

## Multi-Patterning

Below an 80 nm pitch, 193i needs more than one patterning pass per layer. The three schemes in production use are LELE, SADP, and SAQP, with cut/block masks layered on top.

### LELE (Litho-Etch-Litho-Etch)

Split the layout into two masks (**coloring**: adjacent features go on different masks), pattern the first into a hard mask, then coat, expose, and etch the second. Each mask sees a relaxed pitch (2× the final), so an 80 nm-pitch capability produces a 40 nm-pitch composite. The catch is that the spacing between a feature from mask A and one from mask B depends on the *overlay* between the two exposures, so the CD of those spaces has an extra ~ 3–5 nm of variation from overlay alone; and the two exposures have different CD signatures, so the layer has two populations of lines. LELE handles arbitrary 2D patterns, and LELELE (triple) was used for the 10 nm-class M1 at Intel and TSMC N10's metals; it is still the workhorse for contact, via, and cut layers where the pattern is 2D and self-alignment cannot help.
### SADP (Self-Aligned Double Patterning, "sidewall image transfer")

Instead of a second exposure, the second set of features is created by *deposition*:

1. Print **mandrels** (lines at the relaxed pitch P, e.g. 80 nm pitch printed as 40 nm lines, then narrowed by a plasma **etch trim** to ~ P/4 = 20 nm width, since litho cannot print 20 nm lines directly) in a sacrificial material such as amorphous carbon or amorphous silicon on top of the hard mask.
2. Deposit a **conformal spacer** by ALD (SiO2 or SiN, Module 06), with thickness equal to the desired final line width, e.g. 20 nm, coating the mandrel top and both sidewalls.
3. **Anisotropic etch-back** of the spacer: removes it from horizontal surfaces (mandrel tops and the floor), leaving a spacer on each mandrel sidewall.
4. **Mandrel pull**: selectively remove the mandrel (e.g. O2 ash for carbon, or a wet etch for a-Si), leaving free-standing spacers.
5. Use the spacers as the hard mask to etch the target film.

Each mandrel yields two spacers, so the pitch is halved: an 80 nm mandrel pitch gives a 40 nm final pitch with 20 nm lines. The spacer width is set by ALD thickness (controllable to < 0.5 nm), *not* by lithography, so the CD uniformity of SADP lines is excellent; and the two spacers from one mandrel are perfectly aligned to each other, so there is no overlay contribution to the A-B spacing. The costs: the space between spacers alternates between the "mandrel space" (set by the mandrel CD, litho-controlled) and the "gap space" (set by pitch minus mandrel minus 2 × spacer), giving **pitch walking** if the mandrel CD drifts; every feature is a closed loop (a spacer wraps around the end of a mandrel), so line-ends must be defined with a separate **cut mask**; and the process is only for 1D lines at a single pitch. SADP with cuts is the standard for FinFET fins at 22/16/14 nm and for the tightest metal layers at 10/7 nm.

### SAQP (Self-Aligned Quadruple Patterning)

Do it twice: the spacers from the first SADP become the mandrels for a second spacer deposition. Starting from an 80 nm litho pitch (a "mandrel 1" pitch at the 193i limit), SADP gives 40 nm, and a second spacer cycle gives 20 nm pitch with 10 nm lines. SAQP is how the DUV-only 7 nm-class nodes (TSMC N7 in its original 2018 form, Intel's 10 nm) reached their tightest layers: fins at ~ 30–34 nm pitch and the lowest metal at ~ 36–40 nm pitch, both from a single ~ 120–160 nm-pitch exposure divided by four. The 20 nm final pitch at the limit of the assignment is achievable in principle and demonstrated in R&D, but production nodes used the extra margin. SAQP's CD control is even better than SADP (both line widths are set by ALD), but the space populations now come in *four* flavors, pitch walking compounds, every step adds defectivity (spacer residue, mandrel footing), and the total process takes several days of fab cycle time for one layer.

### Cut and Block Masks

Because SADP/SAQP produce continuous loops of lines, the design's line-ends are created by exposing a **cut mask** (holes or short bars where lines must be removed, used with a positive process) or a **block mask** (regions where the lines must be preserved, used before the final etch). Cuts are 2D and small, so they are the hardest 193i features: at a 40 nm metal pitch a cut must land on one line and not its neighbors, with edge-placement error < ~ 8 nm including overlay, CD, and LER. At 7 nm, the cuts themselves needed LELE or LELELE, and the cut layers were the first to move to EUV (TSMC N7+, 2019) precisely because a single EUV exposure replaces two or three 193i cut exposures with all their overlay budget.

> **Worked example: process steps and cost, SAQP versus single EUV exposure, for one tight metal layer (~ 40 nm pitch).**
> **SAQP route** (one representative flow; real ones vary):
> - Mandrel litho: tri-layer coat (3 coats + 3 bakes), 193i exposure, PEB, develop, ADI metrology: ~ 8 track/scanner steps, 1 exposure.
> - Mandrel etch (SiARC open, SOC open, mandrel etch, trim), strip: ~ 4 etch steps.
> - Spacer 1 ALD, spacer etch-back, mandrel 1 pull, clean: 4 steps.
> - Spacer 2 ALD, spacer etch-back, spacer 1 pull, clean: 4 steps.
> - Cut/block litho: because the cuts need ~ 2 colors at this pitch, 2 × (coat, expose, PEB, develop, etch, strip): ~ 12 steps, 2 exposures.
> - Final hard-mask and metal-trench etch: 2–3 steps.
> - Metrology after every etch and litho: ~ 6–8 steps.
> Roughly **40–45 process steps and 3 DUV exposures**, with ~ 3–5 days of fab cycle time, five separate hard-mask/spacer material depositions, and an edge-placement budget that must absorb the overlay of 3 exposures plus 2 ALD-defined CDs.
> **EUV route**: tri-layer coat (3 + 3), EUV exposure, PEB, develop, ADI, hard-mask open, trench etch, strip, metrology: ~ **15 steps and 1 exposure**, ~ 1 day cycle time, and the line-ends come out of the exposure directly (or with one simple cut).
> **Cost**: a rough depreciation-per-pass estimate. NXT:2100i at ~ $70M over 5 years, ~ 275 wph actual × 7,000 productive hours/year ≈ 1.9M wafer-passes/year → ~ $7 per pass in scanner depreciation; add track, resist and underlayers (~ $10–20 for a tri-layer stack), metrology, and mask amortization and a 193i pass is on the order of $30–50. An NXE:3800E at ~ $200M over 5 years, ~ 150 wph actual × 7,000 h ≈ 1.05M passes/year → ~ $38 per pass in depreciation alone, and an all-in EUV pass on the order of $100–150 (higher power, ~ 30–50 kW of electricity for the source, pellicle-less mask handling, more expensive resist and masks). So 3 DUV passes (~ $100–150) plus ~ 10 extra deposition/etch/clean steps at ~ $5–15 each (~ $80–120), in total ~ $200–250, versus ~ $120–170 for the EUV route. The EUV route wins on cost per layer by ~ 30–40% *and* on cycle time, yield (fewer steps), and design freedom. This calculation, with numbers only slightly different, is the one that justified TSMC's N7+ and N5 EUV insertion and ASML's investment in EUV. It does not favor EUV for layers that need only one or two DUV passes, which is why most layers are still DUV.

### The Cost and Step Explosion

A 28 nm process needed ~ 40–50 masks and ~ 1 litho pass per critical layer. TSMC N7 (2018, DUV-only) required ~ 75–80 masks and, because of multi-patterning, well over 100 litho exposures per wafer. This is the "step explosion": wafer cost per node rose ~ 1.3–1.5× per generation even as density doubled, and the per-transistor cost improvement that had been ~ 30% per node fell toward ~ 10–15%. N5 was the first node in TSMC's history with *fewer* masks than its predecessor (analyst reconstructions put it at ~ 70 masks versus ~ 78 for N7) because up to 14 EUV layers replaced at least 4× that many DUV exposures at cut, contact, via, and metal steps (TSMC, IEDM 2019). N3 uses ~ 20–25 EUV layers; N2 a similar or slightly higher number (exact counts are not disclosed). The remaining ~ 55–65 mask layers are still 193i, KrF, and i-line: upper metals (pitches ≥ 80 nm need only one 193i exposure), implants, wells, pads.
## The Lithography Roadmap by Layer (Late 2026)

| Layer type (logic) | N7 (2018) | N5 (2020) | N3 (2023) | N2 / A16 (2025–2026) |
|---|---|---|---|---|
| Fins / nanosheet definition | 193i SAQP | EUV (single) + cut | EUV | EUV (nanosheet stack litho) |
| Gate (poly/dummy gate) | 193i SADP | EUV | EUV | EUV |
| Contacts / MOL (M0, VIA0) | 193i LELELE | EUV | EUV, some double | EUV, some EUV LELE |
| M1–M4 (tightest metals) | 193i SAQP + cuts | EUV single | EUV single/double | EUV; High-NA evaluation |
| Mx (intermediate, ≥ 80 nm pitch) | 193i single | 193i single | 193i single | 193i single |
| Upper metals, pads, RDL | 193 dry / KrF / i-line | same | same | same |
| Wells, implants, thick-gate | i-line / KrF | same | same | same |
| EUV layers (approx.) | 0 (N7) / 4–5 (N7+/N6) | ~ 14 | ~ 20–25 | ~ 20–25+ |
| Total masks (approx.) | ~ 78 | ~ 70–80 | ~ 80 | ~ 80 |

Exact layer assignments are foundry-confidential; the table reflects public presentations from TSMC, ASML, and imec and analyst reconstructions. Note the pattern: EUV took the ~ 15–25 tightest layers and then stopped, because a layer that can be done in a single 193i exposure is cheaper that way. High-NA EUV, in high-volume use at Intel since mid-2026 for a few dual-qualified 18A layers ahead of its full insertion at 14A (risk production targeted for 2027), and in evaluation elsewhere, aims at the layers where standard EUV is itself starting to need double patterning.

## The Tool Market and Geography

**ASML** (Veldhoven, Netherlands) holds ~ 90% of the lithography market by revenue, 100% of EUV, and ~ 85–90% of ArF immersion; its 2025 revenue was €32.7B, of which €12.0B was DUV systems (279 systems, 47% of them immersion), €11.6B EUV systems (48 systems), and €8.2B installed-base service and upgrades. A notable feature of ASML's DUV business is that a very large share of unit shipments go to China: China was 29% of ASML's sales in 2023, 36% in 2024 (peaking at 49% in individual quarters), and 33% in 2025, almost entirely DUV (NXT:1980i-class and older immersion plus KrF/i-line tools), because Chinese fabs (SMIC, Hua Hong, CXMT, YMTC) are barred from EUV and buy DUV instead, and because the Dutch export rules (September 2023, extended September 2024 to the NXT:1970i and NXT:1980i) require licenses only for the more advanced immersion models (NXT:1970i and above, with the NXT:2000i and above effectively unavailable to China) while the rest remain freely shippable. SMIC's 7 nm-class and 5 nm-class processes, used for Huawei's Kirin and Ascend chips, are pure DUV multi-patterning (SAQP) exactly as described above, with correspondingly poor yields and cost.

**Nikon** (Japan) is ~ 5–8% of the market, with ArF immersion (NSR-S635E, 2018, and NSR-S636E, 2024; NA 1.35, ≥ 280 wph) sold mostly to Intel and to memory makers, and a larger KrF/i-line business. **Canon** (Japan) is ~ 5% by revenue but ships many i-line and KrF tools (FPA-6300 series), and is pursuing **nanoimprint lithography (NIL)**: the FPA-1200NZ2C, announced in October 2023 and first delivered in September 2024 to the Texas Institute for Electronics, presses a quartz template with ~ 14 nm patterns (equivalent to the "5 nm node" in Canon's marketing) into a liquid resist, which is UV-cured, transferring the pattern without any projection optics. Its throughput, defectivity, and template lifetime have kept it out of leading-edge logic; the realistic targets are NAND and specialty devices. Chinese domestic lithography (SMEE, Shanghai Micro Electronics Equipment, with a 90 nm-class ArF tool and claims of 28 nm immersion) is many years behind ASML. Sub-suppliers concentrate the risk further: Zeiss SMT (lenses, ~ 100% for ASML), Cymer and Gigaphoton (lasers, a duopoly), and TEL/SCREEN (tracks).

Photoresist itself is a Japanese-dominated market (JSR, now owned by the Japan Investment Corporation; Tokyo Ohka Kogyo (TOK); Shin-Etsu Chemical; Fujifilm; Sumitomo Chemical) with DuPont and Merck as the main non-Japanese suppliers; Japan holds ~ 90% of ArF and EUV resist supply, a fact Japan used as leverage in its 2019 export dispute with Korea (Module 04).

## Key Numbers

| Quantity | Value |
|---|---|
| ArF excimer wavelength | 193.4 nm (KrF 248 nm, i-line 365 nm, g-line 436 nm) |
| Refractive index of water at 193 nm | 1.437 (effective wavelength ~ 134 nm) |
| Max production NA (193i) | 1.35 |
| Rayleigh resolution at k1 = 0.28, NA 1.35 | 40 nm half-pitch (80 nm pitch) |
| k1 floor for single exposure | 0.25 (two-beam imaging); production ~ 0.28–0.30 |
| DOF at NA 1.35 (k2 ~ 0.6) | ~ 60–65 nm total |
| Excimer laser output | ~ 60–90 W, 6 kHz, 10–15 mJ/pulse, E95 bandwidth ~ 0.3 pm |
| Reticle | 152 × 152 × 6.35 mm quartz, 4× reduction, 26 × 33 mm wafer field |
| Exposure slit | ~ 26 mm × 6–8 mm, wafer scan speed up to ~ 800 mm/s |
| Scanner throughput | ~ 275–295 wph (NXT:2050i / NXT:2100i); ≥ 310 wph (NXT:2150i) |
| Matched-machine overlay spec | ≤ 1.3 nm (NXT:2100i), ≤ 1.0 nm (NXT:2150i); on-product ~ 1.5–3 nm |
| ArF immersion scanner price | ~ $60–80M (NXT:2100i-class) |
| ArF CAR dose / i-line DNQ dose | 20–40 mJ/cm² / 100–300 mJ/cm² |
| ArF resist thickness | ~ 80–120 nm; tri-layer SOC 100–300 nm, SiARC 20–40 nm |
| Developer | 0.26 N (2.38 wt%) TMAH, puddle 30–60 s; NTD uses n-butyl acetate |
| Acid diffusion length in PEB | ~ 5–20 nm (ArF); chemical gain ~ 10^2–10^3 |
| LER / LWR (193i) | ~ 3–5 nm 3σ |
| Spin coat speed / thickness scaling | 1,500–4,000 rpm; t ∝ 1/√rpm |
| SADP / SAQP pitch division | 80 → 40 nm / 80 → 20 nm; N7-class fins ~ 30–34 nm pitch via SAQP |
| EUV layers per node | N5 up to 14, N3 ~ 20–25, N2 ~ 20–25+; total masks ~ 70–80 |
| ASML share of litho market | ~ 90% by revenue; 100% of EUV |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| ASML | Netherlands | TWINSCAN NXT immersion, KrF, i-line scanners; EUV | Leader (~ 90% overall) |
| Nikon | Japan | NSR-S635E / NSR-S636E ArF immersion, KrF, i-line | #2 in ArF immersion (~ 5–8%) |
| Canon | Japan | i-line/KrF steppers/scanners; nanoimprint FPA-1200NZ2C | #3; leader in NIL attempt |
| Carl Zeiss SMT | Germany | Projection lenses and illuminators for ASML | Sole supplier to ASML |
| Cymer (ASML) | USA | ArF/KrF excimer lasers (XLR series) | Co-leader (duopoly) |
| Gigaphoton (Komatsu) | Japan | ArF/KrF excimer lasers (GT series) | Co-leader (duopoly) |
| Tokyo Electron (TEL) | Japan | CLEAN TRACK LITHIUS Pro Z coater/developer | Leader (~ 85–90% leading edge) |
| SCREEN | Japan | SOKUDO DUO coater/developer | #2 |
| JSR | Japan | ArF/KrF/EUV resists, underlayers | Leader in ArF resist |
| Tokyo Ohka Kogyo (TOK) | Japan | Resists, developers | Top-3 resist |
| Shin-Etsu Chemical | Japan | Resists, SiARC, pellicles | Top-3 resist |
| Fujifilm | Japan | ArF/NTD resists, developers | Top-5 resist; NTD pioneer |
| Sumitomo Chemical | Japan | Resists | Top-5 resist |
| DuPont | USA | Resists, BARC | Major non-Japanese supplier |
| Merck (EMD Electronics) | Germany | Resists, underlayers, AZ line | Major non-Japanese supplier |
| Brewer Science | USA | BARC, spin-on carbon | Niche leader in underlayers |
| Nissan Chemical | Japan | BARC, SOC, SiARC | Major underlayer supplier |
| Synopsys / Siemens EDA | USA / Germany | OPC, ILT, SMO software (Proteus, Calibre) | Duopoly in OPC |
| D2S, IMS Nanofabrication | USA / Austria | Curvilinear ILT; multi-beam mask writers | Niche leaders |
| SMEE | China | Domestic ArF (90 nm class) scanners | Distant follower |

## Common Misconceptions

- **"The resolution limit of 193 nm lithography is 193 nm."** → With NA 1.35 immersion and k1 ~ 0.28, single-exposure resolution is ~ 40 nm half-pitch, and multi-patterning reaches 10 nm lines at 20 nm pitch. The wavelength sets the scale, not the limit.
- **"EUV replaced DUV."** → EUV took ~ 15–25 of ~ 80 mask layers at N5–N2. The majority of exposures on a leading-edge wafer, and the overwhelming majority across the industry, are still 193i, KrF, and i-line, and ASML's DUV shipments are larger in unit terms than ever.
- **"Exposure is where the resist pattern is formed."** → For chemically amplified resists, exposure only creates a sparse latent image of acid; the actual solubility switch happens during the post-exposure bake, which is why PEB temperature and delay are among the tightest-controlled parameters in the fab.
- **"Higher NA is always better."** → DOF scales as 1/NA², so the NA 1.35 lens has a total focus budget of ~ 60 nm. Every increase in NA has required thinner resists, planarizing underlayers, and better wafer leveling; there are layers (thick implant masks, deep-topography layers) that are deliberately printed on low-NA i-line or KrF tools.
- **"Multi-patterning just means exposing twice."** → SADP/SAQP define the final CD by ALD spacer thickness, not by lithography, and produce closed loops that need cut masks. It is a deposition-and-etch process with lithography as one input, taking dozens of process steps and days of cycle time per layer.
- **"The mask is a picture of the circuit."** → After OPC, SRAFs, and ILT, a critical-layer mask is a distorted, decorated pattern (increasingly curvilinear) whose printed image, not its own shape, matches the design.

## Where This Fits in the Supply Chain

Lithography consumes the films deposited in Module 06 (the oxide, nitride, polysilicon, amorphous carbon, and metal layers that need patterning), the photoresists, underlayers, developers, and neon/fluorine gases covered in Module 04, and the OPC-decorated photomasks written from the design's GDS/OASIS by mask shops (Module 04, Module 19). Its output is a patterned resist or hard-mask stack on every one of the ~ 80 layers of a leading-edge wafer, which is immediately consumed by the plasma etch step of Module 09 (and, for implant layers, by the ion implanter of Module 10). The scanners come from ASML/Nikon, the tracks from TEL/SCREEN, the lenses from Zeiss, the lasers from Cymer/Gigaphoton, and the chemistry from a handful of Japanese companies; the litho cells are the single largest capital line item in a fab (~ 25–35% of tool spend), and their throughput sets the fab's wafer-start capacity. Module 08 continues the story with the layers where even SAQP was not enough: 13.5 nm EUV.

## Further Reading

- Chris A. Mack, *Fundamental Principles of Optical Lithography: The Science of Microfabrication* (Wiley, 2007). The standard textbook for imaging, resist, and process-window theory.
- Harry J. Levinson, *Principles of Lithography*, 4th ed. (SPIE Press, 2019). Broad and tool-oriented; excellent on overlay and scanner design.
- Chris Mack, "Lithography 101" lecture series and lithoguru.com, including the "Semiconductor Lithography: The Basic Process" tutorials.
- Burn J. Lin, "Immersion lithography and its impact on semiconductor manufacturing," *Journal of Micro/Nanolithography, MEMS, and MOEMS* 3(3), 2004. The paper that made the case for water immersion over 157 nm.
- Hiroshi Ito, "Chemical Amplification Resists for Microlithography," *Advances in Polymer Science* 172 (2005). The definitive review by one of the CAR inventors.
- ASML product pages for TWINSCAN NXT:2050i / NXT:2100i / NXT:2150i (asml.com), and the ASML Technology Investor presentations on DUV/EUV layer counts.
- Cymer, "ArF immersion light sources" and SPIE Advanced Lithography papers on the XLR 800ix bandwidth control (cymer.com).
- WikiChip Fuse, "TSMC Details 5 nm" (IEDM 2019 coverage) and "IEDM 2019 – TSMC 5nm Process" (SemiWiki) for mask and EUV layer counts.
- Asianometry (YouTube and asianometry.com), "A Deep Dive into Immersion Lithography Technology" and the channel's lithography, photoresist, and computational-lithography series.
- SPIE Advanced Lithography + Patterning conference proceedings (annual, February), the primary literature for everything in this module.
