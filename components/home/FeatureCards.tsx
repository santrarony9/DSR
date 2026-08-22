'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, Recycle, Heart } from 'lucide-react';

const features = [
  {
    title: 'Affordable Rates',
    description: 'We offer competitive pricing without compromising on quality.',
    Icon: DollarSign,
  },
  {
    title: 'Expert Team',
    description: 'Our experienced professionals ensure your event runs smoothly.',
    Icon: Users,
  },
  {
    title: 'Eco-Friendly',
    description: 'We use sustainable practices and materials wherever possible.',
    Icon: Recycle,
  },
  {
    title: 'Passionate Service',
    description: 'We pour our hearts into every event we plan.',
    Icon: Heart,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function FeatureCards() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.Icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[#F5F0EB] rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-[#C8A96E] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon className="text-white w-8 h-8" />
              </div>
              <h3 className="font-bricolage text-[#1a1a1a] font-bold text-xl mb-3">
                {feature.title}
              </h3>
              <p className="font-karla text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
