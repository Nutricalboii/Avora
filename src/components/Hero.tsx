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
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden hero-bg">
      {/* Dynamic Overlay Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Enterprise Value Prop */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Logo — hidden on mobile (navbar shows it), visible md+ */}
            <div className="hidden md:flex items-center">
              <Logo size="lg" className="h-14 w-auto text-slate-900 dark:text-white" />
            </div>

            <div className="space-y-4">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 bg-black/[0.01] dark:bg-white/[0.02] backdrop-blur-sm text-xs font-mono font-bold tracking-wider text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Institutional AI Infrastructure
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Scale your vision <br />
                <span className="text-slate-500 dark:text-slate-400">with precision.</span>
              </h1>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-sans">
                Elite engineering talent, custom machine learning integrations, and high-fidelity data operations under one roof. We build the infrastructure that defines your operational future.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#B8962D] text-white text-sm font-semibold transition-all duration-150"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-305 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-150"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-300 dark:border-slate-800/60">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="block text-2xl font-mono font-bold text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold font-sans leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Clean, Restrained Data Pipeline Diagram */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-3">
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">DATA_ENGINE_SCHEMATIC</span>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Data Flow Diagram */}
              <div className="space-y-6 py-2">
                
                {/* Node 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/[0.01] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Source Layer</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Multi-Modal Raw Ingest</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">Image sequences, lidar streams, unstructured text corpora.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 ml-5" />

                {/* Node 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Processing Layer</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Double-Blind Consensus Labeling</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">Cross-annotator validation schemas with 99.9% precision.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 ml-5" />

                {/* Node 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/[0.01] dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Delivery Layer</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Secure Telemetry Egress</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">Private cloud deployment with continuous SLA monitoring.</p>
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
