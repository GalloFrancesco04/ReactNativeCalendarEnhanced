# Calendar-EN Component

## Description
My first attempt to create a reusable component for managing and displaying calendars in React Native applications.
Be aware that this is my first time making something like this, so i can't guarantee that it will work as intended nor the absence of bug.

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
      primaryColor="#1976D2"
      startWeekOnMonday={true}
    />
  );
};

export default App;
```

## Available Props

| Prop Name               | Type                              | Default       | Description                                                                 |
|-------------------------|-----------------------------------|---------------|-----------------------------------------------------------------------------|
| `initialDate`           | `Date`                           | `new Date()`  | The initial date to display in the calendar                               |
| `primaryColor`          | `string`                         | `#2196F3`     | The primary color used for highlights and buttons                         |
| `onSelectDate`          | `(date: Date) => void`           | `undefined`   | Callback function triggered when a date is selected                       |
| `iconBorderColor`       | `string`                         | `#2196F3`     | The border color for navigation icons                                     |
| `previousIcon`          | `React.ReactNode`                | `<Text>{'<'}</Text>` | Custom icon for the previous month button                                 |
| `nextIcon`              | `React.ReactNode`                | `<Text>{'>'}</Text>` | Custom icon for the next month button                                     |
| `startWeekOnMonday`     | `boolean`                        | `true`        | Whether the week starts on Monday                                         |
| `headerTextStyle`       | `TextStyle`                      | `undefined`   | Custom styles for the header text                                         |
| `dayNameTextStyle`      | `TextStyle`                      | `undefined`   | Custom styles for the day names                                           |
| `dayNumberTextStyle`    | `TextStyle`                      | `undefined`   | Custom styles for the day numbers                                         |
| `calendarBackgroundColor` | `string`                       | `white`       | Background color of the calendar                                          |
| `headerBackgroundColor` | `string`                         | `white`       | Background color of the header                                            |
| `dayCellBackgroundColor` | `string`                        | `white`       | Background color of each day cell                                         |
| `dayCellBorderColor`    | `string`                         | `#e0e0e0`     | Border color of each day cell                                             |
| `todayButtonText`       | `string`                         | `Today`       | Text for the "Go to Today" button                                         |
| `todayButtonTextStyle`  | `TextStyle`                      | `undefined`   | Custom styles for the "Go to Today" button text                           |
| `todayButtonStyle`      | `ViewStyle`                      | `undefined`   | Custom styles for the "Go to Today" button                                |
| `customIcon`            | `React.ReactNode`                | `null`        | Custom icon to display for dates                                          |
| `showCustomIcon`        | `boolean \| ((date: Date) => boolean)` | `false` | Whether to show custom icons for dates                                    |
| `dateIcons`             | `{ [key: string]: React.ReactNode \| string \| null }` | `{}` | Mapping of dates to custom icons. Keys are in YYYY-MM-DD format |
| `defaultIcon`           | `React.ReactNode`                | `null`        | Default icon for dates with `null` in the dateIcons mapping               |

## Advanced Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-calendar-en';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date.toDateString());
  };

  const dateIcons = {
    '2025-03-21': <Icon name="star" size={15} color="gold" />,
    '2025-03-22': null, // Will use defaultIcon for this date
    '2025-03-23': 'calendar', // Can also use string name for FontAwesome icons
  };

  return (
    <View>
      <Calendar 
        onSelectDate={handleDateSelect} 
        primaryColor="#1976D2" 
        iconBorderColor="#1976D2"
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
        defaultIcon={<Icon name="square" size={10} color="gray" />}
      />
    </View>
  );
};

export default App;
```

## Features

- **Customizable Appearance**: Modify colors, styles, and icons to match your app's theme
- **Date Selection**: Easily handle date selection with the `onSelectDate` callback
- **Custom Icons**: Display custom icons for specific dates using the `dateIcons` prop
- **Default Icon**: Set a default icon for dates with `null` values in the `dateIcons` prop
- **Today Button**: Quickly navigate to the current date with the "Go to Today" button
- **Flexible Week Start**: Choose whether the week starts on Monday or Sunday

## Notes

- Ensure you have the `react-native-vector-icons` package installed if you plan to use icons
- For the `dateIcons` prop, keys should be in the format 'YYYY-MM-DD' (e.g., '2023-12-25')
- You can use string values in the `dateIcons` prop to reference FontAwesome icon names
- To use the default icon for a specific date, set its value to `null` in the `dateIcons` object

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