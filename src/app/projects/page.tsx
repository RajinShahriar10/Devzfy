import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

function initials(title: string) {
  return title.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
}

function isImageUrl(val: string) {
  return val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:");
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Showcasing our best work. Each project reflects our commitment to quality and innovation.
            </p>
          </ScrollReveal>

          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects to display yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <GlassCard className="h-full overflow-hidden group">
                    <div
                      className={`h-48 ${isImageUrl(project.image) ? "" : project.image} flex items-center justify-center relative overflow-hidden`}
                    >
                      {isImageUrl(project.image) ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black/20" />
                          <span className="relative text-4xl font-bold text-white/30 select-none">
                            {initials(project.title)}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.demoUrl && (
                          <Link href={project.demoUrl} target="_blank">
                            <Button size="sm" className="group">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Live Demo
                            </Button>
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link href={project.githubUrl} target="_blank">
                            <Button size="sm" variant="secondary">
                              <Code2 className="h-4 w-4 mr-1" />
                              Code
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
