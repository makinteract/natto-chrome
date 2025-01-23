<script>
  export let label = '';
  export let value = '';
</script>

<label class="form-control w-full max-w-xs">
  <div class="label">
    <span class="label-text">{label}</span>
  </div>
  <input
    bind:value
    type="password"
    placeholder={value}
    class="input input-bordered"
    on:change
  />
</label>
