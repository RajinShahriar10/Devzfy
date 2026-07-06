"use client";

import Link from "next/link";
import { Globe, Users, Mail, Heart, ArrowUp } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface SiteSettings {
  facebook_url: string;
  linkedin_url: string;
  contact_email: string;
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/technologies", label: "Technologies" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialIcons = [
  { key: "facebook_url", label: "Facebook", icon: Globe },
  { key: "linkedin_url", label: "LinkedIn", icon: Users },
  { key: "contact_email", label: "Email", icon: Mail },
];

export function Footer({ settings = {} as SiteSettings }: { settings?: Partial<SiteSettings> }) {

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const socialLinks = socialIcons.map(({ key, label, icon: Icon }) => {
    const href = key === "contact_email"
      ? `mailto:${settings.contact_email}`
      : settings[key as keyof SiteSettings] || "#";
    return { href, label, icon: Icon };
  });

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gradient">Devzfy</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Modern web solutions for forward-thinking businesses. We build digital experiences that drive growth.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass text-gray-400 hover:text-white hover:border-purple-500/30 transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Theme</h3>
            <ThemeSwitcher />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{settings.contact_email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            &copy; {new Date().getFullYear()} Devzfy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg glass text-gray-400 hover:text-white hover:border-purple-500/30 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
