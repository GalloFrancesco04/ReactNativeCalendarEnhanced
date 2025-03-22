import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface CalendarProps {
    initialDate?: Date;
    primaryColor?: string;
    onSelectDate?: (date: Date) => void;
    iconBorderColor?: string;
    previousIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    startWeekOnMonday?: boolean;
    headerTextStyle?: TextStyle;
    dayNameTextStyle?: TextStyle;
    dayNumberTextStyle?: TextStyle;
    calendarBackgroundColor?: string;
    headerBackgroundColor?: string;
    dayCellBackgroundColor?: string;
    dayCellBorderColor?: string;
    todayButtonText?: string;
    todayButtonTextStyle?: TextStyle;
    todayButtonStyle?: ViewStyle;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    dateIcons?: {
        [key: string]: React.ReactNode | null;
    };
    defaultIcon?: React.ReactNode;
}
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
