'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { heroImages } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
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
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full max-w-7xl mx-auto pt-28 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl relative group" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] min-w-0 aspect-video md:aspect-[21/9] overflow-hidden"
            >
              <div 
                className={`absolute inset-0 w-full h-full transition-transform duration-[10000ms] ease-out origin-center ${
                  index === selectedIndex ? 'scale-110' : 'scale-100'
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
              {index === 0 && (
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
                  <h1 className="text-white text-4xl md:text-6xl font-bold font-bricolage mb-4 drop-shadow-lg">
                    Creating Unforgettable Moments
                  </h1>
                  <p className="text-[#C8A96E] text-xl md:text-2xl font-karla drop-shadow-md">
                    Since 2000
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
