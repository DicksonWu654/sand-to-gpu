# Review: Module 08 — Photolithography II: EUV in Full Detail
Reviewer summary: The source physics (photon energy, Mo/Si Bragg condition, Si L-edge, tin UTA and charge states, CO2 critical density, pre-pulse/main-pulse, hydrogen/stannane debris chemistry), the optics (six-mirror 0.33 NA POB, 6 degree CRA, anamorphic 4x/8x High-NA), the photon-statistics worked example, and the ASML/Zeiss/Trumpf/Cymer supply-chain facts are accurate and current through the February 2026 1 kW source demonstration. Two real errors were fixed: the tin-consumption worked example was off by a factor of 1,000 (72 ng x 50 kHz is 3.6 mg/s, ~0.3 kg/day, not 3.6 ug/s), and the opening line put the ArF immersion limit at "38 nm pitch" (it is ~38–40 nm half-pitch, 76–80 nm pitch, contradicting Module 07). Several product/company details were corrected or updated (multilayer bandwidth, Trumpf five-stage ~25–40 kW laser, 2012 co-investment figures, Ushio/XTREME LDP history, Lam Aether tool-of-record status, Mitsui CNT pellicle specs and timing, NXE throughput specs, and the July 2026 announcement that High-NA is in HVM on some Intel 18A layers).
Overall verdict: Needed several corrections
Claims checked: 45   Confirmed: 33   Minor: 6   Wrong: 4   Unverifiable: 2

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | ArF immersion "bottoms out at roughly 38 nm pitch in a single exposure" | WRONG | ~38–40 nm half-pitch = 76–80 nm pitch (Module 07 says 76–80 nm). Fixed | Module 07; Rayleigh 0.28 x 193/1.35 |
| 2 | 13.5 nm photon = 91.8 eV; ArF 6.4 eV; ratio 14 | CONFIRMED | 1240/13.5 = 91.9 eV | Arithmetic |
| 3 | Mo/Si bilayer d ~ 6.9–7.0 nm, ~40–50 bilayers, Mo fraction ~0.4, theoretical ~74–75%, achieved ~67–70% | CONFIRMED | Standard multilayer values | Bakshi; CXRO |
| 4 | Si L-edge at 12.4 nm (99.8 eV) | CONFIRMED | Si L2,3 edge 99.8 eV | CXRO |
| 5 | Multilayer peak "about 2% wide (~0.27 nm FWHM)" | MINOR | Single-mirror FWHM ~0.5 nm (~4%); 2% (13.5 nm +/- 1%) is the system in-band definition. Reworded | Bakshi; Cymer papers |
| 6 | Ru cap ~2–2.5 nm; B4C/C diffusion barriers | CONFIRMED | Standard | Literature |
| 7 | Li2+ Lyman-alpha at 13.5 nm; Xe ~10.8–11 nm with CE < 1%; Sn8+–Sn14+ UTA at ~30–40 eV; CE ~5–6% | CONFIRMED | Fomenkov et al. 2017; Bakshi | Adv. Opt. Technol. 6 (2017) |
| 8 | Cymer bought by ASML in 2013 for ~$2.6B | MINOR | ~$2.5B (EUR 1.95B), announced Oct 2012, closed May 2013. Reworded | ASML press releases |
| 9 | Tin reservoir ~250 C (mp 232 C), ~20 um jet at 70–80 m/s, 25–30 um droplets, 50 kHz | CONFIRMED | Standard Cymer/ASML descriptions | Cymer SPIE papers; ASML |
| 10 | Newest sources 60 kHz; 1 kW demo at 100 kHz | CONFIRMED | 60 -> 100 kHz droplet rate in 1 kW proof of concept | Bits&Chips 24 Feb 2026; Tom's Hardware |
| 11 | Worked example: 27 um droplet = 1.03e-14 m3, 72 ng; "3.6 ug/s, 13 mg/h, 0.3 g/day, ~100 g/year, ~1 kg refills" | WRONG (arithmetic) | 72 ng x 50,000/s = 3.6 mg/s = 13 g/h = ~0.3 kg/day = ~10 kg/month of continuous droplet generation. Fixed; refill statement reworded | Arithmetic |
| 12 | ~800,000 droplets per wafer at 220 wph; 5,000–7,500 pulses per field | CONFIRMED | 16 s x 50 kHz | Arithmetic |
| 13 | CO2 10.6 um = 785x EUV wavelength; critical density ~1e19 cm-3 vs ~1e21 for 1 um; 1 um CE 2–3% | CONFIRMED | n_c = 1.1e21/lambda(um)^2 | Plasma physics |
| 14 | Trumpf MOPA with "four or so" amplifiers, ~20–30 kW | MINOR | Trumpf: five amplifier stages, >10,000x gain, tens of kW (40 kW-class units reported). Reworded to five stages, ~25–40 kW | trumpf.com; optics.org |
| 15 | Pre-pulse (formerly Nd:YAG, now CO2-derived, ps options), 1–3 us delay, disk/mist target; CE 2% (2010) -> 5.5% (2017) -> 6%+ | CONFIRMED | Fomenkov 2017; ASML | Literature |
| 16 | Collector ~650 mm, ~5 sr, graded Mo/Si, 60–65% new | CONFIRMED (approx.) | Cymer collector descriptions | Cymer papers |
| 17 | Source power: 250 W (NXE:3400B/C), ~350–400 W (3600D), 500–600 W (3800E/EXE), 1,000 W demo Feb 2026 | CONFIRMED | Bits&Chips: current production 600 W; 1 kW proof of concept Feb 2026 | Bits&Chips; ASML |
| 18 | H2 ~1 mbar buffer; Sn + H -> SnH4; H2 "costs only a few percent per meter at 100 Pa" | MINOR | H2 cross-section ~4e-20 cm2 per molecule at 92 eV gives ~10% loss per meter at 100 Pa. Reworded | Atomic-H photoionization scaling |
| 19 | Gigaphoton ~1 T superconducting magnet mitigation; "sold on Gigaphoton's own source products" | MINOR | Magnetic mitigation correct; Gigaphoton has no commercial EUV source product. Clause removed | Gigaphoton |
| 20 | Collector reflectance decays a few %/1e9 pulses; 1e9 pulses < 6 h at 50 kHz | CONFIRMED | 1e9/5e4 = 20,000 s = 5.6 h | Arithmetic |
| 21 | 2012 sources 10–30 W, availability < 70%; 250 W demonstrated 2016, at customers 2017–18 with NXE:3400B | CONFIRMED | ASML history | ASML; SPIE |
| 22 | Illuminator: field/pupil facet mirrors, FlexPupil; grazing mirrors > 80% | CONFIRMED | ASML/Zeiss | Zeiss SMT |
| 23 | POB: 6 mirrors, 0.33 NA, 4x, Zeiss; 26 x 33 mm field; Zerodur/ULE substrates; IBF finishing | CONFIRMED | Zeiss SMT | Zeiss |
| 24 | Figure ~50 pm RMS; "size of Germany, bump < 1 mm" | CONFIRMED / updated | Zeiss: 1 mm for EUV, 0.1 mm for High-NA. Added High-NA figure | zeiss.com High-NA pages |
| 25 | Transmission worked example: 0.67^4 x 0.65 x 0.67^6 ~ 1.2%; 500 W -> ~5 W at wafer; 21 J per wafer at 30 mJ/cm2 | CONFIRMED | Arithmetic verified | Arithmetic |
| 26 | Reticle: 152 x 152 x 6.35 mm ULE, ~40 bilayers, Ta-based absorber 55–70 nm, CrN backside, Hoya/AGC blanks | CONFIRMED | Standard | SEMI P37/P38; Hoya, AGC |
| 27 | CRA 6 deg; reticle-side NA 0.0825 (+/- 4.7 deg) | CONFIRMED | asin(0.0825) = 4.73 deg | Arithmetic |
| 28 | Poly-Si pellicle ~50 nm, 83–88% single pass; Mitsui license 2021 | CONFIRMED | Mitsui/ASML 2021 | Mitsui Chemicals |
| 29 | CNT pellicle "> 94% single pass, commercialized by Mitsui from 2025, survives 600 W+" | MINOR | Mitsui spec >= 92% (imec > 94%); imec-Mitsui partnership Dec 2023; 5,000/yr plant completed end 2025 for 2025–2026 introduction; targets > 1 kW. Reworded | Mitsui release 28 May 2024; imec |
| 30 | Lasertec sole actinic inspection supplier (ABICS, ACTIS) | CONFIRMED | Lasertec product line | Lasertec |
| 31 | Berliner Glas ASML subsidiary since 2020; VDL ETG, Prodrive, NTS, Edwards suppliers | CONFIRMED | ASML | ASML |
| 32 | NXE:3400C 170 wph at 20 mJ; 3600D 160 wph at 30 mJ; 3800E > 220 wph at 30 mJ | CONFIRMED / refined | 3400C: 170 wph @20 mJ, 135 @30 mJ; 3800E: > 195 wph initially, 220 with upgrades | asml.com product pages |
| 33 | NXE:3800E ~30% throughput gain over 3600D | MINOR | 220/160 = 37.5%. Changed to ~35–40% | Arithmetic |
| 34 | Photon worked example: ~20 photons/nm2 at 30 mJ/cm2; ~3 absorbed in 30 nm CAR at 5 um-1; 750 photons per 16 nm pixel; ArF 290/nm2 | CONFIRMED | Arithmetic verified ("roughly 60 absorbed" for ArF softened to "several tens") | Arithmetic |
| 35 | Z = R^3 L^2 S; secondary-electron blur 2–4 nm; doses 30–60 mJ/cm2 in practice | CONFIRMED | Wallow et al.; literature | SPIE |
| 36 | Inpria acquired by JSR 2021 for ~$514M; tin-oxo clusters; 15–20 um-1 absorption | CONFIRMED | JSR press release Sept 2021 | JSR |
| 37 | "Samsung and SK hynix qualified MOR for DRAM first" | UNVERIFIABLE | Widely reported, not officially confirmed; hedged | Trade press |
| 38 | Lam dry resist "in evaluation and early production since ~2023" | WRONG (outdated) | Lam Aether selected as production tool of record for advanced DRAM by a leading memory maker, Jan 2025; SK hynix partnership since 2022. Updated | Lam newsroom 29 Jan 2025 |
| 39 | 0.33 NA single-exposure ~13 nm HP (26–28 nm pitch); N5 ~28–30 nm, N3 ~23–24 nm metal pitch with EUV LELE/SALELE | CONFIRMED (approx.) | k1 0.32 x 13.5/0.33 = 13.1 nm; N3 pitches from TechInsights/analysts | WikiChip; TechInsights |
| 40 | EXE:5000 shipped Dec 2023 (250 crates), completed Apr 2024 at Intel D1X; EXE:5200B first shipped April 2025 | CONFIRMED / updated | EXE:5200B accepted at Intel Dec 2025; July 2026: High-NA in HVM on some Intel 18A layers (Panther Lake). Added | Bits&Chips Apr 2025; Tom's Hardware Dec 2025; ASML 15 Jul 2026 |
| 41 | Anamorphic 4x/8x, 26 x 16.5 mm half-field, reticle-side +/- 8 deg at 4x/0.55; DOF ~120 -> ~45 nm | CONFIRMED | asin(0.1375) = 7.9 deg; 13.5/NA^2 | Arithmetic; ASML |
| 42 | EXE:5000 ~185 wph, EXE:5200B 175 -> 220 wph; ~EUR 350M (~$380M); ~10 High-NA in 2027 | CONFIRMED | ASML/Tom's Hardware; 56 low-NA + 10 High-NA scheduled 2027 | ASML; TechPowerUp |
| 43 | Zeiss SMT 24.9% bought by ASML in 2016 for EUR 1B; Trumpf laser business "~EUR 1B/yr" | CONFIRMED / UNVERIFIABLE | Zeiss stake confirmed; Trumpf EUV revenue not disclosed (total sales EUR 4.3B). Hedged as "reported" | ASML; Optica OPN Jul 2026 |
| 44 | > 350 EUV shipped; 100th early 2020; 31/42/40/53/44/48 in 2020–2025 | CONFIRMED (approx.) | 100th confirmed (Bits&Chips 2020); yearly figures are revenue-recognized units; sum ~350. Reworded "roughly 350" | ASML annual reports; Bits&Chips |
| 45 | 2012 co-investment: "Intel, TSMC, Samsung invest EUR 1.38B in equity" | WRONG | EUR 3.85B for 23% equity; EUR 1.38B was the R&D funding; Intel 15% and $4.1B incl. $1B R&D. Fixed | ASML 2012 press releases |
| 46 | XTREME/Philips abandoned LDP "around 2010" | WRONG (date) | Ushio took over Philips' LDP unit in 2010 and reached 30 W at IF in 2011; wound down a few years later. Fixed | Ushio releases 2010–2011 |
| 47 | Harbin LDP ~100–150 W (2025); prototype scanner with ex-ASML engineers, ~2028 target; SMEE SSA800 | CONFIRMED | Reuters Dec 2025 via Asia Times; SCMP | Asia Times; SCMP |
| 48 | History: Kinoshita 1986; EUV LLC 1997 ~$250M; ETS 2001; alpha tools 2006; NXE:3100 2010; 3300B 2013; 3350B 2015; 3400B 2017 125 wph/250 W; Samsung 7LPP then TSMC N7+ 2019 | CONFIRMED | Standard history | Bakshi; ASML |
| 49 | Further Reading: Bakshi 2nd ed. 2018; Fomenkov AOT 6 (2017) 173; van Schoot SPIE; Chip War 2022; Bits&Chips / Asianometry / SemiAnalysis titles | MINOR | First four confirmed; three trade-press titles could not be confirmed and were replaced with confirmed ones | SPIE; De Gruyter; asianometry.com; bits-chips.com |

## Edits applied
- Opening paragraph: "38 nm pitch" corrected to "38–40 nm half-pitch (a 76–80 nm pitch)" for consistency with Module 07.
- Mo/Si mirror section: bandwidth sentence rewritten (single mirror ~0.5 nm / ~4% FWHM; ~2% is the system in-band definition); Key Numbers row updated to match.
- LPP source intro: Cymer price/timing corrected to ~$2.5B, announced 2012, closed 2013.
- Droplet worked example: consumption corrected from 3.6 ug/s / 13 mg/h / 0.3 g/day / ~100 g/yr to 3.6 mg/s / 13 g/h / ~0.3 kg/day / ~10 kg/month; reservoir sentence reworded (kilograms of tin, in-line refill or swap every few weeks); Key Numbers row updated.
- Drive laser: "four or so" amplifiers and "~20–30 kW" changed to five amplifier stages, >10,000x gain, tens of kW (~25–40 kW); Key Numbers row updated.
- Debris mitigation: hydrogen absorption sentence corrected (~10% per meter at 100 Pa, engineered to a few percent total); removed the claim that Gigaphoton sells its own EUV source products.
- Mirror figure paragraph: Zeiss "size of Germany" comparison completed (1 mm for NXE mirrors, 0.1 mm for High-NA).
- Pellicle section: CNT pellicle transmission (>= 92%, imec > 94%), imec-Mitsui partnership date (Dec 2023), Mitsui plant (5,000 sheets/yr, completed end 2025), and 1 kW design target added; Key Numbers row updated.
- Stages section: NXE:3800E gain over 3600D changed from ~30% to ~35–40% with the 220 vs 160 wph figures.
- Throughput section: NXE:3400C (135 wph at 30 mJ) and NXE:3800E (> 195 initially, 220 with upgrades; 500–600 W source) specs refined.
- Photon worked example: ArF absorbed-photon figure softened to "several tens" in a 100 nm film.
- Resists: MOR DRAM adopters hedged as "widely reported"; Lam dry resist updated to the Aether brand, the 2022 SK hynix partnership, and the January 2025 production-tool-of-record selection.
- High-NA: EXE:5200B acceptance at Intel (Dec 2025) added; Intel strategy paragraph now records the July 2026 announcement of High-NA in HVM on dual-qualified Intel 18A layers; Key Players Intel row and History paragraph updated accordingly.
- Supply chain: Trumpf EUV revenue hedged as "reported" against its ~EUR 4.3B total; cumulative EUV count reworded to "roughly 350" with yearly figures labeled as revenue-recognized and the 2027 schedule (56 low-NA + 10 High-NA) added.
- China section: XTREME/Philips LDP history corrected (Ushio 2010 takeover, 30 W in 2011, wound down later).
- History: 2012 co-investment corrected to EUR 3.85B for 23% equity plus EUR 1.38B R&D; EXE:5200B (April 2025) and July 2026 High-NA HVM milestone added to the timeline.
- Further Reading: unconfirmed Bits&Chips, Asianometry, and SemiAnalysis titles replaced with confirmed ones.
- Quiz: no changes needed; all six answers and explanations remain consistent with the corrected module (Q3's "~2% to ~5–6%" CE and Q6's 1 mbar hydrogen are unchanged).

## Remaining caveats
- Prices (NXE:3800E ~$200M, EXE:5200B ~EUR 350M/$380M, collector ~$1M, reticles "hundreds of thousands of dollars") and per-pass economics are trade-press estimates; ASML does not publish list prices.
- Collector reflectance/lifetime, droplet-generator swap intervals, tin reservoir sizes, and the source-vessel hydrogen pressure profile are proprietary; the module's figures are order-of-magnitude reconstructions from Cymer/ASML conference papers.
- Node-level metal pitches (N5 ~28–30 nm, N3 ~23–24 nm) and which layers use EUV LELE/SALELE are analyst and TechInsights reconstructions, not TSMC disclosures.
- Chinese EUV source power (~100–150 W) and the prototype scanner timeline (~2028) rest on Reuters/SCMP reporting of unverifiable sources.
- The cumulative EUV count (~350) mixes shipments with revenue-recognized units; the exact number differs by a few percent depending on the definition.
- Trumpf's EUV-laser revenue and the memory makers using Inpria MOR are reported, not officially disclosed.

## Polish pass (readability review, September 2026): number-level changes
- Claim 12 refinement: "5,000–7,500 pulses per field" is retained as pulses fired per field of wall-clock time (~0.1–0.15 s × 50 kHz), but the module no longer says a point on the wafer integrates thousands of pulses. With a 2–3 mm slit scanned at ~0.6–0.8 m/s (derived from dose = P/(slit width × scan speed) with ~5 W at the wafer and 30 mJ/cm²), a point is lit for ~3–5 ms and sees ~150–250 pulses; the jitter-averaging figure was corrected from 5%/√5,000 ≈ 0.07% to 5%/√200 ≈ 0.35%.
- Claim 42 refinement: the EXE:5000's 185 wph is ASML's figure at 20 mJ/cm² and the EXE:5200B's 175 wph is at 50 mJ/cm² (ASML EXE:5200B product page states "At dose: 50 mJ/cm²"; Tom's Hardware, Dec 2025). The module previously quoted the EXE:5000 at 30 mJ/cm²; corrected, and the Key Numbers row now states both doses.
- New verified numbers added (ASML, "5 things you should know about High NA EUV lithography", 2024): EXE wafer stage 8 g (twice the NXE's, implying ~4 g), EXE reticle stage 32 g (four times the NXE's, implying ~8 g).
- Collector-decay sentence: the "every few weeks" conclusion now states its assumptions (duty cycle ~30–50%, swap threshold ~20–30% reflectance loss, 1–2% per 10⁹ pulses), flagged as order-of-magnitude reconstructions.
- All bare "(~)" uncertainty flags were replaced with explicit wording ("estimate", "order of magnitude", "as far as public information goes").
