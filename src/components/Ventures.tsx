import { ArrowUpRight } from 'lucide-react';

export default function Ventures() {
  const ventures = [
    {
      name: "NexusAI",
      description: "Automated customer success platform using generative AI.",
      metric: "+82% AI Referral Traffic",
    },
    {
      name: "HealthSync",
      description: "HIPAA-compliant data warehousing for digital clinics.",
      metric: "Reduced Costs 10x",
    },
  ];

  return (
    <section id="ventures" className="py-20 bg-slate-50 dark:bg-slate-950 relative border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">Our Spin-Outs</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4">Avora Venture Studio</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We don't just build for clients. We co-create, launch, and scale our own high-growth tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ventures.map((venture, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full hover:dark:border-blue-500/30"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">{venture.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{venture.description}</p>
              </div>
              <div className="pt-6 border-t border-black/5 dark:border-white/10">
                <span className="font-heading font-bold text-lg text-blue-600 dark:text-blue-400">{venture.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
