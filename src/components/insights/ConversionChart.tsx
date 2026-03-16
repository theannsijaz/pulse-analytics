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
import EmptyState from "../EmptyState";

interface ConversionPoint {
  label: string;
  conversionRate: number;
  paidUsers: number;
  freeUsers: number;
}

interface ConversionChartProps {
  data: ConversionPoint[];
}

export default function ConversionChart({ data }: ConversionChartProps) {
  if (!data.length) return <EmptyState />;

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
          yAxisId="rate"
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11, fill: "var(--muted)" }}
          tickLine={false}
          axisLine={false}
          width={45}
        />
        <YAxis
          yAxisId="users"
          orientation="right"
          tick={{ fontSize: 11, fill: "var(--muted-light)" }}
          tickLine={false}
          axisLine={false}
          width={50}
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
            if (name === "conversionRate") return [`${value}%`, "Conversion Rate"];
            if (name === "paidUsers") return [Number(value).toLocaleString(), "Paid Users"];
            return [Number(value).toLocaleString(), "Free Users"];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => {
            const labels: Record<string, string> = {
              conversionRate: "Conversion Rate",
              paidUsers: "Paid Users",
              freeUsers: "Free Users",
            };
            return labels[value] || value;
          }}
        />
        <Bar
          yAxisId="users"
          dataKey="paidUsers"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
          maxBarSize={24}
          opacity={0.7}
        />
        <Bar
          yAxisId="users"
          dataKey="freeUsers"
          fill="var(--chart-2)"
          radius={[4, 4, 0, 0]}
          maxBarSize={24}
          opacity={0.3}
        />
        <Line
          yAxisId="rate"
          type="monotone"
          dataKey="conversionRate"
          stroke="var(--chart-4)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--chart-4)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
