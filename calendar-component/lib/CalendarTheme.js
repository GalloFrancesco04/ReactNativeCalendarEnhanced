"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = exports.DarkTheme = exports.LightTheme = void 0;
exports.LightTheme = {
    primaryColor: '#1976D2',
    secondaryColor: '#388E3C',
    headerTextColor: '#333333',
    dayNameTextColor: '#666666',
    dayNumberTextColor: '#333333',
    todayButtonTextColor: '#FFFFFF',
    calendarBackgroundColor: '#FFFFFF',
    headerBackgroundColor: '#F5F5F5',
    dayCellBackgroundColor: '#FFFFFF',
    selectedDayCellBackgroundColor: '#1976D2',
    dayCellBorderColor: '#E0E0E0',
    headerBorderColor: '#E0E0E0',
    iconBorderColor: '#1976D2',
    defaultEventColor: '#1976D2',
    eventColors: ['#1976D2', '#388E3C', '#E53935', '#FF9800', '#5E35B1'],
    todayHighlightColor: '#1976D2',
    disabledDayColor: '#BDBDBD',
    outsideMonthDayOpacity: 0.3,
};
exports.DarkTheme = {
    primaryColor: '#42A5F5',
    secondaryColor: '#66BB6A',
    headerTextColor: '#FFFFFF',
    dayNameTextColor: '#BBBBBB',
    dayNumberTextColor: '#FFFFFF',
    todayButtonTextColor: '#FFFFFF',
    calendarBackgroundColor: '#121212',
    headerBackgroundColor: '#1E1E1E',
    dayCellBackgroundColor: '#1E1E1E',
    selectedDayCellBackgroundColor: '#42A5F5',
    dayCellBorderColor: '#333333',
    headerBorderColor: '#333333',
    iconBorderColor: '#42A5F5',
    defaultEventColor: '#42A5F5',
    eventColors: ['#42A5F5', '#66BB6A', '#EF5350', '#FFA726', '#7E57C2'],
    todayHighlightColor: '#42A5F5',
    disabledDayColor: '#666666',
    outsideMonthDayOpacity: 0.2,
};
var getTheme = function (colorScheme) {
    return colorScheme === 'dark' ? exports.DarkTheme : exports.LightTheme;
};
exports.getTheme = getTheme;
exports.default = {
    light: exports.LightTheme,
    dark: exports.DarkTheme
};
