<script lang="ts">
	import '../app.css';
	import NavBar from '../components/NavBar/NavBar.svelte';
	let { children } = $props();
</script>

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
