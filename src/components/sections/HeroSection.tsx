"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  cta2Text: string;
  cta2Link: string;
}

const techIcons = [
  { name: "HTML", gradient: "from-orange-500 to-red-500" },
  { name: "CSS", gradient: "from-blue-500 to-cyan-500" },
  { name: "JS", gradient: "from-yellow-400 to-yellow-600" },
  { name: "React", gradient: "from-cyan-400 to-blue-600" },
  { name: "Next.js", gradient: "from-white to-gray-400" },
  { name: "PHP", gradient: "from-indigo-500 to-purple-600" },
  { name: "PostgreSQL", gradient: "from-blue-600 to-cyan-500" },
  { name: "MySQL", gradient: "from-orange-600 to-yellow-500" },
];

function FloatingTech({ name, gradient, index }: { name: string; gradient: string; index: number }) {
  const xOffsets = [-35, 30, -25, 38, -38, 28, -30, 35];
  const yOffsets = [-25, -30, -10, -18, 15, 20, 28, 10];
  const delays = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
  const durations = [6, 7, 5, 8, 6.5, 7.5, 5.5, 6];

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{
        left: `calc(50% + ${xOffsets[index]}%)`,
        top: `calc(50% + ${yOffsets[index]}%)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + delays[index], duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: durations[index], repeat: Infinity, ease: "easeInOut", delay: delays[index] }}
        className="relative group cursor-pointer"
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
        <div className={`relative px-4 py-2 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
          <span className="text-white text-sm font-bold whitespace-nowrap">{name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const defaultHero: HeroContent = {
  badge: "Modern Web Solutions for Everyone",
  title: "Build Your Digital Future",
  subtitle: "Modern Web Solutions for Students, Professionals and Businesses.",
  ctaText: "Get Started",
  ctaLink: "/contact",
  cta2Text: "View Projects",
  cta2Link: "/#projects",
};

export function HeroSection() {
  const [hero, setHero] = useState<HeroContent>(defaultHero);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((d) => { if (d.hero) setHero(d.hero); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[96px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {techIcons.map((tech, i) => (
          <FloatingTech key={tech.name} {...tech} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-gray-400">{hero.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">{hero.title.split(" ")[0]}</span>
          <br />
          <span className="text-foreground">{hero.title.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={hero.ctaLink}>
            <Button size="lg" className="group text-base">
              {hero.ctaText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={hero.cta2Link}>
            <Button variant="secondary" size="lg" className="text-base">
              {hero.cta2Text}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-3 lg:hidden"
        >
          {techIcons.map((tech) => (
            <div key={tech.name} className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${tech.gradient} text-white text-xs font-semibold shadow-lg`}>
              {tech.name}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
