"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";

interface Technology {
  id: string;
  name: string;
  icon: string;
  category: string;
  order: number;
}

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-purple-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-cyan-500",
];

function getInitials(name: string): string {
  if (name === "Tailwind CSS") return "TW";
  if (name === "Next.js") return "NJ";
  if (name === "PostgreSQL") return "PG";
  return name.slice(0, 2).toUpperCase();
}

function getGradient(index: number): string {
  return gradients[index % gradients.length];
}

export function TechnologiesSection({ technologies }: { technologies: Technology[] }) {

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="technologies">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable solutions.
          </p>
        </ScrollReveal>

        {technologies.length === 0 ? null : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="h-full"
                >
                  <GlassCard className="h-full text-center group cursor-default">
                    <div className="flex flex-col items-center py-4 lg:py-6">
                      <div
                        className={`h-14 w-14 lg:h-16 lg:w-16 rounded-2xl bg-gradient-to-br ${getGradient(index)} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                      >
                        <span className="text-white font-bold text-sm lg:text-base">
                          {getInitials(tech.name)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm lg:text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                        {tech.name}
                      </h3>
                      {tech.category && (
                        <span className="text-[10px] lg:text-xs text-gray-500 mt-1 px-2 py-0.5 rounded-full bg-white/5">
                          {tech.category}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
