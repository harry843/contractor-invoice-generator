<script lang="ts">
    import { demoVariables } from "$lib/store";

    $: data = $demoVariables

    // Update function to bind changes to the store
    function updateField(field: keyof typeof $demoVariables, value: string) {
        $demoVariables[field] = value;
    }
</script>

<section class="py-4">
    <div class="w-full md:w-2/3 bg-white shadow-md mx-auto p-8 sm:p-16">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src="logo2.png" alt="Company Logo" class="mr-4 h-16 w-16" />
			<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<p contenteditable="true" class="font-semibold border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md mb-0.5" 
               on:input={(e) => updateField('businessName', e.target.textContent)}>
               {data.businessName}</p>
			<p contenteditable="true" class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md"
               on:input={(e) => updateField('businessAddressLine1', e.target.textContent)}>
               {data.businessAddressLine1}</p>
			<p contenteditable="true"  class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md"
               on:input={(e) => updateField('businessAddressLine2', e.target.textContent)}>
               {data.businessAddressLine2}</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
            <p contenteditable="true" class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md"
               on:input={(e) => updateField('billingCompanyName', e.target.textContent)}>
               {data.billingCompanyName}</p>
			<p contenteditable="true" class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md"
               on:input={(e) => updateField('billingCompanyAddressLine1', e.target.textContent)}>
               {data.billingCompanyAddressLine1}</p>
			<p contenteditable="true" class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md"
               on:input={(e) => updateField('billingCompanyAddressLine2', e.target.textContent)}>
               {data.billingCompanyAddressLine2}</p>
			<p contenteditable="true" class="border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md"
               on:input={(e) => updateField('billingCompanyRegistrationNumber', e.target.textContent)}>
               {data.billingCompanyRegistrationNumber}</p>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<span class="text-left">Invoice Number:</span>
				<span contenteditable="true" class="text-right border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md" 
                    on:input={(e) => updateField('invoiceNumber', e.target.textContent)}>
                    {data.invoiceNumber}</span>

				<span class="text-left">Invoice Date:</span>
				<span contenteditable="true" class="text-right border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md" 
                    on:input={(e) => updateField('invoiceDate', e.target.textContent)}>
                    {data.invoiceDate}</span>

				<span class="text-left">Supply Dates:</span>
				<span contenteditable="true" class="text-right border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md" 
                    on:input={(e) => updateField('supplyDates', e.target.textContent)}>
                    {data.supplyDates}</span>
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
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskDescription1', e.target.textContent)}>
                        {data.taskDescription1}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskHours1', e.target.textContent)}>
                        {data.taskHours1}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskRate1', e.target.textContent)}>
                        {data.taskRate1}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskTotal1', e.target.textContent)}>
                        {data.taskTotal1}</td>
				</tr>
                <tr>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskDescription2', e.target.textContent)}>
                        {data.taskDescription2}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskHours2', e.target.textContent)}>
                        {data.taskHours2}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskRate2', e.target.textContent)}>
                        {data.taskRate2}</td>
					<td contenteditable="true" class="border border-gray-300 p-2" 
                        on:input={(e) => updateField('taskTotal2', e.target.textContent)}>
                        {data.taskTotal2}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-[14.285rem] rounded-sm outline outline-1 outline-gray-600">
			<thead>
				<tr class="border-b border-indigo-300">
					<th class="w-24 p-1 text-left font-medium">Total Due:</th>
					<th contenteditable="true" class="p-1 text-left indent-2" 
                        on:input={(e) => updateField('totalDue', e.target.textContent)}>
                        {data.totalDue}</th>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-medium">Due Date:</th>
					<th contenteditable="true" class="p-1 text-left indent-2" 
                        on:input={(e) => updateField('dueDate', e.target.textContent)}>
                        {data.dueDate}</th>
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
				<span class="text-left">Account Name:</span>
				<span contenteditable="true" class="text-left border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md" 
                    on:input={(e) => updateField('accountName', e.target.textContent)}>
                    {data.accountName}</span>

				<span class="text-left">Account Number:</span>
				<span contenteditable="true" class="text-left border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md" 
                    on:input={(e) => updateField('accountNumber', e.target.textContent)}>
                    {data.accountNumber}</span>

				<span class="text-left">Sort Code:</span>
				<span contenteditable="true" class="text-left border border-gray-500 dark:border-gray-200 px-2 py-0.5 mb-0.5 rounded-md" 
                    on:input={(e) => updateField('sortCode', e.target.textContent)}>
                    {data.sortCode}</span>

				<span class="text-left">Bank Name:</span>
				<span contenteditable="true" class="text-left border border-gray-500 dark:border-gray-200 px-2 py-0.5 rounded-md" 
                    on:input={(e) => updateField('bankName', e.target.textContent)}>
                    {data.bankName}</span>
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