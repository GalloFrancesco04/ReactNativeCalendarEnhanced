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
    headerColor?: string;
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
    todayButtonOptions?: TodayButtonOptions | string;
    /** @deprecated Use todayButtonOptions.text instead */
    todayButtonText?: string;
    /** @deprecated Use todayButtonOptions.style instead */
    todayButtonStyle?: ViewStyle;
    /** @deprecated Use todayButtonOptions.textStyle instead */
    todayButtonTextStyle?: TextStyle;
    dateIcons?: {
        [key: string]: React.ReactNode | null;
    };
    defaultIcon?: React.ReactNode;
    showCustomIcon?: boolean | ((date: Date) => boolean);
    customIcon?: React.ReactNode;
    getDateIcon?: (date: Date) => React.ReactNode | null | undefined;
    iconPatterns?: Array<{
        matcher: (date: Date) => boolean;
        icon: React.ReactNode | null;
        priority?: number;
    }>;
    events?: CalendarEvent[];
    onAddEvent?: (event: CalendarEvent) => void;
    onUpdateEvent?: (event: CalendarEvent) => void;
    onDeleteEvent?: (eventId: string) => void;
    readOnly?: boolean;
    showAddEventButton?: boolean;
    buttonsContainerStyle?: ViewStyle;
    buttonSize?: 'small' | 'medium' | 'large';
}
export interface TodayButtonOptions {
    text?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    showText?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    backgroundColor?: string;
    textColor?: string;
    disabled?: boolean;
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    elevation?: number;
    shadowConfig?: {
        color?: string;
        opacity?: number;
        offset?: {
            width: number;
            height: number;
        };
        radius?: number;
    };
    accessibilityLabel?: string;
    accessibilityHint?: string;
}
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
