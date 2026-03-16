"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import type { ForecastPoint } from "@/lib/insights";
import EmptyState from "../EmptyState";

interface ForecastChartProps {
  data: ForecastPoint[];
}

function formatCurrency(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}

export default function ForecastChart({ data }: ForecastChartProps) {
  if (!data.length) return <EmptyState />;

  const lastHistorical = data.filter((d) => !d.projected).pop();
  const chartData = data.map((d) => ({
    ...d,
    actual: d.projected ? undefined : d.revenue,
    forecast: d.projected || d.month === lastHistorical?.month ? d.revenue : undefined,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0} />
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
        {lastHistorical && (
          <ReferenceLine
            x={lastHistorical.label}
            stroke="var(--muted-light)"
            strokeDasharray="3 3"
            label={{ value: "Today", fill: "var(--muted)", fontSize: 10, position: "top" }}
          />
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "12px",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(value, name) => {
            if (value === undefined) return ["", ""];
            const label = name === "actual" ? "Actual MRR" : "Projected MRR";
            return [`$${Number(value).toLocaleString()}`, label];
          }}
        />
        <Legend
          verticalAlign="top"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", color: "var(--muted)", paddingBottom: "8px" }}
          formatter={(value) => (value === "actual" ? "Actual" : "Forecast")}
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="var(--chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          connectNulls={false}
        />
        <Area
          type="monotone"
          dataKey="forecast"
          stroke="var(--chart-4)"
          strokeWidth={2}
          strokeDasharray="6 3"
          fill="url(#forecastGrad)"
          dot={{ r: 3, fill: "var(--chart-4)", strokeWidth: 2, stroke: "var(--card-bg)" }}
          connectNulls={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
