# Survey 1: The big picture from sand to GPU

The semiconductor supply chain turns mineral feedstock, specialized materials and a circuit design into a working electronic system. Silicon must first become an exceptionally controlled crystal; factories then build electrical structures on its surface, connect and test them, and assemble useful pieces with memory and other components. The finished GPU depends on every stage as well as the machines, software and people supporting them. This opening chapter gives you a map so that the detailed processes later in the survey have a clear purpose.

> **The gist**
> - A chip is a manufactured electrical circuit whose tiny switches and wires implement useful behavior.
> - A wafer is a shared manufacturing surface; a die is an individual circuit cut from it; a package makes one or more dies usable in a larger system.
> - The chain has material, design and equipment branches that converge in fabrication and assembly.
> - Manufacturing builds repeated patterned layers through deposition, lithography, etch and other processes, with measurement throughout.
> - The latest node name is not a ruler, and a GPU count is not always the number of separate silicon dies.
> - Specialization makes the industry productive but also makes qualified alternatives difficult to establish quickly.
> - To interpret a headline, ask what is being counted, which stage it describes, and whether the figure is measured, estimated or forecast.

## 1. What a chip actually is

An electronic circuit uses electrical signals to do a job. A **transistor** controls how easily current can pass along a path. For digital computing, think of it as a switch controlled by another electrical signal rather than by a finger. Connected switches can implement **logic**: rules that turn input states into output states. The states are represented by voltage ranges, such as a low range for one state and a high range for the other. The same device family can also store information, amplify signals or control power; the switch picture is a starting point for digital logic, not a description of every transistor application.

The manufactured object is much more than an array of switches. It also contains contacts, wiring, insulating materials and structures that help deliver power and protect the circuit. A transistor produces no useful computation on its own unless the rest of the circuit can provide inputs, carry its outputs and maintain the required operating conditions.

**Silicon** is a semiconductor: its electrical behavior can be controlled through its material structure, added impurities and electric fields. That controllability makes it useful for building switches. It is neither simply a good metal conductor nor a fixed insulator. Semiconductor manufacturing engineers arrange materials so that different regions perform different electrical jobs.

A **wafer** is a thin disk used as the common surface for manufacturing many circuits. A **die** is an individual piece of circuit-bearing silicon separated from that wafer. A **package** supports and connects one or more dies so they can be used in a larger assembly. These are different objects, even though ordinary conversation often calls all of them “chips.”

A **graphics processing unit**, or **GPU**, is a processor architecture developed around highly parallel work. Modern data-center GPUs also accelerate workloads such as matrix calculations used in machine learning. They need nearby memory, power delivery, cooling and communication links. The package may contain more than one compute die while still being sold and programmed as one GPU product.

This vocabulary prevents common misunderstandings. A photograph of a large GPU package does not reveal the size of one silicon die inside it. A shipment of wafers does not mean the same number of finished processors. And a large transistor count does not tell you, by itself, how fast the entire system will run a particular program.

## 2. Several branches meet in the factory

The material branch begins with silicon-bearing minerals. Industrial chemical processes reduce and purify the material, removing unwanted contaminants. **Polysilicon** is silicon consisting of many crystal grains. The next major transformation makes a controlled single crystal, where the atomic arrangement is continuous rather than divided among those grains.

A cylindrical crystal, or **ingot**, is grown and then sliced into wafers. The wafers are processed to obtain the required geometry, surface quality and cleanliness. The starting wafer looks simple, but its crystal defects, contamination and flatness affect everything built on it later.

A separate branch creates the circuit design. Engineers specify behavior, choose an architecture and translate it into a physical arrangement of transistors and wires. Specialized design software checks both the circuit's function and whether its geometric layout obeys the intended manufacturing process. The design ultimately becomes data for the masks used in patterning.

A third branch supplies manufacturing equipment and consumables. A factory needs tools for film growth, pattern exposure, material removal, cleaning, polishing, measurement and electrical test. It also needs gases, chemicals, masks, filters, carriers and replacement parts. Many of these suppliers are essential even though their names never appear on the finished computer.

A **fab**, short for fabrication facility, is where the wafer receives its electrical structures. A **foundry** is a business that fabricates chips for other companies. A **fabless** company designs chips while contracting this manufacturing work. An **integrated device manufacturer**, or **IDM**, combines design and fabrication within one company, although it can still use outside suppliers for other parts of its products.

After fabrication, assembly and test companies help convert usable dies into finished components. System builders then integrate boards, servers and racks. The chain is not one material moving through one company; it is many coordinated streams that must arrive with compatible specifications and adequate quality.

The diagram below shows those handoffs. It is useful to follow a material forward and then follow the information backward: test results and design requirements influence choices far upstream.

<div class="widget" data-widget="chain-map"></div>

## 3. Build a circuit by repeating controlled changes

A fab does not carve an entire processor from a block in one operation. It repeatedly adds material, defines patterns, changes selected regions and measures the result. Each repetition depends on the surface left by the preceding steps, so small errors can propagate through the sequence.

**Deposition** adds a film. Depending on the process, that film may be a conductor, an insulator or a semiconductor. It must have the intended composition and thickness, and it may need to coat the inside of extremely narrow structures rather than only a flat exposed surface.

**Lithography** defines a pattern in a light-sensitive material called **photoresist**. A **mask** carries the pattern information used by the exposure system. A liquid called the **developer** dissolves selected regions of the resist after exposure, leaving openings and protected areas. Think of that remaining film as a temporary stencil for the next operation. The image in the resist is usually a tool for the next operation, not the final working transistor or wire.

**Etching** removes material from selected regions. The process must control how far it cuts, the shape of its sidewalls and which materials it preserves. **Doping** intentionally introduces suitable impurity atoms to change silicon's electrical behavior. Heating steps can alter crystal damage, chemical reactions and the electrical activity of dopants.

**Planarization** restores a sufficiently flat surface for later processing. **Cleaning** removes unwanted residues and particles. These may sound like supporting activities, but they determine whether the next precise operation starts from a usable surface. A defect introduced early can remain hidden until electrical testing much later.

The transistor-forming region and the wiring above it are related but distinct. **Front end of line**, or **FEOL**, refers to forming the active devices. **Middle of line**, or **MOL**, forms the contacts that connect those devices to the wiring. **Back end of line**, or **BEOL**, forms the multilevel interconnect network. These terms describe stages inside wafer fabrication; “back-end manufacturing” in a business article may instead mean packaging and test.

The overall pattern is an engineered loop: build, measure, compare with the allowed range, and adjust or stop when evidence shows a problem. The factory's achievement is reproducing that loop across many wafers, not merely making one exceptionally small feature once.

## 4. Why scale creates difficulty in opposite directions

Semiconductor manufacturing must control tiny structures over a comparatively large surface. A small local dimensional error can change a transistor's behavior, while an error in wafer-scale flatness or alignment can affect many dies. The challenge combines microscopic precision with industrial throughput.

**Alignment** places one patterned layer in the correct position relative to earlier ones. **Overlay** is the resulting relative placement error between layers. A hole meant to connect a wire to a contact must land where that contact actually exists. A sharp image in the wrong place can therefore be just as useless as a blurred image.

Contamination presents a similar mismatch of scales. A particle that is invisible to a person can obstruct a tiny feature. But a factory cannot simply inspect every relevant surface at arbitrary detail without consuming enormous time. It needs controlled environments, clean processes and carefully chosen measurements to reduce and detect the most consequential defects.

A **node** is a named manufacturing technology generation. Modern node names are not the measured gate length of every transistor on that process. The circuit contains several different pitches, film thicknesses and device dimensions. **Pitch** is the repeating distance between corresponding features, while **width** describes the size of one feature itself.

This matters when reading phrases such as “smaller chips.” A new node may enable more logic in a given area, better power behavior or new device shapes. Different circuit functions can benefit by different amounts. Memory cells, analog circuits and input/output interfaces do not necessarily shrink like the densest logic cells.

Large dies face another challenge: they offer more area in which a harmful defect can occur. **Yield** is the fraction that meets a defined requirement. A simple yield model can show why a larger die is less likely to be completely defect-free, but actual usable yield also depends on redundancy, repair, product specifications and the spatial pattern of defects.

**Redundancy** supplies spare resources; **binning** groups products by measured capability. These techniques can recover useful products without pretending that every manufactured structure is perfect. They are part of the architecture and economics of production, not an afterthought applied only when a factory performs badly.

## 5. Why memory and packaging belong in the same story

A powerful computing circuit needs data. **DRAM**, or dynamic random-access memory, stores working information in cells whose charge must be periodically restored. **High-bandwidth memory**, or **HBM**, assembles DRAM dies into stacks placed close to a processor, using a wide connection to deliver data rapidly.

**Bandwidth** means data transferred per unit time. It differs from **capacity**, how much data is stored, and **latency**, how long a particular request takes. Imagine a warehouse making deliveries: capacity is how much it stores, bandwidth is how much it can ship per unit time, and latency is how long a particular delivery takes. A large warehouse can still have a slow loading dock. Likewise, ample memory capacity does not keep computing circuits busy if data cannot arrive quickly enough. The analogy compares storage and delivery; data transfers are electrical signals, not physical parcels.

To connect nearby compute and memory, advanced packages use a fine-wiring intermediate structure called an **interposer**. It routes dense connections before they fan out through a larger substrate and toward the circuit board. Different technologies build that intermediate structure from silicon, redistribution layers or combinations including local silicon bridges.

**CoWoS**, TSMC's chip-on-wafer-on-substrate family, is one important implementation. The family includes different interposer constructions, so a picture or explanation of one variant does not describe them all. Its role in the chain is to assemble multiple valuable components into one tightly connected product.

Assembly creates its own yield and reliability problems. Dies must align, joints must connect, and materials must survive heating and cooling without harmful deformation. **Warpage** is unwanted bending caused by mechanical stress and temperature history. A package that becomes too curved can fail to make uniform contact even when every die inside it was electrically good.

Power and heat then connect the package to the system. Voltage regulators provide the low, controlled supply required by the silicon. Thermal interface materials, lids and cold plates transfer heat outward. A rack's computing capability is usable only when its power distribution and cooling maintain the intended operating conditions.

The apparent endpoint of “making the chip” therefore keeps moving outward. A good transistor needs good wiring; a good die needs good memory and packaging; a good package needs a suitable board and cooling system. The commercial product is the coordinated result, and a failure at any one of those boundaries can prevent useful computation.

## 6. Why no company can replace the chain overnight

Specialization lets a supplier spend years improving one difficult part of the process. That expertise can become embodied in equipment, materials, service teams and customer-specific qualification. **Qualification** means demonstrating that a component or process is suitable for the intended manufacturing and product requirements.

A substitute is not equivalent merely because it has the same broad name. Two resists, polishing slurries or etch chambers can behave differently in the customer's complete flow. Replacing one may require changing recipes, remeasuring devices and rechecking reliability. The risk is often the effect on an already-working process, not the price of the replacement item alone.

Factory economics reinforce this specialization. **Capital expenditure**, or **capex**, buys long-lived equipment and facilities. **Utilization** describes how much of the installed capability is in use. Much of a fab's expense continues when output falls, so sustained loading is important to its cost per completed wafer.

Capacity numbers must still be matched to the actual need. A company's total wafer capacity spans many processes and customers. It does not establish available capacity on the particular node a GPU uses. Packaging capacity measured in wafers per month also depends on how many packages fit on each wafer and how many survive assembly.

Prices are another potential trap. A **bill of materials**, or **BOM**, lists components; an estimated manufacturing bill may add services such as assembly and test. A product's observed selling price also reflects its market and channel. The gap between a public parts estimate and a reseller price is not a direct measurement of the designer's accounting margin.

Geography matters because suppliers, customers, trained workers and service infrastructure form clusters. Building a new fab in another country creates useful physical capacity only after equipment installation, process qualification and staffing. Policy can help fund those steps, but a building alone does not reproduce the surrounding manufacturing network.

Read industry announcements with three questions: what exact capability has changed, when does it become usable production, and which other resources must be available for it to matter? These questions connect business news to the mechanisms in this course without assuming that the newest headline number describes the whole chain.

## By the numbers

These examples are drawn from Modules 00, 20 and 21; approximate manufacturing figures depend on the product.

| Quantity | Value | What it illustrates |
|---|---|---|
| Common advanced-logic wafer diameter | 300 mm | A large shared manufacturing surface. |
| Starting wafer thickness | 775 µm | Handling requirements help determine the original thickness. |
| Leading-edge process operations | Roughly 1,000–1,500 | Many coordinated transformations precede a finished die. |
| Illustrative fab cycle time | About 3 months | Capacity changes and manufacturing decisions take time to appear in output. |
| Blackwell B200 compute | Two dies, about 208 billion transistors | A product called one GPU can contain multiple compute dies. |
| GB200 NVL72 compute | 72 GPUs and 36 Grace CPUs | The final product can be a rack-scale system. |
| Global semiconductor sales in 2025 | About $792 billion | A dated chip-revenue total, not the sum of all supplier revenues. |

## The people and companies

NVIDIA illustrates the design and system-integration role, TSMC the foundry and advanced-packaging role, and SK hynix, Samsung and Micron the major memory-manufacturing role. ASML and other equipment companies provide the tools, while wafer and materials specialists supply the controlled starting surfaces and consumables. Packaging houses and system builders complete later stages. Each name represents a larger network of specialized suppliers and engineers.

## Why it is hard

The chain must preserve controlled material properties, geometry and electrical behavior through many transformations while producing enough good units to be affordable. The requirements cross company boundaries and change with each product. A small, inexpensive missing input can stop a valuable assembly, and a tiny physical defect can invalidate months of accumulated work. The difficulty is the repeated coordination of precision, throughput, evidence and reliable handoffs.

## Go deeper

- [Module 00: The whole supply chain](#/m/00), for the full stage map and the connections between suppliers.
- [Module 20: Economics and geopolitics](#/m/20), “The Economics Toolkit,” “The Layers and Who Owns Them,” and “How to Read Industry Data.”
- [Module 21: Glossary and reference](#/m/21), “Units, Conventions, and a Sense of Scale,” “Master Process Flow,” and “Who Buys From Whom.”
