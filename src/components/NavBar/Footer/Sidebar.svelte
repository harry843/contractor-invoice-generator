<script lang="ts">
	import LinkedIn from './icons/LinkedIn.svelte';
	import Email from './icons/Email.svelte';
	import GitHub from './icons/GitHub.svelte';
	import Tableau from './icons/Tableau.svelte';
	import classNames from 'classnames';

	export let outerWidth: number | undefined = undefined;

	$: currentYear = new Date().getFullYear();
	$: myName = outerWidth !== undefined && outerWidth < 425 ? '' : 'Harry Kelleher';

	const contactInfo = [
		{
			name: 'linkedin',
			contact: 'LinkedIn',
			link: 'https://www.linkedin.com/in/harry-kelleher/',
			icon: LinkedIn,
			className: 'grayscale hover:grayscale-0'
		},
		{
			name: 'tableau',
			contact: 'Tableau',
			link: 'https://public.tableau.com/app/profile/harry.kelleher',
			icon: Tableau,
			className: 'grayscale hover:grayscale-0'
		},
		{
			name: 'github',
			contact: 'GitHub',
			link: 'https://github.com/harry843',
			icon: GitHub,
			className: 'hover:fill-gray-700'
		},
		{
			name: 'email',
			contact: 'Email',
			link: 'mailto:kelleherharry@gmail.com',
			icon: Email,
			className: 'hover:fill-red-600'
		}
	];
</script>

{#if outerWidth !== undefined && outerWidth > 767}
	<div class="flex justify-center dark:bg-gray-900">
		<div
			class="fixed flex justify-center md:right-7 md:flex-col items-center gap-6 md:gap-9 bottom-0 -translate-y-2 md:bottom-1/2 transform md:translate-y-1/2 z-10"
		>
			{#each contactInfo as { link, className, icon }}
				<div class={classNames('no-underline rounded-full', className)}>
					<a href={link} target="_blank" rel="noopener noreferrer">
						<svelte:component this={icon} />
					</a>
				</div>
			{/each}
		</div>
	</div>
	<footer class="dark:bg-gray-900">
		<div class="px-2 xs:px-4 md:px-16 lg:px-32 xl:px-44 2xl:px-56 xxs:py-8">
			<div
				class="flex items-center justify-between px-0 xxs:px-2 md:translate-y-[4.7rem] lg:translate-y-[5.6rem]"
			>
				<a
					href="/"
					class="flex items-start xs:items-center mb-0 space-x-3 rtl:space-x-reverse grayscale hover:grayscale-0"
				>
					<img src="/HK_thumbnail.png" class="h-8" alt="Harry Kelleher" />
					<span class="self-center font-customHeading text-base font-medium whitespace-nowrap dark:text-white"
						>{myName}</span
					>
				</a>
			</div>
			<hr class="my-6 border-gray-200 mx-auto lg:my-8" />
			<span class="block text-sm text-gray-500 text-center dark:text-gray-300"
				>© {currentYear}
				<a href="/" class="hover:underline">Harry Kelleher</a></span
			>
		</div>
	</footer>
{:else}
	<footer bind:clientWidth={outerWidth} class="dark:bg-gray-900">
		<div class="w-full max-w-screen-xl mx-auto p-4 xxs:py-8">
			<div class="flex items-center justify-between px-0 xxs:px-2">
				<a
					href="/"
					class="flex items-start xs:items-center mb-0 space-x-3 rtl:space-x-reverse grayscale hover:grayscale-0"
				>
					<img src="/HK_thumbnail.png" class="h-8" alt="Harry Kelleher" />
					<span class="self-center text-base font-medium whitespace-nowrap dark:text-white">{myName}</span>
				</a>
				<div class="flex items-center space-x-6">
					{#each contactInfo as { link, className, icon }}
						<div class={classNames('no-underline rounded-full', className)}>
							<a href={link} target="_blank" rel="noopener noreferrer">
								<svelte:component this={icon} />
							</a>
						</div>
					{/each}
				</div>
			</div>
			<hr class="my-6 border-gray-200 mx-auto lg:my-8" />
			<span class="block text-sm text-gray-500 text-center dark:text-gray-300"
				>© {currentYear}
				<a href="/" class="hover:underline">Harry Kelleher</a></span
			>
		</div>
	</footer>
{/if}
