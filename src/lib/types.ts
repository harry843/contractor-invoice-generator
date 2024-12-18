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
    grandTotal: number | string,
    dueDate: Date | string | undefined,
    accountName: string | undefined,
    accountNumber: number | undefined,
    sortCode: number | undefined,
    bankName: string | undefined,
    totalBorderColour: string
    tableBorderColour: string,
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

export interface CompanyDetails {
	businessName: string | undefined,
    businessAddressLine1: string | undefined,
    businessAddressLine2: string | undefined,
    billingCompanyName: string | undefined,
    billingCompanyAddressLine1: string | undefined,
    billingCompanyAddressLine2: string | undefined,
    billingCompanyRegistrationNumber: number | undefined
}

export interface InvoiceDetails {
    invoiceNumber: string | undefined,
    invoiceDate: Date | string | undefined,
    currency: string,
    dueDate: Date | string | undefined,
    supplyStartDate: Date | string | undefined,
	supplyEndDate: Date | string | undefined,
}

export interface PayeeDetails {
    accountName: string | undefined,
    accountNumber: number | undefined,
    sortCode: number | undefined,
    bankName: string | undefined,
}

export interface FinishingTouches {
    logoImageUrl: string | undefined,
    signatureImageUrl: string | undefined,
    totalBorderColour: string,
    tableBorderColour: string
}

export interface DemoVariables {
    businessName: string;
    businessAddressLine1: string;
    businessAddressLine2: string;
    billingCompanyName: string;
    billingCompanyAddressLine1: string;
    billingCompanyAddressLine2: string;
    invoiceNumber: string;
    invoiceDate: string;
    supplyDates: string;
    taskDescription1: string;
    taskHours1: string;
    taskRate1: string;
    taskTotal1: string;
    taskDescription2: string;
    taskHours2: string;
    taskRate2: string;
    taskTotal2: string;
    totalDue: string;
    dueDate: string;
    accountName: string;
    accountNumber: string;
    sortCode: string;
    bankName: string;
}

export interface RemoveBorder {
    businessName: boolean;
    businessAddressLine1: boolean;
    businessAddressLine2: boolean;
    billingCompanyName: boolean;
    billingCompanyAddressLine1: boolean;
    billingCompanyAddressLine2: boolean;
    invoiceNumber: boolean;
    invoiceDate: boolean;
    supplyDates: boolean;
    taskDescription1: boolean;
    taskHours1: boolean;
    taskRate1: boolean;
    taskTotal1: boolean;
    taskDescription2: boolean;
    taskHours2: boolean;
    taskRate2: boolean;
    taskTotal2: boolean;
    totalDue: boolean;
    dueDate: boolean;
    accountName: boolean;
    accountNumber: boolean;
    sortCode: boolean;
    bankName: boolean;
}