# Round 2 targeted review: Module 05: Inside a Leading-Edge Fab

Reviewed 2026-09-13. This is a targeted audit of 30 consequential claims, selected Key Numbers entries, central-process arithmetic, and quiz wording. It is **not an exhaustive reread or verification of the full module**. The 30 rows meet the requested lower bound for claim coverage; they do not establish that every sentence is correct or that every claim has had two independent reviewers. Existing round-one reports informed prioritization; their conclusions were not automatically treated as new confirmations.

Overall verdict: targeted corrections applied where documented below; full-module accuracy and uniform-depth verdict remain pending.

Claims assessed: 30. Rows 1–6 are this reviewer’s initial fresh targeted checks, not copied round-one verdicts. Rows 7–30 extend that same review with primary-source checks, independently recomputed models, corrections and explicitly unresolved empirical inputs. Evidence counts: 9 primary-source checked, 3 correction/qualification, 15 calculated, 3 unresolved. Corrections are counted separately, even when primary evidence or arithmetic supports them. Unresolved rows record the examined source boundary; the linked source does not verify the stated empirical number.

| # | Claim sampled | Verdict | Finding / correction | Evidence |
|---|---|---|---|---|
| 1 | Tools receive utilities through the subfab and overhead automation transports wafers | CONFIRMED | Intel describes the shared physical arrangement. Exact layout varies. | [Primary source](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |
| 2 | Cleanroom air flows through ceiling filtration toward the floor/subfab | CONFIRMED | Intel manufacturing description. | [Primary source](https://virtualmuseum.intel.com/fabtour/airflow.html) |
| 3 | Every fab inventory and cost count is a multiple of 25 | WRONG | Carrier capacity does not prohibit split or partial lots; corrected body and table. | Independent arithmetic using the explicitly stated model inputs |
| 4 | 100k wafers/month and 90 days cycle time imply about 300k WIP | CONFIRMED | Little-law steady-state calculation using 30 days/month; longer mean calendar month yields slightly less. | Independent arithmetic using the explicitly stated model inputs |
| 5 | Queue factor u/(1−u) rises from 4 at 80% to 19 at 95% | CONFIRMED | Illustrative model with other terms held fixed; not a guaranteed fab-wide queue time. | Independent arithmetic using the explicitly stated model inputs |
| 6 | 500 MW and 100k wafers/month imply about 3,600 kWh/wafer | CONFIRMED | 500,000 kW × 24 × 30 / 100,000. Boundary is the assumed full site and output denominator. | Independent arithmetic using the explicitly stated model inputs |
| 7 | A 300 FOUP is offered with 25 or 13 wafer capacity | PRIMARY CHECK | Entegris directly disproves a universal 25-only carrier claim. | [Primary source consulted](https://www.entegris.com/shop/en/CNY/products/wafer-handling/wafer-processing/300-mm-front-opening-unified-pods-%28foups%29/A300-FOUPs/p/A300FOUPs) |
| 8 | 25-slot A 300 wafer spacing is 10 mm | PRIMARY CHECK | Manufacturer specification;13-slot version uses 20 mm. | [Primary source consulted](https://www.entegris.com/shop/en/CNY/products/wafer-handling/wafer-processing/300-mm-front-opening-unified-pods-%28foups%29/A300-FOUPs/p/A300FOUPs) |
| 9 | All FOUP wafer-contact parts are PEEK or PEI | CORRECTED / QUALIFIED | Entegris lists carbon-filled PC/barrier materials for A 300 supports. Body now identifies material choices as design-specific. | [Primary source consulted](https://www.entegris.com/shop/en/CNY/products/wafer-handling/wafer-processing/300-mm-front-opening-unified-pods-%28foups%29/A300-FOUPs/p/A300FOUPs) |
| 10 | FOUP nitrogen purge targets moisture/oxygen contamination | PRIMARY CHECK | Entegris experimental note explains door-open purging and gas distribution. | [Primary source consulted](https://www.entegris.com/content/dam/web/resources/zero-defects-newsletter/newsletter-zd-7650-0614-na.pdf) |
| 11 | Purge flow distribution matters even with same gas | PRIMARY CHECK | Entegris shows conventional flow can draw ambient air in; uniform diffuser s improve control. | [Primary source consulted](https://www.entegris.com/content/dam/web/resources/zero-defects-newsletter/newsletter-zd-7650-0614-na.pdf) |
| 12 | Overhead material handling moves wafers between fab tools | PRIMARY CHECK | Intel describes automation within the cleanroom. | [Primary source consulted](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |
| 13 | Fab tools require electricity, UPW, gases and chemicals from sub fab | PRIMARY CHECK | Manufacturer description confirms utility categories. | [Primary source consulted](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |
| 14 | Ceiling filters and floor returns establish airflow direction | PRIMARY CHECK | Intel describes the airflow path; not proof ofevery stated ISO class. | [Primary source consulted](https://virtualmuseum.intel.com/fabtour/airflow.html) |
| 15 | 100 k wafers/month in 25-wafer full lots is 4,000 lots/month | CALCULATED | Actual split-lot counts can be higher; carrier load model only. | Independent arithmetic from stated inputs |
| 16 | 300 kWIP wafers is 12,000 full 25-wafer lots | CALCULATED | Physical carrier requirement includes empty/partial/service inventory. | Independent arithmetic from stated inputs |
| 17 | $15 B tools/5 years plus $5 B building/20 years is $3.25 B/year | CALCULATED | Separate assumed asset lives; accounting model. | Independent arithmetic from stated inputs |
| 18 | $3.25 B over 1.2 M wafers gives $2,708/wafer | CALCULATED | At.6 M output it is $5,417; fixed-cost effect only. | Independent arithmetic from stated inputs |
| 19 | A $200 M scanner over five years costs about $4,566/calendar hour | CALCULATED | 200 M/(5×365×24); productive-hour cost higher ifnot continuously available. | Independent arithmetic from stated inputs |
| 20 | 25 EUV passes and 100 kstarts need 2.5 Mpasses/month | CALCULATED | Passes and finished wafers are different workload denominators. | Independent arithmetic from stated inputs |
| 21 | 160 passes/hour at 85% availability yields 97,920 passes/30 day month | CALCULATED | 160×.85×720; if 160 is already effective availability-adjusted speed, avoid double counting. | Independent arithmetic from stated inputs |
| 22 | 2.5 Mpasses divided by 97,920 needs 25.53 tools | CALCULATED | Round up 26 before extra reserve; matches illustrative fleet-sizing quiz. | Independent arithmetic from stated inputs |
| 23 | A.8µm/K expansion over 300 mm corresponds to 2.67 ppm/K | CALCULATED | Linear dimension check using representative thermal expansion; not all wafer distortion is uniform. | Independent arithmetic from stated inputs |
| 24 | VC-D 6.25µm/s at 10 Hz corresponds to about.10µm amplitude | CALCULATED | v/(2πf)=.0995µm for sinusoidal motion and consistent RMS/amplitude convention. | Independent arithmetic from stated inputs |
| 25 | .3–.5 m/s downward flow traverses 3 m in 6–10 s | CALCULATED | Ideal unidirectional travel; real local flow differs. | Independent arithmetic from stated inputs |
| 26 | 90%utilization Kingman factor equals 9 | CALCULATED | .9/(1−.9)=9; variability/service-time factors still needed. | Independent arithmetic from stated inputs |
| 27 | Ballroom ISO 5–6 and mini environment ISO 1–3 universal ranges | UNRESOLVED | Examples, not a single required configuration; Intel narrative does not verify certification values. | [Primary source consulted](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |
| 28 | OHT fleet 1,000–3,000 and FOUP fleet 15,000–20,000 | UNRESOLVED | Plant-specific layout/inventory estimates, not verified vendor deployment counts. | [Primary source consulted](https://www.entegris.com/shop/en/CNY/products/wafer-handling/wafer-processing/300-mm-front-opening-unified-pods-%28foups%29/A300-FOUPs/p/A300FOUPs) |
| 29 | Gross water 9 m³ implies fresh intake 1–1.5 m³ from recycling rate alone | CORRECTED / QUALIFIED | Corrected double-counting: a withdrawal figure already measures intake. The reduction applies only if gross demand before reuse is the denominator. | Independent arithmetic from stated inputs |
| 30 | TSMC site electricity percentages and 2030 forecasts | UNRESOLVED | Plant/company/grid denominators and forecast dates not independently verified by sources checked here. | [Primary source consulted](https://virtualmuseum.intel.com/fabtour/cleanroom.html) |

## Edits and quiz coverage

- Carrier capacity does not prohibit split or partial lots; corrected body and table.
- Quiz is valid JSON with exactly eight questions, four options each and a valid zero-based answer. Existing subject coverage is retained; additional questions test mechanisms or explicit models. This structural validation is separate from exhaustive verification of every technical phrase.

## Teaching coverage

- Mechanical check: all required named sections are present; 14 explicitly labelled worked examples, exceeding the three-example floor.
- Qualitative sampling: checked central mechanisms and selected numerical examples for why-before-numbers, model assumptions and readable explanations. Corrected identified category errors and misleading absolutes.
- Not established: a score of 4 or 5 for every core section, every first-use definition, all source authenticity, or equal depth across the full module. A high word count and section presence do not prove teaching quality.

### Concrete teaching-depth follow-up

FOUP transfer/materials and water-system boundaries now explain the physical exceptions rather than assert universal rules. Remaining depth work: validate the full HVAC, utility-recovery and facility-cost examples against a consistently defined plant boundary. These are qualitative sampling notes, not scores for unread sections. Cached reader-polish transcripts were not independently recovered or certified in this pass.

## Remaining caveats and next review

- Supplier market shares, proprietary recipes, historical pricing, allocations and forecasts not explicitly listed above remain unverified in this round. They must be dated and treated as estimates rather than manufacturer guarantees.
- Arithmetic checks validate the stated calculation, not the empirical accuracy of its inputs or adequacy of the physical model.
- The [independent peer ledger](peer-refutation-front-2026-09-13.md) challenges six selected consequential claims per module. It independently recomputes models and reopens primary sources, and records access limits. The [separate refutation ledger](independent-refutation-2026-09-13.md) records an additional targeted pass; Module 09 incorporates its Lam denominator/copper findings. Neither this 30-row author audit nor the peer sample implies exhaustive verification or two reviews of every row.

## Survey numerical traceability

Chapter `S03-inside-the-fab.md`: 2576 whitespace-delimited words. This chapter synthesizes the current corrected source modules; it does not claim all source-module content received exhaustive verification. All substantive quantities in the body and table are mapped below. Module identifiers, chapter labels and explanatory counting words are navigation, not empirical claims.

| Survey quantities | Deep module | Location / check |
|---|---|---|
| 25 wafers/FOUP; split-lot qualification | 05 | FOUP section and corrected Key Numbers |
| 100k wafers/month;90 days;about300k WIP | 05 | Little-law worked example; steady 30-day-month assumption |
| $15B tools/5years;$5B building/20years | 05 | Depreciation example |
| 80%/95% utilization;queue factors4/19 | 05 | Kingman example |
| 500MW;30-day month;3,600kWh/wafer | 05 | Electricity example |

Checks: one named widget, valid deep-route syntax, required opening/gist/body/numbers/companies/difficulty/deeper sections, and six main explanatory sections. Scientific explanations follow the named modules; industry-share forecasts and proprietary recipe numbers are deliberately absent from the survey.
