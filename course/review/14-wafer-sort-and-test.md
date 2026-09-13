# Review: Module 14 — Wafer Sort and Test
Reviewer summary: This module is in good shape. Every worked example (thermal expansion, probe force, cost per tester-second, Williams-Brown DPPM, multi-die escape probability, sort-cell count) was recomputed and is correct, and the recent business facts (KYEC 2025 revenue and NT$37 B capex, the US$1.4 B US plant, Advantest's 56 to 66 percent SoC share, eScan/V93000 generations) all check against primary or trade-press sources. The fixes were product-name and vendor errors: Tokyo Electron does not sell parametric testers and its current prober line is Prexa (not a "Precio Vision" series); HBM bump-pitch wording was aligned with published values (~ 50 µm through HBM3E, ~ 40 µm for HBM4), and the hybrid-bonded HBM sentence was corrected since HBM4 stays on microbumps.
Overall verdict: Accurate with minor fixes
Claims checked: 38   Confirmed: 31   Minor: 3   Wrong: 2   Unverifiable: 2

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Rule of ten (~ 10× per stage) | CONFIRMED (folklore, labelled as such) | | Test economics texts |
| 2 | Scribe line 60 to 80 µm | CONFIRMED | Consistent with Module 13 | Industry practice |
| 3 | Parametric testers: Keysight 4080, Keithley S500, "Tokyo Electron's own parametric systems" | WRONG (TEL) | TEL makes probers, not parametric testers; Keysight 4080/P9001A and Keithley S530/S500 are the vendors | keysight.com; tek.com |
| 4 | WAT 5 to 13 sites per wafer; several hundred to 2,000 parameters | CONFIRMED | | Industry practice |
| 5 | Probers: TEL "Precio XL, Precio nano, newer Precio Vision-series"; Accretech UF3000 | WRONG (TEL naming) | TEL: Precio XL / Precio nano, succeeded by Prexa (Aug 2021) and Prexa MS; no "Precio Vision" | TEL press release 30 Aug 2021; tel.com |
| 6 | TEL + Accretech 80 to 90 percent of 300 mm probers | CONFIRMED (approximate) | | Trade press |
| 7 | Prober cost $0.7 to 1.5 M | UNVERIFIABLE | Plausible; vendors do not publish | none |
| 8 | Chuck repeatability ±1 µm; −40 to +150 °C (to +200 °C) | CONFIRMED | | TEL/Accretech specs |
| 9 | Si CTE 2.6 ppm/K; 78 µm over 300 mm for 100 K | CONFIRMED | 300 × 2.6e-6 × 100 = 0.078 mm | Own calculation |
| 10 | Overtravel 50 to 100 µm cantilever, 50 to 75 µm vertical; 2 to 8 gf; scrub 10 to 25 µm | CONFIRMED | | Probe card literature |
| 11 | Probe force example: 12,000 × 3 gf = 353 N; 100,000 × 2 gf = ~ 2 kN | CONFIRMED | 36 kgf × 9.81 = 353 N | Own calculation |
| 12 | Cobra/buckling-beam probe pioneered by IBM in 1970s | CONFIRMED | | IBM J. R&D history |
| 13 | FormFactor MicroSpring 1990s | CONFIRMED | FormFactor founded 1993 | FormFactor history |
| 14 | MEMS pitch ~ 40 µm area array, 20 to 30 µm on some memory cards | CONFIRMED | | FormFactor/Technoprobe materials |
| 15 | FormFactor ~ 25 to 30 percent share; Technoprobe #2; market ~ $3 B; top 5 ~ 75 percent | CONFIRMED (approximate) | Market estimates $2.7 to 3.4 B for 2024/25 | Market reports; FormFactor 10-K |
| 16 | Space transformer LTCC/HTCC from Kyocera, NTK | CONFIRMED | | Vendor pages |
| 17 | Probe inductance 0.5 to 2 nH; Cres < 1 Ω | CONFIRMED | | Probe card literature |
| 18 | HBM microbumps "~ 40 to 55 µm (HBM3/3E)" | MINOR | ~ 50 µm through HBM3E; ~ 40 µm for HBM4 | Semiconductor Engineering (HBM4 sticks with microbumps) |
| 19 | "Hybrid-bonded HBM4 with sub-10 µm pad pitch" | MINOR | HBM4 stays on microbumps; hybrid bonding deferred | Semiconductor Engineering |
| 20 | Advantest V93000 EXA Scale since 2020, SmarTest 8; T2000; Teradyne UltraFLEX/plus, IG-XL; T5800; Magnum | CONFIRMED | EXA Scale announced Oct 2020 | Advantest/Teradyne pages |
| 21 | Tester cost $2 to 10 M+ | CONFIRMED (approximate) | | Industry practice |
| 22 | Pin Scale 5000 to 5 Gb/s; ±25 to 50 ps EPA | CONFIRMED (approximate) | | Advantest product pages |
| 23 | Continuity: −100 µA, ESD diode 0.5 to 0.7 V | CONFIRMED | | Test texts |
| 24 | ATPG tools Synopsys TestMAX/DFTMAX, Siemens Tessent/TestKompress; 50 to 200× compression | CONFIRMED | | Vendor pages |
| 25 | March C- is 10n operations | CONFIRMED | | Bushnell and Agrawal |
| 26 | IEEE 1149.1 (5 pins), 1500 (HBM adopted), 1687, 1838 | CONFIRMED | | IEEE standards |
| 27 | Cost example: $2.9 M/yr, 7,450 h, $0.108/s, $26/die, ~ 7 percent of a $360 die | CONFIRMED | Recomputed | Own calculation |
| 28 | Mobile SoC: 25 s × $0.05 / 16 = $0.078 | CONFIRMED | | Own calculation |
| 29 | 65 dies × 240 s > 4 h; 100k wafers → 55 to 60 cells | CONFIRMED | 433k cell-hours / 7,450 = 58 | Own calculation |
| 30 | KYEC 2025 capex ~ NT$37 B record | CONFIRMED | Raised from NT$27 B to NT$37 B | Reuters brief |
| 31 | KYEC 2025 revenue ~ US$1.1 B | CONFIRMED | NT$35 to 35.6 B ≈ US$1.1 B | Eulerpool / stockanalysis |
| 32 | KYEC 2026 US facility up to US$1.4 B | CONFIRMED | Announced July 2026 | Reuters; DIGITIMES |
| 33 | Williams-Brown: Y = 0.7, T = 0.99 → 3,560 DPPM; 0.999 → 357; Y = 0.5 → 6,900 | CONFIRMED | Recomputed | Own calculation |
| 34 | KGD example: 104 dies at 500 DPPM + 2 at 300 → 94.8 percent clean | CONFIRMED | exp(−0.052) × 0.9994 = 0.9487 | Own calculation |
| 35 | Blackwell: two ~ 800 mm² dies, 8 HBM3E stacks, CoWoS-L | CONFIRMED | | NVIDIA |
| 36 | AEC-Q001 PAT, ±6 sigma; STDF v4 (Teradyne, 1980s); SEMI E142 | CONFIRMED | | AEC; SEMI |
| 37 | Advantest SoC share ~ 56 percent (2024), ~ 66 percent (2025) | CONFIRMED | Advantest earnings/Investors Guide | Advantest IR |
| 38 | ATE market $6 to 9 B/yr; Advantest + Teradyne 80 to 90 percent | UNVERIFIABLE (range) | Consistent with trade estimates | Trade press |

Further Reading: all ten items confirmed to exist (Bushnell and Agrawal 2000; Wang, Wu, Wen 2006; Williams and Brown IEEE TC C-30(12) 1981; AEC-Q001; IEEE 1149.1/1500/1687/1838; Advantest V93000 EXA Scale materials and Investors Guide; FormFactor/Technoprobe reports; SEMI E142 and STDF V4; Asianometry videos; ITC proceedings). Mandatory closing sections present and in order. Quiz: all six answers verified correct; no changes.

## Edits applied
- WAT section: removed the non-existent "Tokyo Electron's own parametric systems"; listed Keysight 4080/P9001A and Keithley S500/S530 docked to a TEL or Accretech prober.
- Prober section: TEL lineup corrected to Precio XL / Precio nano succeeded by Prexa (2021) and Prexa MS; Key Players row updated to "Precio- and Prexa-series".
- Microbump section: pitch statement refined (~ 50 µm through HBM3E, ~ 40 µm for HBM4); hybrid-bonded sentence corrected to say hybrid bonding is deferred beyond HBM4.

## Remaining caveats
- Prober and tester prices, probe card costs and lifetimes, and cost-per-tester-second are order-of-magnitude industry figures; the worked example states its assumptions.
- Market shares for probe cards and ATE come from analyst estimates that differ by several points between sources.
- The GPU harvesting and KGD examples use illustrative DPPM and die-count assumptions rather than NVIDIA or memory-vendor data.
- KYEC's US$1.4 B US plant location and timeline were undisclosed as of the announcement.
