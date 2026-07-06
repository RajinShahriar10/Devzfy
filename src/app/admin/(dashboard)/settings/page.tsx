"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch {
      console.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function update(key: string, value: string) {
    setSettings({ ...settings, [key]: value });
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your site settings.</p>
      </div>

      <GlassCard hover={false}>
        <h2 className="text-lg font-semibold mb-6">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Site Name</label>
            <Input
              value={settings.site_name || ""}
              onChange={(e) => update("site_name", e.target.value)}
              className="bg-muted border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Tagline</label>
            <Input
              value={settings.tagline || ""}
              onChange={(e) => update("tagline", e.target.value)}
              className="bg-muted border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Description</label>
            <Textarea
              value={settings.description || ""}
              onChange={(e) => update("description", e.target.value)}
              className="bg-muted border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Contact Email</label>
            <Input
              type="email"
              value={settings.contact_email || ""}
              onChange={(e) => update("contact_email", e.target.value)}
              className="bg-muted border-border text-foreground"
            />
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Facebook URL</label>
              <Input
                value={settings.facebook_url || ""}
                onChange={(e) => update("facebook_url", e.target.value)}
                className="bg-muted border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">LinkedIn URL</label>
              <Input
                value={settings.linkedin_url || ""}
                onChange={(e) => update("linkedin_url", e.target.value)}
                className="bg-muted border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Twitter URL</label>
              <Input
                value={settings.twitter_url || ""}
                onChange={(e) => update("twitter_url", e.target.value)}
                className="bg-muted border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">GitHub URL</label>
              <Input
                value={settings.github_url || ""}
                onChange={(e) => update("github_url", e.target.value)}
                className="bg-muted border-border text-foreground"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="mr-2 h-4 w-4" /> Save Changes</>
              )}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
