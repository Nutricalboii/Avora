'use client';

import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

export default function Team() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.2 });

  return (
    <section id="team" className="py-16 md:py-28 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={cn(
            'text-center mb-16 md:mb-20 transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2 block animate-fade-in">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">
            Meet the Founder
          </h2>
        </div>

        <div className={cn(
          "max-w-3xl mx-auto transition-all duration-700 delay-100",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-500 group flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-100 to-sky-100 border-4 border-white shadow-lg flex items-center justify-center text-4xl md:text-5xl font-heading font-bold text-primary-700 group-hover:scale-105 transition-transform duration-500">
                AJ
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                Abhay Jain
              </h3>
              <p className="text-lg font-medium text-primary-600 mb-4">
                Founder, Avora Ventures
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                A global professional with extensive experience in management consulting (McKinsey & Co.), energy & sustainability, and tech. Educated at Stanford University (MBA, MS) and IIT Kanpur.
              </p>
              
              <Link 
                href="/founder" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm hover:shadow-md transition-all duration-300 group/btn"
              >
                Read Full Profile
                <svg 
                  className="ml-2 -mr-1 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
