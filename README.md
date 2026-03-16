# Pulse Analytics - SaaS Metrics Dashboard

A professional SaaS metrics dashboard built with Next.js, Recharts, and Tailwind CSS. Features interactive data visualizations, real-time filtering, executive-level insights, and revenue forecasting, all powered by realistic, mathematically interconnected mock data.

## Features

### Dashboard (`/`)
- **4 KPI Summary Cards** - Monthly Revenue, Active Users, Total Signups, Avg Churn Rate with month-over-month change indicators
- **Revenue Trend** - Composed chart showing MRR line with ARPU on a secondary axis
- **User Growth** - Signups vs churned users bar chart with net new users trend line
- **Subscription Breakdown** - Donut chart showing Free / Pro / Enterprise distribution
- **Churn Analysis** - Area chart for churn rate overlaid with churned user count bars
- **Interactive Filtering** - Date range selection (From/To month) and subscription tier toggles that reactively update all charts and KPIs

### Executive Insights (`/insights`)
- **Unit Economics Cards** - LTV, CAC, LTV/CAC ratio, Payback Period, ARPU, Gross Margin with benchmark indicators
- **Revenue by Tier** - Stacked area chart showing Pro ($29/seat) vs Enterprise ($99/seat) revenue contribution
- **MoM Growth Rates** - Revenue growth and user growth percentage trends
- **Revenue Forecast** - 3-month projection based on trailing growth rates with a clear actual vs projected split
- **Free-to-Paid Conversion** - Conversion rate trending over time with paid vs free user breakdown
- **Executive Summary Table** - Complete month-by-month breakdown of all key metrics (MRR, ARR, growth, users, signups, churn, tiers, ARPU, conversion)

### Quality
- **Loading States** - Shimmer skeleton animations on all KPI cards and chart containers during initial load
- **Error Handling** - Per-chart error boundaries (one chart failing does not crash the dashboard) plus a top-level dashboard error boundary with recovery
- **Empty States** - Descriptive messages when filters produce no matching data
- **Responsive Design** - Adaptive grid layout (1 col mobile, 2 col tablet, 4 col KPI row on desktop)

## Data Model

All mock data is generated from seed values with fully verifiable relationships:

| Relationship | Formula |
|---|---|
| Active Users | `activeUsers[n] = activeUsers[n-1] + signups - churned` |
| Churned | `churned = round(prevActiveUsers * churnRate / 100)` |
| Revenue | `revenue = (pro * $29) + (enterprise * $99)` |
| Tier Sum | `free + pro + enterprise = activeUsers` (exact) |
| ARPU | `revenue / activeUsers` |
| Conversion Rate | `(pro + enterprise) / activeUsers * 100` |

12 months of data (Apr 2025 - Mar 2026) with declining churn, growing enterprise share, and increasing ARPU telling a realistic SaaS growth story.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Charts:** Recharts
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel

## Project Structure

```
src/
  app/
    layout.tsx                  Global layout with fonts and metadata
    page.tsx                    Dashboard page
    globals.css                 Design tokens and Tailwind config
    insights/
      page.tsx                  Executive Insights page
  components/
    Dashboard.tsx               Main dashboard with filters, KPIs, charts
    InsightsPage.tsx             Executive insights page layout
    Navbar.tsx                  Shared navigation between pages
    FilterBar.tsx               Date range and tier filter controls
    KPICard.tsx                 Summary stat card with loading skeleton
    ChartCard.tsx               Chart wrapper with skeleton and error boundary
    EmptyState.tsx              Empty data state component
    RevenueChart.tsx            MRR + ARPU composed chart
    UserGrowthChart.tsx         Signups, churned, net new composed chart
    SubscriptionChart.tsx       Tier distribution donut chart
    ChurnChart.tsx              Churn rate area + churned count bars
    insights/
      index.ts                  Barrel exports
      TierRevenueChart.tsx      Pro vs Enterprise stacked area
      GrowthRatesChart.tsx      MoM growth rate lines
      ForecastChart.tsx         Revenue projection chart
      ConversionChart.tsx       Free-to-paid conversion trend
      UnitEconomicsCards.tsx    LTV, CAC, ratio metric cards
      SummaryTable.tsx          Full metrics breakdown table
  lib/
    data.ts                     Mock data generator, types, filter/KPI utils
    insights.ts                 Executive metrics computation functions
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Build

```bash
npm run build
npm start
```

No environment variables are required. The entire application runs on embedded mock data with zero external dependencies.
