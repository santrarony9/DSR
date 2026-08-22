'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryCategories } from '@/lib/data';

export default function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState(galleryCategories[0].id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeCategory = galleryCategories.find(c => c.id === activeTab) || galleryCategories[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-karla text-[#C8A96E] font-bold tracking-wider uppercase text-sm mb-4 block">
          Our Projects
        </span>
        <h2 className="font-bricolage text-[#1a1a1a] text-4xl md:text-5xl font-bold">
          Our Stunning Projects
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {galleryCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`font-karla font-bold py-3 px-8 rounded-full transition-all duration-300 ${
              activeTab === category.id
                ? 'bg-[#C8A96E] text-white shadow-md'
                : 'bg-[#FAFAF5] text-[#1a1a1a] hover:bg-[#F5F0EB]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div layout className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {activeCategory.images.slice(0, 6).map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img.src)}
                className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold">View</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-video md:aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Fullscreen project image"
                fill
                className="object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#C8A96E] font-bold text-xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-12">
        <Link
          href="/projects"
          className="inline-block bg-[#526354] hover:bg-[#404f42] text-white font-karla font-bold py-4 px-10 rounded-full transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
