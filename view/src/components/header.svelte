<script lang="ts">
  import MiniLogo from '../assets/mini-natto.png';

  export let processing = false;
</script>

<div class="navbar">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Chrome Natto</a>
    {#if processing}
      <span class="loading loading-spinner loading-sm"></span>
    {/if}
  </div>
  <div class="flex-none gap-2">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="Logo" src={MiniLogo} />
        </div>
      </div>
    </div>
  </div>
</div>
