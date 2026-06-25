'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const id = href.replace('/#', '').replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-transparent'
      )}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'flex justify-between items-center transition-all duration-300',
            isScrolled ? 'h-14' : 'h-16'
          )}>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="Avora Ventures home"
            >
              <Image
                src="/logo.png"
                alt="Avora Ventures"
                width={120}
                height={40}
                className="h-8 w-auto dark:brightness-0 dark:invert"
                priority
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-150"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-200"
              >
                Get in Touch
              </button>
            </div>

            {/* Mobile row */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                aria-label="Toggle navigation"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] md:hidden transition-all duration-300',
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={cn(
          'absolute top-0 right-0 w-72 h-full bg-white dark:bg-[#0a0a0f] border-l border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-400 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
            <Image
              src="/logo.png"
              alt="Avora Ventures"
              width={100}
              height={32}
              className="h-7 w-auto dark:brightness-0 dark:invert"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col p-3 gap-1 flex-1">
            {siteConfig.nav.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
