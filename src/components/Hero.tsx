'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PatternDot, HeroGlow } from './BackgroundPatterns';
import { Logo } from './Logo';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

const stats = [
  { value: 12, suffix: '+', label: 'Countries Served' },
  { value: 95, suffix: '%', label: 'Client Retention' },
  { value: 50, suffix: '+', label: 'AI Projects Delivered' },
  { value: 3, suffix: 'x', label: 'Faster Than In-House Hiring' },
];

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white dark:bg-[#0a0a0f]">
      <PatternDot />
      <HeroGlow />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div ref={ref} className="text-center">

          {/* Premium Logo Showcase Container */}
          <div className={cn(
            "flex justify-center mb-8 transition-all duration-1000 ease-out",
            isInView ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4"
          )}>
            <div className="relative group">
              {/* Outer soft breathing ambient gradient ring */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-indigo-500/10 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-300" />
              
              {/* Main premium logo badge */}
              <div className="relative flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/40 px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-colors duration-300">
                <Logo size="lg" className="h-10 w-auto text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Eyebrow badge — single indigo accent */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-8 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Avora Ventures
          </div>

          {/* Main headline */}
          <h1 className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-heading font-bold tracking-[-0.03em] leading-[1.05] text-slate-900 dark:text-white mb-6 transition-all duration-700 delay-100",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Scale your vision
            <br />
            <span className="text-slate-400 dark:text-slate-600">with precision.</span>
          </h1>

          {/* Subtext */}
          <p className={cn(
            "text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Elite engineering talent, AI solutions, and data operations — under one roof. From strategy to deployment, we build what defines your future.
          </p>

          {/* CTAs */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-3 justify-center items-center transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-200 group shadow-sm"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats strip — animated counters in a bordered grid */}
          <div className={cn(
            "mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/50 transition-all duration-700 delay-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 dark:divide-slate-800/50 border border-slate-100 dark:border-slate-800/50 rounded-2xl overflow-hidden">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-8 px-4 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-1.5 tabular-nums">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-500 text-center leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
