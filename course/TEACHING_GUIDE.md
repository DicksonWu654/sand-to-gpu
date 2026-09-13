# Teaching Guide (v2): how every module must explain

## The reader
A curious, intelligent adult who can program, remembers school chemistry and physics (atoms, bonds,
voltage, current, waves, pressure, temperature), and has *vaguely heard* of chips, wafers, TSMC and
NVIDIA. They have never been in a fab, never read a device-physics textbook, and do not know what a
transistor looks like inside. By the end of the course they should be able to hold their own in a
technical conversation with a process engineer: they know the vocabulary, the mechanisms, the real
numbers, the machines and who makes them, and why each step is hard. The course must take them from
zero to that level; it must never assume the level.

## The four rules
1. **Why before how, how before numbers.** Every section opens with the problem this step solves and
   why it is hard (one or two paragraphs a non-expert can follow), then the mechanism (physics or
   chemistry explained from first principles the reader has), then the machine and the recipe with the
   real numbers, then what goes wrong, then who makes it. Never open a section with a parameter list.
2. **No undefined words.** Every technical term, acronym, unit and material is defined in plain
   language at first use in the module (even if another module defined it). Bold the term at its
   definition. If a definition needs a concept the reader does not have, explain that concept first, in
   one or two sentences. Test: could the reader explain this word to a friend after reading the
   sentence?
3. **Build intuition, then precision.** Give the reader a mental picture before the equation: an
   analogy, a scale comparison ("a 300 mm wafer the size of a dinner plate, flat to within a fraction
   of a hair's width"), a "think of it as" that is honest about where it breaks. Then give the exact
   statement and the numbers. Equations are allowed and encouraged, but every symbol is named and the
   equation is followed by one sentence saying what it means and a worked number.
4. **Consistent depth.** Every core process reaches the same depth (see rubric). No section is a
   glossary entry while its neighbour is a monograph. If a topic is genuinely a side note, say so in
   one paragraph and move on; if it is core, give it the full treatment.

## Required structure of every module
- `# Module NN: Title`
- An opening of 2–4 paragraphs: the concrete problem, why it is hard, what the reader will be able to
  explain by the end. No throat-clearing.
- `## Before you start` — a short list (4–10 bullets) of the prior concepts this module leans on, each
  with a one-sentence plain-language refresher and, where relevant, "(Module NN)". Written so a
  reader who skipped earlier modules can still follow.
- The body, in `##` sections following rule 1. Within the body use these devices where they help:
  - `> **Intuition:** ...` boxes (one paragraph) for the mental picture before a hard mechanism.
  - `> **Worked example:** ...` boxes that walk a calculation with real numbers (at least 3 per module).
  - `> **What can go wrong:** ...` boxes for failure modes and how engineers detect and fix them.
  - `> **Why it matters downstream:** ...` boxes linking a parameter to a consequence later in the chain.
  - Tables for comparisons and specs. Ordered lists for process sequences (each step with a one-line
    description of what physically happens and why).
- `## Summary` — 8–15 bullets a reader could use to explain the module to someone else.
- `## Key Numbers` (table: Quantity | Value | Why it matters), `## Key Players` (Company | Country |
  What they supply | Position), `## Common Misconceptions` (Misconception → Reality, 4–8 bullets),
  `## Where This Fits in the Supply Chain` (one paragraph), `## Further Reading` (real sources only).

## Depth rubric (score each `##` section 1–5)
1. Mentions the topic. 2. Names the steps. 3. Explains the mechanism qualitatively.
4. Mechanism + machine + recipe numbers + what goes wrong + who makes it. 5. Level 4 plus a worked
example or a quantitative model the reader can reuse.
Every core process section must reach 4; the module's central process (e.g. EUV source, CZ pull,
dual damascene, CoWoS flow) must reach 5. Support sections (history, market) may sit at 3.

## Style
Plain, direct, concrete sentences. Second person is fine ("you would see..."). Prefer "the etch
removes 40 nm per minute" to "etch rates are on the order of tens of nm/min". Use "~" for approximate
values. State uncertainty honestly ("TSMC does not publish this; estimates range..."). No filler, no
hype, no em-dashes in headings. Define acronyms as "**extreme ultraviolet (EUV)**". Numbers with units
and thousands separators. Markdown tables must be valid GitHub markdown. Inline math: write it in
Unicode/HTML-friendly form (× · ² ³ λ µ ≈, sub/superscripts as plain text or <sub>/<sup>), not LaTeX.
Do not use a single "~" immediately before and after a word (it reads as strikethrough); write
"~10 nm" style only.

## Accuracy discipline for rewrites
Facts and numbers that survived fact-checking (see course/review/NN-slug.md) must be preserved exactly
unless the audit flags them. Expanding an explanation must not introduce new unverified numbers; if you
need a number you are not sure of, write it as an order of magnitude and flag it with "~". Keep the
timeframe conventions ("as of 2025" flags for recent events).
