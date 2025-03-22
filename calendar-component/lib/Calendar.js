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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var CalendarHeader_1 = __importDefault(require("./CalendarHeader"));
var CalendarGrid_1 = __importDefault(require("./CalendarGrid"));
var Calendar = function (_a) {
    var _b = _a.initialDate, initialDate = _b === void 0 ? new Date() : _b, _c = _a.primaryColor, primaryColor = _c === void 0 ? '#2196F3' : _c, onSelectDate = _a.onSelectDate, _d = _a.iconBorderColor, iconBorderColor = _d === void 0 ? '#2196F3' : _d, // Updated default prop name
    _e = _a.previousIcon, // Updated default prop name
    previousIcon = _e === void 0 ? react_1.default.createElement(react_native_1.Text, null, '<') : _e, _f = _a.nextIcon, nextIcon = _f === void 0 ? react_1.default.createElement(react_native_1.Text, null, '>') : _f, _g = _a.startWeekOnMonday, startWeekOnMonday = _g === void 0 ? true : _g, headerTextStyle = _a.headerTextStyle, dayNameTextStyle = _a.dayNameTextStyle, dayNumberTextStyle = _a.dayNumberTextStyle, _h = _a.calendarBackgroundColor, calendarBackgroundColor = _h === void 0 ? 'white' : _h, _j = _a.headerBackgroundColor, headerBackgroundColor = _j === void 0 ? 'white' : _j, _k = _a.dayCellBackgroundColor, dayCellBackgroundColor = _k === void 0 ? 'white' : _k, _l = _a.dayCellBorderColor, dayCellBorderColor = _l === void 0 ? '#e0e0e0' : _l, _m = _a.todayButtonText, todayButtonText = _m === void 0 ? 'Today' : _m, todayButtonTextStyle = _a.todayButtonTextStyle, todayButtonStyle = _a.todayButtonStyle, customIcon = _a.customIcon, _o = _a.showCustomIcon, showCustomIcon = _o === void 0 ? false : _o, _p = _a.dateIcons, dateIcons = _p === void 0 ? {} : _p, // Default to an empty object
    _q = _a.defaultIcon, // Default to an empty object
    defaultIcon = _q === void 0 ? null : _q;
    var _r = (0, react_1.useState)(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)), currentMonth = _r[0], setCurrentMonth = _r[1];
    var _s = (0, react_1.useState)(initialDate), selectedDate = _s[0], setSelectedDate = _s[1];
    var handleDateSelect = function (date) {
        setSelectedDate(date);
        if (onSelectDate) {
            onSelectDate(date);
        }
    };
    var goToNextMonth = function () {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    var goToPreviousMonth = function () {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };
    var goToToday = function () {
        var today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDate(today);
        if (onSelectDate) {
            onSelectDate(today);
        }
    };
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: calendarBackgroundColor }] },
        react_1.default.createElement(CalendarHeader_1.default, { currentMonth: currentMonth, onPreviousMonth: goToPreviousMonth, onNextMonth: goToNextMonth, primaryColor: primaryColor, iconBorder: iconBorderColor, previousIcon: previousIcon, nextIcon: nextIcon, headerTextStyle: headerTextStyle, headerBackgroundColor: headerBackgroundColor }),
        react_1.default.createElement(CalendarGrid_1.default, { currentMonth: currentMonth, selectedDate: selectedDate, onSelectDate: handleDateSelect, primaryColor: primaryColor, startWeekOnMonday: startWeekOnMonday, dayNameTextStyle: dayNameTextStyle, dayNumberTextStyle: dayNumberTextStyle, dayCellBackgroundColor: dayCellBackgroundColor, dayCellBorderColor: dayCellBorderColor, customIcon: customIcon, showCustomIcon: showCustomIcon, dateIcons: dateIcons, defaultIcon: defaultIcon }),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: goToToday, style: [
                styles.todayButton,
                todayButtonStyle,
                { backgroundColor: primaryColor }
            ] },
            react_1.default.createElement(react_native_1.Text, { style: [
                    styles.todayButtonText,
                    todayButtonTextStyle
                ] }, todayButtonText))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    todayButton: {
        alignSelf: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginTop: 149,
        marginBottom: 5,
    },
    todayButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
});
exports.default = Calendar;
