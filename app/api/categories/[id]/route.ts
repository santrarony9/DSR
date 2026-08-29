import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "dsr_admin_secret_2026";

function isAuthorized(req: Request): boolean {
  const header = req.headers.get("x-admin-secret");
  return header === ADMIN_SECRET;
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectToDatabase();
    
    const mediaCount = await Media.countDocuments({ categoryId: id });
    if (mediaCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with associated media. Delete media first." }, { status: 400 });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    await connectToDatabase();
    
    const existing = await Category.findOne({ slug, _id: { $ne: id } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const category = await Category.findByIdAndUpdate(id, { name, slug }, { new: true });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
