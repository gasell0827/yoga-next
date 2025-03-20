import { CalendarViewType } from "@/features/calendar/hooks/useCalendar";

interface NavigationButtonsProps {
  selectedDate: Date;
  currentView: CalendarViewType;
  onDateChange: (date: Date) => void;
}

export function NavigationButtons({
  selectedDate,
  currentView,
  onDateChange,
}: NavigationButtonsProps) {
  const handlePrevious = () => {
    const newDate = new Date(selectedDate);

    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() - 1);
    }

    onDateChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);

    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() + 1);
    }

    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={handlePrevious}
        className="rounded-lg p-2 hover:bg-gray-100 flex items-center justify-center w-10 h-10"
        aria-label="이전"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={handleToday}
        className="rounded-lg px-4 py-2 hover:bg-gray-100 font-medium"
      >
        오늘
      </button>

      <button
        onClick={handleNext}
        className="rounded-lg p-2 hover:bg-gray-100 flex items-center justify-center w-10 h-10"
        aria-label="다음"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
