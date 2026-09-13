# Round 2 targeted review: Module 10: Doping: Ion Implantation and Annealing

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 6 primary-source checked, 3 correction/qualification, 19 calculated, 2 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Implantation injects species and annealing restores lattice/activation | CONFIRMED | Applied describes implantation and thermal modification; exact activation is process-dependent. | [Primary source](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html) |
| 2 | Every useful carrier originates in doping | WRONG | Corrected table: intrinsic generation, optical generation, injection and gate-controlled populations also matter. | [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html) |
| 3 | Shallow dopants are unconditionally fully ionized at room temperature | MINOR | Qualified to the common moderately doped approximation; temperature and concentration matter. | [Primary source](https://www.columbia.edu/~mc3988/spin/doping.html) |
| 4 | Dose10^15 cm^-2 with Gaussian sigma17 nm peaks near2.4×10^20 cm^-3 | CONFIRMED | Q/(sqrt(2π)σ) ≈2.35×10^20; chemical profile need not equal active concentration. | Independent arithmetic using the explicitly stated model inputs |
| 5 | 10^18 cm^-3 in a20 nm cube gives8 dopants on average | CONFIRMED | (2×10^-6 cm)^3 ×10^18 =8; explains statistical variation in very small channels. | Independent arithmetic using the explicitly stated model inputs |
| 6 | Double reference sheet resistance proves half activation | MINOR | Quiz now states fixed-mobility/profile assumptions; the reading is not a unique diagnosis in production. | Independent arithmetic using the explicitly stated model inputs |
| 7 | Axcelis Purion comprises different beam line classes | PRIMARY CHECK | Manufacturer lists high-current, medium-current/energy andhigh-energy applications. | [Primary source consulted](https://www.axcelis.com/products/purion-ion-implantation-equipment/) |
| 8 | Purion platform advertises up-to 500 wph | PRIMARY CHECK | Vendor maximum, not every dose/species/energy combination. | [Primary source consulted](https://www.axcelis.com/products/purion-ion-implantation-equipment/) |
| 9 | Purion XEmax supports arsenic energies upto 15 MeV | PRIMARY CHECK | Vendor technical paper specifies multiply charged beam and Boost technology; species-specific ceiling. | [Primary source consulted](https://www.axcelis.com/wp-content/uploads/2023/01/Purion_XEmax_Ultra_High_Energy_Implanter_with_Boost_Technology.pdf) |
| 10 | Annealing can restore implant-damaged lattice | PRIMARY CHECK | Applied describes thermal modification; actual repair/activation not guaranteed by heat alone. | [Primary source consulted](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html) |
| 11 | Implantation modifies electrical or material properties | PRIMARY CHECK | Applied distinguishes broad material modification applications from simple carrier addition. | [Primary source consulted](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html) |
| 12 | 10^15 dopants/cm³ in 5×10^22 host atoms/cm³ is 20 ppba | CALCULATED | Ratio 2 e-8; atomic fraction, not mass fraction. | Independent arithmetic from stated inputs |
| 13 | 10^20 dopants/cm³ is.2%of silicon atoms | CALCULATED | 10^20/(5×10^22)=.002. | Independent arithmetic from stated inputs |
| 14 | 45 meVis 1.74 kBT at 300 K | CALCULATED | kBT=.02585 eV; ionization fraction also depends on Fermi level/concentration. | Independent arithmetic from stated inputs |
| 15 | Carrier 1 e15/cm³ and electron mobility 1350 gives 4.62Ω·cm | CALCULATED | 1/(q n μ); hole mobility 450 gives 13.87Ω·cm. | Independent arithmetic from stated inputs |
| 16 | Carrier 1 e20/cm³ and mobility 60 gives 1.04 mΩ·cm | CALCULATED | Simple one-carrier model; degeneracy and mobility calibration matter. | Independent arithmetic from stated inputs |
| 17 | Diffusion coefficient 2 e-14 cm²/s for two hours gives 120 nm sqrt(Dt) | CALCULATED | sqrt(2 e-14×7200)=1.2 e-5 cm;100 nm isorder-of-magnitude rounding. | Independent arithmetic from stated inputs |
| 18 | Boron 4 e-17 cm²/s for 600 s gives 1.55 nm sqrt(Dt) | CALCULATED | Not the 1 D standard deviation sqr t(2 Dt); convention must remain consistent. | Independent arithmetic from stated inputs |
| 19 | 50 nm broadening versus 1.55 nm implies about 1,040×diffusivity | CALCULATED | Squared length ratio; time and length definition held fixed. | Independent arithmetic from stated inputs |
| 20 | BF 2 at 30 keV gives Babout 6.73 keV | CALCULATED | Energy share 11/49 under common velocity fragment approximation. | Independent arithmetic from stated inputs |
| 21 | Dose 1 e15/cm² over 707 cm² requires.113 C singly charged ions | CALCULATED | Q=e×dose×area; beam utilization/scanning losses excluded. | Independent arithmetic from stated inputs |
| 22 | .113 C at 20 mA needs 5.66 seconds of beam time | CALCULATED | Charge/current; not complete wafer-throughput time. | Independent arithmetic from stated inputs |
| 23 | Smart Cut 5 e16/cm² over 707 cm² at 5 mA needs 18.9 minutes ideal beam time | CALCULATED | Charge 5.66 C/.005 A=1132 s; overhead can make greater than 20 min. | Independent arithmetic from stated inputs |
| 24 | 20 nm cube at 1 e18/cm³ averages 8 dopants with 35%relative count noise | CALCULATED | 1/sqrt 8=.354; physical electrical variation is not identical to carrier count noise. | Independent arithmetic from stated inputs |
| 25 | Four-probe factorπ/ln 2 is 4.532 | CALCULATED | Assumes applicable thin-sheet/infinite geometry; finite wafer corrections can matter. | Independent arithmetic from stated inputs |
| 26 | 61.8Ωvoltage/current ratio maps 280Ω/square | CALCULATED | 4.532×61.8=280.1; mobility/profile assumptions needed to infer activation. | Independent arithmetic from stated inputs |
| 27 | Dose 5 e14/cm² at mobility 90 gives 138.7Ω/square | CALCULATED | 1/(qμQ); active-carrier sheet density used, not implanted species automatically. | Independent arithmetic from stated inputs |
| 28 | 1 e-9Ω·cm² over 20 nm square contact gives 250Ω | CALCULATED | Geometric contact resistance model; spreading/interface in homogeneity additional. | Independent arithmetic from stated inputs |
| 29 | Implant market shares 60–70%Applied and 25%Axcelis | UNRESOLVED | Product roles verified; market denominators andyear not independently audited. | [Primary source consulted](https://www.axcelis.com/products/purion-ion-implantation-equipment/) |
| 30 | All ranges/straggles and activation temperatures in tables | UNRESOLVED | Material state, species, orientation and thermal history dependent; representative values not universal recipes. | [Primary source consulted](https://www.appliedmaterials.com/sg/en/semiconductor/semiconductor-capabilities/modify.html) |

## Edits and quiz coverage

- Corrected table: intrinsic generation, optical generation, injection and gate-controlled populations also matter.
- Qualified to the common moderately doped approximation; temperature and concentration matter.
- Quiz now states fixed-mobility/profile assumptions; the reading is not a unique diagnosis in production.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 10 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

Carrier sources, activation inference and dose/contact arithmetic received targeted checks. Remaining depth work: the full implantation range, damage and annealing narratives need specialist review of material/species/thermal-history assumptions. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.
