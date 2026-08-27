import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-slate-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block p-3 rounded hover:bg-slate-800">Dashboard</Link>
          <Link href="/admin/categories" className="block p-3 rounded hover:bg-slate-800">Categories</Link>
          <Link href="/admin/media" className="block p-3 rounded hover:bg-slate-800">Media</Link>
          <Link href="/admin/settings" className="block p-3 rounded hover:bg-slate-800">Settings</Link>
        </nav>
        <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
          Logged in as {session.user?.email}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

