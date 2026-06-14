import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const url = await uploadToCloudinary(base64);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    }, { status: 500 });
  }
}
