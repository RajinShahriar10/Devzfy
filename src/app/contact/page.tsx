"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Globe, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";

interface SiteSettings {
  facebook_url: string;
  linkedin_url: string;
  contact_email: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    facebook_url: "#",
    linkedin_url: "#",
    contact_email: "hello@devzfy.com",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:ring-purple-500/50 focus:border-purple-500";

  const socialButtons = [
    {
      label: "Facebook",
      href: settings.facebook_url,
      icon: Globe,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      label: "LinkedIn",
      href: settings.linkedin_url,
      icon: Users,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      label: "Email",
      href: `mailto:${settings.contact_email}`,
      icon: Mail,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let&apos;s talk about how we can help you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <GlassCard>
              <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Name</label>
                      <Input required name="name" placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Email</label>
                      <Input required type="email" name="email" placeholder="your@email.com" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Subject</label>
                    <Input required name="subject" placeholder="Project discussion" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Message</label>
                    <Textarea
                      required
                      name="message"
                      placeholder="Tell us about your project..."
                      className={inputClass + " min-h-[120px]"}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-6">Connect With Us</h2>
              {socialButtons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <GlassCard className="group cursor-pointer hover:border-white/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${btn.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <btn.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{btn.label}</div>
                        <div className="font-semibold text-sm truncate max-w-[200px]">
                          {btn.href.replace("mailto:", "")}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
