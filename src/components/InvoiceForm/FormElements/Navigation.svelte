<script>
	import Button from "./Button.svelte";

    export let step;
    export let goToNext;
    export let goToPrevious;
</script>

<!-- Navigation Buttons -->
<div class="mt-6">
	{#if step > 1}
	<button class='text-sm px-1 border-b-[1px] border-gray-900 hover:border-b-2 hover:font-medium w-9 ' on:click={goToPrevious} >&larr;Back</button>
  {/if}
    {#if step < 5}
      <Button colour={'emerald'} on:click={goToNext} >Continue</Button>
    {/if}
  </div>