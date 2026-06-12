import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderCode(): string {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `DVZ-BIZ-${year}-${rand}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const where = q
      ? {
          OR: [
            { businessName: { contains: q, mode: "insensitive" as const } },
            { ownerName: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { orderCode: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {};

    const orders = await prisma.businessOrder.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Failed to fetch business orders:", error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let orderCode = generateOrderCode();

    const existing = await prisma.businessOrder.findUnique({ where: { orderCode } });
    if (existing) {
      orderCode = generateOrderCode();
    }

    const order = await prisma.businessOrder.create({
      data: {
        orderCode,
        businessName: body.businessName,
        ownerName: body.ownerName,
        email: body.email,
        phone: body.phone || null,
        address: body.address || null,
        businessType: body.businessType || null,
        productCategories: body.productCategories || null,
        websiteFeatures: body.websiteFeatures || null,
        preferredDomain: body.preferredDomain || null,
        designStyle: body.designStyle || null,
        socialLinks: body.socialLinks || null,
        additionalNotes: body.additionalNotes || null,
        logoUpload: body.logoUpload || null,
        businessImages: body.businessImages || [],
      },
    });

    return NextResponse.json({ success: true, orderCode: order.orderCode });
  } catch (error) {
    console.error("Failed to create business order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit order" },
      { status: 500 }
    );
  }
}
