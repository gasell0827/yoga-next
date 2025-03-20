import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-big-calendar";

export type CalendarViewType = View;

/**
 * 캘린더 View 상태(month, week, day, agenda)와 날짜 관리
 */
export function useCalendar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getDateFromParams = useCallback((): Date => {
    const dateParam = searchParams.get("date");
    return dateParam ? new Date(dateParam) : new Date();
  }, [searchParams]);

  const getViewFromParams = useCallback((): CalendarViewType => {
    const viewParam = searchParams.get("view") as CalendarViewType | null;
    return viewParam && ["month", "week", "day", "agenda"].includes(viewParam)
      ? viewParam
      : "month";
  }, [searchParams]);

  const [currentDate, setCurrentDate] = useState<Date>(getDateFromParams());
  const [currentView, setCurrentView] =
    useState<CalendarViewType>(getViewFromParams());

  const updateUrlParams = useCallback(
    (date: Date, view: CalendarViewType) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", format(date, "yyyy-MM-dd"));
      params.set("view", view);
      router.push(`/calendar?${params.toString()}`);
    },
    [router, searchParams]
  );

  const updateDate = useCallback(
    (date: Date) => {
      setCurrentDate(date);
      updateUrlParams(date, currentView);
    },
    [currentView, updateUrlParams]
  );

  const updateView = useCallback(
    (view: CalendarViewType) => {
      setCurrentView(view);
      updateUrlParams(currentDate, view);
    },
    [currentDate, updateUrlParams]
  );

  useEffect(() => {
    setCurrentDate(getDateFromParams());
    setCurrentView(getViewFromParams());
  }, [getDateFromParams, getViewFromParams]);

  return {
    currentDate,
    currentView,
    updateDate,
    updateView,
  };
}
