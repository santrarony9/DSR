import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Media from "@/lib/models/Media";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const maxDuration = 60; // 1 minute max duration for large uploads

export async function GET() {
  try {
    await connectToDatabase();
    const media = await Media.find({}).populate("categoryId").sort({ createdAt: -1 });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const categoryId = formData.get("categoryId") as string;
    
    if (!file || !categoryId) {
      return NextResponse.json({ error: "File and categoryId are required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filepath = path.join(uploadDir, uniqueFilename);
    
    await writeFile(filepath, buffer);
    const url = `/uploads/${uniqueFilename}`;

    await connectToDatabase();
    const media = await Media.create({ url, categoryId, alt: file.name });
    
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

