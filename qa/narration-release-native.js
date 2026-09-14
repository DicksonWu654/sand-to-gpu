// Release check using real browser audio and a passage absent from the previous edition.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { launch } = require('./browser');
const config = require('../tools/narration/config');

(async () => {
  const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8792';
  const inventory = JSON.parse(fs.readFileSync(path.join(config.home, 'narration-inventory.json')));
  const previousPath = process.env.NARRATION_PREVIOUS_INVENTORY || path.join(config.home, 'neutrality-2026-09-14/previous-edition/narration-inventory.json');
  const oldKeys = new Set(JSON.parse(fs.readFileSync(previousPath)).lessons.flatMap(l => l.passages.map(p => p.key)));
  const browser = await launch();
  const requests = [], errors = [];
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    page.on('request', request => requests.push(request.url()));
    page.on('pageerror', error => errors.push(error.message));
    await page.evaluateOnNewDocument(() => {
      const NativeAudio = window.Audio;
      window.__releaseAudio = [];
      window.Audio = class extends NativeAudio {
        constructor(...args) { super(...args); window.__releaseAudio.push(this); }
      };
    });
    let target;
    for (const lesson of inventory.lessons) {
      if (!lesson.passages.some(p => !oldKeys.has(p.key) && p.text.length > 200)) continue;
      await page.goto(base + '/' + lesson.key, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.narration-launch');
      const candidate = await page.evaluate(old => {
        const passages = CourseNarration.extract(document.querySelector('.prose'));
        return passages.findIndex((p, i) => p.element.tagName === 'P' && p.offset === 0 && old[i]);
      }, lesson.passages.map(p => !oldKeys.has(p.key) && p.text.length > 200));
      if (candidate >= 0) { target = { lesson: lesson.key, index: candidate, ...lesson.passages[candidate] }; break; }
    }
    assert(target, 'Expected a newly recorded paragraph in the inventory');
    await page.click('.narration-launch');
    await page.waitForFunction(() => document.querySelector('.narration-player')?.dataset.state === 'playing', { timeout: 30000 });
    await page.click('[data-action="play"]');
    await page.evaluate(index => {
      const passage = CourseNarration.extract(document.querySelector('.prose'))[index];
      passage.element.id = 'release-new-passage';
      document.getSelection().removeAllRanges();
      passage.element.scrollIntoView({ block: 'center', behavior: 'instant' });
    }, target.index);
    const point = await page.$eval('#release-new-passage', element => {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + 12, y: Math.max(rect.top + 12, 140) };
    });
    await page.mouse.click(point.x, point.y);
    await page.waitForFunction(key => {
      const audio = window.__releaseAudio.at(-1);
      return audio?.currentSrc.includes(key) && !audio.paused && audio.currentTime > .5 && document.querySelector('.narration-player')?.dataset.state === 'playing';
    }, { timeout: 30000 }, target.key);
    await page.waitForFunction(() => CSS.highlights?.get('narration-word')?.size > 0, { timeout: 10000 });
    const firstTime = await page.evaluate(() => window.__releaseAudio.at(-1).currentTime);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const state = await page.evaluate(() => {
      const audio = window.__releaseAudio.at(-1);
      return { currentTime: audio.currentTime, duration: audio.duration, paused: audio.paused, readyState: audio.readyState, currentSrc: audio.currentSrc,
        position: document.querySelector('.narration-position').textContent, highlightedText: document.querySelector('.narration-current-passage')?.textContent,
        wordHighlights: CSS.highlights?.get('narration-word')?.size || 0, staticMarker: !!document.querySelector('meta[name="narration-mode"][content="static"]') };
    });
    assert(state.currentTime > firstTime + .5, 'Native playback clock must advance');
    assert(state.readyState >= 2 && !state.paused && state.staticMarker);
    assert(state.highlightedText.includes(target.text));
    assert.equal(Number(state.position.split('/')[0]), target.index + 1);
    const range = await fetch(state.currentSrc, { headers: { Range: 'bytes=0-1023' } });
    assert.equal(range.status, 206); assert.equal(range.headers.get('content-type'), 'audio/mpeg');
    assert.equal((await range.arrayBuffer()).byteLength, 1024);
    const apiRequests = requests.filter(url => new URL(url).pathname.startsWith('/api/'));
    assert.equal(apiRequests.length, 0); assert.deepEqual(errors, []);
    const result = { status: 'passed', timestamp: new Date().toISOString(), baseUrl: base, sourceHash: inventory.sourceHash,
      lesson: target.lesson, passageIndex: target.index, newRecordingKey: target.key, text: target.text,
      nativeAudio: state, nativeTimeAdvancedSeconds: state.currentTime - firstTime, rangeStatus: range.status,
      apiRequests, pageErrors: errors, limitations: ['Verifies real decoding, playback, passage selection and word highlighting; not a subjective pronunciation assessment.'] };
    const report = process.env.QA_REPORT || path.join(__dirname, 'reports/narration-neutrality-native.json');
    fs.writeFileSync(report, JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
