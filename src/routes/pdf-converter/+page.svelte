<script lang="ts">
    import { handlebarsTemplate } from "$lib/tailwindstream";
    import type { PayloadInput } from "$lib/tailwindstream";
    import type { InvoiceData } from "$lib/types";
	import { onMount } from "svelte";
	  import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.svelte";
	import Preview from "../../components/InvoiceForm/Preview/Preview.svelte";
	import Button from "../../components/InvoiceForm/FormElements/Button.svelte";

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
    invoiceHtmlString: undefined,
    };

    let payload: PayloadInput = {
      html: handlebarsTemplate.html,
      engine: "handlebars",
      data: data,
      output: "pdf",
      size: "a4",
    };

    let isWideEnough = true;

    const checkScreenWidth = () => {
      isWideEnough = window.innerWidth >= 1024; // Example breakpoint for A4 side-by-side
    };

    onMount(() => {
      checkScreenWidth();
      window.addEventListener("resize", checkScreenWidth);
      return () => window.removeEventListener("resize", checkScreenWidth);
    });

    const openPreview = () => {
      window.open('/preview', '_blank'); // Adjust the path as needed
    };
</script>

<div class="flex flex-col lg:flex-row p-3">
  <!-- Invoice Form -->
  <div class="min-w-[300px] w-full md:w-1/2">
    <InvoiceForm {data} {payload} />
  </div>

  <!-- Conditional Rendering for Preview -->
  {#if isWideEnough}
    <div class="hidden md:block w-full md:w-1/2 md:max-w-[595px] bg-white border border-gray-200 shadow-md mx-auto p-8 xl:p-16">
      <Preview />
    </div>
  {:else}
    <div class="flex justify-start px-[5%] md:px-[2.5%] mt-4">
      <Button 
        on:click={openPreview}
        colour="slate"
      >
        Preview
    </Button>
    </div>
  {/if}
</div>


    <!-- <div>
      <textarea
        class="p-4 mt-4 w-full h-96 border border-gray-300 rounded"
        bind:value={payload.html}
      ></textarea>
    </div>   -->
  