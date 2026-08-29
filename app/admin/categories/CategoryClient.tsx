"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryClient({ initialCategories }: { initialCategories: any[] }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  
  const router = useRouter();

  const handleUpdate = async (id: string) => {
    if (!editName || !editSlug) return;
    setLoading(true);

    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-secret": "dsr_admin_secret_2026" },
      body: JSON.stringify({ name: editName, slug: editSlug }),
    });

    setLoading(false);
    if (res.ok) {
      setEditingId(null);
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update category");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;
    setLoading(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": "dsr_admin_secret_2026" },
      body: JSON.stringify({ name, slug }),
    });

    setLoading(false);
    if (res.ok) {
      setName("");
      setSlug("");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE", headers: { "x-admin-secret": "dsr_admin_secret_2026" } });
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Delete failed");
    }
  };


  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleAdd} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Birthday Party"
              className="w-full px-3 py-2 border rounded" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
              }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border rounded bg-gray-50" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !name || !slug}
            className="bg-slate-900 text-white px-6 py-2 rounded hover:bg-slate-800 disabled:opacity-50 h-[42px]"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialCategories.map((cat) => (
              <tr key={cat._id.toString()}>
                {editingId === cat._id.toString() ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => {
                          setEditName(e.target.value);
                          setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                        }}
                        className="px-2 py-1 border rounded w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="text" 
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="px-2 py-1 border rounded w-full bg-gray-50"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button 
                        onClick={() => handleUpdate(cat._id.toString())}
                        className="text-green-600 hover:text-green-900"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{cat.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button 
                        onClick={() => {
                          setEditingId(cat._id.toString());
                          setEditName(cat.name);
                          setEditSlug(cat.slug);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id.toString())}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {initialCategories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
