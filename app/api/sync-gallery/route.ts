import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";
import Media from "@/lib/models/Media";

const CATEGORY_NAMES: Record<string, string> = {
  birthday: "Birthday & Rituals",
  government: "Central & State Government",
  cultural: "Cultural & Corporate",
  wedding: "Wedding",
  haldi: "Haldi & Mehendi",
};

export async function GET() {
  try {
    await connectToDatabase();
    
    const galleryPath = path.join(process.cwd(), "public/images/gallery");
    const results = [];

    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ error: "Gallery directory not found" }, { status: 404 });
    }

    const folders = fs.readdirSync(galleryPath);
    
    for (const folder of folders) {
      const folderPath = path.join(galleryPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const categoryName = CATEGORY_NAMES[folder] || folder;
        
        // Ensure category exists
        let category = await Category.findOne({ slug: folder });
        if (!category) {
          category = await Category.create({ name: categoryName, slug: folder });
          results.push(`Created category: ${categoryName}`);
        }
        
        const files = fs.readdirSync(folderPath);
        let addedCount = 0;
        
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm"].includes(ext)) {
            const isVideo = ext === ".mp4" || ext === ".webm";
            const url = `/images/gallery/${folder}/${file}`;
            
            // Check if media already exists to prevent duplicates
            const existingMedia = await Media.findOne({ url });
            if (!existingMedia) {
              await Media.create({
                url,
                type: isVideo ? "video" : "image",
                alt: `${categoryName} decoration`,
                categoryId: category._id,
              });
              addedCount++;
            }
          }
        }
        
        if (addedCount > 0) {
          results.push(`Added ${addedCount} media files to category: ${categoryName}`);
        }
      }
    }

    // Sync hero images as well
    const heroPath = path.join(process.cwd(), "public/images/hero");
    if (fs.existsSync(heroPath)) {
      let heroCategory = await Category.findOne({ slug: "homepage-hero" });
      if (!heroCategory) {
        heroCategory = await Category.create({ name: "Homepage Hero", slug: "homepage-hero" });
        results.push(`Created category: Homepage Hero`);
      }

      const files = fs.readdirSync(heroPath);
      let addedCount = 0;
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm"].includes(ext)) {
          const isVideo = ext === ".mp4" || ext === ".webm";
          const url = `/images/hero/${file}`;
          
          const existingMedia = await Media.findOne({ url });
          if (!existingMedia) {
            await Media.create({
              url,
              type: isVideo ? "video" : "image",
              alt: `Hero Image`,
              categoryId: heroCategory._id,
            });
            addedCount++;
          }
        }
      }
      if (addedCount > 0) {
        results.push(`Added ${addedCount} hero media files`);
      }
    }

    return NextResponse.json({ success: true, message: "Sync completed successfully", results });
  } catch (error: any) {
    console.error("Sync error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
