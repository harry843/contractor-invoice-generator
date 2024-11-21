type Size =
  | "LETTER"
  | "LEGAL"
  | "TABLOID"
  | "LEDGER"
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "Letter"
  | "Legal"
  | "Tabloid"
  | "Ledger";

export type PayloadInput = {
  html: string;
  output?: "pdf" | "png" | "jpeg" | "webp";
  size?: Size | string; // e.g., "12x10in"
  scale?: number; // 1 - 6
  engine?: "handlebars" | "ejs";
  data?: Record<string, any>; // Required if engine is provided
  style?: string;
  scripts?: { src: string }[];
  links?: { href: string }[];
};

const apiUrl = `https://api.tailwindstream.io`;

/**
 * Utility to trigger a download in the browser from a Blob.
 */
export function downloadToBrowser(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${new Date().toISOString()}.${blob.type.split("/")[1]}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Sends a POST request to initiate a download.
 */
export async function requestDownload(payload: PayloadInput) {
  const response = await fetch(`${apiUrl}/request`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return (await response.json()) as { requestId?: string; error?: string };
}

interface DownloadResult {
  blob?: Blob;
  error?: string;
}

/**
 * Handles document download attempts with retries.
 */
export async function downloadDocument(
  requestId: string,
  { attempts = 10, interval = 2000 } = {}
): Promise<DownloadResult> {
  let attempt = 0;

  const downloadAttempt = async (): Promise<DownloadResult> => {
    try {
      const response = await fetch(`${apiUrl}/request/${requestId}/download`);
      if (response.ok) {
        const blob = await response.blob();
        console.log(await response.body)
        return { blob };
      } else if (attempt < attempts) {
        console.error("Download failed, retrying...");
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, interval));
        return await downloadAttempt();
      } else {
        throw new Error("Maximum download attempts exceeded.");
      }
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  };

  return downloadAttempt();
}

/**
 * Replaces the React `useDownload` hook with a plain JS function.
 */
export function useDownload(data?: PayloadInput, options?: { attempts?: number; interval?: number }) {
  let isLoading = false;
  let error: string | null = null;

  const mutateAsync = async (payload?: PayloadInput) => {
    try {
      isLoading = true;
      const response = await requestDownload(payload ?? data!);
      if (response.error) {
        error = response.error;
        return;
      }
      if (response.requestId) {
        const { blob, error: downloadError } = await downloadDocument(response.requestId, options);
        if (downloadError) {
          error = downloadError;
        }
        if (blob) {
          error = null;
          downloadToBrowser(blob);
        }
      }
    } catch (err) {
      error = "Something went wrong.";
      console.error(err);
    } finally {
      isLoading = false;
    }
  };

  return { isLoading, error, mutateAsync };
}

/**
 * Sample HTML for testing.
 */
export const sampleHtml = `
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
			<p class="font-customHeading font-semibold">Harry Kelleher</p>
			<p>15 St Nicholas Street,</p>
			<p>London, SE8 4QF</p>
		</div>
	</div>

	<div class="mb-12 flex items-start justify-between text-gray-700">
		<div id="billed-to" class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">BILLED TO:</h2>
			<p>FourthRev Ltd</p>
			<p>Harwood House, 43 Harwood Rd,</p>
			<p>London SW6 4QP, United Kingdom</p>
			<p>1233 3799</p>
		</div>

		<div class="mt-6">
			<h2 class="pb-1 font-customHeading text-lg font-medium text-gray-800">
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
				<tr class="bg-gray-100 font-customHeading">
					<th class="border border-gray-300 p-2 font-medium">Task Description</th>
					<th class="border border-gray-300 p-2 font-medium">Hours</th>
					<th class="border border-gray-300 p-2 font-medium">Rate</th>
					<th class="border border-gray-300 p-2 font-medium">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="border border-gray-300 p-2">Learner 1-to-1 Support</td>
					<td class="border border-gray-300 p-2">20</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£600</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Assignment Marking</td>
					<td class="border border-gray-300 p-2">34.5</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£1035</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Content Review</td>
					<td class="border border-gray-300 p-2">6</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£180</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Meetings</td>
					<td class="border border-gray-300 p-2">0.5</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£15</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-52 rounded-sm outline outline-1 outline-indigo-600">
			<thead>
				<tr class="border-b border-indigo-300">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Total Due:</th>
					<th class="p-1 text-left indent-2"> £1830</th>
				</tr>
				<tr class="">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Due Date:</th>
					<th class="p-1 text-left indent-2"> 31 Jan 2025</th>
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
			<p class="pb-1 font-customHeading text-lg font-medium text-gray-800">SIGNATURE:</p>
			<img src="https://i.ibb.co/L12kLFZ/hk-signature.png" alt="Signature" class="w-52 py-2" />
		</div>
	</div>
	<footer class="py-4">Thank you for your business!</footer>
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
 * Handlebars Template Example.
 */
export const handlebarsTemplate = {
  html: `
<div class="w-full max-w-4xl rounded-lg bg-white p-20">
	<!-- Header with Logo, Title, and Contact Details -->
	<div class="mb-12 flex items-center justify-between">
		<!-- Logo and Title -->
		<div class="flex items-center">
			<img src={{logoImageUrl}} alt="Company Logo" class="mr-4 h-16 w-16" />
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
				<span class="text-right">{{supplyStartDate}} - {{supplyEndDate}}</span>
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
					<td class="border border-gray-300 p-2">Learner 1-to-1 Support</td>
					<td class="border border-gray-300 p-2">20</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£600</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Assignment Marking</td>
					<td class="border border-gray-300 p-2">34.5</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£1035</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Content Review</td>
					<td class="border border-gray-300 p-2">6</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£180</td>
				</tr>
				<tr>
					<td class="border border-gray-300 p-2">Meetings</td>
					<td class="border border-gray-300 p-2">0.5</td>
					<td class="border border-gray-300 p-2">£30</td>
					<td class="border border-gray-300 p-2">£15</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mb-12 flex justify-end">
		<table id="total-due" class="w-52 rounded-sm outline outline-1 outline-{{totalBorderColour}}-600">
			<thead>
				<tr class="border-b border-{{totalBorderColour}}-300">
					<th class="w-24 p-1 text-left font-customHeading font-medium">Total Due:</th>
					<th class="p-1 text-left indent-2"> £1830</th>
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
			<img src="{{signatureImageUrl}}" alt="Signature" class="w-52 py-2" />
		</div>
	</div>
</div>
  `,
  data: {
    businessName: "HARRY KELLEHER",
    businessAddressLine1: "15 St Nicholas Street,",
    businessAddressLine2: "London, SE8 4QF",
    billingCompanyName: "FourthRev Ltd",
    billingCompanyAddressLine1: "Harwood House, 43 Harwood Rd,",
    billingCompanyAddressLine2: "London SW6 4QP, United Kingdom",
    billingCompanyRegistrationNumber: "12333799",
    invoiceNumber: "HK00001",
    invoiceDate: "05 Jan 2025",
    supplyDates: "15 Nov 2024 - 05 Jan 2025",
    logoImageUrl: "https://i.ibb.co/nDWyxPG/hk-logo.png",
    signatureImageUrl: "https://i.ibb.co/L12kLFZ/hk-signature.png",
    dueDate: "31 Jan 2025",
    accountName: "Mr Harry J G Kelleher",
    accountNumber: "10583768",
    sortCode: "110107",
    bankName: "Halifax"

  },
};
