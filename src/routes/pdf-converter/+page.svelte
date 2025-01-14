<script lang="ts">
	import { invoiceTemplate } from '$lib/htmltemplates';
	import type { PayloadInput } from '$lib/tailwindstream';
	import type { InvoiceData } from '$lib/types';
	import { onMount } from 'svelte';
	import InvoiceForm from '../../components/InvoiceForm/InvoiceForm.svelte';
	import Preview from '../../components/InvoiceForm/Preview/Preview.svelte';
	import Button from '../../components/InvoiceForm/FormElements/Button.svelte';

	let data: InvoiceData = {
		businessName: '',
		businessAddressLine1: '',
		businessAddressLine2: '',
		billingCompanyName: '',
		billingCompanyAddressLine1: '',
		billingCompanyAddressLine2: '',
		billingCompanyRegistrationNumber: undefined,
		invoiceNumber: '',
		invoiceDate: new Date().toISOString().split('T')[0],
		supplyStartDate: '',
		supplyEndDate: '',
		currency: '',
		grandTotal: 0,
		dueDate: '',
		accountName: '',
		accountNumber: undefined,
		sortCode: undefined,
		bankName: '',
		logoImageUrl: '',
		signatureImageUrl: '',
		totalBorderColour: 'indigo',
		tableBorderColour: 'gray',
		invoiceHtmlString: undefined
	};

	let payload: PayloadInput = {
		html: invoiceTemplate.html,
		engine: 'handlebars',
		data: data,
		output: 'pdf',
		size: 'a4'
	};

	let isWideEnough = true;

	const checkScreenWidth = () => {
		isWideEnough = window.innerWidth >= 1024;
	};

	onMount(() => {
		checkScreenWidth();
		window.addEventListener('resize', checkScreenWidth);
		return () => window.removeEventListener('resize', checkScreenWidth);
	});

	const openPreview = () => {
		window.open('/preview', '_blank'); // Adjust the path as needed
	};
</script>

<div class="flex flex-col p-3 lg:flex-row">
	<!-- Invoice Form -->
	<div class="w-full min-w-[300px] md:pt-12 lg:w-1/2">
		<InvoiceForm {data} {payload} />
	</div>

	<!-- Conditional Rendering for Preview -->
	{#if isWideEnough}
		<div
			class="mx-auto hidden w-full border border-gray-200 bg-white p-8 shadow-md md:block md:max-w-[595px] lg:w-1/2 lg:translate-y-16 xl:p-16"
		>
			<Preview />
		</div>
	{:else}
		<div class="mt-4 flex justify-start px-[5%]">
			<Button on:click={openPreview} colour="slate">Preview</Button>
		</div>
	{/if}
</div>
