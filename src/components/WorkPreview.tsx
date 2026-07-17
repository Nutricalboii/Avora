'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useInView';

const previews = [
  { sector: 'Rare Disease Diagnostics', service: 'Data Generation', metric: 'AUC 0.72 → 0.91' },
  { sector: 'Precision Agriculture', service: 'Data Annotation', metric: 'Scouting: 3h → 25min' },
  { sector: 'Clinical Document Processing', service: 'Labeling', metric: 'F1: 0.94 · Kappa: 0.90' },
  { sector: 'Retail Demand Forecasting', service: 'AI Implementation', metric: '680% ROI at 36 months' },
];

export default function WorkPreview() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-[var(--background-alt)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>
            <span className="section-eyebrow">Delivered outcomes</span>
            <h2 className="section-heading mt-2">Work from the field.</h2>
            <p className="section-subtext mt-4 max-w-lg">
              Anonymized engagement results. Sector, methodology, and verified outcome only —
              no client names, by default.
            </p>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex-shrink-0"
          >
            See all engagements
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {previews.map((p, i) => (
            <Link
              key={p.sector}
              href="/work"
              className="group card card-hover rounded-2xl p-7 flex flex-col gap-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }}
            >
              <div>
                <span className="text-[10px] font-mono font-semibold text-[var(--accent)] uppercase tracking-[0.2em] block mb-2">
                  {p.service}
                </span>
                <span className="text-base font-heading font-bold text-[var(--foreground)] leading-snug block">
                  {p.sector}
                </span>
              </div>
              <div className="hairline-gold" />
              <span className="text-xl font-heading font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {p.metric}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
