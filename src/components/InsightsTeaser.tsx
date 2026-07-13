'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import {
  Database,
  Tag,
  Tags,
  ShieldCheck,
  BrainCircuit,
  Users,
  ArrowRight,
} from 'lucide-react';

const stages = [
  { number: '01', title: 'Generation', icon: Database },
  { number: '02', title: 'Annotation', icon: Tag },
  { number: '03', title: 'Labeling', icon: Tags },
  { number: '04', title: 'Quality', icon: ShieldCheck },
  { number: '05', title: 'AI Solutions', icon: BrainCircuit },
  { number: '06', title: 'Outsourcing', icon: Users },
];

export default function InsightsTeaser() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(212,175,55,0.03),transparent_80%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={ref}
          className={cn(
            'text-left mb-12 max-w-3xl transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="section-eyebrow text-sm md:text-base">
            AI Delivery Playbook
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            Six disciplines, one continuous pipeline.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Raw data doesn&apos;t become intelligence by accident. Explore the complete framework behind every AI system we build.
          </p>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Link
                key={stage.number}
                href={`/insights#stage-${stage.number}`}
                className={cn(
                  'group glass-panel p-5 rounded-xl text-center transition-all duration-300',
                  'hover:border-[#D4AF37]/40 hover:shadow-lg hover:shadow-[#D4AF37]/5',
                  'hover:-translate-y-1',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  {stage.number}
                </span>
                <span className="text-sm font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  {stage.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-sans font-semibold text-sm hover:bg-[#D4AF37]/10 transition-all duration-200"
          >
            Read the full playbook
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
