import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  await connectToDatabase();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const mediaFiles = await Media.find({}).populate("categoryId").sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Management</h1>
      </div>
      <MediaClient categories={JSON.parse(JSON.stringify(categories))} initialMedia={JSON.parse(JSON.stringify(mediaFiles))} />
    </div>
  );
}
