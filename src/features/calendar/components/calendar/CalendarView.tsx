"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { Calendar, View, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// import { EventModal } from "@/features/calendar/components/modal/EventModal";
import { CalendarViewType } from "@/features/calendar/hooks/useCalendar";

import {
  CalendarEvent,
  FilterState,
  getCategoryColor,
} from "../../model/types";
import "./calendar-custom.css";

const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// NOTE: 달력 표시 형식 상수화
const CALENDAR_FORMATS = {
  monthHeaderFormat: () => "",
  weekdayFormat: (date: Date) => format(date, "E", { locale: ko }),
  dayFormat: (date: Date) => format(date, "d", { locale: ko }),
  dayHeaderFormat: (date: Date) =>
    format(date, "yyyy년 M월 d일 (E)", { locale: ko }),
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${format(start, "M월 d일", { locale: ko })} - ${format(end, "M월 d일", { locale: ko })} `,
  eventTimeRangeFormat: () => "",
};

interface CalendarViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  filters: FilterState;
  view: CalendarViewType;
  onNavigate?: (date: Date) => void;
  onView?: (view: View) => void;
}

export function CalendarView({
  events,
  selectedDate,
  filters,
  view,
  onNavigate,
  onView,
}: CalendarViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const filteredEvents = events.filter((event) => filters[event.category]);

  const eventStyle = (event: CalendarEvent) => {
    const colorInfo = getCategoryColor(event.category);
    return {
      className: `${colorInfo.bg} text-gray-900`,
      style: {
        backgroundColor: colorInfo.hex,
      },
    };
  };

  return (
    <div className="h-[calc(100vh-250px)]">
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        eventPropGetter={eventStyle}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setIsModalOpen(true);
        }}
        date={selectedDate}
        view={view}
        onNavigate={onNavigate}
        onView={onView}
        formats={CALENDAR_FORMATS}
        className="hide-month-header hide-toolbar-buttons"
      />
      {/* {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventData={selectedEvent}
        />
      )} */}
    </div>
  );
}
