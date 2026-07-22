'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      gsap.to(gridRef.current, { x, y, duration: 1.4, ease: 'power2.out' });
    };

    gsap.fromTo('.hero-headline',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-sub',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out', delay: 0.55 }
    );

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28 overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
    >
      <div ref={gridRef} className="absolute inset-[-40px] z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/50" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-32">
        {/* Display heading */}
        <h1
          className="hero-headline font-heading text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.92] tracking-wide uppercase text-slate-900 mb-14"
          style={{ willChange: 'transform, opacity' }}
        >
          Scale Your{' '}
          <span className="text-[#B8860B]">AI Vision</span>
          <br />
          With Precision
          <br />
          And Fidelity.
        </h1>

        {/* Centered subtext — no buttons */}
        <div className="border-t border-slate-200/60 pt-10">
          <div className="hero-sub" style={{ willChange: 'transform, opacity' }}>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-sans text-center max-w-2xl mx-auto">
              We specialize in production-grade AI solutions for high-stakes environments — bridging
              proprietary data quality to deliver systems that perform when outcomes matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
