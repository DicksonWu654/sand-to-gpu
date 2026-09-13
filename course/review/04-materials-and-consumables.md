# Review: Module 04 — Beyond Silicon: Compound Semiconductors and Fab Consumables
Reviewer summary: The physics (SiGe critical thickness, SiC polytypes and PVT, GaN 2DEG, III-V growth), the consumables chemistry, and the mask supply chain are accurate and the worked examples compute correctly. The biggest problem was an unverifiable "2025 TrendForce" SiC substrate share table (SICC 27.6% / Wolfspeed 24.9% / TankeBlue 18.2% / Coherent 4.5%) that contradicts the published 2024 data (Coherent was ~14%, not ~4.5%); it was replaced with the verified 2024 figures plus a hedged 2025 statement. Several Further Reading items were fabricated or mis-titled (an "H. Kinoshita" SPIE paper on the IMS writer; Asianometry episode names) and were replaced with real references; a few dates and hedges were tightened.
Overall verdict: Accurate with minor fixes
Claims checked: 44   Confirmed: 36   Minor: 5   Wrong: 2   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Si electron/hole mobility ~1,400/~450; Eg 1.12 eV; Ec ~0.3 MV/cm | CONFIRMED | | Standard (Sze) |
| 2 | Property table (Ge, GaAs, InP, 4H-SiC, GaN values) | CONFIRMED | All within textbook ranges | Sze; Kimoto & Cooper; Ioffe database |
| 3 | Si/Ge lattice mismatch 4.2% (5.431 vs 5.658 Å) | CONFIRMED | | Standard |
| 4 | Matthews-Blakeslee worked example: h_c ~35-40 nm for Si0.75Ge0.25 | CONFIRMED | Arithmetic recomputed (5.76 × 1.45 × 4.4 ≈ 37 nm) | Matthews & Blakeslee 1974 |
| 5 | Intel eSiGe introduced at 90 nm in 2003 with ~17% Ge | CONFIRMED | IEDM 2003; production late 2003/early 2004 | Intel IEDM 2003 |
| 6 | SiC decomposes ~2,830 °C at 35 atm; no CZ | CONFIRMED | | Kimoto & Cooper |
| 7 | 3C 2.36 eV, 6H 3.02 eV, 4H 3.26 eV; 4° off-axis toward [11-20] | CONFIRMED | | Kimoto & Cooper |
| 8 | PVT: source 2,300-2,500 °C, growth 100-500 µm/h, boule in ~a week | CONFIRMED (typical) | | Kimoto & Cooper; industry |
| 9 | Micropipes < 0.1 cm⁻²; TSD/TED ~10³ cm⁻² | CONFIRMED | | Industry data |
| 10 | Wolfspeed Mohawk Valley opened 2022, first 200 mm SiC fab | CONFIRMED | April 2022 | Wolfspeed |
| 11 | Wolfspeed led SiC substrates with ~34% in 2024 | CONFIRMED | 33.7%, market $1.04 B | TrendForce May 2025 |
| 12 | 2025 TrendForce shares: SICC 27.6%, Wolfspeed 24.9%, TankeBlue 18.2%, Coherent 4.5% | WRONG / UNVERIFIABLE | No such TrendForce release found; 2024 data: TankeBlue 17.3%, SICC 17.1%, Coherent 13.9%. Replaced with verified 2024 figures and hedged 2025 statement | TrendForce May 2025 |
| 13 | Wolfspeed Chapter 11 mid-2025, emerged later in 2025 | CONFIRMED | Filed 30 June 2025, emerged 29 Sept 2025, ~70% debt cut; dates added | SEC 8-K; press |
| 14 | 150 mm SiC substrate > $1,000 (2022) to ~$400-800 (2025) | CONFIRMED (approx.) | TrendForce reports 6-inch price war in 2025 | TrendForce Nov 2025 |
| 15 | SiC substrates cost 50-100× a silicon wafer | MINOR | True in 2022 for same-diameter 150 mm; ~20-40× at 2025 prices; reworded (module and quiz) | Calculation from prices |
| 16 | Tesla Model 3 (2017) first mass-market full-SiC inverter, ST modules | CONFIRMED | | Widely reported |
| 17 | MACOM bought Wolfspeed RF business 2023; Transphorm now Renesas | CONFIRMED | Dec 2023; June 2024 | Company releases |
| 18 | GaN: Eg 3.4 eV, Ec ~3.3 MV/cm, N2 pressure ~6 GPa at ~2,500 °C | CONFIRMED | | Standard |
| 19 | AlGaN/GaN 2DEG ~10¹³ cm⁻², 1,500-2,000 cm²/V·s, 300-400 Ω/sq | CONFIRMED | | Standard HEMT literature |
| 20 | GaN-on-Si mismatch ~17% lattice, ~54% thermal | CONFIRMED | | Standard |
| 21 | 650 V GaN in "every" 65-240 W USB-C charger | MINOR | Overstated; changed to "most compact" chargers | Industry |
| 22 | GaAs mp 1,238 °C; InP mp 1,062 °C, P pressure ~27 atm | CONFIRMED | | Standard |
| 23 | 2021 TSMC/MIT bismuth contacts to MoS2, ~100 Ω·µm | CONFIRMED | Nature 2021 (~123 Ω·µm) | Shen et al. Nature 2021 |
| 24 | China Ga/Ge export licensing Aug 2023; US ban Dec 2024; Ge price ~doubled 2024 | CONFIRMED | | MOFCOM; trade press |
| 25 | SEMI materials market 2024: $67.5 B, ~$43 B wafer fab | CONFIRMED | $42.9 B fab, $24.6 B packaging | SEMI MMDS Apr 2025 |
| 26 | Inpria acquired by JSR 2021 for $514 M | CONFIRMED | | JSR release |
| 27 | JSR taken private by JIC 2024; DuPont electronics spun off as Qnity late 2025 | CONFIRMED | Qnity 1 Nov 2025 | Company releases |
| 28 | Japan-Korea export controls 1 July 2019; three items; lifted 2023 | CONFIRMED | | METI; press |
| 29 | Neon: Ingas/Cryoin ~45-54% of semiconductor neon; shut March 2022 | CONFIRMED | | Reuters 11 Mar 2022 |
| 30 | NF3 GWP ~17,000; SF6 ~23,500 | CONFIRMED | AR4/AR5 values | IPCC |
| 31 | Merck bought Versum 2019 for $6.5 B; Entegris bought CMC 2022 for $6.5 B; KMG 2018 | CONFIRMED | | Company releases |
| 32 | UPW: 18.18 MΩ·cm theoretical; TOC < 1 ppb; ~1,500-2,500 gal/wafer | CONFIRMED (typical) | | SEMI F63; industry |
| 33 | TSMC Arizona ~4.75 M gal/day; 65% reuse now; reclaim plant 2028 targeting 85-90% | CONFIRMED | | Axios; DCD; azfamily |
| 34 | TSMC process-water recycling 90.3% in 2023 | CONFIRMED | | TSMC ESG data |
| 35 | UPW worked example: 6.0 M gal/day, 22,700 m³/day, ~9 Olympic pools | CONFIRMED | Arithmetic checks | Calculation |
| 36 | EUV blank: 40 Mo/Si bilayers, ~7 nm period, 64-67% reflectivity, 2.5 nm Ru cap, TaBN 55-70 nm | CONFIRMED | | SPIE literature |
| 37 | Hoya ~2/3, AGC ~1/3 of EUV blanks | CONFIRMED (approx.) | Commonly cited; hedged with "roughly" | Trade press |
| 38 | IMS owned by Intel since 2017; TSMC/Bain stakes 2023; MBMW-101 2016, -201 2019, -301 2023; 262,144 beams | CONFIRMED | (IMS also shipped MBMW-261 in 2022) | Klein et al. SPIE 2023 |
| 39 | NuFlare MBM-3000 (2023): ~500k beams, 12 nm beamlets, 3.6 A/cm² | CONFIRMED | | NuFlare SPIE 12751 (2023) |
| 40 | Lasertec ACTIS A150 (2019); A300 for High-NA | CONFIRMED | A300 released Nov 2023; date added | Lasertec release |
| 41 | Mitsui CNT pellicle 5,000-sheet/yr line "completed late 2025" | MINOR | Announced May 2024 with completion scheduled December 2025; reworded as scheduled | Mitsui Chemicals release May 2024 |
| 42 | Pellicle double-pass: 0.9² = 81%, ~19% penalty | CONFIRMED | | Calculation |
| 43 | Mask-set worked example ($15 M base, $20-30 M all-in, $250/wafer at 100k wafers) | CONFIRMED | Arithmetic checks | Calculation |
| 44 | Tekscend Photomask (ex-Toppan, sold to Integral 2025); JX Advanced Metals listed March 2025 | CONFIRMED | | Company releases |

## Edits applied
- Silicon carbide section: replaced the unverifiable 2025 share table with TrendForce's published 2024 shares (Wolfspeed ~34%, TankeBlue ~17%, SICC ~17%, Coherent ~14%, market ~$1.0 B) and a hedged statement that the Chinese pair were reported at or above Wolfspeed in 2025; added exact Wolfspeed Chapter 11 dates (30 June to 29 Sept 2025, ~70% debt cut).
- Key Numbers: SiC share row relabeled to 2024 data with the 2025 hedge.
- Key Players: Wolfspeed/SICC/TankeBlue/Coherent positions updated to the verified 2024 figures.
- Common Misconceptions: "50-100× a silicon wafer" softened to "tens of times more than a silicon wafer of the same diameter (up to ~100× before the 2023-2025 price collapse)".
- GaN-on-Si: "every 65-240 W USB-C charger" changed to "most compact 65-240 W USB-C chargers".
- Photomask inspection: ACTIS A300 dated to November 2023 and described as for anamorphic High-NA masks.
- Pellicles: Mitsui CNT line described as "scheduled for completion in December 2025" at Iwakuni-Ohtake rather than as completed.
- Further Reading item 7: fabricated "H. Kinoshita" citation replaced with the real IMS (Klein, Loeschner, Platzgummer, Proc. SPIE 12497, 2023) and NuFlare (Proc. SPIE 12751, 2023) papers and dated imec/Mitsui releases.
- Further Reading item 9: Asianometry titles corrected to "Japan's Semiconductor Photoresist Monopoly" and "The History of the Semiconductor Photomask"; unverified SiC episode removed.
- Quiz Q1 explanation: "50-100x" changed to "tens of times more than a silicon wafer of the same diameter"; answers otherwise verified correct.

## Remaining caveats
- SiC substrate shares for 2025 are stated only qualitatively; TrendForce's full-year 2025 ranking was not found in any public release.
- Supplier shares for resists (~90% Japan), NF3 (SK Specialty ~40%), sputter targets (JX ~half+), EUV blanks (Hoya ~2/3) and mask prices ($300-500k EUV) are industry estimates without audited sources.
- EUV blank prices, ACTIS tool prices, precursor spend per fab, and consumables as 10-15% of wafer cost are trade-press estimates; treat as order-of-magnitude.
- The SiC substrate price range ($400-800 in 2025) moves quarterly; Chinese 6-inch spot prices were reported below that range in late 2025.
- Lam's dry-resist status ("qualification and early use at memory makers") is based on unpublished customer reports.
