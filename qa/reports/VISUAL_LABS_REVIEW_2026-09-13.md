# Interactive-diagram review — 2026-09-13

This review addresses visible geometry and interaction problems. It does not independently recertify every numerical or physical model in the labs.

## Actual review scope

- Captured every one of the 46 labs at desktop and phone sizes. Reviewed initial SVG panels as contact-sheet triage; reviewed the HTML-based chain map, geography bars and cost model in full desktop and phone screenshots. The parent independently reviewed the later desktop panels.
- Reviewed changed CMP, DRAM, lithography track, implant beamline, plasma chamber, wafer-price, package cross-section, yield-fallout and EUV visuals in full-size screenshots. Inspected the expanded scale-ladder reference and multiplication strip, rather than treating closed disclosure content as empty diagrams.
- Inspected all 20 chapter/home icon variants at their native plate size. Fixed chip pins drawn through the top face and the clipped top of the exploded film stack.
- Captured a representative changed state for every lab in both widths and dark theme, then exercised every available input endpoint/select option and non-reset button using the full existing harness in both themes and widths. Automation is not a substitute for inspecting every possible state manually.

## Concrete fixes

- Removed a vertical scrollbar gutter from horizontal diagram regions. In Chromium it left the final 15 pixels unreachable even at maximum horizontal scroll. Reachability now checks the actual right edge.
- Stack two-column lab figures when their readable minimum widths cannot fit. The decision uses the full grid width and intrinsic diagram requirements, not the already-shrunken column width.
- CMP and the implantation beamline now subtract lab padding before measuring drawing space. CMP labels and the side/top-view layout no longer clip or collide; its mobile RPM label stays inside the drawing.
- DRAM figures have room for the circuit annotations, a larger right margin, and clearance between the capacitor value, plate electrode and word-line label.
- Wafer-price charts fit the entire utilization curve and 2026 bar at desktop size. Plasma views receive adequate width. Lithography mask annotations have more line spacing.
- Package interconnects are arrays of discrete joints, with an explicit exploded/not-to-scale note. The fallout table preserves complete currency values in a scrollable table.
- EUV source's phone losses view keeps its M6 label inside the chart. EUV stochastic slider input no longer rasterizes every simulated photon as an individual overlapping arc: visual dots are sampled, while the complete sample still drives the photon statistics and developed contour. This is disclosed next to the drawing.
- Bragg's resize redraw runs on the next animation frame and is canceled on teardown, preventing the ResizeObserver loop warning encountered in the full sweep.

## Evidence and limitations

`visual-labs-validation.json` combines the full 46-widget attempt with explicitly recorded reruns: 184 final cases, 2,924 input values and 1,036 button clicks, with no retained runtime, invalid-number, overflow, tiny-text or SVG-label-collision failures. Per-widget JSON reports were regenerated for all 46 implementations. The initial two-worker attempt timed out on AMHS; its serial rerun passed. Bragg, DRAM and EUV source were rerun after their final fixes. The original attempt remains in `visual-labs-full-sweep.json`.

`visual-lab-regression.json` records 80 responsive/theme checks, all 20 plate geometry bounds and 12 EUV slider timing checks. It verifies stable layouts and reachable horizontal-scroll endpoints. The isolated dose-80 input fell from about 4,212 ms before the rendering fix to at most 32 ms in the final measured run; these are local browser timings, not a hardware-independent performance guarantee.

`diagram-regression.json` retains 594 replacement/control mutations across both themes, with no wrapper or hint accumulation.

Some dense phone schematics intentionally remain horizontally scrollable to preserve legible labels. Their hints and full-content reachability are tested; this review does not claim that every detailed schematic fits on a phone at once. Closed reference panels are excluded from initial screenshot defect claims.

## Inventory ledger

“Initial triage” means rendered desktop/phone review of panel composition, not full-size inspection of every control combination. “Automated states” refers to the complete input/button harness above.

| Lab | Initial desktop/phone triage | Automated states |
|---|---|---|
| `ald-cycle` | Reviewed | Both themes, both widths |
| `amhs-sim` | Reviewed | Both themes, both widths |
| `bragg-mirror` | Reviewed | Both themes, both widths |
| `chain-map` | Reviewed | Both themes, both widths |
| `cmp-planarize` | Reviewed | Both themes, both widths |
| `cowos-flow` | Reviewed | Both themes, both widths |
| `cz-puller` | Reviewed | Both themes, both widths |
| `damascene` | Reviewed | Both themes, both widths |
| `deal-grove` | Reviewed | Both themes, both widths |
| `dram-cell` | Reviewed | Both themes, both widths |
| `etch-profile` | Reviewed | Both themes, both widths |
| `euv-source` | Reviewed | Both themes, both widths |
| `euv-stochastics` | Reviewed | Both themes, both widths |
| `export-timeline` | Reviewed | Both themes, both widths |
| `fab-anatomy` | Reviewed | Both themes, both widths |
| `fab-flow` | Reviewed | Both themes, both widths |
| `geo-share` | Reviewed | Both themes, both widths |
| `glossary-flashcards` | Reviewed | Both themes, both widths |
| `gpu-bom` | Reviewed | Both themes, both widths |
| `hbm-stack` | Reviewed | Both themes, both widths |
| `heat-path` | Reviewed | Both themes, both widths |
| `hybrid-bond` | Reviewed | Both themes, both widths |
| `implant-profile` | Reviewed | Both themes, both widths |
| `implanter-beamline` | Reviewed | Both themes, both widths |
| `litho-track` | Reviewed | Both themes, both widths |
| `moores-law` | Reviewed | Both themes, both widths |
| `mosfet-iv` | Reviewed | Both themes, both widths |
| `nand-3d-build` | Reviewed | Both themes, both widths |
| `node-table` | Reviewed | Both themes, both widths |
| `nvlink-topology` | Reviewed | Both themes, both widths |
| `package-xsection` | Reviewed | Both themes, both widths |
| `plasma-reactor` | Reviewed | Both themes, both widths |
| `purity` | Reviewed | Both themes, both widths |
| `rack-explorer` | Reviewed | Both themes, both widths |
| `rayleigh` | Reviewed | Both themes, both widths |
| `resist-chemistry` | Reviewed | Both themes, both widths |
| `sadp` | Reviewed | Both themes, both widths |
| `scale-ladder` | Reviewed | Both themes, both widths |
| `test-cost` | Reviewed | Both themes, both widths |
| `transistor-evolution` | Reviewed | Both themes, both widths |
| `upw-mask-cost` | Reviewed | Both themes, both widths |
| `wafer-price` | Reviewed | Both themes, both widths |
| `wafer-slicing` | Reviewed | Both themes, both widths |
| `wafer-sort-sim` | Reviewed | Both themes, both widths |
| `yield-calculator` | Reviewed | Both themes, both widths |
| `yield-cascade` | Reviewed | Both themes, both widths |
