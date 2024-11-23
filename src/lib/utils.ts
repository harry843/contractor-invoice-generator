export function formatDateToCustomString(input: Date | string): string {
    let date: Date;

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

function validateFutureDate(inputDate, updateValue) {
    const today = new Date().toISOString().split('T')[0]
    if (inputDate > today) {
      alert('Date cannot be in the future!');
      updateValue(today); // Set the value to today's date if invalid
    }
  }

  // Generic handler function
  export function handleFutureDate(event, stateUpdater) {
    validateFutureDate(event.target.value, (newValue) => {
      event.target.value = newValue; // Update the input value in the DOM
      stateUpdater(newValue); // Update the corresponding variable dynamically
    });
  }

  // Function to validate that the date is not more than 1 year after today
  function validateMaxDate(inputDate, updateValue) {
  const maxDate = new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0];

    if (inputDate > maxDate) {
      alert(`Date cannot be more than 1 year after today (${maxDate})!`);
      updateValue(maxDate); // Reset to max allowed date
    }
  }

  // Function to validate that the date is not less than 5 years before today
  function validateMinDate(inputDate, updateValue) {
    if (inputDate < minDate) {
        const minDate = new Date(new Date().getFullYear() - 5, 0, 1).toISOString().split('T')[0];
      
      alert(`Date cannot be more than 5 years before today (${minDate})!`);
      updateValue(minDate); // Reset to min allowed date
    }
  }

  // Generic handler function
  export function handleDateChange(event, stateUpdater) {
    const inputDate = event.target.value;
    validateMaxDate(inputDate, (newValue) => {
      event.target.value = newValue;
      stateUpdater(newValue);
    });
    validateMinDate(inputDate, (newValue) => {
      event.target.value = newValue;
      stateUpdater(newValue);
    });
  }