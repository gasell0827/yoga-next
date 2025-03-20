import Image from "next/image";
import Link from "next/link";

import { DatePicker } from "@/features/calendar/components/header/DatePicker";
import { CalendarViewType } from "@/features/calendar/hooks/useCalendar";

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  currentView: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
}

const CALENDAR_MESSAGES = {
  month: "월",
  week: "주",
  day: "일",
};

export function CalendarHeader({
  selectedDate,
  onDateChange,
  currentView,
  onViewChange,
}: CalendarHeaderProps) {
  const handleCycleView = () => {
    if (currentView === "month") {
      onViewChange("week");
    } else if (currentView === "week") {
      onViewChange("day");
    } else {
      onViewChange("month");
    }
  };

  const getViewText = () => {
    if (currentView === "month") {
      return CALENDAR_MESSAGES.month;
    } else if (currentView === "week") {
      return CALENDAR_MESSAGES.week;
    } else {
      return CALENDAR_MESSAGES.day;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <DatePicker selectedDate={selectedDate} onChange={onDateChange} />
      </div>

      <div className="flex items-center space-x-2">
        <Link href="/calendar/search" aria-label="검색">
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Image
              src="/svg/search.svg"
              alt="검색"
              width={20}
              height={20}
              className="text-gray-600"
            />
          </button>
        </Link>

        <button
          onClick={handleCycleView}
          className="rounded-lg p-2 hover:bg-gray-100 relative"
          aria-label={`현재 뷰: ${getViewText()}`}
        >
          <Image
            src="/svg/calendar.svg"
            alt="캘린더 뷰"
            width={20}
            height={20}
            className="text-gray-600"
          />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {getViewText().charAt(0)}
          </span>
        </button>
      </div>
    </div>
  );
}
