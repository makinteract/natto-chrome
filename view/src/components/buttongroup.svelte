<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let language = 'EN';
</script>

<div class="flex justify-center">
  <div class="grid grid-cols-2 gap-4 gap-y-8">
    <div class="text-primary-content grid place-content-center rounded">
      <button class="btn btn-accent w-32" on:click={() => dispatch('grammar')}
        >Fix grammar</button
      >
    </div>
    <div class=" text-accent-content grid place-content-center rounded">
      <button class="btn btn-accent w-32" on:click={() => dispatch('elaborate')}
        >Elaborate</button
      >
    </div>
    <div class="text-secondary-content grid place-content-center rounded">
      <button class="btn btn-accent w-32" on:click={() => dispatch('rewrite')}
        >Rewrite</button
      >
    </div>
    <div class="text-secondary-content grid place-content-center rounded">
      <button class="btn btn-accent w-32" on:click={() => dispatch('summarize')}
        >Summarize</button
      >
    </div>
    <div
      class="text-secondary-content grid col-span-2 place-content-center rounded"
    >
      <div class="indicator">
        <span
          class="indicator-item indicator-top indicator-right badge badge-secondary"
          >{language}</span
        >
        <button
          class="btn btn-accent w-32"
          on:click={() => dispatch('translate')}>Translate to</button
        >
      </div>
    </div>
  </div>
</div>
