"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, Clock, BarChart3, Phone, MessageCircle, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

const TABS = {
  home: "home",
  timeline: "timeline",
  stats: "stats",
};

const INTERACTION_COLORS = {
  Call: "#285848",
  Text: "#7c3aed",
  Video: "#39a864",
};

const TAB_LABELS = {
  [TABS.home]: "Home",
  [TABS.timeline]: "Timeline",
  [TABS.stats]: "Stats",
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildTimelineEntries(friends) {
  return friends
    .flatMap((friend) =>
      friend.interactions.map((interaction) => ({
        ...interaction,
        friendId: friend.id,
        friendName: friend.name,
      })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getInteractionTotals(entries) {
  return entries.reduce(
    (totals, entry) => {
      totals[entry.type] += 1;
      return totals;
    },
    { Call: 0, Text: 0, Video: 0 },
  );
}

function IconHome() {
  return <Home className="h-4 w-4" />;
}

function IconClock() {
  return <Clock className="h-4 w-4" />;
}

function IconChart() {
  return <BarChart3 className="h-4 w-4" />;
}

function InteractionIcon({ type }) {
  if (type === "Video") {
    return <Video className="h-12 w-12 text-slate-700" />;
  }

  if (type === "Call") {
    return <Phone className="h-12 w-12 text-slate-700" />;
  }

  return <MessageCircle className="h-12 w-12 text-slate-700" />;
}

function SocialIcon({ label }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-900 shadow-sm">
      {label}
    </span>
  );
}

function StatDonut({ totals }) {
  const items = Object.entries(totals);
  const totalCount = items.reduce((sum, [, count]) => sum + count, 0);
  const radius = 76;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  let offsetTracker = 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4">
      <svg viewBox="0 0 220 220" className="h-[320px] w-[320px] max-w-full -rotate-90">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#edf2f7"
          strokeWidth={strokeWidth}
        />
        {items.map(([type, count]) => {
          const segmentLength = totalCount ? (count / totalCount) * circumference : 0;
          const circle = (
            <circle
              key={type}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={INTERACTION_COLORS[type]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${Math.max(segmentLength - 8, 0)} ${circumference}`}
              strokeDashoffset={-offsetTracker}
            />
          );

          offsetTracker += segmentLength;
          return circle;
        })}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xl">
        {items.map(([type]) => (
          <div key={type} className="flex items-center gap-2 text-[1.05rem] text-slate-700">
            <span
              className="h-3.5 w-3.5 rounded-[2px]"
              style={{ backgroundColor: INTERACTION_COLORS[type] }}
            />
            <span style={{ color: INTERACTION_COLORS[type] }}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomeSection({ friends }) {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-950">Friendship Directory</h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Keep track of the people who matter most with a warm snapshot of your recent
          connections.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {friends.map((friend) => (
          <article
            key={friend.id}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#285848] text-base font-bold text-white">
                {friend.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-slate-900">{friend.name}</h2>
                <p className="text-sm text-slate-500">{friend.occupation}</p>
                <p className="mt-1 text-sm text-slate-500">{friend.location}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{friend.favoriteMemory}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">{friend.email}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">{friend.phone}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ entries, filter, onFilterChange }) {
  const filteredEntries =
    filter === "All" ? entries : entries.filter((entry) => entry.type === filter);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-[3.15rem] font-bold tracking-tight text-slate-950">Timeline</h1>
      </div>

      <div className="max-w-sm">
        <select
          className="select w-full rounded-xl border-slate-300 bg-white text-base text-slate-900"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option>All</option>
          <option>Call</option>
          <option>Text</option>
          <option>Video</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <article
            key={entry.id}
            className="flex items-center gap-4 rounded-[18px] border border-slate-200 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <div className="shrink-0">
              <InteractionIcon type={entry.type} />
            </div>
            <div>
              <p className="text-[2rem] leading-none">
                <span className="font-bold text-[#0b4c5f]">{entry.type}</span>{" "}
                <span className="text-[#496a9d]">with {entry.friendName}</span>
              </p>
              <p className="mt-2 text-[1.65rem] text-[#496a9d]">{formatDate(entry.date)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsSection({ totals }) {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-950">Friendship Analytics</h1>
      </div>

      <article className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <h2 className="text-[1.7rem] font-semibold text-[#0b4c5f]">By Interaction Type</h2>
        <StatDonut totals={totals} />
      </article>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-[#285848] text-white">
      <div className="mx-auto max-w-[1920px] px-10 py-16 text-center">
        <h2 className="text-7xl font-bold tracking-tight">KeenKeeper</h2>
        <p className="mx-auto mt-6 max-w-4xl text-lg text-white/95">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the
          relationships that matter most.
        </p>

        <div className="mt-8">
          <h3 className="text-3xl font-semibold">Social Links</h3>
          <div className="mt-5 flex items-center justify-center gap-4">
            <SocialIcon label="◉" />
            <SocialIcon label="IG" />
            <SocialIcon label="FB" />
            <SocialIcon label="X" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#39a864] pt-6 text-left text-base font-medium sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 sm:justify-end">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function KeenKeeperApp() {
  const [activeTab, setActiveTab] = useState(TABS.home);
  const [filter, setFilter] = useState("All");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadFriends() {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();

        if (isMounted) {
          setFriends(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFriends();

    return () => {
      isMounted = false;
    };
  }, []);

  const timelineEntries = useMemo(() => buildTimelineEntries(friends), [friends]);
  const totals = useMemo(() => getInteractionTotals(timelineEntries), [timelineEntries]);

  return (
    <div className="min-h-screen bg-[#f8fafb] text-slate-900">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} tabs={TAB_LABELS} />

      <main className="mx-auto w-full max-w-[1220px] px-6 pb-0 pt-8 sm:px-10 lg:px-12">
        {loading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-lg shadow-sm">
            Loading friendships...
          </div>
        ) : null}

        {!loading && activeTab === TABS.home ? <HomeSection friends={friends} /> : null}
        {!loading && activeTab === TABS.timeline ? (
          <TimelineSection entries={timelineEntries} filter={filter} onFilterChange={setFilter} />
        ) : null}
        {!loading && activeTab === TABS.stats ? <StatsSection totals={totals} /> : null}
      </main>

      <Footer />
    </div>
  );
}
