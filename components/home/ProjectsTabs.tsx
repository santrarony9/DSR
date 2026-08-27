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
    <section className="py-24 bg-[#FAFAF5]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-4">
            Our <span className="gold-gradient-text font-bold">Masterpieces</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore some of the magical moments we have created over the years.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-[var(--color-primary)] text-white shadow-md transform scale-105"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
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
              className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 gallery-container"
            >
              {activeCategory?.images.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className="gallery-item relative overflow-hidden rounded-2xl break-inside-avoid group cursor-pointer shadow-sm hover:shadow-xl"
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
                  <div className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center ${hoveredImage === idx ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white font-medium px-6 py-3 border border-white/50 rounded-full bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-colors">
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
