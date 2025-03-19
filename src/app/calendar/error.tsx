"use client";

import { useEffect } from "react";

import { ErrorFallback } from "@/shared/components/ErrorBoundary";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CalendarError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Calendar error:", error);
  }, [error]);

  return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
