import { getAiModels } from '@/actions/ai.actions';
import { getProjects } from '@/actions/project.actions';
import AiModelModal from '@/components/dashboard/AiModelModal';

export const dynamic = 'force-dynamic';

export default async function AiModelsPage() {
  const [models, projects] = await Promise.all([
    getAiModels(),
    getProjects()
  ]);

  const getFrameworkBadge = (framework: string) => {
    switch (framework) {
      case 'PYTORCH':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">PyTorch</span>;
      case 'TENSORFLOW':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">TensorFlow</span>;
      case 'LLAMA2':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Llama 2</span>;
      case 'GPT_4_API':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">GPT-4 API</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">Other</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Models Registry</h1>
          <p className="text-sm text-slate-900 mt-1">Manage and track your registered AI solutions and endpoints.</p>
        </div>
        <AiModelModal projects={projects} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Model Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Framework</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Linked Project</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Latency</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">Cost / Inf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {models.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-900">
                    No AI models registered. Click "Register Model" to add one.
                  </td>
                </tr>
              ) : (
                models.map((model) => (
                  <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{model.name}</div>
                      <div className="text-xs text-slate-900 truncate max-w-[200px]">{model.endpoint}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getFrameworkBadge(model.framework)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {(model as any).project?.name || <span className="text-slate-700 italic">Unlinked</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                      {model.accuracy ? `${model.accuracy}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {model.latency_ms ? `${model.latency_ms}ms` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {model.cost_per_inference ? `$${model.cost_per_inference.toFixed(4)}` : 'N/A'}
                    </td>
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
