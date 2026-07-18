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
  const scrollContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !scrollContainer.current) return;
    
    const panels = gsap.utils.toArray('.horizontal-panel') as HTMLElement[];
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        // The distance the user scrolls determines the speed
        end: () => "+=" + (container.current?.offsetWidth || window.innerWidth) * 2
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen bg-[url('/Gold_Flow_Light.jpg.jpeg')] bg-cover bg-center overflow-hidden flex flex-col justify-center">
      {/* Background Overlay to keep it pristine */}
      <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-sm z-0" />
      
      {/* Intro Text - Stays pinned in the background */}
      <div className="absolute top-32 left-0 right-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white/95 backdrop-blur-md text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#B8860B] mb-8 shadow-sm">
            Our Vision & Core Model
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 bg-white/80 backdrop-blur-md inline-block px-8 py-3 rounded-2xl border border-slate-200/50 shadow-sm">
            Building the Next Generation of High-Performance Businesses.
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-5xl mx-auto leading-loose bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-slate-200">
            Our mission is to create a new generation of lean, high-performance businesses that seamlessly blend technology, creativity, and commercial discipline. As a family-office-style incubator, we provide both the operational infrastructure and the technical execution required to turn validated concepts into scalable enterprise assets. We protect capital by engineering products around absolute, proven demand.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Panels */}
      <div ref={scrollContainer} className="relative z-20 w-full h-full flex items-end pb-12 pt-96">
        <div className="flex w-[400%] h-[55vh]">
          {verticals.map((item, idx) => (
            <div key={idx} className="horizontal-panel w-full h-full flex items-center justify-center px-8 md:px-16">
              <div className="bg-white w-full max-w-3xl p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-[#B8860B]/40 transition-colors duration-500">
                <div className="absolute -bottom-10 -right-10 text-[12rem] font-heading font-bold text-slate-50 opacity-60 select-none leading-none group-hover:scale-110 transition-transform duration-700 ease-out">
                  {item.id}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-10 text-[#B8860B] border border-slate-200 group-hover:bg-[#B8860B] group-hover:text-white transition-colors duration-500 shadow-sm">
                    <span className="font-mono font-bold text-xl">{item.id}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
