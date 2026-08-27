import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Settings from "@/lib/models/Settings";

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ phone: "+91 1234567890", address: "Kolkata, India", email: "info@dsreventplanner.com" });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await connectToDatabase();
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    if (body.phone !== undefined) settings.phone = body.phone;
    if (body.address !== undefined) settings.address = body.address;
    if (body.email !== undefined) settings.email = body.email;
    
    // Founders
    if (body.founder1Name !== undefined) settings.founder1Name = body.founder1Name;
    if (body.founder1Role !== undefined) settings.founder1Role = body.founder1Role;
    if (body.founder1Bio !== undefined) settings.founder1Bio = body.founder1Bio;
    if (body.founder1Image !== undefined) settings.founder1Image = body.founder1Image;
    
    if (body.founder2Name !== undefined) settings.founder2Name = body.founder2Name;
    if (body.founder2Role !== undefined) settings.founder2Role = body.founder2Role;
    if (body.founder2Bio !== undefined) settings.founder2Bio = body.founder2Bio;
    if (body.founder2Image !== undefined) settings.founder2Image = body.founder2Image;
    
    await settings.save();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

