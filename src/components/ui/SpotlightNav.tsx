'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Logo } from '../Logo';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '/work' },
  { name: 'Insights', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

export function SpotlightNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        isScrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={cn(
            'relative flex items-center justify-between px-5 md:px-6 py-3 transition-all duration-500 rounded-2xl border',
            isScrolled ? 'glass-panel shadow-soft' : 'bg-transparent border-transparent'
          )}
        >
          <div className="flex items-center">
            <Link href="/" aria-label="Avora Ventures" className="block">
              <Logo className="h-8 md:h-9 w-auto text-[var(--foreground)]" />
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center space-x-1 relative z-10"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => {
              const isHash = item.href.startsWith('#');
              const itemHref = isHash && pathname !== '/' ? `/${item.href}` : item.href;
              return (
                <Link
                  key={item.name}
                  href={itemHref}
                  className="relative px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {item.name}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="spotlight"
                      className="absolute inset-0 bg-[var(--accent-tint)] rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4 relative z-10">
            <Link
              href={pathname === '/' ? '#contact' : '/#contact'}
              className="btn-primary text-sm px-5 py-2"
            >
              Partner with us
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2 z-20">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 px-4 pt-2 pb-6 glass-panel-strong rounded-2xl z-40 md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => {
                const isHash = item.href.startsWith('#');
                const itemHref = isHash && pathname !== '/' ? `/${item.href}` : item.href;
                return (
                  <Link
                    key={item.name}
                    href={itemHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors py-3 border-b border-[var(--border)]"
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href={pathname === '/' ? '#contact' : '/#contact'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full mt-3 py-3"
              >
                Partner with us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
