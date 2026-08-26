"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MediaClient({ categories, initialMedia }: { categories: any[], initialMedia: any[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !categoryId) return alert("Select file and category");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", categoryId);

    const res = await fetch("/api/media", { method: "POST", body: formData });
    setLoading(false);
    
    if (res.ok) {
      setFile(null);
      setCategoryId("");
      router.refresh();
    } else {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload New Media</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex gap-4 items-center">
            <input 
              type="file" 
              accept="image/*,video/*"
              className="border p-2 rounded flex-1" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <select 
              className="border p-2 rounded" 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
              ))}
            </select>
            <button 
              type="submit" 
              disabled={loading || !file || !categoryId}
              className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialMedia.map((m) => (
          <div key={m._id.toString()} className="border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
            <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
              <img src={m.url} alt={m.alt} className="object-cover w-full h-full" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate">{m.alt}</p>
              <p className="text-xs text-gray-500 mb-2">{m.categoryId?.name}</p>
              <button 
                onClick={() => handleDelete(m._id.toString())}
                className="text-red-500 text-xs font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {initialMedia.length === 0 && <p className="col-span-full text-gray-500">No media uploaded yet.</p>}
      </div>
    </>
  );
}
