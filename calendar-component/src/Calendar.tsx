import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export interface CalendarProps {
  initialDate?: Date;
  primaryColor?: string;
  onSelectDate?: (date: Date) => void;
  iconBorderColor?: string; // Renamed from iconBorder for clarity
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  startWeekOnMonday?: boolean;
  headerTextStyle?: TextStyle;
  dayNameTextStyle?: TextStyle;
  dayNumberTextStyle?: TextStyle;
  calendarBackgroundColor?: string;
  headerBackgroundColor?: string;
  dayCellBackgroundColor?: string;
  dayCellBorderColor?: string;
  todayButtonText?: string;
  todayButtonTextStyle?: TextStyle;
  todayButtonStyle?: ViewStyle;
  customIcon?: React.ReactNode;
  showCustomIcon?: boolean | ((date: Date) => boolean);
  dateIcons?: { [key: string]: React.ReactNode | null }; // New prop for mapping dates to icons
  defaultIcon?: React.ReactNode; // Add defaultIcon prop
}

const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  primaryColor = '#2196F3',
  onSelectDate,
  iconBorderColor = '#2196F3', // Updated default prop name
  previousIcon = <Text>{'<'}</Text>,
  nextIcon = <Text>{'>'}</Text>,
  startWeekOnMonday = true,
  headerTextStyle,
  dayNameTextStyle,
  dayNumberTextStyle,
  calendarBackgroundColor = 'white',
  headerBackgroundColor = 'white',
  dayCellBackgroundColor = 'white',
  dayCellBorderColor = '#e0e0e0',
  todayButtonText = 'Today',
  todayButtonTextStyle,
  todayButtonStyle,
  customIcon,
  showCustomIcon = false,
  dateIcons = {}, // Default to an empty object
  defaultIcon = null, // Default to no icon if not specified
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  const goToNextMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToPreviousMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToToday = (): void => {
    const today: Date = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    if (onSelectDate) {
      onSelectDate(today);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: calendarBackgroundColor as string }]}> 
      <CalendarHeader 
        currentMonth={currentMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        primaryColor={primaryColor as string}
        iconBorder={iconBorderColor as string} // Updated prop name
        previousIcon={previousIcon as React.ReactNode}
        nextIcon={nextIcon as React.ReactNode}
        headerTextStyle={headerTextStyle as TextStyle | undefined}
        headerBackgroundColor={headerBackgroundColor as string}
      />
      <CalendarGrid 
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        primaryColor={primaryColor as string}
        startWeekOnMonday={startWeekOnMonday as boolean}
        dayNameTextStyle={dayNameTextStyle as TextStyle | undefined}
        dayNumberTextStyle={dayNumberTextStyle as TextStyle | undefined}
        dayCellBackgroundColor={dayCellBackgroundColor as string}
        dayCellBorderColor={dayCellBorderColor as string}
        customIcon={customIcon as React.ReactNode | undefined}
        showCustomIcon={showCustomIcon as boolean | ((date: Date) => boolean)}
        dateIcons={dateIcons as { [key: string]: React.ReactNode | null }}
        defaultIcon={defaultIcon as React.ReactNode | null} // Pass defaultIcon to CalendarGrid
      />
      <TouchableOpacity 
        onPress={goToToday}
        style={[
          styles.todayButton, 
          todayButtonStyle as ViewStyle | undefined, 
          { backgroundColor: primaryColor as string }
        ]}
      >
        <Text style={[
          styles.todayButtonText, 
          todayButtonTextStyle as TextStyle | undefined
        ]}>
          {todayButtonText as string}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  todayButton: {
    alignSelf: 'center' as const,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 149,
    marginBottom: 5,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: '500' as const,
    fontSize: 14,
  },
});

export default Calendar;