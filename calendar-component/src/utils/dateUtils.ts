/**
 * Date utility functions for Calendar components
 */

/**
 * Formats a date into a string key in YYYY-MM-DD format
 * @param date - The date to format, either as a Date object or string
 * @returns A string in YYYY-MM-DD format
 */
export const formatDateKey = (date: Date | string): string => {
  if (typeof date === 'string') {
    // Check if the string is already in YYYY-MM-DD format
    const yyyyMmDdMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (yyyyMmDdMatch) {
      return date; // Already in YYYY-MM-DD format
    }
    
    // Parse other string formats into a Date object
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate;
    } else {
      return ''; // Return an empty string for invalid dates
    }
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD in local timezone
};

/**
 * Compares two dates to check if they represent the same day
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns boolean - True if dates represent the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Add a default export to resolve the warning
export default {};