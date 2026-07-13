'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Award, Code2, Database, BrainCircuit, UserCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useSearchParams } from 'next/navigation';

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
    description: 'Global specialists without recruiting, retention, or benefits burden. Fixed hiring costs convert to variable operating expense. We place structured squads of senior developers directly into your codebase — delivering fully integrated product sprints with continuous quality monitoring, replacing months of ramp-up with days.',
    features: ['Active placement in under 10 days', 'Direct code integration SLAs', 'Daily agile sprint telemetry', 'Replacement capability guarantee'],
    metrics: 'Active placement: < 10 days · $500K+ client savings demonstrated',
    category: 'trust-talent',
  },
  {
    id: 'skill-hiring',
    title: 'Specialized Skill Hiring',
    subtitle: 'Rapid deployment of deep technical expertise',
    description: 'Need a principal Rust compiler developer, a smart contract security auditor, or an ML operations expert for a critical project slice? We source and deploy elite specialists for high-impact milestones. Domain risk is shared with a partner who lives in that domain daily — without the cost of building in-house.',
    features: ['Vetted deep specialty indexing', 'Fractional or full-time engagement', 'Immediate project onboarding', 'Partner carries domain risk'],
    metrics: 'Deployment: 5 to 50 day engagements',
    category: 'trust-talent',
  },
  {
    id: 'ai-solutions',
    title: 'Custom AI & Automation',
    subtitle: 'Enterprise-grade cognitive pipeline construction',
    description: 'We start with the business problem, not a preferred algorithm. Our teams construct secure RAG pipelines, fine-tuned domain LLMs, and ensemble models with SHAP-based explainability built in from day one. Human-in-the-loop design ensures planners and operators retain oversight — AI handles routine work, humans focus on exceptions.',
    features: ['Problem-first architecture scoping', 'Ensemble models over single-model bias', 'SHAP explainability for stakeholder trust', 'Human-in-the-loop by design'],
    metrics: 'MVP delivery: 2 to 6 weeks · 680% client ROI demonstrated',
    category: 'technology',
  },
  {
    id: 'data-annotations',
    title: 'High-Fidelity Data Operations',
    subtitle: 'Consensus-verified human-in-the-loop datasets',
    description: 'Inconsistent labels do not just add noise — they create dangerous overconfidence when test data shares annotation bias with training data. We deliver double-blind labeled image, lidar, audio, and structured text data through model-assisted pre-labeling, multi-annotator consensus matrices, and senior expert adjudication for all edge cases.',
    features: ['Model-assisted pre-labeling (60% time reduction)', 'Inter-annotator Kappa targeting 0.91+', 'Senior expert adjudication on disagreements', 'Multi-stage QA with formal sign-off'],
    metrics: 'F1 > 0.94 achieved · 99.98% consensus threshold',
    category: 'technology',
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('outsourcing');
  const searchParams = useSearchParams();
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && services.some((s) => s.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="py-24 relative overflow-hidden services-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
        <div className="glass-panel rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Panel: Service Selection (Tab navigation) */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-205 dark:border-slate-850 flex lg:flex-col overflow-x-auto scrollbar-hide bg-black/[0.01] dark:bg-slate-950/30">
            {services.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={cn(
                    "flex-shrink-0 lg:w-full text-left p-4 lg:p-6 transition-all duration-150 flex flex-col gap-1 hover:bg-black/[0.02] dark:hover:bg-white/[0.01] border-b-2 lg:border-b-0 lg:border-l-2",
                    isActive 
                      ? "bg-black/[0.02] dark:bg-white/[0.02] border-[#D4AF37]" 
                      : "border-transparent"
                  )}
                >
                  <span className={cn(
                    "font-heading font-bold text-sm lg:text-lg whitespace-nowrap",
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                  )}>
                    {service.title}
                  </span>
                  <span className="hidden lg:inline text-xs text-slate-550 dark:text-slate-500 font-sans line-clamp-1">{service.subtitle}</span>
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
