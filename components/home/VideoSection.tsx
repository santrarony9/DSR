'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VideoSection() {
  return (
    <section className="py-20 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/c-cRAAPZKb4"
              title="DSR Event Planner Promotional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden shadow-xl lg:h-full lg:aspect-auto"
          >
            <Image
              src="/images/misc/promo-banner.jpg"
              alt="DSR Promotional Banner"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
