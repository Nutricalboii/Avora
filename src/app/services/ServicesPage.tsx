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
  {
    id: '06',
    slug: 'outsourcing',
    title: 'Specialized Outsourcing',
    subtitle: 'Leveraging expertise beyond your walls',
    accent: '#B8860B',
    intro:
      'Few companies have world-class expertise in every function they need. Specialized outsourcing contracts specific, knowledge-intensive work to external experts who do it better, faster, or more efficiently than building it in-house — available at any stage of the lifecycle.',
    why: [
      { title: 'Elite talent, no ramp-up', body: 'Global specialists without the recruiting, retention, or benefits burden.' },
      { title: 'Cost efficiency', body: 'Fixed hiring and hardware costs convert to variable operating expense.' },
      { title: 'Speed to market', body: 'Partners already have the tools and teams — no months-long ramp.' },
      { title: 'Risk mitigation', body: 'Domain risk shared with a partner who lives in that domain daily.' },
      { title: 'Focus on core strategy', body: 'Internal leadership stays on what the company does best.' },
      { title: 'Scalability', body: 'Scale up or down without the complexity of hiring or layoffs.' },
      { title: 'Innovation access', body: 'Exposure to methods a partner has refined across many clients.' },
    ],
    methods: [
      { name: 'Identify the need', desc: 'A capability gap, a scaling need, or access to technology without heavy upfront investment.' },
      { name: 'Define the scope', desc: 'Outcomes, quality standards, timelines, and communication protocols spelled out clearly before engagement begins.' },
      { name: 'Select the partner', desc: 'Track record, security practices, cultural fit, and pricing — often validated with a small pilot before full commitment.' },
      { name: 'Transition knowledge', desc: 'Context, data, access, and process transferred with enough care to preserve continuity.' },
      { name: 'Manage & improve', desc: 'Governance, escalation paths, and regular feedback loops — treating the vendor as an extension of the team.' },
    ],
    caseStudy: {
      sector: 'Biotech · Rare Neurological Disorder — Computational Chemistry',
      headline: 'A six-week engagement found a previously unknown binding mechanism and saved months of preclinical timeline',
      what: 'A small biotech had a promising compound but no in-house computational chemistry expertise to analyze how it interacted with target proteins. Building that capability internally meant hiring specialists, buying supercomputing time, and building simulation systems from scratch.',
      how: 'Engaged a partner with published pharmaceutical modeling research and proprietary HPC access. Knowledge transfer: chemical structure, assay data, and interaction hypotheses shared; vendor shared methodology in return. Six weeks of simulation, protein-ligand analysis, metabolic pathway prediction, and off-target flagging.',
      result: 'Revealed a previously unknown binding mechanism explaining the compound\'s selectivity. Identified a structural variant with a better safety profile. Redirected the biotech\'s next lab experiments toward the most promising variants. Core scientific team stayed focused on wet-lab work and clinical strategy — their real edge.',
      metrics: [
        { label: 'Time from engagement to insight', value: 'Six weeks' },
        { label: 'Preclinical timeline accelerated', value: 'Months saved' },
        { label: 'Estimated savings vs. building in-house', value: 'Substantial cost avoidance' },
      ],
    },
    myths: [],
  },
];

// ─────────────────────────────────────────────────────────────────────
// DELIVER LIFE CYCLE NAVIGATOR — SVG
// ─────────────────────────────────────────────────────────────────────

function PipelineDiagram({ activeStage, onSelect }: { activeStage: number; onSelect: (i: number) => void }) {
  const icons = ['◈', '◉', '◎', '◆', '◇', '⬡'];
  const totalStages = 6;
  const progressPercent = (activeStage / (totalStages - 1)) * 100;

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-0 relative">
          {/* Background progress bar line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
          
          {/* Active progress bar line overlay */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#B8860B] -translate-y-1/2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />

          {Array.from({ length: totalStages }).map((_, i) => {
            const isVisitedOrActive = i <= activeStage;
            return (
              <div key={i} className="relative z-10">
                <button
                  onClick={() => onSelect(i)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    activeStage === i
                      ? 'bg-[#B8860B] border-[#B8860B] text-white shadow-[0_0_15px_rgba(184,134,11,0.4)] scale-110'
                      : isVisitedOrActive
                      ? 'bg-slate-800 border-slate-800 text-white hover:bg-slate-700'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-[#B8860B]/50 hover:text-[#B8860B]'
                  }`}
                >
                  {icons[i]}
                </button>
                <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold tracking-wider ${
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
    <div className="w-full overflow-x-auto py-6">
      <div className="flex items-start gap-0 min-w-max mx-auto px-6">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-32 sm:w-36">
              <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 border-2 border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] font-mono font-bold text-base">
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="text-center text-xs sm:text-sm font-mono tracking-wide text-slate-800 mt-3 leading-snug px-1 font-medium">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-start pt-5 px-2">
                <svg width="32" height="12" viewBox="0 0 32 12">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {methods.map((m, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-xl p-6 bg-white hover:border-[#B8860B]/30 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-start gap-4">
            <span className="text-[#B8860B] font-mono text-sm mt-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity font-bold">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-mono text-sm tracking-wider uppercase text-slate-900 font-bold mb-2">{m.name}</p>
              <p className="text-base text-slate-700 leading-relaxed font-medium">{m.desc}</p>
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
    <div className="bg-slate-900 rounded-2xl p-10 sm:p-12 text-white">
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-5">{cs.sector}</p>
      <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl leading-relaxed text-white mb-8 font-semibold tracking-wide">{cs.headline}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {[
          { label: 'Challenge', body: cs.what },
          { label: 'Approach', body: cs.how },
          { label: 'Outcome', body: cs.result },
        ].map((col, i) => (
          <div key={i} className={`${i < 2 ? 'lg:border-r lg:border-white/10 lg:pr-8' : ''}`}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-4 font-bold">{col.label}</p>
            <p className="text-base text-slate-200 leading-relaxed font-medium">{col.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cs.metrics.map((m, i) => (
          <div key={i} className="text-center sm:text-left">
            <p className="font-mono text-xs tracking-widest uppercase text-slate-400 mb-2">{m.label}</p>
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
  outsourcing: ['Identify the need', 'Define the scope', 'Select the partner', 'Transition knowledge', 'Manage & improve'],
};

function StagePanel({ stage }: { stage: typeof stages[0] }) {
  const [isDeepDive, setIsDeepDive] = useState(false);

  // Reset to minimalist overview when stage changes
  useEffect(() => {
    setIsDeepDive(false);
  }, [stage.id]);

  if (isDeepDive) {
    return (
      <div className="space-y-16 animate-fadeIn">
        {/* Deep Dive Header Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#D4AF37] font-bold block mb-1">
              TECHNICAL DEEP DIVE & PLAYBOOK
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl uppercase tracking-wide">
              {stage.title} Architecture
            </h3>
          </div>
          <button
            onClick={() => setIsDeepDive(false)}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider uppercase px-5 py-3 rounded-xl font-bold transition-colors"
          >
            <span>← Back to Overview</span>
          </button>
        </div>

        {/* Intro */}
        <div>
          <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed max-w-4xl border-l-4 border-[#B8860B] pl-6 font-medium">{stage.intro}</p>
        </div>

        {/* Why it matters / Quality Dimensions */}
        <div>
          <h3 className="font-mono text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-8 font-bold">
            {stage.id === '04' ? 'Eight Quality Dimensions' : stage.id === '06' ? 'Why Companies Choose It' : 'Why It Matters'}
          </h3>
          {stage.id === '04' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1 flex justify-center">
                <QualityWheel />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stage.why.map((w, i) => (
                  <div key={i} className="p-6 border border-slate-200 rounded-xl bg-white/70 shadow-sm">
                    <p className="font-mono text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">{w.title}</p>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">{w.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stage.why.map((w, i) => (
                <div key={i} className="p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-[#B8860B]/10 flex items-center justify-center mb-4">
                    <span className="text-[#B8860B] text-sm font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="font-bold text-slate-950 text-base mb-2">{w.title}</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">{w.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lifecycle */}
        <div>
          <h3 className="font-mono text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-6 font-bold">Lifecycle Flow</h3>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <LifecycleFlow steps={lifecycles[stage.slug] || []} />
          </div>
        </div>

        {/* Methods */}
        <div>
          <h3 className="font-mono text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-8 font-bold">
            {stage.id === '06' ? 'Engagement Process' : 'Core Methodologies'}
          </h3>
          <MethodGrid methods={stage.methods} />
        </div>

        {/* Case Study */}
        <div>
          <h3 className="font-mono text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-8 font-bold">Case Study</h3>
          <CaseStudyCard cs={stage.caseStudy} />
        </div>

        {/* Myths / Pitfalls */}
        {stage.myths.length > 0 && (
          <div>
            <h3 className="font-mono text-sm tracking-[0.25em] uppercase text-[#B8860B] mb-8 font-bold">Common Misconceptions</h3>
            <div className="space-y-4">
              {stage.myths.map((m, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 bg-red-50/50">
                    <p className="font-mono text-xs tracking-widest uppercase text-red-500 mb-2 font-bold">Myth</p>
                    <p className="text-base font-bold text-slate-800 italic">"{m.myth}"</p>
                  </div>
                  <div className="p-6 bg-emerald-50/50 border-t sm:border-t-0 sm:border-l border-slate-200">
                    <p className="font-mono text-xs tracking-widest uppercase text-emerald-700 mb-2 font-bold">Reality</p>
                    <p className="text-base text-slate-800 font-medium">{m.reality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom return toggle */}
        <div className="text-center pt-8 border-t border-slate-200">
          <button
            onClick={() => setIsDeepDive(false)}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs tracking-wider uppercase px-6 py-3 rounded-full font-bold transition-colors"
          >
            <span>← Return to Minimalist Overview</span>
          </button>
        </div>
      </div>
    );
  }

  // DEFAULT: MINIMALIST OVERVIEW
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Intro Statement */}
      <div>
        <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed max-w-4xl border-l-4 border-[#B8860B] pl-6 font-medium">
          {stage.intro}
        </p>
      </div>

      {/* 3 Key Value Highlights */}
      <div>
        <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-6 font-bold">
          Key Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stage.why.slice(0, 3).map((w, i) => (
            <div key={i} className="p-6 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg bg-[#B8860B]/10 flex items-center justify-center mb-3">
                <span className="text-[#B8860B] text-xs font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="font-bold text-slate-900 text-base mb-2">{w.title}</p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{w.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Methodologies */}
      <div>
        <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-6 font-bold">
          Methodologies
        </h3>
        <MethodGrid methods={stage.methods} />
      </div>

      {/* Case Study Metrics */}
      <div>
        <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8860B] mb-6 font-bold">
          Verified Outcome
        </h3>
        <CaseStudyCard cs={stage.caseStudy} />
      </div>

      {/* Deep Dive CTA Subpage Launcher */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-sm">
        <h4 className="font-heading text-2xl uppercase tracking-wide text-slate-900 mb-3">
          Explore Deep Dive & Playbook
        </h4>
        <p className="text-slate-600 text-sm sm:text-base mb-6 font-medium max-w-xl mx-auto">
          Access complete lifecycles, QualityWheel frameworks, tooling details, and misconception breakdowns for {stage.title}.
        </p>
        <button
          onClick={() => setIsDeepDive(true)}
          className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold shadow-md transition-all duration-200 hover:scale-[1.02]"
        >
          <span>Open Technical Deep Dive</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────

function ServicesContent() {
  const [activeStage, setActiveStage] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const scrollToPanel = () => {
    if (panelRef.current) {
      const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const stageParam = searchParams.get('stage');
    if (stageParam) {
      const p = stageParam.trim().toLowerCase();

      // 1. Match by exact stage ID ('01', '02', '03', '04', '05', '06')
      const byId = stages.findIndex((s) => s.id === p || s.id === p.padStart(2, '0'));
      if (byId !== -1) {
        setActiveStage(byId);
        setTimeout(scrollToPanel, 100);
        return;
      }

      // 2. Match by slug ('generation', 'annotation', 'labeling', 'quality', 'ai-solutions', 'outsourcing')
      const bySlug = stages.findIndex((s) => s.slug === p);
      if (bySlug !== -1) {
        setActiveStage(bySlug);
        setTimeout(scrollToPanel, 100);
        return;
      }

      // 3. Match numeric stage number (1..6 -> index 0..5 or 0..5)
      const num = parseInt(p, 10);
      if (!isNaN(num)) {
        if (num >= 1 && num <= stages.length) {
          setActiveStage(num - 1);
          setTimeout(scrollToPanel, 100);
          return;
        }
        if (num >= 0 && num < stages.length) {
          setActiveStage(num);
          setTimeout(scrollToPanel, 100);
          return;
        }
      }
    }
  }, [searchParams]);

  const handleSelectStage = (i: number) => {
    setActiveStage(i);
    scrollToPanel();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-slate-100 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 font-mono text-xs font-bold tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl uppercase tracking-wide text-slate-900 leading-tight mb-6">
            Six Disciplines.<br />
            <span className="text-[#B8860B]">One Framework.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-800 max-w-3xl leading-relaxed mb-4 font-medium">
            Raw data doesn't become intelligence by accident. It moves through six disciplines, each handing off a more refined asset to the next — generated, annotated, labeled, verified, engineered, and accelerated.
          </p>
        </div>
      </section>

      {/* ── DELIVERY NAVIGATOR ─────────────────────────────────────── */}
      <section className="py-6 sm:py-10 bg-slate-50 border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12">
          <PipelineDiagram activeStage={activeStage} onSelect={handleSelectStage} />
        </div>
      </section>

      {/* ── STAGE DETAIL ───────────────────────────────────────────── */}
      <section ref={panelRef} className="py-12 sm:py-20">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Stage header */}
          <div className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-slate-100">
            <h2
              className="font-heading uppercase tracking-wide text-slate-900 leading-tight mb-2"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              {stages[activeStage].title}
            </h2>
          </div>

          {/* Stage body */}
          <StagePanel key={activeStage} stage={stages[activeStage]} />

          {/* Previous / Next navigation */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-100 flex justify-between items-center">
            <div>
              {activeStage > 0 && (
                <button
                  onClick={() => handleSelectStage(activeStage - 1)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wide text-slate-500 hover:text-slate-900 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="hidden sm:inline">{stages[activeStage - 1].title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              )}
            </div>
            <div>
              {activeStage < stages.length - 1 && (
                <button
                  onClick={() => handleSelectStage(activeStage + 1)}
                  className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wide text-[#B8860B] hover:text-[#8a6309] transition-colors group"
                >
                  <span className="hidden sm:inline">{stages[activeStage + 1].title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH CTA (WHITE BACKGROUND ONLY) ────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-100 text-center">
        <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/home#contact"
            className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07508] text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-200"
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
