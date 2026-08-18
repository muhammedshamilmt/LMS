import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Send event to Inngest
    await inngest.send({
      name: "course/video.uploaded",
      data: {
        jobId: body.jobId,
        courseId: body.courseId,
        filePath: body.filePath,
        fileName: body.fileName,
        type: body.type,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
