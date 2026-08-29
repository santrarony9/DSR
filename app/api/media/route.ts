import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export const maxDuration = 60;

export async function GET() {
  try {
    await connectToDatabase();
    const media = await Media.find({}).populate("categoryId").sort({ createdAt: -1 });
    return NextResponse.json(media);
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch media", details: (error as any).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


    const formData = await req.formData();
    const categoryId = formData.get("categoryId") as string;
    const type = formData.get("type") as string; // "image" or "video"
    const youtubeUrl = formData.get("url") as string; // in client, video URL is appended as "url"
    
    // Support multiple files
    const files = formData.getAll("files") as File[];
    // Fallback for single file (legacy)
    const singleFile = formData.get("file") as File;
    const uploadFiles = files.length > 0 ? files : (singleFile ? [singleFile] : []);
    
    if (!categoryId) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    await connectToDatabase();

    if (type === "video" && youtubeUrl) {
      // Validate YouTube URL
      const ytMatch = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (!ytMatch) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
      
      const media = await Media.create({ 
        url: youtubeUrl, 
        type: "video", 
        categoryId, 
        alt: "YouTube Video" 
      });
      return NextResponse.json({ success: true, count: 1, media }, { status: 201 });
    }

    if (type === "image" && uploadFiles.length > 0) {
      const uploadedMedia = [];

      for (const file of uploadFiles) {
        // 7MB Limit check per file
        if (file.size > 7 * 1024 * 1024) {
          console.warn(`File ${file.name} skipped: exceeds 7MB limit`);
          continue; 
        }

        let url = "";

        // If Vercel Blob is configured (BLOB_READ_WRITE_TOKEN exists)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
          const blob = await put(file.name, file, { access: "public" });
          url = blob.url;
        } else {
          // Fallback to local storage
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const uploadDir = path.join(process.cwd(), "public/uploads");
          await mkdir(uploadDir, { recursive: true });
          
          const uniqueFilename = `${Date.now()}-${Math.floor(Math.random()*1000)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
          const filepath = path.join(uploadDir, uniqueFilename);
          
          await writeFile(filepath, buffer);
          url = `/uploads/${uniqueFilename}`;
        }

        const media = await Media.create({ url, type: "image", categoryId, alt: file.name });
        uploadedMedia.push(media);
      }

      if (uploadedMedia.length === 0) {
         return NextResponse.json({ error: "No valid images were uploaded (possibly all exceeded 7MB limit)" }, { status: 400 });
      }

      return NextResponse.json({ success: true, count: uploadedMedia.length, media: uploadedMedia }, { status: 201 });
    }

    return NextResponse.json({ error: "No valid file or video link provided" }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process request: " + (error.message || String(error)) }, { status: 500 });
  }
}

