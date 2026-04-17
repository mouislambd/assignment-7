"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HomeIcon, StatsIcon, TimelineIcon } from "@/components/ui/Icons";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/timeline", label: "Timeline", Icon: TimelineIcon },
  { href: "/stats", label: "Stats", Icon: StatsIcon },
];

function isActivePath(pathname, href) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/friends") || pathname.startsWith("/home");
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-30 w-full h-12 border-b border-slate-200">
      <div className="container mx-auto max-w-7xl px-2 sm:px-4 flex items-center justify-between w-full h-full">
        <div className="flex-shrink-0 -ml-50 pl-1">
          <Link href="/">
            <Image src={logo} alt="KeenKeeper" width={120} height={34} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, Icon }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium text-sm transition-colors ${active ? "bg-[#244D3F] text-white" : "text-[#244D3F] hover:bg-[#244D3F] hover:text-white"}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex-shrink-0 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded hover:bg-gray-100 text-[#244D3F]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <ul className="menu p-2 gap-1 w-full">
            {navItems.map(({ href, label, Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-4 py-2 rounded-lg font-semibold ${active ? "bg-[#244D3F] text-white border border-[#244D3F]" : "bg-transparent text-[#244D3F] border border-transparent"}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}