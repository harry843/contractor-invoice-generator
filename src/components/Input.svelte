<script>
    export let type = 'text';
    export let value = type === 'text' ? '' : null;
    export let error = '';
    export let label = '';
    export let placeholder = '';
    export let required = '';
  
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
          <span class="block">{label}</span>
      {/if}
      <input
      class="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      class:error
          {type}
          {placeholder}
          {value}
          on:input={handleInput}
          on:input
          on:blur
      />
      {#if error}
          <span class="block text-red-500">{error}</span>
      {/if}
  </label>