import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  color?: string;                // Simplified from primaryColor
  iconColor?: string;            // Simplified from iconBorder
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  textStyle?: TextStyle;         // Simplified from headerTextStyle
  backgroundColor?: string;      // Simplified from headerBackgroundColor
  headerColor?: string;          // Color for the header text
  locale?: string;
  style?: ViewStyle;             // Added for overall header container styling
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  color = '#2196F3',             // Default primary color
  iconColor,                     // Will use color if not provided
  previousIcon,
  nextIcon,
  textStyle,
  backgroundColor = 'white',
  headerColor,                   // Color for header text
  locale = 'en-US',
  style,
}) => {
  // Use iconColor if provided, otherwise fall back to color
  const finalIconColor = iconColor || color;
  
  // Generate default icons if not provided
  const defaultPreviousIcon = <Icon name="chevron-left" size={16} color={finalIconColor} />;
  const defaultNextIcon = <Icon name="chevron-right" size={16} color={finalIconColor} />;

  // Format month and year using locale
  let formattedMonthYear = currentMonth.toLocaleDateString(locale, { 
    month: 'long', 
    year: 'numeric' 
  });
  
  // Capitalize the first letter of month name
  formattedMonthYear = capitalizeFirstLetter(formattedMonthYear);

  // Get next and previous month names for accessibility
  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  let nextMonthName = nextMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  nextMonthName = capitalizeFirstLetter(nextMonthName);
  
  const prevMonth = new Date(currentMonth);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  let prevMonthName = prevMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  prevMonthName = capitalizeFirstLetter(prevMonthName);

  return (
    <View 
      style={[styles.header, { backgroundColor }, style]}
      accessible={true}
      accessibilityRole="header"
    > 
      <TouchableOpacity 
        onPress={onPreviousMonth} 
        style={[styles.button, { borderColor: finalIconColor }]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Go to previous month, ${prevMonthName}`}
        accessibilityHint="Double tap to navigate to the previous month"
      >
        {previousIcon || defaultPreviousIcon}
      </TouchableOpacity>
      
      <View 
        style={styles.titleContainer}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel={`Current month is ${formattedMonthYear}`}
      >
        <Text style={[
          styles.title, 
          textStyle,
          headerColor ? { color: headerColor } : null
        ]}>{formattedMonthYear}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onNextMonth}
        style={[styles.button, { borderColor: finalIconColor }]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Go to next month, ${nextMonthName}`}
        accessibilityHint="Double tap to navigate to the next month"
      >
        {nextIcon || defaultNextIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: 18,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
});

export default CalendarHeader;