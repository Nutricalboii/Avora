'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What exactly does a "family-office-style incubator" mean?',
    answer: 'It means we operate with high commercial discipline, agility, and a long-term capital preservation mindset. Instead of chasing speculative metrics, we invest operational resources directly into identifying structural market gaps, building lean MVPs, and scaling only when real revenue and demand are proven.',
  },
  {
    question: 'How fast do you launch an initial MVP or product?',
    answer: 'Our standard technical engagements run 2 to 6 weeks from scoping to the first validated deployment. We run a tight discovery phase to map data readiness and technical constraints, treating the initial launch as a live test to prove product viability.',
  },
  {
    question: 'What industries does the Avora Ventures portfolio cover?',
    answer: 'Our portfolio spans four distinct emerging spaces: AI-native digital tools, consumer and lifestyle products, sourcing and export-driven models, and operational ventures.',
  },
  {
    question: 'How do you guarantee the quality of your technical assets?',
    answer: 'Every digital tool we incubate runs through our multi-stage QA framework. We measure label distribution, run expert benchmarking against gold-standard samples, and require high statistical validation before any software or dataset is deployed to production.',
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header — matches editorial style */}
        <div className="py-16 md:py-24 border-b border-slate-200">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
            Common Questions
          </p>
          <h2 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
            FAQ
          </h2>
        </div>

        {/* Accordion rows — no cards, just lines */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-slate-200">
                <button
                  className="w-full py-8 md:py-10 text-left flex justify-between items-center gap-6 focus:outline-none group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {/* Question — use DM Sans, NOT Bebas Neue (avoid cramped caps) */}
                  <span className="font-sans font-semibold text-xl md:text-2xl text-slate-800 leading-snug group-hover:text-[#B8860B] transition-colors duration-200 tracking-normal">
                    {faq.question}
                  </span>
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 border flex items-center justify-center transition-all duration-300',
                    isOpen
                      ? 'border-[#B8860B] bg-[#B8860B] text-white'
                      : 'border-slate-300 text-slate-500 group-hover:border-[#B8860B] group-hover:text-[#B8860B]'
                  )}>
                    <ChevronDown className={cn('w-5 h-5 transition-transform duration-300', isOpen && 'rotate-180')} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                    >
                      <div className="pb-10 max-w-3xl">
                        <p className="font-sans text-lg md:text-xl text-slate-600 leading-loose tracking-normal font-normal">
                          {faq.answer}
                        </p>
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
