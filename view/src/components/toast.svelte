<script>
  import { fade } from 'svelte/transition';

  let message = '';
  let visible = false;
  let successAlert = true;
  const maxLen = 40;

  export function setMessage(newMessage, success) {
    message =
      newMessage.length > maxLen
        ? newMessage.slice(0, maxLen) + '...'
        : newMessage;
    visible = true;
    successAlert = success;

    setTimeout(() => {
      visible = false;
    }, 3000);
  }
</script>

{#if visible}
  <div transition:fade class="toast toast-end">
    <div class="alert text-wrap {successAlert ? 'alert-info' : 'alert-error'}">
      <span>{message}</span>
    </div>
  </div>
{/if}
