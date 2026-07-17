'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useInView';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How fast can you deploy a custom AI solution?',
    answer:
      'Standard engagements run 2 to 6 weeks from scoping to first validated output, depending on complexity. We start with the business problem — not a preferred algorithm — run a discovery phase to map constraints and data readiness, then execute in tight iteration cycles. The first deployment is treated as a validated hypothesis, not a finished product. Scaling follows once value is demonstrated.',
  },
  {
    question: 'Is synthetic data reliable enough to train production models?',
    answer:
      'When engineered correctly, yes. Poorly designed synthetic data can reproduce rare real-world combinations — that is a genuine risk. Well-designed synthetic data, validated against downstream task performance, can outperform scarce or noisy real data. The critical controls are domain expert oversight, physics-informed generation, and explicit differential privacy budgets — not just labeling output as synthetic.',
  },
  {
    question: 'What does your data annotation process look like?',
    answer:
      'Annotation begins with a requirements and ontology phase — defining exactly what the model must learn before any labeling starts. We write annotation guidelines with visual examples and edge-case handling. Execution uses modality-specific tooling: CVAT for computer vision, Prodigy for NLP, with model-assisted pre-labeling reducing manual effort. A senior expert reviews a stratified sample of every batch, and a third expert adjudicates disagreements. Inter-annotator Kappa must hit the agreed target before any dataset is signed off.',
  },
  {
    question: 'What is the difference between annotation and labeling in your pipeline?',
    answer:
      'Annotation is the structured process of adding meaning to raw data using ontologies, schemas, and classification rules — it defines what the model must learn. Labeling is the operational execution at scale, applying those annotated rules consistently across large workloads with consensus verification. Both steps are sequential in our pipeline and governed by distinct quality gates.',
  },
  {
    question: 'How do you ensure quality across large labeling workloads?',
    answer:
      'Inconsistent labels do not just add noise — they create dangerous overconfidence in model outputs. Our QA framework measures accuracy, completeness, consistency, timeliness, and inter-annotator agreement across every batch. We run multi-stage validation: statistical tests on label distributions, downstream task performance checks, expert benchmarking against gold-standard samples, and formal sign-off against defined Kappa thresholds. Datasets are versioned like software releases and flagged for regeneration when source distributions drift.',
  },
  {
    question: 'What industries do you work in?',
    answer:
      'Engagements span medical AI and rare disease diagnostics, pharmaceutical clinical trial document processing, precision agriculture and drone telemetry, multi-SKU retail demand forecasting, and enterprise data infrastructure. We apply the same pipeline framework across verticals, with particular depth in regulated industries where data quality, model explainability, and compliance are non-negotiable.',
  },
  {
    question: 'Can I see examples of your previous work?',
    answer:
      'Yes — all engagements are documented anonymously on the Delivered Work page. You will find the sector, what was built, how it was done technically, and the verified outcome. No client names are used; results are compiled from delivery logs. If you want to discuss a specific use case in more detail before engaging, reach out through the contact form.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="py-28 md:py-36 relative overflow-hidden contact-bg">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`mb-16 text-center max-w-2xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-heading">Questions, answered.</h2>
          <p className="section-subtext mt-4">
            The most common things prospective clients ask before reaching out.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  'glass-panel rounded-2xl overflow-hidden transition-all duration-300',
                  isOpen ? 'border-[var(--accent)]/40 shadow-soft' : 'hover:border-[var(--accent)]/25'
                )}
              >
                <button
                  className="w-full px-7 py-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      'font-heading font-semibold text-base md:text-lg transition-colors',
                      isOpen
                        ? 'text-[var(--foreground)]'
                        : 'text-[var(--foreground)] hover:text-[var(--accent)]'
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      isOpen
                        ? 'bg-[var(--accent)] text-white rotate-180'
                        : 'bg-[var(--accent-tint)] text-[var(--accent)]'
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
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
                      <div className="px-7 pb-7 text-[15px] text-[var(--foreground-muted)] leading-relaxed">
                        <div className="hairline-gold mb-5" />
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
