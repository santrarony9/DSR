import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    
    // Check if category has media
    const mediaCount = await Media.countDocuments({ categoryId: params.id });
    if (mediaCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with associated media. Delete media first." }, { status: 400 });
    }

    const category = await Category.findByIdAndDelete(params.id);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
