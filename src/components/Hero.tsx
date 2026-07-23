'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.hero-headline',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1.3, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out', delay: 0.7 }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-center lg:justify-end overflow-hidden bg-black"
    >
      {/* Background image container rotated 90deg to landscape */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
         {/* 
            This div uses viewport width for height and viewport height for width,
            and rotates -90deg so the portrait image becomes perfectly landscape 
            and covers the entire screen seamlessly.
         */}
         <div 
           className="absolute inset-0 bg-cover bg-center opacity-80"
           style={{ backgroundImage: "url('/abstract.jpg')" }}
         />
         {/* Gradients to ensure text readability against the bright orange pattern */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content — Centered on mobile/tablet, Left aligned on desktop */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 pb-0 lg:pb-24 max-w-screen-2xl mx-auto flex flex-col justify-center lg:justify-end h-full mt-20 lg:mt-0">
        <h1
          className="hero-headline font-heading uppercase tracking-wide text-white leading-[0.95] mb-8"
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
            willChange: 'transform, opacity',
          }}
        >
          Scale Your<br />
          {/* Suitable orange-yellow tone */}
          <span className="text-[#f59e0b]">AI Vision</span><br />
          With Precision<br />
          And Fidelity.
        </h1>

        {/* Sleek caption on the bottom in 1 or 2 lines */}
        <div className="hero-sub max-w-4xl" style={{ willChange: 'transform, opacity' }}>
          <p className="font-sans text-slate-300 text-lg md:text-xl leading-relaxed border-l-2 border-[#f59e0b]/60 pl-5">
            We specialize in production-grade AI solutions for high-stakes environments — bridging data quality to deliver systems that perform when outcomes matter.
          </p>
        </div>
      </div>
    </section>
  );
}
