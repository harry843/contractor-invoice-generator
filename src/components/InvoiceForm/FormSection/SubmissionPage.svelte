<script lang="ts">
	import { companyDetails, finishingTouches, invoiceItems, invoiceDetails, payeeDetails } from "$lib/store";
	import { downloadDocument, downloadToBrowser, requestDownload } from "$lib/tailwindstream";
	import type { ValidationErrors } from "$lib/types";
	import { filterRowsArray, formatDateToCustomString, generateHtmlTableRows, isValidUrl } from "$lib/utils";
	import DownloadInvoice from "../FormElements/DownloadInvoice.svelte";
	import SuccessModal from "../FormElements/SuccessModal.svelte";
	import FinishingTouches from "./FinishingTouches.svelte";

    export let step;
    export let data;
    export let payload;


    $: cd = $companyDetails
    $: id = $invoiceDetails
    $: pd = $payeeDetails
    $: ft = $finishingTouches
;
	
	let isLoading = false;
	let success = false;
	let error: any = null;
	let btnText = `Download .${payload.output}`;
    let validationErrors: Partial<ValidationErrors> = {
        logoImageUrl: null,
        signatureImageUrl: null
    }

	const invoiceNumber = $invoiceDetails.invoiceNumber ? $invoiceDetails.invoiceNumber : ''


	const validate = () => {
        const errors: Partial<ValidationErrors> = {
            logoImageUrl: null,
            signatureImageUrl: null,
        };
		// Finishing touches
		if (ft.logoImageUrl && !isValidUrl(ft.logoImageUrl)) errors.logoImageUrl = 'Not a valid URL';
		if (ft.signatureImageUrl && !isValidUrl(ft.signatureImageUrl)) errors.signatureImageUrl = 'Not a valid URL';

		return errors;
	};

	const mutateAsync = async () => {

		validationErrors = validate();

        // Check for any validation errors
        const hasErrors = Object.values(validationErrors).some(value => value !== null);

        if (hasErrors) {
            error = 'Please fill out the required fields';
            return; // Stop execution if there are errors
        }


		Object.assign(data, {
			businessName: cd.businessName,
			businessAddressLine1: cd.businessAddressLine1,
			businessAddressLine2: cd.businessAddressLine2,
			billingCompanyName: cd.billingCompanyName,
			billingCompanyAddressLine1: cd.billingCompanyAddressLine1,
			billingCompanyAddressLine2: cd.billingCompanyAddressLine2,
            billingCompanyRegistrationNumber: cd.billingCompanyRegistrationNumber,
			invoiceNumber: id.invoiceNumber,
			invoiceDate: id.invoiceDate ? formatDateToCustomString(id.invoiceDate) : '',
			supplyStartDate: id.supplyStartDate ? formatDateToCustomString(id.supplyStartDate) : '',
			supplyEndDate: id.supplyEndDate ? formatDateToCustomString(id.supplyEndDate) : '',
			grandTotal: $invoiceItems.reduce((sum, row) => sum + (row.total || 0), 0).toFixed(2),
			dueDate: id.dueDate ? formatDateToCustomString(id.dueDate) : '',
			accountName: pd.accountName,
			accountNumber: pd.accountNumber,
			sortCode: pd.sortCode,
			bankName: pd.bankName,
			logoImageUrl: ft.logoImageUrl,
			signatureImageUrl: ft.signatureImageUrl,
			totalBorderColour: ft.totalBorderColour,
			tableBorderColour: ft.tableBorderColour,
			currency: id.currency,
			invoiceHtmlString: generateHtmlTableRows(filterRowsArray($invoiceItems), id.currency, ft.tableBorderColour)
		});


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
					downloadToBrowser(blob, invoiceNumber);
				}
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unexpected error occurred, please try again later.';
		} finally {
			isLoading = false;
			btnText = `Download .${payload.output}`;
			success = true;
		}
	};

</script>
<FinishingTouches {step} {validationErrors} />

<DownloadInvoice handleSubmit={mutateAsync} {isLoading} {btnText} {error} />

<SuccessModal {success} />