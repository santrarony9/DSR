"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
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
    } else {
      setMessage("Failed to update settings.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <p className="text-sm font-medium text-green-600">{message}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border rounded" 
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full px-3 py-2 border rounded" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address (Footer)</label>
        <textarea 
          className="w-full px-3 py-2 border rounded" 
          rows={3}
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="pt-6 mt-6 border-t">
        <h3 className="text-lg font-bold mb-4">About Page: Founder 1 (Dipankar)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder1Name || ""} onChange={(e) => setFormData({ ...formData, founder1Name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder1Role || ""} onChange={(e) => setFormData({ ...formData, founder1Role: e.target.value })} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea className="w-full px-3 py-2 border rounded" rows={2} value={formData.founder1Bio || ""} onChange={(e) => setFormData({ ...formData, founder1Bio: e.target.value })} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-gray-400 font-normal">(e.g., https://example.com/image.jpg)</span></label>
          <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder1Image || ""} onChange={(e) => setFormData({ ...formData, founder1Image: e.target.value })} />
        </div>
      </div>

      <div className="pt-6 mt-6 border-t mb-8">
        <h3 className="text-lg font-bold mb-4">About Page: Founder 2 (Subhadeep)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder2Name || ""} onChange={(e) => setFormData({ ...formData, founder2Name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder2Role || ""} onChange={(e) => setFormData({ ...formData, founder2Role: e.target.value })} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea className="w-full px-3 py-2 border rounded" rows={2} value={formData.founder2Bio || ""} onChange={(e) => setFormData({ ...formData, founder2Bio: e.target.value })} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-gray-400 font-normal">(e.g., https://example.com/image.jpg)</span></label>
          <input type="text" className="w-full px-3 py-2 border rounded" value={formData.founder2Image || ""} onChange={(e) => setFormData({ ...formData, founder2Image: e.target.value })} />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
