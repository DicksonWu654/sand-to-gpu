# Review: Module 02 — Crystal Growth: Czochralski and Float Zone
Reviewer summary: The physics in this module is careful and correct: surface atom densities, segregation coefficients, Scheil arithmetic, the Voronkov v/G criterion and its numerical range, latent heat, densities, neck-stress arithmetic, the NTD nuclear data and the FZ limits all check out against reference values. The fixes were small: Teal's first silicon crystal was 1952 (with Buehler), not 1951; the Scheil worked example's "first ~40% of the body" for an 8 to 12 Ω·cm spec is actually ~65 to 70% (g ≈ 0.68); the body-mass range (250–300 kg) contradicted the module's own 343 kg example; the fused-silica "softens above 1,200 °C" line conflicted with Module 01's ~1,650 °C softening point; and the cycle time was quoted two ways. Toshiba was added as the largest MCZ magnet supplier and a note on Topsil's FZ300 programme was added.
Overall verdict: Accurate with minor fixes
Claims checked: 40   Confirmed: 33   Minor: 5   Wrong: 1   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Lattice constant 0.5431 nm; 5.0 × 10²² atoms/cm³ | CONFIRMED | — | Textbook |
| 2 | (100) surface 6.8 × 10¹⁴ vs (111) 7.8 × 10¹⁴ atoms/cm² | CONFIRMED | 2/a² = 6.78e14; 4/(√3·a²) = 7.83e14 | Recomputed |
| 3 | D_it ~10¹⁰ eV⁻¹cm⁻² on (100) | CONFIRMED | Standard | Sze / Nicollian-Brews |
| 4 | Czochralski 1916; Teal & Little Ge 1950; Si 1951 | MINOR | Si single crystals: Teal & Buehler, Phys. Rev. 87, 190 (1952) | Bell Labs / CHM |
| 5 | Dash 1958–59; Theuerer 1952; Keck & Golay 1953 | CONFIRMED | Dash JAP 30 (1959) 459; Keck & Golay Phys. Rev. 89 (1953) 1297 | Literature |
| 6 | Argon ~10–50 mbar, 50–150 slpm | CONFIRMED (typical) | Industry ranges | Zulehner; Shimura |
| 7 | Crucible 32–36 in, walls 10–15 mm, 300–450 kg; synthetic inner layer | CONFIRMED | — | Crucible vendor data |
| 8 | "Above ~1,200 °C fused silica softens" | MINOR (inconsistent with Module 01's ~1,650 °C) | Softening point ~1,650–1,665 °C; strain/annealing points ~1,000–1,100 °C; viscous deformation at 1,420 °C requires susceptor | Corning/Heraeus fused silica data |
| 9 | Crucible price low thousands to >$10k | UNVERIFIABLE | Proprietary; Module 01 harmonized to "several thousand dollars" | — |
| 10 | Heater 100–200 kW, 1,500–1,600 °C | CONFIRMED (typical) | — | Puller vendor data |
| 11 | MCZ magnets: Sumitomo Heavy Industries, Mitsubishi Electric | CONFIRMED (incomplete) | Toshiba has built >500 MCZ magnets since 1988; JASTEC also supplies; added | Toshiba; SHI product page |
| 12 | Puller makers: PVA TePla (EKZ; FZ leader), Ferrotec, Linton, S-TECH, JSG | CONFIRMED | — | Company sites |
| 13 | Hamco 1952 → Kayex; KX300 first 300 mm puller 1987; Linton owns Kayex since 2013 | CONFIRMED | Linton timeline states KX300 in 1987 | lintoncrystal.com timeline |
| 14 | Run "two to three days" vs "2.5 to 3.5 days" elsewhere | MINOR (internal inconsistency) | Harmonized to 2.5–3.5 days (Module 00 also aligned) | — |
| 15 | Latent heat ~1,790 J/g (~50 kJ/mol); 720 MJ for 400 kg | CONFIRMED | 1,787 J/g; 50.2 kJ/mol | NIST |
| 16 | Liquid Si 2.57 vs solid 2.33 (2.30 at m.p.) g/cm³ | CONFIRMED | — | Reference data |
| 17 | Segregation table: B 0.8, P 0.35, As 0.3, Sb 0.023, Ga 0.008, Al 0.002, O ~1.25, C 0.07, N 7e-4 | CONFIRMED | Trumbore values | Textbook |
| 18 | Scheil: B rises ~1.6x at g = 0.9; P ~4.5x | CONFIRMED | 0.1^-0.2 = 1.58; 0.1^-0.65 = 4.47 | Recomputed |
| 19 | 10 Ω·cm p-type = 1.35e15; 5 mg B in 400 kg; 13 ppbw | CONFIRMED | Recomputed (5.2 mg) | Irvin curves |
| 20 | 8–12 Ω·cm spec takes "only the first ~40% of the body" | WRONG (arithmetic) | 8 Ω·cm ≈ 1.7e15 cm⁻³ reached at (1−g)^-0.2 = 1.26, g ≈ 0.68, i.e. ~65–70% | Recomputed |
| 21 | Dash neck 3–4 mm, 100–200 mm, 3–6 mm/min; {111} at 54.7° to <100> | CONFIRMED | — | Dash 1959; Shimura |
| 22 | Four habit lines on dislocation-free <100> | CONFIRMED | — | Textbook |
| 23 | Body 305–310 mm, 1.8–2.5 m, 0.5–1.5 mm/min; G ~20–40 K/cm | CONFIRMED (typical) | — | von Ammon 2014 |
| 24 | Meniscus / growth angle 11° | CONFIRMED | — | Surek & Chalmers |
| 25 | Grashof >10¹⁰ | CONFIRMED | — | Literature |
| 26 | Voronkov 1982; (v/G)_crit ≈ 1.3–2 × 10⁻³ cm²/(min·K); v_crit 0.4–0.6 mm/min at G = 3 K/mm | CONFIRMED | 0.13–0.2 mm²/(min·K) × 3 K/mm | Voronkov JCG 59 (1982); Falster & Voronkov |
| 27 | COPs 100–200 nm, 10⁵–10⁶ cm⁻³, 2 nm oxide lining; term coined early 1990s | CONFIRMED | Ryuta et al. 1990 | Literature |
| 28 | 1 ppma O = 5 × 10¹⁶ cm⁻³; CZ 10–18 ppma; k ≈ 1.25; ~99% evaporates as SiO | CONFIRMED | New ASTM calibration | SEMI MF1188 |
| 29 | Thermal donors ~450 °C; donor kill 650 °C | CONFIRMED | — | Textbook |
| 30 | Liquid Si conductivity ~10⁶ S/m; transverse 0.2–0.4 T; cusp 0.05–0.15 T | CONFIRMED | 1.2e6 S/m | Literature |
| 31 | Ingot body "~250 to 300 kg" | MINOR (inconsistent with 343 kg example) | Changed to ~250–350 kg | Recomputed |
| 32 | 2 m × 306 mm = 343 kg; 1,850 wafers; 128 g/wafer; 55–60% utilisation | CONFIRMED | Recomputed | — |
| 33 | World 300 mm demand 8–9 M wafers/month | MINOR | SEMI 2025: 12,973 MSI total; ~3/4 is 300 mm → ~7–8 M/month; widened to 7–9 M | SEMI Feb 2026 |
| 34 | Neck stress 416/234/150/104 MPa at 3/4/5/6 mm | CONFIRMED | Recomputed | — |
| 35 | Heavily B-doped neck-less seeds (Shin-Etsu, 1990s) | CONFIRMED | — | Shin-Etsu patents/papers |
| 36 | FZ: 2–3 MHz coil; surface tension 0.72 N/m; 2–4 mm/min; NTD ³⁰Si 3.1%, ³¹Si 2.6 h; Petten, OPAL | CONFIRMED | — | Reference data; NRG/ANSTO |
| 37 | Production FZ max 200 mm; 300 mm not commercial as of ~2025 | CONFIRMED | Siltronic FZ at 200 mm since 2002; Topsil FZ300 programme 2025–28 targets 300 mm; Siltronic's 300 mm "Ultimate Silicon" is a low-oxygen MCZ product | siltronic.com; Topsil/1stmile |
| 38 | G450C formed 2011 (Intel, TSMC, Samsung, IBM, GF, SUNY Albany); ASML paused late 2013; wound down 2017 | CONFIRMED | — | Trade press |
| 39 | 300 mm volume production ~2001–02; G12 ingot ~295 mm | CONFIRMED | — | Industry |
| 40 | Top-5 share ~85–90%; SEH ~30%, SUMCO ~25%, GlobalWafers ~15–17%, Siltronic ~12–13%, SK Siltron ~10–12% | CONFIRMED (approx.) | — | SEMI / company reports |
| 41 | Further Reading: Zulehner JCG 65 (1983); Dash JAP 30 (1959); Voronkov JCG 59 (1982); Falster & Voronkov MSE B 73 (2000); Shimura 1989; Rudolph 2015; von Ammon pss(a) 211 (2014); The Register Aug 2022; Linton timeline | CONFIRMED | All real | Library / web |

## Edits applied
- History: Teal and Little germanium 1950; Teal and Buehler silicon 1952 (was "1951").
- Crucible paragraph: replaced "Above ~1,200 °C fused silica softens" with correct statement (viscous deformation below the ~1,650 °C softening point; strain/annealing points ~1,000–1,100 °C), consistent with Module 01.
- Magnets: added Toshiba (>500 MCZ magnets since 1988) and JASTEC to the supplier list in the body and Key Players.
- Recipe intro: run time harmonized to 2.5–3.5 days (matches Ingot section and Key Numbers; Module 00 also aligned from "3–4 days").
- Scheil worked example: 8–12 Ω·cm spec now takes ~65–70% of the body (g ≈ 0.68), with the arithmetic shown.
- Ingot section: body mass ~250–350 kg (was 250–300, contradicting the 343 kg example and Key Numbers' 250–340).
- Volume context: 300 mm demand ~7–9 M wafers/month with the SEMI 2025 MSI figure; ingots/month ~4,000–6,000.
- Float Zone: added Topsil FZ300 (2025–28) programme and Siltronic's 300 mm low-oxygen MCZ alternative; noted Siltronic 200 mm FZ since 2002.
- Quiz: no changes; all six answers verified (Q2's "6 to 7 ohm-cm at 90% solidified" and Q5's 416 MPa match the corrected module).

## Remaining caveats
- Puller counts (low thousands) and ingots per puller per month are estimates; wafer makers do not publish fleet sizes.
- Crucible and hot-zone prices are order-of-magnitude.
- The (v/G)_crit range is the commonly cited band; individual hot zones calibrate their own value.
- 300 mm silicon volume (7–9 M/month) is inferred from SEMI's area data; SEMI does not publish a public 300 mm unit count.
- Wafer-maker market shares are approximate and shift a few points year to year.
