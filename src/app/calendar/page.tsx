import { mockFetchMonthlyEvents } from "@/features/calendar/api/mockCalendarApi";

import { ClientPage } from "./ClientPage";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const dateParam = (await searchParams).date;
  const date = dateParam ? new Date(dateParam) : new Date();

  try {
    const events = await mockFetchMonthlyEvents(date);
    return <ClientPage initialEvents={events} />;
  } catch {
    throw new Error("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
