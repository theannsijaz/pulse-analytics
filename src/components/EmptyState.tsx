"use client";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No data available for the selected filters." }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-[var(--muted)]">
      <svg className="w-10 h-10 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-sm font-medium">{message}</p>
      <p className="text-xs mt-1 opacity-60">Try adjusting your date range or tier filters.</p>
    </div>
  );
}
