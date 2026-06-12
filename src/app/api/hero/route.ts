import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const HeroSchema = z.object({
  badge: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  ctaText: z.string().min(1),
  ctaLink: z.string().min(1),
  cta2Text: z.string().min(1),
  cta2Link: z.string().min(1),
});

export async function GET() {
  try {
    let hero = await prisma.heroContent.findFirst();
    if (!hero) {
      hero = await prisma.heroContent.create({
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
    }
    return NextResponse.json({ hero });
  } catch (error) {
    console.error("Failed to fetch hero:", error);
    return NextResponse.json({ hero: null }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = HeroSchema.parse(body);
    let hero = await prisma.heroContent.findFirst();
    if (hero) {
      hero = await prisma.heroContent.update({ where: { id: hero.id }, data: parsed });
    } else {
      hero = await prisma.heroContent.create({ data: parsed });
    }
    return NextResponse.json({ success: true, hero });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Failed to update hero:", error);
    return NextResponse.json({ success: false, error: "Failed to update hero" }, { status: 500 });
  }
}
