'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/cn';
import { Logo } from '../Logo';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export function SpotlightNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500",
      isScrolled ? "py-3" : "py-5"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative flex items-center justify-between px-4 md:px-6 py-3 mx-auto transition-all duration-500 rounded-2xl border",
          isScrolled
            ? "glass-panel shadow-2xl"
            : "bg-transparent border-transparent"
        )}>

          {/* Logo: always visible on mobile; fades in on desktop once scrolled */}
          <div className={cn(
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center overflow-hidden",
            isScrolled
              ? "opacity-100 w-[140px] md:w-[160px] translate-x-0 pointer-events-auto mr-4"
              : "w-[140px] opacity-100 md:w-0 md:opacity-0 md:-translate-x-4 md:pointer-events-none md:mr-0"
          )}>
            <Link href="/" aria-label="Avora Ventures" className="block">
              <Logo className="h-8 md:h-9 w-auto text-slate-900 dark:text-white" />
            </Link>
          </div>

          {/* ── Desktop Nav Links ── */}
          <nav
            className="hidden md:flex items-center space-x-1 relative z-10"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-sans font-medium text-slate-700 dark:text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {item.name}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="spotlight"
                    className="absolute inset-0 bg-slate-100 dark:bg-white/[0.06] rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Controls & CTA ── */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-black/20 hover:bg-slate-100/60 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-sans font-semibold text-white bg-[#D4AF37] hover:bg-[#B8962D] transition-colors rounded-lg"
            >
              Partner With Us
            </Link>
          </div>

          {/* ── Mobile Hamburger & Theme Toggle ── */}
          <div className="flex md:hidden items-center gap-2 z-20">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-black/20 text-slate-700 dark:text-slate-400"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 px-4 pt-2 pb-6 glass-panel rounded-2xl z-40 md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2 border-b border-slate-200 dark:border-slate-800/20"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 text-sm font-sans font-semibold text-white bg-[#D4AF37] hover:bg-[#B8962D] transition-colors rounded-lg mt-2"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
