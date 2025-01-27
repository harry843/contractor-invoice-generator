<script>
	import Sun from '../../Icons/Sun.svelte';
	import Moon from '../../Icons/Moon.svelte';
	import Button from '../../InvoiceForm/FormElements/Button.svelte';

	export let darkMode;
	export let handleSwitchDarkMode;
</script>


<div
	class="items-right justify-between hidden w-full md:flex md:w-auto md:order-2"
	id="navbar-sticky"
>
	<ul
		class="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row space-x-4 lg:space-x-8 md:mt-0 md:border-0 bg-hero-pattern dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900"
	>
	<a href="https://invoicer.featurebase.app/"
target="_blank"
rel="noopener noreferrer">
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
Missing a feature?
</div>
</a>

		<label class="relative inline-flex items-center cursor-pointer">
			<!-- Hidden Checkbox -->
			<input
				type="checkbox"
				checked={darkMode}
				class="sr-only peer"
				on:change={handleSwitchDarkMode}
			/>
			<!-- Toggle Background -->
			<div class="w-7 h-[15px] bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3 after:h-3 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500" />
			<!-- Icons -->
			<div class="ml-3 flex items-center">
				{#if darkMode}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</div>
		</label>
	</ul>
</div>
