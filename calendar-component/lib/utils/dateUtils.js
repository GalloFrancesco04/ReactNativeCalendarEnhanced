"use strict";
/**
 * Date utility functions for Calendar components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDay = exports.formatDateKey = void 0;
/**
 * Formats a date into a string key in YYYY-MM-DD format
 * @param date - The date to format, either as a Date object or string
 * @returns A string in YYYY-MM-DD format
 */
var formatDateKey = function (date) {
    if (typeof date === 'string') {
        // Check if the string is already in YYYY-MM-DD format
        var yyyyMmDdMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (yyyyMmDdMatch) {
            return date; // Already in YYYY-MM-DD format
        }
        // Parse other string formats into a Date object
        var parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate;
        }
        else {
            return ''; // Return an empty string for invalid dates
        }
    }
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    var day = String(date.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day); // Format date as YYYY-MM-DD in local timezone
};
exports.formatDateKey = formatDateKey;
/**
 * Compares two dates to check if they represent the same day
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns boolean - True if dates represent the same day
 */
var isSameDay = function (date1, date2) {
    return (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
};
exports.isSameDay = isSameDay;
// Add a default export to resolve the warning
exports.default = {};
