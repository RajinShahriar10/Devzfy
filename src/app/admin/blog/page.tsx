"use client";

import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

const posts = [
  {
    title: "The Future of Web Development in 2026",
    status: "published",
    date: "Jun 10, 2026",
    views: 1240,
  },
  {
    title: "Building Performant Next.js Applications",
    status: "draft",
    date: "Jun 5, 2026",
    views: 0,
  },
  {
    title: "Mastering UI/UX Design Principles",
    status: "published",
    date: "May 28, 2026",
    views: 892,
  },
];

export default function AdminBlog() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your blog content.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <GlassCard key={post.title} hover={false}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{post.title}</h3>
                  <Badge
                    variant={post.status === "published" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {post.status === "published" ? (
                      <Eye className="h-3 w-3 mr-1" />
                    ) : (
                      <EyeOff className="h-3 w-3 mr-1" />
                    )}
                    {post.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{post.date}</span>
                  {post.status === "published" && <span>{post.views} views</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
