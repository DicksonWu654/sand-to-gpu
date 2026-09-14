# Copy page for AI

Choose **Copy page for AI** in a lesson to copy its complete Markdown. Paste it into ChatGPT, Claude, another assistant, or a document, and add your own question. The page does not open an AI service, compose a prompt or send anything automatically.

This replaces the earlier **Ask ChatGPT** passage dialog following the reader’s report that the handoff did not work. The reference is [Security Alliance’s Copy page for AI action](https://frameworks.securityalliance.dev/intro/introduction/), inspected in a browser: its button copies the full Markdown page directly without a question dialog or external chat window.

The exported chapter includes its title, headings, explanations, tables, equations, code and references. It comes from authored Markdown, not a scrape of the application’s navigation or generated controls. Empty interactive-widget placeholders become explicit omission notes. Diagrams and live simulation state are not represented as if they were included. Copying a page does not truncate it to a selected paragraph or a fixed character limit.

**Download Markdown** saves the same complete text as a `.md` file. This is useful when an assistant accepts file attachments or a chapter is too long for its message box. Different assistants have their own context limits; the course does not silently shorten the chapter to fit one provider.

## Copy reliability

The Markdown is available locally before the button can be used, so copying does not depend on a network response during the click. The browser clipboard API is attempted directly. If unavailable or denied, the helper attempts the browser’s compatible copy command; if that also fails, it displays selectable text for manual copying. Success is only reported after a copy operation reports success. The download remains available independently.

The normal path is one action and does not open a dialog or another tab. The manual-copy fallback is the only dialog. Narration and the reader’s place are preserved by the primary copy action; the fallback pauses listening while the reader handles the text. No AI credentials, model, backend or service connection are needed.

## Implementation and verification

The generated `site/ai-content.js` keeps full Markdown separate from the rendered course data. Rebuild it with the course when authored Markdown changes. The existing `site/content.js`, lesson DOM and narration extraction remain unchanged by this UI replacement, so the saved recordings require no regeneration.

Focused checks verify all 32 exports against their authored sources and exercise actual clipboard copying in an isolated browser, alongside denied/unavailable paths, download fidelity, navigation cleanup and responsive layout. Browser tests do not submit anything to an AI service or read the user’s desktop clipboard. Results and remaining browser-specific limits are recorded in the QA reports.

Run the export/source checks with `node qa/page-markdown.js` and the browser checks against a running source preview with `QA_BASE_URL=http://127.0.0.1:8793 node qa/page-copy.js`. Reports are `qa/reports/page-markdown.json` and `qa/reports/page-copy.json`. The glossary is the largest export at 201,439 characters; its complete source passed the comparison. Build checks also verify that a data-identical rebuild preserves the existing narration fingerprint, while real data changes update the rendered output.

The September 14 replacement passed all 32 source comparisons, 11 interaction cases and the course/figure checks. Clipboard tests read back actual writes for a survey and a long module, verify the compatible copy command, and compare downloaded bytes. A real saved-MP3 check confirms ordinary copying keeps playback running; manual recovery pauses it and closing recovery leaves it paused. Both themes and desktop/phone layouts were reviewed. These checks exercise an isolated Chromium browser, not every embedded-browser clipboard policy; the user's original failure could not be reproduced there, so its exact cause is not claimed.

After promotion, the live static preview also passed actual copy/readback for survey 01 (19,402 characters) and the full glossary (201,439 characters), plus compatible-copy checks for unavailable and rejected clipboard APIs. See `qa/reports/page-copy-live.json`.

The complete static edition and downloadable ZIP include the helper and the existing recordings. See [publication details](PRERENDER_2026-09-13.md).
