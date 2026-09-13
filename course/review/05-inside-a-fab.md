# Review: Module 05 — Inside a Leading-Edge Fab
Reviewer summary: The factory-physics content (ISO 14644 arithmetic, VC curves, FOUP/EFEM mechanics, SECS/GEM and GEM300 standards, Kingman and Little's law, depreciation and EUV-fleet worked examples) is accurate and internally consistent, and the 2025-2026 TSMC fab map matches public reporting (N2 at Fabs 20/22, Fab 25 A14, Fab 21 phases, JASM Fab 2 at 3 nm, ESMC). The fixes were mostly names and dates: TSMC's 2014 night-shift R&D program is "Night Hawk", not "Nightingale"; Applied's SmartFactory did not come from Camstar (that is Siemens Opcenter); the Arizona budget history was garbled ($65 B in 2024, $165 B in March 2025); Fab 21 Phase 1's schedule sentence was self-contradictory; Fab 15 does not run N5; and the T7 mark is on the wafer back, not what the EFEM's OCR camera reads.
Overall verdict: Accurate with minor fixes
Claims checked: 40   Confirmed: 31   Minor: 6   Wrong: 3   Unverifiable: 0

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | VC curves: VC-A 50, VC-C 12.5, VC-D 6.25, VC-E 3.1 µm/s | CONFIRMED | | Gordon/Colin Gordon VC criteria |
| 2 | ISO 14644-1: 10^N at 0.1 µm; C = 10^N (0.1/D)^2.08; ISO 5 = 3,520 at 0.5 µm | CONFIRMED | Table values recomputed | ISO 14644-1:2015 |
| 3 | FED-STD-209E mapping: Class 1 = ISO 3, Class 100 = ISO 5 | CONFIRMED | | ISO/FED cross-reference |
| 4 | HEPA 99.97% at 0.3 µm; ULPA ≥ 99.9995% at MPPS 0.1-0.2 µm | CONFIRMED | | IEST/EN 1822 |
| 5 | Downflow 0.45 m/s; ~350-450 air changes/h | CONFIRMED | 4 m / 0.45 m/s ≈ 9 s → ~400 ACH | Calculation |
| 6 | Si CTE 2.6e-6/K; 1 °C expands 300 mm wafer ~0.8 µm | CONFIRMED | 300 mm × 2.6e-6 = 0.78 µm | Calculation |
| 7 | SEMI F21 classes MA/MB/MC/MD | CONFIRMED | | SEMI F21 |
| 8 | FOUP 25 wafers, 10 mm pitch; SEMI E47.1, E15.1, E1.9 | CONFIRMED | | SEMI standards |
| 9 | EFEM OCR reads "the SEMI T7 mark near the edge" | MINOR | T7 is a back-surface 2D matrix; the front OCR mark is M12/M13; reworded | SEMI T7/M12/M13 |
| 10 | Daifuku leader, Muratec #2 in AMHS; OHT up to ~5 m/s | CONFIRMED | | Daifuku product literature |
| 11 | AMHS scale example: 4.8 M tool visits/month, ~6,600/h | CONFIRMED | Arithmetic checks | Calculation |
| 12 | Step counts N7 ~1,000, N3/N2 1,300-1,500+; EUV layers N5 ~14, N3 ~20-25, N2 ~25-30 | CONFIRMED (public estimates) | Hedged as "approximate public estimates" | Trade press / analyst estimates |
| 13 | Kingman u/(1-u): 4, 9, 19 at 80/90/95% | CONFIRMED | | Calculation |
| 14 | WIP example: 296,000 wafers, ~11,800 lots; 75-day CT frees ~50,000 wafers | CONFIRMED | Arithmetic checks | Calculation |
| 15 | TSMC Arizona "budgeted at $65 B for three fabs plus packaging and R&D in 2025" | WRONG | $65 B (April 2024, three fabs); expanded March 2025 to $165 B for six fabs, two packaging plants, R&D center; fixed | TSMC 6-K March 2025; NIST |
| 16 | NXE:3800E rated ~220 wph at 30 mJ/cm²; ~$180-220 M; 1-1.4 MW | CONFIRMED | | ASML product data |
| 17 | EUV-fleet worked example: ~25 scanners, ~30 with margin, ~$6 B | CONFIRMED | 160 × 24 × 30.4 × 0.85 = 99,200 | Calculation |
| 18 | TEL ~90% track share; KLA ~50%+ process control | CONFIRMED (approx.) | | Industry estimates |
| 19 | SEMI E10 six states; OEE definition | CONFIRMED | | SEMI E10 |
| 20 | Cluster platforms: Endura/Centura/Producer; Kiyo/Flex/Versys/Vector; Telius/Tactras/Trias | CONFIRMED | | Vendor product lines |
| 21 | SECS/GEM = E5 + E30; GEM300 = E87/E40/E90/E94; EDA E120-E164 | CONFIRMED | | SEMI standards |
| 22 | Applied SmartFactory "from the former Camstar/Brooks lines" | WRONG | Applied bought Brooks Software (2006); Camstar went to Siemens (2014) and became Opcenter; fixed | Company histories |
| 23 | TSMC headcount ~80,000+ (2024) | CONFIRMED | ~83,800 at end-2024 | TSMC annual report |
| 24 | 2014 night-shift R&D program "Nightingale" | WRONG | The program is "Night Hawk" (three shifts, premium pay, 10/7 nm development); fixed | CommonWealth Magazine; trade press |
| 25 | Fab 21 groundbreaking 2021; ~600 US hires trained in Tainan; "Phase 1 slipped from 2024 to late 2024" | MINOR | Schedule was pushed from 2024 to 2025 and then pulled in to 4Q 2024 N4 HVM; sentence rewritten | TSMC statements; Rest of World 2024 |
| 26 | TSMC ~25 TWh in 2023-2024, ~7-9% of Taiwan; ~12%+ by 2030 | MINOR | 24.8 TWh (2023, 8.9%), 25.6 TWh (2024, ~9%); 2030 forecasts range ~12% to ~24%; tightened | TSMC annual report; CommonWealth; DCD |
| 27 | Taiwan 2025 nuclear phase-out | CONFIRMED | Maanshan unit 2 shut May 2025 | Press |
| 28 | TSMC water ~150,000-200,000+ tonnes/day company-wide | CONFIRMED (approx.) | ~150,000 t/day commonly cited; STSP alone ~99,000 | Taiwan Insight; press |
| 29 | 2021 drought: worst in >50 years, no 2020 typhoon, reservoirs ~10%, water trucking | CONFIRMED | | Reuters/Fortune 2021 |
| 30 | Person sheds ~10^5 particles/min still, 5-10 M walking | CONFIRMED | Classic cleanroom figures | IEST/textbooks |
| 31 | Fab 15 runs "N7 / N5 family in later phases" | MINOR | Fab 15 is 28 nm early phases and N7 later; N5 is at Fab 18; fixed | TSMC fab map |
| 32 | Fab 20 Hsinchu / Fab 22 Kaohsiung N2; volume production 4Q 2025; ~120-130k wspm end-2026 | CONFIRMED (reported) | Estimates range 100k-140k | TrendForce; TechPowerUp |
| 33 | Fab 25 Taichung A14, groundbreaking 2025, production ~2028 | CONFIRMED | Groundbreaking 5 Nov 2025; risk 2027, volume 2H 2028; dates added | AnySilicon; TechNode |
| 34 | Fab 21: N4 P1 HVM late 2024; N3 P2 tool move-in 2H 2026, production 2027; P3 construction April 2025 | CONFIRMED | | TSMC; SemiWiki |
| 35 | JASM Fab 1 12-28 nm, 55k wspm, HVM late 2024; Fab 2 upgraded to 3 nm, ~15k wspm, 2028 | CONFIRMED | 3 nm upgrade approved by Taiwan MOEA March 2026; wording clarified | Focus Taiwan; DCD |
| 36 | ESMC Dresden: 28/22 and 16/12 nm, 40k wspm, groundbreaking Aug 2024, production end-2027 | CONFIRMED | | ESMC/TSMC releases |
| 37 | Intel: D1X first High-NA; Fab 52 18A; Fab 34 Ireland; Ohio delayed to 2030s; Magdeburg cancelled 2025 | CONFIRMED | | Intel statements |
| 38 | Samsung Taylor SF2 for Tesla, production ~2026 | CONFIRMED | Tesla AI6 deal July 2025 | Press |
| 39 | TSMC 5-year equipment depreciation; ~$20 B/yr; example $2,700/wafer, $4,500/h per EUV scanner | CONFIRMED | Arithmetic checks | TSMC annual report; calculation |
| 40 | N3 wafer ~$18-20k, N2 ~$30k; D0 ~0.1/cm² → 55% yield on 600 mm² die | CONFIRMED (reported) | exp(-0.6) = 0.55 | Trade press; calculation |

## Edits applied
- FOUP/EFEM section: wafer-ID reading corrected to the SEMI M12/M13 front-surface OCR mark or the T7 back-surface matrix code.
- Fab cost paragraph: Arizona investment history corrected to $65 B (2024, three fabs) expanded to $165 B (March 2025, six fabs, two packaging plants, R&D center).
- MES paragraph: SmartFactory lineage corrected to Applied's 2006 Brooks Software purchase; Siemens Opcenter identified as the former Camstar.
- People section: "Nightingale" corrected to "Night Hawk" with its purpose (three-shift 10/7 nm development); Fab 21 Phase 1 schedule sentence rewritten to the actual sequence (pushed to 2025, then N4 HVM in 4Q 2024).
- Electricity: TSMC consumption given as 24.8 TWh (2023) and 25.6 TWh (2024), ~9% of Taiwan, with 2030 forecasts stated as a ~12-24% range; Key Numbers row updated to match.
- Fab table: Fab 15 nodes corrected (28 nm early phases, N7 later); Fab 25 groundbreaking dated 5 November 2025 with risk 2027 / volume 2H 2028; JASM Fab 2 note clarified (original 6-12 nm plan, 3 nm approved March 2026, 2028 production).
- Quiz: no changes needed; all six answers verified correct and consistent with the module's worked examples.

## Remaining caveats
- Tool counts, unit prices and capex shares in the fab-composition table are public estimates; actual configurations are proprietary and vary by fab.
- Step and mask-layer counts per node, EUV layer counts, and N2 capacity ramps (100k-140k wspm by end-2026) are analyst/trade-press figures, not TSMC disclosures.
- Wafer prices ($18-20k N3, ~$30k N2) and the manufacturing-cost breakdown are reported estimates; treat as order-of-magnitude.
- TSMC's 2030 share of Taiwan's electricity depends heavily on the forecast (Greenpeace-type estimates run to ~24%; others ~12%).
- Q-time values, sampling plans, and PM intervals are representative; each fab sets its own.
