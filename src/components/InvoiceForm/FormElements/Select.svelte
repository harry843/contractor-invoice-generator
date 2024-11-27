<script>
    export let value;
    export let error = '';
    export let label = '';
  </script>
  
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {#if label}
          <span class="block">{label}</span>
      {/if}
  
      <select class="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-24" class:error bind:value on:blur>
          <slot />
      </select>
  
      {#if error}
          <span class="block error-text">{error}</span>
      {/if}
  </label>
  
  <style>
      .select {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 6px 10px 6px 4px;
      }
  
      .block {
      display: block;
    }
  
      .error {
      border-color: #f55;
    }
  
    .error-text {
      color: #f55;
    }
  </style>