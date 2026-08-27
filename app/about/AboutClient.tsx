'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { aboutPageContent, stats } from '@/lib/data';
import { Target, Heart, Lightbulb, ShieldCheck, ArrowRight, Award, Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const iconMap = {
  "Passion for Perfection": Target,
  "Client-Centric Approach": Heart,
  "Innovation & Creativity": Lightbulb,
  "Reliability & Trust": ShieldCheck,
};

export default function AboutClient({ settings }: { settings?: any }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Extract Founders from Settings, with fallbacks
  const founder1 = {
    name: settings?.founder1Name || "Dipankar Ganguly",
    role: settings?.founder1Role || "Co-Founder",
    bio: settings?.founder1Bio || "With a passion for grand celebrations and a meticulous eye for detail, Dipankar has been instrumental in shaping DSR into Kolkata's most trusted event planning brand.",
    image: settings?.founder1Image || "",
    initials: "DG"
  };

  const founder2 = {
    name: settings?.founder2Name || "Subhadeep Chatterjee",
    role: settings?.founder2Role || "Co-Founder",
    bio: settings?.founder2Bio || "Subhadeep brings unparalleled creativity and logistical expertise, ensuring that every event, from corporate seminars to destination weddings, is executed flawlessly.",
    image: settings?.founder2Image || "",
    initials: "SC"
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary)] text-white" ref={containerRef}>
      {/* Creative Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated background blobs */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#C8A96E]/10 blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[100px]"
        />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-[#C8A96E]/30 text-[#C8A96E] font-medium tracking-[0.2em] uppercase mb-10 shadow-[0_0_30px_rgba(200,169,110,0.2)]"
          >
            <Star size={16} className="fill-[#C8A96E]" /> Est. 2000
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold font-heading mb-8 tracking-tight"
          >
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96E] to-[#E3CBA3] italic font-serif">Timeless</span><br/>Memories
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {aboutPageContent.subheading}
          </motion.p>
        </div>
      </section>

      {/* Modern Story Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-[var(--color-primary)] relative rounded-t-[3rem] -mt-10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Collage Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative h-[600px] w-full"
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden bg-[#F5F0EB]">
                <Image
                  src="/images/about/hm-abt-img.webp"
                  alt="DSR Event Planner Story"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-10 -right-10 bg-[var(--color-primary)] text-white p-8 rounded-3xl shadow-2xl max-w-[250px] border border-white/10 hidden md:block"
              >
                <Award className="text-[#C8A96E] mb-4" size={40} />
                <div className="text-3xl font-bold font-heading mb-1">25+</div>
                <div className="text-sm text-[#C8A96E] uppercase tracking-widest">Years of Trust</div>
              </motion.div>
            </motion.div>

            {/* Text Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 lg:pl-10 space-y-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-16 h-[1px] bg-[#C8A96E]"></span>
                <span className="text-[#C8A96E] font-bold tracking-widest uppercase">The Beginning</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 leading-tight">
                From a small spark to a <br/>
                <span className="font-bold italic text-[var(--color-primary)] font-serif">grand legacy.</span>
              </h2>
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed relative">
                <Quote className="absolute -top-6 -left-6 text-[#F5F0EB] w-20 h-20 -z-10 transform rotate-180" />
                {aboutPageContent.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative Founders Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF5] text-[var(--color-primary)] relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-light font-heading mb-6">
              The <span className="font-bold font-serif italic">Visionaries</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-light">The creative minds who built DSR Event Planner.</p>
          </motion.div>
          
          <div className="flex flex-col gap-24 max-w-5xl mx-auto">
            {/* Founder 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/3 relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[var(--color-primary)] relative shadow-2xl">
                  {founder1.image ? (
                    <img src={founder1.image} alt={founder1.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl text-[#C8A96E] font-heading font-bold">{founder1.initials}</div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2rem]"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-2/3 space-y-6"
              >
                <h3 className="text-4xl md:text-5xl font-bold font-heading">{founder1.name}</h3>
                <div className="inline-block px-4 py-1 border border-[#C8A96E] text-[#C8A96E] rounded-full text-sm font-bold tracking-widest uppercase">{founder1.role}</div>
                <p className="text-slate-600 text-xl leading-relaxed font-light">
                  {founder1.bio}
                </p>
              </motion.div>
            </div>

            {/* Founder 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/3 relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-[var(--color-primary)] relative shadow-2xl">
                  {founder2.image ? (
                    <img src={founder2.image} alt={founder2.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl text-[#C8A96E] font-heading font-bold">{founder2.initials}</div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2rem]"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-2/3 space-y-6 text-left md:text-right"
              >
                <h3 className="text-4xl md:text-5xl font-bold font-heading">{founder2.name}</h3>
                <div className="inline-block px-4 py-1 border border-[#C8A96E] text-[#C8A96E] rounded-full text-sm font-bold tracking-widest uppercase">{founder2.role}</div>
                <p className="text-slate-600 text-xl leading-relaxed font-light">
                  {founder2.bio}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Stats Section */}
      <section className="bg-[var(--color-primary)] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/hero/h2.webp')] bg-cover bg-center bg-fixed"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 text-center relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#C8A96E] mb-6 font-serif italic">{stat.value}</div>
              <div className="text-[#C8A96E] font-medium uppercase tracking-[0.2em] text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Elegant Values Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light font-heading mb-4">
              Core <span className="font-bold">Values</span>
            </h2>
            <div className="w-24 h-[1px] bg-[#C8A96E] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutPageContent.values.map((value, index) => {
              const Icon = iconMap[value.title as keyof typeof iconMap] || Target;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#FAFAF5] p-8 rounded-tr-[3rem] rounded-bl-[3rem] hover:-translate-y-4 transition-transform duration-500 border border-black/5 group"
                >
                  <div className="mb-8 opacity-40 group-hover:opacity-100 transition-opacity text-[#C8A96E]">
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-4 text-slate-900">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

