<script lang="ts">
	import { payeeDetails, currentStep } from "$lib/store";
	import type { ValidationErrors } from "$lib/types";
	import { updateStoreOnInput } from "$lib/utils";
	import Back from "../FormElements/Back.svelte";
	import Forward from "../FormElements/Forward.svelte";
	import Input from "../FormElements/Input.svelte";

    export let step;

    // Subscribe to the store
    $: data = $payeeDetails; // Reactive subscription to the store

    let error = '';

    // Initialise Validation Errors object
    let validationErrors: Partial<ValidationErrors> = {
        accountName: null,
        accountNumber: null,
        sortCode: null,
        bankName: null,
    };

    // Validate Invoice Details and return errors
    const validatePayeeDetails = () => {
        const errors: Partial<ValidationErrors> = {
            accountName: null,
            accountNumber: null,
            sortCode: null,
            bankName: null,
        };

        if (!data.accountName) errors.accountName = 'Account Name is required';
		if (!data.accountNumber) errors.accountNumber = 'Account Number is required';
		if (!data.sortCode) errors.sortCode = 'Sort Code is required';
		if (data.sortCode && !/^\d{6}$/.test(data.sortCode.toString())) errors.sortCode = 'Sort Code must have exactly 6 digits';

        return errors;
    };

    const goToNext = () => {
        // Validate company details and store errors
        validationErrors = validatePayeeDetails();

        // Check for any validation errors
        const hasErrors = Object.values(validationErrors).some(value => value !== null);

        if (hasErrors) {
            error = 'Please fill out the required fields';
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
    <h1 class="col-span-3 text-xl py-2.5 font-semibold text-center font-customHeading">Payee Details</h1>
</div>

<Input
type="text"
label="Account Name"
bind:value={data.accountName}
on:input ={(e) => {updateStoreOnInput(payeeDetails,'accountName', (e.target as HTMLInputElement).value)}}
error={validationErrors.accountName}
/>

<Input
type="number"
label="Account Number"
bind:value={data.accountNumber}
on:input ={(e) => {updateStoreOnInput(payeeDetails,'accountNumber', (e.target as HTMLInputElement).value)}}
error={validationErrors.accountNumber}
/>

<Input
type="number"
label="Sort Code"
max={999999}
bind:value={data.sortCode}
on:input={(e) => {
    const input = e.target.value;
    if (input.length > 6) {
      e.target.value = input.slice(0, 6); // Truncate to 6 digits
    }
    updateStoreOnInput(payeeDetails,'sortCode', (e.target as HTMLInputElement).value); // Update value
  }}
  error={validationErrors.sortCode}

/>

<Input
type="text"
label="Bank Name"
placeholder = 'e.g. HSBC'
required={false}
bind:value={data.bankName}
on:input ={(e) => {updateStoreOnInput(payeeDetails,'bankName', (e.target as HTMLInputElement).value)}}
/>

<Forward {step} {goToNext} />

{#if error}
<span class="block text-xs font-normal text-red-500">{error}</span>
{/if}