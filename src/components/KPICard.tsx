"use client";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  loading?: boolean;
}

function KPISkeleton() {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-7 w-32" />
        </div>
        <div className="skeleton h-10 w-10 rounded-xl" />
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <div className="skeleton h-3 w-12" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  );
}

export default function KPICard({ title, value, change, changeLabel, icon, loading }: KPICardProps) {
  if (loading) return <KPISkeleton />;

  const isPositive = change !== undefined && change >= 0;
  const isChurn = title.toLowerCase().includes("churn");
  const changeColor = isChurn
    ? isPositive ? "text-[var(--danger)]" : "text-[var(--success)]"
    : isPositive ? "text-[var(--success)]" : "text-[var(--danger)]";

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-[var(--foreground)] tracking-tight">{value}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[var(--accent-bg)]">
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${changeColor}`}>
            {isPositive ? "+" : ""}{change.toFixed(1)}%
          </span>
          <span className="text-xs text-[var(--muted)]">
            {changeLabel || "vs last month"}
          </span>
        </div>
      )}
    </div>
  );
}
