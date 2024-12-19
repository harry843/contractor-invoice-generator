<script lang="ts">
    export let value: string;
    export let error: string = '';
    export let label: string = '';
  </script>
  
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 md:py-0.5 lg:py-1 xl:py-1.5 2xl:py-2">
      {#if label}
          <span class="block">{label}</span>
      {/if}
  
      <select class="block px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-28" class:error bind:value on:blur on:input>
          <slot />
      </select>
  
      {#if error}
          <span class="block error-text">{error}</span>
      {/if}
  </label>