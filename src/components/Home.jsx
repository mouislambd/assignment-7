"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AddFriendIcon } from "@/components/ui/Icons";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatusBadge from "@/components/ui/StatusBadge";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SummaryCard({ value, label }) {
  return (
    <article className="rounded-[16px] border border-slate-200 bg-white px-2 py-3 sm:px-4 sm:py-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <p className="text-xl sm:text-2xl font-bold text-[#0c4e5e]">{value}</p>
      <p className="mt-1 text-xs sm:text-sm text-[#5e7394]">{label}</p>
    </article>
  );
}

function HomeBanner() {
  return (
    <section className="rounded-[24px] bg-[#f7fafb] px-4 py-8 text-center sm:px-6 sm:py-10">
      <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        Friends to keep close in your life
      </h1>
      <p className="mx-auto mt-3 max-w-4xl text-base text-[#5e7394] sm:text-lg">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>
      <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#244D3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3a2f]">
        <AddFriendIcon className="h-4 w-4" />
        <span>Add a Friend</span>
      </button>
    </section>
  );
}

function HomeSummaryCards({ summary }) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard value={summary.totalFriends} label="Total Friends" />
      <SummaryCard value={summary.onTrack} label="On Track" />
      <SummaryCard value={summary.needAttention} label="Need Attention" />
      <SummaryCard value={summary.interactionsThisMonth} label="Interactions" />
    </section>
  );
}

function FriendCard({ friend }) {
  const hasPicture = friend.picture && friend.picture.length > 0;
  
  return (
    <Link href={`/friends/${friend.slug}`} className="card bg-white shadow-md hover:-translate-y-1 transition-all">
      <figure className="pt-4 flex justify-center">
        {hasPicture ? (
          <img 
            src={friend.picture} 
            alt={friend.name}
            className="w-20 h-20 rounded-full object-cover" 
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-[#244D3F] text-white w-20 h-20 rounded-full">
              <span className="text-lg font-bold">{getInitials(friend.name)}</span>
            </div>
          </div>
        )}
      </figure>
      <div className="card-body items-center p-3">
        <h3 className="card-title text-base text-slate-900 text-center truncate max-w-full">{friend.name}</h3>
        <div className="flex flex-wrap gap-1 justify-center">
          {friend.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <StatusBadge status={friend.status} className="my-2 ml-25" />
        <p className="text-[#5e7394] text-sm ml-30">{friend.days_since_contact} days</p>
      </div>
    </Link>
  );
}

function FriendsGrid({ friends }) {
  return (
    <section className="mt-10 sm:mt-12 border-t border-slate-200 pt-8 sm:pt-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">Your Friends</h2>
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </section>
  );
}

function buildSummary(friends) {
  const entries = friends.flatMap((friend) => friend.interactions ?? []);
  const now = new Date();
  const interactionsThisMonth = entries.filter((entry) => {
    const date = new Date(entry.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }).length;

  return {
    totalFriends: friends.length,
    onTrack: friends.filter((friend) => friend.status === "on-track").length,
    needAttention: friends.filter((friend) => friend.status !== "on-track").length,
    interactionsThisMonth,
  };
}

export default function HomePageClient() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFriends() {
      try {
        const response = await fetch("/friends.json");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();

        if (!cancelled) {
          setFriends(data);
        }
      } catch (err) {
        console.error("Failed to load friends:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFriends();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner label="Fetching your friend list..." />;
  }

  const summary = buildSummary(friends);

  return (
    <>
      <HomeBanner />
      <HomeSummaryCards summary={summary} />
      <FriendsGrid friends={friends} />
    </>
  );
}