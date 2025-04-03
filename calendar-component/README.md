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

### Today Button

| Prop Name              | Type         | Default    | Description                            |
|------------------------|--------------|------------|----------------------------------------|
| `todayButtonText`      | `string`     | `'Today'`  | Text for the "Go to Today" button      |
| `todayButtonStyle`     | `ViewStyle`  | `undefined`| Custom styles for the Today button     |
| `todayButtonTextStyle` | `TextStyle`  | `undefined`| Custom styles for Today button text    |
| `buttonSize`           | `'small' \| 'medium' \| 'large'` | `'medium'` | Size preset for buttons |

### Icons for Dates

| Prop Name       | Type                                     | Default  | Description                               |
|-----------------|------------------------------------------|----------|-------------------------------------------|
| `customIcon`    | `React.ReactNode`                        | `null`   | Custom icon to display for dates          |
| `showCustomIcon`| `boolean \| ((date: Date) => boolean)`   | `false`  | Whether to show custom icons for dates    |
| `dateIcons`     | `{ [key: string]: React.ReactNode \| null }` | `{}` | Mapping of dates to custom icons         |
| `defaultIcon`   | `React.ReactNode`                        | `null`   | Default icon for dates                    |

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

  const dateIcons = {
    '2025-04-15': <Icon name="briefcase" size={15} color="#1976D2" />,
    '2025-04-22': <Icon name="medkit" size={15} color="#E53935" />
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
        todayButtonText="Today"
        todayButtonTextStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
        todayButtonStyle={{ borderRadius: 8 }}
        buttonSize="medium"
        dateIcons={dateIcons}
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

## Customizing Date Icons

You can add custom icons to specific dates:

```jsx
import Icon from 'react-native-vector-icons/FontAwesome';

// Create a mapping of dates to icons
const dateIcons = {
  '2025-04-15': <Icon name="star" size={15} color="gold" />,
  '2025-04-22': <Icon name="heart" size={15} color="red" />
};

// Use a function to determine which dates should show icons
const showIconForDate = (date) => {
  // Show icons on weekends
  return date.getDay() === 0 || date.getDay() === 6;
};

return (
  <Calendar
    dateIcons={dateIcons}
    showCustomIcon={showIconForDate}
    defaultIcon={<Icon name="circle" size={10} color="gray" />}
  />
);
```

## Notes

- Ensure you have the `react-native-vector-icons` package installed if you plan to use icons
- For the `dateIcons` prop, keys should be in the format 'YYYY-MM-DD' (e.g., '2025-04-15')
- The component automatically shows indicators for dates with events
- Use the `readOnly` prop to disable event editing functionality

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