"use client";

import { GlassCard } from "@/components/GlassCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban, FileText, MessageSquare, ShoppingCart,
  GraduationCap, Briefcase, Bot, Star, ArrowRight,
} from "lucide-react";

interface Stats {
  projects: number;
  services: number;
  testimonials: number;
  technologies: number;
  studentOrders: number;
  businessOrders: number;
  messages: number;
  users: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats").then((r) => r.json()).then((d) => setStats(d.stats));
  }, []);

  const statCards = [
    { label: "Projects", value: stats?.projects ?? 0, icon: FolderKanban, href: "/admin#projects", color: "text-blue-400" },
    { label: "Services", value: stats?.services ?? 0, icon: Briefcase, href: "/admin/services", color: "text-cyan-400" },
    { label: "Technologies", value: stats?.technologies ?? 0, icon: Bot, href: "/admin/technologies", color: "text-purple-400" },
    { label: "Testimonials", value: stats?.testimonials ?? 0, icon: Star, href: "/admin/testimonials", color: "text-yellow-400" },
    { label: "Student Orders", value: stats?.studentOrders ?? 0, icon: GraduationCap, href: "/admin/orders/student", color: "text-green-400" },
    { label: "Business Orders", value: stats?.businessOrders ?? 0, icon: ShoppingCart, href: "/admin/orders/business", color: "text-orange-400" },
    { label: "Messages", value: stats?.messages ?? 0, icon: MessageSquare, href: "/admin/messages", color: "text-pink-400" },
    { label: "Users", value: stats?.users ?? 0, icon: FileText, href: "/admin#users", color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-gradient">Admin</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here&apos;s what&apos;s happening with your site today.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href}>
            <GlassCard hover={false} className="cursor-pointer hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                {s.label} <ArrowRight className="h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Hero Section", href: "/admin/hero", icon: Eye },
              { label: "Services", href: "/admin/services", icon: Briefcase },
              { label: "Technologies", href: "/admin/technologies", icon: Bot },
              { label: "Testimonials", href: "/admin/testimonials", icon: Star },
              { label: "Student Orders", href: "/admin/orders/student", icon: GraduationCap },
              { label: "Business Orders", href: "/admin/orders/business", icon: ShoppingCart },
              { label: "Messages", href: "/admin/messages", icon: MessageSquare },
              { label: "Settings", href: "/admin/settings", icon: FileText },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left"
              >
                <action.icon className="h-5 w-5 text-purple-400 shrink-0" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <div className="space-y-4">
            <Link href="/admin/orders/student" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-green-400" />
                <div>
                  <div className="font-medium">Student Orders</div>
                  <div className="text-sm text-gray-400">{stats?.studentOrders ?? 0} total</div>
                </div>
              </div>
            </Link>
            <Link href="/admin/orders/business" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="font-medium">Business Orders</div>
                  <div className="text-sm text-gray-400">{stats?.businessOrders ?? 0} total</div>
                </div>
              </div>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
