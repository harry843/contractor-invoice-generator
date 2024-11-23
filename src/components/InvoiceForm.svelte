<script lang='ts'>
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import Button from './Button.svelte';
	import { requestDownload, downloadDocument, downloadToBrowser } from "$lib/tailwindstream";
	import { formatDateToCustomString, isValidUrl } from '$lib/utils';
	import type { ValidationErrors } from '$lib/types';
	
	export let data;
	export let payload;
	
	let isLoading = false;
	let error: any = null;
	let validationErrors: ValidationErrors = {
		businessName: null,
		businessAddressLine1: null,
		businessAddressLine2: null,
		billingCompanyName: null,
		billingCompanyAddressLine1: null,
		billingCompanyAddressLine2: null,
		invoiceNumber: null,
		invoiceDate: null,
		supplyStartDate: null,
		supplyEndDate: null,
		logoImageUrl: null,
		signatureImageUrl: null,
		dueDate: null,
		accountName: null,
		accountNumber: null,
		sortCode: null,
		bankName: null,
	};
	let btnText = `Download .${payload.output}`;

	let businessName = '';
	let businessAddressLine1 = '';
	let businessAddressLine2 = '';

	let billingCompanyName = '';
	let billingCompanyAddressLine1 = '';
	let billingCompanyAddressLine2 = '';
	let billingCompanyRegistrationNumber: number | undefined = undefined;

	let invoiceNumber = '';
	let invoiceDate = new Date().toISOString().split('T')[0];
	let supplyStartDate: string = '';
	let supplyEndDate: string = '';

	let dueDate: string = '';
	let accountName: string | undefined = '';
	let accountNumber: number | undefined = undefined;
	let sortCode: number | undefined = undefined;
	let bankName = '';

	let logoImageUrl = '';
	let signatureImageUrl = '';

	let totalBorderColour = 'indigo';

	function validateFutureDate(inputDate, updateValue) {
		const today = new Date().toISOString().split('T')[0];
		if (inputDate > today) {
			updateValue(today);
		}
	}

	export function handleFutureDate(event, stateUpdater) {
		validateFutureDate(event.target.value, (newValue) => {
			event.target.value = newValue;
			stateUpdater(newValue);
		});
	}

	function validateMaxDate(inputDate, updateValue) {
		const maxDate = new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0];
		if (inputDate > maxDate) {
			error = `Date cannot be more than 1 year after today (${maxDate})!`;
			updateValue(maxDate);
		}
	}

	function validateMinDate(inputDate, updateValue) {
		const minDate = new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0];
		if (inputDate < minDate) {
			error = `Date cannot be more than 5 years before today (${minDate})!`;
			updateValue(minDate);
		}
	}

	export function handleDateChange(event, stateUpdater) {
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

	const validate = () => {
		const errors : ValidationErrors = {};
		if (!businessName) errors.businessName = 'Business Name is required';
		if (!businessAddressLine1) errors.businessAddressLine1 = 'Address is required';
		if (!businessAddressLine2) errors.businessAddressLine2 = 'Address is required';
		if (!billingCompanyName) errors.billingCompanyName = 'Billing Company Name is required';
		if (!billingCompanyAddressLine1) errors.billingCompanyAddressLine1 = 'Address is required';
		if (!billingCompanyAddressLine2) errors.billingCompanyAddressLine2 = 'Address is required';
		if (!invoiceNumber) errors.invoiceNumber = 'Invoice Number is required';
		if (new Date(invoiceDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.invoiceDate = `Value must be earlier than ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (new Date(invoiceDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.invoiceDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (supplyStartDate === '') errors.supplyStartDate = `Supply Start Date is required`;
		if (supplyStartDate !== '' && new Date(supplyStartDate) > new Date()) errors.supplyStartDate = `Value must be today or earlier: ${formatDateToCustomString(new Date().toISOString().split('T')[0])}`;
		if (supplyStartDate !== '' && new Date(supplyStartDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.supplyStartDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (supplyEndDate === '') errors.supplyEndDate = `Supply End Date is required`;
		if (supplyEndDate !== '' && new Date(supplyEndDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.supplyEndDate = `Value must be today or earlier: ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (supplyEndDate !== '' && new Date(supplyEndDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.supplyEndDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (dueDate === '') errors.dueDate = `Due Date is required`;
		if (dueDate !== '' && new Date(dueDate) > new Date(new Date().getFullYear() + 1, 11, 31)) errors.dueDate = `Value must be today or earlier: ${formatDateToCustomString(new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0])}`;
		if (dueDate !== '' && new Date(dueDate) < new Date(new Date().getFullYear() - 5, 0, 1)) errors.dueDate = `Value must be later than ${formatDateToCustomString(new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0])}`;
		if (!accountName) errors.accountName = 'Account Name is required';
		if (accountNumber === undefined) errors.accountNumber = 'Account Number is required';
		if (sortCode === undefined) errors.sortCode = 'Sort Code is required';
		if (sortCode != undefined && !/^\d{6}$/.test(sortCode.toString())) errors.sortCode = 'Sort Code must have exactly 6 digits';
		if (logoImageUrl != '' && !isValidUrl(logoImageUrl)) errors.logoImageUrl = 'Value is not a valid URL';
		if (signatureImageUrl != '' && !isValidUrl(signatureImageUrl)) errors.signatureImageUrl = 'Value is not a valid URL';

		return errors;
	};

	const mutateAsync = async () => {

		validationErrors = validate();

		// If a validationError is found, stop execution
		for (const [key, value] of Object.entries(validationErrors)) {
    if (value !== null) {
        // If a non-null value is found, set the key as the error message
        error = `Validation error in: ${key}`;
        return; // Stop further execution
    }
}

		    // Preprocess dates with formatDateToCustomString
			invoiceDate = formatDateToCustomString(invoiceDate);
    	supplyStartDate = formatDateToCustomString(supplyStartDate);
    	supplyEndDate = formatDateToCustomString(supplyEndDate);
    	dueDate = formatDateToCustomString(dueDate);

		Object.assign(data, {
			businessName,
			businessAddressLine1,
			businessAddressLine2,
			billingCompanyName,
			billingCompanyAddressLine1,
			billingCompanyAddressLine2,
			invoiceNumber,
			invoiceDate,
			supplyStartDate,
			supplyEndDate,
			dueDate,
			accountName,
			accountNumber,
			sortCode,
			bankName,
			logoImageUrl,
			signatureImageUrl,
			totalBorderColour,
		});

		console.log(data)

		isLoading = true;
		btnText = 'Downloading...';
		error = null;

		try {
			const response = await requestDownload(payload);
			if (response.error) {
				error = response.error;
				return;
			}

			if (response.requestId) {
				const { blob, error: downloadError } = await downloadDocument(response.requestId, {
					attempts: 10,
					interval: 2000,
				});
				if (downloadError) {
					error = downloadError;
					return;
				}

				if (blob) {
					downloadToBrowser(blob);
				}
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unexpected error occurred.';
		} finally {
			isLoading = false;
			btnText = `Download .${payload.output}`;
		}
	};
</script>

<form name="InvoiceGenerator" id="InvoiceGenerator" class="mx-10 p-4">
		<div class="grid grid-cols-3">
			<Input type="text" label="Business Name *" bind:value={businessName} error={validationErrors.businessName} />
			<Input type="text" label="Business Address Line 1 *" bind:value={businessAddressLine1} error={validationErrors.businessAddressLine1} />
			<Input type="text" label="Business Address Line 2 *" bind:value={businessAddressLine2} error={validationErrors.businessAddressLine2} />
			<!-- Billed To Details -->
<Input
type="text"
label="Billing Company Name *"
placeholder = "Billing Company Name"
bind:value={billingCompanyName}
error={validationErrors.billingCompanyName}
/>

<Input
type="text"
label="Billing Company Address Line 1 *"
placeholder = "Address Line 1"
bind:value={billingCompanyAddressLine1}
error={validationErrors.billingCompanyAddressLine1}
/>

<Input
type="text"
label="Billing Company Address Line 2 *"
placeholder = "Address Line 2"
bind:value={billingCompanyAddressLine2}
error={validationErrors.billingCompanyAddressLine2}
/>

<Input
type="number"
label="Billing Company Registration Number"
required = {false}
bind:value={billingCompanyRegistrationNumber}

/>

<!-- Invoice Information -->
<Input
type="text"
label="Invoice Number *"
placeholder = "HK12345"
bind:value={invoiceNumber}
error={validationErrors.invoiceNumber}

/>

<Input
type="date"
label="Invoice Date *"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={invoiceDate}
on:change={(e) => handleDateChange(e, (val) => (invoiceDate = val))}
error={validationErrors.invoiceDate}
/>

<Input
type="date"
label="Supply Start Date *"
max={new Date().toISOString().split('T')[0]}
bind:value={supplyStartDate}
on:change={(e) => handleFutureDate(e, (val) => (supplyStartDate = val))}
error={validationErrors.supplyStartDate}
/>

<Input
type="date"
label="Supply End Date *"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={supplyEndDate}
on:change={(e) => handleDateChange(e, (val) => (supplyEndDate = val))}
error={validationErrors.supplyEndDate}

/>

<!-- Invoice Total -->

    <Select
    label="Total Border Colour"
    bind:value={totalBorderColour}>
    <option value="indigo">Indigo</option>
    <option value="violet">Violet</option>
    <option value="purple">Purple</option>
    <option value="teal">Teal</option>
    <option value="cyan">Cyan</option>
    <option value="sky">Sky</option>
    <option value="blue">Blue</option>
    <option value="fuchsia">Fuchsia</option>
    <option value="red">Red</option>
    <option value="rose">Rose</option>
    <option value="pink">Pink</option>
    <option value="orange">Orange</option>
    <option value="amber">Amber</option>
    <option value="yellow">Yellow</option>
    <option value="lime">Lime</option>
    <option value="green">Green</option>
    <option value="emerald">Emerald</option>
    <option value="slate">Slate</option>
    <option value="grey">Grey</option>
    <option value="zinc">Zinc</option>
    <option value="stone">Stone</option>
</Select>

<Input
type="date"
label="Payment Due Date *"
max={new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]}
min={new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0]}
bind:value={dueDate}
on:change={(e) => handleDateChange(e, (val) => (dueDate = val))}
error={validationErrors.dueDate}

/>

<!-- Payment Information -->
<Input
type="text"
label="Account Name *"
bind:value={accountName}
error={validationErrors.accountName}
/>

<Input
type="number"
label="Account Number *"
bind:value={accountNumber}
error={validationErrors.accountNumber}
/>

<Input
type="number"
label="Sort Code *"
max={999999}
bind:value={sortCode}
on:input={(e) => {
    const input = e.target.value;
    if (input.length > 6) {
      e.target.value = input.slice(0, 6); // Truncate to 6 digits
    }
    sortCode = e.target.value; // Update value
  }}
  error={validationErrors.sortCode}

/>

<Input
type="text"
label="Bank Name"
placeholder = 'e.g. HSBC'
required={false}
bind:value={bankName}
/>

<!-- Image URLs -->
<Input
type="text"
label="Logo Image URL"
placeholder = 'Public Image URL'
required={false}
bind:value={logoImageUrl}
error={validationErrors.logoImageUrl}

/>

<Input
type="text"
label="Signature Image URL"
placeholder = 'Public Image URL'
required={false}
bind:value={signatureImageUrl}
error={validationErrors.signatureImageUrl}
/>

		</div>

<Button
	class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
	on:click={mutateAsync}
	disabled={isLoading}
>
	{btnText}
</Button>

{#if error}
<span class="block text-xs font-normal text-red-500">Please fill out the required fields</span>
{/if}

</form>