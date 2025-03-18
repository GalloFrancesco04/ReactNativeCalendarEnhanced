import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import CalendarDay from './CalendarDay';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  dateIcons?: { [key: string]: React.ReactNode | string | null }; // Allow string, ReactNode or null for icons
  defaultIcon?: React.ReactNode; // Default icon for dates without specific icons
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  primaryColor,
  startWeekOnMonday,
  dayNameTextStyle,
  dayNumberTextStyle,
  dayCellBackgroundColor = 'white',
  dayCellBorderColor = '#e0e0e0',
  customIcon,
  showCustomIcon,
  dateIcons = {}, // Default to an empty object
  defaultIcon = null, // Default to no icon if not specified
}) => {
  // Array of day names for the header in Italian, starting from Monday if specified
  const daysOfWeek: string[] = startWeekOnMonday
    ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    : ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  
  // Get all dates to display in the calendar grid
  const calendarDays: Date[] = getCalendarDays(currentMonth, startWeekOnMonday);

  // Helper to check if a date is today
  const isToday = (date: Date): boolean => {
    const today: Date = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Helper to check if a date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  // Helper to check if a date is within current month
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Helper to determine if custom icon should be shown for a date
  const shouldShowCustomIcon = (date: Date): boolean => {
    if (showCustomIcon === undefined) {
      return false;
    } else if (typeof showCustomIcon === 'function') {
      return showCustomIcon(date);
    } else {
      return showCustomIcon as boolean;
    }
  };

  const formatDateKey = (date: Date | string): string => {
    if (typeof date === 'string') {
      // Check if the string is in YYYY-MM-DD format
      const yyyyMmDdMatch: RegExpMatchArray | null = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (yyyyMmDdMatch) {
        return date; // Already in YYYY-MM-DD format
      }

      // Parse other string formats into a Date object
      const parsedDate: Date = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate;
      } else {
        return ''; // Return an empty string for invalid dates
      }
    }

    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day: string = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD in local timezone
  };

  // Helper to resolve icon (string or ReactNode)
  const resolveIcon = (icon: React.ReactNode | string | undefined): React.ReactNode => {
    if (typeof icon === 'string') {
      return <Icon name={icon} size={16} color="gray" />; // Default size and color for string icons
    }
    return icon || defaultIcon; // Use provided icon or fallback to defaultIcon
  };

  return (
    <View style={styles.container}>
      <View style={styles.weekdayHeader}>
        {daysOfWeek.map((day: string) => (
          <View key={day} style={styles.weekdayItem}>
            <Text style={[styles.weekdayText, dayNameTextStyle as TextStyle]}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Render calendar grid */}
      <View style={styles.daysGrid}>
        {calendarDays.map((date: Date, index: number) => {
          const dateKey: string = formatDateKey(date);
          const hasIcon: boolean = !!dateIcons[dateKey] || (dateIcons[dateKey] === null && !!defaultIcon);
          const iconToShow: React.ReactNode = dateIcons[dateKey] === null ? defaultIcon : dateIcons[dateKey] as React.ReactNode;
          
          return (
            <View 
              key={index} 
              style={[
                styles.dayContainer, 
                { 
                  backgroundColor: dayCellBackgroundColor as string, 
                  borderColor: dayCellBorderColor as string 
                }
              ]}
            > 
              <CalendarDay
                date={date}
                isCurrentMonth={isCurrentMonth(date)}
                isSelected={isDateSelected(date)}
                isToday={isToday(date)}
                onSelectDate={onSelectDate}
                primaryColor={primaryColor}
                dayNumberTextStyle={dayNumberTextStyle}
                showCustomIcon={hasIcon}
                customIcon={iconToShow}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Helper function to get all dates that should display in the calendar
function getCalendarDays(currentMonth: Date, startWeekOnMonday: boolean): Date[] {
  const result: Date[] = [];
  
  // Start from the first day of the month
  const firstDay: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  
  // Find the start day of the week prior to or equal to the first day of the month
  const startDate: Date = new Date(firstDay);
  const dayOfWeek: number = startDate.getDay();
  const diff: number = startWeekOnMonday
    ? (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
    : -dayOfWeek;
  startDate.setDate(startDate.getDate() + diff);
  
  // Generate 6 weeks of dates (42 days) to ensure we cover the whole month
  for (let i: number = 0; i < 42; i++) {
    const date: Date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    result.push(date);
  }
  
  return result;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  weekdayHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  weekdayItem: {
    flex: 1,
    alignItems: 'center' as const,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: -20,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  dayContainer: {
    width: '14.285%',
    aspectRatio: 1,
    padding: 0,
    margin: 0,
  },
});

export default CalendarGrid;