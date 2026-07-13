'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Database,
  Tag,
  Tags,
  ShieldCheck,
  BrainCircuit,
  Users,
  Check,
} from 'lucide-react';

const stages = [
  {
    id: 'stage-01',
    number: '01',
    title: 'Data Generation',
    subtitle: 'Engineering synthetic data for innovation, privacy, and scale',
    icon: Database,
    bgClass: 'hero-bg',
    definition:
      'Organizations are often data-rich yet insight-poor — blocked by privacy rules, rare events, or the cost of real-world collection. Synthetic data generation turns that limitation into a strategic capability.',
    framework: [
      { name: 'Rule-Based & Heuristic', desc: 'Explicit rules, transparent, easy to validate' },
      { name: 'Statistical Modeling', desc: 'Fit distributions, ARIMA/GARCH for time series' },
      { name: 'Machine Learning Based', desc: 'GANs, VAEs, diffusion models' },
      { name: 'Agent-Based Simulation', desc: 'Simulate interacting agents over time' },
      { name: 'Hybrid & Specialized', desc: 'Privacy-, causal-, and time-aware methods' },
    ],
    caseStudy: {
      domain: 'MEDICAL AI',
      context: 'Rare Disease Research',
      headline: 'Synthetic OCT scans took a diagnostic AI from 87 real cases to a 50,000-volume training library',
      problem:
        'A research consortium building early-detection AI for a pediatric retinal disorder affecting roughly 1 in 50,000 children had collected only 87 confirmed cases in five years — nowhere near enough to train a reliable deep learning model.',
      approach:
        'A physics-informed VAE with a latent space explicitly separated into age, disease stage, biomarker level, and imaging artifacts. A lightweight discriminator rejected implausible samples.',
      stats: [
        { value: '0.72', label: 'AUC · 87 cases only' },
        { value: '0.91', label: 'AUC · real + 50K synthetic' },
        { value: '50K', label: 'synthetic volumes' },
        { value: '3wk', label: 'to first prototype' },
      ],
      fullMethodology: [
        'Phase 1: Ophthalmologists modeled biomarkers, progression stages (0–4), and OCT acquisition artifacts',
        'Phase 2: Physics-informed VAE with interpretable latent space for querying specific disease characteristics',
        'Phase 3: Lightweight discriminator to reject implausible samples, outputting 50,000 synthetic OCT volumes across 12 genetic subtypes',
        'Key insight: Mechanistic + statistical approach beat pure data-driven approaches on generalization',
        'Validation: Expert accuracy at distinguishing real vs. synthetic landed at 58%, barely above chance',
      ],
    },
  },
  {
    id: 'stage-02',
    number: '02',
    title: 'Data Annotation',
    subtitle: 'The foundational act of giving raw data meaning',
    icon: Tag,
    bgClass: 'services-bg',
    definition:
      'Without accurately annotated data, even the most sophisticated neural network is a student without a textbook. Annotation is the process that gives raw data ground truth.',
    framework: [
      { name: 'Requirement & Ontology', desc: 'Define what model must learn' },
      { name: 'Guidelines & Training', desc: 'Exhaustive instructions with examples' },
      { name: 'Execution with Tooling', desc: 'Modality-specific platforms (CVAT, Prodigy)' },
      { name: 'QA & Refinement', desc: 'Inter-annotator agreement, expert review' },
      { name: 'Delivery', desc: 'Standard formats (COCO, YOLO, Pascal VOC)' },
    ],
    caseStudy: {
      domain: 'AGTECH',
      context: '500+ Family Farms, US Midwest',
      headline: '800,000 drone images and a careful ontology cut scouting time from 3 hours to 25 minutes',
      problem:
        'Traditional crop scouting — agronomists walking fields to visually assess plant health — was labor-intensive, subjective, and too slow to catch nutrient deficiencies, pests, or water stress before real damage was done.',
      approach:
        'Model-assisted initial pass from a weakly supervised model. Senior agronomists reviewed 20% of annotations, focused on low-confidence items. Third expert adjudicated disagreements.',
      stats: [
        { value: '94%', label: 'precision for human scouts' },
        { value: '91%', label: 'recall, vs. 82% baseline' },
        { value: '3h→25m', label: 'scouting time per field' },
        { value: '$120K', label: 'estimated annual savings' },
      ],
      fullMethodology: [
        '800,000 multispectral drone images over 24 growing seasons, 12,000 acres',
        'Ontology covering stress type, severity (1–5), growth stage, and confidence tags',
        'Inter-annotator agreement reached 0.91 Kappa after two iteration cycles (target was 0.85)',
        'Model-assisted labeling cut total annotation time by 60% versus pure manual effort',
        'Regular calibration kept accuracy stable as disease presentation shifted with weather',
      ],
    },
  },
  {
    id: 'stage-03',
    number: '03',
    title: 'Data Labeling',
    subtitle: 'Operationalising annotation at scale',
    icon: Tags,
    bgClass: 'services-bg',
    definition:
      'Labeling is the sophisticated alchemy that converts unstructured images, text, audio, and sensor streams into the structured datasets that power machine learning — the bridge between human intelligence and machine understanding.',
    framework: [
      { name: 'Classification & Detection', desc: 'Image and text recognition tasks' },
      { name: 'Segmentation & Extraction', desc: 'Pixel-level and entity extraction' },
      { name: 'Multimodal Consistency', desc: 'Labels consistent across data types' },
      { name: 'Expert · Crowd · Hybrid', desc: 'Right paradigm for the task' },
      { name: 'Standard Formats', desc: 'COCO, YOLO, Pascal VOC delivery' },
    ],
    caseStudy: {
      domain: 'PHARMA',
      context: '35 Active Clinical Trials',
      headline: '2.1 million pages of trial documents, an ontology of 47 data points, and an $8.3M annual saving',
      problem:
        'A major pharmaceutical company was drowning in manual review of consent forms, adverse event reports, lab results, and physician notes — slow, expensive, and prone to the kind of error that risks regulatory compliance.',
      approach:
        'OCR + layout-analysis platform with LayoutLMv3-based model proposing initial extractions for expert review. 15% of documents got independent double-pass review.',
      stats: [
        { value: '0.94', label: 'entity-level F1 score' },
        { value: '0.97', label: 'document classification accuracy' },
        { value: '0.88', label: 'inter-annotator Kappa' },
        { value: '$8.3M', label: 'estimated annual savings' },
      ],
      fullMethodology: [
        '2.1M pages across 12 core document types and 35 trials',
        '47 extracted data points: patient identifiers, medications, dosages, lab values, adverse events',
        'Clinical documentation experts on a custom OCR + layout-analysis platform',
        'Disputes went to a 3-person panel for adjudication',
        'Clinical data managers redirected to protocol optimisation and patient safety',
      ],
    },
  },
  {
    id: 'stage-04',
    number: '04',
    title: 'Quality Assurance',
    subtitle: 'Making data fit for purpose across eight dimensions',
    icon: ShieldCheck,
    bgClass: 'ventures-bg',
    definition:
      '"Garbage in, garbage out" has never been more dangerous. DQA combines people, process, and technology to make data not just available, but genuinely fit for purpose.',
    framework: [
      { name: 'Accuracy', desc: 'Matches the real world' },
      { name: 'Completeness', desc: 'No missing critical values' },
      { name: 'Timeliness', desc: 'Current enough to act on' },
      { name: 'Consistency', desc: 'Agrees across systems' },
      { name: 'Validity · Uniqueness · Relevance · Accessibility', desc: 'Full eight-dimension framework' },
    ],
    caseStudy: {
      domain: 'HEALTH INSURANCE',
      context: '$45B in Annual Payments',
      headline: 'A national insurer cut manual claims rework from 8.3% to 2.1%, saving $184M a year',
      problem:
        'Chronic data quality issues in claims adjudication forced 8.3% of 120 million annual claims into manual rework — about $220M a year — while strained provider relationships and regulatory audit risk compounded the cost.',
      approach:
        'Layered defense: Prevention (real-time eligibility checks), Detection (450+ rule pre-adjudication engine), Correction (automated fixes for predictable errors).',
      stats: [
        { value: '8.3%→2.1%', label: 'manual rework rate' },
        { value: '72%→89%', label: 'clean claim first-pass rate' },
        { value: '$184M', label: 'annual savings' },
        { value: '$43M', label: 'annual waste identified' },
      ],
      fullMethodology: [
        'Baseline: 22% missing/invalid critical fields, 15% incorrect provider identifiers',
        'Prevention: Real-time eligibility checks, smart context-aware forms, OCR confidence routing',
        'Detection: 450+ rule pre-adjudication engine, statistical control charts, daily reconciliation',
        'Correction: Automated fixes for predictable errors, confidence-scored suggestions',
        'Every $1 spent upfront returned roughly $7 in avoided rework',
      ],
    },
  },
  {
    id: 'stage-05',
    number: '05',
    title: 'AI Solutions',
    subtitle: 'Where quality data becomes engineered systems',
    icon: BrainCircuit,
    bgClass: 'ventures-bg',
    definition:
      'A true AI solution isn\'t an impressive model — it\'s a thoughtfully engineered system that integrates machine learning with domain expertise, software engineering, change management, and continuous improvement.',
    framework: [
      { name: 'Problem & Value', desc: 'Business context, measurable KPIs' },
      { name: 'Data Strategy', desc: 'Source identification, quality assessment' },
      { name: 'Model Development', desc: 'Approach selection, validation, interpretability' },
      { name: 'System Integration', desc: 'API design, scalability, security' },
      { name: 'Deployment · UX · Operations', desc: 'Full lifecycle management' },
    ],
    caseStudy: {
      domain: 'ELECTRONICS MANUFACTURING',
      context: '12 Countries',
      headline: '23.4% lower supply chain costs, $187M in working capital released, 680% ROI at 36 months',
      problem:
        'A multinational electronics manufacturer ran 45+ suppliers, 8 plants, and 150+ distribution centers on exponential smoothing and rule-based inventory policies. Logistics and carrying costs ate 28% of cost of goods sold.',
      approach:
        'Three-module architecture: Demand forecasting (Temporal Fusion Transformer + Prophet), Inventory optimization (multi-echelon stochastic dynamic programming), Logistics routing (hybrid genetic algorithm + RL).',
      stats: [
        { value: '-23.4%', label: 'total supply chain cost' },
        { value: '$187M', label: 'working capital released' },
        { value: '680%', label: 'ROI at 36 months' },
        { value: '76%→91%', label: 'perfect order fulfillment' },
      ],
      fullMethodology: [
        '$42M/yr expedited shipping from stockouts, $28M/yr excess inventory obsolescence',
        'Human-in-the-loop: AI presented outputs as "suggested actions" requiring planner confirmation',
        'SHAP-based driver explanations were essential for planner adoption',
        'Nearly 30% of timeline went to data remediation — paid off throughout',
        'Planner productivity +40%, satisfaction 3.1→4.6/5.0',
      ],
    },
  },
  {
    id: 'stage-06',
    number: '06',
    title: 'Specialized Outsourcing',
    subtitle: 'The expertise layer that accelerates any stage',
    icon: Users,
    bgClass: 'contact-bg',
    definition:
      'Few companies have world-class expertise in every function they need. Specialized outsourcing contracts specific, knowledge-intensive work to external experts who do it better, faster, or more efficiently than building it in-house.',
    framework: [
      { name: 'Identify the Need', desc: 'Capability gap or scaling need' },
      { name: 'Define the Scope', desc: 'Outcomes, quality, timelines' },
      { name: 'Select the Partner', desc: 'Track record, security, pricing' },
      { name: 'Transition Knowledge', desc: 'Context, data, access' },
      { name: 'Manage · Optimize', desc: 'Governance, continuous improvement' },
    ],
    caseStudy: {
      domain: 'BIOTECH STARTUP',
      context: 'Rare Neurological Disorder',
      headline: 'A specialist partner found a new binding mechanism and saved three months and $500K',
      problem:
        'A small biotech had a promising compound but no in-house computational chemistry expertise to analyse how it interacted with target proteins — building that capability internally meant hiring specialists, buying supercomputing time, and building simulation pipelines from scratch.',
      approach:
        'Six weeks of simulation, protein-ligand analysis, metabolic pathway prediction, and off-target flagging with a vendor with published pharmaceutical modeling research.',
      stats: [
        { value: '6 weeks', label: 'engagement duration' },
        { value: '~3 months', label: 'preclinical timeline accelerated' },
        { value: '$500K', label: 'saved vs. in-house build' },
        { value: '100%', label: 'knowledge transferred' },
      ],
      fullMethodology: [
        'Partner: vendor with published pharmaceutical modeling research and biotech-startup experience',
        'Knowledge transfer: chemical structure, assay data, and interaction hypotheses shared',
        'Execution: binding affinity predictions, molecular dynamics simulations, toxicity screening',
        'Revealed a previously unknown binding mechanism explaining compound selectivity',
        'Redirected lab experiments toward the most promising variants',
      ],
    },
  },
];

const navItems = stages.map((s) => ({ id: s.id, number: s.number, title: s.title }));

function StageSection({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const Icon = stage.icon;

  return (
    <section
      id={stage.id}
      ref={ref}
      className={cn('relative py-20 md:py-24 overflow-hidden', stage.bgClass)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stage Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">
            Stage {stage.number} / 06
          </span>
          <h2 className="section-heading mt-2 mb-3">{stage.title}</h2>
          <p className="section-subtext max-w-2xl mb-6">{stage.subtitle}</p>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-3xl">
            {stage.definition}
          </p>
        </motion.div>

        {/* Framework Steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-10"
        >
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4 block">
            Framework
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stage.framework.map((step, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl p-4 flex items-start gap-3"
              >
                <span className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37] flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="text-sm font-heading font-bold text-slate-900 dark:text-white block">
                    {step.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    {step.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-12"
        >
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            {/* Case Study Header */}
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
                {stage.caseStudy.domain}
              </span>
              <span className="text-[10px] font-sans text-slate-500">
                · {stage.caseStudy.context}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-lg md:text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 leading-snug">
              {stage.caseStudy.headline}
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stage.caseStudy.stats.map((stat, i) => (
                <div
                  key={i}
                  className="border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-[#0a0e16] p-3 rounded-lg text-center"
                >
                  <span className="block text-lg md:text-xl font-mono font-bold text-[#D4AF37]">
                    {stat.value}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Expand/Collapse */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm font-sans font-semibold text-[#D4AF37] hover:text-[#B8962D] transition-colors"
            >
              {expanded ? 'Hide full methodology' : 'Read full methodology'}
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-300',
                  expanded && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest block mb-2">
                        Problem
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                        {stage.caseStudy.problem}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest block mb-2">
                        Approach
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                        {stage.caseStudy.approach}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest block mb-2">
                        Methodology
                      </span>
                      <ul className="space-y-2">
                        {stage.caseStudy.fullMethodology.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 font-sans">
                            <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function InsightsPage() {
  const [activeStage, setActiveStage] = useState('stage-01');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStage(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    stages.forEach((stage) => {
      const el = document.getElementById(stage.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStage = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // navbar + sub-nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-bg relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <span className="section-eyebrow">AI Delivery Playbook</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4 leading-[1.05]">
            Six disciplines,<br />
            <span className="text-slate-500 dark:text-slate-400">one continuous pipeline.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-sans">
            Raw data doesn&apos;t become intelligence by accident. It moves through six disciplines, each one handing off a more refined asset to the next.
          </p>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <div
        ref={navRef}
        className="sticky top-[72px] z-40 glass-panel border-b border-slate-200/50 dark:border-slate-800/50"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-3 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToStage(item.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-medium whitespace-nowrap transition-all duration-200',
                  activeStage === item.id
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                )}
              >
                <span className="font-mono text-xs font-bold">{item.number}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Sections */}
      {stages.map((stage, index) => (
        <StageSection key={stage.id} stage={stage} index={index} />
      ))}

      {/* CTA Footer */}
      <section className="py-16 md:py-24 bg-transparent relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="section-eyebrow">Ready to Start?</span>
          <h2 className="section-heading mt-2 mb-4">
            See how this applies to your data
          </h2>
          <p className="section-subtext max-w-2xl mx-auto mb-8">
            Every stage is written to stand alone — and to connect. Let&apos;s discuss which disciplines matter most for your use case.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#B8962D] text-white text-base md:text-lg font-semibold shadow-lg shadow-[#D4AF37]/10 transition-all duration-150"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
