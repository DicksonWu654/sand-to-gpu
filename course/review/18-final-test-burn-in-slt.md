# Review: Module 18 — Final Test, Burn-in and System-Level Test
Reviewer summary: A strong module. The physics and standards content (Arrhenius, JEP122 activation energies, JESD47/JESD22 method numbers and conditions, JESD85 chi-squared FIT arithmetic, AEC-Q100 grades, HBM IEEE 1500 / DA-port test architecture) is correct and the worked examples recompute exactly. The Blackwell-specific claims (FT, burn-in, FT, SLT as one insertion more than Hopper; KYEC burn-in ovens upgraded from 600 W to 1 kW) are confirmed by Taiwanese trade press, and the equipment specs (Cohu T-Core 800 W, Advantest M4841 ATC 2.0 x16, Hon Precision 1–2 kW heads, Aehr FOX-XP 18 wafers at 3,500 W) match vendor pages. Fixes were limited to a wrong citation year, sharpening the Samsung HBM3E and Amkor Arizona timelines, and hedging a couple of superlatives.
Overall verdict: Accurate with minor fixes
Claims checked: 44   Confirmed: 33   Minor: 4   Wrong: 1   Unverifiable: 6

| # | Claim (as written) | Verdict | Correct value / note | Source |
|---|---|---|---|---|
| 1 | Blackwell flow is FT1, burn-in, FT2, SLT, one insertion more than Hopper | CONFIRMED | cnyes: "FT 測試、Burn-in 老化測試、再回到 FT 測試，最終才進行 SLT"; H-series lacked the return-to-FT step | news.cnyes.com/news/id/5610709 |
| 2 | KYEC upgraded Blackwell burn-in slots from ~600 W to ~1 kW | CONFIRMED | "從現有的 600W 拉升到 1000W" | cnyes (same) |
| 3 | Cohu T-Core: ~800 W, better than ±1 °C, >125 °C/s | CONFIRMED | Cohu page: up to 800 W, ±1 °C, >125 °C/s response, ramp up to 100 °C/s, −55 to +155 °C | cohu.com/t-core |
| 4 | Advantest ATC 2.0 on M4841 runs up to 16 sites | CONFIRMED | Oct 2023 press release; available April 2024 | advantest.com/en/news/2023/20231024 |
| 5 | Hon Precision GPU thermal heads ~1,000 W | MINOR | Liquid-cooled ATC3.3 = 1,000 W, ATC3.5 = 2,000 W, 25–125 °C; text and tables updated to 1,000–2,000 W. Company is Hon Precision (鴻勁精密, 7769.TW), formerly Hon Technology | honprec.com product page |
| 6 | Aehr FOX-XP: up to 18 wafers per system, up to 3,500 W per wafer | CONFIRMED | 18 blades; high-power config 9 × 300 mm at 3,500 W | aehr.com |
| 7 | Wafer-level burn-in "increasingly proposed for AI logic" | MINOR | Aehr shipped its first FOX-XP for AI processors in Feb 2025; wording updated | aehr.com 2025/02 |
| 8 | Advantest bought Astronics Test Systems' semiconductor test business in 2019 for SLT | CONFIRMED | Feb 2019, ~$185M; SLT platform used by Apple | expertise, Advantest PR |
| 9 | Teradyne Titan SLT handler; Cohu/KYEC/ASE SLT racks | CONFIRMED | Teradyne Titan HP | expertise |
| 10 | k = 8.617 × 10⁻⁵ eV/K | CONFIRMED | | CODATA |
| 11 | AF(125 °C vs 55 °C, 0.7 eV) ≈ 78 | CONFIRMED | Recomputed: exponent 4.352, AF = 77.6 | arithmetic |
| 12 | AF(125 °C vs 85 °C, 0.7 eV) ≈ 10 | CONFIRMED | Recomputed 9.8 | arithmetic |
| 13 | 24 h ≈ 1,870 h, 48 h ≈ 3,740 h (~5 months); at AF 10, 48 h ≈ 3 weeks | CONFIRMED | 3,744 h = 5.1 months; 480 h = 20 days | arithmetic |
| 14 | JEP122 Ea: ~0.7 eV generic, EM ~0.9, TDDB 0.6–0.9, HCI ~0/negative | CONFIRMED | Within JEP122 ranges; 0.7 eV is the JESD47/AEC-Q100 default | JEP122 |
| 15 | 168 h burn-in in the 1980s | CONFIRMED | MIL-STD-883 Method 1015 | expertise |
| 16 | JESD47 HTOL: 3 lots × 77 units, 1,000 h, 125 °C Tj, 0 fails | CONFIRMED | | JESD47 |
| 17 | Method numbers: A108 HTOL, A104 TC, A110 HAST, A118 uHAST, A101 THB, A103 HTSL, A113/J-STD-020 precond, JS-001/JS-002 ESD, JESD78 latch-up, JESD74A ELFR | CONFIRMED | All correct | JEDEC |
| 18 | HAST 130 °C/85%/96 h; uHAST 110 °C/85%/264 h; THB 85/85/1,000 h; HTSL 150 °C/1,000 h | CONFIRMED | Standard conditions | JEDEC |
| 19 | AEC-Q100 grade 1 −40/+125 °C, grade 0 −40/+150 °C | CONFIRMED | | AEC |
| 20 | AEC-Q001 is Part Average Testing | CONFIRMED | | AEC |
| 21 | χ²(0.60, 2 dof)/2 = 0.916; χ²(0.90, 2)/2 = 2.30; 51 FIT and 128 FIT | CONFIRMED | −ln(0.4) = 0.916; −ln(0.1) = 2.303; 0.916/18.0e6 = 5.09e-8 | JESD85, arithmetic |
| 22 | 16,384 GPUs × 51 FIT ≈ 7 failures/yr | CONFIRMED | 7.3 | arithmetic |
| 23 | Llama 3: 16,384 H100s, 419 unexpected interruptions in 54 days, ~30% GPU, ~17% HBM3 | CONFIRMED | Paper Table 5: faulty GPU 30.1%, GPU HBM3 17.2% | Meta, "The Llama 3 Herd of Models" (2024) |
| 24 | JESD235 (HBM2/2E), JESD238 (HBM3); IEEE 1500 wrapper and direct-access port in base die | CONFIRMED | | JEDEC |
| 25 | HBM4: 2,048-bit interface; base die on foundry logic (TSMC N12/N5-class) | CONFIRMED | JESD270-4; TSMC N12FFC+ and N5 for HBM4 base die | JEDEC, TSMC/SK hynix |
| 26 | 0.99¹² ≈ 89%, 0.99¹⁶ ≈ 85%, 0.995¹² ≈ 94% | CONFIRMED | 0.886, 0.851, 0.942 | arithmetic |
| 27 | HBM3E stack ~$150–300 | UNVERIFIABLE | Trackers put HBM3 24 GB ~ $200 and HBM3E 36 GB ~ $300; range is consistent | trendforce, trackers |
| 28 | Samsung HBM3E "resolved for later generations as of ~2025" | MINOR | 12-high HBM3E passed NVIDIA qualification Sept 2025, ~18 months after development; text sharpened | kedglobal, trendforce |
| 29 | KYEC largest pure-play test house; revenue >NT$10B per quarter in 2026 | CONFIRMED | Q1 2026 NT$10.19B, first quarter above NT$10B, record; "largest" hedged to "generally described as" | ctee.com.tw 2026-05-07, technews |
| 30 | Amkor Arizona (2027–28) "the first US CoWoS-class test site" | MINOR | Peoria: construction complete mid-2027, production early 2028; changed to "among the first" | Amkor PR Oct 2025, Tom's Hardware |
| 31 | NVLink 5: 200 Gb/s per lane, 18 links, 1.8 TB/s; PCIe Gen5 32 GT/s, Gen6 64 GT/s | CONFIRMED | | NVIDIA Blackwell brief, PCI-SIG |
| 32 | HBM3E 1,024-bit at ~8–9.2 Gb/s per pin; NV-HBI ~10 TB/s | CONFIRMED | | JEDEC, NVIDIA |
| 33 | Pogo sockets 15–40 g, 0.5–1M insertions, ~0.35–0.4 mm pitch; elastomer 50–200k | UNVERIFIABLE | Vendor-typical ranges; left hedged with "~" | vendor datasheets |
| 34 | Handler vendors: Cohu MATRiX, Advantest M4841/M4872, Rasco/Ismeca (Cohu), Epson turret | CONFIRMED | | vendor pages |
| 35 | Burn-in vendors: Micro Control, Aehr, Incal, Dong-Il, Chroma, Advantest | CONFIRMED | | vendor pages |
| 36 | FA tools/labs: Nordson, Zeiss Xradia, Nikon, Thermo Fisher Helios, Zeiss Crossbeam, MA-tek, iST, Eurofins EAG | CONFIRMED | | vendor pages |
| 37 | CSAM 15–230 MHz; lock-in thermography microkelvin | CONFIRMED | Typical transducer ranges | expertise |
| 38 | SemiAnalysis Aehr article, 2023 | WRONG | Published 29 Sept 2021; fixed | newsletter.semianalysis.com/p/aehr-multi-wafer-level-burn-in-test |
| 39 | Tester $100–300/h, slot-hour $0.20–1, $30–150 per GPU back-end cost | UNVERIFIABLE | Order-of-magnitude, hedged "on the order of"; internally consistent | none |
| 40 | TSMC does package test after CoWoS on its own testers; Arizona dies return to Taiwan for CoWoS/test | UNVERIFIABLE | Widely reported; hedged | trade press |
| 41 | Advantest Pin Scale Serial Link instrument | CONFIRMED | | Advantest |
| 42 | Advantest T5503/T5800-class memory testers | CONFIRMED | T5503HS2, T5833, T58xx series | Advantest |
| 43 | DPPM targets (consumer 100s–1,000; automotive <1–10) | UNVERIFIABLE | Industry norms, no single source | expertise |
| 44 | MSL 3/4 popcorning at reflow | CONFIRMED | J-STD-020 | IPC/JEDEC |

## Edits applied
- Thermal control section: Hon Precision heads now "1,000 W (ATC3.3) and 2,000 W (ATC3.5)" instead of "~1,000 W"; Key Numbers and Key Players rows updated to 1,000–2,000 W / 1–2 kW; company name given as "Hon Precision (formerly Hon Technology)".
- Boards, ovens and systems: Aehr wafer-level burn-in "increasingly proposed for AI logic" replaced with "a first system shipped for AI-processor wafers in early 2025".
- HBM 2.5D section: Samsung HBM3E note now states 12-high HBM3E passed NVIDIA qualification in September 2025 (~18 months after development) instead of vague "resolved as of ~2025".
- Where Back-End Test Happens: KYEC "largest pure-play test house" hedged to "generally described as"; revenue sentence now cites Q1 2026 NT$10.19 billion record; Amkor Arizona changed to Peoria campus, construction mid-2027, production early 2028, "among the first" US sites; Key Players Amkor row updated to "from 2028".
- Further Reading: SemiAnalysis Aehr article year corrected from 2023 to 2021.
- Quiz: no changes needed; all six answers and explanations agree with the (verified) module arithmetic.

## Remaining caveats
- All per-unit cost figures (tester $/h, burn-in slot-hour, $30–150 back-end cost per GPU, HBM3E stack price) are order-of-magnitude estimates with no primary source; they are hedged in the text and should be read as such.
- Fallout percentages in the flow table and yield table (FT1 2–5%, SLT 0.5–2%, etc.) are illustrative industry ranges, not published NVIDIA data.
- Socket life and contact-force ranges are vendor-typical and vary by design.
- The statement that TSMC performs package-level test on its own testers and that Arizona-fabbed dies return to Taiwan for CoWoS is from trade reporting, not NVIDIA/TSMC disclosure.
- The "one insertion more than Hopper" flow is from Taiwanese financial press (cnyes/ctee) describing KYEC, not from NVIDIA.
