"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  GripVertical,
  Code,
  Smartphone,
  Server,
  Database,
  Globe,
  Cpu,
  Layout,
  Terminal,
  Cloud,
  Wrench,
} from "lucide-react";

const iconOptions = [
  { value: "code", label: "Code", icon: Code },
  { value: "smartphone", label: "Smartphone", icon: Smartphone },
  { value: "server", label: "Server", icon: Server },
  { value: "database", label: "Database", icon: Database },
  { value: "globe", label: "Globe", icon: Globe },
  { value: "cpu", label: "CPU", icon: Cpu },
  { value: "layout", label: "Layout", icon: Layout },
  { value: "terminal", label: "Terminal", icon: Terminal },
  { value: "cloud", label: "Cloud", icon: Cloud },
];

interface Technology {
  id: string;
  name: string;
  icon: string;
  category: string;
  order: number;
}

const categoryOptions = ["Frontend", "Backend", "Database & DevOps"];

export default function AdminTechnologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editing, setEditing] = useState<Technology | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchTechnologies() {
    setLoading(true);
    try {
      const res = await fetch("/api/technologies");
      const data = await res.json();
      setTechnologies(data.technologies || []);
    } catch {
      console.error("Failed to fetch technologies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechnologies();
  }, []);

  function getForm() {
    return {
      name: (document.getElementById("field-name") as HTMLInputElement)?.value || "",
      icon: (document.getElementById("field-icon") as HTMLSelectElement)?.value || "code",
      category: (document.getElementById("field-category") as HTMLSelectElement)?.value || "Frontend",
      order: parseInt((document.getElementById("field-order") as HTMLInputElement)?.value || "0"),
    };
  }

  async function saveTechnology() {
    const { name, icon, category, order } = getForm();
    if (!name) return;

    if (editing) {
      try {
        const res = await fetch(`/api/technologies/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon, category, order }),
        });
        const data = await res.json();
        if (data.success) {
          setTechnologies(
            technologies.map((t) =>
              t.id === editing.id ? { ...t, name, icon, category, order } : t
            )
          );
          setEditing(null);
        }
      } catch {
        console.error("Failed to update technology");
      }
    } else {
      try {
        const res = await fetch("/api/technologies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, icon, category, order }),
        });
        const data = await res.json();
        if (data.success) {
          setTechnologies([...technologies, data.technology]);
          setIsAdding(false);
        }
      } catch {
        console.error("Failed to create technology");
      }
    }
  }

  async function deleteTechnology(id: string) {
    if (!confirm("Are you sure you want to delete this technology?")) return;
    try {
      const res = await fetch(`/api/technologies/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTechnologies(technologies.filter((t) => t.id !== id));
      }
    } catch {
      console.error("Failed to delete technology");
    }
  }

  const IconComponent = (iconName: string) => {
    const found = iconOptions.find((o) => o.value === iconName);
    const Icon = found?.icon || Code;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Technologies</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage technologies displayed in the skills section.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setIsAdding(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Technology
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
                  {editing ? "Edit Technology" : "Add Technology"}
                </h2>
                <button
                  onClick={() => { setEditing(null); setIsAdding(false); }}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Technology Name</label>
                  <Input
                    id="field-name"
                    defaultValue={editing?.name || ""}
                    placeholder="e.g. React, Next.js, PostgreSQL"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Icon</label>
                  <select
                    id="field-icon"
                    defaultValue={editing?.icon || "code"}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    {iconOptions.map((o) => (
                      <option key={o.value} value={o.value} className="bg-gray-900">
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Category</label>
                  <select
                    id="field-category"
                    defaultValue={editing?.category || "Frontend"}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c} className="bg-gray-900">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Display Order</label>
                  <Input
                    id="field-order"
                    type="number"
                    defaultValue={editing?.order ?? 0}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={saveTechnology}>
                    <Save className="h-4 w-4 mr-2" />
                    {editing ? "Update" : "Create"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { setEditing(null); setIsAdding(false); }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading technologies...</div>
      ) : technologies.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No technologies yet. Add your first one above.</div>
      ) : (
        <div className="space-y-2">
          {technologies.map((tech) => (
            <GlassCard key={tech.id} hover={false}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <GripVertical className="h-4 w-4" />
                  {IconComponent(tech.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{tech.name}</span>
                    <Badge variant="secondary" className="text-xs">{tech.category}</Badge>
                    <span className="text-xs text-gray-500">Order: {tech.order}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => { setEditing(tech); setIsAdding(true); }}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTechnology(tech.id)}
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
