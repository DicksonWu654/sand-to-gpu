# Review: Module 11 — Building a Transistor: Planar to FinFET to GAA to CFET
Reviewer summary: The device physics (subthreshold limit, scale-length formulas and worked examples, Dennard scaling, HKMG and RMG rationale) is correct, and the node table is in good shape: the disclosed Intel 14/10/7/4/3 pitches, TSMC N16/N7/N5/N3E pitches (N3E CPP 48, fin 26, MP 23 confirmed by TechInsights), Samsung 7LPP/5LPE pitches, SRAM cell sizes and first-HVM years all check out. The one factual error was Samsung 3GAP/SF3's density, given as 1.35x 5LPE when Samsung's claim is a 35% area reduction (~1.5x). Intel 18A's CPP is not disclosed and is now labelled as an estimate; the SemiAnalysis reference date was fixed (2024, not 2023) and a few PowerVia and ribbon-count statements were tightened to what Intel actually said.
Overall verdict: Accurate with minor fixes
Claims checked: 44   Confirmed: 36   Minor: 4   Wrong: 1   Unverifiable: 3

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | SS limit 59.6 mV/dec at 300 K; production 65–75 | CONFIRMED | (kT/q) ln10 = 59.6 mV | Taur & Ning |
| 2 | Frank, Taur, Wong 1998 double-gate scale length; L_g ≥ 5–6 λ | CONFIRMED | IEEE EDL 19(10), 1998 | IEEE |
| 3 | Worked example: λ = 3.1 nm (fin), 1.9 nm (sheet) | CONFIRMED | Arithmetic checks | — |
| 4 | Intel IEDM 2024: L_g = 6 nm RibbonFET with 1.7 nm ribbons | CONFIRMED | Also at 45 nm CPP | Intel newsroom IEDM 2024 |
| 5 | Dennard 1974, JSSC SC-9(5); scaling ended ~2004–05; Prescott 3.8 GHz, 4 GHz cancelled | CONFIRMED | Public record | IEEE; Intel history |
| 6 | SiON 1.2 nm at 65 nm; ~100 A/cm^2 leakage | CONFIRMED | Intel 65 nm disclosures | Intel IEDM 2004/2005 |
| 7 | Intel eSiGe Ge fraction 17% (90) / 23% (65) / 30% (45 nm); Ge lattice 4.2% larger | CONFIRMED | Intel papers | Mistry IEDM 2007 |
| 8 | Intel 45 nm HKMG Nov 2007 (Penryn), ~1.0 nm EOT, >10x lower gate leakage | CONFIRMED | Mistry et al. IEDM 2007 | IEDM |
| 9 | Gate-first at IBM/Samsung/GF 32/28 nm; abandoned at 20/14 | CONFIRMED | Industry history | — |
| 10 | FinFET demonstrated by Hu's group 1999 (DARPA) | CONFIRMED | Hisamoto et al. IEDM 1998/1999 | IEDM |
| 11 | Intel 22 nm: fin 8 wide, 34 tall, 60 pitch, 90 nm gate pitch; Ivy Bridge 2012 | CONFIRMED | Auth VLSI 2012 | VLSI |
| 12 | Intel 14: FP 42, CPP 70, MP 52, cell 399 nm, 37.5 MTr/mm^2 (2014) | CONFIRMED | Intel 2017 Technology and Manufacturing Day | Intel |
| 13 | Intel 10/7: FP 34, CPP 54 (60 relaxed), M1 36 / M0 40, cell 272, ~100 MTr/mm^2 | CONFIRMED | Intel 2017 disclosures; WikiChip | Intel; WikiChip |
| 14 | Intel 4 (2023): FP 30, CPP 50, MP 30, 240 nm HP-only cell | CONFIRMED | Intel VLSI 2022 | VLSI |
| 15 | Intel 3 (2024): 210 nm HD cell, M0 30 | CONFIRMED | Intel VLSI 2025 comparison (M0 30, HD 210) | Intel newsroom |
| 16 | Intel 18A: CPP ~50, MP ~32, cell ~160 (5T), ~1.3x Intel 3 | MINOR | M0 32, HD 160 / HP 180, "over 30%" density confirmed; CPP not disclosed, relabelled as estimate | Intel newsroom VLSI 2025 |
| 17 | TSMC N16: FP 48, CPP 90, MP 64, 576 nm 9T, ~29 MTr/mm^2 (2015) | CONFIRMED | WikiChip | WikiChip |
| 18 | TSMC N7: FP 30, CPP 57, MP 40, 240 nm 6T, ~91 MTr/mm^2 (2018) | CONFIRMED | WikiChip (91.2) | WikiChip |
| 19 | TSMC N5: FP 28, CPP 51, MP 30 (M0 28), 180 nm, 138 measured / 171 claimed (2020) | CONFIRMED | TechInsights 138.2; WikiChip 171.3 | TechInsights; WikiChip |
| 20 | TSMC N3E: FP 26, CPP 48, MP 23 (2023); N3B CPP 45 | CONFIRMED | TechInsights N3E analysis (M4); WikiChip N3 CPP = N5 − 6 nm | TechInsights; WikiChip |
| 21 | TSMC N2: 1.15x N3E density, 24–35% power / 15% speed, 38 Mb/mm^2 SRAM (0.0175 µm^2), HVM Q4 2025 | CONFIRMED | IEDM 2024 N2 paper coverage | Tom's Hardware; TrendForce |
| 22 | TSMC A16 SPR: H2 2026, 8–10% speed, 15–20% power, 7–10% density vs N2P | CONFIRMED | TSMC 2024 Technology Symposium | TSMC |
| 23 | Samsung 7LPP: FP 27, CPP 54, MP 36, 243 nm, ~95 MTr/mm^2, first EUV logic (2018) | CONFIRMED | WikiChip (95.3) | WikiChip |
| 24 | Samsung 5LPE: same pitches, 216 nm, ~127 MTr/mm^2 (2020) | CONFIRMED | WikiChip (126.5) | WikiChip |
| 25 | Samsung 3GAE June 2022, first GAA, 16% area reduction (1.19x) | CONFIRMED | Samsung PR 30 June 2022 | Samsung newsroom |
| 26 | Samsung 3GAP/SF3 density 1.35x 5LPE (~170) | WRONG | Samsung claims 35% area reduction = ~1.5x density (~190 claimed); fixed in table and Section 6.6 | Samsung PR 30 June 2022 |
| 27 | Samsung 3GAE/3GAP CPP ~45–48, MP ~28, cell ~172 | UNVERIFIABLE | Not disclosed; TechInsights has not published pitches; left as "~" | TechInsights |
| 28 | Intel 7 = 10 nm Enhanced SuperFin rename | CONFIRMED | Intel July 2021 | Intel |
| 29 | Worked examples: N7 93.6 vs 91.2; N5 145 MTr/mm^2 | CONFIRMED | Arithmetic checks | — |
| 30 | H100: TSMC 4N, 814 mm^2, 80 B transistors | CONFIRMED | NVIDIA | NVIDIA |
| 31 | SRAM HD cell: N7 0.027, N5 0.021, N3B 0.0199, N3E 0.021, N2 ~0.0175; Intel 18A 0.021 (31.8 Mb/mm^2) | CONFIRMED | TSMC IEDM 2022/2024; Intel ISSCC 2025 | IEDM; ISSCC |
| 32 | Samsung SF2 2025, SF2P 2026, SF2Z (BSPDN) 2027, SF1.4 | CONFIRMED | Samsung Foundry Forum 2024 | Samsung |
| 33 | Intel skipped 20A (2024); 18A Panther Lake HVM late 2025; 14A High-NA 2027 | CONFIRMED | Intel Sept 2024; CES 2026 | Intel |
| 34 | Intel 18A RibbonFET "four ribbons" | UNVERIFIABLE | Intel's RibbonFET images show four; production count not stated; hedged | — |
| 35 | Rapidus pilot line 2025, HVM 2027 | CONFIRMED | Rapidus | Rapidus |
| 36 | imec forksheet 2017 proposal / 2021 demo; A10 ~2028 forksheet, A7 ~2030 CFET | CONFIRMED | imec roadmap | imec ITF |
| 37 | Intel CFET 60 nm gate pitch IEDM 2023, backside contacts IEDM 2024; TSMC 48 nm CFET IEDM 2023/24 | CONFIRMED | IEDM programs | IEDM |
| 38 | PowerVia Blue Sky Creek (VLSI 2023): 30% lower IR drop, 6% frequency, >90% utilization | MINOR | Intel: 30% platform voltage droop improvement, 6% frequency, >90% utilization; wording aligned | Intel newsroom June 2023 |
| 39 | Wafer thinning 750 of 775 µm | CONFIRMED | Standard 300 mm thickness | SEMI |
| 40 | N2 wafer price ~$30,000 vs ~$20,000 N3 | UNVERIFIABLE | Press reports; hedged "reported" | Trade press |
| 41 | Intel 2D GAA at IEDM 2024 | CONFIRMED | Intel IEDM 2024 | Intel newsroom |
| 42 | SemiAnalysis "Clash of the Foundries" (2023) | MINOR | Published October 2024; fixed | semianalysis.com |
| 43 | TechInsights "TSMC Reveals 3nm Process Details" (2023) | CONFIRMED | Exists (Feb 2023) | techinsights.com |
| 44 | Further Reading: Taur & Ning 3rd ed 2022; Mistry IEDM 2007; Auth VLSI 2012; Loubet VLSI 2017 | CONFIRMED | All exist | IEEE |
| 45 | "3 sheets (4 for Intel)" in Key Numbers | MINOR | Hedged to "Intel has shown 4" | — |

## Edits applied
- Node table, Samsung 3GAP/SF3 row: density changed from "~170 (1.35x 5LPE)" to "~190 claimed (Samsung claims 35% area reduction vs 5LPE, i.e. ~1.5x)".
- Section 6.6, Samsung bullet: "1.35x density vs 5LPE" changed to "claimed 35% area reduction (~1.5x density) vs 5LPE".
- Node table, Intel 18A row: CPP marked "not disclosed (~50 est.; 45 in research)"; MP given as 32 (M0); cell height 160 (5T HD) and 180 (HP); density note quotes Intel's "over 30%" vs Intel 3.
- Section 6.6, Intel bullet: ribbon count hedged ("disclosures have shown four ribbons; Intel has not stated the production count"); Key Numbers nanosheet row hedged the same way.
- Section 7.3 and Key Numbers: PowerVia result wording changed to "30% lower platform voltage droop (IR drop)" and "~6% frequency" to match Intel's statement.
- Further Reading: SemiAnalysis article dated October 2024 instead of 2023.
- Quiz: no changes; all six answers are correct and consistent with the module (Q4's 145 MTr/mm^2 matches the N5 worked example).

## Remaining caveats
- Newest-node pitches (TSMC N2/A16 CPP and MP, Samsung 3GAE/SF3 CPP and MP, Intel 18A CPP) are undisclosed; table values are teardown-based or extrapolated estimates marked "~" and can be off by 1–3 nm.
- Density figures for N3E (~200–215), N2 (~230–250), A16 and Intel 18A (~200–240) are estimates chained from claimed scaling factors; measured teardown densities have historically come in 15–25% below vendor claims (as N5's 138 vs 171 shows).
- Samsung's 3GAE/SF3 area-reduction figures are marketing claims relative to its own 5 nm; no independent density measurement has been published.
- Reported N2 wafer pricing, nano-TSV dimensions, and the "four ribbons" count for Intel 18A are from press or early disclosures, not from the foundries' technical papers.
