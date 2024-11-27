<script lang="ts">
    import { handlebarsTemplate } from "$lib/tailwindstream";
    import type { PayloadInput } from "$lib/tailwindstream";
    import type { InvoiceData } from "$lib/types";
	import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.svelte";

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
</script>

<InvoiceForm {data} {payload} />

    <div>
      <textarea
        class="p-4 mt-4 w-full h-96 border border-gray-300 rounded"
        bind:value={payload.html}
      ></textarea>
    </div>  
  