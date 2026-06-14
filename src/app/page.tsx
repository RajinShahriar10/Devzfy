import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [hero, services, projects, technologies, testimonials] = await Promise.all([
    prisma.heroContent.findFirst(),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.technology.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <HeroSection hero={hero} />
      <ServicesSection services={services} />
      <PortfolioSection projects={projects} />
      <TechnologiesSection technologies={technologies} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
