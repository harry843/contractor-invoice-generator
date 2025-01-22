<script lang="ts">
	import '../app.css';
	import NavBar from '../components/NavBar/NavBar.svelte';
	import { page } from '$app/stores';
	import Analytics from '../components/Misc/Analytics.svelte';

	let { children } = $props();

	// $effect(() => {
	// 	if (typeof gtag !== 'undefined') {
	// 		gtag('config', 'MEASUREMENT_ID', {
	// 			page_title: document.title,
	// 			page_path: $page.url.pathname
	// 		});
	// 	}
	// });
</script>

<Analytics />

<NavBar />

{@render children()}

<style lang="postcss">
	:global(body) {
		@apply bg-hero-pattern;
	}

	:global(html.dark body) {
		@apply bg-gradient-to-b from-gray-900 to-gray-900;
	}
</style>
