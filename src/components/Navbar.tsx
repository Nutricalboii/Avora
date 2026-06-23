'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-2xl tracking-tight text-slate-900">
          <Link href="/">Avora</Link>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <Link href="#hero" className="hover:text-accent-blue transition-colors">
            Home
          </Link>
          <Link href="#services" className="hover:text-accent-blue transition-colors">
            Services
          </Link>
          <Link href="#contact" className="hover:text-accent-blue transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
