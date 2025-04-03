// Export all calendar components for easy importing
export { default as Calendar } from './Calendar';
export { default as CalendarHeader } from './CalendarHeader';
export { default as CalendarGrid } from './CalendarGrid';
export { default as CalendarDay } from './CalendarDay';

// Export types
export type { CalendarEvent } from './Calendar';
// Removed CalendarViewMode export

// Re-export the main Calendar component as the default export
export { default } from './Calendar';