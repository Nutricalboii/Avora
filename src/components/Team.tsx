'use client';

import Image from 'next/image';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

export default function Team() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="team" className="py-24 md:py-32 bg-white dark:bg-[#0a0a0f] relative border-t border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div
          ref={ref}
          className={cn(
            'mb-14 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="section-eyebrow">Leadership</span>
          <h2 className="section-heading mt-2">Meet the Founder</h2>
        </div>

        {/* Founder card */}
        <div className={cn(
          "transition-all duration-700 delay-100",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row">

              {/* Photo panel */}
              <div className="relative md:w-64 lg:w-72 flex-shrink-0 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <div className="aspect-square md:aspect-auto md:h-full min-h-[240px]">
                  <Image
                    src="/abhay-jain.jpg"
                    alt="Abhay Jain — Founder, Avora Ventures"
                    fill
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 288px"
                    priority
                  />
                </div>
              </div>

              {/* Content panel */}
              <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                    Founder &amp; CEO
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1">
                  Abhay Jain
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-5">
                  Avora Ventures
                </p>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  A global professional with extensive experience in management consulting (McKinsey &amp; Co.), energy &amp; sustainability, and tech. Educated at Stanford University (MBA, MS) and IIT Kanpur. Previously with Mitsubishi Heavy Industries, NextEra Energy, and Autogrid.
                </p>

                {/* Credential pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['McKinsey & Co.', 'Stanford MBA', 'IIT Kanpur', 'NextEra Energy'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/founder"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                >
                  Read Full Profile
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
