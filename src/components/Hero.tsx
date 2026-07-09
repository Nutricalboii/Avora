'use client';

import { ArrowRight, ChevronRight, Activity, ShieldCheck, Database, Layers } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';
import { Logo } from './Logo';
import { TechnicalGrid } from './ui/TechnicalGrid';

const stats = [
  { value: '12+', label: 'Markets Scaled' },
  { value: '95%', label: 'Enterprise Retention' },
  { value: '50+', label: 'Systems Deployed' },
  { value: '3x', label: 'Accelerated Delivery' },
];

export default function Hero() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0a0a0f]"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(10, 10, 15, 0.35) 0%, rgba(10, 10, 15, 0.85) 100%), url('/Gold_Flow.jpg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Precision blueprint background grid */}
      <TechnicalGrid showDots={true} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Enterprise Value Prop */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Logo: Hidden on mobile/tablet to avoid duplicate logos in viewport */}
            <div className="hidden md:flex items-center">
              <Logo size="lg" className="h-12 w-auto text-white" />
            </div>

            <div className="space-y-4">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-white/[0.02] backdrop-blur-sm text-xs font-mono font-bold tracking-wider text-[#B08D57]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                Institutional AI Infrastructure
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.1]">
                Scale your vision <br />
                <span className="text-slate-400">with precision.</span>
              </h1>

              {/* Description */}
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-sans">
                Elite engineering talent, custom machine learning integrations, and high-fidelity data operations under one roof. We build the infrastructure that defines your operational future.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#B08D57] hover:bg-[#937343] text-white text-sm font-semibold transition-all duration-150"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700/50 hover:bg-white/5 text-slate-300 text-sm font-semibold transition-all duration-150"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-800/60">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="block text-2xl font-mono font-bold text-white">{stat.value}</span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-sans leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Clean, Restrained Data Pipeline Diagram */}
          <div className="lg:col-span-5 w-full">
            <div className="border border-slate-850 bg-[#121218]/90 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-400">DATA_ENGINE_SCHEMATIC</span>
                <span className="text-[10px] font-mono text-[#B08D57] uppercase font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Data Flow Diagram */}
              <div className="space-y-6 py-2">
                
                {/* Node 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-[#B08D57]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Source Layer</span>
                    <span className="text-xs font-bold text-white block">Multi-Modal Raw Ingest</span>
                    <p className="text-[11px] text-slate-400 truncate">Image sequences, lidar streams, unstructured text corpora.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-4 w-px bg-slate-800 ml-5" />

                {/* Node 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#B08D57]/10 border border-[#B08D57]/20 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5 text-[#B08D57]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Processing Layer</span>
                    <span className="text-xs font-bold text-white block">Double-Blind Consensus Labeling</span>
                    <p className="text-[11px] text-slate-400 truncate">Cross-annotator validation schemas with 99.9% precision.</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="h-4 w-px bg-slate-800 ml-5" />

                {/* Node 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Delivery Layer</span>
                    <span className="text-xs font-bold text-white block">Secure Telemetry Egress</span>
                    <p className="text-[11px] text-slate-400 truncate">Private cloud deployment with continuous SLA monitoring.</p>
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
