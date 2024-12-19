<script lang='ts'>
	import Input from "../FormElements/Input.svelte";
    import { companyDetails, currentStep } from "$lib/store";
	import type { ValidationErrors, CompanyDetails } from "$lib/types";
	import Forward from "../FormElements/Forward.svelte";
	import type { Writable } from "svelte/store";
	import { updateStoreOnInput } from "$lib/utils";

    export let step;
    
    // Subscribe to the store
    $: data = $companyDetails; // Reactive subscription to the store

    let error = '';

    // Initialise Validation Errors object
    let validationErrors: Partial<ValidationErrors> = {
		businessName: null,
		businessAddressLine1: null,
		businessAddressLine2: null,
		billingCompanyName: null,
		billingCompanyAddressLine1: null,
		billingCompanyAddressLine2: null,
	};

      // Validate Company Details and return errors
      const validateCompanyDetails = () => {
        const errors: Partial<ValidationErrors> = {
          businessName: null,
          businessAddressLine1: null,
          businessAddressLine2: null,
          billingCompanyName: null,
          billingCompanyAddressLine1: null,
          billingCompanyAddressLine2: null,
        };
        if (!data.businessName) errors.businessName = 'Business Name is required';
		if (!data.businessAddressLine1) errors.businessAddressLine1 = 'Address is required';
		if (!data.businessAddressLine2) errors.businessAddressLine2 = 'Address is required';
		if (!data.billingCompanyName) errors.billingCompanyName = 'Billing Company Name is required';
		if (!data.billingCompanyAddressLine1) errors.billingCompanyAddressLine1 = 'Address is required';
		if (!data.billingCompanyAddressLine2) errors.billingCompanyAddressLine2 = 'Address is required';

        return errors;
    };

    const goToNext = () => {
        // Validate company details and store errors
        validationErrors = validateCompanyDetails();

        // Check for any validation errors
        const hasErrors = Object.values(validationErrors).some(value => value !== null);

        if (hasErrors) {
            error = 'Please fill out the required fields';
            return; // Stop execution if there are errors
        }

        // Update the current step if no errors are found
        currentStep.update(n => Math.min(n + 1, 5));
    };

</script>

<h1 class="text-xl py-2.5 font-semibold text-center font-customHeading text-black dark:text-slate-50">Company Details</h1>

<h2 class="font-medium text-base font-customHeading pb-2.5 text-black dark:text-slate-50">Your Company</h2>

<div class="ml-1.5 md:ml-3">
<Input 
type="text" 
label="Business Name" 
placeholder="Your Company Name" 
bind:value={data.businessName}
on:input ={(e) => {updateStoreOnInput(companyDetails,'businessName', (e.target as HTMLInputElement).value)}}
error={validationErrors.businessName} 
/>

<Input 
type="text" 
label="Business Address Line 1" 
bind:value={data.businessAddressLine1}
on:input ={(e) => {updateStoreOnInput(companyDetails,'businessAddressLine1', (e.target as HTMLInputElement).value)}}
error={validationErrors.businessAddressLine1} 
/>

<Input 
type="text"
label="Business Address Line 2"
bind:value={data.businessAddressLine2}
on:input ={(e) => {updateStoreOnInput(companyDetails,'businessAddressLine2', (e.target as HTMLInputElement).value)}}
error={validationErrors.businessAddressLine2} 
/>
</div>

<div class="h-0.5 w-48 my-2 mt-5 bg-gray-200"></div>

<h2 class="font-medium text-base font-customHeading py-2 text-black dark:text-slate-50">Billed To</h2>

<div class="ml-1.5 md:ml-3">
<Input
type="text"
label="Company Name"
placeholder = "Billing Company Name"
bind:value={data.billingCompanyName}
on:input ={(e) => {updateStoreOnInput(companyDetails,'billingCompanyName', (e.target as HTMLInputElement).value)}}
error={validationErrors.billingCompanyName}
/>

<Input
type="text"
label="Company Address Line 1"
bind:value={data.billingCompanyAddressLine1}
on:input ={(e) => {updateStoreOnInput(companyDetails,'billingCompanyAddressLine1', (e.target as HTMLInputElement).value)}}
error={validationErrors.billingCompanyAddressLine1}
/>

<Input
type="text"
label="Company Address Line 2"
bind:value={data.billingCompanyAddressLine2}
on:input ={(e) => {updateStoreOnInput(companyDetails,'billingCompanyAddressLine2', (e.target as HTMLInputElement).value)}}
error={validationErrors.billingCompanyAddressLine2}
/>

<Input
type="text"
label="Company Registration Number"
required = {false}
bind:value={data.billingCompanyRegistrationNumber}
on:input ={(e) => {
    const input = e.target.value;
    if (input.length > 8) {
      e.target.value = input.slice(0, 8); // Truncate to 8 digits
    }
    updateStoreOnInput(companyDetails,'billingCompanyRegistrationNumber', (e.target as HTMLInputElement).value)
    }
    }
tooltipText={"A unique code that identifies a company, typically 8 characters long"}
/>
</div>

<Forward {step} {goToNext} />

{#if error}

    <span class="block text-xs font-normal text-red-500">{error}</span>

{/if}