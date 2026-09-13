# Review: Module 19 — Building an NVIDIA GPU: From RTL to Rack
Reviewer summary: The shipping-product data (A100, H100, H200, B200, B300), GH100 microarchitecture, EDA tool names, NVL72 rack numbers, cuLitho figures and the worked arithmetic (dies per wafer, yield models, racks per 100 MW) all check out, and the Rubin row matches NVIDIA's CES 2026 disclosures. The module needed several corrections on the supply-chain and roadmap side: TSMC Fab 20 is an N2 fab, not N3; Amkor Arizona is a 2028 (not 2026–27) site; total DRAM output was understated by roughly 5× (~300k vs ~1.5M+ wafers per month), which broke the HBM crowd-out argument; the "1M B200s = a full year of 2024 CoWoS capacity" line contradicted the module's own worked example (17%); IMS Nanofabrication is majority-, not wholly, Intel-owned; the Blackwell 2024 event was a design-flaw mask change, not a "mask-layer defect"; and the Rubin Ultra/Kyber roadmap now carries the July 2026 reports of a slip to 2028. Every 2025–26 roadmap figure is now explicitly labelled announced or reported rather than measured.
Overall verdict: Needed several corrections
Claims checked: 48   Confirmed: 30   Minor: 8   Wrong: 5   Unverifiable: 5

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | H100 die 814 mm², 80B transistors, TSMC 4N | CONFIRMED | | NVIDIA H100 whitepaper |
| 2 | GH100: 8 GPC × 9 TPC × 2 SM = 144 SMs; 128 FP32/SM; 4 Tensor Cores; 256 KB RF; 256 KB L1/shared; 50 MB L2; 12 × 512-bit HBM3 controllers; 18 NVLink4 × 50 GB/s = 900 GB/s; PCIe Gen5 | CONFIRMED | | H100 whitepaper |
| 3 | Tensor Core 8 × 4 × 16 FP16 MAC per clock | CONFIRMED | 512 FMA/clk/TC; 528 TC × 1.83 GHz × 1,024 FLOP = 989 TFLOPS dense, matches spec | arithmetic vs H100 spec |
| 4 | H100 SXM5: 132 of 144 SMs, 5 of 6 HBM3, 80 GB, 3.35 TB/s, 700 W | CONFIRMED | | NVIDIA |
| 5 | Blackwell: 2 × ~104B = 208B, 4NP, NV-HBI 10 TB/s, CoWoS-L with LSI bridges | CONFIRMED | | NVIDIA Blackwell brief |
| 6 | Palladium Z2/Z3 (processor-based), ZeBu EP1/EP2 (AMD FPGAs); Z3 tens of billions of gates; ~1–10 MHz | CONFIRMED | Z3 scales to 48B gates | Cadence, Synopsys |
| 7 | "NVIDIA has said publicly for over a decade that it is Cadence's largest emulation customer" | MINOR | The claim is Cadence's and trade press's, not an NVIDIA statement; reworded to "widely reported (and cited by Cadence)" | Cadence, press |
| 8 | PrefixRL (DAC 2021, used in Hopper), AutoDMP, ChipNeMo, NVCell | CONFIRMED | | NVIDIA research |
| 9 | EDA tool names: VCS, Xcelium, JasperGold, VC Formal, Fusion Compiler, Design Compiler, Genus, Innovus, ICC II, PrimeTime, Tempus, StarRC, Quantus, RedHawk-SC, Voltus, Calibre, IC Validator, Pegasus, TestMAX, Tessent, PrimePower, PowerArtist | CONFIRMED | All current product names | vendor sites |
| 10 | Synopsys acquired Ansys in 2025 | CONFIRMED | Closed 17 July 2025 | Synopsys PR |
| 11 | M0 pitch ~28–30 nm at 4N; ~15–18 metal layers; ~80 mask layers | CONFIRMED | N5-family M0 pitch 28 nm; layer counts approximate | WikiChip/TechInsights |
| 12 | 4N is a custom N5-family node; 4NP for Blackwell; Rubin on N3P | MINOR | NVIDIA discloses only "TSMC 3 nm" for Rubin; N3P is from trade reports; hedged in text, table and Key Numbers | ServeTheHome CES 2026 |
| 13 | cuLitho: 350 H100 systems replace 40,000 CPU servers, ~40×, +2× from GenAI; TSMC/Synopsys production 2024 | CONFIRMED | GTC 2024 release | NVIDIA Newsroom |
| 14 | IMS Nanofabrication "owned by Intel" | MINOR | Majority-owned by Intel; Bain Capital ~20% (June 2023) and TSMC ~10% (Sept 2023, $430M) | Intel Newsroom Sept 2023 |
| 15 | EUV blank: 40-bilayer Mo/Si, Ta absorber, Hoya/AGC; Lasertec ACTIS; Zeiss MeRiT; pellicle | CONFIRMED | | vendor sites |
| 16 | Mask set ~$20–30M, EUV mask $300–500k, ~12–15 EUV layers | UNVERIFIABLE | Industry estimates; left hedged "on the order of" | none primary |
| 17 | Blackwell 2024: "a mask-layer defect ... forced a respin ... Jensen confirmed 'design flaw'" | WRONG (wording) | It was a yield-limiting design flaw fixed by a mask change (reportedly top metal and bumps); Huang, 23 Oct 2024: "design flaw", "100% NVIDIA's fault"; delay ~1 quarter. Rewritten | Tom's Hardware, DigiTimes Oct 2024 |
| 18 | A100: 826 mm², 54.2B, N7, 108/128 SMs, 5/6 HBM2e, 40/80 GB, 1.6/2.0 TB/s, 400 W | CONFIRMED | 1.555/2.039 TB/s | NVIDIA |
| 19 | H200: 141 GB HBM3E, 4.8 TB/s, 700 W | CONFIRMED | | NVIDIA |
| 20 | B200: 192 GB (180 GB some SKUs), 8 TB/s, ~1,000 W HGX / ~1,200 W GB200 | CONFIRMED | | NVIDIA HGX/GB200 pages |
| 21 | B300: 288 GB HBM3E 12-high, ~1,400 W, ~1.5× B200 dense FP4, 8 TB/s | CONFIRMED | 2025 launch figures | NVIDIA |
| 22 | Rubin: 336B transistors, 2 reticle dies, 288 GB HBM4, 22 TB/s, 50 PF NVFP4, NVLink 6 3.6 TB/s, 2H 2026; Vera 88 Olympus cores | CONFIRMED (announced) | CES 2026; "TSMC 3nm"; 35 PF training | ServeTheHome, TechPowerUp Jan 2026 |
| 23 | Rubin power ~1,800 W class (est.) | UNVERIFIABLE | Not disclosed; reports range 1,800–2,300 W; table now says "reported, not disclosed" | SemiAnalysis reports |
| 24 | Rubin Ultra: 4 reticle dies, 16 × HBM4E 1 TB, ~100 PF FP4, Kyber NVL576 ~600 kW, 2H 2027 | MINOR | GTC 2025 roadmap confirmed; but July 2026 SemiAnalysis/CNBC/Tom's Hardware report Kyber rack slipping to 2028 (midplane PCB), NVL72x2 stopgap dropped; added to table, note, rack section, Key Numbers | Tom's Hardware, CNBC 6 July 2026 |
| 25 | Rubin CPX: 128 GB GDDR7, ~30 PF NVFP4, announced Sept 2025, end 2026 | CONFIRMED | | NVIDIA Sept 2025 |
| 26 | "Vera Rubin NVL144 (renamed VR200 NVL72 in some 2026 materials)" | MINOR | Renamed "Vera Rubin NVL72" at CES 2026 (72 packages, 144 dies, 36 Vera); ~20.7 TB HBM4 per rack; reworded | ServeTheHome, VideoCardz |
| 27 | Fab 18 Tainan Phases 1–4 N5-family, 5–8 N3; CoWoS at Chunan AP6, Longtan AP3, Taichung AP5, Chiayi AP7 | CONFIRMED | | TrendForce Dec 2024 |
| 28 | "Fab 20 Hsinchu for N3" | WRONG | Fab 20 (Hsinchu Baoshan) and Fab 22 (Kaohsiung) are N2 fabs; N3 is Fab 18 Phases 5–8. Fixed in supplier tree and Key Players | TSMC |
| 29 | TSMC Arizona Fab 21 N4 from 2025 | CONFIRMED | Blackwell wafers from Arizona announced Oct 2025 | NVIDIA/TSMC |
| 30 | Amkor Arizona from 2026–27 | WRONG | Peoria: construction complete mid-2027, production early 2028. Fixed in supplier tree and Key Players | Amkor PR Oct 2025 |
| 31 | H100 lead time ~52 weeks in 2023 | CONFIRMED | Widely reported | trade press |
| 32 | Dies per wafer: 62 gross; Poisson 0.44, Murphy 0.47 at D0 0.1; $16.5k/45 ≈ $370 | CONFIRMED | Recomputed | arithmetic |
| 33 | NVSwitch gen3 64 ports × 50 GB/s; NVLink 5 switch 72 ports × 100 GB/s = 7.2 TB/s; HGX B200 has 2 chips | CONFIRMED | Switch tray: 2 chips, 144 ports at 100 GB/s | NVIDIA, HPE QuickSpecs |
| 34 | DGX H100 10.2 kW, Xeon 8480C, 6 × 3.3 kW PSU, 8 × CX-7, 2 × BF-3; DGX B200 14.3 kW, Xeon 8570 | CONFIRMED | | NVIDIA DGX datasheets |
| 35 | DGX H100 ~$300–400k; HGX H100 baseboard ~$200–300k (2023) | UNVERIFIABLE | No list price; market reports $250–400k DGX, $250–320k HGX; hedged "reported" | resellers |
| 36 | Grace 72 Neoverse V2, 480 GB LPDDR5X ~500 GB/s, NVLink-C2C 900 GB/s, GB200 superchip ~2,700 W | CONFIRMED | | NVIDIA |
| 37 | NVL72: "OCP-derived 48-OU" rack, ~1.36 t | MINOR | Weight 1.36 t (3,000 lb) confirmed; height 2,236 mm; OU count not confirmed, replaced with "ORv3-derived, ~2.2 m tall" | Sunbird, NVIDIA |
| 38 | NVL72: 18 compute + 9 switch trays, 18 switch chips, 130 TB/s, 13.4 TB HBM3E, 17 TB LPDDR5X, 6–8 power shelves × 33 kW, ~5,000 cables ~2 miles, 120–132 kW | CONFIRMED | 6 (max 8) shelves at 33 kW | NVIDIA GB200 NVL72 page, HPE QuickSpecs |
| 39 | Copper spine saves ~20 kW per rack; 200 Gb/s copper reach ~1–1.5 m | CONFIRMED | NVIDIA GTC 2024 statement | NVIDIA |
| 40 | GB300 NVL72 ~135–142 kW; VR NVL72 ~190–230 kW | UNVERIFIABLE | Reports vary; hedged "nominal"/"reported" | trade press |
| 41 | CPO switches (Quantum-X / Spectrum-X Photonics, TSMC COUPE) announced GTC 2025, "shipments in 2026" | MINOR | Quantum-X Photonics slated late 2025, Spectrum-X Photonics 2026; fixed | NVIDIA GTC 2025 release |
| 42 | ZT Systems bought by AMD 2024, manufacturing to Sanmina 2025; Foxconn Houston / Wistron Dallas, April 2025, $500B | CONFIRMED | AMD close Mar 2025; Sanmina deal 2025 | AMD, NVIDIA PR |
| 43 | NVIDIA contributed NVL72 designs to OCP in 2024; Further Reading title "NVIDIA Contributes NVIDIA GB200 NVL72 Designs to Open Compute Project" | WRONG (title) | Actual: "NVIDIA Contributes Blackwell Platform Design to Open Hardware Ecosystem, Accelerating AI Infrastructure Innovation", NVIDIA Newsroom, 15 Oct 2024; fixed | nvidianews.nvidia.com |
| 44 | NVIDIA gross margin ~75% FY2025, ~70–75% in Blackwell ramp | CONFIRMED | FY2025 GAAP 75.0% | NVIDIA 10-K |
| 45 | TSMC revenue from NVIDIA ~10–13% in 2024, ~20% in 2025, at or above Apple | MINOR | 12% (2024) and 19% (2025) vs Apple 17%, per TSMC annual-report disclosure reported Jan 2026; fixed | CNBC 26 Jan 2026, TechPowerUp |
| 46 | CoWoS capacity ~15k early 2023, ~35k end-2024, ~75–80k end-2025, ~120–130k end-2026; ~16 B200 per wafer; "1M B200s ≈ 60k wafers, close to a full year of 2024 capacity" | WRONG (last clause) | Capacity figures match TrendForce/analyst estimates (2023 hedged to 10–15k). 60k wafers is ~2 months of end-2024 capacity (~15–20% of the year), which is what the module's own worked example computes (17%); fixed | TrendForce Dec 2024, Jan 2025, Jun 2026 |
| 47 | Total DRAM output "~300,000+ wafers per month at the three vendors" | WRONG | Samsung ~mid-600k, SK hynix ~400–600k, Micron ~350–400k wpm; ~1.5M+ at the three, ~2.0–2.25M industry-wide (SEMI). Sentence rewritten; HBM ~30% of SK hynix DRAM wafer starts in 2025 used for the crowd-out argument | SEMI via lambdafin, TrendForce, DCD |
| 48 | HBM3E 24 Gb die ~110–120 mm²; ~450 gross die/wafer; HBM ~5% bits / 30–40% revenue; ~3× wafer per bit | MINOR | Die size not independently confirmed (DDR5 16 Gb dies are 66–75 mm², so 110–120 for 24 Gb with TSVs is plausible; hedged "reportedly"); at 115 mm² gross is ~540, so changed to ~500 gross at ~70% net = ~350 good (downstream numbers unchanged). Bit/revenue shares and 3× wafer factor match TrendForce/Micron | TrendForce, Micron |

## Edits applied
- Verification section: emulation-customer sentence reworded from "NVIDIA has said publicly" to "widely reported (and cited by Cadence)".
- PDK/4N section and table/Key Numbers: Rubin node hedged to "TSMC 3 nm (reported N3P)" since NVIDIA discloses only 3 nm.
- Mask making: IMS Nanofabrication now "majority-owned by Intel, with Bain Capital and TSMC holding minority stakes since 2023".
- Bring-up section: Blackwell 2024 event rewritten as a yield-limiting design flaw fixed with a mask change (reported top-metal/bump changes, a metal-level respin), with Huang's October 2024 "design flaw" / "100% NVIDIA's fault" statement.
- Dies table: Rubin row marked announced/reported (power "~1,800–2,300 W (reported, not disclosed)", "2H 2026 (announced)"); Rubin Ultra row gained the missing Power cell (the row was one cell short and broke the table) and the Kyber-slip note; provenance paragraph now flags the July 2026 report that Kyber slipped to 2028.
- NVL72 section: "OCP-derived 48-OU" replaced with "OCP ORv3-derived design ~2.2 m tall".
- Roadmap paragraph: Vera Rubin naming corrected (NVL144 at GTC 2025 counting dies, renamed Vera Rubin NVL72 at CES 2026 counting packages; ~20.7 TB HBM4 per rack); Kyber described as NVL576 by dies / NVL144 by packages, with the July 2026 slip-to-2028 report and dropped NVL72x2 stopgap.
- Networking: CPO timing corrected to Quantum-X Photonics late 2025, Spectrum-X Photonics 2026.
- Economics: TSMC customer share corrected to 12% (2024) / 19% (2025), Apple 17%; CoWoS 2023 capacity hedged to ~10–15k; "close to a full year of 2024 capacity" corrected to "roughly two months ... ~15–20% of a full 2024 year"; Samsung HBM3E qualification dated to September 2025.
- Supplier tree: Fab 20 (and Fab 22) identified as N2, not N3; Amkor Arizona changed to Peoria from 2028. Key Players: TSMC fab list drops Fab 20; Amkor row says 2028.
- Worked example (HBM): gross die per wafer ~500 at ~70% net yield (good-die count and wafer totals unchanged); DRAM industry output corrected to ~1.5M+ wpm at the three vendors (~2M industry-wide) with the crowd-out argument restated using HBM's ~30% share of SK hynix wafer starts.
- Key Numbers: Rubin and Rubin Ultra rows updated with announced/reported labels, Vera Rubin NVL72 name, and the 2028 slip report.
- Further Reading: OCP item retitled to the real NVIDIA Newsroom release (Oct 2024); unverifiable Tom's Hardware "Vera Rubin platform in depth" replaced with Tom's Hardware's July 2026 Kyber-delay article and ServeTheHome's CES 2026 Rubin launch article.
- Quiz: Q2 explanation reworded from "mask-layer respin" to "mask change (a metal-level respin to fix a yield-limiting design flaw)"; JSON validated; answers unchanged.

## Remaining caveats
- All Rubin, Rubin Ultra, Vera, Kyber, Rubin CPX and CPO figures are NVIDIA announcements (GTC 2025, Sept 2025, CES/GTC 2026) or analyst reports; none are independently measured, and the Kyber/Rubin Ultra timing is in flux as of mid-2026.
- Rubin GPU power (1,800–2,300 W) and rack power for GB300 NVL72 and Vera Rubin NVL72 are reported figures with no NVIDIA datasheet value.
- BOM and COGS figures (H100 $3,000–3,500, B200 $6,000–8,000, GB200 superchip ~$14k, HBM $/GB, wafer $16–17k, mask set $20–30M) are third-party estimates (SemiAnalysis and others) and should be read as ranges.
- CoWoS capacity numbers are analyst estimates (TrendForce, Morgan Stanley), not TSMC disclosures, and have been revised upward repeatedly.
- The HBM3E 24 Gb die area (~110–120 mm²) and TSMC N5-family capacity (~150k wpm) are plausible but not confirmed by a primary source; the worked example is order-of-magnitude only.
- DGX/HGX prices are reseller-observed, since NVIDIA publishes no list price.
- The 4N/4NP "custom node" description is the common industry understanding; TSMC and NVIDIA do not disclose what is customized.
