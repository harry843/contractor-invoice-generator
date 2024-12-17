/**
 * Sample HTML for testing.
 */
export const sampleHtml = `
 <div class="w-full max-w-4xl rounded-lg bg-white p-20 text-5xl font-bold text-gray-800">
 	Test
</div>
	
`;

/**
 * EJS Template Example.
 */
export const ejsTemplate = {
  engine: "ejs" as const,
  html: `
  <% if (user) { %>
    <h2><%= user.name %></h2>
  <% } %>
  `,
  data: {
    user: {
      name: "John Doe",
    },
  },
};

/**
 * Invoice Template using Handlebars engine.
 */
export const invoiceTemplate = {
  html: `
<div class="w-full max-w-4xl rounded-lg bg-white p-20">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			{{#if logoImageUrl}}
			<img src={{logoImageUrl}} alt="Company Logo" class="mr-4 h-16 w-16" />
			{{/if}}
			<h1 class="font-customHeading text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<p class="font-customHeading font-semibold">{{businessName}}</p>
			<p>{{businessAddressLine1}}</p>
			<p>{{businessAddressLine2}}</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">BILLED TO:</h2>
			<p>{{billingCompanyName}}</p>
			<p>{{billingCompanyAddressLine1}}</p>
			<p>{{billingCompanyAddressLine2}}</p>
			{{#if billingCompanyRegistrationNumber}}
			<p>{{billingCompanyRegistrationNumber}}</p>
			{{/if}}
		</div>

		<div class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<span class="text-left">Invoice Number:</span>
				<span class="text-right">{{invoiceNumber}}</span>

				<span class="text-left">Invoice Date:</span>
				<span class="text-right">{{invoiceDate}}</span>

				<span class="text-left">Supply Dates:</span>
				<span class="text-right">{{supplyStartDate}} - {{supplyEndDate}}</span>
			</div>
		</div>
	</div>

	<div class="mb-3 mt-6">
		<table
			id="invoice-table"
			class="w-full rounded-sm text-left outline outline-1 outline-{{tableBorderColour}}-300"
		>
			<thead>
				<tr class="bg-{{tableBorderColour}}-100 font-customHeading">
					<th class="border border-{{tableBorderColour}}-300 p-2 font-medium">Task Description</th>
					<th class="border border-{{tableBorderColour}}-300 p-2 font-medium">Hours</th>
					<th class="border border-{{tableBorderColour}}-300 p-2 font-medium">Rate</th>
					<th class="border border-{{tableBorderColour}}-300 p-2 font-medium">Total</th>
				</tr>
			</thead>
			<tbody>
				{{{invoiceHtmlString}}}
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-52 rounded-sm outline outline-1 outline-{{totalBorderColour}}-600">
			<thead>
				<tr class="border-b border-{{totalBorderColour}}-300">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Total Due:</th>
					<th class="p-1 text-left indent-2">{{currency}}{{grandTotal}}</th>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Due Date:</th>
					<th class="p-1 text-left indent-2"> {{dueDate}}</th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="my-6 flex items-start justify-between">
		<div>
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">
				PAYMENT INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-84 grid-cols-2 gap-x-2 text-gray-700">
				<span class="text-left">Account Name:</span>
				<span class="text-left">{{accountName}}</span>

				<span class="text-left">Account Number:</span>
				<span class="text-left">{{accountNumber}}</span>

				<span class="text-left">Sort Code:</span>
				<span class="text-left">{{sortCode}}</span>

				{{#if bankName}}
				<span class="text-left">Bank Name:</span>
				<span class="text-left">{{bankName}}</span>
				{{/if}}
			</div>
		</div>

		{{#if signatureImageUrl}}
		<div>
			<p class="pb-1 font-customHeading text-lg font-medium text-gray-800">SIGNATURE:</p>
			<img src="{{signatureImageUrl}}" alt="Signature" class="w-52 py-2" />
		</div>
		{{/if}}
	</div>
</div>
  `,
};

export const invoiceDemo = {
	html: `
	<div class="w-full max-w-4xl rounded-lg bg-white p-20">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src="https://i.ibb.co/nDWyxPG/hk-logo.png" alt="Company Logo" class="mr-4 h-16 w-16" />
			<h1 class="font-customHeading text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<p class="font-customHeading font-semibold">{{businessName}}</p>
			<p>{{businessAddressLine1}}</p>
			<p>{{businessAddressLine2}}</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">BILLED TO:</h2>
			<p>{{billingCompanyName}}</p>
			<p>{{billingCompanyAddressLine1}}</p>
			<p>{{billingCompanyAddressLine2}}</p>
			<p>{{billingCompanyRegistrationNumber}}</p>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<span class="text-left">Invoice Number:</span>
				<span class="text-right">{{invoiceNumber}}</span>

				<span class="text-left">Invoice Date:</span>
				<span class="text-right">{{invoiceDate}}</span>

				<span class="text-left">Supply Dates:</span>
				<span class="text-right">{{supplyDates}}</span>
			</div>
		</div>
	</div>

	<div class="mb-3 mt-6">
		<table
			id="invoice-table"
			class="w-full rounded-sm text-left outline outline-1 outline-gray-300"
		>
			<thead>
				<tr class="bg-gray-100 font-customHeading">
					<th class="border border-gray-300 p-2 font-medium">Task Description</th>
					<th class="border border-gray-300 p-2 font-medium">Hours</th>
					<th class="border border-gray-300 p-2 font-medium">Rate</th>
					<th class="border border-gray-300 p-2 font-medium">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="border border-gray-300 p-2" >
                        {{taskDescription1}}</td>
					<td class="border border-gray-300 p-2" >
                        {{taskHours1}}</td>
					<td class="border border-gray-300 p-2" >
					    {{taskRate1}}</td>
					<td class="border border-gray-300 p-2" >
                        {{taskTotal1}}</td>
				</tr>
                <tr>
					<td class="border border-gray-300 p-2" >
                        {{taskDescription2}}</td>
					<td class="border border-gray-300 p-2" >
                        {{taskHours2}}</td>
					<td class="border border-gray-300 p-2" >            
                        {{taskRate2}}</td>
					<td class="border border-gray-300 p-2" >
                        {{taskTotal2}}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-52 rounded-sm outline outline-1 outline-indigo-600">
			<thead>
				<tr class="border-b border-indigo-300">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Total Due:</th>
					<th class="p-1 text-left indent-2">{{totalDue}}</th>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Due Date:</th>
					<th class="p-1 text-left indent-2"> {{dueDate}}</th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="my-6 flex items-start justify-between">
		<div>
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">
				PAYMENT INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-84 grid-cols-2 gap-x-2 text-gray-700">
				<span class="text-left">Account Name:</span>
				<span class="text-left">{{accountName}}</span>

				<span class="text-left">Account Number:</span>
				<span class="text-left">{{accountNumber}}</span>

				<span class="text-left">Sort Code:</span>
				<span class="text-left">{{sortCode}}</span>

				<span class="text-left">Bank Name:</span>
				<span class="text-left">{{bankName}}</span>
			</div>
		</div>

		<div>
			<p class="pb-1 font-customHeading text-lg font-medium text-gray-800">SIGNATURE:</p>
			<img src="https://i.ibb.co/L12kLFZ/hk-signature.png" alt="Signature" class="w-52 py-2" />
		</div>
	</div>
</div>
	`
}