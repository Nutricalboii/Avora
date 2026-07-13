'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { Briefcase, GraduationCap, Trophy, FileText, Globe2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LeadershipPage() {
  const { ref: heroRef, isInView: heroInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: expRef, isInView: expInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: eduRef, isInView: eduInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: pubRef, isInView: pubInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-[#0f1115] selection:bg-slate-200 dark:selection:bg-slate-800 selection:text-slate-900 dark:selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
          <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Hero Section */}
        <section ref={heroRef} className={cn("mb-20 transition-all duration-700", heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="pt-2 flex-1">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Executive Leadership
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-slate-650 dark:text-slate-400 mb-5">
                Avora Ventures
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                At Avora Ventures, we bring together hands-on leadership rooted in global management consulting, advanced engineering, and sustainable technology. Our background across energy, tech, and industrial operations helps us build systems that last. We focus on real-world execution—bridging strategic direction with operational excellence to support the next generation of industry leaders.
              </p>

              {/* Credential logos strip */}
              <div className="flex flex-wrap items-center gap-4 mb-5 py-4.5 px-6 bg-slate-900/80 dark:bg-black/60 border border-[#D4AF37]/35 rounded-xl shadow-lg backdrop-blur-md">
                <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest mr-2">Credentials</span>
                
                {/* Stanford */}
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-[#D4AF37]/20 shadow-sm">
                  <img src="/logos/stanford.svg" alt="Stanford University Logo" className="h-6 w-auto" />
                  <span className="text-xs text-slate-300 font-sans font-bold">MBA &middot; MS</span>
                </div>

                {/* IIT Kanpur */}
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-[#D4AF37]/20 shadow-sm">
                  <img src="/logos/iitk.svg" alt="IIT Kanpur Logo" className="h-6 w-auto dark:invert" />
                  <span className="text-xs text-slate-300 font-sans font-bold">B.Tech</span>
                </div>

                {/* McKinsey */}
                <div className="flex items-center px-4 py-2 bg-black/40 rounded-lg border border-[#D4AF37]/20 shadow-sm">
                  <img src="/logos/mckinsey.svg" alt="McKinsey Logo" className="h-5 w-auto dark:invert" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section ref={expRef} className={cn("mb-20 transition-all duration-700 delay-100", expInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <Briefcase className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Work Experience</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                company: "McKinsey & Co.",
                role: "Consultant",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-1.5">
                    <img src="/logos/mckinsey.svg" alt="McKinsey & Co. Logo" className="max-h-full max-w-full object-contain dark:invert" />
                  </div>
                ),
                accent: "border-l-4 border-l-[#D4AF37]",
              },
              {
                company: "Mitsubishi Heavy Industries",
                role: "Sales and Marketing Executive; Compressor & Steam Turbine Engineer",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-1.5">
                    <img src="/logos/mitsubishi.svg" alt="Mitsubishi Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                ),
                accent: "border-l-4 border-l-red-650",
              },
              {
                company: "NextEra Energy",
                role: "MBA Intern, Renewable Energy Innovation and Strategy Team",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-1.5">
                    <img src="/logos/nextera.svg" alt="NextEra Energy Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                ),
                accent: "border-l-4 border-l-sky-500",
              },
              {
                company: "Autogrid",
                role: "Summer Intern, Solutions and Data Science",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-2">
                    <span className="text-xs font-sans font-black tracking-tight text-[#00aaff]">Auto<span className="text-[#ff6600]">grid</span></span>
                  </div>
                ),
                accent: "border-l-4 border-l-orange-550",
              },
              {
                company: "Sparkz Inc.",
                role: "Business and Product Development Manager (Intern)",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-2">
                    <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400">⚡SPARKZ</span>
                  </div>
                ),
                accent: "border-l-4 border-l-violet-650",
              },
              {
                company: "Averda",
                role: "Operations Intern, COO Office",
                logo: (
                  <div className="w-20 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-[#D4AF37]/25 shadow-sm p-2">
                    <span className="text-xs font-sans font-black text-emerald-600 dark:text-emerald-400">averda</span>
                  </div>
                ),
                accent: "border-l-4 border-l-green-655",
              },
            ].map((exp, i) => (
              <div key={i} className={cn("bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-855 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 flex items-center gap-5", exp.accent)}>
                <div className="flex-shrink-0 flex items-center justify-center">
                  {exp.logo}
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-855 flex-shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.company}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5">{exp.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section ref={eduRef} className={cn("mb-20 transition-all duration-700 delay-200", eduInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Education</h2>
          </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                school: "Stanford University",
                degree: "MBA",
                sub: "Graduate School of Business",
                border: "border-[#D4AF37]/35 hover:border-[#D4AF37]/60",
                logo: (
                  <div className="h-12 w-auto mb-4 flex items-center justify-start">
                    <img src="/logos/stanford.svg" alt="Stanford Logo" className="h-9 w-auto" />
                  </div>
                ),
              },
              {
                school: "Stanford University",
                degree: "MS in Environment and Resources",
                sub: "School of Earth, Energy & Environmental Sciences",
                border: "border-[#D4AF37]/35 hover:border-[#D4AF37]/60",
                logo: (
                  <div className="h-12 w-auto mb-4 flex items-center justify-start">
                    <img src="/logos/stanford.svg" alt="Stanford Logo" className="h-9 w-auto" />
                  </div>
                ),
              },
              {
                school: "IIT Kanpur",
                degree: "B.Tech, Materials & Metallurgical Engineering",
                sub: "Indian Institute of Technology",
                border: "border-[#D4AF37]/35 hover:border-[#D4AF37]/60",
                logo: (
                  <div className="h-12 w-auto mb-4 flex items-center justify-start">
                    <img src="/logos/iitk.svg" alt="IIT Kanpur Logo" className="h-9 w-auto dark:invert" />
                  </div>
                ),
              },
            ].map((edu, i) => (
              <div key={i} className={cn("p-6 rounded-2xl border bg-black/45 dark:bg-slate-900/60 backdrop-blur-sm text-slate-100 shadow-lg transition-all duration-300", edu.border)}>
                {edu.logo}
                <h3 className="text-base font-bold mb-1 text-slate-100 dark:text-white">{edu.school}</h3>
                <p className="text-sm font-semibold text-slate-350 dark:text-slate-300 mb-1">{edu.degree}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{edu.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Awards &amp; Certificates</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "K. C. Mahindra Scholarship for Graduate Studies, 2017",
              "J N Tata Scholarship for Graduate Studies, 2017",
              "Social Management Immersion Fellowship, Stanford, 2018",
              "Certificate in Public Management and Social Innovation, Stanford University, 2019",
              "InSite Fellowship, 2019",
            ].map((award, i) => (
              <li key={i} className="flex items-start gap-2 bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                <span className="text-[#D4AF37] mt-0.5">★</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-350">{award}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Publications & Patents */}
        <section ref={pubRef} className={cn("mb-20 transition-all duration-700 delay-300", pubInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Publications &amp; Patents</h2>
          </div>
          
          <div className="space-y-4">
            {[
              "Global surveys of consumer sentiment during the coronavirus crisis, McKinsey, 2020",
              "Low Hanging Fruit: VC Investment Trends in Food Waste, Stanford EIPER, 2020",
              "Stanford experts discuss challenges and opportunities in disposing of waste, Stanford News, 2019",
              "Technical Challenges for Compressors and Steam Turbines for Efficient and Sustainable Operation in Mega Ethylene Plants, Texas A&M Asia Turbomachinery and Pump Symposium, 2016",
              "Emergency Shut-Off Device Patent, Mitsubishi Heavy Industries, 2016",
              "Emergency Shutoff Device And Emergency Shutoff System Patent, Mitsubishi Heavy Industries, 2016",
              "The clock stops ticking, Vox-populi, IIT Kanpur, 2016",
            ].map((pub, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-855 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors group">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">{pub}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
