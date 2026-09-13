# Review: Module 09 — Etch: Transferring the Pattern
Reviewer summary: The physics (sheath, Bohm flux, plasma frequencies, Debye length, interferometry fringe spacing), the chemistry (fluorocarbon selectivity, HBr/O2, Cl2/BCl3, SiCoNi), the Coburn-Winters numbers and the wet-etch rate tables are all accurate and internally consistent. The main errors were in vendor claims for cryogenic etch (TEL's speed-up is ~2.5x, not "more than three times"; Lam's "2x better profile control" is not a Lam claim) and a wrong launch date for TEL's Episode UL platform (2020, not 2024). A few ranges were tightened (Bosch rates, thermal ALE etch-per-cycle, ONON pair pitch, fin pitch) and the claim that etch/deposition outrank lithography in fab equipment dollars was softened, since lithography is at least as large industry-wide.
Overall verdict: Accurate with minor fixes
Claims checked: 42   Confirmed: 31   Minor: 7   Wrong: 2   Unverifiable: 2

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Etch equipment ~$20–25 B/yr, ~20% of WFE | UNVERIFIABLE | Analyst estimates range $15–27 B for 2024; hedged in text | Market reports (various) |
| 2 | Lam ~40–45%, TEL ~25%, AMAT ~18–20% share; one report ranks AMAT first | UNVERIFIABLE | Sources disagree widely; text already says so | Analyst reports |
| 3 | Coburn & Winters 1979: XeF2 ~5, Ar+ ~2, both ~55 Å/min, 450 eV | CONFIRMED | Classic JAP 50, 3189 figure | Coburn & Winters 1979 |
| 4 | Si–O bond ~4.8 eV | CONFIRMED | ~452 kJ/mol = 4.7 eV | Standard bond tables |
| 5 | 6:1 BOE ~100 nm/min; 49% HF ~2 µm/min; 100:1 DHF ~2–3 nm/min on thermal oxide | CONFIRMED | Williams et al. 2003: 49% HF 2.3 µm/min; BOE ~90–100 nm/min | Williams, Gupta, Wasilik JMEMS 2003 |
| 6 | Si3N4 in BOE ~1 nm/min | CONFIRMED | ~0.5–1 nm/min for LPCVD nitride | Williams 2003 |
| 7 | Hot H3PO4 85% at ~160 °C: Si3N4 4–6 nm/min, SiO2 0.1–0.5 nm/min | CONFIRMED | Williams: ~4–5 nm/min nitride, sub-nm/min oxide | Williams 2003 |
| 8 | KOH 30% at 80 °C ~1 µm/min on (100); (100):(111) 30–400:1; 54.74° | CONFIRMED | Williams reports 1.4 µm/min; "~1" acceptable | Williams 2003; MEMS texts |
| 9 | TMAH 25% at 80–90 °C ~0.5–1 µm/min | CONFIRMED | ~0.6 µm/min at 80 °C | MEMS literature |
| 10 | SCREEN SU-3300 / FC-3100; TEL CELLESTA / EXPEDIUS; Lam DV-Prime, Da Vinci | CONFIRMED | Product names correct | Vendor pages |
| 11 | SCREEN ~40–50% of wet clean/etch tools | UNVERIFIABLE | Commonly cited ~40–45% single-wafer share; hedged "roughly" | Trade press |
| 12 | 13.56 MHz is an ISM band | CONFIRMED | ITU ISM allocation | ITU |
| 13 | Electron ~70,000x lighter than Ar+ | CONFIRMED | 40 × 1836 = 73,400 | Physics |
| 14 | Ar ionization energy 15.76 eV | CONFIRMED | 15.76 eV | NIST |
| 15 | Neutral density at 10 mTorr ~3×10^14 cm^-3 | CONFIRMED | n = P/kT = 3.2×10^14 | Ideal gas |
| 16 | Debye length ~100 µm at 10^10 cm^-3, 3 eV | CONFIRMED | 743·sqrt(3/1e10) cm = 129 µm | Lieberman & Lichtenberg |
| 17 | Bohm velocity ~2.7 km/s for Ar at 3 eV | CONFIRMED | sqrt(kTe/M) = 2.69 km/s | Lieberman & Lichtenberg |
| 18 | Ion plasma frequency ~3 MHz at 10^10 cm^-3 (Ar) | CONFIRMED | 3.3 MHz | Calculation |
| 19 | Electron plasma frequency ~900 MHz at 10^10 cm^-3 | CONFIRMED | 8980·sqrt(n) = 898 MHz | Calculation |
| 20 | Bohm flux 1.6×10^15 cm^-2 s^-1, 0.26 mA/cm^2, ~20 nm/min at yield 1 | CONFIRMED | Arithmetic checks | Calculation |
| 21 | ECR: 2.45 GHz, 875 gauss | CONFIRMED | Resonance condition | Lieberman & Lichtenberg |
| 22 | TEL RLSA 2.45 GHz surface-wave source | CONFIRMED | TEL product literature | TEL |
| 23 | SiBr4 b.p. 153 °C; SiCl4 58 °C; AlCl3 sublimes ~180 °C; SiF4 −86 °C | CONFIRMED | Handbook values (SiBr4 154, SiCl4 57.6, AlCl3 178–180) | CRC Handbook |
| 24 | Bosch patent Laermer & Schilp US 5,501,893 (1996) | CONFIRMED | Granted 26 Mar 1996 | USPTO |
| 25 | Bosch rates 5–50 µm/min | MINOR | Production typically ~5–30 µm/min; changed | SPTS/Lam DRIE literature |
| 26 | "DSi product line inherited from SPTS (now KLA)" | MINOR | SPTS DRIE line is Omega Rapier and DSi-v; wording fixed | KLA/SPTS product pages |
| 27 | Cryogenic Si etch Tachi (Hitachi) 1988 | CONFIRMED | Tachi et al., APL 52, 616 (1988) | APL |
| 28 | Fin pitch ~24–28 nm at N7–N3 | MINOR | TSMC N7 30 nm, N5 28 nm, N3 ~26 nm; changed to ~26–30 nm | WikiChip/TechInsights |
| 29 | SAC scheme used since 22 nm node | CONFIRMED | Intel 22 nm introduced SAC | Intel IEDM 2012 |
| 30 | NAND layer counts: Samsung V9 286, SK hynix 321, Micron G9 276, Kioxia BiCS8 218 | CONFIRMED | All match 2024 announcements | Vendor press releases |
| 31 | ONON pair ~25–30 nm | MINOR | Current stacks ~30–35 nm/pair (300 pairs ≈ 9–10 µm); changed to ~28–35 nm to match 8–10 µm stack in same section | TechInsights teardowns |
| 32 | TEL cryo: 10 µm in 33 min, "more than three times faster", 84% lower GWP | WRONG | TEL says 2.5x faster; 84% GWP correct; corrected text and the note at line 180 | tel.com 2023 release; TEL blog Oct 2024 |
| 33 | TEL chemistry HF + PF3 | CONFIRMED | PF3 acts as catalyst for HF/SiO2 reaction | Semiconductor Engineering "Cryogenic Etch" |
| 34 | Lam Cryo 3.0 July 2024, 2.5x rate, <0.1% top-to-bottom CD, "2x better profile control" | WRONG (last item) | 2.5x and <0.1% confirmed; "2x profile control" not a Lam claim; replaced with 40% energy / up to 90% emissions reduction and 5M wafers on earlier generations | Lam newsroom 31 Jul 2024 |
| 35 | SK hynix to use TEL cryo process for 400+ layers | CONFIRMED | TrendForce May 2024 | TrendForce |
| 36 | TEL Episode UL platform (2024) | WRONG | Episode UL launched 2020 (up to 12 chambers); fixed | tel.com product page |
| 37 | Lam first production ALE ~2016 | CONFIRMED | Sept 2016 Flex ALE tool-of-record; Kiyo ALE same era | Lam press release 2016 |
| 38 | ALE lab demos early 1990s (Athavale & Economou); Yoder 1988 | MINOR | Athavale & Economou 1995–96; Sakaue/Horiike ~1990; wording fixed | JVST A/B |
| 39 | Thermal ALE Al2O3 HF/TMA or Sn(acac)2 at 250–300 °C ~0.5–1 Å/cycle | MINOR | George group reports ~0.14–0.75 Å/cycle over 250–325 °C; changed to 0.2–0.8 | Lee & George, ACS Nano 2015 |
| 40 | Lam Selis and Prevos selective etch lines | CONFIRMED | Argos, Prevos, Selis announced Feb 2022 | Lam press release |
| 41 | OES lines: CO 483.5/519.8, SiF 440, F 703.7, CN 387, Cl 837.6, AlCl 261 nm | CONFIRMED | Standard endpoint lines | Etch endpoint literature |
| 42 | Interferometry fringe: 670 nm on poly (n≈4) ~84 nm; oxide ~230 nm | CONFIRMED | λ/2n arithmetic | Calculation |
| 43 | "Etch and deposition, not lithography, are the largest equipment categories" | MINOR | Lithography is comparable or larger industry-wide (ASML system sales alone > $20 B); softened both occurrences | ASML/SEMI WFE data |
| 44 | Wet etch was the only etching "until the late 1970s" | MINOR | Plasma etchers were in fabs by the mid-1970s; fixed | Donnelly & Kornblit 2013 |
| 45 | Further Reading items 1–10 | CONFIRMED | All exist, including Lam blog "The Road to 1,000 Layer 3D NAND" and SemiEng "Cryogenic Etch: A Key Enabler of 3D NAND" | Publisher pages |

## Edits applied
- Cryogenic etch paragraph: TEL speed-up changed from "more than three times" to "about 2.5 times"; added HF replacing ~90% of fluorocarbon gas; replaced Lam's "2x better profile control" with its actual claims (40% energy, up to 90% emissions), noted Cryo 3.0 is a third generation with >5 M wafers on earlier ones, and added TEL's 2025/2026 production timeline.
- Note after channel-hole worked example: conventional comparison changed from ~100 nm/min / ~100 min ("three times") to ~120 nm/min / ~80 min ("2.5 times"), matching the worked example.
- TEL vendor paragraph: Episode UL launch date corrected to 2020, described as up to 12 chambers.
- Bosch process: rates changed to ~5–30 µm/min in production; TSV time "a few" to "several" minutes; SPTS product line named as Omega Rapier and DSi.
- Key Numbers: Bosch row and cryogenic row updated to match body.
- 3D NAND ONON pair thickness changed to ~28–35 nm so 300 pairs is consistent with the 8–10 µm stack stated in the same paragraph.
- Fin etch: pitch changed to ~26–30 nm; clarified only ~50–60 nm of the 100–120 nm etched fin is active above STI.
- ALE history: "early 1990s" to "1990s" with Sakaue/Horiike and Athavale & Economou dates.
- Thermal ALE etch-per-cycle changed to ~0.2–0.8 Å, temperature-dependent.
- Wet etch intro: "until the late 1970s" to "until plasma etchers entered fabs in the mid-1970s".
- Two claims that etch/deposition outrank lithography softened to "rival" / "one of the three largest".
- Quiz Q4 option: "2.5–3x" changed to "~2.5x" and "more than half" to "roughly half" to match the corrected module numbers.

## Remaining caveats
- Market size and share numbers (etch market $20–25 B, Lam/TEL/AMAT shares, SCREEN's wet share, AMEC/Naura share in China) come from analyst estimates that disagree by many points; the text hedges them and readers should treat them as ± 5 points.
- Chamber and platform prices ($3–6 M, $15–25 M) and per-wafer etch-step counts (200–300) are industry rules of thumb, not published figures.
- The cryogenic wafer temperature (−40 to −70 °C) is inferred from press coverage; vendors state only "negative tens of degrees" or "well below 0 °C".
- Nanosheet inner-spacer and channel-release recipes are proprietary; the chemistries listed are those reported in the literature, not confirmed production recipes.
