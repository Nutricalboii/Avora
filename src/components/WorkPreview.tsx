'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const cases = [
  {
    title: 'Medical Diagnostics AI-Native',
    subtitle: 'Scaled a rare disease training corpus from 87 confirmed cases to 50,000 synthetic volumes.',
    outcome: 'Improved diagnostic AUC from 0.72 to 0.91, creating a highly scalable medical AI product.',
    color: 'bg-white',
  },
  {
    title: 'Enterprise Infrastructure NLP',
    subtitle: 'Automated high-volume clinical and document extraction processing via custom NLP labeling schemas.',
    outcome: 'Reached a verified 0.95+ Kappa threshold, completely eliminating administrative processing bottlenecks.',
    color: 'bg-slate-50',
  },
  {
    title: 'Predictive Demand Logistics',
    subtitle: 'Deployed localized multi-SKU demand forecasting models integrated into operational supply chains.',
    outcome: 'Reduced over-allocation risks and optimized inventory tracking with transparent performance metrics.',
    color: 'bg-white',
  }
];

export default function WorkPreview() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.portfolio-panel') as HTMLElement[];
    
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
    <section id="portfolio" ref={container} className="relative w-full h-screen overflow-hidden bg-slate-50 border-t border-slate-200/60">
      
      {/* Intro Panel (Index 0) */}
      <div className="portfolio-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 z-0 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#B8860B] mb-8 shadow-sm">
            Delivered Work
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-8 tracking-tight">
            Proven Demand. <br/>
            <span className="text-slate-400">Sustainable Growth.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our delivery logs reflect practical, high-performance deployments across our core operational verticals. To maintain strict corporate discipline, client data is compiled anonymously.
          </p>
          <div className="mt-16 text-slate-400 animate-bounce">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Scroll to view case studies</span>
            <div className="w-px h-12 bg-slate-200 mx-auto mt-2"></div>
          </div>
        </div>
      </div>

      {/* The Case Study Panels */}
      {cases.map((c, i) => (
        <div 
          key={i} 
          className={`portfolio-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 z-${(i + 1) * 10} ${c.color} border-t border-slate-200/50 shadow-[0_-20px_50px_rgba(0,0,0,0.03)]`}
          style={{ transform: 'translateY(100%)' }}
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Side: Numbering and Visual Element */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                <span className="text-[14rem] lg:text-[18rem] font-heading font-bold text-slate-100/60 leading-none select-none drop-shadow-sm -ml-8">
                  0{i + 1}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-[#B8860B]/10 bg-gradient-to-br from-white to-slate-50 flex flex-col items-center justify-center shadow-2xl">
                    <span className="text-slate-400 font-mono font-bold text-sm tracking-[0.2em] mb-2 uppercase">
                      Case Study
                    </span>
                    <span className="text-[#B8860B] font-heading font-bold text-5xl">
                      CS-0{i + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side: Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#B8860B]/20 bg-white text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#B8860B] mb-8 shadow-sm">
                Portfolio Log {i + 1}
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                {c.title}
              </h3>
              
              <div className="space-y-8 max-w-2xl">
                <div className="bg-white/60 p-6 rounded-2xl border border-slate-200/60 shadow-sm backdrop-blur-sm">
                  <span className="text-[11px] font-mono font-bold text-[#B8860B] uppercase tracking-[0.2em] block mb-3">Execution</span>
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">{c.subtitle}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-l-[#B8860B] shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>
                  <span className="text-[11px] font-mono font-bold text-slate-900 uppercase tracking-[0.2em] block mb-3">Outcome</span>
                  <p className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed">{c.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
