import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextStyle, ViewStyle, Modal, TextInput, ScrollView } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDateKey } from './utils/dateUtils';

// Define the Event type
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color?: string;
}

export interface CalendarProps {
  // Core functionality
  initialDate?: Date;
  onSelectDate?: (date: Date) => void;
  locale?: string;
  startWeekOnMonday?: boolean;
  
  // Styling props
  color?: string;                          // Primary color (was primaryColor)
  backgroundColor?: string;                // Calendar background (was calendarBackgroundColor)
  headerBackgroundColor?: string;          // Background color for the header
  headerColor?: string;                    // Color for the header text
  cellBackgroundColor?: string;            // Day cell background (was dayCellBackgroundColor)
  cellBorderColor?: string;                // Day cell border (was dayCellBorderColor)
  iconColor?: string;                      // Border/color for navigation icons (was iconBorderColor)
  selectedBackgroundColor?: string;        // Background color for selected day
  todayHighlightColor?: string;            // Color to highlight today's date
  outsideMonthOpacity?: number;            // Opacity for days outside current month
  
  // Text color props
  headerTextColor?: string;                // Color for the month/year header text
  dayNameColor?: string;                   // Color for the weekday names
  dayNumberColor?: string;                 // Color for the day numbers
  selectedDayTextColor?: string;           // Color for text on selected day
  
  // Text styling
  headerStyle?: TextStyle;                 // Header text style (was headerTextStyle)
  dayNameStyle?: TextStyle;                // Day names style (was dayNameTextStyle)
  dayNumberStyle?: TextStyle;              // Day numbers style (was dayNumberTextStyle)
  
  // Icons
  previousIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  
  // Today button options (consolidated prop)
  todayButtonOptions?: TodayButtonOptions | string; // Can be a string (for backward compatibility) or full options object
  
  // Legacy props (marked as deprecated)
  /** @deprecated Use todayButtonOptions.text instead */
  todayButtonText?: string;
  /** @deprecated Use todayButtonOptions.style instead */
  todayButtonStyle?: ViewStyle;
  /** @deprecated Use todayButtonOptions.textStyle instead */
  todayButtonTextStyle?: TextStyle;
  
  // Icons for dates - enhanced API
  dateIcons?: { [key: string]: React.ReactNode | null };
  defaultIcon?: React.ReactNode;
  showCustomIcon?: boolean | ((date: Date) => boolean);
  customIcon?: React.ReactNode;            // Custom icon to display for dates
  
  // New enhanced icon API
  getDateIcon?: (date: Date) => React.ReactNode | null | undefined;
  iconPatterns?: Array<{
    matcher: (date: Date) => boolean;
    icon: React.ReactNode | null;
    priority?: number;  // Higher numbers take precedence
  }>;
  
  // Events
  events?: CalendarEvent[];
  onAddEvent?: (event: CalendarEvent) => void;
  onUpdateEvent?: (event: CalendarEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
  
  // UI options
  readOnly?: boolean;
  showAddEventButton?: boolean;
  buttonsContainerStyle?: ViewStyle;
  buttonSize?: 'small' | 'medium' | 'large';
}

// Today Button specific props
export interface TodayButtonOptions {
  text?: string;                       // Button text (replaces todayButtonText)
  icon?: React.ReactNode;              // Optional icon to show with/instead of text
  iconPosition?: 'left' | 'right';     // Position of icon relative to text
  showText?: boolean;                  // Whether to show text with icon
  style?: ViewStyle;                   // Main button style (replaces todayButtonStyle)
  textStyle?: TextStyle;               // Text style (replaces todayButtonTextStyle)
  backgroundColor?: string;            // Button background color
  textColor?: string;                  // Text color
  disabled?: boolean;                  // Whether button is disabled
  visible?: boolean;                   // Whether button is visible
  width?: number | string;             // Custom width
  height?: number | string;            // Custom height
  borderRadius?: number;               // Border radius
  borderWidth?: number;                // Border width
  borderColor?: string;                // Border color
  elevation?: number;                  // Android elevation
  shadowConfig?: {                     // iOS shadow configuration
    color?: string;
    opacity?: number;
    offset?: { width: number; height: number };
    radius?: number;
  };
  accessibilityLabel?: string;         // Custom accessibility label
  accessibilityHint?: string;          // Custom accessibility hint
}

const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(), // Default to today's date if not provided
  onSelectDate,
  locale = 'en-US',
  startWeekOnMonday = true,
  color = '#2196F3', // Default primary color
  backgroundColor = 'white', // Default calendar background
  headerBackgroundColor = 'white', // Default header background
  headerColor,
  cellBackgroundColor = 'white', // Default day cell background
  cellBorderColor = '#e0e0e0', // Default day cell border
  iconColor = '#2196F3', // Default icon color
  selectedBackgroundColor = '#2196F3', // Default selected day background
  todayHighlightColor = '#2196F3', // Default today highlight color
  outsideMonthOpacity = 0.3, // Default outside month opacity
  headerTextColor = '#000', // Default header text color
  dayNameColor = '#000', // Default day name color
  dayNumberColor = '#000', // Default day number color
  selectedDayTextColor = '#FFF', // Default selected day text color
  headerStyle,
  dayNameStyle,
  dayNumberStyle,
  previousIcon,
  nextIcon,
  todayButtonText = 'Today',
  todayButtonStyle,
  todayButtonTextStyle,
  todayButtonOptions,
  customIcon,
  showCustomIcon = false,
  dateIcons = {},
  defaultIcon = null,
  getDateIcon,
  iconPatterns = [],
  events = [],
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  readOnly = false,
  showAddEventButton = true, // Default to showing the Add Event button
  buttonsContainerStyle,
  buttonSize = 'medium', // Default button size
}) => {
  // Default theme values
  const defaultEventColor = '#1976D2';
  const eventColors = ['#1976D2', '#E53935', '#43A047', '#FB8C00', '#5E35B1'];
  
  // State for calendar - initialize with today's date
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  
  // State for events
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventColor, setEventColor] = useState<string>(defaultEventColor);
  const [showDayEvents, setShowDayEvents] = useState<boolean>(false);
  
  // Process todayButtonOptions to handle both string and object formats
  const processedButtonOptions = useMemo(() => {
    // If todayButtonOptions is a string, treat it as the button text
    if (typeof todayButtonOptions === 'string') {
      return { text: todayButtonOptions };
    }
    
    // If it's an object, use it directly
    if (todayButtonOptions && typeof todayButtonOptions === 'object') {
      return todayButtonOptions;
    }
    
    // If not provided, create from legacy props for backward compatibility
    return {
      text: todayButtonText,
      style: todayButtonStyle,
      textStyle: todayButtonTextStyle
    };
  }, [todayButtonOptions, todayButtonText, todayButtonStyle, todayButtonTextStyle]);
  
  // Update current date reference when initialDate changes
  useEffect(() => {
    if (initialDate.getTime() !== selectedDate?.getTime()) {
      setSelectedDate(initialDate);
      setCurrentMonth(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    }
  }, [initialDate]);
  
  // Filter events for the selected date
  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    
    const dateKey = formatDateKey(selectedDate);
    
    return events.filter(event => {
      const eventKey = formatDateKey(event.date);
      return eventKey === dateKey;
    });
  }, [selectedDate, events]);
  
  // Memoize dateHasEvents function to avoid recalculations
  const dateHasEvents = useCallback((date: Date): boolean => {
    const dateKey = formatDateKey(date);
    return events.some(event => formatDateKey(event.date) === dateKey);
  }, [events]);
  
  // Handle date selection
  const handleDateSelect = useCallback((date: Date): void => {
    // Simple single date selection
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
    
    // If the date has events, show the event details
    const dateEvents = events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
    
    if (dateEvents.length > 0) {
      setShowDayEvents(true);
    }
  }, [onSelectDate, events]);
  
  // Event handlers
  const handleAddEventPress = useCallback((): void => {
    if (readOnly || !selectedDate) return;
    
    // Reset form for a new event
    setSelectedEvent(null);
    setEventTitle('');
    setEventDescription('');
    setEventColor(defaultEventColor);
    setEventModalVisible(true);
  }, [readOnly, selectedDate, defaultEventColor]);
  
  const handleEditEvent = useCallback((event: CalendarEvent): void => {
    if (readOnly) return;
    
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventDescription(event.description || '');
    setEventColor(event.color || defaultEventColor);
    setEventModalVisible(true);
  }, [readOnly, defaultEventColor]);
  
  const handleDeleteEvent = useCallback((): void => {
    if (readOnly || !selectedEvent) return;
    
    if (onDeleteEvent) {
      onDeleteEvent(selectedEvent.id);
    }
    setEventModalVisible(false);
  }, [readOnly, selectedEvent, onDeleteEvent]);
  
  const handleSaveEvent = useCallback((): void => {
    if (!selectedDate || !eventTitle.trim()) return;
    
    const newEvent: CalendarEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: eventTitle.trim(),
      description: eventDescription.trim() || undefined,
      date: new Date(selectedDate),
      color: eventColor,
    };
    
    if (selectedEvent && onUpdateEvent) {
      onUpdateEvent(newEvent);
    } else if (onAddEvent) {
      onAddEvent(newEvent);
    }
    
    setEventModalVisible(false);
  }, [selectedDate, eventTitle, eventDescription, eventColor, selectedEvent, onUpdateEvent, onAddEvent]);
  
  // Navigation handlers
  const goToNextMonth = useCallback((): void => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  }, []);
  
  const goToPreviousMonth = useCallback((): void => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  }, []);
  
  const goToToday = useCallback((): void => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    if (onSelectDate) {
      onSelectDate(today);
    }
  }, [onSelectDate]);
  
  // Create icons for dates with events
  const generateEventIcons = useMemo(() => {
    const icons = { ...dateIcons };
    
    events.forEach(event => {
      const date = event.date;
      const dateKey = formatDateKey(date);
      
      // Only add our event dot if there's not already a custom icon for this date
      if (!icons[dateKey]) {
        icons[dateKey] = (
          <View style={[styles.eventDot, { backgroundColor: event.color || defaultEventColor }]} />
        );
      }
    });
    
    return icons;
  }, [dateIcons, events, defaultEventColor]);
  
  // Create a style merge helper function to fix TextStyle errors
  const mergeStyles = (baseStyle: TextStyle, additionalStyle?: TextStyle): TextStyle => {
    return additionalStyle ? { ...baseStyle, ...additionalStyle } : baseStyle;
  };

  // Get button styling based on size prop
  const getButtonSizeStyles = useCallback((size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 12
        };
      case 'large':
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16
        };
      case 'medium':
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 18,
          fontSize: 14
        };
    }
  }, []);

  // Get button size styles
  const buttonSizeStyles = useMemo(() => getButtonSizeStyles(buttonSize), [buttonSize, getButtonSizeStyles]);

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      {/* Calendar Header */}
      <CalendarHeader 
        currentMonth={currentMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        color={color}
        iconColor={iconColor}
        textStyle={headerStyle || {}}
        backgroundColor={headerBackgroundColor}
        headerColor={headerColor || headerTextColor}
        locale={locale}
        previousIcon={previousIcon}
        nextIcon={nextIcon}
      />
      
      {/* Calendar Grid */}
      <CalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          color={color}
          startWeekOnMonday={startWeekOnMonday}
          dayNameStyle={dayNameStyle}
          dayNumberStyle={dayNumberStyle}
          cellBackgroundColor={cellBackgroundColor}
          cellBorderColor={cellBorderColor}
          customIcon={customIcon}
          showCustomIcon={showCustomIcon}
          dateIcons={generateEventIcons}
          defaultIcon={defaultIcon}
          locale={locale}
          outsideMonthOpacity={outsideMonthOpacity}
          selectedBackgroundColor={selectedBackgroundColor}
          todayColor={todayHighlightColor}
          dayNameColor={dayNameColor}
          dayNumberColor={dayNumberColor}
          selectedDayTextColor={selectedDayTextColor}
        />
      
      {/* Control buttons at the bottom of the calendar */}
      <View style={[styles.controlsContainer, buttonsContainerStyle]}>
        {/* Enhanced Today button with support for all customization options */}
        {(processedButtonOptions?.visible !== false) && (
          <TouchableOpacity 
            style={[
              styles.todayButton, 
              // Apply legacy style first for backward compatibility
              processedButtonOptions?.style,
              // Then apply enhanced options
              {
                backgroundColor: processedButtonOptions?.backgroundColor || color,
                borderRadius: processedButtonOptions?.borderRadius !== undefined ? processedButtonOptions.borderRadius : 25,
                borderWidth: processedButtonOptions?.borderWidth,
                borderColor: processedButtonOptions?.borderColor,
                elevation: processedButtonOptions?.elevation !== undefined ? processedButtonOptions.elevation : 2,
                width: processedButtonOptions?.width,
                height: processedButtonOptions?.height,
                paddingVertical: buttonSizeStyles.paddingVertical,
                paddingHorizontal: buttonSizeStyles.paddingHorizontal
              } as ViewStyle,
              // Shadow config as separate style object
              processedButtonOptions?.shadowConfig ? {
                shadowColor: processedButtonOptions.shadowConfig.color || '#000',
                shadowOffset: processedButtonOptions.shadowConfig.offset || { width: 0, height: 1 },
                shadowOpacity: processedButtonOptions.shadowConfig.opacity || 0.2,
                shadowRadius: processedButtonOptions.shadowConfig.radius || 1.5,
              } as ViewStyle : undefined
            ].filter(Boolean)}
            onPress={goToToday}
            disabled={processedButtonOptions?.disabled}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={processedButtonOptions?.accessibilityLabel || "Go to today's date"}
            accessibilityHint={processedButtonOptions?.accessibilityHint || "Navigates the calendar to today's date"}
          >
            <View style={{ flexDirection: processedButtonOptions?.iconPosition === 'right' ? 'row-reverse' : 'row', alignItems: 'center' }}>
              {/* Icon - only show if provided */}
              {processedButtonOptions?.icon && (
                <View style={{ marginRight: (processedButtonOptions.iconPosition !== 'right' && processedButtonOptions.showText !== false) ? 6 : 0, 
                               marginLeft: (processedButtonOptions.iconPosition === 'right' && processedButtonOptions.showText !== false) ? 6 : 0 }}>
                  {processedButtonOptions.icon}
                </View>
              )}
              
              {/* Text - show unless explicitly disabled */}
              {processedButtonOptions?.showText !== false && (
                <Text style={[
                  styles.todayButtonText,
                  processedButtonOptions?.textStyle,
                  {
                    color: processedButtonOptions?.textColor || 'white',
                    fontSize: buttonSizeStyles.fontSize,
                    opacity: processedButtonOptions?.disabled ? 0.5 : 1
                  }
                ]}>
                  {processedButtonOptions?.text || 'Today'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        
        {/* Add Event button */}
        {!readOnly && showAddEventButton && selectedDate && (
          <TouchableOpacity 
            style={[styles.addEventButton, { backgroundColor: color }]}
            onPress={handleAddEventPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Add new event"
            accessibilityHint="Opens form to add a new event on the selected date"
          >
            <Text style={[styles.todayButtonText, { color: 'white' }]}>
              Add Event
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Events Modal */}
      <Modal
        visible={eventModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEventModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <Text style={mergeStyles(styles.modalTitle, { color: color })}>
              {selectedEvent ? 'Edit Event' : 'Add New Event'}
            </Text>
            
            <TextInput
              style={mergeStyles(styles.input, { 
                borderColor: cellBorderColor,
                color: color,
                backgroundColor: cellBackgroundColor
              })}
              placeholder="Event Title"
              placeholderTextColor="#666"
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { 
                  borderColor: cellBorderColor,
                  color: color,
                  backgroundColor: cellBackgroundColor
                }
              ]}
              placeholder="Event Description (optional)"
              placeholderTextColor="#666"
              multiline={true}
              numberOfLines={4}
              value={eventDescription}
              onChangeText={setEventDescription}
            />
            
            <View style={styles.colorPicker}>
              <Text style={mergeStyles(styles.colorPickerLabel, { color: color })}>
                Event Color:
              </Text>
              <View style={styles.colorOptions}>
                {eventColors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      eventColor === color && styles.selectedColorOption
                    ]}
                    onPress={() => setEventColor(color)}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setEventModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              {selectedEvent && (
                <TouchableOpacity 
                  style={[styles.modalButton, styles.deleteButton]} 
                  onPress={handleDeleteEvent}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSaveEvent}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Day Events Modal */}
      <Modal
        visible={showDayEvents}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDayEvents(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <Text style={mergeStyles(styles.modalTitle, { color: color })}>
              {selectedDate && selectedDate.toLocaleDateString(locale, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            
            {eventsForSelectedDate.length === 0 ? (
              <Text style={mergeStyles(styles.noEventsText, { color: '#666' })}>
                No events for this day
              </Text>
            ) : (
              <ScrollView style={styles.eventsList}>
                {eventsForSelectedDate.map(event => (
                  <TouchableOpacity
                    key={event.id}
                    style={[styles.eventItem, { 
                      borderLeftColor: event.color || defaultEventColor,
                      backgroundColor: cellBackgroundColor
                    }]}
                    onPress={() => !readOnly && handleEditEvent(event)}
                    disabled={readOnly}
                  >
                    <Text style={mergeStyles(styles.eventTitle, { color: color })}>
                      {event.title}
                    </Text>
                    {event.description && (
                      <Text style={mergeStyles(styles.eventDescription, { color: '#666' })}>
                        {event.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton, { flex: 1 }]} 
                onPress={() => setShowDayEvents(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              
              {!readOnly && selectedDate && (
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton, { flex: 1 }]} 
                  onPress={handleAddEventPress}
                >
                  <Text style={styles.buttonText}>Add Event</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  colorPicker: {
    marginVertical: 10,
  },
  colorPickerLabel: {
    marginBottom: 5,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
  },
  eventsList: {
    maxHeight: 300,
    marginBottom: 10,
  },
  eventItem: {
    padding: 10,
    borderLeftWidth: 4,
    borderRadius: 5,
    marginBottom: 8,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  eventDescription: {
    fontSize: 14,
  },
  noEventsText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 0, // Changed from 8 to 0 to remove the gap
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  todayButton: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    flex: 1,
    marginHorizontal: 5,
    maxWidth: 120,
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addEventButton: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    flex: 1,
    marginHorizontal: 5,
    maxWidth: 120,
  },
});

export default Calendar;