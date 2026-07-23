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
    desc: 'We carefully label your data so that AI models can easily understand it. Our mix of smart tools and human experts ensures high accuracy at any scale.',
    detail: 'We use AI to speed up the first pass of labeling, and then our expert team double-checks everything to guarantee top-tier quality.',
    image: '/data annotation.webp',
    imageRight: false,
    shortDesc: 'Accurate and fast data labeling powered by smart tools and human experts.',
    posClasses: 'top-[5%] left-[2%] md:top-[10%] md:left-[5%] lg:left-[10%]',
  },
  {
    title: 'Data Generation',
    desc: 'We create highly realistic artificial data for training AI when real-world data is hard to find, too expensive, or restricted by privacy rules.',
    detail: 'Every generated dataset is rigorously tested to ensure it matches real-world scenarios, including rare edge cases that your AI needs to learn.',
    image: '/data generation.webp',
    imageRight: true,
    shortDesc: 'Creating realistic artificial data when real-world data is hard to get.',
    posClasses: 'top-[5%] right-[2%] md:top-[10%] md:right-[5%] lg:right-[10%]',
  },
  {
    title: 'AI Implementation',
    desc: 'We quickly build and launch custom AI solutions tailored to your business, helping you test your ideas in the real world before scaling up.',
    detail: 'Once proven, we turn your prototype into a secure, scalable, and easy-to-understand system that continuously monitors its own performance.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&fit=crop&auto=format',
    imageRight: false,
    shortDesc: 'Rapidly building and launching custom AI solutions tailored to your needs.',
    posClasses: 'bottom-[5%] left-[2%] md:bottom-[10%] md:left-[5%] lg:left-[10%]',
  },
  {
    title: 'Quality Testing and Analysis',
    desc: 'We thoroughly test your datasets and AI models to make sure everything works perfectly. We treat data quality with the same strict standards as software code.',
    detail: 'Through automated checks and expert reviews, we push your systems to their limits. If something falls short, we fix it before it ever reaches you.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&fit=crop&auto=format',
    imageRight: true,
    shortDesc: 'Thorough testing to guarantee your data and models work perfectly.',
    posClasses: 'bottom-[5%] right-[2%] md:bottom-[10%] md:right-[5%] lg:right-[10%]',
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Organic floating animation
    services.forEach((_, i) => {
      gsap.to(`.float-item-${i}`, {
        y: i % 2 === 0 ? -20 : 20,
        duration: 3.5 + i * 0.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to(`.float-item-${i}`, {
        x: i % 2 === 0 ? 15 : -15,
        duration: 4.2 + i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to(`.float-item-${i}`, {
        rotation: i % 2 === 0 ? 5 : -5,
        duration: 3.8 + i * 0.2,
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
        <div className="text-center z-10 pointer-events-none px-4 max-w-sm mb-12">
          <h2 
            className="font-heading uppercase tracking-wide text-[#B8860B] leading-tight mb-4" 
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            Our Services
          </h2>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 max-w-screen-xl mx-auto">
          {services.map((service, i) => (
            <div 
              key={i} 
              tabIndex={0}
              className={`absolute float-item-${i} group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:!scale-110 focus:!scale-110 z-20 outline-none ${service.posClasses}`}
              style={{ willChange: 'transform' }}
            >
              <div className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-2 md:mb-3 bg-white">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover object-center" />
              </div>
              <span className="font-sans font-semibold text-[#1e293b] bg-[#eef6fc] px-4 py-2 rounded-2xl shadow-sm text-sm sm:text-base text-center whitespace-normal break-words max-w-[140px] md:max-w-[180px] border border-[#dbeafe] leading-tight">
                {service.title}
              </span>
              <div className={`absolute ${i < 2 ? 'top-full mt-4 sm:mt-6' : 'bottom-full mb-4 sm:mb-6'} w-60 sm:w-72 bg-white p-4 sm:p-5 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all duration-300 z-30 pointer-events-none border border-slate-100`}>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">{service.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-16 md:pt-24">
        <div className="services-heading max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-20 text-center mb-8 md:mb-12">
          <p className="font-sans text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-[1.7]">
            We engineer AI foundations from the ground up — synthetic data, precision annotation, rigorous auditing, and production deployment.
          </p>
        </div>

        {services.map((service, i) => (
          <div
            key={i}
            className={`service-slide ${i === 0 ? 'pb-16 md:pb-24 pt-4 md:pt-6' : 'py-16 md:py-24'} ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
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

                <div className={`slide-image relative overflow-hidden rounded-xl min-h-[320px] h-full w-full bg-white shadow-sm ${
                  !service.imageRight ? 'lg:order-1' : ''
                }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className={`absolute inset-0 pointer-events-none ${
                    service.imageRight
                      ? 'bg-gradient-to-r from-slate-50/20 via-transparent to-transparent'
                      : 'bg-gradient-to-l from-white/20 via-transparent to-transparent'
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
