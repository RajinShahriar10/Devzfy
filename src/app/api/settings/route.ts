import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultSettings: Record<string, string> = {
  site_name: "Devzfy",
  tagline: "Modern Web Solutions",
  description: "Next-gen web development agency crafting futuristic digital experiences.",
  contact_email: "hello@devzfy.com",
  facebook_url: "https://facebook.com/devzfy",
  linkedin_url: "https://linkedin.com/company/devzfy",
  twitter_url: "https://twitter.com/devzfy",
  github_url: "https://github.com/devzfy",
};

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    for (const [key, val] of Object.entries(defaultSettings)) {
      if (!(key in map)) map[key] = val;
    }
    return NextResponse.json({ settings: map });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ settings: defaultSettings }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body) as [string, string][]) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
