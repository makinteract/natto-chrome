import { getPrompt, getMessage } from '@makinteract/openai-chains';

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

// export async function sendMessageToContent(message: Object) {
//   // Promisify the call
//   const tabId = await getTabId();
//   if (!tabId) return;
//   return new Promise((resolve, reject) => {
//     chrome.tabs.sendMessage(tabId, message, function (response) {
//       resolve(response);
//     });
//   });
// }

export async function sendMessageToContent(message: Object) {
  const tabId = await getTabId();
  if (!tabId) return;
  let frames = await chrome.webNavigation.getAllFrames({ tabId: tabId });
  let promises: any[] = [];
  frames?.forEach((f) => {
    let promise = chrome.tabs.sendMessage(tabId, message, {
      frameId: f.frameId,
    });
    promises.push(promise);
  });

  return Promise.all(promises);
}

export async function getURL() {
  const tab = await getActiveTab();
  return tab.url;
}

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

export function getFromLocalStorage(key: string) {
  return new Promise((resolve, _rej) => {
    chrome.storage.local.get(key, async (entry) => {
      const result = entry[key];
      resolve(result);
    });
  });
}

// API calls
export async function fixGrammar(apiKey: string, model: string, text: string) {
  const prompt = await getPrompt({ model, apiKey });
  const response = await prompt(`
        Fix the typos, punctuation and lettercase of this text. 
        Keep the same language, tone and style. 
        Do not add any text that is not there. 
        If the sentence is already correct, just leave it.
        If the sentence cannot be fixed, just leave it as it is.
        If no text is provided, just leave it as it is.
        Do not provide explanations or comments.
        Output the code as HTML, with corresponding tags for each element to maintain the original formatting,
        but do not add any additional formatting such as markdown, and do not write something like "Here the text" or do not use markings to indicate the HTML code is starting.

        Here the text:${text}`).then(getMessage);
  return response.content;
}

export async function elaborate(apiKey: string, model: string, text: string) {
  const prompt = await getPrompt({ model, apiKey });
  const response = await prompt(`
        Elaborate on the following text with more details. Provide more background or information. 
        Expand on the ideas, but keep the length of the final text similar in length to the input of the text below.
        If a list of bullet points is provided, expand on each point in a paragraph.
        Keep the same language.
        If no text is provided, just leave it as it is.
        Output the code as HTML, with corresponding tags for each element to maintain the original formatting,
        but do not add any additional formatting such as markdown, and do not write something like "Here the text" or do not use markings to indicate the HTML code is starting.

        Here the text:${text}`).then(getMessage);
  return response.content;
}

export async function rewrite(apiKey: string, model: string, text: string) {
  const prompt = await getPrompt({ model, apiKey });
  const response = await prompt(`
        Paraphrase this text. Rewrite it with different words but keep the same length. 
        Keep the same language. If no text is provided, just leave it as it is.
        Output the code as HTML, with corresponding tags for each element to maintain the original formatting,
        but do not add any additional formatting such as markdown, and do not write something like "Here the text" or do not use markings to indicate the HTML code is starting.

        Here the text:${text}`).then(getMessage);
  return response.content;
}

export async function summarize(apiKey: string, model: string, text: string) {
  const prompt = await getPrompt({ model, apiKey });
  const response = await prompt(`
        Summarize the following text. Keep the same language.
        If no text is provided, just leave it as it is.
        Output the code as HTML, with corresponding tags for each element to maintain the original formatting,
        but do not add any additional formatting such as markdown, and do not write something like "Here the text" or do not use markings to indicate the HTML code is starting.

        Here the text:${text}`).then(getMessage);
  return response.content;
}

export async function translate(
  apiKey: string,
  model: string,
  text: string,
  language: string
) {
  const prompt = await getPrompt({ model, apiKey });
  const response = await prompt(`
      Translate the text in the ${language} language.
      Do not modify the text, its meaning or its tone.
      If no text is provided, just leave it as it is.
      Output the code as HTML, with corresponding tags for each element to maintain the original formatting,
      but do not add any additional formatting such as markdown, and do not write something like "Here the text" or do not use markings to indicate the HTML code is starting.

      Here the text:${text}`).then(getMessage);
  return response.content;
}
