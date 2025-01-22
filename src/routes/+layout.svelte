<script lang="ts">
	import '../app.css';
	import NavBar from '../components/NavBar/NavBar.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	$effect(() => {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'MEASUREMENT_ID', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	});
</script>

<svelte:head>
	<!-- Clarity tag -->
	<script type="text/javascript">
		(function (c, l, a, r, i, t, y) {
			c[a] =
				c[a] ||
				function () {
					(c[a].q = c[a].q || []).push(arguments);
				};
			t = l.createElement(r);
			t.async = 1;
			t.src = 'https://www.clarity.ms/tag/' + i;
			y = l.getElementsByTagName(r)[0];
			y.parentNode.insertBefore(t, y);
		})(window, document, 'clarity', 'script', 'pxtbbxeppf');
	</script>

	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-0G1TXCMMH7"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-0G1TXCMMH7');
	</script>
</svelte:head>

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
