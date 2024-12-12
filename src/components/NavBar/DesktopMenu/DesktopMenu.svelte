<script>
	import Sun from '../../Icons/Sun.svelte';
	import Moon from '../../Icons/Moon.svelte';

	export let darkMode;
	export let handleSwitchDarkMode;
</script>

<div
	class="items-right justify-between hidden w-full md:flex md:w-auto md:order-2"
	id="navbar-sticky"
>
	<ul
		class="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row space-x-4 lg:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
	>
		<label class="relative inline-flex items-center cursor-pointer">
			<!-- Hidden Checkbox -->
			<input
				type="checkbox"
				checked={darkMode}
				class="sr-only peer"
				on:change={handleSwitchDarkMode}
			/>
			<!-- Toggle Background -->
			<div class="w-7 h-[15px] bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3 after:h-3 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500" />
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
