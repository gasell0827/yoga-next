import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
