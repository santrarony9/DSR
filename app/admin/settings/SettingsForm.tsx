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
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
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
