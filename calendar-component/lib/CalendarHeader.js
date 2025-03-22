"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/FontAwesome"));
var CalendarHeader = function (_a) {
    var currentMonth = _a.currentMonth, onPreviousMonth = _a.onPreviousMonth, onNextMonth = _a.onNextMonth, primaryColor = _a.primaryColor, iconBorder = _a.iconBorder, _b = _a.previousIcon, previousIcon = _b === void 0 ? react_1.default.createElement(FontAwesome_1.default, { name: "chevron-left", size: 16, color: iconBorder }) : _b, _c = _a.nextIcon, nextIcon = _c === void 0 ? react_1.default.createElement(FontAwesome_1.default, { name: "chevron-right", size: 16, color: iconBorder }) : _c, headerTextStyle = _a.headerTextStyle, _d = _a.headerBackgroundColor, headerBackgroundColor = _d === void 0 ? 'white' : _d;
    // Format month and year
    var formattedMonth = currentMonth.toLocaleString('default', { month: 'long' });
    var year = currentMonth.getFullYear();
    return (react_1.default.createElement(react_native_1.View, { style: [styles.header, { backgroundColor: headerBackgroundColor }] },
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPreviousMonth, style: [styles.button, { borderColor: iconBorder }] }, previousIcon),
        react_1.default.createElement(react_native_1.View, { style: styles.titleContainer },
            react_1.default.createElement(react_native_1.Text, { style: [styles.title, headerTextStyle] },
                formattedMonth,
                " ",
                year)),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onNextMonth, style: [styles.button, { borderColor: iconBorder }] }, nextIcon)));
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
