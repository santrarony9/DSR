"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { heroImages } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="h-full relative group" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] h-full min-w-0"
            >
              <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-[12000ms] ease-out origin-center ${
                  index === selectedIndex ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Hero image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
                {index === selectedIndex && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-3xl"
                  >
                    <p className="text-white text-sm md:text-lg uppercase tracking-[0.3em] mb-4">
                      Est. 2000
                    </p>
                    <h1 className="text-white text-5xl md:text-7xl font-light font-bricolage mb-8 leading-tight drop-shadow-lg">
                      Creating <span className="gold-gradient-text font-bold">Unforgettable</span> Moments
                    </h1>
                    <Link
                      href="/contact"
                      className="btn-gold inline-block px-10 py-4 uppercase tracking-widest text-sm font-semibold"
                    >
                      Plan Your Event
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 transition-all rounded-full ${
                index === selectedIndex ? "w-8 bg-[#C8A96E]" : "w-4 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
