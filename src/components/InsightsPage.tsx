"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ChartCard from "./ChartCard";
import { insightsData } from "@/lib/insights";
import TierRevenueChart from "./insights/TierRevenueChart";
import GrowthRatesChart from "./insights/GrowthRatesChart";
import ConversionChart from "./insights/ConversionChart";
import ForecastChart from "./insights/ForecastChart";
import UnitEconomicsCards from "./insights/UnitEconomicsCards";
import SummaryTable from "./insights/SummaryTable";

export default function InsightsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const { tierRevenue, growthRates, conversionRates, unitEconomics, forecast, summaryTable } = insightsData;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)] tracking-tight">Executive Insights</h2>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            Strategic metrics and projections for leadership decision-making
          </p>
        </div>

        <UnitEconomicsCards data={unitEconomics} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Revenue by Tier" subtitle="Pro ($29/seat) vs Enterprise ($99/seat) contribution" loading={loading}>
            <TierRevenueChart data={tierRevenue} />
          </ChartCard>
          <ChartCard title="MoM Growth Rates" subtitle="Revenue and user growth percentage month-over-month" loading={loading}>
            <GrowthRatesChart data={growthRates} />
          </ChartCard>
          <ChartCard title="Revenue Forecast" subtitle="3-month projection based on recent growth trends" loading={loading}>
            <ForecastChart data={forecast} />
          </ChartCard>
          <ChartCard title="Free-to-Paid Conversion" subtitle="Conversion rate trending over time" loading={loading}>
            <ConversionChart data={conversionRates} />
          </ChartCard>
        </div>

        <ChartCard title="Executive Summary" subtitle="Complete month-by-month breakdown of all key metrics" loading={loading}>
          <SummaryTable data={summaryTable} />
        </ChartCard>

        <footer className="text-center text-xs text-[var(--muted-light)] py-4">
          Pulse Analytics Dashboard &middot; Built with Next.js &amp; Recharts
        </footer>
      </main>
    </div>
  );
}
