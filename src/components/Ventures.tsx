'use client';

import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { Server, Activity, ShieldCheck, AreaChart } from 'lucide-react';

const projects = [
  {
    name: "NexusAI",
    architecture: "Generative Customer Success Engine",
    throughput: "140k queries / hour",
    metric: "+82% AI Referral Traffic",
    status: "Scaling",
    statusColor: "text-emerald-650 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    id: "AV-0849",
    spec: "Automated customer success and support ticketing platform powered by enterprise LLM routing."
  },
  {
    name: "HealthSync",
    architecture: "HIPAA-Compliant Secure Data Warehouse",
    throughput: "85k patient records / sec",
    metric: "Reduced Costs 10x",
    status: "Growing",
    statusColor: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
    id: "AV-9172",
    spec: "Secure data warehousing and real-time medical record analytics for distributed clinics."
  },
  {
    name: "NexusBuild",
    architecture: "Decentralized CI/CD Deployment Pipeline",
    throughput: "12k pipelines / day",
    metric: "10k+ Deployments",
    status: "Alpha",
    statusColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    id: "AV-4183",
    spec: "Automated CI/CD validation and telemetry pipelines for distributed web3 applications."
  }
];

export default function Ventures() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section 
      id="ventures" 
      className="relative py-24 md:py-32 overflow-hidden ventures-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div
          ref={ref}
          className={cn(
            'mb-16 transition-all duration-500',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="section-eyebrow">Case Studies &amp; Co-Development</span>
          <h2 className="section-heading mt-2 mb-4">Avora Ventures Studio</h2>
          <p className="section-subtext max-w-xl">
            We partner with, build, and deploy machine learning infrastructure for high-performance enterprise teams.
          </p>
        </div>

        {/* Console Dashboard Layout */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-slate-205 dark:border-slate-850 bg-slate-900/5 dark:bg-slate-900/30 gap-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">SYSTEM ARCHITECTURE METRIC REPORT</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-mono text-slate-550 dark:text-slate-500">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Live Clusters: 3/3</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Encryption: TLS_1.3</span>
            </div>
          </div>

          {/* Project Spec Cards */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {projects.map((proj, i) => (
              <div 
                key={i} 
                className="p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-all duration-150"
              >
                
                {/* Project Details */}
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                      {proj.name}
                    </span>
                    <span className={cn("px-2 py-0.5 border text-[9px] font-mono font-bold rounded uppercase", proj.statusColor)}>
                      {proj.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-650 dark:text-slate-400 font-sans leading-relaxed">
                    {proj.spec}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-slate-500 dark:text-slate-500">
                    <span className="flex items-center gap-1.5"><AreaChart className="w-3.5 h-3.5 text-slate-500" /> Deployment ID: {proj.id}</span>
                    <span>•</span>
                    <span>Architecture: {proj.architecture}</span>
                  </div>
                </div>

                {/* Technical Metrics Panel */}
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 justify-end items-stretch lg:items-center">
                  <div className="border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-[#0a0e16] p-4 rounded-lg min-w-[140px] text-center flex flex-col justify-center">
                    <span className="block text-[9px] font-mono font-bold text-slate-550 dark:text-slate-500 uppercase tracking-wider">Pipeline Speed</span>
                    <span className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-1">{proj.throughput}</span>
                  </div>
                  
                  <div className="border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-[#0a0e16] p-4 rounded-lg min-w-[160px] text-center flex flex-col justify-center border-[#D4AF37]/25 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                    <span className="block text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Performance Metric</span>
                    <span className="text-sm font-mono font-extrabold text-[#D4AF37] mt-1">{proj.metric}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
