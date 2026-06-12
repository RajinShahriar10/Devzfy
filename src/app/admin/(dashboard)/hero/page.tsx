"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Sparkles } from "lucide-react";

interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  cta2Text: string;
  cta2Link: string;
}

export default function AdminHero() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json()).then((d) => {
      if (d.hero) {
        setHero({
          badge: d.hero.badge,
          title: d.hero.title,
          subtitle: d.hero.subtitle,
          ctaText: d.hero.ctaText,
          ctaLink: d.hero.ctaLink,
          cta2Text: d.hero.cta2Text,
          cta2Link: d.hero.cta2Link,
        });
      }
    });
  }, []);

  async function handleSave() {
    if (!hero) return;
    setSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!hero) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hero Section</h1>
          <p className="text-sm text-gray-400 mt-1">Customize the hero section content.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <GlassCard hover={false}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Badge Text</label>
            <Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Title</label>
            <Input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Subtitle</label>
            <Textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">CTA Button Text</label>
              <Input value={hero.ctaText} onChange={(e) => setHero({ ...hero, ctaText: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">CTA Button Link</label>
              <Input value={hero.ctaLink} onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Secondary Button Text</label>
              <Input value={hero.cta2Text} onChange={(e) => setHero({ ...hero, cta2Text: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Secondary Button Link</label>
              <Input value={hero.cta2Link} onChange={(e) => setHero({ ...hero, cta2Link: e.target.value })} />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard hover={false}>
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <div className="glass rounded-2xl p-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-gray-400">{hero.badge}</span>
          </div>
          <h3 className="text-2xl font-bold">
            <span className="text-gradient">{hero.title.split(" ")[0]}</span> {hero.title.split(" ").slice(1).join(" ")}
          </h3>
          <p className="text-sm text-gray-400">{hero.subtitle}</p>
          <div className="flex justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm">{hero.ctaText}</span>
            <span className="px-4 py-2 rounded-xl border border-white/20 text-white text-sm">{hero.cta2Text}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
