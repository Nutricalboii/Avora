'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    focusArea: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputCls = (field: string) =>
    cn(
      'w-full px-4 py-3.5 text-[15px] rounded-xl transition-all duration-200 outline-none bg-white/70 border',
      focusedField === field
        ? 'border-[#B8860B] ring-2 ring-[#B8860B]/20 bg-white text-slate-900'
        : 'border-slate-200 hover:border-[#B8860B]/40 text-slate-900 placeholder:text-slate-700'
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your Name / Entity.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid Corporate Email.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please provide Context / Market Gap to Address.');
      return;
    }

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
      setFormData({ name: '', email: '', focusArea: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23B8860B' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.25em 1.25em',
    paddingRight: '2.5rem',
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <div
            ref={ref}
            className={`lg:col-span-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="section-eyebrow">Contact Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05] text-slate-900 mb-5">
              Build <br className="hidden sm:block" />
              With Us.
            </h2>
            <p className="text-lg text-slate-900 mb-8 max-w-md leading-relaxed">
              If you are looking to deploy commercial discipline, advanced technical execution, and lean operational structures to a high-potential market gap, let's connect.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-slate-700 block mb-1">
                  Response time
                </span>
                <span className="text-[15px] text-slate-700">Within 1 business day</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-strong rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm bg-white/60">
              {success ? (
                <div className="text-center py-16 space-y-5 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-14 h-14 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center mx-auto">
                    <svg
                      className="w-7 h-7 text-[#B8860B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    Submission received
                  </h3>
                  <p className="text-[15px] text-slate-900 max-w-sm mx-auto">
                    We have received your details. Our team will review the provided context and follow up soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl border border-red-300/40 bg-red-50 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2"
                      >
                        Name / Entity <span className="text-[#B8860B]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder="Your name or entity"
                        className={inputCls('name')}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2"
                      >
                        Corporate Email <span className="text-[#B8860B]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder="you@company.com"
                        className={inputCls('email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="focusArea"
                      className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2"
                    >
                      Primary Focus Area
                    </label>
                    <select
                      id="focusArea"
                      name="focusArea"
                      value={formData.focusArea}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('focusArea')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputCls('focusArea'), 'appearance-none bg-no-repeat')}
                      style={selectStyle}
                    >
                      <option value="">Select a focus area</option>
                      <option value="ai-native">AI-Native Tools</option>
                      <option value="consumer-lifestyle">Consumer/Lifestyle</option>
                      <option value="sourcing-export">Sourcing/Export</option>
                      <option value="operational-ventures">Operational Ventures</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-slate-900 mb-2"
                    >
                      Context / Market Gap to Address <span className="text-[#B8860B]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      placeholder="What is the market gap and how do you plan to address it?"
                      className={cn(inputCls('message'), 'resize-none')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-60 bg-[#1e293b] text-white"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Structural Overview'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




