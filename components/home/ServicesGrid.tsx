"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { motion } from "framer-motion";

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F5F0EB]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-6">
            Bespoke <span className="gold-gradient-text font-bold">Services</span>
          </h2>
          <p className="text-lg text-slate-600">
            From intimate gatherings to grand celebrations, we provide comprehensive event planning services tailored to your unique vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-[#C8A96E] w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg relative p-2">
                    {/* Render the icon image */}
                    <div className="relative w-full h-full">
                      <Image 
                        src={service.icon} 
                        alt="icon" 
                        fill
                        className="object-contain brightness-0 invert" 
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-heading">{service.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 mb-6 line-clamp-3">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-[#C8A96E] transition-colors group/link"
                >
                  Discover More 
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
