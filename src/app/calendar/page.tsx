import { fetchEvents } from "@/features/calendar/api/calendarApi";

import { ClientPage } from "./ClientPage";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const date = searchParams.date ? new Date(searchParams.date) : new Date();

  try {
    const events = await fetchEvents(date);
    // return <ClientPage initialEvents={events} initialDate={date} />;
  } catch {
    throw new Error("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
