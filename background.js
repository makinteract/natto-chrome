// background.js

const pastTabs = [];

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (!message.ready) return;

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    async function (tabs) {
      const tab = tabs[0];
      if (tab.url?.startsWith('chrome://')) return;
      const tabId = tab.id;
      if (pastTabs.includes(tabId)) return;
      pastTabs.push(tabId);
      // Injecting
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ['content.js'],
      });
    }
  );
});
