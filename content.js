// Proceed from here

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // console.log('Message received', request);
  if (request.action === 'get_selected_text') {
    const selection = getSelectedText();
    sendResponse({ text: selection });
  } else if (request.action === 'replace_selected_text') {
    const text = request.text;
    replaceSelectedText(text);
    sendResponse({ success: true });
  }
});

function getFromLocalStorage(key) {
  return new Promise((resolve, _rej) => {
    chrome.storage.local.get(key, async (entry) => {
      const result = entry[key];
      resolve(result);
    });
  });
}

function replaceSelectedText(html) {
  if (!window.getSelection) return '';
  const sel = window.getSelection();
  const current = sel.toString();
  if (!current) return;

  // Delete current selection
  if (!sel || sel.rangeCount < 1) return '';
  const range = sel?.getRangeAt(0);
  range?.deleteContents();

  // Paste formatted
  const el = document.createElement('div');
  el.innerHTML = html;
  let frag = document.createDocumentFragment(),
    node,
    lastNode;
  while ((node = el.firstChild)) {
    lastNode = frag.appendChild(node);
  }
  range.insertNode(frag);
}

function getSelectedText() {
  if (window.getSelection) {
    const sel = window.getSelection()?.toString();
    if (sel) return sel;
  }
  if (window.document.getSelection) {
    const sel = window.document.getSelection()?.toString();
    if (sel) return sel;
  }
  if (window.document.selection) {
    const sel = window.document.selection.createRange().text;
    if (sel) return sel;
  }
  return '';
}

/*
// Source: https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div

function pasteHtmlAtCaret(html) {
  let sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      const el = document.createElement('div');
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
    }
  }
}*/
