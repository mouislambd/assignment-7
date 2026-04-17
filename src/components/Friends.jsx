"use client";

import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import StatusBadge from "@/components/ui/StatusBadge";
import { CallIcon, TextIcon, VideoIcon, ArchiveIcon, DeleteIcon, SnoozeIcon } from "@/components/ui/Icons";

const checkInButtons = [
  { type: "Call", Icon: CallIcon },
  { type: "Text", Icon: TextIcon },
  { type: "Video", Icon: VideoIcon },
];

const STORAGE_KEY = "keenkeeper.timeline";
const STORAGE_EVENT = "keenkeeper-timeline-updated";

function getStoredTimelineEntries() {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function saveTimelineEntry(entry) {
  const entries = getStoredTimelineEntries();
  const nextEntries = [entry, ...entries];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function createTimelineEntry(type, friend) {
  return {
    id: `${friend.slug}-${type.toLowerCase()}-${Date.now()}`,
    type,
    date: new Date().toISOString(),
    title: `${type} with ${friend.name}`,
    friendName: friend.name,
    friendSlug: friend.slug,
    source: "client",
  };
}

function formatDisplayDate(dateString) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(dateString));
}

function StatCard({ value, label }) {
  return (
    <article className="rounded-[12px] border border-slate-200 bg-white px-3 py-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <p className="text-2xl font-bold text-[#0c4e5e]">{value}</p>
      <p className="mt-1 text-xs text-[#5e7394]">{label}</p>
    </article>
  );
}

function FriendStatsCards({ friend }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <StatCard value={friend.days_since_contact} label="Days Since Contact" />
      <StatCard value={friend.goal} label="Goal (Days)" />
      <StatCard value={formatDisplayDate(friend.next_due_date)} label="Next Due" />
    </div>
  );
}

function FriendInfoCard({ friend }) {
  const hasPicture = friend.picture && friend.picture.length > 0;
  
  return (
    <article className="rounded-[16px] border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      {hasPicture ? (
        <img 
          src={friend.picture} 
          alt={friend.name}
          className="mx-auto w-24 h-24 rounded-full object-cover" 
        />
      ) : (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#244D3F] text-white text-2xl font-bold">
          {friend.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
        </div>
      )}
      <h1 className="mt-4 text-2xl font-bold text-slate-950">{friend.name}</h1>
      <StatusBadge status={friend.status} className="mt-3" />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {friend.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm italic leading-6 text-[#5e7394]">{friend.bio}</p>
      <p className="mt-4 text-sm text-[#496a9d]">{friend.email}</p>
    </article>
  );
}

function ActionButton({ children, icon }) {
  return (
    <button type="button" className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
      {icon}
      <span>{children}</span>
    </button>
  );
}

function DangerButton({ children, icon }) {
  return (
    <button type="button" className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-red-300 bg-white text-red-600 font-medium text-sm hover:bg-red-50 transition-colors">
      {icon}
      <span>{children}</span>
    </button>
  );
}

function FriendActionButtons() {
  return (
    <div className="mt-3 space-y-2">
      <ActionButton icon={<SnoozeIcon className="h-4 w-4" />}>Snooze 2 Weeks</ActionButton>
      <ActionButton icon={<ArchiveIcon className="h-4 w-4" />}>Archive</ActionButton>
      <DangerButton icon={<DeleteIcon className="h-4 w-4" />}>Delete</DangerButton>
    </div>
  );
}

function RelationshipGoalCard({ friend }) {
  return (
    <article className="rounded-[12px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#0b4c5f]">Relationship Goal</h2>
          <p className="mt-1 text-sm text-slate-900">
            Connect every <span className="font-semibold">{friend.goal} days</span>
          </p>
        </div>
        <button type="button" className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors">
          Edit
        </button>
      </div>
    </article>
  );
}

function QuickCheckInCard({ friend }) {
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = window.setTimeout(() => setToastMessage(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  function handleCheckIn(type) {
    const entry = createTimelineEntry(type, friend);
    saveTimelineEntry(entry);
    setToastMessage(`${type} with ${friend.name}!`);
  }

  return (
    <>
      <article className="rounded-[12px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <h2 className="text-base font-semibold text-[#0b4c5f]">Quick Check-In</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {checkInButtons.map(({ type, Icon }) => (
            <button key={type} type="button" onClick={() => handleCheckIn(type)} className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
              <Icon className="h-4 w-4" />
              <span>{type}</span>
            </button>
          ))}
        </div>
      </article>
      <Toast message={toastMessage} />
    </>
  );
}

export function FriendDetailView({ friend }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
      <div>
        <FriendInfoCard friend={friend} />
        <FriendActionButtons />
      </div>
      <div className="space-y-5">
        <FriendStatsCards friend={friend} />
        <RelationshipGoalCard friend={friend} />
        <QuickCheckInCard friend={friend} />
      </div>
    </section>
  );
}