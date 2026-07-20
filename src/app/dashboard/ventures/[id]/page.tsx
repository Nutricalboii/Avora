import { getVentureById } from '@/actions/venture.actions';
import { notFound } from 'next/navigation';
import CapTable from '@/components/dashboard/CapTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function VentureDetailsPage({ params }: { params: { id: string } }) {
  const venture = await getVentureById(params.id);

  if (!venture) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/ventures" className="p-2 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
          <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{venture.name}</h1>
          <p className="text-sm text-slate-900">Pitched by {(venture as any).founder?.name || 'Unknown'}</p>
        </div>
        <div className="ml-auto">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            {venture.stage.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">The Problem</h2>
            <p className="text-slate-700 whitespace-pre-wrap">{venture.problem}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">The Vision</h2>
            <p className="text-slate-700 whitespace-pre-wrap">{venture.vision}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-900 mb-1">Target Funding</h3>
            <p className="text-3xl font-bold text-green-600">${venture.fundingTarget.toLocaleString()}</p>
          </div>
          
          <CapTable capTable={venture.capTable} />
        </div>
      </div>
    </div>
  );
}
