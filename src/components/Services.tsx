'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    id: '01.01',
    label: 'ANNOTATION',
    title: 'Data Generation',
    desc: 'We engineer robust, physics-informed synthetic datasets under expert domain oversight. This ensures our AI-native models have a high-fidelity foundation even when real-world market data is sparse.',
  },
  {
    id: '01.02',
    label: 'LABELING',
    title: 'Data Annotation & Labeling',
    desc: 'We divide execution into precise ontologies and high-volume deployment. Using modality-specific tooling and model-assisted automation, we accelerate data readiness by up to 60%.',
  },
  {
    id: '01.03',
    label: 'AUDITING',
    title: 'Data Auditing & QA',
    desc: 'Our multi-stage QA framework enforces strict inter-annotator agreement metrics (Kappa ≥ 0.91). Datasets are treated like versioned software releases.',
  },
  {
    id: '01.04',
    label: 'IMPLEMENTATION',
    title: 'AI Implementation',
    desc: 'We build and launch custom MVPs within 2 to 6 weeks. We treat initial infrastructure as a measurable hypothesis, scaling computational resources only when commercial value is proven.',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.pipeline-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: container.current, start: 'top 80%' }
      }
    );

    const cols = gsap.utils.toArray('.pipeline-col') as HTMLElement[];
    cols.forEach((col, i) => {
      gsap.fromTo(col,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: container.current, start: 'top 70%' }
        }
      );
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="pipeline-header py-16 md:py-24 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
                Architecture / 01
              </p>
              <h2 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
                The Institutional<br/>Pipeline
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-500 max-w-sm leading-relaxed md:pb-4 font-sans">
              We do not build on assumptions. Every AI-native model passes through a strict, four-stage validation framework.
            </p>
          </div>
        </div>

        {/* Pipeline Table — like the reference image */}
        <div className="py-12 md:py-20">
          {/* Column headers with rotated labels on top */}
          <div className="grid grid-cols-4 gap-0 border border-slate-200">
            {/* Row 1: Stage IDs */}
            <div className="grid grid-cols-4 col-span-4 border-b border-slate-200">
              {stages.map((s) => (
                <div key={s.id} className="border-r border-slate-200 last:border-r-0 px-6 py-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">{s.id}</span>
                </div>
              ))}
            </div>

            {/* Row 2: Rotated labels */}
            <div className="grid grid-cols-4 col-span-4 border-b border-slate-200">
              {stages.map((s, i) => (
                <div key={i} className="border-r border-slate-200 last:border-r-0 px-6 py-8 flex items-center justify-center">
                  <span
                    className="font-heading text-3xl md:text-4xl tracking-[0.15em] text-slate-900 uppercase"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 3: Title + Description — bulk of the content */}
            <div className="grid grid-cols-4 col-span-4 border-b border-slate-200">
              {stages.map((s, i) => (
                <div key={i} className="pipeline-col border-r border-slate-200 last:border-r-0 px-6 py-10 flex flex-col justify-between min-h-[260px]">
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl uppercase text-slate-900 mb-5 tracking-wide">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 4: Footer row */}
            <div className="grid grid-cols-4 col-span-4">
              {stages.map((s, i) => (
                <div key={i} className="border-r border-slate-200 last:border-r-0 px-6 py-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></div>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-slate-400 uppercase">Stage {i + 1} of 4</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
