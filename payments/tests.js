// Create a new Date object with the current date and time
const timestamp = new Date();

// Format the timestamp string
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const timestampStr = timestamp.toLocaleString('en-US', options);

// Output the timestamp string
console.log(timestampStr);