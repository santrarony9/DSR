import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/db";
import Media from "@/lib/models/Media";

export async function GET() {
  await connectToDatabase();
  const media = await Media.find({}).lean();
  return NextResponse.json({ 
    count: media.length, 
    uriUsed: mongoose.connection.client.s.url || mongoose.connection.host || "unknown"
  });
}
