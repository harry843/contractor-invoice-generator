<script lang="ts">
    import { companyDetails, invoiceDetails, invoiceItems, payeeDetails, finishingTouches } from "$lib/store";
	import { filterRowsArray, formatDateToCustomString, formatSixDigitInteger, formatStartDate, generateHtmlTableRows, getLastWorkingDayOfNextMonth, placeholderIfBlank } from "$lib/utils";

    $: startDate = $invoiceDetails.supplyStartDate ? formatDateToCustomString($invoiceDetails.supplyStartDate) : ''
    $: endDate = $invoiceDetails.supplyEndDate ? formatDateToCustomString($invoiceDetails.supplyEndDate) : ''
    $: dueDate = $invoiceDetails.dueDate ? formatDateToCustomString($invoiceDetails.dueDate) : ''

    $: formattedDates = formatStartDate(startDate, endDate)
	$: sortCode = $payeeDetails.sortCode ? $payeeDetails.sortCode : 123456

</script>

<div class="">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			{#if $finishingTouches.logoImageUrl}
			<img src={$finishingTouches.logoImageUrl} alt="Company Logo" class="mr-4 h-16 w-16" on:error={(event) => {event.target.onerror = null; event.target.src='not-found.png';}}/>
			{:else}
			<img src="insert-logo.webp" alt="Company Logo" class="mr-4 h-16 w-16" />
			{/if}
			<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<p class="font-semibold">{placeholderIfBlank($companyDetails.businessName, 'Business Name')}</p>
			<p>{placeholderIfBlank($companyDetails.businessAddressLine1, 'Address Line 1')}</p>
			<p>{placeholderIfBlank($companyDetails.businessAddressLine2, 'Address Line 2')}</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
            <p>{placeholderIfBlank($companyDetails.billingCompanyName, 'Company Name')}</p>
			<p>{placeholderIfBlank($companyDetails.billingCompanyAddressLine1, 'Address Line 1')}</p>
			<p>{placeholderIfBlank($companyDetails.billingCompanyAddressLine2, 'Address Line 2')}</p>
			<p>{placeholderIfBlank($companyDetails.billingCompanyRegistrationNumber, '')}</p>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<span class="text-left">Invoice Number:</span>
				<span class="text-right">{placeholderIfBlank($invoiceDetails.invoiceNumber, '#123456')}</span>

				<span class="text-left">Invoice Date:</span>
				<span class="text-right">{$invoiceDetails.invoiceDate ? formatDateToCustomString($invoiceDetails.invoiceDate) : ''}</span>

				<span class="text-left">Supply Dates:</span>
                {#if $invoiceDetails.supplyStartDate === $invoiceDetails.supplyEndDate && $invoiceDetails.supplyStartDate && $invoiceDetails.supplyEndDate}
                <span class="text-right">{placeholderIfBlank(formattedDates.endDate, 'End')}</span>
                {:else}
				<span class="text-right">{placeholderIfBlank(formattedDates.startDate, 'Start')} - {placeholderIfBlank(formattedDates.endDate, 'End')}</span>
                {/if}
			</div>
		</div>
	</div>

	<div class="mb-3 mt-6">
		<table
			id="invoice-table"
			class="w-full rounded-sm text-left outline outline-1 outline-{$finishingTouches.tableBorderColour}-300"
		>
			<thead>
				<tr class="bg-{$finishingTouches.tableBorderColour}-100 font-sans font-medium">
					<th class="border border-{$finishingTouches.tableBorderColour}-300 p-2 font-medium">Task Description</th>
					<th class="border border-{$finishingTouches.tableBorderColour}-300 p-2 font-medium">Hours</th>
					<th class="border border-{$finishingTouches.tableBorderColour}-300 p-2 font-medium">Rate</th>
					<th class="border border-{$finishingTouches.tableBorderColour}-300 p-2 font-medium">Total</th>
				</tr>
			</thead>
			<tbody>
                {#if filterRowsArray($invoiceItems).length > 0}
				{@html generateHtmlTableRows(filterRowsArray($invoiceItems), $invoiceDetails.currency, $finishingTouches.tableBorderColour)}
                {:else}
                <tr>
					<td class="border border-{$finishingTouches.tableBorderColour}-300 p-2">e.g. Data Visualisation Prototyping</td>
					<td class="border border-{$finishingTouches.tableBorderColour}-300 p-2 italic">hours</td>
					<td class="border border-{$finishingTouches.tableBorderColour}-300 p-2 italic">rate per hour</td>
					<td class="border border-{$finishingTouches.tableBorderColour}-300 p-2">{$invoiceDetails.currency}</td>
				</tr>
                {/if}
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-[14.285rem] rounded-sm outline outline-1 outline-{$finishingTouches.totalBorderColour}-600">
			<thead>
				<tr class="border-b border-{$finishingTouches.totalBorderColour}-300">
					<th class="w-24 p-1 text-left font-medium">Total Due:</th>
                    {#if filterRowsArray($invoiceItems).length > 0}
					<th class="p-1 text-left indent-2"> {$invoiceDetails.currency}{$invoiceItems.reduce((sum, row) => sum + row.total, 0).toFixed(2)}</th>
                    {:else}
                    <th class="p-1 text-left indent-2"> {$invoiceDetails.currency}</th>
                    {/if}
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-medium">Due Date:</th>
					<th class="p-1 text-left indent-2"> {placeholderIfBlank(dueDate, getLastWorkingDayOfNextMonth())}</th>
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
				<span class="text-left">{placeholderIfBlank($payeeDetails.accountName, 'Mr Joe Bloggs')}</span>

				<span class="text-left">Account Number:</span>
				<span class="text-left">{placeholderIfBlank($payeeDetails.accountNumber, '87654321')}</span>

				<span class="text-left">Sort Code:</span>
				<span class="text-left">{placeholderIfBlank(formatSixDigitInteger(sortCode), '12-34-56')}</span>

				<span class="text-left">Bank Name:</span>
				<span class="text-left">{placeholderIfBlank($payeeDetails.bankName, 'Barclays')}</span>
			</div>
		</div>

		<div>
			<p class="pb-1 text-lg font-medium text-gray-800">SIGNATURE:</p>
			{#if $finishingTouches.signatureImageUrl}
			<img src={$finishingTouches.signatureImageUrl} alt="Signature" class="w-52 py-2" on:error={(event) => {event.target.onerror = null; event.target.src='not-found.png';}} />
			{:else}
			<div class="flex items-start">
			<img src="signature-placeholder.jpg" alt="Signature" class=" items-start w-52 py-2" />
			</div>
			{/if}
		</div>
	</div>
</div>
