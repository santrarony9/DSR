'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { servicesPageContent } from '@/lib/data';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function ServicesClient() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary)] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/services/s2.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 to-[var(--color-primary)]"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-32 pb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#C8A96E]/30 text-[#C8A96E] font-medium text-sm tracking-widest uppercase mb-8">
            <Sparkles size={16} /> Premium Offerings
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8A96E] to-[#E3CBA3] italic font-serif">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            {servicesPageContent.subheading}
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-[var(--color-primary)] rounded-t-[3rem] -mt-10 z-20 relative">
        <div className="max-w-7xl mx-auto space-y-32">
          {servicesPageContent.detailed.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center group`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="relative h-[500px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
                  </div>
                  {/* Decorative element */}
                  <div className={`absolute -z-10 w-full h-full border-2 border-[#C8A96E]/30 rounded-[2rem] top-6 ${isEven ? '-left-6' : '-right-6'} transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2 space-y-8"
                >
                  <div className="text-[#C8A96E] font-bold tracking-widest uppercase text-sm">Service 0{index + 1}</div>
                  <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 leading-tight">
                    {service.title.split(' ').map((word, i, arr) => 
                      i === arr.length - 1 ? <span key={i} className="font-bold italic text-[var(--color-primary)] font-serif"> {word}</span> : word + " "
                    )}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  <div className="w-16 h-[1px] bg-[#C8A96E]/30 my-8"></div>
                  
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="text-[#C8A96E] shrink-0 mt-0.5" size={24} strokeWidth={1.5} />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F0EB] text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-light font-heading text-slate-900 mb-6">
            Ready to <span className="gold-gradient-text font-bold italic font-serif">Celebrate?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 font-light max-w-2xl mx-auto">Get in touch with us to discuss your upcoming event and get a customized proposal designed just for you.</p>
          <Link 
            href="/get-a-free-quote"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg shadow-xl hover:shadow-2xl"
          >
            Get A Free Quote
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

