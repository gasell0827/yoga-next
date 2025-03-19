export type CalendarCategory = "수련" | "수업" | "기타" | "할 일";

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
