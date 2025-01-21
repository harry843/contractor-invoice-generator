<script>
	import { handleAnchorClick } from '$lib/utils';
	import FeaturedIn from './FeaturedIn.svelte';
</script>

<section class="">
	<div class="mx-auto max-w-screen-xl px-4 py-16 text-center lg:px-12">
		<a
			href="#learn"
			on:click={handleAnchorClick}
			class="mb-8 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
			role=""
		>
			<span class="mr-3 rounded-full bg-indigo-600 px-4 py-1.5 text-xs text-white">New</span>
			<span class="text-sm font-medium">Invoice-r is out! See what's new</span>
			<svg
				class="ml-2 h-5 w-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clip-rule="evenodd"
				></path></svg
			>
		</a>
		<h1
			class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
		>
			Create your invoice in seconds
		</h1>
		<h2 class="mb-5 pb-3 pt-1 text-2xl font-semibold dark:text-white">
			No sign-ups. No strings attached. Absolutely free.
		</h2>
		<p
			class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:text-xl xl:px-48"
		>
			Make your personalised invoice <span class="underline underline-offset-[3px]">look good</span
			>. Invoice-r calculates what you're owed from the information you give, so that you don't need
			to.
		</p>
		<div
			class="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16"
		>
			<a
				href="/create"
				class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-indigo-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
			>
				Create invoice
				<svg
					class="-mr-1 ml-2 h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path></svg
				>
			</a>
			<a
				href="#learn"
				on:click={handleAnchorClick}
				class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
			>
				<svg
					class="mr-2.5 h-5 w-5"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
				>
					<g class="fill-black dark:fill-white">
						<path
							d="M12.75 0a.75.75 0 000 1.5h.69l-1.97 1.97a.75.75 0 001.06 1.06l1.97-1.97v.69a.75.75 0 001.5 0V.75a.75.75 0 00-.75-.75h-2.5z"
						/>

						<path
							fill-rule="evenodd"
							d="M8.075 4.074a.75.75 0 00-.65 0l-6.75 3.25a.75.75 0 000 1.352L2 9.314v3.511a.75.75 0 00.064.302l.686-.302c-.686.302-.686.304-.686.304l.002.004.003.006.006.013a1.268 1.268 0 00.075.139c.047.08.116.184.21.303.19.238.483.533.917.82.871.575 2.265 1.086 4.45 1.086 2.177 0 3.487-.508 4.271-1.122.39-.305.632-.623.78-.884a2.194 2.194 0 00.19-.447l.01-.041.004-.017.001-.007.001-.003v-.001s0-.002-.734-.153l.735.151c.01-.05.015-.1.015-.151v-3.27l1.825-.88a.75.75 0 000-1.35l-6.75-3.25zm3.425 6.203l-3.425 1.649a.75.75 0 01-.65 0L3.5 10.036v2.579l.033.043c.098.123.276.309.57.504.585.386 1.679.838 3.623.838 1.95 0 2.902-.454 3.348-.803.225-.176.34-.34.396-.44a.878.878 0 00.03-.057v-2.423zm-3.75.14L2.729 8 7.75 5.582 12.771 8 7.75 10.418z"
							clip-rule="evenodd"
						/>
					</g>
				</svg>
				Learn more
			</a>
		</div>
		<FeaturedIn />
		</div>

</section>
