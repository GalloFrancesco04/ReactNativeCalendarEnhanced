import React from 'react';
import { TextStyle } from 'react-native';
interface CalendarHeaderProps {
    currentMonth: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    primaryColor: string;
    iconBorder: string;
    previousIcon: React.ReactNode;
    nextIcon: React.ReactNode;
    headerTextStyle?: TextStyle;
    headerBackgroundColor?: string;
}
declare const CalendarHeader: React.FC<CalendarHeaderProps>;
export default CalendarHeader;
