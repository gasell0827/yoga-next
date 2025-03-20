import {
  CALENDAR_CATEGORIES,
  CalendarCategory,
  CalendarEvent,
  FilterState,
  getCategoryColor,
} from "@/features/calendar/model/types";

interface FilterChipsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  events: CalendarEvent[];
}

export function FilterChips({
  filters,
  onFilterChange,
  events,
}: FilterChipsProps) {
  const eventCounts = CALENDAR_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = events.filter(
        (event) => event.category === category
      ).length;
      return acc;
    },
    {} as Record<CalendarCategory, number>
  );

  const handleToggle = (category: CalendarCategory) => {
    onFilterChange({
      ...filters,
      [category]: !filters[category],
    });
  };

  const categories = CALENDAR_CATEGORIES.map((category) => {
    const colorInfo = getCategoryColor(category);
    return {
      category,
      label: category,
      color: colorInfo.bg,
      hexColor: colorInfo.hex,
      count: eventCounts[category],
    };
  });

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ category, label, color, hexColor, count }) => (
        <button
          key={category}
          onClick={() => handleToggle(category)}
          className={`
            flex items-center rounded-full px-3 py-1 text-sm font-medium 
            transition-colors border border-gray-300
            ${filters[category] ? "bg-white text-gray-900" : "bg-gray-200 text-gray-500"}
          `}
        >
          <span>{label}</span>
          <span
            className="ml-1 font-bold"
            style={{ color: filters[category] ? hexColor : "#9CA3AF" }}
          >
            {count || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
