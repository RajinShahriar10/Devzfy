import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  currency: z.string().default("TK"),
  period: z.string().nullable().optional(),
  features: z.array(z.string()).default([]),
  popular: z.boolean().default(false),
  gradient: z.string().default("from-purple-500 to-blue-500"),
  order: z.number().default(0),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = ServiceSchema.parse(body);
    const service = await prisma.service.update({ where: { id }, data: parsed });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Failed to update service:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
