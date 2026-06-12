import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [projects, services, testimonials, technologies, studentOrders, businessOrders, messages, users] =
      await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.testimonial.count(),
        prisma.technology.count(),
        prisma.studentOrder.count(),
        prisma.businessOrder.count(),
        prisma.contactMessage.count(),
        prisma.user.count(),
      ]);

    return NextResponse.json({
      stats: {
        projects,
        services,
        testimonials,
        technologies,
        studentOrders,
        businessOrders,
        messages,
        users,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ stats: null }, { status: 500 });
  }
}
