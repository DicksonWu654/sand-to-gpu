# Ask about what you are reading

The reader can prepare a question for ChatGPT without an embedded AI service. Select a passage within a lesson section, then choose **Ask ChatGPT**. The chapter toolbar offers the same action for selected text or a visible paragraph.

In the dialog, write a question or choose a teaching prompt, decide whether to include nearby prose, and expand **Preview exactly what you’ll copy** to review the draft. **Copy & open ChatGPT** copies the draft and opens ChatGPT in another tab. Paste it there and send it when ready. **Copy** also works for an existing conversation or another assistant.

The passage, chapter and section travel with the question. Nearby explanation is optional. The prompt asks for clear teaching followed by deeper mechanisms, necessary definitions, and useful analogies with their limits. Course excerpts are explicitly reference material rather than instructions or guaranteed facts. A source link points back to the reader; it does not assume the assistant can access a local or private website.

Nothing is submitted automatically. The course calls no model API, requests no AI credentials, stores no questions, and puts no question or course excerpt in the destination URL. Clipboard access happens only after a copy action. If it fails, the exact draft is selected for manual copying; a separate **Open ChatGPT** link remains available. The external service handles anything the reader subsequently pastes or sends under that service’s own terms and settings.

## Scope and limits

- Capture is bounded to 6,000 passage characters and 3,000 nearby characters, with truncation disclosed. It is not a whole-course export.
- Selections must stay within readable prose in one section. Diagrams, interactive controls, code, tables and reference lists are excluded; their visual state is not silently represented as text.
- Opening the dialog pauses current or pending narration. Closing it restores the reading selection and leaves playback paused.
- The lesson DOM and narration extraction stay unchanged. Existing recordings require no regeneration for this feature.
- The clipboard API normally requires HTTPS or localhost. The manual-copy path remains available where it is denied or unsupported. Browser popup policies and ChatGPT sign-in may add a step.

The implementation uses a plain ChatGPT link and explicit paste. Official research did not establish a supported prompt-prefill URL contract to rely on. The [official ChatGPT web guide](https://learn.chatgpt.com/docs/web) describes starting a chat and supplying a goal and context; it does not establish the app-specific handoff mechanism used here.

## Implementation and verification

`site/study-context.js` captures immutable, bounded text snapshots and composes drafts. `site/study-assist.js` and its stylesheet own the selection action and dialog. `site/app.js` mounts and cleans up the feature with the chapter. A scoped event asks `site/narration.js` to pause; it does not alter narration extraction.

Focused browser checks live in `qa/study-context.js` and `qa/study-assist.js`, with recorded results under `qa/reports/`. External window opening and clipboard operations are intercepted in automated tests: those tests send no questions to ChatGPT and do not establish the behavior of every browser or an authenticated ChatGPT session. The static edition and downloadable package include the feature alongside the existing complete recordings; see [publication details](PRERENDER_2026-09-13.md).

Run the focused checks against a source preview with `node qa/study-context.js` and `QA_BASE_URL=http://127.0.0.1:8793 node qa/study-assist.js`. Use `npm run check` and `npm run qa:narration` for course and playback regressions.

The September 14 validation passed all 10 context cases, 17 integrated handoff cases, and 35 existing narration cases; course/figure checks also passed. Nine screenshots were reviewed across both themes and desktop/phone layouts. The integrated tests include clipboard denial, blocked popups, focus/selection restoration, chapter cleanup, pending audio and real error-state paths with intercepted media. The source content and narration extractor fingerprints match the prior published edition. On the long module 06, three selected-passage captures took 17.0–22.3 ms in the test browser; this is a scoped measurement, not a guarantee for every device.

A separate native browser check against the complete static preview played an actual saved MP3, opened the dialog, and confirmed audio time stopped at 0.806 seconds and stayed there after closing. It made no speech-API or ChatGPT requests. The reproducible check and result are `qa/study-assist-native.js` and `qa/reports/study-assist-native.json`.
