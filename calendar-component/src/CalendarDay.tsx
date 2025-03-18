import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelectDate: (date: Date) => void;
  primaryColor: string;
  dayNumberTextStyle?: TextStyle;
  customIcon?: React.ReactNode; // Icon to display for the day
  showCustomIcon?: boolean | ((date: Date) => boolean); // Updated to match CalendarGrid's interface
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  isToday,
  onSelectDate,
  primaryColor,
  dayNumberTextStyle,
  customIcon = null, // Default to no icon
  showCustomIcon = false, // Default to not showing the icon
}) => {
  // Handle day press
  const handlePress = (): void => {
    onSelectDate(date);
  };

  // Build up style objects based on the state of the day
  const dayContainerStyle: Array<any> = [
    styles.dayContainer,
    isSelected && { backgroundColor: primaryColor as string },
    isToday && !isSelected && { borderColor: primaryColor as string, borderWidth: 1 },
  ];

  // Fix the type errors by properly handling conditional styles
  const dayTextStyle: Array<TextStyle> = [
    styles.dayText,
  ];
  
  // Add conditional styles only if they're truthy
  if (!isCurrentMonth) {
    dayTextStyle.push(styles.outsideMonthText);
  }
  
  if (isSelected) {
    dayTextStyle.push(styles.selectedDayText);
  }
  
  // Add the optional style if provided
  if (dayNumberTextStyle) {
    dayTextStyle.push(dayNumberTextStyle);
  }

  // Determine if we should show the icon based on the type of showCustomIcon
  const shouldShowIcon: boolean = typeof showCustomIcon === 'function' 
    ? showCustomIcon(date)
    : showCustomIcon as boolean;

  return (
    <TouchableOpacity 
      style={dayContainerStyle} 
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <Text style={dayTextStyle}>{date.getDate()}</Text>
      {shouldShowIcon && customIcon && <View style={styles.iconContainer}>{customIcon}</View>} 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 60, // Increased width
    height: 80, // Increased height
    justifyContent: 'flex-start' as const,
    alignItems: 'flex-start' as const,
    padding: 4,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative' as const, // For positioning the icon
  },
  dayText: {
    fontSize: 16, // Increased font size
    fontWeight: '500' as const,
  },
  outsideMonthText: {
    opacity: 0.3,
  },
  selectedDayText: {
    color: 'white',
  },
  iconContainer: {
    position: 'absolute' as const,
    bottom: 4,
    right: 4,
  },
});

export default CalendarDay;