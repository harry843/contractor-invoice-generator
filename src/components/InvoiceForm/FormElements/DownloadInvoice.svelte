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
<span class="block text-xs font-normal text-red-500">{error}</span>
{/if}