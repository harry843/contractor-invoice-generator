<script>
    export let subject;
    export let body;
  
    let isOpen = true;
  
    function toggleModal() {
      isOpen = !isOpen;
    }
  </script>
  
  {#if isOpen}
    <div
      class="flex items-center p-4 mb-4 text-sm text-indigo-900 border rounded-lg bg-sky-100 dark:bg-indigo-900 dark:border-indigo-800 dark:text-indigo-50 relative"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div class="flex flex-col">
        <h3 class="font-medium text-sm">{subject}</h3> 
        <p class="text-xs">{@html body}</p>
      </div>
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
    </div>
  {/if}
  