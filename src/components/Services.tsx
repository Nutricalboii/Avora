'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Database, Tag, Tags, ShieldCheck, BrainCircuit, ArrowRight, Check } from 'lucide-react';
import { useReveal } from '@/hooks/useInView';
import { useSearchParams } from 'next/navigation';
import { services } from '@/config/services';

const iconMap: Record<string, React.ComponentType<any>> = {
  Database,
  Tag,
  Tags,
  ShieldCheck,
  BrainCircuit,
};

const aimSteps = [
  {
    phase: '01',
    title: 'Discovery',
    deliverable: 'Architectural bottleneck audit',
    artifact: 'Technical integration spec',
  },
  {
    phase: '02',
    title: 'Implementation',
    deliverable: 'Custom pipeline core',
    artifact: 'Consensus verification logs',
  },
  {
    phase: '03',
    title: 'Scaling',
    deliverable: 'Active cloud endpoint',
    artifact: 'Latency telemetry dashboard',
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('data-generation');
  const searchParams = useSearchParams();
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && services.some((s) => s.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const currentService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section id="services" className="py-28 md:py-36 relative overflow-hidden services-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="section-eyebrow">Services</span>
          <h2 className="section-heading mb-5">
            One pipeline, <br className="hidden sm:block" />
            five disciplines.
          </h2>
          <p className="section-subtext max-w-xl">
            Each stage feeds the next. Skip one and the model pays for it later — in drift,
            in bias, in production failures that could have been caught at the data layer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: stage selector */}
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide">
              {services.map((service, index) => {
                const isActive = service.id === activeTab;
                const Icon = iconMap[service.icon] || Database;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={cn(
                      'flex-shrink-0 lg:w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-start gap-4 group',
                      isActive
                        ? 'bg-white shadow-soft'
                        : 'hover:bg-white/60'
                    )}
                  >
                    <div
                      className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                        isActive
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--accent-tint)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">
                          0{index + 1}
                        </span>
                        <span
                          className={cn(
                            'text-[15px] font-heading font-bold transition-colors whitespace-nowrap',
                            isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'
                          )}
                        >
                          {service.title}
                        </span>
                      </div>
                      <span className="hidden lg:block text-[12px] text-[var(--foreground-muted)] leading-snug line-clamp-2">
                        {service.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-8">
            <div className="glass-panel-strong rounded-2xl p-8 md:p-12 h-full">
              <div key={activeTab} className="animate-stage-in space-y-8">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-[var(--accent)] uppercase tracking-[0.22em] block mb-3">
                    Stage 0{services.findIndex((s) => s.id === activeTab) + 1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-[var(--foreground)] tracking-tight mb-2">
                    {currentService.title}
                  </h3>
                  <p className="text-base text-[var(--foreground-muted)]">
                    {currentService.subtitle}
                  </p>
                </div>

                <div className="hairline-gold" />

                <p className="text-lg leading-relaxed text-[var(--foreground)] max-w-2xl">
                  {currentService.description}
                </p>

                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] block">
                    What this stage includes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {currentService.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-tint)] flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[var(--accent)]" />
                        </div>
                        <span className="text-[14px] text-[var(--foreground)] leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-6 border-t border-[var(--border)]">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] block mb-1">
                      Target benchmark
                    </span>
                    <span className="text-xl font-heading font-bold text-[var(--accent)]">
                      {currentService.metrics}
                    </span>
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
                  >
                    Discuss this stage
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {activeTab === 'ai-implementation' && (
                  <div className="pt-6 border-t border-[var(--border)]">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] block mb-4">
                      The A.I.M. delivery framework
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {aimSteps.map((step) => (
                        <div
                          key={step.phase}
                          className="rounded-xl border border-[var(--border)] bg-white/60 p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono font-bold text-[var(--accent)]">
                              PHASE {step.phase}
                            </span>
                          </div>
                          <h4 className="text-sm font-heading font-bold text-[var(--foreground)] mb-1">
                            {step.title}
                          </h4>
                          <p className="text-[12px] text-[var(--foreground-muted)] leading-snug">
                            {step.deliverable}
                          </p>
                          <p className="text-[11px] font-mono text-[var(--accent)] mt-2">
                            → {step.artifact}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
