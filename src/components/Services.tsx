import { BrainCircuit, Code2, LineChart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'AI Solutions',
      description: 'Custom RAG pipelines, automated workflows, and LLM integrations to give your business an unfair advantage.',
      icon: <BrainCircuit className="w-8 h-8 text-accent-blue" />,
    },
    {
      title: 'Custom Engineering',
      description: 'Dedicated full-stack development teams building robust, scalable applications from the ground up.',
      icon: <Code2 className="w-8 h-8 text-accent-blue" />,
    },
    {
      title: 'Data & BI',
      description: 'Advanced analytics, real-time dashboards, and data warehousing to unlock insights from your messy data.',
      icon: <LineChart className="w-8 h-8 text-accent-blue" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We deliver end-to-end technical solutions designed to automate processes and accelerate your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Large Card: Span 2 columns */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-center mb-6 text-blue-600">
                {services[0].icon}
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">Agentic AI & LLM Integration</h3>
              <p className="text-slate-600 leading-relaxed text-lg max-w-xl">
                Custom RAG pipelines, automated workflows, and advanced LLM integrations to give your business an unfair advantage. We build measurable AI systems that reduce overhead.
              </p>
            </div>
          </div>

          {/* Medium Card 1 */}
          <div className="bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-center mb-6 text-blue-600">
                {services[1].icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Full-Stack Engineering</h3>
              <p className="text-slate-600 leading-relaxed">
                Fractional CTO services and dedicated product squads building robust, scalable applications from the ground up.
              </p>
            </div>
          </div>

          {/* Medium Card 2 */}
          <div className="bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-center mb-6 text-blue-600">
                {services[2].icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Enterprise BPO</h3>
              <p className="text-slate-600 leading-relaxed">
                Operational scaling through offshore talent and automated data warehousing to unlock insights from your messy data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
