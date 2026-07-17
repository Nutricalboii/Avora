import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Delivered Work | Avora Ventures',
  description:
    'Anonymized engagement outcomes from Avora Ventures — sector, methodology, and verified results across data generation, annotation, labeling, and AI implementation.',
};

const cases = [
  {
    id: 'med-gen',
    sector: 'Rare Disease Diagnostics — Healthcare',
    service: 'Data Generation',
    what: 'Engineered a physics-informed synthetic MRI volume library to address severe scarcity in confirmed training cases for a rare oncological condition.',
    how: 'Applied parametric copula modeling to capture inter-slice spatial correlations. Differential privacy budget (ε = 1.2) enforced throughout generation. Wasserstein distance between synthetic and real distributions validated below 0.04 before sign-off. Domain expert radiologists reviewed 500 stratified samples.',
    result:
      'Diagnostic AUC improved from 0.72 → 0.91. Training corpus scaled from 87 confirmed cases to 50,000 synthetic volumes, enabling the first statistically valid model training run.',
    metric: 'AUC 0.72 → 0.91',
  },
  {
    id: 'agri-ann',
    sector: 'Precision Agriculture — Drone Telemetry',
    service: 'Data Annotation',
    what: 'Annotated high-density multispectral drone imagery across 14 distinct crop stress classes for a precision agriculture platform operating across multiple growing regions.',
    how: "Built a domain ontology covering stress type, severity stage, and spectral band signature. Model-assisted pre-labeling using a fine-tuned segmentation model reduced manual load by 58%. Double-blind adjudication enforced on all disagreement cases. Fleiss' Kappa target ≥ 0.91 required before batch sign-off.",
    result:
      'Field scouting time reduced from 3 hours to 25 minutes per plot. 800,000 multispectral frames delivered at a final inter-annotator Kappa of 0.93.',
    metric: 'Scouting: 3h → 25min',
  },
  {
    id: 'clinical-label',
    sector: 'Clinical Document Processing — Pharmaceutical',
    service: 'Data Labeling',
    what: 'Operationalized OCR-based layout-analysis extraction and structured labeling across multi-format clinical trial data collection sheets for a pharmaceutical data operations team.',
    how: "Deployed a consensus verification protocol with triple-review on ambiguous table regions and handwritten fields. Prodigy used for span-level entity labeling; CVAT for table structure and form-field annotation. Statistical QA gate: minimum F1 ≥ 0.93 and Cohen's Kappa ≥ 0.90 required per data point category before delivery.",
    result:
      '2.1 million pages processed across 47 distinct data point categories. Final F1: 0.94, Kappa: 0.90. Zero pages required re-extraction post-delivery.',
    metric: 'F1: 0.94 · Kappa: 0.90',
  },
  {
    id: 'retail-ai',
    sector: 'Multi-SKU Retail — Demand Forecasting',
    service: 'AI Implementation',
    what: "Designed and integrated a custom predictive ensemble model into the client's on-premise cloud infrastructure for multi-horizon demand forecasting across a large-scale product catalogue.",
    how: 'Three-week discovery phase mapped existing data pipelines, identified distribution shift patterns, and defined forecast horizons. PyTorch model compiled to ONNX Runtime for edge deployment. SHAP explainability layer added to satisfy internal procurement audit requirements. Kolmogorov-Smirnov drift monitoring deployed post-launch to flag covariate shift.',
    result:
      '40% reduction in manual planning overhead in the first quarter. 680% ROI demonstrated at the 36-month projection horizon.',
    metric: '680% ROI · 36 months',
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
          <span className="section-eyebrow">Delivered outcomes</span>
          <h1 className="section-heading mt-2 mb-5">Work from the field.</h1>
          <p className="section-subtext max-w-xl">
            Anonymized engagement outcomes. No client names — sector, methodology, and verified
            result only. All engagements are NDA-protected.
          </p>
        </div>

        <div className="space-y-6">
          {cases.map((c) => (
            <article
              key={c.id}
              className="card card-hover rounded-2xl p-8 md:p-12"
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
                <div className="space-y-7 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono font-semibold text-[var(--accent)] uppercase tracking-[0.2em] border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3 py-1 rounded-full">
                      {c.service}
                    </span>
                    <span className="text-sm font-heading font-semibold text-[var(--foreground)]">
                      {c.sector}
                    </span>
                  </div>

                  {[
                    { label: 'What we did', body: c.what },
                    { label: 'How', body: c.how },
                    { label: 'Result', body: c.result },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] font-mono font-semibold text-[var(--foreground-muted)] uppercase tracking-[0.18em] mb-2">
                        {row.label}
                      </p>
                      <p className="text-[15px] text-[var(--foreground)] leading-relaxed">
                        {row.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex-shrink-0 lg:items-start">
                  <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-tint)] p-7 min-w-[200px] text-center">
                    <span className="block text-[10px] font-mono font-semibold text-[var(--accent)] uppercase tracking-[0.2em] mb-3">
                      Primary outcome
                    </span>
                    <span className="block text-lg font-heading font-bold text-[var(--foreground)] leading-snug">
                      {c.metric}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[13px] font-mono text-[var(--foreground-muted)] border-t border-[var(--border)] pt-6">
          Metrics verified through partner delivery logs. Client names withheld by default under NDA.
        </p>
      </div>
    </main>
  );
}
