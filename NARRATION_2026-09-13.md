# Local read-aloud narration

The course uses [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), a downloadable speech model, to generate narration on this computer. This avoids a speech-service account or per-character API charge. Model and dependency installation require an internet connection; the local speech engine does not send lesson text to a speech service.

## Setup

With Node.js and `uv` installed, run from the project directory:

```bash
npm run narration:setup
npm start
```

The setup creates an isolated Python runtime, installs locked dependencies, and downloads the pinned official model and two voices. The normal course still works when narration has not been installed; the player reports that setup is needed. On this computer, setup is already complete.

Open a lesson and choose **Listen**. Heart is the default voice; Bella is also available. The first uncached passage takes time to prepare. Audio playback remains user initiated.

Local files live under `~/.cache/sand-to-gpu/`: `narration-venv` contains the runtime, `narration-model` contains the model, and `narration-audio` contains saved audio and word timings. `NARRATION_HOME` changes the base directory; `NARRATION_PYTHON` can select a compatible Python executable. Use the same cache setting for setup and serving.

## Reading experience

The player reads lesson prose in passages. It keeps the original page markup intact and highlights words using the audio's playback position and the model's token timings. Those timings come from the speech model; they are not a separate forced-alignment measurement and can be imperfect around unusual notation.

Following moves the page only when the spoken text leaves the comfortable reading area. Scrolling manually suspends following, so readers can inspect a diagram while listening. Playback speed changes reuse the audio rather than generating another recording.

Figures, interactive labs, tables, code blocks and reference lists are not flattened into speech. They are meant to be inspected alongside the explanation. The narrator is a companion to the visual course, not an audio description of every diagram or a substitute for a screen reader.

## Generate once, listen again

Audio and timing data are cached by the passage text, voice and engine version. Replaying an unchanged passage uses the saved recording. Changing the text or voice creates a different cache entry. Deleting the local cache requires generation again. The cache and model weights are local artifacts and are excluded from Git.

The course contains hundreds of thousands of words. Generating passages as needed avoids making readers wait for the entire course before listening. The player can prepare the next passage while the current one plays. It does not eagerly synthesize the whole course.

The initial implementation stores 24 kHz mono PCM16 WAV audio, about 2.9 MB per minute. Saved passages are not automatically evicted. A complete recording of this very large course could occupy several gigabytes; the cache can be removed manually when it is no longer wanted.

On this computer, a 193-character sample produced 13.2 seconds of audio in 5.542 seconds. The survey's opening paragraph produced 34.45 seconds of Heart audio in about 22.4 seconds, and 35.1 seconds of Bella audio in about 20.9 seconds. These are individual CPU measurements, not guaranteed throughput. Cold startup, competing workloads, faster playback and jumps to uncached passages can introduce waiting.

## Voice and pronunciation

Kokoro is a compact local model, not the operating system's default speech voice. Voice preference is subjective. Semiconductor abbreviations, chemical formulas, mathematical notation and unusual names can still be pronounced imperfectly; the written lesson remains available beside the audio. Exact word timing and voice quality must be assessed with actual playback, separately from automated player tests.

The model is published under Apache 2.0. Model, voice and runtime provenance are pinned in the setup code so future changes can invalidate the cache deliberately.

## Validation and practical limits

- Sixteen deterministic browser cases passed: source offsets across inline markup, timed highlights, pause/resume, speed and position changes, passage navigation, bounded lookahead, voice selection, manual following, delayed-request cleanup, same-chapter anchors, unavailable setup, error recovery, reduced motion, automatic passage progression and Escape/focus restoration.
- Compact and expanded players were checked in both themes at desktop width and at 375 × 667 pixels. The active word remained above the player. The compact phone player uses about 140 pixels of height; voice settings expand only when requested.
- Actual Kokoro synthesis produced both voice samples and model-timed words. Five real cache checks passed, covering reuse and regeneration after invalid metadata, damaged WAV audio or invalid offsets.
- The first six exact survey-opening passages were generated and saved in Heart. All six WAVs decoded in Chrome, with valid, monotonic source offsets and timings. Repeated requests reused the cache in 2–5 ms. A separate units/Unicode fixture checked offsets around “2 nm”, “SiO₂” and “300 mm”; this was an offset check, not an audible pronunciation assessment.
- The full existing course check passed, including all 352 figures and source, heading and quiz preservation contracts. No lesson content was edited for narration.
- The local backend validates requests, bounds the work queue, serves audio with byte-range support, and keeps model execution and file paths behind the loopback server. Speech assets and recordings are outside the repository.

Automated media clocks test player behavior; they do not establish how pleasant a voice sounds. Real samples are available for listening. The setup was exercised on this computer's Linux environment; other runtime platforms have not been validated here.

Run the player regression with the course server running:

```bash
node qa/narration.js
npm run check
```

The detailed player and real-audio evidence is recorded in `qa/reports/narration.json`. Model dependencies occupy approximately 1.3 GiB and the downloaded model assets approximately 314 MiB, separately from saved audio.
