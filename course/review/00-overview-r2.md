# Round 2 targeted review: Module 00: The Whole Supply Chain on One Page

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 10 primary-source checked, 4 correction/qualification, 12 calculated, 4 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | TSMC capacity exceeded 17 million 12-inch-equivalent wafers in 2025 | CONFIRMED | Official total; includes nodes and customers beyond the modeled GPU. | [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile) |
| 2 | Total foundry capacity proves the front end was never constrained | WRONG | Aggregate capacity cannot establish available product-specific capacity. Removed categorical inference. | [Primary source](https://www.tsmc.com/english/aboutTSMC/company_profile) |
| 3 | Everything above estimated BOM is NVIDIA gross margin | WRONG | Cost of revenue includes more than components; reseller prices are not necessarily realized revenue. R&D is an operating expense. | [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf) |
| 4 | EUV uses 13.5 nm light | CONFIRMED | ASML identifies this operating wavelength. | [Primary source](https://www.asml.com/en/technology/lithography-principles/light-and-lasers) |
| 5 | 100k starts, 24 passes and 100k productive passes/tool require 24 scanners | CONFIRMED | 100,000 × 24 / 100,000 = 24. Assumptions made explicit in quiz. | Independent arithmetic using the explicitly stated model inputs |
| 6 | H100 BOM and quoted-market-price estimates determine actual product profit | UNVERIFIABLE | Retained as illustrative estimates, not measured product profitability; no purchasing contract or product COGS available. | [Primary source](https://investor.nvidia.com/files/doc_financials/2026/q3/13e6981b-95ed-4aac-a602-ebc5865d0590.pdf) |
| 7 | Fab depreciation of $5,000/wafer for a $30 B, five-year, 100 k/month model | CALCULATED | 30 B/5/(12×100 k)=5,000; real asset lives and depreciable base differ. | Independent arithmetic from stated inputs |
| 8 | Half utilization doubles depreciation per wafer | CALCULATED | Fixed depreciation divided over half output doubles unit charge; variable costs do not follow this rule. | Independent arithmetic from stated inputs |
| 9 | 12–14 weeks described as about three months | CALCULATED | 84–98 days; appropriate approximation, not a universal measured cycle time. | Independent arithmetic from stated inputs |
| 10 | $16,500 wafer and 45–50 good dies imply roughly $350/die | CALCULATED | Range 330–367 dollars; yield assumption drives the result. | Independent arithmetic from stated inputs |
| 11 | 20–25 scanners at $200–220 M imply $4–5.5 B | CALCULATED | Endpoint multiplication checks; not an independently verified fleet budget. | Independent arithmetic from stated inputs |
| 12 | H100 die 814 mm²,80 B transistors, TSMC 4 N | PRIMARY CHECK | NVIDIA architecture documentation gives this combined die specification. | [Primary source consulted](https://developer.nvidia.com/blog/?p=45555) |
| 13 | Original data-center Blackwell uses 208 B transistors across two dies | PRIMARY CHECK | Verified for the B200-class architecture, not every product carrying the Blackwell name. | [Primary source consulted](https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/) |
| 14 | GB200 NVL72 has 72 GPUs and 36 Grace CPUs | PRIMARY CHECK | NVIDIA product architecture description confirms the configuration. | [Primary source consulted](https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/) |
| 15 | 100 k GPUs require approximately 1,400 NVL72 racks | CALCULATED | ceil(100000/72)=1,389 racks at full capacity; spare inventory excluded. | Independent arithmetic from stated inputs |
| 16 | 1,389 racks at 120–140 kW imply roughly 150–200 MW | CALCULATED | 166.7–194.5 MW of modeled rack load; building overhead is additional. | Independent arithmetic from stated inputs |
| 17 | 0.23 kg polysilicon at $20–40/kg contributes $5–10 | CALCULATED | 4.6–9.2 dollars with stated assumptions; not a quote. | Independent arithmetic from stated inputs |
| 18 | Wafer manufacture precedes fabrication of device circuits | PRIMARY CHECK | SUMCO distinguishes substrate production from customer's device fabrication. | [Primary source consulted](https://www.sumcosi.com/english/products/process/) |
| 19 | Polysilicon serves both electronics and solar applications | PRIMARY CHECK | WACKER describes both customer groups and additional semiconductor cleaning. | [Primary source consulted](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) |
| 20 | ASML 2025 reports 48 EUV system sales | PRIMARY CHECK | Revenue recognition differs from shipment timing; overview wording corrected. | [Primary source consulted](https://www.asml.com/en/investors/annual-report/2025) |
| 21 | 858 mm² reticle field is an absolute maximum chip size | CORRECTED / QUALIFIED | 26×33=858 mm² is conventional single-field geometry; Cerebra s wafer-scale products disprove an absolute die limit. Corrected. | [Primary source consulted](https://www.cerebras.ai/press-release/cerebras-systems-unveils-the-industrys-first-trillion-transistor-chip) |
| 22 | TSMC 2026 capex guidance $60–64 B as of midyear | PRIMARY CHECK | July 16,2026 quarterly materials confirm raised guidance; earlier guidance should retain its date. | [Primary source consulted](https://investor.tsmc.com/english/quarterly-results/2026/q2) |
| 23 | A 300 mm wafer has about 707 cm² area | CALCULATED | π×15²=706.86 cm²; notch/edge losses excluded. | Independent arithmetic from stated inputs |
| 24 | Two full 800 mm² dies contain about 1,600 mm² logic silicon | CALCULATED | Area accounting, not the full package or interposer area. | Independent arithmetic from stated inputs |
| 25 | Higher NA and shorter wavelength both support smaller lithographic features | PRIMARY CHECK | ASML explains the independent terms of the resolution relationship. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 26 | EUV cumulative installed base about 350 by end 2025 | UNRESOLVED | Annual recognized sales alone do not establish cumulative shipments or surviving installed base. Treat as an unverified estimate. | [Primary source consulted](https://www.asml.com/en/investors/annual-report/2025) |
| 27 | N3/N2 mask count and 20–25 EUV layers | UNRESOLVED | Public tool pages identify supported nodes, not a foundry's complete layer recipe. Counts remain analyst estimates. | [Primary source consulted](https://www.asml.com/en/technology/lithography-principles/lenses-and-mirrors) |
| 28 | EUV scanner and mask-set quoted prices | UNRESOLVED | No invoice-level confirmation from manufacturer sources consulted; configuration and year matter. | [Primary source consulted](https://www.asml.com/en/investors/annual-report/2025) |
| 29 | 2025 HBM bit/revenue shares establish 8–13×price-per-bit | CORRECTED / QUALIFIED | Cross-module figures use unreconciled bases; removed numerical inference from overview. Cost and realized revenue are distinct. | Independent arithmetic from stated inputs |
| 30 | HBM 5%bit share at 3×area-per-bit means 15%wafer share | CALCULATED | Correct mixture share is(3×.05)/(.95+3×.05)=13.64%; overview now says about 14% in a hypothetical two-product model. | Independent arithmetic from stated inputs |

## Edits and quiz coverage

- Aggregate capacity cannot establish available product-specific capacity. Removed categorical inference.
- Cost of revenue includes more than components; reseller prices are not necessarily realized revenue. R&D is an operating expense.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 7 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

The economics/bottleneck explanation now separates physical cost, realized revenue and qualified capacity. Remaining depth work: audit each other supply-chain vignette and its first-use terminology against the same boundary discipline. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
