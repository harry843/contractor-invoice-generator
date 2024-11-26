<script lang="ts">
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";
    import type { rowValidationErrors, invoiceRow } from "$lib/types";
    import { invoiceItems } from "$lib/store"; // Import the Svelte store
  
    export let error;
  
    // Validation errors structure for multiple rows
    let ValidationErrors: rowValidationErrors[] = [];
  
    // Subscribe to the store
    $: rows = $invoiceItems; // Reactive subscription to the store
  
    // Function to calculate total
    const calculateTotal = (hours: number | null, rate: number | null): number => {
      const parsedHours = parseFloat(hours?.toString() || "0");
      const parsedRate = parseFloat(rate?.toString() || "0");
      return parsedHours * parsedRate;
    };
  
    // Automatically update totals reactively
    $: rows.forEach((row, index) => {
      const updatedRow = { ...row, total: calculateTotal(row.hours, row.rate) };
      invoiceItems.update(items => {
        items[index] = updatedRow;
        return items;
      });
    });
  
    // Validate all rows and return errors
    const validateRow = (): rowValidationErrors[] => {
      return rows.map((row) => {
        const errors: rowValidationErrors = {
          description: null,
          hours: null,
          rate: null,
        };
        if (!row.description) errors.description = 'Description is required';
        if (!row.hours) errors.hours = 'Hours are required';
        if (!row.rate) errors.rate = 'Rate is required';
        return errors;
      });
    };
  
    // Add a new row with validation
    const addRow = () => {
      // Perform validation
      const errors = validateRow();
      ValidationErrors = errors;
  
      // Stop execution if there are validation errors
      const hasErrors = errors.some((error) =>
        Object.values(error).some((value) => value !== null)
      );
      if (hasErrors) {
        console.error("Validation errors exist. Cannot add new row.");
        return;
      }
  
      // Add new row if validation passes
      invoiceItems.update(items => [
        ...items,
        {
          description: '',
          hours: null,
          rate: null,
          total: 0,
        }
      ]);
  
      // Add a corresponding validation error object
      ValidationErrors = [
        ...ValidationErrors,
        { description: null, hours: null, rate: null }
      ];
    };
</script>

<div class="space-y-2 mx-10 p-4">
  {#each rows as row, index}
    <div class="flex items-center gap-4">
      <Input
        type="text"
        label="Task Description"
        placeholder="e.g. Assignment Marking"
        bind:value={row.description}
        error={ValidationErrors[index]?.description}
      />
      <Input
        type="number"
        step="0.1"
        label="Hours"
        placeholder="e.g. 40"
        bind:value={row.hours}
        error={ValidationErrors[index]?.hours}
      />
      <Input
        type="number"
        label="Price per Hour"
        step="0.01"
        placeholder="e.g £35"
        bind:value={row.rate}
        error={ValidationErrors[index]?.rate}
      />
      <div class="flex-1 text-right font-bold">
        {row.total.toFixed(2)}
      </div>
    </div>
  {/each}

  {#if error}
  <span class="block text-xs font-normal text-red-500">{error}</span>
  {/if}

  <Button
    on:click={addRow}
    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Add Item
  </Button>
</div>
