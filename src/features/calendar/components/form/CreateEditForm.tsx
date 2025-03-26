"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  mockCreateEvent,
  mockFetchEvent,
  mockUpdateEvent,
} from "@/features/calendar/api/mockCalendarApi";
import { ToggleButton } from "@/shared/components/ToggleButton";

import { CalendarCategory, CalendarEvent } from "../../model/types";

interface CreateEditFormProps {
  eventId?: string;
  initialDate?: Date;
}

export function CreateEditForm({
  eventId,
  initialDate = new Date(),
}: CreateEditFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: "",
    category: "수련",
    start: initialDate,
    end: initialDate,
    memo: "",
    location: "",
    isCompleted: false,
    isRecurring: false,
    hasReminder: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          setIsLoading(true);
          const event = await mockFetchEvent(eventId);
          if (event) {
            const start =
              event.start instanceof Date ? event.start : new Date(event.start);
            const end =
              event.end instanceof Date ? event.end : new Date(event.end);

            // 하루 종일 이벤트 여부 확인
            const isAllDayEvent =
              start.getHours() === 0 &&
              start.getMinutes() === 0 &&
              end.getHours() === 23 &&
              end.getMinutes() === 59;

            setIsAllDay(isAllDayEvent);
            setFormData({
              ...event,
              start,
              end,
              isCompleted: event.isCompleted || false,
              isRecurring: event.isRecurring || false,
              hasReminder: event.hasReminder || false,
            });
          }
        } catch (error) {
          console.error("이벤트를 불러오는 중 오류가 발생했습니다:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (eventId) {
        await mockUpdateEvent(eventId, formData);
      } else {
        await mockCreateEvent(
          formData as Omit<CalendarEvent, "id" | "createdAt" | "modifiedAt">
        );
      }
      router.push("/calendar");
    } catch (error) {
      console.error("이벤트 저장 중 오류가 발생했습니다:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 날짜 문자열 변환 함수
  const formatDateForInput = (date: Date | undefined | null): string => {
    if (!date) return format(new Date(), "yyyy-MM-dd");
    return format(date, "yyyy-MM-dd");
  };

  // 시간 문자열 변환 함수
  const formatTimeForInput = (date: Date | undefined | null): string => {
    if (!date) return format(new Date(), "HH:mm");
    return format(date, "HH:mm");
  };

  // 하루 종일 토글 처리
  const handleAllDayToggle = (checked: boolean) => {
    setIsAllDay(checked);

    if (checked) {
      // 하루 종일로 설정
      const startDate = formData.start ? new Date(formData.start) : new Date();
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);

      setFormData({
        ...formData,
        start: startDate,
        end: endDate,
      });
    }
  };

  // 반복 토글 처리
  const handleRecurringToggle = (checked: boolean) => {
    setFormData({
      ...formData,
      isRecurring: checked,
    });
  };

  // 알림 토글 처리
  const handleReminderToggle = (checked: boolean) => {
    setFormData({
      ...formData,
      hasReminder: checked,
    });
  };

  // 날짜 변경 처리
  const handleDateChange = (field: "start" | "end", value: string) => {
    const currentDate = formData[field]
      ? new Date(formData[field] as Date)
      : new Date();
    const [year, month, day] = value.split("-").map(Number);

    currentDate.setFullYear(year, month - 1, day);

    // 종료일이 시작일보다 이전인 경우 시작일로 설정
    if (field === "end") {
      const startDate = formData.start
        ? new Date(formData.start as Date)
        : new Date();
      if (currentDate < startDate) {
        currentDate.setFullYear(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
      }
    }

    // 시작일이 종료일보다 이후인 경우 종료일도 함께 업데이트
    if (field === "start") {
      const endDate = formData.end
        ? new Date(formData.end as Date)
        : new Date();
      if (currentDate > endDate) {
        const newEndDate = new Date(currentDate);
        if (isAllDay) {
          newEndDate.setHours(23, 59, 59, 999);
        } else {
          // 시간은 유지하고 날짜만 변경
          newEndDate.setHours(
            Math.max(currentDate.getHours(), endDate.getHours()),
            endDate.getMinutes(),
            endDate.getSeconds(),
            endDate.getMilliseconds()
          );
        }
        setFormData({
          ...formData,
          [field]: currentDate,
          end: newEndDate,
        });
        return;
      }
    }

    setFormData({
      ...formData,
      [field]: currentDate,
    });
  };

  // 시간 변경 처리
  const handleTimeChange = (field: "start" | "end", value: string) => {
    const currentDate = formData[field]
      ? new Date(formData[field] as Date)
      : new Date();
    const [hours, minutes] = value.split(":").map(Number);

    currentDate.setHours(hours, minutes, 0, 0);

    // 종료 시간이 시작 시간보다 이전인 경우 시작 시간으로 설정
    if (field === "end") {
      const startDate = formData.start
        ? new Date(formData.start as Date)
        : new Date();
      if (
        currentDate.getFullYear() === startDate.getFullYear() &&
        currentDate.getMonth() === startDate.getMonth() &&
        currentDate.getDate() === startDate.getDate() &&
        (hours < startDate.getHours() ||
          (hours === startDate.getHours() && minutes < startDate.getMinutes()))
      ) {
        currentDate.setHours(
          startDate.getHours(),
          startDate.getMinutes(),
          0,
          0
        );
      }
    }

    setFormData({
      ...formData,
      [field]: currentDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">제목</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          카테고리
        </label>
        <select
          value={formData.category || "수련"}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value as CalendarCategory,
            })
          }
          className="mt-1 w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="수련">수련</option>
          <option value="수업">수업</option>
          <option value="기타">기타</option>
          <option value="할 일">할 일</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleButton
          id="isAllDay"
          isChecked={isAllDay}
          onChange={handleAllDayToggle}
          label="하루 종일"
          icon={
            <Image
              src="/svg/calendar.svg"
              alt="Calendar"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">시작</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              value={formatDateForInput(formData.start)}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>
          {!isAllDay && (
            <div>
              <input
                type="time"
                value={formatTimeForInput(formData.start)}
                onChange={(e) => handleTimeChange("start", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">종료</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              value={formatDateForInput(formData.end)}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>
          {!isAllDay && (
            <div>
              <input
                type="time"
                value={formatTimeForInput(formData.end)}
                onChange={(e) => handleTimeChange("end", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>
          )}
        </div>
      </div>

      {formData.category === "할 일" && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCompleted"
            checked={formData.isCompleted || false}
            onChange={(e) =>
              setFormData({ ...formData, isCompleted: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="isCompleted" className="ml-2 text-sm text-gray-700">
            완료됨
          </label>
        </div>
      )}

      <ToggleButton
        id="isRecurring"
        isChecked={formData.isRecurring || false}
        onChange={handleRecurringToggle}
        label="반복"
        icon={
          <Image
            src="/svg/refresh.svg"
            alt="Refresh"
            width={16}
            height={16}
            className="h-4 w-4"
          />
        }
      />

      <ToggleButton
        id="hasReminder"
        isChecked={formData.hasReminder || false}
        onChange={handleReminderToggle}
        label="알림"
        icon={
          <Image
            src="/svg/bell.svg"
            alt="Bell"
            width={16}
            height={16}
            className="h-4 w-4"
          />
        }
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">장소</label>
        <input
          type="text"
          value={formData.location || ""}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="mt-1 w-full rounded-lg border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">메모</label>
        <textarea
          value={formData.memo || ""}
          onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          disabled={isLoading || isSubmitting}
        >
          {isSubmitting ? "처리 중..." : eventId ? "수정" : "생성"}
        </button>
      </div>
    </form>
  );
}
