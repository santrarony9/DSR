"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ImagePlus, Youtube, UploadCloud } from "lucide-react";

export default function MediaClient({ categories, initialMedia }: { categories: any[], initialMedia: any[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0]._id.toString() : "");
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
    
    if (uploadType === "image" && !file) {
      setError("Please select an image first.");
      return;
    }
    
    if (uploadType === "video" && !youtubeUrl) {
      setError("Please enter a YouTube link.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("type", uploadType);

    if (uploadType === "image" && file) {
      formData.append("file", file);
    } else if (uploadType === "video") {
      formData.append("youtubeUrl", youtubeUrl);
    }

    const res = await fetch("/api/media", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) {
      setFile(null);
      setYoutubeUrl("");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Form */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold font-heading mb-6">Add New Media</h2>
        
        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm font-medium">{error}</div>}

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="flex gap-4 mb-4">
            <button 
              type="button" 
              onClick={() => setUploadType("image")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${uploadType === "image" ? "bg-[var(--color-primary)] text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
            >
              <ImagePlus size={18} /> Upload Image
            </button>
            <button 
              type="button" 
              onClick={() => setUploadType("video")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${uploadType === "video" ? "bg-red-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
            >
              <Youtube size={18} /> YouTube Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">Assign to Album</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-white" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map(c => (
                  <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
                ))}
              </select>
            </div>

            {uploadType === "image" ? (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">Select Image (Max 5MB)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected && selected.size > 5 * 1024 * 1024) {
                      setError("File is too large! Please select an image under 5MB.");
                      setFile(null);
                    } else {
                      setError("");
                      setFile(selected || null);
                    }
                  }}
                  className="w-full px-4 py-[9px] rounded-xl border border-slate-200 bg-white" 
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">YouTube Link</label>
                <input 
                  type="text" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition bg-white" 
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || categories.length === 0}
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 font-bold transition-all shadow-lg"
          >
            <UploadCloud size={18} />
            {loading ? "Processing..." : "Add to Portfolio"}
          </button>
        </form>
      </div>

      {/* Grid */}
      <h2 className="text-xl font-bold font-heading pt-4">Uploaded Media ({initialMedia.length})</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {initialMedia.map((media) => {
          const isVideo = media.type === "video";
          const ytId = isVideo ? getYouTubeId(media.url) : null;
          
          return (
            <div key={media._id.toString()} className="border rounded-xl overflow-hidden group relative bg-white shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square relative bg-slate-100 flex items-center justify-center">
                {isVideo && ytId ? (
                  <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt="Video Thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <Image src={media.url} alt={media.alt || "Media"} fill className="object-cover" />
                )}
                
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Youtube size={32} className="text-white" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(media._id.toString())}
                    className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50 border-t">
                {media.categoryId?.name || "Unknown Album"}
              </div>
            </div>
          );
        })}
        {initialMedia.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
