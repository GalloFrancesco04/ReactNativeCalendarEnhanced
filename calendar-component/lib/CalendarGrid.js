"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var CalendarDay_1 = __importDefault(require("./CalendarDay"));
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/FontAwesome"));
var CalendarGrid = function (_a) {
    var currentMonth = _a.currentMonth, selectedDate = _a.selectedDate, onSelectDate = _a.onSelectDate, primaryColor = _a.primaryColor, startWeekOnMonday = _a.startWeekOnMonday, dayNameTextStyle = _a.dayNameTextStyle, dayNumberTextStyle = _a.dayNumberTextStyle, _b = _a.dayCellBackgroundColor, dayCellBackgroundColor = _b === void 0 ? 'white' : _b, _c = _a.dayCellBorderColor, dayCellBorderColor = _c === void 0 ? '#e0e0e0' : _c, customIcon = _a.customIcon, showCustomIcon = _a.showCustomIcon, _d = _a.dateIcons, dateIcons = _d === void 0 ? {} : _d, // Default to an empty object
    _e = _a.defaultIcon, // Default to an empty object
    defaultIcon = _e === void 0 ? null : _e;
    // Array of day names for the header in Italian, starting from Monday if specified
    var daysOfWeek = startWeekOnMonday
        ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
        : ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    // Get all dates to display in the calendar grid
    var calendarDays = getCalendarDays(currentMonth, startWeekOnMonday);
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
            return showCustomIcon;
        }
    };
    var formatDateKey = function (date) {
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
            react_1.default.createElement(react_native_1.Text, { style: [styles.weekdayText, dayNameTextStyle] }, day))); })),
        react_1.default.createElement(react_native_1.View, { style: styles.daysGrid }, calendarDays.map(function (date, index) {
            var dateKey = formatDateKey(date);
            var hasIcon = !!dateIcons[dateKey] || (dateIcons[dateKey] === null && !!defaultIcon);
            var iconToShow = dateIcons[dateKey] === null ? defaultIcon : dateIcons[dateKey];
            return (react_1.default.createElement(react_native_1.View, { key: index, style: [
                    styles.dayContainer,
                    {
                        backgroundColor: dayCellBackgroundColor,
                        borderColor: dayCellBorderColor
                    }
                ] },
                react_1.default.createElement(CalendarDay_1.default, { date: date, isCurrentMonth: isCurrentMonth(date), isSelected: isDateSelected(date), isToday: isToday(date), onSelectDate: onSelectDate, primaryColor: primaryColor, dayNumberTextStyle: dayNumberTextStyle, showCustomIcon: hasIcon, customIcon: iconToShow })));
        }))));
};
// Helper function to get all dates that should display in the calendar
function getCalendarDays(currentMonth, startWeekOnMonday) {
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
    // Generate 6 weeks of dates (42 days) to ensure we cover the whole month
    for (var i = 0; i < 42; i++) {
        var date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        result.push(date);
    }
    return result;
}
var styles = react_native_1.StyleSheet.create({
    container: {
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
        flex: 1,
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
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: -20,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#e0e0e0',
    },
    dayContainer: {
        width: '14.285%',
        aspectRatio: 1,
        padding: 0,
        margin: 0,
    },
});
exports.default = CalendarGrid;
