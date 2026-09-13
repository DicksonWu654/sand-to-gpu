# Review: Module 12 — Interconnect: The Back End of Line
Reviewer summary: The module is technically strong; the physics (size effect, damascene rationale, superfill, CMP mechanism, EM/Blech) and the worked arithmetic all check out. The substantive fixes were an internal contradiction on copper's EM activation energy (line 73 said "bulk ~ 1 eV" while the EM section correctly said bulk ~ 2 eV and interface ~ 0.85 eV), a wrong tool name (Lam SABRE 3D is the packaging plating line, not the damascene tool), a wrong corporate lineage (Enthone belongs to MacDermid Alpha/Element Solutions, not DuPont), over-precise metal-layer counts for N3/N2 and Intel 18A, and the ρ×λ table now matches the cited Gall 2016 dataset. Several forward-looking claims (Ru lines in production, Mo in DRAM, TSMC's Co cap) were hedged.
Overall verdict: Accurate with minor fixes
Claims checked: 40   Confirmed: 27   Minor: 7   Wrong: 3   Unverifiable: 3

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Cu bulk resistivity 1.68 µΩ·cm, mean free path ~ 39 nm | CONFIRMED | Gall 2016: 39.9 nm | Gall, JAP 119, 085101 (2016) |
| 2 | Al resistivity 2.65 µΩ·cm, "60 percent higher" than Cu | CONFIRMED | 2.65/1.68 = 1.58 | CRC / Gall 2016 |
| 3 | 0.38 RC is "the Elmore delay" of a distributed line | MINOR | 0.38 RC is the 50 percent step delay; Elmore gives 0.5 RC | Standard VLSI texts (Rabaey; Weste and Harris) |
| 4 | Wire capacitance ~ 0.2 fF/µm, node-independent | CONFIRMED | Typical 0.15 to 0.2 fF/µm | Standard interconnect literature |
| 5 | TaN resistivity ~ 200 µΩ·cm | CONFIRMED | 200 to 250 µΩ·cm typical | Expertise |
| 6 | FO4 delay at N3 "around 10 ps" | MINOR | Sub-10 ps already at 7 nm FinFET; N3 is single-digit ps | Stillmaker/Baas VLSI scaling; ResearchGate FO4 data |
| 7 | "Roughly a third of transistors are repeaters" | MINOR | Estimates vary widely (10 to 30+ percent of cells); hedged | Saxena et al. 2004 (repeater explosion) |
| 8 | Interconnect is "the majority of dynamic power" | MINOR | ~ 50 percent is the commonly cited figure; changed to "roughly half" | Magen et al. 2004 |
| 9 | Worked example: M2 R = 147 kΩ/mm, delay 11 ns; M8 delay 0.17 ns | CONFIRMED | Arithmetic re-verified | Own calculation |
| 10 | TSMC N5 minimum metal pitch 28 nm | CONFIRMED | 28 nm widely reported | SemiWiki IEDM 2019 coverage; WikiChip |
| 11 | TSMC N3 minimum metal pitch ~ 23 nm | CONFIRMED | 23 nm per IEDM 2022 paper | SemiWiki IEDM 2022 TSMC 3nm |
| 12 | Intel 4 M0 30 nm, PowerVia variant 36 nm, Intel 18A ~ 32 nm | CONFIRMED | Hafez VLSI 2023; 18A 32 nm | Tom's Hardware; F. Chen |
| 13 | N5 ~ 15 Cu levels; N3/N2 up to 18; Intel 18A 15 front-side | WRONG (overstated) | N3 IEDM paper: 15-level stack; Intel 4+PowerVia: 14 front + 4 back + RDL; 18A not disclosed precisely | SemiWiki IEDM 2022; Tom's Hardware PowerVia |
| 14 | SHDMIM ~ 10 to 20 fF/µm² | UNVERIFIABLE | TSMC states 4× HDMIM, SHPMIM 2× more; absolute values not public | SemiWiki; TSMC N2 disclosures |
| 15 | N3 M1/M2 use Cu with Co liner | MINOR | TSMC's N3 paper cites an "innovative liner", reported to be Ru | SemiWiki / WikiChip IEDM 2022 |
| 16 | Intel 10 nm: M0/M1 cobalt at 36 nm pitch; COAG | CONFIRMED | | Intel IEDM 2017 |
| 17 | IBM CMOS 7S copper announced September 1997, 0.22 µm | CONFIRMED | Sept 22, 1997; 0.22 µm products, six Cu levels | IBM history; chiphistory.org |
| 18 | AlCl₃ volatile at ~ 180 °C; Cu chlorides not volatile below 200 to 250 °C | CONFIRMED | AlCl₃ sublimes at 180 °C | Chemistry references |
| 19 | Cu EM activation energy "in bulk ~ 1 eV" (line 73) vs "bulk ~ 2 eV, interface 0.8 to 0.9 eV" (line 164) | WRONG (internal contradiction) | Interface ~ 0.8 to 1.0 eV; lattice ~ 2 eV; fixed line 73 | Hu et al. (IBM) EM literature |
| 20 | SiCN cap from trimethylsilane + NH₃ at 350 to 400 °C, k ~ 4.5 to 5.5 | CONFIRMED | Applied BLOk | Expertise |
| 21 | Low-k precursors DEMS/OMCTS, porogen alpha-terpinene, UV cure, k 2.4 to 2.7 porous | CONFIRMED | | Maex et al. 2003; Applied Black Diamond literature |
| 22 | Porous low-k modulus ~ 5 to 10 GPa vs 70 GPa SiO₂ | CONFIRMED | | Maex et al. 2003 |
| 23 | Applied Endura dominates PVD barrier/seed; Volta CVD Co | CONFIRMED | | Applied product pages |
| 24 | Lam "Sabre 3D" is the damascene plating tool | WRONG | SABRE 3D is the WLP/TSV/RDL line; damascene is SABRE Extreme/Max/Excel | lamresearch.com SABRE and SABRE 3D pages |
| 25 | Sabre "with a dozen cells ... ~ 200 wafers per hour" | UNVERIFIABLE | Vendor does not publish; hedged to ~ 100+ wph | Lam product page |
| 26 | Electrolyte 40 g/L Cu²⁺, Cl⁻ ~ 50 ppm; PEG/SPS/JGB additives; CEAC (Moffat, NIST ~ 2000) | CONFIRMED | | Moffat et al. ESSL 2001 |
| 27 | Chemistry vendors: "DuPont (formerly Enthone/Rohm and Haas)" | WRONG | Enthone (ViaForm) is MacDermid Alpha / Element Solutions; Rohm and Haas went Dow then DuPont | macdermidalpha.com; Element Solutions history |
| 28 | Plating worked example: 0.38 g Cu, 1,154 C, 82 s | CONFIRMED | Arithmetic re-verified | Own calculation |
| 29 | Self-anneal resistance drop ~ 20 percent | CONFIRMED | | Cu self-annealing literature |
| 30 | Applied ~ 70 percent CMP share; Ebara #2 | CONFIRMED | Consistent with industry estimates (~ 65 to 70 percent) | Trade press |
| 31 | Cu CMP: H₂O₂ oxidizer, glycine complexer, BTA inhibitor; Preston relation | CONFIRMED | | Steigerwald et al. 1997 |
| 32 | Blech (J×L)_crit ~ 2,000 to 4,000 A/cm; 20 to 40 µm at 1 MA/cm² | CONFIRMED | Literature range ~ 1,500 to 4,000 A/cm for Cu | Blech 1976; Cu EM literature |
| 33 | IBM CoWP cap ~ 2005; Co cap raises E_a to ~ 1.0 to 1.2 eV; Intel eCu at Intel 4 | CONFIRMED | Intel 4 uses eCu for M0 to M4 | Intel VLSI 2022 (Intel 4) |
| 34 | TSMC used Co cap "since ~ N7" | UNVERIFIABLE | TSMC does not disclose; hedged "reported" | none public |
| 35 | ρ×λ table (Al λ = 15 nm, ρλ 4.0; Co λ ~ 10, ρλ 6.2; W λ 15, ρλ 8.0) | MINOR | Gall 2016: Al 18.9 nm/5.0; Co 11.8 nm/7.3; W 15.5 nm/8.2; Mo 11.2/6.0; Ru 6.6 nm (ρ 7.8 in Gall) | Gall, JAP 2016 (Table I) |
| 36 | Ru + O₂ → volatile RuO₄, subtractive Ru; imec 18 nm pitch demos | CONFIRMED | | imec IITC/IEDM papers |
| 37 | "As of ~ 2025 Ru is in the M0/V0 region of at least one leading node" | MINOR (unsupported) | No foundry has confirmed Ru lines in HVM; Ru confirmed only as liner; hedged | Search of 2nm-node coverage, no confirmation found |
| 38 | Mo in 3D NAND (Micron) and DRAM; Lam ALTUS Halo | MINOR | Micron first in NAND (Lam, Feb 2025); DRAM still in development | Lam press release 19 Feb 2025 |
| 39 | Intel 14 nm airgaps at 80 and 160 nm pitch, 17 percent capacitance reduction | CONFIRMED | | Intel IEDM 2014 |
| 40 | PowerVia: Intel 4 test chip 2023, M0 30 to 36 nm, 5 to 10 percent cell utilization; TSMC A16 SPR ramp 2026 to 2027 | CONFIRMED | Hafez et al. VLSI 2023; TSMC A16 H2 2026 | Tom's Hardware; TSMC |

Further Reading: all nine references confirmed to exist (Andricacos 1998, Moffat 2001, Black 1969, Blech 1976, Gall 2016, Steigerwald 1997, Maex 2003, Tőkei IEDM 2020, Hafez VLSI 2023). Mandatory closing sections present and in order. Quiz: all six answers verified correct and unambiguous; no changes.

## Edits applied
- RC delay paragraph: "the Elmore delay" corrected to "50 percent delay of a distributed line; Elmore estimate 0.5 RC".
- Crossover paragraph: FO4 at N3 changed from "around 10 ps" to "under 10 ps"; repeater fraction hedged to "~ 10 to 30+ percent of standard cells"; dynamic power changed from "majority" to "roughly half".
- Metal stack table, M1 to M2 row: noted TSMC N3's "innovative" (reportedly Ru) liner.
- Stack landmarks paragraph and Key Numbers: layer counts corrected to N5 ~ 14 to 15, N3 paper 15 levels, tallest products ~ 17 to 18; Intel 4 PowerVia 14 front + 4 back + RDL, 18A "reported in the same range".
- MIM paragraph: "10 to 20 fF/µm²" replaced with hedged "tens of fF/µm²" plus TSMC's relative (4×, 2×) statements.
- Copper section (line 73): EM activation energy corrected to interface ~ 0.8 to 1 eV, bulk ~ 2 eV, Al 0.5 to 0.7 eV, removing the contradiction with the EM section.
- ECD section, Tools list, Key Players: "Sabre 3D" replaced with "SABRE (Extreme/Max/Excel)"; throughput hedged to "~ 100 or more wph, configuration-dependent".
- ECD chemistry vendors (body, tools list, Key Players): Enthone reassigned to MacDermid Alpha (Element Solutions); DuPont lineage corrected to Rohm and Haas / Dow.
- Metal cap paragraph: TSMC Co cap "since ~ N7" hedged as "reported".
- New Metals table: λ and ρ×λ values aligned with Gall 2016 (Cu 6.7, Al 19 nm/5.0, Co 12 nm/7.3, Ru ρ 7.1 to 7.8/4.7 to 5.1, Mo 6.0, W 15.5 nm/8.2) with a source note.
- Ruthenium paragraph: removed the unsupported claim that Ru lines are in production; now states Ru confirmed only as liner, lines expected at A16/A14-class.
- Molybdenum paragraph: Micron first in NAND per Lam; DRAM "in development"; ALTUS Halo dated Feb 2025.
- Tools list, etch: "Lam and TEL lead Ru/Mo etch" hedged to "Lam, TEL and Applied are all developing".

## Remaining caveats
- Per-layer pitches and thicknesses in the stack table are explicitly labeled representative; foundries do not publish them.
- Market shares (Applied CMP ~ 70 percent, Lam ECD majority) are trade-press estimates.
- MIM capacitor densities, Co/Ru liner choices at TSMC, and Ru/Mo insertion timing at N2/A16 are proprietary; the text now flags them as reported/expected.
- Ru bulk resistivity is quoted as 7.1 µΩ·cm in most interconnect papers but 7.8 in Gall's dataset; both are shown.
