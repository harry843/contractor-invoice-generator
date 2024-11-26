import { writable } from "svelte/store";

export const invoiceItems = writable([
    {
        description: '',
        hours: null,
        rate: null,
        total: 0,
      },
  ]);