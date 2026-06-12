"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import Link from "next/link";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$2,999",
    description: "Perfect for small businesses getting started online.",
    features: [
      "Custom 5-page website",
      "Responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support",
    ],
  },
  {
    name: "Growth",
    price: "$7,999",
    description: "For growing businesses needing more firepower.",
    popular: true,
    features: [
      "Custom 10-page website",
      "Advanced animations",
      "CMS integration",
      "E-commerce ready",
      "SEO optimization",
      "3 months support",
      "Performance optimization",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale projects with custom requirements.",
    features: [
      "Unlimited pages",
      "Custom web application",
      "API development",
      "Database design",
      "Advanced security",
      "Priority support",
      "Dedicated project manager",
      "12 months support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="relative pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Simple <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Transparent pricing for every stage of your business.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <GlassCard
                  className={`h-full ${plan.popular ? "border-purple-500/50 ring-1 ring-purple-500/20" : ""}`}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {plan.price}
                    </div>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full group"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
