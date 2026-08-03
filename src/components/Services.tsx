'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    image: '/service_data_generation.png',
  },
  {
    id: '02',
    stageIndex: 1,
    title: 'Data Annotation',
    desc: 'Creating clear ontologies and guidelines to label complex data accurately through expert-guided workflows.',
    image: '/service_data_annotation.png',
  },
  {
    id: '03',
    stageIndex: 2,
    title: 'Data Labeling',
    desc: 'Converting unstructured data streams into clean training sets with multi-pass consensus verification.',
    image: '/service_data_auditing.png',
  },
  {
    id: '04',
    stageIndex: 3,
    title: 'Quality Testing & Analysis',
    desc: 'Auditing datasets across eight dimensions including accuracy, completeness, and consistency before training.',
    image: '/service_ai_implementation.png',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.flip-card-container')) {
        setFlippedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

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
      '.flip-card-container',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.flip-card-container', start: 'top 80%' },
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
            Intelligent systems for high-stakes AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            We engineer raw information into production-ready intelligence. Hover or click any card to flip it and explore our methodologies.
          </p>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .flip-card-inner {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }
          @media (hover: hover) {
            .flip-card-container:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
          }
          .flip-card-front, .flip-card-back {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
        `}} />

        {/* Spin Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="flip-card-container relative w-full aspect-[4/3] sm:aspect-square max-w-[340px] md:max-w-full mx-auto cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
            >
              <div
                className="flip-card-inner w-full h-full relative rounded-2xl shadow-sm border border-slate-200 bg-white"
                style={{
                  transform: flippedIndex === i ? 'rotateY(180deg)' : undefined
                }}
              >
                {/* Front */}
                <div className="flip-card-front absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6">
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold mb-2">
                        STAGE {s.id}
                      </span>
                      <h3 className="text-white font-heading text-xl sm:text-2xl uppercase tracking-wide drop-shadow-md">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0 w-full h-full bg-slate-900 rounded-2xl p-6 flex flex-col justify-between text-left">
                  <div>
                    <span className="block font-mono text-[10px] tracking-widest text-[#D4AF37] font-bold mb-4">
                      STAGE {s.id}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl uppercase tracking-wide text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>

                  <Link
                    href={`/services?stage=${s.stageIndex}`}
                    className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#D4AF37] font-bold hover:translate-x-1 transition-transform"
                    onClick={(e) => e.stopPropagation()} // Stop bubble up so click goes to link
                  >
                    <span>Explore Methodology</span>
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
