<script>
	import LinkedIn from './Logos/LinkedIn.svelte';
	import Medium from './Logos/Medium.svelte';
	import ProductHunt from './Logos/ProductHunt.svelte';
	import Reddit from './Logos/Reddit.svelte';
</script>

<div class="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
	<span class="font-semibold uppercase text-gray-400">FEATURED IN</span>
	<div
		class="mt-8 flex flex-col items-center justify-center gap-y-4 md:grid md:grid-cols-3 md:items-center md:justify-items-center"
	>
		<!-- <a href="#" aria-label="logo" > -->
		<div>
			<ProductHunt />
		</div>
		<!-- </a> -->
		<!-- <a href="#" aria-label="logo" class="sm:mr-5 sm:mb-5 lg:mb-0"> -->
		<div class="mt-4 md:ml-5 md:mt-0">
			<LinkedIn />
		</div>
		<!-- </a> -->
		<!-- <a href="#" aria-label="logo" class="sm:ml-8 sm:mb-5 lg:mb-0"> -->
		<div>
			<Reddit />
		</div>
		<!-- </a>          -->
	</div>
</div>
