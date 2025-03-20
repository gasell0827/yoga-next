"use client";

import Link from "next/link";

import { Z_INDEX } from "@/shared/styles/zIndex";

export function EventCreateButton() {
  return (
    <div
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ zIndex: Z_INDEX.floatingButton }}
    >
      <Link href="/calendar/create" aria-label="일정 추가">
        <span className="text-2xl font-bold">+</span>
      </Link>
    </div>
  );
}
