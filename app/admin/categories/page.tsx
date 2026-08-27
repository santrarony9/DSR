import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  await connectToDatabase();
  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900">Project Albums</h1>
        <p className="text-slate-500 mt-2">Create albums like "Weddings", "Corporate Events" to organize your photos.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <CategoryClient initialCategories={JSON.parse(JSON.stringify(categories))} />
      </div>
    </div>
  );
}
