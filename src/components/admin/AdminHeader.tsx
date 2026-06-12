"use client";

import { Menu } from "lucide-react";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
  Settings2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const mobileLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Settings2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Settings2 },
  { href: "/admin/technologies", label: "Technologies", icon: Settings },
  { href: "/admin/testimonials", label: "Testimonials", icon: FileText },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminHeader({ user }: { user: { name?: string | null; email?: string | null } }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-background/50 backdrop-blur-xl">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">{user?.name || "Admin"}</div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden border-b border-white/10 bg-background/95 backdrop-blur-xl">
          <nav className="px-3 py-2 space-y-1">
            {mobileLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  pathname === href
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 w-full"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
