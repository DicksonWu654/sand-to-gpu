# Review: Module 17 — Advanced Packaging: CoWoS, SoIC and Chiplets
Reviewer summary: The CoWoS variant descriptions, process flow, capacity figures (75–80k wpm end-2025, 120–140k end-2026, Amkor/SPIL outsourcing), Blackwell CoWoS-L redesign story and CPO facts all check out against TSMC symposium coverage, SemiAnalysis and trade press. The substantive errors were arithmetic and roadmap: the hybrid-bond density ratio was overstated ~10× ("500×" vs the correct ~55× for 6 µm vs 45 µm, repeated in the quiz), the SoIC 4.5 µm pitch was dated 2027 when TSMC's 2026 roadmap says ~2029, and the B200 bill-of-materials figures (HBM stacks at $100–150, assembly worth $2,000–3,000) were several times too low and inconsistent with Module 15. TSMC's AP fab list and AMD MI350's packaging variant were also corrected.
Overall verdict: Needed several corrections
Claims checked: 40   Confirmed: 28   Minor: 5   Wrong: 6   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Blackwell: two ~800 mm² dies, 8 HBM3E, "roughly 16,000 data wires" | MINOR | 8 × 1,024 = ~8,200 data bits, ~13,000 signals (module's own figure); fixed | JEDEC HBM3; module Section 3 |
| 2 | Reticle 26 × 33 mm = 858 mm²; High-NA 26 × 16.5 = 429 mm² | CONFIRMED | | ASML |
| 3 | GH100 814 mm²; P100 GP100 610 mm² | CONFIRMED | | NVIDIA |
| 4 | Poisson yields 45% / 67% / 20% | CONFIRMED | recomputed | arithmetic |
| 5 | Organic 8–15 µm vs Si interposer 0.4–2 µm L/S | CONFIRMED | CoWoS-S min 0.4 µm | TSMC 3DFabric |
| 6 | Energy-per-bit table (UCIe-A 0.25, standard 0.5 pJ/bit; optics 15–30) | CONFIRMED (approx.) | UCIe spec targets | UCIe Consortium |
| 7 | HBM power worked example (190 W at 3 pJ/bit; 450 W at 7) | CONFIRMED | arithmetic | — |
| 8 | Xilinx Virtex-7 2000T 2011, four 28 nm dies on 65 nm interposer; CoWoS named 2012 | CONFIRMED | | Xilinx WP380 |
| 9 | AMD Fiji 2015 interposer from UMC, assembly ASE | CONFIRMED | | trade press |
| 10 | CoWoS-S: 65 nm-class, 4–5 RDL, 10 µm × 100 µm TSVs, iCAP deep-trench caps | CONFIRMED | | TSMC |
| 11 | H100 ~2.5× reticle; 3.3× ~2,800 mm²; 5.5× ~4,700 mm² 12 HBM; 9.5× ~8,000 mm² on 120 × 150 mm substrate 2027 | CONFIRMED | | TrendForce 24 Apr 2025; TSMC symposium |
| 12 | 5.5× generation "reported yields above 90%" | MINOR | TSMC 2026 symposium: >98% yield in 2026 | SemiEngineering "TSMC Tech Symposium 2026, By The Numbers" |
| 13 | B200 CoWoS-L mid-2024 warpage at bridge edges; new top-metal mask; ~one quarter delay | CONFIRMED (hedged) | SemiAnalysis: CTE mismatch GPU/LSI/RDL/substrate; top global-routing metal and bump-out redesign plus bridge redesign; ~3 months | SemiAnalysis Aug 2024; TweakTown (NVIDIA "GPU mask") |
| 14 | AMD MI350 on CoWoS-L | WRONG | MI350/MI355X is CoWoS-S (N3P XCDs hybrid-bonded on N6 IODs); MI400 reported CoWoS-L | HotHardware; SemiAnalysis Advancing AI 2025 |
| 15 | Bosch DRIE 0.5–1 µm per cycle; Lam Syndion, TEL Tactras; Lam SABRE 3D; Cu pumping | CONFIRMED | | tool vendors |
| 16 | Microbumps 40–55 µm, Sn-3.5Ag; HBM 55 µm base-die bumps | CONFIRMED | consistent with Module 15 | JEDEC ballout |
| 17 | C4 80–100 µm at 130–180 µm pitch; interposer thinned to ~100 µm | CONFIRMED | | industry |
| 18 | Substrate "80–100 mm on a side and ~5 mm thick" | MINOR | ~2–3 mm (1 mm core + ~0.4 mm build-up per side); fixed | Module 16; Ibiden |
| 19 | oS outsourced to ASE/SPIL/Amkor since 2023–24 | CONFIRMED | | TrendForce |
| 20 | Liquid-metal TIM1 for >1,000 W parts | UNVERIFIABLE | hedged "reportedly" | — |
| 21 | Package power H100 700 W; B200 1,000–1,200; B300 1,400; Rubin ~1,800; Rubin Ultra ~3,600 | CONFIRMED | | NVIDIA; trade press |
| 22 | GPU dies ~$400–500; HBM3E stacks ~$100–150; assembly ~$2,000–3,000 parts | WRONG | $17k wafer / ~31 good dies ≈ $550; HBM3E $13–20/GB → $300–500 (24 GB) to $500–700 (36 GB); parts ≈ $5,000–7,000; fixed here, in Supply Chain section and quiz Q5 | Silicon Analysts HBM pricing; module's own worked example |
| 23 | Interposer Poisson example 57% | CONFIRMED | | arithmetic |
| 24 | CoWoS capacity ~15k end-2023, 30–35k end-2024, 75–80k end-2025, 120–140k end-2026 | CONFIRMED | | TrendForce; Silicon Analysts |
| 25 | Outsourced oS 240–270k wafers/yr 2026 (Amkor 180–190k, SPIL 60–80k); NVIDIA 55–65% | CONFIRMED | | GlobalSemiResearch; Astute; TrendForce |
| 26 | Packages per wafer 29 / 16 / 9; 25–30 M packages/yr at 130k wpm | CONFIRMED | arithmetic | — |
| 27 | AP fabs: "AP2 (Hsinchu), AP3/AP5 (Taichung)" | WRONG | AP1 Hsinchu, AP2 Tainan, AP3 Longtan, AP5 Taichung, AP6 Zhunan, AP7 Chiayi, AP8 Tainan (ex-Innolux, 96,000 m²) | DigiTimes 29 Jan 2026; TrendForce |
| 28 | CoWoS wafer $6–8k (S, 2023), $10–12k+ (L, 2025); $500–1,500 assembly per package | CONFIRMED (analyst estimates) | hedged as estimates | SemiAnalysis; Silicon Analysts |
| 29 | SoIC 9 µm 2022, 6 µm 2025; "roadmap to 4.5, 3, ~2 µm" with 4.5 µm in 2027 | WRONG (date) | TSMC 2026 symposium: 4.5 µm ~2029 | Tom's Hardware; eeNews; design-reuse |
| 30 | "~28,000/mm² at 6 µm, about 500× a 45 µm array" | WRONG | 1/(45 µm)² ≈ 494/mm²; ratio ≈ 55×; fixed in body, Key Numbers and quiz Q4 | arithmetic |
| 31 | Cu "expanding ~6× more than the constraining SiO2 (17 vs ~0.5)" | WRONG | 17/0.5 ≈ 34×; 6× is Cu vs Si; reworded | CTE values |
| 32 | 300 mm wafer grows ~0.5 µm/°C | MINOR | 2.6 ppm × 300 mm ≈ 0.8 µm/°C; fixed | arithmetic |
| 33 | Kinex ~1,600 placements/hr; Besi ~80% hybrid-bonding share; Applied ~9% of Besi | CONFIRMED | | EE Times; Applied PR |
| 34 | V-Cache 2022 9 µm; MI300 XCD-on-IOD 9 µm; Clearwater Forest Foveros Direct 9 µm; HBM4 on microbumps | CONFIRMED | | AMD; Intel; Tom's Hardware hybrid bonding 2026 |
| 35 | EMIB products (Kaby Lake-G 2018, Sapphire Rapids, Ponte Vecchio 47 tiles, Gaudi 3 on TSMC); Foveros pitches 50/36/25/9 µm; NVIDIA $5 B in Intel Sept 2025 | CONFIRMED | | Intel; public record |
| 36 | CoPoS 310 × 310 mm pilot 2026 "at VisionChip subsidiary"; 510 × 515 mm at AP7 2028–29 | CONFIRMED (hedged) | DigiTimes: pilot at Visionchip/VisEra Longtan, completed mid-2026; AP7 P4/P5 for HVM 2028–29 | DigiTimes; TrendForce 13 Apr 2026; Seoul Economic Daily |
| 37 | UCIe March 2022; standard 100–130 µm, 28–224 GB/s/mm; advanced 25–55 µm, 165–1,300 GB/s/mm; 2.0 (2024) UCIe-3D; 3.0 (2025) 48–64 GT/s | CONFIRMED | | UCIe Consortium |
| 38 | NV-HBI 10 TB/s, "~330 GB/s per mm each way" | MINOR | 10 TB/s is the aggregate; ~330 GB/s per mm of edge total; reworded | NVIDIA |
| 39 | Quantum-X Photonics 144 × 800G; Spectrum-X 512 × 800G; 1.6 Tb/s engines; 3.5× efficiency, 4× fewer lasers | CONFIRMED | | NVIDIA GTC 2025 |
| 40 | Further Reading: Lau 2021/2023, Xilinx WP380, NVIDIA Blackwell brief; Asianometry essays | CONFIRMED except Asianometry (replaced) | | publishers |

## Edits applied
- Intro: HBM wire count corrected to ~8,000 data bits / ~13,000 signals (was 16,000).
- CoWoS-L: Blackwell redesign story attributed (SemiAnalysis/The Information, NVIDIA "GPU mask" confirmation) and 5.5× yield updated to TSMC's >98% (2026 symposium).
- Variant table: MI350 moved to CoWoS-S; MI400 marked "reported" under CoWoS-L; 5.5× shown as HVM in 2026.
- Step 5: substrate thickness ~2–3 mm with ~1 mm core. Step 6: liquid-metal TIM hedged.
- KGD section: GPU die, HBM stack and assembly part values re-baselined (consistent with Module 15 pricing and the module's own worked example); same in Where This Fits.
- Fabs: AP1–AP8 list corrected (AP2 Tainan, AP3 Longtan, AP5 Taichung; AP8 size).
- SoIC: density ratio 55× (not 500×); 4.5 µm dated ~2029; CTE sentence in anneal step corrected; wafer thermal-growth figure corrected to ~0.8 µm/°C; pitch roadmap table rows for 2027–2030 re-dated.
- CoPoS: pilot location hedged, "mid-2026", ABF panel standard wording.
- NV-HBI bandwidth-per-mm wording clarified (aggregate).
- Key Numbers: hybrid-bond roadmap and interposer-size rows updated. Key Players: HBM shares aligned with Module 15.
- Further Reading: Asianometry entry replaced with SemiAnalysis and Tom's Hardware articles confirmed to exist.
- Quiz Q4 (option text and explanation: ~50–60×) and Q5 (option and explanation: $5,000–7,000 parts, die/stack values) corrected; answers unchanged.
- Cross-module: Module 16's substrate roadmap line aligned to the 120 × 150 mm / 9.5× figure used here.

## Remaining caveats
- CoWoS wafer prices, per-package assembly cost, die and HBM stack costs are analyst estimates; TSMC and the memory makers do not publish them.
- Capacity numbers (wpm, outsourced volumes, NVIDIA's share) are supply-chain estimates that shift quarterly.
- Energy-per-bit and bandwidth-density table values are representative ranges from specs and papers, not measurements of any specific product.
- HBM3E microbump/signal counts (~1,500–1,800 signals, ~5,000–6,000 bumps) are order-of-magnitude figures derived from the JEDEC channel structure.
- The B200 redesign narrative rests on SemiAnalysis/The Information reporting plus NVIDIA's brief "GPU mask" acknowledgement; TSMC has never described the failure mechanism publicly.
