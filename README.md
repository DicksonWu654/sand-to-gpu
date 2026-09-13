# Sand to GPU

An in-depth, self-study course following silicon from quartz to an NVIDIA GPU rack. It explains the physics, chemistry, manufacturing equipment, supply chain, and engineering tradeoffs for a reader who knows programming and school science.

## Course tracks

- **Deep dive:** 22 modules, roughly 512,000 words, covering materials, wafer fabrication, transistors, memory, packaging, testing, GPU systems, and economics.
- **Survey:** ten shorter chapters connecting the whole supply chain, with links into the deep modules.
- **Interactive learning:** 46 widget implementations, eight-question module quizzes, search, a glossary, and browser-local progress and theme preferences.
- **Illustrated atlas:** 352 authored figures across the substantive teaching sections, chapter opening illustrations, and responsive light and dark layouts. Physical structures, process flows, comparisons, and networks complement the interactive labs.

| Part | Modules |
|---|---|
| Materials and wafers | 00 Overview · 01 Sand to polysilicon · 02 Crystal growth · 03 Ingot to wafer · 04 Compound semiconductors and consumables |
| The fab | 05 Inside a fab · 06 Oxidation and deposition · 07 DUV lithography · 08 EUV lithography · 09 Etch · 10 Doping |
| Devices, wiring, and yield | 11 Transistors · 12 Interconnect · 13 Metrology and yield · 14 Wafer sort and test |
| Memory and packaging | 15 DRAM, NAND, and HBM · 16 Packaging · 17 CoWoS, SoIC, and chiplets |
| Systems and the industry | 18 Final test · 19 Building an NVIDIA GPU · 20 Economics and geopolitics · 21 Glossary and reference tables |

## Run locally

Install Node.js and the locked dependencies, then build and serve:

```bash
npm ci
node build.js
node serve.js
```

Open [the local course](http://127.0.0.1:8790). Use `PORT` to select a different server port. Re-run `node build.js` after editing modules, surveys, quizzes, section figures, or widget placements. Progress and quiz scores stay in your browser.

## Check changes

With the local server running:

```bash
npm run build
npm run check
node qa/shell.js
node qa/refactor-pages.js
node qa/flagship-refactor.js
npm run qa:sweep -- widgets
npm run qa:sweep -- pages
```

For one visual, run `npm run qa:widget -- hbm-stack`. For one page, run `npm run qa:page -- "#/s/01" --width 375 --theme light`.

Browser checks require Chrome or Chromium. The harness uses Puppeteer's browser, an installed system browser, or `PUPPETEER_EXECUTABLE_PATH`. If needed, install the bundled browser with `npx puppeteer browsers install chrome`. Use `QA_BASE_URL` for a different preview address. Static, shell, and batch checks save JSON reports in `qa/reports/`. Single-widget and single-page commands print their JSON result to standard output; redirect it to a file if needed. Generated screenshots are ignored by Git. Automated geometry checks complement visual inspection; they do not prove the diagrams or course content are scientifically correct.

## Files

```text
course/modules/           Deep modules (the source of truth)
course/survey/            Survey chapters
course/quizzes/           Module quiz data
course/visuals/           Authored figure data, renderer, schema, and coverage inventory
course/review/            Historical and second-round review evidence
course/v1/                Preserved first edition
site/                     Static learning application and widgets
site/course-shell.js      Shared chapter and homepage illustration components
site/content.js           Generated content consumed by the application
qa/                       Browser harness, interaction scenarios, and QA reports
build.js                  Generates site/content.js
serve.js                  Local static server
HANDOFF.md                Original Claude handoff (historical state)
CONTINUATION_2026-09-13.md Follow-up work, validation, and remaining limits
```

`course/TEACHING_GUIDE.md` defines the intended reader, explanation sequence, and depth standard. `course/SURVEY_GUIDE.md` defines the shorter track. `qa/WIDGET_QA_STANDARD.md` defines visual and interaction checks.

Section figures are authored in `course/visuals/lessons/`, keyed to exact section IDs. Follow `course/visuals/SCHEMA.md` when adding or editing them. The renderer supplies reusable drawing primitives and mechanism variants; each figure supplies its own components, relationships, explanation, and source provenance. Reference sections retain appropriate tables and lists. The build places teaching figures and labs inside their owning sections, after an opening paragraph where one exists.

`npm run check` includes strict figure coverage and source-preservation checks. The [visual refactor record](DESIGN_REFACTOR_2026-09-13.md) describes the implementation and validation evidence.

The [second visual refinement](VISUAL_POLISH_2026-09-13.md) adds apparatus studies, richer chapter openings, direct-label figure layouts and further lab improvements, with its validation and reproduction commands.

## Accuracy and review scope

The course combines published technical facts with approximate process ranges and illustrative economic models. Proprietary recipes, prices, market shares, and future plans require particular care. Historical claims retain their stated timeframe; the course is not a live market-data feed.

First-round reports are preserved in `course/review/`. Files ending in `-r2.md` record the follow-up review: the claims examined, supporting primary sources, corrections, and unresolved limits. A targeted review of key claims is not an exhaustive verification of this half-million-word course. Consult the report for each module before relying on a particular number. The [round-two summary](course/review/ROUND2_SUMMARY_2026-09-13.md) counts 669 assessed claims, including 193 explicitly unresolved rows; other rows include conditional calculations and scope corrections.

## Repository

The repository is private. Commits use the configured Git identity and GPG signing key. Dependencies, local credentials, and generated screenshots are excluded; source, review evidence, and reproducible checks are retained. The original hosted Claude artifact is separate from this Git repository.
