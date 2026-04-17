import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-2 sm:px-4 py-4 sm:py-8">{children}</main>
      <Footer />
    </div>
  );
}
