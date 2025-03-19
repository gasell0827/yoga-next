"use client";

import { useRouter } from "next/navigation";
import { Component, ErrorInfo, ReactNode } from "react";

// 에러 관련 상수
const ERROR_MESSAGES = {
  DEFAULT: "알 수 없는 오류가 발생했습니다.",
  TITLE: "문제가 발생했습니다",
  DESCRIPTION: "데이터를 불러오는 중 오류가 발생했습니다.",
};

const BUTTON_TEXTS = {
  RETRY: "다시 시도",
  BACK: "이전 페이지로",
};

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">
        {ERROR_MESSAGES.TITLE}
      </h2>
      <p className="mb-2 text-gray-600">{ERROR_MESSAGES.DESCRIPTION}</p>
      <p className="mb-6 text-sm text-gray-500">
        {error.message || ERROR_MESSAGES.DEFAULT}
      </p>
      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {BUTTON_TEXTS.RETRY}
        </button>
        <button
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
        >
          {BUTTON_TEXTS.BACK}
        </button>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error || new Error(ERROR_MESSAGES.DEFAULT)}
          resetErrorBoundary={() => {
            this.resetErrorBoundary();
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}
