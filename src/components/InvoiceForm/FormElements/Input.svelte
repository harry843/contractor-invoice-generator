<script lang="ts">
    export let type = 'text';
    export let value = type === 'text' ? '' : type === 'date' ? new Date() : null;
    export let error = '';
    export let label = '';
    export let placeholder = '';
    export let min;
    export let max;
    export let required = true;
    export let style = '';
    export let tooltipText = '';

    let showTooltip = false; // Tracks tooltip visibility
  
    function handleInput({ target: t }) {
      if (type === 'number') {
        value = t.value === '' ? null : t.valueAsNumber;
      } else {
        value = t.value;
      }
    }

  </script>
  
 
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {#if label}
          <span class="block">{label}
            {#if !required}
             <span class="px-1 text-xs font-normal">(optional)</span>
            {/if}
          </span>
      {/if}
      <div class="flex flex-row">
      {#if required}
      <input
      class="block px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 {style}"
      class:error
          {type}
          {placeholder}
          {value}
          {min}
          {max}
          on:input={handleInput}
          on:input
          on:blur
          required
      />
      {:else}
      <input
      class="block px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 {style}"
      class:error
          {type}
          {placeholder}
          {value}
          {min}
          {max}
          on:input={handleInput}
          on:input
          on:blur
      />
      {/if}

      {#if tooltipText}
      <div class="relative flex items-center ml-1.5">
        <svg
          class="w-5 h-5 text-gray-500 dark:text-indigo-100 md:mb-0 focus:ring-4 focus:outline-none rounded-lg text-sm text-center"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          on:mouseenter={() => (showTooltip = true)}
          on:mouseleave={() => (showTooltip = false)}
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
            clip-rule="evenodd"
          />
        </svg>
      
        {#if showTooltip}
          <div
            role="tooltip"
            class="absolute left-full transform md:-top-2 translate-x-1.5 mt-2 px-3 py-2 text-xs text-white bg-gray-700 rounded-lg shadow-sm z-10 whitespace-normal md:whitespace-pre"
          >
            {tooltipText}

            <!-- Arrow -->
      <div
      class="absolute top-1/2 left-[-4px] transform -translate-y-1/2 w-3.5 h-3.5 bg-gray-700 rotate-45"
    ></div>
          </div>
        {/if}
      </div>
      {/if}
    </div>
      {#if error}
          <span class="block text-xs font-normal text-red-500">{error}</span>
      {/if}
  </label>

