// background.js

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (!message.ready) return;

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      const tab = tabs[0];
      if (tab.url?.startsWith('chrome://')) return;
      // Injecting
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });
    }
  );
});
