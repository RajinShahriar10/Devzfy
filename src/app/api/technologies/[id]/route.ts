import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const tech = await prisma.technology.update({
      where: { id },
      data: {
        name: body.name,
        icon: body.icon,
        category: body.category,
        order: body.order,
      },
    });
    return NextResponse.json({ success: true, technology: tech });
  } catch (error) {
    console.error("Failed to update technology:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update technology" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.technology.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete technology:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete technology" },
      { status: 500 }
    );
  }
}
