import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dsreventplanner";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ["image", "video"], default: "image" },
  alt: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
}, { timestamps: true });

async function sync() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
  const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);

  // Clear existing media to rebuild from directories
  await Media.deleteMany({});
  console.log("Cleared existing media");

  // Ensure all categories exist
  const categoriesToEnsure = [
    { name: "Birthday & Rituals", slug: "birthday" },
    { name: "Central & State Government", slug: "government" },
    { name: "Cultural & Corporate", slug: "cultural" },
    { name: "Wedding", slug: "wedding" },
    { name: "Haldi & Mehendi", slug: "haldi" },
    { name: "Homepage Hero", slug: "homepage-hero" },
  ];

  for (const cat of categoriesToEnsure) {
    const exists = await Category.findOne({ slug: cat.slug });
    if (!exists) {
      await Category.create(cat);
      console.log(`Created category: ${cat.name}`);
    }
  }

  // Sync Gallery Images
  const galleryPath = path.join(__dirname, "../public/images/gallery");
  if (fs.existsSync(galleryPath)) {
    const folders = fs.readdirSync(galleryPath);
    for (const folder of folders) {
      const folderPath = path.join(galleryPath, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const category = await Category.findOne({ slug: folder });
        if (category) {
          const files = fs.readdirSync(folderPath);
          for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4"].includes(ext)) {
              const isVideo = ext === ".mp4";
              const url = `/images/gallery/${folder}/${file}`;
              await Media.create({
                url,
                type: isVideo ? "video" : "image",
                alt: `${category.name} decoration`,
                categoryId: category._id,
              });
              console.log(`Added gallery media: ${url}`);
            }
          }
        }
      }
    }
  }

  // Sync Hero Images
  const heroPath = path.join(__dirname, "../public/images/hero");
  if (fs.existsSync(heroPath)) {
    const heroCategory = await Category.findOne({ slug: "homepage-hero" });
    if (heroCategory) {
      const files = fs.readdirSync(heroPath);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4"].includes(ext)) {
          const isVideo = ext === ".mp4";
          const url = `/images/hero/${file}`;
          await Media.create({
            url,
            type: isVideo ? "video" : "image",
            alt: `Hero Image`,
            categoryId: heroCategory._id,
          });
          console.log(`Added hero media: ${url}`);
        }
      }
    }
  }

  console.log("Sync complete!");
  process.exit(0);
}

sync().catch((err) => {
  console.error("Error syncing:", err);
  process.exit(1);
});
