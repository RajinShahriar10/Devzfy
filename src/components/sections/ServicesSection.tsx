"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StudentOrderForm } from "@/components/StudentOrderForm";
import { BusinessOrderForm } from "@/components/BusinessOrderForm";

interface ServicePackage {
  id: string;
  title: string;
  price: string;
  currency: string;
  period: string | null;
  description: string;
  features: string[];
  gradient: string;
  popular: boolean;
  order: number;
}

export function ServicesSection({ services: packages }: { services: ServicePackage[] }) {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);

  return (
    <>
      <StudentOrderForm open={showStudentForm} onClose={() => setShowStudentForm(false)} />
      <BusinessOrderForm open={showBusinessForm} onClose={() => setShowBusinessForm(false)} />
      <section className="relative py-24 lg:py-32" id="services">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect package for your needs. Start building your digital presence today.
            </p>
          </ScrollReveal>

          {packages.length === 0 && (
            <p className="text-center text-gray-500">No services available yet.</p>
          )}

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 0.15}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="relative h-full">
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg shadow-blue-500/25">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <GlassCard className={`h-full flex flex-col ${pkg.popular ? "border-blue-500/40 ring-1 ring-blue-500/20" : ""}`}>
                    <div className="mb-6">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gradient">{pkg.price}</span>
                        <span className="text-lg font-semibold text-gray-300">{pkg.currency}</span>
                        {pkg.period && <span className="text-sm text-gray-400">{pkg.period}</span>}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {pkg.title.toLowerCase().includes("student") ? (
                      <Button
                        variant="outline"
                        className="w-full group border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        onClick={() => setShowStudentForm(true)}
                      >
                        Purchase Now
                        <ShoppingCart className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        className="w-full group"
                        onClick={() => setShowBusinessForm(true)}
                      >
                        Purchase Now
                        <ShoppingCart className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
