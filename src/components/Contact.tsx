'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    industry: '',
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
        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20 bg-white text-[var(--foreground)]'
        : 'border-[var(--border-strong)] hover:border-[var(--accent)]/40 text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/70'
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please tell us about your project.');
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
      setFormData({ name: '', email: '', company: '', serviceType: '', industry: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B5642' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.25em 1.25em',
    paddingRight: '2.5rem',
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden contact-bg">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <div
            ref={ref}
            className={`lg:col-span-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="section-eyebrow">Contact</span>
            <h2 className="section-heading mb-5">
              Start a <br className="hidden sm:block" />
              conversation.
            </h2>
            <p className="section-subtext mb-8 max-w-md">
              Tell us what you are trying to build, the data you have, and the constraints you
              are under. A technical lead will respond within one business day.
            </p>

            <div className="space-y-4 pt-6 border-t border-[var(--border)]">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] block mb-1">
                  Response time
                </span>
                <span className="text-[15px] text-[var(--foreground)]">Within 1 business day</span>
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] block mb-1">
                  What to expect
                </span>
                <span className="text-[15px] text-[var(--foreground)]">
                  A scoping call, not a sales call
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-strong rounded-2xl p-8 md:p-10">
              {success ? (
                <div className="text-center py-16 space-y-5 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-tint)] border border-[var(--accent)]/30 flex items-center justify-center mx-auto">
                    <svg
                      className="w-7 h-7 text-[var(--accent)]"
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
                  <h3 className="text-xl font-heading font-bold text-[var(--foreground)]">
                    Submission received
                  </h3>
                  <p className="text-[15px] text-[var(--foreground-muted)] max-w-sm mx-auto">
                    Your parameters have been logged. A technical lead will follow up within one
                    business day.
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
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                      >
                        Name <span className="text-red-500">*</span>
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
                        placeholder="Your name"
                        className={inputCls('name')}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                      >
                        Email <span className="text-red-500">*</span>
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
                      htmlFor="company"
                      className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                    >
                      Company <span className="text-[var(--foreground-muted)] normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Company name"
                      className={inputCls('company')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="serviceType"
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                      >
                        Service <span className="text-[var(--foreground-muted)] normal-case tracking-normal">(optional)</span>
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('serviceType')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(inputCls('serviceType'), 'appearance-none bg-no-repeat')}
                        style={selectStyle}
                      >
                        <option value="">Select a service</option>
                        <option value="data-generation">Data Generation</option>
                        <option value="data-annotation">Data Annotation</option>
                        <option value="labeling">Data Labeling</option>
                        <option value="auditing">Quality Auditing</option>
                        <option value="ai-implementation">AI Implementation</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                      >
                        Industry <span className="text-[var(--foreground-muted)] normal-case tracking-normal">(optional)</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('industry')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(inputCls('industry'), 'appearance-none bg-no-repeat')}
                        style={selectStyle}
                      >
                        <option value="">Select an industry</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="retail">Retail &amp; E-commerce</option>
                        <option value="logistics">Logistics &amp; Supply Chain</option>
                        <option value="energy">Energy &amp; Utilities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)] mb-2"
                    >
                      Project details <span className="text-red-500">*</span>
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
                      placeholder="What are you building, what data do you have, and what constraints are you under?"
                      className={cn(inputCls('message'), 'resize-none')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Send inquiry'}
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
