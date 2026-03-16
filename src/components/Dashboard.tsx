"use client";

import { useState, useMemo, useEffect } from "react";
import { monthlyData, getFilteredData, computeKPIs, TIERS } from "@/lib/data";
import type { TierKey } from "@/lib/data";
import FilterBar from "./FilterBar";
import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import RevenueChart from "./RevenueChart";
import UserGrowthChart from "./UserGrowthChart";
import SubscriptionChart from "./SubscriptionChart";
import ChurnChart from "./ChurnChart";

export default function Dashboard() {
  const [startMonth, setStartMonth] = useState(monthlyData[0].month);
  const [endMonth, setEndMonth] = useState(monthlyData[monthlyData.length - 1].month);
  const [activeTiers, setActiveTiers] = useState<TierKey[]>([...TIERS]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(
    () => getFilteredData(monthlyData, startMonth, endMonth, activeTiers),
    [startMonth, endMonth, activeTiers]
  );

  const kpis = useMemo(() => computeKPIs(filteredData), [filteredData]);

  const handleTierToggle = (tier: TierKey) => {
    setActiveTiers((prev) => {
      if (prev.includes(tier)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== tier);
      }
      return [...prev, tier];
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)] tracking-tight flex items-center gap-2">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Pulse Analytics
              </h1>
              <p className="text-sm text-[var(--muted)] mt-0.5">SaaS performance metrics at a glance</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] inline-block" />
              Live data
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <FilterBar
          months={monthlyData}
          startMonth={startMonth}
          endMonth={endMonth}
          activeTiers={activeTiers}
          onStartMonthChange={setStartMonth}
          onEndMonthChange={setEndMonth}
          onTierToggle={handleTierToggle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Monthly Revenue"
            value={`$${kpis.mrr.toLocaleString()}`}
            change={kpis.mrrChange}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
          />
          <KPICard
            title="Active Users"
            value={kpis.activeUsers.toLocaleString()}
            change={kpis.activeUsersChange}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <KPICard
            title="Total Signups"
            value={kpis.totalSignups.toLocaleString()}
            change={kpis.activeUsersChange}
            changeLabel="user growth"
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
          />
          <KPICard
            title="Avg Churn Rate"
            value={`${kpis.avgChurn}%`}
            change={kpis.churnChange}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Revenue Trend" subtitle="Monthly recurring revenue" loading={loading}>
            <RevenueChart data={filteredData} />
          </ChartCard>
          <ChartCard title="User Growth" subtitle="New signups per month" loading={loading}>
            <UserGrowthChart data={filteredData} />
          </ChartCard>
          <ChartCard title="Subscription Breakdown" subtitle="Distribution across tiers" loading={loading}>
            <SubscriptionChart data={filteredData} activeTiers={activeTiers} />
          </ChartCard>
          <ChartCard title="Churn Rate" subtitle="Monthly customer churn percentage" loading={loading}>
            <ChurnChart data={filteredData} />
          </ChartCard>
        </div>

        <footer className="text-center text-xs text-[var(--muted-light)] py-4">
          Pulse Analytics Dashboard &middot; Built with Next.js &amp; Recharts
        </footer>
      </main>
    </div>
  );
}
