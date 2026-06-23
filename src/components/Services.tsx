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
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We deliver end-to-end technical solutions designed to automate processes and accelerate your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
