# Survey 10: Becoming a GPU, a rack and an industry

The final stage turns a circuit design and a collection of manufactured components into a computing system that a customer can run. An accelerator must progress from logic description to layout, masks, wafers, tested packages, boards and a powered, cooled rack. That sequence connects the physics of the earlier chapters to software, business decisions and factory capacity. The useful product is not merely a large piece of silicon: it is a dependable system whose computing, memory, communication and operating environment work together.

> **The gist**
> - Chip design translates intended behavior into a physical circuit that must obey manufacturing and timing rules.
> - Verification before manufacturing protects against mistakes that would require expensive new masks and a long rebuild.
> - NVIDIA designs GPUs and systems while foundries, memory makers, packaging companies and system builders manufacture different parts.
> - A GPU package still needs a board, power conversion, cooling and communication before it becomes useful computing infrastructure.
> - Within-rack and between-rack communication solve different distance and bandwidth problems.
> - Capacity is constrained by the specific qualified resources a product needs; neither company-wide wafer totals nor component cost shares identify every bottleneck.

## 1. Turn behavior into a manufacturable circuit

A chip begins with requirements: what operations it must perform, how much memory and communication it needs, how fast it should run, and how much power it can consume. The design team chooses an **architecture**, the arrangement and capabilities of the major computing blocks. That choice must support the intended workloads rather than simply maximize the number of arithmetic units.

An **RTL description**, short for register-transfer level, specifies digital behavior in terms of stored state and the operations between state updates. It resembles programming, but it describes hardware that operates concurrently. Picture several small circuits working at the same time, each using stored inputs to calculate what should be stored next. An RTL statement specifies part of that behavior; it is not necessarily the next instruction for one processor to execute. Assigning a computation to a circuit means providing gates, storage, connections and timing conditions that can implement it physically.

**Synthesis** translates the description into a network of logic cells. A **standard-cell library** supplies precharacterized building blocks with known functions and electrical behavior for a manufacturing process. A **netlist** describes which cell terminals connect to which others. It is a connection description, not yet the complete geometric arrangement that will be fabricated.

**Physical design** places those cells and routes their connections. It must account for wire delay, clock distribution, power delivery, congestion and legal manufacturing geometry. A design can be logically correct but too slow because a critical signal travels too far or must drive too much capacitance.

The **clock** coordinates when storage elements accept new values. Between updates, signals travel through logic and wiring to prepare those values. They must settle before the next required update, including margins for variation and uncertainty; otherwise a storage element can capture the wrong result even when the logic itself is correct. **Timing closure** is the process of finding a physical implementation that meets those timing requirements. Moving a block, changing a cell or inserting a buffer may solve one path while worsening another or increasing power.

A **process design kit**, or **PDK**, describes the foundry's process rules and models that design tools use. A design made for one process cannot generally be moved to another by changing a label. Its cells, wiring rules, electrical models and qualification depend on the intended manufacturing technology. This relationship is why foundry choice is an architectural and schedule decision as well as a purchasing decision.

## 2. Find mistakes before they become silicon

A logic bug is different from a manufacturing defect. A perfectly fabricated circuit can execute the wrong function if its design is wrong. **Verification** checks the intended behavior before committing to manufacturing. It uses simulation, mathematical checks, specialized test environments and hardware-based methods to explore how the design responds.

A **simulation** computes the behavior of a model in software. It can offer detailed visibility but may run far more slowly than the eventual chip. **Emulation** maps the design onto specialized hardware so that longer sequences, including substantial software activity, can be exercised faster. Neither method eliminates the need to choose meaningful tests and understand what the model omits.

Large chips also require checks on the physical implementation. **Design-rule checking**, or **DRC**, finds geometry that violates manufacturing rules. **Layout-versus-schematic checking**, or **LVS**, checks whether the extracted connections match the intended circuit. These answer different questions from whether a program produces the right result or whether a signal meets its timing requirement.

When the design is ready, **tape-out** releases the final manufacturing data for mask preparation. The historical name remains even though the transfer is digital. The masks encode patterns for the process layers, with corrections that help the lithography system produce the intended shapes on the wafer.

Manufacturing then introduces a long delay before the design team sees the result. **First-silicon bring-up** tests whether the new chip powers on, communicates and behaves as intended. The team compares measurements with simulation and validates its operating limits. Problems may come from the design, process assumptions, package, firmware or test setup.

A **respin** is a revised manufacturing version used to correct a problem. Some changes affect only selected metal layers; others require deeper redesign. The cost includes masks, engineering work and delayed product availability. Early verification is valuable because it addresses mistakes before they consume that calendar time, not because all later faults can be prevented through sufficiently long simulation.

The development process is a loop between abstraction and physical evidence. Requirements shape architecture; architecture shapes layout; layout exposes constraints; fabricated silicon tests the assumptions behind all of them.

## 3. Follow one product through several companies

A **fabless** company designs semiconductor products while contracting wafer fabrication to a foundry. NVIDIA uses this model for its GPUs. A **foundry** manufactures chips from customer designs using its qualified processes. Memory makers produce the DRAM dies and HBM stacks, and advanced packaging combines the required pieces.

This division does not mean the design company hands over a drawing and waits passively. Design rules, package layout, test access, power, thermal limits and yield expectations require extensive coordination. A design that is difficult to package or test can waste the advantages of an otherwise impressive compute die.

The manufacturing sequence includes wafer processing, wafer test, assembly, package test and board integration. Each stage has a **cycle time**, the elapsed time from entering to leaving that stage. A customer's **lead time** also includes waiting for capacity, materials and allocation. A long quoted delivery time is therefore not the same as the time a particular wafer spends undergoing chemical and physical processing.

The sequence is partly parallel. Compute wafers, memory, substrates and cooling hardware can be made simultaneously, but they must arrive as qualified compatible components when assembly needs them. A missing substrate can hold up completed dies. A shortage of tested memory stacks can leave packaging capacity without the right inputs.

**Traceability** preserves the identity and history of parts through these handoffs. It connects a failing module to its package, dies, lots and test records. Without that information, a symptom discovered in a customer's rack would be much harder to connect to a particular manufacturing or assembly issue.

The system also needs a plan for imperfect results. Yield, speed bins and repair maps affect the usable output at each stage. Public calculations can illustrate these effects, but manufacturers generally do not disclose product-specific defect maps, realized wafer yield or individual supplier invoices. A useful supply-chain estimate states its assumptions and avoids turning an illustrative output into a claimed production measurement.

This is the practical meaning of an industrial ecosystem: many companies coordinate specialized resources around a design whose requirements cross all of their boundaries.

## 4. A package becomes a board, a server and a rack

A tested GPU package still needs electrical power conversion, mechanical mounting and external connections. A **module** combines the package with supporting board-level components. A **voltage regulator** converts an available supply into the low, carefully controlled voltage the silicon requires. Keeping that regulator close helps limit resistance and rapid voltage disturbances.

Several modules can share a **baseboard**, a circuit board that provides their main local connections and supporting components. A server adds host processors, networking, storage, management and a mechanical enclosure. The details differ between products, so the number on a GPU datasheet should not be treated as the power, price or memory capacity of the complete server.

Large systems use direct liquid cooling because dense computing equipment must transfer substantial heat out of a small volume. A **cold plate** places liquid passages near the heat-producing component. A **coolant distribution unit**, or **CDU**, manages the interface between the equipment's cooling loop and the facility's cooling infrastructure.

Heat still crosses multiple interfaces before reaching the liquid. The silicon, thermal interface material, lid or other package structures, and cold plate all contribute resistance to heat flow. A powerful pump cannot compensate for every poor contact inside that path. Surface flatness, clamping and material condition remain important.

The rack adds another scale of integration. Compute trays, switching hardware, power shelves, cables and manifolds must fit and remain serviceable. A problem that looks small at the component level can become expensive when technicians must drain a loop, disconnect dense wiring or stop a shared workload to reach it.

The rack explorer below connects component counts with the whole assembly. Follow the power and cooling requirements alongside the compute blocks. A rack is a physical machine with installation and operating constraints, not just the sum of the advertised performance of its GPUs.

<div class="widget" data-widget="rack-explorer"></div>

**Power usage effectiveness**, or **PUE**, compares a facility's total power use with the power delivered to its computing equipment. It helps distinguish an IT power budget from the larger site demand that includes cooling and distribution overhead. Mixing those boundaries can make a data-center capacity calculation look better than the actual electrical connection permits.

## 5. Communication determines how much the system can cooperate

Many useful workloads need processors to exchange data. More arithmetic capacity helps only if the required communication can keep up. At the system level this becomes a balance between compute, local memory, inter-GPU links and the network connecting servers or racks.

**NVLink** is NVIDIA's family of high-speed interconnects between compatible processors and associated switching systems. **NVSwitch** provides switching within those fabrics. A linked group of GPUs can cooperate closely, but describing that group as acting like one large GPU is an architectural shorthand; software, memory placement and communication costs still matter.

**Scale-up** commonly refers to tightly connecting devices so they can cooperate within one larger local computing system. **Scale-out** connects multiple such systems through a wider network. A useful picture is workers sharing equipment in one workshop versus several workshops sending jobs and materials between them. In either case cooperation costs time; the analogy does not mean that every local connection has the same speed or that distant systems cannot cooperate closely. The terms describe how the system grows, and the precise boundary depends on the product. A rack-level NVLink domain and a data-center network are different structures with different responsibilities.

Copper wiring is attractive over suitable short distances because it can avoid optical conversion and its associated cost and power. As distance and signaling demands increase, loss and signal quality make the electrical path harder. **Optical links** convert information into light for transmission, then back into electrical signals at the destination.

Neither medium is universally superior. The right choice depends on reach, bandwidth, packaging, energy, cost and serviceability. A dense rack full of short passive cables solves one problem while creating another in cable routing and maintenance. Optical networking improves reach but needs lasers, optical components and conversion electronics.

Bandwidth figures also require careful reading. A value may describe one direction, both directions combined, one GPU's interfaces or a sum across the whole fabric. Those totals are not interchangeable with the rate a particular application sustains. Traffic patterns, contention, software and the operation being performed all affect useful performance.

This brings the course back to programming. A workload that reuses data locally can make better use of its arithmetic hardware than one that continually waits for distant data. Manufacturing gives the system its physical capabilities; architecture and software decide how effectively those capabilities are used.

## 6. Read the industry through constraints and accounting

A chip company's revenue, a foundry's wafer output and a packaging line's throughput describe different things. **Capacity** is the available production capability under stated conditions. **Utilization** is how much of it is being used. **Allocation** is which customer or product can access it. Total company capacity does not reveal the available capacity on a particular advanced node or assembly flow.

This matters when identifying a bottleneck. A relatively inexpensive material or tool can halt an expensive product if no qualified substitute is available. Conversely, the most expensive component need not be the limiting supply. Component cost shares and capacity constraints must be analyzed separately.

A **bill of materials**, or **BOM**, lists components, while public manufacturing estimates may also add assembly and test services. **Cost of goods sold**, or **COGS**, is the cost the company recognizes in its accounts for products sold during a period; its boundary can include more than a public parts estimate. **Gross margin** is the share of sales revenue left after subtracting COGS. That remainder still has to cover other expenses, so it is not the same as final profit. Comparing an estimated component bill with a reseller's asking price does not reveal a manufacturer's product-specific gross margin.

Factory economics are strongly affected by **capital expenditure**, or **capex**, the money invested in long-lived equipment and facilities. **Depreciation** allocates that investment as expense over its accounting life. If production falls, much of the factory's cost remains, and each completed unit must carry more of it. This encourages manufacturers to seek sustained demand before committing to major expansions.

The industry also concentrates expertise geographically. A new factory building does not instantly reproduce a mature supplier network, trained staff, service infrastructure and qualified process. Diversification can improve resilience, but it requires time and coordination across the chain. Export rules and industrial policy influence those choices, and their dates and scope must be checked when they are used for a current decision.

For a durable way to read semiconductor news, ask what the reported number measures, which product and period it covers, whether it is capacity or output, and whether it is a disclosure, estimate or forecast. Those questions let you connect a headline to the physical manufacturing system rather than simply compare large numbers.

## By the numbers

These are specific examples from Modules 19 and 20, not a specification for every GPU system.

| Quantity | Value | What it illustrates |
|---|---|---|
| H100's GH100 compute die | 814 mm² and 80 billion transistors | A large conventional single-field die. |
| Blackwell B200 compute | Two dies and 208 billion transistors | Package integration extends beyond one conventional die. |
| GB200 NVL72 compute | 72 GPUs and 36 Grace CPUs | Product-level GPU counts differ from individual compute-die counts. |
| GB200 NVL72 layout | 18 compute trays and 9 switch trays | A rack is a coordinated mechanical and electrical system. |
| Example GB200 rack power | About 120–132 kW | Configuration and operating boundary matter. |
| Example rack coolant calculation | About 160 L/min for roughly 110 kW at a 10 °C temperature rise | Cooling follows the heat balance under stated assumptions. |
| Global semiconductor sales, 2025 | About $792 billion | A dated industry revenue measure, not the sum of every supply-chain layer. |

## The people and companies

NVIDIA defines its GPU and system architecture; TSMC supplies wafer fabrication and advanced packaging; memory companies supply HBM. System manufacturers such as Foxconn, Quanta and Wistron integrate boards and racks, while server vendors, networking companies, power specialists and cooling suppliers contribute their own equipment. The customer then operates the result with software and facilities that determine how much useful work it delivers.

## Why it is hard

Each level introduces a new constraint without removing the earlier ones. A correct circuit must become a manufacturable layout, a good die must survive packaging, and a good package must receive stable power and adequate cooling in a working system. The factories and suppliers must deliver the right qualified components on time. The difficult achievement is sustained useful computation from the entire chain, not an isolated peak specification.

## Go deeper

- [Module 19: From design to silicon](#/m/19), “RTL: Writing the Chip,” “Physical Design,” and “First Silicon, Bring-Up, and Respins.”
- [Module 19: From module to rack](#/m/19), “The SXM Module,” “The NVL72 Rack,” and “Networking Beyond the Rack.”
- [Module 20: Industry economics](#/m/20), “The Economics Toolkit,” “Fab Economics,” and “How to Read Industry Data.”
