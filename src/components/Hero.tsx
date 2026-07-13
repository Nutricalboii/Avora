'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ArrowRight, Database, Layers, ShieldCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const stats = [
  { value: '45+', label: 'DEPLOYED EXPERTS' },
  { value: '99.9%', label: 'VERIFIED SLA ACCURACY' },
  { value: '3x', label: 'CYCLE COMPRESSION' },
  { value: '$100M+', label: 'CLIENT VENTURE CAPITAL' },
];

export default function Hero() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section className="relative min-h-screen flex items-center pt-36 pb-28 overflow-hidden hero-bg">
      {/* Dynamic Overlay Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Headline and Enterprise Value Prop */}
          <div className="lg:col-span-6 text-left space-y-10">
            
            {/* Logo — hidden on mobile (navbar shows it), visible md+ */}
            <div className="hidden md:flex items-center">
              <Logo size="lg" className="h-16 w-auto text-slate-900 dark:text-white" />
            </div>

            <div className="space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-850 bg-black/[0.01] dark:bg-white/[0.02] backdrop-blur-sm text-sm font-mono font-bold tracking-wider text-[#D4AF37]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                Institutional AI Infrastructure
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Scale your vision <br />
                <span className="text-slate-500 dark:text-slate-400">with precision.</span>
              </h1>

              {/* Description */}
              <p className="text-slate-650 dark:text-slate-355 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-sans">
                Elite engineering talent, custom machine learning integrations, and high-fidelity data operations under one roof. We build the infrastructure that defines your operational future.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8962D] text-white text-base md:text-lg font-semibold shadow-lg shadow-[#D4AF37]/10 transition-all duration-150"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl border border-slate-305 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-base md:text-lg font-semibold transition-all duration-150"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-slate-300 dark:border-slate-800/60">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <span className="block text-3xl md:text-4xl font-mono font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-bold font-mono leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Clean, Restrained Data Pipeline Diagram */}
          <div className="lg:col-span-6 w-full">
            <div className="glass-panel p-10 space-y-8 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
                <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400">DATA_ENGINE_SCHEMATIC</span>
                <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ACTIVE
                </span>
              </div>

              {/* Data Flow Diagram */}
              <div className="space-y-8 py-2">
                
                {/* Node 1 */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Database className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase block tracking-wider">Source Layer</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white block">Multi-Modal Raw Ingest</span>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Image sequences, lidar streams, unstructured text corpora.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-8 w-px bg-gradient-to-b from-[#D4AF37] to-transparent ml-7" />

                {/* Node 2 */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Layers className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase block tracking-wider">Processing Layer</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white block">Double-Blind Consensus Labeling</span>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Cross-annotator validation schemas with 99.9% precision.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-8 w-px bg-gradient-to-b from-[#D4AF37] to-transparent ml-7" />

                {/* Node 3 */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0 shadow-md">
                    <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase block tracking-wider">Delivery Layer</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white block">Secure Telemetry Egress</span>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Private cloud deployment with continuous SLA monitoring.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
