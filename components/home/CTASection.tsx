'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 bg-[url('/images/hero/w25.webp')] bg-fixed bg-center bg-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-0" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96E] rounded-full mix-blend-overlay filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8A96E] rounded-full mix-blend-overlay filter blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 relative bg-white rounded-full p-2 shadow-lg">
            <Image
              src="/images/logo/dsr-events-badge.png"
              alt="DSR Events Badge"
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        <h2 className="font-bricolage text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Create Your <br className="hidden sm:block" /> Dream Event?
        </h2>
        
        <p className="font-karla text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Let's turn your vision into an unforgettable reality. Contact us today for a free consultation and let our experts handle the details.
        </p>

        <Link
          href="/get-a-free-quote"
          className="inline-block bg-white hover:bg-gray-100 text-[#1a1a1a] font-karla font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg"
        >
          Get A Free Quote
        </Link>
      </motion.div>
    </section>
  );
}
