"use client";

import { GlassCard } from "@/components/GlassCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "The Future of Web Development in 2026",
    excerpt: "Explore the trends shaping the future of web development, from AI-powered tools to edge computing.",
    date: "Jun 10, 2026",
    tags: ["Technology", "Trends"],
    image: "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
  },
  {
    title: "Building Performant Next.js Applications",
    excerpt: "Best practices for building blazing-fast web applications with Next.js and modern tooling.",
    date: "Jun 5, 2026",
    tags: ["Next.js", "Performance"],
    image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Mastering UI/UX Design Principles",
    excerpt: "A comprehensive guide to creating intuitive and visually stunning user interfaces.",
    date: "May 28, 2026",
    tags: ["Design", "UI/UX"],
    image: "bg-gradient-to-br from-cyan-500/20 to-purple-500/20",
  },
];

export function BlogSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <ScrollReveal key={post.title} delay={index * 0.15}>
          <GlassCard className="overflow-hidden !p-0 h-full flex flex-col">
            <div className={`h-48 ${post.image} flex items-center justify-center`}>
              <div className="text-4xl font-bold text-gradient opacity-30">
                {post.title.charAt(0)}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <Calendar className="h-3 w-3" />
                {post.date}
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-400 mb-4 flex-1">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link
                href="#"
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors mt-auto"
              >
                Read More <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>
      ))}
    </div>
  );
}
