# Global supplier coverage and framing review

The reader identified a real mismatch: the glossary's global supplier directory used unexplained “non-Chinese” rankings while omitting Chinese suppliers already described in the materials lessons. This pass addresses supplier selection, regional comparisons and the evidence used to describe capabilities across the deep and survey tracks.

## Editorial standard

Supplier examples are selected for their documented role in the supply chain. A list of examples is neither an exhaustive directory nor evidence that the listed companies have equal capabilities or market shares. Headquarters, ownership, manufacturing location and customer location are different facts. Semiconductor-grade and solar-grade materials, front-end and packaging equipment, and different process generations must remain distinct.

Technical mechanisms and demonstrated capabilities take precedence over nationality. Product announcements and vendor specifications are attributed as such; unpublished yields, costs or customer qualifications are not treated as established facts. Policy is explained through the jurisdiction, rule and affected transaction, without assuming the reader belongs to a particular political grouping.

## Corrections

- The overview, reference directory and survey summaries now name or more accurately describe Hoshine, Xinhua Semiconductor, NSIG, NAURA, AMEC, Piotech, Hwatsing, Anji, ACM Research, Kingstone, Skyverse, AccoTEST, Empyrean, SMIC, Hua Hong, CXMT, YMTC, JCET and Huawei/HiSilicon in their relevant roles. Existing suppliers from other regions remain covered. New examples are not presented as verified members of a specific NVIDIA product's bill of materials.
- Unsupported blanket explanations about copied technology, uniformly inferior yields, fixed development delays or inevitable losses were replaced with process mechanisms and evidence limits. A chip teardown establishes particular physical structures; it does not disclose factory-wide yield, node profitability or production volume.
- Three quiz questions now test material qualification, multi-patterning tradeoffs and qualified supply dependencies without unsupported national premises. Their answer indices and option counts are unchanged. Exact reviewed option corrections are recorded in `qa/quiz-contract-amendments.json`; other quiz options remain protected by the historical baseline.
- The policy timeline names jurisdictions rather than adopting an “allied” viewpoint. Billing address, shipment destination, ultimate use and demonstrated violations are distinguished. Relevant policy and supply-risk explanations remain in the course.
- The geographic widget's untraceable percentage bars became a qualitative supplier roster. Related wafer comparisons no longer conflate revenue share with 300 mm production capacity. Actual concentration and process differences are still explained where supported.
- Repeated caveats attached only to newly added Chinese entries were replaced with factual role descriptions and a shared standard of qualification. Grouped supplier/customer categories no longer imply unverified bilateral purchasing relationships.
- Screenshot review also found a phone timeline hit-target defect: overlapping markers could open the wrong policy event. Pointer selection now resolves the nearest marker, with actual selected-event assertions in the regression checks.

## Scope and evidence

This is a targeted review of supplier coverage and geographical framing across all 32 lessons in both tracks, including relevant diagrams and widgets. It is not a new independent verification of every scientific claim, historical event or market estimate in the course, nor a claim that any text can be certified free of all bias.

Detailed sources, before/after findings and limits are recorded in:

- [Foundations review](course/review/neutrality-foundations-2026-09-14.md)
- [Later lessons and reference review](course/review/neutrality-backhalf-2026-09-14.md)
- [Visual and widget review](course/review/neutrality-visuals-2026-09-14.md)

Independent peer review checked the changed roles and representative primary sources, caught inconsistent statistical denominators and ambiguous supplier/customer arrows, and confirmed that seven economics misconception topics were retained after correcting their claims.

## Validation and release

The rebuilt course passes source, lesson, heading, quiz and figure contracts: 32 lessons, 176 quiz questions and 352 section figures. Ten negative tests detect deliberately corrupted prose, headings, quiz answers and option arrays, including each of the three reviewed amendments. Eight browser cases cover the economics and reference tables at desktop and phone widths in both themes; table text remains readable and keyboard-scrollable, with no page errors or document overflow. See `qa/reports/global-coverage.json` and `qa/reports/language-build-contract-review.json`.

Four changed widgets passed all sixteen width/theme cases. Screenshot review covered the original scenario images and all sixteen base renders; the timeline fix passed 112 actual pointer selections, four hover checks and four keyboard checks. See `qa/reports/neutrality-widgets-2026-09-14.json` and `qa/reports/export-timeline-hit-2026-09-14.json`.

The new narration inventory has 6,739 passage placements and 6,556 unique clips. It reuses 6,457 clip identities, adds 99 and retires 88 from the active edition; original cached recordings remain available. All 99 new clips rendered successfully. Full coverage validated every MP3 and timing record and matched the reader text across all 32 lessons at two widths (64 comparisons). A newly added supplier paragraph passed native pointer-to-paragraph playback, actual audio clock advancement, synchronized highlights and byte-range delivery, with no speech API requests or browser errors, first in staging and then on the live local preview.

The completed audio totals approximately 56.76 hours and 1.639 GB. The source, original voice model and downloaded runtime remain separate from the static publishing bundle. See [the publishing guide](PRERENDER_2026-09-13.md), `qa/reports/narration-coverage.json` and `qa/reports/narration-neutrality-native-live.json` for release evidence. These checks establish consistency and playback behavior; they do not independently assess pronunciation of every term or recertify all course claims.
