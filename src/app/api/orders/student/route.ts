import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderCode(): string {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `DVZ-STU-${year}-${rand}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const where = q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { orderCode: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {};

    const orders = await prisma.studentOrder.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        awards: true,
        certificates: true,
        research: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let orderCode = generateOrderCode();

    const existing = await prisma.studentOrder.findUnique({ where: { orderCode } });
    if (existing) {
      orderCode = generateOrderCode();
    }

    const order = await prisma.studentOrder.create({
      data: {
        orderCode,
        fullName: body.fullName,
        profileImage: body.profileImage || null,
        address: body.address || null,
        email: body.email,
        phone: body.phone || null,
        githubUrl: body.githubUrl || null,
        linkedinUrl: body.linkedinUrl || null,
        degree: body.educations?.[0]?.degree || body.degree || null,
        institution: body.educations?.[0]?.institution || body.institution || null,
        educationStartDate: body.educations?.[0]?.educationStartDate || body.educationStartDate || null,
        educationEndDate: body.educations?.[0]?.educationEndDate || body.educationEndDate || null,
        company: body.experiences?.[0]?.company || body.company || null,
        position: body.experiences?.[0]?.position || body.position || null,
        duration: body.experiences?.[0]?.duration || body.duration || null,
        experienceDescription: body.experiences?.[0]?.experienceDescription || body.experienceDescription || null,
        skills: body.skills || [],
        activities: body.activities || [],
        additionalNotes: body.additionalNotes || null,
      },
    });

    if (body.awards && Array.isArray(body.awards)) {
      await prisma.studentAward.createMany({
        data: body.awards.map((a: { name: string; date?: string; image?: string }) => ({ ...a, orderId: order.id })),
      });
    }
    if (body.certificates && Array.isArray(body.certificates)) {
      await prisma.studentCertificate.createMany({
        data: body.certificates.map((c: { name: string; date?: string; file?: string }) => ({ ...c, orderId: order.id })),
      });
    }
    if (body.research && Array.isArray(body.research)) {
      await prisma.studentResearch.createMany({
        data: body.research.map((r: { title: string; role?: string; date?: string; conference?: string; publicationUrl?: string }) => ({ ...r, orderId: order.id })),
      });
    }

    return NextResponse.json({ success: true, orderCode: order.orderCode });
  } catch (error) {
    console.error("Failed to create student order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit order" },
      { status: 500 }
    );
  }
}
