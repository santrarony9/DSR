import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderHeart, ImagePlus, UserCog, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 text-2xl font-bold border-b border-slate-700 font-heading tracking-wide text-[#C8A96E]">
          DSR Admin
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          <Link href="/admin" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-colors font-medium">
            <LayoutDashboard size={20} className="text-[#C8A96E]" />
            Home Dashboard
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-colors font-medium">
            <FolderHeart size={20} className="text-[#C8A96E]" />
            1. Project Albums
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-colors font-medium">
            <ImagePlus size={20} className="text-[#C8A96E]" />
            2. Upload Photos
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-colors font-medium">
            <UserCog size={20} className="text-[#C8A96E]" />
            Website Settings
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-700 bg-slate-950">
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">Account</div>
          <div className="text-sm truncate mb-4 font-medium">{session.user?.email}</div>
          <Link href="/api/auth/signout" className="flex items-center justify-center gap-2 w-full p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <LogOut size={16} /> Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
