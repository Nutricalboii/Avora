'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Subtle mouse parallax on overlay texture
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      gsap.to(gridRef.current, { x, y, duration: 1.4, ease: 'power2.out' });
    };

    // Entrance animations
    gsap.fromTo('.hero-headline',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-sub',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out', delay: 0.5 }
    );
    gsap.fromTo('.hero-cta',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out', delay: 0.7 }
    );

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}
    >
      {/* Very subtle texture overlay — lets shader glow through */}
      <div ref={gridRef} className="absolute inset-[-40px] z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/50" />
      </div>

      

      {/* Main content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-32">
        {/* Giant display heading */}
        <h1
          className="hero-headline font-heading text-[13vw] md:text-[11vw] lg:text-[10vw] leading-[0.9] tracking-wide uppercase text-slate-900 mb-12"
          style={{ willChange: 'transform, opacity' }}
        >
          Scale Your{' '}
          <span className="text-[#B8860B]">AI Vision</span>
          <br />
          With Precision
          <br />
          And Fidelity.
        </h1>

        {/* Bottom row: subtext + CTAs */}
        <div className="border-t border-slate-200/60 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="hero-sub md:col-span-5" style={{ willChange: 'transform, opacity' }}>
            <p className="text-slate-900 text-lg md:text-xl leading-relaxed font-sans font-medium max-w-md">
              We specialize in production-grade AI solutions for high-stakes environments, bridging proprietary data quality to deliver systems that perform when outcomes matter.
            </p>
          </div>
          <div
            className="hero-cta md:col-span-7 flex flex-col sm:flex-row gap-4 md:justify-end items-start sm:items-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-sans font-semibold text-sm tracking-wide hover:bg-[#B8860B] transition-colors duration-300"
            >
              Start A Project
              <span>→</span>
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-300 text-slate-700 font-sans font-semibold text-sm tracking-wide hover:border-slate-900 hover:text-slate-900 transition-colors duration-300"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}




