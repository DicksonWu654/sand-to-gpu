/* A reading aid that prepares context for the reader's own ChatGPT session. */
(function () {
  'use strict';
  const CHATGPT = 'https://chatgpt.com/';
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function button(className, text) {
    const node = el('button', className, text); node.type = 'button'; return node;
  }
  function mount({ prose, toolbar, title, lessonKey }) {
    if (!window.CourseStudyContext || !prose || !toolbar) return () => {};
    const listeners = [];
    const on = (node, event, fn, options) => {
      node.addEventListener(event, fn, options);
      listeners.push(() => node.removeEventListener(event, fn, options));
    };
    let destroyed = false, timer = 0, feedbackTimer = 0, snapshot = null, selectionSnapshot = null;
    let savedRange = null, returnFocus = null, intent = 'explain', revision = 0;
    const capture = () => CourseStudyContext.capture({ prose, title, lessonKey });
    const launch = button('study-launch', 'Ask ChatGPT');
    launch.title = 'Ask about selected text, or the paragraph currently in view';
    launch.setAttribute('aria-haspopup', 'dialog');
    toolbar.append(launch);
    const floating = button('study-selection-action', 'Ask ChatGPT ↗');
    floating.hidden = true; floating.setAttribute('aria-haspopup', 'dialog');
    document.body.append(floating);
    const dialog = el('dialog', 'study-dialog');
    dialog.setAttribute('aria-labelledby', 'study-dialog-title');
    dialog.setAttribute('aria-describedby', 'study-dialog-description');
    const head = el('div', 'study-head');
    const identity = el('div');
    identity.append(el('span', 'study-eyebrow', 'A question worth exploring'));
    const heading = el('h2', '', 'Ask ChatGPT'); heading.id = 'study-dialog-title';
    identity.append(heading);
    const close = button('study-close', '×'); close.setAttribute('aria-label', 'Close Ask ChatGPT');
    head.append(identity, close);
    const description = el('p', 'study-description', 'Prepare a question with context from your reading. Copy it, open ChatGPT, then paste it into a chat.');
    description.id = 'study-dialog-description';
    const section = el('p', 'study-section');
    const quote = el('blockquote', 'study-quote');
    quote.tabIndex = 0; quote.setAttribute('aria-label', 'Captured course passage');
    const questionLabel = el('label', 'study-label', 'What would you like to understand?');
    questionLabel.htmlFor = 'study-question';
    const question = el('textarea', 'study-question'); question.id = 'study-question'; question.rows = 2;
    question.placeholder = 'For example: Why does this step matter for the finished chip?';
    question.maxLength = 2000;
    const quicks = el('div', 'study-quicks'); quicks.setAttribute('aria-label', 'Ways to explore');
    const choices = [['explain', 'Explain simply'], ['deeper', 'Go deeper'], ['analogy', 'Give an analogy'], ['check', 'Test my understanding']];
    choices.forEach(([value, label]) => {
      const b = button('study-quick', label); b.dataset.intent = value;
      b.setAttribute('aria-pressed', String(value === intent));
      on(b, 'click', () => { intent = value; update(); }); quicks.append(b);
    });
    const contextLabel = el('label', 'study-context-label');
    const context = el('input', 'study-context-toggle'); context.type = 'checkbox'; context.checked = true;
    contextLabel.append(context, el('span', '', 'Include nearby explanation'));
    const previewDetails = el('details', 'study-preview-details');
    const summary = el('summary', '', 'Preview exactly what you’ll copy');
    const preview = el('textarea', 'study-preview'); preview.readOnly = true; preview.rows = 8;
    preview.setAttribute('aria-label', 'Complete draft to copy');
    preview.spellcheck = false;
    previewDetails.append(summary, preview);
    const status = el('p', 'study-status'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    const actions = el('div', 'study-actions');
    const copyOpen = button('study-copy-open', 'Copy & open ChatGPT ↗');
    const copy = button('study-copy', 'Copy'); actions.append(copyOpen, copy);
    const footer = el('p', 'study-footer', 'Paste the draft in ChatGPT when it opens. Nothing is sent automatically. ');
    const openLink = el('a', 'study-open-link', 'Open ChatGPT ↗');
    openLink.href = CHATGPT; openLink.target = '_blank'; openLink.rel = 'noopener noreferrer';
    footer.append(openLink);
    dialog.append(head, description, section, quote, questionLabel, question, quicks, contextLabel, previewDetails, status, actions, footer);
    document.body.append(dialog);

    function update() {
      if (!snapshot) return;
      revision++;
      preview.value = CourseStudyContext.compose(snapshot, { question: question.value, intent, includeContext: context.checked });
      quicks.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.intent === intent)));
      status.textContent = '';
    }
    function open(fromSelection) {
      const candidate = fromSelection ? selectionSnapshot : capture();
      if (!candidate) {
        launch.textContent = 'Select prose within one section';
        clearTimeout(feedbackTimer); feedbackTimer = setTimeout(() => { launch.textContent = 'Ask ChatGPT'; }, 2200);
        return;
      }
      snapshot = candidate;
      const selection = window.getSelection();
      savedRange = selection && selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
      returnFocus = fromSelection ? floating : launch;
      section.textContent = (candidate.title || title) + (candidate.sectionTitle ? ' · ' + candidate.sectionTitle : '');
      quote.textContent = candidate.passage;
      question.value = ''; intent = 'explain'; context.checked = true;
      previewDetails.open = false; update(); floating.hidden = true;
      prose.dispatchEvent(new CustomEvent('course-study-open'));
      dialog.showModal(); question.focus({ preventScroll: true });
    }
    function restore() {
      revision++;
      if (destroyed) return;
      if (savedRange && savedRange.startContainer.isConnected && savedRange.endContainer.isConnected) {
        const selection = window.getSelection();
        selection.removeAllRanges(); selection.addRange(savedRange);
      }
      showSelection();
      const focus = returnFocus === floating && floating.hidden ? launch : returnFocus;
      if (focus && focus.isConnected) focus.focus({ preventScroll: true });
    }
    function showSelection() {
      if (destroyed || dialog.open) return;
      const selection = window.getSelection();
      floating.hidden = true; selectionSnapshot = null;
      if (!selection || selection.isCollapsed || !selection.rangeCount || !selection.toString().trim()) return;
      const range = selection.getRangeAt(0);
      if (!prose.contains(range.startContainer) || !prose.contains(range.endContainer)) return;
      const candidate = capture();
      if (!candidate || !candidate.selectionUsed) return;
      const rect = range.getBoundingClientRect();
      if (rect.bottom < 70 || rect.top > innerHeight) return;
      selectionSnapshot = candidate; floating.hidden = false;
      // Touch selection handles remain native; place the action at a fixed edge, not next to them.
      if (matchMedia('(pointer: coarse)').matches) {
        floating.style.top = '78px'; floating.style.left = 'auto'; floating.style.right = '12px';
      } else {
        const width = floating.offsetWidth;
        floating.style.left = Math.max(12, Math.min(innerWidth - width - 12, rect.left)) + 'px';
        floating.style.right = 'auto';
        floating.style.top = Math.max(76, Math.min(innerHeight - 56, rect.bottom + 12)) + 'px';
      }
    }
    function scheduleSelection() { clearTimeout(timer); timer = setTimeout(showSelection, 180); }
    async function copyDraft(openChat) {
      const draft = preview.value, ticket = ++revision;
      let pending;
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        pending = navigator.clipboard.writeText(draft);
      } catch (error) { pending = Promise.reject(error); }
      // Open during this click, before awaiting clipboard permissions. No prompt enters the URL.
      if (openChat) { try { window.open(CHATGPT, '_blank', 'noopener,noreferrer'); } catch (_) {} }
      try {
        await pending;
        if (destroyed || !dialog.open || ticket !== revision) return;
        status.textContent = openChat ? 'Copied. Paste the draft into ChatGPT. If no tab opened, use Open ChatGPT below.' : 'Copied. Your draft is ready to paste.';
      } catch (_) {
        if (destroyed || !dialog.open || ticket !== revision) return;
        previewDetails.open = true; preview.focus(); preview.select();
        status.textContent = 'Clipboard access is unavailable. Copy the selected draft manually, then use Open ChatGPT below.';
      }
    }
    on(launch, 'pointerdown', event => { if (event.button === 0) event.preventDefault(); });
    on(floating, 'pointerdown', event => { if (event.button === 0) event.preventDefault(); });
    on(launch, 'click', () => open(false)); on(floating, 'click', () => open(true));
    on(close, 'click', () => dialog.close()); on(dialog, 'close', restore);
    on(question, 'input', update); on(context, 'change', update);
    on(copy, 'click', () => copyDraft(false)); on(copyOpen, 'click', () => copyDraft(true));
    on(document, 'selectionchange', scheduleSelection);
    on(document, 'pointerup', scheduleSelection);
    on(window, 'scroll', scheduleSelection, { passive: true });
    on(window, 'resize', scheduleSelection, { passive: true });
    return () => {
      destroyed = true; revision++; clearTimeout(timer); clearTimeout(feedbackTimer);
      listeners.forEach(remove => remove());
      if (dialog.open) dialog.close();
      dialog.remove(); floating.remove(); launch.remove();
      snapshot = null; selectionSnapshot = null; savedRange = null;
    };
  }
  window.CourseStudyAssist = Object.freeze({ mount });
})();
