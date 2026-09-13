# Semiconductor Supply Chain Deep-Dive Course — Author Style Guide

You are writing ONE module of a very in-depth, technically accurate, self-study course on the entire
semiconductor supply chain: from quartz sand to a finished NVIDIA GPU rack. The reader is smart,
curious, and wants MECHANISM-LEVEL detail ("how exactly does this work?"), not a survey.
Think: a textbook chapter written by an engineer who has actually stood next to the tools,
with the readability of a great long-form blog post (Asianometry / SemiAnalysis / Chris Mack level).

## Hard requirements
1. Markdown. Start with `# Module NN: Title`. Use `##` and `###` sections generously.
2. Target 5,000–8,000 words. Depth over breadth. Do NOT pad; every paragraph must teach something concrete.
3. Explain MECHANISMS: physics, chemistry, the actual sequence of operations, what the machine does
   step by step, what can go wrong, why the parameters are what they are.
4. Use REAL NUMBERS wherever they are known (temperatures, pressures, wavelengths, thicknesses,
   throughputs, costs, purities, dimensions, tool counts, company market shares). If a number is
   approximate or disputed, say "~" or give a range. Never invent precise figures you are unsure of;
   say "on the order of" instead.
5. Name the real companies, tools, and materials (e.g. ASML NXE:3800E, Lam Kiyo, Applied Endura,
   TEL Lithius, KLA 2935, JSR photoresist, Shin-Etsu wafers, Ajinomoto ABF). Give market share
   / who-supplies-whom context where relevant.
6. Every module MUST end with these sections, in this order:
   - `## Key Numbers` — a markdown table of the 10–20 most important quantitative facts in the module.
   - `## Key Players` — a table: Company | Country | Role / what they supply | Approx. position (leader / #2 / niche).
   - `## Common Misconceptions` — 3–6 bullets, each "Misconception → Reality".
   - `## Where This Fits in the Supply Chain` — 1 paragraph linking backward to the previous
     module and forward to the next (inputs consumed, outputs produced, who ships what to whom).
   - `## Further Reading` — 5–10 real sources (books, papers, company technical pages, well-known
     articles/videos). Only cite things you are confident actually exist.
7. Include at least 2 "Worked Example" boxes (use a `> **Worked example:** ...`
   blockquote) that walk through a calculation or concrete scenario (e.g. dies per wafer, Rayleigh
   resolution, cost per wafer, tin droplets per second, atoms per monolayer).
8. Use `**bold**` for a term the first time it is defined. Define every acronym on first use.
9. Do not write fluff intros ("In today's fast-paced world..."). Open with the concrete problem this
   stage solves and why it is hard.
10. Accuracy > confidence. If something is proprietary/unknown (e.g. exact TSMC recipes), say so and
    describe the publicly known approach.
11. Timeframe: it is late 2026. Describe the current state of the art (TSMC N2 in HVM, A16 ramping,
    High-NA EUV EXE:5000/5200 in early production at Intel and others, HBM4 shipping, NVIDIA
    Blackwell Ultra / Rubin era). Where you are not sure of very recent developments, describe the
    2024–2025 state and flag it as "as of ~2025".
12. No em-dashes in headings. Tables must be valid GitHub markdown.

## Quiz file
ALSO write a quiz file with 6 multiple-choice questions for your module, as JSON:
{
  "module": NN,
  "questions": [
    {"q": "...", "options": ["A", "B", "C", "D"], "answer": 2, "explanation": "one or two sentences"}
  ]
}
`answer` is the 0-based index into options. Questions should test real understanding of mechanism
and numbers, not trivia.

## Files
- Write the module to: course/modules/NN-slug.md
- Write the quiz to:   course/quizzes/NN-slug.json
(NN and slug are given in your assignment.) Write files directly with the Write tool. Do not ask questions; make reasonable decisions and finish the whole module.
