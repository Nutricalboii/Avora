'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    seq: 'SEQ.01',
    label: 'ANNOTATION',
    title: 'Data Generation',
    desc: 'We engineer robust, physics-informed synthetic datasets under expert domain oversight. This ensures our AI-native models have a high-fidelity foundation even when real-world market data is sparse.',
    detail: 'Our data generation pipeline combines physics-informed simulation with domain expert validation. Every synthetic dataset passes through multi-layer fidelity checks before being approved for model training. Edge-case richness and statistical diversity are built in by design, not as afterthoughts.',
    bgImage: '/Gold_Flow_Light.jpg.jpeg',
    icon: '⬡',
    stat: '60%',
    statLabel: 'faster data readiness',
  },
  {
    seq: 'SEQ.02',
    label: 'LABELING',
    title: 'Data Annotation & Labeling',
    desc: 'We divide execution into precise ontologies and high-volume deployment. Using modality-specific tooling and model-assisted automation, we accelerate data readiness by up to 60%.',
    detail: 'Our annotation workflows use custom modality-specific tooling built for speed without sacrificing precision. Model-assisted pre-labeling reduces manual overhead while human review cycles ensure every ontology is correctly applied at volume.',
    bgImage: '/Institutional_Network_Light.jpg.jpeg',
    icon: '◈',
    stat: '0.91+',
    statLabel: 'Kappa agreement',
  },
  {
    seq: 'SEQ.03',
    label: 'AUDITING',
    title: 'Data Auditing & QA',
    desc: 'Our multi-stage QA framework enforces strict inter-annotator agreement metrics (Kappa ≥ 0.91). Datasets are treated like versioned software releases.',
    detail: 'Every dataset is version-controlled and passed through automated agreement scoring, expert spot-checks, and adversarial edge-case stress tests. Datasets failing our Kappa threshold are routed back to reannotation — never shipped.',
    bgImage: '/Silicone_Gold_Light.jpg.jpeg',
    icon: '◎',
    stat: '100%',
    statLabel: 'versioned releases',
  },
  {
    seq: 'SEQ.04',
    label: 'IMPLEMENTATION',
    title: 'AI Implementation',
    desc: 'We build and launch custom MVPs within 2 to 6 weeks. We treat initial infrastructure as a measurable hypothesis, scaling computational resources only when commercial value is proven.',
    detail: 'Post-validation, we architect secure, interpretable AI systems with SHAP-based explainability and drift monitoring built in from day one. Deployments are scoped as live hypotheses: lean, measurable, and ready to scale when the numbers say so.',
    bgImage: '/Structural_Precision_Light.jpg.jpeg',
    icon: '◉',
    stat: '2–6wk',
    statLabel: 'MVP to deployment',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useGSAP(() => {
    gsap.fromTo('.pipeline-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
      }
    );

    const cards = gsap.utils.toArray('.pipeline-card') as HTMLElement[];
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: container.current, start: 'top 68%' },
        }
      );
    });
  }, { scope: container });

  return (
    <section
      id="services"
      ref={container}
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
      className="border-t border-slate-200/70"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="pipeline-header py-16 md:py-24 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-heading text-5xl sm:text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
                The Institutional<br />Pipeline
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-900 max-w-sm leading-relaxed md:pb-4 font-sans font-medium">
              We do not build on assumptions. Every AI-native model passes through a strict, four-stage validation framework.
            </p>
          </div>
        </div>

        {/* Collapsible Pipeline Cards */}
        <div className="py-12 md:py-20">
          <div className="flex flex-col gap-0 border border-slate-200/80 overflow-hidden rounded-sm bg-white shadow-sm">
            {stages.map((stage, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="pipeline-card group relative border-b border-slate-200/80 last:border-b-0"
                >
                  

                  {/* Card trigger row */}
                  <button
                    className="relative w-full text-left focus:outline-none"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <div className={`flex flex-wrap md:grid md:grid-cols-12 items-center gap-4 px-6 md:px-10 transition-all duration-500 ${isOpen ? 'py-8 md:py-10' : 'py-6 md:py-8'}`}>
                      {/* Seq number */}
                      <div className="w-full md:w-auto md:col-span-1">
                        <span className={`font-mono font-semibold text-sm tracking-[0.22em] uppercase transition-colors duration-300 ${isOpen ? 'text-[#B8860B]' : 'text-slate-700'}`}>
                          {stage.seq}
                        </span>
                      </div>

                      {/* Label */}
                      <div className="flex-1 md:col-span-7">
                        <div className="flex items-center gap-4">
                          <span className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] uppercase leading-none transition-colors duration-300 ${isOpen ? 'text-[#B8860B]' : 'text-slate-800 group-hover:text-slate-900'}`}>
                            {stage.label}
                          </span>
                          {isOpen && (
                            <span className="hidden md:inline font-mono font-medium text-sm tracking-[0.18em] uppercase text-slate-700 border-l border-slate-200 pl-4">
                              {stage.title}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stat — visible when open */}
                      <div className="hidden md:flex col-span-2 flex-col items-end">
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.3 }}
                              className="text-right"
                            >
                              <div className="font-heading text-3xl text-[#B8860B] leading-none">{stage.stat}</div>
                              <div className="font-mono font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-700 mt-1">{stage.statLabel}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Chevron */}
                      <div className="flex-none md:col-span-2 flex justify-end">
                        <div className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-[#B8860B] bg-[#B8860B] text-white' : 'border-slate-200 text-slate-700 group-hover:border-slate-300'}`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="relative px-6 md:px-10 pb-10 md:pb-12">
                          <div className="border-t border-slate-200/60 pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                              {/* Left: short desc */}
                              <div className="md:col-span-5">
                                <p className="font-mono font-semibold text-sm tracking-[0.2em] uppercase text-[#B8860B] mb-4">Overview</p>
                                <p className="text-slate-900 text-lg md:text-xl leading-relaxed font-sans font-medium">
                                  {stage.desc}
                                </p>
                              </div>
                              {/* Right: detail */}
                              <div className="md:col-span-7">
                                <p className="font-mono font-semibold text-sm tracking-[0.2em] uppercase text-slate-700 mb-4">Methodology</p>
                                <p className="text-slate-900 text-lg leading-relaxed font-sans font-medium">
                                  {stage.detail}
                                </p>
                                {/* Stat row on mobile */}
                                <div className="mt-6 md:hidden flex items-center gap-3">
                                  <div className="font-heading text-4xl text-[#B8860B]">{stage.stat}</div>
                                  <div className="font-mono font-semibold text-[13px] tracking-[0.15em] uppercase text-slate-700">{stage.statLabel}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}







