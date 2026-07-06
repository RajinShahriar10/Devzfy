"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section className="relative py-24 lg:py-32" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what our clients have to say.
          </p>
        </ScrollReveal>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard className="text-center py-12 lg:py-16 px-6 lg:px-12">
                <Quote className="h-8 w-8 text-purple-500/30 mx-auto mb-6" />

                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-gray-200 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden ring-2 ring-purple-500/30">
                    {t.avatar ? (
                      <img src={t.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-purple-400">
                        {t.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-base font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-400">
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 p-2 text-gray-400 hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 p-2 text-gray-400 hover:text-foreground hover:bg-muted rounded-full transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`h-2 rounded-full transition-all ${
                      i === current
                        ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
