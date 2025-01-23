<script>
  import { onMount } from 'svelte';

  import Buttongroup from './components/buttongroup.svelte';
  import Header from './components/header.svelte';
  import Navi from './components/navi.svelte';
  import Select from './components/select.svelte';
  import Input from './components/input.svelte';
  import Toast from './components/toast.svelte';

  import {
    sendMessageToContent,
    getFromLocalStorage,
    fixGrammar,
    elaborate,
    rewrite,
    summarize,
    translate,
    setBadge,
  } from './utils';
  import { slide } from 'svelte/transition';

  import languages from './languages';

  let home = true; // false is option screen
  const ANIMATION_DURATION = 400; // animation between screens
  let language = 'English'; // default language
  let model = 'gpt-4o-mini'; // default model
  let apikey = 'sk-proj-TrU-RWW...';
  let toast;
  let processing = false;

  onMount(async () => {
    apikey = (await getFromLocalStorage('natto_apikey')) ?? apikey;
    model = (await getFromLocalStorage('natto_model')) ?? model;
    language =
      (await getFromLocalStorage('natto_translation_language')) ?? language;
  });

  function modifyText(command) {
    return async function () {
      let { text } = await sendMessageToContent({
        action: 'get_selected_text',
      });

      try {
        if (command == 'fix_grammar') {
          processing = true;
          text = await fixGrammar(apikey, model, text);
        } else if (command == 'elaborate') {
          processing = true;
          text = await elaborate(apikey, model, text);
        } else if (command == 'rewrite') {
          processing = true;
          text = await rewrite(apikey, model, text);
        } else if (command == 'summarize') {
          processing = true;
          text = await summarize(apikey, model, text);
        } else if (command == 'translate') {
          processing = true;
          text = await translate(apikey, model, text, language);
        } else throw new Error('Unable to perform this action');
      } catch (e) {
        toast.setMessage(e.substring(0, 40) + '...', false);
        return;
      }
      // Finalize the text
      await sendMessageToContent({
        action: 'replace_selected_text',
        text,
      });
      toast.setMessage('Done', true);
      processing = false;
    };
  }

  async function updateModel(event) {
    await chrome.storage.local.set({ natto_model: model });
  }

  async function updateLanguage(event) {
    await chrome.storage.local.set({ natto_translation_language: language });
  }

  async function updateAPIkey(event) {
    await chrome.storage.local.set({ natto_apikey: apikey });
    toast.setMessage('Updated', true);
  }
</script>

<div class="bg-base-100 ml-4 mr-4 w-80 h-96">
  <div class="mb-6">
    <Header {processing} />
  </div>

  {#if home}
    <div
      class="flex items-center justify-center"
      in:slide={{ axis: 'x', duration: ANIMATION_DURATION }}
    >
      <Buttongroup
        on:grammar={modifyText('fix_grammar')}
        on:elaborate={modifyText('elaborate')}
        on:rewrite={modifyText('rewrite')}
        on:summarize={modifyText('summarize')}
        on:translate={modifyText('translate')}
        {language}
      />
    </div>
  {:else}
    <div
      class="flex justify-center"
      in:slide={{ axis: 'x', duration: ANIMATION_DURATION }}
    >
      <div class="w-64 h-96">
        <div class="grid">
          <Select
            label="Pick a language"
            options={languages}
            bind:selection={language}
            on:change={updateLanguage}
          />
        </div>
        <div class="grid mt-4">
          <Select
            label="Pick a model"
            options={['gpt-4o-mini', 'gpt-4o']}
            bind:selection={model}
            on:change={updateModel}
          />
        </div>
        <div class="divider">Settings</div>
        <Input
          label="Input your API key"
          bind:value={apikey}
          on:change={updateAPIkey}
        />
      </div>
    </div>
  {/if}
  <Navi on:home={() => (home = true)} on:options={() => (home = false)} />
</div>

<Toast bind:this={toast} />
