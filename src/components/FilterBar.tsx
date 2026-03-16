"use client";

import type { MonthlyMetric, TierKey } from "@/lib/data";
import { TIERS, TIER_COLORS } from "@/lib/data";

interface FilterBarProps {
  months: MonthlyMetric[];
  startMonth: string;
  endMonth: string;
  activeTiers: TierKey[];
  onStartMonthChange: (month: string) => void;
  onEndMonthChange: (month: string) => void;
  onTierToggle: (tier: TierKey) => void;
}

export default function FilterBar({
  months,
  startMonth,
  endMonth,
  activeTiers,
  onStartMonthChange,
  onEndMonthChange,
  onTierToggle,
}: FilterBarProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--muted)]">From</label>
            <select
              value={startMonth}
              onChange={(e) => onStartMonthChange(e.target.value)}
              className="text-sm bg-[var(--background)] border border-[var(--card-border)] rounded-lg px-3 py-1.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 cursor-pointer"
            >
              {months.map((m) => (
                <option key={m.month} value={m.month} disabled={m.month > endMonth}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--muted)]">To</label>
            <select
              value={endMonth}
              onChange={(e) => onEndMonthChange(e.target.value)}
              className="text-sm bg-[var(--background)] border border-[var(--card-border)] rounded-lg px-3 py-1.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 cursor-pointer"
            >
              {months.map((m) => (
                <option key={m.month} value={m.month} disabled={m.month < startMonth}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-5 w-px bg-[var(--card-border)] hidden sm:block" />

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--muted)]">Tiers</span>
            {TIERS.map((tier) => {
              const isActive = activeTiers.includes(tier);
              return (
                <button
                  key={tier}
                  onClick={() => onTierToggle(tier)}
                  className={`
                    text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer
                    ${isActive
                      ? "border-transparent text-white shadow-sm"
                      : "border-[var(--card-border)] text-[var(--muted)] bg-transparent hover:bg-[var(--background)]"
                    }
                  `}
                  style={isActive ? { backgroundColor: TIER_COLORS[tier] } : undefined}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
