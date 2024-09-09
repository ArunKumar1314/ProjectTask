export default function formatDate(date) {
    const options = { 
      //weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      hour12: true 
    };
    return new Date(date).toLocaleString('en-US', options);
  }