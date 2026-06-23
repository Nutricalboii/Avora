'use client';

import Link from 'next/link';

export default function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">Avora</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollTo('hero')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-blue transition-colors">
              Home
            </button>
            <button onClick={() => scrollTo('services')} className="text-sm font-medium text-slate-600 hover:text-accent-blue transition-colors">
              Services
            </button>
            <button onClick={() => scrollTo('contact')} className="text-sm font-medium text-slate-600 hover:text-accent-blue transition-colors">
              Contact
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => scrollTo('contact')} className="text-sm font-medium text-accent-blue">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
