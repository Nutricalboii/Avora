'use client';

import Image from 'next/image';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Team() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Overlay Ambient Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-eyebrow">Leadership</span>
          <h2 className="section-heading mt-2">Executive Leadership</h2>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="glass-panel rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row">

              {/* Content panel */}
              <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="mb-1">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#D4AF37]">
                    Founding Leadership
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1">
                  Proven Experience &amp; Pedigree
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-5">
                  Avora Ventures
                </p>

                <p className="text-slate-655 dark:text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  Our leadership brings together deep domain expertise from top-tier management consulting, heavy engineering, and sustainable energy. We believe in bridging high-level strategy with hands-on technical execution to deliver real results across industries.
                </p>

                {/* Credential pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['McKinsey & Co.', 'Stanford MBA', 'IIT Kanpur', 'NextEra Energy'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.02] dark:bg-white/[0.04] text-slate-700 dark:text-slate-350 border border-slate-205 dark:border-slate-700/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/leadership"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#B8962D] transition-colors group/link"
                >
                  Read Leadership Profile
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
        </motion.div>

      </div>
    </section>
  );
}
