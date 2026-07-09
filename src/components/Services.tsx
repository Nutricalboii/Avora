'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { Award, Code2, Database, BrainCircuit, UserCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  metrics: string;
  category: 'trust-talent' | 'technology';
}

const services: Service[] = [
  {
    id: 'outsourcing',
    title: 'Software Outsourcing',
    subtitle: 'Elite engineering team composition & delivery',
    description: 'We place structured squads of senior developers directly into your codebase. You skip sourcing and infrastructure setup — we deliver fully integrated product sprints with continuous quality monitoring.',
    features: ['Technical verification oversight', 'Direct code integration SLAs', 'Daily agile sprint telemetry', 'Flexible scaling bandwidth'],
    metrics: 'Active placement: < 10 days',
    category: 'trust-talent',
  },
  {
    id: 'skill-hiring',
    title: 'Specialized Skill Hiring',
    subtitle: 'Rapid deployment of deep technical expertise',
    description: 'Need a principal Rust compiler developer, a smart contract security auditor, or an ML operations expert for a critical project slice? We source and deploy elite specialists for high-impact milestones.',
    features: ['Vetted deep specialty indexing', 'Fractional or full-time engagement', 'Immediate project onboarding', 'Replacement capability backup'],
    metrics: 'Deployment: 5 to 50 day sprints',
    category: 'trust-talent',
  },
  {
    id: 'ai-solutions',
    title: 'Custom AI & Automation',
    subtitle: 'Enterprise-grade cognitive pipeline construction',
    description: 'We construct secure, private RAG pipelines, fine-tuned domain LLMs, and highly-optimized autonomous agents that transform raw corporate knowledge databases into actionable operational nodes.',
    features: ['Double-blind data parsing schemas', 'Private cloud telemetry isolation', 'Domain-specific weights alignment', 'Real-time drift monitoring metrics'],
    metrics: 'MVP delivery: 2 to 6 weeks',
    category: 'technology',
  },
  {
    id: 'data-annotations',
    title: 'High-Fidelity Data Operations',
    subtitle: 'Consensus-verified human-in-the-loop datasets',
    description: 'Elite training data is the foundation of cognitive precision. We deliver double-blind labeled image, lidar, audio, and structured text data verified through multi-annotator consensus matrices.',
    features: ['Custom annotation tooling setups', 'Annotator agreement confidence score', 'Structured schema synthesis', 'Strict source privacy compliance'],
    metrics: 'Label precision: 99.98% consensus',
    category: 'technology',
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('outsourcing');
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="py-24 relative overflow-hidden services-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-left mb-16 max-w-3xl">
          <span className="section-eyebrow">Services &amp; Capabilities</span>
          <h2 className="section-heading mb-4">
            Elite Engineering. Proven Frameworks.
          </h2>
          <p className="section-subtext max-w-xl">
            Avora operates four core execution pillars designed for deep system safety, technical rigor, and zero marketing abstractions.
          </p>
        </div>

        {/* Tabular Specification Console */}
        <div className="glass-panel rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Left Panel: Service Selection (Tab navigation) */}
          <div className="lg:col-span-4 border-r border-slate-205 dark:border-slate-850 divide-y divide-slate-205 dark:divide-slate-850/60 bg-black/[0.01] dark:bg-slate-950/30">
            {services.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={cn(
                    "w-full text-left p-6 transition-all duration-150 flex flex-col gap-2 hover:bg-black/[0.02] dark:hover:bg-white/[0.01]",
                    isActive ? "bg-black/[0.02] dark:bg-white/[0.02] border-l-2 border-[#D4AF37]" : "border-l-2 border-transparent"
                  )}
                >
                  <span className={cn(
                    "font-heading font-bold text-lg",
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                  )}>
                    {service.title}
                  </span>
                  <span className="text-xs text-slate-550 dark:text-slate-500 font-sans line-clamp-1">{service.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Spec Sheet & Custom Graphic per service category */}
          <div className="lg:col-span-8 p-8 flex flex-col md:flex-row gap-8 justify-between">
            
            {/* Spec details */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Capability Parameters
                </span>
                <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
                  {currentService.title}
                </h3>
                <p className="text-sm font-sans text-slate-550 dark:text-slate-400 mt-1">{currentService.subtitle}</p>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-4 font-sans text-sm">
                <p className="leading-relaxed text-slate-650 dark:text-slate-400">
                  {currentService.description}
                </p>
                
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-500 uppercase tracking-wider block">Key Operational Protocols:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-850">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-500 uppercase block mb-1">Target SLA Objective:</span>
                <span className="text-sm font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                  {currentService.metrics}
                </span>
              </div>
            </div>

            {/* Right block: Editorial Profile (Trust/Talent) OR Structural Diagram (Technical) */}
            <div className="w-full md:w-72 flex-shrink-0 flex flex-col justify-center border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0a0a0f] rounded-xl p-6">
              
              {/* Outsourcing / Skill Hiring (Trust/Talent category) -> Clean Typographic References */}
              {(activeTab === 'outsourcing' || activeTab === 'skill-hiring') && (
                <div className="space-y-6 font-sans text-center">
                  <div className="flex justify-center">
                    <Award className="w-8 h-8 text-[#D4AF37]/60" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-550 dark:text-slate-500 uppercase tracking-wider block">Placement Quality Guarantee</span>
                    <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed">
                      Every engineer undergoes standard architectural assessments. Vetted via technical panels overseen by Stanford &amp; IIT leads.
                    </p>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-850 pt-4 text-[10px] font-mono text-slate-500">
                    SLA: CONTINUOUS_COMPLIANCE
                  </div>
                </div>
              )}

              {/* Custom Machine Learning Pipelines (Technical category) -> Pipeline Flow Schematic */}
              {activeTab === 'ai-solutions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Pipeline Flow</span>
                    <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold">Active</span>
                  </div>
                  
                  {/* Micro-flow graphic */}
                  <div className="space-y-3 text-[10px] font-mono text-slate-705 dark:text-slate-300">
                    <div className="p-2 border border-slate-200 dark:border-slate-800 rounded bg-black/[0.01] dark:bg-white/[0.01]">
                      <span className="text-slate-500 block">01 / INGESTION</span>
                      <span className="text-slate-900 dark:text-white block mt-0.5">Stream Reader API</span>
                    </div>
                    <div className="p-2 border border-slate-200 dark:border-slate-800 rounded bg-black/[0.01] dark:bg-white/[0.01]">
                      <span className="text-slate-500 block">02 / ORCHESTRATION</span>
                      <span className="text-slate-900 dark:text-white block mt-0.5">Custom RAG Router</span>
                    </div>
                    <div className="p-2 border border-slate-200 dark:border-slate-800 rounded bg-black/[0.01] dark:bg-white/[0.01]">
                      <span className="text-slate-500 block">03 / VALDIATION</span>
                      <span className="text-teal-600 dark:text-teal-400 block mt-0.5">Drift Telemetry</span>
                    </div>
                  </div>
                </div>
              )}

              {/* High-Fidelity Data Labeling (Technical category) -> Double-Blind Consensus Diagram */}
              {activeTab === 'data-annotations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">Consensus Matrix</span>
                    <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">Verified</span>
                  </div>

                  {/* Venn Diagram / overlap schematic */}
                  <div className="flex flex-col items-center justify-center py-2 space-y-4">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Intersecting rings */}
                      <div className="absolute top-0 left-2 w-14 h-14 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/5 flex items-center justify-center text-[8px] text-slate-550 dark:text-slate-400 font-mono">Annotator_A</div>
                      <div className="absolute bottom-0 right-2 w-14 h-14 rounded-full border border-teal-500/60 bg-teal-500/5 flex items-center justify-center text-[8px] text-slate-550 dark:text-slate-400 font-mono">Annotator_B</div>
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 text-center">Double-Blind Overlap consensus (99.98% Confidence Threshold)</p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
