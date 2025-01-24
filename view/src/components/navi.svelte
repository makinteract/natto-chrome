<script lang="ts">
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let language = 'EN';
</script>

<div class="btm-nav h-min-0 h-12">
  <button class="active" on:click={() => dispatch('home')}>
    <i class="fa-solid fa-home"></i>
  </button>
  <button class="active" on:click={() => dispatch('options')}>
    <i class="fa-solid fa-cog"></i>
  </button>
</div>
