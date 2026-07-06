"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
}

function initials(title: string) {
  return title.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

function isImageUrl(val: string) {
  return val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:");
}

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const total = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const dir = index > current ? 1 : -1;
      setCurrent([((index % total) + total) % total, dir]);
    },
    [current, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (total <= 1) return;
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [next, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  if (projects.length === 0) {
    return null;
  }

  const project = projects[current];

  return (
    <section className="relative py-24 lg:py-32" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing some of our best work. Each project is a testament to our
            commitment to excellence.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div
                    className={`h-72 md:h-full min-h-[320px] ${isImageUrl(project.image) ? "" : project.image} flex items-center justify-center relative overflow-hidden bg-black/10`}
                  >
                    {isImageUrl(project.image) ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20" />
                        <motion.span
                          className="relative text-6xl md:text-8xl font-bold text-white/30 select-none"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          {initials(project.title)}
                        </motion.span>
                      </>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank">
                        <Button className="group w-fit">
                          Live Demo
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-foreground hover:bg-muted transition-all z-10 hidden md:block"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-foreground hover:bg-muted transition-all z-10 hidden md:block"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
            <button
              onClick={prev}
              className="p-2 rounded-full glass text-foreground hover:bg-muted transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-400">
              {current + 1} / {total}
            </span>
            <button
              onClick={next}
              className="p-2 rounded-full glass text-foreground hover:bg-muted transition-all"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
