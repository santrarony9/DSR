import connectToDatabase from "./db";
import Category from "./models/Category";
import Media from "./models/Media";
import { galleryCategories as fallbackGallery } from "./data";

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
