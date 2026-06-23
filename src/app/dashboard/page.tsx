import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // Fetch KPI data in parallel
  const [totalRevenueResult, activeProjectsCount, totalClientsCount, recentProjects] = await Promise.all([
    prisma.client.aggregate({
      _sum: { totalRevenue: true },
    }),
    prisma.project.count({
      where: {
        status: { not: 'COMPLETED' },
      },
    }),
    prisma.client.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { client: true },
    }),
  ]);

  const totalRevenue = totalRevenueResult._sum.totalRevenue || 0;

  const kpis = [
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+14.5%', isPositive: true },
    { title: 'Active Projects', value: activeProjectsCount.toString(), change: '+2', isPositive: true },
    { title: 'Total Clients', value: totalClientsCount.toString(), change: '+1', isPositive: true },
    { title: 'AI Model Accuracy (Avg)', value: '92.0%', change: '+1.1%', isPositive: true },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DEPLOYED':
      case 'COMPLETED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">{status}</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">{status.replace('_', ' ')}</span>;
      case 'QA':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">{status}</span>;
      case 'DISCOVERY':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</h3>
            <div className="flex items-end justify-between mt-auto">
              <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
              <div className={`flex items-center text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.isPositive ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                )}
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Recent Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No recent projects. Head to the Projects tab to create one!
                  </td>
                </tr>
              ) : (
                recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{(project as any).client?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{project.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
