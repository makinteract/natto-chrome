export async function setBadge({ text, color }) {
  const tabId = await getTabId();
  if (!tabId) return;
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({
    tabId,
    text,
  });
}

export function resetBadge() {
  setBadge({ text: '', color: '#000' });
}

export async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
}

async function getTabId() {
  const tab = await getActiveTab();
  return tab.id;
}

export async function sendMessageToContent(message: Object) {
  // Promisify the call
  const tabId = await getTabId();
  if (!tabId) return;
  return new Promise((resolve, _) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      resolve(response);
    });
  });
}

export async function getURL() {
  const tab = await getActiveTab();
  return tab.url;
}

export function replaceSelectedText(replacementText: string) {
  if (!window.getSelection) return '';
  const sel = window.getSelection();
  const range = sel?.getRangeAt(0);
  range?.deleteContents();
  range?.insertNode(document.createTextNode(replacementText));
}

export function getSelection() {
  return window.getSelection()?.toString();
}

export function getDocTitle() {
  return document.title;
}
