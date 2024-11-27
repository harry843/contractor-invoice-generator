<script lang='ts'>
	import { requestDownload, downloadDocument, downloadToBrowser } from "$lib/tailwindstream";
	import { validateFutureDate, validateMinDate, validateMaxDate, formatDateToCustomString, isValidUrl, filterRowsArray, generateHtmlTableRows } from '$lib/utils';
	import type { ValidationErrors } from '$lib/types';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	import { invoiceItems, currentStep } from '$lib/store';
	import Stepper from './Stepper/Stepper.svelte';
	import Input from "./FormElements/Input.svelte";
	import Select from "./FormElements/Select.svelte";
	import InvoiceRow from "./FormSection/InvoiceItems.svelte";
	import Button from "./FormElements/Button.svelte";
	import Navigation from "./FormElements/Navigation.svelte";
	import CompanyDetails from "./FormSection/CompanyDetails.svelte";
	import InvoiceDetails from "./FormSection/InvoiceDetails.svelte";
	
	export let data;
	export let payload;

	// Navigation functions
	const goToNext = () => currentStep.update(n => Math.min(n + 1, 5));
    const goToPrevious = () => currentStep.update(n => Math.max(n - 1, 1));

  	// Fetch current step for the UI
  	let step = 1;
  	currentStep.subscribe(value => step = value);
	
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
		invoiceRow: null,
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
	let currency = '£';
	let grandTotal: number | string = 0;

	let invoiceHtmlString = undefined;

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

	const validate = () => {
		const errors : ValidationErrors = {};
		// Company Details
		if (!businessName) errors.businessName = 'Business Name is required';
		if (!businessAddressLine1) errors.businessAddressLine1 = 'Address is required';
		if (!businessAddressLine2) errors.businessAddressLine2 = 'Address is required';
		if (!billingCompanyName) errors.billingCompanyName = 'Billing Company Name is required';
		if (!billingCompanyAddressLine1) errors.billingCompanyAddressLine1 = 'Address is required';
		if (!billingCompanyAddressLine2) errors.billingCompanyAddressLine2 = 'Address is required';
		// Invoice Details
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
		// Payee Details
		if (!accountName) errors.accountName = 'Account Name is required';
		if (accountNumber === undefined) errors.accountNumber = 'Account Number is required';
		if (sortCode === undefined) errors.sortCode = 'Sort Code is required';
		if (sortCode != undefined && !/^\d{6}$/.test(sortCode.toString())) errors.sortCode = 'Sort Code must have exactly 6 digits';
		// Finishing touches
		if (logoImageUrl != '' && !isValidUrl(logoImageUrl)) errors.logoImageUrl = 'Value is not a valid URL';
		if (signatureImageUrl != '' && !isValidUrl(signatureImageUrl)) errors.signatureImageUrl = 'Value is not a valid URL';
		if (filterRowsArray($invoiceItems).length === 0) errors.invoiceRow = 'Invoice data is required';

		return errors;
	};

	const mutateAsync = async () => {

		validationErrors = validate();

		// If a validationError is found, stop execution
		for (const [key, value] of Object.entries(validationErrors)) {
    if (value !== null) {
        // If a non-null value is found, set the key as the error message
        error = 'Please fill out the required fields';
        return; // Stop further execution
    }
}

		// Preprocess dates with formatDateToCustomString
		invoiceDate = formatDateToCustomString(invoiceDate);
    	supplyStartDate = formatDateToCustomString(supplyStartDate);
    	supplyEndDate = formatDateToCustomString(supplyEndDate);
    	dueDate = formatDateToCustomString(dueDate);

		// Process invoiceRows data into HTML string
		invoiceHtmlString = generateHtmlTableRows(filterRowsArray($invoiceItems), currency)

		// Calculate grand total owed
		grandTotal = $invoiceItems.reduce((sum, row) => sum + (row.total || 0), 0).toFixed(2)

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
			grandTotal,
			dueDate,
			accountName,
			accountNumber,
			sortCode,
			bankName,
			logoImageUrl,
			signatureImageUrl,
			totalBorderColour,
			currency,
			invoiceHtmlString
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
			error = err instanceof Error ? err.message : 'An unexpected error occurred, please try again later.';
		} finally {
			isLoading = false;
			btnText = `Download .${payload.output}`;
		}
	};
</script>

	<!-- Progress step tracker -->
	<Stepper {step}/>
	

<div class="flex flex-row">
<form class="px-[2.5%] w-1/2">
<!-- 1. Company details -->
{#if step == 1}
<CompanyDetails {step} />
{/if}

<!-- 2. Invoice details -->
 {#if step == 2}
 <InvoiceDetails {step} />

{/if}

<!-- 3. Invoice items --> 
{#if step == 3}
<h1 class="text-xl py-2.5 font-semibold text-center font-customHeading">Invoice Items</h1>

<InvoiceRow {step} error={validationErrors.invoiceRow} />
{/if}

<!-- 4. Payee Information -->
 {#if step == 4}
 <h1 class="text-xl py-2.5 font-semibold text-center font-customHeading">Payee Information</h1>

<Input
type="text"
label="Account Name"
bind:value={accountName}
error={validationErrors.accountName}
/>

<Input
type="number"
label="Account Number"
bind:value={accountNumber}
error={validationErrors.accountNumber}
/>

<Input
type="number"
label="Sort Code"
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

{/if}

<!-- 5. Finishing touches -->
 {#if step == 5}
 <h1 class="text-xl py-2.5 font-semibold text-center font-customHeading">Finishing Touches</h1>

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

<Select
label="Total Due Border Colour"
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


		<Button
		class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
		on:click={mutateAsync}
		disabled={isLoading}
	>
		{#if isLoading}
		<div class="flex flex-row">
			<LoadingSpinner />
			<span class="inline">{btnText}</span>
		</div>
		{:else}
		<span class="inline">{btnText}</span>
		{/if}

	</Button>
	{/if}

{#if error}
<span class="block text-xs font-normal text-red-500">{error}</span>
{/if}

<Navigation {step} {goToNext} {goToPrevious}/>
</form>
<div class="w-1/2 bg-black"></div>
</div>