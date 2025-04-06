import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Calendar, { CalendarEvent } from './components/Calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  // Reference to hold the icon update function
  const updateIconsRef = useRef<(newIcons: { [key: string]: React.ReactNode | null }) => void>();
  
  // Initialize with some sample events
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const initialEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Team Meeting',
        description: 'Discuss project roadmap and upcoming features',
        date: today,
        color: '#1976D2'
      },
      {
        id: '2',
        title: 'Lunch with Client',
        description: 'Restaurant: Il Pomodoro',
        date: tomorrow,
        color: '#E53935'
      },
      {
        id: '3',
        title: 'Gym Session',
        date: new Date(2025, 3, 6), // April 6, 2025 (month is 0-indexed, so 3 = April)
        color: '#388E3C'
      },
      {
        id: '4',
        title: 'Product Launch',
        description: 'New feature release',
        date: new Date(2025, 3, 7), // April 7, 2025 (month is 0-indexed, so 3 = April)
        color: '#FF9800'
      },
      {
        id: '5',
        title: 'Team Building',
        description: 'Escape room activity',
        date: new Date(2025, 3, 8), // April 8, 2025 (month is 0-indexed, so 3 = April)
        color: '#5E35B1'
      }
    ];
    
    setEvents(initialEvents);
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  }, []);

  const handleAddEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
    console.log('Added event:', event);
  }, []);

  const handleUpdateEvent = useCallback((updatedEvent: CalendarEvent) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    console.log('Updated event:', updatedEvent);
  }, []);

  const handleDeleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    console.log('Deleted event with ID:', eventId);
  }, []);

  // Base date icons
  const dateIcons = {
    '2025-04-20': null, // Mark the date without specifying an icon
    '2025-04-21': <Icon name="star" size={15} color="gold" />,
    '2025-04-22': null,
  };

  // Example of an icon-only today button
  const todayIconOnlyButton = {
    showText: false,
    icon: <Icon name="calendar-o" size={20} color="white" />,
    backgroundColor: '#4285F4',
    borderRadius: 30,
    width: 56,
    height: 56,
    style: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  // Example of a flat today button with borders
  const todayFlatButton = {
    text: 'Jump to Today',
    backgroundColor: 'transparent',
    textColor: '#4285F4',
    borderWidth: 2,
    borderColor: '#4285F4',
    borderRadius: 8,
  };
  
  // Function to update only the date icons
  const updateIconsWithTasks = useCallback(() => {
    if (updateIconsRef.current) {
      // This only updates the icons without re-rendering the whole calendar
      updateIconsRef.current({
        '2025-04-15': <Icon name="tasks" size={15} color="#4CAF50" />,
        '2025-04-16': <Icon name="tasks" size={15} color="#4CAF50" />,
        '2025-04-17': <Icon name="tasks" size={15} color="#4CAF50" />
      });
    }
  }, []);
  
  // Function to update only the date icons with meetings
  const updateIconsWithMeetings = useCallback(() => {
    if (updateIconsRef.current) {
      // This only updates the icons without re-rendering the whole calendar
      updateIconsRef.current({
        '2025-04-10': <Icon name="video-camera" size={15} color="#E91E63" />,
        '2025-04-11': <Icon name="video-camera" size={15} color="#E91E63" />,
        '2025-04-12': <Icon name="video-camera" size={15} color="#E91E63" />
      });
    }
  }, []);
  
  // Function to update only the date icons with trips
  const updateIconsWithTrips = useCallback(() => {
    if (updateIconsRef.current) {
      // This only updates the icons without re-rendering the whole calendar
      updateIconsRef.current({
        '2025-04-25': <Icon name="plane" size={15} color="#2196F3" />,
        '2025-04-26': <Icon name="plane" size={15} color="#2196F3" />,
        '2025-04-27': <Icon name="plane" size={15} color="#2196F3" />
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar 
        // Core functionality props
        initialDate={selectedDate || new Date()} 
        onSelectDate={handleDateSelect}
        locale="it-IT"
        startWeekOnMonday={true}
        
        // Styling props with all available color options
        color="#4285F4"                      // Primary color (buttons, selected dates)
        backgroundColor="#FFFFFF"            // Overall calendar background
        headerBackgroundColor="#F3F8FF"      // Header section background
        headerColor="#2A4374"                // Header text color (month/year title)
        cellBackgroundColor="#FFFFFF"        // Day cell background
        cellBorderColor="#E0E0E0"            // Day cell border
        iconColor="#4285F4"                  // Icon colors
        selectedBackgroundColor="#4285F4"    // Selected day background
        todayHighlightColor="#4285F4"        // Today's date highlight color
        outsideMonthOpacity={0.3}            // Opacity for dates outside current month
        
        // Text color options
        headerTextColor="#333333"            // Month/year header text color
        dayNameColor="#555555"               // Weekday names color
        dayNumberColor="#333333"             // Day numbers color
        selectedDayTextColor="#FFFFFF"       // Text color on selected day
        
        // Text styling props
        headerStyle={{ fontSize: 20, fontWeight: 'bold' }}
        dayNameStyle={{ fontSize: 14, fontWeight: 'bold' }}
        dayNumberStyle={{ fontSize: 16 }}
        
        // Icons
        previousIcon={<Icon name="arrow-left" size={16} color="#4285F4" />}
        nextIcon={<Icon name="arrow-right" size={16} color="#4285F4" />}
        
        // Date icons
        dateIcons={dateIcons} 
        defaultIcon={<Icon name="circle" size={10} color="gray" />}
        showCustomIcon={true}
        
        // Register the update function
        updateDateIcons={(fn) => { updateIconsRef.current = fn; }}
        
        // Today button - using single consolidated prop
        todayButtonOptions={{
          text: 'Today',
          icon: <Icon name="calendar" size={16} color="white" />,
          iconPosition: 'left',
          backgroundColor: '#4285F4',
          textColor: 'white',
          borderRadius: 20,
          elevation: 3,
          shadowConfig: {
            color: '#000',
            opacity: 0.3,
            offset: { width: 0, height: 2 },
            radius: 3
          }
        }}
        
        // Events
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        
        // UI Options
        readOnly={false}
        showAddEventButton={true}
        buttonSize="medium" // Options: 'small', 'medium', 'large'
        buttonsContainerStyle={{ 
          backgroundColor: '#F0F8FF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingVertical: 12
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'flex-start', // Ensure content starts at the top
  }
});
