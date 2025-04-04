import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    date: Date;
    color?: string;
}
export interface CalendarProps {
    initialDate?: Date;
    onSelectDate?: (date: Date) => void;
    locale?: string;
    startWeekOnMonday?: boolean;
    color?: string;
    backgroundColor?: string;
    headerBackgroundColor?: string;
    cellBackgroundColor?: string;
    cellBorderColor?: string;
    iconColor?: string;
    selectedBackgroundColor?: string;
    todayHighlightColor?: string;
    outsideMonthOpacity?: number;
    headerTextColor?: string;
    dayNameColor?: string;
    dayNumberColor?: string;
    selectedDayTextColor?: string;
    headerStyle?: TextStyle;
    dayNameStyle?: TextStyle;
    dayNumberStyle?: TextStyle;
    previousIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    todayButtonText?: string;
    todayButtonStyle?: ViewStyle;
    todayButtonTextStyle?: TextStyle;
    customIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    dateIcons?: {
        [key: string]: React.ReactNode | null;
    };
    defaultIcon?: React.ReactNode;
    events?: CalendarEvent[];
    onAddEvent?: (event: CalendarEvent) => void;
    onUpdateEvent?: (event: CalendarEvent) => void;
    onDeleteEvent?: (eventId: string) => void;
    readOnly?: boolean;
    showAddEventButton?: boolean;
    buttonsContainerStyle?: ViewStyle;
    buttonSize?: 'small' | 'medium' | 'large';
}
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
