import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  await connectToDatabase();
  const catCount = await Category.countDocuments();
  const mediaCount = await Media.countDocuments();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Categories</h2>
          <p className="text-4xl font-bold text-slate-900 mt-2">{catCount}</p>
          <Link href="/admin/categories" className="text-blue-600 hover:underline mt-4 inline-block">Manage Categories &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Media Files</h2>
          <p className="text-4xl font-bold text-slate-900 mt-2">{mediaCount}</p>
          <Link href="/admin/media" className="text-blue-600 hover:underline mt-4 inline-block">Manage Media &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
