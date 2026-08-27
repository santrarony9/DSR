'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { aboutPageContent, stats } from '@/lib/data';
import { Target, Heart, Lightbulb, ShieldCheck, ArrowRight } from 'lucide-react';

const iconMap = {
  "Passion for Perfection": Target,
  "Client-Centric Approach": Heart,
  "Innovation & Creativity": Lightbulb,
  "Reliability & Trust": ShieldCheck,
};

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[var(--color-primary)] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden flex flex-col justify-center min-h-[40vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage mb-4 text-[#FAFAF5]">
            {aboutPageContent.heading}
          </h1>
          <p className="text-xl md:text-2xl text-[#C8A96E] font-medium max-w-2xl mx-auto">
            {aboutPageContent.subheading}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a]">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              {aboutPageContent.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/about/hm-abt-img.webp"
              alt="DSR Event Planner Founders"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a] mb-4">Meet Our Founders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">The visionaries behind DSR Event Planner who started it all in the year 2000.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center bg-[#F5F0EB] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-32 h-32 bg-[var(--color-primary)] text-[#C8A96E] rounded-full mx-auto flex items-center justify-center text-4xl font-bold font-heading mb-6 shadow-lg border-4 border-white">
                DG
              </div>
              <h3 className="text-2xl font-bold font-bricolage text-[#1a1a1a] mb-2">Dipankar Ganguly</h3>
              <p className="text-[#C8A96E] font-semibold mb-4 tracking-wide uppercase text-sm">Co-Founder</p>
              <p className="text-gray-600">
                With a passion for grand celebrations and a meticulous eye for detail, Dipankar has been instrumental in shaping DSR into Kolkata's most trusted event planning brand.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-[#F5F0EB] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-32 h-32 bg-[var(--color-primary)] text-[#C8A96E] rounded-full mx-auto flex items-center justify-center text-4xl font-bold font-heading mb-6 shadow-lg border-4 border-white">
                SC
              </div>
              <h3 className="text-2xl font-bold font-bricolage text-[#1a1a1a] mb-2">Subhadeep Chatterjee</h3>
              <p className="text-[#C8A96E] font-semibold mb-4 tracking-wide uppercase text-sm">Co-Founder</p>
              <p className="text-gray-600">
                Subhadeep brings unparalleled creativity and logistical expertise, ensuring that every event, from corporate seminars to destination weddings, is executed flawlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#C8A96E] mb-2">{stat.value}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a] mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">The principles that guide every event we plan and every interaction we have with our clients.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutPageContent.values.map((value, index) => {
              const Icon = iconMap[value.title as keyof typeof iconMap] || Target;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a] mb-6">Ready to plan your event?</h2>
          <p className="text-xl text-gray-600 mb-8">Let us help you create an unforgettable experience for you and your guests.</p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-[#b59862] text-white font-bold py-4 px-8 rounded-full transition-colors text-lg"
          >
            Contact Us Today
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
