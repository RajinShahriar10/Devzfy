import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
