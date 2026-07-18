'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const verticals = [
  { title: 'AI-Native Digital Tools', desc: 'Building proprietary intelligent software powered by our rigorous data and implementation pipeline.', id: '01' },
  { title: 'Consumer & Lifestyle Products', desc: 'Designing and launching agile consumer brands scaled through digital-first infrastructure.', id: '02' },
  { title: 'Sourcing & Export-Driven Models', desc: 'Developing high-efficiency operational channels to capture global trade opportunities.', id: '03' },
  { title: 'Operational Ventures', desc: 'Deploying hands-on management and infrastructure within high-growth emerging industries.', id: '04' }
];

export default function VisionSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.vertical-row') as HTMLElement[];
    rows.forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
          delay: i * 0.08,
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-white border-t border-slate-200">
      {/* Header row */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="py-16 md:py-24 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
                Avora / 01 — Our Vision & Core Model
              </p>
              <h2 className="font-heading text-7xl md:text-9xl lg:text-[10rem] leading-none text-slate-900 tracking-wide uppercase">
                The Portfolio
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-500 max-w-md leading-relaxed md:pb-4 font-sans">
              We protect capital by engineering products around absolute, proven demand. Four distinct verticals, each validated before scale.
            </p>
          </div>
        </div>

        {/* Table-style rows — no cards */}
        <div>
          {verticals.map((item, i) => (
            <div
              key={i}
              className="vertical-row group border-b border-slate-200 py-10 md:py-14 grid grid-cols-12 gap-6 items-center hover:bg-slate-50 transition-colors duration-200 cursor-default"
            >
              {/* Index */}
              <div className="col-span-1 md:col-span-1">
                <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400">{item.id}</span>
              </div>

              {/* Title */}
              <div className="col-span-11 md:col-span-4">
                <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-slate-900 leading-none group-hover:text-[#B8860B] transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Divider — only on desktop */}
              <div className="hidden md:block md:col-span-1">
                <div className="h-px w-full bg-slate-200"></div>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-5 md:pl-4">
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
