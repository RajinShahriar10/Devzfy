"use client";

import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Image,
  X,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl: string;
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Nexus Dashboard",
    description: "A real-time analytics dashboard for enterprise data visualization and monitoring.",
    thumbnail: "bg-gradient-to-br from-purple-600 to-blue-600",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    demoUrl: "https://example.com/nexus",
  },
  {
    id: "2",
    name: "SwiftCart",
    description: "High-performance e-commerce platform with AI-powered recommendations.",
    thumbnail: "bg-gradient-to-br from-blue-600 to-cyan-600",
    technologies: ["React", "Node.js", "Redis", "Machine Learning"],
    demoUrl: "https://example.com/swiftcart",
  },
  {
    id: "3",
    name: "CloudForge",
    description: "Cloud infrastructure management platform with real-time monitoring.",
    thumbnail: "bg-gradient-to-br from-cyan-600 to-teal-600",
    technologies: ["Next.js", "Go", "Docker", "AWS"],
    demoUrl: "https://example.com/cloudforge",
  },
];

const gradients = [
  "bg-gradient-to-br from-purple-600 to-blue-600",
  "bg-gradient-to-br from-blue-600 to-cyan-600",
  "bg-gradient-to-br from-cyan-600 to-teal-600",
  "bg-gradient-to-br from-emerald-600 to-teal-600",
  "bg-gradient-to-br from-orange-600 to-red-600",
  "bg-gradient-to-br from-pink-600 to-purple-600",
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [techInput, setTechInput] = useState("");

  const form: Project = editing || {
    id: "",
    name: "",
    description: "",
    thumbnail: gradients[0],
    technologies: [],
    demoUrl: "",
  };

  function getForm(): Project {
    return editing || {
      id: "",
      name: (document.getElementById("field-name") as HTMLInputElement)?.value || "",
      description: (document.getElementById("field-desc") as HTMLTextAreaElement)?.value || "",
      thumbnail: (document.getElementById("field-thumb") as HTMLSelectElement)?.value || gradients[0],
      technologies: [],
      demoUrl: (document.getElementById("field-url") as HTMLInputElement)?.value || "",
    };
  }

  function addTech() {
    if (!techInput.trim()) return;
    if (editing) {
      setEditing({
        ...editing,
        technologies: [...editing.technologies, techInput.trim()],
      });
    }
    setTechInput("");
  }

  function removeTech(tech: string) {
    if (editing) {
      setEditing({
        ...editing,
        technologies: editing.technologies.filter((t) => t !== tech),
      });
    }
  }

  function saveProject() {
    const name = (document.getElementById("field-name") as HTMLInputElement)?.value;
    const desc = (document.getElementById("field-desc") as HTMLTextAreaElement)?.value;
    const thumb = (document.getElementById("field-thumb") as HTMLSelectElement)?.value;
    const url = (document.getElementById("field-url") as HTMLInputElement)?.value;

    if (!name || !desc) return;

    if (editing) {
      setProjects(
        projects.map((p) =>
          p.id === editing.id
            ? { ...editing, name, description: desc, thumbnail: thumb, demoUrl: url }
            : p
        )
      );
      setEditing(null);
    } else {
      const newProject: Project = {
        id: String(Date.now()),
        name,
        description: desc,
        thumbnail: thumb || gradients[0],
        technologies: [],
        demoUrl: url || "",
      };
      setProjects([...projects, newProject]);
      setIsAdding(false);
    }
  }

  function deleteProject(id: string) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your portfolio projects. Fields: Name, Description, Thumbnail, Technologies, Live Demo URL.
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setIsAdding(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
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
                  {editing ? "Edit Project" : "Add Project"}
                </h2>
                <button
                  onClick={() => { setEditing(null); setIsAdding(false); }}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Project Name</label>
                  <Input
                    id="field-name"
                    defaultValue={editing?.name || ""}
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <Textarea
                    id="field-desc"
                    defaultValue={editing?.description || ""}
                    placeholder="Describe the project"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Thumbnail</label>
                  <select
                    id="field-thumb"
                    defaultValue={editing?.thumbnail || gradients[0]}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    {gradients.map((g) => (
                      <option key={g} value={g} className="bg-gray-900">
                        {g.replace("bg-gradient-to-br ", "")}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 mt-2">
                    {gradients.map((g) => (
                      <div key={g} className={`h-6 w-6 rounded-full ${g} border border-white/20`} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Technologies Used</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="Add a technology"
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                    />
                    <Button variant="secondary" onClick={addTech} className="shrink-0">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(editing?.technologies || []).map((tech) => (
                      <Badge key={tech} variant="secondary" className="gap-1">
                        {tech}
                        <button onClick={() => removeTech(tech)} className="hover:text-red-400">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Live Demo URL</label>
                  <Input
                    id="field-url"
                    defaultValue={editing?.demoUrl || ""}
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={saveProject}>
                    <Save className="h-4 w-4 mr-2" />
                    {editing ? "Update Project" : "Create Project"}
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

      <div className="space-y-4">
        {projects.map((project) => (
          <GlassCard key={project.id} hover={false}>
            <div className="flex items-start gap-4">
              <div
                className={`h-16 w-16 rounded-xl ${project.thumbnail} flex items-center justify-center shrink-0`}
              >
                <Image className="h-6 w-6 text-white/60" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {project.demoUrl}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => { setEditing(project); setIsAdding(true); }}
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
