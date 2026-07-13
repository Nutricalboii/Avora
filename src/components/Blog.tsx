'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

const posts = [
  {
    title: 'Consensus Algorithms in High-Fidelity Data Labeling',
    excerpt: 'How we achieve 99.98% annotation precision using double-blind consensus and model-assisted validation.',
    date: 'July 10, 2026',
    author: 'Engineering Team',
    category: 'Technical',
    readTime: '6 min read'
  },
  {
    title: 'Scaling Domain-Specific LLMs for Enterprise Operations',
    excerpt: 'Deploying secure, low-latency private models with SHAP-based interpretability and robust drift protection.',
    date: 'June 28, 2026',
    author: 'ML Infrastructure Leads',
    category: 'AI Infrastructure',
    readTime: '8 min read'
  },
  {
    title: 'The Shift to Variable Opex: Software Outsourcing Redefined',
    excerpt: 'Why institutional squads are replacing traditional recruitment cycles and saving over $500K in ramp-up costs.',
    date: 'June 15, 2026',
    author: 'Operations Team',
    category: 'Industry Insight',
    readTime: '5 min read'
  }
];

export default function Blog() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="blog" className="py-28 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(212,175,55,0.03),transparent_80%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className={cn("text-left mb-16 max-w-3xl transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <span className="section-eyebrow text-sm md:text-base">Insights &amp; Articles</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            Avora Technical Blog
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Rigorously compiled analysis, engineering updates, and strategic operational telemetry from our core development teams.
          </p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className={cn(
                "glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/5 transition-all duration-300 group relative",
                "bg-white/40 dark:bg-black/40 backdrop-blur-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/25 bg-[#D4AF37]/5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{post.readTime}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800/80 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-6 text-xs text-slate-550 dark:text-slate-550 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {post.author}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all">
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
