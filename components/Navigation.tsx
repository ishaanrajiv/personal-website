'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CloseIcon, MenuIcon } from '@/components/icons';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

function isActivePath(pathname: string, path: string): boolean {
  if (path === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(path);
}

export default function Navigation({ className = '' }: NavigationProps): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(5,5,5,0.88)] backdrop-blur-xl ${className}`}
      >
        <div className="page-frame flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:text-text-dim"
          >
            Ishaan Rajiv
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative py-2 text-sm uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active ? 'text-text' : 'text-text-faint hover:text-text-dim'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px bg-text transition-opacity duration-300 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:text-text-dim md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            <span>{isOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-bg/98 transition-opacity duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="page-frame flex min-h-screen flex-col justify-center gap-10 pt-20">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`border-b border-line pb-5 text-4xl font-semibold tracking-[-0.05em] transition-colors duration-300 ${
                  active ? 'text-text' : 'text-text-faint'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
