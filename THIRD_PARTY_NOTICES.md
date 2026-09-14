# Third-party notices

Project licenses apply only to material the project can license. Dependencies, models, fonts, third-party quotations, and trademarks retain their own terms. This is a guide to the components used, not a complete license inventory for every transitive dependency or operating-system package.

## Website and development tools

| Component | Role | Upstream terms |
| --- | --- | --- |
| [Marked](https://github.com/markedjs/marked) | Converts authored Markdown during the build | [MIT and retained upstream notices](https://github.com/markedjs/marked/blob/master/LICENSE.md) |
| [Puppeteer](https://github.com/puppeteer/puppeteer) | Browser automation for QA and narration inventory | [Apache-2.0](https://github.com/puppeteer/puppeteer/blob/main/LICENSE) |
| Chrome / Chromium | Browser used by Puppeteer | Separate browser and bundled-component notices; not distributed in this repository |

Exact Node package versions and dependency relationships are in `package-lock.json`. Packages are installed by the contributor and are not vendored into Git. If redistributing the development runtime, preserve the licenses and notices shipped with its dependencies.

## Typography

The reader requests these fonts through Google Fonts. Font binaries are not committed or included in the generated static export.

| Font | Copyright attribution | License |
| --- | --- | --- |
| Bricolage Grotesque | The Bricolage Grotesque Project Authors | [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/bricolagegrotesque/OFL.txt) |
| Source Serif 4 | The Source Serif 4 Project Authors | [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/sourceserif4/OFL.txt) |
| JetBrains Mono | The JetBrains Mono Project Authors | [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/jetbrainsmono/OFL.txt) |

If self-hosting fonts, include their complete copyright and OFL notices with the redistributed font files.

## Optional narration

[Kokoro](https://github.com/hexgrad/kokoro) and the [Kokoro-82M model](https://huggingface.co/hexgrad/Kokoro-82M) are provided under Apache-2.0. The setup uses model revision `f3ff3571791e39611d31c381e3a41a3af07b4987`; `tools/narration/config.js` and the setup script record the identity and weight checksum. Heart (`af_heart`) is the recorded-course voice; Bella (`af_bella`) is another supported local voice. Recordings are synthetic speech, not a human narrator's performance.

Model weights and voice files are downloaded separately and remain outside this repository. The upstream model card includes training-data acknowledgments; refer to it for that provenance. A model license does not relicense the text read aloud or grant rights over unrelated third-party material in a recording.

The Python runtime includes additional components under their own terms, including Misaki, PyTorch, spaCy, and eSpeak NG. In particular, [eSpeak NG is GPL-licensed](https://github.com/espeak-ng/espeak-ng/blob/master/COPYING); do not describe the entire speech runtime as MIT or Apache-2.0. FFmpeg's terms depend on its build configuration. The project invokes a separately installed FFmpeg executable and does not distribute that executable. Preserve all applicable upstream notices and source obligations if separately packaging a model or runtime. Python package versions are recorded in `tools/narration/requirements*.lock`; those files are version inventories, not a redistribution license bundle.

## Educational sources and names

Lessons and review ledgers link to scientific publications, standards, manufacturer documentation, and other primary sources. Those links are citations, not a grant to redistribute the linked works. Any quotations or separately attributed material retain their original rights.

NVIDIA, TSMC, ASML, and other company or product names appear to identify technologies and supply-chain participants. Their trademarks remain with their respective owners. Sand to GPU is an independent educational project and does not claim affiliation or endorsement.

The project was developed with AI assistance and repeated reader-led revisions. See [development history](docs/DEVELOPMENT_HISTORY.md) for the process, retained review evidence, and its limits.
