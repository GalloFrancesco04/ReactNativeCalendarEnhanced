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
  dateIcons?: { [key: string]: React.ReactNode }; // New prop for mapping dates to icons
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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    if (onSelectDate) {
      onSelectDate(today);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: calendarBackgroundColor }]}> 
      <CalendarHeader 
        currentMonth={currentMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        primaryColor={primaryColor}
        iconBorder={iconBorderColor} // Updated prop name
        previousIcon={previousIcon}
        nextIcon={nextIcon}
        headerTextStyle={headerTextStyle}
        headerBackgroundColor={headerBackgroundColor}
      />
      <CalendarGrid 
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
        primaryColor={primaryColor}
        startWeekOnMonday={startWeekOnMonday}
        dayNameTextStyle={dayNameTextStyle}
        dayNumberTextStyle={dayNumberTextStyle}
        dayCellBackgroundColor={dayCellBackgroundColor}
        dayCellBorderColor={dayCellBorderColor}
        customIcon={customIcon}
        showCustomIcon={showCustomIcon}
        dateIcons={dateIcons}
        defaultIcon={defaultIcon} // Pass defaultIcon to CalendarGrid
      />
      <TouchableOpacity 
        onPress={goToToday}
        style={[styles.todayButton, todayButtonStyle, { backgroundColor: primaryColor }]}
      >
        <Text style={[styles.todayButtonText, todayButtonTextStyle]}>{todayButtonText}</Text>
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
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 149,
    marginBottom: 5,
  },
  todayButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default Calendar;