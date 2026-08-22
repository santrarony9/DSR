'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryCategories } from '@/lib/data';

export default function ProjectsClient() {
  const [activeTab, setActiveTab] = useState(galleryCategories[0].id);

  const activeCategory = galleryCategories.find(cat => cat.id === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF5]">
      <section className="bg-[#526354] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden flex flex-col justify-center min-h-[30vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage mb-4 text-[#FAFAF5]">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-[#C8A96E] font-medium max-w-2xl mx-auto">
            A glimpse into the magical moments we've created
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-3 sm:flex-wrap sm:justify-center">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-[#C8A96E] text-white shadow-md'
                    : 'bg-[#F5F0EB] text-gray-700 hover:bg-[#e8e2db]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {activeCategory?.images.map((image, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
