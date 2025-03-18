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
  const handlePress = () => {
    onSelectDate(date);
  };

  // Build up style objects based on the state of the day
  const dayContainerStyle = [
    styles.dayContainer,
    isSelected && { backgroundColor: primaryColor },
    isToday && !isSelected && { borderColor: primaryColor, borderWidth: 1 },
  ];

  const dayTextStyle = [
    styles.dayText,
    !isCurrentMonth && styles.outsideMonthText,
    isSelected && styles.selectedDayText,
    dayNumberTextStyle,
  ];

  // Determine if we should show the icon based on the type of showCustomIcon
  const shouldShowIcon = typeof showCustomIcon === 'function' 
    ? showCustomIcon(date)
    : showCustomIcon;

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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 4,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative', // For positioning the icon
  },
  dayText: {
    fontSize: 16, // Increased font size
    fontWeight: '500',
  },
  outsideMonthText: {
    opacity: 0.3,
  },
  selectedDayText: {
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
});

export default CalendarDay;