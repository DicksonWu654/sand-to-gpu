# Working on Sand to GPU

- Preserve the course’s teaching depth, sequence, and concrete explanations when improving prose or visuals.
- Check technical claims against authoritative primary sources; distinguish measured data, published estimates, and illustrative models. Date time-sensitive claims and document uncertainty.
- Select supplier examples by their documented role in the global supply chain, without excluding a country by default. Apply the same evidence standard to every region; distinguish headquarters, ownership and manufacturing location, and company announcements from independently established capabilities. Explain policy from the named jurisdiction's perspective rather than assuming the reader shares it. Representative lists need not imply equal capabilities or market shares.
- Read `HANDOFF.md`, the course guides, and relevant widget/QA specifications before continuing their work.
- Delegate independent research, audits, implementation, and testing to subagents; coordinate ownership to avoid overlapping edits.
- Keep builds reproducible: install dependencies with `npm ci`, rebuild course content with `node build.js`, and follow `qa/WIDGET_QA_STANDARD.md` for affected widgets. Record actual validation and unresolved limitations.
- Keep secrets, credentials, private keys, `node_modules`, and generated screenshots out of Git. Inspect staged changes before committing.
- Use the user’s configured identity and GPG key to sign commits. Commit and push completed changes to the private GitHub repository; keep the repository private unless explicitly instructed otherwise.

## Lessons from the continuation

- Page QA must assert the rendered theme, not just the requested theme or localStorage value. Hash navigation can retain the current document and its startup state.
- Interaction scenarios must assert which item was selected, not only that a click produced no browser error. Dense SVG hit regions can select a neighboring event on phones despite clean geometry reports; verify actual pointer coordinates, hover and keyboard paths.
- Some widgets replace their SVG repeatedly. Responsive wrappers must be reused or pruned, including hints and focus regions; test repeated state changes and cleanup.
- Treat `UNVERIFIABLE` and `UNRESOLVED` consistently in review summaries. A primary-source link can establish a limitation without confirming the whole claim. Keep calculations conditional on their stated inputs.
- See `CONTINUATION_2026-09-13.md` and the current QA reports before treating the original `HANDOFF.md` as current state.

## Illustrated atlas

- Author section figures against exact inventory IDs and source headings. Run the strict coverage check after changes; do not generate generic fallback figures to satisfy coverage.
- A physical cross-section must show physical ordering. Interfaces are boundaries, and alternative materials or process options should not be drawn as consecutive layers or steps.
- Mechanism variants should depict the relevant structural difference. Review rendered examples in both themes and on a phone; schema validation and page-load success do not establish visual correctness.
- Keep inserted figure titles out of the chapter navigation and scroll spy. Same-chapter anchor navigation should preserve interactive lab state; cancel pending scroll callbacks when leaving the chapter.
- Validate complete CSS rules as well as declarations. A declaration-only check misses rejected selectors such as `a: hover`; browser rule parsing also handles supported selector lists and vendor pseudo-elements more faithfully than testing each selector string with `CSS.supports`.
- Check physical-layer label alignment at phone widths, and scope SVG marker IDs separately for each drawing, including hidden alternate views.
- Outer bounds and accessible SVG counts do not establish diagram quality. Inspect internal text clipping, connector crossings, and physical contacts at readable size, including changed interactive states. Distinguish contact-sheet triage from full-size and source review in audit records.
- Draw connected structures as connected structures. Honor mechanism variants; use explicit relationships and conditional feedback paths instead of generic arrows or unconditional cycles. Label exploded views and distinguish them from assembled cross-sections.
- Measure usable widget content width after padding. Stack paired diagrams when their readable widths cannot fit; where phone scrolling is necessary, provide a visible hint and ensure every annotation remains reachable. Preserve complete simulation calculations when sampling decorative marks for rendering performance.
- Test navigation from the bottom of a long chapter, not only fresh page loads. Global smooth scrolling can leave the previous reading position active while the destination's progress observer starts. Same-chapter navigation should preserve mounted labs, including links back to the chapter root.
- Review tables containing long explanatory cells on phones, including their offscreen columns. A bounded table can still be unusable if its prose columns collapse; keep columns readable and make intentional horizontal scrolling discoverable and keyboard accessible.
- For explanatory edits, teach the role and causal mechanism before listing materials, acronyms or parameters. Expanding an acronym is not enough to define it. Keep equations and technical depth, but name the quantities and explain the relationship before the arithmetic.
- Check what an analogy actually implies. An etch analogy must remove some original material; a polarized crystal is not an energy-supplying battery; a DRAM read disturbs charge rather than always emptying the cell. State useful limits, and record corrections separately from stylistic edits.
- Authorized prose revisions change the source contract: verify generated prose against current authored Markdown, while retaining heading, quiz, widget and figure checks. Record numerical/citation changes and editorial review scope; passing rendering checks does not establish scientific accuracy.
- Narration must preserve source DOM and use actual audio time plus model token timestamps for highlights; do not simulate word timing from word counts. Keep offset mappings in browser UTF-16 coordinates, including inline markup and Unicode.
- Keep speech generation local, bounded and cached by text, voice and engine version. Runtime dependencies, weights and generated audio belong outside Git. Verify real generation and cache replay separately from mocked player tests; mocks cannot establish voice quality.
- Following must yield to manual scrolling and same-chapter navigation. Cancel audio, requests and animation callbacks when the player closes or the lesson unmounts. Keep lookahead bounded so listening does not silently generate the entire course.
- A user-requested full render is an explicit batch operation. Capture its inventory from the actual reader extraction function, check both desktop and phone text, preserve exact passage identities, and count failures instead of silently omitting clips.
- Treat static audio output as a staging artifact until generation and compression both finish and complete coverage passes. Keep large recordings outside Git, publish the complete folder together, and mark the static edition so missing assets never trigger a speech-generation API.
- Validate compressed audio's decoded duration and encoder delay against source timings; file-size reduction alone does not establish highlight alignment. Large numerical explanations may need smaller phoneme batches while preserving original token offsets.

- For narration click seeking, map each paragraph to its first extracted segment without changing authored text or inserting controls. Preserve links, interactive content, modified clicks and native text selection; cancel delayed clicks on close/navigation and reuse playback generation guards so the newest seek wins.
- The reader requested a simple **Copy page for AI** action after the question-dialog handoff failed in practice. Copy complete authored Markdown directly, retain tables/equations/references, and provide a download and manual-copy fallback. Keep text synchronously available at the click; never combine copying with opening a chat, send excerpts automatically, or claim success after a denied copy. Test actual clipboard write/read in an isolated browser in addition to failure mocks; do not read the user’s desktop clipboard. Preserve course text/extraction and existing audio.
