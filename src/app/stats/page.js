import SiteShell from "@/components/SiteShell";
import StatsPageClient from "@/components/Stats";
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
  title: "Stats | KeenKeeper",
  description: "Friendship analytics and interaction breakdowns.",
};

export default function StatsPage() {
  const seedEntries = buildSeedTimelineEntries(friendsData);

  return (
    <SiteShell>
      <StatsPageClient seedEntries={seedEntries} />
    </SiteShell>
  );
}
