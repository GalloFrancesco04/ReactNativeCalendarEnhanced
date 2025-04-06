import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import CalendarDay from './CalendarDay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDateKey } from './utils/dateUtils';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  color?: string;                        // Simplified from primaryColor
  startWeekOnMonday?: boolean;
  dayNameStyle?: TextStyle;              // Simplified from dayNameTextStyle
  dayNumberStyle?: TextStyle;            // Simplified from dayNumberTextStyle
  cellBackgroundColor?: string;          // Simplified from dayCellBackgroundColor
  cellBorderColor?: string;              // Simplified from dayCellBorderColor
  customIcon?: React.ReactNode;
  showCustomIcon?: boolean | ((date: Date) => boolean);
  dateIcons?: { [key: string]: React.ReactNode | string | null };
  defaultIcon?: React.ReactNode;
  locale?: string;
  outsideMonthOpacity?: number;          // Simplified from outsideMonthDayOpacity
  selectedBackgroundColor?: string;      // Simplified from selectedDayBackgroundColor
  todayColor?: string;                   // Simplified from todayHighlightColor
  dayNameColor?: string;                 // Color for weekday names
  dayNumberColor?: string;               // Color for day numbers
  selectedDayTextColor?: string;         // Color for selected day text
  formatDateKeyFn?: (date: Date | string) => string;
  getDateIcon?: (date: Date) => React.ReactNode | null | undefined;
  iconPatterns?: Array<{
    matcher: (date: Date) => boolean;
    icon: React.ReactNode | null;
    priority?: number;
  }>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onSelectDate,
  color,
  startWeekOnMonday,
  dayNameStyle,
  dayNumberStyle,
  cellBackgroundColor = 'white',
  cellBorderColor = '#e0e0e0',
  customIcon,
  showCustomIcon,
  dateIcons = {}, // Default to an empty object
  defaultIcon = null, // Default to no icon if not specified
  locale = 'en-US', // Default to English
  outsideMonthOpacity = 0.3,
  selectedBackgroundColor,
  todayColor,
  dayNumberColor = '#000', // Default day number color
  selectedDayTextColor = '#FFF', // Default selected day text color
  formatDateKeyFn, // External date formatting function
  getDateIcon,
  iconPatterns = [],
}) => {
  // Get localized day names
  const getLocalizedDaysOfWeek = (): string[] => {
    const days: string[] = [];
    // Create a date for Sunday
    const date = new Date(2021, 0, 3); // January 3rd 2021 was a Sunday
    
    // Create array of days in correct order based on startWeekOnMonday
    for (let i = 0; i < 7; i++) {
      const dayIndex = startWeekOnMonday ? 
        (i + 1) % 7 : // If starting on Monday, the indices are 1, 2, 3, 4, 5, 6, 0
        i;            // If starting on Sunday, the indices are 0, 1, 2, 3, 4, 5, 6
      
      const tempDate = new Date(date);
      tempDate.setDate(date.getDate() + dayIndex);
      
      // Get short day name in the specified locale
      const dayName = tempDate.toLocaleDateString(locale, { weekday: 'short' });
      // Capitalize the day name regardless of locale
      days.push(capitalizeFirstLetter(dayName));
    }
    
    return days;
  };
  
  // Array of day names based on locale and week start preference
  const daysOfWeek: string[] = useMemo(() => getLocalizedDaysOfWeek(), [locale, startWeekOnMonday]);
  
  // Get all dates to display in the calendar grid - memoize for performance
  const calendarDays: Date[] = useMemo(() => 
    getCalendarDays(currentMonth, startWeekOnMonday), 
    [currentMonth, startWeekOnMonday]
  );

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
      return Boolean(showCustomIcon); // Cast to boolean to avoid typescript error
    }
  };

  const formatDateKey = (date: Date | string): string => {
    if (formatDateKeyFn) {
      return formatDateKeyFn(date);
    }

    // Fallback to internal implementation if no external function is provided
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
            <Text style={[styles.weekdayText, dayNameStyle as TextStyle]}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Render calendar grid */}
      <View style={styles.daysGrid}>
        {calendarDays.map((date: Date, index: number) => {
          const dateKey = formatDateKey(date);
          
          // Enhanced icon determination using multiple approaches in priority order
          let iconToShow: React.ReactNode | null = null;
          let hasIcon = false;
          
          // 1. First check if we have a direct match in dateIcons object
          if (dateIcons[dateKey] !== undefined) {
            hasIcon = true;
            iconToShow = dateIcons[dateKey] === null ? defaultIcon : resolveIcon(dateIcons[dateKey]);
          } 
          // 2. Next check if we have a callback function for dynamic icons
          else if (getDateIcon) {
            const dynamicIcon = getDateIcon(date);
            if (dynamicIcon !== undefined) {
              hasIcon = true;
              iconToShow = dynamicIcon === null ? defaultIcon : resolveIcon(dynamicIcon);
            }
          }
          // 3. Finally check for pattern matches, sorted by priority
          else if (iconPatterns.length > 0) {
            // Sort patterns by priority (highest first) if they have priorities
            const sortedPatterns = [...iconPatterns].sort((a, b) => 
              (b.priority || 0) - (a.priority || 0)
            );
            
            // Find the first matching pattern
            const matchingPattern = sortedPatterns.find(pattern => pattern.matcher(date));
            if (matchingPattern) {
              hasIcon = true;
              iconToShow = matchingPattern.icon === null ? defaultIcon : resolveIcon(matchingPattern.icon);
            }
          }

          return (
            <View
              key={index}
              style={[
                styles.dayContainer,
                {
                  backgroundColor: cellBackgroundColor,
                  borderColor: cellBorderColor,
                },
              ]}
            >
              <CalendarDay
                date={date}
                isCurrentMonth={isCurrentMonth(date)}
                isSelected={isDateSelected(date)}
                isToday={isToday(date)}
                onSelectDate={onSelectDate}
                color={color}
                textStyle={dayNumberStyle}
                customIcon={iconToShow}
                showCustomIcon={hasIcon}
                locale={locale}
                outsideMonthOpacity={outsideMonthOpacity}
                selectedBackgroundColor={selectedBackgroundColor}
                todayColor={todayColor}
                dayNumberColor={dayNumberColor}
                selectedDayTextColor={selectedDayTextColor}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Helper function to get all dates that should display in the calendar
function getCalendarDays(currentMonth: Date, startWeekOnMonday: boolean = false): Date[] {
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
  
  // Generate 5 weeks of dates (35 days) instead of 6 weeks (42 days)
  for (let i: number = 0; i < 35; i++) {
    const date: Date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    result.push(date);
  }
  
  return result;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingBottom: 0,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  weekdayItem: {
    width: '14.285%',
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayContainer: {
    width: '14.285%',
    aspectRatio: 0.8, // Changed from 1 to 0.8 to make cells taller than they are wide
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
});

export default CalendarGrid;