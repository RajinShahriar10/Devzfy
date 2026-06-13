"use client";

import { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus, Pencil, Trash2, ExternalLink, X, Save, Loader2, Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
}

const gradients = [
  "bg-gradient-to-br from-purple-600 to-blue-600",
  "bg-gradient-to-br from-blue-600 to-cyan-600",
  "bg-gradient-to-br from-cyan-600 to-teal-600",
  "bg-gradient-to-br from-emerald-600 to-teal-600",
  "bg-gradient-to-br from-orange-600 to-red-600",
  "bg-gradient-to-br from-pink-600 to-purple-600",
];

function emptyProject(): Omit<Project, "id"> & { tags: string[] } {
  return {
    title: "",
    description: "",
    image: gradients[0],
    tags: [],
    demoUrl: "",
    githubUrl: "",
  };
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ReturnType<typeof emptyProject> | Project>(emptyProject());
  const [showForm, setShowForm] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      console.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  function updateForm(updates: Partial<ReturnType<typeof emptyProject> | Project>) {
    setForm({ ...form, ...updates });
  }

  function addTag() {
    const tag = tagInput.trim();
    if (!tag || form.tags.includes(tag)) { setTagInput(""); return; }
    setForm({ ...form, tags: [...form.tags, tag] });
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  }

  function openAdd() {
    setForm(emptyProject());
    setShowForm(true);
  }

  function openEdit(project: Project) {
    setForm(project);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setForm(emptyProject());
  }

  const isEditing = "id" in form && form.id !== "";

  async function saveProject() {
    if (!form.title || !form.description) return;
    setSaving(true);
    try {
      const body = {
        title: form.title,
        description: form.description,
        image: form.image,
        tags: form.tags,
        demoUrl: form.demoUrl || null,
        githubUrl: form.githubUrl || null,
      };

      if (isEditing) {
        const res = await fetch(`/api/projects/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
      }
      await fetchProjects();
      closeForm();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      await fetchProjects();
    } catch {
      alert("Failed to delete project");
    }
  }

  function initials(title: string) {
    return title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your portfolio projects. Only admin-added projects appear on the home page.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {isEditing ? "Edit Project" : "Add Project"}
                </h2>
                <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Project Title *</label>
                  <Input
                    value={form.title}
                    onChange={(e) => updateForm({ title: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description *</label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    placeholder="Describe the project"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Thumbnail / Image</label>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {gradients.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateForm({ image: g })}
                        className={`h-8 w-8 rounded-full ${g} border-2 transition-all ${
                          form.image === g ? "border-white scale-110" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <Input
                    value={form.image}
                    onChange={(e) => updateForm({ image: e.target.value })}
                    placeholder="Or enter a custom gradient class or image URL"
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Technologies / Tags</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    />
                    <Button variant="secondary" onClick={addTag} type="button" className="shrink-0">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {form.tags.length === 0 && (
                      <span className="text-xs text-gray-500">No tags added</span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Live Demo URL</label>
                    <Input
                      value={form.demoUrl || ""}
                      onChange={(e) => updateForm({ demoUrl: e.target.value })}
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">GitHub URL</label>
                    <Input
                      value={form.githubUrl || ""}
                      onChange={(e) => updateForm({ githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      type="url"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={saveProject} disabled={saving}>
                    {saving ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                    ) : (
                      <><Save className="h-4 w-4 mr-2" /> {isEditing ? "Update Project" : "Create Project"}</>
                    )}
                  </Button>
                  <Button variant="secondary" onClick={closeForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects yet. Click &quot;Add Project&quot; to create one.
          </div>
        )}
        {projects.map((project) => (
          <GlassCard key={project.id} hover={false}>
            <div className="flex items-start gap-4">
              <div
                className={`h-16 w-16 rounded-xl ${project.image} flex items-center justify-center shrink-0`}
              >
                <span className="text-xl font-bold text-white/40 select-none">
                  {initials(project.title)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300">
                      <ExternalLink className="h-3 w-3" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                      <Code2 className="h-3 w-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(project)}
                  className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
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
