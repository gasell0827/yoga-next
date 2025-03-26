"use client";

import { CreateEditForm } from "@/features/calendar/components/form/CreateEditForm";

export default function CreateEventPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">새 일정</h1>
      <CreateEditForm />
    </div>
  );
}
