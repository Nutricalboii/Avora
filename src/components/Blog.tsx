'use client';

import React from 'react';
import { useReveal } from '@/hooks/useInView';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'Consensus algorithms in high-fidelity data labeling',
    excerpt:
      'How double-blind consensus and model-assisted validation produce annotation workloads you can actually train on.',
    date: 'July 10, 2026',
    author: 'Engineering Team',
    category: 'Technical',
    readTime: '6 min read',
  },
  {
    title: 'Scaling domain-specific LLMs for enterprise operations',
    excerpt:
      'Deploying secure, low-latency private models with SHAP-based interpretability and drift monitoring built in.',
    date: 'June 28, 2026',
    author: 'ML Infrastructure Leads',
    category: 'AI Infrastructure',
    readTime: '8 min read',
  },
  {
    title: 'Why dataset quality gates beat model tuning',
    excerpt:
      'Most model performance gains come from the data layer, not the architecture. A practical case for auditing before training.',
    date: 'June 15, 2026',
    author: 'Operations Team',
    category: 'Industry Insight',
    readTime: '5 min read',
  },
];

export default function Blog() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="blog"
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mb-16 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="section-eyebrow">Blog</span>
          <h2 className="section-heading mb-5">Notes from the pipeline.</h2>
          <p className="section-subtext max-w-xl">
            Engineering updates, methodology notes, and operational lessons from the team that
            runs the pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group card card-hover rounded-2xl p-8 flex flex-col justify-between cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
                willChange: 'transform, opacity',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)]/25 bg-[var(--accent-tint)] rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-5 flex items-center justify-between">
                <div className="flex items-center gap-5 text-[11px] text-[var(--foreground-muted)] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {post.author}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[var(--accent-tint)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



