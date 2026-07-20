'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerAiModel } from '@/actions/ai.actions';
import { AiFramework } from '@prisma/client';

const aiModelSchema = z.object({
  name: z.string().min(2, 'Model name must be at least 2 characters'),
  framework: z.nativeEnum(AiFramework),
  endpoint: z.string().url('Must be a valid URL'),
  projectId: z.string().optional(),
});

type AiModelFormValues = z.infer<typeof aiModelSchema>;

export default function AiModelModal({ projects }: { projects: { id: string; name: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AiModelFormValues>({
    resolver: zodResolver(aiModelSchema),
    defaultValues: {
      name: '',
      framework: 'PYTORCH',
      endpoint: '',
      projectId: '',
    },
  });

  const onSubmit = async (data: AiModelFormValues) => {
    setIsSubmitting(true);
    try {
      await registerAiModel(data);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to register AI model:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-accent-blue-hover transition-colors font-medium text-sm shadow-sm"
      >
        + Register Model
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Register AI Model</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-slate-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model Name</label>
                <input
                  {...register('name')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  placeholder="e.g. Sales Predictor v1"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Framework</label>
                <select
                  {...register('framework')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="PYTORCH">PyTorch</option>
                  <option value="TENSORFLOW">TensorFlow</option>
                  <option value="LLAMA2">Llama 2</option>
                  <option value="GPT_4_API">GPT-4 API</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.framework && <p className="text-red-500 text-xs mt-1">{errors.framework.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Endpoint URL</label>
                <input
                  type="url"
                  {...register('endpoint')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  placeholder="https://api.openai.com/v1/chat/completions"
                />
                {errors.endpoint && <p className="text-red-500 text-xs mt-1">{errors.endpoint.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link to Project (Optional)</label>
                <select
                  {...register('projectId')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="">-- None --</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {errors.projectId && <p className="text-red-500 text-xs mt-1">{errors.projectId.message}</p>}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-hover rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Register Model'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
