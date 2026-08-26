import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
