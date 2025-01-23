// Proceed from here

// console.log('Content script loaded');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Message received', request);
  if (request.action === 'fix_grammar') {
    chrome.storage.local.get('natto_apikey', async (result) => {
      const apikey = result.natto_apikey;
      console.log('apikey', apikey);
    });
  }
});
