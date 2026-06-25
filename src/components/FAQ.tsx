'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';

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
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-50 dark:bg-[#0d0d12] border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={ref}
          className={cn(
            'mb-12 text-center transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-heading mt-2">Frequently Asked Questions</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  'border rounded-xl overflow-hidden transition-all duration-300',
                  isOpen
                    ? 'border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-white/[0.03]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-slate-700',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: isInView ? `${index * 60}ms` : '0ms' }}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:ring-inset"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    'font-semibold text-sm md:text-base transition-colors',
                    isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 flex-shrink-0 transition-all duration-300',
                      isOpen
                        ? 'rotate-180 text-indigo-500'
                        : 'text-slate-400 dark:text-slate-500'
                    )}
                  />
                </button>

                <div className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                )}>
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px bg-slate-100 dark:bg-slate-800 mb-4" />
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
