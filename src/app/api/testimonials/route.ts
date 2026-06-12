import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json({ testimonials: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role || "",
        company: body.company || "",
        content: body.content,
        avatar: body.avatar || "",
        rating: body.rating ?? 5,
      },
    });
    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
