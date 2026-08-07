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
    slug: 'ai-solutions',
    stageIndex: 0,
    title: 'AI Solutions',
    desc: 'Turning quality data and trained models into production-ready AI systems \u2014 from problem framing to live monitoring.',
    image: '/service_data_generation.webp',
  },
  {
    id: '02',
    slug: 'generation',
    stageIndex: 1,
    title: 'Data Generation',
    desc: 'Engineering synthetic data to solve scarcity, protect privacy, and simulate edge cases for model training.',
    image: '/service_data_generation.webp',
  },
  {
    id: '03',
    slug: 'annotation',
    stageIndex: 2,
    title: 'Data Annotation',
    desc: 'Creating clear ontologies and guidelines to label complex data accurately through expert-guided workflows.',
    image: '/service_data_annotation.webp',
  },
  {
    id: '04',
    slug: 'labeling',
    stageIndex: 3,
    title: 'Data Labeling',
    desc: 'Converting unstructured data streams into clean training sets with multi-pass consensus verification.',
    image: '/service_dqa.png',
  },
  {
    id: '05',
    slug: 'quality',
    stageIndex: 4,
    title: 'Data Quality Assurance',
    desc: 'Auditing datasets across eight dimensions including accuracy, completeness, and consistency before training.',
    image: '/service_data_annotation.webp',
  },
  {
    id: '06',
    slug: 'ai-talent-solutions',
    stageIndex: 5,
    title: 'AI Talent Solutions',
    desc: 'On-demand AI specialists \u2014 data scientists, ML engineers, annotation leads \u2014 embedded directly in your team on a project or retainer basis.',
    image: '/service_ai.webp',
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
        <div className="services-header-el max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="font-heading text-4xl sm:text-5xl uppercase tracking-wide text-slate-900 leading-tight mb-6">
            Six disciplines.
            <br />
            <span className="text-[#B8860B]">One delivery framework.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
            From AI talent deployment to production-ready AI systems — six interconnected capabilities that turn raw data into reliable intelligence. Hover or click any card to explore.
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

        {/* 3x2 Grid for 6 disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="flip-card-container relative w-full aspect-[16/11] min-h-[300px] sm:min-h-[340px] cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
            >
              <div
                className="flip-card-inner w-full h-full relative rounded-2xl shadow-md border border-slate-200 bg-white"
                style={{
                  transform: flippedIndex === i ? 'rotateY(180deg)' : undefined
                }}
              >
                {/* Front */}
                <div className="flip-card-front absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8">
                    <div>
                      <h3 className="text-white font-heading text-2xl sm:text-3xl uppercase tracking-wide drop-shadow-md">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0 w-full h-full bg-slate-900 rounded-2xl p-8 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-heading text-2xl uppercase tracking-wide text-white mb-4">
                      {s.title}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed font-medium">
                      {s.desc}
                    </p>
                  </div>

                  <Link
                    href={`/services?stage=${s.stageIndex}`}
                    className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end text-[#D4AF37] font-bold hover:translate-x-1 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xl">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Our Services CTA Section */}
        <div className="text-center pt-8 border-t border-slate-200 max-w-xl mx-auto">
          <p className="text-slate-700 text-sm sm:text-base mb-6 font-medium">
            Explore our end-to-end framework, lifecycles, and verified case studies across all six core disciplines.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-[#B8860B] hover:bg-[#a07508] text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 font-bold"
          >
            <span>Explore Our Services</span>
            <span className="text-base">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
