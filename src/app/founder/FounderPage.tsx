'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { Briefcase, GraduationCap, Trophy, FileText, Globe2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FounderPage() {
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
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-lg flex-shrink-0">
              <Image
                src="/abhay-jain.jpg"
                alt="Abhay Jain"
                width={176}
                height={176}
                className="w-full h-full object-cover object-center"
                priority
              />
            </div>
            <div className="pt-2 flex-1">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Abhay Jain
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-slate-650 dark:text-slate-400 mb-5">
                Founder &amp; CEO, Avora Ventures
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                A global professional with experience in management consulting, energy &amp; sustainability, tech, and manufacturing. Focused on full product lifecycle, operations, and driving everything related to growth including marketing, sales, and inorganic growth.
              </p>

              {/* Credential logos strip */}
              <div className="flex flex-wrap items-center gap-3 mb-5 py-4 px-5 bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-855 rounded-xl shadow-sm">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mr-2">Credentials</span>
                
                {/* Stanford */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#8c1515]/10 rounded-full border border-[#8c1515]/20">
                  <span className="w-2 h-2 rounded-full bg-[#8c1515]" />
                  <span className="text-xs font-heading font-bold text-[#8c1515]">Stanford</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-medium">MBA &middot; MS</span>
                </div>

                {/* IIT Kanpur */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-600/10 rounded-full border border-sky-600/20">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  <span className="text-xs font-heading font-bold text-sky-700 dark:text-sky-400">IIT Kanpur</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-medium">B.Tech</span>
                </div>

                {/* McKinsey */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-900/10 rounded-full border border-blue-900/20">
                  <span className="w-2 h-2 rounded-full bg-[#051c2c]" />
                  <span className="text-xs font-heading font-bold text-[#051c2c] dark:text-[#3399ff]">McKinsey</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white dark:bg-slate-955 p-4 rounded-xl border border-slate-205 dark:border-slate-855 shadow-sm">
                <Globe2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Originally from the foothills of the Himalayas in India, lived in Japan for 4 years, and moved to the USA for higher education. When not working, I enjoy table tennis, pool, golf, road trips, and dancing.
                </p>
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
                  <div className="w-16 h-12 bg-[#051c2c] rounded-lg flex items-center justify-center border border-slate-700/50 shadow-sm">
                    <span className="text-xs font-sans font-black text-white tracking-tighter">McKinsey</span>
                  </div>
                ),
                accent: "border-l-4 border-l-blue-700",
              },
              {
                company: "Mitsubishi Heavy Industries",
                role: "Sales and Marketing Executive; Compressor & Steam Turbine Engineer",
                logo: (
                  <div className="w-16 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-slate-300 shadow-sm p-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Mitsubishi">
                      <polygon points="12,2 20,8 12,14 4,8" fill="#e8001c"/>
                      <polygon points="12,10 20,16 12,22 4,16" fill="#e8001c" opacity="0.8"/>
                    </svg>
                  </div>
                ),
                accent: "border-l-4 border-l-red-650",
              },
              {
                company: "NextEra Energy",
                role: "MBA Intern, Renewable Energy Innovation and Strategy Team",
                logo: (
                  <div className="w-16 h-12 bg-[#003057] rounded-lg flex flex-col items-center justify-center border border-slate-850 shadow-sm leading-none">
                    <span className="text-[7px] font-sans font-black text-[#5fc2ae] tracking-widest uppercase">NEXT</span>
                    <span className="text-[7px] font-sans font-black text-white tracking-widest uppercase mt-0.5">ERA</span>
                  </div>
                ),
                accent: "border-l-4 border-l-sky-500",
              },
              {
                company: "Autogrid",
                role: "Summer Intern, Solutions and Data Science",
                logo: (
                  <div className="w-16 h-12 bg-[#111] rounded-lg flex flex-col items-center justify-center border border-slate-800 shadow-sm leading-none">
                    <span className="text-[7px] font-sans font-black text-[#00aaff] tracking-tighter">Auto</span>
                    <span className="text-[7px] font-sans font-black text-[#ff6600] tracking-tighter mt-0.5">grid</span>
                  </div>
                ),
                accent: "border-l-4 border-l-orange-500",
              },
              {
                company: "Sparkz Inc.",
                role: "Business and Product Development Manager (Intern)",
                logo: (
                  <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-350 shadow-sm">
                    <span className="text-[9px] font-mono font-black text-purple-700 tracking-tighter">⚡SPARKZ</span>
                  </div>
                ),
                accent: "border-l-4 border-l-violet-655",
              },
              {
                company: "Averda",
                role: "Operations Intern, COO Office",
                logo: (
                  <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-300 shadow-sm">
                    <span className="text-[9px] font-sans font-black text-emerald-600 tracking-tight">averda</span>
                  </div>
                ),
                accent: "border-l-4 border-l-green-655",
              },
            ].map((exp, i) => (
              <div key={i} className={cn("bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-855 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 flex items-center gap-5", exp.accent)}>
                <div className="flex-shrink-0 flex items-center justify-center">
                  {exp.logo}
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-850 flex-shrink-0" />
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
                border: "border-t-4 border-t-[#8C1515]",
                logo: (
                  <div className="w-24 h-10 rounded bg-[#8C1515] flex items-center justify-center mb-4 shadow-sm">
                    <span className="font-heading font-extrabold text-white text-sm tracking-wide">STANFORD</span>
                  </div>
                ),
              },
              {
                school: "Stanford University",
                degree: "MS in Environment and Resources",
                sub: "School of Earth, Energy & Environmental Sciences",
                border: "border-t-4 border-t-[#8C1515]",
                logo: (
                  <div className="w-24 h-10 rounded bg-[#8C1515] flex items-center justify-center mb-4 shadow-sm">
                    <span className="font-heading font-extrabold text-white text-sm tracking-wide">STANFORD</span>
                  </div>
                ),
              },
              {
                school: "IIT Kanpur",
                degree: "B.Tech, Materials & Metallurgical Engineering",
                sub: "Indian Institute of Technology",
                border: "border-t-4 border-t-sky-650",
                logo: (
                  <div className="w-24 h-10 rounded bg-[#00529b] flex items-center justify-center mb-4 shadow-sm">
                    <span className="font-heading font-extrabold text-white text-sm tracking-widest">IIT KANPUR</span>
                  </div>
                ),
              },
            ].map((edu, i) => (
              <div key={i} className={cn("p-6 rounded-2xl border border-slate-205 dark:border-slate-855 bg-white dark:bg-slate-955 shadow-sm hover:shadow-md transition-all duration-200", edu.border)}>
                {edu.logo}
                <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-white">{edu.school}</h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{edu.degree}</p>
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
