# Review: Module 13 — Metrology, Inspection and Yield
Reviewer summary: The physics (ellipsometry, XRR, CD-SEM, OCD, DBO, dark-field scattering), the yield models, and the two worked examples (yield table, H100 harvesting) were all recomputed and are correct. The important fixes were three arithmetic errors: the e-beam pixel count for a 300 mm wafer at 5 nm pixel is 2.8 × 10^15, not 10^12 (the "two hours" conclusion became ~ 80 days, which actually strengthens the argument; the quiz question carried the same error and was fixed); wafer-steps per year at 100k WSPM × 1,200 steps is 1.4 billion, not 4 billion; and a 20 nm EUV contact at 30 mJ/cm² receives thousands, not "a few hundred", of photons. Company facts corrected: Lasertec is still the sole actinic patterned-mask inspection supplier (KLA competes with DUV/e-beam, not actinic), KLA no longer sells a CD-SEM, Hitachi High-Tech does not sell fab XRR tools, and Intel's own CEO stated the 18A D0 < 0.4 figure in September 2024 (it was not a 2025 rumour). CD-SEM site throughput was understated by roughly 10×.
Overall verdict: Needed several corrections
Claims checked: 40   Confirmed: 29   Minor: 5   Wrong: 6   Unverifiable: 0

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | 1,000 to 1,500 steps over three to four months | CONFIRMED | | Industry consensus |
| 2 | "kill an $80,000 GPU die" | MINOR | Data-center GPUs sell for ~ $30,000 class; changed | Market pricing (H100/B200) |
| 3 | Process control ~ 1/8 of fab capex; 10 to 15 percent of WFE | CONFIRMED | Consistent with KLA "process control intensity" data | KLA investor materials |
| 4 | SE incidence 65 to 75°, near Si Brewster angle | CONFIRMED | Si Brewster ~ 75° | Fujiwara 2007 |
| 5 | rho = r_p/r_s = tan(Psi) exp(i Delta); 190 to 1,000 nm range; rotating compensator | CONFIRMED | | Fujiwara 2007 |
| 6 | SE repeatability ~ 0.01 nm 3 sigma | CONFIRMED | Typical vendor specs 0.01 to 0.02 nm | KLA/Onto specs |
| 7 | Tools: KLA SpectraFilm/Aleris, Onto Atlas, Nova PRISM/i-series; Nova began integrated in CMP | CONFIRMED | | Vendor pages |
| 8 | XRR: Cu K-alpha 0.154 nm, critical angle 0.2 to 0.4°, Kiessig fringes | CONFIRMED | | X-ray metrology texts |
| 9 | XRR/XRF vendors "Bruker, Rigaku, Hitachi High-Tech" | WRONG | Hitachi does not sell fab XRR/XRD; Bruker (Jordan Valley), Rigaku, Malvern Panalytical do | Vendor product lines |
| 10 | Four-point probe R_s = 4.532 V/I; KLA RS series | CONFIRMED | pi/ln2 = 4.532 | Standard |
| 11 | FTIR: Si-H 2,150, N-H 3,350, O_i 1,107 cm^-1 | CONFIRMED | | ASTM F1188; SiN literature |
| 12 | CD-SEM landing energy 300 to 800 eV; SE < 50 eV; shrinkage 1 to 3 nm; precision ~ 0.2 nm | CONFIRMED | | Hitachi/Applied literature |
| 13 | CD-SEM "50 to 150 sites per hour" | WRONG | Vendors quote tens to 100+ wafers/hr at several sites each, i.e. hundreds to 1,000+ sites/hr | Hitachi CD-SEM specs |
| 14 | Hitachi CG7300 current generation | CONFIRMED | Announced Dec 2019 | Hitachi High-Tech press release |
| 15 | "KLA's eCD" as a CD-SEM alternative | WRONG | KLA discontinued eCD in the 2000s; no current KLA CD-SEM | KLA product portfolio |
| 16 | OCD: RCWA, 30 to 50 µm targets, Nova/KLA SpectraShape/Onto Atlas | CONFIRMED | | Vendor pages |
| 17 | CD-AFM Bruker Dimension X3D; FIB Thermo Helios; TEM Spectra/HF5000 | CONFIRMED | | Vendor pages |
| 18 | Overlay budget ~ 2 nm 3 sigma at N2/18A; TMU 0.1 to 0.2 nm | CONFIRMED (approximate) | Consistent with IRDS | IRDS Lithography/Metrology |
| 19 | KLA Archer 750 and 800; AIM targets | CONFIRMED | Archer 750 Feb 2020; Archer 800 current | KLA press release; kla.com |
| 20 | DBO: YieldStar 380/385, 1375/1385; 10 to 16 µm targets; 0.05 to 0.1 nm repeatability | CONFIRMED | | ASML product pages |
| 21 | KLA 2935 since ~ 2018, 2950 since ~ 2020 | MINOR | 2935 ~ 2017 to 2018; 3900-series/2950 ~ 2019 to 2020; 2965/3935 current | KLA product pages |
| 22 | Laser-sustained plasma source | CONFIRMED | | KLA-Tencor SPIE 2015 paper |
| 23 | Rayleigh d^6/lambda^4, 64× per halving; DUV 266 nm | CONFIRMED | | Physics |
| 24 | Surfscan SP7/SP7XP < 20 nm PSL at > 100 wph; Puma 9850/9980 | CONFIRMED | | KLA product pages |
| 25 | EBI tools KLA eSL10, Applied PROVision, ASML HMI eP5 | CONFIRMED | | Vendor pages |
| 26 | "2.8 × 10^12 pixels at 5 nm; two hours at 400 MHz" | WRONG | 7.07 × 10^16 nm² / 25 nm² = 2.8 × 10^15; ~ 80 days at 400 MHz | Own calculation |
| 27 | eScan 1000: 9 beams, 2020, ~ 6×; eScan 1100: 25 beams, first install 2022, up to 15× | CONFIRMED | First install announced 25 April 2022 | ASML press release |
| 28 | "about 4 billion wafer-steps a year" | WRONG | 100,000 × 12 × 1,200 = 1.44 × 10^9 | Own calculation |
| 29 | eDR7380, SEMVision G7, Hitachi RS review; CNN ADC since ~ 2017 | CONFIRMED | | Vendor pages |
| 30 | EUV: 20 nm contact at 30 mJ/cm² "receives only a few hundred" photons | WRONG | ~ 20 photons/nm² at 92 eV; ~ 6,000 incident on 314 nm² | Own calculation (standard EUV shot-noise estimate) |
| 31 | Scribe line 60 to 80 µm; WAT 25 to 50 pads at 5 to 17 sites; Keysight 4080, Keithley S500 | CONFIRMED | | Industry practice |
| 32 | Western Electric rules; C_pk formula; 1.33 target implies 3 sigma < 1.5 nm for ±2 nm | CONFIRMED | 2/1.33 = 1.5 | SPC texts |
| 33 | Murphy 1964 Bell Labs (triangular); Seeds (exponential); Stapper negative binomial | CONFIRMED | | Murphy Proc IEEE 1964; Stapper IBM JRD 1983 |
| 34 | Yield table (Poisson/Murphy/Seeds/NB) and D0 = 0.5 examples | CONFIRMED | All 24 cells recomputed; match to 0.1 point | Own calculation |
| 35 | Chiplet example: 0.82^4 = 45 percent | CONFIRMED | | Own calculation |
| 36 | TSMC 2025 NA symposium: N2 D0 lower than N3/N5/N7 at same stage, two quarters before HVM | CONFIRMED | | Tom's Hardware, April 2025 |
| 37 | Intel 18A "D0 near 0.4 in mid-2025" was rumour | WRONG (attribution) | Intel's CEO stated "below 0.4" in Sept 2024; fixed | Tom's Hardware; Deutsche Bank conference 2024 |
| 38 | GH100 814 mm², 144 SMs, 132 (SXM) / 114 (PCIe); H100 50 MB L2; DPW formula gives ~ 63/60 | CONFIRMED | Arithmetic recomputed | NVIDIA H100 whitepaper |
| 39 | Harvesting example: 78 percent effective, 47 to 49 dies; "$350 to $400 per die" | MINOR | $16k to $18k / 47 to 49 = $330 to $380; adjusted | Own calculation |
| 40 | KLA ~ 55 to 56 percent share; FY2025 revenue ~ $12 B; Lasertec sole actinic supplier "though KLA has since developed competing capability" | MINOR / WRONG | Share and revenue confirmed (FY25 $12.16 B); KLA has no actinic tool, competes with DUV/e-beam; ACTIS A300 is current | KLA 10-K; Lasertec; trade analyses |

Further Reading: all ten items confirmed to exist (Mack 2007; Stapper IBM JRD 27(6) 1983; Murphy Proc IEEE 52 1964; Diebold 2001; Levinson 4th ed 2019; Fujiwara 2007; Kuo and Kim Proc IEEE 87(8) 1999; KLA/ASML product pages; Tom's Hardware April 2025 article; IRDS Metrology chapter). Mandatory closing sections present and in order. Quiz: Q4 stem corrected (pixel count); the other five answers verified correct.

## Edits applied
- Intro: "$80,000 GPU die" changed to "$30,000-class data-center GPU".
- Section 1 (XRR): vendor list corrected to Bruker (Jordan Valley), Rigaku, Malvern Panalytical.
- Section 2 (CD-SEM): site throughput corrected to hundreds to 1,000+ sites/hr; CG7300 dated (late 2019); "KLA's eCD" replaced with note that it was discontinued.
- Section 4 (bright-field): KLA generation timeline refined (2935 ~ 2017 to 2018; 3900/2950 ~ 2019 to 2020; 2965/3935 current).
- Section 4 (EBI): pixel count corrected to 2.8 × 10^15 and time to ~ 80 days; Key Numbers row updated to match.
- Section 4 (sampling): wafer-steps per year corrected from 4 billion to 1.4 billion.
- Section 5 (stochastics): photon count corrected (~ 20 photons/nm², a few thousand per 20 nm contact).
- Section 9 (learning curve): Intel 18A D0 < 0.4 attributed to Intel's CEO, September 2024; Panther Lake launch noted.
- Section 10 (H100 example): cost per sellable die adjusted to $330 to $380 to match the arithmetic.
- Section 12 (EUV masks): Lasertec remains sole actinic supplier; ACTIS A300 series added; KLA's competing approach described correctly.
- Quiz Q4 stem: "2.8 trillion" corrected to "2.8 × 10^15 (about 80 days at 400 MHz)".

## Remaining caveats
- Absolute D0 values (0.1 mature, 0.4 to 0.6 risk production) are industry estimates; TSMC and Intel do not label their axes. The text says so.
- Overlay budgets, inspection sensitivities, and CD-SEM precision are vendor-spec-class numbers that vary by layer and recipe.
- KLA's ~ 55 to 56 percent share is from analyst estimates; its optical patterned-wafer share (> 85 percent) is higher still.
- The H100 harvesting model (70 percent harvestable area, 12 spare SMs) is an illustrative assumption, not NVIDIA data.
