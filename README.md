# Sand to GPU: The Complete Semiconductor Supply Chain

A self-study course that follows silicon from a quartz mine to an NVIDIA GB200 NVL72 rack, at the
level of the physics, the chemistry, the machines, the real numbers and the real companies.

## What is here

```
course/
  CURRICULUM.md          the 22-module syllabus
  STYLE_GUIDE.md         the rules every module was written to
  REVIEW_BRIEF.md        the rules every module was fact-checked to
  modules/NN-slug.md     the 22 modules (~230,000 words of Markdown)
  quizzes/NN-slug.json   6 questions per module
  review/NN-slug.md      the fact-check report for each module (claims checked, verdicts, edits)
site/
  index.html             the interactive learning site (open via a static server; see below)
  widgets/*.js           28 interactive visuals embedded in the modules
  content.js             generated from course/ by build.js
build.js                 regenerates site/content.js from course/modules + course/quizzes
serve.js                 tiny static server for the site
```

## Reading order

| Part | Modules |
|---|---|
| I  Raw materials and wafers | 00 Overview · 01 Sand to polysilicon · 02 Crystal growth · 03 Ingot to wafer · 04 Compound semiconductors and consumables |
| II  The front end (the fab) | 05 Inside a fab · 06 Oxidation and deposition · 07 DUV lithography · 08 EUV lithography · 09 Etch · 10 Doping · 11 Transistor architectures · 12 Interconnect · 13 Metrology and yield · 14 Wafer sort and test |
| III Memory | 15 DRAM, NAND and HBM |
| IV  The back end | 16 Packaging fundamentals · 17 CoWoS, SoIC and chiplets · 18 Final test and burn-in · 19 Building an NVIDIA GPU |
| V   The ecosystem | 20 Economics and geopolitics · 21 Glossary, node table and master process flow |

Every module ends with a Key Numbers table, a Key Players table, Common Misconceptions, a paragraph
placing the stage in the chain, and Further Reading. Numbers marked "~" are approximate; anything
from 2025–2026 is flagged with an "as of" date in the text.

## Running the site

```bash
node serve.js
```

then open http://localhost:8790. Progress, quiz scores and theme are stored in your browser only.

If you edit a module, rebuild the site content with:

```bash
node build.js
```

## Accuracy

Each module was written by one author agent and then independently fact-checked by a reviewer agent
with web access, which verified 30–45 load-bearing claims per module against primary sources and
edited the module directly. The per-module reports in `course/review/` list every claim, its verdict
and the source used. Proprietary details (exact fab recipes, contract prices) are described from
public information and hedged as such.
