<script lang="ts">
	import classNames from 'classnames';
	import { page } from '$app/stores';
    import { routes} from '../utils/utils';
	import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';
	export let open: boolean;
	export let handleClose: () => void;
	export let darkMode;
	export let handleSwitchDarkMode;

</script>

<div
	class={classNames(
		'absolute right-0 p-4 w-1/2 h-screen top-20 transition-all duration-700 md:hidden',
		{
			'left-1/2': open,
			'left-full': !open
		}
	)}
>
	<ul
		class="flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark:text-white"
	>
		{#each routes as route}
			<li>
				<a
					href={'/' + route.slug}
					class={classNames('block py-2 px-4 dark:text-white text-gray-800 border-blue-300', {
						'text-indigo-600 dark:text-sky-400 dark:bg-gray-700 bg-gray-100 rounded-md': route.slug === $page.url.pathname.slice(1)
					},
                    )}
					aria-current="page"
                    on:click={handleClose}
					>{route.label}
				</a>
			</li>
		{/each}
	</ul>
</div>

<label class="relative flex items-center justify-center cursor-pointer">
	<input
		type="checkbox"
		checked={darkMode}
		value=""
		class="sr-only peer"
		on:change={handleSwitchDarkMode}
	/>

	<div class="ms-2">
		{#if darkMode}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</div>
</label>
