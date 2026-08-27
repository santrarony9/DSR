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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>
      <CategoryClient initialCategories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}

