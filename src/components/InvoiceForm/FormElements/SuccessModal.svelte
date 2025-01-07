<script>
	import { currentStep } from "$lib/store";

    export let success = false;
  
    function toggleModal() {
      success = false;
      currentStep.update(n => Math.min(n - 4, 5));
    }
  </script>
  
  {#if success}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="flex flex-col bg-emerald-100 dark:bg-gray-800 rounded-lg shadow-lg relative w-96 p-6">
      <div class="">
        <button
          type="button"
          class="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-5 h-5 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          on:click={toggleModal}
        >
          <svg
            class="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="flex flex-row space-x-0 w-24">
          <li class="flex w-1/2 items-center text-emerald-600 dark:text-emerald-100">
            <span class="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full lg:h-7 lg:w-7 dark:bg-indigo-800 shrink-0">
                <svg class="w-3.5 h-3.5 text-emerald-600 lg:w-4 lg:h-4 dark:text-emerald-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </span>
        </li>
        <h2 class="text-lg font-medium pl-1.5 lg:pl-2.5 text-gray-900 dark:text-white">Success</h2>
        </div>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Your invoice creation was successful! You can now open the downloaded file in your local directory.
        </p>
      </div>
      <div class="flex flex-row gap-x-3 lg:gap-x-4 pt-4">
      <a href="/" class="inline-flex justify-center items-center py-1 px-2.5 text-base font-medium text-center text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        Home
        <svg class="ml-2 -mr-1 w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>

    </a>
    <button on:click={toggleModal} class="inline-flex justify-center items-center py-1 px-2.5 text-base font-medium text-center text-gray-900 rounded-lg bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
      Restart
    </button>
  </div>
</div>
    </div>
  {/if}
  