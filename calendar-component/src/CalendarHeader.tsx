import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  primaryColor: string;
  iconBorder: string;
  previousIcon: React.ReactNode;
  nextIcon: React.ReactNode;
  headerTextStyle?: TextStyle;
  headerBackgroundColor?: string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  primaryColor,
  iconBorder,
  previousIcon = <Icon name="chevron-left" size={16} color={iconBorder} />,
  nextIcon = <Icon name="chevron-right" size={16} color={iconBorder} />,
  headerTextStyle,
  headerBackgroundColor = 'white',
}) => {
  // Format month and year
  const formattedMonth: string = currentMonth.toLocaleString('default', { month: 'long' });
  const year: number = currentMonth.getFullYear();

  return (
    <View style={[styles.header, { backgroundColor: headerBackgroundColor as string }]}> 
      <TouchableOpacity 
        onPress={onPreviousMonth} 
        style={[styles.button, { borderColor: iconBorder as string }]}
      >
        {previousIcon}
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, headerTextStyle as TextStyle]}>{formattedMonth} {year}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onNextMonth}
        style={[styles.button, { borderColor: iconBorder as string }]}
      >
        {nextIcon}
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