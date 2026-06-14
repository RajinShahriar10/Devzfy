import { PrismaClient } from "../src/prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminEmail = "admin@devzfy.com";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashed,
        role: "admin",
      },
    });
    console.log("Admin user created: admin@devzfy.com / admin123");
  }

  const heroCount = await prisma.heroContent.count();
  if (heroCount === 0) {
    await prisma.heroContent.create({
      data: {
        badge: "Modern Web Solutions for Everyone",
        title: "Build Your Digital Future",
        subtitle: "Modern Web Solutions for Students, Professionals and Businesses.",
        ctaText: "Get Started",
        ctaLink: "/contact",
        cta2Text: "View Projects",
        cta2Link: "/#projects",
      },
    });
    console.log("Hero content seeded.");
  }

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: "Student Package",
          price: "900",
          currency: "TK",
          description: "Perfect for students starting their professional journey.",
          features: ["Dynamic Portfolio", "Professional CV", "ATS Friendly Resume", "Cover Letter"],
          gradient: "from-purple-500 to-blue-500",
          order: 0,
        },
        {
          title: "Business Startup Package",
          price: "300",
          currency: "TK",
          period: "/ Month",
          description: "Kickstart your business with a professional online presence.",
          features: ["Ecommerce Website", "5000 Facebook Followers"],
          gradient: "from-blue-500 to-cyan-500",
          popular: true,
          order: 1,
        },
      ],
    });
    console.log("Services seeded.");
  }

  const settingsCount = await prisma.siteSetting.count();
  if (settingsCount === 0) {
    await prisma.siteSetting.createMany({
      data: [
        { key: "site_name", value: "Devzfy" },
        { key: "tagline", value: "Modern Web Solutions" },
        { key: "description", value: "Next-gen web development agency crafting futuristic digital experiences." },
        { key: "contact_email", value: "hello@devzfy.com" },
        { key: "facebook_url", value: "https://facebook.com/devzfy" },
        { key: "linkedin_url", value: "https://linkedin.com/company/devzfy" },
        { key: "twitter_url", value: "https://twitter.com/devzfy" },
        { key: "github_url", value: "https://github.com/devzfy" },
      ],
    });
    console.log("Settings seeded.");
  }

  const seoCount = await prisma.sEOSettings.count();
  if (seoCount === 0) {
    await prisma.sEOSettings.create({ data: {} });
    console.log("SEO settings seeded.");
  }

  const techCount = await prisma.technology.count();
  if (techCount === 0) {
    await prisma.technology.createMany({
      data: [
        { name: "HTML", icon: "html", category: "Language", order: 0 },
        { name: "CSS", icon: "css", category: "Styling", order: 1 },
        { name: "JavaScript", icon: "javascript", category: "Language", order: 2 },
        { name: "TypeScript", icon: "typescript", category: "Language", order: 3 },
        { name: "React", icon: "react", category: "Frontend", order: 4 },
        { name: "Next.js", icon: "nextjs", category: "Framework", order: 5 },
        { name: "Node.js", icon: "nodejs", category: "Runtime", order: 6 },
        { name: "PostgreSQL", icon: "postgresql", category: "Database", order: 7 },
        { name: "Prisma", icon: "prisma", category: "ORM", order: 8 },
        { name: "Tailwind CSS", icon: "tailwindcss", category: "Styling", order: 9 },
        { name: "Framer Motion", icon: "framermotion", category: "Animation", order: 10 },
        { name: "NextAuth.js", icon: "nextauth", category: "Authentication", order: 11 },
        { name: "Cloudinary", icon: "cloudinary", category: "Media", order: 12 },
        { name: "Neon", icon: "neon", category: "Database", order: 13 },
        { name: "Zustand", icon: "zustand", category: "State", order: 14 },
        { name: "Radix UI", icon: "radixui", category: "Components", order: 15 },
        { name: "Lucide", icon: "lucide", category: "Icons", order: 16 },
        { name: "Zod", icon: "zod", category: "Validation", order: 17 },
        { name: "Git", icon: "git", category: "Version Control", order: 18 },
        { name: "npm", icon: "npm", category: "Package Manager", order: 19 },
      ],
    });
    console.log("Technologies seeded.");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
