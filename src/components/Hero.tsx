'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useInView';
import HeroBento from './HeroBento';

const stats = [
  { value: '5', label: 'Pipeline stages' },
  { value: '8', label: 'Quality dimensions' },
  { value: '0.94', label: 'Target entity F1' },
  { value: '2–6', label: 'Weeks to deploy' },
];

export default function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden hero-bg">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,26,14,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,26,14,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_50%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-white/60 backdrop-blur-sm text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[var(--accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Data to deployment, in one pipeline
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-heading font-bold tracking-[-0.03em] leading-[1.02] text-[var(--foreground)]">
              Build AI systems <br />
              <span className="text-[var(--foreground-muted)]">on data you can trust.</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed max-w-xl text-[var(--foreground-muted)]">
              Avora runs the full pipeline — data generation, annotation, labeling, quality
              auditing, and AI implementation — so the model you ship is trained on data that
              actually meets the bar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="btn-primary group">
                Start a conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#services" className="btn-secondary">
                Explore the pipeline
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-2 border-t border-[var(--border)]">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <span className="block text-3xl md:text-4xl font-heading font-bold text-[var(--foreground)]">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.16em] font-mono font-medium text-[var(--foreground-muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <HeroBento />
          </div>
        </div>
      </div>
    </section>
  );
}
