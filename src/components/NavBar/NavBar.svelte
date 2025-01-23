<script lang="ts">
	import DesktopMenu from './DesktopMenu/DesktopMenu.svelte';
	import MobileMenu from './MobileMenu/MobileMenu.svelte';
	import { browser } from '$app/environment';
	import Logo from './Logo/Logo.svelte';

	let width = 0;

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
	class="bg-hero-pattern dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900 fixed w-full z-20 top-0 left-0 dark:border-gray-600"
>
	<div
		class="px-2 xs:px-4 md:px-16 lg:px-32 xl:px-44 2xl:px-56 flex flex-wrap items-center justify-between mx-auto py-2"
	>
		<a href="/" class="flex items-center">
			<Logo />
			{#if width != 0 && width >= 300}
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
				<MobileMenu {darkMode} {handleSwitchDarkMode} />
			{/if}
		</div>
	</div>

</nav>
