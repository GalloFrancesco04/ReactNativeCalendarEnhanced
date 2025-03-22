import React from 'react';
import { TextStyle } from 'react-native';
interface CalendarDayProps {
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    onSelectDate: (date: Date) => void;
    primaryColor: string;
    dayNumberTextStyle?: TextStyle;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
}
declare const CalendarDay: React.FC<CalendarDayProps>;
export default CalendarDay;
