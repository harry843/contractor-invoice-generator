<script>
	import { Banner } from 'flowbite-svelte';
</script>

<Banner id="mobile-banner">
	<p class="mx-2 flex items-center text-sm font-normal text-gray-600 dark:text-gray-300">
		<span class="mr-3 inline-flex rounded-full bg-yellow-300 p-1 dark:bg-gray-600">
			<svg
				class="h-5 w-5 fill-gray-400 text-gray-500 dark:fill-yellow-300 dark:text-gray-400"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
				></path>
			</svg>
			<span class="sr-only">Light bulb</span>
		</span>
		<span
			>This invoice layout has been optimised for mobile, but will download in A4 pdf format</span
		>
	</p>
</Banner>
