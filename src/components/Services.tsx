'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    index: '01',
    label: 'Data Generation',
    title: 'Synthetic Data Engineering',
    desc: 'We engineer robust, physics-informed synthetic datasets under expert domain oversight — ensuring AI models have a high-fidelity foundation even when real-world data is scarce or inaccessible.',
    detail: 'Every synthetic dataset passes through multi-layer fidelity checks before approval for model training. Edge-case richness and statistical diversity are built in by design, not retrofitted.',
    image: '/service_data_generation.png',
    stat: '60%',
    statLabel: 'Faster Data Readiness',
    imageRight: true,
  },
  {
    index: '02',
    label: 'Data Annotation',
    title: 'Precision Labeling Workflows',
    desc: 'We deploy precise ontologies and high-volume labeling using modality-specific tooling and model-assisted automation — accelerating data readiness without compromising accuracy.',
    detail: 'Model-assisted pre-labeling reduces manual overhead while structured human review cycles ensure every ontology is correctly applied at scale. Speed and precision are not trade-offs.',
    image: '/service_data_annotation.png',
    stat: '0.91+',
    statLabel: 'Kappa Agreement Score',
    imageRight: false,
  },
  {
    index: '03',
    label: 'Data Auditing',
    title: 'Quality Assurance & Validation',
    desc: 'Our multi-stage QA framework enforces strict inter-annotator agreement metrics. Datasets are version-controlled and treated like software releases — never shipped until they pass.',
    detail: 'Automated agreement scoring, expert spot-checks, and adversarial edge-case stress tests run in sequence. Datasets below our Kappa threshold are routed to re-annotation, not to clients.',
    image: '/service_data_auditing.png',
    stat: '100%',
    statLabel: 'Versioned Releases',
    imageRight: true,
  },
  {
    index: '04',
    label: 'AI Implementation',
    title: 'Custom Model Deployment',
    desc: 'We build and launch custom AI MVPs rapidly — treating initial infrastructure as a measurable hypothesis and scaling computational resources only when commercial value is proven.',
    detail: 'Post-validation, we architect secure, interpretable AI systems with SHAP-based explainability and drift monitoring from day one. Deployments are lean, measurable, and built to scale.',
    image: '/service_ai_implementation.png',
    stat: '2–6wk',
    statLabel: 'MVP to Deployment',
    imageRight: false,
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero section animation
    gsap.fromTo('.services-intro-text > *',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.0, stagger: 0.14, ease: 'power4.out',
        scrollTrigger: { trigger: '.services-intro', start: 'top 80%' },
      }
    );

    // Slide animations
    const slides = gsap.utils.toArray('.service-slide') as HTMLElement[];
    slides.forEach((slide) => {
      const textEl = slide.querySelector('.slide-text');
      const imageEl = slide.querySelector('.slide-image');

      if (textEl) {
        gsap.fromTo(textEl,
          { opacity: 0, x: -36 },
          {
            opacity: 1, x: 0, duration: 1.0, ease: 'power4.out',
            scrollTrigger: { trigger: slide, start: 'top 78%' },
          }
        );
      }
      if (imageEl) {
        gsap.fromTo(imageEl,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: slide, start: 'top 78%' },
          }
        );
      }
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="border-t border-slate-200/70">

      {/* ── Big centered intro slide ── */}
      <div
        className="services-intro relative flex flex-col items-center justify-center text-center min-h-[70vh] overflow-hidden"
      >
        {/* Full-bleed background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/services_hero_bg.png')` }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-900/70" />
        {/* Subtle gold gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/40" />

        <div className="services-intro-text relative z-10 max-w-3xl mx-auto px-6 sm:px-10">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37] mb-6 block">
            Our Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-white leading-tight mb-8">
            The Full Data &amp;<br />AI Lifecycle
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans max-w-xl mx-auto">
            We engineer AI foundations from the ground up — synthetic data creation, precision annotation,
            rigorous auditing, and production deployment as one continuous pipeline.
          </p>

          {/* Service index row */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3">
            {services.map((s) => (
              <span key={s.index} className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/70 flex items-center gap-2">
                <span className="text-white/30">{s.index}</span> {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Individual service slides ── */}
      {services.map((service, i) => (
        <div
          key={i}
          className={`service-slide border-b border-slate-200/60 last:border-b-0 ${
            i % 2 === 0
              ? 'bg-white/70'
              : 'bg-slate-50/70'
          }`}
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]`}>

              {/* Text Panel */}
              <div className={`slide-text flex flex-col justify-center py-16 md:py-20 ${
                service.imageRight
                  ? 'lg:pr-16 xl:pr-24'
                  : 'lg:pl-16 xl:pl-24 lg:order-2'
              }`}>
                {/* Index + label */}
                <div className="flex items-center gap-3 mb-7">
                  <span className="font-mono text-[10px] font-medium tracking-[0.3em] uppercase text-slate-400">
                    {service.index}
                  </span>
                  <div className="h-px w-8 bg-slate-200" />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B8860B]">
                    {service.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-wide text-slate-900 leading-tight mb-5">
                  {service.title}
                </h3>

                {/* Description — larger, readable */}
                <p className="text-slate-700 text-base md:text-[17px] leading-[1.75] font-sans mb-4">
                  {service.desc}
                </p>
                <p className="text-slate-500 text-sm md:text-[15px] leading-[1.75] font-sans">
                  {service.detail}
                </p>

                {/* Stat */}
                <div className="mt-10 pt-7 border-t border-slate-200 flex items-baseline gap-3">
                  <span className="font-heading text-4xl md:text-5xl text-[#B8860B] leading-none">
                    {service.stat}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                    {service.statLabel}
                  </span>
                </div>
              </div>

              {/* Image Panel */}
              <div className={`slide-image relative overflow-hidden ${
                service.imageRight ? 'lg:order-2' : 'lg:order-1'
              } min-h-[300px] lg:min-h-0`}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className={`absolute inset-0 ${
                  service.imageRight
                    ? 'bg-gradient-to-r from-white/20 via-transparent to-transparent'
                    : 'bg-gradient-to-l from-white/20 via-transparent to-transparent'
                }`} />
                {/* Watermark index */}
                <div className="absolute bottom-5 right-6 font-heading text-7xl text-white/10 leading-none select-none">
                  {service.index}
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
