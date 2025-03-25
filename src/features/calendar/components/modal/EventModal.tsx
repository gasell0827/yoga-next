"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { CalendarEvent } from "@/features/calendar/model/types";
import { Z_INDEX } from "@/shared/styles/zIndex";

interface EventModalProps {
  onClose: () => void;
  selectedDate: Date | null;
  events: CalendarEvent[];
}

export function EventModal({ onClose, selectedDate, events }: EventModalProps) {
  const router = useRouter();

  const handleEditEvent = (eventId: string) => {
    router.push(`/calendar/${eventId}/edit`);
    onClose();
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      const dateParam = selectedDate.toISOString();
      router.push(`/calendar/create?date=${dateParam}`);
      onClose();
    }
  };

  if (selectedDate) {
    const todoEvents = events.filter((event) => event.category === "할 일");
    const otherEvents = events.filter((event) => event.category !== "할 일");

    return (
      <div
        className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50"
        style={{ zIndex: Z_INDEX.modal }}
      >
        <div className="w-full rounded-t-2xl bg-white p-6 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {format(selectedDate, "yyyy년 M월 d일 (E)", { locale: ko })}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {events.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">
              이 날짜에 예정된 일정이 없습니다.
            </p>
          ) : (
            <div className="space-y-6">
              {otherEvents.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-2">일정</h3>
                  <div className="space-y-3">
                    {otherEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => handleEditEvent(event.id)}
                      >
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {format(new Date(event.start), "p", { locale: ko })} -
                          {format(new Date(event.end), "p", { locale: ko })}
                        </div>
                        {event.location && (
                          <div className="text-sm text-gray-600 mt-1">
                            장소: {event.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {todoEvents.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-2">할 일</h3>
                  <div className="space-y-3">
                    {todoEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => handleEditEvent(event.id)}
                      >
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {format(new Date(event.start), "p", { locale: ko })} -
                          {format(new Date(event.end), "p", { locale: ko })}
                        </div>
                        {event.location && (
                          <div className="text-sm text-gray-600 mt-1">
                            장소: {event.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 mt-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
            >
              닫기
            </button>
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              onClick={handleAddEvent}
            >
              일정 추가
            </button>
          </div>
        </div>
      </div>
    );
  }
}
