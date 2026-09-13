# Review: Module 06 — Thermal Oxidation and Thin-Film Deposition
Reviewer summary: A strong, textbook-grade module. The Deal-Grove treatment (rate constants, activation energies, the experimental table, the worked-example arithmetic) checks out against the 1965 paper and standard texts, and the tool/vendor landscape is current through the 2025 Lam Altus Halo (Mo) launch. The biggest fixes were a wrong Stoney-equation bow figure (35 µm should be ~60 µm for a 300 mm wafer), a misdated FCVD introduction (2010, not ~2011), an anachronistic "1990s" 100 nm gate oxide in the worked example, and an understated Endura shipment count. Several proprietary claims were hedged.
Overall verdict: Accurate with minor fixes
Claims checked: 40   Confirmed: 32   Minor: 5   Wrong: 2   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Si atom density 5.0e22 cm-3, SiO2 unit density 2.2e22, so oxide consumes 0.44x of Si | CONFIRMED | Standard (44-46% depending on oxide density) | Plummer/Jaeger texts |
| 2 | Deal and Grove published the linear-parabolic model in 1965, J. Appl. Phys. 36, 3770 | CONFIRMED | Correct citation | JAP 36, 3770 (1965) |
| 3 | Dry B = 772 exp(-1.23 eV/kT) um2/h; wet (640 torr) B = 386 exp(-0.78 eV/kT) | CONFIRMED | Standard Arrhenius fits | Jaeger Table 3.2 / Deal-Grove |
| 4 | Dry B/A (111) = 6.23e6 exp(-2.0 eV/kT); wet = 1.63e8 exp(-2.05 eV/kT); divide by 1.68 for (100) | CONFIRMED | Standard | Jaeger / Deal-Grove |
| 5 | Table of A, B, B/A, tau at 920/1000/1100/1200 C, dry and wet | CONFIRMED | Matches Deal-Grove Tables (e.g. dry 1000 C: A 0.165, B 0.0117, tau 0.37 h) | Deal & Grove 1965 |
| 6 | Wet 20-25x faster in parabolic regime at 1000 C | CONFIRMED | 0.287/0.0117 = 24.5 | Arithmetic |
| 7 | C* ~3e19 cm-3 for H2O vs ~5e16 for O2 at 1000 C (ratio ~600) | CONFIRMED | 5.2e16 and 3.0e19 are the textbook values | Deal-Grove; Plummer |
| 8 | H2O diffuses "somewhat more slowly" than O2 in SiO2 | MINOR | Back-calculating from B and C* gives D(H2O) roughly an order of magnitude below D(O2); direction correct, magnitude understated; left as is | Arithmetic from D-G constants |
| 9 | Worked example: 100 nm dry at 1000 C takes ~1.9 h; 1 um dry ~99 h; wet 1000 C ~4.3 h; wet 1100 C ~2.2 h | CONFIRMED | Arithmetic verified | Arithmetic |
| 10 | Worked example set in a "1990s-style process" with 100 nm gate oxide | WRONG | 100 nm gate oxides are early-1970s; 1990s gate oxides were ~5-10 nm (module itself says ~100 nm in early 1970s). Fixed to "1970s-style" | Module 1.7; scaling history |
| 11 | (111) 11.8e14 vs (100) 6.8e14 Si atoms/cm2; linear rate ratio 1.68 | CONFIRMED | Jaeger's "available bonds" table values; 1.68 is Deal-Grove's empirical ratio | Jaeger; Deal-Grove |
| 12 | Wet bubbler at 95 C gives ~640 torr | CONFIRMED | Vapor pressure of water at 95 C = 634 torr | Steam tables |
| 13 | Applied Vantage RadOx/RTO chambers as canonical ISSG/radical oxidation tool | CONFIRMED | Vantage RadOx launched 2005 on Radiance chamber | AMAT press release (2005) |
| 14 | TEL Trias SPA plasma oxidation at 300-600 C | CONFIRMED | TEL Trias SPA (slot plane antenna) product line | tel.com |
| 15 | SiO2 bandgap ~9 eV, breakdown ~10 MV/cm; GeO desorbs above ~400 C | CONFIRMED | Standard | Sze; literature |
| 16 | Pb-center Dit ~1e12 as grown, ~1e10 cm-2 eV-1 after forming-gas anneal (4-10% H2, 400-450 C) | CONFIRMED | Standard | Plummer ch. 6 |
| 17 | Gate oxide ~1.2 nm SiON at 90/65 nm; Intel 45 nm HKMG in 2007 | CONFIRMED | Mistry et al. IEDM 2007 | IEDM 2007 |
| 18 | Vertical furnace vendors: TEL TELINDY PLUS, Kokusai AdvancedAce-300 and TSURUGI-C2, ASM A412 | CONFIRMED | Product names correct | Vendor sites |
| 19 | Mattson now Chinese-owned (Beijing E-Town) | CONFIRMED | Acquired by E-Town Dragon 2016 | Press |
| 20 | LPCVD poly 580-650 C; nitride DCS+NH3 ~750 C; TEOS 650-750 C; HTO ~900 C | CONFIRMED | Standard | Wolf & Tauber; Plummer |
| 21 | PECVD 13.56 MHz with 300-400 kHz LF for stress tuning; Producer twin-chamber x3; Lam Vector four-station | CONFIRMED | Standard / product pages | AMAT, Lam |
| 22 | Low-k SiOC:H k ~2.7-3.0; porous ULK 2.2-2.5 via porogen + UV cure ~400 C | CONFIRMED | Standard | Literature |
| 23 | HDP-CVD: Lam Speed, Applied Ultima; ICP 1-5 mtorr, ion density 1e11-1e12 | CONFIRMED | Standard | Vendor pages |
| 24 | FCVD introduced by Applied (Producer Eterna) "around 2011" | WRONG | Announced 24 Aug 2010 | AMAT press release |
| 25 | FCVD chemistry: TSA + NH3 radicals, ozone/steam cure, 10-20% shrink | CONFIRMED | Consistent with published FCVD literature | Literature |
| 26 | W CVD: nucleation WF6+SiH4/B2H6, bulk WF6+3H2 at 400-450 C; Lam Altus majority share | CONFIRMED | Standard; Lam states leadership in W | Lam |
| 27 | Lam Altus Halo first purpose-built Mo ALD tool (2025) | CONFIRMED | Announced 19 Feb 2025 | Lam newsroom |
| 28 | TMA/H2O GPC 1.0-1.2 A, ~1/3 monolayer; ALD window | CONFIRMED | George, Chem. Rev. 2010 | Chem. Rev. 110, 111 |
| 29 | Intel 2007 HKMG used HfCl4 + H2O at ~300 C | UNVERIFIABLE | Intel never disclosed precursor; widely reported (ASM Pulsar). Hedged with "reportedly" | Trade press |
| 30 | HfO2 density 9.68 g/cm3, M 210.5; n = 2.8e22; 9e14 Hf/cm2 per monolayer; 5.5e15 Hf/cm2 in 2 nm; 1.2 mg Hf per wafer | CONFIRMED | Arithmetic verified | Arithmetic |
| 31 | ASM Pulsar on XP8; Applied Olympia; "TEL Triase+/NT333" for high-k | MINOR | NT333 is TEL's semi-batch spatial ALD system; Triase+ is mainly Ti/TiN/W metal. Reworded | tel.com |
| 32 | ASM >55% of single-wafer ALD; ALD over half of ASM equipment revenue | CONFIRMED | ASM investor day statements | ASM IR |
| 33 | Kokusai ~70% of batch ALD | CONFIRMED | SemiAnalysis Kokusai IPO analysis | SemiAnalysis 2023 |
| 34 | "ALD is now a larger equipment market than PVD" | MINOR | Single-wafer ALD ~$3B (2024) plus batch ~$2B vs PVD ~$4B: comparable; hedged to "at least as large as" | ASM IR; estimates |
| 35 | Sputter yields at 500 eV Ar+: Cu ~2.3, Al ~1.0, Ti ~0.5, Ta ~0.6, W ~0.6 | CONFIRMED | Standard tables | Ohring; Wolf & Tauber |
| 36 | "Applied has shipped well over 3,000 Endura systems since 1990" | MINOR | 3,000th shipped 2003; >4,500 by 2010; many more since. Updated | AMAT press releases |
| 37 | Applied ~80%+ of PVD market | CONFIRMED (approx.) | Commonly cited; hedged in text | Trade press |
| 38 | Intel eSiGe PMOS at 90 nm in 2003, ~17% Ge; Ge lattice 4.2% larger | CONFIRMED | Intel 90 nm papers (IEDM 2003) | IEDM 2003 |
| 39 | Stoney: Si(100) biaxial modulus 180 GPa; 1 GPa x 100 nm film bows 300 mm wafer ~35 um | WRONG | kappa = 6*sigma*h_f/(M*h_s^2) = 5.6e-3 m^-1, R = 180 m, bow = D^2/(8R) = 62 um (35 um only for a 200 mm wafer). Fixed to ~60 um | Arithmetic |
| 40 | Further Reading: Deal-Grove 1965; Plummer ch. 6 and 9; George Chem. Rev. 2010; Johnson/Hultqvist/Bent Mater. Today 2014; Mistry IEDM 2007; Mackus/Merkx/Kessels Chem. Mater. 2019; SemiAnalysis "Going Vertical" 2023 | CONFIRMED | All exist with correct volumes/pages | Publisher sites; newsletter.semianalysis.com |

## Edits applied
- Section 1.2 worked example: "1990s-style process" changed to "1970s-style process (the era of ~100 nm gate oxides)" to match the module's own scaling history (1.7).
- Section 4.4: FCVD introduction date "around 2011" corrected to "in 2010" (Applied press release 24 Aug 2010).
- Section 5.3: Intel HfCl4 + H2O precursor hedged as "reportedly"; noted Intel never published it.
- Section 5.3: "TEL's Triase+/NT333" replaced with "TEL's NT333 (a semi-batch spatial-ALD system)" since Triase+ is a metal (Ti/TiN/W) platform.
- Section 5.7: "ALD is now a larger equipment market than PVD" softened to "at least as large as PVD" (markets are comparable, ~$5B vs ~$4B).
- Section 6.3: Endura shipment count updated from "well over 3,000" to ">4,500 by 2010, 3,000th in 2003, many more since".
- Section 8: Stoney worked figure corrected from ~35 um to ~60 um for a 300 mm wafer (with the 200 mm figure ~30 um shown for context); intermediate curvature added.
- Key Players table: Applied "Endura Volta W/Mo" corrected to "Endura Volta CVD Co/W/Ru" (Volta is Applied's CVD cobalt/tungsten/ruthenium family; Mo is not a Volta product).
- Quiz: no changes needed; all eight answers verified against the corrected module (the quiz file has 8 questions; an earlier draft of this line said six).

## Round-2 polish (readability pass, no verified numbers changed)
- Defined at first use: native oxide, carriers/holes/mobility/NMOS/PMOS/CMOS (new Before you start bullet), ion implantation, anneal, silicon nitride, polysilicon/grains, stoichiometric, sputtering, LPCVD/HTO/SACVD/MOCVD/FEOL, adsorption/desorption, laminar flow, plenum, sheet resistance, die/wafer sort, {111} notation, nitrided oxide, SiNx:H notation, CMP, HF, bit line, critical dimension (CD), seed, grain boundary, M1, SEM, quantum confinement, Vt, passivate, strain.
- Deal-Grove worked example now states why the (111) table is used and gives the (100) answer (~2.9 h for 100 nm; derived from the verified constants and the verified 1.68 ratio). Intuition box names which two B/A entries give the ~4x factor.
- 5.8 downstream box: "0.2 nm drift in GPC" corrected to "0.2 nm drift in the finished spacer thickness" (the original contradicted the ~0.1 nm/cycle GPC taught in 5.1).
- Depth added (all new numbers are derived arithmetic or flagged "~"): 1.4 pyrogenic steam (machine, recipe, interlocks, steam-pressure worked example, failure box); 2.2 DSA (dwell, peak temperature, why ms anneals help, ~0.8 nm diffusion length added to the thermal-budget example); 4.3 HDP-CVD (D/S definition, recipe numbers, corner worked example, failure box); 5.2 PEALD (plasma placement, cycle timing, production films, failure box); 6.1 PVD recipe numbers; 6.3 liner-budget worked example; 8 backside-compensation recipe and failure box. Removed one duplicate vendor roll-call from 5.7. Dangling "(~)" in 6.1 replaced.

## Remaining caveats
- Market shares (AMAT ~80% PVD, ASM >55% single-wafer ALD, Kokusai ~70% batch ALD, Lam "majority" of W, epi "roughly half each") are vendor or analyst statements, not audited figures; treat as approximate.
- ISSG process conditions (H2 1-33%, 5-20 torr) and the Si(111) 11.8e14 atoms/cm2 figure (Jaeger's "available bonds" count, not the crystallographic single-layer density of 7.8e14) are textbook-style values.
- Deposition market size ($25-30B, ~a quarter of WFE) is an order-of-magnitude estimate; third-party market reports disagree widely.
- Ge content of S/D SiGe at 5/3/2 nm (50-65%) and inner-spacer/RMG layer thicknesses are inferred from conference papers and TechInsights teardowns, not foundry disclosures.
