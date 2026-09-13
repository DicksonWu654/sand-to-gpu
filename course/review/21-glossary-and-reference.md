# Review: Module 21 — Glossary and Reference
Reviewer summary: This is a reference module (exempt from the Misconceptions / Further Reading / worked-example requirements) and it is in good shape: the node table's pitches, fin pitches, densities and HVM years match WikiChip/TechInsights/foundry disclosures, the sense-of-scale table is dimensionally correct row by row, ~40 spot-checked glossary definitions were accurate (formulas for Deal-Grove, Black, Murphy, negative-binomial, Arrhenius, Rayleigh, Little's law, segregation coefficients, Voronkov all verified), and the 122-step master flow is in a sensible order with only one cross-reference error. The real errors were arithmetic and bookkeeping: "thirteen orders of magnitude" (it is ten), "4 × 10⁸ metal pitches" (10⁶), an ArFi Rayleigh figure stated as pitch when it is half-pitch, the HBM branch cited as steps 84–96 merging at step 100 when it is steps 78–87 merging at step 90, a garbled sentence about DuPont's CMP pad business, an HGX NVSwitch count that is 4 on H100 but 2 on B200, and a few density figures presented as vendor claims that are analyst estimates.
Overall verdict: Accurate with minor fixes
Claims checked: 83   Confirmed: 67   Minor: 10   Wrong: 6   Unverifiable: 0

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Node table: N16 CPP 90 / MP 64 / fin 48 / ~29 MTr/mm², 2015 | CONFIRMED | | WikiChip |
| 2 | N10 CPP 66 / MP 44 / fin 36 / ~52, 2017 | CONFIRMED | | WikiChip |
| 3 | N7 CPP 57 / MP 40 / fin 30 / ~91, 2018, SAQP, N7+ ~4 EUV layers | CONFIRMED | | WikiChip; TSMC |
| 4 | N5 CPP 51 / MP 30 (M0 28) / fin 28 / ~138 measured, 171 claimed; ~14 EUV layers | CONFIRMED | | WikiChip; TechInsights; TSMC |
| 5 | N3E CPP 48 / MP 23 / fin 26 / ~200–215 | CONFIRMED (hedged) | Pitches from TechInsights; density is an estimate range | TechInsights |
| 6 | N2 ~230–250 est., "TSMC claims up to ~313" | MINOR | TSMC states only ~1.15× N3E; 313 is an analyst extrapolation | TSMC; WikiChip |
| 7 | N2 HVM H2 2025; A16 late 2026/2027; A14 ~2028 | CONFIRMED | N2 volume production began Q4 2025 | TSMC |
| 8 | Intel 7 CPP 54(60) / M0 40 / fin 34 / ~100; Intel 4 CPP 50 / M0 30, first Intel EUV, 2023 | CONFIRMED | | Intel/WikiChip |
| 9 | Intel 18A MP 32 nm, RibbonFET + PowerVia, Panther Lake late 2025; "~238 (Intel)" | MINOR | Intel has not published an absolute density; hedged to 200–240 est. | Intel |
| 10 | Samsung 7LPP 2018 first EUV HVM; CPP 54 / MP 36 / fin 27; 5LPE ~127 | CONFIRMED | | WikiChip |
| 11 | 3GAE 2022 first GAA in production; SF2 "~231 (claimed)" | MINOR | Samsung has not claimed 231; hedged to ~200–230 est. | Samsung |
| 12 | SMIC N+2 2023 (Kirin 9000S), DUV SAQP; N+3 2024–25 low yield | CONFIRMED | | TechInsights |
| 13 | Rapidus pilot 2025, HVM 2027, NXE:3800E | CONFIRMED | Consistent with Module 20 | Rapidus |
| 14 | CPP flat at 45–50 nm since N5; litho share ~25% at N16 to ~35–40% at N2 | CONFIRMED (estimate) | Consistent with industry cost models | SemiAnalysis/IBS |
| 15 | Scale table: reticle 858 mm², H100 814 mm² | CONFIRMED | | NVIDIA; ASML |
| 16 | NVL72 rack ~2 m, ~1.4 t, 18 compute + 9 switch trays, 72 GPUs | CONFIRMED | ~1.36 t | NVIDIA |
| 17 | DGX B200 is 10U | CONFIRMED | | NVIDIA |
| 18 | Blackwell: two ~800 mm² dies, 8 HBM3E, CoWoS-L, interposer ~3.3× reticle | CONFIRMED (hedged) | | NVIDIA; TSMC |
| 19 | Wafer 300 mm / 775 µm / ~127 g | CONFIRMED | π×15²×0.0775×2.33 = 127 g | Calculation |
| 20 | HBM3E 12-high ~720 µm; DRAM die ~30 µm; TSV 5–10 µm; microbump ~40 µm | CONFIRMED | | SK hynix/JEDEC |
| 21 | Hybrid bond pitch ~6–9 µm (SoIC), roadmap ~1 µm | CONFIRMED | | TSMC |
| 22 | Tightest MP 23–25 nm (N3/N2), 32 nm (18A); CPP 45–48; Lg 12–16 nm | CONFIRMED | | TechInsights/Intel |
| 23 | Fin width ~6 nm; sheet 5–8 nm; EOT 0.8–1.0 nm, HfO₂ 1.5–2 nm | CONFIRMED | | Literature |
| 24 | Si lattice 0.543 nm; Si–Si bond 0.235 nm; atom ~0.22 nm | CONFIRMED | | Standard |
| 25 | "The chain spans thirteen orders of magnitude" | WRONG | 2 m / 2.2×10⁻¹⁰ m ≈ 10¹⁰: ten orders | Calculation |
| 26 | "Blackwell package about 4 × 10⁸ metal pitches wide" | WRONG | 90 mm / 23 nm ≈ 4 × 10⁶ | Calculation |
| 27 | Rack-to-gate-length ratio ≈ Earth diameter to golf ball | CONFIRMED | ~1.4×10⁸ vs ~3×10⁸, "roughly" | Calculation |
| 28 | Unit table: 1 Torr = 133 Pa; Si melts 1,414 °C; Cu 1.7 µΩ·cm; 9N/11N | CONFIRMED | | Standard |
| 29 | HBM3E ~1.2 TB/s per stack; NVLink 1.8 TB/s per GPU | CONFIRMED | 5th-gen NVLink | NVIDIA |
| 30 | EUV resist dose 20–40 mJ/cm² (unit table) vs stochastics "at ~10–20 mJ/cm²" (glossary) | MINOR (inconsistency) | Harmonized to production doses ~20–40 mJ/cm² | ASML/SPIE |
| 31 | Glossary: 1T1C ~10–20 fF, 64 ms refresh | CONFIRMED | | JEDEC |
| 32 | ALD ~0.1 nm/cycle | CONFIRMED | | Standard |
| 33 | Arrhenius AF formula; Key Numbers AF 20–100× at 125 vs 55 °C, Ea 0.7 eV | CONFIRMED | Computed AF ≈ 78 | Calculation |
| 34 | Aspect ratios: DRAM capacitor >50:1, NAND channel hole >60:1 | CONFIRMED | | Lam/Applied |
| 35 | ATE: Advantest V93000, Teradyne UltraFLEX; shares ~60% / ~30% | CONFIRMED (approx.) | | Company data |
| 36 | Black's equation n ≈ 1–2, Ea ≈ 0.8–1.0 eV for Cu | CONFIRMED | | JEDEC/literature |
| 37 | BOE 6:1 ~100 nm/min | CONFIRMED | 80–100 nm/min thermal oxide | Literature |
| 38 | Cleanroom ISO 1 ≤10 particles ≥0.1 µm per m³ | CONFIRMED | | ISO 14644-1 |
| 39 | COP ~100 nm octahedral voids | CONFIRMED | | Literature |
| 40 | Deal-Grove x² + Ax = B(t+τ) | CONFIRMED | | Deal & Grove 1965 |
| 41 | DRAM 1α/1β/1γ ≈ 14 / 12–13 / 11 nm class | CONFIRMED | | TechInsights |
| 42 | FinFET "Intel 22 nm (2011)" | MINOR | Announced 2011, shipped (Ivy Bridge) 2012 | Intel |
| 43 | FZ limited to ~200 mm | CONFIRMED | | Topsil/Siltronic |
| 44 | HKMG at Intel 45 nm (2007), HfO₂ k ≈ 20–25 | CONFIRMED | | Intel |
| 45 | Immersion NA 0.93 → 1.35 | CONFIRMED | | ASML |
| 46 | Ingot ~2 m, ~300 kg | CONFIRMED | ~330 kg for 2 m body | Calculation |
| 47 | k1 limit 0.25, practical 0.28–0.35 | CONFIRMED | | Mack |
| 48 | Little's law 100k wspm × 90 d ≈ 300,000 WIP | CONFIRMED | | Calculation |
| 49 | LPP: 30 µm Sn droplets, ~50 kHz, 20–30 kW CO₂ | CONFIRMED | | ASML/Trumpf |
| 50 | Mask 6-inch, 4×, 40 Mo/Si bilayers, Ta absorber; set 70–100+ masks, ~$20–30M | CONFIRMED (estimate) | Module 20 says ~$25–30M; compatible | Industry |
| 51 | MTr/mm² Intel 2017 formula 0.6 NAND2 + 0.4 SFF | CONFIRMED | | Intel (Bohr 2017) |
| 52 | Murphy, Poisson, negative binomial formulas | CONFIRMED | | Standard yield texts |
| 53 | NV-HBI 10 TB/s | CONFIRMED | | NVIDIA |
| 54 | Panel 510 × 515 mm | CONFIRMED | | Industry |
| 55 | EUV pellicle >90% transmission | MINOR | 83–88% (poly-Si gen), ~90%+ (metal silicide), CNT higher; hedged | ASML/Mitsui |
| 56 | Reticle limit High-NA 26 × 16.5 mm = 429 mm² | CONFIRMED | | ASML |
| 57 | Segregation k₀: B 0.8, P 0.35, O ~1.25 | CONFIRMED | | Standard |
| 58 | Voronkov critical v/G ~0.13–0.20 mm²/(K·min) | CONFIRMED | | Voronkov 1982 |
| 59 | SS thermal limit 60 mV/dec at 300 K | CONFIRMED | | Standard |
| 60 | wph: NXE:3800E ~220, NXT:2100i ~295 | CONFIRMED | | ASML |
| 61 | UCIe ~2–5+ Tb/s per mm shoreline | CONFIRMED | Spec range 1.3–10.5 Tb/s/mm advanced package | UCIe 1.1 |
| 62 | WFE ~$100–120B as of ~2025 | CONFIRMED | $104B (2024), ~$116B (2025) | SEMI |
| 63 | Rayleigh Key Numbers row: "~38 nm pitch ArFi" | WRONG | 0.25×193/1.35 = 36 nm half-pitch; single-exposure ArFi pitch ~76–80 nm in practice | Calculation |
| 64 | Poisson 800 mm² at D0 0.1 ≈ 45% | CONFIRMED | e^(−0.8) = 0.449 | Calculation |
| 65 | Flow intro: HBM branch steps 84–96 merging at step 100 | WRONG | Stage K is steps 78–87; HBM merges at step 90 (chip-on-wafer) | Internal consistency |
| 66 | Flow steps 12–16 (arc furnace ~2,000 °C, TCS, Siemens ~1,100 °C, 3–5 days) | CONFIRMED | | Module 01 sources |
| 67 | Flow steps 17–23 (300–450 kg charge, 1,420 °C, Dash neck, 0.5–1.5 mm/min, 30–40 h) | CONFIRMED | | Module 02 sources |
| 68 | Flow steps 24–34 (wire saw ~900 µm slices, ~150 µm kerf, DSP, RCA, epi 2–5 µm, SFQR/TXRF) | CONFIRMED | | Module 03 sources |
| 69 | Flow steps 36–54 FEOL order (pad ox/nitride, fin SAQP/EUV, STI, wells, dummy gate, spacers, S/D epi, RMG, SAC cap) | CONFIRMED | Standard RMG FinFET/nanosheet flow order | Literature |
| 70 | Flow steps 55–58 MOL (TiSi, W/Co/Ru contacts, M0 EUV LELE at N2) | CONFIRMED | | TechInsights |
| 71 | Flow steps 59–66 BEOL pitches (M1 23–30 nm EUV; M15–17 1–2 µm) and backside power (A16, 18A) | CONFIRMED | | Industry |
| 72 | Step 78: "~1 EUV layer at 1β" | MINOR | Varies by maker (SK hynix/Samsung 1–5 layers; Micron none until 1γ) | TechInsights |
| 73 | Step 79: TSV ~5–6 µm, ~50 µm deep, via-middle | CONFIRMED | | SK hynix |
| 74 | Step 83: HBM4 base die at TSMC on N12/N5 | CONFIRMED | | TSMC/SK hynix |
| 75 | Step 88: CoWoS-S interposer 65 nm-class BEOL, 4–5 RDL levels | CONFIRMED | | TSMC |
| 76 | Step 110: HGX baseboard "4 NVSwitch chips" | WRONG (for B200) | 4 on HGX H100; 2 NVLink Switch chips on HGX B200 | ServeTheHome; NVIDIA |
| 77 | Step 114: NVL72 ~5,000 copper cables | CONFIRMED | "5,000+ cables" | NVIDIA |
| 78 | Who-buys-from-whom: DuPont IC1000 "acquired by Entegris-adjacent / now under Qnity" | WRONG (garbled) | Entegris acquired CMC Materials (2022); DuPont's pads/slurries went to Qnity Electronics spin-off (Nov 2025) | Company releases |
| 79 | TSMC → NVIDIA ~$10B+ per year | MINOR (stale) | ~$20B+ per year by 2025 (NVIDIA ~20% of $122B) | TSMC annual report |
| 80 | Key Players: Samsung "#1 DRAM revenue" | MINOR | SK hynix led DRAM revenue for most of 2025; lead traded | TrendForce |
| 81 | What-to-learn-next: all 11 books exist with stated publishers/editions | CONFIRMED | | Publisher catalogs |
| 82 | TechInsights "Chip Observer" and "Logic Roadmap" products | MINOR | Chip Observer exists (market data); node work is in the Logic subscriptions | techinsights.com |
| 83 | Coursera KAIST "Introduction to Semiconductor Devices" | CONFIRMED | Exists as parts 1 and 2 | coursera.org |

## Edits applied
- Sense-of-scale intro: "thirteen orders of magnitude" → "about ten orders of magnitude, from a 2 m rack to a 0.2 nm atom".
- Sense-of-scale closing line: "4 × 10⁸ metal pitches" → "4 × 10⁶ metal pitches (90 mm / 23 nm)".
- Master Process Flow intro: HBM branch reference corrected to Stage K, steps 78–87, merging at step 90.
- Key Numbers, Rayleigh row: restated as half-pitch with practical single-exposure pitches (~76–80 nm ArFi, ~26 nm 0.33 NA EUV, ~16 nm High-NA).
- Node table: N2 "TSMC claims up to ~313" → "some estimates run to ~313"; Intel 18A "~238 (Intel)" removed, left as 200–240 est.; Samsung SF2 "~231 (claimed)" → "~200–230 est."; Key Numbers density row wording matched.
- Glossary FinFET: Intel 22 nm year 2011 → 2012 (first shipment).
- Glossary Stochastics: dose changed from "~10–20 mJ/cm²" to "production doses of ~20–40 mJ/cm², and worse at lower doses" to match the unit table.
- Glossary Pellicle: transmission hedged to ~85–92% depending on generation, materials broadened.
- Who Buys From Whom, CMP line: rewritten to state Entegris/CMC (2022) and DuPont/Qnity (Nov 2025) correctly.
- Who Buys From Whom, TSMC line: NVIDIA purchases ~$20B+ per year by 2025; Apple's share ~20–25% added.
- Flow step 78: DRAM EUV layer count hedged by maker.
- Flow step 110: NVLink Switch chip count stated per generation (4 on HGX H100, 2 on HGX B200).
- Key Players: Samsung DRAM position "#1–2 (traded the lead with SK hynix through 2025); #1 NAND"; SK hynix "#1–2 DRAM revenue" added.
- What to Learn Next: TechInsights product names corrected; KAIST course named as "Introduction to Semiconductor Devices 1 and 2".
- Quiz: no changes needed; all six answers remain consistent with the corrected module.

## Remaining caveats
- Node-table pitches for N2, A16, A14, Intel 14A, Samsung SF3/SF2 and SMIC N+3 are estimates (foundries stopped publishing pitches around 7 nm); densities beyond N5 are analyst reconstructions and the table marks them "~" or "est.".
- Wafer prices in the node table are the same analyst list-price estimates used in Module 20 and should be read as ranges.
- Market-share phrases in Key Players (Advantest ~60%, DISCO ~70–80%, JX Metals ~50–60%, ASML ~80–90% of immersion) are approximate and shift year to year.
- Several process-flow parameters (as-sawn slice thickness, kerf, STI depth, spacer thickness, interposer thickness) are typical values, not a single foundry's recipe.
- The DRAM/HBM supplier rankings changed quarter to quarter in 2025–26; the table now states the position as "traded the lead" rather than a fixed rank.
