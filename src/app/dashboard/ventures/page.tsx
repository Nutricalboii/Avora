import { getVentures } from '@/actions/venture.actions';
import VentureModal from '@/components/dashboard/VentureModal';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function VenturesPage() {
  const ventures = await getVentures();

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'IDEATION':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Ideation</span>;
      case 'MVP':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">MVP</span>;
      case 'SCALING':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">Scaling</span>;
      case 'SPUN_OUT':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Spun Out</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{stage}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Venture Studio</h1>
          <p className="text-sm text-slate-900 mt-1">Ideate, manage, and scale Avora internal spin-outs.</p>
        </div>
        <VentureModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ventures.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No ventures pitched yet</h3>
            <p className="text-slate-900 max-w-sm mx-auto">Start building the next big thing by pitching a new venture to the studio.</p>
          </div>
        ) : (
          ventures.map((venture) => {
            const capTable = venture.capTable as any;
            const avoraEquity = capTable?.avora || 0;

            return (
              <Link href={`/dashboard/ventures/${venture.id}`} key={venture.id} className="block">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col hover:shadow-md hover:border-indigo-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{venture.name}</h3>
                    {getStageBadge(venture.stage)}
                  </div>
                  
                  <div className="mb-6 flex-grow">
                    <p className="text-sm text-slate-900 line-clamp-3 leading-relaxed">{venture.vision}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-900 font-medium mb-1">Avora Stake</p>
                      <p className="text-sm font-bold text-slate-800">{avoraEquity}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-900 font-medium mb-1">Target Funding</p>
                      <p className="text-sm font-bold text-green-600">${venture.fundingTarget.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
