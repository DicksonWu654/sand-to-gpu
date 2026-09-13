# Review: Module 03 — From Ingot to Polished Wafer
Reviewer summary: The module is technically strong; the process mechanics (wire sawing, DDG, alkaline etch, CMP, RCA clean, Smart Cut), the worked arithmetic (mass balance, sag, removal stack-up) and the SEMI market figures all check out. The biggest fixes were a factual error about 200 mm wafers using flats (most use a notch; the notch predates 300 mm), a wrong flat-area figure (57 mm² should be ~160 mm²), several wrong dates/attributions (KLA-ADE 2006 not 2008, Surfscan SP7XP launched 2020 not 2024-25, "Rotagoni" is an imec term not SCREEN's, SEMI M12 is 12 characters and M13 is 18), and a stale/over-precise description of the 2025 industry events.
Overall verdict: Accurate with minor fixes
Claims checked: 42   Confirmed: 30   Minor: 6   Wrong: 5   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | 300 mm ingot body ~2 m, 300+ kg, ~1,800 wafers | CONFIRMED | Arithmetic checks: π(0.15)²×2 m×2,330 kg/m³ = 329 kg; 1,965 mm/1.06 mm ≈ 1,850 | Calculation |
| 2 | Final thickness 775 ± 25 µm (300 mm), 725 ± 20 (200 mm) | CONFIRMED | SEMI M1 | SVMI SEMI-M1 product sheets |
| 3 | Football-field flatness analogy: ~7 µm bump | MINOR | Arithmetic works only if the whole wafer (300 mm) is scaled to 100 m; wording clarified | Calculation |
| 4 | Silicon Mohs ~7 | CONFIRMED | 6.5-7 | Standard reference |
| 5 | SEMI M1 diameter tolerance 300.0 ± 0.2 mm | CONFIRMED | | SVMI SV025/SV027 sheets |
| 6 | Notch 1.00 mm deep (+0.25/-0), 90° ± 5° | MINOR | Angle tolerance is +5°/-1° | SVMI SEMI M1 sheets |
| 7 | 150 mm and 200 mm wafers use a primary flat, 57.5 mm on 200 mm | WRONG | 200 mm wafers are offered flatted (57.5 mm) or notched in SEMI M1 and most 200 mm lines use the notch; fixed | SEMI M1; industry practice |
| 8 | 57.5 mm flat on 200 mm removes ~57 mm² | WRONG | Circular segment: sagitta 4.2 mm, area ≈ 160 mm²; fixed | Calculation |
| 9 | Notch standardized at 300 mm transition (~1999-2001) | WRONG | Notch was introduced as a 200 mm option (early 1990s); 300 mm made it the only fiducial; fixed | SEMI M1 history |
| 10 | Cu Kα 1.54 Å; {220} reflection for <110> | CONFIRMED | | Standard XRD |
| 11 | Segregation coefficients: B ~0.8, P ~0.35 | CONFIRMED | | Standard CZ data |
| 12 | FTIR oxygen 1107 cm⁻¹, carbon 605 cm⁻¹; 10-18 ppma = 5-9e17 cm⁻³ | CONFIRMED | Old ASTM 1 ppma ≈ 5e16 cm⁻³ | SEMI MF1188 |
| 13 | Diamond wire core 100-140 µm, grit 8-25 µm, kerf ~150-170 µm | CONFIRMED (typical) | Consistent with 300 mm semiconductor wire; flow-table kerf harmonized to match body | Möller 2004/2006; industry |
| 14 | Komatsu NTC dominates 300 mm wire saws; Takatori, ex-Meyer Burger alternatives | CONFIRMED | | Industry knowledge |
| 15 | Slurry-to-diamond-wire transition ~2014-2018 | CONFIRMED (PV-led) | | Industry knowledge |
| 16 | Si-II (β-tin) phase transformation under indentation, Si-III/XII on unloading | CONFIRMED | | Materials literature |
| 17 | Mass-balance worked example (329 kg, 128 g/wafer, 230 kg, ~70%) | CONFIRMED | Arithmetic re-done | Calculation |
| 18 | Koyo Machinery DXSG pioneered 300 mm DDG | CONFIRMED | | Koyo/JTEKT product line |
| 19 | Acid etch equation 3Si + 4HNO3 + 18HF → 3H2SiF6 + 4NO + 8H2O | CONFIRMED | Balanced (Si, H, N, O, F all check) | Calculation |
| 20 | KOH (100):(111) ratio 50-100× | MINOR | Literature range is tens to a few hundred (Seidel et al.); wording widened | Seidel JES 1990 |
| 21 | SEMI M12 specifies 18-character code | MINOR | M12 = 12 characters, M13 = 18 characters; fixed | SEMI store; SEMI Standards Watch |
| 22 | SEMI T7 back-surface 2D matrix on DSP wafers | CONFIRMED | | SEMI T7 |
| 23 | CMP: silica Mohs ~6 vs silicon ~7; Preston equation; 10-30 kPa | CONFIRMED | | Standard CMP references |
| 24 | Si(100) monatomic step 0.136 nm | CONFIRMED | a/4 = 0.543/4 | Calculation |
| 25 | Sag worked example: ~90 µm (300 mm), ~20 µm (200 mm) | CONFIRMED | Recomputed: 92 µm and 21 µm | Calculation (Timoshenko plate) |
| 26 | Removal stack-up 890 → 775.5 µm, ~115 µm, 74% of ingot length | CONFIRMED | Arithmetic re-done | Calculation |
| 27 | RCA clean: Kern 1965 / published 1970; SC-1 1:1:5, SC-2 1:1:6 | CONFIRMED | | Kern & Puotinen RCA Review 1970 |
| 28 | Megasonic 0.8-1 MHz; IPA 21 vs water 72 mN/m | CONFIRMED | | Standard |
| 29 | "Rotagoni" is SCREEN's term | WRONG | Coined by imec (~2000, with Verteq), licensed to Ebara/SEZ etc.; fixed | EDN/EE Times; imec papers |
| 30 | KLA WaferSight from 2008 ADE acquisition | WRONG | KLA-Tencor acquired ADE in 2006; fixed | KLA history |
| 31 | Surfscan SP7xp "as of ~2024-2025" | WRONG | SP7XP announced December 2020, 12.5 nm sensitivity; fixed | KLA press release Dec 2020 |
| 32 | Rayleigh d⁶: 26 nm scatters ~1/60 of 52 nm | CONFIRMED | 2⁶ = 64 | Calculation |
| 33 | COPs ~100 nm octahedral voids | CONFIRMED | | Standard |
| 34 | Epi: TCS at 1,050-1,150 °C, 2-4 µm/min; Centura Epi, ASM Epsilon | CONFIRMED (typical) | | Applied/ASM product lines |
| 35 | SEMI: advanced epi for logic main growth driver in 2025 | CONFIRMED | SEMI cites advanced epi (logic) and polished for HBM | SEMI SMG Feb 2026 release |
| 36 | Smart Cut: Bruel, CEA-Leti, patent 1991; H+ ~5e16; split 400-600 °C | CONFIRMED | | Bruel 1995; Soitec |
| 37 | FD-SOI 12 nm Si / 20-25 nm BOX; photonics 220 nm / 2 µm | CONFIRMED | Soitec as-shipped FD-SOI product | Soitec product data |
| 38 | 2025 shipments 12,973 MSI (+5.8%), revenue ~$11.4 B; 2022 peak ~14,700 MSI | CONFIRMED | Revenue -1.2% YoY | SEMI SMG Feb 10 2026 |
| 39 | Q1 2026 shipments +13% YoY | CONFIRMED | 3,275 MSI, +13.1% | SEMI SMG Q1 2026 release |
| 40 | SUMCO losses 2025; Miyazaki 200 mm closure; GlobalWafers "slowed" Texas | MINOR | Miyazaki announced Feb 2025, production ends by end-2026; GlobalWafers opened Sherman May 2025 (~$3.5 B phase 1), phase 2 unscheduled; Siltronic slowed Singapore ramp; fixed wording | DigiTimes; Dallas News; Siltronic PR |
| 41 | Leading-edge processed wafer $15,000-25,000; silicon 2-3% of cost | MINOR | Reported N3 ~$18-20k, N2 ~$30k; $150-200 wafer is ~1% ; fixed to $18-30k and ~1-2% | Trade press reports |
| 42 | Market shares SEH ~30 / SUMCO ~24 / GW ~16 / Siltronic ~12 / SK Siltron ~11; top-5 ~85% | UNVERIFIABLE (approximate) | Consistent with commonly cited figures; kept hedged as "approximate" | Analyst estimates |

## Edits applied
- Intro paragraph: football-field analogy reworded so the scaling (whole wafer to 100 m) matches the ~7 µm figure.
- Process-flow table: wire-saw kerf harmonized to "~150-170 µm (diamond wire; 200+ µm slurry)" to match the body and Key Numbers.
- "Why the wafer needs a fiducial": corrected 200 mm wafers (flat or notch option; most use notch), notch angle tolerance to +5°/-1°.
- "Why a notch and not a flat": flat area corrected from ~57 mm² to ~160 mm²; notch history corrected (200 mm option first, sole fiducial at 300 mm).
- Alkaline etching: KOH anisotropy ratio widened to "tens to a few hundred times".
- Laser marking: SEMI M12 = 12 characters, M13 = 18 characters.
- Drying: "Rotagoni" attributed to imec (not SCREEN).
- Flatness metrology: KLA's ADE acquisition dated 2006.
- Particle inspection: Surfscan SP7XP dated to late 2020 with 12.5 nm sensitivity.
- Prices: leading-edge processed-wafer cost changed to "reported ~$18,000-30,000" and silicon share to ~1-2%.
- Inventory correction: SUMCO/Miyazaki, Siltronic and GlobalWafers events reworded to match the record; Q1 2026 MSI figure added.
- Market shares: GlobalWafers Texas fab described as opened in 2025 (~$3.5 B first phase) rather than "building a $5 billion fab".
- Further Reading: Asianometry entry replaced with the actual video titles ("The Amazing, Humble Silicon Wafer"; "The 300mm Silicon Wafer Transition").
- Quiz: no changes needed; all six answers verified correct and unambiguous.

## Remaining caveats
- Company revenue shares (SEH ~30%, SUMCO ~24%, etc.) are analyst estimates and vary by source by a few points; treat as approximate.
- Wafer prices (~$100-150 polished, ~$200+ epi, SOI several hundred dollars) are negotiated under confidential LTAs; treat as order-of-magnitude.
- Reclaim market size (~$700 M) and RS Technologies' ~30% share come from company statements and analyst reports; approximate.
- Chinese 300 mm nameplate capacity (>1 M wafers/month) is an aggregate of announced capacity, not verified output.
- Process numbers (removal per step, damage depths, wire tension, DSP/CMP rates) are representative recipes; each wafer maker's actual flow differs.
