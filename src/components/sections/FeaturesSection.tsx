"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import {
  Zap,
  Shield,
  Paintbrush,
  Gauge,
  Laptop,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with sub-second load times and instant interactions.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security measures protecting your data and users.",
  },
  {
    icon: Paintbrush,
    title: "Beautiful Design",
    description: "Stunning visuals with smooth animations and intuitive interfaces.",
  },
  {
    icon: Gauge,
    title: "High Performance",
    description: "Scalable architecture that handles traffic spikes effortlessly.",
  },
  {
    icon: Laptop,
    title: "Responsive Design",
    description: "Flawless experience across all devices and screen sizes.",
  },
  {
    icon: Sparkles,
    title: "AI Powered",
    description: "Leverage AI for smarter features, analytics, and automation.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Devzfy</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We combine technical excellence with creative design to deliver outstanding results.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <GlassCard>
                <feature.icon className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
