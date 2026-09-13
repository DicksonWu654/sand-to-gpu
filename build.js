// Build script: course/modules/*.md + course/quizzes/*.json  ->  site/content.js
// Usage: node build.js
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = __dirname;
const MOD_DIR = path.join(ROOT, 'course', 'modules');
const QUIZ_DIR = path.join(ROOT, 'course', 'quizzes');
const SURVEY_DIR = path.join(ROOT, 'course', 'survey');
const OUT = path.join(ROOT, 'site', 'content.js');
const WIDGET_MAP = path.join(ROOT, 'site', 'widget-placement.json');

const PARTS = [
  { id: 'I', title: 'Raw Materials & Wafers', modules: [0, 1, 2, 3, 4] },
  { id: 'II', title: 'The Front End: The Fab', modules: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
  { id: 'III', title: 'Memory', modules: [15] },
  { id: 'IV', title: 'The Back End: Packaging, Test, System', modules: [16, 17, 18, 19] },
  { id: 'V', title: 'The Ecosystem', modules: [20, 21] },
];

function decode(s) { return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'); }
function plainCell(s) { return decode(s.replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/`/g, '')); }
function slugify(s) {
  return s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

// Custom renderer: heading ids, table wrapping, external links
function makeRenderer(toc, idSet) {
  const r = new marked.Renderer();
  r.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = decode(text.replace(/<[^>]+>/g, ''));
    let id = slugify(plain) || 'section';
    let base = id, k = 2;
    while (idSet.has(id)) id = `${base}-${k++}`;
    idSet.add(id);
    if (depth === 2 || depth === 3) toc.push({ depth, id, text: plain });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  r.table = function (token) {
    let header = '';
    let cell = '';
    for (let j = 0; j < token.header.length; j++) cell += this.tablecell(token.header[j]);
    header += this.tablerow({ text: cell });
    let body = '';
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      cell = '';
      for (let k = 0; k < row.length; k++) cell += this.tablecell(row[k]);
      body += this.tablerow({ text: cell });
    }
    if (body) body = `<tbody>${body}</tbody>`;
    return `<div class="table-scroll"><table><thead>${header}</thead>${body}</table></div>\n`;
  };
  r.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const t = title ? ` title="${title}"` : '';
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${t}${ext}>${text}</a>`;
  };
  r.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens);
    const cls = /<strong>\s*(Worked example|By the numbers)/i.test(body) ? 'callout worked' : 'callout';
    return `<aside class="${cls}">${body}</aside>\n`;
  };
  return r;
}

// Convert the small subset of inline LaTeX the authors used ($...$) into HTML/Unicode.
// A $...$ span is treated as math only if it contains a backslash, ^ or _ (money never does).
const GREEK = { lambda: 'λ', pi: 'π', mu: 'µ', delta: 'δ', Delta: 'Δ', theta: 'θ', alpha: 'α', beta: 'β', gamma: 'γ', sigma: 'σ', rho: 'ρ', phi: 'φ', omega: 'ω', epsilon: 'ε', tau: 'τ', eta: 'η', nu: 'ν', kappa: 'κ' };
const SYM = { times: '×', approx: '≈', cdot: '·', pm: '±', leq: '≤', geq: '≥', le: '≤', ge: '≥', neq: '≠', ne: '≠', propto: '∝', infty: '∞', to: '→', rightarrow: '→', sim: '~', ll: '≪', gg: '≫', cos: 'cos', sin: 'sin', exp: 'exp', ln: 'ln', log: 'log' };
function convertMath(md) {
  return md.replace(/\$([^$\n]{1,200})\$/g, (whole, inner) => {
    if (!/[\\^_]/.test(inner) && !/^[A-Za-z]{1,3}$/.test(inner.trim())) return whole;
    let s = inner;
    s = s.replace(/\\mu\s*m\b/g, 'µm');
    s = s.replace(/\\(?:tfrac|frac|dfrac)\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2');
    s = s.replace(/\\text\{([^{}]*)\}/g, '$1');
    s = s.replace(/\\mathrm\{([^{}]*)\}/g, '$1');
    s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
    s = s.replace(/\\([A-Za-z]+)/g, (m, name) => GREEK[name] || SYM[name] || m);
    s = s.replace(/\\[ ,;:!]/g, ' ');
    s = s.replace(/\\%/g, '%');
    s = s.replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>').replace(/\^([A-Za-z0-9+\-]+)/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>').replace(/_([A-Za-z0-9]+)/g, '<sub>$1</sub>');
    s = s.replace(/\{|\}/g, '').replace(/\s{2,}/g, ' ').trim();
    return `<span class="math">${s}</span>`;
  });
}

function extractKeyNumbers(md) {
  // Grab first table under "## Key Numbers"
  const m = md.match(/## Key Numbers[\s\S]*?\n((?:\|.*\n?)+)/);
  if (!m) return [];
  const lines = m[1].trim().split('\n').filter(l => l.trim().startsWith('|'));
  if (lines.length < 3) return [];
  const cells = l => l.split('|').slice(1, -1).map(c => c.trim());
  const rows = lines.slice(2).map(cells).filter(r => r.length >= 2);
  return rows.slice(0, 20).map(r => ({ k: plainCell(r[0]), v: plainCell(r[1]), note: plainCell(r[2] || '') }));
}

function insertWidgets(html, placements) {
  // placements: [{widget, before: 'heading id or text regex', or: 'after-intro'}]
  for (const p of placements || []) {
    const tag = `<div class="widget" data-widget="${p.widget}"${p.title ? ` data-title="${p.title}"` : ''}></div>\n`;
    if (p.at === 'after-intro') {
      // after first paragraph that follows the H1
      const i = html.indexOf('</p>');
      if (i >= 0) { html = html.slice(0, i + 4) + '\n' + tag + html.slice(i + 4); continue; }
    }
    if (p.before) {
      const re = new RegExp(`<h[23] id="[^"]*">[^<]*(?:${p.before})`);
      const m = html.match(re);
      if (m) { html = html.slice(0, m.index) + tag + html.slice(m.index); continue; }
    }
    // fallback: after intro
    const i = html.indexOf('</p>');
    html = html.slice(0, i + 4) + '\n' + tag + html.slice(i + 4);
  }
  return html;
}

function buildOne(md, n, slug, placement, quizPath) {
  md = md.replace(/\r\n/g, '\n');
  const titleM = md.match(/^#\s+(?:Module|Survey)\s+\d+:\s*(.+)$/m) || md.match(/^#\s+(.+)$/m);
  const title = titleM ? titleM[1].trim() : slug;
  md = md.replace(/^#\s+.+\n/, ''); // strip H1, rendered by shell
  const keyNumbers = extractKeyNumbers(md);
  md = convertMath(md);
  // Authors use "~" for "approximately"; stop GFM treating single tildes as strikethrough.
  md = md.split('\n').map(line => /^\s*```/.test(line) ? line : line.replace(/(^|[^\~])~(?!~)/g, '$1\~')).join('\n');
  const toc = [];
  const idSet = new Set();
  marked.use({ gfm: true, renderer: makeRenderer(toc, idSet) });
  let html = marked.parse(md);
  html = html.replace(/\~/g, '~'); // escapes survive only inside code blocks; restore them
  html = insertWidgets(html, placement);
  const words = md.split(/\s+/).filter(Boolean).length;
  let quiz = null;
  if (quizPath && fs.existsSync(quizPath)) {
    try { quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8').replace(/^﻿/, '')); } catch (e) { console.warn('bad quiz json', quizPath, e.message); }
  }
  return { n, slug, title, html, toc, words, quiz, keyNumbers };
}

function build() {
  const placements = fs.existsSync(WIDGET_MAP) ? JSON.parse(fs.readFileSync(WIDGET_MAP, 'utf8')) : {};
  const files = fs.readdirSync(MOD_DIR).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
  const modules = [];
  for (const f of files) {
    const n = parseInt(f.slice(0, 2), 10);
    const slug = f.slice(3, -3);
    const m = buildOne(fs.readFileSync(path.join(MOD_DIR, f), 'utf8'), n, slug, placements[String(n)], path.join(QUIZ_DIR, f.replace(/\.md$/, '.json')));
    const part = PARTS.find(p => p.modules.includes(n));
    m.part = part ? part.id : 'V';
    modules.push(m);
    console.log(`module ${String(n).padStart(2, '0')}  ${String(m.words).padStart(6)} words  ${m.toc.length} headings  quiz:${m.quiz ? m.quiz.questions.length : 0}  ${m.title}`);
  }
  const survey = [];
  if (fs.existsSync(SURVEY_DIR)) {
    for (const f of fs.readdirSync(SURVEY_DIR).filter(f => /^S\d\d-.*\.md$/.test(f)).sort()) {
      const n = parseInt(f.slice(1, 3), 10);
      const slug = f.slice(4, -3);
      const s = buildOne(fs.readFileSync(path.join(SURVEY_DIR, f), 'utf8'), n, slug, null, null);
      survey.push(s);
      console.log(`survey ${String(n).padStart(2, '0')}  ${String(s.words).padStart(6)} words  ${s.toc.length} headings  ${s.title}`);
    }
  }
  const payload = { parts: PARTS, modules, survey, built: new Date().toISOString() };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, 'window.COURSE = ' + JSON.stringify(payload) + ';\n');
  console.log(`wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB), total words ${modules.reduce((a, m) => a + m.words, 0)} + survey ${survey.reduce((a, m) => a + m.words, 0)}`);
}
build();
