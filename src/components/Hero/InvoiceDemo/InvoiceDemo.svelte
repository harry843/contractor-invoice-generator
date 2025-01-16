<script lang="ts">
	import { demoVariables } from '$lib/store';
	import {
		downloadDocument,
		downloadToBrowser,
		requestDownload,
		type PayloadInput
	} from '$lib/tailwindstream';
	import { onDestroy, onMount } from 'svelte';
	import DownloadInvoice from '../../InvoiceForm/FormElements/DownloadInvoice.svelte';
	import { invoiceDemo } from '$lib/htmltemplates';
	import ContentEditableTd from './ContentEditable/ContentEditableTD.svelte';
	import ContentEditableTh from './ContentEditable/ContentEditableTH.svelte';
	import ContentEditable from './ContentEditable/ContentEditableP.svelte';
	import type { RemoveBorder } from '$lib/types';
	import CodeEditor from './CodeEditor/CodeEditor.svelte';
	import MobileBanner from '../../Banner/MobileBanner.svelte';

	export let screenwidth;

	$: data = $demoVariables;

	let payload: PayloadInput = {
		html: invoiceDemo.html,
		engine: 'handlebars',
		data: $demoVariables,
		output: 'pdf',
		size: 'a4'
	};

	let tempValues: Record<string, string> = {};

	// Track the currently focused field
	let focusedField: string | null = null;

	let isLoading = false;
	let error: any = null;
	let btnText = `Download`;

	let firstInput: { focus: () => void };
	let removeBorder: RemoveBorder = {
		businessName: false,
		businessAddressLine1: false,
		businessAddressLine2: false,
		billingCompanyName: false,
		billingCompanyAddressLine1: false,
		billingCompanyAddressLine2: false,
		invoiceNumber: false,
		invoiceDate: false,
		supplyDates: false,
		taskDescription1: false,
		taskHours1: false,
		taskRate1: false,
		taskTotal1: false,
		taskDescription2: false,
		taskHours2: false,
		taskRate2: false,
		taskTotal2: false,
		totalDue: false,
		dueDate: false,
		accountName: false,
		accountNumber: false,
		sortCode: false,
		bankName: false
	};

	let isPreview = true;

	$: isDarkMode = false;
	$: theme = isDarkMode ? 'vs-dark' : 'vs';

	const onClick = () => {
		isPreview = !isPreview;
	};

	// Update function to bind changes to the store
	function updateField(field: keyof typeof $demoVariables, value: string) {
		$demoVariables[field] = value;
	}

	const mutateAsync = async () => {
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
					interval: 2000
				});
				if (downloadError) {
					error = downloadError;
					return;
				}

				if (blob) {
					downloadToBrowser(blob, data.invoiceNumber);
				}
			}
		} catch (err) {
			error =
				err instanceof Error
					? err.message
					: 'An unexpected error occurred, please try again later.';
		} finally {
			isLoading = false;
			btnText = `Download .${payload.output}`;
		}
	};

	function handleInput(e: { target: any }, key: keyof typeof $demoVariables) {
		const element = e.target;
		const value = element.textContent || '';

		// Only store the value if it has actually changed
		if (tempValues[key] !== value) {
			tempValues[key] = value;
		}
	}

	// Handle keydown events (to ensure left-to-right text)
	function handleKeyDown(e: { target: any }, key: keyof typeof $demoVariables) {
		const element = e.target;

		// Set text-align right to left for invoice info
		if (
			!element.hasAttribute('dir') &&
			['invoiceNumber', 'invoiceDate', 'supplyDates'].includes(key)
		) {
			element.setAttribute('dir', 'ltr');
			element.style.textAlign = 'right'; // Align text to the left
			element.style.unicodeBidi = 'isolate'; // Prevent the text direction change
		}
		// Ensure the text direction is left-to-right
		else if (!element.hasAttribute('dir')) {
			element.setAttribute('dir', 'ltr');
			element.style.textAlign = 'left'; // Align text to the left
			element.style.unicodeBidi = 'isolate'; // Prevent the text direction change
		}
	}

	// When user finishes editing, update the store
	function handleBlur(key: keyof RemoveBorder) {
		const tempValue = tempValues[key] || ''; // Use the temporary value
		updateField(key, tempValue); // Commit the temp value to the store

		// Clear the focused field after blur
		focusedField = null;

		// Remove border after blur
		removeBorder[key] = true;
	}

	// Handle focus to track the current field being edited
	function handleFocus(key: keyof typeof $demoVariables) {
		focusedField = key;
	}

	// Set focus on the first input when the component is mounted
	onMount(() => {
		if (firstInput) {
			firstInput.focus();
			window.scrollTo({ top: 0 });
		}

		// Dark mode observer logic
		isDarkMode = document.documentElement.classList.contains('dark');
		const observer = new MutationObserver(() => {
			isDarkMode = document.documentElement.classList.contains('dark');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		onDestroy(() => observer.disconnect());
	});
</script>

<section class="bg-hero-pattern dark:border-t-8 dark:border-gray-900 dark:bg-gray-900">
	<div class="flex flex-col items-center pt-12 dark:bg-gray-900 sm:pt-28">
		<!-- Invoice Demo Container -->
		<div
			id="container"
			class="flex flex-col items-center justify-center space-y-4 rounded-md bg-gray-100 py-6 dark:bg-hero-pattern sm:px-6"
		>
			<div
				class="flex flex-col items-center sm:w-full sm:flex-row sm:justify-between lg:min-w-[240mm]"
			>
				<div
					class="flex w-36 justify-center space-x-2 rounded-md border border-gray-200 bg-gray-100 px-2 py-1.5"
				>
					<button
						class="rounded-md px-2 py-1 text-sm font-semibold text-indigo-800 sm:min-w-16 {isPreview
							? 'bg-indigo-200'
							: 'hover:bg-indigo-100'}"
						on:click={onClick}
						>Preview
					</button>

					<button
						class="rounded-md px-2 py-1 text-sm font-semibold text-indigo-800 sm:min-w-16 {!isPreview
							? 'bg-indigo-200'
							: 'hover:bg-indigo-100'}"
						on:click={onClick}>Code</button
					>
				</div>
				<h1
					class="translate-y-[15%] items-center font-customHeading text-2xl font-bold lg:text-3xl"
				>
					Invoice-r Playground
				</h1>
				{#if screenwidth >= 640}
					<DownloadInvoice handleSubmit={mutateAsync} {btnText} {isLoading} {error} />
				{/if}
			</div>
			<div class="flex items-start justify-start lg:min-w-[240mm]">
				{#if isPreview}
					<div class="rounded-md border border-gray-200 p-2 text-left text-sm">
						Click on a text box in the document below to edit
					</div>
				{:else}
					<div class="rounded-md border border-gray-200 p-2 text-left text-sm">
						Invoice-r converts HTML code into pdf using <a
							class="text-indigo-600 underline hover:no-underline"
							href="https://tailwindpdf.com/"
							target="_blank"
							rel="noopener">tailwindpdf</a
						>
					</div>
				{/if}
			</div>
			{#if screenwidth <= 640}
				<MobileBanner />
			{/if}
			<div
				id="preview"
				class="w-full border bg-white p-8 shadow-md sm:aspect-[210/297] sm:max-h-[297mm] sm:max-w-[210mm]"
			>
				{#if isPreview}
					<!-- Header with Logo, Title, and Contact Details -->
					<div
						class="flex flex-col justify-start sm:mb-12 sm:flex-row sm:items-center sm:justify-between"
					>
						<!-- Logo and Title -->
						<div class="flex items-center">
							<img src="logo2.png" alt="Company Logo" class="mr-4 h-16 w-16" />
							<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
						</div>

						<!-- Contact Details and Address -->
						<div id="contact-details" class=" mt-5 flex flex-col justify-start text-left sm:mt-0">
							{#if screenwidth <= 640}
								<h2 class="pb-1 text-lg font-medium text-gray-800">CONTACT DETAILS:</h2>
							{/if}
							<p
								contenteditable="true"
								bind:this={firstInput}
								class="mb-0.5 rounded-md px-2 py-0.5 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 {removeBorder.businessName
									? 'border-none'
									: 'border border-gray-500 dark:border-gray-200'}"
								on:input={(e) => handleInput(e, 'businessName')}
								on:keydown={(e) => handleKeyDown(e, 'businessName')}
								on:blur={() => handleBlur('businessName')}
								on:focus={() => handleFocus('businessName')}
							>
								{data.businessName}
							</p>

							<ContentEditable
								field={'businessAddressLine1'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.businessAddressLine1}
							</ContentEditable>

							<ContentEditable
								field={'businessAddressLine2'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.businessAddressLine2}
							</ContentEditable>
						</div>
					</div>

					<div
						class="mb-6 flex flex-col justify-between text-gray-700 sm:mb-12 sm:flex-row sm:items-center"
					>
						<div id="billed-to" class="mt-6">
							<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
							<ContentEditable
								field={'billingCompanyName'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.billingCompanyName}
							</ContentEditable>
							<ContentEditable
								field={'billingCompanyAddressLine1'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.billingCompanyAddressLine1}
							</ContentEditable>
							<ContentEditable
								field={'billingCompanyAddressLine2'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.billingCompanyAddressLine2}
							</ContentEditable>
							<ContentEditable
								field={'billingCompanyRegistrationNumber'}
								{handleInput}
								{handleKeyDown}
								{handleBlur}
								{handleFocus}
								{removeBorder}
							>
								{data.billingCompanyRegistrationNumber}
							</ContentEditable>
						</div>

						<div class="mt-6">
							<h2 class="pb-1 text-lg font-medium text-gray-800">INVOICE INFORMATION:</h2>
							<div
								id="invoice-info"
								class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700"
							>
								<p class="text-left">Invoice Number:</p>
								<ContentEditable
									field={'invoiceNumber'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									css={'text-right'}
									{removeBorder}
								>
									{data.invoiceNumber}
								</ContentEditable>

								<p class="text-left">Invoice Date:</p>
								<ContentEditable
									field={'invoiceDate'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									css={'text-right'}
									{removeBorder}
								>
									{data.invoiceDate}
								</ContentEditable>

								<p class="text-left">Supply Dates:</p>
								<ContentEditable
									field={'supplyDates'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									css={'text-right'}
									{removeBorder}
								>
									{data.supplyDates}
								</ContentEditable>
							</div>
						</div>
					</div>

					<div class="mb-3 mt-6">
						<table
							id="invoice-table"
							class="rounded-sm text-left outline outline-1 outline-gray-300 sm:w-full"
						>
							<thead>
								<tr class="bg-gray-100 font-sans font-medium">
									<th class="border border-gray-300 p-2 font-medium">Task Description</th>
									<th class="border border-gray-300 p-2 font-medium">Hours</th>
									<th class="border border-gray-300 p-2 font-medium">Rate</th>
									<th class="border border-gray-300 p-2 font-medium">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<ContentEditableTd
										field={'taskDescription1'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskDescription1}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskHours1'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskHours1}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskRate1'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskRate1}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskTotal1'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskTotal1}
									</ContentEditableTd>
								</tr>
								<tr>
									<ContentEditableTd
										field={'taskDescription2'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskDescription2}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskHours2'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskHours2}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskRate2'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskRate2}
									</ContentEditableTd>
									<ContentEditableTd
										field={'taskTotal2'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.taskTotal2}
									</ContentEditableTd>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="mb-8 flex justify-center sm:mb-12 sm:justify-end">
						<table
							id="total-due"
							class="rounded-sm outline outline-1 outline-indigo-600 sm:w-[14.285rem]"
						>
							<thead>
								<tr class="border-b border-indigo-300">
									<th class="w-24 p-1 text-left font-medium">Total Due:</th>
									<ContentEditableTh
										field={'totalDue'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.totalDue}
									</ContentEditableTh>
								</tr>
								<tr class="">
									<th class="w-24 p-1 text-left font-medium">Due Date:</th>
									<ContentEditableTh
										field={'dueDate'}
										{handleInput}
										{handleKeyDown}
										{handleBlur}
										{handleFocus}
									>
										{data.dueDate}
									</ContentEditableTh>
								</tr>
							</thead>
						</table>
					</div>

					<div class="my-6 flex flex-col items-start justify-between gap-y-5 sm:flex-row">
						<div>
							<h2 class="pb-1 text-lg font-medium text-gray-800">PAYMENT INFORMATION:</h2>
							<div id="invoice-info" class="grid w-80 grid-cols-2 gap-x-2 text-gray-700">
								<p class="text-left">Account Name:</p>
								<ContentEditable
									field={'accountName'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									{removeBorder}
								>
									{data.accountName}
								</ContentEditable>

								<p class="text-left">Account Number:</p>
								<ContentEditable
									field={'accountNumber'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									{removeBorder}
								>
									{data.accountNumber}
								</ContentEditable>

								<p class="text-left">Sort Code:</p>
								<ContentEditable
									field={'sortCode'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									{removeBorder}
								>
									{data.sortCode}
								</ContentEditable>

								<p class="text-left">Bank Name:</p>
								<ContentEditable
									field={'bankName'}
									{handleInput}
									{handleKeyDown}
									{handleBlur}
									{handleFocus}
									{removeBorder}
								>
									{data.bankName}
								</ContentEditable>
							</div>
						</div>

						<div>
							<p class="pb-1 text-lg font-medium text-gray-800">SIGNATURE:</p>
							<div class="flex items-start">
								<img src="hk_signature.png" alt="Signature" class="w-52 items-start py-2" />
							</div>
						</div>
						{#if screenwidth < 640}
							<div class="flex items-center justify-center pt-2">
								<DownloadInvoice handleSubmit={mutateAsync} {btnText} {isLoading} {error} />
							</div>
						{/if}
					</div>
				{:else}
					<div class="h-[272mm]">
						<CodeEditor bind:code={payload.html} language="html" {theme} />
					</div>
				{/if}
			</div>
		</div>
		<div class="h-20 border-slate-100 dark:border-b-4 dark:bg-gray-900"></div>
	</div>
</section>
