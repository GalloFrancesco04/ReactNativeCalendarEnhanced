# Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

## Calendar Component Documentation

The `Calendar` component is a customizable React Native calendar component designed for flexibility and ease of use. Below is a comprehensive guide to its usage.

### Props

| Prop Name             | Type                              | Default       | Description                                                                 |
|-----------------------|-----------------------------------|---------------|-----------------------------------------------------------------------------|
| **Core Functionality**  |                                   |               |                                                                             |
| `initialDate`         | `Date`                           | `new Date()`  | The initial date to display in the calendar                                |
| `onSelectDate`        | `(date: Date) => void`           | `undefined`   | Callback function triggered when a date is selected                        |
| `locale`              | `string`                         | `'en-US'`     | Locale for date formatting and day names                                    |
| `startWeekOnMonday`   | `boolean`                        | `true`        | Whether the week starts on Monday                                          |
| **Styling**            |                                   |               |                                                                             |
| `color`               | `string`                         | `'#2196F3'`   | Primary color used for highlights and buttons                              |
| `backgroundColor`     | `string`                         | `'white'`     | Background color of the calendar                                           |
| `headerBackgroundColor` | `string`                       | `'white'`     | Background color for the header section                                    |
| `cellBackgroundColor` | `string`                         | `'white'`     | Background color of each day cell                                          |
| `cellBorderColor`     | `string`                         | `'#e0e0e0'`   | Border color of each day cell                                              |
| `iconColor`           | `string`                         | `'#2196F3'`   | Color for the navigation icons                                             |
| `selectedBackgroundColor` | `string`                     | `'#2196F3'`   | Background color for the selected day                                      |
| `todayHighlightColor` | `string`                         | `'#2196F3'`   | Color used to highlight today's date                                      |
| `outsideMonthOpacity` | `number`                         | `0.3`         | Opacity for days outside the current month                                 |
| **Text Styling**       |                                   |               |                                                                             |
| `headerTextColor`     | `string`                         | `'#000'`      | Color for the month/year header text                                       |
| `headerStyle`         | `TextStyle`                      | `undefined`   | Custom styles for the header text                                          |
| `dayNameStyle`        | `TextStyle`                      | `undefined`   | Custom styles for the day names                                            |
| `dayNumberStyle`      | `TextStyle`                      | `undefined`   | Custom styles for the day numbers                                          |
| `dayNameColor`        | `string`                         | `'#000'`      | Color for weekday names in the header                                      |
| `dayNumberColor`      | `string`                         | `'#000'`      | Color for day numbers in cells                                             |
| `selectedDayTextColor`| `string`                         | `'white'`     | Text color for the selected day                                            |
| **Icons**              |                                   |               |                                                                             |
| `previousIcon`        | `React.ReactNode`                | Default chevron | Custom icon for the previous month button                                  |
| `nextIcon`            | `React.ReactNode`                | Default chevron | Custom icon for the next month button                                      |
| **Date Icons**         |                                   |               |                                                                             |
| `customIcon`          | `React.ReactNode`                | `null`        | Custom icon to display for dates                                           |
| `showCustomIcon`      | `boolean \| ((date: Date) => boolean)` | `false`      | Whether to show custom icons for dates                                     |
| `dateIcons`           | `{ [key: string]: React.ReactNode \| null }` | `{}` | Mapping of dates to custom icons (YYYY-MM-DD format)                       |
| `defaultIcon`         | `React.ReactNode`                | `null`        | Default icon for dates with `null` in the dateIcons mapping                |
| **Events**             |                                   |               |                                                                             |
| `events`              | `CalendarEvent[]`                | `[]`          | Array of events to display on the calendar                                 |
| `onAddEvent`          | `(event: CalendarEvent) => void` | `undefined`   | Callback function triggered when an event is added                         |
| `onUpdateEvent`       | `(event: CalendarEvent) => void` | `undefined`   | Callback function triggered when an event is updated                       |
| `onDeleteEvent`       | `(eventId: string) => void`      | `undefined`   | Callback function triggered when an event is deleted                       |
| **UI Options**         |                                   |               |                                                                             |
| `readOnly`            | `boolean`                        | `false`       | Whether the calendar is in read-only mode                                  |
| `showAddEventButton`  | `boolean`                        | `true`        | Whether to show the "Add Event" button                                     |
| `buttonsContainerStyle` | `ViewStyle`                      | `undefined`   | Custom styles for the buttons container                                    |
| `buttonSize`          | `'small' \| 'medium' \| 'large'` | `'medium'`    | Size of the buttons                                                        |
| **Today Button**       |                                   |               |                                                                             |
| `todayButtonText`     | `string`                         | `'Today'`     | Text for the "Go to Today" button                                          |
| `todayButtonStyle`    | `ViewStyle`                      | `undefined`   | Custom styles for the "Go to Today" button                                 |
| `todayButtonTextStyle` | `TextStyle`                      | `undefined`   | Custom styles for the "Go to Today" button text                            |
| `todayColor`          | `string`                         | `color value` | Color used to highlight today's date                                       |

### Example Usage

Below is an example of how to use the `Calendar` component in your app:

```tsx
import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Calendar, { CalendarEvent } from './components/Calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  }, []);

  const handleAddEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, []);

  const handleUpdateEvent = useCallback((updatedEvent: CalendarEvent) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }, []);

  const handleDeleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const dateIcons = {
    '2025-04-20': null, // Mark the date without specifying an icon
    '2025-04-21': <Icon name="star" size={15} color="gold" />,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar 
        // Core functionality props
        initialDate={selectedDate || new Date()} 
        onSelectDate={handleDateSelect}
        locale="en-US"
        startWeekOnMonday={true}
        
        // Styling props
        color="#4285F4"
        backgroundColor="#FFFFFF"
        cellBackgroundColor="#FFFFFF"
        cellBorderColor="#E0E0E0"
        
        // Text styling props
        headerStyle={{ fontSize: 20, fontWeight: 'bold' }}
        dayNameStyle={{ fontSize: 14, fontWeight: 'bold' }}
        dayNumberStyle={{ fontSize: 16 }}
        dayNameColor="#666666"
        dayNumberColor="#333333"
        selectedDayTextColor="#FFFFFF"
        
        // Icons
        previousIcon={<Icon name="arrow-left" size={16} color="#4285F4" />}
        nextIcon={<Icon name="arrow-right" size={16} color="#4285F4" />}
        
        // Date icons
        dateIcons={dateIcons} 
        defaultIcon={<Icon name="circle" size={6} color="gray" />}
        
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
        
        // Today button and highlighting
        todayButtonText="Today"
        todayButtonStyle={{
          backgroundColor: '#4285F4',
          borderRadius: 20
        }}
        todayColor="#FF5722" // Color for highlighting today's date
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  }
});
```

### Features

- **Customizable Appearance**: Modify colors, styles, and icons to match your app's theme
- **Date Selection**: Easily handle date selection with the `onSelectDate` callback
- **Custom Icons**: Display custom icons for specific dates using the `dateIcons` prop
- **Event Management**: Add, update, and delete events with built-in modals and callbacks
- **Today Navigation**: Quickly navigate to the current date with the "Today" button
- **Flexible Button Styling**: Customize button appearance with `buttonSize` and `buttonsContainerStyle`
- **Accessibility Support**: Built-in accessibility features for screen readers
- **Localization**: Support for different languages and date formats through the `locale` prop
- **Toggle Features**: Hide the "Add Event" button when not needed with `showAddEventButton`

### CalendarEvent Interface

```tsx
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color?: string;
}
```

### Notes

- The current date is automatically selected when the calendar first loads
- Events are displayed with a small dot indicator under the day
- The calendar supports taller day cells for better readability and spacing
- Clicking on a day with events will show a modal with event details
- The "Add Event" button can be toggled on/off based on your application needs
- Button sizes can be adjusted with the `buttonSize` prop ("small", "medium", "large")

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
