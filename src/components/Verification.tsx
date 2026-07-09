'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { motion, AnimatePresence } from 'framer-motion';

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

const faqs = [
  {
    question: "What's included in outsourcing?",
    answer: "We provide fully vetted, senior-level engineering talent tailored to your tech stack. This includes technical vetting, onboarding, continuous performance management, and replacement guarantees.",
  },
  {
    question: "How fast can you deploy AI?",
    answer: "Depending on complexity, standard deployments range from 2 to 6 weeks. We prioritize rapid, measurable ROI by launching foundational workflows first.",
  },
  {
    question: "Can I hire for short-term projects?",
    answer: "Yes. Our Specialized Skill Hiring allows you to bring on fractional experts (like ML engineers or security specialists) for engagements as short as 5 to 50 days.",
  },
  {
    question: "How does equity work in the venture studio?",
    answer: "For select partnerships, we structure technical co-development engagements with a reduced-rate model. Connect with us to discuss specifics.",
  }
];

export default function Verification() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section id="verification" className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <span className="section-eyebrow">Operational Verification</span>
          <h2 className="section-heading mb-4">Client Success &amp; FAQ</h2>
          <p className="section-subtext max-w-2xl mx-auto">
            Verified case outcomes compiled directly from partner platform logs alongside answers to common execution questions.
          </p>
        </div>

        {/* Side-by-Side Verification & FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Verification Logs */}
          <div className="border border-slate-850 bg-slate-950/80 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-6">
                Verification Log // {t.verification}
              </span>
              <p className="text-base font-sans text-slate-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-850/60">
              <div>
                <div className="text-sm font-heading font-bold text-white">{t.author}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={prevTestimonial} className="p-1.5 rounded bg-white/[0.02] border border-slate-800 text-slate-400 hover:text-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextTestimonial} className="p-1.5 rounded bg-white/[0.02] border border-slate-800 text-slate-400 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs Accordion Card */}
          <div className="border border-slate-850 bg-slate-950/80 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-6">
                Frequently Asked Questions
              </span>
              <div className="space-y-2 divide-y divide-slate-850/60">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="pt-4 first:pt-0">
                      <button
                        className="w-full py-2.5 text-left flex justify-between items-center gap-4 focus:outline-none"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        <span className={cn(
                          'font-sans text-sm font-semibold transition-colors',
                          isOpen ? 'text-white' : 'text-slate-350 hover:text-white'
                        )}>
                          {faq.question}
                        </span>
                        <ChevronDown className={cn('w-4 h-4 text-slate-500 transition-transform duration-300', isOpen && 'rotate-180 text-teal-400')} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs font-sans text-slate-400 pb-4 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
