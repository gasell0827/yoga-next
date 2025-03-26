"use client";

import { useParams } from "next/navigation";

import { CreateEditForm } from "@/features/calendar/components/form/CreateEditForm";

export default function EditEventPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">일정 수정</h1>
      <CreateEditForm eventId={id as string} />
    </div>
  );
}
