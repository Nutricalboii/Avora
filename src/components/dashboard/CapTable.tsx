'use client';

export default function CapTable({ capTable }: { capTable: any }) {
  const parsedCapTable = capTable || { avora: 100, founders: 0, investors: 0, optionsPool: 0 };
  
  const avora = Number(parsedCapTable.avora) || 0;
  const founders = Number(parsedCapTable.founders) || 0;
  const investors = Number(parsedCapTable.investors) || 0;
  const options = Number(parsedCapTable.optionsPool) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Capitalization Table</h3>
      
      {/* Progress Bar Visual */}
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-6 bg-slate-100">
        <div style={{ width: `${avora}%` }} className="bg-slate-900 dark:bg-white transition-all duration-500"></div>
        <div style={{ width: `${founders}%` }} className="bg-emerald-500 transition-all duration-500"></div>
        <div style={{ width: `${investors}%` }} className="bg-amber-500 transition-all duration-500"></div>
        <div style={{ width: `${options}%` }} className="bg-slate-400 transition-all duration-500"></div>
      </div>

      {/* Legend & Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white"></div>
            <span className="text-sm font-medium text-slate-700">Avora Ventures</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{avora}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium text-slate-700">Founders</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{founders}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm font-medium text-slate-700">Investors</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{investors}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-sm font-medium text-slate-700">Options Pool</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{options}%</span>
        </div>
      </div>
    </div>
  );
}
