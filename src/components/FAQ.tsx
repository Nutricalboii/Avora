'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What's included in outsourcing?",
    answer: "We provide fully vetted, senior-level engineering talent tailored to your tech stack. This includes technical vetting, onboarding, continuous performance management, and replacement guarantees. You get dedicated resources without the overhead of traditional hiring.",
  },
  {
    question: "How fast can you deploy AI?",
    answer: "Depending on the complexity, our standard MVP deployment ranges from 2 to 6 weeks. We prioritize rapid, measurable ROI by launching foundational workflows first, then iterating and scaling the capabilities once value is proven.",
  },
  {
    question: "Can I hire for short-term projects?",
    answer: "Yes. Our Specialized Skill Hiring allows you to bring on fractional experts (like ML engineers or security specialists) for engagements as short as 5 to 50 days. You pay only for the specialized expertise you need, when you need it.",
  },
  {
    question: "How does equity work in the venture studio?",
    answer: "For select high-growth founders, we operate as a technical co-founder. We significantly discount our engineering and product development rates in exchange for a mutually agreed equity stake in the company we are building together.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Absolutely. We work with companies at every stage — from zero-to-one MVPs to scaling established products. Our engagement model is flexible enough to match your budget, timeline, and risk tolerance.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "Our core expertise spans fintech, energy & sustainability, healthcare, enterprise SaaS, and AI-native products. Backed by McKinsey consulting experience and deep technical execution, we apply proven frameworks across verticals.",
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#080b12] contact-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div
          ref={ref}
          className="mb-16 text-center"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-heading">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  'glass-panel rounded-xl overflow-hidden transition-all duration-300',
                  isOpen ? 'border-[#B08D57]/40 shadow-lg' : 'hover:border-[#B08D57]/20'
                )}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    'font-sans font-semibold text-sm md:text-base transition-colors',
                    isOpen ? 'text-white' : 'text-slate-300 hover:text-white'
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 flex-shrink-0 transition-transform duration-300 text-slate-500',
                      isOpen && 'rotate-180 text-teal-405'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-0 font-sans text-xs md:text-sm text-slate-400 leading-relaxed">
                        <div className="h-px bg-slate-800/40 mb-4" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
