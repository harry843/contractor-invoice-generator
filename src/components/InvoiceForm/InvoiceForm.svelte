<script lang='ts'>
	import { requestDownload, downloadDocument, downloadToBrowser } from "$lib/tailwindstream";
	import { validateFutureDate, validateMinDate, validateMaxDate, formatDateToCustomString, isValidUrl, filterRowsArray, generateHtmlTableRows } from '$lib/utils';
	import type { ValidationErrors } from '$lib/types';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	import { invoiceItems, currentStep, payeeDetails } from '$lib/store';
	import Stepper from './Stepper/Stepper.svelte';
	import Input from "./FormElements/Input.svelte";
	import Select from "./FormElements/Select.svelte";
	import InvoiceRow from "./FormSection/InvoiceItems.svelte";
	import Button from "./FormElements/Button.svelte";
	import Navigation from "./FormElements/Forward.svelte";
	import CompanyDetails from "./FormSection/CompanyDetails.svelte";
	import InvoiceDetails from "./FormSection/InvoiceDetails.svelte";
	import Back from "./FormElements/Back.svelte";
	import PayeeDetails from "./FormSection/PayeeDetails.svelte";
	import FinishingTouches from "./FormSection/FinishingTouches.svelte";
	import DownloadInvoice from "./FormElements/DownloadInvoice.svelte";
	import SubmissionPage from "./FormSection/SubmissionPage.svelte";
	
	export let data;
	export let payload;

	// Navigation functions
	const goToNext = () => currentStep.update(n => Math.min(n + 1, 5));
    const goToPrevious = () => currentStep.update(n => Math.max(n - 1, 1));

  	// Fetch current step for the UI
  	let step = 1;
  	currentStep.subscribe(value => step = value);
	

	// let validationErrors: ValidationErrors = {
	// 	businessName: null,
	// 	businessAddressLine1: null,
	// 	businessAddressLine2: null,
	// 	billingCompanyName: null,
	// 	billingCompanyAddressLine1: null,
	// 	billingCompanyAddressLine2: null,
	// 	invoiceNumber: null,
	// 	invoiceDate: null,
	// 	supplyStartDate: null,
	// 	supplyEndDate: null,
	// 	logoImageUrl: null,
	// 	signatureImageUrl: null,
	// 	dueDate: null,
	// 	accountName: null,
	// 	accountNumber: null,
	// 	sortCode: null,
	// 	bankName: null,
	// 	invoiceRow: null,
	// };




</script>
<div>
	<!-- Progress step tracker -->
	<Stepper {step}/>

<form class="px-[5%]">
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
<div class="grid grid-cols-5 justify-items-start items-center">
	<div class="col-span-2">
	<Back  {step} {goToPrevious} />
	</div>
	<h1 class="col-span-3 text-xl py-2.5 font-semibold text-center font-customHeading">Invoice Items</h1>
	</div>

<InvoiceRow {step} />
{/if}

<!-- 4. Payee Information -->
 {#if step == 4}
 <PayeeDetails {step} />

{/if}

<!-- 5. Finishing touches -->
 {#if step == 5}

<SubmissionPage {step} {data} {payload} />

{/if}

</form>
</div>