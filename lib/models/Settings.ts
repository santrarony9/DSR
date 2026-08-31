import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  email: { type: String, default: "" },
  
  // Founders
  founder1Name: { type: String, default: "Dipankar Ganguly" },
  founder1Role: { type: String, default: "Co-Founder" },
  founder1Bio: { type: String, default: "With a passion for grand celebrations and a meticulous eye for detail, Dipankar has been instrumental in shaping DSR into Kolkata's most trusted event planning brand." },
  founder1Image: { type: String, default: "" },
  
  founder2Name: { type: String, default: "Subhadeep Chatterjee" },
  founder2Role: { type: String, default: "Co-Founder" },
  founder2Bio: { type: String, default: "Subhadeep brings unparalleled creativity and logistical expertise, ensuring that every event is executed flawlessly." },
  founder2Image: { type: String, default: "" },

  // Hero Images
  heroImages: [{ url: String, alt: String }],

  // YouTube Reels
  youtubeReels: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
