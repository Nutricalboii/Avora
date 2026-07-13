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
  {
    number: '01',
    title: 'Data Generation',
    summary: 'Engineering synthetic data for scarcity, privacy, and scale',
    icon: Database,
    href: '/insights#stage-01',
  },
  {
    number: '02',
    title: 'Data Annotation',
    summary: 'The foundational act of giving raw data meaning',
    icon: Tag,
    href: '/insights#stage-02',
  },
  {
    number: '03',
    title: 'Data Labeling',
    summary: 'Operationalising annotation at scale',
    icon: Tags,
    href: '/insights#stage-03',
  },
  {
    number: '04',
    title: 'Quality Assurance',
    summary: 'Making data fit for purpose across eight dimensions',
    icon: ShieldCheck,
    href: '/insights#stage-04',
  },
  {
    number: '05',
    title: 'AI Solutions',
    summary: 'Where quality data becomes engineered systems',
    icon: BrainCircuit,
    href: '/insights#stage-05',
  },
  {
    number: '06',
    title: 'Specialized Outsourcing',
    summary: 'The expertise layer that accelerates any stage',
    icon: Users,
    href: '/insights#stage-06',
  },
];

export default function HeroBento() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <div ref={ref} className="w-full">
      {/* Section Header */}
      <div className="mb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] mb-2 block">
          AI Delivery Playbook
        </span>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
          Six disciplines, one continuous pipeline
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <Link
              key={stage.number}
              href={stage.href}
              className={cn(
                'group relative glass-panel p-4 rounded-xl transition-all duration-300',
                'hover:border-[#D4AF37]/40 hover:shadow-lg hover:shadow-[#D4AF37]/5',
                'hover:-translate-y-0.5',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Stage Number */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                  Stage {stage.number}
                </span>
                <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-[#D4AF37] transition-colors">
                {stage.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed line-clamp-2">
                {stage.summary}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-5">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#D4AF37] hover:text-[#B8962D] transition-colors group"
        >
          Explore the full playbook
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
