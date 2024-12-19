<script lang="ts">
    import { demoVariables } from "$lib/store";
	import { downloadDocument, downloadToBrowser, requestDownload, type PayloadInput } from "$lib/tailwindstream";
    import { onDestroy, onMount } from 'svelte';
	import DownloadInvoice from "../../InvoiceForm/FormElements/DownloadInvoice.svelte";
	import { invoiceDemo } from "$lib/htmltemplates";
	import ContentEditableTd from "./ContentEditable/ContentEditableTD.svelte";
	import ContentEditableTh from "./ContentEditable/ContentEditableTH.svelte";
	import ContentEditable from "./ContentEditable/ContentEditableP.svelte";
	import type { RemoveBorder } from "$lib/types";
	import CodeEditor from "./CodeEditor/CodeEditor.svelte";

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
    let removeBorder: RemoveBorder = 
    {
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
    bankName: false,
}

    let isPreview = true;

    $: isDarkMode = false;
    $: theme = isDarkMode ? 'vs-dark' : 'vs'

    const onClick = () => {
        isPreview = !isPreview
    }


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
    function handleKeyDown(e: { target: any; }, key: keyof typeof $demoVariables) {
        const element = e.target;

        // Set text-align right to left for invoice info
        if (!element.hasAttribute("dir") && ['invoiceNumber', 'invoiceDate', 'supplyDates'].includes(key)) {
            element.setAttribute("dir", "ltr");
            element.style.textAlign = "right"; // Align text to the left
            element.style.unicodeBidi = "isolate"; // Prevent the text direction change
        }
        // Ensure the text direction is left-to-right
        else if (!element.hasAttribute("dir")) {
            element.setAttribute("dir", "ltr");
            element.style.textAlign = "left"; // Align text to the left
            element.style.unicodeBidi = "isolate"; // Prevent the text direction change
        }
    }


    // When user finishes editing, update the store
    function handleBlur(key: keyof RemoveBorder) {
        const tempValue = tempValues[key] || ''; // Use the temporary value
        updateField(key, tempValue); // Commit the temp value to the store

        // Clear the focused field after blur
        focusedField = null

        // Remove border after blur
        removeBorder[key] = true
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
    
    // Initial detection of dark mode
    isDarkMode = document.documentElement.classList.contains('dark');

    // Observer to monitor changes in the 'class' attribute
    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains('dark');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Cleanup observer when the component is destroyed
    onDestroy(() => {
      observer.disconnect();
    });
  });
</script>

<section class="dark:bg-hero-pattern">

        <div class="h-24 dark:bg-gradient-to-b dark:from-[#16143a] dark:to-indigo-950"></div>
        <div class="-translate-y-[10%] flex flex-col items-center">
    
    <!-- Invoice Demo Container -->
    <div id="container" class="flex flex-col items-center justify-center space-y-4 bg-gray-50 rounded-md p-6">
        <div class="flex w-full lg:min-w-[240mm] justify-between">
            <div class="flex space-x-2 py-1.5 border border-gray-200 px-2 rounded-md">
              <button 
              class="text-sm font-semibold rounded-md text-indigo-800 px-2 py-1 min-w-16 {isPreview ? 'bg-indigo-200' : ''}"
              on:click={onClick}
              >Preview
            </button>
              
              <button 
              class="text-sm font-semibold rounded-md text-indigo-800 px-2 py-1 min-w-16 {!isPreview ? 'bg-indigo-200' : ''}"
              on:click={onClick}
              >Code</button>
            </div>
            <DownloadInvoice handleSubmit={mutateAsync} {btnText} {isLoading} {error} />
          </div>
    <div id="preview" class="w-full max-w-[210mm] max-h-[297mm] aspect-[210/297] bg-white border shadow-md p-8">
	{#if isPreview}
        <!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src="logo2.png" alt="Company Logo" class="mr-4 h-16 w-16" />
			<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
            <p contenteditable="true" 
            bind:this={firstInput} 
            class="font-semibold px-2 py-0.5 rounded-md mb-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 {removeBorder.businessName ? 'border-none' : 'border border-gray-500 dark:border-gray-200'}"
            on:input={(e) => handleInput(e, 'businessName')}
            on:keydown={(e) => handleKeyDown(e, 'businessName')}
            on:blur={() => handleBlur('businessName')}
            on:focus={() => handleFocus('businessName')}
            >
            {data.businessName}
        </p>

			<ContentEditable field={'businessAddressLine1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.businessAddressLine1}
            </ContentEditable>

			<ContentEditable field={'businessAddressLine2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.businessAddressLine2}
            </ContentEditable>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
			<ContentEditable field={'billingCompanyName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.billingCompanyName}
            </ContentEditable>
			<ContentEditable field={'billingCompanyAddressLine1'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.billingCompanyAddressLine1}
            </ContentEditable>
			<ContentEditable field={'billingCompanyAddressLine2'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.billingCompanyAddressLine2}
            </ContentEditable>
			<ContentEditable field={'billingCompanyRegistrationNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} {removeBorder}>
                {data.billingCompanyRegistrationNumber}
            </ContentEditable>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<p class="text-left">Invoice Number:</p>
                <ContentEditable field={'invoiceNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}  {removeBorder}>
                    {data.invoiceNumber}
                </ContentEditable>

				<p class="text-left">Invoice Date:</p>
                <ContentEditable field={'invoiceDate'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}  {removeBorder}>
                    {data.invoiceDate}
                </ContentEditable>

				<p class="text-left">Supply Dates:</p>
                <ContentEditable field={'supplyDates'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus} css={'text-right'}  {removeBorder}>
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
                <ContentEditable field={'accountName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}  {removeBorder}>
                    {data.accountName}
                </ContentEditable>

				<p class="text-left">Account Number:</p>
                <ContentEditable field={'accountNumber'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}  {removeBorder}>
                    {data.accountNumber}
                </ContentEditable>

				<p class="text-left">Sort Code:</p>
                <ContentEditable field={'sortCode'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}  {removeBorder}>
                    {data.sortCode}
                </ContentEditable>

				<p class="text-left">Bank Name:</p>
                <ContentEditable field={'bankName'} {handleInput} {handleKeyDown} {handleBlur} {handleFocus}  {removeBorder}>
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
{:else}
    <div class="h-[272mm]">
        <CodeEditor bind:code={payload.html} language="html" {theme} />
    </div>  
{/if}
</div>
</div>
</div>
</section>