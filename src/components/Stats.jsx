"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CHART_COLORS = {
  Call: "#285848",
  Text: "#7c3aed",
  Video: "#39a864",
};

const STORAGE_KEY = "keenkeeper.timeline";

function InteractionPieChart({ entries }) {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 text-sm mb-4">
        {entries.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: CHART_COLORS[entry.name] }} />
            <span className="font-medium" style={{ color: CHART_COLORS[entry.name] }}>{entry.name}</span>
            <span className="font-bold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={entries}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={6}
              cornerRadius={8}
            >
              {entries.map((entry) => (
                <Cell key={entry.name} fill={CHART_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function useStoredTimelineEntries() {
  const [entries] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });
  return entries;
}

function mergeTimelineEntries(seedEntries, clientEntries) {
  const merged = [...seedEntries, ...clientEntries];
  const deduped = new Map(merged.map((entry) => [entry.id, entry]));
  return [...deduped.values()].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getInteractionCounts(entries) {
  return entries.reduce((totals, entry) => {
    totals[entry.type] += 1;
    return totals;
  }, { Call: 0, Text: 0, Video: 0 });
}

export default function StatsPageClient({ seedEntries }) {
  const storedEntries = useStoredTimelineEntries();

  const mergedEntries = useMemo(
    () => mergeTimelineEntries(seedEntries, storedEntries),
    [seedEntries, storedEntries]
  );

  const counts = getInteractionCounts(mergedEntries);
  const chartData = [
    { name: "Call", value: counts.Call },
    { name: "Text", value: counts.Text },
    { name: "Video", value: counts.Video },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Friendship Analytics</h1>
      </div>
      <article className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <h2 className="text-lg font-semibold text-[#0b4c5f] mb-3">By Interaction Type</h2>
        <InteractionPieChart entries={chartData} />
      </article>
    </section>
  );
}