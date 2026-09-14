# Build validation

This records the checks run for public-repository preparation on September 14, 2026. It is evidence for that change, not a guarantee about every future browser, scientific claim, or dependency advisory.

## Reproduce the main checks

Use a full Git clone, Node 22.12 or newer, and npm:

```sh
npm ci
npm run build
npm run check
npm run check:markdown
```

`npm ci` installs the lockfile and Puppeteer's browser. The browser needs the operating system libraries required by Chrome and a working sandbox. `PUPPETEER_EXECUTABLE_PATH` can select an existing compatible Chrome or Chromium installation. The checks do not need speech models or recordings.

The section-figure check compares current lessons against the retained Git baseline `adc7c74c0543d95a083cbf224274b4ba89008b7d`, plus explicitly reviewed quiz amendments. A source ZIP or shallow clone may not contain that object. Use a full clone, or fetch the missing history before running the complete check.

## Results

Validation ran in an isolated full clone, with the preparation's package and QA changes applied. Existing local `node_modules` and narration caches were not copied into it. The live preview and recorded audio were unchanged.

| Check | Result |
| --- | --- |
| Clean `npm ci`, Node 24.15.0 / npm 11.14.1 | Passed with the updated lockfile |
| `npm run build` | 22 deep modules, 10 survey chapters, 352 authored figures, 32 Markdown exports |
| `npm run check`, Node 24.15.0 and Node 22.23.2 | Passed; no reported content/figure contract errors |
| `npm run check:markdown`, both Node versions | All 32 whole-lesson exports passed exact source-fidelity checks |
| Generated-asset comparison after rebuilding | No changes to `site/content.js`, `site/ai-content.js`, figure coverage, or the combined course Markdown |
| Existing navigation regression, bundled Chrome 153.0.8010.36 | All 12 checks passed: anchors/history, search keyboard use, mobile curriculum, progress persistence, and responsive tables |
| QA report paths | Repository-relative paths for normal reports; basename only for explicitly external report destinations |
| YAML and JavaScript syntax | Workflow/issue YAML parsed; changed QA scripts passed Node syntax checks |
| `npm audit --audit-level=moderate` | Zero reported vulnerabilities in 29 audited packages at validation time |

Puppeteer was updated from 23.11.1 to 25.11.0 to remove the browser-download dependency chain flagged by the registry audit. The QA launcher now awaits its asynchronous executable lookup. Both the historical-contract checks and actual reader navigation ran with the new bundled browser. The Markdown renderer remains at its existing locked version, 14.1.4.

## Continuous integration

The `Course checks` workflow runs on pull requests, pushes to `main`, and manual dispatch. It checks Node 22 and 24, installs locked dependencies, checks dependency advisories, rebuilds, validates content and Markdown, and rejects stale generated course assets. Actions are pinned to reviewed commit SHAs. The job uses read-only repository permissions and no project secrets; it does not publish artifacts or change repository visibility.

The workflow configuration has been parsed locally; the checks above were run locally. GitHub-hosted execution is separate evidence and should be checked on the release commit.

## Limits

- This preparation did not repeat the full widget screenshot matrix, real-device testing, screen-reader testing, or scientific fact review. Existing review history is retained, with its original scope and limitations.
- A fresh optional narration environment was not installed and the course was not rerecorded. Python requirements and the Kokoro model revision are pinned, but the Python lockfiles do not contain artifact hashes or lock operating system libraries, `uv`, FFmpeg, or GPU drivers. They describe the known runtime rather than a verified cross-platform installation.
- Network access is needed for dependency/browser/model downloads and the registry audit. Cached downloads can reduce later installation time. Advisory results can change after this report.
- Some legacy audit scripts depend on historical Git revisions or external recordings. They are investigation records and targeted tools, not all part of the default CI suite.
