"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var CalendarDay_1 = __importDefault(require("./CalendarDay"));
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/FontAwesome"));
// Utility function to capitalize the first letter of a string
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var CalendarGrid = function (_a) {
    var currentMonth = _a.currentMonth, selectedDate = _a.selectedDate, onSelectDate = _a.onSelectDate, color = _a.color, startWeekOnMonday = _a.startWeekOnMonday, dayNameStyle = _a.dayNameStyle, dayNumberStyle = _a.dayNumberStyle, _b = _a.cellBackgroundColor, cellBackgroundColor = _b === void 0 ? 'white' : _b, _c = _a.cellBorderColor, cellBorderColor = _c === void 0 ? '#e0e0e0' : _c, customIcon = _a.customIcon, showCustomIcon = _a.showCustomIcon, _d = _a.dateIcons, dateIcons = _d === void 0 ? {} : _d, // Default to an empty object
    _e = _a.defaultIcon, // Default to an empty object
    defaultIcon = _e === void 0 ? null : _e, // Default to no icon if not specified
    _f = _a.locale, // Default to no icon if not specified
    locale = _f === void 0 ? 'en-US' : _f, // Default to English
    _g = _a.outsideMonthOpacity, // Default to English
    outsideMonthOpacity = _g === void 0 ? 0.3 : _g, selectedBackgroundColor = _a.selectedBackgroundColor, todayColor = _a.todayColor, _h = _a.dayNumberColor, dayNumberColor = _h === void 0 ? '#000' : _h, // Default day number color
    _j = _a.selectedDayTextColor, // Default day number color
    selectedDayTextColor = _j === void 0 ? '#FFF' : _j, // Default selected day text color
    formatDateKeyFn = _a.formatDateKeyFn, // External date formatting function
    getDateIcon = _a.getDateIcon, _k = _a.iconPatterns, iconPatterns = _k === void 0 ? [] : _k;
    // Get localized day names
    var getLocalizedDaysOfWeek = function () {
        var days = [];
        // Create a date for Sunday
        var date = new Date(2021, 0, 3); // January 3rd 2021 was a Sunday
        // Create array of days in correct order based on startWeekOnMonday
        for (var i = 0; i < 7; i++) {
            var dayIndex = startWeekOnMonday ?
                (i + 1) % 7 : // If starting on Monday, the indices are 1, 2, 3, 4, 5, 6, 0
                i; // If starting on Sunday, the indices are 0, 1, 2, 3, 4, 5, 6
            var tempDate = new Date(date);
            tempDate.setDate(date.getDate() + dayIndex);
            // Get short day name in the specified locale
            var dayName = tempDate.toLocaleDateString(locale, { weekday: 'short' });
            // Capitalize the day name regardless of locale
            days.push(capitalizeFirstLetter(dayName));
        }
        return days;
    };
    // Array of day names based on locale and week start preference
    var daysOfWeek = (0, react_1.useMemo)(function () { return getLocalizedDaysOfWeek(); }, [locale, startWeekOnMonday]);
    // Get all dates to display in the calendar grid - memoize for performance
    var calendarDays = (0, react_1.useMemo)(function () {
        return getCalendarDays(currentMonth, startWeekOnMonday);
    }, [currentMonth, startWeekOnMonday]);
    // Helper to check if a date is today
    var isToday = function (date) {
        var today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };
    // Helper to check if a date is selected
    var isDateSelected = function (date) {
        if (!selectedDate)
            return false;
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };
    // Helper to check if a date is within current month
    var isCurrentMonth = function (date) {
        return date.getMonth() === currentMonth.getMonth();
    };
    // Helper to determine if custom icon should be shown for a date
    var shouldShowCustomIcon = function (date) {
        if (showCustomIcon === undefined) {
            return false;
        }
        else if (typeof showCustomIcon === 'function') {
            return showCustomIcon(date);
        }
        else {
            return Boolean(showCustomIcon); // Cast to boolean to avoid typescript error
        }
    };
    var formatDateKey = function (date) {
        if (formatDateKeyFn) {
            return formatDateKeyFn(date);
        }
        // Fallback to internal implementation if no external function is provided
        if (typeof date === 'string') {
            // Check if the string is in YYYY-MM-DD format
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
    // Helper to resolve icon (string or ReactNode)
    var resolveIcon = function (icon) {
        if (typeof icon === 'string') {
            return react_1.default.createElement(FontAwesome_1.default, { name: icon, size: 16, color: "gray" }); // Default size and color for string icons
        }
        return icon || defaultIcon; // Use provided icon or fallback to defaultIcon
    };
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.weekdayHeader }, daysOfWeek.map(function (day) { return (react_1.default.createElement(react_native_1.View, { key: day, style: styles.weekdayItem },
            react_1.default.createElement(react_native_1.Text, { style: [styles.weekdayText, dayNameStyle] }, day))); })),
        react_1.default.createElement(react_native_1.View, { style: styles.daysGrid }, calendarDays.map(function (date, index) {
            var dateKey = formatDateKey(date);
            // Enhanced icon determination using multiple approaches in priority order
            var iconToShow = null;
            var hasIcon = false;
            // 1. First check if we have a direct match in dateIcons object
            if (dateIcons[dateKey] !== undefined) {
                hasIcon = true;
                iconToShow = dateIcons[dateKey] === null ? defaultIcon : resolveIcon(dateIcons[dateKey]);
            }
            // 2. Next check if we have a callback function for dynamic icons
            else if (getDateIcon) {
                var dynamicIcon = getDateIcon(date);
                if (dynamicIcon !== undefined) {
                    hasIcon = true;
                    iconToShow = dynamicIcon === null ? defaultIcon : resolveIcon(dynamicIcon);
                }
            }
            // 3. Finally check for pattern matches, sorted by priority
            else if (iconPatterns.length > 0) {
                // Sort patterns by priority (highest first) if they have priorities
                var sortedPatterns = __spreadArray([], iconPatterns, true).sort(function (a, b) {
                    return (b.priority || 0) - (a.priority || 0);
                });
                // Find the first matching pattern
                var matchingPattern = sortedPatterns.find(function (pattern) { return pattern.matcher(date); });
                if (matchingPattern) {
                    hasIcon = true;
                    iconToShow = matchingPattern.icon === null ? defaultIcon : resolveIcon(matchingPattern.icon);
                }
            }
            return (react_1.default.createElement(react_native_1.View, { key: index, style: [
                    styles.dayContainer,
                    {
                        backgroundColor: cellBackgroundColor,
                        borderColor: cellBorderColor,
                    },
                ] },
                react_1.default.createElement(CalendarDay_1.default, { date: date, isCurrentMonth: isCurrentMonth(date), isSelected: isDateSelected(date), isToday: isToday(date), onSelectDate: onSelectDate, color: color, textStyle: dayNumberStyle, customIcon: iconToShow, showCustomIcon: hasIcon, locale: locale, outsideMonthOpacity: outsideMonthOpacity, selectedBackgroundColor: selectedBackgroundColor, todayColor: todayColor, dayNumberColor: dayNumberColor, selectedDayTextColor: selectedDayTextColor })));
        }))));
};
// Helper function to get all dates that should display in the calendar
function getCalendarDays(currentMonth, startWeekOnMonday) {
    if (startWeekOnMonday === void 0) { startWeekOnMonday = false; }
    var result = [];
    // Start from the first day of the month
    var firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    // Find the start day of the week prior to or equal to the first day of the month
    var startDate = new Date(firstDay);
    var dayOfWeek = startDate.getDay();
    var diff = startWeekOnMonday
        ? (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
        : -dayOfWeek;
    startDate.setDate(startDate.getDate() + diff);
    // Generate 5 weeks of dates (35 days) instead of 6 weeks (42 days)
    for (var i = 0; i < 35; i++) {
        var date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        result.push(date);
    }
    return result;
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingBottom: 0,
    },
    weekdayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    weekdayItem: {
        width: '14.285%',
        alignItems: 'center',
    },
    weekdayText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    dayContainer: {
        width: '14.285%',
        aspectRatio: 0.8, // Changed from 1 to 0.8 to make cells taller than they are wide
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
    },
});
exports.default = CalendarGrid;
