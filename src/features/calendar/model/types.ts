export const COLOR_PALETTE = [
  { bg: "bg-rose-300", hex: "#fda4af" },
  { bg: "bg-blue-300", hex: "#93c5fd" },
  { bg: "bg-purple-300", hex: "#d8b4fe" },
  { bg: "bg-green-300", hex: "#86efac" },
  { bg: "bg-yellow-300", hex: "#fde047" },
  { bg: "bg-orange-300", hex: "#fdba74" },
  { bg: "bg-teal-300", hex: "#5eead4" },
  { bg: "bg-indigo-300", hex: "#a5b4fc" },
  { bg: "bg-pink-300", hex: "#f9a8d4" },
  { bg: "bg-lime-300", hex: "#bef264" },
];

export const DEFAULT_CATEGORY_COLOR = { bg: "bg-gray-300", hex: "#d1d5db" };

export const CALENDAR_CATEGORIES = ["수련", "수업", "기타", "할 일"] as const;

export type CalendarCategory = (typeof CALENDAR_CATEGORIES)[number];

export const CATEGORY_COLOR_MAP: Record<
  CalendarCategory,
  { bg: string; hex: string }
> = CALENDAR_CATEGORIES.reduce(
  (acc, category, index) => {
    acc[category] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    return acc;
  },
  {} as Record<CalendarCategory, { bg: string; hex: string }>
);

export function getCategoryColor(category: CalendarCategory) {
  return CATEGORY_COLOR_MAP[category] || DEFAULT_CATEGORY_COLOR;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: CalendarCategory;
  createdAt: Date;
  modifiedAt: Date | null;

  // "할 일" 한정 type
  isCompleted?: boolean;

  // 추후 상세 수정
  location?: string;
  repeatSetting?: string;
  alarmSetting?: string;
  memo?: string;
}

export type FilterState = Record<CalendarCategory, boolean>;
