export type MonthlyMetric = {
  month: string;
  label: string;
  revenue: number;
  signups: number;
  churnRate: number;
  churned: number;
  activeUsers: number;
  free: number;
  pro: number;
  enterprise: number;
  arpu: number;
  netNewUsers: number;
  conversionRate: number;
};

export type TierKey = "free" | "pro" | "enterprise";

export const TIER_COLORS: Record<TierKey, string> = {
  free: "#06b6d4",
  pro: "#6366f1",
  enterprise: "#f59e0b",
};

export const TIERS: TierKey[] = ["free", "pro", "enterprise"];

const PRO_PRICE = 29;
const ENTERPRISE_PRICE = 99;

const MONTH_LABELS = [
  "Apr 2025", "May 2025", "Jun 2025", "Jul 2025",
  "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025",
  "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026",
];

const MONTH_KEYS = [
  "2025-04", "2025-05", "2025-06", "2025-07",
  "2025-08", "2025-09", "2025-10", "2025-11",
  "2025-12", "2026-01", "2026-02", "2026-03",
];

const SEED_SIGNUPS = [320, 385, 410, 375, 445, 490, 530, 580, 520, 615, 670, 720];
const SEED_CHURN_RATES = [4.8, 4.5, 4.2, 3.9, 3.7, 3.5, 3.3, 3.1, 3.4, 2.9, 2.7, 2.5];

const SEED_FREE_RATIO =      [0.595, 0.585, 0.572, 0.555, 0.540, 0.528, 0.508, 0.495, 0.483, 0.464, 0.450, 0.433];
const SEED_PRO_RATIO =        [0.300, 0.302, 0.310, 0.318, 0.325, 0.330, 0.343, 0.352, 0.358, 0.360, 0.362, 0.364];

function generateData(): MonthlyMetric[] {
  const data: MonthlyMetric[] = [];

  let activeUsers = 2150;
  let free = 1280;
  let pro = 645;
  let enterprise = 225;

  for (let i = 0; i < 12; i++) {
    const signups = SEED_SIGNUPS[i];
    const churnRate = SEED_CHURN_RATES[i];
    const churned = i === 0 ? 0 : Math.round(data[i - 1].activeUsers * (churnRate / 100));

    if (i > 0) {
      activeUsers = data[i - 1].activeUsers + signups - churned;
    }

    const freeRatio = SEED_FREE_RATIO[i];
    const proRatio = SEED_PRO_RATIO[i];
    const entRatio = 1 - freeRatio - proRatio;

    free = Math.round(activeUsers * freeRatio);
    pro = Math.round(activeUsers * proRatio);
    enterprise = activeUsers - free - pro;

    const revenue = (pro * PRO_PRICE) + (enterprise * ENTERPRISE_PRICE);
    const arpu = Math.round((revenue / activeUsers) * 100) / 100;
    const netNewUsers = signups - churned;
    const conversionRate = Math.round(((pro + enterprise) / activeUsers) * 1000) / 10;

    data.push({
      month: MONTH_KEYS[i],
      label: MONTH_LABELS[i],
      revenue,
      signups,
      churnRate,
      churned,
      activeUsers,
      free,
      pro,
      enterprise,
      arpu,
      netNewUsers,
      conversionRate,
    });
  }

  return data;
}

export const monthlyData: MonthlyMetric[] = generateData();

export function getFilteredData(
  data: MonthlyMetric[],
  startMonth: string,
  endMonth: string,
  tiers: TierKey[]
): MonthlyMetric[] {
  return data
    .filter((d) => d.month >= startMonth && d.month <= endMonth)
    .map((d) => {
      if (tiers.length === 3) return d;
      const filteredPro = tiers.includes("pro") ? d.pro : 0;
      const filteredEnt = tiers.includes("enterprise") ? d.enterprise : 0;
      const filteredRevenue = (filteredPro * PRO_PRICE) + (filteredEnt * ENTERPRISE_PRICE);
      return {
        ...d,
        revenue: filteredRevenue,
        free: tiers.includes("free") ? d.free : 0,
        pro: filteredPro,
        enterprise: filteredEnt,
      };
    });
}

export function computeKPIs(data: MonthlyMetric[]) {
  if (data.length === 0) {
    return {
      mrr: 0,
      mrrChange: 0,
      totalRevenue: 0,
      activeUsers: 0,
      activeUsersChange: 0,
      totalSignups: 0,
      avgChurn: 0,
      churnChange: 0,
      totalSubscribers: 0,
    };
  }

  const latest = data[data.length - 1];
  const previous = data.length > 1 ? data[data.length - 2] : null;

  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalSignups = data.reduce((s, d) => s + d.signups, 0);
  const avgChurn =
    data.reduce((s, d) => s + d.churnRate, 0) / data.length;

  const revenueChange = previous
    ? ((latest.revenue - previous.revenue) / previous.revenue) * 100
    : 0;
  const userChange = previous
    ? ((latest.activeUsers - previous.activeUsers) / previous.activeUsers) * 100
    : 0;

  return {
    mrr: latest.revenue,
    mrrChange: revenueChange,
    totalRevenue,
    activeUsers: latest.activeUsers,
    activeUsersChange: userChange,
    totalSignups,
    avgChurn: Math.round(avgChurn * 10) / 10,
    churnChange: previous ? latest.churnRate - previous.churnRate : 0,
    totalSubscribers: latest.free + latest.pro + latest.enterprise,
  };
}
