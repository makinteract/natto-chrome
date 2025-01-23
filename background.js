// background.js

// Load the content script on click
chrome.action.onClicked.addListener((tab) => {
  if (tab.url?.startsWith('chrome://')) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      updatePage(tab);
    });
  });
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  updatePage(tab);
});

function updatePage(tab) {
  if (tab.active) {
    if (tab.url?.startsWith('chrome://')) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js'],
    });
  }
}
