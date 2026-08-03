'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: '01',
    stageIndex: 0,
    title: 'Data Generation',
    desc: 'Engineering synthetic data to solve scarcity, protect privacy, and simulate edge cases for model training.',
    tag: 'Fidelity & Privacy',
  },
  {
    id: '02',
    stageIndex: 1,
    title: 'Data Annotation',
    desc: 'Creating clear ontologies and guidelines to label complex data accurately through expert-guided workflows.',
    tag: 'Ontology & Meaning',
  },
  {
    id: '03',
    stageIndex: 2,
    title: 'Data Labeling',
    desc: 'Converting unstructured data streams into clean training sets with multi-pass consensus verification.',
    tag: 'Structured Assets',
  },
  {
    id: '04',
    stageIndex: 3,
    title: 'Quality Testing & Analysis',
    desc: 'Auditing datasets across eight dimensions including accuracy, completeness, and consistency before training.',
    tag: 'DQA Verification',
  },
];

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
      '.service-grid-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.service-grid-card', start: 'top 80%' },
      }
    );
  }, { scope: container });

  return (
    <section id="services" ref={container} className="bg-slate-50 py-24 sm:py-32 border-t border-slate-100">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="services-header-el max-w-2xl mb-16 sm:mb-20">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-[#B8860B] mb-4 font-bold">
            Operational Capabilities
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase tracking-wide text-slate-900 leading-tight mb-6">
            Intelligent pipelines for high-stakes AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            We engineer raw information into production-ready intelligence. Click any discipline to explore our methodologies, lifecycles, and verified case studies.
          </p>
        </div>

        {/* Bento/Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services?stage=${s.stageIndex}`}
              className="service-grid-card group relative block bg-white border border-slate-200 hover:border-[#B8860B]/40 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-mono text-xs tracking-widest text-[#B8860B] font-bold">
                    STAGE {s.id}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-slate-900 mb-3 group-hover:text-[#B8860B] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#B8860B] font-bold group-hover:translate-x-1 transition-transform">
                <span>View Methodology</span>
                <span className="text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
