import { format } from "date-fns";
import { useQuery } from "react-query";

import { CalendarEvent } from "../model/types";
import { mockFetchMonthlyEvents } from "./mockCalendarApi";

export function useFetchMonthlyEvent(
  currentDate: Date,
  initialEvents: CalendarEvent[]
) {
  return useQuery(
    ["events", format(currentDate, "yyyy-MM")],
    () => mockFetchMonthlyEvents(currentDate),
    {
      initialData: initialEvents,
      retry: 2,
      useErrorBoundary: true,
    }
  );
}
