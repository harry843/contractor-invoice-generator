<script>
	import { handleAnchorClick } from '$lib/utils';
	import Accurate from '../Icons/Accurate.svelte';
	import Instant from '../Icons/Instant.svelte';
	import Personalised from '../Icons/Personalised.svelte';
	import Private from '../Icons/Private.svelte';
	import Simple from '../Icons/Simple.svelte';
</script>

<section class="">
	<div
		class="flex h-14 items-center justify-center bg-gray-900 clip-path-semi-circle-ellipse dark:bg-hero-pattern sm:h-20"
	>
		<a href="#learn" on:click={handleAnchorClick} aria-label="button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 animate-bounceSlow text-white dark:text-black"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</a>
	</div>
	<div
		id="learn"
		class="mx-auto bg-gray-900 px-4 py-8 text-center dark:bg-hero-pattern sm:py-16 lg:px-6"
	>
		<div class="mb-8 inline-flex max-w-screen-md flex-col items-center lg:mb-16">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-slate-50 dark:text-gray-900">
				Designed for freelancers and contractors
			</h2>
			<p class="text-slate-300 dark:text-gray-600 sm:text-xl">
				Managing invoices shouldn’t be hard. Most tools are costly or complicated. Invoice-r makes
				it simple: personalised invoices — completely free.
			</p>
		</div>
		<div
			class="justify-items-center space-y-8 md:mx-[12.5%] md:grid md:grid-cols-2 md:gap-12 md:space-y-0 2xl:mx-[20%]"
		>
			<div class="flex max-w-[440px] flex-col items-center">
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-600 lg:h-12 lg:w-12"
				>
					<Instant />
				</div>
				<h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Instant</h3>
				<p class="text-slate-400 dark:text-gray-600">
					Start invoicing right away - no sign-ups, no credit card details, no delays. All features
					are available immediately to everyone.
				</p>
			</div>
			<div class="flex max-w-[440px] flex-col items-center">
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-600 lg:h-12 lg:w-12"
				>
					<Accurate />
				</div>
				<h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Accurate</h3>
				<p class="text-slate-400 dark:text-gray-600">
					Automatically calculates the total amount you are owed across all invoice items. Supports
					multiple currencies. Precision you can trust.
				</p>
			</div>
			<div class="flex max-w-[440px] flex-col items-center">
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-600 lg:h-12 lg:w-12"
				>
					<Personalised />
				</div>
				<h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Personalised</h3>
				<p class="text-slate-400 dark:text-gray-600">
					Plan, create and send with ease. Add your logo and signature for a personal touch.
					Customise colours to express your individual brand.
				</p>
			</div>
			<div class="flex max-w-[440px] flex-col items-center">
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-600 lg:h-12 lg:w-12"
				>
					<Simple />
				</div>
				<h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-slate-900">Simple</h3>
				<p class="text-slate-400 dark:text-gray-600">
					Simply add your company details, invoice items, and payee information. Invoice-r handles
					the rest, exporting a polished PDF. Nice one.
				</p>
			</div>
		</div>
		<div id="private" class="mx-auto grid max-w-[440px] grid-cols-1">
			<div class="flex flex-col items-center pt-8 md:pt-12">
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-600 lg:h-12 lg:w-12"
				>
					<Private />
				</div>
				<h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Private</h3>
				<p class="text-slate-400 dark:text-gray-600">
					Your data stays with you. No servers, no accounts, no sharing - just safe, straightforward
					invoicing.
				</p>
			</div>
		</div>
	</div>

	<div
		class="flex h-14 items-center justify-center bg-gray-900 clip-path-bottom-semi-circle-ellipse dark:bg-hero-pattern sm:h-20"
	></div>
</section>
