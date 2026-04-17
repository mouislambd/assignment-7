import { notFound } from "next/navigation";
import { FriendDetailView } from "@/components/Friends";
import SiteShell from "@/components/SiteShell";
import friendsData from "@/data/friends.json";

function getFriendBySlug(slug) {
  return friendsData.find((friend) => friend.slug === slug);
}

export async function generateStaticParams() {
  return friendsData.map((friend) => ({ slug: friend.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const friend = getFriendBySlug(slug);

  if (!friend) {
    return {
      title: "Friend Not Found | KeenKeeper",
    };
  }

  return {
    title: `${friend.name} | KeenKeeper`,
    description: `Relationship dashboard for ${friend.name}.`,
  };
}

export default async function FriendDetailPage({ params }) {
  const { slug } = await params;
  const friend = getFriendBySlug(slug);

  if (!friend) {
    notFound();
  }

  return (
    <SiteShell>
      <FriendDetailView friend={friend} />
    </SiteShell>
  );
}
