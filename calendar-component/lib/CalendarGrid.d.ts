import React from 'react';
import { TextStyle } from 'react-native';
interface CalendarGridProps {
    currentMonth: Date;
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    color?: string;
    startWeekOnMonday?: boolean;
    dayNameStyle?: TextStyle;
    dayNumberStyle?: TextStyle;
    cellBackgroundColor?: string;
    cellBorderColor?: string;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    dateIcons?: {
        [key: string]: React.ReactNode | string | null;
    };
    defaultIcon?: React.ReactNode;
    locale?: string;
    outsideMonthOpacity?: number;
    selectedBackgroundColor?: string;
    todayColor?: string;
    dayNameColor?: string;
    dayNumberColor?: string;
    selectedDayTextColor?: string;
    formatDateKeyFn?: (date: Date | string) => string;
    getDateIcon?: (date: Date) => React.ReactNode | null | undefined;
    iconPatterns?: Array<{
        matcher: (date: Date) => boolean;
        icon: React.ReactNode | null;
        priority?: number;
    }>;
}
declare const CalendarGrid: React.FC<CalendarGridProps>;
export default CalendarGrid;
