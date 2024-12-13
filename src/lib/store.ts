import { writable, type Writable } from "svelte/store";
import type { CompanyDetails, FinishingTouches, InvoiceDetails, PayeeDetails, ValidationErrors } from "./types";
import { getFirstDayOfMonth, getLastDayOfMonth, getLastWorkingDayOfNextMonth, getTodaysDate } from "./utils";

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
        tableBorderColour: 'gray'
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

export const demoVariables = writable(
    {
        businessName: 'Harry Kelleher',
        businessAddressLine1: 'Address Line 1',
        businessAddressLine2: 'Address Line 2',
        billingCompanyName: 'Billing Company Name',
        billingCompanyAddressLine1: 'Address Line 1',
        billingCompanyAddressLine2: 'Address Line 2',
        billingCompanyRegistrationNumber: '12345678',
        invoiceNumber: '#123456',
        invoiceDate: getTodaysDate(),
        dueDate: getLastWorkingDayOfNextMonth(),
        supplyDates: `${getFirstDayOfMonth().slice(0, -5)} - ${getLastDayOfMonth()}`,
        taskDescription1: 'Design Prototyping',
        taskHours1: '20',
        taskRate1: '£30',
        taskTotal1: '£600',
        taskDescription2: 'Data Pipeline Implementation',
        taskHours2: '30',
        taskRate2: '£40',
        taskTotal2: '£1200',
        totalDue: '£1800.00',
        accountName: 'Mr Harry Kelleher',
        accountNumber: '87654321',
        sortCode: '12-34-56',
        bankName: 'Barclays'
    }
)