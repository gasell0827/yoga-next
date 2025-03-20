"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRef, useState } from "react";

import { ScrollPicker } from "@/features/calendar/components/header/ScrollPicker";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { Z_INDEX } from "@/shared/styles/zIndex";

const DownArrowSVG = (isOpen: boolean) => {
  return (
    <svg
      className="ml-2 h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  );
};

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    modalContentRef,
    () => {
      if (isOpen) setIsOpen(false);
    },
    isOpen
  );

  // NOTE: 현재 연도부터 2000년까지, 그리고 현재 연도 + 5년까지의 범위
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const endYear = currentYear + 5;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => `${startYear + i}년`
  );
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);

  const handleDateChange = (part: "year" | "month" | "day", value: string) => {
    const newDate = new Date(selectedDate);
    const numValue = parseInt(value.replace(/\D/g, ""));

    switch (part) {
      case "year":
        newDate.setFullYear(numValue);
        break;
      case "month":
        newDate.setMonth(numValue - 1);
        break;
      case "day":
        newDate.setDate(numValue);
        break;
    }

    onChange(newDate);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50"
      >
        {format(selectedDate, "yyyy.MM.dd", { locale: ko })}
        {DownArrowSVG(isOpen)}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 md:absolute md:inset-auto md:top-full md:left-1/2 md:mt-1 md:w-auto md:bg-transparent md:-translate-x-1/2"
          style={{ zIndex: Z_INDEX.modalBackdrop }}
        >
          <div
            ref={modalContentRef}
            className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:w-auto md:min-w-[320px]"
          >
            <div className="flex justify-between space-x-4 text-center">
              <ScrollPicker
                items={years}
                selectedValue={`${selectedDate.getFullYear()}년`}
                onSelect={(value) => handleDateChange("year", value)}
              />

              <ScrollPicker
                items={months}
                selectedValue={`${selectedDate.getMonth() + 1}월`}
                onSelect={(value) => handleDateChange("month", value)}
              />

              <ScrollPicker
                items={days}
                selectedValue={`${selectedDate.getDate()}일`}
                onSelect={(value) => handleDateChange("day", value)}
              />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
