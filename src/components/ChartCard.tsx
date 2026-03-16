"use client";

import { Component, type ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  loading?: boolean;
}

class ChartErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px] text-[var(--muted)]">
          <div className="text-center">
            <svg className="mx-auto mb-2 w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">Failed to load chart</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 text-xs text-[var(--accent)] hover:underline cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3 p-2">
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-[200px] w-full" />
      <div className="flex gap-3">
        <div className="skeleton h-3 w-1/4" />
        <div className="skeleton h-3 w-1/4" />
        <div className="skeleton h-3 w-1/4" />
      </div>
    </div>
  );
}

export default function ChartCard({ title, subtitle, children, loading }: ChartCardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-[var(--muted)] mt-0.5">{subtitle}</p>}
      </div>
      <ChartErrorBoundary>
        {loading ? <LoadingSkeleton /> : children}
      </ChartErrorBoundary>
    </div>
  );
}
