'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { aboutPageContent, stats } from '@/lib/data';
import { Target, Heart, Lightbulb, ShieldCheck, ArrowRight, Award, Star } from 'lucide-react';

const iconMap = {
  "Passion for Perfection": Target,
  "Client-Centric Approach": Heart,
  "Innovation & Creativity": Lightbulb,
  "Reliability & Trust": ShieldCheck,
};

export default function AboutClient({ settings }: { settings?: any }) {
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden flex flex-col justify-center bg-[var(--color-primary)]">
        <div className="absolute inset-0 bg-[url('/images/about/why-img.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 to-[var(--color-primary)]"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#C8A96E] font-medium text-sm tracking-widest uppercase mb-8">
            <Star size={16} className="fill-current" /> Est. 2000
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 text-white tracking-tight">
            {aboutPageContent.heading}
          </h1>
          <p className="text-xl md:text-2xl text-[#FAFAF5]/80 font-light max-w-3xl mx-auto leading-relaxed">
            {aboutPageContent.subheading}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-6">
                Our <span className="gold-gradient-text font-bold">Story</span>
              </h2>
              <div className="w-20 h-1 bg-[#C8A96E]"></div>
            </div>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              {aboutPageContent.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F0EB] flex items-center justify-center">
                <Award className="text-[#C8A96E]" size={32} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">25+ Years</div>
                <div className="text-slate-500 font-medium">Of Excellence</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden shadow-2xl border-8 border-[#F5F0EB]"
          >
            <Image
              src="/images/about/hm-abt-img.webp"
              alt="DSR Event Planner Team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F0EB] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-4">
              Meet Our <span className="gold-gradient-text font-bold">Founders</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">The visionaries behind DSR Event Planner who started it all in the year 2000.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Founder 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group text-center bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              <div className="relative w-40 h-40 mx-auto mb-8 rounded-full p-2 bg-gradient-to-br from-[#C8A96E] to-[#9c7f46] shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full bg-[var(--color-primary)] rounded-full overflow-hidden flex items-center justify-center relative border-4 border-white">
                  {founder1.image ? (
                    <img src={founder1.image} alt={founder1.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#C8A96E] text-4xl font-bold font-heading">{founder1.initials}</span>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-2">{founder1.name}</h3>
              <p className="text-[#C8A96E] font-bold mb-6 tracking-widest uppercase text-xs">{founder1.role}</p>
              <p className="text-slate-600 leading-relaxed">
                {founder1.bio}
              </p>
            </motion.div>

            {/* Founder 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group text-center bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              <div className="relative w-40 h-40 mx-auto mb-8 rounded-full p-2 bg-gradient-to-br from-[#C8A96E] to-[#9c7f46] shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full bg-[var(--color-primary)] rounded-full overflow-hidden flex items-center justify-center relative border-4 border-white">
                  {founder2.image ? (
                    <img src={founder2.image} alt={founder2.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#C8A96E] text-4xl font-bold font-heading">{founder2.initials}</span>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-2">{founder2.name}</h3>
              <p className="text-[#C8A96E] font-bold mb-6 tracking-widest uppercase text-xs">{founder2.role}</p>
              <p className="text-slate-600 leading-relaxed">
                {founder2.bio}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[var(--color-primary)] text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold text-[#C8A96E] mb-4 font-heading">{stat.value}</div>
              <div className="text-white/80 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-4">
              Our Core <span className="gold-gradient-text font-bold">Values</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">The principles that guide every event we plan and every interaction we have with our clients.</p>
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
                  className="group bg-[#F5F0EB] p-10 rounded-3xl hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500"
                >
                  <div className="w-16 h-16 bg-white group-hover:bg-[#C8A96E] rounded-full flex items-center justify-center text-[var(--color-primary)] group-hover:text-white mb-8 transition-colors duration-500 shadow-md">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900 group-hover:text-white transition-colors">{value.title}</h3>
                  <p className="text-slate-600 group-hover:text-white/80 leading-relaxed transition-colors">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[url('/images/hero/h1.webp')] bg-cover bg-center bg-fixed relative text-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Ready to plan your next masterpiece?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Let us help you create an unforgettable experience for you and your guests. Excellence is just a click away.</p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-white hover:text-slate-900 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg shadow-[0_0_20px_rgba(200,169,110,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          >
            Contact Us Today
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

