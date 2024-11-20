<!-- <div class="min-h-screen bg-gray-50 flex items-center justify-center py-10"> -->
<div class="w-full max-w-4xl rounded-lg bg-white p-20">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src="hk_logo.png" alt="Company Logo" class="mr-4 h-16 w-16" />
			<h1 class="text-5xl font-bold text-gray-800">INVOICE</h1>
		</div>

		<!-- Contact Details and Address -->
		<div id="contact-details" class="text-left">
			<p class="font-semibold">Harry Kelleher</p>
			<p>15 St Nicholas Street,</p>
			<p>London, SE8 4QF</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">BILLED TO:</h2>
			<p>FourthRev Ltd</p>
			<p>Harwood House, 43 Harwood Rd,</p>
			<p>London SW6 4QP, United Kingdom</p>
			<p>1233 3799</p>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 text-lg font-medium text-gray-800">
				INVOICE INFORMATION:
			</h2>
			<div id="invoice-info" class="grid w-80 grid-cols-2 grid-cols-[40%_60%] text-gray-700">
				<span class="text-left">Invoice Number:</span>
				<span class="text-right">HK12345</span>

				<span class="text-left">Invoice Date:</span>
				<span class="text-right">06 Jan 2025</span>

				<span class="text-left">Supply Dates:</span>
				<span class="text-right">15 Nov 2024 - 05 Jan 2025</span>
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
					<td class="border border-gray-300 p-2 font-mono">Learner 1-to-1 Support</td>
					<td class="border border-gray-300 p-2 font-mono">20</td>
					<td class="border border-gray-300 p-2 font-mono">£30</td>
					<td class="border border-gray-300 p-2 font-mono">£600</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2 font-mono">Assignment Marking</td>
					<td class="border border-gray-300 p-2 font-mono">34.5</td>
					<td class="border border-gray-300 p-2 font-mono">£30</td>
					<td class="border border-gray-300 p-2 font-mono">£1035</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2 font-mono">Content Review</td>
					<td class="border border-gray-300 p-2 font-mono">6</td>
					<td class="border border-gray-300 p-2 font-mono">£30</td>
					<td class="border border-gray-300 p-2 font-mono">£180</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2 font-mono">Meetings</td>
					<td class="border border-gray-300 p-2 font-mono">0.5</td>
					<td class="border border-gray-300 p-2 font-mono">£30</td>
					<td class="border border-gray-300 p-2 font-mono">£15</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-[14.285rem] rounded-sm outline outline-1 outline-indigo-600">
			<thead>
				<tr class="border-b border-indigo-300">
					<th class="w-24 p-1 text-left font-medium">Total Due:</th>
					<th class="p-1 text-left indent-2"> £1830</th>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-medium">Due Date:</th>
					<th class="p-1 text-left indent-2"> 31 Jan 2025</th>
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
				<span class="text-left">Mr Harry J G Kelleher</span>

				<span class="text-left">Account Number:</span>
				<span class="text-left">10583768</span>

				<span class="text-left">Sort Code:</span>
				<span class="text-left">110107</span>

				<span class="text-left">Bank Name:</span>
				<span class="text-left">Halifax</span>
			</div>
		</div>

		<div>
			<p class="pb-1 text-lg font-medium text-gray-800">SIGNATURE:</p>
			<img src="hk_signature.png" alt="Signature" class="w-52 py-2" />
		</div>
	</div>
</div>

<!-- </div> -->
