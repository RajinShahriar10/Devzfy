"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";

export default function OrdersOverview() {
  const [studentCount, setStudentCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [sRes, bRes] = await Promise.all([
          fetch("/api/orders/student"),
          fetch("/api/orders/business"),
        ]);
        const sData = await sRes.json();
        const bData = await bRes.json();
        setStudentCount(sData.orders?.length ?? 0);
        setBusinessCount(bData.orders?.length ?? 0);
      } catch {}
    }
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage all orders placed through the platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/orders/student">
          <GlassCard className="group cursor-pointer hover:border-purple-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Student Orders</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {studentCount} order{studentCount !== 1 ? "s" : ""}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </div>
          </GlassCard>
        </Link>

        <Link href="/admin/orders/business">
          <GlassCard className="group cursor-pointer hover:border-cyan-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">Business Orders</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {businessCount} order{businessCount !== 1 ? "s" : ""}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            </div>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
