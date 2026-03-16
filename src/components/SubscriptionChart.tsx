"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlyMetric, TierKey } from "@/lib/data";
import { TIER_COLORS } from "@/lib/data";
import EmptyState from "./EmptyState";

interface SubscriptionChartProps {
  data: MonthlyMetric[];
  activeTiers: TierKey[];
}

export default function SubscriptionChart({ data, activeTiers }: SubscriptionChartProps) {
  const latest = data[data.length - 1];
  if (!latest) return <EmptyState message="No subscription data for the selected range." />;

  const pieData = activeTiers.map((tier) => ({
    name: tier.charAt(0).toUpperCase() + tier.slice(1),
    value: latest[tier] as number,
    color: TIER_COLORS[tier],
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "12px",
            fontSize: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(value) => [Number(value).toLocaleString(), "Users"]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "12px", color: "var(--muted)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
