"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { PublicStats } from '@/lib/types';

export function LandingStats() {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get<PublicStats>('/stats/public');
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="surface-card p-6 animate-pulse h-[5.5rem] bg-stone-50/80" />
        ))}
      </div>
    );
  }

  const inProgress = (stats.submitted || 0) + (stats.acknowledged || 0);

  const cards = [
    {
      label: 'Reports Filed',
      value: stats.total_complaints,
      subtitle: 'Citizen civic submissions',
      badge: 'Total',
      badgeColor: 'bg-stone-100 text-stone-700',
    },
    {
      label: 'Resolved Issues',
      value: stats.resolved,
      subtitle: 'Verified municipal fixes',
      badge: 'Completed',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    },
    {
      label: 'Active Dispatches',
      value: inProgress,
      subtitle: 'Routed to PHE / MCM / MDA',
      badge: 'In Progress',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200',
    },
    {
      label: 'Auto-Escalated',
      value: stats.escalated,
      subtitle: 'Stagnant >72h SLA audits',
      badge: 'Accountability',
      badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {cards.map((c) => (
        <div key={c.label} className="surface-card-interactive p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="label-caps !text-[10px] truncate">{c.label}</p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${c.badgeColor}`}>
              {c.badge}
            </span>
          </div>
          <p className="mt-3 text-[1.875rem] sm:text-[2.125rem] font-bold tabular-nums text-[var(--app-navy)] tracking-tight">
            {c.value}
          </p>
          <p className="mt-1 text-xs text-stone-500">{c.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
