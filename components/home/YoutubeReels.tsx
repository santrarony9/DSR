"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function YoutubeReels({ reels }: { reels: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!reels || reels.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320; // width of one card + gap
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    // extract ID from shorts or watch URLs
    let id = "";
    if (url.includes("/shorts/")) {
      id = url.split("/shorts/")[1].split("?")[0];
    } else if (url.includes("v=")) {
      id = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1].split("?")[0];
    }
    
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <section className="py-24 bg-[#111111] overflow-hidden relative border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-light font-heading text-white mb-4">
          Latest <span className="gold-gradient-text font-bold">Reels</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Catch glimpses of our magical moments and behind-the-scenes action.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 group">
        <button 
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black text-white p-3 rounded-r-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 pt-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reels.map((url, idx) => {
            const embedUrl = getYoutubeEmbedUrl(url);
            if (!embedUrl) return null;

            return (
              <div 
                key={idx} 
                className="w-[280px] md:w-[320px] flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 bg-black"
                style={{ aspectRatio: "9/16" }}
              >
                <iframe
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black text-white p-3 rounded-l-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
