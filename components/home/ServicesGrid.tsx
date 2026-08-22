'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { services } from '@/lib/data';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ServicesGrid() {
  // Take only first 3 services for homepage
  const homeServices = services.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAFAF5]">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-[#C8A96E]" />
          <span className="font-karla text-[#C8A96E] font-bold tracking-wider uppercase text-sm">
            Our Services
          </span>
        </div>
        <h2 className="font-bricolage text-[#1a1a1a] text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Comprehensive solutions designed to meet your every need.
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {homeServices.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-[280px] w-[calc(100%-2rem)] overflow-hidden rounded-t-[200px] rounded-b-none mx-auto mt-4">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="p-8 flex-grow text-center">
              <h3 className="font-bricolage text-2xl font-bold text-[#1a1a1a] mb-4">
                {service.title}
              </h3>
              <p className="font-karla text-gray-600 line-clamp-3">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Link
          href="/services"
          className="inline-block bg-[#1a1a1a] hover:bg-[#526354] text-white font-karla font-bold py-4 px-10 rounded-full transition-colors"
        >
          Explore Our Services
        </Link>
      </div>
    </section>
  );
}
