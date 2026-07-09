'use client';

import { useState } from 'react';
import { services } from '@/config/services';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { TechnicalGrid } from './ui/TechnicalGrid';
import { Activity, ShieldCheck, Database, Award, Code2 } from 'lucide-react';

export default function Services() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<string>("outsourcing");

  const currentService = services.find(s => s.id === activeTab) || services[0];
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden border-t border-slate-800 bg-[#0a0a0f]"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.9) 100%), url('/Institutional_Network.jpg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TechnicalGrid showDots={false} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div
          ref={ref}
          className={cn(
            'mb-16 transition-all duration-500',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="section-eyebrow">Technical Capabilities</span>
          <h2 className="section-heading mt-2 mb-4">
            System Operations Specification
          </h2>
          <p className="section-subtext max-w-xl">
            Avora operates four core execution pillars designed for deep system safety, technical rigor, and zero marketing abstractions.
          </p>
        </div>

        {/* Tabular Specification Console */}
        <div className="border border-slate-800 bg-[#121218]/90 backdrop-blur-md rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Left Panel: Service Selection (Tab navigation) */}
          <div className="lg:col-span-4 border-r border-slate-800 divide-y divide-slate-850 bg-[#0a0a0f]">
            {services.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={cn(
                    "w-full text-left p-6 transition-all duration-150 flex flex-col gap-2 hover:bg-white/[0.01]",
                    isActive ? "bg-white/[0.02] border-l-2 border-[#B08D57]" : "border-l-2 border-transparent"
                  )}
                >
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Pillar: {service.id.toUpperCase()}
                  </span>
                  <span className={cn(
                    "font-heading font-bold text-lg",
                    isActive ? "text-white" : "text-slate-400"
                  )}>
                    {service.title}
                  </span>
                  <span className="text-xs text-slate-500 font-sans line-clamp-1">{service.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Spec Sheet & Custom Graphic per service category */}
          <div className="lg:col-span-8 p-8 flex flex-col md:flex-row gap-8 justify-between">
            
            {/* Spec details */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-[#B08D57] uppercase tracking-widest block mb-1">
                  Capability Parameters
                </span>
                <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                  {currentService.title}
                </h3>
                <p className="text-sm font-sans text-slate-400 mt-1">{currentService.subtitle}</p>
              </div>

              <div className="h-px bg-slate-800" />

              <div className="space-y-4 font-sans text-slate-300 text-sm">
                <p className="leading-relaxed text-slate-400">
                  {currentService.description}
                </p>
                
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Key Operational Protocols:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {currentService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850">
                <span className="text-xs font-mono text-slate-500 uppercase block mb-1">Target SLA Objective:</span>
                <span className="text-sm font-mono font-bold text-[#B08D57] uppercase tracking-wider">
                  {currentService.metrics}
                </span>
              </div>
            </div>

            {/* Right block: Editorial Profile (Trust/Talent) OR Structural Diagram (Technical) */}
            <div className="w-full md:w-72 flex-shrink-0 flex flex-col justify-center border border-slate-800 bg-[#0a0a0f] rounded-xl p-6">
              
              {/* Outsourcing / Skill Hiring (Trust/Talent category) -> Clean Typographic References */}
              {(activeTab === 'outsourcing' || activeTab === 'skill-hiring') && (
                <div className="space-y-6 font-sans text-center">
                  <div className="flex justify-center">
                    <Award className="w-8 h-8 text-[#B08D57]/60" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Placement Quality Guarantee</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every engineer undergoes standard architectural assessments. Vetted via technical panels overseen by Stanford &amp; IIT leads.
                    </p>
                  </div>
                  <div className="border-t border-slate-850 pt-4 text-[10px] font-mono text-slate-500">
                    SLA: CONTINUOUS_COMPLIANCE
                  </div>
                </div>
              )}

              {/* Custom Machine Learning Pipelines (Technical category) -> Pipeline Flow Schematic */}
              {activeTab === 'ai-solutions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Pipeline Flow</span>
                    <span className="text-[9px] font-mono text-[#B08D57] uppercase font-bold">Active</span>
                  </div>
                  
                  {/* Micro-flow graphic */}
                  <div className="space-y-3 text-[10px] font-mono text-slate-300">
                    <div className="p-2 border border-slate-800 rounded bg-white/[0.01]">
                      <span className="text-slate-500 block">01 / INGESTION</span>
                      <span className="text-white block mt-0.5">Stream Reader API</span>
                    </div>
                    <div className="p-2 border border-slate-800 rounded bg-white/[0.01]">
                      <span className="text-slate-500 block">02 / ORCHESTRATION</span>
                      <span className="text-white block mt-0.5">Custom RAG Router</span>
                    </div>
                    <div className="p-2 border border-slate-800 rounded bg-white/[0.01]">
                      <span className="text-slate-500 block">03 / VALDIATION</span>
                      <span className="text-teal-400 block mt-0.5">Drift Telemetry</span>
                    </div>
                  </div>
                </div>
              )}

              {/* High-Fidelity Data Labeling (Technical category) -> Double-Blind Consensus Diagram */}
              {activeTab === 'data-annotations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Consensus Matrix</span>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Verified</span>
                  </div>

                  {/* Venn Diagram / overlap schematic */}
                  <div className="flex flex-col items-center justify-center py-2 space-y-4">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Intersecting rings */}
                      <div className="absolute top-0 left-2 w-14 h-14 rounded-full border border-[#B08D57]/60 bg-[#B08D57]/5 flex items-center justify-center text-[8px] text-slate-400 font-mono">Annotator_A</div>
                      <div className="absolute bottom-0 right-2 w-14 h-14 rounded-full border border-teal-500/60 bg-teal-500/5 flex items-center justify-center text-[8px] text-slate-400 font-mono">Annotator_B</div>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 text-center">Double-Blind Overlap consensus (99.98% Confidence Threshold)</p>
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
