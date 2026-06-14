import { prisma } from "@/lib/prisma";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { Check } from "lucide-react";

const processes = [
  { step: "01", title: "Discovery", description: "We learn about your business, goals, and vision." },
  { step: "02", title: "Strategy", description: "We create a roadmap tailored to your needs." },
  { step: "03", title: "Design", description: "We craft beautiful, user-centered designs." },
  { step: "04", title: "Development", description: "We build with cutting-edge technology." },
  { step: "05", title: "Launch", description: "We deploy and optimize for peak performance." },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Node.js",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Framer Motion",
  "AWS", "Docker", "Redis", "GraphQL",
];

export default async function Services() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              End-to-end digital solutions tailored to your business needs.
            </p>
          </ScrollReveal>

          <ServicesSection services={services} />

          <ScrollReveal className="mt-24">
            <h2 className="text-2xl font-bold text-center mb-8">
              Our <span className="text-gradient">Process</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
              {processes.map((p) => (
                <GlassCard key={p.step}>
                  <div className="text-3xl font-bold text-gradient mb-2">{p.step}</div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.description}</p>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-8">
              Our <span className="text-gradient">Tech Stack</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <GlassCard key={tech} hover={false} className="!p-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{tech}</span>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
