/**
 * Date utility functions for Calendar components
 */
/**
 * Formats a date into a string key in YYYY-MM-DD format
 * @param date - The date to format, either as a Date object or string
 * @returns A string in YYYY-MM-DD format
 */
export declare const formatDateKey: (date: Date | string) => string;
/**
 * Compares two dates to check if they represent the same day
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns boolean - True if dates represent the same day
 */
export declare const isSameDay: (date1: Date, date2: Date) => boolean;
declare const _default: {};
export default _default;
