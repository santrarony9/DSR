import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Settings from "@/lib/models/Settings";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  await connectToDatabase();
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({ phone: "+91 9831000000", address: "Tollygunge, Kolkata", email: "info@dsreventplanner.com" });
  }

  // Convert to plain object to pass to client component
  const plainSettings = {
    phone: settings.phone,
    address: settings.address,
    email: settings.email,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <SettingsForm initialData={plainSettings} />
      </div>
    </div>
  );
}

