# Review: Module 15 — Memory: DRAM, NAND and HBM Manufacturing
Reviewer summary: The process physics (1T1C sensing, ZAZ capacitor, gate-replacement NAND flow, TSV-middle, TC-NCF vs MR-MUF, hybrid bonding) is accurate and the worked arithmetic checks out. The 2025–26 market facts needed several corrections: Rubin's HBM4 bandwidth is 22 TB/s (not 13), Rubin CPX uses GDDR7 (not HBM), Micron's HBM4 base die is in-house (not TSMC), Kioxia's 332-layer part is BiCS10 (not BiCS9), HBM3E pricing and the 2025 DRAM market size were low, the 12-high core-die thickness contradicted the 720 µm height budget, and the HBM-to-interposer bump pitch (~55 µm, not ~100 µm) was wrong. Market-share tables were re-baselined to TrendForce quarterly data.
Overall verdict: Needed several corrections
Claims checked: 44   Confirmed: 18   Minor: 15   Wrong: 10   Unverifiable: 1

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | B200 ~8 TB/s; ~190–290 GB HBM per accelerator | MINOR | B200 180–192 GB, B300 288 GB; changed to ~180–290 GB, "eight, twelve or sixteen" high | NVIDIA specs |
| 2 | 16 Gb die = 17.2 billion cells | CONFIRMED | 16 × 2^30 = 17.18 G | arithmetic |
| 3 | Refresh 64 ms; 32 ms above 85 °C | CONFIRMED | JEDEC DDR4/5 tREFI halved above 85 °C | JEDEC |
| 4 | VPP ~2.5–2.8 V | MINOR | DDR4 VPP rail 2.5 V, DDR5 VPP 1.8 V; reworded | JEDEC DDR4/DDR5 |
| 5 | Sense-amp ΔV = 0.55 × 12/47 ≈ 140 mV | CONFIRMED | arithmetic correct | — |
| 6 | Footprint shrank to ~0.0015 µm² (2.1) vs ~0.0010 µm² (2.2) | MINOR | internal inconsistency; harmonized to ~0.001 µm² | 6F² at F=13 nm |
| 7 | 6F² since ~2008–10, Qimonda and Samsung first | WRONG | Micron shipped 6F² at ~78 nm in 2006; Qimonda's buried-WL 6F² paper IEDM 2008 | Chipworks/Semiconductor Digest 2010; Schloesser et al. IEDM 2008 |
| 8 | Capacitor worked example: 14 fF at 1.2 µm, 7 fF at 0.6 µm | CONFIRMED | recomputed | — |
| 9 | Supporter introduced ~30 nm node | MINOR | ~40–30 nm class; hedged | industry knowledge |
| 10 | Samsung/SK hynix HKMG at 1a; Micron at 1β | MINOR | Micron used HKMG first in 1z graphics DRAM, all DRAM from 1β | Micron 1β blog; Tom's Hardware |
| 11 | 32 Gb dies arrived at 1γ/1c in 2025–26 | WRONG | Samsung's 32 Gb DDR5 was on 1b (12 nm-class) in 2023–24 | Samsung newsroom Sept 2023 |
| 12 | Node table half-pitches 1x–1γ | CONFIRMED | matches TechInsights roadmap (Micron 1β ≈ 13.1 nm) | TechInsights |
| 13 | Samsung 5 EUV layers at 1a; SK hynix first EUV 1a 2021; Micron EUV at 1γ 2025 | CONFIRMED | | Samsung PR 2021; Micron 1γ PR Feb 2025; Memory Guy |
| 14 | EUV pass ~$80–100/wafer-layer; tools ~180+ wph | MINOR | estimates ~$100–200; NXE:3800E 220 wph; hedged | ASML; industry estimates |
| 15 | DRAM share 2025: Samsung 33–39, SK hynix 33–36, Micron 24–26, CXMT 5–8 | MINOR | TrendForce: 3Q25 SK hynix 33.2%; 4Q25 Samsung 36.0, SK hynix 32.1, Micron 22.4; CXMT 7.6% 1Q26; ranges adjusted | TrendForce 26 Nov 2025, 26 Feb 2026 |
| 16 | SK hynix #1 DRAM vendor for parts of 2025 | CONFIRMED | Q1–Q3 2025; Samsung regained #1 in Q4 | TrendForce |
| 17 | CXMT share "tripled" 2024→2025 | UNVERIFIABLE | hedged to "rose sharply" | — |
| 18 | NAND retention "ten years at 55 °C" | MINOR | JEDEC JESD218: 1 yr at 30 °C client, 3 months at 40 °C enterprise at EOL; reworded | JEDEC JESD218 |
| 19 | QLC "most of the bits shipped for data-centre SSDs" | MINOR | overstated; QLC is a fast-growing minority of bits | TrendForce |
| 20 | ON stack pitch 45–55 nm; 300-layer stack 15–20 µm | WRONG | TechInsights: ~45 nm at 176L, ~40 nm at 321L (345 tiers) → ~13–16 µm | TechInsights SK hynix 321L blog |
| 21 | Lam Striker/Vector PECVD | MINOR | Striker is Lam's ALD line; Vector is PECVD | Lam product pages |
| 22 | 1 Tb die has 2–4 billion channel holes | WRONG | 1 Tb TLC / 3 bits / ~300 WLs ≈ 1.2–1.5 billion strings | arithmetic |
| 23 | SK hynix 321L, 3 decks; Samsung V9 286L; Micron G9 276L, 3,600 MT/s | CONFIRMED | | TechInsights; vendor PRs |
| 24 | Kioxia "BiCS9 ~332 layers under development" | WRONG | 332-layer is BiCS10 (3 decks, CBA), sampling July 2026, volume 2027 | Blocks & Files 3 Jul 2026; Tom's Hardware |
| 25 | YMTC Gen 5 ~294 total layers | CONFIRMED | TechInsights: 294 gates per string, >20 Gb/mm² | TechInsights via Tom's Hardware |
| 26 | Best TLC 20–28 Gb/mm²; QLC 30+ | MINOR | TechInsights: SK hynix 321L and YMTC Gen5 TLC ~20 Gb/mm²; Kioxia BiCS8 QLC 22.9; adjusted to 20–25 / 23–30 | TechInsights |
| 27 | NAND share 2025 table | MINOR | TrendForce 3Q25: Samsung 32.3%, SK Group ~19%, Kioxia ~15%, Micron ~13%, SanDisk ~12%; 4Q25 Samsung 28%, SK 22.1%; ranges re-baselined | TrendForce 3 Dec 2025, 3 Mar 2026 |
| 28 | SanDisk spun out Feb 2025; YMTC Entity List Dec 2022 | CONFIRMED | | public record |
| 29 | JEDEC HBM4: 2,048-bit, 8 Gbps base, 775 µm for 12/16-high, April 2025 | CONFIRMED | JESD270-4, 16 Apr 2025; 24/32 Gb dies; 32 channels | JEDEC PR; TrendForce |
| 30 | Rubin: 8 stacks at ~13 TB/s → ~6.4 Gbps/pin | WRONG | CES 2026 Rubin: 288 GB HBM4, 22 TB/s → ~2.75 TB/s per stack, ~10.7 Gbps | Tom's Hardware CES 2026; wccftech |
| 31 | Micron HBM4 12-high at 11 Gbps, 2.8 TB/s | CONFIRMED | | Micron Dec 2025 PR |
| 32 | HBM4E "Samsung demonstrated 16+ Gbps" | MINOR | Samsung HBM4 11.7 Gbps (up to 13); HBM4E samples at 14 Gbps, scalable to 16, 3.6 TB/s | Samsung newsroom Jun 2026; TechPowerUp |
| 33 | JESD238 Jan 2022; JESD238A 2023 | CONFIRMED | | JEDEC |
| 34 | Core die 45–55 µm for 8- and 12-high | WRONG | 12-high dies ~40% thinner than 8-high (SK hynix), ~30–35 µm; worked example rewritten so 12-high fits 720 µm | SK hynix PR 26 Sep 2024 |
| 35 | Base-die bottom bumps ~100 µm pitch | WRONG | JEDEC HBM ball-out ~55 µm microbump pitch | JEDEC HBM2/3 ball-out; industry |
| 36 | Samsung 12-high HBM3E passed NVIDIA qual Sept 2025, ~18 months late | CONFIRMED | shipments from Oct 2025 | TrendForce 22 Sep 2025; KED Global |
| 37 | Micron HBM4 base die "also from TSMC" | WRONG | Micron keeps in-house base die through HBM4; TSMC from HBM4E (2027) | Tom's Hardware; TrendForce 29 Aug 2025; DigiTimes |
| 38 | SK hynix HBM4 base die TSMC 12 nm; Samsung 4 nm | CONFIRMED | | TrendForce; Tom's Hardware |
| 39 | HBM3E $10–15/GB; ~$3,000–4,000 per B200 | MINOR | reported $13–20/GB in 2025; 36 GB ≈ $500–700; B200 ≈ $2,500–3,500 | Silicon Analysts; TrendForce |
| 40 | HBM ~$35 B in 2025 = 25–30% of $120–130 B DRAM | MINOR | 2025 DRAM ≈ $150 B (4Q25 alone $53.6 B); HBM ≈ 20–25% | TrendForce quarterly |
| 41 | HBM 18% of wafers / 8% of bits end-2025; 30%/13% by 2027 | CONFIRMED | | TrendForce 2 Jun 2026 |
| 42 | Micron HBM4 to "Rubin CPX"; SK hynix "largest memory company by revenue 2025" | WRONG | Rubin CPX uses GDDR7; SK hynix led DRAM revenue Q1–Q3 2025 only | NVIDIA CPX announcement; TrendForce |
| 43 | Wafers-for-a-million-GPUs arithmetic | CONFIRMED | recomputed (528 gross, 254k + 19k wafers, 2.3 TB DDR5 wafer) | — |
| 44 | Further Reading: SemiAnalysis HBM article (2024); Memory Guy EUV post; SemiEng HBM4 microbumps | CONFIRMED (date fixed) | SemiAnalysis piece is 2025; all exist | web |

## Edits applied
- Intro: HBM capacity range and stack heights corrected (180–290 GB; eight/twelve/sixteen high).
- 2.1: VPP sentence reworded (DDR4 2.5 V / DDR5 1.8 V rails); footprint harmonized to ~0.001 µm².
- 2.2: 6F² history corrected (Micron 2006 first; Qimonda bWL 2008).
- 2.3: supporter-layer introduction hedged to ~40–30 nm nodes.
- 2.4: Micron HKMG history; 32 Gb die timing corrected to Samsung 1b (2023–24).
- 2.5: EUV cost per wafer-layer hedged to reported ~$100–200; tool throughput 180–220 wph.
- 2.7: DRAM share table re-baselined to TrendForce; CXMT "tripled" hedged; Samsung/SK hynix #1 timing made precise.
- 3.1: retention spec replaced with JEDEC JESD218 numbers; QLC share wording softened.
- 3.2: ON-stack pitch and stack height corrected (~40–45 nm; ~13–16 µm; 345 tiers); "taller than N3 BEOL" softened.
- 3.3: Lam Vector (not Striker) for PECVD; per-deck etch depth 4–6 µm; etch time hedged; channel-hole count corrected to ~1–1.5 billion.
- 3.4: layer table updated (Kioxia BiCS10 332L sampling 2026; Samsung V10 ~400L 2026; SK hynix 345 tiers, 40 nm pitch; YMTC active count); density figures adjusted.
- 3.5: NAND share table re-baselined to TrendForce 3Q25/4Q25.
- 4.1 worked example: Rubin 22 TB/s (CES 2026) replaces 13 TB/s; per-pin math redone; conclusion reworded.
- 4.2 table: HBM4 pin-rate and Rubin bandwidth; HBM4E row (14–16 Gbps, 3.3–4 TB/s, ~2027).
- 4.3/4.4: core-die thickness by stack height corrected; height-budget worked example rewritten for 8-high and 12-high; base-die bump pitch corrected to ~55 µm (also in 4.11).
- 4.5: Micron HBM4 base die in-house; TSMC from HBM4E.
- 4.9: HBM3E $/GB, per-stack and per-B200 cost, DRAM market size and HBM revenue share corrected.
- 4.10: 2024 SK hynix share widened; 2026 bullet rewritten (all three qualified; Rubin CPX is GDDR7; Q2 2026 share estimates; SK hynix DRAM-revenue lead limited to Q1–Q3 2025).
- Key Numbers, Key Players, Misconceptions (HBM pin speed 6–13 Gbps) and Further Reading (SemiAnalysis 2025; Micron Feb 2025) made consistent with the body.
- Quiz Q3: question now says "at its JEDEC base rate" so it does not contradict Rubin's 10.7 Gbps pins.

## Remaining caveats
- Market-share and price figures are quarterly snapshots from TrendForce/Counterpoint and move by several points per quarter; all are marked "~".
- HBM3E $/GB, per-stack cost and HBM revenue are analyst estimates, not disclosed contract prices.
- Core-die thickness, TSV counts, microbump counts and keep-out zones are vendor-proprietary; values are typical ranges from teardown reports.
- 2026 HBM4 supplier shares for Rubin (SK hynix 50–70%) come from analyst reports (UBS, Counterpoint) and will shift as Samsung and Micron ramp.
- NAND bit densities depend on whether TechInsights or vendor die-area conventions are used; treat as ±10%.
