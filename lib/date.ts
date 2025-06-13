import { differenceInSeconds, differenceInMinutes, differenceInHours, format, getYear } from 'date-fns';

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const currentYear = getYear(now);
  const dateYear = getYear(date);
  
  // Calculate differences
  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  

  // <1s: Just now
  if (secondsDiff < 1) {
    return 'Just now';
  }
  
  // 1-59s: "N"s ago
  if (secondsDiff < 60) {
    return `${secondsDiff}s ago`;
  }
  
  // 1-59min: "N"m ago
  if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  }
  
  // 1-23h: "N"h ago
  if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  }
  
  // >24h: Format based on year
  if (currentYear === dateYear) {
    // Current year: "May 30"
    return format(date, 'MMM d');
  } else {
    // Non-current year: "Dec 12, 2024"
    return format(date, 'MMM d, yyyy');
  }
}
