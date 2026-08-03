'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronDown } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────
// DATA — pulled directly from the AI Delivery Playbook PDF
// ─────────────────────────────────────────────────────────────────────

const stages = [
  {
    id: '01',
    slug: 'generation',
    title: 'Data Generation',
    subtitle: 'Engineering synthetic data for innovation, privacy, and scale',
    accent: '#B8860B',
    intro:
      'Organizations are often data-rich yet insight-poor — blocked by privacy rules, rare events, or the cost of real-world collection. Synthetic data generation turns that limitation into a strategic capability.',
    why: [
      { title: 'Overcome data scarcity', body: 'Generate realistic examples of rare events — fraud, equipment failure, rare disease — that occur too infrequently to train reliable detectors.' },
      { title: 'Preserve privacy', body: 'Create analytically useful datasets with zero real personal information — safe to share, collaborate on, and process in the cloud.' },
      { title: 'Accelerate development', body: 'Instantly available, scalable test data for software development, system integration, and performance testing.' },
      { title: 'Enable what-if analysis', body: 'Simulate scenarios too dangerous, unethical, or rare to observe directly — market crashes, pandemics, cyberattacks.' },
      { title: 'Mitigate bias', body: 'Intentionally construct balanced datasets that correct for historical sampling bias in real-world data.' },
      { title: 'Test edge cases', body: 'Stress system boundaries with extreme but plausible conditions that rarely appear in production data.' },
    ],
    methods: [
      { name: 'Rule-Based & Heuristic', desc: 'Explicit rules and distributions — domain knowledge encoded directly. Transparent, efficient, easy to validate. Best for structured data with well-understood patterns.' },
      { name: 'Statistical Modeling', desc: 'Fit distributions, then sample — univariate and multivariate distributions, copulas, ARIMA/GARCH for time series. Mathematically grounded, interpretable.' },
      { name: 'Machine-Learning Based', desc: 'GANs, VAEs, autoregressive models, normalizing flows, and diffusion models trained to reproduce complex, high-dimensional patterns. Best for images, language, sensor data.' },
      { name: 'Agent-Based Simulation', desc: 'Traffic with rule-following vehicles, markets with buyers and sellers, disease spread across contact networks. Captures emergent behavior from simple rules.' },
      { name: 'Hybrid & Specialized', desc: 'Differential privacy, PATE-GAN, causal Bayesian networks for valid what-if analysis, TimeGAN for temporal dependencies. Purpose-built guarantees.' },
    ],
    caseStudy: {
      sector: 'Healthcare · Rare Disease Diagnostics',
      headline: 'Synthetic MRI volumes took a diagnostic AI from 87 confirmed cases to a production-ready training library',
      what: 'A research consortium building early-detection AI for a pediatric retinal disorder had collected only 87 confirmed cases in five years — nowhere near enough to train a reliable model, and real data collection would take decades.',
      how: 'Applied a physics-informed VAE with an interpretable latent space explicitly separated into age, disease stage, biomarker level, and imaging artifacts. Hard biological constraints plus a discriminator rejected implausible samples. Differential privacy budget enforced throughout.',
      result: 'Training corpus scaled to synthetic volumes across 12 genetic subtypes, enabling the first statistically valid model training run. Retinal specialists in a blinded review could barely distinguish synthetic from real — landing just above chance accuracy.',
      metrics: [
        { label: 'Diagnostic AUC improvement', value: 'Significant uplift' },
        { label: 'Research groups activated', value: 'Scaled up' },
        { label: 'Time to first working prototype', value: 'Weeks, not years' },
      ],
    },
    myths: [
      { myth: 'Synthetic data is just fancy data augmentation.', reality: 'Augmentation varies existing samples; true generation creates novel, plausible combinations never observed in the source data.' },
      { myth: 'If it\'s synthetic, it\'s automatically private.', reality: 'Poorly generated data can memorize rare real combinations. Genuine privacy needs differential privacy and careful validation — not just the label "synthetic."' },
      { myth: 'Synthetic data always underperforms real data.', reality: 'Well-designed synthetic data can outperform scarce or noisy real data — especially when it incorporates domain knowledge the raw data lacks.' },
    ],
  },
  {
    id: '02',
    slug: 'annotation',
    title: 'Data Annotation',
    subtitle: 'The critical foundation of modern AI systems',
    accent: '#B8860B',
    intro:
      'Without accurately annotated data, even the most sophisticated neural network is a student without a textbook. Annotation is the process that gives raw data ground truth — pointing at a dog and saying "dog" must happen at scale, across every breed, angle, and lighting condition.',
    why: [
      { title: 'Contextual understanding', body: 'Judging sarcasm in a social post needs cultural and situational awareness no lexical model captures alone.' },
      { title: 'Ambiguity resolution', body: 'Borderline cases need reasoned judgment against guidelines and intent, not rigid rules.' },
      { title: 'Bias detection', body: 'Diverse annotator pools surface and counteract biases baked into data or guidelines.' },
      { title: 'Handling novelty', body: 'Humans adapt guidelines dynamically to genuinely unexpected patterns — still beyond current AI.' },
    ],
    methods: [
      { name: 'Computer Vision', desc: 'CVAT, Labelbox, Supervisely — bounding boxes, polygons, keypoints, and semantic segmentation masks.' },
      { name: 'NLP & Text', desc: 'Prodigy, Brat, SageMaker Ground Truth — entity recognition, relation extraction, sentiment tagging, intent classification.' },
      { name: 'Audio', desc: 'Specialized transcription editors — transcription, speaker diarization, emotion tagging, acoustic event labeling.' },
      { name: 'Video', desc: 'Frame-by-frame annotation with interpolation — object tracking across time without labeling every single frame by hand.' },
    ],
    caseStudy: {
      sector: 'AgTech · Precision Agriculture — Drone Telemetry',
      headline: 'Annotated multispectral drone imagery across 14 crop stress classes cut field scouting time from hours to minutes',
      what: 'Traditional crop scouting — agronomists walking fields to visually assess plant health — was labor-intensive, subjective, and too slow to catch nutrient deficiencies or pests before real damage was done.',
      how: 'Built a domain ontology covering stress type, severity, growth stage, and confidence tags for ambiguous cases, jointly developed with plant pathologists and agronomists. Model-assisted pre-labeling reduced manual load significantly. Fleiss\' Kappa target ≥ 0.91 required before batch sign-off.',
      result: 'Hundreds of thousands of multispectral frames delivered at an inter-annotator Kappa exceeding the target. An EfficientNet-B3 model produced per-pixel stress maps aggregated into field-level health scores and prescriptive action maps.',
      metrics: [
        { label: 'Annotation precision', value: 'High accuracy achieved' },
        { label: 'Inter-annotator agreement', value: 'Above target Kappa' },
        { label: 'Field scouting time', value: 'Dramatically reduced' },
      ],
    },
    myths: [
      { myth: '"Garbage in, gospel out"', reality: 'Inconsistent labels don\'t just add noise — they create dangerous overconfidence when test data shares the same annotation bias as training data.' },
      { myth: 'Scalability misjudgment', reality: 'What\'s manageable at a small pilot becomes infeasible at millions without an industrialized process.' },
      { myth: 'Treating annotators as clerks', reality: 'Annotators are domain-knowledge conduits. Fair pay and clear career paths directly improve retention and quality.' },
    ],
  },
  {
    id: '03',
    slug: 'labeling',
    title: 'Data Labeling',
    subtitle: 'Transforming raw information into AI fuel',
    accent: '#B8860B',
    intro:
      'Labeling is the sophisticated alchemy that converts unstructured images, text, audio, and sensor streams into the structured datasets that power machine learning — the bridge between human intelligence and machine understanding.',
    why: [
      { title: 'Quality beats quantity', body: 'A reduction in label noise can lift F1-score by 15–25% on complex tasks — more than most architecture tweaks.' },
      { title: 'Bias amplification risk', body: 'Systematic labeling inconsistencies don\'t just add noise — they can embed and amplify unfair or unsafe model behavior.' },
      { title: 'Diminishing returns on volume', body: 'Beyond a point, more poorly labeled data adds less value than improving the labeling of what you already have.' },
      { title: 'Transfer-learning dependency', body: 'Low-quality fine-tuning labels compromise a pretrained model\'s ability to generalize from its broad training.' },
      { title: 'Regulatory & ethical stakes', body: 'In healthcare, finance, and autonomous systems, label quality is a compliance and safety requirement, not just a performance one.' },
    ],
    methods: [
      { name: 'Classification', desc: 'Assigning a category to an item — images, documents, audio clips, or any discrete unit.' },
      { name: 'Detection & Segmentation', desc: 'Bounding boxes and pixel-level masks for objects in images and video.' },
      { name: 'Ranking & Ordering', desc: 'Relative judgments used in recommendation systems and RLHF for language models.' },
      { name: 'Translation & Transcription', desc: 'Converting speech to text, one language to another, or one format to another.' },
      { name: 'Extraction & Relations', desc: 'Pulling entities, relationships, and attributes from unstructured text — the backbone of clinical and legal AI.' },
    ],
    caseStudy: {
      sector: 'Pharmaceutical · Clinical Document Processing',
      headline: 'Millions of pages of clinical trial documents labeled across 47 data point categories — zero pages required re-extraction post-delivery',
      what: 'A major pharmaceutical company was drowning in manual review of consent forms, adverse event reports, lab results, and physician notes — slow, expensive, and prone to compliance risk.',
      how: 'Operationalized OCR-based layout analysis with a LayoutLMv3-based model proposing initial extractions for expert review. Consensus verification protocol with triple-review on ambiguous table regions. Statistical QA gate: minimum F1 and Cohen\'s Kappa required per category before delivery.',
      result: 'Millions of pages processed across dozens of document categories. Clinical data managers redirected from extraction to protocol optimization and patient safety. Estimated annual savings in the millions.',
      metrics: [
        { label: 'Manual document processing time', value: 'Reduced dramatically' },
        { label: 'Data entry errors in submissions', value: 'Sharply reduced' },
        { label: 'Median query resolution time', value: 'Days, not weeks' },
      ],
    },
    myths: [],
  },
  {
    id: '04',
    slug: 'quality',
    title: 'Data Quality Assurance',
    subtitle: 'The foundation of trustworthy decisions',
    accent: '#B8860B',
    intro:
      '"Garbage in, garbage out" has never been more dangerous. DQA combines people, process, and technology to make data not just available, but genuinely fit for purpose across eight interconnected dimensions.',
    why: [
      { title: 'Accuracy', body: 'Data matches the real world. Errors cause failed deliveries, incorrect diagnoses, and faulty process control.' },
      { title: 'Completeness', body: 'No missing critical values. All required fields populated — missing patient history can lead to incorrect diagnosis.' },
      { title: 'Consistency', body: 'Data agrees across systems. A customer\'s name matches across CRM, billing, and support — mismatches break a unified view.' },
      { title: 'Timeliness', body: 'Data is current enough to act on. Stale inventory levels cause stockouts; outdated contacts reduce marketing effectiveness.' },
      { title: 'Validity', body: 'Conforms to business rules — email formats, logical date ranges, valid postal codes.' },
      { title: 'Uniqueness', body: 'No duplicate entities. Each customer has one master record — duplicates fragment service and inflate spend.' },
      { title: 'Relevance', body: 'Applicable to the task at hand. Irrelevant data raises cost and privacy risk without adding value.' },
      { title: 'Accessibility', body: 'Findable and usable — self-service access with clear documentation. Undocumented data invites misinterpretation.' },
    ],
    methods: [
      { name: 'Strategy & Governance', desc: 'Align to business goals, define stewards and custodians, set policy and escalation paths.' },
      { name: 'Profiling & Assessment', desc: 'Automated scans establish a quality baseline and link specific defects to business impact.' },
      { name: 'Root Cause & Prevention', desc: 'Trace how defects enter the system; design upstream controls that stop problems at source.' },
      { name: 'Remediation & Correction', desc: 'Standardize, validate, enrich, deduplicate, and correct — building a clean canonical dataset.' },
      { name: 'Monitoring & Improvement', desc: 'Live dashboards, automated pipelines, and regular audits catch drift before it becomes a problem.' },
    ],
    caseStudy: {
      sector: 'Retail · Predictive Inventory — Multi-Site Operations',
      headline: 'Data quality overhaul revealed that a significant share of inventory anomalies traced back to upstream data entry errors',
      what: 'A multi-site retailer facing stockouts and overstocking discovered that their forecasting models were underperforming not because of model choice — but because input data had accuracy, consistency, and timeliness failures across multiple source systems.',
      how: 'End-to-end DQA lifecycle: profiling to establish a quality baseline, root-cause analysis tracing defects to specific upstream entry points, targeted remediation of master data, and a continuous monitoring layer with automated alerting on drift.',
      result: 'Significant reduction in inventory anomalies traced to data defects. Forecasting model performance improved without any model changes — purely from cleaner inputs. Data stewards established for ongoing governance.',
      metrics: [
        { label: 'Inventory anomalies from data errors', value: 'Substantially reduced' },
        { label: 'Forecast accuracy improvement', value: 'Meaningful uplift' },
        { label: 'Ongoing monitoring', value: 'Automated & live' },
      ],
    },
    myths: [],
  },
  {
    id: '05',
    slug: 'ai-solutions',
    title: 'AI Solutions',
    subtitle: 'Where quality data becomes engineered systems',
    accent: '#B8860B',
    intro:
      'AI Solutions is the payoff stage — the discipline of turning quality data and a trained model into a system that survives contact with production. From problem framing through to live monitoring, this is where strategy becomes infrastructure.',
    why: [
      { title: 'Start with the problem', body: 'Fall in love with the problem, not your favourite algorithm. Specific, financially quantified objectives — not a desire to "use AI."' },
      { title: 'Invest in data quality', body: '"Garbage in, gospel out" is as dangerous as garbage in, garbage out. Nearly 30% of successful AI projects go to data remediation — and it pays off.' },
      { title: 'Choose the right tool', body: 'Resist deep learning by default — the simplest appropriate model often wins and is far easier to govern.' },
      { title: 'Design for collaboration', body: 'Build workflows where AI handles routine work and humans focus on exceptions. AI as advisor, not autopilot.' },
      { title: 'Plan the full lifecycle', body: 'Think deployment, monitoring, and retirement from day one. The first deployment is a hypothesis, not a final answer.' },
      { title: 'Explainability builds trust', body: 'SHAP-based driver explanations are often essential for user adoption — planners won\'t trust a black box.' },
    ],
    methods: [
      { name: 'Problem Framing & Discovery', desc: 'Three-week discovery phase mapping existing data flows, identifying failure patterns, and defining success metrics.' },
      { name: 'Data Architecture', desc: 'System architecture, feature engineering, and remediation before any model work begins.' },
      { name: 'Model Development', desc: 'Ensemble approaches using complementary techniques per module — gradient boosting, neural nets, forecasting models — selected by task, not trend.' },
      { name: 'Explainability Layer', desc: 'SHAP-based explanations that satisfy audit requirements and build user confidence in AI-generated outputs.' },
      { name: 'Production Deployment & Monitoring', desc: 'CI/CD processes, drift detection, alerting, and human-in-the-loop override capture that feeds back into the model.' },
    ],
    caseStudy: {
      sector: 'Retail · Multi-SKU Demand Forecasting',
      headline: 'A custom predictive ensemble integrated into on-premise infrastructure delivered a return that justified the entire program within the first quarter',
      what: 'Designed and integrated a custom predictive ensemble model into a client\'s on-premise cloud infrastructure for multi-horizon demand forecasting across thousands of SKUs.',
      how: 'Three-week discovery phase mapped existing data flows and identified distribution shift patterns. Ensemble model with complementary techniques per forecasting horizon. SHAP explainability layer added to satisfy internal procurement audit. System presented outputs as suggested actions requiring explicit planner confirmation — never full autopilot. Every override captured and fed back via imitation learning.',
      result: 'Significant reduction in manual planning overhead in the first quarter. ROI demonstrated strongly at the 36-month projection horizon. Planner satisfaction improved substantially. System now handles routine forecasting while planners focus on exception management.',
      metrics: [
        { label: 'Manual planning overhead', value: 'Reduced in first quarter' },
        { label: 'ROI at 36-month horizon', value: 'Investment-grade return' },
        { label: 'Planner satisfaction', value: 'Significantly improved' },
      ],
    },
    myths: [],
  },
];

// ─────────────────────────────────────────────────────────────────────
// DELIVER LIFE CYCLE NAVIGATOR — SVG
// ─────────────────────────────────────────────────────────────────────

function PipelineDiagram({ activeStage, onSelect }: { activeStage: number; onSelect: (i: number) => void }) {
  const icons = ['◈', '◉', '◎', '◆', '◇'];
  const labels = ['Generation', 'Annotation', 'Labeling', 'Quality', 'AI'];
  const totalStages = 5;
  const progressPercent = (activeStage / (totalStages - 1)) * 100;

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-0 relative">
          {/* Background progress bar line */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-200 -translate-y-1/2 rounded-full" />
          {/* Active progress bar line overlay */}
          <div
            className="absolute top-1/2 left-0 h-[3px] bg-[#B8860B] -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          {Array.from({ length: totalStages }).map((_, i) => {
            const isVisitedOrActive = i <= activeStage;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => onSelect(i)}
                  aria-label={labels[i]}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-sm sm:text-base md:text-lg font-bold transition-all duration-300 ${
                    activeStage === i
                      ? 'bg-[#B8860B] border-[#B8860B] text-white shadow-[0_0_12px_rgba(184,134,11,0.4)] scale-110'
                      : isVisitedOrActive
                      ? 'bg-slate-800 border-slate-800 text-white hover:bg-slate-700'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-[#B8860B]/50 hover:text-[#B8860B]'
                  }`}
                >
                  {icons[i]}
                </button>
                <span className={`mt-1.5 text-[8px] sm:text-[10px] font-mono font-bold tracking-wider hidden sm:block ${
                  activeStage === i ? 'text-[#B8860B]' : isVisitedOrActive ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// QUALITY WHEEL — eight-dimension SVG
// ─────────────────────────────────────────────────────────────────────

function QualityWheel() {
  const dims = [
    'Accuracy', 'Completeness', 'Consistency', 'Timeliness',
    'Validity', 'Uniqueness', 'Relevance', 'Accessibility',
  ];
  const r = 85;
  const cx = 150;
  const cy = 150;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
        {dims.map((dim, i) => {
          const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const nextAngle = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
          const midAngle = angle + Math.PI / 8;
          const x1 = cx + r * Math.cos(angle);
          const y1 = cy + r * Math.sin(angle);
          const x2 = cx + r * Math.cos(nextAngle);
          const y2 = cy + r * Math.sin(nextAngle);
          
          // Outer label coordinates
          const lx = cx + (r + 24) * Math.cos(midAngle);
          const ly = cy + (r + 24) * Math.sin(midAngle);

          return (
            <g key={dim}>
              <path
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                fill={i % 2 === 0 ? 'rgba(184,134,11,0.12)' : 'rgba(184,134,11,0.06)'}
                stroke="rgba(184,134,11,0.3)"
                strokeWidth="1"
              />
              <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="rgba(184,134,11,0.3)" strokeWidth="1" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#B8860B"
                fontFamily="var(--font-ibm-plex-mono), monospace"
                fontWeight="700"
                className="tracking-wider uppercase"
              >
                {dim}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="25" fill="#B8860B" opacity="0.95" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="white" fontFamily="var(--font-ibm-plex-mono), monospace" fontWeight="700">
          DQA
        </text>
      </svg>
      <p className="text-xs text-slate-500 font-mono tracking-wider uppercase text-center">Eight interconnected quality dimensions — DAMA-DMBOK2</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// LIFECYCLE STEPS — horizontal flow diagram
// ─────────────────────────────────────────────────────────────────────

function LifecycleFlow({ steps }: { steps: string[] }) {
  return (
    <div className="w-full overflow-x-auto py-4 sm:py-6 -mx-px">
      <div className="flex items-start gap-0 min-w-max mx-auto px-4 sm:px-6">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-24 sm:w-32 md:w-36">
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#B8860B]/10 border-2 border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] font-mono font-bold text-xs sm:text-sm md:text-base">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-center text-[10px] sm:text-xs md:text-sm font-mono tracking-wide text-slate-800 mt-2 leading-snug px-1 font-medium">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-start pt-4 sm:pt-5 px-1 sm:px-2">
                <svg width="20" height="10" viewBox="0 0 32 12" className="sm:w-8 sm:h-3">
                  <path d="M2 6 L26 6 M20 2 L26 6 L20 10" stroke="#B8860B" strokeWidth="2" strokeOpacity="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// METHODOLOGY GRID — core methods per stage
// ─────────────────────────────────────────────────────────────────────

function MethodGrid({ methods }: { methods: { name: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {methods.map((m, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-xl p-4 sm:p-6 bg-white hover:border-[#B8860B]/30 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="text-[#B8860B] font-mono text-xs sm:text-sm mt-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity font-bold">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-900 font-bold mb-1.5 sm:mb-2">{m.name}</p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{m.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CASE STUDY CARD
// ─────────────────────────────────────────────────────────────────────

function CaseStudyCard({ cs }: { cs: typeof stages[0]['caseStudy'] }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 lg:p-12 text-white">
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3 sm:mb-5">{cs.sector}</p>
      <h3 className="font-sans text-lg sm:text-xl lg:text-3xl leading-relaxed text-white mb-6 sm:mb-8 font-semibold tracking-wide">{cs.headline}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-7 sm:mb-10">
        {[
          { label: 'Challenge', body: cs.what },
          { label: 'Approach', body: cs.how },
          { label: 'Outcome', body: cs.result },
        ].map((col, i) => (
          <div key={i} className={`${i < 2 ? 'md:border-r md:border-white/10 md:pr-8 pb-4 md:pb-0 border-b md:border-b-0 border-white/10' : ''}`}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-2 sm:mb-4 font-bold">{col.label}</p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">{col.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-5 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {cs.metrics.map((m, i) => (
          <div key={i} className="text-center sm:text-left">
            <p className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-1.5 sm:mb-2">{m.label}</p>
            <p className="text-[#D4AF37] font-sans text-base sm:text-lg font-bold">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// STAGE DETAIL PANEL
// ─────────────────────────────────────────────────────────────────────

const lifecycles: Record<string, string[]> = {
  generation: ['Identify use case & scope', 'Profile source data', 'Select methodology', 'Generate & validate', 'Privacy audit', 'Govern & version'],
  annotation: ['Requirement & ontology', 'Guidelines & training', 'Execution with tooling', 'QA & refinement', 'Delivery & integration'],
  labeling: ['Strategic planning', 'Process & tooling', 'Execution with QA embedded', 'Validation & certification', 'Delivery & feedback'],
  quality: ['Strategy & governance', 'Profiling & assessment', 'Root cause & prevention', 'Remediation & correction', 'Monitor & improve'],
  'ai-solutions': ['Problem framing', 'Data architecture', 'Model development', 'Explainability layer', 'Production deployment', 'Monitoring & iteration'],
};

function StagePanel({ stage }: { stage: typeof stages[0] }) {
  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Intro */}
      <div>
        <p className="text-base sm:text-xl lg:text-2xl text-slate-800 leading-relaxed max-w-4xl border-l-4 border-[#B8860B] pl-4 sm:pl-6 font-medium">{stage.intro}</p>
      </div>

      {/* Why it matters */}
      <div>
        <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-5 sm:mb-8 font-bold">
          {stage.id === '04' ? 'Eight Quality Dimensions' : 'Why It Matters'}
        </h3>
        {stage.id === '04' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-1 flex justify-center">
              <QualityWheel />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stage.why.map((w, i) => (
                <div key={i} className="p-4 sm:p-6 border border-slate-200 rounded-xl bg-white/70 shadow-sm">
                  <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-1.5 sm:mb-2">{w.title}</p>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stage.why.map((w, i) => (
              <div key={i} className="p-4 sm:p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-[#B8860B] text-xs sm:text-sm font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="font-bold text-slate-950 text-sm sm:text-base mb-1.5 sm:mb-2">{w.title}</p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{w.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lifecycle */}
      <div>
        <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-4 sm:mb-6 font-bold">Lifecycle</h3>
        <div className="bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden">
          <LifecycleFlow steps={lifecycles[stage.slug] || []} />
        </div>
      </div>

      {/* Methods */}
      <div>
        <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-5 sm:mb-8 font-bold">
          Core Methodologies
        </h3>
        <MethodGrid methods={stage.methods} />
      </div>

      {/* Case Study */}
      <div>
        <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-5 sm:mb-8 font-bold">Case Study</h3>
        <CaseStudyCard cs={stage.caseStudy} />
      </div>

      {/* Myths / Pitfalls */}
      {stage.myths.length > 0 && (
        <div>
          <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-5 sm:mb-8 font-bold">Common Misconceptions</h3>
          <div className="space-y-3 sm:space-y-4">
            {stage.myths.map((m, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 sm:p-6 bg-red-50/50">
                  <p className="font-mono text-xs tracking-widest uppercase text-red-500 mb-1.5 sm:mb-2 font-bold">Myth</p>
                  <p className="text-sm sm:text-base font-bold text-slate-800 italic">"{m.myth}"</p>
                </div>
                <div className="p-4 sm:p-6 bg-emerald-50/50 border-t sm:border-t-0 sm:border-l border-slate-200">
                  <p className="font-mono text-xs tracking-widest uppercase text-emerald-700 mb-1.5 sm:mb-2 font-bold">Reality</p>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">{m.reality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SERVICES OVERVIEW GRID — all 6 on one page
// ─────────────────────────────────────────────────────────────────────

const stageIcons = ['◈', '◉', '◎', '◆', '◇'];

function ServicesOverviewGrid({ onDiveDeep }: { onDiveDeep: () => void }) {
  return (
    <div className="py-8 sm:py-14 lg:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stages.map((stage, i) => (
            <div
              key={stage.id}
              className="group border border-slate-200 rounded-2xl bg-white hover:border-[#B8860B]/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card top accent line */}
              <div className="h-0.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-5 sm:p-7 lg:p-8 flex flex-col flex-1">
                {/* Stage number + icon */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#B8860B] font-bold uppercase">
                    Stage {stage.id}
                  </span>
                  <span className="text-xl sm:text-2xl text-slate-300 group-hover:text-[#B8860B] transition-colors duration-300">
                    {stageIcons[i]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl lg:text-2xl uppercase tracking-wide text-slate-900 mb-2 sm:mb-3 leading-tight">
                  {stage.title}
                </h3>

                {/* Intro excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4 sm:mb-5">
                  {stage.intro}
                </p>

                {/* Key capability tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  {stage.why.slice(0, 2).map((w, j) => (
                    <span key={j} className="text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-full tracking-wide">
                      {w.title}
                    </span>
                  ))}
                </div>

                {/* Method chips */}
                <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col gap-1 sm:gap-1.5">
                  {stage.methods.slice(0, 2).map((m, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B8860B] shrink-0" />
                      <span className="text-[10px] sm:text-xs text-slate-500 font-mono font-bold tracking-wide truncate">{m.name}</span>
                    </div>
                  ))}
                  {stage.methods.length > 2 && (
                    <span className="text-[10px] sm:text-xs text-slate-400 font-mono pl-3">+{stage.methods.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single Dive Deep CTA below all 6 cards */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={onDiveDeep}
            className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] sm:text-xs tracking-widest uppercase px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            <span>Dive Deep</span>
            <span className="text-sm">→</span>
          </button>
          <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs text-slate-400 font-mono tracking-wide">Explore methodologies, lifecycles & case studies</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────

function ServicesContent() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const scrollToTop = () => {
    if (topRef.current) {
      const top = topRef.current.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const stageParam = searchParams.get('stage');
    if (stageParam) {
      const p = stageParam.trim().toLowerCase();
      const byId = stages.findIndex((s) => s.id === p || s.id === p.padStart(2, '0'));
      if (byId !== -1) { setSelectedStage(byId); return; }
      const bySlug = stages.findIndex((s) => s.slug === p);
      if (bySlug !== -1) { setSelectedStage(bySlug); return; }
      const num = parseInt(p, 10);
      if (!isNaN(num)) {
        if (num >= 1 && num <= stages.length) { setSelectedStage(num - 1); return; }
        if (num >= 0 && num < stages.length) { setSelectedStage(num); return; }
      }
    }
  }, [searchParams]);

  const handleExplore = (i: number) => {
    setSelectedStage(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAll = () => {
    setSelectedStage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNeighbour = (i: number) => {
    setSelectedStage(i);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 lg:pb-16 border-b border-slate-100 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
          <Link
            href="/home"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-5 sm:mb-6 font-mono text-[10px] sm:text-xs font-bold tracking-wider group"
          >
            <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-wide text-slate-900 leading-tight mb-4 sm:mb-6">
            Five Disciplines.<br />
            <span className="text-[#B8860B]">One Framework.</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-700 max-w-3xl leading-relaxed font-medium">
            Raw data doesn't become intelligence by accident. It moves through five disciplines, each handing off a more refined asset to the next.
          </p>
        </div>
      </section>

      {/* ── OVERVIEW GRID ────────────────────────────────────────────── */}
      {selectedStage === null && (
        <ServicesOverviewGrid onDiveDeep={() => handleExplore(0)} />
      )}

      {/* ── DETAIL VIEW ──────────────────────────────────────────────── */}
      {selectedStage !== null && (
        <div ref={topRef}>
          {/* Breadcrumb / back */}
          <div className="bg-slate-50 border-b border-slate-200 py-3 sm:py-4">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={handleBackToAll}
                className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs tracking-wider text-slate-500 hover:text-slate-900 transition-colors font-bold group shrink-0"
              >
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>All Services</span>
              </button>
              <span className="text-slate-300 font-mono text-xs shrink-0">/</span>
              <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#B8860B] font-bold uppercase truncate">
                {stages[selectedStage].title}
              </span>
            </div>
          </div>

          {/* Pipeline navigator — sticky */}
          <div className="py-3 sm:py-5 bg-slate-50 border-b border-slate-200 sticky top-16 z-40">
            <div className="max-w-screen-xl mx-auto px-2 sm:px-8 lg:px-12">
              <PipelineDiagram activeStage={selectedStage} onSelect={handleSelectNeighbour} />
            </div>
          </div>

          {/* Stage detail content */}
          <section className="py-8 sm:py-14 lg:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
              {/* Stage header */}
              <div className="mb-7 sm:mb-10 lg:mb-12 pb-6 sm:pb-8 lg:pb-10 border-b border-slate-100">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#B8860B] font-bold uppercase block mb-1.5 sm:mb-2">
                  Stage {stages[selectedStage].id} / 05
                </span>
                <h2
                  className="font-heading uppercase tracking-wide text-slate-900 leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
                >
                  {stages[selectedStage].title}
                </h2>
              </div>

              {/* Stage body */}
              <StagePanel key={selectedStage} stage={stages[selectedStage]} />

              {/* Prev / Next / All nav */}
              <div className="mt-10 sm:mt-14 lg:mt-16 pt-5 sm:pt-8 border-t border-slate-100 flex justify-between items-center gap-2">
                <div className="flex-1">
                  {selectedStage > 0 && (
                    <button
                      onClick={() => handleSelectNeighbour(selectedStage - 1)}
                      className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-mono tracking-wide text-slate-500 hover:text-slate-900 transition-colors group"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                      <span className="truncate max-w-[80px] sm:max-w-none">{stages[selectedStage - 1].title}</span>
                    </button>
                  )}
                </div>
                <button
                  onClick={handleBackToAll}
                  className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-slate-400 hover:text-slate-700 transition-colors font-bold shrink-0 px-2"
                >
                  All Services
                </button>
                <div className="flex-1 flex justify-end">
                  {selectedStage < stages.length - 1 && (
                    <button
                      onClick={() => handleSelectNeighbour(selectedStage + 1)}
                      className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-mono tracking-wide text-[#B8860B] hover:text-[#8a6309] transition-colors group"
                    >
                      <span className="truncate max-w-[80px] sm:max-w-none">{stages[selectedStage + 1].title}</span>
                      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180 transition-transform group-hover:translate-x-1 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── GET IN TOUCH CTA ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white border-t border-slate-100 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
          <Link
            href="/home#contact"
            className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07508] text-white font-mono text-[10px] sm:text-xs tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          >
            <span>Get in touch</span>
            <span className="text-sm">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ServicesContent />
    </Suspense>
  );
}
