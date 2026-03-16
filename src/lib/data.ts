export type MonthlyMetric = {
  month: string;
  label: string;
  revenue: number;
  signups: number;
  churnRate: number;
  activeUsers: number;
  free: number;
  pro: number;
  enterprise: number;
};

export type TierKey = "free" | "pro" | "enterprise";

export const TIER_COLORS: Record<TierKey, string> = {
  free: "#06b6d4",
  pro: "#6366f1",
  enterprise: "#f59e0b",
};

export const TIERS: TierKey[] = ["free", "pro", "enterprise"];

export const monthlyData: MonthlyMetric[] = [
  {
    month: "2025-04",
    label: "Apr 2025",
    revenue: 42500,
    signups: 320,
    churnRate: 4.8,
    activeUsers: 2150,
    free: 1280,
    pro: 645,
    enterprise: 225,
  },
  {
    month: "2025-05",
    label: "May 2025",
    revenue: 46200,
    signups: 385,
    churnRate: 4.5,
    activeUsers: 2380,
    free: 1390,
    pro: 720,
    enterprise: 270,
  },
  {
    month: "2025-06",
    label: "Jun 2025",
    revenue: 48900,
    signups: 410,
    churnRate: 4.2,
    activeUsers: 2590,
    free: 1480,
    pro: 805,
    enterprise: 305,
  },
  {
    month: "2025-07",
    label: "Jul 2025",
    revenue: 51300,
    signups: 375,
    churnRate: 3.9,
    activeUsers: 2740,
    free: 1520,
    pro: 870,
    enterprise: 350,
  },
  {
    month: "2025-08",
    label: "Aug 2025",
    revenue: 54800,
    signups: 445,
    churnRate: 3.7,
    activeUsers: 2950,
    free: 1590,
    pro: 960,
    enterprise: 400,
  },
  {
    month: "2025-09",
    label: "Sep 2025",
    revenue: 58100,
    signups: 490,
    churnRate: 3.5,
    activeUsers: 3180,
    free: 1680,
    pro: 1050,
    enterprise: 450,
  },
  {
    month: "2025-10",
    label: "Oct 2025",
    revenue: 62400,
    signups: 530,
    churnRate: 3.3,
    activeUsers: 3440,
    free: 1750,
    pro: 1180,
    enterprise: 510,
  },
  {
    month: "2025-11",
    label: "Nov 2025",
    revenue: 67200,
    signups: 580,
    churnRate: 3.1,
    activeUsers: 3720,
    free: 1840,
    pro: 1310,
    enterprise: 570,
  },
  {
    month: "2025-12",
    label: "Dec 2025",
    revenue: 71500,
    signups: 520,
    churnRate: 3.4,
    activeUsers: 3910,
    free: 1890,
    pro: 1400,
    enterprise: 620,
  },
  {
    month: "2026-01",
    label: "Jan 2026",
    revenue: 76800,
    signups: 615,
    churnRate: 2.9,
    activeUsers: 4220,
    free: 1960,
    pro: 1520,
    enterprise: 740,
  },
  {
    month: "2026-02",
    label: "Feb 2026",
    revenue: 82100,
    signups: 670,
    churnRate: 2.7,
    activeUsers: 4560,
    free: 2050,
    pro: 1650,
    enterprise: 860,
  },
  {
    month: "2026-03",
    label: "Mar 2026",
    revenue: 88400,
    signups: 720,
    churnRate: 2.5,
    activeUsers: 4920,
    free: 2130,
    pro: 1790,
    enterprise: 1000,
  },
];

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
      const filteredRevenue = tiers.reduce((sum, tier) => {
        const tierUsers = d[tier];
        const totalPaidUsers = d.pro + d.enterprise;
        if (tier === "free") return sum;
        return sum + (d.revenue * tierUsers) / (totalPaidUsers || 1);
      }, 0);
      return {
        ...d,
        revenue: tiers.includes("pro") && tiers.includes("enterprise")
          ? d.revenue
          : Math.round(filteredRevenue),
        free: tiers.includes("free") ? d.free : 0,
        pro: tiers.includes("pro") ? d.pro : 0,
        enterprise: tiers.includes("enterprise") ? d.enterprise : 0,
      };
    });
}

export function computeKPIs(data: MonthlyMetric[]) {
  const latest = data[data.length - 1];
  const previous = data.length > 1 ? data[data.length - 2] : null;

  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalSignups = data.reduce((s, d) => s + d.signups, 0);
  const avgChurn =
    data.reduce((s, d) => s + d.churnRate, 0) / (data.length || 1);

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
