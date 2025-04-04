import React from 'react';
import { TextStyle } from 'react-native';
interface CalendarDayProps {
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    onSelectDate: (date: Date) => void;
    color?: string;
    textStyle?: TextStyle;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    locale?: string;
    outsideMonthOpacity?: number;
    selectedBackgroundColor?: string;
    todayColor?: string;
    dayNumberColor?: string;
    selectedDayTextColor?: string;
}
declare const _default: React.NamedExoticComponent<CalendarDayProps>;
export default _default;
