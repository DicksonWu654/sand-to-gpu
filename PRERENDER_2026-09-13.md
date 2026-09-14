# Pre-rendered course audio

The publishing edition uses saved Heart recordings for every passage narrated by the player across all 32 lessons. It contains ordinary website files, MP3 audio and word-timing manifests. A visitor does not download Kokoro or run inference. No speech API or Python process is needed on the hosting service.

**Completed:** all 6,545 unique MP3 clips and 6,728 passage placements passed the final audit. The recordings total approximately 56.66 hours and 1.637 GB of MP3 audio. The initial GPU pass took 44 minutes 34 seconds; the final repair/cache pass took 25 seconds. Both generation and export report complete with zero remaining failures.

The verified archive on this computer is `C:\Users\dicks\Downloads\sand-to-gpu-static-2026-09-13.zip` (1,647,038,564 bytes; 6,636 files). Its CRC, source snapshot and SHA-256 checks passed; see `qa/reports/narration-package.json` for the checksum. The preview on port 8790 now serves the completed static edition, with the local speech API disabled.

The inventory is captured from the same rendered DOM and extraction function as the Listen button. It contains 6,728 passage occurrences and 6,545 unique clips, approximately 478,000 written words. Identical passages share a recording. As in the interactive player, diagrams, tables, code and reference lists are left for visual reading; this is complete coverage of the narrated passages, not an audio description of every visual.

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

The exporter can also run in a separate terminal while speech is being generated. If the speech job stops for repair, repeat generation and export; already completed speech and verified MP3 files are reused. Keep the local preview available during export because the finalizer verifies the current reader's extraction function against the recorded inventory.

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
