<script lang="ts">
	import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';
	export let darkMode;
	export let handleSwitchDarkMode;

</script>

<div class="flex flex-row items-center gap-x-1">
<a href="https://invoicer.featurebase.app/"
target="_blank"
rel="noopener noreferrer"
aria-label="button">
	<div class="flex flex-row gap-x-1.5 items-center text-sm bg-zinc-500 dark:bg-slate-200 px-1.5 md:px-2.5 py-1 rounded-lg text-slate-50 dark:text-gray-900">
	<svg
	class="h-5 w-5 text-gray-500 fill-yellow-300 dark:fill-amber-500 dark:text-gray-400"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<path class="border border-1 border-black"
		d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
	></path>
</svg>
</div>
</a>
<label class="relative flex items-center justify-center cursor-pointer">
	<input
		type="checkbox"
		checked={darkMode}
		value=""
		class="sr-only peer"
		on:change={handleSwitchDarkMode}
	/>

	<div class="ms-2 mr-4">
		{#if darkMode}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</div>
</label>
</div>