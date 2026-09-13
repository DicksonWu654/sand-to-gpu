/* Sand to GPU — app shell */
(function () {
  'use strict';
  const C = window.COURSE;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const mods = C.modules.slice().sort((a, b) => a.n - b.n);
  const byN = new Map(mods.map(m => [m.n, m]));
  const survey = (C.survey || []).slice().sort((a, b) => a.n - b.n);
  const surveyByN = new Map(survey.map(m => [m.n, m]));

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('s2g:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('s2g:' + k, JSON.stringify(v)); } catch (e) { } },
  };
  const state = { read: store.get('read', {}), quiz: store.get('quiz', {}), last: store.get('last', null), theme: store.get('theme', null), track: store.get('track', 'deep'), sread: store.get('sread', {}) };

  // ---------- theme ----------
  function applyTheme() {
    const root = document.documentElement;
    if (state.theme) root.setAttribute('data-theme', state.theme); else root.removeAttribute('data-theme');
    themeListeners.forEach(fn => { try { fn(); } catch (e) { } });
  }
  const themeListeners = new Set();
  applyTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => themeListeners.forEach(fn => fn()));

  // ---------- widget framework ----------
  const registry = window.__WIDGETS || {};
  window.registerWidget = (id, def) => { registry[id] = def; };
  const ctxBase = {
    tokens() {
      const cs = getComputedStyle(document.documentElement);
      const g = n => cs.getPropertyValue('--' + n).trim();
      return { ink: g('ink'), muted: g('muted'), ground: g('ground'), panel: g('panel'), panel2: g('panel2'), line: g('line'), line2: g('line2'), accent: g('accent'), accent2: g('accent2'), si: g('si'), cu: g('cu'), euv: g('accent2'), ok: g('ok'), warn: g('warn'), bad: g('bad') };
    },
    fmt(n, d) {
      if (n == null || !isFinite(n)) return '–';
      const s = Number(n).toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d, minimumFractionDigits: 0 });
      return s.replace(/,/g, ' ');
    },
    h(tag, attrs, ...kids) { return mk(document.createElement(tag), attrs, kids); },
    svg(tag, attrs, ...kids) { return mk(document.createElementNS('http://www.w3.org/2000/svg', tag), attrs, kids); },
  };
  function mk(el, attrs, kids) {
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'on') for (const ev in v) el.addEventListener(ev, v[ev]);
      else if (k === 'html') el.innerHTML = v;
      else if (v != null) el.setAttribute(k, v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    return el;
  }
  let activeCleanups = [];
  function mountWidgets(root) {
    $$('.widget[data-widget]', root).forEach(box => {
      const id = box.dataset.widget;
      const def = registry[id];
      box.innerHTML = '';
      const head = ctxBase.h('div', { class: 'widget-head' }, ctxBase.h('h4', null, (def && def.title) || box.dataset.title || id), ctxBase.h('span', { class: 'tag' }, 'Interactive'));
      box.append(head);
      if (!def) { box.append(ctxBase.h('div', { class: 'widget-body error' }, `Widget "${id}" is not available in this build.`)); return; }
      if (def.caption) box.append(ctxBase.h('div', { class: 'widget-cap' }, def.caption));
      const body = ctxBase.h('div', { class: 'widget-body' });
      box.append(body);
      const listeners = [];
      const ctx = Object.assign({}, ctxBase, { onTheme(fn) { listeners.push(fn); themeListeners.add(fn); } });
      try {
        const cleanup = def.mount(body, ctx);
        const cleanupDiagrams = window.prepareWidgetDiagrams(body);
        activeCleanups.push(() => { cleanupDiagrams(); listeners.forEach(fn => themeListeners.delete(fn)); if (typeof cleanup === 'function') { try { cleanup(); } catch (e) { } } });
      } catch (e) {
        body.classList.add('error'); body.textContent = 'This interactive failed to load: ' + e.message; console.error(id, e);
      }
    });
  }
  function unmountWidgets() { activeCleanups.forEach(fn => fn()); activeCleanups = []; }

  // ---------- progress ----------
  function passed(n) { const q = state.quiz[n]; return q && q.total && q.score / q.total >= 2 / 3; }
  function progressPct() {
    let pts = 0; mods.forEach(m => { if (state.read[m.n]) pts += 0.5; if (passed(m.n)) pts += 0.5; });
    return Math.round(100 * pts / mods.length);
  }
  function renderProgress() {
    const p = progressPct();
    $('#progress-bar i').style.width = p + '%';
    $('#progress-txt').textContent = p + '% complete';
    $$('.sidebar a.mod[data-n]').forEach(a => { const n = +a.dataset.n; a.classList.toggle('read', !!state.read[n]); a.classList.toggle('passed', !!passed(n)); });
  }

  // ---------- sidebar ----------
  function setTrack(t) { state.track = t; store.set('track', t); renderSidebar(); renderProgress(); }
  function renderSidebar() {
    const sb = $('#sidebar');
    sb.innerHTML = '';
    sb.append(ctxBase.h('a', { class: 'home', href: '#/home' }, iconHome(), 'Start here: the map'));
    if (survey.length) {
      const sw = ctxBase.h('div', { class: 'track-switch', role: 'tablist', 'aria-label': 'Course track' },
        ctxBase.h('button', { class: 'track-btn' + (state.track === 'survey' ? ' active' : ''), role: 'tab', 'aria-selected': String(state.track === 'survey'), on: { click: () => { setTrack('survey'); location.hash = '#/s/01'; } } }, ctxBase.h('b', null, 'Survey'), ctxBase.h('small', null, survey.length + ' chapters · an afternoon')),
        ctxBase.h('button', { class: 'track-btn' + (state.track === 'deep' ? ' active' : ''), role: 'tab', 'aria-selected': String(state.track === 'deep'), on: { click: () => { setTrack('deep'); location.hash = '#/m/00'; } } }, ctxBase.h('b', null, 'Deep dive'), ctxBase.h('small', null, mods.length + ' modules · the full course')));
      sb.append(sw);
    }
    if (state.track === 'survey' && survey.length) {
      const box = ctxBase.h('div', { class: 'part' });
      box.append(ctxBase.h('div', { class: 'part-h' }, ctxBase.h('b', null, 'Survey'), 'The whole chain in ' + survey.length + ' chapters'));
      for (const s of survey) {
        box.append(ctxBase.h('a', { class: 'mod' + (state.sread[s.n] ? ' read' : ''), href: '#/s/' + pad(s.n), 'data-s': s.n },
          ctxBase.h('span', { class: 'num' }, 'S' + s.n), ctxBase.h('span', null, s.title), ctxBase.h('span', { class: 'tick' }, iconCheck())));
      }
      sb.append(box);
      sb.append(ctxBase.h('div', { class: 'legend' }, ctxBase.h('span', null, 'Each chapter ends with "Go deeper" links into the full modules.')));
      return;
    }
    for (const part of C.parts) {
      const box = ctxBase.h('div', { class: 'part' });
      box.append(ctxBase.h('div', { class: 'part-h' }, ctxBase.h('b', null, 'Part ' + part.id), part.title));
      for (const n of part.modules) {
        const m = byN.get(n); if (!m) continue;
        box.append(ctxBase.h('a', { class: 'mod', href: '#/m/' + pad(n), 'data-n': n },
          ctxBase.h('span', { class: 'num' }, pad(n)), ctxBase.h('span', null, m.title),
          ctxBase.h('span', { class: 'tick' }, iconCheck())));
      }
      sb.append(box);
    }
    sb.append(ctxBase.h('div', { class: 'legend' }, ctxBase.h('span', null, ctxBase.h('i', { class: 'r' }), 'read to the end'), ctxBase.h('span', null, ctxBase.h('i', { class: 'p' }), 'quiz passed (two thirds or better)')));
  }
  const pad = n => String(n).padStart(2, '0');
  function iconCheck() { return ctxBase.svg('svg', { viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ctxBase.svg('path', { d: 'M2 6.5l2.5 2.5L10 3.5' })); }
  function iconHome() { return ctxBase.svg('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ctxBase.svg('path', { d: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z' })); }

  // ---------- router ----------
  function route() {
    const hash = location.hash || '#/home';
    const m = hash.match(/^#\/m\/(\d+)(?:\/(.+))?/);
    const s = hash.match(/^#\/s\/(\d+)(?:\/(.+))?/);
    unmountWidgets();
    if (spyHandler) { window.removeEventListener('scroll', spyHandler); spyHandler = null; }
    closeSidebar();
    if (s && survey.length) {
      if (state.track !== 'survey') { state.track = 'survey'; store.set('track', 'survey'); renderSidebar(); }
      renderModule(parseInt(s[1], 10), s[2], 'survey');
    } else if (m) {
      if (state.track !== 'deep') { state.track = 'deep'; store.set('track', 'deep'); renderSidebar(); }
      renderModule(parseInt(m[1], 10), m[2], 'deep');
    } else renderHome();
    const active = s ? '#/s/' + pad(+s[1]) : m ? '#/m/' + pad(+m[1]) : '#/home';
    $$('.sidebar a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === active));
    renderProgress();
  }

  // ---------- home ----------
  function renderHome() {
    document.title = 'Sand to GPU';
    const main = $('#main'); main.innerHTML = '';
    $('#rail').innerHTML = '';
    const words = mods.reduce((a, m) => a + m.words, 0);
    const widgetsCount = Object.keys(registry).length;
    const art = ctxBase.h('div', { class: 'article' });
    const last = state.last != null && byN.get(state.last);
    art.append(ctxBase.h('section', { class: 'home-hero' },
      ctxBase.h('div', { class: 'eyebrow' }, 'A self-study course', ctxBase.h('span', { class: 'dot' }), ctxBase.h('span', { class: 'meta' }, 'last built ' + C.built.slice(0, 10))),
      ctxBase.h('h1', null, 'From a quartz mine to an NVIDIA rack, one process step at a time.'),
      ctxBase.h('p', { class: 'lede' }, mods.length + ' modules that follow silicon through purification, crystal pulling, wafering, the ~1,500-step fab flow, EUV lithography, transistors, interconnect, test, HBM, CoWoS packaging, and finally into a GB200 rack. Every stage is explained at the level of the physics and the machines, using published specifications, illustrative models, and supplier examples.'),
      ctxBase.h('div', { class: 'cta-row' },
        survey.length ? ctxBase.h('a', { class: 'cta primary', href: '#/s/01' }, 'Start with the survey (an afternoon)') : null,
        ctxBase.h('a', { class: 'cta' + (survey.length ? '' : ' primary'), href: last ? '#/m/' + pad(last.n) : '#/m/00' }, last ? 'Continue deep dive: ' + pad(last.n) + ' ' + last.title : 'Start the deep dive'),
        ctxBase.h('a', { class: 'cta', href: '#/m/08' }, 'Jump to EUV'),
        ctxBase.h('a', { class: 'cta', href: '#/m/19' }, 'Jump to the GPU')),
      ctxBase.h('div', { class: 'stats' },
        stat(mods.length, 'modules'), stat(Math.round(words / 1000) + 'k', 'words of reading'), stat(widgetsCount, 'interactive visuals'), stat(mods.reduce((a, m) => a + (m.quiz ? m.quiz.questions.length : 0), 0), 'quiz questions'))
    ));
    const map = ctxBase.h('div', { class: 'widget', 'data-widget': 'chain-map' });
    art.append(map);
    const parts = ctxBase.h('div', { class: 'part-list' });
    if (survey.length) {
      const grid = ctxBase.h('div', { class: 'mod-grid' });
      for (const s of survey) {
        grid.append(ctxBase.h('a', { class: 'mod-card', href: '#/s/' + pad(s.n) },
          ctxBase.h('span', { class: 'n' }, 'S' + s.n),
          ctxBase.h('span', null, ctxBase.h('span', { class: 't' }, s.title), ctxBase.h('span', { class: 'm' }, Math.max(1, Math.round(s.words / 230)) + ' min read' + (state.sread[s.n] ? ' · read' : '')))));
      }
      parts.append(ctxBase.h('div', { class: 'part-card' }, ctxBase.h('h3', null, ctxBase.h('b', null, 'Survey'), 'The whole chain in ten short chapters, then go deeper'), grid));
    }
    for (const part of C.parts) {
      const grid = ctxBase.h('div', { class: 'mod-grid' });
      for (const n of part.modules) {
        const m = byN.get(n); if (!m) continue;
        const q = state.quiz[n];
        grid.append(ctxBase.h('a', { class: 'mod-card' + (passed(n) ? ' passed' : ''), href: '#/m/' + pad(n) },
          ctxBase.h('span', { class: 'n' }, pad(n)),
          ctxBase.h('span', null, ctxBase.h('span', { class: 't' }, m.title), ctxBase.h('span', { class: 'm' }, Math.max(1, Math.round(m.words / 230)) + ' min read' + (state.read[n] ? ' · read' : '') + (q ? ` · quiz ${q.score}/${q.total}` : '')))));
      }
      parts.append(ctxBase.h('div', { class: 'part-card' }, ctxBase.h('h3', null, ctxBase.h('b', null, 'Part ' + part.id), part.title), grid));
    }
    art.append(parts);
    main.append(art);
    mountWidgets(main);
    window.scrollTo(0, 0);
  }
  function stat(v, l) { return ctxBase.h('div', null, ctxBase.h('b', null, String(v)), ctxBase.h('span', null, l)); }

  // ---------- module ----------
  function renderModule(n, anchor, track) {
    const isSurvey = track === 'survey';
    const list = isSurvey ? survey : mods;
    const m = (isSurvey ? surveyByN : byN).get(n);
    if (!m) { location.hash = '#/home'; return; }
    const base = (isSurvey ? '#/s/' : '#/m/');
    if (!isSurvey) { state.last = n; store.set('last', n); }
    document.title = (isSurvey ? 'Survey ' + n + ': ' : pad(n) + ' ') + m.title + ' · Sand to GPU';
    const part = isSurvey ? null : C.parts.find(p => p.id === m.part);
    const main = $('#main'); main.innerHTML = '';
    const idx = list.indexOf(m);
    const prev = list[idx - 1], next = list[idx + 1];
    const art = ctxBase.h('div', { class: 'article' });
    const eyebrowLeft = isSurvey ? 'Survey track · chapter ' + n + ' of ' + list.length : 'Part ' + m.part + ' · ' + (part ? part.title : '');
    const eyebrowRight = (isSurvey ? '' : 'Module ' + pad(n) + ' · ') + Math.max(1, Math.round(m.words / 230)) + ' min read';
    art.append(ctxBase.h('header', { class: 'mod-head' },
      ctxBase.h('div', { class: 'eyebrow' }, eyebrowLeft, ctxBase.h('span', { class: 'dot' }), ctxBase.h('span', { class: 'meta' }, eyebrowRight)),
      ctxBase.h('h1', { class: 'title' }, m.title)));
    const prose = ctxBase.h('div', { class: 'prose', html: m.html });
    art.append(prose);
    if (m.quiz && m.quiz.questions && m.quiz.questions.length) art.append(renderQuiz(m));
    const label = x => isSurvey ? 'S' + x.n : pad(x.n);
    const pn = ctxBase.h('nav', { class: 'prevnext' });
    pn.append(prev ? ctxBase.h('a', { class: 'prev', href: base + pad(prev.n) }, ctxBase.h('small', null, '← Previous · ' + label(prev)), prev.title) : ctxBase.h('span'));
    if (next) pn.append(ctxBase.h('a', { class: 'next', href: base + pad(next.n) }, ctxBase.h('small', null, 'Next · ' + label(next) + ' →'), next.title));
    else if (isSurvey) pn.append(ctxBase.h('a', { class: 'next', href: '#/m/00' }, ctxBase.h('small', null, 'Finished the survey →'), 'Start the deep dive at Module 00'));
    else pn.append(ctxBase.h('span'));
    art.append(pn);
    main.append(art);
    // rail
    const rail = $('#rail'); rail.innerHTML = '';
    if (m.toc.length) {
      const toc = ctxBase.h('div', { class: 'toc' });
      m.toc.forEach(t => toc.append(ctxBase.h('a', { href: base + pad(n) + '/' + t.id, class: 'd' + t.depth, 'data-id': t.id }, t.text)));
      rail.append(ctxBase.h('h5', null, isSurvey ? 'In this chapter' : 'In this module'), toc);
    }
    if (m.keyNumbers && m.keyNumbers.length) {
      const kn = ctxBase.h('div', { class: 'kn' }, ctxBase.h('h5', null, 'Key numbers'));
      m.keyNumbers.slice(0, 8).forEach(k => kn.append(ctxBase.h('div', null, ctxBase.h('span', null, k.k), ctxBase.h('span', null, k.v))));
      rail.append(kn);
    }
    mountWidgets(main);
    // intra-module anchors
    $$('a[href^="#"]', prose).forEach(a => { const h = a.getAttribute('href'); if (!h.startsWith('#/')) a.setAttribute('href', base + pad(n) + '/' + h.slice(1)); });
    if (anchor) { const el = document.getElementById(anchor); if (el) { setTimeout(() => el.scrollIntoView({ block: 'start' }), 0); } }
    else window.scrollTo(0, 0);
    watchScroll(m, isSurvey);
  }

  // scroll spy + read tracking
  let spyHandler = null;
  function watchScroll(m, isSurvey) {
    if (spyHandler) window.removeEventListener('scroll', spyHandler);
    const heads = () => $$('.prose h2[id], .prose h3[id]');
    spyHandler = () => {
      const y = window.scrollY + 90;
      let cur = null; heads().forEach(h => { if (h.offsetTop <= y) cur = h.id; });
      $$('#rail .toc a').forEach(a => a.classList.toggle('active', a.dataset.id === cur));
      const doc = document.documentElement;
      const nearEnd = (window.scrollY + window.innerHeight) / doc.scrollHeight > 0.9;
      if (isSurvey) { if (!state.sread[m.n] && nearEnd) { state.sread[m.n] = true; store.set('sread', state.sread); renderSidebar(); $$('.sidebar a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/s/' + pad(m.n))); } return; }
      if (!state.read[m.n] && nearEnd) { state.read[m.n] = true; store.set('read', state.read); renderProgress(); }
    };
    window.addEventListener('scroll', spyHandler, { passive: true });
    spyHandler();
  }

  // ---------- quiz ----------
  function renderQuiz(m) {
    const qs = m.quiz.questions;
    const box = ctxBase.h('section', { class: 'quiz' });
    const score = ctxBase.h('span', { class: 'score' });
    box.append(ctxBase.h('div', { class: 'quiz-head' }, ctxBase.h('h3', null, 'Check your understanding'), score));
    const answered = new Map();
    const saved = state.quiz[m.n];
    const verdict = ctxBase.h('span', { class: 'verdict' });
    function update() {
      const total = qs.length; const done = answered.size; const ok = Array.from(answered.values()).filter(Boolean).length;
      score.textContent = `${done} / ${total} answered · ${ok} correct`;
      if (done === total) {
        state.quiz[m.n] = { score: ok, total }; store.set('quiz', state.quiz); renderProgress();
        verdict.textContent = ok / total >= 2 / 3 ? `Passed: ${ok} of ${total}.` : `${ok} of ${total}. Re-read the sections you missed and retry.`;
        verdict.classList.toggle('pass', ok / total >= 2 / 3);
      } else if (saved) verdict.textContent = `Previous attempt: ${saved.score} of ${saved.total}.`;
    }
    qs.forEach((q, i) => {
      const el = ctxBase.h('div', { class: 'q' });
      el.append(ctxBase.h('div', { class: 'qt' }, ctxBase.h('small', null, 'Q' + (i + 1)), q.q));
      const name = 'q' + m.n + '_' + i;
      const labels = q.options.map((opt, j) => {
        const inp = ctxBase.h('input', { type: 'radio', name, value: j });
        const lab = ctxBase.h('label', null, inp, ctxBase.h('span', null, opt));
        inp.addEventListener('change', () => {
          if (el.classList.contains('answered')) return;
          el.classList.add('answered');
          labels.forEach((l, k) => { if (k === q.answer) l.classList.add('correct'); else if (k === j) l.classList.add('wrong'); l.querySelector('input').disabled = true; });
          el.append(ctxBase.h('div', { class: 'expl' }, (j === q.answer ? 'Correct. ' : 'Not quite. ') + (q.explanation || '')));
          answered.set(i, j === q.answer); update();
        });
        return lab;
      });
      labels.forEach(l => el.append(l));
      box.append(el);
    });
    const retry = ctxBase.h('button', { class: 'w-btn', on: { click: () => { const fresh = renderQuiz(m); box.replaceWith(fresh); } } }, 'Retry quiz');
    box.append(ctxBase.h('div', { class: 'quiz-foot' }, verdict, retry));
    update();
    return box;
  }

  // ---------- search ----------
  const decodeEnt = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const allDocs = mods.map(m => ({ m, base: '#/m/' })).concat(survey.map(m => ({ m, base: '#/s/' })));
  const stripped = allDocs.map(({ m, base }) => ({ m, base, text: decodeEnt(m.html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ') }));
  function search(q) {
    q = q.trim().toLowerCase(); if (q.length < 2) return [];
    const out = [];
    for (const { m, base } of allDocs) {
      if (m.title.toLowerCase().includes(q)) out.push({ kind: base === '#/s/' ? 'survey' : 'module', m, base, text: m.title, href: base + pad(m.n) });
      m.toc.forEach(t => { if (t.text.toLowerCase().includes(q)) out.push({ kind: 'section', m, base, text: t.text, href: base + pad(m.n) + '/' + t.id }); });
    }
    for (const { m, base, text } of stripped) {
      let i = text.toLowerCase().indexOf(q), c = 0;
      while (i >= 0 && c < 2) {
        const s = Math.max(0, i - 60), e = Math.min(text.length, i + q.length + 80);
        // find nearest preceding heading id
        const hid = nearestHeading(m, i);
        out.push({ kind: 'text', m, base, text: '…' + text.slice(s, e) + '…', href: base + pad(m.n) + (hid ? '/' + hid : '') });
        i = text.toLowerCase().indexOf(q, i + 200); c++;
      }
    }
    return out.slice(0, 40);
  }
  const headPos = new Map();
  function nearestHeading(m, pos) {
    if (!headPos.has(m)) {
      const t = stripped.find(s => s.m === m).text;
      const arr = m.toc.map(h => ({ id: h.id, i: t.indexOf(h.text) })).filter(x => x.i >= 0).sort((a, b) => a.i - b.i);
      headPos.set(m, arr);
    }
    let best = null; for (const h of headPos.get(m)) { if (h.i <= pos) best = h.id; else break; }
    return best;
  }
  function setupSearch() {
    const inp = $('#search'), res = $('#search-results');
    let sel = -1;
    const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    function show() {
      const q = inp.value; const hits = search(q); sel = -1;
      if (!hits.length) { res.hidden = true; res.innerHTML = ''; return; }
      const re = new RegExp('(' + q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      res.innerHTML = hits.map(h => `<a href="${h.href}"><span class="kind">${h.kind}</span>${h.base === '#/s/' ? 'S' + h.m.n : pad(h.m.n)} ${esc(h.m.title)}<span class="ctx">${esc(h.text).replace(re, '<mark>$1</mark>')}</span></a>`).join('');
      res.hidden = false;
    }
    inp.addEventListener('input', show);
    inp.addEventListener('focus', show);
    inp.addEventListener('keydown', e => {
      const items = $$('a', res);
      if (e.key === 'ArrowDown') { sel = Math.min(items.length - 1, sel + 1); items.forEach((a, i) => a.classList.toggle('sel', i === sel)); items[sel] && items[sel].scrollIntoView({ block: 'nearest' }); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); items.forEach((a, i) => a.classList.toggle('sel', i === sel)); e.preventDefault(); }
      else if (e.key === 'Enter') { const a = items[sel] || items[0]; if (a) { location.hash = a.getAttribute('href'); res.hidden = true; inp.blur(); } }
      else if (e.key === 'Escape') { res.hidden = true; inp.blur(); }
    });
    document.addEventListener('click', e => { if (!e.target.closest('.search')) res.hidden = true; });
    res.addEventListener('click', () => { res.hidden = true; });
    document.addEventListener('keydown', e => { if (e.key === '/' && document.activeElement !== inp && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); inp.focus(); inp.select(); } });
  }

  // ---------- sidebar (mobile) ----------
  const mobileSidebar = window.matchMedia('(max-width: 860px)');
  function closeSidebar() { $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('show'); $('#sidebar').inert = mobileSidebar.matches; $('#menu').setAttribute('aria-expanded', 'false'); }
  function setupChrome() {
    $('#menu').addEventListener('click', () => { const open = $('#sidebar').classList.toggle('open'); $('#scrim').classList.toggle('show', open); $('#sidebar').inert = !open && mobileSidebar.matches; $('#menu').setAttribute('aria-expanded', String(open)); });
    mobileSidebar.addEventListener('change', closeSidebar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#sidebar').classList.contains('open')) { closeSidebar(); $('#menu').focus(); } });
    $('#scrim').addEventListener('click', closeSidebar);
    $('#theme').addEventListener('click', () => {
      const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const cur = state.theme || (sysDark ? 'dark' : 'light');
      state.theme = cur === 'dark' ? 'light' : 'dark'; store.set('theme', state.theme); applyTheme();
    });
  }

  // ---------- boot ----------
  renderSidebar();
  setupSearch();
  setupChrome();
  window.addEventListener('hashchange', route);
  route();
})();
