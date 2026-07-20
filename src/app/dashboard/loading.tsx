import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-[#121218] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/80 flex flex-col h-32 justify-between">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
            <div className="flex items-end justify-between mt-auto">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton Recent Projects Table */}
      <div className="bg-white dark:bg-[#121218] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/80 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-black/10 border-b border-slate-200 dark:border-slate-800/60">
                <th className="px-6 py-4"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" /></th>
                <th className="px-6 py-4"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" /></th>
                <th className="px-6 py-4"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" /></th>
                <th className="px-6 py-4"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" /></th>
                <th className="px-6 py-4"><div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(5)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
