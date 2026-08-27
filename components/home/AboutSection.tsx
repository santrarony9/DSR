'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { aboutPreview } from '@/lib/data';

export default function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column - Images */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md mx-auto lg:max-w-none w-full pb-16 pr-16"
        >
          <div className="relative aspect-[4/5] rounded-t-[1000px] rounded-b-3xl overflow-hidden border-8 border-white shadow-xl z-10">
            <Image
              src={aboutPreview.images.main}
              alt="Event planning"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 aspect-square rounded-3xl overflow-hidden border-8 border-white shadow-2xl z-20">
            <Image
              src={aboutPreview.images.secondary}
              alt="Decoration detail"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-2 border-[#C8A96E]/30 rounded-3xl -z-10" />
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-[#C8A96E]" />
            <span className="font-karla text-[#C8A96E] font-bold tracking-wider uppercase text-sm">
              About us
            </span>
          </div>
          
          <h2 className="font-bricolage text-[#1a1a1a] text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Welcome to DSR Event Planner
          </h2>
          
          <div className="space-y-4 mb-8 font-karla text-gray-600 text-lg">
            {aboutPreview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link
              href="/about"
              className="inline-block bg-[var(--color-primary)] hover:bg-[#404f42] text-white font-karla font-bold py-4 px-8 rounded-full transition-colors"
            >
              Learn More
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo/25years-badge.png"
                  alt="25 Years Experience"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bricolage font-bold text-[#1a1a1a] text-xl">
                25 Years <br />
                <span className="text-[#C8A96E] font-normal text-base">of Experience</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
