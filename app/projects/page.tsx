import { Metadata } from 'next';
import ProjectsClient from "./ProjectsClient";
import { getGalleryData } from "@/lib/fetchGallery";

export const metadata = {
  title: "Our Work | DSR Event Planner",
  description: "Browse through our portfolio of beautifully executed weddings, corporate events, and celebrations.",
};

export default async function ProjectsPage() {
  const galleryCategories = await getGalleryData();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Our Portfolio
          </h1>
          <p className="text-lg text-slate-600">
            A glimpse into the magical moments we've crafted. From grand destination weddings to flawless corporate setups, see how we bring visions to life.
          </p>
        </div>
      </div>
      
      <ProjectsClient categories={galleryCategories} />
    </div>
  );
}
