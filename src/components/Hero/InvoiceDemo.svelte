<script lang="ts">
    import { demoVariables } from "$lib/store";
	import { downloadDocument, downloadToBrowser, requestDownload, type PayloadInput } from "$lib/tailwindstream";
    import { onMount } from 'svelte';
	import DownloadInvoice from "../InvoiceForm/FormElements/DownloadInvoice.svelte";
	import { invoiceDemo } from "$lib/htmltemplates";
	import ContentEditableFirstP from "./ContentEditableFirstP.svelte";
	import ContentEditableTd from "./ContentEditableTD.svelte";
	import ContentEditableTh from "./ContentEditableTH.svelte";
	import ContentEditable from "./ContentEditableP.svelte";

    $: data = $demoVariables

    let payload: PayloadInput = {
      html: invoiceDemo.html,
      engine: "handlebars",
      data: $demoVariables,
      output: "pdf",
      size: "a4",
    };

    let tempValues: Record<string, string> = {};
    
    // Track the currently focused field
    let focusedField: string | null = null;

    let isLoading = false;
	let error: any = null;
	let btnText = `Download`;

    let firstInput: { focus: () => void; };

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
                    interval: 2000,
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
            error = err instanceof Error ? err.message : 'An unexpected error occurred, please try again later.';
        } finally {
            isLoading = false;
            btnText = `Download .${payload.output}`;
        }
    };

    function handleInput(e: { target: any; }, key: keyof typeof $demoVariables) {
        const element = e.target;
        const value = element.textContent || '';

        // Only store the value if it has actually changed
        if (tempValues[key] !== value) {
            tempValues[key] = value;
        }

    }

    // Handle keydown events (to ensure left-to-right text)
    function handleKeyDown(e: { target: any; }) {
        const element = e.target;

        // Ensure the text direction is left-to-right
        if (!element.hasAttribute("dir")) {
            element.setAttribute("dir", "ltr");
            element.style.textAlign = "left"; // Align text to the left
            element.style.unicodeBidi = "isolate"; // Prevent the text direction change
        }
    }

    // When user finishes editing, update the store
    function handleBlur(key: keyof typeof $demoVariables) {
        const tempValue = tempValues[key] || ''; // Use the temporary value
        updateField(key, tempValue); // Commit the temp value to the store

        // Clear the focused field after blur
        focusedField = null
    }

    // Handle focus to track the current field being edited
    function handleFocus(key: keyof typeof $demoVariables) {
        focusedField = key;
    }

     // Set focus on the first input when the component is mounted
  onMount(() => {
    if (firstInput) {
      firstInput.focus();
    }
  })
</script>

<section class="py-4">
    <DownloadInvoice handleSubmit={mutateAsync} {btnText} {isLoading} {error} />
    <div class="w-full md:w-2/3 max-w-[210mm] h-[294mm] bg-white border shadow-md border-gray-100 mx-auto p-8 sm:p-16">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src="logo2.png" alt="Company Logo" class="mr-4 h-16 w-16" />
			<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<ContentEditableFirstP field={'businessName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {firstInput}>
                {data.businessName}
            </ContentEditableFirstP>

			<ContentEditable field={'businessAddressLine1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.businessAddressLine1}
            </ContentEditable>

			<ContentEditable field={'businessAddressLine2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.businessAddressLine2}
            </ContentEditable>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
			<ContentEditable field={'billingCompanyName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.billingCompanyName}
            </ContentEditable>
			<ContentEditable field={'billingCompanyAddressLine1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.billingCompanyAddressLine1}
            </ContentEditable>
			<ContentEditable field={'billingCompanyAddressLine2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.billingCompanyAddressLine2}
            </ContentEditable>
			<ContentEditable field={'billingCompanyRegistrationNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                {data.billingCompanyRegistrationNumber}
            </ContentEditable>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<p class="text-left">Invoice Number:</p>
                <ContentEditable field={'invoiceNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}>
                    {data.invoiceNumber}
                </ContentEditable>

				<p class="text-left">Invoice Date:</p>
                <ContentEditable field={'invoiceDate'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}>
                    {data.invoiceDate}
                </ContentEditable>

				<p class="text-left">Supply Dates:</p>
                <ContentEditable field={'supplyDates'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}>
                    {data.supplyDates}
                </ContentEditable>
			</div>
		</div>
	</div>

	<div class="mb-3 mt-6">
		<table
			id="invoice-table"
			class="w-full rounded-sm text-left outline outline-1 outline-gray-300"
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
					<ContentEditableTd field={'taskDescription1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskDescription1}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskHours1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskHours1}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskRate1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskRate1}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskTotal1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskTotal1}
                    </ContentEditableTd>
				</tr>
                <tr>
					<ContentEditableTd field={'taskDescription2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskDescription2}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskHours2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskHours2}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskRate2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskRate2}
                    </ContentEditableTd>
					<ContentEditableTd field={'taskTotal2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.taskTotal2}
                    </ContentEditableTd>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-[14.285rem] rounded-sm outline outline-1 outline-indigo-600">
			<thead>
				<tr class="border-b border-indigo-300">
					<th class="w-24 p-1 text-left font-medium">Total Due:</th>
                        <ContentEditableTh field={'totalDue'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                            {data.totalDue}
                        </ContentEditableTh>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-medium">Due Date:</th>
                    <ContentEditableTh field={'dueDate'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                        {data.dueDate}
                    </ContentEditableTh>
				</tr>
			</thead>
		</table>
	</div>

	<div class="my-6 flex items-start justify-between">
		<div>
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				PAYMENT INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 gap-x-2 text-gray-700">
				<p class="text-left">Account Name:</p>
                <ContentEditable field={'accountName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                    {data.accountName}
                </ContentEditable>

				<p class="text-left">Account Number:</p>
                <ContentEditable field={'accountNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                    {data.accountNumber}
                </ContentEditable>

				<p class="text-left">Sort Code:</p>
                <ContentEditable field={'sortCode'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                    {data.sortCode}
                </ContentEditable>

				<p class="text-left">Bank Name:</p>
                <ContentEditable field={'bankName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}>
                    {data.bankName}
                </ContentEditable>
			</div>
		</div>

		<div>
			<p class="pb-1 text-lg font-medium text-gray-800">SIGNATURE:</p>
			<div class="flex items-start">
			<img src="hk_signature.png" alt="Signature" class=" items-start w-52 py-2" />
			</div>
		</div>
	</div>
</div>
</section>