'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
import { Calendar, User } from 'lucide-react';

const posts = [
  {
    slug: 'consensus-algorithms-data-labeling',
    title: 'Consensus Algorithms in High-Fidelity Data Labeling',
    excerpt:
      'How double-blind consensus and model-assisted validation produce annotation workloads you can actually train on.',
    date: 'July 10, 2026',
    author: 'Engineering Team',
    category: 'Technical',
    readTime: '6 min',
  },
  {
    slug: 'scaling-domain-specific-llms',
    title: 'Scaling Domain-Specific LLMs for Enterprise Operations',
    excerpt:
      'Deploying secure, low-latency private models with SHAP-based interpretability and drift monitoring built in.',
    date: 'June 28, 2026',
    author: 'ML Infrastructure Leads',
    category: 'AI Infrastructure',
    readTime: '8 min',
  },
  {
    slug: 'dataset-quality-vs-model-tuning',
    title: 'Why Dataset Quality Gates Beat Model Tuning',
    excerpt:
      'Most model performance gains come from the data layer, not the architecture. A practical case for auditing before training.',
    date: 'June 15, 2026',
    author: 'Operations Team',
    category: 'Industry Insight',
    readTime: '5 min',
  },
  {
    slug: 'synthetic-data-rare-disease',
    title: 'Synthetic Data Strategies for Rare Disease Diagnostics',
    excerpt:
      'When confirmed training cases number in the dozens, physics-informed generation backed by differential privacy is the only viable path forward.',
    date: 'May 30, 2026',
    author: 'Data Science Team',
    category: 'Technical',
    readTime: '7 min',
  },
  {
    slug: 'demand-forecasting-at-scale',
    title: 'Demand Forecasting at Scale with Explainable ML',
    excerpt:
      'How we embedded SHAP-based interpretability layers into a multi-SKU forecasting system to satisfy enterprise procurement audits.',
    date: 'May 12, 2026',
    author: 'Engineering Team',
    category: 'AI Infrastructure',
    readTime: '6 min',
  },
];

export default function BlogPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo('.blog-header > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
    gsap.fromTo('.blog-post',
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-post', start: 'top 85%' }
      }
    );
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen" style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}>
      {/* Page header */}
      <div className="border-b border-slate-200 pt-36 pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="blog-header flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[13px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
                Avora / Blog
              </p>
              <h1 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
                Notes From<br/>The Pipeline.
              </h1>
            </div>
            <p className="text-base md:text-lg text-slate-900 max-w-sm leading-relaxed md:pb-4 font-sans font-medium">
              Engineering updates, methodology notes, and operational lessons from the team that runs the pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* Featured post — first entry, large */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="blog-post group block border border-slate-200/80 bg-white/95 hover:bg-white rounded-sm p-8 md:p-12 mb-12 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-6 items-end hover:bg-white/30 transition-colors duration-200"
        >
          <div className="xl:col-span-2 mb-4 xl:mb-0">
            <p className="font-mono text-[13px] tracking-[0.2em] text-slate-700 uppercase mb-4">Featured</p>
            <span className="font-mono font-semibold text-xs tracking-[0.15em] uppercase text-[#B8860B] border border-[#B8860B]/30 px-3 py-1.5 whitespace-nowrap inline-block">
              {posts[0].category}
            </span>
          </div>
          <div className="xl:col-span-7">
            <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-wide text-slate-900 mb-6 leading-tight">
              {posts[0].title}
            </h2>
            <p className="font-sans font-medium text-lg md:text-xl text-slate-900 leading-relaxed max-w-2xl">
              {posts[0].excerpt}
            </p>
          </div>
          <div className="xl:col-span-3 xl:text-right mt-6 xl:mt-0">
            <div className="font-mono text-base text-slate-700 tracking-[0.15em] uppercase space-y-2 mb-8">
              <p>{posts[0].date}</p>
              <p>{posts[0].readTime} read</p>
              <p>{posts[0].author}</p>
            </div>
            <div className="inline-flex items-center gap-3 font-mono font-semibold text-sm tracking-[0.15em] uppercase text-slate-700">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Rest of posts — table rows */}
        {posts.slice(1).map((post, i) => (
          <div key={i} className="blog-post group block border border-slate-200/80 bg-white/95 hover:bg-white rounded-sm p-6 md:p-8 mb-6 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 xl:grid-cols-12 gap-6 items-center hover:bg-white/30 transition-colors duration-200"
          >
            <div className="xl:col-span-1">
              <span className="font-mono font-semibold text-sm tracking-[0.2em] text-slate-700 uppercase">0{i + 2}</span>
            </div>
            <div className="xl:col-span-2 mb-4 xl:mb-0">
              <span className="font-mono font-semibold text-xs tracking-[0.15em] uppercase text-[#B8860B] border border-[#B8860B]/30 px-3 py-1.5 whitespace-nowrap inline-block">
                {post.category}
              </span>
            </div>
            <div className="xl:col-span-6">
              <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-wide text-slate-900 leading-tight">
                {post.title}
              </h3>
              <p className="font-sans font-medium text-base text-slate-900 mt-3 leading-relaxed hidden xl:block">{post.excerpt}</p>
            </div>
            <div className="xl:col-span-2 mb-4 xl:mb-0 font-mono font-semibold text-sm text-slate-700 tracking-[0.12em] uppercase space-y-1">
              <p className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#B8860B]" />{post.date}</p>
              <p className="flex items-center gap-2"><User className="w-3 h-3 text-[#B8860B]" />{post.author}</p>
            </div>
            <div className="xl:col-span-1 xl:text-right mt-4 xl:mt-0">
              <div className="w-10 h-10 border border-slate-200 flex items-center justify-center ml-auto">
                <span className="font-mono text-[11px] text-slate-700 tracking-wider">SOON</span>
              </div>
            </div>
          </div>
        ))}

        <p className="py-10 font-mono text-[13px] text-slate-700 tracking-[0.15em] uppercase">
          All posts reflect the operational views of the Avora Ventures team.
        </p>
      </div>
    </main>
  );
}









