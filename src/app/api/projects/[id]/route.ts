import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().default("bg-gradient-to-br from-purple-600 to-blue-600"),
  tags: z.array(z.string()).default([]),
  demoUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ProjectSchema.parse(body);
    const project = await prisma.project.update({
      where: { id },
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
    console.error("Failed to update project:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
