<script>
  import { fade } from 'svelte/transition';

  let message = '';
  let visible = false;
  let successAlert = true;

  export function setMessage(newMessage, success) {
    message = newMessage;
    visible = true;
    successAlert = success;

    setTimeout(() => {
      visible = false;
    }, 3000);
  }
</script>

{#if visible}
  <div transition:fade class="toast toast-top toast-end">
    <div class="alert {successAlert ? 'alert-info' : 'alert-error'}">
      <span>{message}</span>
    </div>
  </div>
{/if}
