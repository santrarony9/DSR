import connectToDatabase from "./db";
import Category from "./models/Category";
import Media from "./models/Media";
import { galleryCategories as fallbackGallery } from "./data";

export async function getGalleryData() {
  try {
    await connectToDatabase();
    
    // Check if we have any categories in DB
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
        images: mediaFiles.map((m: any) => ({
          src: m.url,
          alt: m.alt || cat.name
        }))
      });
    }

    // Filter out categories with no images if desired, but for now just return all
    return formattedGallery;

  } catch (error) {
    console.error("Database connection failed, using fallback gallery data", error);
    return fallbackGallery;
  }
}
