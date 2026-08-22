'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const whyUsFeatures = [
  {
    title: 'Unmatched Expertise',
    description: 'With over 25 years of experience, we have the knowledge to handle events of any scale and complexity.',
  },
  {
    title: 'Tailored Approach',
    description: 'We believe every event is unique. Our solutions are custom-designed to match your specific vision.',
  },
  {
    title: 'Flawless Execution',
    description: 'From planning to execution, our attention to detail ensures a seamless and stress-free experience.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <span className="font-karla text-[#C8A96E] font-bold tracking-wider uppercase text-sm">
              Why Us
            </span>
          </div>
          
          <h2 className="font-bricolage text-[#1a1a1a] text-4xl lg:text-5xl font-bold mb-10 leading-tight">
            Where expertise meets excellence.
          </h2>

          <div className="space-y-8">
            {whyUsFeatures.map((feature, index) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Star className="w-6 h-6 fill-[#C8A96E] text-[#C8A96E]" />
                  </div>
                  <div>
                    <h3 className="font-bricolage text-2xl font-bold text-[#1a1a1a] mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-karla text-gray-600 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {index < whyUsFeatures.length - 1 && (
                  <hr className="border-gray-200 mt-8" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/about/why-img.webp"
            alt="Why choose DSR Event Planner"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
