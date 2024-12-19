<script>
	import Tick from "../Stepper/Steps/Tick.svelte";

    export let success = false;
  
    function toggleModal() {
      success = false;
    }
  </script>
  
  {#if success}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-emerald-100 dark:bg-gray-800 rounded-lg shadow-lg relative w-96 p-6">
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
        <Tick />
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Success</h2>
        </div>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Your invoice creation was successful! You can now open the downloaded file in your local directory.
        </p>
      </div>
    </div>
  {/if}
  