'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Bride',
    text: 'DSR Event Planner made our wedding day absolutely perfect. Their attention to detail and creative touches exceeded all our expectations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Corporate Director',
    text: 'We hired DSR for our annual company gala. The execution was flawless, and they handled everything with utmost professionalism.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Birthday Celebrant',
    text: 'I cannot thank the team enough for organizing such a beautiful birthday party. The decor, the catering, everything was spot on!',
    rating: 5,
  },
];

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

export default function TestimonialsGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAFAF5]">
      <div className="text-center mb-16">
        <span className="font-karla text-[#C8A96E] font-bold tracking-wider uppercase text-sm mb-4 block">
          Testimonials
        </span>
        <h2 className="font-bricolage text-[#1a1a1a] text-4xl md:text-5xl font-bold">
          Honest Reviews from our Customers
        </h2>
      </div>

      <div className="relative w-full overflow-hidden pb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* Fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#FAFAF5] to-transparent z-10 hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FAFAF5] to-transparent z-10 hidden sm:block" />
        
        <div className="flex w-[max-content] animate-marquee gap-8">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col w-[350px] shrink-0 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C8A96E] text-[#C8A96E]" />
                ))}
              </div>
              
              <p className="font-karla text-gray-700 italic text-lg mb-8 flex-grow">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-bricolage font-bold text-[#1a1a1a] text-lg">
                    {testimonial.name}
                  </h4>
                  <span className="font-karla text-sm text-gray-500">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
