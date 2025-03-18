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
  const formattedMonth = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  return (
    <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}> 
      <TouchableOpacity 
        onPress={onPreviousMonth} 
        style={[styles.button, { borderColor: iconBorder }]}
      >
        {previousIcon}
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, headerTextStyle]}>{formattedMonth} {year}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={onNextMonth}
        style={[styles.button, { borderColor: iconBorder }]}
      >
        {nextIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarHeader;