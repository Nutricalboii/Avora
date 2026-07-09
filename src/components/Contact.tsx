'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks/useInView';
import { TechnicalGrid } from './ui/TechnicalGrid';

export default function Contact() {
  const { ref, isInView } = useInView({ once: true, threshold: 0.1 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budgetRange: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputCls = (field: string) =>
    cn(
      'w-full px-4 py-3 text-sm font-sans rounded border transition-all duration-150 outline-none bg-white/[0.02]',
      focusedField === field
        ? 'border-teal-500/50 ring-1 ring-teal-500/30 bg-white/[0.04] text-white'
        : 'border-slate-800 hover:border-slate-700 text-slate-200 placeholder:text-slate-500'
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
      className="py-24 md:py-32 relative overflow-hidden border-t border-slate-800 bg-[#090d16]"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(9, 13, 22, 0.4) 0%, rgba(9, 13, 22, 0.9) 100%), url('/Structural_Precision.jpg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TechnicalGrid showDots={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            'text-center mb-16 transition-all duration-500',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="section-eyebrow">Contact Us</span>
          <h2 className="section-heading mb-4">Start a Conversation</h2>
          <p className="section-subtext max-w-2xl mx-auto">
            Discuss your pipeline requirements, annotations, or embedded placement specifications directly with our technical leads.
          </p>
        </div>

        <div className="bg-[#0e1322]/80 border border-slate-800 p-8 md:p-12 shadow-sm rounded-xl backdrop-blur-sm">
          {success ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center border border-teal-500/20">
                  <CheckCircle className="w-8 h-8 text-teal-400" />
                </div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">Inquiry Sent</h3>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto font-sans">
                Thank you. Our team will reach out within 24 hours to discuss your needs.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 border border-slate-800 bg-transparent text-white font-sans font-medium rounded hover:bg-white/[0.04] transition-colors"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input
                type="text"
                name="_honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                readOnly
              />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded flex gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-sans text-red-300">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                    Full Name <span className="text-red-500 text-xs align-super ml-0.5">*</span>
                  </label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    required placeholder="Jane Doe"
                    className={inputCls('name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                    Email Address <span className="text-red-500 text-xs align-super ml-0.5">*</span>
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    required placeholder="jane@example.com"
                    className={inputCls('email')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                  Company <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text" id="company" name="company"
                  value={formData.company} onChange={handleChange}
                  onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                  placeholder="Acme Corp"
                  className={inputCls('company')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                    Service Type <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="serviceType" name="serviceType"
                    value={formData.serviceType} onChange={handleChange}
                    onFocus={() => setFocusedField('serviceType')} onBlur={() => setFocusedField(null)}
                    className={cn(inputCls('serviceType'), 'appearance-none bg-no-repeat')}
                    style={selectStyle}
                  >
                    <option value="" className="bg-[#0a0a0f] text-slate-200">Select a service</option>
                    <option value="outsourcing" className="bg-[#0a0a0f] text-slate-200">Specialized Outsourcing</option>
                    <option value="skill-hiring" className="bg-[#0a0a0f] text-slate-200">Specialized Skill Hiring</option>
                    <option value="ai-solutions" className="bg-[#0a0a0f] text-slate-200">AI Solutions &amp; Automation</option>
                    <option value="data-annotations" className="bg-[#0a0a0f] text-slate-200">Data Annotation &amp; Labeling</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                    Budget Range <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="budgetRange" name="budgetRange"
                    value={formData.budgetRange} onChange={handleChange}
                    onFocus={() => setFocusedField('budgetRange')} onBlur={() => setFocusedField(null)}
                    className={cn(inputCls('budgetRange'), 'appearance-none bg-no-repeat')}
                    style={selectStyle}
                  >
                    <option value="" className="bg-[#0a0a0f] text-slate-200">Select a range</option>
                    <option value="under-5k" className="bg-[#0a0a0f] text-slate-200">&lt;$5k</option>
                    <option value="5k-25k" className="bg-[#0a0a0f] text-slate-200">$5k–$25k</option>
                    <option value="25k-100k" className="bg-[#0a0a0f] text-slate-200">$25k–$100k</option>
                    <option value="over-100k" className="bg-[#0a0a0f] text-slate-200">&gt;$100k</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-sans font-medium text-slate-300 mb-2">
                  Project Details <span className="text-red-500 text-xs align-super ml-0.5">*</span>
                </label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                  required rows={5}
                  placeholder="Tell us about your project, timeline, and goals..."
                  className={cn(inputCls('message'), 'resize-none')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full bg-white text-slate-900 px-8 py-3.5 text-sm font-semibold rounded hover:bg-slate-100 transition-colors duration-150',
                  isSubmitting && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isSubmitting ? 'Sending…' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
