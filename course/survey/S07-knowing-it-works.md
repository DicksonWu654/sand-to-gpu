# Survey 7: Knowing it works

This stage turns a wafer full of possibilities into evidence about which devices are usable, which processes are drifting, and which finished products can be shipped. Measurement happens throughout fabrication, electrical tests begin before packaging, and further tests follow assembly. These activities overlap deliberately because each sees a different part of the problem. The objective is to learn early enough to protect the next step while making the final product dependable at an affordable testing cost.

> **The gist**
> - Metrology measures a known property; inspection searches for unexpected defects; electrical test checks behavior.
> - A precise measurement can still be wrong if its calibration or interpretation is wrong.
> - Yield is the fraction that meets a specified requirement, so always ask which stage and which product definition it describes.
> - Large dies expose more area to defects, but redundancy and product binning can recover useful parts.
> - Wafer sort avoids spending packaging money on unusable dies, without guaranteeing every future operating condition.
> - Final test, burn-in and system-level test address different failure modes; passing one is not a substitute for the others.

## 1. Measure before the mistake becomes expensive

A completed transistor is the result of many earlier operations. If an etch begins making features too narrow, waiting for the finished chip to fail would leave a large amount of work at risk. The fab therefore measures intermediate structures and uses the results to decide whether the process is still behaving as intended.

**Metrology** means measurement. The manufacturer already knows what property it wants: a film's thickness, the width of a line, or the alignment of one layer with another. **Inspection** asks a different question: is there something unexpected on this surface? It may find a particle, a missing feature, an extra bridge of material or a repeating pattern error. **Electrical test** then asks whether a structure conducts, switches, stores information or meets another behavioral requirement.

These methods complement each other. A perfectly measured line width does not prove that a hidden contact is connected. An electrical failure does not immediately reveal which manufacturing step caused it. A defect image may show something visually unusual that has no effect on the product. Engineers combine measurements rather than treating any single instrument as a universal judge.

Many measurements are indirect. **Ellipsometry**, for example, examines how a film changes reflected light's polarization, the direction and form of the light's electric-field oscillation. Software compares the response with an optical model to infer thickness and material properties. The instrument can repeat its result extremely closely even when the model uses the wrong material assumptions.

That is the difference between **precision**, repeatability of a result, and **accuracy**, closeness to the correct value. A bathroom scale that always reads high is precise without being accurate. In a fab, the mismatch can come from model assumptions, calibration, target geometry or changes induced by the measurement itself.

The practical question is therefore not just how many decimal places the instrument displays. It is whether its uncertainty is small enough for the decision being made and whether it measures the same thing the process engineer cares about. Reference measurements, calibration structures and comparison between methods make the result trustworthy.

## 2. Why a fab cannot examine everything equally

Small defects are difficult to find over a large surface. Optical inspection can survey substantial areas rapidly, but the smallest features demand other methods. Electron-beam instruments use electrons rather than visible light to inspect finer structures, with a major tradeoff in the time needed to collect a detailed image.

Imagine scanning a map first for whole missing roads and then for individual cracks in the pavement. The second task needs much finer sampling and much more data. The same logic applies to a wafer. A high-resolution image of a tiny region is not evidence that the entire surface has been examined at that resolution.

**Sampling** means choosing a subset of wafers, locations or process stages to inspect. Good sampling follows the risk: known weak steps, recently maintained tools, suspicious patterns and new process ramps deserve extra attention. The goal is to catch a harmful shift quickly enough to prevent a large excursion, while keeping inspection from overwhelming manufacturing time.

An **excursion** is a departure from the intended manufacturing condition that may affect multiple wafers or lots. A **lot** is a tracked group of wafers moving through production. If a chamber begins adding particles, inspection results and the processing history can identify which lots passed through it and which should be held for investigation.

**Statistical process control** separates normal variation from evidence that a process has changed. A control limit is not automatically the same as a product specification. A process can still make acceptable structures while drifting toward trouble; conversely, a stable but badly centered process may repeatedly violate the specification. Engineers need to understand both the behavior of the process and the requirements of the product.

Wafer maps are especially useful because failure patterns contain clues. A ring near the edge suggests a different mechanism from a scratch or a repeating feature at the same place in every exposure. The pattern is a lead, not proof. Confirmation comes from reviewing defects, comparing tool histories and testing a physical explanation.

Measurements therefore feed back into manufacturing. They are not merely labels attached to finished wafers. A valuable control system can stop the next bad wafer, identify the affected inventory and show whether a corrective action actually restored the process.

## 3. Yield connects physics to economics

**Yield** is the fraction of units that satisfy a defined requirement. The definition must include the stage: a wafer can pass an early process check while some of its dies fail electrical sort; a die can pass sort and later fail after packaging. Product requirements matter too. A device that cannot meet the fastest speed grade may still be useful in another product bin.

For a first intuition about area, imagine random defects falling on the wafer like sparse raindrops. A larger die offers a larger target. If one harmful defect is enough to reject a die and defects are independent and uniformly distributed, its chance of being perfect falls exponentially with area. This simplified model is called **Poisson yield**.

The model gives a useful comparison, but its assumptions are part of the result. Real defects can cluster. Different features are sensitive to different defect sizes. Some regions are redundant; others are essential. A measured particle density on a bare wafer is not automatically the effective killer-defect density needed by a die-yield calculation.

The interactive calculator below lets you vary the area and defect density. Keep track of the units and ask what the selected model assumes about defect placement. A smooth curve is a prediction under those assumptions, not a disclosure of a foundry's actual production yield.

<div class="widget" data-widget="yield-calculator"></div>

A chip can also be designed to tolerate imperfections. **Redundancy** provides spare resources that replace failed ones. A memory may contain spare rows or columns. A large processor may enable fewer execution blocks than are physically present. **Harvesting** means recovering a usable product from a die with some unavailable resources. The test result tells the manufacturer which resources can safely be enabled.

**Binning** groups functioning parts according to measured capabilities such as speed, power or available compute resources. It does not mean all differences are caused by defects. Normal manufacturing variation can make one otherwise correct die faster or leakier than another. A bin must still meet the specification of the product sold under that name.

These ideas explain why “perfect-die yield” and “sellable-die yield” are different. Harvesting can improve the latter without removing the original defects. It also cannot rescue a broken resource that the product fundamentally needs, so the location and consequences of a defect remain important.

## 4. Touch the wafer and ask electrical questions

**Wafer sort** tests individual dies while they are still part of the wafer. A **prober** positions the wafer, and a **probe card** makes temporary contact between its pads or bumps and the test equipment. The contact must conduct reliably while avoiding damage that would make later assembly difficult.

The electrical instrument is **automatic test equipment**, or **ATE**. It applies signals and supply conditions and compares measured responses with the test program's expectations. The wafer map records which dies pass, their assigned bins and any configuration information needed later. Packaging can then select suitable dies instead of spending further materials and assembly time on obvious failures.

Testing a modern chip solely by running ordinary software would miss too many internal conditions. **Design for test**, or **DFT**, adds structures that make the circuit easier to control and observe. A **scan chain** connects internal storage elements into a path that allows a tester to load a state and read back a response. **Built-in self-test**, or **BIST**, puts some pattern generation and checking inside the device itself.

A test pattern targets a **fault model**, a simplified description of how something might be wrong. One model might assume a signal is permanently stuck high or low; another might look for a path that switches too slowly. Coverage tells you how thoroughly a test addresses that model. It is not a percentage of every conceivable real-world failure mechanism.

Temperature makes testing more complicated. The wafer and probe card change shape as they heat, and the device's behavior changes too. Alignment and contact conditions must remain suitable, while the program checks the conditions relevant to the product. A die that works under one comfortable operating point may fail at the hot, cold, fast or low-voltage edge of its specification.

Testing also consumes capacity. Running many devices in parallel can reduce cost, but the number of parallel sites depends on the tester's resources, power delivery, thermal control and contact geometry. A small low-power chip and a large accelerator cannot be assigned the same cost simply because they use an instrument from the same vendor.

## 5. A good bare die is not a finished product

A **known-good die**, often abbreviated **KGD**, has passed a specified test flow before assembly. The phrase describes the confidence supplied by that flow; it does not mean that the die has been proven immune to every failure. This distinction becomes crucial when several valuable dies share one difficult-to-rework package.

Assembly creates new failure opportunities. Heating and cooling can stress joints. A connection may be missing or resistive. An insulating material may separate from its neighbor. The package may introduce a supply problem that was absent during wafer probing. It also brings interfaces into existence that the bare die could not previously exercise, such as connections to nearby memory stacks.

**Final test** checks the packaged component. It can exercise package connections, run relevant functional and structural tests, and measure performance under a more representative electrical and thermal arrangement. A physical handler moves the parts, a socket provides temporary contact, and thermal control keeps the device at the intended test condition.

**Burn-in** operates devices under selected stress conditions to expose certain early failures before shipment. It is not a magical guarantee of long life. Stress accelerates particular physical mechanisms, and a valid interpretation requires that those mechanisms relate to the failures of concern in normal use. Excessive or inappropriate stress can create damage that customers would never experience.

**System-level test**, or **SLT**, operates the device in an environment closer to its intended product. Booting, memory training and realistic interactions can reveal problems that a structural test does not target. It trades some diagnostic precision and throughput for a broader view of the assembled system's behavior.

The sequence can include testing before and after stress. Comparing a device with its own earlier measurements can reveal suspicious changes that still fit within a broad absolute limit. This is another reason traceability matters: a result becomes more useful when it can be matched with that particular unit's earlier history.

## 6. Decide what evidence is enough

Testing is an economic decision grounded in physics. More coverage takes time, equipment, energy and sometimes device lifetime. Too little coverage allows expensive escapes. The right balance depends on the product and on what happens if a failure reaches a customer.

The expected loss from an escape depends both on its probability and on what it damages or idles. A weak memory stack placed in an expensive accelerator package puts the neighboring good components and assembly work at risk. A failed accelerator in a tightly coupled computing job can waste more than the cost of replacing that accelerator. This makes early screening and intermediate test valuable even when the test itself is expensive.

**Defective parts per million**, or **DPPM**, expresses outgoing defective units as a fraction of shipments. It describes shipped quality under a definition of defect and a measurement method. **Reliability** asks how failure probability develops during use over time. A low outgoing defect figure does not automatically establish a low long-term failure rate.

A reliability qualification tests samples under specified conditions. Passing a sample supplies evidence and a statistical bound, not proof that no unit can fail. Extrapolating from an accelerated test also requires a defensible physical model. The **Arrhenius model** describes temperature acceleration for selected thermally activated mechanisms; its activation energy depends on the mechanism and materials.

When a field failure occurs, **failure analysis** connects symptoms back to a physical cause. Electrical localization, imaging, sectioning and material analysis can identify the weak structure. The result may change the design, process, assembly or test program. It may also show that an earlier apparent correlation was misleading.

The complete system is therefore a learning loop. Measurements prevent some defects, tests reject others, and field evidence improves the assumptions behind both. A product can become more dependable as the manufacturer learns, even when the visible product name and its basic manufacturing node stay the same.

## By the numbers

The calculations below retain the assumptions of Modules 13, 14 and 18.

| Quantity | Value | What it illustrates |
|---|---|---|
| Example GPU die area | 800 mm² | Large area is exposed to more potential killer defects. |
| Example effective defect density | 0.1 per cm² | An illustrative model input, not a disclosed foundry yield. |
| Perfect-die yield for that example | About 45% Poisson; about 51% negative binomial at α = 2 | Clustering assumptions change the prediction. |
| GH100 resources versus H100 SXM | 144 physical SMs; 132 enabled | Spare compute blocks support harvesting. |
| Fine e-beam sampling example | About 2.8 × 10¹⁵ pixels over a 300 mm wafer at 5 nm pixels | Resolution carries a severe coverage-time cost. |
| Thermal acceleration example | About 78× at 125 °C versus 55 °C, activation energy 0.7 eV | Applies to the assumed mechanism, not all failures. |

## The people and companies

KLA, ASML and other measurement suppliers help fabs observe and control their processes. Advantest and Teradyne supply major test platforms, while probe-card, handler and socket specialists make physical contact and thermal control possible. Foundries, memory manufacturers and outsourced test companies run the flows; the product owner defines the acceptable behavior and uses the collected evidence to improve the product.

## Why it is hard

The thing being tested is changing at every stage. Some structures are hidden, some interfaces do not exist until assembly, and some failures appear only under particular temperature or workload combinations. Instruments have uncertainty, test models have blind spots, and the most detailed methods take time. Engineers must combine incomplete evidence into decisions whose cost grows as the product moves downstream.

## Go deeper

- [Module 13: Metrology, inspection and yield](#/m/13), especially “Film Metrology,” “Reading a Wafer Map,” and “Yield Theory.”
- [Module 14: Wafer sort and test](#/m/14), “Design for Test,” “Coverage, Escapes, and DPPM,” and “Known-Good-Die.”
- [Module 18: Final test and reliability](#/m/18), “Burn-in: Physics and Practice,” “System-Level Test,” and “Failure Analysis.”
