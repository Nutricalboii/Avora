'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const verticals = [
  { title: 'AI-Native Digital Tools', desc: 'Building proprietary intelligent software powered by our rigorous data and implementation pipeline.', id: '01', color: 'bg-white' },
  { title: 'Consumer & Lifestyle Products', desc: 'Designing and launching agile consumer brands scaled through digital-first infrastructure.', id: '02', color: 'bg-slate-50' },
  { title: 'Sourcing & Export-Driven Models', desc: 'Developing high-efficiency operational channels to capture global trade opportunities.', id: '03', color: 'bg-white' },
  { title: 'Operational Ventures', desc: 'Deploying hands-on management and infrastructure within high-growth emerging industries.', id: '04', color: 'bg-slate-50' }
];

export default function VisionSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.vision-panel') as HTMLElement[];
    
    if (panels.length === 0) return;

    // Create a timeline that pins the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: `+=${100 * panels.length}%`, // Scroll duration based on number of panels
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate each panel (except the first intro panel)
    panels.forEach((panel, i) => {
      if (i === 0) return;

      // Slide up from bottom and stack
      tl.fromTo(panel, 
        { yPercent: 100 }, 
        { yPercent: 0, ease: 'none' }
      );
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-slate-50">
      
      {/* Intro Panel (Index 0 in animation timeline) */}
      <div className="vision-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 z-0 bg-[url('/Gold_Flow_Light.jpg.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-md z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/95 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#B8860B] mb-8 shadow-sm">
            Our Vision & Core Model
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 tracking-tight">
            Building the Next Generation of High-Performance Businesses.
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-loose bg-white/80 p-8 rounded-2xl border border-slate-200/50 shadow-sm">
            Our mission is to create a new generation of lean, high-performance businesses that seamlessly blend technology, creativity, and commercial discipline. As a family-office-style incubator, we provide both the operational infrastructure and the technical execution required to turn validated concepts into scalable enterprise assets. We protect capital by engineering products around absolute, proven demand.
          </p>
          <div className="mt-12 text-[#B8860B] animate-bounce opacity-80">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
            <div className="w-px h-12 bg-[#B8860B]/30 mx-auto mt-2"></div>
          </div>
        </div>
      </div>

      {/* The 4 Vertical Panels */}
      {verticals.map((item, i) => (
        <div 
          key={i} 
          className={`vision-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 z-${(i + 1) * 10} ${item.color}`}
          style={{ transform: 'translateY(100%)' }}
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Massive Number Left Side */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                <span className="text-[14rem] lg:text-[18rem] font-heading font-bold text-slate-100 leading-none select-none drop-shadow-sm">
                  {item.id}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-2xl border border-[#B8860B]/30 bg-white/60 backdrop-blur-md flex items-center justify-center shadow-xl rotate-3">
                    <span className="text-[#B8860B] font-mono font-bold text-3xl">
                      {item.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text Content Right Side */}
            <div className="lg:col-span-7 pr-4 lg:pr-12">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#B8860B] mb-6 shadow-sm">
                Focus Area {item.id}
              </div>
              <h3 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                {item.title}
              </h3>
              <div className="h-px w-24 bg-gradient-to-r from-[#B8860B] to-transparent mb-8"></div>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl font-light">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
