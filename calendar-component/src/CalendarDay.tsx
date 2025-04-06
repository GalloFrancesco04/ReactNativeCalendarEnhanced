import React, { useMemo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, View } from 'react-native';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelectDate: (date: Date) => void;
  color?: string;                    // Simplified from primaryColor
  textStyle?: TextStyle;             // Simplified from dayNumberTextStyle
  customIcon?: React.ReactNode;      // Icon to display for the day
  showCustomIcon?: boolean | ((date: Date) => boolean); // Whether to show icon
  locale?: string;                   // For accessibility formatting
  outsideMonthOpacity?: number;      // Simplified from outsideMonthDayOpacity
  selectedBackgroundColor?: string;  // Simplified from selectedDayBackgroundColor
  todayColor?: string;               // Simplified from todayHighlightColor
  dayNumberColor?: string;           // Color for the day number text
  selectedDayTextColor?: string;     // Color for text when day is selected
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isSelected,
  isToday,
  onSelectDate,
  color = '#2196F3',
  textStyle,
  customIcon = null,
  showCustomIcon = false,
  locale = 'en-US',
  outsideMonthOpacity = 0.3,
  selectedBackgroundColor,
  todayColor,
  dayNumberColor = '#000000',        // Default day number color
  selectedDayTextColor = '#FFFFFF',  // Default selected day text color
}) => {
  // Handle day press - now uses useCallback
  const handlePress = useCallback((): void => {
    onSelectDate(date);
  }, [onSelectDate, date]);

  // Build up style objects based on the state of the day - now memoized
  const dayContainerStyle = useMemo(() => {
    const containerStyles = [
      styles.dayContainer,
    ];
    
    // Add conditional styles
    if (isSelected) {
      containerStyles.push({ 
        backgroundColor: selectedBackgroundColor || color 
      } as any);
    }
    
    // Add highlight for today
    if (isToday && !isSelected) {
      containerStyles.push({ 
        borderColor: todayColor || color, 
        borderWidth: 1 
      } as any);
    }
    
    return containerStyles;
  }, [isSelected, isToday, selectedBackgroundColor, color, todayColor]);

  // Fix the type errors by properly handling conditional styles - now memoized
  const dayTextStyle = useMemo(() => {
    const textStyles: Array<TextStyle> = [
      styles.dayText,
      { color: dayNumberColor },
    ];
    
    if (!isCurrentMonth) {
      textStyles.push({ opacity: outsideMonthOpacity });
    }
    
    if (isSelected) {
      textStyles.push({ color: selectedDayTextColor });
    }
    
    // Add the optional style if provided
    if (textStyle) {
      textStyles.push(textStyle);
    }
    
    return textStyles;
  }, [isCurrentMonth, isSelected, dayNumberColor, outsideMonthOpacity, selectedDayTextColor, textStyle]);

  // Determine if we should show the icon - now memoized
  const shouldShowIcon = useMemo(() => {
    return typeof showCustomIcon === 'function' 
      ? showCustomIcon(date)
      : showCustomIcon as boolean;
  }, [showCustomIcon, date]);

  // Format the date for accessibility labeling - memoized
  const accessibilityProps = useMemo(() => {
    const formattedDate = date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate appropriate accessibility state
    const accessibilityState = {
      selected: isSelected,
    };
    
    // Build accessibility hint
    let accessibilityHint = '';
    
    if (isToday) {
      accessibilityHint = "Today. Tap to select this date.";
    } else {
      accessibilityHint = "Tap to select this date.";
    }
    
    if (!isCurrentMonth) {
      accessibilityHint = "This date is outside the current month. " + accessibilityHint;
    }

    return {
      accessibilityRole: "button" as const,
      accessibilityLabel: formattedDate,
      accessibilityHint,
      accessibilityState
    };
  }, [date, locale, isSelected, isToday, isCurrentMonth]);

  return (
    <TouchableOpacity 
      style={dayContainerStyle} 
      onPress={handlePress}
      activeOpacity={0.6}
      accessible={true}
      {...accessibilityProps}
    >
      <Text style={dayTextStyle}>{date.getDate()}</Text>
      {customIcon && (
        <View style={styles.iconContainerBottomRight}>{customIcon}</View>
      )} 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 0,
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainerBottomRight: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(CalendarDay);