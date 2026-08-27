"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Youtube } from "lucide-react";

export default function ProjectsClient({ categories }: { categories: any[] }) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const activeCategory = categories.find((cat) => cat.id === activeTab) || categories[0];

  if (!categories || categories.length === 0) return null;

  return (
    <>
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-8 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-500 border ${
                activeTab === category.id
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xl transform scale-105 font-bold"
                  : "bg-white text-slate-500 border-black/10 hover:border-[#C8A96E] hover:text-[#C8A96E] font-medium"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeCategory?.images.map((img: any, idx: number) => {
                const isVideo = img.type === "video" || !!img.youtubeId;
                const thumbnailUrl = isVideo && img.youtubeId ? `https://img.youtube.com/vi/${img.youtubeId}/hqdefault.jpg` : img.src;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white"
                    onClick={() => setSelectedMedia(img)}
                  >
                    <Image
                      src={thumbnailUrl}
                      alt={img.alt || "Portfolio Media"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-sm shadow-xl">
                          <Youtube className="text-white w-8 h-8 ml-1" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                      {!isVideo && (
                        <div className="w-12 h-12 rounded-full bg-[#C8A96E] flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Maximize2 className="text-white w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              {(!activeCategory?.images || activeCategory.images.length === 0) && (
                <p className="text-center text-gray-500 w-full col-span-full py-20 font-light text-lg">No media available in this collection yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary)]/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-[#C8A96E] transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(selectedMedia.type === "video" || selectedMedia.youtubeId) ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt || "Enlarged view"}
                  fill
                  className="object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
