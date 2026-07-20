import Link from 'next/link';
import { Logo } from './Logo';

const footerLinks = {
  Services: [
    { label: 'Data Generation', href: '/#services?tab=data-generation' },
    { label: 'Data Annotation', href: '/#services?tab=data-annotation' },
    { label: 'Labeling', href: '/#services?tab=labeling' },
    { label: 'Auditing', href: '/#services?tab=auditing' },
    { label: 'AI Implementation', href: '/#services?tab=ai-implementation' },
  ],
  Company: [
    { label: 'Delivered Work', href: '/work' },
    { label: 'Contact', href: '/#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-slate-200/60" style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
              <Logo size="md" className="h-9 w-auto text-[var(--foreground)]" />
            </Link>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed max-w-xs">
              Data generation, annotation, labeling, quality auditing, and AI implementation —
              one continuous pipeline.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--foreground-muted)] mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[14px] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border)] py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} Avora Ventures Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-[var(--foreground-muted)] tracking-[0.18em] uppercase bg-white/60 px-3 py-1.5 border border-[var(--border)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
