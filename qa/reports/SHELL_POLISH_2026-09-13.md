# Fourth-pass shell refinement

This pass preserves the ivory/charcoal, copper and teal palette and the existing prose measure. It improves the reading shell rather than changing course claims or interactive models.

- Increased curriculum and section navigation text, gave the five-stage context ribbon a clearer selected state, and expanded phone header and chapter navigation controls to at least 44px.
- Rebalanced chapter plates with a larger title, a drawing closer to the copy, and a footer occupying its own grid row. Long captions no longer depend on fixed reserved bottom padding.
- Strengthened the homepage journey line art and placed its keyboard focus ring inside the clipped tiles. Added clear focus borders to curriculum/path cards.
- Added subtle table striping. Full-size phone inspection exposed a more serious existing problem: the four-column compound table squeezed its final explanation column and made otherwise short rows roughly 150px tall. Four-plus-column prose tables now retain a 560px minimum width on phones, with a sticky horizontal-scroll hint. The interaction pass supplies focusable, labelled wrappers only while overflow exists.

## Validation

`node qa/shell-polish.js` passes 91 cases: all 32 chapter plates at 320px in both themes; home, m01 and s01 at 375px, 720px and 1440px in both themes; table endpoint/hint/focus checks at three widths; and the homepage journey keyboard focus ring. The 720px viewport models CSS reflow at 200% zoom on a 1440px desktop; it is not an OS magnification test.

`node qa/round2-shell.js` passes 24 route/width/theme cases and browser parsing of 477 selectors and 1,424 declarations. No CSS rules were rejected. `git diff --check` passes.

A separate actual keyboard run at 320px focused the m01 compound table and pressed ArrowRight repeatedly: scrollLeft reached 282px, equal to the maximum; the last column ended at x=299 inside the wrapper ending at x=300. The last explanatory column was inspected in the resulting screenshot and remains readable. This exercises browser keyboard scrolling in addition to programmatic endpoint checks.

Local, untracked evidence is under `/tmp/polish-r4`. Captures cover home, m01 and s01 before/after at 1440px and 375px in both themes. Full-size review focused on those chapter openings, the home journey, narrow m01 at 320px, the 720px reflow, and m01 body/table details. Geometry checks of all other chapter plates are not a manual review of every course page.

Useful evidence files:

- `m-01-1440-light-before.png` / `m-01-1440-light-after.png`
- `m-01-375-light-before.png` / `m-01-375-light-after.png`
- `s-01-375-dark-after.png`
- `home-375-dark-before.png` / `home-375-dark-after.png`
- `m-01-320-light-after.png` / `m-01-720-dark-after.png`
- `m-01-320-light-table-before-fix.png` / `m-01-320-light-table-after.png`
- `m-01-320-table-keyboard-end.png`

No course prose, generated content, scientific models or plate geometry changed in this subtask. Only `site/styles.css`, the focused shell QA script and its reports are owned by this pass.
