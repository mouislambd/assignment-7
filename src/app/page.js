import HomePageClient from "@/components/Home";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "KeenKeeper",
  description: "Keep track of meaningful friendships with reminders, timelines, and analytics.",
};

export default function Page() {
  return (
    <SiteShell>
      <HomePageClient />
    </SiteShell>
  );
}
