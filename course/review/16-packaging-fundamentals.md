# Review: Module 16 — Packaging Fundamentals: From Wafer to Chip
Reviewer summary: This module is in good shape. The mechanism content (CTE strain arithmetic, bumping, backgrinding, dicing, wire bonding, SAP/ABF, molding, JEDEC qualification) is accurate and internally consistent, and the industry figures (TrendForce top-10 OSAT 2024, TSMC AP1–AP8, Intel glass core) check out against primary sources. Fixes were limited to a cross-module inconsistency (it said HBM4 uses hybrid bonding, contradicting Module 15), a reversed HBM underfill attribution, the ABF/Intel origin story, a stale Panasonic unit name, and Further Reading items that could not be confirmed.
Overall verdict: Accurate with minor fixes
Claims checked: 38   Confirmed: 29   Minor: 6   Wrong: 2   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | CTE: Si 2.6, organic 15–17, Cu 17, SAC305 ~22, EMC 7–12 ppm/K | CONFIRMED | standard handbook values | Lau; Tummala |
| 2 | Corner-bump worked example: DNP 21.2 mm, δ ≈ 50 µm, γ ≈ 70%; 43 µm at ΔT 165 K | CONFIRMED | recomputed | arithmetic |
| 3 | SAC305 melts ~217 °C; Pb-5Sn ~310 °C; indium 156.6 °C | CONFIRMED | | handbook |
| 4 | Coffin-Manson exponent n ≈ 1.5–2 | CONFIRMED | Engelmaier ~1.9 | literature |
| 5 | TSMC bumping in-house at AP2 Tainan | CONFIRMED | AP2 Tainan: microbumps and some CoWoS | DigiTimes Jan 2026 |
| 6 | UBM Ti/TiW 0.1–0.2 µm + Cu 0.2–0.5 µm; resist 50–120 µm; Cu pillar 30–50 µm; SnAg cap 15–25 µm | CONFIRMED | typical | Lau |
| 7 | SnAg cap "melting ~221 °C" for Sn-1.8–2.5Ag | MINOR | eutectic 221 °C at 3.5% Ag; hypoeutectic ~226 °C liquidus; changed to 221–226 | phase diagram |
| 8 | HBM uses hybrid bonding "for HBM4-class parts" | WRONG | HBM4 ships on microbumps; hybrid bonding expected HBM4E/HBM5 (Module 15) | JEDEC 775 µm decision; SemiEng |
| 9 | C4 = IBM 1960s; RoHS 2006 pushed lead-free | CONFIRMED | | history |
| 10 | Disco ~70–80% share in grinders and dicing saws | CONFIRMED | >70% each category | SemiAnalysis; Yahoo Finance |
| 11 | Wheel grits #320–600 / #2000–8000; damage layer 10–20 → 1–3 µm | CONFIRMED | typical Disco process data | Disco |
| 12 | TAIKO ring ~2–3 mm | CONFIRMED | | Disco |
| 13 | Blade dicing: 20–50 µm blade, 30–60k rpm, 50–150 mm/s, CO2 in DI water | CONFIRMED | | Disco |
| 14 | Stealth dicing invented by Hamamatsu ~2002, licensed to Disco; 1,064 nm | MINOR | developed 2002–2005; Disco is an alliance/licensee partner; hedged | Hamamatsu alliance page |
| 15 | Plasma dicing tools: Panasonic "PSAS unit", SPTS (KLA), Plasma-Therm | MINOR | Panasonic Connect APX300 | Panasonic Connect |
| 16 | AuSi eutectic 363 °C; Ag mp 961 °C; sintered Ag ~200 W/m·K | CONFIRMED | | handbook |
| 17 | Placement accuracy: die attach ±10–25 µm, TCB ±1–2 µm, hybrid ±0.1–0.2 µm | CONFIRMED | Besi hybrid bonder ~100 nm | Besi |
| 18 | ~70–80% of packaged units wire-bonded; ~1 trillion units/yr | CONFIRMED (approx.) | commonly cited 75–80%; WSTS units ~1.1 T | K&S; WSTS |
| 19 | Gold crossed $1,000/oz ~2008; Cu ~25% lower resistivity than Au | CONFIRMED | Cu 1.68 vs Au 2.44 µΩ·cm (~30%) | physical constants |
| 20 | Reflow: soak 150–190 °C, peak 240–250 °C, TAL 40–90 s | CONFIRMED | | J-STD-020 profiles |
| 21 | TCB tool cost ~$1–3 M; Hanmi/Hanwha for SK hynix; Semes for Samsung | CONFIRMED | | trade press |
| 22 | "HBM stacks use TC-NCF (SK hynix historically used MR-MUF)" | WRONG | Samsung/Micron TC-NCF; SK hynix MR-MUF today | SK hynix newsroom |
| 23 | ABF: 25–40 µm, 60–75 wt% silica; microvias 50–70 µm; SAP L/S 8–10 µm HVM, 5 µm leading, 2 µm roadmap | CONFIRMED | | Ajinomoto; industry roadmaps |
| 24 | ABF origin: Intel launch customer, "Pentium II-era", 1999 | MINOR | Ajinomoto: research from the 1970s, first adopted 1999 (Pentium III era) | Ajinomoto innovation page |
| 25 | Ajinomoto >90% build-up film share | CONFIRMED | commonly cited >95% | Nikhs/TSPA Substack; trade press |
| 26 | Shinko taken private 2024–25 (JIC consortium); Unimicron Guanyin fire Oct 2020; AT&S Kulim for AMD | CONFIRMED | | public record |
| 27 | ABF panel 510 × 515 mm | CONFIRMED | | industry standard |
| 28 | H100 package ~70–75 mm; Blackwell larger | MINOR | CoWoS-L substrate limit 80 × 80 mm; 9.5× reticle on 120 × 150 mm substrate in 2027; added | TSMC 3DFabric page; TrendForce Apr 2025 |
| 29 | Intel glass core: Sept 2023; early 2026 10-2-10, 78 × 77 mm with EMIB | CONFIRMED (detail added) | NEPCON Japan Jan 2026; 0.8 mm glass core; warpage <20 µm | TechPowerUp; TrendForce 26 Jan 2026 |
| 30 | Escape-routing worked example (3 traces/channel at 10/10; 20 at 2/2) | CONFIRMED | recomputed | arithmetic |
| 31 | EMC: 70–90 wt% silica; mold 175 °C, 7–10 MPa; PMC 4–6 h; Sumitomo Bakelite ~1/3 | CONFIRMED (share approx.) | | supplier data |
| 32 | JEDEC conditions: A104 G/B, A110 130 °C/85%RH, A103 150 °C, B111 1,500 g 0.5 ms; MSL table; 4.7 MPa at 260 °C | CONFIRMED | | JEDEC; steam tables |
| 33 | Top-10 OSAT 2024 $41.6 B; ASE $18.5 B (~45%), Amkor $6.3 B, JCET $5.0 B, Tongfu ~8%, PTI ~5.5%, HT-Tech ~5% | CONFIRMED | ASE $18.54 B (44.6%), Amkor $6.32 B, JCET $5.0 B, Tongfu $3.32 B, PTI $2.28 B, HT-Tech $2.01 B | TrendForce 13 May 2025 |
| 34 | TSMC AP1 Hsinchu (R&D), AP2 Tainan, AP3 Longtan InFO, AP5 Taichung, AP6 Zhunan (Jun 2023), AP7 Chiayi 2026, AP8 Tainan 96,000 m² (9× AP6) | CONFIRMED | | DigiTimes; TrendForce; Nomad Semi |
| 35 | TSMC back-end ~8–10% of revenue; Amkor Peoria for Arizona wafers | CONFIRMED | | TSMC; Amkor |
| 36 | eWLB Infineon 2006; InFO 2016 A10; "replaced flip-chip BGA Samsung had been packaging for Apple" | MINOR | A9 was dual-sourced (TSMC/Samsung) in substrate PoP; reworded | public record |
| 37 | Further Reading: Tummala 2001; Lau 2021/1996; Harper 4th ed. 2004; Intel Sept 2023 title | CONFIRMED | | publishers |
| 38 | Asianometry video titles as listed | UNVERIFIABLE | could not confirm exact titles; replaced with confirmed sources | — |

## Edits applied
- Step 1 (bumping): HBM microbump pitch range 25–55 µm; hybrid bonding now "expected from HBM4E/HBM5" to match Module 15; SnAg cap melting range.
- Step 3 (dicing): stealth-dicing origin hedged (2002–2005, Hamamatsu patents, Disco as alliance partner); Panasonic Connect APX300 replaces "PSAS unit".
- Step 6 (underfill): HBM attribution corrected (Samsung/Micron TC-NCF, SK hynix MR-MUF).
- Why ABF: Ajinomoto research dated from the 1970s; first adoption 1999 in Pentium III era.
- Substrate industry: Blackwell substrate sized to CoWoS-L 80 × 80 mm limit with 120 × 120 mm roadmap; Intel glass demo dated to NEPCON Japan Jan 2026 with core thickness and warpage figures; deployment "second half of the decade".
- Fan-out: InFO sentence reworded (A9 dual-sourced substrate PoP).
- Further Reading: items 7–10 replaced/retitled with confirmable Ajinomoto, TrendForce, Tom's Hardware and SemiAnalysis sources.
- Quiz: no changes needed; all six answers consistent with the corrected text.

## Remaining caveats
- Market shares (Disco 70–80%, Ajinomoto >90%, Sumitomo Bakelite ~1/3, wire-bond ~70–80% of units) are trade-press estimates, not audited figures.
- Substrate cost ($100–300 for a large GPU substrate), TCB tool prices and package cost fractions are order-of-magnitude estimates.
- Process parameters (grinding feeds, plating current densities, mold pressures, TIM thicknesses) are typical ranges; each vendor's recipe differs.
- Die thickness targets for FCBGA (300–700 µm) vary by product; many CPUs keep near-full thickness.
