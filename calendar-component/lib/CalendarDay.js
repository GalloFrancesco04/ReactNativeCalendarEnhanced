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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var CalendarDay = function (_a) {
    var date = _a.date, isCurrentMonth = _a.isCurrentMonth, isSelected = _a.isSelected, isToday = _a.isToday, onSelectDate = _a.onSelectDate, _b = _a.color, color = _b === void 0 ? '#2196F3' : _b, textStyle = _a.textStyle, _c = _a.customIcon, customIcon = _c === void 0 ? null : _c, _d = _a.showCustomIcon, showCustomIcon = _d === void 0 ? false : _d, _e = _a.locale, locale = _e === void 0 ? 'en-US' : _e, _f = _a.outsideMonthOpacity, outsideMonthOpacity = _f === void 0 ? 0.3 : _f, selectedBackgroundColor = _a.selectedBackgroundColor, todayColor = _a.todayColor, _g = _a.dayNumberColor, dayNumberColor = _g === void 0 ? '#000000' : _g, // Default day number color
    _h = _a.selectedDayTextColor, // Default day number color
    selectedDayTextColor = _h === void 0 ? '#FFFFFF' : _h;
    // Handle day press - now uses useCallback
    var handlePress = (0, react_1.useCallback)(function () {
        onSelectDate(date);
    }, [onSelectDate, date]);
    // Build up style objects based on the state of the day - now memoized
    var dayContainerStyle = (0, react_1.useMemo)(function () {
        var containerStyles = [
            styles.dayContainer,
        ];
        // Add conditional styles
        if (isSelected) {
            containerStyles.push({
                backgroundColor: selectedBackgroundColor || color
            });
        }
        // Add highlight for today
        if (isToday && !isSelected) {
            containerStyles.push({
                borderColor: todayColor || color,
                borderWidth: 1
            });
        }
        return containerStyles;
    }, [isSelected, isToday, selectedBackgroundColor, color, todayColor]);
    // Fix the type errors by properly handling conditional styles - now memoized
    var dayTextStyle = (0, react_1.useMemo)(function () {
        var textStyles = [
            styles.dayText,
            { color: dayNumberColor },
        ];
        if (!isCurrentMonth) {
            textStyles.push({ opacity: outsideMonthOpacity });
        }
        if (isSelected) {
            textStyles.push({ color: selectedDayTextColor });
        }
        // Add the optional style if provided
        if (textStyle) {
            textStyles.push(textStyle);
        }
        return textStyles;
    }, [isCurrentMonth, isSelected, dayNumberColor, outsideMonthOpacity, selectedDayTextColor, textStyle]);
    // Determine if we should show the icon - now memoized
    var shouldShowIcon = (0, react_1.useMemo)(function () {
        return typeof showCustomIcon === 'function'
            ? showCustomIcon(date)
            : showCustomIcon;
    }, [showCustomIcon, date]);
    // Format the date for accessibility labeling - memoized
    var accessibilityProps = (0, react_1.useMemo)(function () {
        var formattedDate = date.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        // Generate appropriate accessibility state
        var accessibilityState = {
            selected: isSelected,
        };
        // Build accessibility hint
        var accessibilityHint = '';
        if (isToday) {
            accessibilityHint = "Today. Tap to select this date.";
        }
        else {
            accessibilityHint = "Tap to select this date.";
        }
        if (!isCurrentMonth) {
            accessibilityHint = "This date is outside the current month. " + accessibilityHint;
        }
        return {
            accessibilityRole: "button",
            accessibilityLabel: formattedDate,
            accessibilityHint: accessibilityHint,
            accessibilityState: accessibilityState
        };
    }, [date, locale, isSelected, isToday, isCurrentMonth]);
    return (react_1.default.createElement(react_native_1.TouchableOpacity, __assign({ style: dayContainerStyle, onPress: handlePress, activeOpacity: 0.6, accessible: true }, accessibilityProps),
        react_1.default.createElement(react_native_1.Text, { style: dayTextStyle }, date.getDate()),
        customIcon && (react_1.default.createElement(react_native_1.View, { style: styles.iconContainerBottomRight }, customIcon))));
};
var styles = react_native_1.StyleSheet.create({
    dayContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 0,
        position: 'relative',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
    },
    selectedDayText: {
        color: 'white',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    iconContainerBottomRight: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = react_1.default.memo(CalendarDay);
