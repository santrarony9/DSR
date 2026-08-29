import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { getGalleryData } from "@/lib/fetchGallery";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Our Work | DSR Event Planner",
  description: "Browse through our portfolio of beautifully executed weddings, corporate events, and celebrations.",
};

export default async function ProjectsPage() {
  const galleryCategories = await getGalleryData();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary)] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/projects/p1.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 to-[var(--color-primary)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#C8A96E]/30 text-[#C8A96E] font-medium text-sm tracking-widest uppercase mb-8">
            Featured Masterpieces
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96E] to-[#E3CBA3] italic font-serif">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A glimpse into the magical moments we've crafted. From grand destination weddings to flawless corporate setups, see how we bring visions to life.
          </p>
        </div>
      </section>
      
      {/* Client Section */}
      <section className="bg-[#FAFAF5] rounded-t-[3rem] -mt-10 relative z-20 py-20 min-h-[600px] text-slate-900">
        <ProjectsClient categories={galleryCategories} />
      </section>
    </div>
  );
}
