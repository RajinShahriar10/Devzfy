"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Star,
  User,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  createdAt: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState("");

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch {
      console.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  function getForm() {
    return {
      name: (document.getElementById("field-name") as HTMLInputElement)?.value || "",
      role: (document.getElementById("field-role") as HTMLInputElement)?.value || "",
      company: (document.getElementById("field-company") as HTMLInputElement)?.value || "",
      content: (document.getElementById("field-content") as HTMLTextAreaElement)?.value || "",
      avatar: avatarPreview || editing?.avatar || "",
      rating: parseInt((document.getElementById("field-rating") as HTMLSelectElement)?.value || "5"),
    };
  }

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(await readFileAsDataURL(file));
  }

  function resetForm() {
    setEditing(null);
    setIsAdding(false);
    setAvatarPreview("");
  }

  async function saveTestimonial() {
    const { name, role, company, content, avatar, rating } = getForm();
    if (!name || !content) return;

    if (editing) {
      try {
        const res = await fetch(`/api/testimonials/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, role, company, content, avatar, rating }),
        });
        const data = await res.json();
        if (data.success) {
          setTestimonials(
            testimonials.map((t) =>
              t.id === editing.id ? { ...t, name, role, company, content, avatar, rating } : t
            )
          );
          resetForm();
        }
      } catch {
        console.error("Failed to update testimonial");
      }
    } else {
      try {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, role, company, content, avatar, rating }),
        });
        const data = await res.json();
        if (data.success) {
          setTestimonials([...testimonials, data.testimonial]);
          resetForm();
        }
      } catch {
        console.error("Failed to create testimonial");
      }
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch {
      console.error("Failed to delete testimonial");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage client testimonials for the homepage carousel.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setIsAdding(true); setAvatarPreview(""); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <AnimatePresence>
        {(isAdding || editing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <button onClick={resetForm} className="p-1 text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden shrink-0">
                    {(avatarPreview || editing?.avatar) ? (
                      <img src={avatarPreview || editing!.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-400 mb-1 block">Client Image</label>
                    <Input type="file" accept="image/*" onChange={handleAvatarUpload} className="bg-white/5 border-white/20 text-white file:bg-purple-500/20 file:border-0 file:text-white file:rounded-lg file:px-3 file:py-1 file:text-sm" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Client Name *</label>
                    <Input
                      id="field-name"
                      defaultValue={editing?.name || ""}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Profession</label>
                    <Input
                      id="field-role"
                      defaultValue={editing?.role || ""}
                      placeholder="e.g. CEO, CTO"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Company</label>
                    <Input
                      id="field-company"
                      defaultValue={editing?.company || ""}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Rating</label>
                    <select
                      id="field-rating"
                      defaultValue={editing?.rating ?? 5}
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r} className="bg-gray-900">
                          {r} Star{r > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Review Text *</label>
                  <Textarea
                    id="field-content"
                    defaultValue={editing?.content || ""}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[100px]"
                    placeholder="What the client said..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={saveTestimonial}>
                    <Save className="h-4 w-4 mr-2" />
                    {editing ? "Update" : "Create"}
                  </Button>
                  <Button variant="secondary" onClick={resetForm}>Cancel</Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No testimonials yet.</div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <GlassCard key={t.id} hover={false}>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {t.avatar ? (
                    <img src={t.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{t.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{t.role}{t.company ? `, ${t.company}` : ""}</p>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">&ldquo;{t.content}&rdquo;</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => { setEditing(t); setIsAdding(true); setAvatarPreview(""); }}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
