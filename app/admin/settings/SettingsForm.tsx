"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Save, CheckCircle2, Phone, Mail, MapPin, User, Briefcase, FileText, Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [uploadingF1, setUploadingF1] = useState(false);
  const [uploadingF2, setUploadingF2] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    if (res.ok) {
      setMessage("Settings updated successfully!");
      router.refresh();
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Failed to update settings.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, founderField: "founder1Image" | "founder2Image") => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    if (founderField === "founder1Image") setUploadingF1(true);
    else setUploadingF2(true);

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (founderField === "founder1Image") setUploadingF1(false);
    else setUploadingF2(false);

    if (res.ok) {
      const result = await res.json();
      setFormData({ ...formData, [founderField]: result.url });
    } else {
      alert("Failed to upload image.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 sticky top-4 z-50 shadow-md">
          <CheckCircle2 className="text-green-500" /> {message}
        </div>
      )}
      
      {/* Contact Section */}
      <div>
        <h2 className="text-xl font-bold font-heading mb-6 pb-2 border-b">Contact Information (Footer)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              <Phone size={16} className="text-[#C8A96E]" /> Phone Number
            </label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-slate-50" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              <Mail size={16} className="text-[#C8A96E]" /> Email
            </label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-slate-50" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs">
              <MapPin size={16} className="text-[#C8A96E]" /> Address (Footer)
            </label>
            <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E] outline-none transition bg-slate-50" rows={2} value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Founder 1 Section */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold font-heading mb-6">About Page: Founder 1</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><User size={16} className="text-[#C8A96E]"/> Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" value={formData.founder1Name || ""} onChange={(e) => setFormData({ ...formData, founder1Name: e.target.value })} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><Briefcase size={16} className="text-[#C8A96E]"/> Role</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" value={formData.founder1Role || ""} onChange={(e) => setFormData({ ...formData, founder1Role: e.target.value })} />
          </div>
        </div>
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><FileText size={16} className="text-[#C8A96E]"/> Bio</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" rows={3} value={formData.founder1Bio || ""} onChange={(e) => setFormData({ ...formData, founder1Bio: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><ImageIcon size={16} className="text-[#C8A96E]"/> Photo</label>
          {formData.founder1Image ? (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-white">
              <Image src={formData.founder1Image} alt="Founder 1" fill className="object-cover" />
              <button 
                type="button" 
                onClick={() => setFormData({ ...formData, founder1Image: "" })}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <div className="relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, "founder1Image")} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploadingF1}
              />
              <div className="flex items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition text-slate-500 font-medium">
                {uploadingF1 ? "Uploading..." : <><UploadCloud size={20} /> Click to upload image (Max 5MB)</>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Founder 2 Section */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold font-heading mb-6">About Page: Founder 2</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><User size={16} className="text-[#C8A96E]"/> Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" value={formData.founder2Name || ""} onChange={(e) => setFormData({ ...formData, founder2Name: e.target.value })} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><Briefcase size={16} className="text-[#C8A96E]"/> Role</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" value={formData.founder2Role || ""} onChange={(e) => setFormData({ ...formData, founder2Role: e.target.value })} />
          </div>
        </div>
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><FileText size={16} className="text-[#C8A96E]"/> Bio</label>
          <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A96E] outline-none transition" rows={3} value={formData.founder2Bio || ""} onChange={(e) => setFormData({ ...formData, founder2Bio: e.target.value })} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider text-xs"><ImageIcon size={16} className="text-[#C8A96E]"/> Photo</label>
          {formData.founder2Image ? (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-white">
              <Image src={formData.founder2Image} alt="Founder 2" fill className="object-cover" />
              <button 
                type="button" 
                onClick={() => setFormData({ ...formData, founder2Image: "" })}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <div className="relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, "founder2Image")} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploadingF2}
              />
              <div className="flex items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition text-slate-500 font-medium">
                {uploadingF2 ? "Uploading..." : <><UploadCloud size={20} /> Click to upload image (Max 5MB)</>}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full md:w-auto bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl hover:bg-slate-900 disabled:opacity-50 font-bold transition-all shadow-lg hover:shadow-xl sticky bottom-4 z-50"
      >
        <Save size={20} />
        {loading ? "Saving Settings..." : "Save All Settings"}
      </button>
    </form>
  );
}
