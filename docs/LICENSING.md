# Licensing proposal

**Status: prepared for owner review; not yet adopted.** The repository remains private. The license texts in `docs/licenses/` are proposed release materials, not a current grant of rights in this project. Public visibility alone would not make this an open-source release; adopt the selected licenses before launch.

## Recommended split

| Material | Proposed license | Scope |
| --- | --- | --- |
| Website code, build and QA tools, developer documentation | [MIT](licenses/MIT.txt) | Original JavaScript, Python, CSS, HTML templates, build configuration, and development guides |
| Lessons, quizzes, original educational illustrations and figure definitions | [Creative Commons Attribution 4.0 International](licenses/CC-BY-4.0.txt) | Original educational material in `course/`, the learning-map illustration, and its generated representations |
| Generated lesson bundles and diagrams | Follow the component's license | Course prose and illustration content under CC BY 4.0; rendering code under MIT |
| Project-produced narration | CC BY 4.0, to the extent the project holds rights | Recordings of the licensed lessons; the model, runtime, and voice assets retain upstream terms |

MIT allows code reuse and modification while retaining the copyright and permission notice. CC BY 4.0 permits sharing and adaptation, including commercial use, with attribution, a license link, and an indication of changes. Consult the [official MIT text](https://opensource.org/license/mit) and [CC BY 4.0 deed and legal code](https://creativecommons.org/licenses/by/4.0/) for the terms.

This split makes it straightforward to reuse the software and teach from the lessons. It does not claim ownership of scientific facts, public-domain material, or material the project cannot license. AI assistance is documented in the [development history](DEVELOPMENT_HISTORY.md); the proposal grants only whatever rights the contributors hold.

## Proposed attribution

For reused or adapted educational material:

> Based on *Sand to GPU*, by the Sand to GPU contributors. Source: https://github.com/DicksonWu654/sand-to-gpu. Licensed under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/. Changes: describe your changes here.

This attribution becomes applicable only if the content license is adopted. Preserve separately stated credits and source citations. Company names and trademarks do not imply endorsement and are not included in the grant.

## Finalizing the release

Once the owner chooses the licenses, put the approved code license at root `LICENSE`, put the content notice and complete approved text at root `LICENSE-CONTENT`, and replace this proposal with the definitive scope. Set the package's `license` metadata to `MIT` for the code package, with the content exception documented here. Include both license files and the third-party notices in future downloadable website bundles.

The root license files and package license field are intentionally absent while the choice is pending. No default license has silently been applied. A different selection can be adopted without modifying the lessons or re-rendering audio.

## Upstream material

See [third-party notices](../THIRD_PARTY_NOTICES.md) for dependencies, typography, Kokoro, eSpeak NG, and source material. Neither proposal replaces their terms. Linked papers and manufacturer documents remain with their owners, and the dependency runtime is not covered by a blanket project license.
