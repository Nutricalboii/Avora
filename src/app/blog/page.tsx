import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights | Avora Ventures',
  description:
    'Engineering updates, methodology notes, and operational lessons from the Avora Ventures pipeline team.',
};

const posts = [
  {
    slug: 'consensus-algorithms-data-labeling',
    title: 'Consensus Algorithms in High-Fidelity Data Labeling',
    excerpt:
      'How double-blind consensus and model-assisted validation produce annotation workloads you can actually train on.',
    date: 'July 10, 2026',
    author: 'Engineering Team',
    category: 'Technical',
    readTime: '6 min',
  },
  {
    slug: 'scaling-domain-specific-llms',
    title: 'Scaling Domain-Specific LLMs for Enterprise Operations',
    excerpt:
      'Deploying secure, low-latency private models with SHAP-based interpretability and drift monitoring built in.',
    date: 'June 28, 2026',
    author: 'ML Infrastructure Leads',
    category: 'AI Infrastructure',
    readTime: '8 min',
  },
  {
    slug: 'dataset-quality-vs-model-tuning',
    title: 'Why Dataset Quality Gates Beat Model Tuning',
    excerpt:
      'Most model performance gains come from the data layer, not the architecture. A practical case for auditing before training.',
    date: 'June 15, 2026',
    author: 'Operations Team',
    category: 'Industry Insight',
    readTime: '5 min',
  },
  {
    slug: 'synthetic-data-rare-disease',
    title: 'Synthetic Data Strategies for Rare Disease Diagnostics',
    excerpt:
      'When confirmed training cases number in the dozens, physics-informed generation backed by differential privacy is the only viable path forward.',
    date: 'May 30, 2026',
    author: 'Data Science Team',
    category: 'Technical',
    readTime: '7 min',
  },
  {
    slug: 'demand-forecasting-at-scale',
    title: 'Demand Forecasting at Scale with Explainable ML',
    excerpt:
      'How we embedded SHAP-based interpretability layers into a multi-SKU forecasting system to satisfy enterprise procurement audits.',
    date: 'May 12, 2026',
    author: 'Engineering Team',
    category: 'AI Infrastructure',
    readTime: '6 min',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Page header */}
      <div className="border-b border-slate-200 pt-36 pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8860B] mb-4">
                Avora / Insights
              </p>
              <h1 className="font-heading text-7xl md:text-9xl lg:text-[9rem] leading-none text-slate-900 tracking-wide uppercase">
                Notes From<br/>The Pipeline.
              </h1>
            </div>
            <p className="text-base md:text-lg text-slate-500 max-w-sm leading-relaxed md:pb-4 font-sans">
              Engineering updates, methodology notes, and operational lessons from the team that runs the pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* Featured post — first entry, large */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        <Link
          href={`/blog/${posts[0].slug}`}
          className="group block border-b border-slate-200 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-end hover:bg-slate-50/50 transition-colors duration-200"
        >
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase mb-4">Featured</p>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#B8860B] border border-[#B8860B]/30 px-3 py-1.5">
              {posts[0].category}
            </span>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-wide text-slate-900 mb-6 leading-tight group-hover:text-[#B8860B] transition-colors duration-200">
              {posts[0].title}
            </h2>
            <p className="font-sans text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
              {posts[0].excerpt}
            </p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <div className="font-mono text-[11px] text-slate-400 tracking-[0.15em] uppercase space-y-2 mb-8">
              <p>{posts[0].date}</p>
              <p>{posts[0].readTime} read</p>
              <p>{posts[0].author}</p>
            </div>
            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase text-slate-900 group-hover:text-[#B8860B] transition-colors duration-200">
              Read Article <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Rest of posts — table rows */}
        {posts.slice(1).map((post, i) => (
          <Link
            key={i}
            href={`/blog/${post.slug}`}
            className="group block border-b border-slate-200 py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-slate-50/50 transition-colors duration-200"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">0{i + 2}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#B8860B] border border-[#B8860B]/30 px-3 py-1.5">
                {post.category}
              </span>
            </div>
            <div className="md:col-span-6">
              <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-wide text-slate-900 group-hover:text-[#B8860B] transition-colors duration-200 leading-tight">
                {post.title}
              </h3>
              <p className="font-sans text-base text-slate-500 mt-3 leading-relaxed hidden md:block">{post.excerpt}</p>
            </div>
            <div className="md:col-span-2 font-mono text-[11px] text-slate-400 tracking-[0.12em] uppercase space-y-1">
              <p className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#B8860B]" />{post.date}</p>
              <p className="flex items-center gap-2"><User className="w-3 h-3 text-[#B8860B]" />{post.author}</p>
            </div>
            <div className="md:col-span-1 md:text-right">
              <div className="w-10 h-10 border border-slate-200 flex items-center justify-center ml-auto group-hover:border-[#B8860B] group-hover:bg-[#B8860B] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        ))}

        <p className="py-10 font-mono text-[11px] text-slate-400 tracking-[0.15em] uppercase">
          All posts reflect the operational views of the Avora Ventures team.
        </p>
      </div>
    </main>
  );
}
