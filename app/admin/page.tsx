import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";
import Link from "next/link";
import { FolderHeart, ImagePlus, UserCog, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  await connectToDatabase();
  const totalCategories = await Category.countDocuments();
  const totalMedia = await Media.countDocuments();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-heading text-slate-900">Welcome Back!</h1>
        <p className="text-slate-500 mt-2 text-lg">Manage your website portfolio and settings from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Step 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <FolderHeart size={48} className="text-[#C8A96E] mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold font-heading mb-2">1. Project Albums</h2>
          <p className="text-slate-500 mb-6 flex-grow">Create and manage your project categories (e.g., "Wedding", "Corporate").</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-900">{totalCategories} <span className="text-lg text-slate-400 font-normal">albums</span></span>
            <Link href="/admin/categories" className="flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[#C8A96E] transition-colors">
              Manage Albums <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
          <ImagePlus size={48} className="text-[#C8A96E] mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold font-heading mb-2">2. Upload Photos</h2>
          <p className="text-slate-500 mb-6 flex-grow">Upload your event photos and assign them to your albums.</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-900">{totalMedia} <span className="text-lg text-slate-400 font-normal">photos</span></span>
            <Link href="/admin/media" className="flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[#C8A96E] transition-colors">
              Manage Photos <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 p-8 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-heading mb-2 flex items-center gap-2"><UserCog size={24} className="text-[#C8A96E]" /> Edit Founders & Contact Info</h3>
          <p className="text-slate-400 text-sm max-w-xl">Update the website phone number, email address, and the founder details that appear on the About Us page.</p>
        </div>
        <Link href="/admin/settings" className="bg-[#C8A96E] text-slate-900 hover:bg-white hover:text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap flex-shrink-0">
          Go to Settings
        </Link>
      </div>
    </div>
  );
}
