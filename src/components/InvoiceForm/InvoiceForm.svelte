<script lang='ts'>
	import { currentStep } from '$lib/store';
	import Stepper from './Stepper/Stepper.svelte';
	import InvoiceRow from "./FormSection/InvoiceItems.svelte";
	import CompanyDetails from "./FormSection/CompanyDetails.svelte";
	import InvoiceDetails from "./FormSection/InvoiceDetails.svelte";
	import Back from "./FormElements/Back.svelte";
	import PayeeDetails from "./FormSection/PayeeDetails.svelte";
	import SubmissionPage from "./FormSection/SubmissionPage.svelte";
	
	export let data;
	export let payload;

	// Navigation functions
    const goToPrevious = () => currentStep.update(n => Math.max(n - 1, 1));

  	// Fetch current step for the UI
  	let step = 1;
  	currentStep.subscribe(value => step = value);
	
</script>
<div>
	<!-- Progress step tracker -->
	<Stepper step={currentStep}/>

<form class="px-[5%]">
<!-- 1. Company details -->
{#if step == 1}
<CompanyDetails step={currentStep} />
{/if}

<!-- 2. Invoice details -->
 {#if step == 2}
 <InvoiceDetails step={currentStep} />

{/if}

<!-- 3. Invoice items --> 
{#if step == 3}
<div class="grid grid-cols-5 justify-items-start items-center">
	<div class="col-span-2">
	<Back  {step} {goToPrevious} />
	</div>
	<h1 class="col-span-3 text-xl py-2.5 font-semibold text-center font-customHeading">Invoice Items</h1>
	</div>

<InvoiceRow step={currentStep} />
{/if}

<!-- 4. Payee Information -->
 {#if step == 4}
 <PayeeDetails step={currentStep} />

{/if}

<!-- 5. Finishing touches -->
 {#if step == 5}

<SubmissionPage step={currentStep} {data} {payload} />

{/if}

</form>
</div>