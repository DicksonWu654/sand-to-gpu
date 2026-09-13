# Review: Module 07 — Photolithography I: Photoresist and DUV
Reviewer summary: The physics (Rayleigh, k1 floor, DOF, standing waves, CAR mechanism, PSM etch depth, capillary collapse) and the history (157 nm cancellation, XT:1250i/XT:1900i dates, TWINSCAN, FlexRay, IBM CAR invention) are all correct and the worked examples' arithmetic checks. The corrections are in the market/product-status material: ASML's 2025 revenue split was misstated (DUV is ~37% of total, not "roughly half"), the Dutch export-control threshold was out of date (NXT:1970i/1980i have needed licenses since September 2024), Intel 14A High-NA was described as "in early production" (it is installed/qualified, risk production 2027), Canon's NIL shipment date was a year early, Nikon's current flagship (NSR-S636E) was missing, and a mis-attribution of 76–80 nm pitches to "M1" at 7 nm-class nodes was fixed.
Overall verdict: Accurate with minor fixes
Claims checked: 42   Confirmed: 33   Minor: 4   Wrong: 4   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | ArF immersion scanner ~275–300 wph; NXT:2100i ~295 wph, MMO ~1.3 nm | CONFIRMED | ASML spec: ≥295 wph, MMO ≤1.3 nm | asml.com NXT:2100i page |
| 2 | NXT:2150i exists "as of ~2025" (no specs given) | MINOR | ≥310 wph, MMO ≤1.0 nm, diamond wafer table; specs added | asml.com NXT:2150i page |
| 3 | Nikon NSR-S635E as current Nikon flagship, ~275 wph | MINOR | S635E (2018) ≥275 wph, MMO ≤2.1 nm; superseded by NSR-S636E (Jan 2024, ≥280 wph, MMO ≤2.1 nm). Added S636E | nikon.com press releases |
| 4 | TEL ~85–90% of leading-edge coater/developer market; SCREEN SOKUDO DUO #2 | CONFIRMED (approx.) | TEL commonly cited at ~90% | Trade press |
| 5 | HMDS reaction 2 Si-OH + HMDS -> 2 Si-O-SiMe3 + NH3, 120–150 C, contact angle 60–70 deg | CONFIRMED | Standard | Mack; Levinson |
| 6 | Standing-wave period lambda/(2n) = ~57 nm for n ~1.7 | CONFIRMED | 193.4/3.4 = 56.9 nm | Arithmetic |
| 7 | Spin-coat thickness ~ 1/sqrt(rpm) (Meyerhofer 1978); doubling speed cuts thickness ~30% | CONFIRMED | Meyerhofer, J. Appl. Phys. 49, 3993 (1978); 1/sqrt(2) = 0.71 | JAP 1978 |
| 8 | 0.26 N TMAH = 2.38 wt% | CONFIRMED | Standard | Industry convention |
| 9 | NTD with n-butyl acetate, Fujifilm/JSR ~2010 | CONFIRMED | Fujifilm NTD papers 2008–2010 | SPIE proceedings |
| 10 | Capillary pressure 2*gamma/spacing ~3–4 MPa across 40 nm | CONFIRMED | 2 x 0.072 / 40e-9 = 3.6 MPa | Arithmetic |
| 11 | CAR invented at IBM by Ito, Willson, Frechet in early 1980s | CONFIRMED | 1982–83 | Ito, Adv. Polym. Sci. 172 (2005) |
| 12 | Chemical gain ~1e2–1e3; acid diffusion 5–20 nm (ArF) | CONFIRMED | Standard | Mack; Ito |
| 13 | DNQ Wolff rearrangement to indene carboxylic acid; QE ~0.2–0.3; 100–300 mJ/cm2 | CONFIRMED | Standard | Mack |
| 14 | Rayleigh: CD = k1*lambda/NA; k1 = 0.25 floor; production k1 ~0.28–0.30 | CONFIRMED | Standard two-beam limit | Mack; Levinson |
| 15 | Worked example: 0.28 x 193.4/1.35 = 40.1 nm; 0.25 -> 35.8 nm; DOF = 0.6 x 193.4/1.35^2 = 64 nm | CONFIRMED | Arithmetic verified | Arithmetic |
| 16 | "7 nm-class nodes' M1 pitches of 76–80 nm were set by this limit" | WRONG | N7 M0/M1 pitch is ~40 nm (SADP/SAQP); Intel 10 nm M0/M1 36–40 nm. The 76–80 nm pitches are the first single-exposure intermediate metals. Reworded | WikiChip N7 / Intel 10 nm pages |
| 17 | Water n = 1.437 at 193 nm; dn/dT ~ -1e-4/K | CONFIRMED | Standard | Burnett (NIST); Lin 2004 |
| 18 | Water "absorption length ~1 m" at 193 nm | MINOR | Absorbance ~0.01–0.05 /cm (tens of cm); 1 mm absorbs <1%. Reworded | SPIE/RIT immersion papers |
| 19 | 157 nm cancelled 2003; CaF2 birefringence; no pellicle | CONFIRMED | Intel dropped 157 nm May 2003 | Trade press; Lin 2004 |
| 20 | XT:1250i first production immersion 2004; XT:1900i NA 1.35 in 2007 | CONFIRMED | ASML history | ASML |
| 21 | High-index fluids/LuAG abandoned ~2008 | CONFIRMED | Industry history | SPIE |
| 22 | Cymer an ASML subsidiary since 2013; Gigaphoton a Komatsu subsidiary | CONFIRMED | Cymer acquisition closed May 2013 | ASML |
| 23 | ArF laser 10–15 mJ/pulse, 6 kHz, 60–90 W, E95 ~0.3 pm, MOPA, ~96% Ne | CONFIRMED | Cymer XLR 700ix/800ix class specs | Cymer |
| 24 | 2014 and 2022 Ukraine crises threatened neon supply | CONFIRMED | Widely reported | Trade press |
| 25 | FlexRay programmable illuminator (~2010) | CONFIRMED | Introduced on NXT:1950i | ASML |
| 26 | Reticle 152x152x6.35 mm, 4x, 26x33 mm field = 104x132 mm on mask | CONFIRMED | Standard | SEMI P1 |
| 27 | Alt-PSM etch depth 193/(2 x 0.56) ~172 nm | CONFIRMED | n(SiO2, 193 nm) = 1.5603 -> 172.6 nm | Arithmetic |
| 28 | 6% MoSi att-PSM ~70 nm, standard for critical 193 nm layers | CONFIRMED | Standard | Levinson |
| 29 | TWINSCAN since 2001; NXT (~2010) planar motors and encoder grid plate | CONFIRMED | ASML history | ASML |
| 30 | Zeiss Starlith 1900i catadioptric NA 1.35 lens | CONFIRMED | Zeiss SMT | Zeiss |
| 31 | IMS multi-beam mask writers since ~2016; curvilinear ILT in production ~2020–2023 | CONFIRMED | IMS MBMW-101 (2016) | IMS |
| 32 | TSMC N7+ (2019) first EUV layers (4); N6 (5) | CONFIRMED | TSMC | TSMC/WikiChip |
| 33 | N5 up to 14 EUV layers; first node with fewer masks; "1.35x N16 vs 1.45x N7" | UNVERIFIABLE (ratios) | 14 EUV layers and mask reduction confirmed (IEDM 2019); the N16 ratios could not be sourced; replaced with analyst estimate ~70 vs ~78 masks | WikiChip; SemiWiki |
| 34 | N7 fins ~30–34 nm pitch, lowest metal 36–40 nm via SAQP | CONFIRMED | TSMC N7 fin 30 nm/M1 40 nm; Intel 10 nm fin 34 nm/M0 36 nm | WikiChip |
| 35 | ASML ~90% of litho market; 2025 revenue ~€32–33B "roughly half DUV systems" | WRONG (split) | 2025: €32.7B total; DUV €12.0B (37%), EUV €11.6B (35%), service €8.2B. Fixed with actual figures | ASML Q4 2025 release |
| 36 | China ~30–49% of ASML system sales 2023–2024 | CONFIRMED / updated | 29% (2023), 36% (2024, quarterly peaks 49%), 33% (2025) | ASML annual reports |
| 37 | Dutch export rules restrict "only NXT:2000i and above" | WRONG | Since 7 Sept 2024 NXT:1970i and NXT:1980i also require Dutch licenses | ASML statement Sept 2024; TrendForce |
| 38 | High-NA EUV "in early production at Intel (14A)" | WRONG | 14A risk production is targeted for 2027 (EXE:5200B accepted at Intel late 2025); High-NA did enter HVM in July 2026 but on dual-qualified Intel 18A layers, not 14A | Tom's Hardware; Bits&Chips; ASML 15 Jul 2026 |
| 39 | Canon FPA-1200NZ2C "first shipped in late 2023" to TIE | WRONG (date) | Announced Oct 2023; delivered to Texas Institute for Electronics 26 Sept 2024 | Canon global press release |
| 40 | JSR owned by Japan Investment Corporation; Japan ~90% of ArF/EUV resist | CONFIRMED | JIC tender offer completed 2024 | JSR/JIC |
| 41 | SMEE 90 nm-class ArF tool | CONFIRMED | SSA600/20 | Trade press |
| 42 | Further Reading: Mack (Wiley 2007); Levinson 4th ed. (SPIE 2019); Lin JM3 3(3) 2004; Ito Adv. Polym. Sci. 172 (2005); Asianometry video titles | MINOR | First four confirmed; the three Asianometry titles could not be confirmed; replaced with confirmed "A Deep Dive into Immersion Lithography Technology" | Publisher sites; asianometry.com |

## Edits applied
- Litho-cell intro: Nikon entry now "NSR-S635E and, since 2024, NSR-S636E".
- Worked example (Rayleigh): the sentence attributing 76–80 nm pitches to 7 nm-class "M1" rewritten to say those are the first single-exposure metal levels, with M0/M1 at 36–40 nm needing SADP/SAQP.
- "Why 157 nm Died": water absorption changed from "absorption length ~1 m" to "absorbance ~0.01–0.05 per cm (tens of centimetres); a 1 mm film absorbs well under 1%".
- Scanner anatomy intro: added NXT:2150i specs (≥310 wph, MMO ≤1.0 nm) and replaced Nikon S635E with S636E (2024; ≥280 wph, MMO ≤2.1 nm).
- Cost/step section: N5 mask-count sentence replaced the unsourced "1.35x/1.45x N16" ratios with "~70 masks vs ~78 for N7 (analyst reconstructions)" and cited TSMC's IEDM 2019 statement (up to 14 EUV layers replacing at least 4x as many immersion layers).
- Roadmap table: total masks row changed to N5 ~70–80, N3 ~80, N2 ~80.
- Roadmap paragraph: High-NA at Intel changed from "in early production" (for 14A) to "in high-volume use at Intel since mid-2026 for a few dual-qualified 18A layers ahead of its full insertion at 14A (risk production targeted for 2027)", per ASML's 15 July 2026 announcement.
- Tool market: ASML 2025 figures replaced with actuals (€32.7B; DUV €12.0B / EUV €11.6B / service €8.2B); China share updated (29%/36%/33% for 2023/2024/2025); export-control sentence corrected to include the NXT:1970i/1980i license requirement from September 2024.
- Tool market: Nikon sentence updated to S635E (2018) and S636E (2024), ≥280 wph; Canon NIL shipment corrected to "announced October 2023, delivered September 2024".
- Key Numbers: throughput row adds NXT:2150i ≥310 wph; overlay row adds NXT:2150i ≤1.0 nm; EUV-layers row now "N5 up to 14 ... total masks ~70–80".
- Key Players: Nikon row lists NSR-S635E / NSR-S636E.
- Further Reading: Asianometry item replaced with a confirmed title.
- Quiz: no changes needed; Q6's "DUV about half its system revenue" is consistent with the corrected figures (DUV €12.0B of €23.6B system sales).

## Remaining caveats
- Scanner prices ($60–80M for NXT:2100i-class, ~$200M for NXE:3800E) are trade-press estimates; ASML does not publish list prices.
- Per-pass cost figures in the SAQP-vs-EUV worked example are illustrative order-of-magnitude estimates, not foundry data.
- EUV layer counts for N3/N2 (~20–25) and the per-layer roadmap table are reconstructions from TSMC/imec/ASML presentations and analyst reports; TSMC does not disclose exact layer assignments.
- Immersion-hood gap (~3 mm), scan speeds (~800 mm/s), and encoder/alignment details are approximate public descriptions of proprietary designs.
- Track share (TEL ~85–90%) and resist share (Japan ~90%) are commonly cited but not audited figures.
