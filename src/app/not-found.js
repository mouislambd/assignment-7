import Link from "next/link";
import { HomeIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7fafb] px-6">
      <div className="text-center">
        <p className="text-9xl font-extrabold text-[#285848]">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-base text-[#5e7394]">
          Looks like this friendship link is broken.
        </p>
        <p className="text-base text-[#5e7394]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#285848] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e362f]"
        >
          <HomeIcon className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
