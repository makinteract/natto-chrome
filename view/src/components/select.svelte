<script>
  export let label = '';
  export let options = [];
  export let selection = '';
</script>

<label class="form-control w-full max-w-xs">
  <div class="label">
    <span class="label-text">{label}</span>
  </div>
  <select class="select select-bordered" bind:value={selection} on:change>
    <option disabled selected>{selection || 'Pick one'}</option>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</label>
