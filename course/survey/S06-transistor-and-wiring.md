# Survey 6: The transistor and its wiring

This stage turns patterned materials into controllable electrical switches and then connects those switches into useful circuits. A transistor without wiring cannot calculate anything; wiring without reliable switches cannot represent a dependable instruction or bit. Modern manufacturing must solve both problems on the same wafer, while the choices that improve one can make the other harder. This chapter follows the changing shape of the transistor and then climbs the metal stack that carries its signals and power.

> **The gist**
> - A transistor lets a voltage control a conducting path through silicon.
> - Shrinking that path makes the gate's control harder, which drove the transition from flat transistors to fins and then surrounding gates.
> - Node names describe technology generations, not one literal dimension inside the device.
> - High-k insulation gives strong electrical control without requiring an equally thin physical barrier.
> - Metal contacts connect devices to a multilevel wiring network; narrow wires add resistance, delay and reliability problems.
> - Backside power delivery separates some power wiring from signal wiring, exchanging routing freedom for more manufacturing complexity.

## 1. A switch built from an electric field

Think of a transistor as an electrically operated valve. The useful feature is that its control terminal does not need to carry the same current as the path it controls. A small change in control voltage can change whether a much larger conducting path is available. The analogy has limits: electrons are not water, and the device never becomes an absolutely perfect open or closed valve. But it explains why arranging many switches can make amplifiers, memory and digital logic.

The common logic device is a **metal–oxide–semiconductor field-effect transistor**, usually shortened to **MOSFET**. Its **source** and **drain** are the terminals at the ends of the current path. The **channel** is the region between them. A **gate**, separated from the channel by an insulating layer, changes the channel's electrical state through an electric field. The insulator helps prevent gate current from simply leaking into the channel. It still permits an electric field to act across it, just as the plates of a capacitor influence each other without being electrically joined.

A programmer is used to a clean distinction between true and false. The transistor supplies a physical approximation to that distinction. A useful switch must pass enough current when selected to charge the next circuit quickly, and little enough current when deselected to avoid wasting power or corrupting the signal. Its **threshold voltage** is a conventional marker of where strong conduction begins. It is not an infinitely sharp boundary: below threshold the current fades gradually, and this residual current is **leakage**.

**Complementary MOS**, or **CMOS**, combines transistor types that respond oppositely to the control voltage. One type is good at pulling an output toward the positive supply; the other is good at pulling it toward ground. A simple inverter uses this opposition to turn a high input into a low output and vice versa. Larger arrangements implement the logic operations that software ultimately relies on.

CMOS reduces steady-state current in ordinary logic, but switching still takes energy. Every connected wire and transistor has capacitance: it stores charge that must be moved when a signal changes. Faster operation means doing that work more often. Lowering voltage helps reduce switching energy, yet it also leaves less margin for leakage, noise and slow devices. Manufacturing improvements therefore become circuit design tradeoffs rather than an automatic promise of faster code.

## 2. Why flat transistors became fins

In an older **planar transistor**, the channel lies near a flat silicon surface and the gate controls it mainly from above. Shrink the distance between source and drain far enough, and those terminals begin to influence the channel almost as strongly as the gate does. The switch then has trouble staying off. These unwanted influences are called **short-channel effects**: the intended control electrode is losing authority over the conducting region.

Imagine trying to control the temperature of a room from one wall while powerful heaters act at both ends. Making the room shorter gives the heaters more influence over its interior. In the transistor the competing effect is electrical, not thermal, but the remedy has a similar shape: bring the control surface closer to more of the region that matters.

A **FinFET** raises a thin ridge of silicon above its surroundings and wraps the gate over its top and both sides. Current travels along the ridge between source and drain. The gate now controls the channel from several directions, improving its ability to suppress unwanted conduction. The fin's thinness matters for this control; its height supplies conducting surface without taking the same amount of horizontal space.

This geometry changes how a designer chooses transistor strength. In planar designs, width could be adjusted relatively continuously. With fins, adding another fin provides a larger unit of drive. Manufacturing determines a menu of legal fin arrangements, and circuit designers build from that menu. A drawing that seems ideal electrically may be impossible to place beside a neighboring cell without violating the manufacturing rules.

FinFETs also show why a process-node name cannot serve as a ruler. The gate length, distance between neighboring gates, fin width, fin height and wiring pitch are different quantities. **Pitch** means the repeated distance from one corresponding feature to the next. A smaller node can improve some of these dimensions, retain others, and change the allowed circuit layouts at the same time.

The interactive view below is useful if you follow the current path and the gate separately. Ask which silicon surfaces the gate can influence and which dimensions are being made smaller. That is more informative than treating each architecture as simply a more complicated sculpture.

<div class="widget" data-widget="transistor-evolution"></div>

## 3. Surrounding the channel without losing the circuit

A **gate-all-around transistor**, or **GAA transistor**, extends this idea by surrounding the channel more completely. In a **nanosheet** implementation, thin horizontal silicon sheets provide the current paths, with gate material around each sheet. Stacking sheets supplies useful conducting perimeter while keeping each channel thin enough for strong electrostatic control. Designers can also choose sheet widths within the process's rules, offering flexibility that fin-count increments do not provide.

Building the surrounding gate is harder than drawing it. The manufacturer first grows an alternating stack of silicon and silicon-germanium layers. Later, selective removal takes away the sacrificial silicon-germanium while preserving the silicon channels. The surviving sheets must remain intact, and the tiny spaces around them must receive continuous insulating and gate-metal films. A process that attacks the wrong layer, leaves residue, or fills a gap unevenly changes how that transistor switches.

This is where earlier survey chapters connect directly to device physics. Deposition must control films on hidden surfaces. Etch must distinguish chemically similar materials. Measurement must infer shapes that an ordinary top-down image cannot reveal. A working transistor is the accumulated result of all those controls, not merely a successful lithography exposure.

The gate insulator creates another important compromise. Electrically, engineers want the gate very close to the channel; physically, an excessively thin barrier allows electrons to leak through. A **high-k dielectric** is an insulator with a greater ability to support electric-field coupling than silicon dioxide. It can provide strong gate control at a larger physical thickness. Here **k** refers to the material's dielectric constant, a measure of its electrical response.

**Equivalent oxide thickness**, or **EOT**, describes the thickness of silicon dioxide that would provide the same electrical capacitance. It is an electrical comparison, not a microscope measurement of the actual film. The distinction matters because saying “the oxide is this thin” can otherwise confuse electrical behavior with physical geometry.

Even a better gate does not remove all limits. Source and drain contacts consume space, neighboring circuits need isolation, and local wires need room to escape. **Design–technology co-optimization** means adjusting the manufacturing rules and circuit layout together. It helps explain why modern progress includes new ways to arrange cells and supply power as well as smaller individual features.

## 4. Making wiring inside an insulating stack

Once the transistors exist, they need connections. **Contacts** join the device terminals to the first wiring levels. Above them, **metal layers** carry signals sideways, and **vias** are vertical connections between layers. The collection is the **back end of line**, or **BEOL**. This is still wafer fabrication; it should not be confused with the later business of packaging and testing, also sometimes called the back end.

Picture a city with local streets, larger roads and elevated routes. Lower metal levels serve nearby devices and need tight spacing. Upper levels can use wider, thicker conductors for longer journeys and substantial power distribution. The analogy helps explain why there is no single wire width for a chip. The dimensions depend on the job of the particular level.

Copper became valuable because it carries current with relatively low electrical resistance. But it is inconvenient to shape using the same straightforward subtractive approach used for some earlier metal wiring. In **damascene processing**, manufacturers instead pattern recesses in an insulator, fill those recesses with metal, and polish away the excess from the top. The finished wire sits inside a mold made from dielectric material.

**Dual damascene** combines the trench for a wire and the opening for its via before the shared metal fill. The resulting network still requires barriers and liners around the copper. These films prevent unwanted diffusion and help the metal adhere and fill correctly. Their usefulness carries a cost: they occupy space that could otherwise contain a better conductor.

The polishing step, **chemical mechanical planarization**, makes the surface flat enough for subsequent layers. Leaving excess metal can short neighboring wires; removing too much can hollow out a line or thin the dielectric. The next lithography step also depends on this surface remaining within its focus and shape tolerances.

Insulation between neighboring wires has its own optimization. A **low-k dielectric** reduces unwanted capacitive coupling compared with a more strongly polarizable material. That can lower delay and switching energy, but very porous low-k films can be mechanically fragile. A material that looks ideal in an electrical model must survive etching, cleaning, polishing, assembly and years of temperature changes.

## 5. The wire can become the slow part

A switch does not produce a useful result until its output reaches the next switch. A long, narrow wire resists current and carries capacitance, so charging it takes time. Shrinking transistors while leaving a long physical communication path does not automatically make that path faster. Designers therefore spend considerable effort placing related logic close together and buffering long routes.

**Resistance** is opposition to current flow. As a metal line becomes narrower, its conducting cross-section falls. At very small dimensions there is an additional penalty: electrons scatter more from surfaces and grain boundaries, making the effective material resistivity worse than the bulk handbook value. **Resistivity** describes the conductor material's resistance after geometry has been factored out. Confusing it with resistance hides why the scaling penalty can exceed a simple geometric estimate.

Barriers compound the problem. A coating that occupies a modest fraction of a large line can consume a substantial fraction of a much smaller one. This is why alternatives such as ruthenium are investigated even though their bulk conductivity is worse than copper's. The useful comparison is the complete manufactured wire, including its interfaces and usable cross-section, at the intended dimensions.

Current also moves atoms over time. **Electromigration** is material transport driven by electrical current, which can form voids or unwanted accumulations and eventually break or short a connection. Temperature, current density, interfaces and mechanical stress all influence the outcome. Engineers qualify specific structures and operating limits; a short ideal line can suppress sustained transport through stress buildup, but that is not a lifetime guarantee for every real wiring network.

Manufacturing defects add another class of risk. A partially filled via may work at initial test but carry current through an unexpectedly small area. A weak interface may degrade under heating. A path can therefore meet its initial resistance target yet fail its reliability requirement. Test structures and accelerated stress measurements help distinguish “conducts now” from “will remain dependable.”

For software, this physical story appears indirectly as limits on frequency, power, memory access and communication. The chip's advertised transistor count says little about how efficiently those transistors can exchange information across its actual wiring.

## 6. Supplying power from another side

Signals carry information, while power wiring supplies the energy that lets the transistors operate. Both compete for routing space. A large accelerator can require enormous current at a low core voltage, so even a small resistance in the power path consumes precious voltage margin and produces heat.

**Voltage droop** is a temporary or sustained fall below the intended supply voltage. It can slow a circuit enough to violate its timing requirement even when the circuit is otherwise correctly manufactured. Designers add power conductors, local energy storage and voltage margin to manage it. Those remedies consume area or energy of their own.

**Backside power delivery** places part of the power network on the side of the silicon opposite the main signal stack. Separating these functions can free front-side routing space and shorten some power paths. It is an architectural change to manufacturing, not simply a different cable attached to the finished package.

The wafer must be supported and thinned, and electrical connections must reach the intended device regions accurately. These operations create new alignment, thermal and inspection challenges. Different manufacturers implement the contacts differently, so a benefit demonstrated on one test vehicle is not automatically the measured benefit of every production chip using backside power.

The larger lesson is that transistor shape, local contacts, metal routing and power delivery form one coupled design problem. Improving only the central switch eventually shifts the limitation elsewhere. A useful process generation improves the whole circuit that can be manufactured, powered and connected reliably.

## By the numbers

These are selected examples from Modules 11 and 12, not a universal process specification.

| Quantity | Value | What to remember |
|---|---|---|
| Ideal conventional subthreshold swing at 300 K | 59.6 mV per decade | Switching is not infinitely abrupt. |
| Representative nanosheet thickness | 5–7 nm | Thin channels improve gate control. |
| Example gate stack | 1.8 nm HfO₂ plus 0.6 nm interfacial oxide | Its electrical EOT is about 0.95 nm, different from physical thickness. |
| Copper bulk resistivity | 1.68 µΩ·cm | Tiny manufactured wires can have much higher effective resistivity. |
| Leading logic metal stack | About 14–15 levels, with taller product options | Different levels have different wiring jobs. |
| Intel PowerVia test-chip result | About 6% frequency benefit | A specific demonstration, not a guarantee for every design. |

## The people and companies

TSMC, Intel and Samsung integrate the transistor and wiring processes into complete manufacturing technologies. Equipment and materials suppliers provide the deposition, etch, polishing and measurement capabilities those flows need. Circuit designers and electronic-design-automation companies translate process rules into libraries and layouts. The finished result depends on the coordination between those groups, including detailed information that is not public.

## Why it is hard

An improvement must survive the entire flow. A thinner channel needs a dependable release process; a better conductor needs compatible barriers and patterning; a denser layout needs workable contacts; a new power route needs reliable thinning and alignment. Each change affects variability, defect sensitivity, heat and cost. The challenge is producing the intended circuit repeatedly across the wafer and over time, rather than demonstrating one impressive transistor.

## Go deeper

- [Module 11: Transistor architectures](#/m/11), especially “MOSFET Operation Refresher,” “FinFET,” and “Gate-All-Around Nanosheets.”
- [Module 11: Design and technology together](#/m/11), “Node Timeline, SRAM, and Design Co-Optimization.”
- [Module 12: Interconnect](#/m/12), “The Dual Damascene Flow, Step by Step,” “Electromigration,” and “Backside Power Delivery.”
