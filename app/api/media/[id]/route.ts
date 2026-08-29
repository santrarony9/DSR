import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Media from "@/lib/models/Media";
import { unlink } from "fs/promises";
import path from "path";
import fs from "fs";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectToDatabase();
    const media = await Media.findById(id);
    
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Try to delete the actual file
    try {
      const filepath = path.join(process.cwd(), "public", media.url);
      if (fs.existsSync(filepath)) {
        await unlink(filepath);
      }
    } catch (fsError) {
      console.error("Failed to delete file from disk:", fsError);
    }

    await Media.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { categoryId } = await req.json();

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const media = await Media.findByIdAndUpdate(id, { categoryId }, { new: true });
    if (!media) return NextResponse.json({ error: "Media not found" }, { status: 404 });
    
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}
