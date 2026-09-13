# Module 13: Metrology, Inspection and Yield

A leading-edge wafer passes through roughly 1,000 to 1,500 process steps over three to four months. Any one of them can go wrong in a way that is invisible to the naked eye, to an optical microscope, and often to the tool that caused it. A 2 nm-class transistor has a gate length near 12 nm, a nanosheet thickness near 5 nm, and vias around 15 nm in diameter that must land on lines aligned to the layer below within about 2 nm. A single 30 nm particle landing before metal-1 patterning can short two lines and kill the die of a $30,000-class data-center GPU. By the time the wafer reaches electrical test at the end of the line, the mistake is three months old and has been repeated on every wafer that followed.

Process control answers three distinct questions with three distinct classes of tool, and confusing them is the most common beginner error:

- **Metrology** measures a parameter: how thick is this film, how wide is this line, how far is this layer shifted from the one below. The output is a number with an uncertainty, taken at a handful of predetermined sites (tens to a few hundred per wafer).
- **Inspection** finds defects: is there anything on this wafer that should not be there, or missing that should be? The output is a list of (x, y) coordinates with a rough size and signal strength. Inspection tools cover as much of the wafer as possible, as fast as possible, and do not initially know what they have found.
- **Review** classifies what inspection found: particle, scratch, bridge, missing contact, or a false alarm. A review tool revisits the inspector's coordinates, takes a high-resolution image, and a human or an algorithm labels it.

Behind all three sits **yield engineering**: the statistics that translate defect counts and parameter distributions into the fraction of dies that will work, and the detective work of tracing a loss back to the tool, chamber, and step that caused it. Process control is, by capex, about one dollar in eight of a modern fab, and it is the difference between a node that makes money and one that does not.

## 1. Film Metrology: Measuring Thickness Without Touching

### Spectroscopic ellipsometry

The workhorse for transparent and semi-transparent films is **spectroscopic ellipsometry (SE)**. Light reflecting off a surface at an oblique angle (65 to 75 degrees, near silicon's Brewster angle) reflects differently for the electric field in the plane of incidence (**p-polarized**) and perpendicular to it (**s-polarized**). The complex reflection coefficients r_p and r_s differ in magnitude and phase, and their ratio is the measurement:

rho = r_p / r_s = tan(Psi) · exp(i · Delta)

**Psi** encodes the amplitude ratio and **Delta** the phase difference. A film stack changes both, because light reflecting from the top surface interferes with light from each buried interface, and the interference depends on thickness, refractive index n, extinction coefficient k, and wavelength. "Spectroscopic" means the measurement is repeated across roughly 190 to 1,000 nm on production tools, with some extending into the vacuum UV below 150 nm (for thin high-k films) or the infrared to 2,500 nm (for thick or rough films).

The instrument is a broadband source (xenon arc or laser-driven plasma), a polarizer, the sample, a rotating compensator (a waveplate spinning at tens of Hz that modulates the polarization state), an analyzer, and a spectrograph. Fourier components of the time-varying signal give Psi and Delta at every wavelength in a fraction of a second. The spot is 25 to 50 µm, which is why every film metrology site on a product wafer is a dedicated pad in the scribe line.

The key subtlety: the ellipsometer does not measure thickness. It measures Psi and Delta, and thickness comes from **model fitting**. The engineer builds an optical model of the stack (substrate, interfacial oxide, film, roughness layer, ambient), assigns each layer a dispersion model (Cauchy for transparent dielectrics, Tauc-Lorentz for amorphous and absorbing films, an effective-medium approximation for rough or porous layers), and the software solves the Fresnel equations, compares computed to measured spectra, and adjusts the free parameters to minimize the error. If the model is wrong, the answer is wrong, however precise the raw data. Metrology recipes take weeks to develop and are validated against cross-section TEM.

The performance is extraordinary: for a thin thermal oxide, repeatability is on the order of 0.01 nm (3 sigma), far smaller than an atom; it is a statistical fit over many photons, not a physical resolution. Accuracy is limited by the model and reference standards to a few tenths of a nanometer. Tools: KLA's SpectraFilm and Aleris, Onto Innovation's Atlas, Nova's PRISM and i-series (Nova began with metrology integrated inside CMP tools). J.A. Woollam supplies research-grade instruments and much of the modeling expertise.

### XRR, XRF, four-point probe, FTIR

Ellipsometry struggles with metals (too absorbing for interference from the bottom interface) and cannot separate thickness from density. Four techniques fill the gaps.

**X-ray reflectometry (XRR)** sends a Cu K-alpha beam (0.154 nm) at grazing incidence, sweeping from 0 to about 5 degrees. Below the critical angle for total external reflection (0.2 to 0.4 degrees, proportional to the square root of electron density) everything reflects; above it, X-rays penetrate and reflect from each interface, producing **Kiessig fringes** whose period gives thickness and whose decay gives roughness. Because the critical angle gives density directly, XRR separates thickness from density. It works on metals, high-k stacks, the ~2 nm TaN/Ta barrier and Co liner in copper interconnect, and the ~1 nm interfacial layer under a hafnium oxide gate. It is slow (seconds to minutes per site), so it is used for qualification and sampling. **X-ray fluorescence (XRF)** measures characteristic emission lines to give composition (germanium fraction in a SiGe source/drain) and mass per unit area. Bruker (the former Jordan Valley line), Rigaku, and Malvern Panalytical supply combined XRR/XRF/XRD tools.

The **four-point probe** is the oldest tool in the fab. Four collinear tungsten-carbide tips at about 1 mm spacing press onto the surface; current flows through the outer pair, voltage is read across the inner pair, so contact resistance drops out. Sheet resistance is R_s = (pi / ln 2) · (V / I) = 4.532 · V / I ohms per square. It is a contact method, so it runs on monitor wafers: implant dose after anneal, metal deposition, silicide formation. KLA's RS series (from Tencor) leads; non-contact eddy-current versions exist for product.

**Fourier-transform infrared spectroscopy (FTIR)** measures mid-infrared absorption from molecular bond vibrations: hydrogen in PECVD silicon nitride (Si-H at 2,150 cm^-1, N-H at 3,350 cm^-1, which control stress and charge trapping), boron and phosphorus in BPSG, interstitial oxygen in Czochralski silicon (1,107 cm^-1), and porosity in low-k dielectrics. It is fast and needs only a calibration curve.

## 2. CD Metrology: Measuring the Width of a Line

**Critical dimension (CD)** is the width of a patterned feature: gate, fin, metal line, contact hole. Holding CD to a few percent of a 20 nm feature means measuring it to a fraction of a nanometer. Three technologies compete.

### CD-SEM

The **critical-dimension scanning electron microscope (CD-SEM)** is the reference tool. A field-emission gun produces a beam focused to about 1 to 2 nm and rastered across the feature. The **landing energy** is deliberately low, 300 to 800 eV, so the beam neither penetrates far nor damages the resist. Primary electrons scattering in the top few nanometers eject **secondary electrons** (below 50 eV) that are collected above the sample. Secondary yield rises sharply at edges, because a sloped sidewall exposes more surface within the interaction volume, so a line appears as a dark plateau bordered by two bright edge peaks.

Turning that image into a number is the **edge-detection algorithm**, and its choices determine the answer. The tool averages the signal along the line into a profile, then applies a criterion: a threshold (edge where the signal crosses, say, 50 percent between baseline and peak), maximum slope, or a model-based library that compares the profile against Monte Carlo simulations of electron scattering from lines of known geometry. Threshold is fast and robust but depends on the setting and the sidewall angle; model-based methods are more accurate but need a calibrated physics model. Either way, CD-SEM results are offset-calibrated against cross-section TEM.

Three physical problems plague CD-SEM at advanced nodes. **Charging**: on resist and oxide, the beam deposits charge that deflects subsequent electrons and shifts the apparent edge; tools mitigate with pre-charge scans, energy filtering, and landing energies near the point where secondary emission balances incoming current. **Resist shrinkage**: chemically amplified ArF and EUV resists lose volume under the beam (chain scission and outgassing), so a 30 nm resist line may shrink 1 to 3 nm during the first measurement; fabs characterize the shrinkage curve and extrapolate to zero dose, or measure after etch. And the **precision-throughput trade**: more averaged frames means better precision but more shrinkage, more charging, and fewer sites per hour.

Production CD-SEMs reach about 0.2 nm (3 sigma) precision on an etched feature and measure several hundred to over a thousand sites per hour (vendors quote tens to ~ 100+ wafers per hour at a few sites each). Hitachi High-Tech dominates (the CG series, currently the CG7300 generation introduced in late 2019) with well over half the market; Applied Materials' VeritySEM is the main alternative (KLA's eCD line was discontinued in the 2000s). Because the image is 2D top-down, a CD-SEM cannot easily see sidewall angle, footing, or a buried profile.

### Scatterometry / OCD

**Optical critical dimension (OCD) metrology**, or **scatterometry**, does not image the feature at all. It measures the specular reflection from a periodic grating of the feature (a 30 × 30 to 50 × 50 µm target in the scribe line, or increasingly an in-die periodic region) versus wavelength and polarization, exactly like an ellipsometer, and solves an inverse problem. The forward model is **rigorous coupled-wave analysis (RCWA)**, which expands the periodic permittivity as a Fourier series and solves Maxwell's equations layer by layer to compute the reflected spectrum for a given geometry: line width, height, sidewall angle, corner rounding, footing, underlayer thicknesses. A library of simulated spectra, or a real-time regression, finds the geometry whose spectrum matches.

The diffracted spectrum encodes the full 3D profile. One measurement returns fin height, fin width at three heights, and the recess depth of a buried oxide, with sub-nanometer precision, in under a second per site, with no charging, shrinkage, or vacuum. On a nanosheet transistor, OCD is the only in-line tool that can report the thickness of each of three stacked silicon channels and the SiGe layers between them. The catches: it needs a periodic target, and the inverse problem can be ill-posed, since several parameter combinations can produce nearly the same spectrum (a thicker film with a narrower line). The recipe developer fixes some parameters, adds constraints, or brings in data from another tool (the origin of hybrid metrology, section 11). Machine-learning models trained on spectra against reference data now handle the hardest structures. Nova (the OCD pioneer), KLA (SpectraShape), and Onto (Atlas) are the suppliers; Nova leads stand-alone OCD, KLA leads overall.

### CD-AFM and TEM

**CD-AFM** (atomic force microscopy with a flared "boot" tip that reaches under overhanging sidewalls; Bruker's Dimension X3D) is the only non-destructive technique with traceable sidewall accuracy, used mainly to calibrate CD-SEM and OCD. It is slow and tips wear.

**TEM and STEM** are the ground truth. A **focused ion beam (FIB)** tool (gallium or xenon plasma sources; Thermo Fisher Helios and Hitachi lead) mills a 50 to 100 nm lamella from a chosen location, lifts it out with a micromanipulator, and welds it to a grid. A TEM (Thermo Fisher Spectra, Hitachi HF5000, JEOL) images it at atomic resolution, with energy-dispersive X-ray spectroscopy mapping composition. This is how the industry knows a 3 nm nanosheet is really 3.1 nm with a 0.6 nm interfacial oxide. It is destructive, takes hours per sample, and costs hundreds to thousands of dollars per cross-section, so it calibrates the in-line tools, debugs excursions, and supports **failure analysis (FA)** on dies that failed test. A large fab runs dozens of FIB/TEM systems around the clock.

## 3. Overlay: Aligning One Layer to the Next

**Overlay** is the positional error between a patterned layer and the layer beneath it. If metal-2 is shifted 3 nm relative to via-1, the vias partially miss the lines, resistance rises, and eventually the connection opens. The **overlay budget** at a leading-edge node is roughly 20 to 25 percent of the minimum pitch of the most critical layers; for TSMC N2 and Intel 18A the total on-product tolerance for the tightest layer pairs is on the order of 2 nm (3 sigma), spread across the scanner's stage and lens, the reticle, wafer distortion from stressed films and chucking, and the metrology itself. The rule of thumb is that metrology uncertainty should consume no more than about 10 percent of the budget, so overlay tools need a total measurement uncertainty near 0.1 to 0.2 nm.

### Targets: box-in-box, AIM, and diffraction gratings

The classic **box-in-box** target is a large square (about 20 µm) in the previous layer and a smaller square in the current layer, imaged optically; the overlay error is the offset between centers. It is sensitive to asymmetry in how each box's edges image. KLA's **AIM (Advanced Imaging Metrology)** target replaced it with periodic gratings in the two layers arranged so that each is measured with the same optical response, cancelling tool-induced errors and allowing sub-nanometer precision. These **image-based overlay (IBO)** tools, principally KLA's Archer series (Archer 750 and 800 generations), use broadband visible/near-IR light at multiple wavelengths to see through opaque films.

**Diffraction-based overlay (DBO)** stacks two gratings, one per layer, with a deliberate programmed shift of +d in one target and −d in its neighbor. Illuminated at a single wavelength, the intensity difference between the +1st and −1st diffraction orders is proportional to the overlay error; with two targets of known bias, the proportionality constant drops out and overlay falls out algebraically. The measurement takes tens of milliseconds, the targets are 10 to 16 µm, and averaging over the whole grating gives repeatability near 0.05 to 0.1 nm. ASML's YieldStar family (380/385, and the newer 1375/1385) leads DBO, with KLA's Archer offering a DBO mode. ASML's advantage is integration: YieldStar data feeds directly back to the NXT and NXE scanners.

### On-product overlay and the metrology-to-device offset

The targets are not the devices. They sit in the scribe line, are far larger than device features, and print under different lithographic and etch conditions than a 20 nm via. So the overlay the target reports can differ from the overlay the transistors experience by a nanometer or more, a **metrology-to-device (MTD) offset** that is often the largest single term in the budget. Causes include asymmetric etch of the target grating (which shifts its apparent center), asymmetric films on top, and lens aberrations that distort a 500 nm grating pitch differently from a 40 nm device pitch.

The fixes: shrinking targets and moving them in-die; measuring the device directly with a CD-SEM or e-beam overlay tool after etch and calibrating the optical targets against it; using multiple wavelengths and selecting the one least sensitive to asymmetry; and **on-product overlay (OPO)** control, where the scanner receives per-wafer, per-field, high-order corrections (ASML's correction-per-exposure adjusts dozens of polynomial terms per field) computed from dense sampling of several hundred sites on a few wafers per lot, which is why DBO speed matters.

## 4. Defect Inspection: Finding Something You Do Not Know Is There

### Bright-field optical inspection

**Bright-field (BF) inspection** images the wafer under near-normal illumination and compares each location to a reference: the same location in the adjacent die (**die-to-die**), the equivalent cell in a memory array (**cell-to-cell**, which allows higher sensitivity because the pattern is perfectly periodic), or a rendering of the design (**die-to-database**, used for masks). The difference image is thresholded; anything surviving is a defect candidate with location, pixel size, and signal strength.

The flagship tools are KLA's 29xx/39xx series (the 2935 has been the leading-edge workhorse since about 2017 to 2018, the 3900-series and 2950 since about 2019 to 2020, with the 2965 and 3935 as the current foundry/logic flagships). Their source is a **laser-sustained broadband plasma**: a continuous-wave laser focused into a xenon bulb sustains a plasma of tens of thousands of kelvin emitting from about 190 nm into the visible, many times brighter than an arc lamp. Brightness matters because sensitivity scales with signal-to-noise, and the noise is shot noise plus the pattern noise of the dies themselves (line-edge roughness, film thickness color variation). The tools offer many optical modes (wavelength band, polarization, aperture, focus offset), and the recipe engineer picks the mode that maximizes defect signal against background for each layer. Time-delay-integration sensors read out hundreds of megapixels per second as the stage scans continuously.

Sensitivity is around 20 nm on a smooth layer and worse on noisy layers. Pixel sizes are 30 to 100 nm; smaller pixels mean higher sensitivity and lower throughput, roughly as the inverse square. At highest sensitivity a 300 mm wafer takes tens of minutes; at a relaxed pixel, a few. Optical inspection does not resolve a 20 nm defect (the wavelength is ten times larger); it detects the perturbation the defect makes to the reflected field, which is why sensitivity depends so heavily on the surrounding pattern. Design-aware inspection (KLA's NanoPoint) uses the layout to define **care areas** where a defect would matter, raising sensitivity there and lowering it elsewhere to cut the nuisance rate.

### Dark-field laser scattering

**Dark-field (DF) inspection** illuminates the wafer with an oblique laser and collects only light scattered away from the specular direction. A perfect surface scatters almost nothing, so a particle, pit, or scratch is a bright point on a dark background. For a particle much smaller than the wavelength, scattered intensity follows Rayleigh scattering, proportional to d^6 / lambda^4, which is why the tools use DUV (around 266 nm) and why sensitivity falls off a cliff: halving the particle diameter reduces the signal 64-fold.

**KLA Surfscan** (SP7 and SP7XP) is the standard for **bare and blanket wafers**: incoming wafer qualification, monitor wafers run through a chamber to check its particle performance, post-CMP and post-clean surfaces. Sensitivity is below 20 nm in polystyrene-latex-sphere equivalents at above 100 wafers per hour. Every process chamber is qualified by counting the particles it adds to a bare wafer ("adders"); a chamber exceeding its spec (often single digits above 30 nm per pass) is taken down.

For **patterned wafers**, the pattern itself scatters. KLA's Puma series (9850, 9980) combines oblique and normal illumination with multiple collection channels and Fourier filtering that blocks the periodic scatter of a regular pattern while passing the aperiodic scatter of a defect. Patterned DF is faster and cheaper than BF and is used where the killer defects are particles rather than pattern defects. Hitachi High-Tech competes in both segments.

### E-beam inspection

Optical tools cannot see the defects that matter most at the front end of a 2 nm-class process: a missing 15 nm contact, a 5 nm bridge between fins, a void inside a via. **E-beam inspection (EBI)** sees them because a 2 nm probe resolves them directly, and because the secondary-electron signal is sensitive to charging: an open contact, which cannot drain charge to the substrate, appears as a bright or dark spot in **voltage contrast** even when its surface looks perfect. EBI can therefore find buried electrical opens and shorts before the interconnect is built.

The problem is speed. At a 5 nm pixel a 300 mm wafer (7.1 × 10^16 nm² of area) contains about 2.8 × 10^15 pixels; even at a 400 MHz pixel rate with no overhead that is about 80 days, and the beam current needed for adequate signal-to-noise limits real pixel rates to a fraction of that. Single-beam tools (KLA eSL10, Applied PROVision, ASML HMI eP5) inspect a fraction of a percent of the wafer on selected care areas, for hot spots and characterization rather than lot monitoring.

**Multi-beam inspection** attacks the serialization directly. ASML's HMI eScan 1000, shipped in 2020, splits one source into a 3 × 3 array of nine beams with separate detector channels, for up to about 6× single-beam throughput. The eScan 1100, first installed in 2022, uses a 5 × 5 array of 25 beams for up to 15×, with a column designed to minimize crosstalk between beams. ASML's roadmap extends to hundreds of beams; KLA and Applied have their own efforts. As of 2025 multi-beam EBI remains a sampling tool for the most critical layers: the difference between inspecting 0.1 percent of a wafer and a few percent, not 100 percent.

### The sampling problem

A fab at 100,000 wafer starts per month with 1,200 steps performs about 1.4 billion wafer-steps a year. Inspecting every wafer after every step is impossible: an inspector costs $10 million to $40 million and takes minutes per wafer. So inspection is a **sampling** strategy. A fab defines perhaps 30 to 60 inspection points (post-litho, post-etch, post-CMP, post-clean at each critical layer) and at each inspects one to three wafers of the 25 in a lot, on some fraction of lots. The goal is not to find every defect on every wafer but to detect a **process shift** (a chamber that started adding particles, a resist batch that started collapsing) within hours, before many lots pass through.

Defect counts from each point go into **statistical process control (SPC)** charts by defect type, with control limits from the historical distribution. A point above the upper limit triggers an alarm, the lot is held, and the engineer reviews. Adaptive sampling raises the rate when a tool is suspect and lowers it when stable, and the newest systems use FDC data from the process tools to predict which wafers are worth inspecting.

## 5. Defect Review and Classification

An inspector's output is a **defect map** of coordinates. A significant fraction, sometimes the majority, are **nuisance** (real but harmless: a color variation, a rough spot) or **false** (noise). Sorting real from nuisance and identifying the real ones is review.

The **defect review SEM (DR-SEM)** drives to each coordinate (the inspector's positional accuracy of a few hundred nanometers must place the defect inside the SEM's field of view), takes a high-resolution secondary-electron image, often tilted or stereoscopic, and can add an energy-dispersive X-ray spectrum to identify a particle's composition (aluminum points to a chamber liner, stainless steel to a robot or valve, tin to the EUV source). KLA's eDR7380 and successors dominate, tightly coupled to KLA's inspectors; Applied's SEMVision G7 and Hitachi's RS series compete. A review SEM handles a few hundred to a thousand defects per hour, so only a sample of the map is reviewed.

**Automatic defect classification (ADC)** assigns each image to a class and marks nuisance. Early ADC used hand-engineered features (size, aspect ratio, contrast); since about 2017 convolutional neural networks trained on labeled fab images have become standard, exceeding 90 percent accuracy on established classes, with humans labeling new classes as they appear. The inspector itself increasingly runs a first-stage classifier on the optical difference image (inline ADC) to suppress nuisance before review, where the biggest leverage lies.

### Killer vs nuisance, and the catalogue of defect types

A **killer defect** causes an electrical failure; a **nuisance defect** does not. A 30 nm particle on a metal-1 layer with 30 nm spaces is a probable short; the same particle on a 500 nm-pitch pad layer is harmless. The **kill ratio** for a defect class and layer, the fraction of dies containing such a defect that fail test, is estimated by overlaying defect maps on sort maps, and converts inspection data into yield predictions.

The main defect families on a logic process:

- **Particles**: flakes from chamber walls, wear debris from moving parts, resist fragments, etch residue, people. Still the largest category and the reason every chamber gets periodic cleans.
- **Scratches**: from CMP (a hard slurry agglomerate dragged across the surface) or wafer handling.
- **Bridges and opens**: from lithography (defocus, dose error, scumming, stochastics), etch (incomplete etch leaving a bridge, over-etch cutting a line), or CMP (dishing leaving residual metal between lines).
- **Missing or merged contacts and vias**: at EUV layers the dominant failure is **stochastic**: shot noise in the number of EUV photons (30 mJ/cm² at 92 eV per photon is only ~ 20 photons per nm², so a 20 nm contact receives a few thousand incident photons and absorbs a fraction of them) and in resist chemistry occasionally leaves a contact unopened or merges neighbors. Failure probabilities of 10^-9 to 10^-12 per feature sound tiny until multiplied by 10^10 to 10^11 contacts on a large die.
- **Voids** in copper fill (a later electromigration failure) or dielectric gap fill.
- **Residue**: incompletely stripped resist, etch polymer, slurry, watermarks.
- **Pattern collapse**: high-aspect-ratio resist or fins pulled over by capillary forces during rinse and dry.
- **Crystal defects**: stacking faults in epitaxial SiGe, slip lines from thermal stress.

## 6. Reading a Wafer Map

Defects and failures are never uniformly distributed, and the spatial pattern is often the fastest route to the cause. Yield engineers read **wafer maps** (of defects, parametric values, or sort bins) the way radiologists read X-rays:

| Signature on the map | Likely cause |
|---|---|
| Ring of failures at the wafer edge | Edge-bead removal set wrong, plating or deposition roll-off, CMP edge exclusion, PVD clamp-ring shadow, focus loss at the edge |
| Arc-shaped scratch, sometimes concentric | CMP: a hard particle in the slurry or a conditioner diamond dragged across the rotating wafer |
| Radial streaks or spiral from center | Spin processes (coat, develop, spin-rinse-dry); a pre-existing particle leaves a comet tail downstream |
| Concentrated spot at center | Showerhead center, chuck center, nozzle drip in a wet tool |
| One quadrant or half-wafer | One faulty station of a multi-station tool (chamber, spin cup, CMP head) |
| Same defect in every exposure field | Reticle or pellicle defect; repeats at the field pitch |
| Every nth field, or a checkerboard | A failing exposure slot or a systematic stage/focus error at specific field positions |
| Random, no structure | The true random baseline D0 |
| Side-to-side gradient | Hotplate or chuck temperature gradient, gas-flow or plating-current asymmetry |

The map alone rarely names the tool; **commonality analysis** does. The manufacturing execution system knows which chamber processed every wafer at every step. When a set of lots shows a loss, software ranks every (step, tool, chamber) combination by how well "went through it" separates failing from passing wafers. A scratching CMP head is found in minutes because the failing lots all share head #3 on polisher CMP-07 at metal-2 and nothing else.

## 7. In-Line Electrical Test: PCM and WAT

Long before a die can be functionally tested, its transistors and wires are measured electrically on **test structures** in the **scribe line** (the 60 to 80 µm streets between dies, destroyed at dicing). This is **wafer acceptance test (WAT)** in TSMC's vocabulary, **process control monitoring (PCM)** elsewhere, or "e-test." A parametric tester (Keysight 4080 series, Keithley S500) with a probe card contacts 25 to 50 pads at 5 to 17 sites per wafer and runs DC and low-frequency measurements in seconds per site:

- **Transistor I-V**: threshold voltage, on- and off-current, subthreshold slope, DIBL for every device flavor. The most direct check of the entire FEOL.
- **Resistances**: sheet resistance via van der Pauw structures; contact and via resistance via Kelvin structures; **via chains** of hundreds of thousands to millions of vias in series (one open via reads as an open chain, so the chain is a yield monitor for opens at that layer).
- **Serpentine and comb structures**: a long minimum-pitch serpentine (opens) interleaved with a comb (shorts) over a significant area; failures give a direct estimate of defect density at that layer.
- **Capacitances**: gate capacitance (effective oxide thickness), interconnect capacitance (low-k and line profile).
- **Ring oscillators**: chains of inverters whose frequency is a compact measure of gate delay, correlated with transistor metrics to build the process-corner model.
- **Leakage and breakdown**: gate, junction, dielectric.

WAT runs at first metal (early feedback) and at end of line, often at intermediate layers too. Every parameter has a spec window; a wafer outside it is scrapped regardless of how it later tests, because out-of-spec transistors cannot be trusted for reliability. The WAT database, spanning millions of wafers, underlies the foundry's SPICE model, its yield model, and its ability to say "this lot's ring oscillators are 3 percent slow because gate CD ran 0.4 nm wide, traced to etch chamber B."

## 8. SPC, APC, FDC, and the Excursion

### Statistical process control

Every metrology and WAT parameter feeds a **control chart**. The **Shewhart chart** plots lot mean and range against time with limits at ±3 sigma of the historical distribution, and applies the **Western Electric rules**: one point beyond 3 sigma, two of three beyond 2 sigma on one side, four of five beyond 1 sigma, or eight consecutive on one side of center. **Process capability** relates spread to specification: C_pk = min(USL − mu, mu − LSL) / (3 sigma), targeted at 1.33 or better for critical parameters. For a 20 nm CD with a ±2 nm spec, that means a 3 sigma CD variation below 1.5 nm, which is why metrology precision must be near 0.2 nm.

### Advanced process control

SPC detects; **advanced process control (APC)** corrects. In **run-to-run (R2R) control**, the metrology result from lot n adjusts the recipe for lot n+1, usually through an exponentially weighted moving average so one noisy measurement does not overcorrect. The OCD measures post-etch gate CD, and the etcher's over-etch time or the scanner's dose is trimmed by a fraction of a percent; the overlay tool measures lot n, and the scanner's per-field corrections for lot n+1 are updated; a pre-CMP thickness map sets per-wafer polish time. The scanner is the most heavily controlled tool in the fab: ASML's software builds models of every scanner's fingerprint and every layer's distortion from thousands of wafers and applies corrections per field. Feedforward control adjusts a downstream step from upstream data, such as tuning etch to the incoming film thickness.

### Fault detection and classification

**Fault detection and classification (FDC)** watches the tools rather than the wafers. Every modern tool streams hundreds of sensor traces at 1 to 10 Hz over SECS/GEM or EDA interfaces: RF forward and reflected power, pressure, gas flows, chuck temperature and helium backside pressure, throttle valve position, optical emission spectra, endpoint signals. FDC software (Applied SmartFactory, PDF Solutions Exensio, fab-built systems) builds a statistical envelope for each trace during known-good runs and alarms on departures: a rising reflected power means a matching-network drift, a changed endpoint shape means the wrong incoming thickness, a helium leak spike means a chipped wafer or a particle under it. FDC catches many faults before any wafer is measured and drives **predictive maintenance**.

### The excursion

An **excursion** is a departure from normal behavior that affects product: a tool adding particles, a chemical batch out of spec, a drifting implanter dose. The reaction is scripted in an **out-of-control action plan (OCAP)**. Within minutes of an alarm the tool is put on hold. Lots that passed through it since the last known-good measurement are identified from the MES and held. Engineers pull them to inspection and review and decide whether they are scrap, reworkable (resist can be stripped and recoated; almost nothing else can be undone), or dispositionable with a risk note. The tool is diagnosed, repaired, requalified with monitor wafers and a partition test, and released. A good fab's response time is hours; at $15,000 to $20,000 per N4 wafer and 25 wafers per lot, one undetected day on a tool running 30 lots per day can cost over $10 million. This is the single strongest argument for in-line inspection.

## 9. Yield Theory

### Three kinds of yield

**Yield** is the fraction of dies that work, and it decomposes:

- **Random defect yield** (Y_random): losses from randomly distributed defects such as particles and stochastic failures. Scales with die area; described by defect density models.
- **Systematic yield** (Y_sys): losses hitting every die the same way through a design-process interaction: a layout pattern that prints marginally, a lithography hot spot. Independent of area to first order; fixed by changing the design rule, OPC, or process.
- **Parametric yield** (Y_param): dies whose transistors all exist but whose speed, leakage, or power falls outside the sellable window. Binning converts some of this into lower-priced product.

Y = Y_sys × Y_param × Y_random. At the start of a node, systematic and parametric losses dominate and are fixed one by one; at maturity, random defects dominate and the work is grinding D0 down.

### Defect density and the Poisson model

Suppose killer defects fall at random with average density **D0** (defects/cm²) and a die has area A (cm²). The expected number per die is A · D0. If defects are independent, the count is Poisson-distributed and the probability of zero defects, the **Poisson yield model**, is:

Y = exp(−A · D0)

Its weakness is pessimism for large dies: real defects cluster (a particle shower, a scratch, an edge ring hit many neighboring dies and leave others clean), so a large die is somewhat more likely to be clean than Poisson predicts at the same average D0.

### Murphy, Seeds, and the negative binomial

Early fixes assumed D0 varies across the wafer with some distribution f(D) and averaged the Poisson yield over it: Y = integral of exp(−A · D) · f(D) dD.

- **Murphy's model** (Bell Labs, 1964) used a triangular distribution: Y = [(1 − exp(−A · D0)) / (A · D0)]².
- **Seeds' model** used an exponential distribution: Y = 1 / (1 + A · D0), the most optimistic classical model.
- The **negative binomial model** (Stapper, IBM) assumes a gamma distribution with a **clustering parameter alpha**:

Y = (1 + A · D0 / alpha)^(−alpha)

As alpha goes to infinity this becomes Poisson (no clustering); smaller alpha means more clustering and higher large-die yield. Empirical alpha for modern processes is about 1 to 3, with alpha near 2 a common default. A multi-layer process has a D0 and alpha per layer and the yield is the product, but the single-parameter form is what appears in nearly every industry discussion, and D0 is the number that TSMC, Samsung, and Intel plot on symposium slides, usually with an unlabeled y-axis.

> **Worked example: yield vs die area at D0 = 0.1 defects/cm².**
>
> A mature leading-edge node reaches a killer defect density near 0.1/cm². Compare a 100 mm² smartphone processor with an 800 mm² data-center GPU (A in cm², so A·D0 = 0.1 and 0.8 respectively).
>
> | Die area (mm²) | A·D0 | Poisson exp(−A·D0) | Murphy | Seeds 1/(1+A·D0) | Neg. binomial, alpha = 2 |
> |---|---|---|---|---|---|
> | 50 | 0.05 | 95.1% | 95.1% | 95.2% | 95.2% |
> | 100 | 0.10 | 90.5% | 90.6% | 90.9% | 90.7% |
> | 200 | 0.20 | 81.9% | 82.2% | 83.3% | 82.6% |
> | 400 | 0.40 | 67.0% | 67.9% | 71.4% | 69.4% |
> | 600 | 0.60 | 54.9% | 56.6% | 62.5% | 59.2% |
> | 800 | 0.80 | 44.9% | 47.4% | 55.6% | 51.0% |
>
> Two lessons. The models agree for small dies and diverge for large ones: at 800 mm² the spread between Poisson and Seeds exceeds 10 points, so the choice of model and alpha matters enormously for a GPU and hardly at all for a phone chip. And the phone die keeps 90 percent of its wafer while the GPU keeps roughly half. Now repeat at D0 = 0.5/cm², typical of early risk production: the 100 mm² die yields exp(−0.5) = 61 percent, but the 800 mm² die yields exp(−4) = 1.8 percent under Poisson, or (1 + 2)^(−2) = 11 percent under negative binomial with alpha = 2. Nobody ships an 800 mm² die on a young process; big-die products arrive one to two years after a node's first phone chips, once D0 has fallen.

### Why chiplets help

Splitting an 800 mm² monolithic design into four 200 mm² chiplets raises per-chiplet yield from 45 to 82 percent (Poisson, D0 = 0.1). All four must be good and be assembled, so the compound yield 0.82^4 = 45 percent looks like no gain until **known-good-die** testing is included: each chiplet is tested before assembly and only good ones are packaged, so effective silicon yield is 82 percent and the waste is limited to assembly yield, typically above 95 percent for a mature CoWoS or hybrid-bonded flow. Only the compute chiplets need the leading-edge node's D0 and wafer cost; I/O and cache can sit on an older, cheaper, higher-yielding node. AMD's MI300 and EPYC, Intel's Meteor Lake, and Apple's Ultra parts exploit this; NVIDIA's Blackwell uses two reticle-sized dies rather than many small ones because its bandwidth requirement favors one wide seam.

### The yield learning curve

D0 is a function of time. When a new process enters risk production, D0 is typically several tenths per cm² and even small dies yield well below 70 percent. Over the following six to eight quarters the fab drives D0 down through thousands of individual fixes: a chamber-clean recipe, a filter, a design-rule tweak, a better resist, an OPC update for a hot spot. The curve of D0 against time, the **yield learning curve**, is the most closely guarded and most eagerly leaked chart in the industry.

TSMC has shown these curves for N7, N5, N3, and N2 at its symposia, plotted at the same relative stage of development. At the 2025 North American symposium it disclosed that N2's D0, two quarters before high-volume production, was lower than N3, N5, or N7 had been at the equivalent point, despite N2 being its first gate-all-around node; the N2 curve started higher than N5's but fell steeply and tracked N3's. TSMC does not label the absolute axis, but industry estimates place a mature TSMC logic node near or below 0.1/cm² and a node in early risk production around 0.4 to 0.6/cm², so "D0 falls from roughly 0.5 to roughly 0.1 in about two years" is a fair description of the shape, not an official number. For Intel 18A, Intel's own CEO said in September 2024 that D0 was "below 0.4" and "healthy"; press claims during 2025 of yields from single digits to a healthy majority for small test dies were rumours and analyst estimates, while Intel's statements described 18A as on track for Panther Lake (launched on 18A in early 2026) and its D0 as in line with previous nodes at the same stage. Treat specific competitor D0 numbers with suspicion; the shape of the curve is well established, the absolute values rarely are.

## 10. Redundancy, Repair, Harvesting, and Binning

Yield models describe dies with zero killer defects. Designers cheat this three ways.

**Redundancy and repair** are universal in memory. A DRAM or SRAM array carries spare rows and columns (a few percent extra); at wafer test a failing row is identified and a laser or electrical fuse permanently remaps its address to a spare. A memory die with 20 scattered single-bit failures ships as a perfect part, which is why memory yields exceed 90 percent on dies with defect counts that would kill unrepairable logic. Large caches on logic dies (an H100 has 50 MB of L2) use the same technique, plus error-correcting codes.

**Harvesting** does the same at the level of functional blocks. NVIDIA's GH100 die physically contains 144 streaming multiprocessors (SMs); the H100 SXM5 product enables 132 and the H100 PCIe enables 114. A die with a killer defect in one SM, or two SMs that fail speed, is still a fully sellable H100; one with more failures becomes a lower-tier product. AMD, Intel, and every GPU and multi-core CPU vendor do this (a 96-core and a 64-core EPYC may be the same dies), and it is why large dies are viable at all.

> **Worked example: good H100 dies per wafer.**
>
> The GH100 die is about 814 mm² (roughly 26 × 31 mm, close to the 26 × 33 mm = 858 mm² reticle limit). A common estimate for **dies per wafer (DPW)** that accounts for partial edge dies is DPW = pi · (d/2)² / A − pi · d / sqrt(2 · A), with d the wafer diameter and A the die area in the same units. With d = 300 mm and A = 814 mm²: pi · 22,500 / 814 = 86.8, minus pi · 300 / sqrt(1,628) = 942.5 / 40.35 = 23.4, gives about 63. A 3 mm edge exclusion (d = 294 mm) and scribe lines bring it to about 60, matching published estimates.
>
> At mature TSMC 4N take D0 = 0.1/cm² (A = 8.14 cm², A·D0 = 0.814). Poisson yield for a defect-free die is exp(−0.814) = 44 percent, about 27 perfect dies; negative binomial with alpha = 2 gives (1 + 0.407)^(−2) = 50.5 percent, about 31.
>
> Now add harvesting. Suppose ~70 percent of the die area is SMs and other disableable blocks, and ~30 percent (NVLink, memory controllers, L2 fabric, PCIe, crossbar) is not. A defect in the unrepairable 2.44 cm² is fatal: the survival probability is exp(−0.244) = 78 percent. In the repairable 5.70 cm² the expected defect count is 0.57; the SXM configuration tolerates 12 dead SMs, and the probability of more than 12 Poisson events with mean 0.57 is negligible. Effective yield is therefore about 78 percent, or 47 to 49 sellable dies per wafer instead of 27 to 31. At a 4N wafer cost near $16,000 to $18,000, silicon cost per sellable die is on the order of $330 to $380, trivial next to the module's price and small even next to its HBM and CoWoS packaging cost. For a data-center GPU, harvesting roughly doubles effective yield, and wafer yield is not the dominant cost; packaging capacity and HBM are.

**Binning** treats parametric variation. After test, dies are sorted by maximum frequency and leakage into speed grades sold as different SKUs. A die 5 percent slower than target becomes the lower-clocked part. A 1 percent improvement in ring-oscillator speed shifts the whole distribution and moves a measurable fraction of dies into the higher-priced bin. Module 14 covers the test flow that does this.

## 11. The Economics of Process Control

**KLA** (Milpitas, California; the 1997 merger of KLA Instruments and Tencor) holds about 55 to 56 percent of the process control equipment market and a considerably larger share of optical patterned-wafer inspection, where it has few real competitors at the leading edge. Its fiscal 2025 revenue was about $12 billion, over 80 percent from semiconductor process control. The remainder is split among **Applied Materials** (e-beam review and inspection, CD-SEM), **Hitachi High-Tech** (the CD-SEM leader, dark-field inspection, review), **ASML** (YieldStar overlay, HMI e-beam), **Onto Innovation** (film and OCD metrology, packaging inspection), **Nova** (OCD, integrated metrology, XPS/XRF composition), **Lasertec** (the sole supplier of actinic EUV mask inspection for years), **Camtek** (packaging), **Zeiss** (mask review), and **Bruker**, **Rigaku**, and **Thermo Fisher** in X-ray and electron microscopy. Chinese suppliers (Skyverse, RSIC, Jingce) serve domestic fabs but remain years behind at the leading edge.

Process control takes roughly 10 to 15 percent of the wafer fab equipment budget, rising about a point per node as each adds more critical layers, tighter budgets, and new failure modes (stochastics, GAA channel thickness, backside power). A $20 billion gigafab therefore carries $2 billion to $3 billion of metrology and inspection tools, comparable to its entire etch fleet. Per wafer, the cost of ownership of inspection is a few hundred dollars for a leading-edge logic wafer, a few percent of wafer cost, and the return is measured in yield points: a 1 percent yield gain on 100,000 wafers per month at $15,000 each is worth $180 million per year.

### Hybrid metrology, AI, and digital twins

**Hybrid metrology** combines data from several tools in one fit. A nanosheet stack has too many parameters (three channel thicknesses, three spacers, widths, sidewall angles, underlayers) for OCD alone to resolve unambiguously. Feeding the OCD model a film thickness from XRR or a top CD from the CD-SEM as a fixed or tightly constrained parameter breaks the correlations and improves every remaining parameter. The value moves to the software platform; KLA, Nova, and Onto all sell hybrid frameworks.

**AI in yield** is in production: neural-network ADC is standard; virtual metrology predicts a wafer's CD or thickness from FDC traces without measuring it, extending sampling coverage; deep-learning models trained on OCD spectra bypass RCWA for speed; and yield-management systems (PDF Solutions Exensio, Synopsys Silicon.ai, Onto Discover, TSMC's internal systems) correlate tens of thousands of parameters per wafer against sort results to find root causes faster than a human can. TSMC has said AI-driven process control is one of its main tools for compressing the learning curve.

A **digital twin** of a step or tool, a physics-based or data-trained model that reproduces the tool's response to its inputs, lets APC be tuned offline, hot spots be predicted from layout before exposure, and inspection be targeted where risk is highest. ASML's computational lithography (Brion) is the most mature example: models of scanner, resist, and etch generate predicted CD and overlay maps checked against a few measured sites. The fab-level twin integrating all of it is where the large fabs are investing.

## 12. Metrology and Inspection for EUV

EUV introduced two problems the existing fleet could not solve.

The first is **stochastic defects**: randomly located, at parts-per-billion rates per feature, 10 to 20 nm in size. Optical inspection cannot see them reliably; single-beam EBI would need days per wafer. The response has been multi-beam EBI targeted at post-develop and post-etch inspection of EUV contact and via layers, statistical methods that bound the per-feature failure rate by inspecting tens of millions of contacts, and large-area electrical monitoring (via and contact chains in WAT) to catch what inspection misses. Stochastic defectivity is now a standard column in every EUV layer's spec, with a mature-layer target below about 10^-12 per feature.

The second is the **EUV mask**. A defect buried in the 40-bilayer Mo/Si mirror stack (a 2 nm bump on the substrate propagates up as a phase defect) can print even though the surface looks perfect, and DUV mask inspection sees the surface, not the phase. **Actinic inspection** at 13.5 nm is required to see what the scanner sees. Lasertec's ABICS inspects blanks and its ACTIS A150 (2019) and the current ACTIS A300 series inspect patterned masks actinically; Lasertec remains the only company selling such a tool, while KLA competes in EUV mask inspection with DUV optical and e-beam systems rather than actinic ones. Zeiss's AIMS EUV performs actinic review, imaging a defect with the scanner's numerical aperture and illumination so its printability can be judged before repair. Masks in production are re-inspected regularly, because a particle that lands on a mask prints on every field of every wafer.

## 13. Wafer-Level Reliability

Yield says whether a die works today; **reliability** says whether it works in ten years. Wear-out mechanisms are accelerated at the wafer level on test structures at elevated voltage and temperature and extrapolated:

- **Hot-carrier injection (HCI)**: electrons accelerated near the drain enter the gate oxide and create interface traps, shifting threshold voltage; measured by stressing at high drain voltage and tracking drift.
- **Negative-bias temperature instability (NBTI)**: a PMOS held with negative gate bias at high temperature accumulates positive charge and interface states, raising threshold voltage with a power-law time dependence (exponent about 0.15 to 0.25). The NMOS counterpart, PBTI, became significant with high-k dielectrics.
- **Time-dependent dielectric breakdown (TDDB)**: a gate oxide or inter-metal low-k under constant voltage eventually breaks down; time-to-failure is Weibull-distributed and voltage-accelerated. Low-k TDDB between minimum-pitch copper lines is the dominant BEOL reliability concern.
- **Electromigration (EM)**: current displaces metal atoms until a line voids; tested at high current density and temperature and extrapolated with Black's equation.

Each new process passes a qualification suite on these mechanisms (JEDEC JEP001 and related standards) before customers commit designs, and wafer-level reliability structures are monitored on a sampling basis in production.

## Key Numbers

| Quantity | Value |
|---|---|
| Spectroscopic ellipsometry wavelength range (production) | ~190 to 1,000 nm (extendable to ~150 nm VUV or 2,500 nm IR) |
| SE thickness repeatability on thin oxide | ~0.01 nm (3 sigma); model-limited accuracy a few 0.1 nm |
| Four-point probe sheet resistance | R_s = 4.532 × V / I (ohms/square) |
| CD-SEM landing energy | ~300 to 800 eV |
| CD-SEM measurement precision | ~0.2 nm (3 sigma) |
| CD-SEM resist shrinkage on first measurement | ~1 to 3 nm on ArF/EUV resists |
| OCD target size | ~30 × 30 to 50 × 50 µm; under a second per site |
| Overlay budget at N2/18A-class node | ~2 nm (3 sigma); metrology TMU ~0.1 to 0.2 nm |
| Bright-field inspection sensitivity | ~20 nm class (KLA 2935/2950); pixel 30 to 100 nm |
| Dark-field bare-wafer sensitivity | below ~20 nm PSL equivalent (Surfscan SP7); >100 wafers/hr |
| Multi-beam EBI | eScan 1000: 9 beams, ~6× single beam; eScan 1100: 25 beams, up to 15× |
| Pixels on a 300 mm wafer at 5 nm pixel | ~2.8 × 10^15 (~80 days at 400 MHz, single beam) |
| Scribe line width | ~60 to 80 µm |
| Process capability target | C_pk ≥ 1.33 (spec limits ≥ 4 sigma from mean) |
| Mature leading-edge D0 | ~0.1 defects/cm²; early risk production ~0.4 to 0.6 |
| Negative binomial clustering parameter | alpha ~1 to 3 (alpha → infinity recovers Poisson) |
| Poisson yield, 800 mm² die, D0 = 0.1 | ~45% (negative binomial alpha = 2: ~51%) |
| GH100 SM count vs H100 SXM enabled | 144 physical, 132 enabled (114 for PCIe) |
| H100 candidate dies per 300 mm wafer | ~60 to 63 |
| KLA share of process control market | ~55 to 56% |
| Process control share of fab equipment capex | ~10 to 15% |
| EUV stochastic failure target | below ~10^-12 per feature at maturity |

## Key Players

| Company | Country | Role / what they supply | Approx. position |
|---|---|---|---|
| KLA | USA | Bright-field (29xx), dark-field (Surfscan, Puma), review (eDR), e-beam (eSL10), overlay (Archer), film/OCD (SpectraFilm, SpectraShape), mask inspection, yield software | Leader, ~55% of process control |
| Applied Materials | USA | E-beam review (SEMVision), e-beam inspection (PROVision), CD-SEM (VeritySEM), FDC/APC software | #2 overall, leader in e-beam review |
| Hitachi High-Tech | Japan | CD-SEM (CG series), dark-field inspection, review SEM, TEM/FIB | Leader in CD-SEM |
| ASML (HMI, YieldStar) | Netherlands / Taiwan | Diffraction-based overlay (YieldStar), multi-beam e-beam inspection (eScan 1000/1100), computational lithography | Leader in DBO, pioneer in multi-beam EBI |
| Onto Innovation | USA | Film metrology, OCD (Atlas), packaging inspection, yield software | #3 in metrology |
| Nova | Israel | OCD (pioneer), integrated metrology, XPS/XRF composition | Leader in stand-alone OCD |
| Lasertec | Japan | Actinic EUV mask blank and patterned mask inspection (ABICS, ACTIS) | Near-monopoly in actinic mask inspection |
| Zeiss | Germany | AIMS EUV mask review, electron microscopy | Niche leader in mask review |
| Thermo Fisher Scientific | USA | FIB (Helios), TEM/STEM (Spectra) for calibration and failure analysis | Leader in TEM/FIB |
| Bruker / Rigaku | USA / Japan | XRR, XRF, XRD, CD-AFM | Niche leaders in X-ray metrology |
| PDF Solutions | USA | Yield management and FDC analytics (Exensio), characterization vehicles | Leader in yield software |
| Camtek | Israel | Inspection and metrology for advanced packaging | Niche leader |
| Keysight / Keithley (Tektronix) | USA | Parametric testers for WAT/PCM | Leaders in parametric test |

## Common Misconceptions

- **"Metrology and inspection are the same thing."** → Metrology measures a known parameter at a few sites with high precision; inspection sweeps the whole wafer for anything unexpected; review classifies what inspection found. Different physics, tools, and sampling plans.
- **"An ellipsometer measures thickness directly."** → It measures polarization change (Psi and Delta) and infers thickness by fitting an optical model. A wrong model gives a wrong thickness with beautiful 0.01 nm repeatability; accuracy comes from TEM calibration.
- **"Yield is a property of the node."** → D0 is a function of time and fab. A node at 0.5/cm² in risk production and at 0.1/cm² two years later have completely different economics, and D0 is only the random component; systematic and parametric losses are separate.
- **"A 45 percent yield on a GPU die means 55 percent of the wafer is thrown away."** → Harvesting (132 of 144 SMs on H100) and memory repair turn most defective dies into sellable product; effective yield for a large harvested die is often near 75 to 80 percent.
- **"Optical inspection resolves 20 nm defects."** → It detects them as perturbations of the reflected or scattered field at wavelengths ten times larger than the defect. What it can see depends on the surrounding pattern and film stack, and it cannot say what the defect is; that is the review SEM's job.
- **"Faster e-beam inspection will replace optical inspection."** → Even 25-beam tools cover a few percent of a wafer per hour; optical covers all of it in minutes. Multi-beam EBI extends sampling to defects optical cannot see; it does not replace full-wafer coverage.

## Where This Fits in the Supply Chain

Module 12 finished the physical wafer: transistors in the FEOL, contacts in the MOL, and 15 to 18 levels of copper and ruthenium interconnect in the BEOL. In reality every one of those steps was interleaved with the measurements described here: film thickness after each deposition, CD and overlay after each lithography and etch, defect inspection at 30 to 60 points along the flow, WAT at first metal and end of line, all feeding SPC charts and APC loops back to the scanners, etchers, and deposition tools. The inputs to this module are wafers in process, monitor wafers, reference standards, and a $2 billion to $3 billion fleet of tools supplied largely by KLA, Applied, Hitachi High-Tech, and ASML; the outputs are dispositioned wafers with a WAT record and a predicted yield, a database the design team uses to update SPICE models and design rules, and a D0 number that decides whether the node is profitable. Module 14 takes the finished wafer to wafer sort, where each die is contacted by a probe card and tested functionally, the harvesting and binning decisions described here are actually made, and the yield model meets the real bin map.

## Further Reading

- Chris Mack, *Fundamental Principles of Optical Lithography* (Wiley, 2007), chapters on CD metrology, overlay, and process control.
- C. H. Stapper, "Modeling of Integrated Circuit Defect Sensitivities," *IBM Journal of Research and Development*, vol. 27, no. 6, 1983 (the negative binomial yield model).
- B. T. Murphy, "Cost-Size Optima of Monolithic Integrated Circuits," *Proceedings of the IEEE*, vol. 52, 1964.
- Alain C. Diebold (ed.), *Handbook of Silicon Semiconductor Metrology* (CRC Press, 2001).
- Harry J. Levinson, *Principles of Lithography*, 4th ed. (SPIE Press, 2019), chapter on metrology and overlay.
- H. Fujiwara, *Spectroscopic Ellipsometry: Principles and Applications* (Wiley, 2007).
- Way Kuo and Taeho Kim, "An Overview of Manufacturing Yield and Reliability Modeling for Semiconductor Products," *Proceedings of the IEEE*, vol. 87, no. 8, 1999.
- KLA process control product pages (kla.com); ASML "HMI eScan 1100" and "YieldStar" product pages (asml.com).
- Tom's Hardware, "TSMC discloses N2 defect density, lower than N3 at the same stage of development," April 2025.
- IEEE International Roadmap for Devices and Systems (IRDS), "Metrology" chapter (irds.ieee.org), latest edition.
