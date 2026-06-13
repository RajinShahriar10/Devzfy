import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().default("bg-gradient-to-br from-purple-600 to-blue-600"),
  tags: z.array(z.string()).default([]),
  demoUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProjectSchema.parse(body);
    const project = await prisma.project.create({
      data: {
        ...parsed,
        demoUrl: parsed.demoUrl || null,
        githubUrl: parsed.githubUrl || null,
      },
    });
    return NextResponse.json({ success: true, project });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Failed to create project:", error);
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}
