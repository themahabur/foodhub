import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("UPLOAD HIT");

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.log("NO FILE");
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    console.log("FILE:", file.name, file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API KEY:", process.env.CLOUDINARY_API_KEY?.slice(0, 5));

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "foodhub" },
        (error, result) => {
          if (error) {
            console.error("❌ CLOUDINARY ERROR:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error("❌ ROUTE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}