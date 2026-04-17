import SiteShell from "@/components/SiteShell";
import TimelinePageClient from "@/components/Timeline";
import friendsData from "@/data/friends.json";

function buildSeedTimelineEntries(friends) {
  return friends
    .flatMap((friend) =>
      (friend.interactions ?? []).map((interaction) => ({
        id: interaction.id,
        type: interaction.type,
        date: interaction.date,
        title: `${interaction.type} with ${friend.name}`,
        friendName: friend.name,
        friendSlug: friend.slug,
        source: "seed",
      })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const metadata = {
  title: "Timeline | KeenKeeper",
  description: "Review your check-in history with friends.",
};

export default function TimelinePage() {
  const seedEntries = buildSeedTimelineEntries(friendsData);

  return (
    <SiteShell>
      <TimelinePageClient seedEntries={seedEntries} />
    </SiteShell>
  );
}
