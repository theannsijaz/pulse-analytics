"use client";

import type { UnitEconomics } from "@/lib/insights";

interface UnitEconomicsCardsProps {
  data: UnitEconomics;
  loading?: boolean;
}

function Skeleton() {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-5 shadow-sm">
      <div className="space-y-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-7 w-24" />
        <div className="skeleton h-3 w-32" />
      </div>
    </div>
  );
}

const METRICS: {
  key: keyof UnitEconomics;
  label: string;
  format: (v: number) => string;
  description: string;
  good: (v: number) => boolean;
}[] = [
  {
    key: "estimatedLTV",
    label: "Est. LTV",
    format: (v) => `$${v.toLocaleString()}`,
    description: "Lifetime value per customer",
    good: (v) => v > 200,
  },
  {
    key: "cac",
    label: "CAC",
    format: (v) => `$${v}`,
    description: "Customer acquisition cost",
    good: () => true,
  },
  {
    key: "ltvCacRatio",
    label: "LTV / CAC",
    format: (v) => `${v}x`,
    description: "Target: above 3x",
    good: (v) => v >= 3,
  },
  {
    key: "paybackMonths",
    label: "Payback Period",
    format: (v) => `${v} mo`,
    description: "Months to recover CAC",
    good: (v) => v < 12,
  },
  {
    key: "arpu",
    label: "ARPU",
    format: (v) => `$${v.toFixed(2)}`,
    description: "Avg revenue per user",
    good: () => true,
  },
  {
    key: "grossMargin",
    label: "Gross Margin",
    format: (v) => `${v}%`,
    description: "SaaS benchmark: 70-85%",
    good: (v) => v >= 70,
  },
];

export default function UnitEconomicsCards({ data, loading }: UnitEconomicsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {METRICS.map((metric) => {
        const value = data[metric.key];
        const isGood = metric.good(value);
        return (
          <div
            key={metric.key}
            className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{metric.label}</p>
            <p className={`text-xl font-bold tracking-tight mt-1 ${isGood ? "text-[var(--foreground)]" : "text-[var(--warning)]"}`}>
              {metric.format(value)}
            </p>
            <p className="text-[10px] text-[var(--muted-light)] mt-1.5 leading-tight">{metric.description}</p>
          </div>
        );
      })}
    </div>
  );
}
