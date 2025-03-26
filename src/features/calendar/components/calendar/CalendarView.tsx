"use client";

import { format, getDay, parse, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { Calendar, View, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { mockUpdateEvent } from "@/features/calendar/api/mockCalendarApi";
import { EventModal } from "@/features/calendar/components/modal/EventModal";
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

function CustomEvent({ event }: { event: CalendarEvent }) {
  const [isCompleted, setIsCompleted] = useState(event.isCompleted || false);

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      setIsCompleted(!isCompleted);
      await mockUpdateEvent(event.id, {
        isCompleted: !isCompleted,
      });
    } catch (error) {
      console.error("이벤트 상태를 변경하는 중 오류가 발생했습니다:", error);
      setIsCompleted(isCompleted);
    }
  };

  // NOTE: 할 일 카테고리인 경우에만 체크박스 표시
  if (event.category === "할 일") {
    return (
      <div className="flex items-center w-full">
        <div className="mr-1 flex-shrink-0" onClick={handleToggleComplete}>
          <div
            className={`w-4 h-4 border rounded flex items-center justify-center ${
              isCompleted ? "bg-blue-500 border-blue-500" : "border-gray-400"
            }`}
          >
            {isCompleted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <div
          className={`truncate ${isCompleted ? "line-through text-gray-500" : ""}`}
        >
          {event.title}
        </div>
      </div>
    );
  }

  // 일반 이벤트는 기본 스타일로 표시
  return <div className="truncate">{event.title}</div>;
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
  const [selectedModalDay, setSelectedModalDay] = useState<Date | null>(null);

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

  const handleDayClick = (date: Date) => {
    setSelectedModalDay(date);
    setIsModalOpen(true);
  };

  const components = {
    event: CustomEvent,
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
        components={components}
        onSelectEvent={(event) => {
          handleDayClick(new Date(event.start));
        }}
        onSelectSlot={({ start }) => {
          handleDayClick(new Date(start));
        }}
        // NOTE: 날짜 클릭 시 모달 표시
        onDrillDown={(date) => {
          handleDayClick(date);
          return true;
        }}
        selectable={true}
        date={selectedDate}
        view={view}
        onNavigate={onNavigate}
        onView={onView}
        formats={CALENDAR_FORMATS}
        className="hide-month-header hide-toolbar-buttons calendar-cell-clickable"
      />
      {selectedModalDay && isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedModalDay}
          events={filteredEvents.filter(
            (event) =>
              new Date(event.start).toDateString() ===
              selectedModalDay.toDateString()
          )}
        />
      )}
    </div>
  );
}
