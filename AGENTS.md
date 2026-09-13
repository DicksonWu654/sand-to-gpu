# Working on Sand to GPU

- Preserve the course’s teaching depth, sequence, and concrete explanations when improving prose or visuals.
- Check technical claims against authoritative primary sources; distinguish measured data, published estimates, and illustrative models. Date time-sensitive claims and document uncertainty.
- Read `HANDOFF.md`, the course guides, and relevant widget/QA specifications before continuing their work.
- Delegate independent research, audits, implementation, and testing to subagents; coordinate ownership to avoid overlapping edits.
- Keep builds reproducible: install dependencies with `npm ci`, rebuild course content with `node build.js`, and follow `qa/WIDGET_QA_STANDARD.md` for affected widgets. Record actual validation and unresolved limitations.
- Keep secrets, credentials, private keys, `node_modules`, and generated screenshots out of Git. Inspect staged changes before committing.
- Use the user’s configured identity and GPG key to sign commits. Commit and push completed changes to the private GitHub repository; keep the repository private unless explicitly instructed otherwise.

## Lessons from the continuation

- Page QA must assert the rendered theme, not just the requested theme or localStorage value. Hash navigation can retain the current document and its startup state.
- Some widgets replace their SVG repeatedly. Responsive wrappers must be reused or pruned, including hints and focus regions; test repeated state changes and cleanup.
- Treat `UNVERIFIABLE` and `UNRESOLVED` consistently in review summaries. A primary-source link can establish a limitation without confirming the whole claim. Keep calculations conditional on their stated inputs.
- See `CONTINUATION_2026-09-13.md` and the current QA reports before treating the original `HANDOFF.md` as current state.

## Illustrated atlas

- Author section figures against exact inventory IDs and source headings. Run the strict coverage check after changes; do not generate generic fallback figures to satisfy coverage.
- A physical cross-section must show physical ordering. Interfaces are boundaries, and alternative materials or process options should not be drawn as consecutive layers or steps.
- Mechanism variants should depict the relevant structural difference. Review rendered examples in both themes and on a phone; schema validation and page-load success do not establish visual correctness.
- Keep inserted figure titles out of the chapter navigation and scroll spy. Same-chapter anchor navigation should preserve interactive lab state; cancel pending scroll callbacks when leaving the chapter.
