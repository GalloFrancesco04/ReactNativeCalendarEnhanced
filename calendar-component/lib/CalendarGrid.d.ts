import React from 'react';
import { TextStyle } from 'react-native';
interface CalendarGridProps {
    currentMonth: Date;
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    primaryColor: string;
    startWeekOnMonday: boolean;
    dayNameTextStyle?: TextStyle;
    dayNumberTextStyle?: TextStyle;
    dayCellBackgroundColor?: string;
    dayCellBorderColor?: string;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    dateIcons?: {
        [key: string]: React.ReactNode | string | null;
    };
    defaultIcon?: React.ReactNode;
}
declare const CalendarGrid: React.FC<CalendarGridProps>;
export default CalendarGrid;
