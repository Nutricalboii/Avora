'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Subtle mouse move parallax effect on the SVG grid
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // 40px movement range
      const y = (e.clientY / innerHeight - 0.5) * 40;
      
      gsap.to(gridRef.current, {
        x,
        y,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50">
      {/* Primary Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-[4px] z-10" />
        <div className="absolute inset-0 opacity-40 bg-[url('/Gold_Flow_Light.jpg.jpeg')] bg-cover bg-center" />
      </div>

      {/* SVG Grid Overlay - Parallax Layer */}
      <div 
        ref={gridRef}
        className="absolute inset-[-50px] z-10 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20 w-full text-center">
        {/* Added a glassmorphism backdrop to the text to prevent any visual overlap with the grid */}
        <div className="bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/50">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight leading-[1.1] text-slate-900 mb-8">
            From Idea to Impact — <br />
            <span className="text-slate-600">Fast, Lean, and Profitable.</span>
          </h1>

          <p className="text-lg md:text-xl leading-loose max-w-3xl mx-auto text-slate-700 mb-12">
            Avora Ventures operates as a family-office-style incubator. We identify gaps in high-potential markets, validate them through lean MVPs, and build sustainable ventures around proven demand.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="#contact" className="btn-primary group !px-10 !py-5 text-base shadow-[0_8px_30px_-8px_rgba(184,134,11,0.6)] hover:shadow-[0_12px_40px_-10px_rgba(184,134,11,0.8)]">
              Discuss Your Venture
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#portfolio" className="btn-secondary !px-10 !py-5 text-base bg-white/80 hover:bg-white backdrop-blur shadow-sm">
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
