"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlyMetric } from "@/lib/data";
import EmptyState from "./EmptyState";

interface UserGrowthChartProps {
  data: MonthlyMetric[];
}

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  if (!data.length) return <EmptyState message="No user growth data for the selected range." />;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--card-border)" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={45}
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
              signups: "Signups",
              churned: "Churned",
              netNewUsers: "Net New",
            };
            return [Number(value).toLocaleString(), labels[name as string] || name];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => {
            const labels: Record<string, string> = {
              signups: "Signups",
              churned: "Churned",
              netNewUsers: "Net New",
            };
            return labels[value] || value;
          }}
        />
        <Bar
          dataKey="signups"
          fill="var(--chart-2)"
          radius={[4, 4, 0, 0]}
          maxBarSize={28}
        />
        <Bar
          dataKey="churned"
          fill="var(--danger)"
          radius={[4, 4, 0, 0]}
          maxBarSize={28}
          opacity={0.6}
        />
        <Line
          type="monotone"
          dataKey="netNewUsers"
          stroke="var(--chart-4)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--chart-4)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
