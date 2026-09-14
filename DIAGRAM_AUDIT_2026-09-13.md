# Diagram quality correction

The user reported confusing diagrams and overlapping elements after the second visual pass. Actual rendered review confirmed problems that earlier outer-bound and coverage checks missed: misleading physical geometry, inappropriate generic symbols, crossing network edges, clipped SVG annotations, and unreadable layouts inside otherwise correctly bounded containers.

## Corrections

- Physical scenes now connect chip wiring to device terminals and show the GPU, HBM, interposer, package substrate and joints as a coherent assembly. Other corrections include the FinFET gate wrap, flush hybrid-bond interfaces, capacitor electrodes, and encapsulated leadframe geometry.
- Alignment figures compare aligned and displaced contacts. Qualification distinguishes acceptance from revision after failure. DRAM paths and other relationships use explicit labels and avoid arrows crossing unrelated labels.
- Network relationships receive separate lanes with phone layouts that give the relationship text sufficient space. Scene keys replace duplicate descriptions where the drawing uses numbered callouts.
- Paired interactive panels stack when their readable widths cannot fit side by side. Widget sizing accounts for padding, and corrected annotations remain inside their SVG viewport. Dense phone diagrams retain deliberate, hinted horizontal scrolling.
- EUV stochastic rendering samples decorative photon dots to avoid synchronous drawing stalls. The simulated photon counts, dose and developed contours still use the full sample; the interface explains the visual sampling.
- Chapter plate corrections remove pins crossing the chip's top face and a clipped upper layer. The package explorer identifies its exploded view and draws discrete joints; phone numeric table cells remain unbroken.

## Evidence and scope

The current audit reports distinguish rendered inspection from automated geometry checks. Full-size survey review compares diagrams with the relevant course explanation; deep-module review separates triage from targeted full-size/source review. Interactive review includes initial views, changed controls, and responsive behavior. Screenshots are local QA artifacts and are excluded from Git.

| Review | Actual scope | Evidence |
|---|---|---|
| Survey diagrams | All 60 reviewed before and after at full desktop-light and phone-dark resolution; 40 corrected, 20 retained. Eight important scenes also reviewed in opposite themes. | `qa/reports/survey-visual-audit.json` |
| Deep-module diagrams | All 292 triaged in contact sheets; eight targeted full-size reviews and eight source-excerpt reviews, with overlapping selections. Authored data changed for 50 figures; shared renderer fixes affect others. | `qa/reports/deep-diagram-audit.json` |
| Figure geometry | All 352 figures at two widths and two themes: no detected SVG text collisions, viewBox clipping, or relationship-label overflow. The new check caught additional FBR and MOSFET defects during this pass. | `qa/reports/figure-geometry.json`, `qa/figure-geometry.js` |
| Interactive labs | All 46 labs exercised in 184 width/theme cases, with 2,924 input values and 1,036 button clicks. Final combined results have no retained failures; original attempts and successful targeted retries are preserved. | `qa/reports/visual-labs-validation.json`, `qa/reports/VISUAL_LABS_REVIEW_2026-09-13.md` |
| Responsive behavior | 80 resize/theme checks, 20 plate bounds checks, and 12 EUV response-time checks pass. Scroll endpoints remain reachable; the Bragg deferred redraw is canceled on teardown. | `qa/reports/visual-lab-regression.json` |
| Integrated course | Build and `npm run check` pass, including source preservation for all 32 lessons. Shell checks pass 24 cases, with no rejected CSS selectors or declarations. | `qa/reports/section-figures.json`, `qa/reports/round2-shell.json` |

The root reviewer also inspected the integrated survey01 page in both desktop-light and phone-dark, its corrected die/alignment/package/qualification figures, selected deep cross-sections, all 20 chapter plate symbols, and targeted lab screenshots before and after correction. This supplements the recorded agent review; it does not convert contact-sheet triage into a full-size review of every deep figure.

The final checks uncovered and corrected an unreachable rightmost scroll gutter, a clipped EUV-source endpoint, and a Bragg ResizeObserver feedback warning. A timed-out concurrent AMHS run was retried successfully in isolation. The reports retain those earlier failures rather than presenting the first attempt as clean.

This work corrects diagrams against the existing teaching material. It is not an exhaustive new verification of every scientific claim, every model parameter, or every possible combination of lab inputs. Existing course review uncertainties remain applicable.

Reproduce the core checks with the loopback preview running:

```sh
npm run build
npm run check
node qa/figure-geometry.js
node qa/visual-lab-regression.js
node qa/round2-shell.js
```
