"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlyMetric } from "@/lib/data";

interface RevenueChartProps {
  data: MonthlyMetric[];
}

function formatCurrency(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

export default function RevenueChart({ data }: RevenueChartProps) {
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
          yAxisId="revenue"
          tickFormatter={formatCurrency}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={55}
        />
        <YAxis
          yAxisId="arpu"
          orientation="right"
          tickFormatter={(v) => `$${v}`}
          tick={{ fontSize: 11, fill: "var(--muted-light)" }}
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
            if (name === "revenue") return [`$${Number(value).toLocaleString()}`, "MRR"];
            return [`$${Number(value).toFixed(2)}`, "ARPU"];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => (value === "revenue" ? "MRR" : "ARPU")}
        />
        <Bar
          yAxisId="revenue"
          dataKey="revenue"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
          opacity={0.15}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5, strokeWidth: 2 }}
        />
        <Line
          yAxisId="arpu"
          type="monotone"
          dataKey="arpu"
          stroke="var(--chart-4)"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={{ r: 3, fill: "var(--chart-4)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
