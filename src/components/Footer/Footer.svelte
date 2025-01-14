<script>
	const currentYear = new Date().getFullYear();
</script>

<footer
	class="flex w-full flex-col items-center justify-center gap-[15px] border-t-2 border-t-slate-100 bg-slate-50 py-2 text-center font-semibold dark:border-t-gray-800 dark:bg-gray-900 dark:bg-none"
>
	<div class="text-lg text-gray-900 dark:text-slate-100">
		© {currentYear}
		<a
			class="hover:underline hover:underline-offset-2"
			href="https://harrykelleher.com/"
			target="_blank"
			rel="noopener noreferrer">Harry Kelleher</a
		>
	</div>
	<div class="font-normal text-gray-900 dark:text-slate-100">
		Powered by <a
			class="font-semibold text-indigo-700 no-underline hover:underline hover:underline-offset-2 dark:text-sky-300"
			href="https://kit.svelte.dev/"
			target="_blank"
			rel="noopener noreferrer">SvelteKit</a
		>
		and
		<a
			class="font-semibold text-indigo-700 no-underline hover:underline hover:underline-offset-2 dark:text-sky-300"
			href="https://tailwindpdf.com/"
			target="_blank"
			rel="noopener noreferrer">tailwindpdf</a
		>.
	</div>

	<div class="flex items-center justify-center space-x-1">
        <a
        href="https://www.linkedin.com/in/harry-kelleher/"
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip-target="tooltip-facebook"
        class="group inline-flex cursor-pointer justify-center rounded-lg py-1 text-gray-700 hover:bg-gray-600 hover:text-white dark:text-slate-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
    >
        <svg
            class="h-6 w-6 dark:hover:stroke-white"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g class="fill-gray-700 dark:fill-white group-hover:fill-white group-hover:dark:fill-gray-700">
                <path
                    d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
                />
                <path
                    d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
                />
                <path
                    d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
                />
            </g>
        </svg>
        <span class="sr-only">LinkedIn</span>
    </a>
		<div
			id="tooltip-linkedin"
			role="tooltip"
			class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
		>
			Follow me on LinkedIn
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>

		<a
			href="https://github.com/harry843"
			target="_blank"
			rel="noopener noreferrer"
			data-tooltip-target="tooltip-github"
			class="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-600 hover:text-white dark:text-slate-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
		>
			<svg
				class="h-4 w-4"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
            
				<path
					fill-rule="evenodd"
					d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
					clip-rule="evenodd"
				/>
			</svg>
			<span class="sr-only">Github</span>
		</a>
		<div
			id="tooltip-github"
			role="tooltip"
			class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
		>
			Star us on GitHub
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>
		<a
			href="https://www.harrykelleher.com/portfolio"
			target="_blank"
			rel="noopener noreferrer"
			data-tooltip-target="tooltip-portfolio"
			class="group inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-600 hover:text-white dark:text-slate-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
		>
			<svg
				class="h-4 w-4 fill-gray-700 group-hover:fill-slate-100 dark:fill-slate-100 dark:group-hover:fill-gray-900 stroke-3"
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 612 612"
				xml:space="preserve"
			>
				<g>
					<g id="_x33__19_">
						<g>
							<path
								d="M535.5,95.625H420.75v-38.25c0-21.133-17.117-38.25-38.25-38.25h-153c-21.133,0-38.25,17.136-38.25,38.25v38.25H76.5
                           c-42.247,0-76.5,34.253-76.5,76.5v344.25c0,42.247,34.253,76.5,76.5,76.5h459c42.247,0,76.5-34.253,76.5-76.5v-344.25
                           C612,129.878,577.747,95.625,535.5,95.625z M229.5,76.5c0-10.557,8.568-19.125,19.125-19.125h114.75
                           c10.557,0,19.125,8.568,19.125,19.125v19.125h-153V76.5z M573.75,516.375c0,21.114-17.117,38.25-38.25,38.25h-459
                           c-21.133,0-38.25-17.136-38.25-38.25V306h193.947c-1.587,6.158-2.697,12.488-2.697,19.125c0,42.247,34.253,76.5,76.5,76.5
                           s76.5-34.253,76.5-76.5c0-6.637-1.109-12.986-2.696-19.125H573.75V516.375z M267.75,325.125c0-7,2.027-13.483,5.298-19.125
                           h65.886c3.289,5.642,5.316,12.125,5.316,19.125c0,21.133-17.136,38.25-38.25,38.25
                           C284.867,363.375,267.75,346.258,267.75,325.125z M573.75,267.75H38.25v-95.625c0-21.133,17.117-38.25,38.25-38.25h459
                           c21.133,0,38.25,17.117,38.25,38.25V267.75z"
                          

							/>
						</g>
					</g>
				</g>
			</svg>

			<span class="sr-only">Portfolio</span>
		</a>
		<div
			id="tooltip-dribbble"
			role="tooltip"
			class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
		>
			Check out my portfolio
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>
	</div>
</footer>
