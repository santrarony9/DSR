"use client";

import { Star } from "lucide-react";

const googleReviews = [
  { name: "Sandip Dey", text: "খুব সুন্দর একটি কাজ হয়েছে।আমি খুবই সন্তুষ্ট, ডেকোরেশন এবং খাওয়াদাওয়া সব দিক দিয়েই 100 এর মধ্যে 100 শতাংশ হয়েছে।DSR EVENT PLANNER TEAM কে আমার তরফ থেকে অজস্র ধন্যবাদ।", rating: 5, time: "5 months ago" },
  { name: "Zorvien HealthTech", text: "Best event management company in south kolkata. Budget friendly & Personal care.", rating: 5, time: "3 weeks ago" },
  { name: "KUNDAN POKAR", text: "Best event planner in town all type of service available. Used for my cousin wedding the process and booking was seamless ... quality of food was excellence .. decoration was top notch ..", rating: 5, time: "a year ago" },
  { name: "Priya M.", text: "Our company's annual event was handled seamlessly by DSR. From stage setup to catering and AV support, everything was perfect. Highly reliable team.", rating: 5, time: "3 months ago" },
  { name: "Ritika & Souvik", text: "DSR Event Planner managed our wedding perfectly from start to finish. The décor, catering, and overall coordination were beyond our expectations. Truly a stress-free experience.", rating: 5, time: "2 months ago" },
  { name: "Vikram & Neha", text: "The team's creative ideas and cooperative nature made our anniversary celebration truly special. They listened to our requirements and delivered more than what we imagined.", rating: 5, time: "6 months ago" },
  { name: "Ananya D.", text: "Their team was extremely professional and ensured our event was executed within our budget without compromising on quality. We were impressed by their time management and attention to detail.", rating: 5, time: "8 months ago" },
  { name: "Rohit S.", text: "They organized my child's birthday party beautifully, handling everything from decorations to entertainment. It was a memorable day for our family and guests.", rating: 5, time: "10 months ago" },
  { name: "Mayur Mukherjee", text: "Very nice Highly satisfied yours service.", rating: 5, time: "a month ago" },
];

export default function TestimonialsGrid() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-light font-heading text-slate-900 mb-4">
          Client <span className="gold-gradient-text font-bold">Love</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl font-bold">5.0</span>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
          </div>
        </div>
        <p className="text-slate-500">Based on Google Reviews</p>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-6 px-3">
          {[...googleReviews, ...googleReviews].map((review, idx) => (
            <div 
              key={idx} 
              className="w-[350px] flex-shrink-0 bg-[#F5F0EB] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.time}</p>
                  </div>
                </div>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
