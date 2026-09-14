# Contributing to Sand to GPU

Help a curious reader understand one more part of how chips are made. Useful contributions include factual corrections, clearer explanations, better diagrams, accessibility fixes, and reproducible software bug reports.

## Start with the reader

Read the [teaching guide](course/TEACHING_GUIDE.md) and, for survey edits, the [survey guide](course/SURVEY_GUIDE.md). Explain the problem and physical mechanism before introducing a parameter list. Define unfamiliar terms where the reader meets them. Keep technical depth, but give each equation named quantities and a plain-language interpretation.

For a substantial new feature or a curriculum reorganization, open an issue describing the reader's problem and proposed change before implementing it. Small corrections can go straight to a pull request.

## Report an issue

For a content correction, include the track, chapter, section heading, disputed statement, and a primary source that supports the correction. Explain whether the source establishes the whole claim or only part of it. A source URL alone is not a review.

For a reader bug, include the chapter route, browser, viewport or device, steps to reproduce, expected result, and actual result. Screenshots are useful for layout defects; remove personal information first. Describe audio issues separately from word-highlighting or navigation issues.

For vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of posting sensitive details publicly.

## Set up

Use Node.js 22.12 or later (Node.js 24 recommended), npm, and a full Git clone. The source-preservation check reads a historical baseline commit.

```bash
npm ci
npm run build
npm start
```

The reader is available at `http://127.0.0.1:8790`. See the [README](README.md) for optional local narration. Do not commit dependency directories, speech models, generated recordings, browser profiles, credentials, or local environment files.

Edit authored Markdown in `course/modules/` or `course/survey/`. Update quizzes in `course/quizzes/` when a changed explanation affects an answer. Rebuild rather than hand-editing `site/content.js` or `site/ai-content.js`; include the resulting generated changes in your pull request. Historical first-edition material in `course/v1/` is preserved for context, not used as the current teaching source.

## Content and source standards

- Prefer papers, standards, manufacturer documentation, and other primary sources. Date time-sensitive claims and separate measured results, estimates, announcements, and hypothetical examples.
- Include suppliers according to their documented role. Apply the same standard to every region; distinguish headquarters, ownership, and manufacturing location.
- Check analogies for false implications. State the limit when it matters to the mechanism being taught.
- Keep survey explanations consistent with their deep-dive sources. Update affected quizzes, figures, and review notes together.
- Record unresolved uncertainty instead of converting it into confident prose. A passed software test does not resolve a scientific claim.

## Diagrams and interactive labs

Read the [figure schema](course/visuals/SCHEMA.md), [widget contract](site/WIDGET_SPEC.md), and [widget QA standard](qa/WIDGET_QA_STANDARD.md) relevant to your change.

Author figures against the existing section inventory. Draw physical ordering, contact, and direction accurately. Alternatives are not consecutive layers; feedback is not always an unconditional loop. Labels and connectors must remain readable in both themes and on phones.

Exercise changed controls and inspect rendered states. An SVG that stays inside its bounding box can still contain overlapping labels or teach the wrong mechanism. Preserve keyboard operation, native text selection, reduced-motion preferences, and usable focus states.

## Validate the change

Run the source and coverage checks:

```bash
npm run build
npm run check
npm run check:markdown
```

For an affected page or widget, keep the server running in another terminal:

```bash
npm run qa:page -- "#/s/01" --width 375 --theme light
npm run qa:widget -- hbm-stack
```

Use the existing scenarios for affected interactions and visually inspect their screenshots. For broader reader or widget work, the maintained suites include:

```bash
node qa/shell.js
npm run qa:sweep -- widgets
npm run qa:sweep -- pages
```

The harness uses Chrome or Chromium; see the [README](README.md) for browser installation and `QA_BASE_URL`. Screenshots belong outside Git. Report the actual commands, cases checked, and known gaps rather than claiming everything works. Avoid adding tests that merely restate a trivial implementation change.

Lesson text changes can invalidate narration passages. Rebuild the course and recapture the inventory before creating a new audio release. Contributors do not need to regenerate the full course for every prose pull request; identify affected chapters so the release can regenerate changed passages. See [releasing](docs/PUBLISHING.md).

## Open a pull request

Explain the concrete problem, the new behavior or corrected teaching, and how you checked it. Link relevant sources and issues. For visual changes, include readable before/after images at desktop and phone widths. Keep unrelated cleanup separate.

AI-assisted contributions are welcome. Describe meaningful AI involvement and review the result yourself: verify references, inspect diagrams, run affected checks, and ensure you have the right to contribute the material. Never submit private prompts, credentials, or someone else's unpublished material.

Keep discussion specific, respectful, and focused on helping the learner. See [licensing](docs/LICENSING.md) for the terms applicable to each part of the project.
