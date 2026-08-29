"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, ImagePlus, Video, UploadCloud, Edit2 } from "lucide-react";

export default function MediaClient({ categories, initialMedia }: { categories: any[], initialMedia: any[] }) {
  const [files, setFiles] = useState<File[]>([]);
  const [VideoUrl, setVideoUrl] = useState("");
  const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0]._id.toString() : "");
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
    
    if (uploadType === "image" && files.length === 0) {
      setError("Please select at least one image file first.");
      return;
    }
    
    if (uploadType === "video" && !VideoUrl) {
      setError("Please enter a YouTube link.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("categoryId", categoryId);
      formData.append("type", uploadType);
      
      if (uploadType === "image" && files.length > 0) {
        files.forEach(file => formData.append("files", file));
      } else if (uploadType === "video" && VideoUrl) {
        formData.append("url", VideoUrl);
      }

      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "x-admin-secret": "dsr_admin_secret_2026" },
        body: formData,
      });

      if (res.ok) {
        setFiles([]);
        setVideoUrl("");
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add media");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE", headers: { "x-admin-secret": "dsr_admin_secret_2026" } });
    if (res.ok) router.refresh();
  };

  const [editingMedia, setEditingMedia] = useState<string | null>(null);
  const [editCategoryId, setEditCategoryId] = useState("");

  const handleUpdate = async (id: string) => {
    if (!editCategoryId) return;
    setLoading(true);
    const res = await fetch(`/api/media/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-secret": "dsr_admin_secret_2026" },
      body: JSON.stringify({ categoryId: editCategoryId }),
    });
    setLoading(false);
    if (res.ok) {
      setEditingMedia(null);
      router.refresh();
    } else {
      alert("Failed to update media category");
    }
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Form */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2"><UploadCloud className="text-[#C8A96E]"/> Add New Media to Album</h2>
        
        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm font-medium">{error}</div>}

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Step 1: Choose Album */}
            <div>
              <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">1. Select Album</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none bg-white text-slate-900 font-medium" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map(c => (
                  <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Choose Media Type */}
            <div>
              <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">2. What are you adding?</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none bg-white text-slate-900 font-medium" 
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value as "image" | "video")}
              >
                <option value="image">Photos (From my computer)</option>
                <option value="video">A Video (YouTube Link)</option>
              </select>
            </div>
          </div>

          {/* Step 3: File Input or URL Input */}
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            {uploadType === "image" ? (
              <div>
                <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs text-center">3. Choose Photos to Upload (Max 7MB each)</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-[var(--color-primary)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#C8A96E] focus-within:ring-offset-2 hover:text-[#C8A96E]"
                      >
                        <span className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">Click to Select Files</span>
                        <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={(e) => {
                          if (e.target.files) {
                            setFiles(Array.from(e.target.files));
                          }
                        }} />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 mt-4">{files.length > 0 ? <span className="text-green-600 font-bold">Selected: {files.length} file(s)</span> : "PNG, JPG, WEBP up to 7MB"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">3. Paste YouTube Link</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Video className="h-5 w-5 text-red-500" />
                  </div>
                  <input 
                    type="url" 
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" 
                    value={VideoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || (uploadType === "image" ? files.length === 0 : !VideoUrl)}
            className="w-full bg-[#C8A96E] text-slate-900 font-bold py-4 rounded-xl hover:bg-[#b5965d] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-lg shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">Uploading... <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div></span>
            ) : (
              <><UploadCloud size={24} /> {uploadType === "image" ? "Upload Photo(s) to Album" : "Add Video to Album"}</>
            )}
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div>
        <h2 className="text-xl font-bold font-heading mb-6 border-b pb-2">Uploaded Media ({initialMedia.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {initialMedia.map((media) => {
            const isVideo = media.type === "video";
            const videoId = isVideo ? getVideoId(media.url) : null;
            
            return (
              <div key={media._id.toString()} className="group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-visible hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-square relative bg-slate-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                  {isVideo ? (
                    <>
                      {videoId ? (
                        <Image src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Video Thumbnail" fill className="object-cover" />
                      ) : (
                        <Video size={40} className="text-red-400" />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image src={media.url} alt="Gallery image" fill className="object-cover" />
                  )}
                  
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button 
                      onClick={() => {
                        setEditingMedia(media._id.toString());
                        setEditCategoryId(media.categoryId?._id?.toString() || (categories[0]?._id?.toString() || ""));
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-700 transition-transform hover:scale-105 shadow-xl flex items-center gap-2"
                      title="Edit Album"
                    >
                      <Edit2 size={16} /> Change Album
                    </button>
                    <button 
                      onClick={() => handleDelete(media._id.toString())}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-transform hover:scale-110 shadow-xl"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                {editingMedia === media._id.toString() ? (
                  <div className="p-3 bg-blue-50 border-t border-blue-100 relative z-10">
                    <select
                      className="w-full px-2 py-1 mb-2 text-xs rounded border border-blue-200 outline-none"
                      value={editCategoryId}
                      onChange={(e) => setEditCategoryId(e.target.value)}
                    >
                      {categories.map(c => (
                        <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleUpdate(media._id.toString())}
                        className="flex-1 bg-blue-600 text-white text-xs font-bold py-1 rounded hover:bg-blue-700"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setEditingMedia(null)}
                        className="flex-1 bg-slate-300 text-slate-700 text-xs font-bold py-1 rounded hover:bg-slate-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50 border-t truncate rounded-b-xl">
                    {media.categoryId?.name || "Unknown Album"}
                  </div>
                )}
              </div>
            );
          })}
          {initialMedia.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <ImagePlus className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <p className="font-medium text-lg text-slate-700">No media uploaded yet.</p>
              <p className="text-sm">Select an album above and upload some memories!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

