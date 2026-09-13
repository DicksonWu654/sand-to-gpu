# Survey Track Guide: "Sand to GPU in an Afternoon"

The survey is a second, shorter track through the same course: ten chapters, about 2,000–3,000
words each, that a reader can finish in an afternoon and come away with a correct, connected mental
model of the whole supply chain. It is a map, not a substitute for the deep modules; every chapter
ends by pointing into them.

## The reader
Same person as course/TEACHING_GUIDE.md (programmer, school physics and chemistry, no chip
background), but this time they have three hours, not thirty. They want the shape of everything:
what each stage does, why it is hard, the two or three numbers that matter, who does it, and how it
connects to the stage before and after. They do not want recipes yet.

## Rules
1. Every fact and number must come from the deep modules (course/modules/) after the relevant corrections in this iteration. Review coverage is recorded in
   `course/review/`; do not assume that every claim has been verified twice. Do not introduce numbers
   that are not in a deep module. Quote the
   same values the deep modules use so the two tracks never disagree.
2. Plain language first. Define every term at first use, in one clause. Use analogies. One idea per
   paragraph. Short sections with descriptive headings.
3. Each chapter has: a one-paragraph opener stating what this stage turns into what; a "The gist"
   box of 5–8 bullets (the chapter in a nutshell); 4–7 short sections; one "By the numbers" mini-table
   (5–8 rows); "The people and companies" (one short paragraph); "Why it is hard" (one paragraph);
   "Go deeper" (bullets naming the deep modules and the specific sections to read next, with links as
   `[Module 08: EUV](#/m/08)`).
4. No recipes, no equations beyond one memorable one per chapter if it truly helps (Rayleigh, yield
   vs area), no lists of tool model numbers. Names of the two or three dominant companies are fine.
5. Length 2,000–3,000 words. Valid GitHub markdown. No em-dashes in headings. Inline math in Unicode.
6. Each chapter names one diagram it wants (as `<div class="widget" data-widget="ID"></div>` on its own
   line where the diagram belongs), chosen from the survey diagram list in the assignment.

## Chapters
- S01 The big picture: what a chip is and why building one is the hardest thing we manufacture
  (draws on modules 00, 20, 21)
- S02 From sand to a mirror: quartz, polysilicon, crystal, wafer (01, 02, 03, 04)
- S03 Inside the fab: cleanrooms, wafers in boxes, a thousand steps (05)
- S04 Drawing with light: lithography, from lenses to EUV (07, 08)
- S05 Adding and removing layers: deposition, etch, doping (06, 09, 10)
- S06 The transistor and its wiring: from planar to nanosheets, and 15 layers of copper (11, 12)
- S07 Knowing it works: measuring, inspecting, yield and test (13, 14, 18)
- S08 Memory: DRAM, NAND and why HBM sits next to the GPU (15)
- S09 Packaging: from a bare die to a CoWoS GPU (16, 17)
- S10 Becoming a GPU: design, manufacture, the rack, and the industry around it (19, 20)

Files: course/survey/S01-slug.md ... S10-slug.md. Title line: `# Survey 1: Title`.
