/* Copy the complete authored chapter. No model, account or external window involved. */
(function () {
  'use strict';
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const button = (className, text) => {
    const node = el('button', className, text); node.type = 'button'; return node;
  };
  function mount({ prose, toolbar, title, lessonKey, markdown }) {
    if (!toolbar || typeof markdown !== 'string' || !markdown.trim()) return () => {};
    let destroyed = false, busy = false, request = 0, feedbackTimer = 0;
    let returnFocus = null, savedRanges = [];
    const listeners = [];
    const on = (node, event, fn) => { node.addEventListener(event, fn); listeners.push(() => node.removeEventListener(event, fn)); };
    const filename = 'sand-to-gpu-' + String(lessonKey).replace(/^#\//, '').replace(/[^a-z0-9]/gi, '') + '.md';
    const fileURL = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
    const download = className => {
      const link = el('a', className, 'Download Markdown ↓');
      link.href = fileURL; link.download = filename; return link;
    };
    const group = el('div', 'page-copy-tools');
    const copy = button('page-copy-button', 'Copy page for AI');
    copy.title = 'Copy this complete chapter as Markdown to paste into any AI chat';
    const file = download('page-copy-download'); file.textContent = 'Download Markdown'; file.setAttribute('aria-label', 'Download this chapter as Markdown');
    const status = el('span', 'page-copy-status'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    group.append(copy, file, status); toolbar.append(group);

    const dialog = el('dialog', 'page-copy-dialog');
    dialog.setAttribute('aria-labelledby', 'page-copy-title'); dialog.setAttribute('aria-describedby', 'page-copy-description');
    const head = el('div', 'page-copy-head');
    const heading = el('h2', '', 'Copy this page'); heading.id = 'page-copy-title';
    const close = button('page-copy-close', '×'); close.setAttribute('aria-label', 'Close Markdown'); head.append(heading, close);
    const description = el('p', 'page-copy-description', 'Automatic copying was blocked. Select all the text below and copy it, or download the Markdown file.');
    description.id = 'page-copy-description';
    const chapter = el('p', 'page-copy-chapter', title);
    const text = el('textarea', 'page-copy-text'); text.readOnly = true; text.spellcheck = false; text.value = markdown;
    text.setAttribute('aria-label', 'Complete chapter Markdown');
    const dialogStatus = el('p', 'page-copy-dialog-status'); dialogStatus.setAttribute('role', 'status');
    const actions = el('div', 'page-copy-actions');
    const selectAll = button('page-copy-select', 'Select all');
    const retry = button('page-copy-retry', 'Copy again');
    actions.append(selectAll, retry, download('page-copy-file'));
    dialog.append(head, description, chapter, text, dialogStatus, actions); document.body.append(dialog);

    function ranges() {
      const selection = window.getSelection();
      return selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
    }
    function restoreRanges(list) {
      const selection = window.getSelection(); if (!selection) return;
      selection.removeAllRanges();
      list.forEach(range => { if (range.startContainer.isConnected && range.endContainer.isConnected) selection.addRange(range); });
    }
    function selectText() { text.focus({ preventScroll: true }); text.select(); text.setSelectionRange(0, text.value.length); }
    function showManual() {
      if (destroyed) return;
      if (!dialog.open) {
        returnFocus = copy; savedRanges = ranges();
        prose?.dispatchEvent(new CustomEvent('course-reading-dialog-open'));
        dialog.showModal();
      }
      dialogStatus.textContent = 'Use your browser’s Copy command or Ctrl+C / ⌘C after selecting the text.';
      selectText();
    }
    function legacyCopy() {
      if (typeof document.execCommand !== 'function') return false;
      const focus = document.activeElement, selection = ranges();
      const inputSelection = focus && typeof focus.selectionStart === 'number' ? [focus.selectionStart, focus.selectionEnd] : null;
      const scratch = el('textarea', 'page-copy-scratch'); scratch.value = markdown; scratch.readOnly = true;
      scratch.setAttribute('aria-label', 'Copying chapter Markdown');
      (dialog.open ? dialog : document.body).append(scratch);
      let success = false;
      try {
        scratch.focus({ preventScroll: true }); scratch.select(); scratch.setSelectionRange(0, scratch.value.length);
        success = document.execCommand('copy') === true;
      } catch (_) { /* The visible text and download remain usable. */ }
      finally {
        scratch.remove(); restoreRanges(selection);
        if (focus?.isConnected) {
          focus.focus({ preventScroll: true });
          if (inputSelection) focus.setSelectionRange(...inputSelection);
        }
      }
      return success;
    }
    function finish(success, ticket) {
      if (destroyed || ticket !== request) return;
      busy = false; copy.disabled = retry.disabled = false;
      copy.textContent = success ? 'Copied!' : 'Copy page for AI';
      if (success) {
        status.textContent = 'Complete page copied. Paste it into your AI chat.';
        if (dialog.open) dialogStatus.textContent = 'Complete page copied. Paste it into your AI chat.';
        clearTimeout(feedbackTimer);
        feedbackTimer = setTimeout(() => { copy.textContent = 'Copy page for AI'; status.textContent = ''; }, 3500);
      } else {
        status.textContent = 'Copy manually or download Markdown.';
        showManual();
      }
    }
    function copyPage() {
      if (destroyed || busy) return;
      const ticket = ++request;
      busy = true; copy.disabled = retry.disabled = true; copy.textContent = 'Copying…';
      clearTimeout(feedbackTimer); status.textContent = '';
      let pending;
      // The text is loaded with the chapter; this call stays in the original click gesture.
      try {
        if (!navigator.clipboard?.writeText) { finish(legacyCopy(), ticket); return; }
        pending = navigator.clipboard.writeText(markdown);
      } catch (_) { finish(legacyCopy(), ticket); return; }
      Promise.resolve(pending).then(() => finish(true, ticket), () => {
        if (!destroyed && ticket === request) finish(legacyCopy(), ticket);
      });
    }
    on(copy, 'click', copyPage); on(retry, 'click', copyPage);
    on(selectAll, 'click', selectText); on(close, 'click', () => dialog.close());
    on(dialog, 'close', () => {
      request++; busy = false; copy.disabled = retry.disabled = false; copy.textContent = 'Copy page for AI';
      if (destroyed) return;
      restoreRanges(savedRanges);
      (returnFocus?.isConnected ? returnFocus : copy).focus({ preventScroll: true });
    });
    return () => {
      destroyed = true; request++; clearTimeout(feedbackTimer); listeners.forEach(remove => remove());
      if (dialog.open) dialog.close(); dialog.remove(); group.remove(); URL.revokeObjectURL(fileURL);
    };
  }
  window.CoursePageCopy = Object.freeze({ mount });
})();
