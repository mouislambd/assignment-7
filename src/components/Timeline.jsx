"use client";

import { useMemo, useState } from "react";
import { CallIcon, TextIcon, VideoIcon } from "@/components/ui/Icons";

const iconMap = {
  Call: CallIcon,
  Text: TextIcon,
  Video: VideoIcon,
};

const STORAGE_KEY = "keenkeeper.timeline";

function formatTimelineDate(dateString) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

function TimelineEntryCard({ entry }) {
  const Icon = iconMap[entry.type];

  return (
    <article className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="shrink-0 text-slate-600">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight text-slate-800">{entry.title}</p>
        <div className="mt-0.5 text-xs text-slate-500">
          <span>{formatTimelineDate(entry.date)}</span>
        </div>
      </div>
    </article>
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

export default function TimelinePageClient({ seedEntries }) {
  const storedEntries = useStoredTimelineEntries();
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState("");

  const entries = useMemo(() => mergeTimelineEntries(seedEntries, storedEntries), [seedEntries, storedEntries]);

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => (filter === "All" ? true : entry.type === filter))
      .filter((entry) => 
        search === "" || 
        entry.title?.toLowerCase().includes(search.toLowerCase()) ||
        entry.friendName?.toLowerCase().includes(search.toLowerCase()) ||
        entry.type?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [entries, filter, sortOrder, search]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Timeline</h1>
      </div>

      <div className="grid gap-3 lg:grid-cols-[140px_1fr_140px]">
        <select className="select select-bordered rounded-lg bg-white border border-slate-300 text-slate-700 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Call</option>
          <option>Text</option>
          <option>Video</option>
        </select>
        
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search by friend name or interaction type..." 
          className="input input-bordered rounded-lg bg-white border border-slate-300 text-sm"
        />
        
        <select className="select select-bordered rounded-lg bg-white border border-slate-300 text-slate-700 text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredEntries.map((entry) => (
          <TimelineEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}