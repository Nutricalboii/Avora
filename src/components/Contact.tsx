'use client';

import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budgetRange: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputCls = (field: string) =>
    cn(
      'w-full px-4 py-3 text-sm font-sans rounded border transition-all duration-150 outline-none bg-black/[0.01] dark:bg-white/[0.02]',
      focusedField === field
        ? 'border-[#B08D57]/50 ring-1 ring-[#B08D57]/30 bg-black/[0.02] dark:bg-white/[0.04] text-slate-900 dark:text-white'
        : 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-750 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500'
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) { setError('Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Please enter a valid email address.'); return; }
    if (!formData.message.trim()) { setError('Please tell us about your project.'); return; }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _honeypot: '' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', serviceType: '', budgetRange: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem',
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 relative overflow-hidden contact-bg"
    >
      {/* ponytail: inlined TechnicalGrid — was its only callsite */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1.5px)', backgroundSize: '4rem 4rem' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_90%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <span className="section-eyebrow">Contact Us</span>
          <h2 className="section-heading mb-4">Start a Conversation</h2>
          <p className="section-subtext max-w-2xl mx-auto">
            Discuss your pipeline requirements, verification SLAs, and annotation workloads directly with our technical leads.
          </p>
        </div>

        {/* Contact Intake Console Card */}
        <div className="max-w-2xl mx-auto glass-panel p-6 md:p-10 rounded-2xl">
          {success ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/20">
                  <CheckCircle className="w-8 h-8 text-teal-400" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">Inquiry Sent</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto font-sans text-sm">
                Thank you. Our team will reach out within 24 hours to discuss your specifications.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2.5 border border-slate-300 dark:border-slate-800 bg-transparent text-slate-700 dark:text-white font-sans text-xs font-semibold rounded hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-sans text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Name <span className="text-red-500 text-[10px] align-super ml-0.5">*</span>
                  </label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    required placeholder="Enter your name"
                    className={inputCls('name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Email <span className="text-red-500 text-[10px] align-super ml-0.5">*</span>
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    required placeholder="Enter your email"
                    className={inputCls('email')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Company <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text" id="company" name="company"
                  value={formData.company} onChange={handleChange}
                  onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                  placeholder="Enter your company name"
                  className={inputCls('company')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceType" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Service Type <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="serviceType" name="serviceType"
                    value={formData.serviceType} onChange={handleChange}
                    onFocus={() => setFocusedField('serviceType')} onBlur={() => setFocusedField(null)}
                    className={cn(inputCls('serviceType'), 'appearance-none bg-no-repeat dark:text-white')}
                    style={selectStyle}
                  >
                    <option value="" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">Select a service</option>
                    <option value="outsourcing" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">Specialized Outsourcing</option>
                    <option value="skill-hiring" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">Specialized Skill Hiring</option>
                    <option value="ai-solutions" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">AI Solutions &amp; Automation</option>
                    <option value="data-annotations" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">Data Annotation &amp; Labeling</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Budget Range <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="budgetRange" name="budgetRange"
                    value={formData.budgetRange} onChange={handleChange}
                    onFocus={() => setFocusedField('budgetRange')} onBlur={() => setFocusedField(null)}
                    className={cn(inputCls('budgetRange'), 'appearance-none bg-no-repeat dark:text-white')}
                    style={selectStyle}
                  >
                    <option value="" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">Select a range</option>
                    <option value="under-5k" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">&lt;$5k</option>
                    <option value="5k-25k" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">$5k–$25k</option>
                    <option value="25k-100k" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">$25k–$100k</option>
                    <option value="over-100k" className="bg-[#F8F5EE] dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-300">&gt;$100k</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Project Details <span className="text-red-500 text-[10px] align-super ml-0.5">*</span>
                </label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                  required rows={4}
                  placeholder="Describe your project, timelines, and goals..."
                  className={cn(inputCls('message'), 'resize-none')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded bg-[#B08D57] hover:bg-[#937343] text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-150 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
