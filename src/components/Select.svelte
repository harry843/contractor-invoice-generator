<script>
    export let value;
    export let error = '';
    export let label = '';
  </script>
  
  <label class="block">
      {#if label}
          <span class="block">{label}</span>
      {/if}
  
      <select class="block select" class:error bind:value on:blur>
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