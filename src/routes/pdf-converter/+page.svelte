<script lang="ts">
    import { handlebarsTemplate } from "$lib/tailwindstream";
    import type { PayloadInput } from "$lib/tailwindstream";
    import type { InvoiceData } from "$lib/types";
	  import InvoiceForm from "../../components/InvoiceForm/InvoiceForm.svelte";
	import Preview from "../../components/InvoiceForm/Preview/Preview.svelte";

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
<div class="flex flex-row">
<div class="min-w-xl w-1/2">
<InvoiceForm {data} {payload} />
</div>
<div class="">

</div>
<Preview />
</div>
    <!-- <div>
      <textarea
        class="p-4 mt-4 w-full h-96 border border-gray-300 rounded"
        bind:value={payload.html}
      ></textarea>
    </div>   -->
  