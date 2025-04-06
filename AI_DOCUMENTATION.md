# Calendar Component - AI-Assisted Documentation

This document provides a comprehensive guide to the Calendar component, including the recent AI-assisted enhancements and implementation details.

## Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [Core Features](#core-features)
4. [Date Icons Enhancement](#date-icons-enhancement)
5. [Efficient Icon Updates](#efficient-icon-updates)
6. [Today Button Customization](#today-button-customization)
7. [Date Handling Notes](#date-handling-notes)
8. [Implementation Details](#implementation-details)
9. [Calendar Props Reference](#calendar-props-reference)

## Overview

The Calendar component is a highly customizable React Native calendar that provides extensive styling options, event management capabilities, support for custom date icons, and an enhanced Today button experience. This document focuses on the AI-assisted enhancements made to the component.

## Component Structure

The calendar component consists of the following key files:

- `Calendar.tsx`: Main component that orchestrates the calendar's functionality
- `CalendarHeader.tsx`: Handles month/year display and navigation
- `CalendarGrid.tsx`: Renders the grid of days and manages the display of date icons
- `CalendarDay.tsx`: Renders individual day cells with customization options
- `utils/dateUtils.ts`: Contains utility functions for date formatting and manipulation

## Core Features

- **Date Selection**: Select dates with customizable callbacks
- **Month Navigation**: Navigate between months with customizable icons
- **Event Management**: Add, update, and delete events with custom colors
- **Styling Flexibility**: Extensive customization options for colors, fonts, and layouts
- **Localization**: Support for different locales and date formats
- **Accessibility**: Built with accessibility features for all users

## Date Icons Enhancement

A major enhancement to the calendar component is the improved date icons functionality, which now supports multiple methods for assigning icons to dates.

### Implementation Approaches

The component offers three different approaches for displaying icons on specific dates:

#### 1. Direct Object Mapping (`dateIcons` prop)

This approach uses a simple key-value object where keys are dates in 'YYYY-MM-DD' format and values are React elements (icons):

```typescript
const dateIcons = {
  '2025-04-15': <Icon name="star" size={15} color="gold" />,
  '2025-04-22': <Icon name="heart" size={15} color="red" />,
  '2025-04-20': null // Using null will display the defaultIcon
};
```

#### 2. Dynamic Icon Generation (`getDateIcon` prop)

This approach uses a callback function that dynamically determines which icon to show for each date:

```typescript
const getDynamicIcon = (date: Date) => {
  // Weekend icons
  if (date.getDay() === 0 || date.getDay() === 6) {
    return <Icon name="glass" size={12} color="#FF9800" />;
  }
  
  // Specific date icon
  if (date.getDate() === 15) {
    return <Icon name="calendar-check-o" size={12} color="green" />;
  }
  
  // Return null to use defaultIcon, undefined for no icon
  return undefined;
};
```

#### 3. Pattern-Based Icons (`iconPatterns` prop)

This approach defines reusable patterns with priority levels:

```typescript
const iconPatterns = [
  {
    matcher: (date) => date.getDay() === 0 || date.getDay() === 6, // Weekends
    icon: <Icon name="coffee" size={10} color="#FF9800" />,
    priority: 1 // Lower priority
  },
  {
    matcher: (date) => date.getDate() === 15, // 15th of any month
    icon: <Icon name="star" size={10} color="gold" />,
    priority: 2 // Higher priority (overrides weekend pattern)
  }
];
```

### Default Icon Handling

The component includes support for a `defaultIcon` that is displayed when a date is explicitly marked with `null` in the `dateIcons` object:

```typescript
<Calendar
  dateIcons={{
    '2025-04-20': null, // Will use defaultIcon
  }}
  defaultIcon={<Icon name="circle" size={10} color="gray" />}
/>
```

### Implementation Details

The date icon functionality is primarily implemented in the `CalendarGrid` component, which determines which icon to show for each date using a priority-based approach:

1. First, check for a direct match in the `dateIcons` object
2. If no match is found, check the dynamic `getDateIcon` function
3. If neither of the above apply, check for matches in the `iconPatterns` array

The implementation includes a sophisticated resolution mechanism that handles both React element icons and string-based icons (which are automatically converted to FontAwesome icons).

## Efficient Icon Updates

One of the newest enhancements to the Calendar component is the ability to update date icons without triggering a full re-render of the entire calendar. This optimization is particularly valuable for performance in larger calendars or when icons need to be frequently updated.

### The UpdateDateIcons API

The component exposes a new prop called `updateDateIcons` that provides a callback mechanism for registering an icon update function:

```typescript
updateDateIcons?: (updateFunc: (newDateIcons: { [key: string]: React.ReactNode | null }) => void) => void;
```

This somewhat complex type signature can be understood as:
- The prop accepts a function that takes another function as its parameter
- The parent component uses this to register its reference to the icon updater function
- The Calendar component passes its internal update method to this function when mounted

### Implementation Approach

The implementation uses React's `useRef` hook along with `useState` and `useCallback` to create an efficient update mechanism:

```typescript
// Inside the Calendar component
const [internalDateIcons, setInternalDateIcons] = useState<{ [key: string]: React.ReactNode | null }>(dateIcons);

// Implement the updateDateIcons method
const handleUpdateDateIcons = useCallback((newDateIcons: { [key: string]: React.ReactNode | null }) => {
  setInternalDateIcons(prevIcons => ({
    ...prevIcons,
    ...newDateIcons
  }));
}, []);

// Register the update method if externally provided
useEffect(() => {
  if (typeof updateDateIcons === 'function') {
    updateDateIcons(handleUpdateDateIcons);
  }
}, [updateDateIcons, handleUpdateDateIcons]);
```

The component then uses `internalDateIcons` instead of the prop-provided `dateIcons` in its render logic, ensuring that both external prop changes and internal updates affect what's displayed.

### Usage Example

In the parent component, this functionality is used as follows:

```typescript
import React, { useRef, useCallback } from 'react';
import Calendar from './components/Calendar';

export default function CalendarContainer() {
  // Store the update function reference
  const updateIconsRef = useRef<(newIcons: { [key: string]: React.ReactNode | null }) => void>();
  
  // Example of an action that only updates icons
  const markImportantDays = useCallback(() => {
    if (updateIconsRef.current) {
      updateIconsRef.current({
        '2025-04-15': <Icon name="star" size={15} color="gold" />,
        '2025-04-30': <Icon name="exclamation" size={15} color="red" />
      });
    }
  }, []);
  
  return (
    <Calendar 
      // Register the update function
      updateDateIcons={(fn) => { updateIconsRef.current = fn; }}
      // Other props...
    />
  );
}
```

### Performance Benefits

This approach provides several key performance benefits:

1. **Targeted Updates**: Only the affected day cells re-render, not the entire calendar
2. **Reduced Prop Changes**: Avoids a full prop change cascade through the component tree
3. **Memory Efficiency**: Uses a single state object with shallow merging for updates
4. **Update Batching**: Multiple icon updates can be batched into a single state update

This implementation is especially important for calendars in performance-sensitive contexts, such as:
- Calendars with many custom icons that change frequently
- Applications where the calendar is part of a complex UI with many components
- Mobile devices with limited processing power
- Scenarios where icons are updated based on external data sources or real-time events

## Today Button Customization

Another major enhancement is the redesigned Today button API, which now offers extensive customization options through a unified `todayButtonOptions` prop.

### TodayButtonOptions Interface

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

### Flexible API Design

The `todayButtonOptions` prop accepts either:

1. A simple string to just change the button text
   ```typescript
   todayButtonOptions="Go to Today"
   ```

2. A full options object for detailed customization
   ```typescript
   todayButtonOptions={{
     text: 'Jump to Today',
     icon: <Icon name="calendar" size={16} color="white" />,
     iconPosition: 'left',
     backgroundColor: '#1976D2',
     // ...more options
   }}
   ```

### Implementation Details

The Today button customization is implemented in the `Calendar` component. The code processes the `todayButtonOptions` prop to handle both string and object formats, with backward compatibility for legacy props:

```typescript
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
```

The button is then rendered with appropriate styling based on the processed options, including support for icon positioning, custom dimensions, and platform-specific styling (elevation for Android and shadow configuration for iOS).

## Date Handling Notes

### JavaScript Month Indexing

JavaScript's `Date` object uses zero-indexed months, which can be a source of confusion:

```javascript
// Months in JavaScript Date constructor are 0-indexed:
// January = 0, February = 1, ..., December = 11
const april7th2025 = new Date(2025, 3, 7); // April 7, 2025 (not March)
```

### Date Format for dateIcons

When using the `dateIcons` prop, dates must be formatted as strings in 'YYYY-MM-DD' format, where MM is the 1-indexed month number (01-12):

```javascript
const dateIcons = {
  '2025-04-15': <Icon name="star" size={15} color="gold" />, // April 15, 2025
  '2025-12-25': <Icon name="gift" size={15} color="red" />   // December 25, 2025
};
```

This difference between JavaScript's Date constructor (0-indexed months) and the string format for dateIcons (1-indexed months) is important to note when working with the calendar.

## Implementation Details

### CalendarGrid.tsx Enhancements

The `CalendarGrid` component now includes enhanced logic for determining which icon to show for each date:

```typescript
// Enhanced icon determination using multiple approaches in priority order
let iconToShow: React.ReactNode | null = null;
let hasIcon = false;

// 1. First check if we have a direct match in dateIcons object
if (dateIcons[dateKey] !== undefined) {
  hasIcon = true;
  iconToShow = dateIcons[dateKey] === null ? defaultIcon : resolveIcon(dateIcons[dateKey]);
} 
// 2. Next check if we have a callback function for dynamic icons
else if (getDateIcon) {
  const dynamicIcon = getDateIcon(date);
  if (dynamicIcon !== undefined) {
    hasIcon = true;
    iconToShow = dynamicIcon === null ? defaultIcon : resolveIcon(dynamicIcon);
  }
}
// 3. Finally check for pattern matches, sorted by priority
else if (iconPatterns.length > 0) {
  // Sort patterns by priority (highest first) if they have priorities
  const sortedPatterns = [...iconPatterns].sort((a, b) => 
    (b.priority || 0) - (a.priority || 0)
  );
  
  // Find the first matching pattern
  const matchingPattern = sortedPatterns.find(pattern => pattern.matcher(date));
  if (matchingPattern) {
    hasIcon = true;
    iconToShow = matchingPattern.icon === null ? defaultIcon : resolveIcon(matchingPattern.icon);
  }
}
```

### Calendar.tsx Today Button Enhancements

The `Calendar` component includes enhanced rendering logic for the Today button:

```typescript
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
  // ...other props
>
  <View style={{ flexDirection: processedButtonOptions?.iconPosition === 'right' ? 'row-reverse' : 'row', alignItems: 'center' }}>
    {/* Icon - only show if provided */}
    {processedButtonOptions?.icon && (
      <View style={{ /* spacing logic */ }}>
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
```

These implementations provide a powerful and flexible API for both date icons and Today button customization, enhancing the overall user experience and developer experience of the calendar component.

## Calendar Props Reference

The following table provides a comprehensive reference of all available props for the Calendar component:

| Prop Name             | Type                              | Default       | Description                                                                 |
|-----------------------|-----------------------------------|---------------|-----------------------------------------------------------------------------|
| **Core Functionality**  |                                   |               |                                                                             |
| `initialDate`         | `Date`                           | `new Date()`  | Initial date to display                                |
| `onSelectDate`        | `(date: Date) => void`           | `undefined`   | Callback when a date is selected                       |
| `locale`              | `string`                         | `'en-US'`     | Locale for date formatting                                    |
| `startWeekOnMonday`   | `boolean`                        | `true`        | Whether week starts on Monday                                          |
| **Styling**            |                                   |               |                                                                             |
| `color`               | `string`                         | `'#2196F3'`   | Primary color for highlights and buttons                              |
| `backgroundColor`     | `string`                         | `'white'`     | Background color of the calendar                                          |
| `headerBackgroundColor` | `string`                       | `'white'`     | Background color for header section                                    |
| `headerColor`         | `string`                         | `'#000'`      | Text color for month/year title                                        |
| `cellBackgroundColor` | `string`                         | `'white'`     | Background color of day cells                                          |
| `cellBorderColor`     | `string`                         | `'#e0e0e0'`   | Border color of day cells                                             |
| `iconColor`           | `string`                         | `'#2196F3'`   | Color for navigation icons                                             |
| `selectedBackgroundColor` | `string`                     | `'#2196F3'`   | Background color for selected day                                      |
| `todayHighlightColor` | `string`                         | `'#2196F3'`   | Color used to highlight today's date                                     |
| `outsideMonthOpacity` | `number`                         | `0.3`         | Opacity for dates outside current month                                |
| **Text Styling**       |                                   |               |                                                                             |
| `headerTextColor`     | `string`                         | `'#000'`      | Color for month/year header text                                       |
| `headerStyle`         | `TextStyle`                      | `undefined`   | Custom styles for header text                                          |
| `dayNameStyle`        | `TextStyle`                      | `undefined`   | Custom styles for day names                                            |
| `dayNumberStyle`      | `TextStyle`                      | `undefined`   | Custom styles for day numbers                                          |
| `dayNameColor`        | `string`                         | `'#000'`      | Color for weekday names in header                                     |
| `dayNumberColor`      | `string`                         | `'#000'`      | Color for day numbers in cells                                            |
| `selectedDayTextColor`| `string`                         | `'white'`     | Text color for selected day                                            |
| **Icons**              |                                   |               |                                                                             |
| `previousIcon`        | `React.ReactNode`                | Default chevron | Custom icon for previous month button                                  |
| `nextIcon`            | `React.ReactNode`                | Default chevron | Custom icon for next month button                                      |
| **Date Icons**         |                                   |               |                                                                             |
| `customIcon`          | `React.ReactNode`                | `null`        | Custom icon to display for dates                                          |
| `showCustomIcon`      | `boolean \| ((date: Date) => boolean)` | `false`      | Whether to show custom icons                                    |
| `dateIcons`           | `{ [key: string]: React.ReactNode \| null }` | `{}` | Map of dates to custom icons (YYYY-MM-DD format)                      |
| `defaultIcon`         | `React.ReactNode`                | `null`        | Default icon for dates with `null` in dateIcons               |
| `getDateIcon`         | `(date: Date) => React.ReactNode \| null \| undefined` | `undefined` | Function for dynamic icon generation     |
| `iconPatterns`        | `Array<{matcher: (date: Date) => boolean, icon: React.ReactNode \| null, priority?: number}>` | `[]` | Pattern-based icons with priority |
| `updateDateIcons`     | `(updateFunc: (newDateIcons: { [key: string]: React.ReactNode \| null }) => void) => void` | `undefined` | Method to register function for updating icons without re-rendering |
| **Events**             |                                   |               |                                                                             |
| `events`              | `CalendarEvent[]`                | `[]`          | Array of events to display                                |
| `onAddEvent`          | `(event: CalendarEvent) => void` | `undefined`   | Callback when an event is added                        |
| `onUpdateEvent`       | `(event: CalendarEvent) => void` | `undefined`   | Callback when an event is updated                      |
| `onDeleteEvent`       | `(eventId: string) => void`      | `undefined`   | Callback when an event is deleted                       |
| **UI Options**         |                                   |               |                                                                             |
| `readOnly`            | `boolean`                        | `false`       | Whether calendar is in read-only mode                                 |
| `showAddEventButton`  | `boolean`                        | `true`        | Whether to show "Add Event" button                                    |
| `buttonsContainerStyle` | `ViewStyle`                      | `undefined`   | Custom styles for buttons container                                   |
| `buttonSize`          | `'small' \| 'medium' \| 'large'` | `'medium'`    | Size of buttons                                                        |
| **Today Button**       |                                   |               |                                                                             |
| `todayButtonOptions`  | `TodayButtonOptions \| string`   | `undefined`   | Comprehensive options for Today button                       |
| `todayButtonText`     | `string`                         | `'Today'`     | Text for "Go to Today" button (deprecated)     |
| `todayButtonStyle`    | `ViewStyle`                      | `undefined`   | Custom styles for "Go to Today" button (deprecated) |
| `todayButtonTextStyle` | `TextStyle`                      | `undefined`   | Custom styles for "Go to Today" button text (deprecated) |
| `todayColor`          | `string`                         | `color value` | Color used to highlight today's date                                       |