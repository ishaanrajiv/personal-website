'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps): React.JSX.Element {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'home', command: 'cd ~' },
    { path: '/projects', label: 'projects', command: 'ls projects/' },
    { path: '/blog', label: 'blog', command: 'cat blog/' },
    { path: '/contact', label: 'contact', command: 'ping @me' }
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Site Name - Terminal Style */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 font-mono text-base sm:text-lg transition-all duration-200"
          >
            <span className="text-accent">$cd</span>
            <span className="text-text-primary group-hover:text-accent transition-colors">
              ishaan
            </span>
            <span className="cursor-blink hidden sm:inline-block" />
          </Link>

          {/* Navigation Links - Command Style */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  relative px-2 sm:px-3 py-1.5 font-mono text-xs sm:text-sm transition-all duration-200
                  ${isActive(item.path)
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text-primary'
                  }
                `}
              >
                {/* Command prefix on larger screens */}
                <span className="hidden md:inline text-text-muted mr-1">./</span>
                <span>{item.label}</span>

                {/* Active indicator */}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Command Line Preview - Hidden on mobile */}
        <div className="hidden lg:flex items-center mt-3 pt-3 border-t border-border/50 text-xs font-mono text-text-muted">
          <span className="text-amber">visitor</span>
          <span className="mx-1">@</span>
          <span className="text-text-secondary">portfolio</span>
          <span className="mx-1">:</span>
          <span className="text-accent">
            {pathname === '/' ? '~' : pathname}
          </span>
          <span className="text-accent ml-1">$</span>
          <span className="ml-2 text-text-primary">
            {navItems.find(item => isActive(item.path))?.command || 'help'}
          </span>
          <span className="cursor-blink ml-1" style={{ height: '0.9em', width: '0.5em' }} />
        </div>
      </div>
    </nav>
  );
}
