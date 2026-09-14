# Pre-rendered course audio

The publishing edition uses saved Heart recordings for every passage narrated by the player across all 32 lessons. It contains ordinary website files, MP3 audio and word-timing manifests. A visitor does not download Kokoro or run inference. No speech API or Python process is needed on the hosting service.

**Current edition, September 14:** all 6,556 unique MP3 clips and 6,739 passage placements passed the final audit. The recordings total approximately 56.76 hours and 1.639 GB of MP3 audio. The supplier and geography revisions required 99 new recordings; 6,457 unchanged recordings were reused. Generation/cache assembly took 101 seconds and MP3 export took 39 seconds, with zero failures.

The verified archive on this computer is `C:\Users\dicks\Downloads\sand-to-gpu-static-2026-09-13.zip` (1,651,026,562 bytes; 6,650 files). Its CRC, source snapshot and SHA-256 checks passed; see `qa/reports/narration-package.json` for the checksum. The preview on port 8790 now serves the completed static edition, with the local speech API disabled.

Archive SHA-256: `b4337a976171830c1156a154548d0613e012e25aabc778335db24e2178cba30d`.

With Listen open, clicking a paragraph starts playback from that paragraph. **Read from here** starts at the passage currently on screen. The publishing edition includes these controls. Their earlier refresh reused all existing recordings; the September 14 content revision regenerated changed passages. Eight paragraph interaction cases and eleven static-player cases passed. Native browser playback also verified a real pointer click from paused narration: it selected the correct MP3, restarted near the beginning, highlighted the expected text, and made no speech API requests. See `qa/reports/narration-paragraph.json` and `qa/reports/narration-static.json`.

The inventory is captured from the same rendered DOM and extraction function as the Listen button. It contains 6,739 passage occurrences and 6,556 unique clips, totaling 478,493 written words. Identical passages share a recording. As in the interactive player, diagrams, tables, code and reference lists are left for visual reading; this is complete coverage of the narrated passages, not an audio description of every visual.

## Build and storage

Default local paths, outside Git:

- `~/.cache/sand-to-gpu/narration-inventory.json`: exact text, identities and source fingerprints.
- `~/.cache/sand-to-gpu/narration-audio/`: original WAV recordings and timings, reused by the local player and later exports.
- `~/.cache/sand-to-gpu/prerender/progress.json`: resumable generation status and failures.
- `~/.cache/sand-to-gpu/prerender/export-progress.json`: compression and packaging status.
- `~/.cache/sand-to-gpu/static-export/`: the complete publishing folder after both jobs finish.

The export directory is a staging area. Do not serve or publish it while either job is running. A completed release should be uploaded as a unit or to a new versioned directory; file-by-file local builds do not provide an atomic deployment over an existing public release. Check both progress files for `status: "complete"` before publishing.

The source code and reproducible scripts are in Git. The many audio files, downloaded models and Python environments are intentionally outside Git. A GitHub source checkout alone does not contain the audio publishing edition.

## Publication and playback

Upload the **contents of the completed export folder**, keeping its directories together. It includes the `narration/` directory and a static-mode marker in `index.html`. The player loads the small narration index, then the selected lesson's manifest, and fetches audio as needed. It prepares at most the next two passages rather than downloading the whole course at once. Asset URLs work at the website root or under a subdirectory.

The static-mode marker prevents a missing audio folder from silently switching to a local generation API. Missing recordings, incomplete manifests and recordings for an older text edition produce actionable errors. Exact passage text is checked before playback, and timing ranges are validated against each recording's duration.

The initial publishing edition includes Heart. Changing playback speed does not create new recordings. Bella remains a local on-demand option in the development site; publishing a complete second voice would require another full recording set.

## Resume and update

Keep the same model, voice and text identity when resuming a batch. Existing valid clips and compressed files are reused. The batch records individual failures and withholds a finished edition until they are resolved. Long numeric explanations that exceed the upstream speech chunk limit are split into smaller token groups while retaining their original text offsets.

After changing lesson text, rebuild the course, recapture the inventory and rerun generation/export. Only new or changed passage identities require speech generation. The published manifest is rebuilt to match the entire current lesson rather than retaining stale paragraph positions.

## Runtime and format

The generation job uses the computer's RTX 5070 with a separate CUDA runtime. Two workers with two CPU threads each benchmarked at approximately 64.65 seconds of audio per second of wall time. This is a local benchmark, not a throughput guarantee. The ordinary CPU narrator was kept separate.

The export uses mono 64 kbps MP3 with gapless metadata; original 24 kHz mono PCM WAV files remain in the local cache. A representative MP3 decoded to exactly the same frame count and duration as its source WAV, with zero measured sample lag, at approximately one sixth the file size. Word timings remain tied to decoded audio time, including playback-speed changes. Automated alignment checks do not establish subjective voice quality or guarantee pronunciation of every technical expression.

## Reproduce the export

With the local course server running and the model installed, capture a current inventory:

```bash
npm run narration:inventory
```

On this computer, the optional GPU setup and batch commands are:

```bash
npm run narration:setup-gpu
export NARRATION_PYTHON="$HOME/.cache/sand-to-gpu/narration-gpu-py312/bin/python"
export NARRATION_DEVICE=cuda
export NARRATION_THREADS=2
npm run narration:prerender -- --workers 2
```

Without CUDA, the ordinary installed runtime can run `npm run narration:prerender -- --workers 1`; this will take substantially longer. The scripts reuse valid cached clips on a retry. If individual passages failed, resolve the recorded cause and repeat the same batch command before final export.

Then package the compressed publishing edition:

```bash
export NARRATION_FFMPEG="$("$NARRATION_PYTHON" -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')"
npm run narration:export
node qa/narration-coverage.js
```

For an update to an existing edition, run generation to completion before starting export: copied old manifests and old progress records must not be mistaken for the new completed edition. If the speech job stops for repair, repeat generation and export; already completed speech and verified MP3 files are reused. Keep the local preview available during export because the finalizer verifies the current reader's extraction function against the recorded inventory.

To preview the completed folder without any speech service:

```bash
SITE_ROOT="$HOME/.cache/sand-to-gpu/static-export" NARRATION_STATIC_ONLY=1 PORT=8792 npm start
```

This serves the static edition at `http://127.0.0.1:8792`. To publish it elsewhere, upload the export folder to your chosen static host; these commands do not deploy or publish the website.

After coverage passes, create a ready-to-upload archive outside the repository:

```bash
python3 tools/narration/package-export.py --output /path/to/a/new/sand-to-gpu-static.zip
```

The archive contains the website at its root. The packager checks completion and references, rejects symlinks and unintended artifacts, stores already-compressed MP3 files efficiently, verifies the ZIP, and refuses to overwrite an existing archive.

## Validation scope

The existing 16 player tests and 11 static-playback cases passed. The static cases cover root and subdirectory hosting without generation API calls, incomplete/stale/missing recordings, malformed metadata, and cancellation. The inventory matches the exact live reader output in all 32 lessons at both desktop and phone widths (64 comparisons). The long worked-example repair retained original token identities and produced valid audio and timings without changing its text or cache identity.

The full coverage audit checks every unique MP3's hash, complete frame stream and gapless duration, every passage's word timing bounds and exact source offsets, all chapter references and source fingerprints. These checks establish technical consistency and completeness. They do not grade the pronunciation of every technical term or the subjective pleasantness of the voice.

Final evidence is saved in `qa/reports/narration-prerender.json`, `narration-coverage.json` and `narration-export.json`. Every clip passed, all 64 desktop/phone lesson comparisons matched, and the actual static-server player passed native MP3 playback, pause, seek, word highlighting, resume and close, with zero narration API calls. The server returned the correct MP3 MIME type, an empty HEAD response and working byte ranges.

## September 14 content and audio release

The supplier/geography audit changed narration identities in 31 lessons. The reader extraction function is unchanged. This release adds 99 new clip identities and retires 88 from the publishing bundle; the original WAV cache is retained for reuse. The previous completed publishing folder is preserved locally at `~/.cache/sand-to-gpu/static-export-before-neutrality-2026-09-14/`.

Generation and compression ran in a separate staging directory while port 8790 continued serving the previous edition. All 6,556 MP3 hashes, complete frame streams, decoded durations, timing bounds and source offsets passed. All 32 lessons matched the live reader at desktop and phone widths, for 64 comparisons. After promotion, the full audit passed again against port 8790.

A native browser check selected the newly recorded S01 supplier-role paragraph with a real pointer click. Its correct 40.975-second MP3 played, the playback clock advanced, the passage and spoken word highlighted, and a byte-range request returned HTTP 206 with the correct audio MIME type. No speech API requests or page errors occurred, on either staging or the promoted preview. This verifies technical playback and mapping, not a subjective pronunciation review.

Current evidence: `qa/reports/narration-neutrality-release.json`, `narration-coverage.json`, `narration-neutrality-native.json`, `narration-neutrality-native-live.json`, and `narration-package.json`. The earlier `narration-prerender.json` and `narration-export.json` retain the initial full-render and player-transport history.

## Whole-page Markdown copying

The publishing bundle includes **Copy page for AI** beside the chapter reading controls. It copies the complete current chapter as Markdown in one click, including headings, prose, equations, tables and source links. No text selection, question form, account or popup is required. **Download Markdown** saves the same text as a `.md` file. If clipboard methods are blocked, the page shows the full selectable text and a download option instead of reporting success.

The generated Markdown data lives in the separate `ai-content.js` asset. The course text, narration extraction fingerprint, all 33 narration manifests and all 6,556 recordings remain unchanged. No audio was regenerated. Direct copying leaves playback running; opening the manual-copy dialog pauses narration and closing it leaves it paused.

The export preserves all 32 authored chapters without arbitrary truncation. Interactive widget placeholders are identified as visual omissions; no visual behavior or image understanding is invented. Eleven browser cases cover actual Clipboard API write/read, real `execCommand` fallback for unavailable and rejected modern clipboard calls, exact file downloads, blocked-copy recovery, navigation, native recorded-audio playback, and both themes at desktop/phone sizes. `qa/reports/page-markdown.json` records independent source-fidelity checks across all 32 lessons; `qa/reports/page-copy.json` records the browser checks. After the live preview was refreshed, `qa/reports/page-copy-live.json` confirmed exact real-clipboard copies of S01 (19,402 characters) and the largest chapter, M21 (201,439 characters), plus both legacy-copy fallback paths. These tests use disposable Chromium contexts and do not establish identical permissions in every embedded browser.
