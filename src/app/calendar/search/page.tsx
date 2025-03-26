"use client";

import { useRouter } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="mr-2 rounded-lg p-2 hover:bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">검색</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <p>검색 기능은 아직 개발 중입니다.</p>
      </div>
    </div>
  );
}
