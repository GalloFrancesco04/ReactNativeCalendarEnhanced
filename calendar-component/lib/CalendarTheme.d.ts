import { ColorSchemeName } from 'react-native';
export interface CalendarTheme {
    primaryColor: string;
    secondaryColor: string;
    headerTextColor: string;
    dayNameTextColor: string;
    dayNumberTextColor: string;
    todayButtonTextColor: string;
    calendarBackgroundColor: string;
    headerBackgroundColor: string;
    dayCellBackgroundColor: string;
    selectedDayCellBackgroundColor: string;
    dayCellBorderColor: string;
    headerBorderColor: string;
    iconBorderColor: string;
    defaultEventColor: string;
    eventColors: string[];
    todayHighlightColor: string;
    disabledDayColor: string;
    outsideMonthDayOpacity: number;
}
export declare const LightTheme: CalendarTheme;
export declare const DarkTheme: CalendarTheme;
export declare const getTheme: (colorScheme: ColorSchemeName) => CalendarTheme;
declare const _default: {
    light: CalendarTheme;
    dark: CalendarTheme;
};
export default _default;
