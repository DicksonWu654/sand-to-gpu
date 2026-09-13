# Review: Module 00 — The Whole Supply Chain on One Page
Reviewer summary: The module is structurally sound and the mechanism content (Siemens process, CZ, CoWoS flow, chokepoints) is accurate. The biggest problems were stale or wrong market numbers: the 2025 chip market was $791.7B not ~$700B, equipment was $135B, ASML shipped 48 EUV tools in 2025, Amkor Arizona does not start until 2028, and the share of MG-Si refined into polysilicon is ~35% (solar), not 10–15%. One arithmetic error in the die-per-wafer worked example (the edge term was 23.4, not 11.7) and one wrong company name (Micronas is a sensor firm; the probe-card maker is Micronics Japan) were fixed.
Overall verdict: Needed several corrections
Claims checked: 42   Confirmed: 28   Minor: 7   Wrong: 6   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Blackwell: two ~800 mm² dies, 208B transistors, 8 HBM3E stacks | CONFIRMED | Matches NVIDIA Blackwell brief | NVIDIA Blackwell Technical Brief |
| 2 | Semiconductor market ~$700B in 2025 (WSTS), $1T before 2030 | WRONG | $791.7B in 2025 (+25.6%); WSTS spring-2026 forecast ~$1.5T for 2026 | semiconductors.org (SIA, Feb 2026); wsts.org spring 2026 release |
| 3 | Equipment capex sales ~$120–130B in 2025 | MINOR | $135.1B actual (SEMI, Apr 2026) | semi.org press release |
| 4 | Materials ~$70–75B/yr | UNVERIFIABLE (plausible) | SEMI 2024 was $67.5B; 2025 slightly higher | SEMI materials report |
| 5 | ASML shipped 44 EUV in 2024, ~50 in 2025 | MINOR | 44 in 2024, 48 in 2025 (EUV revenue €11.6B) | ASML 2025 Annual Report |
| 6 | NXE:3800E ~180 t, ships in ~13 containers | WRONG (containers) | 180 t, ~40 freight containers, 20 trucks, 3 cargo planes | ASML product pages / Silicon Canals |
| 7 | NXE:3800E ~220 wph at 30 mJ/cm², 50,000 droplets/s | CONFIRMED | ASML spec | asml.com NXE:3800E page |
| 8 | High-NA ~$380M; production at Intel, evaluation at TSMC, Samsung, SK hynix, Micron | MINOR | ~$380–400M; Samsung and SK hynix installed EXE:5200B in 2025; TSMC R&D only and deferred; Micron not confirmed, imec has one | TrendForce Feb/Mar/May 2026 |
| 9 | Amkor Arizona from 2026–27 | WRONG | Construction complete mid-2027, production early 2028 | Amkor IR release Oct 2025 |
| 10 | MG-Si ~4 Mt/yr, ~75% China, only ~10–15% refined for solar/electronics | WRONG | USGS: 4.6 Mt silicon metal in 2024, China 3.9 Mt (~85%); ~35% goes to polysilicon, ~40% aluminum, ~25% silicones | USGS MCS 2025; SMM / AlCircle |
| 11 | OCI (Malaysia) as electronic-grade producer | MINOR | Electronic grade is at Gunsan, Korea; Malaysia EG line starts 2026 | OCI / Bernreuter |
| 12 | Probe cards: FormFactor, Micronas, Technoprobe | WRONG | Micronics Japan (MJC), not Micronas (TDK sensor unit) | Industry knowledge |
| 13 | TSMC capacity >17M 12-inch-equivalent wafers in 2025 | CONFIRMED | Annual report: >17M capacity, 15.0M shipped | TSMC 2025 Annual Report |
| 14 | CoWoS ~35k (end-2024), ~75–80k (end-2025), 120–130k (end-2026) | CONFIRMED | TrendForce reports same ranges | TrendForce Dec 2024, Jun 2026 |
| 15 | SK hynix HBM share ~50–60%; Micron ~20%+ | CONFIRMED | Q2 2025: SK hynix 62%, Micron 21%, Samsung 17% (Counterpoint); ~50% in Q2 2026 | Counterpoint / TrendForce |
| 16 | NVIDIA is TSMC's largest customer by revenue | CONFIRMED | 19% of TSMC 2025 revenue vs Apple 17% | TSMC 2025 AR / CNBC Jan 2026 |
| 17 | HBM ~$20/GB; ~$150–300+ per stack | MINOR | Estimates range $8–20/GB; HBM3E 36 GB stacks ~$300–700 | siliconanalysts.com, trade press |
| 18 | Die-per-wafer arithmetic: 86.8 − 11.7 ≈ 75 | WRONG (arithmetic) | π·d/√(2A) = 942.5/40.35 = 23.4, giving ≈ 63 | Recomputed |
| 19 | H100: 814 mm², 80B transistors, 132/144 SMs, 5 HBM3 stacks (6th dummy) | CONFIRMED | NVIDIA H100 whitepaper | NVIDIA |
| 20 | H100 BOM ~$3,300 analyst estimate; sold ~$25–30k | CONFIRMED | Raymond James ~$3,320 | Trade press 2023 |
| 21 | Poisson yield e^(−8.14×0.1) ≈ 44% | CONFIRMED | Recomputed | — |
| 22 | Wafer prices N4 ~$16–17k, N3 ~$18–20k, N2 ~$30k | CONFIRMED | Widely reported; N2 $30k | TrendForce / trade press |
| 23 | Silicon melts at 1,414 °C; SAF ~2,000 °C at tips; 11–13 MWh/t | CONFIRMED | Standard values | Textbook |
| 24 | TCS boils at 32 °C; hydrochlorination ~300 °C; Siemens rods ~1,100 °C | CONFIRMED | 31.8 °C; 300–350 °C; 1,100–1,150 °C | Textbook |
| 25 | Spruce Pine shut by Hurricane Helene for a few weeks in 2024 | CONFIRMED | Sept 26 to mid-Oct 2024 | Sibelco statements |
| 26 | Five wafer makers ~90% of 300 mm; Japan ~55–60% | CONFIRMED | Shin-Etsu + SUMCO ~55% | SEMI / trade press |
| 27 | GB200 NVL72: 72 GPU, 36 CPU, 18+9 trays, ~120–140 kW, ~5,000 cables, ~$3–4M | CONFIRMED | NVIDIA specs; price is analyst estimate | NVIDIA / trade press |
| 28 | H100 700 W, B200 1,000 W, GB300 1,400 W | CONFIRMED | NVIDIA specs | NVIDIA |
| 29 | B200 180 GB HBM3E; Rubin 288 GB HBM4 | CONFIRMED | HGX B200 spec 180 GB; Rubin 288 GB | NVIDIA |
| 30 | HBM3 1,024-bit, HBM4 2,048-bit interface | CONFIRMED | JEDEC | JEDEC |
| 31 | HBM sold out for 2025 and 2026 in advance | CONFIRMED | SK hynix statements May 2024, Sept 2025 | SK hynix |
| 32 | TSMC Fab 18 (N5/N3) Tainan, Fab 20 Hsinchu, Fab 22 Kaohsiung (N2) | CONFIRMED | TSMC | TSMC |
| 33 | TSMC Arizona N4 production late 2024 | CONFIRMED | Q4 2024 | TSMC |
| 34 | Rapidus 2 nm in 2027 | CONFIRMED | Rapidus roadmap | Rapidus |
| 35 | TSMC gross margin ~55–60%; ~65–70% of foundry revenue; capex ~$40B | CONFIRMED | 2025 GM ~59–60%; TrendForce ~70%; 2025 capex ~$41B | TSMC IR |
| 36 | TSMC founded 1987 | CONFIRMED | — | TSMC |
| 37 | Blackwell interposer ~3.3 reticle; ~16 packages per CoWoS-L wafer | CONFIRMED (approx.) | TSMC: CoWoS-L 3.5x reticle in volume since 2024; 3.3x cited for Blackwell | TSMC CoWoS page |
| 38 | AP7 Chiayi, AP8 Tainan | CONFIRMED | TSMC | TSMC / TrendForce |
| 39 | DRAM makers converted ~20–30% of wafer capacity to HBM | MINOR (unsupported specific) | Reworded to the bit-vs-wafer ratio logic (~3x wafer area per bit) | TrendForce |
| 40 | Samsung #1 DRAM by revenue | MINOR | SK hynix overtook Samsung in DRAM revenue during 2025; positions traded | Counterpoint / TrendForce |
| 41 | Advantest/Teradyne ~60/30; TEL ~90% tracks; DISCO ~70–80%; KLA ~50–60% | CONFIRMED (approx.) | Standard share estimates | Trade press |
| 42 | Further Reading items exist (Chip War, Mack, Plummer, Tummala, TSMC Fab Capacity/GIGAFAB pages, Silicon Analysts) | CONFIRMED | All exist; siliconanalysts.com is a real site | Web |

## Edits applied
- Chain table row 3: added Korea to polysilicon locations (OCI's electronic grade is in Gunsan).
- Chain table row 9: HBM price per stack widened to ~$200–700 by generation; per-GB hedged to ~$15–20 (estimates vary); Micron locations corrected (Taiwan/Japan; Singapore/USA ramping).
- Chain table row 10: added Tainan to TSMC packaging sites; Amkor Arizona changed from "2026–27" to "production from ~2028".
- Quartz to MG-Si section and chain table row 2: world output ~4.6 Mt (USGS 2024), China ~80–85%; end-use split corrected (~40% aluminum, ~25% silicones, ~a third to polysilicon, almost all solar).
- Polysilicon section: OCI location fixed to Korea (Malaysia EG line 2026); Wacker noted as Germany and USA.
- Wafer sort section: "Micronas" replaced with "Micronics Japan".
- Money flow: 2025 market corrected to ~$790B ($791.7B SIA/WSTS), 2026 forecast >$1T (WSTS May 2026 ~$1.5T); HBM per-GB hedged to ~$15–20.
- Industry table: equipment sales corrected to ~$135B (SEMI).
- EUV chokepoint: containers corrected to ~40 (three 747s, ~20 trucks); High-NA price ~$380–400M; customer list corrected (Samsung and SK hynix installed 2025, TSMC R&D only/deferred, imec; Micron removed); 2025 EUV shipments corrected to 48.
- Packaging/HBM chokepoint: replaced unsupported "converted ~20–30% of DRAM wafer capacity" with the wafer-per-bit reasoning.
- Worked example (H100): die-per-wafer arithmetic fixed (86.8 − 23.4 ≈ 63), consistent with the ~60–65 gross die used downstream.
- Key Numbers: EUV row (High-NA ~$380–400M; 44/48 shipments), HBM row (~$15–20/GB, estimates vary), market row (~$790B; equipment ~$135B; 2026 >$1T).
- Key Players: Samsung DRAM rank hedged to #1–2 (traded places with SK hynix in 2025).
- CZ cycle time harmonized with Module 02: "3–4 days per crystal" changed to "~2.5–3.5 days" in the chain table, the crystal-growth paragraph, and Key Numbers.
- Quiz: no changes needed; all eight answers verified consistent with corrected text.

## Remaining caveats
- HBM price per GB and per stack: public estimates differ by 2x ($8–20/GB); treat all HBM cost figures as order-of-magnitude.
- B200 package "~100 × 100 mm" and the "~3.3-reticle" interposer are trade-press figures, not NVIDIA/TSMC disclosures; TSMC's own page cites 3.5x reticle for its first volume CoWoS-L.
- Wafer prices by node are analyst estimates of foundry pricing, not published list prices.
- Data-center cost per MW (~$30–50M) and cluster costs are rough and depend heavily on GPU generation.
- Fab cost, step count, and mask-layer counts are ranges that vary by node and source.
