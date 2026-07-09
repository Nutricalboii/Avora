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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="section-eyebrow">Leadership</span>
          <h2 className="section-heading mt-2">Meet the Founder</h2>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="glass-panel rounded-2xl overflow-hidden hover:border-[#B08D57]/40 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row">

              {/* Photo panel */}
              <div className="relative md:w-64 lg:w-72 flex-shrink-0 bg-black/10 dark:bg-[#0c1018] overflow-hidden">
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
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#B08D57]">
                    Founder &amp; CEO
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1">
                  Abhay Jain
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-5">
                  Avora Ventures
                </p>

                <p className="text-slate-650 dark:text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  A global professional with extensive experience in management consulting (McKinsey &amp; Co.), energy &amp; sustainability, and tech. Educated at Stanford University (MBA, MS) and IIT Kanpur. Previously with Mitsubishi Heavy Industries, NextEra Energy, and Autogrid.
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
                  href="/founder"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#B08D57] hover:text-[#937343] transition-colors group/link"
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
        </motion.div>

      </div>
    </section>
  );
}
