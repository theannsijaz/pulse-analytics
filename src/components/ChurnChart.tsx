"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlyMetric } from "@/lib/data";

interface ChurnChartProps {
  data: MonthlyMetric[];
}

export default function ChurnChart({ data }: ChurnChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="churnGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
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
          yAxisId="rate"
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={40}
          domain={[0, "auto"]}
        />
        <YAxis
          yAxisId="count"
          orientation="right"
          tick={{ fontSize: 11, fill: "var(--muted-light)" }}
          tickLine={false}
          axisLine={false}
          width={40}
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
            if (name === "churnRate") return [`${value}%`, "Churn Rate"];
            return [Number(value).toLocaleString(), "Churned Users"];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => (value === "churnRate" ? "Churn Rate" : "Churned Users")}
        />
        <Bar
          yAxisId="count"
          dataKey="churned"
          fill="var(--danger)"
          radius={[4, 4, 0, 0]}
          maxBarSize={28}
          opacity={0.25}
        />
        <Area
          yAxisId="rate"
          type="monotone"
          dataKey="churnRate"
          stroke="var(--chart-5)"
          strokeWidth={2.5}
          fill="url(#churnGradient)"
          dot={{ r: 3, fill: "var(--chart-5)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
