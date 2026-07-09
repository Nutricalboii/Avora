'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const testimonials = [
  {
    quote: "Working with Abhay and the Avora team was a game-changer. They streamlined our entire operation and set us up for scalable growth. The strategic insight is unparalleled.",
    author: "Michael Roberts",
    role: "VP of Operations, TechFlow (USA)",
    avatar: "MR",
    verification: "OPERATIONAL_SCALING"
  },
  {
    quote: "The deep understanding of both manufacturing constraints and modern data science allowed them to deliver an incredibly effective optimization model for our supply chain.",
    author: "Kenji Sato",
    role: "Director of Engineering, Industrial Solutions (Japan)",
    avatar: "KS",
    verification: "SUPPLY_CHAIN_OPT"
  },
  {
    quote: "Avora fundamentally transformed how we approach AI. Their ability to bridge complex technical challenges with business realities is exactly what we needed in the APAC market.",
    author: "Priya Sharma",
    role: "CTO, FinEdge Innovations (India)",
    avatar: "PS",
    verification: "APAC_AI_STRATEGY"
  },
  {
    quote: "Their specialized talent sourcing helped us build a high-performing remote engineering team in record time. We couldn't have scaled our platform without them.",
    author: "David Jenkins",
    role: "Founder, ScaleTech (USA)",
    avatar: "DJ",
    verification: "TALENT_PLACEMENT"
  }
];

export default function Testimonials() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentTestimonialIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden services-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <span className="section-eyebrow">Client Success</span>
          <h2 className="section-heading mb-4">Operational Verification</h2>
          <p className="section-subtext max-w-2xl mx-auto">
            Verified case outcomes compiled directly from partner platform engineering logs.
          </p>
        </div>

        {/* Verification Logs Carousel */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-6">
              Verification Log // {t.verification}
            </span>
            <p className="text-base md:text-lg font-sans text-slate-700 dark:text-slate-300 leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
          
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800/60">
            <div>
              <div className="text-sm font-heading font-bold text-slate-900 dark:text-white">{t.author}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={prevTestimonial} className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#B08D57] dark:hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextTestimonial} className="p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#B08D57] dark:hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
