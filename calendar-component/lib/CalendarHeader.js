"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/FontAwesome"));
// Utility function to capitalize the first letter of a string
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var CalendarHeader = function (_a) {
    var currentMonth = _a.currentMonth, onPreviousMonth = _a.onPreviousMonth, onNextMonth = _a.onNextMonth, _b = _a.color, color = _b === void 0 ? '#2196F3' : _b, // Default primary color
    iconColor = _a.iconColor, // Will use color if not provided
    previousIcon = _a.previousIcon, nextIcon = _a.nextIcon, textStyle = _a.textStyle, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? 'white' : _c, headerColor = _a.headerColor, // Color for header text
    _d = _a.locale, // Color for header text
    locale = _d === void 0 ? 'en-US' : _d, style = _a.style;
    // Use iconColor if provided, otherwise fall back to color
    var finalIconColor = iconColor || color;
    // Generate default icons if not provided
    var defaultPreviousIcon = react_1.default.createElement(FontAwesome_1.default, { name: "chevron-left", size: 16, color: finalIconColor });
    var defaultNextIcon = react_1.default.createElement(FontAwesome_1.default, { name: "chevron-right", size: 16, color: finalIconColor });
    // Format month and year using locale
    var formattedMonthYear = currentMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
    });
    // Capitalize the first letter of month name
    formattedMonthYear = capitalizeFirstLetter(formattedMonthYear);
    // Get next and previous month names for accessibility
    var nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    var nextMonthName = nextMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    nextMonthName = capitalizeFirstLetter(nextMonthName);
    var prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    var prevMonthName = prevMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    prevMonthName = capitalizeFirstLetter(prevMonthName);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.header, { backgroundColor: backgroundColor }, style], accessible: true, accessibilityRole: "header" },
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPreviousMonth, style: [styles.button, { borderColor: finalIconColor }], accessible: true, accessibilityRole: "button", accessibilityLabel: "Go to previous month, ".concat(prevMonthName), accessibilityHint: "Double tap to navigate to the previous month" }, previousIcon || defaultPreviousIcon),
        react_1.default.createElement(react_native_1.View, { style: styles.titleContainer, accessible: true, accessibilityRole: "header", accessibilityLabel: "Current month is ".concat(formattedMonthYear) },
            react_1.default.createElement(react_native_1.Text, { style: [
                    styles.title,
                    textStyle,
                    headerColor ? { color: headerColor } : null
                ] }, formattedMonthYear)),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onNextMonth, style: [styles.button, { borderColor: finalIconColor }], accessible: true, accessibilityRole: "button", accessibilityLabel: "Go to next month, ".concat(nextMonthName), accessibilityHint: "Double tap to navigate to the next month" }, nextIcon || defaultNextIcon)));
};
var styles = react_native_1.StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
exports.default = CalendarHeader;
