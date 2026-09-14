# Survey 9: From bare die to a packaged GPU

Packaging turns fragile tested silicon into something that can connect to a circuit board, receive power, communicate and shed heat. For a large accelerator it also joins several compute and memory dies into one tightly connected assembly. The package is therefore part of the computing architecture as well as its physical support. This chapter follows the change from wafer to separated die, then outward through increasingly larger connections until the result can become part of a server.

> **The gist**
> - A package provides electrical connections, mechanical support, environmental protection and a path for heat.
> - The die's tiny connections need several stages of redistribution before they reach board-scale wiring.
> - Thinning and separating silicon create handling and damage problems even after wafer fabrication succeeds.
> - Flip-chip assembly connects the die face down through an array of joints, rather than only through wires around its edges.
> - CoWoS places compute and HBM together on a fine-wiring intermediate structure; its variants build that structure differently.
> - More integration raises the value at risk in each assembly, making known-good components and intermediate tests essential.

## 1. Why a chip needs an engineered home

A bare die is not a robust replacement for a finished component. Its surface has delicate structures, its connections are very small, and its power must arrive at the right voltage with limited disturbance. It also needs a way to transfer heat into something much larger. A package solves these problems together.

**Packaging** includes the structures and processes that support and connect the silicon after wafer fabrication. An **organic substrate** is a laminated wiring structure made from polymer-based insulating materials and metal layers. It provides mechanical support and redistributes connections between the fine spacing near the die and the coarser spacing suitable for a board.

**Redistribution** means routing an electrical connection from one location or spacing to another. The concept appears at several scales. On a wafer or molded assembly, thin-film **redistribution layers**, or **RDLs**, can move contacts outward. In a substrate, multiple wiring layers guide signals and power toward the external connection pattern. The same word does not imply the same manufacturing dimensions in each location.

The package must also survive materials that expand differently with temperature. Silicon, copper, solder and polymer do not change size by the same amount when heated. The **coefficient of thermal expansion**, or **CTE**, describes that fractional size change per temperature change. When joined materials want to expand differently, one cannot simply slide past the other. Their attachment forces them to deform together, loading the interfaces and connections. Repeated heating and cooling repeats that load. This is why the choice of glue, solder and supporting material affects whether a package survives in use.

A **thermal interface material**, or **TIM**, fills the imperfect contact between heat-transfer surfaces. Even flat-looking solids touch at microscopic high points unless the gap is filled. The material must conduct heat while accommodating the practical surface geometry. Its thickness, uniformity and long-term condition can matter as much as its advertised conductivity.

These functions interact. A structure that is electrically attractive may be mechanically weak. A material that relieves stress may impede heat flow. A larger package offers more room for components while becoming more difficult to keep flat. Packaging is a set of linked compromises rather than a final protective wrapping applied after the engineering is finished.

## 2. Separate useful dies without damaging them

At the end of wafer processing, many dies still share one silicon disk. Their electrical test results identify which are suitable for assembly. Before they can become individual components, the wafer may be thinned and then separated along the spaces between dies.

**Backgrinding** removes material from the rear of the wafer. The required remaining thickness depends on the product. Thin memory dies help a stack fit within its height limit, while other devices can retain more silicon. Thinning reduces stiffness and can leave subsurface damage, so temporary support and damage-removal steps become important.

A **carrier** supports the wafer during operations that would otherwise make it too fragile to handle. Adhesives and protective films must hold it securely but also release without contaminating or damaging the structures. The handling process is therefore part of the yield problem, not just a convenient way to move material between machines.

**Dicing**, or **singulation**, separates the dies. A blade can cut through the wafer, but it removes material and may create chips or cracks near the cut. A laser-based method can modify material inside the silicon so that later mechanical expansion separates it along the intended path. This is **stealth dicing**; the name refers to the internal modification, not to a complete absence of mechanical consequences.

Different products favor different methods. Die size, thickness, surface materials, damage tolerance and throughput all matter. A process that works well for a thin memory wafer may not be the best choice for a very different power or logic device. There is no universal cutting method that wins at every combination of cost and damage sensitivity.

After separation, equipment picks selected dies from the supporting tape or carrier and places them into the next assembly. The die must remain correctly oriented and traceable to its test result. A beautifully fabricated transistor is of no value if a crack introduced during handling later propagates through the die or weakens its package.

This stage also explains why front-end yield and assembly yield are distinct. Wafer fabrication can succeed while thinning, separation or attachment loses additional units. The economic cost of each loss grows as more good components and processing are committed to the assembly.

## 3. Make reliable joints and fan them outward

In **wire bonding**, fine wires connect pads on the die to surrounding package contacts. It remains valuable for many products because the process is mature and suits numerous cost and electrical requirements. But a large high-current, high-bandwidth device benefits from distributing contacts across an area rather than relying only on access around its edges.

**Flip-chip assembly** turns the active side of the die toward its receiving structure. An array of metal or solder connections joins matching contacts. A **bump** is one of these small raised connection structures. A copper pillar can provide a firm conducting column, with solder forming the joint at its end.

The distinction between a bump's pitch and its size matters. Pitch is the spacing between repeated connection centers; diameter is the size of an individual connection. Both influence how many contacts fit and how much alignment tolerance remains. Smaller joints also leave less margin for contamination, height variation and incomplete joining.

**Reflow** heats solder through the required melting and joining sequence. The surfaces must be prepared so molten solder can **wet** them: spread onto the intended metal and form intimate contact rather than bead up or leave an unjoined patch. The assembled geometry must also let the intended contacts meet. A joint may appear connected while containing a void or an inadequate contact area, creating electrical resistance or reliability concerns.

**Underfill** places an insulating supporting material between the die and receiving structure. It shares mechanical loads and helps reduce strain concentrated in small joints. It must fill the intended spaces without harmful voids and remain compatible with the other materials. Underfill also makes later replacement of a failed die much more difficult.

The organic substrate then performs another routing transformation. Its insulating build-up films and copper layers let the design move from dense internal connections to larger board connections. **Ajinomoto Build-up Film**, or **ABF**, is an important family of dielectric materials used in high-performance substrates. It is a material inside a multilayer routing system, not the entire finished substrate.

At the board-facing side, a **ball-grid array**, or **BGA**, uses an array of solder balls to connect the package. By this point the signal has passed through several different scales of wiring. Each transition has a purpose, and each can create an electrical, mechanical or thermal failure that later testing must detect.

## 4. Put the processor and memory on a shared fine-wiring structure

A GPU beside several HBM stacks needs many short connections between them. Ordinary substrate wiring can be too coarse for the required density and layout. An **interposer** provides an intermediate fine-wiring structure that connects the dies before their combined connections fan out through the substrate.

This side-by-side arrangement is often called **2.5D packaging**. The term distinguishes it from simply placing independent packages on a board and from directly stacking active compute dies on top of one another. The exact construction still matters more than the label: different implementations use different materials and connection structures.

**Chip-on-wafer-on-substrate**, or **CoWoS**, is TSMC's family of advanced packaging technologies. The name describes the assembly relationship, but the family includes several types of interposer. In **CoWoS-S**, the interposer is silicon with fine wiring and vertical connections. **CoWoS-R** uses a redistribution-layer interposer. **CoWoS-L** combines redistribution layers with local silicon interconnect structures where especially dense routing is needed.

Why use local bridges? The tightest bundles of connections need especially fine wiring, but the whole package does not need that same density. CoWoS-L puts silicon interconnect where those dense links cross between dies and uses broader redistribution wiring elsewhere. It therefore keeps some silicon interconnect without requiring every wire to travel through a full-size solid silicon interposer.

Use the flow diagram below to follow when each expensive component enters the assembly. The cost settings, if shown, are illustrative inputs. The lesson is how a failure late in the sequence can put already-good components at risk, not that a manufacturer has disclosed the exact displayed costs or yields.

<div class="widget" data-widget="cowos-flow"></div>

The processor itself can also comprise several compute dies. **Chiplets** are separately fabricated dies intended to work together in a larger product. Splitting a function can improve manufacturability or let different functions use different processes, but the parts must communicate through package connections rather than through an uninterrupted on-die network.

A conventional single-field die must fit the lithography exposure field. Larger package wiring structures can be patterned through **stitching**, aligning multiple exposure regions into a larger layout. Specialized wafer-scale devices also use stitching, so the scanner field is not an absolute physical ban on every possible larger silicon system. It is a powerful constraint on conventional die design and manufacturing.

## 5. Why larger integration raises the stakes

The value of a multi-die package is concentrated in one assembly. A failing memory stack can jeopardize neighboring good memory, compute dies, the interposer, substrate and completed processing. Because fine joints and underfill are difficult to reverse, rework may be impractical or may introduce further reliability risks.

That is why the phrase **known-good die** matters. Incoming components have passed specified tests before attachment, and additional testing can occur at intermediate assembly stages. The evidence is imperfect, but catching a weak component before permanent assembly protects everything that would later be attached beside it.

**Warpage** is bending caused by material stress and temperature history. A large package can bow enough that contacts no longer meet uniformly, even when each component looked acceptable separately. The problem depends on geometry, material expansion, stiffness and process sequence. Increasing package size does not merely scale the drawing; it changes the mechanical behavior.

Power delivery adds another constraint. Many connections carry power and ground rather than useful data. A processor operating at a low voltage can require substantial current, so the joint network must limit voltage drop and local heating. Counting all bumps as communication channels would therefore badly overstate the available interface bandwidth.

Heat must also move through a realistic path. The hottest region inside a die is not necessarily aligned with the easiest path through the lid or cold plate. A void, tilted surface or degraded interface can increase local temperature even if the average cooling capacity seems adequate. Thermal design uses the actual distribution of power as well as the package's total rating.

Production capacity needs the same care in interpretation. A packaging line quoted in wafers per month can deliver fewer packages if each package becomes larger. Mix, yield and allocated capacity also matter. Expanding the nominal wafer input does not automatically produce the same percentage increase in finished accelerator units.

Packaging therefore becomes an architectural choice with manufacturing consequences. The designer gains nearby memory and more combined silicon, while accepting new interconnect, heat, stress, test and supply requirements. A successful product solves the whole package instead of optimizing only the compute dies.

## 6. Stacking dies without solder

**Hybrid bonding** joins prepared dielectric surfaces and corresponding metal connections directly, commonly using copper for the electrical contacts. It can provide much finer connection spacing than conventional solder microbumps, making closely integrated stacked dies possible. TSMC's **System on Integrated Chips**, or **SoIC**, is one family of technologies using this approach.

The word “hybrid” refers to joining both dielectric and metal regions. The **dielectric** is the insulating surface around the contacts: it bonds the faces together while corresponding metal contacts provide electrical paths. Both kinds of surface must meet in the right places. This requires surfaces that are exceptionally clean, flat and correctly aligned. A particle can prevent surrounding areas from meeting, creating a void much larger than the particle itself. Tiny differences in surface height can interfere with electrical contact formation.

Direct bonding removes some of the spacing and geometry imposed by solder joints, but it is not automatically easier to manufacture. Surface preparation, alignment, thermal treatment and defect control become especially demanding. Testing must also anticipate that a permanently bonded interface is difficult to inspect or repair afterward.

Connection density rises strongly as pitch decreases because contacts occupy a two-dimensional area. Halving a regular array's pitch would allow more contacts along each direction. That geometric opportunity does not guarantee that every possible site can carry a useful high-speed signal: routing, power allocation, circuit area and heat still impose limits.

Directly stacking active dies can shorten communication paths while making cooling more complicated. One die may obstruct another's heat path, and the combined power distribution must remain manageable. Partitioning a design into stacked layers therefore requires planning what each layer does, not simply placing identical hot chips on top of one another.

HBM and compute integration also follow different roadmaps. A memory standard does not necessarily require a particular bonding method, and a future hybrid-bonded memory proposal should not be presented as the construction of every current HBM product. The durable concept is that finer interfaces enable new architectures only when manufacturing, test and thermal design can support them.

## By the numbers

These are representative values and worked comparisons from Modules 16 and 17.

| Quantity | Value | What it illustrates |
|---|---|---|
| Silicon versus organic-substrate CTE | About 2.6 versus 15 ppm/K | Joined materials want to expand by different amounts. |
| Starting wafer thickness | 775 µm for the discussed 300 mm wafers | Much of that thickness serves handling rather than computation. |
| Representative die-to-interposer microbump pitch | About 40–55 µm | Fine joints require accurate placement and flatness. |
| Conventional exposure field | 26 × 33 mm, or 858 mm² | Single-field die design faces a geometric constraint. |
| Hybrid-bond comparison | 6 µm pitch gives about 55× the connection density of a 45 µm array | The comparison is geometric, not a measured bandwidth gain. |
| Example package thermal mismatch | About 0.26 mm over a 100 mm substrate through the discussed reflow swing | Small expansion coefficients become large displacements across a package. |

## The people and companies

TSMC integrates CoWoS and SoIC, while other foundries and packaging companies offer their own architectures. ASE and Amkor provide major outsourced assembly and test services; substrate manufacturers and materials companies supply the routing structures underneath the dies. DISCO, bonding-tool makers and inspection specialists provide the equipment that handles, joins and checks the components. The product owner must coordinate these capabilities with its design and qualification requirements.

## Why it is hard

Every good component must remain good after it is joined to its neighbors. Fine alignment, contamination, warpage, thermal mismatch and incomplete joints can defeat an otherwise successful design. Larger assemblies put more valuable material at risk, and tighter integration makes failures harder to isolate or repair. Packaging succeeds when electrical performance, mechanical reliability, thermal behavior and production yield all remain acceptable together.

## Go deeper

- [Module 16: Packaging fundamentals](#/m/16), “The Back-End Flow in Order,” “The Substrate in Depth,” and “Package Reliability and Qualification.”
- [Module 17: CoWoS](#/m/17), “The Three CoWoS Variants” and “The CoWoS Process Flow, Step by Step.”
- [Module 17: Stacking and chiplets](#/m/17), “SoIC: Hybrid Bonding and True 3D” and “The Chiplet Paradigm.”
