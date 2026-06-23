'use client';

import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    try {
      // Hardcoded fetch URL as per the prompt instructions. 
      // Replace with your actual Google Apps Script Web App URL.
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzdt6LMsh3XZ6eBUAmns_WBtqd8ORR-uDizVZhaUDqWG9bAqYa5LtbpSpZX-iVrnRlI/exec';

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Since mode: 'no-cors' always returns an opaque response, 
      // we assume success if no exception was thrown.
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error('Submission error:', err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">Let's Build Together</h2>
          <p className="mt-4 text-lg text-slate-600">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl relative z-10">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-600">Thank you for reaching out. We will be in touch shortly.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-accent-blue font-medium hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
                  Something went wrong. Please try again later.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-accent-blue text-white rounded-md font-medium hover:bg-accent-blue-hover transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
