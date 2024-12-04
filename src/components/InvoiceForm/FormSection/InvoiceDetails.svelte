<script lang='ts'>
	import Input from "../FormElements/Input.svelte";
	import Select from "../FormElements/Select.svelte";
	import { formatDateToCustomString, validateFutureDate, validateMaxDate, validateMinDate } from "$lib/utils";
	import { currentStep, invoiceDetails } from "$lib/store";
	import type { ValidationErrors } from "$lib/types";
	import Navigation from "../FormElements/Forward.svelte";
	import Back from "../FormElements/Back.svelte";

    export let step;

    // Subscribe to the store
    $: data = $invoiceDetails; // Reactive subscription to the store

    let error = '';

    // Initialise Validation Errors object
    let validationErrors: Partial<ValidationErrors> = {
        invoiceDate: null,
        invoiceNumber: null,
        dueDate: null,
        supplyStartDate: null,
        supplyEndDate: null,
    };

    function handleFutureDate(event, stateUpdater) {
		validateFutureDate(event.target.value, (newValue) => {
			event.target.value = newValue;
			stateUpdater(newValue);
		});
	}

	function handleDateChange(event, stateUpdater) {
		const inputDate = event.target.value;
		validateMaxDate(inputDate, (newValue) => {
			event.target.value = newValue;
			stateUpdater(newValue);
		});
		validateMinDate(inputDate, (newValue) => {
			event.target.value = newValue;
			stateUpdater(newValue);
		});
	}

      // Validate Invoice Details and return errors
      const validateInvoiceDetails = () => {
        const errors: Partial<ValidationErrors> = {
            invoiceNumber: null,
            invoiceDate: null,
            supplyStartDate: null,
            supplyEndDate: null,
            dueDate: null,
        };
        if (!data.invoiceNumber) errors.invoiceNumber = 'Invoice Number is required';
		if (new Date(data.invoiceDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.invoiceDate = `Value must be earlier than ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (new Date(data.invoiceDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.invoiceDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (data.supplyStartDate === '') errors.supplyStartDate = `Supply Start Date is required`;
		if (data.supplyStartDate !== '' && new Date(data.supplyStartDate) > new Date()) errors.supplyStartDate = `Value must be today or earlier: ${formatDateToCustomString(new Date().toISOString().split('T')[0])}`;
		if (data.supplyStartDate !== '' && new Date(data.supplyStartDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.supplyStartDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (data.supplyEndDate === '') errors.supplyEndDate = `Supply End Date is required`;
		if (data.supplyEndDate !== '' && new Date(data.supplyEndDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.supplyEndDate = `Value must be today or earlier: ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (data.supplyEndDate !== '' && new Date(data.supplyEndDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.supplyEndDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (data.dueDate === '') errors.dueDate = `Due Date is required`;
		if (data.dueDate !== '' && new Date(data.dueDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.dueDate = `Value must be today or earlier: ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (data.dueDate !== '' && new Date(data.dueDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.dueDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;

        return errors;
    };

    const goToNext = () => {
        // Validate company details and store errors
        validationErrors = validateInvoiceDetails();

        // Check for any validation errors
        const hasErrors = Object.values(validationErrors).some(value => value !== null);

        if (hasErrors) {
            error = 'Please complete the required fields';
            return; // Stop execution if there are errors
        }

        // Update the current step if no errors are found
        currentStep.update(n => Math.min(n + 1, 5));
    };

    const goToPrevious = () => currentStep.update(n => Math.max(n - 1, 1));

</script>
<div class="grid grid-cols-5 justify-items-start items-center">
<div class="col-span-2">
<Back  {step} {goToPrevious} />
</div>
<h1 class="col-span-3 text-xl py-2.5 font-semibold text-center font-customHeading">Invoice Details</h1>
</div>

 <Input
type="date"
label="Invoice Date"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={data.invoiceDate}
on:change={(e) => handleDateChange(e, (val) => (data.invoiceDate = val))}
error={validationErrors.invoiceDate}
/>

<Input
type="text"
label="Invoice Number"
placeholder = "HK12345"
bind:value={data.invoiceNumber}
error={validationErrors.invoiceNumber}

/>

<Select
label="Currency"
bind:value={data.currency}>
<option value="£">Pounds (£)</option>
<option value="$">Dollars ($)</option>
<option value="€">Euros (€)</option>        
</Select>

<Input
type="date"
label="Payment Due Date"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={data.dueDate}
on:change={(e) => handleDateChange(e, (val) => (data.dueDate = val))}
error={validationErrors.dueDate}
/>

<Input
type="date"
label="Supply Start Date"
max={new Date().toISOString().split('T')[0]}
bind:value={data.supplyStartDate}
on:change={(e) => handleFutureDate(e, (val) => (data.supplyStartDate = val))}
error={validationErrors.supplyStartDate}
/>

<Input
type="date"
label="Supply End Date"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={data.supplyEndDate}
on:change={(e) => handleDateChange(e, (val) => (data.supplyEndDate = val))}
error={validationErrors.supplyEndDate}

/>

<Navigation {step} {goToNext} />

{#if error}

    <span class="block text-xs font-normal text-red-500">{error}</span>

{/if}