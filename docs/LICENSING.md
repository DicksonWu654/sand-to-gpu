# Licensing

Adopted by the project owner on September 18, 2026. Sand to GPU has open-source software under MIT and open educational content under CC BY 4.0.

| Material | License | Scope |
| --- | --- | --- |
| Website code, build and QA tools, developer documentation | [MIT](../LICENSE) | Original JavaScript, Python, CSS, HTML templates, build configuration, and development guides |
| Lessons, quizzes, original educational illustrations and figure definitions | [CC BY 4.0](../LICENSE-CONTENT) | Original educational material in `course/`, the learning-map illustration, and its generated representations |
| Generated lesson bundles and diagrams | Component-specific | Educational content under CC BY 4.0; rendering code under MIT |
| Project-produced narration, including public GitHub Release MP3s | CC BY 4.0, to the extent the project holds rights | Recordings of the lessons; model, runtime, and voice assets retain upstream terms |

The educational-content license is an exception to the code license: MIT does not replace CC BY 4.0 for content bundled with the software. The package's `license: MIT` field describes the code package. `private: true` prevents accidental npm publication; it does not restrict the public repository or license grants.

MIT permits code reuse and modification while retaining the copyright and permission notice. CC BY 4.0 permits sharing and adaptation, including commercial use, with attribution, a license link, and an indication of changes. Complete terms are in the root license files; copies of the standard texts also remain in `docs/licenses/`.

## Attribution for educational material

> Based on *Sand to GPU*, by the Sand to GPU contributors. Source: https://github.com/DicksonWu654/sand-to-gpu. Licensed under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/. Changes: describe your changes here.

Preserve separately stated credits and source citations. Company names and trademarks do not imply endorsement and are not included in the grant. No ownership is claimed over scientific facts or public-domain material. AI assistance is documented in the [development history](DEVELOPMENT_HISTORY.md); the grants cover only rights the contributors hold.

## Third-party material and distribution

See [third-party notices](../THIRD_PARTY_NOTICES.md) for dependencies, typography, Kokoro, eSpeak NG, and source material. These project licenses do not replace upstream terms. Linked papers and manufacturer documents remain with their owners. The speech runtime is not covered by a blanket MIT license.

Include `LICENSE`, `LICENSE-CONTENT`, this scope notice, and `THIRD_PARTY_NOTICES.md` when distributing website bundles. No lesson edits or audio regeneration are required to apply these licenses to existing project-produced recordings.
