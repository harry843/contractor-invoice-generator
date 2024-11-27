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

      {#if error}
          <span class="block text-xs font-normal text-red-500">{error}</span>
      {/if}
  </label>