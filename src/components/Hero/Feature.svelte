<script>
	import { handleAnchorClick } from "$lib/utils";
import Accurate from "../Icons/Accurate.svelte";
    import Personalised from "../Icons/Personalised.svelte";
	import Simple from "../Icons/Simple.svelte";

</script>
<section class="">
    <div class="clip-path-semi-circle-ellipse bg-gray-900 dark:bg-hero-pattern h-20 flex items-center justify-center">
        <a href="#learn" on:click={handleAnchorClick} aria-label="button">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 text-white dark:text-black animate-bounceSlow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
    
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
    </div>
    <div id="learn" class="py-8 px-4 mx-auto text-center max-w-screen-xl sm:py-16 lg:px-6 bg-gray-900 dark:bg-hero-pattern">
        <div class="max-w-screen-md mb-8 lg:mb-16 inline-flex flex-col items-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold dark:text-gray-900 text-slate-50">
                Designed for freelancers and contractors
            </h2>
            <p class="text-slate-300 dark:text-gray-600 sm:text-xl ">
                Managing invoices shouldn’t be hard. Most tools are costly or complicated. Invoice-r makes it simple: personalised invoices — completely free.            
            </p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-600">
                    <Personalised />
                </div>
                <h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Personalised</h3>
                <p class="text-slate-400 dark:text-gray-600">
                    Plan, create and send with ease. Add your logo and signature for a personal touch. Customise colours to express your individual brand.
                </p>
            </div>
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-600">
                    <Simple />
                </div>
                <h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-slate-900">Simple</h3>
                <p class="text-slate-400 dark:text-gray-600">
                    Simply add your company details, invoice items, and payee information. Invoice-r handles the rest, exporting a polished PDF. Nice one.
                </p>
            </div>
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-600">
                    <Accurate />                
                </div>
                <h3 class="mb-2 text-2xl font-bold text-slate-50 dark:text-gray-900">Accurate</h3>
                <p class="text-slate-400 dark:text-gray-600">
                    Automatically calculates the total amount you are owed across all invoice items. Supports multiple currencies. Precision you can trust.
                </p>
            </div>
        </div>
    </div>

    <div class="clip-path-bottom-semi-circle-ellipse bg-gray-900 dark:bg-hero-pattern h-20 flex items-center justify-center">
    </div>
  </section>