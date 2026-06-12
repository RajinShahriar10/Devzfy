"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus, Pencil, Trash2, ShoppingCart, X, Save, Check, Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  period: string | null;
  features: string[];
  popular: boolean;
  gradient: string;
  order: number;
}

const gradients = [
  "from-purple-500 to-blue-500",
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  async function loadServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    if (data.services) setServices(data.services);
  }

  useEffect(() => { loadServices(); }, []);

  function addFeature() {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...editing.features, featureInput.trim()] });
    setFeatureInput("");
  }

  function removeFeature(feature: string) {
    if (!editing) return;
    setEditing({ ...editing, features: editing.features.filter((f) => f !== feature) });
  }

  async function saveService() {
    const title = (document.getElementById("field-title") as HTMLInputElement)?.value;
    const price = (document.getElementById("field-price") as HTMLInputElement)?.value;
    const currency = (document.getElementById("field-currency") as HTMLInputElement)?.value;
    const period = (document.getElementById("field-period") as HTMLInputElement)?.value;
    const desc = (document.getElementById("field-desc") as HTMLTextAreaElement)?.value;

    if (!title || !price) return;

    const payload = {
      title,
      price,
      currency: currency || "TK",
      period: period || null,
      description: desc || "",
      features: editing?.features || [],
      popular: editing?.popular || false,
      gradient: editing?.gradient || "from-purple-500 to-blue-500",
      order: editing?.order || 0,
    };

    if (editing) {
      const res = await fetch(`/api/services/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) await loadServices();
    } else {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) await loadServices();
    }

    setEditing(null);
    setIsAdding(false);
  }

  async function deleteService(id: string) {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    await loadServices();
  }

  function togglePopular() {
    if (!editing) return;
    setEditing({ ...editing, popular: !editing.popular });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-gray-400 mt-1">Manage service packages.</p>
        </div>
        <Button onClick={() => { setEditing({ id: "", title: "", description: "", price: "", currency: "TK", period: null, features: [], popular: false, gradient: "from-purple-500 to-blue-500", order: 0 }); setIsAdding(true); }}>
          <Plus className="h-4 w-4 mr-2" />Add Service
        </Button>
      </div>

      <AnimatePresence>
        {(isAdding || editing?.id) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{editing?.id ? "Edit Service" : "Add Service"}</h2>
                <button onClick={() => { setEditing(null); setIsAdding(false); }} className="p-1 text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Package Title</label>
                  <Input id="field-title" defaultValue={editing?.title || ""} placeholder="e.g. Student Package" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <Textarea id="field-desc" defaultValue={editing?.description || ""} placeholder="Brief description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Price</label>
                    <Input id="field-price" defaultValue={editing?.price || ""} placeholder="900" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Currency</label>
                    <Input id="field-currency" defaultValue={editing?.currency || "TK"} placeholder="TK" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Period</label>
                    <Input id="field-period" defaultValue={editing?.period || ""} placeholder="/ Month" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Features</label>
                  <div className="flex gap-2 mb-2">
                    <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Add a feature" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} />
                    <Button variant="secondary" onClick={addFeature} className="shrink-0">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(editing?.features || []).map((f) => (
                      <Badge key={f} variant="secondary" className="gap-1 text-sm py-1">
                        <Check className="h-3 w-3 text-green-400" />{f}
                        <button onClick={() => removeFeature(f)} className="hover:text-red-400 ml-1"><X className="h-3 w-3" /></button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePopular}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${editing?.popular ? "bg-yellow-500/20 text-yellow-400" : "bg-white/5 text-gray-400"}`}
                  >
                    <Star className={`h-4 w-4 ${editing?.popular ? "fill-yellow-400" : ""}`} />
                    {editing?.popular ? "Popular" : "Mark as Popular"}
                  </button>
                  <div>
                    <label className="text-sm text-gray-400 mr-2">Gradient:</label>
                    <select
                      value={editing?.gradient || "from-purple-500 to-blue-500"}
                      onChange={(e) => setEditing(editing ? { ...editing, gradient: e.target.value } : null)}
                      className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
                    >
                      {gradients.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={saveService}><Save className="h-4 w-4 mr-2" />{editing?.id ? "Update" : "Create"}</Button>
                  <Button variant="secondary" onClick={() => { setEditing(null); setIsAdding(false); }}>Cancel</Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <GlassCard key={service.id} hover={false}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{service.title}</h3>
                    {service.popular && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <div className="text-sm text-gradient font-bold">
                    {service.price} {service.currency}{service.period && <span className="text-gray-400 text-xs"> {service.period}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(service); setIsAdding(true); }} className="p-1.5 text-gray-400 hover:text-purple-400"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => deleteService(service.id)} className="p-1.5 text-gray-400 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-3">{service.description}</p>
            <div className="flex flex-wrap gap-2">
              {service.features.map((f) => (
                <Badge key={f} variant="secondary" className="text-xs"><Check className="h-3 w-3 text-green-400 mr-1" />{f}</Badge>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
