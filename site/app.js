/* Sand to GPU — app shell */
(function () {
  'use strict';
  const C = window.COURSE;
  const Shell = window.CourseShell;
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
    sb.append(ctxBase.h('div', { class: 'curriculum-label' }, 'THE FIELD GUIDE'));
    sb.append(ctxBase.h('a', { class: 'home', href: '#/home' }, iconHome(), 'Explore the atlas'));
    if (survey.length) {
      const sw = ctxBase.h('div', { class: 'track-switch', role: 'group', 'aria-label': 'Course track' },
        ctxBase.h('button', { class: 'track-btn' + (state.track === 'survey' ? ' active' : ''), 'aria-pressed': String(state.track === 'survey'), on: { click: () => { setTrack('survey'); navigateTo('#/s/01'); } } }, ctxBase.h('b', null, 'Survey'), ctxBase.h('small', null, survey.length + ' chapters')),
        ctxBase.h('button', { class: 'track-btn' + (state.track === 'deep' ? ' active' : ''), 'aria-pressed': String(state.track === 'deep'), on: { click: () => { setTrack('deep'); navigateTo('#/m/00'); } } }, ctxBase.h('b', null, 'Deep dive'), ctxBase.h('small', null, mods.length + ' modules')));
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
    sb.append(ctxBase.h('div', { class: 'legend' }, ctxBase.h('span', null, ctxBase.h('i', { class: 'r' }), 'Read'), ctxBase.h('span', null, ctxBase.h('i', { class: 'p' }), 'Quiz passed')));
  }
  const pad = n => String(n).padStart(2, '0');
  function iconCheck() { return ctxBase.svg('svg', { viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ctxBase.svg('path', { d: 'M2 6.5l2.5 2.5L10 3.5' })); }
  function iconHome() { return ctxBase.svg('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, ctxBase.svg('path', { d: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z' })); }

  // ---------- router ----------
  function markSidebarPage(href) {
    $$('.sidebar a').forEach(a => {
      const active = a.getAttribute('href') === href;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function navigateTo(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  let currentPage = null;
  let anchorFrame = null;
  function focusContent(target) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
  function scrollToAnchor(anchor) {
    if (anchorFrame != null) cancelAnimationFrame(anchorFrame);
    let id = anchor;
    try { id = decodeURIComponent(anchor); } catch (e) { /* An invalid fragment is not a fatal route error. */ }
    const target = document.getElementById(id);
    if (target && $('#main').contains(target)) anchorFrame = requestAnimationFrame(() => {
      anchorFrame = null;
      if (target.isConnected) { target.scrollIntoView({ block: 'start' }); focusContent(target); }
    });
  }
  function route() {
    const hash = location.hash || '#/home';
    const m = hash.match(/^#\/m\/(\d+)(?:\/(.+))?/);
    const s = hash.match(/^#\/s\/(\d+)(?:\/(.+))?/);
    const pageKey = s ? 's/' + Number(s[1]) : m ? 'm/' + Number(m[1]) : 'home';
    const anchor = (s || m || [])[2];
    const active = s ? '#/s/' + pad(+s[1]) : m ? '#/m/' + pad(+m[1]) : '#/home';
    if (anchorFrame != null) { cancelAnimationFrame(anchorFrame); anchorFrame = null; }
    if (currentPage === pageKey) {
      closeSidebar(); markSidebarPage(active); renderProgress();
      if (anchor) scrollToAnchor(anchor);
      else { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); focusContent($('#main')); }
      return;
    }
    const wasNavigation = currentPage != null;
    currentPage = pageKey;
    // Reset before the new chapter's progress observer sees the previous scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.classList.toggle('is-home', pageKey === 'home');
    unmountWidgets();
    if (spyHandler) { window.removeEventListener('scroll', spyHandler); spyHandler = null; }
    if (spyFrame != null) { cancelAnimationFrame(spyFrame); spyFrame = null; }
    closeSidebar();
    if (s && survey.length) {
      if (state.track !== 'survey') { state.track = 'survey'; store.set('track', 'survey'); renderSidebar(); }
      renderModule(parseInt(s[1], 10), s[2], 'survey');
    } else if (m) {
      if (state.track !== 'deep') { state.track = 'deep'; store.set('track', 'deep'); renderSidebar(); }
      renderModule(parseInt(m[1], 10), m[2], 'deep');
    } else renderHome();
    markSidebarPage(active);
    renderProgress();
    if (wasNavigation && !anchor) focusContent($('#main'));
  }

  // ---------- home components ----------
  function courseCard(m, isSurvey) {
    const label = isSurvey ? 'S' + pad(m.n) : pad(m.n);
    const status = isSurvey ? (state.sread[m.n] ? ' · Read' : '') : (passed(m.n) ? ' · Quiz passed' : state.read[m.n] ? ' · Read' : '');
    return ctxBase.h('a', { class: 'mod-card' + (!isSurvey && passed(m.n) ? ' passed' : ''), href: (isSurvey ? '#/s/' : '#/m/') + pad(m.n) },
      ctxBase.h('span', { class: 'n' }, label),
      ctxBase.h('span', { class: 'mod-card-copy' }, ctxBase.h('span', { class: 't' }, m.title), ctxBase.h('span', { class: 'm' }, Math.max(1, Math.round(m.words / 230)) + ' min' + status)),
      ctxBase.h('span', { class: 'card-arrow', 'aria-hidden': 'true' }, '↗'));
  }
  function renderHome() {
    document.title = 'Sand to GPU · The engineering atlas';
    document.documentElement.style.setProperty('--reading-progress', '0%');
    const main = $('#main'); main.innerHTML = '';
    $('#rail').innerHTML = '';
    const art = ctxBase.h('div', { class: 'home-page' });
    const last = state.last != null && byN.get(state.last);
    const hero = ctxBase.h('section', { class: 'home-hero' },
      ctxBase.h('div', { class: 'hero-copy' },
        ctxBase.h('div', { class: 'eyebrow' }, ctxBase.h('span', { class: 'status-dot', 'aria-hidden': 'true' }), 'An illustrated guide to semiconductors'),
        ctxBase.h('h1', null, 'Extraordinary machines.', ctxBase.h('br'), ctxBase.h('em', null, 'Ordinary sand.')),
        ctxBase.h('div', { class: 'hero-intro' },
          ctxBase.h('p', { class: 'lede' }, 'Follow selected quartz through the physics, factories and extraordinary precision that turn silicon into a GPU. A connected story, from raw material to computing system.'),
          ctxBase.h('a', { class: 'text-link', href: '#reading-paths' }, 'Find your starting point', ctxBase.h('span', { 'aria-hidden': 'true' }, '↓')))),
      ctxBase.h('div', { class: 'hero-visual', html: Shell.journey() }),
      ctxBase.h('div', { class: 'hero-caption' }, ctxBase.h('span', null, 'A journey in five transformations'), ctxBase.h('span', null, 'Explore any stage ↑ · Schematics not to scale')));
    art.append(hero);
    const paths = ctxBase.h('section', { class: 'reading-paths', id: 'reading-paths' },
      ctxBase.h('div', { class: 'section-kicker' }, ctxBase.h('span', null, '01 / CHOOSE YOUR PATH'), ctxBase.h('h2', null, 'The big picture. Or every detail.')),
      ctxBase.h('div', { class: 'path-options' },
        ctxBase.h('a', { class: 'path-option survey-path', href: '#/s/01' },
          ctxBase.h('div', { class: 'path-top' }, ctxBase.h('span', { class: 'eyebrow' }, 'The survey'), ctxBase.h('span', { class: 'path-arrow', 'aria-hidden': 'true' }, '↗')),
          ctxBase.h('h3', null, 'See how it all connects.'),
          ctxBase.h('p', null, 'A guided first pass through the whole chain. Build a mental map, then follow your curiosity deeper.'),
          ctxBase.h('div', { class: 'path-bottom' }, ctxBase.h('span', null, survey.length + ' chapters · An afternoon'), ctxBase.h('b', null, 'Start the survey →'))),
        ctxBase.h('a', { class: 'path-option deep-path', href: last ? '#/m/' + pad(last.n) : '#/m/00' },
          ctxBase.h('div', { class: 'path-top' }, ctxBase.h('span', { class: 'eyebrow' }, 'The deep dive'), ctxBase.h('span', { class: 'path-arrow', 'aria-hidden': 'true' }, '↗')),
          ctxBase.h('h3', null, 'Get inside the process.'),
          ctxBase.h('p', null, 'The mechanisms, machines and tradeoffs. Work through detailed explanations, interactive experiments and quizzes.'),
          ctxBase.h('div', { class: 'path-bottom' }, ctxBase.h('span', null, mods.length + ' modules · At your own pace'), ctxBase.h('b', null, last ? 'Continue module ' + pad(last.n) + ' →' : 'Start the deep dive →')))));
    art.append(paths);
    const curriculum = ctxBase.h('section', { class: 'home-curriculum' },
      ctxBase.h('div', { class: 'section-kicker' }, ctxBase.h('span', null, '02 / THE COMPLETE ATLAS'), ctxBase.h('h2', null, 'One connected story.')));
    const surveyDetails = ctxBase.h('details', { class: 'curriculum-part' });
    surveyDetails.append(ctxBase.h('summary', null, ctxBase.h('span', { class: 'part-index' }, 'S'), ctxBase.h('span', null, ctxBase.h('b', null, 'The survey'), ctxBase.h('small', null, 'Ten chapters to connect the whole chain')), ctxBase.h('span', { class: 'expand-sign', 'aria-hidden': 'true' }, '+')));
    const surveyGrid = ctxBase.h('div', { class: 'mod-grid' }); survey.forEach(m => surveyGrid.append(courseCard(m, true))); surveyDetails.append(surveyGrid); curriculum.append(surveyDetails);
    for (const part of C.parts) {
      const group = ctxBase.h('details', { class: 'curriculum-part', open: part.id === 'I' ? '' : null });
      group.append(ctxBase.h('summary', null, ctxBase.h('span', { class: 'part-index' }, part.id), ctxBase.h('span', null, ctxBase.h('b', null, part.title), ctxBase.h('small', null, part.modules.length + (part.modules.length === 1 ? ' module' : ' modules'))), ctxBase.h('span', { class: 'expand-sign', 'aria-hidden': 'true' }, '+')));
      const grid = ctxBase.h('div', { class: 'mod-grid' }); part.modules.forEach(n => { const m=byN.get(n); if(m) grid.append(courseCard(m, false)); });
      group.append(grid); curriculum.append(group);
    }
    art.append(curriculum);
    art.append(ctxBase.h('footer', { class: 'atlas-footer' }, ctxBase.h('b', null, 'Sand to GPU'), ctxBase.h('p', null, 'A self-study field guide. Read, experiment, connect the dots.'), ctxBase.h('a', { href: '#/m/21' }, 'Glossary & reference ↗')));
    main.append(art);
    // The home-page jump is local scrolling, not a course route.
    $('.text-link', hero).addEventListener('click', e => { e.preventDefault(); paths.scrollIntoView({ block: 'start' }); });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

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
    const art = ctxBase.h('article', { class: 'article' });
    const eyebrowLeft = isSurvey ? 'Survey track · chapter ' + n + ' of ' + list.length : 'Part ' + m.part + ' · ' + (part ? part.title : '');
    const eyebrowRight = (isSurvey ? '' : 'Module ' + pad(n) + ' · ') + Math.max(1, Math.round(m.words / 230)) + ' min read';
    art.append(ctxBase.h('header', { class: 'mod-head' },
      ctxBase.h('div', { class: 'eyebrow' }, eyebrowLeft, ctxBase.h('span', { class: 'dot' }), ctxBase.h('span', { class: 'meta' }, eyebrowRight)),
      ctxBase.h('div', { class: 'chapter-intro' }, ctxBase.h('h1', { class: 'title' }, m.title), ctxBase.h('p', { class: 'chapter-deck' }, Shell.description(n, isSurvey))),
      ctxBase.h('div', { html: Shell.plate(n, isSurvey) }),
      ctxBase.h('div', { class: 'chapter-stage', html: Shell.ribbon(n, isSurvey) })));
    const prose = ctxBase.h('div', { class: 'prose', html: m.html });
    decorateProse(prose);
    const chapterTools = renderChapterTools(m, prose, base, n);
    art.append(chapterTools, prose);
    if (m.quiz && m.quiz.questions && m.quiz.questions.length) art.append(renderQuiz(m));
    const label = x => isSurvey ? 'S' + x.n : pad(x.n);
    const pn = ctxBase.h('nav', { class: 'prevnext' });
    pn.append(prev ? ctxBase.h('a', { class: 'prev', href: base + pad(prev.n) }, ctxBase.h('small', null, '← Previous · ' + label(prev)), prev.title) : ctxBase.h('span'));
    if (next) pn.append(ctxBase.h('a', { class: 'next', href: base + pad(next.n) }, ctxBase.h('small', null, 'Next · ' + label(next) + ' →'), next.title));
    else if (isSurvey) pn.append(ctxBase.h('a', { class: 'next', href: '#/m/00' }, ctxBase.h('small', null, 'Finished the survey →'), 'Start the deep dive at Module 00'));
    else pn.append(ctxBase.h('span'));
    art.append(pn);
    main.append(art);
    renderChapterRail(m, base, n, isSurvey);
    prepareTables(prose);
    mountWidgets(main);
    if (window.CourseNarration) activeCleanups.push(CourseNarration.mount({ prose, toolbar: chapterTools, title: m.title, lessonKey: base + pad(n) }));
    // intra-module anchors
    $$('a[href^="#"]', prose).forEach(a => { const h = a.getAttribute('href'); if (!h.startsWith('#/')) a.setAttribute('href', base + pad(n) + '/' + h.slice(1)); });
    if (anchor) scrollToAnchor(anchor);
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    watchScroll(m, isSurvey);
  }

  // ---------- reading components ----------
  function decorateProse(prose) {
    let sectionKind = '';
    Array.from(prose.children).forEach(el => {
      if (el.tagName === 'H2') {
        const text = el.textContent.toLowerCase();
        sectionKind = /further reading|references|sources/.test(text) ? 'reference-content' : /summary|key takeaways/.test(text) ? 'summary-content' : /misconception/.test(text) ? 'misconception-content' : '';
        el.classList.add('section-heading');
      }
      if (sectionKind) el.classList.add(sectionKind);
    });
  }
  function prepareTables(prose) {
    const wrappers = $$('.table-scroll', prose);
    function update() {
      wrappers.forEach((wrapper, i) => {
        const overflow = wrapper.scrollWidth > wrapper.clientWidth + 1;
        if (overflow) {
          let heading = wrapper.previousElementSibling;
          while (heading && !/^H[23]$/.test(heading.tagName)) heading = heading.previousElementSibling;
          const caption = $('caption', wrapper)?.textContent || heading?.textContent || 'Table ' + (i + 1);
          wrapper.setAttribute('tabindex', '0'); wrapper.setAttribute('role', 'region');
          wrapper.setAttribute('aria-label', caption + ' — scroll horizontally for more columns');
        } else {
          wrapper.removeAttribute('tabindex'); wrapper.removeAttribute('role'); wrapper.removeAttribute('aria-label');
        }
      });
    }
    const observer = new ResizeObserver(update);
    wrappers.forEach(wrapper => { observer.observe(wrapper); const table = $('table', wrapper); if (table) observer.observe(table); });
    update(); activeCleanups.push(() => observer.disconnect());
  }
  function renderChapterTools(m, prose, base, n) {
    const visuals = $$('.section-figure, .widget[data-widget]', prose);
    visuals.forEach((figure, i) => { if (!figure.id) figure.id = 'visual-' + (i + 1); });
    const bar = ctxBase.h('div', { class: 'chapter-tools' });
    const outline = ctxBase.h('details', { class: 'chapter-outline' });
    outline.append(ctxBase.h('summary', null, 'In this chapter', ctxBase.h('span', { 'aria-hidden': 'true' }, '⌄')));
    const links = ctxBase.h('nav', { 'aria-label': 'Chapter sections' });
    m.toc.filter(t => t.depth === 2).forEach(t => links.append(ctxBase.h('a', { href: base + pad(n) + '/' + t.id }, t.text)));
    outline.append(links); bar.append(outline);
    if (visuals.length) bar.append(ctxBase.h('a', { class: 'visual-jump', href: base + pad(n) + '/' + visuals[0].id }, ctxBase.h('span', { class: 'visual-symbol', 'aria-hidden': 'true' }, '◈'), visuals.length + ' visuals to explore', ctxBase.h('span', { 'aria-hidden': 'true' }, '↓')));
    bar.append(ctxBase.h('div', { class: 'reading-status' }, ctxBase.h('span', { class: 'reading-label' }, 'Reading progress'), ctxBase.h('b', { id: 'reading-percent' }, '0%')));
    return bar;
  }
  function renderChapterRail(m, base, n, isSurvey) {
    const rail = $('#rail'); rail.innerHTML = '';
    rail.append(ctxBase.h('div', { class: 'rail-top' }, ctxBase.h('h5', null, isSurvey ? 'In this chapter' : 'In this module'), ctxBase.h('span', null, m.toc.filter(t => t.depth === 2).length + ' sections')));
    const toc=ctxBase.h('nav', { class: 'toc', 'aria-label': 'On this page' });
    let group = null, groupId = '';
    m.toc.forEach(t => {
      if (t.depth === 2 || !group) { groupId=t.id; group=ctxBase.h('div', { class: 'toc-group', 'data-section': groupId }); toc.append(group); }
      const numbered = t.depth === 2 ? t.text.match(/^(\d+(?:\.\d+)*)(?:[.)])\s+/) : null;
      group.append(ctxBase.h('a', { href: base + pad(n) + '/' + t.id, class: 'd' + t.depth, 'data-id': t.id, 'data-section': groupId }, t.depth===2 ? ctxBase.h('span', { class:'toc-number', 'aria-hidden': 'true' }, numbered ? numbered[1].padStart(2, '0') : '·') : null, ctxBase.h('span',null,numbered ? t.text.slice(numbered[0].length) : t.text)));
    }); rail.append(toc);
    rail.append(ctxBase.h('div', { class: 'rail-bottom' }, ctxBase.h('span', null, 'Follow your curiosity.'), ctxBase.h('a', { href: '#/home' }, 'Return to the atlas ↗')));
  }
  // Scroll spy uses document positions because figures and prose may contain nested elements.
  let spyHandler = null;
  let spyFrame = null;
  function watchScroll(m, isSurvey) {
    if (spyHandler) window.removeEventListener('scroll', spyHandler);
    const knownHeadings = new Set(m.toc.map(heading => heading.id));
    const heads = $$('.prose h2[id], .prose h3[id]').filter(heading => knownHeadings.has(heading.id));
    let queued=false;
    function update() {
      queued=false; spyFrame=null;
      const y = window.scrollY + 140;
      let cur = heads[0]?.id, section=heads.find(h=>h.tagName==='H2')?.id;
      heads.forEach(h => { if (h.getBoundingClientRect().top + window.scrollY <= y) { cur=h.id; if(h.tagName==='H2')section=h.id; } });
      $$('#rail .toc a').forEach(a => { const active=a.dataset.id===cur; a.classList.toggle('active',active); if(active)a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
      $$('#rail .toc-group').forEach(g=>g.classList.toggle('in-view',g.dataset.section===section));
      const doc=document.documentElement;
      const percentage=Math.min(100,Math.max(0,Math.round(100*window.scrollY/Math.max(1,doc.scrollHeight-window.innerHeight))));
      const progress=$('#reading-percent'); if(progress)progress.textContent=percentage+'%';
      document.documentElement.style.setProperty('--reading-progress',percentage+'%');
      const nearEnd=(window.scrollY+window.innerHeight)/doc.scrollHeight>0.9;
      if(isSurvey) { if(!state.sread[m.n]&&nearEnd){state.sread[m.n]=true;store.set('sread',state.sread);renderSidebar();markSidebarPage('#/s/'+pad(m.n));} return; }
      if(!state.read[m.n]&&nearEnd){state.read[m.n]=true;store.set('read',state.read);renderProgress();}
    }
    spyHandler=()=>{if(!queued){queued=true;spyFrame=requestAnimationFrame(update);}};
    window.addEventListener('scroll',spyHandler,{passive:true});update();
  }

  // ---------- quiz ----------
  function renderQuiz(m) {
    const qs = m.quiz.questions;
    const box = ctxBase.h('section', { class: 'quiz' });
    const score = ctxBase.h('span', { class: 'score' });
    box.append(ctxBase.h('div', { class: 'quiz-head' }, ctxBase.h('div', null, ctxBase.h('span', { class: 'eyebrow' }, 'PUT IT TOGETHER'), ctxBase.h('h3', null, 'Check your understanding')), score));
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
    let sel = -1, returnFocus = $('#main');
    document.addEventListener('focusin', e => { if (!e.target.closest('.search')) returnFocus = e.target; });
    inp.setAttribute('role', 'combobox');
    inp.setAttribute('aria-autocomplete', 'list');
    inp.setAttribute('aria-controls', res.id);
    inp.setAttribute('aria-expanded', 'false');
    res.setAttribute('role', 'listbox');
    res.setAttribute('aria-label', 'Search results');
    function hide() { res.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); sel = -1; }
    function highlight(text, query) {
      const span = ctxBase.h('span', { class: 'ctx' });
      let from = 0, at;
      const lower = text.toLowerCase(), needle = query.trim().toLowerCase();
      while (needle && (at = lower.indexOf(needle, from)) !== -1) {
        span.append(document.createTextNode(text.slice(from, at)), ctxBase.h('mark', null, text.slice(at, at + needle.length)));
        from = at + needle.length;
      }
      span.append(document.createTextNode(text.slice(from)));
      return span;
    }
    function show() {
      const q = inp.value, hits = search(q); sel = -1;
      res.replaceChildren(); inp.removeAttribute('aria-activedescendant');
      if (!hits.length) { hide(); return; }
      hits.forEach((h, i) => res.append(ctxBase.h('a', { href: h.href, id: 'search-hit-' + i, role: 'option', 'aria-selected': 'false', tabindex: '-1' },
        ctxBase.h('span', { class: 'kind' }, h.kind), (h.base === '#/s/' ? 'S' + h.m.n : pad(h.m.n)) + ' ' + h.m.title, highlight(h.text, q))));
      res.hidden = false; inp.setAttribute('aria-expanded', 'true');
    }
    function select(items, index) {
      sel = index;
      items.forEach((a, i) => { a.classList.toggle('sel', i === sel); a.setAttribute('aria-selected', String(i === sel)); });
      if (items[sel]) { inp.setAttribute('aria-activedescendant', items[sel].id); items[sel].scrollIntoView({ block: 'nearest' }); }
    }
    inp.addEventListener('input', show);
    inp.addEventListener('focus', show);
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (res.hidden) show();
        const items = $$('a', res);
        select(items, e.key === 'ArrowDown' ? Math.min(items.length - 1, sel + 1) : Math.max(0, sel - 1));
        e.preventDefault();
      } else if (e.key === 'Enter' && !res.hidden) {
        const items = $$('a', res), a = items[sel] || items[0];
        if (a) { e.preventDefault(); a.click(); }
      } else if (e.key === 'Escape') { hide(); inp.blur(); if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true }); e.preventDefault(); }
      else if (e.key === 'Tab') hide();
    });
    document.addEventListener('click', e => { if (!e.target.closest('.search')) hide(); });
    res.addEventListener('click', e => { if (e.target.closest('a')) { hide(); inp.blur(); } });
    document.addEventListener('keydown', e => {
      const active = document.activeElement;
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && active !== inp && !active.isContentEditable && !/input|textarea|select/i.test(active.tagName)) {
        e.preventDefault(); inp.focus(); inp.select();
      }
    });
  }

  // ---------- sidebar (mobile) ----------
  const mobileSidebar = window.matchMedia('(max-width: 860px)');
  let previousBodyOverflow = null;
  function sidebarFocusables() { return [$('#menu'), ...$$('#sidebar a[href], #sidebar button')].filter(el => !el.disabled && el.getClientRects().length); }
  function closeSidebar() {
    $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('show');
    $('#sidebar').inert = mobileSidebar.matches;
    $('#menu').setAttribute('aria-expanded', 'false'); $('#menu').setAttribute('aria-label', 'Open curriculum');
    $$('#main, #rail, .topbar > :not(#menu)').forEach(el => { el.inert = false; });
    if (previousBodyOverflow != null) { document.body.style.overflow = previousBodyOverflow; previousBodyOverflow = null; }
  }
  function setupChrome() {
    $('.skip-link').addEventListener('click', e => { e.preventDefault(); $('#main').focus(); $('#main').scrollIntoView(); });
    $('#menu').addEventListener('click', () => {
      if ($('#sidebar').classList.contains('open')) { closeSidebar(); return; }
      $('#sidebar').classList.add('open'); $('#scrim').classList.add('show'); $('#sidebar').inert = false;
      $('#menu').setAttribute('aria-expanded', 'true'); $('#menu').setAttribute('aria-label', 'Close curriculum');
      if (mobileSidebar.matches) {
        $$('#main, #rail, .topbar > :not(#menu)').forEach(el => { el.inert = true; });
        previousBodyOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
        ($('#sidebar a.active') || $('#sidebar a')).focus();
      }
    });
    mobileSidebar.addEventListener('change', closeSidebar);
    document.addEventListener('keydown', e => {
      if (!mobileSidebar.matches || !$('#sidebar').classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeSidebar(); $('#menu').focus(); }
      else if (e.key === 'Tab') {
        const items = sidebarFocusables(), first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $('#scrim').addEventListener('click', () => { closeSidebar(); $('#menu').focus(); });
    // Re-selecting the current chapter or section still performs the requested jump.
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = link.getAttribute('href');
      if (href === location.hash && /^#\/(?:m|s)\/\d+(?:\/.*)?$/.test(href)) { e.preventDefault(); route(); }
    });
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
