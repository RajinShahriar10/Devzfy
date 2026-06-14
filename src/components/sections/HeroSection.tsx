"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroContent {
  id?: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  cta2Text: string;
  cta2Link: string;
}

const techLogos: { name: string; gradient: string; icon: React.ReactNode }[] = [
  {
    name: "HTML",
    gradient: "from-orange-500 to-red-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M1.5 0h21l-1.91 21.563L11.5 24l-8.09-2.438L1.5 0zm7.25 7.75H5.625l-.25-2.625h8.625l-.5 5.25H9.75l-.25 2.5h3.375l.125 1.375L12 15.125l-3.125-.825-.125-1.375H6.125l.25 3.125L12 17.975l5.625-2.05.75-8.3H8.75l.125-1.475h7.125l.25-2.625H8.75z" />
      </svg>
    ),
  },
  {
    name: "CSS",
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M1.5 0h21l-1.91 21.563L11.5 24l-8.09-2.438L1.5 0zm17.09 4.413L18.5 6.25l.01.013L12 8.825l6.51 2.562.01.013-.5 5.625L12 19.225l-6.02-2.212-.25-2.775h2.95l.125 1.4L12 16.975l3.2-1.137.425-4.75L12 9.35 5.64 6.663l-.14-.125.13-.125L12 3.287l6.09 2.651z" />
      </svg>
    ),
  },
  {
    name: "JS",
    gradient: "from-yellow-400 to-yellow-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-.91-2.535-.804-1.02.105-1.785.42-2.295.915-.555.51-.855 1.245-.825 2.175.015.225.015.45.075.705.225 1.065 1.035 1.545 2.175 2.055.54.24.933.45 1.035.69.105.27.06.57-.105.855-.225.435-.735.675-1.395.585-.39-.06-.78-.24-1.02-.54-.285-.345-.45-.525-.72-.945-1.02.585-1.02.585-1.035 1.125.015.39.09.645.21.945.315.765 1.14 1.365 2.295 1.455.51.045 1.005-.045 1.5-.24.705-.27 1.23-.735 1.545-1.455.24-.495.3-1.05.165-1.605zm-5.21-5.17h-.135c-.165.495-.405.99-.72 1.425-.435.585-1.065 1.035-1.68 1.335-.315.15-.45.27-.45.495 0 .195.06.3.24.45.15.15.36.195.645.195.435 0 .945-.21 1.35-.48.405-.27.735-.585.99-.975.12-.18.24-.375.36-.555v1.695c0 .405.075.585.3.735.165.12.42.165.675.165.225 0 .39-.06.54-.15.15-.09.24-.225.3-.465h.135v-3.765c-.165-.045-.315-.075-.495-.09-.315-.06-.675-.105-1.035-.105-.69.015-1.005.12-1.185.375-.135.195-.195.405-.195.675zm1.35-5.46l.375-.36H12.69l-1.65 1.575V1.5H9.39v16.485h3.495v-7.68l.705-.69c.27-.255.57-.51.99-.735.27-.15.57-.27.885-.27.66 0 .99.255 1.245.87.09.225.165.48.195.75h.135c.03-.27.06-.57.06-.87v-.54c.03-.81-.165-1.35-.705-1.755-.375-.3-.84-.45-1.44-.45z" />
      </svg>
    ),
  },
  {
    name: "React",
    gradient: "from-cyan-400 to-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 9.85a2.15 2.15 0 100 4.3 2.15 2.15 0 000-4.3zm0 0a2.15 2.15 0 100 4.3 2.15 2.15 0 000-4.3zm0 0a2.15 2.15 0 100 4.3 2.15 2.15 0 000-4.3zm8.68-2.66c0 .07-.03.14-.05.21-.7 1.81-3.2 3.58-6.38 4.55 3.18.97 5.68 2.74 6.38 4.55.02.07.05.14.05.21 0-.07.03-.14.05-.21.7-1.81 3.2-3.58 6.38-4.55-3.18-.97-5.68-2.74-6.38-4.55-.02-.07-.05-.14-.05-.21zm-17.36 0c0 .07.03.14.05.21.7 1.81 3.2 3.58 6.38 4.55-3.18.97-5.68 2.74-6.38 4.55-.02.07-.05.14-.05.21 0-.07.03-.14.05-.21.7-1.81 3.2-3.58 6.38-4.55-3.18-.97-5.68-2.74-6.38-4.55-.02-.07-.05-.14-.05-.21zM12 0c-.69 0-1.25.84-1.25 1.88v.74C8.22 3.14 5.9 4.48 4.06 6.16l-.56-.33c-.9-.52-1.88-.27-2.2.56-.31.83.18 1.93 1.08 2.45l.56.33c-.3 1.12-.49 2.29-.49 3.49 0 1.2.19 2.37.49 3.49l-.56.33c-.9.52-1.39 1.62-1.08 2.45.32.83 1.3 1.08 2.2.56l.56-.33c1.84 1.68 4.16 3.02 6.69 3.54v.74c0 1.04.56 1.88 1.25 1.88s1.25-.84 1.25-1.88v-.74c2.53-.52 4.85-1.86 6.69-3.54l.56.33c.9.52 1.88.27 2.2-.56.31-.83-.18-1.93-1.08-2.45l-.56-.33c.3-1.12.49-2.29.49-3.49 0-1.2-.19-2.37-.49-3.49l.56-.33c.9-.52 1.39-1.62 1.08-2.45-.32-.83-1.3-1.08-2.2-.56l-.56.33C18.1 4.48 15.78 3.14 13.25 2.62v-.74C13.25.84 12.69 0 12 0z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    gradient: "from-white to-gray-400",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l5.849 7.615a12.16 12.16 0 001.148-.086l-3.661-4.766 5.687-7.41h1.574v15.294h-1.628l.092-.12v.12h.001zm-2.258-6.844l-1.296-1.687v3.698l1.296.042v-2.053z" />
      </svg>
    ),
  },
  {
    name: "PHP",
    gradient: "from-indigo-500 to-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M7.3 8.4c-.3 0-.5.1-.7.2-.2.1-.3.3-.3.6l.1.6c.2.5.4.7.8.8.4.1.7 0 1-.3.3-.3.5-.7.5-1.1 0-.3-.1-.5-.4-.7-.3-.2-.6-.3-1-.3zm12.3 0c-.3 0-.5.1-.7.2-.2.1-.3.3-.3.6l.1.6c.2.5.4.7.8.8.4.1.7 0 1-.3.3-.3.5-.7.5-1.1 0-.3-.1-.5-.4-.7-.3-.2-.6-.3-1-.3zM22 2.2C19.8.8 16.9 0 13.9 0c-4.5 0-7.3 1.4-9.2 3.7C3 5.6 2.3 7.8 2.3 9.7c0 2.7 1.5 5.1 4.1 6.7.6.4 1.2.6 1.7.6.3 0 .5-.1.7-.3.2-.2.2-.5.1-.9-.1-.6-.2-1-.2-1.4 0-.4.1-.7.3-.9.2-.2.5-.3.9-.3.5 0 1 .2 1.5.7.5.5.8 1.1.8 1.9 0 1.1-.5 2-1.5 2.7-.9.7-2.1 1-3.5 1-1.3 0-2.5-.3-3.6-1-1.8-1-2.8-2.7-2.8-5.2C2.3 7 4.4 3.6 9.6 2.5c1.8-.4 3.5-.6 5.2-.6 2.6 0 4.9.6 6.8 1.7 1.9 1.2 2.9 2.8 2.9 5 0 .8-.1 1.6-.4 2.4-.3.8-.7 1.5-1.3 2.1-.6.6-1.2 1.1-2 1.4-.8.3-1.4.5-2 .5-.5 0-.9-.2-1.1-.5-.2-.4-.2-.8 0-1.2.2-.4.4-.6.7-.6s.4.1.7.2c.3.1.6.2 1 .2.7 0 1.4-.3 2-1 .6-.6 1-1.5 1-2.5 0-1.7-.8-3-2.5-3.8-1.6-.8-3.7-1.2-6.2-1.2-2.5 0-4.4.5-5.9 1.4-1.4.9-2.2 2.1-2.2 3.6 0 .9.3 1.6 1 2.2.6.5 1.3.8 2 .8.5 0 .9-.1 1.2-.4.3-.3.4-.7.3-1.3-.1-.5-.2-.9-.2-1.1 0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.4 0 .7.1 1 .4.3.3.5.7.5 1.2 0 .5-.1.9-.4 1.3-.3.4-.6.7-.9.9-.5.4-1.1.6-1.8.6-.9 0-1.8-.3-2.6-.9-1.1-.8-1.6-1.9-1.6-3.4 0-.8.2-1.5.5-2.2.4-.7.8-1.3 1.4-1.8.6-.5 1.3-.9 2-1.2.9-.3 1.9-.5 3-.5 2.8 0 5.1.6 6.8 1.7 1.8 1.1 2.7 2.8 2.7 5 0 .4 0 .8-.1 1.2-.1.4-.2.7-.3.9h.1c.9 0 1.8-.3 2.6-.9 1-.7 1.5-1.8 1.5-3.2 0-2.1-1.1-3.8-3.2-5z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    gradient: "from-blue-600 to-cyan-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M23.04 13.49c-.5-1.23-1.55-1.85-2.97-2.05-.26-.46-.56-.9-.86-1.32-.7-.96-1.48-1.82-2.06-2.84-.42-.75-.73-1.55-.95-2.38-.2-.72-.26-1.47-.43-2.2-.33-1.12-.87-2.14-1.64-3-.67-.75-1.49-1.33-2.38-1.77-.86-.42-1.77-.73-2.73-.92-1.05-.2-2.1-.3-3.16-.27-.82.03-1.63.15-2.43.34-.8.19-1.57.46-2.29.84-.63.33-1.21.73-1.73 1.2-.59.53-1.1 1.13-1.5 1.8-.56.92-.93 1.93-1.2 2.98-.27 1.02-.38 2.05-.5 3.08-.08.6-.1 1.21-.18 1.81-.1.68-.24 1.36-.33 2.04-.07.5-.15 1-.14 1.5.01.7.1 1.4.16 2.1.08.85.32 1.67.6 2.47.28.78.62 1.55 1.08 2.25.42.64.91 1.21 1.48 1.71.65.57 1.36 1.02 2.15 1.35.64.27 1.29.5 1.99.59.77.1 1.53.05 2.28-.13.56-.13 1.1-.34 1.6-.62.49-.27.93-.6 1.33-1 .22-.2.4-.42.56-.66.22-.36.38-.75.47-1.16.22.04.43.1.65.13.83.13 1.66.1 2.49-.04.75-.14 1.45-.42 2.05-.86.53-.38.92-.87 1.16-1.47.23-.58.35-1.19.35-1.82-.01-.48.04-.96 0-1.44l-.1-.52c.28-.02.55-.08.8-.19.64-.28 1.06-.73 1.18-1.43.06-.33.05-.65-.02-.97zM20.7 21.2c-.44.38-1.01.53-1.52.69-.45.15-.9.27-1.36.35-.58.1-1.16.15-1.74.1-.43-.04-.85-.12-1.26-.25l-.2-.07c-.03.02-.02.05-.02.08-.06.51-.12 1.03-.25 1.53-.03.13-.1.26-.15.39-.23.58-.54 1.12-.97 1.58-.32.33-.66.63-1.06.86-.47.26-.96.45-1.49.54-.64.1-1.28.11-1.91-.03-.57-.13-1.1-.36-1.59-.68-.55-.36-1.04-.78-1.47-1.27-.49-.55-.89-1.16-1.2-1.83-.25-.55-.43-1.12-.58-1.7-.17-.66-.27-1.33-.4-2.0-.07-.35-.14-.7-.2-1.06l-.26.01c-.67.04-1.34-.05-1.99-.2-.58-.13-1.14-.31-1.67-.57-.56-.27-1.08-.6-1.55-1.01-.47-.4-.87-.86-1.23-1.36-.5-.69-.9-1.44-1.21-2.23-.33-.83-.56-1.69-.7-2.58-.1-.65-.16-1.3-.15-1.96.01-.58.08-1.16.17-1.73.1-.59.22-1.17.35-1.74.16-.7.39-1.39.7-2.04.28-.57.62-1.12 1.04-1.6.45-.52.95-.98 1.52-1.35.57-.37 1.18-.67 1.82-.9.67-.24 1.36-.4 2.07-.5.63-.08 1.26-.13 1.9-.12.86.02 1.72.09 2.56.27.79.16 1.56.41 2.28.77.72.36 1.4.79 2.01 1.32.57.5 1.07 1.06 1.49 1.69.56.84.96 1.77 1.24 2.72.22.77.37 1.56.57 2.34.22.88.52 1.73.87 2.55.35.8.77 1.55 1.26 2.26.53.78 1.12 1.5 1.58 2.34.25.46.42.95.5 1.46.07.43.02.86-.03 1.29-.05.39-.14.77-.32 1.12-.19.38-.43.7-.78.94zm-2.3-4.64c.06.02.14.04.22.07.42.12.82.05 1.05-.28.14-.2.18-.43.12-.66-.06-.27-.25-.42-.52-.44-.16-.01-.3.02-.44.07-.06.02-.12.04-.18.07l-.25.12v1.05z" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    gradient: "from-orange-600 to-yellow-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
];

function FloatingTech({ name, gradient, icon, index }: { name: string; gradient: string; icon: React.ReactNode; index: number }) {
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
        <div className={`relative px-3 py-2 rounded-xl bg-gradient-to-r ${gradient} shadow-lg flex items-center justify-center`}>
          {icon}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection({ hero }: { hero: HeroContent | null }) {
  if (!hero) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[96px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {techLogos.map((tech, i) => (
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
          {techLogos.map((tech) => (
            <div key={tech.name} className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${tech.gradient} text-white shadow-lg flex items-center justify-center`}>
              {tech.icon}
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
