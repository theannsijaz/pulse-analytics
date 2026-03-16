"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { TierRevenue } from "@/lib/insights";
import EmptyState from "../EmptyState";

interface TierRevenueChartProps {
  data: TierRevenue[];
}

function formatCurrency(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

export default function TierRevenueChart({ data }: TierRevenueChartProps) {
  if (!data.length) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="proGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="entGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--card-border)" }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={55}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "12px",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(value, name) => {
            const labels: Record<string, string> = {
              proRevenue: "Pro Revenue",
              enterpriseRevenue: "Enterprise Revenue",
            };
            return [`$${Number(value).toLocaleString()}`, labels[name as string] || name];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => (value === "proRevenue" ? "Pro" : "Enterprise")}
        />
        <Area
          type="monotone"
          dataKey="proRevenue"
          stackId="1"
          stroke="var(--chart-1)"
          fill="url(#proGrad)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="enterpriseRevenue"
          stackId="1"
          stroke="var(--chart-3)"
          fill="url(#entGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
