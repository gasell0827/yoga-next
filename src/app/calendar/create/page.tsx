"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { CreateEditForm } from "@/features/calendar/components/form/CreateEditForm";

function CreateEventContent() {
  const searchParams = useSearchParams();

  // URL 쿼리 파라미터에서 날짜 가져오기
  const initialDate = searchParams.get("date")
    ? new Date(searchParams.get("date") as string)
    : new Date();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">새 일정</h1>
      <CreateEditForm initialDate={initialDate} />
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <Suspense fallback={<div className="p-4">로딩 중...</div>}>
      <CreateEventContent />
    </Suspense>
  );
}
