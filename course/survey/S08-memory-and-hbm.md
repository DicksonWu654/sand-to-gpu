# Survey 8: Memory and why it sits beside the GPU

Memory manufacturing turns repeated storage cells into devices that retain and deliver information. Some memory must preserve data after power disappears; other memory prioritizes fast access while the system is running. A GPU then needs enough of that working memory close enough to keep its computing circuits busy. This chapter connects the tiny storage cell to the tall memory stacks beside an accelerator, and explains why the cost of moving data can matter as much as the cost of calculating with it.

> **The gist**
> - DRAM stores charge that leaks away, so its contents must be refreshed while power is available.
> - Reading a DRAM row disturbs its small stored signal; sensing circuitry amplifies and restores it.
> - NAND flash stores information through a lasting change in a transistor's threshold, and modern NAND stacks cells vertically.
> - Memory manufacturing repeats a compact structure at huge scale, making uniformity and defect management central concerns.
> - HBM combines DRAM dies in a stack and uses a very wide nearby connection to the processor.
> - HBM's extra area, stacking, test and packaging consume capacity; higher selling price is not simply payment for a different kind of bit.

## 1. Computing needs somewhere to put things

An arithmetic unit can work only when its inputs arrive. It also needs somewhere to place its result. Adding computing circuits without supplying data quickly enough leaves some of them idle, like workers waiting for materials. This is the **memory-bandwidth problem**: the rate at which data can be delivered limits the useful rate of computation.

**Capacity** describes how much information memory holds. **Bandwidth** describes how much information it can transfer per unit time. **Latency** is the delay between asking for something and receiving it. These are different properties. A large storage device can hold an entire dataset yet deliver each requested item too slowly for a processor's immediate needs.

Computers therefore use a hierarchy. Small nearby storage serves urgent requests, larger working memory holds actively used data, and persistent storage retains programs and files. The choice reflects different costs, speeds and manufacturing structures. There is no single memory technology that simultaneously wins on every dimension.

**Static random-access memory**, or **SRAM**, uses a circuit that maintains its state while powered and is commonly used for processor caches. A **cache** stores selected copies of data close to the computing logic. **Dynamic random-access memory**, or **DRAM**, uses a more compact storage cell whose charge must be periodically restored. **NAND flash** is nonvolatile memory: it can preserve information without continuous power, making it suitable for storage.

The word “random-access” means locations can be addressed without reading every preceding location in sequence. It does not mean that access time is completely independent of every detail of the request. Real memories organize cells into rows, columns and banks, and their operating sequence affects performance.

A programmer may see these choices as cache misses, memory stalls or slow storage access. Underneath are physical tradeoffs between cell size, signal strength, wiring, sensing, retention and endurance. Understanding the cell explains why software cannot make those distinctions disappear simply by asking the memory controller to work harder.

## 2. A DRAM bit is a very small stored charge

A conventional DRAM cell contains a transistor and a capacitor. The **capacitor** stores electrical charge. The transistor acts as an access switch that connects the cell to a shared wire when that location is selected. A **word line** controls access transistors along a row, while a **bit line** carries the tiny signal toward the sensing circuitry.

The shared bit line is much larger electrically than one cell: changing its voltage requires more charge than changing the cell's voltage by the same amount. When the access transistor connects them, the cell therefore shifts the bit-line voltage only slightly. This is charge sharing, and the small shift is the signal the memory must recover. A **sense amplifier** detects that difference and drives the result toward a clear electrical state. It also restores the stored value while the cell remains connected.

The disturbance is why DRAM reading is often described as destructive. This does not mean the computer loses the data whenever it reads memory. It means the internal activation and sensing operation must restore the affected cells as part of normal operation. The externally visible read is supported by a more delicate internal sequence.

Charge also leaks away even when a cell is not being read. **Refresh** periodically restores stored information before a weak cell loses too much signal. Temperature influences leakage, so a memory device's refresh requirements depend on its specification and operating conditions. The shortest-lived relevant cells help determine how conservatively the whole population must be managed.

Shrinking the capacitor is not effortless. Less stored charge leaves a weaker signal and less margin against noise and sensing variation. Manufacturers increase useful capacitor surface area by building tall, narrow structures and use suitable dielectric films to obtain sufficient capacitance in a small footprint.

These structures connect memory directly to deposition and etch. Deep, narrow openings must remain uniform, and films must coat surfaces far below the top. A slightly defective insulator can leak; an incompletely formed electrode can reduce capacitance. The transistor, capacitor and sensing circuit must be designed together, because improving one changes the acceptable behavior of the others.

The result is an exceptionally repetitive manufacturing problem. The same compact cell appears throughout vast arrays, with local support circuits and spare resources around it. This repetition enables density, but it also means a small systematic process error can affect many storage locations at once.

## 3. NAND remembers by changing a transistor

NAND flash solves a different problem: keeping information when power is removed. It stores charge in an electrically isolated region associated with a transistor. The stored charge shifts the transistor's **threshold voltage**, the control-voltage level associated with turning it on. Reading determines which threshold range the cell occupies.

Early structures commonly used a **floating gate**, a conductive storage region surrounded by insulation. Many modern structures use **charge-trap storage**, where charge is held in localized states within an insulating material. In both cases the useful information is the effect of retained charge on transistor behavior, rather than the freely accessible charge of a DRAM capacitor.

A cell can represent more than a binary choice by using several threshold ranges. Think of marking several allowed positions on the same ruler: each position can stand for a different pattern of bits. **Triple-level cell**, or **TLC**, stores 3 bits by distinguishing 8 threshold states; **quad-level cell**, or **QLC**, stores 4 bits using 16 states. The names count bits per cell, not the number of physical voltage states. More states put the allowed ranges closer together, so a small voltage shift is more likely to be mistaken for a neighboring state. The ruler is only a picture of the spacing; the real device reads the transistor's electrical response.

Programming moves charge into the storage region under controlled electrical stress. Erasing removes or redistributes it so the cells can be reused. These operations are physically different from a simple low-stress read. Repeated program and erase cycles can degrade the insulating structures, which is one reason flash has a finite **endurance**, a limit on repeated rewriting under specified conditions.

A flash storage product compensates with a controller. **Error correction** uses additional information to recover data when some stored bits are wrong. **Wear leveling** spreads rewriting across available storage so that one region does not wear out much earlier than the rest. These techniques turn imperfect cells into a useful device, but they consume capacity and controller work.

The manufacturing and system perspectives are inseparable. A denser cell can lower cost, yet demand more careful programming, stronger correction or different performance expectations. The headline number of bits per cell does not by itself tell you how a finished storage device will behave under a particular workload.

## 4. Building memory upward

Once planar NAND became difficult to shrink economically, manufacturers moved storage into a vertical structure. **3D NAND** places many memory-cell layers above one another. A vertical channel passes through the stack, and the surrounding layers provide the control structures for cells at different heights.

Think of a lift shaft running through a tall building, with a separate floor able to interact with it at each level. The analogy describes the geometry, not the detailed electronics. In the real device, the layers and channel form a carefully engineered sequence of transistors whose electrical behavior must remain controlled along the entire height.

The manufacturer deposits a repeated stack of films, etches deep channel openings and forms the memory structures around those openings. In an important manufacturing approach, sacrificial material is later removed and replaced with conducting word-line material. That is **gate replacement**: an initial material establishes the shape before the final conductor occupies the intended spaces.

The hard part is consistency between the top, middle and bottom. Etching a deep opening can make it wider in one region, narrower in another, tilted or imperfectly cleared. Films deposited into deep structures can vary with depth. Every such difference can change the electrical properties of cells at that location.

Manufacturers can divide the vertical structure into **decks**, separately formed sections that are joined into a taller stack. This eases the demands of a single extreme etch, but creates its own alignment and connection problem at the deck boundary. A larger total layer count therefore does not necessarily imply that one etch traverses every layer in one uninterrupted operation.

Layer counts are useful only when the counting convention is understood. Active storage layers, support layers and total physical tiers are not interchangeable. Density also depends on the spacing between vertical channels, the number of bits stored per cell and the area consumed by peripheral circuits. A comparison based only on the advertised number of layers can miss the actual cost per usable bit.

The broad trend remains clear: vertical construction creates more storage in a given wafer footprint, and transfers the manufacturing challenge into deep etching, repeated deposition and uniform electrical behavior across a tall structure.

## 5. HBM puts a wide road beside the processor

**High-bandwidth memory**, or **HBM**, uses DRAM technology but changes the way memory is assembled and connected. Several DRAM dies are stacked vertically, with a base die managing interfaces and signals. The stack sits close to the processor on a fine-wiring package structure rather than far away across an ordinary circuit board.

**Through-silicon vias**, or **TSVs**, are conductive paths passing through a die's silicon. They help connect the stacked layers. The dies are thinned so the stack can fit within the package's mechanical limits, and fine joints connect corresponding electrical points. The whole assembly is a memory stack with its own manufacturing yield and test history.

HBM's key bandwidth strategy is width. A very wide interface carries many data bits in parallel. Think of several checkout lanes serving customers at once: adding lanes raises the total number served without making each cashier faster. Here the lanes are physical data connections. Keeping them short makes it practical to fit many of them into the package and reduces the energy spent changing their voltages. Stacking supplies more memory in a small footprint; the wide nearby connection is what lets that memory feed the processor quickly.

Bandwidth is not the same as eliminating latency. Data still passes through memory arrays, sensing circuits, interfaces and scheduling. HBM is valuable because it offers high aggregate transfer capacity near the processor with suitable energy behavior, not because every memory access becomes instantaneous.

The diagram below separates the stack from its neighbor. Follow the vertical connections within memory and then the lateral path across the package toward the GPU. Those are different interconnect problems, handled by different structures.

<div class="widget" data-widget="hbm-stack"></div>

This arrangement is also why HBM cannot be evaluated as ordinary DRAM plus an inexpensive tower. TSV regions consume die area, thinning makes handling difficult, stacking demands reliable joints, and heat must escape through a compact assembly. The package surrounding the stack must route its wide interface and deliver power while maintaining mechanical integrity.

HBM generations change interface width, signaling and packaging requirements. A standards figure describes an agreed interface, while a vendor product may operate at a different rated speed. For a bandwidth comparison, the generation name is only the start; the number of data connections, transfer rate and number of stacks must also be specified.

## 6. Stack yield and the cost of a useful bit

Suppose each die in a stack has a small chance of an undetected defect. Combining more dies increases the chance that at least one will cause trouble. Stacking also introduces new defects that did not exist when the dies were separate. The stack must therefore be tested as a stack, not merely accepted because its incoming dies passed wafer sort.

A **known-good stack** has passed the required tests before it enters the processor package. Test access through the base die and internal self-test structures helps reach memory layers that a probe can no longer touch directly. Passing those tests still does not guarantee every possible behavior after the stack is connected to a particular GPU and cooling arrangement.

Different suppliers use different bonding and underfill approaches. **Underfill** is insulating material placed between joined structures to support the connections and manage mechanical stress. Process choices affect throughput, warpage, joint reliability and thermal behavior. They should be compared as complete qualified manufacturing flows, not as a single material with a universal advantage.

Memory capacity decisions follow the same logic. An HBM die uses space for wide interfaces and vertical connections, and some manufactured bits are lost through die and stack yield. The result can require more wafer starts for each shipped bit than conventional DRAM. **Wafer starts** count wafers entering a manufacturing flow; they are an input measure, not the number of completed memory stacks.

That penalty must be described carefully. Redirecting an existing wafer from conventional DRAM to HBM removes the conventional output that wafer would have produced. It does not remove several additional physical wafers. Instead, the redirected wafer produces fewer total usable bits in the more demanding product. Supplying the same bit quantity through HBM requires more wafer capacity.

Prices also vary with contracts, generation and demand. A quoted HBM price is not a physical constant, and a supplier's share changes as customers qualify new products. The durable lesson is the relationship: extra area, process steps, yield losses and testing create real manufacturing costs, while the value of feeding expensive computing hardware creates strong demand for the result.

## By the numbers

These examples come from Module 15; generation and operating conditions matter.

| Quantity | Value | What it illustrates |
|---|---|---|
| Representative DRAM cell capacitance | About 10–20 fF | The stored signal is extremely small. |
| Example conventional-DRAM refresh window | 64 ms, with 32 ms above 85 °C in the discussed conventional-DDR example | Temperature can increase refresh work. |
| QLC storage states | 16 threshold states | More bits require distinguishing tighter voltage windows. |
| HBM3E data interface | 1,024 bits per stack | Bandwidth comes partly from very wide parallel transfer. |
| HBM4 data interface | 2,048 bits per stack | Interface width doubles relative to HBM3E. |
| Representative 12-high core-die thickness | About 30–35 µm | Stacking requires thin and fragile dies. |
| Illustrative HBM wafer-per-bit penalty | About 2–3× conventional DRAM | Compare equal shipped bit output, not equal wafer counts. |

## The people and companies

SK hynix, Samsung and Micron manufacture major DRAM and HBM families; CXMT supplies conventional DRAM, including DDR5 and LPDDR5X. NAND suppliers include Kioxia, SanDisk and YMTC, whose Xtacking architecture bonds separately manufactured array and peripheral circuits. Conventional DRAM, NAND and HBM are different product markets, so leadership or availability in one does not establish qualification in another. Equipment and packaging partners help turn each memory design into a dependable product.

## Why it is hard

Memory combines a tiny electrical margin with an enormous number of repeated structures. Increasing density makes charge sensing, deep etching and film uniformity harder; stacking adds mechanical, thermal and interconnect risk. The product must preserve useful information despite normal variation and occasional defects. Achieving that at volume requires the storage cell, fabrication process, repair scheme, controller and package to work together.

## Go deeper

- [Module 15: DRAM](#/m/15), “The 1T1C Cell and the Sense Amplifier” and “The Storage Capacitor.”
- [Module 15: NAND](#/m/15), “The 3D NAND Architecture” and “The Gate-Replacement Flow Step by Step.”
- [Module 15: HBM](#/m/15), “Anatomy of an HBM Stack,” “Testing and Known-Good Stacks,” and “Economics.”
