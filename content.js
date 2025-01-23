// Proceed from here

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Message received', request);
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

function replaceSelectedText(replacementText) {
  if (!window.getSelection) return '';
  const sel = window.getSelection();
  const range = sel?.getRangeAt(0);
  range?.deleteContents();
  range?.insertNode(document.createTextNode(replacementText));
}

function getSelectedText() {
  return window.getSelection()?.toString();
}
