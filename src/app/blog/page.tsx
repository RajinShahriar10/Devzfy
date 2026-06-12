import { BlogSection } from "@/components/sections/BlogSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Blog() {
  return (
    <section className="relative pt-32 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Insights, tutorials, and updates from the Devzfy team.
          </p>
        </ScrollReveal>
        <BlogSection />
      </div>
    </section>
  );
}
