import type { Metadata } from "next";
import InsightsPage from "@/components/InsightsPage";

export const metadata: Metadata = {
  title: "Executive Insights - Pulse Analytics",
  description: "C-level executive insights: revenue by tier, growth rates, unit economics, conversion funnel, and revenue forecasting.",
};

export default function Insights() {
  return <InsightsPage />;
}
