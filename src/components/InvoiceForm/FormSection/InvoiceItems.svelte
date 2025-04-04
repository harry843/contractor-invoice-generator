<script lang="ts">
    import Button from "../FormElements/Button.svelte";
    import Input from "../FormElements/Input.svelte";
    import type { rowValidationErrors } from "$lib/types";
    import { currentStep, invoiceItems } from "$lib/store";
	  import Forward from "../FormElements/Forward.svelte";
	import DeleteButton from "../FormElements/DeleteButton.svelte";

    export let step;
    export let currency = '£';

    // Validation errors structure for multiple rows
    let ValidationErrors: rowValidationErrors[] = [];

    let error = ''
  
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

    // Calculate total of all invoice items
    $: totalSum = rows.reduce((sum, row) => sum + row.total, 0)
  
    // Validate all rows and return errors
    const validateInvoiceItems = (): rowValidationErrors[] => {
      return rows.map((row) => {
        const errors: rowValidationErrors = {
          description: null,
          hours: null,
          rate: null,
        };
        if (!row.description) errors.description = 'Description is required';
        if (!row.hours) errors.hours = 'Hours are required';
        if (row.hours && row.hours.toString().length > 5) errors.hours = 'Max 5 characters'; 
        if (!row.rate) errors.rate = 'Rate is required';
        return errors;
      });
    };
  
    // Add a new row with validation
    const addRow = () => {
      // Perform validation
      const errors = validateInvoiceItems();
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

 // Delete the row at the specified index
 const deleteRow = (index: number) => {
    // Prevent deletion if there's only one row
    if (rows.length === 1) {
      alert("You cannot delete the only row.");
      return;
    }
    const rowToDelete = rows[index];
    if (!rowToDelete.description && !rowToDelete.hours && !rowToDelete.rate) {
      // If the row is empty, delete it directly
      invoiceItems.update((items) => items.filter((_, i) => i !== index));
      ValidationErrors = ValidationErrors.filter((_, i) => i !== index); // Remove corresponding validation error
    } else {
      // Show confirmation dialog for non-empty rows
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this row? This will remove any unsaved data."
      );
      if (confirmDelete) {
        invoiceItems.update((items) => items.filter((_, i) => i !== index)); // Remove the specific row
        ValidationErrors = ValidationErrors.filter((_, i) => i !== index); // Remove corresponding validation error
      }
    }
  };

    const goToNext = () => {
        const errors = validateInvoiceItems();
      ValidationErrors = errors;
  
      // Stop execution if there are validation errors
      const hasErrors = errors.some((error) =>
        Object.values(error).some((value) => value !== null)
      );
      if (hasErrors) {
        error = "Please fill out the required fields";
        return;
      }

        // Update the current step if no errors are found
        currentStep.update(n => Math.min(n + 1, 5));
    };

</script>

<div class="space-y-2 py-4">
  <div class="flex flex-col items-start gap-y-1">
  {#each rows as row, index}
    <div class="flex items-center gap-4">
      {#if index === 0}
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
        style="max-w-24"
        bind:value={row.hours}
        error={ValidationErrors[index]?.hours}
      />
      <Input
        type="number"
        label="Price per Hour"
        step="0.01"
        placeholder="e.g £35"
        style="max-w-24"
        bind:value={row.rate}
        error={ValidationErrors[index]?.rate}
      />

      <div class="block mb-2 w-16 text-sm font-medium text-gray-900 dark:text-white">
      <h2>Total</h2>
      <div class="block py-1 text-gray-900 text-sm font-medium ">
        {currency}{row.total.toFixed(2)}
      </div>
    </div>
    {:else}
    <Input
    type="text"
    bind:value={row.description}
    error={ValidationErrors[index]?.description}
  />
  <Input
    type="number"
    step="0.1"
    style="max-w-24"
    bind:value={row.hours}
    error={ValidationErrors[index]?.hours}
  />
  <Input
    type="number"
    step="0.01"
    style="max-w-24"
    bind:value={row.rate}
    error={ValidationErrors[index]?.rate}
  />

  <div class="block mb-2 w-16 text-sm font-medium text-gray-900 dark:text-white">
  <div class="block text-gray-900 text-sm font-medium ">
    {currency}{row.total.toFixed(2)}
  </div>
  </div>
    {/if}

      {#if rows.length > 1}
      <DeleteButton
      on:click={() => deleteRow(index)}
      />
      {/if}
    </div>
  {/each}
  {#if rows.length > 1}
  <div
  id="TotalDue"
  class="grid grid-cols-7 justify-end items-center text-lg font-semibold"

>
<div class="col-span-6"></div>
<div class="text-gray-900 border-t border-gray-300 pt-1.5 col-span-1">
  {currency}{totalSum.toFixed(2)}
</div>
</div>
  {/if}
</div>


  <div class="flex items-center justify-stretch">
  <Button
    on:click={addRow}
  >
    Add Item
  </Button>
</div>

  <Forward {step} {goToNext}/>

{#if error}
<span class="block text-xs font-normal text-red-500">{error}</span>
{/if}

</div>
