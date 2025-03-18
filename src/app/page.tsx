import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4">YoPlan</h1>
        <nav>
          <ul>
            <li>
              <Link
                href="/calendar"
                className="text-green-500 hover:text-green-600 underline"
              >
                캘린더 보기
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
