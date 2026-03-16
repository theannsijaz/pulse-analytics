import { monthlyData, type MonthlyMetric } from "./data";

const PRO_PRICE = 29;
const ENTERPRISE_PRICE = 99;
const SIMULATED_CAC = 45;

export type TierRevenue = {
  label: string;
  month: string;
  proRevenue: number;
  enterpriseRevenue: number;
  totalRevenue: number;
};

export type GrowthRate = {
  label: string;
  month: string;
  revenueGrowth: number;
  userGrowth: number;
};

export type ForecastPoint = {
  label: string;
  month: string;
  revenue: number;
  projected: boolean;
};

export type UnitEconomics = {
  arpu: number;
  estimatedLTV: number;
  cac: number;
  ltvCacRatio: number;
  paybackMonths: number;
  grossMargin: number;
};

export function computeTierRevenue(data: MonthlyMetric[]): TierRevenue[] {
  return data.map((d) => ({
    label: d.label,
    month: d.month,
    proRevenue: d.pro * PRO_PRICE,
    enterpriseRevenue: d.enterprise * ENTERPRISE_PRICE,
    totalRevenue: d.revenue,
  }));
}

export function computeGrowthRates(data: MonthlyMetric[]): GrowthRate[] {
  return data.slice(1).map((d, i) => {
    const prev = data[i];
    return {
      label: d.label,
      month: d.month,
      revenueGrowth: Math.round(((d.revenue - prev.revenue) / prev.revenue) * 1000) / 10,
      userGrowth: Math.round(((d.activeUsers - prev.activeUsers) / prev.activeUsers) * 1000) / 10,
    };
  });
}

export function computeConversionRates(data: MonthlyMetric[]) {
  return data.map((d) => ({
    label: d.label,
    month: d.month,
    conversionRate: d.conversionRate,
    paidUsers: d.pro + d.enterprise,
    freeUsers: d.free,
  }));
}

export function computeUnitEconomics(data: MonthlyMetric[]): UnitEconomics {
  const latest = data[data.length - 1];
  const avgChurn = data.reduce((s, d) => s + d.churnRate, 0) / data.length;
  const avgLifespanMonths = 100 / avgChurn;
  const estimatedLTV = Math.round(latest.arpu * avgLifespanMonths);

  return {
    arpu: latest.arpu,
    estimatedLTV,
    cac: SIMULATED_CAC,
    ltvCacRatio: Math.round((estimatedLTV / SIMULATED_CAC) * 10) / 10,
    paybackMonths: Math.round((SIMULATED_CAC / latest.arpu) * 10) / 10,
    grossMargin: 82,
  };
}

export function computeForecast(data: MonthlyMetric[]): ForecastPoint[] {
  const historical: ForecastPoint[] = data.map((d) => ({
    label: d.label,
    month: d.month,
    revenue: d.revenue,
    projected: false,
  }));

  const recent = data.slice(-3);
  const avgGrowthRate =
    recent.slice(1).reduce((sum, d, i) => {
      const prev = recent[i];
      return sum + (d.revenue - prev.revenue) / prev.revenue;
    }, 0) / (recent.length - 1);

  const forecastMonths = ["2026-04", "2026-05", "2026-06"];
  const forecastLabels = ["Apr 2026", "May 2026", "Jun 2026"];
  let lastRevenue = data[data.length - 1].revenue;

  const projections: ForecastPoint[] = forecastMonths.map((month, i) => {
    lastRevenue = Math.round(lastRevenue * (1 + avgGrowthRate));
    return {
      label: forecastLabels[i],
      month,
      revenue: lastRevenue,
      projected: true,
    };
  });

  return [...historical, ...projections];
}

export function getExecutiveSummaryTable(data: MonthlyMetric[]) {
  return data.map((d, i) => {
    const prev = i > 0 ? data[i - 1] : null;
    const revenueGrowth = prev
      ? Math.round(((d.revenue - prev.revenue) / prev.revenue) * 1000) / 10
      : 0;
    return {
      ...d,
      proRevenue: d.pro * PRO_PRICE,
      enterpriseRevenue: d.enterprise * ENTERPRISE_PRICE,
      revenueGrowth,
      arr: d.revenue * 12,
    };
  });
}

export const insightsData = {
  tierRevenue: computeTierRevenue(monthlyData),
  growthRates: computeGrowthRates(monthlyData),
  conversionRates: computeConversionRates(monthlyData),
  unitEconomics: computeUnitEconomics(monthlyData),
  forecast: computeForecast(monthlyData),
  summaryTable: getExecutiveSummaryTable(monthlyData),
};
