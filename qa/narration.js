// Narration integration QA. Media events are deterministic; this does not grade voice quality.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { launch } = require('./browser');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:8790';
const reportPath = path.join(__dirname, 'reports/narration.json');

function installMediaClock() {
  const states = new WeakMap();
  const instances = [];
  function state(el) {
    if (!states.has(el)) {
      states.set(el, { time: 0, paused: true, duration: 120, src: '', ended: false });
      instances.push(el);
    }
    return states.get(el);
  }
  const proto = HTMLMediaElement.prototype;
  for (const [key, get] of Object.entries({ paused: s => s.paused, duration: s => window.__qaApi?.manifests[s.src]?.duration || s.duration, ended: s => s.ended, readyState: s => s.src ? 4 : 0, currentSrc: s => s.src })) {
    Object.defineProperty(proto, key, { configurable: true, get() { return get(state(this)); } });
  }
  Object.defineProperty(proto, 'src', {
    configurable: true,
    get() { return state(this).src; },
    set(value) {
      const s = state(this); s.src = String(value); s.time = 0; s.ended = false;
      queueMicrotask(() => { this.dispatchEvent(new Event('loadedmetadata')); this.dispatchEvent(new Event('canplay')); });
    },
  });
  Object.defineProperty(proto, 'currentTime', {
    configurable: true, get() { return state(this).time; },
    set(value) {
      state(this).time = Number(value);
      this.dispatchEvent(new Event('seeking'));
      this.dispatchEvent(new Event('timeupdate'));
      this.dispatchEvent(new Event('seeked'));
    },
  });
  proto.load = function () {
    state(this);
    queueMicrotask(() => { this.dispatchEvent(new Event('loadedmetadata')); this.dispatchEvent(new Event('canplay')); });
  };
  proto.play = function () {
    if (window.__qaMedia.rejectNextPlay) { window.__qaMedia.rejectNextPlay = false; return Promise.reject(new DOMException('Autoplay denied by QA fixture', 'NotAllowedError')); }
    state(this).paused = false; state(this).ended = false;
    this.dispatchEvent(new Event('play')); this.dispatchEvent(new Event('playing'));
    return Promise.resolve();
  };
  proto.pause = function () { state(this).paused = true; this.dispatchEvent(new Event('pause')); };
  window.__qaMedia = {
    instances, rejectNextPlay: false,
    tick(seconds, el = instances.at(-1)) {
      if (!el) throw new Error('No media instance');
      const s = state(el); s.time = seconds; el.dispatchEvent(new Event('timeupdate'));
    },
    finish(el = instances.at(-1)) {
      if (!el) throw new Error('No media instance');
      const s = state(el); s.time = s.duration; s.ended = true; s.paused = true;
      el.dispatchEvent(new Event('timeupdate')); el.dispatchEvent(new Event('ended'));
    },
    snapshot() { return instances.map(el => ({ ...state(el), rate: el.playbackRate })); },
  };
}

// Public UI/API integration cases are added once implementation contracts are frozen.
module.exports = { installMediaClock };

function installApiMock() {
  const nativeFetch = window.fetch.bind(window);
  const api = window.__qaApi = { calls: [], delayed: [], delayNext: false, ignoreAbort: false, failNext: false, ready: true, cache: new Set(), manifests: {}, statusCalls: 0 };
  window.fetch = (url, options = {}) => {
    const pathname = new URL(typeof url === 'string' ? url : url.url, location.href).pathname;
    // Keep local-generation cases isolated even when a recorded bundle is present.
    if (pathname.endsWith('/narration/index.json')) return Promise.resolve(new Response('', { status: 404 }));
    if (pathname === '/api/narration/status') {
      api.statusCalls++;
      return Promise.resolve(new Response(JSON.stringify({ ready: api.ready, state: api.ready ? 'ready' : 'not-installed', message: api.ready ? 'Ready' : 'Install the local voice to listen.', voices: [{ id: 'af_heart', name: 'Heart · warm American voice' }, { id: 'af_bella', name: 'Bella · clear American voice' }] }), { status: 200 }));
    }
    if (pathname !== '/api/narration/render') return nativeFetch(url, options);
    const input = JSON.parse(options.body), call = { ...input, aborted: false };
    api.calls.push(call);
    const words = [...input.text.matchAll(/\S+/g)].map((m, i) => ({ start: i * .5, end: i * .5 + .45, textOffset: m.index, length: m[0].length }));
    const cacheKey = input.voice + '\n' + input.text;
    const data = { audioUrl: '/api/narration/audio/' + String(api.calls.length).padStart(64, '0') + '.wav', words, duration: words.length * .5 + .5, cached: api.cache.has(cacheKey), voice: input.voice, timing: 'qa-fixture' };
    api.cache.add(cacheKey); api.manifests[data.audioUrl] = data;
    const fail = api.failNext; api.failNext = false;
    const delay = api.delayNext; api.delayNext = false;
    const ignoreAbort = api.ignoreAbort;
    return new Promise((resolve, reject) => {
      const finish = () => resolve(new Response(JSON.stringify(fail ? { error: 'Local test render failed.' } : data), { status: fail ? 503 : 200 }));
      if (options.signal) options.signal.addEventListener('abort', () => { call.aborted = true; if (!ignoreAbort) reject(new DOMException('Aborted', 'AbortError')); }, { once: true });
      if (delay) api.delayed.push(finish); else queueMicrotask(finish);
    });
  };
}

const fixture = `<article class="article"><div id="qa-toolbar" class="chapter-tools"></div><div class="prose" id="qa-prose">
<p id="inline">Silicon is <strong>not</strong> sand. A <a href="#fixture-anchor">2 nm</a> gate uses SiO<sub>2</sub> &amp; copper. <span hidden>hidden words</span><span style="display:none">invisible words</span></p>
<h2 id="fixture-anchor">From ingredients to a crystal</h2>
<p id="long">${'A crystal grows when silicon joins the ordered surface. '.repeat(40)}</p>
<blockquote><p>A seed sets the arrangement.</p></blockquote><ul><li>First list item.</li><li>Second list item.</li></ul>
<div class="section-figure"><p>Figure controls excluded.</p></div><div class="widget"><p>Widget controls excluded.</p></div><table><tbody><tr><td><p>Table excluded.</p></td></tr></tbody></table><p aria-hidden="true">ARIA hidden excluded.</p><p style="visibility:hidden">Invisible paragraph excluded.</p>
<p id="last">The last short passage.</p></div></article>`;

async function run() {
  const browser = await launch();
  const results = [], errors = [], screenshots = [];
  const test = async (name, fn) => { try { const detail = await fn(); results.push({ name, status: 'passed', detail: detail || null }); } catch (error) { results.push({ name, status: 'failed', error: error.message }); } };
  async function fresh({ width = 1280, height = 1000, theme = 'light', route = '#/home', reduced = false } = {}) {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]);
    await page.evaluateOnNewDocument(t => localStorage.setItem('s2g:theme', JSON.stringify(t)), theme);
    await page.evaluateOnNewDocument(installMediaClock);
    await page.evaluateOnNewDocument(installApiMock);
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/' + route, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => !!window.CourseNarration);
    return page;
  }
  async function mountFixture(page) {
    await page.evaluate(html => {
      document.querySelector('#main').innerHTML = html;
      window.__qaCleanup = CourseNarration.mount({ prose: document.querySelector('#qa-prose'), toolbar: document.querySelector('#qa-toolbar'), title: 'Narration QA: inline meaning and a long paragraph', lessonKey: 'qa-fixture' });
    }, fixture);
  }
  async function playing(page) { await page.waitForFunction(() => document.querySelector('.narration-player')?.dataset.state === 'playing', { timeout: 10000 }); }
  async function open(page) { await page.click('.narration-launch'); await playing(page); }
  async function settings(page) { const toggle = await page.$('[data-action="settings"]'); if (toggle && (await toggle.evaluate(e => e.getAttribute('aria-expanded'))) !== 'true') await page.click('[data-action="settings"]'); else { const details = await page.$('.narration-options'); if (details && !(await details.evaluate(e => e.open))) await page.click('.narration-options > summary'); } }
  const action = name => `.narration-player [data-action="${name}"]`;
  async function highlight(page) { return page.evaluate(() => [...(CSS.highlights.get('narration-word') || [])].map(r => r.toString()).join('')); }
  try {
    const page = await fresh(); await mountFixture(page);
    await test('DOM extraction preserves inline text and exact UTF-16 ranges', async () => {
      const data = await page.evaluate(() => {
        const passages = CourseNarration.extract(document.querySelector('#qa-prose'));
        const first = passages[0], at = first.text.indexOf('SiO2');
        const split = passages.find(p => p.element.id === 'long' && p.offset > 0);
        return { first: first.text, crossed: CourseNarration.rangeFor(first, at, 4)?.toString(), split: split && CourseNarration.rangeFor(split, 0, split.text.length)?.toString() === split.text, all: passages.map(p => p.text), unchanged: document.querySelector('#inline strong').textContent === 'not' && document.querySelector('#inline sub').textContent === '2' };
      });
      assert.equal(data.first, 'Silicon is not sand. A 2 nm gate uses SiO2 & copper.');
      assert.equal(data.crossed, 'SiO2'); assert.equal(data.split, true); assert.equal(data.unchanged, true);
      assert(!data.all.some(t => /excluded|invisible words|hidden words/.test(t)));
      return { passages: data.all.length, crossNodeWord: data.crossed };
    });
    await test('Play highlights model-timed word across markup', async () => {
      await open(page);
      const index = await page.evaluate(() => __qaApi.calls[0].text.split(/\s+/).indexOf('SiO2'));
      await page.evaluate(i => __qaMedia.tick(i * .5 + .1), index);
      await page.waitForFunction(() => [...(CSS.highlights.get('narration-word') || [])].some(r => r.toString() === 'SiO2'));
      assert.equal(await highlight(page), 'SiO2');
      assert.equal(await page.$eval('.narration-launch', e => e.getAttribute('aria-expanded')), 'true');
    });
    await test('Pause/resume preserves position and playback rate avoids regeneration', async () => {
      await page.click(action('play'));
      assert.equal(await page.$eval('.narration-player', e => e.dataset.state), 'paused');
      const before = await page.evaluate(() => ({ time: __qaMedia.snapshot().at(-1).time, calls: __qaApi.calls.length }));
      await settings(page); await page.select('.narration-rate', '1.5'); await page.click(action('play')); await playing(page);
      const after = await page.evaluate(() => ({ ...__qaMedia.snapshot().at(-1), calls: __qaApi.calls.length }));
      assert.equal(after.time, before.time); assert.equal(after.rate, 1.5); assert.equal(after.calls, before.calls);
    });
    await test('Time seek updates position and word selection', async () => {
      assert(await page.$('.narration-seek'), 'Time seek control missing');
      await page.$eval('.narration-seek', e => { e.value = '1.1'; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); });
      await page.waitForFunction(() => [...(CSS.highlights.get('narration-word') || [])].some(r => r.toString() === 'not'));
      assert.equal(await highlight(page), 'not');
    });
    await test('Passage next/back, cached reuse and voice selection', async () => {
      await page.click(action('next')); await playing(page);
      assert.match(await page.$eval('.narration-position', e => e.textContent), /^2\s*\//);
      await page.click(action('previous')); await playing(page);
      assert.match(await page.$eval('.narration-position', e => e.textContent), /^1\s*\//);
      const firstCount = await page.evaluate(() => __qaApi.calls.filter(c => c.text.startsWith('Silicon is')).length);
      assert.equal(firstCount, 1, 'Revisited passage should reuse its audio');
      await settings(page); await page.select('.narration-voice', 'af_bella'); await playing(page);
      assert(await page.evaluate(() => __qaApi.calls.some(c => c.voice === 'af_bella' && c.text.startsWith('Silicon is'))));
    });
    await test('Manual scrolling suspends following; explicit follow restores it', async () => {
      await page.mouse.move(900, 200); await page.mouse.wheel({ deltaY: 300 });
      await page.waitForFunction(() => document.querySelector('[data-action="follow"]').getAttribute('aria-pressed') === 'false');
      await page.click(action('follow'));
      assert.equal(await page.$eval(action('follow'), e => e.getAttribute('aria-pressed')), 'true');
    });
    await test('Close stops media and clears highlights; cleanup removes player', async () => {
      await page.click(action('close'));
      assert.equal(await page.$eval('.narration-player', e => e.hidden), true);
      assert.equal(await highlight(page), '');
      assert(await page.evaluate(() => __qaMedia.snapshot().every(s => s.paused)));
      await page.evaluate(() => __qaCleanup());
      assert.equal(await page.$('.narration-player'), null);
    });
    await page.close();

    await test('Delayed render cannot restart after route cleanup, even if abort is ignored', async () => {
      const p = await fresh({ route: '#/s/01' });
      await p.evaluate(() => { __qaApi.delayNext = true; __qaApi.ignoreAbort = true; });
      await p.click('.narration-launch');
      await p.waitForFunction(() => __qaApi.delayed.length === 1);
      await p.evaluate(() => { location.hash = '#/m/01'; });
      await p.waitForFunction(() => document.querySelector('h1.title')?.textContent.includes('Sand to Polysilicon'));
      await p.evaluate(() => { __qaApi.delayed.shift()(); });
      await new Promise(r => setTimeout(r, 100));
      assert(await p.evaluate(() => __qaMedia.snapshot().every(s => s.paused)));
      assert.equal(await highlight(p), '');
      assert.equal(await p.$eval('.narration-player', e => e.hidden), true);
      await p.close();
    });
    await test('Same-chapter anchor preserves playback and suspends automatic following', async () => {
      const p = await fresh({ route: '#/s/01' }); await open(p);
      const before = await p.evaluate(() => __qaMedia.instances.length);
      const href = await p.$eval('#rail a.d2', e => e.getAttribute('href'));
      await p.evaluate(h => { const a = document.querySelector(`#rail a[href="${h}"]`); a.click(); }, href);
      assert.equal(await p.$eval('.narration-player', e => e.dataset.state), 'playing');
      assert.equal(await p.evaluate(() => __qaMedia.instances.length), before);
      assert.equal(await p.$eval(action('follow'), e => e.getAttribute('aria-pressed')), 'false');
      const count = await p.evaluate(() => __qaApi.calls.length);
      await p.evaluate(() => { window.__oldAudio = __qaMedia.instances.at(-1); location.hash = '#/home'; });
      await p.waitForSelector('.home-hero');
      await p.evaluate(() => __oldAudio.dispatchEvent(new Event('ended')));
      assert.equal(await p.evaluate(() => __qaApi.calls.length), count);
      assert.equal(await p.$('.narration-player'), null);
      await p.close();
    });
    await test('Render failure and unavailable local setup remain actionable', async () => {
      const p = await fresh(); await mountFixture(p);
      await p.evaluate(() => { __qaApi.failNext = true; }); await p.click('.narration-launch');
      await p.waitForFunction(() => document.querySelector('.narration-player')?.dataset.state === 'error');
      assert.match(await p.$eval('.narration-status', e => e.textContent), /failed/);
      await p.click(action('play')); await playing(p);
      await p.evaluate(() => __qaCleanup()); await mountFixture(p);
      await p.evaluate(() => { __qaApi.ready = false; }); await p.click('.narration-launch');
      await p.waitForFunction(() => document.querySelector('.narration-player')?.dataset.state === 'error');
      assert.match(await p.$eval('.narration-status', e => e.textContent), /Install/);
      await p.close();
    });
    await test('Pause during generation, end progression and keyboard close', async () => {
      const p = await fresh(); await mountFixture(p);
      await p.evaluate(() => { __qaApi.delayNext = true; });
      await p.click('.narration-launch'); await p.waitForFunction(() => __qaApi.delayed.length === 1);
      await p.click(action('play'));
      await p.evaluate(() => __qaApi.delayed.shift()());
      await p.waitForFunction(() => document.querySelector('.narration-player').dataset.state === 'paused');
      assert(await p.evaluate(() => __qaMedia.snapshot().every(s => s.paused)));
      await p.click(action('play')); await playing(p);
      await p.evaluate(() => __qaMedia.finish());
      await p.waitForFunction(() => document.querySelector('.narration-position').textContent.startsWith('2 /') && document.querySelector('.narration-player').dataset.state === 'playing');
      while (!(await p.$eval('[data-action="next"]', e => e.disabled))) { await p.click(action('next')); await playing(p); }
      await p.evaluate(() => __qaMedia.finish());
      await p.waitForFunction(() => document.querySelector('.narration-status').textContent.includes('Chapter complete'));
      assert.equal(await highlight(p), '');
      await p.focus(action('play')); await p.keyboard.press('Escape');
      assert.equal(await p.$eval('.narration-player', e => e.hidden), true);
      assert.equal(await p.evaluate(() => document.activeElement.className), 'narration-launch');
      await p.close();
    });
    await test('Reduced motion following never requests smooth animation', async () => {
      const p = await fresh({ reduced: true }); await mountFixture(p);
      await p.evaluate(() => { window.__scrollRequests = []; window.scrollBy = options => __scrollRequests.push(options); });
      await open(p); await p.evaluate(() => __qaMedia.tick(.1));
      await new Promise(r => setTimeout(r, 100));
      assert(await p.evaluate(() => __scrollRequests.every(x => x.behavior !== 'smooth')));
      await p.close();
    });
    for (const width of [1280, 375]) for (const theme of ['light', 'dark']) await test(`Player layout and labels ${width}px ${theme}`, async () => {
      const height = width === 375 ? 667 : 1000;
      const p = await fresh({ width, height, theme, route: '#/s/01' });
      await p.evaluate(() => {
        const target = [...document.querySelectorAll('.prose > p')].find(e => e.textContent.length > 250);
        target.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
      await p.$eval('.narration-launch', e => e.click()); await playing(p);
      await new Promise(r => setTimeout(r, 1000));
      await p.evaluate(() => __qaMedia.tick(10.1));
      await p.waitForFunction(() => { const range = [...(CSS.highlights.get('narration-word') || [])][0]; if (!range) return false; const r = range.getBoundingClientRect(), player = document.querySelector('.narration-player').getBoundingClientRect(); return r.top >= 100 && r.bottom <= player.top - 20; }, {timeout: 3000});
      const bounds = await p.evaluate(() => {
        const player = document.querySelector('.narration-player'), r = player.getBoundingClientRect();
        const controls = [...player.querySelectorAll('button,select,input')].filter(e => e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().height > 0).map(e => ({ tag: e.tagName, name: e.getAttribute('aria-label') || e.textContent, disabled: e.disabled, left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right }));
        return { actualTheme: document.documentElement.dataset.theme, documentOverflow: document.documentElement.scrollWidth > innerWidth + 1, left: r.left, right: r.right, top: r.top, bottom: r.bottom, innerWidth, innerHeight, controls };
      });
      assert.equal(bounds.actualTheme, theme); assert.equal(bounds.documentOverflow, false);
      assert(bounds.left >= 0 && bounds.right <= width && bounds.top >= 0 && bounds.bottom <= height);
      assert(bounds.controls.every(c => c.name && c.left >= bounds.left && c.right <= bounds.right + 1));
      const shot = path.join(__dirname, 'shots', `narration-${width}-${theme}.png`); fs.mkdirSync(path.dirname(shot), { recursive: true });
      await p.screenshot({ path: shot }); screenshots.push(shot);
      await settings(p);
      const expanded = await p.evaluate(() => {
        const player = document.querySelector('.narration-player'), r = player.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, voiceWidth: document.querySelector('.narration-voice').getBoundingClientRect().width, voiceLabel: document.querySelector('.narration-voice').selectedOptions[0].textContent, controls: [...player.querySelectorAll('button,select,input')].map(e => ({ name: e.getAttribute('aria-label') || e.textContent, left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right, top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom })) };
      });
      assert(expanded.left >= 0 && expanded.right <= width && expanded.top >= 0 && expanded.bottom <= height);
      assert(expanded.controls.every(c => c.name && c.left >= expanded.left && c.right <= expanded.right + 1));
      assert(expanded.voiceWidth >= (expanded.voiceLabel.length > 12 ? 150 : 75), 'Voice selector too narrow to identify the voice');
      await new Promise(r => setTimeout(r, 1000));
      await p.evaluate(() => __qaMedia.tick(12.1));
      await p.waitForFunction(() => { const range = [...(CSS.highlights.get('narration-word') || [])][0]; if (!range) return false; const r = range.getBoundingClientRect(), player = document.querySelector('.narration-player').getBoundingClientRect(); return r.top >= 100 && r.bottom <= player.top - 20; }, {timeout: 3000});
      const expandedShot = path.join(__dirname, 'shots', `narration-${width}-${theme}-expanded.png`);
      await p.screenshot({ path: expandedShot }); screenshots.push(expandedShot);
      await p.close(); return { compact: bounds, expanded };
    });
  } finally { await browser.close(); }
  const previous = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, 'utf8')) : {};
  const report = { timestamp: new Date().toISOString(), status: results.some(r => r.status === 'failed') || errors.length ? 'failed' : 'passed', scope: 'Deterministic browser interaction and DOM mapping. Voice quality is not established by mocks.', results, pageErrors: errors, screenshots, realBackend: previous.realBackend || { status: 'pending' }, backendReview: previous.backendReview || { status: 'pending' }, limitations: ['Mocked audio validates controls and highlighting, not naturalness or audible pronunciation.', 'Actual synthesis/cache checks and backend review are recorded separately.'] };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ status: report.status, cases: results.length, failed: results.filter(r => r.status === 'failed'), pageErrors: errors, screenshots }, null, 2));
  if (report.status === 'failed') process.exitCode = 1;
}
async function runRealBackend() {
  const browser = await launch();
  const checks = [], generations = [];
  const status = await fetch(base + '/api/narration/status').then(r => r.json());
  assert.equal(status.ready, true, 'Local model must be ready before real smoke test');
  try {
    const page = await browser.newPage();
    await page.goto(base + '/#/s/01', { waitUntil: 'networkidle0' });
    const texts = await page.evaluate(() => CourseNarration.extract(document.querySelector('.prose')).slice(0, 6).map(p => p.text));
    assert.equal(texts.length, 6);
    for (const [index, text] of texts.entries()) {
      const began = performance.now();
      const response = await fetch(base + '/api/narration/render', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, voice: 'af_heart' }), signal: AbortSignal.timeout(180000) });
      const data = await response.json();
      const renderRequestMs = Math.round(performance.now() - began);
      assert.equal(response.status, 200, data.error);
      assert(data.words.length > 0); assert(data.duration > 0);
      let lastStart = -1, lastOffset = -1;
      for (const word of data.words) {
        assert(Number.isFinite(word.start) && Number.isFinite(word.end) && word.start >= lastStart && word.end > word.start && word.end <= data.duration + .001);
        assert(Number.isInteger(word.textOffset) && Number.isInteger(word.length) && word.textOffset >= lastOffset && word.length > 0 && word.textOffset + word.length <= text.length);
        assert(text.slice(word.textOffset, word.textOffset + word.length).trim().length > 0);
        lastStart = word.start; lastOffset = word.textOffset;
      }
      const range = await fetch(base + data.audioUrl, { headers: { Range: 'bytes=0-43' } });
      const header = Buffer.from(await range.arrayBuffer());
      assert.equal(range.status, 206); assert.equal(header.length, 44); assert.equal(header.toString('ascii', 0, 4), 'RIFF'); assert.equal(header.toString('ascii', 8, 12), 'WAVE');
      const cachedBegan = performance.now();
      const cached = await fetch(base + '/api/narration/render', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, voice: 'af_heart' }) }).then(r => r.json());
      const repeatCacheMs = Math.round(performance.now() - cachedBegan);
      assert.equal(cached.cached, true); assert.equal(cached.audioUrl, data.audioUrl); assert.deepEqual(cached.words, data.words);
      const decoded = await page.evaluate(async url => {
        const bytes = await fetch(url).then(r => r.arrayBuffer()); const ctx = new AudioContext();
        try { const decoded = await ctx.decodeAudioData(bytes); return { duration: decoded.duration, sampleRate: decoded.sampleRate, channels: decoded.numberOfChannels, samples: decoded.length }; } finally { await ctx.close(); }
      }, data.audioUrl);
      assert(Math.abs(decoded.duration - data.duration) < .001); assert.equal(decoded.channels, 1);
      generations.push({ index, characters: text.length, words: data.words.length, duration: data.duration, cachedAtStart: data.cached, renderRequestMs, repeatCacheMs, totalCheckMs: Math.round(performance.now() - began), audioUrl: data.audioUrl, decoded, timing: data.timing });
      console.log(JSON.stringify({ realPassage: index + 1, duration: data.duration, cachedAtStart: data.cached, words: data.words.length }));
    }
    for (const entry of [{ name: 'Empty text rejected', input: { text: '', voice: 'af_heart' } }, { name: 'Unknown voice rejected', input: { text: 'A silicon wafer.', voice: 'missing-voice' } }, { name: 'Oversized passage rejected', input: { text: 'a'.repeat(4001), voice: 'af_heart' } }]) {
      const response = await fetch(base + '/api/narration/render', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry.input) });
      assert.equal(response.status, 400); checks.push({ name: entry.name, status: response.status });
    }
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    report.realBackend = { status: 'passed', timestamp: new Date().toISOString(), base, route: '#/s/01', voice: 'af_heart', passagesWarmed: 6, source: 'Exact first six CourseNarration.extract(prose) passages from the running survey page', checks, generations, limitations: ['Audio decoding and model-derived timing metadata validated. Audible voice quality and actual spoken-word alignment were not independently graded.'] };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  } finally { await browser.close(); }
}
if (require.main === module) (process.argv.includes('--real') ? runRealBackend() : run()).catch(error => { console.error(error); process.exitCode = 1; });
