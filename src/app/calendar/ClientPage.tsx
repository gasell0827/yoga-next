"use client";

import { useState } from "react";

import { useFetchMonthlyEvent } from "@/features/calendar/api/useMonthlyEventQuery";
import { CalendarView } from "@/features/calendar/components/calendar/CalendarView";
import { EventCreateButton } from "@/features/calendar/components/calendar/EventCreateButton";
import { FilterChips } from "@/features/calendar/components/calendar/FilterChips";
import { NavigationButtons } from "@/features/calendar/components/calendar/NavigationButtons";
import { CalendarHeader } from "@/features/calendar/components/header/CalendarHeader";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";
import {
  CALENDAR_CATEGORIES,
  CalendarEvent,
  FilterState,
} from "@/features/calendar/model/types";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";

interface ClientPageProps {
  initialEvents: CalendarEvent[];
}

const initialFilters = CALENDAR_CATEGORIES.reduce((acc, category) => {
  acc[category] = true;
  return acc;
}, {} as FilterState);

function CalendarContent({ initialEvents }: ClientPageProps) {
  const { currentDate, currentView, updateDate, updateView } = useCalendar();

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const { data: events = initialEvents } = useFetchMonthlyEvent(
    currentDate,
    initialEvents
  );

  return (
    <div className="relative min-h-screen p-4">
      <div className="flex flex-col space-y-4">
        <CalendarHeader
          selectedDate={currentDate}
          onDateChange={updateDate}
          currentView={currentView}
          onViewChange={updateView}
        />
        <FilterChips
          filters={filters}
          onFilterChange={setFilters}
          events={events}
        />
        <NavigationButtons
          selectedDate={currentDate}
          currentView={currentView}
          onDateChange={updateDate}
        />
        <CalendarView
          events={events}
          selectedDate={currentDate}
          filters={filters}
          view={currentView}
          onNavigate={updateDate}
          onView={updateView}
        />
      </div>
      <EventCreateButton />
    </div>
  );
}

export function ClientPage(props: ClientPageProps) {
  return (
    <ErrorBoundary>
      <CalendarContent {...props} />
    </ErrorBoundary>
  );
}
