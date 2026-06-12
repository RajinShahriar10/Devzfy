"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Users, Lightbulb } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "We write maintainable, scalable code following industry best practices.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Agile methodology ensures rapid development and timely delivery.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description: "Your success is our priority. We collaborate closely throughout.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of trends to bring you the latest technology solutions.",
  },
];

export function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Crafting Digital{" "}
                <span className="text-gradient">Excellence</span>
              </h2>
              <p className="text-gray-400 mb-6">
                Devzfy is a cutting-edge web development agency that combines
                technical expertise with creative vision. We help businesses
                establish a powerful online presence through modern, performant,
                and visually stunning digital solutions.
              </p>
              <p className="text-gray-400 mb-8">
                Our team of experienced developers, designers, and strategists
                work together to deliver results that exceed expectations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value) => (
                  <GlassCard key={value.title} hover={false} className="!p-4">
                    <value.icon className="h-5 w-5 text-purple-400 mb-2" />
                    <h3 className="text-sm font-semibold mb-1">{value.title}</h3>
                    <p className="text-xs text-gray-400">{value.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gradient mb-4">2024</div>
                  <p className="text-gray-400">Founded with a vision to transform the web</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 blur-3xl" />
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
