# How Sand to GPU developed

Sand to GPU grew through a sequence of AI-assisted drafting, implementation, review, and human feedback. The aim was consistent throughout: explain the complete semiconductor journey to someone who is curious enough to go deep but does not already know the field.

The records below preserve the iterations, including defects found after earlier checks passed. They are dated working evidence, not a claim that the project was ever exhaustively reviewed. Current setup instructions live in the [README](../README.md); historical paths, commands, counts, and completion statements belong to their recorded edition.

## From course draft to two learning tracks

The original work produced deep modules, interactive widgets, quizzes, and a reader. The continuation completed the shorter survey, expanded review evidence, and established a reproducible Git project. First-edition modules remain in `course/v1/`; current lessons live in `course/modules/` and `course/survey/`.

The review process documented corrections and unresolved claims instead of treating a source link as proof of every surrounding assertion. The second-round ledger records 669 assessed claims and 193 explicitly unresolved rows.

Records: [original handoff](../HANDOFF.md), [continuation](../CONTINUATION_2026-09-13.md), [round-two review summary](../course/review/ROUND2_SUMMARY_2026-09-13.md).

## Make the manufacturing visible

Several design passes reorganized the reader, added chapter illustrations and 352 section figures, and improved the interactive labs. Figures were tied to specific authored sections rather than generated as interchangeable decoration.

Reader feedback exposed a gap between “renders successfully” and “makes sense.” Subsequent audits corrected physical geometry, connector paths, label collisions, mechanism variants, and phone layouts. Reviews began distinguishing full-size visual inspection from automated geometry checks and contact-sheet triage.

Records: [design refactor](../DESIGN_REFACTOR_2026-09-13.md), [visual refinement](../VISUAL_POLISH_2026-09-13.md), [diagram audit](../DIAGRAM_AUDIT_2026-09-13.md), [quality refinements](../QUALITY_REFINEMENT_2026-09-13.md).

## Explain for the person learning

An editorial pass focused on the non-expert reader: why a process exists, what physically happens, and what a number means. Definitions and analogies were reviewed for their implications, with technical corrections recorded separately from stylistic changes. The deeper explanations and calculations remained part of the course.

A later supplier-coverage review corrected regional omissions and policy framing. The standard became explicit: choose companies by their documented role, apply comparable evidence standards across countries, and separate ownership, headquarters, manufacturing location, and capability claims.

Records: [language review](../LANGUAGE_REVIEW_2026-09-13.md), [global supplier coverage review](../GLOBAL_COVERAGE_REVIEW_2026-09-14.md).

## Let the reader listen

The first narration implementation used a downloadable local Kokoro model, with cached passages and word highlighting tied to model timings. Human feedback led to a complete pre-render: a static host could serve MP3s and timing manifests without running inference for readers.

Paragraph seeking followed. The player had to preserve text selection, links, controls, and reading position while making a click on prose restart the appropriate passage. Later content corrections regenerated changed recordings while reusing unchanged audio.

Records: [local narration](../NARRATION_2026-09-13.md), [pre-rendered audio and release evidence](../PRERENDER_2026-09-13.md).

## Remove friction in the reader

An initial AI handoff dialog did not work well in practice. It was replaced with a direct **Copy page for AI** action and a complete Markdown download. The reader chooses the assistant and supplies the question; the site does not open an external chat or send text automatically.

Further feedback removed repeated visual-count links, ornamental captions, and duplicate navigation. A real routing bug sent survey readers to deep-dive chapters through the stage navigation; the fix made routes and completion indicators follow the active track.

Records: [Markdown handoff](../STUDY_HANDOFF_2026-09-14.md), [navigation and quality refinements](../QUALITY_REFINEMENT_2026-09-13.md).

## Preparing for public collaboration

Public-facing documentation now separates the reader, contributor workflow, historical evidence, and release process. Model weights and recordings remain external artifacts. License and third-party provenance are documented separately, and the repository's visibility is a maintainer decision rather than part of a build or deployment command.

These iterations established a few practical standards for future work:

- Explain the mechanism before adding detail or decoration.
- Check a diagram's scientific meaning as well as its layout.
- Test real navigation destinations and actual selected states.
- Preserve original sources, dated review evidence, and explicit uncertainty.
- Make privacy, external services, and generated release assets understandable.

Start with [contributing](../CONTRIBUTING.md) to continue that work.
