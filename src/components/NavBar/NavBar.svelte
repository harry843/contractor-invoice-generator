<script lang="ts">
	import DesktopMenu from './DesktopMenu/DesktopMenu.svelte';
	import Logo from './Footer/icons/Logo.svelte';
	import MobileMenu from './MobileMenu/MobileMenu.svelte';
	import { browser } from '$app/environment';

	$: open = false;
	let width = 0;

	const handleOpen = () => {
		open = !open;
	};

	const handleClose = () => {
		open = false;
	};

	let darkMode = false;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}

</script>

<nav
	bind:clientWidth={width}
	class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
	<div
		class="px-2 xs:px-4 md:px-16 lg:px-32 xl:px-44 2xl:px-56 flex flex-wrap items-center justify-between mx-auto py-2"
	>
		<a href="/" class="flex items-center">
			<Logo />
			{#if width != 0 && width >= 375}
				<span
					class="px-3 self-center text-2xl font-semibold whitespace-nowrap font-customHeading dark:text-white hover:underline"
					>Invoice-r</span
				>
			{/if}
		</a>
		<div class="flex flex-row items-center gap-x-5">
			{#if width > 767}
				<DesktopMenu {darkMode} {handleSwitchDarkMode} />
			{:else if width != 0}
				<MobileMenu {open} {handleClose} {darkMode} {handleSwitchDarkMode} />
			{/if}
			<button
				data-collapse-toggle="navbar-sticky"
				type="button"
				class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-sticky"
				aria-expanded="false"
				aria-label="button"
				on:click={handleOpen}
			>
				<span class="sr-only"></span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					aria-label="logo"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
	</div>

</nav>
