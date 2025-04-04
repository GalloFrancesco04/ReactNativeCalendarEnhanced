import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
interface CalendarHeaderProps {
    currentMonth: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    color?: string;
    iconColor?: string;
    previousIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    textStyle?: TextStyle;
    backgroundColor?: string;
    locale?: string;
    style?: ViewStyle;
}
declare const CalendarHeader: React.FC<CalendarHeaderProps>;
export default CalendarHeader;
