export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "Mapping workflows and identifying AI leverage points to maximize your operational efficiency.",
    },
    {
      number: "02",
      title: "Engineering & AI",
      description: "Building robust software and integrating custom LLM pipelines tailored to your specific needs.",
    },
    {
      number: "03",
      title: "Deployment & Scale",
      description: "Seamless launch with ongoing BPO and technical support to ensure long-term success.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">Our Methodology</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-4">The Avora A.I.M. Framework</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A repeatable, enterprise-grade system for moving from ambition to live deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-center mb-6 text-blue-600 font-bold text-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
