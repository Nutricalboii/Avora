'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  
  // Create breadcrumb from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const title = pathSegments.length > 1 
    ? pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1).replace('-', ' ') 
    : 'Dashboard Overview';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30 relative">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder User Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-md transition-colors">
            <div className="w-8 h-8 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin User</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@avora.io</p>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
