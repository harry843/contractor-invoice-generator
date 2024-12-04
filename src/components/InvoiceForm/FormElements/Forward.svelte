<script>
	import Button from "./Button.svelte";

    export let step;
    export let goToNext;
</script>

<div class="mt-6">
    {#if step < 5}
      <Button colour={'emerald'} on:click={goToNext} >Continue</Button>
    {/if}
  </div>