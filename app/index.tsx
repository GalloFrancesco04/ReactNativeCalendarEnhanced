import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Calendar from './components/Calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  };

  const dateIcons = {
    '2025-03-20': null, // Mark the date without specifying an icon
    '2025-03-21': <Icon name="star" size={15} color="gold" />,
    '2025-03-22': null,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calendar Demo</Text>
      <View style={styles.calendarContainer}>
        <Calendar 
          onSelectDate={handleDateSelect} 
          primaryColor="#1976D2" 
          iconBorderColor="#1976D2" // Updated prop name to match the Calendar component
          previousIcon={<Icon name="arrow-left" size={16} color="#1976D2" />}
          nextIcon={<Icon name="arrow-right" size={16} color="#1976D2" />}
          startWeekOnMonday={true}
          headerTextStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
          dayNameTextStyle={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}
          dayNumberTextStyle={{ fontSize: 16, color: 'black' }}
          calendarBackgroundColor="#FFFFFF"
          headerBackgroundColor="#F5F5F5"
          dayCellBackgroundColor="#FFFFFF"
          dayCellBorderColor="black"
          todayButtonText="Go to Today"
          todayButtonTextStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
          todayButtonStyle={{ backgroundColor: '#1976D2', borderRadius: 20 }}
          dateIcons={dateIcons} 
          defaultIcon={<Icon name="square" size={10} color="gray" />} // Set a default icon
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  calendarContainer: {
    marginVertical: 20,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
