import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  email: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
