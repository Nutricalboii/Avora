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
    title: 'Data Annotation and Labelling',
    desc: 'We deploy precise ontologies and high-volume labeling using modality-specific tooling and model-assisted automation — accelerating data readiness without compromising accuracy.',
    detail: 'Model-assisted pre-labeling reduces manual overhead while structured human review cycles ensure every ontology is correctly applied at scale.',
    image: '/data annotation.png',
    imageRight: false,
    shortDesc: 'Precise ontologies and high-volume labeling with expert tooling.',
    posClasses: 'top-[10%] left-[5%] sm:top-[15%] sm:left-[15%]',
  },
  {
    title: 'Data Generation',
    desc: 'We engineer robust, physics-informed synthetic datasets under expert domain oversight — ensuring AI models have a high-fidelity foundation even when real-world data is scarce or inaccessible.',
    detail: 'Every synthetic dataset passes through multi-layer fidelity checks before approval. Edge-case richness and statistical diversity are built in by design, not retrofitted.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&fit=crop&auto=format',
    imageRight: true,
    shortDesc: 'Robust, physics-informed synthetic datasets under expert domain oversight.',
    posClasses: 'top-[20%] right-[5%] sm:top-[20%] sm:right-[15%]',
  },
  {

    title: 'AI Implementation',
    desc: 'We build and launch custom AI MVPs rapidly — treating initial infrastructure as a measurable hypothesis and scaling computational resources only when commercial value is proven.',
    detail: 'Post-validation, we architect secure, interpretable AI systems with SHAP-based explainability and drift monitoring from day one. Deployments are lean, measurable, and built to scale.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&fit=crop&auto=format',
    imageRight: false,
    shortDesc: 'Custom AI MVPs built rapidly with secure, interpretable architecture.',
    posClasses: 'bottom-[20%] left-[5%] sm:bottom-[20%] sm:left-[20%]',
  },
  {
    title: 'Quality Testing and Analysis',
    desc: 'Our multi-stage QA framework enforces strict inter-annotator agreement metrics. Datasets are version-controlled and treated like software releases — never shipped until they pass.',
    detail: 'Automated agreement scoring, expert spot-checks, and adversarial edge-case stress tests run in sequence. Datasets that fall short are re-annotated, not delivered.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&fit=crop&auto=format',
    imageRight: true,
    shortDesc: 'Multi-stage QA framework enforcing strict inter-annotator agreement metrics.',
    posClasses: 'bottom-[10%] right-[5%] sm:bottom-[15%] sm:right-[20%]',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Intro floating animation
    services.forEach((_, i) => {
      gsap.to(`.float-item-${i}`, {
        y: i % 2 === 0 ? -15 : 15,
        duration: 2 + i * 0.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    gsap.fromTo('.services-heading',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
      }
    );

    const slides = gsap.utils.toArray('.service-slide') as HTMLElement[];
    slides.forEach((slide) => {
      const textEl = slide.querySelector('.slide-text');
      const imageEl = slide.querySelector('.slide-image');
      if (textEl) {
        gsap.fromTo(textEl, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: slide, start: 'top 78%' },
        });
      }
      if (imageEl) {
        gsap.fromTo(imageEl, { opacity: 0, scale: 0.97 }, {
          opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: slide, start: 'top 78%' },
        });
      }
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="bg-white">
      {/* Intro Section */}
      <div className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50 border-b border-slate-200 py-16">
        <div className="text-center z-10 pointer-events-none px-4 max-w-sm">
          <h2 
            className="font-heading uppercase tracking-wide text-slate-900 leading-tight mb-4" 
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Our Services
          </h2>
          <p className="font-sans text-slate-600 text-sm md:text-base leading-[1.7]">
            Hover or click on the icons to explore our core offerings.
          </p>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 max-w-screen-xl mx-auto">
          {services.map((service, i) => (
            <div 
              key={i} 
              tabIndex={0}
              className={`absolute float-item-${i} group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:!scale-110 focus:!scale-110 z-20 outline-none ${service.posClasses}`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white mb-2 sm:mb-3">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <span className="font-sans font-semibold text-slate-800 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-sm text-xs sm:text-sm text-center whitespace-nowrap border border-slate-100">
                {service.title}
              </span>
              <div className="absolute top-full mt-2 sm:mt-3 w-56 sm:w-64 bg-white p-3 sm:p-4 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all duration-300 z-30 pointer-events-none border border-slate-100">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{service.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-16 md:pt-24 pb-10">
        <div className="services-heading max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-20 text-center mb-12 md:mb-16">
          <p className="font-sans text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-[1.7]">
            We engineer AI foundations from the ground up — synthetic data, precision annotation, rigorous auditing, and production deployment.
          </p>
        </div>

        {services.map((service, i) => (
          <div
            key={i}
            className={`service-slide py-16 md:py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <div className="max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-20">
              <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[400px] gap-10 lg:gap-16`}>

                <div className={`slide-text flex flex-col justify-center ${
                  !service.imageRight ? 'lg:order-2' : ''
                }`}>
                  <h3
                    className="font-heading uppercase tracking-wide text-[#B8860B] leading-[1.05] mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {service.title}
                  </h3>

                  <p className="font-sans text-slate-700 text-base md:text-lg leading-[1.85] mb-5">
                    {service.desc}
                  </p>
                  <p className="font-sans text-slate-500 text-sm md:text-base leading-[1.85]">
                    {service.detail}
                  </p>
                </div>

                <div className={`slide-image relative overflow-hidden rounded-sm min-h-[320px] lg:min-h-0 ${
                  !service.imageRight ? 'lg:order-1' : ''
                }`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className={`absolute inset-0 ${
                    service.imageRight
                      ? 'bg-gradient-to-r from-white/15 via-transparent to-transparent'
                      : 'bg-gradient-to-l from-white/15 via-transparent to-transparent'
                  }`} />
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
