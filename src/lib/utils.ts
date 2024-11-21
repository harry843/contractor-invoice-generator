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


