"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/insights", label: "Executive Insights" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--card-border)] bg-[var(--card-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-lg font-bold text-[var(--foreground)] tracking-tight">Pulse</span>
            </Link>
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-[var(--accent-bg)] text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] inline-block" />
            Live data
          </div>
        </div>
      </div>
    </header>
  );
}
