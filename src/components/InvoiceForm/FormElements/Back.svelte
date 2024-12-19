<script>
    export let step;
    export let goToPrevious;
</script>

<div class="">
	{#if step > 1}
	<button class='text-sm px-1 border-b-[1px] border-gray-900 hover:border-b-2 hover:font-medium w-12 dark:hover:border-slate-50 text-black dark:text-white ' on:click={goToPrevious} >&larr;Back</button>
  {/if}
  </div>