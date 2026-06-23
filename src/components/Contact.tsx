'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'custom-dev',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });
      
      // With no-cors, fetch doesn't return a readable response so we assume success if no error is thrown
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'custom-dev',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">Let's Build Together</h2>
          <p className="text-lg text-slate-600">
            Tell us about your project and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          {status === 'success' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Thanks for reaching out!</h3>
              <p className="text-slate-600">We have received your message and will be in touch shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-3 bg-slate-100 text-slate-900 rounded-md hover:bg-slate-200 transition-colors font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none transition-shadow"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none transition-shadow"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none transition-shadow bg-white"
                  >
                    <option value="custom-dev">Custom Software Development</option>
                    <option value="ai-solution">AI & Machine Learning Solution</option>
                    <option value="data-analytics">Data Analytics & BI</option>
                    <option value="bpo">Dedicated Engineering Team / BPO</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-accent-blue focus:border-accent-blue outline-none transition-shadow resize-none"
                  placeholder="Tell us about your goals, timeline, and requirements..."
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                  There was an error sending your message. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-accent-blue text-white rounded-md font-medium text-lg hover:bg-accent-blue-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
