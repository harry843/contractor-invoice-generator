<script lang="ts">
    import { handlebarsTemplate, requestDownload, downloadDocument, downloadToBrowser } from "$lib/tailwindstream";
    import type { PayloadInput } from "$lib/tailwindstream";
    import type { InvoiceData } from "$lib/types";
	import Input from "../../components/Input.svelte";

    let data: InvoiceData = {
    businessName: '',
    businessAddressLine1: '',
    businessAddressLine2: '',
    billingCompanyName: '',
    billingCompanyAddressLine1: '',
    billingCompanyAddressLine2: '',
    billingCompanyRegistrationNumber: undefined,
    invoiceNumber: '',
    invoiceDate: new Date(),
    supplyStartDate: new Date(),
    supplyEndDate: new Date(),
    dueDate: new Date(),
    accountName: '',
    accountNumber: undefined,
    sortCode: undefined,
    bankName: '',
    logoImageUrl: '',
    signatureImageUrl: ''
    };

    let payload: PayloadInput = {
      html: handlebarsTemplate.html,
      engine: "handlebars",
      data: data,
      output: "pdf",
      size: "a4",
    };
  
    let isLoading = false;
    let error: string | null = null;
    let btnText = `Download .${payload.output}`;

    let businessName = ''
    let businessAddressLine1 = ''
    let businessAddressLine2 = ''

    let billingCompanyName = ''
    let billingCompanyAddressLine1 = ''
    let billingCompanyAddressLine2 = ''
    let billingCompanyRegistrationNumber = undefined

    let invoiceNumber = ''
    let invoiceDate = new Date()
    let supplyStartDate = new Date()
    let supplyEndDate = new Date()

    let dueDate = new Date()
    let accountName = ''
    let accountNumber = undefined
    let sortCode = undefined
    let bankName = ''

    let logoImageUrl = ''
    let signatureImageUrl = ''

    /* Check validity of input data */

    const validate = (): { [key: string]: string } => {
    const errors: { [key: string]: string} = {};
    if (businessName === '') {
        errors.name = 'Required';
        return errors;
    }

    if (businessAddressLine1 === '') {
        errors.name = 'Required';
        return errors;
    }

    if (businessAddressLine2 === '') {
        errors.name = 'Required';
        return errors;
    }
    return errors; // If no errors are found
};


  
    /**
     * Handles the download process.
     */
    const mutateAsync = async () => {
        const errors = validate(); // Call validate and store the result

if (Object.keys(errors).length > 0) {
    // If there are validation errors, stop execution
    error = errors.name || "Validation error occurred"; // Set the error message
    return; // Stop further execution
}
      data.businessName = businessName;
      data.businessAddressLine1 = businessAddressLine1;
      data.businessAddressLine2 = businessAddressLine2;

      data.billingCompanyName = billingCompanyName;
      data.billingCompanyAddressLine1 = billingCompanyAddressLine1;
      data.billingCompanyAddressLine2 = billingCompanyAddressLine2;
      data.billingCompanyRegistrationNumber = billingCompanyRegistrationNumber;

      data.invoiceNumber = invoiceNumber;
      data.invoiceDate = invoiceDate;
      data.supplyStartDate = supplyStartDate;
      data.supplyEndDate = supplyEndDate;

      data.dueDate = dueDate;
      data.accountName = accountName;
      data.accountNumber = accountNumber;
      data.sortCode = sortCode;
      data.bankName = bankName;

      data.logoImageUrl = logoImageUrl;
      data.signatureImageUrl = signatureImageUrl;

      isLoading = true;
      btnText = "Downloading...";
      error = null; // Reset error state
  
      try {
        // Step 1: Request download and retrieve requestId
        const response = await requestDownload(payload);
        if (response.error) {
          error = response.error;
          return;
        }
  
        if (response.requestId) {
          // Step 2: Attempt to download the document with retries
          const { blob, error: downloadError } = await downloadDocument(response.requestId, {
            attempts: 10,
            interval: 2000,
          });
  
          if (downloadError) {
            error = downloadError;
            return;
          }
  
          if (blob) {
            // Step 3: Trigger the browser download
            downloadToBrowser(blob);
          }
        }
      } catch (err) {
        error = err instanceof Error ? err.message : "An unexpected error occurred.";
      } finally {
        isLoading = false;
        btnText = `Download .${payload.output}`;
      }
    };
  
    const setHtml = (value: string) => {
      payload.html = value;
    };
  
    const setOutput = (value: PayloadInput["output"]) => {
      payload.output = value;
      btnText = `Download .${value}`;
    };
  </script>
  
  <main class="p-8">
    <!-- Select Output Component -->
    <div class="flex justify-center gap-4 mb-4">
      {#each ["png", "pdf", "jpeg", "webp"] as format}
        <div>
          <input
            type="radio"
            id={format}
            name="fileFormat"
            value={format}
            bind:group={payload.output}
            on:change={() => setOutput(format)}
          />
          <label for={format}>{format.toUpperCase()}</label>
        </div>
      {/each}
    </div>

<div class="grid grid-cols-3">
<!-- Freelancer Company Details -->
<Input
    type="text"
    label="Business Name *"
    placeholder = "Your Company Name"
    bind:value={businessName}
/>
<Input
    type="text"
    label="Business Address Line 1 *"
    placeholder = 'Address Line 1'
    bind:value={businessAddressLine1}
/>
<Input
type="text"
label="Business Address Line 2 *"
placeholder = "Address Line 2"
bind:value={businessAddressLine2}
/>

<!-- Billed To Details -->
<Input
type="text"
label="Billing Company Name *"
placeholder = "Billing Company Name"
bind:value={billingCompanyName}
/>

<Input
type="text"
label="Billing Company Address Line 1 *"
placeholder = "Address Line 1"
bind:value={billingCompanyAddressLine1}
/>

<Input
type="text"
label="Billing Company Address Line 2 *"
placeholder = "Address Line 2"
bind:value={billingCompanyAddressLine2}
/>

<Input
type="number"
label="Billing Company Registration Number"
bind:value={billingCompanyRegistrationNumber}
/>

<!-- Invoice Information -->
<Input
type="text"
label="Invoice Number *"
placeholder = "HK12345"
bind:value={invoiceNumber}
/>

<Input
type="date"
label="Invoice Date *"
bind:value={invoiceDate}
/>

<Input
type="date"
label="Supply Start Date *"
bind:value={supplyStartDate}
/>

<Input
type="date"
label="Supply End Date *"
bind:value={supplyEndDate}
/>

<!-- Due Date -->
<Input
type="date"
label="Payment Due Date *"
bind:value={dueDate}
/>

<!-- Payment Information -->
<Input
type="text"
label="Account Name *"
bind:value={accountName}
/>

<Input
type="number"
label="Account Number *"
bind:value={accountNumber}
/>

<Input
type="number"
label="Sort Code *"
bind:value={sortCode}
/>

<Input
type="text"
label="Bank Name"
placeholder = 'e.g. HSBC'
bind:value={bankName}
/>

<!-- Image URLs -->
<Input
type="text"
label="Logo Image URL"
placeholder = 'Public Image URL'
bind:value={logoImageUrl}
/>

<Input
type="text"
label="Signature Image URL"
placeholder = 'Public Image URL'
bind:value={signatureImageUrl}
/>

</div>

    <!-- Download Button -->
    <button
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      on:click={mutateAsync}
      disabled={isLoading}
    >
      {btnText}
    </button>
  
    {#if error}
      <p class="text-center text-red-500 mt-4">Please fill out required fields</p>
    {/if}

    <!-- HTML Input -->
    <div>
      <textarea
        class="p-4 mt-4 w-full h-96 border border-gray-300 rounded"
        bind:value={payload.html}
      ></textarea>
    </div>
  </main>
  
  <style>
    textarea {
      font-family: monospace;
      resize: vertical;
    }
  </style>
  