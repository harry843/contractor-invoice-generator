<script lang='ts'>
	
	import LoadingSpinner from "../../LoadingSpinner.svelte";
	import Button from "./Button.svelte";
	
	export let handleSubmit;
	export let isLoading;
	export let btnText;
	export let error;


</script>

	<Button
		on:click={handleSubmit}
		disabled={isLoading}
	>
		{#if isLoading}
		<div class="flex flex-row">
			<LoadingSpinner />
			<span class="inline">{btnText}</span>
		</div>
		{:else}
		<span class="inline">{btnText}</span>
		{/if}

	</Button>

{#if error}
<div class="flex flex-row items-center pl-0.5">
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 2 2"
class="w-4 h-4"
>
<!-- Circle with Tailwind styling -->
<circle
  cx="1"
  cy="1"
  r="1"
  class="fill-red-600"
/>
<!-- First diagonal line -->
<polyline
  points="0.5,0.5 1.5,1.5"
  class="fill-none stroke-white stroke-[0.135] stroke-linecap-round"
/>
<!-- Second diagonal line -->
<polyline
  points="0.5,1.5 1.5,0.5"
  class="fill-none stroke-white stroke-[0.135] stroke-linecap-round"
/>
</svg>
<span class="block text-xs font-normal text-red-500 ml-1.5">{error}</span>
</div>
{/if}