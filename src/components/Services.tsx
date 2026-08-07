'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sequential pipeline — 5 steps
const pipeline = [
  {
    id: '01',
    stageIndex: 0,
    title: 'AI Solutions',
    desc: 'Turn quality data into production-ready AI systems.',
    output: 'Deployed AI system',
  },
  {
    id: '02',
    stageIndex: 1,
    title: 'Data Generation',
    desc: 'Solve data scarcity with realistic, privacy-safe synthetic data.',
    output: 'Synthetic datasets',
  },
  {
    id: '03',
    stageIndex: 2,
    title: 'Data Annotation',
    desc: 'Give raw data its ground truth through expert annotation.',
    output: 'Annotated data',
  },
  {
    id: '04',
    stageIndex: 3,
    title: 'Data Labeling',
    desc: 'Convert unstructured inputs into structured training sets.',
    output: 'Labeled datasets',
  },
  {
    id: '05',
    stageIndex: 4,
    title: 'Data Quality Assurance',
    desc: 'Validate datasets across eight dimensions before model training.',
    output: 'Validated, production-ready data',
  },
];

// Sidebar — AI Talent Solutions
const talent = {
  stageIndex: 5,
  title: 'AI Talent Solutions',
  desc: 'Embed vetted AI specialists directly into your team at any stage.',
};

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.services-header-el',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-header-el', start: 'top 85%' },
      }
    );

    gsap.fromTo(
      '.pipeline-step',
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pipeline-step', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.talent-sidebar',
      { opacity: 0, x: 24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: { trigger: '.talent-sidebar', start: 'top 80%' },
      }
    );
  }, { scope: container });

  return (
    <section id="services" ref={container} className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="services-header-el max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl uppercase tracking-wide text-slate-900 leading-tight mb-5">
            Six disciplines.
            <br />
            <span className="text-[#B8860B]">One delivery framework.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
            Every enterprise AI project moves through the same pipeline — from raw data to deployed intelligence.
            Avora owns every step.
          </p>
        </div>

        {/* Framework layout: pipeline left + talent sidebar right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* ── LEFT: Sequential pipeline ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* "Need AI" entry node */}
            <div className="flex items-center gap-4 mb-3 pl-1">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-mono font-bold">AI</span>
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-slate-500 font-bold">Enterprise AI Journey</span>
            </div>
            {/* Down arrow into pipeline */}
            <div className="flex items-center ml-5 mb-3">
              <div className="w-px h-6 bg-slate-300" />
            </div>

            {pipeline.map((step, i) => (
              <div key={step.id} className="pipeline-step">
                <Link
                  href={`/services?stage=${step.stageIndex}`}
                  className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-[#B8860B]/50 hover:shadow-md transition-all duration-300 group"
                >
                  {/* Number badge */}
                  <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 border-2 border-[#B8860B]/30 flex items-center justify-center shrink-0 group-hover:bg-[#B8860B] group-hover:border-[#B8860B] transition-colors duration-300">
                    <span className="text-[#B8860B] group-hover:text-white font-mono font-bold text-xs transition-colors duration-300">
                      {step.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-heading text-base sm:text-lg uppercase tracking-wide text-slate-900 leading-tight">
                        {step.title}
                      </h3>
                      <span className="text-[#B8860B] font-bold text-sm group-hover:translate-x-1 transition-transform shrink-0">→</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium mb-2">{step.desc}</p>
                    <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                      Output: <span className="text-slate-600 font-bold">{step.output}</span>
                    </p>
                  </div>
                </Link>

                {/* Arrow connector between steps */}
                {i < pipeline.length - 1 && (
                  <div className="flex items-center ml-5 my-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-px h-4 bg-[#B8860B]/40" />
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M4 6L0 0h8L4 6z" fill="#B8860B" fillOpacity="0.5" />
                      </svg>
                    </div>
                    <span className="ml-3 text-[10px] font-mono text-slate-400 tracking-wider">hands off →</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── RIGHT: AI Talent Solutions sidebar ───────────────────── */}
          <div className="talent-sidebar w-full lg:w-72 xl:w-80 shrink-0">
            {/* Connector label — visible on desktop only */}
            <div className="hidden lg:flex items-center gap-2 mb-4 mt-[88px]">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-mono text-slate-400 tracking-wider whitespace-nowrap">plugs in at every stage</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              href={`/services?stage=${talent.stageIndex}`}
              className="block bg-slate-900 rounded-2xl p-6 sm:p-8 text-white hover:bg-slate-800 transition-colors duration-300 group relative overflow-hidden"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" />

              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-bold">
                  06 · Parallel Capability
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-white mb-3 leading-tight">
                {talent.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium mb-6">
                {talent.desc}
              </p>

              {/* Connector dots showing it plugs into each stage */}
              <div className="space-y-2 mb-6">
                {pipeline.map((step) => (
                  <div key={step.id} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0" />
                    <span className="text-[11px] font-mono text-slate-400 tracking-wide">{step.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D4AF37] font-bold">
                  Explore capability
                </span>
                <span className="text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Mobile: small note about the sidebar */}
            <p className="lg:hidden mt-3 text-[11px] font-mono text-slate-400 text-center tracking-wide">
              Embeds at any stage of the pipeline
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 pt-8 border-t border-slate-200 max-w-xl mx-auto">
          <p className="text-slate-700 text-sm sm:text-base mb-6 font-medium">
            Explore methodologies, case studies, and lifecycle detail across all six disciplines.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-[#B8860B] hover:bg-[#a07508] text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 font-bold"
          >
            <span>Explore Our Services</span>
            <span className="text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
