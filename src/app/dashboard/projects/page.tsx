import { getProjects } from '@/actions/project.actions';
import { getClients } from '@/actions/client.actions';
import ProjectModal from '@/components/dashboard/ProjectModal';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  // Fetch projects and clients in parallel
  const [projects, clients] = await Promise.all([
    getProjects(),
    getClients()
  ]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-900 mt-1">Manage active projects and monitor status.</p>
        </div>
        <ProjectModal clients={clients} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
            <p className="text-slate-900">No active projects. Click "New Project" to start one.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{project.name}</h3>
                  <p className="text-sm text-slate-900 line-clamp-1">Client: {(project as any).client?.name || 'Unknown'}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-900 mb-1 font-medium">Type</p>
                  <p className="text-sm font-medium text-slate-800">{project.type.replace('_', ' ')}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-900 mb-1 font-medium">Budget</p>
                  <p className="text-sm font-medium text-green-600">${project.budget.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
