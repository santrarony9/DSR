'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { servicesPageContent } from '@/lib/data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesClient() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#526354] text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden flex flex-col justify-center min-h-[40vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-bricolage mb-4 text-[#FAFAF5]">
            {servicesPageContent.heading}
          </h1>
          <p className="text-xl md:text-2xl text-[#C8A96E] font-medium max-w-2xl mx-auto">
            {servicesPageContent.subheading}
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto space-y-24">
          {servicesPageContent.detailed.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a]">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#C8A96E] shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{feature}</span>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0EB] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-bricolage text-[#1a1a1a] mb-6">Let's Bring Your Vision to Life</h2>
          <p className="text-xl text-gray-600 mb-8">Get in touch with us to discuss your upcoming event and get a customized proposal.</p>
          <Link 
            href="/get-a-free-quote"
            className="inline-flex items-center gap-2 bg-[#526354] hover:bg-[#3f4d41] text-white font-bold py-4 px-8 rounded-full transition-colors text-lg"
          >
            Get A Free Quote
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
