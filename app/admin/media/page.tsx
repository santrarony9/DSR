import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  await connectToDatabase();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const mediaFiles = await Media.find({}).populate("categoryId").sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900">Upload Photos</h1>
        <p className="text-slate-500 mt-2">Upload your event photos here and assign them to an album. They will instantly appear on the website Portfolio!</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <MediaClient categories={JSON.parse(JSON.stringify(categories))} initialMedia={JSON.parse(JSON.stringify(mediaFiles))} />
      </div>
    </div>
  );
}
