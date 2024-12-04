import { writable, type Writable } from "svelte/store";
import type { CompanyDetails, FinishingTouches, InvoiceDetails, PayeeDetails, ValidationErrors } from "./types";

export const companyDetails: Writable<CompanyDetails> = writable(
    {
        businessName: '',
        businessAddressLine1: '',
        businessAddressLine2: '',
        billingCompanyName: '',
        billingCompanyAddressLine1: '',
        billingCompanyAddressLine2: '',
        billingCompanyRegistrationNumber: undefined
    }
);

export const invoiceDetails: Writable<InvoiceDetails> = writable(
    {
        invoiceNumber: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        currency: '£',
        dueDate: '',
        supplyStartDate: '',
        supplyEndDate: '',
    }
);

export const payeeDetails: Writable<PayeeDetails> = writable(
    {
        accountName: '',
        accountNumber: undefined,
        sortCode: undefined,
        bankName: '',
    }
);

export const finishingTouches: Writable<FinishingTouches> = writable(
    {
        logoImageUrl: '',
        signatureImageUrl: '',
        totalBorderColour: 'indigo',
    }
);

export const imageValidationErrors: Writable<Partial<ValidationErrors>> = writable(
    {
        logoImageUrl: null,
        signatureImageUrl: null,
        invoiceRow: null
    }
);

export const invoiceItems = writable([
    {
        description: '',
        hours: null,
        rate: null,
        total: 0,
      },
  ]);

export const currentStep = writable(1);