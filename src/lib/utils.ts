import type { Writable } from "svelte/store";
import type { invoiceRow } from "./types";

export function formatDateToCustomString(input: Date | string): string {
    let date: Date;
    // handle undefined inputs
    if (!input) 
      return 'Invalid Date'
    // Convert the input to a Date object if it's a string
    if (typeof input === "string") {
        date = new Date(input);
    } else if (input instanceof Date) {
        date = input;
    } else {
        throw new TypeError("Invalid input: Expected a Date object or a string.");
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new TypeError("Invalid date: Unable to parse the provided input.");
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract parts of the date
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Return formatted date string
    return `${day} ${month} ${year}`;
}

export function validateFutureDate(inputDate, updateValue) {
    const today = new Date().toISOString().split('T')[0]
    if (inputDate > today) {
      alert('Date cannot be in the future!');
      updateValue(today); // Set the value to today's date if invalid
    }
  }


  // Function to validate that the date is not more than 1 year after today
  export function validateMaxDate(inputDate, updateValue) {
  const maxDate = new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0];

    if (inputDate > maxDate) {
      alert(`Date cannot be more than 1 year after today (${maxDate})!`);
      updateValue(maxDate); // Reset to max allowed date
    }
  }

  // Function to validate that the date is not less than 5 years before today
  export function validateMinDate(inputDate, updateValue) {
    const minDate = new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0];

    if (inputDate < minDate) {
      
      alert(`Date cannot be more than 5 years before today (${minDate})!`);
      updateValue(minDate); // Reset to min allowed date
    }
  }

  export function isValidUrl(urlString:string) {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

export function filterRowsArray(arr: invoiceRow[]) {
  return arr.filter(item => !(item.description === '' && item.hours === null && item.rate === null && item.total === 0));
}

export function generateHtmlTableRows(rows: invoiceRow[], currency: string) {
  // Preprocess rows to fix rate and total to 2 decimal places
  const formattedRows = rows.map(row => ({
    ...row,
    rate: Number(row.rate).toFixed(2),
    total: Number(row.total).toFixed(2),
  }));

  return formattedRows
    .map(
      (row) => 
        `
        <tr>
          <td class="border border-gray-300 p-2">${row.description}</td>
          <td class="border border-gray-300 p-2">${row.hours}</td>
          <td class="border border-gray-300 p-2">${currency}${row.rate}</td>
          <td class="border border-gray-300 p-2">${currency}${row.total}</td>
        </tr>
      `
    )
    .join('');
}

export function formatStartDate(startDate: string, endDate: string) {
   // Check if input dates are undefined
   if (!startDate || !endDate) {
    return { startDate: startDate || null, endDate: endDate || null };
}

// Parse the dates to extract year and month
const start = new Date(startDate);
const end = new Date(endDate);
const startYear = start.getFullYear();
const endYear = end.getFullYear();
const startMonth = start.getMonth();
const endMonth = end.getMonth();

// Check if both dates share the same year and month
if (startYear === endYear && startMonth === endMonth) {
    return { startDate: start.getDate().toString(), endDate: endDate };
}

// Check if both dates share the same year
if (startYear === endYear) {
    // Remove the last 5 characters from the startDate (the year)
    startDate = startDate.slice(0, -5).trim();
}

// Return the modified startDate and unmodified endDate
return { startDate, endDate };
}


export function getLastWorkingDayOfNextMonth() {
  const today = new Date();
  
  // Calculate the first day of the next month
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  
  // Calculate the last day of the next month
  const endOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
  
  // Determine the day of the week for the last day of the month
  let dayOfWeek = endOfNextMonth.getDay();

  // Adjust to the last working day if the last day is a weekend
  if (dayOfWeek === 6) { // Saturday
      endOfNextMonth.setDate(endOfNextMonth.getDate() - 1); // Move to Friday
  } else if (dayOfWeek === 0) { // Sunday
      endOfNextMonth.setDate(endOfNextMonth.getDate() - 2); // Move to Friday
  }

  // Format the date as '1 Jan 2024'
  const day = endOfNextMonth.getDate();
  const month = endOfNextMonth.toLocaleString('en-US', { month: 'short' });
  const year = endOfNextMonth.getFullYear();

  return `${day} ${month} ${year}`;
}


export function placeholderIfBlank(input:string | number | Date | undefined, placeholder:string) {
    return input ? input : placeholder;
}

export function updateStoreOnInput(store: Writable<{}>,key: any, value: any) {
  store.update((details: { [x: string]: any; }) => {
      details[key] = value;
      return details;
  });
}

export function formatSixDigitInteger(input: number) {
  // Convert the input to a string to handle formatting
  const inputStr = input.toString();

  // Check if the input is exactly 6 digits long
  if (inputStr.length === 6 && /^[0-9]{6}$/.test(inputStr)) {
      // Format the string as 12-34-56
      return `${inputStr.slice(0, 2)}-${inputStr.slice(2, 4)}-${inputStr.slice(4)}`;
  }

  // Return the input as a string if it's not 6 digits long
  return inputStr;
}