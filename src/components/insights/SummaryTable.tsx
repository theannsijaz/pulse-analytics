"use client";

import EmptyState from "../EmptyState";

interface SummaryRow {
  label: string;
  revenue: number;
  proRevenue: number;
  enterpriseRevenue: number;
  revenueGrowth: number;
  arr: number;
  activeUsers: number;
  signups: number;
  churned: number;
  churnRate: number;
  free: number;
  pro: number;
  enterprise: number;
  arpu: number;
  conversionRate: number;
}

interface SummaryTableProps {
  data: SummaryRow[];
}

export default function SummaryTable({ data }: SummaryTableProps) {
  if (!data.length) return <EmptyState />;

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs min-w-[900px]">
        <thead>
          <tr className="border-b border-[var(--card-border)]">
            <th className="text-left py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Month</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">MRR</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">ARR</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Growth</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Users</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Signups</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Churned</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Churn %</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Free</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Pro</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Ent.</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">ARPU</th>
            <th className="text-right py-2.5 px-2 font-semibold text-[var(--muted)] uppercase tracking-wider whitespace-nowrap">Conv. %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-[var(--card-border)] ${i % 2 === 0 ? "bg-[var(--background)]" : ""} hover:bg-[var(--accent-bg)] transition-colors duration-100`}
            >
              <td className="py-2.5 px-2 font-medium text-[var(--foreground)] whitespace-nowrap">{row.label}</td>
              <td className="py-2.5 px-2 text-right text-[var(--foreground)] tabular-nums">${row.revenue.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--muted)] tabular-nums">${(row.arr / 1000).toFixed(0)}k</td>
              <td className="py-2.5 px-2 text-right tabular-nums">
                {row.revenueGrowth > 0 ? (
                  <span className="text-[var(--success)]">+{row.revenueGrowth}%</span>
                ) : row.revenueGrowth < 0 ? (
                  <span className="text-[var(--danger)]">{row.revenueGrowth}%</span>
                ) : (
                  <span className="text-[var(--muted)]">--</span>
                )}
              </td>
              <td className="py-2.5 px-2 text-right text-[var(--foreground)] tabular-nums">{row.activeUsers.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--chart-2)] tabular-nums">{row.signups.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--danger)] tabular-nums">{row.churned.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--muted)] tabular-nums">{row.churnRate}%</td>
              <td className="py-2.5 px-2 text-right text-[var(--muted)] tabular-nums">{row.free.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--chart-1)] tabular-nums">{row.pro.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--chart-3)] tabular-nums">{row.enterprise.toLocaleString()}</td>
              <td className="py-2.5 px-2 text-right text-[var(--foreground)] tabular-nums">${row.arpu.toFixed(2)}</td>
              <td className="py-2.5 px-2 text-right text-[var(--chart-4)] tabular-nums">{row.conversionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
