'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { Database, ShieldCheck, Cpu } from 'lucide-react';

const steps = [
  {
    phase: "01",
    title: "Discovery",
    description: "We audit your architectural constraints, data modalities, and operational requirements. Every engagement begins with a deep, zero-assumption discovery session to map your integration blueprint.",
    icon: Database,
    deliverable: "Architectural Bottleneck Audit",
    artifact: "Technical Integration Specification"
  },
  {
    phase: "02",
    title: "Implementation",
    description: "Our systems engineers build clean, robust models and pipelines, executing rapid iteration cycles under transparent metrics and strict quality consensus rules.",
    icon: Cpu,
    deliverable: "Custom Pipeline Core",
    artifact: "Consensus Verification Logs"
  },
  {
    phase: "03",
    title: "Scaling",
    description: "We deploy secure code and pipelines directly into your private cloud infrastructure, establishing telemetry monitoring, drift guards, and ongoing SLA optimization.",
    icon: ShieldCheck,
    deliverable: "Active Cloud Endpoint",
    artifact: "Latency Telemetry Dashboard"
  }
];

export default function Process() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div
          ref={ref}
          className={cn(
            'mb-16 transition-all duration-500',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="section-eyebrow">Operational Methodology</span>
          <h2 className="section-heading mt-2 mb-4">
            The Avora A.I.M. Framework
          </h2>
          <p className="section-subtext max-w-xl">
            A three-stage framework optimized for engineering safety, pipeline predictability, and verifiable data precision.
          </p>
        </div>

        {/* Pipeline Schema Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="glass-panel p-6 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-150"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold text-[#D4AF37] px-2.5 py-1 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded">
                      PHASE {step.phase}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Technical Deliverables */}
                <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 mt-6 space-y-2.5 font-sans text-xs">
                  <div>
                    <span className="text-slate-500 uppercase block tracking-wider font-semibold font-mono text-[9px]">Key Deliverable:</span>
                    <span className="text-slate-700 dark:text-slate-300 block mt-0.5">{step.deliverable}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block tracking-wider font-semibold font-mono text-[9px]">Target Artifact:</span>
                    <span className="text-slate-700 dark:text-slate-300 block mt-0.5">{step.artifact}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
