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

  const plainSettings = {
    phone: settings.phone,
    address: settings.address,
    email: settings.email,
    founder1Name: settings.founder1Name,
    founder1Role: settings.founder1Role,
    founder1Bio: settings.founder1Bio,
    founder1Image: settings.founder1Image,
    founder2Name: settings.founder2Name,
    founder2Role: settings.founder2Role,
    founder2Bio: settings.founder2Bio,
    founder2Image: settings.founder2Image,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900">Website Settings</h1>
        <p className="text-slate-500 mt-2">Update your contact information and founder details here.</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-4xl">
        <SettingsForm initialData={plainSettings} />
      </div>
    </div>
  );
}
