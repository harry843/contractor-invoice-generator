export interface InvoiceData {
	businessName: string | undefined,
    businessAddressLine1: string | undefined,
    businessAddressLine2: string | undefined,
    billingCompanyName: string | undefined,
    billingCompanyAddressLine1: string | undefined,
    billingCompanyAddressLine2: string | undefined,
    billingCompanyRegistrationNumber: number | undefined,
    invoiceNumber: string | undefined,
    invoiceDate: Date | string | undefined,
    supplyStartDate: Date | string | undefined,
	supplyEndDate: Date | string | undefined,
    logoImageUrl: string | undefined,
    signatureImageUrl: string | undefined,
    currency: string,
    grandTotal: number,
    dueDate: Date | string | undefined,
    accountName: string | undefined,
    accountNumber: number | undefined,
    sortCode: number | undefined,
    bankName: string | undefined,
    totalBorderColour: string
    invoiceHtmlString: string | undefined,
}

export interface ValidationErrors {
    businessName: string | null,
    businessAddressLine1: string | null,
    businessAddressLine2: string | null,
    billingCompanyName: string | null,
    billingCompanyAddressLine1: string | null,
    billingCompanyAddressLine2: string | null,
    invoiceNumber: string | null,
    invoiceDate: string | null,
    supplyStartDate: string | null,
	supplyEndDate: string | null,
    logoImageUrl: string | null,
    signatureImageUrl: string | null,
    dueDate: string | null,
    accountName: string | null,
    accountNumber: string | null,
    sortCode: string | null,
    bankName: string | null,
    invoiceRow: string | null,
}

export interface rowValidationErrors {
    description: string | null,
    hours: string | null,
    rate: string | null,
}


export interface invoiceRow {
    description: string | null,
    hours: number | null,
    rate: number | null,
    total: number | null
}