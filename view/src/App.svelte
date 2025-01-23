<script lang="ts">
  import Buttongroup from './components/buttongroup.svelte';
  import Navi from './components/navi.svelte';
  import { sendMessageToContent } from './utils';
  import Header from './components/header.svelte';
  import { slide } from 'svelte/transition';
  import Select from './components/select.svelte';
  import languages from './languages';
  import Input from './components/input.svelte';
  import { onMount } from 'svelte';

  let home = true; // false is option screen
  let language = 'English'; // default language
  let model = 'gpt-4o-mini'; // default model
  let apikey = 'sk-proj-TrU-RWW...';
  const ANIMATION_DURATION = 400;

  onMount(async () => {
    chrome.storage.local.get('natto_apikey', async (result) => {
      apikey = result.natto_apikey;
    });
    chrome.storage.local.get('natto_model', async (result) => {
      model = result.natto_model ?? model;
    });
    chrome.storage.local.get('natto_translation_language', async (result) => {
      language = result.natto_translation_language ?? language;
    });
  });

  function abc() {
    console.log('abc');
    sendMessageToContent({ action: 'fix_grammar' });
  }

  async function updateModel(event) {
    console.log(event.target.value, model);
    await chrome.storage.local.set({ natto_model: model });
  }

  async function updateLanguage(event) {
    console.log(event.target.value, language);
    await chrome.storage.local.set({ natto_translation_language: language });
  }

  async function updateAPIkey(event) {
    console.log(event.target.value, apikey);
    await chrome.storage.local.set({ natto_apikey: apikey });
  }
</script>

<div class="bg-base-100 ml-4 mr-4 w-80 h-96">
  <div class="mb-6">
    <Header />
  </div>

  {#if home}
    <div
      class="flex items-center justify-center"
      in:slide={{ axis: 'x', duration: ANIMATION_DURATION }}
    >
      <Buttongroup
        on:grammar={abc}
        on:elaborate={abc}
        on:rewrite={abc}
        on:summarize={abc}
        on:translate={abc}
        language="Korean"
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
