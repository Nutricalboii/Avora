import Link from 'next/link';
import { Logo } from './Logo';

const footerLinks = {
  Services: [
    { label: 'Specialized Outsourcing', href: '#services' },
    { label: 'Skill Hiring', href: '#services' },
    { label: 'AI Solutions', href: '#services' },
    { label: 'Data Annotations', href: '#services' },
  ],
  Company: [
    { label: 'Ventures Studio', href: '#ventures' },
    { label: 'Methodology', href: '#process' },
    { label: 'Founder', href: '/founder' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060910] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Logo size="md" className="h-9 w-auto text-white" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs font-sans">
              Outsourcing, specialized skill hiring, AI solutions, and data annotations — built to scale your operations.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm font-sans text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-sans text-slate-500">
            &copy; {new Date().getFullYear()} Avora Ventures Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 tracking-wider uppercase bg-white/[0.03] px-3 py-1.5 border border-slate-700/40 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
