"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dateUtils_1 = require("./utils/dateUtils");
var Calendar = function (_a) {
    var _b = _a.initialDate, initialDate = _b === void 0 ? new Date() : _b, // Default to today's date if not provided
    onSelectDate = _a.onSelectDate, _c = _a.locale, locale = _c === void 0 ? 'en-US' : _c, _d = _a.startWeekOnMonday, startWeekOnMonday = _d === void 0 ? true : _d, _e = _a.color, color = _e === void 0 ? '#2196F3' : _e, // Default primary color
    _f = _a.backgroundColor, // Default primary color
    backgroundColor = _f === void 0 ? 'white' : _f, // Default calendar background
    _g = _a.headerBackgroundColor, // Default calendar background
    headerBackgroundColor = _g === void 0 ? 'white' : _g, // Default header background
    _h = _a.cellBackgroundColor, // Default header background
    cellBackgroundColor = _h === void 0 ? 'white' : _h, // Default day cell background
    _j = _a.cellBorderColor, // Default day cell background
    cellBorderColor = _j === void 0 ? '#e0e0e0' : _j, // Default day cell border
    _k = _a.iconColor, // Default day cell border
    iconColor = _k === void 0 ? '#2196F3' : _k, // Default icon color
    _l = _a.selectedBackgroundColor, // Default icon color
    selectedBackgroundColor = _l === void 0 ? '#2196F3' : _l, // Default selected day background
    _m = _a.todayHighlightColor, // Default selected day background
    todayHighlightColor = _m === void 0 ? '#2196F3' : _m, // Default today highlight color
    _o = _a.outsideMonthOpacity, // Default today highlight color
    outsideMonthOpacity = _o === void 0 ? 0.3 : _o, // Default outside month opacity
    _p = _a.headerTextColor, // Default outside month opacity
    headerTextColor = _p === void 0 ? '#000' : _p, // Default header text color
    _q = _a.dayNameColor, // Default header text color
    dayNameColor = _q === void 0 ? '#000' : _q, // Default day name color
    _r = _a.dayNumberColor, // Default day name color
    dayNumberColor = _r === void 0 ? '#000' : _r, // Default day number color
    _s = _a.selectedDayTextColor, // Default day number color
    selectedDayTextColor = _s === void 0 ? '#FFF' : _s, // Default selected day text color
    headerStyle = _a.headerStyle, dayNameStyle = _a.dayNameStyle, dayNumberStyle = _a.dayNumberStyle, previousIcon = _a.previousIcon, nextIcon = _a.nextIcon, _t = _a.todayButtonText, todayButtonText = _t === void 0 ? 'Today' : _t, todayButtonStyle = _a.todayButtonStyle, todayButtonTextStyle = _a.todayButtonTextStyle, customIcon = _a.customIcon, _u = _a.showCustomIcon, showCustomIcon = _u === void 0 ? false : _u, _v = _a.dateIcons, dateIcons = _v === void 0 ? {} : _v, _w = _a.defaultIcon, defaultIcon = _w === void 0 ? null : _w, _x = _a.events, events = _x === void 0 ? [] : _x, onAddEvent = _a.onAddEvent, onUpdateEvent = _a.onUpdateEvent, onDeleteEvent = _a.onDeleteEvent, _y = _a.readOnly, readOnly = _y === void 0 ? false : _y, _z = _a.showAddEventButton, showAddEventButton = _z === void 0 ? true : _z, // Default to showing the Add Event button
    buttonsContainerStyle = _a.buttonsContainerStyle, _0 = _a.buttonSize, buttonSize = _0 === void 0 ? 'medium' : _0;
    // Default theme values
    var defaultEventColor = '#1976D2';
    var eventColors = ['#1976D2', '#E53935', '#43A047', '#FB8C00', '#5E35B1'];
    // State for calendar - initialize with today's date
    var _1 = (0, react_1.useState)(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)), currentMonth = _1[0], setCurrentMonth = _1[1];
    var _2 = (0, react_1.useState)(initialDate), selectedDate = _2[0], setSelectedDate = _2[1];
    // State for events
    var _3 = (0, react_1.useState)(null), selectedEvent = _3[0], setSelectedEvent = _3[1];
    var _4 = (0, react_1.useState)(false), eventModalVisible = _4[0], setEventModalVisible = _4[1];
    var _5 = (0, react_1.useState)(''), eventTitle = _5[0], setEventTitle = _5[1];
    var _6 = (0, react_1.useState)(''), eventDescription = _6[0], setEventDescription = _6[1];
    var _7 = (0, react_1.useState)(defaultEventColor), eventColor = _7[0], setEventColor = _7[1];
    var _8 = (0, react_1.useState)(false), showDayEvents = _8[0], setShowDayEvents = _8[1];
    // Update current date reference when initialDate changes
    (0, react_1.useEffect)(function () {
        if (initialDate.getTime() !== (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getTime())) {
            setSelectedDate(initialDate);
            setCurrentMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
        }
    }, [initialDate]);
    // Filter events for the selected date
    var eventsForSelectedDate = (0, react_1.useMemo)(function () {
        if (!selectedDate)
            return [];
        var dateKey = (0, dateUtils_1.formatDateKey)(selectedDate);
        return events.filter(function (event) {
            var eventKey = (0, dateUtils_1.formatDateKey)(event.date);
            return eventKey === dateKey;
        });
    }, [selectedDate, events]);
    // Memoize dateHasEvents function to avoid recalculations
    var dateHasEvents = (0, react_1.useCallback)(function (date) {
        var dateKey = (0, dateUtils_1.formatDateKey)(date);
        return events.some(function (event) { return (0, dateUtils_1.formatDateKey)(event.date) === dateKey; });
    }, [events]);
    // Handle date selection
    var handleDateSelect = (0, react_1.useCallback)(function (date) {
        // Simple single date selection
        setSelectedDate(date);
        if (onSelectDate) {
            onSelectDate(date);
        }
        // If the date has events, show the event details
        var dateEvents = events.filter(function (event) {
            return event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear();
        });
        if (dateEvents.length > 0) {
            setShowDayEvents(true);
        }
    }, [onSelectDate, events]);
    // Event handlers
    var handleAddEventPress = (0, react_1.useCallback)(function () {
        if (readOnly || !selectedDate)
            return;
        // Reset form for a new event
        setSelectedEvent(null);
        setEventTitle('');
        setEventDescription('');
        setEventColor(defaultEventColor);
        setEventModalVisible(true);
    }, [readOnly, selectedDate, defaultEventColor]);
    var handleEditEvent = (0, react_1.useCallback)(function (event) {
        if (readOnly)
            return;
        setSelectedEvent(event);
        setEventTitle(event.title);
        setEventDescription(event.description || '');
        setEventColor(event.color || defaultEventColor);
        setEventModalVisible(true);
    }, [readOnly, defaultEventColor]);
    var handleDeleteEvent = (0, react_1.useCallback)(function () {
        if (readOnly || !selectedEvent)
            return;
        if (onDeleteEvent) {
            onDeleteEvent(selectedEvent.id);
        }
        setEventModalVisible(false);
    }, [readOnly, selectedEvent, onDeleteEvent]);
    var handleSaveEvent = (0, react_1.useCallback)(function () {
        if (!selectedDate || !eventTitle.trim())
            return;
        var newEvent = {
            id: selectedEvent ? selectedEvent.id : Date.now().toString(),
            title: eventTitle.trim(),
            description: eventDescription.trim() || undefined,
            date: new Date(selectedDate),
            color: eventColor,
        };
        if (selectedEvent && onUpdateEvent) {
            onUpdateEvent(newEvent);
        }
        else if (onAddEvent) {
            onAddEvent(newEvent);
        }
        setEventModalVisible(false);
    }, [selectedDate, eventTitle, eventDescription, eventColor, selectedEvent, onUpdateEvent, onAddEvent]);
    // Navigation handlers
    var goToNextMonth = (0, react_1.useCallback)(function () {
        setCurrentMonth(function (prevMonth) {
            var newMonth = new Date(prevMonth);
            newMonth.setMonth(newMonth.getMonth() + 1);
            return newMonth;
        });
    }, []);
    var goToPreviousMonth = (0, react_1.useCallback)(function () {
        setCurrentMonth(function (prevMonth) {
            var newMonth = new Date(prevMonth);
            newMonth.setMonth(newMonth.getMonth() - 1);
            return newMonth;
        });
    }, []);
    var goToToday = (0, react_1.useCallback)(function () {
        var today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        setSelectedDate(today);
        if (onSelectDate) {
            onSelectDate(today);
        }
    }, [onSelectDate]);
    // Create icons for dates with events
    var generateEventIcons = (0, react_1.useMemo)(function () {
        var icons = __assign({}, dateIcons);
        events.forEach(function (event) {
            var date = event.date;
            var dateKey = (0, dateUtils_1.formatDateKey)(date);
            // Only add our event dot if there's not already a custom icon for this date
            if (!icons[dateKey]) {
                icons[dateKey] = (react_1.default.createElement(react_native_1.View, { style: [styles.eventDot, { backgroundColor: event.color || defaultEventColor }] }));
            }
        });
        return icons;
    }, [dateIcons, events, defaultEventColor]);
    // Create a style merge helper function to fix TextStyle errors
    var mergeStyles = function (baseStyle, additionalStyle) {
        return additionalStyle ? __assign(__assign({}, baseStyle), additionalStyle) : baseStyle;
    };
    // Get button styling based on size prop
    var getButtonSizeStyles = (0, react_1.useCallback)(function (size) {
        switch (size) {
            case 'small':
                return {
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    fontSize: 12
                };
            case 'large':
                return {
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    fontSize: 16
                };
            case 'medium':
            default:
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    fontSize: 14
                };
        }
    }, []);
    // Get button size styles
    var buttonSizeStyles = (0, react_1.useMemo)(function () { return getButtonSizeStyles(buttonSize); }, [buttonSize, getButtonSizeStyles]);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }] },
        react_1.default.createElement(CalendarHeader_1.default, { currentMonth: currentMonth, onPreviousMonth: goToPreviousMonth, onNextMonth: goToNextMonth, color: color, textStyle: headerStyle || {}, locale: locale, previousIcon: previousIcon, nextIcon: nextIcon }),
        react_1.default.createElement(CalendarGrid_1.default, { currentMonth: currentMonth, selectedDate: selectedDate, onSelectDate: handleDateSelect, color: color, startWeekOnMonday: startWeekOnMonday, dayNameStyle: undefined, dayNumberStyle: undefined, cellBackgroundColor: cellBackgroundColor, customIcon: customIcon, showCustomIcon: showCustomIcon, locale: locale, outsideMonthOpacity: outsideMonthOpacity, selectedBackgroundColor: selectedBackgroundColor, todayColor: todayHighlightColor, dayNumberColor: dayNumberColor, selectedDayTextColor: selectedDayTextColor }),
        react_1.default.createElement(react_native_1.View, { style: [styles.controlsContainer, buttonsContainerStyle] },
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: [
                    styles.todayButton,
                    todayButtonStyle,
                    { backgroundColor: color },
                    { paddingVertical: buttonSizeStyles.paddingVertical, paddingHorizontal: buttonSizeStyles.paddingHorizontal }
                ], onPress: goToToday, accessible: true, accessibilityRole: "button", accessibilityLabel: "Go to today's date", accessibilityHint: "Navigates the calendar to today's date" },
                react_1.default.createElement(react_native_1.Text, { style: [
                        styles.todayButtonText,
                        todayButtonTextStyle,
                        { color: 'white', fontSize: buttonSizeStyles.fontSize }
                    ] }, todayButtonText)),
            !readOnly && showAddEventButton && selectedDate && (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.addEventButton, { backgroundColor: color }], onPress: handleAddEventPress, accessible: true, accessibilityRole: "button", accessibilityLabel: "Add new event", accessibilityHint: "Opens form to add a new event on the selected date" },
                react_1.default.createElement(react_native_1.Text, { style: [styles.todayButtonText, { color: 'white' }] }, "Add Event")))),
        react_1.default.createElement(react_native_1.Modal, { visible: eventModalVisible, transparent: true, animationType: "slide", onRequestClose: function () { return setEventModalVisible(false); } },
            react_1.default.createElement(react_native_1.View, { style: styles.modalOverlay },
                react_1.default.createElement(react_native_1.View, { style: [styles.modalContent, { backgroundColor: backgroundColor }] },
                    react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.modalTitle, { color: color }) }, selectedEvent ? 'Edit Event' : 'Add New Event'),
                    react_1.default.createElement(react_native_1.TextInput, { style: mergeStyles(styles.input, {
                            borderColor: cellBorderColor,
                            color: color,
                            backgroundColor: cellBackgroundColor
                        }), placeholder: "Event Title", placeholderTextColor: "#666", value: eventTitle, onChangeText: setEventTitle }),
                    react_1.default.createElement(react_native_1.TextInput, { style: [
                            styles.input,
                            styles.textArea,
                            {
                                borderColor: cellBorderColor,
                                color: color,
                                backgroundColor: cellBackgroundColor
                            }
                        ], placeholder: "Event Description (optional)", placeholderTextColor: "#666", multiline: true, numberOfLines: 4, value: eventDescription, onChangeText: setEventDescription }),
                    react_1.default.createElement(react_native_1.View, { style: styles.colorPicker },
                        react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.colorPickerLabel, { color: color }) }, "Event Color:"),
                        react_1.default.createElement(react_native_1.View, { style: styles.colorOptions }, eventColors.map(function (color) { return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: color, style: [
                                styles.colorOption,
                                { backgroundColor: color },
                                eventColor === color && styles.selectedColorOption
                            ], onPress: function () { return setEventColor(color); } })); }))),
                    react_1.default.createElement(react_native_1.View, { style: styles.modalButtons },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.modalButton, styles.cancelButton], onPress: function () { return setEventModalVisible(false); } },
                            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText }, "Cancel")),
                        selectedEvent && (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.modalButton, styles.deleteButton], onPress: handleDeleteEvent },
                            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText }, "Delete"))),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.modalButton, styles.saveButton], onPress: handleSaveEvent },
                            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText }, "Save")))))),
        react_1.default.createElement(react_native_1.Modal, { visible: showDayEvents, transparent: true, animationType: "slide", onRequestClose: function () { return setShowDayEvents(false); } },
            react_1.default.createElement(react_native_1.View, { style: styles.modalOverlay },
                react_1.default.createElement(react_native_1.View, { style: [styles.modalContent, { backgroundColor: backgroundColor }] },
                    react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.modalTitle, { color: color }) }, selectedDate && selectedDate.toLocaleDateString(locale, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })),
                    eventsForSelectedDate.length === 0 ? (react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.noEventsText, { color: '#666' }) }, "No events for this day")) : (react_1.default.createElement(react_native_1.ScrollView, { style: styles.eventsList }, eventsForSelectedDate.map(function (event) { return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: event.id, style: [styles.eventItem, {
                                borderLeftColor: event.color || defaultEventColor,
                                backgroundColor: cellBackgroundColor
                            }], onPress: function () { return !readOnly && handleEditEvent(event); }, disabled: readOnly },
                        react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.eventTitle, { color: color }) }, event.title),
                        event.description && (react_1.default.createElement(react_native_1.Text, { style: mergeStyles(styles.eventDescription, { color: '#666' }) }, event.description)))); }))),
                    react_1.default.createElement(react_native_1.View, { style: styles.modalButtons },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.modalButton, styles.cancelButton, { flex: 1 }], onPress: function () { return setShowDayEvents(false); } },
                            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText }, "Close")),
                        !readOnly && selectedDate && (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.modalButton, styles.saveButton, { flex: 1 }], onPress: handleAddEventPress },
                            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText }, "Add Event")))))))));
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
    eventDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    colorPicker: {
        marginVertical: 10,
    },
    colorPickerLabel: {
        marginBottom: 5,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    selectedColorOption: {
        borderWidth: 2,
        borderColor: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    cancelButton: {
        backgroundColor: '#9E9E9E',
    },
    eventsList: {
        maxHeight: 300,
        marginBottom: 10,
    },
    eventItem: {
        padding: 10,
        borderLeftWidth: 4,
        borderRadius: 5,
        marginBottom: 8,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 3,
    },
    eventDescription: {
        fontSize: 14,
    },
    noEventsText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 0, // Changed from 8 to 0 to remove the gap
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    todayButton: {
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        flex: 1,
        marginHorizontal: 5,
        maxWidth: 120,
    },
    todayButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    addEventButton: {
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        flex: 1,
        marginHorizontal: 5,
        maxWidth: 120,
    },
});
exports.default = Calendar;
