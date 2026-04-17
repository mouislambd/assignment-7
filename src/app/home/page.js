import { redirect } from "next/navigation";

export const metadata = {
  title: "Home | KeenKeeper",
  description: "Redirect to the KeenKeeper home page.",
};

export default function HomePage() {
  redirect("/");
}
