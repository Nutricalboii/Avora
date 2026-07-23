'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const teaserPosts = [
  {
    category: 'Data Generation',
    title: 'How did we solve the AI cold-start problem?',
    href: '/blog',
  },
  {
    category: 'Data Annotation',
    title: 'Why is precision labeling the backbone of model accuracy?',
    href: '/blog',
  },
  {
    category: 'AI Implementation',
    title: 'What does a lean MVP to production deployment look like?',
    href: '/blog',
  },
];

export default function Blog() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.home-blog-header > *',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.home-blog-header', start: 'top 85%' }
      }
    );

    gsap.fromTo('.home-blog-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.home-blog-list', start: 'top 85%' }
      }
    );
  }, { scope: container });

  return (
    // Removed border-t
    <section
      id="blog"
      ref={container}
      className="py-20 md:py-28 relative overflow-hidden bg-white"
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

        <div className="home-blog-header max-w-3xl mx-auto text-center mb-16">
          {/* Big Gold Heading */}
          <h2 className="font-heading uppercase tracking-wide text-[#B8860B] leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Insights & Research
          </h2>
          {/* Small Black Subheading */}
          <span className="font-mono text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 block">
            From the Pipeline
          </span>
          {/* Bigger Caption */}
          <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Educational resources on data generation, annotation workflows, auditing standards, and AI deployment — straight from the team that runs the pipeline.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 hover:text-[#B8860B] transition-colors group"
          >
            View all articles
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="home-blog-list max-w-3xl mx-auto flex flex-col gap-4">
          {teaserPosts.map((post, index) => (
            <Link
              key={index}
              href={post.href}
              className="home-blog-item group flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 md:p-8 bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm rounded-sm transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1 min-w-0">
                <span className="font-mono text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 whitespace-nowrap shrink-0">
                  {post.category}
                </span>
                {/* Increased title size */}
                <h3 className="font-sans font-medium text-xl md:text-2xl text-slate-800 group-hover:text-[#B8860B] transition-colors leading-tight">
                  {post.title}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#B8860B] group-hover:text-[#B8860B] transition-colors shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
