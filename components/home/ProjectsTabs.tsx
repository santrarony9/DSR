"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsTabs({ categories }: { categories: any[] }) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const activeCategory = categories.find((c) => c.id === activeTab) || categories[0];

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Our Masterpieces</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore some of the magical moments we have created over the years.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-[#526354] text-white shadow-md transform scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {activeCategory?.images.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl break-inside-avoid group cursor-pointer"
                  onMouseEnter={() => setHoveredImage(idx)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={idx % 3 === 0 ? 800 : idx % 2 === 0 ? 600 : 400}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwAQCdASoIAAUAAUAmJaQAA3AA/v89WAAAAAA="
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${hoveredImage === idx ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white font-medium px-4 py-2 border-2 border-white/50 rounded-full backdrop-blur-sm">
                      View Project
                    </span>
                  </div>
                </div>
              ))}
              {(!activeCategory?.images || activeCategory.images.length === 0) && (
                <p className="text-center text-gray-500 w-full col-span-full">No images available for this category.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
