"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var CalendarDay = function (_a) {
    var date = _a.date, isCurrentMonth = _a.isCurrentMonth, isSelected = _a.isSelected, isToday = _a.isToday, onSelectDate = _a.onSelectDate, primaryColor = _a.primaryColor, dayNumberTextStyle = _a.dayNumberTextStyle, _b = _a.customIcon, customIcon = _b === void 0 ? null : _b, // Default to no icon
    _c = _a.showCustomIcon, // Default to no icon
    showCustomIcon = _c === void 0 ? false : _c;
    // Handle day press
    var handlePress = function () {
        onSelectDate(date);
    };
    // Build up style objects based on the state of the day
    var dayContainerStyle = [
        styles.dayContainer,
        isSelected && { backgroundColor: primaryColor },
        isToday && !isSelected && { borderColor: primaryColor, borderWidth: 1 },
    ];
    // Fix the type errors by properly handling conditional styles
    var dayTextStyle = [
        styles.dayText,
    ];
    // Add conditional styles only if they're truthy
    if (!isCurrentMonth) {
        dayTextStyle.push(styles.outsideMonthText);
    }
    if (isSelected) {
        dayTextStyle.push(styles.selectedDayText);
    }
    // Add the optional style if provided
    if (dayNumberTextStyle) {
        dayTextStyle.push(dayNumberTextStyle);
    }
    // Determine if we should show the icon based on the type of showCustomIcon
    var shouldShowIcon = typeof showCustomIcon === 'function'
        ? showCustomIcon(date)
        : showCustomIcon;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: dayContainerStyle, onPress: handlePress, activeOpacity: 0.6 },
        react_1.default.createElement(react_native_1.Text, { style: dayTextStyle }, date.getDate()),
        shouldShowIcon && customIcon && react_1.default.createElement(react_native_1.View, { style: styles.iconContainer }, customIcon)));
};
var styles = react_native_1.StyleSheet.create({
    dayContainer: {
        width: 60, // Increased width
        height: 80, // Increased height
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 4,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        position: 'relative', // For positioning the icon
    },
    dayText: {
        fontSize: 16, // Increased font size
        fontWeight: '500',
    },
    outsideMonthText: {
        opacity: 0.3,
    },
    selectedDayText: {
        color: 'white',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 4,
        right: 4,
    },
});
exports.default = CalendarDay;
