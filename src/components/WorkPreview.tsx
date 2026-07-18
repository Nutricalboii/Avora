'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const outcomes = [
  {
    id: 'CS-01',
    title: 'Medical Diagnostics AI',
    metric: '0.91',
    metricLabel: 'AUC achieved',
    execution: 'Scaled a rare disease training corpus from 87 confirmed cases to 50,000 synthetic volumes.',
    outcome: 'Improved diagnostic AUC from 0.72 to 0.91, creating a highly scalable medical AI product.',
  },
  {
    id: 'CS-02',
    title: 'Enterprise Infrastructure NLP',
    metric: '0.95+',
    metricLabel: 'Kappa threshold',
    execution: 'Automated high-volume clinical and document extraction via custom NLP labeling schemas.',
    outcome: 'Reached a verified 0.95+ Kappa threshold, completely eliminating administrative processing bottlenecks.',
  },
  {
    id: 'CS-03',
    title: 'Predictive Demand Logistics',
    metric: '12×',
    metricLabel: 'forecasting precision',
    execution: 'Deployed localized multi-SKU demand forecasting models integrated into operational supply chains.',
    outcome: 'Reduced over-allocation risks and optimized inventory tracking with transparent performance metrics.',
  },
];

export default function WorkPreview() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.outcome-row') as HTMLElement[];
    rows.forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: row, start: 'top 82%' }
        }
      );
    });
  }, { scope: container });

  return (
    <section id="portfolio" ref={container} className="bg-white border-t border-slate-200">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="py-16 md:py-24 border-b border-slate-200 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
              Network / 01
            </p>
            <h2 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
              Work-Tested<br/>Outcomes
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-500 max-w-sm leading-relaxed md:pb-4 font-sans">
            Our delivery logs reflect practical, high-performance deployments across our core operational verticals. Client data is compiled anonymously.
          </p>
        </div>

        {/* Outcome rows — large stat + content, no cards */}
        <div>
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="outcome-row border-b border-slate-200 py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-start"
            >
              {/* Left: ID + big stat */}
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase mb-6">{o.id} / To: {o.metricLabel.split(' ')[0].toUpperCase()}</p>
                <div className="font-heading text-8xl md:text-9xl lg:text-[9rem] leading-none text-[#B8860B] tracking-tight">
                  {o.metric}
                </div>
                <p className="font-mono text-[11px] tracking-[0.15em] text-slate-400 uppercase mt-3">{o.metricLabel}</p>
              </div>

              {/* Center: Title + divider */}
              <div className="md:col-span-1 hidden md:flex items-start pt-2 justify-center">
                <div className="w-px h-40 bg-slate-200"></div>
              </div>

              {/* Right: execution + outcome */}
              <div className="md:col-span-8 md:pl-6">
                <h3 className="font-heading text-4xl md:text-5xl uppercase tracking-wide text-slate-900 mb-8 leading-tight">
                  {o.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#B8860B] mb-3">Execution</p>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-sans">{o.execution}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate-900 mb-3">Outcome</p>
                    <p className="text-slate-800 font-semibold leading-relaxed text-base md:text-lg font-sans">{o.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
