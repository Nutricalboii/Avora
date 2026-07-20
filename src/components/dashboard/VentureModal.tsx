'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createVenture } from '@/actions/venture.actions';

const ventureSchema = z.object({
  name: z.string().min(2, 'Venture name must be at least 2 characters'),
  problem: z.string().min(10, 'Problem statement must be at least 10 characters'),
  vision: z.string().min(10, 'Vision must be at least 10 characters'),
  fundingTarget: z.number().min(0, 'Funding target cannot be negative'),
});

type VentureFormValues = z.infer<typeof ventureSchema>;

export default function VentureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VentureFormValues>({
    resolver: zodResolver(ventureSchema),
    defaultValues: {
      name: '',
      problem: '',
      vision: '',
      fundingTarget: 0,
    },
  });

  const onSubmit = async (data: VentureFormValues) => {
    setIsSubmitting(true);
    try {
      await createVenture(data);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create venture pitch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-medium text-sm shadow-sm flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Pitch New Venture
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Pitch New Venture</h2>
                <p className="text-xs text-slate-900 mt-0.5">Start ideating a new Avora spin-out.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-slate-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Venture Name</label>
                <input
                  {...register('name')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="e.g. NextGen AI"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Problem Statement</label>
                <textarea
                  {...register('problem')}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                  placeholder="What is the core problem this venture solves?"
                />
                {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Vision / Solution</label>
                <textarea
                  {...register('vision')}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
                  placeholder="How does this venture solve the problem?"
                />
                {errors.vision && <p className="text-red-500 text-xs mt-1">{errors.vision.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Initial Funding Target ($)</label>
                <input
                  type="number"
                  {...register('fundingTarget', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="0.00"
                />
                {errors.fundingTarget && <p className="text-red-500 text-xs mt-1">{errors.fundingTarget.message}</p>}
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
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Pitch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
