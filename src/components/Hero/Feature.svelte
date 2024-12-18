<script>
	import Accurate from "../Icons/Accurate.svelte";
import Personalised from "../Icons/Personalised.svelte";
	import Simple from "../Icons/Simple.svelte";

</script>
<section class="">
    <div class="py-8 px-4 mx-auto text-center max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16 inline-flex flex-col items-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Designed for freelancers and contractors
            </h2>
            <p class="text-gray-500 sm:text-xl dark:text-gray-200">
                Managing invoices shouldn’t be hard. Most tools are costly or complicated. Invoice-r makes it simple: personalised invoices — completely free.            
            </p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-900">
                    <Personalised />
                </div>
                <h3 class="mb-2 text-2xl font-bold dark:text-white">Personalised</h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Plan, create and send with ease. Add your logo and signature for a personal touch. Customise colours to express your individual brand.
                </p>
            </div>
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-900">
                    <Simple />
                </div>
                <h3 class="mb-2 text-2xl font-bold dark:text-white">Simple</h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Simply add your company details, invoice items, and payee information. Invoice-r handles the rest, exporting a polished PDF. Nice one.
                </p>
            </div>
            <div class="flex flex-col items-center">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-indigo-100 lg:h-12 lg:w-12 dark:bg-indigo-900">
                    <Accurate />                
                </div>
                <h3 class="mb-2 text-2xl font-bold dark:text-white">Accurate</h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Automatically calculates the total amount you are owed across all invoice items. Supports multiple currencies. Precision you can trust.
                </p>
            </div>
        </div>
    </div>
  </section>