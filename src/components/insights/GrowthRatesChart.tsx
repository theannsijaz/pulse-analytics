"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import type { GrowthRate } from "@/lib/insights";
import EmptyState from "../EmptyState";

interface GrowthRatesChartProps {
  data: GrowthRate[];
}

export default function GrowthRatesChart({ data }: GrowthRatesChartProps) {
  if (!data.length) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--card-border)" }}
        />
        <YAxis
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={45}
        />
        <ReferenceLine y={0} stroke="var(--card-border)" strokeDasharray="3 3" />
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
              revenueGrowth: "Revenue Growth",
              userGrowth: "User Growth",
            };
            return [`${value}%`, labels[name as string] || name];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => (value === "revenueGrowth" ? "Revenue Growth" : "User Growth")}
        />
        <Line
          type="monotone"
          dataKey="revenueGrowth"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="userGrowth"
          stroke="var(--chart-4)"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={{ r: 3, fill: "var(--chart-4)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
