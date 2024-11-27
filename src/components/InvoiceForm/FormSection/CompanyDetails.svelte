<script lang='ts'>
	import Input from "../FormElements/Input.svelte";
    import { companyDetails, currentStep } from "$lib/store";
	import type { ValidationErrors } from "$lib/types";
	import Navigation from "../FormElements/Navigation.svelte";

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

<h1 class="text-xl py-2.5 font-semibold text-center font-customHeading">Company Details</h1>

<h2 class="font-medium text-base pb-2.5">Your Company</h2>

<Input 
type="text" 
label="Business Name" 
placeholder="Your Company Name" 
bind:value={data.businessName} 
error={validationErrors.businessName} 
/>

<Input 
type="text" 
label="Business Address Line 1" 
bind:value={data.businessAddressLine1} 
error={validationErrors.businessAddressLine1} 
/>

<Input 
type="text"
label="Business Address Line 2"
bind:value={data.businessAddressLine2}
error={validationErrors.businessAddressLine2} 
/>

<h2 class="font-medium text-base py-2">Billed To</h2>

<Input
type="text"
label="Company Name"
placeholder = "Billing Company Name"
bind:value={data.billingCompanyName}
error={validationErrors.billingCompanyName}
/>

<Input
type="text"
label="Company Address Line 1"
bind:value={data.billingCompanyAddressLine1}
error={validationErrors.billingCompanyAddressLine1}
/>

<Input
type="text"
label="Company Address Line 2"
bind:value={data.billingCompanyAddressLine2}
error={validationErrors.billingCompanyAddressLine2}
/>

<Input
type="number"
label="Company Registration Number"
required = {false}
bind:value={data.billingCompanyRegistrationNumber}
/>

<Navigation {step} {goToNext} />