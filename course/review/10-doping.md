# Review: Module 10 — Doping: Ion Implantation and Annealing
Reviewer summary: The physics is solid throughout: dopant ionisation energies, mobilities and resistivities, diffusivities and the √(Dt) worked example, the analyser-magnet radius, the Gaussian range/junction-depth example, sheet-resistance arithmetic, amorphisation thresholds and the TED story all check out against standard references. The errors were in tool and company facts: SemEquip was bought by Ceradyne (2008), not Applied (2011); Applied's Astra is the DSA laser anneal, not a hot-plate RTP (that description fits Vantage Vulcan); Screen's LA-3100 is a flash-lamp annealer, not a laser tool (the laser is LT-3100); and the SPER rate at 600 °C was understated by ~3x versus Olson and Roth's Arrhenius fit. Market-share figures were hedged.
Overall verdict: Accurate with minor fixes
Claims checked: 40   Confirmed: 31   Minor: 4   Wrong: 3   Unverifiable: 2

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Intrinsic Si: ~10^10 carriers/cm^3, ~2.3×10^5 Ω·cm | CONFIRMED | n_i ≈ 1×10^10, ρ_i ≈ 2.3×10^5 Ω·cm | Sze |
| 2 | Ionisation energies: P 45, As 54, Sb 39, B 45, Ga 72, In 160 meV; ε_r 11.7 | CONFIRMED | Standard shallow-level values | Sze; Plummer |
| 3 | Si atom density 5×10^22; 10^15 = 20 ppb; 10^20 = 0.2% | CONFIRMED | Arithmetic | — |
| 4 | Mobility 1,400 to ~80–100 (e), 470 to ~50 (h) cm^2/V·s from 10^15 to 10^20 | CONFIRMED | Masetti/Caughey-Thomas fits | Masetti et al. 1983 |
| 5 | ρ: 10^15 n ~4.5, p ~13 Ω·cm; 10^20 ~1 mΩ·cm | CONFIRMED | Irvin curves | Sze |
| 6 | B solubility 1–2×10^20 (1,000 °C), ~4×10^20 (1,100 °C); As active 2–3×10^20; P active ~5×10^20 | CONFIRMED | Trumbore; Nobili | Plummer |
| 7 | E_a ~3.5 eV (B, P), ~4 eV (As); D_B ~2×10^-14 at 1,000 °C, ~2×10^-13 at 1,100 °C | CONFIRMED | D0 = 0.76, Ea = 3.46 eV gives 1.5×10^-14 and 1.5×10^-13 | Plummer Table 7-5 |
| 8 | √(Dt) examples: 60 nm, 2.4 nm, 0.6 nm | CONFIRMED | Arithmetic checks | — |
| 9 | Lateral diffusion ~0.8 × x_j | CONFIRMED | 0.75–0.85 typical | Plummer |
| 10 | Bernas vs IHC; IHC standard since late 1990s; source life 100–300 h | CONFIRMED | Industry practice | Axcelis/Applied literature |
| 11 | 10B 19.9%, 11B 80.1% | CONFIRMED | Natural abundance | NIST |
| 12 | Extraction 30–80 kV; Child-Langmuir J ∝ V^3/2 / (d^2 √m) | CONFIRMED | Standard | Ryssel & Ruge |
| 13 | BF2+ 49 amu at 30 keV, 0.5 T gives r ≈ 0.35 m | CONFIRMED | Arithmetic checks | — |
| 14 | BF2 at 30 keV = boron at 6.7 keV | CONFIRMED | 30 × 11/49 | — |
| 15 | Purion XE 12-stage linac 4.5 MeV; VXE 8 MeV; XEmax 15 MeV | CONFIRMED | Axcelis product page | axcelis.com |
| 16 | Spinning disk 13–17 wafers, ~1,200 rpm | CONFIRMED | Classic batch tools | Varian/Axcelis literature |
| 17 | Tilt 7°, twist ~22° | CONFIRMED | Standard practice | Plummer |
| 18 | 1° error on 7° tilt changes shadow by ~15% | CONFIRMED | tan(8°)/tan(7°) = 1.14 | — |
| 19 | PFG xenon/argon electrons < 5–10 eV; CHARM EEPROM monitors | CONFIRMED | Standard | Wafer Charging Monitors Inc. |
| 20 | Range table (B, BF2, P, As, Ge at listed energies) | CONFIRMED | Within ~10% of LSS/SRIM tables | SRIM; Sze tables |
| 21 | Worked example: N_p 2.4×10^20, x_j ≈ 93 nm | CONFIRMED | Arithmetic checks | — |
| 22 | Amorphisation thresholds: As/Ge 1–3×10^14; P/Si 5×10^14–10^15; B > 10^16 | CONFIRMED | Standard RT values | Plummer; Ryssel |
| 23 | TED: 10^14 B at 800 °C/10 min moves ~50 nm vs < 2 nm equilibrium | CONFIRMED | √(Dt) at 800 °C ≈ 1.6 nm; TED 10^3–10^4 enhancement | Stolk 1997 |
| 24 | SemEquip acquired by Applied in 2011 | WRONG | Acquired by Ceradyne, Aug 2008 (~$25 M); Ceradyne later part of 3M; fixed | EE Times; Ceradyne PR |
| 25 | Applied Astra is a hot-plate conduction RTP | WRONG | Astra is the DSA laser millisecond anneal; backside-lamp RTP is Vantage Vulcan; fixed | appliedmaterials.com |
| 26 | Screen LA-3100 laser anneal | WRONG | LA-3100 is a xenon flash-lamp annealer; LT-3100 (LASSE) is the nanosecond UV laser; fixed in three places | screen.co.jp |
| 27 | SPER: ~1 nm/min at 500 °C, ~20 nm/min at 600 °C, E_a 2.7 eV | MINOR | Olson & Roth fit gives ~0.6 at 500, ~7–10 at 550, ~50–60 nm/min at 600 °C; fixed body and Key Numbers | Olson & Roth 1988; Csepregi 1978 |
| 28 | Sheet resistance examples 140 and 125 Ω/sq | CONFIRMED | Arithmetic | — |
| 29 | Contact resistivity ~1–2×10^-9 Ω·cm^2 | CONFIRMED | Leading-edge targets | IEDM literature |
| 30 | SiGe:B 30–55% Ge, B > 10^21; Si:P 3–5×10^20 active | CONFIRMED | Reported values | IEDM/VLSI papers |
| 31 | SiC: implant ~500 °C, anneal 1,600–1,800 °C, carbon cap | CONFIRMED | Standard SiC practice | Kimoto & Cooper |
| 32 | Axcelis ~70–80% of SiC implant; revenue roughly doubled 2020–2023 | MINOR | Share is a company/analyst claim (hedged to "reportedly ~70%+"); revenue $475 M to $1.13 B is more than doubled; fixed | Axcelis 10-K |
| 33 | Smart Cut H+ ~5×10^16 at 30–200 keV, split 400–600 °C | CONFIRMED | Bruel 1995 | Electronics Letters |
| 34 | Arsine TLV 0.005 ppm, IDLH 3 ppm; phosphine TLV 0.3 ppm | CONFIRMED | ACGIH / NIOSH | NIOSH |
| 35 | Entegris SDS, Linde VAC sub-atmospheric sources | CONFIRMED | SDS from ATMI (Entegris 2014); VAC from Praxair (Linde) | Vendor pages |
| 36 | Applied bought Varian in 2011 for $4.9 B; Axcelis spun from Eaton 2000 | CONFIRMED | Public record | Press releases |
| 37 | Implant market ~$3.5–4 B, 3–4% of WFE; Applied 60–70%, Axcelis ~25% | UNVERIFIABLE | Analyst estimates; hedged in Key Numbers | — |
| 38 | Worked example: 707 cm^2, 0.113 C, 5.7 s at 20 mA; Smart Cut >20 min at 5 mA | CONFIRMED | Arithmetic checks | — |
| 39 | Purion throughput up to 500 wph | CONFIRMED | Axcelis product page | axcelis.com |
| 40 | Further Reading items | CONFIRMED | All exist including MRS Advances 2022 XEmax paper (doi 10.1557/s43580-022-00442-9) | Springer |
| 41 | CETC 48th Institute and Kingstone (Wanye) domestic implanters | UNVERIFIABLE (plausible) | Consistent with trade press; left as is | — |

## Edits applied
- Section 4, molecular implants: SemEquip ownership corrected to Ceradyne (2008), now 3M.
- Section 7, RTA paragraph: "Astra (hot-plate RTP)" replaced with "Vantage Vulcan (backside heating)"; Screen LA-3100 re-described as a flash-lamp annealer.
- Section 7, MSA paragraph: LA-3100 moved into the flash-lamp sentence beside Mattson Millios; removed "Screen's LA-3100 is a third option" from the laser sentence.
- Section 7, laser melt sentence: added Screen LT-3100 (LASSE) as the nanosecond UV melt-anneal example.
- Section 7, SPER: rates changed to ~1 nm/min (500 °C), ~10 (550 °C), ~50 (600 °C); regrowth-time sentence adjusted; Key Numbers SPER row updated to match.
- Section 9 and Section 12: Axcelis SiC share hedged to "reportedly ~70% or more"; revenue statement changed to "more than doubled" with the actual figures; Purion EXE SiC added to the product list.
- Key Numbers and Common Misconceptions: share and revenue wording aligned with the body.
- Key Players: Screen row corrected (LA-3100 flash lamp, LT-3100 laser).
- Quiz: no changes needed; all six answers remain correct and consistent with the module.

## Remaining caveats
- Implanter market size and vendor shares (Applied 60–70%, Axcelis ~25%, Axcelis ~70%+ of SiC) are analyst and company statements without a single authoritative source; treat as ± 10 points.
- Tool prices ($4–8 M) and implanter counts per fab are rules of thumb.
- The range table is "representative"; SRIM values vary by a few nm with the target density and the version used.
- Hot-implant upper temperature (~500 °C) and PLAD bias range are vendor-dependent.
