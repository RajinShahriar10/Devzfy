import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ technologies });
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
    return NextResponse.json({ technologies: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tech = await prisma.technology.create({
      data: {
        name: body.name,
        icon: body.icon || "code",
        category: body.category || "Frontend",
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ success: true, technology: tech });
  } catch (error) {
    console.error("Failed to create technology:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create technology" },
      { status: 500 }
    );
  }
}
