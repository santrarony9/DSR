import connectToDatabase from "./db";
import Category from "./models/Category";
import Media from "./models/Media";
import { galleryCategories as fallbackGallery, heroImages as fallbackHero } from "./data";

export async function getGalleryData() {
  try {
    await connectToDatabase();
    
    const dbCategories = await Category.find({}).lean();
    
    if (!dbCategories || dbCategories.length === 0) {
      console.log("No categories in DB, using fallback data");
      return fallbackGallery;
    }

    const formattedGallery = [];
    
    for (const cat of dbCategories) {
      // Exclude homepage-hero from the standard projects portfolio
      if (cat.slug === "homepage-hero") continue;

      const mediaFiles = await Media.find({ categoryId: cat._id }).lean();
      
      formattedGallery.push({
        id: cat.slug,
        label: cat.name,
        images: mediaFiles.map((m: any) => {
          let youtubeId = null;
          if (m.type === "video" || m.url.includes("youtube.com") || m.url.includes("youtu.be")) {
            const match = m.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
            youtubeId = match ? match[1] : null;
          }

          return {
            src: m.url,
            alt: m.alt || cat.name,
            type: m.type || (youtubeId ? "video" : "image"),
            youtubeId
          };
        })
      });
    }

    return formattedGallery;

  } catch (error) {
    console.error("Database connection failed, using fallback gallery data", error);
    return fallbackGallery;
  }
}

export async function getHeroImages() {
  try {
    await connectToDatabase();
    const heroCat = await Category.findOne({ slug: "homepage-hero" }).lean();
    if (!heroCat) return fallbackHero;

    const mediaFiles = await Media.find({ categoryId: heroCat._id, type: { $ne: "video" } }).lean();
    if (!mediaFiles || mediaFiles.length === 0) return fallbackHero;

    return mediaFiles.map((m: any) => ({
      src: m.url,
      alt: m.alt || "Hero Image"
    }));
  } catch (error) {
    return fallbackHero;
  }
}
