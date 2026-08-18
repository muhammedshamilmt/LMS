import { NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string || `upload-${Date.now()}`;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName,
    });

    return NextResponse.json({ url: uploadResponse.url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
