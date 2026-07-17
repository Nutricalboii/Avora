'use client';

import React from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import {
  Database,
  Tag,
  Tags,
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
} from 'lucide-react';

const stages = [
  {
    number: '01',
    title: 'Data Generation',
    summary: 'Synthetic data for scarcity, privacy, and scale.',
    icon: Database,
    href: '/#services?tab=data-generation',
    span: 'sm:col-span-2',
  },
  {
    number: '02',
    title: 'Data Annotation',
    summary: 'Ontologies and guidelines that define what to learn.',
    icon: Tag,
    href: '/#services?tab=data-annotation',
    span: '',
  },
  {
    number: '03',
    title: 'Labeling',
    summary: 'Consensus-verified annotation at scale.',
    icon: Tags,
    href: '/#services?tab=labeling',
    span: '',
  },
  {
    number: '04',
    title: 'Auditing',
    summary: 'Eight-dimension quality gate before training.',
    icon: ShieldCheck,
    href: '/#services?tab=auditing',
    span: '',
  },
  {
    number: '05',
    title: 'AI Implementation',
    summary: 'Production ML systems, deployed and monitored.',
    icon: BrainCircuit,
    href: '/#services?tab=ai-implementation',
    span: 'sm:col-span-2',
  },
];

export default function HeroBento() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="w-full">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-[var(--accent)] block mb-1">
            The pipeline
          </span>
          <p className="text-sm text-[var(--foreground-muted)]">
            Five stages, one continuous sequence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <Link
              key={stage.number}
              href={stage.href}
              className={cn(
                'group relative glass-panel p-5 rounded-2xl transition-all duration-500',
                'hover:border-[var(--accent)]/40 hover:shadow-premium',
                'hover:-translate-y-1',
                stage.span,
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-semibold text-[var(--accent)] uppercase tracking-[0.18em]">
                  Stage {stage.number}
                </span>
                <div className="w-9 h-9 rounded-full bg-[var(--accent-tint)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors duration-300">
                  <Icon className="w-4 h-4 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>

              <h3 className="text-base font-heading font-bold text-[var(--foreground)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                {stage.title}
              </h3>

              <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed">
                {stage.summary}
              </p>

              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-0.5">
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
