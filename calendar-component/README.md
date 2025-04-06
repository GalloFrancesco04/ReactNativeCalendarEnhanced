# Calendar-EN Component

## Description
A feature-rich and highly customizable calendar component for React Native applications. This component provides extensive styling options, event management capabilities, localization support, and more to create beautiful and functional calendar interfaces.

## Installation

```bash
yarn add react-native-calendar-en
```

## Basic Usage

```javascript
import Calendar from 'react-native-calendar-en';

const App = () => {
  const handleDateSelect = (date) => {
    console.log('Selected date:', date.toDateString());
  };

  return (
    <Calendar
      onSelectDate={handleDateSelect}
      color="#1976D2"
      startWeekOnMonday={true}
    />
  );
};

export default App;
```

## Features

- **Date Selection**: Select dates with customizable callbacks
- **Month Navigation**: Easy navigation between months with customizable icons
- **Event Management**: Add, update, and delete events with custom colors
- **Styling Flexibility**: Extensive customization options for colors, fonts, and layouts
- **Custom Icons**: Display custom icons for specific dates
- **Localization**: Support for different locales and date formats
- **Today Navigation**: Quick navigation to the current date
- **Accessibility**: Built with accessibility in mind

## Available Props

### Core Functionality

| Prop Name           | Type                      | Default       | Description                                   |
|---------------------|---------------------------|---------------|-----------------------------------------------|
| `initialDate`       | `Date`                    | `new Date()`  | The initial date to display in the calendar   |
| `onSelectDate`      | `(date: Date) => void`    | `undefined`   | Callback function when a date is selected     |
| `locale`            | `string`                  | `'en-US'`     | Locale for date formatting                    |
| `startWeekOnMonday` | `boolean`                 | `true`        | Whether the week starts on Monday             |

### Styling Props

| Prop Name                 | Type        | Default    | Description                                  |
|---------------------------|-------------|------------|----------------------------------------------|
| `color`                   | `string`    | `'#2196F3'`| Primary color for highlights and buttons     |
| `backgroundColor`         | `string`    | `'white'`  | Background color of the calendar             |
| `headerBackgroundColor`   | `string`    | `'white'`  | Background color of the header               |
| `cellBackgroundColor`     | `string`    | `'white'`  | Background color of each day cell            |
| `cellBorderColor`         | `string`    | `'#e0e0e0'`| Border color of each day cell                |
| `iconColor`               | `string`    | `'#2196F3'`| Color for navigation icons                   |
| `selectedBackgroundColor` | `string`    | `'#2196F3'`| Background color for selected day            |
| `todayHighlightColor`     | `string`    | `'#2196F3'`| Color to highlight today's date              |
| `outsideMonthOpacity`     | `number`    | `0.3`      | Opacity for days outside the current month   |

### Text Color Props

| Prop Name              | Type        | Default    | Description                              |
|------------------------|-------------|------------|------------------------------------------|
| `headerTextColor`      | `string`    | `'#000'`   | Color for the month/year header text     |
| `dayNameColor`         | `string`    | `'#000'`   | Color for the weekday names              |
| `dayNumberColor`       | `string`    | `'#000'`   | Color for the day numbers                |
| `selectedDayTextColor` | `string`    | `'#FFF'`   | Color for text on the selected day       |

### Text Styling

| Prop Name          | Type         | Default     | Description                          |
|--------------------|--------------|-------------|--------------------------------------|
| `headerStyle`      | `TextStyle`  | `undefined` | Custom styles for the header text    |
| `dayNameStyle`     | `TextStyle`  | `undefined` | Custom styles for the day names      |
| `dayNumberStyle`   | `TextStyle`  | `undefined` | Custom styles for the day numbers    |

### Icons

| Prop Name       | Type                | Default              | Description                        |
|-----------------|---------------------|----------------------|------------------------------------|
| `previousIcon`  | `React.ReactNode`   | `<Text>{'<'}</Text>` | Custom icon for previous month     |
| `nextIcon`      | `React.ReactNode`   | `<Text>{'>'}</Text>` | Custom icon for next month         |

### Today Button Customization

| Prop Name           | Type                      | Default    | Description                                 |
|---------------------|---------------------------|------------|---------------------------------------------|
| `todayButtonOptions`| `TodayButtonOptions \| string` | `undefined` | Enhanced options for Today button customization |
| `buttonSize`        | `'small' \| 'medium' \| 'large'` | `'medium'` | Size preset for buttons                |

#### TodayButtonOptions Interface

```typescript
interface TodayButtonOptions {
  text?: string;                       // Button text
  icon?: React.ReactNode;              // Optional icon to show with/instead of text
  iconPosition?: 'left' | 'right';     // Position of icon relative to text
  showText?: boolean;                  // Whether to show text with icon
  style?: ViewStyle;                   // Main button style
  textStyle?: TextStyle;               // Text style
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
```

### Icons for Dates

| Prop Name       | Type                                     | Default  | Description                                         |
|-----------------|------------------------------------------|----------|-----------------------------------------------------|
| `customIcon`    | `React.ReactNode`                        | `null`   | Custom icon to display for dates                    |
| `showCustomIcon`| `boolean \| ((date: Date) => boolean)`   | `false`  | Whether to show custom icons for dates              |
| `dateIcons`     | `{ [key: string]: React.ReactNode \| null }` | `{}` | Mapping of dates to custom icons                   |
| `defaultIcon`   | `React.ReactNode`                        | `null`   | Default icon for dates marked with null in dateIcons |
| `getDateIcon`   | `(date: Date) => React.ReactNode \| null \| undefined` | `undefined` | Function for dynamic icon generation |
| `iconPatterns`  | `Array<{matcher: (date: Date) => boolean, icon: React.ReactNode \| null, priority?: number}>` | `[]` | Pattern-based icon assignment |

### Events

| Prop Name        | Type                                | Default     | Description                           |
|------------------|-------------------------------------|-------------|---------------------------------------|
| `events`         | `CalendarEvent[]`                   | `[]`        | Array of events to display            |
| `onAddEvent`     | `(event: CalendarEvent) => void`    | `undefined` | Callback when an event is added       |
| `onUpdateEvent`  | `(event: CalendarEvent) => void`    | `undefined` | Callback when an event is updated     |
| `onDeleteEvent`  | `(eventId: string) => void`         | `undefined` | Callback when an event is deleted     |

### UI Options

| Prop Name              | Type          | Default    | Description                              |
|------------------------|---------------|------------|------------------------------------------|
| `readOnly`             | `boolean`     | `false`    | Whether the calendar is read-only        |
| `showAddEventButton`   | `boolean`     | `true`     | Whether to show the Add Event button     |
| `buttonsContainerStyle`| `ViewStyle`   | `undefined`| Custom styles for buttons container      |

## Event Interface

The component uses the following interface for calendar events:

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color?: string;
}
```

## Advanced Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-calendar-en';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting with Client',
      description: 'Discuss project requirements',
      date: new Date(2025, 3, 15),
      color: '#1976D2'
    },
    {
      id: '2',
      title: 'Dentist Appointment',
      description: 'Regular checkup',
      date: new Date(2025, 3, 22),
      color: '#E53935'
    }
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  };

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  // Map specific dates to custom icons
  const dateIcons = {
    '2025-04-15': <Icon name="briefcase" size={15} color="#1976D2" />,
    '2025-04-22': <Icon name="medkit" size={15} color="#E53935" />,
    '2025-04-20': null // Will use defaultIcon
  };

  return (
    <View style={{ padding: 16 }}>
      <Calendar 
        initialDate={selectedDate}
        onSelectDate={handleDateSelect} 
        color="#1976D2" 
        iconColor="#1976D2"
        previousIcon={<Icon name="chevron-left" size={16} color="#1976D2" />}
        nextIcon={<Icon name="chevron-right" size={16} color="#1976D2" />}
        startWeekOnMonday={true}
        headerStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
        dayNameStyle={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}
        dayNumberStyle={{ fontSize: 16, color: 'black' }}
        backgroundColor="#FFFFFF"
        headerBackgroundColor="#F5F5F5"
        cellBackgroundColor="#FFFFFF"
        cellBorderColor="#E0E0E0"
        
        // Enhanced Today button customization
        todayButtonOptions={{
          text: 'Jump to Today',
          icon: <Icon name="calendar" size={16} color="white" />,
          iconPosition: 'left',
          backgroundColor: '#1976D2',
          textColor: 'white',
          borderRadius: 8,
          elevation: 2,
          shadowConfig: {
            color: '#000',
            opacity: 0.3,
            offset: { width: 0, height: 2 },
            radius: 3
          }
        }}
        
        buttonSize="medium"
        dateIcons={dateIcons}
        defaultIcon={<Icon name="circle" size={10} color="gray" />}
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        readOnly={false}
        showAddEventButton={true}
      />
    </View>
  );
};

export default App;
```

## Handling Events

The Calendar component provides comprehensive event management capabilities:

```jsx
// Example of handling events
const [events, setEvents] = useState([]);

const handleAddEvent = (event) => {
  setEvents([...events, event]);
};

const handleUpdateEvent = (updatedEvent) => {
  setEvents(events.map(event => 
    event.id === updatedEvent.id ? updatedEvent : event
  ));
};

const handleDeleteEvent = (eventId) => {
  setEvents(events.filter(event => event.id !== eventId));
};

return (
  <Calendar
    events={events}
    onAddEvent={handleAddEvent}
    onUpdateEvent={handleUpdateEvent}
    onDeleteEvent={handleDeleteEvent}
  />
);
```

## Enhanced Date Icons

The calendar component offers multiple ways to add icons to specific dates:

### 1. Direct Mapping with dateIcons

Simple approach using a key-value object where keys are dates in 'YYYY-MM-DD' format:

```jsx
import Icon from 'react-native-vector-icons/FontAwesome';

// Create a mapping of dates to icons
const dateIcons = {
  '2025-04-15': <Icon name="star" size={15} color="gold" />,
  '2025-04-22': <Icon name="heart" size={15} color="red" />,
  '2025-04-20': null // Use the defaultIcon for this date
};

// When null is specified, the defaultIcon will be used
return (
  <Calendar
    dateIcons={dateIcons}
    defaultIcon={<Icon name="circle" size={10} color="gray" />}
    // ...other props
  />
);
```

### 2. Dynamic Icon Generation with getDateIcon

For more complex logic, use a function to dynamically determine icons:

```jsx
// Function to generate icons based on date conditions
const getDynamicIcon = (date) => {
  // Weekend icons
  if (date.getDay() === 0 || date.getDay() === 6) {
    return <Icon name="glass" size={12} color="#FF9800" />;
  }
  
  // Specific date icon
  if (date.getDate() === 15 && date.getMonth() === 3) { // April 15th
    return <Icon name="calendar-check-o" size={12} color="green" />;
  }
  
  // Return null to use defaultIcon
  // Return undefined for no icon
  return undefined;
};

return (
  <Calendar
    getDateIcon={getDynamicIcon}
    defaultIcon={<Icon name="circle" size={10} color="gray" />}
    // ...other props
  />
);
```

### 3. Pattern-Based Icons with iconPatterns

Define reusable patterns with priority levels:

```jsx
const iconPatterns = [
  {
    // Weekend pattern
    matcher: (date) => date.getDay() === 0 || date.getDay() === 6,
    icon: <Icon name="coffee" size={10} color="#FF9800" />,
    priority: 1 // Lower priority
  },
  {
    // Month-end pattern
    matcher: (date) => {
      const lastDay = new Date(date);
      lastDay.setMonth(lastDay.getMonth() + 1);
      lastDay.setDate(0);
      return date.getDate() === lastDay.getDate();
    },
    icon: <Icon name="calendar-check" size={10} color="purple" />,
    priority: 2 // Higher priority than weekends
  }
];

return (
  <Calendar
    iconPatterns={iconPatterns}
    defaultIcon={<Icon name="circle" size={10} color="gray" />}
    // ...other props
  />
);
```

## Today Button Customization

The calendar's Today button can be customized in multiple ways:

### 1. Simple Text Customization

```jsx
// Just change the button text
todayButtonOptions="Go to Today"
```

### 2. Basic Icon + Text Button

```jsx
todayButtonOptions={{
  text: "Today",
  icon: <Icon name="calendar" size={16} color="white" />,
  iconPosition: 'left'
}}
```

### 3. Fully Customized Button

```jsx
todayButtonOptions={{
  text: 'Jump to Today',
  icon: <Icon name="calendar" size={16} color="white" />,
  iconPosition: 'left',
  backgroundColor: '#1976D2',
  textColor: 'white',
  borderRadius: 8,
  elevation: 2,
  shadowConfig: {
    color: '#000',
    opacity: 0.3,
    offset: { width: 0, height: 2 },
    radius: 3
  }
}}
```

### 4. Icon-Only Button

```jsx
todayButtonOptions={{
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
}}
```

### 5. Flat Outline Button

```jsx
todayButtonOptions={{
  text: 'Today',
  backgroundColor: 'transparent',
  textColor: '#4285F4',
  borderWidth: 2,
  borderColor: '#4285F4',
  borderRadius: 8
}}
```

## Date Handling Notes

### JavaScript Month Indexing

When working with JavaScript's `Date` object, remember that months are zero-indexed:

```javascript
// Months in JavaScript Date constructor are 0-indexed:
// January = 0, February = 1, ..., December = 11
const april7th2025 = new Date(2025, 3, 7); // April 7, 2025 (not March)
const december25th2025 = new Date(2025, 11, 25); // December 25, 2025
```

This is important when:
- Creating date objects for events
- Setting up dateIcons
- Working with the calendar's date navigation

### Date Format for dateIcons

When using the `dateIcons` prop, dates should be formatted as strings in 'YYYY-MM-DD' format, where MM is the 1-indexed month number (01-12):

```javascript
const dateIcons = {
  '2025-04-15': <Icon name="star" size={15} color="gold" />, // April 15, 2025
  '2025-12-25': <Icon name="gift" size={15} color="red" />   // December 25, 2025
};
```

Note the difference between JavaScript's Date constructor (0-indexed months) and the string format for dateIcons (1-indexed months).

## Notes

- Ensure you have the `react-native-vector-icons` package installed if you plan to use icons
- For the `dateIcons` prop, keys should be in the format 'YYYY-MM-DD' (e.g., '2025-04-15')
- The component automatically shows indicators for dates with events
- Use the `readOnly` prop to disable event editing functionality
- When using `dateIcons` with a `null` value, the `defaultIcon` will be used instead

## Development
To build the library:

```bash
yarn build
```

To run tests:

```bash
yarn test
```

## License
MIT