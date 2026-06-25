'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Working with Abhay and the Avora team was a game-changer. They streamlined our entire operation and set us up for scalable growth. The strategic insight is unparalleled.",
    author: "Michael Roberts",
    role: "VP of Operations, TechFlow (USA)",
    avatar: "MR",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "The deep understanding of both manufacturing constraints and modern data science allowed them to deliver an incredibly effective optimization model for our supply chain.",
    author: "Kenji Sato",
    role: "Director of Engineering, Industrial Solutions (Japan)",
    avatar: "KS",
    color: "bg-red-100 text-red-700",
  },
  {
    quote: "Avora fundamentally transformed how we approach AI. Their ability to bridge complex technical challenges with business realities is exactly what we needed in the APAC market.",
    author: "Priya Sharma",
    role: "CTO, FinEdge Innovations (India)",
    avatar: "PS",
    color: "bg-orange-100 text-orange-700",
  },
  {
    quote: "Their specialized talent sourcing helped us build a high-performing remote engineering team in record time. We couldn't have scaled our platform without them.",
    author: "David Jenkins",
    role: "Founder, ScaleTech (USA)",
    avatar: "DJ",
    color: "bg-emerald-100 text-emerald-700",
  }
];

export default function Testimonials() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="testimonials" className="py-16 md:py-28 bg-slate-900 relative overflow-hidden text-white">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2 block animate-fade-in">
            Client Success
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
            Global Impact
          </h2>
        </div>

        <div className={cn(
          "max-w-4xl mx-auto relative transition-all duration-700 delay-100",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Slider Container */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
            <Quote className="absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 md:w-16 md:h-16 text-white/10 rotate-180" />
            
            <div className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 flex flex-col items-center text-center",
                    index === currentIndex 
                      ? "opacity-100 translate-x-0 scale-100 z-10" 
                      : "opacity-0 scale-95 pointer-events-none z-0",
                    // Move out to left if previous, right if next (simplified logic for fade/scale)
                    index !== currentIndex && index < currentIndex ? "-translate-x-8" : "",
                    index !== currentIndex && index > currentIndex ? "translate-x-8" : ""
                  )}
                >
                  <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-200 mb-8 max-w-3xl pt-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm", testimonial.color)}>
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-heading font-bold text-white">{testimonial.author}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-6 mt-10 pt-8 border-t border-white/10">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      index === currentIndex ? "bg-sky-400 w-6" : "bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
