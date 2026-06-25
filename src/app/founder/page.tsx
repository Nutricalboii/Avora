'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { Briefcase, GraduationCap, Trophy, FileText, Globe2, Coffee } from 'lucide-react';
import Link from 'next/link';

export default function FounderPage() {
  const { ref: heroRef, isInView: heroInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: expRef, isInView: expInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: eduRef, isInView: eduInView } = useInView({ once: true, threshold: 0.1 });
  const { ref: pubRef, isInView: pubInView } = useInView({ once: true, threshold: 0.1 });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 selection:bg-primary-100 selection:text-primary-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-8 group">
          <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Hero Section */}
        <section ref={heroRef} className={cn("mb-20 transition-all duration-700", heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary-100 to-sky-100 border-4 border-white shadow-xl flex items-center justify-center text-4xl md:text-6xl font-heading font-bold text-primary-700 flex-shrink-0">
              AJ
            </div>
            <div className="pt-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight mb-4">
                Abhay Jain
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sky-600 mb-6">
                Founder, Avora Ventures
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                A global professional with experience in management consulting, energy & sustainability, tech, and manufacturing. Focused on full product lifecycle, operations, and driving everything related to growth including marketing, sales, and inorganic growth.
              </p>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Globe2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  Originally from the foothills of the Himalayas in India, lived in Japan for 4 years, and moved to the USA for higher education. When not working, I enjoy table tennis, pool, golf, road trips, and dancing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section ref={expRef} className={cn("mb-20 transition-all duration-700 delay-100", expInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
              <Briefcase className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Work Experience</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { company: "McKinsey & Co.", role: "Consultant" },
              { company: "Mitsubishi Heavy Industries", role: "Sales and Marketing Executive; Compressor & Steam Turbine Engineer" },
              { company: "NextEra Energy", role: "MBA Intern, Renewable Energy Innovation and Strategy Team" },
              { company: "Autogrid", role: "Summer Intern, Solutions and Data Science" },
              { company: "Sparkz Inc.", role: "Business and Product Development Manager (Intern)" },
              { company: "Averda", role: "Operations Intern, COO Office" },
            ].map((exp, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                <p className="text-primary-600 font-medium">{exp.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section ref={eduRef} className={cn("mb-20 transition-all duration-700 delay-200", eduInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
              <GraduationCap className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Education</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { school: "Stanford University", degree: "MBA", color: "from-red-50 to-orange-50", border: "border-red-100", text: "text-red-700" },
              { school: "Stanford University", degree: "MS in Environment and Resources", color: "from-emerald-50 to-teal-50", border: "border-emerald-100", text: "text-emerald-700" },
              { school: "IIT Kanpur", degree: "B.Tech, Materials & Metallurgical Engineering", color: "from-blue-50 to-indigo-50", border: "border-blue-100", text: "text-blue-700" },
            ].map((edu, i) => (
              <div key={i} className={cn("p-6 rounded-2xl border bg-gradient-to-br", edu.color, edu.border)}>
                <h3 className={cn("text-xl font-bold mb-1", edu.text)}>{edu.school}</h3>
                <p className="text-slate-700 font-medium">{edu.degree}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
              <Trophy className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900">Awards & Certificates</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "K. C. Mahindra Scholarship for Graduate Studies, 2017",
              "J N Tata Scholarship for Graduate Studies, 2017",
              "Social Management Immersion Fellowship, Stanford, 2018",
              "Certificate in Public Management and Social Innovation, Stanford University, 2019",
              "InSite Fellowship, 2019",
            ].map((award, i) => (
              <li key={i} className="flex items-start gap-2 bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                <span className="text-yellow-500 mt-0.5">★</span>
                <span className="text-sm font-medium text-slate-700">{award}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Publications & Patents */}
        <section ref={pubRef} className={cn("mb-20 transition-all duration-700 delay-300", pubInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Publications & Patents</h2>
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
              <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary-300 transition-colors group">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">{pub}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
