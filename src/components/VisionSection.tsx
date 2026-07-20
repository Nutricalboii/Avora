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
        { opacity: 0, y: 48, willChange: 'transform' },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
          },
          delay: i * 0.10,
        }
      );
    });

    gsap.fromTo('.vision-header',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: { trigger: container.current, start: 'top 82%' },
      }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="border-t border-slate-200/70"
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="vision-header py-16 md:py-24 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-heading text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-none text-slate-900 tracking-wide uppercase">
                The Portfolio
              </h2>
            </div>
            <p className="text-lg md:text-xl text-slate-900 max-w-md leading-relaxed md:pb-4 font-sans font-medium">
              We protect capital by engineering products around absolute, proven demand. Four distinct verticals, each validated before scale.
            </p>
          </div>
        </div>

        {/* Table-style rows */}
        <div>
          {verticals.map((item, i) => (
            <div
              key={i}
              className="vertical-row group block border border-slate-200/80 bg-white/95 hover:bg-white rounded-sm p-8 md:p-12 mb-12 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-12 gap-6 items-center hover:bg-white/30 transition-colors duration-300 cursor-default"
              style={{ willChange: 'auto' }}
            >
              {/* Index */}
              <div className="col-span-1 md:col-span-1">
                <span className="font-mono font-medium text-[13px] tracking-[0.2em] text-slate-700">{item.id}</span>
              </div>

              {/* Title */}
              <div className="col-span-11 md:col-span-4">
                <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-slate-900 leading-none group-hover:text-[#B8860B] transition-colors duration-400">
                  {item.title}
                </h3>
              </div>

              {/* Divider — desktop only */}
              <div className="hidden md:block md:col-span-1">
                <div className="h-px w-full bg-slate-200 group-hover:bg-[#B8860B]/30 transition-colors duration-300" />
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-5 md:pl-4">
                <p className="text-slate-900 text-lg md:text-xl leading-relaxed font-sans font-medium">
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




